window.init=async(id,scale)=>{S=scale||1;cv.width=W*S;cv.height=H*S;ctx=cv.getContext('2d',{alpha:false});C[id]();tl.time(0,false);return 'ok'};
window.renderAt=ms=>{tl.time(ms/1000,false);draw();return cv.toDataURL('image/png').slice(22)};
