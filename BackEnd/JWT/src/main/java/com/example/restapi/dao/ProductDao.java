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
}
