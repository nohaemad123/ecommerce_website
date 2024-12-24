import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthController } from 'src/app/core/Controllers';
import { ApiResponse, CartProduct, User } from 'src/app/core/models';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cartService:CartService,
    private router:Router
    ) {
    if(this.cookieService.get('currentUser')) {
      this.currentUser = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('currentUser')!));
    }
  }

  loginCustomer(payload: any) {
    return this.http
      .post<any>(AuthController.Login, payload).pipe(
        map((response: any) => {
          this.cookieService.put('currentUser', JSON.stringify(response.data));
          this.cookieService.put('userToken', response.data.token);
          this.currentUser.next(response.data);
        }));
  }

  registerCustomer(payload: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(AuthController.Register, payload);
    // .pipe(
    //   map((response: any) => {
    //     this.cookieService.put('currentUser', JSON.stringify(response.data));
    //     this.cookieService.put('userToken', response.data.token);
    //     this.currentUser.next(response.data);
    //   }));
  }

  logout(): void{
    // remove user and cartList from cookie storage to logout
    this.cookieService.remove('currentUser');
    this.cookieService.remove('userToken');
    this.cookieService.remove('cartList');
    // notify
    this.currentUser.next({} as User);
    this.cartService.onCartListChange.next({cartDetails:[] as CartProduct[] });
    //navigate
    this.router.navigate(['/authentication']);


  }

}
