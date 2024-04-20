import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productsState : any = {
      products: [],
      keyword: "",
      totalProducts: 0,
      totalPages: 0,
      pageSize: 3,
      currentPage: 1,
      status: "",
      errorMesage: ""
  }

  constructor() { }

  public setProductState(state :any):void {
    this.productsState={...this.productsState, ...state};
  }

}
