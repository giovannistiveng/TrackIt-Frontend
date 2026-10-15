import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <!-- Navbar Operativo -->
      <header class="bg-slate-900/80 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-blue-600/10 border border-blue-500/30 rounded-xl text-blue-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <h1 class="text-lg font-black text-white tracking-tight">
                TrackIt<span class="text-orange-500">.</span> Express
              </h1>
              <p class="text-[11px] text-slate-400 font-medium">Panel Operativo de Ruta</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Conductor Activo
            </span>

            <button 
              (click)="cerrarSesion()" 
              class="bg-slate-800 hover:bg-rose-600/80 text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-xl border border-slate-700/60 transition cursor-pointer">
              Salir
            </button>
          </div>
        </div>
      </header>

      <!-- Main Body -->
      <main class="max-w-3xl mx-auto px-6 py-10 space-y-6">
        
        <!-- BUSCADOR / ASIGNACIÓN -->
        <div class="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <div class="flex items-center gap-3 mb-6">
            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
            <h2 class="text-lg font-extrabold text-white">Tomar Envío por Código</h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div class="sm:col-span-8">
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ID de Orden</label>
              <input 
                type="number" 
                [(ngModel)]="idBusqueda" 
                placeholder="Ej. 101" 
                class="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-blue-500 transition">
            </div>

            <div class="sm:col-span-4 flex items-end">
              <button 
                (click)="tomarEnvio()" 
                [disabled]="!idBusqueda || cargando"
                class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50">
                {{ cargando ? 'Buscando...' : 'Tomar Envío' }}
              </button>
            </div>
          </div>

          <div *ngIf="mensaje" class="mt-4 p-3 rounded-xl text-xs font-semibold text-center" [ngClass]="{'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': exito, 'bg-rose-500/10 text-rose-400 border border-rose-500/20': !exito}">
            {{ mensaje }}
          </div>
        </div>

        <!-- DETALLE Y CONFIRMACIÓN DE ENTREGA POR PIN -->
        <div *ngIf="envioActivo" class="bg-slate-900 p-8 rounded-3xl border border-blue-500/30 shadow-2xl space-y-6">
          <div class="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <p class="text-[10px] font-bold uppercase text-slate-400">Orden en Servicio</p>
              <p class="text-2xl font-black text-white">#{{ envioActivo.idEnvio }}</p>
            </div>
            <span class="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase">
              {{ envioActivo.estado }}
            </span>
          </div>

          <!-- Puntos Origen/Destino -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div>
              <span class="text-[10px] text-slate-500 font-bold uppercase block mb-1">Punto de Recogida</span>
              <p class="text-xs font-semibold text-slate-200">📍 {{ envioActivo.origen }}</p>
            </div>

            <div>
              <span class="text-[10px] text-slate-500 font-bold uppercase block mb-1">Punto de Entrega</span>
              <p class="text-xs font-semibold text-slate-200">🏁 {{ envioActivo.destino }}</p>
            </div>
          </div>

          <!-- Validación del PIN -->
          <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 class="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Confirmación de Entrega
            </h3>
            <p class="text-[11px] text-slate-500">
              Solicita al cliente el PIN de seguridad de 4 dígitos para completar el pedido.
            </p>

            <div class="flex gap-3">
              <input 
                type="text" 
                [(ngModel)]="pinIngresado" 
                maxlength="4" 
                placeholder="PIN 4 dígitos" 
                class="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-center text-sm font-black tracking-widest text-orange-400 focus:outline-none focus:border-orange-500 transition">
              
              <button 
                (click)="verificarPin()" 
                class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition text-xs uppercase tracking-wider cursor-pointer">
                Verificar PIN
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
  cargando = false;
  mensaje = '';
  exito = false;
  envioActivo: any = null;
  pinIngresado = '';

  constructor(private router: Router) {}

  tomarEnvio() {
    if (!this.idBusqueda) return;

    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
      this.exito = true;
      this.mensaje = '¡Envío asignado exitosamente! Estado actualizado a En Ruta.';
      this.envioActivo = {
        idEnvio: this.idBusqueda,
        origen: 'Calle 10 # 5-20, Centro',
        destino: 'Barrio Balmoral',
        tipoCarga: 'Moto Express',
        tarifa: 15000,
        estado: 'En Ruta',
        pinSeguridad: '4623'
      };
    }, 600);
  }

  verificarPin() {
    if (!this.envioActivo || !this.pinIngresado) return;

    if (this.pinIngresado === this.envioActivo.pinSeguridad) {
      this.exito = true;
      this.mensaje = '¡PIN Correcto! La orden ha sido marcada como Entregada.';
      this.envioActivo.estado = 'Entregado';
    } else {
      this.exito = false;
      this.mensaje = 'PIN incorrecto. Por favor solicítalo de nuevo al cliente.';
    }
  }

  cerrarSesion() {
    localStorage.removeItem('trackit_token');
    this.router.navigate(['/auth']);
  }
}
