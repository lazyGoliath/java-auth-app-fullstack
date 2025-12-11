package com.dev.auth.auth_app_backend.dtos;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        long expiredIn,
        String tokenType,
        UserDto user
) {

    public static TokenResponse of(
            String accessToken,
            String refreshToken,
            long expiredIn,
            //String tokenType,
            UserDto user
    ) {
        return new TokenResponse(accessToken, refreshToken, expiredIn, "Bearer", user);
    }
}
