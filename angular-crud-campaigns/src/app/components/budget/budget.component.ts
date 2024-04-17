import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent implements OnInit {
  budget$!: Observable<number>;
  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.budget$ = this.budgetService.getBudget();
  }

  openEditForm(budget: number) {
    
  }
}
