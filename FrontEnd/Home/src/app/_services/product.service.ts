import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/_model/product.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8081/getAllProducts")
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  public getProductDetailsById(productId:number){
    return this.httpClient.get<Product>("http://localhost:8081/getProductDetailsById/"+productId)
  }

  public deleteProduct(productId:number){
    return this.httpClient.delete("http://localhost:8081/deleteProductDetails/"+productId);
  }
}
