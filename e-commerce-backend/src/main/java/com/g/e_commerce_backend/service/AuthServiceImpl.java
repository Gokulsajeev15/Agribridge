package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.exception.ResourceNotFoundException;
import com.g.e_commerce_backend.model.Customer;
import com.g.e_commerce_backend.model.UserLoginRequestDTO;
import com.g.e_commerce_backend.model.UserLoginResponseDTO;
import com.g.e_commerce_backend.model.UserRegisterResponseDTO;
import com.g.e_commerce_backend.repository.CustomerRepository;
import com.g.e_commerce_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private CustomerRepository customerRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<UserRegisterResponseDTO> register(Customer customer) {
        // 1. Check if user already exists
        if (customerRepository.findByEmail(customer.getEmail()).isPresent()) {
            throw new ResourceNotFoundException("User already exists");
        }

        // 2. Hash the password
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));

        // 3. Save user
        customerRepository.save(customer);

        UserRegisterResponseDTO userRegisterResponseDTO=new UserRegisterResponseDTO(
                customer.getId(),
                customer.getName(),
                customer.getEmail()
        );
        return ResponseEntity.status(201).body(userRegisterResponseDTO);
    }
    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<UserLoginResponseDTO> login(UserLoginRequestDTO loginRequest) {
        // 1. Find user by email
        Customer customer = customerRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // 2. Check password using BCrypt
        boolean passwordMatch = passwordEncoder.matches(loginRequest.getPassword(), customer.getPassword());
        if (!passwordMatch) {
            throw new ResourceNotFoundException("Invalid credentials");
        }

        // 3. Generate token using JwtUtil
        String token = jwtUtil.generateToken(customer.getEmail());

        // 4. Build response DTO
        UserLoginResponseDTO response = new UserLoginResponseDTO(token, customer.getId(), customer.getName(), customer.getEmail());

        return ResponseEntity.status(200).body(response);
    }

}
