const express = require('express')
const { listarEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado, obtenerEmpleado } = require('../controllers/empleadoControllers')
const { validarEmpleado } = require('../middlewares/validarEmpleado')

const router = express.Router()

router.get('/', listarEmpleados)
router.post('/', validarEmpleado, crearEmpleado)
router.put('/:id', validarEmpleado, actualizarEmpleado)
router.delete('/:id', eliminarEmpleado)
router.get('/:id', obtenerEmpleado)

module.exports = router
