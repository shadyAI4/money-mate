import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {PesaFilteringInput, PesaInputObject, PesaObjectType } from './add-expenses.model';

export const loadExpenses = createAction(
    '[UserExpenses/API] Load UserExpenses',
    props<{ userExpenses: PesaObjectType[] }>()

);

export const loadExpense = createAction(
    '[UserExpenses/API] Load UserExpense',
    props<{userExpense: PesaObjectType }>()

);

export const addExpenses = createAction(
    '[UserExpenses/API] Add UserExpenses',
    props<{userExpenses: PesaObjectType[] }>()

);

export const addExpense = createAction(
    '[UserExpenses/API] Add UserExpense',
    props<{userExpense: PesaObjectType }>()

);

export const upsertExpenses = createAction(
    '[UserExpenses/API] Upsert UserExpenses',
    props<{userExpenses: PesaObjectType[] }>()

);

export const upsertExpense = createAction(
    '[UserExpenses/API] Upsert UserExpense',
    props<{userExpense: PesaObjectType }>()

);

export const updateExpenses = createAction(
    '[UserExpenses/API] Update UserExpenses',
    props<{ userExpenses: PesaObjectType[] }>()

);

export const updateExpense = createAction(
    '[UserExpenses/API] Update UserExpense',
    props<{ userExpense: PesaObjectType }>()

);


export const getUserExpenseMutation = createAction(
    '[UserExpenses/ API] create UserExpense',
    props<{ filtering: PesaFilteringInput }>()
);

export const addUserExpenses = createAction(
    '[UserExpenses/ API] add UserExpense',
    props<{ input: PesaInputObject}>()
)
