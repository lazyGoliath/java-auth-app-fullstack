package com.dev.auth.auth_app_backend.exceptions;

import com.dev.auth.auth_app_backend.dtos.ApiError;
import com.dev.auth.auth_app_backend.dtos.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// handle exceptions globally
@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // will run if exception occur at Servlet ; not at Filter level
    @ExceptionHandler({
            UsernameNotFoundException.class,
            BadCredentialsException.class,
            CredentialsExpiredException.class,
//            ExpiredJwtException.class,
//            JwtException.class, -> will occur at Filter level
            DisabledException.class
    })
    public ResponseEntity<ApiError> handleAuthExceptions(Exception e, HttpServletRequest req){

        logger.info("Exception Class : {}", e.getClass().getName());

        var apiError = ApiError.of(HttpStatus.BAD_REQUEST.value(), "Bad Request", e.getMessage(), req.getRequestURI());
        return ResponseEntity.badRequest().body(apiError);
    }

    // resource not found exception handler :: method
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException exception) {
        ErrorResponse internalServerError = new ErrorResponse(404, HttpStatus.NOT_FOUND, exception.getMessage(), "Resource not found !!");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(internalServerError);
    }

    // illegal argument exception handler :: method
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException exception) {
        ErrorResponse internalServerError = new ErrorResponse(400, HttpStatus.BAD_REQUEST, exception.getMessage(), "U ser Data Invalid !!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(internalServerError);
    }
}
