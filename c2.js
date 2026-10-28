/* 5 NEON LIGHT TRAIL CIRCLE - seamless loop */
C[5]=()=>{newTL();const cx=W/2,cy=H/2,R=rng(5);
  const heads=[{r:400,k:3,ph:0,c:[0,229,255]},{r:400,k:3,ph:Math.PI,c:[90,140,255]},{r:345,k:-4,ph:1,c:[255,43,214]},{r:345,k:-4,ph:1+Math.PI,c:[255,120,235]},{r:455,k:5,ph:2.2,c:[150,90,255]},{r:455,k:5,ph:2.2+Math.PI,c:[0,229,255]}];
  const ang=(h,ms)=>h.ph+Math.sign(h.k)*TAU*Math.abs(h.k)*ms/DUR;const sp=Array.from({length:14},()=>({d:R(),o:R()}));
  draw=()=>{clear();const ms=now();ctx.lineCap='round';
    const bg=ctx.createRadialGradient(cx,cy,100,cx,cy,640);bg.addColorStop(0,'rgba(20,30,70,.0)');bg.addColorStop(.62,'rgba(30,40,110,.22)');bg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    for(const r of [345,400,455]){ctx.strokeStyle='rgba(120,160,255,.09)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke()}
    ctx.globalCompositeOperation='lighter';
    for(const h of heads){const a=ang(h,ms),sg=Math.sign(h.k),N=64,tl_=3.1,dA=tl_/N;
      for(const [lw,al,wh] of [[40,.07,0],[15,.3,.25],[5,1,.8]]){for(let j=0;j<N;j++){const q=1-j/N,a1=a-sg*j*dA,a2=a-sg*(j+1)*dA;ctx.strokeStyle=rgba(mixc(h.c,[255,255,255],wh*q**3),al*q*q);ctx.lineWidth=lw*(.35+.65*q);ctx.beginPath();ctx.arc(cx,cy,h.r,Math.min(a1,a2)-.001,Math.max(a1,a2));ctx.stroke()}}
      ctx.globalAlpha=1;ctx.drawImage(spr(h.c,128),cx+Math.cos(a)*h.r-80,cy+Math.sin(a)*h.r-80,160,160);
      sp.forEach((s,i)=>{const age=s.d*.9,a2=ang(h,ms-age*1000),out=(s.o-.5)*70*age+4,rr=h.r+out,al=(1-s.d)**1.5*.9;ctx.globalAlpha=al;const z=14*(1-s.d)+4;ctx.drawImage(spr(h.c,32),cx+Math.cos(a2)*rr-z,cy+Math.sin(a2)*rr-z,z*2,z*2)});ctx.globalAlpha=1}
    ctx.globalCompositeOperation='source-over';
    for(let i=0;i<120;i++){const a=i/120*TAU-LOOP(ms)*2,on=i%10===0;ctx.fillStyle=on?'rgba(180,210,255,.55)':'rgba(120,150,255,.22)';ctx.beginPath();ctx.arc(cx+Math.cos(a)*520,cy+Math.sin(a)*520,on?3:1.6,0,TAU);ctx.fill()}};
};
/* 6 RED ENERGY PLASMA RING - seamless loop */
C[6]=()=>{newTL();const cx=W/2,cy=H/2,Rr=360,F=30,Rg=rng(66);const spk=Array.from({length:90},()=>({a:Rg()*TAU,d:Rg(),s:Rg(),k:2+(Rg()*3|0)}));
  const cols=[[255,25,45],[255,70,40],[255,90,70],[255,40,80]];
  draw=()=>{clear();const ms=now(),th=LOOP(ms);
    const bl=ctx.createRadialGradient(cx,cy,Rr-190,cx,cy,Rr+260);bl.addColorStop(0,'rgba(120,0,15,0)');bl.addColorStop(.33,'rgba(190,10,30,.16)');bl.addColorStop(.43,'rgba(255,30,40,.34)');bl.addColorStop(.52,'rgba(255,40,40,.14)');bl.addColorStop(1,'rgba(80,0,10,0)');ctx.fillStyle=bl;ctx.fillRect(0,0,W,H);
    const ih=ctx.createRadialGradient(cx,cy,0,cx,cy,Rr);ih.addColorStop(0,'rgba(90,0,12,.0)');ih.addColorStop(1,`rgba(160,0,25,${.1+.05*Math.sin(th*4)})`);ctx.fillStyle=ih;ctx.beginPath();ctx.arc(cx,cy,Rr,0,TAU);ctx.fill();
    ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';
    for(let i=0;i<F;i++){const amp=12+58*fr(i*.618+.2),c=cols[i%4],hot=i<7,pts=[];
      for(let k=0;k<=220;k++){const a=k/220*TAU,ca=Math.cos(a),sa=Math.sin(a);
        const n=noise(ca*1.5+i*7.13+Math.cos(th)*1.3,sa*1.5+Math.sin(th)*1.3+i*3.1)+.4*noise(ca*4.2+i*2.7+Math.cos(th*2)*1.6,sa*4.2+Math.sin(th*2)*1.6);
        const r=Rr+amp*n+5*Math.sin(a*14+th*(i%2?3:-3)+i);pts.push(cx+ca*r,cy+sa*r)}
      ctx.strokeStyle=rgba(c,1);for(const [lw,al] of hot?[[10,.05],[2.6,.6],[1.2,.95]]:[[8,.045],[1.8,.5]]){ctx.globalAlpha=al;ctx.lineWidth=lw;ctx.beginPath();for(let k=0;k<pts.length;k+=2)k?ctx.lineTo(pts[k],pts[k+1]):ctx.moveTo(pts[0],pts[1]);ctx.closePath();ctx.stroke()}
      if(hot){ctx.globalAlpha=.32;ctx.strokeStyle='rgba(255,200,190,1)';ctx.lineWidth=.9;ctx.beginPath();for(let k=0;k<pts.length;k+=2)k?ctx.lineTo(pts[k],pts[k+1]):ctx.moveTo(pts[0],pts[1]);ctx.closePath();ctx.stroke()}}
    ctx.globalAlpha=1;for(let j=0;j<3;j++){const a=th*(j+1)+j*2.1;ctx.drawImage(spr([255,60,60],128),cx+Math.cos(a)*Rr-80,cy+Math.sin(a)*Rr-80,160,160)}
    for(const s of spk){const u=fr(ms/DUR*s.k+s.d),a=s.a+Math.sin(u*5+s.s*9)*.05,r=Rr+10+u*(120+s.s*170);ctx.globalAlpha=(1-u)**1.3*.95;const z=(11+s.s*9)*(1-u*.6);ctx.drawImage(spr(s.s>.6?[255,170,90]:[255,60,60],32),cx+Math.cos(a)*r-z,cy+Math.sin(a)*r-z,z*2,z*2)}
    const bs=Math.floor(ms/90),Rb=rng(bs*131+7);ctx.globalAlpha=.8;ctx.lineWidth=2.4;
    for(let b=0;b<2;b++){if(Rb()<.55){let a=Rb()*TAU,x=cx+Math.cos(a)*Rr,y=cy+Math.sin(a)*Rr,L=60+Rb()*130;ctx.strokeStyle='rgba(255,110,90,1)';ctx.beginPath();ctx.moveTo(x,y);for(let q=0;q<7;q++){const t=(q+1)/7;ctx.lineTo(x+(cx-x)*t*L/Rr*1.2+(Rb()-.5)*36,y+(cy-y)*t*L/Rr*1.2+(Rb()-.5)*36)}ctx.stroke()}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
/* 7 RED CRITICAL ERROR MESSAGE */
C[7]=()=>{const g={sc:.55,a:0,n:0,out:0};newTL();const bursts=[2.2,5.4,8.6,11.8];
  A(g,{sc:.55,a:0},{sc:1,a:1},.3,.7,'back.out(2)');A(g,{n:0},{n:1},1.4,3.2,'none');A(g,{out:0},{out:1},14.4,.6,'power1.in');
  const L=["ERROR CODE : 0xC000021A","MODULE     : kernel_core.sys","STATUS     : FATAL SYSTEM FAILURE","> process terminated unexpectedly"],tot=L.reduce((a,b)=>a+b.length,0);
  const px=W/2-640,py=H/2-300,pw=1280,ph=600;
  draw=()=>{clear();const ms=now(),sec=ms/1000;let gb=0;for(const b of bursts){const d=sec-b;if(d>0&&d<.4)gb=Math.max(gb,1-d/.4)}
    const sir=.5+.5*Math.sin(TAU*ms/1500),R=rng(Math.round(ms/33.3)*17+3);
    const vg=ctx.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.9);vg.addColorStop(0,'rgba(255,0,0,0)');vg.addColorStop(1,`rgba(255,0,10,${.12+.28*sir})`);ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,40,40,.035)';for(let y=0;y<H;y+=4)ctx.fillRect(0,y,W,1);
    if(g.a<=0)return;ctx.globalAlpha=g.a*(1-g.out);const sx=gb*(R()-.5)*30,sy=gb*(R()-.5)*14;
    ctx.save();ctx.translate(W/2+sx,H/2+sy);ctx.scale(g.sc,g.sc);ctx.translate(-W/2,-H/2);
    ctx.save();ctx.shadowColor='rgba(255,20,30,.8)';ctx.shadowBlur=60*S;roundRect(px,py,pw,ph,14);ctx.fillStyle='#120305';ctx.fill();ctx.restore();
    const pg=ctx.createLinearGradient(0,py,0,py+ph);pg.addColorStop(0,'#2a0609');pg.addColorStop(1,'#0b0203');roundRect(px,py,pw,ph,14);ctx.fillStyle=pg;ctx.fill();ctx.strokeStyle='#ff2a33';ctx.lineWidth=4;ctx.stroke();
    ctx.save();roundRect(px,py,pw,ph,14);ctx.clip();ctx.fillStyle='#d1101c';ctx.fillRect(px,py,pw,60);ctx.restore();
    txt('SYSTEM ALERT',px+30,py+31,{f:'JetBrains Mono',w:700,size:24,al:'left',ls:5,fill:'#fff'});txt('X',px+pw-40,py+31,{f:'JetBrains Mono',w:700,size:30,fill:'#fff'});
    const ix=px+205,iy=py+330,pu=1+.05*Math.sin(TAU*ms/1000);ctx.save();ctx.translate(ix,iy);ctx.scale(pu,pu);
    ctx.shadowColor='rgba(255,30,40,.95)';ctx.shadowBlur=50*S;ctx.beginPath();ctx.moveTo(0,-115);ctx.lineTo(125,95);ctx.lineTo(-125,95);ctx.closePath();ctx.lineJoin='round';ctx.lineWidth=22;ctx.strokeStyle='#ff2a33';ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle='#ff2a33';ctx.fill();
    txt('!',0,22,{f:'Montserrat',w:900,size:140,fill:'#12030a'});ctx.restore();
    const hx=px+390;for(const [s,y] of [['CRITICAL',py+158],['ERROR',py+268]]){const flick=(sec>1.2&&Math.sin(ms*.05)>.96)?.55:1;ctx.globalAlpha=g.a*(1-g.out)*flick;
      txt(s,hx,y,{f:'Orbitron',w:900,size:112,al:'left',ls:6,fill:'#ff2e36',glow:[['rgba(255,20,30,.9)',36]]});
      if(gb>0.01){for(let q=0;q<4;q++){const yy=y-50+R()*100,hh=8+R()*26,dx=(R()-.5)*90*gb;ctx.save();ctx.beginPath();ctx.rect(hx-80,yy,900,hh);ctx.clip();ctx.globalCompositeOperation='lighter';txt(s,hx+dx,y,{f:'Orbitron',w:900,size:112,al:'left',ls:6,fill:q%2?'#00e5ff':'#ff2a6a'});ctx.restore()}}}
    ctx.globalAlpha=g.a*(1-g.out);let left=Math.floor(g.n*tot),ly=py+352;for(const s of L){const k=clamp(left,0,s.length);left-=s.length;txt(s.slice(0,k),hx,ly,{f:'JetBrains Mono',w:700,size:27,al:'left',ls:1,fill:s[0]==='>'?'#ffb3b8':'#ff6a70'});ly+=38}
    for(const [t,bx,on] of [['RETRY',px+pw-480,true],['ABORT',px+pw-250,false]]){const fl=on?.6+.4*sir:1;roundRect(bx,py+ph-100,200,62,8);ctx.fillStyle=on?`rgba(255,42,51,${.25+.5*fl})`:'rgba(255,255,255,.06)';ctx.fill();ctx.strokeStyle=on?'#ff2a33':'rgba(255,120,120,.5)';ctx.lineWidth=3;ctx.stroke();txt(t,bx+100,py+ph-69,{f:'JetBrains Mono',w:700,size:24,ls:4,fill:on?'#fff':'#ff9a9f'})}
    ctx.restore();ctx.globalAlpha=1};
};
/* 8 SOFTWARE ALERT RUBBER STAMP */
C[8]=()=>{newTL();const sw=1480,sh=470,R=rng(88);
  const sc=offscreen(sw*S,sh*S),sx=sc.getContext('2d');sx.scale(S,S);sx.fillStyle=sx.strokeStyle='#d3181c';sx.lineJoin='round';
  sx.lineWidth=20;sx.beginPath();sx.roundRect(14,14,sw-28,sh-28,26);sx.stroke();sx.lineWidth=7;sx.beginPath();sx.roundRect(52,52,sw-104,sh-104,12);sx.stroke();
  let fs=170;sx.font=`900 ${fs}px "Montserrat"`;sx.letterSpacing='6px';while(sx.measureText('SOFTWARE ALERT').width>sw-210)sx.font=`900 ${fs-=4}px "Montserrat"`;
  sx.textAlign='center';sx.textBaseline='middle';sx.lineWidth=6;sx.strokeText('SOFTWARE ALERT',sw/2+3,sh/2+6);sx.fillText('SOFTWARE ALERT',sw/2+3,sh/2+6);sx.letterSpacing='0px';
  const mw=320,mh=Math.round(mw*sh/sw),mk=offscreen(mw,mh),mx=mk.getContext('2d'),md=mx.createImageData(mw,mh);
  for(let y=0;y<mh;y++)for(let x=0;x<mw;x++){const n=fbm(x*.07,y*.07,3)+.55*noise(x*.4,y*.4),a=clamp((n-.38)*3.4,0,1)*255,k=(y*mw+x)*4;md.data[k]=md.data[k+1]=md.data[k+2]=0;md.data[k+3]=a}
  mx.putImageData(md,0,0);sx.setTransform(1,0,0,1,0,0);sx.globalCompositeOperation='destination-out';sx.drawImage(mk,0,0,sw*S,sh*S);
  for(let i=0;i<1500;i++){sx.globalAlpha=.5+R()*.5;sx.beginPath();sx.arc(R()*sw*S,R()*sh*S,(.5+R()**3*5)*S,0,TAU);sx.fill()}
  for(let i=0;i<14;i++){sx.globalAlpha=.7;sx.lineWidth=(1+R()*2)*S;sx.beginPath();const x=R()*sw*S,y=R()*sh*S;sx.moveTo(x,y);sx.lineTo(x+(R()-.5)*400*S,y+(R()-.5)*60*S);sx.stroke()}sx.globalAlpha=1;
  const g={sc:3.6,a:0,sq:1,sh:0,rg:0,fo:0,push:0,rot:-.3};
  A(g,{sc:3.6,rot:-.3},{sc:1,rot:-.115},.7,.17,'power4.in');A(g,{a:0},{a:1},.7,.08);
  A(g,{sq:1.07},{sq:1},.87,.5,'elastic.out(1,.35)');A(g,{sh:1},{sh:0},.87,.8,'power3.out');A(g,{rg:0},{rg:1},.87,1.1,'power2.out');A(g,{push:0},{push:1},.9,13.5,'none');A(g,{fo:0},{fo:1},14.4,.6,'power1.in');
  const dr=Array.from({length:70},()=>({a:R()*TAU,d:60+R()*300,r:1.5+R()**2*9}));
  draw=()=>{clear();const ms=now();const vg=ctx.createRadialGradient(W/2,H/2,200,W/2,H/2,1000);vg.addColorStop(0,'#141010');vg.addColorStop(1,'#000');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);if(g.a<=0)return;
    const shx=g.sh*(Math.sin(ms*.09)*16),shy=g.sh*(Math.cos(ms*.11)*12),k=g.sc*g.sq*(1+.04*g.push);
    ctx.save();ctx.translate(W/2+shx,H/2+shy);ctx.rotate(g.rot);ctx.scale(k,k);ctx.globalAlpha=g.a*(1-g.fo);ctx.drawImage(sc,-sw/2,-sh/2,sw,sh);
    if(g.rg>0&&g.rg<1){ctx.globalAlpha=(1-g.rg)*(1-g.fo);ctx.fillStyle='#d3181c';for(const d of dr){const e=ez('power2.out',g.rg);ctx.beginPath();ctx.arc(Math.cos(d.a)*(sw/2+d.d*e*.9),Math.sin(d.a)*(sh/2+d.d*e*.55),d.r*(1-g.rg*.4),0,TAU);ctx.fill()}}
    ctx.restore();if(g.rg>0&&g.rg<1){ctx.strokeStyle=rgba([255,90,80],(1-g.rg)*.5);ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(W/2,H/2,sw*.5*(1+g.rg*.6),sh*.5*(1+g.rg*.9),g.rot,0,TAU);ctx.stroke()}ctx.globalAlpha=1};
};
