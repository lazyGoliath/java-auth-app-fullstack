package com.dev.auth.auth_app_backend.controllers;

import com.dev.auth.auth_app_backend.dtos.LoginRequest;
import com.dev.auth.auth_app_backend.dtos.TokenResponse;
import com.dev.auth.auth_app_backend.dtos.UserDto;
import com.dev.auth.auth_app_backend.entities.User;
import com.dev.auth.auth_app_backend.repositories.UserRepository;
import com.dev.auth.auth_app_backend.security.JwtService;
import com.dev.auth.auth_app_backend.services.AuthService;
import com.dev.auth.auth_app_backend.services.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;
    private JwtService jwtService;
    private ModelMapper mapper;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(
            @RequestBody LoginRequest loginReq
    ){

        // authenticate user
        Authentication authenticate = authenticate(loginReq);

        // if user is authenticated, find it by email
        User user = userRepository
                .findByEmail(loginReq.email())
                .orElseThrow(()-> new BadCredentialsException("Invalid email or password"));

        // check if user enabled
        if(!user.isEnable())
            throw new DisabledException("User is disabled");

        // generate user token
        String accessToken = jwtService.generateToken(user);

        TokenResponse tokenResponse = TokenResponse.of(accessToken, "", jwtService.getAccessTtlSeconds(), mapper.map(user, UserDto.class));

        return ResponseEntity.ok(tokenResponse);
    }

    private Authentication authenticate(LoginRequest loginReq) {

        try{

            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginReq.email(),
                    loginReq.password())
            );

        } catch (Exception e){
            throw new BadCredentialsException("Invalid username and password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto>  registerUser(@RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userDto));
    }
}
