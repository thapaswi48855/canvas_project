import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.reducer';

export const selectCounters = createFeatureSelector<CounterState[]>('counters');

export const selectCounterCount = createSelector(
  selectCounters,
  (counters) => counters.length
);
