import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  length: number = 0;
  constructor(private cartService: CartServiceService) {
    this.cartService.getCart().subscribe((items: any) => {
      this.length = items.length;
    });
  }
}
