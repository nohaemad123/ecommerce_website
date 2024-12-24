import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSliderComponent } from './products-slider.component';

describe('ProductsSliderComponent', () => {
  let component: ProductsSliderComponent;
  let fixture: ComponentFixture<ProductsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
