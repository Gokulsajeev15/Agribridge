package com.g.e_commerce_backend.controller;

import com.g.e_commerce_backend.model.Seller;
import com.g.e_commerce_backend.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seller")
public class SellerController {
    @Autowired
    SellerService sellerService;

    @GetMapping("/all")
    public List<Seller> getAllSellers(){
        return sellerService.getAllSellers();
    }
    @PostMapping("/add")
    public ResponseEntity<Seller> addSeller(@RequestBody Seller seller){
        return sellerService.addSeller(seller);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delSeller(@PathVariable Long id){
        return sellerService.delSeller(id);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Seller> updateSeller(@PathVariable Long id ,@RequestBody Seller seller){
        return sellerService.updateSeller(id,seller);
    }
}
