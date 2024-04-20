import {Component, OnInit} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {

  constructor(private productService : ProductService,
              private router : Router,
              public appState : AppStateService) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts() {
    this.productService.searchProducts(this.appState.productsState.keyword,
      this.appState.productsState.currentPage,
      this.appState.productsState.pageSize).subscribe(
      {
        next: (resp) => {
          let products = resp.body as Product[];
          let totalProducts : number = parseInt(resp.headers.get('x-total-count')!);
          let res : number = totalProducts % this.appState.productsState.pageSize;
          let totalPages = res != 0 ? Math.floor(totalProducts / this.appState.productsState.pageSize) + 1 : Math.floor(totalProducts / this.appState.productsState.pageSize);
          this.appState.setProductState({
            products: products,
            totalProducts: totalProducts,
            totalPages: totalPages,
            status: "LOADED"
          });
        },
        error: err => {
          this.appState.setProductState({
            status: "ERROR",
            errorMessage: err.message
          });
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
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }

  handleEditProduct(product : Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
