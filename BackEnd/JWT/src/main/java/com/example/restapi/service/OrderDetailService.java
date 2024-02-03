package com.example.restapi.service;

import com.example.restapi.configuration.JwtRequestFilter;
import com.example.restapi.dao.CartDao;
import com.example.restapi.dao.OrderDetailDao;
import com.example.restapi.dao.ProductDao;
import com.example.restapi.dao.UserDao;
import com.example.restapi.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.OneToOne;
import java.util.ArrayList;
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
    @Autowired
    private CartDao cartDao;
    public void placeOrder(OrderInput orderInput, boolean isCartCheckout){
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
            if(!isCartCheckout){
                List<Cart> carts = cartDao.findByUser(user);
                carts.stream().forEach(x -> cartDao.delete(x));
            }
            orderDetailDao.save(orderDetail);
        }
    }

    public List<OrderDetail> getOrderDetails(){
        String currentUser = JwtRequestFilter.CURRENT_USER;
        User user =  userDao.findById(currentUser).get();
        return orderDetailDao.findByUser(user);
    }

    public List<OrderDetail> getAllOrderDetails(String status){
        List<OrderDetail> orderDetails = new ArrayList<>();
        if(status.equals("All")){
            orderDetailDao.findAll().forEach(x -> orderDetails.add(x));
        }
        else {
            orderDetailDao.findByOrderStatus(status).forEach(
                    x-> orderDetails.add(x)
            );
        }
        return orderDetails;
    }

    public void markOrderAsDelivered( Integer orderId){
        OrderDetail orderDetail = orderDetailDao.findById(orderId).get();
        if(orderDetail != null){
            orderDetail.setOrderStatus("Delivered");
            orderDetailDao.save(orderDetail);
        }
    }
}
