import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  navigate(routeUrl: any): string {
    return '/'+environment.tenant + '/' + routeUrl;
  }

  route(routeUrl: any, params?: any): void {
    this.router.navigate([this.navigate(routeUrl)], { queryParams: params});
    // this.router.navigateByUrl(this.navigate(routeUrl), params);
  }

}
