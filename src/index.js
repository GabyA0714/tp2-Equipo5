const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
// API
const apiEmpleadoRoutes = require('./routes/apiEmpleadoRoutes')
const pacienteRoutes = require('./routes/pacienteRoutes')
// Vistas
const empleadoRoutes = require('./routes/empleadoRoutes')

const PORT = process.env.PORT || 5000
const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Pug
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')

// Rutas API
app.use('/api/empleados', apiEmpleadoRoutes)
app.use('/api/pacientes', pacienteRoutes)

// Rutas Vistas
app.use('/empleados', empleadoRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
