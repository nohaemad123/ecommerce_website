import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesController } from 'src/app/core/Controllers';
import { ApiResponse } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesWrapperService {

  constructor(private http: HttpClient) { }

  getPageSections(nameUrl: string): Observable<ApiResponse> {
    nameUrl = nameUrl === '/' ? 'home' : nameUrl;
    return this.http.get<ApiResponse>(`${PagesController.GetPageSections}${nameUrl}`)
  }

  getPageSectionDetails(sectionId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${PagesController.GetPageSectionDetails}${sectionId}`);
  }

}
