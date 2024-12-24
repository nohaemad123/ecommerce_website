import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesController, LOVController, ProductsController, TagsController } from 'src/app/core/Controllers';
import { ApiResponse, PaginationParams, ProductsFilter } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getStoreProducts(params: any,filterCriteria: ProductsFilter): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(ProductsController.GetStoreProducts, filterCriteria,  { params: params });
  }

  getCategoriesList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(LOVController.GetCategoriesList);
  }

  getCategoriesTreeList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(CategoriesController.GetCategoriesTree);
  }

  getSubCategoriesList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(LOVController.GetSubCategoriesList);
  }

  getBrandsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(LOVController.GetBrandsList);
  }

  getTagsList(filterCriteria: { limit: number}): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(TagsController.GetAllTags, { params: filterCriteria});
  }


}
