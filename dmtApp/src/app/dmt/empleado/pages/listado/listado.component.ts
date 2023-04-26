import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Empleado } from 'src/app/dmt/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/dmt/services/empleados.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  empleados: Empleado[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor( private empleadoService: EmpleadosService ) {}

  ngOnInit(): void {    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    
    this.empleadoService.getEmpleados()
    .subscribe( empleados => {
      this.empleados = empleados;
      this.dtTrigger.next(empleados);
    } );
  }


  editar(numero: number){
    console.log(numero);
  }

}
