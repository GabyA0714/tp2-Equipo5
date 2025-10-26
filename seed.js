require('dotenv').config();
const mongoose = require('mongoose');

// Importa todos tus modelos
const Empleado = require('./models/EmpleadoMongo');
const Paciente = require('./models/PacienteMongo');

// --- 1. DATOS DE CONFIGURACIÓN (CONSTANTES DE LA APLICACIÓN) ---
const configData = {
    // Configuraciones para Tareas
    areas: [
        "Administración de Turnos", 
        "Atención Médica", 
        "Stock de Insumos", 
        "Facturación"
    ],
    estadosValidos: ["pendiente", "en progreso", "completada", "cancelada"],
    prioridadesValidas: ["Alta", "Media", "Baja"],
    tiposValidosPorArea: {
        "Administración de Turnos": [
            "Alta de turno para paciente",
            "Reprogramación o cancelación de cita",
            "Confirmación de asistencia"
        ],
        "Stock de Insumos": [
            "Carga de nuevo insumo al stock",
            "Control de vencimientos",
            "Reposición de materiales"
        ]
    },

    // Configuraciones para Empleados
    roles: ["administrador", "médico", "recepcionista", "encargado de stock"],

    // Configuraciones de Insumos (Nuevos campos)
    categorias: ["medicamento", "descartable", "instrumental"],
    unidades: ["unidad", "caja", "frasco", "litro"],
    estadosDelInsumo: ["vigente", "vencido", "agotado"]
};

// --- 2. DATOS DE PRUEBA (Para Empleados y Pacientes) ---
const pacientesDePrueba = [{ 
    nombre: "Laura", apellido: "Martínez", dni: "38112233", activo: true,
    email: "laura.m@test.com", telefono: "1155006600"
}];

const empleadosDePrueba = [{ 
    nombre: "Ricardo", apellido: "Silva", dni: "25998877", rol: "administrador", 
    area: "Administración de Turnos", email: "ricardo.s@test.com", activo: true
},{ 
    nombre: "Carla", apellido: "Rojas", dni: "30445566", rol: "médico", 
    area: "Atención Médica", email: "carla.r@test.com", activo: true
}];


// --- 3. FUNCIÓN PRINCIPAL DE SEEDING ---
async function seedDatabase() {
    console.log("Iniciando Seeding y conexión a MongoDB...");

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Conectado correctamente a MongoDB Atlas.');

        // 1. LIMPIEZA DE DATOS PREVIOS (Para un entorno de desarrollo limpio)
        await Config.deleteMany({});
        await Paciente.deleteMany({});
        await Empleado.deleteMany({});
        console.log("Datos antiguos de Configuración, Pacientes y Empleados eliminados.");

        // 2. INSERCIÓN DE CONFIGURACIÓN
        await Config.create(configData);
        console.log("✅ Documento de Configuración inicial cargado.");

        // 3. INSERCIÓN DE DATOS DE PRUEBA
        await Paciente.insertMany(pacientesDePrueba);
        await Empleado.insertMany(empleadosDePrueba);
        console.log(`✅ ${pacientesDePrueba.length} Paciente(s) y ${empleadosDePrueba.length} Empleado(s) de prueba cargados.`);

    } catch (error) {
        console.error('❌ ERROR FATAL durante el Seeding:', error.message);
    } finally {
        // 4. CERRAR LA CONEXIÓN
        await mongoose.connection.close();
        console.log("Conexión a MongoDB cerrada.");
    }
}

seedDatabase();