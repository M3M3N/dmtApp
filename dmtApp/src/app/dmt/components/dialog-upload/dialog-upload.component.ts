import { Component, Inject, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentosService } from '../../services/documentos.service';
import { Documento } from '../../interfaces/documento.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styles: [
  ]
})
export class DialogUploadComponent implements OnInit {

  public archivo = {
    nombre: null,
    nombreArchivo: null,
    documento: false,
    base64textString: "",
    empleado: "",
    tipo: "",
    usuario: "ADMIN",
  };

  documento!: Documento[];

  mdCerrar: boolean = false;

  constructor( private uploadService: UploadFileService,
               private documentoService: DocumentosService,
               @Inject(MAT_DIALOG_DATA) public _empleadoID: any ) {}


  ngOnInit(): void {
    this.documentoService.getDocumentos()
    .subscribe( documento => {
      this.documento = documento;
    } );
  }

  seleccionarArchivo(event: any) {
    var files = event.target.files;
    var file = files[0];
    if ( file.type != "application/pdf" ){
      alert("Solo se pueden Archivos PDF");
      return;
    }

    this.archivo.nombreArchivo = file.name;

    if (files && file){
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded( readerEvent: any ) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
    this.archivo.documento = true;
  }

  upload(){
    if (!this.archivo.documento){
      alert("NO TIENE DOCUMENTO CARGADO");
      return;
    }

    this.archivo.empleado = this._empleadoID.numero;
    this.uploadService.uploadFile(this.archivo).subscribe(
      (datos: any) => {
         if (datos['resultado'] == 'OK'){
           alert(datos['mensaje']);
           this.mdCerrar = true;
           this._empleadoID.docto.push({
            id      : 0,
            archivo : datos['archivo'],
            tipo    : this.archivo.tipo,
            numero  : this.archivo.empleado,
           })
         }
      }
    );
  } 

  cargaTipo( event: any){
    this.archivo.tipo = event.source.value;
  }

}
