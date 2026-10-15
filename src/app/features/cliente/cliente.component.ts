import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="min-height: 100vh; background-color: #020617; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; padding: 1.5rem;">
      
      <!-- Navbar Superior -->
      <header style="max-width: 1200px; margin: 0 auto 2rem auto; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="padding: 0.5rem; background: rgba(249, 115, 22, 0.15); border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 0.75rem; color: #f97316; display: flex; align-items: center; justify-content: center;">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h1 style="font-size: 1.25rem; font-weight: 900; margin: 0; color: #ffffff;">
              TrackIt<span style="color: #f97316;">.</span> Express
            </h1>
            <p style="font-size: 0.75rem; color: #94a3b8; margin: 0.1rem 0 0 0; font-weight: 500;">Portal de Solicitudes - Cliente</p>
          </div>
        </div>

        <button 
          (click)="cerrarSesion()" 
          style="background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 0.6rem 1.2rem; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
          Cerrar Sesión
        </button>
      </header>

      <!-- Grid Principal (Formulario y Ticket) -->
      <main style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        
        <!-- Formulario de Solicitud -->
        <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background-color: #f97316; display: inline-block;"></span>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin: 0;">Solicitar Envío Acarreo</h2>
          </div>

          <form (ngSubmit)="solicitarEnvio()" style="display: flex; flex-direction: column; gap: 1.25rem;">
            
            <!-- Dirección Origen -->
            <div>
              <label style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 0.5rem;">
                Dirección de Origen (Recogida)
              </label>
              <input 
                type="text" 
                [(ngModel)]="nuevoEnvio.origen" 
                name="origen" 
                required 
                placeholder="Ej. Calle 10 # 5-20, Centro"
                style="width: 100%; padding: 0.8rem; background-color: #020617; border: 1px solid #334155; border-radius: 0.75rem; color: #ffffff; font-size: 0.8rem; box-sizing: border-box; outline: none;">
            </div>

            <!-- Dirección Destino -->
            <div>
              <label style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 0.5rem;">
                Dirección de Destino (Entrega)
              </label>
              <input 
                type="text" 
                [(ngModel)]="nuevoEnvio.destino" 
                name="destino" 
                required 
                placeholder="Ej. Barrio Balmoral"
                style="width: 100%; padding: 0.8rem; background-color: #020617; border: 1px solid #334155; border-radius: 0.75rem; color: #ffffff; font-size: 0.8rem; box-sizing: border-box; outline: none;">
            </div>

            <!-- Selector de Vehículo con Iconos SVG Controlados -->
            <div>
              <label style="display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 0.75rem;">
                Categoría de Vehículo
              </label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
                
                <!-- Moto Express -->
                <button 
                  type="button" 
                  (click)="seleccionarCategoria('Moto Express', 15000)"
                  [style.border-color]="nuevoEnvio.tipoCarga === 'Moto Express' ? '#f97316' : '#334155'"
                  [style.background]="nuevoEnvio.tipoCarga === 'Moto Express' ? 'rgba(249, 115, 22, 0.15)' : '#020617'"
                  [style.color]="nuevoEnvio.tipoCarga === 'Moto Express' ? '#fb923c' : '#94a3b8'"
                  style="padding: 1rem 0.5rem; border-width: 1px; border-style: solid; border-radius: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  <span style="font-size: 0.75rem; font-weight: 700; text-align: center;">Moto Express</span>
                  <span style="font-size: 0.8rem; font-weight: 900; color: #ffffff;">$15.000</span>
                </button>

                <!-- Motocarro -->
                <button 
                  type="button" 
                  (click)="seleccionarCategoria('Motocarro', 28000)"
                  [style.border-color]="nuevoEnvio.tipoCarga === 'Motocarro' ? '#f97316' : '#334155'"
                  [style.background]="nuevoEnvio.tipoCarga === 'Motocarro' ? 'rgba(249, 115, 22, 0.15)' : '#020617'"
                  [style.color]="nuevoEnvio.tipoCarga === 'Motocarro' ? '#fb923c' : '#94a3b8'"
                  style="padding: 1rem 0.5rem; border-width: 1px; border-style: solid; border-radius: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                  <span style="font-size: 0.75rem; font-weight: 700; text-align: center;">Motocarro</span>
                  <span style="font-size: 0.8rem; font-weight: 900; color: #ffffff;">$28.000</span>
                </button>

                <!-- Camioneta -->
                <button 
                  type="button" 
                  (click)="seleccionarCategoria('Camioneta', 55000)"
                  [style.border-color]="nuevoEnvio.tipoCarga === 'Camioneta' ? '#f97316' : '#334155'"
                  [style.background]="nuevoEnvio.tipoCarga === 'Camioneta' ? 'rgba(249, 115, 22, 0.15)' : '#020617'"
                  [style.color]="nuevoEnvio.tipoCarga === 'Camioneta' ? '#fb923c' : '#94a3b8'"
                  style="padding: 1rem 0.5rem; border-width: 1px; border-style: solid; border-radius: 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 8h6a2 2 0 012 2v5l-3-3h-5V8z"/>
                  </svg>
                  <span style="font-size: 0.75rem; font-weight: 700; text-align: center;">Camioneta</span>
                  <span style="font-size: 0.8rem; font-weight: 900; color: #ffffff;">$55.000</span>
                </button>

              </div>
            </div>

            <!-- Botón Solicitar Envío -->
            <button 
              type="submit" 
              [disabled]="cargando"
              style="width: 100%; margin-top: 0.5rem; padding: 1rem; background: #f97316; border: none; border-radius: 0.75rem; color: #ffffff; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.3);">
              {{ cargando ? 'Generando Orden...' : 'Confirmar y Solicitar Envío' }}
            </button>

          </form>
        </div>

        <!-- Ticket de Resumen / Respuesta de Orden -->
        <div>
          <div *ngIf="ultimoEnvio" style="background: #0f172a; border: 1px solid rgba(249, 115, 22, 0.3); border-radius: 1.5rem; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); display: flex; flex-direction: column; gap: 1.5rem;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 1rem;">
              <div>
                <p style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em; margin: 0;">Orden Creada</p>
                <p style="font-size: 1.75rem; font-weight: 900; color: #ffffff; margin: 0;">#{{ ultimoEnvio.idEnvio }}</p>
              </div>
              <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 0.65rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase;">
                {{ ultimoEnvio.estado || 'Pendiente' }}
              </span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.8rem;">
              <div>
                <span style="color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 0.65rem; display: block; margin-bottom: 0.2rem;">Origen</span>
                <p style="margin: 0; color: #e2e8f0; font-weight: 600;">{{ ultimoEnvio.origen }}</p>
              </div>

              <div>
                <span style="color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 0.65rem; display: block; margin-bottom: 0.2rem;">Destino</span>
                <p style="margin: 0; color: #e2e8f0; font-weight: 600;">{{ ultimoEnvio.destino }}</p>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.5rem; border-top: 1px solid #1e293b;">
                <span style="color: #94a3b8;">Categoría: <strong style="color: #ffffff;">{{ ultimoEnvio.tipoCarga }}</strong></span>
                <span style="font-size: 1.25rem; font-weight: 900; color: #f97316;">\${{ ultimoEnvio.tarifa | number }}</span>
              </div>
            </div>

            <!-- PIN de Seguridad -->
            <div style="background-color: #020617; border: 1px solid #1e293b; border-radius: 1rem; padding: 1.25rem; text-align: center;">
              <span style="font-size: 0.65rem; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 0.1em; display: block; margin-bottom: 0.25rem;">
                PIN de Seguridad Requerido
              </span>
              <span style="font-size: 2.25rem; font-weight: 900; color: #f97316; letter-spacing: 0.15em;">
                {{ ultimoEnvio.pinSeguridad }}
              </span>
              <p style="font-size: 0.65rem; color: #64748b; margin: 0.5rem 0 0 0;">
                Brinda este PIN de 4 dígitos al conductor para validar la entrega de tu encomienda.
              </p>
            </div>

          </div>

          <div *ngIf="!ultimoEnvio" style="background: rgba(15, 23, 42, 0.5); border: 2px dashed #1e293b; padding: 3rem 1.5rem; border-radius: 1.5rem; text-align: center; color: #64748b;">
            <svg width="48" height="48" fill="none" stroke="#334155" viewBox="0 0 24 24" style="margin: 0 auto 0.75rem auto; display: block;" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <p style="font-size: 0.8rem; font-weight: 600; margin: 0;">Completa el formulario para generar tu orden de envío.</p>
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
