import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiResponse, StoreInfo } from '../models';
import { CategoriesController, LocationController, PagesController, SettingsController, StoreInfoController, WishlistController } from '../Controllers';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  onCurrentCurrencyChange: BehaviorSubject<any> = new BehaviorSubject({});
  selectedWrapperPage = new Subject();
  onStoreInfo: BehaviorSubject<StoreInfo> = new BehaviorSubject({} as StoreInfo);

  constructor(private http: HttpClient) {
  }

  setCurrentCurrency(currency: string): void {
    this.onCurrentCurrencyChange.next(currency);
  }

  setStoreInfo(data: StoreInfo): void {
    this.onStoreInfo.next(data);
  }

  getStoreInfo(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(StoreInfoController.GetStoreInfo);
  }

  getStoreFooterMenu(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(PagesController.GetFooterMenu);
  }

  getAllSettings(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(SettingsController.GetStoreSettings);
  }

  getStoreCategories(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(CategoriesController.GetStoreCategories);
  }

  addProductToWishlist(productId: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(WishlistController.AddProductToWishlist, {}, {
      params: {
        productId
      }
    });
  }

  removeProductFromWishlist(productId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(WishlistController.RemoveProductToWishlist, {
      params: {
         productId
      }
    });
  }

  getAllCountries(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(LocationController.GetAllCountries);
  }

}
