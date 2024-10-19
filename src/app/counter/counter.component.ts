import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCounterCount, selectCounters } from '../store/counter.selectors';
import { increment, decrement, reset, addCounter, deleteCounter } from '../store/counter.actions';
import { CounterState} from '../store/counter.reducer';

// interface Counter {
//   id: number;
//   count: number;
//   label: string;
// }

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counters$: Observable<CounterState[]>; // Observable for counter state
  counterCount$: Observable<number>; // Observable for counter count

  constructor(private store: Store) {
    // Select the counters and their count from the store
    this.counters$ = this.store.select(selectCounters);
    this.counterCount$ = this.store.select(selectCounterCount);
  }

  addCounter() {
    this.store.dispatch(addCounter());
  }

  incrementCounter(id: number) {
    this.store.dispatch(increment({ id }));
  }

  decrementCounter(id: number) {
    this.store.dispatch(decrement({ id }));
  }

  deleteCounter(id: number) {
    this.store.dispatch(deleteCounter({ id }));
  }

  resetCounters() {
    this.store.dispatch(reset());
  }
}
