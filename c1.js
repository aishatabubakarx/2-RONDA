/* 1 GOLD CONFETTI FALL */
C[1]=()=>{newTL();const R=rng(101),g={w:0};
  tl.fromTo(g,{w:0},{w:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);          /* wind gust, returns to 0 at 15s */
  const GOLD=[[255,222,110],[255,196,52],[240,160,20],[255,240,180],[212,138,12],[255,178,36]],P=[];
  for(let i=0;i<380;i++){const z=Math.pow(R(),.8),s=R();
    P.push({z,u:R(),k:3+Math.floor(z*4.99),x:R()*(W+240)-120,sa:18+R()*46*(.4+z),sn:1+Math.floor(R()*3),sp:R(),fm:2+Math.floor(R()*14),fp:R(),rm:Math.floor(R()*3)-1,rp:R(),
      sz:6+z*17,sh:s<.58?0:s<.76?1:s<.9?2:3,col:pick(R,GOLD),ar:.5+R()*.5,wd:40+z*150})}
  P.sort((a,b)=>a.z-b.z);
  draw=()=>{clear();const ph=PH();
    for(const p of P){const u=fr(p.u+p.k*ph),y=-70+u*(H+140),sw=sn(p.sn,ph,p.sp),x=p.x+sw*p.sa+g.w*p.wd;
      const c=Math.cos(TAU*(p.fm*ph+p.fp)),ac=Math.abs(c),rot=TAU*(p.rm*ph+p.rp)+sw*.5,spec=sm(.93,1,ac);
      const base=c>0?p.col:[p.col[0]*.82,p.col[1]*.72,p.col[2]*.6],dark=[base[0]*.62,base[1]*.5,base[2]*.22];
      const col=mixc(mixc(dark,base,Math.pow(ac,1.6)),[255,236,150],spec*.55);
      ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(1,Math.max(.05,ac));ctx.globalAlpha=.55+.45*p.z;ctx.fillStyle=ctx.strokeStyle=rgba(col,1);
      const w=p.sz*1.7,h=p.sz*(.5+.5*p.ar);
      if(p.sh===0||p.sh===3){const q=p.sh===3?p.sz*.8:w;ctx.fillRect(-q/2,-(p.sh===3?q:h)/2,q,p.sh===3?q:h)}
      else if(p.sh===1){ctx.lineWidth=h*.55;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-w*.8,0);ctx.bezierCurveTo(-w*.3,-w*.55,w*.3,w*.55,w*.8,0);ctx.stroke()}
      else{ctx.beginPath();ctx.arc(0,0,p.sz*.45,0,TAU);ctx.fill()}
      ctx.restore();
      if(spec>.35){add();put(spr([255,190,70],64,.7),x,y,p.sz*2.4,(spec-.35)*1.1*(.3+.7*p.z));nrm()}}
    ctx.globalAlpha=1}};

/* 2 AUTUMN MAPLE LEAVES */
const leafPath=(()=>{const half=[[0,-1],[.1,-.74],[.2,-.8],[.2,-.58],[.31,-.63],[.26,-.4],[.43,-.47],[.5,-.66],[.6,-.7],[.58,-.5],[.74,-.52],[.58,-.3],[.78,-.36],[.97,-.46],[.9,-.24],[1,-.16],[.76,-.02],[.54,.06],[.62,.18],[.74,.36],[.48,.3],[.34,.42],[.1,.3],[.06,.62]],Y=.2;
  const p=new Path2D();p.moveTo(0,.62+Y);for(const [x,y] of half.slice().reverse())p.lineTo(x,y+Y);p.lineTo(0,-1+Y);for(const [x,y] of half.slice(1))p.lineTo(-x,y+Y);p.closePath();
  const v=new Path2D();v.moveTo(0,.98);v.lineTo(0,-.9+Y);
  for(const [x,y] of [[.55,-.62],[.9,-.34],[.7,.3],[.3,-.88]]){for(const s of [-1,1]){v.moveTo(0,.4+Y);v.lineTo(s*x,y+Y)}}
  for(const [bx,by,x,y] of [[.3,-.2,.38,-.38],[.45,-.05,.62,-.1],[.34,.1,.5,.26]]){for(const s of [-1,1]){v.moveTo(s*bx,by+Y);v.lineTo(s*x,y+Y)}}
  return{p,v}})();
C[2]=()=>{newTL();const R=rng(202),g={w:0};
  tl.fromTo(g,{w:0},{w:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const COL=[[196,28,22],[222,62,18],[240,112,20],[248,168,30],[252,205,60],[168,60,18],[130,38,16],[210,40,30]],P=[];
  for(let i=0;i<95;i++){const z=Math.pow(R(),.85);
    P.push({z,u:R(),k:2+Math.floor(z*2.99),x:R()*(W+200)-100,sa:50+R()*90*(.5+z),sn:1+Math.floor(R()*2),sp:R(),fm:1+Math.floor(R()*3),fp:R(),
      sz:30+z*64,col:pick(R,COL),wr:.5+R()*.5,sp2:Math.floor(R()*3)-1,rp:R(),wd:60+z*160,tm:2+Math.floor(R()*3)})}
  P.sort((a,b)=>a.z-b.z);
  draw=()=>{clear();const ph=PH();
    for(const p of P){const u=fr(p.u+p.k*ph),y=-110+u*(H+220),sw=sn(p.sn,ph,p.sp),x=p.x+sw*p.sa+g.w*p.wd;
      const cf=Math.cos(TAU*(p.fm*ph+p.fp)),side=cf>0,sx=Math.max(.18,Math.abs(cf)),rot=sn(p.tm,ph,p.rp)*p.wr+TAU*p.sp2*ph+sw*.35;
      const lit=.6+.4*Math.abs(cf),b=side?p.col:[p.col[0]*.75,p.col[1]*.7,p.col[2]*.7];
      ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(p.sz*sx,p.sz);ctx.globalAlpha=.5+.5*p.z;
      const gr=ctx.createLinearGradient(0,-.8,0,.8);gr.addColorStop(0,rgba(mixc(b,[255,230,120],.28),1));gr.addColorStop(1,rgba(b.map(v=>v*lit*.8),1));
      ctx.fillStyle=gr;ctx.fill(leafPath.p);ctx.lineWidth=.022;ctx.lineCap='round';ctx.strokeStyle=`rgba(70,22,8,${.5*(side?1:.7)})`;ctx.stroke(leafPath.v);
      ctx.lineWidth=.014;ctx.strokeStyle=rgba(mixc(b,[255,210,110],.45),.55);ctx.stroke(leafPath.p);
      ctx.restore()}
    ctx.globalAlpha=1}};

/* 3 REALISTIC SNOWFALL */
C[3]=()=>{newTL();const R=rng(303),g={w:0};
  tl.fromTo(g,{w:0},{w:1,duration:7.5,ease:'sine.inOut',yoyo:true,repeat:1},0);
  const P=[],X=[];
  for(let i=0;i<620;i++){const z=R(),near=z>.93;
    P.push({z,u:R(),k:near?6:z<.55?2:3+Math.floor(R()*2),x:R()*(W+300)-150,sa:10+R()*30*(.3+z),sn:1+Math.floor(R()*4),sp:R(),r:near?16+R()*26:z<.55?1.1+R()*1.8:2.6+R()*3.6,a:near?.2+R()*.18:.45+R()*.5,wd:40+z*260})}
  for(let i=0;i<48;i++){const z=.45+R()*.5;X.push({z,u:R(),k:3+Math.floor(R()*3),x:R()*(W+200)-100,sa:20+R()*40,sn:1+Math.floor(R()*3),sp:R(),r:9+z*17,rm:1+Math.floor(R()*2)*(R()<.5?-1:1),rp:R(),a:.35+z*.5,wd:60+z*200})}
  const SOFT=sd([240,248,255],64),flake=(r,a)=>{ctx.strokeStyle=`rgba(232,244,255,${a})`;ctx.lineWidth=Math.max(1,r*.09);ctx.lineCap='round';ctx.beginPath();
    for(let i=0;i<6;i++){const an=i*TAU/6,c=Math.cos(an),s=Math.sin(an);ctx.moveTo(0,0);ctx.lineTo(c*r,s*r);for(const f of [.45,.72]){const bx=c*r*f,by=s*r*f,bl=r*.3*(1.15-f*.5);
      for(const d of [-1,1]){const a2=an+d*.9;ctx.moveTo(bx,by);ctx.lineTo(bx+Math.cos(a2)*bl,by+Math.sin(a2)*bl)}}}ctx.stroke()};
  draw=()=>{clear();const ph=PH();
    for(const p of P){const y=-60+fr(p.u+p.k*ph)*(H+120),x=p.x+sn(p.sn,ph,p.sp)*p.sa+g.w*p.wd;put(SOFT,x,y,p.r*(p.r<6?2.2:1),p.a)}
    for(const p of X){const y=-60+fr(p.u+p.k*ph)*(H+120),x=p.x+sn(p.sn,ph,p.sp)*p.sa+g.w*p.wd;ctx.save();ctx.translate(x,y);ctx.rotate(TAU*(p.rm*ph+p.rp));ctx.globalAlpha=1;flake(p.r,p.a);ctx.restore();put(SOFT,x,y,p.r*.55,p.a*.5)}
    ctx.globalAlpha=1}};

/* 4 NIGHT SKY BLUE STARS GLITTER */
C[4]=()=>{newTL();const R=rng(404),B=[[140,190,255],[190,215,255],[255,255,255],[100,150,255],[170,230,255],[120,130,255]],P=[],N=[];
  for(let i=0;i<9;i++)N.push({x:R()*W,y:R()*H,r:300+R()*500,c:pick(R,[[40,70,190],[70,50,170],[30,90,200]]),a:.09+R()*.07,m:1+Math.floor(R()*2),p:R()});
  for(let i=0;i<820;i++){let x=R()*W,y=R()*H;if(R()<.4){x=R()*W;y=H*.18+x*.42-300+(R()+R()+R()-1.5)*210}
    const q=R(),big=q>.985,mid=q>.7&&!big;
    P.push({x,y,r:big?3.5+R()*3:mid?1.5+R()*1.6:.5+R()*1.1,c:q>.985?pick(R,B.slice(0,5)):pick(R,B),tn:1+Math.floor(R()*6),tp:R(),dr:2+R()*10,big,mid,gl:Math.floor(R()*3)+1,gp:R(),base:big?1:mid?.7:.35+R()*.4})}
  draw=()=>{clear();const ph=PH();add();
    for(const n of N){put(sd(n.c,128),n.x+sn(n.m,ph,n.p)*50,n.y+sn(n.m,ph,n.p+.25)*30,n.r,n.a)}
    for(const s of P){const x=s.x+Math.cos(TAU*ph)*s.dr*.4,y=s.y+Math.sin(TAU*ph)*s.dr*.4;
      const tw=.5+.5*sn(s.tn,ph,s.tp),spike=Math.pow(Math.max(0,sn(s.gl,ph,s.gp)),14),a=s.base*(.35+.65*tw)+spike*.6;
      if(s.r<1.6&&!s.mid){put(sd(s.c,16),x,y,s.r*2.2,Math.min(1,a));continue}
      put(spr(s.c,64,.75),x,y,s.r*(s.big?7:5)*(.8+.4*tw+spike*.6),Math.min(1,a*(s.big?.85:.7)));
      if(s.big||spike>.35){const r=(s.big?34:8+s.r*4)*(.55+.45*tw+spike*.7);flare(x,y,r,Math.min(1,a*.9),rgba(mixc(s.c,[255,255,255],.3),1));ctx.save();ctx.translate(x,y);ctx.rotate(Math.PI/4);flare(0,0,r*.5,Math.min(1,a*.5),rgba(s.c,1));ctx.restore()}}
    nrm()}};
