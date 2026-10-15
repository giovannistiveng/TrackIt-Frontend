export interface Envio {
  idEnvio?: number;
  idCliente: number;
  idConductor?: number | null;
  origen: string;
  destino: string;
  tipoCarga: string;
  tarifa: number;
  estado?: string;
  pinSeguridad?: string;
  evidenciaBase64?: string | null;
}

