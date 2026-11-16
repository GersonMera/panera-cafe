import test from 'node:test';
import assert from 'node:assert/strict';
import { MENU_ITEMS, ALL_LIMA_SEDES } from '../data/laPaneraData';
import { CARTA_2025_ITEMS, OFFICIAL_SEDES_2025 } from '../data/carta2025Data';
import {
  filterMenuItems,
  filterCarta2025Items,
  filterLimaSedes,
  computeSedesMapViewport,
  calculateCartTotals,
  buildQuickOrderSummary,
  buildCelebrationOrderSummary,
  auditDataIntegrity,
} from './paneraLogic';

test('auditDataIntegrity confirms verified locations/channels and complete 2025 menu', () => {
  const report = auditDataIntegrity();
  assert.equal(report.hasInventedPrices, false);
  assert.equal(report.allHaveOfficialPriceStamp, true);
  assert.equal(report.hasTwoPrimaryLocations, true);
  assert.equal(report.hasValidationLocations, true);
  assert.equal(report.hasCompleteCarta2025, true);
  assert.equal(report.unifiedLimaSedesCount, 9);
  assert.equal(report.whatsappLinkValid, true);
  assert.equal(OFFICIAL_SEDES_2025.length, 8);
});

test('filterLimaSedes and computeSedesMapViewport frame all 9 Lima sedes accurately', () => {
  const allSedes = filterLimaSedes(ALL_LIMA_SEDES, 'todas');
  assert.equal(allSedes.length, 9);

  const puebloLibreSedes = filterLimaSedes(ALL_LIMA_SEDES, 'pueblo-libre');
  assert.equal(puebloLibreSedes.length, 3);

  const jesusMariaSedes = filterLimaSedes(ALL_LIMA_SEDES, 'jesus-maria');
  assert.equal(jesusMariaSedes.length, 2);

  const viewportAll = computeSedesMapViewport(allSedes);
  assert.ok(viewportAll.center.lat < -12.06 && viewportAll.center.lat > -12.11);
  assert.ok(viewportAll.center.lng < -77.0 && viewportAll.center.lng > -77.07);
  assert.equal(viewportAll.recommendedZoom, 13);

  const viewportSingle = computeSedesMapViewport([allSedes[0]]);
  assert.equal(viewportSingle.recommendedZoom, 16);
});

test('filterMenuItems filters by category and craving type accurately', () => {
  const allItems = filterMenuItems(MENU_ITEMS, 'todas', 'todos');
  assert.equal(allItems.length, MENU_ITEMS.length);

  const bakeryItems = filterMenuItems(MENU_ITEMS, 'panaderia-pasteleria', 'todos');
  assert.ok(bakeryItems.length >= 2);
  assert.ok(bakeryItems.every((i) => i.category === 'panaderia-pasteleria'));

  const sweetItems = filterMenuItems(MENU_ITEMS, 'todas', 'dulce');
  assert.ok(sweetItems.length >= 3);
  assert.ok(sweetItems.every((i) => i.cravingType === 'dulce'));

  const searchWafflesCategory = filterMenuItems(MENU_ITEMS, 'todas', 'todos', 'waffles');
  assert.equal(searchWafflesCategory.length, 2);

  const searchSpecificWaffle = filterMenuItems(MENU_ITEMS, 'todas', 'todos', 'waffles dorados');
  assert.equal(searchSpecificWaffle.length, 1);
  assert.equal(searchSpecificWaffle[0].id, 'waffles-frutas-gelato');
});

test('filterCarta2025Items and calculateCartTotals handle multi-variant items and exact Soles math', () => {
  const sandwiches = filterCarta2025Items(CARTA_2025_ITEMS, 'sandwiches', '');
  assert.ok(sandwiches.length >= 18);

  const newItems = filterCarta2025Items(CARTA_2025_ITEMS, 'todas', '', 'nuevos');
  assert.ok(newItems.length >= 6);
  assert.ok(newItems.every((i) => i.isNew));

  const wholeCakes = filterCarta2025Items(CARTA_2025_ITEMS, 'todas', '', 'enteros');
  assert.ok(wholeCakes.length >= 25);

  const milanesa = CARTA_2025_ITEMS.find((i) => i.id === 'san-milanesa-caballo')!;
  const berryMuch = CARTA_2025_ITEMS.find((i) => i.id === 'tprem-berry-much')!;

  const summary = buildQuickOrderSummary({
    lines: [
      {
        lineKey: `${milanesa.id}__regular`,
        item: milanesa,
        variant: milanesa.variants[0], // S/ 29.90
        quantity: 2,
      },
      {
        lineKey: `${berryMuch.id}__entero`,
        item: berryMuch,
        variant: berryMuch.variants[1], // Entera S/ 85.00
        quantity: 1,
      },
    ],
    sedeId: 'jm-cuba',
    modality: 'recojo-local',
    customerName: 'Valeria',
    notes: 'Para recoger a las 11:00 am',
  });

  const totals = calculateCartTotals([
    {
      lineKey: `${milanesa.id}__regular`,
      item: milanesa,
      variant: milanesa.variants[0],
      quantity: 2,
    },
    {
      lineKey: `${berryMuch.id}__entero`,
      item: berryMuch,
      variant: berryMuch.variants[1],
      quantity: 1,
    },
  ]);

  assert.equal(totals.totalQuantity, 3);
  assert.equal(totals.subtotal, 144.8);
  assert.equal(totals.formattedSubtotal, 'S/ 144.80');
  assert.ok(summary.ticketText.includes('2x Milanesa a Caballo — S/ 59.80'));
  assert.ok(summary.ticketText.includes('1x Berry Much (Premium 20cm) (Entera (20cm)) — S/ 85.00'));
  assert.ok(summary.ticketText.includes('Jesús María — Av. Cuba 844'));
});

test('buildCelebrationOrderSummary constructs accurate summary and preserves wa.link/1ocd8m', () => {
  const result = buildCelebrationOrderSummary({
    motiveId: 'cumpleanos-familiar',
    cravingIds: ['tortas-enteras', 'bocaditos-salados-dulces'],
    guestsCount: '20 personas',
    preferredSede: 'Sede Pueblo Libre (Av. San Martín 801)',
    customNotes: 'Torta de chocolate y empanaditas',
  });

  assert.equal(result.isValid, true);
  assert.equal(result.motiveTitle, 'Cumpleaños Familiar');
  assert.equal(result.selectedCravingTitles.length, 2);
  assert.equal(result.officialWhatsAppUrl, 'https://wa.link/1ocd8m');
  assert.ok(result.summaryText.includes('Cumpleaños Familiar'));
  assert.ok(result.summaryText.includes('[CONFIRMAR PLAZOS DE ANTICIPACIÓN Y PORCIONES]'));
});

