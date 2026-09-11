const fs = require('fs');
const path = require('path');
const OUT = '/home/user/design-skills-pack/assets/icons/dragon';
fs.mkdirSync(OUT, {recursive: true});

// ---- geometry: profile head (facing right) ----
const PROFILE = `
  <g fill="{MAIN}" stroke="{STROKE}" stroke-width="{SW}" stroke-linejoin="round">
    <path d="M88 52 C78 38 58 24 30 14 C52 30 70 44 78 64 Z"/>
    <path d="M112 48 C108 30 96 12 74 0 C88 18 98 36 100 58 Z"/>
    <path d="M64 116 L38 124 L58 134 Z"/>
    <path d="M54 138 L28 148 L48 158 Z"/>
    <path d="M43 160 L18 172 L38 180 Z"/>
    <path d="M192 92 L185 84 C169 80 152 76 140 69 L129 54 L118 56
             C108 48 92 46 80 52 L62 70 L60 92 L68 112
             C60 128 50 148 38 174
             C58 162 80 146 93 132 C97 128 101 126 105 124 L111 106
             C139 104 167 101 188 98 Z"/>
    <path d="M107 110 C124 131 150 147 178 153 L192 155
             C186 170 160 170 136 160 C112 150 102 136 101 120 Z"/>
  </g>
  <path d="M96 60 L134 66 L130 74 L98 70 Z" fill="{SHADE}"/>
  <path d="M104 70 L124 66 L132 72 L124 78 L106 76 Z" fill="{DARK}"/>
  <path d="M109 71 L123 69 L127 72 L122 75 L110 74 Z" fill="{EYE}"/>
  <rect x="116" y="65" width="3" height="13" rx="1.4" fill="{DARK}"/>
  <path d="M176 88 C182 87 185 89 184 93 C180 92 177 90 176 88 Z" fill="{DARK}"/>
  <g fill="{TEETH}">
    <path d="M180 100 L176 115 L170 100 Z"/><path d="M159 102 L154 116 L148 102 Z"/>
    <path d="M137 104 L132 116 L126 103 Z"/><path d="M176 151 L172 138 L164 147 Z"/>
    <path d="M152 143 L148 129 L139 138 Z"/><path d="M127 127 L123 114 L115 122 Z"/>
  </g>`;

// ---- geometry: front mask (symmetric) ----
const MASK = `
  <g fill="{MAIN}" stroke="{STROKE}" stroke-width="{SW}" stroke-linejoin="round">
    <g id="h">
      <path d="M124 52 C140 40 158 26 178 8 C170 30 156 50 140 64 Z"/>
      <path d="M148 82 C166 78 182 84 196 96 C178 94 164 98 152 106 Z"/>
      <path d="M150 110 C168 112 182 122 192 138 C176 130 162 130 148 134 Z"/>
      <path d="M100 44 L128 54 L146 74 L150 98 L138 120 L118 136 L100 142 Z"/>
      <path d="M107 68 L145 76 L149 90 L111 83 Z"/>
      <path d="M121 130 C150 146 178 140 197 116 C182 148 148 154 118 137 Z"/>
    </g>
    <use href="#h" transform="matrix(-1 0 0 1 200.7 0)"/>
    <path d="M100 110 L122 118 L126 138 L112 150 L100 152 L88 150 L74 138 L78 118 Z"/>
  </g>
  <path d="M112 92 L138 86 L146 93 L136 100 L114 99 Z" fill="{DARK}"/>
  <path d="M88 92 L62 86 L54 93 L64 100 L86 99 Z" fill="{DARK}"/>
  <path d="M117 93 L136 89 L140 93 L134 97 L118 96 Z" fill="{EYE}"/>
  <path d="M83 93 L64 89 L60 93 L66 97 L82 96 Z" fill="{EYE}"/>
  <rect x="126" y="86" width="3" height="12" rx="1.4" fill="{DARK}"/>
  <rect x="71" y="86" width="3" height="12" rx="1.4" fill="{DARK}"/>
  <g fill="{DARK}">
    <ellipse cx="110" cy="126" rx="3.5" ry="2.6" transform="rotate(18 110 126)"/>
    <ellipse cx="90" cy="126" rx="3.5" ry="2.6" transform="rotate(-18 90 126)"/>
    <path d="M86 140 C94 144 106 144 114 140 C106 148 94 148 86 140 Z"/>
  </g>
  <g fill="{TEETH}"><path d="M108 143 L106 152 L103 143 Z"/><path d="M92 143 L94 152 L97 143 Z"/></g>`;

const P = {
  oro:    {BG:'#0d0d0f', MAIN:'#e8c14a', SHADE:'#c79f2c', DARK:'#0d0d0f', EYE:'#ff5a2b', TEETH:'#ffffff'},
  jade:   {BG:'#061813', MAIN:'#42d392', SHADE:'#2fae75', DARK:'#061813', EYE:'#fbbf24', TEETH:'#ecfdf5'},
  carmin: {BG:'#150709', MAIN:'#ef4444', SHADE:'#c32f2f', DARK:'#150709', EYE:'#fbbf24', TEETH:'#ffffff'},
  hueso:  {BG:'#f2eee4', MAIN:'#17181a', SHADE:'#2e3033', DARK:'#f2eee4', EYE:'#d9432b', TEETH:'#f2eee4'},
  hielo:  {BG:'#081726', MAIN:'#7dd3fc', SHADE:'#4aa8d8', DARK:'#081726', EYE:'#f8fafc', TEETH:'#f0f9ff'},
};

function svg(geo, pal, {scale=0.88, mono=false}={}) {
  const c = mono
    ? {...pal, MAIN:'none', STROKE:pal.MAIN, SW:'3.4', DARK:'none', TEETH:'none', SHADE:'none', EYE:pal.EYE}
    : {...pal, STROKE:'none', SW:'0'};
  let body = geo;
  for (const k of Object.keys(c)) body = body.split('{'+k+'}').join(c[k]);
  const o = 100 * (1 - scale);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="1000" height="1000">
  <rect width="200" height="200" fill="${pal.BG}"/>
  <g transform="translate(${o} ${o}) scale(${scale})">${body}
  </g>
</svg>`;
}

const variants = [
  ['perfil-oro',    PROFILE, P.oro,    {}],
  ['perfil-jade',   PROFILE, P.jade,   {}],
  ['perfil-carmin', PROFILE, P.carmin, {}],
  ['mascara-oro',   MASK,    P.oro,    {}],
  ['mascara-jade',  MASK,    P.jade,   {}],
  ['mascara-carmin',MASK,    P.carmin, {}],
  ['mascara-hueso', MASK,    P.hueso,  {}],
  ['mascara-hielo', MASK,    P.hielo,  {}],
];
for (const [name, geo, pal, opt] of variants) {
  fs.writeFileSync(path.join(OUT, name + '.svg'), svg(geo, pal, opt));
}
console.log('svgs:', variants.length);

// contact sheet
const cells = variants.map(([n]) =>
  `<figure><div class="c"><img src="${OUT}/${n}.svg"></div><figcaption>${n}</figcaption></figure>`).join('');
fs.writeFileSync('/tmp/claude-0/-home-user-design-skills-pack/83168543-adcf-568b-b0bc-71163c4ec0ca/scratchpad/render/sheet.html',
`<style>body{margin:0;background:#3a3a3e;font:13px system-ui;color:#eee;padding:18px}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
figure{margin:0;text-align:center}.c{border-radius:50%;overflow:hidden;aspect-ratio:1}
img{width:100%;display:block}figcaption{margin-top:6px;opacity:.8}</style><div class="g">${cells}</div>`);
