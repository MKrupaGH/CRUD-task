import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { towns } from '../../constant/towns';
import { keys } from '../../constant/keys';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

enum Fields {
  NAME = 'name',
  STATUS = 'status',
  KEYWORD = 'keyword',
  BIDAMOUNT = 'bidAmount',
  CAMPAIGNFUND = 'campaignFund',
  TOWN = 'town',
  RADIUS = 'radius',
}

interface FormType {
  [Fields.NAME]: FormControl<string>;
  [Fields.STATUS]: FormControl<string>;
  [Fields.KEYWORD]: FormControl<string[]>;
  [Fields.BIDAMOUNT]: FormControl<number>;
  [Fields.CAMPAIGNFUND]: FormControl<number>;
  [Fields.TOWN]: FormControl<string>;
  [Fields.RADIUS]: FormControl<number>;
}

@Component({
  selector: 'app-add-edit-campaign',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    MatSliderModule,
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    NgMultiSelectDropDownModule,
  ],
  templateUrl: './add-edit-campaign.component.html',
  styleUrl: './add-edit-campaign.component.scss',
})
export class AddEditCampaignComponent {
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
    itemsShowLimit: 10,
    allowSearchFilter: true,
  };

  towns = towns;
  keywords = keys;

  constructor(
    private fb: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<AddEditCampaignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  checkValues() {
    console.log(this.campaignForm.value);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
