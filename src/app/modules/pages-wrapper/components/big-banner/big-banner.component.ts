import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagesWrapperService } from '../../services/pages-wrapper.service';
import { Value } from '../../pages/pages-wrapper/pages-wrapper.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ApiResponse, ComponentData } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { BigBanner } from 'src/app/core/models/big-banner.model';

@Component({
  selector: 'app-big-banner',
  templateUrl: './big-banner.component.html',
  styleUrls: ['./big-banner.component.scss']
})
export class BigBannerComponent implements OnInit, OnDestroy {

  sectionData: BigBanner = {} as BigBanner;
  imgBaseUrl = environment.imageBaseUrl;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private pagesWrapperService: PagesWrapperService,
    @Inject(Value) private componentData: ComponentData,
    public router: Router,
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
          if (response.ok) {
            this.sectionData = response?.data[0];
          } 
        }, (error: HttpErrorResponse) => {
          this.loading = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
