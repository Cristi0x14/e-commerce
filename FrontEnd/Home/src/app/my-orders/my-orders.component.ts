import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { response } from 'express';
import { MyOrderDetails } from 'src/_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  displayedColumns: string[] = ['Name', 'Product', 'Address', 'Contact No.', 'Amount','Status'];
  myOrderDetails : MyOrderDetails[] = [];

  constructor(private productService: ProductService){  }
  ngOnInit():void{
    this.getOrderDetails();
  }
  getOrderDetails(){
    this.productService.getMyOrders().subscribe(
      (response : MyOrderDetails[] ) =>{
        console.log(response);
        this.myOrderDetails = response;
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
