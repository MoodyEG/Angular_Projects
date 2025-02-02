import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StockPipe } from '../../stock.pipe';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../../services/cart-service.service';
import { DiscountPipe } from '../../discount.pipe';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, StockPipe, NgClass, RouterLink, DiscountPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() product: any;
  cartItems: any = [];
  constructor(private cartService: CartServiceService) {
    this.cartService.getCart().subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }
}
