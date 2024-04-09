import {Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  public products : Array<Product> = [];
  public keyword: string = "";

  constructor(private productService : ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      {
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
      next: updatedProduct => {
        this.getProducts();
      }
    })
  }

  handleDeleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(
      {
        next:value => {
          this.getProducts();
        }
      }
    );
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe(
      {
        next: data => {
          this.products = data;
        }
      }
    );
  }
}
