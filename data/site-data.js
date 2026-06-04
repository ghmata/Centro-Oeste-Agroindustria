/**
 * CONSTANTES CENTRALIZADAS - CENTRO OESTE AGROINDÚSTRIA
 * 
 * Todo dado mutável do site (textos de contato, listas de equipamentos, URLs de redes sociais)
 * deve residir exclusivamente neste arquivo para facilitar atualizações futuras.
 */

export const SITE_DATA = {
  company: {
    name: 'Centro Oeste Agroindústria',
    tagline: 'Soluções em Equipamentos Industriais',
    description: 'Referência na fabricação de equipamentos robustos para fábricas de ração, sal mineral e adubos.',
  },
  contact: {
    phone: '(31) 99999-9999',       // TODO: Atualizar com dados reais fornecidos pelo cliente
    phoneRaw: '5531999999999',       // TODO: Atualizar com dados reais fornecidos pelo cliente
    email: 'contato@centroesteagroindustria.com.br', // TODO: Atualizar com dados reais fornecidos pelo cliente
    address: 'Rua das Indústrias, 123 – Distrito Industrial – Belo Horizonte/MG — CEP 30000-000', // TODO: Atualizar com dados reais fornecidos pelo cliente
    whatsappMessage: 'Olá! Vim pelo site e gostaria de falar com a equipe da Centro Oeste Agroindústria.',
  },
  social: {
    facebook: '#',                   // TODO: Atualizar com a URL oficial do Facebook
    instagram: '#',                  // TODO: Atualizar com a URL oficial do Instagram
    youtube: '#',                    // TODO: Atualizar com a URL oficial do YouTube
    linkedin: '#',                   // TODO: Atualizar com a URL oficial do LinkedIn
  },
  equipments: [
    { id: 'rosca-calha', name: 'Rosca Transportadora Tipo Calha', image: 'Imagens/Rosca transportadora tipo calha.png', model3d: '' }, // TODO: Pendente fornecimento do arquivo GLB pelo cliente
    { id: 'rosca-chupim', name: 'Rosca Transportadora Tipo Chupim', image: 'Imagens/Rosca transportadora tipo chupim.png', model3d: '' }, // TODO: Pendente fornecimento do arquivo GLB pelo cliente
    { id: 'elevador-canecas', name: 'Elevador de Canecas', image: 'Imagens/Elevador de canecas.png', model3d: '' }, // TODO: Pendente fornecimento do arquivo GLB pelo cliente
    { id: 'misturador-horizontal', name: 'Misturador Horizontal', image: 'Imagens/Misturador horizontal.png', model3d: '' }, // TODO: Pendente fornecimento do arquivo GLB pelo cliente
    { id: 'misturador-vertical', name: 'Misturador Vertical', image: 'Imagens/Misturador vertical.png', model3d: '' }, // TODO: Pendente fornecimento do arquivo GLB pelo cliente
  ],
  galleryImages: [
    { id: 'galeria-1', src: 'Imagens/Galeria_1.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 1', category: 'fabricas' },
    { id: 'galeria-2', src: 'Imagens/Galeria_2.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 2', category: 'instalacoes' },
    { id: 'galeria-3', src: 'Imagens/Galeria_3.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 3', category: 'fabricas' },
    { id: 'galeria-4', src: 'Imagens/Galeria_4.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 4', category: 'equipamentos' },
    { id: 'galeria-5', src: 'Imagens/Galeria_5.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 5', category: 'instalacoes' },
    { id: 'galeria-6', src: 'Imagens/Galeria_6.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 6', category: 'equipamentos' },
    { id: 'galeria-7', src: 'Imagens/Galeria_7.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 7', category: 'fabricas' },
  ],
  spareParts: [
    'Martelos para moinhos', 'Peneiras industriais', 'Roscas helicoidais',
    'Canecas para elevadores', 'Correias elevadoras', 'Eixos e mancais',
    'Válvulas rotativas', 'Registros gaveta', 'Componentes para misturadores',
    'Tubulações e estruturas metálicas',
  ],
  projects: [
    { id: 'projeto-1', title: 'FÁBRICA DE RAÇÃO', subtitle: 'Projeto Completo', image: 'Imagens/Galeria_1.jpeg' },
    { id: 'projeto-2', title: 'SISTEMA DE ENSACAMENTO', subtitle: 'Automático', image: 'Imagens/Galeria_2.jpeg' },
    { id: 'projeto-3', title: 'SILO ARMAZENAGEM E TRANSPORTE', subtitle: 'Estrutura Industrial', image: 'Imagens/Galeria_3.jpeg' },
    { id: 'projeto-4', title: 'PLANTA PARA FERTILIZANTES', subtitle: 'Projeto Completo', image: 'Imagens/Galeria_4.jpeg' },
    { id: 'projeto-5', title: 'LINHA DE MISTURA', subtitle: 'Instalação Comercial', image: 'Imagens/Galeria_5.jpeg' },
    { id: 'projeto-6', title: 'SISTEMA DE TRANSPORTE', subtitle: 'Movimentação de Sólidos', image: 'Imagens/Galeria_6.jpeg' },
    { id: 'projeto-7', title: 'PROCESSAMENTO DE RAÇÃO', subtitle: 'Estrutura Completa', image: 'Imagens/Galeria_7.jpeg' },
  ],
  videos: [
    { id: 'video-elevador', title: 'Elevador de Canecas', status: 'em funcionamento', embedUrl: '', thumbnail: 'assets/videos/elevador-canecas-video.png' },
    { id: 'video-misturador', title: 'Misturador Horizontal', status: 'em operação', embedUrl: '', thumbnail: 'assets/videos/misturador-horizontal-video.png' },
    { id: 'video-rosca', title: 'Rosca Transportadora', status: 'em funcionamento', embedUrl: '', thumbnail: 'assets/videos/rosca-transportadora-video.png' },
    { id: 'video-ensacadeira', title: 'Ensacadeira Automática', status: 'em operação', embedUrl: '', thumbnail: 'assets/videos/ensacadeira-video.png' },
  ],
};
