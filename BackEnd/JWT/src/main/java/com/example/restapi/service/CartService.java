package com.example.restapi.service;

import com.example.restapi.configuration.JwtRequestFilter;
import com.example.restapi.dao.CartDao;
import com.example.restapi.dao.ProductDao;
import com.example.restapi.dao.UserDao;
import com.example.restapi.entity.Cart;
import com.example.restapi.entity.Product;
import com.example.restapi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartDao cartDao;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private UserDao userDao;
    public Cart addToCart(Integer productId){
        Product product = productDao.findById(productId).get();
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = null;
        if(currentUser != null){
            user =  userDao.findById(currentUser).get();
        }

        List<Cart> cartList = cartDao.findByUser(user);
        List<Cart> filteredList = cartList.stream().filter(x -> x.getProduct().getProductId() == productId).collect(Collectors.toList());

        if(filteredList.size()>0){
            return null;
        }

        if(product != null && user != null){
            Cart cart = new Cart(product,user);
            return cartDao.save(cart);
        }
        return null;
    }

    public List<Cart> getCartDetails(){
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = userDao.findById(currentUser).get();
        return cartDao.findByUser(user);
    }
    public void deleteById(Integer cartId){
        cartDao.deleteById(cartId);
    }
}
