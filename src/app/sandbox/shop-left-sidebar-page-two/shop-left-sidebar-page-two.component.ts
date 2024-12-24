import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-shop-left-sidebar-page-two',
    templateUrl: './shop-left-sidebar-page-two.component.html',
    styleUrls: ['./shop-left-sidebar-page-two.component.scss']
})
export class ShopLeftSidebarPageTwoComponent implements OnInit {
    shopGrid: number = 1;
    products: any = [];
    isOpenFilter: boolean = false;

    constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        this.httpClient.get("assets/data/best-selling.json").subscribe((data: any) => {
            this.products = data;
        });
    }

    minValue: number = 200;
    maxValue: number = 700;
    options: Options = {
        floor: 0,
        ceil: 1000,
        translate: (value: number, label: LabelType): string => {
            switch (label) {
                case LabelType.Low:
                    return '<b>Min price:</b> $' + value;
                case LabelType.High:
                    return '<b>Max price:</b> $' + value;
                default:
                    return '$' + value;
            }
        }
    };

    openFilter() {
        let btnFilter = document.querySelector('.btn-m-filter') as HTMLElement
        let filterBox = document.querySelector('.box-filter-f') as HTMLElement;
        if (filterBox) {
            filterBox.classList.toggle('box-filter');
            btnFilter.style.display = "none"
        }
    }
    closeFilter() {
        let btnFilter = document.querySelector('.btn-m-filter') as HTMLElement
        let filterBox = document.querySelector('.box-filter-f') as HTMLElement;
        if (filterBox) {
            filterBox.classList.toggle('box-filter');
            btnFilter.style.display = "block"
        }
    }
}