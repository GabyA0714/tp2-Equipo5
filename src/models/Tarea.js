const { v4: uuidv4 } = require('uuid')

class Tarea {
    constructor({area, tipo, estado, prioridad, descripcion, fechaInicio, fechaFin, empleadoId,pacienteId,proveedor,observaciones}) {
        this.id = uuidv4()
        this.area = area
        this.tipo = tipo
        this.estado = estado
        this.prioridad = prioridad
        this.descripcion = descripcion
        // para poner por defecto la fecha de inicio como la fecha actual:
        const fechaActual = new Date()
        this.fechaInicio = fechaActual.toLocaleString('es-AR')
        this.fechaFin = fechaFin
        this.empleadoId = empleadoId
        this.pacienteId = pacienteId
        this.proveedor = proveedor
        this.observaciones = observaciones
    }
}

module.exports = Tarea
