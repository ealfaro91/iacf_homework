# Contexto persistente — Turno Claro
Consultorio dental de la Dra. Laura, con una asistente. Google Calendar ya funciona. Cerca del 30 % de inasistencias es un dato del caso, no una medición del demo.

Objetivo de producto: reducir inasistencias y trabajo manual. La segunda entrega añade seguimiento administrativo de tratamientos sin próxima cita. No implementar expediente clínico ni facturación.

Antes de modificar código, leer docs/01-icp-personas.md, specs/001-recordatorios.md, specs/002-continuidad.md y skills/turno-claro-brand/SKILL.md. Usar español y datos ficticios. No enviar mensajes reales ni conectar cuentas sin configuración explícita. Mantener la etiqueta demo.

Separar dominio puro de interfaz y proveedores. Implementar estados explícitos, validar teléfono/autorización, no duplicar envíos. Google Calendar será fuente de fecha y cancelación en una futura integración. No confundir confirmado con atendido.

Si falla un criterio, revisar y precisar primero la spec, documentar la discrepancia y después corregir código y pruebas. No relajar criterios para conseguir pruebas verdes. Un defecto con requisito claro se corrige en código, registrando en la spec la aclaración o escenario de regresión.

Ejecutar node --test tests/*.test.mjs. Mantener trazabilidad CA→prueba. No afirmar validación humana ni resultados de negocio no observados.

Identidad visual actual: seguir docs/05-identidad-dental.md, que incorpora la preferencia posterior de la usuaria y sustituye los colores iniciales de la skill de marca.
