package com.example.restapi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductVariation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;
    private Integer productId;
    private String productName;
    private String Color;
    private String Sizes;

    public ProductVariation(Integer id, Integer productId, String productName, String color, String sizes) {
        Id = id;
        this.productId = productId;
        this.productName = productName;
        Color = color;
        Sizes = sizes;
    }

    public ProductVariation() {

    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getColor() {
        return Color;
    }

    public void setColor(String color) {
        Color = color;
    }

    public String getSizes() {
        return Sizes;
    }

    public void setSizes(String sizes) {
        Sizes = sizes;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
