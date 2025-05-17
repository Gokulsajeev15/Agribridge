package com.g.e_commerce_backend.model;

import java.util.List;

public class OrderResponseDTO {
    private Long orderId;
    private String customerName;
    private String address;
    private double total;
    private String status;
    private List<OrderItemResponseDTO> items;

    public OrderResponseDTO(Long orderId, String customerName, String address, double total, String status, List<OrderItemResponseDTO> items) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.address = address;
        this.total = total;
        this.status = status;
        this.items = items;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItemResponseDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponseDTO> items) {
        this.items = items;
    }
}