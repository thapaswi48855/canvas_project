import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCounterCount, selectCounters } from '../store/counter.selectors';
import { increment, decrement, reset, addCounter, deleteCounter } from '../store/counter.actions';
import { CounterState} from '../store/counter.reducer';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counters$: Observable<CounterState[]>; 
  counterCount$: Observable<number>; 

  constructor(private store: Store) {
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
