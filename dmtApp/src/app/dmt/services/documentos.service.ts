import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
