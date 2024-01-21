package com.example.restapi.entity;

import java.util.List;

public class OrderInput {
    private String fullName;
    private String fullAddress;
    private String contactNumber;

    private String alternateContactNumber;
    private List<OrderProductQuantity> orderProductQuantityList;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAlternateContactNumber() {
        return alternateContactNumber;
    }

    public void setAlternateContactNumber(String alternateContactNumber) {
        this.alternateContactNumber = alternateContactNumber;
    }

    public List<OrderProductQuantity> getOrderProductQuantityList() {
        return orderProductQuantityList;
    }

    public void setOrderProductQuantityList(List<OrderProductQuantity> orderProductQuantityList) {
        this.orderProductQuantityList = orderProductQuantityList;
    }

    @Override
    public String toString() {
        String list = "";
        for (OrderProductQuantity o : orderProductQuantityList){
            list = list + " id : " + o.getProductId() + " quantity : "+o.getQuantity();
        }
        return "OrderInput{" +
                "fullName='" + fullName + '\'' +
                ", fullAddress='" + fullAddress + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", alternateContactNumber='" + alternateContactNumber + '\'' +
                ", orderProductQuantityList=" + list +
                '}';
    }
}
