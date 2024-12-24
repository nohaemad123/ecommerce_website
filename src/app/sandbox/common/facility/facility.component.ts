import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-facility',
    templateUrl: './facility.component.html',
    styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {

    constructor(
        public router: Router
    ) { }

    ngOnInit(): void {}

}