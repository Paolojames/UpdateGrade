// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  enableTokenVerificationPolling: false,
  verifyTokenInterval: 1000 * 60 * 5, //5 minutes
  elavatekoAPI: {
    url: 'http://192.168.68.116:8000',
    endpoints: {
      login: 'api/token',
      chagePassword: 'api/change-password',
      verifyToken: 'api/token/verify',
      schoolClass: 'api/classes',
      sponsor: 'api/sponsors',
      staff: 'api/staffs',
      staffProfile: 'api/staff-profile',
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
