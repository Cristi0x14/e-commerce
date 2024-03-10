package com.example.restapi.controller;

import com.example.restapi.entity.*;
import com.example.restapi.service.ProductService;
import com.example.restapi.service.ProductVariationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductVariationService productVariationService;
    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = {"/product/add"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addProduct(@RequestPart("product") Product product,
                              @RequestPart("image_file") MultipartFile[] file,
                              @RequestPart("variations") String variationsJson) {
        try {
            Set<ImageModel> images = uploadImage(file);
            product.setProductImages(images);

            ObjectMapper objectMapper = new ObjectMapper();
            ProductVariation[] variations = objectMapper.readValue(variationsJson, ProductVariation[].class);

            Product productSaved =productService.addProduct(product);

            for (ProductVariation variation : variations) {
                variation.setProductId(productSaved.getProductId());
                variation.setProductName(productSaved.getProductName());
                productService.addProductVariation(variation);
            }

            return productSaved;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = {"/product/add/CompleteProductJson"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Product addProductFullJson(@RequestBody Product product ){
        try {
            return productService.addProduct(product);
        } catch (Exception e) {
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

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getProductsByCategory(category);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/getPageCount")
    public Integer getPageCount(@RequestParam(defaultValue = "12") int pageSize,@RequestParam(defaultValue = "") String searchKey1,@RequestParam(defaultValue = "") String searchKey2,@RequestParam(defaultValue = "") String searchKey3){
        return productService.getTotalPages(searchKey1,searchKey2,searchKey3,pageSize);
    }

    @GetMapping({"/getProductDetailsById/{productId}"})
    public Product getProductDetailsById(@PathVariable("productId") Integer productId){
        return productService.getProductDetailsById(productId);
    }
    @GetMapping({"/getProductVariationsById/{productId}"})
    public List<ColorSizesDTO> getProductVariationsById(@PathVariable("productId") Integer productId){
        return productVariationService.getVariationsById(productId);
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
    //@PreAuthorize("hasRole('User')")
    @GetMapping("/products")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam(defaultValue = "12") int pageSize,
                                                        @RequestParam(defaultValue = "0") int pageNumber,
                                                        @RequestParam(required = false) List<String> brands,
                                                        @RequestParam(required = false) List<String> categories,
                                                        @RequestParam(required = false) List<String> colors,
                                                        @RequestParam(required = false) List<String> sizes,
                                                        @RequestParam(required = false) List<String> genders) {
        FilteredProducts filteredProducts = productService.searchProducts(brands, categories, colors, sizes, genders, pageNumber, pageSize);
        if (filteredProducts.getProducts().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(filteredProducts.getProducts());
    }
   // @PreAuthorize("hasRole('User')")
    @GetMapping("/productsTotalCount")
    public ResponseEntity<Long> searchProductsGetTotalCount(@RequestParam(defaultValue = "12") int pageSize,
                                                        @RequestParam(defaultValue = "0") int pageNumber,
                                                        @RequestParam(required = false) List<String> brands,
                                                        @RequestParam(required = false) List<String> categories,
                                                        @RequestParam(required = false) List<String> colors,
                                                        @RequestParam(required = false) List<String> sizes,
                                                        @RequestParam(required = false) List<String> genders) {
        FilteredProducts filteredProducts = productService.searchProducts(brands, categories, colors, sizes, genders, pageNumber, pageSize);
        if (filteredProducts.getProducts().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(filteredProducts.getTotalCount());
    }

}
