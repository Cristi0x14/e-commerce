package com.example.restapi.dao;

import com.example.restapi.entity.OrderDetail;
import com.example.restapi.entity.User;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface OrderDetailDao extends CrudRepository<OrderDetail,Integer> {
    public List<OrderDetail> findByUser(User user);
    public List<OrderDetail> findByOrderStatus(String status);
}
