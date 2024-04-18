import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  budget = new BehaviorSubject<number>(100000);

  getBudget(): Observable<number> {
    return this.budget.asObservable();
  }

  updateBudget(newBudget: number) {
    this.budget.next(newBudget);
  }
}
