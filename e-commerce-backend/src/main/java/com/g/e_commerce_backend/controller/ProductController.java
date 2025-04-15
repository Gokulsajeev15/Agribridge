package com.g.e_commerce_backend.controller;
import com.g.e_commerce_backend.model.Product;
import com.g.e_commerce_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        return productService.addProduct(product);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> removeProduct(@PathVariable Long id){
        return productService.removeProduct(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product){
        return productService.updateProduct(id , product);
    }

}
