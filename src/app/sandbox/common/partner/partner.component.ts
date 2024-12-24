import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

    partnerSlides: OwlOptions = {
		nav: false,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 3
			},
			485: {
				items: 3
			},
			635: {
				items: 4
			},
			835: {
				items: 5
			},
			1195: {
				items: 7
			}
		}
    }

}