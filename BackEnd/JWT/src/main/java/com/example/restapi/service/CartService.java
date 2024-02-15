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

    public Cart addToCart(Integer productId) {
        Product product = productDao.findById(productId).get();
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = null;
        if(currentUser != null){
            user =  userDao.findById(currentUser).get();
        }

        Optional<Cart> existingCartOptional = cartDao.findByUserAndProduct(user, product);

        if (existingCartOptional.isPresent()) {
            Cart existingCart = existingCartOptional.get();
            existingCart.setAmount(existingCart.getAmount() + 1);
            return cartDao.save(existingCart);
        } else {
            Cart newCart = new Cart(product, user);
            newCart.setAmount(1);
            return cartDao.save(newCart);
        }
    }

    public Cart removeFromCart(Integer productId) {
        Product product = productDao.findById(productId).orElse(null);
        if (product == null) {
            return null;
        }

        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user = null;
        if (currentUser != null) {
            user = userDao.findById(currentUser).orElse(null);
        }
        if (user == null) {
            return null;
        }

        Optional<Cart> existingCartOptional = cartDao.findByUserAndProduct(user, product);
        if (existingCartOptional.isPresent()) {
            Cart existingCart = existingCartOptional.get();
            int newAmount = existingCart.getAmount() - 1;
            if (newAmount <= 0) {
                //cartDao.delete(existingCart);
                return null;
            } else {
                existingCart.setAmount(newAmount);
                return cartDao.save(existingCart);
            }
        } else {
            return null;
        }
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
