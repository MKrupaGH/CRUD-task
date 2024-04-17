import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  budget: number = 20000;

  constructor() {}

  getBudget(): Observable<number> {
    return of(this.budget);
  }

  updateBudget(newBudget: number): Observable<number> {
    return of((this.budget = newBudget));
  }
}
