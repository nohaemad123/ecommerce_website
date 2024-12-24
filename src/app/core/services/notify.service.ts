import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  private readonly notifier: NotifierService;

  constructor(
    notifierService: NotifierService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.notifier = notifierService;
    }
  }

  notifySuccess(msg: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.notifier.notify('success', msg);
    }
  }

  notifyError(msg: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.notifier.notify('error', msg);
    }
  }

  notifyInfo(msg: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.notifier.notify('info', msg);
    }
  }

  notifyWarning(msg: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.notifier.notify('warning', msg);
    }
  }

}
