/* 13 SKY LANTERNS RISING AT NIGHT */
C[13]=()=>{newTL();const R=rng(1313),P=[];
  for(let i=0;i<42;i++){const z=Math.pow(R(),.9);P.push({z,w:20+z*92,u:R(),k:1+Math.floor(z*1.99),x:R()*W,sa:25+R()*60,sn:1+Math.floor(R()*2),sp:R(),fn:3+Math.floor(R()*6),fp:R(),tilt:.05+R()*.07,c:R()<.8?[255,150,40]:[255,95,50]})}
  P.sort((a,b)=>a.z-b.z);
  const body=(w,h)=>{ctx.beginPath();ctx.moveTo(-w*.7,-h*.5);ctx.bezierCurveTo(-w*.9,-h*.1,-w*1.0,h*.2,-w*.78,h*.5);ctx.lineTo(w*.78,h*.5);ctx.bezierCurveTo(w*1.0,h*.2,w*.9,-h*.1,w*.7,-h*.5);ctx.bezierCurveTo(w*.35,-h*.62,-w*.35,-h*.62,-w*.7,-h*.5);ctx.closePath()};
  draw=()=>{clear();const ph=PH();
    for(const p of P){const h=p.w*1.55,y=H+h+60-fr(p.u+p.k*ph)*(H+2*h+120),sw=sn(p.sn,ph,p.sp),x=p.x+sw*p.sa,fl=.85+.15*sn(p.fn,ph,p.fp)+.05*sn(p.fn*2+1,ph,p.fp);
      add();put(spr(p.c,128),x,y+h*.1,p.w*3.4,.5*fl*(.4+.6*p.z));nrm();
      ctx.save();ctx.translate(x,y);ctx.rotate(sw*p.tilt);ctx.globalAlpha=.55+.45*p.z;
      const g=ctx.createRadialGradient(0,h*.3,p.w*.05,0,h*.1,h*.8);g.addColorStop(0,rgba(mixc([255,240,190],p.c,.1),1));g.addColorStop(.35,rgba(mixc([255,205,110],p.c,.4),1));g.addColorStop(1,rgba([p.c[0]*.7*fl,p.c[1]*.38*fl,p.c[2]*.2*fl],1));
      body(p.w,h);ctx.fillStyle=g;ctx.fill();ctx.lineWidth=Math.max(1,p.w*.035);ctx.strokeStyle=`rgba(90,25,5,${.35*fl})`;
      for(const rx of [-.45,0,.45]){ctx.beginPath();ctx.moveTo(rx*p.w*.7,-h*.5);ctx.quadraticCurveTo(rx*p.w*1.25,0,rx*p.w*.85,h*.5);ctx.stroke()}
      ctx.fillStyle='rgba(60,18,6,.8)';ctx.fillRect(-p.w*.7,-h*.52,p.w*1.4,h*.045);ctx.fillStyle='rgba(70,24,8,.9)';ctx.fillRect(-p.w*.78,h*.47,p.w*1.56,h*.05);
      ctx.restore();add();put(spr([255,235,170],64),x+Math.sin(sw)*p.w*.1,y+h*.52,p.w*.55*fl,.95*fl);nrm()}
    }};

/* 14 HYPERSPACE STAR WARP */
C[14]=()=>{newTL();const R=rng(1414),g={v:.35};
  tl.fromTo(g,{v:.35},{v:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const COL=[[255,255,255],[170,205,255],[120,255,255],[255,150,235],[190,170,255],[255,255,255]],P=[];
  for(let i=0;i<1100;i++)P.push({an:R()*TAU,u:R(),k:1+Math.floor(R()*2),c:pick(R,COL),w:.5+R()*1.5,L:.5+R()*1.1});
  const rad=u=>10+1300*Math.pow(u,2.2);
  draw=()=>{clear();const ph=PH(),cx=W/2,cy=H/2;add();ctx.lineCap='round';
    put(sd([70,110,255],256),cx,cy,560*(.5+g.v),.22*g.v);put(sd([255,255,255],128),cx,cy,110,.22*g.v);
    for(const p of P){const u=fr(p.u+p.k*ph),r1=rad(u),u2=Math.max(0,u-p.L*g.v*.05*(.35+u)),r0=rad(u2),ca=Math.cos(p.an),sa=Math.sin(p.an),a=clamp(sm(0,.12,u)*(.4+.9*u),0,1),w=p.w*(.6+u*2.2);
      const x0=cx+ca*r0,y0=cy+sa*r0,x1=cx+ca*r1,y1=cy+sa*r1;
      for(let s=0;s<3;s++){const f0=s/3,f1=(s+1)/3;ctx.globalAlpha=a*(.2+.8*f1*f1);ctx.strokeStyle=rgba(p.c,1);ctx.lineWidth=w*(.5+.5*f1);ctx.beginPath();ctx.moveTo(lerp(x0,x1,f0),lerp(y0,y1,f0));ctx.lineTo(lerp(x0,x1,f1),lerp(y0,y1,f1));ctx.stroke()}
      if(u>.3)put(spr(p.c,32),x1,y1,w*3.5,a*.6)}
    ctx.lineCap='butt';nrm()}};

/* 15 AURORA BOREALIS */
const rayTex=(name,stops)=>mk('ray'+name,256,(x,h)=>{x.clearRect(0,0,512,512);const g=x.createLinearGradient(0,0,0,2*h);for(const [o,c] of stops)g.addColorStop(o,c);x.fillStyle=g;x.fillRect(0,0,2*h,2*h)});
C[15]=()=>{newTL();const R=rng(1515),
  CUR=[{tex:[[0,'rgba(120,80,255,0)'],[.35,'rgba(100,140,255,.10)'],[.62,'rgba(60,230,200,.32)'],[.88,'rgba(70,255,140,.85)'],[.94,'rgba(120,255,170,.9)'],[1,'rgba(70,255,140,0)']],yb:H*.62,a:[[130,1100,1],[60,430,2],[26,210,3]],hh:[430,260],n:[1,2],ph:R()},
       {tex:[[0,'rgba(255,80,200,0)'],[.4,'rgba(180,90,255,.12)'],[.7,'rgba(70,200,255,.32)'],[.92,'rgba(80,255,190,.75)'],[1,'rgba(80,255,190,0)']],yb:H*.5,a:[[110,900,1],[50,380,3],[22,170,4]],hh:[380,220],n:[1,3],ph:R()},
       {tex:[[0,'rgba(80,120,255,0)'],[.5,'rgba(80,170,255,.10)'],[.85,'rgba(110,255,180,.5)'],[1,'rgba(110,255,180,0)']],yb:H*.74,a:[[70,1300,2],[34,520,3],[16,230,5]],hh:[300,180],n:[2,3],ph:R()}],
  ST=[];for(let i=0;i<70;i++)ST.push({x:R()*W,y:R()*H*.7,r:.6+R()*1.4,tn:1+Math.floor(R()*5),tp:R()});
  draw=()=>{clear();const ph=PH();add();
    for(const s of ST)put(sd([190,215,255],16),s.x,s.y,s.r*2.2,.25+.6*Math.pow(.5+.5*sn(s.tn,ph,s.tp),2));
    CUR.forEach((c,ci)=>{const tex=rayTex(ci,c.tex),cph=c.ph;
      for(let x=-20;x<W+20;x+=3){let yb=c.yb;for(const [A,lam,n] of c.a)yb+=A*Math.sin(TAU*(x/lam+n*ph*(ci%2?-1:1)+cph));
        const hw=.5+.5*Math.sin(TAU*(x/(380+ci*90)-c.n[0]*ph+cph*3)),hv=.5+.5*Math.sin(TAU*(x/(190+ci*50)+c.n[1]*ph+cph*5)),h=c.hh[1]+c.hh[0]*(.55*hw+.45*hv),
          I=.25+.75*Math.pow(.5+.5*Math.sin(TAU*(x/(520+ci*130)-ph*(1+ci%2)+cph*7)),1.5);
        ctx.globalAlpha=Math.min(1,I*.55);ctx.drawImage(tex,x-1.5,yb-h,6,h);ctx.globalAlpha=Math.min(1,I*.22);ctx.drawImage(tex,x-8,yb-h*1.05,18,h*1.05)}});
    nrm()}};

/* 16 CINEMATIC LENS FLARE + LIGHT LEAKS */
C[16]=()=>{newTL();const R=rng(1616),src={x:-120,y:H*.28};
  tl.fromTo(src,{x:-160,y:H*.26},{x:W+160,y:H*.7,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const G=[[-.35,.2,[255,140,60],.5],[.25,.35,[255,90,160],.35],[.55,.14,[90,200,255],.5],[.85,.5,[255,200,90],.28],[1.15,.25,[130,120,255],.4],[1.5,.6,[90,255,200],.22],[1.9,.18,[255,150,100],.5],[2.3,.4,[160,200,255],.25]];
  const LK=[{x:0,y:.5,r:760,c:[255,90,30],m:1,p:0},{x:1,y:.25,r:680,c:[255,50,130],m:2,p:.3},{x:.55,y:1.05,r:720,c:[255,170,40],m:1,p:.6},{x:.3,y:-.05,r:560,c:[110,80,255],m:2,p:.1}];
  draw=()=>{clear();const ph=PH(),cx=W/2,cy=H/2;add();
    for(const l of LK)put(sd(l.c,256),l.x*W+sn(l.m,ph,l.p)*150,l.y*H+sn(l.m,ph,l.p+.25)*90,l.r,.2+.08*sn(l.m+1,ph,l.p));
    const vis=sm(-120,260,src.x)*(1-sm(W-260,W+120,src.x)),sx=src.x,sy=src.y;
    if(vis>.01){const dx=cx-sx,dy=cy-sy;
      put(spr([255,230,190],256),sx,sy,230,vis);put(spr([255,255,255],128),sx,sy,70,vis);
      ctx.save();ctx.translate(sx,sy);ctx.scale(1,.035);ctx.globalAlpha=vis*.85;ctx.drawImage(spr([90,150,255],256),-1200,-1200,2400,2400);ctx.globalAlpha=vis*.5;ctx.drawImage(spr([255,255,255],256),-500,-500,1000,1000);ctx.restore();
      ctx.save();ctx.translate(sx,sy);ctx.rotate(TAU*ph*.02);ctx.globalAlpha=vis*.5;for(let i=0;i<14;i++){const an=i/14*TAU,len=260+170*Math.abs(Math.sin(i*2.1+1)),gr=ctx.createLinearGradient(0,0,Math.cos(an)*len,Math.sin(an)*len);gr.addColorStop(0,'rgba(255,225,170,.5)');gr.addColorStop(1,'rgba(255,225,170,0)');ctx.strokeStyle=gr;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*len,Math.sin(an)*len);ctx.stroke()}ctx.restore();
      for(const [k,r,c,a] of G){const gx=sx+dx*k,gy=sy+dy*k,edge=1-Math.min(1,Math.hypot(gx-cx,gy-cy)/1300);put(bk(c,128),gx,gy,r*400*.5+26,vis*a*(.5+.5*edge))}
      ctx.strokeStyle='rgba(255,210,150,.18)';ctx.lineWidth=14;ctx.globalAlpha=vis;ctx.beginPath();ctx.arc(sx,sy,190,0,TAU);ctx.stroke();ctx.strokeStyle='rgba(120,180,255,.15)';ctx.lineWidth=6;ctx.beginPath();ctx.arc(sx,sy,215,0,TAU);ctx.stroke()}
    nrm()}};
