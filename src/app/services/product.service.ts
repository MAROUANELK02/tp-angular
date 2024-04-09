import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  url : string = "http://localhost:8089/products/"

  public searchProducts(keyword: string = "", page : number = 1, size : number = 4){
    return this.http.get(this.url+"?name_like="+keyword+"&_page="+page+"&_limit="+size, {observe:'response'});
  }

  public checkProduct(product:Product) : Observable<Product> {
    return this.http.patch<Product>(this.url+product.id,
      {checked: !product.checked});
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(this.url+product.id);
  }

  public saveProduct(product:Product):Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(this.url+productId);
  }

  updateProduct(product: Product) : Observable<Product> {
    return this.http.put<Product>(this.url+product.id, product);
  }
}
