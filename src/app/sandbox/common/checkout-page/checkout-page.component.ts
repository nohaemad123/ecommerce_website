import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

	private readonly notifier: NotifierService;
    products = [];
    total = 0;

    checkoutForm = this.formBuilder.group({
        fullname: 'John Doe',
        address: '234 Church Street Colloyn PRETORIA 0083 SOUTH AFRICA',
        city: 'Colloyn',
        email: 'john.doe@vaxim.com',
    });

    constructor(
        private formBuilder: UntypedFormBuilder,
        // private cartService: CartService,
        private http: HttpClient,
        notifierService: NotifierService
    ) {
        this.checkoutForm = this.formBuilder.group({
            fullname: ['', Validators.required],
            email: ['', [Validators.required]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            city: ['', [Validators.required, Validators.minLength(3)]],
        });
        this.notifier = notifierService;
    }

    ngOnInit(){
        // this.http.get("assets/data/products.json").subscribe(data =>{
        //     this.productsUrl = data;
        // });
    }

    onSubmit(): void {
        this.notifier.notify('success', 'Your order has been placed!');
        
        // Process checkout data here
        // this.products = this.cartService.clearCart();
        this.checkoutForm.reset();
    }

}