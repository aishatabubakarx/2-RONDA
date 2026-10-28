/* ===== 16  UNDERWATER CAUSTIC LIGHT + RISING BUBBLES ===== */
C[16]=()=>{const R=rng(1616);newTL();const sw={a:0};osc(sw,{a:[-.1,.1]},15);
  const cw=240,ch=135,oc=document.createElement('canvas');oc.width=cw;oc.height=ch;const ox=oc.getContext('2d'),id=ox.createImageData(cw,ch),d=id.data;
  const bub=[],pl=[];for(let i=0;i<80;i++)bub.push({x:R()*W,r:3+R()*15,k:1+(R()<.4?1:0),o:R(),ks:1+(R()*3|0),o2:R()*TAU});
  for(let i=0;i<240;i++)pl.push({x:R()*W,y:R()*H,s:1+R()*2.5,k:1+(R()*3|0),o:R()*TAU,o2:R()});
  
  draw=()=>{clear();const u=U(),t=TAU*u;fillLin(0,0,0,H,[[0,'#0b8aa4'],[.4,'#065170'],[1,'#02142a']]);
    const K=[1,-1,2,-2,1],tt=K.map(k=>t*k+23);
    for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const px=((x/cw*TAU*3)%TAU)-250,py=((y/ch*TAU*1.7)%TAU)-250;let ix=px,iy=py,c=1;
      for(let n=0;n<5;n++){const q=tt[n];const jx=px+Math.cos(q-ix)+Math.sin(q+iy),jy=py+Math.sin(q-iy)+Math.cos(q+ix);ix=jx;iy=jy;c+=1/Math.hypot(px/(Math.sin(ix+q)/.005),py/(Math.cos(iy+q)/.005))}
      c/=5;c=1.17-Math.pow(c,1.4);const v=Math.pow(Math.abs(c),8),f=Math.min(1,v*1.3)*(1.15-y/ch*.7),i=(y*cw+x)*4;d[i]=185;d[i+1]=255;d[i+2]=255;d[i+3]=Math.min(255,f*255)}
    ox.putImageData(id,0,0);ctx.globalCompositeOperation='lighter';ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.globalAlpha=.85;ctx.drawImage(oc,0,0,W,H);
    for(let i=0;i<7;i++){const x0=W*(i+.5)/7-100,sl=(.3+sw.a+.05*Math.sin(i*2))*H,g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(170,255,255,.2)');g.addColorStop(1,'rgba(170,255,255,0)');ctx.globalAlpha=.55+.3*Math.sin(i*1.7);ctx.fillStyle=g;
      ctx.beginPath();ctx.moveTo(x0,-40);ctx.lineTo(x0+90,-40);ctx.lineTo(x0+90+sl+220,H);ctx.lineTo(x0+sl,H);ctx.fill()}
    for(const p of pl){const y=wrap(p.y-u*H*.5*p.k*2,H),f=.5+.5*Math.sin(TAU*p.k*u+p.o);put(spr([200,255,255],16),p.x+Math.sin(TAU*u+p.o)*26,y,p.s*(1+f),.12+.4*f)}
    for(const b of bub){const y=H+30-fr(b.k*u+b.o)*(H+60),x=b.x+Math.sin(TAU*b.ks*u+b.o2)*24;ctx.globalAlpha=.7;ctx.strokeStyle='rgba(210,255,255,.9)';ctx.lineWidth=1.8;ctx.beginPath();ctx.arc(x,y,b.r,0,TAU);ctx.stroke();ctx.globalAlpha=.07;ctx.fillStyle='#bff';ctx.fill();put(spr([255,255,255],32),x-b.r*.35,y-b.r*.35,b.r*.35,.9)}
    ctx.globalAlpha=1};
};
/* ===== 17  SOFT FALLING SNOW + ICE SPARKLE WINTER NIGHT ===== */
C[17]=()=>{const R=rng(1717);newTL();const Wd={x:0};osc(Wd,{x:[-90,90]},15);
  const far=[],mid=[],near=[],sp=[],bk=[];
  for(let i=0;i<700;i++)far.push({x:R()*W,y:R()*H,s:1+R()*1.7,o:R()*TAU,ks:1+(R()*2|0),a:.3+R()*.45});
  for(let i=0;i<130;i++)mid.push({x:R()*W,y:R()*H,r:7+R()*13,o:R()*TAU,ks:1+(R()*3|0),rk:(R()<.5?-1:1)*(1+(R()*2|0)),r0:R()*TAU,a:.6+R()*.4});
  for(let i=0;i<46;i++)near.push({x:R()*W,y:R()*H,r:30+R()*62,o:R()*TAU,ks:1+(R()*2|0),a:.1+R()*.2});
  for(let i=0;i<46;i++)sp.push({x:R()*W,y:R()*H,r:6+R()*12,tw:0});
  for(let i=0;i<14;i++)bk.push({x:R()*W,y:H*(.3+R()*.6),r:40+R()*70,c:R()<.6?[110,170,255]:[255,200,120],a:.06+R()*.1,tw:0});
  twinkle(sp,1.1,7,R);twinkle(bk,3,6,R);
  const Hw=H+160,wx=W+200,flake=(r)=>{ctx.beginPath();for(let i=0;i<6;i++){ctx.save();ctx.rotate(i*Math.PI/3);ctx.moveTo(0,0);ctx.lineTo(0,-r);ctx.moveTo(0,-r*.55);ctx.lineTo(r*.3,-r*.82);ctx.moveTo(0,-r*.55);ctx.lineTo(-r*.3,-r*.82);ctx.restore()}};
  draw=()=>{clear('#030816');const u=U();fillLin(0,0,0,H,[[0,'#030816'],[.55,'#0a1d3d'],[1,'#1b4a78']]);
    ctx.globalCompositeOperation='lighter';put(spr([150,190,255],512),W*.8,H*.14,420,.4);for(const b of bk)put(bokeh(b.c,128),b.x,b.y,b.r,b.a*(.3+.7*b.tw));
    for(const f of far){const y=wrap(f.y+u*Hw,Hw)-80,x=wrap(f.x+Math.sin(TAU*f.ks*u+f.o)*14+Wd.x*.3,wx)-100;put(spr([235,245,255],16),x,y,f.s*1.5,f.a)}
    ctx.globalCompositeOperation='source-over';ctx.lineCap='round';
    for(const f of mid){const y=wrap(f.y+u*Hw*2,Hw)-80,x=wrap(f.x+Math.sin(TAU*f.ks*u+f.o)*30+Wd.x*.7,wx)-100;ctx.save();ctx.translate(x,y);ctx.rotate(f.r0+TAU*u*f.rk);ctx.globalAlpha=f.a;ctx.strokeStyle='#f2f8ff';ctx.lineWidth=1.6;flake(f.r);ctx.stroke();ctx.restore()}
    ctx.globalCompositeOperation='lighter';
    for(const s of sp)if(s.tw>.01)spark(s.x,s.y,s.r*(.5+s.tw),s.tw*.85,0,'#cfe6ff');
    for(const f of near){const y=wrap(f.y+u*Hw*3,Hw)-80,x=wrap(f.x+Math.sin(TAU*f.ks*u+f.o)*50+Wd.x*1.3,wx)-100;put(spr([220,235,255],128,.5),x,y,f.r,f.a)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';fillLin(0,H*.78,0,H,[[0,'rgba(170,210,255,0)'],[1,'rgba(170,210,255,.22)']],[0,H*.78,W,H*.22])};
};
/* ===== 18  ROMANTIC FLOATING HEARTS + PINK BOKEH ===== */
C[18]=()=>{const R=rng(1818);newTL();const HB={k:1};
  tl.to(HB,{keyframes:[{k:1.13,duration:.12,ease:'power2.out'},{k:1,duration:.14,ease:'power2.in'},{k:1.08,duration:.1,ease:'power2.out'},{k:1,duration:.5,ease:'power2.inOut'},{k:1,duration:.64}],repeat:9},0);
  const he=[],bk=[],sp=[],cols=[[255,170,200],[255,80,140],[255,255,255],[255,120,170],[230,60,110]];
  for(let i=0;i<48;i++){const z=R();he.push({x:R()*W,s:36+z*z*130,k:1+(z>.7?1:0),o:R(),ks:1+(R()*3|0),o2:R()*TAU,c:pick(R,cols),z,rk:1+(R()*2|0),ph:R()*TAU,a:.5+z*.4})}
  he.sort((a,b)=>a.s-b.s);
  for(let i=0;i<70;i++)bk.push({x:R()*W,y:R()*H,r:24+R()*90,k:1,o:R()*TAU,c:pick(R,[[255,100,160],[255,150,190],[255,70,120],[255,190,210]]),tw:0});
  for(let i=0;i<90;i++)sp.push({x:R()*W,y:R()*H,r:6+R()*12,tw:0});
  twinkle(bk,2.2,7,R);twinkle(sp,1,7,R);
  draw=()=>{clear('#14000a');const u=U();fillRad(W/2,H*.55,W*.85,[[0,'rgba(120,10,60,.7)'],[.6,'rgba(50,0,28,.5)'],[1,'rgba(0,0,0,0)']]);ctx.globalCompositeOperation='lighter';
    const Hw=H+400;for(const b of bk)put(bokeh(b.c,128),b.x+Math.sin(TAU*u+b.o)*20,wrap(b.y-u*Hw,Hw)-200,b.r,.1+.32*b.tw);
    ctx.save();ctx.translate(W/2,H/2);ctx.scale(HB.k,HB.k);ctx.strokeStyle='rgba(255,120,180,.25)';ctx.lineWidth=5;heart(0,-230,440);ctx.stroke();put(spr([255,60,140],512),0,0,420,.2);ctx.restore();
    for(const h of he){const y=wrap(h.o*Hw-u*Hw*h.k,Hw)-200,x=h.x+Math.sin(TAU*h.ks*u+h.o2)*34,rot=Math.sin(TAU*h.rk*u+h.ph)*.3,s=h.s*HB.k;
      ctx.globalCompositeOperation='lighter';put(spr(h.c,128,.2),x,y,s*1.1,.28*h.a);
      ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalCompositeOperation='source-over';const g=ctx.createLinearGradient(0,-s*.5,0,s*.6);g.addColorStop(0,rgba(mixc(h.c,[255,255,255],.4),.75*h.a));g.addColorStop(1,rgba(h.c,.4*h.a));
      ctx.fillStyle=g;heart(0,-s*.45,s);ctx.fill();ctx.strokeStyle=`rgba(255,255,255,${.55*h.a})`;ctx.lineWidth=2;ctx.stroke();ctx.fillStyle=`rgba(255,255,255,${.5*h.a})`;ctx.beginPath();ctx.ellipse(-s*.27,-s*.2,s*.09,s*.17,-.6,0,TAU);ctx.fill();ctx.restore()}
    ctx.globalCompositeOperation='lighter';for(const s of sp)if(s.tw>.01)spark(s.x,s.y,s.r*(.5+s.tw),s.tw*.9,Math.PI/4*s.tw,'#ffd9e8');ctx.globalAlpha=1};
};
/* ===== 19  RISING FIRE EMBERS AND SPARKS ===== */
C[19]=()=>{const R=rng(1919);newTL();const F={f:1};osc(F,{f:[.8,1.1]},1.5,'sine.inOut');
  const em=[],fl=[],sm_=[];for(let i=0;i<700;i++){const z=R();em.push({x:R()*W,k:1+(z>.7?1:0)+(z>.95?1:0),o:R(),dr:(R()-.5)*520,ks:1+(R()*3|0),o2:R()*TAU,s:3+R()*9*(1+z),kf:2+(R()*8|0),of:R(),big:R()<.06})}
  for(let i=0;i<8;i++)fl.push({x:W*(.08+i*.12)+(R()-.5)*60,w:260+R()*200,h:420+R()*300,k:1+(i%3),o:R()*TAU});
  for(let i=0;i<14;i++)sm_.push({x:R()*W,r:260+R()*260,o:R()});
  const hot=[255,235,170],ora=[255,140,40],red=[210,50,12];
  draw=()=>{clear('#030100');const u=U();ctx.globalCompositeOperation='lighter';
    put(spr([255,90,20],512),W/2,H+80,1250,.75*F.f);ctx.save();ctx.translate(W/2,H+120);ctx.scale(1,.42);ctx.globalAlpha=.9*F.f;ctx.drawImage(spr([255,120,30],512),-1200,-1200,2400,2400);ctx.restore();
    for(const f of fl){const q=.75+.25*Math.sin(TAU*f.k*u+f.o);put(blob([255,95,20],128),f.x+Math.sin(TAU*u*f.k+f.o)*50,H-f.h*.25*q,f.w*.75,.2*q)}
    for(const s of sm_){const y=wrap(H*(.1+s.o*.5)-u*H*.7,H*.7)+H*.05;put(blob([140,30,8],128),s.x+Math.sin(TAU*u+s.o*6)*60,y,s.r,.06)}
    const pos=(e,p)=>[e.x+e.dr*p+Math.sin(TAU*e.ks*u+e.o2)*(20+70*p),H+30-p*(H+120)];
    for(const e of em){const p=fr(e.k*u+e.o),[x,y]=pos(e,p),fl2=.55+.45*Math.sin(TAU*(e.kf*u+e.of)),a=Math.pow(1-p,.9)*sm(0,.05,p)*fl2,c=p<.14?hot:p<.55?ora:red,r=e.s*(1-.55*p);
      if(a<.01)continue;for(let j=1;j<4;j++){const pp=p-j*.006;if(pp<0)break;const [tx,ty]=pos(e,pp);put(spr(c,32),tx,ty,r*(1-j*.2)*2.2,a*(1-j*.28)*.6)}
      put(spr(c,32),x,y,r*2.4,Math.min(1,a));if(e.big)spark(x,y,r*3.4,a*.8,0,'#ffd9a0')}
    ctx.globalAlpha=1};
};
/* ===== 20  COLORFUL GEOMETRIC SHAPES MOTION LOOP (MEMPHIS STYLE) ===== */
C[20]=()=>{const R=rng(2020);newTL();const pal=['#ff5e7e','#ffd23f','#2ec4b6','#8f6bff','#4cc9f0','#f4f1ff'];
  const T={circle:(r)=>{ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.fill()},ring:r=>{ctx.lineWidth=r*.28;ctx.beginPath();ctx.arc(0,0,r*.85,0,TAU);ctx.stroke()},
    tri:r=>{ctx.beginPath();ctx.moveTo(0,-r);ctx.lineTo(r*.87,r*.5);ctx.lineTo(-r*.87,r*.5);ctx.closePath();ctx.fill()},sq:r=>{ctx.lineWidth=r*.24;ctx.lineJoin='round';ctx.strokeRect(-r*.7,-r*.7,r*1.4,r*1.4)},
    plus:r=>{ctx.lineWidth=r*.34;ctx.beginPath();ctx.moveTo(-r*.8,0);ctx.lineTo(r*.8,0);ctx.moveTo(0,-r*.8);ctx.lineTo(0,r*.8);ctx.stroke()},
    squig:r=>{ctx.lineWidth=r*.2;ctx.lineCap='round';ctx.beginPath();for(let i=0;i<=40;i++){const x=-r+i/40*2*r,y=Math.sin(i/40*TAU*1.5)*r*.35;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()},
    dots:r=>{for(let i=0;i<4;i++)for(let j=0;j<4;j++){ctx.beginPath();ctx.arc((i-1.5)*r*.5,(j-1.5)*r*.5,r*.09,0,TAU);ctx.fill()}},
    half:r=>{ctx.beginPath();ctx.arc(0,r*.3,r*.9,Math.PI,TAU);ctx.closePath();ctx.fill()},
    zig:r=>{ctx.lineWidth=r*.2;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();for(let i=0;i<=6;i++){const x=-r+i/6*2*r,y=(i%2?-1:1)*r*.3;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()},
    donut:r=>{ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.arc(0,0,r*.5,0,TAU,true);ctx.fill('evenodd')}};
  const names=Object.keys(T),sh=[],CW=W/8,CH=H/5;
  for(let rw=0;rw<5;rw++)for(let c=0;c<8;c++){const i=rw*8+c,t=names[(rw*3+c*7)%names.length];sh.push({t,x:(c+.5+(R()-.5)*.4)*CW,y:(rw+.5+(R()-.5)*.4)*CH,r:34+R()*34,col:pal[(rw*2+c*5)%pal.length],ax:14+R()*26,ay:14+R()*26,kx:1+(R()*2|0),ky:1+(R()*2|0),ox:R()*TAU,oy:R()*TAU,rk:(R()<.5?-1:1)*(1+(R()*2|0)),r0:R()*TAU,sc:1})}
  pulseEach(sh,{sc:[.86,1.14]},1.2,6,R);
  const cf=[];for(let i=0;i<70;i++)cf.push({x:R()*W,y:R()*H,r:3+R()*6,col:pal[(R()*pal.length)|0],tw:0});twinkle(cf,1.2,7,R,1);
  draw=()=>{clear('#0e1033');const u=U();fillRad(W*.3,H*.3,W*.9,[[0,'rgba(80,50,200,.35)'],[1,'rgba(0,0,0,0)']]);fillRad(W*.75,H*.8,W*.8,[[0,'rgba(255,70,130,.18)'],[1,'rgba(0,0,0,0)']]);
    for(const c of cf){ctx.globalAlpha=.3+.7*c.tw;ctx.fillStyle=c.col;ctx.beginPath();ctx.arc(c.x,c.y,c.r*(.6+.6*c.tw),0,TAU);ctx.fill()}
    ctx.shadowColor='rgba(0,0,0,.4)';ctx.shadowOffsetY=10*S;ctx.shadowBlur=8*S;
    for(const s of sh){ctx.save();ctx.translate(s.x+Math.sin(TAU*s.kx*u+s.ox)*s.ax,s.y+Math.sin(TAU*s.ky*u+s.oy)*s.ay);ctx.rotate(s.r0+TAU*u*s.rk);ctx.scale(s.sc,s.sc);ctx.globalAlpha=1;ctx.fillStyle=s.col;ctx.strokeStyle=s.col;T[s.t](s.r);ctx.restore()}
    ctx.globalAlpha=1;ctx.shadowColor='transparent'};
};
