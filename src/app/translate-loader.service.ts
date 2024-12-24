// translation-loader.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationLoaderService {
  constructor(private translate: TranslateService) {}

  loadTranslations(translations: { lang: string; data: any }[]): Promise<void> {
    const promises: Promise<any>[] = [];

    translations.forEach((translation) => {
      const { lang, data } = translation;
      this.translate.setTranslation(lang, data);
      promises.push(this.translate.use(lang).toPromise());
    });

    return Promise.all(promises).then(() => {});
  }
}
