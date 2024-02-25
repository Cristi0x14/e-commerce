package com.example.restapi.controller;

import com.example.restapi.entity.ImageModel;
import com.example.restapi.entity.Product;
import com.example.restapi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
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



/*    @GetMapping("/products")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) List<String> brand,
            @RequestParam(required = false) List<String> category,
            @RequestParam(required = false) List<String> color,
            @RequestParam(required = false) List<String> size,
            @RequestParam(required = false) List<String> gender) {
        List<Product> products = productService.searchProducts(brand, category, color, size, gender);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }*/

    @GetMapping("/products")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam(required = false) List<String> brands,
                                                        @RequestParam(required = false) List<String> categories,
                                                        @RequestParam(required = false) List<String> colors,
                                                        @RequestParam(required = false) List<String> sizes,
                                                        @RequestParam(required = false) List<String> genders) {
        List<Product> products = productService.searchProducts(brands, categories, colors, sizes, genders);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


/*    @GetMapping("/products")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false, defaultValue = "") List<String> brand,
            @RequestParam(required = false, defaultValue = "") List<String> category,
            @RequestParam(required = false, defaultValue = "") List<String> gender) {
        List<Product> products = new ArrayList<>();
        if (!brand.isEmpty()){
            if (!category.isEmpty()){
                if (!gender.isEmpty()){
                    products = productService.searchBrandCategoryGender(brand,category,gender);
                }
                else{
                    products = productService.searchBrandsCategory(brand,category);
                }
            }
            else {
                if (!gender.isEmpty()){
                    products = productService.searchBrandsGender(brand,gender);
                }
                else {
                    products = productService.searchBrands(brand);
                }
            }
        }
        else
        {
            if (!category.isEmpty()){
                if (!gender.isEmpty()){
                    products = productService.searchCategoryGender(category,gender);
                }
                else {
                    products = productService.searchCategory(category);
                }
            }
            else {
                products = productService.searchGender(gender);
            }
        }

        System.out.println("brand " + brand);
        System.out.println("category= " + category);
        System.out.println("gender= " + gender);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }*/
}
