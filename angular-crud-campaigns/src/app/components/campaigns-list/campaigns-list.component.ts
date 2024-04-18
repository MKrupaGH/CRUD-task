import { Component, DestroyRef, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Campaign } from '../../models/campaign.model';
import { CampaignsService } from '../../services/campaigns.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCampaignComponent } from '../add-edit-campaign/add-edit-campaign.component';
import { WarningComponent } from '../warning/warning.component';
import { CoreService } from '../../core/core.service';
import { CampaignDetailComponent } from '../campaign-detail/campaign-detail.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  constructor(
    private campaignsService: CampaignsService,
    private dialog: MatDialog,
    private coreService: CoreService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.dataSource$ = this.campaignsService.campaignsState.asObservable();
  }

  openEditForm(data: Campaign) {
    this.dialog.open(AddEditCampaignComponent, { data });
  }

  openDetailWindow(data: Campaign) {
    this.dialog.open(CampaignDetailComponent, { data });
  }

  onDeleteCampaign(id: string) {
    const dialogRef = this.dialog.open(WarningComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.deleteCampaign(id);
        }
      },
    });
  }
  private deleteCampaign(id: string) {
    this.campaignsService
      .deleteCampaign(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.deleteCampaignInState(id);
          this.showSuccessSnackBar('Employee deleted successfully', 'Deleted');
        },
        error: (err) => this.handleError(err),
      });
  }

  private deleteCampaignInState(id: string) {
    this.campaignsService.campaignsState.next(
      [...this.campaignsService.campaignsState.value].filter(
        (campaign) => campaign.id !== id
      )
    );
  }

  private showSuccessSnackBar(message: string, action: string) {
    this.coreService.openSnackBar(message, action);
  }

  private handleError(error: any) {
    console.error(error);
  }
}
