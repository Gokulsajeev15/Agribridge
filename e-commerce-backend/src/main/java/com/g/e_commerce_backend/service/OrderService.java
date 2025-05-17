package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.CustomerOrder;
import com.g.e_commerce_backend.model.OrderDTO;
import com.g.e_commerce_backend.model.OrderResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    List<OrderResponseDTO> getAllOrders();
    ResponseEntity<OrderResponseDTO> addNewOrder(OrderDTO orderDTO);
    ResponseEntity<String> cancelOrder(Long id);
}
