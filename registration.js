import {instagramUrl, serviceOptions} from './services.js';
export const publicFields = ['name', 'serviceIds', 'category', 'description', 'whatsapp', 'email', 'website'];

export function validateRegistration(data) {
  const errors = {};
  for (const key of ['name', 'description', 'responsibleWhatsapp']) {
    if (!String(data[key] || '').trim()) errors[key] = key === 'name' ? 'Informe seu nome ou o nome da empresa.' : key === 'description' ? 'Conte quais serviços ou produtos você oferece.' : 'Informe o WhatsApp do responsável com DDD.';
  }
  if (data.name?.trim() && (data.name.trim().length < 2 || data.name.trim().length > 160)) errors.name = 'Informe um nome com 2 a 160 caracteres.';
  if (data.description?.length > 600) errors.description = 'Use até 600 caracteres para descrever seus serviços ou produtos.';
  if (data.serviceIds?.length !== 1 || !serviceOptions.some(o => o.id === data.serviceIds?.[0])) errors.serviceIds = 'Selecione um ramo de atuação.';
  if (!data.whatsapp?.trim() && !data.email?.trim()) {
    errors.whatsapp = 'Informe pelo menos um contato público: WhatsApp comercial ou e-mail.';
  }
  for (const key of ['whatsapp', 'responsibleWhatsapp']) {
    if (data[key] && !/^\+?[\d\s().-]+$/.test(data[key])) errors[key] = 'Use apenas números, espaços e sinais de telefone.';
    else if (data[key] && ![10, 11].includes(data[key].replace(/\D/g, '').length)) errors[key] = 'Informe o telefone com DDD.';
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Informe um e-mail válido.';
  if (data.website) {
    try {
      const url = new URL(instagramUrl(data.website) || data.website);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    } catch { errors.website = 'Informe um endereço completo, começando com https://.'; }
  }
  if (!data.consent) errors.consent = 'Autorize a divulgação dos dados comerciais para continuar.';
  return errors;
}

export function toPublicPreview(data) {
  return Object.fromEntries(publicFields.map(key => [key, key === 'serviceIds' ? [...(data.serviceIds || [])] : key === 'website' ? instagramUrl(data[key] || '') || String(data[key] || '').trim() : String(data[key] || '').trim()]));
}
