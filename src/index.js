const express = require('express')
const empleadoRoutes = require('./routes/empleadoRoutes')

const PORT = process.env.PORT || 5000

const app = express()

// Middlewares
app.use(express.json())

// Rutas
app.use('/api/empleados', empleadoRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
