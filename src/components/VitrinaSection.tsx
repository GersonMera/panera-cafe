import React from 'react';
import { LA_PANERA_BRAND, type MenuItem } from '../data/laPaneraData';
import {
  ResilientDishImage,
  BotanicalBranchSVG,
  BreadLoafIcon,
  ThreeScoresMotif,
} from './PaneraGraphics';
import { BookOpen, ChevronRight, MapPin, Heart, Coffee } from 'lucide-react';

interface VitrinaSectionProps {
  selectedTableItems?: MenuItem[];
  onToggleTableItem?: (item: MenuItem) => void;
  onOpenCartaModal: (initialCategory?: string) => void;
}

const ORIGIN_MILESTONES = [
  {
    year: '2016',
    kicker: '24 DE NOVIEMBRE · EL COMIENZO',
    title: 'Nace una mesa para sentirse como en casa',
    description:
      'La Panera Café inicia sus actividades en Lima (Av. Cuba 844, Jesús María) con un propósito claro: recuperar la costumbre de reunirse sin prisa alrededor del buen pan recién salido del horno, desayunos generosos y café peruano.',
  },
  {
    year: '7:00 AM',
    kicker: 'EL RITUAL DE CADA MAÑANA',
    title: 'Pasión por el pan y la sazón tradicional',
    description:
      'Desde temprano, nuestras vitrinas se llenan de panes artesanales, croissants dorados, empanadas, tamales y sánguches contundentes preparados al momento para acompañar las mañanas en familia.',
  },
  {
    year: 'HOY',
    kicker: '8 LOCALES EN 5 DISTRITOS DE LIMA',
    title: 'La misma calidez familiar en cada barrio',
    description:
      'Presentes en Pueblo Libre, Jesús María, San Borja, Magdalena y Lince, seguimos fieles a la promesa que nos dio origen: hacer que cada desayuno, brunch o celebración sepa a hogar.',
  },
];

export const VitrinaSection: React.FC<VitrinaSectionProps> = ({
  onOpenCartaModal,
}) => {
  return (
    <section
      id="vitrina-carta"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#EFE3D4] border-b border-[#2F302D]/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Editorial Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <BotanicalBranchSVG className="w-16 h-10 mx-auto mb-3" />
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#626B55] block mb-2">
            NUESTRA HISTORIA · DESDE 2016 EN LIMA
          </span>
          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#2F302D] leading-[0.96]">
            El origen de{' '}
            <span className="italic font-normal">La Panera Café</span>
          </h2>
          <p className="font-editorial italic text-xl sm:text-2xl text-[#3F302A] mt-4">
            “{LA_PANERA_BRAND.traditionQuote}”
          </p>
        </div>

        {/* Main 2-Column Editorial Origin Narrative & Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-16">
          {/* Left Column: Asymmetrical Architectural & Bakery Portrait Composition (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
            <div className="sm:col-span-7 relative rounded-2xl overflow-hidden border border-[#2F302D]/20 shadow-md min-h-[360px]">
              <ResilientDishImage
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85"
                alt="Pan artesanal con corteza dorada recién horneado en La Panera Café"
                categoryLabel="Tradición Panadera · Desde 2016"
                className="w-full h-full"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#2F302D]/85 via-[#2F302D]/35 to-transparent text-[#EFE3D4]">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D9C9B1] block">
                  EL CORAZÓN DEL OBRADOR
                </span>
                <p className="font-editorial italic text-xl text-white mt-0.5">
                  Horneado fresco cada mañana desde las 7:00 AM
                </p>
              </div>
            </div>

            <div className="sm:col-span-5 flex flex-col justify-between gap-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#2F302D]/20 shadow-md flex-1 min-h-[210px]">
                <ResilientDishImage
                  src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=700&q=80"
                  alt="Mesa de desayuno y brunch para compartir en familia"
                  categoryLabel="Alrededor de la Mesa"
                  className="w-full h-full"
                />
              </div>

              {/* Authentic Foundation Card */}
              <div className="bg-[#F6F1E9] border border-[#2F302D] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#2F302D]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="bg-white text-[#2F302D] border border-[#2F302D] rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em]">
                    C A F E
                  </span>
                  <ThreeScoresMotif className="w-7 h-5" />
                </div>
                <div className="font-editorial text-3xl text-[#2F302D] leading-none">
                  24 · Nov · 2016
                </div>
                <p className="text-xs text-[#3F302A] mt-1.5 leading-relaxed">
                  Inicio de actividades en <strong>Jesús María (Av. Cuba 844)</strong>, llevando el calor de una panadería de barrio a una gran mesa familiar.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Story Prose & Essence Manifesto (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#F6F1E9] border border-[#2F302D]/25 rounded-[2rem] p-7 sm:p-10 shadow-sm">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#626B55]">
                <BreadLoafIcon className="w-8 h-5" cutoutColor="#F6F1E9" />
                <span>RELATO DE ORIGEN</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#2F302D] leading-tight">
                Una idea simple pero poderosa: que compartir en familia se sienta como en casa
              </h3>

              <p className="text-sm sm:text-base text-[#3F302A] leading-relaxed">
                <strong>La Panera Café</strong> nació en noviembre de 2016 con el sueño de crear un punto de encuentro donde el aroma a pan caliente, el café 100% peruano recién pasado y los desayunos de toda la vida reunieran a abuelos, padres, hijos y amigos alrededor de una misma mesa de madera cálida.
              </p>

              <p className="text-sm sm:text-base text-[#3F302A] leading-relaxed">
                Lo que comenzó como un rincón acogedor en <strong>Jesús María</strong> y <strong>Pueblo Libre</strong> fue creciendo gracias al cariño de las familias limeñas que convirtieron nuestros desayunos, sánguches generosos, waffles y tortas de vitrina en parte de sus celebraciones cotidianas.
              </p>

              <blockquote className="pt-2 border-t border-[#2F302D]/15 font-editorial italic text-xl sm:text-2xl text-[#2F302D] leading-relaxed">
                “{LA_PANERA_BRAND.essenceManifesto}”
              </blockquote>
            </div>

            {/* Bottom Call to Action to Explore the 2025 Menu */}
            <div className="pt-6 mt-6 border-t border-[#2F302D]/15 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs text-[#3F302A] font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Coffee className="w-4 h-4 text-[#626B55]" />
                  <span>Café 100% Peruano</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#626B55]" />
                  <span>Recetas de Casa</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#626B55]" />
                  <span>8 Locales</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => onOpenCartaModal()}
                className="inline-flex items-center gap-2 bg-[#2F302D] text-[#EFE3D4] hover:bg-[#3F302A] rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explorar Carta 2025 & Pedir</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Editorial Timeline: 2016 · 7:00 AM · Hoy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ORIGIN_MILESTONES.map((milestone, idx) => (
            <article
              key={idx}
              className="bg-[#F6F1E9] hover:bg-white border border-[#2F302D]/30 rounded-2xl p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 pb-3 mb-4 border-b border-[#2F302D]/15">
                  <span className="font-editorial italic text-4xl sm:text-5xl text-[#2F302D] tabular-nums leading-none">
                    {milestone.year}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55]">
                    {milestone.kicker}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl text-[#2F302D] mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-[#3F302A] leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
