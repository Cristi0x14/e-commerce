package com.example.restapi.entity;
import java.util.List;
public class FilteredProducts {
    private List<Product> products;
    private long totalCount;

    public FilteredProducts(List<Product> products, long totalCount) {
        this.products = products;
        this.totalCount = totalCount;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    // Getters and setters
}

