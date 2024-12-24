import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-order-pages',
  templateUrl: './order-pages.component.html',
  styleUrls: ['./order-pages.component.scss'],
  animations: [
    trigger('navSlideInOut', [
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
          transform: 'translateX(-100%)',
          display: 'none',
        })
      ),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out')),
    ]),
  ],
})
export class OrderPagesComponent implements OnInit {
  sideNav: boolean = false;
  Countries: any;
  isOpen:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  get stateName() {
    return this.sideNav ? 'in' : 'out';
  }

  openForm(){
    this.isOpen = !this.isOpen
  }

  openSideNav() {
    this.sideNav = !this.sideNav;
    const htmlTag = document.getElementsByTagName('html');
    htmlTag[0].classList.toggle('overflow');
  }

}
