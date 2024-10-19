import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment', props<{ id: number }>());
export const decrement = createAction('[Counter] Decrement', props<{ id: number }>());
export const reset = createAction('[Counter] Reset');
export const addCounter = createAction('[Counter] Add Counter');
export const deleteCounter = createAction('[Counter] Delete', props<{ id: number }>());
