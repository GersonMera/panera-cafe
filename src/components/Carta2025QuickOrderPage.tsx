import React, { useState } from 'react';
import {
  CARTA_2025_CATEGORIES,
  CARTA_2025_ITEMS,
  OFFICIAL_SEDES_2025,
  CARTA_PDF_URL,
  type Carta2025Item,
  type CartaVariant,
} from '../data/carta2025Data';
import { LA_PANERA_BRAND } from '../data/laPaneraData';
import {
  filterCarta2025Items,
  buildQuickOrderSummary,
  formatSoles,
  type QuickCartLine,
  type QuickOrderDraft,
} from '../utils/paneraLogic';
import {
  LaPaneraLogoLockup,
  BreadLoafIcon,
  BotanicalBranchSVG,
} from './PaneraGraphics';
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Copy,
  Check,
  FileText,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  X,
} from 'lucide-react';

interface Carta2025QuickOrderPageProps {
  onBackToLanding: () => void;
  cartLines: QuickCartLine[];
  onAddVariant: (item: Carta2025Item, variant: CartaVariant) => void;
  onUpdateQuantity: (lineKey: string, delta: number) => void;
  onRemoveLine: (lineKey: string) => void;
  onClearCart: () => void;
}

const POPULAR_ADDONS_IDS = [
  'adi-papas-fritas',
  'adi-huevo',
  'adi-tocino',
  'adi-camote',
  'adi-pan-ajo',
];

export const Carta2025QuickOrderPage: React.FC<Carta2025QuickOrderPageProps> = ({
  onBackToLanding,
  cartLines,
  onAddVariant,
  onUpdateQuantity,
  onRemoveLine,
  onClearCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickFilter, setQuickFilter] = useState<'todos' | 'nuevos' | 'enteros'>(
    'todos'
  );
  // Track selected variant ID per item ID so multi-variant items (Porción vs Entero) switch in 1 click
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(
    {}
  );

  // Order checkout preferences
  const [selectedSedeId, setSelectedSedeId] = useState<string>(
    OFFICIAL_SEDES_2025[0].id
  );
  const [modality, setModality] =
    useState<QuickOrderDraft['modality']>('recojo-local');
  const [customerName, setCustomerName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copiedTicket, setCopiedTicket] = useState<boolean>(false);
  const [showMobileCartDrawer, setShowMobileCartDrawer] = useState<boolean>(false);
  const [showPdfPreviewModal, setShowPdfPreviewModal] = useState<boolean>(false);

  const filteredItems = filterCarta2025Items(
    CARTA_2025_ITEMS,
    activeCategory,
    searchQuery,
    quickFilter
  );

  const orderSummary = buildQuickOrderSummary({
    lines: cartLines,
    sedeId: selectedSedeId,
    modality,
    customerName,
    notes,
  });

  const getActiveVariant = (item: Carta2025Item): CartaVariant => {
    const chosenId = selectedVariants[item.id];
    if (chosenId) {
      const found = item.variants.find((v) => v.id === chosenId);
      if (found) return found;
    }
    return item.variants[0];
  };

  const getLineQuantity = (itemId: string, variantId: string): number => {
    const key = `${itemId}__${variantId}`;
    const found = cartLines.find((l) => l.lineKey === key);
    return found ? found.quantity : 0;
  };

  const handleCopyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderSummary.ticketText);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 3000);
    } catch {
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 3000);
    }
  };

  const popularAddonItems = CARTA_2025_ITEMS.filter((item) =>
    POPULAR_ADDONS_IDS.includes(item.id)
  );

  // Group filtered items by category when viewing 'todas' so the menu reads like a clean editorial sheet
  const categoriesToRender =
    activeCategory === 'todas'
      ? CARTA_2025_CATEGORIES.filter((c) => c.id !== 'todas')
      : CARTA_2025_CATEGORIES.filter((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E9] text-[#2F302D]">
      {/* Sticky Top Header for /carta Route */}
      <header className="sticky top-0 z-30 bg-[#EFE3D4]/95 backdrop-blur-md border-b border-[#2F302D]/25 px-3 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F6F1E9] text-[#2F302D] border border-[#2F302D] rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a Portada</span>
            </button>

            <div className="hidden sm:block">
              <LaPaneraLogoLockup size="sm" cutoutColor="#EFE3D4" />
            </div>
          </div>

          <div className="text-center hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#626B55] block">
              PEDIDO FÁCIL EN 3 PASOS · PRECIOS OFICIALES 2025
            </span>
            <h1 className="font-editorial text-2xl text-[#2F302D] leading-none">
              Carta Completa & Pedido Rápido
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPdfPreviewModal(true)}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-[#D9C9B1]/50 text-[#2F302D] border border-[#2F302D] rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[#626B55]" />
              <span className="hidden sm:inline">Ver Carta PDF Original</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setShowMobileCartDrawer(true)}
              className="lg:hidden inline-flex items-center gap-1.5 bg-[#2F302D] text-[#EFE3D4] rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="tabular-nums">{orderSummary.formattedSubtotal}</span>
              <span className="bg-[#EFE3D4] text-[#2F302D] rounded-full px-1.5 py-0.2 text-[10px] font-extrabold tabular-nums">
                {orderSummary.totalQuantity}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Intro & 3-Step Simplicity Strip */}
      <section className="bg-[#EFE3D4] border-b border-[#2F302D]/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <BotanicalBranchSVG className="w-12 h-7" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#626B55]">
                  CARTA OFICIAL 2025 · 8 SEDES EN LIMA
                </span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#2F302D] leading-tight">
                Arma tu pedido sin complicarte
              </h2>
              <p className="text-sm sm:text-base text-[#3F302A] mt-1 max-w-2xl">
                Elige en un clic desayunos (7 AM – 12 PM), sándwiches, pastas, waffles o tortas por porción o enteras. Tu lista calcula el total exacto en Soles para enviarlo listo por WhatsApp o pedir en Rappi.
              </p>
            </div>

            {/* 3 Simple Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:w-[540px] shrink-0">
              <div className="bg-[#F6F1E9] border border-[#2F302D]/30 rounded-xl p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55] block">
                  PASO 01
                </span>
                <div className="font-bold text-xs text-[#2F302D] mt-0.5">
                  Elige plato o tamaño
                </div>
                <p className="text-[11px] text-[#3F302A] mt-0.5">
                  Toca Porción / Entera y pulsa + Agregar.
                </p>
              </div>
              <div className="bg-[#F6F1E9] border border-[#2F302D]/30 rounded-xl p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55] block">
                  PASO 02
                </span>
                <div className="font-bold text-xs text-[#2F302D] mt-0.5">
                  Indica sede y modo
                </div>
                <p className="text-[11px] text-[#3F302A] mt-0.5">
                  8 locales oficiales para recojo, salón o delivery.
                </p>
              </div>
              <div className="bg-[#F6F1E9] border border-[#2F302D]/30 rounded-xl p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55] block">
                  PASO 03
                </span>
                <div className="font-bold text-xs text-[#2F302D] mt-0.5">
                  Envía en 1 clic
                </div>
                <p className="text-[11px] text-[#3F302A] mt-0.5">
                  Ticket listo con precios para WhatsApp o Rappi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter & Category Navigation Bar */}
      <div className="sticky top-[57px] z-20 bg-[#F6F1E9]/95 backdrop-blur-md border-b border-[#2F302D]/20 py-3 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Search + Quick Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-lg">
              <label htmlFor="carta-2025-search" className="sr-only">
                Buscar plato, bebida o torta en la Carta 2025
              </label>
              <Search className="w-4 h-4 text-[#3F302A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="carta-2025-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ej. chicharrón, milanesa, tres leches, capuccino..."
                className="w-full bg-white text-[#2F302D] placeholder:text-[#3F302A]/60 border border-[#2F302D] rounded-full pl-10 pr-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#626B55]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3F302A] hover:text-[#2F302D] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Segment Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setQuickFilter('todos')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  quickFilter === 'todos'
                    ? 'bg-[#2F302D] text-[#EFE3D4]'
                    : 'bg-white text-[#2F302D] border border-[#2F302D]/30 hover:bg-[#EFE3D4]'
                }`}
              >
                Todos ({CARTA_2025_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={() => setQuickFilter('nuevos')}
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  quickFilter === 'nuevos'
                    ? 'bg-[#626B55] text-white'
                    : 'bg-white text-[#2F302D] border border-[#2F302D]/30 hover:bg-[#EFE3D4]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Nuevos en Carta</span>
              </button>
              <button
                type="button"
                onClick={() => setQuickFilter('enteros')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  quickFilter === 'enteros'
                    ? 'bg-[#2F302D] text-[#EFE3D4]'
                    : 'bg-white text-[#2F302D] border border-[#2F302D]/30 hover:bg-[#EFE3D4]'
                }`}
              >
                Tortas y Pasteles Enteros
              </button>
            </div>
          </div>

          {/* Horizontal Category Tabs */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
            role="tablist"
            aria-label="Familias de la Carta 2025"
          >
            {CARTA_2025_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#2F302D] text-[#EFE3D4] shadow-xs'
                      : 'bg-[#EFE3D4] text-[#2F302D] hover:bg-[#D9C9B1] border border-[#2F302D]/25'
                  }`}
                >
                  {cat.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 2-Column Workspace: Left Menu List (8 cols) + Right Sticky Order Tray (4 cols) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Menu Catalog */}
          <div className="lg:col-span-8 space-y-10">
            {filteredItems.length === 0 ? (
              <div className="bg-white border border-[#2F302D] rounded-2xl p-10 text-center">
                <BreadLoafIcon className="w-16 h-10 mx-auto mb-3" cutoutColor="#FFFFFF" />
                <h3 className="font-editorial text-2xl text-[#2F302D]">
                  No encontramos platos con ese filtro
                </h3>
                <p className="text-sm text-[#3F302A] mt-1 mb-5">
                  Intenta buscando otro término o muestra todas las categorías de la carta.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('todas');
                    setSearchQuery('');
                    setQuickFilter('todos');
                  }}
                  className="bg-[#2F302D] text-[#EFE3D4] rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Mostrar Toda la Carta 2025
                </button>
              </div>
            ) : (
              categoriesToRender.map((categoryGroup) => {
                const groupItems = filteredItems.filter(
                  (item) => item.category === categoryGroup.id
                );
                if (groupItems.length === 0) return null;

                return (
                  <section
                    key={categoryGroup.id}
                    aria-label={categoryGroup.label}
                    className="space-y-4"
                  >
                    {/* Category Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b-2 border-[#2F302D]">
                      <div>
                        <h2 className="font-editorial text-3xl sm:text-4xl text-[#2F302D] leading-none">
                          {categoryGroup.label}
                        </h2>
                        {categoryGroup.note && (
                          <p className="text-xs text-[#626B55] font-semibold mt-1">
                            {categoryGroup.note}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#3F302A] tabular-nums">
                        {groupItems.length}{' '}
                        {groupItems.length === 1 ? 'opción' : 'opciones'}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {groupItems.map((item) => {
                        const activeVariant = getActiveVariant(item);
                        const qtyInCart = getLineQuantity(
                          item.id,
                          activeVariant.id
                        );
                        const hasMultipleVariants = item.variants.length > 1;

                        return (
                          <article
                            key={item.id}
                            className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                              qtyInCart > 0
                                ? 'bg-[#EFE3D4] border-[#2F302D]/60 shadow-xs'
                                : 'bg-white hover:bg-[#EFE3D4]/55 border-[#2F302D]/20'
                            }`}
                          >
                            <div>
                              {/* Top Metadata & Title */}
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-editorial text-2xl text-[#2F302D] leading-snug">
                                  {item.name}
                                </h3>
                                <span className="font-semibold text-base text-[#2F302D] tabular-nums shrink-0">
                                  {formatSoles(activeVariant.price)}
                                </span>
                              </div>

                              {/* Optional New / Schedule Subtle Text Line */}
                              {(item.isNew || item.scheduleNote) && (
                                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mt-0.5">
                                  {item.isNew && (
                                    <span className="text-[#626B55]">
                                      ★ Nuevo Ingreso
                                    </span>
                                  )}
                                  {item.isNew && item.scheduleNote && (
                                    <span aria-hidden="true">·</span>
                                  )}
                                  {item.scheduleNote && (
                                    <span className="text-[#3F302A] inline-flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {item.scheduleNote}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Ingredients / Description */}
                              {item.description && (
                                <p className="text-xs text-[#3F302A] leading-relaxed mt-1.5">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {/* Bottom Controls: Variant Selector (if multiple) + Add / Stepper Button */}
                            <div className="pt-2 border-t border-[#2F302D]/10 flex flex-col gap-2.5">
                              {hasMultipleVariants && (
                                <div
                                  className="flex flex-wrap items-center gap-1.5"
                                  role="group"
                                  aria-label={`Opciones para ${item.name}`}
                                >
                                  {item.variants.map((v) => {
                                    const isChosen = v.id === activeVariant.id;
                                    const vQty = getLineQuantity(item.id, v.id);
                                    return (
                                      <button
                                        key={v.id}
                                        type="button"
                                        onClick={() =>
                                          setSelectedVariants((prev) => ({
                                            ...prev,
                                            [item.id]: v.id,
                                          }))
                                        }
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer tabular-nums ${
                                          isChosen
                                            ? 'bg-[#2F302D] text-[#EFE3D4]'
                                            : 'bg-[#F6F1E9] text-[#2F302D] hover:bg-[#D9C9B1] border border-[#2F302D]/20'
                                        }`}
                                      >
                                        {v.label}: {formatSoles(v.price)}
                                        {vQty > 0 ? ` (${vQty})` : ''}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] text-[#3F302A] font-medium">
                                  {activeVariant.label}
                                </span>

                                {qtyInCart > 0 ? (
                                  <div className="inline-flex items-center gap-2 bg-[#2F302D] text-[#EFE3D4] rounded-full px-2 py-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onUpdateQuantity(
                                          `${item.id}__${activeVariant.id}`,
                                          -1
                                        )
                                      }
                                      aria-label={`Disminuir ${item.name}`}
                                      className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="text-xs font-extrabold px-1.5 tabular-nums">
                                      {qtyInCart}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        onAddVariant(item, activeVariant)
                                      }
                                      aria-label={`Aumentar ${item.name}`}
                                      className="w-6 h-6 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      onAddVariant(item, activeVariant)
                                    }
                                    className="inline-flex items-center gap-1.5 bg-[#2F302D] hover:bg-[#626B55] text-[#EFE3D4] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Agregar</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            )}
          </div>

          {/* Right Column: Sticky Live Order Tray ("Tu Pedido") */}
          <aside
            aria-label="Resumen de tu pedido"
            className="lg:col-span-4 lg:sticky lg:top-[132px] bg-[#EFE3D4] border border-[#2F302D]/30 rounded-2xl p-5 sm:p-6 shadow-md space-y-5"
          >
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#2F302D]/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#2F302D] text-[#EFE3D4] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-editorial text-2xl text-[#2F302D] leading-none">
                    Tu Pedido Rápido
                  </h2>
                  <span className="text-xs text-[#3F302A] tabular-nums">
                    {orderSummary.totalQuantity}{' '}
                    {orderSummary.totalQuantity === 1
                      ? 'producto seleccionado'
                      : 'productos seleccionados'}
                  </span>
                </div>
              </div>

              {cartLines.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] font-bold uppercase tracking-wider text-[#3F302A] hover:text-red-700 underline cursor-pointer"
                >
                  Vaciar
                </button>
              )}
            </div>

            {/* Selected Items List */}
            {cartLines.length === 0 ? (
              <div className="bg-[#F6F1E9] border border-[#2F302D]/20 rounded-2xl p-6 text-center space-y-2">
                <BreadLoafIcon
                  className="w-12 h-7 mx-auto"
                  cutoutColor="#F6F1E9"
                />
                <p className="font-bold text-sm text-[#2F302D]">
                  Tu bandeja está vacía
                </p>
                <p className="text-xs text-[#3F302A]">
                  Toca <strong>+ Agregar</strong> en cualquier plato, sándwich o torta de la carta para calcular tu pedido al instante.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {cartLines.map((line) => (
                  <div
                    key={line.lineKey}
                    className="bg-white border border-[#2F302D]/30 rounded-xl p-3 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-[#2F302D] truncate">
                        {line.item.name}
                      </div>
                      <div className="text-[11px] text-[#626B55] font-semibold tabular-nums">
                        {line.variant.label} · {formatSoles(line.variant.price)}{' '}
                        c/u
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(line.lineKey, -1)}
                        aria-label={`Restar 1 ${line.item.name}`}
                        className="w-6 h-6 rounded-md bg-[#EFE3D4] hover:bg-[#D9C9B1] text-[#2F302D] flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold w-5 text-center tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(line.lineKey, 1)}
                        aria-label={`Sumar 1 ${line.item.name}`}
                        className="w-6 h-6 rounded-md bg-[#EFE3D4] hover:bg-[#D9C9B1] text-[#2F302D] flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveLine(line.lineKey)}
                        aria-label={`Eliminar ${line.item.name}`}
                        className="p-1 text-[#3F302A] hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 1-Click Quick Add-ons Strip ("Adicionales Rápidos") */}
            <div className="bg-[#F6F1E9] border border-[#2F302D]/20 rounded-xl p-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#626B55] block mb-2">
                ¿SUMAR UN ADICIONAL A TU PLATO?
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularAddonItems.map((addon) => (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => onAddVariant(addon, addon.variants[0])}
                    className="bg-white hover:bg-[#D9C9B1] text-[#2F302D] border border-[#2F302D]/30 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer tabular-nums"
                  >
                    + {addon.name.replace('Adicional de ', '').replace('Adicional ', '')}{' '}
                    ({formatSoles(addon.variants[0].price)})
                  </button>
                ))}
              </div>
            </div>

            {/* Sede & Modality Selector */}
            <div className="space-y-3 pt-1">
              <div>
                <label
                  htmlFor="quick-order-sede"
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2F302D] mb-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#626B55]" />
                  <span>Elige tu Sede (8 Locales en Carta 2025)</span>
                </label>
                <select
                  id="quick-order-sede"
                  value={selectedSedeId}
                  onChange={(e) => setSelectedSedeId(e.target.value)}
                  className="w-full bg-white border border-[#2F302D] rounded-xl px-3 py-2 text-xs font-semibold text-[#2F302D]"
                >
                  {OFFICIAL_SEDES_2025.map((sede) => (
                    <option key={sede.id} value={sede.id}>
                      {sede.district} — {sede.address}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#2F302D] mb-1">
                  Modalidad de Pedido
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'recojo-local', label: 'Para Llevar' },
                      { id: 'consumo-salon', label: 'En Salón' },
                      { id: 'delivery', label: 'Delivery' },
                    ] as const
                  ).map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setModality(mod.id)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                        modality === mod.id
                          ? 'bg-[#2F302D] text-[#EFE3D4] border-[#2F302D]'
                          : 'bg-white text-[#2F302D] border-[#2F302D]/30 hover:bg-[#F6F1E9]'
                      }`}
                    >
                      {mod.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="quick-order-name"
                    className="block text-[11px] font-bold uppercase text-[#2F302D] mb-1"
                  >
                    Tu Nombre (Opcional)
                  </label>
                  <input
                    id="quick-order-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Familia Gómez"
                    className="w-full bg-white border border-[#2F302D]/40 rounded-xl px-3 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quick-order-notes"
                    className="block text-[11px] font-bold uppercase text-[#2F302D] mb-1"
                  >
                    Indicación / Hora
                  </label>
                  <input
                    id="quick-order-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Recojo 10:30 am"
                    className="w-full bg-white border border-[#2F302D]/40 rounded-xl px-3 py-1.5 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Total Box */}
            <div className="bg-[#2F302D] text-[#EFE3D4] rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9C9B1] block">
                  TOTAL ESTIMADO EN CARTA
                </span>
                <span className="text-xs text-[#EFE3D4]/80">
                  {orderSummary.sedeLabel}
                </span>
              </div>
              <div className="font-display font-extrabold text-2xl tabular-nums">
                {orderSummary.formattedSubtotal}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={LA_PANERA_BRAND.channels.whatsappBocaditosTortas}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  handleCopyOrder();
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#626B55] hover:bg-[#4e5643] text-white border-2 border-[#2F302D] rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider shadow-[0_3px_0_#2F302D] transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Enviar Pedido por WhatsApp Oficial</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#F6F1E9] text-[#2F302D] border border-[#2F302D] rounded-xl py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  {copiedTicket ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#626B55]" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Ticket</span>
                    </>
                  )}
                </button>

                <a
                  href={LA_PANERA_BRAND.channels.rappiDelivery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#E9D8D7] hover:bg-[#d8c1bf] text-[#2F302D] border border-[#2F302D] rounded-xl py-2.5 px-3 text-[11px] font-bold uppercase tracking-wider"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Ir a Rappi</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Sticky Bottom Checkout Bar */}
      {cartLines.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2F302D] text-[#EFE3D4] border-t-2 border-[#EFE3D4]/20 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#D9C9B1]">
              Tu Pedido ({orderSummary.totalQuantity} ítems)
            </div>
            <div className="font-display font-extrabold text-lg tabular-nums">
              {orderSummary.formattedSubtotal}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMobileCartDrawer(true)}
            className="bg-[#EFE3D4] text-[#2F302D] rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Ver y Enviar Pedido
          </button>
        </div>
      )}

      {/* Mobile Order Drawer Modal */}
      {showMobileCartDrawer && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-[#2F302D]/75 backdrop-blur-sm flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Resumen de Pedido Móvil"
        >
          <div className="bg-[#EFE3D4] border-t-2 border-[#2F302D] rounded-t-[2rem] w-full max-h-[85vh] overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2F302D]/20 pb-3">
              <h3 className="font-display font-bold text-lg uppercase text-[#2F302D]">
                Resumen de Tu Pedido ({orderSummary.formattedSubtotal})
              </h3>
              <button
                type="button"
                onClick={() => setShowMobileCartDrawer(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#2F302D] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre className="bg-white border border-[#2F302D]/30 rounded-xl p-3 text-xs font-sans whitespace-pre-wrap text-[#2F302D]">
              {orderSummary.ticketText}
            </pre>

            <div className="flex flex-col gap-2">
              <a
                href={LA_PANERA_BRAND.channels.whatsappBocaditosTortas}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCopyOrder()}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#626B55] text-white border border-[#2F302D] rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar por WhatsApp Oficial</span>
              </a>
              <button
                type="button"
                onClick={handleCopyOrder}
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#2F302D] border border-[#2F302D] rounded-xl py-2.5 px-4 text-xs font-bold uppercase tracking-wider"
              >
                <Copy className="w-4 h-4" />
                <span>
                  {copiedTicket ? '¡Ticket Copiado!' : 'Copiar Resumen'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Original PDF Carta 2025 Viewer Modal */}
      {showPdfPreviewModal && (
        <div
          className="fixed inset-0 z-50 bg-[#2F302D]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-carta-title"
        >
          <div className="bg-[#EFE3D4] border-2 border-[#2F302D] rounded-[2rem] max-w-5xl w-full h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 sm:px-6 bg-[#F6F1E9] border-b border-[#2F302D] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55] block">
                  DOCUMENTO OFICIAL ESCANEADO
                </span>
                <h3
                  id="pdf-carta-title"
                  className="font-display font-bold text-lg uppercase text-[#2F302D]"
                >
                  Carta impresa La Panera Café 2025 (PDF)
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={CARTA_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#2F302D] text-[#EFE3D4] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
                >
                  <span>Abrir en Pestaña Nueva</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowPdfPreviewModal(false)}
                  aria-label="Cerrar PDF"
                  className="w-9 h-9 rounded-full bg-white border border-[#2F302D] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#2F302D]/10">
              <iframe
                src={CARTA_PDF_URL}
                title="Carta Oficial La Panera Café 2025 PDF"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
