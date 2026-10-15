import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('trackit_token');

  if (token) {
    return true; // Permite el acceso a la ruta
  }

  // Redirige al login si no existe sesión
  router.navigate(['/auth']);
  return false;
};
