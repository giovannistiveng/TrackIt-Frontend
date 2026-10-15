import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; background-color: #020617; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem;">
      
      <!-- Navbar Operativo -->
      <header style="max-width: 900px; margin: 0 auto 2rem auto; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="padding: 0.5rem; background: rgba(37, 99, 235, 0.15); border: 1px solid rgba(37, 99, 235, 0.3); border-radius: 0.75rem; color: #3b82f6; display: flex; align-items: center; justify-content: center;">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h1 style="font-size: 1.25rem; font-weight: 900; margin: 0; color: #ffffff;">
              TrackIt<span style="color: #f97316;">.</span> Express
            </h1>
            <p style="font-size: 0.75rem; color: #94a3b8; margin: 0.1rem 0 0 0; font-weight: 500;">Panel Operativo de Ruta</p>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.7rem; font-weight: 800; padding: 0.3rem 0.75rem; border-radius: 9999px;">
            Conductor Activo
          </span>

          <button 
            (click)="cerrarSesion()" 
            style="background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 0.5rem 1rem; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
            Salir
          </button>
        </div>
      </header>

      <!-- Main Body -->
      <main style="max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- Buscador -->
        <div style="background: #0f172a; padding: 2rem; border-radius: 1.5rem; border: 1px solid #1e293b; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background-color: #3b82f6; display: inline-block;"></span>
            <h2 style="font-size: 1.1rem; font-weight: 800; color: #ffffff; margin: 0;">Tomar Envío por Código</h2>
          </div>

          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <input 
              type="number" 
              [(ngModel)]="idBusqueda" 
              placeholder="Ej. 101" 
              style="flex: 1; min-width: 200px; padding: 0.8rem; background: #020617; border: 1px solid #334155; border-radius: 0.75rem; color: #ffffff; font-size: 0.85rem; font-weight: 700; outline: none;">

            <button 
              (click)="tomarEnvio()" 
              [disabled]="!idBusqueda || cargando"
              style="background: #2563eb; color: #ffffff; border: none; padding: 0.8rem 1.5rem; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer;">
              {{ cargando ? 'Buscando...' : 'Tomar Envío' }}
            </button>
          </div>

          <div *ngIf="mensaje" [style.background]="exito ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'" [style.color]="exito ? '#34d399' : '#fb7185'" [style.border-color]="exito ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'" style="margin-top: 1rem; padding: 0.75rem; border-width: 1px; border-style: solid; border-radius: 0.75rem; font-size: 0.75rem; text-align: center; font-weight: 600;">
            {{ mensaje }}
          </div>
        </div>

        <!-- Detalle y Confirmación por PIN -->
        <div *ngIf="envioActivo" style="background: #0f172a; padding: 2rem; border-radius: 1.5rem; border: 1px solid rgba(59, 130, 246, 0.3); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); display: flex; flex-direction: column; gap: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 0.75rem;">
            <div>
              <p style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin: 0;">Orden en Servicio</p>
              <p style="font-size: 1.75rem; font-weight: 900; color: #ffffff; margin: 0;">#{{ envioActivo.idEnvio }}</p>
            </div>
            <span style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); font-size: 0.65rem; font-weight: 800; padding: 0.3rem 0.75rem; border-radius: 9999px; text-transform: uppercase;">
              {{ envioActivo.estado }}
            </span>
          </div>

          <div style="background: #020617; padding: 1rem; border-radius: 1rem; border: 1px solid #1e293b; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
              <span style="font-size: 0.65rem; color: #64748b; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 0.25rem;">Punto de Recogida</span>
              <p style="font-size: 0.8rem; font-weight: 600; color: #e2e8f0; margin: 0;">📍 {{ envioActivo.origen }}</p>
            </div>

            <div>
              <span style="font-size: 0.65rem; color: #64748b; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 0.25rem;">Punto de Entrega</span>
              <p style="font-size: 0.8rem; font-weight: 600; color: #e2e8f0; margin: 0;">🏁 {{ envioActivo.destino }}</p>
            </div>
          </div>

          <!-- Validación PIN -->
          <div style="background: #020617; padding: 1.25rem; border-radius: 1rem; border: 1px solid #1e293b; display: flex; flex-direction: column; gap: 0.75rem;">
            <h3 style="font-size: 0.75rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; margin: 0;">Confirmación de Entrega</h3>
            <p style="font-size: 0.7rem; color: #64748b; margin: 0;">Solicita al cliente el PIN de seguridad de 4 dígitos para completar el pedido.</p>

            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <input 
                type="text" 
                [(ngModel)]="pinIngresado" 
                maxlength="4" 
                placeholder="PIN 4 dígitos" 
                style="padding: 0.75rem 1rem; background: #0f172a; border: 1px solid #334155; border-radius: 0.75rem; text-align: center; font-size: 0.9rem; font-weight: 900; letter-spacing: 0.15em; color: #f97316; outline: none; width: 140px;">
              
              <button 
                (click)="verificarPin()" 
                style="background: #059669; color: #ffffff; border: none; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; cursor: pointer;">
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
