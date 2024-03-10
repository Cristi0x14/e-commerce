package com.example.restapi.service;

import com.example.restapi.dao.ProductVariationDao;
import com.example.restapi.entity.ColorSizesDTO;
import com.example.restapi.entity.ProductVariation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductVariationService {
    @Autowired
    private ProductVariationDao productVariationDao;
    public ProductVariation addProductVariation(ProductVariation productVariation){
       return productVariationDao.save(productVariation);
    }

    public List<ColorSizesDTO> getVariationsById(Integer id){
        List<ProductVariation> variations = productVariationDao.findByProductId(id);
        List<ColorSizesDTO> colorSizesList = new ArrayList<>();

        for (ProductVariation variation : variations) {
            colorSizesList.add(new ColorSizesDTO(variation.getColor(), variation.getSizes()));
        }

        return colorSizesList;
    }
}
