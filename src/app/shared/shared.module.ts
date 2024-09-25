import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TabelComponent } from './tabel/tabel.component';
import { MaterialModule } from '../material.module';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { ApexChartComponent } from './apex-chart/apex-chart.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TabelComponent,
    ApexChartComponent,
    LoaderComponent,
  ],
  exports: [
    NavbarComponent,
    MatTableModule,
    ApexChartComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MaterialModule,
  ]
})
export class SharedModule { }
