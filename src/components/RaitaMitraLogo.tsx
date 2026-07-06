import React from 'react';

interface LogoProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  highContrast?: boolean;
  theme?: 'light' | 'dark';
}

export function RaitaMitraLogoIcon({
  className = '',
  width = '100%',
  height = '100%',
  highContrast = false
}: LogoProps) {
  // Theme-sensitive colors
  const goldColor = highContrast ? '#FFFFFF' : '#E5B122';
  const leafDarkColor = highContrast ? '#FFFFFF' : '#154F18';
  const leafMedColor = highContrast ? '#FFFFFF' : '#2E7D32';
  const leafLightColor = highContrast ? '#FFFFFF' : '#4CAF50';
  const leafLimeColor = highContrast ? '#FFFFFF' : '#8BC34A';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={width}
      height={height}
      className={className}
      aria-label="RaitaMitra Emblem"
    >
      <defs>
        {/* Rich visual depth gradients resembling the original branding image */}
        <linearGradient id="goldTreeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#E5A900" />
        </linearGradient>
        <linearGradient id="leafDarkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0B300C" />
          <stop offset="100%" stopColor="#1E5C22" />
        </linearGradient>
        <linearGradient id="leafMedGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#1B5E20" />
          <stop offset="100%" stopColor="#388E3C" />
        </linearGradient>
        <linearGradient id="leafLightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#66BB6A" />
        </linearGradient>
        <linearGradient id="leafLimeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#558B2F" />
          <stop offset="100%" stopColor="#9CCC65" />
        </linearGradient>
      </defs>

      {/* 1. Symmetrical Bottom Organic Leaves (Exactly matching the logo image leaf-stack) */}
      <g id="leaf-base">
        {/* Bottom-most outer dark green leaves curving outwards & downwards */}
        <path
          d="M 50,88 C 34,90 14,88 6,76 C 18,66 36,73 50,88 Z"
          fill={highContrast ? leafDarkColor : 'url(#leafDarkGrad)'}
          stroke={highContrast ? '#FFFFFF' : '#09250A'}
          strokeWidth="0.8"
        />
        <path
          d="M 50,88 C 66,90 86,88 94,76 C 82,66 64,73 50,88 Z"
          fill={highContrast ? leafDarkColor : 'url(#leafDarkGrad)'}
          stroke={highContrast ? '#FFFFFF' : '#09250A'}
          strokeWidth="0.8"
        />
        {/* Subtle veins for bottom outer leaves */}
        <path d="M 50,88 Q 28,81 6,76" stroke={highContrast ? '#FFFFFF' : '#082009'} strokeWidth="0.6" fill="none" opacity="0.5" />
        <path d="M 50,88 Q 72,81 94,76" stroke={highContrast ? '#FFFFFF' : '#082009'} strokeWidth="0.6" fill="none" opacity="0.5" />

        {/* Middle level forest green leaves curving outwards & upwards */}
        <path
          d="M 50,85 C 33,81 14,73 10,54 C 23,50 40,63 50,85 Z"
          fill={highContrast ? leafMedColor : 'url(#leafMedGrad)'}
          stroke={highContrast ? '#FFFFFF' : '#124E16'}
          strokeWidth="0.8"
        />
        <path
          d="M 50,85 C 67,81 86,73 90,54 C 77,50 60,63 50,85 Z"
          fill={highContrast ? leafMedColor : 'url(#leafMedGrad)'}
          stroke={highContrast ? '#FFFFFF' : '#124E16'}
          strokeWidth="0.8"
        />
        {/* Subtle veins for middle leaves */}
        <path d="M 50,85 Q 29,70 10,54" stroke={highContrast ? '#FFFFFF' : '#0E3A11'} strokeWidth="0.6" fill="none" opacity="0.5" />
        <path d="M 50,85 Q 71,70 90,54" stroke={highContrast ? '#FFFFFF' : '#0E3A11'} strokeWidth="0.6" fill="none" opacity="0.5" />

        {/* Top-level bright green leaves pointing more upwards */}
        <path
          d="M 50,81 C 37,69 22,55 18,36 C 31,34 44,52 50,81 Z"
          fill={highContrast ? leafLightColor : 'url(#leafLightGrad)'}
          stroke={highContrast ? '#FFFFFF' : '#1B5E20'}
          strokeWidth="0.8"
        />
        <path
          d="M 50,81 C 63,69 78,55 82,36 C 69,34 56,52 50,81 Z"
          fill={highContrast ? leafLightColor : 'url(#leafLightGrad)'}
          stroke={highContrast ? '#FFFFFF' : '#1B5E20'}
          strokeWidth="0.8"
        />
        {/* Subtle veins for top leaves */}
        <path d="M 50,81 Q 33,60 18,36" stroke={highContrast ? '#FFFFFF' : '#144617'} strokeWidth="0.6" fill="none" opacity="0.5" />
        <path d="M 50,81 Q 67,60 82,36" stroke={highContrast ? '#FFFFFF' : '#144617'} strokeWidth="0.6" fill="none" opacity="0.5" />

        {/* Central sheath leaf pointing straight vertical */}
        <path
          d="M 50,90 C 43,72 41,52 50,38 C 59,52 57,72 50,90 Z"
          fill={highContrast ? leafLimeColor : 'url(#leafLimeGrad)'}
          stroke={highContrast ? '#FFFFFF' : '#275F11'}
          strokeWidth="0.8"
        />
        {/* Central vein divider line */}
        <line x1="50" y1="90" x2="50" y2="38" stroke={highContrast ? '#FFFFFF' : '#1B5E20'} strokeWidth="0.8" opacity="0.7" />
      </g>

      {/* 2. Golden Branching Sprout/Tree (Mathematically precise symmetrical grid splits) */}
      <g
        id="golden-tree"
        stroke={highContrast ? goldColor : 'url(#goldTreeGrad)'}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Central Vertical Trunk extending straight up */}
        <line x1="50" y1="80" x2="50" y2="10" />

        {/* Left Side Branching Grid */}
        {/* Lowest Split at y=62, goes left to x=26, then vertical up to y=40, then splits 3 ways */}
        <path d="M 50,62 L 26,62 L 26,40" />
        <path d="M 26,40 L 16,40 L 16,24" /> {/* Left-most tip */}
        <path d="M 26,40 L 26,18" />          {/* Middle-left outer tip */}
        <path d="M 26,40 L 36,40 L 36,24" /> {/* Middle-left inner tip */}

        {/* Higher Split at y=44, goes left to x=38, then vertical up to y=30, then splits 3 ways */}
        <path d="M 50,44 L 38,44 L 38,30" />
        <path d="M 38,30 L 32,30 L 32,16" /> {/* Inner-left outer tip */}
        <path d="M 38,30 L 38,12" />          {/* Inner-left middle tip */}
        <path d="M 38,30 L 44,30 L 44,16" /> {/* Inner-left inner tip */}


        {/* Right Side Branching Grid (Perfect horizontal reflection of Left side) */}
        {/* Lowest Split at y=62, goes right to x=74, then vertical up to y=40, then splits 3 ways */}
        <path d="M 50,62 L 74,62 L 74,40" />
        <path d="M 74,40 L 64,40 L 64,24" /> {/* Middle-right inner tip */}
        <path d="M 74,40 L 74,18" />          {/* Middle-right outer tip */}
        <path d="M 74,40 L 84,40 L 84,24" /> {/* Right-most tip */}

        {/* Higher Split at y=44, goes right to x=62, then vertical up to y=30, then splits 3 ways */}
        <path d="M 50,44 L 62,44 L 62,30" />
        <path d="M 62,30 L 56,30 L 56,16" /> {/* Inner-right inner tip */}
        <path d="M 62,30 L 62,12" />          {/* Inner-right middle tip */}
        <path d="M 62,30 L 68,30 L 68,16" /> {/* Inner-right outer tip */}
      </g>

      {/* Symmetrical Bud Circles at the tips of all 13 gold segments */}
      <g fill={goldColor} stroke="none">
        <circle cx="50" cy="10" r="2.2" /> {/* Symmetrical Top center bud */}
        
        {/* Inner tier buds */}
        <circle cx="44" cy="16" r="1.8" />
        <circle cx="56" cy="16" r="1.8" />
        <circle cx="38" cy="12" r="1.8" />
        <circle cx="62" cy="12" r="1.8" />
        <circle cx="32" cy="16" r="1.8" />
        <circle cx="68" cy="16" r="1.8" />

        {/* Outer tier buds */}
        <circle cx="36" cy="24" r="1.8" />
        <circle cx="64" cy="24" r="1.8" />
        <circle cx="26" cy="18" r="1.8" />
        <circle cx="74" cy="18" r="1.8" />
        <circle cx="16" cy="24" r="1.8" />
        <circle cx="84" cy="24" r="1.8" />
      </g>
    </svg>
  );
}

export function RaitaMitraLogoFull({
  className = '',
  width = '100%',
  height = '100%',
  highContrast = false,
  theme = 'light'
}: LogoProps) {
  // Theme-sensitive text and line colors
  const isDarkBg = theme === 'dark';
  const textDark = highContrast ? '#FFFFFF' : (isDarkBg ? '#FFFFFF' : '#000000');
  const textLime = highContrast ? '#FFFFFF' : '#7CB342'; // #8ac53e or #7CB342
  const subtitleColor = highContrast ? '#FFFFFF' : (isDarkBg ? '#FFFFFF' : '#1A1A1A');
  const greenLineColor = highContrast ? '#FFFFFF' : '#7CB342';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 120"
      width={width}
      height={height}
      className={className}
      aria-label="RaitaMitra Logo"
    >
      {/* Emblem Section */}
      <g transform="translate(10, 10)">
        <RaitaMitraLogoIcon width={100} height={100} highContrast={highContrast} />
      </g>

      {/* Text Section */}
      <g>
        {/* Primary Branding Name "RaitaMitra" */}
        <text
          x="142"
          y="72"
          fontFamily="Georgia, Cambria, 'Times New Roman', Times, serif"
          fontWeight="bold"
          fontSize="66"
          letterSpacing="-0.02em"
        >
          <tspan fill={textDark}>Raita</tspan>
          <tspan fill={textLime} fontWeight="500">Mitra</tspan>
        </text>

        {/* Subtitle "Social Trust®" centered with flanking green lines */}
        {/* We use text-anchor="middle" to center it at x=320 */}
        <text
          x="320"
          y="102"
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="bold"
          fontSize="18.5"
          letterSpacing="0.28em"
          fill={subtitleColor}
          textAnchor="middle"
        >
          Social Trust®
        </text>

        {/* Flanking Horizontal Lines */}
        <line
          x1="145"
          y1="96"
          x2="225"
          y2="96"
          stroke={greenLineColor}
          strokeWidth="1.8"
        />
        <line
          x1="415"
          y1="96"
          x2="495"
          y2="96"
          stroke={greenLineColor}
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}
