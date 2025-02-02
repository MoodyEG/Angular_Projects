import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { DiscountPipe } from '../discount.pipe';
import { FormsModule } from '@angular/forms';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, DiscountPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  quantity = 1;
  items: any = [];
  cartItems: any;

  constructor(private cartService: CartServiceService) {
    this.cartService.getCart().subscribe();
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((items: any) => {
      this.items = items;
    });
  }

  deleteFromCart(item: any) {
    this.cartService.deleteFromCart(item);
  }

  increaseQuantity(item: any, quantity: number = 1) {
    if (item.quantity < item.stock && item.quantity + quantity <= item.stock)
      this.cartService.increaseQuantity(item, quantity);
    else if (item.quantity + quantity > item.stock)
      this.cartService.increaseQuantity(item, item.stock - item.quantity);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 0) this.cartService.decreaseQuantity(item);
  }

  total(items: any) {
    let total = 0;
    for (let item of items) {
      total += item.price * item.discountPercentage * item.quantity;
    }
    return total;
  }
}
