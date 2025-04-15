package com.g.e_commerce_backend.repository;

import com.g.e_commerce_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
