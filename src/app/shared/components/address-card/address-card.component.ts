import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Address, ApiResponse } from 'src/app/core/models';
import { NotifyService } from 'src/app/core/services/notify.service';
import { AddressesService } from 'src/app/modules/addresses/services/addresses.service';

@Component({
    selector: 'app-address-card',
    templateUrl: './address-card.component.html',
    styleUrls: ['./address-card.component.scss'],
})
export class AddressCardComponent implements OnInit, OnDestroy {

    @Input() address: Address;
    @Output() updateList = new EventEmitter<{ changed: boolean }>();
    @Output() editAddressEmitter = new EventEmitter<{ address: Address }>();
    isEditClicked = false;
    subscriptions = new Subscription();

    constructor(private addressService: AddressesService,
        private notifier: NotifyService,

    ) { }

    ngOnInit(): void { }

    deleteAddress(addressId: number): void {
        this.subscriptions.add(
            this.addressService
                .deleteAddress(addressId)
                .subscribe((response: ApiResponse) => {
                    if (response.ok) {
                        this.updateList.emit({ changed: true });
                    }

                }
                )
        );
    }

    changedDefaultAddress(addressId: number): void {
        if (!this.isEditClicked) {
            this.subscriptions.add(
                this.addressService
                    .setDefaultAddress(addressId)
                    .subscribe((response: ApiResponse) => {
                        if (response.ok) {
                            this.updateList.emit({ changed: true });
                        }
                    }
                    )
            );
        }
    }

    editAddress(): void {
        this.isEditClicked = !this.isEditClicked;
        this.editAddressEmitter.emit({ address: this.address });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
