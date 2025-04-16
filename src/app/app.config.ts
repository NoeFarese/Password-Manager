import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';
import {environment} from './environments';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireDatabase,
      AngularFireAuth
    ),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};
