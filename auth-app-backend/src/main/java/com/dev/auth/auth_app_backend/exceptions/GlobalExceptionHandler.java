package com.dev.auth.auth_app_backend.exceptions;

import com.dev.auth.auth_app_backend.dtos.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// handle exceptions globally
@RestControllerAdvice
public class GlobalExceptionHandler {

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
