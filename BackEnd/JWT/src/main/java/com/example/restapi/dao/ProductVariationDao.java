package com.example.restapi.dao;

import com.example.restapi.entity.ProductVariation;
import org.springframework.data.repository.CrudRepository;
import java.util.*;
public interface ProductVariationDao extends CrudRepository<ProductVariation,Integer> {
    List<ProductVariation> findByProductId(Integer productId);
}
