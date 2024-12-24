import { RoutingService } from 'src/app/core/services/routing.service';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PagesWrapperService } from '../../services/pages-wrapper.service';
import { Subscription } from 'rxjs';
import { Value } from '../../pages/pages-wrapper/pages-wrapper.component';
import { environment } from 'src/environments/environment';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ApiResponse, CarouselImg, ComponentData } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    retailHomeSlides: OwlOptions = {
        items: 1,
        nav: false,
        margin: 25,
        loop: true,
        dots: true,
        autoplay: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoplayHoverPause: true,
        navText: [
            "<i class='fas fa-long-arrow-alt-left'></i>",
            "<i class='fas fa-long-arrow-alt-right'></i>",
        ],
    };
    carouselImages: CarouselImg[] = [];
    imgBaseUrl = environment.imageBaseUrl;
    loading = false;
    subscriptions = new Subscription();

    constructor(
        @Inject(Value) private componentData: ComponentData,
        private pagesWrapperService: PagesWrapperService,
        public imagesFallbackService: ImagesFallbackService,
        private notifier: NotifyService,
        public routingService: RoutingService
    ) { }

    ngOnInit(): void {
        if (this.componentData.pageSectionId) {
            this.getPageSectionDetails();
        }
    }

    getPageSectionDetails(): void {
        this.loading = true;
        this.subscriptions.add(
            this.pagesWrapperService
                .getPageSectionDetails(this.componentData.pageSectionId)
                .subscribe((response: ApiResponse) => {
                    this.loading = false;
                    if (response?.ok) {
                        this.carouselImages = response?.data;
                        console.log("carouselImages: ",this.carouselImages)
                    } 
                },
                    (error: HttpErrorResponse) => {
                        this.loading = false;
                    }
                )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
