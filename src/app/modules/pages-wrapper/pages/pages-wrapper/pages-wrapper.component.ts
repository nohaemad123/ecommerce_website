import { Component, InjectionToken, Injector, OnDestroy, OnInit, ReflectiveInjector } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagesWrapperService } from '../../services/pages-wrapper.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductsSliderComponent } from 'src/app/shared/components/products-slider/products-slider.component';
import { BigBannerComponent } from '../../components/big-banner/big-banner.component';
import { SiteFeaturesComponent } from '../../components/site-features/site-features.component';
import { GroupSliderComponent } from '../../components/group-slider/group-slider.component';
import { CommonService } from 'src/app/core/services/common.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Meta, Title } from '@angular/platform-browser';
import { ApiResponse, ComponentData } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';

export const Value = new InjectionToken<any>('value', { providedIn: 'root', factory: () => 'value' });

@Component({
  selector: 'app-pages-wrapper',
  templateUrl: './pages-wrapper.component.html',
  styleUrls: ['./pages-wrapper.component.scss']
})
export class PagesWrapperComponent implements OnInit, OnDestroy {

  pageSections: any[] = [];
  components: { id: number; component: any; value: ComponentData }[] = [
    { id: 3, component: HeaderComponent, value: {} as ComponentData },
    { id: 5, component: GroupSliderComponent, value: {} as ComponentData  },
    { id: 6, component: GroupSliderComponent, value: {} as ComponentData  },
    { id: 10, component: BigBannerComponent, value: {} as ComponentData  },
    { id: 11, component: SiteFeaturesComponent, value: {} as ComponentData  },
    { id: 12, component: ProductsSliderComponent, value: {} as ComponentData  }
  ];
  displayedComponents: any[] = [];
  componentsArr = [3, 4, 5, 6, 7, 8];
  loading = false;
  pageTitle = '';
  url = '';
  subscriptions = new Subscription();


  constructor(
    private pagesWrapperService: PagesWrapperService,
    private router: Router,
    private inj: Injector,
    private commonService: CommonService,
    private notifier: NotifyService,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    console.log(this.router.url );
    this.url = this.router.url.split("/")[2];
    console.log(this.url );
    
    // this.getPageSections(this.router.url == '/' ? this.router.url : this.router.url.split("/")[1]);
    this.getPageSections(this.url);
    this.handleLinksClick();
    this.handlePageTitle(this.url);
    this.handleMetaTags(this.url);
    // this.handlePageTitle(this.router.url == '/' ? 'Home' : this.router.url.split("/")[1]);
    // this.handleMetaTags(this.router.url == '/' ? 'Home' : this.router.url.split("/")[1]);
  }

  handlePageTitle(pageTitle: string): void {
    this.titleService.setTitle('Al Nasyan Company | ' + pageTitle);
  }

  handleMetaTags(pageTitle: string): void {
    this.meta.addTags([
      { name: 'developed by', content: 'Al Nasyan Company' },
      { name: 'author', content: 'Al Nasyan Company' },
      { name: 'description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'keywords', content: 'e-commerce, online shopping, online store, ecommerce platform, products' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: 'Al Nasyan Company' },
      { name: 'twitter:title', content: 'Al Nasyan Company | ' + pageTitle },
      { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'twitter:image', content: '' },

      // Facebook Card
      { name: 'og:url', content: '' },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: 'Al Nasyan Company | ' + pageTitle },
      { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'og:image', content: '' }

    ]);
  }

  getPageSections(routerLink: string = '/'): void {
    // console.log('routerLink', routerLink);
    this.loading = true;
    this.subscriptions.add(
      this.pagesWrapperService.getPageSections(routerLink).subscribe({
        next: (response: ApiResponse) => {
          this.loading = false;
          if (response?.ok) {
            this.pageSections = response.data;
            this.prepareDisplayedComponents();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
        }
      }
      )
    );
    this.handlePageTitle(routerLink);
    this.handleMetaTags(routerLink);

  }

  handleLinksClick(): void {
    this.commonService.selectedWrapperPage.subscribe((routeUrl: string | any) => {
      this.getPageSections(routeUrl);
    })
  }

  prepareDisplayedComponents(): void {
    this.displayedComponents = [];
    this.pageSections.sort((a, b) => a.order - b.order);
    this.pageSections?.forEach((pageSection: any) => {
      let component = this.components.filter((comp: any) => comp.id === pageSection.sectionTypeId);
      if (component?.length) {
        this.displayedComponents.push({
          component: component[0].component,
          value: {
            title: pageSection?.title,
            pageSectionId: pageSection?.id,
            sectionTypeId: pageSection?.sectionTypeId
          }
        })
      }
    });

    this.displayedComponents.map((comp) => {
      const value = comp.value;
      comp['injector'] = ReflectiveInjector.resolveAndCreate(
        [{ provide: Value, useValue: value }],
        this.inj
      );
      return comp;
    });
    // this.displayedComponents = this.components.slice(
    //   this.components.length - this.componentsArr.length,
    //   this.components.length
    // );
    // console.log('DS', this.displayedComponents);

  }

  trackByFun(index: number, component: any): any {
    return component.component;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
