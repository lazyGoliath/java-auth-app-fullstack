package com.dev.auth.auth_app_backend.security;

import com.dev.auth.auth_app_backend.entities.Provider;
import com.dev.auth.auth_app_backend.entities.RefreshToken;
import com.dev.auth.auth_app_backend.entities.User;
import com.dev.auth.auth_app_backend.repositories.RefreshTokenRepository;
import com.dev.auth.auth_app_backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@Component
@AllArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository  userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        logger.info("Successful authentication");
        logger.info(authentication.toString());

        // extract oauth2 user
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // identify user
        String registrationId = "unknown";

        if(authentication instanceof OAuth2AuthenticationToken token){
            registrationId = token.getAuthorizedClientRegistrationId();
        }

        logger.info("Registration Id: {}", registrationId);
        logger.info("User: {}", oAuth2User.getAttributes().toString());

        User user;

        switch (registrationId){

            case "google"-> {
                String subject = oAuth2User.getAttributes()
                        .getOrDefault("subject", "")
                        .toString();

                String email = oAuth2User.getAttributes()
                        .getOrDefault("email", "")
                        .toString();

                String name = oAuth2User.getAttributes()
                        .getOrDefault("name", "")
                        .toString();

                String picture = oAuth2User.getAttributes()
                        .getOrDefault("picture", "")
                        .toString();

                user = User.builder()
                        .email(email)
                        .name(name)
                        .image(picture)
                        .enable(true)
                        .provider(Provider.GOOGLE)
                        .build();

                // check if user is already there in db before saving in db
                userRepository.findByEmail(email).ifPresentOrElse((usr) -> {
                    logger.info("User already there in db");
                    logger.info("User: {}", usr);
                }, () -> userRepository.save(user));
            }

            default-> {
                logger.info("Invalid registration Id");
                throw new RuntimeException("Invalid registration id");
            }
        }

        // username
        // user email
        // new user create
        //  new jwt token
        // redirect with token to the frontend

        // create new refresh token
        String jti = UUID.randomUUID().toString();
        RefreshToken refreshToken = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .revoked(false)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .build();

        // specify roles here

        // save token
        refreshTokenRepository.save(refreshToken);

        // generate new access and refresh tokens
        String newAccessToken = jwtService.generateToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user, jti);

        // attach tokens to response
        cookieService.attachRefreshCookie(response, newRefreshToken, (int) jwtService.getRefreshTtlSeconds());

        // add redirect link here to frontend(send request with token cookie)

        response.getWriter().write("Login successful");
    }
}
