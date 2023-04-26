import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Observable } from 'rxjs';
import { Archivo } from '../interfaces/archivo.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl: string = "http://localhost/dmt";

  constructor( private http: HttpClient ) { }

  uploadFile( archivo: any ) {
    return this.http.post(`${this.baseUrl}/SubirArchivo.php`, JSON.stringify(archivo));
  }

  obtenerRecientes( numero: number ): Observable<Archivo> {
    return this.http.get<Archivo>(`${this.baseUrl}/ObtenerArchivos.php?numero=${numero}`)
    .pipe(
      catchError( error => of(error) )
    );
  }

  borrarDocumento( id: number, numero: number, archivo: string ){
    return this.http.get(`${this.baseUrl}/BorrarArchivo.php?id=${id}&numero=${numero}&archivo=${archivo}`);
  }


}
