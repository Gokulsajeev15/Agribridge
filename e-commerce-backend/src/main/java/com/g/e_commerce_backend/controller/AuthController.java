package com.g.e_commerce_backend.controller;


import com.g.e_commerce_backend.model.Customer;
import com.g.e_commerce_backend.model.UserLoginRequestDTO;
import com.g.e_commerce_backend.model.UserLoginResponseDTO;
import com.g.e_commerce_backend.model.UserRegisterResponseDTO;
import com.g.e_commerce_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponseDTO> registerCustomer(@RequestBody Customer customer){
        return authService.register(customer);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDTO> login(@RequestBody UserLoginRequestDTO userLoginRequestDTO){
        return authService.login(userLoginRequestDTO);
    }

}
