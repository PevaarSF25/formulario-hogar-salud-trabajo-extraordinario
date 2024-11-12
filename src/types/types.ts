export interface Trabajador {
  id: number
  nombre: string
  cargo: string
  concepto: string
  area: string
  fechaInicio: string
  fechaFinal: string
  horaInicio: string
  horaFin: string
}

export interface Solicitud {
  correoLider: string,
  cargoLider: string,
  nombreLider: string,
  areaLider: string,
  fechaSolicitud: string,
  workers: Trabajador[]
}