export interface CartaVariant {
  id: string;
  label: string;
  price: number;
}

export interface Carta2025Item {
  id: string;
  name: string;
  category:
    | 'desayunos'
    | 'sandwiches'
    | 'smash-burger'
    | 'ensaladas'
    | 'pastas'
    | 'empanadas-pizzas'
    | 'pasteles-salados'
    | 'waffles'
    | 'tortas'
    | 'tortas-premium'
    | 'bebidas-calientes'
    | 'jugos-refrescantes'
    | 'adicionales';
  categoryLabel: string;
  description?: string;
  isNew?: boolean;
  scheduleNote?: string;
  variants: CartaVariant[];
}

export interface Carta2025Category {
  id: Carta2025Item['category'] | 'todas';
  label: string;
  shortLabel: string;
  note?: string;
}

export interface OfficialSede2025 {
  id: string;
  district: string;
  address: string;
  mapsUrl: string;
}

export const CARTA_PDF_URL = '/assets/aistudio/Carta_La_Panera_2025_e447ecaf.pdf';

export const OFFICIAL_SEDES_2025: OfficialSede2025[] = [
  {
    id: 'pl-san-martin',
    district: 'Pueblo Libre',
    address: 'Av. San Martín 801',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+San+Martin+801+Pueblo+Libre+Lima',
  },
  {
    id: 'pl-mariano-cornejo',
    district: 'Pueblo Libre',
    address: 'Av. Mariano Cornejo 1125',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Mariano+Cornejo+1125+Pueblo+Libre+Lima',
  },
  {
    id: 'pl-leguia-melendez',
    district: 'Pueblo Libre',
    address: 'Av. José Leguía y Meléndez 1060',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Jose+Leguia+y+Melendez+1060+Pueblo+Libre+Lima',
  },
  {
    id: 'jm-cuba',
    district: 'Jesús María',
    address: 'Av. Cuba 844',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Cuba+844+Jesus+Maria+Lima',
  },
  {
    id: 'jm-caracas',
    district: 'Jesús María',
    address: 'Jr. Caracas 2400',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Jr.+Caracas+2400+Jesus+Maria+Lima',
  },
  {
    id: 'sb-aviacion',
    district: 'San Borja',
    address: 'Av. Aviación 2674',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Aviacion+2674+San+Borja+Lima',
  },
  {
    id: 'mag-cossio',
    district: 'Magdalena',
    address: 'Jr. José Cossio 294',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Jr.+Jose+Cossio+294+Magdalena+Lima',
  },
  {
    id: 'lince-iquitos',
    district: 'Lince',
    address: 'Prolongación Iquitos 2705',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Prolongacion+Iquitos+2705+Lince+Lima',
  },
];

export const CARTA_2025_CATEGORIES: Carta2025Category[] = [
  {
    id: 'todas',
    label: 'Toda la Carta 2025',
    shortLabel: 'Todo',
    note: 'Carta completa oficial con precios en Soles (S/)',
  },
  {
    id: 'desayunos',
    label: 'Desayunos (7 AM - 12 PM)',
    shortLabel: 'Desayunos',
    note: 'Horario de atención: 7:00 AM a 12:00 PM · Incluyen jugo y café',
  },
  {
    id: 'sandwiches',
    label: 'Sándwiches Artesanales',
    shortLabel: 'Sándwiches',
    note: 'En pan ciabatta, croissant, brioche, francés, blanco o campesino',
  },
  {
    id: 'smash-burger',
    label: 'Smash Burger',
    shortLabel: 'Smash Burger',
    note: 'Doble smash con doble queso cheddar',
  },
  {
    id: 'ensaladas',
    label: 'Ensaladas Frescas',
    shortLabel: 'Ensaladas',
    note: 'Preparadas al momento con vegetales frescos y vinagretas de la casa',
  },
  {
    id: 'pastas',
    label: 'Pastas Tradicionales',
    shortLabel: 'Pastas',
    note: 'Fetuccine y spaghetti con salsas artesanales',
  },
  {
    id: 'empanadas-pizzas',
    label: 'Empanadas, Piqueos & Pizzas',
    shortLabel: 'Empanadas & Pizzas',
    note: 'Empanadas horneadas, salchipapa y pizzas artesanales [NUEVO]',
  },
  {
    id: 'pasteles-salados',
    label: 'Pasteles Salados',
    shortLabel: 'Pasteles Salados',
    note: 'Disponibles por porción o pastel entero',
  },
  {
    id: 'waffles',
    label: 'Waffles & Tostada Francesa',
    shortLabel: 'Waffles',
    note: 'Con frutas de estación, miel de maple, fudge y helado',
  },
  {
    id: 'tortas',
    label: 'Tortas Clásicas & Postres',
    shortLabel: 'Tortas & Postres',
    note: 'Elige en 1 clic entre Porción para hoy o Torta Entera para celebrar',
  },
  {
    id: 'tortas-premium',
    label: 'Tortas Premium (20 cm)',
    shortLabel: 'Tortas Premium',
    note: 'Medida 20 cm de diámetro · Disponibles en Porción (S/ 15) o Entera (S/ 85)',
  },
  {
    id: 'bebidas-calientes',
    label: 'Bebidas Calientes & Café',
    shortLabel: 'Café & Calientes',
    note: 'Café 100% peruano, chocolate caliente e infusiones (+ Crema S/ 3.00)',
  },
  {
    id: 'jugos-refrescantes',
    label: 'Jugos & Refrescantes',
    shortLabel: 'Jugos & Frías',
    note: 'Jugos naturales (+ Leche o Frozzen S/ 2.00) y tés helados frutales',
  },
  {
    id: 'adicionales',
    label: 'Adicionales de Carta',
    shortLabel: 'Adicionales',
    note: 'Sólo acompañados con platos a la carta',
  },
];

export const CARTA_2025_ITEMS: Carta2025Item[] = [
  // ================= DESAYUNOS (7 AM - 12 PM) =================
  {
    id: 'des-waffle-morning',
    name: 'Waffle Morning',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: 'Waffles con mantequilla y miel de maple, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 19.0 }],
  },
  {
    id: 'des-lomito-jugo',
    name: 'Lomito al Jugo',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: 'Dos panes francés, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 25.0 }],
  },
  {
    id: 'des-continental',
    name: 'Continental',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: '2 panes francés, huevo, tocino, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 23.0 }],
  },
  {
    id: 'des-la-panera',
    name: 'Desayuno La Panera',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description:
      '4 panes francés, salchicha huachana, tamal de pollo o cerdo, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [
      { id: 'tamal-pollo', label: 'Con Tamal de Pollo', price: 33.0 },
      { id: 'tamal-cerdo', label: 'Con Tamal de Cerdo', price: 33.0 },
    ],
  },
  {
    id: 'des-criollo',
    name: 'Desayuno Criollo',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description:
      '1 sándwich de butifarra, tamal de pollo o cerdo, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [
      { id: 'tamal-pollo', label: 'Con Tamal de Pollo', price: 23.0 },
      { id: 'tamal-cerdo', label: 'Con Tamal de Cerdo', price: 23.0 },
    ],
  },
  {
    id: 'des-huachano',
    name: 'Desayuno Huachano',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: '2 panes francés, salchicha huachana, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 22.0 }],
  },
  {
    id: 'des-bowl-avena',
    name: 'Bowl de Avena',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description:
      'Avena tibia, frutas de estación, granola, coco, chía y miel, jugo y café/infusión.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 25.0 }],
  },
  {
    id: 'des-completo',
    name: 'Desayuno Completo',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description:
      'Pan tostado, tocino crocante, queso frito, ensalada fresca, huevos fritos y salsa marinara, jugo y café/infusión.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 33.0 }],
  },
  {
    id: 'des-brioche-huevo',
    name: 'Brioche & Huevo',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description:
      'Omelette cremoso, tocino, salsa smash, cebollas caramelizadas y perejil en pan brioche tostado, jugo y café/infusión.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 23.0 }],
  },
  {
    id: 'des-americano',
    name: 'Desayuno Americano',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: 'Tostada de brioche, mantequilla, mermelada, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 15.0 }],
  },
  {
    id: 'des-de-frutas',
    name: 'Desayuno de Frutas',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description:
      'Tostada de brioche, frutas, yogurt, miel, granola, jugo y café.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Desayuno', price: 24.0 }],
  },
  {
    id: 'des-omelette-mixto',
    name: 'Omelette Mixto',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: 'Queso Edam y jamón.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Unidad', price: 20.0 }],
  },
  {
    id: 'des-omelette-completo',
    name: 'Omelette Mixto Completo',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: 'Queso Edam, jamón, champignones y tocino.',
    scheduleNote: '7 AM - 12 PM',
    variants: [{ id: 'regular', label: 'Unidad', price: 25.0 }],
  },
  {
    id: 'des-tamales',
    name: 'Tamales Artesanales',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: 'Tamal criollo de pollo o cerdo.',
    scheduleNote: '7 AM - 12 PM',
    variants: [
      { id: 'pollo', label: 'Pollo', price: 6.0 },
      { id: 'cerdo', label: 'Cerdo', price: 6.0 },
    ],
  },
  {
    id: 'des-chicharron-peso',
    name: 'Chicharrón por Peso',
    category: 'desayunos',
    categoryLabel: 'Desayunos',
    description: 'Acompañado de camote dorado y sarsa criolla.',
    scheduleNote: '7 AM - 12 PM',
    variants: [
      { id: 'medio-kilo', label: '1/2 Kg', price: 70.0 },
      { id: 'un-kilo', label: '1 Kg', price: 135.0 },
    ],
  },

  // ================= SÁNDWICHES =================
  {
    id: 'san-mixto-quesos',
    name: 'Mixto de Quesos',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan brioche dorado y 3 quesos fundidos: mozzarella, Edam y cheddar.',
    isNew: true,
    variants: [{ id: 'regular', label: 'Unidad', price: 19.9 }],
  },
  {
    id: 'san-milanesa-caballo',
    name: 'Milanesa a Caballo',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan ciabatta, lechugas, milanesa de pollo, jamón, queso, huevo frito y salsa de ajo.',
    isNew: true,
    variants: [{ id: 'regular', label: 'Unidad', price: 29.9 }],
  },
  {
    id: 'san-philly-cheese-steak',
    name: 'Philly Cheese Steak',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan ciabatta, lomo de res con cebollas y pimientos a la plancha, queso cheddar gratinado.',
    isNew: true,
    variants: [{ id: 'regular', label: 'Unidad', price: 29.9 }],
  },
  {
    id: 'san-chicharron',
    name: 'Sándwich de Chicharrón',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description: 'Pan francés, camote, chicharrón de cerdo y sarsa criolla.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'san-croissant-mixto',
    name: 'Croissant Mixto',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description: 'Pan croissant, jamón inglés y queso Edam.',
    variants: [{ id: 'regular', label: 'Unidad', price: 18.0 }],
  },
  {
    id: 'san-butifarra',
    name: 'Butifarra de la Casa',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan francés, lechuga, jamón del país de la casa y sarsa criolla.',
    variants: [{ id: 'regular', label: 'Unidad', price: 18.0 }],
  },
  {
    id: 'san-salchicha-huacho',
    name: 'Salchicha de Huacho',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description: 'Pan francés, salchicha de huachano revuelto con huevo.',
    variants: [{ id: 'regular', label: 'Unidad', price: 19.0 }],
  },
  {
    id: 'san-clasico-pollo',
    name: 'Clásico de Pollo',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan croissant, lechuga, pollo deshilachado y mayonesa de la casa.',
    variants: [{ id: 'regular', label: 'Unidad', price: 19.0 }],
  },
  {
    id: 'san-pollo-tropical',
    name: 'Pollo Tropical',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan croissant, pollo deshilachado, durazno, pecanas y mayonesa de la casa.',
    variants: [{ id: 'regular', label: 'Unidad', price: 20.0 }],
  },
  {
    id: 'san-tres-jamones',
    name: 'Tres Jamones',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan ciabatta, lechuga, tomate, jamón del país de la casa, jamón inglés, lomito ahumado y queso Edam.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'san-mixto',
    name: 'Sándwich Mixto',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description: 'Pan blanco, jamón y queso Edam.',
    variants: [{ id: 'regular', label: 'Unidad', price: 17.0 }],
  },
  {
    id: 'san-mixto-completo',
    name: 'Mixto Completo',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description: 'Pan blanco, jamón, queso Edam y huevo.',
    variants: [{ id: 'regular', label: 'Unidad', price: 19.0 }],
  },
  {
    id: 'san-mixto-napolitano',
    name: 'Mixto Napolitano',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Brioche relleno de jamón ahumado y queso, salsa napolitana y mozzarella gratinada.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'san-pollo-plancha',
    name: 'Pollo a la Plancha',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan ciabatta, pechuga de pollo a la plancha, champignones salteados y queso Edam.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'san-pollo-mostaza',
    name: 'Pollo a la Mostaza',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan croissant, pollo deshilachado, lechuga, tomate, palta y honey mustard.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'san-pollo-olivo',
    name: 'Pollo al Olivo',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan croissant, pollo deshilachado, lechuga, palta y crema de aceituna.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'san-pollo-apaltado',
    name: 'Pollo Apaltado',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description: 'Pan croissant, pollo deshilachado, mayonesa y palta.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'san-club-sandwich',
    name: 'Club Sándwich',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan blanco, jamón inglés, queso Edam, huevo, tocino, pollo deshilachado y acompañado de papas fritas.',
    variants: [{ id: 'regular', label: 'Con Papas Fritas', price: 35.0 }],
  },
  {
    id: 'san-club-la-panera',
    name: 'Club La Panera',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan blanco, jamón inglés, queso Edam, huevo frito, tocino, hamburguesa, espinaca, champignones y acompañado de papas fritas.',
    variants: [{ id: 'regular', label: 'Con Papas Fritas', price: 38.0 }],
  },
  {
    id: 'san-caprese',
    name: 'Caprese',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Pan pita blanco, queso mozzarella, tomate, albahaca y aceite de oliva.',
    variants: [{ id: 'regular', label: 'Unidad', price: 19.0 }],
  },
  {
    id: 'san-toston-palta',
    name: 'Tostón de Palta',
    category: 'sandwiches',
    categoryLabel: 'Sándwiches',
    description:
      'Tostada de pan campesino, palta, huevo cremoso y semillas de chía.',
    variants: [{ id: 'regular', label: 'Unidad', price: 18.0 }],
  },

  // ================= SMASH BURGER =================
  {
    id: 'smash-american',
    name: 'American Smash',
    category: 'smash-burger',
    categoryLabel: 'Smash Burger',
    description:
      'Doble smash, doble queso cheddar, lechuga, tomate, pepinillos y salsa smasher.',
    variants: [{ id: 'regular', label: 'Doble Smash', price: 32.0 }],
  },
  {
    id: 'smash-queso-tocino',
    name: 'Queso & Tocino Smash',
    category: 'smash-burger',
    categoryLabel: 'Smash Burger',
    description:
      'Doble smash, doble queso cheddar, tocino ahumado y salsa smasher.',
    variants: [{ id: 'regular', label: 'Doble Smash', price: 32.0 }],
  },
  {
    id: 'smash-onion',
    name: 'Onion Smash',
    category: 'smash-burger',
    categoryLabel: 'Smash Burger',
    description:
      'Doble smash, doble queso cheddar y cebollas caramelizadas.',
    variants: [{ id: 'regular', label: 'Doble Smash', price: 32.0 }],
  },

  // ================= ENSALADAS =================
  {
    id: 'ens-frutas',
    name: 'Ensalada de Frutas',
    category: 'ensaladas',
    categoryLabel: 'Ensaladas',
    description: 'Selección fresca de frutas de estación.',
    variants: [{ id: 'regular', label: 'Bowl', price: 19.0 }],
  },
  {
    id: 'ens-cesars',
    name: "Ensalada Cesar's",
    category: 'ensaladas',
    categoryLabel: 'Ensaladas',
    description:
      'Lechuga romana, queso parmesano, pechuga de pollo, crutones, vinagreta Cesars, pangrato y aceite de oliva.',
    variants: [{ id: 'regular', label: 'Bowl', price: 26.0 }],
  },
  {
    id: 'ens-oriental',
    name: 'Ensalada Oriental',
    category: 'ensaladas',
    categoryLabel: 'Ensaladas',
    description:
      'Lechuga romana, col morada picada, pimiento rojo en tiras, palta, hilos de wantan, semillas de ajonjolí, pollo empanizado al panko y vinagreta oriental.',
    variants: [{ id: 'regular', label: 'Bowl', price: 26.0 }],
  },
  {
    id: 'ens-la-panera',
    name: 'Ensalada La Panera',
    category: 'ensaladas',
    categoryLabel: 'Ensaladas',
    description:
      'Lechuga romana, palta, tocino crocante, tomate, choclo americano, huevo cocido, pechuga de pollo, aceite de oliva, queso fresco y vinagreta de queso azul.',
    variants: [{ id: 'regular', label: 'Bowl', price: 28.0 }],
  },

  // ================= PASTAS =================
  {
    id: 'pas-fetuccine-porcon',
    name: 'Fetuccine con Salsa de Hongos Porcón',
    category: 'pastas',
    categoryLabel: 'Pastas',
    description: 'Pasta artesanal en salsa cremosa de hongos Porcón.',
    variants: [{ id: 'regular', label: 'Plato', price: 30.0 }],
  },
  {
    id: 'pas-fetuccine-alfredo',
    name: 'Fetuccine con Salsa a lo Alfredo',
    category: 'pastas',
    categoryLabel: 'Pastas',
    description: 'Fetuccine en salsa blanca clásica con jamón y parmesano.',
    variants: [{ id: 'regular', label: 'Plato', price: 29.0 }],
  },
  {
    id: 'pas-spaghetti-pesto-milanesa',
    name: 'Spaghetti con Salsa al Pesto y Milanesa de Pollo',
    category: 'pastas',
    categoryLabel: 'Pastas',
    description:
      'Spaghetti en salsa verde de albahaca coronado con milanesa dorada de pollo.',
    variants: [{ id: 'regular', label: 'Plato', price: 29.0 }],
  },
  {
    id: 'pas-spaghetti-bolognesa',
    name: 'Spaghetti con Salsa Bolognesa',
    category: 'pastas',
    categoryLabel: 'Pastas',
    description: 'Spaghetti con salsa tradicional bolognesa de carne.',
    variants: [{ id: 'regular', label: 'Plato', price: 29.0 }],
  },

  // ================= EMPANADAS, PIQUEOS & PIZZAS =================
  {
    id: 'emp-carne',
    name: 'Empanada de Carne',
    category: 'empanadas-pizzas',
    categoryLabel: 'Empanadas & Pizzas',
    description: 'Empanada artesanal horneada rellena de carne.',
    variants: [{ id: 'regular', label: 'Unidad', price: 8.5 }],
  },
  {
    id: 'emp-pollo',
    name: 'Empanada de Pollo',
    category: 'empanadas-pizzas',
    categoryLabel: 'Empanadas & Pizzas',
    description: 'Empanada artesanal horneada rellena de pollo.',
    variants: [{ id: 'regular', label: 'Unidad', price: 8.5 }],
  },
  {
    id: 'emp-mixta',
    name: 'Empanada Mixta',
    category: 'empanadas-pizzas',
    categoryLabel: 'Empanadas & Pizzas',
    description: 'Empanada artesanal horneada rellena de jamón y queso.',
    variants: [{ id: 'regular', label: 'Unidad', price: 8.5 }],
  },
  {
    id: 'piq-salchipapa',
    name: 'Salchipapa Clásica',
    category: 'empanadas-pizzas',
    categoryLabel: 'Empanadas & Pizzas',
    description: 'Piqueo de papas fritas crocantes con salchicha dorada.',
    variants: [{ id: 'regular', label: 'Piqueo', price: 28.0 }],
  },
  {
    id: 'piz-margarita',
    name: 'Pizza Margarita',
    category: 'empanadas-pizzas',
    categoryLabel: 'Empanadas & Pizzas',
    description: 'Salsa de tomate, mozzarella y albahaca.',
    isNew: true,
    variants: [{ id: 'regular', label: 'Pizza', price: 26.0 }],
  },
  {
    id: 'piz-peperoni',
    name: 'Pizza Peperoni',
    category: 'empanadas-pizzas',
    categoryLabel: 'Empanadas & Pizzas',
    description: 'Salsa de tomate, mozzarella, pepperoni y aceite picante.',
    isNew: true,
    variants: [{ id: 'regular', label: 'Pizza', price: 28.0 }],
  },
  {
    id: 'piz-hawaiana',
    name: 'Pizza Hawaiana',
    category: 'empanadas-pizzas',
    categoryLabel: 'Empanadas & Pizzas',
    description: 'Salsa de tomate, mozzarella, jamón y piña dulce.',
    isNew: true,
    variants: [{ id: 'regular', label: 'Pizza', price: 28.0 }],
  },

  // ================= PASTELES SALADOS =================
  {
    id: 'psal-pastel-acelga',
    name: 'Pastel de Acelga',
    category: 'pasteles-salados',
    categoryLabel: 'Pasteles Salados',
    description: 'Tradicional pastel de acelga con masa quebrada artesanal.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entero', price: 80.0 },
    ],
  },
  {
    id: 'psal-quiche-panera',
    name: 'Quiche La Panera',
    category: 'pasteles-salados',
    categoryLabel: 'Pasteles Salados',
    description: 'Quiche horneado de la casa.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 17.0 },
      { id: 'entero', label: 'Entero', price: 95.0 },
    ],
  },

  // ================= WAFFLES =================
  {
    id: 'waf-helado',
    name: 'Waffle con Helado',
    category: 'waffles',
    categoryLabel: 'Waffles',
    description:
      'Waffles acompañado de 1 bola de helado (sabor a elegir), con fudge, arándanos y fresas.',
    variants: [{ id: 'regular', label: 'Con 1 Bola de Helado', price: 27.0 }],
  },
  {
    id: 'waf-frutos-bosque',
    name: 'Waffle Frutos del Bosque',
    category: 'waffles',
    categoryLabel: 'Waffles',
    description:
      'Waffles con miel de maple, arándanos, frambuesas y fresas.',
    variants: [{ id: 'regular', label: 'Unidad', price: 23.0 }],
  },
  {
    id: 'waf-tostada-francesa',
    name: 'Tostada Francesa',
    category: 'waffles',
    categoryLabel: 'Waffles',
    description:
      'Tostada dulce de brioche, frutas de estación, miel de maple y piel de naranja.',
    variants: [{ id: 'regular', label: 'Unidad', price: 21.0 }],
  },

  // ================= TORTAS CLÁSICAS & POSTRES =================
  {
    id: 'tor-bavarois-guindones',
    name: 'Bavarois de Guindones',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 13.0 },
      { id: 'entero', label: 'Torta Entera', price: 75.0 },
    ],
  },
  {
    id: 'tor-brasilera',
    name: 'Torta Brasilera',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Torta Entera', price: 85.0 },
    ],
  },
  {
    id: 'tor-chocolate',
    name: 'Torta de Chocolate',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Torta Entera', price: 80.0 },
    ],
  },
  {
    id: 'tor-chocopanera',
    name: 'Chocopanera',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Torta Entera', price: 80.0 },
    ],
  },
  {
    id: 'tor-crema-volteada',
    name: 'Crema Volteada',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 13.0 },
      { id: 'entero', label: 'Entera', price: 75.0 },
    ],
  },
  {
    id: 'tor-delicia-fresa',
    name: 'Delicia de Fresa',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Torta Entera', price: 95.0 },
    ],
  },
  {
    id: 'tor-delicia-durazno',
    name: 'Delicia de Durazno',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Torta Entera', price: 95.0 },
    ],
  },
  {
    id: 'tor-enrollado-lucuma',
    name: 'Enrollado de Lúcuma',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entero', price: 75.0 },
    ],
  },
  {
    id: 'tor-enrollado-chirimoya',
    name: 'Enrollado de Chirimoya',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entero', price: 75.0 },
    ],
  },
  {
    id: 'tor-milhojas-fresa',
    name: 'Milhojas de Fresa x5',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 13.0 },
      { id: 'entero', label: 'Entero (x5)', price: 65.0 },
    ],
  },
  {
    id: 'tor-milhojas-manjar',
    name: 'Milhojas de Manjar x5',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 8.0 },
      { id: 'entero', label: 'Entero (x5)', price: 40.0 },
    ],
  },
  {
    id: 'tor-pye-limon',
    name: 'Pye de Limón',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entero', price: 80.0 },
    ],
  },
  {
    id: 'tor-pye-manzana',
    name: 'Pye de Manzana',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entero', price: 80.0 },
    ],
  },
  {
    id: 'tor-praline',
    name: 'Praliné',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 16.0 },
      { id: 'entero', label: 'Torta Entera', price: 95.0 },
    ],
  },
  {
    id: 'tor-souffle-fresa',
    name: 'Soufflé de Fresa',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entero', price: 78.0 },
    ],
  },
  {
    id: 'tor-souffle-durazno',
    name: 'Soufflé de Durazno',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entero', price: 78.0 },
    ],
  },
  {
    id: 'tor-helada-frutada',
    name: 'Torta Helada Frutada',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 16.0 },
      { id: 'entero', label: 'Torta Entera', price: 90.0 },
    ],
  },
  {
    id: 'tor-tres-leches-clasico',
    name: 'Tres Leches Clásico',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 16.0 },
      { id: 'entero', label: 'Torta Entera', price: 95.0 },
    ],
  },
  {
    id: 'tor-tres-leches-chocolate',
    name: 'Tres Leches de Chocolate',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [
      { id: 'porcion', label: 'Porción', price: 16.0 },
      { id: 'entero', label: 'Torta Entera', price: 95.0 },
    ],
  },
  {
    id: 'tor-opera',
    name: 'Ópera',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [{ id: 'porcion', label: 'Porción', price: 13.0 }],
  },
  {
    id: 'tor-relampago-caramelo',
    name: 'Relámpago de Caramelo',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [{ id: 'porcion', label: 'Porción', price: 10.0 }],
  },
  {
    id: 'tor-relampago-chocolate',
    name: 'Relámpago de Chocolate',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [{ id: 'porcion', label: 'Porción', price: 10.0 }],
  },
  {
    id: 'tor-tartaleta-fresa',
    name: 'Tartaleta de Fresa',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [{ id: 'porcion', label: 'Porción', price: 10.0 }],
  },
  {
    id: 'tor-tartaleta-durazno',
    name: 'Tartaleta de Durazno',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [{ id: 'porcion', label: 'Porción', price: 10.0 }],
  },
  {
    id: 'tor-alfajores-manjar',
    name: 'Alfajores de Manjar',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [{ id: 'porcion', label: 'Porción', price: 7.0 }],
  },
  {
    id: 'tor-pionono',
    name: 'Pionono',
    category: 'tortas',
    categoryLabel: 'Tortas & Postres',
    variants: [{ id: 'porcion', label: 'Porción', price: 8.0 }],
  },

  // ================= TORTAS PREMIUM (20 CM) =================
  {
    id: 'tprem-berry-much',
    name: 'Berry Much (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-carrot-cake',
    name: 'Carrot Cake (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-cheesecake-fresa',
    name: 'Cheesecake de Fresa (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-cheesecake-sauco',
    name: 'Cheesecake de Sauco (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-cheesecake-oreo',
    name: 'Cheesecake de Oreo (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-cheesecake-maracuya',
    name: 'Cheesecake de Maracuyá (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-fresita-cake',
    name: 'Fresita Cake (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-negroni',
    name: 'Negroni (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-red-velvet',
    name: 'Red Velvet (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-selva-negra',
    name: 'Selva Negra (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },
  {
    id: 'tprem-tiramisu',
    name: 'Tiramisú (Premium 20cm)',
    category: 'tortas-premium',
    categoryLabel: 'Tortas Premium',
    description: 'Medida: 20 cm de diámetro.',
    variants: [
      { id: 'porcion', label: 'Porción', price: 15.0 },
      { id: 'entero', label: 'Entera (20cm)', price: 85.0 },
    ],
  },

  // ================= BEBIDAS CALIENTES =================
  {
    id: 'beb-espresso',
    name: 'Espresso',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [{ id: 'regular', label: 'Taza', price: 7.0 }],
  },
  {
    id: 'beb-espresso-doble',
    name: 'Espresso Doble',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [{ id: 'regular', label: 'Taza', price: 9.0 }],
  },
  {
    id: 'beb-americano',
    name: 'Café Americano',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [{ id: 'regular', label: 'Taza', price: 8.0 }],
  },
  {
    id: 'beb-americano-descafeinado',
    name: 'Americano Descafeinado',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [{ id: 'regular', label: 'Taza', price: 8.5 }],
  },
  {
    id: 'beb-moka',
    name: 'Moka',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [
      { id: 'regular', label: 'Normal', price: 12.0 },
      { id: 'con-crema', label: '+ Crema', price: 15.0 },
    ],
  },
  {
    id: 'beb-capuccino',
    name: 'Capuccino',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [
      { id: 'regular', label: 'Normal', price: 12.0 },
      { id: 'con-crema', label: '+ Crema', price: 15.0 },
    ],
  },
  {
    id: 'beb-latte',
    name: 'Latte',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [
      { id: 'regular', label: 'Normal', price: 12.0 },
      { id: 'con-crema', label: '+ Crema', price: 15.0 },
    ],
  },
  {
    id: 'beb-chocolate-caliente',
    name: 'Chocolate Caliente',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [
      { id: 'regular', label: 'Normal', price: 12.0 },
      { id: 'con-crema', label: '+ Crema', price: 15.0 },
    ],
  },
  {
    id: 'beb-te-infusion',
    name: 'Té / Manzanilla / Anís',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    variants: [
      { id: 'te', label: 'Té', price: 5.0 },
      { id: 'manzanilla', label: 'Manzanilla', price: 5.0 },
      { id: 'anis', label: 'Anís', price: 5.0 },
    ],
  },
  {
    id: 'beb-te-aromatico-jarra',
    name: 'Té Aromático en Jarra',
    category: 'bebidas-calientes',
    categoryLabel: 'Bebidas Calientes',
    description: "Sabores: Grandma's Garden, Mango'n Friends o Sweet Melissa.",
    variants: [
      { id: 'grandmas-garden', label: "Grandma's Garden", price: 13.0 },
      { id: 'mangon-friends', label: "Mango'n Friends", price: 13.0 },
      { id: 'sweet-melissa', label: 'Sweet Melissa', price: 13.0 },
    ],
  },

  // ================= JUGOS & REFRESCANTES =================
  {
    id: 'jug-chicha-maracuya-limonada',
    name: 'Chicha Morada / Maracuyá / Limonada',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [
      { id: 'chicha', label: 'Chicha', price: 8.0 },
      { id: 'maracuya', label: 'Maracuyá', price: 8.0 },
      { id: 'limonada', label: 'Limonada', price: 8.0 },
      { id: 'frozzen', label: 'En Frozzen (+S/2)', price: 10.0 },
    ],
  },
  {
    id: 'jug-pina-papaya-surtido',
    name: 'Jugo de Piña / Papaya / Surtido',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [
      { id: 'natural', label: 'Natural', price: 13.0 },
      { id: 'con-leche', label: '+ Leche (+S/2)', price: 15.0 },
      { id: 'frozzen', label: '+ Frozzen (+S/2)', price: 15.0 },
    ],
  },
  {
    id: 'jug-naranja-fresa-lucuma',
    name: 'Jugo de Naranja / Fresa / Lúcuma',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [
      { id: 'natural', label: 'Natural', price: 15.0 },
      { id: 'con-leche', label: '+ Leche (+S/2)', price: 17.0 },
      { id: 'frozzen', label: '+ Frozzen (+S/2)', price: 17.0 },
    ],
  },
  {
    id: 'ref-ice-tea',
    name: 'Ice Tea Clásico',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [{ id: 'regular', label: 'Vaso', price: 15.0 }],
  },
  {
    id: 'ref-blueberry-granada',
    name: 'Blueberry Granada Tea',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [{ id: 'regular', label: 'Vaso', price: 15.0 }],
  },
  {
    id: 'ref-blueberry-guayaba',
    name: 'Blueberry Guayaba Tea',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [{ id: 'regular', label: 'Vaso', price: 15.0 }],
  },
  {
    id: 'ref-frambuesa-tropical',
    name: 'Frambuesa Tropical',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [{ id: 'regular', label: 'Vaso', price: 15.0 }],
  },
  {
    id: 'ref-cherry-limonade',
    name: 'Cherry Limonade',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [{ id: 'regular', label: 'Vaso', price: 15.0 }],
  },
  {
    id: 'ref-green-apple',
    name: 'Green Apple Refrescante',
    category: 'jugos-refrescantes',
    categoryLabel: 'Jugos & Refrescantes',
    variants: [{ id: 'regular', label: 'Vaso', price: 15.0 }],
  },

  // ================= ADICIONALES =================
  {
    id: 'adi-papas-fritas',
    name: 'Adicional de Papas Fritas',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 9.0 }],
  },
  {
    id: 'adi-tocino',
    name: 'Adicional de Tocino x 2 Tiras',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: '2 Tiras', price: 8.0 }],
  },
  {
    id: 'adi-pollo-empanizado',
    name: 'Adicional Pollo Empanizado',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 16.0 }],
  },
  {
    id: 'adi-pan-ajo',
    name: 'Adicional Pan al Ajo',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 5.0 }],
  },
  {
    id: 'adi-camote',
    name: 'Adicional de Camote',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 4.0 }],
  },
  {
    id: 'adi-tostadas',
    name: 'Adicional Tostadas',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 4.0 }],
  },
  {
    id: 'adi-cebolla',
    name: 'Adicional de Cebolla',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 4.0 }],
  },
  {
    id: 'adi-huevo',
    name: 'Adicional de Huevo x 1',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: '1 Unidad', price: 3.0 }],
  },
  {
    id: 'adi-queso-parmesano',
    name: 'Adicional Queso Parmesano',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 3.0 }],
  },
  {
    id: 'adi-mermelada',
    name: 'Adicional de Mermelada',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 2.0 }],
  },
  {
    id: 'adi-mantequilla',
    name: 'Adicional Mantequilla',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Porción', price: 2.0 }],
  },
  {
    id: 'adi-leche-jarrita',
    name: 'Adicional Leche (Jarrita)',
    category: 'adicionales',
    categoryLabel: 'Adicionales',
    description: 'Sólo acompañado con platos a la carta.',
    variants: [{ id: 'regular', label: 'Jarrita', price: 2.0 }],
  },
];
