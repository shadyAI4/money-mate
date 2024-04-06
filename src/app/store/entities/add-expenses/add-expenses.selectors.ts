import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as fromAddExpenesReducer from './add-expenses.reducers';
// import { CultivatedCrop } from './cultivated-crop.model';
export const currentState = (state: AppState) =>
  state[fromAddExpenesReducer.userExpensesFeatureKey];

export const selectUserExpenses = createSelector(
  currentState,
  fromAddExpenesReducer.selectAll
);

