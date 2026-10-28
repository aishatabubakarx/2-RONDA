window.init=(id,scale)=>{S=scale||1;cv.width=W*S;cv.height=H*S;ctx=cv.getContext('2d',{alpha:false});C[id]();return 'ok'};
window.renderAt=ms=>{tl.seek(ms/1000);draw();return cv.toDataURL('image/png').slice(22)};
