/* Shared engine: GSAP drives the timeline; helpers keep every clip a seamless 15 s loop. */
const W=1920,H=1080,DUR=15000,DURS=DUR/1000,TAU=Math.PI*2;
const cv=document.getElementById('c');let ctx=cv.getContext('2d',{alpha:false}),S=1;
gsap.ticker.lagSmoothing(0);
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const lerp=(a,b,t)=>a+(b-a)*t,fr=x=>x-Math.floor(x),clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),sm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const wrap=(x,m)=>((x%m)+m)%m,pick=(R,a)=>a[(R()*a.length)|0];
const mixc=(a,b,t)=>[lerp(a[0],b[0],t)|0,lerp(a[1],b[1],t)|0,lerp(a[2],b[2],t)|0];
const rgba=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
const hsl=(h,s=100,l=60,a=1)=>`hsla(${h},${s}%,${l}%,${a})`;
/* ---------- sprites (cached) ---------- */
const _sc={};
function mk(size,fn){const k=document.createElement('canvas');k.width=k.height=size;fn(k.getContext('2d'),size/2,size);return k}
/* hot glow with white core */
const spr=(c,size=64,core=1)=>{const key='g'+c.join()+size+core;return _sc[key]||(_sc[key]=mk(size,(x,h)=>{const [r,g,b]=c,up=v=>Math.min(255,v+60),gr=x.createRadialGradient(h,h,0,h,h,h);
  gr.addColorStop(0,`rgba(255,255,255,${core})`);gr.addColorStop(.12,`rgba(${up(r)},${up(g)},${up(b)},.95)`);gr.addColorStop(.3,`rgba(${r},${g},${b},.38)`);gr.addColorStop(.62,`rgba(${r},${g},${b},.07)`);gr.addColorStop(1,`rgba(${r},${g},${b},0)`);x.fillStyle=gr;x.fillRect(0,0,2*h,2*h)}))};
/* soft blob, no hot core */
const blob=(c,size=256)=>{const key='b'+c.join()+size;return _sc[key]||(_sc[key]=mk(size,(x,h)=>{const gr=x.createRadialGradient(h,h,0,h,h,h);
  gr.addColorStop(0,rgba(c,.9));gr.addColorStop(.4,rgba(c,.5));gr.addColorStop(.75,rgba(c,.14));gr.addColorStop(1,rgba(c,0));x.fillStyle=gr;x.fillRect(0,0,2*h,2*h)}))};
/* camera-lens bokeh disc: soft body + brighter rim */
const bokeh=(c,size=128)=>{const key='k'+c.join()+size;return _sc[key]||(_sc[key]=mk(size,(x,h)=>{const gr=x.createRadialGradient(h,h,0,h,h,h),up=v=>Math.min(255,v+70);
  gr.addColorStop(0,rgba(c,.32));gr.addColorStop(.72,rgba(c,.42));gr.addColorStop(.9,`rgba(${up(c[0])},${up(c[1])},${up(c[2])},.85)`);gr.addColorStop(.97,rgba(c,.25));gr.addColorStop(1,rgba(c,0));x.fillStyle=gr;x.fillRect(0,0,2*h,2*h)}))};
/* ---------- canvas helpers ---------- */
function clear(col='#000'){ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle=col;ctx.fillRect(0,0,W,H);ctx.shadowBlur=0;ctx.shadowColor='transparent';ctx.setLineDash([]);ctx.lineCap='butt';ctx.lineJoin='miter'}
function fillRad(cx,cy,r,stops){const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);stops.forEach(([o,c])=>g.addColorStop(o,c));ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
function fillLin(x0,y0,x1,y1,stops,r=[0,0,W,H]){const g=ctx.createLinearGradient(x0,y0,x1,y1);stops.forEach(([o,c])=>g.addColorStop(o,c));ctx.fillStyle=g;ctx.fillRect(...r)}
const put=(img,x,y,r,a)=>{ctx.globalAlpha=a;ctx.drawImage(img,x-r,y-r,r*2,r*2)};
function spark(x,y,r,a,rot=0,col='#fff'){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,-r);ctx.quadraticCurveTo(r*.07,-r*.07,r,0);ctx.quadraticCurveTo(r*.07,r*.07,0,r);ctx.quadraticCurveTo(-r*.07,r*.07,-r,0);ctx.quadraticCurveTo(-r*.07,-r*.07,0,-r);ctx.fill();ctx.restore()}
function star5(r,ri){ctx.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?ri:r;ctx[i?'lineTo':'moveTo'](Math.cos(a)*rr,Math.sin(a)*rr)}ctx.closePath()}
function heart(x,y,s){ctx.beginPath();ctx.moveTo(x,y+s*.3);ctx.bezierCurveTo(x,y-s*.1,x-s*.6,y-s*.1,x-s*.6,y+s*.3);ctx.bezierCurveTo(x-s*.6,y+s*.65,x-s*.2,y+s*.85,x,y+s);ctx.bezierCurveTo(x+s*.2,y+s*.85,x+s*.6,y+s*.65,x+s*.6,y+s*.3);ctx.bezierCurveTo(x+s*.6,y-s*.1,x,y-s*.1,x,y+s*.3);ctx.closePath()}
function hex(x,y,r,rot=Math.PI/6){ctx.beginPath();for(let i=0;i<6;i++){const a=rot+i*TAU/6;ctx[i?'lineTo':'moveTo'](x+Math.cos(a)*r,y+Math.sin(a)*r)}ctx.closePath()}
/* ---------- GSAP timeline + loop helpers ---------- */
let tl,draw;const C={};
const now=()=>tl.time()*1000,U=()=>tl.time()/DURS;            /* U() runs 0..1 over the clip; use integer multiples for seamless loops */
const newTL=()=>{tl=gsap.timeline({paused:true,defaults:{ease:'none'}});tl.to({},{duration:DURS},0);return tl};
/* yoyo oscillator on one object. period must divide 15 s (15, 7.5, 5, 3, 2.5, 1.5...) so the clip loops cleanly */
function osc(t,props,period=DURS,ease='sine.inOut'){const a={},b={};for(const k in props){a[k]=props[k][0];b[k]=props[k][1]}
  const h=period/2;tl.fromTo(t,a,{...b,duration:h,ease,yoyo:true,repeat:Math.round(DURS/h)-1},0)}
/* the same on many objects with random start delays; each object ends back on its start value before 15 s */
function pulseEach(arr,props,half,spread,R,ease='sine.inOut',jit=.3){const a={},b={};for(const k in props){a[k]=props[k][0];b[k]=props[k][1]}
  for(const o of arr){const d=half*(1+(R()*2-1)*jit),dl=R()*spread,n=Math.max(1,Math.floor((DURS-dl)/(2*d)));tl.fromTo(o,{...a},{...b,duration:d,ease,yoyo:true,repeat:2*n-1},dl)}}
const twinkle=(arr,half,spread,R,peak=1,prop='tw')=>pulseEach(arr,{[prop]:[0,peak]},half,spread,R);
