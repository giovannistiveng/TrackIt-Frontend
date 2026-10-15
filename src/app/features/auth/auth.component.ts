import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 400px; margin: 40px auto; padding: 20px; font-family: sans-serif; border: 1px solid #ccc; border-radius: 8px;">
      
      <!-- Selector de Modo (Login o Registro) -->
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <button (click)="isLoginMode = true" [style.background-color]="isLoginMode ? '#007bff' : '#eee'" [style.color]="isLoginMode ? 'white' : 'black'" style="flex: 1; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
          Iniciar Sesión
        </button>
        <button (click)="isLoginMode = false" [style.background-color]="!isLoginMode ? '#007bff' : '#eee'" [style.color]="!isLoginMode ? 'white' : 'black'" style="flex: 1; padding: 10px; border: none; border-radius: 4px; cursor: pointer;">
          Registrarse
        </button>
      </div>

      <h2 style="text-align: center;">{{ isLoginMode ? 'Acceder a TrackIt' : 'Crear Nueva Cuenta' }}</h2>

      <!-- Formulario Único -->
      <form (ngSubmit)="onSubmit()" style="display: flex; flex-direction: column; gap: 15px;">
        
        <!-- Campo Nombre (Solo para Registro) -->
        <div *ngIf="!isLoginMode">
          <label>Nombre Completo:</label>
          <input type="text" [(ngModel)]="usuario.nombre" name="nombre" required style="width: 100%; padding: 8px; margin-top: 5px;">
        </div>

        <!-- Correo Electrónico -->
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" [(ngModel)]="usuario.correo" name="correo" required style="width: 100%; padding: 8px; margin-top: 5px;">
        </div>

        <!-- Contraseña -->
        <div>
          <label>Contraseña:</label>
          <input type="password" [(ngModel)]="usuario.password" name="password" required style="width: 100%; padding: 8px; margin-top: 5px;">
        </div>

        <!-- Selector de Rol (Solo para Registro) -->
        <div *ngIf="!isLoginMode">
          <label>Rol:</label>
          <select [(ngModel)]="usuario.rol" name="rol" required style="width: 100%; padding: 8px; margin-top: 5px;">
            <option value="Cliente">Cliente</option>
            <option value="Conductor">Conductor</option>
          </select>
        </div>

        <button type="submit" [disabled]="isLoading" style="padding: 10px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
          {{ isLoading ? 'Cargando...' : (isLoginMode ? 'Ingresar' : 'Registrarme') }}
        </button>
      </form>

      <p *ngIf="errorMessage" style="color: red; text-align: center; margin-top: 15px;">{{ errorMessage }}</p>
    </div>
  `
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  errorMessage = '';

  // Modelo temporal para atar al formulario
  usuario: Usuario = {
    nombre: '',
    correo: '',
    password: '',
    rol: 'Cliente'
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.isLoginMode) {
      // Flujo de Login
      this.userService.login({ 
        correo: this.usuario.correo, 
        password: this.usuario.password || ' '
      }).subscribe({
        next: (res) => {
          this.isLoading = false;
          // Guardar el token en el almacenamiento local
          if (res.token) {
            localStorage.setItem('trackit_token', res.token);
            alert('¡Login exitoso!');
            // Aquí luego redirigiremos al panel principal: this.router.navigate(['/tablero']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
        }
      });
    } else {
      // Flujo de Registro
      this.userService.register(this.usuario).subscribe({
        next: (res) => {
          this.isLoading = false;
          alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
          this.isLoginMode = true; // Cambiar a la vista de login tras registro exitoso
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Ocurrió un error al registrar el usuario.';
        }
      });
    }
  }
}
