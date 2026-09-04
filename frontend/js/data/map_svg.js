/**
 * Bharat Quest - Interactive SVG India Map Definition
 * Precision vector coordinates and metadata for Indian States & Union Territories.
 */

export const INDIA_MAP_SVG = `
<svg viewBox="0 0 700 750" class="w-full h-full max-h-[640px] select-none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="mapShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.12" />
    </filter>
    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <feStop offset="0%" stop-color="#F8FAFC" />
      <feStop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
  </defs>

  <!-- Background Decorative Card Outline -->
  <rect width="700" height="750" rx="20" fill="url(#oceanGrad)" />

  <!-- Surrounding Ocean Ambient Notes -->
  <text x="70" y="560" fill="#94A3B8" font-size="13" font-family="'Cinzel', serif" font-weight="600" letter-spacing="2">ARABIAN SEA</text>
  <text x="510" y="560" fill="#94A3B8" font-size="13" font-family="'Cinzel', serif" font-weight="600" letter-spacing="2">BAY OF BENGAL</text>
  <text x="290" y="730" fill="#94A3B8" font-size="13" font-family="'Cinzel', serif" font-weight="600" letter-spacing="2">INDIAN OCEAN</text>

  <!-- Interactive State Outlines -->
  <g id="india-states-group" filter="url(#mapShadow)">
    
    <!-- JAMMU & KASHMIR & LADAKH -->
    <path id="state-jammu-kashmir" data-slug="jammu-kashmir" data-name="Jammu & Kashmir" class="state-path"
      d="M210,70 L250,50 L310,60 L335,110 L300,140 L260,130 L220,135 L205,100 Z" />
    <text x="260" y="95" class="pointer-events-none fill-slate-500 text-[10px] font-semibold text-anchor-middle">J&K / Ladakh</text>

    <!-- HIMACHAL PRADESH -->
    <path id="state-himachal-pradesh" data-slug="himachal-pradesh" data-name="Himachal Pradesh" class="state-path"
      d="M260,130 L300,140 L315,165 L290,185 L265,170 Z" />

    <!-- PUNJAB -->
    <path id="state-punjab" data-slug="punjab" data-name="Punjab" class="state-path has-games"
      d="M220,135 L260,130 L265,170 L245,190 L210,180 L215,150 Z" />
    <text x="235" y="165" class="pointer-events-none fill-slate-700 text-[11px] font-bold">Punjab</text>

    <!-- UTTARAKHAND -->
    <path id="state-uttarakhand" data-slug="uttarakhand" data-name="Uttarakhand" class="state-path"
      d="M290,185 L315,165 L345,180 L335,215 L300,205 Z" />

    <!-- HARYANA & DELHI -->
    <path id="state-haryana" data-slug="haryana" data-name="Haryana" class="state-path"
      d="M245,190 L275,185 L290,205 L275,230 L240,220 Z" />

    <!-- RAJASTHAN -->
    <path id="state-rajasthan" data-slug="rajasthan" data-name="Rajasthan" class="state-path has-games"
      d="M150,220 L210,180 L245,190 L240,220 L260,260 L230,300 L180,310 L155,270 Z" />
    <text x="185" y="255" class="pointer-events-none fill-slate-800 text-[13px] font-bold">Rajasthan</text>

    <!-- UTTAR PRADESH -->
    <path id="state-uttar-pradesh" data-slug="uttar-pradesh" data-name="Uttar Pradesh" class="state-path"
      d="M275,230 L300,205 L335,215 L400,240 L395,285 L330,285 L280,260 Z" />
    <text x="325" y="250" class="pointer-events-none fill-slate-600 text-[12px] font-semibold">Uttar Pradesh</text>

    <!-- BIHAR -->
    <path id="state-bihar" data-slug="bihar" data-name="Bihar" class="state-path"
      d="M400,240 L460,245 L455,290 L395,285 Z" />
    <text x="415" y="270" class="pointer-events-none fill-slate-600 text-[11px] font-semibold">Bihar</text>

    <!-- GUJARAT -->
    <path id="state-gujarat" data-slug="gujarat" data-name="Gujarat" class="state-path has-games"
      d="M125,320 L180,310 L210,340 L195,380 L140,390 L110,360 Z" />
    <text x="145" y="350" class="pointer-events-none fill-slate-800 text-[12px] font-bold">Gujarat</text>

    <!-- MADHYA PRADESH -->
    <path id="state-madhya-pradesh" data-slug="madhya-pradesh" data-name="Madhya Pradesh" class="state-path"
      d="M210,340 L260,260 L330,285 L360,340 L320,380 L240,375 Z" />
    <text x="270" y="335" class="pointer-events-none fill-slate-600 text-[12px] font-semibold">Madhya Pradesh</text>

    <!-- WEST BENGAL -->
    <path id="state-west-bengal" data-slug="west-bengal" data-name="West Bengal" class="state-path has-games"
      d="M455,290 L480,280 L490,340 L465,360 L450,325 Z" />
    <text x="455" y="325" class="pointer-events-none fill-slate-800 text-[11px] font-bold">W. Bengal</text>

    <!-- JHARKHAND -->
    <path id="state-jharkhand" data-slug="jharkhand" data-name="Jharkhand" class="state-path"
      d="M395,285 L455,290 L450,325 L405,335 Z" />

    <!-- CHHATTISGARH -->
    <path id="state-chhattisgarh" data-slug="chhattisgarh" data-name="Chhattisgarh" class="state-path"
      d="M360,340 L405,335 L395,410 L350,430 L345,380 Z" />

    <!-- ODISHA -->
    <path id="state-odisha" data-slug="odisha" data-name="Odisha" class="state-path has-games"
      d="M405,335 L465,360 L440,425 L395,410 Z" />
    <text x="410" y="380" class="pointer-events-none fill-slate-800 text-[12px] font-bold">Odisha</text>

    <!-- MAHARASHTRA (HIGHLIGHTED PROMINENTLY) -->
    <path id="state-maharashtra" data-slug="maharashtra" data-name="Maharashtra" class="state-path has-games active-state"
      d="M195,380 L240,375 L320,380 L345,380 L350,430 L310,470 L250,470 L210,440 Z" />
    <text x="245" y="425" class="pointer-events-none fill-white text-[15px] font-extrabold tracking-wide drop-shadow">MAHARASHTRA</text>

    <!-- TELANGANA -->
    <path id="state-telangana" data-slug="telangana" data-name="Telangana" class="state-path"
      d="M310,470 L350,430 L370,470 L330,515 L300,500 Z" />
    <text x="320" y="485" class="pointer-events-none fill-slate-600 text-[11px] font-semibold">Telangana</text>

    <!-- ANDHRA PRADESH -->
    <path id="state-andhra-pradesh" data-slug="andhra-pradesh" data-name="Andhra Pradesh" class="state-path"
      d="M370,470 L395,410 L440,425 L385,550 L330,515 Z" />
    <text x="360" y="525" class="pointer-events-none fill-slate-600 text-[11px] font-semibold">Andhra Pradesh</text>

    <!-- GOA -->
    <path id="state-goa" data-slug="goa" data-name="Goa" class="state-path"
      d="M205,480 L215,480 L215,495 L205,495 Z" />

    <!-- KARNATAKA -->
    <path id="state-karnataka" data-slug="karnataka" data-name="Karnataka" class="state-path has-games"
      d="M210,440 L250,470 L300,500 L285,570 L235,560 L215,495 Z" />
    <text x="235" y="520" class="pointer-events-none fill-slate-800 text-[12px] font-bold">Karnataka</text>

    <!-- TAMIL NADU -->
    <path id="state-tamil-nadu" data-slug="tamil-nadu" data-name="Tamil Nadu" class="state-path has-games"
      d="M285,570 L385,550 L350,650 L290,655 L280,600 Z" />
    <text x="305" y="615" class="pointer-events-none fill-slate-800 text-[12px] font-bold">Tamil Nadu</text>

    <!-- KERALA -->
    <path id="state-kerala" data-slug="kerala" data-name="Kerala" class="state-path has-games"
      d="M235,560 L280,600 L290,655 L260,655 L245,600 Z" />
    <text x="245" y="620" class="pointer-events-none fill-slate-800 text-[11px] font-bold">Kerala</text>

    <!-- NORTHEAST STATES (ASSAM, ARUNACHAL, SIKKIM, ETC.) -->
    <path id="state-assam" data-slug="assam" data-name="Assam & Northeast" class="state-path"
      d="M510,240 L560,230 L590,260 L570,300 L510,290 Z" />
    <text x="525" y="270" class="pointer-events-none fill-slate-600 text-[11px] font-semibold">Northeast</text>
  </g>
</svg>
`;
