import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css']
})
export class ClienteComponent {
  // Datos simulados para visualizar conductores y vehículos
  conductores = [
    { nombre: 'Carlos Pérez', telefono: '+57 310 456 7890', vehiculo: 'Camión Kenworth T800', placa: 'SXT-452', estado: 'En ruta' },
    { nombre: 'María Rodríguez', telefono: '+57 320 987 6543', vehiculo: 'Chevrolet D-Max 2.5L', placa: 'JVM-881', estado: 'Disponible' }
  ];
}
