import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { locale as arabic } from '../../i18n/ar';
import { locale as english } from '../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Meta, Title } from '@angular/platform-browser';
import { ApiResponse, EmptyState, PaginationParams, Product, ProductsFilter } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsFilterComponent } from '../../components/products-filter/products-filter.component';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  shopGrid: number = 12;
  productsData: Product[] = [];
  params: PaginationParams = {
    limit: 12,
    page: 1
  };
  filterCriteria: ProductsFilter = {
    brandIds: [],
    tagIds: [],
    categoryId: null,
    priceMin: 1,
    priceMax: 100000,
    name: "",
    sortBy: 0
  };
  isOpenFilter = false;
  sortList: { id: number; name: string}[] = [
    { id: 0, name: 'SORT.DEFAULT' },
    { id: 1, name: 'SORT.FEATURED' },
    { id: 2, name: 'SORT.LOWEST' },
    { id: 3, name: 'SORT.HIGHEST' },
  ];
  totalProducts = 0;
  loading = false;
  emptyStateData: EmptyState;
  subscriptions = new Subscription();

  constructor(
    private productsService: ProductsService,
    private coreTranslationService: CoreTranslationService,
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotifyService,
    private titleService: Title,
    private meta: Meta,
    private modalService: NgbModal,
    public routingService: RoutingService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.fillFilterWithParamsValues();
    this.prepareEmptyStateData();
    this.handlePageTitle();
    this.handleMetaTags();
  }

  handlePageTitle(): void {
    this.titleService.setTitle(this.coreTranslationService.instant('products.title'));
  }

  handleMetaTags(): void {
    this.meta.addTags([
      { name: 'developed by', content: 'Al Nasyan Company' },
      { name: 'author', content: 'Al Nasyan Company' },
      { name: 'description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'keywords', content: 'e-commerce, online shopping, online store, ecommerce platform, products' },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: 'Al Nasyan Company' },
      { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('products.title') },
      { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'twitter:image', content: '' },

      // Facebook Card
      { name: 'og:url', content: '' },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('products.title') },
      { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'og:image', content: '' }

    ]);
  }

  fillFilterWithParamsValues(): void {
    this.route.queryParams.subscribe(params => {
      // Check if queryParams exist and update filterCriteria object accordingly
      if (params['brandIds']) {
        this.filterCriteria.brandIds = params['brandIds'].split(',').map(Number); // Split string to array if it exists
      }

      if (params['tagIds']) {
        this.filterCriteria.tagIds = params['tagIds'].split(',').map(Number); // Split string to array if it exists
      }

      // Check and assign other queryParams similarly
      if (params['categoryId']) {
        this.filterCriteria.categoryId = +params['categoryId']; // Convert to number
      }

      if (params['priceMin'] !== undefined && params['priceMin'] !== null) {
        this.filterCriteria.priceMin = +params['priceMin']; // Convert to number
      }

      if (params['priceMax'] !== undefined && params['priceMax'] !== null) {
        this.filterCriteria.priceMax = +params['priceMax']; // Convert to number
      }

      if (params['name']) {
        this.filterCriteria.name = params['name'];
      }

      if (params['sortBy'] !== undefined && params['sortBy'] !== null) {
        this.filterCriteria.sortBy = +params['sortBy']; // Convert to number
      }

      // Now, the filterCriteria object contains the values from queryParams
    });
    this.getAllProducts();
    this.prepareEmptyStateData();
  }

  handleFilter(): ProductsFilter {
    let filterObj: ProductsFilter = {} as ProductsFilter;
    if (this.filterCriteria?.brandIds?.length) filterObj['brandIds'] = this.filterCriteria?.brandIds
    if (this.filterCriteria?.tagIds?.length) filterObj['tagIds'] = this.filterCriteria?.tagIds
    if (this.filterCriteria?.categoryId) filterObj['categoryId'] = this.filterCriteria?.categoryId
    if (this.filterCriteria?.priceMin) filterObj['priceMin'] = this.filterCriteria?.priceMin
    if (this.filterCriteria?.priceMax) filterObj['priceMax'] = this.filterCriteria?.priceMax
    if (this.filterCriteria?.name) filterObj['name'] = this.filterCriteria?.name
    if (this.filterCriteria?.sortBy) filterObj['sortBy'] = this.filterCriteria?.sortBy
    return filterObj;
  }

  getAllProducts(): void {
    this.loading = true;
    this.subscriptions.add(
      this.productsService.getStoreProducts(this.params, this.handleFilter()).subscribe((response: ApiResponse) => {
        this.loading = false;
        if (response?.ok) {
          this.productsData = response.data?.items;
          this.totalProducts = response.data?.totalItems;
        }
      }, (error: HttpErrorResponse) => {
        this.loading = false;
      })
    )
  }

  prepareEmptyStateData(): void {
    this.emptyStateData = {
      text: this.coreTranslationService.instant('products.no_products_according_search'),
      btnText: this.coreTranslationService.instant('products.other_products'),
      withBtn: true,
    };
  }

  onBrowse(): void {
    // this.router.navigateByUrl('/');
    this.routingService.navigate('home');
  }

  openFilter(): void {
    // let btnFilter = document.querySelector('.btn-m-filter') as HTMLElement
    // let filterBox = document.querySelector('.box-filter-f') as HTMLElement;
    // if (filterBox) {
    //   filterBox.classList.toggle('box-filter');
    //   btnFilter.style.display = "none"
    // }

    const modalRef = this.modalService.open(ProductsFilterComponent);
		modalRef.componentInstance.filterCriteria = this.filterCriteria;
    modalRef.result.then((result) => {
      if (result) {
        this.filterCriteria = result;
        this.updateRouterParamsWithCriteria();
        this.getAllProducts();
      }
    })
    
  }

  onSort(sortId: number): void {
    this.getAllProducts();
  }

  onFilterChanged(filterCriteria: ProductsFilter): void {
    this.filterCriteria = filterCriteria;
    this.updateRouterParamsWithCriteria();
    this.getAllProducts();
  }

  updateRouterParamsWithCriteria() {
    const navigationExtras: any = {};

    Object.keys(this.filterCriteria).forEach((key: string) => {
      const value = this.filterCriteria[key as keyof ProductsFilter] ;
      if (value !== null && value !== undefined && value !== '' && value != 0) {
        if (Array.isArray(value) && value.length > 0) {
          navigationExtras[key] = value.join(','); // Join array values as a comma-separated string
        } else {
          navigationExtras[key] = value;
        }
      }
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: navigationExtras,
      queryParamsHandling: '' // Keeps the existing query params while adding new ones
    });
  }

  closeFilter(): void {
    let btnFilter = document.querySelector('.btn-m-filter') as HTMLElement
    let filterBox = document.querySelector('.box-filter-f') as HTMLElement;
    if (filterBox) {
      filterBox.classList.toggle('box-filter');
      btnFilter.style.display = "block"
    }
  }

  onPageChange(page: number): void {
    this.params.page = page;
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
