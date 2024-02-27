import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getAllProducts(pageNumber: number, searchKeyword1: String, searchKeyword2: String, searchKeyword3: String): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8081/getAllProducts?pageNumber=" + pageNumber + "&searchKey1=" + searchKeyword1+ "&searchKey2=" + searchKeyword2+ "&searchKey3=" + searchKeyword3)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  public getProducts(brands: String[],categories: String[],genders: String[],colors: String[],sizes: String[]): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8081/products?brands=" + brands + "&categories=" + categories +"&genders=" + genders + "&colors=" + colors + "&sizes=" + sizes)
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  public getProductByCategory(searchKeyword1: String): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8081/category/"+searchKeyword1)
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
  public removeFromCart(productId: number) {
    return this.httpClient.get("http://localhost:8081/removeFromCart/" + productId);
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
  public getAllOrders(stauts: string) : Observable <MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:8081/getAllOrderDetails/"+stauts);
  }
  public markAsDelivered(orderId:number) {
    return this.httpClient.get("http://localhost:8081/markOrderAsDelivered/"+orderId);
  }
  getPageCount(pageSize: number = 0, category: string = "", subcategory: string = "", subsubcategory: string = ""): Observable<number> {
    return this.httpClient.get<number>("http://localhost:8081/getPageCount", {
      params: {
        pageNumber: pageSize.toString(),
        searchKey1: category,
        searchKey2: subcategory,
        searchKey3: subsubcategory
      }
    });
  }
}
