import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/_model/product.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderDetails } from 'src/_model/order-details.model';
import { MyOrderDetails } from 'src/_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  public addProduct(product: FormData): Observable<Product> {
    return this.httpClient.post<Product>("http://localhost:8081/product/add", product)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  public getAllProducts(pageNumber: number, searchKeyword: String): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8081/getAllProducts?pageNumber=" + pageNumber + "&searchKey=" + searchKeyword)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  public getProductDetailsById(productId: number) {
    return this.httpClient.get<Product>("http://localhost:8081/getProductDetailsById/" + productId)
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete("http://localhost:8081/deleteProductDetails/" + productId);
  }

  public getProductDetails(isSingleProductCheckout: Boolean, productId: number) {
    return this.httpClient.get<Product[]>("http://localhost:8081/getProductDetails/" + isSingleProductCheckout + "/" + productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout : boolean) {
    return this.httpClient.post("http://localhost:8081/placeOrder/"+isCartCheckout, orderDetails);
  }
  public addToCart(productId: number) {
    return this.httpClient.get("http://localhost:8081/addToCart/" + productId);
  }
  public getCartDetails(){
    return this.httpClient.get("http://localhost:8081/getCartDetails");
  }
  public deleteCartItem(cartId: Number){
    return this.httpClient.delete("http://localhost:8081/deleteCartItem/"+cartId);
  }
  public getMyOrders() : Observable <MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:8081/getOrderDetails");
  }
  public getAllOrders() : Observable <MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:8081/getAllOrderDetails");
  }
  public markAsDelivered(orderId:number) {
    return this.httpClient.get("http://localhost:8081/markOrderAsDelivered/"+orderId);
  }
}
