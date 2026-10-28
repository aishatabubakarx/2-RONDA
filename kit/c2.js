/* ===== 6  BLUE + PINK WAVE GRID LINES WITH LIGHT FLARE ===== */
C[6]=()=>{const R=rng(66);newTL();const cam={x:0,h:H*.4,fx:W*.7,fy:H*.3,fs:1};
  osc(cam,{x:[-1.4,1.4],h:[H*.37,H*.42],fx:[W*.62,W*.8],fy:[H*.24,H*.34],fs:[.85,1.15]},DURS);
  const pts=[];for(let i=0;i<150;i++)pts.push({x:R()*W,y:R()*H,s:1.2+R()*3,k:2+(R()*6|0),o:R(),kk:1+(R()*2|0),c:R()<.5?[90,160,255]:[255,100,200]});
  const NX=64,NZ=42,X0=-17,X1=17,Z0=1.6,Z1=30,F=950;
  const hgt=(X,Z,u)=>(1.9*Math.sin(X*.42+TAU*u*2)+1.5*Math.sin(Z*.5-TAU*u*3+X*.1)+.8*Math.sin((X+Z)*.3+TAU*u))*(1-Z/50);
  const P=(X,Z,u,hor)=>{const Y=hgt(X,Z,u),s=F/Z;return[W/2+(X-cam.x)*s,hor+(3.4-Y)*s]};
  draw=()=>{clear();const u=U(),hor=cam.h;
    fillLin(0,0,0,hor,[[0,'#03020e'],[.6,'#150a36'],[1,'#3a1060']],[0,0,W,hor]);fillLin(0,hor,0,H,[[0,'#3a1060'],[.25,'#0b0620'],[1,'#02010a']],[0,hor,W,H-hor]);
    ctx.globalCompositeOperation='lighter';
    const rg=ctx.createLinearGradient(0,0,W,0);rg.addColorStop(0,'rgb(60,130,255)');rg.addColorStop(.5,'rgb(150,90,255)');rg.addColorStop(1,'rgb(255,70,190)');
    ctx.lineCap='round';ctx.lineJoin='round';
    const rows=[],cols=[];
    for(let j=0;j<NZ;j++){const Z=Z0+(Z1-Z0)*Math.pow(j/(NZ-1),1.6),r=[];for(let i=0;i<=NX;i++)r.push(P(X0+(X1-X0)*i/NX,Z,u,hor));rows.push([r,Z])}
    for(let i=0;i<=NX;i+=2){const X=X0+(X1-X0)*i/NX,c=[];for(let j=0;j<NZ;j++){const Z=Z0+(Z1-Z0)*Math.pow(j/(NZ-1),1.6);c.push(P(X,Z,u,hor))}cols.push([c,(X-X0)/(X1-X0)])}
    for(const [c,t] of cols){const col=mixc([70,140,255],[255,80,190],t),g=ctx.createLinearGradient(0,hor,0,H);g.addColorStop(0,rgba(col,0));g.addColorStop(.35,rgba(col,.55));g.addColorStop(1,rgba(col,.9));ctx.strokeStyle=g;
      for(const [w,a] of [[7,.12],[2.2,1]]){ctx.globalAlpha=a;ctx.lineWidth=w;ctx.beginPath();c.forEach((p,k)=>k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke()}}
    ctx.strokeStyle=rg;
    for(const [r,Z] of rows){const near=Math.pow(1-Z/Z1,.8);for(const [w,a] of [[6,.14*near+.02],[1.6,.25+.7*near]]){ctx.globalAlpha=a;ctx.lineWidth=w*(.4+near);ctx.beginPath();r.forEach((p,k)=>k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke()}}
    ctx.globalAlpha=1;
    const fx=cam.fx,fy=cam.fy,s=cam.fs;put(spr([255,90,200],512),fx,fy,520*s,.8);put(spr([90,150,255],512),fx-70,fy+30,360*s,.7);put(spr([255,255,255],256),fx,fy,120*s,.95);
    ctx.save();ctx.translate(fx,fy);ctx.globalAlpha=.8;ctx.drawImage(spr([140,170,255],256),-1100,-22*s,2200,44*s);ctx.globalAlpha=.9;ctx.drawImage(spr([255,255,255],256),-420,-5*s,840,10*s);ctx.restore();
    for(const [t,r,c,a] of [[.3,60,[90,150,255],.22],[.55,110,[255,90,200],.16],[.8,40,[255,255,255],.2],[1.1,90,[120,100,255],.15]]){const x=fx+(W/2-fx)*t*1.6,y=fy+(H*.55-fy)*t*1.6;put(spr(c,128,.3),x,y,r,a*s)}
    for(const p of pts){const y=wrap(p.y-u*H*p.kk,H),f=Math.pow(Math.max(0,Math.sin(TAU*(p.k*u+p.o))),4);put(spr(p.c,32),p.x,y,p.s*(1+f*1.5),.15+.85*f)}
    ctx.globalAlpha=1};
};
/* ===== 7  FUTURISTIC AI TECH GLOBE + CIRCUIT DATA STREAMS ===== */
C[7]=()=>{const R=rng(77);newTL();const core={s:1};osc(core,{s:[.9,1.1]},5);
  const N=260,nodes=[];for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));nodes.push([Math.cos(a)*r,y,Math.sin(a)*r])}
  const edges=[],seen=new Set();for(let i=0;i<N;i++){const c=[];for(let j=0;j<N;j++)if(j!==i)c.push([Math.hypot(nodes[i][0]-nodes[j][0],nodes[i][1]-nodes[j][1],nodes[i][2]-nodes[j][2]),j]);c.sort((a,b)=>a[0]-b[0]);
    c.slice(0,3).forEach(([d,j])=>{const key=Math.min(i,j)*1000+Math.max(i,j);if(d<.4&&!seen.has(key)){seen.add(key);edges.push([i,j])}})}
  const dots=[];for(let i=0;i<900;i++){const y=R()*2-1,r=Math.sqrt(1-y*y),a=R()*TAU;dots.push([Math.cos(a)*r,y,Math.sin(a)*r])}
  const pulses=edges.filter(()=>R()<.16).map(e=>({e,k:1+(R()*3|0),o:R()}));
  const rings=[{rx:1.3,tx:.9,tz:.3,k:1,c:[90,220,255]},{rx:1.55,tx:-.5,tz:-.6,k:-2,c:[170,120,255]},{rx:1.8,tx:.2,tz:.9,k:3,c:[80,160,255]}];
  const paths=[];for(let s=0;s<2;s++)for(let i=0;i<9;i++){const dir=s?-1:1;let x=s?W+10:-10,y=90+i*110+(R()-.5)*30;const pt=[[x,y]];
      for(let g=0;g<14;g++){const l=70+R()*170,ang=[0,Math.PI/4,-Math.PI/4,0,0][(R()*5)|0];x+=Math.cos(ang)*l*dir;y=clamp(y+Math.sin(ang)*l,50,H-50);pt.push([x,y]);if(dir>0?x>W/2-480:x<W/2+480)break}
      let L=0;const cl=[0];for(let k=1;k<pt.length;k++){L+=Math.hypot(pt[k][0]-pt[k-1][0],pt[k][1]-pt[k-1][1]);cl.push(L)}paths.push({pt,cl,L,k:1+(R()*2|0),o:R(),c:R()<.7?[70,210,255]:[170,110,255]})}
  const at=(p,s)=>{let k=1;while(k<p.cl.length-1&&p.cl[k]<s)k++;const t=clamp((s-p.cl[k-1])/(p.cl[k]-p.cl[k-1]||1),0,1);return[lerp(p.pt[k-1][0],p.pt[k][0],t),lerp(p.pt[k-1][1],p.pt[k][1],t)]};
  const sts=[];for(let i=0;i<120;i++)sts.push({x:R()*W,y:R()*H,r:5+R()*8,tw:0});twinkle(sts,1.2,6,R,.7);
  const cx=W/2,cy=H/2,Rg=400;
  draw=()=>{clear('#02050e');const u=U();fillRad(cx,cy,W*.6,[[0,'rgba(12,40,92,.8)'],[.5,'rgba(5,14,40,.6)'],[1,'rgba(0,0,0,0)']]);
    ctx.globalCompositeOperation='lighter';
    for(const s of sts)if(s.tw>.01)spark(s.x,s.y,s.r*(.5+s.tw),s.tw*.5,0,'#9cc8ff');
    ctx.lineCap='round';ctx.lineJoin='round';
    for(const p of paths){ctx.strokeStyle=rgba(p.c,.22);ctx.lineWidth=2;ctx.beginPath();p.pt.forEach((q,k)=>k?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();
      ctx.strokeStyle=rgba(p.c,.5);for(let k=1;k<p.pt.length;k++){ctx.beginPath();ctx.arc(p.pt[k][0],p.pt[k][1],6,0,TAU);ctx.stroke()}
      const hs=fr(p.k*u+p.o)*p.L;for(let j=0;j<12;j++){const q=at(p,Math.max(0,hs-j*9));put(spr(p.c,32),q[0],q[1],13-j*.8,(1-j/12)*.9)}const hq=at(p,hs);put(spr([255,255,255],32),hq[0],hq[1],9,1)}
    put(spr([60,140,255],512),cx,cy,520*core.s,.4);
    const A=u*TAU,ca=Math.cos(A),sa=Math.sin(A),T=.4,ct=Math.cos(T),st=Math.sin(T);
    const pr=v=>{const x=v[0]*ca+v[2]*sa,z0=-v[0]*sa+v[2]*ca,y=v[1]*ct-z0*st,z=v[1]*st+z0*ct,k=1/(1-z*.18);return[cx+x*Rg*k,cy+y*Rg*k,z]};
    const PR=nodes.map(pr);
    for(const v of dots){const q=pr(v),d=(q[2]+1)/2;put(spr([140,200,255],16),q[0],q[1],2.2+2.2*d,.2+.6*d*d)}
    ctx.lineWidth=1.8;for(const [i,j] of edges){const a=PR[i],b=PR[j],d=((a[2]+b[2])/2+1)/2;ctx.strokeStyle=rgba(mixc([90,90,255],[90,230,255],d),.1+.7*d*d);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()}
    for(const q of PR){const d=(q[2]+1)/2;put(spr([110,220,255],32),q[0],q[1],5+8*d,.3+.7*d*d)}
    for(const p of pulses){const a=PR[p.e[0]],b=PR[p.e[1]],t=fr(p.k*u+p.o),d=((a[2]+b[2])/2+1)/2;put(spr([255,255,255],32),lerp(a[0],b[0],t),lerp(a[1],b[1],t),18,.3+.7*d)}
    for(const r of rings){const cr=Math.cos(r.tx),sr=Math.sin(r.tx),cz=Math.cos(r.tz),sz=Math.sin(r.tz);
      const q=a=>{const x=Math.cos(a)*r.rx,z=Math.sin(a)*r.rx,y1=-z*sr,z1=z*cr,x2=x*cz-y1*sz,y2=x*sz+y1*cz;return pr([x2,y2,z1])};
      ctx.strokeStyle=rgba(r.c,.35);ctx.lineWidth=1.6;ctx.beginPath();for(let i=0;i<=120;i++){const p=q(i/120*TAU);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])}ctx.stroke();
      for(let e=0;e<2;e++){const p=q((u*r.k+e/2)*TAU),d=(p[2]+1.8)/3.6;put(spr(r.c,64),p[0],p[1],26,.5+.5*d);put(spr([255,255,255],32),p[0],p[1],8,.95)}}
    ctx.globalAlpha=1};
};
/* ===== 8  HYPERSPACE WARP SPEED STAR TUNNEL ===== */
C[8]=()=>{const R=rng(88);newTL();const wp={s:1,r:0};osc(wp,{s:[.75,1.2],r:[-.05,.05]},7.5);
  const stars=[],pal=[[150,200,255],[120,150,255],[190,140,255],[255,255,255],[100,230,255],[255,160,230]];
  for(let i=0;i<1200;i++)stars.push({a:R()*TAU,k:1+(R()*3|0),o:R(),c:pick(R,pal),w:.6+R()*1.4,l:.6+R()*.8});
  const cx=W/2,cy=H/2;
  draw=()=>{clear('#01020a');const u=U();fillRad(cx,cy,W*.7,[[0,'rgba(30,50,150,.75)'],[.3,'rgba(30,20,100,.4)'],[1,'rgba(0,0,0,0)']]);
    ctx.save();ctx.translate(cx,cy);ctx.rotate(wp.r);ctx.translate(-cx,-cy);ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
    for(let i=0;i<8;i++){const q=fr(u*2+i/8),r=Math.pow(q,2.3)*1500,a=Math.sin(Math.PI*q)*.3;ctx.strokeStyle=rgba(i%2?[120,90,255]:[70,190,255],a);ctx.lineWidth=2+q*9;ctx.beginPath();ctx.arc(cx,cy,r,0,TAU);ctx.stroke()}
    for(const s of stars){const p=fr(s.k*u+s.o),d=Math.pow(p,2.3)*1400+8,L=(6+d*.34)*wp.s*s.l,ca=Math.cos(s.a),sa=Math.sin(s.a),a=sm(0,.12,p)*Math.min(1,.35+p*1.4);
      ctx.strokeStyle=rgba(s.c,a);ctx.lineWidth=s.w*(.5+d/260);ctx.beginPath();ctx.moveTo(cx+ca*Math.max(0,d-L),cy+sa*Math.max(0,d-L));ctx.lineTo(cx+ca*d,cy+sa*d);ctx.stroke();
      if(d>300)put(spr(s.c,32),cx+ca*d,cy+sa*d,4+d/90,a*.6)}
    ctx.restore();ctx.globalCompositeOperation='lighter';put(spr([120,160,255],512),cx,cy,260*wp.s,.8);put(spr([255,255,255],128),cx,cy,70*wp.s,.9);ctx.globalAlpha=1};
};
/* ===== 9  AURORA BOREALIS NIGHT SKY ===== */
C[9]=()=>{const R=rng(99);newTL();const A={i:1,sw:1};osc(A,{i:[.8,1.1],sw:[.7,1.15]},7.5);
  const mkS=(c1,c2)=>{const k=document.createElement('canvas');k.width=8;k.height=256;const x=k.getContext('2d'),g=x.createLinearGradient(0,0,0,256);g.addColorStop(0,rgba(c1,0));g.addColorStop(.45,rgba(c1,.2));g.addColorStop(.86,rgba(c2,.9));g.addColorStop(1,rgba(c2,0));x.fillStyle=g;x.fillRect(0,0,8,256);return k};
  const rib=[{s:mkS([140,60,255],[70,255,170]),y:.40,ph:0,a:1},{s:mkS([60,100,255],[60,240,220]),y:.46,ph:1.7,a:.8},{s:mkS([255,70,200],[120,255,190]),y:.52,ph:3.1,a:.55},{s:mkS([120,70,255],[80,230,255]),y:.35,ph:4.4,a:.6}];
  const sts=[];for(let i=0;i<260;i++)sts.push({x:R()*W,y:R()*H*.8,r:1+R()*2.2,tw:0,b:R()<.08});twinkle(sts,1.5,7,R);
  draw=()=>{clear('#010610');const u=U();fillLin(0,0,0,H,[[0,'#020812'],[.6,'#06162a'],[1,'#0a2a34']]);
    ctx.globalCompositeOperation='lighter';
    for(const s of sts){const a=.2+.8*s.tw;put(spr([200,225,255],16),s.x,s.y,s.r*2+(s.b?4:0),a*.7);if(s.b&&s.tw>.3)spark(s.x,s.y,10*s.tw+4,s.tw*.7,0,'#e8f0ff')}
    for(const r of rib){const step=4;for(let x=-20;x<W+20;x+=step){
        const base=H*r.y+58*A.sw*Math.sin(x*.0028+TAU*u+r.ph)+34*Math.sin(x*.0066-TAU*2*u+r.ph*2)+14*Math.sin(x*.015+TAU*3*u+r.ph),
          hgt=(200+180*(.5+.5*Math.sin(x*.0045+TAU*u+r.ph*1.3)))*A.sw,
          ray=(.3+.7*Math.pow(.5+.5*Math.sin(x*.07+TAU*2*u+r.ph*2),2))*(.45+.55*(.5+.5*Math.sin(x*.0045-TAU*u+r.ph))),edge=sm(0,260,x)*sm(0,260,W-x);
        ctx.globalAlpha=Math.min(1,r.a*A.i*ray*(.5+.5*edge)*.8);ctx.drawImage(r.s,0,0,8,256,x,base-hgt,step+1,hgt+40)}}
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';fillRad(W/2,H*1.05,W*.7,[[0,'rgba(40,200,150,.12)'],[1,'rgba(0,0,0,0)']]);
    ctx.fillStyle='#010509';ctx.beginPath();ctx.moveTo(0,H);for(let x=0;x<=W;x+=16){ctx.lineTo(x,H*.9-70*Math.pow(Math.abs(Math.sin(x*.0021+1)),1.4)-34*Math.abs(Math.sin(x*.0063+2))-12*Math.sin(x*.02))}ctx.lineTo(W,H);ctx.fill()};
};
/* ===== 10  FLUID GRADIENT MESH / LIQUID COLOR BLOBS ===== */
C[10]=()=>{const R=rng(1010);newTL();
  const cols=[[255,60,140],[255,140,40],[70,90,255],[40,200,210],[150,60,255],[255,80,90],[60,160,255]],per=[15,7.5,5,15,7.5,5,15];
  const bl=cols.map((c,i)=>{const b={c,sc:1,x:W/2,y:H/2,r:430+R()*260,ax:520+R()*480,ay:240+R()*260,kx:1+(i%2),ky:1+((i+1)%2),px:R()*TAU,py:R()*TAU};osc(b,{sc:[.82,1.18]},per[i]);return b});
  const nz=document.createElement('canvas');nz.width=nz.height=256;{const x=nz.getContext('2d'),d=x.createImageData(256,256);for(let i=0;i<d.data.length;i+=4){const v=R()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}x.putImageData(d,0,0)}
  const patt=ctx.createPattern(nz,'repeat');
  draw=()=>{clear('#07041c');const u=U();fillRad(W/2,H/2,W*.7,[[0,'rgba(40,20,90,.7)'],[1,'rgba(0,0,0,0)']]);ctx.globalCompositeOperation='lighter';
    for(const b of bl){const x=b.x+Math.sin(TAU*b.kx*u+b.px)*b.ax,y=b.y+Math.sin(TAU*b.ky*u+b.py)*b.ay,r=b.r*b.sc;put(blob(b.c,256),x,y,r,.62);put(blob(mixc(b.c,[255,255,255],.35),256),x+r*.1,y-r*.1,r*.45,.35)}
    ctx.lineCap='round';for(let k=0;k<4;k++){ctx.strokeStyle=`rgba(255,255,255,${.1+.04*k})`;ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=80;i++){const x=i/80*W,y=H*(.3+.13*k)+90*Math.sin(x*.0028+TAU*u+k)+55*Math.sin(x*.0061-TAU*2*u+k*2);i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.stroke()}
    ctx.globalCompositeOperation='overlay';const f=Math.round(u*450);ctx.save();ctx.translate((f*97)%256,(f*57)%256);ctx.globalAlpha=.08;ctx.fillStyle=patt;ctx.fillRect(-256,-256,W+512,H+512);ctx.restore();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1};
};
