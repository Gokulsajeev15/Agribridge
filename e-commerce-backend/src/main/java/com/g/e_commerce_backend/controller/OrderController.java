package com.g.e_commerce_backend.controller;

import com.g.e_commerce_backend.model.OrderDTO;
import com.g.e_commerce_backend.model.OrderResponseDTO;
import com.g.e_commerce_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/all")
    public List<OrderResponseDTO> getAllOrders(){
        return orderService.getAllOrders();
    }

    @PostMapping("/add")
    public ResponseEntity<OrderResponseDTO> addNewOrder(@RequestBody OrderDTO orderDTO){
        return orderService.addNewOrder(orderDTO);
    }
    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long id) {
        return orderService.cancelOrder(id);
    }
}
