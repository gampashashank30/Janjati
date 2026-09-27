import React from 'react';

interface StateEmblemProps {
  className?: string;
  size?: number;
}

/**
 * State Emblem of India (Lion Capital of Ashoka)
 * Official emblem of the Government of India / Ministry of Tribal Affairs.
 */
export const StateEmblem: React.FC<StateEmblemProps> = ({ className = 'w-7 h-9', size }) => {
  return (
    <svg
      viewBox="0 0 100 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: (size * 1.35) } : undefined}
      aria-label="State Emblem of India"
      role="img"
    >
      {/* Lions Crown & Mane in ceremonial bronze/gold */}
      <g fill="#8B6F2D">
        {/* Center Lion Head */}
        <path d="M50 14 C46 14 43 17 43 21 C41 21 39 23 39 26 C37 28 37 31 38 34 C39 37 42 39 45 40 C44 42 43 45 44 48 C45 52 48 55 50 56 C52 55 55 52 56 48 C57 45 56 42 55 40 C58 39 61 37 62 34 C63 31 63 28 61 26 C61 23 59 21 57 21 C57 17 54 14 50 14 Z" />
        
        {/* Left Lion Profile */}
        <path d="M38 23 C34 22 30 24 28 28 C26 31 26 35 28 39 C25 41 23 45 24 49 C25 53 28 57 32 60 C35 62 39 63 42 63 C40 59 40 54 41 50 C37 49 34 46 33 42 C32 38 34 34 37 32 C36 29 36 26 38 23 Z" />

        {/* Right Lion Profile */}
        <path d="M62 23 C66 22 70 24 72 28 C74 31 74 35 72 39 C75 41 77 45 76 49 C75 53 72 57 68 60 C65 62 61 63 58 63 C60 59 60 54 59 50 C63 49 66 46 67 42 C68 38 66 34 63 32 C64 29 64 26 62 23 Z" />

        {/* Mane Details Highlight */}
        <path d="M44 38 C42 41 42 45 44 49 C46 53 48 56 50 58 C52 56 54 53 56 49 C58 45 58 41 56 38 C54 42 52 45 50 46 C48 45 46 42 44 38 Z" fill="#A88B3D" />

        {/* Front Legs / Pillars */}
        <path d="M43 60 L43 72 L47 72 L47 62 Z" />
        <path d="M53 62 L53 72 L57 72 L57 60 Z" />
        <path d="M37 63 L37 72 L41 72 L41 63 Z" fill="#755C24" />
        <path d="M59 63 L59 72 L63 72 L63 63 Z" fill="#755C24" />
      </g>

      {/* Eyes & Accents */}
      <circle cx="31" cy="32" r="1.5" fill="#3D2E0B" />
      <circle cx="69" cy="32" r="1.5" fill="#3D2E0B" />
      <path d="M47 24 C47 22 48 21 50 21 C52 21 53 22 53 24 C53 26 52 27 50 27 C48 27 47 26 47 24 Z" fill="#5A4514" />
      <path d="M48 34 L50 37 L52 34 Z" fill="#3D2E0B" />

      {/* Abacus frieze */}
      <rect x="18" y="73" width="64" height="4" rx="1.5" fill="#8B6F2D" />
      <rect x="14" y="77" width="72" height="18" rx="2" fill="#FAF6ED" stroke="#8B6F2D" strokeWidth="1.8" />

      {/* Ashoka Chakra in center */}
      <g transform="translate(50, 86)">
        <circle cx="0" cy="0" r="7.5" fill="#FFFFFF" stroke="#003366" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="1.8" fill="#003366" />
        <g stroke="#003366" strokeWidth="0.8" strokeLinecap="round">
          <line x1="0" y1="-7" x2="0" y2="7" />
          <line x1="-7" y1="0" x2="7" y2="0" />
          <line x1="-4.95" y1="-4.95" x2="4.95" y2="4.95" />
          <line x1="-4.95" y1="4.95" x2="4.95" y2="-4.95" />
          <line x1="-2.4" y1="-6.58" x2="2.4" y2="6.58" />
          <line x1="2.4" y1="-6.58" x2="-2.4" y2="6.58" />
          <line x1="-6.58" y1="-2.4" x2="6.58" y2="2.4" />
          <line x1="-6.58" y1="2.4" x2="6.58" y2="-2.4" />
        </g>
      </g>

      {/* Galloping Horse (Left) & Bull (Right) on Abacus */}
      <path d="M26 83 C24 81 21 82 20 84 C19 86 21 87 23 88 C21 89 20 91 22 92 L25 92 C26 90 27 89 29 88 C31 87 32 85 30 84 Z" fill="#8B6F2D" />
      <path d="M72 83 C74 81 77 82 78 84 C79 86 77 87 75 88 C77 89 78 91 76 92 L73 92 C72 90 71 89 69 88 C67 87 66 85 68 84 Z" fill="#8B6F2D" />

      {/* Base plinth & Lotus base */}
      <rect x="18" y="95" width="64" height="4" rx="1.5" fill="#8B6F2D" />
      <path d="M22 99 L78 99 L74 105 L26 105 Z" fill="#A88B3D" />
      <path d="M28 105 C35 112 42 114 50 114 C58 114 65 112 72 105 Z" fill="#8B6F2D" />

      {/* National Motto: Satyameva Jayate (सत्यमेव जयते) */}
      <text
        x="50"
        y="127"
        fontFamily="'Noto Sans Devanagari', 'Arial Unicode MS', sans-serif"
        fontSize="9"
        fontWeight="bold"
        fill="#5A4514"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        सत्यमेव जयते
      </text>
    </svg>
  );
};
