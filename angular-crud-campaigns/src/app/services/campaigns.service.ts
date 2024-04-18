import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign.model';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  //mock state to updated view
  campaignsState = new BehaviorSubject<Campaign[]>([]);

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(environment.APIURL).pipe(
      tap((campaigns) => this.campaignsState.next(campaigns)),
      catchError((err) => {
        return of(err);
      })
    );
  }

  addCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(environment.APIURL, campaign);
  }

  deleteCampaign(campaignId: string): Observable<Campaign> {
    return this.http.delete<Campaign>(`${environment.APIURL}/${campaignId}`);
  }

  updateCampaignById(
    id: string,
    updatedCampaign: Campaign
  ): Observable<Campaign> {
    return this.http.put<Campaign>(
      `${environment.APIURL}/${id}`,
      updatedCampaign
    );
  }
}
