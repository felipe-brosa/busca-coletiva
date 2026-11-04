export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim().replace(/\s+/g, ' ');
export const serviceOptions = 'Manicure|Pedicure|Eletricista|Encanador|Pintor|Diarista|Jardinagem|Restaurante|Confeitaria|Marmitas|Cabeleireiro|Barbearia|Massoterapia|Psicologia|Fisioterapia|Enfermagem|Nutrição|Transporte de passageiros|Fretes|Entregas|Motorista particular|Aulas particulares|Consultoria|Contabilidade|Informática|Design gráfico|Fotografia|Costura|Cuidados com animais'.split('|').map((name,i)=>({id:`service-${i+1}`,name}));
const more = 'Técnico de informática|Técnico de celulares|Assistência técnica|Programador|Desenvolvedor de software|Técnico de redes|Instalador de câmeras|Analista de sistemas|Designer|Web designer|Social media|Marketing digital|Redator|Tradutor|Revisor de textos|Jornalista|Publicitário|Arquiteto|Engenheiro civil|Engenheiro elétrico|Pedreiro|Azulejista|Gesseiro|Marceneiro|Carpinteiro|Serralheiro|Vidraceiro|Montador de móveis|Tapeceiro|Estofador|Dedetizador|Piscineiro|Chaveiro|Técnico de ar-condicionado|Instalador de energia solar|Soldador|Mecânico|Mecânico de motos|Funileiro|Borracheiro|Autoelétrica|Lava-rápido|Esteticista|Maquiador|Designer de sobrancelhas|Depilador|Trancista|Extensionista de cílios|Podólogo|Terapeuta ocupacional|Fonoaudiólogo|Dentista|Médico|Cuidador de idosos|Cuidador de pessoas|Personal trainer|Instrutor de pilates|Instrutor de yoga|Professor de dança|Professor de música|Professor de inglês|Professor de idiomas|Professor de matemática|Professor de reforço escolar|Babá|Recreador infantil|Advogado|Corretor de imóveis|Corretor de seguros|Administrador|Assistente virtual|Secretário|Organizador profissional|Organização de ambientes|Organizador de eventos|Cerimonialista|Decorador|Florista|Artesão|Ilustrador|Artista plástico|Músico|Cantor|DJ|Videomaker|Editor de vídeo|Buffet|Pizzaria|Padaria|Lanchonete|Hamburgueria|Cafeteria|Sorveteria|Doceria|Salgaderia|Comida congelada|Produtos naturais|Hortifruti|Mercearia|Supermercado|Açougue|Peixaria|Loja de roupas|Loja de calçados|Loja de acessórios|Loja de cosméticos|Loja de artesanato|Papelaria|Livraria|Loja de presentes|Loja de móveis|Loja de eletrônicos|Loja de materiais de construção|Brechó|Revendedor|Vendedor de produtos|Representante comercial|Distribuidora de bebidas|Perfumaria|Joalheria|Relojoeiro|Sapateiro|Alfaiate|Bordadeira|Lavanderia|Passadeira|Limpeza de estofados|Limpeza de piscinas|Limpeza pós-obra|Veterinário|Pet shop|Banho e tosa|Adestrador|Passeador de cães|Hospedagem de animais|Taxista|Mototaxista|Motoboy|Transportadora|Transporte escolar|Guia de turismo|Agência de viagens|Hotel|Pousada|Turismo|Agricultor|Produtor rural|Paisagista|Jardineiro|Reciclagem|Impressão gráfica|Comunicação visual|Serigrafia|Tatuador|Piercer|Cabeleireira|Cozinheiro|Confeiteiro|Padeiro|Barbeiro|Costureira|Nutricionista|Psicólogo|Fisioterapeuta|Enfermeiro|Contador|Fotógrafo|Massagista'.split('|');
for(const name of more) serviceOptions.push({id:`occupation-${serviceOptions.length+1}`,name});
export function distance(a,b) {
 const d=Array.from({length:a.length+1},(_,i)=>Array.from({length:b.length+1},(_,j)=>i?(j?0:i):j));
 for(let i=1;i<=a.length;i++) for(let j=1;j<=b.length;j++) {
  d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]) d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
 } return d[a.length][b.length];
}
// New names are requests for moderation; only basic text hygiene is enforced here.
export function canAddService(name) {
 const text=String(name).trim();
 return text.length>=3&&text.length<=100&&/\p{L}/u.test(text)&&!/[<>\x00-\x1f]/.test(text)&&text.split(/\s+/).length<=16;
}
export const matchKey = value => normalize(value).replace(/[^a-z0-9]/g,'');
export function addService(name) {
 name=name.trim().replace(/\s+/g,' ').slice(0,100);
 name=name.charAt(0).toLocaleUpperCase('pt-BR')+name.slice(1);
 const existing=serviceOptions.find(o=>matchKey(o.name)===matchKey(name));if(existing)return existing;
 if(!canAddService(name))return null;
 const option={id:crypto.randomUUID(),name,approvalStatus:'pending'};serviceOptions.push(option);return option;
}
// Compare compact forms and tolerate typos in both complete names and prefixes.
export function suggestions(query,selected=[]) {
 const term=matchKey(query);
 const ranked=serviceOptions.filter(o=>!selected.includes(o.id)).map(o=>{
  const name=matchKey(o.name);
  let score=Infinity,correction=false;
  if(name===term)score=0;
  else if(name.startsWith(term))score=1;
  else if(name.includes(term)||normalize(query).startsWith(normalize(o.name)+' '))score=2;
  else if(term.length>=4){
   const limit=term.length>=8?2:1;
   const full=distance(term,name);
   let prefix=Infinity;
   // Prefix tolerance stays anchored to prevent unrelated matches on short input.
   if(term.slice(0,2)===name.slice(0,2)){
    for(let n=Math.max(3,term.length-limit);n<=Math.min(name.length,term.length+limit);n++)prefix=Math.min(prefix,distance(term,name.slice(0,n)));
   }
   const edits=Math.min(full,prefix);
   if(edits<=limit){score=3+edits;correction=true;}
  }
  return {...o,score,correction};
 }).filter(o=>Number.isFinite(o.score)).sort((a,b)=>a.score-b.score).slice(0,8);
 // Adding a new, plausible name remains available beside similar existing names.
 if(term&&!serviceOptions.some(o=>matchKey(o.name)===term)&&canAddService(query))ranked.push({id:null,name:query.trim(),create:true});
 return ranked;
}
export function formatBrazilPhone(value) {
 let digits=String(value).replace(/\D/g,'');if(digits.startsWith('55')&&digits.length>11)digits=digits.slice(2);digits=digits.slice(0,11);
 if(!digits)return '';if(digits.length<=2)return '('+digits;
 const tail=digits.slice(2),split=tail.length>8?5:4;
 return `(${digits.slice(0,2)}) ${tail.slice(0,split)}${tail.length>split?'-'+tail.slice(split):''}`;
}
export function instagramUrl(value) {
 const text=value.trim();if(/^@[a-z\d._]{1,30}$/i.test(text))return 'https://www.instagram.com/'+text.slice(1)+'/';
 try{const url=new URL(/^https?:\/\//i.test(text)?text:'https://'+text);if(['instagram.com','www.instagram.com'].includes(url.hostname.toLowerCase()))return url.href;}catch{}return null;
}
