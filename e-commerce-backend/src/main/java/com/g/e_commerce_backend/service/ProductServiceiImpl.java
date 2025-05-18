package com.g.e_commerce_backend.service;
import com.g.e_commerce_backend.exception.ResourceNotFoundException;
import com.g.e_commerce_backend.model.Product;
import com.g.e_commerce_backend.model.ProductDTO;
import com.g.e_commerce_backend.model.Seller;
import com.g.e_commerce_backend.repository.ProductRepository;
import com.g.e_commerce_backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceiImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    SellerRepository sellerRepository;

    @Override
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    @Override
    public ResponseEntity<Product> addProduct(ProductDTO productDTO){
        Seller seller=sellerRepository.findById(productDTO.getSellerId()).orElseThrow(()->new ResourceNotFoundException("Seller not found"));

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setSeller(seller);

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
    public ResponseEntity<Product> updateProduct(Long id, ProductDTO productDTO){
        if(productRepository.existsById(id)){

            Product existingProduct = productRepository.findById(id).get();
            Seller seller=sellerRepository.findById(productDTO.getSellerId()).orElseThrow(()->new ResourceNotFoundException("Seller not found"));

            if(productDTO.getName()!=null){
                existingProduct.setName(productDTO.getName());
            }
            if(productDTO.getDescription()!=null){
                existingProduct.setDescription(productDTO.getDescription());
            }
            if(productDTO.getPrice()>0) {
                existingProduct.setPrice(productDTO.getPrice());
            }
            if(seller!=null) {
                existingProduct.setSeller(seller);
            }
            productRepository.save(existingProduct);
            return ResponseEntity.status(200).body(existingProduct);
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }
    public List<Product> searchProducts(String name, Double minPrice, Double maxPrice) {
        return productRepository.searchProducts(name, minPrice, maxPrice);
    }
}
