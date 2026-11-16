/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  LA_PANERA_BRAND,
  MENU_ITEMS,
  type MenuItem,
} from './data/laPaneraData';
import {
  CARTA_2025_ITEMS,
  type Carta2025Item,
  type CartaVariant,
} from './data/carta2025Data';
import {
  calculateCartTotals,
  type QuickCartLine,
} from './utils/paneraLogic';
import {
  LaPaneraLogoLockup,
  BotanicalBranchSVG,
  PeruvianCoffeeSealSVG,
  WifiZoneSealSVG,
  ResilientDishImage,
} from './components/PaneraGraphics';
import { VitrinaSection } from './components/VitrinaSection';
import { CelebrationPlanner } from './components/CelebrationPlanner';
import { LocationsAndEssence } from './components/LocationsAndEssence';
import {
  CartaDigitalModal,
  FooterAndStickyBar,
} from './components/CartaModalAndFooter';
import { Carta2025QuickOrderPage } from './components/Carta2025QuickOrderPage';
import {
  ChevronRight,
  UtensilsCrossed,
} from 'lucide-react';

const EDITORIAL_TRIPTYCH = [
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85',
    alt: 'Comensales compartiendo desayuno y brunch en el salón cálido de La Panera Café',
    title: 'Alrededor de la Mesa',
    subtitle: 'Desayunos & Brunch en Familia',
    href: '#vitrina-carta',
  },
  {
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
    alt: 'Panadería artesanal y café recién servido en La Panera Café',
    title: 'Pasión por el Pan & Café',
    subtitle: 'Horneado Artesanal Cada Día',
    href: '#vitrina-carta',
  },
  {
    src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85',
    alt: 'Conos de helado artesanal, gelato, waffles y pastelería fina',
    title: 'Gelato, Waffles & Tortas',
    subtitle: 'Algo Dulce Para Cerrar',
    href: '#tortas-bocaditos',
  },
];

function detectInitialRoute(): 'landing' | 'carta' {
  if (typeof window === 'undefined') return 'landing';
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (
    path.endsWith('/carta') ||
    search.includes('vista=carta') ||
    hash.includes('#/carta')
  ) {
    return 'carta';
  }
  return 'landing';
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<'landing' | 'carta'>(
    detectInitialRoute
  );
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState<boolean>(false);

  const [selectedTableItems, setSelectedTableItems] = useState<MenuItem[]>([
    MENU_ITEMS[0],
    MENU_ITEMS[2],
  ]);
  const [isCartaModalOpen, setIsCartaModalOpen] = useState<boolean>(false);

  // Quick Order 2025 Cart State (persisted across / and /carta)
  const [cartLines, setCartLines] = useState<QuickCartLine[]>(() => {
    const continental = CARTA_2025_ITEMS.find((i) => i.id === 'des-continental');
    const capuccino = CARTA_2025_ITEMS.find((i) => i.id === 'beb-capuccino');
    const initial: QuickCartLine[] = [];
    if (continental) {
      initial.push({
        lineKey: `${continental.id}__${continental.variants[0].id}`,
        item: continental,
        variant: continental.variants[0],
        quantity: 1,
      });
    }
    if (capuccino) {
      initial.push({
        lineKey: `${capuccino.id}__${capuccino.variants[0].id}`,
        item: capuccino,
        variant: capuccino.variants[0],
        quantity: 1,
      });
    }
    return initial;
  });

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(detectInitialRoute());
    };
    const handleQuotaExceeded = () => {
      setGmpQuotaExceeded(true);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const navigateToRoute = (route: 'landing' | 'carta') => {
    setActiveRoute(route);
    if (typeof window !== 'undefined') {
      const targetUrl = route === 'carta' ? '/carta' : '/';
      try {
        window.history.pushState({}, '', targetUrl);
      } catch {
        // Fallback if pushState is restricted in iframe
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddVariant = (item: Carta2025Item, variant: CartaVariant) => {
    const lineKey = `${item.id}__${variant.id}`;
    setCartLines((prev) => {
      const existing = prev.find((l) => l.lineKey === lineKey);
      if (existing) {
        return prev.map((l) =>
          l.lineKey === lineKey ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { lineKey, item, variant, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (lineKey: string, delta: number) => {
    setCartLines((prev) =>
      prev
        .map((l) =>
          l.lineKey === lineKey ? { ...l, quantity: l.quantity + delta } : l
        )
        .filter((l) => l.quantity > 0)
    );
  };

  const handleRemoveLine = (lineKey: string) => {
    setCartLines((prev) => prev.filter((l) => l.lineKey !== lineKey));
  };

  const handleClearCart = () => {
    setCartLines([]);
  };

  const handleToggleTableItem = (item: MenuItem) => {
    setSelectedTableItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleRemoveTableItem = (id: string) => {
    setSelectedTableItems((prev) => prev.filter((i) => i.id !== id));
  };

  const cartTotals = calculateCartTotals(cartLines);

  // If user is on the dedicated /carta route, render the streamlined Quick-Order Page
  if (activeRoute === 'carta') {
    return (
      <>
        {gmpQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}
        <Carta2025QuickOrderPage
          onBackToLanding={() => navigateToRoute('landing')}
          cartLines={cartLines}
          onAddVariant={handleAddVariant}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveLine={handleRemoveLine}
          onClearCart={handleClearCart}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E9] text-[#2F302D]">
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Header Editorial & Etiqueta de Panadería (3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-30 bg-[#EFE3D4]/95 backdrop-blur-md border-b border-[#2F302D]/25 px-3 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
          {/* Zone 1: Brand Lockup */}
          <a
            href="#inicio"
            aria-label="La Panera Café — Ir al inicio"
            className="shrink-0 whitespace-nowrap"
          >
            <LaPaneraLogoLockup size="sm" cutoutColor="#EFE3D4" />
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-[0.18em] text-[#2F302D]"
          >
            <button
              type="button"
              onClick={() => navigateToRoute('carta')}
              className="hover:text-[#626B55] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 uppercase cursor-pointer"
            >
              Carta 2025 (Precios)
            </button>
            <a
              href="#vitrina-carta"
              className="hover:text-[#626B55] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Nuestra Historia
            </a>
            <a
              href="#tortas-bocaditos"
              className="hover:text-[#626B55] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Tortas y Bocaditos
            </a>
            <a
              href="#delivery-rappi"
              className="hover:text-[#626B55] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Delivery
            </a>
            <a
              href="#locales-sedes"
              className="hover:text-[#626B55] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Locales
            </a>
          </nav>

          {/* Zone 3: Primary Action -> Dedicated /carta Quick-Order Route */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigateToRoute('carta')}
              className="bg-[#2F302D] text-[#EFE3D4] hover:bg-[#3F302A] border border-[#2F302D] rounded-full px-3.5 sm:px-5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2 cursor-pointer"
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span className="sm:hidden">Carta / Pedir</span>
              <span className="hidden sm:inline">Carta 2025 & Pedido Rápido</span>
              {cartTotals.totalQuantity > 0 && (
                <span className="bg-[#EFE3D4] text-[#2F302D] rounded-full px-2 py-0.5 text-[10px] font-extrabold tabular-nums">
                  {cartTotals.totalQuantity} · {cartTotals.formattedSubtotal}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        {/* 1. HERO INMERSIVO A PANTALLA COMPLETA (EDITORIAL BOUTIQUE) */}
        <section className="relative min-h-[90svh] w-full flex items-end pt-[35svh] md:pt-28 pb-20 md:pb-20 px-6 md:px-16 overflow-hidden">
          {/* Fotografía del local/brunch como fondo absoluto */}
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=85"
            alt="Salón cálido y mesa de desayuno y brunch en La Panera Café"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />

          {/* Velo editorial cálido y elegante encima */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#1A1614]/90 via-[#1A1614]/45 to-[#1A1614]/20"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#1A1614]/75 via-[#1A1614]/30 to-transparent"
          />

          {/* 2. Bloque de contenido en la zona inferior izquierda sobre la imagen */}
          <div className="relative z-10 max-w-2xl space-y-5 animate-hero-fade-up">
            {/* Ornamento caligráfico junto a etiqueta minimalista en una sola línea fina */}
            <div className="flex items-center gap-2.5 animate-hero-fade-up">
              <BotanicalBranchSVG
                className="w-8 h-5 shrink-0"
                strokeColor="#EFE3D4"
                leafFillColor="rgba(239, 227, 212, 0.22)"
              />
              <span className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.13em] sm:tracking-[0.25em] text-[#EFE3D4]/80">
                [ C A F E ] · RESTAURANTE DE DESAYUNOS Y BRUNCH
              </span>
            </div>

            {/* Título en dos líneas con contraste fino */}
            <div className="space-y-1 animate-hero-fade-up-delay-1">
              <span className="block font-serif italic font-light text-4xl md:text-6xl text-[#F6F1E9]/95 leading-none">
                ¡Hola! Somos
              </span>
              <h1 className="font-serif font-normal text-5xl md:text-7xl text-white tracking-tight leading-none">
                La Panera Café
              </h1>
            </div>

            {/* Párrafo descriptivo y cita en cursiva en una sola columna limpia */}
            <div className="max-w-xl text-xs md:text-sm text-[#EFE3D4]/85 font-light leading-relaxed space-y-2.5 animate-hero-fade-up-delay-2">
              <p>
                La Panera Café es un espacio donde el desayuno y el brunch se disfrutan con calma y cariño. Entre café, pastelería y sabores reconfortantes, cada visita invita a empezar el día con calidez y momentos hechos para compartir.
              </p>
              <p className="italic text-[#F6F1E9]/95">
                “Donde la pasión por el pan y el amor por compartir se unen para ofrecerte momentos inolvidables”
              </p>
            </div>

            {/* 3. Fila horizontal fluida de cápsulas editoriales */}
            <div className="flex flex-wrap items-center gap-2.5 pt-3 animate-hero-fade-up-delay-3">
              <button
                type="button"
                onClick={() => navigateToRoute('carta')}
                className="bg-[#F6F1E9] text-[#2F302D] rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.18em] font-medium hover:bg-white transition cursor-pointer"
              >
                VER CARTA 2025 & PEDIDO RÁPIDO (S/)
              </button>

              <a
                href="#locales-sedes"
                className="border border-[#F6F1E9]/40 bg-black/20 backdrop-blur-sm text-[#F6F1E9] rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] hover:bg-[#F6F1E9] hover:text-[#2F302D] transition"
              >
                MAPA DE SEDES (6 LOCALES)
              </a>

              <a
                href={LA_PANERA_BRAND.channels.whatsappBocaditosTortas}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#F6F1E9]/40 bg-black/20 backdrop-blur-sm text-[#F6F1E9] rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] hover:bg-[#F6F1E9] hover:text-[#2F302D] transition"
              >
                BOCADITOS Y TORTAS (WHATSAPP)
              </a>

              <a
                href={LA_PANERA_BRAND.channels.rappiDelivery}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#F6F1E9]/40 bg-black/20 backdrop-blur-sm text-[#F6F1E9] rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] hover:bg-[#F6F1E9] hover:text-[#2F302D] transition"
              >
                PEDIR POR RAPPI
              </a>
            </div>
          </div>
        </section>

        {/* Tríptico Editorial & Sellos Circulares ("Para ti, siempre lo mejor") */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F1E9] border-b border-[#2F302D]/15">
          <div className="max-w-7xl mx-auto">
            {/* 3-Column Large-Format Editorial Triptych */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EDITORIAL_TRIPTYCH.map((card, index) => (
                <a
                  key={index}
                  href={card.href}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-[#2F302D]/20 shadow-md"
                >
                  <ResilientDishImage
                    src={card.src}
                    alt={card.alt}
                    categoryLabel={card.title}
                    className="w-full h-full"
                  />
                  {/* Subtle Bottom Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#2F302D]/85 via-[#2F302D]/35 to-transparent text-[#EFE3D4] flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#D9C9B1] block mb-1">
                        {card.subtitle}
                      </span>
                      <h2 className="font-editorial text-2xl sm:text-3xl text-white leading-tight">
                        {card.title}
                      </h2>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-white/90 text-[#2F302D] flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Centered Botanical Quote & Circular Emblem Seals ("Para ti, siempre lo mejor") */}
            <div className="pt-20 pb-4 flex flex-col items-center text-center">
              <BotanicalBranchSVG className="w-16 h-10 mb-4" />
              <blockquote className="font-editorial italic text-3xl sm:text-5xl text-[#2F302D] tracking-wide mb-10">
                "{LA_PANERA_BRAND.commercialPhrase}"
              </blockquote>

              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
                <PeruvianCoffeeSealSVG className="w-28 h-28 sm:w-32 sm:h-32" />
                <WifiZoneSealSVG className="w-28 h-28 sm:w-32 sm:h-32" />
              </div>
            </div>
          </div>
        </section>

        {/* Nuestra Historia: El Origen de La Panera Café (Desde 2016) */}
        <VitrinaSection
          selectedTableItems={selectedTableItems}
          onToggleTableItem={handleToggleTableItem}
          onOpenCartaModal={() => navigateToRoute('carta')}
        />

        {/* Pastelería Artesanal & Tortas para Celebrar */}
        <CelebrationPlanner
          onOpenCartaRoute={() => navigateToRoute('carta')}
        />

        {/* Conoce La Panera Café + Ruta Delivery Rappi + Mapas Panorámicos y Sedes + Galería @la_panera_cafe */}
        <LocationsAndEssence />
      </main>

      {/* Visor Interactivo de Nuestra Carta Modal */}
      <CartaDigitalModal
        isOpen={isCartaModalOpen}
        onClose={() => setIsCartaModalOpen(false)}
        selectedTableItems={selectedTableItems}
        onRemoveTableItem={handleRemoveTableItem}
      />

      {/* Footer Artesanal + Mobile Sticky Bottom Bar */}
      <FooterAndStickyBar
        onOpenCartaModal={() => navigateToRoute('carta')}
        selectedCount={cartTotals.totalQuantity}
      />
    </div>
  );
}
