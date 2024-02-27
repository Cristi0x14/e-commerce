package com.example.restapi.service;
import java.util.*;
import java.util.stream.Collectors;

import com.example.restapi.configuration.JwtRequestFilter;
import com.example.restapi.dao.*;
import com.example.restapi.entity.Cart;
import com.example.restapi.entity.Product;
import com.example.restapi.entity.ProductVariation;
import com.example.restapi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private CartDao cartDao;
    public Product addProduct(Product product) {
        return productDao.save(product);
    }

    public List<Product> getAllProducts(int pageNumber, String searchKey){

        Pageable pageable = PageRequest.of(pageNumber,10);
        if(searchKey.equals("")){
            return (List<Product>) productDao.findAll(pageable);
        }
        else{
            return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchKey,searchKey,pageable);
        }
    }

    public List<Product> getAllProducts(int pageNumber, String searchKey1,String searchKey2){

        Pageable pageable = PageRequest.of(pageNumber,10);
        if(searchKey1.equals("") && (searchKey2.equals(""))){
            return (List<Product>) productDao.findAll(pageable);
        }
        else{
            return (List<Product>) productDao.findByProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCase(searchKey1,searchKey2,pageable);
        }
    }

    public List<Product> getAllProducts(int pageNumber, String searchKey1,String searchKey2,String searchKey3){

        Pageable pageable = PageRequest.of(pageNumber,12);
        if(searchKey1.equals("") && (searchKey2.equals("")) && (searchKey3.equals(""))){
            return (List<Product>) productDao.findAll(pageable);
        }
        else{
            return (List<Product>) productDao.findByProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCase(searchKey1,searchKey2,searchKey3,pageable);
        }
    }

    public int getTotalPages(String searchKey1, String searchKey2, String searchKey3,Integer pageSize) {
        return productDao.getTotalPages(searchKey1,searchKey2,searchKey3,pageSize);
    }
    public Product getProductDetailsById(Integer productId){
        return productDao.findById(productId).get();
    }

    public void deleteProductDetails(Integer productId){
        productDao.deleteById(productId);
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId){
        if(isSingleProductCheckout && productId != 0){
            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId).get();
            list.add(product);
            return list;
        }
        else{
            String username = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(username).get();
            List<Cart> cart = cartDao.findByUser(user);
            return cart.stream().map(x -> x.getProduct()).collect(Collectors.toList());
        }
    }
    public List<Product> getProductsByCategory(String category) {
        return productDao.findByCategory(category);
    }

    public List<Product> searchBrands(List<String> brands){
        return productDao.findByBrandIgnoreCaseIn(brands);
    }
    public List<Product> searchCategory(List<String> category)
    {
        return productDao.findByCategoryIgnoreCaseIn(category);
    }
    public List<Product> searchGender(List<String> category)
    {
        return productDao.findByGenderIgnoreCaseIn(category);
    }
    public List<Product> searchBrandsCategory(List<String> brands,List<String> category){
        return productDao.findByBrandIgnoreCaseInAndCategoryIgnoreCaseIn(brands,category);
    }
    public List<Product> searchBrandsGender(List<String> brands,List<String> gender){
        return productDao.findByBrandIgnoreCaseInAndGenderIgnoreCaseIn(brands,gender);
    }
    public List<Product> searchCategoryGender(List<String> category,List<String> gender){
        return productDao.findByBrandIgnoreCaseInAndCategoryIgnoreCaseIn(category,gender);
    }
    public List<Product> searchBrandCategoryGender(List<String> brand,List<String> category,List<String> gender){
        return productDao.findByBrandIgnoreCaseInAndCategoryIgnoreCaseInAndGenderIgnoreCaseIn(brand,category,gender);
    }
    @Autowired
    private ProductRepository productRepository;

    public List<Product> searchProducts(List<String> brands, List<String> categories, List<String> colors, List<String> sizes, List<String> genders) {
        List<Product> products = productRepository.findAll(new ProductSpecification(brands, categories, genders));
        List<Product> filterProducts = new ArrayList<>();

        Set<String> desiredSizes = new HashSet<>(sizes.size());
        Set<String> desiredColors = new HashSet<>(colors.size());

        sizes.forEach(size -> desiredSizes.add(size.toLowerCase()));
        colors.forEach(color -> desiredColors.add(color.toLowerCase()));

        for (Product product : products) {
            boolean matchFound = false;
            if (!desiredColors.isEmpty() && !desiredSizes.isEmpty()) {

                List<ProductVariation> variations = productVariationDao.findByProductId(product.getProductId());

                if (variations != null && !variations.isEmpty()) {
                    Set<String> availableSizes = new HashSet<>();
                    Set<String> availableColors = new HashSet<>();

                    for (ProductVariation variation : variations) {
                        availableSizes.addAll(Arrays.asList(variation.getSizes().toLowerCase().split(",")));
                        availableColors.addAll(Arrays.asList(variation.getColor().toLowerCase().split(",")));
                    }

                    if (!Collections.disjoint(availableSizes, desiredSizes) && !Collections.disjoint(availableColors, desiredColors)) {
                        matchFound = true;
                    }
                }

            }
            else{
                return products;
            }
            if (matchFound) {
                filterProducts.add(product);
            }
        }

        return filterProducts;
    }

     public Product getProductById(Integer productId) {
         return productDao.findById(productId).orElse(null);
    }
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }
    @Autowired
    private ProductVariationDao productVariationDao;
    public ProductVariation addProductVariation(ProductVariation productVariation){
        return productVariationDao.save(productVariation);
    }
}
