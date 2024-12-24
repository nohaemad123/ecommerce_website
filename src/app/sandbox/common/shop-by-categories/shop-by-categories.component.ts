import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
	selector: 'app-shop-by-categories',
	templateUrl: './shop-by-categories.component.html',
	styleUrls: ['./shop-by-categories.component.scss']
})
export class ShopByCategoriesComponent implements OnInit {

	constructor(
		public router: Router
	) { }

	ngOnInit(): void { }

	categoriesSlides: OwlOptions = {
		nav: true,
		margin: 75,
		loop: true,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='fas fa-long-arrow-alt-left'></i>",
			"<i class='fas fa-long-arrow-alt-right'></i>",
		],
		responsive: {
			0: {
				items: 4,
				margin: 15,
				nav: false,
				dots: true,
			},
			515: {
				items: 4,
				margin: 15,
				nav: false,
				dots: true,
			},
			695: {
				items: 6,
				margin: 25,
				nav: false,
				dots: true,
			},
			935: {
				items: 7,
				margin: 35,
				nav: false,
				dots: true,
			},
			1200: {
				items: 7,

			}
		}
	}

}