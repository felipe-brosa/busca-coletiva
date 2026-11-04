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

// Cadastros fictícios para apresentação; contatos usam domínio reservado.
demoCatalog.push(...[
  {
    "id": "area-demo-1",
    "service": "Técnico de informática",
    "name": "Byte Oficina",
    "category": "Tecnologia",
    "description": "Formatação de computador, instalação de programas, remoção de vírus e manutenção de notebooks.",
    "email": "cadastro01@example.com"
  },
  {
    "id": "area-demo-2",
    "service": "Técnico de informática",
    "name": "Conecta Computadores",
    "category": "Tecnologia",
    "description": "Upgrade de SSD, recuperação de arquivos e configuração de computadores e redes Wi-Fi.",
    "email": "cadastro02@example.com"
  },
  {
    "id": "area-demo-3",
    "service": "Web designer",
    "name": "Estúdio Pixel",
    "category": "Tecnologia",
    "description": "Criação de sites, landing pages e lojas virtuais responsivas para pequenos negócios.",
    "email": "cadastro03@example.com"
  },
  {
    "id": "area-demo-4",
    "service": "Web designer",
    "name": "Marina Interfaces",
    "category": "Tecnologia",
    "description": "Design de sites, interfaces acessíveis e páginas para divulgação de produtos.",
    "email": "cadastro04@example.com"
  },
  {
    "id": "area-demo-5",
    "service": "Design gráfico",
    "name": "Traço Criativo",
    "category": "Serviços profissionais",
    "description": "Identidade visual, logotipos, cartões de visita e artes para redes sociais.",
    "email": "cadastro05@example.com"
  },
  {
    "id": "area-demo-6",
    "service": "Social media",
    "name": "Presença Digital",
    "category": "Serviços profissionais",
    "description": "Planejamento de conteúdo e gestão de Instagram para empresas e profissionais.",
    "email": "cadastro06@example.com"
  },
  {
    "id": "area-demo-7",
    "service": "Confeitaria",
    "name": "Doce Abraço",
    "category": "Alimentação",
    "description": "Bolos de aniversário, brigadeiros e doces personalizados para festas.",
    "email": "cadastro07@example.com"
  },
  {
    "id": "area-demo-8",
    "service": "Confeitaria",
    "name": "Ateliê Açúcar e Afeto",
    "category": "Alimentação",
    "description": "Bolos caseiros, cupcakes e sobremesas por encomenda.",
    "email": "cadastro08@example.com"
  },
  {
    "id": "area-demo-9",
    "service": "Marmitas",
    "name": "Sabor de Casa",
    "category": "Alimentação",
    "description": "Marmitas caseiras, refeições congeladas e opções vegetarianas.",
    "email": "cadastro09@example.com"
  },
  {
    "id": "area-demo-10",
    "service": "Padaria",
    "name": "Pão da Vila",
    "category": "Alimentação",
    "description": "Pães artesanais, focaccias e biscoitos de fabricação própria.",
    "email": "cadastro10@example.com"
  },
  {
    "id": "area-demo-11",
    "service": "Cabeleireiro",
    "name": "Studio Helena",
    "category": "Beleza e bem-estar",
    "description": "Cortes, escova, hidratação e coloração de cabelos.",
    "email": "cadastro11@example.com"
  },
  {
    "id": "area-demo-12",
    "service": "Barbearia",
    "name": "Barba & Estilo",
    "category": "Beleza e bem-estar",
    "description": "Corte masculino, acabamento e cuidados com a barba.",
    "email": "cadastro12@example.com"
  },
  {
    "id": "area-demo-13",
    "service": "Maquiador",
    "name": "Luiza Beleza",
    "category": "Beleza e bem-estar",
    "description": "Maquiagem social, produção para festas e aulas de automaquiagem.",
    "email": "cadastro13@example.com"
  },
  {
    "id": "area-demo-14",
    "service": "Costura",
    "name": "Linha e Afeto",
    "category": "Moda e costura",
    "description": "Ajustes de roupas, barras de calças e confecção de peças sob medida.",
    "email": "cadastro14@example.com"
  },
  {
    "id": "area-demo-15",
    "service": "Loja de roupas",
    "name": "Veste Leve",
    "category": "Moda e costura",
    "description": "Roupas casuais, camisetas e acessórios para o dia a dia.",
    "email": "cadastro15@example.com"
  },
  {
    "id": "area-demo-16",
    "service": "Artesão",
    "name": "Feito com Carinho",
    "category": "Serviços profissionais",
    "description": "Peças artesanais em crochê, presentes e decoração para casa.",
    "email": "cadastro16@example.com"
  },
  {
    "id": "area-demo-17",
    "service": "Diarista",
    "name": "Casa em Ordem",
    "category": "Casa e manutenção",
    "description": "Limpeza residencial e organização de cozinhas e ambientes.",
    "email": "cadastro17@example.com"
  },
  {
    "id": "area-demo-18",
    "service": "Encanador",
    "name": "Água Certa",
    "category": "Casa e manutenção",
    "description": "Reparo de vazamentos, instalação de torneiras e manutenção hidráulica.",
    "email": "cadastro18@example.com"
  },
  {
    "id": "area-demo-19",
    "service": "Pintor",
    "name": "Novas Cores",
    "category": "Casa e manutenção",
    "description": "Pintura de paredes, portas e fachadas residenciais.",
    "email": "cadastro19@example.com"
  },
  {
    "id": "area-demo-20",
    "service": "Marceneiro",
    "name": "Madeira Viva",
    "category": "Casa e manutenção",
    "description": "Móveis sob medida, armários e manutenção de móveis de madeira.",
    "email": "cadastro20@example.com"
  },
  {
    "id": "area-demo-21",
    "service": "Jardineiro",
    "name": "Verde Perto",
    "category": "Casa e manutenção",
    "description": "Poda, manutenção de jardins e cuidados com plantas e gramados.",
    "email": "cadastro21@example.com"
  },
  {
    "id": "area-demo-22",
    "service": "Técnico de ar-condicionado",
    "name": "Clima Bom",
    "category": "Casa e manutenção",
    "description": "Instalação, limpeza e manutenção de ar-condicionado.",
    "email": "cadastro22@example.com"
  },
  {
    "id": "area-demo-23",
    "service": "Fretes",
    "name": "Leva Fácil",
    "category": "Transporte e logística",
    "description": "Pequenos fretes, mudanças e transporte de móveis.",
    "email": "cadastro23@example.com"
  },
  {
    "id": "area-demo-24",
    "service": "Entregas",
    "name": "Rota Ágil",
    "category": "Transporte e logística",
    "description": "Entrega de documentos, pacotes e encomendas comerciais.",
    "email": "cadastro24@example.com"
  },
  {
    "id": "area-demo-25",
    "service": "Aulas particulares",
    "name": "Aprender Juntos",
    "category": "Educação",
    "description": "Reforço escolar em matemática e português para ensino fundamental.",
    "email": "cadastro25@example.com"
  },
  {
    "id": "area-demo-26",
    "service": "Professor de inglês",
    "name": "Clara Idiomas",
    "category": "Educação",
    "description": "Aulas de inglês, conversação e preparação para entrevistas.",
    "email": "cadastro26@example.com"
  },
  {
    "id": "area-demo-27",
    "service": "Fotografia",
    "name": "Luz de Memória",
    "category": "Eventos",
    "description": "Fotografia de eventos, retratos e ensaios de família.",
    "email": "cadastro27@example.com"
  },
  {
    "id": "area-demo-28",
    "service": "Organizador de eventos",
    "name": "Encontro Especial",
    "category": "Eventos",
    "description": "Planejamento de festas, decoração e organização de eventos.",
    "email": "cadastro28@example.com"
  },
  {
    "id": "area-demo-29",
    "service": "Cuidados com animais",
    "name": "Patas Felizes",
    "category": "Animais de estimação",
    "description": "Passeios com cães e cuidados com animais de estimação.",
    "email": "cadastro29@example.com"
  },
  {
    "id": "area-demo-30",
    "service": "Pet shop",
    "name": "Amigo de Patas",
    "category": "Animais de estimação",
    "description": "Rações, brinquedos, acessórios para animais, banho e tosa.",
    "email": "cadastro30@example.com"
  },
  {
    "id": "area-demo-31",
    "service": "Fisioterapia",
    "name": "Movimento Pleno",
    "category": "Saúde",
    "description": "Fisioterapia, exercícios terapêuticos e reabilitação de movimentos.",
    "email": "cadastro31@example.com"
  },
  {
    "id": "area-demo-32",
    "service": "Nutrição",
    "name": "Nutrir Bem",
    "category": "Saúde",
    "description": "Orientação nutricional, planejamento alimentar e educação alimentar.",
    "email": "cadastro32@example.com"
  },
  {
    "id": "area-demo-33",
    "service": "Contabilidade",
    "name": "Conta Clara",
    "category": "Serviços profissionais",
    "description": "Contabilidade para pequenos negócios e orientação para MEI.",
    "email": "cadastro33@example.com"
  },
  {
    "id": "area-demo-34",
    "service": "Loja de presentes",
    "name": "Mimo Coletivo",
    "category": "Serviços profissionais",
    "description": "Presentes criativos, papelaria e itens de decoração.",
    "email": "cadastro34@example.com"
  }
]);

const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
export function searchCatalog({ query = '', category = '', neighborhood = '' } = {}) {
  if (![query, category, neighborhood].some(value => value.trim())) return [];
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return demoCatalog.filter(item => (!category || item.category === category)
    && normalize(item.neighborhood).includes(normalize(neighborhood))
    && terms.every(term => normalize([item.name, item.service, item.category, item.description, item.neighborhood, item.area].join(' ')).includes(term)));
}
