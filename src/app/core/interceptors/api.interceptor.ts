import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor, OnInit {

  isUserLoggedIn = false;

  constructor(
    // private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    // this.authService.isLoggedIn.subscribe(res => {
    //   this.isUserLoggedIn = res;
    // })
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(isPlatformBrowser(this.platformId)) {
      const token: string = this.cookieService.get('userToken')!;
      // const tenant: string = this.cookieService.get('tenant')!;
      const tenant: string = environment.tenant;
      if (token && !request.url.includes('json')) {
          request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
      if (this.cookieService.get('lang') !== null && !request.url.includes('json')) {
        request = request.clone({ headers: request.headers.set('Language', this.cookieService.get('lang')!) });
      }  
      if (tenant !== null && !request.url.includes('json')) {
        request = request.clone({ headers: request.headers.set('tenant',tenant) });
      }  
    }
    return next.handle(request);
  }
}
