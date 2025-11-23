package com.dev.auth.auth_app_backend.dtos;

import org.springframework.http.HttpStatus;

public record ErrorResponse (

        int statusCode,
        HttpStatus status,
        String message,
        String error
    )   {
}