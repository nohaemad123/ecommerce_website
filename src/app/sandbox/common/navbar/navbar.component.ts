import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { NotifierService } from 'angular-notifier';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('slideInOut', [
            state(
                'in',
                style({
                    transform: 'translateX(0)',
                    display: 'block',
                })
            ),
            state(
                'out',
                style({
                    transform: 'translateX(100%)',
                    display: 'none',
                })
            ),
            transition('in => out', animate('300ms ease-out')),
            transition('out => in', animate('300ms ease-in')),
        ]),
    ],
})
export class NavbarComponent implements OnInit {
    cartProducts: any[] = [];
    classApplied = false;
    isCart: boolean = false;
    products :any[] =  [];
    selectedOption: string = ''; // الخيار المحدد
    isDropdownOpen: boolean = false; // لفتح وإغلاق القائمة المنسدلة
    isSearchOpen: boolean = true;
    total = 0
    inputnumber: any = 1;

    private readonly notifier!: NotifierService;

    constructor(public router: Router) {}

    ngOnInit(): void {}

    get stateName() {
        return this.isCart ? 'in' : 'out';
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    openCartModel() {
        this.isCart = !this.isCart;
        const htmlTag = document.getElementsByTagName('html');
        htmlTag[0].classList.toggle('overflow');
    }

    onDeleteItem(productID: any) {
        // this.cartService.deleteFromCart(productID);
        // this.notifier.notify('info', 'Your product removed from the cart!');
        // this.total = this.cartService.getTotal();
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    getchecout() {
        this.isCart = !this.isCart;
        this.router.navigateByUrl('/checkout');
    }

    openSearch() {
        this.isSearchOpen = !this.isSearchOpen;
    }

    selectOption(option: string) {
        this.selectedOption = option;
        this.isDropdownOpen = false;
    }

    // Input Counter
    plus() {
        this.inputnumber = this.inputnumber + 1;
    }
    minus() {
        this.inputnumber != 1;
        {
            this.inputnumber = this.inputnumber - 1;
        }
    }
}
