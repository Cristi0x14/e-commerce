import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }
  public addProduct(product: FormData){
    return this.httpClient.post<Product>("http://localhost:8081/product/add",product);
  }
}
