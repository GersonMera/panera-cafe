import React, { useState } from 'react';

/**
 * Exact SVG recreation of the iconic bread loaf from the official LA PANERA CAFE logo,
 * featuring the warm arched silhouette and the 3 diagonal curved oven score cuts ("greñas")
 * in negative space (#EFE3D4 or customizable cutout color).
 */
export const BreadLoafIcon: React.FC<{
  className?: string;
  fillColor?: string;
  cutoutColor?: string;
  showSteam?: boolean;
}> = ({
  className = 'w-28 h-16',
  fillColor = '#2F302D',
  cutoutColor = '#EFE3D4',
  showSteam = false,
}) => {
  return (
    <svg
      viewBox="0 0 280 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {showSteam && (
        <g stroke={fillColor} strokeWidth="3.5" strokeLinecap="round">
          <path
            d="M92 34C88 24 96 16 92 6"
            className="animate-steam-1"
            opacity="0.65"
          />
          <path
            d="M140 28C136 18 144 10 140 2"
            className="animate-steam-2"
            opacity="0.75"
          />
          <path
            d="M188 34C184 24 192 16 188 6"
            className="animate-steam-3"
            opacity="0.65"
          />
        </g>
      )}

      {/* Main Bread Loaf Silhouette */}
      <path
        d="M32 108C32 68 78 44 140 44C202 44 248 68 248 108C248 120 239 126 227 126H53C41 126 32 120 32 108Z"
        fill={fillColor}
      />

      {/* 3 Diagonal Curved Oven Cuts (Greñas) matching the official logo */}
      {/* Cut 1 (Left) */}
      <path
        d="M110 43C92 52 76 70 72 88C71 92 75 94 78 90C89 76 105 58 124 44C119 43 114 43 110 43Z"
        fill={cutoutColor}
      />
      {/* Cut 2 (Center) */}
      <path
        d="M154 43C135 53 117 72 113 91C112 95 116 97 119 93C131 78 148 59 169 45C164 44 159 43 154 43Z"
        fill={cutoutColor}
      />
      {/* Cut 3 (Right) */}
      <path
        d="M196 47C178 57 162 74 159 91C158 95 162 97 165 93C176 79 191 63 209 51C205 49 200 48 196 47Z"
        fill={cutoutColor}
      />
    </svg>
  );
};

/**
 * Complete Official LA PANERA [ C A F E ] Vector Lockup
 */
export const LaPaneraLogoLockup: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSteam?: boolean;
  cutoutColor?: string;
}> = ({ size = 'md', showSteam = false, cutoutColor = '#EFE3D4' }) => {
  if (size === 'sm') {
    return (
      <div className="inline-flex items-center gap-2 sm:gap-3 select-none group">
        <BreadLoafIcon
          className="w-9 h-6 sm:w-12 sm:h-8 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
          cutoutColor={cutoutColor}
        />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-display font-bold text-base sm:text-xl tracking-[0.08em] sm:tracking-[0.14em] text-[#2F302D] uppercase whitespace-nowrap">
            LA PANERA
          </span>
          <span className="bg-white text-[#2F302D] border-2 border-[#2F302D] rounded-md px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.28em] uppercase shadow-[0_2px_0_#2F302D] whitespace-nowrap">
            CAFE
          </span>
        </div>
      </div>
    );
  }

  const isHero = size === 'hero';
  const isLg = size === 'lg';

  return (
    <div className="inline-flex flex-col items-center select-none">
      <BreadLoafIcon
        className={
          isHero
            ? 'w-44 h-24 md:w-56 md:h-28 -mb-1'
            : isLg
            ? 'w-36 h-20 -mb-1'
            : 'w-28 h-16 -mb-1'
        }
        showSteam={showSteam}
        cutoutColor={cutoutColor}
      />
      <div
        className={`font-display font-bold uppercase text-[#2F302D] tracking-[0.16em] leading-none text-center ${
          isHero
            ? 'text-4xl sm:text-6xl md:text-7xl'
            : isLg
            ? 'text-3xl sm:text-5xl'
            : 'text-2xl sm:text-3xl'
        }`}
      >
        LA PANERA
      </div>
      <div
        className={`mt-3 bg-white text-[#2F302D] border-2 border-[#2F302D] rounded-xl font-display font-bold uppercase tracking-[0.34em] shadow-[0_4px_0_#2F302D] ${
          isHero
            ? 'px-7 py-2 text-base sm:text-xl'
            : isLg
            ? 'px-6 py-1.5 text-sm sm:text-base'
            : 'px-4 py-1 text-xs sm:text-sm'
        }`}
      >
        C A F E
      </div>
    </div>
  );
};

/**
 * Motivo Gráfico de las 3 Greñas (Three Diagonal Oven Score Cuts)
 * Used as visual signature on cards, headers, and section dividers.
 */
export const ThreeScoresMotif: React.FC<{
  className?: string;
  color?: string;
}> = ({ className = 'w-12 h-8', color = '#2F302D' }) => (
  <svg
    viewBox="0 0 72 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 4C16 12 9 24 6 38C12 28 20 17 30 6C28 5 26 4.5 24 4Z"
      fill={color}
    />
    <path
      d="M44 4C36 12 29 24 26 38C32 28 40 17 50 6C48 5 46 4.5 44 4Z"
      fill={color}
    />
    <path
      d="M64 6C56 14 49 25 46 38C52 29 59 19 69 9C67 7.5 65.5 6.5 64 6Z"
      fill={color}
    />
  </svg>
);

/**
 * Circular Rotating Bakery Stamp ("HORNEADO CON PASIÓN · EN FAMILIA")
 */
export const RotatingBakeryStamp: React.FC<{ className?: string }> = ({
  className = 'w-32 h-32',
}) => (
  <div
    className={`relative inline-flex items-center justify-center select-none ${className}`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 160 160"
      className="w-full h-full animate-stamp-spin"
    >
      <defs>
        <path
          id="stampCirclePath"
          d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
        />
      </defs>
      <circle
        cx="80"
        cy="80"
        r="74"
        fill="#FFFFFF"
        stroke="#2F302D"
        strokeWidth="3"
      />
      <circle
        cx="80"
        cy="80"
        r="46"
        fill="#EFE3D4"
        stroke="#2F302D"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <text
        fill="#2F302D"
        fontSize="10.5"
        fontWeight="700"
        letterSpacing="2.3px"
      >
        <textPath href="#stampCirclePath" startOffset="0%">
          HORNEADO CON PASIÓN · EN FAMILIA ·
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <BreadLoafIcon className="w-12 h-8" cutoutColor="#EFE3D4" />
    </div>
  </div>
);

/**
 * Hand-crafted Wheat Spike SVG
 */
export const WheatSpikeSVG: React.FC<{ className?: string }> = ({
  className = 'w-10 h-10',
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M14 50L50 14"
      stroke="#2F302D"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M24 40C18 36 18 28 24 26C26 32 26 38 24 40Z"
      fill="#D9C9B1"
      stroke="#2F302D"
      strokeWidth="2.5"
    />
    <path
      d="M24 40C28 46 36 46 38 40C32 38 26 38 24 40Z"
      fill="#D9C9B1"
      stroke="#2F302D"
      strokeWidth="2.5"
    />
    <path
      d="M34 30C28 26 28 18 34 16C36 22 36 28 34 30Z"
      fill="#EFE3D4"
      stroke="#2F302D"
      strokeWidth="2.5"
    />
    <path
      d="M34 30C38 36 46 36 48 30C42 28 36 28 34 30Z"
      fill="#EFE3D4"
      stroke="#2F302D"
      strokeWidth="2.5"
    />
  </svg>
);

/**
 * Hand-crafted Rolling Pin SVG
 */
export const RollingPinSVG: React.FC<{ className?: string }> = ({
  className = 'w-12 h-12',
}) => (
  <svg
    viewBox="0 0 80 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect
      x="18"
      y="11"
      width="44"
      height="18"
      rx="6"
      fill="#D9C9B1"
      stroke="#2F302D"
      strokeWidth="3"
    />
    <path
      d="M6 20H18M62 20H74"
      stroke="#2F302D"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="6" cy="20" r="4" fill="#3F302A" />
    <circle cx="74" cy="20" r="4" fill="#3F302A" />
    <path
      d="M28 15L24 25M40 15L36 25M52 15L48 25"
      stroke="#2F302D"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.45"
    />
  </svg>
);

/**
 * Resilient Dish Image with Warm Morning Filter & Zero-Broken-Image Policy
 */
export const ResilientDishImage: React.FC<{
  src: string;
  alt: string;
  categoryLabel: string;
  className?: string;
}> = ({ src, alt, categoryLabel, className = 'w-full h-56' }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${className} bg-[#D9C9B1] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden`}
      >
        <BreadLoafIcon className="w-24 h-14 mb-2" cutoutColor="#D9C9B1" />
        <span className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#2F302D]">
          {categoryLabel}
        </span>
        <span className="font-editorial italic text-sm text-[#3F302A] mt-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden bg-[#D9C9B1]`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 contrast-[1.03] sepia-[0.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2F302D]/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

/**
 * Fine-line Botanical Coffee & Olive Branch Ornament (inspired by the editorial reference)
 */
export const BotanicalBranchSVG: React.FC<{
  className?: string;
  strokeColor?: string;
  leafFillColor?: string;
}> = ({
  className = 'w-14 h-9',
  strokeColor = '#2F302D',
  leafFillColor = '#EFE3D4',
}) => (
  <svg
    viewBox="0 0 80 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 38C28 32 48 22 68 10"
      stroke={strokeColor}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M26 31C22 23 25 15 33 14C34 21 31 28 26 31Z"
      stroke={strokeColor}
      strokeWidth="1.3"
      fill={leafFillColor}
    />
    <path
      d="M36 26C43 29 50 26 53 19C46 18 39 21 36 26Z"
      stroke={strokeColor}
      strokeWidth="1.3"
      fill={leafFillColor}
    />
    <path
      d="M44 21C41 14 44 7 51 6C52 12 49 18 44 21Z"
      stroke={strokeColor}
      strokeWidth="1.3"
      fill={leafFillColor}
    />
    <circle cx="33" cy="28" r="2.2" fill={strokeColor} />
    <circle cx="48" cy="19" r="2.2" fill={strokeColor} />
    <circle cx="22" cy="33" r="1.8" fill={strokeColor} opacity="0.75" />
  </svg>
);

/**
 * Circular Editorial Seal 1: "CAFÉ 100% PERUANO · PERUVIAN COFFEE"
 */
export const PeruvianCoffeeSealSVG: React.FC<{ className?: string }> = ({
  className = 'w-28 h-28',
}) => (
  <svg
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Café 100% Peruano"
  >
    <defs>
      <path
        id="peruSealTop"
        d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
      />
    </defs>
    <circle
      cx="70"
      cy="70"
      r="64"
      stroke="#2F302D"
      strokeWidth="1.2"
      strokeOpacity="0.35"
    />
    <circle cx="70" cy="70" r="36" stroke="#2F302D" strokeWidth="1.4" />
    <text
      fill="#2F302D"
      fontSize="8.8"
      fontWeight="600"
      letterSpacing="2.4px"
    >
      <textPath href="#peruSealTop" startOffset="3%">
        CAFÉ 100% PERUANO · PERUVIAN COFFEE ·
      </textPath>
    </text>
    {/* Stylized Map of Peru & Coffee Bean Silhouette */}
    <path
      d="M62 49L69 47L73 53L79 57L76 65L79 73L75 81L80 88L72 91L66 84L61 76L57 68L59 59L62 49Z"
      stroke="#2F302D"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="#EFE3D4"
    />
  </svg>
);

/**
 * Circular Editorial Seal 2: "ZONA WIFI · WIFI ZONE"
 */
export const WifiZoneSealSVG: React.FC<{ className?: string }> = ({
  className = 'w-28 h-28',
}) => (
  <svg
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Zona WiFi"
  >
    <defs>
      <path
        id="wifiSealPath"
        d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
      />
    </defs>
    <circle
      cx="70"
      cy="70"
      r="64"
      stroke="#2F302D"
      strokeWidth="1.2"
      strokeOpacity="0.35"
    />
    <circle cx="70" cy="70" r="36" stroke="#2F302D" strokeWidth="1.4" />
    <text
      fill="#2F302D"
      fontSize="9.2"
      fontWeight="600"
      letterSpacing="3.3px"
    >
      <textPath href="#wifiSealPath" startOffset="6%">
        ZONA WIFI · WIFI ZONE · LA PANERA ·
      </textPath>
    </text>
    {/* WiFi Waves Icon */}
    <path
      d="M54 65C63 57 77 57 86 65"
      stroke="#2F302D"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M59 72C65 66 75 66 81 72"
      stroke="#2F302D"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M64 79C67.5 76 72.5 76 76 79"
      stroke="#2F302D"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <circle cx="70" cy="85" r="2.6" fill="#2F302D" />
  </svg>
);

