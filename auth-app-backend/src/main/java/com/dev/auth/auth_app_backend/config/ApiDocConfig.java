package com.dev.auth.auth_app_backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Auth Handler Application",
                description = "Generic state-of-the-art reusable auth application",
                contact = @Contact(
                        name = "lazyGoliath",
                        email = "lazygolith@gmail.com"
                ),
                version = "1.0",
                summary = "App for learning purpose and ready-to-use auth app"
        ),
        security = @SecurityRequirement(
                name = "bearerAuth"
        )
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",   // Authorization : Bearer <token>
        bearerFormat = "JWT"
)
public class ApiDocConfig {
}
