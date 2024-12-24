import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsController } from 'src/app/core/Controllers';
import { ApiResponse } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) {  }

  GetStoreProductDetails(productId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${ProductsController.GetProductDetails}${productId}`);
  }

  getProductRatingByProductId(filterCriteria: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(ProductsController.GetProductRatings,{params:filterCriteria});
  }

  addProductReview(reviewData: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(ProductsController.AddProductRating, reviewData);
  }

 getRelatedProducts(filterCriteria: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(ProductsController.GetRelatedProducts,{params:filterCriteria});
  }

}
