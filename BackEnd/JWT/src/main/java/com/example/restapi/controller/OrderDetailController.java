package com.example.restapi.controller;

import com.example.restapi.entity.OrderDetail;
import com.example.restapi.entity.OrderInput;
import com.example.restapi.service.OrderDetailService;
import com.example.restapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderDetailController {
    @Autowired
    private OrderDetailService orderDetailService;
    @PreAuthorize("hasRole('User')")
    @PostMapping({"/placeOrder/{isCartCheckout}"})
    public void placeOrder(@PathVariable(name = "isCartCheckout") boolean isCartCheckout, @RequestBody OrderInput orderInput){
        // System.out.println("orderInput.toString() = " + orderInput.toString());
        orderDetailService.placeOrder(orderInput,isCartCheckout);
    }
    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getOrderDetails"})
    public List<OrderDetail> getOrderDetails(){
        return orderDetailService.getOrderDetails();
    }
    @PreAuthorize("hasRole('Admin')")
    @GetMapping({"/getAllOrderDetails"})
    public List<OrderDetail> getAllOrderDetails(){
        return orderDetailService.getAllOrderDetails();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping({"/markOrderAsDelivered/{orderId}"})
    public void markOrderAsDelivered(@PathVariable(name = "orderId") Integer orderId){
        orderDetailService.markOrderAsDelivered(orderId);
    }
}
