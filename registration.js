import {instagramUrl} from './services.js';
export const publicFields = ['name', 'serviceIds', 'category', 'description', 'whatsapp', 'email', 'website'];

export function validateRegistration(data) {
  const errors = {};
  for (const key of ['name', 'category', 'description', 'responsibleWhatsapp']) {
    if (!String(data[key] || '').trim()) errors[key] = 'Preencha este campo.';
  }
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
