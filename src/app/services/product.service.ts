import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchProduct(k: any) {
      throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  url : string = "http://localhost:8089/products/"

  public getProducts() : Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url);
  }

  public checkProduct(product:Product) : Observable<Product> {
    return this.http.patch<Product>(this.url+product.id,
      {checked: !product.checked});
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(this.url+product.id);
  }

  public saveProduct(product:Product):Observable<Product> {
    return this.http.post<Product>(this.url,
      product)
  }

  public searchProducts(keyword : string) : Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}`);
  }

}
