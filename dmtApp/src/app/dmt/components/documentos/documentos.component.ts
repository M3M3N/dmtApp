import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadComponent } from '../dialog-upload/dialog-upload.component';
import { Empleado } from '../../interfaces/empleado.interface';
import { Subject, switchMap } from 'rxjs';
import { UploadFileService } from '../../services/upload-file.service';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { Archivo } from '../../interfaces/archivo.interface';
import { DialogYesNoComponent } from '../dialog-yes-no/dialog-yes-no.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styles: [
  ]
})
export class DocumentosComponent implements OnInit {

  empleado!: Empleado;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  documentos!: Archivo | any;

  constructor( public dialog: MatDialog,
               private empleadoService: EmpleadosService,
               private activedRoute: ActivatedRoute,
               private uploadService: UploadFileService ) {}

  ngOnInit(): void {    
    this.dtOptions = {
      pagingType: 'full_numbers'
    }; 

    this.activedRoute.params.pipe(
        switchMap( ({ numero }) => this.empleadoService.getEmpleadoById( numero ) ),
    ).subscribe( empleado => {
      if (!empleado) return console.log("ERROR");
      this.empleado = empleado;
      this.cargarDocumentos( empleado.NUMERO!);
    });

  }

  cargarDocumentos( numero: number ){
    this.uploadService.obtenerRecientes( numero )
    .subscribe( documentos => {
      if (!documentos) {
        this.dtTrigger.next( null );
      }else{
        this.documentos = documentos;
        this.dtTrigger.next(documentos);
      }
    } );
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogUploadComponent, { width: '600px' ,data: {numero: this.empleado.NUMERO?.toString().trim(), docto: this.documentos } });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.cargarDocumentos(this.empleado.NUMERO! );
      }
    });
  }


  borrarDocumento( index: number, id: number, numero: number, archivo: string ){

    this.dialog.open(DialogYesNoComponent, {
      data: `¿Desea Eliminar el Documento: ${ archivo } ?`
    }).afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.uploadService.borrarDocumento(id, numero, archivo)
        .subscribe(
          (datos: any) => {
             if (datos['resultado'] == 'OK'){
               alert(datos['mensaje']);
               this.documentos.splice(index,1);
             }
          }
        );
      }
    });
  }

}
