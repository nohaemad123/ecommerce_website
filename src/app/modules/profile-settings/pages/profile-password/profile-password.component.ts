import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Meta, Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/models';
import { Patterns } from 'src/app/core/Constants/patterns';
import { RoutingService } from 'src/app/core/services/routing.service';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit, OnDestroy {

  changePasswordForm: FormGroup;
  confirmPassword = true;
  passwordTextType: boolean;
  new_passwordTextType: boolean;
  confirm_new_passwordTextType: boolean
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/;
  submitted = false;
  loading = false;
  error = '';
  subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private coreTranslationService: CoreTranslationService,
    private profileService: ProfileService,
    private router: Router,
    private notifier: NotifyService,
    private titleService: Title,
    private meta: Meta,
    private routingService: RoutingService
  ) {
    this.coreTranslationService.translate(english, arabic);
  }

  ngOnInit(): void {
    this.initChangePasswordForm();
    this.handlePageTitle();
    this.handleMetaTags();
  }
  
  handlePageTitle(): void {
    this.titleService.setTitle(this.coreTranslationService.instant('change_password.title'));
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
      { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('change_password.title') },
      { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'twitter:image', content: '' },

      // Facebook Card
      { name: 'og:url', content: '' },
      { name: 'og:type', content: 'Service' },
      { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('change_password.title') },
      { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
      { name: 'og:image', content: '' }

    ]);
  }

  get profileInfoFormControls(): any {
    return this.changePasswordForm.controls;
  }

  togglePasswordTextType(): void {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleNewPasswordTextType(): void {
    this.new_passwordTextType = !this.new_passwordTextType;
  }

  toggleConfirmNewPasswordTextType(): void {
    this.confirm_new_passwordTextType = !this.confirm_new_passwordTextType;
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(Patterns.complexPassword),
      ],],
      confirmNewPassword: ['', Validators.required]
    });
  }


  checkConfirmPassword(): void {
    let newPassword = this.changePasswordForm.controls['newPassword'].value;
    let confirmNewPassword = this.changePasswordForm.controls['confirmNewPassword'].value;
    if (newPassword !== confirmNewPassword) {
      this.confirmPassword = false
    } else {
      this.confirmPassword = true
    }
  }

  changePassword(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }

    let formValue = this.changePasswordForm.value;
    delete formValue['confirmNewPassword'];
    // delete this.changePasswordForm.controls['confirmNewPassword']

    // Login
    this.loading = true;
    this.subscriptions.add(
      this.profileService
        .changePassword({
          ...this.changePasswordForm.value,
        })
        .subscribe(
          (response: ApiResponse) => {
            this.loading = false;
            if (response?.ok) {
              this.notifier.notifySuccess(response.responseMessage);
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
