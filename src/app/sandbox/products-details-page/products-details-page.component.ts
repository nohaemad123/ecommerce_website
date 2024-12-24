import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-products-details-page',
    templateUrl: './products-details-page.component.html',
    styleUrls: ['./products-details-page.component.scss'],
})
export class ProductsDetailsPageComponent implements OnInit {
    public data: any;


    images: any[] = [
        {
            id: 124,
            type: 'video',
            url: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792255/products2_2952ef594e.jpg',
            thumb: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792255/products2_2952ef594e.jpg'
        },
        {
            id: 125,
            type: 'video', 
            url: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792204/products7_b19aad45c5.jpg',
            thumb: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792204/products7_b19aad45c5.jpg'
        },
        {
            id: 126,
            type: 'video', 
            url: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792255/products2_2952ef594e.jpg',
            thumb: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792255/products2_2952ef594e.jpg'
        },
        {
            id: 127,
            type: 'video', 
            url: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792204/products7_b19aad45c5.jpg',
            thumb: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792204/products7_b19aad45c5.jpg'
        },
        {
            id: 128,
            type: 'video',
            url: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792255/products2_2952ef594e.jpg',
            thumb: 'https://res.cloudinary.com/dbbfi0kuz/image/upload/v1634792255/products2_2952ef594e.jpg'
        }
    ]

    customThumbsOptions: OwlOptions = {
        loop: true,
        autoplay: false,
        center: false,
        dots: false,
        autoHeight: true,
        autoWidth: true,
        items: 4,
        margin:10,
        navText: [
			"<i class='fa fa-chevron-left'></i>",
			"<i class='fa fa-chevron-right'></i>",
		]
    }
    public videoData = this.images[0];

    constructor(private route: ActivatedRoute, private http: HttpClient, private elRef: ElementRef) { }

    ngOnInit() { }


    getData(video:any) {
        this.videoData = video;
        const player = this.elRef.nativeElement.querySelector('video');
        player.load();
    }

    // Input Counter
    inputnumber = 1;
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
