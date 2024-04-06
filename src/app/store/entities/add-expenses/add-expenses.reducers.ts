import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PesaObjectType } from './add-expenses.model';
import * as AddUserExpensesActions from './add-expenses.actions';

export const userExpensesFeatureKey = 'userExpenses';

export interface State extends EntityState<PesaObjectType> {
  // additional entities state properties
}

export const adapter: EntityAdapter<PesaObjectType> = createEntityAdapter<PesaObjectType>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(AddUserExpensesActions.addExpense,
    (state, action) => adapter.addOne(action.userExpense, state)
  ),
  on(AddUserExpensesActions.upsertExpense,
    (state, action) => adapter.upsertOne(action.userExpense, state)
  ),
  on(AddUserExpensesActions.addExpenses,
    (state, action) => adapter.addMany(action.userExpenses, state)
  ),
  on(AddUserExpensesActions.upsertExpenses,
    (state, action) => adapter.upsertMany(action.userExpenses, state)
  ),
//   on(AddUserExpensesActions.updateGameText,
//     (state, action) => adapter.updateOne(action.gameText, state)
//   ),
//   on(AddUserExpensesActions.updateGameTexts,
//     (state, action) => adapter.updateMany(action.gameTexts, state)
//   ),
//   on(AddUserExpensesActions.deleteSystemUsers,
//     (state, action) => adapter.removeOne(action.id, state)
//   ),
//   on(AddUserExpensesActions.deleteSystemUserss,
//     (state, action) => adapter.removeMany(action.ids, state)
//   ),
  on(AddUserExpensesActions.loadExpenses,
    (state, action) => adapter.setAll(action.userExpenses, state)
  ),
//   on(AddUserExpensesActions.clearSystemUserss,
//     state => adapter.removeAll(state)
//   ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
