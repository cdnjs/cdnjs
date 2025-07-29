/**
  shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
  @version v5.1.0
  @link https://github.com/yowainwright/shave#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (jeffry.in)
  @license MIT
**/
var shave=(()=>{var b=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var D=Object.prototype.hasOwnProperty;var F=(e,t)=>{for(var s in t)b(e,s,{get:t[s],enumerable:!0})},G=(e,t,s,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of B(t))!D.call(e,r)&&r!==s&&b(e,r,{get:()=>t[r],enumerable:!(i=z(t,r))||i.enumerable});return e};var K=e=>G(b({},"__esModule",{value:!0}),e);var R={};F(R,{default:()=>O,updateTextProp:()=>E});function Q(e){return typeof e=="string"?[...document.querySelectorAll(e)]:"length"in e?[...e]:[e]}function O(e,t,s={}){if(typeof t>"u"||isNaN(t))throw Error("maxHeight is required");let i=Q(e);if(!i.length)return;let{character:r="\u2026",classname:C="js-shave",spaces:S=!0,charclassname:k="js-shave-char",link:l={},delimiter:a}=s,y=typeof S=="boolean"?S:!0,A=l&&JSON.stringify(l)!=="{}"&&l.href,P=A?"a":"span";for(let j=0;j<i.length;j+=1){let n=i[j],o=n.style,w=n.querySelector("."+C),h=n.textContent===void 0?"innerText":"textContent";w&&(n.removeChild(n.querySelector("."+k)),n[h]=n[h]);let v=n[h],c;if(a?c=v.split(a):c=y?v.split(" "):v,c.length<2)continue;let L=o.height;o.height="auto";let H=o.maxHeight;if(o.maxHeight="none",n.offsetHeight<=t){o.height=L,o.maxHeight=H;continue}let J=A&&l.textContent?l.textContent:r,d=document.createElement(P),q={className:k,textContent:J};for(let f in q)d[f]=q[f],d.textContent=r;if(A)for(let f in l)d[f]=l[f];let u=c.length-1,N=0,x;for(;N<u;){x=N+u+1>>1;let f=c.slice(0,x);n[h]=E(a,y,f),n.insertAdjacentElement("beforeend",d),n.offsetHeight>t?u=x-1:N=x}let M=c.slice(0,u);n[h]=E(a,y,M),n.insertAdjacentElement("beforeend",d);let p=c.slice(u),T=Array.isArray(p),g="";a&&T?g=a+p.join(a):y&&T?g=" "+p.join(" "):T?g=p.join(""):g=p;let W=document.createTextNode(g),m=document.createElement("span");m.classList.add(C),m.style.display="none",m.appendChild(W),n.insertAdjacentElement("beforeend",m),o.height=L,o.maxHeight=H}}function E(e,t,s){let i=Array.isArray(s);return e&&i?s.join(e):t&&i?s.join(" "):i?s.join(""):s}return K(R);})();
if (typeof module !== 'undefined' && module.exports) {
  module.exports = shave.default || shave;
} else if (typeof define === 'function' && define.amd) {
  define([], function() { return shave.default || shave; });
} else {
  window.shave = shave.default || shave;
}
//# sourceMappingURL=shave.global.js.map