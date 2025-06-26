/*!
* Vuetify v3.8.3
* Forged by John Leider
* Released under the MIT License.
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Vuetify={},e.Vue)}(this,(function(e,t){"use strict"
const a="undefined"!=typeof window,l=a&&"IntersectionObserver"in window,o=a&&("ontouchstart"in window||window.navigator.maxTouchPoints>0),n=a&&"EyeDropper"in window
function r(e,t,a){(function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")})(e,t),t.set(e,a)}function i(e,t,a){return e.set(u(e,t),a),a}function s(e,t){return e.get(u(e,t))}function u(e,t,a){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:a
throw new TypeError("Private element is not present on this object")}function c(e,t,a){const l=t.length-1
if(l<0)return void 0===e?a:e
for(let o=0;o<l;o++){if(null==e)return a
e=e[t[o]]}return null==e||void 0===e[t[l]]?a:e[t[l]]}function d(e,t){if(e===t)return!0
if(e instanceof Date&&t instanceof Date&&e.getTime()!==t.getTime())return!1
if(e!==Object(e)||t!==Object(t))return!1
const a=Object.keys(e)
return a.length===Object.keys(t).length&&a.every((a=>d(e[a],t[a])))}function v(e,t,a){return null!=e&&t&&"string"==typeof t?void 0!==e[t]?e[t]:c(e,(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),a):a}function p(e,t,a){if(!0===t)return void 0===e?a:e
if(null==t||"boolean"==typeof t)return a
if(e!==Object(e)){if("function"!=typeof t)return a
const l=t(e,a)
return void 0===l?a:l}if("string"==typeof t)return v(e,t,a)
if(Array.isArray(t))return c(e,t,a)
if("function"!=typeof t)return a
const l=t(e,a)
return void 0===l?a:l}function f(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
return Array.from({length:e},((e,a)=>t+a))}function m(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"px"
if(null==e||""===e)return
const a=Number(e)
return isNaN(a)?String(e):isFinite(a)?`${a}${t}`:void 0}function g(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}function h(e){let t
return null!==e&&"object"==typeof e&&((t=Object.getPrototypeOf(e))===Object.prototype||null===t)}function y(e){if(e&&"$el"in e){const t=e.$el
return t?.nodeType===Node.TEXT_NODE?t.nextElementSibling:t}return e}const b=Object.freeze({enter:13,tab:9,delete:46,esc:27,space:32,up:38,down:40,left:37,right:39,end:35,home:36,del:46,backspace:8,insert:45,pageup:33,pagedown:34,shift:16}),V=Object.freeze({enter:"Enter",tab:"Tab",delete:"Delete",esc:"Escape",space:"Space",up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",end:"End",home:"Home",del:"Delete",backspace:"Backspace",insert:"Insert",pageup:"PageUp",pagedown:"PageDown",shift:"Shift"})
function w(e){return Object.keys(e)}function S(e,t){return t.every((t=>e.hasOwnProperty(t)))}function k(e,t){const a={}
for(const l of t)Object.prototype.hasOwnProperty.call(e,l)&&(a[l]=e[l])
return a}function x(e,t,a){const l=Object.create(null),o=Object.create(null)
for(const a in e)t.some((e=>e instanceof RegExp?e.test(a):e===a))?l[a]=e[a]:o[a]=e[a]
return[l,o]}function N(e,t){const a={...e}
return t.forEach((e=>delete a[e])),a}const C=/^on[^a-z]/,I=e=>C.test(e),_=["onAfterscriptexecute","onAnimationcancel","onAnimationend","onAnimationiteration","onAnimationstart","onAuxclick","onBeforeinput","onBeforescriptexecute","onChange","onClick","onCompositionend","onCompositionstart","onCompositionupdate","onContextmenu","onCopy","onCut","onDblclick","onFocusin","onFocusout","onFullscreenchange","onFullscreenerror","onGesturechange","onGestureend","onGesturestart","onGotpointercapture","onInput","onKeydown","onKeypress","onKeyup","onLostpointercapture","onMousedown","onMousemove","onMouseout","onMouseover","onMouseup","onMousewheel","onPaste","onPointercancel","onPointerdown","onPointerenter","onPointerleave","onPointermove","onPointerout","onPointerover","onPointerup","onReset","onSelect","onSubmit","onTouchcancel","onTouchend","onTouchmove","onTouchstart","onTransitioncancel","onTransitionend","onTransitionrun","onTransitionstart","onWheel"],P=["ArrowUp","ArrowDown","ArrowRight","ArrowLeft","Enter","Escape","Tab"," "]
function B(e){const[t,a]=x(e,[C]),l=N(t,_),[o,n]=x(a,["class","style","id",/^data-/])
return Object.assign(o,t),Object.assign(n,l),[o,n]}function R(e){return null==e?[]:Array.isArray(e)?e:[e]}function A(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1
return Math.max(t,Math.min(a,e))}function T(e){const t=e.toString().trim()
return t.includes(".")?t.length-t.indexOf(".")-1:0}function D(e,t){return e+(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0").repeat(Math.max(0,t-e.length))}function E(e,t){return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0").repeat(Math.max(0,t-e.length))+e}function F(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3
if(e<t)return`${e} B`
const a=1024===t?["Ki","Mi","Gi"]:["k","M","G"]
let l=-1
for(;Math.abs(e)>=t&&l<a.length-1;)e/=t,++l
return`${e.toFixed(1)} ${a[l]}B`}function $(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0
const l={}
for(const t in e)l[t]=e[t]
for(const o in t){const n=e[o],r=t[o]
h(n)&&h(r)?l[o]=$(n,r,a):a&&Array.isArray(n)&&Array.isArray(r)?l[o]=a(n,r):l[o]=r}return l}function M(e){return e.map((e=>e.type===t.Fragment?M(e.children):e)).flat()}function O(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:""
if(O.cache.has(e))return O.cache.get(e)
const t=e.replace(/[^a-z]/gi,"-").replace(/\B([A-Z])/g,"-$1").toLowerCase()
return O.cache.set(e,t),t}function L(e,t){if(!t||"object"!=typeof t)return[]
if(Array.isArray(t))return t.map((t=>L(e,t))).flat(1)
if(t.suspense)return L(e,t.ssContent)
if(Array.isArray(t.children))return t.children.map((t=>L(e,t))).flat(1)
if(t.component){if(Object.getOwnPropertySymbols(t.component.provides).includes(e))return[t.component]
if(t.component.subTree)return L(e,t.component.subTree).flat(1)}return[]}O.cache=new Map
var z=new WeakMap,j=new WeakMap
class H{constructor(e){r(this,z,[]),r(this,j,0),this.size=e}get isFull(){return s(z,this).length===this.size}push(e){s(z,this)[s(j,this)]=e,i(j,this,(s(j,this)+1)%this.size)}values(){return s(z,this).slice(s(j,this)).concat(s(z,this).slice(0,s(j,this)))}clear(){s(z,this).length=0,i(j,this,0)}}function W(e){const a=t.reactive({})
t.watchEffect((()=>{const t=e()
for(const e in t)a[e]=t[e]}),{flush:"sync"})
const l={}
for(const e in a)l[e]=t.toRef((()=>a[e]))
return l}function U(e,t){return e.includes(t)}function Y(e){return e[2].toLowerCase()+e.slice(3)}const G=()=>[Function,Array]
function q(e,a){return!!(e[a="on"+t.capitalize(a)]||e[`${a}Once`]||e[`${a}Capture`]||e[`${a}OnceCapture`]||e[`${a}CaptureOnce`])}function K(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),l=1;l<t;l++)a[l-1]=arguments[l]
if(Array.isArray(e))for(const t of e)t(...a)
else"function"==typeof e&&e(...a)}function X(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
const a=["button","[href]",'input:not([type="hidden"])',"select","textarea","[tabindex]"].map((e=>`${e}${t?':not([tabindex="-1"])':""}:not([disabled])`)).join(", ")
return[...e.querySelectorAll(a)]}function Z(e,t,a){let l,o=e.indexOf(document.activeElement)
const n="next"===t?1:-1
do{o+=n,l=e[o]}while((!l||null==l.offsetParent||!(a?.(l)??1))&&o<e.length&&o>=0)
return l}function Q(e,t){const a=X(e)
if(t)if("first"===t)a[0]?.focus()
else if("last"===t)a.at(-1)?.focus()
else if("number"==typeof t)a[t]?.focus()
else{const l=Z(a,t)
l?l.focus():Q(e,"next"===t?"first":"last")}else e!==document.activeElement&&e.contains(document.activeElement)||a[0]?.focus()}function J(e){return null==e||"string"==typeof e&&""===e.trim()}function ee(){}function te(e,t){if(!(a&&"undefined"!=typeof CSS&&void 0!==CSS.supports&&CSS.supports(`selector(${t})`)))return null
try{return!!e&&e.matches(t)}catch(e){return null}}function ae(e){return e.some((e=>!t.isVNode(e)||e.type!==t.Comment&&(e.type!==t.Fragment||ae(e.children))))?e:null}function le(){const e=t.shallowRef(),a=t=>{e.value=t}
return Object.defineProperty(a,"value",{enumerable:!0,get:()=>e.value,set:t=>e.value=t}),Object.defineProperty(a,"el",{enumerable:!0,get:()=>y(e.value)}),a}function oe(e){const t=1===e.key.length,a=!e.ctrlKey&&!e.metaKey&&!e.altKey
return t&&a}function ne(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e||"bigint"==typeof e}const re=["top","bottom"],ie=["start","end","left","right"]
function se(e,t){let[a,l]=e.split(" ")
return l||(l=U(re,a)?"start":U(ie,a)?"top":"center"),{side:ue(a,t),align:ue(l,t)}}function ue(e,t){return"start"===e?t?"right":"left":"end"===e?t?"left":"right":e}function ce(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function de(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function ve(e){return{side:e.align,align:e.side}}function pe(e){return U(re,e.side)?"y":"x"}class fe{constructor(e){let{x:t,y:a,width:l,height:o}=e
this.x=t,this.y=a,this.width=l,this.height=o}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function me(e,t){return{x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}}}function ge(e){return Array.isArray(e)?new fe({x:e[0],y:e[1],width:0,height:0}):e.getBoundingClientRect()}function he(e){const t=e.getBoundingClientRect(),a=getComputedStyle(e),l=a.transform
if(l){let o,n,r,i,s
if(l.startsWith("matrix3d("))o=l.slice(9,-1).split(/, /),n=Number(o[0]),r=Number(o[5]),i=Number(o[12]),s=Number(o[13])
else{if(!l.startsWith("matrix("))return new fe(t)
o=l.slice(7,-1).split(/, /),n=Number(o[0]),r=Number(o[3]),i=Number(o[4]),s=Number(o[5])}const u=a.transformOrigin,c=t.x-i-(1-n)*parseFloat(u),d=t.y-s-(1-r)*parseFloat(u.slice(u.indexOf(" ")+1)),v=n?t.width/n:e.offsetWidth+1,p=r?t.height/r:e.offsetHeight+1
return new fe({x:c,y:d,width:v,height:p})}return new fe(t)}function ye(e,t,a){if(void 0===e.animate)return{finished:Promise.resolve()}
let l
try{l=e.animate(t,a)}catch(e){return{finished:Promise.resolve()}}return void 0===l.finished&&(l.finished=new Promise((e=>{l.onfinish=()=>{e(l)}}))),l}const be=new WeakMap
const Ve=2.4,we=.2126729,Se=.7151522,ke=.072175,xe=.55,Ne=.58,Ce=.57,Ie=.62,_e=.03,Pe=1.45,Be=5e-4,Re=1.25,Ae=1.25,Te=.078,De=12.82051282051282,Ee=.06,Fe=.001
function $e(e,t){const a=(e.r/255)**Ve,l=(e.g/255)**Ve,o=(e.b/255)**Ve,n=(t.r/255)**Ve,r=(t.g/255)**Ve,i=(t.b/255)**Ve
let s,u=a*we+l*Se+o*ke,c=n*we+r*Se+i*ke
if(u<=_e&&(u+=(_e-u)**Pe),c<=_e&&(c+=(_e-c)**Pe),Math.abs(c-u)<Be)return 0
if(c>u){const e=(c**xe-u**Ne)*Re
s=e<Fe?0:e<Te?e-e*De*Ee:e-Ee}else{const e=(c**Ie-u**Ce)*Ae
s=e>-.001?0:e>-.078?e-e*De*Ee:e+Ee}return 100*s}function Me(e){t.warn(`Vuetify: ${e}`)}function Oe(e){t.warn(`Vuetify error: ${e}`)}const Le=.20689655172413793,ze=e=>e>Le**3?Math.cbrt(e):e/(3*Le**2)+4/29,je=e=>e>Le?e**3:3*Le**2*(e-4/29)
function He(e){const t=ze,a=t(e[1])
return[116*a-16,500*(t(e[0]/.95047)-a),200*(a-t(e[2]/1.08883))]}function We(e){const t=je,a=(e[0]+16)/116
return[.95047*t(a+e[1]/500),t(a),1.08883*t(a-e[2]/200)]}const Ue=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]],Ye=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,Ge=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],qe=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4
function Ke(e){const t=Array(3),a=Ye,l=Ue
for(let o=0;o<3;++o)t[o]=Math.round(255*A(a(l[o][0]*e[0]+l[o][1]*e[1]+l[o][2]*e[2])))
return{r:t[0],g:t[1],b:t[2]}}function Xe(e){let{r:t,g:a,b:l}=e
const o=[0,0,0],n=qe,r=Ge
t=n(t/255),a=n(a/255),l=n(l/255)
for(let e=0;e<3;++e)o[e]=r[e][0]*t+r[e][1]*a+r[e][2]*l
return o}function Ze(e){return!!e&&/^(#|var\(--|(rgb|hsl)a?\()/.test(e)}const Qe=/^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/,Je={rgb:(e,t,a,l)=>({r:e,g:t,b:a,a:l}),rgba:(e,t,a,l)=>({r:e,g:t,b:a,a:l}),hsl:(e,t,a,l)=>at({h:e,s:t,l:a,a:l}),hsla:(e,t,a,l)=>at({h:e,s:t,l:a,a:l}),hsv:(e,t,a,l)=>tt({h:e,s:t,v:a,a:l}),hsva:(e,t,a,l)=>tt({h:e,s:t,v:a,a:l})}
function et(e){if("number"==typeof e)return(isNaN(e)||e<0||e>16777215)&&Me(`'${e}' is not a valid hex color`),{r:(16711680&e)>>16,g:(65280&e)>>8,b:255&e}
if("string"==typeof e&&Qe.test(e)){const{groups:t}=e.match(Qe),{fn:a,values:l}=t,o=l.split(/,\s*|\s*\/\s*|\s+/).map(((e,t)=>e.endsWith("%")||t>0&&t<3&&["hsl","hsla","hsv","hsva"].includes(a)?parseFloat(e)/100:parseFloat(e)))
return Je[a](...o)}if("string"==typeof e){let t=e.startsWith("#")?e.slice(1):e;[3,4].includes(t.length)?t=t.split("").map((e=>e+e)).join(""):[6,8].includes(t.length)||Me(`'${e}' is not a valid hex(a) color`)
const a=parseInt(t,16)
return(isNaN(a)||a<0||a>4294967295)&&Me(`'${e}' is not a valid hex(a) color`),ct(t)}if("object"==typeof e){if(S(e,["r","g","b"]))return e
if(S(e,["h","s","l"]))return tt(nt(e))
if(S(e,["h","s","v"]))return tt(e)}throw new TypeError(`Invalid color: ${null==e?e:String(e)||e.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`)}function tt(e){const{h:t,s:a,v:l,a:o}=e,n=e=>{const o=(e+t/60)%6
return l-l*a*Math.max(Math.min(o,4-o,1),0)},r=[n(5),n(3),n(1)].map((e=>Math.round(255*e)))
return{r:r[0],g:r[1],b:r[2],a:o}}function at(e){return tt(nt(e))}function lt(e){if(!e)return{h:0,s:1,v:1,a:1}
const t=e.r/255,a=e.g/255,l=e.b/255,o=Math.max(t,a,l),n=Math.min(t,a,l)
let r=0
o!==n&&(o===t?r=60*(0+(a-l)/(o-n)):o===a?r=60*(2+(l-t)/(o-n)):o===l&&(r=60*(4+(t-a)/(o-n)))),r<0&&(r+=360)
const i=[r,0===o?0:(o-n)/o,o]
return{h:i[0],s:i[1],v:i[2],a:e.a}}function ot(e){const{h:t,s:a,v:l,a:o}=e,n=l-l*a/2
return{h:t,s:1===n||0===n?0:(l-n)/Math.min(n,1-n),l:n,a:o}}function nt(e){const{h:t,s:a,l,a:o}=e,n=l+a*Math.min(l,1-l)
return{h:t,s:0===n?0:2-2*l/n,v:n,a:o}}function rt(e){let{r:t,g:a,b:l,a:o}=e
return void 0===o?`rgb(${t}, ${a}, ${l})`:`rgba(${t}, ${a}, ${l}, ${o})`}function it(e){return rt(tt(e))}function st(e){const t=Math.round(e).toString(16)
return("00".substr(0,2-t.length)+t).toUpperCase()}function ut(e){let{r:t,g:a,b:l,a:o}=e
return`#${[st(t),st(a),st(l),void 0!==o?st(Math.round(255*o)):""].join("")}`}function ct(e){e=function(e){e.startsWith("#")&&(e=e.slice(1))
e=e.replace(/([^0-9a-f])/gi,"F"),(3===e.length||4===e.length)&&(e=e.split("").map((e=>e+e)).join(""))
6!==e.length&&(e=D(D(e,6),8,"F"))
return e}(e)
let[t,a,l,o]=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
const a=[]
let l=0
for(;l<e.length;)a.push(e.substr(l,t)),l+=t
return a}(e,2).map((e=>parseInt(e,16)))
return o=void 0===o?o:o/255,{r:t,g:a,b:l,a:o}}function dt(e){return ut(tt(e))}function vt(e,t){const a=He(Xe(e))
return a[0]=a[0]+10*t,Ke(We(a))}function pt(e,t){const a=He(Xe(e))
return a[0]=a[0]-10*t,Ke(We(a))}function ft(e){return Xe(et(e))[1]}function mt(e,t){const a=ft(e),l=ft(t)
return(Math.max(a,l)+.05)/(Math.min(a,l)+.05)}function gt(e){const t=Math.abs($e(et(0),et(e)))
return Math.abs($e(et(16777215),et(e)))>Math.min(t,50)?"#fff":"#000"}function ht(e,t){return a=>Object.keys(e).reduce(((l,o)=>{const n="object"==typeof e[o]&&null!=e[o]&&!Array.isArray(e[o])?e[o]:{type:e[o]}
return l[o]=a&&o in a?{...n,default:a[o]}:n,t&&!l[o].source&&(l[o].source=t),l}),{})}const yt=ht({class:[String,Array,Object],style:{type:[String,Array,Object],default:null}},"component")
function bt(e,a){const l=t.getCurrentInstance()
if(!l)throw new Error(`[Vuetify] ${e} must be called from inside a setup function`)
return l}function Vt(){const e=bt(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"composables").type
return O(e?.aliasName||e?.name)}const wt=Symbol.for("vuetify:defaults")
function St(){const e=t.inject(wt)
if(!e)throw new Error("[Vuetify] Could not find defaults instance")
return e}function kt(e,a){const l=St(),o=t.ref(e),n=t.computed((()=>{if(t.unref(a?.disabled))return l.value
const e=t.unref(a?.scoped),n=t.unref(a?.reset),r=t.unref(a?.root)
if(null==o.value&&!(e||n||r))return l.value
let i=$(o.value,{prev:l.value})
if(e)return i
if(n||r){const e=Number(n||1/0)
for(let t=0;t<=e&&(i&&"prev"in i);t++)i=i.prev
return i&&"string"==typeof r&&r in i&&(i=$($(i,{prev:i}),i[r])),i}return i.prev?$(i.prev,i):i}))
return t.provide(wt,n),n}function xt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:St()
const o=bt("useDefaults")
if(a=a??o.type.name??o.type.__name,!a)throw new Error("[Vuetify] Could not determine component name")
const n=t.computed((()=>l.value?.[e._as??a])),r=new Proxy(e,{get(e,t){const a=Reflect.get(e,t)
if("class"===t||"style"===t)return[n.value?.[t],a].filter((e=>null!=e))
if(function(e,t){return e.props&&(void 0!==e.props[t]||void 0!==e.props[O(t)])}(o.vnode,t))return a
const r=n.value?.[t]
if(void 0!==r)return r
const i=l.value?.global?.[t]
return void 0!==i?i:a}}),i=t.shallowRef()
return t.watchEffect((()=>{if(n.value){const e=Object.entries(n.value).filter((e=>{let[t]=e
return t.startsWith(t[0].toUpperCase())}))
i.value=e.length?Object.fromEntries(e):void 0}else i.value=void 0})),{props:r,provideSubDefaults:function(){const e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:bt("injectSelf")
const{provides:a}=t
if(a&&e in a)return a[e]}(wt,o)
t.provide(wt,t.computed((()=>i.value?$(e?.value??{},i.value):e?.value)))}}}function Nt(e){if(e._setup=e._setup??e.setup,!e.name)return Me("The component is missing an explicit name, unable to generate default prop value"),e
if(e._setup){e.props=ht(e.props??{},e.name)()
const t=Object.keys(e.props).filter((e=>"class"!==e&&"style"!==e))
e.filterProps=function(e){return k(e,t)},e.props._as=String,e.setup=function(t,a){const l=St()
if(!l.value)return e._setup(t,a)
const{props:o,provideSubDefaults:n}=xt(t,t._as??e.name,l),r=e._setup(o,a)
return n(),r}}return e}function Ct(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0]
return a=>(e?Nt:t.defineComponent)(a)}function It(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div",l=arguments.length>2?arguments[2]:void 0
return Ct()({name:l??t.capitalize(t.camelize(e.replace(/__/g,"-"))),props:{tag:{type:String,default:a},...yt()},setup(a,l){let{slots:o}=l
return()=>t.h(a.tag,{class:[e,a.class],style:a.style},o.default?.())}})}function _t(e){if("function"!=typeof e.getRootNode){for(;e.parentNode;)e=e.parentNode
return e!==document?null:document}const t=e.getRootNode()
return t!==document&&t.getRootNode({composed:!0})!==document?null:t}const Pt="cubic-bezier(0.4, 0, 0.2, 1)"
function Bt(e,t,a){return Object.keys(e).filter((e=>I(e)&&e.endsWith(t))).reduce(((l,o)=>(l[o.slice(0,-t.length)]=t=>e[o](t,a(t)),l)),{})}function Rt(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
for(;e;){if(t?Dt(e):Tt(e))return e
e=e.parentElement}return document.scrollingElement}function At(e,t){const a=[]
if(t&&e&&!t.contains(e))return a
for(;e&&(Tt(e)&&a.push(e),e!==t);)e=e.parentElement
return a}function Tt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1
const t=window.getComputedStyle(e)
return"scroll"===t.overflowY||"auto"===t.overflowY&&e.scrollHeight>e.clientHeight}function Dt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1
const t=window.getComputedStyle(e)
return["scroll","auto"].includes(t.overflowY)}function Et(e){bt("useRender").render=e}const Ft=[String,Function,Object,Array],$t=Symbol.for("vuetify:icons"),Mt=ht({icon:{type:Ft},tag:{type:[String,Object,Function],required:!0}},"icon"),Ot=Ct()({name:"VComponentIcon",props:Mt(),setup(e,a){let{slots:l}=a
return()=>{const a=e.icon
return t.createVNode(e.tag,null,{default:()=>[e.icon?t.createVNode(a,null,null):l.default?.()]})}}}),Lt=Nt({name:"VSvgIcon",inheritAttrs:!1,props:Mt(),setup(e,a){let{attrs:l}=a
return()=>t.createVNode(e.tag,t.mergeProps(l,{style:null}),{default:()=>[t.createVNode("svg",{class:"v-icon__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true"},[Array.isArray(e.icon)?e.icon.map((e=>Array.isArray(e)?t.createVNode("path",{d:e[0],"fill-opacity":e[1]},null):t.createVNode("path",{d:e},null))):t.createVNode("path",{d:e.icon},null)])]})}}),zt=Nt({name:"VLigatureIcon",props:Mt(),setup:e=>()=>t.createVNode(e.tag,null,{default:()=>[e.icon]})}),jt=Nt({name:"VClassIcon",props:Mt(),setup:e=>()=>t.createVNode(e.tag,{class:e.icon},null)})
function Ht(e){const t={svg:{component:Lt},class:{component:jt}},a=e?.defaultSet??"mdi"
return"mdi"!==a||t.mdi||(t.mdi=Ut),$({defaultSet:a,sets:t,aliases:{...Wt,vuetify:["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z",["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z",.6]],"vuetify-outline":"svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z","vuetify-play":["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z",["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z",.6]]}},e)}const Wt={collapse:"mdi-chevron-up",complete:"mdi-check",cancel:"mdi-close-circle",close:"mdi-close",delete:"mdi-close-circle",clear:"mdi-close-circle",success:"mdi-check-circle",info:"mdi-information",warning:"mdi-alert-circle",error:"mdi-close-circle",prev:"mdi-chevron-left",next:"mdi-chevron-right",checkboxOn:"mdi-checkbox-marked",checkboxOff:"mdi-checkbox-blank-outline",checkboxIndeterminate:"mdi-minus-box",delimiter:"mdi-circle",sortAsc:"mdi-arrow-up",sortDesc:"mdi-arrow-down",expand:"mdi-chevron-down",menu:"mdi-menu",subgroup:"mdi-menu-down",dropdown:"mdi-menu-down",radioOn:"mdi-radiobox-marked",radioOff:"mdi-radiobox-blank",edit:"mdi-pencil",ratingEmpty:"mdi-star-outline",ratingFull:"mdi-star",ratingHalf:"mdi-star-half-full",loading:"mdi-cached",first:"mdi-page-first",last:"mdi-page-last",unfold:"mdi-unfold-more-horizontal",file:"mdi-paperclip",plus:"mdi-plus",minus:"mdi-minus",calendar:"mdi-calendar",treeviewCollapse:"mdi-menu-down",treeviewExpand:"mdi-menu-right",eyeDropper:"mdi-eyedropper",upload:"mdi-cloud-upload"},Ut={component:e=>t.h(jt,{...e,class:"mdi"})},Yt={defaults:{global:{rounded:"sm"},VAvatar:{rounded:"circle"},VAutocomplete:{variant:"underlined"},VBanner:{color:"primary"},VBtn:{color:"primary",rounded:0},VCheckbox:{color:"secondary"},VCombobox:{variant:"underlined"},VDatePicker:{color:"primary",controlHeight:44,elevation:1,rounded:0,VBtn:{color:"high-emphasis",rounded:"circle"}},VSelect:{variant:"underlined"},VSlider:{color:"primary"},VTabs:{color:"primary"},VTextarea:{variant:"underlined"},VTextField:{variant:"underlined"},VToolbar:{VBtn:{color:null}}},icons:{defaultSet:"mdi",sets:{mdi:Ut}},theme:{themes:{light:{colors:{primary:"#3F51B5","primary-darken-1":"#303F9F","primary-lighten-1":"#C5CAE9",secondary:"#FF4081","secondary-darken-1":"#F50057","secondary-lighten-1":"#FF80AB",accent:"#009688"}}}}},Gt={defaults:{global:{rounded:"md"},VAvatar:{rounded:"circle"},VAutocomplete:{variant:"filled"},VBanner:{color:"primary"},VBtn:{color:"primary"},VCheckbox:{color:"secondary"},VCombobox:{variant:"filled"},VDatePicker:{color:"primary",controlHeight:56,elevation:2,rounded:"md",VBtn:{color:"high-emphasis",rounded:"circle"}},VSelect:{variant:"filled"},VSlider:{color:"primary"},VTabs:{color:"primary"},VTextarea:{variant:"filled"},VTextField:{variant:"filled"},VToolbar:{VBtn:{color:null}}},icons:{defaultSet:"mdi",sets:{mdi:Ut}},theme:{themes:{light:{colors:{primary:"#6200EE","primary-darken-1":"#3700B3",secondary:"#03DAC6","secondary-darken-1":"#018786",error:"#B00020"}}}}},qt={defaults:{VAppBar:{flat:!0},VAutocomplete:{variant:"outlined"},VBanner:{color:"primary"},VBottomSheet:{contentClass:"rounded-t-xl overflow-hidden"},VBtn:{color:"primary",rounded:"xl"},VBtnGroup:{rounded:"xl",VBtn:{rounded:null}},VCard:{rounded:"lg"},VCheckbox:{color:"secondary",inset:!0},VChip:{rounded:"sm"},VCombobox:{variant:"outlined"},VDateInput:{variant:"outlined"},VDatePicker:{controlHeight:48,color:"primary",divided:!0,headerColor:"",elevation:3,rounded:"xl",VBtn:{color:"high-emphasis",rounded:"circle"}},VFileInput:{variant:"outlined"},VNavigationDrawer:{},VNumberInput:{variant:"outlined",VBtn:{color:void 0,rounded:void 0}},VSelect:{variant:"outlined"},VSlider:{color:"primary"},VTabs:{color:"primary"},VTextarea:{variant:"outlined"},VTextField:{variant:"outlined"},VToolbar:{VBtn:{color:null}}},icons:{defaultSet:"mdi",sets:{mdi:Ut}},theme:{themes:{light:{colors:{primary:"#6750a4",secondary:"#b4b0bb",tertiary:"#7d5260",error:"#b3261e",surface:"#fffbfe"}}}}}
var Kt=Object.freeze({__proto__:null,md1:Yt,md2:Gt,md3:qt})
function Xt(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"content"
const o=le(),n=t.ref()
if(a){const a=new ResizeObserver((t=>{e?.(t,a),t.length&&(n.value="content"===l?t[0].contentRect:t[0].target.getBoundingClientRect())}))
t.onBeforeUnmount((()=>{a.disconnect()})),t.watch((()=>o.el),((e,t)=>{t&&(a.unobserve(t),n.value=void 0),e&&a.observe(e)}),{flush:"post"})}return{resizeRef:o,contentRect:t.readonly(n)}}const Zt=Symbol.for("vuetify:layout"),Qt=Symbol.for("vuetify:layout-item"),Jt=ht({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),ea=ht({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item")
function ta(){const e=t.inject(Zt)
if(!e)throw new Error("[Vuetify] Could not find injected layout")
return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function aa(e){const a=t.inject(Zt)
if(!a)throw new Error("[Vuetify] Could not find injected layout")
const l=e.id??`layout-item-${t.useId()}`,o=bt("useLayoutItem")
t.provide(Qt,{id:l})
const n=t.shallowRef(!1)
t.onDeactivated((()=>n.value=!0)),t.onActivated((()=>n.value=!1))
const{layoutItemStyles:r,layoutItemScrimStyles:i}=a.register(o,{...e,active:t.computed((()=>!n.value&&e.active.value)),id:l})
return t.onBeforeUnmount((()=>a.unregister(l))),{layoutItemStyles:r,layoutRect:a.layoutRect,layoutItemScrimStyles:i}}function la(e){const a=t.inject(Zt,null),l=t.computed((()=>a?a.rootZIndex.value-100:1e3)),o=t.ref([]),n=t.reactive(new Map),r=t.reactive(new Map),i=t.reactive(new Map),s=t.reactive(new Map),u=t.reactive(new Map),{resizeRef:c,contentRect:d}=Xt(),v=t.computed((()=>{const t=new Map,a=e.overlaps??[]
for(const e of a.filter((e=>e.includes(":")))){const[a,l]=e.split(":")
if(!o.value.includes(a)||!o.value.includes(l))continue
const i=n.get(a),s=n.get(l),u=r.get(a),c=r.get(l)
i&&s&&u&&c&&(t.set(l,{position:i.value,amount:parseInt(u.value,10)}),t.set(a,{position:s.value,amount:-parseInt(c.value,10)}))}return t})),p=t.computed((()=>{const e=[...new Set([...i.values()].map((e=>e.value)))].sort(((e,t)=>e-t)),t=[]
for(const a of e){const e=o.value.filter((e=>i.get(e)?.value===a))
t.push(...e)}return((e,t,a,l)=>{let o={top:0,left:0,right:0,bottom:0}
const n=[{id:"",layer:{...o}}]
for(const r of e){const e=t.get(r),i=a.get(r),s=l.get(r)
if(!e||!i||!s)continue
const u={...o,[e.value]:parseInt(o[e.value],10)+(s.value?parseInt(i.value,10):0)}
n.push({id:r,layer:u}),o=u}return n})(t,n,r,s)})),f=t.computed((()=>!Array.from(u.values()).some((e=>e.value)))),g=t.computed((()=>p.value[p.value.length-1].layer)),h=t.toRef((()=>({"--v-layout-left":m(g.value.left),"--v-layout-right":m(g.value.right),"--v-layout-top":m(g.value.top),"--v-layout-bottom":m(g.value.bottom),...f.value?void 0:{transition:"none"}}))),y=t.computed((()=>p.value.slice(1).map(((e,t)=>{let{id:a}=e
const{layer:l}=p.value[t],o=r.get(a),i=n.get(a)
return{id:a,...l,size:Number(o.value),position:i.value}})))),b=e=>y.value.find((t=>t.id===e)),V=bt("createLayout"),w=t.shallowRef(!1)
t.onMounted((()=>{w.value=!0})),t.provide(Zt,{register:(e,a)=>{let{id:c,order:d,position:m,layoutSize:g,elementSize:h,active:b,disableTransitions:S,absolute:k}=a
i.set(c,d),n.set(c,m),r.set(c,g),s.set(c,b),S&&u.set(c,S)
const x=L(Qt,V?.vnode).indexOf(e)
x>-1?o.value.splice(x,0,c):o.value.push(c)
const N=t.computed((()=>y.value.findIndex((e=>e.id===c)))),C=t.computed((()=>l.value+2*p.value.length-2*N.value))
return{layoutItemStyles:t.computed((()=>{const e="left"===m.value||"right"===m.value,t="right"===m.value,a="bottom"===m.value,o=h.value??g.value,n=0===o?"%":"px",r={[m.value]:0,zIndex:C.value,transform:`translate${e?"X":"Y"}(${(b.value?0:-(0===o?100:o))*(t||a?-1:1)}${n})`,position:k.value||1e3!==l.value?"absolute":"fixed",...f.value?void 0:{transition:"none"}}
if(!w.value)return r
const i=y.value[N.value]
if(!i)throw new Error(`[Vuetify] Could not find layout item "${c}"`)
const s=v.value.get(c)
return s&&(i[s.position]+=s.amount),{...r,height:e?`calc(100% - ${i.top}px - ${i.bottom}px)`:h.value?`${h.value}px`:void 0,left:t?void 0:`${i.left}px`,right:t?`${i.right}px`:void 0,top:"bottom"!==m.value?`${i.top}px`:void 0,bottom:"top"!==m.value?`${i.bottom}px`:void 0,width:e?h.value?`${h.value}px`:void 0:`calc(100% - ${i.left}px - ${i.right}px)`}})),layoutItemScrimStyles:t.computed((()=>({zIndex:C.value-1}))),zIndex:C}},unregister:e=>{i.delete(e),n.delete(e),r.delete(e),s.delete(e),u.delete(e),o.value=o.value.filter((t=>t!==e))},mainRect:g,mainStyles:h,getLayoutItem:b,items:y,layoutRect:d,rootZIndex:l})
return{layoutClasses:t.toRef((()=>["v-layout",{"v-layout--full-height":e.fullHeight}])),layoutStyles:t.toRef((()=>({zIndex:a?l.value:void 0,position:a?"relative":void 0,overflow:a?"hidden":void 0}))),getLayoutItem:b,items:y,layoutRect:d,layoutRef:c}}function oa(e,a){let l
function o(){l=t.effectScope(),l.run((()=>a.length?a((()=>{l?.stop(),o()})):a()))}t.watch(e,(e=>{e&&!l?o():e||(l?.stop(),l=void 0)}),{immediate:!0}),t.onScopeDispose((()=>{l?.stop()}))}function na(e,a,l){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e=>e,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e=>e
const r=bt("useProxiedModel"),i=t.ref(void 0!==e[a]?e[a]:l),s=O(a),u=s!==a?t.computed((()=>(e[a],!(!r.vnode.props?.hasOwnProperty(a)&&!r.vnode.props?.hasOwnProperty(s)||!r.vnode.props?.hasOwnProperty(`onUpdate:${a}`)&&!r.vnode.props?.hasOwnProperty(`onUpdate:${s}`))))):t.computed((()=>(e[a],!(!r.vnode.props?.hasOwnProperty(a)||!r.vnode.props?.hasOwnProperty(`onUpdate:${a}`)))))
oa((()=>!u.value),(()=>{t.watch((()=>e[a]),(e=>{i.value=e}))}))
const c=t.computed({get(){const t=e[a]
return o(u.value?t:i.value)},set(l){const s=n(l),c=t.toRaw(u.value?e[a]:i.value)
c!==s&&o(c)!==l&&(i.value=s,r?.emit(`update:${a}`,s))}})
return Object.defineProperty(c,"externalValue",{get:()=>u.value?e[a]:i.value}),c}var ra={badge:"Badge",open:"Open",close:"Close",dismiss:"Dismiss",confirmEdit:{ok:"OK",cancel:"Cancel"},dataIterator:{noResultsText:"No matching records found",loadingText:"Loading items..."},dataTable:{itemsPerPageText:"Rows per page:",ariaLabel:{sortDescending:"Sorted descending.",sortAscending:"Sorted ascending.",sortNone:"Not sorted.",activateNone:"Activate to remove sorting.",activateDescending:"Activate to sort descending.",activateAscending:"Activate to sort ascending."},sortBy:"Sort by"},dataFooter:{itemsPerPageText:"Items per page:",itemsPerPageAll:"All",nextPage:"Next page",prevPage:"Previous page",firstPage:"First page",lastPage:"Last page",pageText:"{0}-{1} of {2}"},dateRangeInput:{divider:"to"},datePicker:{itemsSelected:"{0} selected",range:{title:"Select dates",header:"Enter dates"},title:"Select date",header:"Enter date",input:{placeholder:"Enter date"}},noDataText:"No data available",carousel:{prev:"Previous visual",next:"Next visual",ariaLabel:{delimiter:"Carousel slide {0} of {1}"}},calendar:{moreEvents:"{0} more",today:"Today"},input:{clear:"Clear {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action",otp:"Please enter OTP character {0}"},fileInput:{counter:"{0} files",counterSize:"{0} files ({1} in total)"},fileUpload:{title:"Drag and drop files here",divider:"or",browse:"Browse Files"},timePicker:{am:"AM",pm:"PM",title:"Select Time"},pagination:{ariaLabel:{root:"Pagination Navigation",next:"Next page",previous:"Previous page",page:"Go to page {0}",currentPage:"Page {0}, Current page",first:"First page",last:"Last page"}},stepper:{next:"Next",prev:"Previous"},rating:{ariaLabel:{item:"Rating {0} of {1}"}},loading:"Loading...",infiniteScroll:{loadMore:"Load more",empty:"No more"},rules:{required:"This field is required",email:"Please enter a valid email",number:"This field can only contain numbers",integer:"This field can only contain integer values",capital:"This field can only contain uppercase letters",maxLength:"You must enter a maximum of {0} characters",minLength:"You must enter a minimum of {0} characters",strictLength:"The length of the entered field is invalid",exclude:"The {0} character is not allowed",notEmpty:"Please choose at least one value",pattern:"Invalid format"}}
const ia="$vuetify.",sa=(e,t)=>e.replace(/\{(\d+)\}/g,((e,a)=>String(t[Number(a)]))),ua=(e,t,a)=>function(l){for(var o=arguments.length,n=new Array(o>1?o-1:0),r=1;r<o;r++)n[r-1]=arguments[r]
if(!l.startsWith(ia))return sa(l,n)
const i=l.replace(ia,""),s=e.value&&a.value[e.value],u=t.value&&a.value[t.value]
let c=v(s,i,null)
return c||(Me(`Translation key "${l}" not found in "${e.value}", trying fallback locale`),c=v(u,i,null)),c||(Oe(`Translation key "${l}" not found in fallback`),c=l),"string"!=typeof c&&(Oe(`Translation key "${l}" has a non-string value`),c=l),sa(c,n)}
function ca(e,t){return(a,l)=>new Intl.NumberFormat([e.value,t.value],l).format(a)}function da(e,a,l){const o=na(e,a,e[a]??l.value)
return o.value=e[a]??l.value,t.watch(l,(t=>{null==e[a]&&(o.value=l.value)})),o}function va(e){return t=>{const a=da(t,"locale",e.current),l=da(t,"fallback",e.fallback),o=da(t,"messages",e.messages)
return{name:"vuetify",current:a,fallback:l,messages:o,t:ua(a,l,o),n:ca(a,l),provide:va({current:a,fallback:l,messages:o})}}}const pa=Symbol.for("vuetify:locale")
function fa(e){const a=e?.adapter&&(l=e?.adapter,null!=l.name)?e?.adapter:function(e){const a=t.shallowRef(e?.locale??"en"),l=t.shallowRef(e?.fallback??"en"),o=t.ref({en:ra,...e?.messages})
return{name:"vuetify",current:a,fallback:l,messages:o,t:ua(a,l,o),n:ca(a,l),provide:va({current:a,fallback:l,messages:o})}}(e)
var l
const o=function(e,a){const l=t.ref(a?.rtl??{af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!0,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,km:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1}),o=t.computed((()=>l.value[e.current.value]??!1))
return{isRtl:o,rtl:l,rtlClasses:t.toRef((()=>"v-locale--is-"+(o.value?"rtl":"ltr")))}}(a,e)
return{...a,...o}}function ma(){const e=t.inject(pa)
if(!e)throw new Error("[Vuetify] Could not find injected locale instance")
return e}function ga(e){const a=t.inject(pa)
if(!a)throw new Error("[Vuetify] Could not find injected locale instance")
const l=a.provide(e),o=function(e,a,l){const o=t.computed((()=>l.rtl??a.value[e.current.value]??!1))
return{isRtl:o,rtl:a,rtlClasses:t.toRef((()=>"v-locale--is-"+(o.value?"rtl":"ltr")))}}(l,a.rtl,e),n={...l,...o}
return t.provide(pa,n),n}function ha(){const e=t.inject(pa)
if(!e)throw new Error("[Vuetify] Could not find injected rtl instance")
return{isRtl:e.isRtl,rtlClasses:e.rtlClasses}}const ya=Symbol.for("vuetify:theme"),ba=ht({theme:String},"theme")
function Va(e,t,a,l){e.push(`${function(e,t){if(!t)return e
const a=`:where(${t})`
return":root"===e?a:`${a} ${e}`}(t,l)} {\n`,...a.map((e=>`  ${e};\n`)),"}\n")}function wa(e){const t=e.dark?2:1,a=e.dark?1:2,l=[]
for(const[o,n]of Object.entries(e.colors)){const e=et(n)
l.push(`--v-theme-${o}: ${e.r},${e.g},${e.b}`),o.startsWith("on-")||l.push(`--v-theme-${o}-overlay-multiplier: ${ft(n)>.18?t:a}`)}for(const[t,a]of Object.entries(e.variables)){const e="string"==typeof a&&a.startsWith("#")?et(a):void 0,o=e?`${e.r}, ${e.g}, ${e.b}`:void 0
l.push(`--v-${t}: ${o??a}`)}return l}function Sa(e,t,a){const l={}
if(a)for(const o of["lighten","darken"]){const n="lighten"===o?vt:pt
for(const r of f(a[o],1))l[`${e}-${o}-${r}`]=ut(n(et(t),r))}return l}function ka(e,t){if(!t)return{}
let a={}
for(const l of t.colors){const o=e[l]
o&&(a={...a,...Sa(l,o,t)})}return a}function xa(e){const t={}
for(const a of Object.keys(e)){if(a.startsWith("on-")||e[`on-${a}`])continue
const l=`on-${a}`,o=et(e[a])
t[l]=gt(o)}return t}function Na(e){const l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{defaultTheme:"light",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-bright":"#FFFFFF","surface-light":"#EEEEEE","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#1867C0","primary-darken-1":"#1F5592",secondary:"#48A9A6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-bright":"#ccbfd6","surface-light":"#424242","surface-variant":"#c8c8c8","on-surface-variant":"#000000",primary:"#2196F3","primary-darken-1":"#277CC1",secondary:"#54B6B2","secondary-darken-1":"#48A9A6",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":1,"medium-emphasis-opacity":.7,"disabled-opacity":.5,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}},stylesheetId:"vuetify-theme-stylesheet"}
const t={defaultTheme:"light",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-bright":"#FFFFFF","surface-light":"#EEEEEE","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#1867C0","primary-darken-1":"#1F5592",secondary:"#48A9A6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-bright":"#ccbfd6","surface-light":"#424242","surface-variant":"#c8c8c8","on-surface-variant":"#000000",primary:"#2196F3","primary-darken-1":"#277CC1",secondary:"#54B6B2","secondary-darken-1":"#48A9A6",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":1,"medium-emphasis-opacity":.7,"disabled-opacity":.5,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}},stylesheetId:"vuetify-theme-stylesheet"}
if(!e)return{...t,isDisabled:!0}
const a={}
for(const[l,o]of Object.entries(e.themes??{})){const e=o.dark||"dark"===l?t.themes?.dark:t.themes?.light
a[l]=$(e,o)}return $(t,{...e,themes:a})}(e),o=t.shallowRef(l.defaultTheme),n=t.ref(l.themes),r=t.computed((()=>{const e={}
for(const[t,a]of Object.entries(n.value)){const o={...a.colors,...ka(a.colors,l.variations)}
e[t]={...a,colors:{...o,...xa(o)}}}return e})),i=t.toRef((()=>r.value[o.value])),s=t.computed((()=>{const e=[]
i.value?.dark&&Va(e,":root",["color-scheme: dark"],l.scope),Va(e,":root",wa(i.value),l.scope)
for(const[t,a]of Object.entries(r.value))Va(e,`.v-theme--${t}`,["color-scheme: "+(a.dark?"dark":"normal"),...wa(a)],l.scope)
const t=[],a=[],o=new Set(Object.values(r.value).flatMap((e=>Object.keys(e.colors))))
for(const e of o)e.startsWith("on-")?Va(a,`.${e}`,[`color: rgb(var(--v-theme-${e})) !important`],l.scope):(Va(t,`.bg-${e}`,[`--v-theme-overlay-multiplier: var(--v-theme-${e}-overlay-multiplier)`,`background-color: rgb(var(--v-theme-${e})) !important`,`color: rgb(var(--v-theme-on-${e})) !important`],l.scope),Va(a,`.text-${e}`,[`color: rgb(var(--v-theme-${e})) !important`],l.scope),Va(a,`.border-${e}`,[`--v-border-color: var(--v-theme-${e})`],l.scope))
return e.push(...t,...a),e.map(((e,t)=>0===t?e:`    ${e}`)).join("")}))
const u=t.toRef((()=>l.isDisabled?void 0:`v-theme--${o.value}`))
return{install:function(e){if(l.isDisabled)return
const o=e._context.provides.usehead
if(o){function n(){return{style:[{textContent:s.value,id:l.stylesheetId,nonce:l.cspNonce||!1}]}}if(o.push){const r=o.push(n)
a&&t.watch(s,(()=>{r.patch(n)}))}else a?(o.addHeadObjs(t.toRef(n)),t.watchEffect((()=>o.updateDOM()))):o.addHeadObjs(n())}else{function i(){!function(e,t){e&&(e.innerHTML=t)}(function(e,t){if(!a)return null
let l=document.getElementById(e)
return l||(l=document.createElement("style"),l.id=e,l.type="text/css",t&&l.setAttribute("nonce",t),document.head.appendChild(l)),l}(l.stylesheetId,l.cspNonce),s.value)}a?t.watch(s,i,{immediate:!0}):i()}},isDisabled:l.isDisabled,name:o,themes:n,current:i,computedThemes:r,themeClasses:u,styles:s,global:{name:o,current:i}}}function Ca(e){bt("provideTheme")
const a=t.inject(ya,null)
if(!a)throw new Error("Could not find Vuetify theme injection")
const l=t.toRef((()=>e.theme??a.name.value)),o=t.toRef((()=>a.themes.value[l.value])),n=t.toRef((()=>a.isDisabled?void 0:`v-theme--${l.value}`)),r={...a,name:l,current:o,themeClasses:n}
return t.provide(ya,r),r}function Ia(){bt("useTheme")
const e=t.inject(ya,null)
if(!e)throw new Error("Could not find Vuetify theme injection")
return e}const _a=ht({...yt(),...Jt({fullHeight:!0}),...ba()},"VApp"),Pa=Ct()({name:"VApp",props:_a(),setup(e,a){let{slots:l}=a
const o=Ca(e),{layoutClasses:n,getLayoutItem:r,items:i,layoutRef:s}=la(e),{rtlClasses:u}=ha()
return Et((()=>t.createVNode("div",{ref:s,class:["v-application",o.themeClasses.value,n.value,u.value,e.class],style:[e.style]},[t.createVNode("div",{class:"v-application__wrap"},[l.default?.()])]))),{getLayoutItem:r,items:i,theme:o}}}),Ba=ht({tag:{type:[String,Object,Function],default:"div"}},"tag"),Ra=ht({text:String,...yt(),...Ba()},"VToolbarTitle"),Aa=Ct()({name:"VToolbarTitle",props:Ra(),setup(e,a){let{slots:l}=a
return Et((()=>{const a=!!(l.default||l.text||e.text)
return t.createVNode(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>[a&&t.createVNode("div",{class:"v-toolbar-title__placeholder"},[l.text?l.text():e.text,l.default?.()])]})})),{}}}),Ta=ht({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition")
function Da(e,a,l){return Ct()({name:e,props:Ta({mode:l,origin:a}),setup(a,l){let{slots:o}=l
const n={onBeforeEnter(e){a.origin&&(e.style.transformOrigin=a.origin)},onLeave(e){if(a.leaveAbsolute){const{offsetTop:t,offsetLeft:a,offsetWidth:l,offsetHeight:o}=e
e._transitionInitialStyles={position:e.style.position,top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},e.style.position="absolute",e.style.top=`${t}px`,e.style.left=`${a}px`,e.style.width=`${l}px`,e.style.height=`${o}px`}a.hideOnLeave&&e.style.setProperty("display","none","important")},onAfterLeave(e){if(a.leaveAbsolute&&e?._transitionInitialStyles){const{position:t,top:a,left:l,width:o,height:n}=e._transitionInitialStyles
delete e._transitionInitialStyles,e.style.position=t||"",e.style.top=a||"",e.style.left=l||"",e.style.width=o||"",e.style.height=n||""}}}
return()=>{const l=a.group?t.TransitionGroup:t.Transition
return t.h(l,{name:a.disabled?"":e,css:!a.disabled,...a.group?void 0:{mode:a.mode},...a.disabled?{}:n},o.default)}}})}function Ea(e,a){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out"
return Ct()({name:e,props:{mode:{type:String,default:l},disabled:Boolean,group:Boolean},setup(l,o){let{slots:n}=o
const r=l.group?t.TransitionGroup:t.Transition
return()=>t.h(r,{name:l.disabled?"":e,css:!l.disabled,...l.disabled?{}:a},n.default)}})}function Fa(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:""
const a=arguments.length>1&&void 0!==arguments[1]&&arguments[1]?"width":"height",l=t.camelize(`offset-${a}`)
return{onBeforeEnter(e){e._parent=e.parentNode,e._initialStyle={transition:e.style.transition,overflow:e.style.overflow,[a]:e.style[a]}},onEnter(t){const o=t._initialStyle
if(!o)return
t.style.setProperty("transition","none","important"),t.style.overflow="hidden"
const n=`${t[l]}px`
t.style[a]="0",t.offsetHeight,t.style.transition=o.transition,e&&t._parent&&t._parent.classList.add(e),requestAnimationFrame((()=>{t.style[a]=n}))},onAfterEnter:n,onEnterCancelled:n,onLeave(e){e._initialStyle={transition:"",overflow:e.style.overflow,[a]:e.style[a]},e.style.overflow="hidden",e.style[a]=`${e[l]}px`,e.offsetHeight,requestAnimationFrame((()=>e.style[a]="0"))},onAfterLeave:o,onLeaveCancelled:o}
function o(t){e&&t._parent&&t._parent.classList.remove(e),n(t)}function n(e){if(!e._initialStyle)return
const t=e._initialStyle[a]
e.style.overflow=e._initialStyle.overflow,null!=t&&(e.style[a]=t),delete e._initialStyle}}const $a=ht({target:[Object,Array]},"v-dialog-transition"),Ma=new WeakMap,Oa=Ct()({name:"VDialogTransition",props:$a(),setup(e,a){let{slots:l}=a
const o={onBeforeEnter(e){e.style.pointerEvents="none",e.style.visibility="hidden"},async onEnter(t,a){await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),t.style.visibility=""
const l=za(e.target,t),{x:o,y:n,sx:r,sy:i,speed:s}=l
Ma.set(t,l)
const u=ye(t,[{transform:`translate(${o}px, ${n}px) scale(${r}, ${i})`,opacity:0},{}],{duration:225*s,easing:"cubic-bezier(0.0, 0, 0.2, 1)"})
La(t)?.forEach((e=>{ye(e,[{opacity:0},{opacity:0,offset:.33},{}],{duration:450*s,easing:Pt})})),u.finished.then((()=>a()))},onAfterEnter(e){e.style.removeProperty("pointer-events")},onBeforeLeave(e){e.style.pointerEvents="none"},async onLeave(t,a){let l
await new Promise((e=>requestAnimationFrame(e))),l=Array.isArray(e.target)||e.target.offsetParent||!Ma.has(t)?za(e.target,t):Ma.get(t)
const{x:o,y:n,sx:r,sy:i,speed:s}=l
ye(t,[{},{transform:`translate(${o}px, ${n}px) scale(${r}, ${i})`,opacity:0}],{duration:125*s,easing:"cubic-bezier(0.4, 0, 1, 1)"}).finished.then((()=>a())),La(t)?.forEach((e=>{ye(e,[{},{opacity:0,offset:.2},{opacity:0}],{duration:250*s,easing:Pt})}))},onAfterLeave(e){e.style.removeProperty("pointer-events")}}
return()=>e.target?t.createVNode(t.Transition,t.mergeProps({name:"dialog-transition"},o,{css:!1}),l):t.createVNode(t.Transition,{name:"dialog-transition"},l)}})
function La(e){const t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")?.children
return t&&[...t]}function za(e,t){const a=ge(e),l=he(t),[o,n]=getComputedStyle(t).transformOrigin.split(" ").map((e=>parseFloat(e))),[r,i]=getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ")
let s=a.left+a.width/2
"left"===r||"left"===i?s-=a.width/2:"right"!==r&&"right"!==i||(s+=a.width/2)
let u=a.top+a.height/2
"top"===r||"top"===i?u-=a.height/2:"bottom"!==r&&"bottom"!==i||(u+=a.height/2)
const c=a.width/l.width,d=a.height/l.height,v=Math.max(1,c,d),p=c/v||0,f=d/v||0,m=l.width*l.height/(window.innerWidth*window.innerHeight),g=m>.12?Math.min(1.5,10*(m-.12)+1):1
return{x:s-(o+l.left),y:u-(n+l.top),sx:p,sy:f,speed:g}}const ja=Da("fab-transition","center center","out-in"),Ha=Da("dialog-bottom-transition"),Wa=Da("dialog-top-transition"),Ua=Da("fade-transition"),Ya=Da("scale-transition"),Ga=Da("scroll-x-transition"),qa=Da("scroll-x-reverse-transition"),Ka=Da("scroll-y-transition"),Xa=Da("scroll-y-reverse-transition"),Za=Da("slide-x-transition"),Qa=Da("slide-x-reverse-transition"),Ja=Da("slide-y-transition"),el=Da("slide-y-reverse-transition"),tl=Ea("expand-transition",Fa()),al=Ea("expand-x-transition",Fa("",!0)),ll=ht({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),ol=Ct(!1)({name:"VDefaultsProvider",props:ll(),setup(e,a){let{slots:l}=a
const{defaults:o,disabled:n,reset:r,root:i,scoped:s}=t.toRefs(e)
return kt(o,{reset:r,root:i,scoped:s,disabled:n}),()=>l.default?.()}}),nl=ht({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension")
function rl(e){return{dimensionStyles:t.computed((()=>{const t={},a=m(e.height),l=m(e.maxHeight),o=m(e.maxWidth),n=m(e.minHeight),r=m(e.minWidth),i=m(e.width)
return null!=a&&(t.height=a),null!=l&&(t.maxHeight=l),null!=o&&(t.maxWidth=o),null!=n&&(t.minHeight=n),null!=r&&(t.minWidth=r),null!=i&&(t.width=i),t}))}}const il=ht({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...yt(),...nl()},"VResponsive"),sl=Ct()({name:"VResponsive",props:il(),setup(e,a){let{slots:l}=a
const{aspectStyles:o}=function(e){return{aspectStyles:t.computed((()=>{const t=Number(e.aspectRatio)
return t?{paddingBottom:String(1/t*100)+"%"}:void 0}))}}(e),{dimensionStyles:n}=rl(e)
return Et((()=>t.createVNode("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[n.value,e.style]},[t.createVNode("div",{class:"v-responsive__sizer",style:o.value},null),l.additional?.(),l.default&&t.createVNode("div",{class:["v-responsive__content",e.contentClass]},[l.default()])]))),{}}})
function ul(e){return W((()=>{const a=t.toValue(e),l=[],o={}
if(a.background)if(Ze(a.background)){if(o.backgroundColor=a.background,!a.text&&(Ze(n=a.background)&&!/^((rgb|hsl)a?\()?var\(--/.test(n))){const e=et(a.background)
if(null==e.a||1===e.a){const t=gt(e)
o.color=t,o.caretColor=t}}}else l.push(`bg-${a.background}`)
var n
return a.text&&(Ze(a.text)?(o.color=a.text,o.caretColor=a.text):l.push(`text-${a.text}`)),{colorClasses:l,colorStyles:o}}))}function cl(e){const{colorClasses:a,colorStyles:l}=ul((()=>({text:t.toValue(e)})))
return{textColorClasses:a,textColorStyles:l}}function dl(e){const{colorClasses:a,colorStyles:l}=ul((()=>({background:t.toValue(e)})))
return{backgroundColorClasses:a,backgroundColorStyles:l}}const vl=ht({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},"rounded")
function pl(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
return{roundedClasses:t.computed((()=>{const l=t.isRef(e)?e.value:e.rounded,o=t.isRef(e)?e.value:e.tile,n=[]
if(!0===l||""===l)n.push(`${a}--rounded`)
else if("string"==typeof l||0===l)for(const e of String(l).split(" "))n.push(`rounded-${e}`)
else(o||!1===l)&&n.push("rounded-0")
return n}))}}const fl=ht({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>!0!==e}},"transition"),ml=(e,a)=>{let{slots:l}=a
const{transition:o,disabled:n,group:r,...i}=e,{component:s=(r?t.TransitionGroup:t.Transition),...u}="object"==typeof o?o:{}
return t.h(s,t.mergeProps("string"==typeof o?{name:n?"":o}:u,"string"==typeof o?{}:Object.fromEntries(Object.entries({disabled:n,group:r}).filter((e=>{let[t,a]=e
return void 0!==a}))),i),l)}
function gl(e,t){const a=e._observe?.[t.instance.$.uid]
a&&(a.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const hl={mounted:function(e,t){if(!l)return
const a=t.modifiers||{},o=t.value,{handler:n,options:r}="object"==typeof o?o:{handler:o,options:{}},i=new IntersectionObserver((function(){let l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],o=arguments.length>1?arguments[1]:void 0
const r=e._observe?.[t.instance.$.uid]
if(!r)return
const i=l.some((e=>e.isIntersecting))
!n||a.quiet&&!r.init||a.once&&!i&&!r.init||n(i,l,o),i&&a.once?gl(e,t):r.init=!0}),r)
e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:i},i.observe(e)},unmounted:gl},yl=ht({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...il(),...yt(),...vl(),...fl()},"VImg"),bl=Ct()({name:"VImg",directives:{intersect:hl},props:yl(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,a){let{emit:o,slots:n}=a
const{backgroundColorClasses:r,backgroundColorStyles:i}=dl((()=>e.color)),{roundedClasses:s}=pl(e),u=bt("VImg"),c=t.shallowRef(""),d=t.ref(),v=t.shallowRef(e.eager?"loading":"idle"),p=t.shallowRef(),f=t.shallowRef(),g=t.computed((()=>e.src&&"object"==typeof e.src?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)})),h=t.computed((()=>g.value.aspect||p.value/f.value||0))
function y(a){if((!e.eager||!a)&&(!l||a||e.eager)){if(v.value="loading",g.value.lazySrc){const e=new Image
e.src=g.value.lazySrc,k(e,null)}g.value.src&&t.nextTick((()=>{o("loadstart",d.value?.currentSrc||g.value.src),setTimeout((()=>{if(!u.isUnmounted)if(d.value?.complete){if(d.value.naturalWidth||V(),"error"===v.value)return
h.value||k(d.value,null),"loading"===v.value&&b()}else h.value||k(d.value),w()}))}))}}function b(){u.isUnmounted||(w(),k(d.value),v.value="loaded",o("load",d.value?.currentSrc||g.value.src))}function V(){u.isUnmounted||(v.value="error",o("error",d.value?.currentSrc||g.value.src))}function w(){const e=d.value
e&&(c.value=e.currentSrc||e.src)}t.watch((()=>e.src),(()=>{y("idle"!==v.value)})),t.watch(h,((e,t)=>{!e&&t&&d.value&&k(d.value)})),t.onBeforeMount((()=>y()))
let S=-1
function k(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100
const a=()=>{if(clearTimeout(S),u.isUnmounted)return
const{naturalHeight:l,naturalWidth:o}=e
l||o?(p.value=o,f.value=l):e.complete||"loading"!==v.value||null==t?(e.currentSrc.endsWith(".svg")||e.currentSrc.startsWith("data:image/svg+xml"))&&(p.value=1,f.value=1):S=window.setTimeout(a,t)}
a()}t.onBeforeUnmount((()=>{clearTimeout(S)}))
const x=t.toRef((()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover}))),N=()=>{if(!g.value.src||"idle"===v.value)return null
const a=t.createVNode("img",{class:["v-img__img",x.value],style:{objectPosition:e.position},crossorigin:e.crossorigin,src:g.value.src,srcset:g.value.srcset,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:d,onLoad:b,onError:V},null),l=n.sources?.()
return t.createVNode(ml,{transition:e.transition,appear:!0},{default:()=>[t.withDirectives(l?t.createVNode("picture",{class:"v-img__picture"},[l,a]):a,[[t.vShow,"loaded"===v.value]])]})},C=()=>t.createVNode(ml,{transition:e.transition},{default:()=>[g.value.lazySrc&&"loaded"!==v.value&&t.createVNode("img",{class:["v-img__img","v-img__img--preload",x.value],style:{objectPosition:e.position},crossorigin:e.crossorigin,src:g.value.lazySrc,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),I=()=>n.placeholder?t.createVNode(ml,{transition:e.transition,appear:!0},{default:()=>[("loading"===v.value||"error"===v.value&&!n.error)&&t.createVNode("div",{class:"v-img__placeholder"},[n.placeholder()])]}):null,_=()=>n.error?t.createVNode(ml,{transition:e.transition,appear:!0},{default:()=>["error"===v.value&&t.createVNode("div",{class:"v-img__error"},[n.error()])]}):null,P=()=>e.gradient?t.createVNode("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,B=t.shallowRef(!1)
{const e=t.watch(h,(t=>{t&&(requestAnimationFrame((()=>{requestAnimationFrame((()=>{B.value=!0}))})),e())}))}return Et((()=>{const a=sl.filterProps(e)
return t.withDirectives(t.createVNode(sl,t.mergeProps({class:["v-img",{"v-img--absolute":e.absolute,"v-img--booting":!B.value},r.value,s.value,e.class],style:[{width:m("auto"===e.width?p.value:e.width)},i.value,e.style]},a,{aspectRatio:h.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>t.createVNode(t.Fragment,null,[t.createVNode(N,null,null),t.createVNode(C,null,null),t.createVNode(P,null,null),t.createVNode(I,null,null),t.createVNode(_,null,null)]),default:n.default}),[[t.resolveDirective("intersect"),{handler:y,options:e.options},null,{once:!0}]])})),{currentSrc:c,image:d,state:v,naturalWidth:p,naturalHeight:f}}}),Vl=ht({border:[Boolean,Number,String]},"border")
function wl(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
return{borderClasses:t.computed((()=>{const t=e.border
return!0===t||""===t?`${a}--border`:"string"==typeof t||0===t?String(t).split(" ").map((e=>`border-${e}`)):[]}))}}const Sl=ht({elevation:{type:[Number,String],validator(e){const t=parseInt(e)
return!isNaN(t)&&t>=0&&t<=24}}},"elevation")
function kl(e){return{elevationClasses:t.toRef((()=>{const a=t.isRef(e)?e.value:e.elevation
return null==a?[]:[`elevation-${a}`]}))}}const xl=[null,"prominent","default","comfortable","compact"],Nl=ht({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>xl.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...Vl(),...yt(),...Sl(),...vl(),...Ba({tag:"header"}),...ba()},"VToolbar"),Cl=Ct()({name:"VToolbar",props:Nl(),setup(e,a){let{slots:l}=a
const{backgroundColorClasses:o,backgroundColorStyles:n}=dl((()=>e.color)),{borderClasses:r}=wl(e),{elevationClasses:i}=kl(e),{roundedClasses:s}=pl(e),{themeClasses:u}=Ca(e),{rtlClasses:c}=ha(),d=t.shallowRef(!(!e.extended&&!l.extension?.())),v=t.computed((()=>parseInt(Number(e.height)+("prominent"===e.density?Number(e.height):0)-("comfortable"===e.density?8:0)-("compact"===e.density?16:0),10))),p=t.computed((()=>d.value?parseInt(Number(e.extensionHeight)+("prominent"===e.density?Number(e.extensionHeight):0)-("comfortable"===e.density?4:0)-("compact"===e.density?8:0),10):0))
return kt({VBtn:{variant:"text"}}),Et((()=>{const a=!(!e.title&&!l.title),f=!(!l.image&&!e.image),g=l.extension?.()
return d.value=!(!e.extended&&!g),t.createVNode(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},o.value,r.value,i.value,s.value,u.value,c.value,e.class],style:[n.value,e.style]},{default:()=>[f&&t.createVNode("div",{key:"image",class:"v-toolbar__image"},[l.image?t.createVNode(ol,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},l.image):t.createVNode(bl,{key:"image-img",cover:!0,src:e.image},null)]),t.createVNode(ol,{defaults:{VTabs:{height:m(v.value)}}},{default:()=>[t.createVNode("div",{class:"v-toolbar__content",style:{height:m(v.value)}},[l.prepend&&t.createVNode("div",{class:"v-toolbar__prepend"},[l.prepend?.()]),a&&t.createVNode(Aa,{key:"title",text:e.title},{text:l.title}),l.default?.(),l.append&&t.createVNode("div",{class:"v-toolbar__append"},[l.append?.()])])]}),t.createVNode(ol,{defaults:{VTabs:{height:m(p.value)}}},{default:()=>[t.createVNode(tl,null,{default:()=>[d.value&&t.createVNode("div",{class:"v-toolbar__extension",style:{height:m(p.value)}},[g])]})]})]})})),{contentHeight:v,extensionHeight:p}}}),Il=ht({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll")
function _l(){const e=t.shallowRef(!1)
t.onMounted((()=>{window.requestAnimationFrame((()=>{e.value=!0}))}))
return{ssrBootStyles:t.toRef((()=>e.value?void 0:{transition:"none !important"})),isBooted:t.readonly(e)}}const Pl=ht({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...Nl(),...ea(),...Il(),height:{type:[Number,String],default:64}},"VAppBar"),Bl=Ct()({name:"VAppBar",props:Pl(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=t.ref(),n=na(e,"modelValue"),r=t.computed((()=>{const t=new Set(e.scrollBehavior?.split(" ")??[])
return{hide:t.has("hide"),fullyHide:t.has("fully-hide"),inverted:t.has("inverted"),collapse:t.has("collapse"),elevate:t.has("elevate"),fadeImage:t.has("fade-image")}})),i=t.computed((()=>{const e=r.value
return e.hide||e.fullyHide||e.inverted||e.collapse||e.elevate||e.fadeImage||!n.value})),{currentScroll:s,scrollThreshold:u,isScrollingUp:c,scrollRatio:d}=function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
const{canScroll:l}=a
let o=0,n=0
const r=t.ref(null),i=t.shallowRef(0),s=t.shallowRef(0),u=t.shallowRef(0),c=t.shallowRef(!1),d=t.shallowRef(!1),v=t.computed((()=>Number(e.scrollThreshold))),p=t.computed((()=>A((v.value-i.value)/v.value||0))),f=()=>{const e=r.value
if(!e||l&&!l.value)return
o=i.value,i.value="window"in e?e.pageYOffset:e.scrollTop
const t=e instanceof Window?document.documentElement.scrollHeight:e.scrollHeight
n===t?(d.value=i.value<o,u.value=Math.abs(i.value-v.value)):n=t}
return t.watch(d,(()=>{s.value=s.value||i.value})),t.watch(c,(()=>{s.value=0})),t.onMounted((()=>{t.watch((()=>e.scrollTarget),(e=>{const t=e?document.querySelector(e):window
t?t!==r.value&&(r.value?.removeEventListener("scroll",f),r.value=t,r.value.addEventListener("scroll",f,{passive:!0})):Me(`Unable to locate element with identifier ${e}`)}),{immediate:!0})})),t.onBeforeUnmount((()=>{r.value?.removeEventListener("scroll",f)})),l&&t.watch(l,f,{immediate:!0}),{scrollThreshold:v,currentScroll:i,currentThreshold:u,isScrollActive:c,scrollRatio:p,isScrollingUp:d,savedScroll:s}}(e,{canScroll:i}),v=t.toRef((()=>r.value.hide||r.value.fullyHide)),p=t.computed((()=>e.collapse||r.value.collapse&&(r.value.inverted?d.value>0:0===d.value))),f=t.computed((()=>e.flat||r.value.fullyHide&&!n.value||r.value.elevate&&(r.value.inverted?s.value>0:0===s.value))),m=t.computed((()=>r.value.fadeImage?r.value.inverted?1-d.value:d.value:void 0)),g=t.computed((()=>{if(r.value.hide&&r.value.inverted)return 0
const e=o.value?.contentHeight??0,t=o.value?.extensionHeight??0
return v.value?s.value<u.value||r.value.fullyHide?e+t:e:e+t}))
oa((()=>!!e.scrollBehavior),(()=>{t.watchEffect((()=>{v.value?r.value.inverted?n.value=s.value>u.value:n.value=c.value||s.value<u.value:n.value=!0}))}))
const{ssrBootStyles:h}=_l(),{layoutItemStyles:y}=aa({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef((()=>e.location)),layoutSize:g,elementSize:t.shallowRef(void 0),active:n,absolute:t.toRef((()=>e.absolute))})
return Et((()=>{const a=Cl.filterProps(e)
return t.createVNode(Cl,t.mergeProps({ref:o,class:["v-app-bar",{"v-app-bar--bottom":"bottom"===e.location},e.class],style:[{...y.value,"--v-toolbar-image-opacity":m.value,height:void 0,...h.value},e.style]},a,{collapse:p.value,flat:f.value}),l)})),{}}}),Rl=[null,"default","comfortable","compact"],Al=ht({density:{type:String,default:"default",validator:e=>Rl.includes(e)}},"density")
function Tl(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
return{densityClasses:t.toRef((()=>`${a}--density-${e.density}`))}}const Dl=["elevated","flat","tonal","outlined","text","plain"]
function El(e,a){return t.createVNode(t.Fragment,null,[e&&t.createVNode("span",{key:"overlay",class:`${a}__overlay`},null),t.createVNode("span",{key:"underlay",class:`${a}__underlay`},null)])}const Fl=ht({color:String,variant:{type:String,default:"elevated",validator:e=>Dl.includes(e)}},"variant")
function $l(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
const l=t.toRef((()=>{const{variant:l}=t.toValue(e)
return`${a}--variant-${l}`})),{colorClasses:o,colorStyles:n}=ul((()=>{const{variant:a,color:l}=t.toValue(e)
return{[["elevated","flat"].includes(a)?"background":"text"]:l}}))
return{colorClasses:o,colorStyles:n,variantClasses:l}}const Ml=ht({baseColor:String,divided:Boolean,...Vl(),...yt(),...Al(),...Sl(),...vl(),...Ba(),...ba(),...Fl()},"VBtnGroup"),Ol=Ct()({name:"VBtnGroup",props:Ml(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{densityClasses:n}=Tl(e),{borderClasses:r}=wl(e),{elevationClasses:i}=kl(e),{roundedClasses:s}=pl(e)
kt({VBtn:{height:"auto",baseColor:t.toRef((()=>e.baseColor)),color:t.toRef((()=>e.color)),density:t.toRef((()=>e.density)),flat:!0,variant:t.toRef((()=>e.variant))}}),Et((()=>t.createVNode(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},o.value,r.value,n.value,i.value,s.value,e.class],style:e.style},l)))}}),Ll=ht({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),zl=ht({value:null,disabled:Boolean,selectedClass:String},"group-item")
function jl(e,a){let l=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]
const o=bt("useGroupItem")
if(!o)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function")
const n=t.useId()
t.provide(Symbol.for(`${a.description}:id`),n)
const r=t.inject(a,null)
if(!r){if(!l)return r
throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${a.description}`)}const i=t.toRef((()=>e.value)),s=t.computed((()=>!(!r.disabled.value&&!e.disabled)))
r.register({id:n,value:i,disabled:s},o),t.onBeforeUnmount((()=>{r.unregister(n)}))
const u=t.computed((()=>r.isSelected(n))),c=t.computed((()=>r.items.value[0].id===n)),d=t.computed((()=>r.items.value[r.items.value.length-1].id===n)),v=t.computed((()=>u.value&&[r.selectedClass.value,e.selectedClass]))
return t.watch(u,(e=>{o.emit("group:selected",{value:e})}),{flush:"sync"}),{id:n,isSelected:u,isFirst:c,isLast:d,toggle:()=>r.select(n,!u.value),select:e=>r.select(n,e),selectedClass:v,value:i,disabled:s,group:r}}function Hl(e,a){let l=!1
const o=t.reactive([]),n=na(e,"modelValue",[],(e=>null==e?[]:Wl(o,R(e))),(t=>{const a=function(e,t){const a=[]
return t.forEach((t=>{const l=e.findIndex((e=>e.id===t))
if(~l){const t=e[l]
a.push(null!=t.value?t.value:l)}})),a}(o,t)
return e.multiple?a:a[0]})),r=bt("useGroup")
function i(){const t=o.find((e=>!e.disabled))
t&&"force"===e.mandatory&&!n.value.length&&(n.value=[t.id])}function s(t){if(e.multiple&&Me('This method is not supported when using "multiple" prop'),n.value.length){const e=n.value[0],a=o.findIndex((t=>t.id===e))
let l=(a+t)%o.length,r=o[l]
for(;r.disabled&&l!==a;)l=(l+t)%o.length,r=o[l]
if(r.disabled)return
n.value=[o[l].id]}else{const e=o.find((e=>!e.disabled))
e&&(n.value=[e.id])}}t.onMounted((()=>{i()})),t.onBeforeUnmount((()=>{l=!0})),t.onUpdated((()=>{for(let e=0;e<o.length;e++)o[e].useIndexAsValue&&(o[e].value=e)}))
const u={register:function(e,l){const n=e,i=L(Symbol.for(`${a.description}:id`),r?.vnode).indexOf(l)
null==t.unref(n.value)&&(n.value=i,n.useIndexAsValue=!0),i>-1?o.splice(i,0,n):o.push(n)},unregister:function(e){if(l)return
i()
const t=o.findIndex((t=>t.id===e))
o.splice(t,1)},selected:n,select:function(t,a){const l=o.find((e=>e.id===t))
if(!a||!l?.disabled)if(e.multiple){const l=n.value.slice(),o=l.findIndex((e=>e===t)),r=~o
if(a=a??!r,r&&e.mandatory&&l.length<=1)return
if(!r&&null!=e.max&&l.length+1>e.max)return
o<0&&a?l.push(t):o>=0&&!a&&l.splice(o,1),n.value=l}else{const l=n.value.includes(t)
if(e.mandatory&&l)return
n.value=a??!l?[t]:[]}},disabled:t.toRef((()=>e.disabled)),prev:()=>s(o.length-1),next:()=>s(1),isSelected:e=>n.value.includes(e),selectedClass:t.toRef((()=>e.selectedClass)),items:t.toRef((()=>o)),getItemIndex:e=>function(e,t){const a=Wl(e,[t])
return a.length?e.findIndex((e=>e.id===a[0])):-1}(o,e)}
return t.provide(a,u),u}function Wl(e,t){const a=[]
return t.forEach((t=>{const l=e.find((e=>d(t,e.value))),o=e[t]
null!=l?.value?a.push(l.id):null!=o&&a.push(o.id)})),a}const Ul=Symbol.for("vuetify:v-btn-toggle"),Yl=ht({...Ml(),...Ll()},"VBtnToggle"),Gl=Ct()({name:"VBtnToggle",props:Yl(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{isSelected:o,next:n,prev:r,select:i,selected:s}=Hl(e,Ul)
return Et((()=>{const a=Ol.filterProps(e)
return t.createVNode(Ol,t.mergeProps({class:["v-btn-toggle",e.class]},a,{style:e.style}),{default:()=>[l.default?.({isSelected:o,next:n,prev:r,select:i,selected:s})]})})),{next:n,prev:r,select:i}}}),ql=["x-small","small","default","large","x-large"],Kl=ht({size:{type:[String,Number],default:"default"}},"size")
function Xl(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
return W((()=>{const a=e.size
let l,o
return U(ql,a)?l=`${t}--size-${a}`:a&&(o={width:m(a),height:m(a)}),{sizeClasses:l,sizeStyles:o}}))}const Zl=ht({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:Ft,opacity:[String,Number],...yt(),...Kl(),...Ba({tag:"i"}),...ba()},"VIcon"),Ql=Ct()({name:"VIcon",props:Zl(),setup(e,a){let{attrs:l,slots:o}=a
const n=t.shallowRef(),{themeClasses:r}=Ia(),{iconData:i}=(e=>{const a=t.inject($t)
if(!a)throw new Error("Missing Vuetify Icons provide!")
return{iconData:t.computed((()=>{const l=t.toValue(e)
if(!l)return{component:Ot}
let o=l
if("string"==typeof o&&(o=o.trim(),o.startsWith("$")&&(o=a.aliases?.[o.slice(1)])),o||Me(`Could not find aliased icon "${l}"`),Array.isArray(o))return{component:Lt,icon:o}
if("string"!=typeof o)return{component:Ot,icon:o}
const n=Object.keys(a.sets).find((e=>"string"==typeof o&&o.startsWith(`${e}:`))),r=n?o.slice(n.length+1):o
return{component:a.sets[n??a.defaultSet].component,icon:r}}))}})((()=>n.value||e.icon)),{sizeClasses:s}=Xl(e),{textColorClasses:u,textColorStyles:c}=cl((()=>e.color))
return Et((()=>{const a=o.default?.()
a&&(n.value=M(a).filter((e=>e.type===t.Text&&e.children&&"string"==typeof e.children))[0]?.children)
const d=!(!l.onClick&&!l.onClickOnce)
return t.createVNode(i.value.component,{tag:e.tag,icon:i.value.icon,class:["v-icon","notranslate",r.value,s.value,u.value,{"v-icon--clickable":d,"v-icon--disabled":e.disabled,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[{"--v-icon-opacity":e.opacity},s.value?void 0:{fontSize:m(e.size),height:m(e.size),width:m(e.size)},c.value,e.style],role:d?"button":void 0,"aria-hidden":!d,tabindex:d?e.disabled?-1:0:void 0},{default:()=>[a]})})),{}}})
function Jl(e,a){const o=t.ref(),n=t.shallowRef(!1)
if(l){const e=new IntersectionObserver((e=>{n.value=!!e.find((e=>e.isIntersecting))}),a)
t.onBeforeUnmount((()=>{e.disconnect()})),t.watch(o,((t,a)=>{a&&(e.unobserve(a),n.value=!1),t&&e.observe(t)}),{flush:"post"})}return{intersectionRef:o,isIntersecting:n}}const eo=ht({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...yt(),...Kl(),...Ba({tag:"div"}),...ba()},"VProgressCircular"),to=Ct()({name:"VProgressCircular",props:eo(),setup(e,a){let{slots:l}=a
const o=2*Math.PI*20,n=t.ref(),{themeClasses:r}=Ca(e),{sizeClasses:i,sizeStyles:s}=Xl(e),{textColorClasses:u,textColorStyles:c}=cl((()=>e.color)),{textColorClasses:d,textColorStyles:v}=cl((()=>e.bgColor)),{intersectionRef:p,isIntersecting:f}=Jl(),{resizeRef:g,contentRect:h}=Xt(),y=t.toRef((()=>Math.max(0,Math.min(100,parseFloat(e.modelValue))))),b=t.toRef((()=>Number(e.width))),V=t.toRef((()=>s.value?Number(e.size):h.value?h.value.width:Math.max(b.value,32))),w=t.toRef((()=>20/(1-b.value/V.value)*2)),S=t.toRef((()=>b.value/V.value*w.value)),k=t.toRef((()=>m((100-y.value)/100*o)))
return t.watchEffect((()=>{p.value=n.value,g.value=n.value})),Et((()=>t.createVNode(e.tag,{ref:n,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":f.value,"v-progress-circular--disable-shrink":"disable-shrink"===e.indeterminate},r.value,i.value,u.value,e.class],style:[s.value,c.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:y.value},{default:()=>[t.createVNode("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${w.value} ${w.value}`},[t.createVNode("circle",{class:["v-progress-circular__underlay",d.value],style:v.value,fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":S.value,"stroke-dasharray":o,"stroke-dashoffset":0},null),t.createVNode("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":S.value,"stroke-dasharray":o,"stroke-dashoffset":k.value},null)]),l.default&&t.createVNode("div",{class:"v-progress-circular__content"},[l.default({value:y.value})])]}))),{}}}),ao={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},lo=ht({location:String},"location")
function oo(e){let a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],l=arguments.length>2?arguments[2]:void 0
const{isRtl:o}=ha(),n=t.computed((()=>{if(!e.location)return{}
const{side:t,align:n}=se(e.location.split(" ").length>1?e.location:`${e.location} center`,o.value)
function r(e){return l?l(e):0}const i={}
return"center"!==t&&(a?i[ao[t]]=`calc(100% - ${r(t)}px)`:i[t]=0),"center"!==n?a?i[ao[n]]=`calc(100% - ${r(n)}px)`:i[n]=0:("center"===t?i.top=i.left="50%":i[{top:"left",bottom:"left",left:"top",right:"top"}[t]]="50%",i.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[t]),i}))
return{locationStyles:n}}const no=ht({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},bufferColor:String,bufferOpacity:[Number,String],clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},opacity:[Number,String],reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...yt(),...lo({location:"top"}),...vl(),...Ba(),...ba()},"VProgressLinear"),ro=Ct()({name:"VProgressLinear",props:no(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:o}=l
const n=na(e,"modelValue"),{isRtl:r,rtlClasses:i}=ha(),{themeClasses:s}=Ca(e),{locationStyles:u}=oo(e),{textColorClasses:c,textColorStyles:d}=cl((()=>e.color)),{backgroundColorClasses:v,backgroundColorStyles:p}=dl((()=>e.bgColor||e.color)),{backgroundColorClasses:f,backgroundColorStyles:g}=dl((()=>e.bufferColor||e.bgColor||e.color)),{backgroundColorClasses:h,backgroundColorStyles:y}=dl((()=>e.color)),{roundedClasses:b}=pl(e),{intersectionRef:V,isIntersecting:w}=Jl(),S=t.computed((()=>parseFloat(e.max))),k=t.computed((()=>parseFloat(e.height))),x=t.computed((()=>A(parseFloat(e.bufferValue)/S.value*100,0,100))),N=t.computed((()=>A(parseFloat(n.value)/S.value*100,0,100))),C=t.computed((()=>r.value!==e.reverse)),I=t.computed((()=>e.indeterminate?"fade-transition":"slide-x-transition")),_=a&&window.matchMedia?.("(forced-colors: active)").matches
function P(e){if(!V.value)return
const{left:t,right:a,width:l}=V.value.getBoundingClientRect(),o=C.value?l-e.clientX+(a-l):e.clientX-t
n.value=Math.round(o/l*S.value)}return Et((()=>t.createVNode(e.tag,{ref:V,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&w.value,"v-progress-linear--reverse":C.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},b.value,s.value,i.value,e.class],style:[{bottom:"bottom"===e.location?0:void 0,top:"top"===e.location?0:void 0,height:e.active?m(k.value):0,"--v-progress-linear-height":m(k.value),...e.absolute?u.value:{}},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:Math.min(parseFloat(n.value),S.value),onClick:e.clickable&&P},{default:()=>[e.stream&&t.createVNode("div",{key:"stream",class:["v-progress-linear__stream",c.value],style:{...d.value,[C.value?"left":"right"]:m(-k.value),borderTop:`${m(k.value/2)} dotted`,opacity:parseFloat(e.bufferOpacity),top:`calc(50% - ${m(k.value/4)})`,width:m(100-x.value,"%"),"--v-progress-linear-stream-to":m(k.value*(C.value?1:-1))}},null),t.createVNode("div",{class:["v-progress-linear__background",_?void 0:v.value],style:[p.value,{opacity:parseFloat(e.bgOpacity),width:e.stream?0:void 0}]},null),t.createVNode("div",{class:["v-progress-linear__buffer",_?void 0:f.value],style:[g.value,{opacity:parseFloat(e.bufferOpacity),width:m(x.value,"%")}]},null),t.createVNode(t.Transition,{name:I.value},{default:()=>[e.indeterminate?t.createVNode("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map((e=>t.createVNode("div",{key:e,class:["v-progress-linear__indeterminate",e,_?void 0:h.value],style:y.value},null)))]):t.createVNode("div",{class:["v-progress-linear__determinate",_?void 0:h.value],style:[y.value,{width:m(N.value,"%")}]},null)]}),o.default&&t.createVNode("div",{class:"v-progress-linear__content"},[o.default({value:N.value,buffer:x.value})])]}))),{}}}),io=ht({loading:[Boolean,String]},"loader")
function so(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
return{loaderClasses:t.toRef((()=>({[`${a}--loading`]:e.loading})))}}function uo(e,a){let{slots:l}=a
return t.createVNode("div",{class:`${e.name}__loader`},[l.default?.({color:e.color,isActive:e.active})||t.createVNode(ro,{absolute:e.absolute,active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const co=["static","relative","fixed","absolute","sticky"],vo=ht({position:{type:String,validator:e=>co.includes(e)}},"position")
function po(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
return{positionClasses:t.toRef((()=>e.position?`${a}--${e.position}`:void 0))}}function fo(){return bt("useRouter")?.proxy?.$router}function mo(e,a){const l=t.resolveDynamicComponent("RouterLink"),o=t.toRef((()=>!(!e.href&&!e.to))),n=t.computed((()=>o?.value||q(a,"click")||q(e,"click")))
if("string"==typeof l||!("useLink"in l)){const a=t.toRef((()=>e.href))
return{isLink:o,isClickable:n,href:a,linkProps:t.reactive({href:a})}}const r=l.useLink({to:t.toRef((()=>e.to||"")),replace:t.toRef((()=>e.replace))}),i=t.computed((()=>e.to?r:void 0)),s=function(){const e=bt("useRoute")
return t.computed((()=>e?.proxy?.$route))}(),u=t.computed((()=>!!i.value&&(e.exact?s.value?i.value.isExactActive?.value&&d(i.value.route.value.query,s.value.query):i.value.isExactActive?.value??!1:i.value.isActive?.value??!1))),c=t.computed((()=>e.to?i.value?.route.value.href:e.href))
return{isLink:o,isClickable:n,isActive:u,route:i.value?.route,navigate:i.value?.navigate,href:c,linkProps:t.reactive({href:c,"aria-current":t.toRef((()=>u.value?"page":void 0))})}}const go=ht({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router")
let ho=!1
const yo=Symbol("rippleStop"),bo=80
function Vo(e,t){e.style.transform=t,e.style.webkitTransform=t}function wo(e){return"TouchEvent"===e.constructor.name}function So(e){return"KeyboardEvent"===e.constructor.name}const ko={show(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
if(!t?._ripple?.enabled)return
const l=document.createElement("span"),o=document.createElement("span")
l.appendChild(o),l.className="v-ripple__container",a.class&&(l.className+=` ${a.class}`)
const{radius:n,scale:r,x:i,y:s,centerX:u,centerY:c}=function(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=0,o=0
if(!So(e)){const a=t.getBoundingClientRect(),n=wo(e)?e.touches[e.touches.length-1]:e
l=n.clientX-a.left,o=n.clientY-a.top}let n=0,r=.3
t._ripple?.circle?(r=.15,n=t.clientWidth/2,n=a.center?n:n+Math.sqrt((l-n)**2+(o-n)**2)/4):n=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2
const i=(t.clientWidth-2*n)/2+"px",s=(t.clientHeight-2*n)/2+"px"
return{radius:n,scale:r,x:a.center?i:l-n+"px",y:a.center?s:o-n+"px",centerX:i,centerY:s}}(e,t,a),d=2*n+"px"
o.className="v-ripple__animation",o.style.width=d,o.style.height=d,t.appendChild(l)
const v=window.getComputedStyle(t)
v&&"static"===v.position&&(t.style.position="relative",t.dataset.previousPosition="static"),o.classList.add("v-ripple__animation--enter"),o.classList.add("v-ripple__animation--visible"),Vo(o,`translate(${i}, ${s}) scale3d(${r},${r},${r})`),o.dataset.activated=String(performance.now()),requestAnimationFrame((()=>{requestAnimationFrame((()=>{o.classList.remove("v-ripple__animation--enter"),o.classList.add("v-ripple__animation--in"),Vo(o,`translate(${u}, ${c}) scale3d(1,1,1)`)}))}))},hide(e){if(!e?._ripple?.enabled)return
const t=e.getElementsByClassName("v-ripple__animation")
if(0===t.length)return
const a=t[t.length-1]
if(a.dataset.isHiding)return
a.dataset.isHiding="true"
const l=performance.now()-Number(a.dataset.activated),o=Math.max(250-l,0)
setTimeout((()=>{a.classList.remove("v-ripple__animation--in"),a.classList.add("v-ripple__animation--out"),setTimeout((()=>{1===e.getElementsByClassName("v-ripple__animation").length&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),a.parentNode?.parentNode===e&&e.removeChild(a.parentNode)}),300)}),o)}}
function xo(e){return void 0===e||!!e}function No(e){const t={},a=e.currentTarget
if(a?._ripple&&!a._ripple.touched&&!e[yo]){if(e[yo]=!0,wo(e))a._ripple.touched=!0,a._ripple.isTouch=!0
else if(a._ripple.isTouch)return
if(t.center=a._ripple.centered||So(e),a._ripple.class&&(t.class=a._ripple.class),wo(e)){if(a._ripple.showTimerCommit)return
a._ripple.showTimerCommit=()=>{ko.show(e,a,t)},a._ripple.showTimer=window.setTimeout((()=>{a?._ripple?.showTimerCommit&&(a._ripple.showTimerCommit(),a._ripple.showTimerCommit=null)}),bo)}else ko.show(e,a,t)}}function Co(e){e[yo]=!0}function Io(e){const t=e.currentTarget
if(t?._ripple){if(window.clearTimeout(t._ripple.showTimer),"touchend"===e.type&&t._ripple.showTimerCommit)return t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,void(t._ripple.showTimer=window.setTimeout((()=>{Io(e)})))
window.setTimeout((()=>{t._ripple&&(t._ripple.touched=!1)})),ko.hide(t)}}function _o(e){const t=e.currentTarget
t?._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let Po=!1
function Bo(e){Po||e.keyCode!==b.enter&&e.keyCode!==b.space||(Po=!0,No(e))}function Ro(e){Po=!1,Io(e)}function Ao(e){Po&&(Po=!1,Io(e))}function To(e,t,a){const{value:l,modifiers:o}=t,n=xo(l)
if(n||ko.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=n,e._ripple.centered=o.center,e._ripple.circle=o.circle,g(l)&&l.class&&(e._ripple.class=l.class),n&&!a){if(o.stop)return e.addEventListener("touchstart",Co,{passive:!0}),void e.addEventListener("mousedown",Co)
e.addEventListener("touchstart",No,{passive:!0}),e.addEventListener("touchend",Io,{passive:!0}),e.addEventListener("touchmove",_o,{passive:!0}),e.addEventListener("touchcancel",Io),e.addEventListener("mousedown",No),e.addEventListener("mouseup",Io),e.addEventListener("mouseleave",Io),e.addEventListener("keydown",Bo),e.addEventListener("keyup",Ro),e.addEventListener("blur",Ao),e.addEventListener("dragstart",Io,{passive:!0})}else!n&&a&&Do(e)}function Do(e){e.removeEventListener("mousedown",No),e.removeEventListener("touchstart",No),e.removeEventListener("touchend",Io),e.removeEventListener("touchmove",_o),e.removeEventListener("touchcancel",Io),e.removeEventListener("mouseup",Io),e.removeEventListener("mouseleave",Io),e.removeEventListener("keydown",Bo),e.removeEventListener("keyup",Ro),e.removeEventListener("dragstart",Io),e.removeEventListener("blur",Ao)}const Eo={mounted:function(e,t){To(e,t,!1)},unmounted:function(e){delete e._ripple,Do(e)},updated:function(e,t){if(t.value===t.oldValue)return
To(e,t,xo(t.oldValue))}},Fo=ht({active:{type:Boolean,default:void 0},activeColor:String,baseColor:String,symbol:{type:null,default:Ul},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:Ft,appendIcon:Ft,block:Boolean,readonly:Boolean,slim:Boolean,stacked:Boolean,ripple:{type:[Boolean,Object],default:!0},text:{type:[String,Number,Boolean],default:void 0},...Vl(),...yt(),...Al(),...nl(),...Sl(),...zl(),...io(),...lo(),...vo(),...vl(),...go(),...Kl(),...Ba({tag:"button"}),...ba(),...Fl({variant:"elevated"})},"VBtn"),$o=Ct()({name:"VBtn",props:Fo(),emits:{"group:selected":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const{themeClasses:n}=Ca(e),{borderClasses:r}=wl(e),{densityClasses:i}=Tl(e),{dimensionStyles:s}=rl(e),{elevationClasses:u}=kl(e),{loaderClasses:c}=so(e),{locationStyles:d}=oo(e),{positionClasses:v}=po(e),{roundedClasses:p}=pl(e),{sizeClasses:f,sizeStyles:m}=Xl(e),g=jl(e,e.symbol,!1),h=mo(e,l),y=t.computed((()=>void 0!==e.active?e.active:h.isLink.value?h.isActive?.value:g?.isSelected.value)),b=t.toRef((()=>y.value?e.activeColor??e.color:e.color)),V=t.computed((()=>({color:g?.isSelected.value&&(!h.isLink.value||h.isActive?.value)||!g||h.isActive?.value?b.value??e.baseColor:e.baseColor,variant:e.variant}))),{colorClasses:w,colorStyles:S,variantClasses:k}=$l(V),x=t.computed((()=>g?.disabled.value||e.disabled)),N=t.toRef((()=>"elevated"===e.variant&&!(e.disabled||e.flat||e.border))),C=t.computed((()=>{if(void 0!==e.value&&"symbol"!=typeof e.value)return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value}))
function I(e){x.value||h.isLink.value&&(e.metaKey||e.ctrlKey||e.shiftKey||0!==e.button||"_blank"===l.target)||(h.navigate?.(e),g?.toggle())}return function(e,a){t.watch((()=>e.isActive?.value),(l=>{e.isLink.value&&l&&a&&t.nextTick((()=>{a(!0)}))}),{immediate:!0})}(h,g?.select),Et((()=>{const a=h.isLink.value?"a":e.tag,l=!(!e.prependIcon&&!o.prepend),b=!(!e.appendIcon&&!o.append),V=!(!e.icon||!0===e.icon)
return t.withDirectives(t.createVNode(a,t.mergeProps({type:"a"===a?void 0:"button",class:["v-btn",g?.selectedClass.value,{"v-btn--active":y.value,"v-btn--block":e.block,"v-btn--disabled":x.value,"v-btn--elevated":N.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--readonly":e.readonly,"v-btn--slim":e.slim,"v-btn--stacked":e.stacked},n.value,r.value,w.value,i.value,u.value,c.value,v.value,p.value,f.value,k.value,e.class],style:[S.value,s.value,d.value,m.value,e.style],"aria-busy":!!e.loading||void 0,disabled:x.value||void 0,tabindex:e.loading||e.readonly?-1:void 0,onClick:I,value:C.value},h.linkProps),{default:()=>[El(!0,"v-btn"),!e.icon&&l&&t.createVNode("span",{key:"prepend",class:"v-btn__prepend"},[o.prepend?t.createVNode(ol,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},o.prepend):t.createVNode(Ql,{key:"prepend-icon",icon:e.prependIcon},null)]),t.createVNode("span",{class:"v-btn__content","data-no-activator":""},[!o.default&&V?t.createVNode(Ql,{key:"content-icon",icon:e.icon},null):t.createVNode(ol,{key:"content-defaults",disabled:!V,defaults:{VIcon:{icon:e.icon}}},{default:()=>[o.default?.()??t.toDisplayString(e.text)]})]),!e.icon&&b&&t.createVNode("span",{key:"append",class:"v-btn__append"},[o.append?t.createVNode(ol,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},o.append):t.createVNode(Ql,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&t.createVNode("span",{key:"loader",class:"v-btn__loader"},[o.loader?.()??t.createVNode(to,{color:"boolean"==typeof e.loading?void 0:e.loading,indeterminate:!0,width:"2"},null)])]}),[[Eo,!x.value&&e.ripple,"",{center:!!e.icon}]])})),{group:g}}}),Mo=ht({...Fo({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),Oo=Ct()({name:"VAppBarNavIcon",props:Mo(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode($o,t.mergeProps(e,{class:["v-app-bar-nav-icon"]}),l))),{}}}),Lo=Ct()({name:"VAppBarTitle",props:Ra(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode(Aa,t.mergeProps(e,{class:"v-app-bar-title"}),l))),{}}}),zo=It("v-alert-title"),jo=["success","info","warning","error"],Ho=ht({border:{type:[Boolean,String],validator:e=>"boolean"==typeof e||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:Ft,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>jo.includes(e)},...yt(),...Al(),...nl(),...Sl(),...lo(),...vo(),...vl(),...Ba(),...ba(),...Fl({variant:"flat"})},"VAlert"),Wo=Ct()({name:"VAlert",props:Ho(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const n=na(e,"modelValue"),r=t.toRef((()=>{if(!1!==e.icon)return e.type?e.icon??`$${e.type}`:e.icon})),{themeClasses:i}=Ca(e),{colorClasses:s,colorStyles:u,variantClasses:c}=$l((()=>({color:e.color??e.type,variant:e.variant}))),{densityClasses:d}=Tl(e),{dimensionStyles:v}=rl(e),{elevationClasses:p}=kl(e),{locationStyles:f}=oo(e),{positionClasses:m}=po(e),{roundedClasses:g}=pl(e),{textColorClasses:h,textColorStyles:y}=cl((()=>e.borderColor)),{t:b}=ma(),V=t.toRef((()=>({"aria-label":b(e.closeLabel),onClick(e){n.value=!1,l("click:close",e)}})))
return()=>{const a=!(!o.prepend&&!r.value),l=!(!o.title&&!e.title),b=!(!o.close&&!e.closable)
return n.value&&t.createVNode(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${!0===e.border?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},i.value,s.value,d.value,p.value,m.value,g.value,c.value,e.class],style:[u.value,v.value,f.value,e.style],role:"alert"},{default:()=>[El(!1,"v-alert"),e.border&&t.createVNode("div",{key:"border",class:["v-alert__border",h.value],style:y.value},null),a&&t.createVNode("div",{key:"prepend",class:"v-alert__prepend"},[o.prepend?t.createVNode(ol,{key:"prepend-defaults",disabled:!r.value,defaults:{VIcon:{density:e.density,icon:r.value,size:e.prominent?44:28}}},o.prepend):t.createVNode(Ql,{key:"prepend-icon",density:e.density,icon:r.value,size:e.prominent?44:28},null)]),t.createVNode("div",{class:"v-alert__content"},[l&&t.createVNode(zo,{key:"title"},{default:()=>[o.title?.()??e.title]}),o.text?.()??e.text,o.default?.()]),o.append&&t.createVNode("div",{key:"append",class:"v-alert__append"},[o.append()]),b&&t.createVNode("div",{key:"close",class:"v-alert__close"},[o.close?t.createVNode(ol,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>[o.close?.({props:V.value})]}):t.createVNode($o,t.mergeProps({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},V.value),null)])]})}}}),Uo=ht({start:Boolean,end:Boolean,icon:Ft,image:String,text:String,...Vl(),...yt(),...Al(),...vl(),...Kl(),...Ba(),...ba(),...Fl({variant:"flat"})},"VAvatar"),Yo=Ct()({name:"VAvatar",props:Uo(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{borderClasses:n}=wl(e),{colorClasses:r,colorStyles:i,variantClasses:s}=$l(e),{densityClasses:u}=Tl(e),{roundedClasses:c}=pl(e),{sizeClasses:d,sizeStyles:v}=Xl(e)
return Et((()=>t.createVNode(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},o.value,n.value,r.value,u.value,c.value,d.value,s.value,e.class],style:[i.value,v.value,e.style]},{default:()=>[l.default?t.createVNode(ol,{key:"content-defaults",defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[l.default()]}):e.image?t.createVNode(bl,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?t.createVNode(Ql,{key:"icon",icon:e.icon},null):e.text,El(!1,"v-avatar")]}))),{}}}),Go=ht({text:String,onClick:G(),...yt(),...ba()},"VLabel"),qo=Ct()({name:"VLabel",props:Go(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode("label",{class:["v-label",{"v-label--clickable":!!e.onClick},e.class],style:e.style,onClick:e.onClick},[e.text,l.default?.()]))),{}}}),Ko=Symbol.for("vuetify:selection-control-group"),Xo=ht({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:Ft,trueIcon:Ft,ripple:{type:[Boolean,Object],default:!0},multiple:{type:Boolean,default:null},name:String,readonly:{type:Boolean,default:null},modelValue:null,type:String,valueComparator:{type:Function,default:d},...yt(),...Al(),...ba()},"SelectionControlGroup"),Zo=ht({...Xo({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup"),Qo=Ct()({name:"VSelectionControlGroup",props:Zo(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"modelValue"),n=t.useId(),r=t.toRef((()=>e.id||`v-selection-control-group-${n}`)),i=t.toRef((()=>e.name||r.value)),s=new Set
return t.provide(Ko,{modelValue:o,forceUpdate:()=>{s.forEach((e=>e()))},onForceUpdate:e=>{s.add(e),t.onScopeDispose((()=>{s.delete(e)}))}}),kt({[e.defaultsTarget]:{color:t.toRef((()=>e.color)),disabled:t.toRef((()=>e.disabled)),density:t.toRef((()=>e.density)),error:t.toRef((()=>e.error)),inline:t.toRef((()=>e.inline)),modelValue:o,multiple:t.toRef((()=>!!e.multiple||null==e.multiple&&Array.isArray(o.value))),name:i,falseIcon:t.toRef((()=>e.falseIcon)),trueIcon:t.toRef((()=>e.trueIcon)),readonly:t.toRef((()=>e.readonly)),ripple:t.toRef((()=>e.ripple)),type:t.toRef((()=>e.type)),valueComparator:t.toRef((()=>e.valueComparator))}}),Et((()=>t.createVNode("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:"radio"===e.type?"radiogroup":void 0},[l.default?.()]))),{}}}),Jo=ht({label:String,baseColor:String,trueValue:null,falseValue:null,value:null,...yt(),...Xo()},"VSelectionControl")
const en=Ct()({name:"VSelectionControl",directives:{Ripple:Eo},inheritAttrs:!1,props:Jo(),emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const{group:n,densityClasses:r,icon:i,model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:v,trueValue:p}=function(e){const a=t.inject(Ko,void 0),{densityClasses:l}=Tl(e),o=na(e,"modelValue"),n=t.computed((()=>void 0!==e.trueValue?e.trueValue:void 0===e.value||e.value)),r=t.computed((()=>void 0!==e.falseValue&&e.falseValue)),i=t.computed((()=>!!e.multiple||null==e.multiple&&Array.isArray(o.value))),s=t.computed({get(){const t=a?a.modelValue.value:o.value
return i.value?R(t).some((t=>e.valueComparator(t,n.value))):e.valueComparator(t,n.value)},set(t){if(e.readonly)return
const l=t?n.value:r.value
let s=l
i.value&&(s=t?[...R(o.value),l]:R(o.value).filter((t=>!e.valueComparator(t,n.value)))),a?a.modelValue.value=s:o.value=s}}),{textColorClasses:u,textColorStyles:c}=cl((()=>{if(!e.error&&!e.disabled)return s.value?e.color:e.baseColor})),{backgroundColorClasses:d,backgroundColorStyles:v}=dl((()=>!s.value||e.error||e.disabled?e.baseColor:e.color)),p=t.computed((()=>s.value?e.trueIcon:e.falseIcon))
return{group:a,densityClasses:l,trueValue:n,falseValue:r,model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:v,icon:p}}(e),f=t.useId(),m=t.shallowRef(!1),g=t.shallowRef(!1),h=t.ref(),y=t.toRef((()=>e.id||`input-${f}`)),b=t.toRef((()=>!e.disabled&&!e.readonly))
function V(e){b.value&&(m.value=!0,!1!==te(e.target,":focus-visible")&&(g.value=!0))}function w(){m.value=!1,g.value=!1}function S(e){e.stopPropagation()}function k(a){b.value?(e.readonly&&n&&t.nextTick((()=>n.forceUpdate())),s.value=a.target.checked):h.value&&(h.value.checked=s.value)}return n?.onForceUpdate((()=>{h.value&&(h.value.checked=s.value)})),Et((()=>{const a=o.label?o.label({label:e.label,props:{for:y.value}}):e.label,[n,f]=B(l),b=t.createVNode("input",t.mergeProps({ref:h,checked:s.value,disabled:!!e.disabled,id:y.value,onBlur:w,onFocus:V,onInput:k,"aria-disabled":!!e.disabled,"aria-label":e.label,type:e.type,value:p.value,name:e.name,"aria-checked":"checkbox"===e.type?s.value:void 0},f),null)
return t.createVNode("div",t.mergeProps({class:["v-selection-control",{"v-selection-control--dirty":s.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":m.value,"v-selection-control--focus-visible":g.value,"v-selection-control--inline":e.inline},r.value,e.class]},n,{style:e.style}),[t.createVNode("div",{class:["v-selection-control__wrapper",u.value],style:c.value},[o.default?.({backgroundColorClasses:d,backgroundColorStyles:v}),t.withDirectives(t.createVNode("div",{class:["v-selection-control__input"]},[o.input?.({model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:v,inputNode:b,icon:i.value,props:{onFocus:V,onBlur:w,id:y.value}})??t.createVNode(t.Fragment,null,[i.value&&t.createVNode(Ql,{key:"icon",icon:i.value},null),b])]),[[t.resolveDirective("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),a&&t.createVNode(qo,{for:y.value,onClick:S},{default:()=>[a]})])})),{isFocused:m,input:h}}}),tn=ht({indeterminate:Boolean,indeterminateIcon:{type:Ft,default:"$checkboxIndeterminate"},...Jo({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),an=Ct()({name:"VCheckboxBtn",props:tn(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"indeterminate"),n=na(e,"modelValue")
function r(e){o.value&&(o.value=!1)}const i=t.toRef((()=>o.value?e.indeterminateIcon:e.falseIcon)),s=t.toRef((()=>o.value?e.indeterminateIcon:e.trueIcon))
return Et((()=>{const a=N(en.filterProps(e),["modelValue"])
return t.createVNode(en,t.mergeProps(a,{modelValue:n.value,"onUpdate:modelValue":[e=>n.value=e,r],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:i.value,trueIcon:s.value,"aria-checked":o.value?"mixed":void 0}),l)})),{}}})
function ln(e){const{t:a}=ma()
return{InputIcon:function(l){let{name:o,color:n}=l
const r={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[o],i=e[`onClick:${o}`],s=i&&r?a(`$vuetify.input.${r}`,e.label??""):void 0
return t.createVNode(Ql,{icon:e[`${o}Icon`],"aria-label":s,onClick:i,onKeydown:function(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),K(i,new PointerEvent("click",e)))},color:n},null)}}}const on=ht({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...yt(),...fl({transition:{component:Ja,leaveAbsolute:!0,group:!0}})},"VMessages"),nn=Ct()({name:"VMessages",props:on(),setup(e,a){let{slots:l}=a
const o=t.computed((()=>R(e.messages))),{textColorClasses:n,textColorStyles:r}=cl((()=>e.color))
return Et((()=>t.createVNode(ml,{transition:e.transition,tag:"div",class:["v-messages",n.value,e.class],style:[r.value,e.style]},{default:()=>[e.active&&o.value.map(((e,a)=>t.createVNode("div",{class:"v-messages__message",key:`${a}-${o.value}`},[l.message?l.message({message:e}):e])))]}))),{}}}),rn=ht({focused:Boolean,"onUpdate:focused":G()},"focus")
function sn(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
const l=na(e,"focused")
return{focusClasses:t.toRef((()=>({[`${a}--focused`]:l.value}))),isFocused:l,focus:function(){l.value=!0},blur:function(){l.value=!1}}}const un=Symbol.for("vuetify:form"),cn=ht({disabled:Boolean,fastFail:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form")
function dn(e){const a=t.inject(un,null)
return{...a,isReadonly:t.computed((()=>!!(e?.readonly??a?.isReadonly.value))),isDisabled:t.computed((()=>!!(e?.disabled??a?.isDisabled.value)))}}const vn=ht({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...rn()},"validation")
function pn(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt(),l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.useId()
const o=na(e,"modelValue"),n=t.computed((()=>void 0===e.validationValue?o.value:e.validationValue)),r=dn(e),i=t.ref([]),s=t.shallowRef(!0),u=t.computed((()=>!(!R(""===o.value?null:o.value).length&&!R(""===n.value?null:n.value).length))),c=t.computed((()=>e.errorMessages?.length?R(e.errorMessages).concat(i.value).slice(0,Math.max(0,Number(e.maxErrors))):i.value)),d=t.computed((()=>{let t=(e.validateOn??r.validateOn?.value)||"input"
"lazy"===t&&(t="input lazy"),"eager"===t&&(t="input eager")
const a=new Set(t?.split(" ")??[])
return{input:a.has("input"),blur:a.has("blur")||a.has("input")||a.has("invalid-input"),invalidInput:a.has("invalid-input"),lazy:a.has("lazy"),eager:a.has("eager")}})),v=t.computed((()=>!e.error&&!e.errorMessages?.length&&(!e.rules.length||(s.value?!i.value.length&&!d.value.lazy||null:!i.value.length)))),p=t.shallowRef(!1),f=t.computed((()=>({[`${a}--error`]:!1===v.value,[`${a}--dirty`]:u.value,[`${a}--disabled`]:r.isDisabled.value,[`${a}--readonly`]:r.isReadonly.value}))),m=bt("validation"),g=t.computed((()=>e.name??t.unref(l)))
async function h(){o.value=null,await t.nextTick(),await y()}async function y(){s.value=!0,d.value.lazy?i.value=[]:await b(!d.value.eager)}async function b(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
const a=[]
p.value=!0
for(const t of e.rules){if(a.length>=Number(e.maxErrors??1))break
const l="function"==typeof t?t:()=>t,o=await l(n.value)
!0!==o&&(!1===o||"string"==typeof o?a.push(o||""):console.warn(`${o} is not a valid value. Rule functions must return boolean true or a string.`))}return i.value=a,p.value=!1,s.value=t,i.value}return t.onBeforeMount((()=>{r.register?.({id:g.value,vm:m,validate:b,reset:h,resetValidation:y})})),t.onBeforeUnmount((()=>{r.unregister?.(g.value)})),t.onMounted((async()=>{d.value.lazy||await b(!d.value.eager),r.update?.(g.value,v.value,c.value)})),oa((()=>d.value.input||d.value.invalidInput&&!1===v.value),(()=>{t.watch(n,(()=>{if(null!=n.value)b()
else if(e.focused){const a=t.watch((()=>e.focused),(e=>{e||b(),a()}))}}))})),oa((()=>d.value.blur),(()=>{t.watch((()=>e.focused),(e=>{e||b()}))})),t.watch([v,c],(()=>{r.update?.(g.value,v.value,c.value)})),{errorMessages:c,isDirty:u,isDisabled:r.isDisabled,isReadonly:r.isReadonly,isPristine:s,isValid:v,isValidating:p,reset:h,resetValidation:y,validate:b,validationClasses:f}}const fn=ht({id:String,appendIcon:Ft,baseColor:String,centerAffix:{type:Boolean,default:!0},color:String,glow:Boolean,iconColor:[Boolean,String],prependIcon:Ft,hideDetails:[Boolean,String],hideSpinButtons:Boolean,hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":G(),"onClick:append":G(),...yt(),...Al(),...k(nl(),["maxWidth","minWidth","width"]),...ba(),...vn()},"VInput"),mn=Ct()({name:"VInput",props:{...fn()},emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:l,slots:o,emit:n}=a
const{densityClasses:r}=Tl(e),{dimensionStyles:i}=rl(e),{themeClasses:s}=Ca(e),{rtlClasses:u}=ha(),{InputIcon:c}=ln(e),d=t.useId(),v=t.computed((()=>e.id||`input-${d}`)),p=t.computed((()=>`${v.value}-messages`)),{errorMessages:f,isDirty:m,isDisabled:g,isReadonly:h,isPristine:y,isValid:b,isValidating:V,reset:w,resetValidation:S,validate:k,validationClasses:x}=pn(e,"v-input",v),N=t.computed((()=>({id:v,messagesId:p,isDirty:m,isDisabled:g,isReadonly:h,isPristine:y,isValid:b,isValidating:V,reset:w,resetValidation:S,validate:k}))),C=t.toRef((()=>e.error||e.disabled?void 0:e.focused?e.color:e.baseColor)),I=t.toRef((()=>{if(e.iconColor)return!0===e.iconColor?C.value:e.iconColor})),_=t.computed((()=>e.errorMessages?.length||!y.value&&f.value.length?f.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages))
return Et((()=>{const a=!(!o.prepend&&!e.prependIcon),l=!(!o.append&&!e.appendIcon),n=_.value.length>0,d=!e.hideDetails||"auto"===e.hideDetails&&(n||!!o.details)
return t.createVNode("div",{class:["v-input",`v-input--${e.direction}`,{"v-input--center-affix":e.centerAffix,"v-input--focused":e.focused,"v-input--glow":e.glow,"v-input--hide-spin-buttons":e.hideSpinButtons},r.value,s.value,u.value,x.value,e.class],style:[i.value,e.style]},[a&&t.createVNode("div",{key:"prepend",class:"v-input__prepend"},[o.prepend?.(N.value),e.prependIcon&&t.createVNode(c,{key:"prepend-icon",name:"prepend",color:I.value},null)]),o.default&&t.createVNode("div",{class:"v-input__control"},[o.default?.(N.value)]),l&&t.createVNode("div",{key:"append",class:"v-input__append"},[e.appendIcon&&t.createVNode(c,{key:"append-icon",name:"append",color:I.value},null),o.append?.(N.value)]),d&&t.createVNode("div",{id:p.value,class:"v-input__details",role:"alert","aria-live":"polite"},[t.createVNode(nn,{active:n,messages:_.value},{message:o.message}),o.details?.(N.value)])])})),{reset:w,resetValidation:S,validate:k,isValid:b,errorMessages:f}}}),gn=ht({...fn(),...N(tn(),["inline"])},"VCheckbox"),hn=Ct()({name:"VCheckbox",inheritAttrs:!1,props:gn(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const n=na(e,"modelValue"),{isFocused:r,focus:i,blur:s}=sn(e),u=t.useId()
return Et((()=>{const[a,c]=B(l),d=mn.filterProps(e),v=an.filterProps(e)
return t.createVNode(mn,t.mergeProps({class:["v-checkbox",e.class]},a,d,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,id:e.id||`checkbox-${u}`,focused:r.value,style:e.style}),{...o,default:e=>{let{id:a,messagesId:l,isDisabled:r,isReadonly:u,isValid:d}=e
return t.createVNode(an,t.mergeProps(v,{id:a.value,"aria-describedby":l.value,disabled:r.value,readonly:u.value},c,{error:!1===d.value,modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,onFocus:i,onBlur:s}),o)}})})),{}}}),yn=["sm","md","lg","xl","xxl"],bn=Symbol.for("vuetify:display"),Vn={mobileBreakpoint:"lg",thresholds:{xs:0,sm:600,md:960,lg:1280,xl:1920,xxl:2560}},wn=function(){return $(Vn,arguments.length>0&&void 0!==arguments[0]?arguments[0]:Vn)}
function Sn(e){return a&&!e?window.innerWidth:"object"==typeof e&&e.clientWidth||0}function kn(e){return a&&!e?window.innerHeight:"object"==typeof e&&e.clientHeight||0}function xn(e){const t=a&&!e?window.navigator.userAgent:"ssr"
function l(e){return Boolean(t.match(e))}return{android:l(/android/i),ios:l(/iphone|ipad|ipod/i),cordova:l(/cordova/i),electron:l(/electron/i),chrome:l(/chrome/i),edge:l(/edge/i),firefox:l(/firefox/i),opera:l(/opera/i),win:l(/win/i),mac:l(/mac/i),linux:l(/linux/i),touch:o,ssr:"ssr"===t}}const Nn=ht({mobile:{type:Boolean,default:!1},mobileBreakpoint:[Number,String]},"display")
function Cn(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{mobile:null},a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Vt()
const l=t.inject(bn)
if(!l)throw new Error("Could not find Vuetify display injection")
const o=t.computed((()=>!!e.mobile||("number"==typeof e.mobileBreakpoint?l.width.value<e.mobileBreakpoint:e.mobileBreakpoint?l.width.value<l.thresholds.value[e.mobileBreakpoint]:null===e.mobile&&l.mobile.value))),n=t.toRef((()=>a?{[`${a}--mobile`]:o.value}:{}))
return{...l,displayClasses:n,mobile:o}}const In=Symbol.for("vuetify:goto")
function _n(e){return"string"==typeof e?document.querySelector(e):y(e)}function Pn(e,t,a){if("number"==typeof e)return t&&a?-e:e
let l=_n(e),o=0
for(;l;)o+=t?l.offsetLeft:l.offsetTop,l=l.offsetParent
return o}async function Bn(e,t,a,l){const o=a?"scrollLeft":"scrollTop",n=$(l?.options??{container:void 0,duration:300,layout:!1,offset:0,easing:"easeInOutCubic",patterns:{linear:e=>e,easeInQuad:e=>e**2,easeOutQuad:e=>e*(2-e),easeInOutQuad:e=>e<.5?2*e**2:(4-2*e)*e-1,easeInCubic:e=>e**3,easeOutCubic:e=>--e**3+1,easeInOutCubic:e=>e<.5?4*e**3:(e-1)*(2*e-2)*(2*e-2)+1,easeInQuart:e=>e**4,easeOutQuart:e=>1- --e**4,easeInOutQuart:e=>e<.5?8*e**4:1-8*--e**4,easeInQuint:e=>e**5,easeOutQuint:e=>1+--e**5,easeInOutQuint:e=>e<.5?16*e**5:1+16*--e**5}},t),r=l?.rtl.value,i=("number"==typeof e?e:_n(e))??0,s="parent"===n.container&&i instanceof HTMLElement?i.parentElement:_n(n.container)??(document.scrollingElement||document.body)
const u="function"==typeof n.easing?n.easing:n.patterns[n.easing]
if(!u)throw new TypeError(`Easing function "${n.easing}" not found.`)
let c
if("number"==typeof i)c=Pn(i,a,r)
else if(c=Pn(i,a,r)-Pn(s,a,r),n.layout){const e=window.getComputedStyle(i).getPropertyValue("--v-layout-top")
e&&(c-=parseInt(e,10))}c+=n.offset,c=function(e,t,a,l){const{scrollWidth:o,scrollHeight:n}=e,[r,i]=e===document.scrollingElement?[window.innerWidth,window.innerHeight]:[e.offsetWidth,e.offsetHeight]
let s,u
l?a?(s=-(o-r),u=0):(s=0,u=o-r):(s=0,u=n+-i)
return Math.max(Math.min(t,u),s)}(s,c,!!r,!!a)
const d=s[o]??0
if(c===d)return Promise.resolve(c)
const v=performance.now()
return new Promise((e=>requestAnimationFrame((function t(a){const l=(a-v)/n.duration,r=Math.floor(d+(c-d)*u(A(l,0,1)))
return s[o]=r,l>=1&&Math.abs(r-s[o])<10?e(c):l>2?(Me("Scroll target is not reachable"),e(s[o])):void requestAnimationFrame(t)}))))}function Rn(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const a=t.inject(In),{isRtl:l}=ha()
if(!a)throw new Error("[Vuetify] Could not find injected goto instance")
const o={...a,rtl:t.toRef((()=>a.rtl.value||l.value))}
async function n(t,a){return Bn(t,$(e,a),!1,o)}return n.horizontal=async(t,a)=>Bn(t,$(e,a),!0,o),n}function An(e,t){const a=e?"scrollWidth":"scrollHeight"
return t?.[a]||0}function Tn(e,t,a){if(!a)return 0
const{scrollLeft:l,offsetWidth:o,scrollWidth:n}=a
return e?t?n-o+l:l:a.scrollTop}function Dn(e,t){const a=e?"offsetWidth":"offsetHeight"
return t?.[a]||0}function En(e,t){const a=e?"offsetLeft":"offsetTop"
return t?.[a]||0}const Fn=Symbol.for("vuetify:v-slide-group"),$n=ht({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Fn},nextIcon:{type:Ft,default:"$next"},prevIcon:{type:Ft,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>"boolean"==typeof e||["always","desktop","mobile"].includes(e)},...yt(),...Nn({mobile:null}),...Ba(),...Ll({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),Mn=Ct()({name:"VSlideGroup",props:$n(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:o}=l
const{isRtl:n}=ha(),{displayClasses:r,mobile:i}=Cn(e),s=Hl(e,e.symbol),u=t.shallowRef(!1),c=t.shallowRef(0),d=t.shallowRef(0),v=t.shallowRef(0),p=t.computed((()=>"horizontal"===e.direction)),{resizeRef:f,contentRect:m}=Xt(),{resizeRef:g,contentRect:h}=Xt(),y=Rn(),b=t.computed((()=>({container:f.el,duration:200,easing:"easeOutQuart"}))),V=t.computed((()=>s.selected.value.length?s.items.value.findIndex((e=>e.id===s.selected.value[0])):-1)),w=t.computed((()=>s.selected.value.length?s.items.value.findIndex((e=>e.id===s.selected.value[s.selected.value.length-1])):-1))
if(a){let a=-1
t.watch((()=>[s.selected.value,m.value,h.value,p.value]),(()=>{cancelAnimationFrame(a),a=requestAnimationFrame((()=>{if(m.value&&h.value){const e=p.value?"width":"height"
d.value=m.value[e],v.value=h.value[e],u.value=d.value+1<v.value}if(V.value>=0&&g.el){k(g.el.children[w.value],e.centerActive)}}))}))}const S=t.shallowRef(!1)
function k(e,t){let a=0
a=t?function(e){let{selectedElement:t,containerElement:a,isHorizontal:l}=e
const o=Dn(l,a)
return En(l,t)-o/2+Dn(l,t)/2}({containerElement:f.el,isHorizontal:p.value,selectedElement:e}):function(e){let{selectedElement:t,containerElement:a,isRtl:l,isHorizontal:o}=e
const n=Dn(o,a),r=Tn(o,l,a),i=Dn(o,t),s=En(o,t),u=.4*i
return r>s?s-u:r+n<s+i?s-n+i+u:r}({containerElement:f.el,isHorizontal:p.value,isRtl:n.value,selectedElement:e}),x(a)}function x(e){if(!a||!f.el)return
const t=Dn(p.value,f.el),l=Tn(p.value,n.value,f.el)
if(!(An(p.value,f.el)<=t||Math.abs(e-l)<16)){if(p.value&&n.value&&f.el){const{scrollWidth:t,offsetWidth:a}=f.el
e=t-a-e}p.value?y.horizontal(e,b.value):y(e,b.value)}}function N(e){const{scrollTop:t,scrollLeft:a}=e.target
c.value=p.value?a:t}function C(e){if(S.value=!0,u.value&&g.el)for(const t of e.composedPath())for(const e of g.el.children)if(e===t)return void k(e)}function I(e){S.value=!1}let _=!1
function P(e){_||S.value||e.relatedTarget&&g.el?.contains(e.relatedTarget)||T(),_=!1}function B(){_=!0}function R(e){function t(t){e.preventDefault(),T(t)}g.el&&(p.value?"ArrowRight"===e.key?t(n.value?"prev":"next"):"ArrowLeft"===e.key&&t(n.value?"next":"prev"):"ArrowDown"===e.key?t("next"):"ArrowUp"===e.key&&t("prev"),"Home"===e.key?t("first"):"End"===e.key&&t("last"))}function A(e,t){if(!e)return
let a=e
do{a=a?.["next"===t?"nextElementSibling":"previousElementSibling"]}while(a?.hasAttribute("disabled"))
return a}function T(e){if(!g.el)return
let t
if(e)if("next"===e){if(t=A(g.el.querySelector(":focus"),e),!t)return T("first")}else if("prev"===e){if(t=A(g.el.querySelector(":focus"),e),!t)return T("last")}else"first"===e?(t=g.el.firstElementChild,t?.hasAttribute("disabled")&&(t=A(t,"next"))):"last"===e&&(t=g.el.lastElementChild,t?.hasAttribute("disabled")&&(t=A(t,"prev")))
else{t=X(g.el)[0]}t&&t.focus({preventScroll:!0})}function D(e){const t=p.value&&n.value?-1:1,a=("prev"===e?-t:t)*d.value
let l=c.value+a
if(p.value&&n.value&&f.el){const{scrollWidth:e,offsetWidth:t}=f.el
l+=e-t}x(l)}const E=t.computed((()=>({next:s.next,prev:s.prev,select:s.select,isSelected:s.isSelected}))),F=t.computed((()=>{switch(e.showArrows){case"always":return!0
case"desktop":return!i.value
case!0:return u.value||Math.abs(c.value)>0
case"mobile":return i.value||u.value||Math.abs(c.value)>0
default:return!i.value&&(u.value||Math.abs(c.value)>0)}})),$=t.computed((()=>Math.abs(c.value)>1)),M=t.computed((()=>{if(!f.value)return!1
const e=An(p.value,f.el),t=function(e,t){const a=e?"clientWidth":"clientHeight"
return t?.[a]||0}(p.value,f.el)
return e-t-Math.abs(c.value)>1}))
return Et((()=>t.createVNode(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!p.value,"v-slide-group--has-affixes":F.value,"v-slide-group--is-overflowing":u.value},r.value,e.class],style:e.style,tabindex:S.value||s.selected.value.length?-1:0,onFocus:P},{default:()=>[F.value&&t.createVNode("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!$.value}],onMousedown:B,onClick:()=>$.value&&D("prev")},[o.prev?.(E.value)??t.createVNode(Ua,null,{default:()=>[t.createVNode(Ql,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),t.createVNode("div",{key:"container",ref:f,class:"v-slide-group__container",onScroll:N},[t.createVNode("div",{ref:g,class:"v-slide-group__content",onFocusin:C,onFocusout:I,onKeydown:R},[o.default?.(E.value)])]),F.value&&t.createVNode("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!M.value}],onMousedown:B,onClick:()=>M.value&&D("next")},[o.next?.(E.value)??t.createVNode(Ua,null,{default:()=>[t.createVNode(Ql,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}))),{selected:s.selected,scrollTo:D,scrollOffset:c,focus:T,hasPrev:$,hasNext:M}}}),On=Symbol.for("vuetify:v-chip-group"),Ln=ht({baseColor:String,column:Boolean,filter:Boolean,valueComparator:{type:Function,default:d},...$n(),...yt(),...Ll({selectedClass:"v-chip--selected"}),...Ba(),...ba(),...Fl({variant:"tonal"})},"VChipGroup"),zn=Ct()({name:"VChipGroup",props:Ln(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{isSelected:n,select:r,next:i,prev:s,selected:u}=Hl(e,On)
return kt({VChip:{baseColor:t.toRef((()=>e.baseColor)),color:t.toRef((()=>e.color)),disabled:t.toRef((()=>e.disabled)),filter:t.toRef((()=>e.filter)),variant:t.toRef((()=>e.variant))}}),Et((()=>{const a=Mn.filterProps(e)
return t.createVNode(Mn,t.mergeProps(a,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style}),{default:()=>[l.default?.({isSelected:n,select:r,next:i,prev:s,selected:u.value})]})})),{}}}),jn=ht({activeClass:String,appendAvatar:String,appendIcon:Ft,baseColor:String,closable:Boolean,closeIcon:{type:Ft,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:Ft,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:Ft,ripple:{type:[Boolean,Object],default:!0},text:{type:[String,Number,Boolean],default:void 0},modelValue:{type:Boolean,default:!0},onClick:G(),onClickOnce:G(),...Vl(),...yt(),...Al(),...Sl(),...zl(),...vl(),...go(),...Kl(),...Ba({tag:"span"}),...ba(),...Fl({variant:"tonal"})},"VChip"),Hn=Ct()({name:"VChip",directives:{Ripple:Eo},props:jn(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{t:r}=ma(),{borderClasses:i}=wl(e),{densityClasses:s}=Tl(e),{elevationClasses:u}=kl(e),{roundedClasses:c}=pl(e),{sizeClasses:d}=Xl(e),{themeClasses:v}=Ca(e),p=na(e,"modelValue"),f=jl(e,On,!1),m=mo(e,l),g=t.toRef((()=>!1!==e.link&&m.isLink.value)),h=t.computed((()=>!e.disabled&&!1!==e.link&&(!!f||e.link||m.isClickable.value))),y=t.toRef((()=>({"aria-label":r(e.closeLabel),onClick(e){e.preventDefault(),e.stopPropagation(),p.value=!1,o("click:close",e)}}))),{colorClasses:b,colorStyles:V,variantClasses:w}=$l((()=>({color:!f||f.isSelected.value?e.color??e.baseColor:e.baseColor,variant:e.variant})))
function S(e){o("click",e),h.value&&(m.navigate?.(e),f?.toggle())}function k(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),S(e))}return()=>{const a=m.isLink.value?"a":e.tag,l=!(!e.appendIcon&&!e.appendAvatar),o=!(!l&&!n.append),r=!(!n.close&&!e.closable),x=!(!n.filter&&!e.filter)&&f,N=!(!e.prependIcon&&!e.prependAvatar),C=!(!N&&!n.prepend)
return p.value&&t.withDirectives(t.createVNode(a,t.mergeProps({class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":h.value,"v-chip--filter":x,"v-chip--pill":e.pill,[`${e.activeClass}`]:e.activeClass&&m.isActive?.value},v.value,i.value,b.value,s.value,u.value,c.value,d.value,w.value,f?.selectedClass.value,e.class],style:[V.value,e.style],disabled:e.disabled||void 0,draggable:e.draggable,tabindex:h.value?0:void 0,onClick:S,onKeydown:h.value&&!g.value&&k},m.linkProps),{default:()=>[El(h.value,"v-chip"),x&&t.createVNode(al,{key:"filter"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-chip__filter"},[n.filter?t.createVNode(ol,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},n.filter):t.createVNode(Ql,{key:"filter-icon",icon:e.filterIcon},null)]),[[t.vShow,f.isSelected.value]])]}),C&&t.createVNode("div",{key:"prepend",class:"v-chip__prepend"},[n.prepend?t.createVNode(ol,{key:"prepend-defaults",disabled:!N,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},n.prepend):t.createVNode(t.Fragment,null,[e.prependIcon&&t.createVNode(Ql,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&t.createVNode(Yo,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),t.createVNode("div",{class:"v-chip__content","data-no-activator":""},[n.default?.({isSelected:f?.isSelected.value,selectedClass:f?.selectedClass.value,select:f?.select,toggle:f?.toggle,value:f?.value.value,disabled:e.disabled})??t.toDisplayString(e.text)]),o&&t.createVNode("div",{key:"append",class:"v-chip__append"},[n.append?t.createVNode(ol,{key:"append-defaults",disabled:!l,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},n.append):t.createVNode(t.Fragment,null,[e.appendIcon&&t.createVNode(Ql,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&t.createVNode(Yo,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),r&&t.createVNode("button",t.mergeProps({key:"close",class:"v-chip__close",type:"button","data-testid":"close-chip"},y.value),[n.close?t.createVNode(ol,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},n.close):t.createVNode(Ql,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}),[[t.resolveDirective("ripple"),h.value&&e.ripple,null]])}}}),Wn=Symbol.for("vuetify:list")
function Un(){const e=t.inject(Wn,{hasPrepend:t.shallowRef(!1),updateHasPrepend:()=>null}),a={hasPrepend:t.shallowRef(!1),updateHasPrepend:e=>{e&&(a.hasPrepend.value=e)}}
return t.provide(Wn,a),e}function Yn(){return t.inject(Wn,null)}const Gn=e=>{const a={activate:a=>{let{id:l,value:o,activated:n}=a
return l=t.toRaw(l),e&&!o&&1===n.size&&n.has(l)||(o?n.add(l):n.delete(l)),n},in:(e,t,l)=>{let o=new Set
if(null!=e)for(const n of R(e))o=a.activate({id:n,value:!0,activated:new Set(o),children:t,parents:l})
return o},out:e=>Array.from(e)}
return a},qn=e=>{const a=Gn(e)
return{activate:e=>{let{activated:l,id:o,...n}=e
o=t.toRaw(o)
const r=l.has(o)?new Set([o]):new Set
return a.activate({...n,id:o,activated:r})},in:(e,t,l)=>{let o=new Set
if(null!=e){const n=R(e)
n.length&&(o=a.in(n.slice(0,1),t,l))}return o},out:(e,t,l)=>a.out(e,t,l)}},Kn={open:e=>{let{id:t,value:a,opened:l,parents:o}=e
if(a){const e=new Set
e.add(t)
let a=o.get(t)
for(;null!=a;)e.add(a),a=o.get(a)
return e}return l.delete(t),l},select:()=>null},Xn={open:e=>{let{id:t,value:a,opened:l,parents:o}=e
if(a){let e=o.get(t)
for(l.add(t);null!=e&&e!==t;)l.add(e),e=o.get(e)
return l}return l.delete(t),l},select:()=>null},Zn={open:Xn.open,select:e=>{let{id:t,value:a,opened:l,parents:o}=e
if(!a)return l
const n=[]
let r=o.get(t)
for(;null!=r;)n.push(r),r=o.get(r)
return new Set(n)}},Qn=e=>{const a={select:a=>{let{id:l,value:o,selected:n}=a
if(l=t.toRaw(l),e&&!o){const e=Array.from(n.entries()).reduce(((e,t)=>{let[a,l]=t
return"on"===l&&e.push(a),e}),[])
if(1===e.length&&e[0]===l)return n}return n.set(l,o?"on":"off"),n},in:(e,t,l)=>{const o=new Map
for(const n of e||[])a.select({id:n,value:!0,selected:o,children:t,parents:l})
return o},out:e=>{const t=[]
for(const[a,l]of e.entries())"on"===l&&t.push(a)
return t}}
return a},Jn=e=>{const a=Qn(e)
return{select:e=>{let{selected:l,id:o,...n}=e
o=t.toRaw(o)
const r=l.has(o)?new Map([[o,l.get(o)]]):new Map
return a.select({...n,id:o,selected:r})},in:(e,t,l)=>e?.length?a.in(e.slice(0,1),t,l):new Map,out:(e,t,l)=>a.out(e,t,l)}},er=e=>{const a={select:a=>{let{id:l,value:o,selected:n,children:r,parents:i}=a
l=t.toRaw(l)
const s=new Map(n),u=[l]
for(;u.length;){const e=u.shift()
n.set(t.toRaw(e),o?"on":"off"),r.has(e)&&u.push(...r.get(e))}let c=t.toRaw(i.get(l))
for(;c;){const e=r.get(c),a=e.every((e=>"on"===n.get(t.toRaw(e)))),l=e.every((e=>!n.has(t.toRaw(e))||"off"===n.get(t.toRaw(e))))
n.set(c,a?"on":l?"off":"indeterminate"),c=t.toRaw(i.get(c))}if(e&&!o){const e=Array.from(n.entries()).reduce(((e,t)=>{let[a,l]=t
return"on"===l&&e.push(a),e}),[])
if(0===e.length)return s}return n},in:(e,t,l)=>{let o=new Map
for(const n of e||[])o=a.select({id:n,value:!0,selected:o,children:t,parents:l})
return o},out:(e,t)=>{const a=[]
for(const[l,o]of e.entries())"on"!==o||t.has(l)||a.push(l)
return a}}
return a},tr=Symbol.for("vuetify:nested"),ar={id:t.shallowRef(),root:{register:()=>null,unregister:()=>null,parents:t.ref(new Map),children:t.ref(new Map),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:t.ref(!1),selectable:t.ref(!1),opened:t.ref(new Set),activated:t.ref(new Set),selected:t.ref(new Map),selectedValues:t.ref([]),getPath:()=>[]}},lr=ht({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean},"nested"),or=e=>{let a=!1
const l=t.ref(new Map),o=t.ref(new Map),n=na(e,"opened",e.opened,(e=>new Set(e)),(e=>[...e.values()])),r=t.computed((()=>{if("object"==typeof e.activeStrategy)return e.activeStrategy
if("function"==typeof e.activeStrategy)return e.activeStrategy(e.mandatory)
switch(e.activeStrategy){case"leaf":return(e=>{const a=Gn(e)
return{activate:e=>{let{id:l,activated:o,children:n,...r}=e
return l=t.toRaw(l),n.has(l)?o:a.activate({id:l,activated:o,children:n,...r})},in:a.in,out:a.out}})(e.mandatory)
case"single-leaf":return(e=>{const a=qn(e)
return{activate:e=>{let{id:l,activated:o,children:n,...r}=e
return l=t.toRaw(l),n.has(l)?o:a.activate({id:l,activated:o,children:n,...r})},in:a.in,out:a.out}})(e.mandatory)
case"independent":return Gn(e.mandatory)
default:return qn(e.mandatory)}})),i=t.computed((()=>{if("object"==typeof e.selectStrategy)return e.selectStrategy
if("function"==typeof e.selectStrategy)return e.selectStrategy(e.mandatory)
switch(e.selectStrategy){case"single-leaf":return(e=>{const a=Jn(e)
return{select:e=>{let{id:l,selected:o,children:n,...r}=e
return l=t.toRaw(l),n.has(l)?o:a.select({id:l,selected:o,children:n,...r})},in:a.in,out:a.out}})(e.mandatory)
case"leaf":return(e=>{const a=Qn(e)
return{select:e=>{let{id:l,selected:o,children:n,...r}=e
return l=t.toRaw(l),n.has(l)?o:a.select({id:l,selected:o,children:n,...r})},in:a.in,out:a.out}})(e.mandatory)
case"independent":return Qn(e.mandatory)
case"single-independent":return Jn(e.mandatory)
case"trunk":return(e=>{const t=er(e)
return{select:t.select,in:t.in,out:(e,t,a)=>{const l=[]
for(const[t,o]of e.entries())if("on"===o){if(a.has(t)){const l=a.get(t)
if("on"===e.get(l))continue}l.push(t)}return l}}})(e.mandatory)
default:return er(e.mandatory)}})),s=t.computed((()=>{if("object"==typeof e.openStrategy)return e.openStrategy
switch(e.openStrategy){case"list":return Zn
case"single":return Kn
default:return Xn}})),u=na(e,"activated",e.activated,(e=>r.value.in(e,l.value,o.value)),(e=>r.value.out(e,l.value,o.value))),c=na(e,"selected",e.selected,(e=>i.value.in(e,l.value,o.value)),(e=>i.value.out(e,l.value,o.value)))
function d(e){const t=[]
let a=e
for(;null!=a;)t.unshift(a),a=o.value.get(a)
return t}t.onBeforeUnmount((()=>{a=!0}))
const v=bt("nested"),p=new Set,f={id:t.shallowRef(),root:{opened:n,activatable:t.toRef((()=>e.activatable)),selectable:t.toRef((()=>e.selectable)),activated:u,selected:c,selectedValues:t.computed((()=>{const e=[]
for(const[t,a]of c.value.entries())"on"===a&&e.push(t)
return e})),register:(e,t,a)=>{if(p.has(e)){Oe(`Multiple nodes with the same ID\n\t${d(e).map(String).join(" -> ")}\n\t${d(t).concat(e).map(String).join(" -> ")}`)}else p.add(e),t&&e!==t&&o.value.set(e,t),a&&l.value.set(e,[]),null!=t&&l.value.set(t,[...l.value.get(t)||[],e])},unregister:e=>{if(a)return
p.delete(e),l.value.delete(e)
const t=o.value.get(e)
if(t){const a=l.value.get(t)??[]
l.value.set(t,a.filter((t=>t!==e)))}o.value.delete(e)},open:(e,t,a)=>{v.emit("click:open",{id:e,value:t,path:d(e),event:a})
const r=s.value.open({id:e,value:t,opened:new Set(n.value),children:l.value,parents:o.value,event:a})
r&&(n.value=r)},openOnSelect:(e,t,a)=>{const r=s.value.select({id:e,value:t,selected:new Map(c.value),opened:new Set(n.value),children:l.value,parents:o.value,event:a})
r&&(n.value=r)},select:(e,t,a)=>{v.emit("click:select",{id:e,value:t,path:d(e),event:a})
const n=i.value.select({id:e,value:t,selected:new Map(c.value),children:l.value,parents:o.value,event:a})
n&&(c.value=n),f.root.openOnSelect(e,t,a)},activate:(t,a,n)=>{if(!e.activatable)return f.root.select(t,!0,n)
v.emit("click:activate",{id:t,value:a,path:d(t),event:n})
const i=r.value.activate({id:t,value:a,activated:new Set(u.value),children:l.value,parents:o.value,event:n})
if(i.size!==u.value.size)u.value=i
else{for(const e of i)if(!u.value.has(e))return void(u.value=i)
for(const e of u.value)if(!i.has(e))return void(u.value=i)}},children:l,parents:o,getPath:d}}
return t.provide(tr,f),f.root},nr=(e,a)=>{const l=t.inject(tr,ar),o=Symbol("nested item"),n=t.computed((()=>t.toValue(e)??o)),r={...l,id:n,open:(e,t)=>l.root.open(n.value,e,t),openOnSelect:(e,t)=>l.root.openOnSelect(n.value,e,t),isOpen:t.computed((()=>l.root.opened.value.has(n.value))),parent:t.computed((()=>l.root.parents.value.get(n.value))),activate:(e,t)=>l.root.activate(n.value,e,t),isActivated:t.computed((()=>l.root.activated.value.has(t.toRaw(n.value)))),select:(e,t)=>l.root.select(n.value,e,t),isSelected:t.computed((()=>"on"===l.root.selected.value.get(t.toRaw(n.value)))),isIndeterminate:t.computed((()=>"indeterminate"===l.root.selected.value.get(t.toRaw(n.value)))),isLeaf:t.computed((()=>!l.root.children.value.get(n.value))),isGroupActivator:l.isGroupActivator}
return t.onBeforeMount((()=>{!l.isGroupActivator&&l.root.register(n.value,l.id.value,a)})),t.onBeforeUnmount((()=>{!l.isGroupActivator&&l.root.unregister(n.value)})),a&&t.provide(tr,r),r},rr=Nt({name:"VListGroupActivator",setup(e,a){let{slots:l}=a
return(()=>{const e=t.inject(tr,ar)
t.provide(tr,{...e,isGroupActivator:!0})})(),()=>l.default?.()}}),ir=ht({activeColor:String,baseColor:String,color:String,collapseIcon:{type:Ft,default:"$collapse"},expandIcon:{type:Ft,default:"$expand"},prependIcon:Ft,appendIcon:Ft,fluid:Boolean,subgroup:Boolean,title:String,value:null,...yt(),...Ba()},"VListGroup"),sr=Ct()({name:"VListGroup",props:ir(),setup(e,a){let{slots:l}=a
const{isOpen:o,open:n,id:r}=nr((()=>e.value),!0),i=t.computed((()=>`v-list-group--id-${String(r.value)}`)),s=Yn(),{isBooted:u}=_l()
function c(e){e.stopPropagation(),["INPUT","TEXTAREA"].includes(e.target?.tagName)||n(!o.value,e)}const d=t.computed((()=>({onClick:c,class:"v-list-group__header",id:i.value}))),v=t.computed((()=>o.value?e.collapseIcon:e.expandIcon)),p=t.computed((()=>({VListItem:{active:o.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&v.value,appendIcon:e.appendIcon||!e.subgroup&&v.value,title:e.title,value:e.value}})))
return Et((()=>t.createVNode(e.tag,{class:["v-list-group",{"v-list-group--prepend":s?.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":o.value},e.class],style:e.style},{default:()=>[l.activator&&t.createVNode(ol,{defaults:p.value},{default:()=>[t.createVNode(rr,null,{default:()=>[l.activator({props:d.value,isOpen:o.value})]})]}),t.createVNode(ml,{transition:{component:tl},disabled:!u.value},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-list-group__items",role:"group","aria-labelledby":i.value},[l.default?.()]),[[t.vShow,o.value]])]})]}))),{isOpen:o}}}),ur=ht({opacity:[Number,String],...yt(),...Ba()},"VListItemSubtitle"),cr=Ct()({name:"VListItemSubtitle",props:ur(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode(e.tag,{class:["v-list-item-subtitle",e.class],style:[{"--v-list-item-subtitle-opacity":e.opacity},e.style]},l))),{}}}),dr=It("v-list-item-title"),vr=ht({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:Ft,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:Ft,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},value:null,onClick:G(),onClickOnce:G(),...Vl(),...yt(),...Al(),...nl(),...Sl(),...vl(),...go(),...Ba(),...ba(),...Fl({variant:"text"})},"VListItem"),pr=Ct()({name:"VListItem",directives:{Ripple:Eo},props:vr(),emits:{click:e=>!0},setup(e,a){let{attrs:l,slots:o,emit:n}=a
const r=mo(e,l),i=t.computed((()=>void 0===e.value?r.href.value:e.value)),{activate:s,isActivated:u,select:c,isOpen:d,isSelected:v,isIndeterminate:p,isGroupActivator:f,root:m,parent:g,openOnSelect:h,id:y}=nr(i,!1),b=Yn(),V=t.computed((()=>!1!==e.active&&(e.active||r.isActive?.value||(m.activatable.value?u.value:v.value)))),w=t.toRef((()=>!1!==e.link&&r.isLink.value)),S=t.computed((()=>!!b&&(m.selectable.value||m.activatable.value||null!=e.value))),k=t.computed((()=>!e.disabled&&!1!==e.link&&(e.link||r.isClickable.value||S.value))),x=t.toRef((()=>e.rounded||e.nav)),N=t.toRef((()=>e.color??e.activeColor)),C=t.toRef((()=>({color:V.value?N.value??e.baseColor:e.baseColor,variant:e.variant})))
function I(){null!=g.value&&m.open(g.value,!0),h(!0)}t.watch((()=>r.isActive?.value),(e=>{e&&I()})),t.onBeforeMount((()=>{r.isActive?.value&&I()}))
const{themeClasses:_}=Ca(e),{borderClasses:P}=wl(e),{colorClasses:B,colorStyles:R,variantClasses:A}=$l(C),{densityClasses:T}=Tl(e),{dimensionStyles:D}=rl(e),{elevationClasses:E}=kl(e),{roundedClasses:F}=pl(x),$=t.toRef((()=>e.lines?`v-list-item--${e.lines}-line`:void 0)),M=t.computed((()=>({isActive:V.value,select:c,isOpen:d.value,isSelected:v.value,isIndeterminate:p.value})))
function O(t){n("click",t),["INPUT","TEXTAREA"].includes(t.target?.tagName)||k.value&&(r.navigate?.(t),f||(m.activatable.value?s(!u.value,t):(m.selectable.value||null!=e.value)&&c(!v.value,t)))}function L(e){const t=e.target;["INPUT","TEXTAREA"].includes(t.tagName)||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.target.dispatchEvent(new MouseEvent("click",e)))}return Et((()=>{const a=w.value?"a":e.tag,l=o.title||null!=e.title,n=o.subtitle||null!=e.subtitle,i=!(!e.appendAvatar&&!e.appendIcon),s=!(!i&&!o.append),c=!(!e.prependAvatar&&!e.prependIcon),d=!(!c&&!o.prepend)
var p,f
return b?.updateHasPrepend(d),e.activeColor&&(p="active-color",f=["color","base-color"],f=Array.isArray(f)?f.slice(0,-1).map((e=>`'${e}'`)).join(", ")+` or '${f.at(-1)}'`:`'${f}'`,t.warn(`[Vuetify UPGRADE] '${p}' is deprecated, use ${f} instead.`)),t.withDirectives(t.createVNode(a,t.mergeProps({class:["v-list-item",{"v-list-item--active":V.value,"v-list-item--disabled":e.disabled,"v-list-item--link":k.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!d&&b?.hasPrepend.value,"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&V.value},_.value,P.value,B.value,T.value,E.value,$.value,F.value,A.value,e.class],style:[R.value,D.value,e.style],tabindex:k.value?b?-2:0:void 0,"aria-selected":S.value?m.activatable.value?u.value:m.selectable.value?v.value:V.value:void 0,onClick:O,onKeydown:k.value&&!w.value&&L},r.linkProps),{default:()=>[El(k.value||V.value,"v-list-item"),d&&t.createVNode("div",{key:"prepend",class:"v-list-item__prepend"},[o.prepend?t.createVNode(ol,{key:"prepend-defaults",disabled:!c,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>[o.prepend?.(M.value)]}):t.createVNode(t.Fragment,null,[e.prependAvatar&&t.createVNode(Yo,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&t.createVNode(Ql,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),t.createVNode("div",{class:"v-list-item__spacer"},null)]),t.createVNode("div",{class:"v-list-item__content","data-no-activator":""},[l&&t.createVNode(dr,{key:"title"},{default:()=>[o.title?.({title:e.title})??t.toDisplayString(e.title)]}),n&&t.createVNode(cr,{key:"subtitle"},{default:()=>[o.subtitle?.({subtitle:e.subtitle})??t.toDisplayString(e.subtitle)]}),o.default?.(M.value)]),s&&t.createVNode("div",{key:"append",class:"v-list-item__append"},[o.append?t.createVNode(ol,{key:"append-defaults",disabled:!i,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>[o.append?.(M.value)]}):t.createVNode(t.Fragment,null,[e.appendIcon&&t.createVNode(Ql,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&t.createVNode(Yo,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),t.createVNode("div",{class:"v-list-item__spacer"},null)])]}),[[t.resolveDirective("ripple"),k.value&&e.ripple]])})),{activate:s,isActivated:u,isGroupActivator:f,isSelected:v,list:b,select:c,root:m,id:y,link:r}}}),fr=ht({color:String,inset:Boolean,sticky:Boolean,title:String,...yt(),...Ba()},"VListSubheader"),mr=Ct()({name:"VListSubheader",props:fr(),setup(e,a){let{slots:l}=a
const{textColorClasses:o,textColorStyles:n}=cl((()=>e.color))
return Et((()=>{const a=!(!l.default&&!e.title)
return t.createVNode(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},o.value,e.class],style:[{textColorStyles:n},e.style]},{default:()=>[a&&t.createVNode("div",{class:"v-list-subheader__text"},[l.default?.()??e.title])]})})),{}}}),gr=ht({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...yt(),...ba()},"VDivider"),hr=Ct()({name:"VDivider",props:gr(),setup(e,a){let{attrs:l,slots:o}=a
const{themeClasses:n}=Ca(e),{textColorClasses:r,textColorStyles:i}=cl((()=>e.color)),s=t.computed((()=>{const t={}
return e.length&&(t[e.vertical?"height":"width"]=m(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=m(e.thickness)),t}))
return Et((()=>{const a=t.createVNode("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},n.value,r.value,e.class],style:[s.value,i.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":l.role&&"separator"!==l.role?void 0:e.vertical?"vertical":"horizontal",role:`${l.role||"separator"}`},null)
return o.default?t.createVNode("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[a,t.createVNode("div",{class:"v-divider__content"},[o.default()]),a]):a})),{}}}),yr=ht({items:Array,returnObject:Boolean},"VListChildren"),br=Ct()({name:"VListChildren",props:yr(),setup(e,a){let{slots:l}=a
return Un(),()=>l.default?.()??e.items?.map((a=>{let{children:o,props:n,type:r,raw:i}=a
if("divider"===r)return l.divider?.({props:n})??t.createVNode(hr,n,null)
if("subheader"===r)return l.subheader?.({props:n})??t.createVNode(mr,n,null)
const s={subtitle:l.subtitle?e=>l.subtitle?.({...e,item:i}):void 0,prepend:l.prepend?e=>l.prepend?.({...e,item:i}):void 0,append:l.append?e=>l.append?.({...e,item:i}):void 0,title:l.title?e=>l.title?.({...e,item:i}):void 0},u=sr.filterProps(n)
return o?t.createVNode(sr,t.mergeProps({value:n?.value},u),{activator:a=>{let{props:o}=a
const r={...n,...o,value:e.returnObject?i:n.value}
return l.header?l.header({props:r}):t.createVNode(pr,r,s)},default:()=>t.createVNode(br,{items:o,returnObject:e.returnObject},l)}):l.item?l.item({props:n}):t.createVNode(pr,t.mergeProps(n,{value:e.returnObject?i:n.value}),s)}))}}),Vr=ht({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean,valueComparator:Function},"list-items")
function wr(e,t){const a=p(t,e.itemTitle,t),l=p(t,e.itemValue,a),o=p(t,e.itemChildren),n={title:a,value:l,...!0===e.itemProps?"object"!=typeof t||null==t||Array.isArray(t)?void 0:"children"in t?N(t,["children"]):t:p(t,e.itemProps)}
return{title:String(n.title??""),value:n.value,props:n,children:Array.isArray(o)?Sr(e,o):void 0,raw:t}}function Sr(e,t){const a=k(e,["itemTitle","itemValue","itemChildren","itemProps","returnObject","valueComparator"]),l=[]
for(const e of t)l.push(wr(a,e))
return l}function kr(e){const a=t.computed((()=>Sr(e,e.items))),l=t.computed((()=>a.value.some((e=>null===e.value)))),o=t.shallowRef(new Map),n=t.shallowRef([])
return t.watchEffect((()=>{const e=a.value,t=new Map,l=[]
for(let a=0;a<e.length;a++){const o=e[a]
if(ne(o.value)||null===o.value){let e=t.get(o.value)
e||(e=[],t.set(o.value,e)),e.push(o)}else l.push(o)}o.value=t,n.value=l})),{items:a,transformIn:function(t){const r=o.value,i=a.value,s=n.value,u=l.value,c=e.returnObject,v=!!e.valueComparator,p=e.valueComparator||d,f=k(e,["itemTitle","itemValue","itemChildren","itemProps","returnObject","valueComparator"]),m=[]
e:for(const e of t){if(!u&&null===e)continue
if(c&&"string"==typeof e){m.push(wr(f,e))
continue}const t=r.get(e)
if(!v&&t)m.push(...t)
else{for(const t of v?i:s)if(p(e,t.value)){m.push(t)
continue e}m.push(wr(f,e))}}return m},transformOut:function(t){return e.returnObject?t.map((e=>{let{raw:t}=e
return t})):t.map((e=>{let{value:t}=e
return t}))}}}function xr(e,t){const a=p(t,e.itemType,"item"),l=ne(t)?t:p(t,e.itemTitle),o=p(t,e.itemValue,void 0),n=p(t,e.itemChildren),r={title:l,value:o,...!0===e.itemProps?N(t,["children"]):p(t,e.itemProps)}
return{type:a,title:r.title,value:r.value,props:r,children:"item"===a&&n?Nr(e,n):void 0,raw:t}}function Nr(e,t){const a=[]
for(const l of t)a.push(xr(e,l))
return a}const Cr=ht({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,expandIcon:Ft,collapseIcon:Ft,lines:{type:[Boolean,String],default:"one"},slim:Boolean,nav:Boolean,"onClick:open":G(),"onClick:select":G(),"onUpdate:opened":G(),...lr({selectStrategy:"single-leaf",openStrategy:"list"}),...Vl(),...yt(),...Al(),...nl(),...Sl(),itemType:{type:String,default:"type"},...Vr(),...vl(),...Ba(),...ba(),...Fl({variant:"text"})},"VList"),Ir=Ct()({name:"VList",props:Cr(),emits:{"update:selected":e=>!0,"update:activated":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:activate":e=>!0,"click:select":e=>!0},setup(e,a){let{slots:l}=a
const{items:o}=function(e){return{items:t.computed((()=>Nr(e,e.items)))}}(e),{themeClasses:n}=Ca(e),{backgroundColorClasses:r,backgroundColorStyles:i}=dl((()=>e.bgColor)),{borderClasses:s}=wl(e),{densityClasses:u}=Tl(e),{dimensionStyles:c}=rl(e),{elevationClasses:d}=kl(e),{roundedClasses:v}=pl(e),{children:p,open:f,parents:m,select:g,getPath:h}=or(e),y=t.toRef((()=>e.lines?`v-list--${e.lines}-line`:void 0)),b=t.toRef((()=>e.activeColor)),V=t.toRef((()=>e.baseColor)),w=t.toRef((()=>e.color))
Un(),kt({VListGroup:{activeColor:b,baseColor:V,color:w,expandIcon:t.toRef((()=>e.expandIcon)),collapseIcon:t.toRef((()=>e.collapseIcon))},VListItem:{activeClass:t.toRef((()=>e.activeClass)),activeColor:b,baseColor:V,color:w,density:t.toRef((()=>e.density)),disabled:t.toRef((()=>e.disabled)),lines:t.toRef((()=>e.lines)),nav:t.toRef((()=>e.nav)),slim:t.toRef((()=>e.slim)),variant:t.toRef((()=>e.variant))}})
const S=t.shallowRef(!1),k=t.ref()
function x(e){S.value=!0}function N(e){S.value=!1}function C(e){S.value||e.relatedTarget&&k.value?.contains(e.relatedTarget)||P()}function I(e){const t=e.target
if(k.value&&!["INPUT","TEXTAREA"].includes(t.tagName)){if("ArrowDown"===e.key)P("next")
else if("ArrowUp"===e.key)P("prev")
else if("Home"===e.key)P("first")
else{if("End"!==e.key)return
P("last")}e.preventDefault()}}function _(e){S.value=!0}function P(e){if(k.value)return Q(k.value,e)}return Et((()=>t.createVNode(e.tag,{ref:k,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav,"v-list--slim":e.slim},n.value,r.value,s.value,u.value,d.value,y.value,v.value,e.class],style:[i.value,c.value,e.style],tabindex:e.disabled?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:x,onFocusout:N,onFocus:C,onKeydown:I,onMousedown:_},{default:()=>[t.createVNode(br,{items:o.value,returnObject:e.returnObject},l)]}))),{open:f,select:g,focus:P,children:p,parents:m,getPath:h}}}),_r=It("v-list-img"),Pr=ht({start:Boolean,end:Boolean,...yt(),...Ba()},"VListItemAction"),Br=Ct()({name:"VListItemAction",props:Pr(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},l))),{}}}),Rr=ht({start:Boolean,end:Boolean,...yt(),...Ba()},"VListItemMedia"),Ar=Ct()({name:"VListItemMedia",props:Rr(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode(e.tag,{class:["v-list-item-media",{"v-list-item-media--start":e.start,"v-list-item-media--end":e.end},e.class],style:e.style},l))),{}}})
function Tr(e,t){return{x:e.x+t.x,y:e.y+t.y}}function Dr(e,t){if("top"===e.side||"bottom"===e.side){const{side:a,align:l}=e
return Tr({x:"left"===l?0:"center"===l?t.width/2:"right"===l?t.width:l,y:"top"===a?0:"bottom"===a?t.height:a},t)}if("left"===e.side||"right"===e.side){const{side:a,align:l}=e
return Tr({x:"left"===a?0:"right"===a?t.width:a,y:"top"===l?0:"center"===l?t.height/2:"bottom"===l?t.height:l},t)}return Tr({x:t.width/2,y:t.height/2},t)}const Er={static:function(){},connected:function(e,a,l){(Array.isArray(e.target.value)||function(e){for(;e;){if("fixed"===window.getComputedStyle(e).position)return!0
e=e.offsetParent}return!1}(e.target.value))&&Object.assign(l.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0})
const{preferredAnchor:o,preferredOrigin:n}=W((()=>{const t=se(a.location,e.isRtl.value),l="overlap"===a.origin?t:"auto"===a.origin?ce(t):se(a.origin,e.isRtl.value)
return t.side===l.side&&t.align===de(l).align?{preferredAnchor:ve(t),preferredOrigin:ve(l)}:{preferredAnchor:t,preferredOrigin:l}})),[r,i,s,u]=["minWidth","minHeight","maxWidth","maxHeight"].map((e=>t.computed((()=>{const t=parseFloat(a[e])
return isNaN(t)?1/0:t})))),c=t.computed((()=>{if(Array.isArray(a.offset))return a.offset
if("string"==typeof a.offset){const e=a.offset.split(" ").map(parseFloat)
return e.length<2&&e.push(0),e}return"number"==typeof a.offset?[a.offset,0]:[0,0]}))
let v=!1,p=-1
const f=new H(4),g=new ResizeObserver((()=>{if(!v)return
if(requestAnimationFrame((e=>{e!==p&&f.clear(),requestAnimationFrame((e=>{p=e}))})),f.isFull){const e=f.values()
if(d(e.at(-1),e.at(-3)))return}const e=y()
e&&f.push(e.flipped)}))
t.watch([e.target,e.contentEl],((e,t)=>{let[a,l]=e,[o,n]=t
o&&!Array.isArray(o)&&g.unobserve(o),a&&!Array.isArray(a)&&g.observe(a),n&&g.unobserve(n),l&&g.observe(l)}),{immediate:!0}),t.onScopeDispose((()=>{g.disconnect()}))
let h=new fe({x:0,y:0,width:0,height:0})
function y(){if(v=!1,requestAnimationFrame((()=>v=!0)),!e.target.value||!e.contentEl.value)return;(Array.isArray(e.target.value)||e.target.value.offsetParent)&&(h=ge(e.target.value))
const t=function(e,t){const a=he(e)
t?a.x+=parseFloat(e.style.right||0):a.x-=parseFloat(e.style.left||0)
return a.y-=parseFloat(e.style.top||0),a}(e.contentEl.value,e.isRtl.value),a=At(e.contentEl.value)
a.length||(a.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(t.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),t.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)))
const d=a.reduce(((e,t)=>{const a=t.getBoundingClientRect(),l=new fe({x:t===document.documentElement?0:a.x,y:t===document.documentElement?0:a.y,width:t.clientWidth,height:t.clientHeight})
return e?new fe({x:Math.max(e.left,l.left),y:Math.max(e.top,l.top),width:Math.min(e.right,l.right)-Math.max(e.left,l.left),height:Math.min(e.bottom,l.bottom)-Math.max(e.top,l.top)}):l}),void 0)
d.x+=12,d.y+=12,d.width-=24,d.height-=24
let p={anchor:o.value,origin:n.value}
function f(e){const a=new fe(t),l=Dr(e.anchor,h),o=Dr(e.origin,a)
let{x:n,y:r}=(v=o,{x:(i=l).x-v.x,y:i.y-v.y})
var i,v
switch(e.anchor.side){case"top":r-=c.value[0]
break
case"bottom":r+=c.value[0]
break
case"left":n-=c.value[0]
break
case"right":n+=c.value[0]}switch(e.anchor.align){case"top":r-=c.value[1]
break
case"bottom":r+=c.value[1]
break
case"left":n-=c.value[1]
break
case"right":n+=c.value[1]}a.x+=n,a.y+=r,a.width=Math.min(a.width,s.value),a.height=Math.min(a.height,u.value)
return{overflows:me(a,d),x:n,y:r}}let g=0,y=0
const b={x:0,y:0},V={x:!1,y:!1}
let w=-1
for(;;){if(w++>10){Oe("Infinite loop detected in connectedLocationStrategy")
break}const{x:e,y:a,overflows:l}=f(p)
g+=e,y+=a,t.x+=e,t.y+=a
{const e=pe(p.anchor),t=l.x.before||l.x.after,a=l.y.before||l.y.after
let o=!1
if(["x","y"].forEach((n=>{if("x"===n&&t&&!V.x||"y"===n&&a&&!V.y){const t={anchor:{...p.anchor},origin:{...p.origin}},a="x"===n?"y"===e?de:ce:"y"===e?ce:de
t.anchor=a(t.anchor),t.origin=a(t.origin)
const{overflows:r}=f(t);(r[n].before<=l[n].before&&r[n].after<=l[n].after||r[n].before+r[n].after<(l[n].before+l[n].after)/2)&&(p=t,o=V[n]=!0)}})),o)continue}l.x.before&&(g+=l.x.before,t.x+=l.x.before),l.x.after&&(g-=l.x.after,t.x-=l.x.after),l.y.before&&(y+=l.y.before,t.y+=l.y.before),l.y.after&&(y-=l.y.after,t.y-=l.y.after)
{const e=me(t,d)
b.x=d.width-e.x.before-e.x.after,b.y=d.height-e.y.before-e.y.after,g+=e.x.before,t.x+=e.x.before,y+=e.y.before,t.y+=e.y.before}break}const S=pe(p.anchor)
return Object.assign(l.value,{"--v-overlay-anchor-origin":`${p.anchor.side} ${p.anchor.align}`,transformOrigin:`${p.origin.side} ${p.origin.align}`,top:m($r(y)),left:e.isRtl.value?void 0:m($r(g)),right:e.isRtl.value?m($r(-g)):void 0,minWidth:m("y"===S?Math.min(r.value,h.width):r.value),maxWidth:m(Mr(A(b.x,r.value===1/0?0:r.value,s.value))),maxHeight:m(Mr(A(b.y,i.value===1/0?0:i.value,u.value)))}),{available:b,contentBox:t,flipped:V}}return t.watch((()=>[o.value,n.value,a.offset,a.minWidth,a.minHeight,a.maxWidth,a.maxHeight]),(()=>y())),t.nextTick((()=>{const e=y()
if(!e)return
const{available:t,contentBox:a}=e
a.height>t.y&&requestAnimationFrame((()=>{y(),requestAnimationFrame((()=>{y()}))}))})),{updateLocation:y}}},Fr=ht({locationStrategy:{type:[String,Function],default:"static",validator:e=>"function"==typeof e||e in Er},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies")
function $r(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Mr(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let Or=!0
const Lr=[]
let zr=-1
function jr(){cancelAnimationFrame(zr),zr=requestAnimationFrame((()=>{const e=Lr.shift()
e&&e(),Lr.length?jr():Or=!0}))}const Hr={none:null,close:function(e){Ur(e.targetEl.value??e.contentEl.value,(function(t){e.isActive.value=!1}))},block:function(e,a){const l=e.root.value?.offsetParent,o=[...new Set([...At(e.targetEl.value,a.contained?l:void 0),...At(e.contentEl.value,a.contained?l:void 0)])].filter((e=>!e.classList.contains("v-overlay-scroll-blocked"))),n=window.innerWidth-document.documentElement.offsetWidth,r=(i=l||document.documentElement,Tt(i)&&i)
var i
r&&e.root.value.classList.add("v-overlay--scroll-blocked")
o.forEach(((e,t)=>{e.style.setProperty("--v-body-scroll-x",m(-e.scrollLeft)),e.style.setProperty("--v-body-scroll-y",m(-e.scrollTop)),e!==document.documentElement&&e.style.setProperty("--v-scrollbar-offset",m(n)),e.classList.add("v-overlay-scroll-blocked")})),t.onScopeDispose((()=>{o.forEach(((e,t)=>{const a=parseFloat(e.style.getPropertyValue("--v-body-scroll-x")),l=parseFloat(e.style.getPropertyValue("--v-body-scroll-y")),o=e.style.scrollBehavior
e.style.scrollBehavior="auto",e.style.removeProperty("--v-body-scroll-x"),e.style.removeProperty("--v-body-scroll-y"),e.style.removeProperty("--v-scrollbar-offset"),e.classList.remove("v-overlay-scroll-blocked"),e.scrollLeft=-a,e.scrollTop=-l,e.style.scrollBehavior=o})),r&&e.root.value.classList.remove("v-overlay--scroll-blocked")}))},reposition:function(e,a,l){let o=!1,n=-1,r=-1
function i(t){var a
a=()=>{const a=performance.now()
e.updateLocation.value?.(t)
const l=performance.now()-a
o=l/(1e3/60)>2},!Or||Lr.length?(Lr.push(a),jr()):(Or=!1,a(),jr())}r=("undefined"==typeof requestIdleCallback?e=>e():requestIdleCallback)((()=>{l.run((()=>{Ur(e.targetEl.value??e.contentEl.value,(e=>{o?(cancelAnimationFrame(n),n=requestAnimationFrame((()=>{n=requestAnimationFrame((()=>{i(e)}))}))):i(e)}))}))})),t.onScopeDispose((()=>{"undefined"!=typeof cancelIdleCallback&&cancelIdleCallback(r),cancelAnimationFrame(n)}))}},Wr=ht({scrollStrategy:{type:[String,Function],default:"block",validator:e=>"function"==typeof e||e in Hr}},"VOverlay-scroll-strategies")
function Ur(e,a){const l=[document,...At(e)]
l.forEach((e=>{e.addEventListener("scroll",a,{passive:!0})})),t.onScopeDispose((()=>{l.forEach((e=>{e.removeEventListener("scroll",a)}))}))}const Yr=Symbol.for("vuetify:v-menu"),Gr=ht({closeDelay:[Number,String],openDelay:[Number,String]},"delay")
function qr(e,t){let l=()=>{}
function o(o){l?.()
const n=Number(o?e.openDelay:e.closeDelay)
return new Promise((e=>{l=function(e,t){if(!a||0===e)return t(),()=>{}
const l=window.setTimeout(t,e)
return()=>window.clearTimeout(l)}(n,(()=>{t?.(o),e(o)}))}))}return{clearDelay:l,runOpenDelay:function(){return o(!0)},runCloseDelay:function(){return o(!1)}}}const Kr=ht({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...Gr()},"VOverlay-activator")
function Xr(e,l){let{isActive:o,isTop:n,contentEl:r}=l
const i=bt("useActivator"),s=t.ref()
let u=!1,c=!1,d=!0
const v=t.computed((()=>e.openOnFocus||null==e.openOnFocus&&e.openOnHover)),p=t.computed((()=>e.openOnClick||null==e.openOnClick&&!e.openOnHover&&!v.value)),{runOpenDelay:f,runCloseDelay:m}=qr(e,(t=>{t!==(e.openOnHover&&u||v.value&&c)||e.openOnHover&&o.value&&!n.value||(o.value!==t&&(d=!0),o.value=t)})),g=t.ref(),h=e=>{e.stopPropagation(),s.value=e.currentTarget||e.target,o.value||(g.value=[e.clientX,e.clientY]),o.value=!o.value},y=e=>{e.sourceCapabilities?.firesTouchEvents||(u=!0,s.value=e.currentTarget||e.target,f())},b=e=>{u=!1,m()},V=e=>{!1!==te(e.target,":focus-visible")&&(c=!0,e.stopPropagation(),s.value=e.currentTarget||e.target,f())},w=e=>{c=!1,e.stopPropagation(),m()},S=t.computed((()=>{const t={}
return p.value&&(t.onClick=h),e.openOnHover&&(t.onMouseenter=y,t.onMouseleave=b),v.value&&(t.onFocus=V,t.onBlur=w),t})),k=t.computed((()=>{const a={}
if(e.openOnHover&&(a.onMouseenter=()=>{u=!0,f()},a.onMouseleave=()=>{u=!1,m()}),v.value&&(a.onFocusin=()=>{c=!0,f()},a.onFocusout=()=>{c=!1,m()}),e.closeOnContentClick){const e=t.inject(Yr,null)
a.onClick=()=>{o.value=!1,e?.closeParents()}}return a})),x=t.computed((()=>{const t={}
return e.openOnHover&&(t.onMouseenter=()=>{d&&(u=!0,d=!1,f())},t.onMouseleave=()=>{u=!1,m()}),t}))
t.watch(n,(t=>{!t||(!e.openOnHover||u||v.value&&c)&&(!v.value||c||e.openOnHover&&u)||r.value?.contains(document.activeElement)||(o.value=!1)})),t.watch(o,(e=>{e||setTimeout((()=>{g.value=void 0}))}),{flush:"post"})
const N=le()
t.watchEffect((()=>{N.value&&t.nextTick((()=>{s.value=N.el}))}))
const C=le(),_=t.computed((()=>"cursor"===e.target&&g.value?g.value:C.value?C.el:Zr(e.target,i)||s.value)),P=t.computed((()=>Array.isArray(_.value)?void 0:_.value))
let B
return t.watch((()=>!!e.activator),(l=>{l&&a?(B=t.effectScope(),B.run((()=>{!function(e,a,l){let{activatorEl:o,activatorEvents:n}=l
function r(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s(),l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.activatorProps
a&&function(e,t){Object.keys(t).forEach((a=>{if(I(a)){const l=Y(a),o=be.get(e)
if(null==t[a])o?.forEach((t=>{const[a,n]=t
a===l&&(e.removeEventListener(l,n),o.delete(t))}))
else if(!o||![...o]?.some((e=>e[0]===l&&e[1]===t[a]))){e.addEventListener(l,t[a])
const n=o||new Set
n.add([l,t[a]]),be.has(e)||be.set(e,n)}}else null==t[a]?e.removeAttribute(a):e.setAttribute(a,t[a])}))}(a,t.mergeProps(n.value,l))}function i(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s(),l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.activatorProps
a&&function(e,t){Object.keys(t).forEach((t=>{if(I(t)){const a=Y(t),l=be.get(e)
l?.forEach((t=>{const[o,n]=t
o===a&&(e.removeEventListener(a,n),l.delete(t))}))}else e.removeAttribute(t)}))}(a,t.mergeProps(n.value,l))}function s(){const t=Zr(arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.activator,a)
return o.value=t?.nodeType===Node.ELEMENT_NODE?t:void 0,o.value}t.watch((()=>e.activator),((e,a)=>{if(a&&e!==a){const e=s(a)
e&&i(e)}e&&t.nextTick((()=>r()))}),{immediate:!0}),t.watch((()=>e.activatorProps),(()=>{r()})),t.onScopeDispose((()=>{i()}))}(e,i,{activatorEl:s,activatorEvents:S})}))):B&&B.stop()}),{flush:"post",immediate:!0}),t.onScopeDispose((()=>{B?.stop()})),{activatorEl:s,activatorRef:N,target:_,targetEl:P,targetRef:C,activatorEvents:S,contentEvents:k,scrimEvents:x}}function Zr(e,t){if(!e)return
let a
if("parent"===e){let e=t?.proxy?.$el?.parentNode
for(;e?.hasAttribute("data-no-activator");)e=e.parentNode
a=e}else a="string"==typeof e?document.querySelector(e):"$el"in e?e.$el:e
return a}function Qr(){if(!a)return t.shallowRef(!1)
const{ssr:e}=Cn()
if(e){const e=t.shallowRef(!1)
return t.onMounted((()=>{e.value=!0})),e}return t.shallowRef(!0)}const Jr=ht({eager:Boolean},"lazy")
function ei(e,a){const l=t.shallowRef(!1),o=t.toRef((()=>l.value||e.eager||a.value))
return t.watch(a,(()=>l.value=!0)),{isBooted:l,hasContent:o,onAfterLeave:function(){e.eager||(l.value=!1)}}}function ti(){const e=bt("useScopeId").vnode.scopeId
return{scopeId:e?{[e]:""}:void 0}}const ai=Symbol.for("vuetify:stack"),li=t.reactive([])
function oi(){return!0}function ni(e,t,a){if(!e||!1===ri(e,a))return!1
const l=_t(t)
if("undefined"!=typeof ShadowRoot&&l instanceof ShadowRoot&&l.host===e.target)return!1
const o=("object"==typeof a.value&&a.value.include||(()=>[]))()
return o.push(t),!o.some((t=>t?.contains(e.target)))}function ri(e,t){return("object"==typeof t.value&&t.value.closeConditional||oi)(e)}function ii(e,t){const a=_t(e)
t(document),"undefined"!=typeof ShadowRoot&&a instanceof ShadowRoot&&t(a)}const si={mounted(e,t){const a=a=>function(e,t,a){const l="function"==typeof a.value?a.value:a.value.handler
e.shadowTarget=e.target,t._clickOutside.lastMousedownWasOutside&&ni(e,t,a)&&setTimeout((()=>{ri(e,a)&&l&&l(e)}),0)}(a,e,t),l=a=>{e._clickOutside.lastMousedownWasOutside=ni(a,e,t)}
ii(e,(e=>{e.addEventListener("click",a,!0),e.addEventListener("mousedown",l,!0)})),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[t.instance.$.uid]={onClick:a,onMousedown:l}},beforeUnmount(e,t){e._clickOutside&&(ii(e,(a=>{if(!a||!e._clickOutside?.[t.instance.$.uid])return
const{onClick:l,onMousedown:o}=e._clickOutside[t.instance.$.uid]
a.removeEventListener("click",l,!0),a.removeEventListener("mousedown",o,!0)})),delete e._clickOutside[t.instance.$.uid])}}
function ui(e){const{modelValue:a,color:l,...o}=e
return t.createVNode(t.Transition,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&t.createVNode("div",t.mergeProps({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const ci=ht({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,opacity:[Number,String],noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Kr(),...yt(),...nl(),...Jr(),...Fr(),...Wr(),...ba(),...fl()},"VOverlay"),di=Ct()({name:"VOverlay",directives:{ClickOutside:si},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...ci()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,keydown:e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,l){let{slots:o,attrs:n,emit:r}=l
const i=bt("VOverlay"),s=t.ref(),u=t.ref(),c=t.ref(),d=na(e,"modelValue"),v=t.computed({get:()=>d.value,set:t=>{t&&e.disabled||(d.value=t)}}),{themeClasses:p}=Ca(e),{rtlClasses:f,isRtl:g}=ha(),{hasContent:h,onAfterLeave:y}=ei(e,v),b=dl((()=>"string"==typeof e.scrim?e.scrim:null)),{globalTop:V,localTop:w,stackStyles:S}=function(e,a,l){const o=bt("useStack"),n=!l,r=t.inject(ai,void 0),i=t.reactive({activeChildren:new Set})
t.provide(ai,i)
const s=t.shallowRef(Number(t.toValue(a)))
oa(e,(()=>{const e=li.at(-1)?.[1]
s.value=e?e+10:Number(t.toValue(a)),n&&li.push([o.uid,s.value]),r?.activeChildren.add(o.uid),t.onScopeDispose((()=>{if(n){const e=t.toRaw(li).findIndex((e=>e[0]===o.uid))
li.splice(e,1)}r?.activeChildren.delete(o.uid)}))}))
const u=t.shallowRef(!0)
n&&t.watchEffect((()=>{const e=li.at(-1)?.[0]===o.uid
setTimeout((()=>u.value=e))}))
const c=t.toRef((()=>!i.activeChildren.size))
return{globalTop:t.readonly(u),localTop:c,stackStyles:t.toRef((()=>({zIndex:s.value})))}}(v,(()=>e.zIndex),e._disableGlobalStack),{activatorEl:k,activatorRef:x,target:N,targetEl:C,targetRef:I,activatorEvents:_,contentEvents:P,scrimEvents:B}=Xr(e,{isActive:v,isTop:w,contentEl:c}),{teleportTarget:R}=function(e){return{teleportTarget:t.computed((()=>{const l=e()
if(!0===l||!a)return
const o=!1===l?document.body:"string"==typeof l?document.querySelector(l):l
if(null==o)return void t.warn(`Unable to locate target ${l}`)
let n=[...o.children].find((e=>e.matches(".v-overlay-container")))
return n||(n=document.createElement("div"),n.className="v-overlay-container",o.appendChild(n)),n}))}}((()=>{const t=e.attach||e.contained
if(t)return t
const a=k?.value?.getRootNode()||i.proxy?.$el?.getRootNode()
return a instanceof ShadowRoot&&a})),{dimensionStyles:A}=rl(e),T=Qr(),{scopeId:D}=ti()
t.watch((()=>e.disabled),(e=>{e&&(v.value=!1)}))
const{contentStyles:E,updateLocation:F}=function(e,l){const o=t.ref({}),n=t.ref()
function r(e){n.value?.(e)}return a&&oa((()=>!(!l.isActive.value||!e.locationStrategy)),(a=>{t.watch((()=>e.locationStrategy),a),t.onScopeDispose((()=>{window.removeEventListener("resize",r),n.value=void 0})),window.addEventListener("resize",r,{passive:!0}),"function"==typeof e.locationStrategy?n.value=e.locationStrategy(l,e,o)?.updateLocation:n.value=Er[e.locationStrategy](l,e,o)?.updateLocation})),{contentStyles:o,updateLocation:n}}(e,{isRtl:g,contentEl:c,target:N,isActive:v})
function $(t){r("click:outside",t),e.persistent?H():v.value=!1}function M(t){return v.value&&V.value&&(!e.scrim||t.target===u.value||t instanceof MouseEvent&&t.shadowTarget===u.value)}function O(t){"Escape"===t.key&&V.value&&(c.value?.contains(document.activeElement)||r("keydown",t),e.persistent?H():(v.value=!1,c.value?.contains(document.activeElement)&&k.value?.focus()))}function L(e){("Escape"!==e.key||V.value)&&r("keydown",e)}!function(e,l){if(!a)return
let o
t.watchEffect((async()=>{o?.stop(),l.isActive.value&&e.scrollStrategy&&(o=t.effectScope(),await new Promise((e=>setTimeout(e))),o.active&&o.run((()=>{"function"==typeof e.scrollStrategy?e.scrollStrategy(l,e,o):Hr[e.scrollStrategy]?.(l,e,o)})))})),t.onScopeDispose((()=>{o?.stop()}))}(e,{root:s,contentEl:c,targetEl:C,isActive:v,updateLocation:F}),a&&t.watch(v,(e=>{e?window.addEventListener("keydown",O):window.removeEventListener("keydown",O)}),{immediate:!0}),t.onBeforeUnmount((()=>{a&&window.removeEventListener("keydown",O)}))
const z=fo()
oa((()=>e.closeOnBack),(()=>{!function(e,l){let o,n,r=!1
function i(e){e.state?.replaced||(r=!0,setTimeout((()=>r=!1)))}a&&e?.beforeEach&&(t.nextTick((()=>{window.addEventListener("popstate",i),o=e.beforeEach(((e,t,a)=>{ho?r?l(a):a():setTimeout((()=>r?l(a):a())),ho=!0})),n=e?.afterEach((()=>{ho=!1}))})),t.onScopeDispose((()=>{window.removeEventListener("popstate",i),o?.(),n?.()})))}(z,(t=>{V.value&&v.value?(t(!1),e.persistent?H():v.value=!1):t()}))}))
const j=t.ref()
function H(){e.noClickAnimation||c.value&&ye(c.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:Pt})}function W(){r("afterEnter")}function U(){y(),r("afterLeave")}return t.watch((()=>v.value&&(e.absolute||e.contained)&&null==R.value),(e=>{if(e){const e=Rt(s.value)
e&&e!==document.scrollingElement&&(j.value=e.scrollTop)}})),Et((()=>t.createVNode(t.Fragment,null,[o.activator?.({isActive:v.value,targetRef:I,props:t.mergeProps({ref:x},_.value,e.activatorProps)}),T.value&&h.value&&t.createVNode(t.Teleport,{disabled:!R.value,to:R.value},{default:()=>[t.createVNode("div",t.mergeProps({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":v.value,"v-overlay--contained":e.contained},p.value,f.value,e.class],style:[S.value,{"--v-overlay-opacity":e.opacity,top:m(j.value)},e.style],ref:s,onKeydown:L},D,n),[t.createVNode(ui,t.mergeProps({color:b,modelValue:v.value&&!!e.scrim,ref:u},B.value),null),t.createVNode(ml,{appear:!0,persisted:!0,transition:e.transition,target:N.value,onAfterEnter:W,onAfterLeave:U},{default:()=>[t.withDirectives(t.createVNode("div",t.mergeProps({ref:c,class:["v-overlay__content",e.contentClass],style:[A.value,E.value]},P.value,e.contentProps),[o.default?.({isActive:v})]),[[t.vShow,v.value],[t.resolveDirective("click-outside"),{handler:$,closeConditional:M,include:()=>[k.value]}]])]})])]})]))),{activatorEl:k,scrimEl:u,target:N,animateClick:H,contentEl:c,globalTop:V,localTop:w,updateLocation:F}}}),vi=Symbol("Forwarded refs")
function pi(e,t){let a=e
for(;a;){const e=Reflect.getOwnPropertyDescriptor(a,t)
if(e)return e
a=Object.getPrototypeOf(a)}}function fi(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),l=1;l<t;l++)a[l-1]=arguments[l]
return e[vi]=a,new Proxy(e,{get(e,t){if(Reflect.has(e,t))return Reflect.get(e,t)
if("symbol"!=typeof t&&!t.startsWith("$")&&!t.startsWith("__"))for(const e of a)if(e.value&&Reflect.has(e.value,t)){const a=Reflect.get(e.value,t)
return"function"==typeof a?a.bind(e.value):a}},has(e,t){if(Reflect.has(e,t))return!0
if("symbol"==typeof t||t.startsWith("$")||t.startsWith("__"))return!1
for(const e of a)if(e.value&&Reflect.has(e.value,t))return!0
return!1},set(e,t,l){if(Reflect.has(e,t))return Reflect.set(e,t,l)
if("symbol"==typeof t||t.startsWith("$")||t.startsWith("__"))return!1
for(const e of a)if(e.value&&Reflect.has(e.value,t))return Reflect.set(e.value,t,l)
return!1},getOwnPropertyDescriptor(e,t){const l=Reflect.getOwnPropertyDescriptor(e,t)
if(l)return l
if("symbol"!=typeof t&&!t.startsWith("$")&&!t.startsWith("__")){for(const e of a){if(!e.value)continue
const a=pi(e.value,t)??("_"in e.value?pi(e.value._?.setupState,t):void 0)
if(a)return a}for(const e of a){const a=e.value&&e.value[vi]
if(!a)continue
const l=a.slice()
for(;l.length;){const e=l.shift(),a=pi(e.value,t)
if(a)return a
const o=e.value&&e.value[vi]
o&&l.push(...o)}}}}})}const mi=ht({id:String,submenu:Boolean,...N(ci({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",location:void 0,openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:Oa}}),["absolute"])},"VMenu"),gi=Ct()({name:"VMenu",props:mi(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:o}=l
const n=na(e,"modelValue"),{scopeId:r}=ti(),{isRtl:i}=ha(),s=t.useId(),u=t.toRef((()=>e.id||`v-menu-${s}`)),c=t.ref(),d=t.inject(Yr,null),v=t.shallowRef(new Set)
async function p(e){const a=e.relatedTarget,l=e.target
if(await t.nextTick(),n.value&&a!==l&&c.value?.contentEl&&c.value?.globalTop&&![document,c.value.contentEl].includes(l)&&!c.value.contentEl.contains(l)){const e=X(c.value.contentEl)
e[0]?.focus()}}function f(e){d?.closeParents(e)}function m(t){if(!e.disabled)if("Tab"===t.key||"Enter"===t.key&&!e.closeOnContentClick){if("Enter"===t.key&&(t.target instanceof HTMLTextAreaElement||t.target instanceof HTMLInputElement&&t.target.closest("form")))return
"Enter"===t.key&&t.preventDefault()
Z(X(c.value?.contentEl,!1),t.shiftKey?"prev":"next",(e=>e.tabIndex>=0))||(n.value=!1,c.value?.activatorEl?.focus())}else e.submenu&&t.key===(i.value?"ArrowRight":"ArrowLeft")&&(n.value=!1,c.value?.activatorEl?.focus())}function g(t){if(e.disabled)return
const a=c.value?.contentEl
a&&n.value?"ArrowDown"===t.key?(t.preventDefault(),t.stopImmediatePropagation(),Q(a,"next")):"ArrowUp"===t.key?(t.preventDefault(),t.stopImmediatePropagation(),Q(a,"prev")):e.submenu&&(t.key===(i.value?"ArrowRight":"ArrowLeft")?n.value=!1:t.key===(i.value?"ArrowLeft":"ArrowRight")&&(t.preventDefault(),Q(a,"first"))):(e.submenu?t.key===(i.value?"ArrowLeft":"ArrowRight"):["ArrowDown","ArrowUp"].includes(t.key))&&(n.value=!0,t.preventDefault(),setTimeout((()=>setTimeout((()=>g(t))))))}t.provide(Yr,{register(){v.value.add(s)},unregister(){v.value.delete(s)},closeParents(t){setTimeout((()=>{v.value.size||e.persistent||null!=t&&(!c.value?.contentEl||function(e,t){const a=e.clientX,l=e.clientY,o=t.getBoundingClientRect(),n=o.left,r=o.top,i=o.right,s=o.bottom
return a>=n&&a<=i&&l>=r&&l<=s}(t,c.value.contentEl))||(n.value=!1,d?.closeParents())}),40)}}),t.onBeforeUnmount((()=>{d?.unregister(),document.removeEventListener("focusin",p)})),t.onDeactivated((()=>n.value=!1)),t.watch(n,(e=>{e?(d?.register(),a&&document.addEventListener("focusin",p,{once:!0})):(d?.unregister(),a&&document.removeEventListener("focusin",p))}),{immediate:!0})
const h=t.computed((()=>t.mergeProps({"aria-haspopup":"menu","aria-expanded":String(n.value),"aria-controls":u.value,onKeydown:g},e.activatorProps)))
return Et((()=>{const a=di.filterProps(e)
return t.createVNode(di,t.mergeProps({ref:c,id:u.value,class:["v-menu",e.class],style:e.style},a,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,absolute:!0,activatorProps:h.value,location:e.location??(e.submenu?"end":"bottom"),"onClick:outside":f,onKeydown:m},r),{activator:o.activator,default:function(){for(var e=arguments.length,a=new Array(e),l=0;l<e;l++)a[l]=arguments[l]
return t.createVNode(ol,{root:"VMenu"},{default:()=>[o.default?.(...a)]})}})})),fi({id:u,ΨopenChildren:v},c)}}),hi=ht({active:Boolean,disabled:Boolean,max:[Number,String],value:{type:[Number,String],default:0},...yt(),...fl({transition:{component:Ja}})},"VCounter"),yi=Ct()({name:"VCounter",functional:!0,props:hi(),setup(e,a){let{slots:l}=a
const o=t.toRef((()=>e.max?`${e.value} / ${e.max}`:String(e.value)))
return Et((()=>t.createVNode(ml,{transition:e.transition},{default:()=>[t.withDirectives(t.createVNode("div",{class:["v-counter",{"text-error":e.max&&!e.disabled&&parseFloat(e.value)>parseFloat(e.max)},e.class],style:e.style},[l.default?l.default({counter:o.value,max:e.max,value:e.value}):o.value]),[[t.vShow,e.active]])]}))),{}}}),bi=ht({floating:Boolean,...yt()},"VFieldLabel"),Vi=Ct()({name:"VFieldLabel",props:bi(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode(qo,{class:["v-field-label",{"v-field-label--floating":e.floating},e.class],style:e.style,"aria-hidden":e.floating||void 0},l))),{}}}),wi=["underlined","outlined","filled","solo","solo-inverted","solo-filled","plain"],Si=ht({appendInnerIcon:Ft,bgColor:String,clearable:Boolean,clearIcon:{type:Ft,default:"$clear"},active:Boolean,centerAffix:{type:Boolean,default:void 0},color:String,baseColor:String,dirty:Boolean,disabled:{type:Boolean,default:null},glow:Boolean,error:Boolean,flat:Boolean,iconColor:[Boolean,String],label:String,persistentClear:Boolean,prependInnerIcon:Ft,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:"filled",validator:e=>wi.includes(e)},"onClick:clear":G(),"onClick:appendInner":G(),"onClick:prependInner":G(),...yt(),...io(),...vl(),...ba()},"VField"),ki=Ct()({name:"VField",inheritAttrs:!1,props:{id:String,...rn(),...Si()},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{themeClasses:r}=Ca(e),{loaderClasses:i}=so(e),{focusClasses:s,isFocused:u,focus:c,blur:d}=sn(e),{InputIcon:v}=ln(e),{roundedClasses:p}=pl(e),{rtlClasses:f}=ha(),g=t.toRef((()=>e.dirty||e.active)),h=t.toRef((()=>!(!e.label&&!n.label))),y=t.toRef((()=>!e.singleLine&&h.value)),b=t.useId(),V=t.computed((()=>e.id||`input-${b}`)),w=t.toRef((()=>`${V.value}-messages`)),S=t.ref(),k=t.ref(),x=t.ref(),N=t.computed((()=>["plain","underlined"].includes(e.variant))),C=t.computed((()=>e.error||e.disabled?void 0:g.value&&u.value?e.color:e.baseColor)),I=t.computed((()=>{if(e.iconColor&&(!e.glow||u.value))return!0===e.iconColor?C.value:e.iconColor})),{backgroundColorClasses:_,backgroundColorStyles:P}=dl((()=>e.bgColor)),{textColorClasses:B,textColorStyles:R}=cl(C)
t.watch(g,(e=>{if(y.value){const t=S.value.$el,a=k.value.$el
requestAnimationFrame((()=>{const l=he(t),o=a.getBoundingClientRect(),n=o.x-l.x,r=o.y-l.y-(l.height/2-o.height/2),i=o.width/.75,s=Math.abs(i-l.width)>1?{maxWidth:m(i)}:void 0,u=getComputedStyle(t),c=getComputedStyle(a),d=1e3*parseFloat(u.transitionDuration)||150,v=parseFloat(c.getPropertyValue("--v-field-label-scale")),p=c.getPropertyValue("color")
t.style.visibility="visible",a.style.visibility="hidden",ye(t,{transform:`translate(${n}px, ${r}px) scale(${v})`,color:p,...s},{duration:d,easing:Pt,direction:e?"normal":"reverse"}).finished.then((()=>{t.style.removeProperty("visibility"),a.style.removeProperty("visibility")}))}))}}),{flush:"post"})
const A=t.computed((()=>({isActive:g,isFocused:u,controlRef:x,blur:d,focus:c})))
function T(e){e.target!==document.activeElement&&e.preventDefault()}return Et((()=>{const a="outlined"===e.variant,o=!(!n["prepend-inner"]&&!e.prependInnerIcon),u=!(!e.clearable&&!n.clear||e.disabled),m=!!(n["append-inner"]||e.appendInnerIcon||u),b=()=>n.label?n.label({...A.value,label:e.label,props:{for:V.value}}):e.label
return t.createVNode("div",t.mergeProps({class:["v-field",{"v-field--active":g.value,"v-field--appended":m,"v-field--center-affix":e.centerAffix??!N.value,"v-field--disabled":e.disabled,"v-field--dirty":e.dirty,"v-field--error":e.error,"v-field--glow":e.glow,"v-field--flat":e.flat,"v-field--has-background":!!e.bgColor,"v-field--persistent-clear":e.persistentClear,"v-field--prepended":o,"v-field--reverse":e.reverse,"v-field--single-line":e.singleLine,"v-field--no-label":!b(),[`v-field--variant-${e.variant}`]:!0},r.value,_.value,s.value,i.value,p.value,f.value,e.class],style:[P.value,e.style],onClick:T},l),[t.createVNode("div",{class:"v-field__overlay"},null),t.createVNode(uo,{name:"v-field",active:!!e.loading,color:e.error?"error":"string"==typeof e.loading?e.loading:e.color},{default:n.loader}),o&&t.createVNode("div",{key:"prepend",class:"v-field__prepend-inner"},[e.prependInnerIcon&&t.createVNode(v,{key:"prepend-icon",name:"prependInner",color:I.value},null),n["prepend-inner"]?.(A.value)]),t.createVNode("div",{class:"v-field__field","data-no-activator":""},[["filled","solo","solo-inverted","solo-filled"].includes(e.variant)&&y.value&&t.createVNode(Vi,{key:"floating-label",ref:k,class:[B.value],floating:!0,for:V.value,style:R.value},{default:()=>[b()]}),h.value&&t.createVNode(Vi,{key:"label",ref:S,for:V.value},{default:()=>[b()]}),n.default?.({...A.value,props:{id:V.value,class:"v-field__input","aria-describedby":w.value},focus:c,blur:d})??t.createVNode("div",{id:V.value,class:"v-field__input","aria-describedby":w.value},null)]),u&&t.createVNode(al,{key:"clear"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-field__clearable",onMousedown:e=>{e.preventDefault(),e.stopPropagation()}},[t.createVNode(ol,{defaults:{VIcon:{icon:e.clearIcon}}},{default:()=>[n.clear?n.clear({...A.value,props:{onFocus:c,onBlur:d,onClick:e["onClick:clear"]}}):t.createVNode(v,{name:"clear",onFocus:c,onBlur:d},null)]})]),[[t.vShow,e.dirty]])]}),m&&t.createVNode("div",{key:"append",class:"v-field__append-inner"},[n["append-inner"]?.(A.value),e.appendInnerIcon&&t.createVNode(v,{key:"append-icon",name:"appendInner",color:I.value},null)]),t.createVNode("div",{class:["v-field__outline",B.value],style:R.value},[a&&t.createVNode(t.Fragment,null,[t.createVNode("div",{class:"v-field__outline__start"},null),y.value&&t.createVNode("div",{class:"v-field__outline__notch"},[t.createVNode(Vi,{ref:k,floating:!0,for:V.value},{default:()=>[b()]})]),t.createVNode("div",{class:"v-field__outline__end"},null)]),N.value&&y.value&&t.createVNode(Vi,{ref:k,floating:!0,for:V.value},{default:()=>[b()]})])])})),{controlRef:x,fieldIconColor:I}}}),xi=["color","file","time","date","datetime-local","week","month"],Ni=ht({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:[Number,Function],prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,role:String,type:{type:String,default:"text"},modelModifiers:Object,...fn(),...Si()},"VTextField"),Ci=Ct()({name:"VTextField",directives:{Intersect:hl},inheritAttrs:!1,props:Ni(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const r=na(e,"modelValue"),{isFocused:i,focus:s,blur:u}=sn(e),c=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(r.value):"number"==typeof e.counterValue?e.counterValue:(r.value??"").toString().length)),d=t.computed((()=>l.maxlength?l.maxlength:!e.counter||"number"!=typeof e.counter&&"string"!=typeof e.counter?void 0:e.counter)),v=t.computed((()=>["plain","underlined"].includes(e.variant)))
function p(t,a){e.autofocus&&t&&a[0].target?.focus?.()}const f=t.ref(),m=t.ref(),g=t.ref(),h=t.computed((()=>xi.includes(e.type)||e.persistentPlaceholder||i.value||e.active))
function y(){g.value!==document.activeElement&&g.value?.focus(),i.value||s()}function b(e){o("mousedown:control",e),e.target!==g.value&&(y(),e.preventDefault())}function V(e){y(),o("click:control",e)}function w(a){a.stopPropagation(),y(),t.nextTick((()=>{r.value=null,K(e["onClick:clear"],a)}))}function S(a){const l=a.target
if(r.value=l.value,e.modelModifiers?.trim&&["text","search","password","tel","url"].includes(e.type)){const e=[l.selectionStart,l.selectionEnd]
t.nextTick((()=>{l.selectionStart=e[0],l.selectionEnd=e[1]}))}}return Et((()=>{const a=!!(n.counter||!1!==e.counter&&null!=e.counter),o=!(!a&&!n.details),[s,k]=B(l),{modelValue:x,...N}=mn.filterProps(e),C=ki.filterProps(e)
return t.createVNode(mn,t.mergeProps({ref:f,modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-input--plain-underlined":v.value},e.class],style:e.style},s,N,{centerAffix:!v.value,focused:i.value}),{...n,default:a=>{let{id:l,isDisabled:o,isDirty:s,isReadonly:c,isValid:d}=a
return t.createVNode(ki,t.mergeProps({ref:m,onMousedown:b,onClick:V,"onClick:clear":w,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:e.role},C,{id:l.value,active:h.value||s.value,dirty:s.value||e.dirty,disabled:o.value,focused:i.value,error:!1===d.value}),{...n,default:a=>{let{props:{class:l,...i}}=a
const s=t.withDirectives(t.createVNode("input",t.mergeProps({ref:g,value:r.value,onInput:S,autofocus:e.autofocus,readonly:c.value,disabled:o.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:y,onBlur:u},i,k),null),[[t.resolveDirective("intersect"),{handler:p},null,{once:!0}]])
return t.createVNode(t.Fragment,null,[e.prefix&&t.createVNode("span",{class:"v-text-field__prefix"},[t.createVNode("span",{class:"v-text-field__prefix__text"},[e.prefix])]),n.default?t.createVNode("div",{class:l,"data-no-activator":""},[n.default(),s]):t.cloneVNode(s,{class:l}),e.suffix&&t.createVNode("span",{class:"v-text-field__suffix"},[t.createVNode("span",{class:"v-text-field__suffix__text"},[e.suffix])])])}})},details:o?l=>t.createVNode(t.Fragment,null,[n.details?.(l),a&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(yi,{active:e.persistentCounter||i.value,value:c.value,max:d.value,disabled:e.disabled},n.counter)])]):void 0})})),fi({},f,m,g)}}),Ii=ht({renderless:Boolean,...yt()},"VVirtualScrollItem"),_i=Ct()({name:"VVirtualScrollItem",inheritAttrs:!1,props:Ii(),emits:{"update:height":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{resizeRef:r,contentRect:i}=Xt(void 0,"border")
t.watch((()=>i.value?.height),(e=>{null!=e&&o("update:height",e)})),Et((()=>e.renderless?t.createVNode(t.Fragment,null,[n.default?.({itemRef:r})]):t.createVNode("div",t.mergeProps({ref:r,class:["v-virtual-scroll__item",e.class],style:e.style},l),[n.default?.()])))}}),Pi=ht({itemHeight:{type:[Number,String],default:null},itemKey:{type:[String,Array,Function],default:null},height:[Number,String]},"virtual")
function Bi(e,l){const o=Cn(),n=t.shallowRef(0)
t.watchEffect((()=>{n.value=parseFloat(e.itemHeight||0)}))
const r=t.shallowRef(0),i=t.shallowRef(Math.ceil((parseInt(e.height)||o.height.value)/(n.value||16))||1),s=t.shallowRef(0),u=t.shallowRef(0),c=t.ref(),d=t.ref()
let v=0
const{resizeRef:f,contentRect:m}=Xt()
t.watchEffect((()=>{f.value=c.value}))
const g=t.computed((()=>c.value===document.documentElement?o.height.value:m.value?.height||parseInt(e.height)||0)),h=t.computed((()=>!!(c.value&&d.value&&g.value&&n.value)))
let y=Array.from({length:l.value.length}),b=Array.from({length:l.value.length})
const V=t.shallowRef(0)
let w=-1
function S(e){return y[e]||n.value}const k=function(e,a){let l=0
const o=function(){for(var o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r]
clearTimeout(l),l=setTimeout((()=>e(...n)),t.unref(a))}
return o.clear=()=>{clearTimeout(l)},o.immediate=e,o}((()=>{const e=performance.now()
b[0]=0
const t=l.value.length
for(let e=1;e<=t-1;e++)b[e]=(b[e-1]||0)+S(e-1)
V.value=Math.max(V.value,performance.now()-e)}),V),x=t.watch(h,(e=>{e&&(x(),v=d.value.offsetTop,k.immediate(),D(),~w&&t.nextTick((()=>{a&&window.requestAnimationFrame((()=>{F(w),w=-1}))})))}))
function N(e){return e=A(e,0,l.value.length-1),b[e]||0}function C(e){return function(e,t){let a=e.length-1,l=0,o=0,n=null,r=-1
if(e[a]<t)return a
for(;l<=a;)if(o=l+a>>1,n=e[o],n>t)a=o-1
else{if(!(n<t))return n===t?o:l
r=o,l=o+1}return r}(b,e)}t.onScopeDispose((()=>{k.clear()}))
let I=0,_=0,P=0
t.watch(g,((e,t)=>{t&&(D(),e<t&&requestAnimationFrame((()=>{_=0,D()})))}))
let B=-1
function R(){c.value&&d.value&&(_=0,P=0,window.clearTimeout(B),D())}let T=-1
function D(){cancelAnimationFrame(T),T=requestAnimationFrame(E)}function E(){if(!c.value||!g.value)return
const e=I-v,t=Math.sign(_),a=A(C(Math.max(0,e-100)),0,l.value.length),o=A(C(e+g.value+100)+1,a+1,l.value.length)
if((-1!==t||a<r.value)&&(1!==t||o>i.value)){const e=N(r.value)-N(a),t=N(o)-N(i.value)
Math.max(e,t)>100?(r.value=a,i.value=o):(a<=0&&(r.value=a),o>=l.value.length&&(i.value=o))}s.value=N(r.value),u.value=N(l.value.length)-N(i.value)}function F(e){const t=N(e)
!c.value||e&&!t?w=e:c.value.scrollTop=t}const $=t.computed((()=>l.value.slice(r.value,i.value).map(((t,a)=>{const l=a+r.value
return{raw:t,index:l,key:p(t,e.itemKey,l)}}))))
return t.watch(l,(()=>{y=Array.from({length:l.value.length}),b=Array.from({length:l.value.length}),k.immediate(),D()}),{deep:1}),{calculateVisibleItems:D,containerRef:c,markerRef:d,computedItems:$,paddingTop:s,paddingBottom:u,scrollToIndex:F,handleScroll:function(){if(!c.value||!d.value)return
const e=c.value.scrollTop,t=performance.now()
t-P>500?(_=Math.sign(e-I),v=d.value.offsetTop):_=e-I,I=e,P=t,window.clearTimeout(B),B=window.setTimeout(R,500),D()},handleScrollend:R,handleItemResize:function(e,t){const a=y[e],l=n.value
n.value=l?Math.min(n.value,t):t,a===t&&l===n.value||(y[e]=t,k())}}}const Ri=ht({items:{type:Array,default:()=>[]},renderless:Boolean,...Pi(),...yt(),...nl()},"VVirtualScroll"),Ai=Ct()({name:"VVirtualScroll",props:Ri(),setup(e,a){let{slots:l}=a
const o=bt("VVirtualScroll"),{dimensionStyles:n}=rl(e),{calculateVisibleItems:r,containerRef:i,markerRef:s,handleScroll:u,handleScrollend:c,handleItemResize:d,scrollToIndex:v,paddingTop:p,paddingBottom:f,computedItems:g}=Bi(e,t.toRef((()=>e.items)))
return oa((()=>e.renderless),(()=>{function e(){const e=arguments.length>0&&void 0!==arguments[0]&&arguments[0]?"addEventListener":"removeEventListener"
i.value===document.documentElement?(document[e]("scroll",u,{passive:!0}),document[e]("scrollend",c)):(i.value?.[e]("scroll",u,{passive:!0}),i.value?.[e]("scrollend",c))}t.onMounted((()=>{i.value=Rt(o.vnode.el,!0),e(!0)})),t.onScopeDispose(e)})),Et((()=>{const a=g.value.map((a=>t.createVNode(_i,{key:a.key,renderless:e.renderless,"onUpdate:height":e=>d(a.index,e)},{default:e=>l.default?.({item:a.raw,index:a.index,...e})})))
return e.renderless?t.createVNode(t.Fragment,null,[t.createVNode("div",{ref:s,class:"v-virtual-scroll__spacer",style:{paddingTop:m(p.value)}},null),a,t.createVNode("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:m(f.value)}},null)]):t.createVNode("div",{ref:i,class:["v-virtual-scroll",e.class],onScrollPassive:u,onScrollend:c,style:[n.value,e.style]},[t.createVNode("div",{ref:s,class:"v-virtual-scroll__container",style:{paddingTop:m(p.value),paddingBottom:m(f.value)}},[a])])})),{calculateVisibleItems:r,scrollToIndex:v}}})
function Ti(e,a){const l=t.shallowRef(!1)
let o
return{onScrollPassive:function(e){cancelAnimationFrame(o),l.value=!0,o=requestAnimationFrame((()=>{o=requestAnimationFrame((()=>{l.value=!1}))}))},onKeydown:async function(o){if("Tab"===o.key&&a.value?.focus(),!["PageDown","PageUp","Home","End"].includes(o.key))return
const n=e.value?.$el
if(!n)return
"Home"!==o.key&&"End"!==o.key||n.scrollTo({top:"Home"===o.key?0:n.scrollHeight,behavior:"smooth"}),await async function(){await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>{if(l.value){const a=t.watch(l,(()=>{a(),e()}))}else e()}))}()
const r=n.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)")
if("PageDown"===o.key||"Home"===o.key){const e=n.getBoundingClientRect().top
for(const t of r)if(t.getBoundingClientRect().top>=e){t.focus()
break}}else{const e=n.getBoundingClientRect().bottom
for(const t of[...r].reverse())if(t.getBoundingClientRect().bottom<=e){t.focus()
break}}}}}const Di=ht({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,listProps:{type:Object},menu:Boolean,menuIcon:{type:Ft,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...Vr({itemChildren:!1})},"Select"),Ei=ht({...Di(),...N(Ni({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...fl({transition:{component:Oa}})},"VSelect"),Fi=Ct()({name:"VSelect",props:Ei(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:o}=l
const{t:n}=ma(),r=t.ref(),i=t.ref(),s=t.ref(),{items:u,transformIn:c,transformOut:v}=kr(e),p=na(e,"modelValue",[],(e=>c(null===e?[null]:R(e))),(t=>{const a=v(t)
return e.multiple?a:a[0]??null})),f=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(p.value):"number"==typeof e.counterValue?e.counterValue:p.value.length)),m=dn(e),g=t.computed((()=>p.value.map((e=>e.value)))),h=t.shallowRef(!1)
let y,b=""
const V=t.computed((()=>e.hideSelected?u.value.filter((t=>!p.value.some((a=>(e.valueComparator||d)(a,t))))):u.value)),w=t.computed((()=>e.hideNoData&&!V.value.length||m.isReadonly.value||m.isDisabled.value)),S=na(e,"menu"),k=t.computed({get:()=>S.value,set:e=>{S.value&&!e&&i.value?.ΨopenChildren.size||e&&w.value||(S.value=e)}}),x=t.toRef((()=>k.value?e.closeText:e.openText)),N=t.computed((()=>({...e.menuProps,activatorProps:{...e.menuProps?.activatorProps||{},"aria-haspopup":"listbox"}}))),C=t.ref(),I=Ti(C,r)
function _(t){e.openOnClear&&(k.value=!0)}function P(){w.value||(k.value=!k.value)}function B(e){oe(e)&&A(e)}function A(e){if(!e.key||m.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(e.key)&&e.preventDefault(),["Enter","ArrowDown"," "].includes(e.key)&&(k.value=!0),["Escape","Tab"].includes(e.key)&&(k.value=!1),"Home"===e.key?C.value?.focus("first"):"End"===e.key&&C.value?.focus("last")
if(!oe(e))return
const t=performance.now()
t-y>1e3&&(b=""),b+=e.key.toLowerCase(),y=t
const l=u.value.find((e=>e.title.toLowerCase().startsWith(b)))
if(void 0!==l){p.value=[l]
const e=V.value.indexOf(l)
a&&window.requestAnimationFrame((()=>{e>=0&&s.value?.scrollToIndex(e)}))}}function T(a){let l=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
if(!a.props.disabled)if(e.multiple){const t=p.value.findIndex((t=>(e.valueComparator||d)(t.value,a.value))),o=null==l?!~t:l
if(~t){const e=o?[...p.value,a]:[...p.value]
e.splice(t,1),p.value=e}else o&&(p.value=[...p.value,a])}else{const e=!1!==l
p.value=e?[a]:[],t.nextTick((()=>{k.value=!1}))}}function D(e){C.value?.$el.contains(e.relatedTarget)||(k.value=!1)}function E(){e.eager&&s.value?.calculateVisibleItems()}function F(){h.value&&r.value?.focus()}function $(e){h.value=!0}function M(e){if(null==e)p.value=[]
else if(te(r.value,":autofill")||te(r.value,":-webkit-autofill")){const t=u.value.find((t=>t.title===e))
t&&T(t)}else r.value&&(r.value.value="")}return t.watch(k,(()=>{if(!e.hideSelected&&k.value&&p.value.length){const t=V.value.findIndex((t=>p.value.some((a=>(e.valueComparator||d)(a.value,t.value)))))
a&&window.requestAnimationFrame((()=>{t>=0&&s.value?.scrollToIndex(t)}))}})),t.watch((()=>e.items),((e,t)=>{k.value||h.value&&!t.length&&e.length&&(k.value=!0)})),Et((()=>{const a=!(!e.chips&&!o.chip),l=!!(!e.hideNoData||V.value.length||o["prepend-item"]||o["append-item"]||o["no-data"]),u=p.value.length>0,c=Ci.filterProps(e),d=u||!h.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder
return t.createVNode(Ci,t.mergeProps({ref:r},c,{modelValue:p.value.map((e=>e.props.value)).join(", "),"onUpdate:modelValue":M,focused:h.value,"onUpdate:focused":e=>h.value=e,validationValue:p.externalValue,counterValue:f.value,dirty:u,class:["v-select",{"v-select--active-menu":k.value,"v-select--chips":!!e.chips,["v-select--"+(e.multiple?"multiple":"single")]:!0,"v-select--selected":p.value.length,"v-select--selection-slot":!!o.selection},e.class],style:e.style,inputmode:"none",placeholder:d,"onClick:clear":_,"onMousedown:control":P,onBlur:D,onKeydown:A,"aria-label":n(x.value),title:n(x.value)}),{...o,default:()=>t.createVNode(t.Fragment,null,[t.createVNode(gi,t.mergeProps({ref:i,modelValue:k.value,"onUpdate:modelValue":e=>k.value=e,activator:"parent",contentClass:"v-select__content",disabled:w.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterEnter:E,onAfterLeave:F},N.value),{default:()=>[l&&t.createVNode(Ir,t.mergeProps({ref:C,selected:g.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onKeydown:B,onFocusin:$,tabindex:"-1","aria-live":"polite","aria-label":`${e.label}-list`,color:e.itemColor??e.color},I,e.listProps),{default:()=>[o["prepend-item"]?.(),!V.value.length&&!e.hideNoData&&(o["no-data"]?.()??t.createVNode(pr,{key:"no-data",title:n(e.noDataText)},null)),t.createVNode(Ai,{ref:s,renderless:!0,items:V.value,itemKey:"value"},{default:a=>{let{item:l,index:n,itemRef:r}=a
const i=t.mergeProps(l.props,{ref:r,key:l.value,onClick:()=>T(l,null)})
return o.item?.({item:l,index:n,props:i})??t.createVNode(pr,t.mergeProps(i,{role:"option"}),{prepend:a=>{let{isSelected:o}=a
return t.createVNode(t.Fragment,null,[e.multiple&&!e.hideSelected?t.createVNode(an,{key:l.value,modelValue:o,ripple:!1,tabindex:"-1"},null):void 0,l.props.prependAvatar&&t.createVNode(Yo,{image:l.props.prependAvatar},null),l.props.prependIcon&&t.createVNode(Ql,{icon:l.props.prependIcon},null)])}})}}),o["append-item"]?.()]})]}),p.value.map(((l,n)=>{function r(e){e.stopPropagation(),e.preventDefault(),T(l,!1)}const i={"onClick:close":r,onKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),r(e))},onMousedown(e){e.preventDefault(),e.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},s=a?!!o.chip:!!o.selection,u=s?ae(a?o.chip({item:l,index:n,props:i}):o.selection({item:l,index:n})):void 0
if(!s||u)return t.createVNode("div",{key:l.value,class:"v-select__selection"},[a?o.chip?t.createVNode(ol,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:l.title}}},{default:()=>[u]}):t.createVNode(Hn,t.mergeProps({key:"chip",closable:e.closableChips,size:"small",text:l.title,disabled:l.props.disabled},i),null):u??t.createVNode("span",{class:"v-select__selection-text"},[l.title,e.multiple&&n<p.value.length-1&&t.createVNode("span",{class:"v-select__selection-comma"},[t.createTextVNode(",")])])])}))]),"append-inner":function(){for(var a=arguments.length,l=new Array(a),n=0;n<a;n++)l[n]=arguments[n]
return t.createVNode(t.Fragment,null,[o["append-inner"]?.(...l),e.menuIcon?t.createVNode(Ql,{class:"v-select__menu-icon",color:r.value?.fieldIconColor,icon:e.menuIcon},null):void 0])}})})),fi({isFocused:h,menu:k,select:T},r)}}),$i=(e,t,a)=>{if(null==e||null==t)return-1
if(!t.length)return 0
e=e.toString().toLocaleLowerCase(),t=t.toString().toLocaleLowerCase()
const l=[]
let o=e.indexOf(t)
for(;~o;)l.push([o,o+t.length]),o=e.indexOf(t,o+t.length)
return l.length?l:-1}
function Mi(e,t){if(null!=e&&"boolean"!=typeof e&&-1!==e)return"number"==typeof e?[[e,e+t.length]]:Array.isArray(e[0])?e:[e]}const Oi=ht({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter")
function Li(e,a,l,o){const n=t.shallowRef([]),r=t.shallowRef(new Map),i=t.computed((()=>o?.transform?t.unref(a).map((e=>[e,o.transform(e)])):t.unref(a)))
return t.watchEffect((()=>{const s="function"==typeof l?l():t.unref(l),u="string"!=typeof s&&"number"!=typeof s?"":String(s),c=function(e,t,a){const l=[],o=a?.default??$i,n=!!a?.filterKeys&&R(a.filterKeys),r=Object.keys(a?.customKeyFilter??{}).length
if(!e?.length)return l
e:for(let i=0;i<e.length;i++){const[s,u=s]=R(e[i]),c={},d={}
let v=-1
if((t||r>0)&&!a?.noFilter){if("object"==typeof s){const e=n||Object.keys(u)
for(const l of e){const e=p(u,l),n=a?.customKeyFilter?.[l]
if(v=n?n(e,t,s):o(e,t,s),-1!==v&&!1!==v)n?c[l]=Mi(v,t):d[l]=Mi(v,t)
else if("every"===a?.filterMode)continue e}}else v=o(s,t,s),-1!==v&&!1!==v&&(d.title=Mi(v,t))
const e=Object.keys(d).length,l=Object.keys(c).length
if(!e&&!l)continue
if("union"===a?.filterMode&&l!==r&&!e)continue
if("intersection"===a?.filterMode&&(l!==r||!e))continue}l.push({index:i,matches:{...d,...c}})}return l}(i.value,u,{customKeyFilter:{...e.customKeyFilter,...t.unref(o?.customKeyFilter)},default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}),d=t.unref(a),v=[],f=new Map
c.forEach((e=>{let{index:t,matches:a}=e
const l=d[t]
v.push(l),f.set(l.value,a)})),n.value=v,r.value=f})),{filteredItems:n,filteredMatches:r,getMatches:function(e){return r.value.get(e.value)}}}function zi(e,a,l){return null!=l&&l.length?l.map(((o,n)=>{const r=0===n?0:l[n-1][1],i=[t.createVNode("span",{class:`${e}__unmask`},[a.slice(r,o[0])]),t.createVNode("span",{class:`${e}__mask`},[a.slice(o[0],o[1])])]
return n===l.length-1&&i.push(t.createVNode("span",{class:`${e}__unmask`},[a.slice(o[1])])),t.createVNode(t.Fragment,null,[i])})):a}const ji=ht({autoSelectFirst:{type:[Boolean,String]},clearOnSelect:Boolean,search:String,...Oi({filterKeys:["title"]}),...Di(),...N(Ni({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...fl({transition:!1})},"VAutocomplete"),Hi=Ct()({name:"VAutocomplete",props:ji(),emits:{"update:focused":e=>!0,"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:o}=l
const{t:n}=ma(),r=t.ref(),i=t.shallowRef(!1),s=t.shallowRef(!0),u=t.shallowRef(!1),c=t.ref(),v=t.ref(),p=t.shallowRef(-1),{items:f,transformIn:m,transformOut:g}=kr(e),{textColorClasses:h,textColorStyles:y}=cl((()=>r.value?.color)),b=na(e,"search",""),V=na(e,"modelValue",[],(e=>m(null===e?[null]:R(e))),(t=>{const a=g(t)
return e.multiple?a:a[0]??null})),w=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(V.value):"number"==typeof e.counterValue?e.counterValue:V.value.length)),S=dn(e),{filteredItems:k,getMatches:x}=Li(e,f,(()=>s.value?"":b.value)),N=t.computed((()=>e.hideSelected?k.value.filter((e=>!V.value.some((t=>t.value===e.value)))):k.value)),C=t.computed((()=>!(!e.chips&&!o.chip))),I=t.computed((()=>C.value||!!o.selection)),_=t.computed((()=>V.value.map((e=>e.props.value)))),P=t.computed((()=>(!0===e.autoSelectFirst||"exact"===e.autoSelectFirst&&b.value===N.value[0]?.title)&&N.value.length>0&&!s.value&&!u.value)),B=t.computed((()=>e.hideNoData&&!N.value.length||S.isReadonly.value||S.isDisabled.value)),A=na(e,"menu"),T=t.computed({get:()=>A.value,set:e=>{A.value&&!e&&c.value?.ΨopenChildren.size||e&&B.value||(A.value=e)}}),D=t.computed((()=>T.value?e.closeText:e.openText)),E=t.ref(),F=Ti(E,r)
function $(t){e.openOnClear&&(T.value=!0),b.value=""}function M(){B.value||(T.value=!0)}function O(e){B.value||(i.value&&(e.preventDefault(),e.stopPropagation()),T.value=!T.value)}function L(e){" "!==e.key&&oe(e)&&r.value?.focus()}function z(t){if(S.isReadonly.value)return
const a=r.value?.selectionStart,l=V.value.length
if(["Enter","ArrowDown","ArrowUp"].includes(t.key)&&t.preventDefault(),["Enter","ArrowDown"].includes(t.key)&&(T.value=!0),["Escape"].includes(t.key)&&(T.value=!1),P.value&&["Enter","Tab"].includes(t.key)&&!V.value.some((e=>{let{value:t}=e
return t===N.value[0].value}))&&K(N.value[0]),"ArrowDown"===t.key&&P.value&&E.value?.focus("next"),["Backspace","Delete"].includes(t.key)){if(!e.multiple&&I.value&&V.value.length>0&&!b.value)return K(V.value[0],!1)
if(~p.value){t.preventDefault()
const e=p.value
K(V.value[p.value],!1),p.value=e>=l-1?l-2:e}else"Backspace"!==t.key||b.value||(p.value=l-1)}else if(e.multiple)if("ArrowLeft"===t.key){if(p.value<0&&a&&a>0)return
const e=p.value>-1?p.value-1:l-1
if(V.value[e])p.value=e
else{const e=b.value?.length??null
p.value=-1,r.value?.setSelectionRange(e,e)}}else if("ArrowRight"===t.key){if(p.value<0)return
const e=p.value+1
V.value[e]?p.value=e:(p.value=-1,r.value?.setSelectionRange(0,0))}else~p.value&&oe(t)&&(p.value=-1)}function j(e){if(te(r.value,":autofill")||te(r.value,":-webkit-autofill")){const t=f.value.find((t=>t.title===e.target.value))
t&&K(t)}}function H(){e.eager&&v.value?.calculateVisibleItems()}function W(){i.value&&(s.value=!0,r.value?.focus())}function U(e){i.value=!0,setTimeout((()=>{u.value=!0}))}function Y(e){u.value=!1}function G(t){null!=t&&(""!==t||e.multiple||I.value)||(V.value=[])}const q=t.shallowRef(!1)
function K(a){let l=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
if(a&&!a.props.disabled)if(e.multiple){const t=V.value.findIndex((t=>(e.valueComparator||d)(t.value,a.value))),o=null==l?!~t:l
if(~t){const e=o?[...V.value,a]:[...V.value]
e.splice(t,1),V.value=e}else o&&(V.value=[...V.value,a])
e.clearOnSelect&&(b.value="")}else{const e=!1!==l
V.value=e?[a]:[],b.value=e&&!I.value?a.title:"",t.nextTick((()=>{T.value=!1,s.value=!0}))}}return t.watch(i,((a,l)=>{a!==l&&(a?(q.value=!0,b.value=e.multiple||I.value?"":String(V.value.at(-1)?.props.title??""),s.value=!0,t.nextTick((()=>q.value=!1))):(e.multiple||null!=b.value||(V.value=[]),T.value=!1,(e.multiple||I.value)&&(b.value=""),p.value=-1))})),t.watch(b,(e=>{i.value&&!q.value&&(e&&(T.value=!0),s.value=!e)})),t.watch(T,(()=>{if(!e.hideSelected&&T.value&&V.value.length){const e=N.value.findIndex((e=>V.value.some((t=>e.value===t.value))))
a&&window.requestAnimationFrame((()=>{e>=0&&v.value?.scrollToIndex(e)}))}})),t.watch((()=>e.items),((e,t)=>{T.value||i.value&&!t.length&&e.length&&(T.value=!0)})),Et((()=>{const a=!!(!e.hideNoData||N.value.length||o["prepend-item"]||o["append-item"]||o["no-data"]),l=V.value.length>0,u=Ci.filterProps(e)
return t.createVNode(Ci,t.mergeProps({ref:r},u,{modelValue:b.value,"onUpdate:modelValue":[e=>b.value=e,G],focused:i.value,"onUpdate:focused":e=>i.value=e,validationValue:V.externalValue,counterValue:w.value,dirty:l,onChange:j,class:["v-autocomplete","v-autocomplete--"+(e.multiple?"multiple":"single"),{"v-autocomplete--active-menu":T.value,"v-autocomplete--chips":!!e.chips,"v-autocomplete--selection-slot":!!I.value,"v-autocomplete--selecting-index":p.value>-1},e.class],style:e.style,readonly:S.isReadonly.value,placeholder:l?void 0:e.placeholder,"onClick:clear":$,"onMousedown:control":M,onKeydown:z}),{...o,default:()=>t.createVNode(t.Fragment,null,[t.createVNode(gi,t.mergeProps({ref:c,modelValue:T.value,"onUpdate:modelValue":e=>T.value=e,activator:"parent",contentClass:"v-autocomplete__content",disabled:B.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterEnter:H,onAfterLeave:W},e.menuProps),{default:()=>[a&&t.createVNode(Ir,t.mergeProps({ref:E,selected:_.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onKeydown:L,onFocusin:U,onFocusout:Y,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},F,e.listProps),{default:()=>[o["prepend-item"]?.(),!N.value.length&&!e.hideNoData&&(o["no-data"]?.()??t.createVNode(pr,{key:"no-data",title:n(e.noDataText)},null)),t.createVNode(Ai,{ref:v,renderless:!0,items:N.value,itemKey:"value"},{default:a=>{let{item:l,index:n,itemRef:r}=a
const i=t.mergeProps(l.props,{ref:r,key:l.value,active:!(!P.value||0!==n)||void 0,onClick:()=>K(l,null)})
return o.item?.({item:l,index:n,props:i})??t.createVNode(pr,t.mergeProps(i,{role:"option"}),{prepend:a=>{let{isSelected:o}=a
return t.createVNode(t.Fragment,null,[e.multiple&&!e.hideSelected?t.createVNode(an,{key:l.value,modelValue:o,ripple:!1,tabindex:"-1"},null):void 0,l.props.prependAvatar&&t.createVNode(Yo,{image:l.props.prependAvatar},null),l.props.prependIcon&&t.createVNode(Ql,{icon:l.props.prependIcon},null)])},title:()=>s.value?l.title:zi("v-autocomplete",l.title,x(l)?.title)})}}),o["append-item"]?.()]})]}),V.value.map(((a,l)=>{function n(e){e.stopPropagation(),e.preventDefault(),K(a,!1)}const r={"onClick:close":n,onKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),n(e))},onMousedown(e){e.preventDefault(),e.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},i=C.value?!!o.chip:!!o.selection,s=i?ae(C.value?o.chip({item:a,index:l,props:r}):o.selection({item:a,index:l})):void 0
if(!i||s)return t.createVNode("div",{key:a.value,class:["v-autocomplete__selection",l===p.value&&["v-autocomplete__selection--selected",h.value]],style:l===p.value?y.value:{}},[C.value?o.chip?t.createVNode(ol,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:a.title}}},{default:()=>[s]}):t.createVNode(Hn,t.mergeProps({key:"chip",closable:e.closableChips,size:"small",text:a.title,disabled:a.props.disabled},r),null):s??t.createVNode("span",{class:"v-autocomplete__selection-text"},[a.title,e.multiple&&l<V.value.length-1&&t.createVNode("span",{class:"v-autocomplete__selection-comma"},[t.createTextVNode(",")])])])}))]),"append-inner":function(){for(var a=arguments.length,l=new Array(a),i=0;i<a;i++)l[i]=arguments[i]
return t.createVNode(t.Fragment,null,[o["append-inner"]?.(...l),e.menuIcon?t.createVNode(Ql,{class:"v-autocomplete__menu-icon",color:r.value?.fieldIconColor,icon:e.menuIcon,onMousedown:O,onClick:ee,"aria-label":n(D.value),title:n(D.value),tabindex:"-1"},null):void 0])}})})),fi({isFocused:i,isPristine:s,menu:T,search:b,filteredItems:k,select:K},r)}}),Wi=ht({bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:Ft,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...yt(),...lo({location:"top end"}),...vl(),...Ba(),...ba(),...fl({transition:"scale-rotate-transition"})},"VBadge"),Ui=Ct()({name:"VBadge",inheritAttrs:!1,props:Wi(),setup(e,a){const{backgroundColorClasses:l,backgroundColorStyles:o}=dl((()=>e.color)),{roundedClasses:n}=pl(e),{t:r}=ma(),{textColorClasses:i,textColorStyles:s}=cl((()=>e.textColor)),{themeClasses:u}=Ia(),{locationStyles:c}=oo(e,!0,(t=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(t)?Number(e.offsetY??0):["left","right"].includes(t)?Number(e.offsetX??0):0)))
return Et((()=>{const d=Number(e.content),v=!e.max||isNaN(d)?e.content:d<=Number(e.max)?d:`${e.max}+`,[p,f]=x(a.attrs,["aria-atomic","aria-label","aria-live","role","title"])
return t.createVNode(e.tag,t.mergeProps({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},f,{style:e.style}),{default:()=>[t.createVNode("div",{class:"v-badge__wrapper"},[a.slots.default?.(),t.createVNode(ml,{transition:e.transition},{default:()=>[t.withDirectives(t.createVNode("span",t.mergeProps({class:["v-badge__badge",u.value,l.value,n.value,i.value],style:[o.value,s.value,e.inline?{}:c.value],"aria-atomic":"true","aria-label":r(e.label,d),"aria-live":"polite",role:"status"},p),[e.dot?void 0:a.slots.badge?a.slots.badge?.():e.icon?t.createVNode(Ql,{icon:e.icon},null):v]),[[t.vShow,e.modelValue]])]})])]})})),{}}}),Yi=ht({color:String,density:String,...yt()},"VBannerActions"),Gi=Ct()({name:"VBannerActions",props:Yi(),setup(e,a){let{slots:l}=a
return kt({VBtn:{color:e.color,density:e.density,slim:!0,variant:"text"}}),Et((()=>t.createVNode("div",{class:["v-banner-actions",e.class],style:e.style},[l.default?.()]))),{}}}),qi=It("v-banner-text"),Ki=ht({avatar:String,bgColor:String,color:String,icon:Ft,lines:String,stacked:Boolean,sticky:Boolean,text:String,...Vl(),...yt(),...Al(),...nl(),...Nn({mobile:null}),...Sl(),...lo(),...vo(),...vl(),...Ba(),...ba()},"VBanner"),Xi=Ct()({name:"VBanner",props:Ki(),setup(e,a){let{slots:l}=a
const{backgroundColorClasses:o,backgroundColorStyles:n}=dl((()=>e.bgColor)),{borderClasses:r}=wl(e),{densityClasses:i}=Tl(e),{displayClasses:s,mobile:u}=Cn(e),{dimensionStyles:c}=rl(e),{elevationClasses:d}=kl(e),{locationStyles:v}=oo(e),{positionClasses:p}=po(e),{roundedClasses:f}=pl(e),{themeClasses:m}=Ca(e),g=t.toRef((()=>e.color)),h=t.toRef((()=>e.density))
kt({VBannerActions:{color:g,density:h}}),Et((()=>{const a=!(!e.text&&!l.text),y=!(!e.avatar&&!e.icon),b=!(!y&&!l.prepend)
return t.createVNode(e.tag,{class:["v-banner",{"v-banner--stacked":e.stacked||u.value,"v-banner--sticky":e.sticky,[`v-banner--${e.lines}-line`]:!!e.lines},m.value,o.value,r.value,i.value,s.value,d.value,p.value,f.value,e.class],style:[n.value,c.value,v.value,e.style],role:"banner"},{default:()=>[b&&t.createVNode("div",{key:"prepend",class:"v-banner__prepend"},[l.prepend?t.createVNode(ol,{key:"prepend-defaults",disabled:!y,defaults:{VAvatar:{color:g.value,density:h.value,icon:e.icon,image:e.avatar}}},l.prepend):t.createVNode(Yo,{key:"prepend-avatar",color:g.value,density:h.value,icon:e.icon,image:e.avatar},null)]),t.createVNode("div",{class:"v-banner__content"},[a&&t.createVNode(qi,{key:"text"},{default:()=>[l.text?.()??e.text]}),l.default?.()]),l.actions&&t.createVNode(Gi,{key:"actions"},l.actions)]})}))}}),Zi=ht({baseColor:String,bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...Vl(),...yt(),...Al(),...Sl(),...vl(),...ea({name:"bottom-navigation"}),...Ba({tag:"header"}),...Ll({selectedClass:"v-btn--selected"}),...ba()},"VBottomNavigation"),Qi=Ct()({name:"VBottomNavigation",props:Zi(),emits:{"update:active":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ia(),{borderClasses:n}=wl(e),{backgroundColorClasses:r,backgroundColorStyles:i}=dl((()=>e.bgColor)),{densityClasses:s}=Tl(e),{elevationClasses:u}=kl(e),{roundedClasses:c}=pl(e),{ssrBootStyles:d}=_l(),v=t.computed((()=>Number(e.height)-("comfortable"===e.density?8:0)-("compact"===e.density?16:0))),p=na(e,"active",e.active),{layoutItemStyles:f}=aa({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef((()=>"bottom")),layoutSize:t.toRef((()=>p.value?v.value:0)),elementSize:v,active:p,absolute:t.toRef((()=>e.absolute))})
return Hl(e,Ul),kt({VBtn:{baseColor:t.toRef((()=>e.baseColor)),color:t.toRef((()=>e.color)),density:t.toRef((()=>e.density)),stacked:t.toRef((()=>"horizontal"!==e.mode)),variant:"text"}},{scoped:!0}),Et((()=>t.createVNode(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":p.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":"shift"===e.mode},o.value,r.value,n.value,s.value,u.value,c.value,e.class],style:[i.value,f.value,{height:m(v.value)},d.value,e.style]},{default:()=>[l.default&&t.createVNode("div",{class:"v-bottom-navigation__content"},[l.default()])]}))),{}}}),Ji=ht({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...ci({origin:"center center",scrollStrategy:"block",transition:{component:Oa},zIndex:2400})},"VDialog"),es=Ct()({name:"VDialog",props:Ji(),emits:{"update:modelValue":e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,l){let{emit:o,slots:n}=l
const r=na(e,"modelValue"),{scopeId:i}=ti(),s=t.ref()
function u(e){const t=e.relatedTarget,a=e.target
if(t!==a&&s.value?.contentEl&&s.value?.globalTop&&![document,s.value.contentEl].includes(a)&&!s.value.contentEl.contains(a)){const e=X(s.value.contentEl)
if(!e.length)return
const a=e[0],l=e[e.length-1]
t===a?l.focus():a.focus()}}function c(){o("afterEnter"),s.value?.contentEl&&!s.value.contentEl.contains(document.activeElement)&&s.value.contentEl.focus({preventScroll:!0})}function d(){o("afterLeave")}return t.onBeforeUnmount((()=>{document.removeEventListener("focusin",u)})),a&&t.watch((()=>r.value&&e.retainFocus),(e=>{e?document.addEventListener("focusin",u):document.removeEventListener("focusin",u)}),{immediate:!0}),t.watch(r,(async e=>{e||(await t.nextTick(),s.value.activatorEl?.focus({preventScroll:!0}))})),Et((()=>{const a=di.filterProps(e),l=t.mergeProps({"aria-haspopup":"dialog"},e.activatorProps),o=t.mergeProps({tabindex:-1},e.contentProps)
return t.createVNode(di,t.mergeProps({ref:s,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},a,{modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,"aria-modal":"true",activatorProps:l,contentProps:o,height:e.fullscreen?void 0:e.height,width:e.fullscreen?void 0:e.width,maxHeight:e.fullscreen?void 0:e.maxHeight,maxWidth:e.fullscreen?void 0:e.maxWidth,role:"dialog",onAfterEnter:c,onAfterLeave:d},i),{activator:n.activator,default:function(){for(var e=arguments.length,a=new Array(e),l=0;l<e;l++)a[l]=arguments[l]
return t.createVNode(ol,{root:"VDialog"},{default:()=>[n.default?.(...a)]})}})})),fi({},s)}}),ts=ht({inset:Boolean,...Ji({transition:"bottom-sheet-transition"})},"VBottomSheet"),as=Ct()({name:"VBottomSheet",props:ts(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"modelValue")
return Et((()=>{const a=es.filterProps(e)
return t.createVNode(es,t.mergeProps(a,{contentClass:["v-bottom-sheet__content",e.contentClass],modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:["v-bottom-sheet",{"v-bottom-sheet--inset":e.inset},e.class],style:e.style}),l)})),{}}}),ls=ht({divider:[Number,String],...yt()},"VBreadcrumbsDivider"),os=Ct()({name:"VBreadcrumbsDivider",props:ls(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode("li",{"aria-hidden":"true",class:["v-breadcrumbs-divider",e.class],style:e.style},[l?.default?.()??e.divider]))),{}}}),ns=ht({active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...yt(),...go(),...Ba({tag:"li"})},"VBreadcrumbsItem"),rs=Ct()({name:"VBreadcrumbsItem",props:ns(),setup(e,a){let{slots:l,attrs:o}=a
const n=mo(e,o),r=t.computed((()=>e.active||n.isActive?.value)),{textColorClasses:i,textColorStyles:s}=cl((()=>r.value?e.activeColor:e.color))
return Et((()=>t.createVNode(e.tag,{class:["v-breadcrumbs-item",{"v-breadcrumbs-item--active":r.value,"v-breadcrumbs-item--disabled":e.disabled,[`${e.activeClass}`]:r.value&&e.activeClass},i.value,e.class],style:[s.value,e.style],"aria-current":r.value?"page":void 0},{default:()=>[n.isLink.value?t.createVNode("a",t.mergeProps({class:"v-breadcrumbs-item--link",onClick:n.navigate},n.linkProps),[l.default?.()??e.title]):l.default?.()??e.title]}))),{}}}),is=ht({activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:"/"},icon:Ft,items:{type:Array,default:()=>[]},...yt(),...Al(),...vl(),...Ba({tag:"ul"})},"VBreadcrumbs"),ss=Ct()({name:"VBreadcrumbs",props:is(),setup(e,a){let{slots:l}=a
const{backgroundColorClasses:o,backgroundColorStyles:n}=dl((()=>e.bgColor)),{densityClasses:r}=Tl(e),{roundedClasses:i}=pl(e)
kt({VBreadcrumbsDivider:{divider:t.toRef((()=>e.divider))},VBreadcrumbsItem:{activeClass:t.toRef((()=>e.activeClass)),activeColor:t.toRef((()=>e.activeColor)),color:t.toRef((()=>e.color)),disabled:t.toRef((()=>e.disabled))}})
const s=t.computed((()=>e.items.map((e=>"string"==typeof e?{item:{title:e},raw:e}:{item:e,raw:e}))))
return Et((()=>{const a=!(!l.prepend&&!e.icon)
return t.createVNode(e.tag,{class:["v-breadcrumbs",o.value,r.value,i.value,e.class],style:[n.value,e.style]},{default:()=>[a&&t.createVNode("li",{key:"prepend",class:"v-breadcrumbs__prepend"},[l.prepend?t.createVNode(ol,{key:"prepend-defaults",disabled:!e.icon,defaults:{VIcon:{icon:e.icon,start:!0}}},l.prepend):t.createVNode(Ql,{key:"prepend-icon",start:!0,icon:e.icon},null)]),s.value.map(((e,a,o)=>{let{item:n,raw:r}=e
return t.createVNode(t.Fragment,null,[l.item?.({item:n,index:a})??t.createVNode(rs,t.mergeProps({key:a,disabled:a>=o.length-1},"string"==typeof n?{title:n}:n),{default:l.title?()=>l.title?.({item:n,index:a}):void 0}),a<o.length-1&&t.createVNode(os,null,{default:l.divider?()=>l.divider?.({item:r,index:a}):void 0})])})),l.default?.()]})})),{}}}),us=Ct()({name:"VCardActions",props:yt(),setup(e,a){let{slots:l}=a
return kt({VBtn:{slim:!0,variant:"text"}}),Et((()=>t.createVNode("div",{class:["v-card-actions",e.class],style:e.style},[l.default?.()]))),{}}}),cs=ht({opacity:[Number,String],...yt(),...Ba()},"VCardSubtitle"),ds=Ct()({name:"VCardSubtitle",props:cs(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},l))),{}}}),vs=It("v-card-title"),ps=ht({appendAvatar:String,appendIcon:Ft,prependAvatar:String,prependIcon:Ft,subtitle:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},...yt(),...Al()},"VCardItem"),fs=Ct()({name:"VCardItem",props:ps(),setup(e,a){let{slots:l}=a
return Et((()=>{const a=!(!e.prependAvatar&&!e.prependIcon),o=!(!a&&!l.prepend),n=!(!e.appendAvatar&&!e.appendIcon),r=!(!n&&!l.append),i=!(null==e.title&&!l.title),s=!(null==e.subtitle&&!l.subtitle)
return t.createVNode("div",{class:["v-card-item",e.class],style:e.style},[o&&t.createVNode("div",{key:"prepend",class:"v-card-item__prepend"},[l.prepend?t.createVNode(ol,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},l.prepend):t.createVNode(t.Fragment,null,[e.prependAvatar&&t.createVNode(Yo,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&t.createVNode(Ql,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),t.createVNode("div",{class:"v-card-item__content"},[i&&t.createVNode(vs,{key:"title"},{default:()=>[l.title?.()??t.toDisplayString(e.title)]}),s&&t.createVNode(ds,{key:"subtitle"},{default:()=>[l.subtitle?.()??t.toDisplayString(e.subtitle)]}),l.default?.()]),r&&t.createVNode("div",{key:"append",class:"v-card-item__append"},[l.append?t.createVNode(ol,{key:"append-defaults",disabled:!n,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},l.append):t.createVNode(t.Fragment,null,[e.appendIcon&&t.createVNode(Ql,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&t.createVNode(Yo,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])})),{}}}),ms=ht({opacity:[Number,String],...yt(),...Ba()},"VCardText"),gs=Ct()({name:"VCardText",props:ms(),setup(e,a){let{slots:l}=a
return Et((()=>t.createVNode(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},l))),{}}}),hs=ht({appendAvatar:String,appendIcon:Ft,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:Ft,ripple:{type:[Boolean,Object],default:!0},subtitle:{type:[String,Number,Boolean],default:void 0},text:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},...Vl(),...yt(),...Al(),...nl(),...Sl(),...io(),...lo(),...vo(),...vl(),...go(),...Ba(),...ba(),...Fl({variant:"elevated"})},"VCard"),ys=Ct()({name:"VCard",directives:{Ripple:Eo},props:hs(),setup(e,a){let{attrs:l,slots:o}=a
const{themeClasses:n}=Ca(e),{borderClasses:r}=wl(e),{colorClasses:i,colorStyles:s,variantClasses:u}=$l(e),{densityClasses:c}=Tl(e),{dimensionStyles:d}=rl(e),{elevationClasses:v}=kl(e),{loaderClasses:p}=so(e),{locationStyles:f}=oo(e),{positionClasses:m}=po(e),{roundedClasses:g}=pl(e),h=mo(e,l)
return Et((()=>{const a=!1!==e.link&&h.isLink.value,l=!e.disabled&&!1!==e.link&&(e.link||h.isClickable.value),y=a?"a":e.tag,b=!(!o.title&&null==e.title),V=!(!o.subtitle&&null==e.subtitle),w=b||V,S=!!(o.append||e.appendAvatar||e.appendIcon),k=!!(o.prepend||e.prependAvatar||e.prependIcon),x=!(!o.image&&!e.image),N=w||k||S,C=!(!o.text&&null==e.text)
return t.withDirectives(t.createVNode(y,t.mergeProps({class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":l},n.value,r.value,i.value,c.value,v.value,p.value,m.value,g.value,u.value,e.class],style:[s.value,d.value,f.value,e.style],onClick:l&&h.navigate,tabindex:e.disabled?-1:void 0},h.linkProps),{default:()=>[x&&t.createVNode("div",{key:"image",class:"v-card__image"},[o.image?t.createVNode(ol,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},o.image):t.createVNode(bl,{key:"image-img",cover:!0,src:e.image},null)]),t.createVNode(uo,{name:"v-card",active:!!e.loading,color:"boolean"==typeof e.loading?void 0:e.loading},{default:o.loader}),N&&t.createVNode(fs,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:o.item,prepend:o.prepend,title:o.title,subtitle:o.subtitle,append:o.append}),C&&t.createVNode(gs,{key:"text"},{default:()=>[o.text?.()??e.text]}),o.default?.(),o.actions&&t.createVNode(us,null,{default:o.actions}),El(l,"v-card")]}),[[t.resolveDirective("ripple"),l&&e.ripple]])})),{}}}),bs=e=>{const{touchstartX:t,touchendX:a,touchstartY:l,touchendY:o}=e
e.offsetX=a-t,e.offsetY=o-l,Math.abs(e.offsetY)<.5*Math.abs(e.offsetX)&&(e.left&&a<t-16&&e.left(e),e.right&&a>t+16&&e.right(e)),Math.abs(e.offsetX)<.5*Math.abs(e.offsetY)&&(e.up&&o<l-16&&e.up(e),e.down&&o>l+16&&e.down(e))}
function Vs(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const t={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end}
return{touchstart:e=>function(e,t){const a=e.changedTouches[0]
t.touchstartX=a.clientX,t.touchstartY=a.clientY,t.start?.({originalEvent:e,...t})}(e,t),touchend:e=>function(e,t){const a=e.changedTouches[0]
t.touchendX=a.clientX,t.touchendY=a.clientY,t.end?.({originalEvent:e,...t}),bs(t)}(e,t),touchmove:e=>function(e,t){const a=e.changedTouches[0]
t.touchmoveX=a.clientX,t.touchmoveY=a.clientY,t.move?.({originalEvent:e,...t})}(e,t)}}const ws={mounted:function(e,t){const a=t.value,l=a?.parent?e.parentElement:e,o=a?.options??{passive:!0},n=t.instance?.$.uid
if(!l||!n)return
const r=Vs(t.value)
l._touchHandlers=l._touchHandlers??Object.create(null),l._touchHandlers[n]=r,w(r).forEach((e=>{l.addEventListener(e,r[e],o)}))},unmounted:function(e,t){const a=t.value?.parent?e.parentElement:e,l=t.instance?.$.uid
if(!a?._touchHandlers||!l)return
const o=a._touchHandlers[l]
w(o).forEach((e=>{a.removeEventListener(e,o[e])})),delete a._touchHandlers[l]}},Ss=Symbol.for("vuetify:v-window"),ks=Symbol.for("vuetify:v-window-group"),xs=ht({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>"boolean"==typeof e||"hover"===e},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},...yt(),...Ba(),...ba()},"VWindow"),Ns=Ct()({name:"VWindow",directives:{Touch:ws},props:xs(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{isRtl:n}=ha(),{t:r}=ma(),i=Hl(e,ks),s=t.ref(),u=t.computed((()=>n.value?!e.reverse:e.reverse)),c=t.shallowRef(!1),d=t.computed((()=>`v-window-${"vertical"===e.direction?"y":"x"}${(u.value?!c.value:c.value)?"-reverse":""}-transition`)),v=t.shallowRef(0),p=t.ref(void 0),f=t.computed((()=>i.items.value.findIndex((e=>i.selected.value.includes(e.id)))))
t.watch(f,((e,t)=>{const a=i.items.value.length,l=a-1
c.value=a<=2?e<t:e===l&&0===t||(0!==e||t!==l)&&e<t})),t.provide(Ss,{transition:d,isReversed:c,transitionCount:v,transitionHeight:p,rootRef:s})
const m=t.toRef((()=>e.continuous||0!==f.value)),g=t.toRef((()=>e.continuous||f.value!==i.items.value.length-1))
function h(){m.value&&i.prev()}function y(){g.value&&i.next()}const b=t.computed((()=>{const a=[],o={icon:n.value?e.nextIcon:e.prevIcon,class:"v-window__"+(u.value?"right":"left"),onClick:i.prev,"aria-label":r("$vuetify.carousel.prev")}
a.push(m.value?l.prev?l.prev({props:o}):t.createVNode($o,o,null):t.createVNode("div",null,null))
const s={icon:n.value?e.prevIcon:e.nextIcon,class:"v-window__"+(u.value?"left":"right"),onClick:i.next,"aria-label":r("$vuetify.carousel.next")}
return a.push(g.value?l.next?l.next({props:s}):t.createVNode($o,s,null):t.createVNode("div",null,null)),a})),V=t.computed((()=>{if(!1===e.touch)return e.touch
return{...{left:()=>{u.value?h():y()},right:()=>{u.value?y():h()},start:e=>{let{originalEvent:t}=e
t.stopPropagation()}},...!0===e.touch?{}:e.touch}}))
return Et((()=>t.withDirectives(t.createVNode(e.tag,{ref:s,class:["v-window",{"v-window--show-arrows-on-hover":"hover"===e.showArrows},o.value,e.class],style:e.style},{default:()=>[t.createVNode("div",{class:"v-window__container",style:{height:p.value}},[l.default?.({group:i}),!1!==e.showArrows&&t.createVNode("div",{class:"v-window__controls"},[b.value])]),l.additional?.({group:i})]}),[[t.resolveDirective("touch"),V.value]]))),{group:i}}}),Cs=ht({color:String,cycle:Boolean,delimiterIcon:{type:Ft,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...xs({continuous:!0,mandatory:"force",showArrows:!0})},"VCarousel"),Is=Ct()({name:"VCarousel",props:Cs(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"modelValue"),{t:n}=ma(),r=t.ref()
let i=-1
function s(){e.cycle&&r.value&&(i=window.setTimeout(r.value.group.next,Number(e.interval)>0?Number(e.interval):6e3))}function u(){window.clearTimeout(i),window.requestAnimationFrame(s)}return t.watch(o,u),t.watch((()=>e.interval),u),t.watch((()=>e.cycle),(e=>{e?u():window.clearTimeout(i)})),t.onMounted(s),Et((()=>{const a=Ns.filterProps(e)
return t.createVNode(Ns,t.mergeProps({ref:r},a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:m(e.height)},e.style]}),{default:l.default,additional:a=>{let{group:r}=a
return t.createVNode(t.Fragment,null,[!e.hideDelimiters&&t.createVNode("div",{class:"v-carousel__controls",style:{left:"left"===e.verticalDelimiters&&e.verticalDelimiters?0:"auto",right:"right"===e.verticalDelimiters?0:"auto"}},[r.items.value.length>0&&t.createVNode(ol,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[r.items.value.map(((e,a)=>{const o={id:`carousel-item-${e.id}`,"aria-label":n("$vuetify.carousel.ariaLabel.delimiter",a+1,r.items.value.length),class:["v-carousel__controls__item",r.isSelected(e.id)&&"v-btn--active"],onClick:()=>r.select(e.id,!0)}
return l.item?l.item({props:o,item:e}):t.createVNode($o,t.mergeProps(e,o),null)}))]})]),e.progress&&t.createVNode(ro,{class:"v-carousel__progress",color:"string"==typeof e.progress?e.progress:void 0,modelValue:(r.getItemIndex(o.value)+1)/r.items.value.length*100},null)])},prev:l.prev,next:l.next})})),{}}}),_s=ht({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...yt(),...zl(),...Jr()},"VWindowItem"),Ps=Ct()({name:"VWindowItem",directives:{Touch:ws},props:_s(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:l}=a
const o=t.inject(Ss),n=jl(e,ks),{isBooted:r}=_l()
if(!o||!n)throw new Error("[Vuetify] VWindowItem must be used inside VWindow")
const i=t.shallowRef(!1),s=t.computed((()=>r.value&&(o.isReversed.value?!1!==e.reverseTransition:!1!==e.transition)))
function u(){i.value&&o&&(i.value=!1,o.transitionCount.value>0&&(o.transitionCount.value-=1,0===o.transitionCount.value&&(o.transitionHeight.value=void 0)))}function c(){!i.value&&o&&(i.value=!0,0===o.transitionCount.value&&(o.transitionHeight.value=m(o.rootRef.value?.clientHeight)),o.transitionCount.value+=1)}function d(){u()}function v(e){i.value&&t.nextTick((()=>{s.value&&i.value&&o&&(o.transitionHeight.value=m(e.clientHeight))}))}const p=t.computed((()=>{const t=o.isReversed.value?e.reverseTransition:e.transition
return!!s.value&&{name:"string"!=typeof t?o.transition.value:t,onBeforeEnter:c,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:c,onAfterLeave:u,onLeaveCancelled:d,onEnter:v}})),{hasContent:f}=ei(e,n.isSelected)
return Et((()=>t.createVNode(ml,{transition:p.value,disabled:!r.value},{default:()=>[t.withDirectives(t.createVNode("div",{class:["v-window-item",n.selectedClass.value,e.class],style:e.style},[f.value&&l.default?.()]),[[t.vShow,n.isSelected.value]])]}))),{groupItem:n}}}),Bs=ht({...yl(),..._s()},"VCarouselItem"),Rs=Ct()({name:"VCarouselItem",inheritAttrs:!1,props:Bs(),setup(e,a){let{slots:l,attrs:o}=a
Et((()=>{const a=bl.filterProps(e),n=Ps.filterProps(e)
return t.createVNode(Ps,t.mergeProps({class:["v-carousel-item",e.class]},n),{default:()=>[t.createVNode(bl,t.mergeProps(o,a),l)]})}))}}),As=It("v-code","code"),Ts=Nt({name:"VColorPickerCanvas",props:ht({color:{type:Object},disabled:Boolean,dotSize:{type:[Number,String],default:10},height:{type:[Number,String],default:150},width:{type:[Number,String],default:300},...yt()},"VColorPickerCanvas")(),emits:{"update:color":e=>!0,"update:position":e=>!0},setup(e,a){let{emit:l}=a
const o=t.shallowRef(!1),n=t.ref(),r=t.shallowRef(parseFloat(e.width)),i=t.shallowRef(parseFloat(e.height)),s=t.ref({x:0,y:0}),u=t.computed({get:()=>s.value,set(t){if(!n.value)return
const{x:a,y:o}=t
s.value=t,l("update:color",{h:e.color?.h??0,s:A(a,0,r.value)/r.value,v:1-A(o,0,i.value)/i.value,a:e.color?.a??1})}}),c=t.computed((()=>{const{x:t,y:a}=u.value,l=parseInt(e.dotSize,10)/2
return{width:m(e.dotSize),height:m(e.dotSize),transform:`translate(${m(t-l)}, ${m(a-l)})`}})),{resizeRef:d}=Xt((e=>{if(!d.el?.offsetParent)return
const{width:t,height:a}=e[0].contentRect
r.value=t,i.value=a}))
function v(t){"mousedown"===t.type&&t.preventDefault(),e.disabled||(p(t),window.addEventListener("mousemove",p),window.addEventListener("mouseup",f),window.addEventListener("touchmove",p),window.addEventListener("touchend",f))}function p(t){if(e.disabled||!n.value)return
o.value=!0
const a=function(e){return"touches"in e?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:{clientX:e.clientX,clientY:e.clientY}}(t)
!function(e,t,a){const{left:l,top:o,width:n,height:r}=a
u.value={x:A(e-l,0,n),y:A(t-o,0,r)}}(a.clientX,a.clientY,n.value.getBoundingClientRect())}function f(){window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",f),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",f)}function g(){if(!n.value)return
const t=n.value,a=t.getContext("2d")
if(!a)return
const l=a.createLinearGradient(0,0,t.width,0)
l.addColorStop(0,"hsla(0, 0%, 100%, 1)"),l.addColorStop(1,`hsla(${e.color?.h??0}, 100%, 50%, 1)`),a.fillStyle=l,a.fillRect(0,0,t.width,t.height)
const o=a.createLinearGradient(0,0,0,t.height)
o.addColorStop(0,"hsla(0, 0%, 0%, 0)"),o.addColorStop(1,"hsla(0, 0%, 0%, 1)"),a.fillStyle=o,a.fillRect(0,0,t.width,t.height)}return t.watch((()=>e.color?.h),g,{immediate:!0}),t.watch((()=>[r.value,i.value]),((e,t)=>{g(),s.value={x:u.value.x*e[0]/t[0],y:u.value.y*e[1]/t[1]}}),{flush:"post"}),t.watch((()=>e.color),(()=>{o.value?o.value=!1:s.value=e.color?{x:e.color.s*r.value,y:(1-e.color.v)*i.value}:{x:0,y:0}}),{deep:!0,immediate:!0}),t.onMounted((()=>g())),Et((()=>t.createVNode("div",{ref:d,class:["v-color-picker-canvas",e.class],style:e.style,onMousedown:v,onTouchstartPassive:v},[t.createVNode("canvas",{ref:n,width:r.value,height:i.value},null),e.color&&t.createVNode("div",{class:["v-color-picker-canvas__dot",{"v-color-picker-canvas__dot--disabled":e.disabled}],style:c.value},null)]))),{}}})
const Ds={h:0,s:0,v:0,a:1},Es={inputProps:{type:"number",min:0},inputs:[{label:"R",max:255,step:1,getValue:e=>Math.round(e.r),getColor:(e,t)=>({...e,r:Number(t)})},{label:"G",max:255,step:1,getValue:e=>Math.round(e.g),getColor:(e,t)=>({...e,g:Number(t)})},{label:"B",max:255,step:1,getValue:e=>Math.round(e.b),getColor:(e,t)=>({...e,b:Number(t)})},{label:"A",max:1,step:.01,getValue:e=>{let{a:t}=e
return null!=t?Math.round(100*t)/100:1},getColor:(e,t)=>({...e,a:Number(t)})}],to:tt,from:lt},Fs={inputProps:{type:"number",min:0},inputs:[{label:"H",max:360,step:1,getValue:e=>Math.round(e.h),getColor:(e,t)=>({...e,h:Number(t)})},{label:"S",max:1,step:.01,getValue:e=>Math.round(100*e.s)/100,getColor:(e,t)=>({...e,s:Number(t)})},{label:"L",max:1,step:.01,getValue:e=>Math.round(100*e.l)/100,getColor:(e,t)=>({...e,l:Number(t)})},{label:"A",max:1,step:.01,getValue:e=>{let{a:t}=e
return null!=t?Math.round(100*t)/100:1},getColor:(e,t)=>({...e,a:Number(t)})}],to:ot,from:nt},$s={inputProps:{type:"text"},inputs:[{label:"HEXA",getValue:e=>e,getColor:(e,t)=>t}],to:dt,from:function(e){return lt(ct(e))}},Ms={rgb:{...Es,inputs:Es.inputs?.slice(0,3)},rgba:Es,hsl:{...Fs,inputs:Fs.inputs.slice(0,3)},hsla:Fs,hex:{...$s,inputs:[{label:"HEX",getValue:e=>e.slice(0,7),getColor:(e,t)=>t}]},hexa:$s},Os=e=>{let{label:a,...l}=e
return t.createVNode("div",{class:"v-color-picker-edit__input"},[t.createVNode("input",l,null),t.createVNode("span",null,[a])])},Ls=Nt({name:"VColorPickerEdit",props:ht({color:Object,disabled:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(Ms).includes(e)},modes:{type:Array,default:()=>Object.keys(Ms),validator:e=>Array.isArray(e)&&e.every((e=>Object.keys(Ms).includes(e)))},...yt()},"VColorPickerEdit")(),emits:{"update:color":e=>!0,"update:mode":e=>!0},setup(e,a){let{emit:l}=a
const o=t.computed((()=>e.modes.map((e=>({...Ms[e],name:e}))))),n=t.computed((()=>{const t=o.value.find((t=>t.name===e.mode))
if(!t)return[]
const a=e.color?t.to(e.color):null
return t.inputs?.map((o=>{let{getValue:n,getColor:r,...i}=o
return{...t.inputProps,...i,disabled:e.disabled,value:a&&n(a),onChange:e=>{const o=e.target
o&&l("update:color",t.from(r(a??t.to(Ds),o.value)))}}}))}))
return Et((()=>t.createVNode("div",{class:["v-color-picker-edit",e.class],style:e.style},[n.value?.map((e=>t.createVNode(Os,e,null))),o.value.length>1&&t.createVNode($o,{icon:"$unfold",size:"x-small",variant:"plain",onClick:()=>{const t=o.value.findIndex((t=>t.name===e.mode))
l("update:mode",o.value[(t+1)%o.value.length].name)}},null)]))),{}}}),zs=Symbol.for("vuetify:v-slider")
function js(e,t,a){const l="vertical"===a,o=t.getBoundingClientRect(),n="touches"in e?e.touches[0]:e
return l?n.clientY-(o.top+o.height/2):n.clientX-(o.left+o.width/2)}const Hs=ht({disabled:{type:Boolean,default:null},error:Boolean,readonly:{type:Boolean,default:null},max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:0},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>"boolean"==typeof e||"always"===e},thumbSize:{type:[Number,String],default:20},showTicks:{type:[Boolean,String],default:!1,validator:e=>"boolean"==typeof e||"always"===e},ticks:{type:[Array,Object]},tickSize:{type:[Number,String],default:2},color:String,trackColor:String,trackFillColor:String,trackSize:{type:[Number,String],default:4},direction:{type:String,default:"horizontal",validator:e=>["vertical","horizontal"].includes(e)},reverse:Boolean,...vl(),...Sl({elevation:2}),ripple:{type:Boolean,default:!0}},"Slider"),Ws=e=>{const a=t.computed((()=>parseFloat(e.min))),l=t.computed((()=>parseFloat(e.max))),o=t.computed((()=>Number(e.step)>0?parseFloat(e.step):0)),n=t.computed((()=>Math.max(T(o.value),T(a.value))))
return{min:a,max:l,step:o,decimals:n,roundValue:function(e){if(e=parseFloat(e),o.value<=0)return e
const t=A(e,a.value,l.value),r=a.value%o.value,i=Math.round((t-r)/o.value)*o.value+r
return parseFloat(Math.min(i,l.value).toFixed(n.value))}}},Us=e=>{let{props:a,steps:l,onSliderStart:o,onSliderMove:n,onSliderEnd:r,getActiveThumb:i}=e
const{isRtl:s}=ha(),u=t.toRef((()=>a.reverse)),c=t.computed((()=>"vertical"===a.direction)),d=t.computed((()=>c.value!==u.value)),{min:v,max:p,step:m,decimals:g,roundValue:h}=l,y=t.computed((()=>parseInt(a.thumbSize,10))),b=t.computed((()=>parseInt(a.tickSize,10))),V=t.computed((()=>parseInt(a.trackSize,10))),w=t.computed((()=>(p.value-v.value)/m.value)),S=t.toRef((()=>a.disabled)),k=t.computed((()=>a.error||a.disabled?void 0:a.thumbColor??a.color)),x=t.computed((()=>a.error||a.disabled?void 0:a.trackColor??a.color)),N=t.computed((()=>a.error||a.disabled?void 0:a.trackFillColor??a.color)),C=t.shallowRef(!1),I=t.shallowRef(0),_=t.ref(),P=t.ref()
function B(e){const t=_.value?.$el
if(!t)return
const l="vertical"===a.direction,o=l?"top":"left",n=l?"height":"width",r=l?"clientY":"clientX",{[o]:i,[n]:u}=t.getBoundingClientRect(),c=function(e,t){return"touches"in e&&e.touches.length?e.touches[0][t]:"changedTouches"in e&&e.changedTouches.length?e.changedTouches[0][t]:e[t]}(e,r)
let f=Math.min(Math.max((c-i-I.value)/u,0),1)||0
return(l?d.value:d.value!==s.value)&&(f=1-f),h(v.value+f*(p.value-v.value))}const R=e=>{const t=B(e)
null!=t&&r({value:t}),C.value=!1,I.value=0},T=e=>{const l=B(e)
P.value=i(e),P.value&&(C.value=!0,P.value.contains(e.target)?I.value=js(e,P.value,a.direction):(I.value=0,null!=l&&n({value:l})),null!=l&&o({value:l}),t.nextTick((()=>P.value?.focus())))},D={passive:!0,capture:!0}
function E(e){const t=B(e)
null!=t&&n({value:t})}function F(e){e.stopPropagation(),e.preventDefault(),R(e),window.removeEventListener("mousemove",E,D),window.removeEventListener("mouseup",F)}function $(e){R(e),window.removeEventListener("touchmove",E,D),e.target?.removeEventListener("touchend",$)}const M=e=>{const t=(e-v.value)/(p.value-v.value)*100
return A(isNaN(t)?0:t,0,100)},O=t.toRef((()=>a.showTicks)),L=t.computed((()=>O.value?a.ticks?Array.isArray(a.ticks)?a.ticks.map((e=>({value:e,position:M(e),label:e.toString()}))):Object.keys(a.ticks).map((e=>({value:parseFloat(e),position:M(parseFloat(e)),label:a.ticks[e]}))):w.value!==1/0?f(w.value+1).map((e=>{const t=v.value+e*m.value
return{value:t,position:M(t)}})):[]:[])),z=t.computed((()=>L.value.some((e=>{let{label:t}=e
return!!t})))),j={activeThumbRef:P,color:t.toRef((()=>a.color)),decimals:g,disabled:S,direction:t.toRef((()=>a.direction)),elevation:t.toRef((()=>a.elevation)),hasLabels:z,isReversed:u,indexFromEnd:d,min:v,max:p,mousePressed:C,numTicks:w,onSliderMousedown:function(e){0===e.button&&(e.preventDefault(),T(e),window.addEventListener("mousemove",E,D),window.addEventListener("mouseup",F,{passive:!1}))},onSliderTouchstart:function(e){T(e),window.addEventListener("touchmove",E,D),e.target?.addEventListener("touchend",$,{passive:!1})},parsedTicks:L,parseMouseMove:B,position:M,readonly:t.toRef((()=>a.readonly)),rounded:t.toRef((()=>a.rounded)),roundValue:h,showTicks:O,startOffset:I,step:m,thumbSize:y,thumbColor:k,thumbLabel:t.toRef((()=>a.thumbLabel)),ticks:t.toRef((()=>a.ticks)),tickSize:b,trackColor:x,trackContainerRef:_,trackFillColor:N,trackSize:V,vertical:c}
return t.provide(zs,j),j},Ys=ht({focused:Boolean,max:{type:Number,required:!0},min:{type:Number,required:!0},modelValue:{type:Number,required:!0},position:{type:Number,required:!0},ripple:{type:[Boolean,Object],default:!0},name:String,...yt()},"VSliderThumb"),Gs=Ct()({name:"VSliderThumb",directives:{Ripple:Eo},props:Ys(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=t.inject(zs),{isRtl:r,rtlClasses:i}=ha()
if(!n)throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider")
const{thumbColor:s,step:u,disabled:c,thumbSize:d,thumbLabel:v,direction:p,isReversed:f,vertical:g,readonly:h,elevation:y,mousePressed:b,decimals:w,indexFromEnd:S}=n,k=t.computed((()=>c.value?void 0:y.value)),{elevationClasses:x}=kl(k),{textColorClasses:N,textColorStyles:C}=cl(s),{pageup:I,pagedown:_,end:P,home:B,left:R,right:A,down:T,up:D}=V,E=[I,_,P,B,R,A,T,D],F=t.computed((()=>u.value?[1,2,3]:[1,5,10]))
function $(t){const a=function(t,a){if(!E.includes(t.key))return
t.preventDefault()
const l=u.value||.1,o=(e.max-e.min)/l
if([R,A,T,D].includes(t.key)){const e=(g.value?[r.value?R:A,f.value?T:D]:S.value!==r.value?[R,D]:[A,D]).includes(t.key)?1:-1,o=t.shiftKey?2:t.ctrlKey?1:0
a+=e*l*F.value[o]}else t.key===B?a=e.min:t.key===P?a=e.max:a-=(t.key===_?1:-1)*l*(o>100?o/10:10)
return Math.max(e.min,Math.min(e.max,a))}(t,e.modelValue)
null!=a&&o("update:modelValue",a)}return Et((()=>{const a=m(S.value?100-e.position:e.position,"%")
return t.createVNode("div",{class:["v-slider-thumb",{"v-slider-thumb--focused":e.focused,"v-slider-thumb--pressed":e.focused&&b.value},e.class,i.value],style:[{"--v-slider-thumb-position":a,"--v-slider-thumb-size":m(d.value)},e.style],role:"slider",tabindex:c.value?-1:0,"aria-label":e.name,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,"aria-readonly":!!h.value,"aria-orientation":p.value,onKeydown:h.value?void 0:$},[t.createVNode("div",{class:["v-slider-thumb__surface",N.value,x.value],style:{...C.value}},null),t.withDirectives(t.createVNode("div",{class:["v-slider-thumb__ripple",N.value],style:C.value},null),[[t.resolveDirective("ripple"),e.ripple,null,{circle:!0,center:!0}]]),t.createVNode(Ya,{origin:"bottom center"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-slider-thumb__label-container"},[t.createVNode("div",{class:["v-slider-thumb__label"]},[t.createVNode("div",null,[l["thumb-label"]?.({modelValue:e.modelValue})??e.modelValue.toFixed(u.value?w.value:1)])])]),[[t.vShow,v.value&&e.focused||"always"===v.value]])]})])})),{}}}),qs=ht({start:{type:Number,required:!0},stop:{type:Number,required:!0},...yt()},"VSliderTrack"),Ks=Ct()({name:"VSliderTrack",props:qs(),emits:{},setup(e,a){let{slots:l}=a
const o=t.inject(zs)
if(!o)throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider")
const{color:n,parsedTicks:r,rounded:i,showTicks:s,tickSize:u,trackColor:c,trackFillColor:d,trackSize:v,vertical:p,min:f,max:g,indexFromEnd:h}=o,{roundedClasses:y}=pl(i),{backgroundColorClasses:b,backgroundColorStyles:V}=dl(d),{backgroundColorClasses:w,backgroundColorStyles:S}=dl(c),k=t.computed((()=>`inset-${p.value?"block":"inline"}-${h.value?"end":"start"}`)),x=t.computed((()=>p.value?"height":"width")),N=t.computed((()=>({[k.value]:"0%",[x.value]:"100%"}))),C=t.computed((()=>e.stop-e.start)),I=t.computed((()=>({[k.value]:m(e.start,"%"),[x.value]:m(C.value,"%")}))),_=t.computed((()=>{if(!s.value)return[]
return(p.value?r.value.slice().reverse():r.value).map(((a,o)=>{const n=a.value!==f.value&&a.value!==g.value?m(a.position,"%"):void 0
return t.createVNode("div",{key:a.value,class:["v-slider-track__tick",{"v-slider-track__tick--filled":a.position>=e.start&&a.position<=e.stop,"v-slider-track__tick--first":a.value===f.value,"v-slider-track__tick--last":a.value===g.value}],style:{[k.value]:n}},[(a.label||l["tick-label"])&&t.createVNode("div",{class:"v-slider-track__tick-label"},[l["tick-label"]?.({tick:a,index:o})??a.label])])}))}))
return Et((()=>t.createVNode("div",{class:["v-slider-track",y.value,e.class],style:[{"--v-slider-track-size":m(v.value),"--v-slider-tick-size":m(u.value)},e.style]},[t.createVNode("div",{class:["v-slider-track__background",w.value,{"v-slider-track__background--opacity":!!n.value||!d.value}],style:{...N.value,...S.value}},null),t.createVNode("div",{class:["v-slider-track__fill",b.value],style:{...I.value,...V.value}},null),s.value&&t.createVNode("div",{class:["v-slider-track__ticks",{"v-slider-track__ticks--always-show":"always"===s.value}]},[_.value])]))),{}}}),Xs=ht({...rn(),...Hs(),...fn(),modelValue:{type:[Number,String],default:0}},"VSlider"),Zs=Ct()({name:"VSlider",props:Xs(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,start:e=>!0,end:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=t.ref(),{rtlClasses:r}=ha(),i=Ws(e),s=na(e,"modelValue",void 0,(e=>i.roundValue(null==e?i.min.value:e))),{min:u,max:c,mousePressed:d,roundValue:v,onSliderMousedown:p,onSliderTouchstart:f,trackContainerRef:m,position:g,hasLabels:h,readonly:y}=Us({props:e,steps:i,onSliderStart:()=>{o("start",s.value)},onSliderEnd:e=>{let{value:t}=e
const a=v(t)
s.value=a,o("end",a)},onSliderMove:e=>{let{value:t}=e
return s.value=v(t)},getActiveThumb:()=>n.value?.$el}),{isFocused:b,focus:V,blur:w}=sn(e),S=t.computed((()=>g(s.value)))
return Et((()=>{const a=mn.filterProps(e),o=!!(e.label||l.label||l.prepend)
return t.createVNode(mn,t.mergeProps({class:["v-slider",{"v-slider--has-labels":!!l["tick-label"]||h.value,"v-slider--focused":b.value,"v-slider--pressed":d.value,"v-slider--disabled":e.disabled},r.value,e.class],style:e.style},a,{focused:b.value}),{...l,prepend:o?a=>t.createVNode(t.Fragment,null,[l.label?.(a)??(e.label?t.createVNode(qo,{id:a.id.value,class:"v-slider__label",text:e.label},null):void 0),l.prepend?.(a)]):void 0,default:a=>{let{id:o,messagesId:r}=a
return t.createVNode("div",{class:"v-slider__container",onMousedown:y.value?void 0:p,onTouchstartPassive:y.value?void 0:f},[t.createVNode("input",{id:o.value,name:e.name||o.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:s.value},null),t.createVNode(Ks,{ref:m,start:0,stop:S.value},{"tick-label":l["tick-label"]}),t.createVNode(Gs,{ref:n,"aria-describedby":r.value,focused:b.value,min:u.value,max:c.value,modelValue:s.value,"onUpdate:modelValue":e=>s.value=e,position:S.value,elevation:e.elevation,onFocus:V,onBlur:w,ripple:e.ripple,name:e.name},{"thumb-label":l["thumb-label"]})])}})})),{}}}),Qs=Nt({name:"VColorPickerPreview",props:ht({color:{type:Object},disabled:Boolean,hideAlpha:Boolean,...yt()},"VColorPickerPreview")(),emits:{"update:color":e=>!0},setup(e,a){let{emit:l}=a
const o=new AbortController
async function r(){if(!n||e.disabled)return
const t=new window.EyeDropper
try{const a=lt(et((await t.open({signal:o.signal})).sRGBHex))
l("update:color",{...e.color??Ds,...a})}catch(e){}}return t.onUnmounted((()=>o.abort())),Et((()=>t.createVNode("div",{class:["v-color-picker-preview",{"v-color-picker-preview--hide-alpha":e.hideAlpha},e.class],style:e.style},[n&&t.createVNode("div",{class:"v-color-picker-preview__eye-dropper",key:"eyeDropper"},[t.createVNode($o,{density:"comfortable",disabled:e.disabled,icon:"$eyeDropper",variant:"plain",onClick:r},null)]),t.createVNode("div",{class:"v-color-picker-preview__dot"},[t.createVNode("div",{style:{background:it(e.color??Ds)}},null)]),t.createVNode("div",{class:"v-color-picker-preview__sliders"},[t.createVNode(Zs,{class:"v-color-picker-preview__track v-color-picker-preview__hue",modelValue:e.color?.h,"onUpdate:modelValue":t=>l("update:color",{...e.color??Ds,h:t}),step:0,min:0,max:360,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null),!e.hideAlpha&&t.createVNode(Zs,{class:"v-color-picker-preview__track v-color-picker-preview__alpha",modelValue:e.color?.a??1,"onUpdate:modelValue":t=>l("update:color",{...e.color??Ds,a:t}),step:1/256,min:0,max:1,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null)])]))),{}}})
var Js={red:{base:"#f44336",lighten5:"#ffebee",lighten4:"#ffcdd2",lighten3:"#ef9a9a",lighten2:"#e57373",lighten1:"#ef5350",darken1:"#e53935",darken2:"#d32f2f",darken3:"#c62828",darken4:"#b71c1c",accent1:"#ff8a80",accent2:"#ff5252",accent3:"#ff1744",accent4:"#d50000"},pink:{base:"#e91e63",lighten5:"#fce4ec",lighten4:"#f8bbd0",lighten3:"#f48fb1",lighten2:"#f06292",lighten1:"#ec407a",darken1:"#d81b60",darken2:"#c2185b",darken3:"#ad1457",darken4:"#880e4f",accent1:"#ff80ab",accent2:"#ff4081",accent3:"#f50057",accent4:"#c51162"},purple:{base:"#9c27b0",lighten5:"#f3e5f5",lighten4:"#e1bee7",lighten3:"#ce93d8",lighten2:"#ba68c8",lighten1:"#ab47bc",darken1:"#8e24aa",darken2:"#7b1fa2",darken3:"#6a1b9a",darken4:"#4a148c",accent1:"#ea80fc",accent2:"#e040fb",accent3:"#d500f9",accent4:"#aa00ff"},deepPurple:{base:"#673ab7",lighten5:"#ede7f6",lighten4:"#d1c4e9",lighten3:"#b39ddb",lighten2:"#9575cd",lighten1:"#7e57c2",darken1:"#5e35b1",darken2:"#512da8",darken3:"#4527a0",darken4:"#311b92",accent1:"#b388ff",accent2:"#7c4dff",accent3:"#651fff",accent4:"#6200ea"},indigo:{base:"#3f51b5",lighten5:"#e8eaf6",lighten4:"#c5cae9",lighten3:"#9fa8da",lighten2:"#7986cb",lighten1:"#5c6bc0",darken1:"#3949ab",darken2:"#303f9f",darken3:"#283593",darken4:"#1a237e",accent1:"#8c9eff",accent2:"#536dfe",accent3:"#3d5afe",accent4:"#304ffe"},blue:{base:"#2196f3",lighten5:"#e3f2fd",lighten4:"#bbdefb",lighten3:"#90caf9",lighten2:"#64b5f6",lighten1:"#42a5f5",darken1:"#1e88e5",darken2:"#1976d2",darken3:"#1565c0",darken4:"#0d47a1",accent1:"#82b1ff",accent2:"#448aff",accent3:"#2979ff",accent4:"#2962ff"},lightBlue:{base:"#03a9f4",lighten5:"#e1f5fe",lighten4:"#b3e5fc",lighten3:"#81d4fa",lighten2:"#4fc3f7",lighten1:"#29b6f6",darken1:"#039be5",darken2:"#0288d1",darken3:"#0277bd",darken4:"#01579b",accent1:"#80d8ff",accent2:"#40c4ff",accent3:"#00b0ff",accent4:"#0091ea"},cyan:{base:"#00bcd4",lighten5:"#e0f7fa",lighten4:"#b2ebf2",lighten3:"#80deea",lighten2:"#4dd0e1",lighten1:"#26c6da",darken1:"#00acc1",darken2:"#0097a7",darken3:"#00838f",darken4:"#006064",accent1:"#84ffff",accent2:"#18ffff",accent3:"#00e5ff",accent4:"#00b8d4"},teal:{base:"#009688",lighten5:"#e0f2f1",lighten4:"#b2dfdb",lighten3:"#80cbc4",lighten2:"#4db6ac",lighten1:"#26a69a",darken1:"#00897b",darken2:"#00796b",darken3:"#00695c",darken4:"#004d40",accent1:"#a7ffeb",accent2:"#64ffda",accent3:"#1de9b6",accent4:"#00bfa5"},green:{base:"#4caf50",lighten5:"#e8f5e9",lighten4:"#c8e6c9",lighten3:"#a5d6a7",lighten2:"#81c784",lighten1:"#66bb6a",darken1:"#43a047",darken2:"#388e3c",darken3:"#2e7d32",darken4:"#1b5e20",accent1:"#b9f6ca",accent2:"#69f0ae",accent3:"#00e676",accent4:"#00c853"},lightGreen:{base:"#8bc34a",lighten5:"#f1f8e9",lighten4:"#dcedc8",lighten3:"#c5e1a5",lighten2:"#aed581",lighten1:"#9ccc65",darken1:"#7cb342",darken2:"#689f38",darken3:"#558b2f",darken4:"#33691e",accent1:"#ccff90",accent2:"#b2ff59",accent3:"#76ff03",accent4:"#64dd17"},lime:{base:"#cddc39",lighten5:"#f9fbe7",lighten4:"#f0f4c3",lighten3:"#e6ee9c",lighten2:"#dce775",lighten1:"#d4e157",darken1:"#c0ca33",darken2:"#afb42b",darken3:"#9e9d24",darken4:"#827717",accent1:"#f4ff81",accent2:"#eeff41",accent3:"#c6ff00",accent4:"#aeea00"},yellow:{base:"#ffeb3b",lighten5:"#fffde7",lighten4:"#fff9c4",lighten3:"#fff59d",lighten2:"#fff176",lighten1:"#ffee58",darken1:"#fdd835",darken2:"#fbc02d",darken3:"#f9a825",darken4:"#f57f17",accent1:"#ffff8d",accent2:"#ffff00",accent3:"#ffea00",accent4:"#ffd600"},amber:{base:"#ffc107",lighten5:"#fff8e1",lighten4:"#ffecb3",lighten3:"#ffe082",lighten2:"#ffd54f",lighten1:"#ffca28",darken1:"#ffb300",darken2:"#ffa000",darken3:"#ff8f00",darken4:"#ff6f00",accent1:"#ffe57f",accent2:"#ffd740",accent3:"#ffc400",accent4:"#ffab00"},orange:{base:"#ff9800",lighten5:"#fff3e0",lighten4:"#ffe0b2",lighten3:"#ffcc80",lighten2:"#ffb74d",lighten1:"#ffa726",darken1:"#fb8c00",darken2:"#f57c00",darken3:"#ef6c00",darken4:"#e65100",accent1:"#ffd180",accent2:"#ffab40",accent3:"#ff9100",accent4:"#ff6d00"},deepOrange:{base:"#ff5722",lighten5:"#fbe9e7",lighten4:"#ffccbc",lighten3:"#ffab91",lighten2:"#ff8a65",lighten1:"#ff7043",darken1:"#f4511e",darken2:"#e64a19",darken3:"#d84315",darken4:"#bf360c",accent1:"#ff9e80",accent2:"#ff6e40",accent3:"#ff3d00",accent4:"#dd2c00"},brown:{base:"#795548",lighten5:"#efebe9",lighten4:"#d7ccc8",lighten3:"#bcaaa4",lighten2:"#a1887f",lighten1:"#8d6e63",darken1:"#6d4c41",darken2:"#5d4037",darken3:"#4e342e",darken4:"#3e2723"},blueGrey:{base:"#607d8b",lighten5:"#eceff1",lighten4:"#cfd8dc",lighten3:"#b0bec5",lighten2:"#90a4ae",lighten1:"#78909c",darken1:"#546e7a",darken2:"#455a64",darken3:"#37474f",darken4:"#263238"},grey:{base:"#9e9e9e",lighten5:"#fafafa",lighten4:"#f5f5f5",lighten3:"#eeeeee",lighten2:"#e0e0e0",lighten1:"#bdbdbd",darken1:"#757575",darken2:"#616161",darken3:"#424242",darken4:"#212121"},shades:{black:"#000000",white:"#ffffff",transparent:"#ffffff00"}}
const eu=ht({swatches:{type:Array,default:()=>function(e){return Object.keys(e).map((t=>{const a=e[t]
return a.base?[a.base,a.darken4,a.darken3,a.darken2,a.darken1,a.lighten1,a.lighten2,a.lighten3,a.lighten4,a.lighten5]:[a.black,a.white,a.transparent]}))}(Js)},disabled:Boolean,color:Object,maxHeight:[Number,String],...yt()},"VColorPickerSwatches")
const tu=Nt({name:"VColorPickerSwatches",props:eu(),emits:{"update:color":e=>!0},setup(e,a){let{emit:l}=a
return Et((()=>t.createVNode("div",{class:["v-color-picker-swatches",e.class],style:[{maxHeight:m(e.maxHeight)},e.style]},[t.createVNode("div",null,[e.swatches.map((a=>t.createVNode("div",{class:"v-color-picker-swatches__swatch"},[a.map((a=>{const o=et(a),n=lt(o),r=rt(o)
return t.createVNode("div",{class:"v-color-picker-swatches__color",onClick:()=>n&&l("update:color",n)},[t.createVNode("div",{style:{background:r}},[e.color&&d(e.color,n)?t.createVNode(Ql,{size:"x-small",icon:"$success",color:mt(a,"#FFFFFF")>2?"white":"black"},null):void 0])])}))])))])]))),{}}}),au=It("v-picker-title"),lu=ht({color:String,...Vl(),...yt(),...nl(),...Sl(),...lo(),...vo(),...vl(),...Ba(),...ba()},"VSheet"),ou=Ct()({name:"VSheet",props:lu(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{backgroundColorClasses:n,backgroundColorStyles:r}=dl((()=>e.color)),{borderClasses:i}=wl(e),{dimensionStyles:s}=rl(e),{elevationClasses:u}=kl(e),{locationStyles:c}=oo(e),{positionClasses:d}=po(e),{roundedClasses:v}=pl(e)
return Et((()=>t.createVNode(e.tag,{class:["v-sheet",o.value,n.value,i.value,u.value,d.value,v.value,e.class],style:[r.value,s.value,c.value,e.style]},l))),{}}}),nu=ht({bgColor:String,divided:Boolean,landscape:Boolean,title:String,hideHeader:Boolean,...lu()},"VPicker"),ru=Ct()({name:"VPicker",props:nu(),setup(e,a){let{slots:l}=a
const{backgroundColorClasses:o,backgroundColorStyles:n}=dl((()=>e.color))
return Et((()=>{const a=ou.filterProps(e),r=!(!e.title&&!l.title)
return t.createVNode(ou,t.mergeProps(a,{color:e.bgColor,class:["v-picker",{"v-picker--divided":e.divided,"v-picker--landscape":e.landscape,"v-picker--with-actions":!!l.actions},e.class],style:e.style}),{default:()=>[!e.hideHeader&&t.createVNode("div",{key:"header",class:[o.value],style:[n.value]},[r&&t.createVNode(au,{key:"picker-title"},{default:()=>[l.title?.()??e.title]}),l.header&&t.createVNode("div",{class:"v-picker__header"},[l.header()])]),t.createVNode("div",{class:"v-picker__body"},[l.default?.()]),l.actions&&t.createVNode(ol,{defaults:{VBtn:{slim:!0,variant:"text"}}},{default:()=>[t.createVNode("div",{class:"v-picker__actions"},[l.actions()])]})]})})),{}}})
function iu(e){const t=e.slice(-2).toUpperCase()
switch(!0){case"GB-alt-variant"===e:return{firstDay:0,firstWeekSize:4}
case"001"===e:return{firstDay:1,firstWeekSize:1}
case"AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE\n    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US\n    VE VI WS YE ZA ZW".includes(t):return{firstDay:0,firstWeekSize:1}
case"AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV\n    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK".includes(t):return{firstDay:1,firstWeekSize:1}
case"AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS\n    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA".includes(t):return{firstDay:1,firstWeekSize:4}
case"AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(t):return{firstDay:6,firstWeekSize:1}
case"MV"===t:return{firstDay:5,firstWeekSize:1}
case"PT"===t:return{firstDay:0,firstWeekSize:4}
default:return null}}function su(e,t,a){const l=a??iu(t)?.firstDay??0,o=new Date(e)
for(;o.getDay()!==l;)o.setDate(o.getDate()-1)
return o}function uu(e){return new Date(e.getFullYear(),e.getMonth(),1)}function cu(e){return new Date(e.getFullYear(),e.getMonth()+1,0)}const du=/^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/
function vu(e){if(null==e)return new Date
if(e instanceof Date)return e
if("string"==typeof e){let t
if(du.test(e))return function(e){const t=e.split("-").map(Number)
return new Date(t[0],t[1]-1,t[2])}(e)
if(t=Date.parse(e),!isNaN(t))return new Date(t)}return null}const pu=new Date(2e3,0,2)
function fu(e,t,a,l){const o=vu(e)??new Date,n=l?.[t]
if("function"==typeof n)return n(o,t,a)
let r={}
switch(t){case"fullDate":r={year:"numeric",month:"long",day:"numeric"}
break
case"fullDateWithWeekday":r={weekday:"long",year:"numeric",month:"long",day:"numeric"}
break
case"normalDate":return`${o.getDate()} ${new Intl.DateTimeFormat(a,{month:"long"}).format(o)}`
case"normalDateWithWeekday":r={weekday:"short",day:"numeric",month:"short"}
break
case"shortDate":r={month:"short",day:"numeric"}
break
case"year":r={year:"numeric"}
break
case"month":r={month:"long"}
break
case"monthShort":r={month:"short"}
break
case"monthAndYear":r={month:"long",year:"numeric"}
break
case"monthAndDate":r={month:"long",day:"numeric"}
break
case"weekday":r={weekday:"long"}
break
case"weekdayShort":r={weekday:"short"}
break
case"dayOfMonth":return new Intl.NumberFormat(a).format(o.getDate())
case"hours12h":r={hour:"numeric",hour12:!0}
break
case"hours24h":r={hour:"numeric",hour12:!1}
break
case"minutes":r={minute:"numeric"}
break
case"seconds":r={second:"numeric"}
break
case"fullTime":r={hour:"numeric",minute:"numeric"}
break
case"fullTime12h":r={hour:"numeric",minute:"numeric",hour12:!0}
break
case"fullTime24h":r={hour:"numeric",minute:"numeric",hour12:!1}
break
case"fullDateTime":r={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric"}
break
case"fullDateTime12h":r={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",hour12:!0}
break
case"fullDateTime24h":r={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1}
break
case"keyboardDate":r={year:"numeric",month:"2-digit",day:"2-digit"}
break
case"keyboardDateTime":return r={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric"},new Intl.DateTimeFormat(a,r).format(o).replace(/, /g," ")
case"keyboardDateTime12h":return r={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",hour12:!0},new Intl.DateTimeFormat(a,r).format(o).replace(/, /g," ")
case"keyboardDateTime24h":return r={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",hour12:!1},new Intl.DateTimeFormat(a,r).format(o).replace(/, /g," ")
default:r=n??{timeZone:"UTC",timeZoneName:"short"}}return new Intl.DateTimeFormat(a,r).format(o)}function mu(e,t){const a=new Date(e)
return a.setDate(a.getDate()+t),a}function gu(e){return e.getFullYear()}function hu(e,t){return e.getTime()>t.getTime()}function yu(e,t){return e.getTime()===t.getTime()}function bu(e,t,a){const l=new Date(e),o=new Date(t)
switch(a){case"years":return l.getFullYear()-o.getFullYear()
case"quarters":return Math.floor((l.getMonth()-o.getMonth()+12*(l.getFullYear()-o.getFullYear()))/4)
case"months":return l.getMonth()-o.getMonth()+12*(l.getFullYear()-o.getFullYear())
case"weeks":return Math.floor((l.getTime()-o.getTime())/6048e5)
case"days":return Math.floor((l.getTime()-o.getTime())/864e5)
case"hours":return Math.floor((l.getTime()-o.getTime())/36e5)
case"minutes":return Math.floor((l.getTime()-o.getTime())/6e4)
case"seconds":return Math.floor((l.getTime()-o.getTime())/1e3)
default:return l.getTime()-o.getTime()}}function Vu(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0)}class wu{constructor(e){this.locale=e.locale,this.formats=e.formats}date(e){return vu(e)}toJsDate(e){return e}toISO(e){return function(e,t){const a=e.toJsDate(t)
return`${a.getFullYear()}-${E(String(a.getMonth()+1),2,"0")}-${E(String(a.getDate()),2,"0")}`}(this,e)}parseISO(e){return function(e){const[t,a,l]=e.split("-").map(Number)
return new Date(t,a-1,l)}(e)}addMinutes(e,t){return function(e,t){const a=new Date(e)
return a.setMinutes(a.getMinutes()+t),a}(e,t)}addHours(e,t){return function(e,t){const a=new Date(e)
return a.setHours(a.getHours()+t),a}(e,t)}addDays(e,t){return mu(e,t)}addWeeks(e,t){return function(e,t){const a=new Date(e)
return a.setDate(a.getDate()+7*t),a}(e,t)}addMonths(e,t){return function(e,t){const a=new Date(e)
return a.setDate(1),a.setMonth(a.getMonth()+t),a}(e,t)}getWeekArray(e,t){const a=void 0!==t?Number(t):void 0
return function(e,t,a){const l=[]
let o=[]
const n=uu(e),r=cu(e),i=a??iu(t)?.firstDay??0,s=(n.getDay()-i+7)%7,u=(r.getDay()-i+7)%7
for(let e=0;e<s;e++){const t=new Date(n)
t.setDate(t.getDate()-(s-e)),o.push(t)}for(let t=1;t<=r.getDate();t++){const a=new Date(e.getFullYear(),e.getMonth(),t)
o.push(a),7===o.length&&(l.push(o),o=[])}for(let e=1;e<7-u;e++){const t=new Date(r)
t.setDate(t.getDate()+e),o.push(t)}return o.length>0&&l.push(o),l}(e,this.locale,a)}startOfWeek(e,t){const a=void 0!==t?Number(t):void 0
return su(e,this.locale,a)}endOfWeek(e){return function(e,t){const a=new Date(e),l=((iu(t)?.firstDay??0)+6)%7
for(;a.getDay()!==l;)a.setDate(a.getDate()+1)
return a}(e,this.locale)}startOfMonth(e){return uu(e)}endOfMonth(e){return cu(e)}format(e,t){return fu(e,t,this.locale,this.formats)}isEqual(e,t){return yu(e,t)}isValid(e){return function(e){const t=new Date(e)
return t instanceof Date&&!isNaN(t.getTime())}(e)}isWithinRange(e,t){return function(e,t){return hu(e,t[0])&&function(e,t){return e.getTime()<t.getTime()}(e,t[1])}(e,t)}isAfter(e,t){return hu(e,t)}isAfterDay(e,t){return function(e,t){return hu(Vu(e),Vu(t))}(e,t)}isBefore(e,t){return!hu(e,t)&&!yu(e,t)}isSameDay(e,t){return function(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}(e,t)}isSameMonth(e,t){return function(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}(e,t)}isSameYear(e,t){return function(e,t){return e.getFullYear()===t.getFullYear()}(e,t)}setMinutes(e,t){return function(e,t){const a=new Date(e)
return a.setMinutes(t),a}(e,t)}setHours(e,t){return function(e,t){const a=new Date(e)
return a.setHours(t),a}(e,t)}setMonth(e,t){return function(e,t){const a=new Date(e)
return a.setMonth(t),a}(e,t)}setDate(e,t){return function(e,t){const a=new Date(e)
return a.setDate(t),a}(e,t)}setYear(e,t){return function(e,t){const a=new Date(e)
return a.setFullYear(t),a}(e,t)}getDiff(e,t,a){return bu(e,t,a)}getWeekdays(e){const t=void 0!==e?Number(e):void 0
return function(e,t){const a=t??iu(e)?.firstDay??0
return f(7).map((t=>{const l=new Date(pu)
return l.setDate(pu.getDate()+a+t),new Intl.DateTimeFormat(e,{weekday:"narrow"}).format(l)}))}(this.locale,t)}getYear(e){return gu(e)}getMonth(e){return function(e){return e.getMonth()}(e)}getWeek(e,t,a){const l=void 0!==t?Number(t):void 0
return function(e,t,a,l){const o=iu(t),n=a??o?.firstDay??0,r=l??o?.firstWeekSize??1
function i(e){const a=new Date(e,0,1)
return 7-bu(a,su(a,t,n),"days")}let s=gu(e)
s<gu(mu(su(e,t,n),6))&&i(s+1)>=r&&s++
const u=new Date(s,0,1),c=i(s)
return 1+bu(e,mu(u,c>=r?c-7:c),"weeks")}(e,this.locale,l,a)}getDate(e){return function(e){return e.getDate()}(e)}getNextMonth(e){return function(e){return new Date(e.getFullYear(),e.getMonth()+1,1)}(e)}getPreviousMonth(e){return function(e){return new Date(e.getFullYear(),e.getMonth()-1,1)}(e)}getHours(e){return function(e){return e.getHours()}(e)}getMinutes(e){return function(e){return e.getMinutes()}(e)}startOfDay(e){return Vu(e)}endOfDay(e){return function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59,999)}(e)}startOfYear(e){return function(e){return new Date(e.getFullYear(),0,1)}(e)}endOfYear(e){return function(e){return new Date(e.getFullYear(),11,31)}(e)}}const Su=Symbol.for("vuetify:date-options"),ku=Symbol.for("vuetify:date-adapter")
function xu(e,a){const l=t.reactive("function"==typeof e.adapter?new e.adapter({locale:e.locale[a.current.value]??a.current.value,formats:e.formats}):e.adapter)
return t.watch(a.current,(t=>{l.locale=e.locale[t]??t??l.locale})),l}function Nu(){const e=t.inject(Su)
if(!e)throw new Error("[Vuetify] Could not find injected date options")
return xu(e,ma())}const Cu=Nt({name:"VColorPicker",props:ht({canvasHeight:{type:[String,Number],default:150},disabled:Boolean,dotSize:{type:[Number,String],default:10},hideCanvas:Boolean,hideSliders:Boolean,hideInputs:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(Ms).includes(e)},modes:{type:Array,default:()=>Object.keys(Ms),validator:e=>Array.isArray(e)&&e.every((e=>Object.keys(Ms).includes(e)))},showSwatches:Boolean,swatches:Array,swatchesMaxHeight:{type:[Number,String],default:150},modelValue:{type:[Object,String]},...nu({hideHeader:!0})},"VColorPicker")(),emits:{"update:modelValue":e=>!0,"update:mode":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"mode"),n=t.ref(null),r=na(e,"modelValue",void 0,(e=>{if(null==e||""===e)return null
let t
try{t=lt(et(e))}catch(e){return Me(e),null}return t}),(t=>t?function(e,t){if(null==t||"string"==typeof t){const a=1!==e.a
if(t?.startsWith("rgb(")){const{r:t,g:l,b:o,a:n}=tt(e)
return`rgb(${t} ${l} ${o}`+(a?` / ${n})`:")")}if(t?.startsWith("hsl(")){const{h:t,s:l,l:o,a:n}=ot(e)
return`hsl(${t} ${Math.round(100*l)} ${Math.round(100*o)}`+(a?` / ${n})`:")")}const l=dt(e)
return 1===e.a?l.slice(0,7):l}if("object"==typeof t){let a
return S(t,["r","g","b"])?a=tt(e):S(t,["h","s","l"])?a=ot(e):S(t,["h","s","v"])&&(a=e),function(e,t){if(t){const{a:t,...a}=e
return a}return e}(a,!S(t,["a"])&&1===e.a)}return e}(t,e.modelValue):null)),i=t.computed((()=>r.value?{...r.value,h:n.value??r.value.h}:null)),{rtlClasses:s}=ha()
let u=!0
t.watch(r,(e=>{u?e&&(n.value=e.h):u=!0}),{immediate:!0})
const c=e=>{u=!1,n.value=e.h,r.value=e}
return t.onBeforeMount((()=>{e.modes.includes(o.value)||(o.value=e.modes[0])})),kt({VSlider:{color:void 0,trackColor:void 0,trackFillColor:void 0}}),Et((()=>{const a=ru.filterProps(e)
return t.createVNode(ru,t.mergeProps(a,{class:["v-color-picker",s.value,e.class],style:[{"--v-color-picker-color-hsv":it({...i.value??Ds,a:1})},e.style]}),{...l,default:()=>t.createVNode(t.Fragment,null,[!e.hideCanvas&&t.createVNode(Ts,{key:"canvas",color:i.value,"onUpdate:color":c,disabled:e.disabled,dotSize:e.dotSize,width:e.width,height:e.canvasHeight},null),(!e.hideSliders||!e.hideInputs)&&t.createVNode("div",{key:"controls",class:"v-color-picker__controls"},[!e.hideSliders&&t.createVNode(Qs,{key:"preview",color:i.value,"onUpdate:color":c,hideAlpha:!o.value.endsWith("a"),disabled:e.disabled},null),!e.hideInputs&&t.createVNode(Ls,{key:"edit",modes:e.modes,mode:o.value,"onUpdate:mode":e=>o.value=e,color:i.value,"onUpdate:color":c,disabled:e.disabled},null)]),e.showSwatches&&t.createVNode(tu,{key:"swatches",color:i.value,"onUpdate:color":c,maxHeight:e.swatchesMaxHeight,swatches:e.swatches,disabled:e.disabled},null)])})})),{}}}),Iu=ht({autoSelectFirst:{type:[Boolean,String]},clearOnSelect:{type:Boolean,default:!0},delimiters:Array,...Oi({filterKeys:["title"]}),...Di({hideNoData:!0,returnObject:!0}),...N(Ni({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...fl({transition:!1})},"VCombobox"),_u=Ct()({name:"VCombobox",props:Iu(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:search":e=>!0,"update:menu":e=>!0},setup(e,l){let{emit:o,slots:n}=l
const{t:r}=ma(),i=t.ref(),s=t.shallowRef(!1),u=t.shallowRef(!0),c=t.shallowRef(!1),v=t.ref(),p=t.ref(),f=t.shallowRef(-1)
let m=!1
const{items:g,transformIn:h,transformOut:y}=kr(e),{textColorClasses:b,textColorStyles:V}=cl((()=>i.value?.color)),w=na(e,"modelValue",[],(e=>h(R(e))),(t=>{const a=y(t)
return e.multiple?a:a[0]??null})),S=dn(e),k=t.computed((()=>!(!e.chips&&!n.chip))),x=t.computed((()=>k.value||!!n.selection)),N=t.shallowRef(e.multiple||x.value?"":w.value[0]?.title??""),C=t.computed({get:()=>N.value,set:t=>{if(N.value=t??"",e.multiple||x.value||(w.value=[wr(e,t)]),t&&e.multiple&&e.delimiters?.length){const a=t.split(new RegExp(`(?:${e.delimiters.join("|")})+`))
a.length>1&&(a.forEach((t=>{(t=t.trim())&&q(wr(e,t))})),N.value="")}t||(f.value=-1),u.value=!t}}),I=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(w.value):"number"==typeof e.counterValue?e.counterValue:e.multiple?w.value.length:C.value.length)),{filteredItems:_,getMatches:B}=Li(e,g,(()=>u.value?"":C.value)),A=t.computed((()=>e.hideSelected?_.value.filter((e=>!w.value.some((t=>t.value===e.value)))):_.value)),T=t.computed((()=>e.hideNoData&&!A.value.length||S.isReadonly.value||S.isDisabled.value)),D=na(e,"menu"),E=t.computed({get:()=>D.value,set:e=>{D.value&&!e&&v.value?.ΨopenChildren.size||e&&T.value||(D.value=e)}}),F=t.toRef((()=>E.value?e.closeText:e.openText))
t.watch(N,(e=>{m?t.nextTick((()=>m=!1)):s.value&&!E.value&&(E.value=!0),o("update:search",e)})),t.watch(w,(t=>{e.multiple||x.value||(N.value=t[0]?.title??"")}))
const $=t.computed((()=>w.value.map((e=>e.value)))),M=t.computed((()=>(!0===e.autoSelectFirst||"exact"===e.autoSelectFirst&&C.value===A.value[0]?.title)&&A.value.length>0&&!u.value&&!c.value)),O=t.ref(),L=Ti(O,i)
function z(t){m=!0,e.openOnClear&&(E.value=!0)}function j(){T.value||(E.value=!0)}function H(e){T.value||(s.value&&(e.preventDefault(),e.stopPropagation()),E.value=!E.value)}function W(e){" "!==e.key&&oe(e)&&i.value?.focus()}function U(t){if(function(e){return e.isComposing&&P.includes(e.key)}(t)||S.isReadonly.value)return
const a=i.value?.selectionStart,l=w.value.length
if(["Enter","ArrowDown","ArrowUp"].includes(t.key)&&t.preventDefault(),["Enter","ArrowDown"].includes(t.key)&&(E.value=!0),["Escape"].includes(t.key)&&(E.value=!1),["Enter","Escape","Tab"].includes(t.key)&&(M.value&&["Enter","Tab"].includes(t.key)&&!w.value.some((e=>{let{value:t}=e
return t===A.value[0].value}))&&q(_.value[0]),u.value=!0),"ArrowDown"===t.key&&M.value&&O.value?.focus("next"),"Enter"===t.key&&C.value&&(q(wr(e,C.value)),x.value&&(N.value="")),["Backspace","Delete"].includes(t.key)){if(!e.multiple&&x.value&&w.value.length>0&&!C.value)return q(w.value[0],!1)
if(~f.value){t.preventDefault()
const e=f.value
q(w.value[f.value],!1),f.value=e>=l-1?l-2:e}else"Backspace"!==t.key||C.value||(f.value=l-1)}else if(e.multiple)if("ArrowLeft"===t.key){if(f.value<0&&a&&a>0)return
const e=f.value>-1?f.value-1:l-1
w.value[e]?f.value=e:(f.value=-1,i.value?.setSelectionRange(C.value.length,C.value.length))}else if("ArrowRight"===t.key){if(f.value<0)return
const e=f.value+1
w.value[e]?f.value=e:(f.value=-1,i.value?.setSelectionRange(0,0))}else~f.value&&oe(t)&&(f.value=-1)}function Y(){e.eager&&p.value?.calculateVisibleItems()}function G(){s.value&&(u.value=!0,i.value?.focus())}function q(a){let l=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
if(a&&!a.props.disabled)if(e.multiple){const t=w.value.findIndex((t=>(e.valueComparator||d)(t.value,a.value))),o=null==l?!~t:l
if(~t){const e=o?[...w.value,a]:[...w.value]
e.splice(t,1),w.value=e}else o&&(w.value=[...w.value,a])
e.clearOnSelect&&(C.value="")}else{const e=!1!==l
w.value=e?[a]:[],N.value=e&&!x.value?a.title:"",t.nextTick((()=>{E.value=!1,u.value=!0}))}}function K(e){s.value=!0,setTimeout((()=>{c.value=!0}))}function X(e){c.value=!1}function Z(t){null!=t&&(""!==t||e.multiple||x.value)||(w.value=[])}return t.watch(s,((t,a)=>{if(!t&&t!==a&&(f.value=-1,E.value=!1,C.value)){if(e.multiple)return void q(wr(e,C.value))
if(!x.value)return
w.value.some((e=>{let{title:t}=e
return t===C.value}))?N.value="":q(wr(e,C.value))}})),t.watch(E,(()=>{if(!e.hideSelected&&E.value&&w.value.length){const t=A.value.findIndex((t=>w.value.some((a=>(e.valueComparator||d)(a.value,t.value)))))
a&&window.requestAnimationFrame((()=>{t>=0&&p.value?.scrollToIndex(t)}))}})),t.watch((()=>e.items),((e,t)=>{E.value||s.value&&!t.length&&e.length&&(E.value=!0)})),Et((()=>{const a=!!(!e.hideNoData||A.value.length||n["prepend-item"]||n["append-item"]||n["no-data"]),l=w.value.length>0,o=Ci.filterProps(e)
return t.createVNode(Ci,t.mergeProps({ref:i},o,{modelValue:C.value,"onUpdate:modelValue":[e=>C.value=e,Z],focused:s.value,"onUpdate:focused":e=>s.value=e,validationValue:w.externalValue,counterValue:I.value,dirty:l,class:["v-combobox",{"v-combobox--active-menu":E.value,"v-combobox--chips":!!e.chips,"v-combobox--selection-slot":!!x.value,"v-combobox--selecting-index":f.value>-1,["v-combobox--"+(e.multiple?"multiple":"single")]:!0},e.class],style:e.style,readonly:S.isReadonly.value,placeholder:l?void 0:e.placeholder,"onClick:clear":z,"onMousedown:control":j,onKeydown:U}),{...n,default:()=>t.createVNode(t.Fragment,null,[t.createVNode(gi,t.mergeProps({ref:v,modelValue:E.value,"onUpdate:modelValue":e=>E.value=e,activator:"parent",contentClass:"v-combobox__content",disabled:T.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterEnter:Y,onAfterLeave:G},e.menuProps),{default:()=>[a&&t.createVNode(Ir,t.mergeProps({ref:O,selected:$.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onKeydown:W,onFocusin:K,onFocusout:X,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},L,e.listProps),{default:()=>[n["prepend-item"]?.(),!A.value.length&&!e.hideNoData&&(n["no-data"]?.()??t.createVNode(pr,{key:"no-data",title:r(e.noDataText)},null)),t.createVNode(Ai,{ref:p,renderless:!0,items:A.value,itemKey:"value"},{default:a=>{let{item:l,index:o,itemRef:r}=a
const i=t.mergeProps(l.props,{ref:r,key:l.value,active:!(!M.value||0!==o)||void 0,onClick:()=>q(l,null)})
return n.item?.({item:l,index:o,props:i})??t.createVNode(pr,t.mergeProps(i,{role:"option"}),{prepend:a=>{let{isSelected:o}=a
return t.createVNode(t.Fragment,null,[e.multiple&&!e.hideSelected?t.createVNode(an,{key:l.value,modelValue:o,ripple:!1,tabindex:"-1"},null):void 0,l.props.prependAvatar&&t.createVNode(Yo,{image:l.props.prependAvatar},null),l.props.prependIcon&&t.createVNode(Ql,{icon:l.props.prependIcon},null)])},title:()=>u.value?l.title:zi("v-combobox",l.title,B(l)?.title)})}}),n["append-item"]?.()]})]}),w.value.map(((a,l)=>{function o(e){e.stopPropagation(),e.preventDefault(),q(a,!1)}const r={"onClick:close":o,onKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),o(e))},onMousedown(e){e.preventDefault(),e.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},i=k.value?!!n.chip:!!n.selection,s=i?ae(k.value?n.chip({item:a,index:l,props:r}):n.selection({item:a,index:l})):void 0
if(!i||s)return t.createVNode("div",{key:a.value,class:["v-combobox__selection",l===f.value&&["v-combobox__selection--selected",b.value]],style:l===f.value?V.value:{}},[k.value?n.chip?t.createVNode(ol,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:a.title}}},{default:()=>[s]}):t.createVNode(Hn,t.mergeProps({key:"chip",closable:e.closableChips,size:"small",text:a.title,disabled:a.props.disabled},r),null):s??t.createVNode("span",{class:"v-combobox__selection-text"},[a.title,e.multiple&&l<w.value.length-1&&t.createVNode("span",{class:"v-combobox__selection-comma"},[t.createTextVNode(",")])])])}))]),"append-inner":function(){for(var a=arguments.length,l=new Array(a),o=0;o<a;o++)l[o]=arguments[o]
return t.createVNode(t.Fragment,null,[n["append-inner"]?.(...l),e.hideNoData&&!e.items.length||!e.menuIcon?void 0:t.createVNode(Ql,{class:"v-combobox__menu-icon",color:i.value?.fieldIconColor,icon:e.menuIcon,onMousedown:H,onClick:ee,"aria-label":r(F.value),title:r(F.value),tabindex:"-1"},null)])}})})),fi({isFocused:s,isPristine:u,menu:E,search:C,selectionIndex:f,filteredItems:_,select:q},i)}}),Pu=ht({modelValue:null,color:String,cancelText:{type:String,default:"$vuetify.confirmEdit.cancel"},okText:{type:String,default:"$vuetify.confirmEdit.ok"},disabled:{type:[Boolean,Array],default:void 0},hideActions:Boolean},"VConfirmEdit"),Bu=Ct()({name:"VConfirmEdit",props:Pu(),emits:{cancel:()=>!0,save:e=>!0,"update:modelValue":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const n=na(e,"modelValue"),r=t.ref()
t.watchEffect((()=>{r.value=structuredClone(t.toRaw(n.value))}))
const{t:i}=ma(),s=t.computed((()=>d(n.value,r.value)))
function u(t){return"boolean"==typeof e.disabled?e.disabled:Array.isArray(e.disabled)?e.disabled.includes(t):s.value}const c=t.computed((()=>u("save"))),v=t.computed((()=>u("cancel")))
function p(){n.value=r.value,l("save",r.value)}function f(){r.value=structuredClone(t.toRaw(n.value)),l("cancel")}function m(a){return t.createVNode(t.Fragment,null,[t.createVNode($o,t.mergeProps({disabled:v.value,variant:"text",color:e.color,onClick:f,text:i(e.cancelText)},a),null),t.createVNode($o,t.mergeProps({disabled:c.value,variant:"text",color:e.color,onClick:p,text:i(e.okText)},a),null)])}let g=!1
return Et((()=>t.createVNode(t.Fragment,null,[o.default?.({model:r,save:p,cancel:f,isPristine:s.value,get actions(){return g=!0,m}}),!e.hideActions&&!g&&m()]))),{save:p,cancel:f,isPristine:s}}}),Ru=ht({expandOnClick:Boolean,showExpand:Boolean,expanded:{type:Array,default:()=>[]}},"DataTable-expand"),Au=Symbol.for("vuetify:datatable:expanded")
function Tu(e){const a=t.toRef((()=>e.expandOnClick)),l=na(e,"expanded",e.expanded,(e=>new Set(e)),(e=>[...e.values()]))
function o(e,t){const a=new Set(l.value)
t?a.add(e.value):a.delete(e.value),l.value=a}function n(e){return l.value.has(e.value)}const r={expand:o,expanded:l,expandOnClick:a,isExpanded:n,toggleExpand:function(e){o(e,!n(e))}}
return t.provide(Au,r),r}function Du(){const e=t.inject(Au)
if(!e)throw new Error("foo")
return e}const Eu=ht({groupBy:{type:Array,default:()=>[]}},"DataTable-group"),Fu=Symbol.for("vuetify:data-table-group")
function $u(e){return{groupBy:na(e,"groupBy")}}function Mu(e){const{disableSort:a,groupBy:l,sortBy:o}=e,n=t.ref(new Set)
function r(e){return n.value.has(e.id)}const i={sortByWithGroups:t.computed((()=>l.value.map((e=>({...e,order:e.order??!1}))).concat(a?.value?[]:o.value))),toggleGroup:function(e){const t=new Set(n.value)
r(e)?t.delete(e.id):t.add(e.id),n.value=t},opened:n,groupBy:l,extractRows:function(e){return function e(t){const a=[]
for(const l of t.items)"type"in l&&"group"===l.type?a.push(...e(l)):a.push(l)
return[...new Set(a)]}({items:e})},isGroupOpen:r}
return t.provide(Fu,i),i}function Ou(){const e=t.inject(Fu)
if(!e)throw new Error("Missing group!")
return e}function Lu(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"root"
if(!t.length)return[]
const o=function(e,t){if(!e.length)return[]
const a=new Map
for(const l of e){const e=v(l.raw,t)
a.has(e)||a.set(e,[]),a.get(e).push(l)}return a}(e,t[0]),n=[],r=t.slice(1)
return o.forEach(((e,o)=>{const i=t[0],s=`${l}_${i}_${o}`
n.push({depth:a,id:s,key:i,value:o,items:r.length?Lu(e,r,a+1,s):e,type:"group"})})),n}function zu(e,t){const a=[]
for(const l of e)"type"in l&&"group"===l.type?(null!=l.value&&a.push(l),(t.has(l.id)||null==l.value)&&a.push(...zu(l.items,t))):a.push(l)
return a}function ju(e,a,l){return{flatItems:t.computed((()=>{if(!a.value.length)return e.value
return zu(Lu(e.value,a.value.map((e=>e.key))),l.value)}))}}function Hu(e){let{page:a,itemsPerPage:l,sortBy:o,groupBy:n,search:r}=e
const i=bt("VDataTable")
let s=null
t.watch((()=>({page:a.value,itemsPerPage:l.value,sortBy:o.value,groupBy:n.value,search:r.value})),(e=>{d(s,e)||(s&&s.search!==e.search&&(a.value=1),i.emit("update:options",e),s=e)}),{deep:!0,immediate:!0})}const Wu=ht({page:{type:[Number,String],default:1},itemsPerPage:{type:[Number,String],default:10}},"DataTable-paginate"),Uu=Symbol.for("vuetify:data-table-pagination")
function Yu(e){return{page:na(e,"page",void 0,(e=>Number(e??1))),itemsPerPage:na(e,"itemsPerPage",void 0,(e=>Number(e??10)))}}function Gu(e){const{page:a,itemsPerPage:l,itemsLength:o}=e,n=t.computed((()=>-1===l.value?0:l.value*(a.value-1))),r=t.computed((()=>-1===l.value?o.value:Math.min(o.value,n.value+l.value))),i=t.computed((()=>-1===l.value||0===o.value?1:Math.ceil(o.value/l.value)))
t.watch([a,i],(()=>{a.value>i.value&&(a.value=i.value)}))
const s={page:a,itemsPerPage:l,startIndex:n,stopIndex:r,pageCount:i,itemsLength:o,nextPage:function(){a.value=A(a.value+1,1,i.value)},prevPage:function(){a.value=A(a.value-1,1,i.value)},setPage:function(e){a.value=A(e,1,i.value)},setItemsPerPage:function(e){l.value=e,a.value=1}}
return t.provide(Uu,s),s}function qu(e){const a=bt("usePaginatedItems"),{items:l,startIndex:o,stopIndex:n,itemsPerPage:r}=e,i=t.computed((()=>r.value<=0?l.value:l.value.slice(o.value,n.value)))
return t.watch(i,(e=>{a.emit("update:currentItems",e)}),{immediate:!0}),{paginatedItems:i}}const Ku={showSelectAll:!1,allSelected:()=>[],select:e=>{let{items:t,value:a}=e
return new Set(a?[t[0]?.value]:[])},selectAll:e=>{let{selected:t}=e
return t}},Xu={showSelectAll:!0,allSelected:e=>{let{currentPage:t}=e
return t},select:e=>{let{items:t,value:a,selected:l}=e
for(const e of t)a?l.add(e.value):l.delete(e.value)
return l},selectAll:e=>{let{value:t,currentPage:a,selected:l}=e
return Xu.select({items:a,value:t,selected:l})}},Zu={showSelectAll:!0,allSelected:e=>{let{allItems:t}=e
return t},select:e=>{let{items:t,value:a,selected:l}=e
for(const e of t)a?l.add(e.value):l.delete(e.value)
return l},selectAll:e=>{let{value:t,allItems:a,selected:l}=e
return Zu.select({items:a,value:t,selected:l})}},Qu=ht({showSelect:Boolean,selectStrategy:{type:[String,Object],default:"page"},modelValue:{type:Array,default:()=>[]},valueComparator:{type:Function,default:d}},"DataTable-select"),Ju=Symbol.for("vuetify:data-table-selection")
function ec(e,a){let{allItems:l,currentPage:o}=a
const n=na(e,"modelValue",e.modelValue,(t=>new Set(R(t).map((t=>l.value.find((a=>e.valueComparator(t,a.value)))?.value??t)))),(e=>[...e.values()])),r=t.computed((()=>l.value.filter((e=>e.selectable)))),i=t.computed((()=>o.value.filter((e=>e.selectable)))),s=t.computed((()=>{if("object"==typeof e.selectStrategy)return e.selectStrategy
switch(e.selectStrategy){case"single":return Ku
case"all":return Zu
default:return Xu}})),u=t.shallowRef(null)
function c(e){return R(e).every((e=>n.value.has(e.value)))}function d(e,t){const a=s.value.select({items:e,value:t,selected:new Set(n.value)})
n.value=a}const v=t.computed((()=>n.value.size>0)),p=t.computed((()=>{const e=s.value.allSelected({allItems:r.value,currentPage:i.value})
return!!e.length&&c(e)})),f={toggleSelect:function(t,a,l){const n=[]
if(a=a??o.value.findIndex((e=>e.value===t.value)),"single"!==e.selectStrategy&&l?.shiftKey&&null!==u.value){const[e,t]=[u.value,a].sort(((e,t)=>e-t))
n.push(...o.value.slice(e,t+1))}else n.push(t),u.value=a
d(n,!c([t]))},select:d,selectAll:function(e){const t=s.value.selectAll({value:e,allItems:r.value,currentPage:i.value,selected:new Set(n.value)})
n.value=t},isSelected:c,isSomeSelected:function(e){return R(e).some((e=>n.value.has(e.value)))},someSelected:v,allSelected:p,showSelectAll:t.toRef((()=>s.value.showSelectAll)),lastSelectedIndex:u,selectStrategy:s}
return t.provide(Ju,f),f}function tc(){const e=t.inject(Ju)
if(!e)throw new Error("Missing selection!")
return e}const ac=ht({sortBy:{type:Array,default:()=>[]},customKeySort:Object,multiSort:Boolean,mustSort:Boolean},"DataTable-sort"),lc=Symbol.for("vuetify:data-table-sort")
function oc(e){return{sortBy:na(e,"sortBy"),mustSort:t.toRef((()=>e.mustSort)),multiSort:t.toRef((()=>e.multiSort))}}function nc(e){const{sortBy:a,mustSort:l,multiSort:o,page:n}=e
const r={sortBy:a,toggleSort:e=>{if(null==e.key)return
let t=a.value.map((e=>({...e})))??[]
const r=t.find((t=>t.key===e.key))
r?"desc"===r.order?l.value&&1===t.length?r.order="asc":t=t.filter((t=>t.key!==e.key)):r.order="desc":o.value?t.push({key:e.key,order:"asc"}):t=[{key:e.key,order:"asc"}],a.value=t,n&&(n.value=1)},isSorted:function(e){return!!a.value.find((t=>t.key===e.key))}}
return t.provide(lc,r),r}function rc(){const e=t.inject(lc)
if(!e)throw new Error("Missing sort!")
return e}function ic(e,a,l,o){const n=ma(),r=t.computed((()=>l.value.length?function(e,t,a,l){const o=new Intl.Collator(a,{sensitivity:"accent",usage:"sort"}),n=e.map((e=>[e,l?.transform?l.transform(e):e]))
return n.sort(((e,a)=>{for(let n=0;n<t.length;n++){let r=!1
const i=t[n].key,s=t[n].order??"asc"
if(!1===s)continue
let u=v(e[1],i),c=v(a[1],i),d=e[0].raw,p=a[0].raw
if("desc"===s&&([u,c]=[c,u],[d,p]=[p,d]),l?.sortRawFunctions?.[i]){const e=l.sortRawFunctions[i](d,p)
if(null==e)continue
if(r=!0,e)return e}if(l?.sortFunctions?.[i]){const e=l.sortFunctions[i](u,c)
if(null==e)continue
if(r=!0,e)return e}if(!r){if(u instanceof Date&&c instanceof Date)return u.getTime()-c.getTime()
if([u,c]=[u,c].map((e=>null!=e?e.toString().toLocaleLowerCase():e)),u!==c)return J(u)&&J(c)?0:J(u)?-1:J(c)?1:isNaN(u)||isNaN(c)?o.compare(u,c):Number(u)-Number(c)}}return 0})).map((e=>{let[t]=e
return t}))}(a.value,l.value,n.current.value,{transform:o?.transform,sortFunctions:{...e.customKeySort,...o?.sortFunctions?.value},sortRawFunctions:o?.sortRawFunctions?.value}):a.value))
return{sortedItems:r}}const sc=ht({items:{type:Array,default:()=>[]},itemValue:{type:[String,Array,Function],default:"id"},itemSelectable:{type:[String,Array,Function],default:null},returnObject:Boolean},"DataIterator-items")
function uc(e,t){return{type:"item",value:e.returnObject?t:p(t,e.itemValue),selectable:p(t,e.itemSelectable,!0),raw:t}}function cc(e){const a=t.computed((()=>function(e,t){const a=[]
for(const l of t)a.push(uc(e,l))
return a}(e,e.items)))
return{items:a}}const dc=ht({search:String,loading:Boolean,...yt(),...sc(),...Qu(),...ac(),...Wu({itemsPerPage:5}),...Ru(),...Eu(),...Oi(),...Ba(),...fl({transition:{component:Ua,hideOnLeave:!0}})},"VDataIterator"),vc=Ct()({name:"VDataIterator",props:dc(),emits:{"update:modelValue":e=>!0,"update:groupBy":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:expanded":e=>!0,"update:currentItems":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"groupBy"),n=t.toRef((()=>e.search)),{items:r}=cc(e),{filteredItems:i}=Li(e,r,n,{transform:e=>e.raw}),{sortBy:s,multiSort:u,mustSort:c}=oc(e),{page:d,itemsPerPage:v}=Yu(e),{toggleSort:p}=nc({sortBy:s,multiSort:u,mustSort:c,page:d}),{sortByWithGroups:f,opened:m,extractRows:g,isGroupOpen:h,toggleGroup:y}=Mu({groupBy:o,sortBy:s}),{sortedItems:b}=ic(e,i,f,{transform:e=>e.raw}),{flatItems:V}=ju(b,o,m),w=t.toRef((()=>V.value.length)),{startIndex:S,stopIndex:k,pageCount:x,prevPage:N,nextPage:C,setItemsPerPage:I,setPage:_}=Gu({page:d,itemsPerPage:v,itemsLength:w}),{paginatedItems:P}=qu({items:V,startIndex:S,stopIndex:k,itemsPerPage:v}),B=t.computed((()=>g(P.value))),{isSelected:R,select:A,selectAll:T,toggleSelect:D}=ec(e,{allItems:r,currentPage:B}),{isExpanded:E,toggleExpand:F}=Tu(e)
Hu({page:d,itemsPerPage:v,sortBy:s,groupBy:o,search:n})
const $=t.computed((()=>({page:d.value,itemsPerPage:v.value,sortBy:s.value,pageCount:x.value,toggleSort:p,prevPage:N,nextPage:C,setPage:_,setItemsPerPage:I,isSelected:R,select:A,selectAll:T,toggleSelect:D,isExpanded:E,toggleExpand:F,isGroupOpen:h,toggleGroup:y,items:B.value,groupedItems:P.value})))
return Et((()=>t.createVNode(e.tag,{class:["v-data-iterator",{"v-data-iterator--loading":e.loading},e.class],style:e.style},{default:()=>[l.header?.($.value),t.createVNode(ml,{transition:e.transition},{default:()=>[e.loading?t.createVNode(uo,{key:"loader",name:"v-data-iterator",active:!0},{default:e=>l.loader?.(e)}):t.createVNode("div",{key:"items"},[P.value.length?l.default?.($.value):l["no-data"]?.()])]}),l.footer?.($.value)]}))),{}}})
const pc=ht({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1==0},totalVisible:[Number,String],firstIcon:{type:Ft,default:"$first"},prevIcon:{type:Ft,default:"$prev"},nextIcon:{type:Ft,default:"$next"},lastIcon:{type:Ft,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...Vl(),...yt(),...Al(),...Sl(),...vl(),...Kl(),...Ba({tag:"nav"}),...ba(),...Fl({variant:"text"})},"VPagination"),fc=Ct()({name:"VPagination",props:pc(),emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=na(e,"modelValue"),{t:r,n:i}=ma(),{isRtl:s}=ha(),{themeClasses:u}=Ca(e),{width:c}=Cn(),d=t.shallowRef(-1)
kt(void 0,{scoped:!0})
const{resizeRef:v}=Xt((e=>{if(!e.length)return
const{target:t,contentRect:a}=e[0],l=t.querySelector(".v-pagination__list > *")
if(!l)return
const o=a.width,n=l.offsetWidth+2*parseFloat(getComputedStyle(l).marginRight)
d.value=h(o,n)})),p=t.computed((()=>parseInt(e.length,10))),m=t.computed((()=>parseInt(e.start,10))),g=t.computed((()=>null!=e.totalVisible?parseInt(e.totalVisible,10):d.value>=0?d.value:h(c.value,58)))
function h(t,a){const l=e.showFirstLastPage?5:3
return Math.max(0,Math.floor(Number(((t-a*l)/a).toFixed(2))))}const y=t.computed((()=>{if(p.value<=0||isNaN(p.value)||p.value>Number.MAX_SAFE_INTEGER)return[]
if(g.value<=0)return[]
if(1===g.value)return[n.value]
if(p.value<=g.value)return f(p.value,m.value)
const t=g.value%2==0,a=t?g.value/2:Math.floor(g.value/2),l=t?a:a+1,o=p.value-a
if(l-n.value>=0)return[...f(Math.max(1,g.value-1),m.value),e.ellipsis,p.value]
if(n.value-o>=(t?1:0)){const t=g.value-1,a=p.value-t+m.value
return[m.value,e.ellipsis,...f(t,a)]}{const t=Math.max(1,g.value-2),a=1===t?n.value:n.value-Math.ceil(t/2)+m.value
return[m.value,e.ellipsis,...f(t,a),e.ellipsis,p.value]}}))
function b(e,t,a){e.preventDefault(),n.value=t,a&&o(a,t)}const{refs:w,updateRef:S}=function(){const e=t.ref([])
return t.onBeforeUpdate((()=>e.value=[])),{refs:e,updateRef:function(t,a){e.value[a]=t}}}()
kt({VPaginationBtn:{color:t.toRef((()=>e.color)),border:t.toRef((()=>e.border)),density:t.toRef((()=>e.density)),size:t.toRef((()=>e.size)),variant:t.toRef((()=>e.variant)),rounded:t.toRef((()=>e.rounded)),elevation:t.toRef((()=>e.elevation))}})
const k=t.computed((()=>y.value.map(((t,a)=>{const l=e=>S(e,a)
if("string"==typeof t)return{isActive:!1,key:`ellipsis-${a}`,page:t,props:{ref:l,ellipsis:!0,icon:!0,disabled:!0}}
{const a=t===n.value
return{isActive:a,key:t,page:i(t),props:{ref:l,ellipsis:!1,icon:!0,disabled:!!e.disabled||Number(e.length)<2,color:a?e.activeColor:e.color,"aria-current":a,"aria-label":r(a?e.currentPageAriaLabel:e.pageAriaLabel,t),onClick:e=>b(e,t)}}}})))),x=t.computed((()=>{const t=!!e.disabled||n.value<=m.value,a=!!e.disabled||n.value>=m.value+p.value-1
return{first:e.showFirstLastPage?{icon:s.value?e.lastIcon:e.firstIcon,onClick:e=>b(e,m.value,"first"),disabled:t,"aria-label":r(e.firstAriaLabel),"aria-disabled":t}:void 0,prev:{icon:s.value?e.nextIcon:e.prevIcon,onClick:e=>b(e,n.value-1,"prev"),disabled:t,"aria-label":r(e.previousAriaLabel),"aria-disabled":t},next:{icon:s.value?e.prevIcon:e.nextIcon,onClick:e=>b(e,n.value+1,"next"),disabled:a,"aria-label":r(e.nextAriaLabel),"aria-disabled":a},last:e.showFirstLastPage?{icon:s.value?e.firstIcon:e.lastIcon,onClick:e=>b(e,m.value+p.value-1,"last"),disabled:a,"aria-label":r(e.lastAriaLabel),"aria-disabled":a}:void 0}}))
function N(){const e=n.value-m.value
w.value[e]?.$el.focus()}function C(a){a.key===V.left&&!e.disabled&&n.value>Number(e.start)?(n.value=n.value-1,t.nextTick(N)):a.key===V.right&&!e.disabled&&n.value<m.value+p.value-1&&(n.value=n.value+1,t.nextTick(N))}return Et((()=>t.createVNode(e.tag,{ref:v,class:["v-pagination",u.value,e.class],style:e.style,role:"navigation","aria-label":r(e.ariaLabel),onKeydown:C,"data-test":"v-pagination-root"},{default:()=>[t.createVNode("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&t.createVNode("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[l.first?l.first(x.value.first):t.createVNode($o,t.mergeProps({_as:"VPaginationBtn"},x.value.first),null)]),t.createVNode("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[l.prev?l.prev(x.value.prev):t.createVNode($o,t.mergeProps({_as:"VPaginationBtn"},x.value.prev),null)]),k.value.map(((e,a)=>t.createVNode("li",{key:e.key,class:["v-pagination__item",{"v-pagination__item--is-active":e.isActive}],"data-test":"v-pagination-item"},[l.item?l.item(e):t.createVNode($o,t.mergeProps({_as:"VPaginationBtn"},e.props),{default:()=>[e.page]})]))),t.createVNode("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[l.next?l.next(x.value.next):t.createVNode($o,t.mergeProps({_as:"VPaginationBtn"},x.value.next),null)]),e.showFirstLastPage&&t.createVNode("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[l.last?l.last(x.value.last):t.createVNode($o,t.mergeProps({_as:"VPaginationBtn"},x.value.last),null)])])]}))),{}}}),mc=ht({prevIcon:{type:Ft,default:"$prev"},nextIcon:{type:Ft,default:"$next"},firstIcon:{type:Ft,default:"$first"},lastIcon:{type:Ft,default:"$last"},itemsPerPageText:{type:String,default:"$vuetify.dataFooter.itemsPerPageText"},pageText:{type:String,default:"$vuetify.dataFooter.pageText"},firstPageLabel:{type:String,default:"$vuetify.dataFooter.firstPage"},prevPageLabel:{type:String,default:"$vuetify.dataFooter.prevPage"},nextPageLabel:{type:String,default:"$vuetify.dataFooter.nextPage"},lastPageLabel:{type:String,default:"$vuetify.dataFooter.lastPage"},itemsPerPageOptions:{type:Array,default:()=>[{value:10,title:"10"},{value:25,title:"25"},{value:50,title:"50"},{value:100,title:"100"},{value:-1,title:"$vuetify.dataFooter.itemsPerPageAll"}]},showCurrentPage:Boolean},"VDataTableFooter"),gc=Ct()({name:"VDataTableFooter",props:mc(),setup(e,a){let{slots:l}=a
const{t:o}=ma(),{page:n,pageCount:r,startIndex:i,stopIndex:s,itemsLength:u,itemsPerPage:c,setItemsPerPage:d}=function(){const e=t.inject(Uu)
if(!e)throw new Error("Missing pagination!")
return e}(),v=t.computed((()=>e.itemsPerPageOptions.map((e=>"number"==typeof e?{value:e,title:-1===e?o("$vuetify.dataFooter.itemsPerPageAll"):String(e)}:{...e,title:isNaN(Number(e.title))?o(e.title):e.title}))))
return Et((()=>{const a=fc.filterProps(e)
return t.createVNode("div",{class:"v-data-table-footer"},[l.prepend?.(),t.createVNode("div",{class:"v-data-table-footer__items-per-page"},[t.createVNode("span",null,[o(e.itemsPerPageText)]),t.createVNode(Fi,{items:v.value,modelValue:c.value,"onUpdate:modelValue":e=>d(Number(e)),density:"compact",variant:"outlined","hide-details":!0},null)]),t.createVNode("div",{class:"v-data-table-footer__info"},[t.createVNode("div",null,[o(e.pageText,u.value?i.value+1:0,s.value,u.value)])]),t.createVNode("div",{class:"v-data-table-footer__pagination"},[t.createVNode(fc,t.mergeProps({modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,density:"comfortable","first-aria-label":e.firstPageLabel,"last-aria-label":e.lastPageLabel,length:r.value,"next-aria-label":e.nextPageLabel,"previous-aria-label":e.prevPageLabel,rounded:!0,"show-first-last-page":!0,"total-visible":e.showCurrentPage?1:0,variant:"plain"},a),null)])])})),{}}}),hc=(yc={align:{type:String,default:"start"},fixed:Boolean,fixedOffset:[Number,String],height:[Number,String],lastFixed:Boolean,noPadding:Boolean,tag:String,width:[Number,String],maxWidth:[Number,String],nowrap:Boolean},bc=(e,a)=>{let{slots:l}=a
const o=e.tag??"td"
return t.createVNode(o,{class:["v-data-table__td",{"v-data-table-column--fixed":e.fixed,"v-data-table-column--last-fixed":e.lastFixed,"v-data-table-column--no-padding":e.noPadding,"v-data-table-column--nowrap":e.nowrap},`v-data-table-column--align-${e.align}`],style:{height:m(e.height),width:m(e.width),maxWidth:m(e.maxWidth),left:m(e.fixedOffset||null)}},{default:()=>[l.default?.()]})},bc.props=yc,bc)
var yc,bc
const Vc=ht({headers:Array},"DataTable-header"),wc=Symbol.for("vuetify:data-table-headers"),Sc={title:"",sortable:!1},kc={...Sc,width:48}
function xc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]
if(e.children)for(const a of e.children)xc(a,t)
else t.push(e)
return t}function Nc(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set
for(const a of e)a.key&&t.add(a.key),a.children&&Nc(a.children,t)
return t}function Cc(e){if(e.key)return"data-table-group"===e.key?Sc:["data-table-expand","data-table-select"].includes(e.key)?kc:void 0}function Ic(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
return e.children?Math.max(t,...e.children.map((e=>Ic(e,t+1)))):t}function _c(e,t){const a=[]
let l=0
const o=function(){const e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map((e=>({element:e,priority:0})))
return{enqueue:(t,a)=>{let l=!1
for(let o=0;o<e.length;o++)if(e[o].priority>a){e.splice(o,0,{element:t,priority:a}),l=!0
break}l||e.push({element:t,priority:a})},size:()=>e.length,count:()=>{let t=0
if(!e.length)return 0
const a=Math.floor(e[0].priority)
for(let l=0;l<e.length;l++)Math.floor(e[l].priority)===a&&(t+=1)
return t},dequeue:()=>e.shift()}}(e)
for(;o.size()>0;){let e=o.count()
const n=[]
let r=1
for(;e>0;){const{element:a,priority:i}=o.dequeue(),s=t-l-Ic(a)
if(n.push({...a,rowspan:s??1,colspan:a.children?xc(a).length:1}),a.children)for(const e of a.children){const t=i%1+r/Math.pow(10,l+2)
o.enqueue(e,l+s+t)}r+=1,e-=1}l+=1,a.push(n)}return{columns:e.map((e=>xc(e))).flat(),headers:a}}function Pc(e){const t=[]
for(const a of e){const e={...Cc(a),...a},l=e.key??("string"==typeof e.value?e.value:null),o=e.value??l??null,n={...e,key:l,value:o,sortable:e.sortable??(null!=e.key||!!e.sort),children:e.children?Pc(e.children):void 0}
t.push(n)}return t}function Bc(e,a){const l=t.ref([]),o=t.ref([]),n=t.ref({}),r=t.ref({}),i=t.ref({})
t.watchEffect((()=>{const s=(e.headers||Object.keys(e.items[0]??{}).map((e=>({key:e,title:t.capitalize(e)})))).slice(),u=Nc(s)
a?.groupBy?.value.length&&!u.has("data-table-group")&&s.unshift({key:"data-table-group",title:"Group"}),a?.showSelect?.value&&!u.has("data-table-select")&&s.unshift({key:"data-table-select"}),a?.showExpand?.value&&!u.has("data-table-expand")&&s.push({key:"data-table-expand"})
const c=Pc(s)
!function(e){let t=!1
function a(e){if(e)if(arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&(e.fixed=!0),e.fixed)if(e.children)for(let t=e.children.length-1;t>=0;t--)a(e.children[t],!0)
else t?isNaN(Number(e.width))?Oe(`Multiple fixed columns should have a static width (key: ${e.key})`):e.minWidth=Math.max(Number(e.width)||0,Number(e.minWidth)||0):e.lastFixed=!0,t=!0
else if(e.children)for(let t=e.children.length-1;t>=0;t--)a(e.children[t])
else t=!1}for(let t=e.length-1;t>=0;t--)a(e[t])
function l(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
if(!e)return t
if(e.children){e.fixedOffset=t
for(const a of e.children)t=l(a,t)}else e.fixed&&(e.fixedOffset=t,t+=parseFloat(e.width||"0")||0)
return t}let o=0
for(const t of e)o=l(t,o)}(c)
const d=Math.max(...c.map((e=>Ic(e))))+1,v=_c(c,d)
l.value=v.headers,o.value=v.columns
const p=v.headers.flat(1)
for(const e of p)e.key&&(e.sortable&&(e.sort&&(n.value[e.key]=e.sort),e.sortRaw&&(r.value[e.key]=e.sortRaw)),e.filter&&(i.value[e.key]=e.filter))}))
const s={headers:l,columns:o,sortFunctions:n,sortRawFunctions:r,filterFunctions:i}
return t.provide(wc,s),s}function Rc(){const e=t.inject(wc)
if(!e)throw new Error("Missing headers!")
return e}const Ac=ht({color:String,disableSort:Boolean,fixedHeader:Boolean,multiSort:Boolean,sortAscIcon:{type:Ft,default:"$sortAsc"},sortDescIcon:{type:Ft,default:"$sortDesc"},headerProps:{type:Object},sticky:Boolean,...Nn(),...io()},"VDataTableHeaders"),Tc=Ct()({name:"VDataTableHeaders",props:Ac(),setup(e,a){let{slots:l}=a
const{t:o}=ma(),{toggleSort:n,sortBy:r,isSorted:i}=rc(),{someSelected:s,allSelected:u,selectAll:c,showSelectAll:d}=tc(),{columns:v,headers:p}=Rc(),{loaderClasses:f}=so(e)
function g(t,a){if(e.sticky||e.fixedHeader||t.fixed)return{position:"sticky",left:t.fixed?m(t.fixedOffset):void 0,top:e.sticky||e.fixedHeader?`calc(var(--v-table-header-height) * ${a})`:void 0}}function h(t){const a=r.value.find((e=>e.key===t.key))
return a?"asc"===a.order?e.sortAscIcon:e.sortDescIcon:e.sortAscIcon}const{backgroundColorClasses:y,backgroundColorStyles:b}=dl((()=>e.color)),{displayClasses:V,mobile:w}=Cn(e),S=t.computed((()=>({headers:p.value,columns:v.value,toggleSort:n,isSorted:i,sortBy:r.value,someSelected:s.value,allSelected:u.value,selectAll:c,getSortIcon:h}))),k=t.computed((()=>["v-data-table__th",{"v-data-table__th--sticky":e.sticky||e.fixedHeader},V.value,f.value])),x=a=>{let{column:o,x:v,y:p}=a
const f="data-table-select"===o.key||"data-table-expand"===o.key,V=t.mergeProps(e.headerProps??{},o.headerProps??{})
return t.createVNode(hc,t.mergeProps({tag:"th",align:o.align,class:[{"v-data-table__th--sortable":o.sortable&&!e.disableSort,"v-data-table__th--sorted":i(o),"v-data-table__th--fixed":o.fixed},...k.value],style:{width:m(o.width),minWidth:m(o.minWidth),maxWidth:m(o.maxWidth),...g(o,p)},colspan:o.colspan,rowspan:o.rowspan,onClick:o.sortable?()=>n(o):void 0,fixed:o.fixed,nowrap:o.nowrap,lastFixed:o.lastFixed,noPadding:f},V),{default:()=>{const a=`header.${o.key}`,v={column:o,selectAll:c,isSorted:i,toggleSort:n,sortBy:r.value,someSelected:s.value,allSelected:u.value,getSortIcon:h}
return l[a]?l[a](v):"data-table-select"===o.key?l["header.data-table-select"]?.(v)??(d.value&&t.createVNode(an,{modelValue:u.value,indeterminate:s.value&&!u.value,"onUpdate:modelValue":c},null)):t.createVNode("div",{class:"v-data-table-header__content"},[t.createVNode("span",null,[o.title]),o.sortable&&!e.disableSort&&t.createVNode(Ql,{key:"icon",class:"v-data-table-header__sort-icon",icon:h(o)},null),e.multiSort&&i(o)&&t.createVNode("div",{key:"badge",class:["v-data-table-header__sort-badge",...y.value],style:b.value},[r.value.findIndex((e=>e.key===o.key))+1])])}})},N=()=>{const a=t.mergeProps(e.headerProps??{}??{}),d=t.computed((()=>v.value.filter((t=>t?.sortable&&!e.disableSort)))),f=t.computed((()=>{if(null!=v.value.find((e=>"data-table-select"===e.key)))return u.value?"$checkboxOn":s.value?"$checkboxIndeterminate":"$checkboxOff"}))
return t.createVNode(hc,t.mergeProps({tag:"th",class:[...k.value],colspan:p.value.length+1},a),{default:()=>[t.createVNode("div",{class:"v-data-table-header__content"},[t.createVNode(Fi,{chips:!0,class:"v-data-table__td-sort-select",clearable:!0,density:"default",items:d.value,label:o("$vuetify.dataTable.sortBy"),multiple:e.multiSort,variant:"underlined","onClick:clear":()=>r.value=[],appendIcon:f.value,"onClick:append":()=>c(!u.value)},{...l,chip:e=>t.createVNode(Hn,{onClick:e.item.raw?.sortable?()=>n(e.item.raw):void 0,onMousedown:e=>{e.preventDefault(),e.stopPropagation()}},{default:()=>[e.item.title,t.createVNode(Ql,{class:["v-data-table__td-sort-icon",i(e.item.raw)&&"v-data-table__td-sort-icon-active"],icon:h(e.item.raw),size:"small"},null)]})})])]})}
Et((()=>w.value?t.createVNode("tr",null,[t.createVNode(N,null,null)]):t.createVNode(t.Fragment,null,[l.headers?l.headers(S.value):p.value.map(((e,a)=>t.createVNode("tr",null,[e.map(((e,l)=>t.createVNode(x,{column:e,x:l,y:a},null)))]))),e.loading&&t.createVNode("tr",{class:"v-data-table-progress"},[t.createVNode("th",{colspan:v.value.length},[t.createVNode(uo,{name:"v-data-table-progress",absolute:!0,active:!0,color:"boolean"==typeof e.loading?void 0:e.loading,indeterminate:!0},{default:l.loader})])])])))}}),Dc=ht({item:{type:Object,required:!0}},"VDataTableGroupHeaderRow"),Ec=Ct()({name:"VDataTableGroupHeaderRow",props:Dc(),setup(e,a){let{slots:l}=a
const{isGroupOpen:o,toggleGroup:n,extractRows:r}=Ou(),{isSelected:i,isSomeSelected:s,select:u}=tc(),{columns:c}=Rc(),d=t.computed((()=>r([e.item])))
return()=>t.createVNode("tr",{class:"v-data-table-group-header-row",style:{"--v-data-table-group-header-row-depth":e.item.depth}},[c.value.map((a=>{if("data-table-group"===a.key){const a=o(e.item)?"$expand":"$next",r=()=>n(e.item)
return l["data-table-group"]?.({item:e.item,count:d.value.length,props:{icon:a,onClick:r}})??t.createVNode(hc,{class:"v-data-table-group-header-row__column"},{default:()=>[t.createVNode($o,{size:"small",variant:"text",icon:a,onClick:r},null),t.createVNode("span",null,[e.item.value]),t.createVNode("span",null,[t.createTextVNode("("),d.value.length,t.createTextVNode(")")])]})}if("data-table-select"===a.key){const e=i(d.value),a=s(d.value)&&!e,o=e=>u(d.value,e)
return l["data-table-select"]?.({props:{modelValue:e,indeterminate:a,"onUpdate:modelValue":o}})??t.createVNode("td",null,[t.createVNode(an,{modelValue:e,indeterminate:a,"onUpdate:modelValue":o},null)])}return t.createVNode("td",null,null)}))])}}),Fc=ht({index:Number,item:Object,cellProps:[Object,Function],onClick:G(),onContextmenu:G(),onDblclick:G(),...Nn()},"VDataTableRow"),$c=Ct()({name:"VDataTableRow",props:Fc(),setup(e,a){let{slots:l}=a
const{displayClasses:o,mobile:n}=Cn(e,"v-data-table__tr"),{isSelected:r,toggleSelect:i,someSelected:s,allSelected:u,selectAll:c}=tc(),{isExpanded:d,toggleExpand:p}=Du(),{toggleSort:f,sortBy:m,isSorted:g}=rc(),{columns:h}=Rc()
Et((()=>t.createVNode("tr",{class:["v-data-table__tr",{"v-data-table__tr--clickable":!!(e.onClick||e.onContextmenu||e.onDblclick)},o.value],onClick:e.onClick,onContextmenu:e.onContextmenu,onDblclick:e.onDblclick},[e.item&&h.value.map(((a,o)=>{const h=e.item,y=`item.${a.key}`,b=`header.${a.key}`,V={index:e.index,item:h.raw,internalItem:h,value:v(h.columns,a.key),column:a,isSelected:r,toggleSelect:i,isExpanded:d,toggleExpand:p},w={column:a,selectAll:c,isSorted:g,toggleSort:f,sortBy:m.value,someSelected:s.value,allSelected:u.value,getSortIcon:()=>""},S="function"==typeof e.cellProps?e.cellProps({index:V.index,item:V.item,internalItem:V.internalItem,value:V.value,column:a}):e.cellProps,k="function"==typeof a.cellProps?a.cellProps({index:V.index,item:V.item,internalItem:V.internalItem,value:V.value}):a.cellProps
return t.createVNode(hc,t.mergeProps({align:a.align,class:{"v-data-table__td--expanded-row":"data-table-expand"===a.key,"v-data-table__td--select-row":"data-table-select"===a.key},fixed:a.fixed,fixedOffset:a.fixedOffset,lastFixed:a.lastFixed,maxWidth:n.value?void 0:a.maxWidth,noPadding:"data-table-select"===a.key||"data-table-expand"===a.key,nowrap:a.nowrap,width:n.value?void 0:a.width},S,k),{default:()=>{if("data-table-select"===a.key)return l["item.data-table-select"]?.({...V,props:{disabled:!h.selectable,modelValue:r([h]),onClick:t.withModifiers((()=>i(h)),["stop"])}})??t.createVNode(an,{disabled:!h.selectable,modelValue:r([h]),onClick:t.withModifiers((t=>i(h,e.index,t)),["stop"])},null)
if("data-table-expand"===a.key)return l["item.data-table-expand"]?.({...V,props:{icon:d(h)?"$collapse":"$expand",size:"small",variant:"text",onClick:t.withModifiers((()=>p(h)),["stop"])}})??t.createVNode($o,{icon:d(h)?"$collapse":"$expand",size:"small",variant:"text",onClick:t.withModifiers((()=>p(h)),["stop"])},null)
if(l[y]&&!n.value)return l[y](V)
const o=t.toDisplayString(V.value)
return n.value?t.createVNode(t.Fragment,null,[t.createVNode("div",{class:"v-data-table__td-title"},[l[b]?.(w)??a.title]),t.createVNode("div",{class:"v-data-table__td-value"},[l[y]?.(V)??o])]):o}})}))])))}}),Mc=ht({loading:[Boolean,String],loadingText:{type:String,default:"$vuetify.dataIterator.loadingText"},hideNoData:Boolean,items:{type:Array,default:()=>[]},noDataText:{type:String,default:"$vuetify.noDataText"},rowProps:[Object,Function],cellProps:[Object,Function],...Nn()},"VDataTableRows"),Oc=Ct()({name:"VDataTableRows",inheritAttrs:!1,props:Mc(),setup(e,a){let{attrs:l,slots:o}=a
const{columns:n}=Rc(),{expandOnClick:r,toggleExpand:i,isExpanded:s}=Du(),{isSelected:u,toggleSelect:c}=tc(),{toggleGroup:d,isGroupOpen:v}=Ou(),{t:p}=ma(),{mobile:f}=Cn(e)
return Et((()=>!e.loading||e.items.length&&!o.loading?e.loading||e.items.length||e.hideNoData?t.createVNode(t.Fragment,null,[e.items.map(((a,p)=>{if("group"===a.type){const e={index:p,item:a,columns:n.value,isExpanded:s,toggleExpand:i,isSelected:u,toggleSelect:c,toggleGroup:d,isGroupOpen:v}
return o["group-header"]?o["group-header"](e):t.createVNode(Ec,t.mergeProps({key:`group-header_${a.id}`,item:a},Bt(l,":group-header",(()=>e))),o)}const m={index:p,item:a.raw,internalItem:a,columns:n.value,isExpanded:s,toggleExpand:i,isSelected:u,toggleSelect:c},g={...m,props:t.mergeProps({key:`item_${a.key??a.index}`,onClick:r.value?()=>{i(a)}:void 0,index:p,item:a,cellProps:e.cellProps,mobile:f.value},Bt(l,":row",(()=>m)),"function"==typeof e.rowProps?e.rowProps({item:m.item,index:m.index,internalItem:m.internalItem}):e.rowProps)}
return t.createVNode(t.Fragment,{key:g.props.key},[o.item?o.item(g):t.createVNode($c,g.props,o),s(a)&&o["expanded-row"]?.(m)])}))]):t.createVNode("tr",{class:"v-data-table-rows-no-data",key:"no-data"},[t.createVNode("td",{colspan:n.value.length},[o["no-data"]?.()??p(e.noDataText)])]):t.createVNode("tr",{class:"v-data-table-rows-loading",key:"loading"},[t.createVNode("td",{colspan:n.value.length},[o.loading?.()??p(e.loadingText)])]))),{}}}),Lc=ht({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...yt(),...Al(),...Ba(),...ba()},"VTable"),zc=Ct()({name:"VTable",props:Lc(),setup(e,a){let{slots:l,emit:o}=a
const{themeClasses:n}=Ca(e),{densityClasses:r}=Tl(e)
return Et((()=>t.createVNode(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!l.top,"v-table--has-bottom":!!l.bottom,"v-table--hover":e.hover},n.value,r.value,e.class],style:e.style},{default:()=>[l.top?.(),l.default?t.createVNode("div",{class:"v-table__wrapper",style:{height:m(e.height)}},[t.createVNode("table",null,[l.default()])]):l.wrapper?.(),l.bottom?.()]}))),{}}}),jc=ht({items:{type:Array,default:()=>[]},itemValue:{type:[String,Array,Function],default:"id"},itemSelectable:{type:[String,Array,Function],default:null},rowProps:[Object,Function],cellProps:[Object,Function],returnObject:Boolean},"DataTable-items")
function Hc(e,t,a){return t.map(((t,l)=>function(e,t,a,l){const o=e.returnObject?t:p(t,e.itemValue),n=p(t,e.itemSelectable,!0),r=l.reduce(((e,a)=>(null!=a.key&&(e[a.key]=p(t,a.value)),e)),{})
return{type:"item",key:e.returnObject?p(t,e.itemValue):o,index:a,value:o,selectable:n,columns:r,raw:t}}(e,t,l,a)))}function Wc(e,a){return{items:t.computed((()=>Hc(e,e.items,a.value)))}}const Uc=ht({...Mc(),hideDefaultBody:Boolean,hideDefaultFooter:Boolean,hideDefaultHeader:Boolean,width:[String,Number],search:String,...Ru(),...Eu(),...Vc(),...jc(),...Qu(),...ac(),...Ac(),...Lc()},"DataTable"),Yc=ht({...Wu(),...Uc(),...Oi(),...mc()},"VDataTable"),Gc=Ct()({name:"VDataTable",props:Yc(),emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:groupBy":e=>!0,"update:expanded":e=>!0,"update:currentItems":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const{groupBy:n}=$u(e),{sortBy:r,multiSort:i,mustSort:s}=oc(e),{page:u,itemsPerPage:c}=Yu(e),{disableSort:d}=t.toRefs(e),{columns:v,headers:p,sortFunctions:f,sortRawFunctions:m,filterFunctions:g}=Bc(e,{groupBy:n,showSelect:t.toRef((()=>e.showSelect)),showExpand:t.toRef((()=>e.showExpand))}),{items:h}=Wc(e,v),y=t.toRef((()=>e.search)),{filteredItems:b}=Li(e,h,y,{transform:e=>e.columns,customKeyFilter:g}),{toggleSort:V}=nc({sortBy:r,multiSort:i,mustSort:s,page:u}),{sortByWithGroups:w,opened:S,extractRows:k,isGroupOpen:x,toggleGroup:N}=Mu({groupBy:n,sortBy:r,disableSort:d}),{sortedItems:C}=ic(e,b,w,{transform:e=>({...e.raw,...e.columns}),sortFunctions:f,sortRawFunctions:m}),{flatItems:I}=ju(C,n,S),_=t.computed((()=>I.value.length)),{startIndex:P,stopIndex:B,pageCount:R,setItemsPerPage:A}=Gu({page:u,itemsPerPage:c,itemsLength:_}),{paginatedItems:T}=qu({items:I,startIndex:P,stopIndex:B,itemsPerPage:c}),D=t.computed((()=>k(T.value))),{isSelected:E,select:F,selectAll:$,toggleSelect:M,someSelected:O,allSelected:L}=ec(e,{allItems:h,currentPage:D}),{isExpanded:z,toggleExpand:j}=Tu(e)
Hu({page:u,itemsPerPage:c,sortBy:r,groupBy:n,search:y}),kt({VDataTableRows:{hideNoData:t.toRef((()=>e.hideNoData)),noDataText:t.toRef((()=>e.noDataText)),loading:t.toRef((()=>e.loading)),loadingText:t.toRef((()=>e.loadingText))}})
const H=t.computed((()=>({page:u.value,itemsPerPage:c.value,sortBy:r.value,pageCount:R.value,toggleSort:V,setItemsPerPage:A,someSelected:O.value,allSelected:L.value,isSelected:E,select:F,selectAll:$,toggleSelect:M,isExpanded:z,toggleExpand:j,isGroupOpen:x,toggleGroup:N,items:D.value.map((e=>e.raw)),internalItems:D.value,groupedItems:T.value,columns:v.value,headers:p.value})))
return Et((()=>{const a=gc.filterProps(e),n=Tc.filterProps(e),r=Oc.filterProps(e),i=zc.filterProps(e)
return t.createVNode(zc,t.mergeProps({class:["v-data-table",{"v-data-table--show-select":e.showSelect,"v-data-table--loading":e.loading},e.class],style:e.style},i,{fixedHeader:e.fixedHeader||e.sticky}),{top:()=>o.top?.(H.value),default:()=>o.default?o.default(H.value):t.createVNode(t.Fragment,null,[o.colgroup?.(H.value),!e.hideDefaultHeader&&t.createVNode("thead",{key:"thead"},[t.createVNode(Tc,n,o)]),o.thead?.(H.value),!e.hideDefaultBody&&t.createVNode("tbody",null,[o["body.prepend"]?.(H.value),o.body?o.body(H.value):t.createVNode(Oc,t.mergeProps(l,r,{items:T.value}),o),o["body.append"]?.(H.value)]),o.tbody?.(H.value),o.tfoot?.(H.value)]),bottom:()=>o.bottom?o.bottom(H.value):!e.hideDefaultFooter&&t.createVNode(t.Fragment,null,[t.createVNode(hr,null,null),t.createVNode(gc,a,{prepend:o["footer.prepend"]})])})})),{}}}),qc=ht({...N(Uc(),["hideDefaultFooter"]),...Eu(),...Pi(),...Oi()},"VDataTableVirtual"),Kc=Ct()({name:"VDataTableVirtual",props:qc(),emits:{"update:modelValue":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:groupBy":e=>!0,"update:expanded":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const{groupBy:n}=$u(e),{sortBy:r,multiSort:i,mustSort:s}=oc(e),{disableSort:u}=t.toRefs(e),{columns:c,headers:d,filterFunctions:v,sortFunctions:p,sortRawFunctions:f}=Bc(e,{groupBy:n,showSelect:t.toRef((()=>e.showSelect)),showExpand:t.toRef((()=>e.showExpand))}),{items:g}=Wc(e,c),h=t.toRef((()=>e.search)),{filteredItems:y}=Li(e,g,h,{transform:e=>e.columns,customKeyFilter:v}),{toggleSort:b}=nc({sortBy:r,multiSort:i,mustSort:s}),{sortByWithGroups:V,opened:w,extractRows:S,isGroupOpen:k,toggleGroup:x}=Mu({groupBy:n,sortBy:r,disableSort:u}),{sortedItems:N}=ic(e,y,V,{transform:e=>({...e.raw,...e.columns}),sortFunctions:p,sortRawFunctions:f}),{flatItems:C}=ju(N,n,w),I=t.computed((()=>S(C.value))),{isSelected:_,select:P,selectAll:B,toggleSelect:R,someSelected:A,allSelected:T}=ec(e,{allItems:I,currentPage:I}),{isExpanded:D,toggleExpand:E}=Tu(e),{containerRef:F,markerRef:$,paddingTop:M,paddingBottom:O,computedItems:L,handleItemResize:z,handleScroll:j,handleScrollend:H,calculateVisibleItems:W,scrollToIndex:U}=Bi(e,C),Y=t.computed((()=>L.value.map((e=>e.raw))))
Hu({sortBy:r,page:t.shallowRef(1),itemsPerPage:t.shallowRef(-1),groupBy:n,search:h}),kt({VDataTableRows:{hideNoData:t.toRef((()=>e.hideNoData)),noDataText:t.toRef((()=>e.noDataText)),loading:t.toRef((()=>e.loading)),loadingText:t.toRef((()=>e.loadingText))}})
const G=t.computed((()=>({sortBy:r.value,toggleSort:b,someSelected:A.value,allSelected:T.value,isSelected:_,select:P,selectAll:B,toggleSelect:R,isExpanded:D,toggleExpand:E,isGroupOpen:k,toggleGroup:x,items:I.value.map((e=>e.raw)),internalItems:I.value,groupedItems:C.value,columns:c.value,headers:d.value})))
return Et((()=>{const a=Tc.filterProps(e),n=Oc.filterProps(e),r=zc.filterProps(e)
return t.createVNode(zc,t.mergeProps({class:["v-data-table",{"v-data-table--loading":e.loading},e.class],style:e.style},r,{fixedHeader:e.fixedHeader||e.sticky}),{top:()=>o.top?.(G.value),wrapper:()=>t.createVNode("div",{ref:F,onScrollPassive:j,onScrollend:H,class:"v-table__wrapper",style:{height:m(e.height)}},[t.createVNode("table",null,[o.colgroup?.(G.value),!e.hideDefaultHeader&&t.createVNode("thead",{key:"thead"},[t.createVNode(Tc,a,o)]),o.thead?.(G.value),!e.hideDefaultBody&&t.createVNode("tbody",{key:"tbody"},[t.createVNode("tr",{ref:$,style:{height:m(M.value),border:0}},[t.createVNode("td",{colspan:c.value.length,style:{height:0,border:0}},null)]),o["body.prepend"]?.(G.value),t.createVNode(Oc,t.mergeProps(l,n,{items:Y.value}),{...o,item:e=>t.createVNode(_i,{key:e.internalItem.index,renderless:!0,"onUpdate:height":t=>z(e.internalItem.index,t)},{default:a=>{let{itemRef:l}=a
return o.item?.({...e,itemRef:l})??t.createVNode($c,t.mergeProps(e.props,{ref:l,key:e.internalItem.index,index:e.internalItem.index}),o)}})}),o["body.append"]?.(G.value),t.createVNode("tr",{style:{height:m(O.value),border:0}},[t.createVNode("td",{colspan:c.value.length,style:{height:0,border:0}},null)])]),o.tbody?.(G.value),o.tfoot?.(G.value)])]),bottom:()=>o.bottom?.(G.value)})})),{calculateVisibleItems:W,scrollToIndex:U}}}),Xc=ht({itemsLength:{type:[Number,String],required:!0},...Wu(),...Uc(),...mc()},"VDataTableServer"),Zc=Ct()({name:"VDataTableServer",props:Xc(),emits:{"update:modelValue":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:expanded":e=>!0,"update:groupBy":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const{groupBy:n}=$u(e),{sortBy:r,multiSort:i,mustSort:s}=oc(e),{page:u,itemsPerPage:c}=Yu(e),{disableSort:d}=t.toRefs(e),v=t.computed((()=>parseInt(e.itemsLength,10))),{columns:p,headers:f}=Bc(e,{groupBy:n,showSelect:t.toRef((()=>e.showSelect)),showExpand:t.toRef((()=>e.showExpand))}),{items:m}=Wc(e,p),{toggleSort:g}=nc({sortBy:r,multiSort:i,mustSort:s,page:u}),{opened:h,isGroupOpen:y,toggleGroup:b,extractRows:V}=Mu({groupBy:n,sortBy:r,disableSort:d}),{pageCount:w,setItemsPerPage:S}=Gu({page:u,itemsPerPage:c,itemsLength:v}),{flatItems:k}=ju(m,n,h),{isSelected:x,select:N,selectAll:C,toggleSelect:I,someSelected:_,allSelected:P}=ec(e,{allItems:m,currentPage:m}),{isExpanded:B,toggleExpand:R}=Tu(e),A=t.computed((()=>V(m.value)))
Hu({page:u,itemsPerPage:c,sortBy:r,groupBy:n,search:t.toRef((()=>e.search))}),t.provide("v-data-table",{toggleSort:g,sortBy:r}),kt({VDataTableRows:{hideNoData:t.toRef((()=>e.hideNoData)),noDataText:t.toRef((()=>e.noDataText)),loading:t.toRef((()=>e.loading)),loadingText:t.toRef((()=>e.loadingText))}})
const T=t.computed((()=>({page:u.value,itemsPerPage:c.value,sortBy:r.value,pageCount:w.value,toggleSort:g,setItemsPerPage:S,someSelected:_.value,allSelected:P.value,isSelected:x,select:N,selectAll:C,toggleSelect:I,isExpanded:B,toggleExpand:R,isGroupOpen:y,toggleGroup:b,items:A.value.map((e=>e.raw)),internalItems:A.value,groupedItems:k.value,columns:p.value,headers:f.value})))
Et((()=>{const a=gc.filterProps(e),n=Tc.filterProps(e),r=Oc.filterProps(e),i=zc.filterProps(e)
return t.createVNode(zc,t.mergeProps({class:["v-data-table",{"v-data-table--loading":e.loading},e.class],style:e.style},i,{fixedHeader:e.fixedHeader||e.sticky}),{top:()=>o.top?.(T.value),default:()=>o.default?o.default(T.value):t.createVNode(t.Fragment,null,[o.colgroup?.(T.value),!e.hideDefaultHeader&&t.createVNode("thead",{key:"thead",class:"v-data-table__thead",role:"rowgroup"},[t.createVNode(Tc,n,o)]),o.thead?.(T.value),!e.hideDefaultBody&&t.createVNode("tbody",{class:"v-data-table__tbody",role:"rowgroup"},[o["body.prepend"]?.(T.value),o.body?o.body(T.value):t.createVNode(Oc,t.mergeProps(l,r,{items:k.value}),o),o["body.append"]?.(T.value)]),o.tbody?.(T.value),o.tfoot?.(T.value)]),bottom:()=>o.bottom?o.bottom(T.value):!e.hideDefaultFooter&&t.createVNode(t.Fragment,null,[t.createVNode(hr,null,null),t.createVNode(gc,a,{prepend:o["footer.prepend"]})])})}))}}),Qc=ht({fluid:{type:Boolean,default:!1},...yt(),...nl(),...Ba()},"VContainer"),Jc=Ct()({name:"VContainer",props:Qc(),setup(e,a){let{slots:l}=a
const{rtlClasses:o}=ha(),{dimensionStyles:n}=rl(e)
return Et((()=>t.createVNode(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},o.value,e.class],style:[n.value,e.style]},l))),{}}}),ed=yn.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}),td=yn.reduce(((e,a)=>(e["offset"+t.capitalize(a)]={type:[String,Number],default:null},e)),{}),ad=yn.reduce(((e,a)=>(e["order"+t.capitalize(a)]={type:[String,Number],default:null},e)),{}),ld={col:Object.keys(ed),offset:Object.keys(td),order:Object.keys(ad)}
function od(e,t,a){let l=e
if(null!=a&&!1!==a){if(t){l+=`-${t.replace(e,"")}`}return"col"===e&&(l="v-"+l),"col"!==e||""!==a&&!0!==a?(l+=`-${a}`,l.toLowerCase()):l.toLowerCase()}}const nd=["auto","start","end","center","baseline","stretch"],rd=ht({cols:{type:[Boolean,String,Number],default:!1},...ed,offset:{type:[String,Number],default:null},...td,order:{type:[String,Number],default:null},...ad,alignSelf:{type:String,default:null,validator:e=>nd.includes(e)},...yt(),...Ba()},"VCol"),id=Ct()({name:"VCol",props:rd(),setup(e,a){let{slots:l}=a
const o=t.computed((()=>{const t=[]
let a
for(a in ld)ld[a].forEach((l=>{const o=e[l],n=od(a,l,o)
n&&t.push(n)}))
const l=t.some((e=>e.startsWith("v-col-")))
return t.push({"v-col":!l||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),t}))
return()=>t.h(e.tag,{class:[o.value,e.class],style:e.style},l.default?.())}}),sd=["start","end","center"],ud=["space-between","space-around","space-evenly"]
function cd(e,a){return yn.reduce(((l,o)=>(l[e+t.capitalize(o)]=a(),l)),{})}const dd=[...sd,"baseline","stretch"],vd=e=>dd.includes(e),pd=cd("align",(()=>({type:String,default:null,validator:vd}))),fd=[...sd,...ud],md=e=>fd.includes(e),gd=cd("justify",(()=>({type:String,default:null,validator:md}))),hd=[...sd,...ud,"stretch"],yd=e=>hd.includes(e),bd=cd("alignContent",(()=>({type:String,default:null,validator:yd}))),Vd={align:Object.keys(pd),justify:Object.keys(gd),alignContent:Object.keys(bd)},wd={align:"align",justify:"justify",alignContent:"align-content"}
function Sd(e,t,a){let l=wd[e]
if(null!=a){if(t){l+=`-${t.replace(e,"")}`}return l+=`-${a}`,l.toLowerCase()}}const kd=ht({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:vd},...pd,justify:{type:String,default:null,validator:md},...gd,alignContent:{type:String,default:null,validator:yd},...bd,...yt(),...Ba()},"VRow"),xd=Ct()({name:"VRow",props:kd(),setup(e,a){let{slots:l}=a
const o=t.computed((()=>{const t=[]
let a
for(a in Vd)Vd[a].forEach((l=>{const o=e[l],n=Sd(a,l,o)
n&&t.push(n)}))
return t.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),t}))
return()=>t.h(e.tag,{class:["v-row",o.value,e.class],style:e.style},l.default?.())}}),Nd=It("v-spacer","div","VSpacer"),Cd=ht({active:{type:[String,Array],default:void 0},controlHeight:[Number,String],disabled:{type:[Boolean,String,Array],default:null},nextIcon:{type:Ft,default:"$next"},prevIcon:{type:Ft,default:"$prev"},modeIcon:{type:Ft,default:"$subgroup"},text:String,viewMode:{type:String,default:"month"}},"VDatePickerControls"),Id=Ct()({name:"VDatePickerControls",props:Cd(),emits:{"click:year":()=>!0,"click:month":()=>!0,"click:prev":()=>!0,"click:next":()=>!0,"click:text":()=>!0},setup(e,a){let{emit:l}=a
const o=t.computed((()=>Array.isArray(e.disabled)?e.disabled.includes("text"):!!e.disabled)),n=t.computed((()=>Array.isArray(e.disabled)?e.disabled.includes("mode"):!!e.disabled)),r=t.computed((()=>Array.isArray(e.disabled)?e.disabled.includes("prev"):!!e.disabled)),i=t.computed((()=>Array.isArray(e.disabled)?e.disabled.includes("next"):!!e.disabled))
function s(){l("click:prev")}function u(){l("click:next")}function c(){l("click:year")}function d(){l("click:month")}return Et((()=>t.createVNode("div",{class:["v-date-picker-controls"],style:{"--v-date-picker-controls-height":m(e.controlHeight)}},[t.createVNode($o,{class:"v-date-picker-controls__month-btn","data-testid":"month-btn",disabled:o.value,text:e.text,variant:"text",rounded:!0,onClick:d},null),t.createVNode($o,{class:"v-date-picker-controls__mode-btn","data-testid":"year-btn",disabled:n.value,density:"comfortable",icon:e.modeIcon,variant:"text",onClick:c},null),t.createVNode(Nd,null,null),t.createVNode("div",{class:"v-date-picker-controls__month"},[t.createVNode($o,{"data-testid":"prev-month",disabled:r.value,density:"comfortable",icon:e.prevIcon,variant:"text",onClick:s},null),t.createVNode($o,{"data-testid":"next-month",disabled:i.value,icon:e.nextIcon,density:"comfortable",variant:"text",onClick:u},null)])]))),{}}}),_d=ht({appendIcon:Ft,color:String,header:String,transition:String,onClick:G()},"VDatePickerHeader"),Pd=Ct()({name:"VDatePickerHeader",props:_d(),emits:{click:()=>!0,"click:append":()=>!0},setup(e,a){let{emit:l,slots:o}=a
const{backgroundColorClasses:n,backgroundColorStyles:r}=dl((()=>e.color))
function i(){l("click")}function s(){l("click:append")}return Et((()=>{const a=!(!o.default&&!e.header),l=!(!o.append&&!e.appendIcon)
return t.createVNode("div",{class:["v-date-picker-header",{"v-date-picker-header--clickable":!!e.onClick},n.value],style:r.value,onClick:i},[o.prepend&&t.createVNode("div",{key:"prepend",class:"v-date-picker-header__prepend"},[o.prepend()]),a&&t.createVNode(ml,{key:"content",name:e.transition},{default:()=>[t.createVNode("div",{key:e.header,class:"v-date-picker-header__content"},[o.default?.()??e.header])]}),l&&t.createVNode("div",{class:"v-date-picker-header__append"},[o.append?t.createVNode(ol,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VBtn:{icon:e.appendIcon,variant:"text"}}},{default:()=>[o.append?.()]}):t.createVNode($o,{key:"append-btn",icon:e.appendIcon,variant:"text",onClick:s},null)])])})),{}}}),Bd=ht({allowedDates:[Array,Function],disabled:{type:Boolean,default:null},displayValue:null,modelValue:Array,month:[Number,String],max:null,min:null,showAdjacentMonths:Boolean,year:[Number,String],weekdays:{type:Array,default:()=>[0,1,2,3,4,5,6]},weeksInMonth:{type:String,default:"dynamic"},firstDayOfWeek:{type:[Number,String],default:void 0}},"calendar")
const Rd=ht({color:String,hideWeekdays:Boolean,multiple:[Boolean,Number,String],showWeek:Boolean,transition:{type:String,default:"picker-transition"},reverseTransition:{type:String,default:"picker-reverse-transition"},...N(Bd(),["displayValue"])},"VDatePickerMonth"),Ad=Ct()({name:"VDatePickerMonth",props:Rd(),emits:{"update:modelValue":e=>!0,"update:month":e=>!0,"update:year":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const n=t.ref(),{daysInMonth:r,model:i,weekNumbers:s}=function(e){const a=Nu(),l=na(e,"modelValue",[],(e=>R(e).map((e=>a.date(e))))),o=t.computed((()=>e.displayValue?a.date(e.displayValue):l.value.length>0?a.date(l.value[0]):e.min?a.date(e.min):Array.isArray(e.allowedDates)?a.date(e.allowedDates[0]):a.date())),n=na(e,"year",void 0,(e=>{const t=null!=e?Number(e):a.getYear(o.value)
return a.startOfYear(a.setYear(a.date(),t))}),(e=>a.getYear(e))),r=na(e,"month",void 0,(e=>{const t=null!=e?Number(e):a.getMonth(o.value),l=a.setYear(a.startOfMonth(a.date()),a.getYear(n.value))
return a.setMonth(l,t)}),(e=>a.getMonth(e))),i=t.computed((()=>{const t=a.toJsDate(a.startOfWeek(a.date(),e.firstDayOfWeek)).getDay()
return[0,1,2,3,4,5,6].map((e=>(e+t)%7))})),s=t.computed((()=>{const t=a.getWeekArray(r.value,e.firstDayOfWeek),l=t.flat()
if("static"===e.weeksInMonth&&l.length<42){const e=l[l.length-1]
let o=[]
for(let n=1;n<=42-l.length;n++)o.push(a.addDays(e,n)),n%7==0&&(t.push(o),o=[])}return t}))
function u(t,o){return t.filter((e=>i.value.includes(a.toJsDate(e).getDay()))).map(((t,n)=>{const i=a.toISO(t),s=!a.isSameMonth(t,r.value),u=a.isSameDay(t,a.startOfMonth(r.value)),c=a.isSameDay(t,a.endOfMonth(r.value)),d=a.isSameDay(t,r.value)
return{date:t,formatted:a.format(t,"keyboardDate"),isAdjacent:s,isDisabled:p(t),isEnd:c,isHidden:s&&!e.showAdjacentMonths,isSame:d,isSelected:l.value.some((e=>a.isSameDay(t,e))),isStart:u,isToday:a.isSameDay(t,o),isWeekEnd:n%7==6,isWeekStart:n%7==0,isoDate:i,localized:a.format(t,"dayOfMonth"),month:a.getMonth(t),year:a.getYear(t)}}))}const c=t.computed((()=>{const t=a.startOfWeek(o.value,e.firstDayOfWeek),l=[]
for(let e=0;e<=6;e++)l.push(a.addDays(t,e))
return u(l,a.date())})),d=t.computed((()=>u(s.value.flat(),a.date()))),v=t.computed((()=>s.value.map((t=>t.length?a.getWeek(t[0],e.firstDayOfWeek):null))))
function p(t){if(e.disabled)return!0
const l=a.date(t)
return!((!e.min||!a.isAfter(a.date(e.min),l))&&(!e.max||!a.isAfter(l,a.date(e.max)))&&(Array.isArray(e.allowedDates)&&e.allowedDates.length>0?e.allowedDates.some((e=>a.isSameDay(a.date(e),l))):"function"==typeof e.allowedDates?e.allowedDates(l):e.weekdays.includes(a.toJsDate(l).getDay())))}return{displayValue:o,daysInMonth:d,daysInWeek:c,genDays:u,model:l,weeksInMonth:s,weekDays:i,weekNumbers:v}}(e),u=Nu(),c=t.shallowRef(),d=t.shallowRef(),v=t.shallowRef(!1),p=t.toRef((()=>v.value?e.reverseTransition:e.transition))
"range"===e.multiple&&i.value.length>0&&(c.value=i.value[0],i.value.length>1&&(d.value=i.value[i.value.length-1]))
const f=t.computed((()=>{const t=["number","string"].includes(typeof e.multiple)?Number(e.multiple):1/0
return i.value.length>=t}))
function m(t){"range"===e.multiple?function(e){const t=u.startOfDay(e)
if(0===i.value.length?c.value=void 0:1===i.value.length&&(c.value=i.value[0],d.value=void 0),c.value)if(d.value)c.value=e,d.value=void 0,i.value=[c.value]
else{if(u.isSameDay(t,c.value))return c.value=void 0,void(i.value=[])
u.isBefore(t,c.value)?(d.value=u.endOfDay(c.value),c.value=t):d.value=u.endOfDay(t)
const e=u.getDiff(d.value,c.value,"days"),a=[c.value]
for(let t=1;t<e;t++){const e=u.addDays(c.value,t)
a.push(e)}a.push(d.value),i.value=a}else c.value=t,i.value=[c.value]}(t):e.multiple?function(e){const t=i.value.findIndex((t=>u.isSameDay(t,e)))
if(-1===t)i.value=[...i.value,e]
else{const e=[...i.value]
e.splice(t,1),i.value=e}}(t):i.value=[t]}t.watch(r,((e,t)=>{t&&(v.value=u.isBefore(e[0].date,t[0].date))})),Et((()=>t.createVNode("div",{class:"v-date-picker-month"},[e.showWeek&&t.createVNode("div",{key:"weeks",class:"v-date-picker-month__weeks"},[!e.hideWeekdays&&t.createVNode("div",{key:"hide-week-days",class:"v-date-picker-month__day"},[t.createTextVNode(" ")]),s.value.map((e=>t.createVNode("div",{class:["v-date-picker-month__day","v-date-picker-month__day--adjacent"]},[e])))]),t.createVNode(ml,{name:p.value},{default:()=>[t.createVNode("div",{ref:n,key:r.value[0].date?.toString(),class:"v-date-picker-month__days"},[!e.hideWeekdays&&u.getWeekdays(e.firstDayOfWeek).map((e=>t.createVNode("div",{class:["v-date-picker-month__day","v-date-picker-month__weekday"]},[e]))),r.value.map(((a,l)=>{const n={props:{class:"v-date-picker-month__day-btn",color:a.isSelected||a.isToday?e.color:void 0,disabled:a.isDisabled,icon:!0,ripple:!1,text:a.localized,variant:a.isSelected?"flat":a.isToday?"outlined":"text",onClick:()=>m(a.date)},item:a,i:l}
return f.value&&!a.isSelected&&(a.isDisabled=!0),t.createVNode("div",{class:["v-date-picker-month__day",{"v-date-picker-month__day--adjacent":a.isAdjacent,"v-date-picker-month__day--hide-adjacent":a.isHidden,"v-date-picker-month__day--selected":a.isSelected,"v-date-picker-month__day--week-end":a.isWeekEnd,"v-date-picker-month__day--week-start":a.isWeekStart}],"data-v-date":a.isDisabled?void 0:a.isoDate},[(e.showAdjacentMonths||!a.isAdjacent)&&(o.day?.(n)??t.createVNode($o,n.props,null))])}))])]})])))}}),Td=ht({color:String,height:[String,Number],min:null,max:null,modelValue:Number,year:Number},"VDatePickerMonths"),Dd=Ct()({name:"VDatePickerMonths",props:Td(),emits:{"update:modelValue":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const n=Nu(),r=na(e,"modelValue"),i=t.computed((()=>{let t=n.startOfYear(n.date())
return e.year&&(t=n.setYear(t,e.year)),f(12).map((a=>{const l=n.format(t,"monthShort"),o=!!(e.min&&n.isAfter(n.startOfMonth(n.date(e.min)),t)||e.max&&n.isAfter(t,n.startOfMonth(n.date(e.max))))
return t=n.getNextMonth(t),{isDisabled:o,text:l,value:a}}))}))
return t.watchEffect((()=>{r.value=r.value??n.getMonth(n.date())})),Et((()=>t.createVNode("div",{class:"v-date-picker-months",style:{height:m(e.height)}},[t.createVNode("div",{class:"v-date-picker-months__content"},[i.value.map(((a,n)=>{const i={active:r.value===n,color:r.value===n?e.color:void 0,disabled:a.isDisabled,rounded:!0,text:a.text,variant:r.value===a.value?"flat":"text",onClick:()=>function(e){if(r.value===e)return void l("update:modelValue",r.value)
r.value=e}(n)}
return o.month?.({month:a,i:n,props:i})??t.createVNode($o,t.mergeProps({key:"month"},i),null)}))])]))),{}}}),Ed=ht({color:String,height:[String,Number],min:null,max:null,modelValue:Number},"VDatePickerYears"),Fd=Ct()({name:"VDatePickerYears",props:Ed(),emits:{"update:modelValue":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const n=Nu(),r=na(e,"modelValue"),i=t.computed((()=>{const t=n.getYear(n.date())
let a=t-100,l=t+52
e.min&&(a=n.getYear(n.date(e.min))),e.max&&(l=n.getYear(n.date(e.max)))
let o=n.startOfYear(n.date())
return o=n.setYear(o,a),f(l-a+1,a).map((e=>{const t=n.format(o,"year")
return o=n.setYear(o,n.getYear(o)+1),{text:t,value:e}}))}))
t.watchEffect((()=>{r.value=r.value??n.getYear(n.date())}))
const s=le()
return t.onMounted((async()=>{await t.nextTick(),s.el?.scrollIntoView({block:"center"})})),Et((()=>t.createVNode("div",{class:"v-date-picker-years",style:{height:m(e.height)}},[t.createVNode("div",{class:"v-date-picker-years__content"},[i.value.map(((a,n)=>{const i={ref:r.value===a.value?s:void 0,active:r.value===a.value,color:r.value===a.value?e.color:void 0,rounded:!0,text:a.text,variant:r.value===a.value?"flat":"text",onClick:()=>{r.value!==a.value?r.value=a.value:l("update:modelValue",r.value)}}
return o.year?.({year:a,i:n,props:i})??t.createVNode($o,t.mergeProps({key:"month"},i),null)}))])]))),{}}}),$d=ht({header:{type:String,default:"$vuetify.datePicker.header"},headerColor:String,...Cd(),...Rd({weeksInMonth:"static"}),...N(Td(),["modelValue"]),...N(Ed(),["modelValue"]),...nu({title:"$vuetify.datePicker.title"}),modelValue:null},"VDatePicker"),Md=Ct()({name:"VDatePicker",props:$d(),emits:{"update:modelValue":e=>!0,"update:month":e=>!0,"update:year":e=>!0,"update:viewMode":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const n=Nu(),{t:r}=ma(),{rtlClasses:i}=ha(),s=na(e,"modelValue",void 0,(e=>R(e).map((e=>n.date(e)))),(t=>e.multiple?t:t[0])),u=na(e,"viewMode"),c=t.computed((()=>{const t=n.date(e.min)
return e.min&&n.isValid(t)?t:null})),d=t.computed((()=>{const t=n.date(e.max)
return e.max&&n.isValid(t)?t:null})),v=t.computed((()=>{const e=n.date()
let t=e
return s.value?.[0]?t=n.date(s.value[0]):c.value&&n.isBefore(e,c.value)?t=c.value:d.value&&n.isAfter(e,d.value)&&(t=d.value),t&&n.isValid(t)?t:e})),p=t.toRef((()=>e.headerColor??e.color)),f=t.ref(Number(e.month??n.getMonth(n.startOfMonth(v.value)))),m=t.ref(Number(e.year??n.getYear(n.startOfYear(n.setMonth(v.value,f.value))))),g=t.shallowRef(!1),h=t.computed((()=>e.multiple&&s.value.length>1?r("$vuetify.datePicker.itemsSelected",s.value.length):s.value[0]&&n.isValid(s.value[0])?n.format(n.date(s.value[0]),"normalDateWithWeekday"):r(e.header))),y=t.computed((()=>{let e=n.date()
return e=n.setDate(e,1),e=n.setMonth(e,f.value),e=n.setYear(e,m.value),n.format(e,"monthAndYear")})),b=t.toRef((()=>`date-picker-header${g.value?"-reverse":""}-transition`)),V=t.computed((()=>{if(e.disabled)return!0
const t=[]
if("month"!==u.value)t.push("prev","next")
else{let e=n.date()
if(e=n.startOfMonth(e),e=n.setMonth(e,f.value),e=n.setYear(e,m.value),c.value){const a=n.addDays(n.startOfMonth(e),-1)
n.isAfter(c.value,a)&&t.push("prev")}if(d.value){const a=n.addDays(n.endOfMonth(e),1)
n.isAfter(a,d.value)&&t.push("next")}}return t}))
function w(){f.value<11?f.value++:(m.value++,f.value=0,_(m.value)),I(f.value)}function S(){f.value>0?f.value--:(m.value--,f.value=11,_(m.value)),I(f.value)}function k(){u.value="month"}function x(){u.value="months"===u.value?"month":"months"}function C(){u.value="year"===u.value?"month":"year"}function I(e){"months"===u.value&&x(),l("update:month",e)}function _(e){"year"===u.value&&C(),l("update:year",e)}return t.watch(s,((e,t)=>{const a=R(t),l=R(e)
if(!l.length)return
const o=n.date(a[a.length-1]),r=n.date(l[l.length-1]),i=n.getMonth(r),s=n.getYear(r)
i!==f.value&&(f.value=i,I(f.value)),s!==m.value&&(m.value=s,_(m.value)),g.value=n.isBefore(o,r)})),Et((()=>{const a=ru.filterProps(e),l=Id.filterProps(e),n=Pd.filterProps(e),v=Ad.filterProps(e),g=N(Dd.filterProps(e),["modelValue"]),P=N(Fd.filterProps(e),["modelValue"]),B={color:p.value,header:h.value,transition:b.value}
return t.createVNode(ru,t.mergeProps(a,{color:p.value,class:["v-date-picker",`v-date-picker--${u.value}`,{"v-date-picker--show-week":e.showWeek},i.value,e.class],style:e.style}),{title:()=>o.title?.()??t.createVNode("div",{class:"v-date-picker__title"},[r(e.title)]),header:()=>o.header?t.createVNode(ol,{defaults:{VDatePickerHeader:{...B}}},{default:()=>[o.header?.(B)]}):t.createVNode(Pd,t.mergeProps({key:"header"},n,B,{onClick:"month"!==u.value?k:void 0}),{...o,default:void 0}),default:()=>t.createVNode(t.Fragment,null,[t.createVNode(Id,t.mergeProps(l,{disabled:V.value,text:y.value,"onClick:next":w,"onClick:prev":S,"onClick:month":x,"onClick:year":C}),null),t.createVNode(Ua,{hideOnLeave:!0},{default:()=>["months"===u.value?t.createVNode(Dd,t.mergeProps({key:"date-picker-months"},g,{modelValue:f.value,"onUpdate:modelValue":[e=>f.value=e,I],min:c.value,max:d.value,year:m.value}),null):"year"===u.value?t.createVNode(Fd,t.mergeProps({key:"date-picker-years"},P,{modelValue:m.value,"onUpdate:modelValue":[e=>m.value=e,_],min:c.value,max:d.value}),null):t.createVNode(Ad,t.mergeProps({key:"date-picker-month"},v,{modelValue:s.value,"onUpdate:modelValue":e=>s.value=e,month:f.value,"onUpdate:month":[e=>f.value=e,I],year:m.value,"onUpdate:year":[e=>m.value=e,_],min:c.value,max:d.value}),null)]})]),actions:o.actions})})),{}}}),Od=ht({actionText:String,bgColor:String,color:String,icon:Ft,image:String,justify:{type:String,default:"center"},headline:String,title:String,text:String,textWidth:{type:[Number,String],default:500},href:String,to:String,...yt(),...nl(),...Kl({size:void 0}),...ba()},"VEmptyState"),Ld=Ct()({name:"VEmptyState",props:Od(),emits:{"click:action":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const{themeClasses:n}=Ca(e),{backgroundColorClasses:r,backgroundColorStyles:i}=dl((()=>e.bgColor)),{dimensionStyles:s}=rl(e),{displayClasses:u}=Cn()
function c(e){l("click:action",e)}return Et((()=>{const a=!(!o.actions&&!e.actionText),l=!(!o.headline&&!e.headline),d=!(!o.title&&!e.title),v=!(!o.text&&!e.text),p=!!(o.media||e.image||e.icon),f=e.size||(e.image?200:96)
return t.createVNode("div",{class:["v-empty-state",{[`v-empty-state--${e.justify}`]:!0},n.value,r.value,u.value,e.class],style:[i.value,s.value,e.style]},[p&&t.createVNode("div",{key:"media",class:"v-empty-state__media"},[o.media?t.createVNode(ol,{key:"media-defaults",defaults:{VImg:{src:e.image,height:f},VIcon:{size:f,icon:e.icon}}},{default:()=>[o.media()]}):t.createVNode(t.Fragment,null,[e.image?t.createVNode(bl,{key:"image",src:e.image,height:f},null):e.icon?t.createVNode(Ql,{key:"icon",color:e.color,size:f,icon:e.icon},null):void 0])]),l&&t.createVNode("div",{key:"headline",class:"v-empty-state__headline"},[o.headline?.()??e.headline]),d&&t.createVNode("div",{key:"title",class:"v-empty-state__title"},[o.title?.()??e.title]),v&&t.createVNode("div",{key:"text",class:"v-empty-state__text",style:{maxWidth:m(e.textWidth)}},[o.text?.()??e.text]),o.default&&t.createVNode("div",{key:"content",class:"v-empty-state__content"},[o.default()]),a&&t.createVNode("div",{key:"actions",class:"v-empty-state__actions"},[t.createVNode(ol,{defaults:{VBtn:{class:"v-empty-state__action-btn",color:e.color??"surface-variant",href:e.href,text:e.actionText,to:e.to}}},{default:()=>[o.actions?.({props:{onClick:c}})??t.createVNode($o,{onClick:c},null)]})])])})),{}}}),zd=Symbol.for("vuetify:v-expansion-panel"),jd=ht({...yt(),...Jr()},"VExpansionPanelText"),Hd=Ct()({name:"VExpansionPanelText",props:jd(),setup(e,a){let{slots:l}=a
const o=t.inject(zd)
if(!o)throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel")
const{hasContent:n,onAfterLeave:r}=ei(e,o.isSelected)
return Et((()=>t.createVNode(tl,{onAfterLeave:r},{default:()=>[t.withDirectives(t.createVNode("div",{class:["v-expansion-panel-text",e.class],style:e.style},[l.default&&n.value&&t.createVNode("div",{class:"v-expansion-panel-text__wrapper"},[l.default?.()])]),[[t.vShow,o.isSelected.value]])]}))),{}}}),Wd=ht({color:String,expandIcon:{type:Ft,default:"$expand"},collapseIcon:{type:Ft,default:"$collapse"},hideActions:Boolean,focusable:Boolean,static:Boolean,ripple:{type:[Boolean,Object],default:!1},readonly:Boolean,...yt(),...nl()},"VExpansionPanelTitle"),Ud=Ct()({name:"VExpansionPanelTitle",directives:{Ripple:Eo},props:Wd(),setup(e,a){let{slots:l}=a
const o=t.inject(zd)
if(!o)throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel")
const{backgroundColorClasses:n,backgroundColorStyles:r}=dl((()=>e.color)),{dimensionStyles:i}=rl(e),s=t.computed((()=>({collapseIcon:e.collapseIcon,disabled:o.disabled.value,expanded:o.isSelected.value,expandIcon:e.expandIcon,readonly:e.readonly}))),u=t.toRef((()=>o.isSelected.value?e.collapseIcon:e.expandIcon))
return Et((()=>t.withDirectives(t.createVNode("button",{class:["v-expansion-panel-title",{"v-expansion-panel-title--active":o.isSelected.value,"v-expansion-panel-title--focusable":e.focusable,"v-expansion-panel-title--static":e.static},n.value,e.class],style:[r.value,i.value,e.style],type:"button",tabindex:o.disabled.value?-1:void 0,disabled:o.disabled.value,"aria-expanded":o.isSelected.value,onClick:e.readonly?void 0:o.toggle},[t.createVNode("span",{class:"v-expansion-panel-title__overlay"},null),l.default?.(s.value),!e.hideActions&&t.createVNode(ol,{defaults:{VIcon:{icon:u.value}}},{default:()=>[t.createVNode("span",{class:"v-expansion-panel-title__icon"},[l.actions?.(s.value)??t.createVNode(Ql,null,null)])]})]),[[t.resolveDirective("ripple"),e.ripple]]))),{}}}),Yd=ht({title:String,text:String,bgColor:String,...Sl(),...zl(),...vl(),...Ba(),...Wd(),...jd()},"VExpansionPanel"),Gd=Ct()({name:"VExpansionPanel",props:Yd(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:l}=a
const o=jl(e,zd),{backgroundColorClasses:n,backgroundColorStyles:r}=dl((()=>e.bgColor)),{elevationClasses:i}=kl(e),{roundedClasses:s}=pl(e),u=t.toRef((()=>o?.disabled.value||e.disabled)),c=t.computed((()=>o.group.items.value.reduce(((e,t,a)=>(o.group.selected.value.includes(t.id)&&e.push(a),e)),[]))),d=t.computed((()=>{const e=o.group.items.value.findIndex((e=>e.id===o.id))
return!o.isSelected.value&&c.value.some((t=>t-e==1))})),v=t.computed((()=>{const e=o.group.items.value.findIndex((e=>e.id===o.id))
return!o.isSelected.value&&c.value.some((t=>t-e==-1))}))
return t.provide(zd,o),Et((()=>{const a=!(!l.text&&!e.text),c=!(!l.title&&!e.title),p=Ud.filterProps(e),f=Hd.filterProps(e)
return t.createVNode(e.tag,{class:["v-expansion-panel",{"v-expansion-panel--active":o.isSelected.value,"v-expansion-panel--before-active":d.value,"v-expansion-panel--after-active":v.value,"v-expansion-panel--disabled":u.value},s.value,n.value,e.class],style:[r.value,e.style]},{default:()=>[t.createVNode("div",{class:["v-expansion-panel__shadow",...i.value]},null),t.createVNode(ol,{defaults:{VExpansionPanelTitle:{...p},VExpansionPanelText:{...f}}},{default:()=>[c&&t.createVNode(Ud,{key:"title"},{default:()=>[l.title?l.title():e.title]}),a&&t.createVNode(Hd,{key:"text"},{default:()=>[l.text?l.text():e.text]}),l.default?.()]})]})})),{groupItem:o}}}),qd=["default","accordion","inset","popout"],Kd=ht({flat:Boolean,...Ll(),...k(Yd(),["bgColor","collapseIcon","color","eager","elevation","expandIcon","focusable","hideActions","readonly","ripple","rounded","tile","static"]),...ba(),...yt(),...Ba(),variant:{type:String,default:"default",validator:e=>qd.includes(e)}},"VExpansionPanels"),Xd=Ct()({name:"VExpansionPanels",props:Kd(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{next:o,prev:n}=Hl(e,zd),{themeClasses:r}=Ca(e),i=t.toRef((()=>e.variant&&`v-expansion-panels--variant-${e.variant}`))
return kt({VExpansionPanel:{bgColor:t.toRef((()=>e.bgColor)),collapseIcon:t.toRef((()=>e.collapseIcon)),color:t.toRef((()=>e.color)),eager:t.toRef((()=>e.eager)),elevation:t.toRef((()=>e.elevation)),expandIcon:t.toRef((()=>e.expandIcon)),focusable:t.toRef((()=>e.focusable)),hideActions:t.toRef((()=>e.hideActions)),readonly:t.toRef((()=>e.readonly)),ripple:t.toRef((()=>e.ripple)),rounded:t.toRef((()=>e.rounded)),static:t.toRef((()=>e.static))}}),Et((()=>t.createVNode(e.tag,{class:["v-expansion-panels",{"v-expansion-panels--flat":e.flat,"v-expansion-panels--tile":e.tile},r.value,i.value,e.class],style:e.style},{default:()=>[l.default?.({prev:n,next:o})]}))),{next:o,prev:n}}}),Zd=ht({app:Boolean,appear:Boolean,extended:Boolean,layout:Boolean,offset:Boolean,modelValue:{type:Boolean,default:!0},...N(Fo({active:!0}),["location"]),...ea(),...lo(),...fl({transition:"fab-transition"})},"VFab"),Qd=Ct()({name:"VFab",props:Zd(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"modelValue"),n=t.shallowRef(56),r=t.ref(),{resizeRef:i}=Xt((e=>{e.length&&(n.value=e[0].target.clientHeight)})),s=t.toRef((()=>e.app||e.absolute)),u=t.computed((()=>!!s.value&&(e.location?.split(" ").shift()??"bottom"))),c=t.computed((()=>!!s.value&&(e.location?.split(" ")[1]??"end")))
oa((()=>e.app),(()=>{const a=aa({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:u,layoutSize:t.computed((()=>e.layout?n.value+24:0)),elementSize:t.computed((()=>n.value+24)),active:t.computed((()=>e.app&&o.value)),absolute:t.toRef((()=>e.absolute))})
t.watchEffect((()=>{r.value=a.layoutItemStyles.value}))}))
const d=t.ref()
return Et((()=>{const a=$o.filterProps(e)
return t.createVNode("div",{ref:d,class:["v-fab",{"v-fab--absolute":e.absolute,"v-fab--app":!!e.app,"v-fab--extended":e.extended,"v-fab--offset":e.offset,[`v-fab--${u.value}`]:s.value,[`v-fab--${c.value}`]:s.value},e.class],style:[e.app?{...r.value}:{height:e.absolute?"100%":"inherit"},e.style]},[t.createVNode("div",{class:"v-fab__container"},[t.createVNode(ml,{appear:e.appear,transition:e.transition},{default:()=>[t.withDirectives(t.createVNode($o,t.mergeProps({ref:i},a,{active:void 0,location:void 0}),l),[[t.vShow,e.active]])]})])])})),{}}}),Jd=ht({chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},hideInput:Boolean,multiple:Boolean,showSize:{type:[Boolean,Number,String],default:!1,validator:e=>"boolean"==typeof e||[1e3,1024].includes(Number(e))},...fn({prependIcon:"$file"}),modelValue:{type:[Array,Object],default:e=>e.multiple?[]:null,validator:e=>R(e).every((e=>null!=e&&"object"==typeof e))},...Si({clearable:!0})},"VFileInput"),ev=Ct()({name:"VFileInput",inheritAttrs:!1,props:Jd(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{t:r}=ma(),i=na(e,"modelValue",e.modelValue,(e=>R(e)),(t=>!e.multiple&&Array.isArray(t)?t[0]:t)),{isFocused:s,focus:u,blur:c}=sn(e),d=t.computed((()=>"boolean"!=typeof e.showSize?e.showSize:void 0)),v=t.computed((()=>(i.value??[]).reduce(((e,t)=>{let{size:a=0}=t
return e+a}),0))),p=t.computed((()=>F(v.value,d.value))),f=t.computed((()=>(i.value??[]).map((t=>{const{name:a="",size:l=0}=t
return e.showSize?`${a} (${F(l,d.value)})`:a})))),m=t.computed((()=>{const t=i.value?.length??0
return e.showSize?r(e.counterSizeString,t,p.value):r(e.counterString,t)})),g=t.ref(),h=t.ref(),y=t.ref(),b=t.toRef((()=>s.value||e.active)),V=t.computed((()=>["plain","underlined"].includes(e.variant)))
function w(){y.value!==document.activeElement&&y.value?.focus(),s.value||u()}function S(e){y.value?.click()}function k(e){o("mousedown:control",e)}function x(e){y.value?.click(),o("click:control",e)}function N(a){a.stopPropagation(),w(),t.nextTick((()=>{i.value=[],K(e["onClick:clear"],a)}))}function C(e){e.preventDefault()}function I(e){e.preventDefault(),e.dataTransfer&&(i.value=[...e.dataTransfer.files??[]])}return t.watch(i,(e=>{(!Array.isArray(e)||!e.length)&&y.value&&(y.value.value="")})),Et((()=>{const a=!(!n.counter&&!e.counter),o=!(!a&&!n.details),[r,u]=B(l),{modelValue:d,..._}=mn.filterProps(e),P=ki.filterProps(e)
return t.createVNode(mn,t.mergeProps({ref:g,modelValue:e.multiple?i.value:i.value[0],class:["v-file-input",{"v-file-input--chips":!!e.chips,"v-file-input--hide":e.hideInput,"v-input--plain-underlined":V.value},e.class],style:e.style,"onClick:prepend":S},r,_,{centerAffix:!V.value,focused:s.value}),{...n,default:a=>{let{id:l,isDisabled:o,isDirty:r,isReadonly:d,isValid:m}=a
return t.createVNode(ki,t.mergeProps({ref:h,"prepend-icon":e.prependIcon,onMousedown:k,onClick:x,"onClick:clear":N,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},P,{id:l.value,active:b.value||r.value,dirty:r.value||e.dirty,disabled:o.value,focused:s.value,error:!1===m.value,onDragover:C,onDrop:I}),{...n,default:a=>{let{props:{class:l,...r}}=a
return t.createVNode(t.Fragment,null,[t.createVNode("input",t.mergeProps({ref:y,type:"file",readonly:d.value,disabled:o.value,multiple:e.multiple,name:e.name,onClick:e=>{e.stopPropagation(),d.value&&e.preventDefault(),w()},onChange:e=>{if(!e.target)return
const t=e.target
i.value=[...t.files??[]]},onFocus:w,onBlur:c},r,u),null),t.createVNode("div",{class:l},[!!i.value?.length&&!e.hideInput&&(n.selection?n.selection({fileNames:f.value,totalBytes:v.value,totalBytesReadable:p.value}):e.chips?f.value.map((e=>t.createVNode(Hn,{key:e,size:"small",text:e},null))):f.value.join(", "))])])}})},details:o?l=>t.createVNode(t.Fragment,null,[n.details?.(l),a&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(yi,{active:!!i.value?.length,value:m.value,disabled:e.disabled},n.counter)])]):void 0})})),fi({},g,h,y)}}),tv=ht({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...Vl(),...yt(),...Sl(),...ea(),...vl(),...Ba({tag:"footer"}),...ba()},"VFooter"),av=Ct()({name:"VFooter",props:tv(),setup(e,a){let{slots:l}=a
const o=t.ref(),{themeClasses:n}=Ca(e),{backgroundColorClasses:r,backgroundColorStyles:i}=dl((()=>e.color)),{borderClasses:s}=wl(e),{elevationClasses:u}=kl(e),{roundedClasses:c}=pl(e),d=t.shallowRef(32),{resizeRef:v}=Xt((e=>{e.length&&(d.value=e[0].target.clientHeight)})),p=t.computed((()=>"auto"===e.height?d.value:parseInt(e.height,10)))
return oa((()=>e.app),(()=>{const a=aa({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef((()=>"bottom")),layoutSize:p,elementSize:t.computed((()=>"auto"===e.height?void 0:p.value)),active:t.toRef((()=>e.app)),absolute:t.toRef((()=>e.absolute))})
t.watchEffect((()=>{o.value=a.layoutItemStyles.value}))})),Et((()=>t.createVNode(e.tag,{ref:v,class:["v-footer",n.value,r.value,s.value,u.value,c.value,e.class],style:[i.value,e.app?o.value:{height:m(e.height)},e.style]},l))),{}}}),lv=ht({...yt(),...cn()},"VForm"),ov=Ct()({name:"VForm",props:lv(),emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=function(e){const a=na(e,"modelValue"),l=t.toRef((()=>e.disabled)),o=t.toRef((()=>e.readonly)),n=t.shallowRef(!1),r=t.ref([]),i=t.ref([])
return t.watch(r,(()=>{let e=0,t=0
const l=[]
for(const a of r.value)!1===a.isValid?(t++,l.push({id:a.id,errorMessages:a.errorMessages})):!0===a.isValid&&e++
i.value=l,a.value=!(t>0)&&(e===r.value.length||null)}),{deep:!0,flush:"post"}),t.provide(un,{register:e=>{let{id:a,vm:l,validate:o,reset:n,resetValidation:i}=e
r.value.some((e=>e.id===a))&&Me(`Duplicate input name "${a}"`),r.value.push({id:a,validate:o,reset:n,resetValidation:i,vm:t.markRaw(l),isValid:null,errorMessages:[]})},unregister:e=>{r.value=r.value.filter((t=>t.id!==e))},update:(e,t,a)=>{const l=r.value.find((t=>t.id===e))
l&&(l.isValid=t,l.errorMessages=a)},isDisabled:l,isReadonly:o,isValidating:n,isValid:a,items:r,validateOn:t.toRef((()=>e.validateOn))}),{errors:i,isDisabled:l,isReadonly:o,isValidating:n,isValid:a,items:r,validate:async function(){const t=[]
let a=!0
i.value=[],n.value=!0
for(const l of r.value){const o=await l.validate()
if(o.length>0&&(a=!1,t.push({id:l.id,errorMessages:o})),!a&&e.fastFail)break}return i.value=t,n.value=!1,{valid:a,errors:i.value}},reset:function(){r.value.forEach((e=>e.reset()))},resetValidation:function(){r.value.forEach((e=>e.resetValidation()))}}}(e),r=t.ref()
function i(e){e.preventDefault(),n.reset()}function s(e){const t=e,a=n.validate()
t.then=a.then.bind(a),t.catch=a.catch.bind(a),t.finally=a.finally.bind(a),o("submit",t),t.defaultPrevented||a.then((e=>{let{valid:t}=e
t&&r.value?.submit()})),t.preventDefault()}return Et((()=>t.createVNode("form",{ref:r,class:["v-form",e.class],style:e.style,novalidate:!0,onReset:i,onSubmit:s},[l.default?.(n)]))),fi(n,r)}}),nv=ht({disabled:Boolean,modelValue:{type:Boolean,default:null},...Gr()},"VHover"),rv=Ct()({name:"VHover",props:nv(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t
const l=na(e,"modelValue"),{runOpenDelay:o,runCloseDelay:n}=qr(e,(t=>!e.disabled&&(l.value=t)))
return()=>a.default?.({isHovering:l.value,props:{onMouseenter:o,onMouseleave:n}})}}),iv=ht({color:String,direction:{type:String,default:"vertical",validator:e=>["vertical","horizontal"].includes(e)},side:{type:String,default:"end",validator:e=>["start","end","both"].includes(e)},mode:{type:String,default:"intersect",validator:e=>["intersect","manual"].includes(e)},margin:[Number,String],loadMoreText:{type:String,default:"$vuetify.infiniteScroll.loadMore"},emptyText:{type:String,default:"$vuetify.infiniteScroll.empty"},...nl(),...Ba()},"VInfiniteScroll"),sv=Nt({name:"VInfiniteScrollIntersect",props:{side:{type:String,required:!0},rootMargin:String},emits:{intersect:(e,t)=>!0},setup(e,a){let{emit:l}=a
const{intersectionRef:o,isIntersecting:n}=Jl()
return t.watch(n,(async t=>{l("intersect",e.side,t)})),Et((()=>t.createVNode("div",{class:"v-infinite-scroll-intersect",style:{"--v-infinite-margin-size":e.rootMargin},ref:o},[t.createTextVNode(" ")]))),{}}}),uv=Ct()({name:"VInfiniteScroll",props:iv(),emits:{load:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=t.ref(),r=t.shallowRef("ok"),i=t.shallowRef("ok"),s=t.computed((()=>m(e.margin))),u=t.shallowRef(!1)
function c(t){if(!n.value)return
const a="vertical"===e.direction?"scrollTop":"scrollLeft"
n.value[a]=t}function d(){if(!n.value)return 0
const t="vertical"===e.direction?"scrollHeight":"scrollWidth"
return n.value[t]}function v(e,t){"start"===e?r.value=t:"end"===e&&(i.value=t)}t.onMounted((()=>{n.value&&("start"===e.side?c(d()):"both"===e.side&&c(d()/2-function(){if(!n.value)return 0
const t="vertical"===e.direction?"clientHeight":"clientWidth"
return n.value[t]}()/2))}))
let p=0
function f(e,t){u.value=t,u.value&&g(e)}function g(a){if("manual"!==e.mode&&!u.value)return
const l=function(e){return"start"===e?r.value:i.value}(a)
n.value&&!["empty","loading"].includes(l)&&(p=d(),v(a,"loading"),o("load",{side:a,done:function(l){v(a,l),t.nextTick((()=>{"empty"!==l&&"error"!==l&&("ok"===l&&"start"===a&&c(d()-p+function(){if(!n.value)return 0
const t="vertical"===e.direction?"scrollTop":"scrollLeft"
return n.value[t]}()),"manual"!==e.mode&&t.nextTick((()=>{window.requestAnimationFrame((()=>{window.requestAnimationFrame((()=>{window.requestAnimationFrame((()=>{g(a)}))}))}))})))}))}}))}const{t:h}=ma()
function y(a,o){if(e.side!==a&&"both"!==e.side)return
const n=()=>g(a),r={side:a,props:{onClick:n,color:e.color}}
return"error"===o?l.error?.(r):"empty"===o?l.empty?.(r)??t.createVNode("div",null,[h(e.emptyText)]):"manual"===e.mode?"loading"===o?l.loading?.(r)??t.createVNode(to,{indeterminate:!0,color:e.color},null):l["load-more"]?.(r)??t.createVNode($o,{variant:"outlined",color:e.color,onClick:n},{default:()=>[h(e.loadMoreText)]}):l.loading?.(r)??t.createVNode(to,{indeterminate:!0,color:e.color},null)}const{dimensionStyles:b}=rl(e)
Et((()=>{const a=e.tag,o="start"===e.side||"both"===e.side,u="end"===e.side||"both"===e.side,c="intersect"===e.mode
return t.createVNode(a,{ref:n,class:["v-infinite-scroll",`v-infinite-scroll--${e.direction}`,{"v-infinite-scroll--start":o,"v-infinite-scroll--end":u}],style:b.value},{default:()=>[t.createVNode("div",{class:"v-infinite-scroll__side"},[y("start",r.value)]),o&&c&&t.createVNode(sv,{key:"start",side:"start",onIntersect:f,rootMargin:s.value},null),l.default?.(),u&&c&&t.createVNode(sv,{key:"end",side:"end",onIntersect:f,rootMargin:s.value},null),t.createVNode("div",{class:"v-infinite-scroll__side"},[y("end",i.value)])]})}))}}),cv=Symbol.for("vuetify:v-item-group"),dv=ht({...yt(),...Ll({selectedClass:"v-item--selected"}),...Ba(),...ba()},"VItemGroup"),vv=Ct()({name:"VItemGroup",props:dv(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{isSelected:n,select:r,next:i,prev:s,selected:u}=Hl(e,cv)
return()=>t.createVNode(e.tag,{class:["v-item-group",o.value,e.class],style:e.style},{default:()=>[l.default?.({isSelected:n,select:r,next:i,prev:s,selected:u.value})]})}}),pv=Ct()({name:"VItem",props:zl(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:a}=t
const{isSelected:l,select:o,toggle:n,selectedClass:r,value:i,disabled:s}=jl(e,cv)
return()=>a.default?.({isSelected:l.value,selectedClass:r.value,select:o,toggle:n,value:i.value,disabled:s.value})}}),fv=It("v-kbd","kbd"),mv=ht({...yt(),...nl(),...Jt()},"VLayout"),gv=Ct()({name:"VLayout",props:mv(),setup(e,a){let{slots:l}=a
const{layoutClasses:o,layoutStyles:n,getLayoutItem:r,items:i,layoutRef:s}=la(e),{dimensionStyles:u}=rl(e)
return Et((()=>t.createVNode("div",{ref:s,class:[o.value,e.class],style:[u.value,n.value,e.style]},[l.default?.()]))),{getLayoutItem:r,items:i}}}),hv=ht({position:{type:String,required:!0},size:{type:[Number,String],default:300},modelValue:Boolean,...yt(),...ea()},"VLayoutItem"),yv=Ct()({name:"VLayoutItem",props:hv(),setup(e,a){let{slots:l}=a
const{layoutItemStyles:o}=aa({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef((()=>e.position)),elementSize:t.toRef((()=>e.size)),layoutSize:t.toRef((()=>e.size)),active:t.toRef((()=>e.modelValue)),absolute:t.toRef((()=>e.absolute))})
return()=>t.createVNode("div",{class:["v-layout-item",e.class],style:[o.value,e.style]},[l.default?.()])}}),bv=ht({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...yt(),...nl(),...Ba(),...fl({transition:"fade-transition"})},"VLazy"),Vv=Ct()({name:"VLazy",directives:{intersect:hl},props:bv(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{dimensionStyles:o}=rl(e),n=na(e,"modelValue")
function r(e){n.value||(n.value=e)}return Et((()=>t.withDirectives(t.createVNode(e.tag,{class:["v-lazy",e.class],style:[o.value,e.style]},{default:()=>[n.value&&t.createVNode(ml,{transition:e.transition,appear:!0},{default:()=>[l.default?.()]})]}),[[t.resolveDirective("intersect"),{handler:r,options:e.options},null]]))),{}}}),wv=ht({locale:String,fallbackLocale:String,messages:Object,rtl:{type:Boolean,default:void 0},...yt()},"VLocaleProvider"),Sv=Ct()({name:"VLocaleProvider",props:wv(),setup(e,a){let{slots:l}=a
const{rtlClasses:o}=ga(e)
return Et((()=>t.createVNode("div",{class:["v-locale-provider",o.value,e.class],style:e.style},[l.default?.()]))),{}}}),kv=ht({scrollable:Boolean,...yt(),...nl(),...Ba({tag:"main"})},"VMain"),xv=Ct()({name:"VMain",props:kv(),setup(e,a){let{slots:l}=a
const{dimensionStyles:o}=rl(e),{mainStyles:n}=ta(),{ssrBootStyles:r}=_l()
return Et((()=>t.createVNode(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[n.value,r.value,o.value,e.style]},{default:()=>[e.scrollable?t.createVNode("div",{class:"v-main__scroller"},[l.default?.()]):l.default?.()]}))),{}}})
const Nv=100,Cv=20
function Iv(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function _v(e){if(e.length<2)return 0
if(2===e.length)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t)
let t=0
for(let a=e.length-1;a>0;a--){if(e[a].t===e[a-1].t)continue
const l=Iv(t),o=(e[a].d-e[a-1].d)/(e[a].t-e[a-1].t)
t+=(o-l)*Math.abs(o),a===e.length-1&&(t*=.5)}return 1e3*Iv(t)}function Pv(){const e={}
return{addMovement:function(t){Array.from(t.changedTouches).forEach((a=>{(e[a.identifier]??(e[a.identifier]=new H(Cv))).push([t.timeStamp,a])}))},endTouch:function(t){Array.from(t.changedTouches).forEach((t=>{delete e[t.identifier]}))},getVelocity:function(t){const a=e[t]?.values().reverse()
if(!a)throw new Error(`No samples for touch id ${t}`)
const l=a[0],o=[],n=[]
for(const e of a){if(l[0]-e[0]>Nv)break
o.push({t:e[0],d:e[1].clientX}),n.push({t:e[0],d:e[1].clientY})}return{x:_v(o),y:_v(n),get direction(){const{x:e,y:t}=this,[a,l]=[Math.abs(e),Math.abs(t)]
return a>l&&e>=0?"right":a>l&&e<=0?"left":l>a&&t>=0?"down":l>a&&t<=0?"up":function(){throw new Error}()}}}}}function Bv(){throw new Error}const Rv=["start","end","left","right","top","bottom"],Av=ht({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,persistent:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>Rv.includes(e)},sticky:Boolean,...Vl(),...yt(),...Gr(),...Nn({mobile:null}),...Sl(),...ea(),...vl(),...Ba({tag:"nav"}),...ba()},"VNavigationDrawer"),Tv=Ct()({name:"VNavigationDrawer",props:Av(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{isRtl:r}=ha(),{themeClasses:i}=Ca(e),{borderClasses:s}=wl(e),{backgroundColorClasses:u,backgroundColorStyles:c}=dl((()=>e.color)),{elevationClasses:d}=kl(e),{displayClasses:v,mobile:p}=Cn(e),{roundedClasses:f}=pl(e),g=fo(),h=na(e,"modelValue",null,(e=>!!e)),{ssrBootStyles:y}=_l(),{scopeId:b}=ti(),V=t.ref(),w=t.shallowRef(!1),{runOpenDelay:S,runCloseDelay:k}=qr(e,(e=>{w.value=e})),x=t.computed((()=>e.rail&&e.expandOnHover&&w.value?Number(e.width):Number(e.rail?e.railWidth:e.width))),N=t.computed((()=>ue(e.location,r.value))),C=t.toRef((()=>e.persistent)),I=t.computed((()=>!e.permanent&&(p.value||e.temporary))),_=t.computed((()=>e.sticky&&!I.value&&"bottom"!==N.value))
oa((()=>e.expandOnHover&&null!=e.rail),(()=>{t.watch(w,(e=>o("update:rail",!e)))})),oa((()=>!e.disableResizeWatcher),(()=>{t.watch(I,(a=>!e.permanent&&t.nextTick((()=>h.value=!a))))})),oa((()=>!e.disableRouteWatcher&&!!g),(()=>{t.watch(g.currentRoute,(()=>I.value&&(h.value=!1)))})),t.watch((()=>e.permanent),(e=>{e&&(h.value=!0)})),null!=e.modelValue||I.value||(h.value=e.permanent||!p.value)
const{isDragging:P,dragProgress:B}=function(e){let{el:a,isActive:l,isTemporary:o,width:n,touchless:r,position:i}=e
t.onMounted((()=>{window.addEventListener("touchstart",b,{passive:!0}),window.addEventListener("touchmove",V,{passive:!1}),window.addEventListener("touchend",w,{passive:!0})})),t.onBeforeUnmount((()=>{window.removeEventListener("touchstart",b),window.removeEventListener("touchmove",V),window.removeEventListener("touchend",w)}))
const s=t.computed((()=>["left","right"].includes(i.value))),{addMovement:u,endTouch:c,getVelocity:d}=Pv()
let v=!1
const p=t.shallowRef(!1),f=t.shallowRef(0),m=t.shallowRef(0)
let g
function h(e,t){return("left"===i.value?e:"right"===i.value?document.documentElement.clientWidth-e:"top"===i.value?e:"bottom"===i.value?document.documentElement.clientHeight-e:Bv())-(t?n.value:0)}function y(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
const a="left"===i.value?(e-m.value)/n.value:"right"===i.value?(document.documentElement.clientWidth-e-m.value)/n.value:"top"===i.value?(e-m.value)/n.value:"bottom"===i.value?(document.documentElement.clientHeight-e-m.value)/n.value:Bv()
return t?Math.max(0,Math.min(1,a)):a}function b(e){if(r.value)return
const t=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY,d="left"===i.value?t<25:"right"===i.value?t>document.documentElement.clientWidth-25:"top"===i.value?a<25:"bottom"===i.value?a>document.documentElement.clientHeight-25:Bv(),p=l.value&&("left"===i.value?t<n.value:"right"===i.value?t>document.documentElement.clientWidth-n.value:"top"===i.value?a<n.value:"bottom"===i.value?a>document.documentElement.clientHeight-n.value:Bv());(d||p||l.value&&o.value)&&(g=[t,a],m.value=h(s.value?t:a,l.value),f.value=y(s.value?t:a),v=m.value>-20&&m.value<80,c(e),u(e))}function V(e){const t=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY
if(v){if(!e.cancelable)return void(v=!1)
const l=Math.abs(t-g[0]),o=Math.abs(a-g[1]);(s.value?l>o&&l>3:o>l&&o>3)?(p.value=!0,v=!1):(s.value?o:l)>3&&(v=!1)}if(!p.value)return
e.preventDefault(),u(e)
const l=y(s.value?t:a,!1)
f.value=Math.max(0,Math.min(1,l)),l>1?m.value=h(s.value?t:a,!0):l<0&&(m.value=h(s.value?t:a,!1))}function w(e){if(v=!1,!p.value)return
u(e),p.value=!1
const t=d(e.changedTouches[0].identifier),a=Math.abs(t.x),o=Math.abs(t.y),n=s.value?a>o&&a>400:o>a&&o>3
l.value=n?t.direction===({left:"right",right:"left",top:"down",bottom:"up"}[i.value]||Bv()):f.value>.5}const S=t.computed((()=>p.value?{transform:"left"===i.value?`translateX(calc(-100% + ${f.value*n.value}px))`:"right"===i.value?`translateX(calc(100% - ${f.value*n.value}px))`:"top"===i.value?`translateY(calc(-100% + ${f.value*n.value}px))`:"bottom"===i.value?`translateY(calc(100% - ${f.value*n.value}px))`:Bv(),transition:"none"}:void 0))
return oa(p,(()=>{const e=a.value?.style.transform??null,l=a.value?.style.transition??null
t.watchEffect((()=>{a.value?.style.setProperty("transform",S.value?.transform||"none"),a.value?.style.setProperty("transition",S.value?.transition||null)})),t.onScopeDispose((()=>{a.value?.style.setProperty("transform",e),a.value?.style.setProperty("transition",l)}))})),{isDragging:p,dragProgress:f,dragStyles:S}}({el:V,isActive:h,isTemporary:I,width:x,touchless:t.toRef((()=>e.touchless)),position:N}),R=t.computed((()=>{const t=I.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):x.value
return P.value?t*B.value:t})),{layoutItemStyles:A,layoutItemScrimStyles:T}=aa({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:N,layoutSize:R,elementSize:x,active:t.readonly(h),disableTransitions:t.toRef((()=>P.value)),absolute:t.computed((()=>e.absolute||_.value&&"string"!=typeof D.value))}),{isStuck:D,stickyStyles:E}=function(e){let{rootEl:a,isSticky:l,layoutItemStyles:o}=e
const n=t.shallowRef(!1),r=t.shallowRef(0),i=t.computed((()=>{const e="boolean"==typeof n.value?"top":n.value
return[l.value?{top:"auto",bottom:"auto",height:void 0}:void 0,n.value?{[e]:m(r.value)}:{top:o.value.top}]}))
t.onMounted((()=>{t.watch(l,(e=>{e?window.addEventListener("scroll",u,{passive:!0}):window.removeEventListener("scroll",u)}),{immediate:!0})})),t.onBeforeUnmount((()=>{window.removeEventListener("scroll",u)}))
let s=0
function u(){const e=s>window.scrollY?"up":"down",t=a.value.getBoundingClientRect(),l=parseFloat(o.value.top??0),i=window.scrollY-Math.max(0,r.value-l),u=t.height+Math.max(r.value,l)-window.scrollY-window.innerHeight,c=parseFloat(getComputedStyle(a.value).getPropertyValue("--v-body-scroll-y"))||0
t.height<window.innerHeight-l?(n.value="top",r.value=l):"up"===e&&"bottom"===n.value||"down"===e&&"top"===n.value?(r.value=window.scrollY+t.top-c,n.value=!0):"down"===e&&u<=0?(r.value=0,n.value="bottom"):"up"===e&&i<=0&&(c?"top"!==n.value&&(r.value=-i+c+l,n.value="top"):(r.value=t.top+i,n.value="top")),s=window.scrollY}return{isStuck:n,stickyStyles:i}}({rootEl:V,isSticky:_,layoutItemStyles:A}),F=dl((()=>"string"==typeof e.scrim?e.scrim:null)),$=t.computed((()=>({...P.value?{opacity:.2*B.value,transition:"none"}:void 0,...T.value})))
return kt({VList:{bgColor:"transparent"}}),Et((()=>{const a=n.image||e.image
return t.createVNode(t.Fragment,null,[t.createVNode(e.tag,t.mergeProps({ref:V,onMouseenter:S,onMouseleave:k,class:["v-navigation-drawer",`v-navigation-drawer--${N.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":w.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":I.value,"v-navigation-drawer--persistent":C.value,"v-navigation-drawer--active":h.value,"v-navigation-drawer--sticky":_.value},i.value,u.value,s.value,v.value,d.value,f.value,e.class],style:[c.value,A.value,y.value,E.value,e.style]},b,l),{default:()=>[a&&t.createVNode("div",{key:"image",class:"v-navigation-drawer__img"},[n.image?t.createVNode(ol,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{alt:"",cover:!0,height:"inherit",src:e.image}}},n.image):t.createVNode(bl,{key:"image-img",alt:"",cover:!0,height:"inherit",src:e.image},null)]),n.prepend&&t.createVNode("div",{class:"v-navigation-drawer__prepend"},[n.prepend?.()]),t.createVNode("div",{class:"v-navigation-drawer__content"},[n.default?.()]),n.append&&t.createVNode("div",{class:"v-navigation-drawer__append"},[n.append?.()])]}),t.createVNode(t.Transition,{name:"fade-transition"},{default:()=>[I.value&&(P.value||h.value)&&!!e.scrim&&t.createVNode("div",t.mergeProps({class:["v-navigation-drawer__scrim",F.backgroundColorClasses.value],style:[$.value,F.backgroundColorStyles.value],onClick:()=>{C.value||(h.value=!1)}},b),null)]})])})),{isStuck:D}}}),Dv=Nt({name:"VNoSsr",setup(e,t){let{slots:a}=t
const l=Qr()
return()=>l.value&&a.default?.()}})
const Ev=ht({controlVariant:{type:String,default:"default"},inset:Boolean,hideInput:Boolean,modelValue:{type:Number,default:null},min:{type:Number,default:Number.MIN_SAFE_INTEGER},max:{type:Number,default:Number.MAX_SAFE_INTEGER},step:{type:Number,default:1},precision:{type:Number,default:0},...N(Ni(),["modelValue","validationValue"])},"VNumberInput"),Fv=Ct()({name:"VNumberInput",props:{...Ev()},emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=t.ref(),{holdStart:n,holdStop:r}=function(e){let{toggleUpDown:a}=e,l=-1,o=-1
function n(){window.clearTimeout(l),window.clearInterval(o)}function r(e){a("up"===e)}return t.onScopeDispose(n),{holdStart:function(e){n(),r(e),l=window.setTimeout((()=>{o=window.setInterval((()=>r(e)),50)}),500)},holdStop:n}}({toggleUpDown:C}),i=dn(e),s=t.computed((()=>i.isDisabled.value||i.isReadonly.value)),{isFocused:u,focus:c,blur:d}=sn(e)
function v(t){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.precision
const l=null==a?String(t):t.toFixed(a)
return u.value?Number(l).toString():l}const p=na(e,"modelValue",null,(e=>e??null),(t=>null==t?t??null:A(Number(t),e.min,e.max))),f=t.shallowRef(null)
t.watchEffect((()=>{u.value&&!s.value||(null==p.value?f.value=null:isNaN(p.value)||(f.value=v(p.value)))}))
const m=t.computed({get:()=>f.value,set(t){null===t||""===t?(p.value=null,f.value=null):!isNaN(Number(t))&&Number(t)<=e.max&&Number(t)>=e.min&&(p.value=Number(t),f.value=t)}}),g=t.computed((()=>!s.value&&(p.value??0)+e.step<=e.max)),h=t.computed((()=>!s.value&&(p.value??0)-e.step>=e.min)),y=t.computed((()=>e.hideInput?"stacked":e.controlVariant)),b=t.toRef((()=>"split"===y.value?"$plus":"$collapse")),V=t.toRef((()=>"split"===y.value?"$minus":"$expand")),w=t.toRef((()=>"split"===y.value?"default":"small")),S=t.toRef((()=>"stacked"===y.value?"auto":"100%")),k={props:{onClick:P,onPointerup:B,onPointerdown:R}},x={props:{onClick:P,onPointerup:B,onPointerdown:T}}
function N(e){if(null==e)return 0
const t=e.toString(),a=t.indexOf(".")
return~a?t.length-a:0}function C(){let t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0]
if(s.value)return
if(null==p.value)return void(m.value=v(A(0,e.min,e.max)))
let a=Math.max(N(p.value),N(e.step))
null!=e.precision&&(a=Math.max(a,e.precision)),t?g.value&&(m.value=v(p.value+e.step,a)):h.value&&(m.value=v(p.value-e.step,a))}function I(t){if(!t.data)return
const a=t.target?.value,l=t.target?.selectionStart,o=t.target?.selectionEnd,n=a?a.slice(0,l)+t.data+a.slice(o):t.data;/^-?(\d+(\.\d*)?|(\.\d+)|\d*|\.)$/.test(n)||t.preventDefault(),null!=e.precision&&(n.split(".")[1]?.length>e.precision&&t.preventDefault(),0===e.precision&&n.includes(".")&&t.preventDefault())}async function _(e){["Enter","ArrowLeft","ArrowRight","Backspace","Delete","Tab"].includes(e.key)||e.ctrlKey||["ArrowDown","ArrowUp"].includes(e.key)&&(e.preventDefault(),D(),await t.nextTick(),"ArrowDown"===e.key?C(!1):C())}function P(e){e.stopPropagation()}function B(e){const t=e.currentTarget
t?.releasePointerCapture(e.pointerId),e.preventDefault(),e.stopPropagation(),r()}function R(e){const t=e.currentTarget
t?.setPointerCapture(e.pointerId),e.preventDefault(),e.stopPropagation(),n("up")}function T(e){const t=e.currentTarget
t?.setPointerCapture(e.pointerId),e.preventDefault(),e.stopPropagation(),n("down")}function D(){if(s.value)return
if(!o.value)return
const t=o.value.value
t&&!isNaN(Number(t))?m.value=v(A(Number(t),e.min,e.max)):m.value=null}function E(){c(),s.value||(null===p.value||isNaN(p.value)?m.value=null:m.value=p.value.toString())}function F(){d(),D()}return t.watch((()=>e.precision),(()=>function(){if(s.value)return
if(null===p.value||isNaN(p.value))return void(m.value=null)
m.value=null==e.precision?String(p.value):p.value.toFixed(e.precision)}())),t.onMounted((()=>{D()})),Et((()=>{const{modelValue:a,...n}=Ci.filterProps(e)
function r(){return l.increment?t.createVNode(ol,{key:"increment-defaults",defaults:{VBtn:{disabled:!g.value,flat:!0,height:S.value,size:w.value,icon:b.value}}},{default:()=>[l.increment(k)]}):t.createVNode($o,{disabled:!g.value,flat:!0,key:"increment-btn",height:S.value,"data-testid":"increment","aria-hidden":"true",icon:b.value,onClick:P,onPointerup:B,onPointerdown:R,size:w.value,tabindex:"-1"},null)}function i(){return l.decrement?t.createVNode(ol,{key:"decrement-defaults",defaults:{VBtn:{disabled:!h.value,flat:!0,height:S.value,size:w.value,icon:V.value}}},{default:()=>[l.decrement(x)]}):t.createVNode($o,{disabled:!h.value,flat:!0,key:"decrement-btn",height:S.value,"data-testid":"decrement","aria-hidden":"true",icon:V.value,size:w.value,tabindex:"-1",onClick:P,onPointerup:B,onPointerdown:T},null)}function s(){return t.createVNode("div",{class:"v-number-input__control"},[i(),t.createVNode(hr,{vertical:"stacked"!==y.value},null),r()])}function u(){return e.hideInput||e.inset?void 0:t.createVNode(hr,{vertical:!0},null)}const c="split"===y.value?t.createVNode("div",{class:"v-number-input__control"},[t.createVNode(hr,{vertical:!0},null),r()]):e.reverse||"hidden"===y.value?void 0:t.createVNode(t.Fragment,null,[u(),s()]),d=l["append-inner"]||c,v="split"===y.value?t.createVNode("div",{class:"v-number-input__control"},[i(),t.createVNode(hr,{vertical:!0},null)]):e.reverse&&"hidden"!==y.value?t.createVNode(t.Fragment,null,[s(),u()]):void 0,f=l["prepend-inner"]||v
return t.createVNode(Ci,t.mergeProps({ref:o,modelValue:m.value,"onUpdate:modelValue":e=>m.value=e,validationValue:p.value,onBeforeinput:I,onFocus:E,onBlur:F,onKeydown:_,class:["v-number-input",{"v-number-input--default":"default"===y.value,"v-number-input--hide-input":e.hideInput,"v-number-input--inset":e.inset,"v-number-input--reverse":e.reverse,"v-number-input--split":"split"===y.value,"v-number-input--stacked":"stacked"===y.value},e.class]},n,{style:e.style,inputmode:"decimal"}),{...l,"append-inner":d?function(){for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o]
return t.createVNode(t.Fragment,null,[l["append-inner"]?.(...a),c])}:void 0,"prepend-inner":f?function(){for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o]
return t.createVNode(t.Fragment,null,[v,l["prepend-inner"]?.(...a)])}:void 0})})),fi({},o)}}),$v=ht({autofocus:Boolean,divider:String,focusAll:Boolean,label:{type:String,default:"$vuetify.input.otp"},length:{type:[Number,String],default:6},modelValue:{type:[Number,String],default:void 0},placeholder:String,type:{type:String,default:"number"},...nl(),...rn(),...k(Si({variant:"outlined"}),["baseColor","bgColor","class","color","disabled","error","loading","rounded","style","theme","variant"])},"VOtpInput"),Mv=Ct()({name:"VOtpInput",props:$v(),emits:{finish:e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{dimensionStyles:r}=rl(e),{isFocused:i,focus:s,blur:u}=sn(e),c=na(e,"modelValue","",(e=>null==e?[]:String(e).split("")),(e=>e.join(""))),{t:d}=ma(),v=t.computed((()=>Number(e.length))),p=t.computed((()=>Array(v.value).fill(0))),f=t.ref(-1),m=t.ref(),g=t.ref([]),h=t.computed((()=>g.value[f.value]))
function y(){if(w(h.value.value))return void(h.value.value="")
const e=c.value.slice(),t=h.value.value
e[f.value]=t
let a=null
f.value>c.value.length?a=c.value.length+1:f.value+1!==v.value&&(a="next"),c.value=e,a&&Q(m.value,a)}function b(e){const t=c.value.slice(),a=f.value
let l=null;["ArrowLeft","ArrowRight","Backspace","Delete"].includes(e.key)&&(e.preventDefault(),"ArrowLeft"===e.key?l="prev":"ArrowRight"===e.key?l="next":["Backspace","Delete"].includes(e.key)&&(t[f.value]="",c.value=t,f.value>0&&"Backspace"===e.key?l="prev":requestAnimationFrame((()=>{g.value[a]?.select()}))),requestAnimationFrame((()=>{null!=l&&Q(m.value,l)})))}function V(){u(),f.value=-1}function w(t){return"number"===e.type&&/[^0-9]/g.test(t)}return kt({VField:{color:t.toRef((()=>e.color)),bgColor:t.toRef((()=>e.color)),baseColor:t.toRef((()=>e.baseColor)),disabled:t.toRef((()=>e.disabled)),error:t.toRef((()=>e.error)),variant:t.toRef((()=>e.variant))}},{scoped:!0}),t.watch(c,(e=>{e.length===v.value&&o("finish",e.join(""))}),{deep:!0}),t.watch(f,(e=>{e<0||t.nextTick((()=>{g.value[e]?.select()}))})),Et((()=>{const[a,o]=B(l)
return t.createVNode("div",t.mergeProps({class:["v-otp-input",{"v-otp-input--divided":!!e.divider},e.class],style:[e.style]},a),[t.createVNode("div",{ref:m,class:"v-otp-input__content",style:[r.value]},[p.value.map(((a,l)=>t.createVNode(t.Fragment,null,[e.divider&&0!==l&&t.createVNode("span",{class:"v-otp-input__divider"},[e.divider]),t.createVNode(ki,{focused:i.value&&e.focusAll||f.value===l,key:l},{...n,loader:void 0,default:()=>t.createVNode("input",{ref:e=>g.value[l]=e,"aria-label":d(e.label,l+1),autofocus:0===l&&e.autofocus,autocomplete:"one-time-code",class:["v-otp-input__field"],disabled:e.disabled,inputmode:"number"===e.type?"numeric":"text",min:"number"===e.type?0:void 0,maxlength:0===l?v.value:"1",placeholder:e.placeholder,type:"number"===e.type?"text":e.type,value:c.value[l],onInput:y,onFocus:e=>function(e,t){s(),f.value=t}(0,l),onBlur:V,onKeydown:b,onPaste:e=>function(e,t){t.preventDefault(),t.stopPropagation()
const a=t?.clipboardData?.getData("Text").slice(0,v.value)??""
w(a)||(c.value=a.split(""),g.value?.[e].blur())}(l,e)},null)})]))),t.createVNode("input",t.mergeProps({class:"v-otp-input-input",type:"hidden"},o,{value:c.value.join("")}),null),t.createVNode(di,{contained:!0,"content-class":"v-otp-input__loader","model-value":!!e.loading,persistent:!0},{default:()=>[n.loader?.()??t.createVNode(to,{color:"boolean"==typeof e.loading?void 0:e.loading,indeterminate:!0,size:"24",width:"2"},null)]}),n.default?.()])])})),{blur:()=>{g.value?.some((e=>e.blur()))},focus:()=>{g.value?.[0].focus()},reset:function(){c.value=[]},isFocused:i}}})
const Ov=ht({scale:{type:[Number,String],default:.5},...yt()},"VParallax"),Lv=Ct()({name:"VParallax",props:Ov(),setup(e,a){let{slots:l}=a
const{intersectionRef:o,isIntersecting:n}=Jl(),{resizeRef:r,contentRect:i}=Xt(),{height:s}=Cn(),u=t.ref()
let c
t.watchEffect((()=>{o.value=r.value=u.value?.$el})),t.watch(n,(e=>{e?(c=Rt(o.value),c=c===document.scrollingElement?document:c,c.addEventListener("scroll",p,{passive:!0}),p()):c.removeEventListener("scroll",p)})),t.onBeforeUnmount((()=>{c?.removeEventListener("scroll",p)})),t.watch(s,p),t.watch((()=>i.value?.height),p)
const d=t.computed((()=>1-A(Number(e.scale))))
let v=-1
function p(){n.value&&(cancelAnimationFrame(v),v=requestAnimationFrame((()=>{const e=(u.value?.$el).querySelector(".v-img__img")
if(!e)return
const t=c instanceof Document?document.documentElement.clientHeight:c.clientHeight,a=c instanceof Document?window.scrollY:c.scrollTop,l=o.value.getBoundingClientRect().top+a,n=i.value.height,r=(s=(a-(l+(n-t)/2))*d.value,Math.floor(Math.abs(s))*Math.sign(s))
var s
const v=Math.max(1,(d.value*(t-n)+n)/n)
e.style.setProperty("transform",`translateY(${r}px) scale(${v})`)})))}return Et((()=>t.createVNode(bl,{class:["v-parallax",{"v-parallax--active":n.value},e.class],style:e.style,ref:u,cover:!0,onLoadstart:p,onLoad:p},l))),{}}}),zv=ht({...Jo({falseIcon:"$radioOff",trueIcon:"$radioOn"})},"VRadio"),jv=Ct()({name:"VRadio",props:zv(),setup(e,a){let{slots:l}=a
return Et((()=>{const a=en.filterProps(e)
return t.createVNode(en,t.mergeProps(a,{class:["v-radio",e.class],style:e.style,type:"radio"}),l)})),{}}}),Hv=ht({height:{type:[Number,String],default:"auto"},...fn(),...N(Xo(),["multiple"]),trueIcon:{type:Ft,default:"$radioOn"},falseIcon:{type:Ft,default:"$radioOff"},type:{type:String,default:"radio"}},"VRadioGroup"),Wv=Ct()({name:"VRadioGroup",inheritAttrs:!1,props:Hv(),emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const n=t.useId(),r=t.computed((()=>e.id||`radio-group-${n}`)),i=na(e,"modelValue")
return Et((()=>{const[a,n]=B(l),s=mn.filterProps(e),u=en.filterProps(e),c=o.label?o.label({label:e.label,props:{for:r.value}}):e.label
return t.createVNode(mn,t.mergeProps({class:["v-radio-group",e.class],style:e.style},a,s,{modelValue:i.value,"onUpdate:modelValue":e=>i.value=e,id:r.value}),{...o,default:a=>{let{id:l,messagesId:r,isDisabled:s,isReadonly:d}=a
return t.createVNode(t.Fragment,null,[c&&t.createVNode(qo,{id:l.value},{default:()=>[c]}),t.createVNode(Qo,t.mergeProps(u,{id:l.value,"aria-describedby":r.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:s.value,readonly:d.value,"aria-labelledby":c?l.value:void 0,multiple:!1},n,{modelValue:i.value,"onUpdate:modelValue":e=>i.value=e}),o)])}})})),{}}}),Uv=ht({...rn(),...fn(),...Hs(),strict:Boolean,modelValue:{type:Array,default:()=>[0,0]}},"VRangeSlider"),Yv=Ct()({name:"VRangeSlider",props:Uv(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,end:e=>!0,start:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=t.ref(),r=t.ref(),i=t.ref(),{rtlClasses:s}=ha()
const u=Ws(e),c=na(e,"modelValue",void 0,(e=>e?.length?e.map((e=>u.roundValue(e))):[0,0])),{activeThumbRef:d,hasLabels:v,max:p,min:f,mousePressed:m,onSliderMousedown:g,onSliderTouchstart:h,position:y,trackContainerRef:b,readonly:V}=Us({props:e,steps:u,onSliderStart:()=>{o("start",c.value)},onSliderEnd:t=>{let{value:a}=t
const l=d.value===n.value?.$el?[a,c.value[1]]:[c.value[0],a]
!e.strict&&l[0]<l[1]&&(c.value=l),o("end",c.value)},onSliderMove:t=>{let{value:a}=t
const[l,o]=c.value
e.strict||l!==o||l===f.value||(d.value=a>l?r.value?.$el:n.value?.$el,d.value?.focus()),d.value===n.value?.$el?c.value=[Math.min(a,o),o]:c.value=[l,Math.max(l,a)]},getActiveThumb:function(t){if(!n.value||!r.value)return
const a=js(t,n.value.$el,e.direction),l=js(t,r.value.$el,e.direction),o=Math.abs(a),i=Math.abs(l)
return o<i||o===i&&a<0?n.value.$el:r.value.$el}}),{isFocused:w,focus:S,blur:k}=sn(e),x=t.computed((()=>y(c.value[0]))),N=t.computed((()=>y(c.value[1])))
return Et((()=>{const a=mn.filterProps(e),o=!!(e.label||l.label||l.prepend)
return t.createVNode(mn,t.mergeProps({class:["v-slider","v-range-slider",{"v-slider--has-labels":!!l["tick-label"]||v.value,"v-slider--focused":w.value,"v-slider--pressed":m.value,"v-slider--disabled":e.disabled},s.value,e.class],style:e.style,ref:i},a,{focused:w.value}),{...l,prepend:o?a=>t.createVNode(t.Fragment,null,[l.label?.(a)??(e.label?t.createVNode(qo,{class:"v-slider__label",text:e.label},null):void 0),l.prepend?.(a)]):void 0,default:a=>{let{id:o,messagesId:i}=a
return t.createVNode("div",{class:"v-slider__container",onMousedown:V.value?void 0:g,onTouchstartPassive:V.value?void 0:h},[t.createVNode("input",{id:`${o.value}_start`,name:e.name||o.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:c.value[0]},null),t.createVNode("input",{id:`${o.value}_stop`,name:e.name||o.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:c.value[1]},null),t.createVNode(Ks,{ref:b,start:x.value,stop:N.value},{"tick-label":l["tick-label"]}),t.createVNode(Gs,{ref:n,"aria-describedby":i.value,focused:w&&d.value===n.value?.$el,modelValue:c.value[0],"onUpdate:modelValue":e=>c.value=[e,c.value[1]],onFocus:e=>{S(),d.value=n.value?.$el,p.value!==f.value&&c.value[0]===c.value[1]&&c.value[1]===f.value&&e.relatedTarget!==r.value?.$el&&(n.value?.$el.blur(),r.value?.$el.focus())},onBlur:()=>{k(),d.value=void 0},min:f.value,max:c.value[1],position:x.value,ripple:e.ripple},{"thumb-label":l["thumb-label"]}),t.createVNode(Gs,{ref:r,"aria-describedby":i.value,focused:w&&d.value===r.value?.$el,modelValue:c.value[1],"onUpdate:modelValue":e=>c.value=[c.value[0],e],onFocus:e=>{S(),d.value=r.value?.$el,p.value!==f.value&&c.value[0]===c.value[1]&&c.value[0]===p.value&&e.relatedTarget!==n.value?.$el&&(r.value?.$el.blur(),n.value?.$el.focus())},onBlur:()=>{k(),d.value=void 0},min:c.value[0],max:p.value,position:N.value,ripple:e.ripple},{"thumb-label":l["thumb-label"]})])}})})),{}}}),Gv=ht({name:String,itemAriaLabel:{type:String,default:"$vuetify.rating.ariaLabel.item"},activeColor:String,color:String,clearable:Boolean,disabled:Boolean,emptyIcon:{type:Ft,default:"$ratingEmpty"},fullIcon:{type:Ft,default:"$ratingFull"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,modelValue:{type:[Number,String],default:0},itemLabels:Array,itemLabelPosition:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},ripple:Boolean,...yt(),...Al(),...Kl(),...Ba(),...ba()},"VRating"),qv=Ct()({name:"VRating",props:Gv(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{t:o}=ma(),{themeClasses:n}=Ca(e),r=na(e,"modelValue"),i=t.computed((()=>A(parseFloat(r.value),0,Number(e.length)))),s=t.computed((()=>f(Number(e.length),1))),u=t.computed((()=>s.value.flatMap((t=>e.halfIncrements?[t-.5,t]:[t])))),c=t.shallowRef(-1),d=t.computed((()=>u.value.map((t=>{const a=e.hover&&c.value>-1,l=i.value>=t,o=c.value>=t,n=(a?o:l)?e.fullIcon:e.emptyIcon,r=e.activeColor??e.color
return{isFilled:l,isHovered:o,icon:n,color:l||o?r:e.color}})))),v=t.computed((()=>[0,...u.value].map((t=>({onMouseenter:e.hover?function(){c.value=t}:void 0,onMouseleave:e.hover?function(){c.value=-1}:void 0,onClick:function(){e.disabled||e.readonly||(r.value=i.value===t&&e.clearable?0:t)}}))))),p=t.useId(),m=t.computed((()=>e.name??`v-rating-${p}`))
function g(a){let{value:n,index:r,showStar:s=!0}=a
const{onMouseenter:u,onMouseleave:c,onClick:p}=v.value[r+1],f=`${m.value}-${String(n).replace(".","-")}`,g={color:d.value[r]?.color,density:e.density,disabled:e.disabled,icon:d.value[r]?.icon,ripple:e.ripple,size:e.size,variant:"plain"}
return t.createVNode(t.Fragment,null,[t.createVNode("label",{for:f,class:{"v-rating__item--half":e.halfIncrements&&n%1>0,"v-rating__item--full":e.halfIncrements&&n%1==0},onMouseenter:u,onMouseleave:c,onClick:p},[t.createVNode("span",{class:"v-rating__hidden"},[o(e.itemAriaLabel,n,e.length)]),s?l.item?l.item({...d.value[r],props:g,value:n,index:r,rating:i.value}):t.createVNode($o,t.mergeProps({"aria-label":o(e.itemAriaLabel,n,e.length)},g),null):void 0]),t.createVNode("input",{class:"v-rating__hidden",name:m.value,id:f,type:"radio",value:n,checked:i.value===n,tabindex:-1,readonly:e.readonly,disabled:e.disabled},null)])}function h(e){return l["item-label"]?l["item-label"](e):e.label?t.createVNode("span",null,[e.label]):t.createVNode("span",null,[t.createTextVNode(" ")])}return Et((()=>{const a=!!e.itemLabels?.length||l["item-label"]
return t.createVNode(e.tag,{class:["v-rating",{"v-rating--hover":e.hover,"v-rating--readonly":e.readonly},n.value,e.class],style:e.style},{default:()=>[t.createVNode(g,{value:0,index:-1,showStar:!1},null),s.value.map(((l,o)=>t.createVNode("div",{class:"v-rating__wrapper"},[a&&"top"===e.itemLabelPosition?h({value:l,index:o,label:e.itemLabels?.[o]}):void 0,t.createVNode("div",{class:"v-rating__item"},[e.halfIncrements?t.createVNode(t.Fragment,null,[t.createVNode(g,{value:l-.5,index:2*o},null),t.createVNode(g,{value:l,index:2*o+1},null)]):t.createVNode(g,{value:l,index:o},null)]),a&&"bottom"===e.itemLabelPosition?h({value:l,index:o,label:e.itemLabels?.[o]}):void 0])))]})})),{}}}),Kv={actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, heading","card-avatar":"image, list-item-avatar",chip:"chip","date-picker":"list-item, heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",divider:"divider",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",ossein:"ossein",paragraph:"text@3",sentences:"text@2",subtitle:"text",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"chip, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"text@6","table-tfoot":"text@2, avatar@2",text:"text"}
function Xv(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]
return t.createVNode("div",{class:["v-skeleton-loader__bone",`v-skeleton-loader__${e}`]},[a])}function Zv(e){const[t,a]=e.split("@")
return Array.from({length:a}).map((()=>Qv(t)))}function Qv(e){let t=[]
if(!e)return t
const a=Kv[e]
if(e===a);else{if(e.includes(","))return Jv(e)
if(e.includes("@"))return Zv(e)
a.includes(",")?t=Jv(a):a.includes("@")?t=Zv(a):a&&t.push(Qv(a))}return[Xv(e,t)]}function Jv(e){return e.replace(/\s/g,"").split(",").map(Qv)}const ep=ht({boilerplate:Boolean,color:String,loading:Boolean,loadingText:{type:String,default:"$vuetify.loading"},type:{type:[String,Array],default:"ossein"},...nl(),...Sl(),...ba()},"VSkeletonLoader"),tp=Ct()({name:"VSkeletonLoader",props:ep(),setup(e,a){let{slots:l}=a
const{backgroundColorClasses:o,backgroundColorStyles:n}=dl((()=>e.color)),{dimensionStyles:r}=rl(e),{elevationClasses:i}=kl(e),{themeClasses:s}=Ca(e),{t:u}=ma(),c=t.computed((()=>Qv(R(e.type).join(","))))
return Et((()=>{const a=!l.default||e.loading,d=e.boilerplate||!a?{}:{ariaLive:"polite",ariaLabel:u(e.loadingText),role:"alert"}
return t.createVNode("div",t.mergeProps({class:["v-skeleton-loader",{"v-skeleton-loader--boilerplate":e.boilerplate},s.value,o.value,i.value],style:[n.value,a?r.value:{}]},d),[a?c.value:l.default?.()])})),{}}}),ap=Ct()({name:"VSlideGroupItem",props:zl(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:a}=t
const l=jl(e,Fn)
return()=>a.default?.({isSelected:l.isSelected.value,select:l.select,toggle:l.toggle,selectedClass:l.selectedClass.value})}})
const lp=ht({multiLine:Boolean,text:String,timer:[Boolean,String],timeout:{type:[Number,String],default:5e3},vertical:Boolean,...lo({location:"bottom"}),...vo(),...vl(),...Fl(),...ba(),...N(ci({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),op=Ct()({name:"VSnackbar",props:lp(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"modelValue"),{positionClasses:n}=po(e),{scopeId:r}=ti(),{themeClasses:i}=Ca(e),{colorClasses:s,colorStyles:u,variantClasses:c}=$l(e),{roundedClasses:d}=pl(e),v=function(e){const a=t.shallowRef(e())
let l=-1
function o(){clearInterval(l)}return t.onScopeDispose(o),{clear:o,time:a,start:function(t){const n=t?getComputedStyle(t):{transitionDuration:.2},r=1e3*parseFloat(n.transitionDuration)||200
if(o(),a.value<=0)return
const i=performance.now()
l=window.setInterval((()=>{const t=performance.now()-i+r
a.value=Math.max(e()-t,0),a.value<=0&&o()}),r)},reset:function(){o(),t.nextTick((()=>a.value=e()))}}}((()=>Number(e.timeout))),p=t.ref(),f=t.ref(),m=t.shallowRef(!1),g=t.shallowRef(0),h=t.ref(),b=t.inject(Zt,void 0)
oa((()=>!!b),(()=>{const e=ta()
t.watchEffect((()=>{h.value=e.mainStyles.value}))})),t.watch(o,w),t.watch((()=>e.timeout),w),t.onMounted((()=>{o.value&&w()}))
let V=-1
function w(){v.reset(),window.clearTimeout(V)
const t=Number(e.timeout)
if(!o.value||-1===t)return
const a=y(f.value)
v.start(a),V=window.setTimeout((()=>{o.value=!1}),t)}function S(){m.value=!0,v.reset(),window.clearTimeout(V)}function k(){m.value=!1,w()}function x(e){g.value=e.touches[0].clientY}function N(e){Math.abs(g.value-e.changedTouches[0].clientY)>50&&(o.value=!1)}function C(){m.value&&k()}const I=t.computed((()=>e.location.split(" ").reduce(((e,t)=>(e[`v-snackbar--${t}`]=!0,e)),{})))
return Et((()=>{const a=di.filterProps(e),g=!!(l.default||l.text||e.text)
return t.createVNode(di,t.mergeProps({ref:p,class:["v-snackbar",{"v-snackbar--active":o.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--timer":!!e.timer,"v-snackbar--vertical":e.vertical},I.value,n.value,e.class],style:[h.value,e.style]},a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,contentProps:t.mergeProps({class:["v-snackbar__wrapper",i.value,s.value,d.value,c.value],style:[u.value],onPointerenter:S,onPointerleave:k},a.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0,onTouchstartPassive:x,onTouchend:N,onAfterLeave:C},r),{default:()=>[El(!1,"v-snackbar"),e.timer&&!m.value&&t.createVNode("div",{key:"timer",class:"v-snackbar__timer"},[t.createVNode(ro,{ref:f,color:"string"==typeof e.timer?e.timer:"info",max:e.timeout,"model-value":v.time.value},null)]),g&&t.createVNode("div",{key:"content",class:"v-snackbar__content",role:"status","aria-live":"polite"},[l.text?.()??e.text,l.default?.()]),l.actions&&t.createVNode(ol,{defaults:{VBtn:{variant:"text",ripple:!1,slim:!0}}},{default:()=>[t.createVNode("div",{class:"v-snackbar__actions"},[l.actions({isActive:o})])]})],activator:l.activator})})),fi({},p)}}),np=ht({closable:[Boolean,String],closeText:{type:String,default:"$vuetify.dismiss"},modelValue:{type:Array,default:()=>[]},...N(lp(),["modelValue"])},"VSnackbarQueue"),rp=Ct()({name:"VSnackbarQueue",props:np(),emits:{"update:modelValue":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const{t:n}=ma(),r=t.shallowRef(!1),i=t.shallowRef(!1),s=t.shallowRef()
function u(){e.modelValue.length?c():(s.value=void 0,i.value=!1)}function c(){const[a,...o]=e.modelValue
l("update:modelValue",o),s.value="string"==typeof a?{text:a}:a,t.nextTick((()=>{r.value=!0}))}function d(){r.value=!1}t.watch((()=>e.modelValue.length),((e,t)=>{!i.value&&e>t&&c()})),t.watch(r,(e=>{e&&(i.value=!0)}))
const v=t.computed((()=>({color:"string"==typeof e.closable?e.closable:void 0,text:n(e.closeText)})))
Et((()=>{const a=!(!e.closable&&!o.actions),{modelValue:l,...n}=op.filterProps(e)
return t.createVNode(t.Fragment,null,[i.value&&!!s.value&&(o.default?t.createVNode(ol,{defaults:{VSnackbar:s.value}},{default:()=>[o.default({item:s.value})]}):t.createVNode(op,t.mergeProps(n,s.value,{modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,onAfterLeave:u}),{text:o.text?()=>o.text?.({item:s.value}):void 0,actions:a?()=>t.createVNode(t.Fragment,null,[o.actions?t.createVNode(ol,{defaults:{VBtn:v.value}},{default:()=>[o.actions({item:s.value,props:{onClick:d}})]}):t.createVNode($o,t.mergeProps(v.value,{onClick:d}),null)]):void 0}))])}))}}),ip=ht({autoDraw:Boolean,autoDrawDuration:[Number,String],autoDrawEasing:{type:String,default:"ease"},color:String,gradient:{type:Array,default:()=>[]},gradientDirection:{type:String,validator:e=>["top","bottom","left","right"].includes(e),default:"top"},height:{type:[String,Number],default:75},labels:{type:Array,default:()=>[]},labelSize:{type:[Number,String],default:7},lineWidth:{type:[String,Number],default:4},id:String,itemValue:{type:String,default:"value"},modelValue:{type:Array,default:()=>[]},min:[String,Number],max:[String,Number],padding:{type:[String,Number],default:8},showLabels:Boolean,smooth:[Boolean,String,Number],width:{type:[Number,String],default:300}},"Line"),sp=ht({autoLineWidth:Boolean,...ip()},"VBarline"),up=Ct()({name:"VBarline",props:sp(),setup(e,a){let{slots:l}=a
const o=t.useId(),n=t.computed((()=>e.id||`barline-${o}`)),r=t.computed((()=>Number(e.autoDrawDuration)||500)),i=t.computed((()=>Boolean(e.showLabels||e.labels.length>0||!!l?.label))),s=t.computed((()=>parseFloat(e.lineWidth)||4)),u=t.computed((()=>Math.max(e.modelValue.length*s.value,Number(e.width)))),c=t.computed((()=>({minX:0,maxX:u.value,minY:0,maxY:parseInt(e.height,10)}))),d=t.computed((()=>e.modelValue.map((t=>p(t,e.itemValue,t)))))
function v(t,a){const{minX:l,maxX:o,minY:n,maxY:r}=a,i=t.length
let s=null!=e.max?Number(e.max):Math.max(...t),u=null!=e.min?Number(e.min):Math.min(...t)
u>0&&null==e.min&&(u=0),s<0&&null==e.max&&(s=0)
const c=o/i,d=(r-n)/(s-u||1),v=r-Math.abs(u*d)
return t.map(((e,t)=>{const a=Math.abs(d*e)
return{x:l+t*c,y:v-a+Number(e<0)*a,height:a,value:e}}))}const f=t.computed((()=>{const t=[],a=v(d.value,c.value),l=a.length
for(let o=0;t.length<l;o++){const l=a[o]
let n=e.labels[o]
n||(n="object"==typeof l?l.value:l),t.push({x:l.x,value:String(n)})}return t})),m=t.computed((()=>v(d.value,c.value))),g=t.computed((()=>(Math.abs(m.value[0].x-m.value[1].x)-s.value)/2)),h=t.computed((()=>"boolean"==typeof e.smooth?e.smooth?2:0:Number(e.smooth)))
Et((()=>{const a=e.gradient.slice().length?e.gradient.slice().reverse():[""]
return t.createVNode("svg",{display:"block"},[t.createVNode("defs",null,[t.createVNode("linearGradient",{id:n.value,gradientUnits:"userSpaceOnUse",x1:"left"===e.gradientDirection?"100%":"0",y1:"top"===e.gradientDirection?"100%":"0",x2:"right"===e.gradientDirection?"100%":"0",y2:"bottom"===e.gradientDirection?"100%":"0"},[a.map(((e,l)=>t.createVNode("stop",{offset:l/Math.max(a.length-1,1),"stop-color":e||"currentColor"},null)))])]),t.createVNode("clipPath",{id:`${n.value}-clip`},[m.value.map((a=>t.createVNode("rect",{x:a.x+g.value,y:a.y,width:s.value,height:a.height,rx:h.value,ry:h.value},[e.autoDraw&&t.createVNode(t.Fragment,null,[t.createVNode("animate",{attributeName:"y",from:a.y+a.height,to:a.y,dur:`${r.value}ms`,fill:"freeze"},null),t.createVNode("animate",{attributeName:"height",from:"0",to:a.height,dur:`${r.value}ms`,fill:"freeze"},null)])])))]),i.value&&t.createVNode("g",{key:"labels",style:{textAnchor:"middle",dominantBaseline:"mathematical",fill:"currentColor"}},[f.value.map(((a,o)=>t.createVNode("text",{x:a.x+g.value+s.value/2,y:parseInt(e.height,10)-2+(parseInt(e.labelSize,10)||5.25),"font-size":Number(e.labelSize)||7},[l.label?.({index:o,value:a.value})??a.value])))]),t.createVNode("g",{"clip-path":`url(#${n.value}-clip)`,fill:`url(#${n.value})`},[t.createVNode("rect",{x:0,y:0,width:Math.max(e.modelValue.length*s.value,Number(e.width)),height:e.height},null)])])}))}})
function cp(e,t){let a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:75
if(0===e.length)return""
const o=e.shift(),n=e[e.length-1]
return(a?`M${o.x} ${l-o.x+2} L${o.x} ${o.y}`:`M${o.x} ${o.y}`)+e.map(((a,l)=>{const n=e[l+1],r=e[l-1]||o,i=n&&(u=a,c=r,dp((s=n).x+c.x)===dp(2*u.x)&&dp(s.y+c.y)===dp(2*u.y))
var s,u,c
if(!n||i)return`L${a.x} ${a.y}`
const d=Math.min(vp(r,a),vp(n,a)),v=d/2<t?d/2:t,p=pp(r,a,v),f=pp(n,a,v)
return`L${p.x} ${p.y}S${a.x} ${a.y} ${f.x} ${f.y}`})).join("")+(a?`L${n.x} ${l-o.x+2} Z`:"")}function dp(e){return parseInt(e,10)}function vp(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function pp(e,t,a){const l=e.x-t.x,o=e.y-t.y,n=Math.sqrt(l*l+o*o),r=l/n,i=o/n
return{x:t.x+r*a,y:t.y+i*a}}const fp=ht({fill:Boolean,...ip()},"VTrendline"),mp=Ct()({name:"VTrendline",props:fp(),setup(e,a){let{slots:l}=a
const o=t.useId(),n=t.computed((()=>e.id||`trendline-${o}`)),r=t.computed((()=>Number(e.autoDrawDuration)||(e.fill?500:2e3))),i=t.ref(0),s=t.ref(null)
function u(t,a){const{minX:l,maxX:o,minY:n,maxY:r}=a,i=t.length,s=null!=e.max?Number(e.max):Math.max(...t),u=null!=e.min?Number(e.min):Math.min(...t),c=(o-l)/(i-1),d=(r-n)/(s-u||1)
return t.map(((e,t)=>({x:l+t*c,y:r-(e-u)*d,value:e})))}const c=t.computed((()=>Boolean(e.showLabels||e.labels.length>0||!!l?.label))),d=t.computed((()=>parseFloat(e.lineWidth)||4)),v=t.computed((()=>Number(e.width))),f=t.computed((()=>{const t=Number(e.padding)
return{minX:t,maxX:v.value-t,minY:t,maxY:parseInt(e.height,10)-t}})),m=t.computed((()=>e.modelValue.map((t=>p(t,e.itemValue,t))))),g=t.computed((()=>{const t=[],a=u(m.value,f.value),l=a.length
for(let o=0;t.length<l;o++){const l=a[o]
let n=e.labels[o]
n||(n="object"==typeof l?l.value:l),t.push({x:l.x,value:String(n)})}return t}))
function h(t){const a="boolean"==typeof e.smooth?e.smooth?8:0:Number(e.smooth)
return cp(u(m.value,f.value),a,t,parseInt(e.height,10))}t.watch((()=>e.modelValue),(async()=>{if(await t.nextTick(),!e.autoDraw||!s.value)return
const a=s.value,l=a.getTotalLength()
e.fill?(a.style.transformOrigin="bottom center",a.style.transition="none",a.style.transform="scaleY(0)",a.getBoundingClientRect(),a.style.transition=`transform ${r.value}ms ${e.autoDrawEasing}`,a.style.transform="scaleY(1)"):(a.style.strokeDasharray=`${l}`,a.style.strokeDashoffset=`${l}`,a.getBoundingClientRect(),a.style.transition=`stroke-dashoffset ${r.value}ms ${e.autoDrawEasing}`,a.style.strokeDashoffset="0"),i.value=l}),{immediate:!0}),Et((()=>{const a=e.gradient.slice().length?e.gradient.slice().reverse():[""]
return t.createVNode("svg",{display:"block","stroke-width":parseFloat(e.lineWidth)??4},[t.createVNode("defs",null,[t.createVNode("linearGradient",{id:n.value,gradientUnits:"userSpaceOnUse",x1:"left"===e.gradientDirection?"100%":"0",y1:"top"===e.gradientDirection?"100%":"0",x2:"right"===e.gradientDirection?"100%":"0",y2:"bottom"===e.gradientDirection?"100%":"0"},[a.map(((e,l)=>t.createVNode("stop",{offset:l/Math.max(a.length-1,1),"stop-color":e||"currentColor"},null)))])]),c.value&&t.createVNode("g",{key:"labels",style:{textAnchor:"middle",dominantBaseline:"mathematical",fill:"currentColor"}},[g.value.map(((a,o)=>t.createVNode("text",{x:a.x+d.value/2+d.value/2,y:parseInt(e.height,10)-4+(parseInt(e.labelSize,10)||5.25),"font-size":Number(e.labelSize)||7},[l.label?.({index:o,value:a.value})??a.value])))]),t.createVNode("path",{ref:s,d:h(e.fill),fill:e.fill?`url(#${n.value})`:"none",stroke:e.fill?"none":`url(#${n.value})`},null),e.fill&&t.createVNode("path",{d:h(!1),fill:"none",stroke:e.color??e.gradient?.[0]},null)])}))}}),gp=ht({type:{type:String,default:"trend"},...sp(),...fp()},"VSparkline"),hp=Ct()({name:"VSparkline",props:gp(),setup(e,a){let{slots:l}=a
const{textColorClasses:o,textColorStyles:n}=cl((()=>e.color)),r=t.computed((()=>Boolean(e.showLabels||e.labels.length>0||!!l?.label))),i=t.computed((()=>{let t=parseInt(e.height,10)
return r.value&&(t+=1.5*parseInt(e.labelSize,10)),t}))
Et((()=>{const a="trend"===e.type?mp:up,r="trend"===e.type?mp.filterProps(e):up.filterProps(e)
return t.createVNode(a,t.mergeProps({key:e.type,class:o.value,style:n.value,viewBox:`0 0 ${e.width} ${parseInt(i.value,10)}`},r),l)}))}}),yp=ht({...yt(),...mi({offset:8,minWidth:0,openDelay:0,closeDelay:100,location:"top center",transition:"scale-transition"})},"VSpeedDial"),bp=Ct()({name:"VSpeedDial",props:yp(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"modelValue"),n=t.ref(),r=t.computed((()=>{const[t,a="center"]=e.location?.split(" ")??[]
return`${t} ${a}`})),i=t.computed((()=>({[`v-speed-dial__content--${r.value.replace(" ","-")}`]:!0})))
return Et((()=>{const a=gi.filterProps(e)
return t.createVNode(gi,t.mergeProps(a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:e.class,style:e.style,contentClass:["v-speed-dial__content",i.value,e.contentClass],location:r.value,ref:n,transition:"fade-transition"}),{...l,default:a=>t.createVNode(ol,{defaults:{VBtn:{size:"small"}}},{default:()=>[t.createVNode(ml,{appear:!0,group:!0,transition:e.transition},{default:()=>[l.default?.(a)]})]})})})),{}}}),Vp=Symbol.for("vuetify:v-stepper"),wp=ht({color:String,disabled:{type:[Boolean,String],default:!1},prevText:{type:String,default:"$vuetify.stepper.prev"},nextText:{type:String,default:"$vuetify.stepper.next"}},"VStepperActions"),Sp=Ct()({name:"VStepperActions",props:wp(),emits:{"click:prev":()=>!0,"click:next":()=>!0},setup(e,a){let{emit:l,slots:o}=a
const{t:n}=ma()
function r(){l("click:prev")}function i(){l("click:next")}return Et((()=>{const a={onClick:r},l={onClick:i}
return t.createVNode("div",{class:"v-stepper-actions"},[t.createVNode(ol,{defaults:{VBtn:{disabled:["prev",!0].includes(e.disabled),text:n(e.prevText),variant:"text"}}},{default:()=>[o.prev?.({props:a})??t.createVNode($o,a,null)]}),t.createVNode(ol,{defaults:{VBtn:{color:e.color,disabled:["next",!0].includes(e.disabled),text:n(e.nextText),variant:"tonal"}}},{default:()=>[o.next?.({props:l})??t.createVNode($o,l,null)]})])})),{}}}),kp=It("v-stepper-header"),xp=ht({color:String,title:String,subtitle:String,complete:Boolean,completeIcon:{type:Ft,default:"$complete"},editable:Boolean,editIcon:{type:Ft,default:"$edit"},error:Boolean,errorIcon:{type:Ft,default:"$error"},icon:Ft,ripple:{type:[Boolean,Object],default:!0},rules:{type:Array,default:()=>[]}},"StepperItem"),Np=ht({...xp(),...zl()},"VStepperItem"),Cp=Ct()({name:"VStepperItem",directives:{Ripple:Eo},props:Np(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:l}=a
const o=jl(e,Vp,!0),n=t.computed((()=>o?.value.value??e.value)),r=t.computed((()=>e.rules.every((e=>!0===e())))),i=t.computed((()=>!e.disabled&&e.editable)),s=t.computed((()=>!e.disabled&&e.editable)),u=t.computed((()=>e.error||!r.value)),c=t.computed((()=>e.complete||e.rules.length>0&&r.value)),d=t.computed((()=>u.value?e.errorIcon:c.value?e.completeIcon:o.isSelected.value&&e.editable?e.editIcon:e.icon)),v=t.computed((()=>({canEdit:s.value,hasError:u.value,hasCompleted:c.value,title:e.title,subtitle:e.subtitle,step:n.value,value:e.value})))
return Et((()=>{const a=(!o||o.isSelected.value||c.value||s.value)&&!u.value&&!e.disabled,r=!(null==e.title&&!l.title),p=!(null==e.subtitle&&!l.subtitle)
return t.withDirectives(t.createVNode("button",{class:["v-stepper-item",{"v-stepper-item--complete":c.value,"v-stepper-item--disabled":e.disabled,"v-stepper-item--error":u.value},o?.selectedClass.value],disabled:!e.editable,type:"button",onClick:function(){o?.toggle()}},[i.value&&El(!0,"v-stepper-item"),t.createVNode(Yo,{key:"stepper-avatar",class:"v-stepper-item__avatar",color:a?e.color:void 0,size:24},{default:()=>[l.icon?.(v.value)??(d.value?t.createVNode(Ql,{icon:d.value},null):n.value)]}),t.createVNode("div",{class:"v-stepper-item__content"},[r&&t.createVNode("div",{key:"title",class:"v-stepper-item__title"},[l.title?.(v.value)??e.title]),p&&t.createVNode("div",{key:"subtitle",class:"v-stepper-item__subtitle"},[l.subtitle?.(v.value)??e.subtitle]),l.default?.(v.value)])]),[[t.resolveDirective("ripple"),e.ripple&&e.editable,null]])})),{}}}),Ip=ht({...N(xs(),["continuous","nextIcon","prevIcon","showArrows","touch","mandatory"])},"VStepperWindow"),_p=Ct()({name:"VStepperWindow",props:Ip(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=t.inject(Vp,null),n=na(e,"modelValue"),r=t.computed({get:()=>null==n.value&&o?o.items.value.find((e=>o.selected.value.includes(e.id)))?.value:n.value,set(e){n.value=e}})
return Et((()=>{const a=Ns.filterProps(e)
return t.createVNode(Ns,t.mergeProps({_as:"VStepperWindow"},a,{modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-stepper-window",e.class],style:e.style,mandatory:!1,touch:!1}),l)})),{}}}),Pp=ht({..._s()},"VStepperWindowItem"),Bp=Ct()({name:"VStepperWindowItem",props:Pp(),setup(e,a){let{slots:l}=a
return Et((()=>{const a=Ps.filterProps(e)
return t.createVNode(Ps,t.mergeProps({_as:"VStepperWindowItem"},a,{class:["v-stepper-window-item",e.class],style:e.style}),l)})),{}}}),Rp=ht({altLabels:Boolean,bgColor:String,completeIcon:Ft,editIcon:Ft,editable:Boolean,errorIcon:Ft,hideActions:Boolean,items:{type:Array,default:()=>[]},itemTitle:{type:String,default:"title"},itemValue:{type:String,default:"value"},nonLinear:Boolean,flat:Boolean,...Nn()},"Stepper"),Ap=ht({...Rp(),...Ll({mandatory:"force",selectedClass:"v-stepper-item--selected"}),...lu(),...k(wp(),["prevText","nextText"])},"VStepper"),Tp=Ct()({name:"VStepper",props:Ap(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{items:o,next:n,prev:r,selected:i}=Hl(e,Vp),{displayClasses:s,mobile:u}=Cn(e),{completeIcon:c,editIcon:d,errorIcon:v,color:f,editable:m,prevText:g,nextText:h}=t.toRefs(e),y=t.computed((()=>e.items.map(((t,a)=>({title:p(t,e.itemTitle,t),value:p(t,e.itemValue,a+1),raw:t}))))),b=t.computed((()=>o.value.findIndex((e=>i.value.includes(e.id)))))
return kt({VStepperItem:{editable:m,errorIcon:v,completeIcon:c,editIcon:d,prevText:g,nextText:h},VStepperActions:{color:f,disabled:t.computed((()=>e.disabled?e.disabled:0===b.value?"prev":b.value===o.value.length-1&&"next")),prevText:g,nextText:h}}),Et((()=>{const a=ou.filterProps(e),o=!(!l.header&&!e.items.length),i=e.items.length>0,c=!(e.hideActions||!i&&!l.actions)
return t.createVNode(ou,t.mergeProps(a,{color:e.bgColor,class:["v-stepper",{"v-stepper--alt-labels":e.altLabels,"v-stepper--flat":e.flat,"v-stepper--non-linear":e.nonLinear,"v-stepper--mobile":u.value},s.value,e.class],style:e.style}),{default:()=>[o&&t.createVNode(kp,{key:"stepper-header"},{default:()=>[y.value.map(((e,a)=>{let{raw:o,...n}=e
return t.createVNode(t.Fragment,null,[!!a&&t.createVNode(hr,null,null),t.createVNode(Cp,n,{default:l[`header-item.${n.value}`]??l.header,icon:l.icon,title:l.title,subtitle:l.subtitle})])}))]}),i&&t.createVNode(_p,{key:"stepper-window"},{default:()=>[y.value.map((e=>t.createVNode(Bp,{value:e.value},{default:()=>l[`item.${e.value}`]?.(e)??l.item?.(e)})))]}),l.default?.({prev:r,next:n}),c&&(l.actions?.({next:n,prev:r})??t.createVNode(Sp,{key:"stepper-actions","onClick:prev":r,"onClick:next":n},l))]})})),{prev:r,next:n}}}),Dp=ht({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...fn(),...Jo()},"VSwitch"),Ep=Ct()({name:"VSwitch",inheritAttrs:!1,props:Dp(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,l){let{attrs:o,slots:n}=l
const r=na(e,"indeterminate"),i=na(e,"modelValue"),{loaderClasses:s}=so(e),{isFocused:u,focus:c,blur:d}=sn(e),v=t.ref(),p=a&&window.matchMedia("(forced-colors: active)").matches,f=t.toRef((()=>"string"==typeof e.loading&&""!==e.loading?e.loading:e.color)),m=t.useId(),g=t.toRef((()=>e.id||`switch-${m}`))
function h(){r.value&&(r.value=!1)}function y(e){e.stopPropagation(),e.preventDefault(),v.value?.input?.click()}return Et((()=>{const[a,l]=B(o),m=mn.filterProps(e),b=en.filterProps(e)
return t.createVNode(mn,t.mergeProps({class:["v-switch",{"v-switch--flat":e.flat},{"v-switch--inset":e.inset},{"v-switch--indeterminate":r.value},s.value,e.class]},a,m,{modelValue:i.value,"onUpdate:modelValue":e=>i.value=e,id:g.value,focused:u.value,style:e.style}),{...n,default:a=>{let{id:o,messagesId:s,isDisabled:u,isReadonly:m,isValid:g}=a
const V={model:i,isValid:g}
return t.createVNode(en,t.mergeProps({ref:v},b,{modelValue:i.value,"onUpdate:modelValue":[e=>i.value=e,h],id:o.value,"aria-describedby":s.value,type:"checkbox","aria-checked":r.value?"mixed":void 0,disabled:u.value,readonly:m.value,onFocus:c,onBlur:d},l),{...n,default:e=>{let{backgroundColorClasses:a,backgroundColorStyles:l}=e
return t.createVNode("div",{class:["v-switch__track",p?void 0:a.value],style:l.value,onClick:y},[n["track-true"]&&t.createVNode("div",{key:"prepend",class:"v-switch__track-true"},[n["track-true"](V)]),n["track-false"]&&t.createVNode("div",{key:"append",class:"v-switch__track-false"},[n["track-false"](V)])])},input:a=>{let{inputNode:l,icon:o,backgroundColorClasses:r,backgroundColorStyles:i}=a
return t.createVNode(t.Fragment,null,[l,t.createVNode("div",{class:["v-switch__thumb",{"v-switch__thumb--filled":o||e.loading},e.inset||p?void 0:r.value],style:e.inset?void 0:i.value},[n.thumb?t.createVNode(ol,{defaults:{VIcon:{icon:o,size:"x-small"}}},{default:()=>[n.thumb({...V,icon:o})]}):t.createVNode(Ya,null,{default:()=>[e.loading?t.createVNode(uo,{name:"v-switch",active:!0,color:!1===g.value?void 0:f.value},{default:e=>n.loader?n.loader(e):t.createVNode(to,{active:e.isActive,color:e.color,indeterminate:!0,size:"16",width:"2"},null)}):o&&t.createVNode(Ql,{key:String(o),icon:o,size:"x-small"},null)]})])])}})}})})),{}}}),Fp=ht({color:String,height:[Number,String],window:Boolean,...yt(),...Sl(),...ea(),...vl(),...Ba(),...ba()},"VSystemBar"),$p=Ct()({name:"VSystemBar",props:Fp(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{backgroundColorClasses:n,backgroundColorStyles:r}=dl((()=>e.color)),{elevationClasses:i}=kl(e),{roundedClasses:s}=pl(e),{ssrBootStyles:u}=_l(),c=t.computed((()=>e.height??(e.window?32:24))),{layoutItemStyles:d}=aa({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.shallowRef("top"),layoutSize:c,elementSize:c,active:t.computed((()=>!0)),absolute:t.toRef((()=>e.absolute))})
return Et((()=>t.createVNode(e.tag,{class:["v-system-bar",{"v-system-bar--window":e.window},o.value,n.value,i.value,s.value,e.class],style:[r.value,d.value,u.value,e.style]},l))),{}}}),Mp=Symbol.for("vuetify:v-tabs"),Op=ht({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...N(Fo({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),Lp=Ct()({name:"VTab",props:Op(),setup(e,a){let{slots:l,attrs:o}=a
const{textColorClasses:n,textColorStyles:r}=cl((()=>e.sliderColor)),i=t.ref(),s=t.ref(),u=t.computed((()=>"horizontal"===e.direction)),c=t.computed((()=>i.value?.group?.isSelected.value??!1))
function d(e){let{value:t}=e
if(t){const e=i.value?.$el.parentElement?.querySelector(".v-tab--selected .v-tab__slider"),t=s.value
if(!e||!t)return
const a=getComputedStyle(e).color,l=e.getBoundingClientRect(),o=t.getBoundingClientRect(),n=u.value?"x":"y",r=u.value?"X":"Y",c=u.value?"right":"bottom",d=u.value?"width":"height",v=l[n]>o[n]?l[c]-o[c]:l[n]-o[n],p=Math.sign(v)>0?u.value?"right":"bottom":Math.sign(v)<0?u.value?"left":"top":"center",f=(Math.abs(v)+(Math.sign(v)<0?l[d]:o[d]))/Math.max(l[d],o[d])||0,m=1.5
ye(t,{backgroundColor:[a,"currentcolor"],transform:[`translate${r}(${v}px) scale${r}(${l[d]/o[d]||0})`,`translate${r}(${v/m}px) scale${r}(${(f-1)/m+1})`,"none"],transformOrigin:Array(3).fill(p)},{duration:225,easing:Pt})}}return Et((()=>{const a=$o.filterProps(e)
return t.createVNode($o,t.mergeProps({symbol:Mp,ref:i,class:["v-tab",e.class],style:e.style,tabindex:c.value?0:-1,role:"tab","aria-selected":String(c.value),active:!1},a,o,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":d}),{...l,default:()=>t.createVNode(t.Fragment,null,[l.default?.()??e.text,!e.hideSlider&&t.createVNode("div",{ref:s,class:["v-tab__slider",n.value],style:r.value},null)])})})),fi({},i)}}),zp=ht({...N(xs(),["continuous","nextIcon","prevIcon","showArrows","touch","mandatory"])},"VTabsWindow"),jp=Ct()({name:"VTabsWindow",props:zp(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=t.inject(Mp,null),n=na(e,"modelValue"),r=t.computed({get:()=>null==n.value&&o?o.items.value.find((e=>o.selected.value.includes(e.id)))?.value:n.value,set(e){n.value=e}})
return Et((()=>{const a=Ns.filterProps(e)
return t.createVNode(Ns,t.mergeProps({_as:"VTabsWindow"},a,{modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-tabs-window",e.class],style:e.style,mandatory:!1,touch:!1}),l)})),{}}}),Hp=ht({..._s()},"VTabsWindowItem"),Wp=Ct()({name:"VTabsWindowItem",props:Hp(),setup(e,a){let{slots:l}=a
return Et((()=>{const a=Ps.filterProps(e)
return t.createVNode(Ps,t.mergeProps({_as:"VTabsWindowItem"},a,{class:["v-tabs-window-item",e.class],style:e.style}),l)})),{}}})
const Up=ht({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...$n({mandatory:"force",selectedClass:"v-tab-item--selected"}),...Al(),...Ba()},"VTabs"),Yp=Ct()({name:"VTabs",props:Up(),emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const n=na(e,"modelValue"),r=t.computed((()=>function(e){return e?e.map((e=>g(e)?e:{text:e,value:e})):[]}(e.items))),{densityClasses:i}=Tl(e),{backgroundColorClasses:s,backgroundColorStyles:u}=dl((()=>e.bgColor)),{scopeId:c}=ti()
return kt({VTab:{color:t.toRef((()=>e.color)),direction:t.toRef((()=>e.direction)),stacked:t.toRef((()=>e.stacked)),fixed:t.toRef((()=>e.fixedTabs)),sliderColor:t.toRef((()=>e.sliderColor)),hideSlider:t.toRef((()=>e.hideSlider))}}),Et((()=>{const a=Mn.filterProps(e),d=!!(o.window||e.items.length>0)
return t.createVNode(t.Fragment,null,[t.createVNode(Mn,t.mergeProps(a,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},i.value,s.value,e.class],style:[{"--v-tabs-height":m(e.height)},u.value,e.style],role:"tablist",symbol:Mp},c,l),{default:()=>[o.default?.()??r.value.map((e=>o.tab?.({item:e})??t.createVNode(Lp,t.mergeProps(e,{key:e.text,value:e.value}),{default:o[`tab.${e.value}`]?()=>o[`tab.${e.value}`]?.({item:e}):void 0})))]}),d&&t.createVNode(jp,t.mergeProps({modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,key:"tabs-window"},c),{default:()=>[r.value.map((e=>o.item?.({item:e})??t.createVNode(Wp,{value:e.value},{default:()=>o[`item.${e.value}`]?.({item:e})}))),o.window?.()]})])})),{}}}),Gp=ht({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...fn(),...Si()},"VTextarea"),qp=Ct()({name:"VTextarea",directives:{Intersect:hl},inheritAttrs:!1,props:Gp(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const r=na(e,"modelValue"),{isFocused:i,focus:s,blur:u}=sn(e),c=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(r.value):(r.value||"").toString().length)),d=t.computed((()=>l.maxlength?l.maxlength:!e.counter||"number"!=typeof e.counter&&"string"!=typeof e.counter?void 0:e.counter))
function v(t,a){e.autofocus&&t&&a[0].target?.focus?.()}const p=t.ref(),f=t.ref(),g=t.shallowRef(""),h=t.ref(),y=t.computed((()=>e.persistentPlaceholder||i.value||e.active))
function b(){h.value!==document.activeElement&&h.value?.focus(),i.value||s()}function V(e){b(),o("click:control",e)}function w(e){o("mousedown:control",e)}function S(a){a.stopPropagation(),b(),t.nextTick((()=>{r.value="",K(e["onClick:clear"],a)}))}function k(a){const l=a.target
if(r.value=l.value,e.modelModifiers?.trim){const e=[l.selectionStart,l.selectionEnd]
t.nextTick((()=>{l.selectionStart=e[0],l.selectionEnd=e[1]}))}}const x=t.ref(),N=t.ref(Number(e.rows)),C=t.computed((()=>["plain","underlined"].includes(e.variant)))
function I(){e.autoGrow&&t.nextTick((()=>{if(!x.value||!f.value)return
const t=getComputedStyle(x.value),a=getComputedStyle(f.value.$el),l=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),o=x.value.scrollHeight,n=parseFloat(t.lineHeight),r=A(o??0,Math.max(parseFloat(e.rows)*n+l,parseFloat(a.getPropertyValue("--v-input-control-height"))),parseFloat(e.maxRows)*n+l||1/0)
N.value=Math.floor((r-l)/n),g.value=m(r)}))}let _
return t.watchEffect((()=>{e.autoGrow||(N.value=Number(e.rows))})),t.onMounted(I),t.watch(r,I),t.watch((()=>e.rows),I),t.watch((()=>e.maxRows),I),t.watch((()=>e.density),I),t.watch(x,(e=>{e?(_=new ResizeObserver(I),_.observe(x.value)):_?.disconnect()})),t.onBeforeUnmount((()=>{_?.disconnect()})),Et((()=>{const a=!!(n.counter||e.counter||e.counterValue),o=!(!a&&!n.details),[s,m]=B(l),{modelValue:I,..._}=mn.filterProps(e),P=ki.filterProps(e)
return t.createVNode(mn,t.mergeProps({ref:p,modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-input--plain-underlined":C.value},e.class],style:e.style},s,_,{centerAffix:1===N.value&&!C.value,focused:i.value}),{...n,default:a=>{let{id:l,isDisabled:o,isDirty:s,isReadonly:c,isValid:d}=a
return t.createVNode(ki,t.mergeProps({ref:f,style:{"--v-textarea-control-height":g.value},onClick:V,onMousedown:w,"onClick:clear":S,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},P,{id:l.value,active:y.value||s.value,centerAffix:1===N.value&&!C.value,dirty:s.value||e.dirty,disabled:o.value,focused:i.value,error:!1===d.value}),{...n,default:a=>{let{props:{class:l,...n}}=a
return t.createVNode(t.Fragment,null,[e.prefix&&t.createVNode("span",{class:"v-text-field__prefix"},[e.prefix]),t.withDirectives(t.createVNode("textarea",t.mergeProps({ref:h,class:l,value:r.value,onInput:k,autofocus:e.autofocus,readonly:c.value,disabled:o.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:b,onBlur:u},n,m),null),[[t.resolveDirective("intersect"),{handler:v},null,{once:!0}]]),e.autoGrow&&t.withDirectives(t.createVNode("textarea",{class:[l,"v-textarea__sizer"],id:`${n.id}-sizer`,"onUpdate:modelValue":e=>r.value=e,ref:x,readonly:!0,"aria-hidden":"true"},null),[[t.vModelText,r.value]]),e.suffix&&t.createVNode("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:o?l=>t.createVNode(t.Fragment,null,[n.details?.(l),a&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(yi,{active:e.persistentCounter||i.value,value:c.value,max:d.value,disabled:e.disabled},n.counter)])]):void 0})})),fi({},p,f,h)}}),Kp=ht({withBackground:Boolean,...yt(),...ba(),...Ba()},"VThemeProvider"),Xp=Ct()({name:"VThemeProvider",props:Kp(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e)
return()=>e.withBackground?t.createVNode(e.tag,{class:["v-theme-provider",o.value,e.class],style:e.style},{default:()=>[l.default?.()]}):l.default?.()}}),Zp=ht({dotColor:String,fillDot:Boolean,hideDot:Boolean,icon:Ft,iconColor:String,lineColor:String,...yt(),...vl(),...Kl(),...Sl()},"VTimelineDivider"),Qp=Ct()({name:"VTimelineDivider",props:Zp(),setup(e,a){let{slots:l}=a
const{sizeClasses:o,sizeStyles:n}=Xl(e,"v-timeline-divider__dot"),{backgroundColorStyles:r,backgroundColorClasses:i}=dl((()=>e.dotColor)),{roundedClasses:s}=pl(e,"v-timeline-divider__dot"),{elevationClasses:u}=kl(e),{backgroundColorClasses:c,backgroundColorStyles:d}=dl((()=>e.lineColor))
return Et((()=>t.createVNode("div",{class:["v-timeline-divider",{"v-timeline-divider--fill-dot":e.fillDot},e.class],style:e.style},[t.createVNode("div",{class:["v-timeline-divider__before",c.value],style:d.value},null),!e.hideDot&&t.createVNode("div",{key:"dot",class:["v-timeline-divider__dot",u.value,s.value,o.value],style:n.value},[t.createVNode("div",{class:["v-timeline-divider__inner-dot",i.value,s.value],style:r.value},[l.default?t.createVNode(ol,{key:"icon-defaults",disabled:!e.icon,defaults:{VIcon:{color:e.iconColor,icon:e.icon,size:e.size}}},l.default):t.createVNode(Ql,{key:"icon",color:e.iconColor,icon:e.icon,size:e.size},null)])]),t.createVNode("div",{class:["v-timeline-divider__after",c.value],style:d.value},null)]))),{}}}),Jp=ht({density:String,dotColor:String,fillDot:Boolean,hideDot:Boolean,hideOpposite:{type:Boolean,default:void 0},icon:Ft,iconColor:String,lineInset:[Number,String],side:{type:String,validator:e=>null==e||["start","end"].includes(e)},...yt(),...nl(),...Sl(),...vl(),...Kl(),...Ba()},"VTimelineItem"),ef=Ct()({name:"VTimelineItem",props:Jp(),setup(e,a){let{slots:l}=a
const{dimensionStyles:o}=rl(e),n=t.shallowRef(0),r=t.ref()
return t.watch(r,(e=>{e&&(n.value=e.$el.querySelector(".v-timeline-divider__dot")?.getBoundingClientRect().width??0)}),{flush:"post"}),Et((()=>t.createVNode("div",{class:["v-timeline-item",{"v-timeline-item--fill-dot":e.fillDot,"v-timeline-item--side-start":"start"===e.side,"v-timeline-item--side-end":"end"===e.side},e.class],style:[{"--v-timeline-dot-size":m(n.value),"--v-timeline-line-inset":e.lineInset?`calc(var(--v-timeline-dot-size) / 2 + ${m(e.lineInset)})`:m(0)},e.style]},[t.createVNode("div",{class:"v-timeline-item__body",style:o.value},[l.default?.()]),t.createVNode(Qp,{ref:r,hideDot:e.hideDot,icon:e.icon,iconColor:e.iconColor,size:e.size,elevation:e.elevation,dotColor:e.dotColor,fillDot:e.fillDot,rounded:e.rounded},{default:l.icon}),"compact"!==e.density&&t.createVNode("div",{class:"v-timeline-item__opposite"},[!e.hideOpposite&&l.opposite?.()])]))),{}}}),tf=ht({align:{type:String,default:"center",validator:e=>["center","start"].includes(e)},direction:{type:String,default:"vertical",validator:e=>["vertical","horizontal"].includes(e)},justify:{type:String,default:"auto",validator:e=>["auto","center"].includes(e)},side:{type:String,validator:e=>null==e||["start","end"].includes(e)},lineThickness:{type:[String,Number],default:2},lineColor:String,truncateLine:{type:String,validator:e=>["start","end","both"].includes(e)},...k(Jp({lineInset:0}),["dotColor","fillDot","hideOpposite","iconColor","lineInset","size"]),...yt(),...Al(),...Ba(),...ba()},"VTimeline"),af=Ct()({name:"VTimeline",props:tf(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Ca(e),{densityClasses:n}=Tl(e),{rtlClasses:r}=ha()
kt({VTimelineDivider:{lineColor:t.toRef((()=>e.lineColor))},VTimelineItem:{density:t.toRef((()=>e.density)),dotColor:t.toRef((()=>e.dotColor)),fillDot:t.toRef((()=>e.fillDot)),hideOpposite:t.toRef((()=>e.hideOpposite)),iconColor:t.toRef((()=>e.iconColor)),lineColor:t.toRef((()=>e.lineColor)),lineInset:t.toRef((()=>e.lineInset)),size:t.toRef((()=>e.size))}})
const i=t.computed((()=>{const t=e.side?e.side:"default"!==e.density?"end":null
return t&&`v-timeline--side-${t}`})),s=t.computed((()=>{const t=["v-timeline--truncate-line-start","v-timeline--truncate-line-end"]
switch(e.truncateLine){case"both":return t
case"start":return t[0]
case"end":return t[1]
default:return null}}))
return Et((()=>t.createVNode(e.tag,{class:["v-timeline",`v-timeline--${e.direction}`,`v-timeline--align-${e.align}`,`v-timeline--justify-${e.justify}`,s.value,{"v-timeline--inset-line":!!e.lineInset},o.value,n.value,i.value,r.value,e.class],style:[{"--v-timeline-line-thickness":m(e.lineThickness)},e.style]},l))),{}}}),lf=ht({...yt(),...Fl({variant:"text"})},"VToolbarItems"),of=Ct()({name:"VToolbarItems",props:lf(),setup(e,a){let{slots:l}=a
return kt({VBtn:{color:t.toRef((()=>e.color)),height:"inherit",variant:t.toRef((()=>e.variant))}}),Et((()=>t.createVNode("div",{class:["v-toolbar-items",e.class],style:e.style},[l.default?.()]))),{}}}),nf=ht({id:String,interactive:Boolean,text:String,...N(ci({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},"VTooltip"),rf=Ct()({name:"VTooltip",props:nf(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=na(e,"modelValue"),{scopeId:n}=ti(),r=t.useId(),i=t.toRef((()=>e.id||`v-tooltip-${r}`)),s=t.ref(),u=t.computed((()=>e.location.split(" ").length>1?e.location:e.location+" center")),c=t.computed((()=>"auto"===e.origin||"overlap"===e.origin||e.origin.split(" ").length>1||e.location.split(" ").length>1?e.origin:e.origin+" center")),d=t.toRef((()=>e.transition?e.transition:o.value?"scale-transition":"fade-transition")),v=t.computed((()=>t.mergeProps({"aria-describedby":i.value},e.activatorProps)))
return Et((()=>{const a=di.filterProps(e)
return t.createVNode(di,t.mergeProps({ref:s,class:["v-tooltip",{"v-tooltip--interactive":e.interactive},e.class],style:e.style,id:i.value},a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,transition:d.value,absolute:!0,location:u.value,origin:c.value,persistent:!0,role:"tooltip",activatorProps:v.value,_disableGlobalStack:!0},n),{activator:l.activator,default:function(){for(var t=arguments.length,a=new Array(t),o=0;o<t;o++)a[o]=arguments[o]
return l.default?.(...a)??e.text}})})),fi({},s)}}),sf=Ct()({name:"VValidation",props:vn(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t
const l=pn(e,"validation")
return()=>a.default?.(l)}})
var uf=Object.freeze({__proto__:null,VAlert:Wo,VAlertTitle:zo,VApp:Pa,VAppBar:Bl,VAppBarNavIcon:Oo,VAppBarTitle:Lo,VAutocomplete:Hi,VAvatar:Yo,VBadge:Ui,VBanner:Xi,VBannerActions:Gi,VBannerText:qi,VBottomNavigation:Qi,VBottomSheet:as,VBreadcrumbs:ss,VBreadcrumbsDivider:os,VBreadcrumbsItem:rs,VBtn:$o,VBtnGroup:Ol,VBtnToggle:Gl,VCard:ys,VCardActions:us,VCardItem:fs,VCardSubtitle:ds,VCardText:gs,VCardTitle:vs,VCarousel:Is,VCarouselItem:Rs,VCheckbox:hn,VCheckboxBtn:an,VChip:Hn,VChipGroup:zn,VClassIcon:jt,VCode:As,VCol:id,VColorPicker:Cu,VCombobox:_u,VComponentIcon:Ot,VConfirmEdit:Bu,VContainer:Jc,VCounter:yi,VDataIterator:vc,VDataTable:Gc,VDataTableFooter:gc,VDataTableHeaders:Tc,VDataTableRow:$c,VDataTableRows:Oc,VDataTableServer:Zc,VDataTableVirtual:Kc,VDatePicker:Md,VDatePickerControls:Id,VDatePickerHeader:Pd,VDatePickerMonth:Ad,VDatePickerMonths:Dd,VDatePickerYears:Fd,VDefaultsProvider:ol,VDialog:es,VDialogBottomTransition:Ha,VDialogTopTransition:Wa,VDialogTransition:Oa,VDivider:hr,VEmptyState:Ld,VExpandTransition:tl,VExpandXTransition:al,VExpansionPanel:Gd,VExpansionPanelText:Hd,VExpansionPanelTitle:Ud,VExpansionPanels:Xd,VFab:Qd,VFabTransition:ja,VFadeTransition:Ua,VField:ki,VFieldLabel:Vi,VFileInput:ev,VFooter:av,VForm:ov,VHover:rv,VIcon:Ql,VImg:bl,VInfiniteScroll:uv,VInput:mn,VItem:pv,VItemGroup:vv,VKbd:fv,VLabel:qo,VLayout:gv,VLayoutItem:yv,VLazy:Vv,VLigatureIcon:zt,VList:Ir,VListGroup:sr,VListImg:_r,VListItem:pr,VListItemAction:Br,VListItemMedia:Ar,VListItemSubtitle:cr,VListItemTitle:dr,VListSubheader:mr,VLocaleProvider:Sv,VMain:xv,VMenu:gi,VMessages:nn,VNavigationDrawer:Tv,VNoSsr:Dv,VNumberInput:Fv,VOtpInput:Mv,VOverlay:di,VPagination:fc,VParallax:Lv,VProgressCircular:to,VProgressLinear:ro,VRadio:jv,VRadioGroup:Wv,VRangeSlider:Yv,VRating:qv,VResponsive:sl,VRow:xd,VScaleTransition:Ya,VScrollXReverseTransition:qa,VScrollXTransition:Ga,VScrollYReverseTransition:Xa,VScrollYTransition:Ka,VSelect:Fi,VSelectionControl:en,VSelectionControlGroup:Qo,VSheet:ou,VSkeletonLoader:tp,VSlideGroup:Mn,VSlideGroupItem:ap,VSlideXReverseTransition:Qa,VSlideXTransition:Za,VSlideYReverseTransition:el,VSlideYTransition:Ja,VSlider:Zs,VSnackbar:op,VSnackbarQueue:rp,VSpacer:Nd,VSparkline:hp,VSpeedDial:bp,VStepper:Tp,VStepperActions:Sp,VStepperHeader:kp,VStepperItem:Cp,VStepperWindow:_p,VStepperWindowItem:Bp,VSvgIcon:Lt,VSwitch:Ep,VSystemBar:$p,VTab:Lp,VTable:zc,VTabs:Yp,VTabsWindow:jp,VTabsWindowItem:Wp,VTextField:Ci,VTextarea:qp,VThemeProvider:Xp,VTimeline:af,VTimelineItem:ef,VToolbar:Cl,VToolbarItems:of,VToolbarTitle:Aa,VTooltip:rf,VValidation:sf,VVirtualScroll:Ai,VWindow:Ns,VWindowItem:Ps})
function cf(e,t){e._mutate?.[t.instance.$.uid]&&(e._mutate[t.instance.$.uid].observer.disconnect(),delete e._mutate[t.instance.$.uid])}const df={mounted:function(e,t){const a=t.modifiers||{},l=t.value,{once:o,immediate:n,...r}=a,i=!Object.keys(r).length,{handler:s,options:u}="object"==typeof l?l:{handler:l,options:{attributes:r?.attr??i,characterData:r?.char??i,childList:r?.child??i,subtree:r?.sub??i}},c=new MutationObserver((function(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],l=arguments.length>1?arguments[1]:void 0
s?.(a,l),o&&cf(e,t)}))
n&&s?.([],c),e._mutate=Object(e._mutate),e._mutate[t.instance.$.uid]={observer:c},c.observe(e,u)},unmounted:cf}
const vf={mounted:function(e,t){const a=t.value,l={passive:!t.modifiers?.active}
window.addEventListener("resize",a,l),e._onResize=Object(e._onResize),e._onResize[t.instance.$.uid]={handler:a,options:l},t.modifiers?.quiet||a()},unmounted:function(e,t){if(!e._onResize?.[t.instance.$.uid])return
const{handler:a,options:l}=e._onResize[t.instance.$.uid]
window.removeEventListener("resize",a,l),delete e._onResize[t.instance.$.uid]}}
function pf(e,t){const{self:a=!1}=t.modifiers??{},l=t.value,o="object"==typeof l&&l.options||{passive:!0},n="function"==typeof l||"handleEvent"in l?l:l.handler,r=a?e:t.arg?document.querySelector(t.arg):window
r&&(r.addEventListener("scroll",n,o),e._onScroll=Object(e._onScroll),e._onScroll[t.instance.$.uid]={handler:n,options:o,target:a?void 0:r})}function ff(e,t){if(!e._onScroll?.[t.instance.$.uid])return
const{handler:a,options:l,target:o=e}=e._onScroll[t.instance.$.uid]
o.removeEventListener("scroll",a,l),delete e._onScroll[t.instance.$.uid]}const mf={mounted:pf,unmounted:ff,updated:function(e,t){t.value!==t.oldValue&&(ff(e,t),pf(e,t))}}
const gf=function(e,a){const l=function(e,a){return function(l,o,n){const r="function"==typeof a?a(o):a,i=o.value?.text??o.value??r?.text,s=g(o.value)?o.value:{},u=()=>i??l.textContent,c=(n.ctx===o.instance.$?function(e,t){const a=new Set,l=t=>{for(const o of t){if(!o)continue
if(o===e||o.el&&e.el&&o.el===e.el)return!0
let t
if(a.add(o),o.suspense?t=l([o.ssContent]):Array.isArray(o.children)?t=l(o.children):o.component?.vnode&&(t=l([o.component?.subTree])),t)return t
a.delete(o)}return!1}
if(!l([t.subTree]))return Oe("Could not find original vnode, component will not inherit provides"),t
const o=Array.from(a).reverse()
for(const e of o)if(e.component)return e.component
return t}(n,o.instance.$)?.provides:n.ctx?.provides)??o.instance.$.provides,d=t.h(e,t.mergeProps(r,s),u)
d.appContext=Object.assign(Object.create(null),o.instance.$.appContext,{provides:c}),t.render(d,l)}}("string"==typeof e?t.resolveComponent(e):e,a)
return{mounted:l,updated:l,unmounted(e){t.render(null,e)}}}(rf,(e=>({activator:"parent",location:e.arg?.replace("-"," "),text:"boolean"==typeof e.value?void 0:e.value})))
var hf=Object.freeze({__proto__:null,ClickOutside:si,Intersect:hl,Mutate:df,Resize:vf,Ripple:Eo,Scroll:mf,Tooltip:gf,Touch:ws})
function yf(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const{blueprint:l,...o}=e,n=$(l,o),{aliases:r={},components:i={},directives:s={}}=n,u=t.effectScope()
return u.run((()=>{const e=function(e){return t.ref(e)}(n.defaults),l=function(e,l){const{thresholds:o,mobileBreakpoint:n}=wn(e),r=t.shallowRef(kn(l)),i=t.shallowRef(xn(l)),s=t.reactive({}),u=t.shallowRef(Sn(l))
function c(){r.value=kn(),u.value=Sn()}return t.watchEffect((()=>{const e=u.value<o.sm,t=u.value<o.md&&!e,a=u.value<o.lg&&!(t||e),l=u.value<o.xl&&!(a||t||e),c=u.value<o.xxl&&!(l||a||t||e),d=u.value>=o.xxl,v=e?"xs":t?"sm":a?"md":l?"lg":c?"xl":"xxl",p="number"==typeof n?n:o[n],f=u.value<p
s.xs=e,s.sm=t,s.md=a,s.lg=l,s.xl=c,s.xxl=d,s.smAndUp=!e,s.mdAndUp=!(e||t),s.lgAndUp=!(e||t||a),s.xlAndUp=!(e||t||a||l),s.smAndDown=!(a||l||c||d),s.mdAndDown=!(l||c||d),s.lgAndDown=!(c||d),s.xlAndDown=!d,s.name=v,s.height=r.value,s.width=u.value,s.mobile=f,s.mobileBreakpoint=n,s.platform=i.value,s.thresholds=o})),a&&(window.addEventListener("resize",c,{passive:!0}),t.onScopeDispose((()=>{window.removeEventListener("resize",c)}),!0)),{...t.toRefs(s),update:function(){c(),i.value=xn()},ssr:!!l}}(n.display,n.ssr),o=Na(n.theme),c=Ht(n.icons),d=fa(n.locale),v=function(e,t){const a=$({adapter:wu,locale:{af:"af-ZA",bg:"bg-BG",ca:"ca-ES",ckb:"",cs:"cs-CZ",de:"de-DE",el:"el-GR",en:"en-US",et:"et-EE",fa:"fa-IR",fi:"fi-FI",hr:"hr-HR",hu:"hu-HU",he:"he-IL",id:"id-ID",it:"it-IT",ja:"ja-JP",ko:"ko-KR",lv:"lv-LV",lt:"lt-LT",nl:"nl-NL",no:"no-NO",pl:"pl-PL",pt:"pt-PT",ro:"ro-RO",ru:"ru-RU",sk:"sk-SK",sl:"sl-SI",srCyrl:"sr-SP",srLatn:"sr-SP",sv:"sv-SE",th:"th-TH",tr:"tr-TR",az:"az-AZ",uk:"uk-UA",vi:"vi-VN",zhHans:"zh-CN",zhHant:"zh-TW"}},e)
return{options:a,instance:xu(a,t)}}(n.date,d),p=function(e,t){return{rtl:t.isRtl,options:$({container:void 0,duration:300,layout:!1,offset:0,easing:"easeInOutCubic",patterns:{linear:e=>e,easeInQuad:e=>e**2,easeOutQuad:e=>e*(2-e),easeInOutQuad:e=>e<.5?2*e**2:(4-2*e)*e-1,easeInCubic:e=>e**3,easeOutCubic:e=>--e**3+1,easeInOutCubic:e=>e<.5?4*e**3:(e-1)*(2*e-2)*(2*e-2)+1,easeInQuart:e=>e**4,easeOutQuart:e=>1- --e**4,easeInOutQuart:e=>e<.5?8*e**4:1-8*--e**4,easeInQuint:e=>e**5,easeOutQuint:e=>1+--e**5,easeInOutQuint:e=>e<.5?16*e**5:1+16*--e**5}},e)}}(n.goTo,d)
return{install:function(u){for(const e in s)u.directive(e,s[e])
for(const e in i)u.component(e,i[e])
for(const e in r)u.component(e,Nt({...r[e],name:e,aliasName:r[e].name}))
const f=t.effectScope()
if(f.run((()=>{o.install(u)})),u.onUnmount((()=>f.stop())),u.provide(wt,e),u.provide(bn,l),u.provide(ya,o),u.provide($t,c),u.provide(pa,d),u.provide(Su,v.options),u.provide(ku,v.instance),u.provide(In,p),a&&n.ssr)if(u.$nuxt)u.$nuxt.hook("app:suspense:resolve",(()=>{l.update()}))
else{const{mount:e}=u
u.mount=function(){const a=e(...arguments)
return t.nextTick((()=>l.update())),u.mount=e,a}}("boolean"!=typeof __VUE_OPTIONS_API__||__VUE_OPTIONS_API__)&&u.mixin({computed:{$vuetify(){return t.reactive({defaults:bf.call(this,wt),display:bf.call(this,bn),theme:bf.call(this,ya),icons:bf.call(this,$t),locale:bf.call(this,pa),date:bf.call(this,ku)})}}})},unmount:function(){u.stop()},defaults:e,display:l,theme:o,icons:c,locale:d,date:v,goTo:p}}))}function bf(e){const t=this.$,a=t.parent?.provides??t.vnode.appContext?.provides
if(a&&e in a)return a[e]}yf.version="3.8.3"
const Vf=function(){return yf({components:uf,directives:hf,...arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}})},wf="3.8.3"
Vf.version=wf,e.blueprints=Kt,e.components=uf,e.createVuetify=Vf,e.directives=hf,e.useDate=Nu,e.useDefaults=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0
const{props:a,provideSubDefaults:l}=xt(e,t)
return l(),a},e.useDisplay=Cn,e.useGoTo=Rn,e.useLayout=ta,e.useLocale=ma,e.useRtl=ha,e.useTheme=Ia,e.version=wf}))
//# sourceMappingURL=vuetify.min.js.map
