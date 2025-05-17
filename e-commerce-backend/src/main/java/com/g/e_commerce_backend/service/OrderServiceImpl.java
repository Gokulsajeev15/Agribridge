package com.g.e_commerce_backend.service;

import com.g.e_commerce_backend.model.*;
import com.g.e_commerce_backend.repository.CustomerRepository;
import com.g.e_commerce_backend.repository.OrderItemRepository;
import com.g.e_commerce_backend.repository.OrderRepository;
import com.g.e_commerce_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    OrderItemRepository orderItemRepository;

    public List<OrderResponseDTO> getAllOrders(){

        List<CustomerOrder> orders = orderRepository.findAll();
        List<OrderResponseDTO> responseList = new ArrayList<>();

        for (CustomerOrder order : orders) {
            List<OrderItemResponseDTO> itemDTOs = new ArrayList<>();

            for (OrderItem item : order.getOrderItems()) {
                itemDTOs.add(new OrderItemResponseDTO(
                        item.getProduct().getName(),
                        item.getPrice(),
                        item.getQuantity()
                ));
            }

            OrderResponseDTO responseDTO = new OrderResponseDTO(
                    order.getId(),
                    order.getCustomer().getName(),
                    order.getAddress(),
                    order.getTotal(),
                    order.getStatus(),
                    itemDTOs
            );

            responseList.add(responseDTO);
        }

        return responseList;
    }


    @Override
    public ResponseEntity<OrderResponseDTO> addNewOrder(OrderDTO orderDTO) {
        Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

            CustomerOrder order =new CustomerOrder();
            order.setCustomer(customer);
            order.setAddress(orderDTO.getAddress());

            double totalAmount =0;
            List<OrderItem> ListOfItems = new ArrayList<>();

            for (OrderItemDTO orderItem: orderDTO.getItems()){
                Product product = productRepository.findById(orderItem.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));

                OrderItem orderItems= new OrderItem();

                orderItems.setOrder(order);
                orderItems.setQuantity(orderItem.getQuantity());
                orderItems.setPrice(orderItem.getPrice());
                orderItems.setProduct(product);

                totalAmount += orderItems.getPrice()*orderItems.getQuantity();
                ListOfItems.add(orderItems);
            }
            order.setTotal(totalAmount);
            order.setStatus("pending");

            orderRepository.save(order);
            orderItemRepository.saveAll(ListOfItems);

        List<OrderItemResponseDTO> itemDTOs = new ArrayList<>();

        for (OrderItem item : ListOfItems) {
            itemDTOs.add(new OrderItemResponseDTO(
                    item.getProduct().getName(),
                    item.getPrice(),
                    item.getQuantity()
            ));
        }
        OrderResponseDTO responseDTO = new OrderResponseDTO(
                order.getId(),
                customer.getName(),
                order.getAddress(),
                order.getTotal(),
                order.getStatus(),
                itemDTOs
        );

        return ResponseEntity.status(200).body(responseDTO);

    }
    public ResponseEntity<String> cancelOrder(Long id) {
        CustomerOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getStatus().equalsIgnoreCase("cancelled")) {
            order.setStatus("cancelled");
            orderRepository.save(order);
            return ResponseEntity.status(200).body("Order " + id + " cancelled successfully.");
        } else {
            return ResponseEntity.status(400).body("Order " + id + " is already cancelled.");
        }
    }
}
