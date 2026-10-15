import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      <!-- Destellos de fondo (Glow Effects) -->
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <!-- Tarjeta Principal con Glassmorphism -->
      <div class="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl relative z-10">
        
        <!-- Logo y Encabezado -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl shadow-lg shadow-orange-500/20 mb-4">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 class="text-2xl font-black tracking-tight text-white">
            TrackIt<span class="text-orange-500">.</span> Express
          </h1>
          <p class="text-xs text-slate-400 font-medium mt-1">Plataforma Logística e Inteligente</p>
        </div>

        <!-- Pestañas de Navegación (Login / Registro) -->
        <div class="grid grid-cols-2 p-1 bg-slate-950/80 border border-slate-800 rounded-2xl mb-6">
          <button 
            type="button" 
            (click)="toggleTab(true)" 
            [ngClass]="{
              'bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/25': isLogin,
              'text-slate-400 hover:text-slate-200 font-medium': !isLogin
            }"
            class="py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer">
            Iniciar Sesión
          </button>

          <button 
            type="button" 
            (click)="toggleTab(false)" 
            [ngClass]="{
              'bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/25': !isLogin,
              'text-slate-400 hover:text-slate-200 font-medium': isLogin
            }"
            class="py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer">
            Registrarse
          </button>
        </div>

        <!-- Formulario -->
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          
          <!-- Campo Nombre (Solo en Registro) -->
          <div *ngIf="!isLogin">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Nombre Completo</label>
            <div class="relative">
              <input 
                type="text" 
                [(ngModel)]="nombre" 
                name="nombre" 
                required 
                placeholder="Ej. Juan Pérez"
                class="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition">
              <svg class="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <!-- Campo Correo Electrónico -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Correo Electrónico</label>
            <div class="relative">
              <input 
                type="email" 
                [(ngModel)]="correo" 
                name="correo" 
                required 
                placeholder="usuario@ejemplo.com"
                class="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition">
              <svg class="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>

          <!-- Campo Contraseña -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Contraseña</label>
            <div class="relative">
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password" 
                required 
                placeholder="••••••••"
                class="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-medium text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition">
              <svg class="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <!-- Selección de Perfil / Rol -->
          <div class="pt-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Selecciona tu Rol</label>
            <div class="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                (click)="rol = 'Cliente'" 
                [ngClass]="{
                  'border-orange-500 bg-orange-500/10 text-orange-400 font-bold': rol === 'Cliente',
                  'border-slate-800 bg-slate-950/40 text-slate-500 hover:border-slate-700': rol !== 'Cliente'
                }"
                class="p-3 border rounded-xl flex items-center justify-center gap-2 transition text-xs cursor-pointer">
                <span>Cliente</span>
              </button>

              <button 
                type="button" 
                (click)="rol = 'Conductor'" 
                [ngClass]="{
                  'border-orange-500 bg-orange-500/10 text-orange-400 font-bold': rol === 'Conductor',
                  'border-slate-800 bg-slate-950/40 text-slate-500 hover:border-slate-700': rol !== 'Conductor'
                }"
                class="p-3 border rounded-xl flex items-center justify-center gap-2 transition text-xs cursor-pointer">
                <span>Conductor</span>
              </button>
            </div>
          </div>

          <!-- Botón de Envío -->
          <button 
            type="submit" 
            [disabled]="loading"
            class="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 text-xs uppercase tracking-wider cursor-pointer mt-4 disabled:opacity-50 flex items-center justify-center gap-2">
            <span *ngIf="!loading">{{ isLogin ? 'Ingresar a la Plataforma' : 'Crear Cuenta' }}</span>
            <span *ngIf="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
          </button>

        </form>

        <div *ngIf="errorMessage" class="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl text-center font-semibold">
          {{ errorMessage }}
        </div>

      </div>
    </div>
  `
})
export class AuthComponent {
  isLogin = true;
  loading = false;
  errorMessage = '';

  nombre = '';
  correo = '';
  password = '';
  rol: 'Cliente' | 'Conductor' = 'Cliente';

  constructor(private router: Router) {}

  toggleTab(loginState: boolean) {
    this.isLogin = loginState;
    this.errorMessage = '';
  }

  onSubmit() {
    if (!this.correo || !this.password || (!this.isLogin && !this.nombre)) {
      this.errorMessage = 'Por favor completa todos los campos requeridos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    setTimeout(() => {
      this.loading = false;
      localStorage.setItem('trackit_token', 'token_demo');
      localStorage.setItem('trackit_user', JSON.stringify({ nombre: this.nombre || 'Usuario Demo', correo: this.correo, rol: this.rol }));

      if (this.rol === 'Cliente') {
        this.router.navigate(['/cliente']);
      } else {
        this.router.navigate(['/conductor']);
      }
    }, 800);
  }
}
