import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const userString = localStorage.getItem('trackit_user');

  if (userString) {
    try {
      const user = JSON.parse(userString);
      if (user && user.rol === expectedRole) {
        return true; // El rol coincide con la ruta esperada
      }
    } catch (e) {
      console.error('Error al verificar el rol del usuario:', e);
    }
  }

  // Si no coincide el rol, redirige a autenticación
  router.navigate(['/auth']);
  return false;
};
