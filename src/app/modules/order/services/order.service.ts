import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderController } from 'src/app/core/Controllers';
import { ApiResponse } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(filterCriteria: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(OrderController.GetOrdersList, { params: filterCriteria });
  }

  getOrderById(orderId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${OrderController.GetOrderDetails}${orderId}`);
  }

}
