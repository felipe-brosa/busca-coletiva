// Somente exemplos fictícios e públicos. Nunca adicionar envios privados neste módulo.
export const categories = ['Beleza e bem-estar', 'Casa e manutenção', 'Alimentação', 'Aulas e consultoria', 'Saúde', 'Transporte e logística', 'Educação', 'Tecnologia', 'Serviços profissionais', 'Eventos', 'Animais de estimação', 'Moda e costura', 'Esporte e lazer', 'Outros serviços'];
export const demoCatalog = [
  {"id":"demo-1","service":"Manicure","name":"Ateliê das Unhas","category":"Beleza e bem-estar","description":"Manicure e pedicure com esmaltação clássica, cuidado com as cutículas e acabamento delicado.","neighborhood":"Centro","area":"Atendimento no local","email":"manicure01@example.com"},
  {"id":"manicure-02","service":"Manicure","name":"Ana Clara Nail Studio","category":"Beleza e bem-estar","description":"Manicure especializada em unhas em gel e esmaltação duradoura. Cores clássicas e tendências para cada estilo.","email":"manicure02@example.com"},
  {"id":"manicure-03","service":"Manicure","name":"Bela Ponta Manicure","category":"Beleza e bem-estar","description":"Manicure com foco em unhas naturais, francesinha e acabamento de precisão.","email":"manicure03@example.com"},
  {"id":"manicure-04","service":"Manicure","name":"Camila Flores Unhas","category":"Beleza e bem-estar","description":"Manicure e pedicure com nail art floral, desenhos delicados e combinações personalizadas de cores.","email":"manicure04@example.com"},
  {"id":"manicure-05","service":"Manicure","name":"Dália Esmalteria","category":"Beleza e bem-estar","description":"Manicure com esmaltação em gel, blindagem e cuidados para unhas naturais.","email":"manicure05@example.com"},
  {"id":"manicure-06","service":"Manicure","name":"Elisa Mãos de Seda","category":"Beleza e bem-estar","description":"Manicure e pedicure com cuidado delicado e esmaltação tradicional.","email":"manicure06@example.com"},
  {"id":"manicure-07","service":"Manicure","name":"Fernanda Lima Nails","category":"Beleza e bem-estar","description":"Manicure com alongamento em fibra de vidro, manutenção e formatos personalizados.","email":"manicure07@example.com"},
  {"id":"manicure-08","service":"Manicure","name":"Gabriela Cor e Brilho","category":"Beleza e bem-estar","description":"Manicure especializada em glitter, efeitos cromados e unhas decoradas para ocasiões especiais.","email":"manicure08@example.com"},
  {"id":"manicure-09","service":"Manicure","name":"Helena Unhas Naturais","category":"Beleza e bem-estar","description":"Manicure voltada ao cuidado de unhas naturais, esmaltação discreta e acabamento clássico.","email":"manicure09@example.com"},
  {"id":"manicure-10","service":"Manicure","name":"Isabela Nail Art","category":"Beleza e bem-estar","description":"Manicure com desenhos autorais, decoração geométrica e combinações criativas de cores.","email":"manicure10@example.com"},
  {"id":"manicure-11","service":"Manicure","name":"Juliana Esmalte & Cia","category":"Beleza e bem-estar","description":"Manicure e pedicure com esmaltação tradicional, francesinha e variedade de cores.","email":"manicure11@example.com"},
  {"id":"manicure-12","service":"Manicure","name":"Karina Studio das Mãos","category":"Beleza e bem-estar","description":"Manicure com unhas em gel, blindagem e manutenção de alongamentos.","email":"manicure12@example.com"},
  {"id":"manicure-13","service":"Manicure","name":"Larissa Toque de Cor","category":"Beleza e bem-estar","description":"Manicure especializada em esmaltação colorida, degradês e nail art minimalista.","email":"manicure13@example.com"},
  {"id":"manicure-14","service":"Manicure","name":"Marina Unhas & Estilo","category":"Beleza e bem-estar","description":"Manicure e pedicure com francesinha reversa, esmaltação em gel e decoração delicada.","email":"manicure14@example.com"},
  {"id":"manicure-15","service":"Manicure","name":"Natália Pétala Nails","category":"Beleza e bem-estar","description":"Manicure com alongamentos, formatos amendoados e unhas decoradas com inspiração floral.","email":"manicure15@example.com"},
  {"id":"manicure-16","service":"Manicure","name":"Olívia Esmalteria","category":"Beleza e bem-estar","description":"Manicure com esmaltação clássica, tons neutros e acabamento elegante.","email":"manicure16@example.com"},
  {"id":"manicure-17","service":"Manicure","name":"Priscila Arte nas Unhas","category":"Beleza e bem-estar","description":"Manicure e pedicure com desenhos à mão livre e decoração para festas.","email":"manicure17@example.com"},
  {"id":"manicure-18","service":"Manicure","name":"Renata Brilho Natural","category":"Beleza e bem-estar","description":"Manicure com foco em unhas curtas, esmaltação tradicional e cuidados com as mãos.","email":"manicure18@example.com"},
  {"id":"manicure-19","service":"Manicure","name":"Sofia Studio Nail","category":"Beleza e bem-estar","description":"Manicure especializada em alongamentos, unhas em gel e manutenção com acabamento fino.","email":"manicure19@example.com"},
  {"id":"manicure-20","service":"Manicure","name":"Valentina Cor de Unha","category":"Beleza e bem-estar","description":"Manicure e pedicure com cores vibrantes, nail art e combinações para diferentes estilos.","email":"manicure20@example.com"},
  { id: 'demo-2', service: 'Eletricista', name: 'Elétrica de Confiança', category: categories[1], description: 'Eletricista para instalação de luminárias, pequenos reparos e manutenção elétrica residencial.', neighborhood: 'Jardim', area: 'Atendimento em domicílio', email: 'eletricista@example.com' },
  { id: 'demo-3', service: 'Restaurante', name: 'Cozinha da Vila', category: categories[2], description: 'Restaurante com refeições caseiras, encomendas e almoço preparado todos os dias.', neighborhood: 'Vila Nova', area: 'Retirada no local e entrega', email: 'restaurante@example.com' }
];

const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
export function searchCatalog({ query = '', category = '', neighborhood = '' } = {}) {
  if (![query, category, neighborhood].some(value => value.trim())) return [];
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return demoCatalog.filter(item => (!category || item.category === category)
    && normalize(item.neighborhood).includes(normalize(neighborhood))
    && terms.every(term => normalize([item.name, item.service, item.category, item.description, item.neighborhood, item.area].join(' ')).includes(term)));
}
