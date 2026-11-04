import {serviceOptions,suggestions,addService,normalize} from './services.js';
export const pendingMarkup = '<details class="pending-info"><summary aria-label="Informações sobre o ramo pendente"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r=".8" fill="currentColor" stroke="none"/></svg></summary><span class="pending-tooltip">Ramo pendente de aprovação para inclusão.</span></details>';
// Desktop uses hover; touch and keyboard can toggle, and outside interaction dismisses.
document.addEventListener('click',event=>{
 const summary=event.target.closest('.pending-info summary');
 if(summary&&matchMedia('(hover: hover) and (pointer: fine)').matches&&event.detail!==0)event.preventDefault();
 document.querySelectorAll('.pending-info[open]').forEach(info=>{if(!info.contains(event.target))info.open=false;});
});
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.pending-info[open]').forEach(info=>{info.open=false;});});
const tickMarkup = '<svg class="selection-tick" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
const capitalizeFirst = value => value ? value.charAt(0).toLocaleUpperCase('pt-BR') + value.slice(1) : value;
export function attachServicePicker(root,selected,onChange) {
 const input=root.querySelector('input'),list=root.querySelector('[role=listbox]'),status=root.querySelector('[role=status]'),error=root.querySelector('.error');
 let current=serviceOptions.find(o=>o.id===selected[0])||null,items=[],active=-1;
 input.value=capitalizeFirst(current?.name||'');
 const indicator=document.createElement('span');indicator.className='branch-pending';root.querySelector('.service-autocomplete').append(indicator);
 const renderPending=()=>{const confirmed=Boolean(current)&&document.activeElement!==input;indicator.innerHTML=current?(current.approvalStatus==='pending'?pendingMarkup:(confirmed?tickMarkup:'')):'';input.classList.toggle('has-pending',current?.approvalStatus==='pending');input.classList.toggle('is-valid',confirmed);input.classList.toggle('has-tick',confirmed&&current.approvalStatus!=='pending');};
 renderPending();
 const close=()=>{list.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');active=-1;};
 function select(item,refocus=false) {
  const option=item.create?addService(item.name):item;if(!option)return;
  current=option;onChange([option.id]);input.value=capitalizeFirst(option.name);input.setAttribute('aria-invalid','false');error.textContent='';status.textContent=`${option.name} selecionado.${option.approvalStatus==='pending'?' Ramo pendente de aprovação para inclusão.':''}`;renderPending();close();if(refocus)document.querySelector('#field-description')?.focus();
 }
 function show(){
  items=suggestions(input.value);active=-1;list.replaceChildren();input.removeAttribute('aria-activedescendant');
  items.forEach((item,i)=>{const li=document.createElement('li');li.id=`service-suggestion-${i}`;li.setAttribute('role','option');li.setAttribute('aria-selected','false');li.textContent=item.create?`Solicitar inclusão de “${item.name}”`:item.correction?`Você quis dizer ${item.name}?`:item.name;li.addEventListener('pointerdown',e=>e.preventDefault());li.onclick=()=>select(item,true);list.append(li);});
  list.hidden=!items.length;input.setAttribute('aria-expanded',String(!!items.length));
  error.textContent=input.value.trim()&&!items.length?'Não reconhecemos esse ramo. Tente outro nome, como manicure ou técnico de informática.':'';
 }
 input.addEventListener('input',()=>{const start=input.selectionStart,end=input.selectionEnd;input.value=capitalizeFirst(input.value);if(start!==null)input.setSelectionRange(start,end);if(!current||normalize(input.value)!==normalize(current.name)){current=null;onChange([]);renderPending();}input.setAttribute('aria-invalid','false');show();});
 input.addEventListener('focus',()=>{renderPending();show();});
 input.addEventListener('blur',()=>{
  if(current&&normalize(input.value)===normalize(current.name)){renderPending();close();return;}
  const term=input.value.trim(),matches=suggestions(term),best=matches.find(o=>!o.create)||matches.find(o=>o.create);
  if(term&&best)select(best);else{current=null;onChange([]);renderPending();input.value='';error.textContent=term?'Escolha um ramo válido nas sugestões.':'';input.setAttribute('aria-invalid',String(!!term));close();}
 });
 input.addEventListener('keydown',e=>{
  if(e.key==='Escape'){e.preventDefault();close();}
  if(['ArrowDown','ArrowUp'].includes(e.key)){
   e.preventDefault();if(list.hidden)show();if(!items.length)return;
   active=active<0?(e.key==='ArrowDown'?0:items.length-1):(active+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;
   [...list.children].forEach((el,i)=>el.setAttribute('aria-selected',String(i===active)));input.setAttribute('aria-activedescendant',list.children[active].id);list.children[active].scrollIntoView({block:'nearest'});
  }
  if(e.key==='Enter'){e.preventDefault();if(!list.hidden&&items.length)select(items[active>=0?active:0],true);}
 });
}
