package com.example.restapi.entity;

public class ColorSizesDTO {
    private String color;
    private String sizes;

    public ColorSizesDTO(String color, String sizes) {
        this.color = color;
        this.sizes = sizes;
    }

    // Getters and setters
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSizes() {
        return sizes;
    }

    public void setSizes(String sizes) {
        this.sizes = sizes;
    }
}