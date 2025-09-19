const {
    leerData
} = require('../lib/fs')


function validarTarea(vista) {
    const url = `tareas/${vista}`

    return async (req, res, next) => {
        try {
            const areas = await leerData('areas')
            const empleados = await leerData('empleados')
            const pacientes = await leerData('pacientes')
            const {
                area,
                tipo,
                estado,
                prioridad,
                fechaFin,
                empleadoId,
                pacienteId,
                proveedor,
                observaciones
            } = req.body
            const { id } = req.params

            const estadosValidos = ["pendiente", "en progreso", "completada"]
            const prioridadesValidas = ["baja", "media", "alta"]
            const tiposValidosPorArea = {
                "Administración de Turnos": [
                    "Alta de turno para paciente",
                    "Reprogramación o cancelación de cita",
                    "Confirmación de asistencia",
                    "Asignación de médico a turno"
                ],
                "Stock de Insumos": [
                    "Carga de nuevo insumo al stock",
                    "Control de vencimientos",
                    "Reposición de materiales",
                    "Baja por uso o descarte"
                ]
            }

            // reconstruir el objeto tarea para mantener los datos en el formulario
            let tarea = {
                id,
                area,
                tipo,
                estado,
                prioridad,
                fechaFin,
                empleadoId,
                pacienteId,
                proveedor,
                observaciones
            }

            // Validar área
            if (!areas.includes(area)) {
                return res.render(url, {
                    error: `Área inválida. Opciones: ${areas.join(", ")}`,
                    tarea,
                    areas,
                    empleados,
                    pacientes
                })
            }

            // Validar tipo por área
            if (!tiposValidosPorArea[area] || !tiposValidosPorArea[area].includes(tipo)) {
                return res.render(url, {
                    error: `Tipo inválido para el área ${area}. Opciones: ${
                        tiposValidosPorArea[area]
                            ? tiposValidosPorArea[area].join(", ")
                            : "Ninguna"
                    }`,
                    tarea,
                    areas,
                    empleados,
                    pacientes
                })
            }

            // Validar estado
            if (!estadosValidos.includes(estado)) {
                return res.render(url, {
                    error: `Estado inválido. Debe ser uno de: ${estadosValidos.join(", ")}`,
                    tarea,
                    areas,
                    empleados,
                    pacientes
                })
            }

            // Si está completada y no hay fechaFin, la genera
            if (estado === "completada" && !fechaFin) {
                const fechaActual = new Date()
                tarea.fechaFin = fechaActual.toLocaleString('es-AR')
                req.body.fechaFin = tarea.fechaFin
            }

            // Validar prioridad
            if (!prioridadesValidas.includes(prioridad)) {
                return res.render(url, {
                    error: `Prioridad inválida. Debe ser una de: ${prioridadesValidas.join(", ")}`,
                    tarea,
                    areas,
                    empleados,
                    pacientes
                })
            }

            // Validar paciente
            if (pacienteId) {
                const pacienteExiste = pacientes.find(p => p.id === pacienteId)
                if (!pacienteExiste) {
                    return res.render(url, {
                        error: "El paciente seleccionado no existe",
                        tarea,
                        areas,
                        empleados,
                        pacientes
                    })
                }
            }

            // Validar empleado
            if (empleadoId) {
                const empleadoExiste = empleados.find(e => e.id === empleadoId)
                if (!empleadoExiste) {
                    return res.render(url, {
                        error: "El empleado seleccionado no existe",
                        tarea,
                        areas,
                        empleados,
                        pacientes
                    })
                }

                if (empleadoExiste.area !== area) {
                    return res.render(url, {
                        error: "El área del empleado no coincide con el área de la tarea",
                        tarea,
                        areas,
                        empleados,
                        pacientes
                    })
                }
            }

            // Si todo pasa, continúa
            next()
        } catch (error) {
            res.render(url, {
                error: "Error interno del servidor",
                tarea: req.body
            })
        }
    }
}

module.exports = { validarTarea }