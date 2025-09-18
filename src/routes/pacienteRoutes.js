const express = require('express');
const { listarPacientes, crearPaciente, obtenerPaciente, actualizarPaciente, eliminarPaciente } = require('../controllers/pacienteControllers');
const { validarPaciente } = require('../middlewares/validarPaciente');

const router = express.Router();

router.get('/', listarPacientes);
router.get('/:id', obtenerPaciente);
router.post('/', validarPaciente, crearPaciente);
router.put('/:id', validarPaciente, actualizarPaciente);
router.delete('/:id', eliminarPaciente);

module.exports = router;
