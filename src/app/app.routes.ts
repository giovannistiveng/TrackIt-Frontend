import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { ClienteComponent } from './dashboard/cliente/cliente';
import { ConductorComponent } from './dashboard/conductor/conductor';
import { AdminComponent } from './dashboard/admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'conductor', component: ConductorComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'login' }
];
