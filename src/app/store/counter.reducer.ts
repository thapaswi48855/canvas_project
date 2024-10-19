import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, addCounter, deleteCounter } from './counter.actions';

export interface CounterState {
  id: number;
  count: number;
}

export const initialState: CounterState[] = [];

export const counterReducer = createReducer(
  initialState,
  on(addCounter, (state) => [...state, { id: state.length + 1, count: 0 }]),
  on(increment, (state, { id }) => {
    return state.map(counter => counter.id === id ? { ...counter, count: counter.count + 1 } : counter);
  }),
  on(decrement, (state, { id }) => {
    return state.map(counter => counter.id === id ? { ...counter, count: Math.max(counter.count - 1, 0) } : counter);
  }),
  on(deleteCounter, (state, { id }) => state.filter(counter => counter.id !== id)),
  on(reset, () => initialState)
);
