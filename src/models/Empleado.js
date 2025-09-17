const { v4: uuidv4 } = require('uuid')

class Empleado {
    constructor(nombre, apellido, dni, email, rol, area) {
        this.id = uuidv4()
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.email = email
        this.rol = rol
        this.area = area
    }
}

module.exports = Empleado
