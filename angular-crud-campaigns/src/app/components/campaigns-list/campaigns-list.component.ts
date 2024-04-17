import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { campaigns } from '../../mock/campaigns';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Campaign } from '../../models/campaign.model';
import { CampaignsService } from '../../services/campaigns.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-campaigns-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './campaigns-list.component.html',
  styleUrl: './campaigns-list.component.scss',
})
export class CampaignsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'options'];
  dataSource$!: Observable<Campaign[]>;

  constructor(private campaignsService: CampaignsService) {}

  ngOnInit(): void {
    this.dataSource$ = this.campaignsService.getCampaigns();
  }
}
