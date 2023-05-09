import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Documento } from '../interfaces/documento.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  private baseUrl: string = "http://localhost/dmt";

  constructor( private http: HttpClient ) { }

  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.baseUrl}/ObtenerDocumentos.php`);
  }

  ObtenerPDF( archivo: string ){
    return this.http.get(`${this.baseUrl}/ObtenerPDF.php?file_path=${archivo}`, { responseType: 'arraybuffer' });
  }

}
