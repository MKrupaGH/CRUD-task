import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BudgetService } from '../../services/budget.service';
import { CampaignsService } from '../../services/campaigns.service';
import { map, reduce } from 'rxjs';
@Component({
  selector: 'app-edit-budget',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './edit-budget.component.html',
  styleUrl: './edit-budget.component.scss',
})
export class EditBudgetComponent {
  budgetForm = this.fb.group({
    budget: this.fb.control(this.data, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private fb: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<EditBudgetComponent>,
    private budgetService: BudgetService,
    private campaignsService: CampaignsService
  ) {}

  onFormSubmit() {
    if (this.budgetForm.valid) {
      this.updateBudget();
      this.closeDialog();
    }
  }

  private updateBudget() {
    this.budgetService.updateBudget(this.budgetForm.get(['budget'])!.value);
  }

  private closeDialog() {
    this.dialogRef.close(true);
  }
}
