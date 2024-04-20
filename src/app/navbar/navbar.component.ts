import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions: Array<any> = [
    { title: 'home', route: '/home', icon: 'house'},
    { title: 'products', route: '/products', icon: 'search'},
    { title: 'newProduct', route: '/newProduct', icon: 'save'},
  ];

  currentAction: any;

  constructor(public appState: AppStateService) {
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
