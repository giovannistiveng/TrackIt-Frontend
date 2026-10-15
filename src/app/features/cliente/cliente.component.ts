import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <!-- Navbar Moderno -->
      <header class="bg-slate-900/80 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-orange-500/10 border border-orange-500/30 rounded-xl text-orange-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h1 class="text-lg font-black text-white tracking-tight">
                TrackIt<span class="text-orange-500">.</span> Express
              </h1>
              <p class="text-[11px] text-slate-400 font-medium">Portal de Solicitudes - Cliente</p>
            </div>
          </div>

          <button 
            (click)="cerrarSesion()" 
            class="bg-slate-800/80 hover:bg-rose-600/80 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl border border-slate-700/60 transition cursor-pointer">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <!-- Dashboard Body -->
      <main class="max-w-7xl mx-auto px-6 py-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- FORMULARIO DE SOLICITUD -->
          <div class="lg:col-span-7 bg-slate-900/70 p-8 rounded-3xl border border-slate-800/80 shadow-2xl">
            <div class="flex items-center gap-3 mb-6">
              <span class="w-3 h-3 rounded-full bg-orange-500"></span>
              <h2 class="text-xl font-extrabold text-white">Solicitar Envío Acarreo</h2>
            </div>

            <form (ngSubmit)="solicitarEnvio()" class="space-y-6">
              
              <!-- Puntos A y B -->
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Dirección de Origen (Recogida)
                  </label>
                  <input 
                    type="text" 
                    [(ngModel)]="nuevoEnvio.origen" 
                    name="origen" 
                    required
                    placeholder="Ej. Calle 10 # 5-20, Centro"
                    class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-orange-500 transition">
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Dirección de Destino (Entrega)
                  </label>
                  <input 
                    type="text" 
                    [(ngModel)]="nuevoEnvio.destino" 
                    name="destino" 
                    required
                    placeholder="Ej. Barrio Balmoral"
                    class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-medium text-white focus:outline-none focus:border-orange-500 transition">
                </div>
              </div>

              <!-- Selector de Vehículo con Tarifas -->
              <div>
                <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Categoría de Vehículo
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <button 
                    type="button" 
                    (click)="seleccionarCategoria('Moto Express', 15000)"
                    [ngClass]="{
                      'border-orange-500 bg-orange-500/10 text-orange-400 font-bold': nuevoEnvio.tipoCarga === 'Moto Express',
                      'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700': nuevoEnvio.tipoCarga !== 'Moto Express'
                    }"
                    class="p-4 rounded-2xl border flex flex-col items-start justify-between gap-3 transition text-left cursor-pointer">
                    <div class="p-2 rounded-lg bg-slate-800/80 text-orange-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <div>
                      <span class="block text-xs">Moto Express</span>
                      <span class="text-sm font-black text-white">$15.000</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    (click)="seleccionarCategoria('Motocarro', 28000)"
                    [ngClass]="{
                      'border-orange-500 bg-orange-500/10 text-orange-400 font-bold': nuevoEnvio.tipoCarga === 'Motocarro',
                      'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700': nuevoEnvio.tipoCarga !== 'Motocarro'
                    }"
                    class="p-4 rounded-2xl border flex flex-col items-start justify-between gap-3 transition text-left cursor-pointer">
                    <div class="p-2 rounded-lg bg-slate-800/80 text-orange-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                    </div>
                    <div>
                      <span class="block text-xs">Motocarro</span>
                      <span class="text-sm font-black text-white">$28.000</span>
                    </div>
                  </button>

                  <button 
                    type="button" 
                    (click)="seleccionarCategoria('Camioneta', 55000)"
                    [ngClass]="{
                      'border-orange-500 bg-orange-500/10 text-orange-400 font-bold': nuevoEnvio.tipoCarga === 'Camioneta',
                      'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700': nuevoEnvio.tipoCarga !== 'Camioneta'
                    }"
                    class="p-4 rounded-2xl border flex flex-col items-start justify-between gap-3 transition text-left cursor-pointer">
                    <div class="p-2 rounded-lg bg-slate-800/80 text-orange-400">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 8h6a2 2 0 012 2v5l-3-3h-5V8z"/></svg>
                    </div>
                    <div>
                      <span class="block text-xs">Camioneta</span>
                      <span class="text-sm font-black text-white">$55.000</span>
                    </div>
                  </button>

                </div>
              </div>

              <button 
                type="submit" 
                [disabled]="cargando"
                class="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition duration-200 text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50">
                {{ cargando ? 'Generando Orden...' : 'Confirmar y Solicitar Envío' }}
              </button>

            </form>
          </div>

          <!-- TICKET DE RESPUESTA EN VIVO -->
          <div class="lg:col-span-5">
            <div *ngIf="ultimoEnvio" class="bg-slate-900 p-8 rounded-3xl border border-orange-500/30 shadow-2xl relative overflow-hidden space-y-6">
              
              <div class="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <p class="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Orden Creada</p>
                  <p class="text-2xl font-black text-white">#{{ ultimoEnvio.idEnvio }}</p>
                </div>
                <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {{ ultimoEnvio.estado || 'Pendiente' }}
                </span>
              </div>

              <div class="space-y-3 text-xs">
                <div>
                  <span class="text-slate-500 uppercase font-bold block mb-0.5">Origen</span>
                  <p class="font-medium text-slate-200">{{ ultimoEnvio.origen }}</p>
                </div>

                <div>
                  <span class="text-slate-500 uppercase font-bold block mb-0.5">Destino</span>
                  <p class="font-medium text-slate-200">{{ ultimoEnvio.destino }}</p>
                </div>

                <div class="flex justify-between items-center pt-2">
                  <span class="text-slate-400">Categoría: <strong class="text-white">{{ ultimoEnvio.tipoCarga }}</strong></span>
                  <span class="text-xl font-black text-orange-400">\${{ ultimoEnvio.tarifa | number }}</span>
                </div>
              </div>

              <!-- PIN DE SEGURIDAD DESTACADO -->
              <div class="bg-slate-950 p-6 rounded-2xl text-center border border-slate-800/80">
                <span class="text-[10px] uppercase text-slate-400 font-bold tracking-widest block mb-1">
                  PIN de Seguridad Requerido
                </span>
                <span class="text-4xl font-black text-orange-500 tracking-widest">
                  {{ ultimoEnvio.pinSeguridad }}
                </span>
                <p class="text-[10px] text-slate-500 mt-2">
                  Brinda este PIN de 4 dígitos al conductor para validar la entrega de tu encomienda.
                </p>
              </div>

            </div>

            <div *ngIf="!ultimoEnvio" class="bg-slate-900/40 border-2 border-dashed border-slate-800 p-12 rounded-3xl text-center text-slate-600 h-full flex flex-col justify-center items-center">
              <svg class="w-12 h-12 text-slate-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              <p class="text-xs font-semibold">Completa el formulario para generar tu orden de envío.</p>
            </div>
          </div>

        </div>
      </main>

    </div>
  `
})
export class ClienteComponent {
  cargando = false;
  ultimoEnvio: any = null;

  nuevoEnvio = {
    idCliente: 1,
    origen: '',
    destino: '',
    tipoCarga: 'Moto Express',
    tarifa: 15000
  };

  constructor(private router: Router) {}

  seleccionarCategoria(categoria: string, tarifaBase: number) {
    this.nuevoEnvio.tipoCarga = categoria;
    this.nuevoEnvio.tarifa = tarifaBase;
  }

  solicitarEnvio() {
    if (!this.nuevoEnvio.origen || !this.nuevoEnvio.destino) return;

    this.cargando = true;
    setTimeout(() => {
      this.cargando = false;
      this.ultimoEnvio = {
        idEnvio: Math.floor(Math.random() * 900) + 100,
        ...this.nuevoEnvio,
        estado: 'Pendiente',
        pinSeguridad: Math.floor(1000 + Math.random() * 9000).toString()
      };
    }, 600);
  }

  cerrarSesion() {
    localStorage.removeItem('trackit_token');
    this.router.navigate(['/auth']);
  }
}
