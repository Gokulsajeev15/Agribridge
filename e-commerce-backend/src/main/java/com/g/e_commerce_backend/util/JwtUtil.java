package com.g.e_commerce_backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    // Secret key (will be auto-generated here for simplicity)
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Token valid for 24 hours
    private final long expirationMillis = 1000 * 60 * 60 * 24;

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(secretKey)
                .compact();
    }

    public Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)        // Use the same key used to sign the token
                .build()
                .parseClaimsJws(token)           // Decode the token
                .getBody();                      // Return the payload (email, issuedAt, exp, etc.)
    }
}
