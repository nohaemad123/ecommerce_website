import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddressesService } from '../../services/addresses.service';
import { locale as arabic } from './../../i18n/ar';
import { locale as english } from './../../i18n/en';
import { CoreTranslationService } from 'src/app/shared/services/core-translation.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Meta, Title } from '@angular/platform-browser';
import { Address, ApiResponse, EmptyState } from 'src/app/core/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit, OnDestroy {

    isOpen = false;
    addressesData: Address[] = [];
    loading = false;
    addressData: Address;
    isEditClicked = false;
    emptyStateData: EmptyState;
    subscriptions = new Subscription();

    constructor(
        private addressesService: AddressesService,
        private coreTranslationService: CoreTranslationService,
        private addressService: AddressesService,
        private notifier: NotifyService,
        private titleService: Title,
        private meta: Meta
    ) {
        this.coreTranslationService.translate(english, arabic);
    }

    ngOnInit(): void {
        this.getAllAddresses();
        this.prepareEmptyStateData();
        this.handlePageTitle();
        this.handleMetaTags();
    }

    handlePageTitle(): void {
        this.titleService.setTitle(this.coreTranslationService.instant('MyAddresses'));
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
            { name: 'twitter:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('MyAddresses') },
            { name: 'twitter:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'twitter:image', content: '' },

            // Facebook Card
            { name: 'og:url', content: '' },
            { name: 'og:type', content: 'Service' },
            { name: 'og:title', content: 'Al Nasyan Company | ' + this.coreTranslationService.instant('MyAddresses') },
            { name: 'og:description', content: 'An Ecommerce Platform provides a wide range of products.' },
            { name: 'og:image', content: '' }

        ]);
    }

    getAllAddresses(): void {
        this.loading = true;
        this.subscriptions.add(
            this.addressesService.getAllAddresses().subscribe((response: ApiResponse) => {
                this.loading = false;
                if (response.ok) {
                    this.addressesData = response.data;
                } 
            }, (error: HttpErrorResponse) => {
                this.loading = false;
            }
            )
        );
    }

    prepareEmptyStateData(): void {
        this.emptyStateData = {
            text: this.coreTranslationService.instant('NoAddressesFound'),
            btnText: this.coreTranslationService.instant('AddNewAddress'),
            withBtn: true,
        };
    }

    onEditAddress(event: { address: Address }): void {
        if (event?.address) {
            this.openForm('EDIT');
            this.addressData = event.address;
            this.isEditClicked = this.isOpen ? true : false;
        }
    }

    openForm(mode: string): void {
        if (mode === 'ADD') {
            this.addressData = {} as Address;
        }
        this.isOpen = !this.isOpen;
    }

    setAddressAsDefaultAddress(addressId: number): void {
        this.subscriptions.add(this.addressService.setDefaultAddress(addressId).subscribe(() => {
            this.getAllAddresses();
        }));
    }

    onUpdateAddressList(event: { changed: boolean }): void {
        if (event.changed) {
            this.getAllAddresses();
            this.isOpen = false;
            this.isEditClicked = false;
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
