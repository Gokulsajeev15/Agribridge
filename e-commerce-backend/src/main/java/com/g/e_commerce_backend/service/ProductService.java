package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    ResponseEntity<Product> addProduct(Product product);
    ResponseEntity<String> removeProduct(Long id);
    ResponseEntity<Product> updateProduct(Long id, Product product);
}
