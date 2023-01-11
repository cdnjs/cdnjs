const e=(e,r=document)=>r.querySelector(e),r=(e,r=document)=>Array.from(r.querySelectorAll(e)),o=e=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{e()})})},t=e=>window.CSS&&window.CSS.escape?CSS.escape(e):e,c=e=>1e3*Number(e.slice(0,-1).replace(",","."));export{t as escapeCssIdentifier,o as nextTick,e as query,r as queryAll,c as toMs};
//# sourceMappingURL=utils.modern.js.map
