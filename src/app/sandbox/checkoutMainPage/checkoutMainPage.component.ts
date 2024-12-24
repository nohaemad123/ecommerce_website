import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkoutMainPage',
  templateUrl: './checkoutMainPage.component.html',
  styleUrls: ['./checkoutMainPage.component.scss']
})
export class CheckoutMainPageComponent implements OnInit {
  isOpen:boolean = false;
  isOpenNew:boolean = false;
  selectedOption: string | null = null;
  constructor() { }

  ngOnInit() {
  }

  openForm(){
    this.isOpen = !this.isOpen
  }
  openNewAdd(){
    this.isOpenNew = !this.isOpenNew
  }

}
