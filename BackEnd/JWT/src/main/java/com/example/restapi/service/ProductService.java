package com.example.restapi.service;
import java.util.ArrayList;
import java.util.List;
import com.example.restapi.dao.ProductDao;
import com.example.restapi.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;
    public Product addProduct(Product product) {
        return productDao.save(product);
    }

    public List<Product> getAllProducts(){
        return (List<Product>) productDao.findAll();
    }

    public Product getProductDetailsById(Integer productId){
        return productDao.findById(productId).get();
    }

    public void deleteProductDetails(Integer productId){
        productDao.deleteById(productId);
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId){
        if(isSingleProductCheckout){
            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId).get();
            list.add(product);
            return list;
        }
        else{

        }
        return new ArrayList<>();
    }

}
