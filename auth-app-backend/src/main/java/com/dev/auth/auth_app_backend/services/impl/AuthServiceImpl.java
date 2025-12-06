package com.dev.auth.auth_app_backend.services.impl;

import com.dev.auth.auth_app_backend.config.SecurityConfig;
import com.dev.auth.auth_app_backend.dtos.UserDto;
import com.dev.auth.auth_app_backend.services.AuthService;
import com.dev.auth.auth_app_backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(UserDto userDto) {

        // verify email
        //verify password

        // encrypt user password
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // create/ register new user
        UserDto userDto1 = userService.createUser(userDto);

        return userDto1;
    }
}
