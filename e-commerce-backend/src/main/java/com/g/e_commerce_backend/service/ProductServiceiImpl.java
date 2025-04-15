package com.g.e_commerce_backend.service;
import com.g.e_commerce_backend.model.Product;
import com.g.e_commerce_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceiImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    @Override
    public ResponseEntity<Product> addProduct(Product product){
        productRepository.save(product);
        return ResponseEntity.status(201).body(product);
    }
    @Override
    public ResponseEntity<String> removeProduct(Long id){
        if(productRepository.existsById(id)){
            productRepository.deleteById(id);
            return ResponseEntity.status(200).body("Deleted " + id + " successfully");
        }else {
            return ResponseEntity.status(404).body(id + " not found");
        }
    }
    @Override
    public ResponseEntity<Product> updateProduct(Long id, Product product){
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
