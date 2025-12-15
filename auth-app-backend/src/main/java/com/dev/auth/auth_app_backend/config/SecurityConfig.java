package com.dev.auth.auth_app_backend.config;

import com.dev.auth.auth_app_backend.dtos.ApiError;
import com.dev.auth.auth_app_backend.security.JwtAuthenticationFilter;
import com.dev.auth.auth_app_backend.security.OAuth2SuccessHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Map;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter  jwtAuthenticationFilter;
    private final OAuth2SuccessHandler successHandler;
    private final Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, OAuth2SuccessHandler successHandler) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.successHandler = successHandler;
    }

    // make /register and /login end points accessible
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .authorizeHttpRequests((authorize) -> authorize
                .requestMatchers(
                                    "/api/v1/auth/register",
                                    "/api/v1/auth/login",
                                    "/api/v1/auth/refresh",
                                    "/api/v1/auth/logout",
                                    "/error"
                            ).permitAll()
                            .anyRequest().authenticated()
            )
            // oauth 2 configuration
                .oauth2Login(oauth->
                        oauth.successHandler(successHandler)
                                .failureHandler(null))
                .logout(AbstractHttpConfigurer::disable)
            //.httpBasic(Customizer.withDefaults()) -> JWT
            .exceptionHandling((e)->
                e.authenticationEntryPoint((req, resp, ex)->{
                    // error message
                    log.error("Authentication error", ex);
                    resp.setStatus(401);  //unauthenticated user
                    resp.setContentType("application/json");
                    String mssg = "Unauthorized access : "+ex.getMessage();

                    var error = req.getAttribute("error");
                    mssg = (error!=null) ? error.toString() : mssg;

//                    Map<String, String> errorMap = Map.of(
//                            "message",mssg,
//                            "status",String.valueOf(401),
//                            "statusCode", Integer.toString(401)
//                    );
                    var apiError = ApiError.of(HttpStatus.UNAUTHORIZED.value(), "Unauthorized Access !", mssg, req.getRequestURI());
                    var objectMapper = new ObjectMapper();
                    resp.getWriter().write(objectMapper.writeValueAsString(apiError));
                })
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .sessionManagement((session) ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
//    @Bean
//    public UserDetailsService users(){
//        User.UserBuilder users = User.withDefaultPasswordEncoder();
//
//        UserDetails user1 = users.username("admin").password("admin").roles("ADMIN").build();
//        UserDetails user2 = users.username("user").password("user").roles("USER").build();
//
//        return new InMemoryUserDetailsManager(user1,user2);
//    }
}
