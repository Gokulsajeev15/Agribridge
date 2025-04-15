package com.g.e_commerce_backend.controller;

import com.g.e_commerce_backend.model.Customer;
import com.g.e_commerce_backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/all")
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }
    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
        return customerService.addCustomer(customer);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delCustomer(@PathVariable Long id){
        return customerService.delCustomer(id);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id ,@RequestBody Customer customer){
        return customerService.updateCustomer(id,customer);
    }
}
