import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  url : string = "http://localhost:8089"

  public getProducts() : Observable<any> {
    return this.http.get<Array<any>>(this.url+"/products");
  }

  public checkProduct(product:any) : Observable<any> {
    return this.http.patch<any>(this.url+"/products/"+product.id,
      {checked: !product.checked});
  }

}
