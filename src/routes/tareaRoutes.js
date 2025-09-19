const express = require('express')
const { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea, obtenerTareaPorId } = require('../controllers/tareaControllers')
const {validarTarea} = require('../middlewares/validarTarea')

const router = express.Router()

router.get('/', obtenerTareas)
router.post('/', validarTarea, crearTarea)
router.put('/:id', validarTarea, actualizarTarea)
router.delete('/:id', eliminarTarea)
router.get('/:id', obtenerTareaPorId)

module.exports = router
