export interface MenuItem {
  id: string;
  name: string;
  category:
    | 'desayunos-brunch'
    | 'panaderia-pasteleria'
    | 'sanguches-salados'
    | 'tortas-bocaditos'
    | 'waffles-postres-helados'
    | 'cafe-bebidas';
  categoryLabel: string;
  cravingType: 'caliente' | 'contundente' | 'dulce';
  cravingLabel: string;
  description: string;
  editorialTag: string;
  priceStatus: string;
  availabilityStamp: string;
  imageUrl: string;
  imageAlt: string;
  channelType: 'carta-rappi' | 'whatsapp-eventos';
  channelUrl: string;
  channelCta: string;
  featuredInHero?: boolean;
}

export interface CategoryInfo {
  id:
    | 'todas'
    | 'desayunos-brunch'
    | 'panaderia-pasteleria'
    | 'sanguches-salados'
    | 'waffles-postres-helados'
    | 'tortas-bocaditos'
    | 'cafe-bebidas';
  shortLabel: string;
  fullTitle: string;
  subtitle: string;
  cravingMatch: 'caliente' | 'contundente' | 'dulce' | 'todas';
}

export interface LocationItem {
  id: string;
  name: string;
  district: string;
  address: string;
  reference?: string;
  phoneRef?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  mapsUrl: string;
  verifiedSource: string;
  statusStamp: string;
  isPrimary: boolean;
}

export const LA_PANERA_BRAND = {
  commercialName: 'LA PANERA CAFE',
  displayName: 'La Panera Café',
  officialDescriptor: 'Restaurante de desayunos y brunch',
  corporateSlogan:
    'Donde la pasión por el pan y el amor por compartir se unen para ofrecerte momentos inolvidables.',
  commercialPhrase: 'Para ti, siempre lo mejor',
  seasonCopy: 'Algo caliente, algo contundente y algo dulce para cerrar',
  essenceManifesto:
    'La Panera nació con una idea simple pero poderosa: crear un lugar donde compartir en familia se sienta como en casa. Hoy seguimos fieles a esa misión, invitándote a disfrutar de momentos únicos alrededor de la mesa.',
  traditionQuote: 'Cada encuentro sabe mejor cuando la mesa se llena de tradición.',
  trajectoryText: 'Desde 2016 compartiendo en familia alrededor de la mesa',
  trajectoryValidationStamp: '9 LOCALES EN LIMA',
  priceValidationStamp: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
  availabilityValidationStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
  legalReference: {
    companyName: 'COCO CAFE S.A.C.',
    ruc: '20601676541',
    tradeName: 'LA PANERA CAFE',
    fiscalAddress: 'Av. Cuba Nro. 844, Jesús María, Lima',
    startDate: '24/11/2016',
  },
  logoAssetPath: '/assets/aistudio/image_f0b102ee.png',
  palette: {
    sourdoughCream: '#EFE3D4',
    softCream: '#F6F1E9',
    ovenCharcoal: '#2F302D',
    espresso: '#3F302A',
    pureWhite: '#FFFFFF',
    warmSand: '#D9C9B1',
    sageGreen: '#626B55',
    dustyRose: '#E9D8D7',
  },
  channels: {
    cartaHub: 'https://itsmy.bio/lapanera',
    linktreeHub: 'https://linktr.ee/lapaneracafe',
    rappiDelivery: 'https://itsmy.bio/lapanera',
    whatsappBocaditosTortas: 'https://wa.link/1ocd8m',
  },
  socials: {
    instagram: 'https://www.instagram.com/la_panera_cafe/',
    instagramHandle: '@la_panera_cafe',
    facebook: 'https://www.facebook.com/LaPaneraCafeOficial/',
    facebookHandle: 'LaPaneraCafeOficial',
    linkedin: 'https://pe.linkedin.com/company/la-panera-caf%C3%A9',
    itsmybio: 'https://itsmy.bio/lapanera',
    linktree: 'https://linktr.ee/lapaneracafe',
  },
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'todas',
    shortLabel: 'TODA LA MESA',
    fullTitle: 'Toda La Gran Mesa de La Panera',
    subtitle: 'Algo caliente, algo contundente y algo dulce para cerrar en familia.',
    cravingMatch: 'todas',
  },
  {
    id: 'desayunos-brunch',
    shortLabel: 'DESAYUNOS & BRUNCH',
    fullTitle: 'Desayunos & Brunch Alrededor de la Mesa',
    subtitle: 'Opciones calientes y contundentes para empezar el día alrededor de la mesa.',
    cravingMatch: 'caliente',
  },
  {
    id: 'panaderia-pasteleria',
    shortLabel: 'PANADERÍA & PASTELERÍA',
    fullTitle: 'Panadería & Pastelería Artesanal',
    subtitle: 'Panes de la casa recién salidos del horno, croissants dorados, empanadas y vitrina fina.',
    cravingMatch: 'caliente',
  },
  {
    id: 'sanguches-salados',
    shortLabel: 'SÁNGUCHES & CRIOLLOS',
    fullTitle: 'Sánguches Generosos, Pastas & Tradición Criolla',
    subtitle: 'Sánguches generosos, club sándwich, ensaladas, pastas y platos criollos llenos de tradición.',
    cravingMatch: 'contundente',
  },
  {
    id: 'waffles-postres-helados',
    shortLabel: 'WAFFLES & HELADOS',
    fullTitle: 'Waffles, Postres de Vitrina & Gelato Artesanal',
    subtitle: 'Waffles dulces con frutas, postres clásicos de vitrina, helados y gelato.',
    cravingMatch: 'dulce',
  },
  {
    id: 'tortas-bocaditos',
    shortLabel: 'TORTAS & BOCADITOS',
    fullTitle: 'Tortas de Celebración & Bocaditos para Eventos',
    subtitle: 'Pedidos especiales para cumpleaños, reuniones familiares y celebraciones en casa u oficina.',
    cravingMatch: 'dulce',
  },
  {
    id: 'cafe-bebidas',
    shortLabel: 'CAFÉ & BEBIDAS',
    fullTitle: 'Café de Especialidad, Chocolate & Jugos',
    subtitle: 'Café americano, cappuccino con latte art, chocolate caliente, jugos naturales y bebidas frías.',
    cravingMatch: 'caliente',
  },
];

export const CRAVING_FILTERS = [
  {
    id: 'todos',
    label: 'Mesa Completa (Los 3 Tiempos)',
    quote: 'Algo caliente, algo contundente y algo dulce para cerrar',
    badge: 'EXPERIENCIA FAMILIAR',
  },
  {
    id: 'caliente',
    label: '1. Algo Caliente',
    quote: 'Recién horneado, cafés humeantes y desayunos de horno para despertar la mañana.',
    badge: 'AROMA DE HORNO',
  },
  {
    id: 'contundente',
    label: '2. Algo Contundente',
    quote: 'Sánguches generosos, club sándwich, pastas y platos criollos llenos de tradición.',
    badge: 'SABOR GENEROSO',
  },
  {
    id: 'dulce',
    label: '3. Algo Dulce Para Cerrar',
    quote: 'Waffles dorados, tortas de vitrina, bocaditos de fiesta y helados artesanales.',
    badge: 'FINAL INOLVIDABLE',
  },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // 1. Desayunos & Brunch
  {
    id: 'brunch-familiar-panera',
    name: 'Gran Desayuno & Brunch Familiar de la Casa',
    category: 'desayunos-brunch',
    categoryLabel: 'Desayunos & Brunch',
    cravingType: 'caliente',
    cravingLabel: 'Algo Caliente',
    description:
      'Selección matutina con panes artesanales recién horneados, huevos al gusto, acompañamientos tradicionales, jugo natural y café caliente para compartir alrededor de la mesa.',
    editorialTag: 'Clásico de las mañanas en familia',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Mesa de desayuno y brunch familiar con panes recién horneados y huevos',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
    featuredInHero: true,
  },
  {
    id: 'desayuno-tradicional-limeño',
    name: 'Desayuno Tradicional con Panes de Horno',
    category: 'desayunos-brunch',
    categoryLabel: 'Desayunos & Brunch',
    cravingType: 'contundente',
    cravingLabel: 'Algo Contundente',
    description:
      'Combinación caliente y generosa con cesta de panadería del día, mantequilla y mermelada artesanal, infusión o café pasado y opciones criollas matutinas.',
    editorialTag: 'Para empezar el día como en casa',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Desayuno caliente con tostadas artesanales, huevos y café',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
  },

  // 2. Panadería & Pastelería Artesanal
  {
    id: 'hogaza-panes-casa',
    name: 'Cesta de Panes de la Casa & Croissants Dorados',
    category: 'panaderia-pasteleria',
    categoryLabel: 'Panadería & Pastelería',
    cravingType: 'caliente',
    cravingLabel: 'Algo Caliente',
    description:
      'Panes artesanales con corteza crujiente y miga suave, croissants de mantequilla hojaldrados al horno y panes especiales horneados diariamente.',
    editorialTag: 'Pasión por el buen pan',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Hogazas de pan artesanal con greñas y corteza dorada',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
    featuredInHero: true,
  },
  {
    id: 'empanadas-empanadillas-horno',
    name: 'Empanadas Artesanales & Empanadillas de Vitrina',
    category: 'panaderia-pasteleria',
    categoryLabel: 'Panadería & Pastelería',
    cravingType: 'caliente',
    cravingLabel: 'Algo Caliente',
    description:
      'Masa dorada recién salida del horno con rellenos tradicionales jugosos y empanadillas clásicas ideales para media mañana o lonche en familia.',
    editorialTag: 'Recién salidas de vitrina',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Croissants dorados y hojaldres de panadería artesanal',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
  },

  // 3. Sánguches & Salados
  {
    id: 'club-sandwich-la-panera',
    name: 'Club Sándwich Clásico & Sánguches Generosos',
    category: 'sanguches-salados',
    categoryLabel: 'Sánguches & Criollos',
    cravingType: 'contundente',
    cravingLabel: 'Algo Contundente',
    description:
      'Capas generosas en pan de molde artesanal tostado, pollo, jamón, queso, tocino crujiente, huevo y vegetales frescos, acompañado de papas doradas.',
    editorialTag: 'Favorito para compartir en mesa',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Club sándwich contundente servido en mesa de madera',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
    featuredInHero: true,
  },
  {
    id: 'platos-criollos-pastas-ensaladas',
    name: 'Platos Criollos de Tradición, Pastas & Ensaladas',
    category: 'sanguches-salados',
    categoryLabel: 'Sánguches & Criollos',
    cravingType: 'contundente',
    cravingLabel: 'Algo Contundente',
    description:
      'Opciones de almuerzo y cena con sazón casera peruana, pastas reconfortantes y ensaladas frescas pensadas para reunir a toda la familia.',
    editorialTag: 'Mesa llena de tradición',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Plato contundente de tradición servido en mesa familiar',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
  },

  // 4. Waffles, Postres & Helados
  {
    id: 'waffles-frutas-gelato',
    name: 'Waffles Dorados con Frutas & Helado Artesanal',
    category: 'waffles-postres-helados',
    categoryLabel: 'Waffles & Helados',
    cravingType: 'dulce',
    cravingLabel: 'Algo Dulce',
    description:
      'Waffles crujientes por fuera y esponjosos por dentro, coronados con frutas de estación, miel o fudge casero y bola de gelato artesanal.',
    editorialTag: 'Algo dulce para cerrar',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Waffles artesanales con frutas frescas y helado',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
    featuredInHero: true,
  },
  {
    id: 'postres-vitrina-gelato',
    name: 'Postres Clásicos de Vitrina & Copa de Gelato',
    category: 'waffles-postres-helados',
    categoryLabel: 'Waffles & Helados',
    cravingType: 'dulce',
    cravingLabel: 'Algo Dulce',
    description:
      'Porciones generosas de pastelería fina en vitrina iluminada, tartas frutales, cheesecakes y selección de helados cremosos para toda la familia.',
    editorialTag: 'Dulzura artesanal de vitrina',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Copa de helado artesanal y postre dulce en mesa',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
  },

  // 5. Tortas & Bocaditos para Eventos
  {
    id: 'tortas-celebracion-enteras',
    name: 'Tortas de Celebración & Cumpleaños en Familia',
    category: 'tortas-bocaditos',
    categoryLabel: 'Tortas & Bocaditos',
    cravingType: 'dulce',
    cravingLabel: 'Algo Dulce',
    description:
      'Tortas enteras elaboradas artesanalmente para cumpleaños, aniversarios y momentos inolvidables alrededor de la mesa familiar.',
    editorialTag: 'Canal exclusivo WhatsApp Eventos',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Torta artesanal de celebración decorada en vitrina de pastelería',
    channelType: 'whatsapp-eventos',
    channelUrl: 'https://wa.link/1ocd8m',
    channelCta: 'Encargar por WhatsApp Oficial',
  },
  {
    id: 'bocaditos-salados-dulces-eventos',
    name: 'Bandejas de Bocaditos Salados, Dulces & Mini Sánguches',
    category: 'tortas-bocaditos',
    categoryLabel: 'Tortas & Bocaditos',
    cravingType: 'contundente',
    cravingLabel: 'Algo Contundente',
    description:
      'Selección a pedido de empanaditas, mini sánguches, tartaletas y bocaditos dulces de pastelería para reuniones en casa, oficina o agasajos.',
    editorialTag: 'Pedidos especiales para compartir',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Selección de bocaditos artesanales y pastelería fina para eventos',
    channelType: 'whatsapp-eventos',
    channelUrl: 'https://wa.link/1ocd8m',
    channelCta: 'Encargar por WhatsApp Oficial',
  },

  // 6. Café & Bebidas
  {
    id: 'cappuccino-cafe-especialidad',
    name: 'Cappuccino Cremoso, Café Americano & Chocolate Caliente',
    category: 'cafe-bebidas',
    categoryLabel: 'Café & Bebidas',
    cravingType: 'caliente',
    cravingLabel: 'Algo Caliente',
    description:
      'Tazas servidas calientes con espuma sedosa y aroma intenso a grano recién molido, además de chocolate caliente tradicional para acompañar el pan.',
    editorialTag: 'El compañero ideal del pan',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Taza de cappuccino con latte art sobre mesa de madera cálida',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
  },
  {
    id: 'jugos-naturales-bebidas-frias',
    name: 'Jugos de Fruta Natural & Bebidas Frías de Estación',
    category: 'cafe-bebidas',
    categoryLabel: 'Café & Bebidas',
    cravingType: 'dulce',
    cravingLabel: 'Algo Dulce',
    description:
      'Jugos preparados al momento con frutas seleccionadas, limonadas, cafés fríos y refrescos naturales para un brunch fresco y completo.',
    editorialTag: 'Frescura natural en la mesa',
    priceStatus: '[CONSULTAR PRECIO EN CARTA VIGENTE]',
    availabilityStamp: '[DISPONIBILIDAD Y PRECIO EN CARTA OFICIAL]',
    imageUrl:
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Jugos naturales de fruta fresca servidos en mesa de desayuno',
    channelType: 'carta-rappi',
    channelUrl: 'https://itsmy.bio/lapanera',
    channelCta: 'Ver en Nuestra Carta / Rappi',
  },
];

export const CELEBRATION_OPTIONS = {
  motives: [
    {
      id: 'cumpleanos-familiar',
      title: 'Cumpleaños Familiar',
      subtitle: 'Para cantar y celebrar alrededor de la mesa con torta y bocaditos.',
    },
    {
      id: 'desayuno-sorpresa',
      title: 'Desayuno / Brunch Sorpresa',
      subtitle: 'Un despertar cálido con panes artesanales, dulces y detalles especiales.',
    },
    {
      id: 'reunion-casa-oficina',
      title: 'Reunión en Casa u Oficina',
      subtitle: 'Bandejas listas para compartir en agasajos, lonches y encuentros.',
    },
  ],
  cravings: [
    {
      id: 'tortas-enteras',
      title: 'Tortas Enteras de Vitrina',
      detail: 'Sabores clásicos de pastelería artesanal para partir en familia.',
    },
    {
      id: 'bocaditos-salados-dulces',
      title: 'Selección de Bocaditos Salados / Dulces',
      detail: 'Empanaditas, tartaletas y bocaditos horneados para picar.',
    },
    {
      id: 'mini-sanguches-pasteleria',
      title: 'Mini Sánguches y Pastelería Fina',
      detail: 'Combinación contundente y dulce recién salida de nuestro obrador.',
    },
  ],
  validationNote: '[CONFIRMAR PLAZOS DE ANTICIPACIÓN Y PORCIONES]',
  whatsappOfficialLink: 'https://wa.link/1ocd8m',
};

export type SedeDistrictGroup =
  | 'todas'
  | 'pueblo-libre'
  | 'jesus-maria'
  | 'san-isidro-lince'
  | 'magdalena'
  | 'san-borja';

export interface UnifiedSedeItem {
  id: string;
  code: string;
  name: string;
  shortName: string;
  district: string;
  districtGroup: Exclude<SedeDistrictGroup, 'todas'>;
  address: string;
  reference: string;
  phoneRef?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsQuery: string;
  rating: string;
  reviewCount: string;
  priceRange: string;
  reviewQuote: string;
  mapsUrl: string;
  verifiedSource: string;
  statusStamp: string;
  isPrimary: boolean;
}

export const SEDE_DISTRICT_FILTERS: {
  id: SedeDistrictGroup;
  label: string;
  count: number;
}[] = [
  { id: 'todas', label: 'Todas las Sedes en Lima', count: 9 },
  { id: 'pueblo-libre', label: 'Pueblo Libre', count: 3 },
  { id: 'jesus-maria', label: 'Jesús María', count: 2 },
  { id: 'san-isidro-lince', label: 'Lince & San Isidro', count: 2 },
  { id: 'magdalena', label: 'Magdalena del Mar', count: 1 },
  { id: 'san-borja', label: 'San Borja', count: 1 },
];

export const ALL_LIMA_SEDES: UnifiedSedeItem[] = [
  {
    id: 'sede-jesus-maria-cuba',
    code: '01',
    name: 'La Panera Cuba — Jesús María',
    shortName: 'La Panera Cuba',
    district: 'Jesús María',
    districtGroup: 'jesus-maria',
    address: 'Av. Cuba 844, Jesús María, Lima',
    reference: 'Domicilio Fiscal SUNAT (RUC 20601676541) · Carta Oficial 2025',
    phoneRef: '01 469-7259',
    coordinates: {
      lat: -12.0746495,
      lng: -77.0436888,
    },
    googleMapsQuery: 'La Panera Cuba Av. Cuba 844 Jesús María Lima',
    rating: '4.4',
    reviewCount: '3K',
    priceRange: 'S/ 20–40',
    reviewQuote: 'Tienen una variedad de panes de masa madre incluso y cafecito delicioso.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cuba+Av.+Cuba+844+Jesus+Maria+Lima',
    verifiedSource: 'Domicilio Fiscal SUNAT & Carta Oficial 2025',
    statusStamp: 'DESAYUNOS DESDE 7:00 AM',
    isPrimary: true,
  },
  {
    id: 'sede-pueblo-libre-san-martin',
    code: '02',
    name: 'La Panera Café — San Martín',
    shortName: 'San Martín 801',
    district: 'Pueblo Libre',
    districtGroup: 'pueblo-libre',
    address: 'Av. San Martín 801, Pueblo Libre, Lima',
    reference: 'Sede emblemática frente a parque · Carta Oficial 2025',
    phoneRef: '(01) 342-6914',
    coordinates: {
      lat: -12.0718,
      lng: -77.0612,
    },
    googleMapsQuery: 'La Panera Café Av. San Martín 801 Pueblo Libre Lima',
    rating: '4.4',
    reviewCount: '2.5K',
    priceRange: 'S/ 20–40',
    reviewQuote: 'Excelente cafetería, productos, atención y ambiente de primera.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cafe+Av.+San+Martin+801+Pueblo+Libre+Lima',
    verifiedSource: 'Carta Oficial 2025 & Google Maps',
    statusStamp: 'DESAYUNOS & BRUNCH',
    isPrimary: true,
  },
  {
    id: 'sede-pueblo-libre-bandera',
    code: '03',
    name: 'La Panera Café — Pza. La Bandera',
    shortName: 'Pza. La Bandera',
    district: 'Pueblo Libre',
    districtGroup: 'pueblo-libre',
    address: 'Av. Mariano H. Cornejo 1125, Pueblo Libre, Lima',
    reference: 'Frente a Plaza La Bandera · Carta Oficial 2025',
    phoneRef: '01 261-5871',
    coordinates: {
      lat: -12.0729,
      lng: -77.0601,
    },
    googleMapsQuery: 'La Panera Café Pza La Bandera Av. Mariano Cornejo 1125 Pueblo Libre',
    rating: '4.4',
    reviewCount: '2K',
    priceRange: 'S/ 20–40',
    reviewQuote: 'La Panera tiene variedad de comida, sánguches y postres.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cafe+Av.+Mariano+Cornejo+1125+Pueblo+Libre+Lima',
    verifiedSource: 'Carta Oficial 2025 & Google Maps',
    statusStamp: 'PANADERÍA & CAFETERÍA',
    isPrimary: false,
  },
  {
    id: 'sede-pueblo-libre-leguia',
    code: '04',
    name: 'La Panera Café & Gelato — Leguía',
    shortName: 'Leguía y Meléndez',
    district: 'Pueblo Libre',
    districtGroup: 'pueblo-libre',
    address: 'Av. José Leguía y Meléndez 1060, Pueblo Libre, Lima',
    reference: 'Cafetería, Helados Artesanales & Tortas · Carta Oficial 2025',
    phoneRef: '01 469-6797',
    coordinates: {
      lat: -12.0734,
      lng: -77.0638,
    },
    googleMapsQuery: 'La Panera Av. José Leguía y Meléndez 1060 Pueblo Libre Lima',
    rating: '4.4',
    reviewCount: '733',
    priceRange: 'S/ 20–40',
    reviewQuote: 'Muy buena atención, limpieza y una torta de chocolate riquísima.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Av.+Jose+Leguia+y+Melendez+1060+Pueblo+Libre+Lima',
    verifiedSource: 'Carta Oficial 2025 & Google Maps',
    statusStamp: 'HELADERÍA & VITRINA',
    isPrimary: false,
  },
  {
    id: 'sede-jesus-maria-caracas',
    code: '05',
    name: 'La Panera Café — Jr. Caracas',
    shortName: 'Jr. Caracas 2400',
    district: 'Jesús María',
    districtGroup: 'jesus-maria',
    address: 'Jr. Caracas 2400, Jesús María, Lima',
    reference: 'Altura Av. San Felipe · Carta Oficial 2025',
    phoneRef: '+51 986 697 298',
    coordinates: {
      lat: -12.0805,
      lng: -77.0475,
    },
    googleMapsQuery: 'La Panera Café Jr. Caracas 2400 Jesús María Lima',
    rating: '4.2',
    reviewCount: '442',
    priceRange: 'S/ 20–40',
    reviewQuote: 'Acogedor rincón en Jesús María con vitrina de postres, empanadas y café.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cafe+Jr.+Caracas+2400+Jesus+Maria+Lima',
    verifiedSource: 'Carta Oficial 2025 & Google Maps',
    statusStamp: 'CAFETERÍA & POSTRES',
    isPrimary: false,
  },
  {
    id: 'sede-lince-iquitos',
    code: '06',
    name: 'La Panera Café — Lince / San Isidro',
    shortName: 'Prol. Iquitos 2705',
    district: 'Lince (Límite San Isidro)',
    districtGroup: 'san-isidro-lince',
    address: 'Av. Prolongación Iquitos 2705, Lince, Lima',
    reference: 'Zona límite Lince / San Isidro · Carta Oficial 2025',
    coordinates: {
      lat: -12.0831,
      lng: -77.0259,
    },
    googleMapsQuery: 'La Panera Café Prolongación Iquitos 2705 Lince Lima',
    rating: '4.3',
    reviewCount: '669',
    priceRange: 'S/ 20–40',
    reviewQuote: 'El quiche Panera lo mejor, buen ambiente y personal muy amable.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cafe+Prolongacion+Iquitos+2705+Lince+Lima',
    verifiedSource: 'Carta Oficial 2025 & Google Maps',
    statusStamp: 'QUICHES & DESAYUNOS',
    isPrimary: false,
  },
  {
    id: 'sede-magdalena-cossio',
    code: '07',
    name: 'La Panera Café — Magdalena',
    shortName: 'Magdalena del Mar',
    district: 'Magdalena del Mar',
    districtGroup: 'magdalena',
    address: 'Jr. José Cossio 294, Magdalena del Mar, Lima',
    reference: 'Corazón residencial de Magdalena · Carta Oficial 2025',
    coordinates: {
      lat: -12.0968,
      lng: -77.0574,
    },
    googleMapsQuery: 'La Panera Café Jr. José Cossio 294 Magdalena del Mar Lima',
    rating: '4.4',
    reviewCount: '336',
    priceRange: 'S/ 20–40',
    reviewQuote: 'Tienen desayunos muy completos y buenas porciones. Buen servicio.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cafe+Jr.+Jose+Cossio+294+Magdalena+Lima',
    verifiedSource: 'Carta Oficial 2025 & Google Maps',
    statusStamp: 'BRUNCH & PET FRIENDLY',
    isPrimary: false,
  },
  {
    id: 'sede-san-isidro-ejercito',
    code: '08',
    name: 'La Panera Café — San Isidro',
    shortName: 'Pérez Araníbar 2086',
    district: 'San Isidro',
    districtGroup: 'san-isidro-lince',
    address: 'Av. Augusto Pérez Araníbar 2086 (Ex Av. del Ejército), San Isidro',
    reference: 'Urb. Orrantia del Mar · Google Maps & Rappi Oficial',
    coordinates: {
      lat: -12.1022,
      lng: -77.0456,
    },
    googleMapsQuery: 'La Panera Café Av. Augusto Pérez Araníbar 2086 San Isidro Lima',
    rating: '4.8',
    reviewCount: '17',
    priceRange: 'S/ 20–40',
    reviewQuote: 'En La Panera puedes encontrar opciones dulces y saladas recién horneadas.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cafe+Av.+Augusto+Perez+Aranibar+2086+San+Isidro+Lima',
    verifiedSource: 'Google Maps & Rappi Oficial',
    statusStamp: 'SAN ISIDRO · ORRANTIA',
    isPrimary: false,
  },
  {
    id: 'sede-san-borja-aviacion',
    code: '09',
    name: 'La Panera Café — San Borja',
    shortName: 'Av. Aviación 2674',
    district: 'San Borja',
    districtGroup: 'san-borja',
    address: 'Av. Aviación 2674, San Borja, Lima',
    reference: 'Cerca de Av. San Borja Norte · Carta Oficial 2025',
    coordinates: {
      lat: -12.0945,
      lng: -77.0063,
    },
    googleMapsQuery: 'La Panera Café Av. Aviación 2674 San Borja Lima',
    rating: '4.1',
    reviewCount: '160',
    priceRange: 'S/ 20–40',
    reviewQuote: 'Pedí un desayuno completo y todo estuvo muy rico.',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Panera+Cafe+Av.+Aviacion+2674+San+Borja+Lima',
    verifiedSource: 'Carta Oficial 2025 & Google Maps',
    statusStamp: 'DESAYUNOS & LONCHES',
    isPrimary: false,
  },
];

export const PRIMARY_LOCATIONS: LocationItem[] = [
  {
    id: 'sede-pueblo-libre',
    name: 'Sede Pueblo Libre',
    district: 'Pueblo Libre, Lima',
    address: 'Av. San Martín 801, Pueblo Libre, Lima',
    reference: 'Ficha destacada de marca verificada (Coffee Pass)',
    coordinates: {
      lat: -12.0718,
      lng: -77.0612,
    },
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+San+Mart%C3%ADn+801,+Pueblo+Libre,+Lima',
    verifiedSource: 'Destacada en Ficha de Marca (Coffee Pass)',
    statusStamp: '[HORARIOS SUJETOS A CONFIRMACIÓN OFICIAL]',
    isPrimary: true,
  },
  {
    id: 'sede-jesus-maria',
    name: 'Sede Jesús María',
    district: 'Jesús María, Lima',
    address: 'Av. Cuba 844, Jesús María, Lima',
    reference: 'Domicilio Fiscal SUNAT (RUC 20601676541) · Coordenadas: -12.0746495, -77.0436888',
    coordinates: {
      lat: -12.0746495,
      lng: -77.0436888,
    },
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-12.0746495,-77.0436888',
    verifiedSource: 'Domicilio Fiscal SUNAT & Carta Oficial 2025',
    statusStamp: 'ATENCIÓN DESAYUNOS DESDE 7:00 AM',
    isPrimary: true,
  },
];

export const VALIDATION_LOCATIONS: LocationItem[] = [
  {
    id: 'val-mariano-cornejo',
    name: 'Referencia Plaza La Bandera — Pueblo Libre',
    district: 'Pueblo Libre, Lima',
    address: 'Av. Mariano H. Cornejo 1125 (Plaza La Bandera, Pueblo Libre)',
    phoneRef: '01 261 5871',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Mariano+H.+Cornejo+1125+Pueblo+Libre+Lima',
    verifiedSource: 'Detectada en directorios públicos',
    statusStamp: '[CONFIRMAR SEDES ACTIVAS Y HORARIOS OFICIALES]',
    isPrimary: false,
  },
  {
    id: 'val-caracas-jesus-maria',
    name: 'Referencia Jr. Caracas — Jesús María',
    district: 'Jesús María, Lima',
    address: 'Jr. Caracas 2400, Jesús María',
    phoneRef: '+51 986 697 298',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jr.+Caracas+2400+Jesus+Maria+Lima',
    verifiedSource: 'Detectada en directorios públicos',
    statusStamp: '[CONFIRMAR SEDES ACTIVAS Y HORARIOS OFICIALES]',
    isPrimary: false,
  },
  {
    id: 'val-leguia-melendez',
    name: 'Referencia Av. José Leguía y Meléndez',
    district: 'Pueblo Libre, Lima',
    address: 'Av. José Leguía y Meléndez 1060',
    phoneRef: '01 469 6797',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Jose+Leguia+y+Melendez+1060+Pueblo+Libre+Lima',
    verifiedSource: 'Detectada en directorios públicos',
    statusStamp: '[CONFIRMAR SEDES ACTIVAS Y HORARIOS OFICIALES]',
    isPrimary: false,
  },
  {
    id: 'val-aviacion-san-borja',
    name: 'Referencia Av. Aviación — San Borja',
    district: 'San Borja, Lima',
    address: 'Av. Aviación 2674, San Borja',
    phoneRef: 'En validación',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Aviacion+2674+San+Borja+Lima',
    verifiedSource: 'Detectada en directorios públicos',
    statusStamp: '[CONFIRMAR SEDES ACTIVAS Y HORARIOS OFICIALES]',
    isPrimary: false,
  },
  {
    id: 'val-lince-magdalena',
    name: 'Referencias Zonales Lince / Magdalena',
    district: 'Lince / Magdalena, Lima',
    address: 'Referencias históricas en Lince y Magdalena del Mar',
    phoneRef: 'En validación',
    mapsUrl: 'https://itsmy.bio/lapanera',
    verifiedSource: 'Menciones en portales secundarios',
    statusStamp: '[CONFIRMAR SEDES ACTIVAS Y HORARIOS OFICIALES]',
    isPrimary: false,
  },
];

export const MARQUEE_ITEMS = [
  'LA PANERA CAFE',
  'DESAYUNOS Y BRUNCH',
  'PANADERÍA Y PASTELERÍA',
  'SÁNGUCHES CONTUNDENTES',
  'TORTAS Y BOCADITOS',
  'WAFFLES Y HELADOS',
  'PARA TI, SIEMPRE LO MEJOR',
];

