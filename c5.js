/* 17 DUST MOTES IN A LIGHT BEAM */
C[17]=()=>{newTL();const R=rng(1717),g={v:0},P=[],S=[-180,-140],ang=Math.atan2(H*.95+140,W*.62+180),ca=Math.cos(ang),sa=Math.sin(ang);
  tl.fromTo(g,{v:0},{v:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  for(let i=0;i<560;i++){const z=R();P.push({x:R()*W,y:R()*H,u:R(),k:R()<.7?1:2,ax:20+R()*90,an:1+Math.floor(R()*3),ap:R(),ay:15+R()*60,yn:1+Math.floor(R()*3),yp:R(),r:1.2+z*z*4.6,tn:2+Math.floor(R()*9),tp:R(),z})}
  const hw=s=>110+s*.2;
  draw=()=>{clear();const ph=PH();add();
    ctx.save();ctx.translate(S[0],S[1]);ctx.rotate(ang);
    for(const [wf,a] of [1,.92,.84,.76,.68,.6,.52,.44,.36,.28,.2,.12].map(w=>[w,.02+.012*(1-w)])){const grd=ctx.createLinearGradient(0,0,2500,0);grd.addColorStop(0,`rgba(255,238,205,${a*(1.5+.5*g.v)})`);grd.addColorStop(.6,`rgba(255,226,180,${a*.7})`);grd.addColorStop(1,'rgba(255,220,170,0)');
      ctx.fillStyle=grd;ctx.beginPath();ctx.moveTo(0,-hw(0)*wf);ctx.lineTo(2500,-hw(2500)*wf);ctx.lineTo(2500,hw(2500)*wf);ctx.lineTo(0,hw(0)*wf);ctx.closePath();ctx.fill()}
    ctx.restore();
    for(const p of P){const y0=p.y-fr(p.u+p.k*ph)*(H+80)*0;let px=p.x+sn(p.an,ph,p.ap)*p.ax,py=mod(p.y+(H+80)*p.u*0+(H+80)*p.k*ph*.0+p.ay*sn(p.yn,ph,p.yp)+ (H+80)*(fr(p.u+p.k*ph)),H+80)-40;
      const dx=px-S[0],dy=py-S[1],s=dx*ca+dy*sa,q=-dx*sa+dy*ca,w=hw(Math.max(0,s)),inb=s>0?1-sm(w*.5,w*1.05,Math.abs(q)):0,fl=Math.pow(.5+.5*sn(p.tn,ph,p.tp),2),a=(.06+.94*inb)*(.35+.65*fl)*(.5+.5*p.z);
      put(spr([255,236,200],32,.9),px,py,p.r*(1.5+inb*1.6),Math.min(1,a))}
    nrm()}};

/* 18 SPIRAL GALAXY */
C[18]=()=>{newTL();const R=rng(1818),g={v:0},ARM=3,B=[],ST=[];
  tl.fromTo(g,{v:0},{v:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const gauss=()=>R()+R()+R()-1.5;
  for(let i=0;i<1700;i++){const rr=Math.pow(R(),.75),r=30+rr*820,th=2.7*Math.log(r/30)+gauss()*(.5*(1-rr)+.1),big=R()<.04;
    const k=R(),c=r<160?mixc([255,220,160],[255,150,170],r/160):mixc([255,130,200],[90,150,255],clamp((r-160)/640,0,1));
    B.push({r,th,c:k<.12?[255,255,255]:c,s:big?3.4+R()*2.4:1+R()*1.9,m:1+Math.floor(R()*3),p:R(),tn:1+Math.floor(R()*5),tp:R(),big,a:.35+R()*.65})}
  for(let i=0;i<220;i++)ST.push({x:R()*W,y:R()*H,r:.6+R()*1.2,tn:1+Math.floor(R()*5),tp:R()});
  draw=()=>{clear();const ph=PH(),cx=W/2,cy=H/2,tilt=.44+.1*g.v,rot=TAU/ARM*ph;add();
    for(const s of ST)put(sd([200,215,255],16),s.x,s.y,s.r*2,.2+.5*Math.pow(.5+.5*sn(s.tn,ph,s.tp),2));
    put(sd([120,60,220],256),cx,cy,760,.16);
    ctx.save();ctx.translate(cx,cy);ctx.rotate(-.35);ctx.scale(1,tilt);
    for(let a=0;a<ARM;a++)for(const p of B){const th=p.th+a*TAU/ARM+rot+.12*sn(p.m,ph,p.p),x=Math.cos(th)*p.r,y=Math.sin(th)*p.r,tw=.55+.45*sn(p.tn,ph,p.tp);
      if(p.big){put(spr(p.c,64),x,y/1,p.s*5*(.8+.3*tw),p.a*tw)}else put(sd(p.c,16),x,y,p.s*2,p.a*tw)}
    ctx.restore();
    put(spr([255,215,150],256),cx,cy,290,.95);put(spr([255,240,210],128),cx,cy,90,1);put(sd([255,190,120],256),cx,cy,540,.25);nrm()}};

/* 19 NEON WAVE RIBBONS */
C[19]=()=>{newTL();const R=rng(1919),NL=34,XS=[];for(let x=-60;x<=W+60;x+=14)XS.push(x);
  draw=()=>{clear();const ph=PH(),cy=H/2;add();ctx.lineJoin='round';
    const pts=[];for(let i=0;i<NL;i++){const row=[];for(const x of XS){const sp=9+17*(.5+.5*sn(1,ph,x/1500)),env=.55+.45*Math.sin(TAU*(x/(W*1.6)+.1)),
        y=cy+(i-(NL-1)/2)*sp+env*(150*Math.sin(TAU*(x/900+ph*1+i*.012))+70*Math.sin(TAU*(x/420-ph*2+i*.02))+28*Math.sin(TAU*(x/210+ph*3+i*.035)));row.push(y)}pts.push(row)}
    for(let i=0;i<NL;i++){const h=312-i/(NL-1)*140,row=pts[i];
      for(const [lw,a,l] of [[12,.05,55],[5,.16,60],[1.8,.95,72]]){ctx.strokeStyle=hsl(h,100,l,a);ctx.lineWidth=lw;ctx.beginPath();XS.forEach((x,j)=>j?ctx.lineTo(x,row[j]):ctx.moveTo(x,row[j]));ctx.stroke()}}
    for(let i=0;i<NL;i+=3){const row=pts[i],u=fr(i*.137+ph*2),j=Math.floor(u*(XS.length-1));put(spr([255,255,255],64),XS[j],row[j],18,.9)}
    nrm()}};

/* 20 DANDELION SEEDS FLOATING */
C[20]=()=>{newTL();const R=rng(2020),P=[],D=[];
  for(let i=0;i<34;i++){const z=R();P.push({z,s:20+z*z*78,u:R(),k:1+Math.floor(R()*2),y:80+R()*(H-160),ya:30+R()*90,yn:1+Math.floor(R()*3),yp:R(),rk:.2+R()*.25,rn:1+Math.floor(R()*3),rp:R(),tn:1+Math.floor(R()*2),tp:R(),nf:38+Math.floor(R()*10)})}
  P.sort((a,b)=>a.z-b.z);
  for(let i=0;i<150;i++)D.push({x:R()*W,y:R()*H,r:1+R()*2.6,k:1+Math.floor(R()*2),u:R(),ya:10+R()*40,yn:1+Math.floor(R()*3),yp:R(),tn:2+Math.floor(R()*6),tp:R()});
  const SD=sd([255,255,255],16);
  draw=()=>{clear();const ph=PH();add();
    for(const d of D){const x=fr(d.u+d.k*ph)*(W+100)-50,y=d.y+d.ya*sn(d.yn,ph,d.yp);put(SD,x,y,d.r*2.2,.15+.6*Math.pow(.5+.5*sn(d.tn,ph,d.tp),2))}
    ctx.lineCap='round';
    for(const p of P){const x=fr(p.u+p.k*ph)*(W+300)-150,y=p.y+p.ya*sn(p.yn,ph,p.yp),rot=p.rk*sn(p.rn,ph,p.rp),tx=.45+.55*Math.abs(Math.cos(TAU*(p.tn*ph+p.tp))),s=p.s,al=.4+.6*p.z;
      put(spr([220,235,255],64),x,y-s*.1,s*1.5,.12*al);
      ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=al;
      ctx.strokeStyle='rgba(235,245,255,.85)';ctx.lineWidth=Math.max(1,s*.025);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,s*1.15);ctx.stroke();
      ctx.fillStyle='rgba(255,240,215,.95)';ctx.beginPath();ctx.ellipse(0,s*1.2,s*.035,s*.1,0,0,TAU);ctx.fill();
      ctx.lineWidth=Math.max(.6,s*.012);ctx.strokeStyle='rgba(235,245,255,.8)';
      for(let i=0;i<p.nf;i++){const a=-Math.PI/2+((i+.5)/p.nf-.5)*Math.PI*1.55,ln=s*(.5+.5*Math.cos((a+Math.PI/2)*.9)),ex=Math.cos(a)*ln*tx,ey=Math.sin(a)*ln;
        ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(ex*.55,ey*.5-s*.05,ex,ey);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(ex,ey,Math.max(.8,s*.014),0,TAU);ctx.fill();
        for(let t=-1;t<=1;t+=2){ctx.beginPath();ctx.moveTo(ex,ey);ctx.lineTo(ex+Math.cos(a+t*.7)*s*.07*tx,ey+Math.sin(a+t*.7)*s*.07);ctx.stroke()}}
      ctx.restore();ctx.globalAlpha=1}
    ctx.lineCap='butt';nrm()}};
