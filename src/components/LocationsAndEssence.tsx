import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  LA_PANERA_BRAND,
  ALL_LIMA_SEDES,
  SEDE_DISTRICT_FILTERS,
  type SedeDistrictGroup,
  type UnifiedSedeItem,
} from '../data/laPaneraData';
import {
  filterLimaSedes,
  computeSedesMapViewport,
} from '../utils/paneraLogic';
import {
  BreadLoafIcon,
  BotanicalBranchSVG,
  ResilientDishImage,
} from './PaneraGraphics';
import {
  MapPin,
  ExternalLink,
  Phone,
  ShoppingBag,
  Navigation,
  ChevronRight,
  Star,
  Compass,
  Maximize2,
} from 'lucide-react';

const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ||
  (process.env.GOOGLE_MAPS_PLATFORM_KEY as string | undefined) ||
  '';

interface LivePlaceSnapshot {
  displayName?: string;
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsURI?: string;
}

const DISTRICT_SUBTITLES: Record<SedeDistrictGroup, string> = {
  todas: 'Ver los 9 locales en el mapa',
  'pueblo-libre': 'San Martín · Pza. Bandera · Leguía',
  'jesus-maria': 'Av. Cuba 844 · Jr. Caracas 2400',
  'san-isidro-lince': 'Prol. Iquitos · Pérez Araníbar',
  magdalena: 'Jr. José Cossio 294',
  'san-borja': 'Av. Aviación 2674',
};

const LEFT_FLANK_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80',
    alt: 'Cappuccino con latte art sobre mesa',
  },
  {
    src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80',
    alt: 'Mesa de desayuno y brunch con jugo de naranja',
  },
  {
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    alt: 'Hogazas de pan artesanal recién horneadas',
  },
  {
    src: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
    alt: 'Bebidas frías y jugos naturales',
  },
];

const RIGHT_FLANK_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=500&q=80',
    alt: 'Waffles con fresas y frutas de estación',
  },
  {
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80',
    alt: 'Pastelería fina y postre de vitrina',
  },
  {
    src: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80',
    alt: 'Club sándwich artesanal en pan tostado',
  },
  {
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
    alt: 'Croissants dorados de mantequilla',
  },
];

const SOCIAL_GALLERY_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    alt: 'Extracción de espresso peruano en taza de cerámica cálida',
    caption: 'Café 100% peruano recién extraído',
  },
  {
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    alt: 'Pan recién salido del horno servido con calidez',
    caption: 'Panes de la casa horneados cada mañana',
  },
  {
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    alt: 'Familias y amigos compartiendo alrededor de la mesa en La Panera Café',
    caption: 'Un espacio para compartir como en casa',
  },
  {
    src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    alt: 'Pastelería artesanal, tortas y bocaditos de vitrina',
    caption: 'Para ti, siempre lo mejor',
  },
];

interface MapCameraAndPlacesControllerProps {
  visibleSedes: UnifiedSedeItem[];
  selectedSede: UnifiedSedeItem | null;
  overviewTrigger: number;
  onLivePlaceLoaded: (sedeId: string, data: LivePlaceSnapshot) => void;
}

const MapCameraAndPlacesController: React.FC<MapCameraAndPlacesControllerProps> = ({
  visibleSedes,
  selectedSede,
  overviewTrigger,
  onLivePlaceLoaded,
}) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const fetchedIdsRef = useRef<Record<string, boolean>>({});

  // Adjust map bounds when district filter or "Vista General" is triggered
  useEffect(() => {
    if (!map) return;

    if (selectedSede) {
      map.panTo(selectedSede.coordinates);
      map.setZoom(16);
      return;
    }

    const viewport = computeSedesMapViewport(visibleSedes);
    if (visibleSedes.length === 1) {
      map.panTo(visibleSedes[0].coordinates);
      map.setZoom(16);
    } else {
      try {
        map.fitBounds(viewport.bounds, {
          top: 64,
          right: 64,
          bottom: 130,
          left: 64,
        });
      } catch {
        map.panTo(viewport.center);
        map.setZoom(viewport.recommendedZoom);
      }
    }
  }, [map, visibleSedes, selectedSede, overviewTrigger]);

  // Enrich active sede via Places API (New) Place.searchByText with Tier 2 Quota Handling
  useEffect(() => {
    if (!placesLib || !selectedSede) return;
    if (fetchedIdsRef.current[selectedSede.id]) return;

    const PlaceClass = (placesLib as any).Place;
    if (!PlaceClass || typeof PlaceClass.searchByText !== 'function') return;

    fetchedIdsRef.current[selectedSede.id] = true;

    PlaceClass.searchByText({
      textQuery: selectedSede.googleMapsQuery,
      fields: [
        'id',
        'displayName',
        'formattedAddress',
        'rating',
        'userRatingCount',
        'googleMapsURI',
      ],
      maxResultCount: 1,
    })
      .then((res: any) => {
        const place = res?.places?.[0];
        if (place) {
          onLivePlaceLoaded(selectedSede.id, {
            displayName: place.displayName,
            formattedAddress: place.formattedAddress,
            rating:
              typeof place.rating === 'number' ? place.rating : undefined,
            userRatingCount:
              typeof place.userRatingCount === 'number'
                ? place.userRatingCount
                : undefined,
            googleMapsURI: place.googleMapsURI,
          });
        }
      })
      .catch((err: unknown) => {
        const msg = String(err);
        if (
          msg.includes('429') ||
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('QuotaExceededError')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      });
  }, [placesLib, selectedSede, onLivePlaceLoaded]);

  return null;
};

export const LocationsAndEssence: React.FC = () => {
  const [activeDistrict, setActiveDistrict] =
    useState<SedeDistrictGroup>('todas');
  const [selectedSedeId, setSelectedSedeId] = useState<string | null>(null);
  const [overviewTrigger, setOverviewTrigger] = useState<number>(0);
  const [livePlaces, setLivePlaces] = useState<
    Record<string, LivePlaceSnapshot>
  >({});

  const mapSectionRef = useRef<HTMLDivElement | null>(null);

  const visibleSedes = filterLimaSedes(ALL_LIMA_SEDES, activeDistrict);
  const selectedSede =
    ALL_LIMA_SEDES.find((s) => s.id === selectedSedeId) || null;
  const initialViewport = computeSedesMapViewport(ALL_LIMA_SEDES);

  const handleSelectDistrict = (district: SedeDistrictGroup) => {
    setActiveDistrict(district);
    setSelectedSedeId(null);
    setOverviewTrigger((n) => n + 1);
  };

  const handleShowAllOverview = () => {
    setActiveDistrict('todas');
    setSelectedSedeId(null);
    setOverviewTrigger((n) => n + 1);
  };

  const handleFocusSedeOnMap = (
    sede: UnifiedSedeItem,
    scrollMapIntoView = false
  ) => {
    setSelectedSedeId(sede.id);
    if (scrollMapIntoView && mapSectionRef.current && window.innerWidth < 1024) {
      mapSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleLivePlaceLoaded = (sedeId: string, data: LivePlaceSnapshot) => {
    setLivePlaces((prev) => ({
      ...prev,
      [sedeId]: data,
    }));
  };

  const highlightedSede = selectedSede || visibleSedes[0] || ALL_LIMA_SEDES[0];
  const highlightedLive = livePlaces[highlightedSede.id];

  return (
    <>
      {/* Bloque Editorial Grand Elegance: "Conoce: La Panera Café" con tiras laterales de fotos */}
      <section
        id="nuestra-esencia"
        className="py-20 md:py-28 bg-[#F6F1E9] text-[#2F302D] border-b border-[#2F302D]/20 relative overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
          {/* Left Vertical Photo Strip (Desktop Editorial Framing) */}
          <div className="hidden lg:flex flex-col gap-4 w-28 xl:w-36 shrink-0">
            {LEFT_FLANK_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square w-full overflow-hidden rounded-r-xl border-y border-r border-[#2F302D]/20 shadow-sm"
              >
                <ResilientDishImage
                  src={photo.src}
                  alt={photo.alt}
                  categoryLabel="La Panera"
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Center Editorial Showcase Column */}
          <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-8 text-center">
            <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#3F302A] font-medium block mb-2">
              Conoce:
            </span>
            <h2 className="font-editorial italic font-normal text-5xl sm:text-6xl md:text-7xl text-[#2F302D] leading-none mb-8">
              La Panera Café
            </h2>

            {/* Wide Architectural / Vitrina Banner with Official Logo Overlay */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2F302D]/25 shadow-lg mb-8 bg-[#EFE3D4]">
              <ResilientDishImage
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85"
                alt="Interior cálido y vitrina iluminada de La Panera Café"
                categoryLabel="Restaurante de desayunos y brunch"
                className="w-full h-64 sm:h-80 md:h-96"
              />
              {/* Floating Official Brand Plaque inside the showcase */}
              <div className="absolute bottom-4 right-4 bg-[#EFE3D4]/95 backdrop-blur-sm border border-[#2F302D] rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-md">
                <img
                  src={LA_PANERA_BRAND.logoAssetPath}
                  alt="Sello Oficial La Panera Café"
                  className="w-12 h-12 object-contain rounded-lg"
                />
                <div className="text-left">
                  <div className="font-display font-bold text-xs uppercase tracking-[0.18em] text-[#2F302D]">
                    LA PANERA CAFE
                  </div>
                  <div className="text-[10px] text-[#3F302A] uppercase tracking-wider">
                    {LA_PANERA_BRAND.officialDescriptor}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#3F302A] leading-relaxed max-w-2xl mx-auto font-normal mb-5">
              La Panera Café es un espacio donde desayuno y brunch se disfrutan con calma y cariño. Entre café y pastelería, cada visita invita a empezar el día con calidez y momentos para compartir.
            </p>

            <blockquote className="font-editorial italic text-xl sm:text-2xl text-[#2F302D] max-w-2xl mx-auto leading-relaxed mb-8">
              “{LA_PANERA_BRAND.essenceManifesto}”
            </blockquote>

            {/* Trajectory Editorial Sign-off */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-[#EFE3D4] border border-[#2F302D]/30 rounded-full px-5 py-2 text-xs text-[#2F302D]">
              <span className="font-semibold">{LA_PANERA_BRAND.trajectoryText}</span>
              <span aria-hidden="true" className="text-[#626B55]">·</span>
              <span className="font-semibold uppercase tracking-[0.16em] text-[10px] text-[#626B55]">
                {LA_PANERA_BRAND.trajectoryValidationStamp}
              </span>
            </div>
          </div>

          {/* Right Vertical Photo Strip (Desktop Editorial Framing) */}
          <div className="hidden lg:flex flex-col gap-4 w-28 xl:w-36 shrink-0">
            {RIGHT_FLANK_PHOTOS.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square w-full overflow-hidden rounded-l-xl border-y border-l border-[#2F302D]/20 shadow-sm"
              >
                <ResilientDishImage
                  src={photo.src}
                  alt={photo.alt}
                  categoryLabel="La Panera"
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ruta Delivery Rappi Banner — Refined Editorial Strip */}
      <section
        id="delivery-rappi"
        className="py-12 px-4 sm:px-6 lg:px-8 bg-[#EFE3D4] border-b border-[#2F302D]/15"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F6F1E9] border border-[#2F302D]/25 rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-[#2F302D] text-[#EFE3D4] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#626B55] block mb-1">
                  DELIVERY OFICIAL
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#2F302D]">
                  Lleva el aroma de La Panera a tu mesa por{' '}
                  <span className="italic font-normal">Rappi</span>
                </h2>
                <p className="text-sm text-[#3F302A] mt-1 max-w-2xl">
                  Pide tus desayunos, sándwiches generosos, panes recién horneados, postres y café directamente a domicilio desde nuestro canal oficial.
                </p>
              </div>
            </div>

            <a
              href={LA_PANERA_BRAND.channels.rappiDelivery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#2F302D] text-[#EFE3D4] hover:bg-[#3F302A] rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors whitespace-nowrap shrink-0"
            >
              <span>PEDIR POR RAPPI AHORA</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Nuestras Sedes en Lima ("¡Visítanos! Te esperamos en...") — Mapa a la Izquierda + Tarjetas de Filtro y Sedes a la Derecha */}
      <section
        id="locales-sedes"
        className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F6F1E9] border-b border-[#2F302D]/15"
      >
        <div className="max-w-7xl mx-auto">
          {/* Centered Botanical Header */}
          <div className="flex flex-col items-center text-center mb-12">
            <BotanicalBranchSVG className="w-16 h-10 mb-3" />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#626B55] mb-2">
              MAPA GENERAL DE SEDES · LIMA METROPOLITANA
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#2F302D] leading-tight">
              ¡Visítanos!
              <span className="block italic font-normal text-[#3F302A] mt-1">
                Te esperamos en...
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#3F302A] max-w-2xl mt-3 leading-relaxed">
              Explora nuestras <strong>9 sedes en 6 distritos de Lima</strong> en un solo mapa interactivo. Presiona cualquier tarjeta de distrito o local en la columna derecha para enfocar su ubicación exacta.
            </p>
          </div>

          {/* Split Architecture: Left Interactive Google Map (7 cols) + Right Pressable Cards Panel (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Clean Unified Google Map (Sticky on Desktop, Zero Scrollbars) */}
            <div
              ref={mapSectionRef}
              className="lg:col-span-7 lg:sticky lg:top-20 bg-[#EFE3D4] border border-[#2F302D]/25 rounded-2xl overflow-hidden shadow-md"
            >
              {/* Clean Header Strip inside Map Card (No Horizontal Scrollbar) */}
              <div className="px-5 py-3.5 bg-[#EFE3D4] border-b border-[#2F302D]/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-[#2F302D]">
                  <Compass className="w-4 h-4 text-[#626B55] shrink-0" />
                  <span className="font-bold uppercase tracking-[0.16em]">
                    {selectedSede
                      ? `Enfocando: ${selectedSede.name}`
                      : activeDistrict === 'todas'
                      ? 'Vista General · 9 Sedes en Lima'
                      : `Distrito: ${
                          SEDE_DISTRICT_FILTERS.find(
                            (d) => d.id === activeDistrict
                          )?.label || ''
                        } (${visibleSedes.length})`}
                  </span>
                </div>

                {(selectedSedeId || activeDistrict !== 'todas') && (
                  <button
                    type="button"
                    onClick={handleShowAllOverview}
                    className="px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-[#2F302D] text-[#EFE3D4] hover:bg-[#626B55] transition-colors cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Ver las 9 Sedes</span>
                  </button>
                )}
              </div>

              {/* Map Viewport (Explicit height to prevent CF2 Map Height Collapse) */}
              <div
                className="relative w-full bg-[#E5DEC9]"
                style={{ width: '100%', height: '580px' }}
              >
                {GOOGLE_MAPS_API_KEY ? (
                  <APIProvider
                    apiKey={GOOGLE_MAPS_API_KEY}
                    language="es"
                    region="PE"
                    libraries={['marker', 'places']}
                  >
                    <GoogleMap
                      defaultCenter={initialViewport.center}
                      defaultZoom={initialViewport.recommendedZoom}
                      mapId="DEMO_MAP_ID"
                      gestureHandling="cooperative"
                      internalUsageAttributionIds={[
                        'gmp_mcp_codeassist_v1_aistudio',
                      ]}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <MapCameraAndPlacesController
                        visibleSedes={visibleSedes}
                        selectedSede={selectedSede}
                        overviewTrigger={overviewTrigger}
                        onLivePlaceLoaded={handleLivePlaceLoaded}
                      />

                      {visibleSedes.map((sede) => {
                        const isSelected = selectedSedeId === sede.id;
                        return (
                          <AdvancedMarker
                            key={sede.id}
                            position={sede.coordinates}
                            title={`${sede.name} — ${sede.address}`}
                            zIndex={isSelected ? 50 : 10}
                            onClick={() => handleFocusSedeOnMap(sede, false)}
                          >
                            <div
                              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border shadow-md transition-transform ${
                                isSelected
                                  ? 'bg-[#C93B2B] text-white border-white scale-110'
                                  : 'bg-[#2F302D] text-[#EFE3D4] border-[#EFE3D4] hover:scale-105'
                              }`}
                            >
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span className="text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                                {sede.code} · {sede.shortName}
                              </span>
                            </div>
                          </AdvancedMarker>
                        );
                      })}

                      {selectedSede && (
                        <InfoWindow
                          position={selectedSede.coordinates}
                          pixelOffset={[0, -34]}
                          maxWidth={290}
                          onCloseClick={() => setSelectedSedeId(null)}
                        >
                          <div className="p-1 text-[#2F302D]">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#626B55]">
                              SEDE {selectedSede.code} · {selectedSede.district}
                            </div>
                            <div className="font-editorial text-xl font-semibold text-[#2F302D] leading-snug mt-0.5">
                              {livePlaces[selectedSede.id]?.displayName ||
                                selectedSede.name}
                            </div>
                            <div className="text-xs text-[#3F302A] mt-1">
                              {livePlaces[selectedSede.id]?.formattedAddress ||
                                selectedSede.address}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F302D] mt-1.5">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                              <span>
                                {livePlaces[selectedSede.id]?.rating ??
                                  selectedSede.rating}
                              </span>
                              <span className="text-[#3F302A] font-normal">
                                (
                                {livePlaces[selectedSede.id]?.userRatingCount ??
                                  selectedSede.reviewCount}{' '}
                                reseñas) · {selectedSede.priceRange}
                              </span>
                            </div>
                            <div className="mt-2.5 flex items-center gap-2">
                              <a
                                href={
                                  livePlaces[selectedSede.id]?.googleMapsURI ||
                                  selectedSede.mapsUrl
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-[#2F302D] text-[#EFE3D4] rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-[#626B55] transition-colors"
                              >
                                <Navigation className="w-3 h-3" />
                                <span>Cómo llegar en Maps</span>
                              </a>
                            </div>
                          </div>
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  </APIProvider>
                ) : null}

                {/* Compact Floating Bottom Card inside the Map (Leaving Google Logo Unobstructed) */}
                <div className="absolute bottom-7 left-14 right-14 bg-[#F6F1E9]/95 backdrop-blur-md border border-[#2F302D]/25 rounded-2xl p-4 shadow-lg z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55]">
                        SEDE {highlightedSede.code} ·{' '}
                        {highlightedSede.district.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2F302D] bg-[#EFE3D4] px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>
                          {highlightedLive?.rating ?? highlightedSede.rating}
                        </span>
                        <span className="text-[10px] text-[#3F302A] font-normal">
                          (
                          {highlightedLive?.userRatingCount ??
                            highlightedSede.reviewCount}
                          )
                        </span>
                      </span>
                    </div>
                    <h3 className="font-editorial text-xl sm:text-2xl text-[#2F302D] leading-tight mt-0.5">
                      {highlightedLive?.displayName || highlightedSede.name}
                    </h3>
                    <p className="text-xs text-[#3F302A]">
                      {highlightedLive?.formattedAddress ||
                        highlightedSede.address}
                    </p>
                  </div>

                  <a
                    href={
                      highlightedLive?.googleMapsURI || highlightedSede.mapsUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#2F302D] text-[#EFE3D4] hover:bg-[#3F302A] rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors shrink-0"
                  >
                    <span>IR CON MAPS</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Clean District Cards + Compact Interactive Sedes Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* Tarjetas de Distrito para filtrar rápidamente */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SEDE_DISTRICT_FILTERS.map((filter) => {
                  const isSelectedDistrict = activeDistrict === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => handleSelectDistrict(filter.id)}
                      className={`text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelectedDistrict
                          ? 'bg-[#2F302D] text-[#EFE3D4] border-[#2F302D] shadow-[3px_3px_0px_0px_#626B55] -translate-y-0.5'
                          : 'bg-[#EFE3D4] hover:bg-[#F6F1E9] text-[#2F302D] border-[#2F302D]/25 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#2F302D]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5 w-full mb-1">
                        <span className="font-editorial text-base sm:text-lg font-semibold leading-tight truncate">
                          {filter.id === 'todas' ? 'Todas' : filter.label}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums shrink-0 ${
                            isSelectedDistrict
                              ? 'bg-[#EFE3D4] text-[#2F302D]'
                              : 'bg-white/80 text-[#3F302A]'
                          }`}
                        >
                          {filter.count}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] truncate block ${
                          isSelectedDistrict
                            ? 'text-[#D9C9B1]'
                            : 'text-[#3F302A]/80'
                        }`}
                      >
                        {DISTRICT_SUBTITLES[filter.id]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tarjetas Interactivas de Sedes (alineadas a la altura del mapa) */}
              <div className="space-y-3 lg:max-h-[490px] lg:overflow-y-auto lg:pr-1">
                {visibleSedes.map((sede) => {
                  const isSelected = selectedSedeId === sede.id;
                  const live = livePlaces[sede.id];
                  return (
                    <article
                      key={sede.id}
                      onClick={() => handleFocusSedeOnMap(sede, true)}
                      className={`group bg-[#EFE3D4] hover:bg-[#F6F1E9] border ${
                        isSelected
                          ? 'border-[#C93B2B] ring-1 ring-[#C93B2B] bg-[#F6F1E9]'
                          : 'border-[#2F302D]/30'
                      } rounded-2xl p-4 shadow-none hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#2F302D] transition-all duration-200 flex flex-col justify-between cursor-pointer`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#626B55]">
                            SEDE {sede.code} · {sede.district}
                          </span>
                          <div className="inline-flex items-center gap-1 bg-white/85 border border-[#2F302D]/15 rounded-full px-2 py-0.5 text-[11px] font-bold text-[#2F302D]">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                            <span>{live?.rating ?? sede.rating}</span>
                            <span className="text-[10px] text-[#3F302A] font-normal">
                              ({live?.userRatingCount ?? sede.reviewCount})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-editorial text-xl sm:text-2xl text-[#2F302D] leading-tight">
                            {sede.name}
                          </h3>
                          <BreadLoafIcon
                            className="w-7 h-4 shrink-0 mt-1"
                            cutoutColor="#EFE3D4"
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 mt-1.5 text-xs text-[#3F302A]">
                          <span className="inline-flex items-center gap-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#626B55] shrink-0" />
                            <span>{sede.address}</span>
                          </span>
                          {sede.phoneRef && (
                            <span className="inline-flex items-center gap-1 font-semibold text-[#626B55] tabular-nums">
                              <Phone className="w-3 h-3" />
                              <span>{sede.phoneRef}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#2F302D]/15 flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-[0.14em] inline-flex items-center gap-1 ${
                            isSelected ? 'text-[#C93B2B]' : 'text-[#626B55]'
                          }`}
                        >
                          <MapPin className="w-3 h-3 text-[#C93B2B]" />
                          <span>
                            {isSelected
                              ? 'Enfocada en el mapa'
                              : 'Ver en el mapa'}
                          </span>
                        </span>

                        <a
                          href={live?.googleMapsURI || sede.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#2F302D] text-[#EFE3D4] hover:bg-[#3F302A] rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors whitespace-nowrap"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Abrir Maps</span>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería Editorial de Comunidad (@la_panera_cafe) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F1E9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <BotanicalBranchSVG className="w-14 h-9 mb-2" />
            <a
              href={LA_PANERA_BRAND.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-editorial text-2xl sm:text-3xl text-[#2F302D] hover:text-[#626B55] transition-colors"
            >
              {LA_PANERA_BRAND.socials.instagramHandle}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOCIAL_GALLERY_PHOTOS.map((photo, idx) => (
              <a
                key={idx}
                href={LA_PANERA_BRAND.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-[#2F302D]/20 shadow-sm"
              >
                <ResilientDishImage
                  src={photo.src}
                  alt={photo.alt}
                  categoryLabel="La Panera Café"
                  className="w-full h-full"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#2F302D]/85 via-[#2F302D]/30 to-transparent text-[#EFE3D4]">
                  <span className="font-editorial italic text-base block">
                    {photo.caption}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
