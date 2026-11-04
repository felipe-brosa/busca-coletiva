// Presentation data only. Replace this module with an authenticated server API.
export const statusLabels = {pending:'Aguardando análise',changes:'Aguardando ajuste',approved:'Aprovado',rejected:'Rejeitado'};
export function createAdminRecords() {
  return [
    ['001','Mariana Alves','individual','Manicure','Manicure e pedicure, esmaltação em gel e unhas decoradas.','pending',false],
    ['002','Ateliê Raiz','company','Design de jardins comestíveis','Projetos de hortas e jardins comestíveis para casas e pequenos negócios.','pending',true],
    ['003','Oficina Horizonte','company','Eletricista','Instalações elétricas, iluminação e manutenção residencial.','pending',false],
    ['004','Clara Mendes','individual','Fotografia','Ensaios de família e fotografia de produtos para lojas.','pending',false],
    ['005','Cozinha da Vila','company','Restaurante','Refeições caseiras e encomendas para pequenos eventos.','changes',false],
    ['006','Estúdio Pixel','company','Web designer','Criação de sites e lojas virtuais para pequenos negócios.','approved',false],
    ['007','Ana Oliveira','individual','Costura','Ajustes de roupas e confecção sob medida.','approved',false],
    ['008','Espaço Aurora','company','Artesanato','Peças decorativas e presentes feitos à mão.','rejected',false],
  ].map(([id,name,profile,service,description,status,pendingBranch],i)=>({id,name,profile,service,description,status,pendingBranch,created:`2026-11-${String(4-i%4).padStart(2,'0')}`,email:`cadastro${id}@example.com`,whatsapp:'',website:i===1?'https://example.com':'',responsibleWhatsapp:'(00) 00000-0000',consent:true,history:[{date:'Recebimento',text:'Cadastro recebido para análise.'},...(status==='pending'?[]:[{date:'Última análise',text:statusLabels[status]}])]}));
}
export function decideRegistration(record, action, reason='') {
  if(!['approve','changes','reject'].includes(action))throw new Error('Ação inválida.');
  if(record.status!=='pending')throw new Error('Este cadastro já foi analisado.');
  if(action==='approve'&&record.pendingBranch)throw new Error('Aprove o novo ramo antes de publicar o cadastro.');
  if(action!=='approve'&&reason.trim().length<10)throw new Error('Descreva o motivo com pelo menos 10 caracteres.');
  record.status={approve:'approved',changes:'changes',reject:'rejected'}[action];
  record.history.push({date:'Agora',text:action==='approve'?'Cadastro aprovado para publicação.':`${statusLabels[record.status]}: ${reason.trim()}`});
}
export function registrationsCsv(records, includePrivate=false) {
  const columns=['ID','Nome','Perfil','Ramo de atuação','Serviços ou produtos','E-mail comercial','WhatsApp comercial','Site ou Instagram','Status','Data de envio','Ramo pendente',...(includePrivate?['WhatsApp do responsável']:[])];
  // Quoting alone does not prevent spreadsheet formula execution.
  const cell=value=>'"'+String(value??'').replace(/^[\s]*[=+@-]/,m=>"'"+m).replaceAll('"','""')+'"';
  const rows=records.map(r=>[r.id,r.name,r.profile==='company'?'Pequena empresa':'Prestador individual',r.service,r.description,r.email,r.whatsapp,r.website,statusLabels[r.status],r.created,r.pendingBranch?'Sim':'Não',...(includePrivate?[r.responsibleWhatsapp]:[])]);
  return '\uFEFF'+[columns,...rows].map(row=>row.map(cell).join(';')).join('\r\n');
}
