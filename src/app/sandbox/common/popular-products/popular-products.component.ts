import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-popular-products',
    templateUrl: './popular-products.component.html',
    styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit {

    constructor(
        public router: Router
	) { }

    ngOnInit(): void {}

    popularProductsSlides: OwlOptions = {
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fas fa-long-arrow-alt-left'></i>",
			"<i class='fas fa-long-arrow-alt-right'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			515: {
				items: 2
			},
			695: {
				items: 3
			},
			992: {
				items: 2
			},
			1200: {
				items: 2
			}
		}
    }

}