// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  currency: 'SAR',
  lang: 'en',
  tenant: '',
  menuLinks: [],
  storeSettings: {},
  endPointUrl:'https://apieke.ekestore.net/api', //real server
  imageBaseUrl:'https://apieke.ekestore.net/', //real server
//   endPointUrl:'http://91.228.53.60:99/api', //replacement server
  // FE_URL:'http://91.228.53.98:99/api',
  // urlApiFile:'http://91.228.53.98:96',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
