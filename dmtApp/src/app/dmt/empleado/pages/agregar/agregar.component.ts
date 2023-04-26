import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Empleado } from 'src/app/dmt/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/dmt/services/empleados.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  public empleado!: Empleado;

  constructor( private empleadoService: EmpleadosService,
    private activedRoute: ActivatedRoute,
    private router: Router ) {}

ngOnInit(): void {
    this.activedRoute.params
    .pipe(
        switchMap( ({ numero }) => this.empleadoService.getEmpleadoById( numero ) ),
    ).subscribe( empleado => {
      if (!empleado) return this.router.navigate([ '/dmt/listado' ]);
      this.empleado = empleado;
      return;
    })
  }


}
