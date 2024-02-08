package com.example.restapi.service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.example.restapi.configuration.JwtRequestFilter;
import com.example.restapi.dao.CartDao;
import com.example.restapi.dao.ProductDao;
import com.example.restapi.dao.UserDao;
import com.example.restapi.entity.Cart;
import com.example.restapi.entity.Product;
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

        Pageable pageable = PageRequest.of(pageNumber,10);
        if(searchKey1.equals("") && (searchKey2.equals("")) && (searchKey3.equals(""))){
            return (List<Product>) productDao.findAll(pageable);
        }
        else{
            return (List<Product>) productDao.findByProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCaseAndProductNameContainingIgnoreCase(searchKey1,searchKey2,searchKey3,pageable);
        }
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

}
