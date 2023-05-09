import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadComponent } from '../dialog-upload/dialog-upload.component';
import { Empleado } from '../../interfaces/empleado.interface';
import { Subject, switchMap } from 'rxjs';
import { UploadFileService } from '../../services/upload-file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../services/empleados.service';
import { Archivo } from '../../interfaces/archivo.interface';
import { DialogYesNoComponent } from '../dialog-yes-no/dialog-yes-no.component';
import { DocumentosService } from '../../services/documentos.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styles: [
  ]
})
export class DocumentosComponent implements OnInit {

  public EmpNvo = true;

  empleado!: Empleado;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTriggerH: Subject<any> = new Subject<any>();

  documentos!: Archivo[] | any;
  documentosHist!: Archivo | any;

  constructor(public dialog: MatDialog,
    private empleadoService: EmpleadosService,
    private activedRoute: ActivatedRoute,
    private uploadService: UploadFileService,
    private documentoService: DocumentosService,
    private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    if (!this.router.url.includes('editar')) return;

    this.EmpNvo = false;

    this.activedRoute.params.pipe(
      switchMap(({ numero }) => this.empleadoService.getEmpleadoById(numero)),
    ).subscribe(empleado => {
      if (!empleado) return console.log("ERROR DOCUMENTO");
      this.empleado = empleado;
      this.cargarDocumentos(empleado.NUMERO!);
      this.cargarHistorial(empleado.NUMERO!);
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  cargarDocumentos(numero: number) {
    this.uploadService.obtenerRecientes('E', numero)
      .subscribe(documentos => {
        if (!documentos) {
          this.dtTrigger.next(null);
        } else {
          this.documentos = documentos;
          this.dtTrigger.next(documentos);
        }
      });
  }

  cargarHistorial(numero: number) {
    this.uploadService.obtenerRecientes('T', numero)
      .subscribe(documentos => {
        if (!documentos) {
          this.dtTriggerH.next(null);
        } else {
          this.documentosHist = documentos;
          this.dtTriggerH.next(documentos);
        }
      });
  }


  openDialog() {
    if (!this.EmpNvo) {
      const dialogRef = this.dialog.open(DialogUploadComponent, { width: '600px', data: { numero: this.empleado.NUMERO?.toString().trim(), docto: this.documentos } });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.cargarDocumentos(this.empleado.NUMERO!);
        }
      });
    }else{
      alert("Debe de crear el Empleado para agregar Documentos.");
    }
  }


  borrarDocumento(tipo: string, index: number, id: number, numero: number, archivo: string) {

    this.dialog.open(DialogYesNoComponent, {
      data: `¿Desea Eliminar el Documento: ${archivo} ?`
    }).afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.uploadService.borrarDocumento(id, numero, archivo)
            .subscribe(
              (datos: any) => {
                if (datos['resultado'] == 'OK') {
                  alert(datos['mensaje']);
                  (tipo == "NUEVO") ? this.documentos.splice(index, 1) : this.documentosHist.splice(index, 1);
                  //this.ngOnDestroy();
                  //this.ngOnInit();
                }
              }
            );
        }
      });
  }

  cargarPDF(numero: number, archivo: string) {
    var archivoPdf = numero + '/' + archivo;

    this.documentoService.ObtenerPDF(archivoPdf)
      .subscribe(
        response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        },
        error => {
          console.error(error);
        }
      );

  }


}
