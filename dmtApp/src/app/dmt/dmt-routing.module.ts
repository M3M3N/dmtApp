import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComponent } from './empleado/pages/listado/listado.component';
import { AgregarComponent } from './empleado/pages/agregar/agregar.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'listado', component: ListadoComponent },
      { path: 'agregar', component: AgregarComponent },
      { path: 'editar/:numero', component: AgregarComponent },
      { path: '**', redirectTo: 'listado' },
    ]
  }
];



@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DmtRoutingModule { }
