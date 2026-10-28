/* 5 VALENTINE HEART FRAME, GOLDEN STARS + GLITTER LIGHT TRAILS (empty centre for photo / text) */
C[5]=()=>{newTL();const R=rng(505),beat={v:0};
  for(let i=0;i<10;i++){const b=i*1.5;                                              /* GSAP heartbeat, 10 beats = 15s */
    tl.fromTo(beat,{v:0},{v:1,duration:.12,ease:'power2.out',immediateRender:false},b);tl.to(beat,{v:.2,duration:.12,ease:'sine.inOut'},b+.12);
    tl.to(beat,{v:.7,duration:.1,ease:'power2.out'},b+.24);tl.to(beat,{v:0,duration:.7,ease:'power2.inOut'},b+.34)}
  /* the heart is an SVG path; GSAP MotionPathPlugin turns it into evenly spaced points */
  const raw=MotionPathPlugin.getRawPath('M50,92 C20,68 4,50 4,30 C4,14 16,5 29,5 C39,5 47,10 50,19 C53,10 61,5 71,5 C84,5 96,14 96,30 C96,50 80,68 50,92 Z');
  const N=900,PX=[],PY=[],NX=[],NY=[],s=9.6,cx=W/2,cy=H/2-4;
  for(let i=0;i<=N;i++){const q=MotionPathPlugin.getPositionOnPath(raw,i/N);PX.push(cx+(q.x-50)*s);PY.push(cy+(q.y-48)*s)}
  for(let i=0;i<=N;i++){const a=Math.min(N,i+2),b=Math.max(0,i-2);let tx=PX[a]-PX[b],ty=PY[a]-PY[b];const l=Math.hypot(tx,ty)||1;let nx=ty/l,ny=-tx/l;if(nx*(PX[i]-cx)+ny*(PY[i]-cy)<0){nx=-nx;ny=-ny}NX.push(nx);NY.push(ny)}
  const at=u=>{u=mod(u,1)*N;const i=Math.floor(u),f=u-i,j=Math.min(N,i+1);return[lerp(PX[i],PX[j],f),lerp(PY[i],PY[j],f),lerp(NX[i],NX[j],f),lerp(NY[i],NY[j],f)]};
  const outline=(sc,lw,col,a)=>{ctx.save();ctx.translate(cx,cy);ctx.scale(sc,sc);ctx.translate(-cx,-cy);ctx.beginPath();ctx.moveTo(PX[0],PY[0]);for(let i=1;i<=N;i+=2)ctx.lineTo(PX[i],PY[i]);ctx.closePath();ctx.lineWidth=lw/sc;ctx.strokeStyle=col;ctx.globalAlpha=a;ctx.lineJoin='round';ctx.stroke();ctx.restore()};
  const comets=[{u:0,L:3,c:[255,200,80]},{u:.34,L:-2,c:[255,226,150]},{u:.67,L:4,c:[255,170,60]}];
  const stars=[];for(let i=0;i<30;i++){const u=R(),off=(R()<.8?1:-1)*(34+R()*170)*(R()<.2?.5:1);stars.push({u,off,r:5+Math.pow(R(),1.6)*17,tn:1+Math.floor(R()*4),tp:R(),rot:R()*TAU,rs:R()<.5?1:-1})}
  const dust=[];for(let i=0;i<110;i++)dust.push({x:R()*W,y:R()*H,r:2+R()*5,tn:2+Math.floor(R()*6),tp:R(),dx:6+R()*16,m:1+Math.floor(R()*2),p:R()});
  const GOLD=[255,196,70],LIFE=2.2,DT=1/30,NB=Math.round(DUR/DT);
  draw=()=>{clear();const ph=PH(),t=T(),bs=1+.014*beat.v;
    add();ctx.globalAlpha=1;
    for(const d of dust){const a=Math.pow(Math.max(0,sn(d.tn,ph,d.tp)),3)*.8;if(a>.02)put(spr([255,210,110],32),d.x+sn(d.m,ph,d.p)*d.dx,d.y+sn(d.m,ph,d.p+.25)*d.dx,d.r*2.4,a)}
    nrm();
    ctx.save();ctx.translate(cx,cy);ctx.scale(bs,bs);ctx.translate(-cx,-cy);
    outline(1,64,'rgba(255,150,40,1)',.03+.03*beat.v);outline(1,38,'rgba(255,170,50,1)',.05+.04*beat.v);outline(1,22,'rgba(255,185,60,1)',.12+.1*beat.v);outline(1,10,'rgba(255,212,110,1)',.5);outline(1,4,'rgba(255,246,215,1)',1);
    outline(.93,1.6,'rgba(255,205,100,1)',.45);ctx.restore();
    add();
    for(const c of comets){const dir=Math.sign(c.L),u=fr(c.u+c.L*ph);
      for(let j=0;j<90;j++){const k=1-j/90,[x,y]=at(u-dir*j*.0026);put(spr(mixc(GOLD,c.c,k),64),x,y,3+36*Math.pow(k,1.5),Math.pow(k,1.2)*.95)}
      const [hx,hy]=at(u);put(spr([255,255,255],128),hx,hy,46,1);flare(hx,hy,52,.9,'#fff');ctx.save();ctx.translate(hx,hy);ctx.rotate(Math.PI/4);flare(0,0,30,.6,'#ffe6a8');ctx.restore();
      /* glitter shed by the comet: stateless emitter, particle j was born at time j*DT */
      for(let j=Math.floor((t-LIFE)/DT);j<=Math.floor(t/DT);j++){const age=t-j*DT;if(age<0||age>LIFE)continue;const q=mod(j,NB),rr=rng(q*7+Math.round(c.u*100)+(dir>0?1:3));
        for(let m=0;m<4;m++){const sp=rr()*40+10,an=rr()*TAU,sz=2+rr()*6,tw=rr()*6+3,tp=rr(),bu=c.u+c.L*(j*DT)/DUR,[bx,by,nx,ny]=at(bu+(rr()-.5)*.004),out=(rr()-.4)*sp*age*3;
          const x=bx+nx*out+Math.cos(an)*sp*age*.4,y=by+ny*out+Math.sin(an)*sp*age*.4+age*age*10,a=Math.pow(1-age/LIFE,1.4)*(.45+.55*Math.abs(Math.sin(TAU*(tw*age+tp))));
          put(spr(rr()<.5?[255,200,90]:[255,240,190],32),x,y,sz*2.8,a)}}}
    for(const st of stars){const [x,y,nx,ny]=at(st.u),px=x+nx*st.off,py=y+ny*st.off,tw=Math.pow(.5+.5*sn(st.tn,ph,st.tp),2.2),r=st.r*(.4+.9*tw);
      put(spr([255,196,70],64),px,py,r*3,.55*tw);ctx.save();ctx.translate(px,py);ctx.rotate(st.rot+TAU*ph*st.rs*.25);flare(0,0,r*2.1,.3+.5*tw,'#ffc94d');flare(0,0,r*1.1,.95*tw,'#fff2c8');ctx.restore()}
    nrm()}};

/* 6 FIREFLIES IN THE DARK */
C[6]=()=>{newTL();const R=rng(606),E=gsap.parseEase('power2.inOut'),F=[];
  for(let i=0;i<95;i++){const z=Math.pow(R(),1.3);F.push({z,cx:R()*W,cy:60+R()*(H-120),ax:50+R()*180,ay:30+R()*110,a1:1+Math.floor(R()*3),a2:1+Math.floor(R()*4),b1:1+Math.floor(R()*3),b2:2+Math.floor(R()*4),p:[R(),R(),R(),R()],
    bn:1+Math.floor(R()*5),bp:R(),r:5+z*20,c:R()<.8?[190,255,80]:[120,255,170]})}
  F.sort((a,b)=>a.z-b.z);
  const pos=(f,ph)=>[f.cx+f.ax*sn(f.a1,ph,f.p[0])+f.ax*.4*sn(f.a2,ph,f.p[1]),f.cy+f.ay*sn(f.b1,ph,f.p[2])+f.ay*.5*sn(f.b2,ph,f.p[3])];
  draw=()=>{clear();const ph=PH();add();
    for(const f of F){const w=1-Math.abs(2*fr(f.bn*ph+f.bp)-1),on=Math.pow(E(w),1.6),a=.12+.88*on;
      for(let j=4;j>=1;j--){const [tx,ty]=pos(f,ph-j*.0035);put(spr(f.c,32),tx,ty,f.r*.5,a*.1*(5-j)*f.z)}
      const [x,y]=pos(f,ph);put(spr(f.c,128),x,y,f.r*(2+2.2*on),a*(.35+.65*f.z));put(spr([255,255,210],32),x,y,f.r*.28*(.6+.6*on),a)}
    nrm()}};

/* 7 HEAVY RAIN */
C[7]=()=>{newTL();const R=rng(707),g={w:0};
  tl.fromTo(g,{w:0},{w:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const L=[{n:520,k:[22,26],len:[26,48],lw:1,a:[.1,.22]},{n:300,k:[30,36],len:[60,100],lw:1.6,a:[.18,.38]},{n:95,k:[44,52],len:[150,230],lw:2.6,a:[.12,.26]}],P=[];
  L.forEach((l,li)=>{for(let i=0;i<l.n;i++)P.push({li,u:R(),k:l.k[0]+Math.floor(R()*(l.k[1]-l.k[0]+1)),x:R()*(W+500)-250,len:l.len[0]+R()*(l.len[1]-l.len[0]),a:l.a[0]+R()*(l.a[1]-l.a[0]),lw:l.lw})});
  draw=()=>{clear();const ph=PH(),sl=.16+.1*g.w;ctx.lineCap='round';ctx.strokeStyle='#fff';
    for(const p of P){const u=fr(p.u+p.k*ph),y=-260+u*(H+520),x=p.x+sl*y,dx=sl*p.len,dy=p.len,n=Math.hypot(dx,dy),ux=dx/n,uy=dy/n;ctx.lineWidth=p.lw;
      const hx=x,hy=y,mx=x-ux*dy*.45,my=y-uy*dy*.45,tx=x-ux*dy,ty=y-uy*dy,cs=p.li===2?'200,215,255':'185,205,245';
      ctx.strokeStyle=`rgba(${cs},${p.a*.35})`;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(mx,my);ctx.stroke();
      ctx.strokeStyle=`rgba(${cs},${p.a})`;ctx.beginPath();ctx.moveTo(mx,my);ctx.lineTo(hx,hy);ctx.stroke()}
    ctx.lineCap='butt'}};

/* 8 FIRE EMBERS RISING */
C[8]=()=>{newTL();const R=rng(808),P=[];
  for(let i=0;i<430;i++){const z=R();P.push({z,u:R(),k:2+Math.floor(R()*4),x:R()*W,sa:20+R()*110,sn:1+Math.floor(R()*3),sp:R(),r:1.6+R()*4.2*(.4+z),fl:3+Math.floor(R()*9),fp:R(),pw:.8+R()*.25,hot:R()})}
  const ramp=u=>u<.12?mixc([255,245,190],[255,170,40],u/.12):u<.55?mixc([255,170,40],[235,70,15],(u-.12)/.43):mixc([235,70,15],[120,18,6],(u-.55)/.45);
  draw=()=>{clear();const ph=PH();add();
    put(sd([255,110,20],256),W/2,H+260,1100,.12);
    for(const p of P){const u=fr(p.u+p.k*ph),y=H+50-(H+160)*Math.pow(u,p.pw),x=p.x+Math.sin(TAU*(p.sn*ph+p.sp))*p.sa*(.3+u)+Math.sin(TAU*(p.sn*2*ph+p.sp*3))*14*u;
      const fade=sm(0,.04,u)*(1-sm(.55,1,u)),fk=.65+.35*Math.sin(TAU*(p.fl*ph+p.fp)),a=fade*fk,c=ramp(u*(.85+.3*p.hot)),r=p.r*(1-.55*u);
      if(a<.01)continue;
      for(let j=1;j<=3;j++){const uu=u-j*.006,yy=H+50-(H+160)*Math.pow(Math.max(0,uu),p.pw);put(spr(c,32),x-j*1.5*Math.sin(TAU*(p.sn*ph+p.sp)),yy,r*(1.8-j*.35),a*.22*(4-j)/3)}
      put(spr(c,64),x,y,r*5,a*.9);put(spr([255,235,190],32),x,y,r*.9,a)}
    nrm()}};
