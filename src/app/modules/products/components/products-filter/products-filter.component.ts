import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, OnChanges, SimpleChanges, Optional, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { locale as arabic } from '../../i18n/ar';
import { locale as english } from '../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { ApiResponse, ProductsFilter } from 'src/app/core/models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface FilterTag { id: number; name: string; selected: boolean; };
export interface FilterCategory { id: number; name: string; };
export interface FilterBrand { value: number; name: string; selected: boolean; };

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnChanges, OnDestroy {

  @Output() filterClosed = new EventEmitter();
  @Output() filterChanged = new EventEmitter();
  options: Options = {
    floor: 0,
    ceil: 100000
  };
  @Input() filterCriteria: ProductsFilter;
  categoriesData: FilterCategory[] = [];
  tagsData: FilterTag[] = [];
  selectedTagsIds: number[] = [];
  brandsData: FilterBrand[] = [];
  isMobile = false;
  subscription = new Subscription();

  constructor(
    private productsService: ProductsService,
    private coreTranslationService: CoreTranslationService,
    @Optional() private activeModal: NgbActiveModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.coreTranslationService.translate(english, arabic);
    this.checkIfMobile();
  }

  ngOnInit(): void {
    this.getCategoriesList();
    this.getTagsList();
    this.getBrandsList();
    // this.handlePatchBrandsAndTagsInMobile();
  }

  handlePatchBrandsAndTagsInMobile(): void {
    if(this.isMobile) {      
      // this.handleSelectedBrands();
      // this.handleSelectedTags();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkIfMobile();
  }

  private checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 768; // Set your desired threshold for mobile width
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterCriteria']) {
      this.filterCriteria = changes['filterCriteria'].currentValue;
      this.handleSelectedBrands();
      this.handleSelectedTags();
    }
  }

  handleSelectedBrands(): void {
    this.brandsData?.map((brand: FilterBrand) => {
      if (this.filterCriteria.brandIds.includes(+brand?.value.toString())) {
        brand.selected = true;
      }
    });
  }

  handleSelectedTags(): void {
    this.tagsData?.map((tag: FilterTag) => {
      if (this.filterCriteria.tagIds.includes(+tag?.id.toString())) {
        tag.selected = true;
      }
    });
  }

  getCategoriesList(): void {
    this.subscription.add(
      this.productsService.getCategoriesTreeList().subscribe((response: ApiResponse) => {
        this.categoriesData = response.data;
      })
    );
  }

  getTagsList(): void {
    this.subscription.add(
      this.productsService.getTagsList({
        limit: 20
      }).subscribe((response: ApiResponse) => {
        this.tagsData = response.data?.map((tag: FilterTag) => {
          return {
            ...tag,
            selected: false
          }
        });
        this.handleSelectedTags();
      })
    );
  }

  getBrandsList(): void {
    this.subscription.add(
      this.productsService.getBrandsList().subscribe((response: ApiResponse) => {
        this.brandsData = response.data?.map((brand: FilterBrand) => {
          let brandObj = {
            name: brand?.name,
            value: brand?.value,
            selected: false
          };

          return brandObj;
        });
        this.handleSelectedBrands();
      })
    );
  }

  onCloseFilter(): void {
    this.filterClosed.emit();
    this.activeModal.close();
  }

  onSelectBrand(): void {
    let selectedBrands = this.brandsData
      .filter(option => option.selected)
      .map(option => option.value);
    this.filterCriteria.brandIds = selectedBrands;
    this.onChangeFilter();
  }

  onSelectTag(tag: FilterTag): void {
    tag.selected = !tag.selected;
    let selectedTagsIds = this.tagsData
      .filter(option => option.selected)
      .map(option => option.id);
    this.filterCriteria.tagIds = selectedTagsIds;
    this.onChangeFilter();
  }

  onChangeFilter(): void {
    if (!this.isMobile) {
      this.filterChanged.emit(this.filterCriteria);
    }
  }

  applyFilter(): void {
    this.activeModal.close(this.filterCriteria);
  }

  resetFilter(): void {
    let filterObj = {
      brandIds: [],
      tagIds: [],
      categoryId: null,
      priceMin: 1,
      priceMax: 100000,
      name: "",
      sortBy: 0
    }
    if(this.isMobile) {
      this.activeModal.close(filterObj);
    } else {
      this.filterCriteria = filterObj;
      this.onChangeFilter();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
