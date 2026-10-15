import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #020617; padding: 1rem;">
      
      <!-- Tarjeta de Autenticación Centrada -->
      <div style="width: 100%; max-width: 420px; background: rgba(15, 23, 42, 0.95); border: 1px solid #1e293b; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); color: #ffffff;">
        
        <!-- Logo y Título -->
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: linear-gradient(135deg, #ea580c, #f59e0b); border-radius: 1rem; margin-bottom: 0.75rem;">
            <svg width="24" height="24" fill="none" stroke="#ffffff" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 style="font-size: 1.5rem; font-weight: 900; margin: 0;">TrackIt<span style="color: #f97316;">.</span> Express</h1>
          <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem;">Plataforma Logística e Inteligente</p>
        </div>

        <!-- Selector de Pestañas (Login / Registro) -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; background: #020617; border: 1px solid #1e293b; border-radius: 0.75rem; padding: 0.25rem; margin-bottom: 1.5rem;">
          <button 
            type="button" 
            (click)="toggleTab(true)" 
            [style.background]="isLogin ? '#f97316' : 'transparent'"
            [style.color]="isLogin ? '#ffffff' : '#94a3b8'"
            style="border: none; padding: 0.6rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s;">
            Iniciar Sesión
          </button>
          <button 
            type="button" 
            (click)="toggleTab(false)" 
            [style.background]="!isLogin ? '#f97316' : 'transparent'"
            [style.color]="!isLogin ? '#ffffff' : '#94a3b8'"
            style="border: none; padding: 0.6rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s;">
            Registrarse
          </button>
        </div>

        <!-- Formulario -->
        <form (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 1rem;">
          
          <!-- Nombre (Solo en Registro) -->
          <div *ngIf="!isLogin">
            <label style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem;">Nombre Completo</label>
            <input 
              type="text" 
              [(ngModel)]="nombre" 
              name="nombre" 
              placeholder="Ej. Juan Pérez"
              style="width: 100%; padding: 0.75rem; background: #020617; border: 1px solid #334155; border-radius: 0.75rem; color: #ffffff; font-size: 0.8rem; box-sizing: border-box;">
          </div>

          <!-- Correo -->
          <div>
            <label style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem;">Correo Electrónico</label>
            <input 
              type="email" 
              [(ngModel)]="correo" 
              name="correo" 
              required 
              placeholder="usuario@ejemplo.com"
              style="width: 100%; padding: 0.75rem; background: #020617; border: 1px solid #334155; border-radius: 0.75rem; color: #ffffff; font-size: 0.8rem; box-sizing: border-box;">
          </div>

          <!-- Contraseña -->
          <div>
            <label style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem;">Contraseña</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              required 
              placeholder="••••••••"
              style="width: 100%; padding: 0.75rem; background: #020617; border: 1px solid #334155; border-radius: 0.75rem; color: #ffffff; font-size: 0.8rem; box-sizing: border-box;">
          </div>

          <!-- Selección de Rol -->
          <div>
            <label style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 0.4rem;">Selecciona tu Rol</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <button 
                type="button" 
                (click)="rol = 'Cliente'" 
                [style.border-color]="rol === 'Cliente' ? '#f97316' : '#334155'"
                [style.background]="rol === 'Cliente' ? 'rgba(249, 115, 22, 0.15)' : '#020617'"
                [style.color]="rol === 'Cliente' ? '#fb923c' : '#94a3b8'"
                style="padding: 0.75rem; border-width: 1px; border-style: solid; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                Cliente
              </button>

              <button 
                type="button" 
                (click)="rol = 'Conductor'" 
                [style.border-color]="rol === 'Conductor' ? '#f97316' : '#334155'"
                [style.background]="rol === 'Conductor' ? 'rgba(249, 115, 22, 0.15)' : '#020617'"
                [style.color]="rol === 'Conductor' ? '#fb923c' : '#94a3b8'"
                style="padding: 0.75rem; border-width: 1px; border-style: solid; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
                Conductor
              </button>
            </div>
          </div>

          <!-- Botón de Acción -->
          <button 
            type="submit" 
            [disabled]="loading"
            style="width: 100%; margin-top: 0.5rem; padding: 0.85rem; background: #f97316; border: none; border-radius: 0.75rem; color: #ffffff; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);">
            {{ loading ? 'Procesando...' : (isLogin ? 'Ingresar a la Plataforma' : 'Crear Cuenta') }}
          </button>

        </form>

        <div *ngIf="errorMessage" style="margin-top: 1rem; padding: 0.75rem; background: rgba(244, 63, 94, 0.15); border: 1px solid rgba(244, 63, 94, 0.3); color: #fb7185; font-size: 0.75rem; border-radius: 0.75rem; text-align: center; font-weight: 600;">
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
