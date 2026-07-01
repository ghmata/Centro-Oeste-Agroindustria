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
    phone: '(66) 99942-1349',
    phoneRaw: '5566999421349',
    email: 'contato@centroesteagroindustria.com.br',
    address: 'Rua Espírito Santo, 1061 - Rondonópolis/MT',
    whatsappMessage: 'Olá João Batista! Vim pelo site da Centro Oeste Agroindústria e gostaria de solicitar um orçamento.',
  },
  social: {
    facebook: '#',                   // TODO: Atualizar com a URL oficial do Facebook
    instagram: '#',                  // TODO: Atualizar com a URL oficial do Instagram
    youtube: '#',                    // TODO: Atualizar com a URL oficial do YouTube
    linkedin: '#',                   // TODO: Atualizar com a URL oficial do LinkedIn
  },
  equipments: [
    { id: 'rosca-calha', name: 'Rosca Transportadora Tipo Calha', image: 'Imagens/Rosca transportadora tipo calha.png', model3d: '' },
    { id: 'rosca-chupim', name: 'Rosca Transportadora Tipo Chupim', image: 'Imagens/Rosca transportadora tipo chupim.png', model3d: '' },
    { id: 'elevador-canecas', name: 'Elevador de Canecas', image: 'Imagens/Elevador de canecas.png', model3d: '' },
    { id: 'misturador-horizontal', name: 'Misturador Horizontal', image: 'Imagens/Misturador horizontal.png', model3d: '' },
    { id: 'misturador-vertical', name: 'Misturador Vertical', image: 'Imagens/Misturador vertical.png', model3d: '' },
    { id: 'dosadora-helicoidal', name: 'Dosadora Helicoidal', image: 'Imagens/Dosadora.png', model3d: '' },
    { id: 'silo-pulmao', name: 'Silo Pulmão', image: 'Imagens/Silo Pulmo.png', model3d: '' },
  ],
  galleryImages: [
    { id: 'galeria-1', src: 'Imagens/Galeria_1.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 1', category: 'fabricas' },
    { id: 'galeria-2', src: 'Imagens/Galeria_2.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 2', category: 'instalacoes' },
    { id: 'galeria-3', src: 'Imagens/Galeria_3.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 3', category: 'fabricas' },
    { id: 'galeria-4', src: 'Imagens/Galeria_4.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 4', category: 'equipamentos' },
    { id: 'galeria-5', src: 'Imagens/Galeria_5.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 5', category: 'instalacoes' },
    { id: 'galeria-6', src: 'Imagens/Galeria_6.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 6', category: 'equipamentos' },
    { id: 'galeria-7', src: 'Imagens/Galeria_7.jpeg', alt: 'Projeto industrial Centro Oeste Agroindústria - Vista 7', category: 'fabricas' },
    { id: 'galeria-8', src: 'Imagens/Galeria_8.jpeg', alt: 'Instalação industrial Centro Oeste Agroindústria - Vista 8', category: 'instalacoes' },
    { id: 'galeria-9', src: 'Imagens/Galeria_9.jpeg', alt: 'Equipamento industrial Centro Oeste Agroindústria - Vista 9', category: 'equipamentos' },
    { id: 'galeria-10', src: 'Imagens/Galeria_10.jpeg', alt: 'Projeto de fábrica Centro Oeste Agroindústria - Vista 10', category: 'fabricas' },
    { id: 'galeria-11', src: 'Imagens/Galeria_11.jpeg', alt: 'Montagem industrial Centro Oeste Agroindústria - Vista 11', category: 'instalacoes' },
    { id: 'galeria-12', src: 'Imagens/Galeria_12.jpeg', alt: 'Maquinário de processamento Centro Oeste Agroindústria - Vista 12', category: 'equipamentos' },
  ],
  spareParts: [
    'Martelos para moinhos', 'Peneiras industriais', 'Roscas helicoidais',
    'Canecas para elevadores', 'Correias elevadoras', 'Eixos e mancais',
    'Válvulas rotativas', 'Registros gaveta', 'Componentes para misturadores',
    'Tubulações e estruturas metálicas',
  ],

  videos: [
    { id: 'video-elevador', title: 'Elevador de Canecas', status: 'em funcionamento', embedUrl: '', thumbnail: 'assets/videos/elevador-canecas-video.png' },
    { id: 'video-misturador', title: 'Misturador Horizontal', status: 'em operação', embedUrl: '', thumbnail: 'assets/videos/misturador-horizontal-video.png' },
    { id: 'video-rosca', title: 'Rosca Transportadora', status: 'em funcionamento', embedUrl: '', thumbnail: 'assets/videos/rosca-transportadora-video.png' },
    { id: 'video-ensacadeira', title: 'Ensacadeira Automática', status: 'em operação', embedUrl: '', thumbnail: 'assets/videos/ensacadeira-video.png' },
  ],
};
