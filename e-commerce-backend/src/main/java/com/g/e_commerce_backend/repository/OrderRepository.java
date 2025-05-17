package com.g.e_commerce_backend.repository;

import com.g.e_commerce_backend.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder,Long> {
}
