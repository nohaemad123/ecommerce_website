import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesFallbackService {

  constructor() { }

  handleLogoFallback(event?: any): string | void {
    if (event) {
      event.target.src = 'assets/img/noproduct.png';
    } else {
      return 'assets/img/noproduct.png';
    }
  }

  handleProductFallback(event?: any): string | void {
    if (event) {
      event.target.src = 'assets/img/noproduct.png';
    } else {
      return 'assets/img/noproduct.png';
    }
  }

  handleCategoryFallback(event?: any): string | void {
    if (event) {
      event.target.src = 'assets/img/noproduct.png';
    } else {
      return 'assets/img/noproduct.png';
    }
  }

  handleBrandFallback(event?: any): string | void {
    if (event) {
      event.target.src = 'assets/img/noproduct.png';
    } else {
      return 'assets/img/noproduct.png';
    }
  }

  handleFeaturedFallback(event?: any): string | void {
    if (event) {
      event.target.src = 'assets/img/noproduct.png';
    } else {
      return 'assets/img/noproduct.png';
    }
  }

  handleSliderFallback(event?: any): string | void {
    if (event) {
      event.target.src = 'assets/img/home-six/banner/22.webp';
    } else {
      return 'assets/img/home-six/banner/22.webp';
    }
  }

  handleBannerFallback(event?: any): string | void {
    if (event) {
      event.target.src = 'assets/img/noproduct.png';
    } else {
      return 'assets/img/noproduct.png';
    }
  }

}
