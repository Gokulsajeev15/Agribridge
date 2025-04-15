package com.g.e_commerce_backend.controller;

import com.g.e_commerce_backend.model.Product;
import com.g.e_commerce_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product newProduct = productRepository.save(product);
        return ResponseEntity.status(201).body(newProduct);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> removeProduct(@PathVariable Long id){
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
            return ResponseEntity.status(200).body("Deleted " + id + " successfully");
        }else {
            return ResponseEntity.status(404).body(id + " not found");
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product){
        if(productRepository.existsById(id)){
            Product existingProduct = productRepository.findById(id).get();
            if(product.getName()!=null){
                existingProduct.setName(product.getName());
            }
            if(product.getDescription()!=null){
                existingProduct.setDescription(product.getDescription());
            }
            if(product.getPrice()>0) {
                existingProduct.setPrice(product.getPrice());
            }
            productRepository.save(existingProduct);
            return ResponseEntity.status(200).body(existingProduct);
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }

}
