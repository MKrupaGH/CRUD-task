import { Injectable } from '@angular/core';
import { campaigns } from '../mock/campaigns';
import { Campaign } from '../models/campaign.model';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  //mock state to updated view
  campaignsState = new BehaviorSubject<Campaign[]>([]);
  //campaigns: Campaign[] = []
  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http
      .get<Campaign[]>('http://localhost:3000/campaigns')
      .pipe(tap((campaigns) => this.campaignsState.next(campaigns)));
  }

  addCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(
      'http://localhost:3000/campaigns',
      campaign
    );
  }

  deleteCampaign(campaignId: string): Observable<Campaign> {
    return this.http.delete<Campaign>(
      `http://localhost:3000/campaigns/${campaignId}`
    );
  }

  updateCampaignById(
    id: string,
    updatedCampaign: Campaign
  ): Observable<Campaign> {
    return this.http.put<Campaign>(
      `http://localhost:3000/campaigns/${id}`,
      updatedCampaign
    );
  }
}
