package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.Product;
import com.g.e_commerce_backend.model.ProductDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    ResponseEntity<Product> addProduct(ProductDTO productDTO);
    ResponseEntity<String> removeProduct(Long id);
    ResponseEntity<Product> updateProduct(Long id, ProductDTO productDTO);
}
