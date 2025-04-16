package com.g.e_commerce_backend.repository;

import com.g.e_commerce_backend.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller,Long> {
}
