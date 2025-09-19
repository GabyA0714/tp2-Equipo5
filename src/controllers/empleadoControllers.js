const Empleado = require('../models/Empleado')
const { leerData, escribirData } = require('../lib/fs')

function formularioNuevoEmpleado(req, res) {
    try {
        res.render('empleados/nuevo')
    } catch (error) {
        return res.render('empleados/nuevo', { error: error.message })
    }
}

async function formularioEditarEmpleado(req, res) {
    try {
        // Data
        const empleados = await leerData('empleados')
        const empleado = empleados.find((e) => e.id === req.params.id)

        if (!empleado) {
            return res.redirect('/empleados')
        }

        res.render('empleados/editar', { empleado })
    } catch (error) {
        return res.render('empleados/editar', { error: error.message, empleado: req.body })
    }
}

async function crearEmpleado(req, res) {
	try {
		const { nombre, apellido, dni, email, rol, area } = req.body

		// Data
		const empleado = new Empleado(nombre, apellido, dni, email, rol, area)
		const empleados = await leerData('empleados')

		// Guardar
		empleados.push(empleado)
		await escribirData('empleados', empleados)

		res.redirect('/empleados')
	} catch (error) {
        return res.render('empleados/nuevo', { error: error.message, empleado: req.body })
	}
}

async function listarEmpleados(req, res) {
	try {
        // Data
		const empleados = await leerData('empleados')

		res.render('empleados/listado', { empleados })
	} catch (error) {
		return res.render('empleados/listado', { error: error.message })
	}
}

async function actualizarEmpleado(req, res) {
	try {
        const { id } = req.params

		// Data
		const empleados = await leerData('empleados')
		const index = empleados.findIndex((e) => e.id === id)

		// Comprobar empleado
		if (index === -1) {
			return res.status(404).json({ error: 'Empleado no encontrado' })
		}

		// Guardar
		empleados[index] = {...empleados[index], ...req.body}
		await escribirData('empleados', empleados)

		res.redirect('/empleados')
	} catch (error) {
		return res.render('empleados/editar', { error: error.message, empleado: {...req.body, id: req.params.id } })
	}
}

async function eliminarEmpleado(req, res) {
	try {
		const { id } = req.params

		// Data
		const empleados = await leerData('empleados')
		const index = empleados.findIndex((e) => e.id === id)

		// Comprobar empleado
		if (index === -1) {
			return res.status(404).json({ error: 'Empleado no encontrado' })
		}

		// Guardar
		empleados.splice(index, 1)
		await escribirData('empleados', empleados)

		res.redirect('/empleados')
	} catch (error) {
        const empleados = await leerData('empleados')
		return res.render('empleados/listado', { error: error.message, empleados })
	}
}

module.exports = {
	formularioNuevoEmpleado,
	formularioEditarEmpleado,
	listarEmpleados,
	crearEmpleado,
	actualizarEmpleado,
	eliminarEmpleado,
}
