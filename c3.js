/* 9 ABSTRACT PURPLE GLASS CUBES - 3D, seamless loop */
C[9]=()=>{newTL();const R=rng(9),FACES=[[1,3,7,5],[0,4,6,2],[2,6,7,3],[0,1,5,4],[4,5,7,6],[0,2,3,1]],NRM=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],LV=(()=>{const v=[-.5,-.6,-.62],l=Math.hypot(...v);return v.map(x=>x/l)})();
  const sg=()=>R()<.5?1:-1,cubes=Array.from({length:14},(_,i)=>({x:(R()-.5)*1700,y:(R()-.5)*760,z:(R()-.5)*900,s:85+R()**1.5*150,kx:sg()*(1+(R()*2|0)),ky:sg()*(1+(R()*2|0)),kz:R()<.5?0:sg(),px:R()*TAU,py:R()*TAU,pz:R()*TAU,fl:1+(R()*2|0),fp:R()*TAU}));
  const dust=Array.from({length:70},()=>({x:R()*W,y:R()*H,r:.8+R()*2,k:1+(R()*3|0),p:R()*TAU}));
  const rot=(v,a,b,c)=>{let [x,y,z]=v,t;t=y*Math.cos(a)-z*Math.sin(a);z=y*Math.sin(a)+z*Math.cos(a);y=t;t=x*Math.cos(b)+z*Math.sin(b);z=-x*Math.sin(b)+z*Math.cos(b);x=t;t=x*Math.cos(c)-y*Math.sin(c);y=x*Math.sin(c)+y*Math.cos(c);x=t;return[x,y,z]};
  draw=()=>{clear();const ms=now(),th=LOOP(ms),sc=.4*Math.sin(th);
    for(const [x,y,r,a] of [[W*.3,H*.35,700,.16],[W*.72,H*.68,800,.14]]){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(110,40,220,${a})`);g.addColorStop(1,'rgba(110,40,220,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
    ctx.globalCompositeOperation='lighter';for(const d of dust){ctx.globalAlpha=.25+.25*Math.sin(th*d.k+d.p);ctx.fillStyle='#b78cff';ctx.beginPath();ctx.arc(d.x,d.y+Math.sin(th*d.k+d.p)*14,d.r,0,TAU);ctx.fill()}ctx.globalAlpha=1;
    const polys=[];
    for(const c of cubes){const a=th*c.kx+c.px,b=th*c.ky+c.py,g=th*c.kz+c.pz,h=c.s/2,cy_=c.y+38*Math.sin(th*c.fl+c.fp);
      const sp=rot([c.x,cy_,c.z],0,sc,0),V=[];for(let i=0;i<8;i++){const v=rot(rot([(i&1?h:-h),(i&2?h:-h),(i&4?h:-h)],a,b,g),0,sc,0);V.push([v[0]+sp[0],v[1]+sp[1],v[2]+sp[2]])}
      FACES.forEach((f,fi)=>{const n=rot(rot(NRM[fi],a,b,g),0,sc,0),pts=f.map(i=>{const v=V[i],p=1500/(1750+v[2]);return[W/2+v[0]*p,H/2+v[1]*p,v[2]]}),z=pts.reduce((s,p)=>s+p[2],0)/4;
        polys.push({pts,z,lit:clamp(.5+.5*(n[0]*LV[0]+n[1]*LV[1]+n[2]*LV[2]),0,1),front:n[2]<0,dist:z})})}
    polys.sort((p,q)=>q.z-p.z);ctx.lineJoin='round';
    for(const p of polys){const fade=clamp(1.2-(p.z+500)/2200,.25,1),l=p.lit,fr_=p.front;
      ctx.beginPath();p.pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();
      ctx.globalAlpha=(fr_?.16+.3*l:.06+.12*l)*fade;ctx.fillStyle=rgba([120+90*l|0,45+70*l|0,235],1);ctx.fill();
      if(fr_){ctx.save();ctx.clip();const a0=p.pts[0],a2=p.pts[2],g=ctx.createLinearGradient(a0[0],a0[1],a2[0],a2[1]);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.38,'rgba(230,200,255,0)');g.addColorStop(.5,`rgba(255,255,255,${.34*l})`);g.addColorStop(.62,'rgba(230,200,255,0)');g.addColorStop(1,'rgba(255,255,255,.04)');ctx.globalAlpha=fade;ctx.fillStyle=g;ctx.fill();ctx.restore()}
      for(const [lw,al] of [[7,.07],[2,fr_?.45+.5*l:.25+.25*l]]){ctx.globalAlpha=al*fade;ctx.lineWidth=lw;ctx.strokeStyle='#d7b2ff';ctx.stroke()}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over'};
};
/* 10 GLASS CIRCLE COLOR REFRACTION - seamless loop */
C[10]=()=>{newTL();const cx=W/2,cy=H/2,Rr=310,hues=[322,190,28,268,160,350];
  const field=(th,a)=>{ctx.save();ctx.globalCompositeOperation='lighter';hues.forEach((h,k)=>{const x=W/2+560*Math.cos(th*(1+k%2)+k*1.1),y=H/2+270*Math.sin(th*(1+(k%3===0))+k*2),r=300+60*Math.sin(th*2+k);const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,hsl(h,100,55,.62*a));g.addColorStop(1,hsl(h,100,50,0));ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2)});
    ctx.globalAlpha=a;for(let i=0;i<9;i++){const x=W*(i+.5)/9+Math.sin(th*2+i)*50;ctx.fillStyle=hsl(hues[i%6],100,70,.16);ctx.fillRect(x,0,3,H)}ctx.restore()};
  draw=()=>{clear();const ms=now(),th=LOOP(ms);field(th,.5);
    ctx.save();ctx.beginPath();ctx.arc(cx,cy,Rr,0,TAU);ctx.clip();ctx.fillStyle='rgba(0,0,0,.72)';ctx.fillRect(0,0,W,H);ctx.translate(cx,cy);ctx.scale(-1.45,-1.45);ctx.translate(-cx,-cy);field(th,1);ctx.restore();
    const ih=ctx.createRadialGradient(cx,cy,Rr*.6,cx,cy,Rr);ih.addColorStop(0,'rgba(0,0,0,0)');ih.addColorStop(1,'rgba(0,0,0,.5)');ctx.fillStyle=ih;ctx.beginPath();ctx.arc(cx,cy,Rr,0,TAU);ctx.fill();
    const ph=th,dx=Math.cos(ph)*9,dy=Math.sin(ph)*9;ctx.globalCompositeOperation='lighter';
    ctx.save();ctx.filter=`blur(${9*S}px)`;const cg=ctx.createConicGradient(ph*2,cx,cy);[0,60,120,180,240,300,360].forEach((h,i)=>cg.addColorStop(i/6,hsl(h,100,60,.85)));
    ctx.beginPath();ctx.arc(cx,cy,Rr,0,TAU);ctx.arc(cx-Math.cos(ph+Math.PI)*-46,cy-Math.sin(ph+Math.PI)*-46,Rr-2,0,TAU,true);ctx.fillStyle=cg;ctx.globalAlpha=.8;ctx.fill('evenodd');ctx.restore();
    for(const [c,ox,oy] of [['255,30,70',dx,dy],['40,255,120',0,0],['40,90,255',-dx,-dy]]){for(const [lw,al] of [[24,.1],[5,.85]]){ctx.strokeStyle=`rgba(${c},${al})`;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(cx+ox,cy+oy,Rr,0,TAU);ctx.stroke()}}
    ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,Rr-24,0,TAU);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,Rr+46,0,TAU);ctx.strokeStyle='rgba(255,255,255,.07)';ctx.stroke();
    const ha=-2.4+.25*Math.sin(th);ctx.lineCap='round';for(const [r,sp,lw,al] of [[Rr-14,.95,9,.65],[Rr-14,.18,9,.55],[Rr-52,.5,3,.35]]){ctx.strokeStyle=`rgba(255,255,255,${al})`;ctx.lineWidth=lw;ctx.beginPath();ctx.arc(cx,cy,r,ha-sp/2+(sp===.18?1.25:0),ha+sp/2+(sp===.18?1.25:0));ctx.stroke()}
    ctx.globalCompositeOperation='source-over'};
};
/* 11 BREAKING NEWS ALERT */
C[11]=()=>{const g={b:0,n:0,s:0,t:0,fl:1,top:0};newTL();
  A(g,{fl:1},{fl:0},0,.5,'power2.out');A(g,{b:0},{b:1},.3,.9,'power4.out');A(g,{n:0},{n:1},.55,.9,'power4.out');A(g,{s:0},{s:1},1.5,.8,'power3.out');A(g,{t:0},{t:1},1.9,.9,'power3.out');A(g,{top:0},{top:1},2.2,.7,'back.out(2)');
  const B1=tw('BREAKING','Montserrat',900,190,0)+110,B2=tw('NEWS','Montserrat',900,190,0)+110,tk='MAJOR ANNOUNCEMENT EXPECTED TODAY  •  MARKETS RESPOND TO NEW ECONOMIC DATA  •  WEATHER ALERT ISSUED FOR COASTAL REGIONS  •  LIVE REPORTS FROM THE SCENE  •  ',TW=tw(tk,'Montserrat',700,40,3);
  draw=()=>{clear();const ms=now(),th=LOOP(ms);
    const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#02060f');bg.addColorStop(1,'#08224a');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    const gx=1380,gy=470,GR=390;ctx.lineWidth=1.6;for(let i=0;i<12;i++){const phi=th+i*Math.PI/12;ctx.strokeStyle='rgba(70,150,255,.28)';ctx.beginPath();let st=false;for(let k=-50;k<=50;k++){const lat=k/50*Math.PI/2,x=Math.cos(lat)*Math.sin(phi),z=Math.cos(lat)*Math.cos(phi),y=Math.sin(lat);if(z<0){st=false;continue}const px=gx+x*GR,py=gy+y*GR;st?ctx.lineTo(px,py):ctx.moveTo(px,py);st=true}ctx.stroke()}
    for(let j=-4;j<=4;j++){const lat=j/5*Math.PI/2,r=Math.cos(lat)*GR;ctx.strokeStyle='rgba(70,150,255,.22)';ctx.beginPath();ctx.ellipse(gx,gy+Math.sin(lat)*GR,r,r*.0001+0.1,0,0,TAU);ctx.stroke()}
    ctx.strokeStyle='rgba(90,170,255,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(gx,gy,GR,0,TAU);ctx.stroke();const gg=ctx.createRadialGradient(gx,gy,GR*.8,gx,gy,GR*1.25);gg.addColorStop(0,'rgba(60,140,255,.0)');gg.addColorStop(.45,'rgba(60,140,255,.22)');gg.addColorStop(1,'rgba(60,140,255,0)');ctx.fillStyle=gg;ctx.fillRect(0,0,W,H);
    const slab=(x,y,w,h,p,fill,t,tc)=>{const e=p;if(e<=0)return;ctx.save();ctx.translate(x-(1-e)*(w+300),y);ctx.transform(1,0,-.2,1,0,0);ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=30*S;ctx.fillStyle=fill;ctx.fillRect(0,0,w,h);ctx.shadowBlur=0;txt(t,55,h/2+6,{f:'Montserrat',w:900,size:190,al:'left',fill:tc});ctx.restore()};
    slab(130,230,B1,215,g.b,'#e2121f','BREAKING','#fff');slab(130,470,B2,215,g.n,'#fff','NEWS','#0a1f4a');
    if(g.s>0){ctx.save();ctx.beginPath();ctx.rect(130,730,1100*g.s,70);ctx.clip();ctx.fillStyle='rgba(5,15,40,.85)';ctx.fillRect(130,730,1100,70);ctx.fillStyle='#e2121f';ctx.fillRect(130,730,10,70);txt('LIVE COVERAGE  •  DEVELOPING STORY',166,766,{f:'Montserrat',w:700,size:36,al:'left',ls:6,fill:'#fff'});ctx.restore()}
    if(g.top>0){ctx.save();ctx.globalAlpha=Math.min(1,g.top);ctx.translate(W-170,92);ctx.scale(g.top,g.top);roundRect(-110,-34,220,68,8);ctx.fillStyle='#e2121f';ctx.fill();ctx.fillStyle='#fff';ctx.globalAlpha*=.55+.45*(Math.floor(ms/500)%2);ctx.beginPath();ctx.arc(-66,0,11,0,TAU);ctx.fill();ctx.globalAlpha=1;txt('LIVE',22,3,{f:'Montserrat',w:900,size:40,ls:5});ctx.restore();
      const s=Math.floor(ms/1000);txt('09:41:'+String(20+s).padStart(2,'0')+' GMT',W-170,166,{f:'JetBrains Mono',w:700,size:26,ls:3,fill:'rgba(170,205,255,.85)'})}
    const ty=H-120+(1-clamp(g.t,0,1))*160;ctx.fillStyle='#fff';ctx.fillRect(0,ty,W,120);ctx.save();ctx.beginPath();ctx.rect(330,ty,W-330,120);ctx.clip();const off=(ms*.22)%TW;for(let x=-off;x<W;x+=TW)txt(tk,330+x+20,ty+62,{f:'Montserrat',w:700,size:40,al:'left',ls:3,fill:'#0a1f4a'});ctx.restore();
    ctx.fillStyle='#e2121f';ctx.fillRect(0,ty,330,120);txt('LATEST',165,ty+62,{f:'Montserrat',w:900,size:46,ls:6});
    if(g.fl>0){ctx.globalAlpha=g.fl;ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);ctx.globalAlpha=1}};
};
/* 12 CAUTION TAPE UNDER MAINTENANCE - seamless loop */
C[12]=()=>{newTL();const L=1700,h=170,Pt=110;const mk=(t)=>{const u=Math.ceil((tw(t,'Montserrat',900,66,6)+170)/Pt)*Pt;return u};
  const T=[{x:W/2,y:H/2-40,a:-.30,t:'UNDER MAINTENANCE',d:1,u:mk('UNDER MAINTENANCE'),ph:0},{x:W/2,y:H/2+60,a:.22,t:'CAUTION  •  DO NOT ENTER',d:-1,u:mk('CAUTION  •  DO NOT ENTER'),ph:1.7}];
  const tape=(o,ms)=>{const th=LOOP(ms);ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.a+.012*Math.sin(th*2+o.ph));
    ctx.shadowColor='rgba(0,0,0,.85)';ctx.shadowBlur=40*S;ctx.shadowOffsetY=18*S;ctx.fillStyle='#f4be00';ctx.fillRect(-L,-h/2,2*L,h);ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
    ctx.beginPath();ctx.rect(-L,-h/2,2*L,h);ctx.clip();const off=o.d*o.u*2*ms/DUR,sh=((off%Pt)+Pt)%Pt;ctx.fillStyle='#111';
    for(let x=-L-Pt*2;x<L+Pt;x+=Pt){const xx=x+sh;for(const [y0,y1] of [[-h/2,-h/2+36],[h/2-36,h/2]]){ctx.beginPath();ctx.moveTo(xx,y0);ctx.lineTo(xx+Pt*.5,y0);ctx.lineTo(xx+Pt*.5-(y1-y0),y1);ctx.lineTo(xx-(y1-y0),y1);ctx.closePath();ctx.fill()}}
    const so=((off%o.u)+o.u)%o.u;for(let x=-L-o.u;x<L+o.u;x+=o.u)txt(o.t,x+so+o.u/2,4,{f:'Montserrat',w:900,size:66,ls:6,fill:'#111'});
    const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(255,255,255,.18)');g.addColorStop(.5,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(0,0,0,.25)');ctx.fillStyle=g;ctx.fillRect(-L,-h/2,2*L,h);ctx.restore()};
  draw=()=>{clear();const ms=now(),th=LOOP(ms);
    const bg=ctx.createRadialGradient(W/2,H/2,100,W/2,H/2,1100);bg.addColorStop(0,'#1d1a14');bg.addColorStop(1,'#040404');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.save();ctx.globalCompositeOperation='lighter';const cg=ctx.createConicGradient(th*3,W/2,H/2);cg.addColorStop(0,'rgba(255,170,0,.30)');cg.addColorStop(.08,'rgba(255,170,0,0)');cg.addColorStop(.5,'rgba(255,170,0,.30)');cg.addColorStop(.58,'rgba(255,170,0,0)');cg.addColorStop(1,'rgba(255,170,0,.30)');ctx.fillStyle=cg;ctx.fillRect(0,0,W,H);ctx.restore();
    tape(T[0],ms);tape(T[1],ms)};
};
