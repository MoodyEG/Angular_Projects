import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  imports: [CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  productsList: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://dummyjson.com/products').subscribe((res) => {
      this.productsList = res.products;
    });
  }
}
