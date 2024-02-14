package com.example.restapi.controller;

import com.example.restapi.entity.ImageModel;
import com.example.restapi.entity.Product;
import com.example.restapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;
    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = {"/product/add"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addProduct(@RequestPart("product") Product product,
                              @RequestPart("image_file") MultipartFile[] file){
        try {
            Set<ImageModel> images = uploadImage(file);
            product.setProductImages(images);
            return productService.addProduct(product);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();
        for (MultipartFile file : multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }
        return imageModels;
    }
    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts(@RequestParam(defaultValue = "0") int pageNumber,@RequestParam(defaultValue = "") String searchKey1,@RequestParam(defaultValue = "") String searchKey2,@RequestParam(defaultValue = "") String searchKey3){
        if(searchKey2.equals("")){

        }
        List<Product> result = productService.getAllProducts(pageNumber,searchKey1,searchKey2,searchKey3);
        return result;
    }

    @GetMapping("/getPageCount")
    public Integer getPageCount(@RequestParam(defaultValue = "12") int pageSize,@RequestParam(defaultValue = "") String searchKey1,@RequestParam(defaultValue = "") String searchKey2,@RequestParam(defaultValue = "") String searchKey3){
        return productService.getTotalPages(searchKey1,searchKey2,searchKey3,pageSize);
    }

    @GetMapping({"/getProductDetailsById/{productId}"})
    public Product getProductDetailsById(@PathVariable("productId") Integer productId){
        return productService.getProductDetailsById(productId);
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping({"/deleteProductDetails/{productId}"})
    public void deleteProductDetails(@PathVariable("productId") Integer productId){
        productService.deleteProductDetails(productId);
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})
    public List<Product> getProductDetails(@PathVariable(name = "isSingleProductCheckout") boolean isSingleProductCheckout,
                                  @PathVariable(name = "productId") Integer productId){
        return productService.getProductDetails(isSingleProductCheckout,productId);
    }
}
