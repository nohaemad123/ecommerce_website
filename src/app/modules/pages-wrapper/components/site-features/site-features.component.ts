import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { PagesWrapperService } from '../../services/pages-wrapper.service';
import { Value } from '../../pages/pages-wrapper/pages-wrapper.component';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ApiResponse, ComponentData, Feature } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-site-features',
    templateUrl: './site-features.component.html',
    styleUrls: ['./site-features.component.scss']
})
export class SiteFeaturesComponent implements OnInit, OnDestroy {

    features: Feature[] = [];
    imgBaseUrl = environment.imageBaseUrl;
    loading = true;
    subscriptions = new Subscription();

    constructor(
        @Inject(Value) private componentData: ComponentData,
        private pagesWrapperService: PagesWrapperService,
        public imagesFallbackService: ImagesFallbackService,
        private notifier: NotifyService
    ) { }

    ngOnInit(): void {
        if (this.componentData.pageSectionId) {
            this.getPageSectionDetails();
        }
    }

    getPageSectionDetails(): void {
        this.subscriptions.add(
            this.pagesWrapperService
                .getPageSectionDetails(this.componentData.pageSectionId)
                .subscribe((response: ApiResponse) => {
                    this.loading = false;
                    if (response?.ok) {
                        this.features = response?.data;
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

