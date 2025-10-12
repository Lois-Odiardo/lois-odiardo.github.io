import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routeConfig),
        provideHttpClient(),  // ← AJOUTER CETTE LIGNE
        provideAnimations()   // ← AJOUTER CETTE LIGNE
    ]
}).catch(err => console.error(err));