import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  //mock state to updated view
  campaignsState = new BehaviorSubject<Campaign[]>([]);

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http
      .get<Campaign[]>('https://mock-crcf.onrender.com/campaigns')
      .pipe(tap((campaigns) => this.campaignsState.next(campaigns)));
  }

  addCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(
      'https://mock-crcf.onrender.com/campaigns',
      campaign
    );
  }

  deleteCampaign(campaignId: string): Observable<Campaign> {
    return this.http.delete<Campaign>(
      `https://mock-crcf.onrender.com/campaigns/${campaignId}`
    );
  }

  updateCampaignById(
    id: string,
    updatedCampaign: Campaign
  ): Observable<Campaign> {
    return this.http.put<Campaign>(
      `https://mock-crcf.onrender.com/campaigns/${id}`,
      updatedCampaign
    );
  }
}
