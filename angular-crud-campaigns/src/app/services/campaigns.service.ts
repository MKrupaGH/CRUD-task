import { Injectable } from '@angular/core';
import { campaigns } from '../mock/campaigns';
import { Campaign } from '../models/campaign.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  private campaigns: Campaign[] = campaigns;

  constructor() {}

  getCampaigns(): Observable<Campaign[]> {
    return of(this.campaigns);
  }

  addCampaign(campaign: any): Observable<Campaign[]> {
    // const id = Math.max(
    //   [...this.campaigns].map((campaign) => campaign.id),
    //   1
    // );

    const id = 1000;

    console.log([
      ...this.campaigns,
      {
        id: id,
        ...campaign,
      },
    ]);

    return of([
      ...this.campaigns,
      {
        id: id,
        ...campaign,
      },
    ]);
  }

  deleteCampaign(campaignId: number): Observable<Campaign[]> {
    return of(
      [...this.campaigns].filter((campaign) => campaign.id !== campaignId)
    );
  }

  updateCampaignById(id: number, updatedCampaign: any): Observable<Campaign[]> {
    return of(
      [...this.campaigns].map((campaign) => {
        if (campaign.id === id) {
          campaign = { id, ...updatedCampaign };
        }
        return campaign;
      })
    );
  }
}
