import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budget = new BehaviorSubject<number>(100000);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  getBudget(): Observable<number> {
    if (isPlatformBrowser(this.platformId)) {
      if (window.localStorage.getItem('budget') !== null)
        this.budget.next(Number(window.localStorage.getItem('budget')!));
    }
    return this.budget.asObservable();
  }

  updateBudget(newBudget: number) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('budget', `${newBudget}`);
    }
    this.budget.next(newBudget);
  }
}
