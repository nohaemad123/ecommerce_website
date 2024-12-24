import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { CartProduct, Product } from 'src/app/core/models';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    items: CartProduct[] = [];
    cartDetailObj: { cartDetails: CartProduct[]; dataFullDetails?: any } =
        {} as any;
    public onCartListChange: BehaviorSubject<{
        cartDetails: CartProduct[];
        dataFullDetails?: any;
    }>;
    totalPrice = 0;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {
        this.onCartListChange = new BehaviorSubject({} as any);
    }

    addProductToCart(product: Product, type?: string) {
        let cartList: any = this.cookieService.get('cartList');
        if (cartList) {
            let cartListData = JSON.parse(cartList);
            this.items = JSON.parse(cartList) ? cartListData.cartDetails : [];
        }
        let productOBj: CartProduct = {
            id: product.id,
            unitPrice: product.productPrice,
            productPrice: product.productPrice,
            priceAfterDiscount: product.priceAfterDiscount,
            productId: product?.id,
            quantity: product?.quantity,
            productName: product?.productName,
            productNameEn: product?.productNameEn,
            image: product?.productImages[0]?.imageProduct,
        };
        let product_index = this.items.findIndex(
            (p: CartProduct) => p.id == product.id
        );
        if (product_index == -1) {
            this.items.push(productOBj);
            this.totalPrice += product.productPrice;
        } else {
            if (type == 'product_card') this.items[product_index].quantity++;
            else this.items[product_index].quantity = product.quantity;
        }
        let cartDetailObj: any = {
            cartDetails: this.items,
        };
        const serializedObj = JSON.stringify(cartDetailObj);
        this.cookieService.put('cartList', serializedObj);
        this.onCartListChange.next(cartDetailObj);
    }

    updateCart(productId: number, quantity: number): Observable<any> {
        let payload = {
            productId: productId,
            quantity: quantity,
        };
        return this.http
            .post<any>(
                `${environment.endPointUrl}/Carts/AddCartDetails`,
                payload
            )
            .pipe(
                map((response) => {
                    if (response) {
                        this.getCartList().subscribe(() => {});
                    }
                })
            );
    }

    getCartList(): any {
        return this.http
            .get<any>(`${environment.endPointUrl}/Carts/GetFulCartDetails`)
            .pipe(
                map((response) => {
                    let cartDetailObj: any = {
                        cartDetails: response.data.cartDetails,
                        dataFullDetails: response.data,
                    };
                    this.onCartListChange.next(cartDetailObj);
                })
            );
    }

    removeFromCartGuest(product: CartProduct): void {
        let cartList: any = this.cookieService.get('cartList');
        let cartListData = JSON.parse(cartList);
        if (cartListData) {
            this.items = cartListData.cartDetails;
        }
        let product_index = this.items.findIndex(
            (p: CartProduct) => p.id == product.id
        );
        if (product_index > -1) {
            this.items.splice(product_index, 1);
            this.cartDetailObj.cartDetails = this.items;
            const serializedObj = JSON.stringify(this.cartDetailObj);
            this.cookieService.put('cartList', serializedObj);
        }
        this.onCartListChange.next(this.cartDetailObj);
    }

    InOrderIncreaseQuantityFromCartGuest(
        product: CartProduct | Product,
        quantity: number
    ): void {
        let cartList: any = this.cookieService.get('cartList');
        let cartListData = JSON.parse(cartList);
        if (cartListData) {
            this.items = cartListData.cartDetails;
        }
        let product_index = this.items.findIndex(
            (p: CartProduct) => p.id == product.id
        );
        if (product_index > -1) {
            this.items[product_index].quantity = quantity;
            this.cartDetailObj.cartDetails = this.items;
            const serializedObj = JSON.stringify(this.cartDetailObj);
            this.cookieService.put('cartList', serializedObj);
        }
        this.onCartListChange.next(this.cartDetailObj);
    }

    //Coupons add and remove

    addCoupon(couponCode: string): Observable<any> {
        return this.http
            .put<any>(
                `${environment.endPointUrl}/Carts/UpdateCartCoupon?CouponCode=${couponCode}`,
                {}
            )
            .pipe(
                map((response) => {
                    if (response) {
                        this.getCartList().subscribe(() => {});
                    }
                })
            );
    }

    removeCoupon(): Observable<any> {
        return this.http
            .put<any>(`${environment.endPointUrl}/Carts/RemoveCartCoupon`, {})
            .pipe(
                map((response) => {
                    if (response) {
                        this.getCartList().subscribe(() => {});
                    }
                })
            );
    }
}
