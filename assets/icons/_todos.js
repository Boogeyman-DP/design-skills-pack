const fs=require('fs');
const G=[
 {t:'1 · Máscara angular y perfil', s:'primer set — formas planas, geométrico',
  d:'dragon', n:['mascara-oro','mascara-jade','mascara-carmin','mascara-hueso','mascara-hielo','perfil-oro','perfil-jade','perfil-carmin']},
 {t:'2 · Máscara negra "mala"', s:'de frente, cejas en V, colmillos, planos internos',
  d:'dragon-negro', n:['negro-hueso','negro-total','negro-brasa','negro-veneno','negro-oro','negro-sangre']},
 {t:'3 · Oriental caligráfico', s:'trazo de tinta, cuerpo serpenteante, líneas en negativo',
  d:'dragon-oriental', n:['oriental-tinta','oriental-noche','oriental-oro','oriental-sangre','oriental-jade','oriental-brasa']},
];
const sec=g=>`<section><h2>${g.t}</h2><p>${g.s}</p><div class=g>`+
 g.n.map(n=>`<figure><div class=c><img src="${g.d}/${n}.svg"></div>
   <figcaption><b>${n.replace(/^(mascara|perfil|negro|oriental)-/,'')}</b><span>${g.d}/${n}</span></figcaption></figure>`).join('')+
 `</div></section>`;
fs.writeFileSync('/home/user/design-skills-pack/assets/icons/_todos.html',
`<style>
body{margin:0;background:#2f3033;color:#eceae6;font:14px/1.5 system-ui,sans-serif;padding:28px 30px 34px}
h1{font-size:22px;margin:0 0 4px}h1+p{margin:0 0 26px;color:#a8a7a3;font-size:14px}
section{margin-bottom:30px}h2{font-size:15px;margin:0 0 2px;letter-spacing:.01em}
section>p{margin:0 0 14px;color:#a8a7a3;font-size:12.5px}
.g{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}
figure{margin:0;text-align:center}
.c{border-radius:50%;overflow:hidden;aspect-ratio:1;background:#000}
img{width:100%;display:block}
figcaption{margin-top:7px;font-size:11.5px;line-height:1.35}
figcaption b{display:block;font-weight:600}
figcaption span{color:#8e8d8a;font-size:10px}
</style>
<h1>Dragones — 20 diseños</h1>
<p>Todos recortados en círculo, que es como los mostrará WhatsApp.</p>`+G.map(sec).join(''));

// same thing at real profile-icon size
fs.writeFileSync('/home/user/design-skills-pack/assets/icons/_todos-small.html',
`<style>body{margin:0;background:#2f3033;color:#eceae6;font:12px system-ui;padding:22px 26px}
h2{font-size:13px;margin:0 0 9px;font-weight:600}section{margin-bottom:18px}
.r{display:flex;gap:20px;align-items:flex-end}figure{margin:0;text-align:center}
.c{border-radius:50%;overflow:hidden;width:48px;height:48px}img{width:100%;display:block}
figcaption{margin-top:6px;font-size:10.5px;color:#b8b7b4}</style>
<h2 style="font-size:15px;margin-bottom:14px">Los mismos a 48 px — tamaño real en la lista de chats</h2>`+
G.map(g=>`<section><h2>${g.t}</h2><div class=r>`+
 g.n.map(n=>`<figure><div class=c><img src="${g.d}/${n}.svg"></div><figcaption>${n.replace(/^(mascara|perfil|negro|oriental)-/,'')}</figcaption></figure>`).join('')+
 `</div></section>`).join(''));
console.log('ok');
