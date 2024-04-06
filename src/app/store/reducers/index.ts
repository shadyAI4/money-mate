import {ActionReducerMap, MetaReducer,} from '@ngrx/store';
import {environment} from 'src/environments/environment';

import * as fromAddExpenses from '../entities/add-expenses/add-expenses.reducers'

export interface AppState {

  [fromAddExpenses.userExpensesFeatureKey]: fromAddExpenses.State;

}

export const reducers: ActionReducerMap<AppState> = {
  
  [fromAddExpenses.userExpensesFeatureKey]: fromAddExpenses.reducer,

};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
