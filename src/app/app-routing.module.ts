import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddNewExpenseComponent } from './main/add-new-expense/add-new-expense.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent,
  },
  {
    path:"register",
    component: RegisterComponent,
  },
  {
    path:"add-expenses",
    component: AddNewExpenseComponent,
    canActivate:[ AuthGuard ],
  },
  {
    path:"dashboard",
    component: DashboardComponent,
  },
  {
    path:'404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
