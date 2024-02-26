package com.example.restapi.dao;

import com.example.restapi.entity.ProductVariation;
import org.springframework.data.repository.CrudRepository;

public interface ProductVariationDao extends CrudRepository<ProductVariation,Integer> {
}
