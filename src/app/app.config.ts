import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  // INFO: After testing, it did not really matter whether provideHttpClient() is used with fetch or without
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()),]
};
