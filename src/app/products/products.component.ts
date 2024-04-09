import {Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  public products : Array<Product> = [];
  public keyword: string = "";
  public totalPages : number = 0;
  public pageSize : number = 3;
  public currentPage : number = 1;

  constructor(private productService : ProductService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe(
      {
        next: (resp) => {
          this.products = resp.body as Product[];
          let totalProducts : number = parseInt(resp.headers.get('x-total-count')!);
          let res : number = totalProducts % this.pageSize;
          this.totalPages = res != 0 ? Math.floor(totalProducts / this.pageSize) + 1 : Math.floor(totalProducts / this.pageSize);
          console.log(this.totalPages)
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
        this.searchProducts();
      }
    })
  }

  handleDeleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(
      {
        next:value => {
          this.searchProducts();
        }
      }
    );
  }

  handleGoToPage(page : number) {
    this.currentPage = page;
    this.searchProducts();
  }

  handleEditProduct(product : Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
