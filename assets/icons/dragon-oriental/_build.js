const fs=require('fs');
const OUT='/home/user/design-skills-pack/assets/icons/dragon-oriental';

// Catmull-Rom resample
function cr(pts,n=22){
  const P=[pts[0],...pts,pts[pts.length-1]], out=[];
  for(let i=0;i<P.length-3;i++){
    const [a,b,c,d]=[P[i],P[i+1],P[i+2],P[i+3]];
    for(let j=0;j<n;j++){
      const t=j/n,t2=t*t,t3=t2*t;
      out.push([
        .5*(2*b[0]+(-a[0]+c[0])*t+(2*a[0]-5*b[0]+4*c[0]-d[0])*t2+(-a[0]+3*b[0]-3*c[0]+d[0])*t3),
        .5*(2*b[1]+(-a[1]+c[1])*t+(2*a[1]-5*b[1]+4*c[1]-d[1])*t2+(-a[1]+3*b[1]-3*c[1]+d[1])*t3)]);
    }
  }
  out.push(pts.at(-1)); return out;
}
// tapered ribbon -> closed path. w(t) gives width along the stroke.
function ribbon(pts,w){
  const S=cr(pts), L=[], R=[];
  for(let i=0;i<S.length;i++){
    const t=i/(S.length-1);
    const a=S[Math.max(0,i-1)], b=S[Math.min(S.length-1,i+1)];
    let dx=b[0]-a[0], dy=b[1]-a[1]; const m=Math.hypot(dx,dy)||1; dx/=m; dy/=m;
    const h=w(t)/2;
    L.push([S[i][0]-dy*h, S[i][1]+dx*h]);
    R.push([S[i][0]+dy*h, S[i][1]-dx*h]);
  }
  const f=p=>p[0].toFixed(1)+' '+p[1].toFixed(1);
  return 'M'+L.map(f).join('L')+'L'+R.reverse().map(f).join('L')+'Z';
}
const taper=(a,b)=>t=>a+(b-a)*t;                 // linear
const leaf =(a)=>t=>a*Math.sin(Math.PI*Math.min(1,t*1.0))**.7; // fat middle, points at both ends
const spike=(a)=>t=>a*(1-t)**1.6;                 // thick base -> sharp tip

const B='{INK}', W='{PAPER}';
let s='';
const p=(d,f)=>s+=`<path d="${d}" fill="${f}"/>`;
const outlined=(pts,w,core=0.40)=>{p(ribbon(pts,w),B); p(ribbon(pts,t=>w(t)*core),W);};

// ---- serpentine body: stays thick, tapers only at the tail ----
const fat=W0=>t=>W0*(1-Math.pow(t,2.6));
const spine=[[110,92],[148,106],[164,134],[152,166],[116,183],[78,181],[50,168]];
p(ribbon(spine, fat(44)), B);
p(ribbon([[122,102],[152,114],[165,136],[153,161],[120,175],[86,174],[62,164]],
         t=>4.4*(1-Math.pow(t,1.15))), W);
p(ribbon([[132,116],[152,128],[157,146],[142,160],[116,166],[94,164]],
         t=>2.4*(1-Math.pow(t,1.1))), W);

// ---- dorsal mane along the outer edge of the body ----
[[[134,92],[146,76],[152,62]],
 [[156,112],[174,102],[188,96]],
 [[168,140],[188,142],[198,150]],
 [[152,170],[166,184],[172,196]]].forEach(m=>p(ribbon(m, spike(14)), B));

// ---- horns ----
p(ribbon([[104,62],[126,46],[148,34],[170,26]], spike(11)), B);
p(ribbon([[130,41],[144,25],[152,10]], spike(6.5)), B);
p(ribbon([[152,31],[166,20],[178,13]], spike(5)), B);

// ---- head ----
p(`M44 96 C46 88 54 82 64 78 C72 75 79 72 84 66
   C88 58 96 55 104 57 C116 59 124 69 126 82
   C128 94 124 104 116 110 L104 100
   C84 98 60 97 46 100 Z`, B);
p(`M48 112 C60 114 82 114 100 108 L114 116
   C96 126 64 126 44 118 Z`, B);
// mouth interior, then teeth cut out of it in white
p(`M45 99 C64 97 86 98 104 100 L100 109 C80 113 60 113 47 111 Z`, B);
p(`M48 99 L54 110 L60 99 Z M65 99 L69 106 L73 99 Z M80 100 L84 108 L89 100 Z`, W);
p(`M54 111 L58 100 L63 112 Z M70 112 L73 105 L77 112 Z M84 111 L88 102 L92 112 Z`, W);
p(ribbon([[46,98],[39,91],[36,83]], spike(7)), B);
p(ribbon([[140,43],[152,52],[160,64]], spike(6)), B);
p(ribbon([[78,70],[92,64],[104,63]], t=>7*(1-0.5*t)), B);
// eye
p(`M80 68 C88 63 100 63 106 69 C98 75 86 75 80 68 Z`, W);
p(`M87 68 C90 65 96 65 99 68 C96 72 90 72 87 68 Z`, B);
// brow spike + nostril
p(ribbon([[84,62],[97,52],[107,46]], spike(7)), B);
p(`M52 89 C56 87 59 89 58 92 C55 92 53 91 52 89 Z`, W);

// negative-space structure
p(ribbon([[120,66],[128,86],[124,106],[114,118]], t=>3.6*(1-0.45*t)), W);
p(ribbon([[54,86],[70,79],[86,73]], t=>2.6*(1-t)**.8), W);
p(ribbon([[52,120],[70,124],[92,123]], t=>2.4*(1-t)**.8), W);
p(ribbon([[96,64],[108,70],[114,82]], t=>2.4*(1-t)**.9), W);
// ragged spikes on snout and chin
[[[62,124],[58,136],[56,148]],[[86,124],[88,136],[92,146]]]
  .forEach(m=>p(ribbon(m, spike(6)), B));

// ragged edges
[[[58,80],[54,72],[53,65]],[[70,75],[67,67],[67,60]]]
  .forEach(m=>p(ribbon(m, spike(5)), B));

// ---- whiskers ----
outlined([[50,90],[33,77],[20,59],[17,40],[26,26]], t=>7*(1-t)**1.05);
outlined([[46,104],[27,109],[10,102],[1,86],[5,70]], t=>6.4*(1-t)**1.05);
// ---- beard ----
p(ribbon([[52,117],[49,131],[56,144]], spike(8)), B);
p(ribbon([[72,121],[75,137],[86,149]], spike(7.5)), B);
p(ribbon([[90,119],[97,133],[108,143]], spike(6)), B);

const V={
 'oriental-tinta':  {PAPER:'#f4f1e8', INK:'#141414'},
 'oriental-noche':  {PAPER:'#0c0c0e', INK:'#f0ede4'},
 'oriental-oro':    {PAPER:'#0c0c0e', INK:'#d7a93c'},
 'oriental-sangre': {PAPER:'#f4f1e8', INK:'#a41d1d'},
 'oriental-jade':   {PAPER:'#07130f', INK:'#43d392'},
 'oriental-brasa':  {PAPER:'#0c0c0e', INK:'#ff4a1f'},
};
// fit the whole drawing inside the circular crop
const nums=s.match(/-?\d+(?:\.\d+)?/g).map(Number);
let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
for(let i=0;i+1<nums.length;i+=2){
  const x=nums[i],y=nums[i+1];
  if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y;
}
const cx=(x0+x1)/2, cy=(y0+y1)/2, R=92;
let maxd=0;
for(let i=0;i+1<nums.length;i+=2) maxd=Math.max(maxd, Math.hypot(nums[i]-cx, nums[i+1]-cy));
const k=R/maxd, tx=100-k*cx, ty=100-k*cy;
const FIT=`<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${k.toFixed(4)})">`;
console.log('scale',k.toFixed(3));

const names=Object.keys(V);
for(const n of names){
  let b=s; for(const k of Object.keys(V[n])) b=b.split('{'+k+'}').join(V[n][k]);
  fs.writeFileSync(`${OUT}/${n}.svg`,
   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="2048" height="2048"><rect width="200" height="200" fill="${V[n].PAPER}"/>${FIT}${b}</g></svg>`);
}
const card=(x,c)=>`<figure><div class="${c}"><img src="${x}.svg"></div><figcaption>${x.replace('oriental-','')}</figcaption></figure>`;
fs.writeFileSync(OUT+'/_sheet.html','<style>body{margin:0;background:#3a3a3e;font:13px system-ui;color:#eee;padding:18px}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}figure{margin:0;text-align:center}.c{border-radius:50%;overflow:hidden;aspect-ratio:1}img{width:100%;display:block}figcaption{margin-top:6px;opacity:.85}</style><div class=g>'+names.map(n=>card(n,'c')).join('')+'</div>');
fs.writeFileSync(OUT+'/_small.html','<style>body{margin:0;background:#3a3a3e;padding:26px;font:12px system-ui;color:#eee;display:flex;gap:24px;align-items:flex-end}figure{margin:0;text-align:center}.s{border-radius:50%;overflow:hidden;width:48px;height:48px;margin:0 auto}img{width:100%;display:block}figcaption{margin-top:8px;opacity:.8}</style>'+names.map(n=>card(n,'s')).join(''));
console.log('built',names.length);
