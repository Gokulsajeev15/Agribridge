package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.Customer;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomers();
    ResponseEntity<Customer> addCustomer(Customer customer);
    ResponseEntity<String> delCustomer(Long id);
    ResponseEntity<Customer> updateCustomer(Long id , Customer customer);
}
