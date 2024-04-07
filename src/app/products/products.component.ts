import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private productService : ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts()
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
    this.productService.checkProduct(product)
      .subscribe({
      next: updatedProduct => {
        this.getProducts();
      }
    })
  }
}
