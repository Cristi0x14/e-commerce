package com.example.restapi.service;

import com.example.restapi.dao.ProductDao;
import com.example.restapi.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;
    public Product addProduct(Product product) {
        return productDao.save(product);
    }
}
