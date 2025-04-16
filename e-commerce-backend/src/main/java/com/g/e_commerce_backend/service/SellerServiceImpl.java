package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.Seller;
import com.g.e_commerce_backend.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    SellerRepository sellerRepository;

    public List<Seller> getAllSellers(){
        return sellerRepository.findAll();
    }
    public ResponseEntity<Seller> addSeller(Seller seller){
        sellerRepository.save(seller);
        return ResponseEntity.status(201).body(seller);
    }
    public ResponseEntity<String> delSeller(Long id){
        if(sellerRepository.existsById(id)){
            sellerRepository.deleteById(id);

            return ResponseEntity.status(200).body("Deleted the seller successfully");
        }
        else{
            return ResponseEntity.status(404).body("Seller not found");
        }
    }
    public ResponseEntity<Seller> updateSeller(Long id , Seller seller){
        if(sellerRepository.existsById(id)){
            Seller existingSeller = sellerRepository.findById(id).get();

            if(seller.getName()!=null){
                existingSeller.setName(seller.getName());
            }
            if(seller.getEmail()!=null){
                existingSeller.setEmail(seller.getEmail());
            }
            if(seller.getPassword()!=null){
                existingSeller.setPassword(seller.getPassword());
            }
            if(seller.getStore()!=null){
                existingSeller.setStore(seller.getStore());
            }


            sellerRepository.save(existingSeller);
            return ResponseEntity.status(200).body(existingSeller);
        }
        else{
            return ResponseEntity.status(404).body(null);
        }
    }

}
