# TP1 Back - Clínica Médica "Salud Integral"

Proyecto backend desarrollado en **Node.js + Express**, con almacenamiento en **archivos JSON**, siguiendo programación orientada a objetos (POO), modularización y rutas dinámicas.

## Objetivo
Implementar un sistema de gestión para una clínica médica, resolviendo problemáticas actuales en la organización de turnos, stock de insumos y administración.

## Funcionalidades
- **Gestión de empleados**
  - Alta, baja, modificación y consulta de médicos y administrativos.
  - Validación de roles y áreas desde archivos de configuración (`roles.json` y `areas.json`).

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
