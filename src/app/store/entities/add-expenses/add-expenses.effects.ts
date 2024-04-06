import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';

import { AppState } from 'src/app/store/reducers';
import * as fromActions from './add-expenses.actions';
import * as fromGraphql from './add-expenses.graphql'
import { map, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserExpensesEffects {
    constructor(
        private actions$: Actions,
        private apollo: Apollo,
        private store: Store<AppState>,
        private toastr:ToastrService,
      ) {}

      getUserExpenseMutation = createEffect(() => this.actions$.pipe(
        ofType(fromActions.getUserExpenseMutation),
        switchMap((action) => {
          return this.apollo.query({
            query: fromGraphql.GET_ALL_PESA_DATA_QUERY,
            fetchPolicy: 'network-only',
            variables:{
              filtering:{
                spendsUniqueid:action.filtering.spendsUniqueid,

              }
            }
          }).pipe(
            // this.notificationService.catchError('Problem occurred while fetching system users'),
            map(({ data }: any ) => {
              if (data) {
                const result: any = Object.values(data)[0];
                // this.paginationService.setPage(result?.page)
                // result?.response?.status ? this.store.dispatch(fromActions.loadGameTextParticipants({ gameParticipantsDatas: result?.data })) : []
              }
            })
          );
        })
      ), { dispatch: false });

      addUserExpenses = createEffect(() => this.actions$.pipe(
        
        ofType(fromActions.addUserExpenses),
        switchMap((action) => {
          return this.apollo.mutate({
            mutation: fromGraphql.ADD_USER_EXPENSES_MUTATION,
            variables: {
                input:{
                  userUniqueId: action?.input.userUniqueId,
                  amountSpend: action?.input.amountSpend,
                  serviceOrStaffSpend: action?.input.serviceOrStaffSpend,
                  reasonOfSpend: action?.input.reasonOfSpend,
                }
                
            }
            
          }).pipe(
            // this.notificationService.catchError('Problem occurred while saving record'),
            map(({ data }: any) => {
    
              if (data) {
                const result: any = Object.values(data)[0];
                console.log(result.data)
                
                if (result?.response?.code == '103') {
                  this.store.dispatch(
                    fromActions.updateExpense({ userExpense: result?.data })
                  );
                  this.toastr.success(result?.response?.message);
                } else {
                //   this.notificationService.errorMessage(result?.response?.message + ' code:' + result?.response?.code);
                }
              }
            })
          );
          
        })
      ), { dispatch: false });

   


}