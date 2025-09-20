const express = require('express')
const path = require('path')
const methodOverride = require('method-override')

// API
const apiEmpleadoRoutes = require('./routes/apiEmpleadoRoutes')
const apiPacienteRoutes = require('./routes/apiPacienteRoutes') 
const apiTareaRoutes = require('./routes/apiTareaRoutes')
const apiInsumoRoutes = require('./routes/apiInsumoRoutes')



// Vistas
const empleadoRoutes = require('./routes/empleadoRoutes')
const tareaRoutes = require('./routes/tareaRoutes')
const pacienteRoutes = require('./routes/pacienteRoutes')
const insumoRoutes = require('./routes/insumoRoutes')



const PORT = process.env.PORT || 5000
const app = express()   // 

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Pug
app.set("views", path.join(__dirname, "views"))
app.set('view engine', 'pug')

// Rutas API
app.use('/api/empleados', apiEmpleadoRoutes)
app.use('/api/pacientes', apiPacienteRoutes) 
app.use('/api/tareas', apiTareaRoutes)
app.use('/api/insumos', apiInsumoRoutes)



// Rutas Vistas
app.use('/empleados', empleadoRoutes)
app.use('/tareas', tareaRoutes)
app.use('/pacientes', pacienteRoutes)
app.use('/insumos', insumoRoutes)


// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
