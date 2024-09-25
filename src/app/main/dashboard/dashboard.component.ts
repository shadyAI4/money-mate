import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription, map } from 'rxjs';
import { DASHBOARD_REPORT_QUERY } from 'src/app/reports-graphql/dashboard-report.graphql';
import { StorageService } from 'src/app/services/storage.service';
import { getUserExpenseMutation } from 'src/app/store/entities/add-expenses/add-expenses.actions';
import { PesaObjectType } from 'src/app/store/entities/add-expenses/add-expenses.model';
import { selectUserExpenses } from 'src/app/store/entities/add-expenses/add-expenses.selectors';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  columnsHeader:any
  user_unique_id:string |any
  dashboardData:any
  tableData:Observable<PesaObjectType[]>|any;
  private querySubscritpion : Subscription|any
  constructor(
    private store:Store,
    private apollo: Apollo,
    private localStorage: StorageService,
  ){

  }
  ngOnInit() {
    // console.log(this.localStorage.getItem('profile').userUniqueId)
    this.user_unique_id = this.localStorage.getItem('profile').userUniqueId
    
    this.columnsHeader= ['QUESTION', 'TYPE', 'CREATED DATE', 'SCORE'];
  
    this.apollo.watchQuery<any>({
      query:DASHBOARD_REPORT_QUERY,
      fetchPolicy: 'network-only',
      variables: {
        filtering: {
          userUniqueId: this.user_unique_id
        }
      }
    })
    .valueChanges
    .subscribe((data) => {
      console.log(data)
      if(data){
          this.dashboardData=data.data.getAllDashboardReport.data
          console.log(this.dashboardData)
      }
    })
    // this.store.dispatch(getUserExpenseMutation({
    //   filtering:{
    //     spendsUniqueid:"",
    //   }
    // }))

    // this.tableData = this.store.pipe(select(selectUserExpenses))
  }


}
