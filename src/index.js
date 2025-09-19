const express = require('express')
const empleadoRoutes = require('./routes/empleadoRoutes')
const pacienteRoutes = require('./routes/pacienteRoutes');
const tareaRoutes = require('./routes/tareaRoutes');


const PORT = process.env.PORT || 5000

const app = express()

// Middlewares
app.use(express.json())

// Rutas
app.use('/api/empleados', empleadoRoutes)
app.use('/api/tareas', tareaRoutes)
app.use('/api/pacientes', pacienteRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
