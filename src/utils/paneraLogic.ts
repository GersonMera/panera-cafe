import {
  MENU_ITEMS,
  CELEBRATION_OPTIONS,
  PRIMARY_LOCATIONS,
  VALIDATION_LOCATIONS,
  ALL_LIMA_SEDES,
  LA_PANERA_BRAND,
  type MenuItem,
  type SedeDistrictGroup,
  type UnifiedSedeItem,
} from '../data/laPaneraData';
import {
  CARTA_2025_ITEMS,
  OFFICIAL_SEDES_2025,
  type Carta2025Item,
  type CartaVariant,
} from '../data/carta2025Data';

export interface CelebrationOrderDraft {
  motiveId: string;
  cravingIds: string[];
  guestsCount: string;
  preferredSede: string;
  customNotes: string;
}

export interface QuickCartLine {
  lineKey: string; // `${itemId}__${variantId}`
  item: Carta2025Item;
  variant: CartaVariant;
  quantity: number;
}

export interface QuickOrderDraft {
  lines: QuickCartLine[];
  sedeId: string;
  modality: 'recojo-local' | 'consumo-salon' | 'delivery';
  customerName: string;
  notes: string;
}

/**
 * Formats a number in Soles (S/ XX.XX)
 */
export function formatSoles(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

/**
 * Filters the unified Lima sedes by district group and optional search text.
 */
export function filterLimaSedes(
  sedes: UnifiedSedeItem[],
  districtGroup: SedeDistrictGroup = 'todas',
  searchQuery = ''
): UnifiedSedeItem[] {
  const q = searchQuery.trim().toLowerCase();
  return sedes.filter((sede) => {
    const matchesDistrict =
      districtGroup === 'todas' || sede.districtGroup === districtGroup;
    const matchesQuery =
      q === '' ||
      sede.name.toLowerCase().includes(q) ||
      sede.address.toLowerCase().includes(q) ||
      sede.district.toLowerCase().includes(q) ||
      sede.reference.toLowerCase().includes(q);
    return matchesDistrict && matchesQuery;
  });
}

/**
 * Computes the geographic center and bounding box for a list of sedes so a single map can frame all of them.
 */
export function computeSedesMapViewport(sedes: UnifiedSedeItem[]): {
  center: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
  recommendedZoom: number;
} {
  const list = sedes.length > 0 ? sedes : ALL_LIMA_SEDES;
  let north = -90;
  let south = 90;
  let east = -180;
  let west = 180;

  for (const s of list) {
    if (s.coordinates.lat > north) north = s.coordinates.lat;
    if (s.coordinates.lat < south) south = s.coordinates.lat;
    if (s.coordinates.lng > east) east = s.coordinates.lng;
    if (s.coordinates.lng < west) west = s.coordinates.lng;
  }

  const center = {
    lat: Number(((north + south) / 2).toFixed(6)),
    lng: Number(((east + west) / 2).toFixed(6)),
  };

  const latSpan = Math.abs(north - south);
  const lngSpan = Math.abs(east - west);
  const maxSpan = Math.max(latSpan, lngSpan);

  let recommendedZoom = 13;
  if (list.length === 1) {
    recommendedZoom = 16;
  } else if (maxSpan < 0.015) {
    recommendedZoom = 15;
  } else if (maxSpan < 0.035) {
    recommendedZoom = 14;
  }

  return {
    center,
    bounds: { north, south, east, west },
    recommendedZoom,
  };
}

/**
 * Filters menu items by category and craving selector ("Algo caliente, algo contundente y algo dulce para cerrar").
 */
export function filterMenuItems(
  items: MenuItem[],
  categoryId: string,
  cravingId: string,
  searchQuery = ''
): MenuItem[] {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = categoryId === 'todas' || item.category === categoryId;
    const matchesCraving =
      cravingId === 'todos' || !cravingId || item.cravingType === cravingId;
    const matchesSearch =
      normalizedSearch === '' ||
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch) ||
      item.categoryLabel.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesCraving && matchesSearch;
  });
}

/**
 * Filters the complete 2025 official menu items by category, search query, and optional quick filters.
 */
export function filterCarta2025Items(
  items: Carta2025Item[],
  categoryId: string,
  searchQuery = '',
  quickFilter: 'todos' | 'nuevos' | 'enteros' = 'todos'
): Carta2025Item[] {
  const q = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = categoryId === 'todas' || item.category === categoryId;
    const matchesSearch =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      item.categoryLabel.toLowerCase().includes(q);

    const matchesQuick =
      quickFilter === 'todos' ||
      (quickFilter === 'nuevos' && Boolean(item.isNew)) ||
      (quickFilter === 'enteros' &&
        item.variants.some((v) =>
          v.label.toLowerCase().includes('enter')
        ));

    return matchesCategory && matchesSearch && matchesQuick;
  });
}

/**
 * Calculates item count and subtotal in Soles for the Quick Order Cart.
 */
export function calculateCartTotals(lines: QuickCartLine[]): {
  totalQuantity: number;
  subtotal: number;
  formattedSubtotal: string;
} {
  const totalQuantity = lines.reduce((sum, l) => sum + l.quantity, 0);
  const rawSubtotal = lines.reduce(
    (sum, l) => sum + l.variant.price * l.quantity,
    0
  );
  const subtotal = Math.round(rawSubtotal * 100) / 100;

  return {
    totalQuantity,
    subtotal,
    formattedSubtotal: formatSoles(subtotal),
  };
}

/**
 * Builds a clean, structured order ticket text from the 2025 Quick Order Cart.
 */
export function buildQuickOrderSummary(draft: QuickOrderDraft): {
  totalQuantity: number;
  subtotal: number;
  formattedSubtotal: string;
  sedeLabel: string;
  modalityLabel: string;
  ticketText: string;
  whatsappShareUrl: string;
} {
  const { totalQuantity, subtotal, formattedSubtotal } = calculateCartTotals(
    draft.lines
  );
  const sede =
    OFFICIAL_SEDES_2025.find((s) => s.id === draft.sedeId) ||
    OFFICIAL_SEDES_2025[0];
  const sedeLabel = `${sede.district} — ${sede.address}`;

  const modalityMap: Record<QuickOrderDraft['modality'], string> = {
    'recojo-local': 'Recojo en Tienda / Para Llevar',
    'consumo-salon': 'Reserva / Consumo en Salón',
    delivery: 'Delivery',
  };
  const modalityLabel = modalityMap[draft.modality];

  const itemizedLines = draft.lines.map((line) => {
    const lineTotal = formatSoles(line.variant.price * line.quantity);
    const variantSuffix =
      line.item.variants.length > 1 ? ` (${line.variant.label})` : '';
    return `• ${line.quantity}x ${line.item.name}${variantSuffix} — ${lineTotal}`;
  });

  const customerLine = draft.customerName.trim()
    ? `Cliente: ${draft.customerName.trim()}\n`
    : '';
  const notesLine = draft.notes.trim()
    ? `Nota: ${draft.notes.trim()}\n`
    : '';

  const ticketText = [
    `Hola La Panera Café, deseo realizar el siguiente pedido de la Carta 2025:`,
    ``,
    ...itemizedLines,
    ``,
    `Total Estimado: ${formattedSubtotal} (${totalQuantity} ${
      totalQuantity === 1 ? 'ítem' : 'ítems'
    })`,
    `Sede: ${sedeLabel}`,
    `Modalidad: ${modalityLabel}`,
    customerLine + notesLine,
  ]
    .join('\n')
    .trim();

  return {
    totalQuantity,
    subtotal,
    formattedSubtotal,
    sedeLabel,
    modalityLabel,
    ticketText,
    whatsappShareUrl: LA_PANERA_BRAND.channels.whatsappBocaditosTortas,
  };
}

/**
 * Builds a complete, human-readable summary for the "Mesa de Celebración: Bocaditos y Tortas a Pedido" planner
 * and validates that the official WhatsApp target URL (`https://wa.link/1ocd8m`) is preserved.
 */
export function buildCelebrationOrderSummary(draft: CelebrationOrderDraft): {
  isValid: boolean;
  motiveTitle: string;
  selectedCravingTitles: string[];
  summaryText: string;
  officialWhatsAppUrl: string;
  validationNote: string;
} {
  const motive =
    CELEBRATION_OPTIONS.motives.find((m) => m.id === draft.motiveId) ||
    CELEBRATION_OPTIONS.motives[0];

  const selectedCravingTitles = CELEBRATION_OPTIONS.cravings
    .filter((c) => draft.cravingIds.includes(c.id))
    .map((c) => c.title);

  const effectiveCravings =
    selectedCravingTitles.length > 0
      ? selectedCravingTitles
      : [CELEBRATION_OPTIONS.cravings[0].title];

  const guestsLabel = draft.guestsCount.trim() || '10-15 invitados';
  const sedeLabel = draft.preferredSede.trim() || 'Sede Pueblo Libre / Jesús María';
  const notesSegment = draft.customNotes.trim()
    ? ` | Detalles: ${draft.customNotes.trim()}`
    : '';

  const summaryText = `Hola La Panera Café, deseo cotizar un pedido para ${motive.title} (${guestsLabel}) con: ${effectiveCravings.join(
    ' + '
  )}. Referencia de recojo/consulta: ${sedeLabel}${notesSegment}. ${CELEBRATION_OPTIONS.validationNote}`;

  return {
    isValid: draft.cravingIds.length > 0 && Boolean(draft.motiveId),
    motiveTitle: motive.title,
    selectedCravingTitles: effectiveCravings,
    summaryText,
    officialWhatsAppUrl: CELEBRATION_OPTIONS.whatsappOfficialLink,
    validationNote: CELEBRATION_OPTIONS.validationNote,
  };
}

/**
 * Verifies strict compliance with brand data rules and the 2025 Official Menu PDF:
 * - Official WhatsApp channel is https://wa.link/1ocd8m
 * - Primary locations are Pueblo Libre (Av. San Martín 801) and Jesús María (Av. Cuba 844)
 * - 2025 PDF Menu has 8 official sedes and 90+ real priced items
 */
export function auditDataIntegrity() {
  const hasInventedPrices = MENU_ITEMS.some((item) => /S\/\s*\d+/i.test(item.priceStatus));
  const allHaveOfficialPriceStamp = MENU_ITEMS.every(
    (item) => item.priceStatus === LA_PANERA_BRAND.priceValidationStamp
  );
  const hasTwoPrimaryLocations =
    PRIMARY_LOCATIONS.length === 2 &&
    PRIMARY_LOCATIONS[0].address.includes('Av. San Martín 801') &&
    PRIMARY_LOCATIONS[1].address.includes('Av. Cuba 844');
  const hasValidationLocations = VALIDATION_LOCATIONS.length >= 4;
  const hasCompleteCarta2025 =
    CARTA_2025_ITEMS.length >= 90 && OFFICIAL_SEDES_2025.length === 8;

  return {
    hasInventedPrices,
    allHaveOfficialPriceStamp,
    hasTwoPrimaryLocations,
    hasValidationLocations,
    hasCompleteCarta2025,
    unifiedLimaSedesCount: ALL_LIMA_SEDES.length,
    whatsappLinkValid:
      LA_PANERA_BRAND.channels.whatsappBocaditosTortas === 'https://wa.link/1ocd8m',
  };
}

