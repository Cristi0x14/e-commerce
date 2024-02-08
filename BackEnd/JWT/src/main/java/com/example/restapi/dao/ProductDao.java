package com.example.restapi.dao;

import com.example.restapi.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.awt.*;

@Repository
public interface ProductDao extends CrudRepository<Product,Integer> {
    public List<Product> findAll(Pageable pageable);
    public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
            String key1, String key2, Pageable pageable
    );
    public List<Product> findByProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCase(
            String key1, String key2, Pageable pageable
    );
    public List<Product> findByProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCase(
            String key1, String key2,String key3, Pageable pageable
    );
}
