package com.example.restapi.service;

import com.example.restapi.dao.ProductVariationDao;
import com.example.restapi.entity.ProductVariation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductVariationService {
    @Autowired
    private ProductVariationDao productVariationDao;
    public ProductVariation addProductVariation(ProductVariation productVariation){
       return productVariationDao.save(productVariation);
    }

}
