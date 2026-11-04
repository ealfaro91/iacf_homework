export const NOW = Date.parse('2026-11-03T09:00:00-05:00');
export function seed(){return [
{id:'a',name:'Sofía Mendoza',phone:'+593990000001',consent:true,start:'2026-11-03T15:00:00-05:00',status:'pending'},
{id:'b',name:'Carlos Rivera',phone:'+593990000002',consent:true,start:'2026-11-04T08:30:00-05:00',status:'pending'},
{id:'c',name:'Valeria Torres',phone:'+593990000003',consent:true,start:'2026-11-03T17:00:00-05:00',status:'pending',fail:true},
{id:'d',name:'Mateo Ruiz',phone:'',consent:true,start:'2026-11-04T09:00:00-05:00',status:'pending'},
{id:'e',name:'Lucía Castro',phone:'+593990000005',consent:false,start:'2026-11-03T16:00:00-05:00',status:'pending'},
{id:'f',name:'Andrés Vega',phone:'+593990000006',consent:true,start:'2026-11-05T10:00:00-05:00',status:'pending'}];}
export const key = a => a.id+'|'+a.start;
export function reason(a,now=NOW){const dt=Date.parse(a.start)-now;if(a.status==='cancelled')return 'Cita cancelada';if(!Number.isFinite(dt)||dt<=0||dt>86400000)return 'Fuera de las próximas 24 horas';if(!a.consent)return 'Sin autorización de contacto';if(!/^\+[1-9]\d{7,14}$/.test(a.phone))return 'Falta un teléfono válido';return '';}
export function process(state,now=NOW){for(const a of state.appointments){const k=key(a);if(reason(a,now)||state.log[k]?.status==='sent')continue;state.log[k]={status:a.fail?'error':'sent',at:new Date(now).toISOString(),message:message(a)};}return state;}
export function reply(state,id,status){const a=state.appointments.find(a=>a.id===id);if(!a||a.status==='cancelled'||state.log[key(a)]?.status!=='sent'||!['confirmed','change'].includes(status))return false;a.status=status;return true;}
export function cancel(state,id){const a=state.appointments.find(a=>a.id===id);if(a)a.status='cancelled';}
export const date = a => new Intl.DateTimeFormat('es-EC',{timeZone:'America/Guayaquil',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(a.start));
export const message = a => `Hola, ${a.name}. Te recordamos tu cita con la Dra. Laura el ${date(a)}. ¿Puedes asistir? Puedes confirmar o solicitar un cambio. Gracias.`;
