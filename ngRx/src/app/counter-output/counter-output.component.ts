import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectCount, selectDoubleCount } from '../store/counter.selector';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  imports: [AsyncPipe],
  standalone: true,
})
export class CounterOutputComponent {
  store = inject(Store);
  count$: Observable<number> = this.store.select(selectCount);
  doubleCount$: Observable<number> = this.store.select(selectDoubleCount);

}
