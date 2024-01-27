package com.example.restapi.service;

import com.example.restapi.configuration.JwtRequestFilter;
import com.example.restapi.dao.OrderDetailDao;
import com.example.restapi.dao.ProductDao;
import com.example.restapi.dao.UserDao;
import com.example.restapi.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.OneToOne;
import java.util.List;

@Service
public class OrderDetailService {
    @Autowired
    private ProductDao productDao;
    private static final String ORDER_PLACED = "Placed";
    @Autowired
    private OrderDetailDao orderDetailDao;
    @Autowired
    private UserDao userDao;
    public void placeOrder(OrderInput orderInput){
        List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user =  userDao.findById(currentUser).get();
        for ( OrderProductQuantity o : productQuantityList ) {
            Product product = productDao.findById(o.getProductId()).get();
            OrderDetail orderDetail = new OrderDetail(
                    orderInput.getFullName(),
                    orderInput.getFullAddress(),
                    orderInput.getContactNumber(),
                    orderInput.getAlternateContactNumber(),
                    ORDER_PLACED,
                    product.getProductDiscountedPrice() * o.getQuantity(),
                    product,
                    user
            );
            orderDetailDao.save(orderDetail);
        }
    }
}
