import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent {
  // Estadísticas generales de la operación
  estadisticas = {
    totalConductores: 15,
    enRuta: 8,
    disponibles: 7,
    entregasHoy: 24
  };

  // Monitoreo global de la flota
  flotaActiva = [
    { conductor: 'Carlos Pérez', vehiculo: 'Kenworth T800', estado: 'En ruta', destino: 'Bogotá - Terminal Sur' },
    { conductor: 'María Rodríguez', vehiculo: 'Chevrolet D-Max', estado: 'Disponible', destino: 'N/A' },
    { conductor: 'Luis Gómez', vehiculo: 'Foton Aumark', estado: 'En ruta', destino: 'Medellín - Zona Industrial' }
  ];
}
