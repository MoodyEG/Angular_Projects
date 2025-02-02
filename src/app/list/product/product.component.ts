import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountPipe } from '../../discount.pipe';
import { StockPipe } from '../../stock.pipe';
import { CartServiceService } from '../../services/cart-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, DiscountPipe, NgClass, StockPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  id: number;
  product: any;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartServiceService,
    private http: HttpClient
  ) {
    this.id = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
    this.http.get(`https://dummyjson.com/products/${this.id}`).subscribe(
      (data: any) => {
        this.product = data;
        if (!this.product) {
          this.router.navigate(['/notfound']);
        }
      },
      (error) => {
        this.router.navigate(['/notfound']);
      }
    );

    this.cartService.getCart().subscribe();
  }

  addToCart(item: any, quantity: number = 1) {
    this.cartService.addToCart(item, quantity);
  }
}
