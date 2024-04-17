import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Campaign } from '../../models/campaign.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-detail',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.scss',
})
export class CampaignDetailComponent {
  campaignDetail = this.data;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Campaign) {}
}
