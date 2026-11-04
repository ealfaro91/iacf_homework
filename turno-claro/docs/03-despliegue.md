# Paso 3 — Lanzamiento y evolución
Destino: Sites, hosting disponible en este entorno. Las plataformas de la consigna son recomendaciones, no requisitos excluyentes. Aplicación estática sin instalación de paquetes. URL: https://turno-claro-dental-demo.wavycarat.chatgpt.site

Se preserva el acceso privado existente. La publicación no hace que el enlace sea accesible al evaluador: para una entrega externa, la propietaria debe autorizar acceso público o compartirlo con el evaluador. No se cambió audiencia automáticamente.

## Diferenciación respecto de clase 2
Antes: agenda con recordatorios y simulador de respuesta.
Ahora: inicio orientado a la asistente, navegación lateral, identidad dental azul, turquesa y blanca, cola de pacientes sin próxima cita, búsqueda, filtros, formulario de registro, historial y gestión en panel contiguo. La agenda original se conserva en agenda.html. El nuevo diseño se deriva de la necesidad de Camila de priorizar y recuperar contexto tras interrupciones.

## Alcance real de la publicación
Se publica un demo interactivo con formularios, validación y persistencia en el navegador. No es un sistema clínico productivo: no tiene servidor de datos, cuentas, integraciones ni mensajes reales. Todos los datos son ficticios. No ingresar pacientes reales. El despliegue en línea no demuestra mejora de métricas de negocio.

## Ejecutar y validar
`python3 -m http.server 8000 --directory dist`
`node --test tests/*.test.mjs`

Recorrido: abrir inicio → seleccionar Sofía → registrar contacto → guardar próxima cita futura → observar cambio de indicadores y cola → filtro Todos para consultar historial → recargar. Registrar un caso ficticio nuevo. Probar ausencia de autorización y fechas inválidas. Consultar la spec para casos restantes.
