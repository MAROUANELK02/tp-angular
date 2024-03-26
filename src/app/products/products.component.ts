import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.http.get<Array<any>>('http://localhost:8089/products')
      .subscribe({
        next: data => {
          this.products = data;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
  }

  products :Array<any> =[];

  handleCheckProduct(product: any) {
    this.http.patch<any>(`http://localhost:8089/products/${product.id}`,
      {checked: !product.checked}).subscribe({
      next: updatedProduct => {
        this.products.map(p => {
          if (p.id == product.id) {
            return updatedProduct;
          }
          return p;
        })
      }
    })
  }
}
