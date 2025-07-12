package com.g.e_commerce_backend.model;

public class UserLoginResponseDTO {

    private String token;
    private Long id;
    private String name;
    private String email;

    public UserLoginResponseDTO(String token, Long id, String name, String email) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}