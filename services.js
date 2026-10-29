export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim().replace(/\s+/g, ' ');
export const serviceOptions = ['Manicure','Pedicure','Eletricista','Encanador','Pintor','Diarista','Jardinagem','Restaurante','Confeitaria','Marmitas','Cabeleireiro','Barbearia','Massoterapia','Psicologia','Fisioterapia','Enfermagem','Nutrição','Transporte de passageiros','Fretes','Entregas','Motorista particular','Aulas particulares','Consultoria','Contabilidade','Informática','Design gráfico','Fotografia','Costura','Cuidados com animais'].map((name, i) => ({id:`service-${i+1}`,name}));
export function addService(name) {
  name = name.trim().replace(/\s+/g, ' ').slice(0,100);
  if (!name) return null;
  let option = serviceOptions.find(item => normalize(item.name) === normalize(name));
  if (!option) { option = {id:crypto.randomUUID(),name}; serviceOptions.push(option); }
  return option;
}
export function suggestions(query, selected = []) {
  const term = normalize(query);
  const list = serviceOptions.filter(item => !selected.includes(item.id) && normalize(item.name).includes(term)).slice(0,8);
  if (term && !serviceOptions.some(item => normalize(item.name) === term)) list.push({id:null,name:query.trim(),create:true});
  return list;
}
export function formatBrazilPhone(value) {
  let digits = String(value).replace(/\D/g,'');
  if (digits.startsWith('55') && digits.length > 11) digits = digits.slice(2);
  digits = digits.slice(0,11);
  if (!digits) return '';
  if (digits.length <= 2) return '(' + digits;
  const tail = digits.slice(2);
  const split = tail.length > 8 ? 5 : 4;
  return `(${digits.slice(0,2)}) ${tail.slice(0,split)}${tail.length > split ? '-' + tail.slice(split) : ''}`;
}
export function instagramUrl(value) {
  const text = value.trim();
  if (/^@[a-z\d._]{1,30}$/i.test(text)) return 'https://www.instagram.com/' + text.slice(1) + '/';
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : 'https://' + text);
    if (['instagram.com','www.instagram.com'].includes(url.hostname.toLowerCase())) return url.href;
  } catch {}
  return null;
}
