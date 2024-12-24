import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Value } from '../../pages/pages-wrapper/pages-wrapper.component';
import { PagesWrapperService } from '../../services/pages-wrapper.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImagesFallbackService } from 'src/app/core/services/images-fallback.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ApiResponse, Brand, Category, ComponentData } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-group-slider',
  templateUrl: './group-slider.component.html',
  styleUrls: ['./group-slider.component.scss']
})
export class GroupSliderComponent implements OnInit, OnDestroy {

  owlOptions: OwlOptions = {
    margin: 75,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
      "<i class='fas fa-long-arrow-alt-left'></i>",
      "<i class='fas fa-long-arrow-alt-right'></i>",
    ],
    responsive: {
      0: {
        items: 4,
        margin: 15,
        nav: false,
        dots: true,
      },
      515: {
        items: 4,
        margin: 15,
        nav: false,
        dots: true,
      },
      695: {
        items: 6,
        margin: 25,
        nav: false,
        dots: true,
      },
      935: {
        items: 7,
        margin: 35,
        nav: true,
        dots: true,
      },
      1200: {
        items: 7,
        nav: true,
        // dots: true,
      }
    },
    nav: true
  }
  brandsData: Brand[] = [];
  categoriesData: Category[] = [];
  imgBaseUrl = environment.imageBaseUrl;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private pagesWrapperService: PagesWrapperService,
    @Inject(Value) public componentData: ComponentData,
    public router: Router,
    public routingService: RoutingService,
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
            if (this.componentData?.sectionTypeId == 5) {
              this.brandsData = response?.data;
            } else if (this.componentData?.sectionTypeId == 6) {
              this.categoriesData = response?.data;
            }
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
