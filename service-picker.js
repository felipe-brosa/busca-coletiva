import {serviceOptions, suggestions, addService} from './services.js';
export function attachServicePicker(root, selected, onChange) {
  const input = root.querySelector('input');
  const list = root.querySelector('[role=listbox]');
  const chips = root.querySelector('.service-chips');
  const status = root.querySelector('[role=status]');
  let items = [], active = -1;
  const close = () => { list.hidden = true; input.setAttribute('aria-expanded','false'); input.removeAttribute('aria-activedescendant'); active = -1; };
  const highlight = () => {
    [...list.children].forEach((el,i) => el.setAttribute('aria-selected', String(i === active)));
    if (active >= 0) { input.setAttribute('aria-activedescendant',list.children[active].id); list.children[active].scrollIntoView({block:'nearest'}); }
  };
  function select(item) {
    const option = item.create ? addService(item.name) : item;
    if (option && !selected.includes(option.id)) selected.push(option.id);
    onChange([...selected]); input.value = ''; renderChips(); close(); input.focus();
    status.textContent = `${option.name} selecionado.`;
  }
  function renderChips() {
    chips.replaceChildren();
    selected.forEach(id => {
      const item = serviceOptions.find(option => option.id === id);
      if (!item) return;
      const chip = document.createElement('span'); chip.className = 'service-chip';
      const name = document.createElement('span'); name.textContent = item.name;
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.setAttribute('aria-label',`Remover ${item.name}`);
      remove.addEventListener('click', () => { selected.splice(selected.indexOf(id),1); onChange([...selected]); renderChips(); close(); input.focus(); status.textContent = `${item.name} removido.`; });
      chip.append(name,remove); chips.append(chip);
    });
  }
  function show() {
    items = suggestions(input.value,selected); active = -1; list.replaceChildren(); input.removeAttribute('aria-activedescendant');
    items.forEach((item,i) => {
      const option = document.createElement('li'); option.id = `service-suggestion-${i}`; option.setAttribute('role','option'); option.setAttribute('aria-selected','false');
      option.textContent = item.create ? `Adicionar “${item.name}”` : item.name;
      option.addEventListener('mousedown', e => e.preventDefault());
      option.addEventListener('click', () => select(item)); list.append(option);
    });
    list.hidden = !items.length; input.setAttribute('aria-expanded',String(items.length > 0));
  }
  input.addEventListener('input',show);
  input.addEventListener('focus', () => { if (input.value) show(); });
  input.addEventListener('blur',close);
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (['ArrowDown','ArrowUp'].includes(e.key)) {
      e.preventDefault(); if (list.hidden) show(); if (!items.length) return;
      active = active < 0 ? (e.key === 'ArrowDown' ? 0 : items.length - 1) : (active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; highlight();
    }
    if (e.key === 'Enter') { e.preventDefault(); if (!list.hidden && items.length) select(items[active >= 0 ? active : 0]); }
  });
  renderChips();
}
