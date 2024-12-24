import { Pipe, PipeTransform } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {

    constructor(private cookieService: CookieService) {
        
    }

    currentLang =  this.cookieService.get('lang')
        ?  this.cookieService.get('lang')
        : environment.lang;

    transform(value: number, currencyCode: string): string {
        // Define currency symbols and exchange rates
        const currencySymbols: { [key: string]: string } = {
            EGP: this.currentLang == 'en' ? 'EGP' : 'جنية',
            USD: this.currentLang == 'en' ? '$' : 'دولار',
            SAR: this.currentLang == 'en' ? 'SAR' : 'ريال',
            // Add more currencies and their symbols as needed
        };

        const exchangeRates: { [key: string]: number } = {
            SAR: 1, // 1 SAR = 1 SAR
            USD: 0.27, // 1 SAR = 0.27 USD
            EGP: 8.23, // 1 SAR = 8.23 EGP
            // Add exchange rates for other currencies
        };

        // Calculate the converted value based on the selected currency
        const convertedValue = value * exchangeRates[currencyCode];

        // Format the value as currency and append the currency symbol
        return `${convertedValue.toFixed(2)} ${currencySymbols[currencyCode]}`;
    }
}
