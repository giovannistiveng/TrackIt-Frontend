import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EnvioService } from '../../core/services/envio.service';
import { Envio } from '../../core/models/envio.model';

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      <!-- Encabezado / Navbar -->
      <header class="bg-slate-800/80 border-b border-slate-700/60 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <span class="bg-blue-600 text-white p-2 rounded-xl text-xl">🛻</span>
            <div>
              <h1 class="text-xl font-black text-white tracking-tight">
                TrackIt<span class="text-orange-500">.</span> Express
              </h1>
              <p class="text-xs text-slate-400 font-medium">Panel Operativo del Conductor</p>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <span class="hidden sm:inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Conductor Activo (#1)
            </span>

            <button 
              (click)="cerrarSesion()" 
              class="bg-slate-700/50 hover:bg-rose-600/80 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl border border-slate-600 transition cursor-pointer">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <!-- Contenido Principal -->
      <main class="max-w-5xl mx-auto px-6 py-10 space-y-8">
        
        <!-- BUSCADOR / ASIGNACIÓN RÁPIDA DE ENVÍO -->
        <div class="bg-slate-800/90 p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
            <h2 class="text-2xl font-extrabold text-white">Tomar Envío por Código</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div class="sm:col-span-8">
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Número de Envío (ID)
              </label>
              <input 
                type="number" 
                [(ngModel)]="idBusqueda" 
                placeholder="Ej. 1" 
                class="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
            </div>

            <div class="sm:col-span-4 flex items-end">
              <button 
                (click)="tomarEnvio()" 
                [disabled]="!idBusqueda || cargando"
                class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 text-sm tracking-wide cursor-pointer disabled:opacity-50">
                {{ cargando ? 'Asignando...' : 'Tomar Envío 🚀' }}
              </button>
            </div>
          </div>

          <!-- Mensaje de Feedback -->
          <div *ngIf="mensaje" class="mt-4 p-3 rounded-xl text-xs font-semibold text-center" [ngClass]="{'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30': exito, 'bg-rose-500/10 text-rose-400 border border-rose-500/30': !exito}">
            {{ mensaje }}
          </div>
        </div>

        <!-- DETALLE DEL ENVÍO EN RUTA -->
        <div *ngIf="envioActivo" class="bg-slate-800/90 p-8 rounded-3xl border-2 border-blue-500/40 shadow-2xl space-y-6">
          <div class="flex justify-between items-center border-b border-slate-700 pb-4">
            <div>
              <p class="text-xs font-bold uppercase text-slate-400">Orden en Custodia</p>
              <p class="text-3xl font-black text-white">#{{ envioActivo.idEnvio }}</p>
            </div>
            <span class="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              {{ envioActivo.estado }}
            </span>
          </div>

          <!-- Información de Ruta -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
            <div>
              <span class="text-xs text-slate-400 font-bold uppercase block mb-1">Punto de Recogida</span>
              <p class="text-base font-semibold text-slate-200">📍 {{ envioActivo.origen }}</p>
            </div>

            <div>
              <span class="text-xs text-slate-400 font-bold uppercase block mb-1">Punto de Entrega</span>
              <p class="text-base font-semibold text-slate-200">🏁 {{ envioActivo.destino }}</p>
            </div>
          </div>

          <!-- Detalles de Carga y Tarifa -->
          <div class="flex flex-wrap justify-between items-center bg-slate-900 p-5 rounded-2xl border border-slate-700/60">
            <div>
              <span class="text-xs text-slate-400 font-bold uppercase block">Categoría de Vehículo</span>
              <p class="text-sm font-bold text-orange-400">{{ envioActivo.tipoCarga }}</p>
            </div>

            <div class="text-right">
              <span class="text-xs text-slate-400 font-bold uppercase block">Tarifa Ganancia</span>
              <p class="text-2xl font-black text-emerald-400">\${{ envioActivo.tarifa | number }}</p>
            </div>
          </div>

          <!-- Validación del PIN al entregar -->
          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider">
              🔒 Confirmación de Entrega
            </h3>
            <p class="text-xs text-slate-400">
              Solicita al cliente el PIN de seguridad de 4 dígitos proporcionado en su plataforma para completar la orden.
            </p>

            <div class="flex gap-3">
              <input 
                type="text" 
                [(ngModel)]="pinIngresado" 
                maxlength="4" 
                placeholder="PIN 4 dígitos" 
                class="px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-center text-lg font-black tracking-widest text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
              
              <button 
                (click)="verificarPin()" 
                class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition text-xs uppercase tracking-wider cursor-pointer">
                Verificar Entrega
              </button>
            </div>
          </div>

        </div>

      </main>

    </div>
  `
})
export class ConductorComponent {
  idBusqueda: number | null = null;
  idConductorLogueado = 1; // ID simulado para el conductor activo
  cargando = false;
  mensaje = '';
  exito = false;
  envioActivo: Envio | null = null;
  pinIngresado = '';

  constructor(private envioService: EnvioService, private router: Router) {}

  tomarEnvio() {
    if (!this.idBusqueda) {
      this.exito = false;
      this.mensaje = 'Ingresa el número de envío que deseas tomar.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    // Asigna el idConductor usando la llamada PATCH /api/envios/:id/conductor
    this.envioService.asignarConductor(this.idBusqueda, this.idConductorLogueado).subscribe({
      next: (res: any) => {
        this.cargando = false;
        this.exito = true;
        this.mensaje = res.message || '¡Envío asignado exitosamente! El estado ha cambiado a En Ruta.';
        this.envioActivo = res.envio || res;
      },
      error: (err) => {
        this.cargando = false;
        this.exito = false;
        this.mensaje = err.error?.error || 'No se encontró el envío especificado o ya fue asignado.';
      }
    });
  }

  verificarPin() {
    if (!this.envioActivo || !this.pinIngresado) return;

    if (this.pinIngresado === this.envioActivo.pinSeguridad) {
      this.exito = true;
      this.mensaje = '¡PIN Correcto! La entrega ha sido confirmada con éxito.';
      this.envioActivo.estado = 'Entregado';
    } else {
      this.exito = false;
      this.mensaje = 'El PIN ingresado es incorrecto. Verifícalo con el cliente.';
    }
  }

  cerrarSesion() {
    localStorage.removeItem('trackit_token');
    this.router.navigate(['/auth']);
  }
}
