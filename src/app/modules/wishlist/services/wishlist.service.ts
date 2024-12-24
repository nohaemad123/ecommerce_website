import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistController } from 'src/app/core/Controllers';
import { ApiResponse } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  getAllWishlistProducts(filterCriteria: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(WishlistController.GetWishlistProducts, { params: filterCriteria});
  }

}
