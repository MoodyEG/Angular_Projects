import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private cart = new BehaviorSubject<any>([]);
  constructor() {}

  ngOnInit() {
    return this.cart.asObservable();
  }

  getCart() {
    return this.cart.asObservable();
  }

  addToCart(item: any, quantity: number = 1) {
    const currentCart = this.cart.getValue();
    let itemInCart = currentCart.find((i: any) => i.id === item.id);
    if (!itemInCart) {
      itemInCart = { ...item, quantity };
      this.cart.next([...currentCart, itemInCart]);
    } else {
      this.increaseQuantity(itemInCart, quantity);
    }
  }

  removeFromCart(item: any) {
    const currentCart = this.cart.getValue();
    const itemInCart = currentCart.find((i: any) => i.id === item.id);
    if (itemInCart && itemInCart.quantity > 0) {
      this.decreaseQuantity(itemInCart);
    }
  }

  deleteFromCart(item: any) {
    const currentCart = this.cart.getValue();
    const itemInCart = currentCart.find((i: any) => i.id === item.id);
    if (itemInCart) {
      this.cart.next(currentCart.filter((i: any) => i.id !== item.id));
    }
  }

  increaseQuantity(item: any, quantity: number = 1) {
    const currentCart = this.cart.getValue();
    const itemInCart = currentCart.find((i: any) => i.id === item.id);
    if (itemInCart) {
      if (itemInCart.quantity + quantity > item.stock)
        itemInCart.quantity = item.stock;
      else itemInCart.quantity += quantity;
      this.cart.next(
        currentCart.map((i: any) => (i.id === item.id ? itemInCart : i))
      );
    }
  }

  decreaseQuantity(item: any) {
    const currentCart = this.cart.getValue();
    const itemInCart = currentCart.find((i: any) => i.id === item.id);
    if (itemInCart && itemInCart.quantity > 0) {
      itemInCart.quantity--;
      this.cart.next(
        currentCart.map((i: any) => (i.id === item.id ? itemInCart : i))
      );
    }
  }
}
