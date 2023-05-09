import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { DataTablesModule } from 'angular-datatables';
import { DmtRoutingModule } from './dmt-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgregarComponent } from './empleado/pages/agregar/agregar.component';
import { ListadoComponent } from './empleado/pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { DialogUploadComponent } from './components/dialog-upload/dialog-upload.component';
import { DialogYesNoComponent } from './components/dialog-yes-no/dialog-yes-no.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';



@NgModule({
  declarations: [
    AgregarComponent,
    ListadoComponent,
    HomeComponent,
    EmpleadoComponent,
    DocumentosComponent,
    DialogUploadComponent,
    DialogYesNoComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    DataTablesModule,
    DmtRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ]
})
export class DmtModule { }