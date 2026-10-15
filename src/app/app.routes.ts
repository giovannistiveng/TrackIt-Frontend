import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { ClienteComponent } from './features/cliente/cliente.component';
import { ConductorComponent } from './features/conductor/conductor.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { 
    path: 'cliente', 
    component: ClienteComponent, 
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Cliente' }
  },
  { 
    path: 'conductor', 
    component: ConductorComponent, 
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'Conductor' }
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];
