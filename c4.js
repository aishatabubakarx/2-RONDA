/* 13 THANK YOU IN 9 LANGUAGES - gold kinetic type */
C[13]=()=>{newTL();const R=rng(13),WORDS=[['Thank You','ENGLISH'],['Gracias','SPANISH'],['Merci','FRENCH'],['Danke','GERMAN'],['شكراً','ARABIC'],['Grazie','ITALIAN'],['Obrigado','PORTUGUESE'],['Asante','SWAHILI'],['Mahalo','HAWAIIAN'],['Thank You','ENGLISH']],SZ=215,SLOT=1.5;
  const words=WORDS.map(([s,lab],wi)=>{const ar=/[\u0600-\u06FF]/.test(s),f=ar?'Amiri':'Playfair Display',wt=ar?700:800,sz=ar?SZ*1.15:SZ;ctx.save();ctx.font=`${wt} ${sz}px "${f}"`;const parts=ar?[s]:[...s],ws=parts.map(c=>ctx.measureText(c).width);ctx.restore();
    const tot=ws.reduce((a,b)=>a+b,0);let x=W/2-tot/2;const U=parts.map((c,i)=>{const u={ch:c,x:x+ws[i]/2,w:ws[i],a:0,y:0,sc:1};x+=ws[i];return u});
    const t0=wi*SLOT,last=wi===WORDS.length-1,lb={a:0,l:0};U.forEach((u,i)=>{A(u,{a:0,y:60,sc:1.22},{a:1,y:0,sc:1},t0+i*.05,.6,'power3.out');if(!last)A(u,{a:1,y:0},{a:0,y:-46},t0+1.04+i*.015,.28,'power2.in')});
    A(lb,{a:0,l:0},{a:1,l:1},t0+.25,.6,'power2.out');if(!last)A(lb,{a:1},{a:0},t0+1.04,.28,'power2.in');
    return{U,f,wt,sz,tot,t0,lab,lb,last}});
  const dust=Array.from({length:60},()=>({x:R()*W,y:R()*H,r:1+R()*3,k:1+(R()*3|0),p:R()*TAU}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms);
    const bg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,900);bg.addColorStop(0,'rgba(120,80,10,.30)');bg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';for(const d of dust){const y=((d.y-ms*.012*d.k)%H+H)%H;ctx.globalAlpha=.18+.18*Math.sin(th*d.k*2+d.p);ctx.drawImage(spr([255,200,90],32),d.x-d.r*5,y-d.r*5,d.r*10,d.r*10)}ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    const fade=ms>14400?1-(ms-14400)/600:1;
    for(const w of words){if(ms<w.t0*1000-50||(!w.last&&ms>(w.t0+1.5)*1000))continue;const y0=H/2-10,p=clamp((ms-w.t0*1000)/1500*1.5-.25,-.5,1.5);
      const gr=ctx.createLinearGradient(W/2-w.tot/2,0,W/2+w.tot/2,0),q=c=>clamp(c,0,1),c0='#c8962f',c1='#a8741a';gr.addColorStop(0,'#e0b24a');gr.addColorStop(q(p-.14),c0);gr.addColorStop(q(p),'#fff7d6');gr.addColorStop(q(p+.14),c0);gr.addColorStop(1,c1);
      for(const u of w.U){if(u.a<.01||u.ch===' ')continue;ctx.save();ctx.translate(u.x,y0+u.y);ctx.scale(u.sc,u.sc);ctx.globalAlpha=u.a*fade;ctx.font=`${w.wt} ${w.sz}px "${w.f}"`;ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.shadowColor='rgba(255,190,70,.55)';ctx.shadowBlur=40*S;ctx.fillStyle='#d9a83f';ctx.fillText(u.ch,0,0);ctx.shadowBlur=0;ctx.translate(-u.x,0);ctx.fillStyle=gr;ctx.fillText(u.ch,u.x,0);ctx.restore()}
      ctx.globalAlpha=w.lb.a*fade;const lw=420*w.lb.l;ctx.fillStyle='rgba(235,190,90,.8)';ctx.fillRect(W/2-lw/2,y0+175,lw,2);txt(w.lab,W/2,y0+225,{f:'Montserrat',w:700,size:28,ls:16,fill:'rgba(240,205,120,.85)'});ctx.globalAlpha=1}};
};
/* 14 PAYMENT SUCCESSFUL CHECKMARK */
C[14]=()=>{const g={ring:0,fill:0,chk:0,t1:0,t2:0,t3:0,cnt:0};newTL();const cx=W/2,cy=H/2-160,Rr=140,R=rng(14);
  A(g,{ring:0},{ring:1},.3,.9,'power2.inOut');A(g,{fill:0},{fill:1},1.05,.6,'back.out(2.2)');A(g,{chk:0},{chk:1},1.4,.55,'power2.out');A(g,{t1:0},{t1:1},2.2,.8,'power3.out');A(g,{t2:0},{t2:1},2.7,.8,'power3.out');A(g,{cnt:0},{cnt:1},3,1.4,'power2.out');A(g,{t3:0},{t3:1},4.2,.8,'power3.out');
  const pts=Array.from({length:30},(_,i)=>({a:i/30*TAU+R()*.2,d:170+R()*240,r:3+R()*6,c:i%3}));const P=[[-56,6],[-14,48],[62,-42]],L1=Math.hypot(42,42),L2=Math.hypot(76,90),LT=L1+L2;
  draw=()=>{clear();const ms=now(),fade=ms>14400?1-(ms-14400)/600:1;
    const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,760);bg.addColorStop(0,`rgba(20,150,110,${.2+.05*Math.sin(TAU*ms/3000)})`);bg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.globalAlpha=fade;
    ctx.lineCap='round';if(g.ring>0){const gr=ctx.createLinearGradient(cx-Rr,cy-Rr,cx+Rr,cy+Rr);gr.addColorStop(0,'#5dffc0');gr.addColorStop(1,'#10b981');ctx.strokeStyle=gr;ctx.lineWidth=14;ctx.shadowColor='rgba(40,230,160,.8)';ctx.shadowBlur=30*S;ctx.beginPath();ctx.arc(cx,cy,Rr,-Math.PI/2,-Math.PI/2+g.ring*TAU);ctx.stroke();ctx.shadowBlur=0}
    if(g.fill>0){const fr_=Rr-8,s=g.fill;const gr=ctx.createLinearGradient(cx,cy-fr_,cx,cy+fr_);gr.addColorStop(0,'#34e8a2');gr.addColorStop(1,'#0e9f6e');ctx.fillStyle=gr;ctx.save();ctx.shadowColor='rgba(30,220,150,.6)';ctx.shadowBlur=50*S;ctx.beginPath();ctx.arc(cx,cy,fr_*s,0,TAU);ctx.fill();ctx.restore();
      const sw=((ms/5000)%1)*3-1;ctx.save();ctx.beginPath();ctx.arc(cx,cy,fr_*s,0,TAU);ctx.clip();const sg=ctx.createLinearGradient(cx+(sw-.2)*Rr*2,cy-Rr,cx+(sw+.2)*Rr*2,cy+Rr);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.35)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(cx-Rr,cy-Rr,Rr*2,Rr*2);ctx.restore()}
    if(g.chk>0){ctx.strokeStyle='#fff';ctx.lineWidth=24;ctx.lineJoin='round';const d=g.chk*LT;ctx.beginPath();ctx.moveTo(cx+P[0][0],cy+P[0][1]);if(d<=L1){const t=d/L1;ctx.lineTo(cx+P[0][0]+(P[1][0]-P[0][0])*t,cy+P[0][1]+(P[1][1]-P[0][1])*t)}else{const t=(d-L1)/L2;ctx.lineTo(cx+P[1][0],cy+P[1][1]);ctx.lineTo(cx+P[1][0]+(P[2][0]-P[1][0])*t,cy+P[1][1]+(P[2][1]-P[1][1])*t)}ctx.stroke()}
    for(const k of [0,1,2]){const u=fr((ms-1400)/3000-k/3);if(ms<1400)break;ctx.strokeStyle=rgba([60,235,170],(1-u)*.5);ctx.lineWidth=3+(1-u)*5;ctx.beginPath();ctx.arc(cx,cy,Rr+10+u*300,0,TAU);ctx.stroke()}
    const bp=(ms-1400)/1300;if(bp>0&&bp<1){const e=ez('power3.out',bp);ctx.globalCompositeOperation='lighter';for(const p of pts){ctx.globalAlpha=(1-bp)*fade;ctx.fillStyle=['#7dffcf','#fff','#2fe39a'][p.c];ctx.beginPath();ctx.arc(cx+Math.cos(p.a)*(Rr+p.d*e),cy+Math.sin(p.a)*(Rr+p.d*e),p.r*(1-bp*.5),0,TAU);ctx.fill()}ctx.globalCompositeOperation='source-over'}
    const rise=v=>(1-v)*40;ctx.globalAlpha=g.t1*fade;txt('Payment Successful',W/2,cy+Rr+150+rise(g.t1),{f:'Montserrat',w:800,size:92});
    ctx.globalAlpha=g.t2*fade;txt('$'+(149*g.cnt).toFixed(2),W/2,cy+Rr+270+rise(g.t2),{f:'Montserrat',w:900,size:120,fill:'#4cf0b0',glow:[['rgba(40,230,160,.5)',30]]});
    ctx.globalAlpha=g.t3*fade;txt('Transaction ID  #84721935',W/2,cy+Rr+370+rise(g.t3),{f:'JetBrains Mono',w:700,size:28,ls:3,fill:'rgba(180,215,205,.7)'});ctx.globalAlpha=1};
};
/* 15 TERMINAL CODE TYPING */
C[15]=()=>{newTL();const LINES=[['cmd',"git clone https://github.com/studio/launch-kit.git"],['out',"Cloning into 'launch-kit'..."],['out','remote: Enumerating objects: 2481, done.'],['cmd','cd launch-kit && npm install'],['out','added 312 packages in 4.1s'],['cmd','npm run build'],['out','> compiling modules .......... done'],['out','> optimizing assets ......... done'],['ok','[ok] build completed in 6.84s'],['cmd','npm run deploy'],['out','Uploading to edge network...'],['out','[####################] 100%'],['ok','[ok] live at https://launch-kit.app'],['cmd','']];
  let t=.9;const raw=LINES.reduce((a,[k,s])=>a+(k==='cmd'?s.length*.04+.55:.28),0),K=Math.min(1,13.4/raw);const lines=LINES.map(([k,s])=>{const l={k,s,p:0,t0:t},d=(k==='cmd'?Math.max(.2,s.length*.04):.28)*K;if(s)A(l,{p:0},{p:1},t,d,'none');l.t1=t+d;t+=d+(k==='cmd'?.5:.1)*K;return l});
  const x0=270,y0=250,LH=44,F=30,col={cmd:'#e6edf3',out:'#8b949e',ok:'#7ee787'};
  draw=()=>{clear();const ms=now();const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#060a14');bg.addColorStop(1,'#0a1426');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.fillStyle='rgba(120,160,255,.07)';for(let x=40;x<W;x+=48)for(let y=40;y<H;y+=48)ctx.fillRect(x,y,2,2);
    ctx.save();ctx.shadowColor='rgba(60,200,140,.28)';ctx.shadowBlur=90*S;roundRect(210,100,1500,880,18);ctx.fillStyle='#0d1117';ctx.fill();ctx.restore();roundRect(210,100,1500,880,18);ctx.strokeStyle='#263043';ctx.lineWidth=3;ctx.stroke();
    ctx.save();roundRect(210,100,1500,880,18);ctx.clip();ctx.fillStyle='#161b22';ctx.fillRect(210,100,1500,62);ctx.restore();[['#ff5f56',256],['#ffbd2e',296],['#27c93f',336]].forEach(([c,x])=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,131,10,0,TAU);ctx.fill()});
    txt('launch-kit  --  zsh',960,132,{f:'JetBrains Mono',w:700,size:22,ls:2,fill:'rgba(200,215,235,.5)'});
    let cur=null;lines.forEach((l,i)=>{const y=y0+i*LH;if(ms<l.t0*1000&&!(i===0))return;let n=Math.floor(l.p*l.s.length),show=l.s.slice(0,n),x=x0;
      if(l.k==='cmd'){if(ms<l.t0*1000)return;txt('$',x,y,{f:'JetBrains Mono',w:700,size:F,al:'left',fill:'#7ee787'});x+=tw('$ ','JetBrains Mono',700,F);
        const parts=show.split(/(https?:\/\/\S*)/);for(const pt of parts){if(!pt)continue;const isU=/^https?:/.test(pt);txt(pt,x,y,{f:'JetBrains Mono',w:700,size:F,al:'left',fill:isU?'#79c0ff':col.cmd});x+=tw(pt,'JetBrains Mono',700,F)}cur=[x,y]}
      else{if(ms<l.t0*1000)return;ctx.globalAlpha=Math.min(1,(ms-l.t0*1000)/120);txt(show,x,y,{f:'JetBrains Mono',w:700,size:F,al:'left',fill:/\[ok\]/.test(l.s)?col.ok:/^>/.test(l.s)?'#d2a8ff':col.out});ctx.globalAlpha=1;cur=[x+tw(show,'JetBrains Mono',700,F),y]}});
    if(cur&&Math.floor(ms/530)%2===0){ctx.fillStyle='#e6edf3';ctx.fillRect(cur[0]+6,cur[1]-17,16,34)}
    if(ms>14400){ctx.fillStyle=`rgba(0,0,0,${(ms-14400)/600})`;ctx.fillRect(0,0,W,H)}};
};
/* 16 CINEMATIC ANAMORPHIC LENS FLARE TRAILER TITLE */
C[16]=()=>{const g={st:0,fx:0,sub:0,sw:0,out:0};newTL();const R=rng(16),T='OFFICIAL TRAILER',SZ=104,ws=(()=>{ctx.save();ctx.font=`700 ${SZ}px "Montserrat"`;const w=[...T].map(c=>ctx.measureText(c).width);ctx.restore();return w})(),n=T.length;
  const U=[...T].map((c,i)=>{const u={ch:c,a:0,y:24,i};A(u,{a:0,y:24},{a:1,y:0},1.3+Math.abs(i-(n-1)/2)*.11,.9,'power2.out');return u}),ls={v:8};A(ls,{v:8},{v:30},1.2,3.4,'power3.out');
  A(g,{st:0},{st:1},.2,1.1,'expo.out');A(g,{sub:0},{sub:1},4.4,1,'power2.out');A(g,{sw:0},{sw:1},8,2.4,'power2.inOut');A(g,{out:0},{out:1},14.4,.6,'power1.in');
  const dust=Array.from({length:80},()=>({x:R()*W,y:R()*H,r:1+R()*2.5,k:1+(R()*3|0),p:R()*TAU}));
  draw=()=>{clear();const ms=now(),th=LOOP(ms),cy=H/2,fx=g.sw>0&&g.sw<1?-250+g.sw*(W+500):W/2,fi=g.st*(g.sw>0&&g.sw<1?1.5:.6+.1*Math.sin(th*8));
    const bg=ctx.createRadialGradient(W/2,cy,0,W/2,cy,1100);bg.addColorStop(0,'#0a1a2c');bg.addColorStop(1,'#02050a');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='lighter';for(const d of dust){const x=(d.x+ms*.01*d.k)%W;ctx.globalAlpha=.12+.12*Math.sin(th*d.k*2+d.p);ctx.drawImage(spr([120,180,255],32),x-d.r*4,d.y-d.r*4,d.r*8,d.r*8)}
    /* title */
    const tot=ws.reduce((a,b)=>a+b,0)+ls.v*(n-1);let x=W/2-tot/2;ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    U.forEach((u,i)=>{const cxl=x+ws[i]/2;x+=ws[i]+ls.v;if(u.a<.01||u.ch===' ')return;const lit=g.sw>0&&g.sw<1?Math.exp(-(((cxl-fx)/260)**2)):0;ctx.globalAlpha=u.a;
      txt(u.ch,cxl,cy-12+u.y,{f:'Montserrat',w:700,size:SZ,fill:lit>.05?rgba(mixc([225,238,255],[255,255,255],lit),1):'#dfe9f7',glow:[[`rgba(90,160,255,${.35+.5*lit})`,26+50*lit]]})});ctx.globalAlpha=1;
    if(g.sub>0)txt('THIS SUMMER',W/2,cy+120,{f:'Montserrat',w:700,size:34,ls:26,a:g.sub,fill:'rgba(190,215,245,.85)'});
    /* streak + flare */
    ctx.globalCompositeOperation='lighter';const wide=2100*g.st;
    ctx.globalAlpha=.55*fi;ctx.drawImage(spr([60,130,255],128),fx-wide/2,cy-46,wide,92);ctx.globalAlpha=.9*fi;ctx.drawImage(spr([120,190,255],128),fx-wide*.35,cy-14,wide*.7,28);ctx.globalAlpha=fi;ctx.drawImage(spr([200,230,255],128),fx-wide*.18,cy-4,wide*.36,8);
    ctx.globalAlpha=Math.min(1,fi);ctx.drawImage(spr([255,255,255],128),fx-70,cy-70,140,140);
    for(const [k,sz,c] of [[.55,60,[255,140,60]],[1.25,110,[60,200,255]],[-.45,40,[255,90,200]],[1.7,28,[255,220,120]],[.2,160,[90,120,255]]]){const gx=W/2+(W/2-fx)*k;ctx.globalAlpha=.3*fi*(g.sw>0&&g.sw<1?1:.4);ctx.drawImage(spr(c,64),gx-sz,cy+(k%1)*40-sz,sz*2,sz*2)}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    ctx.fillStyle='#000';ctx.fillRect(0,0,W,138);ctx.fillRect(0,H-138,W,138);
    if(g.out>0){ctx.fillStyle=`rgba(0,0,0,${g.out})`;ctx.fillRect(0,0,W,H)}};
};
