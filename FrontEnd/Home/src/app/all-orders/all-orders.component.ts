import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { response } from 'express';
import { MyOrderDetails } from 'src/_model/order.model';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  displayedColumns: string[] = ['Id','User Name', 'Name', 'Product', 'Address','Contact No.','Status','Action'];
  dataSource : MyOrderDetails[] =[];

  status : string = "All"

  constructor(private productService : ProductService){}

  ngOnInit():void{
    this.getAllOrders(this.status);
  }

  getAllOrders(statusParam:string){
    this.productService.getAllOrders(statusParam).subscribe(
      (response :MyOrderDetails[]) => {
        console.log(response);
        this.dataSource=response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  markAsDelivered(orderId:number){
    this.productService.markAsDelivered(orderId).subscribe(
      (response) =>{
        console.log(response);
        this.getAllOrders(this.status);
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}
