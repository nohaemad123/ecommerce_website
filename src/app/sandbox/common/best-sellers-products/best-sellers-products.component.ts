import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-best-sellers-products',
  templateUrl: './best-sellers-products.component.html',
  styleUrls: ['./best-sellers-products.component.scss'],
})
export class BestSellersProductsComponent implements OnInit {
  private readonly notifier!: NotifierService;
  products: any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get("assets/data/best-selling.json").subscribe((data:any) => {
      this.products = data.slice(0, 4);
    });
  }

  addToCart(product: any) {
    // this.cartService.addToCart(product);
    // this.notifier.notify('success', 'Your product added to the cart!');
}

}
