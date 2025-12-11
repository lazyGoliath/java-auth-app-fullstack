package com.dev.auth.auth_app_backend.dtos;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record ApiError(
        int status,
        String error,
        String message,
        String path,
        OffsetDateTime timeStamp
) {

    public static ApiError of(int status, String error, String message, String path, OffsetDateTime timeStamp) {
        timeStamp = OffsetDateTime.now(ZoneOffset.UTC);
        return new ApiError(status, error, message, path, timeStamp);
    }

    public static ApiError of(int status, String error, String message, String path) {
        return new ApiError(status, error, message, path, null);
    }
}
