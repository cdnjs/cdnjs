/**! Qoopido.nucleus 3.1.9 | http://nucleus.qoopido.com | (c) 2020 Dirk Lueth */
!function(n){"use strict";provide(["../../function/property/unify","../../function/string/ucfirst","../prefix"],(function(r,i,t){var e=t(),o=n.createElement("div").style,u=/([A-Z])/g,f={};return function(n){n=r(n);var t=f[n]||null;if(null===t){t=!1;for(var c,l=0,a=i(n),s=(n+" "+a+" "+e.join(a+" ")+a).split(" "),v="";void 0!==(c=s[l]);l++)if(void 0!==o[c]){t=c,l>0&&(v="-");break}f[n]=t=!!t&&[v+t.replace(u,"-$1").toLowerCase(),t]}return t}}))}(document);
//# sourceMappingURL=property.js.map
