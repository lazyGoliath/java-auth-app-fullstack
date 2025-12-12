package com.dev.auth.auth_app_backend.security;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
public class CookieService {

    private final String refreshTokenCookieName;
    private final boolean cookieHttpOnly;
    private final boolean cookieSecure;
    private final String cookieDomain;
    private final String cookieSameSite;
    //private final String cookieExpires;
    //private final String cookieMaxAge;

    private final Logger logger = LoggerFactory.getLogger(CookieService.class);

    public CookieService(
            @Value("${security.jwt.refresh-token-cookie-name}") String refreshTokenCookieName,
            @Value("${security.jwt.cookie-http-only}") boolean cookieHttpOnly,
            @Value("${security.jwt.cookie-secure}") boolean cookieSecure,
            @Value("${security.jwt.cookie-domain}") String cookieDomain,
            @Value("${security.jwt.cookie-same-site}") String cookieSameSite) {

        this.refreshTokenCookieName = refreshTokenCookieName;
        this.cookieHttpOnly = cookieHttpOnly;
        this.cookieSecure = cookieSecure;
        this.cookieDomain = cookieDomain;
        this.cookieSameSite = cookieSameSite;
    }

    // create method to attach cookie to response
    public void attachRefreshCookie(HttpServletResponse response, String value, int maxAge) {

        logger.info("Attaching cookie with name : {} and value : {}", refreshTokenCookieName, value);

        var responseCookieBuilder =  ResponseCookie.from(refreshTokenCookieName, value)
                .httpOnly(cookieHttpOnly)
                .secure(cookieSecure)
                .path("/")
                .maxAge(maxAge)
                .sameSite(cookieSameSite);

        if(cookieDomain != null &&  !cookieDomain.isBlank())
            responseCookieBuilder.domain(cookieDomain);

        // attach and build the response cookie
        ResponseCookie responseCookie = responseCookieBuilder.build();

        // attach cookie to the http response
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }

    // clear refresh cookie (logout)
    public void clearRefreshCookie(HttpServletResponse response) {

        var builder = ResponseCookie.from(refreshTokenCookieName, "")
                .httpOnly(cookieHttpOnly)
                .secure(cookieSecure)
                .path("/")
                .maxAge(0)
                .sameSite(cookieSameSite);

        response.addHeader(HttpHeaders.SET_COOKIE, builder.build().toString());
    }

    // cache storage control method

    /** After setting these headers:
     * The browser will not save the page.
     * The user will not see stale cached versions.
     * Sensitive information is protected from being recovered via browser cache.
     */

    public void addNoStoreHeaders(HttpServletResponse response) {

        response.setHeader(HttpHeaders.CACHE_CONTROL, "no-store");  //HTTP/1.1 (modern browsers)
        response.setHeader(HttpHeaders.PRAGMA, "no-cache");  // HTTP/1.0
    }
}
