import { registrationValidationEnabled } from './config.js';
import {logoMarkup} from './logo.js';
import {serviceOptions, formatBrazilPhone, instagramUrl} from './services.js';
import {attachServicePicker} from './service-picker.js';
import { categories, searchCatalog, demoCatalog } from './catalog.js';
import { validateRegistration, toPublicPreview } from './registration.js';

const main = document.querySelector('main');
let draft = {};
let logoFile = null;
let logoPreview = null;
let registrationStep = 0;
let searchState = { query: '', category: '', neighborhood: '' };
let searched = false;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const options = (selected = '') => categories.map(c => `<option ${selected === c ? 'selected' : ''}>${escape(c)}</option>`).join('');
const labels = { serviceIds:'Serviços oferecidos', service:'Serviço oferecido', name:'Nome comercial ou profissional', category:'Categoria', description:'Descrição do serviço', neighborhood:'Bairro', area:'Área de atendimento', whatsapp:'WhatsApp comercial', email:'E-mail comercial', website:'Site ou Instagram', responsibleWhatsapp:'WhatsApp Responsável pelo cadastro' };
function field(key, { type = 'text', hint = '', required = false, wide = false, max = 160, label = labels[key] } = {}) {
  const id = `field-${key}`;
  const attrs = `id="${id}" name="${key}" aria-describedby="${id}-hint ${id}-error" ${required ? 'required' : ''}`;
  const value = escape(draft[key]);
  const control = key === 'category' ? `<select ${attrs}><option value="">Selecione uma categoria</option>${options(draft[key])}</select>` : key === 'description' ? `<textarea ${attrs} maxlength="600">${value}</textarea>` : `<input ${attrs} type="${type}" maxlength="${max}" value="${value}" ${type === 'tel' ? 'placeholder="(XX) XXXXX-XXXX"' : ''} ${type === 'tel' ? 'inputmode="tel"' : ''}>`;
  return `<div class="field ${wide ? 'wide' : ''}"><label for="${id}">${label}${required ? ' *' : ''}</label>${control}<p id="${id}-hint" class="hint">${hint}</p><p id="${id}-error" class="error"></p></div>`;
}
function result(item) {
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  params.set('id',item.id);
  const excerpt = item.description.length > 110 ? item.description.slice(0,107).trimEnd() + '…' : item.description;
  return `<a class="professional-card" href="#perfil?${escape(params.toString())}" aria-label="Ver perfil de ${escape(item.name)}"><div><span class="professional-area">${escape(item.category)}</span><h2>${escape(item.name)}</h2><p>${escape(excerpt)}</p></div><div class="card-photo"><img src="./assets/empresa.svg" alt="" width="280" height="220"></div></a>`;
}
function showProfessionalProfile() {
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const item = demoCatalog.find(item => item.id === params.get('id'));
  params.delete('id');
  const back = '#profissionais?' + params.toString();
  if (!item) { main.innerHTML = '<h1>Perfil não encontrado</h1><a href="#buscar">Voltar para a busca</a>'; return; }
  main.innerHTML = `<article class="professional-profile"><a href="${escape(back)}">← Voltar aos profissionais</a><div class="profile-heading"><div><span class="professional-area">${escape(item.category)}</span><h1>${escape(item.name)}</h1><p>${escape(item.service || item.category)}</p></div><div class="profile-photo"><img src="./assets/empresa.svg" alt="" width="280" height="220"></div></div><section class="profile-section"><h2>Sobre</h2><p>${escape(item.description)}</p></section><section class="profile-section"><h2>Contatos comerciais</h2><p>E-mail: <a href="mailto:${escape(item.email)}">${escape(item.email)}</a></p>${item.whatsapp ? '<p>WhatsApp: ' + escape(item.whatsapp) + '</p>' : ''}${item.website ? '<p>Site ou Instagram: ' + escape(item.website) + '</p>' : ''}</section></article>`;
}
function showProfessionals() {
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const service = params.get('servico') || '';
  const query = params.get('q') || '';
  searchState = {query, category:'', neighborhood:''}; searched = Boolean(query);
  const results = searchCatalog(searchState).filter(item => !service || (item.service || item.category) === service);
  main.innerHTML = `<section class="professionals-page"><a href="#buscar">← Voltar para a busca</a><div class="intro"><h1>${escape(service || 'Profissionais e empresas')}</h1><p>${results.length} ${results.length === 1 ? 'profissional ou empresa encontrado' : 'profissionais e empresas encontrados'}</p></div>${results.length ? '<div class="professional-grid">' + results.map(result).join('') + '</div>' : '<p>Nenhum profissional encontrado. Faça uma nova busca.</p>'}</section>`;
}
function showSearch() {
  main.innerHTML = `<section class="search-home" aria-label="Busca de serviços"><a class="search-logo" href="#buscar" aria-label="Busca Coletiva, início">${logoMarkup}</a><h1 class="sr-only">Busca de serviços</h1><form id="search" role="search"><div class="search-box"><input id="query" name="query" type="search" aria-label="Busque por um serviço" placeholder="Busque por um serviço" maxlength="160" autocomplete="off" value="${escape(searchState.query)}"><button type="submit" aria-label="Buscar serviços"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button></div></form><div id="results" aria-live="polite" aria-atomic="true"></div></section>`;
  const form = document.querySelector('#search');
  form.addEventListener('submit', event => {
    event.preventDefault();
    searchState = { query: new FormData(form).get('query').trim(), category: '', neighborhood: '' };
    searched = Boolean(searchState.query);
    renderResults();
  });
  form.elements.query.addEventListener('input', () => {
    if (!form.elements.query.value.trim()) {
      searched = false;
      searchState = {query:'', category:'', neighborhood:''};
      renderResults();
    }
  });
  renderResults();
}
function renderResults() {
  const el = document.querySelector('#results');
  if (!searched) { el.innerHTML = ''; return; }
  const results = searchCatalog(searchState);
  const groups = new Map();
  results.forEach(item => { const key=item.service || item.category; groups.set(key,(groups.get(key)||0)+1); });
  el.innerHTML = results.length ? [...groups].map(([service,count]) => `<article class="category-result"><div><h2>${escape(service)}</h2><p>${count} ${count === 1 ? 'profissional ou empresa encontrado' : 'profissionais e empresas encontrados'}</p></div><div class="actions"><a class="button" href="#profissionais?servico=${encodeURIComponent(service)}&q=${encodeURIComponent(searchState.query)}">Ver profissionais</a></div></article>`).join('') : '<div class="empty"><h2>Nenhum serviço encontrado</h2><p class="hint">Tente outro serviço ou nome de profissional.</p></div>';

}
function servicePickerMarkup() {
  return '<div class="field wide" id="service-picker"><label for="service-input">Qual seu serviço? *</label><div class="service-autocomplete"><input id="service-input" type="text" maxlength="100" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="service-suggestions" aria-describedby="service-hint field-serviceIds-error" autocomplete="off"><ul id="service-suggestions" role="listbox" aria-label="Serviços disponíveis" hidden></ul></div><div class="service-chips" aria-label="Serviços selecionados"></div><p class="hint" id="service-hint">Ex.: manicure, eletricista ou restaurante.</p><p class="error" id="field-serviceIds-error"></p><span class="sr-only" role="status" aria-live="polite"></span></div>';
}
const registrationSteps = [
  { title:'Como você trabalha?', subtitle:'Escolha a opção que melhor representa seu trabalho.' },
  { title:'Como você quer ser encontrado?', subtitle:'Informe seu nome e escolha um logotipo ou uma foto.' },
  { title:'Vamos conhecer seu trabalho?', subtitle:'Conte o que você faz para que os clientes encontrem você.' },
  { title:'Como os clientes falam com você?', subtitle:'Escolha os contatos que deseja divulgar no seu anúncio.' },
  { title:'Só falta o contato do responsável', subtitle:'Este número é privado e será usado apenas para tratar do cadastro.' }
];
function wizardProgress(step) {
  const percent = Math.min(100, Math.max(0, (step - 1) * 25));
  return `<div class="registration-track" data-progress="${percent}" role="progressbar" aria-label="Progresso do cadastro" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}">${['blue','yellow','orange','turquoise'].map(color=>'<span class="progress-segment '+color+' complete"></span>').join('')}</div>`;
}
function updateProgress(step) {
  const progress = document.querySelector('#registration-progress');
  progress.hidden = step === 1;
  progress.innerHTML = wizardProgress(step);
}
function alignRegistrationContent() {
  if (!document.body.classList.contains('registration-page')) {
    main.style.setProperty('--page-top', document.querySelector('header').getBoundingClientRect().bottom + 'px');
    return;
  }
  let stage = main.querySelector(':scope > .registration-stage');
  if (!stage) {
    stage = document.createElement('div');
    stage.className = 'registration-stage';
    for (const child of [...main.children]) if (child.tagName !== 'FOOTER') stage.appendChild(child);
    main.prepend(stage);
  }
  const top = document.querySelector('#registration-progress').getBoundingClientRect().bottom;
  main.style.setProperty('--registration-top', top + 'px');
}
const registrationResize = new ResizeObserver(() => alignRegistrationContent());
registrationResize.observe(document.querySelector('header'));
registrationResize.observe(document.querySelector('#registration-progress'));
window.addEventListener('resize', alignRegistrationContent);
function moveStep(step) {
  registrationStep = step;
  showForm();
  main.scrollTop = 0; window.scrollTo(0,0);
  document.querySelector('.wizard h1').focus({preventScroll:true});
}
function showForm() {
  const footer = document.querySelector('footer');
  if (footer && main.contains(footer)) document.body.appendChild(footer);
  updateProgress(registrationStep + 1);
  const company = draft.profile === 'company';
  const step = registrationSteps[registrationStep];
  let content = '';
  if (registrationStep === 0) {
    content = `<fieldset class="profile-choices"><legend class="sr-only">Escolha seu perfil</legend><label class="profile-choice"><input type="radio" name="profile" value="individual" ${draft.profile === 'individual' ? 'checked' : ''} required><img src="./assets/prestador.svg" alt="" width="280" height="220"><span><strong>Sou um prestador individual</strong><small>Ofereço meus serviços por conta própria.</small></span></label><label class="profile-choice"><input type="radio" name="profile" value="company" ${company ? 'checked' : ''} required><img src="./assets/empresa.svg" alt="" width="280" height="220"><span><strong>Tenho uma pequena empresa</strong><small>Quero divulgar os serviços do meu negócio.</small></span></label><p id="profile-error" class="error"></p></fieldset>`;
  } else if (registrationStep === 1) {
    content = `<div class="fields">${field('name',{required:true,wide:true,label:company ? 'Qual o nome da sua empresa?' : 'Qual seu nome?'})}</div>`;
  } else if (registrationStep === 2) {
    content = `<div class="fields">${field('category',{required:true,wide:true,label:'Em qual categoria encaixa?'})}${servicePickerMarkup()}${field('description',{required:true,wide:true,label:'Breve resumo',hint:'Conte um pouco sobre o que você oferece. Até 600 caracteres.'})}</div>`;
  } else if (registrationStep === 3) {
    content = `<div class="fields">${field('whatsapp',{type:'tel',wide:true,max:24})}${field('email',{type:'email',wide:true,max:254})}${field('website',{type:'url',wide:true,max:300})}</div>`;
  } else {
    content = `<div class="fields">${field('responsibleWhatsapp',{type:'tel',required:true,wide:true,max:24})}</div><div class="notice"><p>Os dados do seu serviço e os contatos comerciais serão públicos após a aprovação. O WhatsApp do responsável ficará privado.</p></div><label class="check" for="consent"><input id="consent" name="consent" type="checkbox" ${draft.consent ? 'checked' : ''} aria-describedby="consent-error"><span>Autorizo a divulgação dos dados comerciais informados após a aprovação.</span></label><p id="consent-error" class="error"></p>`;
  }
  main.innerHTML = `<section class="wizard ${registrationStep === 0 ? 'wizard-profile' : 'wizard-columns'}"><div class="intro"><h1 tabindex="-1">${step.title}</h1><p>${step.subtitle}</p></div>${registrationStep ? '<div class="layout"><div class="registration-left">' : ''}<form id="registration" novalidate><p id="form-errors" role="alert" class="error" hidden></p>${registrationStep ? '<div class="panel">' : ''}${content}${registrationStep ? '</div>' : ''}<div class="actions">${registrationStep ? '<button type="button" id="previous" class="secondary">Voltar</button>' : ''}<button type="submit" ${registrationValidationEnabled && registrationStep === 0 && !draft.profile ? 'disabled' : ''}>${registrationStep === 4 ? 'Revisar meu cadastro' : 'Continuar'}</button></div></form>${registrationStep ? '</div><aside class="registration-illustration" aria-label="Ilustração do seu perfil"><img src="./assets/' + (company ? 'empresa' : 'prestador') + '-' + ['','apresentacao','apresentacao','contatos','privacidade'][registrationStep] + '.svg" alt="" width="440" height="300"></aside></div>' : ''}</section>`;
  if (registrationStep === 1) {
    const upload = document.createElement('div'); upload.className='logo-upload wide';
    upload.innerHTML = '<p class="upload-title">Envie seu logotipo ou foto</p><div class="upload-controls"><label class="button secondary upload-button" for="logo-file">ENVIAR IMAGEM</label><input class="sr-only" id="logo-file" type="file" accept="image/png,image/jpeg,image/webp" aria-describedby="logo-hint logo-error"><p class="hint" id="logo-hint">Opcional. PNG, JPG ou WebP, até 1 MB.</p></div><p id="logo-error" class="error" role="alert"></p><div id="logo-preview"></div>';
    main.querySelector('#field-name').closest('.field').after(upload);
    const input = upload.querySelector('input');
    const renderLogo = () => {
      const container=upload.querySelector('#logo-preview');container.replaceChildren();
      if (!logoPreview) return;
      const img=document.createElement('img');img.src=logoPreview;img.alt='Prévia do seu logotipo';
      const name=document.createElement('span');name.textContent=logoFile.name;
      const remove=document.createElement('button');remove.type='button';remove.className='secondary';remove.textContent='Remover logotipo';
      remove.onclick=()=>{URL.revokeObjectURL(logoPreview);logoPreview=null;logoFile=null;input.value='';renderLogo();};container.append(img,name,remove);
    };
    input.addEventListener('change',()=>{
      const file=input.files[0];if(!file)return;
      const error=upload.querySelector('#logo-error');
      if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>1024*1024){error.textContent='Escolha uma imagem PNG, JPG ou WebP de até 1 MB.';input.value='';return;}
      const next=URL.createObjectURL(file);const probe=new Image();
      probe.onload=()=>{if(logoPreview)URL.revokeObjectURL(logoPreview);logoPreview=next;logoFile=file;error.textContent='';renderLogo();};
      probe.onerror=()=>{URL.revokeObjectURL(next);error.textContent='Não foi possível abrir esta imagem. Escolha outro arquivo.';};probe.src=next;
    });renderLogo();
  }
  const actions = main.querySelector('.actions');
  if (registrationStep && actions) {
    main.querySelector('.wizard').appendChild(actions);
    actions.querySelector('button[type=submit]').setAttribute('form', 'registration');
  }
  if (footer) main.appendChild(footer);
  alignRegistrationContent();
  const form = document.querySelector('#registration');
  const save = () => {
    const data = Object.fromEntries(new FormData(form));
    draft = {...draft,...data};
    if (registrationStep === 0) main.querySelector('button[type="submit"]').disabled = registrationValidationEnabled && !draft.profile;
    if (form.elements.consent) draft.consent = form.elements.consent.checked;
  };
  if (registrationStep === 2) attachServicePicker(document.querySelector('#service-picker'), [...(draft.serviceIds || [])], ids => { draft.serviceIds = ids; });
  form.querySelectorAll('input[type=tel]').forEach(input => {
    input.value = formatBrazilPhone(input.value);
    input.addEventListener('input', () => {
      const position = input.selectionStart;
      const digitsBefore = input.value.slice(0, position).replace(/\D/g,'').length;
      input.value = formatBrazilPhone(input.value);
      let caret = 0, count = 0;
      while (caret < input.value.length && count < digitsBefore) { if (/\d/.test(input.value[caret])) count++; caret++; }
      input.setSelectionRange(caret,caret); save();
    });
  });
  const website = form.elements.website;
  if (website) {
    website.type = 'text';
    const wrapper = document.createElement('div'); wrapper.className = 'social-field'; website.before(wrapper); wrapper.append(website);
    const icon = document.createElement('span'); icon.className = 'instagram-icon'; icon.setAttribute('aria-label','Instagram');
    icon.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>';
    wrapper.prepend(icon);
    const update = () => { wrapper.classList.toggle('is-instagram',Boolean(instagramUrl(website.value))); };
    website.addEventListener('input',update); update();
  }
  form.addEventListener('input', save);
  form.addEventListener('change', save);
  document.querySelector('#previous')?.addEventListener('click', () => { save(); moveStep(registrationStep - 1); });
  form.addEventListener('submit', event => {
    event.preventDefault(); save();
    const allErrors = validateRegistration(draft);
    const keys = [['profile'],['name'],['serviceIds','category','description'],['whatsapp','email','website'],['responsibleWhatsapp','consent']][registrationStep];
    if (!draft.profile) allErrors.profile = 'Escolha uma opção para continuar.';
    if (!draft.serviceIds?.length) allErrors.serviceIds = 'Selecione pelo menos um serviço.';
    const errors = registrationValidationEnabled ? keys.filter(key => allErrors[key]) : [];
    for (const key of keys) {
      const control = key === 'serviceIds' ? document.querySelector('#service-input') : form.elements[key];
      const message = document.getElementById(key === 'consent' ? 'consent-error' : key === 'profile' ? 'profile-error' : 'field-' + key + '-error');
      if (message) message.textContent = registrationValidationEnabled ? allErrors[key] || '' : '';
      if (control?.setAttribute) control.setAttribute('aria-invalid', registrationValidationEnabled && allErrors[key] ? 'true' : 'false');
    }
    const summary = document.querySelector('#form-errors'); summary.hidden = !errors.length;
    if (errors.length) {
      summary.textContent = 'Confira sua resposta para continuar.';
      const control = errors[0] === 'serviceIds' ? document.querySelector('#service-input') : form.elements[errors[0]];
      (control?.focus ? control : form.querySelector('input')).focus();
      return;
    }
    if (registrationStep < 4) moveStep(registrationStep + 1);
    else location.hash = 'revisar';
  });
}
function showReview() {
  if (registrationValidationEnabled && (!draft.profile || !draft.serviceIds?.length || !draft.name || Object.keys(validateRegistration(draft)).length)) { location.hash = 'cadastrar'; return; }
  updateProgress(6);
  const preview = toPublicPreview(draft);
  main.innerHTML = `<div class="intro"><h1>Está tudo certo?</h1><p>Confira as informações antes de enviar seu cadastro para análise.</p></div><div class="layout review-layout"><section><div class="panel"><h2>Informações que serão públicas</h2><dl class="summary">${Object.entries(preview).map(([key,value]) => `<dt>${labels[key]}</dt><dd>${escape(Array.isArray(value) ? value.map(id => serviceOptions.find(option => option.id === id)?.name || '').join(', ') : value)}</dd>`).join('')}</dl></div></section><aside class="aside"><div class="notice"><h2>Contato privado</h2><p>WhatsApp Responsável pelo cadastro: <strong>${escape(draft.responsibleWhatsapp)}</strong></p><p class="hint">Este número não faz parte das informações públicas.</p></div></aside></div><div class="actions review-actions"><a id="edit-registration" class="button secondary" href="#cadastrar">Editar informações</a><button id="finish" type="button">Enviar cadastro</button></div>`;
  document.querySelector('#edit-registration').addEventListener('click', () => { registrationStep = 1; });
  document.querySelector('#finish').addEventListener('click', () => { draft = {}; if(logoPreview)URL.revokeObjectURL(logoPreview);logoPreview=null;logoFile=null; registrationStep = 0; location.hash = 'concluido'; });
}
function showComplete() {
  updateProgress(7);
  main.innerHTML = `<section class="success"><span class="tag">Cadastro enviado</span><h1>Recebemos seu cadastro!</h1><p>Agora, a moderação vai revisar as informações do seu serviço.</p><div class="panel"><h2>O que acontece agora?</h2><p>Seu cadastro ficará aguardando análise da moderação. Após a aprovação, seus dados comerciais poderão aparecer na busca.</p><p>O WhatsApp do responsável continuará privado.</p></div><div class="actions"><a class="button" href="#buscar">Ir para a busca</a><a class="button secondary" href="#cadastrar">Cadastrar outro serviço</a></div></section>`;
}
function showInfo() {
  main.innerHTML = `<article class="text-page"><h1>Como a Busca Coletiva funciona</h1><p>Um lugar para encontrar serviços e os contatos comerciais de quem os oferece.</p><h2>Para quem procura um serviço</h2><p>Pesquise por serviço, nome ou categoria. Os resultados serão exibidos depois que você realizar uma busca. Fale diretamente com o profissional pelos contatos divulgados.</p><h2>Para quem quer divulgar seu trabalho</h2><p>Preencha o cadastro, revise os dados e envie para análise. A moderação precisará aprovar o anúncio antes de ele aparecer na busca.</p><h2>Quais informações serão públicas?</h2><p>Nome comercial ou profissional, categoria, descrição, os contatos comerciais informados: WhatsApp, e-mail e site ou Instagram.</p><h2>O que fica privado?</h2><p>O WhatsApp do responsável pelo cadastro e as informações internas da moderação. O contato do responsável será usado para tratar do cadastro.</p><div class="actions"><a class="button" href="#buscar">Encontrar um serviço</a></div></article>`;
}
function showPrivacy() {
  main.innerHTML = '<article class="text-page"><h1>Política de Privacidade</h1><p>Saiba quais informações são usadas na Busca Coletiva e quais dados fazem parte do seu anúncio.</p><h2>Informações do cadastro</h2><p>O cadastro reúne informações sobre seu serviço, seus contatos comerciais e o WhatsApp do responsável pelo cadastro.</p><h2>Informações públicas</h2><p>Os anúncios aprovados exibem nome comercial ou profissional, categoria, descrição, os contatos comerciais informados: WhatsApp, e-mail e site ou Instagram. Essas informações ficam disponíveis para quem busca serviços na Busca Coletiva.</p><h2>Contato privado do responsável</h2><p>O WhatsApp do responsável é destinado à comunicação sobre o cadastro e não faz parte do anúncio público.</p><h2>Finalidade dos dados</h2><p>As informações comerciais permitem apresentar seu serviço e facilitar o contato com clientes. O contato privado permite esclarecer informações relacionadas ao cadastro.</p><h2>Publicação e moderação</h2><p>Os cadastros passam por revisão antes de aparecer na busca. Ao cadastrar seu serviço, confira os contatos que deseja tornar públicos e informe apenas os dados necessários à divulgação do seu trabalho.</p><h2>Contatos comerciais</h2><p>Ao entrar em contato com um profissional ou acessar um site externo, você passa a utilizar o canal escolhido para essa comunicação. Compartilhe apenas as informações necessárias ao atendimento.</p><a href="#buscar">Voltar para a busca</a></article>';
}
function route() {
  const footer = document.querySelector('footer');
  if (footer && main.contains(footer)) document.body.appendChild(footer);
  const page = location.hash.slice(1).split('?')[0] || 'buscar';
  document.querySelector('#registration-progress').hidden = !['cadastrar','revisar','concluido'].includes(page);
  document.body.classList.toggle('professionals-list-page', page === 'profissionais');
  document.body.classList.toggle('registration-page', ['cadastrar','revisar','concluido'].includes(page));
  document.body.classList.toggle('search-page', page === 'buscar' || !['cadastrar','revisar','concluido','como-funciona','privacidade','profissionais','perfil'].includes(page));
  const routes = { perfil:showProfessionalProfile, profissionais:showProfessionals, privacidade:showPrivacy, buscar:showSearch, cadastrar:showForm, revisar:showReview, concluido:showComplete, 'como-funciona':showInfo };
  (routes[page] || showSearch)();
  if (footer) main.appendChild(footer);
  if (!document.body.classList.contains('registration-page')) {
    const stage = document.createElement('div');
    stage.className = 'page-stage';
    for (const child of [...main.children]) if (child.tagName !== 'FOOTER') stage.appendChild(child);
    main.prepend(stage);
  }
  alignRegistrationContent();
  document.querySelectorAll('nav a').forEach(a => { if (a.hash === `#${page}` || (a.hash === '#cadastrar' && ['revisar','concluido'].includes(page))) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
  document.title = `${({perfil:'Perfil profissional',profissionais:'Profissionais e empresas',buscar:'Encontre serviços',cadastrar:'Cadastre seu serviço',revisar:'Revise o cadastro',concluido:'Cadastro enviado',privacidade:'Política de Privacidade','como-funciona':'Como funciona'})[page] || 'Encontre serviços'} · Busca Coletiva`;
  main.scrollTop = 0; window.scrollTo(0,0); main.focus({preventScroll:true});
}
window.addEventListener('hashchange', route);
route();
