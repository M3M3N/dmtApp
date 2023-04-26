import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [
  ]
})
export class EmpleadoComponent implements OnInit {

  public empleado?: Empleado;

  miFormulario: FormGroup = this.fb.group({
    numero     : [ , [ Validators.required ] ],
    nombre     : [ , [ Validators.required, Validators.minLength(10) ] ],
    fechaing   : [ , [ Validators.required ] ],
    rfc        : [],
    telefono   : [],
    puesto     : [],
    fec_baja   : [],
    departa    : [],
    imss       : [],
    cartilla   : [],
    empresa    : [],
    nomina     : [],
    curp       : [],
    avisar     : [],
    tel_fam    : [],
    tel_tbj    : [],
    correo     : [],
    observa    : [],
    operador   : [],
    direccion  : [],
    colonia    : [],
    codpos     : [],
    ciudad     : [],
    estado     : [],
    cr_norte   : [],
    cr_sur     : [],
    cr_este    : [],
    cr_oeste   : [],
    sexo       : [],
    nacioen    : [],
    fec_nacio  : [],
    civil      : [],
    estatura   : [],
    peso       : [],
    tipsangre  : [],
});

  constructor( private empleadoService: EmpleadosService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder ) {}


  ngOnInit(): void {
    this.activedRoute.params
    .pipe(
        switchMap( ({ numero }) => this.empleadoService.getEmpleadoById( numero ) ),
    ).subscribe( empleado => {
      if (!empleado) return this.router.navigate([ '/dmt/listado' ]);
      this.empleado = empleado;
      this.cargaDatosFormulario();
      return;
    })
  }

  cargaDatosFormulario(){    
    this.miFormulario.reset({
      numero    : this.empleado?.NUMERO,
      nombre    : this.empleado?.NOMBRE,
      fechaing  : this.empleado?.FECING,
      rfc       : this.empleado?.RFC,
      telefono  : this.empleado?.TELEFONO,
      fec_baja  : this.empleado?.FEC_BAJA,
      puesto    : this.empleado?.PUESTO,
      departa   : this.empleado?.DEPARTA,
      imss      : this.empleado?.IMSS,
      cartilla  : this.empleado?.CARTILLA,
      empresa   : this.empleado?.EMPRESA,
      nomina    : this.empleado?.NOMINA,
      curp      : this.empleado?.CURP,
      avisar    : this.empleado?.AVISAR,
      tel_fam   : this.empleado?.tel_fam,
      tel_tbj   : this.empleado?.tel_tbj,
      correo    : this.empleado?.correo,
      observa   : this.empleado?.observa,
      operador  : this.empleado?.operador,
      direccion : this.empleado?.DIRECCION,
      colonia   : this.empleado?.COLONIA,
      codpos    : this.empleado?.CODPOS,
      ciudad    : this.empleado?.CIUDAD,
      estado    : this.empleado?.ESTADO,
      cr_norte  : this.empleado?.CR_NORTE,
      cr_sur    : this.empleado?.CR_SUR,
      cr_este   : this.empleado?.CR_ESTE,
      cr_oeste  : this.empleado?.CR_OESTE,
      sexo      : this.empleado?.SEXO,
      nacioen   : this.empleado?.NACIOEN,
      fec_nacio : this.empleado?.FEC_NACIO,
      civil     : this.empleado?.CIVIL,
      estatura  : this.empleado?.ESTATURA,
      peso      : this.empleado?.PESO,
      tipsangre : this.empleado?.TIPSANGRE,
    })
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }


}
