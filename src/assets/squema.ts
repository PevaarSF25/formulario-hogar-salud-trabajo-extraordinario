export const jsonEsquema: Object  = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
      "correoLider": {
          "type": "string",
          "format": "email",
          "description": "Correo del líder solicitante"
      },
      "cargoLider": {
          "type": "string",
          "description": "Cargo del líder solicitante"
      },
      "nombreLider": {
          "type": "string",
          "description": "Nombre del líder solicitante"
      },
      "areaLider": {
          "type": "string",
          "description": "Área del líder solicitante"
      },
      "fechaSolicitud": {
          "type": "string",
          "format": "date",
          "description": "Fecha en la que se hace la solicitud"
      },
      "workers": {
          "type": "array",
          "description": "Lista de trabajadores incluidos en la solicitud",
          "items": {
              "type": "object",
              "properties": {
                  "id": {
                      "type": "number",
                      "description": "Id del trabajador"
                  },
                  "nombre": {
                      "type": "string",
                      "description": "Nombre del trabajador"
                  },
                  "cargo": {
                      "type": "string",
                      "description": "Cargo del trabajador"
                  },
                  "concepto": {
                      "type": "string",
                      "description": "Concepto de trabajo o actividad del trabajador"
                  },
                  "area": {
                      "type": "string",
                      "description": "Área donde el trabajador realiza su actividad"
                  },
                  "fechaInicio": {
                      "type": "string",
                      "format": "date",
                      "description": "Fecha de inicio de la actividad"
                  },
                  "fechaFinal": {
                      "type": "string",
                      "format": "date",
                      "description": "Fecha de finalización de la actividad"
                  },
                  "horaInicio": {
                      "type": "string",
                      "description": "Hora de inicio en formato 24 horas (HH:mm)"
                  },
                  "horaFin": {
                      "type": "string",
                      "description": "Hora de finalización en formato 24 horas (HH:mm)"
                  }
              },
              "required": [
                  "id",
                  "nombre",
                  "cargo",
                  "concepto",
                  "area",
                  "fechaInicio",
                  "fechaFinal",
                  "horaInicio",
                  "horaFin"
              ]
          }
      }
  },
  "required": [
      "correoLider",
      "cargoLider",
      "nombreLider",
      "areaLider",
      "fechaSolicitud",
      "workers"
  ]
};

