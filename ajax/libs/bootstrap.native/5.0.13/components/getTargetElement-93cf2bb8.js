"use strict";const e=require("@thednp/shorty"),n="data-bs-target",s="data-bs-parent",g="data-bs-container",u=a=>{const o=[n,s,g,"href"],c=e.getDocument(a);return o.map(t=>{const r=e.getAttribute(a,t);return r?t===s?e.closest(a,r):e.querySelector(r,c):null}).filter(t=>t)[0]};exports.dataBsTarget=n;exports.getTargetElement=u;
//# sourceMappingURL=getTargetElement-93cf2bb8.js.map
