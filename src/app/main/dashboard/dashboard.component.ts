import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  tableData:Observable<PesaObjectType[]>|any;
  constructor(
    private store:Store
  ){

  }
  ngOnInit() {
    this.columnsHeader= ['QUESTION', 'TYPE', 'CREATED DATE', 'SCORE'];
  

    this.store.dispatch(getUserExpenseMutation({
      filtering:{
        spendsUniqueid:"",
      }
    }))

    // this.tableData = this.store.pipe(select(selectUserExpenses))
  }


}
