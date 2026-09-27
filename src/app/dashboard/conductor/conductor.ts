import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conductor.html',
  styleUrls: ['./conductor.css']
})
export class ConductorComponent {
  // Datos del conductor y su vehículo asignado
  conductorInfo = {
    nombre: 'Carlos Pérez',
    vehiculo: 'Kenworth T800',
    placa: 'SXT-452',
    estadoActual: 'En ruta',
    destino: 'Bogotá D.C. - Centro Logístico',
    carga: 'Telemetría IoT / GPS Nodes'
  };

  cambiarEstado(nuevoEstado: string) {
    this.conductorInfo.estadoActual = nuevoEstado;
  }
}
