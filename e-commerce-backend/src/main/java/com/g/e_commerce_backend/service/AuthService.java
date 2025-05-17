package com.g.e_commerce_backend.service;


import com.g.e_commerce_backend.model.Customer;
import com.g.e_commerce_backend.model.UserLoginRequestDTO;
import com.g.e_commerce_backend.model.UserLoginResponseDTO;
import com.g.e_commerce_backend.model.UserRegisterResponseDTO;
import org.springframework.http.ResponseEntity;


public interface AuthService {
    ResponseEntity<UserRegisterResponseDTO> register(Customer customer);
    public ResponseEntity<UserLoginResponseDTO> login(UserLoginRequestDTO loginRequest);
}
