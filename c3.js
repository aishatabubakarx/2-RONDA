/* 9 IRIDESCENT SOAP BUBBLES RISING */
C[9]=()=>{newTL();const R=rng(909),P=[];
  for(let i=0;i<48;i++){const z=R();P.push({z,r:24+z*z*135,u:R(),k:1+Math.floor(z*2.99),x:R()*W,sa:20+R()*60,sn:1+Math.floor(R()*2),sp:R(),wn:3+Math.floor(R()*4),wp:R(),h:R()*360,ro:R()*TAU,rs:R()<.5?1:-1})}
  P.sort((a,b)=>a.r-b.r);
  draw=()=>{clear();const ph=PH();add();
    for(const p of P){const r=p.r,y=H+r+50-fr(p.u+p.k*ph)*(H+2*r+100),x=p.x+sn(p.sn,ph,p.sp)*p.sa,w=.05*sn(p.wn,ph,p.wp),h0=p.h+360*ph*p.rs;
      ctx.save();ctx.translate(x,y);ctx.scale(1+w,1-w);ctx.globalAlpha=.55+.45*p.z;
      const body=ctx.createRadialGradient(0,0,r*.1,0,0,r);body.addColorStop(0,'rgba(120,170,255,0)');body.addColorStop(.72,hsl(h0+200,80,60,.03));body.addColorStop(.92,hsl(h0+260,90,65,.2));body.addColorStop(1,hsl(h0+300,90,70,.45));
      ctx.fillStyle=body;ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.fill();
      const cg=ctx.createConicGradient(p.ro+TAU*ph*p.rs,0,0),stops=8;for(let i=0;i<=stops;i++)cg.addColorStop(i/stops,hsl(h0+i*(360/stops)*(i===stops?0:1),100,66,.9));
      ctx.strokeStyle=cg;ctx.lineWidth=Math.max(1.5,r*.07);ctx.globalAlpha=(.4+.35*p.z);ctx.beginPath();ctx.arc(0,0,r*.95,0,TAU);ctx.stroke();
      ctx.lineWidth=Math.max(1,r*.025);ctx.strokeStyle='rgba(220,235,255,.7)';ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.stroke();
      ctx.globalAlpha=.55+.4*p.z;ctx.lineCap='round';ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=Math.max(1.5,r*.05);ctx.beginPath();ctx.arc(0,0,r*.8,Math.PI*.12,Math.PI*.42);ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=Math.max(2,r*.06);ctx.beginPath();ctx.ellipse(-r*.42,-r*.46,r*.2,r*.1,-.7,0,TAU);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.ellipse(-r*.42,-r*.46,r*.14,r*.055,-.7,0,TAU);ctx.fill();
      ctx.restore()}
    nrm()}};

/* 10 LIGHTNING STORM */
C[10]=()=>{newTL();const R=rng(1010);
  const bolt=(x0,y0,x1,y1,d,pts,lvl)=>{if(d<3||Math.hypot(x1-x0,y1-y0)<14){pts.push([x1,y1]);return}const mx=(x0+x1)/2+(R()-.5)*d,my=(y0+y1)/2+(R()-.5)*d*.5;bolt(x0,y0,mx,my,d*.55,pts,lvl);bolt(mx,my,x1,y1,d*.55,pts,lvl)};
  const mkBolt=(x0,x1)=>{const y1=H*(.78+R()*.2),main=[[x0,-20]];bolt(x0,-20,x1,y1,230,main,0);const br=[];
    for(let i=0;i<5+Math.floor(R()*4);i++){const k=Math.floor(R()*(main.length-6))+3,[bx,by]=main[k],dir=R()<.5?-1:1,len=140+R()*320,ex=bx+dir*(60+R()*260),ey=by+len,pts=[[bx,by]];bolt(bx,by,ex,ey,110,pts,1);br.push(pts);
      if(R()<.5){const kk=Math.floor(pts.length*.5),[sx,sy]=pts[kk],p2=[[sx,sy]];bolt(sx,sy,sx+dir*(40+R()*120),sy+80+R()*140,60,p2,2);br.push(p2)}}
    return{main,br,ex:main[main.length-1]}};
  const times=[.8,2.4,3.9,5.6,6.9,8.9,10.4,12.3],S=times.map((t,i)=>{const x0=200+R()*(W-400),b=mkBolt(x0,x0+(R()-.5)*320);return{t,b,g:0,f:0}});
  const IR={immediateRender:false};
  S.forEach(o=>{const t0=o.t;tl.fromTo(o,{g:0},{g:1,duration:.1,ease:'power1.in',...IR},t0);
    tl.fromTo(o,{f:0},{f:1,duration:.04,...IR},t0);tl.fromTo(o,{f:1},{f:.25,duration:.08,ease:'sine.inOut',...IR},t0+.04);tl.fromTo(o,{f:.25},{f:1,duration:.05,...IR},t0+.12);tl.fromTo(o,{f:1},{f:0,duration:.75,ease:'power2.out',...IR},t0+.17)});
  const CL=[];for(let i=0;i<16;i++)CL.push({x:R()*W,y:R()*H*.4,r:260+R()*420,m:1+Math.floor(R()*2),p:R()});
  const line=(pts,fr_,lw,col,a)=>{const n=Math.max(2,Math.floor(pts.length*fr_));ctx.lineWidth=lw;ctx.strokeStyle=col;ctx.globalAlpha=a;ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<n;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.stroke()};
  draw=()=>{clear();const ph=PH();add();ctx.lineJoin='round';ctx.lineCap='round';
    let amb=0;for(const o of S)amb=Math.max(amb,o.f);
    if(amb>.01)for(const c of CL)put(sd([100,125,225],128),c.x+sn(c.m,ph,c.p)*40,c.y,c.r,amb*.09);
    for(const o of S){if(o.f<.003)continue;const f=o.f,gr=o.g,all=[[o.b.main,1],...o.b.br.map((p,i)=>[p,.5])];
      for(const [pts,sc] of all){const p=sc===1?gr:Math.max(0,(gr-.25)/.75);if(p<=0)continue;
        line(pts,p,40*sc,'rgb(80,100,255)',.06*f);line(pts,p,18*sc,'rgb(130,150,255)',.17*f);line(pts,p,8*sc,'rgb(200,212,255)',.6*f);line(pts,p,3.4*sc,'rgb(255,255,255)',f)}
      const [ex,ey]=o.b.ex;put(spr([160,180,255],128),ex,ey,260*f,gr>.9?f*.8:0);put(spr([200,210,255],128),o.b.main[0][0],-10,300*f,f*.7)}
    ctx.lineCap='butt';nrm()}};

/* 11 GOLDEN BOKEH LIGHTS */
C[11]=()=>{newTL();const R=rng(1111),COL=[[255,196,84],[255,170,60],[255,224,150],[255,142,50],[255,236,190],[240,180,70]],P=[];
  for(let i=0;i<86;i++){const z=R();P.push({z,r:22+z*z*150,u:R(),k:1+Math.floor(z*1.99),x:R()*W,sa:20+R()*80,sn:1+Math.floor(R()*2),sp:R(),bn:1+Math.floor(R()*4),bp:R(),c:pick(R,COL),a:.55+R()*.6})}
  P.sort((a,b)=>a.r-b.r);
  draw=()=>{clear();const ph=PH();add();
    for(const p of P){const y=H+p.r+30-fr(p.u+p.k*ph)*(H+2*p.r+60),x=p.x+sn(p.sn,ph,p.sp)*p.sa,br=.65+.35*sn(p.bn,ph,p.bp);put(bk(p.c,128),x,y,p.r,p.a*br)}
    nrm()}};

/* 12 MYSTIC SMOKE / FOG DRIFT */
const puff=(seed,tint)=>mk('p'+seed+tint.join(),256,(x,h)=>{const im=x.createImageData(256,256),d=im.data;
  for(let j=0;j<256;j++)for(let i=0;i<256;i++){const dx=(i-128)/128,dy=(j-128)/128,r=Math.hypot(dx,dy),fall=Math.pow(Math.max(0,1-r),1.5),n=fbm(i/40+seed*17.3,j/40+seed*9.1,5),a=clamp((n-.22)*2.8,0,1)*fall,k=(j*256+i)*4;
    d[k]=tint[0];d[k+1]=tint[1];d[k+2]=tint[2];d[k+3]=a*255}x.putImageData(im,0,0)});
C[12]=()=>{newTL();const R=rng(1212),TINT=[[185,205,240],[165,110,225],[80,200,205],[210,215,235]],P=[];
  for(let i=0;i<64;i++){const z=R();P.push({z,seed:Math.floor(R()*4),t:pick(R,TINT),u:R(),k:1+Math.floor(z*1.99),y:H*(.15+R()*.75),ya:30+R()*90,yn:1+Math.floor(R()*2),yp:R(),s:380+R()*520,rn:1+Math.floor(R()*2),rp:R(),r0:R()*TAU,a:.14+R()*.2,flip:R()<.5?-1:1})}
  draw=()=>{clear();const ph=PH();add();
    for(const p of P){const x=fr(p.u+p.k*ph)*(W+900)-450,y=p.y+sn(p.yn,ph,p.yp)*p.ya,rot=p.r0+.6*sn(p.rn,ph,p.rp)+p.flip*TAU*ph*0;
      ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=p.a*(.8+.2*sn(p.yn,ph,p.yp+.3));const s=p.s/2;ctx.drawImage(puff(p.seed,p.t),-s,-s*.7,s*2,s*1.4);ctx.restore()}
    nrm()}};
