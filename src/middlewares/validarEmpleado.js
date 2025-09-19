const { leerData } = require('../lib/fs')

function validarEmpleado(vista) {
	const url = `empleados/${vista}`

	return async (req, res, next) => {
		// Leer data
		const roles = await leerData('roles')
		const areas = await leerData('areas')
		const empleados = await leerData('empleados')

		const { nombre, apellido, dni, email, rol, area } = req.body
		const { id } = req.params

		// Generar empleado con/sin id
		let empleado = {}
		if (id) {
			empleado = { id, nombre, apellido, dni, email, rol, area }
		} else {
			empleado = { nombre, apellido, dni, email, rol, area }
		}

		// Validar DNI
		if (empleados.some((e) => e.dni === empleado.dni && e.id !== empleado.id)) {
			return res.render(url, {
				error: 'DNI registrado previamente',
				empleado,
			})
		}

		// Validar rol
		if (!roles.includes(rol)) {
			return res.render(url, {
				error: `Rol inválido. Debe ser uno de: ${roles.join(', ')}`,
				empleado,
			})
		}

		// Validar área
		if (!areas.includes(area)) {
			return res.render(url, {
				error: `Área inválida. Debe ser una de: ${areas.join(', ')}`,
				empleado,
			})
		}

		next()
	}
}

module.exports = { validarEmpleado }
