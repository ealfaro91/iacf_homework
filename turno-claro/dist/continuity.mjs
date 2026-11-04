export const TODAY='2026-11-03';
export const CLOCK='2026-11-03T09:00:00-05:00';
export function validDay(s){if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return false;const d=new Date(s+'T12:00:00Z');return !Number.isNaN(+d)&&d.toISOString().slice(0,10)===s;}
export function validAppointment(s){if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s||''))return false;return validDay(s.slice(0,10))&&+s.slice(11,13)<24&&+s.slice(14,16)<60;}
export function future(t){return validAppointment(t.next)&&Date.parse(t.next+'-05:00')>Date.parse(CLOCK);}
export function pending(t){return t.status==='active'&&!future(t)&&t.due<=TODAY;}
export function ordered(rows){return [...rows].sort((a,b)=>a.due.localeCompare(b.due)||a.name.localeCompare(b.name));}
export function seedTreatments(){return [
{id:'t1',name:'Sofía Mendoza',plan:'Plan de 3 sesiones',done:1,total:3,due:'2026-10-27',consent:true,status:'active',history:[]},
{id:'t2',name:'Carlos Rivera',plan:'Control mensual',done:4,total:12,due:'2026-10-31',consent:true,status:'active',history:[]},
{id:'t3',name:'Valeria Torres',plan:'Plan de 4 sesiones',done:2,total:4,due:TODAY,consent:false,status:'active',history:[]},
{id:'t4',name:'Andrés Vega',plan:'Plan de 3 sesiones',done:2,total:3,due:'2026-11-02',consent:true,status:'active',next:'2026-11-06T10:00',history:[]},
{id:'t5',name:'Lucía Castro',plan:'Plan de 2 sesiones',done:2,total:2,due:'2026-10-30',consent:true,status:'completed',history:[]},
{id:'t6',name:'Mateo Ruiz',plan:'Control periódico',done:1,total:6,due:'2026-11-10',consent:true,status:'active',history:[]}
];}
function event(t,type,extra={}){t.history.push({type,at:CLOCK,...extra});}
export function create(rows,data,id){const name=String(data.name||'').trim(),plan=String(data.plan||'').trim();const total=Number(data.total),done=Number(data.done);if(!name||!plan||name.length>80||plan.length>80||!validDay(data.due)||!Number.isInteger(total)||total<1||!Number.isInteger(done)||done<0||done>total)throw Error('Completa nombre, plan y fecha válida. Las sesiones deben ser enteras: realizadas entre 0 y el total, total mayor que 0.');const t={id,name,plan,total,done,due:data.due,consent:!!data.consent,status:'active',history:[]};event(t,'created');rows.push(t);return t;}
export function contact(t){if(!pending(t)||!t.consent)throw Error('El contacto requiere un pendiente activo y autorización.');if(t.history.some(e=>e.type==='contact'&&e.at.slice(0,10)===TODAY))throw Error('Ya registraste un contacto hoy.');event(t,'contact');}
export function schedule(t,next){if(t.status!=='active'||!validAppointment(next)||Date.parse(next+'-05:00')<=Date.parse(CLOCK))throw Error('Selecciona una fecha y hora futuras para un tratamiento activo.');t.next=next;event(t,'scheduled',{next});}
export function complete(t){if(t.status!=='active')throw Error('Este tratamiento ya está finalizado.');t.status='completed';event(t,'completed');}
export function metrics(rows){const contacted=rows.filter(t=>t.history.some(e=>e.type==='contact'));return {pending:rows.filter(pending).length,contacts:rows.filter(t=>t.history.some(e=>e.type==='contact'&&e.at.slice(0,10)===TODAY)).length,scheduled:contacted.filter(future).length,contacted:contacted.length};}

export function nextId(rows){let n=1;const ids=new Set(rows.map(t=>t.id));while(ids.has(`local-${n}`))n++;return `local-${n}`;}
