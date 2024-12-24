import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-homeseven-banner',
  templateUrl: './homeseven-banner.component.html',
  styleUrls: ['./homeseven-banner.component.scss']
})
export class HomesevenBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  retailHomeSlides: OwlOptions = {
		items: 1,
		nav: false,
		margin: 25,
		loop: true,
		dots: true,
		autoplay: true,
		animateIn: 'fadeIn',
		animateOut: 'fadeOut',
		autoplayHoverPause: true,
		navText: [
			"<i class='fas fa-long-arrow-alt-left'></i>",
			"<i class='fas fa-long-arrow-alt-right'></i>"
		]
    }

}
