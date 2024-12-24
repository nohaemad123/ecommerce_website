import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/core/models';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit, OnDestroy {

  @Input() order: Order;
  currentCurrency: string;
  imgBaseUrl = environment.imageBaseUrl;
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private commonService: CommonService,
    private coreTranslationService: CoreTranslationService,
    public imagesFallbackService: ImagesFallbackService,
    private routingService: RoutingService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.handleCurrencyChange();
  }

  handleCurrencyChange(): void {
    this.subscriptions.add(
      this.commonService.onCurrentCurrencyChange.subscribe((currentCurrency: string) => {
        this.currentCurrency = currentCurrency;
      })
    )
  }

  openOrderDetails(): void {
    this.router.navigateByUrl(this.routingService.navigate('profile/orders/order-details/' + this.order.id));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
