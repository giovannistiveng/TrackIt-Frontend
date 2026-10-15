import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Envio } from '../models/envio.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {
  // Aquí usamos la URL que configuramos antes (http://localhost:3000/api)
  private apiUrl = `${environment.apiUrl}/envios`;

  constructor(private http: HttpClient) {}

  crearEnvio(envio: Envio): Observable<Envio> {
    return this.http.post<Envio>(this.apiUrl, envio);
  }

  asignarConductor(idEnvio: number, idConductor: number): Observable<{ message: string; envio: Envio }> {
    return this.http.patch<{ message: string; envio: Envio }>(`${this.apiUrl}/${idEnvio}/conductor`, { idConductor });
  }
}
