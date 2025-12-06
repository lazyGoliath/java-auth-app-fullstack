package com.dev.auth.auth_app_backend.security;

import com.dev.auth.auth_app_backend.entities.User;
import com.dev.auth.auth_app_backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return userRepository.
                findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found with given username"));
    }
}
