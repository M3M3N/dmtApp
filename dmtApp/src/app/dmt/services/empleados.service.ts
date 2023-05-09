import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado.interface';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private baseUrl: string = "http://localhost/dmt";

  constructor( private http: HttpClient ) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.baseUrl}/ObtenerEmpleados.php`);
  }


 getEmpleadoById( numero: number ): Observable<Empleado|undefined> {
    return this.http.get<Empleado>(`${this.baseUrl}/BuscarEmpleado.php?numero=${numero}`)
      .pipe(
        catchError( error => of(undefined) )
      );
 }

 agregarEmpleado( empleado: Empleado){
    return this.http.post(`${this.baseUrl}/AgregarEmpleado.php`, JSON.stringify(empleado));
 }

 actualizarEmpleado(empleado: Empleado){
    return this.http.post(`${this.baseUrl}/ActualizarEmpleado.php?numero=${empleado.NUMERO}`, JSON.stringify(empleado));
 }

}
