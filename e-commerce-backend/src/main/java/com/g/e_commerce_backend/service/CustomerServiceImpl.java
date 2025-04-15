package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.Customer;
import com.g.e_commerce_backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    CustomerRepository customerRepository;

    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    public ResponseEntity<Customer> addCustomer(Customer customer){
        customerRepository.save(customer);
        return ResponseEntity.status(201).body(customer);
    }
    public ResponseEntity<String> delCustomer(Long id){
        if(customerRepository.existsById(id)){
            customerRepository.deleteById(id);

            return ResponseEntity.status(200).body("Deleted the customer successfully");
        }
        else{
            return ResponseEntity.status(404).body("Customer not found");
        }
    }
    public ResponseEntity<Customer> updateCustomer(Long id , Customer customer){
        if(customerRepository.existsById(id)){
            Customer existingCustomer = customerRepository.findById(id).get();

            if(customer.getName()!=null){
                existingCustomer.setName(customer.getName());
            }
            if(customer.getEmail()!=null){
                existingCustomer.setEmail(customer.getEmail());
            }
            if(customer.getPassword()!=null){
                existingCustomer.setPassword(customer.getPassword());
            }

            customerRepository.save(existingCustomer);
            return ResponseEntity.status(200).body(existingCustomer);
        }
        else{
            return ResponseEntity.status(404).body(null);
        }
    }
}
