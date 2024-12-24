import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationController, ShippingAddressesController } from 'src/app/core/Controllers';
import { Address, ApiResponse } from 'src/app/core/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http: HttpClient) {
  }

  getAllAddresses(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(ShippingAddressesController.GetAllAddresses);
  }

  addAddress(addressData: Address): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(ShippingAddressesController.AddAddress, addressData);
  }

  updateAddress(addressId: number, addressData: Address): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${ShippingAddressesController.UpdateAddress}${addressId}`, addressData);
  }

  deleteAddress(addressId: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${ShippingAddressesController.DeleteAddress}${addressId}`);
  }

  setDefaultAddress(shippingAddressId: number): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${ShippingAddressesController.SetAsDefaultAddress}${shippingAddressId}`,{});
  }

  //GetCitiesByCountryId
  getCitiesByCountryId(countryId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${LocationController.GetCountryCities}${countryId}`);
  }

}
