package com.g.e_commerce_backend.repository;

import com.g.e_commerce_backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {

}
