import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountsController, OrderController } from 'src/app/core/Controllers';
import { ApiResponse } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  getAllPaymentType(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(DiscountsController.GetPaymentTypes);
  }

  placeOrder(payload: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(OrderController.PlaceOrder, payload);
  }

}
