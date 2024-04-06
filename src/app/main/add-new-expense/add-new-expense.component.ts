import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { addUserExpenses } from 'src/app/store/entities/add-expenses/add-expenses.actions'

@Component({
  selector: 'app-add-new-expense',
  templateUrl: './add-new-expense.component.html',
  styleUrls: ['./add-new-expense.component.scss']
})
export class AddNewExpenseComponent implements OnInit {

  addExpense: FormGroup |any;
  amount=0;
  service="";
  reason="";
  userUniqueId="";
  userProfile:any


  constructor(
    private authService:AuthService,
    private formBuilder: FormBuilder,
    private localStorage:StorageService,
    private store:Store,
    private toastr: ToastrService,
  ){
      this.addExpense= this.formBuilder.group({
        amountSpend:[null, Validators.required],
        serviceOrStaffSpend:[null,Validators.required],
        reasonOfSpend:[null,Validators.required]
      })
  }
  ngOnInit() {
    this.userProfile = this.localStorage.getItem("profile")
    console.log(this.userProfile.userUniqueId)
    this.userUniqueId = this.userProfile.userUniqueId
  }

  addNewExpenses(){
    console.log(this.addExpense.value)
    console.log(this.userUniqueId)
    const newFormData = {
      ...this.addExpense.value,
      userUniqueId: this.userUniqueId
    }
    console.log(newFormData)
    this.store.dispatch(addUserExpenses({
      input:newFormData
    }))
  }

}
