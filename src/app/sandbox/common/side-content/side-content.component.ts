import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.scss'],
  animations: [
    trigger('slideInOut', [
        state('in', style({
            transform: 'translateX(0)',
            display: "block"
        })),
        state('out', style({
            transform: 'translateX(100%)',
            display: "none"
        })),
        transition('in => out', animate('300ms ease-out')),
        transition('out => in', animate('300ms ease-in'))
    ])
],
})
export class SideContentComponent implements OnInit {

  products = [];
  isCart: boolean = false;
  
  constructor( private cartService: CartService) { }

  ngOnInit() {
  }
  get stateName() {
    return this.isCart ? 'in' : 'out'
}

}
