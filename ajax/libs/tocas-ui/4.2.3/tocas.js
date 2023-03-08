window.tocas = {
    config: {
        strict_responsive: false,
        attributes: {
            tab: "data-tab",
            tab_name: "data-name",
            toggle: "data-toggle",
            toggle_name: "data-name",
            dropdown: "data-dropdown",
            dropdown_name: "data-name",
            dropdown_position: "data-position",
            tooltip: "data-tooltip",
            tooltip_position: "data-position",
            tooltip_delay: "data-delay",
        },
        scopes: {
            tab: "@scope",
            toggle: "@scope",
            tab: "@scope",
            dropdown: "@scope",
            container: "@container",
        },
        classes: {
            hidden: "u-hidden",
            tab_active: "is-active",
            tooltip_visible: "is-visible",
            tab: "ts-tab",
        },
    },
};

//
(function () {
    // 1.2.2

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).TocasFloatingUICore={})}(this,(function(t){"use strict";function e(t){return t.split("-")[1]}function n(t){return"y"===t?"height":"width"}function i(t){return t.split("-")[0]}function o(t){return["top","bottom"].includes(i(t))?"x":"y"}function r(t,r,a){let{reference:l,floating:s}=t;const f=l.x+l.width/2-s.width/2,c=l.y+l.height/2-s.height/2,u=o(r),m=n(u),d=l[m]/2-s[m]/2,g="x"===u;let p;switch(i(r)){case"top":p={x:f,y:l.y-s.height};break;case"bottom":p={x:f,y:l.y+l.height};break;case"right":p={x:l.x+l.width,y:c};break;case"left":p={x:l.x-s.width,y:c};break;default:p={x:l.x,y:l.y}}switch(e(r)){case"start":p[u]-=d*(a&&g?-1:1);break;case"end":p[u]+=d*(a&&g?-1:1)}return p}function a(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function l(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function s(t,e){var n;void 0===e&&(e={});const{x:i,y:o,platform:r,rects:s,elements:f,strategy:c}=t,{boundary:u="clippingAncestors",rootBoundary:m="viewport",elementContext:d="floating",altBoundary:g=!1,padding:p=0}=e,h=a(p),y=f[g?"floating"===d?"reference":"floating":d],x=l(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(y)))||n?y:y.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(f.floating)),boundary:u,rootBoundary:m,strategy:c})),w="floating"===d?{...s.floating,x:i,y:o}:s.reference,v=await(null==r.getOffsetParent?void 0:r.getOffsetParent(f.floating)),b=await(null==r.isElement?void 0:r.isElement(v))&&await(null==r.getScale?void 0:r.getScale(v))||{x:1,y:1},R=l(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:v,strategy:c}):w);return{top:(x.top-R.top+h.top)/b.y,bottom:(R.bottom-x.bottom+h.bottom)/b.y,left:(x.left-R.left+h.left)/b.x,right:(R.right-x.right+h.right)/b.x}}const f=Math.min,c=Math.max;function u(t,e,n){return c(t,f(e,n))}const m=["top","right","bottom","left"],d=m.reduce(((t,e)=>t.concat(e,e+"-start",e+"-end")),[]),g={left:"right",right:"left",bottom:"top",top:"bottom"};function p(t){return t.replace(/left|right|bottom|top/g,(t=>g[t]))}function h(t,i,r){void 0===r&&(r=!1);const a=e(t),l=o(t),s=n(l);let f="x"===l?a===(r?"end":"start")?"right":"left":"start"===a?"bottom":"top";return i.reference[s]>i.floating[s]&&(f=p(f)),{main:f,cross:p(f)}}const y={start:"end",end:"start"};function x(t){return t.replace(/start|end/g,(t=>y[t]))}function w(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function v(t){return m.some((e=>t[e]>=0))}function b(t){return"x"===t?"y":"x"}t.arrow=t=>({name:"arrow",options:t,async fn(i){const{element:r,padding:l=0}=t||{},{x:s,y:f,placement:c,rects:m,platform:d,elements:g}=i;if(null==r)return{};const p=a(l),h={x:s,y:f},y=o(c),x=n(y),w=await d.getDimensions(r),v="y"===y,b=v?"top":"left",R=v?"bottom":"right",A=v?"clientHeight":"clientWidth",P=m.reference[x]+m.reference[y]-h[y]-m.floating[x],T=h[y]-m.reference[y],O=await(null==d.getOffsetParent?void 0:d.getOffsetParent(r));let E=O?O[A]:0;E&&await(null==d.isElement?void 0:d.isElement(O))||(E=g.floating[A]||m.floating[x]);const D=P/2-T/2,L=p[b],k=E-w[x]-p[R],C=E/2-w[x]/2+D,B=u(L,C,k),H=null!=e(c)&&C!=B&&m.reference[x]/2-(C<L?p[b]:p[R])-w[x]/2<0;return{[y]:h[y]-(H?C<L?L-C:k-C:0),data:{[y]:B,centerOffset:C-B}}}}),t.autoPlacement=function(t){return void 0===t&&(t={}),{name:"autoPlacement",options:t,async fn(n){var o,r,a;const{rects:l,middlewareData:f,placement:c,platform:u,elements:m}=n,{crossAxis:g=!1,alignment:p,allowedPlacements:y=d,autoAlignment:w=!0,...v}=t,b=void 0!==p||y===d?function(t,n,o){return(t?[...o.filter((n=>e(n)===t)),...o.filter((n=>e(n)!==t))]:o.filter((t=>i(t)===t))).filter((i=>!t||e(i)===t||!!n&&x(i)!==i))}(p||null,w,y):y,R=await s(n,v),A=(null==(o=f.autoPlacement)?void 0:o.index)||0,P=b[A];if(null==P)return{};const{main:T,cross:O}=h(P,l,await(null==u.isRTL?void 0:u.isRTL(m.floating)));if(c!==P)return{reset:{placement:b[0]}};const E=[R[i(P)],R[T],R[O]],D=[...(null==(r=f.autoPlacement)?void 0:r.overflows)||[],{placement:P,overflows:E}],L=b[A+1];if(L)return{data:{index:A+1,overflows:D},reset:{placement:L}};const k=D.map((t=>{const n=e(t.placement);return[t.placement,n&&g?t.overflows.slice(0,2).reduce(((t,e)=>t+e),0):t.overflows[0],t.overflows]})).sort(((t,e)=>t[1]-e[1])),C=(null==(a=k.filter((t=>t[2].slice(0,e(t[0])?2:3).every((t=>t<=0))))[0])?void 0:a[0])||k[0][0];return C!==c?{data:{index:A+1,overflows:D},reset:{placement:C}}:{}}}},t.computePosition=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:a=[],platform:l}=n,s=a.filter(Boolean),f=await(null==l.isRTL?void 0:l.isRTL(e));let c=await l.getElementRects({reference:t,floating:e,strategy:o}),{x:u,y:m}=r(c,i,f),d=i,g={},p=0;for(let n=0;n<s.length;n++){const{name:a,fn:h}=s[n],{x:y,y:x,data:w,reset:v}=await h({x:u,y:m,initialPlacement:i,placement:d,strategy:o,middlewareData:g,rects:c,platform:l,elements:{reference:t,floating:e}});u=null!=y?y:u,m=null!=x?x:m,g={...g,[a]:{...g[a],...w}},v&&p<=50&&(p++,"object"==typeof v&&(v.placement&&(d=v.placement),v.rects&&(c=!0===v.rects?await l.getElementRects({reference:t,floating:e,strategy:o}):v.rects),({x:u,y:m}=r(c,d,f))),n=-1)}return{x:u,y:m,placement:d,strategy:o,middlewareData:g}},t.detectOverflow=s,t.flip=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(n){var o;const{placement:r,middlewareData:a,rects:l,initialPlacement:f,platform:c,elements:u}=n,{mainAxis:m=!0,crossAxis:d=!0,fallbackPlacements:g,fallbackStrategy:y="bestFit",fallbackAxisSideDirection:w="none",flipAlignment:v=!0,...b}=t,R=i(r),A=i(f)===f,P=await(null==c.isRTL?void 0:c.isRTL(u.floating)),T=g||(A||!v?[p(f)]:function(t){const e=p(t);return[x(t),e,x(e)]}(f));g||"none"===w||T.push(...function(t,n,o,r){const a=e(t);let l=function(t,e,n){const i=["left","right"],o=["right","left"],r=["top","bottom"],a=["bottom","top"];switch(t){case"top":case"bottom":return n?e?o:i:e?i:o;case"left":case"right":return e?r:a;default:return[]}}(i(t),"start"===o,r);return a&&(l=l.map((t=>t+"-"+a)),n&&(l=l.concat(l.map(x)))),l}(f,v,w,P));const O=[f,...T],E=await s(n,b),D=[];let L=(null==(o=a.flip)?void 0:o.overflows)||[];if(m&&D.push(E[R]),d){const{main:t,cross:e}=h(r,l,P);D.push(E[t],E[e])}if(L=[...L,{placement:r,overflows:D}],!D.every((t=>t<=0))){var k,C;const t=((null==(k=a.flip)?void 0:k.index)||0)+1,e=O[t];if(e)return{data:{index:t,overflows:L},reset:{placement:e}};let n=null==(C=L.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:C.placement;if(!n)switch(y){case"bestFit":{var B;const t=null==(B=L.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:B[0];t&&(n=t);break}case"initialPlacement":n=f}if(r!==n)return{reset:{placement:n}}}return{}}}},t.hide=function(t){return void 0===t&&(t={}),{name:"hide",options:t,async fn(e){const{strategy:n="referenceHidden",...i}=t,{rects:o}=e;switch(n){case"referenceHidden":{const t=w(await s(e,{...i,elementContext:"reference"}),o.reference);return{data:{referenceHiddenOffsets:t,referenceHidden:v(t)}}}case"escaped":{const t=w(await s(e,{...i,altBoundary:!0}),o.floating);return{data:{escapedOffsets:t,escaped:v(t)}}}default:return{}}}}},t.inline=function(t){return void 0===t&&(t={}),{name:"inline",options:t,async fn(e){const{placement:n,elements:r,rects:s,platform:u,strategy:m}=e,{padding:d=2,x:g,y:p}=t,h=l(u.convertOffsetParentRelativeRectToViewportRelativeRect?await u.convertOffsetParentRelativeRectToViewportRelativeRect({rect:s.reference,offsetParent:await(null==u.getOffsetParent?void 0:u.getOffsetParent(r.floating)),strategy:m}):s.reference),y=await(null==u.getClientRects?void 0:u.getClientRects(r.reference))||[],x=a(d);const w=await u.getElementRects({reference:{getBoundingClientRect:function(){if(2===y.length&&y[0].left>y[1].right&&null!=g&&null!=p)return y.find((t=>g>t.left-x.left&&g<t.right+x.right&&p>t.top-x.top&&p<t.bottom+x.bottom))||h;if(y.length>=2){if("x"===o(n)){const t=y[0],e=y[y.length-1],o="top"===i(n),r=t.top,a=e.bottom,l=o?t.left:e.left,s=o?t.right:e.right;return{top:r,bottom:a,left:l,right:s,width:s-l,height:a-r,x:l,y:r}}const t="left"===i(n),e=c(...y.map((t=>t.right))),r=f(...y.map((t=>t.left))),a=y.filter((n=>t?n.left===r:n.right===e)),l=a[0].top,s=a[a.length-1].bottom;return{top:l,bottom:s,left:r,right:e,width:e-r,height:s-l,x:r,y:l}}return h}},floating:r.floating,strategy:m});return s.reference.x!==w.reference.x||s.reference.y!==w.reference.y||s.reference.width!==w.reference.width||s.reference.height!==w.reference.height?{reset:{rects:w}}:{}}}},t.limitShift=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:n,y:r,placement:a,rects:l,middlewareData:s}=e,{offset:f=0,mainAxis:c=!0,crossAxis:u=!0}=t,m={x:n,y:r},d=o(a),g=b(d);let p=m[d],h=m[g];const y="function"==typeof f?f(e):f,x="number"==typeof y?{mainAxis:y,crossAxis:0}:{mainAxis:0,crossAxis:0,...y};if(c){const t="y"===d?"height":"width",e=l.reference[d]-l.floating[t]+x.mainAxis,n=l.reference[d]+l.reference[t]-x.mainAxis;p<e?p=e:p>n&&(p=n)}if(u){var w,v;const t="y"===d?"width":"height",e=["top","left"].includes(i(a)),n=l.reference[g]-l.floating[t]+(e&&(null==(w=s.offset)?void 0:w[g])||0)+(e?0:x.crossAxis),o=l.reference[g]+l.reference[t]+(e?0:(null==(v=s.offset)?void 0:v[g])||0)-(e?x.crossAxis:0);h<n?h=n:h>o&&(h=o)}return{[d]:p,[g]:h}}}},t.offset=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(n){const{x:r,y:a}=n,l=await async function(t,n){const{placement:r,platform:a,elements:l}=t,s=await(null==a.isRTL?void 0:a.isRTL(l.floating)),f=i(r),c=e(r),u="x"===o(r),m=["left","top"].includes(f)?-1:1,d=s&&u?-1:1,g="function"==typeof n?n(t):n;let{mainAxis:p,crossAxis:h,alignmentAxis:y}="number"==typeof g?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...g};return c&&"number"==typeof y&&(h="end"===c?-1*y:y),u?{x:h*d,y:p*m}:{x:p*m,y:h*d}}(n,t);return{x:r+l.x,y:a+l.y,data:l}}}},t.rectToClientRect=l,t.shift=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:r,placement:a}=e,{mainAxis:l=!0,crossAxis:f=!1,limiter:c={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...m}=t,d={x:n,y:r},g=await s(e,m),p=o(i(a)),h=b(p);let y=d[p],x=d[h];if(l){const t="y"===p?"bottom":"right";y=u(y+g["y"===p?"top":"left"],y,y-g[t])}if(f){const t="y"===h?"bottom":"right";x=u(x+g["y"===h?"top":"left"],x,x-g[t])}const w=c.fn({...e,[p]:y,[h]:x});return{...w,data:{x:w.x-n,y:w.y-r}}}}},t.size=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(n){const{placement:r,rects:a,platform:l,elements:u}=n,{apply:m=(()=>{}),...d}=t,g=await s(n,d),p=i(r),h=e(r),y="x"===o(r),{width:x,height:w}=a.floating;let v,b;"top"===p||"bottom"===p?(v=p,b=h===(await(null==l.isRTL?void 0:l.isRTL(u.floating))?"start":"end")?"left":"right"):(b=p,v="end"===h?"top":"bottom");const R=w-g[v],A=x-g[b];let P=R,T=A;if(y?T=f(x-g.right-g.left,A):P=f(w-g.bottom-g.top,R),!n.middlewareData.shift&&!h){const t=c(g.left,0),e=c(g.right,0),n=c(g.top,0),i=c(g.bottom,0);y?T=x-2*(0!==t||0!==e?t+e:c(g.left,g.right)):P=w-2*(0!==n||0!==i?n+i:c(g.top,g.bottom))}await m({...n,availableWidth:T,availableHeight:P});const O=await l.getDimensions(u.floating);return x!==O.width||w!==O.height?{reset:{rects:!0}}:{}}}},Object.defineProperty(t,"__esModule",{value:!0})}));

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@floating-ui/core")):"function"==typeof define&&define.amd?define(["exports","@floating-ui/core"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).TocasFloatingUIDOM={},t.TocasFloatingUICore)}(this,(function(t,e){"use strict";function n(t){var e;return(null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function o(t){return n(t).getComputedStyle(t)}const i=Math.min,r=Math.max,l=Math.round;function c(t){const e=o(t);let n=parseFloat(e.width),i=parseFloat(e.height);const r=t.offsetWidth,c=t.offsetHeight,f=l(n)!==r||l(i)!==c;return f&&(n=r,i=c),{width:n,height:i,fallback:f}}function f(t){return h(t)?(t.nodeName||"").toLowerCase():""}let s;function u(){if(s)return s;const t=navigator.userAgentData;return t&&Array.isArray(t.brands)?(s=t.brands.map((t=>t.brand+"/"+t.version)).join(" "),s):navigator.userAgent}function a(t){return t instanceof n(t).HTMLElement}function d(t){return t instanceof n(t).Element}function h(t){return t instanceof n(t).Node}function p(t){if("undefined"==typeof ShadowRoot)return!1;return t instanceof n(t).ShadowRoot||t instanceof ShadowRoot}function g(t){const{overflow:e,overflowX:n,overflowY:i,display:r}=o(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!["inline","contents"].includes(r)}function m(t){return["table","td","th"].includes(f(t))}function y(t){const e=/firefox/i.test(u()),n=o(t),i=n.backdropFilter||n.WebkitBackdropFilter;return"none"!==n.transform||"none"!==n.perspective||!!i&&"none"!==i||e&&"filter"===n.willChange||e&&!!n.filter&&"none"!==n.filter||["transform","perspective"].some((t=>n.willChange.includes(t)))||["paint","layout","strict","content"].some((t=>{const e=n.contain;return null!=e&&e.includes(t)}))}function w(){return/^((?!chrome|android).)*safari/i.test(u())}function x(t){return["html","body","#document"].includes(f(t))}function b(t){return d(t)?t:t.contextElement}const v={x:1,y:1};function L(t){const e=b(t);if(!a(e))return v;const n=e.getBoundingClientRect(),{width:o,height:i,fallback:r}=c(e);let f=(r?l(n.width):n.width)/o,s=(r?l(n.height):n.height)/i;return f&&Number.isFinite(f)||(f=1),s&&Number.isFinite(s)||(s=1),{x:f,y:s}}function T(t,o,i,r){var l,c;void 0===o&&(o=!1),void 0===i&&(i=!1);const f=t.getBoundingClientRect(),s=b(t);let u=v;o&&(r?d(r)&&(u=L(r)):u=L(t));const a=s?n(s):window,h=w()&&i;let p=(f.left+(h&&(null==(l=a.visualViewport)?void 0:l.offsetLeft)||0))/u.x,g=(f.top+(h&&(null==(c=a.visualViewport)?void 0:c.offsetTop)||0))/u.y,m=f.width/u.x,y=f.height/u.y;if(s){const t=n(s),e=r&&d(r)?n(r):r;let o=t.frameElement;for(;o&&r&&e!==t;){const t=L(o),e=o.getBoundingClientRect(),i=getComputedStyle(o);e.x+=(o.clientLeft+parseFloat(i.paddingLeft))*t.x,e.y+=(o.clientTop+parseFloat(i.paddingTop))*t.y,p*=t.x,g*=t.y,m*=t.x,y*=t.y,p+=e.x,g+=e.y,o=n(o).frameElement}}return e.rectToClientRect({width:m,height:y,x:p,y:g})}function O(t){return((h(t)?t.ownerDocument:t.document)||window.document).documentElement}function R(t){return d(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function P(t){return T(O(t)).left+R(t).scrollLeft}function E(t){if("html"===f(t))return t;const e=t.assignedSlot||t.parentNode||p(t)&&t.host||O(t);return p(e)?e.host:e}function C(t){const e=E(t);return x(e)?e.ownerDocument.body:a(e)&&g(e)?e:C(e)}function j(t,e){var o;void 0===e&&(e=[]);const i=C(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),l=n(i);return r?e.concat(l,l.visualViewport||[],g(i)?i:[]):e.concat(i,j(i))}function F(t,i,l){let c;if("viewport"===i)c=function(t,e){const o=n(t),i=O(t),r=o.visualViewport;let l=i.clientWidth,c=i.clientHeight,f=0,s=0;if(r){l=r.width,c=r.height;const t=w();(!t||t&&"fixed"===e)&&(f=r.offsetLeft,s=r.offsetTop)}return{width:l,height:c,x:f,y:s}}(t,l);else if("document"===i)c=function(t){const e=O(t),n=R(t),i=t.ownerDocument.body,l=r(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),c=r(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let f=-n.scrollLeft+P(t);const s=-n.scrollTop;return"rtl"===o(i).direction&&(f+=r(e.clientWidth,i.clientWidth)-l),{width:l,height:c,x:f,y:s}}(O(t));else if(d(i))c=function(t,e){const n=T(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=a(t)?L(t):{x:1,y:1};return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(i,l);else{const e={...i};if(w()){var f,s;const o=n(t);e.x-=(null==(f=o.visualViewport)?void 0:f.offsetLeft)||0,e.y-=(null==(s=o.visualViewport)?void 0:s.offsetTop)||0}c=e}return e.rectToClientRect(c)}function D(t,e){return a(t)&&"fixed"!==o(t).position?e?e(t):t.offsetParent:null}function S(t,e){const i=n(t);let r=D(t,e);for(;r&&m(r)&&"static"===o(r).position;)r=D(r,e);return r&&("html"===f(r)||"body"===f(r)&&"static"===o(r).position&&!y(r))?i:r||function(t){let e=E(t);for(;a(e)&&!x(e);){if(y(e))return e;e=E(e)}return null}(t)||i}function W(t,e,n){const o=a(e),i=O(e),r=T(t,!0,"fixed"===n,e);let l={scrollLeft:0,scrollTop:0};const c={x:0,y:0};if(o||!o&&"fixed"!==n)if(("body"!==f(e)||g(i))&&(l=R(e)),a(e)){const t=T(e,!0);c.x=t.x+e.clientLeft,c.y=t.y+e.clientTop}else i&&(c.x=P(i));return{x:r.left+l.scrollLeft-c.x,y:r.top+l.scrollTop-c.y,width:r.width,height:r.height}}const A={getClippingRect:function(t){let{element:e,boundary:n,rootBoundary:l,strategy:c}=t;const s="clippingAncestors"===n?function(t,e){const n=e.get(t);if(n)return n;let i=j(t).filter((t=>d(t)&&"body"!==f(t))),r=null;const l="fixed"===o(t).position;let c=l?E(t):t;for(;d(c)&&!x(c);){const t=o(c),e=y(c);"fixed"===t.position?r=null:(l?e||r:e||"static"!==t.position||!r||!["absolute","fixed"].includes(r.position))?r=t:i=i.filter((t=>t!==c)),c=E(c)}return e.set(t,i),i}(e,this._c):[].concat(n),u=[...s,l],a=u[0],h=u.reduce(((t,n)=>{const o=F(e,n,c);return t.top=r(o.top,t.top),t.right=i(o.right,t.right),t.bottom=i(o.bottom,t.bottom),t.left=r(o.left,t.left),t}),F(e,a,c));return{width:h.right-h.left,height:h.bottom-h.top,x:h.left,y:h.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=a(n),r=O(n);if(n===r)return e;let l={scrollLeft:0,scrollTop:0},c={x:1,y:1};const s={x:0,y:0};if((i||!i&&"fixed"!==o)&&(("body"!==f(n)||g(r))&&(l=R(n)),a(n))){const t=T(n);c=L(n),s.x=t.x+n.clientLeft,s.y=t.y+n.clientTop}return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-l.scrollLeft*c.x+s.x,y:e.y*c.y-l.scrollTop*c.y+s.y}},isElement:d,getDimensions:function(t){return a(t)?c(t):t.getBoundingClientRect()},getOffsetParent:S,getDocumentElement:O,getScale:L,async getElementRects(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||S,r=this.getDimensions;return{reference:W(e,await i(n),o),floating:{x:0,y:0,...await r(n)}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>"rtl"===o(t).direction};Object.defineProperty(t,"arrow",{enumerable:!0,get:function(){return e.arrow}}),Object.defineProperty(t,"autoPlacement",{enumerable:!0,get:function(){return e.autoPlacement}}),Object.defineProperty(t,"detectOverflow",{enumerable:!0,get:function(){return e.detectOverflow}}),Object.defineProperty(t,"flip",{enumerable:!0,get:function(){return e.flip}}),Object.defineProperty(t,"hide",{enumerable:!0,get:function(){return e.hide}}),Object.defineProperty(t,"inline",{enumerable:!0,get:function(){return e.inline}}),Object.defineProperty(t,"limitShift",{enumerable:!0,get:function(){return e.limitShift}}),Object.defineProperty(t,"offset",{enumerable:!0,get:function(){return e.offset}}),Object.defineProperty(t,"shift",{enumerable:!0,get:function(){return e.shift}}),Object.defineProperty(t,"size",{enumerable:!0,get:function(){return e.size}}),t.autoUpdate=function(t,e,n,o){void 0===o&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:l=!0,animationFrame:c=!1}=o,f=i&&!c,s=f||r?[...d(t)?j(t):t.contextElement?j(t.contextElement):[],...j(e)]:[];s.forEach((t=>{f&&t.addEventListener("scroll",n,{passive:!0}),r&&t.addEventListener("resize",n)}));let u,a=null;if(l){let o=!0;a=new ResizeObserver((()=>{o||n(),o=!1})),d(t)&&!c&&a.observe(t),d(t)||!t.contextElement||c||a.observe(t.contextElement),a.observe(e)}let h=c?T(t):null;return c&&function e(){const o=T(t);!h||o.x===h.x&&o.y===h.y&&o.width===h.width&&o.height===h.height||n();h=o,u=requestAnimationFrame(e)}(),n(),()=>{var t;s.forEach((t=>{f&&t.removeEventListener("scroll",n),r&&t.removeEventListener("resize",n)})),null==(t=a)||t.disconnect(),a=null,c&&cancelAnimationFrame(u)}},t.computePosition=(t,n,o)=>{const i=new Map,r={platform:A,...o},l={...r.platform,_c:i};return e.computePosition(t,n,{...r,platform:l})},t.getOverflowAncestors=j,t.platform=A,Object.defineProperty(t,"__esModule",{value:!0})}));


    /* ==========================================================================
       Responsive
       ========================================================================== */

    class Responsive {
        constructor() {
            // 這個 ResizeObserver 會監聽所有 Container 的尺寸異動，
            // 如果有異動就檢查裡面的所有響應式元素是否需要變動樣式。
            this.resize_observer = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    this.getAllContaineredElements(entry.target).forEach(element => {
                        this.check(element);
                    });
                });
            });
        }

        // attributeMutation
        attributeMutation = mutation => {
            // 如果有任何樣式異動，就馬上檢查這個元素的響應式渲染。
            // NOTE: 他目前會造成無限迴圈 :(
            // this.check(mutation.target);

            // 如果這個元素被追加 Container 樣式，就把他視為容器來監聽尺寸異動，
            // 但如果不再是 Container 的話，就從監聽裡移除。
            if (this.isContainer(mutation.target)) {
                this.resize_observer.observe(mutation.target);
            } else {
                this.resize_observer.unobserve(mutation.target);
            }
        };

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果這個追加的新元素帶有響應式樣式，就立即檢查響應式渲染。
            if (this.isResponsiveElement(added_node)) {
                this.check(added_node);
            }

            // 如果這個追加的新元素是一個 Container，就納入容器的尺寸監聽裡。
            if (this.isContainer(added_node)) {
                this.resize_observer.observe(added_node);
            }
        };

        // getAllContaineredElements
        getAllContaineredElements = container => {
            return container.querySelectorAll(tocas.config.strict_responsive ? `[class^="@"]:is([class*=":is-"],[class*=":u-"])` : `[class^="@"][class*=":"]`);
        };

        // getAllResponsiveElements
        getAllResponsiveElements = container => {
            return container.querySelectorAll(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"]` : `[class*=":"]`);
        };

        // isContainer
        isContainer = element => {
            return element.matches(`[class~="${tocas.config.scopes.container}"]`);
        };

        // isResponsiveElement
        isResponsiveElement = element => {
            return element.matches(tocas.config.strict_responsive ? `[class*=":is-"],[class*=":u-"]` : `[class*=":"]`);
        };

        // hasResponsiveClass
        hasResponsiveClass = class_name => {
            return tocas.config.strict_responsive ? class_name.includes(":is-") || class_name.includes(":u-") : class_name.includes(":");
        };

        // windowResize
        windowResize = () => {
            this.getAllResponsiveElements(document).forEach(element => {
                this.check(element);
            });
        };

        // unit
        unit = value => {
            return parseInt(value, 10) || 0;
        };

        // breakpointSize
        breakpointSize = (breakpoint, element) => {
            var style = window.getComputedStyle(element);

            return {
                min: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-min`)),
                max: this.unit(style.getPropertyValue(`--ts-breakpoint-${breakpoint}-max`)),
            };
        };

        // rule
        rule = (rule, element) => {
            // 判斷規則有沒有 @ 開頭來看是不是一個 Container Query。
            // @breakpoint
            var is_container_query = rule.startsWith("@");

            // 判斷規則的結尾有沒有 + 來看是不是要求大於或等於這個中斷點。
            // breakpoint+, [size]+
            var is_equal_or_greater = rule.endsWith("+");

            // 判斷規則的結尾有沒有 - 來看是不是要求小於或等於這個中斷點。
            // breakpoint-, [size]-
            var is_equal_or_lesser = rule.endsWith("-");

            // 判斷這個規則有沒有包含 [ 來看是不是一個自訂尺寸，不判斷開頭是因為開頭可能是 @ 一個 Container Query。
            // [size]
            var is_custom_size = rule.includes("[");

            // 移除首要的 @ 符號。
            if (is_container_query) {
                rule = rule.substring(1);
            }

            // 移除結尾的 +, - 符號。
            if (is_equal_or_greater || is_equal_or_lesser) {
                rule = rule.substring(0, rule.length - 1);
            }

            // 移除首要跟結尾的 [ 跟 ] 符號。
            if (is_custom_size) {
                rule = rule.substring(1).substring(0, rule.length - 1);
            }

            // 從 breakpoint-breakpoint 結構中拆出 min, max 值，如果有的話。
            var [min_breakpoint, max_breakpoint] = rule.split("-");

            // 如果是自訂尺寸的話，就直接把規則當作 Unit 去解析，不去讀元素的中斷點定義。
            if (is_custom_size) {
                // 如果是大於或等於的定義，就從 Unit 裡面解析最小起始點，然後最大值設為 99999。
                // [size] +
                if (is_equal_or_greater) {
                    return [this.unit(min_breakpoint), 99999];
                }

                // 如果是小於或等於的定義，最小值設為 0，然後 Unit 裡面的最小起始點就是目標最大值。
                // [size] -
                if (is_equal_or_lesser) {
                    return [0, this.unit(min_breakpoint)];
                }

                // [minSize-maxSize]
                return [this.unit(min_breakpoint), this.unit(max_breakpoint)];
            }

            // 從目前這個元素繼承的中斷點來搜尋最小的定義。
            var from = this.breakpointSize(min_breakpoint, element);

            // 如果這個規則有找到最大中斷點，那麼他就是 breakpoint-breakpoint 規則
            // 所以我們取得最大中斷點的像素定義，然後同時回傳最小跟最大的定義。
            if (max_breakpoint !== undefined) {
                return [from.min, this.breakpointSize(max_breakpoint, element).max];
            }

            // 如果是大於或等於的定義，就從繼承的定義裡取得最小起始點，然後最大值設為 99999。
            // breakpoint+
            if (is_equal_or_greater) {
                return [from.min, 99999];
            }

            // 如果是小於或等於的定義，最小值設為 0，然後繼承的定義裡，最小起始點就是目標最大值。
            // breakpoint-
            if (is_equal_or_lesser) {
                return [0, from.max];
            }

            // 如果這個定義不是大於也不是小於，就取得這個中斷點的最小與最大值定義，
            // 這個規則只會在這個中斷點生效。
            // breakpoint
            return [from.min, from.max];
        };

        // compile
        compile = element => {
            return Array.from(element.classList)
                .filter(class_name => this.hasResponsiveClass(class_name))
                .map(class_name => {
                    // 透過 `:` 來切分規則跟想要切換的樣式名稱。
                    var [rule, target_class] = class_name.split(":");

                    // 從規則解析這個樣式的中斷點起始與結束定義。
                    var [min, max] = this.rule(rule, element);

                    // 如果這個規則開頭有個 @ 符號，就尋找最近的 Container 容器來作為寬度判斷，
                    // 但如果沒有，就以視窗的 innerWidth 為主。
                    // @breakpoint
                    var width = rule.startsWith("@")
                        ? Math.round(element.closest(`[class~="${tocas.config.scopes.container}"]`).getBoundingClientRect().width)
                        : Math.round(window.innerWidth);

                    return {
                        min,
                        max,
                        width,
                        target_class,
                    };
                });
        };

        // check
        check = element => {
            // 這個陣列會用來記得我們在目前中斷點有哪些樣式是生效的，
            // 這樣遇到不相符的中斷點，就不會因為起衝突然後又把他們移除掉。
            var applieds = [];

            // 篩選這個元素所有不含響應規則的樣式並且先把需要的樣式計算出相關中繼點來做整理。
            var compiled_list = this.compile(element);

            // 先跑一輪符合目前中斷點的樣式。
            compiled_list.forEach(({ width, min, max, target_class }) => {
                // 如果寬度符合這個中斷點，就套用對應的樣式。
                if (width >= min && width <= max) {
                    element.classList.add(target_class);

                    // 把這個樣式儲存到記憶陣列裡，這樣等一下就不會又移除他。
                    applieds = [...applieds, target_class];
                }
            });

            // 另外跑一輪不相符的中斷點，檢查有哪些不對的樣式應該移除掉。
            compiled_list.forEach(({ width, min, max, target_class }) => {
                // 如果寬度不符合這個中斷點，而且這個樣式也不是剛才追加的，就移除這個不符合條件的樣式。
                if ((width < min || width > max) && !applieds.includes(target_class)) {
                    element.classList.remove(target_class);
                }
            });
        };
    }

    /* ==========================================================================
       Stash
       ========================================================================== */

    /*class Stash {
        constructor() {}

        // attributeMutation
        attributeMutation(mutation) {}

        // addedNodeMutation
        addedNodeMutation(added_node) {
            if (addedNode.matches(`[data-stash]`)) {
                this.initial(added_node);
            }
        }

        // initial
        initial(element) {
            if (element.classList.contains("is-init")) {
                return;
            }
            element.classList.add("is-init");

            var clone = element.cloneNode(true);
            clone.classList.add("ts-stash");

            var toggle_name = element.getAttribute("data-stash");

            var toggle = document.querySelector(`[data-name="${toggle_name}"]`);

            if (toggle.closest("[data-stash]") === element) {
                var width = document.querySelector(`[data-name="${toggle_name}"]`).getBoundingClientRect().width;

                clone.style.setProperty("--ts-stash-offset", `${width + 5}px`);
            }

            element.after(clone);

            const observer = new IntersectionObserver(
                (entries, owner) => {
                    entries.forEach(entry => {
                        var stash = entry.target.getAttribute("data-target");

                        if (entry.isIntersecting) {
                            element.querySelector(`[data-target="${stash}"]`).classList.remove(tocas.config.classes.hidden);
                            document.querySelector(`[data-name="${stash}"]`).classList.add(tocas.config.classes.hidden);
                        } else {
                            element.querySelector(`[data-target="${stash}"]`).classList.add(tocas.config.classes.hidden);
                            document.querySelector(`[data-name="${stash}"]`).classList.remove(tocas.config.classes.hidden);
                        }

                        if (element.querySelectorAll(`.${tocas.config.classes.hidden}[data-target]`).length > 0) {
                            document.querySelector(`[data-name="${toggle_name}"]`).classList.remove(tocas.config.classes.hidden);
                        } else {
                            document.querySelector(`[data-name="${toggle_name}"]`).classList.add(tocas.config.classes.hidden);
                        }
                    });
                },
                {
                    root: clone,
                    rootMargin: "0px 0px 0px 0px",
                    threshold: [0.99],
                }
            );

            clone.querySelectorAll("[data-target]").forEach(v => {
                observer.observe(v);
            });
        }
    }*/

    /* ==========================================================================
       Tab
       ========================================================================== */

    class Tab {
        constructor() {}

        // attributeMutation
        attributeMutation = mutation => {};

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果這個新追加的 DOM 節點是一個 Tab 模組，就監聽其點擊事件。
            if (this.isTab(added_node)) {
                // 監聽其點擊事件。
                this.bindEventListener(added_node);

                // 如果這個項目沒有被啟用，就預設隱藏對應的內容，這樣使用者就不用額外手動隱藏該內容。
                this.initialTab(added_node);
            }
        };

        // isTab
        isTab = element => {
            return element.matches(`[${tocas.config.attributes.tab}]`);
        };

        // isActiveTab
        isActiveTab = element => {
            return element.classList.contains(tocas.config.classes.tab_active);
        };

        // initialTab
        initialTab = element => {
            if (!this.isActiveTab(element)) {
                searchScopeTargets(element, element.getAttribute(tocas.config.attributes.tab), tocas.config.scopes.tab, tocas.config.attributes.tab_name).forEach(target => {
                    target.classList.add(tocas.config.classes.hidden);
                });
            }
        };

        // toggle
        toggle = event => {
            // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的分頁模組。
            var element = event.target.closest(`[${tocas.config.attributes.tab}]`);

            // 取得這個分頁模組要切換的目標內容名稱。
            var tab_name = element.getAttribute(tocas.config.attributes.tab);

            // 取得這個分頁模組最鄰近的命名空間容器。
            var container = element.closest(`[class*="${tocas.config.scopes.tab}"]`) || document;

            // 取得這個 `.ts-tab` 的分頁群組元素。
            var tab_group_element = element.closest(".ts-tab");

            // 建立一個陣列用來收集等一下所有不相關的分頁，這樣就可以一次關閉。
            var should_close = [];

            // 在同個分頁群組裡，透過掃描每個分頁項目來找出有哪些關聯的分頁內容名稱。
            tab_group_element.querySelectorAll(`[${tocas.config.attributes.tab}]`).forEach(v => {
                // 如果這個項目就是我們要啟用的分頁，那就啟用這個項目。
                if (v.getAttribute(tocas.config.attributes.tab) === tab_name) {
                    v.classList.add(tocas.config.classes.tab_active);
                }

                // 但如果這個項目不是我們要啟用的分頁。
                else {
                    // 收集這個項目的目標分頁名稱，等一下就能一次隱藏這些非目標內容。
                    should_close = [...should_close, v.getAttribute(tocas.config.attributes.tab)];

                    // 移除這個項目的啟用狀態，因為這個項目本來就不是我們要啟用的。
                    v.classList.remove(tocas.config.classes.tab_active);
                }
            });

            // 在這個命名空間裡面處理對應的項目內容。
            container.querySelectorAll(`[${tocas.config.attributes.tab_name}]`).forEach(target => {
                // 取得這個目標內容最鄰近的命名空間，若沒有則以 document 為主。
                var closest_container = target.closest(`[class*="${tocas.config.scopes.tab}"]`) || document;

                // 確定這個目標內容最鄰近的命名空間和目前操作的分頁群組是同個命名空間，
                // 這樣就不會處理到其他子空間的分頁和目標。
                if (container !== closest_container) {
                    return;
                }

                // 如果這個目標內容就是我們想要啟用的分頁目標，那就移除這個內容原先的隱藏樣式。
                if (target.getAttribute(tocas.config.attributes.tab_name) === tab_name) {
                    target.classList.remove(tocas.config.classes.hidden);
                }

                // 但若這個內容目標包含在先前想要隱藏的清單內，那就隱藏這個內容目標。
                else if (should_close.includes(target.getAttribute(tocas.config.attributes.tab_name))) {
                    target.classList.add(tocas.config.classes.hidden);
                }
            });
        };

        // bindEventListener
        bindEventListener = element => {
            element.removeEventListener("click", this.toggle);
            element.addEventListener("click", this.toggle);
        };
    }

    /* ==========================================================================
       Toggle
       ========================================================================== */

    class Toggle {
        // attributeMutation
        attributeMutation = mutation => {};

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果這個新追加的 DOM 節點是一個 Toggle 模組，就監聽其點擊事件。
            if (this.isToggle(added_node)) {
                this.bindEventListener(added_node);
            }
        };

        // isToggle
        isToggle = element => {
            return element.matches(`[${tocas.config.attributes.toggle}]`);
        };

        // toggle
        toggle = event => {
            // 有時候點擊按鈕可能是裡面的圖示觸發事件，所以要取得點擊後最鄰近的切換模組。
            var element = event.target.closest(`[${tocas.config.attributes.toggle}]`);

            // 透過 `:` 從規則裡切分出目標名稱還有欲切換的樣式名稱。
            var [name, class_name] = element.getAttribute(tocas.config.attributes.toggle).split(":");

            // 尋找同個命名空間裡的所有目標，然後切換所有目標元素的指定樣式。
            searchScopeTargets(element, name, tocas.config.scopes.toggle, tocas.config.attributes.toggle_name).forEach(target => {
                target.classList.toggle(class_name);
            });
        };

        // bindEventListener
        bindEventListener = element => {
            element.removeEventListener("click", this.toggle);
            element.addEventListener("click", this.toggle);
        };
    }

    /* ==========================================================================
       Dropdown
       ========================================================================== */

    class Dropdown {
        // attributeMutation
        attributeMutation = mutation => {};

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果這個追加的 DOM 元素是一個會觸發彈出式選單的元素，就監聽其點擊事件。
            if (this.isDropdownTrigger(added_node)) {
                this.bindEventListener(added_node);
            }

            // 如果這個追加的 DOM 元素是一個彈出式選單容器，就監聽其選項點擊事件。
            if (this.isDropdown(added_node)) {
                this.bindItemEventListener(added_node);
            }
        };

        // isDropdownTrigger
        isDropdownTrigger = element => {
            return element.matches(`[${tocas.config.attributes.dropdown}]`);
        };

        // isDropdown
        isDropdown = element => {
            return element.matches(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`);
        };

        // position
        position = element => {
            return element.getAttribute(tocas.config.attributes.dropdown_position) || "bottom";
        };

        // windowClick
        windowClick = event => {
            // 取得這個視窗點擊最鄰近的 Dropdown 模組觸發元素。
            var closest_trigger = event.target.closest(`[${tocas.config.attributes.dropdown}]`);

            // 取得這個視窗點擊最鄰近的 Dropdown 容器本身。
            var closest_dropdown = event.target.closest(`[${tocas.config.attributes.dropdown_name}]`);

            // 如果這個點擊事件既沒有關聯任何觸發元素，也沒有在點擊任何 Dropdown 容器，
            // 那使用者應該就是在點擊其他東西，所以關閉所有頁面上可見的彈出式選單。
            if (closest_trigger === null && closest_dropdown === null) {
                document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                    this.closeDropdown(dropdown);
                });
            }

            // 如果這個點擊事件是在點擊一個會開關 Dropdown 的觸發元素。
            if (closest_trigger !== null) {
                // 取得這個觸發元素原本會打開的 Dropdown 名稱。
                var name = closest_trigger.getAttribute(tocas.config.attributes.dropdown);

                // 透過該名稱搜尋對應的 Dropdown。
                var local_dropdown = searchScopeTargets(closest_trigger, name, tocas.config.scopes.dropdown, tocas.config.attributes.dropdown_name)[0];

                // 除了找到的這個對應 Dropdown 以外，關掉其他所有 Dropdown。
                this.closeDropdownsExcept(local_dropdown);
            }

            // 如果這個點擊事件是在點擊某個 Dropdown 容器或內部的項目。
            if (closest_dropdown !== null) {
                // 關閉這個 Dropdown 以外的其他所有 Dropdown。
                this.closeDropdownsExcept(closest_dropdown);
            }
        };

        // closeDropdownsExcept
        closeDropdownsExcept = excluded_dropdown => {
            document.querySelectorAll(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`).forEach(dropdown => {
                if (dropdown !== excluded_dropdown) {
                    this.closeDropdown(dropdown);
                }
            });
        };

        // bindEventListener
        bindEventListener = element => {
            element.removeEventListener("click", this.clickEventListener);
            element.addEventListener("click", this.clickEventListener);
        };

        // bindItemEventListener
        bindItemEventListener = element => {
            element.removeEventListener("click", this.itemClickEventListener);
            element.addEventListener("click", this.itemClickEventListener);
        };

        // closeDropdown
        closeDropdown = dropdown => {
            // 如果這個元素不包含 `ts-dropdown` 或者也不是可見狀態，就忽略不計。
            if (!dropdown.classList.contains(".ts-dropdown") && !dropdown.classList.contains("is-visible")) {
                return;
            }

            // 移除這個彈出式選單的可見狀態。
            dropdown.classList.remove("is-visible");

            // 如果這個彈出式選單有 FLoating UI 的清除函式，就呼叫該清除函式，
            // 然後重設對應的 CSS 變數。
            if (dropdown.tocas_dropdown !== undefined) {
                dropdown.tocas_dropdown();
                dropdown.tocas_dropdown = undefined;
                dropdown.style.removeProperty("--ts-dropdown-min-width");
                dropdown.style.removeProperty("--ts-dropdown-position");
            }
        };

        // itemClickEventListener
        itemClickEventListener = event => {
            // 取得這個點擊事件最鄰近的彈出式選單。
            var dropdown = event.target.closest(`.ts-dropdown[${tocas.config.attributes.dropdown_name}]`);

            // 如果找不到點擊事件最鄰近的選單項目，
            // 那可能點擊的不是項目而是其他容器裡的東西，那就忽略這個動作。
            if (event.target.closest(".item") === null) {
                return;
            }

            // 項目點擊成功，關閉這個彈出式選單。
            this.closeDropdown(dropdown);
        };

        // clickEventListener
        clickEventListener = event => {
            //
            var element = event.target.closest(`[${tocas.config.attributes.dropdown}]`);

            // 取得這個觸發元素會切換的彈出式選單名稱。
            var name = element.getAttribute(tocas.config.attributes.dropdown);

            // 透過命名空間搜尋對應的彈出式選單。
            var target = searchScopeTargets(element, name, tocas.config.scopes.dropdown, tocas.config.attributes.dropdown_name)[0];

            // 取得目標選單的偏好位置設定。
            var position = this.position(target);

            // 如果那個選單有 Floating UI 清除函式，就先清除並且重設相關位置設定。
            if (target.tocas_dropdown !== undefined) {
                target.tocas_dropdown();
                target.tocas_dropdown = undefined;
                target.style.removeProperty("--ts-dropdown-min-width");
                target.style.removeProperty("--ts-dropdown-position");
            }

            // 切換目標彈出式選單的可見度。
            target.classList.toggle("is-visible");

            // 如果目標選單現在不再可見，就是被隱藏了，那就不需要執行接下來的行為。
            if (!target.classList.contains("is-visible")) {
                return;
            }

            // 設定選單的最小寬度和絕對位置，至少要跟切換觸發元素一樣寬。
            target.style.setProperty("--ts-dropdown-min-width", `${element.getBoundingClientRect().width}px`);
            target.style.setProperty("--ts-dropdown-position", `fixed`);

            // 透過 Floating UI 來觸發浮動顯示。
            target.tocas_dropdown = TocasFloatingUIDOM.autoUpdate(element, target, () => {
                TocasFloatingUIDOM.computePosition(element, target, {
                    strategy: "fixed",
                    placement: position,
                    middleware: [
                        // 選單某面如果沒有空間就被擠兌到另一邊。
                        TocasFloatingUIDOM.flip({
                            crossAxis: false,
                        }),

                        // 偏移選單的上下垂直留點空隙。
                        TocasFloatingUIDOM.offset(8),

                        // 選單會被螢幕左右推移，避免超出畫面空間。
                        TocasFloatingUIDOM.shift(),
                    ],
                }).then(({ x, y }) => {
                    // 賦予彈出式選單絕對位置。
                    Object.assign(target.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });
                });
            });
        };
    }

    /* ==========================================================================
       Tooltip
       ========================================================================== */

    class Tooltip {
        // attributeMutation
        attributeMutation = mutation => {
            // 如果追加的屬性包含 Tooltip 模組相關字樣，就監聽其互動事件。
            if (this.isTooltip(mutation.target)) {
                this.bindEventListener(mutation.target);
            }
        };

        // addedNodeMutation
        addedNodeMutation = added_node => {
            // 如果追加的 DOM 節點是一個 Tooltip 模組就監聽其互動事件。
            if (this.isTooltip(added_node)) {
                this.bindEventListener(added_node);
            }
        };

        // isTooltip
        isTooltip = element => {
            return element.matches(`[${tocas.config.attributes.tooltip}]`);
        };

        // bindEventListener
        bindEventListener = element => {
            // 重設這個元素的彈出提示計時器。
            element.tocas_tooltip_timer = null;

            // 監聽滑鼠移入跟移出的事件。
            element.removeEventListener("mouseover", this.enterEventListener);
            element.addEventListener("mouseover", this.enterEventListener);

            element.removeEventListener("mouseleave", this.leaveEventListener);
            element.addEventListener("mouseleave", this.leaveEventListener);
        };

        // delay
        delay = element => {
            // 從元素的屬性裡取得延遲的定義，如果是 0 就回傳 0。
            // 不直接丟給 parseInt 是因為可能會被當 false 值而回傳預設的 200ms。
            var delay = element.getAttribute(tocas.config.attributes.tooltip_delay);
            if (delay === "0") {
                return 0;
            }
            return parseInt(delay, 10) || 200;
        };

        // position
        position = element => {
            return element.getAttribute(tocas.config.attributes.tooltip_position) || "bottom";
        };

        // enterEventListener
        enterEventListener = event => {
            var element = event.target.closest(`[${tocas.config.attributes.tooltip}]`);

            // 如果目前的裝置是觸控裝置就忽略工具提示的觸發行為。
            if (window.matchMedia("(pointer: coarse)").matches) {
                return;
            }

            // 如果上一個工具提示的觸發計時器還存在或浮動元素還在的話，就忽略本次觸發行為，
            // 避免二次觸發而造成不可預期的錯誤。
            if (element.tocas_tooltip_timer !== null || element.tocas_tooltip !== undefined) {
                return;
            }

            // 初始化一個會顯示工具提示的計時器，這樣滑鼠移入的數秒後就會顯示。
            element.tocas_tooltip_timer = setTimeout(() => {
                this.showTooltip(element);
            }, this.delay(element) + 1);
        };

        // leaveEventListener
        leaveEventListener = event => {
            var element = event.target.closest(`[${tocas.config.attributes.tooltip}]`);

            // 如果離開的元素不是主元素就忽略，
            // 如：使用者可能是離開了裡面的圖示元素，但滑鼠其實還在主元素裡。
            if (event.target !== element) {
                return;
            }

            // 如果浮動元素存在的話，就呼叫浮動元素的解除函式，然後歸零這個變數。
            if (element.tocas_tooltip !== undefined) {
                element.tocas_tooltip();
                element.tocas_tooltip = undefined;
            }

            // 如果原先的計時器存在的話，就先重設，避免重複觸發。
            if (element.tocas_tooltip_timer !== null) {
                clearTimeout(element.tocas_tooltip_timer);
                element.tocas_tooltip_timer = null;
            }

            // 移除頁面上的所有工具提示。
            document.querySelectorAll(".ts-tooltip").forEach(tooltip => {
                tooltip.remove();
            });
        };

        // createTooltip
        createTooltip = (element, arrow) => {
            var tooltip = document.createElement("div");
            tooltip.innerText = element.getAttribute(tocas.config.attributes.tooltip);
            tooltip.classList.add("ts-tooltip", tocas.config.classes.tooltip_visible);

            tooltip.appendChild(arrow);
            return tooltip;
        };

        // createArrow
        createArrow = () => {
            var arrow = document.createElement("div");
            arrow.classList.add("arrow");
            return arrow;
        };

        // showTooltip
        showTooltip = element => {
            // 取得這個工具提示的位置設定。
            var position = this.position(element);

            // 初始化工具提示的箭頭 DOM 元素。
            var arrow = this.createArrow();

            // 使用剛才建立的箭頭元素來初始化工具提示本身的 DOM 元素。
            var tooltip = this.createTooltip(element, arrow);

            // 將工具提示插入到網頁中。
            document.body.appendChild(tooltip);

            // 使用 FloatingUI 來初始化工具提示的浮動元素。
            element.tocas_tooltip = TocasFloatingUIDOM.autoUpdate(element, tooltip, () => {
                TocasFloatingUIDOM.computePosition(element, tooltip, {
                    strategy: "fixed",
                    placement: position,
                    middleware: [
                        // 下面過窄時會擠兌到上面。
                        TocasFloatingUIDOM.flip({
                            crossAxis: false,
                        }),

                        // 因為有箭頭所以上下軸要偏移 10px，
                        // 而容器有外距（詳見 CSS）所以左右要偏移 15px。
                        TocasFloatingUIDOM.offset({
                            //crossAxis: -15,
                            mainAxis: 10,
                        }),

                        // 會被螢幕左右推移。
                        TocasFloatingUIDOM.shift({
                            padding: 20, // 0 by default
                        }),

                        // 有箭頭。
                        TocasFloatingUIDOM.arrow({
                            element: arrow,
                        }),
                    ],
                }).then(({ middlewareData, x, y, placement }) => {
                    // 賦予工具提示絕對座標。
                    Object.assign(tooltip.style, {
                        left: `${x}px`,
                        top: `${y}px`,
                    });

                    // 設置箭頭的水平座標，因為箭頭只會出現在上面或下面，所以不需要 y 座標。
                    if (middlewareData.arrow) {
                        const { x } = middlewareData.arrow;
                        arrow.style.setProperty("--ts-tooltip-x", x != null ? `${x}px` : "0");
                    }

                    // 先移除先前的所有位置設定，再套用新的位置設定。
                    if (placement) {
                        tooltip.classList.remove("is-top", "is-top-start", "is-top-end", "is-bottom", "is-bottom-start", "is-bottom-end");
                        tooltip.classList.add(`is-${placement}`);
                    }
                });
            });
        };
    }

    /* ==========================================================================
       Base
       ========================================================================== */

    // searchScopeTargets
    searchScopeTargets = (element, name, scope_attribute, name_attribute) => {
        // 找尋這個元素最鄰近的命名空間容器。
        var container = element.closest(`[class*="${scope_attribute}"]`) || document;

        // 在命名空間裡找尋目標元素，但是這個目標元素
        //
        // NOTE: 這裡的 item.closest(`[class*="${scope_attribute}"]`) 可能要對應 === container，
        // 主要取決之後對命名空間的寬鬆度設計如何。
        //
        // 例如：A 命名空間裡有 B 跟 C 子空間，B 可以呼叫同為 A 空間裡的 C 空間裡的元素嗎？
        var targets = Array.from(container.querySelectorAll(`[${name_attribute}="${name}"]`)).filter(item => {
            return item.closest(`[class*="${scope_attribute}"]`) || document === container;
        });

        // 如果有找到元素則回傳。
        if (targets.length > 0) {
            return targets;
        }

        // 如果已經找到最上層了還是什麼結果都沒有，就回傳空陣列，讓其他程式報錯。
        if (container === document) {
            return [];
        }

        // 如果這一層找不到東西，就遞迴網更上面的命名空間來搜尋。
        return this.searchScopeTargets(container.parentNode, name, scope_attribute, name_attribute);
    };

    // responsiveModule
    var responsiveModule = new Responsive();

    // tabModule
    var tabModule = new Tab();

    // toggleModule
    var toggleModule = new Toggle();

    // dropdownModule
    var dropdownModule = new Dropdown();

    // tooltipModule
    var tooltipModule = new Tooltip();

    // stashModule
    // var stashModule = new Stash();

    //
    addedNodeMutation = node => {
        responsiveModule.addedNodeMutation(node);
        tabModule.addedNodeMutation(node);
        toggleModule.addedNodeMutation(node);
        dropdownModule.addedNodeMutation(node);
        tooltipModule.addedNodeMutation(node);
        // stashModule.addedNodeMutation(node);
    };

    //
    attributeMutation = mutation => {
        responsiveModule.attributeMutation(mutation);
        tabModule.attributeMutation(mutation);
        toggleModule.attributeMutation(mutation);
        dropdownModule.attributeMutation(mutation);
        tooltipModule.attributeMutation(mutation);
        // stashModule.attributeMutation(mutation);
    };

    // mutation_observered 用來儲存正在監聽的元素以避免重複加入到 MutationObserver 裡。
    var mutation_observered = new Set([]);

    // MutationObserver 是真正會監聽每個元素異動的函式。
    var mutation_observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // 如果是屬性的異動就交給屬性函式處理。
            if (mutation.type === "attributes") {
                attributeMutation(mutation);
            }

            // 如果是節點的新增就交給節點函式處理。
            else if (mutation.addedNodes && mutation.addedNodes.length) {
                mutation.addedNodes.forEach(added_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (added_node.nodeType !== Node.ELEMENT_NODE || !(added_node instanceof HTMLElement)) {
                        return;
                    }

                    // 建立一個 TreeWalker 來加強 MutationObserver 的 childList 跟 subtree，
                    // 因為 MutationObserver 可能會忽略 Vue.js 那樣透過 innerHTML 修改節點的時候。
                    var tree_walker = document.createTreeWalker(added_node, NodeFilter.SHOW_ELEMENT);

                    // 收集需要監聽的 HTML 節點元素。
                    var nodes = [];

                    // 會使用遞迴，所以先將自己視為其中一個節點。
                    var current_node = tree_walker.currentNode;

                    // 不斷地爬到沒有下個節點為止。
                    while (current_node) {
                        nodes = [...nodes, current_node];
                        current_node = tree_walker.nextNode();
                    }

                    // 將使用 TreeWalker 爬到的每個節點收錄進 MutationObserver 裡面，監聽更詳細的節點。
                    nodes.forEach(node => {
                        // 如果這個節點已經被監聽過了則忽略。
                        if (mutation_observered.has(node)) {
                            return;
                        } else {
                            mutation_observered.add(node);
                        }

                        mutation_observer.observe(node, {
                            childList: true,
                            subtree: true,
                            attributes: true,
                            attributeOldValue: true,
                            attributeFilter: ["class"],
                        });

                        // 替這些節點呼叫對應的函式。
                        addedNodeMutation(node);
                    });
                });
            }

            // 如果是節點的移除就做一些清除的函式。
            else if (mutation.removedNodes && mutation.removedNodes.length) {
                mutation.removedNodes.forEach(removed_node => {
                    // 如果這個節點不是 HTMLElement 就略過，因為他有可能是 Text Node。
                    if (removed_node.nodeType !== Node.ELEMENT_NODE || !(removed_node instanceof HTMLElement)) {
                        return;
                    }

                    // 從已監聽的清單中移除來節省部份資源。
                    mutation_observered.delete(removed_node);
                });
            }
        });
    });

    // 監聽網頁元素異動的 MutationObserver。
    mutation_observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
    });

    /**
     * Window Resize
     */

    window.addEventListener("resize", event => {
        responsiveModule.windowResize(event);
    });

    /**
     * Window Click
     */

    window.addEventListener("click", event => {
        dropdownModule.windowClick(event);
    });
})();
