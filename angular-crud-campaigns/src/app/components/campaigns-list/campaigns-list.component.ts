import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { campaigns } from '../../mock/campaigns';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Campaign } from '../../models/campaign.model';
import { CampaignsService } from '../../services/campaigns.service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCampaignComponent } from '../add-edit-campaign/add-edit-campaign.component';
import { WarningComponent } from '../warning/warning.component';
import { CoreService } from '../../core/core.service';
import { CampaignDetailComponent } from '../campaign-detail/campaign-detail.component';
@Component({
  selector: 'app-campaigns-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    AddEditCampaignComponent,
    WarningComponent,
    CampaignDetailComponent,
  ],
  templateUrl: './campaigns-list.component.html',
  styleUrl: './campaigns-list.component.scss',
})
export class CampaignsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'options'];
  dataSource$!: Observable<Campaign[]>;
  dataSource!: Campaign[];

  constructor(
    private campaignsService: CampaignsService,
    private dialog: MatDialog,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    // this.dataSource = this.campaignsService.campaigns;
    this.dataSource$ = this.campaignsService.campaignsState.asObservable();
    console.log(this.dataSource$);
    
  }

  openEditForm(data: Campaign) {
    this.dialog.open(AddEditCampaignComponent, { data });
  }

  openDetailWindow(data: Campaign) {
    this.dialog.open(CampaignDetailComponent, { data });
  }

  deleteCampaign(id: string) {
    const dialogRef = this.dialog.open(WarningComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.campaignsService.deleteCampaign(id).subscribe({
            next: (res) => {
              this.campaignsService.campaignsState.next(
                [...this.campaignsService.campaignsState.value].filter(
                  (campaign) => campaign.id !== res.id
                )
              );
              this.coreService.openSnackBar(
                'Employee deleted successfully',
                'Deleted'
              );
            },
            error: (err) => console.log(err),
          });
        }
      },
    });
  }
}
