import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { Meta, Title } from '@angular/platform-browser';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/models';
import { RoutingService } from 'src/app/core/services/routing.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit, OnDestroy {

  profileInfoForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  subscriptions = new Subscription();
  usernameRegex = /^[a-zA-Z]+$/

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private coreTranslationService: CoreTranslationService,
    private router: Router,
    private notifier: NotifyService,
    private titleService: Title,
    private meta: Meta,
    private routingService: RoutingService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }
  ngOnInit(): void {
    this.getProfileInfo();
    this.initProfileInfoForm();
    this.handlePageTitle();
    this.handleMetaTags();
  }

  handlePageTitle(): void {
    this.titleService.setTitle(this.coreTranslationService.instant('profile_info.title'));
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
      { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('profile_info.title') },
      { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'twitter:image', content: '' },

      // Facebook Card
      { name: 'og:url', content: '' },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('profile_info.title') },
      { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'og:image', content: '' }

    ]);
  }

  get profileInfoFormControls(): any {
    return this.profileInfoForm.controls;
  }

  initProfileInfoForm(): void {
    this.profileInfoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required,Validators.pattern(this.usernameRegex)]],
      mobileNumber: ['', [Validators.required]],
      photoSrc:[''],

      
    });
  }

  getProfileInfo(): void {
    this.profileService.getUserByToken().subscribe((res: ApiResponse) => {
      this.profileInfoForm.patchValue(res.data);
      this.profileInfoForm.controls['mobileNumber'].setValue(res.data.phoneNumber)
    })
  }

  updateProfile(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileInfoForm.invalid) {
      return;
    }

    
    this.subscriptions.add(
      this.profileService
        .updateProfile({
          ...this.profileInfoForm.value,
        })
        .pipe(finalize(() => this.loading = false))
        .subscribe(
          (response: ApiResponse) => {
            this.loading = false;
            if (response) {
              this.notifier.notifySuccess(response.responseMessage);
              this.getProfileInfo()
              // this.router.navigate(['/authentication']);
              this.routingService.navigate('authentication');
            }
          },
          (error: HttpErrorResponse) => {
            this.error = error.error.responseMessage;
            this.loading = false;
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}


