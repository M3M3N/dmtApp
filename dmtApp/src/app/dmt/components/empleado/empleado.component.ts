import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../interfaces/empleado.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { __values } from 'tslib';
import * as moment from 'moment';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styles: [
  ]
})
export class EmpleadoComponent implements OnInit {

  public empleado!: Empleado;
  public EmpNvo = true;

  miFormulario: FormGroup = this.fb.group({
    NUMERO: [, [Validators.required]],
    NOMBRE: [, [Validators.required, Validators.minLength(10)]],
    FECING: [, [Validators.required]],
    RFC: [],
    TELEFONO: [],
    FEC_BAJA: [],
    PUESTO: [],
    DEPARTA: [],
    IMSS: [],
    CARTILLA: [],
    EMPRESA: [],
    NOMINA: [],
    CURP: [],
    AVISAR: [],
    tel_fam: [],
    tel_tbj: [],
    correo: [],
    observa: [],
    operador: [],
    DIRECCION: [],
    COLONIA: [],
    CODPOS: [],
    CIUDAD: [],
    ESTADO: [],
    CR_NORTE: [],
    CR_SUR: [],
    CR_ESTE: [],
    CR_OESTE: [],
    SEXO: [],
    CIVIL: [],
    NACIOEN: [],
    FEC_NACIO: [],
    ESTATURA: [],
    PESO: [],
    TIPSANGRE: [],
    LICENCIA: [],
    LI_INICIO: [],
    LI_VENCE: [],
    PASAPORTE: [],
    PA_VENCE: [],
    ADUANA: [],
    AD_VENCE: [],
  });

  constructor(private empleadoService: EmpleadosService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }


  ngOnInit(): void {

    this.miFormulario.reset({
      NUMERO: 0
    });

    if (!this.router.url.includes('editar')) return;

    this.EmpNvo = false;

    this.activedRoute.params
      .pipe(
        switchMap(({ numero }) => this.empleadoService.getEmpleadoById(numero)),
      ).subscribe(empleado => {
        if (!empleado) return this.router.navigate(['/dmt/listado']);
        this.empleado = empleado;
        this.cargaDatosFormulario();
        return;
      })
  }

  //Fecha MM-DD-AAAA


  cargaDatosFormulario() {
    this.miFormulario.reset({
      NUMERO: this.empleado?.NUMERO,
      NOMBRE: this.empleado?.NOMBRE,
      FECING: moment(this.empleado?.FECING).format(),
      RFC: this.empleado?.RFC,
      TELEFONO: this.empleado?.TELEFONO,
      FEC_BAJA: (this.empleado?.FEC_BAJA?.toString() == '0000-00-00')? null : moment(this.empleado?.FEC_BAJA).format(),
      PUESTO: this.empleado?.PUESTO,
      DEPARTA: this.empleado?.DEPARTA,
      IMSS: this.empleado?.IMSS,
      CARTILLA: this.empleado?.CARTILLA,
      EMPRESA: this.empleado?.EMPRESA,
      NOMINA: this.empleado?.NOMINA,
      CURP: this.empleado?.CURP,
      AVISAR: this.empleado?.AVISAR,
      tel_fam: this.empleado?.tel_fam,
      tel_tbj: this.empleado?.tel_tbj,
      correo: this.empleado?.correo,
      observa: this.empleado?.observa,
      operador: this.empleado?.operador,
      DIRECCION: this.empleado?.DIRECCION,
      COLONIA: this.empleado?.COLONIA,
      CODPOS: this.empleado?.CODPOS,
      CIUDAD: this.empleado?.CIUDAD,
      ESTADO: this.empleado?.ESTADO,
      CR_NORTE: this.empleado?.CR_NORTE,
      CR_SUR: this.empleado?.CR_SUR,
      CR_ESTE: this.empleado?.CR_ESTE,
      CR_OESTE: this.empleado?.CR_OESTE,
      SEXO: this.empleado?.SEXO,
      CIVIL: this.empleado?.CIVIL,
      NACIOEN: this.empleado?.NACIOEN,
      FEC_NACIO: moment(this.empleado?.FEC_NACIO).format(),//this.empleado?.FEC_NACIO,
      ESTATURA: this.empleado?.ESTATURA,
      PESO: this.empleado?.PESO,
      TIPSANGRE: this.empleado?.TIPSANGRE,
      LICENCIA: this.empleado?.LICENCIA,
      LI_INICIO: moment(this.empleado?.LI_INICIO).format(),//this.empleado?.LI_INICIO,
      LI_VENCE: moment(this.empleado?.LI_VENCE).format(),//this.empleado?.LI_VENCE,
      PASAPORTE: this.empleado?.PASAPORTE,
      PA_VENCE: moment(this.empleado?.PA_VENCE).format(),//this.empleado?.PA_VENCE,
      ADUANA: this.empleado?.ADUANA,
      AD_VENCE: moment(this.empleado?.AD_VENCE).format(),//this.empleado?.AD_VENCE,
    })
  }

  guardar() {

    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    if ( this.EmpNvo ){
      //Agregar
      this.empleado = this.miFormulario.value;
      //this.empleado.FECING = this.miFormulario.controls['FECING'].value.toISOString().slice(0, 10);

      this.empleadoService.agregarEmpleado( this.miFormulario.value )
        .subscribe( empleado => {
          alert('Empleado Creado');
          console.log(empleado);
          this.router.navigate(['/dmt/listado']);
        } );
    }else{
      //Actualizar
      this.empleadoService.actualizarEmpleado( this.miFormulario.value )
      .subscribe( empleado => {
        //this.router.navigate(['/heroes/editar', heroe.id ]);
        alert('Empleado Actualizado');
      });
    }

  }


}
