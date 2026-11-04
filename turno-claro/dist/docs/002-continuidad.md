# Paso 2 — SPEC 002: seguimiento de tratamientos sin próxima cita
Versión 1.0. Propuesta para entrega académica; validación humana y piloto pendientes.

## Problema
Los pacientes pueden dejar de regresar al sentir menos dolor. La asistente no tiene una lista fiable de tratamientos que necesitan próxima sesión ni registro de las gestiones. Un recordatorio de una cita ya existente no resuelve la falta de próxima cita.

## Usuario y objetivo
Camila, asistente de un consultorio pequeño: identificar pendientes y registrar contacto o próxima sesión. La doctora determina la fecha recomendada y confirma la finalización. No hay consejo clínico ni decisiones automáticas sobre periodicidad.

## Diseño
Nueva página principal «Continuidad» con filtros pendientes/con cita/finalizados/todos, búsqueda por nombre, tarjetas priorizadas y panel de gestión e historial. La agenda original permanece en agenda.html.
Registro administrativo: ID, nombre ficticio, etiqueta del plan, sesiones realizadas y previstas, fecha recomendada, autorización de contacto, próxima cita opcional, estado activo/finalizado e historial con fecha. El formulario permite crear registros. No guardar diagnóstico ni expediente.

Reloj de referencia del demo: 2026-11-03 a las 09:00 en Quito. Un pendiente es un registro activo sin cita futura (posterior a las 09:00 del día de referencia), con fecha recomendada menor o igual a ese día. Orden: fecha más antigua primero y luego nombre. Un paciente sin autorización sigue visible pero no admite contacto. Una cita pasada no suprime el pendiente. Registrar contacto no quita al paciente de la cola. La finalización la registra explícitamente la usuaria; no se infiere por contar sesiones ni agendar.

Acciones: registrar un contacto administrativo simulado una vez por día; asignar fecha/hora futura de próxima cita mediante formulario; registrar finalización; crear tratamiento administrativo. Asignar cita resuelve el pendiente y añade historial; no escribe Calendar. La página conserva datos en localStorage, avisa si falla y permite restablecer sólo esta sección con confirmación. No hay envíos, cron, login, sincronización entre dispositivos ni integraciones reales.

## Criterios de aceptación
- CA1 Priorización: al abrir, listar sólo pendientes conforme a la regla y orden definidos. Búsqueda y filtros permiten encontrar con cita/finalizados sin alterar datos. Excluir futuros no vencidos y finalizados de pendientes.
- CA2 Registro: al crear con nombre, etiqueta, fecha válida, total entero positivo y realizadas entre 0 y total, añadir y persistir el registro. Rechazar vacíos, fechas imposibles y conteos inválidos; mostrar error sin crear.
- CA3 Contacto: en un pendiente autorizado registrar una gestión y su fecha en historial; una segunda en el mismo día no duplica ni aumenta métricas. Bloquear contacto sin autorización, con cita futura o finalizado. No enviar WhatsApp real.
- CA4 Resolución: aceptar sólo próxima cita posterior al reloj de referencia, guardarla en historial y sacar al paciente de pendientes. Registrar finalización explícita también lo retira y bloquea acciones. Rechazar cita pasada/fecha inválida y cambios en registros finalizados sin modificar datos.
- CA5 Persistencia y métricas: recargar conserva registros e historial del mismo navegador. Calcular pendientes, gestiones de hoy y tratamientos contactados con próxima cita a partir de registros únicos; nunca mostrar división por cero ni datos del demo como resultados clínicos. Avisar si el guardado falla.

## Métricas de éxito — metas propuestas, no resultados obtenidos
| Métrica | Fórmula y fuente | Objetivo / ventana |
| --- | --- | --- |
| Cobertura de seguimiento | Pendientes autorizados al inicio del día que reciben primera gestión / pendientes autorizados al inicio del día. Capturar cohorte diaria e historial en piloto. | ≥90 % al cierre de cada jornada durante 4 semanas. |
| Conversión a próxima cita | Pacientes de la cohorte de primer contacto que agendan dentro de 7 días / pacientes únicos de esa cohorte con 7 días completos de observación. Eventos contacto y cita. | ≥50 % en piloto de 4 semanas; esperar 7 días tras último contacto. |
| Continuidad real | Pacientes que asisten a la próxima sesión dentro del plazo indicado / pacientes cuya siguiente sesión debía ocurrir en el período. Registro de asistencia del consultorio. | Medir 4 semanas de base y buscar +15 puntos porcentuales en 8 semanas; meta hipotética. |
| Tiempo operativo | Mediana de minutos diarios dedicados a identificar y gestionar pendientes, registro manual al inicio/fin. | Reducir ≥30 % contra línea base de 5 jornadas, al terminar 4 semanas. |
| Duplicados | Gestiones repetidas para mismo paciente/día / gestiones totales. Historial. | 0 en pruebas y piloto. |

Instrumentación actual: historial local de creación/contacto/cita/finalización. Panel muestra conteos de demo y «contactados con cita»: contactados únicos que actualmente tienen cita futura / contactados únicos. Es un indicador del estado local, NO la conversión a 7 días ni evidencia de asistencia. El piloto requiere almacenamiento compartido, cohortes y eventos de asistencia externos; no implementados.

## Trazabilidad y revisión
CA1–CA5 se verifican en tests/continuity.test.mjs y recorrido manual. Antes de implementar se precisó que cita pasada no equivale a continuidad, que contacto no resuelve pendiente y que una cita futura no prueba finalización. Ante fallos, aclarar primero aquí el comportamiento y después corregir código; no reducir criterios para aprobar.

### Corrección verificada durante QA — versión 1.1
CA2: la creación debe funcionar tanto en HTTPS publicado como en la vista previa HTTP local. Los identificadores administrativos deben ser únicos dentro de la colección y no depender de crypto.randomUUID. En la prueba de navegador se observó el error «crypto.randomUUID is not a function»; se reemplaza por un generador local que comprueba colisiones. No se usan estos IDs como credenciales.
