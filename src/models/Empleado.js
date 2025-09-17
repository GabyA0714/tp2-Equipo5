class Empleado {
    static contador = 0
    id
    nombre
    apellido
    dni
    email
    rol
    area

    constructor(nombre, apellido, dni, email, rol, area) {
        this.id = Empleado.contador
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.email = email
        this.rol = rol
        this.area = area

        Empleado.contador += 1
    }
}

module.exports = Empleado
