import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TabelComponent } from './tabel/tabel.component';



@NgModule({
  declarations: [
    NavbarComponent,
    TabelComponent,
  ],
  exports: [
    NavbarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
