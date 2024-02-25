package com.example.restapi.dao;

import com.example.restapi.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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
    List<Product> findByCategory(String category);
    long countByProductNameContainingIgnoreCaseOrProductNameContainingIgnoreCaseOrProductNameContainingIgnoreCase(
            String key1, String key2,String key3
    );

    // Method to get the total number of pages
    default int getTotalPages(String key1, String key2,String key3, Integer pageSize) {
        long totalProducts = countByProductNameContainingIgnoreCaseOrProductNameContainingIgnoreCaseOrProductNameContainingIgnoreCase(key1, key2,key3);
        return (int) Math.ceil((double) totalProducts / pageSize);
    }
    List<Product> findByBrandIgnoreCaseInAndCategoryIgnoreCaseInAndColorIgnoreCaseInAndSizeIgnoreCaseInAndGenderIgnoreCaseIn(List<String> brand,List<String> category,List<String> color,List<String> size,List<String> gender);

    List<Product> findByBrandIgnoreCaseIn(List<String> brands);
    List<Product> findByCategoryIgnoreCaseIn(List<String> category);
    List<Product> findByGenderIgnoreCaseIn(List<String> gender);
    List<Product> findByBrandIgnoreCaseInAndCategoryIgnoreCaseIn(List<String> brands,List<String> category);
    List<Product> findByBrandIgnoreCaseInAndGenderIgnoreCaseIn(List<String> brands,List<String> gender);
    List<Product> findByCategoryIgnoreCaseInAndGenderIgnoreCaseIn(List<String> category,List<String> gender);
    List<Product> findByBrandIgnoreCaseInAndCategoryIgnoreCaseInAndGenderIgnoreCaseIn(List<String> brands,List<String> category,List<String> gender);
}
