package com.example.restapi.controller;

import com.example.restapi.entity.OrderInput;
import com.example.restapi.service.OrderDetailService;
import com.example.restapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

}
