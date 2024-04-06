import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AddNewExpenseComponent } from './main/add-new-expense/add-new-expense.component';
import { SharedModule } from './shared/shared.module';

import {MatTableModule} from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
// import { HttpLink } from 'apollo-angular-link-http';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { EffectsModule } from '@ngrx/effects';
import { UserExpensesEffects } from './store/entities/add-expenses/add-expenses.effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store/reducers';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddNewExpenseComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ApolloModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    EffectsModule.forRoot([
      UserExpensesEffects,
   ]),
   StoreModule.forRoot(reducers, { metaReducers }),
    // MatTableModule,
  ],
  exports: [
    SharedModule,
    FormsModule,

  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // {
    //   provide: ApolloClient,
    //   useFactory: (httpLink: HttpLink) => {
    //     return new ApolloClient({
    //       link: httpLink.create({ uri: 'http://localhost:5000/api' }),
    //       cache: new InMemoryCache(),
    //     });
    //   },
    //   deps: [HttpLink],
    // },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo:Apollo,
    httpLink: HttpLink,
  ){
    apollo.create({
      link:httpLink.create({ uri: 'http://localhost:5000/api'}),
      cache: new InMemoryCache()
    });
  }
}
