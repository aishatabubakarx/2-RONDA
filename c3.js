/* ===== 11  GLOWING HEXAGON GRID ENERGY RIPPLES (TECH HONEYCOMB) ===== */
C[11]=()=>{const R=rng(1111);newTL();const s=46,w=Math.sqrt(3)*s,v=1.5*s,cells=[];
  for(let r=-1;r<Math.ceil(H/v)+2;r++)for(let c=-1;c<Math.ceil(W/w)+2;c++)cells.push({x:c*w+(r&1?w/2:0),y:r*v,tw:0,fl:R()<.2});
  twinkle(cells.filter(c=>c.fl),1.1,8,R,1);
  const src=[{x:W*.25,y:H*.35,k:1,o:0,c:[40,220,255]},{x:W*.75,y:H*.65,k:1,o:.5,c:[90,120,255]},{x:W*.5,y:H*.5,k:2,o:.25,c:[255,80,200]}];
  const dust=[];for(let i=0;i<110;i++)dust.push({x:R()*W,y:R()*H,s:1.5+R()*3,k:1+(R()*2|0),ks:1+(R()*3|0),o:R(),o2:R()*TAU});
  draw=()=>{clear('#020812');const u=U();fillRad(W/2,H/2,W*.75,[[0,'rgba(8,40,80,.7)'],[1,'rgba(0,0,0,0)']]);ctx.lineJoin='round';
    const rad=src.map(q=>fr(q.k*u+q.o)*1700);
    ctx.globalCompositeOperation='lighter';
    for(const c of cells){let e=0,cr=0,cg=0,cb=0;
      for(let i=0;i<3;i++){const q=src[i],d=Math.hypot(c.x-q.x,c.y-q.y),k=Math.exp(-Math.pow((d-rad[i])/80,2))*(1-rad[i]/1700);e+=k;cr+=q.c[0]*k;cg+=q.c[1]*k;cb+=q.c[2]*k}
      const f=c.fl?c.tw:0,tot=e+f*.8;
      ctx.lineWidth=2;
      if(tot>.02){const col=e>0?[cr/e,cg/e,cb/e]:[60,200,255],a=Math.min(1,tot);hex(c.x,c.y,s-3);ctx.fillStyle=rgba(col,a*.38);ctx.fill();ctx.strokeStyle=rgba(mixc(col,[255,255,255],.45),.25+.75*a);ctx.lineWidth=2.5;ctx.stroke();
        if(a>.35){hex(c.x,c.y,(s-3)*.62);ctx.strokeStyle=rgba(col,a*.8);ctx.lineWidth=1.5;ctx.stroke()}}
      else{hex(c.x,c.y,s-3);ctx.strokeStyle='rgba(60,170,230,.2)';ctx.stroke()}}
    for(const d of dust){const y=wrap(d.y-u*H*d.k,H),f=.5+.5*Math.sin(TAU*d.ks*u+d.o2);put(spr([80,220,255],32),d.x+Math.sin(TAU*u+d.o2)*20,y,d.s*(1+f),.2+.5*f)}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';fillRad(W/2,H/2,W*.85,[[.55,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.75)']])};
};
/* ===== 12  NEON KALEIDOSCOPE MANDALA ===== */
C[12]=()=>{const R=rng(1212);newTL();const N=12,cx=W/2,cy=H/2;
  const L=[{r0:90,len:190,wid:60,hue:320,dir:1,m:1,per:15},{r0:200,len:230,wid:74,hue:190,dir:-1,m:1,per:7.5},{r0:330,len:250,wid:90,hue:275,dir:1,m:2,per:5},{r0:470,len:230,wid:96,hue:40,dir:-1,m:1,per:15},{r0:590,len:200,wid:80,hue:200,dir:1,m:1,per:7.5}];
  L.forEach(l=>{l.sc=1;osc(l,{sc:[.92,1.08]},l.per)});const G={h:0,p:1};osc(G,{h:[-35,35],p:[.85,1.15]},15);
  const sp=[];for(let i=0;i<70;i++)sp.push({a:R()*TAU,r:80+R()*560,k:1+(R()*3|0)*(R()<.5?-1:1),s:1.5+R()*3});
  draw=()=>{clear('#05020f');const u=U();fillRad(cx,cy,W*.7,[[0,hsl(280+G.h,80,22,.55)],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';
    for(const l of L){const hue=l.hue+G.h;ctx.save();ctx.translate(cx,cy);ctx.rotate(l.dir*u*TAU/N*l.m);ctx.scale(l.sc,l.sc);
      for(let j=0;j<N;j++){ctx.save();ctx.rotate(j*TAU/N);const {r0,len,wid}=l;ctx.beginPath();ctx.moveTo(0,-r0);ctx.bezierCurveTo(wid,-r0-len*.3,wid*.65,-r0-len*.8,0,-r0-len);ctx.bezierCurveTo(-wid*.65,-r0-len*.8,-wid,-r0-len*.3,0,-r0);
        ctx.fillStyle=hsl(hue,100,55,.16);ctx.fill();ctx.strokeStyle=hsl(hue,100,60,.16);ctx.lineWidth=14;ctx.stroke();ctx.strokeStyle=hsl(hue,100,70,.95);ctx.lineWidth=3.2;ctx.stroke();ctx.strokeStyle=hsl(hue+30,100,70,.5);ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(0,-r0-len*.12);ctx.lineTo(0,-r0-len*.9);ctx.stroke();
        put(spr([255,255,255],32),0,-r0-len,12,.9);put(spr([255,255,255],32),0,-r0,8,.7);ctx.restore()}
      ctx.strokeStyle=hsl(hue+20,100,70,.28);ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,l.r0,0,TAU);ctx.stroke();
      ctx.restore()}
    ctx.save();ctx.translate(cx,cy);ctx.rotate(-u*TAU/N*2);for(let i=0;i<N;i++){const a=i/N*TAU,b=(i+5)/N*TAU;ctx.strokeStyle=hsl(50+G.h,100,70,.35);ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(Math.cos(a)*150*G.p,Math.sin(a)*150*G.p);ctx.lineTo(Math.cos(b)*150*G.p,Math.sin(b)*150*G.p);ctx.stroke()}ctx.restore();
    for(const p of sp){const a=p.a+u*TAU*p.k*.25;put(spr([255,220,160],32),cx+Math.cos(a)*p.r,cy+Math.sin(a)*p.r,p.s*2.2,.55)}
    put(spr([255,150,255],256),cx,cy,150*G.p,.9);put(spr([255,255,255],128),cx,cy,38,1);ctx.globalAlpha=1};
};
/* ===== 13  SPIRAL GALAXY WITH GLOWING STAR DUST ===== */
C[13]=()=>{const R=rng(1313);newTL();const Z={s:1,c:1};osc(Z,{s:[1,1.08],c:[.88,1.1]},5);
  /* base set is replicated 4x (90 degree symmetry), so a quarter turn per loop is seamless */
  const base=[],puffs=[];
  for(let i=0;i<1100;i++){const r=Math.pow(R(),.75),arm=i%2,th=r*5.2+arm*Math.PI+(R()-.5)*.6*(1.1-r*.6),jr=(R()-.5)*.05*(1+r*2);
    const col=r<.2?[255,226,170]:R()<.5?[120,160,255]:R()<.6?[255,130,210]:[180,140,255];base.push({th,r:r+jr,c:col,s:5+R()*(r<.25?16:10),a:.2+R()*.55})}
  for(let i=0;i<22;i++){const r=.15+R()*.8,th=r*5.2+(i%2)*Math.PI+(R()-.5)*.3;puffs.push({th,r,c:[[120,90,255],[60,140,255],[255,90,200]][i%3],s:200+R()*180})}
  const bg=[];for(let i=0;i<320;i++)bg.push({x:R()*W,y:R()*H,r:1+R()*2.4,tw:0,b:R()<.05});twinkle(bg,1.4,7,R);
  const cx=W/2,cy=H/2,RG=620,tilt=-.38,ct=Math.cos(tilt),st=Math.sin(tilt);
  const P=(th,r)=>{const x=Math.cos(th)*r*RG,y=Math.sin(th)*r*RG*.52;return[cx+x*ct-y*st,cy+x*st+y*ct]};
  draw=()=>{clear('#02020a');const u=U();
    ctx.globalCompositeOperation='lighter';
    for(const s of bg){put(spr([200,215,255],16),s.x,s.y,s.r*2+(s.b?3:0),(.15+.85*s.tw)*.8);if(s.b&&s.tw>.4)spark(s.x,s.y,12*s.tw+4,s.tw*.7,0,'#dfe8ff')}
    ctx.save();ctx.translate(cx,cy);ctx.scale(Z.s,Z.s);ctx.translate(-cx,-cy);const om=u*TAU/4;
    for(let q=0;q<4;q++){for(const p of puffs){const [x,y]=P(p.th+om+q*TAU/4,p.r);put(blob(p.c,128),x,y,p.s,.06)}}
    for(let q=0;q<4;q++){for(const p of base){const [x,y]=P(p.th+om+q*TAU/4,p.r);put(spr(p.c,32),x,y,p.s,p.a)}}
    put(spr([255,190,110],512),cx,cy,250*Z.c,.55);put(spr([255,240,215],256),cx,cy,90*Z.c,.9);put(spr([255,255,255],128),cx,cy,46,1);
    ctx.restore();ctx.globalAlpha=1};
};
/* ===== 14  NEON AUDIO EQUALIZER BEAT VISUALIZER ===== */
C[14]=()=>{const R=rng(1414);newTL();const K={v:0},Rg={p:0};
  tl.fromTo(K,{v:1},{v:0,duration:.5,ease:'power3.out',repeat:29},0);
  tl.fromTo(Rg,{p:0},{p:1,duration:1.5,ease:'power2.out',repeat:9},0);
  const NB=48,bars=[];for(let i=0;i<NB;i++)bars.push({k1:[2,3,5,6][(R()*4)|0],k2:[3,4,7,9][(R()*4)|0],o1:R(),o2:R(),amp:.55+R()*.45});
  const pts=[];for(let i=0;i<150;i++)pts.push({x:R()*W,y:R()*H,s:1.5+R()*3,k:1+(R()*2|0),o:R()});
  const base=H*.64,bw=16,bh=12,gap=5;
  draw=()=>{clear('#05030f');const u=U();fillLin(0,0,0,H,[[0,'#0a0524'],[.64,'#20083c'],[1,'#05030f']]);
    fillRad(W/2,base,W*.55,[[0,rgba([255,60,200],.22+.2*K.v)],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';
    for(let i=0;i<2;i++){const p=fr(Rg.p+i*.5);ctx.strokeStyle=rgba([90,200,255],(1-p)*.35);ctx.lineWidth=3;ctx.beginPath();ctx.arc(W/2,base-120,120+p*900,0,TAU);ctx.stroke()}
    for(const d of pts){const y=wrap(d.y-u*H*d.k,H)-K.v*10;put(spr([140,180,255],32),d.x,y,d.s*(1+K.v*.8),.25+.4*Math.sin(TAU*u*3+d.o*6)**2)}
    const draws=[];
    for(let side=-1;side<=1;side+=2)for(let i=0;i<NB;i++){const b=bars[i],n=Math.abs(Math.sin(TAU*(b.k1*u+b.o1))*.6+Math.sin(TAU*(b.k2*u+b.o2))*.4),kw=Math.pow(1-i/NB,1.4),
        h=Math.min(1,b.amp*(.3+.75*n)*(1-i/(NB*1.5))+K.v*.5*kw)*540,x=W/2+side*(i*(bw+2)+bw/2+4)-bw/2,n_=Math.max(1,Math.floor(h/(bh+gap)));draws.push([x,n_,i/NB])}
    for(const [x,n,t] of draws){for(let j=0;j<n;j++){const lv=j/16,col=hsl(190+lv*150,100,58+Math.min(20,lv*12)),y=base-(j+1)*(bh+gap);
        ctx.fillStyle=col;ctx.globalAlpha=.95;ctx.beginPath();ctx.roundRect(x,y,bw,bh,3);ctx.fill();ctx.globalAlpha=.16;ctx.fillRect(x-3,y-3,bw+6,bh+6);
        ctx.globalAlpha=.2*(1-j/Math.max(n,8));ctx.fillStyle=col;ctx.beginPath();ctx.roundRect(x,base+6+j*(bh+gap),bw,bh,3);ctx.fill()}}
    ctx.globalAlpha=1;ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(W/2-NB*(bw+2)-8,base+1,NB*(bw+2)*2+16,2)};
};
/* ===== 15  STAGE SPOTLIGHT BEAMS WITH SMOKE HAZE ===== */
C[15]=()=>{const R=rng(1515);newTL();const cols=[[255,255,255],[90,200,255],[255,80,200],[255,190,80],[130,120,255],[80,255,200]],per=[15,7.5,5,15,7.5,5];
  const L=cols.map((c,i)=>{const o={c,x:W*(.09+i*.164),I:1,k:1+(i%2),ph:R()*TAU,base:(2.5-i)*.09,amp:.45+R()*.2};osc(o,{I:[.55,1]},per[i]);return o});
  const mo=[];for(let i=0;i<300;i++)mo.push({x:R()*W,y:R()*H,s:1+R()*2.6,k:1+(R()*2|0),ks:1+(R()*2|0),o:R()*TAU});
  const haze=[];for(let i=0;i<10;i++)haze.push({x:R()*W,y:H*(.55+R()*.4),r:300+R()*300,o:R()*TAU});
  const FL=H*.86;
  draw=()=>{clear('#030511');const u=U();fillLin(0,0,0,H,[[0,'#060818'],[.7,'#0b1030'],[1,'#05060f']]);ctx.globalCompositeOperation='lighter';
    for(const l of L){const th=l.base+l.amp*Math.sin(TAU*l.k*u+l.ph),sx=l.x,sy=-20,len=1500;
      for(const [w,a] of [[.15,.1],[.085,.2],[.04,.4]]){const x1=sx+Math.sin(th-w)*len,y1=sy+Math.cos(th-w)*len,x2=sx+Math.sin(th+w)*len,y2=sy+Math.cos(th+w)*len,g=ctx.createLinearGradient(sx,sy,sx+Math.sin(th)*len,sy+Math.cos(th)*len);
        g.addColorStop(0,rgba(l.c,Math.min(1,.9*a*l.I*3)));g.addColorStop(.55,rgba(l.c,a*l.I*1.1));g.addColorStop(1,rgba(l.c,0));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(x1,y1);ctx.lineTo(x2,y2);ctx.fill()}
      const fx=sx+(FL-sy)*Math.tan(th);ctx.save();ctx.translate(fx,FL);ctx.scale(1,.2);ctx.globalAlpha=.85*l.I;ctx.drawImage(spr(l.c,256),-190,-190,380,380);ctx.restore();
      put(spr(l.c,128),sx,26,70,.95*l.I);put(spr([255,255,255],32),sx,26,14,l.I)}
    for(const h of haze)put(blob([110,130,255],128),h.x+Math.sin(TAU*u+h.o)*90,h.y,h.r,.07);
    for(const m of mo){const y=wrap(m.y-u*H*m.k,H);put(spr([200,220,255],16),m.x+Math.sin(TAU*m.ks*u+m.o)*30,y,m.s*1.6,.3+.35*Math.sin(TAU*u*2+m.o)**2)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;fillLin(0,FL-40,0,H,[[0,'rgba(10,14,40,0)'],[.4,'rgba(8,10,30,.85)'],[1,'rgba(2,3,10,1)']],[0,FL-40,W,H-FL+40]);
    fillLin(0,0,0,14,[[0,'#2a2f45'],[1,'#07080f']],[0,0,W,14])};
};
