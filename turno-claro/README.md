# Turno Claro — entrega 2
Feature nuevo: seguimiento de tratamientos sin próxima cita.

## Los tres pasos
1. `docs/01-icp-personas.md`: ICP, compradora, usuaria y beneficiario; distingue hechos e hipótesis.
2. `specs/002-continuidad.md`: problema, diseño, cinco criterios, métricas con fórmula, meta, ventana y límites de instrumentación.
3. `docs/03-despliegue.md`: destino, URL, diferenciación y alcance del lanzamiento.

## Implementación
- `dist/index.html`, `continuity.css`, `continuity-ui.mjs`, `continuity.mjs`: feature nuevo.
- `dist/agenda.html`, `app.mjs`, `domain.mjs`, `style.css`: feature original conservado.
- `dist/entrega.html`: explicación navegable de la entrega.
- `AGENTS.md`: contexto actualizado.
- `skills/turno-claro-brand/SKILL.md`: skill de marca de clase 2.
- `tests/`: cinco pruebas por feature (10 en total).

Ejecutar `python3 -m http.server 8000 --directory dist` y abrir http://localhost:8000.
Pruebas: `node --test tests/*.test.mjs`.

## Límites
Demo con datos ficticios, reloj fijo de 3 de noviembre de 2026, 09:00 Quito, y persistencia en este navegador. Sin envío real, integraciones, scheduler ni datos compartidos. Metas de piloto propuestas, no resultados medidos. No ingresar información real de pacientes. Acceso privado existente preservado; un evaluador requiere autorización de acceso.
Validación personal de ICP y specs pendiente; no se ha atribuido una revisión humana que no ocurrió.

URL: https://turno-claro-dental-demo.wavycarat.chatgpt.site
