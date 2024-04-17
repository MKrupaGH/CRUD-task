import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    EditBudgetComponent,
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  budget$!: Observable<number>;
  constructor(
    private budgetService: BudgetService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.budget$ = this.budgetService.getBudget();
  }

  openEditForm(data: number) {
    this.dialog.open(EditBudgetComponent, { data });
  }
}
