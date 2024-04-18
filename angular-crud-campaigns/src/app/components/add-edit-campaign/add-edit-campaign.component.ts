import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { towns } from '../../constant/towns';
import { keys } from '../../constant/keys';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CampaignsService } from '../../services/campaigns.service';
import { CoreService } from '../../core/core.service';
import { Campaign } from '../../models/campaign.model';
import { BudgetService } from '../../services/budget.service';
import { Fields, FormType } from '../../models/campaignForm.model';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-edit-campaign',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    MatDialogTitle,
  ],
  templateUrl: './add-edit-campaign.component.html',
  styleUrl: './add-edit-campaign.component.scss',
})
export class AddEditCampaignComponent implements OnInit {
  //budget!: number;
  campaignForm = this.fb.group<FormType>({
    [Fields.NAME]: this.fb.control('', [Validators.required]),
    [Fields.STATUS]: this.fb.control('', [Validators.required]),
    [Fields.KEYWORD]: this.fb.control([], [Validators.required]),
    [Fields.BIDAMOUNT]: this.fb.control(0, [
      Validators.required,
      Validators.min(20),
    ]),
    [Fields.CAMPAIGNFUND]: this.fb.control(0, [Validators.required]),
    [Fields.TOWN]: this.fb.control('', [Validators.required]),
    [Fields.RADIUS]: this.fb.control(0, [Validators.required]),
  });

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true,
  };

  towns = towns;
  keywords = keys;

  constructor(
    private fb: NonNullableFormBuilder,
    private campaignsService: CampaignsService,
    private coreService: CoreService,
    private dialogRef: MatDialogRef<AddEditCampaignComponent>,
    private destroyRef: DestroyRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.campaignForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.campaignForm.valid) {
      if (this.data) {
        this.updateCampaign();
      } else {
        this.addCampaign();
      }
    }
  }

  private updateCampaign() {
    this.campaignsService
      .updateCampaignById(this.data.id, this.campaignForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (campaign: Campaign) => {
          this.updateCampaignState(campaign);
          this.showSuccessSnackBar('Employee updated successfully', 'Updated');
          this.closeDialog();
        },
        error: (err) => this.handleError(err),
      });
  }

  private addCampaign() {
    this.campaignsService
      .addCampaign(this.campaignForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (campaign: Campaign) => {
          this.addCampaignToState(campaign);
          this.showSuccessSnackBar('Employee added successfully', 'Added');
          this.closeDialog();
        },
        error: (err) => this.handleError(err),
      });
  }

  private updateCampaignState(newCampaign: Campaign) {
    this.campaignsService.campaignsState.next(
      this.campaignsService.campaignsState.value.map((campaign) =>
        campaign.id === newCampaign.id ? newCampaign : campaign
      )
    );
  }

  private addCampaignToState(newCampaign: Campaign) {
    this.campaignsService.campaignsState.next([
      ...this.campaignsService.campaignsState.value,
      newCampaign,
    ]);
  }

  private showSuccessSnackBar(message: string, action: string) {
    this.coreService.openSnackBar(message, action);
  }

  private closeDialog() {
    this.dialogRef.close(true);
  }

  private handleError(error: any) {
    console.error(error);
  }
}
