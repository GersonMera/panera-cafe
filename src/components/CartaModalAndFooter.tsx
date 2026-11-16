import React, { useState } from 'react';
import {
  LA_PANERA_BRAND,
  CATEGORIES,
  MENU_ITEMS,
  type MenuItem,
} from '../data/laPaneraData';
import {
  LaPaneraLogoLockup,
  BreadLoafIcon,
} from './PaneraGraphics';
import {
  X,
  MessageCircle,
  ShoppingBag,
  BookOpen,
  Trash2,
  FileText,
  CheckCircle2,
  Instagram,
  Facebook,
} from 'lucide-react';

interface CartaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTableItems: MenuItem[];
  onRemoveTableItem: (id: string) => void;
  initialCategory?: string;
}

export const CartaDigitalModal: React.FC<CartaModalProps> = ({
  isOpen,
  onClose,
  selectedTableItems,
  onRemoveTableItem,
}) => {
  if (!isOpen) return null;

  const displayCategories = CATEGORIES.filter((c) => c.id !== 'todas');

  return (
    <div
      className="fixed inset-0 z-50 bg-[#2F302D]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="carta-modal-title"
    >
      <div className="bg-[#EFE3D4] border border-[#2F302D]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#F6F1E9] border-b border-[#2F302D]/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BreadLoafIcon className="w-10 h-6 shrink-0" cutoutColor="#F6F1E9" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#626B55] block">
                CATÁLOGO INTERACTIVO & ENLACES OFICIALES
              </span>
              <h2
                id="carta-modal-title"
                className="font-editorial text-2xl sm:text-3xl text-[#2F302D]"
              >
                Nuestra Carta — La Panera Café
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar visor de carta"
            className="w-9 h-9 rounded-full bg-white border border-[#2F302D]/30 flex items-center justify-center text-[#2F302D] hover:bg-[#EFE3D4] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {selectedTableItems.length > 0 && (
            <div className="bg-[#F6F1E9] border border-[#2F302D]/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-xl text-[#2F302D]">
                  Platos guardados ({selectedTableItems.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedTableItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#2F302D]/20 rounded-xl p-3 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-semibold text-xs text-[#2F302D]">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#626B55]">
                        {item.categoryLabel}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveTableItem(item.id)}
                      aria-label={`Quitar ${item.name} de mi mesa`}
                      className="p-1.5 text-[#3F302A] hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete 6 Families Overview */}
          <div className="space-y-5">
            {displayCategories.map((cat) => {
              const items = MENU_ITEMS.filter((i) => i.category === cat.id);
              return (
                <div
                  key={cat.id}
                  className="bg-[#F6F1E9] border border-[#2F302D]/20 rounded-2xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#2F302D]/15">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55]">
                        {cat.shortLabel}
                      </span>
                      <h3 className="font-editorial text-2xl text-[#2F302D]">
                        {cat.fullTitle}
                      </h3>
                    </div>
                    <span className="text-xs font-editorial italic text-[#3F302A]">
                      {cat.subtitle}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map((dish) => (
                      <div
                        key={dish.id}
                        className="bg-white border border-[#2F302D]/15 rounded-xl p-3.5 flex flex-col justify-between gap-2"
                      >
                        <div>
                          <div className="font-semibold text-sm text-[#2F302D]">
                            {dish.name}
                          </div>
                          <p className="text-xs text-[#3F302A] mt-1 leading-relaxed">
                            {dish.description}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[#2F302D]/10 flex items-center justify-between gap-2 text-[11px] font-semibold">
                          <span className="text-[#626B55]">{dish.priceStatus}</span>
                          <a
                            href={dish.channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-[#2F302D] hover:text-[#626B55]"
                          >
                            {dish.channelCta}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FooterAndStickyBar: React.FC<{
  onOpenCartaModal: () => void;
  selectedCount: number;
}> = ({ onOpenCartaModal, selectedCount }) => {
  const [showReclamacionesModal, setShowReclamacionesModal] =
    useState<boolean>(false);
  const [reclamoName, setReclamoName] = useState<string>('');
  const [reclamoDetail, setReclamoDetail] = useState<string>('');
  const [reclamoSent, setReclamoSent] = useState<boolean>(false);

  const handleReclamoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reclamoName.trim() || !reclamoDetail.trim()) return;
    setReclamoSent(true);
  };

  return (
    <>
      <footer className="bg-[#EFE3D4] text-[#2F302D] pt-16 pb-28 md:pb-14 px-4 sm:px-6 lg:px-8 border-t border-[#2F302D]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2F302D]/15">
            {/* Column 1: Brand Lockup, Slogan & Official Socials (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <LaPaneraLogoLockup size="lg" cutoutColor="#EFE3D4" />
              <p className="font-editorial italic text-xl text-[#3F302A] mt-4 max-w-md leading-relaxed">
                “{LA_PANERA_BRAND.corporateSlogan}”
              </p>
              <span className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#626B55]">
                {LA_PANERA_BRAND.commercialPhrase} · Desde 2016
              </span>

              <div className="flex flex-wrap items-center gap-2.5 mt-6">
                <a
                  href={LA_PANERA_BRAND.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#F6F1E9] hover:bg-white border border-[#2F302D]/20 text-xs font-medium text-[#2F302D] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#2F302D] shrink-0" />
                  <span>{LA_PANERA_BRAND.socials.instagramHandle}</span>
                </a>
                <a
                  href={LA_PANERA_BRAND.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#F6F1E9] hover:bg-white border border-[#2F302D]/20 text-xs font-medium text-[#2F302D] transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#2F302D] shrink-0" />
                  <span>La Panera Café Oficial</span>
                </a>
              </div>
            </div>

            {/* Column 2: Explorar & Sedes (3 cols) */}
            <div className="lg:col-span-3 space-y-3.5">
              <h3 className="font-editorial text-2xl text-[#2F302D]">
                Explorar
              </h3>
              <ul className="space-y-2.5 text-sm text-[#3F302A]">
                <li>
                  <button
                    type="button"
                    onClick={onOpenCartaModal}
                    className="hover:text-[#2F302D] underline-offset-4 hover:underline transition-colors cursor-pointer"
                  >
                    Carta 2025 & Precios (S/)
                  </button>
                </li>
                <li>
                  <a
                    href="#vitrina-carta"
                    className="hover:text-[#2F302D] underline-offset-4 hover:underline transition-colors"
                  >
                    Nuestra Historia
                  </a>
                </li>
                <li>
                  <a
                    href="#tortas-bocaditos"
                    className="hover:text-[#2F302D] underline-offset-4 hover:underline transition-colors"
                  >
                    Tortas & Dulces para Celebrar
                  </a>
                </li>
                <li>
                  <a
                    href="#locales-sedes"
                    className="hover:text-[#2F302D] underline-offset-4 hover:underline transition-colors"
                  >
                    Nuestros 9 Locales en Lima
                  </a>
                </li>
              </ul>
              <p className="pt-2 text-[11px] text-[#626B55] leading-relaxed">
                Jesús María · Pueblo Libre · San Isidro · Lince · Magdalena del Mar · San Borja
              </p>
            </div>

            {/* Column 3: Canales de Pedido & Atención (4 cols) */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-editorial text-2xl text-[#2F302D]">
                  Pedidos y Atención
                </h3>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#626B55]">
                  Desde las 7:00 AM
                </span>
              </div>

              <ul className="space-y-2 text-xs font-bold uppercase tracking-[0.14em]">
                <li>
                  <button
                    type="button"
                    onClick={onOpenCartaModal}
                    className="w-full text-left bg-[#2F302D] text-[#EFE3D4] hover:bg-[#3F302A] rounded-xl px-4 py-3 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>Carta 2025 & Pedido Rápido</span>
                    <BookOpen className="w-4 h-4 text-[#EFE3D4] shrink-0" />
                  </button>
                </li>
                <li>
                  <a
                    href={LA_PANERA_BRAND.channels.whatsappBocaditosTortas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#F6F1E9] hover:bg-white border border-[#2F302D]/20 rounded-xl px-4 py-2.5 flex items-center justify-between transition-colors"
                  >
                    <span>Tortas y Bocaditos (WhatsApp)</span>
                    <MessageCircle className="w-4 h-4 text-[#626B55] shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href={LA_PANERA_BRAND.channels.rappiDelivery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#F6F1E9] hover:bg-white border border-[#2F302D]/20 rounded-xl px-4 py-2.5 flex items-center justify-between transition-colors"
                  >
                    <span>Delivery Oficial por Rappi</span>
                    <ShoppingBag className="w-4 h-4 text-[#626B55] shrink-0" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Clean Bottom Bar: Essential Corporate Line + Libro de Reclamaciones */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#3F302A]">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-semibold text-[#2F302D]">
                © {new Date().getFullYear()} {LA_PANERA_BRAND.displayName}
              </span>
              <span aria-hidden="true" className="text-[#2F302D]/40">·</span>
              <span>
                {LA_PANERA_BRAND.legalReference.companyName} — RUC{' '}
                <span className="tabular-nums font-medium">
                  {LA_PANERA_BRAND.legalReference.ruc}
                </span>
              </span>
              <span aria-hidden="true" className="text-[#2F302D]/40">·</span>
              <span className="text-[#626B55]">Lima, Perú</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowReclamacionesModal(true);
                setReclamoSent(false);
              }}
              className="inline-flex items-center gap-2 bg-[#F6F1E9] hover:bg-white border border-[#2F302D]/25 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2F302D] transition-colors cursor-pointer shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-[#626B55]" />
              <span>Libro de Reclamaciones</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Libro de Reclamaciones Modal */}
      {showReclamacionesModal && (
        <div
          className="fixed inset-0 z-50 bg-[#2F302D]/75 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reclamaciones-title"
        >
          <div className="bg-[#EFE3D4] border border-[#2F302D]/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#2F302D]/20 mb-5">
              <h3
                id="reclamaciones-title"
                className="font-editorial text-2xl sm:text-3xl text-[#2F302D]"
              >
                Libro de Reclamaciones Virtual
              </h3>
              <button
                type="button"
                onClick={() => setShowReclamacionesModal(false)}
                aria-label="Cerrar Libro de Reclamaciones"
                className="w-9 h-9 rounded-full bg-white border border-[#2F302D]/30 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reclamoSent ? (
              <div className="bg-white border border-[#2F302D]/20 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#626B55] mx-auto" />
                <h4 className="font-editorial text-2xl text-[#2F302D]">
                  Hoja de Reclamación Registrada
                </h4>
                <p className="text-xs text-[#3F302A]">
                  Gracias, {reclamoName}. Tu constancia para{' '}
                  <strong>
                    {LA_PANERA_BRAND.legalReference.companyName} (RUC:{' '}
                    {LA_PANERA_BRAND.legalReference.ruc})
                  </strong>{' '}
                  ha sido registrada. También puedes comunicarte directamente por nuestro canal oficial de atención en sede o vía WhatsApp oficial.
                </p>
                <button
                  type="button"
                  onClick={() => setShowReclamacionesModal(false)}
                  className="bg-[#2F302D] text-[#EFE3D4] rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <form onSubmit={handleReclamoSubmit} className="space-y-4">
                <div className="bg-white/80 border border-[#2F302D]/20 rounded-xl p-3 text-xs text-[#3F302A] space-y-0.5">
                  <div>
                    <strong>Razón Social:</strong>{' '}
                    {LA_PANERA_BRAND.legalReference.companyName} ·{' '}
                    <strong>RUC:</strong> {LA_PANERA_BRAND.legalReference.ruc}
                  </div>
                  <div>
                    <strong>Nombre Comercial:</strong>{' '}
                    {LA_PANERA_BRAND.legalReference.tradeName}
                  </div>
                  <div>
                    <strong>Domicilio Fiscal:</strong>{' '}
                    {LA_PANERA_BRAND.legalReference.fiscalAddress}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="reclamo-nombre"
                    className="block text-xs font-bold uppercase tracking-wider text-[#2F302D] mb-1"
                  >
                    Nombre Completo
                  </label>
                  <input
                    id="reclamo-nombre"
                    type="text"
                    required
                    value={reclamoName}
                    onChange={(e) => setReclamoName(e.target.value)}
                    placeholder="Ingresa tu nombre y apellido"
                    className="w-full bg-white border border-[#2F302D]/30 rounded-xl px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="reclamo-detalle"
                    className="block text-xs font-bold uppercase tracking-wider text-[#2F302D] mb-1"
                  >
                    Detalle de tu comentario o reclamo
                  </label>
                  <textarea
                    id="reclamo-detalle"
                    rows={3}
                    required
                    value={reclamoDetail}
                    onChange={(e) => setReclamoDetail(e.target.value)}
                    placeholder="Indica sede y detalle..."
                    className="w-full bg-white border border-[#2F302D]/30 rounded-xl px-3.5 py-2 text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReclamacionesModal(false)}
                    className="px-5 py-2 rounded-full border border-[#2F302D]/30 bg-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#2F302D] text-[#EFE3D4] text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Registrar Constancia
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar (<= 15% viewport height cap, refined editorial style) */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#EFE3D4]/95 backdrop-blur-md border-t border-[#2F302D]/20 px-3 py-2"
        role="navigation"
        aria-label="Accesos directos móviles"
      >
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <button
            type="button"
            onClick={onOpenCartaModal}
            className="bg-white text-[#2F302D] border border-[#2F302D]/35 rounded-full py-2 px-2 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Carta 2025</span>
            {selectedCount > 0 && (
              <span className="bg-[#2F302D] text-[#EFE3D4] rounded-full px-1.5 text-[10px] tabular-nums">
                {selectedCount}
              </span>
            )}
          </button>

          <a
            href={LA_PANERA_BRAND.channels.rappiDelivery}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2F302D] text-[#EFE3D4] rounded-full py-2 px-2 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span>Rappi</span>
          </a>

          <a
            href={LA_PANERA_BRAND.channels.whatsappBocaditosTortas}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#2F302D] border border-[#2F302D]/35 rounded-full py-2 px-2 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0 text-[#626B55]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};
