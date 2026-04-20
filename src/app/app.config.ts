import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withViewTransitions,
  withComponentInputBinding,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import routeConfig from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
        routeConfig,
        withViewTransitions(),
        withComponentInputBinding(),
    ),
    provideHttpClient(),
    provideAnimations(),
  ],
};