import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFeaturesComponent } from './site-features.component';

describe('SiteFeaturesComponent', () => {
  let component: SiteFeaturesComponent;
  let fixture: ComponentFixture<SiteFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
