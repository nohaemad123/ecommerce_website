import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-summer-sale',
    templateUrl: './summer-sale.component.html',
    styleUrls: ['./summer-sale.component.scss']
})
export class SummerSaleComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}