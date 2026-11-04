# 001 — Recordatorios y confirmación de citas
Estado: propuesta revisada por el agente; pendiente de validación personal de Elymar y del consultorio.

## Problema
La asistente envía recordatorios uno por uno mientras cerca del 30 % de pacientes no asiste. Necesita identificar y recordar citas próximas, y saber cuáles se confirmaron o requieren intervención.

## Diseño de solución
Un panel consume citas de un adaptador de agenda. El reloj del demo está fijado al 3 de noviembre de 2026, 09:00, America/Guayaquil. La asistente ejecuta «Procesar recordatorios», equivalente a una ejecución del futuro programador. Son elegibles citas futuras a no más de 24 horas, no canceladas, con teléfono internacional válido y autorización. Un adaptador simula aceptación o fallo del envío. Aceptado no significa entregado o leído.

Cada evento tiene ID, nombre ficticio, teléfono, autorización, inicio y estado. Cada recordatorio se identifica por ID de evento + inicio, evitando duplicados por ejecución. El panel muestra resultado, fecha y mensaje. Un simulador de paciente permite confirmar o solicitar cambio sólo después de un envío aceptado. Solicitar cambio no modifica Calendar. Cancelar impide envíos y respuestas posteriores. El almacenamiento local conserva el demo al recargar en el mismo navegador; no hay coordinación entre dispositivos.

Mensaje: «Hola, {nombre}. Te recordamos tu cita con la Dra. Laura el {fecha} a las {hora}. ¿Puedes asistir? Puedes confirmar o solicitar un cambio. Gracias.» Sin tratamiento ni diagnóstico.

## Alcance
Incluye agenda ficticia, procesamiento manual del ciclo de recordatorios, estados, simulación de respuesta y fallos, historial local y reinicio.
Excluye conexiones reales, WhatsApp real, tareas en segundo plano, usuarios/autenticación, expediente, facturación y seguimiento de tratamientos. La función real requerirá scheduler, proveedor, webhooks autenticados, almacenamiento transaccional e idempotencia del lado servidor.

## Criterios de aceptación
- CA1 Elegibilidad: dado el reloj del demo, procesar envía únicamente para eventos futuros dentro de 24 h, activos, con teléfono válido y autorización; excluye pasados, lejanos, cancelados o no autorizados.
- CA2 Idempotencia: dos ejecuciones para la misma cita e inicio producen como máximo un envío aceptado. Recargar conserva los aceptados en el mismo navegador.
- CA3 Fallos: un envío simulado fallido aparece como error, no como enviado; al quitar el fallo y reintentar pasa a enviado una sola vez. Los datos inválidos muestran la causa sin envío.
- CA4 Respuestas: una cita con envío aceptado puede confirmarse o solicitar cambio; el estado cambia y la fecha permanece intacta. Confirmación no registra asistencia. Una cita cancelada no admite respuestas.
- CA5 Cancelación: cancelar antes de procesar impide el envío; cancelar después conserva historial pero bloquea futuras respuestas y envíos.

## Revisión de ambigüedades, v0.1 → v0.2
Precisar antes de implementar: ventana (0,24h], aceptar envío no implica entrega, respuesta sólo tras envío, persistencia limitada al navegador y cancelación posterior bloquea respuestas. No reducir criterios ante defectos.

## Validación humana pendiente
Revisar la ventana de 24 h, texto, autorización de contacto, política de cambios y alcance simulado. Registrar aquí nombre, fecha y modificaciones reales después de tu revisión. No completar automáticamente.

## Éxito posterior al piloto
Comparar inasistencias/citas que debían ocurrir y minutos diarios de trabajo manual durante períodos comparables. No atribuir reducción al demo sin datos.
