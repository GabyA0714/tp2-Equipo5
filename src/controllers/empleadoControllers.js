const Empleado = require('../models/Empleado')
const { leerData, escribirData } = require('../lib/fs')

async function crearEmpleado(req, res) {
    const { nombre, apellido, dni, email, rol, area } = req.body

    try {
        const empleado = new Empleado(nombre, apellido, dni, email, rol, area)
        const empleados = await leerData("empleados")

        if (empleados.some(e => e.dni === empleado.dni)) {
            return res.status(400).json({
                error: "DNI registrado previamente"
            })
        }

        empleados.push(empleado)
        await escribirData("empleados", empleados)

        return res.status(201).json(empleado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function listarEmpleados(req, res) {
    const empleados = await leerData("empleados")
    res.status(200).json(empleados)
}

async function obtenerEmpleado(req, res) {
    try {
        const { id } = req.params
        const empleados = await leerData("empleados")

        const empleado = empleados.find(e => e.id === id)

        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' })
        }

        return res.json(empleado)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function actualizarEmpleado(req, res) {
    try {
        const { id } = req.params

        const empleados = await leerData("empleados")
        const index = empleados.findIndex(e => e.id === id)

        if (index === -1) {
            return res.status(404).json({ error: 'Empleado no encontrado' })
        }

        const { nombre, apellido, dni, email, rol, area } = req.body

        empleados[index] = { ...empleados[index], nombre, apellido, dni, email, rol, area }
        await escribirData("empleados", empleados)

        res.status(200).json(empleados[index])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function eliminarEmpleado(req, res) {
    try {
        const { id } = req.params

        const empleados = await leerData("empleados")
        const index = empleados.findIndex(e => e.id === id)

        if (index === -1) {
            return res.status(404).json({ error: 'Empleado no encontrado' })
        }

        const eliminado = empleados.splice(index, 1)
        await escribirData("empleados", empleados)

        res.status(200).json(eliminado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { listarEmpleados, crearEmpleado, obtenerEmpleado, actualizarEmpleado, eliminarEmpleado }
