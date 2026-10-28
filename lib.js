/* Shared helpers. GSAP drives time: every concept builds one paused GSAP timeline, the renderer seeks it frame by frame.
   LOOP RULE: every cyclic motion uses a whole number of cycles per DUR, so frame 15.0s == frame 0s (seamless loop). */
const W=1920,H=1080,DUR=15,FPS=30,TAU=Math.PI*2;
gsap.registerPlugin(MotionPathPlugin);
const cv=document.getElementById('c');let ctx=cv.getContext('2d',{alpha:false}),S=1;
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const lerp=(a,b,t)=>a+(b-a)*t,fr=x=>x-Math.floor(x),clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),mod=(x,n)=>((x%n)+n)%n;
const sm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const mixc=(a,b,t)=>[lerp(a[0],b[0],t)|0,lerp(a[1],b[1],t)|0,lerp(a[2],b[2],t)|0];
const rgba=(c,a)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const hsl=(h,s=100,l=60,a=1)=>`hsla(${h},${s}%,${l}%,${a})`;
const sn=(n,ph,p=0)=>Math.sin(TAU*(n*ph+p));            /* periodic sine: n whole cycles per clip */
const pick=(R,a)=>a[Math.floor(R()*a.length)];
/* sprites: pre-rendered glow / soft dot / bokeh discs, cached by colour+size */
const _sc={};const mk=(key,size,fn)=>{if(_sc[key])return _sc[key];const k=document.createElement('canvas');k.width=k.height=size;fn(k.getContext('2d'),size/2);return _sc[key]=k};
const spr=(c,size=64,core=1)=>mk('g'+c.join()+size+core,size,(x,h)=>{const [r,g,b]=c,up=v=>Math.min(255,v+60),gr=x.createRadialGradient(h,h,0,h,h,h);
  gr.addColorStop(0,`rgba(255,255,255,${core})`);gr.addColorStop(.12,`rgba(${up(r)},${up(g)},${up(b)},.95)`);gr.addColorStop(.3,`rgba(${r},${g},${b},.38)`);gr.addColorStop(.62,`rgba(${r},${g},${b},.07)`);gr.addColorStop(1,`rgba(${r},${g},${b},0)`);x.fillStyle=gr;x.fillRect(0,0,2*h,2*h)});
const sd=(c,size=64)=>mk('s'+c.join()+size,size,(x,h)=>{const gr=x.createRadialGradient(h,h,0,h,h,h);gr.addColorStop(0,rgba(c,1));gr.addColorStop(.4,rgba(c,.55));gr.addColorStop(1,rgba(c,0));x.fillStyle=gr;x.fillRect(0,0,2*h,2*h)});
const bk=(c,size=128)=>mk('b'+c.join()+size,size,(x,h)=>{const gr=x.createRadialGradient(h,h,0,h,h,h);gr.addColorStop(0,rgba(c,.42));gr.addColorStop(.8,rgba(c,.55));gr.addColorStop(.92,rgba(c,.95));gr.addColorStop(.97,rgba(c,.6));gr.addColorStop(1,rgba(c,0));x.fillStyle=gr;x.fillRect(0,0,2*h,2*h)});
const put=(img,x,y,r,a)=>{ctx.globalAlpha=a;ctx.drawImage(img,x-r,y-r,r*2,r*2)};
function clear(){ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ctx.shadowBlur=0;ctx.setLineDash([]);ctx.lineCap='butt'}
const add=()=>{ctx.globalCompositeOperation='lighter'},nrm=()=>{ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1};
function flare(x,y,r,a,col='#fff'){ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+r*.07,y-r*.07,x+r,y);ctx.quadraticCurveTo(x+r*.07,y+r*.07,x,y+r);ctx.quadraticCurveTo(x-r*.07,y+r*.07,x-r,y);ctx.quadraticCurveTo(x-r*.07,y-r*.07,x,y-r);ctx.fill()}
/* value-noise + fbm (used to paint smoke textures) */
const _h=(x,y)=>{let n=Math.imul(x,374761393)+Math.imul(y,668265263)|0;n=Math.imul(n^n>>>13,1274126177);return((n^n>>>16)>>>0)/4294967296};
const vn=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);return lerp(lerp(_h(xi,yi),_h(xi+1,yi),u),lerp(_h(xi,yi+1),_h(xi+1,yi+1),u),v)};
const fbm=(x,y,o=5)=>{let s=0,a=.5;for(let i=0;i<o;i++){s+=a*vn(x,y);const nx=(x*.8-y*.6)*2.03+13.7,ny=(x*.6+y*.8)*2.03-7.3;x=nx;y=ny;a*=.5}return s};
/* timeline: one paused GSAP timeline per clip; clk.t just makes the timeline exactly DUR long */
let tl,draw;const C={},clk={t:0};
const newTL=()=>{if(tl)tl.kill();tl=gsap.timeline({paused:true,defaults:{ease:'none'}});tl.fromTo(clk,{t:0},{t:DUR,duration:DUR},0);return tl};
const T=()=>tl.time(),PH=()=>tl.time()/DUR;
