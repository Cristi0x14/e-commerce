package com.example.restapi.controller;

import com.example.restapi.entity.Product;
import com.example.restapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;
    @PostMapping({"/product/add"})
    public Product addProduct(@RequestBody Product product){

        return productService.addProduct(product);
    }
}
