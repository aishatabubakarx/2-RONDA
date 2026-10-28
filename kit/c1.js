/* ===== 1  GOLDEN STARS + GLOWING GLITTER PATTERN ===== */
C[1]=()=>{const R=rng(11);newTL();const gold=[255,200,80],G={g:1};osc(G,{g:[.75,1]},7.5);
  const st=[],gl=[];
  for(let i=0;i<150;i++){const t=R();st.push({x:R()*W,y:R()*H,r:t<.3?16+R()*18:7+R()*20,five:t<.3,rot:R()*TAU,rk:R()<.5?-1:1,tw:0,sw:R()*TAU})}
  for(let i=0;i<760;i++)gl.push({x:R()*W,y:R()*H,s:1.4+R()*3.2,k:2+(R()*8|0),o:R(),kk:1+(R()*3|0),ks:1+(R()*3|0),o2:R(),c:R()<.25?[255,245,210]:gold})
  twinkle(st,1,7,R);
  draw=()=>{clear();const u=U();
    fillRad(W/2,H/2,W*.75,[[0,rgba([90,55,6],.6*G.g)],[.55,rgba([30,16,2],.5)],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';
    for(const s of st){const y=wrap(s.y+u*H,H),x=s.x+Math.sin(TAU*u+s.sw)*18,e=sm(0,90,y)*sm(0,90,H-y),a=(.3+.7*s.tw)*e,r=s.r*(.6+.5*s.tw);if(a<.01)continue;
      put(spr(gold,128),x,y,r*3.2,a*.55);if(!s.five){spark(x,y,r*1.5,a,s.rot+u*TAU*s.rk*.5,'#ffe9a8');spark(x,y,r*.8,a*.7,s.rot+Math.PI/4,'#fff')}}
    ctx.globalCompositeOperation='source-over';
    for(const s of st){if(!s.five)continue;const y=wrap(s.y+u*H,H),x=s.x+Math.sin(TAU*u+s.sw)*18,e=sm(0,90,y)*sm(0,90,H-y),a=(.35+.65*s.tw)*e,r=s.r*(.75+.35*s.tw);if(a<.01)continue;
      ctx.save();ctx.translate(x,y);ctx.rotate(s.rot+u*TAU*s.rk/5);ctx.globalAlpha=a;const g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#fff8d0');g.addColorStop(.5,'#ffcf4a');g.addColorStop(1,'#b87410');
      ctx.fillStyle=g;ctx.strokeStyle=g;ctx.lineJoin='round';ctx.lineWidth=r*.22;star5(r,r*.5);ctx.fill();ctx.stroke();ctx.restore()}
    ctx.globalCompositeOperation='lighter';
    for(const p of gl){const y=wrap(p.y+u*H*p.kk,H),x=p.x+Math.sin(TAU*(p.ks*u+p.o2))*22,f=Math.pow(Math.max(0,Math.sin(TAU*(p.k*u+p.o))),6),a=.12+.88*f;
      put(spr(p.c,32),x,y,p.s*(1+f*2.2),a*.8)}
    ctx.globalAlpha=1};
};
/* ===== 2  SUN FLARE + GOLDEN DUST + LENS FLARE ===== */
C[2]=()=>{const R=rng(22);newTL();const sun={x:W*.2,y:H*.2,s:.9},warm=[255,196,90];
  osc(sun,{x:[W*.2,W*.36],y:[H*.2,H*.3],s:[.85,1.1]},DURS);
  const dust=[],sts=[],bk=[];
  for(let i=0;i<460;i++)dust.push({x:R()*W,y:R()*H,s:1+R()*3.4,k:2+(R()*8|0),o:R(),kk:1+(R()*2|0),ks:1+(R()*3|0),o2:R(),a:.35+R()*.65});
  for(let i=0;i<80;i++)sts.push({x:R()*W,y:R()*H,r:6+R()*14,tw:0});
  for(let i=0;i<26;i++)bk.push({x:R()*W,y:R()*H,r:30+R()*80,k:1+(R()*2|0),o:R(),a:.12+R()*.22,tw:0});
  twinkle(sts,.9,6,R);twinkle(bk,1.8,5,R);
  const gh=[[.22,70,0,[255,170,60],.2],[.4,38,2,[255,230,160],.28],[.55,120,1,[255,120,40],.16],[.78,56,0,[255,200,110],.22],[1.02,160,2,[255,150,60],.14],[1.28,64,1,[255,230,180],.2]];
  draw=()=>{clear();const u=U(),sx=sun.x,sy=sun.y,s=sun.s;
    fillRad(sx,sy,W*1.15,[[0,'rgba(255,170,60,.6)'],[.16,'rgba(200,95,22,.42)'],[.5,'rgba(60,26,6,.5)'],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';
    /* god rays: 36 spokes, pattern repeats every 6 so a 60 degree turn loops perfectly */
    const rg=ctx.createRadialGradient(sx,sy,0,sx,sy,2300);rg.addColorStop(0,'rgba(255,210,120,.17)');rg.addColorStop(.35,'rgba(255,170,70,.055)');rg.addColorStop(1,'rgba(255,150,50,0)');ctx.fillStyle=rg;
    for(let i=0;i<36;i++){const w=[.5,1,.3,.8,.4,.9][i%6]*.034,a=i/36*TAU+u*TAU/6;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+Math.cos(a-w)*2400,sy+Math.sin(a-w)*2400);ctx.lineTo(sx+Math.cos(a+w)*2400,sy+Math.sin(a+w)*2400);ctx.fill()}
    put(spr(warm,512),sx,sy,620*s,.9);put(spr([255,255,255],256),sx,sy,170*s,.95);
    ctx.save();ctx.translate(sx,sy);ctx.globalAlpha=.7;ctx.drawImage(spr(warm,256),-1300,-26*s,2600,52*s);ctx.globalAlpha=.8;ctx.drawImage(spr([255,255,255],256),-520,-6*s,1040,12*s);ctx.globalAlpha=.25;ctx.drawImage(spr(warm,256),-22*s,-700,44*s,1400);ctx.restore();
    /* lens ghosts on the axis through frame centre */
    const ex=W-sx,ey=H-sy;
    for(const [t,r,ty,c,a] of gh){const x=sx+(ex-sx)*t,y=sy+(ey-sy)*t;ctx.globalAlpha=a*s;
      if(ty===0)ctx.drawImage(spr(c,128,.3),x-r,y-r,r*2,r*2);else if(ty===1){ctx.strokeStyle=rgba(c,.9);ctx.lineWidth=5;ctx.beginPath();ctx.arc(x,y,r*.7,0,TAU);ctx.stroke();ctx.fillStyle=rgba(c,.12);ctx.fill()}
      else{hex(x,y,r*.7);ctx.fillStyle=rgba(c,.5);ctx.fill()}}
    for(const b of bk){const y=wrap(b.y-u*(H+300)*b.k,H+300)-150,a=b.a*(.3+.7*b.tw);put(spr(warm,64,.2),b.x+Math.sin(TAU*u+b.o*6)*40,y,b.r,a)}
    for(const t of sts)if(t.tw>.01){spark(t.x,t.y,t.r*(.6+.9*t.tw),t.tw*.85,0,'#ffe7b0')}
    for(const p of dust){const y=wrap(p.y-u*H*p.kk,H),x=p.x+Math.sin(TAU*(p.ks*u+p.o2))*30,f=Math.pow(Math.max(0,Math.sin(TAU*(p.k*u+p.o))),5),near=.55+.9*Math.exp(-Math.hypot(x-sx,y-sy)/950);
      put(spr(warm,32),x,y,p.s*(1+f*2),Math.min(1,(.18+.82*f)*p.a*near))}
    ctx.globalAlpha=1};
};
/* ===== 3  RED CHRISTMAS BOKEH + GOLD GLITTER ===== */
C[3]=()=>{const R=rng(33);newTL();const cols=[[230,20,40],[255,60,60],[190,0,30],[255,110,70],[255,190,80],[255,40,90]],gold=[255,205,90];
  const bo=[],gl=[],bu=[],sp=[];
  for(let i=0;i<100;i++){const z=R();bo.push({x:R()*W,y:R()*H,r:24+z*z*180+R()*18,c:pick(R,cols),k:z>.6?2:1,ks:1+(R()*2|0),o:R()*TAU,a:.3+R()*.55,tw:0})}
  bo.sort((a,b)=>a.r-b.r);
  for(let i=0;i<560;i++)gl.push({x:R()*W,y:R()*H,s:1.3+R()*3,k:2+(R()*8|0),o:R(),kk:1+(R()*2|0),ks:1+(R()*3|0),o2:R()});
  for(let i=0;i<18;i++)bu.push({t:(i+.5)/18,c:[[255,70,50],[255,205,90],[255,250,220]][i%3],tw:0});
  for(let i=0;i<40;i++)sp.push({x:R()*W,y:R()*H,r:8+R()*16,tw:0});
  twinkle(bo,2,7,R);twinkle(bu,.7,4,R);twinkle(sp,1,7,R);
  const gp=t=>[-60+t*(W+120),70+110*Math.abs(Math.sin(Math.PI*t*3))];
  draw=()=>{clear();const u=U();
    fillRad(W*.5,H*.55,W*.85,[[0,'rgba(125,0,14,.6)'],[.55,'rgba(45,0,6,.5)'],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';const Hw=H+500;
    for(const b of bo){const y=wrap(b.y-u*Hw*b.k,Hw)-250,x=b.x+Math.sin(TAU*b.ks*u+b.o)*36;put(bokeh(b.c,128),x,y,b.r,b.a*(.3+.7*b.tw))}
    /* garland */
    ctx.globalCompositeOperation='source-over';ctx.strokeStyle='rgba(30,0,0,.9)';ctx.lineWidth=4;ctx.beginPath();for(let i=0;i<=120;i++){const [x,y]=gp(i/120);i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke();
    ctx.globalCompositeOperation='lighter';
    for(const b of bu){const [x,y]=gp(b.t),a=.45+.55*b.tw;put(spr(b.c,128),x,y+14,70,a*.8);put(bokeh(b.c,128),x,y+14,44,a*.7);put(spr([255,255,255],32),x,y+14,10,a)}
    for(const s of sp)if(s.tw>.01)spark(s.x,s.y,s.r*(.5+s.tw),s.tw*.9,Math.PI/4*s.tw,'#ffe9b0');
    for(const p of gl){const y=wrap(p.y-u*H*p.kk,H),x=p.x+Math.sin(TAU*(p.ks*u+p.o2))*26,f=Math.pow(Math.max(0,Math.sin(TAU*(p.k*u+p.o))),6);put(spr(gold,32),x,y,p.s*(1+f*2),(.1+.9*f)*.85)}
    ctx.globalAlpha=1};
};
/* ===== 4  NEW YEAR CONFETTI + CHAMPAGNE SPARKLE ===== */
C[4]=()=>{const R=rng(44);newTL();const pal=[[255,214,102],[255,238,176],[228,232,245],[255,150,172],[255,190,60],[170,196,255]];
  const cf=[],bb=[],bu=[],stars=[];
  for(let i=0;i<260;i++){const z=R();cf.push({x:R()*W,y:R()*H,w:18+z*30,h:10+z*16,c:pick(R,pal),kk:1+(z>.55?1:0)+(z>.85?1:0),f:3+(R()*6|0),o:R(),ks:1+(R()*3|0),o2:R()*TAU,r0:R()*TAU,rk:(R()<.5?-1:1)*(1+(R()*2|0))})}
  for(let i=0;i<140;i++)bb.push({x:R()*W,r:4+R()*16,k:1+(R()<.4?1:0),o:R(),ks:1+(R()*3|0),o2:R()*TAU});
  for(let i=0;i<110;i++)stars.push({x:R()*W,y:R()*H*.85,r:3+R()*7,tw:0});
  const T0=[1.4,4.8,8.2,11.6];
  T0.forEach((t,i)=>{const b={p:0,x:W*[.28,.72,.45,.62][i],y:H*[.36,.3,.42,.34][i],pts:[]};for(let j=0;j<90;j++)b.pts.push({a:R()*TAU,v:120+R()*420,g:200+R()*260});bu.push(b);tl.fromTo(b,{p:0},{p:1,duration:3.4,ease:'power2.out'},t)});
  twinkle(stars,1.2,7,R,.8);
  draw=()=>{clear();const u=U();
    fillLin(0,0,0,H,[[0,'#04061a'],[.6,'#0e0524'],[1,'#1c0a2c']]);fillRad(W/2,H*1.05,W*.8,[[0,'rgba(255,190,70,.38)'],[.5,'rgba(120,70,20,.15)'],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';for(const s of stars)if(s.tw>.01)spark(s.x,s.y,s.r*(1+s.tw),s.tw*.55,0,'#cfd8ff');
    for(const b of bb){const y=H+30-fr(b.k*u+b.o)*(H+60),x=b.x+Math.sin(TAU*b.ks*u+b.o2)*22;ctx.globalAlpha=.55;ctx.strokeStyle='rgba(255,240,200,.9)';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,b.r,0,TAU);ctx.stroke();put(spr([255,210,120],32,.2),x-b.r*.3,y-b.r*.3,b.r*.45,.7)}
    for(const b of bu){const p=b.p;if(p<=0||p>=1)continue;if(p<.2)put(spr([255,210,120],256),b.x,b.y,300*(1-p/.2)+40,.8*(1-p/.2));
      for(const q of b.pts){const x=b.x+Math.cos(q.a)*q.v*p*1.2,y=b.y+Math.sin(q.a)*q.v*p*1.2+q.g*p*p,a=Math.pow(1-p,1.3)*(.55+.45*Math.sin(TAU*(p*9+q.a)));put(spr([255,205,95],32),x,y,5+4*(1-p),Math.max(0,a))}}
    ctx.globalCompositeOperation='source-over';const Hw=H+160;
    for(const c of cf){const y=wrap(c.y+u*Hw*c.kk,Hw)-80,x=c.x+Math.sin(TAU*c.ks*u+c.o2)*44,fl=Math.cos(TAU*(c.f*u+c.o));ctx.save();ctx.translate(x,y);ctx.rotate(c.r0+TAU*u*c.rk*.5);ctx.scale(1,fl);
      const lt=.55+.45*Math.abs(fl);ctx.globalAlpha=.95;ctx.fillStyle=rgba(mixc([40,30,20],c.c,lt),1);ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.restore()}
    ctx.globalAlpha=1};
};
/* ===== 5  STARS + BOKEH + GLITTER + LIGHT TRAILS BORDER FRAME ===== */
C[5]=()=>{const R=rng(55);newTL();const FX=90,FY=80,FW=W-180,FH=H-160,FR=64,
  seg=[FW-2*FR,Math.PI/2*FR,FH-2*FR,Math.PI/2*FR,FW-2*FR,Math.PI/2*FR,FH-2*FR,Math.PI/2*FR],PL=seg.reduce((a,b)=>a+b,0);
  const pp=s=>{s=wrap(s,PL);let i=0;while(s>seg[i]){s-=seg[i];i++}const a=s/FR;
    return[[FX+FR+s,FY],[FX+FW-FR+Math.cos(-Math.PI/2+a)*FR,FY+FR+Math.sin(-Math.PI/2+a)*FR],[FX+FW,FY+FR+s],[FX+FW-FR+Math.cos(a)*FR,FY+FH-FR+Math.sin(a)*FR],
      [FX+FW-FR-s,FY+FH],[FX+FR+Math.cos(Math.PI/2+a)*FR,FY+FH-FR+Math.sin(Math.PI/2+a)*FR],[FX,FY+FH-FR-s],[FX+FR+Math.cos(Math.PI+a)*FR,FY+FR+Math.sin(Math.PI+a)*FR]][i]};
  const gold=[255,205,110],rose=[255,110,190],ice=[130,200,255],cm=[W/2,H/2];
  const near=(d)=>{const [x,y]=pp(R()*PL),t=R()*d;return[x+(cm[0]-x)*t,y+(cm[1]-y)*t]};
  const bo=[],gl=[],sp=[],co=[[FX,FY],[FX+FW,FY],[FX+FW,FY+FH],[FX,FY+FH]].map(([x,y])=>({x,y}));
  const bc=[gold,rose,ice,[255,160,90]];
  for(let i=0;i<70;i++){const [x,y]=near(.22);bo.push({x,y,r:16+R()*60,c:pick(R,bc),o:R()*TAU,tw:0})}
  for(let i=0;i<340;i++){const [x,y]=near(.18);gl.push({x,y,s:1.2+R()*3,k:2+(R()*8|0),o:R(),c:R()<.4?[255,245,220]:gold})}
  for(let i=0;i<34;i++){const [x,y]=near(.1);sp.push({x,y,r:8+R()*16,tw:0})}
  const cm_=[{k:1,o:0,c:gold,d:1},{k:1,o:.5,c:gold,d:1},{k:2,o:.25,c:rose,d:-1},{k:2,o:.75,c:ice,d:-1}];
  const cp={s:1};osc(cp,{s:[.8,1.2]},5);twinkle(bo,2,6,R);twinkle(sp,1,6,R);
  draw=()=>{clear();const u=U();
    fillRad(W/2,H/2,W*.65,[[0,'rgba(34,22,70,.65)'],[.6,'rgba(12,8,28,.4)'],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';
    for(const b of bo)put(bokeh(b.c,128),b.x+Math.sin(TAU*u+b.o)*14,b.y+Math.cos(TAU*u+b.o)*14,b.r,.14+.4*b.tw);
    /* frame */
    ctx.globalCompositeOperation='source-over';ctx.shadowColor='rgba(255,200,100,.8)';ctx.shadowBlur=26*S;ctx.strokeStyle='rgba(255,220,150,.9)';ctx.lineWidth=3.5;ctx.beginPath();ctx.roundRect(FX,FY,FW,FH,FR);ctx.stroke();
    ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,215,140,.4)';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(FX+16,FY+16,FW-32,FH-32,FR-12);ctx.stroke();
    ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
    for(const c of cm_){const hs=fr(c.k*u+c.o)*PL*(c.d>0?1:1),L=760;let prev=pp(hs*(c.d));for(let j=1;j<=70;j++){const q=j/70,s=(hs-q*L)*1;const pt=pp(c.d>0?s:-s);ctx.strokeStyle=rgba(c.c,.8*Math.pow(1-q,1.6));ctx.lineWidth=3+20*Math.pow(1-q,1.4);ctx.beginPath();ctx.moveTo(prev[0],prev[1]);ctx.lineTo(pt[0],pt[1]);ctx.stroke();prev=pt}
      const h=pp(c.d>0?hs:-hs);put(spr(c.c,128),h[0],h[1],96,.95);spark(h[0],h[1],46,.95,0,'#fff')}
    for(const p of gl){const f=Math.pow(Math.max(0,Math.sin(TAU*(p.k*u+p.o))),6);put(spr(p.c,32),p.x,p.y,p.s*(1+f*2.2),.1+.9*f)}
    for(const s of sp)if(s.tw>.01)spark(s.x,s.y,s.r*(.5+s.tw),s.tw,Math.PI/4*s.tw,'#fff2cf');
    for(const c of co){put(spr(gold,256),c.x,c.y,110*cp.s,.55);spark(c.x,c.y,64*cp.s,.95,0,'#fff0c4');spark(c.x,c.y,34*cp.s,.8,Math.PI/4,'#fff')}
    ctx.globalAlpha=1};
};
