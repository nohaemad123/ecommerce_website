import { Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { locale as arabic } from './i18n/ar';
import { locale as english } from './i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { environment } from 'src/environments/environment';
import { ImagesFallbackService } from '../../services/images-fallback.service';
import { MenuLink, SocialMediaLinks, StoreInfo, StoreSettings } from '../../models';
import { RoutingService } from '../../services/routing.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnChanges, OnDestroy {

    @Input() storeLinks: MenuLink[];
    @Input() storeSettings: StoreSettings;
    socialMediaLinks: SocialMediaLinks = {} as SocialMediaLinks;
    imgBaseUrl = environment.imageBaseUrl;
    subscriptions = new Subscription();

    constructor(
        private commonService: CommonService,
        private router: Router,
        public routingService: RoutingService,
        public imagesFallbackService: ImagesFallbackService,
        private coreTranslationService: CoreTranslationService
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit(): void {
        this.getStoreInfo();
    }

    getStoreInfo(): void {
        this.subscriptions.add(
            this.commonService.onStoreInfo
                .subscribe((response: StoreInfo) => {
                    if (response) {
                        this.socialMediaLinks = response.socialMediaLinksDto;
                    }
                })
        )
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['storeLinks']) {
            this.storeLinks = changes['storeLinks'].currentValue;
        }
        if (changes['storeSettings']) {
            this.storeSettings = changes['storeSettings'].currentValue;
        }
    }


    openRoute(routeUrl: string): void {
        this.commonService.selectedWrapperPage.next(routeUrl);
        this.router.navigate([this.routingService.navigate(routeUrl)]);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
