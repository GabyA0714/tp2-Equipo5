# TP1 Back - Clínica Médica "DiagnoCare"

Proyecto backend desarrollado en **Node.js + Express**, con almacenamiento en **archivos JSON**, siguiendo programación orientada a objetos (POO), modularización y rutas dinámicas.

## Objetivo
Implementar un sistema de gestión para una clínica médica, resolviendo problemáticas actuales en la organización de turnos, stock de insumos y administración.

## Funcionalidades
- **Gestión de empleados**
  - Alta, baja, modificación y consulta de médicos y administrativos.
  - Validación de roles y áreas desde archivos de configuración (`roles.json` y `areas.json`).
- **Gestión de pacientes**
  - Alta, baja, modificación y consulta de pacientes registrados.
  - Validación de campos obligatorios.
- **Gestión de Insumos**
  - Alta, baja, modificación y consulta de insumos.
  - Validación de categorias y tipos de unidades desde archivos de configuración (`config.json`).
- **Gestión de Tareas**
  - Creación, modificación, eliminación y consulta de tareas.
  - Validación de estados, prioridades, areas, Id de pacientes y empleados (`areas.json`, `pacientes.json`, `empleados.json` y `config.json`).
  - Busqueda de tareas por filtro.

## 🗂️ Estructura del proyecto
```
/src
├── /controllers → Lógica de negocio
├── /models → Clases (POO)
├── /routes → Endpoints de la API
├── /middlewares → Middlewares personalizados
├── /data → Archivos JSON (base de datos)
├── /lib → Funciones comunes, utilidades
└── index.js → Configuración principal de Express
```

## 👥 Equipo de Desarrollo y Responsabilidades
Integrantes del equipo y sus responsabilidades

- **Gabriela Aguilera**
  - Módulo: Pacientes
  - Responsabilidad: Desarrollo completo (API + Vistas Pug)

- **Facundo Azcue**
  - Módulo: Empleados
  - Responsabilidad: Desarrollo completo (API + Vistas Pug)

- **María Belén Cantarini Echezarreta**
  - Módulo: Tareas y Filtros
  - Responsabilidad: Desarrollo del backend (API)
- **Damián Marcelo Gómez De Leo**
  - Módulo: Tareas y Filtros
  - Responsabilidad: Desarrollo del backend y frontend (Vistas Pug)
- **Emiliano Nuñez**
  - Módulo: Insumos
  - Responsabilidad: Desarrollo completo (API + Vistas Pug)

## 🚀 Cómo ejecutar el proyecto
- Clonar el repositorio
```
git clone https://github.com/fazcue/ifts-29-back-tp1.git
```
- Instalar dependencias
```
npm i
```
- Iniciar aplicación
```
npm start
```
La API se levantará en http://localhost:5000/
