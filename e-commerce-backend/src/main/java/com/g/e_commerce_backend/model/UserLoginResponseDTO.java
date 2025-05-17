package com.g.e_commerce_backend.model;

public class UserLoginResponseDTO {

    private String token;
    private String name;
    private String email;

    public UserLoginResponseDTO(String token, String name, String email) {
        this.token = token;
        this.name = name;
        this.email = email;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}