const Tarea = require('../models/Tarea')
const {
    leerData,
    escribirData
} = require('../lib/fs')

async function formularioNuevaTarea(req, res) {
    try {
        const areas = await leerData("areas")
        const empleados = await leerData("empleados")
        const pacientes = await leerData("pacientes")

        const estados = ["pendiente", "en progreso", "completada"]
        const prioridades = ["baja", "media", "alta"]
        const tiposValidosPorArea = {
            'Administración de Turnos': [
                'Alta de turno para paciente',
                'Reprogramación o cancelación de cita',
                'Confirmación de asistencia',
                'Asignación de médico a turno'
            ],
            'Stock de Insumos': [
                'Carga de nuevo insumo al stock',
                'Control de vencimientos',
                'Reposición de materiales',
                'Baja por uso o descarte'
            ]
        };

        res.render('nuevaTarea', {
            areas,
            empleados,
            pacientes,
            estados,
            prioridades,
            tiposValidosPorArea
        })
    } catch (error) {
        return res.render('nuevaTarea', {
            error: error.message
        })
    }
}

async function formularioEditarTarea(req, res) {
    try {
        const tareas = await leerData("tareas")
        const tarea = tareas.find(t => t.id === req.params.id)
        if (!tarea) {
            return res.redirect('/tareas')
        }

        const areas = await leerData("areas")
        const empleados = await leerData("empleados")
        const pacientes = await leerData("pacientes")
        const estados = ["pendiente", "en progreso", "completada"]
        const prioridades = ["baja", "media", "alta"]
        const tiposValidosPorArea = {
            'Administración de Turnos': [
                'Alta de turno para paciente',
                'Reprogramación o cancelación de cita',
                'Confirmación de asistencia',
                'Asignación de médico a turno'
            ],
            'Stock de Insumos': [
                'Carga de nuevo insumo al stock',
                'Control de vencimientos',
                'Reposición de materiales',
                'Baja por uso o descarte'
            ]
        };

        return res.render('tareas/editar', {
            tarea,
            areas,
            empleados,
            pacientes,
            estados,
            prioridades,
            tiposValidosPorArea
        })
    } catch (error) {
        return res.render('tareas/editar', {
            error: error.message,
            tarea: req.body
        })
    }
}

async function crearTarea(req, res) {
    try {
        const nuevaTarea = new Tarea(req.body)
        const tareas = await leerData("tareas")
        tareas.push(nuevaTarea)
        await escribirData("tareas", tareas)
        res.redirect('/tareas')
    } catch (error) {
        res.render('nuevaTarea', {
            error: error.message,
            tarea: req.body
        })
    }
}

async function listarTareas(req, res) {
    try {
        const tareas = await leerData("tareas")
        const areas = await leerData("areas")
        const empleados = await leerData("empleados")
        const pacientes = await leerData("pacientes")
        const filtros = req.query
        let tareasFiltradas = tareas
        if (Object.keys(filtros).length > 0) {
            tareasFiltradas = tareas.filter(tarea => {
                let coincide = true
                for (const key in filtros) {
                    if (tarea[key] == undefined || tarea[key].toString() !== filtros[key]) {
                        coincide = false
                        break
                    }
                }
                return coincide
            })
        }
        res.render('tareas/listado', {
            tareas: tareasFiltradas,
            areas,
            empleados,
            pacientes,
            filtros
        })
    } catch (error) {
        res.render('tareas/listado', {
            error: error.message
        })
    }
}

async function actualizarTarea(req, res) {
    try {
        const {
            id
        } = req.params
        const tareas = await leerData('tareas')
        const index = tareas.findIndex(t => t.id === id)
        if (index === -1) return res.status(404).json({
            error: 'Tarea no encontrada'
        })

        tareas[index] = {
            ...tareas[index],
            ...req.body
        }
        await escribirData('tareas', tareas)
        res.redirect('/tareas')
    } catch (error) {
        res.render('tareas/editar', {
            error: error.message,
            tarea: {
                ...req.body,
                id: req.params.id
            }
        })
    }
}

async function eliminarTarea(req, res) {
    try {
        const {
            id
        } = req.params
        const tareas = await leerData("tareas")
        const tareaIndex = tareas.findIndex(t => t.id === id)
        if (tareaIndex === -1) {
            return res.status(404).json({
                error: "Tarea no encontrada"
            })
        }
        const tareaEliminada = tareas.splice(tareaIndex, 1)
        await escribirData("tareas", tareas)
        res.redirect('/tareas')
    } catch (error) {
        const tareas = await leerData("tareas")
        return res.render('tareas/listado', {
            error: error.message,
            tareas
        })
    }
}

module.exports = {
  formularioNuevaTarea,
  formularioEditarTarea,
  listarTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea
}