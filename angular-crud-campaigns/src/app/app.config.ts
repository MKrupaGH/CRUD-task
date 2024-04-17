import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { CampaignsService } from './services/campaigns.service';
import { Observable } from 'rxjs';
import { Campaign } from './models/campaign.model';

function initializeApp(
  http: HttpClient,
  campaignService: CampaignsService
): () => Observable<Campaign[]> {
  return () => campaignService.getCampaigns();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [HttpClient, CampaignsService],
    },
  ],
};
