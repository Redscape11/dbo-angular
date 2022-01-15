import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  getProductsFromJson() {
    console.log("getallproducts");
    return this.http.get<Product[]>(this.baseUrl + '/infoproducts/');
  }

  incrementQuantityInStock(productId: number, quantityInStock: number) {
    return this.http.get<Product>(`${this.baseUrl}/incrementStock/${productId}/${quantityInStock}`);
  }

  decrementQuantityInStock(productId: number, quantityInStock: number) {
    return this.http.get<Product>(`${this.baseUrl}/decrementStock/${productId}/${quantityInStock}`);
  }
}