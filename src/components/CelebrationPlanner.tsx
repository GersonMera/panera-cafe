import React from 'react';
import { LA_PANERA_BRAND } from '../data/laPaneraData';
import {
  BotanicalBranchSVG,
  ResilientDishImage,
} from './PaneraGraphics';
import {
  MessageCircle,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

interface CelebrationPlannerProps {
  onOpenCartaRoute?: () => void;
}

const PASTRY_SHOWCASE = [
  {
    kicker: 'TORTAS PREMIUM · 20 CM DE DIÁMETRO',
    title: 'Berry Much, Red Velvet, Carrot Cake & Cheesecakes',
    description:
      'Nuestra línea de tortas especiales de 20 cm elaboradas con frutos rojos frescos, queso crema artesanal, maracuyá, sauco, tiramisú y selva negra.',
    priceLine: 'Porción S/ 15.00  ·  Torta Entera S/ 85.00',
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Torta artesanal decorada en vitrina de La Panera Café',
  },
  {
    kicker: 'CLÁSICOS DE VITRINA & TRADICIÓN',
    title: 'Chocopanera, Tres Leches, Praliné & Milhojas',
    description:
      'Las recetas favoritas de casa para cantar cumpleaños o cerrar el almuerzo: Delicia de Fresa, Bavarois de Guindones, Crema Volteada y Pye de Limón.',
    priceLine: 'Porción desde S/ 10.00  ·  Entera desde S/ 65.00',
    imageUrl:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Porción de torta clásica con fresas y crema batida',
  },
  {
    kicker: 'MESA SALADA & REUNIONES',
    title: 'Quiche La Panera, Pastel de Acelga & Empanadas',
    description:
      'Opciones horneadas cada día para compartir en reuniones familiares o en la oficina, disponibles tanto por porción individual como en molde entero.',
    priceLine: 'Porción desde S/ 15.00  ·  Entero desde S/ 80.00',
    imageUrl:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Pastelería salada artesanal y bocaditos recién horneados',
  },
];

export const CelebrationPlanner: React.FC<CelebrationPlannerProps> = ({
  onOpenCartaRoute,
}) => {
  return (
    <section
      id="tortas-bocaditos"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F6F1E9] border-b border-[#2F302D]/15"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <BotanicalBranchSVG className="w-16 h-10 mx-auto mb-3" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#626B55] block mb-2">
            PASTELERÍA ARTESANAL · PORCIÓN O TORTA ENTERA
          </span>
          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#2F302D] leading-[0.96]">
            Tortas & Dulces{' '}
            <span className="italic font-normal">para Celebrar</span>
          </h2>
          <p className="text-base sm:text-lg text-[#3F302A] mt-4 max-w-2xl mx-auto leading-relaxed">
            Para un antojo de media tarde o para celebrar un cumpleaños alrededor de la mesa, todas nuestras tortas están disponibles por porción en vitrina o enteras para llevar.
          </p>
        </div>

        {/* 3-Column Editorial Pastry Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {PASTRY_SHOWCASE.map((item, idx) => (
            <article
              key={idx}
              className="group bg-[#EFE3D4]/60 hover:bg-[#EFE3D4] border border-[#2F302D]/20 rounded-2xl overflow-hidden transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE3D4]">
                  <ResilientDishImage
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    categoryLabel={item.title}
                    className="w-full h-full"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#626B55] block mb-2">
                    {item.kicker}
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#2F302D] leading-snug mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#3F302A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#2F302D]/10 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#2F302D] tabular-nums">
                  {item.priceLine}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Clean Editorial Action Bar */}
        <div className="bg-[#EFE3D4] border border-[#2F302D]/25 rounded-2xl p-7 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#626B55] block mb-1">
              PEDIDOS DE PASTELERÍA Y EVENTOS
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#2F302D]">
              ¿Buscas una torta entera para hoy o bocaditos para una reunión?
            </h3>
            <p className="text-sm text-[#3F302A] mt-1">
              Revisa las 37 opciones de tortas y postres con precios exactos en nuestra Carta 2025 o escríbenos directo por WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {onOpenCartaRoute && (
              <button
                type="button"
                onClick={onOpenCartaRoute}
                className="inline-flex items-center gap-2 bg-[#2F302D] text-[#EFE3D4] hover:bg-[#3F302A] rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ver Tortas en Carta 2025</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            <a
              href={LA_PANERA_BRAND.channels.whatsappBocaditosTortas}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#F6F1E9] text-[#2F302D] border border-[#2F302D] rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#626B55]" />
              <span>Consultar por WhatsApp Oficial</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
