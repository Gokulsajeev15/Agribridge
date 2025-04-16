package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.Seller;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SellerService {
    List<Seller> getAllSellers();
    ResponseEntity<Seller> addSeller(Seller seller);
    ResponseEntity<String> delSeller(Long id);
    ResponseEntity<Seller> updateSeller(Long id , Seller seller);
}
