/* 17 MEGA SALE 50% OFF STARBURST BADGE */
C[17]=()=>{const g={sc:0,rb:0,out:0};newTL();A(g,{sc:0},{sc:1},.4,1.5,'elastic.out(1,.45)');A(g,{rb:0},{rb:1},1.6,.8,'power4.out');A(g,{out:0},{out:1},14.4,.6,'power1.in');
  const star=(cx,cy,n,ro,ri)=>{ctx.beginPath();for(let i=0;i<n*2;i++){const a=i/(n*2)*TAU-Math.PI/2,r=i%2?ri:ro;i?ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}ctx.closePath()};
  const cx=W/2,cy=H/2-40,R=rng(17),sp=Array.from({length:14},()=>({a:R()*TAU,d:430+R()*260,k:1+(R()*3|0),p:R()}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms);ctx.save();ctx.translate(cx,cy);ctx.rotate(th);const n=32;for(let i=0;i<n;i++){ctx.fillStyle=i%2?'#a80016':'#d3001e';ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,1700,i/n*TAU,(i+1)/n*TAU);ctx.closePath();ctx.fill()}ctx.restore();
    const vg=ctx.createRadialGradient(cx,cy,100,cx,cy,1100);vg.addColorStop(0,'rgba(255,90,60,.35)');vg.addColorStop(1,'rgba(40,0,5,.75)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
    ctx.save();ctx.translate(cx,cy);const k=g.sc*(1+.025*Math.sin(TAU*ms/1500));ctx.rotate(.06*Math.sin(TAU*ms/3000));ctx.scale(k,k);
    ctx.save();ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=60*S;ctx.shadowOffsetY=25*S;star(0,0,24,420,365);ctx.fillStyle='#ffcf00';ctx.fill();ctx.restore();
    const gr=ctx.createLinearGradient(0,-420,0,420);gr.addColorStop(0,'#ffe44d');gr.addColorStop(1,'#ffb300');star(0,0,24,420,365);ctx.fillStyle=gr;ctx.fill();ctx.lineWidth=10;ctx.strokeStyle='#ff8a00';ctx.stroke();
    ctx.beginPath();ctx.arc(0,0,330,0,TAU);ctx.setLineDash([4,18]);ctx.lineWidth=6;ctx.strokeStyle='rgba(180,0,20,.7)';ctx.stroke();ctx.setLineDash([]);
    txt('MEGA SALE',0,-230,{f:'Bebas Neue',w:400,size:150,ls:10,fill:'#b0001a'});txt('50%',0,-5,{f:'Montserrat',w:900,size:330,fill:'#d3001e',stroke:'#fff',lw:6,ls:-8});txt('OFF',0,185,{f:'Bebas Neue',w:400,size:180,ls:30,fill:'#b0001a'});
    ctx.save();star(0,0,24,420,365);ctx.clip();const sw=((ms/3000)%1)*3-1.2,sg=ctx.createLinearGradient(sw*700-150,-300,sw*700+150,300);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.35)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(-500,-500,1000,1000);ctx.restore();ctx.restore();
    ctx.globalCompositeOperation='lighter';for(const s of sp){const u=fr(ms/DUR*s.k+s.p),a=Math.sin(u*Math.PI);flare(cx+Math.cos(s.a)*s.d,cy+Math.sin(s.a)*s.d*.8,40*a*g.sc+2,a*.9,'#fff2a8')}ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    const ry=H-130+(1-g.rb)*200;ctx.save();ctx.translate(W/2,ry);ctx.transform(1,0,-.15,1,0,0);ctx.fillStyle='#1a0006';ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=30*S;ctx.fillRect(-520,-50,1040,100);ctx.restore();txt('LIMITED TIME ONLY',W/2,ry+3,{f:'Montserrat',w:800,size:50,ls:14,fill:'#ffe44d'});
    if(g.out>0){ctx.fillStyle=`rgba(0,0,0,${g.out})`;ctx.fillRect(0,0,W,H)}};
};
/* 18 LIQUID GRADIENT METABALLS - seamless loop */
C[18]=()=>{newTL();const gw=480,gh=270,gc=offscreen(gw,gh),gx=gc.getContext('2d'),gd=gx.createImageData(gw,gh),R=rng(18);
  const cols=[[255,50,140],[255,150,50],[130,70,255],[255,80,90],[255,200,80],[90,110,255],[255,60,200],[255,120,70]];
  const B=cols.map((c,i)=>({c,ax:.25+R()*.2,ay:.2+R()*.18,kx:1+(R()*3|0),ky:1+(R()*3|0),px:R()*TAU,py:R()*TAU,r:20+R()*20,cx:.5+(R()-.5)*.4,cy:.5+(R()-.5)*.3}));
  draw=()=>{const ms=now(),th=LOOP(ms),d=gd.data,bl=B.map(b=>({x:(b.cx+b.ax*Math.sin(th*b.kx+b.px))*gw,y:(b.cy+b.ay*Math.cos(th*b.ky+b.py))*gh,r2:b.r*b.r,c:b.c}));
    for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){let f=0,r=0,g=0,b=0;for(const o of bl){const dx=x-o.x,dy=y-o.y,w=o.r2/(dx*dx+dy*dy+4);f+=w;r+=w*o.c[0];g+=w*o.c[1];b+=w*o.c[2]}
      r/=f;g/=f;b/=f;const k=(y*gw+x)*4,bgm=(x/gw*.5+y/gh*.5),br=18+30*bgm,bg_=[br,4,50+40*bgm],body=sm(.92,1.12,f),q=clamp((f-1)/8,0,1),lt=.1*q,rim=Math.exp(-(((f-1)/.2)**2))*.18;
      d[k]=clamp(lerp(bg_[0],r+(255-r)*lt,body)+255*rim,0,255);d[k+1]=clamp(lerp(bg_[1],g+(255-g)*lt,body)+220*rim,0,255);d[k+2]=clamp(lerp(bg_[2],b+(255-b)*lt,body)+210*rim,0,255);d[k+3]=255}
    gx.putImageData(gd,0,0);ctx.setTransform(S,0,0,S,0,0);ctx.globalCompositeOperation='source-over';ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(gc,0,0,W,H);
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.3;ctx.filter=`blur(${40*S}px)`;ctx.drawImage(gc,0,0,W,H);ctx.restore();
    const v=ctx.createRadialGradient(W/2,H/2,H*.4,W/2,H/2,H*1.0);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,10,.5)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
/* 19 HYPERSPACE STARFIELD WARP - seamless loop */
C[19]=()=>{newTL();const R=rng(19),N=1300,st=Array.from({length:N},()=>{const a=R()*TAU,r=.05+Math.sqrt(R())*1.3,h=R();return{x:Math.cos(a)*r,y:Math.sin(a)*r,u0:R(),k:4,c:h<.6?[210,225,255]:h<.8?[120,220,255]:h<.92?[190,140,255]:[255,170,220]}});
  draw=()=>{clear();const ms=now(),th=LOOP(ms),cx=W/2,cy=H/2;
    for(const [h,r,a,k] of [[225,900,.22,1],[275,800,.16,-1],[190,700,.12,1]]){const x=cx+Math.cos(th*k+h)*260,y=cy+Math.sin(th*k*2+h)*140,g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,hsl(h,90,45,a));g.addColorStop(1,hsl(h,90,45,0));ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
    ctx.save();ctx.translate(cx,cy);ctx.rotate(.07*Math.sin(th));ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
    const pulse=.9+.1*Math.sin(th*4);
    for(const s of st){const u=fr(ms/DUR*s.k+s.u0),z=Math.max(.02,1-u*.99),zt=Math.min(1.4,z+.16*pulse*(1.2-u*.5)),px=s.x*430/z,py=s.y*430/z,tx=s.x*430/zt,ty=s.y*430/zt;
      if(Math.abs(px)>1200||Math.abs(py)>700)continue;const al=sm(0,.12,u)*(.55+.45*u),w=1+4.2*u*u;ctx.strokeStyle=rgba(s.c,al);ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(px,py);ctx.stroke()}
    ctx.restore();const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,200);cg.addColorStop(0,`rgba(180,210,255,${.28*pulse})`);cg.addColorStop(1,'rgba(80,120,255,0)');ctx.globalCompositeOperation='lighter';ctx.fillStyle=cg;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='source-over';
    const v=ctx.createRadialGradient(cx,cy,H*.35,cx,cy,H*1.0);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,8,.55)');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)};
};
/* 20 ONE MILLION FOLLOWERS MILESTONE ODOMETER */
C[20]=()=>{const g={lau:0,lab:0,fol:0,burst:0,out:0};newTL();const T=[1,0,0,0,0,0,0],cols=T.map((t,i)=>{const c={v:0,end:.8+3+(6-i)*.45};A(c,{v:0},{v:t+10*(2+i)},.8,3+(6-i)*.45,'power4.out');return c});
  const done=.8+3+6*.45;A(g,{lau:0},{lau:1},done,1,'back.out(2)');A(g,{lab:0},{lab:1},.3,.8,'power2.out');A(g,{fol:0},{fol:1},done+.2,.9,'power3.out');A(g,{burst:0},{burst:1},done,2.4,'power2.out');A(g,{out:0},{out:1},14.4,.6,'power1.in');
  const R=rng(20),FS=250,cw=178,cm=52,tot=7*cw+2*cm,x0=W/2-tot/2,cy=H/2-20,LHd=250,parts=Array.from({length:80},()=>({a:R()*TAU,d:200+R()*700,r:3+R()*7,s:R()})),fl=Array.from({length:30},()=>({x:R()*W,y:R()*H,k:1+(R()*3|0),p:R()}));
  const colX=i=>x0+i*cw+(i>0?cm:0)+(i>3?cm:0)+cw/2;
  draw=()=>{clear();const ms=now(),th=LOOP(ms),fade=1-g.out;
    const bg=ctx.createRadialGradient(W/2,cy,0,W/2,cy,950);bg.addColorStop(0,'rgba(130,90,10,.34)');bg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';for(const f of fl){const y=((f.y+ms*.015*f.k)%H);ctx.globalAlpha=.25*(.5+.5*Math.sin(th*f.k*2+f.p*9));ctx.drawImage(spr([255,200,90],32),f.x-14,y-14,28,28)}ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    ctx.globalAlpha=fade;txt('MILESTONE REACHED',W/2,cy-250,{f:'Montserrat',w:700,size:40,ls:24,a:g.lab,fill:'#f0cd78'});
    const gr=ctx.createLinearGradient(0,cy-130,0,cy+130);gr.addColorStop(0,'#fff0b0');gr.addColorStop(.5,'#f2b93b');gr.addColorStop(1,'#b87a14');
    cols.forEach((c,i)=>{const x=colX(i);ctx.save();roundRect(x-cw/2+6,cy-135,cw-12,270,18);ctx.fillStyle='rgba(20,14,4,.9)';ctx.fill();ctx.strokeStyle='rgba(240,190,80,.45)';ctx.lineWidth=3;ctx.stroke();ctx.clip();
      const spin=ms<c.end*1000+400,base=Math.floor(c.v);for(let k=base-2;k<=base+3;k++){const dy=(k-c.v),d=((k%10)+10)%10,al=clamp(1-Math.abs(dy)*.75,0,1);if(al<=0)continue;ctx.font=`900 ${FS}px "Montserrat"`;ctx.textAlign='center';ctx.textBaseline='middle';
        for(const gh of spin?[-.1,0,.1]:[0]){ctx.globalAlpha=fade*al*(gh?.35:1);ctx.fillStyle=gr;ctx.fillText(String(d),x,cy+(dy+gh)*LHd+12)}}
      ctx.restore()});ctx.globalAlpha=fade;
    for(const i of [0,3]){const x=colX(i)+cw/2+cm/2;txt(',',x,cy+80,{f:'Montserrat',w:900,size:FS,fill:'#f2b93b'})}
    const sw=((ms-10000)%3000)/3000;if(ms>10000&&sw<1){ctx.save();ctx.beginPath();ctx.rect(x0,cy-135,tot,270);ctx.clip();const sx=x0-200+sw*(tot+400),sg=ctx.createLinearGradient(sx-90,0,sx+90,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.4)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(sx-90,cy-135,180,270);ctx.restore()}
    txt('FOLLOWERS',W/2,cy+260+(1-g.fol)*30,{f:'Montserrat',w:800,size:78,ls:34,a:g.fol,fill:'#fff'});
    if(g.lau>0){for(const sd of [-1,1]){ctx.save();ctx.translate(W/2+sd*(tot/2+150),cy+10);ctx.scale(sd*g.lau*1.25,g.lau*1.25);for(let i=0;i<9;i++){const a=-1.1+i*.28,r=190;ctx.save();ctx.translate(-Math.cos(a)*r*.45+0,Math.sin(a)*r*1.2);ctx.rotate(a*.9-.5);const lg=ctx.createLinearGradient(-8,-26,8,26);lg.addColorStop(0,'#fff0b0');lg.addColorStop(1,'#b87a14');ctx.fillStyle=lg;ctx.beginPath();ctx.ellipse(0,0,13,36,0,0,TAU);ctx.fill();ctx.restore()}ctx.restore()}}
    if(g.burst>0&&g.burst<1){ctx.globalCompositeOperation='lighter';const e=ez('power3.out',g.burst);for(const p of parts){ctx.globalAlpha=(1-g.burst)*fade;ctx.fillStyle=p.s<.5?'#ffd76a':'#fff3c0';ctx.beginPath();ctx.arc(W/2+Math.cos(p.a)*p.d*e,cy+Math.sin(p.a)*p.d*e*.7+g.burst*g.burst*160*p.s,p.r*(1-g.burst*.6),0,TAU);ctx.fill()}
      ctx.strokeStyle=rgba([255,215,120],(1-g.burst)*.7);ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(W/2,cy,tot*.5*(.4+e*1.2),150*(.4+e*1.6),0,0,TAU);ctx.stroke();ctx.globalCompositeOperation='source-over'}
    ctx.globalAlpha=1;if(g.out>0){ctx.fillStyle=`rgba(0,0,0,${g.out})`;ctx.fillRect(0,0,W,H)}};
};
