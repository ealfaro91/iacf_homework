# Turno Claro
Demo de Spec Driven Development para un consultorio dental pequeño. Feature: recordatorios y confirmación de citas.

## Entregables
- AGENTS.md: contexto persistente del agente.
- specs/001-recordatorios.md: problema, diseño, cinco criterios verificables, revisión de ambigüedades y validación humana pendiente.
- skills/turno-claro-brand/SKILL.md: procedimiento reutilizable de diseño de marca.
- dist/: aplicación HTML/CSS/JavaScript sin dependencias externas.
- tests/reminders.test.mjs: cinco pruebas del dominio vinculadas a CA1–CA5.

## Ejecutar
Con Python 3: `python3 -m http.server 8000 --directory dist`; abrir http://localhost:8000.
Con Node.js: `node --test tests/*.test.mjs` para las pruebas. No requiere npm install.

## Recorrido de demo
1. Procesar recordatorios: Sofía y Carlos tienen envío aceptado; Valeria presenta error; las otras citas se excluyen con motivo.
2. Confirmar a Sofía desde el simulador: contador de confirmadas pasa a 1.
3. Solicitar un cambio: cambia el estado sin cambiar el horario.
4. Resolver fallo de Valeria y volver a procesar: envío aceptado, sin duplicar los anteriores.
5. Cancelar una cita y comprobar que no admite más respuestas. Recargar conserva los datos en este navegador.
6. Usar Reiniciar demo para regresar al escenario inicial.

## Proceso SDD y límites
Se redactaron contexto, spec y skill antes del código. Se precisaron ventana temporal, semántica de envío y bloqueo por cancelación en v0.2 antes de implementar. No se inventaron fallos posteriores ni una aprobación humana.
La revisión personal exigida por la consigna queda pendiente: editar la sección de validación de la spec con tus decisiones reales.

Pruebas automatizadas: 5/5 aprobadas. Son pruebas del dominio, no una certificación de producción ni de integración. El demo no conecta Calendar o WhatsApp, no ejecuta un cron y no procesa información real. Un futuro sistema real necesita proveedor, autenticación, consentimientos, scheduler, webhooks y almacenamiento compartido con idempotencia transaccional.

La URL del demo se publica con acceso privado. La entrega en GitHub/Drive aún requiere conectar el servicio y publicar este proyecto allí; la URL del demo no sustituye ese requisito obligatorio.
