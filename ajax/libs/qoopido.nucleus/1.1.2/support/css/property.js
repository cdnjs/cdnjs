/*! /support/css/property 1.1.2 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(n,r){"use strict";function t(t,e,i){var u=i(),o=n.createElement("div").style,f=/([A-Z])/g,c={};return function(n){n=t(n);var i=c[n]||null;if(null===i){i=!1;var l,a=0,s=e(n),p=(n+" "+s+" "+u.join(s+" ")+s).split(" "),v="";for(a;(l=p[a])!==r;a++)if(o[l]!==r){i=l,a>0&&(v="-");break}c[n]=i=i?[v+i.replace(f,"-$1").toLowerCase(),i]:!1}return i}}provide(["../../function/property/unify","../../function/string/ucfirst","../prefix"],t)}(document);
//# sourceMappingURL=property.js.map
