import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EnvioService } from '../../core/services/envio.service';
import { Envio } from '../../core/models/envio.model';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      <!-- Navbar / Encabezado -->
      <header class="bg-slate-800/80 border-b border-slate-700/60 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <span class="bg-orange-500 text-white p-2 rounded-xl text-xl">🚚</span>
            <div>
              <h1 class="text-xl font-black text-white tracking-tight">
                TrackIt<span class="text-orange-500">.</span> Express
              </h1>
              <p class="text-xs text-slate-400 font-medium">Panel del Cliente</p>
            </div>
          </div>

          <button 
            (click)="cerrarSesion()" 
            class="bg-slate-700/50 hover:bg-rose-600/80 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl border border-slate-600 transition cursor-pointer">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <!-- Contenido Principal -->
      <main class="max-w-7xl mx-auto px-6 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- FORMULARIO DE SOLICITUD -->
          <div class="lg:col-span-7 bg-slate-800/90 p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-3 h-3 rounded-full bg-orange-500"></span>
              <h2 class="text-2xl font-extrabold text-white">Solicitar Nuevo Envío</h2>
            </div>

            <form (ngSubmit)="solicitarEnvio()" class="space-y-6">
              
              <!-- Puntos A y B -->
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    📍 Dirección de Origen (Recogida)
                  </label>
                  <input 
                    type="text" 
                    [(ngModel)]="nuevoEnvio.origen" 
                    name="origen" 
                    required
                    placeholder="Ej. Calle 10 # 5-20, Fusagasugá"
                    class="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    🏁 Dirección de Destino (Entrega)
                  </label>
                  <input 
                    type="text" 
                    [(ngModel)]="nuevoEnvio.destino" 
                    name="destino" 
                    required
                    placeholder="Ej. Barrio Balmoral"
                    class="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition">
                </div>
              </div>

              <!-- Categoría de Vehículo -->
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  🛵 Categoría de Vehículo
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <button 
                    type="button" 
                    (click)="seleccionarCategoria('Moto Express', 15000)"
                    [ngClass]="{
                      'border-orange-500 bg-orange-500/10 text-orange-400': nuevoEnvio.tipoCarga === 'Moto Express',
                      'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600': nuevoEnvio.tipoCarga !== 'Moto Express'
                    }"
                    class="p-4 rounded-2xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                    <span class="text-2xl">🏍️</span>
                    <span class="font-bold text-sm">Moto Express</span>
                    <span class="text-xs font-semibold text-slate-400">$15.000</span>
                  </button>

                  <button 
                    type="button" 
                    (click)="seleccionarCategoria('Motocarro', 28000)"
                    [ngClass]="{
                      'border-orange-500 bg-orange-500/10 text-orange-400': nuevoEnvio.tipoCarga === 'Motocarro',
                      'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600': nuevoEnvio.tipoCarga !== 'Motocarro'
                    }"
                    class="p-4 rounded-2xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                    <span class="text-2xl">🛺</span>
                    <span class="font-bold text-sm">Motocarro</span>
                    <span class="text-xs font-semibold text-slate-400">$28.000</span>
                  </button>

                  <button 
                    type="button" 
                    (click)="seleccionarCategoria('Camioneta', 55000)"
                    [ngClass]="{
                      'border-orange-500 bg-orange-500/10 text-orange-400': nuevoEnvio.tipoCarga === 'Camioneta',
                      'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600': nuevoEnvio.tipoCarga !== 'Camioneta'
                    }"
                    class="p-4 rounded-2xl border flex flex-col items-center justify-center gap-1 transition text-center cursor-pointer">
                    <span class="text-2xl">🛻</span>
                    <span class="font-bold text-sm">Camioneta</span>
                    <span class="text-xs font-semibold text-slate-400">$55.000</span>
                  </button>

                </div>
              </div>

              <button 
                type="submit" 
                [disabled]="cargando"
                class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition duration-200 text-sm tracking-wide cursor-pointer disabled:opacity-50">
                {{ cargando ? 'Procesando Envío...' : 'Confirmar y Generar Envío 🚀' }}
              </button>

            </form>

            <div *ngIf="mensajeError" class="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl text-center font-semibold">
              {{ mensajeError }}
            </div>
          </div>

          <!-- DETALLE Y TICKET CON PIN -->
          <div class="lg:col-span-5">
            
            <div *ngIf="ultimoEnvio" class="bg-slate-800/90 p-8 rounded-3xl border-2 border-orange-500/30 shadow-2xl relative overflow-hidden space-y-6">
              
              <div class="flex justify-between items-center border-b border-slate-700 pb-4">
                <div>
                  <p class="text-xs font-bold uppercase text-slate-400">Orden Generada</p>
                  <p class="text-2xl font-black text-white">#{{ ultimoEnvio.idEnvio }}</p>
                </div>
                <span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {{ ultimoEnvio.estado || 'Pendiente' }}
                </span>
              </div>

              <div class="space-y-3 text-sm">
                <div>
                  <span class="text-xs text-slate-400 block font-bold uppercase">Origen</span>
                  <p class="font-medium text-slate-200">📍 {{ ultimoEnvio.origen }}</p>
                </div>

                <div>
                  <span class="text-xs text-slate-400 block font-bold uppercase">Destino</span>
                  <p class="font-medium text-slate-200">🏁 {{ ultimoEnvio.destino }}</p>
                </div>

                <div class="flex justify-between items-center pt-2">
                  <span class="text-xs text-slate-400 font-bold uppercase">Categoría: <strong>{{ ultimoEnvio.tipoCarga }}</strong></span>
                  <span class="text-xl font-black text-orange-400">\${{ ultimoEnvio.tarifa | number }}</span>
                </div>
              </div>

              <!-- PIN DE SEGURIDAD -->
              <div class="bg-slate-950 p-6 rounded-2xl text-center border border-slate-800">
                <span class="text-xs uppercase text-slate-400 font-bold tracking-widest block mb-1">
                  PIN de Seguridad
                </span>
                <span class="text-4xl font-black text-orange-500 tracking-widest">
                  {{ ultimoEnvio.pinSeguridad }}
                </span>
                <p class="text-[11px] text-slate-500 mt-2">
                  Proporciona este PIN de 4 dígitos al conductor al momento de recibir tu encomienda.
                </p>
              </div>

            </div>

            <!-- Estado Inicial -->
            <div *ngIf="!ultimoEnvio" class="bg-slate-800/40 border-2 border-dashed border-slate-700 p-12 rounded-3xl text-center text-slate-500 h-full flex flex-col justify-center items-center">
              <span class="text-5xl mb-3">📦</span>
              <p class="text-sm font-semibold">Completa los campos del formulario para solicitar tu servicio.</p>
            </div>

          </div>

        </div>
      </main>

    </div>
  `
})
export class ClienteComponent {
  cargando = false;
  mensajeError = '';
  ultimoEnvio: Envio | null = null;

  nuevoEnvio: Envio = {
    idCliente: 1, // Por defecto asignado al idCliente actual
    origen: '',
    destino: '',
    tipoCarga: 'Moto Express',
    tarifa: 15000
  };

  constructor(private envioService: EnvioService, private router: Router) {}

  seleccionarCategoria(categoria: string, tarifaBase: number) {
    this.nuevoEnvio.tipoCarga = categoria;
    this.nuevoEnvio.tarifa = tarifaBase;
  }

  solicitarEnvio() {
    if (!this.nuevoEnvio.origen || !this.nuevoEnvio.destino) {
      this.mensajeError = 'Por favor ingresa la dirección de origen y destino.';
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    this.envioService.crearEnvio(this.nuevoEnvio).subscribe({
      next: (res: Envio) => {
        this.cargando = false;
        this.ultimoEnvio = res;
      },
      error: (err) => {
        this.cargando = false;
        this.mensajeError = err.error?.error || 'Error al conectar con el servidor backend.';
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('trackit_token');
    this.router.navigate(['/auth']);
  }
}
