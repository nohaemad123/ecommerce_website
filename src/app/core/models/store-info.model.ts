export interface StoreInfo {
    storeInfoLangDto: StoreMainInfo;
    addressLangDto: StoreAddressInfo;
    socialMediaLinksDto: SocialMediaLinks;
    additionalLinksDto: AdditionalLinks;
  }
  
  export interface StoreMainInfo {
    nameEn: any
    aboutEn: any
    id: number
    name: string
    about: any
    fullMobilePhoneNumber: any
    fullWhatsAppNumber: any
    localTelephone: any
    email: any
    storeActivityId: any
    userId: number
    companyId: number
  }
  
  export interface StoreAddressInfo {
    nameEn: any
    _AddressEn: any
    streetEn: any
    districtEn: any
    name: any
    _Address: any
    postalCode: any
    street: any
    district: any
    countryId: any
    cityId: any
  }
  
  export interface SocialMediaLinks {
    instagramLink: string
    facebookLink: string
    twitterLink: string
    youtubeLink: string
    snapchatLink: string
    tiktokLink: string
    linkedinLink: string
    gmailLink: string
  }
  
  export interface AdditionalLinks {
    maroofLink: any
    iphoneLink: any
    androidLink: any
  }
  