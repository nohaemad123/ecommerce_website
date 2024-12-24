import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, ApiResponse, City, Country } from 'src/app/core/models';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddressesService } from 'src/app/modules/addresses/services/addresses.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {

    @Output() updateList = new EventEmitter<{ changed: boolean }>();
    @Input() addressData: Address;
    countries: Country[] = [];
    cities: City[] = [];
    addressForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    subscriptions = new Subscription();
    countryPhoneCode:string;
    constructor(
        private addressService: AddressesService,
        private formBuilder: FormBuilder,
        private notifier: NotifyService,
        private commonService: CommonService
    ) { }

    get addressFormControls() {
        return this.addressForm.controls;
    }

    ngOnInit(): void {
        this.initAddressForm();
        this.getAllCountries();
        this.handleAddressEdit();

        // this.addressForm .valueChanges.subscribe(value => {
        //     console.log('addressForm',value);
        //     //emitting every time if any control value is changed
        //   });
    }

    handleAddressEdit(): void {
        if (this.addressData?.id) {
            this.addressForm.patchValue(this.addressData);
            if(this.addressForm.value?.phoneNumber?.length === 10)
             this.addressFormControls.phoneNumber.setValue('0'+ this.addressForm.value?.phoneNumber);

            this.getCitiesByCountryId();
        }
    }

    initAddressForm(): void {
        this.addressForm = this.formBuilder.group({
            id: [0],
            fullname: ['', [Validators.required]],
            countryId: ['', [Validators.required]],
            cityId: ['', Validators.required],
            phoneNumber: ['', [Validators.required]],
            streetAddress: ['', Validators.required],
            buildingNumber: ['', [Validators.required]],
            state: ['',[Validators.required]],
            defaultAddress: [false],
        });
    }

    getAllCountries(): void {
        this.subscriptions.add(
            this.commonService.getAllCountries().subscribe((response: ApiResponse) => {
                if (response.ok) {
                    this.countries = response.data;
                } 
            }
            )
        );
    }

    getCitiesByCountryId(): void {
        let countryId = this.addressFormControls['countryId'].value;
        this.subscriptions.add(
            this.addressService
                .getCitiesByCountryId(countryId)
                .subscribe((response: ApiResponse) => {
                    if (response.ok) {
                        this.cities = response.data;
                            this.addressFormControls['cityId'].setValue(
                                this.cities[0].id
                            );
                            this.onSelectCountryCode();
                    } 
                }
                )
        );
    }

    addAddress(): void {
        this.submitted = true;
        // stop here if form is invalid
        if (this.addressForm.invalid) {
            return;
        }

        let formData={
            ...this.addressForm.value,
            phoneNumber:this.addressForm.value?.phoneNumber?.length === 9
            ? this.addressForm.value.phoneNumber
            : this.addressForm.value.phoneNumber.slice(1),
           }
        this.loading = true;
        this.subscriptions.add(
            this.addressService
                .addAddress(formData)
                .subscribe((response: ApiResponse) => {
                    if (response.ok) {
                        this.updateList.emit({ changed: true });
                        this.loading = false;
                        this.addressForm.reset();
                        this.submitted = false;
                    }
                }, (error: HttpErrorResponse) => {
                    this.error = error.error.responseMessage;
                    this.loading = false;
                })
        );
    }





    onSelectCountryCode(): void {
        let countryId = this.addressFormControls['countryId'].value;
        if (countryId == 1) {
            this.countryPhoneCode='+966';
            this.addressFormControls['state'].setValue(null);
            this.addressFormControls.phoneNumber.setValidators([Validators.minLength(9), Validators.maxLength(9),Validators.required]);
            this.addressFormControls.phoneNumber.updateValueAndValidity();

        } else if (countryId == 2 ) {
            this.countryPhoneCode='+20';
         this.addressFormControls['state'].setValue('Egypt');
            this.addressFormControls.phoneNumber.setValidators([Validators.minLength(11), Validators.maxLength(11),Validators.required])
            this.addressFormControls.phoneNumber.updateValueAndValidity();

        }
    }



    editAddress(): void {
        this.submitted = true;
        // stop here if form is invalid
        if (this.addressForm.invalid) {
            return;
        }
        // edit address

        let formData={
            ...this.addressForm.value,
            phoneNumber:this.addressForm.value?.phoneNumber?.length === 9
            ? this.addressForm.value.phoneNumber
            : this.addressForm.value.phoneNumber.slice(1),
           }
        this.loading = true;

        this.subscriptions.add(
            this.addressService
                .updateAddress(this.addressData.id, formData)
                .subscribe((response: ApiResponse) => {
                    if (response.ok) {
                        this.updateList.emit({ changed: true });
                        this.loading = false;
                        this.addressForm.reset();
                        this.submitted = false;
                    } 
                }, (error: HttpErrorResponse) => {
                    this.error = error.error.responseMessage;
                    this.loading = false;
                })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
