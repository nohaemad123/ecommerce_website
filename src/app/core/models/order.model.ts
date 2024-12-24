import { Address } from "./address.model"

export interface Order {
    id: number;
    orderNumber: number;
    orderNote: any;
    customerId: number;
    customerEmail: string;
    customerPhone: string;
    paymentTypeId: number;
    orderIsPaid: boolean;
    currencyId: number;
    shippingMethodId: number;
    shippingAddressId: number;
    shippingAddress: Address;
    trackingNumber: string;
    couponId: any;
    couponCode: any;
    subtotal: number;
    discount: number;
    vat: number;
    shippingRate: number;
    total: number;
    invoiceId: number;
    statusId: number;
    orderDetails: OrderDetail[];
    paymentType: string;
    currencyName: string;
    shippingMethod: string;
    statusName: string;
    orderDate: string;
    lastModified: any;
}

export interface OrderDetail {
    id: number;
    productID: number;
    productName: string;
    image: string;
    productCode: string;
    deliveryDate: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
