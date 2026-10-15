export interface Usuario {
  idUsuario?: number;
  nombre?: string;
  correo: string;
  password?: string;
  rol?: 'Cliente' | 'Conductor' | string;
}
