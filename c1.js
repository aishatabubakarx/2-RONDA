/* 1 LOADING DATA HUD - minimal white bar on black */
C[1]=()=>{const g={v:0,f:0,p:0};newTL();
  A(g,{f:0},{f:1},0,.8,'power2.out');
  let pv=0;[[.8,18,1.6],[2.9,41,2.1],[5.4,47,1.5],[7,79,2.5],[9.9,92,1.7],[11.9,100,1.1]].forEach(([t,v,d])=>{A(g,{v:pv},{v},t,d,'power2.inOut');pv=v});
  A(g,{p:0},{p:1},13,1.3,'power2.out');A(g,{f:1},{f:0},14.4,.6,'power1.in');
  const x0=360,x1=1560,y=H/2+20,bw=x1-x0,dw=tw('loading','Montserrat',700,38,10);
  draw=()=>{clear();const ms=now(),v=g.v;ctx.globalAlpha=g.f;
    ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=2;for(const [cx,cy,sx,sy] of [[70,70,1,1],[W-70,70,-1,1],[70,H-70,1,-1],[W-70,H-70,-1,-1]]){ctx.beginPath();ctx.moveTo(cx+sx*46,cy);ctx.lineTo(cx,cy);ctx.lineTo(cx,cy+sy*46);ctx.stroke()}
    txt(Math.round(v)+'%',x1,y-118,{f:'Montserrat',w:800,size:170,al:'right',ls:-4});
    txt('loading',x0,y-52,{f:'Montserrat',w:700,size:38,al:'left',ls:10,fill:'rgba(255,255,255,.92)'});
    if(v<100)txt('.'.repeat(Math.floor(ms/380)%4),x0+dw+4,y-52,{f:'Montserrat',w:700,size:38,al:'left',ls:10,fill:'rgba(255,255,255,.92)'});
    ctx.fillStyle='rgba(255,255,255,.14)';ctx.fillRect(x0,y-6,bw,12);
    ctx.save();ctx.shadowColor='rgba(255,255,255,.95)';ctx.shadowBlur=26*S;ctx.fillStyle='#fff';ctx.fillRect(x0,y-6,bw*v/100,12);ctx.restore();ctx.fillStyle='#fff';ctx.fillRect(x0,y-6,bw*v/100,12);
    for(let i=0;i<=10;i++){ctx.fillStyle=i*10<=v?'rgba(255,255,255,.8)':'rgba(255,255,255,.28)';ctx.fillRect(x0+bw*i/10-1,y+18,2,i%5===0?18:10)}
    txt('DATA  '+(v/100*4.8).toFixed(2)+' / 4.80 GB',x0,y+74,{f:'JetBrains Mono',w:700,size:22,al:'left',ls:3,fill:'rgba(255,255,255,.5)'});
    txt('PKT '+String(Math.floor(v*371+ms*.02)%100000).padStart(5,'0'),x1,y+74,{f:'JetBrains Mono',w:700,size:22,al:'right',ls:3,fill:'rgba(255,255,255,.5)'});
    if(g.p>0&&g.p<1){ctx.strokeStyle=rgba([255,255,255],(1-g.p)*.8);ctx.lineWidth=3;const e=g.p*60;ctx.strokeRect(x0-e,y-6-e,bw+e*2,12+e*2)}};
};
/* 2 HOT PINK GRADIENT FLOWING WAVY LINES - seamless loop */
C[2]=()=>{const N=64;newTL();
  draw=()=>{const ms=now(),th=LOOP(ms);ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';
    const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#14000b');bg.addColorStop(.55,'#3d0022');bg.addColorStop(1,'#12000a');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    const rg=ctx.createRadialGradient(W*.62,H*.5,0,W*.62,H*.5,W*.55);rg.addColorStop(0,'rgba(255,30,140,.28)');rg.addColorStop(1,'rgba(255,30,140,0)');ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.lineJoin='round';
    for(let i=0;i<N;i++){const u=i/(N-1),base=H*.5+(u-.5)*H*.78,pts=[];
      for(let x=-40;x<=W+40;x+=16){
        const y=base+Math.sin(x*.0021+u*5.2+th*2)*150*(.35+.65*Math.sin(u*Math.PI))+lnoise(x*.0011+u*.8,u*1.7,th,1.1)*130+Math.sin(x*.0047-u*9+th*3)*26;pts.push(x,y)}
      const gr=ctx.createLinearGradient(0,0,W,0);const h=332+16*Math.sin(u*6+th),l=58+14*Math.sin(u*3+th*2);
      gr.addColorStop(0,hsl(h-14,100,40,0));gr.addColorStop(.25,hsl(h,100,l,.85));gr.addColorStop(.6,hsl(h+10,100,l+14,.95));gr.addColorStop(1,hsl(h+26,100,50,0));
      ctx.strokeStyle=gr;for(const [lw,al] of [[7,.07],[1.8,1]]){ctx.globalAlpha=al*(.4+.6*Math.sin(u*Math.PI)**.6);ctx.lineWidth=lw;ctx.beginPath();for(let k=0;k<pts.length;k+=2)k?ctx.lineTo(pts[k],pts[k+1]):ctx.moveTo(pts[0],pts[1]);ctx.stroke()}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
/* 3 DARK GLITCH TEXTURE - horizontal static distortion, seamless (random per frame) */
C[3]=()=>{newTL();const gw=480,gh=270,gc=offscreen(gw,gh),gx=gc.getContext('2d'),gd=gx.createImageData(gw,gh);
  const sl=offscreen(1,4),sx=sl.getContext('2d');sx.fillStyle='rgba(0,0,0,.35)';sx.fillRect(0,0,1,2);let pat=null;
  draw=()=>{const ms=now(),fi=Math.round(ms/33.333),R=rng(fi*7919+13),it=clamp(.45+.55*Math.abs(noise(ms/900,4.2))*1.6+(fi%75<6?.5:0),0,1.4);
    ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.fillStyle='#050608';ctx.fillRect(0,0,W,H);
    const d=gd.data;for(let i=0;i<gw*gh;i++){const v=R()**3*255*(.5+.5*it)|0,k=i*4;d[k]=v;d[k+1]=v;d[k+2]=v;d[k+3]=255}gx.putImageData(gd,0,0);
    ctx.globalAlpha=.5;ctx.imageSmoothingEnabled=false;ctx.drawImage(gc,0,0,W,H);ctx.imageSmoothingEnabled=true;ctx.globalAlpha=1;
    for(let i=0;i<260*it+60;i++){const y=R()*H,x=R()*W-200,l=60+R()**2*1300,h=1+(R()<.25?R()*7:0),r=R();ctx.globalAlpha=.12+R()*.7*it;ctx.fillStyle=r<.6?'#dfe8ee':r<.8?'#00f0ff':'#ff2a7a';ctx.fillRect(x,y,l,h)}
    ctx.globalAlpha=1;for(let i=0;i<4;i++){const y=((ms*.35*(1+i*.4)+i*271)%(H+300))-150,hh=60+i*40,gr=ctx.createLinearGradient(0,y,0,y+hh);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,`rgba(200,230,255,${.04+.04*it})`);gr.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gr;ctx.fillRect(0,y,W,hh)}
    for(let i=0;i<4;i++){if(R()<.7){const y=R()*H,h=6+R()*60,x=R()*W*.6,w=200+R()*900;ctx.globalAlpha=.05+R()*.14*it;ctx.fillStyle='#cfe9ff';ctx.fillRect(x,y,w,h)}}ctx.globalAlpha=1;
    ctx.setTransform(1,0,0,1,0,0);const n=Math.floor(6+R()*16*it);
    for(let i=0;i<n;i++){const y=Math.floor(R()*H*S),h=Math.floor((4+R()**2*120)*S),dx=Math.round((R()-.5)*2*(60+R()*520*it)*S);ctx.drawImage(cv,0,y,W*S,h,dx,y,W*S,h);
      if(R()<.5){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55;ctx.fillStyle=R()<.5?'#00e5ff':'#ff1f6b';ctx.fillRect(0,y,W*S,Math.max(1,S*(1+R()*2)));ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1}}
    ctx.setTransform(S,0,0,S,0,0);if(!pat)pat=ctx.createPattern(sl,'repeat');ctx.fillStyle=pat;ctx.fillRect(0,0,W,H);
    const v=ctx.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,H*.95);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.75)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
/* 4 ROMANTIC RED GLOWING HANDWRITTEN HAPPY MOTHER'S DAY */
C[4]=()=>{const R=rng(44),txtS="Happy Mother's Day",SZ=172,ls=2;newTL();
  ctx.save();ctx.font=`400 ${SZ}px "Great Vibes"`;const ws=[...txtS].map(c=>ctx.measureText(c).width);ctx.restore();
  const tot=ws.reduce((a,b)=>a+b,0)+ls*(ws.length-1);let xx=W/2-tot/2;const L=[];[...txtS].forEach((c,i)=>{L.push({ch:c,x:xx+ws[i]/2,w:ws[i],p:0});xx+=ws[i]+ls});
  const vis=L.filter(l=>l.ch!==' ');vis.forEach((l,i)=>A(l,{p:0},{p:1},.9+i*.36,.62,'power1.inOut'));
  const done=.9+(vis.length-1)*.36+.62,fl={p:0,f:0},hr=Array.from({length:10},()=>({x:240+R()*1440,ph:R(),s:.35+R()*.5,sp:.6+R()*.6}));
  A(fl,{p:0},{p:1},done+.1,1.6,'power2.inOut');A(fl,{f:0},{f:1},done,1.6,'power2.out');
  const y0=H/2-30;
  draw=()=>{clear();const ms=now(),pulse=.78+.22*Math.sin(TAU*ms/3000);
    const bgr=ctx.createRadialGradient(W/2,y0,0,W/2,y0,900);bgr.addColorStop(0,`rgba(140,0,25,${.22*Math.min(1,ms/3000)})`);bgr.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=bgr;ctx.fillRect(0,0,W,H);
    const fade=ms>14300?1-(ms-14300)/700:1;
    for(const l of L){if(l.ch===' '||l.p<=0)continue;
      ctx.save();ctx.globalAlpha=fade*l.p*pulse;ctx.font=`400 ${SZ}px "Great Vibes"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ff2a3f';
      for(const [c,b] of [['rgba(255,10,40,.95)',38],['rgba(255,0,30,.75)',90],['rgba(200,0,20,.6)',170]]){ctx.shadowColor=c;ctx.shadowBlur=b*S;ctx.shadowOffsetX=6000;ctx.fillText(l.ch,l.x-6000/S,y0);ctx.fillText(l.ch,l.x-6000/S,y0)}ctx.restore();
      ctx.save();ctx.globalAlpha=fade;ctx.beginPath();ctx.rect(l.x-l.w/2-60,y0-300,(l.w+120)*l.p,600);ctx.clip();
      ctx.font=`400 ${SZ}px "Great Vibes"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ff3a4d';ctx.fillText(l.ch,l.x,y0);ctx.globalAlpha=fade*.28*l.p;ctx.fillStyle='#ffb3ba';ctx.fillText(l.ch,l.x,y0);ctx.restore()}
    const cur=vis.find(l=>l.p>0&&l.p<1);if(cur){const px=cur.x-cur.w/2-60+(cur.w+120)*cur.p,py=y0+Math.sin(ms*.02)*40+20;ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1;ctx.drawImage(spr([255,40,60],128),px-60,py-60,120,120);ctx.globalCompositeOperation='source-over'}
    if(fl.p>0){ctx.save();ctx.globalAlpha=fade*fl.f;ctx.strokeStyle='#ff3a4d';ctx.shadowColor='rgba(255,10,40,.9)';ctx.shadowBlur=26*S;ctx.lineWidth=5;ctx.lineCap='round';const x0=W/2-tot*.42,x1=W/2+tot*.42,yy=y0+135;
      const len=1900;ctx.setLineDash([len,len]);ctx.lineDashOffset=len*(1-fl.p);ctx.beginPath();ctx.moveTo(x0,yy);ctx.bezierCurveTo(x0+320,yy-46,W/2-120,yy+34,W/2,yy-4);ctx.bezierCurveTo(W/2+160,yy-34,x1-260,yy+40,x1,yy-10);ctx.stroke();ctx.restore()}
    ctx.globalCompositeOperation='lighter';for(const h of hr){const u=fr(ms/15000*(1+Math.round(h.sp*2))+h.ph),y=H+40-u*(H+120),x=h.x+Math.sin(u*TAU*2+h.ph*9)*40,s=40*h.s+18,a=Math.sin(u*Math.PI)*.55*fl.f*fade;
      ctx.globalAlpha=a;ctx.fillStyle='#ff2a48';ctx.shadowColor='rgba(255,20,50,.9)';ctx.shadowBlur=24*S;heart(x,y,s);ctx.fill();ctx.shadowBlur=0}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
