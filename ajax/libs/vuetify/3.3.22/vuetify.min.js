/*!
* Vuetify v3.3.22
* Forged by John Leider
* Released under the MIT License.
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Vuetify={},e.Vue)}(this,(function(e,t){"use strict"
function a(e,t){return a=>Object.keys(e).reduce(((l,o)=>{const n="object"==typeof e[o]&&null!=e[o]&&!Array.isArray(e[o])?e[o]:{type:e[o]}
return l[o]=a&&o in a?{...n,default:a[o]}:n,t&&!l[o].source&&(l[o].source=t),l}),{})}const l=a({class:[String,Array],style:{type:[String,Array,Object],default:null}},"component"),o="undefined"!=typeof window,n=o&&"IntersectionObserver"in window,r=o&&("ontouchstart"in window||window.navigator.maxTouchPoints>0)
function i(e,t,a){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,a)}function s(e,t,a){return function(e,t,a){if(t.set)t.set.call(e,a)
else{if(!t.writable)throw new TypeError("attempted to set read only private field")
t.value=a}}(e,c(e,t,"set"),a),a}function u(e,t){return function(e,t){if(t.get)return t.get.call(e)
return t.value}(e,c(e,t,"get"))}function c(e,t,a){if(!t.has(e))throw new TypeError("attempted to "+a+" private field on non-instance")
return t.get(e)}function d(e,t,a){const l=t.length-1
if(l<0)return void 0===e?a:e
for(let o=0;o<l;o++){if(null==e)return a
e=e[t[o]]}return null==e||void 0===e[t[l]]?a:e[t[l]]}function v(e,t){if(e===t)return!0
if(e instanceof Date&&t instanceof Date&&e.getTime()!==t.getTime())return!1
if(e!==Object(e)||t!==Object(t))return!1
const a=Object.keys(e)
return a.length===Object.keys(t).length&&a.every((a=>v(e[a],t[a])))}function p(e,t,a){return null!=e&&t&&"string"==typeof t?void 0!==e[t]?e[t]:d(e,(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),a):a}function f(e,t,a){if(!0===t)return void 0===e?a:e
if(null==t||"boolean"==typeof t)return a
if(e!==Object(e)){if("function"!=typeof t)return a
const l=t(e,a)
return void 0===l?a:l}if("string"==typeof t)return p(e,t,a)
if(Array.isArray(t))return d(e,t,a)
if("function"!=typeof t)return a
const l=t(e,a)
return void 0===l?a:l}function m(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
return Array.from({length:e},((e,a)=>t+a))}function g(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"px"
return null==e||""===e?void 0:isNaN(+e)?String(e):isFinite(+e)?`${Number(e)}${t}`:void 0}function h(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}function y(e){return e&&"$el"in e?e.$el:e}const b=Object.freeze({enter:13,tab:9,delete:46,esc:27,space:32,up:38,down:40,left:37,right:39,end:35,home:36,del:46,backspace:8,insert:45,pageup:33,pagedown:34,shift:16}),V=Object.freeze({enter:"Enter",tab:"Tab",delete:"Delete",esc:"Escape",space:"Space",up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",end:"End",home:"Home",del:"Delete",backspace:"Backspace",insert:"Insert",pageup:"PageUp",pagedown:"PageDown",shift:"Shift"})
function w(e){return Object.keys(e)}function S(e,t){return t.every((t=>e.hasOwnProperty(t)))}function k(e,t,a){const l=Object.create(null),o=Object.create(null)
for(const n in e)t.some((e=>e instanceof RegExp?e.test(n):e===n))&&!a?.some((e=>e===n))?l[n]=e[n]:o[n]=e[n]
return[l,o]}function x(e,t){const a={...e}
return t.forEach((e=>delete a[e])),a}const C=/^on[^a-z]/,N=e=>C.test(e),_=["onAfterscriptexecute","onAnimationcancel","onAnimationend","onAnimationiteration","onAnimationstart","onAuxclick","onBeforeinput","onBeforescriptexecute","onChange","onClick","onCompositionend","onCompositionstart","onCompositionupdate","onContextmenu","onCopy","onCut","onDblclick","onFocusin","onFocusout","onFullscreenchange","onFullscreenerror","onGesturechange","onGestureend","onGesturestart","onGotpointercapture","onInput","onKeydown","onKeypress","onKeyup","onLostpointercapture","onMousedown","onMousemove","onMouseout","onMouseover","onMouseup","onMousewheel","onPaste","onPointercancel","onPointerdown","onPointerenter","onPointerleave","onPointermove","onPointerout","onPointerover","onPointerup","onReset","onSelect","onSubmit","onTouchcancel","onTouchend","onTouchmove","onTouchstart","onTransitioncancel","onTransitionend","onTransitionrun","onTransitionstart","onWheel"],I=["ArrowUp","ArrowDown","ArrowRight","ArrowLeft","Enter","Escape","Tab"," "]
function B(e){const[t,a]=k(e,[C]),l=x(t,_),[o,n]=k(a,["class","style","id",/^data-/])
return Object.assign(o,t),Object.assign(n,l),[o,n]}function R(e){return null==e?[]:Array.isArray(e)?e:[e]}function A(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1
return Math.max(t,Math.min(a,e))}function E(e){const t=e.toString().trim()
return t.includes(".")?t.length-t.indexOf(".")-1:0}function T(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0"
return e+a.repeat(Math.max(0,t-e.length))}function P(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0"
return a.repeat(Math.max(0,t-e.length))+e}function $(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3
if(e<t)return`${e} B`
const a=1024===t?["Ki","Mi","Gi"]:["k","M","G"]
let l=-1
for(;Math.abs(e)>=t&&l<a.length-1;)e/=t,++l
return`${e.toFixed(1)} ${a[l]}B`}function L(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2?arguments[2]:void 0
const l={}
for(const t in e)l[t]=e[t]
for(const o in t){const n=e[o],r=t[o]
h(n)&&h(r)?l[o]=L(n,r,a):Array.isArray(n)&&Array.isArray(r)&&a?l[o]=a(n,r):l[o]=r}return l}function M(e){return e.map((e=>e.type===t.Fragment?M(e.children):e)).flat()}function F(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:""
if(F.cache.has(e))return F.cache.get(e)
const t=e.replace(/[^a-z]/gi,"-").replace(/\B([A-Z])/g,"-$1").toLowerCase()
return F.cache.set(e,t),t}function D(e,t){if(!t||"object"!=typeof t)return[]
if(Array.isArray(t))return t.map((t=>D(e,t))).flat(1)
if(Array.isArray(t.children))return t.children.map((t=>D(e,t))).flat(1)
if(t.component){if(Object.getOwnPropertySymbols(t.component.provides).includes(e))return[t.component]
if(t.component.subTree)return D(e,t.component.subTree).flat(1)}return[]}F.cache=new Map
var O=new WeakMap,z=new WeakMap
class j{constructor(e){i(this,O,{writable:!0,value:[]}),i(this,z,{writable:!0,value:0}),this.size=e}push(e){u(this,O)[u(this,z)]=e,s(this,z,(u(this,z)+1)%this.size)}values(){return u(this,O).slice(u(this,z)).concat(u(this,O).slice(0,u(this,z)))}}function H(e){const a=t.reactive({}),l=t.computed(e)
return t.watchEffect((()=>{for(const e in l.value)a[e]=l.value[e]}),{flush:"sync"}),t.toRefs(a)}function U(e,t){return e.includes(t)}function W(e){return e[2].toLowerCase()+e.slice(3)}const Y=()=>[Function,Array]
function G(e,a){return!!(e[a="on"+t.capitalize(a)]||e[`${a}Once`]||e[`${a}Capture`]||e[`${a}OnceCapture`]||e[`${a}CaptureOnce`])}function K(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),l=1;l<t;l++)a[l-1]=arguments[l]
if(Array.isArray(e))for(const t of e)t(...a)
else"function"==typeof e&&e(...a)}function q(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
const a=["button","[href]",'input:not([type="hidden"])',"select","textarea","[tabindex]"].map((e=>`${e}${t?':not([tabindex="-1"])':""}:not([disabled])`)).join(", ")
return[...e.querySelectorAll(a)]}function X(e,t,a){let l,o=e.indexOf(document.activeElement)
const n="next"===t?1:-1
do{o+=n,l=e[o]}while((!l||null==l.offsetParent||!(a?.(l)??1))&&o<e.length&&o>=0)
return l}function Z(e,t){const a=q(e)
if(t)if("first"===t)a[0]?.focus()
else if("last"===t)a.at(-1)?.focus()
else if("number"==typeof t)a[t]?.focus()
else{const l=X(a,t)
l?l.focus():Z(e,"next"===t?"first":"last")}else e!==document.activeElement&&e.contains(document.activeElement)||a[0]?.focus()}function J(){}function Q(e,t){if(!(o&&"undefined"!=typeof CSS&&void 0!==CSS.supports&&CSS.supports(`selector(${t})`)))return null
try{return!!e&&e.matches(t)}catch(e){return null}}const ee=["top","bottom"],te=["start","end","left","right"]
function ae(e,t){let[a,l]=e.split(" ")
return l||(l=U(ee,a)?"start":U(te,a)?"top":"center"),{side:le(a,t),align:le(l,t)}}function le(e,t){return"start"===e?t?"right":"left":"end"===e?t?"left":"right":e}function oe(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function ne(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function re(e){return{side:e.align,align:e.side}}function ie(e){return U(ee,e.side)?"y":"x"}class se{constructor(e){let{x:t,y:a,width:l,height:o}=e
this.x=t,this.y=a,this.width=l,this.height=o}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function ue(e,t){return{x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}}}function ce(e){const t=e.getBoundingClientRect(),a=getComputedStyle(e),l=a.transform
if(l){let o,n,r,i,s
if(l.startsWith("matrix3d("))o=l.slice(9,-1).split(/, /),n=+o[0],r=+o[5],i=+o[12],s=+o[13]
else{if(!l.startsWith("matrix("))return new se(t)
o=l.slice(7,-1).split(/, /),n=+o[0],r=+o[3],i=+o[4],s=+o[5]}const u=a.transformOrigin,c=t.x-i-(1-n)*parseFloat(u),d=t.y-s-(1-r)*parseFloat(u.slice(u.indexOf(" ")+1)),v=n?t.width/n:e.offsetWidth+1,p=r?t.height/r:e.offsetHeight+1
return new se({x:c,y:d,width:v,height:p})}return new se(t)}function de(e,t,a){if(void 0===e.animate)return{finished:Promise.resolve()}
let l
try{l=e.animate(t,a)}catch(e){return{finished:Promise.resolve()}}return void 0===l.finished&&(l.finished=new Promise((e=>{l.onfinish=()=>{e(l)}}))),l}const ve=new WeakMap
function pe(e,t){Object.keys(t).forEach((a=>{if(N(a)){const l=W(a),o=ve.get(e)
if(null==t[a])o?.forEach((t=>{const[a,n]=t
a===l&&(e.removeEventListener(l,n),o.delete(t))}))
else if(!o||![...o]?.some((e=>e[0]===l&&e[1]===t[a]))){e.addEventListener(l,t[a])
const n=o||new Set
n.add([l,t[a]]),ve.has(e)||ve.set(e,n)}}else null==t[a]?e.removeAttribute(a):e.setAttribute(a,t[a])}))}function fe(e,t){Object.keys(t).forEach((t=>{if(N(t)){const a=W(t),l=ve.get(e)
l?.forEach((t=>{const[o,n]=t
o===a&&(e.removeEventListener(a,n),l.delete(t))}))}else e.removeAttribute(t)}))}const me=2.4,ge=.2126729,he=.7151522,ye=.072175,be=.03,Ve=12.82051282051282,we=.06
function Se(e,t){const a=(e.r/255)**me,l=(e.g/255)**me,o=(e.b/255)**me,n=(t.r/255)**me,r=(t.g/255)**me,i=(t.b/255)**me
let s,u=a*ge+l*he+o*ye,c=n*ge+r*he+i*ye
if(u<=be&&(u+=(be-u)**1.45),c<=be&&(c+=(be-c)**1.45),Math.abs(c-u)<5e-4)return 0
if(c>u){const e=1.25*(c**.55-u**.58)
s=e<.001?0:e<.078?e-e*Ve*we:e-we}else{const e=1.25*(c**.62-u**.57)
s=e>-.001?0:e>-.078?e-e*Ve*we:e+we}return 100*s}function ke(e){t.warn(`Vuetify: ${e}`)}function xe(e){t.warn(`Vuetify error: ${e}`)}const Ce=.20689655172413793,Ne=e=>e>Ce**3?Math.cbrt(e):e/(3*Ce**2)+4/29,_e=e=>e>Ce?e**3:3*Ce**2*(e-4/29)
function Ie(e){const t=Ne,a=t(e[1])
return[116*a-16,500*(t(e[0]/.95047)-a),200*(a-t(e[2]/1.08883))]}function Be(e){const t=_e,a=(e[0]+16)/116
return[.95047*t(a+e[1]/500),t(a),1.08883*t(a-e[2]/200)]}const Re=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]],Ae=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,Ee=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],Te=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4
function Pe(e){const t=Array(3),a=Ae,l=Re
for(let o=0;o<3;++o)t[o]=Math.round(255*A(a(l[o][0]*e[0]+l[o][1]*e[1]+l[o][2]*e[2])))
return{r:t[0],g:t[1],b:t[2]}}function $e(e){let{r:t,g:a,b:l}=e
const o=[0,0,0],n=Te,r=Ee
t=n(t/255),a=n(a/255),l=n(l/255)
for(let e=0;e<3;++e)o[e]=r[e][0]*t+r[e][1]*a+r[e][2]*l
return o}function Le(e){return!!e&&/^(#|var\(--|(rgb|hsl)a?\()/.test(e)}const Me=/^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/,Fe={rgb:(e,t,a,l)=>({r:e,g:t,b:a,a:l}),rgba:(e,t,a,l)=>({r:e,g:t,b:a,a:l}),hsl:(e,t,a,l)=>ze({h:e,s:t,l:a,a:l}),hsla:(e,t,a,l)=>ze({h:e,s:t,l:a,a:l}),hsv:(e,t,a,l)=>Oe({h:e,s:t,v:a,a:l}),hsva:(e,t,a,l)=>Oe({h:e,s:t,v:a,a:l})}
function De(e){if("number"==typeof e)return(isNaN(e)||e<0||e>16777215)&&ke(`'${e}' is not a valid hex color`),{r:(16711680&e)>>16,g:(65280&e)>>8,b:255&e}
if("string"==typeof e&&Me.test(e)){const{groups:t}=e.match(Me),{fn:a,values:l}=t,o=l.split(/,\s*/).map((e=>e.endsWith("%")&&["hsl","hsla","hsv","hsva"].includes(a)?parseFloat(e)/100:parseFloat(e)))
return Fe[a](...o)}if("string"==typeof e){let t=e.startsWith("#")?e.slice(1):e;[3,4].includes(t.length)?t=t.split("").map((e=>e+e)).join(""):[6,8].includes(t.length)||ke(`'${e}' is not a valid hex(a) color`)
const a=parseInt(t,16)
return(isNaN(a)||a<0||a>4294967295)&&ke(`'${e}' is not a valid hex(a) color`),qe(t)}if("object"==typeof e){if(S(e,["r","g","b"]))return e
if(S(e,["h","s","l"]))return Oe(Ue(e))
if(S(e,["h","s","v"]))return Oe(e)}throw new TypeError(`Invalid color: ${null==e?e:String(e)||e.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`)}function Oe(e){const{h:t,s:a,v:l,a:o}=e,n=e=>{const o=(e+t/60)%6
return l-l*a*Math.max(Math.min(o,4-o,1),0)},r=[n(5),n(3),n(1)].map((e=>Math.round(255*e)))
return{r:r[0],g:r[1],b:r[2],a:o}}function ze(e){return Oe(Ue(e))}function je(e){if(!e)return{h:0,s:1,v:1,a:1}
const t=e.r/255,a=e.g/255,l=e.b/255,o=Math.max(t,a,l),n=Math.min(t,a,l)
let r=0
o!==n&&(o===t?r=60*(0+(a-l)/(o-n)):o===a?r=60*(2+(l-t)/(o-n)):o===l&&(r=60*(4+(t-a)/(o-n)))),r<0&&(r+=360)
const i=[r,0===o?0:(o-n)/o,o]
return{h:i[0],s:i[1],v:i[2],a:e.a}}function He(e){const{h:t,s:a,v:l,a:o}=e,n=l-l*a/2
return{h:t,s:1===n||0===n?0:(l-n)/Math.min(n,1-n),l:n,a:o}}function Ue(e){const{h:t,s:a,l,a:o}=e,n=l+a*Math.min(l,1-l)
return{h:t,s:0===n?0:2-2*l/n,v:n,a:o}}function We(e){let{r:t,g:a,b:l,a:o}=e
return void 0===o?`rgb(${t}, ${a}, ${l})`:`rgba(${t}, ${a}, ${l}, ${o})`}function Ye(e){return We(Oe(e))}function Ge(e){const t=Math.round(e).toString(16)
return("00".substr(0,2-t.length)+t).toUpperCase()}function Ke(e){let{r:t,g:a,b:l,a:o}=e
return`#${[Ge(t),Ge(a),Ge(l),void 0!==o?Ge(Math.round(255*o)):""].join("")}`}function qe(e){e=function(e){e.startsWith("#")&&(e=e.slice(1))
3!==(e=e.replace(/([^0-9a-f])/gi,"F")).length&&4!==e.length||(e=e.split("").map((e=>e+e)).join(""))
6!==e.length&&(e=T(T(e,6),8,"F"))
return e}(e)
let[t,a,l,o]=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
const a=[]
let l=0
for(;l<e.length;)a.push(e.substr(l,t)),l+=t
return a}(e,2).map((e=>parseInt(e,16)))
return o=void 0===o?o:o/255,{r:t,g:a,b:l,a:o}}function Xe(e){return Ke(Oe(e))}function Ze(e,t){const a=Ie($e(e))
return a[0]=a[0]+10*t,Pe(Be(a))}function Je(e,t){const a=Ie($e(e))
return a[0]=a[0]-10*t,Pe(Be(a))}function Qe(e){return $e(De(e))[1]}function et(e,t){const a=Qe(e),l=Qe(t)
return(Math.max(a,l)+.05)/(Math.min(a,l)+.05)}function tt(e){const t=Math.abs(Se(De(0),De(e)))
return Math.abs(Se(De(16777215),De(e)))>Math.min(t,50)?"#fff":"#000"}const at=Symbol.for("vuetify:defaults")
function lt(e){return t.ref(e)}function ot(){const e=t.inject(at)
if(!e)throw new Error("[Vuetify] Could not find defaults instance")
return e}function nt(e,a){const l=ot(),o=t.ref(e),n=t.computed((()=>{if(t.unref(a?.disabled))return l.value
const e=t.unref(a?.scoped),n=t.unref(a?.reset),r=t.unref(a?.root)
if(null==o.value&&!(e||n||r))return l.value
let i=L(o.value,{prev:l.value})
if(e)return i
if(n||r){const e=Number(n||1/0)
for(let t=0;t<=e&&(i&&"prev"in i);t++)i=i.prev
return i&&"string"==typeof r&&r in i&&(i=L(L(i,{prev:i}),i[r])),i}return i.prev?L(i.prev,i):i}))
return t.provide(at,n),n}function rt(e,t){return void 0!==e.props?.[t]||void 0!==e.props?.[F(t)]}function it(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=arguments.length>1?arguments[1]:void 0,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ot()
const o=pt("useDefaults")
if(a=a??o.type.name??o.type.__name,!a)throw new Error("[Vuetify] Could not determine component name")
const n=t.computed((()=>l.value?.[e._as??a])),r=new Proxy(e,{get(e,t){const a=Reflect.get(e,t)
return"class"===t||"style"===t?[n.value?.[t],a].filter((e=>null!=e)):"string"!=typeof t||rt(o.vnode,t)?a:n.value?.[t]??l.value?.global?.[t]??a}}),i=t.shallowRef()
function s(){const e=St(at,o)
t.provide(at,t.computed((()=>i.value?L(e?.value??{},i.value):e?.value)))}return t.watchEffect((()=>{if(n.value){const e=Object.entries(n.value).filter((e=>{let[t]=e
return t.startsWith(t[0].toUpperCase())}))
i.value=e.length?Object.fromEntries(e):void 0}else i.value=void 0})),{props:r,provideSubDefaults:s}}function st(e){if(e._setup=e._setup??e.setup,!e.name)return ke("The component is missing an explicit name, unable to generate default prop value"),e
if(e._setup){e.props=a(e.props??{},e.name)()
const t=Object.keys(e.props)
e.filterProps=function(e){return k(e,t,["class","style"])},e.props._as=String,e.setup=function(t,a){const l=ot()
if(!l.value)return e._setup(t,a)
const{props:o,provideSubDefaults:n}=it(t,t._as??e.name,l),r=e._setup(o,a)
return n(),r}}return e}function ut(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0]
return a=>(e?st:t.defineComponent)(a)}function ct(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div",o=arguments.length>2?arguments[2]:void 0
return ut()({name:o??t.capitalize(t.camelize(e.replace(/__/g,"-"))),props:{tag:{type:String,default:a},...l()},setup(a,l){let{slots:o}=l
return()=>t.h(a.tag,{class:[e,a.class],style:a.style},o.default?.())}})}function dt(e){if("function"!=typeof e.getRootNode){for(;e.parentNode;)e=e.parentNode
return e!==document?null:document}const t=e.getRootNode()
return t!==document&&t.getRootNode({composed:!0})!==document?null:t}const vt="cubic-bezier(0.4, 0, 0.2, 1)"
function pt(e,a){const l=t.getCurrentInstance()
if(!l)throw new Error(`[Vuetify] ${e} ${a||"must be called from inside a setup function"}`)
return l}function ft(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"composables"
const t=pt(e).type
return F(t?.aliasName||t?.name)}let mt=0,gt=new WeakMap
function ht(){const e=pt("getUid")
if(gt.has(e))return gt.get(e)
{const t=mt++
return gt.set(e,t),t}}function yt(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
for(;e;){if(t?wt(e):Vt(e))return e
e=e.parentElement}return document.scrollingElement}function bt(e,t){const a=[]
if(t&&e&&!t.contains(e))return a
for(;e&&(Vt(e)&&a.push(e),e!==t);)e=e.parentElement
return a}function Vt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1
const t=window.getComputedStyle(e)
return"scroll"===t.overflowY||"auto"===t.overflowY&&e.scrollHeight>e.clientHeight}function wt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1
const t=window.getComputedStyle(e)
return["scroll","auto"].includes(t.overflowY)}function St(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:pt("injectSelf")
const{provides:a}=t
if(a&&e in a)return a[e]}function kt(e){pt("useRender").render=e}function xt(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"content"
const l=t.ref(),n=t.ref()
if(o){const o=new ResizeObserver((t=>{e?.(t,o),t.length&&(n.value="content"===a?t[0].contentRect:t[0].target.getBoundingClientRect())}))
t.onBeforeUnmount((()=>{o.disconnect()})),t.watch(l,((e,t)=>{t&&(o.unobserve(y(t)),n.value=void 0),e&&o.observe(y(e))}),{flush:"post"})}return{resizeRef:l,contentRect:t.readonly(n)}}ht.reset=()=>{mt=0,gt=new WeakMap}
const Ct=Symbol.for("vuetify:layout"),Nt=Symbol.for("vuetify:layout-item"),_t=a({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),It=a({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item")
function Bt(){const e=t.inject(Ct)
if(!e)throw new Error("[Vuetify] Could not find injected layout")
return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function Rt(e){const a=t.inject(Ct)
if(!a)throw new Error("[Vuetify] Could not find injected layout")
const l=e.id??`layout-item-${ht()}`,o=pt("useLayoutItem")
t.provide(Nt,{id:l})
const n=t.shallowRef(!1)
t.onDeactivated((()=>n.value=!0)),t.onActivated((()=>n.value=!1))
const{layoutItemStyles:r,layoutItemScrimStyles:i}=a.register(o,{...e,active:t.computed((()=>!n.value&&e.active.value)),id:l})
return t.onBeforeUnmount((()=>a.unregister(l))),{layoutItemStyles:r,layoutRect:a.layoutRect,layoutItemScrimStyles:i}}function At(e){const a=t.inject(Ct,null),l=t.computed((()=>a?a.rootZIndex.value-100:1e3)),o=t.ref([]),n=t.reactive(new Map),r=t.reactive(new Map),i=t.reactive(new Map),s=t.reactive(new Map),u=t.reactive(new Map),{resizeRef:c,contentRect:d}=xt(),v=t.computed((()=>{const t=new Map,a=e.overlaps??[]
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
n.push({id:r,layer:u}),o=u}return n})(t,n,r,s)})),f=t.computed((()=>!Array.from(u.values()).some((e=>e.value)))),m=t.computed((()=>p.value[p.value.length-1].layer)),h=t.computed((()=>({"--v-layout-left":g(m.value.left),"--v-layout-right":g(m.value.right),"--v-layout-top":g(m.value.top),"--v-layout-bottom":g(m.value.bottom),...f.value?void 0:{transition:"none"}}))),y=t.computed((()=>p.value.slice(1).map(((e,t)=>{let{id:a}=e
const{layer:l}=p.value[t],o=r.get(a),i=n.get(a)
return{id:a,...l,size:Number(o.value),position:i.value}})))),b=e=>y.value.find((t=>t.id===e)),V=pt("createLayout"),w=t.shallowRef(!1)
t.onMounted((()=>{w.value=!0})),t.provide(Ct,{register:(e,a)=>{let{id:c,order:d,position:m,layoutSize:g,elementSize:h,active:b,disableTransitions:S,absolute:k}=a
i.set(c,d),n.set(c,m),r.set(c,g),s.set(c,b),S&&u.set(c,S)
const x=D(Nt,V?.vnode).indexOf(e)
x>-1?o.value.splice(x,0,c):o.value.push(c)
const C=t.computed((()=>y.value.findIndex((e=>e.id===c)))),N=t.computed((()=>l.value+2*p.value.length-2*C.value))
return{layoutItemStyles:t.computed((()=>{const e="left"===m.value||"right"===m.value,t="right"===m.value,a="bottom"===m.value,o={[m.value]:0,zIndex:N.value,transform:`translate${e?"X":"Y"}(${(b.value?0:-110)*(t||a?-1:1)}%)`,position:k.value||1e3!==l.value?"absolute":"fixed",...f.value?void 0:{transition:"none"}}
if(!w.value)return o
const n=y.value[C.value]
if(!n)throw new Error(`[Vuetify] Could not find layout item "${c}"`)
const r=v.value.get(c)
return r&&(n[r.position]+=r.amount),{...o,height:e?`calc(100% - ${n.top}px - ${n.bottom}px)`:h.value?`${h.value}px`:void 0,left:t?void 0:`${n.left}px`,right:t?`${n.right}px`:void 0,top:"bottom"!==m.value?`${n.top}px`:void 0,bottom:"top"!==m.value?`${n.bottom}px`:void 0,width:e?h.value?`${h.value}px`:void 0:`calc(100% - ${n.left}px - ${n.right}px)`}})),layoutItemScrimStyles:t.computed((()=>({zIndex:N.value-1}))),zIndex:N}},unregister:e=>{i.delete(e),n.delete(e),r.delete(e),s.delete(e),u.delete(e),o.value=o.value.filter((t=>t!==e))},mainRect:m,mainStyles:h,getLayoutItem:b,items:y,layoutRect:d,rootZIndex:l})
return{layoutClasses:t.computed((()=>["v-layout",{"v-layout--full-height":e.fullHeight}])),layoutStyles:t.computed((()=>({zIndex:a?l.value:void 0,position:a?"relative":void 0,overflow:a?"hidden":void 0}))),getLayoutItem:b,items:y,layoutRect:d,layoutRef:c}}var Et={badge:"Badge",open:"Open",close:"Close",dataIterator:{noResultsText:"No matching records found",loadingText:"Loading items..."},dataTable:{itemsPerPageText:"Rows per page:",ariaLabel:{sortDescending:"Sorted descending.",sortAscending:"Sorted ascending.",sortNone:"Not sorted.",activateNone:"Activate to remove sorting.",activateDescending:"Activate to sort descending.",activateAscending:"Activate to sort ascending."},sortBy:"Sort by"},dataFooter:{itemsPerPageText:"Items per page:",itemsPerPageAll:"All",nextPage:"Next page",prevPage:"Previous page",firstPage:"First page",lastPage:"Last page",pageText:"{0}-{1} of {2}"},dateRangeInput:{divider:"to"},datePicker:{ok:"OK",cancel:"Cancel",range:{title:"Select dates",header:"Enter dates"},title:"Select date",header:"Enter date",input:{placeholder:"Enter date"}},noDataText:"No data available",carousel:{prev:"Previous visual",next:"Next visual",ariaLabel:{delimiter:"Carousel slide {0} of {1}"}},calendar:{moreEvents:"{0} more"},input:{clear:"Clear {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action",otp:"Please enter OTP character {0}"},fileInput:{counter:"{0} files",counterSize:"{0} files ({1} in total)"},timePicker:{am:"AM",pm:"PM"},pagination:{ariaLabel:{root:"Pagination Navigation",next:"Next page",previous:"Previous page",page:"Go to page {0}",currentPage:"Page {0}, Current page",first:"First page",last:"Last page"}},stepper:{next:"Next",prev:"Previous"},rating:{ariaLabel:{item:"Rating {0} of {1}"}},loading:"Loading...",infiniteScroll:{loadMore:"Load more",empty:"No more"}}
const Tt={af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!0,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1}
function Pt(e,a){let l
function o(){l=t.effectScope(),l.run((()=>a.length?a((()=>{l?.stop(),o()})):a()))}t.watch(e,(e=>{e&&!l?o():e||(l?.stop(),l=void 0)}),{immediate:!0}),t.onScopeDispose((()=>{l?.stop()}))}function $t(e,a,l){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e=>e,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e=>e
const r=pt("useProxiedModel"),i=t.ref(void 0!==e[a]?e[a]:l),s=F(a),u=s!==a,c=u?t.computed((()=>(e[a],!(!r.vnode.props?.hasOwnProperty(a)&&!r.vnode.props?.hasOwnProperty(s)||!r.vnode.props?.hasOwnProperty(`onUpdate:${a}`)&&!r.vnode.props?.hasOwnProperty(`onUpdate:${s}`))))):t.computed((()=>(e[a],!(!r.vnode.props?.hasOwnProperty(a)||!r.vnode.props?.hasOwnProperty(`onUpdate:${a}`)))))
Pt((()=>!c.value),(()=>{t.watch((()=>e[a]),(e=>{i.value=e}))}))
const d=t.computed({get(){const t=e[a]
return o(c.value?t:i.value)},set(l){const s=n(l),u=t.toRaw(c.value?e[a]:i.value)
u!==s&&o(u)!==l&&(i.value=s,r?.emit(`update:${a}`,s))}})
return Object.defineProperty(d,"externalValue",{get:()=>c.value?e[a]:i.value}),d}const Lt="$vuetify.",Mt=(e,t)=>e.replace(/\{(\d+)\}/g,((e,a)=>String(t[+a]))),Ft=(e,t,a)=>function(l){for(var o=arguments.length,n=new Array(o>1?o-1:0),r=1;r<o;r++)n[r-1]=arguments[r]
if(!l.startsWith(Lt))return Mt(l,n)
const i=l.replace(Lt,""),s=e.value&&a.value[e.value],u=t.value&&a.value[t.value]
let c=p(s,i,null)
return c||(ke(`Translation key "${l}" not found in "${e.value}", trying fallback locale`),c=p(u,i,null)),c||(xe(`Translation key "${l}" not found in fallback`),c=l),"string"!=typeof c&&(xe(`Translation key "${l}" has a non-string value`),c=l),Mt(c,n)}
function Dt(e,t){return(a,l)=>new Intl.NumberFormat([e.value,t.value],l).format(a)}function Ot(e,a,l){const o=$t(e,a,e[a]??l.value)
return o.value=e[a]??l.value,t.watch(l,(t=>{null==e[a]&&(o.value=l.value)})),o}function zt(e){return t=>{const a=Ot(t,"locale",e.current),l=Ot(t,"fallback",e.fallback),o=Ot(t,"messages",e.messages)
return{name:"vuetify",current:a,fallback:l,messages:o,t:Ft(a,l,o),n:Dt(a,l),provide:zt({current:a,fallback:l,messages:o})}}}const jt=Symbol.for("vuetify:locale")
function Ht(e){const a=e?.adapter&&(l=e?.adapter,null!=l.name)?e?.adapter:function(e){const a=t.shallowRef(e?.locale??"en"),l=t.shallowRef(e?.fallback??"en"),o=t.ref({en:Et,...e?.messages})
return{name:"vuetify",current:a,fallback:l,messages:o,t:Ft(a,l,o),n:Dt(a,l),provide:zt({current:a,fallback:l,messages:o})}}(e)
var l
const o=function(e,a){const l=t.ref(a?.rtl??Tt),o=t.computed((()=>l.value[e.current.value]??!1))
return{isRtl:o,rtl:l,rtlClasses:t.computed((()=>"v-locale--is-"+(o.value?"rtl":"ltr")))}}(a,e)
return{...a,...o}}function Ut(){const e=t.inject(jt)
if(!e)throw new Error("[Vuetify] Could not find injected locale instance")
return e}function Wt(e){const a=t.inject(jt)
if(!a)throw new Error("[Vuetify] Could not find injected locale instance")
const l=a.provide(e),o=function(e,a,l){const o=t.computed((()=>l.rtl??a.value[e.current.value]??!1))
return{isRtl:o,rtl:a,rtlClasses:t.computed((()=>"v-locale--is-"+(o.value?"rtl":"ltr")))}}(l,a.rtl,e),n={...l,...o}
return t.provide(jt,n),n}function Yt(){const e=t.inject(jt)
if(!e)throw new Error("[Vuetify] Could not find injected rtl instance")
return{isRtl:e.isRtl,rtlClasses:e.rtlClasses}}const Gt=Symbol.for("vuetify:theme"),Kt=a({theme:String},"theme"),qt={defaultTheme:"light",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-bright":"#FFFFFF","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#6200EE","primary-darken-1":"#3700B3",secondary:"#03DAC6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-bright":"#ccbfd6","surface-variant":"#a3a3a3","on-surface-variant":"#424242",primary:"#BB86FC","primary-darken-1":"#3700B3",secondary:"#03DAC5","secondary-darken-1":"#03DAC5",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":1,"medium-emphasis-opacity":.7,"disabled-opacity":.5,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}}}
function Xt(e){const a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:qt
if(!e)return{...qt,isDisabled:!0}
const t={}
for(const[a,l]of Object.entries(e.themes??{})){const e=l.dark||"dark"===a?qt.themes?.dark:qt.themes?.light
t[a]=L(e,l)}return L(qt,{...e,themes:t})}(e),l=t.ref(a.defaultTheme),n=t.ref(a.themes),r=t.computed((()=>{const e={}
for(const[t,l]of Object.entries(n.value)){const o=e[t]={...l,colors:{...l.colors}}
if(a.variations)for(const e of a.variations.colors){const t=o.colors[e]
if(t)for(const l of["lighten","darken"]){const n="lighten"===l?Ze:Je
for(const r of m(a.variations[l],1))o.colors[`${e}-${l}-${r}`]=Ke(n(De(t),r))}}for(const e of Object.keys(o.colors)){if(/^on-[a-z]/.test(e)||o.colors[`on-${e}`])continue
const t=`on-${e}`,a=De(o.colors[e])
o.colors[t]=tt(a)}}return e})),i=t.computed((()=>r.value[l.value])),s=t.computed((()=>{const e=[]
i.value.dark&&Qt(e,":root",["color-scheme: dark"]),Qt(e,":root",ea(i.value))
for(const[t,a]of Object.entries(r.value))Qt(e,`.v-theme--${t}`,["color-scheme: "+(a.dark?"dark":"normal"),...ea(a)])
const t=[],a=[],l=new Set(Object.values(r.value).flatMap((e=>Object.keys(e.colors))))
for(const e of l)/^on-[a-z]/.test(e)?Qt(a,`.${e}`,[`color: rgb(var(--v-theme-${e})) !important`]):(Qt(t,`.bg-${e}`,[`--v-theme-overlay-multiplier: var(--v-theme-${e}-overlay-multiplier)`,`background-color: rgb(var(--v-theme-${e})) !important`,`color: rgb(var(--v-theme-on-${e})) !important`]),Qt(a,`.text-${e}`,[`color: rgb(var(--v-theme-${e})) !important`]),Qt(a,`.border-${e}`,[`--v-border-color: var(--v-theme-${e})`]))
return e.push(...t,...a),e.map(((e,t)=>0===t?e:`    ${e}`)).join("")}))
function u(){return{style:[{children:s.value,id:"vuetify-theme-stylesheet",nonce:a.cspNonce||!1}]}}const c=t.computed((()=>a.isDisabled?void 0:`v-theme--${l.value}`))
return{install:function(e){if(a.isDisabled)return
const l=e._context.provides.usehead
if(l)if(l.push){const e=l.push(u)
o&&t.watch(s,(()=>{e.patch(u)}))}else o?(l.addHeadObjs(t.computed(u)),t.watchEffect((()=>l.updateDOM()))):l.addHeadObjs(u())
else{let e=o?document.getElementById("vuetify-theme-stylesheet"):null
function l(){if("undefined"!=typeof document&&!e){const t=document.createElement("style")
t.type="text/css",t.id="vuetify-theme-stylesheet",a.cspNonce&&t.setAttribute("nonce",a.cspNonce),e=t,document.head.appendChild(e)}e&&(e.innerHTML=s.value)}o?t.watch(s,l,{immediate:!0}):l()}},isDisabled:a.isDisabled,name:l,themes:n,current:i,computedThemes:r,themeClasses:c,styles:s,global:{name:l,current:i}}}function Zt(e){pt("provideTheme")
const a=t.inject(Gt,null)
if(!a)throw new Error("Could not find Vuetify theme injection")
const l=t.computed((()=>e.theme??a.name.value)),o=t.computed((()=>a.themes.value[l.value])),n=t.computed((()=>a.isDisabled?void 0:`v-theme--${l.value}`)),r={...a,name:l,current:o,themeClasses:n}
return t.provide(Gt,r),r}function Jt(){pt("useTheme")
const e=t.inject(Gt,null)
if(!e)throw new Error("Could not find Vuetify theme injection")
return e}function Qt(e,t,a){e.push(`${t} {\n`,...a.map((e=>`  ${e};\n`)),"}\n")}function ea(e){const t=e.dark?2:1,a=e.dark?1:2,l=[]
for(const[o,n]of Object.entries(e.colors)){const e=De(n)
l.push(`--v-theme-${o}: ${e.r},${e.g},${e.b}`),o.startsWith("on-")||l.push(`--v-theme-${o}-overlay-multiplier: ${Qe(n)>.18?t:a}`)}for(const[t,a]of Object.entries(e.variables)){const e="string"==typeof a&&a.startsWith("#")?De(a):void 0,o=e?`${e.r}, ${e.g}, ${e.b}`:void 0
l.push(`--v-${t}: ${o??a}`)}return l}const ta=a({...l(),..._t({fullHeight:!0}),...Kt()},"VApp"),aa=ut()({name:"VApp",props:ta(),setup(e,a){let{slots:l}=a
const o=Zt(e),{layoutClasses:n,getLayoutItem:r,items:i,layoutRef:s}=At(e),{rtlClasses:u}=Yt()
return kt((()=>t.createVNode("div",{ref:s,class:["v-application",o.themeClasses.value,n.value,u.value,e.class],style:[e.style]},[t.createVNode("div",{class:"v-application__wrap"},[l.default?.()])]))),{getLayoutItem:r,items:i,theme:o}}}),la=a({tag:{type:String,default:"div"}},"tag"),oa=a({text:String,...l(),...la()},"VToolbarTitle"),na=ut()({name:"VToolbarTitle",props:oa(),setup(e,a){let{slots:l}=a
return kt((()=>{const a=!!(l.default||l.text||e.text)
return t.createVNode(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>[a&&t.createVNode("div",{class:"v-toolbar-title__placeholder"},[l.text?l.text():e.text,l.default?.()])]})})),{}}}),ra=a({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition")
function ia(e,a,l){return ut()({name:e,props:ra({mode:l,origin:a}),setup(a,l){let{slots:o}=l
const n={onBeforeEnter(e){a.origin&&(e.style.transformOrigin=a.origin)},onLeave(e){if(a.leaveAbsolute){const{offsetTop:t,offsetLeft:a,offsetWidth:l,offsetHeight:o}=e
e._transitionInitialStyles={position:e.style.position,top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},e.style.position="absolute",e.style.top=`${t}px`,e.style.left=`${a}px`,e.style.width=`${l}px`,e.style.height=`${o}px`}a.hideOnLeave&&e.style.setProperty("display","none","important")},onAfterLeave(e){if(a.leaveAbsolute&&e?._transitionInitialStyles){const{position:t,top:a,left:l,width:o,height:n}=e._transitionInitialStyles
delete e._transitionInitialStyles,e.style.position=t||"",e.style.top=a||"",e.style.left=l||"",e.style.width=o||"",e.style.height=n||""}}}
return()=>{const l=a.group?t.TransitionGroup:t.Transition
return t.h(l,{name:a.disabled?"":e,css:!a.disabled,...a.group?void 0:{mode:a.mode},...a.disabled?{}:n},o.default)}}})}function sa(e,a){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out"
return ut()({name:e,props:{mode:{type:String,default:l},disabled:Boolean},setup(l,o){let{slots:n}=o
return()=>t.h(t.Transition,{name:l.disabled?"":e,css:!l.disabled,...l.disabled?{}:a},n.default)}})}function ua(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
const l=a?"width":"height",o=t.camelize(`offset-${l}`)
return{onBeforeEnter(e){e._parent=e.parentNode,e._initialStyle={transition:e.style.transition,overflow:e.style.overflow,[l]:e.style[l]}},onEnter(t){const a=t._initialStyle
t.style.setProperty("transition","none","important"),t.style.overflow="hidden"
const n=`${t[o]}px`
t.style[l]="0",t.offsetHeight,t.style.transition=a.transition,e&&t._parent&&t._parent.classList.add(e),requestAnimationFrame((()=>{t.style[l]=n}))},onAfterEnter:r,onEnterCancelled:r,onLeave(e){e._initialStyle={transition:"",overflow:e.style.overflow,[l]:e.style[l]},e.style.overflow="hidden",e.style[l]=`${e[o]}px`,e.offsetHeight,requestAnimationFrame((()=>e.style[l]="0"))},onAfterLeave:n,onLeaveCancelled:n}
function n(t){e&&t._parent&&t._parent.classList.remove(e),r(t)}function r(e){const t=e._initialStyle[l]
e.style.overflow=e._initialStyle.overflow,null!=t&&(e.style[l]=t),delete e._initialStyle}}const ca=a({target:Object},"v-dialog-transition"),da=ut()({name:"VDialogTransition",props:ca(),setup(e,a){let{slots:l}=a
const o={onBeforeEnter(e){e.style.pointerEvents="none",e.style.visibility="hidden"},async onEnter(t,a){await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),t.style.visibility=""
const{x:l,y:o,sx:n,sy:r,speed:i}=pa(e.target,t),s=de(t,[{transform:`translate(${l}px, ${o}px) scale(${n}, ${r})`,opacity:0},{}],{duration:225*i,easing:"cubic-bezier(0.0, 0, 0.2, 1)"})
va(t)?.forEach((e=>{de(e,[{opacity:0},{opacity:0,offset:.33},{}],{duration:450*i,easing:vt})})),s.finished.then((()=>a()))},onAfterEnter(e){e.style.removeProperty("pointer-events")},onBeforeLeave(e){e.style.pointerEvents="none"},async onLeave(t,a){await new Promise((e=>requestAnimationFrame(e)))
const{x:l,y:o,sx:n,sy:r,speed:i}=pa(e.target,t)
de(t,[{},{transform:`translate(${l}px, ${o}px) scale(${n}, ${r})`,opacity:0}],{duration:125*i,easing:"cubic-bezier(0.4, 0, 1, 1)"}).finished.then((()=>a())),va(t)?.forEach((e=>{de(e,[{},{opacity:0,offset:.2},{opacity:0}],{duration:250*i,easing:vt})}))},onAfterLeave(e){e.style.removeProperty("pointer-events")}}
return()=>e.target?t.createVNode(t.Transition,t.mergeProps({name:"dialog-transition"},o,{css:!1}),l):t.createVNode(t.Transition,{name:"dialog-transition"},l)}})
function va(e){const t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")?.children
return t&&[...t]}function pa(e,t){const a=e.getBoundingClientRect(),l=ce(t),[o,n]=getComputedStyle(t).transformOrigin.split(" ").map((e=>parseFloat(e))),[r,i]=getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ")
let s=a.left+a.width/2
"left"===r||"left"===i?s-=a.width/2:"right"!==r&&"right"!==i||(s+=a.width/2)
let u=a.top+a.height/2
"top"===r||"top"===i?u-=a.height/2:"bottom"!==r&&"bottom"!==i||(u+=a.height/2)
const c=a.width/l.width,d=a.height/l.height,v=Math.max(1,c,d),p=c/v||0,f=d/v||0,m=l.width*l.height/(window.innerWidth*window.innerHeight),g=m>.12?Math.min(1.5,10*(m-.12)+1):1
return{x:s-(o+l.left),y:u-(n+l.top),sx:p,sy:f,speed:g}}const fa=ia("fab-transition","center center","out-in"),ma=ia("dialog-bottom-transition"),ga=ia("dialog-top-transition"),ha=ia("fade-transition"),ya=ia("scale-transition"),ba=ia("scroll-x-transition"),Va=ia("scroll-x-reverse-transition"),wa=ia("scroll-y-transition"),Sa=ia("scroll-y-reverse-transition"),ka=ia("slide-x-transition"),xa=ia("slide-x-reverse-transition"),Ca=ia("slide-y-transition"),Na=ia("slide-y-reverse-transition"),_a=sa("expand-transition",ua()),Ia=sa("expand-x-transition",ua("",!0)),Ba=a({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),Ra=ut(!1)({name:"VDefaultsProvider",props:Ba(),setup(e,a){let{slots:l}=a
const{defaults:o,disabled:n,reset:r,root:i,scoped:s}=t.toRefs(e)
return nt(o,{reset:r,root:i,scoped:s,disabled:n}),()=>l.default?.()}}),Aa=a({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension")
function Ea(e){return{dimensionStyles:t.computed((()=>({height:g(e.height),maxHeight:g(e.maxHeight),maxWidth:g(e.maxWidth),minHeight:g(e.minHeight),minWidth:g(e.minWidth),width:g(e.width)})))}}const Ta=a({aspectRatio:[String,Number],contentClass:String,inline:Boolean,...l(),...Aa()},"VResponsive"),Pa=ut()({name:"VResponsive",props:Ta(),setup(e,a){let{slots:l}=a
const{aspectStyles:o}=function(e){return{aspectStyles:t.computed((()=>{const t=Number(e.aspectRatio)
return t?{paddingBottom:String(1/t*100)+"%"}:void 0}))}}(e),{dimensionStyles:n}=Ea(e)
return kt((()=>t.createVNode("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[n.value,e.style]},[t.createVNode("div",{class:"v-responsive__sizer",style:o.value},null),l.additional?.(),l.default&&t.createVNode("div",{class:["v-responsive__content",e.contentClass]},[l.default()])]))),{}}}),$a=a({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>!0!==e}},"transition"),La=(e,a)=>{let{slots:l}=a
const{transition:o,disabled:n,...r}=e,{component:i=t.Transition,...s}="object"==typeof o?o:{}
return t.h(i,t.mergeProps("string"==typeof o?{name:n?"":o}:s,r,{disabled:n}),l)}
function Ma(e,t){const a=e._observe?.[t.instance.$.uid]
a&&(a.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const Fa={mounted:function(e,t){if(!n)return
const a=t.modifiers||{},l=t.value,{handler:o,options:r}="object"==typeof l?l:{handler:l,options:{}},i=new IntersectionObserver((function(){let l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0
const r=e._observe?.[t.instance.$.uid]
if(!r)return
const i=l.some((e=>e.isIntersecting))
!o||a.quiet&&!r.init||a.once&&!i&&!r.init||o(i,l,n),i&&a.once?Ma(e,t):r.init=!0}),r)
e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:i},i.observe(e)},unmounted:Ma},Da=a({alt:String,cover:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},srcset:String,...Ta(),...l(),...$a()},"VImg"),Oa=ut()({name:"VImg",directives:{intersect:Fa},props:Da(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,a){let{emit:l,slots:o}=a
const r=t.shallowRef(""),i=t.ref(),s=t.shallowRef(e.eager?"loading":"idle"),u=t.shallowRef(),c=t.shallowRef(),d=t.computed((()=>e.src&&"object"==typeof e.src?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)})),v=t.computed((()=>d.value.aspect||u.value/c.value||0))
function p(a){if((!e.eager||!a)&&(!n||a||e.eager)){if(s.value="loading",d.value.lazySrc){const e=new Image
e.src=d.value.lazySrc,b(e,null)}d.value.src&&t.nextTick((()=>{if(l("loadstart",i.value?.currentSrc||d.value.src),i.value?.complete){if(i.value.naturalWidth||m(),"error"===s.value)return
v.value||b(i.value,null),f()}else v.value||b(i.value),h()}))}}function f(){h(),s.value="loaded",l("load",i.value?.currentSrc||d.value.src)}function m(){s.value="error",l("error",i.value?.currentSrc||d.value.src)}function h(){const e=i.value
e&&(r.value=e.currentSrc||e.src)}t.watch((()=>e.src),(()=>{p("idle"!==s.value)})),t.watch(v,((e,t)=>{!e&&t&&i.value&&b(i.value)})),t.onBeforeMount((()=>p()))
let y=-1
function b(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100
const a=()=>{clearTimeout(y)
const{naturalHeight:l,naturalWidth:o}=e
l||o?(u.value=o,c.value=l):e.complete||"loading"!==s.value||null==t?(e.currentSrc.endsWith(".svg")||e.currentSrc.startsWith("data:image/svg+xml"))&&(u.value=1,c.value=1):y=window.setTimeout(a,t)}
a()}const V=t.computed((()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover}))),w=()=>{if(!d.value.src||"idle"===s.value)return null
const a=t.createVNode("img",{class:["v-img__img",V.value],src:d.value.src,srcset:d.value.srcset,alt:e.alt,sizes:e.sizes,ref:i,onLoad:f,onError:m},null),l=o.sources?.()
return t.createVNode(La,{transition:e.transition,appear:!0},{default:()=>[t.withDirectives(l?t.createVNode("picture",{class:"v-img__picture"},[l,a]):a,[[t.vShow,"loaded"===s.value]])]})},S=()=>t.createVNode(La,{transition:e.transition},{default:()=>[d.value.lazySrc&&"loaded"!==s.value&&t.createVNode("img",{class:["v-img__img","v-img__img--preload",V.value],src:d.value.lazySrc,alt:e.alt},null)]}),k=()=>o.placeholder?t.createVNode(La,{transition:e.transition,appear:!0},{default:()=>[("loading"===s.value||"error"===s.value&&!o.error)&&t.createVNode("div",{class:"v-img__placeholder"},[o.placeholder()])]}):null,x=()=>o.error?t.createVNode(La,{transition:e.transition,appear:!0},{default:()=>["error"===s.value&&t.createVNode("div",{class:"v-img__error"},[o.error()])]}):null,C=()=>e.gradient?t.createVNode("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,N=t.shallowRef(!1)
{const e=t.watch(v,(t=>{t&&(requestAnimationFrame((()=>{requestAnimationFrame((()=>{N.value=!0}))})),e())}))}return kt((()=>{const[a]=Pa.filterProps(e)
return t.withDirectives(t.createVNode(Pa,t.mergeProps({class:["v-img",{"v-img--booting":!N.value},e.class],style:[{width:g("auto"===e.width?u.value:e.width)},e.style]},a,{aspectRatio:v.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>t.createVNode(t.Fragment,null,[t.createVNode(w,null,null),t.createVNode(S,null,null),t.createVNode(C,null,null),t.createVNode(k,null,null),t.createVNode(x,null,null)]),default:o.default}),[[t.resolveDirective("intersect"),{handler:p,options:e.options},null,{once:!0}]])})),{currentSrc:r,image:i,state:s,naturalWidth:u,naturalHeight:c}}}),za=a({border:[Boolean,Number,String]},"border")
function ja(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
const l=t.computed((()=>{const l=t.isRef(e)?e.value:e.border,o=[]
if(!0===l||""===l)o.push(`${a}--border`)
else if("string"==typeof l||0===l)for(const e of String(l).split(" "))o.push(`border-${e}`)
return o}))
return{borderClasses:l}}function Ha(e){return H((()=>{const t=[],a={}
if(e.value.background)if(Le(e.value.background)){if(a.backgroundColor=e.value.background,!e.value.text){const t=De(e.value.background)
if(null==t.a||1===t.a){const e=tt(t)
a.color=e,a.caretColor=e}}}else t.push(`bg-${e.value.background}`)
return e.value.text&&(Le(e.value.text)?(a.color=e.value.text,a.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:a}}))}function Ua(e,a){const l=t.computed((()=>({text:t.isRef(e)?e.value:a?e[a]:null}))),{colorClasses:o,colorStyles:n}=Ha(l)
return{textColorClasses:o,textColorStyles:n}}function Wa(e,a){const l=t.computed((()=>({background:t.isRef(e)?e.value:a?e[a]:null}))),{colorClasses:o,colorStyles:n}=Ha(l)
return{backgroundColorClasses:o,backgroundColorStyles:n}}const Ya=a({elevation:{type:[Number,String],validator(e){const t=parseInt(e)
return!isNaN(t)&&t>=0&&t<=24}}},"elevation")
function Ga(e){return{elevationClasses:t.computed((()=>{const a=t.isRef(e)?e.value:e.elevation,l=[]
return null==a||l.push(`elevation-${a}`),l}))}}const Ka=a({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded")
function qa(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
const l=t.computed((()=>{const l=t.isRef(e)?e.value:e.rounded,o=[]
if(!0===l||""===l)o.push(`${a}--rounded`)
else if("string"==typeof l||0===l)for(const e of String(l).split(" "))o.push(`rounded-${e}`)
return o}))
return{roundedClasses:l}}const Xa=[null,"prominent","default","comfortable","compact"],Za=a({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>Xa.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...za(),...l(),...Ya(),...Ka(),...la({tag:"header"}),...Kt()},"VToolbar"),Ja=ut()({name:"VToolbar",props:Za(),setup(e,a){let{slots:l}=a
const{backgroundColorClasses:o,backgroundColorStyles:n}=Wa(t.toRef(e,"color")),{borderClasses:r}=ja(e),{elevationClasses:i}=Ga(e),{roundedClasses:s}=qa(e),{themeClasses:u}=Zt(e),{rtlClasses:c}=Yt(),d=t.shallowRef(!(!e.extended&&!l.extension?.())),v=t.computed((()=>parseInt(Number(e.height)+("prominent"===e.density?Number(e.height):0)-("comfortable"===e.density?8:0)-("compact"===e.density?16:0),10))),p=t.computed((()=>d.value?parseInt(Number(e.extensionHeight)+("prominent"===e.density?Number(e.extensionHeight):0)-("comfortable"===e.density?4:0)-("compact"===e.density?8:0),10):0))
return nt({VBtn:{variant:"text"}}),kt((()=>{const a=!(!e.title&&!l.title),f=!(!l.image&&!e.image),m=l.extension?.()
return d.value=!(!e.extended&&!m),t.createVNode(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},o.value,r.value,i.value,s.value,u.value,c.value,e.class],style:[n.value,e.style]},{default:()=>[f&&t.createVNode("div",{key:"image",class:"v-toolbar__image"},[l.image?t.createVNode(Ra,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},l.image):t.createVNode(Oa,{key:"image-img",cover:!0,src:e.image},null)]),t.createVNode(Ra,{defaults:{VTabs:{height:g(v.value)}}},{default:()=>[t.createVNode("div",{class:"v-toolbar__content",style:{height:g(v.value)}},[l.prepend&&t.createVNode("div",{class:"v-toolbar__prepend"},[l.prepend?.()]),a&&t.createVNode(na,{key:"title",text:e.title},{text:l.title}),l.default?.(),l.append&&t.createVNode("div",{class:"v-toolbar__append"},[l.append?.()])])]}),t.createVNode(Ra,{defaults:{VTabs:{height:g(p.value)}}},{default:()=>[t.createVNode(_a,null,{default:()=>[d.value&&t.createVNode("div",{class:"v-toolbar__extension",style:{height:g(p.value)}},[m])]})]})]})})),{contentHeight:v,extensionHeight:p}}}),Qa=a({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll")
function el(){const e=t.shallowRef(!1)
t.onMounted((()=>{window.requestAnimationFrame((()=>{e.value=!0}))}))
return{ssrBootStyles:t.computed((()=>e.value?void 0:{transition:"none !important"})),isBooted:t.readonly(e)}}const tl=a({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...Za(),...It(),...Qa(),height:{type:[Number,String],default:64}},"VAppBar"),al=ut()({name:"VAppBar",props:tl(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=t.ref(),n=$t(e,"modelValue"),r=t.computed((()=>{const t=new Set(e.scrollBehavior?.split(" ")??[])
return{hide:t.has("hide"),inverted:t.has("inverted"),collapse:t.has("collapse"),elevate:t.has("elevate"),fadeImage:t.has("fade-image")}})),i=t.computed((()=>{const e=r.value
return e.hide||e.inverted||e.collapse||e.elevate||e.fadeImage||!n.value})),{currentScroll:s,scrollThreshold:u,isScrollingUp:c,scrollRatio:d}=function(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
const{canScroll:l}=a
let o=0
const n=t.ref(null),r=t.shallowRef(0),i=t.shallowRef(0),s=t.shallowRef(0),u=t.shallowRef(!1),c=t.shallowRef(!1),d=t.computed((()=>Number(e.scrollThreshold))),v=t.computed((()=>A((d.value-r.value)/d.value||0))),p=()=>{const e=n.value
!e||l&&!l.value||(o=r.value,r.value="window"in e?e.pageYOffset:e.scrollTop,c.value=r.value<o,s.value=Math.abs(r.value-d.value))}
return t.watch(c,(()=>{i.value=i.value||r.value})),t.watch(u,(()=>{i.value=0})),t.onMounted((()=>{t.watch((()=>e.scrollTarget),(e=>{const t=e?document.querySelector(e):window
t?t!==n.value&&(n.value?.removeEventListener("scroll",p),n.value=t,n.value.addEventListener("scroll",p,{passive:!0})):ke(`Unable to locate element with identifier ${e}`)}),{immediate:!0})})),t.onBeforeUnmount((()=>{n.value?.removeEventListener("scroll",p)})),l&&t.watch(l,p,{immediate:!0}),{scrollThreshold:d,currentScroll:r,currentThreshold:s,isScrollActive:u,scrollRatio:v,isScrollingUp:c,savedScroll:i}}(e,{canScroll:i}),v=t.computed((()=>e.collapse||r.value.collapse&&(r.value.inverted?d.value>0:0===d.value))),p=t.computed((()=>e.flat||r.value.elevate&&(r.value.inverted?s.value>0:0===s.value))),f=t.computed((()=>r.value.fadeImage?r.value.inverted?1-d.value:d.value:void 0)),m=t.computed((()=>{if(r.value.hide&&r.value.inverted)return 0
return(o.value?.contentHeight??0)+(o.value?.extensionHeight??0)}))
Pt(t.computed((()=>!!e.scrollBehavior)),(()=>{t.watchEffect((()=>{r.value.hide?r.value.inverted?n.value=s.value>u.value:n.value=c.value||s.value<u.value:n.value=!0}))}))
const{ssrBootStyles:g}=el(),{layoutItemStyles:h}=Rt({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef(e,"location"),layoutSize:m,elementSize:t.shallowRef(void 0),active:n,absolute:t.toRef(e,"absolute")})
return kt((()=>{const[a]=Ja.filterProps(e)
return t.createVNode(Ja,t.mergeProps({ref:o,class:["v-app-bar",{"v-app-bar--bottom":"bottom"===e.location},e.class],style:[{...h.value,"--v-toolbar-image-opacity":f.value,height:void 0,...g.value},e.style]},a,{collapse:v.value,flat:p.value}),l)})),{}}}),ll=[null,"default","comfortable","compact"],ol=a({density:{type:String,default:"default",validator:e=>ll.includes(e)}},"density")
function nl(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
const l=t.computed((()=>`${a}--density-${e.density}`))
return{densityClasses:l}}const rl=["elevated","flat","tonal","outlined","text","plain"]
function il(e,a){return t.createVNode(t.Fragment,null,[e&&t.createVNode("span",{key:"overlay",class:`${a}__overlay`},null),t.createVNode("span",{key:"underlay",class:`${a}__underlay`},null)])}const sl=a({color:String,variant:{type:String,default:"elevated",validator:e=>rl.includes(e)}},"variant")
function ul(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
const l=t.computed((()=>{const{variant:l}=t.unref(e)
return`${a}--variant-${l}`})),{colorClasses:o,colorStyles:n}=Ha(t.computed((()=>{const{variant:a,color:l}=t.unref(e)
return{[["elevated","flat"].includes(a)?"background":"text"]:l}})))
return{colorClasses:o,colorStyles:n,variantClasses:l}}const cl=a({divided:Boolean,...za(),...l(),...ol(),...Ya(),...Ka(),...la(),...Kt(),...sl()},"VBtnGroup"),dl=ut()({name:"VBtnGroup",props:cl(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{densityClasses:n}=nl(e),{borderClasses:r}=ja(e),{elevationClasses:i}=Ga(e),{roundedClasses:s}=qa(e)
nt({VBtn:{height:"auto",color:t.toRef(e,"color"),density:t.toRef(e,"density"),flat:!0,variant:t.toRef(e,"variant")}}),kt((()=>t.createVNode(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},o.value,r.value,n.value,i.value,s.value,e.class],style:e.style},l)))}}),vl=a({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),pl=a({value:null,disabled:Boolean,selectedClass:String},"group-item")
function fl(e,a){let l=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]
const o=pt("useGroupItem")
if(!o)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function")
const n=ht()
t.provide(Symbol.for(`${a.description}:id`),n)
const r=t.inject(a,null)
if(!r){if(!l)return r
throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${a.description}`)}const i=t.toRef(e,"value"),s=t.computed((()=>!(!r.disabled.value&&!e.disabled)))
r.register({id:n,value:i,disabled:s},o),t.onBeforeUnmount((()=>{r.unregister(n)}))
const u=t.computed((()=>r.isSelected(n))),c=t.computed((()=>u.value&&[r.selectedClass.value,e.selectedClass]))
return t.watch(u,(e=>{o.emit("group:selected",{value:e})})),{id:n,isSelected:u,toggle:()=>r.select(n,!u.value),select:e=>r.select(n,e),selectedClass:c,value:i,disabled:s,group:r}}function ml(e,a){let l=!1
const o=t.reactive([]),n=$t(e,"modelValue",[],(e=>null==e?[]:gl(o,R(e))),(t=>{const a=function(e,t){const a=[]
return t.forEach((t=>{const l=e.findIndex((e=>e.id===t))
if(~l){const t=e[l]
a.push(null!=t.value?t.value:l)}})),a}(o,t)
return e.multiple?a:a[0]})),r=pt("useGroup")
function i(){const t=o.find((e=>!e.disabled))
t&&"force"===e.mandatory&&!n.value.length&&(n.value=[t.id])}function s(t){if(e.multiple&&ke('This method is not supported when using "multiple" prop'),n.value.length){const e=n.value[0],a=o.findIndex((t=>t.id===e))
let l=(a+t)%o.length,r=o[l]
for(;r.disabled&&l!==a;)l=(l+t)%o.length,r=o[l]
if(r.disabled)return
n.value=[o[l].id]}else{const e=o.find((e=>!e.disabled))
e&&(n.value=[e.id])}}t.onMounted((()=>{i()})),t.onBeforeUnmount((()=>{l=!0}))
const u={register:function(e,t){const l=e,n=D(Symbol.for(`${a.description}:id`),r?.vnode).indexOf(t)
n>-1?o.splice(n,0,l):o.push(l)},unregister:function(e){if(l)return
i()
const t=o.findIndex((t=>t.id===e))
o.splice(t,1)},selected:n,select:function(t,a){const l=o.find((e=>e.id===t))
if(!a||!l?.disabled)if(e.multiple){const l=n.value.slice(),o=l.findIndex((e=>e===t)),r=~o
if(a=a??!r,r&&e.mandatory&&l.length<=1)return
if(!r&&null!=e.max&&l.length+1>e.max)return
o<0&&a?l.push(t):o>=0&&!a&&l.splice(o,1),n.value=l}else{const l=n.value.includes(t)
if(e.mandatory&&l)return
n.value=a??!l?[t]:[]}},disabled:t.toRef(e,"disabled"),prev:()=>s(o.length-1),next:()=>s(1),isSelected:e=>n.value.includes(e),selectedClass:t.computed((()=>e.selectedClass)),items:t.computed((()=>o)),getItemIndex:e=>function(e,t){const a=gl(e,[t])
return a.length?e.findIndex((e=>e.id===a[0])):-1}(o,e)}
return t.provide(a,u),u}function gl(e,t){const a=[]
return t.forEach((t=>{const l=e.find((e=>v(t,e.value))),o=e[t]
null!=l?.value?a.push(l.id):null!=o&&a.push(o.id)})),a}const hl=Symbol.for("vuetify:v-btn-toggle"),yl=a({...cl(),...vl()},"VBtnToggle"),bl=ut()({name:"VBtnToggle",props:yl(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{isSelected:o,next:n,prev:r,select:i,selected:s}=ml(e,hl)
return kt((()=>{const[a]=dl.filterProps(e)
return t.createVNode(dl,t.mergeProps({class:["v-btn-toggle",e.class]},a,{style:e.style}),{default:()=>[l.default?.({isSelected:o,next:n,prev:r,select:i,selected:s})]})})),{next:n,prev:r,select:i}}}),Vl={collapse:"mdi-chevron-up",complete:"mdi-check",cancel:"mdi-close-circle",close:"mdi-close",delete:"mdi-close-circle",clear:"mdi-close-circle",success:"mdi-check-circle",info:"mdi-information",warning:"mdi-alert-circle",error:"mdi-close-circle",prev:"mdi-chevron-left",next:"mdi-chevron-right",checkboxOn:"mdi-checkbox-marked",checkboxOff:"mdi-checkbox-blank-outline",checkboxIndeterminate:"mdi-minus-box",delimiter:"mdi-circle",sortAsc:"mdi-arrow-up",sortDesc:"mdi-arrow-down",expand:"mdi-chevron-down",menu:"mdi-menu",subgroup:"mdi-menu-down",dropdown:"mdi-menu-down",radioOn:"mdi-radiobox-marked",radioOff:"mdi-radiobox-blank",edit:"mdi-pencil",ratingEmpty:"mdi-star-outline",ratingFull:"mdi-star",ratingHalf:"mdi-star-half-full",loading:"mdi-cached",first:"mdi-page-first",last:"mdi-page-last",unfold:"mdi-unfold-more-horizontal",file:"mdi-paperclip",plus:"mdi-plus",minus:"mdi-minus",calendar:"mdi-calendar"},wl={component:e=>t.h(Il,{...e,class:"mdi"})},Sl=[String,Function,Object,Array],kl=Symbol.for("vuetify:icons"),xl=a({icon:{type:Sl},tag:{type:String,required:!0}},"icon"),Cl=ut()({name:"VComponentIcon",props:xl(),setup(e,a){let{slots:l}=a
return()=>{const a=e.icon
return t.createVNode(e.tag,null,{default:()=>[e.icon?t.createVNode(a,null,null):l.default?.()]})}}}),Nl=st({name:"VSvgIcon",inheritAttrs:!1,props:xl(),setup(e,a){let{attrs:l}=a
return()=>t.createVNode(e.tag,t.mergeProps(l,{style:null}),{default:()=>[t.createVNode("svg",{class:"v-icon__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true"},[Array.isArray(e.icon)?e.icon.map((e=>Array.isArray(e)?t.createVNode("path",{d:e[0],"fill-opacity":e[1]},null):t.createVNode("path",{d:e},null))):t.createVNode("path",{d:e.icon},null)])]})}}),_l=st({name:"VLigatureIcon",props:xl(),setup:e=>()=>t.createVNode(e.tag,null,{default:()=>[e.icon]})}),Il=st({name:"VClassIcon",props:xl(),setup:e=>()=>t.createVNode(e.tag,{class:e.icon},null)}),Bl={svg:{component:Nl},class:{component:Il}}
function Rl(e){return L({defaultSet:"mdi",sets:{...Bl,mdi:wl},aliases:{...Vl,vuetify:["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z",["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z",.6]],"vuetify-outline":"svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z"}},e)}const Al=["x-small","small","default","large","x-large"],El=a({size:{type:[String,Number],default:"default"}},"size")
function Tl(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
return H((()=>{let a,l
return U(Al,e.size)?a=`${t}--size-${e.size}`:e.size&&(l={width:g(e.size),height:g(e.size)}),{sizeClasses:a,sizeStyles:l}}))}const Pl=a({color:String,start:Boolean,end:Boolean,icon:Sl,...l(),...El(),...la({tag:"i"}),...Kt()},"VIcon"),$l=ut()({name:"VIcon",props:Pl(),setup(e,a){let{attrs:l,slots:o}=a
const n=t.ref(),{themeClasses:r}=Zt(e),{iconData:i}=(e=>{const a=t.inject(kl)
if(!a)throw new Error("Missing Vuetify Icons provide!")
return{iconData:t.computed((()=>{const l=t.unref(e)
if(!l)return{component:Cl}
let o=l
if("string"==typeof o&&(o=o.trim(),o.startsWith("$")&&(o=a.aliases?.[o.slice(1)])),!o)throw new Error(`Could not find aliased icon "${l}"`)
if(Array.isArray(o))return{component:Nl,icon:o}
if("string"!=typeof o)return{component:Cl,icon:o}
const n=Object.keys(a.sets).find((e=>"string"==typeof o&&o.startsWith(`${e}:`))),r=n?o.slice(n.length+1):o
return{component:a.sets[n??a.defaultSet].component,icon:r}}))}})(t.computed((()=>n.value||e.icon))),{sizeClasses:s}=Tl(e),{textColorClasses:u,textColorStyles:c}=Ua(t.toRef(e,"color"))
return kt((()=>{const a=o.default?.()
return a&&(n.value=M(a).filter((e=>e.type===t.Text&&e.children&&"string"==typeof e.children))[0]?.children),t.createVNode(i.value.component,{tag:e.tag,icon:i.value.icon,class:["v-icon","notranslate",r.value,s.value,u.value,{"v-icon--clickable":!!l.onClick,"v-icon--start":e.start,"v-icon--end":e.end},e.class],style:[s.value?void 0:{fontSize:g(e.size),height:g(e.size),width:g(e.size)},c.value,e.style],role:l.onClick?"button":void 0,"aria-hidden":!l.onClick},{default:()=>[a]})})),{}}})
function Ll(e,a){const l=t.ref(),o=t.shallowRef(!1)
if(n){const n=new IntersectionObserver((t=>{e?.(t,n),o.value=!!t.find((e=>e.isIntersecting))}),a)
t.onBeforeUnmount((()=>{n.disconnect()})),t.watch(l,((e,t)=>{t&&(n.unobserve(t),o.value=!1),e&&n.observe(e)}),{flush:"post"})}return{intersectionRef:l,isIntersecting:o}}const Ml=a({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...l(),...El(),...la({tag:"div"}),...Kt()},"VProgressCircular"),Fl=ut()({name:"VProgressCircular",props:Ml(),setup(e,a){let{slots:l}=a
const o=2*Math.PI*20,n=t.ref(),{themeClasses:r}=Zt(e),{sizeClasses:i,sizeStyles:s}=Tl(e),{textColorClasses:u,textColorStyles:c}=Ua(t.toRef(e,"color")),{textColorClasses:d,textColorStyles:v}=Ua(t.toRef(e,"bgColor")),{intersectionRef:p,isIntersecting:f}=Ll(),{resizeRef:m,contentRect:h}=xt(),y=t.computed((()=>Math.max(0,Math.min(100,parseFloat(e.modelValue))))),b=t.computed((()=>Number(e.width))),V=t.computed((()=>s.value?Number(e.size):h.value?h.value.width:Math.max(b.value,32))),w=t.computed((()=>20/(1-b.value/V.value)*2)),S=t.computed((()=>b.value/V.value*w.value)),k=t.computed((()=>g((100-y.value)/100*o)))
return t.watchEffect((()=>{p.value=n.value,m.value=n.value})),kt((()=>t.createVNode(e.tag,{ref:n,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":f.value,"v-progress-circular--disable-shrink":"disable-shrink"===e.indeterminate},r.value,i.value,u.value,e.class],style:[s.value,c.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:y.value},{default:()=>[t.createVNode("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${w.value} ${w.value}`},[t.createVNode("circle",{class:["v-progress-circular__underlay",d.value],style:v.value,fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":S.value,"stroke-dasharray":o,"stroke-dashoffset":0},null),t.createVNode("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":S.value,"stroke-dasharray":o,"stroke-dashoffset":k.value},null)]),l.default&&t.createVNode("div",{class:"v-progress-circular__content"},[l.default({value:y.value})])]}))),{}}}),Dl={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},Ol=a({location:String},"location")
function zl(e){let a=arguments.length>1&&void 0!==arguments[1]&&arguments[1],l=arguments.length>2?arguments[2]:void 0
const{isRtl:o}=Yt(),n=t.computed((()=>{if(!e.location)return{}
const{side:t,align:n}=ae(e.location.split(" ").length>1?e.location:`${e.location} center`,o.value)
function r(e){return l?l(e):0}const i={}
return"center"!==t&&(a?i[Dl[t]]=`calc(100% - ${r(t)}px)`:i[t]=0),"center"!==n?a?i[Dl[n]]=`calc(100% - ${r(n)}px)`:i[n]=0:("center"===t?i.top=i.left="50%":i[{top:"left",bottom:"left",left:"top",right:"top"}[t]]="50%",i.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[t]),i}))
return{locationStyles:n}}const jl=a({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...l(),...Ol({location:"top"}),...Ka(),...la(),...Kt()},"VProgressLinear"),Hl=ut()({name:"VProgressLinear",props:jl(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"modelValue"),{isRtl:n,rtlClasses:r}=Yt(),{themeClasses:i}=Zt(e),{locationStyles:s}=zl(e),{textColorClasses:u,textColorStyles:c}=Ua(e,"color"),{backgroundColorClasses:d,backgroundColorStyles:v}=Wa(t.computed((()=>e.bgColor||e.color))),{backgroundColorClasses:p,backgroundColorStyles:f}=Wa(e,"color"),{roundedClasses:m}=qa(e),{intersectionRef:h,isIntersecting:y}=Ll(),b=t.computed((()=>parseInt(e.max,10))),V=t.computed((()=>parseInt(e.height,10))),w=t.computed((()=>parseFloat(e.bufferValue)/b.value*100)),S=t.computed((()=>parseFloat(o.value)/b.value*100)),k=t.computed((()=>n.value!==e.reverse)),x=t.computed((()=>e.indeterminate?"fade-transition":"slide-x-transition")),C=t.computed((()=>null==e.bgOpacity?e.bgOpacity:parseFloat(e.bgOpacity)))
function N(e){if(!h.value)return
const{left:t,right:a,width:l}=h.value.getBoundingClientRect(),n=k.value?l-e.clientX+(a-l):e.clientX-t
o.value=Math.round(n/l*b.value)}return kt((()=>t.createVNode(e.tag,{ref:h,class:["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&y.value,"v-progress-linear--reverse":k.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},m.value,i.value,r.value,e.class],style:[{bottom:"bottom"===e.location?0:void 0,top:"top"===e.location?0:void 0,height:e.active?g(V.value):0,"--v-progress-linear-height":g(V.value),...s.value},e.style],role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:S.value,onClick:e.clickable&&N},{default:()=>[e.stream&&t.createVNode("div",{key:"stream",class:["v-progress-linear__stream",u.value],style:{...c.value,[k.value?"left":"right"]:g(-V.value),borderTop:`${g(V.value/2)} dotted`,opacity:C.value,top:`calc(50% - ${g(V.value/4)})`,width:g(100-w.value,"%"),"--v-progress-linear-stream-to":g(V.value*(k.value?1:-1))}},null),t.createVNode("div",{class:["v-progress-linear__background",d.value],style:[v.value,{opacity:C.value,width:g(e.stream?w.value:100,"%")}]},null),t.createVNode(t.Transition,{name:x.value},{default:()=>[e.indeterminate?t.createVNode("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map((e=>t.createVNode("div",{key:e,class:["v-progress-linear__indeterminate",e,p.value],style:f.value},null)))]):t.createVNode("div",{class:["v-progress-linear__determinate",p.value],style:[f.value,{width:g(S.value,"%")}]},null)]}),l.default&&t.createVNode("div",{class:"v-progress-linear__content"},[l.default({value:S.value,buffer:w.value})])]}))),{}}}),Ul=a({loading:[Boolean,String]},"loader")
function Wl(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
const l=t.computed((()=>({[`${a}--loading`]:e.loading})))
return{loaderClasses:l}}function Yl(e,a){let{slots:l}=a
return t.createVNode("div",{class:`${e.name}__loader`},[l.default?.({color:e.color,isActive:e.active})||t.createVNode(Hl,{active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const Gl=["static","relative","fixed","absolute","sticky"],Kl=a({position:{type:String,validator:e=>Gl.includes(e)}},"position")
function ql(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
const l=t.computed((()=>e.position?`${a}--${e.position}`:void 0))
return{positionClasses:l}}function Xl(){return pt("useRouter")?.proxy?.$router}function Zl(e,a){const l=t.resolveDynamicComponent("RouterLink"),o=t.computed((()=>!(!e.href&&!e.to))),n=t.computed((()=>o?.value||G(a,"click")||G(e,"click")))
if("string"==typeof l)return{isLink:o,isClickable:n,href:t.toRef(e,"href")}
const r=e.to?l.useLink(e):void 0
return{isLink:o,isClickable:n,route:r?.route,navigate:r?.navigate,isActive:r&&t.computed((()=>e.exact?r.isExactActive?.value:r.isActive?.value)),href:t.computed((()=>e.to?r?.route.value.href:e.href))}}const Jl=a({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router")
let Ql=!1
const eo=Symbol("rippleStop")
function to(e,t){e.style.transform=t,e.style.webkitTransform=t}function ao(e){return"TouchEvent"===e.constructor.name}function lo(e){return"KeyboardEvent"===e.constructor.name}const oo={show(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
if(!t?._ripple?.enabled)return
const l=document.createElement("span"),o=document.createElement("span")
l.appendChild(o),l.className="v-ripple__container",a.class&&(l.className+=` ${a.class}`)
const{radius:n,scale:r,x:i,y:s,centerX:u,centerY:c}=function(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=0,o=0
if(!lo(e)){const a=t.getBoundingClientRect(),n=ao(e)?e.touches[e.touches.length-1]:e
l=n.clientX-a.left,o=n.clientY-a.top}let n=0,r=.3
t._ripple?.circle?(r=.15,n=t.clientWidth/2,n=a.center?n:n+Math.sqrt((l-n)**2+(o-n)**2)/4):n=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2
const i=(t.clientWidth-2*n)/2+"px",s=(t.clientHeight-2*n)/2+"px",u=a.center?i:l-n+"px",c=a.center?s:o-n+"px"
return{radius:n,scale:r,x:u,y:c,centerX:i,centerY:s}}(e,t,a),d=2*n+"px"
o.className="v-ripple__animation",o.style.width=d,o.style.height=d,t.appendChild(l)
const v=window.getComputedStyle(t)
v&&"static"===v.position&&(t.style.position="relative",t.dataset.previousPosition="static"),o.classList.add("v-ripple__animation--enter"),o.classList.add("v-ripple__animation--visible"),to(o,`translate(${i}, ${s}) scale3d(${r},${r},${r})`),o.dataset.activated=String(performance.now()),setTimeout((()=>{o.classList.remove("v-ripple__animation--enter"),o.classList.add("v-ripple__animation--in"),to(o,`translate(${u}, ${c}) scale3d(1,1,1)`)}),0)},hide(e){if(!e?._ripple?.enabled)return
const t=e.getElementsByClassName("v-ripple__animation")
if(0===t.length)return
const a=t[t.length-1]
if(a.dataset.isHiding)return
a.dataset.isHiding="true"
const l=performance.now()-Number(a.dataset.activated),o=Math.max(250-l,0)
setTimeout((()=>{a.classList.remove("v-ripple__animation--in"),a.classList.add("v-ripple__animation--out"),setTimeout((()=>{1===e.getElementsByClassName("v-ripple__animation").length&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),a.parentNode?.parentNode===e&&e.removeChild(a.parentNode)}),300)}),o)}}
function no(e){return void 0===e||!!e}function ro(e){const t={},a=e.currentTarget
if(a?._ripple&&!a._ripple.touched&&!e[eo]){if(e[eo]=!0,ao(e))a._ripple.touched=!0,a._ripple.isTouch=!0
else if(a._ripple.isTouch)return
if(t.center=a._ripple.centered||lo(e),a._ripple.class&&(t.class=a._ripple.class),ao(e)){if(a._ripple.showTimerCommit)return
a._ripple.showTimerCommit=()=>{oo.show(e,a,t)},a._ripple.showTimer=window.setTimeout((()=>{a?._ripple?.showTimerCommit&&(a._ripple.showTimerCommit(),a._ripple.showTimerCommit=null)}),80)}else oo.show(e,a,t)}}function io(e){e[eo]=!0}function so(e){const t=e.currentTarget
if(t?._ripple){if(window.clearTimeout(t._ripple.showTimer),"touchend"===e.type&&t._ripple.showTimerCommit)return t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,void(t._ripple.showTimer=window.setTimeout((()=>{so(e)})))
window.setTimeout((()=>{t._ripple&&(t._ripple.touched=!1)})),oo.hide(t)}}function uo(e){const t=e.currentTarget
t?._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let co=!1
function vo(e){co||e.keyCode!==b.enter&&e.keyCode!==b.space||(co=!0,ro(e))}function po(e){co=!1,so(e)}function fo(e){co&&(co=!1,so(e))}function mo(e,t,a){const{value:l,modifiers:o}=t,n=no(l)
if(n||oo.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=n,e._ripple.centered=o.center,e._ripple.circle=o.circle,h(l)&&l.class&&(e._ripple.class=l.class),n&&!a){if(o.stop)return e.addEventListener("touchstart",io,{passive:!0}),void e.addEventListener("mousedown",io)
e.addEventListener("touchstart",ro,{passive:!0}),e.addEventListener("touchend",so,{passive:!0}),e.addEventListener("touchmove",uo,{passive:!0}),e.addEventListener("touchcancel",so),e.addEventListener("mousedown",ro),e.addEventListener("mouseup",so),e.addEventListener("mouseleave",so),e.addEventListener("keydown",vo),e.addEventListener("keyup",po),e.addEventListener("blur",fo),e.addEventListener("dragstart",so,{passive:!0})}else!n&&a&&go(e)}function go(e){e.removeEventListener("mousedown",ro),e.removeEventListener("touchstart",ro),e.removeEventListener("touchend",so),e.removeEventListener("touchmove",uo),e.removeEventListener("touchcancel",so),e.removeEventListener("mouseup",so),e.removeEventListener("mouseleave",so),e.removeEventListener("keydown",vo),e.removeEventListener("keyup",po),e.removeEventListener("dragstart",so),e.removeEventListener("blur",fo)}const ho={mounted:function(e,t){mo(e,t,!1)},unmounted:function(e){delete e._ripple,go(e)},updated:function(e,t){if(t.value===t.oldValue)return
mo(e,t,no(t.oldValue))}},yo=a({active:{type:Boolean,default:void 0},symbol:{type:null,default:hl},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:Sl,appendIcon:Sl,block:Boolean,stacked:Boolean,ripple:{type:[Boolean,Object],default:!0},text:String,...za(),...l(),...ol(),...Aa(),...Ya(),...pl(),...Ul(),...Ol(),...Kl(),...Ka(),...Jl(),...El(),...la({tag:"button"}),...Kt(),...sl({variant:"elevated"})},"VBtn"),bo=ut()({name:"VBtn",directives:{Ripple:ho},props:yo(),emits:{"group:selected":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const{themeClasses:n}=Zt(e),{borderClasses:r}=ja(e),{colorClasses:i,colorStyles:s,variantClasses:u}=ul(e),{densityClasses:c}=nl(e),{dimensionStyles:d}=Ea(e),{elevationClasses:v}=Ga(e),{loaderClasses:p}=Wl(e),{locationStyles:f}=zl(e),{positionClasses:m}=ql(e),{roundedClasses:g}=qa(e),{sizeClasses:h,sizeStyles:y}=Tl(e),b=fl(e,e.symbol,!1),V=Zl(e,l),w=t.computed((()=>void 0!==e.active?e.active:V.isLink.value?V.isActive?.value:b?.isSelected.value)),S=t.computed((()=>b?.disabled.value||e.disabled)),k=t.computed((()=>"elevated"===e.variant&&!(e.disabled||e.flat||e.border))),x=t.computed((()=>{if(void 0!==e.value)return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value}))
function C(e){S.value||V.isLink.value&&(e.metaKey||e.ctrlKey||e.shiftKey||0!==e.button||"_blank"===l.target)||(V.navigate?.(e),b?.toggle())}return function(e,a){t.watch((()=>e.isActive?.value),(l=>{e.isLink.value&&l&&a&&t.nextTick((()=>{a(!0)}))}),{immediate:!0})}(V,b?.select),kt((()=>{const a=V.isLink.value?"a":e.tag,l=!(!e.prependIcon&&!o.prepend),N=!(!e.appendIcon&&!o.append),_=!(!e.icon||!0===e.icon),I=b?.isSelected.value&&(!V.isLink.value||V.isActive?.value)||!b||V.isActive?.value
return t.withDirectives(t.createVNode(a,{type:"a"===a?void 0:"button",class:["v-btn",b?.selectedClass.value,{"v-btn--active":w.value,"v-btn--block":e.block,"v-btn--disabled":S.value,"v-btn--elevated":k.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--stacked":e.stacked},n.value,r.value,I?i.value:void 0,c.value,v.value,p.value,m.value,g.value,h.value,u.value,e.class],style:[I?s.value:void 0,d.value,f.value,y.value,e.style],disabled:S.value||void 0,href:V.href.value,onClick:C,value:x.value},{default:()=>[il(!0,"v-btn"),!e.icon&&l&&t.createVNode("span",{key:"prepend",class:"v-btn__prepend"},[o.prepend?t.createVNode(Ra,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},o.prepend):t.createVNode($l,{key:"prepend-icon",icon:e.prependIcon},null)]),t.createVNode("span",{class:"v-btn__content","data-no-activator":""},[!o.default&&_?t.createVNode($l,{key:"content-icon",icon:e.icon},null):t.createVNode(Ra,{key:"content-defaults",disabled:!_,defaults:{VIcon:{icon:e.icon}}},{default:()=>[o.default?.()??e.text]})]),!e.icon&&N&&t.createVNode("span",{key:"append",class:"v-btn__append"},[o.append?t.createVNode(Ra,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},o.append):t.createVNode($l,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&t.createVNode("span",{key:"loader",class:"v-btn__loader"},[o.loader?.()??t.createVNode(Fl,{color:"boolean"==typeof e.loading?void 0:e.loading,indeterminate:!0,size:"23",width:"2"},null)])]}),[[t.resolveDirective("ripple"),!S.value&&e.ripple,null]])})),{}}}),Vo=a({...yo({icon:"$menu",variant:"text"})},"VAppBarNavIcon"),wo=ut()({name:"VAppBarNavIcon",props:Vo(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode(bo,t.mergeProps(e,{class:["v-app-bar-nav-icon"]}),l))),{}}}),So=ut()({name:"VAppBarTitle",props:oa(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode(na,t.mergeProps(e,{class:"v-app-bar-title"}),l))),{}}}),ko=ct("v-alert-title"),xo=["success","info","warning","error"],Co=a({border:{type:[Boolean,String],validator:e=>"boolean"==typeof e||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:Sl,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>xo.includes(e)},...l(),...ol(),...Aa(),...Ya(),...Ol(),...Kl(),...Ka(),...la(),...Kt(),...sl({variant:"flat"})},"VAlert"),No=ut()({name:"VAlert",props:Co(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{emit:l,slots:o}=a
const n=$t(e,"modelValue"),r=t.computed((()=>{if(!1!==e.icon)return e.type?e.icon??`$${e.type}`:e.icon})),i=t.computed((()=>({color:e.color??e.type,variant:e.variant}))),{themeClasses:s}=Zt(e),{colorClasses:u,colorStyles:c,variantClasses:d}=ul(i),{densityClasses:v}=nl(e),{dimensionStyles:p}=Ea(e),{elevationClasses:f}=Ga(e),{locationStyles:m}=zl(e),{positionClasses:g}=ql(e),{roundedClasses:h}=qa(e),{textColorClasses:y,textColorStyles:b}=Ua(t.toRef(e,"borderColor")),{t:V}=Ut(),w=t.computed((()=>({"aria-label":V(e.closeLabel),onClick(e){n.value=!1,l("click:close",e)}})))
return()=>{const a=!(!o.prepend&&!r.value),l=!(!o.title&&!e.title),i=!(!o.close&&!e.closable)
return n.value&&t.createVNode(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${!0===e.border?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},s.value,u.value,v.value,f.value,g.value,h.value,d.value,e.class],style:[c.value,p.value,m.value,e.style],role:"alert"},{default:()=>[il(!1,"v-alert"),e.border&&t.createVNode("div",{key:"border",class:["v-alert__border",y.value],style:b.value},null),a&&t.createVNode("div",{key:"prepend",class:"v-alert__prepend"},[o.prepend?t.createVNode(Ra,{key:"prepend-defaults",disabled:!r.value,defaults:{VIcon:{density:e.density,icon:r.value,size:e.prominent?44:28}}},o.prepend):t.createVNode($l,{key:"prepend-icon",density:e.density,icon:r.value,size:e.prominent?44:28},null)]),t.createVNode("div",{class:"v-alert__content"},[l&&t.createVNode(ko,{key:"title"},{default:()=>[o.title?.()??e.title]}),o.text?.()??e.text,o.default?.()]),o.append&&t.createVNode("div",{key:"append",class:"v-alert__append"},[o.append()]),i&&t.createVNode("div",{key:"close",class:"v-alert__close"},[o.close?t.createVNode(Ra,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>[o.close?.({props:w.value})]}):t.createVNode(bo,t.mergeProps({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},w.value),null)])]})}}}),_o=a({text:String,clickable:Boolean,...l(),...Kt()},"VLabel"),Io=ut()({name:"VLabel",props:_o(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode("label",{class:["v-label",{"v-label--clickable":e.clickable},e.class],style:e.style},[e.text,l.default?.()]))),{}}}),Bo=Symbol.for("vuetify:selection-control-group"),Ro=a({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:Sl,trueIcon:Sl,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:v},...l(),...ol(),...Kt()},"SelectionControlGroup"),Ao=a({...Ro({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup"),Eo=ut()({name:"VSelectionControlGroup",props:Ao(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"modelValue"),n=ht(),r=t.computed((()=>e.id||`v-selection-control-group-${n}`)),i=t.computed((()=>e.name||r.value)),s=new Set
return t.provide(Bo,{modelValue:o,forceUpdate:()=>{s.forEach((e=>e()))},onForceUpdate:e=>{s.add(e),t.onScopeDispose((()=>{s.delete(e)}))}}),nt({[e.defaultsTarget]:{color:t.toRef(e,"color"),disabled:t.toRef(e,"disabled"),density:t.toRef(e,"density"),error:t.toRef(e,"error"),inline:t.toRef(e,"inline"),modelValue:o,multiple:t.computed((()=>!!e.multiple||null==e.multiple&&Array.isArray(o.value))),name:i,falseIcon:t.toRef(e,"falseIcon"),trueIcon:t.toRef(e,"trueIcon"),readonly:t.toRef(e,"readonly"),ripple:t.toRef(e,"ripple"),type:t.toRef(e,"type"),valueComparator:t.toRef(e,"valueComparator")}}),kt((()=>t.createVNode("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:"radio"===e.type?"radiogroup":void 0},[l.default?.()]))),{}}}),To=a({label:String,trueValue:null,falseValue:null,value:null,...l(),...Ro()},"VSelectionControl")
const Po=ut()({name:"VSelectionControl",directives:{Ripple:ho},inheritAttrs:!1,props:To(),emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const{group:n,densityClasses:r,icon:i,model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:v,trueValue:p}=function(e){const a=t.inject(Bo,void 0),{densityClasses:l}=nl(e),o=$t(e,"modelValue"),n=t.computed((()=>void 0!==e.trueValue?e.trueValue:void 0===e.value||e.value)),r=t.computed((()=>void 0!==e.falseValue&&e.falseValue)),i=t.computed((()=>!!e.multiple||null==e.multiple&&Array.isArray(o.value))),s=t.computed({get(){const t=a?a.modelValue.value:o.value
return i.value?t.some((t=>e.valueComparator(t,n.value))):e.valueComparator(t,n.value)},set(t){if(e.readonly)return
const l=t?n.value:r.value
let s=l
i.value&&(s=t?[...R(o.value),l]:R(o.value).filter((t=>!e.valueComparator(t,n.value)))),a?a.modelValue.value=s:o.value=s}}),{textColorClasses:u,textColorStyles:c}=Ua(t.computed((()=>!s.value||e.error||e.disabled?void 0:e.color))),{backgroundColorClasses:d,backgroundColorStyles:v}=Wa(t.computed((()=>!s.value||e.error||e.disabled?void 0:e.color))),p=t.computed((()=>s.value?e.trueIcon:e.falseIcon))
return{group:a,densityClasses:l,trueValue:n,falseValue:r,model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:v,icon:p}}(e),f=ht(),m=t.computed((()=>e.id||`input-${f}`)),g=t.shallowRef(!1),h=t.shallowRef(!1),y=t.ref()
function b(e){g.value=!0,!1!==Q(e.target,":focus-visible")&&(h.value=!0)}function V(){g.value=!1,h.value=!1}function w(a){e.readonly&&n&&t.nextTick((()=>n.forceUpdate())),s.value=a.target.checked}return n?.onForceUpdate((()=>{y.value&&(y.value.checked=s.value)})),kt((()=>{const a=o.label?o.label({label:e.label,props:{for:m.value}}):e.label,[n,f]=B(l),S=t.createVNode("input",t.mergeProps({ref:y,checked:s.value,disabled:!(!e.readonly&&!e.disabled),id:m.value,onBlur:V,onFocus:b,onInput:w,"aria-disabled":!(!e.readonly&&!e.disabled),type:e.type,value:p.value,name:e.name,"aria-checked":"checkbox"===e.type?s.value:void 0},f),null)
return t.createVNode("div",t.mergeProps({class:["v-selection-control",{"v-selection-control--dirty":s.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":g.value,"v-selection-control--focus-visible":h.value,"v-selection-control--inline":e.inline},r.value,e.class]},n,{style:e.style}),[t.createVNode("div",{class:["v-selection-control__wrapper",u.value],style:c.value},[o.default?.({backgroundColorClasses:d,backgroundColorStyles:v}),t.withDirectives(t.createVNode("div",{class:["v-selection-control__input"]},[o.input?.({model:s,textColorClasses:u,textColorStyles:c,backgroundColorClasses:d,backgroundColorStyles:v,inputNode:S,icon:i.value,props:{onFocus:b,onBlur:V,id:m.value}})??t.createVNode(t.Fragment,null,[i.value&&t.createVNode($l,{key:"icon",icon:i.value},null),S])]),[[t.resolveDirective("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),a&&t.createVNode(Io,{for:m.value,clickable:!0,onClick:e=>e.stopPropagation()},{default:()=>[a]})])})),{isFocused:g,input:y}}}),$o=a({indeterminate:Boolean,indeterminateIcon:{type:Sl,default:"$checkboxIndeterminate"},...To({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),Lo=ut()({name:"VCheckboxBtn",props:$o(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"indeterminate"),n=$t(e,"modelValue")
function r(e){o.value&&(o.value=!1)}const i=t.computed((()=>o.value?e.indeterminateIcon:e.falseIcon)),s=t.computed((()=>o.value?e.indeterminateIcon:e.trueIcon))
return kt((()=>{const a=x(Po.filterProps(e)[0],["modelValue"])
return t.createVNode(Po,t.mergeProps(a,{modelValue:n.value,"onUpdate:modelValue":[e=>n.value=e,r],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:i.value,trueIcon:s.value,"aria-checked":o.value?"mixed":void 0}),l)})),{}}})
function Mo(e){const{t:a}=Ut()
return{InputIcon:function(l){let{name:o}=l
const n={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[o],r=e[`onClick:${o}`],i=r&&n?a(`$vuetify.input.${n}`,e.label??""):void 0
return t.createVNode($l,{icon:e[`${o}Icon`],"aria-label":i,onClick:r},null)}}}const Fo=a({active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...l(),...$a({transition:{component:Ca,leaveAbsolute:!0,group:!0}})},"VMessages"),Do=ut()({name:"VMessages",props:Fo(),setup(e,a){let{slots:l}=a
const o=t.computed((()=>R(e.messages))),{textColorClasses:n,textColorStyles:r}=Ua(t.computed((()=>e.color)))
return kt((()=>t.createVNode(La,{transition:e.transition,tag:"div",class:["v-messages",n.value,e.class],style:[r.value,e.style],role:"alert","aria-live":"polite"},{default:()=>[e.active&&o.value.map(((e,a)=>t.createVNode("div",{class:"v-messages__message",key:`${a}-${o.value}`},[l.message?l.message({message:e}):e])))]}))),{}}}),Oo=a({focused:Boolean,"onUpdate:focused":Y()},"focus")
function zo(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft()
const l=$t(e,"focused"),o=t.computed((()=>({[`${a}--focused`]:l.value})))
function n(){l.value=!0}function r(){l.value=!1}return{focusClasses:o,isFocused:l,focus:n,blur:r}}const jo=Symbol.for("vuetify:form"),Ho=a({disabled:Boolean,fastFail:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form")
function Uo(){return t.inject(jo,null)}const Wo=a({disabled:{type:Boolean,default:null},error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:{type:Boolean,default:null},rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...Oo()},"validation")
function Yo(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ft(),l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ht()
const o=$t(e,"modelValue"),n=t.computed((()=>void 0===e.validationValue?o.value:e.validationValue)),r=Uo(),i=t.ref([]),s=t.shallowRef(!0),u=t.computed((()=>!(!R(""===o.value?null:o.value).length&&!R(""===n.value?null:n.value).length))),c=t.computed((()=>!!(e.disabled??r?.isDisabled.value))),d=t.computed((()=>!!(e.readonly??r?.isReadonly.value))),v=t.computed((()=>e.errorMessages?.length?R(e.errorMessages).slice(0,Math.max(0,+e.maxErrors)):i.value)),p=t.computed((()=>{let t=(e.validateOn??r?.validateOn.value)||"input"
"lazy"===t&&(t="input lazy")
const a=new Set(t?.split(" ")??[])
return{blur:a.has("blur")||a.has("input"),input:a.has("input"),submit:a.has("submit"),lazy:a.has("lazy")}})),f=t.computed((()=>!e.error&&!e.errorMessages?.length&&(!e.rules.length||(s.value?!i.value.length&&!p.value.lazy||null:!i.value.length)))),m=t.shallowRef(!1),g=t.computed((()=>({[`${a}--error`]:!1===f.value,[`${a}--dirty`]:u.value,[`${a}--disabled`]:c.value,[`${a}--readonly`]:d.value}))),h=t.computed((()=>e.name??t.unref(l)))
function y(){o.value=null,t.nextTick(b)}function b(){s.value=!0,p.value.lazy?i.value=[]:V(!0)}async function V(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
const a=[]
m.value=!0
for(const t of e.rules){if(a.length>=+(e.maxErrors??1))break
const l="function"==typeof t?t:()=>t,o=await l(n.value)
!0!==o&&(!1===o||"string"==typeof o?a.push(o||""):console.warn(`${o} is not a valid value. Rule functions must return boolean true or a string.`))}return i.value=a,m.value=!1,s.value=t,i.value}return t.onBeforeMount((()=>{r?.register({id:h.value,validate:V,reset:y,resetValidation:b})})),t.onBeforeUnmount((()=>{r?.unregister(h.value)})),t.onMounted((async()=>{p.value.lazy||await V(!0),r?.update(h.value,f.value,v.value)})),Pt((()=>p.value.input),(()=>{t.watch(n,(()=>{if(null!=n.value)V()
else if(e.focused){const a=t.watch((()=>e.focused),(e=>{e||V(),a()}))}}))})),Pt((()=>p.value.blur),(()=>{t.watch((()=>e.focused),(e=>{e||V()}))})),t.watch(f,(()=>{r?.update(h.value,f.value,v.value)})),{errorMessages:v,isDirty:u,isDisabled:c,isReadonly:d,isPristine:s,isValid:f,isValidating:m,reset:y,resetValidation:b,validate:V,validationClasses:g}}const Go=a({id:String,appendIcon:Sl,centerAffix:{type:Boolean,default:!0},prependIcon:Sl,hideDetails:[Boolean,String],hint:String,persistentHint:Boolean,messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":Y(),"onClick:append":Y(),...l(),...ol(),...Wo()},"VInput"),Ko=ut()({name:"VInput",props:{...Go()},emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:l,slots:o,emit:n}=a
const{densityClasses:r}=nl(e),{rtlClasses:i}=Yt(),{InputIcon:s}=Mo(e),u=ht(),c=t.computed((()=>e.id||`input-${u}`)),d=t.computed((()=>`${c.value}-messages`)),{errorMessages:v,isDirty:p,isDisabled:f,isReadonly:m,isPristine:g,isValid:h,isValidating:y,reset:b,resetValidation:V,validate:w,validationClasses:S}=Yo(e,"v-input",c),k=t.computed((()=>({id:c,messagesId:d,isDirty:p,isDisabled:f,isReadonly:m,isPristine:g,isValid:h,isValidating:y,reset:b,resetValidation:V,validate:w}))),x=t.computed((()=>e.errorMessages?.length||!g.value&&v.value.length?v.value:e.hint&&(e.persistentHint||e.focused)?e.hint:e.messages))
return kt((()=>{const a=!(!o.prepend&&!e.prependIcon),l=!(!o.append&&!e.appendIcon),n=x.value.length>0,u=!e.hideDetails||"auto"===e.hideDetails&&(n||!!o.details)
return t.createVNode("div",{class:["v-input",`v-input--${e.direction}`,{"v-input--center-affix":e.centerAffix},r.value,i.value,S.value,e.class],style:e.style},[a&&t.createVNode("div",{key:"prepend",class:"v-input__prepend"},[o.prepend?.(k.value),e.prependIcon&&t.createVNode(s,{key:"prepend-icon",name:"prepend"},null)]),o.default&&t.createVNode("div",{class:"v-input__control"},[o.default?.(k.value)]),l&&t.createVNode("div",{key:"append",class:"v-input__append"},[e.appendIcon&&t.createVNode(s,{key:"append-icon",name:"append"},null),o.append?.(k.value)]),u&&t.createVNode("div",{class:"v-input__details"},[t.createVNode(Do,{id:d.value,active:n,messages:x.value},{message:o.message}),o.details?.(k.value)])])})),{reset:b,resetValidation:V,validate:w}}}),qo=a({...Go(),...x($o(),["inline"])},"VCheckbox"),Xo=ut()({name:"VCheckbox",inheritAttrs:!1,props:qo(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const n=$t(e,"modelValue"),{isFocused:r,focus:i,blur:s}=zo(e),u=ht(),c=t.computed((()=>e.id||`checkbox-${u}`))
return kt((()=>{const[a,u]=B(l),[d,v]=Ko.filterProps(e),[p,f]=Lo.filterProps(e)
return t.createVNode(Ko,t.mergeProps({class:["v-checkbox",e.class]},a,d,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,id:c.value,focused:r.value,style:e.style}),{...o,default:e=>{let{id:a,messagesId:l,isDisabled:r,isReadonly:c}=e
return t.createVNode(Lo,t.mergeProps(p,{id:a.value,"aria-describedby":l.value,disabled:r.value,readonly:c.value},u,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,onFocus:i,onBlur:s}),o)}})})),{}}}),Zo=a({start:Boolean,end:Boolean,icon:Sl,image:String,...l(),...ol(),...Ka(),...El(),...la(),...Kt(),...sl({variant:"flat"})},"VAvatar"),Jo=ut()({name:"VAvatar",props:Zo(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{colorClasses:n,colorStyles:r,variantClasses:i}=ul(e),{densityClasses:s}=nl(e),{roundedClasses:u}=qa(e),{sizeClasses:c,sizeStyles:d}=Tl(e)
return kt((()=>t.createVNode(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},o.value,n.value,s.value,u.value,c.value,i.value,e.class],style:[r.value,d.value,e.style]},{default:()=>[e.image?t.createVNode(Oa,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?t.createVNode($l,{key:"icon",icon:e.icon},null):l.default?.(),il(!1,"v-avatar")]}))),{}}}),Qo=Symbol.for("vuetify:v-chip-group"),en=a({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:v},...l(),...vl({selectedClass:"v-chip--selected"}),...la(),...Kt(),...sl({variant:"tonal"})},"VChipGroup"),tn=ut()({name:"VChipGroup",props:en(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{isSelected:n,select:r,next:i,prev:s,selected:u}=ml(e,Qo)
return nt({VChip:{color:t.toRef(e,"color"),disabled:t.toRef(e,"disabled"),filter:t.toRef(e,"filter"),variant:t.toRef(e,"variant")}}),kt((()=>t.createVNode(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>[l.default?.({isSelected:n,select:r,next:i,prev:s,selected:u.value})]}))),{}}}),an=a({activeClass:String,appendAvatar:String,appendIcon:Sl,closable:Boolean,closeIcon:{type:Sl,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:Sl,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:Y(),onClickOnce:Y(),...za(),...l(),...ol(),...Ya(),...pl(),...Ka(),...Jl(),...El(),...la({tag:"span"}),...Kt(),...sl({variant:"tonal"})},"VChip"),ln=ut()({name:"VChip",directives:{Ripple:ho},props:an(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{t:r}=Ut(),{borderClasses:i}=ja(e),{colorClasses:s,colorStyles:u,variantClasses:c}=ul(e),{densityClasses:d}=nl(e),{elevationClasses:v}=Ga(e),{roundedClasses:p}=qa(e),{sizeClasses:f}=Tl(e),{themeClasses:m}=Zt(e),g=$t(e,"modelValue"),h=fl(e,Qo,!1),y=Zl(e,l),b=t.computed((()=>!1!==e.link&&y.isLink.value)),V=t.computed((()=>!e.disabled&&!1!==e.link&&(!!h||e.link||y.isClickable.value))),w=t.computed((()=>({"aria-label":r(e.closeLabel),onClick(e){e.stopPropagation(),g.value=!1,o("click:close",e)}})))
function S(e){o("click",e),V.value&&(y.navigate?.(e),h?.toggle())}function k(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),S(e))}return()=>{const a=y.isLink.value?"a":e.tag,l=!(!e.appendIcon&&!e.appendAvatar),o=!(!l&&!n.append),r=!(!n.close&&!e.closable),x=!(!n.filter&&!e.filter)&&h,C=!(!e.prependIcon&&!e.prependAvatar),N=!(!C&&!n.prepend),_=!h||h.isSelected.value
return g.value&&t.withDirectives(t.createVNode(a,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":V.value,"v-chip--filter":x,"v-chip--pill":e.pill},m.value,i.value,_?s.value:void 0,d.value,v.value,p.value,f.value,c.value,h?.selectedClass.value,e.class],style:[_?u.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:y.href.value,tabindex:V.value?0:void 0,onClick:S,onKeydown:V.value&&!b.value&&k},{default:()=>[il(V.value,"v-chip"),x&&t.createVNode(Ia,{key:"filter"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-chip__filter"},[n.filter?t.createVNode(Ra,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},n.filter):t.createVNode($l,{key:"filter-icon",icon:e.filterIcon},null)]),[[t.vShow,h.isSelected.value]])]}),N&&t.createVNode("div",{key:"prepend",class:"v-chip__prepend"},[n.prepend?t.createVNode(Ra,{key:"prepend-defaults",disabled:!C,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},n.prepend):t.createVNode(t.Fragment,null,[e.prependIcon&&t.createVNode($l,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&t.createVNode(Jo,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),t.createVNode("div",{class:"v-chip__content"},[n.default?.({isSelected:h?.isSelected.value,selectedClass:h?.selectedClass.value,select:h?.select,toggle:h?.toggle,value:h?.value.value,disabled:e.disabled})??e.text]),o&&t.createVNode("div",{key:"append",class:"v-chip__append"},[n.append?t.createVNode(Ra,{key:"append-defaults",disabled:!l,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},n.append):t.createVNode(t.Fragment,null,[e.appendIcon&&t.createVNode($l,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&t.createVNode(Jo,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),r&&t.createVNode("div",t.mergeProps({key:"close",class:"v-chip__close"},w.value),[n.close?t.createVNode(Ra,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},n.close):t.createVNode($l,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}),[[t.resolveDirective("ripple"),V.value&&e.ripple,null]])}}}),on=Symbol.for("vuetify:list")
function nn(){const e=t.inject(on,{hasPrepend:t.shallowRef(!1),updateHasPrepend:()=>null}),a={hasPrepend:t.shallowRef(!1),updateHasPrepend:e=>{e&&(a.hasPrepend.value=e)}}
return t.provide(on,a),e}function rn(){return t.inject(on,null)}const sn={open:e=>{let{id:t,value:a,opened:l,parents:o}=e
if(a){const e=new Set
e.add(t)
let a=o.get(t)
for(;null!=a;)e.add(a),a=o.get(a)
return e}return l.delete(t),l},select:()=>null},un={open:e=>{let{id:t,value:a,opened:l,parents:o}=e
if(a){let e=o.get(t)
for(l.add(t);null!=e&&e!==t;)l.add(e),e=o.get(e)
return l}return l.delete(t),l},select:()=>null},cn={open:un.open,select:e=>{let{id:t,value:a,opened:l,parents:o}=e
if(!a)return l
const n=[]
let r=o.get(t)
for(;null!=r;)n.push(r),r=o.get(r)
return new Set(n)}},dn=e=>{const a={select:a=>{let{id:l,value:o,selected:n}=a
if(l=t.toRaw(l),e&&!o){const e=Array.from(n.entries()).reduce(((e,t)=>{let[a,l]=t
return"on"===l?[...e,a]:e}),[])
if(1===e.length&&e[0]===l)return n}return n.set(l,o?"on":"off"),n},in:(e,t,l)=>{let o=new Map
for(const n of e||[])o=a.select({id:n,value:!0,selected:new Map(o),children:t,parents:l})
return o},out:e=>{const t=[]
for(const[a,l]of e.entries())"on"===l&&t.push(a)
return t}}
return a},vn=e=>{const a=dn(e)
return{select:e=>{let{selected:l,id:o,...n}=e
o=t.toRaw(o)
const r=l.has(o)?new Map([[o,l.get(o)]]):new Map
return a.select({...n,id:o,selected:r})},in:(e,t,l)=>{let o=new Map
return e?.length&&(o=a.in(e.slice(0,1),t,l)),o},out:(e,t,l)=>a.out(e,t,l)}},pn=Symbol.for("vuetify:nested"),fn={id:t.shallowRef(),root:{register:()=>null,unregister:()=>null,parents:t.ref(new Map),children:t.ref(new Map),open:()=>null,openOnSelect:()=>null,select:()=>null,opened:t.ref(new Set),selected:t.ref(new Map),selectedValues:t.ref([])}},mn=a({selectStrategy:[String,Function],openStrategy:[String,Object],opened:Array,selected:Array,mandatory:Boolean},"nested"),gn=e=>{let a=!1
const l=t.ref(new Map),o=t.ref(new Map),n=$t(e,"opened",e.opened,(e=>new Set(e)),(e=>[...e.values()])),r=t.computed((()=>{if("object"==typeof e.selectStrategy)return e.selectStrategy
switch(e.selectStrategy){case"single-leaf":return(e=>{const a=vn(e)
return{select:e=>{let{id:l,selected:o,children:n,...r}=e
return l=t.toRaw(l),n.has(l)?o:a.select({id:l,selected:o,children:n,...r})},in:a.in,out:a.out}})(e.mandatory)
case"leaf":return(e=>{const a=dn(e)
return{select:e=>{let{id:l,selected:o,children:n,...r}=e
return l=t.toRaw(l),n.has(l)?o:a.select({id:l,selected:o,children:n,...r})},in:a.in,out:a.out}})(e.mandatory)
case"independent":return dn(e.mandatory)
case"single-independent":return vn(e.mandatory)
case"classic":default:return(e=>{const a={select:a=>{let{id:l,value:o,selected:n,children:r,parents:i}=a
l=t.toRaw(l)
const s=new Map(n),u=[l]
for(;u.length;){const e=u.shift()
n.set(e,o?"on":"off"),r.has(e)&&u.push(...r.get(e))}let c=i.get(l)
for(;c;){const e=r.get(c),t=e.every((e=>"on"===n.get(e))),a=e.every((e=>!n.has(e)||"off"===n.get(e)))
n.set(c,t?"on":a?"off":"indeterminate"),c=i.get(c)}return e&&!o&&0===Array.from(n.entries()).reduce(((e,t)=>{let[a,l]=t
return"on"===l?[...e,a]:e}),[]).length?s:n},in:(e,t,l)=>{let o=new Map
for(const n of e||[])o=a.select({id:n,value:!0,selected:new Map(o),children:t,parents:l})
return o},out:(e,t)=>{const a=[]
for(const[l,o]of e.entries())"on"!==o||t.has(l)||a.push(l)
return a}}
return a})(e.mandatory)}})),i=t.computed((()=>{if("object"==typeof e.openStrategy)return e.openStrategy
switch(e.openStrategy){case"list":return cn
case"single":return sn
case"multiple":default:return un}})),s=$t(e,"selected",e.selected,(e=>r.value.in(e,l.value,o.value)),(e=>r.value.out(e,l.value,o.value)))
function u(e){const t=[]
let a=e
for(;null!=a;)t.unshift(a),a=o.value.get(a)
return t}t.onBeforeUnmount((()=>{a=!0}))
const c=pt("nested"),d={id:t.shallowRef(),root:{opened:n,selected:s,selectedValues:t.computed((()=>{const e=[]
for(const[t,a]of s.value.entries())"on"===a&&e.push(t)
return e})),register:(e,t,a)=>{t&&e!==t&&o.value.set(e,t),a&&l.value.set(e,[]),null!=t&&l.value.set(t,[...l.value.get(t)||[],e])},unregister:e=>{if(a)return
l.value.delete(e)
const t=o.value.get(e)
if(t){const a=l.value.get(t)??[]
l.value.set(t,a.filter((t=>t!==e)))}o.value.delete(e),n.value.delete(e)},open:(e,t,a)=>{c.emit("click:open",{id:e,value:t,path:u(e),event:a})
const r=i.value.open({id:e,value:t,opened:new Set(n.value),children:l.value,parents:o.value,event:a})
r&&(n.value=r)},openOnSelect:(e,t,a)=>{const r=i.value.select({id:e,value:t,selected:new Map(s.value),opened:new Set(n.value),children:l.value,parents:o.value,event:a})
r&&(n.value=r)},select:(e,t,a)=>{c.emit("click:select",{id:e,value:t,path:u(e),event:a})
const n=r.value.select({id:e,value:t,selected:new Map(s.value),children:l.value,parents:o.value,event:a})
n&&(s.value=n),d.root.openOnSelect(e,t,a)},children:l,parents:o}}
return t.provide(pn,d),d.root},hn=(e,a)=>{const l=t.inject(pn,fn),o=Symbol(ht()),n=t.computed((()=>void 0!==e.value?e.value:o)),r={...l,id:n,open:(e,t)=>l.root.open(n.value,e,t),openOnSelect:(e,t)=>l.root.openOnSelect(n.value,e,t),isOpen:t.computed((()=>l.root.opened.value.has(n.value))),parent:t.computed((()=>l.root.parents.value.get(n.value))),select:(e,t)=>l.root.select(n.value,e,t),isSelected:t.computed((()=>"on"===l.root.selected.value.get(t.toRaw(n.value)))),isIndeterminate:t.computed((()=>"indeterminate"===l.root.selected.value.get(n.value))),isLeaf:t.computed((()=>!l.root.children.value.get(n.value))),isGroupActivator:l.isGroupActivator}
return!l.isGroupActivator&&l.root.register(n.value,l.id.value,a),t.onBeforeUnmount((()=>{!l.isGroupActivator&&l.root.unregister(n.value)})),a&&t.provide(pn,r),r},yn=st({name:"VListGroupActivator",setup(e,a){let{slots:l}=a
return(()=>{const e=t.inject(pn,fn)
t.provide(pn,{...e,isGroupActivator:!0})})(),()=>l.default?.()}}),bn=a({activeColor:String,baseColor:String,color:String,collapseIcon:{type:Sl,default:"$collapse"},expandIcon:{type:Sl,default:"$expand"},prependIcon:Sl,appendIcon:Sl,fluid:Boolean,subgroup:Boolean,title:String,value:null,...l(),...la()},"VListGroup"),Vn=ut()({name:"VListGroup",props:bn(),setup(e,a){let{slots:l}=a
const{isOpen:o,open:n,id:r}=hn(t.toRef(e,"value"),!0),i=t.computed((()=>`v-list-group--id-${String(r.value)}`)),s=rn(),{isBooted:u}=el()
function c(e){n(!o.value,e)}const d=t.computed((()=>({onClick:c,class:"v-list-group__header",id:i.value}))),v=t.computed((()=>o.value?e.collapseIcon:e.expandIcon)),p=t.computed((()=>({VListItem:{active:o.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&v.value,appendIcon:e.appendIcon||!e.subgroup&&v.value,title:e.title,value:e.value}})))
return kt((()=>t.createVNode(e.tag,{class:["v-list-group",{"v-list-group--prepend":s?.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":o.value},e.class],style:e.style},{default:()=>[l.activator&&t.createVNode(Ra,{defaults:p.value},{default:()=>[t.createVNode(yn,null,{default:()=>[l.activator({props:d.value,isOpen:o.value})]})]}),t.createVNode(La,{transition:{component:_a},disabled:!u.value},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-list-group__items",role:"group","aria-labelledby":i.value},[l.default?.()]),[[t.vShow,o.value]])]})]}))),{}}}),wn=ct("v-list-item-subtitle"),Sn=ct("v-list-item-title"),kn=a({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:Sl,baseColor:String,disabled:Boolean,lines:String,link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:Sl,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number,Boolean],title:[String,Number,Boolean],value:null,onClick:Y(),onClickOnce:Y(),...za(),...l(),...ol(),...Aa(),...Ya(),...Ka(),...Jl(),...la(),...Kt(),...sl({variant:"text"})},"VListItem"),xn=ut()({name:"VListItem",directives:{Ripple:ho},props:kn(),emits:{click:e=>!0},setup(e,a){let{attrs:l,slots:o,emit:n}=a
const r=Zl(e,l),i=t.computed((()=>void 0===e.value?r.href.value:e.value)),{select:s,isSelected:u,isIndeterminate:c,isGroupActivator:d,root:v,parent:p,openOnSelect:f}=hn(i,!1),m=rn(),g=t.computed((()=>!1!==e.active&&(e.active||r.isActive?.value||u.value))),h=t.computed((()=>!1!==e.link&&r.isLink.value)),y=t.computed((()=>!e.disabled&&!1!==e.link&&(e.link||r.isClickable.value||null!=e.value&&!!m))),b=t.computed((()=>e.rounded||e.nav)),V=t.computed((()=>e.color??e.activeColor)),w=t.computed((()=>({color:g.value?V.value??e.baseColor:e.baseColor,variant:e.variant})))
t.watch((()=>r.isActive?.value),(e=>{e&&null!=p.value&&v.open(p.value,!0),e&&f(e)}),{immediate:!0})
const{themeClasses:S}=Zt(e),{borderClasses:k}=ja(e),{colorClasses:x,colorStyles:C,variantClasses:N}=ul(w),{densityClasses:_}=nl(e),{dimensionStyles:I}=Ea(e),{elevationClasses:B}=Ga(e),{roundedClasses:R}=qa(b),A=t.computed((()=>e.lines?`v-list-item--${e.lines}-line`:void 0)),E=t.computed((()=>({isActive:g.value,select:s,isSelected:u.value,isIndeterminate:c.value})))
function T(t){n("click",t),!d&&y.value&&(r.navigate?.(t),null!=e.value&&s(!u.value,t))}function P(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),T(e))}return kt((()=>{const a=h.value?"a":e.tag,l=o.title||e.title,n=o.subtitle||e.subtitle,i=!(!e.appendAvatar&&!e.appendIcon),s=!(!i&&!o.append),u=!(!e.prependAvatar&&!e.prependIcon),c=!(!u&&!o.prepend)
var d,v
return m?.updateHasPrepend(c),e.activeColor&&(d="active-color",v=["color","base-color"],v=Array.isArray(v)?v.slice(0,-1).map((e=>`'${e}'`)).join(", ")+` or '${v.at(-1)}'`:`'${v}'`,t.warn(`[Vuetify UPGRADE] '${d}' is deprecated, use ${v} instead.`)),t.withDirectives(t.createVNode(a,{class:["v-list-item",{"v-list-item--active":g.value,"v-list-item--disabled":e.disabled,"v-list-item--link":y.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!c&&m?.hasPrepend.value,[`${e.activeClass}`]:e.activeClass&&g.value},S.value,k.value,x.value,_.value,B.value,A.value,R.value,N.value,e.class],style:[C.value,I.value,e.style],href:r.href.value,tabindex:y.value?m?-2:0:void 0,onClick:T,onKeydown:y.value&&!h.value&&P},{default:()=>[il(y.value||g.value,"v-list-item"),c&&t.createVNode("div",{key:"prepend",class:"v-list-item__prepend"},[o.prepend?t.createVNode(Ra,{key:"prepend-defaults",disabled:!u,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>[o.prepend?.(E.value)]}):t.createVNode(t.Fragment,null,[e.prependAvatar&&t.createVNode(Jo,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&t.createVNode($l,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),t.createVNode("div",{class:"v-list-item__spacer"},null)]),t.createVNode("div",{class:"v-list-item__content","data-no-activator":""},[l&&t.createVNode(Sn,{key:"title"},{default:()=>[o.title?.({title:e.title})??e.title]}),n&&t.createVNode(wn,{key:"subtitle"},{default:()=>[o.subtitle?.({subtitle:e.subtitle})??e.subtitle]}),o.default?.(E.value)]),s&&t.createVNode("div",{key:"append",class:"v-list-item__append"},[o.append?t.createVNode(Ra,{key:"append-defaults",disabled:!i,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>[o.append?.(E.value)]}):t.createVNode(t.Fragment,null,[e.appendIcon&&t.createVNode($l,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&t.createVNode(Jo,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),t.createVNode("div",{class:"v-list-item__spacer"},null)])]}),[[t.resolveDirective("ripple"),y.value&&e.ripple]])})),{}}}),Cn=a({color:String,inset:Boolean,sticky:Boolean,title:String,...l(),...la()},"VListSubheader"),Nn=ut()({name:"VListSubheader",props:Cn(),setup(e,a){let{slots:l}=a
const{textColorClasses:o,textColorStyles:n}=Ua(t.toRef(e,"color"))
return kt((()=>{const a=!(!l.default&&!e.title)
return t.createVNode(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},o.value,e.class],style:[{textColorStyles:n},e.style]},{default:()=>[a&&t.createVNode("div",{class:"v-list-subheader__text"},[l.default?.()??e.title])]})})),{}}}),_n=a({color:String,inset:Boolean,length:[Number,String],thickness:[Number,String],vertical:Boolean,...l(),...Kt()},"VDivider"),In=ut()({name:"VDivider",props:_n(),setup(e,a){let{attrs:l}=a
const{themeClasses:o}=Zt(e),{textColorClasses:n,textColorStyles:r}=Ua(t.toRef(e,"color")),i=t.computed((()=>{const t={}
return e.length&&(t[e.vertical?"maxHeight":"maxWidth"]=g(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=g(e.thickness)),t}))
return kt((()=>t.createVNode("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},o.value,n.value,e.class],style:[i.value,r.value,e.style],"aria-orientation":l.role&&"separator"!==l.role?void 0:e.vertical?"vertical":"horizontal",role:`${l.role||"separator"}`},null))),{}}}),Bn=a({items:Array,returnObject:Boolean},"VListChildren"),Rn=ut()({name:"VListChildren",props:Bn(),setup(e,a){let{slots:l}=a
return nn(),()=>l.default?.()??e.items?.map((a=>{let{children:o,props:n,type:r,raw:i}=a
if("divider"===r)return l.divider?.({props:n})??t.createVNode(In,n,null)
if("subheader"===r)return l.subheader?.({props:n})??t.createVNode(Nn,n,null)
const s={subtitle:l.subtitle?e=>l.subtitle?.({...e,item:i}):void 0,prepend:l.prepend?e=>l.prepend?.({...e,item:i}):void 0,append:l.append?e=>l.append?.({...e,item:i}):void 0,title:l.title?e=>l.title?.({...e,item:i}):void 0},[u,c]=Vn.filterProps(n)
return o?t.createVNode(Vn,t.mergeProps({value:n?.value},u),{activator:a=>{let{props:o}=a
const r={...n,...o,value:e.returnObject?i:n.value}
return l.header?l.header({props:r}):t.createVNode(xn,r,s)},default:()=>t.createVNode(Rn,{items:o},l)}):l.item?l.item({props:n}):t.createVNode(xn,t.mergeProps(n,{value:e.returnObject?i:n.value}),s)}))}}),An=a({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean,valueComparator:{type:Function,default:v}},"list-items")
function En(e,t){const a=f(t,e.itemTitle,t),l=f(t,e.itemValue,a),o=f(t,e.itemChildren),n={title:a,value:l,...!0===e.itemProps?"object"!=typeof t||null==t||Array.isArray(t)?void 0:"children"in t?k(t,["children"])[1]:t:f(t,e.itemProps)}
return{title:String(n.title??""),value:n.value,props:n,children:Array.isArray(o)?Tn(e,o):void 0,raw:t}}function Tn(e,t){const a=[]
for(const l of t)a.push(En(e,l))
return a}function Pn(e){const a=t.computed((()=>Tn(e,e.items))),l=t.computed((()=>a.value.some((e=>null===e.value))))
return{items:a,transformIn:function(t){return l.value||(t=t.filter((e=>null!==e))),t.map((t=>e.returnObject&&"string"==typeof t?En(e,t):a.value.find((a=>e.valueComparator(t,a.value)))||En(e,t)))},transformOut:function(t){return e.returnObject?t.map((e=>{let{raw:t}=e
return t})):t.map((e=>{let{value:t}=e
return t}))}}}function $n(e,t){const a=f(t,e.itemType,"item"),l=function(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e}(t)?t:f(t,e.itemTitle),o=f(t,e.itemValue,void 0),n=f(t,e.itemChildren),r={title:l,value:o,...!0===e.itemProps?k(t,["children"])[1]:f(t,e.itemProps)}
return{type:a,title:r.title,value:r.value,props:r,children:"item"===a&&n?Ln(e,n):void 0,raw:t}}function Ln(e,t){const a=[]
for(const l of t)a.push($n(e,l))
return a}const Mn=a({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,lines:{type:[Boolean,String],default:"one"},nav:Boolean,...mn({selectStrategy:"single-leaf",openStrategy:"list"}),...za(),...l(),...ol(),...Aa(),...Ya(),itemType:{type:String,default:"type"},...An(),...Ka(),...la(),...Kt(),...sl({variant:"text"})},"VList"),Fn=ut()({name:"VList",props:Mn(),emits:{"update:selected":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:select":e=>!0},setup(e,a){let{slots:l}=a
const{items:o}=function(e){return{items:t.computed((()=>Ln(e,e.items)))}}(e),{themeClasses:n}=Zt(e),{backgroundColorClasses:r,backgroundColorStyles:i}=Wa(t.toRef(e,"bgColor")),{borderClasses:s}=ja(e),{densityClasses:u}=nl(e),{dimensionStyles:c}=Ea(e),{elevationClasses:d}=Ga(e),{roundedClasses:v}=qa(e),{open:p,select:f}=gn(e),m=t.computed((()=>e.lines?`v-list--${e.lines}-line`:void 0)),g=t.toRef(e,"activeColor"),h=t.toRef(e,"baseColor"),y=t.toRef(e,"color")
nn(),nt({VListGroup:{activeColor:g,baseColor:h,color:y},VListItem:{activeClass:t.toRef(e,"activeClass"),activeColor:g,baseColor:h,color:y,density:t.toRef(e,"density"),disabled:t.toRef(e,"disabled"),lines:t.toRef(e,"lines"),nav:t.toRef(e,"nav"),variant:t.toRef(e,"variant")}})
const b=t.shallowRef(!1),V=t.ref()
function w(e){b.value=!0}function S(e){b.value=!1}function k(e){b.value||e.relatedTarget&&V.value?.contains(e.relatedTarget)||C()}function x(e){if(V.value){if("ArrowDown"===e.key)C("next")
else if("ArrowUp"===e.key)C("prev")
else if("Home"===e.key)C("first")
else{if("End"!==e.key)return
C("last")}e.preventDefault()}}function C(e){if(V.value)return Z(V.value,e)}return kt((()=>t.createVNode(e.tag,{ref:V,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav},n.value,r.value,s.value,u.value,d.value,m.value,v.value,e.class],style:[i.value,c.value,e.style],tabindex:e.disabled||b.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:w,onFocusout:S,onFocus:k,onKeydown:x},{default:()=>[t.createVNode(Rn,{items:o.value,returnObject:e.returnObject},l)]}))),{open:p,select:f,focus:C}}}),Dn=ct("v-list-img"),On=a({start:Boolean,end:Boolean,...l(),...la()},"VListItemAction"),zn=ut()({name:"VListItemAction",props:On(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end},e.class],style:e.style},l))),{}}}),jn=a({start:Boolean,end:Boolean,...l(),...la()},"VListItemMedia"),Hn=ut()({name:"VListItemMedia",props:jn(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode(e.tag,{class:["v-list-item-media",{"v-list-item-media--start":e.start,"v-list-item-media--end":e.end},e.class],style:e.style},l))),{}}})
function Un(e,t){return{x:e.x+t.x,y:e.y+t.y}}function Wn(e,t){if("top"===e.side||"bottom"===e.side){const{side:a,align:l}=e
return Un({x:"left"===l?0:"center"===l?t.width/2:"right"===l?t.width:l,y:"top"===a?0:"bottom"===a?t.height:a},t)}if("left"===e.side||"right"===e.side){const{side:a,align:l}=e
return Un({x:"left"===a?0:"right"===a?t.width:a,y:"top"===l?0:"center"===l?t.height/2:"bottom"===l?t.height:l},t)}return Un({x:t.width/2,y:t.height/2},t)}const Yn={static:function(){},connected:function(e,a,l){(function(e){for(;e;){if("fixed"===window.getComputedStyle(e).position)return!0
e=e.offsetParent}return!1})(e.activatorEl.value)&&Object.assign(l.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0})
const{preferredAnchor:o,preferredOrigin:n}=H((()=>{const t=ae(a.location,e.isRtl.value),l="overlap"===a.origin?t:"auto"===a.origin?oe(t):ae(a.origin,e.isRtl.value)
return t.side===l.side&&t.align===ne(l).align?{preferredAnchor:re(t),preferredOrigin:re(l)}:{preferredAnchor:t,preferredOrigin:l}})),[r,i,s,u]=["minWidth","minHeight","maxWidth","maxHeight"].map((e=>t.computed((()=>{const t=parseFloat(a[e])
return isNaN(t)?1/0:t})))),c=t.computed((()=>{if(Array.isArray(a.offset))return a.offset
if("string"==typeof a.offset){const e=a.offset.split(" ").map(parseFloat)
return e.length<2&&e.push(0),e}return"number"==typeof a.offset?[a.offset,0]:[0,0]}))
let d=!1
const v=new ResizeObserver((()=>{d&&p()}))
function p(){if(d=!1,requestAnimationFrame((()=>{requestAnimationFrame((()=>d=!0))})),!e.activatorEl.value||!e.contentEl.value)return
const t=e.activatorEl.value.getBoundingClientRect(),a=function(e,t){t?e.style.removeProperty("left"):e.style.removeProperty("right")
const a=ce(e)
t?a.x+=parseFloat(e.style.right||0):a.x-=parseFloat(e.style.left||0)
return a.y-=parseFloat(e.style.top||0),a}(e.contentEl.value,e.isRtl.value),v=bt(e.contentEl.value)
v.length||(v.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(a.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),a.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)))
const p=v.reduce(((e,t)=>{const a=t.getBoundingClientRect(),l=new se({x:t===document.documentElement?0:a.x,y:t===document.documentElement?0:a.y,width:t.clientWidth,height:t.clientHeight})
return e?new se({x:Math.max(e.left,l.left),y:Math.max(e.top,l.top),width:Math.min(e.right,l.right)-Math.max(e.left,l.left),height:Math.min(e.bottom,l.bottom)-Math.max(e.top,l.top)}):l}),void 0)
p.x+=12,p.y+=12,p.width-=24,p.height-=24
let f={anchor:o.value,origin:n.value}
function m(e){const l=new se(a),o=Wn(e.anchor,t),n=Wn(e.origin,l)
let{x:r,y:i}=(v=n,{x:(d=o).x-v.x,y:d.y-v.y})
var d,v
switch(e.anchor.side){case"top":i-=c.value[0]
break
case"bottom":i+=c.value[0]
break
case"left":r-=c.value[0]
break
case"right":r+=c.value[0]}switch(e.anchor.align){case"top":i-=c.value[1]
break
case"bottom":i+=c.value[1]
break
case"left":r-=c.value[1]
break
case"right":r+=c.value[1]}l.x+=r,l.y+=i,l.width=Math.min(l.width,s.value),l.height=Math.min(l.height,u.value)
return{overflows:ue(l,p),x:r,y:i}}let h=0,y=0
const b={x:0,y:0},V={x:!1,y:!1}
let w=-1
for(;;){if(w++>10){xe("Infinite loop detected in connectedLocationStrategy")
break}const{x:e,y:t,overflows:l}=m(f)
h+=e,y+=t,a.x+=e,a.y+=t
{const e=ie(f.anchor),t=l.x.before||l.x.after,a=l.y.before||l.y.after
let o=!1
if(["x","y"].forEach((n=>{if("x"===n&&t&&!V.x||"y"===n&&a&&!V.y){const t={anchor:{...f.anchor},origin:{...f.origin}},a="x"===n?"y"===e?ne:oe:"y"===e?oe:ne
t.anchor=a(t.anchor),t.origin=a(t.origin)
const{overflows:r}=m(t);(r[n].before<=l[n].before&&r[n].after<=l[n].after||r[n].before+r[n].after<(l[n].before+l[n].after)/2)&&(f=t,o=V[n]=!0)}})),o)continue}l.x.before&&(h+=l.x.before,a.x+=l.x.before),l.x.after&&(h-=l.x.after,a.x-=l.x.after),l.y.before&&(y+=l.y.before,a.y+=l.y.before),l.y.after&&(y-=l.y.after,a.y-=l.y.after)
{const e=ue(a,p)
b.x=p.width-e.x.before-e.x.after,b.y=p.height-e.y.before-e.y.after,h+=e.x.before,a.x+=e.x.before,y+=e.y.before,a.y+=e.y.before}break}const S=ie(f.anchor)
return Object.assign(l.value,{"--v-overlay-anchor-origin":`${f.anchor.side} ${f.anchor.align}`,transformOrigin:`${f.origin.side} ${f.origin.align}`,top:g(Kn(y)),left:e.isRtl.value?void 0:g(Kn(h)),right:e.isRtl.value?g(Kn(-h)):void 0,minWidth:g("y"===S?Math.min(r.value,t.width):r.value),maxWidth:g(qn(A(b.x,r.value===1/0?0:r.value,s.value))),maxHeight:g(qn(A(b.y,i.value===1/0?0:i.value,u.value)))}),{available:b,contentBox:a}}return t.watch([e.activatorEl,e.contentEl],((e,t)=>{let[a,l]=e,[o,n]=t
o&&v.unobserve(o),a&&v.observe(a),n&&v.unobserve(n),l&&v.observe(l)}),{immediate:!0}),t.onScopeDispose((()=>{v.disconnect()})),t.watch((()=>[o.value,n.value,a.offset,a.minWidth,a.minHeight,a.maxWidth,a.maxHeight]),(()=>p())),t.nextTick((()=>{const e=p()
if(!e)return
const{available:t,contentBox:a}=e
a.height>t.y&&requestAnimationFrame((()=>{p(),requestAnimationFrame((()=>{p()}))}))})),{updateLocation:p}}},Gn=a({locationStrategy:{type:[String,Function],default:"static",validator:e=>"function"==typeof e||e in Yn},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies")
function Kn(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function qn(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let Xn=!0
const Zn=[]
let Jn=-1
function Qn(){cancelAnimationFrame(Jn),Jn=requestAnimationFrame((()=>{const e=Zn.shift()
e&&e(),Zn.length?Qn():Xn=!0}))}const er={none:null,close:function(e){ar(e.activatorEl.value??e.contentEl.value,(function(t){e.isActive.value=!1}))},block:function(e,a){const l=e.root.value?.offsetParent,o=[...new Set([...bt(e.activatorEl.value,a.contained?l:void 0),...bt(e.contentEl.value,a.contained?l:void 0)])].filter((e=>!e.classList.contains("v-overlay-scroll-blocked"))),n=window.innerWidth-document.documentElement.offsetWidth,r=(i=l||document.documentElement,Vt(i)&&i)
var i
r&&e.root.value.classList.add("v-overlay--scroll-blocked")
o.forEach(((e,t)=>{e.style.setProperty("--v-body-scroll-x",g(-e.scrollLeft)),e.style.setProperty("--v-body-scroll-y",g(-e.scrollTop)),e!==document.documentElement&&e.style.setProperty("--v-scrollbar-offset",g(n)),e.classList.add("v-overlay-scroll-blocked")})),t.onScopeDispose((()=>{o.forEach(((e,t)=>{const a=parseFloat(e.style.getPropertyValue("--v-body-scroll-x")),l=parseFloat(e.style.getPropertyValue("--v-body-scroll-y"))
e.style.removeProperty("--v-body-scroll-x"),e.style.removeProperty("--v-body-scroll-y"),e.style.removeProperty("--v-scrollbar-offset"),e.classList.remove("v-overlay-scroll-blocked"),e.scrollLeft=-a,e.scrollTop=-l})),r&&e.root.value.classList.remove("v-overlay--scroll-blocked")}))},reposition:function(e,a,l){let o=!1,n=-1,r=-1
function i(t){var a
a=()=>{const a=performance.now()
e.updateLocation.value?.(t)
const l=performance.now()-a
o=l/(1e3/60)>2},!Xn||Zn.length?(Zn.push(a),Qn()):(Xn=!1,a(),Qn())}r=("undefined"==typeof requestIdleCallback?e=>e():requestIdleCallback)((()=>{l.run((()=>{ar(e.activatorEl.value??e.contentEl.value,(e=>{o?(cancelAnimationFrame(n),n=requestAnimationFrame((()=>{n=requestAnimationFrame((()=>{i(e)}))}))):i(e)}))}))})),t.onScopeDispose((()=>{"undefined"!=typeof cancelIdleCallback&&cancelIdleCallback(r),cancelAnimationFrame(n)}))}},tr=a({scrollStrategy:{type:[String,Function],default:"block",validator:e=>"function"==typeof e||e in er}},"VOverlay-scroll-strategies")
function ar(e,a){const l=[document,...bt(e)]
l.forEach((e=>{e.addEventListener("scroll",a,{passive:!0})})),t.onScopeDispose((()=>{l.forEach((e=>{e.removeEventListener("scroll",a)}))}))}const lr=Symbol.for("vuetify:v-menu"),or=a({closeDelay:[Number,String],openDelay:[Number,String]},"delay")
function nr(e,t){const a={},l=l=>()=>{if(!o)return Promise.resolve(!0)
const n="openDelay"===l
return a.closeDelay&&window.clearTimeout(a.closeDelay),delete a.closeDelay,a.openDelay&&window.clearTimeout(a.openDelay),delete a.openDelay,new Promise((o=>{const r=parseInt(e[l]??0,10)
a[l]=window.setTimeout((()=>{t?.(n),o(n)}),r)}))}
return{runCloseDelay:l("closeDelay"),runOpenDelay:l("openDelay")}}const rr=a({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...or()},"VOverlay-activator")
function ir(e,a){let{isActive:l,isTop:n}=a
const r=t.ref()
let i=!1,s=!1,u=!0
const c=t.computed((()=>e.openOnFocus||null==e.openOnFocus&&e.openOnHover)),d=t.computed((()=>e.openOnClick||null==e.openOnClick&&!e.openOnHover&&!c.value)),{runOpenDelay:v,runCloseDelay:p}=nr(e,(t=>{t!==(e.openOnHover&&i||c.value&&s)||e.openOnHover&&l.value&&!n.value||(l.value!==t&&(u=!0),l.value=t)})),f=e=>{e.stopPropagation(),r.value=e.currentTarget||e.target,l.value=!l.value},m=e=>{e.sourceCapabilities?.firesTouchEvents||(i=!0,r.value=e.currentTarget||e.target,v())},g=e=>{i=!1,p()},h=e=>{!1!==Q(e.target,":focus-visible")&&(s=!0,e.stopPropagation(),r.value=e.currentTarget||e.target,v())},b=e=>{s=!1,e.stopPropagation(),p()},V=t.computed((()=>{const t={}
return d.value&&(t.onClick=f),e.openOnHover&&(t.onMouseenter=m,t.onMouseleave=g),c.value&&(t.onFocus=h,t.onBlur=b),t})),w=t.computed((()=>{const a={}
if(e.openOnHover&&(a.onMouseenter=()=>{i=!0,v()},a.onMouseleave=()=>{i=!1,p()}),c.value&&(a.onFocusin=()=>{s=!0,v()},a.onFocusout=()=>{s=!1,p()}),e.closeOnContentClick){const e=t.inject(lr,null)
a.onClick=()=>{l.value=!1,e?.closeParents()}}return a})),S=t.computed((()=>{const t={}
return e.openOnHover&&(t.onMouseenter=()=>{u&&(i=!0,u=!1,v())},t.onMouseleave=()=>{i=!1,p()}),t}))
t.watch(n,(t=>{!t||(!e.openOnHover||i||c.value&&s)&&(!c.value||s||e.openOnHover&&i)||(l.value=!1)}))
const k=t.ref()
t.watchEffect((()=>{k.value&&t.nextTick((()=>{r.value=y(k.value)}))}))
const x=pt("useActivator")
let C
return t.watch((()=>!!e.activator),(a=>{a&&o?(C=t.effectScope(),C.run((()=>{!function(e,a,l){let{activatorEl:o,activatorEvents:n}=l
function r(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s(),l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.activatorProps
a&&pe(a,t.mergeProps(n.value,l))}function i(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s(),l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.activatorProps
a&&fe(a,t.mergeProps(n.value,l))}function s(){let t,l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.activator
if(l)if("parent"===l){let e=a?.proxy?.$el?.parentNode
for(;e?.hasAttribute("data-no-activator");)e=e.parentNode
t=e}else t="string"==typeof l?document.querySelector(l):"$el"in l?l.$el:l
return o.value=t?.nodeType===Node.ELEMENT_NODE?t:null,o.value}t.watch((()=>e.activator),((e,a)=>{if(a&&e!==a){const e=s(a)
e&&i(e)}e&&t.nextTick((()=>r()))}),{immediate:!0}),t.watch((()=>e.activatorProps),(()=>{r()})),t.onScopeDispose((()=>{i()}))}(e,x,{activatorEl:r,activatorEvents:V})}))):C&&C.stop()}),{flush:"post",immediate:!0}),t.onScopeDispose((()=>{C?.stop()})),{activatorEl:r,activatorRef:k,activatorEvents:V,contentEvents:w,scrimEvents:S}}const sr=["sm","md","lg","xl","xxl"],ur=Symbol.for("vuetify:display"),cr={mobileBreakpoint:"lg",thresholds:{xs:0,sm:600,md:960,lg:1280,xl:1920,xxl:2560}}
function dr(e){return o&&!e?window.innerWidth:"object"==typeof e&&e.clientWidth||0}function vr(e){return o&&!e?window.innerHeight:"object"==typeof e&&e.clientHeight||0}function pr(e){const t=o&&!e?window.navigator.userAgent:"ssr"
function a(e){return Boolean(t.match(e))}return{android:a(/android/i),ios:a(/iphone|ipad|ipod/i),cordova:a(/cordova/i),electron:a(/electron/i),chrome:a(/chrome/i),edge:a(/edge/i),firefox:a(/firefox/i),opera:a(/opera/i),win:a(/win/i),mac:a(/mac/i),linux:a(/linux/i),touch:r,ssr:"ssr"===t}}function fr(e,a){const{thresholds:l,mobileBreakpoint:n}=function(){return L(cr,arguments.length>0&&void 0!==arguments[0]?arguments[0]:cr)}(e),r=t.shallowRef(vr(a)),i=t.shallowRef(pr(a)),s=t.reactive({}),u=t.shallowRef(dr(a))
function c(){r.value=vr(),u.value=dr()}return t.watchEffect((()=>{const e=u.value<l.sm,t=u.value<l.md&&!e,a=u.value<l.lg&&!(t||e),o=u.value<l.xl&&!(a||t||e),c=u.value<l.xxl&&!(o||a||t||e),d=u.value>=l.xxl,v=e?"xs":t?"sm":a?"md":o?"lg":c?"xl":"xxl",p="number"==typeof n?n:l[n],f=u.value<p
s.xs=e,s.sm=t,s.md=a,s.lg=o,s.xl=c,s.xxl=d,s.smAndUp=!e,s.mdAndUp=!(e||t),s.lgAndUp=!(e||t||a),s.xlAndUp=!(e||t||a||o),s.smAndDown=!(a||o||c||d),s.mdAndDown=!(o||c||d),s.lgAndDown=!(c||d),s.xlAndDown=!d,s.name=v,s.height=r.value,s.width=u.value,s.mobile=f,s.mobileBreakpoint=n,s.platform=i.value,s.thresholds=l})),o&&window.addEventListener("resize",c,{passive:!0}),{...t.toRefs(s),update:function(){c(),i.value=pr()},ssr:!!a}}function mr(){const e=t.inject(ur)
if(!e)throw new Error("Could not find Vuetify display injection")
return e}function gr(){if(!o)return t.shallowRef(!1)
const{ssr:e}=mr()
if(e){const e=t.shallowRef(!1)
return t.onMounted((()=>{e.value=!0})),e}return t.shallowRef(!0)}const hr=a({eager:Boolean},"lazy")
function yr(e,a){const l=t.shallowRef(!1),o=t.computed((()=>l.value||e.eager||a.value))
return t.watch(a,(()=>l.value=!0)),{isBooted:l,hasContent:o,onAfterLeave:function(){e.eager||(l.value=!1)}}}function br(){const e=pt("useScopeId").vnode.scopeId
return{scopeId:e?{[e]:""}:void 0}}const Vr=Symbol.for("vuetify:stack"),wr=t.reactive([])
function Sr(){return!0}function kr(e,t,a){if(!e||!1===xr(e,a))return!1
const l=dt(t)
if("undefined"!=typeof ShadowRoot&&l instanceof ShadowRoot&&l.host===e.target)return!1
const o=("object"==typeof a.value&&a.value.include||(()=>[]))()
return o.push(t),!o.some((t=>t?.contains(e.target)))}function xr(e,t){return("object"==typeof t.value&&t.value.closeConditional||Sr)(e)}function Cr(e,t){const a=dt(e)
t(document),"undefined"!=typeof ShadowRoot&&a instanceof ShadowRoot&&t(a)}const Nr={mounted(e,t){const a=a=>function(e,t,a){const l="function"==typeof a.value?a.value:a.value.handler
t._clickOutside.lastMousedownWasOutside&&kr(e,t,a)&&setTimeout((()=>{xr(e,a)&&l&&l(e)}),0)}(a,e,t),l=a=>{e._clickOutside.lastMousedownWasOutside=kr(a,e,t)}
Cr(e,(e=>{e.addEventListener("click",a,!0),e.addEventListener("mousedown",l,!0)})),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[t.instance.$.uid]={onClick:a,onMousedown:l}},unmounted(e,t){e._clickOutside&&(Cr(e,(a=>{if(!a||!e._clickOutside?.[t.instance.$.uid])return
const{onClick:l,onMousedown:o}=e._clickOutside[t.instance.$.uid]
a.removeEventListener("click",l,!0),a.removeEventListener("mousedown",o,!0)})),delete e._clickOutside[t.instance.$.uid])}}
function _r(e){const{modelValue:a,color:l,...o}=e
return t.createVNode(t.Transition,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&t.createVNode("div",t.mergeProps({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const Ir=a({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...rr(),...l(),...Aa(),...hr(),...Gn(),...tr(),...Kt(),...$a()},"VOverlay"),Br=ut()({name:"VOverlay",directives:{ClickOutside:Nr},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...Ir()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,a){let{slots:l,attrs:n,emit:r}=a
const i=$t(e,"modelValue"),s=t.computed({get:()=>i.value,set:t=>{t&&e.disabled||(i.value=t)}}),{teleportTarget:u}=(c=t.computed((()=>e.attach||e.contained)),{teleportTarget:t.computed((()=>{const e=c.value
if(!0===e||!o)return
const a=!1===e?document.body:"string"==typeof e?document.querySelector(e):e
if(null==a)return void t.warn(`Unable to locate target ${e}`)
let l=a.querySelector(":scope > .v-overlay-container")
return l||(l=document.createElement("div"),l.className="v-overlay-container",a.appendChild(l)),l}))})
var c
const{themeClasses:d}=Zt(e),{rtlClasses:v,isRtl:p}=Yt(),{hasContent:f,onAfterLeave:m}=yr(e,s),h=Wa(t.computed((()=>"string"==typeof e.scrim?e.scrim:null))),{globalTop:y,localTop:b,stackStyles:V}=function(e,a,l){const o=pt("useStack"),n=!l,r=t.inject(Vr,void 0),i=t.reactive({activeChildren:new Set})
t.provide(Vr,i)
const s=t.shallowRef(+a.value)
Pt(e,(()=>{const e=wr.at(-1)?.[1]
s.value=e?e+10:+a.value,n&&wr.push([o.uid,s.value]),r?.activeChildren.add(o.uid),t.onScopeDispose((()=>{if(n){const e=t.toRaw(wr).findIndex((e=>e[0]===o.uid))
wr.splice(e,1)}r?.activeChildren.delete(o.uid)}))}))
const u=t.shallowRef(!0)
n&&t.watchEffect((()=>{const e=wr.at(-1)?.[0]===o.uid
setTimeout((()=>u.value=e))}))
const c=t.computed((()=>!i.activeChildren.size))
return{globalTop:t.readonly(u),localTop:c,stackStyles:t.computed((()=>({zIndex:s.value})))}}(s,t.toRef(e,"zIndex"),e._disableGlobalStack),{activatorEl:w,activatorRef:S,activatorEvents:k,contentEvents:x,scrimEvents:C}=ir(e,{isActive:s,isTop:b}),{dimensionStyles:N}=Ea(e),_=gr(),{scopeId:I}=br()
t.watch((()=>e.disabled),(e=>{e&&(s.value=!1)}))
const B=t.ref(),R=t.ref(),{contentStyles:A,updateLocation:E}=function(e,a){const l=t.ref({}),n=t.ref()
function r(e){n.value?.(e)}return o&&(Pt((()=>!(!a.isActive.value||!e.locationStrategy)),(o=>{t.watch((()=>e.locationStrategy),o),t.onScopeDispose((()=>{n.value=void 0})),"function"==typeof e.locationStrategy?n.value=e.locationStrategy(a,e,l)?.updateLocation:n.value=Yn[e.locationStrategy](a,e,l)?.updateLocation})),window.addEventListener("resize",r,{passive:!0}),t.onScopeDispose((()=>{window.removeEventListener("resize",r),n.value=void 0}))),{contentStyles:l,updateLocation:n}}(e,{isRtl:p,contentEl:R,activatorEl:w,isActive:s})
function T(t){r("click:outside",t),e.persistent?F():s.value=!1}function P(){return s.value&&y.value}function $(t){"Escape"===t.key&&y.value&&(e.persistent?F():(s.value=!1,R.value?.contains(document.activeElement)&&w.value?.focus()))}!function(e,a){if(!o)return
let l
t.watchEffect((async()=>{l?.stop(),a.isActive.value&&e.scrollStrategy&&(l=t.effectScope(),await t.nextTick(),l.active&&l.run((()=>{"function"==typeof e.scrollStrategy?e.scrollStrategy(a,e,l):er[e.scrollStrategy]?.(a,e,l)})))})),t.onScopeDispose((()=>{l?.stop()}))}(e,{root:B,contentEl:R,activatorEl:w,isActive:s,updateLocation:E}),o&&t.watch(s,(e=>{e?window.addEventListener("keydown",$):window.removeEventListener("keydown",$)}),{immediate:!0})
const L=Xl()
Pt((()=>e.closeOnBack),(()=>{!function(e,a){let l,n,r=!1
function i(e){e.state?.replaced||(r=!0,setTimeout((()=>r=!1)))}o&&(t.nextTick((()=>{window.addEventListener("popstate",i),l=e?.beforeEach(((e,t,l)=>{Ql?r?a(l):l():setTimeout((()=>r?a(l):l())),Ql=!0})),n=e?.afterEach((()=>{Ql=!1}))})),t.onScopeDispose((()=>{window.removeEventListener("popstate",i),l?.(),n?.()})))}(L,(t=>{y.value&&s.value?(t(!1),e.persistent?F():s.value=!1):t()}))}))
const M=t.ref()
function F(){e.noClickAnimation||R.value&&de(R.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:vt})}return t.watch((()=>s.value&&(e.absolute||e.contained)&&null==u.value),(e=>{if(e){const e=yt(B.value)
e&&e!==document.scrollingElement&&(M.value=e.scrollTop)}})),kt((()=>t.createVNode(t.Fragment,null,[l.activator?.({isActive:s.value,props:t.mergeProps({ref:S},k.value,e.activatorProps)}),_.value&&f.value&&t.createVNode(t.Teleport,{disabled:!u.value,to:u.value},{default:()=>[t.createVNode("div",t.mergeProps({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":s.value,"v-overlay--contained":e.contained},d.value,v.value,e.class],style:[V.value,{top:g(M.value)},e.style],ref:B},I,n),[t.createVNode(_r,t.mergeProps({color:h,modelValue:s.value&&!!e.scrim},C.value),null),t.createVNode(La,{appear:!0,persisted:!0,transition:e.transition,target:w.value,onAfterLeave:()=>{m(),r("afterLeave")}},{default:()=>[t.withDirectives(t.createVNode("div",t.mergeProps({ref:R,class:["v-overlay__content",e.contentClass],style:[N.value,A.value]},x.value,e.contentProps),[l.default?.({isActive:s})]),[[t.vShow,s.value],[t.resolveDirective("click-outside"),{handler:T,closeConditional:P,include:()=>[w.value]}]])]})])]})]))),{activatorEl:w,animateClick:F,contentEl:R,globalTop:y,localTop:b,updateLocation:E}}}),Rr=Symbol("Forwarded refs")
function Ar(e,t){let a=e
for(;a;){const e=Reflect.getOwnPropertyDescriptor(a,t)
if(e)return e
a=Object.getPrototypeOf(a)}}function Er(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),l=1;l<t;l++)a[l-1]=arguments[l]
return e[Rr]=a,new Proxy(e,{get(e,t){if(Reflect.has(e,t))return Reflect.get(e,t)
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
const a=Ar(e.value,t)??("_"in e.value?Ar(e.value._?.setupState,t):void 0)
if(a)return a}for(const e of a){const a=e.value&&e.value[Rr]
if(!a)continue
const l=a.slice()
for(;l.length;){const e=l.shift(),a=Ar(e.value,t)
if(a)return a
const o=e.value&&e.value[Rr]
o&&l.push(...o)}}}}})}const Tr=a({id:String,...x(Ir({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:da}}),["absolute"])},"VMenu"),Pr=ut()({name:"VMenu",props:Tr(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"modelValue"),{scopeId:n}=br(),r=ht(),i=t.computed((()=>e.id||`v-menu-${r}`)),s=t.ref(),u=t.inject(lr,null),c=t.shallowRef(0)
async function d(e){const a=e.relatedTarget,l=e.target
if(await t.nextTick(),o.value&&a!==l&&s.value?.contentEl&&s.value?.globalTop&&![document,s.value.contentEl].includes(l)&&!s.value.contentEl.contains(l)){q(s.value.contentEl)[0]?.focus()}}function v(){u?.closeParents()}function p(t){if(!e.disabled&&"Tab"===t.key){X(q(s.value?.contentEl,!1),t.shiftKey?"prev":"next",(e=>e.tabIndex>=0))||(o.value=!1,s.value?.activatorEl?.focus())}}function f(t){if(e.disabled)return
const a=s.value?.contentEl
a&&o.value?"ArrowDown"===t.key?(t.preventDefault(),Z(a,"next")):"ArrowUp"===t.key&&(t.preventDefault(),Z(a,"prev")):["ArrowDown","ArrowUp"].includes(t.key)&&(o.value=!0,t.preventDefault(),setTimeout((()=>setTimeout((()=>f(t))))))}t.provide(lr,{register(){++c.value},unregister(){--c.value},closeParents(){setTimeout((()=>{c.value||(o.value=!1,u?.closeParents())}),40)}}),t.watch(o,(e=>{e?(u?.register(),document.addEventListener("focusin",d,{once:!0})):(u?.unregister(),document.removeEventListener("focusin",d))}))
const m=t.computed((()=>t.mergeProps({"aria-haspopup":"menu","aria-expanded":String(o.value),"aria-owns":i.value,onKeydown:f},e.activatorProps)))
return kt((()=>{const[a]=Br.filterProps(e)
return t.createVNode(Br,t.mergeProps({ref:s,class:["v-menu",e.class],style:e.style},a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,absolute:!0,activatorProps:m.value,"onClick:outside":v,onKeydown:p},n),{activator:l.activator,default:function(){for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o]
return t.createVNode(Ra,{root:"VMenu"},{default:()=>[l.default?.(...a)]})}})})),Er({id:i,ΨopenChildren:c},s)}}),$r=a({active:Boolean,max:[Number,String],value:{type:[Number,String],default:0},...l(),...$a({transition:{component:Ca}})},"VCounter"),Lr=ut()({name:"VCounter",functional:!0,props:$r(),setup(e,a){let{slots:l}=a
const o=t.computed((()=>e.max?`${e.value} / ${e.max}`:String(e.value)))
return kt((()=>t.createVNode(La,{transition:e.transition},{default:()=>[t.withDirectives(t.createVNode("div",{class:["v-counter",e.class],style:e.style},[l.default?l.default({counter:o.value,max:e.max,value:e.value}):o.value]),[[t.vShow,e.active]])]}))),{}}}),Mr=a({floating:Boolean,...l()},"VFieldLabel"),Fr=ut()({name:"VFieldLabel",props:Mr(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode(Io,{class:["v-field-label",{"v-field-label--floating":e.floating},e.class],style:e.style,"aria-hidden":e.floating||void 0},l))),{}}}),Dr=["underlined","outlined","filled","solo","solo-inverted","solo-filled","plain"],Or=a({appendInnerIcon:Sl,bgColor:String,clearable:Boolean,clearIcon:{type:Sl,default:"$clear"},active:Boolean,centerAffix:{type:Boolean,default:void 0},color:String,baseColor:String,dirty:Boolean,disabled:{type:Boolean,default:null},error:Boolean,flat:Boolean,label:String,persistentClear:Boolean,prependInnerIcon:Sl,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:"filled",validator:e=>Dr.includes(e)},"onClick:clear":Y(),"onClick:appendInner":Y(),"onClick:prependInner":Y(),...l(),...Ul(),...Ka(),...Kt()},"VField"),zr=ut()({name:"VField",inheritAttrs:!1,props:{id:String,...Oo(),...Or()},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{themeClasses:r}=Zt(e),{loaderClasses:i}=Wl(e),{focusClasses:s,isFocused:u,focus:c,blur:d}=zo(e),{InputIcon:v}=Mo(e),{roundedClasses:p}=qa(e),{rtlClasses:f}=Yt(),m=t.computed((()=>e.dirty||e.active)),h=t.computed((()=>!(e.singleLine||!e.label&&!n.label))),y=ht(),b=t.computed((()=>e.id||`input-${y}`)),V=t.computed((()=>`${b.value}-messages`)),w=t.ref(),S=t.ref(),k=t.ref(),x=t.computed((()=>["plain","underlined"].includes(e.variant))),{backgroundColorClasses:C,backgroundColorStyles:N}=Wa(t.toRef(e,"bgColor")),{textColorClasses:_,textColorStyles:I}=Ua(t.computed((()=>e.error||e.disabled?void 0:m.value&&u.value?e.color:e.baseColor)))
t.watch(m,(e=>{if(h.value){const t=w.value.$el,a=S.value.$el
requestAnimationFrame((()=>{const l=ce(t),o=a.getBoundingClientRect(),n=o.x-l.x,r=o.y-l.y-(l.height/2-o.height/2),i=o.width/.75,s=Math.abs(i-l.width)>1?{maxWidth:g(i)}:void 0,u=getComputedStyle(t),c=getComputedStyle(a),d=1e3*parseFloat(u.transitionDuration)||150,v=parseFloat(c.getPropertyValue("--v-field-label-scale")),p=c.getPropertyValue("color")
t.style.visibility="visible",a.style.visibility="hidden",de(t,{transform:`translate(${n}px, ${r}px) scale(${v})`,color:p,...s},{duration:d,easing:vt,direction:e?"normal":"reverse"}).finished.then((()=>{t.style.removeProperty("visibility"),a.style.removeProperty("visibility")}))}))}}),{flush:"post"})
const B=t.computed((()=>({isActive:m,isFocused:u,controlRef:k,blur:d,focus:c})))
function R(e){e.target!==document.activeElement&&e.preventDefault()}return kt((()=>{const a="outlined"===e.variant,o=n["prepend-inner"]||e.prependInnerIcon,u=!(!e.clearable&&!n.clear),g=!!(n["append-inner"]||e.appendInnerIcon||u),y=n.label?n.label({...B.value,label:e.label,props:{for:b.value}}):e.label
return t.createVNode("div",t.mergeProps({class:["v-field",{"v-field--active":m.value,"v-field--appended":g,"v-field--center-affix":e.centerAffix??!x.value,"v-field--disabled":e.disabled,"v-field--dirty":e.dirty,"v-field--error":e.error,"v-field--flat":e.flat,"v-field--has-background":!!e.bgColor,"v-field--persistent-clear":e.persistentClear,"v-field--prepended":o,"v-field--reverse":e.reverse,"v-field--single-line":e.singleLine,"v-field--no-label":!y,[`v-field--variant-${e.variant}`]:!0},r.value,C.value,s.value,i.value,p.value,f.value,e.class],style:[N.value,e.style],onClick:R},l),[t.createVNode("div",{class:"v-field__overlay"},null),t.createVNode(Yl,{name:"v-field",active:!!e.loading,color:e.error?"error":"string"==typeof e.loading?e.loading:e.color},{default:n.loader}),o&&t.createVNode("div",{key:"prepend",class:"v-field__prepend-inner"},[e.prependInnerIcon&&t.createVNode(v,{key:"prepend-icon",name:"prependInner"},null),n["prepend-inner"]?.(B.value)]),t.createVNode("div",{class:"v-field__field","data-no-activator":""},[["filled","solo","solo-inverted","solo-filled"].includes(e.variant)&&h.value&&t.createVNode(Fr,{key:"floating-label",ref:S,class:[_.value],floating:!0,for:b.value,style:I.value},{default:()=>[y]}),t.createVNode(Fr,{ref:w,for:b.value},{default:()=>[y]}),n.default?.({...B.value,props:{id:b.value,class:"v-field__input","aria-describedby":V.value},focus:c,blur:d})]),u&&t.createVNode(Ia,{key:"clear"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-field__clearable",onMousedown:e=>{e.preventDefault(),e.stopPropagation()}},[n.clear?n.clear():t.createVNode(v,{name:"clear"},null)]),[[t.vShow,e.dirty]])]}),g&&t.createVNode("div",{key:"append",class:"v-field__append-inner"},[n["append-inner"]?.(B.value),e.appendInnerIcon&&t.createVNode(v,{key:"append-icon",name:"appendInner"},null)]),t.createVNode("div",{class:["v-field__outline",_.value],style:I.value},[a&&t.createVNode(t.Fragment,null,[t.createVNode("div",{class:"v-field__outline__start"},null),h.value&&t.createVNode("div",{class:"v-field__outline__notch"},[t.createVNode(Fr,{ref:S,floating:!0,for:b.value},{default:()=>[y]})]),t.createVNode("div",{class:"v-field__outline__end"},null)]),x.value&&h.value&&t.createVNode(Fr,{ref:S,floating:!0,for:b.value},{default:()=>[y]})])])})),{controlRef:k}}})
function jr(e){return k(e,Object.keys(zr.props).filter((e=>!N(e)&&"class"!==e&&"style"!==e)))}const Hr=["color","file","time","date","datetime-local","week","month"],Ur=a({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:[Number,Function],prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,role:String,type:{type:String,default:"text"},modelModifiers:Object,...Go(),...Or()},"VTextField"),Wr=ut()({name:"VTextField",directives:{Intersect:Fa},inheritAttrs:!1,props:Ur(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const r=$t(e,"modelValue"),{isFocused:i,focus:s,blur:u}=zo(e),c=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(r.value):"number"==typeof e.counterValue?e.counterValue:(r.value??"").toString().length)),d=t.computed((()=>l.maxlength?l.maxlength:!e.counter||"number"!=typeof e.counter&&"string"!=typeof e.counter?void 0:e.counter)),v=t.computed((()=>["plain","underlined"].includes(e.variant)))
function p(t,a){e.autofocus&&t&&a[0].target?.focus?.()}const f=t.ref(),m=t.ref(),g=t.ref(),h=t.computed((()=>Hr.includes(e.type)||e.persistentPlaceholder||i.value||e.active))
function y(){g.value!==document.activeElement&&g.value?.focus(),i.value||s()}function b(e){o("mousedown:control",e),e.target!==g.value&&(y(),e.preventDefault())}function V(e){y(),o("click:control",e)}function w(a){a.stopPropagation(),y(),t.nextTick((()=>{r.value=null,K(e["onClick:clear"],a)}))}function S(a){const l=a.target
if(r.value=l.value,e.modelModifiers?.trim&&["text","search","password","tel","url"].includes(e.type)){const e=[l.selectionStart,l.selectionEnd]
t.nextTick((()=>{l.selectionStart=e[0],l.selectionEnd=e[1]}))}}return kt((()=>{const a=!!(n.counter||!1!==e.counter&&null!=e.counter),o=!(!a&&!n.details),[s,k]=B(l),[{modelValue:x,...C}]=Ko.filterProps(e),[N]=jr(e)
return t.createVNode(Ko,t.mergeProps({ref:f,modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-text-field--plain-underlined":["plain","underlined"].includes(e.variant)},e.class],style:e.style},s,C,{centerAffix:!v.value,focused:i.value}),{...n,default:a=>{let{id:l,isDisabled:o,isDirty:s,isReadonly:c,isValid:d}=a
return t.createVNode(zr,t.mergeProps({ref:m,onMousedown:b,onClick:V,"onClick:clear":w,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:e.role},N,{id:l.value,active:h.value||s.value,dirty:s.value||e.dirty,disabled:o.value,focused:i.value,error:!1===d.value}),{...n,default:a=>{let{props:{class:l,...i}}=a
const s=t.withDirectives(t.createVNode("input",t.mergeProps({ref:g,value:r.value,onInput:S,autofocus:e.autofocus,readonly:c.value,disabled:o.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:y,onBlur:u},i,k),null),[[t.resolveDirective("intersect"),{handler:p},null,{once:!0}]])
return t.createVNode(t.Fragment,null,[e.prefix&&t.createVNode("span",{class:"v-text-field__prefix"},[t.createVNode("span",{class:"v-text-field__prefix__text"},[e.prefix])]),n.default?t.createVNode("div",{class:l,"data-no-activator":""},[n.default(),s]):t.cloneVNode(s,{class:l}),e.suffix&&t.createVNode("span",{class:"v-text-field__suffix"},[t.createVNode("span",{class:"v-text-field__suffix__text"},[e.suffix])])])}})},details:o?l=>t.createVNode(t.Fragment,null,[n.details?.(l),a&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(Lr,{active:e.persistentCounter||i.value,value:c.value,max:d.value},n.counter)])]):void 0})})),Er({},f,m,g)}}),Yr=a({renderless:Boolean,...l()},"VVirtualScrollItem"),Gr=ut()({name:"VVirtualScrollItem",inheritAttrs:!1,props:Yr(),emits:{"update:height":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{resizeRef:r,contentRect:i}=xt(void 0,"border")
t.watch((()=>i.value?.height),(e=>{null!=e&&o("update:height",e)})),kt((()=>e.renderless?t.createVNode(t.Fragment,null,[n.default?.({itemRef:r})]):t.createVNode("div",t.mergeProps({ref:r,class:["v-virtual-scroll__item",e.class],style:e.style},l),[n.default?.()])))}}),Kr=a({itemHeight:{type:[Number,String],default:48}},"virtual")
function qr(e,a,l){const o=t.shallowRef(0),n=t.shallowRef(e.itemHeight),r=t.computed({get:()=>parseInt(n.value??0,10),set(e){n.value=e}}),i=t.ref(),{resizeRef:s,contentRect:u}=xt()
t.watchEffect((()=>{s.value=i.value}))
const c=mr(),d=new Map
let v=Array.from({length:a.value.length})
const p=t.computed((()=>{const e=(u.value&&i.value!==document.documentElement?u.value.height:c.height.value)-(l?.value??0)
return Math.ceil(e/r.value*1.7+1)}))
function f(e){return v.slice(0,e).reduce(((e,t)=>e+(t||r.value)),0)}let g=0
const h=t.computed((()=>Math.min(a.value.length,o.value+p.value))),y=t.computed((()=>a.value.slice(o.value,h.value).map(((e,t)=>({raw:e,index:t+o.value}))))),b=t.computed((()=>f(o.value))),V=t.computed((()=>f(a.value.length)-f(h.value)))
return t.watch((()=>a.value.length),(()=>{v=m(a.value.length).map((()=>r.value)),d.forEach(((e,t)=>{const l=a.value.indexOf(t);-1===l?d.delete(t):v[l]=e}))})),{containerRef:i,computedItems:y,itemHeight:r,paddingTop:b,paddingBottom:V,scrollToIndex:function(e){if(!i.value)return
const t=f(e)
i.value.scrollTop=t},handleScroll:function(){if(!i.value||!u.value)return
const e=u.value.height-56,t=i.value.scrollTop,l=t<g?-1:1,n=function(e){const t=a.value.length
let l=0,o=0
for(;o<e&&l<t;)o+=v[l++]||r.value
return l-1}(t+e/2),s=Math.round(p.value/3),c=n-s,d=o.value+2*s-1;-1===l&&n<=d?o.value=A(c,0,a.value.length):1===l&&n>=d&&(o.value=A(c,0,a.value.length-p.value)),g=t},handleItemResize:function(e,t){r.value=Math.max(r.value,t),v[e]=t,d.set(a.value[e],t)}}}const Xr=a({items:{type:Array,default:()=>[]},renderless:Boolean,...Kr(),...l(),...Aa()},"VVirtualScroll"),Zr=ut()({name:"VVirtualScroll",props:Xr(),setup(e,a){let{slots:l}=a
const o=pt("VVirtualScroll"),{dimensionStyles:n}=Ea(e),{containerRef:r,handleScroll:i,handleItemResize:s,scrollToIndex:u,paddingTop:c,paddingBottom:d,computedItems:v}=qr(e,t.toRef(e,"items"))
return Pt((()=>e.renderless),(()=>{t.onMounted((()=>{r.value=yt(o.vnode.el,!0),r.value?.addEventListener("scroll",i)})),t.onScopeDispose((()=>{r.value?.removeEventListener("scroll",i)}))})),kt((()=>{const a=v.value.map((a=>t.createVNode(Gr,{key:a.index,renderless:e.renderless,"onUpdate:height":e=>s(a.index,e)},{default:e=>l.default?.({item:a.raw,index:a.index,...e})})))
return e.renderless?t.createVNode(t.Fragment,null,[t.createVNode("div",{class:"v-virtual-scroll__spacer",style:{paddingTop:g(c.value)}},null),a,t.createVNode("div",{class:"v-virtual-scroll__spacer",style:{paddingBottom:g(d.value)}},null)]):t.createVNode("div",{ref:r,class:["v-virtual-scroll",e.class],onScroll:i,style:[n.value,e.style]},[t.createVNode("div",{class:"v-virtual-scroll__container",style:{paddingTop:g(c.value),paddingBottom:g(d.value)}},[a])])})),{scrollToIndex:u}}})
function Jr(e,a){const l=t.shallowRef(!1)
let o
return{onListScroll:function(e){cancelAnimationFrame(o),l.value=!0,o=requestAnimationFrame((()=>{o=requestAnimationFrame((()=>{l.value=!1}))}))},onListKeydown:async function(o){if("Tab"===o.key&&a.value?.focus(),!["PageDown","PageUp","Home","End"].includes(o.key))return
const n=e.value?.$el
if(!n)return
"Home"!==o.key&&"End"!==o.key||n.scrollTo({top:"Home"===o.key?0:n.scrollHeight,behavior:"smooth"}),await async function(){await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>{if(l.value){const a=t.watch(l,(()=>{a(),e()}))}else e()}))}()
const r=n.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)")
if("PageDown"===o.key||"Home"===o.key){const e=n.getBoundingClientRect().top
for(const t of r)if(t.getBoundingClientRect().top>=e){t.focus()
break}}else{const e=n.getBoundingClientRect().bottom
for(const t of[...r].reverse())if(t.getBoundingClientRect().bottom<=e){t.focus()
break}}}}}const Qr=a({chips:Boolean,closableChips:Boolean,closeText:{type:String,default:"$vuetify.close"},openText:{type:String,default:"$vuetify.open"},eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menu:Boolean,menuIcon:{type:Sl,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,itemColor:String,...An({itemChildren:!1})},"Select"),ei=a({...Qr(),...x(Ur({modelValue:null,role:"button"}),["validationValue","dirty","appendInnerIcon"]),...$a({transition:{component:da}})},"VSelect"),ti=ut()({name:"VSelect",props:ei(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,a){let{slots:l}=a
const{t:n}=Ut(),r=t.ref(),i=t.ref(),s=t.ref(),u=$t(e,"menu"),c=t.computed({get:()=>u.value,set:e=>{u.value&&!e&&i.value?.ΨopenChildren||(u.value=e)}}),{items:d,transformIn:v,transformOut:p}=Pn(e),f=$t(e,"modelValue",[],(e=>v(null===e?[null]:R(e))),(t=>{const a=p(t)
return e.multiple?a:a[0]??null})),m=Uo(),g=t.computed((()=>f.value.map((e=>e.value)))),h=t.shallowRef(!1),y=t.computed((()=>c.value?e.closeText:e.openText))
let b,V=""
const w=t.computed((()=>e.hideSelected?d.value.filter((e=>!f.value.some((t=>t===e)))):d.value)),S=t.computed((()=>e.hideNoData&&!d.value.length||e.readonly||m?.isReadonly.value)),k=t.ref(),{onListScroll:x,onListKeydown:C}=Jr(k,r)
function N(t){e.openOnClear&&(c.value=!0)}function _(){S.value||(c.value=!c.value)}function I(t){if(!t.key||e.readonly||m?.isReadonly.value)return;["Enter"," ","ArrowDown","ArrowUp","Home","End"].includes(t.key)&&t.preventDefault(),["Enter","ArrowDown"," "].includes(t.key)&&(c.value=!0),["Escape","Tab"].includes(t.key)&&(c.value=!1),"Home"===t.key?k.value?.focus("first"):"End"===t.key&&k.value?.focus("last")
if(e.multiple||!function(e){const t=1===e.key.length,a=!e.ctrlKey&&!e.metaKey&&!e.altKey
return t&&a}(t))return
const a=performance.now()
a-b>1e3&&(V=""),V+=t.key.toLowerCase(),b=a
const l=d.value.find((e=>e.title.toLowerCase().startsWith(V)))
void 0!==l&&(f.value=[l])}function B(t){if(e.multiple){const a=f.value.findIndex((a=>e.valueComparator(a.value,t.value)))
if(-1===a)f.value=[...f.value,t]
else{const e=[...f.value]
e.splice(a,1),f.value=e}}else f.value=[t],c.value=!1}function A(e){k.value?.$el.contains(e.relatedTarget)||(c.value=!1)}function E(){h.value&&r.value?.focus()}function T(e){h.value=!0}function P(e){if(null==e)f.value=[]
else if(Q(r.value,":autofill")||Q(r.value,":-webkit-autofill")){const t=d.value.find((t=>t.title===e))
t&&B(t)}else r.value&&(r.value.value="")}return t.watch(c,(()=>{if(!e.hideSelected&&c.value&&f.value.length){const t=w.value.findIndex((t=>f.value.some((a=>e.valueComparator(a.value,t.value)))))
o&&window.requestAnimationFrame((()=>{t>=0&&s.value?.scrollToIndex(t)}))}})),kt((()=>{const a=!(!e.chips&&!l.chip),o=!!(!e.hideNoData||w.value.length||l["prepend-item"]||l["append-item"]||l["no-data"]),u=f.value.length>0,[d]=Wr.filterProps(e),v=u||!h.value&&e.label&&!e.persistentPlaceholder?void 0:e.placeholder
return t.createVNode(Wr,t.mergeProps({ref:r},d,{modelValue:f.value.map((e=>e.props.value)).join(", "),"onUpdate:modelValue":P,focused:h.value,"onUpdate:focused":e=>h.value=e,validationValue:f.externalValue,counterValue:f.value.length,dirty:u,class:["v-select",{"v-select--active-menu":c.value,"v-select--chips":!!e.chips,["v-select--"+(e.multiple?"multiple":"single")]:!0,"v-select--selected":f.value.length,"v-select--selection-slot":!!l.selection},e.class],style:e.style,inputmode:"none",placeholder:v,"onClick:clear":N,"onMousedown:control":_,onBlur:A,onKeydown:I,"aria-label":n(y.value),title:n(y.value)}),{...l,default:()=>t.createVNode(t.Fragment,null,[t.createVNode(Pr,t.mergeProps({ref:i,modelValue:c.value,"onUpdate:modelValue":e=>c.value=e,activator:"parent",contentClass:"v-select__content",disabled:S.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:E},e.menuProps),{default:()=>[o&&t.createVNode(Fn,{ref:k,selected:g.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onKeydown:C,onFocusin:T,onScrollPassive:x,tabindex:"-1",color:e.itemColor??e.color},{default:()=>[l["prepend-item"]?.(),!w.value.length&&!e.hideNoData&&(l["no-data"]?.()??t.createVNode(xn,{title:n(e.noDataText)},null)),t.createVNode(Zr,{ref:s,renderless:!0,items:w.value},{default:a=>{let{item:o,index:n,itemRef:r}=a
const i=t.mergeProps(o.props,{ref:r,key:n,onClick:()=>B(o)})
return l.item?.({item:o,index:n,props:i})??t.createVNode(xn,i,{prepend:a=>{let{isSelected:l}=a
return t.createVNode(t.Fragment,null,[e.multiple&&!e.hideSelected?t.createVNode(Lo,{key:o.value,modelValue:l,ripple:!1,tabindex:"-1"},null):void 0,o.props.prependIcon&&t.createVNode($l,{icon:o.props.prependIcon},null)])}})}}),l["append-item"]?.()]})]}),f.value.map(((o,n)=>{const r={"onClick:close":function(e){e.stopPropagation(),e.preventDefault(),B(o)},onMousedown(e){e.preventDefault(),e.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0}
return t.createVNode("div",{key:o.value,class:"v-select__selection"},[a?l.chip?t.createVNode(Ra,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:o.title}}},{default:()=>[l.chip?.({item:o,index:n,props:r})]}):t.createVNode(ln,t.mergeProps({key:"chip",closable:e.closableChips,size:"small",text:o.title,disabled:o.props.disabled},r),null):l.selection?.({item:o,index:n})??t.createVNode("span",{class:"v-select__selection-text"},[o.title,e.multiple&&n<f.value.length-1&&t.createVNode("span",{class:"v-select__selection-comma"},[t.createTextVNode(",")])])])}))]),"append-inner":function(){for(var a=arguments.length,o=new Array(a),n=0;n<a;n++)o[n]=arguments[n]
return t.createVNode(t.Fragment,null,[l["append-inner"]?.(...o),e.menuIcon?t.createVNode($l,{class:"v-select__menu-icon",icon:e.menuIcon},null):void 0])}})})),Er({isFocused:h,menu:c,select:B},r)}}),ai=(e,t,a)=>null==e||null==t?-1:e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()),li=a({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter")
function oi(e,a,l,o){const n=t.ref([]),r=t.ref(new Map),i=t.computed((()=>o?.transform?t.unref(a).map((e=>[e,o.transform(e)])):t.unref(a)))
return t.watchEffect((()=>{const o="function"==typeof l?l():t.unref(l),s="string"!=typeof o&&"number"!=typeof o?"":String(o),u=function(e,t,a){const l=[],o=a?.default??ai,n=!!a?.filterKeys&&R(a.filterKeys),r=Object.keys(a?.customKeyFilter??{}).length
if(!e?.length)return l
e:for(let i=0;i<e.length;i++){const[s,u=s]=R(e[i]),c={},d={}
let v=-1
if(t&&!a?.noFilter){if("object"==typeof s){const e=n||Object.keys(u)
for(const l of e){const e=f(u,l,u),n=a?.customKeyFilter?.[l]
if(v=n?n(e,t,s):o(e,t,s),-1!==v&&!1!==v)n?c[l]=v:d[l]=v
else if("every"===a?.filterMode)continue e}}else v=o(s,t,s),-1!==v&&!1!==v&&(d.title=v)
const e=Object.keys(d).length,l=Object.keys(c).length
if(!e&&!l)continue
if("union"===a?.filterMode&&l!==r&&!e)continue
if("intersection"===a?.filterMode&&(l!==r||!e))continue}l.push({index:i,matches:{...d,...c}})}return l}(i.value,s,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}),c=t.unref(a),d=[],v=new Map
u.forEach((e=>{let{index:t,matches:a}=e
const l=c[t]
d.push(l),v.set(l.value,a)})),n.value=d,r.value=v})),{filteredItems:n,filteredMatches:r,getMatches:function(e){return r.value.get(e.value)}}}const ni=a({autoSelectFirst:{type:[Boolean,String]},search:String,...li({filterKeys:["title"]}),...Qr(),...x(Ur({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...$a({transition:!1})},"VAutocomplete"),ri=ut()({name:"VAutocomplete",props:ni(),emits:{"update:focused":e=>!0,"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,a){let{slots:l}=a
const{t:n}=Ut(),r=t.ref(),i=t.shallowRef(!1),s=t.shallowRef(!0),u=t.shallowRef(!1),c=t.ref(),d=t.ref(),v=$t(e,"menu"),p=t.computed({get:()=>v.value,set:e=>{v.value&&!e&&c.value?.ΨopenChildren||(v.value=e)}}),f=t.shallowRef(-1),m=t.computed((()=>r.value?.color)),g=t.computed((()=>p.value?e.closeText:e.openText)),{items:h,transformIn:y,transformOut:b}=Pn(e),{textColorClasses:V,textColorStyles:w}=Ua(m),S=$t(e,"search",""),k=$t(e,"modelValue",[],(e=>y(null===e?[null]:R(e))),(t=>{const a=b(t)
return e.multiple?a:a[0]??null})),x=Uo(),{filteredItems:C,getMatches:N}=oi(e,h,(()=>s.value?"":S.value)),_=t.computed((()=>e.hideSelected?C.value.filter((e=>!k.value.some((t=>t.value===e.value)))):C.value)),I=t.computed((()=>k.value.map((e=>e.props.value)))),B=t.computed((()=>(!0===e.autoSelectFirst||"exact"===e.autoSelectFirst&&S.value===_.value[0]?.title)&&_.value.length>0&&!s.value&&!u.value)),A=t.computed((()=>e.hideNoData&&!h.value.length||e.readonly||x?.isReadonly.value)),E=t.ref(),{onListScroll:T,onListKeydown:P}=Jr(E,r)
function $(t){e.openOnClear&&(p.value=!0),S.value=""}function L(){A.value||(p.value=!0)}function M(e){A.value||(i.value&&(e.preventDefault(),e.stopPropagation()),p.value=!p.value)}function F(t){if(e.readonly||x?.isReadonly.value)return
const a=r.value.selectionStart,l=k.value.length
if((f.value>-1||["Enter","ArrowDown","ArrowUp"].includes(t.key))&&t.preventDefault(),["Enter","ArrowDown"].includes(t.key)&&(p.value=!0),["Escape"].includes(t.key)&&(p.value=!1),B.value&&["Enter","Tab"].includes(t.key)&&Y(_.value[0]),"ArrowDown"===t.key&&B.value&&E.value?.focus("next"),e.multiple){if(["Backspace","Delete"].includes(t.key)){if(f.value<0)return void("Backspace"!==t.key||S.value||(f.value=l-1))
const e=f.value,a=k.value[f.value]
a&&!a.props.disabled&&Y(a),f.value=e>=l-1?l-2:e}if("ArrowLeft"===t.key){if(f.value<0&&a>0)return
const e=f.value>-1?f.value-1:l-1
k.value[e]?f.value=e:(f.value=-1,r.value.setSelectionRange(S.value?.length,S.value?.length))}if("ArrowRight"===t.key){if(f.value<0)return
const e=f.value+1
k.value[e]?f.value=e:(f.value=-1,r.value.setSelectionRange(0,0))}}}function D(e){S.value=e.target.value}function O(e){if(Q(r.value,":autofill")||Q(r.value,":-webkit-autofill")){const t=h.value.find((t=>t.title===e.target.value))
t&&Y(t)}}function z(){i.value&&(s.value=!0,r.value?.focus())}function j(e){i.value=!0,setTimeout((()=>{u.value=!0}))}function H(e){u.value=!1}function U(t){(null==t||""===t&&!e.multiple)&&(k.value=[])}const W=t.shallowRef(!1)
function Y(a){if(e.multiple){const t=k.value.findIndex((t=>e.valueComparator(t.value,a.value)))
if(-1===t)k.value=[...k.value,a]
else{const e=[...k.value]
e.splice(t,1),k.value=e}}else k.value=[a],W.value=!0,S.value=a.title,p.value=!1,s.value=!0,t.nextTick((()=>W.value=!1))}return t.watch(i,((a,l)=>{a!==l&&(a?(W.value=!0,S.value=e.multiple?"":String(k.value.at(-1)?.props.title??""),s.value=!0,t.nextTick((()=>W.value=!1))):(e.multiple||S.value?!B.value||u.value||k.value.some((e=>{let{value:t}=e
return t===_.value[0].value}))||Y(_.value[0]):k.value=[],p.value=!1,S.value="",f.value=-1))})),t.watch(S,(e=>{i.value&&!W.value&&(e&&(p.value=!0),s.value=!e)})),t.watch(p,(()=>{if(!e.hideSelected&&p.value&&k.value.length){const e=_.value.findIndex((e=>k.value.some((t=>e.value===t.value))))
o&&window.requestAnimationFrame((()=>{e>=0&&d.value?.scrollToIndex(e)}))}})),kt((()=>{const a=!(!e.chips&&!l.chip),o=!!(!e.hideNoData||_.value.length||l["prepend-item"]||l["append-item"]||l["no-data"]),u=k.value.length>0,[v]=Wr.filterProps(e)
return t.createVNode(Wr,t.mergeProps({ref:r},v,{modelValue:S.value,"onUpdate:modelValue":U,focused:i.value,"onUpdate:focused":e=>i.value=e,validationValue:k.externalValue,counterValue:k.value.length,dirty:u,onInput:D,onChange:O,class:["v-autocomplete","v-autocomplete--"+(e.multiple?"multiple":"single"),{"v-autocomplete--active-menu":p.value,"v-autocomplete--chips":!!e.chips,"v-autocomplete--selection-slot":!!l.selection,"v-autocomplete--selecting-index":f.value>-1},e.class],style:e.style,readonly:e.readonly,placeholder:u?void 0:e.placeholder,"onClick:clear":$,"onMousedown:control":L,onKeydown:F}),{...l,default:()=>t.createVNode(t.Fragment,null,[t.createVNode(Pr,t.mergeProps({ref:c,modelValue:p.value,"onUpdate:modelValue":e=>p.value=e,activator:"parent",contentClass:"v-autocomplete__content",disabled:A.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:z},e.menuProps),{default:()=>[o&&t.createVNode(Fn,{ref:E,selected:I.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onKeydown:P,onFocusin:j,onFocusout:H,onScrollPassive:T,tabindex:"-1",color:e.itemColor??e.color},{default:()=>[l["prepend-item"]?.(),!_.value.length&&!e.hideNoData&&(l["no-data"]?.()??t.createVNode(xn,{title:n(e.noDataText)},null)),t.createVNode(Zr,{ref:d,renderless:!0,items:_.value},{default:a=>{let{item:o,index:n,itemRef:r}=a
const i=t.mergeProps(o.props,{ref:r,key:n,active:!(!B.value||0!==n)||void 0,onClick:()=>Y(o)})
return l.item?.({item:o,index:n,props:i})??t.createVNode(xn,i,{prepend:a=>{let{isSelected:l}=a
return t.createVNode(t.Fragment,null,[e.multiple&&!e.hideSelected?t.createVNode(Lo,{key:o.value,modelValue:l,ripple:!1,tabindex:"-1"},null):void 0,o.props.prependIcon&&t.createVNode($l,{icon:o.props.prependIcon},null)])},title:()=>s.value?o.title:function(e,a,l){if(null==a)return e
if(Array.isArray(a))throw new Error("Multiple matches is not implemented")
return"number"==typeof a&&~a?t.createVNode(t.Fragment,null,[t.createVNode("span",{class:"v-autocomplete__unmask"},[e.substr(0,a)]),t.createVNode("span",{class:"v-autocomplete__mask"},[e.substr(a,l)]),t.createVNode("span",{class:"v-autocomplete__unmask"},[e.substr(a+l)])]):e}(o.title,N(o)?.title,S.value?.length??0)})}}),l["append-item"]?.()]})]}),k.value.map(((o,n)=>{const r={"onClick:close":function(e){e.stopPropagation(),e.preventDefault(),Y(o)},onMousedown(e){e.preventDefault(),e.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0}
return t.createVNode("div",{key:o.value,class:["v-autocomplete__selection",n===f.value&&["v-autocomplete__selection--selected",V.value]],style:n===f.value?w.value:{}},[a?l.chip?t.createVNode(Ra,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:o.title}}},{default:()=>[l.chip?.({item:o,index:n,props:r})]}):t.createVNode(ln,t.mergeProps({key:"chip",closable:e.closableChips,size:"small",text:o.title,disabled:o.props.disabled},r),null):l.selection?.({item:o,index:n})??t.createVNode("span",{class:"v-autocomplete__selection-text"},[o.title,e.multiple&&n<k.value.length-1&&t.createVNode("span",{class:"v-autocomplete__selection-comma"},[t.createTextVNode(",")])])])}))]),"append-inner":function(){for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r]
return t.createVNode(t.Fragment,null,[l["append-inner"]?.(...o),e.menuIcon?t.createVNode($l,{class:"v-autocomplete__menu-icon",icon:e.menuIcon,onMousedown:M,onClick:J,"aria-label":n(g.value),title:n(g.value)},null):void 0])}})})),Er({isFocused:i,isPristine:s,menu:p,search:S,filteredItems:C,select:Y},r)}}),ii=a({bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:Sl,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...l(),...Ol({location:"top end"}),...Ka(),...la(),...Kt(),...$a({transition:"scale-rotate-transition"})},"VBadge"),si=ut()({name:"VBadge",inheritAttrs:!1,props:ii(),setup(e,a){const{backgroundColorClasses:l,backgroundColorStyles:o}=Wa(t.toRef(e,"color")),{roundedClasses:n}=qa(e),{t:r}=Ut(),{textColorClasses:i,textColorStyles:s}=Ua(t.toRef(e,"textColor")),{themeClasses:u}=Jt(),{locationStyles:c}=zl(e,!0,(t=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(t)?+(e.offsetY??0):["left","right"].includes(t)?+(e.offsetX??0):0)))
return kt((()=>{const d=Number(e.content),v=!e.max||isNaN(d)?e.content:d<=+e.max?d:`${e.max}+`,[p,f]=k(a.attrs,["aria-atomic","aria-label","aria-live","role","title"])
return t.createVNode(e.tag,t.mergeProps({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline},e.class]},f,{style:e.style}),{default:()=>[t.createVNode("div",{class:"v-badge__wrapper"},[a.slots.default?.(),t.createVNode(La,{transition:e.transition},{default:()=>[t.withDirectives(t.createVNode("span",t.mergeProps({class:["v-badge__badge",u.value,l.value,n.value,i.value],style:[o.value,s.value,e.inline?{}:c.value],"aria-atomic":"true","aria-label":r(e.label,d),"aria-live":"polite",role:"status"},p),[e.dot?void 0:a.slots.badge?a.slots.badge?.():e.icon?t.createVNode($l,{icon:e.icon},null):v]),[[t.vShow,e.modelValue]])]})])]})})),{}}}),ui=a({color:String,density:String,...l()},"VBannerActions"),ci=ut()({name:"VBannerActions",props:ui(),setup(e,a){let{slots:l}=a
return nt({VBtn:{color:e.color,density:e.density,variant:"text"}}),kt((()=>t.createVNode("div",{class:["v-banner-actions",e.class],style:e.style},[l.default?.()]))),{}}}),di=ct("v-banner-text"),vi=a({avatar:String,color:String,icon:Sl,lines:String,stacked:Boolean,sticky:Boolean,text:String,...za(),...l(),...ol(),...Aa(),...Ya(),...Ol(),...Kl(),...Ka(),...la(),...Kt()},"VBanner"),pi=ut()({name:"VBanner",props:vi(),setup(e,a){let{slots:l}=a
const{borderClasses:o}=ja(e),{densityClasses:n}=nl(e),{mobile:r}=mr(),{dimensionStyles:i}=Ea(e),{elevationClasses:s}=Ga(e),{locationStyles:u}=zl(e),{positionClasses:c}=ql(e),{roundedClasses:d}=qa(e),{themeClasses:v}=Zt(e),p=t.toRef(e,"color"),f=t.toRef(e,"density")
nt({VBannerActions:{color:p,density:f}}),kt((()=>{const a=!(!e.text&&!l.text),m=!(!e.avatar&&!e.icon),g=!(!m&&!l.prepend)
return t.createVNode(e.tag,{class:["v-banner",{"v-banner--stacked":e.stacked||r.value,"v-banner--sticky":e.sticky,[`v-banner--${e.lines}-line`]:!!e.lines},o.value,n.value,s.value,c.value,d.value,v.value,e.class],style:[i.value,u.value,e.style],role:"banner"},{default:()=>[g&&t.createVNode("div",{key:"prepend",class:"v-banner__prepend"},[l.prepend?t.createVNode(Ra,{key:"prepend-defaults",disabled:!m,defaults:{VAvatar:{color:p.value,density:f.value,icon:e.icon,image:e.avatar}}},l.prepend):t.createVNode(Jo,{key:"prepend-avatar",color:p.value,density:f.value,icon:e.icon,image:e.avatar},null)]),t.createVNode("div",{class:"v-banner__content"},[a&&t.createVNode(di,{key:"text"},{default:()=>[l.text?.()??e.text]}),l.default?.()]),l.actions&&t.createVNode(ci,{key:"actions"},l.actions)]})}))}}),fi=a({bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...za(),...l(),...ol(),...Ya(),...Ka(),...It({name:"bottom-navigation"}),...la({tag:"header"}),...vl({modelValue:!0,selectedClass:"v-btn--selected"}),...Kt()},"VBottomNavigation"),mi=ut()({name:"VBottomNavigation",props:fi(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Jt(),{borderClasses:n}=ja(e),{backgroundColorClasses:r,backgroundColorStyles:i}=Wa(t.toRef(e,"bgColor")),{densityClasses:s}=nl(e),{elevationClasses:u}=Ga(e),{roundedClasses:c}=qa(e),{ssrBootStyles:d}=el(),v=t.computed((()=>Number(e.height)-("comfortable"===e.density?8:0)-("compact"===e.density?16:0))),p=t.toRef(e,"active"),{layoutItemStyles:f}=Rt({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.computed((()=>"bottom")),layoutSize:t.computed((()=>p.value?v.value:0)),elementSize:v,active:p,absolute:t.toRef(e,"absolute")})
return ml(e,hl),nt({VBtn:{color:t.toRef(e,"color"),density:t.toRef(e,"density"),stacked:t.computed((()=>"horizontal"!==e.mode)),variant:"text"}},{scoped:!0}),kt((()=>t.createVNode(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":p.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":"shift"===e.mode},o.value,r.value,n.value,s.value,u.value,c.value,e.class],style:[i.value,f.value,{height:g(v.value),transform:`translateY(${g(p.value?0:100,"%")})`},d.value,e.style]},{default:()=>[l.default&&t.createVNode("div",{class:"v-bottom-navigation__content"},[l.default()])]}))),{}}}),gi=a({divider:[Number,String],...l()},"VBreadcrumbsDivider"),hi=ut()({name:"VBreadcrumbsDivider",props:gi(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode("li",{class:["v-breadcrumbs-divider",e.class],style:e.style},[l?.default?.()??e.divider]))),{}}}),yi=a({active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...l(),...Jl(),...la({tag:"li"})},"VBreadcrumbsItem"),bi=ut()({name:"VBreadcrumbsItem",props:yi(),setup(e,a){let{slots:l,attrs:o}=a
const n=Zl(e,o),r=t.computed((()=>e.active||n.isActive?.value)),i=t.computed((()=>r.value?e.activeColor:e.color)),{textColorClasses:s,textColorStyles:u}=Ua(i)
return kt((()=>t.createVNode(e.tag,{class:["v-breadcrumbs-item",{"v-breadcrumbs-item--active":r.value,"v-breadcrumbs-item--disabled":e.disabled,[`${e.activeClass}`]:r.value&&e.activeClass},s.value,e.class],style:[u.value,e.style],"aria-current":r.value?"page":void 0},{default:()=>[n.isLink.value?t.createVNode("a",{class:"v-breadcrumbs-item--link",href:n.href.value,"aria-current":r.value?"page":void 0,onClick:n.navigate},[l.default?.()??e.title]):l.default?.()??e.title]}))),{}}}),Vi=a({activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:"/"},icon:Sl,items:{type:Array,default:()=>[]},...l(),...ol(),...Ka(),...la({tag:"ul"})},"VBreadcrumbs"),wi=ut()({name:"VBreadcrumbs",props:Vi(),setup(e,a){let{slots:l}=a
const{backgroundColorClasses:o,backgroundColorStyles:n}=Wa(t.toRef(e,"bgColor")),{densityClasses:r}=nl(e),{roundedClasses:i}=qa(e)
nt({VBreadcrumbsDivider:{divider:t.toRef(e,"divider")},VBreadcrumbsItem:{activeClass:t.toRef(e,"activeClass"),activeColor:t.toRef(e,"activeColor"),color:t.toRef(e,"color"),disabled:t.toRef(e,"disabled")}})
const s=t.computed((()=>e.items.map((e=>"string"==typeof e?{item:{title:e},raw:e}:{item:e,raw:e}))))
return kt((()=>{const a=!(!l.prepend&&!e.icon)
return t.createVNode(e.tag,{class:["v-breadcrumbs",o.value,r.value,i.value,e.class],style:[n.value,e.style]},{default:()=>[a&&t.createVNode("li",{key:"prepend",class:"v-breadcrumbs__prepend"},[l.prepend?t.createVNode(Ra,{key:"prepend-defaults",disabled:!e.icon,defaults:{VIcon:{icon:e.icon,start:!0}}},l.prepend):t.createVNode($l,{key:"prepend-icon",start:!0,icon:e.icon},null)]),s.value.map(((e,a,o)=>{let{item:n,raw:r}=e
return t.createVNode(t.Fragment,null,[t.createVNode(bi,t.mergeProps({key:n.title,disabled:a>=o.length-1},n),{default:l.title?()=>l.title?.({item:r,index:a}):void 0}),a<o.length-1&&t.createVNode(hi,null,{default:l.divider?()=>l.divider?.({item:r,index:a}):void 0})])})),l.default?.()]})})),{}}}),Si=ut()({name:"VCardActions",props:l(),setup(e,a){let{slots:l}=a
return nt({VBtn:{variant:"text"}}),kt((()=>t.createVNode("div",{class:["v-card-actions",e.class],style:e.style},[l.default?.()]))),{}}}),ki=ct("v-card-subtitle"),xi=ct("v-card-title"),Ci=a({appendAvatar:String,appendIcon:Sl,prependAvatar:String,prependIcon:Sl,subtitle:String,title:String,...l(),...ol()},"VCardItem"),Ni=ut()({name:"VCardItem",props:Ci(),setup(e,a){let{slots:l}=a
return kt((()=>{const a=!(!e.prependAvatar&&!e.prependIcon),o=!(!a&&!l.prepend),n=!(!e.appendAvatar&&!e.appendIcon),r=!(!n&&!l.append),i=!(!e.title&&!l.title),s=!(!e.subtitle&&!l.subtitle)
return t.createVNode("div",{class:["v-card-item",e.class],style:e.style},[o&&t.createVNode("div",{key:"prepend",class:"v-card-item__prepend"},[l.prepend?t.createVNode(Ra,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},l.prepend):a&&t.createVNode(Jo,{key:"prepend-avatar",density:e.density,icon:e.prependIcon,image:e.prependAvatar},null)]),t.createVNode("div",{class:"v-card-item__content"},[i&&t.createVNode(xi,{key:"title"},{default:()=>[l.title?.()??e.title]}),s&&t.createVNode(ki,{key:"subtitle"},{default:()=>[l.subtitle?.()??e.subtitle]}),l.default?.()]),r&&t.createVNode("div",{key:"append",class:"v-card-item__append"},[l.append?t.createVNode(Ra,{key:"append-defaults",disabled:!n,defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},l.append):n&&t.createVNode(Jo,{key:"append-avatar",density:e.density,icon:e.appendIcon,image:e.appendAvatar},null)])])})),{}}}),_i=ct("v-card-text"),Ii=a({appendAvatar:String,appendIcon:Sl,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:Sl,ripple:{type:[Boolean,Object],default:!0},subtitle:String,text:String,title:String,...za(),...l(),...ol(),...Aa(),...Ya(),...Ul(),...Ol(),...Kl(),...Ka(),...Jl(),...la(),...Kt(),...sl({variant:"elevated"})},"VCard"),Bi=ut()({name:"VCard",directives:{Ripple:ho},props:Ii(),setup(e,a){let{attrs:l,slots:o}=a
const{themeClasses:n}=Zt(e),{borderClasses:r}=ja(e),{colorClasses:i,colorStyles:s,variantClasses:u}=ul(e),{densityClasses:c}=nl(e),{dimensionStyles:d}=Ea(e),{elevationClasses:v}=Ga(e),{loaderClasses:p}=Wl(e),{locationStyles:f}=zl(e),{positionClasses:m}=ql(e),{roundedClasses:g}=qa(e),h=Zl(e,l),y=t.computed((()=>!1!==e.link&&h.isLink.value)),b=t.computed((()=>!e.disabled&&!1!==e.link&&(e.link||h.isClickable.value)))
return kt((()=>{const a=y.value?"a":e.tag,l=!(!o.title&&!e.title),V=!(!o.subtitle&&!e.subtitle),w=l||V,S=!!(o.append||e.appendAvatar||e.appendIcon),k=!!(o.prepend||e.prependAvatar||e.prependIcon),x=!(!o.image&&!e.image),C=w||k||S,N=!(!o.text&&!e.text)
return t.withDirectives(t.createVNode(a,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":b.value},n.value,r.value,i.value,c.value,v.value,p.value,m.value,g.value,u.value,e.class],style:[s.value,d.value,f.value,e.style],href:h.href.value,onClick:b.value&&h.navigate,tabindex:e.disabled?-1:void 0},{default:()=>[x&&t.createVNode("div",{key:"image",class:"v-card__image"},[o.image?t.createVNode(Ra,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},o.image):t.createVNode(Oa,{key:"image-img",cover:!0,src:e.image},null)]),t.createVNode(Yl,{name:"v-card",active:!!e.loading,color:"boolean"==typeof e.loading?void 0:e.loading},{default:o.loader}),C&&t.createVNode(Ni,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:o.item,prepend:o.prepend,title:o.title,subtitle:o.subtitle,append:o.append}),N&&t.createVNode(_i,{key:"text"},{default:()=>[o.text?.()??e.text]}),o.default?.(),o.actions&&t.createVNode(Si,null,{default:o.actions}),il(b.value,"v-card")]}),[[t.resolveDirective("ripple"),b.value&&e.ripple]])})),{}}})
function Ri(e,t){const a=e.changedTouches[0]
t.touchstartX=a.clientX,t.touchstartY=a.clientY,t.start?.({originalEvent:e,...t})}function Ai(e,t){const a=e.changedTouches[0]
t.touchendX=a.clientX,t.touchendY=a.clientY,t.end?.({originalEvent:e,...t}),(e=>{const{touchstartX:t,touchendX:a,touchstartY:l,touchendY:o}=e
e.offsetX=a-t,e.offsetY=o-l,Math.abs(e.offsetY)<.5*Math.abs(e.offsetX)&&(e.left&&a<t-16&&e.left(e),e.right&&a>t+16&&e.right(e)),Math.abs(e.offsetX)<.5*Math.abs(e.offsetY)&&(e.up&&o<l-16&&e.up(e),e.down&&o>l+16&&e.down(e))})(t)}function Ei(e,t){const a=e.changedTouches[0]
t.touchmoveX=a.clientX,t.touchmoveY=a.clientY,t.move?.({originalEvent:e,...t})}const Ti={mounted:function(e,t){const a=t.value,l=a?.parent?e.parentElement:e,o=a?.options??{passive:!0},n=t.instance?.$.uid
if(!l||!n)return
const r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const t={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end}
return{touchstart:e=>Ri(e,t),touchend:e=>Ai(e,t),touchmove:e=>Ei(e,t)}}(t.value)
l._touchHandlers=l._touchHandlers??Object.create(null),l._touchHandlers[n]=r,w(r).forEach((e=>{l.addEventListener(e,r[e],o)}))},unmounted:function(e,t){const a=t.value?.parent?e.parentElement:e,l=t.instance?.$.uid
if(!a?._touchHandlers||!l)return
const o=a._touchHandlers[l]
w(o).forEach((e=>{a.removeEventListener(e,o[e])})),delete a._touchHandlers[l]}},Pi=Symbol.for("vuetify:v-window"),$i=Symbol.for("vuetify:v-window-group"),Li=a({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>"boolean"==typeof e||"hover"===e},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},...l(),...la(),...Kt()},"VWindow"),Mi=ut()({name:"VWindow",directives:{Touch:Ti},props:Li(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{isRtl:n}=Yt(),{t:r}=Ut(),i=ml(e,$i),s=t.ref(),u=t.computed((()=>n.value?!e.reverse:e.reverse)),c=t.shallowRef(!1),d=t.computed((()=>`v-window-${"vertical"===e.direction?"y":"x"}${(u.value?!c.value:c.value)?"-reverse":""}-transition`)),v=t.shallowRef(0),p=t.ref(void 0),f=t.computed((()=>i.items.value.findIndex((e=>i.selected.value.includes(e.id)))))
t.watch(f,((e,t)=>{const a=i.items.value.length,l=a-1
c.value=a<=2?e<t:e===l&&0===t||(0!==e||t!==l)&&e<t})),t.provide(Pi,{transition:d,isReversed:c,transitionCount:v,transitionHeight:p,rootRef:s})
const m=t.computed((()=>e.continuous||0!==f.value)),g=t.computed((()=>e.continuous||f.value!==i.items.value.length-1))
function h(){m.value&&i.prev()}function y(){g.value&&i.next()}const b=t.computed((()=>{const a=[],o={icon:n.value?e.nextIcon:e.prevIcon,class:"v-window__"+(u.value?"right":"left"),onClick:i.prev,ariaLabel:r("$vuetify.carousel.prev")}
a.push(m.value?l.prev?l.prev({props:o}):t.createVNode(bo,o,null):t.createVNode("div",null,null))
const s={icon:n.value?e.prevIcon:e.nextIcon,class:"v-window__"+(u.value?"left":"right"),onClick:i.next,ariaLabel:r("$vuetify.carousel.next")}
return a.push(g.value?l.next?l.next({props:s}):t.createVNode(bo,s,null):t.createVNode("div",null,null)),a})),V=t.computed((()=>{if(!1===e.touch)return e.touch
return{...{left:()=>{u.value?h():y()},right:()=>{u.value?y():h()},start:e=>{let{originalEvent:t}=e
t.stopPropagation()}},...!0===e.touch?{}:e.touch}}))
return kt((()=>t.withDirectives(t.createVNode(e.tag,{ref:s,class:["v-window",{"v-window--show-arrows-on-hover":"hover"===e.showArrows},o.value,e.class],style:e.style},{default:()=>[t.createVNode("div",{class:"v-window__container",style:{height:p.value}},[l.default?.({group:i}),!1!==e.showArrows&&t.createVNode("div",{class:"v-window__controls"},[b.value])]),l.additional?.({group:i})]}),[[t.resolveDirective("touch"),V.value]]))),{group:i}}}),Fi=a({color:String,cycle:Boolean,delimiterIcon:{type:Sl,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>Number(e)>0},progress:[Boolean,String],verticalDelimiters:[Boolean,String],...Li({continuous:!0,mandatory:"force",showArrows:!0})},"VCarousel"),Di=ut()({name:"VCarousel",props:Fi(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"modelValue"),{t:n}=Ut(),r=t.ref()
let i=-1
function s(){e.cycle&&r.value&&(i=window.setTimeout(r.value.group.next,+e.interval>0?+e.interval:6e3))}function u(){window.clearTimeout(i),window.requestAnimationFrame(s)}return t.watch(o,u),t.watch((()=>e.interval),u),t.watch((()=>e.cycle),(e=>{e?u():window.clearTimeout(i)})),t.onMounted(s),kt((()=>{const[a]=Mi.filterProps(e)
return t.createVNode(Mi,t.mergeProps({ref:r},a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters},e.class],style:[{height:g(e.height)},e.style]}),{default:l.default,additional:a=>{let{group:r}=a
return t.createVNode(t.Fragment,null,[!e.hideDelimiters&&t.createVNode("div",{class:"v-carousel__controls",style:{left:"left"===e.verticalDelimiters&&e.verticalDelimiters?0:"auto",right:"right"===e.verticalDelimiters?0:"auto"}},[r.items.value.length>0&&t.createVNode(Ra,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[r.items.value.map(((e,a)=>{const o={id:`carousel-item-${e.id}`,"aria-label":n("$vuetify.carousel.ariaLabel.delimiter",a+1,r.items.value.length),class:[r.isSelected(e.id)&&"v-btn--active"],onClick:()=>r.select(e.id,!0)}
return l.item?l.item({props:o,item:e}):t.createVNode(bo,t.mergeProps(e,o),null)}))]})]),e.progress&&t.createVNode(Hl,{class:"v-carousel__progress",color:"string"==typeof e.progress?e.progress:void 0,modelValue:(r.getItemIndex(o.value)+1)/r.items.value.length*100},null)])},prev:l.prev,next:l.next})})),{}}}),Oi=a({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...l(),...pl(),...hr()},"VWindowItem"),zi=ut()({name:"VWindowItem",directives:{Touch:Ti},props:Oi(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:l}=a
const o=t.inject(Pi),n=fl(e,$i),{isBooted:r}=el()
if(!o||!n)throw new Error("[Vuetify] VWindowItem must be used inside VWindow")
const i=t.shallowRef(!1),s=t.computed((()=>r.value&&(o.isReversed.value?!1!==e.reverseTransition:!1!==e.transition)))
function u(){i.value&&o&&(i.value=!1,o.transitionCount.value>0&&(o.transitionCount.value-=1,0===o.transitionCount.value&&(o.transitionHeight.value=void 0)))}function c(){!i.value&&o&&(i.value=!0,0===o.transitionCount.value&&(o.transitionHeight.value=g(o.rootRef.value?.clientHeight)),o.transitionCount.value+=1)}function d(){u()}function v(e){i.value&&t.nextTick((()=>{s.value&&i.value&&o&&(o.transitionHeight.value=g(e.clientHeight))}))}const p=t.computed((()=>{const t=o.isReversed.value?e.reverseTransition:e.transition
return!!s.value&&{name:"string"!=typeof t?o.transition.value:t,onBeforeEnter:c,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:c,onAfterLeave:u,onLeaveCancelled:d,onEnter:v}})),{hasContent:f}=yr(e,n.isSelected)
return kt((()=>t.createVNode(La,{transition:p.value,disabled:!r.value},{default:()=>[t.withDirectives(t.createVNode("div",{class:["v-window-item",n.selectedClass.value,e.class],style:e.style},[f.value&&l.default?.()]),[[t.vShow,n.isSelected.value]])]}))),{groupItem:n}}}),ji=a({...Da(),...Oi()},"VCarouselItem"),Hi=ut()({name:"VCarouselItem",inheritAttrs:!1,props:ji(),setup(e,a){let{slots:l,attrs:o}=a
kt((()=>{const[a]=Oa.filterProps(e),[n]=zi.filterProps(e)
return t.createVNode(zi,t.mergeProps({class:"v-carousel-item"},n),{default:()=>[t.createVNode(Oa,t.mergeProps(o,a),l)]})}))}}),Ui=ct("v-code"),Wi=st({name:"VColorPickerCanvas",props:a({color:{type:Object},disabled:Boolean,dotSize:{type:[Number,String],default:10},height:{type:[Number,String],default:150},width:{type:[Number,String],default:300},...l()},"VColorPickerCanvas")(),emits:{"update:color":e=>!0,"update:position":e=>!0},setup(e,a){let{emit:l}=a
const o=t.shallowRef(!1),n=t.ref(),r=t.shallowRef(parseFloat(e.width)),i=t.shallowRef(parseFloat(e.height)),s=t.ref({x:0,y:0}),u=t.computed({get:()=>s.value,set(t){if(!n.value)return
const{x:a,y:o}=t
s.value=t,l("update:color",{h:e.color?.h??0,s:A(a,0,r.value)/r.value,v:1-A(o,0,i.value)/i.value,a:e.color?.a??1})}}),c=t.computed((()=>{const{x:t,y:a}=u.value,l=parseInt(e.dotSize,10)/2
return{width:g(e.dotSize),height:g(e.dotSize),transform:`translate(${g(t-l)}, ${g(a-l)})`}})),{resizeRef:d}=xt((e=>{if(!d.value?.offsetParent)return
const{width:t,height:a}=e[0].contentRect
r.value=t,i.value=a}))
function v(t){"mousedown"===t.type&&t.preventDefault(),e.disabled||(p(t),window.addEventListener("mousemove",p),window.addEventListener("mouseup",f),window.addEventListener("touchmove",p),window.addEventListener("touchend",f))}function p(t){if(e.disabled||!n.value)return
o.value=!0
const a=function(e){return"touches"in e?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:{clientX:e.clientX,clientY:e.clientY}}(t)
!function(e,t,a){const{left:l,top:o,width:n,height:r}=a
u.value={x:A(e-l,0,n),y:A(t-o,0,r)}}(a.clientX,a.clientY,n.value.getBoundingClientRect())}function f(){window.removeEventListener("mousemove",p),window.removeEventListener("mouseup",f),window.removeEventListener("touchmove",p),window.removeEventListener("touchend",f)}function m(){if(!n.value)return
const t=n.value,a=t.getContext("2d")
if(!a)return
const l=a.createLinearGradient(0,0,t.width,0)
l.addColorStop(0,"hsla(0, 0%, 100%, 1)"),l.addColorStop(1,`hsla(${e.color?.h??0}, 100%, 50%, 1)`),a.fillStyle=l,a.fillRect(0,0,t.width,t.height)
const o=a.createLinearGradient(0,0,0,t.height)
o.addColorStop(0,"hsla(0, 0%, 100%, 0)"),o.addColorStop(1,"hsla(0, 0%, 0%, 1)"),a.fillStyle=o,a.fillRect(0,0,t.width,t.height)}return t.watch((()=>e.color?.h),m,{immediate:!0}),t.watch((()=>[r.value,i.value]),((e,t)=>{m(),s.value={x:u.value.x*e[0]/t[0],y:u.value.y*e[1]/t[1]}}),{flush:"post"}),t.watch((()=>e.color),(()=>{o.value?o.value=!1:s.value=e.color?{x:e.color.s*r.value,y:(1-e.color.v)*i.value}:{x:0,y:0}}),{deep:!0,immediate:!0}),t.onMounted((()=>m())),kt((()=>t.createVNode("div",{ref:d,class:["v-color-picker-canvas",e.class],style:e.style,onMousedown:v,onTouchstartPassive:v},[t.createVNode("canvas",{ref:n,width:r.value,height:i.value},null),e.color&&t.createVNode("div",{class:["v-color-picker-canvas__dot",{"v-color-picker-canvas__dot--disabled":e.disabled}],style:c.value},null)]))),{}}})
const Yi={h:0,s:0,v:1,a:1},Gi={inputProps:{type:"number",min:0},inputs:[{label:"R",max:255,step:1,getValue:e=>Math.round(e.r),getColor:(e,t)=>({...e,r:Number(t)})},{label:"G",max:255,step:1,getValue:e=>Math.round(e.g),getColor:(e,t)=>({...e,g:Number(t)})},{label:"B",max:255,step:1,getValue:e=>Math.round(e.b),getColor:(e,t)=>({...e,b:Number(t)})},{label:"A",max:1,step:.01,getValue:e=>{let{a:t}=e
return null!=t?Math.round(100*t)/100:1},getColor:(e,t)=>({...e,a:Number(t)})}],to:Oe,from:je},Ki={inputProps:{type:"number",min:0},inputs:[{label:"H",max:360,step:1,getValue:e=>Math.round(e.h),getColor:(e,t)=>({...e,h:Number(t)})},{label:"S",max:1,step:.01,getValue:e=>Math.round(100*e.s)/100,getColor:(e,t)=>({...e,s:Number(t)})},{label:"L",max:1,step:.01,getValue:e=>Math.round(100*e.l)/100,getColor:(e,t)=>({...e,l:Number(t)})},{label:"A",max:1,step:.01,getValue:e=>{let{a:t}=e
return null!=t?Math.round(100*t)/100:1},getColor:(e,t)=>({...e,a:Number(t)})}],to:He,from:Ue},qi={inputProps:{type:"text"},inputs:[{label:"HEXA",getValue:e=>e,getColor:(e,t)=>t}],to:Xe,from:function(e){return je(qe(e))}},Xi={rgb:{...Gi,inputs:Gi.inputs?.slice(0,3)},rgba:Gi,hsl:{...Ki,inputs:Ki.inputs.slice(0,3)},hsla:Ki,hex:{...qi,inputs:[{label:"HEX",getValue:e=>e.slice(0,7),getColor:(e,t)=>t}]},hexa:qi},Zi=e=>{let{label:a,...l}=e
return t.createVNode("div",{class:"v-color-picker-edit__input"},[t.createVNode("input",l,null),t.createVNode("span",null,[a])])},Ji=st({name:"VColorPickerEdit",props:a({color:Object,disabled:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(Xi).includes(e)},modes:{type:Array,default:()=>Object.keys(Xi),validator:e=>Array.isArray(e)&&e.every((e=>Object.keys(Xi).includes(e)))},...l()},"VColorPickerEdit")(),emits:{"update:color":e=>!0,"update:mode":e=>!0},setup(e,a){let{emit:l}=a
const o=t.computed((()=>e.modes.map((e=>({...Xi[e],name:e}))))),n=t.computed((()=>{const t=o.value.find((t=>t.name===e.mode))
if(!t)return[]
const a=e.color?t.to(e.color):null
return t.inputs?.map((o=>{let{getValue:n,getColor:r,...i}=o
return{...t.inputProps,...i,disabled:e.disabled,value:a&&n(a),onChange:e=>{const o=e.target
o&&l("update:color",t.from(r(a??Yi,o.value)))}}}))}))
return kt((()=>t.createVNode("div",{class:["v-color-picker-edit",e.class],style:e.style},[n.value?.map((e=>t.createVNode(Zi,e,null))),o.value.length>1&&t.createVNode(bo,{icon:"$unfold",size:"x-small",variant:"plain",onClick:()=>{const t=o.value.findIndex((t=>t.name===e.mode))
l("update:mode",o.value[(t+1)%o.value.length].name)}},null)]))),{}}}),Qi=Symbol.for("vuetify:v-slider")
function es(e,t,a){const l="vertical"===a,o=t.getBoundingClientRect(),n="touches"in e?e.touches[0]:e
return l?n.clientY-(o.top+o.height/2):n.clientX-(o.left+o.width/2)}const ts=a({disabled:{type:Boolean,default:null},error:Boolean,readonly:{type:Boolean,default:null},max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:0},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>"boolean"==typeof e||"always"===e},thumbSize:{type:[Number,String],default:20},showTicks:{type:[Boolean,String],default:!1,validator:e=>"boolean"==typeof e||"always"===e},ticks:{type:[Array,Object]},tickSize:{type:[Number,String],default:2},color:String,trackColor:String,trackFillColor:String,trackSize:{type:[Number,String],default:4},direction:{type:String,default:"horizontal",validator:e=>["vertical","horizontal"].includes(e)},reverse:Boolean,...Ka(),...Ya({elevation:2})},"Slider"),as=e=>{const a=t.computed((()=>parseFloat(e.min))),l=t.computed((()=>parseFloat(e.max))),o=t.computed((()=>+e.step>0?parseFloat(e.step):0)),n=t.computed((()=>Math.max(E(o.value),E(a.value))))
return{min:a,max:l,step:o,decimals:n,roundValue:function(e){if(e=parseFloat(e),o.value<=0)return e
const t=A(e,a.value,l.value),r=a.value%o.value,i=Math.round((t-r)/o.value)*o.value+r
return parseFloat(Math.min(i,l.value).toFixed(n.value))}}},ls=e=>{let{props:a,steps:l,onSliderStart:o,onSliderMove:n,onSliderEnd:r,getActiveThumb:i}=e
const{isRtl:s}=Yt(),u=t.toRef(a,"reverse"),c=t.computed((()=>"vertical"===a.direction)),d=t.computed((()=>c.value!==u.value)),{min:v,max:p,step:f,decimals:g,roundValue:h}=l,y=t.computed((()=>parseInt(a.thumbSize,10))),b=t.computed((()=>parseInt(a.tickSize,10))),V=t.computed((()=>parseInt(a.trackSize,10))),w=t.computed((()=>(p.value-v.value)/f.value)),S=t.toRef(a,"disabled"),k=t.computed((()=>a.error||a.disabled?void 0:a.thumbColor??a.color)),x=t.computed((()=>a.error||a.disabled?void 0:a.trackColor??a.color)),C=t.computed((()=>a.error||a.disabled?void 0:a.trackFillColor??a.color)),N=t.shallowRef(!1),_=t.shallowRef(0),I=t.ref(),B=t.ref()
function R(e){const t="vertical"===a.direction,l=t?"top":"left",o=t?"height":"width",n=t?"clientY":"clientX",{[l]:r,[o]:i}=I.value?.$el.getBoundingClientRect(),u=function(e,t){return"touches"in e&&e.touches.length?e.touches[0][t]:"changedTouches"in e&&e.changedTouches.length?e.changedTouches[0][t]:e[t]}(e,n)
let c=Math.min(Math.max((u-r-_.value)/i,0),1)||0
return(t?d.value:d.value!==s.value)&&(c=1-c),h(v.value+c*(p.value-v.value))}const E=e=>{r({value:R(e)}),N.value=!1,_.value=0},T=e=>{B.value=i(e),B.value&&(B.value.focus(),N.value=!0,B.value.contains(e.target)?_.value=es(e,B.value,a.direction):(_.value=0,n({value:R(e)})),o({value:R(e)}))},P={passive:!0,capture:!0}
function $(e){n({value:R(e)})}function L(e){e.stopPropagation(),e.preventDefault(),E(e),window.removeEventListener("mousemove",$,P),window.removeEventListener("mouseup",L)}function M(e){E(e),window.removeEventListener("touchmove",$,P),e.target?.removeEventListener("touchend",M)}const F=e=>{const t=(e-v.value)/(p.value-v.value)*100
return A(isNaN(t)?0:t,0,100)},D=t.toRef(a,"showTicks"),O=t.computed((()=>D.value?a.ticks?Array.isArray(a.ticks)?a.ticks.map((e=>({value:e,position:F(e),label:e.toString()}))):Object.keys(a.ticks).map((e=>({value:parseFloat(e),position:F(parseFloat(e)),label:a.ticks[e]}))):w.value!==1/0?m(w.value+1).map((e=>{const t=v.value+e*f.value
return{value:t,position:F(t)}})):[]:[])),z=t.computed((()=>O.value.some((e=>{let{label:t}=e
return!!t})))),j={activeThumbRef:B,color:t.toRef(a,"color"),decimals:g,disabled:S,direction:t.toRef(a,"direction"),elevation:t.toRef(a,"elevation"),hasLabels:z,isReversed:u,indexFromEnd:d,min:v,max:p,mousePressed:N,numTicks:w,onSliderMousedown:function(e){e.preventDefault(),T(e),window.addEventListener("mousemove",$,P),window.addEventListener("mouseup",L,{passive:!1})},onSliderTouchstart:function(e){T(e),window.addEventListener("touchmove",$,P),e.target?.addEventListener("touchend",M,{passive:!1})},parsedTicks:O,parseMouseMove:R,position:F,readonly:t.toRef(a,"readonly"),rounded:t.toRef(a,"rounded"),roundValue:h,showTicks:D,startOffset:_,step:f,thumbSize:y,thumbColor:k,thumbLabel:t.toRef(a,"thumbLabel"),ticks:t.toRef(a,"ticks"),tickSize:b,trackColor:x,trackContainerRef:I,trackFillColor:C,trackSize:V,vertical:c}
return t.provide(Qi,j),j},os=a({focused:Boolean,max:{type:Number,required:!0},min:{type:Number,required:!0},modelValue:{type:Number,required:!0},position:{type:Number,required:!0},ripple:{type:[Boolean,Object],default:!0},...l()},"VSliderThumb"),ns=ut()({name:"VSliderThumb",directives:{Ripple:ho},props:os(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=t.inject(Qi),{isRtl:r,rtlClasses:i}=Yt()
if(!n)throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider")
const{thumbColor:s,step:u,disabled:c,thumbSize:d,thumbLabel:v,direction:p,isReversed:f,vertical:m,readonly:h,elevation:y,mousePressed:b,decimals:w,indexFromEnd:S}=n,{textColorClasses:k,textColorStyles:x}=Ua(s),{pageup:C,pagedown:N,end:_,home:I,left:B,right:R,down:A,up:E}=V,T=[C,N,_,I,B,R,A,E],P=t.computed((()=>u.value?[1,2,3]:[1,5,10]))
function $(t){const a=function(t,a){if(!T.includes(t.key))return
t.preventDefault()
const l=u.value||.1,o=(e.max-e.min)/l
if([B,R,A,E].includes(t.key)){const e=(m.value?[r.value?B:R,f.value?A:E]:S.value!==r.value?[B,E]:[R,E]).includes(t.key)?1:-1,o=t.shiftKey?2:t.ctrlKey?1:0
a+=e*l*P.value[o]}else t.key===I?a=e.min:t.key===_?a=e.max:a-=(t.key===N?1:-1)*l*(o>100?o/10:10)
return Math.max(e.min,Math.min(e.max,a))}(t,e.modelValue)
null!=a&&o("update:modelValue",a)}return kt((()=>{const a=g(S.value?100-e.position:e.position,"%"),{elevationClasses:o}=Ga(t.computed((()=>c.value?void 0:y.value)))
return t.createVNode("div",{class:["v-slider-thumb",{"v-slider-thumb--focused":e.focused,"v-slider-thumb--pressed":e.focused&&b.value},e.class,i.value],style:[{"--v-slider-thumb-position":a,"--v-slider-thumb-size":g(d.value)},e.style],role:"slider",tabindex:c.value?-1:0,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,"aria-readonly":!!h.value,"aria-orientation":p.value,onKeydown:h.value?void 0:$},[t.createVNode("div",{class:["v-slider-thumb__surface",k.value,o.value],style:{...x.value}},null),t.withDirectives(t.createVNode("div",{class:["v-slider-thumb__ripple",k.value],style:x.value},null),[[t.resolveDirective("ripple"),e.ripple,null,{circle:!0,center:!0}]]),t.createVNode(ya,{origin:"bottom center"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-slider-thumb__label-container"},[t.createVNode("div",{class:["v-slider-thumb__label"]},[t.createVNode("div",null,[l["thumb-label"]?.({modelValue:e.modelValue})??e.modelValue.toFixed(u.value?w.value:1)])])]),[[t.vShow,v.value&&e.focused||"always"===v.value]])]})])})),{}}}),rs=a({start:{type:Number,required:!0},stop:{type:Number,required:!0},...l()},"VSliderTrack"),is=ut()({name:"VSliderTrack",props:rs(),emits:{},setup(e,a){let{slots:l}=a
const o=t.inject(Qi)
if(!o)throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider")
const{color:n,parsedTicks:r,rounded:i,showTicks:s,tickSize:u,trackColor:c,trackFillColor:d,trackSize:v,vertical:p,min:f,max:m,indexFromEnd:h}=o,{roundedClasses:y}=qa(i),{backgroundColorClasses:b,backgroundColorStyles:V}=Wa(d),{backgroundColorClasses:w,backgroundColorStyles:S}=Wa(c),k=t.computed((()=>`inset-${p.value?"block":"inline"}-${h.value?"end":"start"}`)),x=t.computed((()=>p.value?"height":"width")),C=t.computed((()=>({[k.value]:"0%",[x.value]:"100%"}))),N=t.computed((()=>e.stop-e.start)),_=t.computed((()=>({[k.value]:g(e.start,"%"),[x.value]:g(N.value,"%")}))),I=t.computed((()=>{if(!s.value)return[]
return(p.value?r.value.slice().reverse():r.value).map(((a,o)=>{const n=a.value!==f.value&&a.value!==m.value?g(a.position,"%"):void 0
return t.createVNode("div",{key:a.value,class:["v-slider-track__tick",{"v-slider-track__tick--filled":a.position>=e.start&&a.position<=e.stop,"v-slider-track__tick--first":a.value===f.value,"v-slider-track__tick--last":a.value===m.value}],style:{[k.value]:n}},[(a.label||l["tick-label"])&&t.createVNode("div",{class:"v-slider-track__tick-label"},[l["tick-label"]?.({tick:a,index:o})??a.label])])}))}))
return kt((()=>t.createVNode("div",{class:["v-slider-track",y.value,e.class],style:[{"--v-slider-track-size":g(v.value),"--v-slider-tick-size":g(u.value)},e.style]},[t.createVNode("div",{class:["v-slider-track__background",w.value,{"v-slider-track__background--opacity":!!n.value||!d.value}],style:{...C.value,...S.value}},null),t.createVNode("div",{class:["v-slider-track__fill",b.value],style:{..._.value,...V.value}},null),s.value&&t.createVNode("div",{class:["v-slider-track__ticks",{"v-slider-track__ticks--always-show":"always"===s.value}]},[I.value])]))),{}}}),ss=a({...Oo(),...ts(),...Go(),modelValue:{type:[Number,String],default:0}},"VSlider"),us=ut()({name:"VSlider",props:ss(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,start:e=>!0,end:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=t.ref(),{rtlClasses:r}=Yt(),i=as(e),s=$t(e,"modelValue",void 0,(e=>i.roundValue(null==e?i.min.value:e))),{min:u,max:c,mousePressed:d,roundValue:v,onSliderMousedown:p,onSliderTouchstart:f,trackContainerRef:m,position:g,hasLabels:h,readonly:y}=ls({props:e,steps:i,onSliderStart:()=>{o("start",s.value)},onSliderEnd:e=>{let{value:t}=e
const a=v(t)
s.value=a,o("end",a)},onSliderMove:e=>{let{value:t}=e
return s.value=v(t)},getActiveThumb:()=>n.value?.$el}),{isFocused:b,focus:V,blur:w}=zo(e),S=t.computed((()=>g(s.value)))
return kt((()=>{const[a,o]=Ko.filterProps(e),i=!!(e.label||l.label||l.prepend)
return t.createVNode(Ko,t.mergeProps({class:["v-slider",{"v-slider--has-labels":!!l["tick-label"]||h.value,"v-slider--focused":b.value,"v-slider--pressed":d.value,"v-slider--disabled":e.disabled},r.value,e.class],style:e.style},a,{focused:b.value}),{...l,prepend:i?a=>t.createVNode(t.Fragment,null,[l.label?.(a)??(e.label?t.createVNode(Io,{id:a.id.value,class:"v-slider__label",text:e.label},null):void 0),l.prepend?.(a)]):void 0,default:a=>{let{id:o,messagesId:r}=a
return t.createVNode("div",{class:"v-slider__container",onMousedown:y.value?void 0:p,onTouchstartPassive:y.value?void 0:f},[t.createVNode("input",{id:o.value,name:e.name||o.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:s.value},null),t.createVNode(is,{ref:m,start:0,stop:S.value},{"tick-label":l["tick-label"]}),t.createVNode(ns,{ref:n,"aria-describedby":r.value,focused:b.value,min:u.value,max:c.value,modelValue:s.value,"onUpdate:modelValue":e=>s.value=e,position:S.value,elevation:e.elevation,onFocus:V,onBlur:w},{"thumb-label":l["thumb-label"]})])}})})),{}}}),cs=st({name:"VColorPickerPreview",props:a({color:{type:Object},disabled:Boolean,hideAlpha:Boolean,...l()},"VColorPickerPreview")(),emits:{"update:color":e=>!0},setup(e,a){let{emit:l}=a
return kt((()=>t.createVNode("div",{class:["v-color-picker-preview",{"v-color-picker-preview--hide-alpha":e.hideAlpha},e.class],style:e.style},[t.createVNode("div",{class:"v-color-picker-preview__dot"},[t.createVNode("div",{style:{background:Ye(e.color??Yi)}},null)]),t.createVNode("div",{class:"v-color-picker-preview__sliders"},[t.createVNode(us,{class:"v-color-picker-preview__track v-color-picker-preview__hue",modelValue:e.color?.h,"onUpdate:modelValue":t=>l("update:color",{...e.color??Yi,h:t}),step:0,min:0,max:360,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null),!e.hideAlpha&&t.createVNode(us,{class:"v-color-picker-preview__track v-color-picker-preview__alpha",modelValue:e.color?.a??1,"onUpdate:modelValue":t=>l("update:color",{...e.color??Yi,a:t}),step:1/256,min:0,max:1,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null)])]))),{}}}),ds=Object.freeze({base:"#f44336",lighten5:"#ffebee",lighten4:"#ffcdd2",lighten3:"#ef9a9a",lighten2:"#e57373",lighten1:"#ef5350",darken1:"#e53935",darken2:"#d32f2f",darken3:"#c62828",darken4:"#b71c1c",accent1:"#ff8a80",accent2:"#ff5252",accent3:"#ff1744",accent4:"#d50000"}),vs=Object.freeze({base:"#e91e63",lighten5:"#fce4ec",lighten4:"#f8bbd0",lighten3:"#f48fb1",lighten2:"#f06292",lighten1:"#ec407a",darken1:"#d81b60",darken2:"#c2185b",darken3:"#ad1457",darken4:"#880e4f",accent1:"#ff80ab",accent2:"#ff4081",accent3:"#f50057",accent4:"#c51162"}),ps=Object.freeze({base:"#9c27b0",lighten5:"#f3e5f5",lighten4:"#e1bee7",lighten3:"#ce93d8",lighten2:"#ba68c8",lighten1:"#ab47bc",darken1:"#8e24aa",darken2:"#7b1fa2",darken3:"#6a1b9a",darken4:"#4a148c",accent1:"#ea80fc",accent2:"#e040fb",accent3:"#d500f9",accent4:"#aa00ff"}),fs=Object.freeze({base:"#673ab7",lighten5:"#ede7f6",lighten4:"#d1c4e9",lighten3:"#b39ddb",lighten2:"#9575cd",lighten1:"#7e57c2",darken1:"#5e35b1",darken2:"#512da8",darken3:"#4527a0",darken4:"#311b92",accent1:"#b388ff",accent2:"#7c4dff",accent3:"#651fff",accent4:"#6200ea"}),ms=Object.freeze({base:"#3f51b5",lighten5:"#e8eaf6",lighten4:"#c5cae9",lighten3:"#9fa8da",lighten2:"#7986cb",lighten1:"#5c6bc0",darken1:"#3949ab",darken2:"#303f9f",darken3:"#283593",darken4:"#1a237e",accent1:"#8c9eff",accent2:"#536dfe",accent3:"#3d5afe",accent4:"#304ffe"}),gs=Object.freeze({base:"#2196f3",lighten5:"#e3f2fd",lighten4:"#bbdefb",lighten3:"#90caf9",lighten2:"#64b5f6",lighten1:"#42a5f5",darken1:"#1e88e5",darken2:"#1976d2",darken3:"#1565c0",darken4:"#0d47a1",accent1:"#82b1ff",accent2:"#448aff",accent3:"#2979ff",accent4:"#2962ff"}),hs=Object.freeze({base:"#03a9f4",lighten5:"#e1f5fe",lighten4:"#b3e5fc",lighten3:"#81d4fa",lighten2:"#4fc3f7",lighten1:"#29b6f6",darken1:"#039be5",darken2:"#0288d1",darken3:"#0277bd",darken4:"#01579b",accent1:"#80d8ff",accent2:"#40c4ff",accent3:"#00b0ff",accent4:"#0091ea"}),ys=Object.freeze({base:"#00bcd4",lighten5:"#e0f7fa",lighten4:"#b2ebf2",lighten3:"#80deea",lighten2:"#4dd0e1",lighten1:"#26c6da",darken1:"#00acc1",darken2:"#0097a7",darken3:"#00838f",darken4:"#006064",accent1:"#84ffff",accent2:"#18ffff",accent3:"#00e5ff",accent4:"#00b8d4"}),bs=Object.freeze({base:"#009688",lighten5:"#e0f2f1",lighten4:"#b2dfdb",lighten3:"#80cbc4",lighten2:"#4db6ac",lighten1:"#26a69a",darken1:"#00897b",darken2:"#00796b",darken3:"#00695c",darken4:"#004d40",accent1:"#a7ffeb",accent2:"#64ffda",accent3:"#1de9b6",accent4:"#00bfa5"}),Vs=Object.freeze({base:"#4caf50",lighten5:"#e8f5e9",lighten4:"#c8e6c9",lighten3:"#a5d6a7",lighten2:"#81c784",lighten1:"#66bb6a",darken1:"#43a047",darken2:"#388e3c",darken3:"#2e7d32",darken4:"#1b5e20",accent1:"#b9f6ca",accent2:"#69f0ae",accent3:"#00e676",accent4:"#00c853"}),ws=Object.freeze({base:"#8bc34a",lighten5:"#f1f8e9",lighten4:"#dcedc8",lighten3:"#c5e1a5",lighten2:"#aed581",lighten1:"#9ccc65",darken1:"#7cb342",darken2:"#689f38",darken3:"#558b2f",darken4:"#33691e",accent1:"#ccff90",accent2:"#b2ff59",accent3:"#76ff03",accent4:"#64dd17"}),Ss=Object.freeze({base:"#cddc39",lighten5:"#f9fbe7",lighten4:"#f0f4c3",lighten3:"#e6ee9c",lighten2:"#dce775",lighten1:"#d4e157",darken1:"#c0ca33",darken2:"#afb42b",darken3:"#9e9d24",darken4:"#827717",accent1:"#f4ff81",accent2:"#eeff41",accent3:"#c6ff00",accent4:"#aeea00"}),ks=Object.freeze({base:"#ffeb3b",lighten5:"#fffde7",lighten4:"#fff9c4",lighten3:"#fff59d",lighten2:"#fff176",lighten1:"#ffee58",darken1:"#fdd835",darken2:"#fbc02d",darken3:"#f9a825",darken4:"#f57f17",accent1:"#ffff8d",accent2:"#ffff00",accent3:"#ffea00",accent4:"#ffd600"}),xs=Object.freeze({base:"#ffc107",lighten5:"#fff8e1",lighten4:"#ffecb3",lighten3:"#ffe082",lighten2:"#ffd54f",lighten1:"#ffca28",darken1:"#ffb300",darken2:"#ffa000",darken3:"#ff8f00",darken4:"#ff6f00",accent1:"#ffe57f",accent2:"#ffd740",accent3:"#ffc400",accent4:"#ffab00"}),Cs=Object.freeze({base:"#ff9800",lighten5:"#fff3e0",lighten4:"#ffe0b2",lighten3:"#ffcc80",lighten2:"#ffb74d",lighten1:"#ffa726",darken1:"#fb8c00",darken2:"#f57c00",darken3:"#ef6c00",darken4:"#e65100",accent1:"#ffd180",accent2:"#ffab40",accent3:"#ff9100",accent4:"#ff6d00"}),Ns=Object.freeze({base:"#ff5722",lighten5:"#fbe9e7",lighten4:"#ffccbc",lighten3:"#ffab91",lighten2:"#ff8a65",lighten1:"#ff7043",darken1:"#f4511e",darken2:"#e64a19",darken3:"#d84315",darken4:"#bf360c",accent1:"#ff9e80",accent2:"#ff6e40",accent3:"#ff3d00",accent4:"#dd2c00"}),_s=Object.freeze({base:"#795548",lighten5:"#efebe9",lighten4:"#d7ccc8",lighten3:"#bcaaa4",lighten2:"#a1887f",lighten1:"#8d6e63",darken1:"#6d4c41",darken2:"#5d4037",darken3:"#4e342e",darken4:"#3e2723"}),Is=Object.freeze({base:"#607d8b",lighten5:"#eceff1",lighten4:"#cfd8dc",lighten3:"#b0bec5",lighten2:"#90a4ae",lighten1:"#78909c",darken1:"#546e7a",darken2:"#455a64",darken3:"#37474f",darken4:"#263238"}),Bs=Object.freeze({base:"#9e9e9e",lighten5:"#fafafa",lighten4:"#f5f5f5",lighten3:"#eeeeee",lighten2:"#e0e0e0",lighten1:"#bdbdbd",darken1:"#757575",darken2:"#616161",darken3:"#424242",darken4:"#212121"}),Rs=Object.freeze({black:"#000000",white:"#ffffff",transparent:"#ffffff00"})
var As=Object.freeze({red:ds,pink:vs,purple:ps,deepPurple:fs,indigo:ms,blue:gs,lightBlue:hs,cyan:ys,teal:bs,green:Vs,lightGreen:ws,lime:Ss,yellow:ks,amber:xs,orange:Cs,deepOrange:Ns,brown:_s,blueGrey:Is,grey:Bs,shades:Rs})
const Es=st({name:"VColorPickerSwatches",props:a({swatches:{type:Array,default:()=>function(e){return Object.keys(e).map((t=>{const a=e[t]
return a.base?[a.base,a.darken4,a.darken3,a.darken2,a.darken1,a.lighten1,a.lighten2,a.lighten3,a.lighten4,a.lighten5]:[a.black,a.white,a.transparent]}))}(As)},disabled:Boolean,color:Object,maxHeight:[Number,String],...l()},"VColorPickerSwatches")(),emits:{"update:color":e=>!0},setup(e,a){let{emit:l}=a
return kt((()=>t.createVNode("div",{class:["v-color-picker-swatches",e.class],style:[{maxHeight:g(e.maxHeight)},e.style]},[t.createVNode("div",null,[e.swatches.map((a=>t.createVNode("div",{class:"v-color-picker-swatches__swatch"},[a.map((a=>{const o=De(a),n=je(o),r=We(o)
return t.createVNode("div",{class:"v-color-picker-swatches__color",onClick:()=>n&&l("update:color",n)},[t.createVNode("div",{style:{background:r}},[e.color&&v(e.color,n)?t.createVNode($l,{size:"x-small",icon:"$success",color:et(a,"#FFFFFF")>2?"white":"black"},null):void 0])])}))])))])]))),{}}}),Ts=a({color:String,...za(),...l(),...Aa(),...Ya(),...Ol(),...Kl(),...Ka(),...la(),...Kt()},"VSheet"),Ps=ut()({name:"VSheet",props:Ts(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{backgroundColorClasses:n,backgroundColorStyles:r}=Wa(t.toRef(e,"color")),{borderClasses:i}=ja(e),{dimensionStyles:s}=Ea(e),{elevationClasses:u}=Ga(e),{locationStyles:c}=zl(e),{positionClasses:d}=ql(e),{roundedClasses:v}=qa(e)
return kt((()=>t.createVNode(e.tag,{class:["v-sheet",o.value,n.value,i.value,u.value,d.value,v.value,e.class],style:[r.value,s.value,c.value,e.style]},l))),{}}}),$s=st({name:"VColorPicker",props:a({canvasHeight:{type:[String,Number],default:150},disabled:Boolean,dotSize:{type:[Number,String],default:10},hideCanvas:Boolean,hideSliders:Boolean,hideInputs:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(Xi).includes(e)},modes:{type:Array,default:()=>Object.keys(Xi),validator:e=>Array.isArray(e)&&e.every((e=>Object.keys(Xi).includes(e)))},showSwatches:Boolean,swatches:Array,swatchesMaxHeight:{type:[Number,String],default:150},modelValue:{type:[Object,String]},...x(Ts({width:300}),["height","location","minHeight","maxHeight","minWidth","maxWidth"])},"VColorPicker")(),emits:{"update:modelValue":e=>!0,"update:mode":e=>!0},setup(e){const a=$t(e,"mode"),l=t.ref(null),o=$t(e,"modelValue",void 0,(e=>{if(null==e||""===e)return null
let t
try{t=je(De(e))}catch(e){return ke(e),null}return l.value&&(t={...t,h:l.value.h},l.value=null),t}),(t=>t?function(e,t){if(null==t||"string"==typeof t){const t=Xe(e)
return 1===e.a?t.slice(0,7):t}if("object"==typeof t){let a
return S(t,["r","g","b"])?a=Oe(e):S(t,["h","s","l"])?a=He(e):S(t,["h","s","v"])&&(a=e),function(e,t){if(t){const{a:t,...a}=e
return a}return e}(a,!S(t,["a"])&&1===e.a)}return e}(t,e.modelValue):null)),{rtlClasses:n}=Yt(),r=e=>{o.value=e,l.value=e}
return t.onMounted((()=>{e.modes.includes(a.value)||(a.value=e.modes[0])})),nt({VSlider:{color:void 0,trackColor:void 0,trackFillColor:void 0}}),kt((()=>{const[l]=Ps.filterProps(e)
return t.createVNode(Ps,t.mergeProps({rounded:e.rounded,elevation:e.elevation,theme:e.theme,class:["v-color-picker",n.value,e.class],style:[{"--v-color-picker-color-hsv":Ye({...o.value??Yi,a:1})},e.style]},l,{maxWidth:e.width}),{default:()=>[!e.hideCanvas&&t.createVNode(Wi,{key:"canvas",color:o.value,"onUpdate:color":r,disabled:e.disabled,dotSize:e.dotSize,width:e.width,height:e.canvasHeight},null),(!e.hideSliders||!e.hideInputs)&&t.createVNode("div",{key:"controls",class:"v-color-picker__controls"},[!e.hideSliders&&t.createVNode(cs,{key:"preview",color:o.value,"onUpdate:color":r,hideAlpha:!a.value.endsWith("a"),disabled:e.disabled},null),!e.hideInputs&&t.createVNode(Ji,{key:"edit",modes:e.modes,mode:a.value,"onUpdate:mode":e=>a.value=e,color:o.value,"onUpdate:color":r,disabled:e.disabled},null)]),e.showSwatches&&t.createVNode(Es,{key:"swatches",color:o.value,"onUpdate:color":r,maxHeight:e.swatchesMaxHeight,swatches:e.swatches,disabled:e.disabled},null)]})})),{}}})
const Ls=a({autoSelectFirst:{type:[Boolean,String]},delimiters:Array,...li({filterKeys:["title"]}),...Qr({hideNoData:!0,returnObject:!0}),...x(Ur({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...$a({transition:!1})},"VCombobox"),Ms=ut()({name:"VCombobox",props:Ls(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:search":e=>!0,"update:menu":e=>!0},setup(e,a){let{emit:l,slots:n}=a
const{t:r}=Ut(),i=t.ref(),s=t.shallowRef(!1),u=t.shallowRef(!0),c=t.shallowRef(!1),d=t.ref(),v=t.ref(),p=$t(e,"menu"),f=t.computed({get:()=>p.value,set:e=>{p.value&&!e&&d.value?.ΨopenChildren||(p.value=e)}}),m=t.shallowRef(-1)
let g=!1
const h=t.computed((()=>i.value?.color)),y=t.computed((()=>f.value?e.closeText:e.openText)),{items:b,transformIn:V,transformOut:w}=Pn(e),{textColorClasses:S,textColorStyles:k}=Ua(h),x=$t(e,"modelValue",[],(e=>V(R(e))),(t=>{const a=w(t)
return e.multiple?a:a[0]??null})),C=Uo(),N=t.shallowRef(e.multiple?"":x.value[0]?.title??""),_=t.computed({get:()=>N.value,set:t=>{if(N.value=t??"",e.multiple||(x.value=[En(e,t)]),t&&e.multiple&&e.delimiters?.length){const a=t.split(new RegExp(`(?:${e.delimiters.join("|")})+`))
a.length>1&&(a.forEach((t=>{(t=t.trim())&&U(En(e,t))})),N.value="")}t||(m.value=-1),u.value=!t}})
t.watch(N,(e=>{g?t.nextTick((()=>g=!1)):s.value&&!f.value&&(f.value=!0),l("update:search",e)})),t.watch(x,(t=>{e.multiple||(N.value=t[0]?.title??"")}))
const{filteredItems:B,getMatches:A}=oi(e,b,(()=>u.value?"":_.value)),E=t.computed((()=>e.hideSelected?B.value.filter((e=>!x.value.some((t=>t.value===e.value)))):B.value)),T=t.computed((()=>x.value.map((e=>e.value)))),P=t.computed((()=>(!0===e.autoSelectFirst||"exact"===e.autoSelectFirst&&_.value===E.value[0]?.title)&&E.value.length>0&&!u.value&&!c.value)),$=t.computed((()=>e.hideNoData&&!b.value.length||e.readonly||C?.isReadonly.value)),L=t.ref(),{onListScroll:M,onListKeydown:F}=Jr(L,i)
function D(t){g=!0,e.openOnClear&&(f.value=!0)}function O(){$.value||(f.value=!0)}function z(e){$.value||(s.value&&(e.preventDefault(),e.stopPropagation()),f.value=!f.value)}function j(t){if(function(e){return e.isComposing&&I.includes(e.key)}(t)||e.readonly||C?.isReadonly.value)return
const a=i.value.selectionStart,l=x.value.length
if((m.value>-1||["Enter","ArrowDown","ArrowUp"].includes(t.key))&&t.preventDefault(),["Enter","ArrowDown"].includes(t.key)&&(f.value=!0),["Escape"].includes(t.key)&&(f.value=!1),["Enter","Escape","Tab"].includes(t.key)&&(P.value&&["Enter","Tab"].includes(t.key)&&U(B.value[0]),u.value=!0),"ArrowDown"===t.key&&P.value&&L.value?.focus("next"),e.multiple){if(["Backspace","Delete"].includes(t.key)){if(m.value<0)return void("Backspace"!==t.key||_.value||(m.value=l-1))
const e=m.value,a=x.value[m.value]
a&&!a.props.disabled&&U(a),m.value=e>=l-1?l-2:e}if("ArrowLeft"===t.key){if(m.value<0&&a>0)return
const e=m.value>-1?m.value-1:l-1
x.value[e]?m.value=e:(m.value=-1,i.value.setSelectionRange(_.value.length,_.value.length))}if("ArrowRight"===t.key){if(m.value<0)return
const e=m.value+1
x.value[e]?m.value=e:(m.value=-1,i.value.setSelectionRange(0,0))}"Enter"===t.key&&_.value&&(U(En(e,_.value)),_.value="")}}function H(){s.value&&(u.value=!0,i.value?.focus())}function U(a){if(e.multiple){const t=x.value.findIndex((t=>e.valueComparator(t.value,a.value)))
if(-1===t)x.value=[...x.value,a]
else{const e=[...x.value]
e.splice(t,1),x.value=e}_.value=""}else x.value=[a],N.value=a.title,t.nextTick((()=>{f.value=!1,u.value=!0}))}function W(e){s.value=!0,setTimeout((()=>{c.value=!0}))}function Y(e){c.value=!1}function G(t){(null==t||""===t&&!e.multiple)&&(x.value=[])}return t.watch(B,(t=>{!t.length&&e.hideNoData&&(f.value=!1)})),t.watch(s,((t,a)=>{t||t===a||(m.value=-1,f.value=!1,!P.value||c.value||x.value.some((e=>{let{value:t}=e
return t===E.value[0].value}))?e.multiple&&_.value&&(x.value=[...x.value,En(e,_.value)],_.value=""):U(E.value[0]))})),t.watch(f,(()=>{if(!e.hideSelected&&f.value&&x.value.length){const t=E.value.findIndex((t=>x.value.some((a=>e.valueComparator(a.value,t.value)))))
o&&window.requestAnimationFrame((()=>{t>=0&&v.value?.scrollToIndex(t)}))}})),kt((()=>{const a=!(!e.chips&&!n.chip),l=!!(!e.hideNoData||E.value.length||n["prepend-item"]||n["append-item"]||n["no-data"]),o=x.value.length>0,[c]=Wr.filterProps(e)
return t.createVNode(Wr,t.mergeProps({ref:i},c,{modelValue:_.value,"onUpdate:modelValue":[e=>_.value=e,G],focused:s.value,"onUpdate:focused":e=>s.value=e,validationValue:x.externalValue,counterValue:e.multiple?x.value.length:_.value.length,dirty:o,class:["v-combobox",{"v-combobox--active-menu":f.value,"v-combobox--chips":!!e.chips,"v-combobox--selection-slot":!!n.selection,"v-combobox--selecting-index":m.value>-1,["v-combobox--"+(e.multiple?"multiple":"single")]:!0},e.class],style:e.style,readonly:e.readonly,placeholder:o?void 0:e.placeholder,"onClick:clear":D,"onMousedown:control":O,onKeydown:j}),{...n,default:()=>t.createVNode(t.Fragment,null,[t.createVNode(Pr,t.mergeProps({ref:d,modelValue:f.value,"onUpdate:modelValue":e=>f.value=e,activator:"parent",contentClass:"v-combobox__content",disabled:$.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:H},e.menuProps),{default:()=>[l&&t.createVNode(Fn,{ref:L,selected:T.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onKeydown:F,onFocusin:W,onFocusout:Y,onScrollPassive:M,tabindex:"-1",color:e.itemColor??e.color},{default:()=>[n["prepend-item"]?.(),!E.value.length&&!e.hideNoData&&(n["no-data"]?.()??t.createVNode(xn,{title:r(e.noDataText)},null)),t.createVNode(Zr,{ref:v,renderless:!0,items:E.value},{default:a=>{let{item:l,index:o,itemRef:r}=a
const i=t.mergeProps(l.props,{ref:r,key:o,active:!(!P.value||0!==o)||void 0,onClick:()=>U(l)})
return n.item?.({item:l,index:o,props:i})??t.createVNode(xn,i,{prepend:a=>{let{isSelected:o}=a
return t.createVNode(t.Fragment,null,[e.multiple&&!e.hideSelected?t.createVNode(Lo,{key:l.value,modelValue:o,ripple:!1,tabindex:"-1"},null):void 0,l.props.prependIcon&&t.createVNode($l,{icon:l.props.prependIcon},null)])},title:()=>u.value?l.title:function(e,a,l){if(null==a)return e
if(Array.isArray(a))throw new Error("Multiple matches is not implemented")
return"number"==typeof a&&~a?t.createVNode(t.Fragment,null,[t.createVNode("span",{class:"v-combobox__unmask"},[e.substr(0,a)]),t.createVNode("span",{class:"v-combobox__mask"},[e.substr(a,l)]),t.createVNode("span",{class:"v-combobox__unmask"},[e.substr(a+l)])]):e}(l.title,A(l)?.title,_.value?.length??0)})}}),n["append-item"]?.()]})]}),x.value.map(((l,o)=>{const r={"onClick:close":function(e){e.stopPropagation(),e.preventDefault(),U(l)},onMousedown(e){e.preventDefault(),e.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0}
return t.createVNode("div",{key:l.value,class:["v-combobox__selection",o===m.value&&["v-combobox__selection--selected",S.value]],style:o===m.value?k.value:{}},[a?n.chip?t.createVNode(Ra,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:l.title}}},{default:()=>[n.chip?.({item:l,index:o,props:r})]}):t.createVNode(ln,t.mergeProps({key:"chip",closable:e.closableChips,size:"small",text:l.title,disabled:l.props.disabled},r),null):n.selection?.({item:l,index:o})??t.createVNode("span",{class:"v-combobox__selection-text"},[l.title,e.multiple&&o<x.value.length-1&&t.createVNode("span",{class:"v-combobox__selection-comma"},[t.createTextVNode(",")])])])}))]),"append-inner":function(){for(var a=arguments.length,l=new Array(a),o=0;o<a;o++)l[o]=arguments[o]
return t.createVNode(t.Fragment,null,[n["append-inner"]?.(...l),e.hideNoData&&!e.items.length||!e.menuIcon?void 0:t.createVNode($l,{class:"v-combobox__menu-icon",icon:e.menuIcon,onMousedown:z,onClick:J,"aria-label":r(y.value),title:r(y.value)},null)])}})})),Er({isFocused:s,isPristine:u,menu:f,search:_,selectionIndex:m,filteredItems:B,select:U},i)}}),Fs=a({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...Ir({origin:"center center",scrollStrategy:"block",transition:{component:da},zIndex:2400})},"VDialog"),Ds=ut()({name:"VDialog",props:Fs(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const n=$t(e,"modelValue"),{scopeId:r}=br(),i=t.ref()
function s(e){const t=e.relatedTarget,a=e.target
if(t!==a&&i.value?.contentEl&&i.value?.globalTop&&![document,i.value.contentEl].includes(a)&&!i.value.contentEl.contains(a)){const e=q(i.value.contentEl)
if(!e.length)return
const a=e[0],l=e[e.length-1]
t===a?l.focus():a.focus()}}o&&t.watch((()=>n.value&&e.retainFocus),(e=>{e?document.addEventListener("focusin",s):document.removeEventListener("focusin",s)}),{immediate:!0}),t.watch(n,(async e=>{await t.nextTick(),e?i.value.contentEl?.focus({preventScroll:!0}):i.value.activatorEl?.focus({preventScroll:!0})}))
const u=t.computed((()=>t.mergeProps({"aria-haspopup":"dialog","aria-expanded":String(n.value)},e.activatorProps)))
return kt((()=>{const[a]=Br.filterProps(e)
return t.createVNode(Br,t.mergeProps({ref:i,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},a,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:u.value,role:"dialog"},r),{activator:l.activator,default:function(){for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o]
return t.createVNode(Ra,{root:"VDialog"},{default:()=>[l.default?.(...a)]})}})})),Er({},i)}}),Os=Symbol.for("vuetify:v-expansion-panel"),zs=["default","accordion","inset","popout"],js=a({color:String,variant:{type:String,default:"default",validator:e=>zs.includes(e)},readonly:Boolean,...l(),...vl(),...la(),...Kt()},"VExpansionPanels"),Hs=ut()({name:"VExpansionPanels",props:js(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
ml(e,Os)
const{themeClasses:o}=Zt(e),n=t.computed((()=>e.variant&&`v-expansion-panels--variant-${e.variant}`))
return nt({VExpansionPanel:{color:t.toRef(e,"color")},VExpansionPanelTitle:{readonly:t.toRef(e,"readonly")}}),kt((()=>t.createVNode(e.tag,{class:["v-expansion-panels",o.value,n.value,e.class],style:e.style},l))),{}}}),Us=a({...l(),...hr()},"VExpansionPanelText"),Ws=ut()({name:"VExpansionPanelText",props:Us(),setup(e,a){let{slots:l}=a
const o=t.inject(Os)
if(!o)throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel")
const{hasContent:n,onAfterLeave:r}=yr(e,o.isSelected)
return kt((()=>t.createVNode(_a,{onAfterLeave:r},{default:()=>[t.withDirectives(t.createVNode("div",{class:["v-expansion-panel-text",e.class],style:e.style},[l.default&&n.value&&t.createVNode("div",{class:"v-expansion-panel-text__wrapper"},[l.default?.()])]),[[t.vShow,o.isSelected.value]])]}))),{}}}),Ys=a({color:String,expandIcon:{type:Sl,default:"$expand"},collapseIcon:{type:Sl,default:"$collapse"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1},readonly:Boolean,...l()},"VExpansionPanelTitle"),Gs=ut()({name:"VExpansionPanelTitle",directives:{Ripple:ho},props:Ys(),setup(e,a){let{slots:l}=a
const o=t.inject(Os)
if(!o)throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel")
const{backgroundColorClasses:n,backgroundColorStyles:r}=Wa(e,"color"),i=t.computed((()=>({collapseIcon:e.collapseIcon,disabled:o.disabled.value,expanded:o.isSelected.value,expandIcon:e.expandIcon,readonly:e.readonly})))
return kt((()=>t.withDirectives(t.createVNode("button",{class:["v-expansion-panel-title",{"v-expansion-panel-title--active":o.isSelected.value},n.value,e.class],style:[r.value,e.style],type:"button",tabindex:o.disabled.value?-1:void 0,disabled:o.disabled.value,"aria-expanded":o.isSelected.value,onClick:e.readonly?void 0:o.toggle},[t.createVNode("span",{class:"v-expansion-panel-title__overlay"},null),l.default?.(i.value),!e.hideActions&&t.createVNode("span",{class:"v-expansion-panel-title__icon"},[l.actions?l.actions(i.value):t.createVNode($l,{icon:o.isSelected.value?e.collapseIcon:e.expandIcon},null)])]),[[t.resolveDirective("ripple"),e.ripple]]))),{}}}),Ks=a({title:String,text:String,bgColor:String,...l(),...Ya(),...pl(),...hr(),...Ka(),...la(),...Ys()},"VExpansionPanel"),qs=ut()({name:"VExpansionPanel",props:Ks(),emits:{"group:selected":e=>!0},setup(e,a){let{slots:l}=a
const o=fl(e,Os),{backgroundColorClasses:n,backgroundColorStyles:r}=Wa(e,"bgColor"),{elevationClasses:i}=Ga(e),{roundedClasses:s}=qa(e),u=t.computed((()=>o?.disabled.value||e.disabled)),c=t.computed((()=>o.group.items.value.reduce(((e,t,a)=>(o.group.selected.value.includes(t.id)&&e.push(a),e)),[]))),d=t.computed((()=>{const e=o.group.items.value.findIndex((e=>e.id===o.id))
return!o.isSelected.value&&c.value.some((t=>t-e==1))})),v=t.computed((()=>{const e=o.group.items.value.findIndex((e=>e.id===o.id))
return!o.isSelected.value&&c.value.some((t=>t-e==-1))}))
return t.provide(Os,o),nt({VExpansionPanelText:{eager:t.toRef(e,"eager")}}),kt((()=>{const a=!(!l.text&&!e.text),c=!(!l.title&&!e.title)
return t.createVNode(e.tag,{class:["v-expansion-panel",{"v-expansion-panel--active":o.isSelected.value,"v-expansion-panel--before-active":d.value,"v-expansion-panel--after-active":v.value,"v-expansion-panel--disabled":u.value},s.value,n.value,e.class],style:[r.value,e.style]},{default:()=>[t.createVNode("div",{class:["v-expansion-panel__shadow",...i.value]},null),c&&t.createVNode(Gs,{key:"title",collapseIcon:e.collapseIcon,color:e.color,expandIcon:e.expandIcon,hideActions:e.hideActions,ripple:e.ripple},{default:()=>[l.title?l.title():e.title]}),a&&t.createVNode(Ws,{key:"text"},{default:()=>[l.text?l.text():e.text]}),l.default?.()]})})),{}}}),Xs=a({chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,showSize:{type:[Boolean,Number],default:!1,validator:e=>"boolean"==typeof e||[1e3,1024].includes(e)},...Go({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:e=>R(e).every((e=>null!=e&&"object"==typeof e))},...Or({clearable:!0})},"VFileInput"),Zs=ut()({name:"VFileInput",inheritAttrs:!1,props:Xs(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{t:r}=Ut(),i=$t(e,"modelValue"),{isFocused:s,focus:u,blur:c}=zo(e),d=t.computed((()=>"boolean"!=typeof e.showSize?e.showSize:void 0)),v=t.computed((()=>(i.value??[]).reduce(((e,t)=>{let{size:a=0}=t
return e+a}),0))),p=t.computed((()=>$(v.value,d.value))),f=t.computed((()=>(i.value??[]).map((t=>{const{name:a="",size:l=0}=t
return e.showSize?`${a} (${$(l,d.value)})`:a})))),m=t.computed((()=>{const t=i.value?.length??0
return e.showSize?r(e.counterSizeString,t,p.value):r(e.counterString,t)})),g=t.ref(),h=t.ref(),y=t.ref(),b=t.computed((()=>s.value||e.active)),V=t.computed((()=>["plain","underlined"].includes(e.variant)))
function w(){y.value!==document.activeElement&&y.value?.focus(),s.value||u()}function S(e){x(e)}function k(e){o("mousedown:control",e)}function x(e){y.value?.click(),o("click:control",e)}function C(a){a.stopPropagation(),w(),t.nextTick((()=>{i.value=[],K(e["onClick:clear"],a)}))}return t.watch(i,(e=>{(!Array.isArray(e)||!e.length)&&y.value&&(y.value.value="")})),kt((()=>{const a=!(!n.counter&&!e.counter),o=!(!a&&!n.details),[r,u]=B(l),[{modelValue:d,...N}]=Ko.filterProps(e),[_]=jr(e)
return t.createVNode(Ko,t.mergeProps({ref:g,modelValue:i.value,"onUpdate:modelValue":e=>i.value=e,class:["v-file-input",{"v-text-field--plain-underlined":V.value},e.class],style:e.style,"onClick:prepend":S},r,N,{centerAffix:!V.value,focused:s.value}),{...n,default:a=>{let{id:l,isDisabled:o,isDirty:r,isReadonly:d,isValid:m}=a
return t.createVNode(zr,t.mergeProps({ref:h,"prepend-icon":e.prependIcon,onMousedown:k,onClick:x,"onClick:clear":C,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},_,{id:l.value,active:b.value||r.value,dirty:r.value,disabled:o.value,focused:s.value,error:!1===m.value}),{...n,default:a=>{let{props:{class:l,...r}}=a
return t.createVNode(t.Fragment,null,[t.createVNode("input",t.mergeProps({ref:y,type:"file",readonly:d.value,disabled:o.value,multiple:e.multiple,name:e.name,onClick:e=>{e.stopPropagation(),d.value&&e.preventDefault(),w()},onChange:e=>{if(!e.target)return
const t=e.target
i.value=[...t.files??[]]},onFocus:w,onBlur:c},r,u),null),t.createVNode("div",{class:l},[!!i.value?.length&&(n.selection?n.selection({fileNames:f.value,totalBytes:v.value,totalBytesReadable:p.value}):e.chips?f.value.map((a=>t.createVNode(ln,{key:a,size:"small",color:e.color},{default:()=>[a]}))):f.value.join(", "))])])}})},details:o?e=>t.createVNode(t.Fragment,null,[n.details?.(e),a&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(Lr,{active:!!i.value?.length,value:m.value},n.counter)])]):void 0})})),Er({},g,h,y)}}),Js=a({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...za(),...l(),...Ya(),...It(),...Ka(),...la({tag:"footer"}),...Kt()},"VFooter"),Qs=ut()({name:"VFooter",props:Js(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{backgroundColorClasses:n,backgroundColorStyles:r}=Wa(t.toRef(e,"color")),{borderClasses:i}=ja(e),{elevationClasses:s}=Ga(e),{roundedClasses:u}=qa(e),c=t.shallowRef(32),{resizeRef:d}=xt((e=>{e.length&&(c.value=e[0].target.clientHeight)})),v=t.computed((()=>"auto"===e.height?c.value:parseInt(e.height,10))),{layoutItemStyles:p}=Rt({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.computed((()=>"bottom")),layoutSize:v,elementSize:t.computed((()=>"auto"===e.height?void 0:v.value)),active:t.computed((()=>e.app)),absolute:t.toRef(e,"absolute")})
return kt((()=>t.createVNode(e.tag,{ref:d,class:["v-footer",o.value,n.value,i.value,s.value,u.value,e.class],style:[r.value,e.app?p.value:{height:g(e.height)},e.style]},l))),{}}}),eu=a({...l(),...Ho()},"VForm"),tu=ut()({name:"VForm",props:eu(),emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=function(e){const a=$t(e,"modelValue"),l=t.computed((()=>e.disabled)),o=t.computed((()=>e.readonly)),n=t.shallowRef(!1),r=t.ref([]),i=t.ref([])
return t.watch(r,(()=>{let e=0,t=0
const l=[]
for(const a of r.value)!1===a.isValid?(t++,l.push({id:a.id,errorMessages:a.errorMessages})):!0===a.isValid&&e++
i.value=l,a.value=!(t>0)&&(e===r.value.length||null)}),{deep:!0}),t.provide(jo,{register:e=>{let{id:t,validate:a,reset:l,resetValidation:o}=e
r.value.some((e=>e.id===t))&&ke(`Duplicate input name "${t}"`),r.value.push({id:t,validate:a,reset:l,resetValidation:o,isValid:null,errorMessages:[]})},unregister:e=>{r.value=r.value.filter((t=>t.id!==e))},update:(e,t,a)=>{const l=r.value.find((t=>t.id===e))
l&&(l.isValid=t,l.errorMessages=a)},isDisabled:l,isReadonly:o,isValidating:n,isValid:a,items:r,validateOn:t.toRef(e,"validateOn")}),{errors:i,isDisabled:l,isReadonly:o,isValidating:n,isValid:a,items:r,validate:async function(){const t=[]
let a=!0
i.value=[],n.value=!0
for(const l of r.value){const o=await l.validate()
if(o.length>0&&(a=!1,t.push({id:l.id,errorMessages:o})),!a&&e.fastFail)break}return i.value=t,n.value=!1,{valid:a,errors:i.value}},reset:function(){r.value.forEach((e=>e.reset()))},resetValidation:function(){r.value.forEach((e=>e.resetValidation()))}}}(e),r=t.ref()
function i(e){e.preventDefault(),n.reset()}function s(e){const t=e,a=n.validate()
t.then=a.then.bind(a),t.catch=a.catch.bind(a),t.finally=a.finally.bind(a),o("submit",t),t.defaultPrevented||a.then((e=>{let{valid:t}=e
t&&r.value?.submit()})),t.preventDefault()}return kt((()=>t.createVNode("form",{ref:r,class:["v-form",e.class],style:e.style,novalidate:!0,onReset:i,onSubmit:s},[l.default?.(n)]))),Er(n,r)}}),au=a({fluid:{type:Boolean,default:!1},...l(),...la()},"VContainer"),lu=ut()({name:"VContainer",props:au(),setup(e,a){let{slots:l}=a
const{rtlClasses:o}=Yt()
return kt((()=>t.createVNode(e.tag,{class:["v-container",{"v-container--fluid":e.fluid},o.value,e.class],style:e.style},l))),{}}}),ou=sr.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}),nu=sr.reduce(((e,a)=>(e["offset"+t.capitalize(a)]={type:[String,Number],default:null},e)),{}),ru=sr.reduce(((e,a)=>(e["order"+t.capitalize(a)]={type:[String,Number],default:null},e)),{}),iu={col:Object.keys(ou),offset:Object.keys(nu),order:Object.keys(ru)}
function su(e,t,a){let l=e
if(null!=a&&!1!==a){if(t){l+=`-${t.replace(e,"")}`}return"col"===e&&(l="v-"+l),"col"!==e||""!==a&&!0!==a?(l+=`-${a}`,l.toLowerCase()):l.toLowerCase()}}const uu=["auto","start","end","center","baseline","stretch"],cu=a({cols:{type:[Boolean,String,Number],default:!1},...ou,offset:{type:[String,Number],default:null},...nu,order:{type:[String,Number],default:null},...ru,alignSelf:{type:String,default:null,validator:e=>uu.includes(e)},...l(),...la()},"VCol"),du=ut()({name:"VCol",props:cu(),setup(e,a){let{slots:l}=a
const o=t.computed((()=>{const t=[]
let a
for(a in iu)iu[a].forEach((l=>{const o=e[l],n=su(a,l,o)
n&&t.push(n)}))
const l=t.some((e=>e.startsWith("v-col-")))
return t.push({"v-col":!l||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),t}))
return()=>t.h(e.tag,{class:[o.value,e.class],style:e.style},l.default?.())}}),vu=["start","end","center"],pu=["space-between","space-around","space-evenly"]
function fu(e,a){return sr.reduce(((l,o)=>(l[e+t.capitalize(o)]=a(),l)),{})}const mu=[...vu,"baseline","stretch"],gu=e=>mu.includes(e),hu=fu("align",(()=>({type:String,default:null,validator:gu}))),yu=[...vu,...pu],bu=e=>yu.includes(e),Vu=fu("justify",(()=>({type:String,default:null,validator:bu}))),wu=[...vu,...pu,"stretch"],Su=e=>wu.includes(e),ku=fu("alignContent",(()=>({type:String,default:null,validator:Su}))),xu={align:Object.keys(hu),justify:Object.keys(Vu),alignContent:Object.keys(ku)},Cu={align:"align",justify:"justify",alignContent:"align-content"}
function Nu(e,t,a){let l=Cu[e]
if(null!=a){if(t){l+=`-${t.replace(e,"")}`}return l+=`-${a}`,l.toLowerCase()}}const _u=a({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:gu},...hu,justify:{type:String,default:null,validator:bu},...Vu,alignContent:{type:String,default:null,validator:Su},...ku,...l(),...la()},"VRow"),Iu=ut()({name:"VRow",props:_u(),setup(e,a){let{slots:l}=a
const o=t.computed((()=>{const t=[]
let a
for(a in xu)xu[a].forEach((l=>{const o=e[l],n=Nu(a,l,o)
n&&t.push(n)}))
return t.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),t}))
return()=>t.h(e.tag,{class:["v-row",o.value,e.class],style:e.style},l.default?.())}}),Bu=ct("v-spacer","div","VSpacer"),Ru=a({disabled:Boolean,modelValue:{type:Boolean,default:void 0},...or()},"VHover"),Au=ut()({name:"VHover",props:Ru(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t
const l=$t(e,"modelValue"),{runOpenDelay:o,runCloseDelay:n}=nr(e,(t=>!e.disabled&&(l.value=t)))
return()=>a.default?.({isHovering:l.value,props:{onMouseenter:o,onMouseleave:n}})}}),Eu=Symbol.for("vuetify:v-item-group"),Tu=a({...l(),...vl({selectedClass:"v-item--selected"}),...la(),...Kt()},"VItemGroup"),Pu=ut()({name:"VItemGroup",props:Tu(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{isSelected:n,select:r,next:i,prev:s,selected:u}=ml(e,Eu)
return()=>t.createVNode(e.tag,{class:["v-item-group",o.value,e.class],style:e.style},{default:()=>[l.default?.({isSelected:n,select:r,next:i,prev:s,selected:u.value})]})}}),$u=ut()({name:"VItem",props:pl(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:a}=t
const{isSelected:l,select:o,toggle:n,selectedClass:r,value:i,disabled:s}=fl(e,Eu)
return()=>a.default?.({isSelected:l.value,selectedClass:r.value,select:o,toggle:n,value:i.value,disabled:s.value})}}),Lu=ct("v-kbd"),Mu=a({...l(),..._t()},"VLayout"),Fu=ut()({name:"VLayout",props:Mu(),setup(e,a){let{slots:l}=a
const{layoutClasses:o,layoutStyles:n,getLayoutItem:r,items:i,layoutRef:s}=At(e)
return kt((()=>t.createVNode("div",{ref:s,class:[o.value,e.class],style:[n.value,e.style]},[l.default?.()]))),{getLayoutItem:r,items:i}}}),Du=a({position:{type:String,required:!0},size:{type:[Number,String],default:300},modelValue:Boolean,...l(),...It()},"VLayoutItem"),Ou=ut()({name:"VLayoutItem",props:Du(),setup(e,a){let{slots:l}=a
const{layoutItemStyles:o}=Rt({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef(e,"position"),elementSize:t.toRef(e,"size"),layoutSize:t.toRef(e,"size"),active:t.toRef(e,"modelValue"),absolute:t.toRef(e,"absolute")})
return()=>t.createVNode("div",{class:["v-layout-item",e.class],style:[o.value,e.style]},[l.default?.()])}}),zu=a({modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...l(),...Aa(),...la(),...$a({transition:"fade-transition"})},"VLazy"),ju=ut()({name:"VLazy",directives:{intersect:Fa},props:zu(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{dimensionStyles:o}=Ea(e),n=$t(e,"modelValue")
function r(e){n.value||(n.value=e)}return kt((()=>t.withDirectives(t.createVNode(e.tag,{class:["v-lazy",e.class],style:[o.value,e.style]},{default:()=>[n.value&&t.createVNode(La,{transition:e.transition,appear:!0},{default:()=>[l.default?.()]})]}),[[t.resolveDirective("intersect"),{handler:r,options:e.options},null]]))),{}}}),Hu=a({locale:String,fallbackLocale:String,messages:Object,rtl:{type:Boolean,default:void 0},...l()},"VLocaleProvider"),Uu=ut()({name:"VLocaleProvider",props:Hu(),setup(e,a){let{slots:l}=a
const{rtlClasses:o}=Wt(e)
return kt((()=>t.createVNode("div",{class:["v-locale-provider",o.value,e.class],style:e.style},[l.default?.()]))),{}}}),Wu=a({scrollable:Boolean,...l(),...la({tag:"main"})},"VMain"),Yu=ut()({name:"VMain",props:Wu(),setup(e,a){let{slots:l}=a
const{mainStyles:o}=Bt(),{ssrBootStyles:n}=el()
return kt((()=>t.createVNode(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[o.value,n.value,e.style]},{default:()=>[e.scrollable?t.createVNode("div",{class:"v-main__scroller"},[l.default?.()]):l.default?.()]}))),{}}})
function Gu(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function Ku(e){if(e.length<2)return 0
if(2===e.length)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t)
let t=0
for(let a=e.length-1;a>0;a--){if(e[a].t===e[a-1].t)continue
const l=Gu(t),o=(e[a].d-e[a-1].d)/(e[a].t-e[a-1].t)
t+=(o-l)*Math.abs(o),a===e.length-1&&(t*=.5)}return 1e3*Gu(t)}function qu(){const e={}
return{addMovement:function(t){Array.from(t.changedTouches).forEach((a=>{(e[a.identifier]??(e[a.identifier]=new j(20))).push([t.timeStamp,a])}))},endTouch:function(t){Array.from(t.changedTouches).forEach((t=>{delete e[t.identifier]}))},getVelocity:function(t){const a=e[t]?.values().reverse()
if(!a)throw new Error(`No samples for touch id ${t}`)
const l=a[0],o=[],n=[]
for(const e of a){if(l[0]-e[0]>100)break
o.push({t:e[0],d:e[1].clientX}),n.push({t:e[0],d:e[1].clientY})}return{x:Ku(o),y:Ku(n),get direction(){const{x:e,y:t}=this,[a,l]=[Math.abs(e),Math.abs(t)]
return a>l&&e>=0?"right":a>l&&e<=0?"left":l>a&&t>=0?"down":l>a&&t<=0?"up":function(){throw new Error}()}}}}}function Xu(){throw new Error}const Zu=["start","end","left","right","top","bottom"],Ju=a({color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:{type:Boolean,default:null},railWidth:{type:[Number,String],default:56},scrim:{type:[Boolean,String],default:!0},image:String,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>Zu.includes(e)},sticky:Boolean,...za(),...l(),...Ya(),...It(),...Ka(),...la({tag:"nav"}),...Kt()},"VNavigationDrawer"),Qu=ut()({name:"VNavigationDrawer",props:Ju(),emits:{"update:modelValue":e=>!0,"update:rail":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const{isRtl:r}=Yt(),{themeClasses:i}=Zt(e),{borderClasses:s}=ja(e),{backgroundColorClasses:u,backgroundColorStyles:c}=Wa(t.toRef(e,"color")),{elevationClasses:d}=Ga(e),{mobile:v}=mr(),{roundedClasses:p}=qa(e),f=Xl(),m=$t(e,"modelValue",null,(e=>!!e)),{ssrBootStyles:h}=el(),{scopeId:y}=br(),b=t.ref(),V=t.shallowRef(!1),w=t.computed((()=>e.rail&&e.expandOnHover&&V.value?Number(e.width):Number(e.rail?e.railWidth:e.width))),S=t.computed((()=>le(e.location,r.value))),k=t.computed((()=>!e.permanent&&(v.value||e.temporary))),x=t.computed((()=>e.sticky&&!k.value&&"bottom"!==S.value))
Pt((()=>e.expandOnHover&&null!=e.rail),(()=>{t.watch(V,(e=>o("update:rail",!e)))})),Pt((()=>!e.disableResizeWatcher),(()=>{t.watch(k,(a=>!e.permanent&&t.nextTick((()=>m.value=!a))))})),Pt((()=>!e.disableRouteWatcher&&!!f),(()=>{t.watch(f.currentRoute,(()=>k.value&&(m.value=!1)))})),t.watch((()=>e.permanent),(e=>{e&&(m.value=!0)})),t.onBeforeMount((()=>{null!=e.modelValue||k.value||(m.value=e.permanent||!v.value)}))
const{isDragging:C,dragProgress:N,dragStyles:_}=function(e){let{isActive:a,isTemporary:l,width:o,touchless:n,position:r}=e
t.onMounted((()=>{window.addEventListener("touchstart",y,{passive:!0}),window.addEventListener("touchmove",b,{passive:!1}),window.addEventListener("touchend",V,{passive:!0})})),t.onBeforeUnmount((()=>{window.removeEventListener("touchstart",y),window.removeEventListener("touchmove",b),window.removeEventListener("touchend",V)}))
const i=t.computed((()=>["left","right"].includes(r.value))),{addMovement:s,endTouch:u,getVelocity:c}=qu()
let d=!1
const v=t.shallowRef(!1),p=t.shallowRef(0),f=t.shallowRef(0)
let m
function g(e,t){return("left"===r.value?e:"right"===r.value?document.documentElement.clientWidth-e:"top"===r.value?e:"bottom"===r.value?document.documentElement.clientHeight-e:Xu())-(t?o.value:0)}function h(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
const a="left"===r.value?(e-f.value)/o.value:"right"===r.value?(document.documentElement.clientWidth-e-f.value)/o.value:"top"===r.value?(e-f.value)/o.value:"bottom"===r.value?(document.documentElement.clientHeight-e-f.value)/o.value:Xu()
return t?Math.max(0,Math.min(1,a)):a}function y(e){if(n.value)return
const t=e.changedTouches[0].clientX,c=e.changedTouches[0].clientY,v="left"===r.value?t<25:"right"===r.value?t>document.documentElement.clientWidth-25:"top"===r.value?c<25:"bottom"===r.value?c>document.documentElement.clientHeight-25:Xu(),y=a.value&&("left"===r.value?t<o.value:"right"===r.value?t>document.documentElement.clientWidth-o.value:"top"===r.value?c<o.value:"bottom"===r.value?c>document.documentElement.clientHeight-o.value:Xu());(v||y||a.value&&l.value)&&(d=!0,m=[t,c],f.value=g(i.value?t:c,a.value),p.value=h(i.value?t:c),u(e),s(e))}function b(e){const t=e.changedTouches[0].clientX,a=e.changedTouches[0].clientY
if(d){if(!e.cancelable)return void(d=!1)
const l=Math.abs(t-m[0]),o=Math.abs(a-m[1]);(i.value?l>o&&l>3:o>l&&o>3)?(v.value=!0,d=!1):(i.value?o:l)>3&&(d=!1)}if(!v.value)return
e.preventDefault(),s(e)
const l=h(i.value?t:a,!1)
p.value=Math.max(0,Math.min(1,l)),l>1?f.value=g(i.value?t:a,!0):l<0&&(f.value=g(i.value?t:a,!1))}function V(e){if(d=!1,!v.value)return
s(e),v.value=!1
const t=c(e.changedTouches[0].identifier),l=Math.abs(t.x),o=Math.abs(t.y),n=i.value?l>o&&l>400:o>l&&o>3
a.value=n?t.direction===({left:"right",right:"left",top:"down",bottom:"up"}[r.value]||Xu()):p.value>.5}const w=t.computed((()=>v.value?{transform:"left"===r.value?`translateX(calc(-100% + ${p.value*o.value}px))`:"right"===r.value?`translateX(calc(100% - ${p.value*o.value}px))`:"top"===r.value?`translateY(calc(-100% + ${p.value*o.value}px))`:"bottom"===r.value?`translateY(calc(100% - ${p.value*o.value}px))`:Xu(),transition:"none"}:void 0))
return{isDragging:v,dragProgress:p,dragStyles:w}}({isActive:m,isTemporary:k,width:w,touchless:t.toRef(e,"touchless"),position:S}),I=t.computed((()=>{const t=k.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):w.value
return C.value?t*N.value:t})),{layoutItemStyles:B,layoutItemScrimStyles:R}=Rt({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:S,layoutSize:I,elementSize:w,active:t.computed((()=>m.value||C.value)),disableTransitions:t.computed((()=>C.value)),absolute:t.computed((()=>e.absolute||x.value&&"string"!=typeof A.value))}),{isStuck:A,stickyStyles:E}=function(e){let{rootEl:a,isSticky:l,layoutItemStyles:o}=e
const n=t.shallowRef(!1),r=t.shallowRef(0),i=t.computed((()=>{const e="boolean"==typeof n.value?"top":n.value
return[l.value?{top:"auto",bottom:"auto",height:void 0}:void 0,n.value?{[e]:g(r.value)}:{top:o.value.top}]}))
t.onMounted((()=>{t.watch(l,(e=>{e?window.addEventListener("scroll",u,{passive:!0}):window.removeEventListener("scroll",u)}),{immediate:!0})})),t.onBeforeUnmount((()=>{window.removeEventListener("scroll",u)}))
let s=0
function u(){const e=s>window.scrollY?"up":"down",t=a.value.getBoundingClientRect(),l=parseFloat(o.value.top??0),i=window.scrollY-Math.max(0,r.value-l),u=t.height+Math.max(r.value,l)-window.scrollY-window.innerHeight,c=parseFloat(getComputedStyle(a.value).getPropertyValue("--v-body-scroll-y"))||0
t.height<window.innerHeight-l?(n.value="top",r.value=l):"up"===e&&"bottom"===n.value||"down"===e&&"top"===n.value?(r.value=window.scrollY+t.top-c,n.value=!0):"down"===e&&u<=0?(r.value=0,n.value="bottom"):"up"===e&&i<=0&&(c?"top"!==n.value&&(r.value=-i+c+l,n.value="top"):(r.value=t.top+i,n.value="top")),s=window.scrollY}return{isStuck:n,stickyStyles:i}}({rootEl:b,isSticky:x,layoutItemStyles:B}),T=Wa(t.computed((()=>"string"==typeof e.scrim?e.scrim:null))),P=t.computed((()=>({...C.value?{opacity:.2*N.value,transition:"none"}:void 0,...R.value})))
function $(){V.value=!0}function L(){V.value=!1}return nt({VList:{bgColor:"transparent"}}),kt((()=>{const a=n.image||e.image
return t.createVNode(t.Fragment,null,[t.createVNode(e.tag,t.mergeProps({ref:b,onMouseenter:$,onMouseleave:L,class:["v-navigation-drawer",`v-navigation-drawer--${S.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":V.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":k.value,"v-navigation-drawer--active":m.value,"v-navigation-drawer--sticky":x.value},i.value,u.value,s.value,d.value,p.value,e.class],style:[c.value,B.value,_.value,h.value,E.value,e.style]},y,l),{default:()=>[a&&t.createVNode("div",{key:"image",class:"v-navigation-drawer__img"},[n.image?n.image?.({image:e.image}):t.createVNode("img",{src:e.image,alt:""},null)]),n.prepend&&t.createVNode("div",{class:"v-navigation-drawer__prepend"},[n.prepend?.()]),t.createVNode("div",{class:"v-navigation-drawer__content"},[n.default?.()]),n.append&&t.createVNode("div",{class:"v-navigation-drawer__append"},[n.append?.()])]}),t.createVNode(t.Transition,{name:"fade-transition"},{default:()=>[k.value&&(C.value||m.value)&&!!e.scrim&&t.createVNode("div",t.mergeProps({class:["v-navigation-drawer__scrim",T.backgroundColorClasses.value],style:[P.value,T.backgroundColorStyles.value],onClick:()=>m.value=!1},y),null)]})])})),{isStuck:A}}}),ec=st({name:"VNoSsr",setup(e,t){let{slots:a}=t
const l=gr()
return()=>l.value&&a.default?.()}})
const tc=a({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1==0},totalVisible:[Number,String],firstIcon:{type:Sl,default:"$first"},prevIcon:{type:Sl,default:"$prev"},nextIcon:{type:Sl,default:"$next"},lastIcon:{type:Sl,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...za(),...l(),...ol(),...Ya(),...Ka(),...El(),...la({tag:"nav"}),...Kt(),...sl({variant:"text"})},"VPagination"),ac=ut()({name:"VPagination",props:tc(),emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=$t(e,"modelValue"),{t:r,n:i}=Ut(),{isRtl:s}=Yt(),{themeClasses:u}=Zt(e),{width:c}=mr(),d=t.shallowRef(-1)
nt(void 0,{scoped:!0})
const{resizeRef:v}=xt((e=>{if(!e.length)return
const{target:t,contentRect:a}=e[0],l=t.querySelector(".v-pagination__list > *")
if(!l)return
const o=a.width,n=l.offsetWidth+2*parseFloat(getComputedStyle(l).marginRight)
d.value=h(o,n)})),p=t.computed((()=>parseInt(e.length,10))),f=t.computed((()=>parseInt(e.start,10))),g=t.computed((()=>e.totalVisible?parseInt(e.totalVisible,10):d.value>=0?d.value:h(c.value,58)))
function h(t,a){const l=e.showFirstLastPage?5:3
return Math.max(0,Math.floor(+((t-a*l)/a).toFixed(2)))}const y=t.computed((()=>{if(p.value<=0||isNaN(p.value)||p.value>Number.MAX_SAFE_INTEGER)return[]
if(g.value<=1)return[n.value]
if(p.value<=g.value)return m(p.value,f.value)
const t=g.value%2==0,a=t?g.value/2:Math.floor(g.value/2),l=t?a:a+1,o=p.value-a
if(l-n.value>=0)return[...m(Math.max(1,g.value-1),f.value),e.ellipsis,p.value]
if(n.value-o>=(t?1:0)){const t=g.value-1,a=p.value-t+f.value
return[f.value,e.ellipsis,...m(t,a)]}{const t=Math.max(1,g.value-3),a=1===t?n.value:n.value-Math.ceil(t/2)+f.value
return[f.value,e.ellipsis,...m(t,a),e.ellipsis,p.value]}}))
function b(e,t,a){e.preventDefault(),n.value=t,a&&o(a,t)}const{refs:w,updateRef:S}=function(){const e=t.ref([])
return t.onBeforeUpdate((()=>e.value=[])),{refs:e,updateRef:function(t,a){e.value[a]=t}}}()
nt({VPaginationBtn:{color:t.toRef(e,"color"),border:t.toRef(e,"border"),density:t.toRef(e,"density"),size:t.toRef(e,"size"),variant:t.toRef(e,"variant"),rounded:t.toRef(e,"rounded"),elevation:t.toRef(e,"elevation")}})
const k=t.computed((()=>y.value.map(((t,a)=>{const l=e=>S(e,a)
if("string"==typeof t)return{isActive:!1,key:`ellipsis-${a}`,page:t,props:{ref:l,ellipsis:!0,icon:!0,disabled:!0}}
{const a=t===n.value
return{isActive:a,key:t,page:i(t),props:{ref:l,ellipsis:!1,icon:!0,disabled:!!e.disabled||+e.length<2,color:a?e.activeColor:e.color,ariaCurrent:a,ariaLabel:r(a?e.currentPageAriaLabel:e.pageAriaLabel,t),onClick:e=>b(e,t)}}}})))),x=t.computed((()=>{const t=!!e.disabled||n.value<=f.value,a=!!e.disabled||n.value>=f.value+p.value-1
return{first:e.showFirstLastPage?{icon:s.value?e.lastIcon:e.firstIcon,onClick:e=>b(e,f.value,"first"),disabled:t,ariaLabel:r(e.firstAriaLabel),ariaDisabled:t}:void 0,prev:{icon:s.value?e.nextIcon:e.prevIcon,onClick:e=>b(e,n.value-1,"prev"),disabled:t,ariaLabel:r(e.previousAriaLabel),ariaDisabled:t},next:{icon:s.value?e.prevIcon:e.nextIcon,onClick:e=>b(e,n.value+1,"next"),disabled:a,ariaLabel:r(e.nextAriaLabel),ariaDisabled:a},last:e.showFirstLastPage?{icon:s.value?e.firstIcon:e.lastIcon,onClick:e=>b(e,f.value+p.value-1,"last"),disabled:a,ariaLabel:r(e.lastAriaLabel),ariaDisabled:a}:void 0}}))
function C(){const e=n.value-f.value
w.value[e]?.$el.focus()}function N(a){a.key===V.left&&!e.disabled&&n.value>+e.start?(n.value=n.value-1,t.nextTick(C)):a.key===V.right&&!e.disabled&&n.value<f.value+p.value-1&&(n.value=n.value+1,t.nextTick(C))}return kt((()=>t.createVNode(e.tag,{ref:v,class:["v-pagination",u.value,e.class],style:e.style,role:"navigation","aria-label":r(e.ariaLabel),onKeydown:N,"data-test":"v-pagination-root"},{default:()=>[t.createVNode("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&t.createVNode("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[l.first?l.first(x.value.first):t.createVNode(bo,t.mergeProps({_as:"VPaginationBtn"},x.value.first),null)]),t.createVNode("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[l.prev?l.prev(x.value.prev):t.createVNode(bo,t.mergeProps({_as:"VPaginationBtn"},x.value.prev),null)]),k.value.map(((e,a)=>t.createVNode("li",{key:e.key,class:["v-pagination__item",{"v-pagination__item--is-active":e.isActive}],"data-test":"v-pagination-item"},[l.item?l.item(e):t.createVNode(bo,t.mergeProps({_as:"VPaginationBtn"},e.props),{default:()=>[e.page]})]))),t.createVNode("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[l.next?l.next(x.value.next):t.createVNode(bo,t.mergeProps({_as:"VPaginationBtn"},x.value.next),null)]),e.showFirstLastPage&&t.createVNode("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[l.last?l.last(x.value.last):t.createVNode(bo,t.mergeProps({_as:"VPaginationBtn"},x.value.last),null)])])]}))),{}}})
const lc=a({scale:{type:[Number,String],default:.5},...l()},"VParallax"),oc=ut()({name:"VParallax",props:lc(),setup(e,a){let{slots:l}=a
const{intersectionRef:o,isIntersecting:n}=Ll(),{resizeRef:r,contentRect:i}=xt(),{height:s}=mr(),u=t.ref()
let c
t.watchEffect((()=>{o.value=r.value=u.value?.$el})),t.watch(n,(e=>{e?(c=yt(o.value),c=c===document.scrollingElement?document:c,c.addEventListener("scroll",p,{passive:!0}),p()):c.removeEventListener("scroll",p)})),t.onBeforeUnmount((()=>{c?.removeEventListener("scroll",p)})),t.watch(s,p),t.watch((()=>i.value?.height),p)
const d=t.computed((()=>1-A(+e.scale)))
let v=-1
function p(){n.value&&(cancelAnimationFrame(v),v=requestAnimationFrame((()=>{const e=u.value?.$el.querySelector(".v-img__img")
if(!e)return
const t=c instanceof Document?document.documentElement.clientHeight:c.clientHeight,a=c instanceof Document?window.scrollY:c.scrollTop,l=o.value.getBoundingClientRect().top+a,n=i.value.height,r=(s=(a-(l+(n-t)/2))*d.value,Math.floor(Math.abs(s))*Math.sign(s))
var s
const v=Math.max(1,(d.value*(t-n)+n)/n)
e.style.setProperty("transform",`translateY(${r}px) scale(${v})`)})))}return kt((()=>t.createVNode(Oa,{class:["v-parallax",{"v-parallax--active":n.value},e.class],style:e.style,ref:u,cover:!0,onLoadstart:p,onLoad:p},l))),{}}}),nc=a({...To({falseIcon:"$radioOff",trueIcon:"$radioOn"})},"VRadio"),rc=ut()({name:"VRadio",props:nc(),setup(e,a){let{slots:l}=a
return kt((()=>t.createVNode(Po,t.mergeProps(e,{class:["v-radio",e.class],style:e.style,type:"radio"}),l))),{}}}),ic=a({height:{type:[Number,String],default:"auto"},...Go(),...x(Ro(),["multiple"]),trueIcon:{type:Sl,default:"$radioOn"},falseIcon:{type:Sl,default:"$radioOff"},type:{type:String,default:"radio"}},"VRadioGroup"),sc=ut()({name:"VRadioGroup",inheritAttrs:!1,props:ic(),emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const n=ht(),r=t.computed((()=>e.id||`radio-group-${n}`)),i=$t(e,"modelValue")
return kt((()=>{const[a,n]=B(l),[s,u]=Ko.filterProps(e),[c,d]=Po.filterProps(e),v=o.label?o.label({label:e.label,props:{for:r.value}}):e.label
return t.createVNode(Ko,t.mergeProps({class:["v-radio-group",e.class],style:e.style},a,s,{modelValue:i.value,"onUpdate:modelValue":e=>i.value=e,id:r.value}),{...o,default:a=>{let{id:l,messagesId:r,isDisabled:s,isReadonly:u}=a
return t.createVNode(t.Fragment,null,[v&&t.createVNode(Io,{id:l.value},{default:()=>[v]}),t.createVNode(Eo,t.mergeProps(c,{id:l.value,"aria-describedby":r.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:s.value,readonly:u.value,"aria-labelledby":v?l.value:void 0,multiple:!1},n,{modelValue:i.value,"onUpdate:modelValue":e=>i.value=e}),o)])}})})),{}}}),uc=a({...Oo(),...Go(),...ts(),strict:Boolean,modelValue:{type:Array,default:()=>[0,0]}},"VRangeSlider"),cc=ut()({name:"VRangeSlider",props:uc(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,end:e=>!0,start:e=>!0},setup(e,a){let{slots:l,emit:o}=a
const n=t.ref(),r=t.ref(),i=t.ref(),{rtlClasses:s}=Yt()
const u=as(e),c=$t(e,"modelValue",void 0,(e=>e?.length?e.map((e=>u.roundValue(e))):[0,0])),{activeThumbRef:d,hasLabels:v,max:p,min:f,mousePressed:m,onSliderMousedown:g,onSliderTouchstart:h,position:y,trackContainerRef:b}=ls({props:e,steps:u,onSliderStart:()=>{o("start",c.value)},onSliderEnd:t=>{let{value:a}=t
const l=d.value===n.value?.$el?[a,c.value[1]]:[c.value[0],a]
!e.strict&&l[0]<l[1]&&(c.value=l),o("end",c.value)},onSliderMove:t=>{let{value:a}=t
const[l,o]=c.value
e.strict||l!==o||l===f.value||(d.value=a>l?r.value?.$el:n.value?.$el,d.value?.focus()),d.value===n.value?.$el?c.value=[Math.min(a,o),o]:c.value=[l,Math.max(l,a)]},getActiveThumb:function(t){if(!n.value||!r.value)return
const a=es(t,n.value.$el,e.direction),l=es(t,r.value.$el,e.direction),o=Math.abs(a),i=Math.abs(l)
return o<i||o===i&&a<0?n.value.$el:r.value.$el}}),{isFocused:V,focus:w,blur:S}=zo(e),k=t.computed((()=>y(c.value[0]))),x=t.computed((()=>y(c.value[1])))
return kt((()=>{const[a,o]=Ko.filterProps(e),u=!!(e.label||l.label||l.prepend)
return t.createVNode(Ko,t.mergeProps({class:["v-slider","v-range-slider",{"v-slider--has-labels":!!l["tick-label"]||v.value,"v-slider--focused":V.value,"v-slider--pressed":m.value,"v-slider--disabled":e.disabled},s.value,e.class],style:e.style,ref:i},a,{focused:V.value}),{...l,prepend:u?a=>t.createVNode(t.Fragment,null,[l.label?.(a)??(e.label?t.createVNode(Io,{class:"v-slider__label",text:e.label},null):void 0),l.prepend?.(a)]):void 0,default:a=>{let{id:o,messagesId:i}=a
return t.createVNode("div",{class:"v-slider__container",onMousedown:g,onTouchstartPassive:h},[t.createVNode("input",{id:`${o.value}_start`,name:e.name||o.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:c.value[0]},null),t.createVNode("input",{id:`${o.value}_stop`,name:e.name||o.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:c.value[1]},null),t.createVNode(is,{ref:b,start:k.value,stop:x.value},{"tick-label":l["tick-label"]}),t.createVNode(ns,{ref:n,"aria-describedby":i.value,focused:V&&d.value===n.value?.$el,modelValue:c.value[0],"onUpdate:modelValue":e=>c.value=[e,c.value[1]],onFocus:e=>{w(),d.value=n.value?.$el,c.value[0]===c.value[1]&&c.value[1]===f.value&&e.relatedTarget!==r.value?.$el&&(n.value?.$el.blur(),r.value?.$el.focus())},onBlur:()=>{S(),d.value=void 0},min:f.value,max:c.value[1],position:k.value},{"thumb-label":l["thumb-label"]}),t.createVNode(ns,{ref:r,"aria-describedby":i.value,focused:V&&d.value===r.value?.$el,modelValue:c.value[1],"onUpdate:modelValue":e=>c.value=[c.value[0],e],onFocus:e=>{w(),d.value=r.value?.$el,c.value[0]===c.value[1]&&c.value[0]===p.value&&e.relatedTarget!==n.value?.$el&&(r.value?.$el.blur(),n.value?.$el.focus())},onBlur:()=>{S(),d.value=void 0},min:c.value[0],max:p.value,position:x.value},{"thumb-label":l["thumb-label"]})])}})})),{}}}),dc=a({name:String,itemAriaLabel:{type:String,default:"$vuetify.rating.ariaLabel.item"},activeColor:String,color:String,clearable:Boolean,disabled:Boolean,emptyIcon:{type:Sl,default:"$ratingEmpty"},fullIcon:{type:Sl,default:"$ratingFull"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,modelValue:{type:[Number,String],default:0},itemLabels:Array,itemLabelPosition:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},ripple:Boolean,...l(),...ol(),...El(),...la(),...Kt()},"VRating"),vc=ut()({name:"VRating",props:dc(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{t:o}=Ut(),{themeClasses:n}=Zt(e),r=$t(e,"modelValue"),i=t.computed((()=>A(parseFloat(r.value),0,+e.length))),s=t.computed((()=>m(Number(e.length),1))),u=t.computed((()=>s.value.flatMap((t=>e.halfIncrements?[t-.5,t]:[t])))),c=t.shallowRef(-1),d=t.computed((()=>u.value.map((t=>{const a=e.hover&&c.value>-1,l=i.value>=t,o=c.value>=t,n=(a?o:l)?e.fullIcon:e.emptyIcon,r=e.activeColor??e.color
return{isFilled:l,isHovered:o,icon:n,color:l||o?r:e.color}})))),v=t.computed((()=>[0,...u.value].map((t=>({onMouseenter:e.hover?function(){c.value=t}:void 0,onMouseleave:e.hover?function(){c.value=-1}:void 0,onClick:function(){e.disabled||e.readonly||(r.value=i.value===t&&e.clearable?0:t)}}))))),p=t.computed((()=>e.name??`v-rating-${ht()}`))
function f(a){let{value:n,index:r,showStar:s=!0}=a
const{onMouseenter:u,onMouseleave:c,onClick:f}=v.value[r+1],m=`${p.value}-${String(n).replace(".","-")}`,g={color:d.value[r]?.color,density:e.density,disabled:e.disabled,icon:d.value[r]?.icon,ripple:e.ripple,size:e.size,variant:"plain"}
return t.createVNode(t.Fragment,null,[t.createVNode("label",{for:m,class:{"v-rating__item--half":e.halfIncrements&&n%1>0,"v-rating__item--full":e.halfIncrements&&n%1==0},onMouseenter:u,onMouseleave:c,onClick:f},[t.createVNode("span",{class:"v-rating__hidden"},[o(e.itemAriaLabel,n,e.length)]),s?l.item?l.item({...d.value[r],props:g,value:n,index:r,rating:i.value}):t.createVNode(bo,t.mergeProps({"aria-label":o(e.itemAriaLabel,n,e.length)},g),null):void 0]),t.createVNode("input",{class:"v-rating__hidden",name:p.value,id:m,type:"radio",value:n,checked:i.value===n,tabindex:-1,readonly:e.readonly,disabled:e.disabled},null)])}function g(e){return l["item-label"]?l["item-label"](e):e.label?t.createVNode("span",null,[e.label]):t.createVNode("span",null,[t.createTextVNode(" ")])}return kt((()=>{const a=!!e.itemLabels?.length||l["item-label"]
return t.createVNode(e.tag,{class:["v-rating",{"v-rating--hover":e.hover,"v-rating--readonly":e.readonly},n.value,e.class],style:e.style},{default:()=>[t.createVNode(f,{value:0,index:-1,showStar:!1},null),s.value.map(((l,o)=>t.createVNode("div",{class:"v-rating__wrapper"},[a&&"top"===e.itemLabelPosition?g({value:l,index:o,label:e.itemLabels?.[o]}):void 0,t.createVNode("div",{class:"v-rating__item"},[e.halfIncrements?t.createVNode(t.Fragment,null,[t.createVNode(f,{value:l-.5,index:2*o},null),t.createVNode(f,{value:l,index:2*o+1},null)]):t.createVNode(f,{value:l,index:o},null)]),a&&"bottom"===e.itemLabelPosition?g({value:l,index:o,label:e.itemLabels?.[o]}):void 0])))]})})),{}}})
function pc(e){const t=Math.abs(e)
return Math.sign(e)*(t/((1/.501-2)*(1-t)+1))}function fc(e){let{selectedElement:t,containerSize:a,contentSize:l,isRtl:o,currentScrollOffset:n,isHorizontal:r}=e
const i=r?t.clientWidth:t.clientHeight,s=r?t.offsetLeft:t.offsetTop,u=o&&r?l-s-i:s,c=a+n,d=i+u,v=.4*i
return u<=n?n=Math.max(u-v,0):c<=d&&(n=Math.min(n-(c-d-v),l-a)),n}const mc=Symbol.for("vuetify:v-slide-group"),gc=a({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:mc},nextIcon:{type:Sl,default:"$next"},prevIcon:{type:Sl,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>"boolean"==typeof e||["always","desktop","mobile"].includes(e)},...l(),...la(),...vl({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),hc=ut()({name:"VSlideGroup",props:gc(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const{isRtl:n}=Yt(),{mobile:r}=mr(),i=ml(e,e.symbol),s=t.shallowRef(!1),u=t.shallowRef(0),c=t.shallowRef(0),d=t.shallowRef(0),v=t.computed((()=>"horizontal"===e.direction)),{resizeRef:p,contentRect:f}=xt(),{resizeRef:m,contentRect:g}=xt(),h=t.computed((()=>i.selected.value.length?i.items.value.findIndex((e=>e.id===i.selected.value[0])):-1)),y=t.computed((()=>i.selected.value.length?i.items.value.findIndex((e=>e.id===i.selected.value[i.selected.value.length-1])):-1))
if(o){let a=-1
t.watch((()=>[i.selected.value,f.value,g.value,v.value]),(()=>{cancelAnimationFrame(a),a=requestAnimationFrame((()=>{if(f.value&&g.value){const e=v.value?"width":"height"
c.value=f.value[e],d.value=g.value[e],s.value=c.value+1<d.value}if(h.value>=0&&m.value){const t=m.value.children[y.value]
0!==h.value&&s.value?e.centerActive?u.value=function(e){let{selectedElement:t,containerSize:a,contentSize:l,isRtl:o,isHorizontal:n}=e
const r=n?t.clientWidth:t.clientHeight,i=n?t.offsetLeft:t.offsetTop,s=o&&n?l-i-r/2-a/2:i+r/2-a/2
return Math.min(l-a,Math.max(0,s))}({selectedElement:t,containerSize:c.value,contentSize:d.value,isRtl:n.value,isHorizontal:v.value}):s.value&&(u.value=fc({selectedElement:t,containerSize:c.value,contentSize:d.value,isRtl:n.value,currentScrollOffset:u.value,isHorizontal:v.value})):u.value=0}}))}))}const b=t.shallowRef(!1)
let V=0,w=0
function S(e){const t=v.value?"clientX":"clientY",a=n.value&&v.value?-1:1
w=a*u.value,V=e.touches[0][t],b.value=!0}function k(e){if(!s.value)return
const t=v.value?"clientX":"clientY",a=n.value&&v.value?-1:1
u.value=a*(w+V-e.touches[0][t])}function x(e){const t=d.value-c.value
u.value<0||!s.value?u.value=0:u.value>=t&&(u.value=t),b.value=!1}function C(){p.value&&(p.value[v.value?"scrollLeft":"scrollTop"]=0)}const N=t.shallowRef(!1)
function _(e){if(N.value=!0,s.value&&m.value)for(const t of e.composedPath())for(const e of m.value.children)if(e===t)return void(u.value=fc({selectedElement:e,containerSize:c.value,contentSize:d.value,isRtl:n.value,currentScrollOffset:u.value,isHorizontal:v.value}))}function I(e){N.value=!1}function B(e){N.value||e.relatedTarget&&m.value?.contains(e.relatedTarget)||E()}function R(e){m.value&&(v.value?"ArrowRight"===e.key?E(n.value?"prev":"next"):"ArrowLeft"===e.key&&E(n.value?"next":"prev"):"ArrowDown"===e.key?E("next"):"ArrowUp"===e.key&&E("prev"),"Home"===e.key?E("first"):"End"===e.key&&E("last"))}function E(e){if(m.value)if(e)if("next"===e){const e=m.value.querySelector(":focus")?.nextElementSibling
e?e.focus():E("first")}else if("prev"===e){const e=m.value.querySelector(":focus")?.previousElementSibling
e?e.focus():E("last")}else"first"===e?m.value.firstElementChild?.focus():"last"===e&&m.value.lastElementChild?.focus()
else{q(m.value)[0]?.focus()}}function T(e){const t=u.value+("prev"===e?-1:1)*c.value
u.value=A(t,0,d.value-c.value)}const P=t.computed((()=>{let e=u.value>d.value-c.value?-(d.value-c.value)+pc(d.value-c.value-u.value):-u.value
u.value<=0&&(e=pc(-u.value))
const t=n.value&&v.value?-1:1
return{transform:`translate${v.value?"X":"Y"}(${t*e}px)`,transition:b.value?"none":"",willChange:b.value?"transform":""}})),$=t.computed((()=>({next:i.next,prev:i.prev,select:i.select,isSelected:i.isSelected}))),L=t.computed((()=>{switch(e.showArrows){case"always":return!0
case"desktop":return!r.value
case!0:return s.value||Math.abs(u.value)>0
case"mobile":return r.value||s.value||Math.abs(u.value)>0
default:return!r.value&&(s.value||Math.abs(u.value)>0)}})),M=t.computed((()=>Math.abs(u.value)>0)),F=t.computed((()=>d.value>Math.abs(u.value)+c.value))
return kt((()=>t.createVNode(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!v.value,"v-slide-group--has-affixes":L.value,"v-slide-group--is-overflowing":s.value},e.class],style:e.style,tabindex:N.value||i.selected.value.length?-1:0,onFocus:B},{default:()=>[L.value&&t.createVNode("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!M.value}],onClick:()=>T("prev")},[l.prev?.($.value)??t.createVNode(ha,null,{default:()=>[t.createVNode($l,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),t.createVNode("div",{key:"container",ref:p,class:"v-slide-group__container",onScroll:C},[t.createVNode("div",{ref:m,class:"v-slide-group__content",style:P.value,onTouchstartPassive:S,onTouchmovePassive:k,onTouchendPassive:x,onFocusin:_,onFocusout:I,onKeydown:R},[l.default?.($.value)])]),L.value&&t.createVNode("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!F.value}],onClick:()=>T("next")},[l.next?.($.value)??t.createVNode(ha,null,{default:()=>[t.createVNode($l,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]}))),{selected:i.selected,scrollTo:T,scrollOffset:u,focus:E}}}),yc=ut()({name:"VSlideGroupItem",props:pl(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:a}=t
const l=fl(e,mc)
return()=>a.default?.({isSelected:l.isSelected.value,select:l.select,toggle:l.toggle,selectedClass:l.selectedClass.value})}}),bc=a({multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...Ol({location:"bottom"}),...Kl(),...Ka(),...sl(),...Kt(),...x(Ir({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},"VSnackbar"),Vc=ut()({name:"VSnackbar",props:bc(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"modelValue"),{locationStyles:n}=zl(e),{positionClasses:r}=ql(e),{scopeId:i}=br(),{themeClasses:s}=Zt(e),{colorClasses:u,colorStyles:c,variantClasses:d}=ul(e),{roundedClasses:v}=qa(e),p=t.ref()
t.watch(o,m),t.watch((()=>e.timeout),m),t.onMounted((()=>{o.value&&m()}))
let f=-1
function m(){window.clearTimeout(f)
const t=Number(e.timeout)
o.value&&-1!==t&&(f=window.setTimeout((()=>{o.value=!1}),t))}function g(){window.clearTimeout(f)}return kt((()=>{const[a]=Br.filterProps(e)
return t.createVNode(Br,t.mergeProps({ref:p,class:["v-snackbar",{"v-snackbar--active":o.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--vertical":e.vertical},r.value,e.class],style:e.style},a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,contentProps:t.mergeProps({class:["v-snackbar__wrapper",s.value,u.value,v.value,d.value],style:[n.value,c.value],onPointerenter:g,onPointerleave:m},a.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none",_disableGlobalStack:!0},i),{default:()=>[il(!1,"v-snackbar"),l.default&&t.createVNode("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[l.default()]),l.actions&&t.createVNode(Ra,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[t.createVNode("div",{class:"v-snackbar__actions"},[l.actions()])]})],activator:l.activator})})),Er({},p)}}),wc=a({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...Go(),...To()},"VSwitch"),Sc=ut()({name:"VSwitch",inheritAttrs:!1,props:wc(),emits:{"update:focused":e=>!0,"update:modelValue":()=>!0,"update:indeterminate":e=>!0},setup(e,a){let{attrs:l,slots:o}=a
const n=$t(e,"indeterminate"),r=$t(e,"modelValue"),{loaderClasses:i}=Wl(e),{isFocused:s,focus:u,blur:c}=zo(e),d=t.ref(),v=t.computed((()=>"string"==typeof e.loading&&""!==e.loading?e.loading:e.color)),p=ht(),f=t.computed((()=>e.id||`switch-${p}`))
function m(){n.value&&(n.value=!1)}function g(e){e.stopPropagation(),e.preventDefault(),d.value?.input?.click()}return kt((()=>{const[a,p]=B(l),[h,y]=Ko.filterProps(e),[b,V]=Po.filterProps(e)
return t.createVNode(Ko,t.mergeProps({class:["v-switch",{"v-switch--inset":e.inset},{"v-switch--indeterminate":n.value},i.value,e.class],style:e.style},a,h,{id:f.value,focused:s.value}),{...o,default:a=>{let{id:l,messagesId:i,isDisabled:s,isReadonly:f,isValid:h}=a
return t.createVNode(Po,t.mergeProps({ref:d},b,{modelValue:r.value,"onUpdate:modelValue":[e=>r.value=e,m],id:l.value,"aria-describedby":i.value,type:"checkbox","aria-checked":n.value?"mixed":void 0,disabled:s.value,readonly:f.value,onFocus:u,onBlur:c},p),{...o,default:e=>{let{backgroundColorClasses:a,backgroundColorStyles:l}=e
return t.createVNode("div",{class:["v-switch__track",...a.value],style:l.value,onClick:g},null)},input:a=>{let{inputNode:l,icon:n,backgroundColorClasses:r,backgroundColorStyles:i}=a
return t.createVNode(t.Fragment,null,[l,t.createVNode("div",{class:["v-switch__thumb",{"v-switch__thumb--filled":n||e.loading},e.inset?void 0:r.value],style:e.inset?void 0:i.value},[t.createVNode(ya,null,{default:()=>[e.loading?t.createVNode(Yl,{name:"v-switch",active:!0,color:!1===h.value?void 0:v.value},{default:e=>o.loader?o.loader(e):t.createVNode(Fl,{active:e.isActive,color:e.color,indeterminate:!0,size:"16",width:"2"},null)}):n&&t.createVNode($l,{key:n,icon:n,size:"x-small"},null)]})])])}})}})})),{}}}),kc=a({color:String,height:[Number,String],window:Boolean,...l(),...Ya(),...It(),...Ka(),...la(),...Kt()},"VSystemBar"),xc=ut()({name:"VSystemBar",props:kc(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{backgroundColorClasses:n,backgroundColorStyles:r}=Wa(t.toRef(e,"color")),{elevationClasses:i}=Ga(e),{roundedClasses:s}=qa(e),{ssrBootStyles:u}=el(),c=t.computed((()=>e.height??(e.window?32:24))),{layoutItemStyles:d}=Rt({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.shallowRef("top"),layoutSize:c,elementSize:c,active:t.computed((()=>!0)),absolute:t.toRef(e,"absolute")})
return kt((()=>t.createVNode(e.tag,{class:["v-system-bar",{"v-system-bar--window":e.window},o.value,n.value,i.value,s.value,e.class],style:[r.value,d.value,u.value,e.style]},l))),{}}}),Cc=Symbol.for("vuetify:v-tabs"),Nc=a({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...x(yo({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),_c=ut()({name:"VTab",props:Nc(),setup(e,a){let{slots:l,attrs:o}=a
const{textColorClasses:n,textColorStyles:r}=Ua(e,"sliderColor"),i=t.computed((()=>"horizontal"===e.direction)),s=t.shallowRef(!1),u=t.ref(),c=t.ref()
function d(e){let{value:t}=e
if(s.value=t,t){const e=u.value?.$el.parentElement?.querySelector(".v-tab--selected .v-tab__slider"),t=c.value
if(!e||!t)return
const a=getComputedStyle(e).color,l=e.getBoundingClientRect(),o=t.getBoundingClientRect(),n=i.value?"x":"y",r=i.value?"X":"Y",s=i.value?"right":"bottom",d=i.value?"width":"height",v=l[n]>o[n]?l[s]-o[s]:l[n]-o[n],p=Math.sign(v)>0?i.value?"right":"bottom":Math.sign(v)<0?i.value?"left":"top":"center",f=(Math.abs(v)+(Math.sign(v)<0?l[d]:o[d]))/Math.max(l[d],o[d])||0,m=1.5
de(t,{backgroundColor:[a,"currentcolor"],transform:[`translate${r}(${v}px) scale${r}(${l[d]/o[d]||0})`,`translate${r}(${v/m}px) scale${r}(${(f-1)/m+1})`,"none"],transformOrigin:Array(3).fill(p)},{duration:225,easing:vt})}}return kt((()=>{const[a]=bo.filterProps(e)
return t.createVNode(bo,t.mergeProps({symbol:Cc,ref:u,class:["v-tab",e.class],style:e.style,tabindex:s.value?0:-1,role:"tab","aria-selected":String(s.value),active:!1},a,o,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":d}),{default:()=>[l.default?.()??e.text,!e.hideSlider&&t.createVNode("div",{ref:c,class:["v-tab__slider",n.value],style:r.value},null)]})})),{}}})
const Ic=a({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...gc({mandatory:"force"}),...ol(),...la()},"VTabs"),Bc=ut()({name:"VTabs",props:Ic(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"modelValue"),n=t.computed((()=>{return(t=e.items)?t.map((e=>h(e)?e:{text:e,value:e})):[]
var t})),{densityClasses:r}=nl(e),{backgroundColorClasses:i,backgroundColorStyles:s}=Wa(t.toRef(e,"bgColor"))
return nt({VTab:{color:t.toRef(e,"color"),direction:t.toRef(e,"direction"),stacked:t.toRef(e,"stacked"),fixed:t.toRef(e,"fixedTabs"),sliderColor:t.toRef(e,"sliderColor"),hideSlider:t.toRef(e,"hideSlider")}}),kt((()=>{const[a]=hc.filterProps(e)
return t.createVNode(hc,t.mergeProps(a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},r.value,i.value,e.class],style:[{"--v-tabs-height":g(e.height)},s.value,e.style],role:"tablist",symbol:Cc}),{default:()=>[l.default?l.default():n.value.map((e=>t.createVNode(_c,t.mergeProps(e,{key:e.text}),null)))]})})),{}}}),Rc=a({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...l(),...ol(),...la(),...Kt()},"VTable"),Ac=ut()({name:"VTable",props:Rc(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{densityClasses:n}=nl(e)
return kt((()=>t.createVNode(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!l.top,"v-table--has-bottom":!!l.bottom,"v-table--hover":e.hover},o.value,n.value,e.class],style:e.style},{default:()=>[l.top?.(),l.default?t.createVNode("div",{class:"v-table__wrapper",style:{height:g(e.height)}},[t.createVNode("table",null,[l.default()])]):l.wrapper?.(),l.bottom?.()]}))),{}}}),Ec=a({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...Go(),...Or()},"VTextarea"),Tc=ut()({name:"VTextarea",directives:{Intersect:Fa},inheritAttrs:!1,props:Ec(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,a){let{attrs:l,emit:o,slots:n}=a
const r=$t(e,"modelValue"),{isFocused:i,focus:s,blur:u}=zo(e),c=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(r.value):(r.value||"").toString().length)),d=t.computed((()=>l.maxlength?l.maxlength:!e.counter||"number"!=typeof e.counter&&"string"!=typeof e.counter?void 0:e.counter))
function v(t,a){e.autofocus&&t&&a[0].target?.focus?.()}const p=t.ref(),f=t.ref(),m=t.shallowRef(""),h=t.ref(),y=t.computed((()=>e.persistentPlaceholder||i.value||e.active))
function b(){h.value!==document.activeElement&&h.value?.focus(),i.value||s()}function V(e){b(),o("click:control",e)}function w(e){o("mousedown:control",e)}function S(a){a.stopPropagation(),b(),t.nextTick((()=>{r.value="",K(e["onClick:clear"],a)}))}function k(a){const l=a.target
if(r.value=l.value,e.modelModifiers?.trim){const e=[l.selectionStart,l.selectionEnd]
t.nextTick((()=>{l.selectionStart=e[0],l.selectionEnd=e[1]}))}}const x=t.ref(),C=t.ref(+e.rows),N=t.computed((()=>["plain","underlined"].includes(e.variant)))
function _(){e.autoGrow&&t.nextTick((()=>{if(!x.value||!f.value)return
const t=getComputedStyle(x.value),a=getComputedStyle(f.value.$el),l=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),o=x.value.scrollHeight,n=parseFloat(t.lineHeight),r=A(o??0,Math.max(parseFloat(e.rows)*n+l,parseFloat(a.getPropertyValue("--v-input-control-height"))),parseFloat(e.maxRows)*n+l||1/0)
C.value=Math.floor((r-l)/n),m.value=g(r)}))}let I
return t.watchEffect((()=>{e.autoGrow||(C.value=+e.rows)})),t.onMounted(_),t.watch(r,_),t.watch((()=>e.rows),_),t.watch((()=>e.maxRows),_),t.watch((()=>e.density),_),t.watch(x,(e=>{e?(I=new ResizeObserver(_),I.observe(x.value)):I?.disconnect()})),t.onBeforeUnmount((()=>{I?.disconnect()})),kt((()=>{const a=!!(n.counter||e.counter||e.counterValue),o=!(!a&&!n.details),[s,g]=B(l),[{modelValue:_,...I}]=Ko.filterProps(e),[R]=jr(e)
return t.createVNode(Ko,t.mergeProps({ref:p,modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--plain-underlined":N.value},e.class],style:e.style},s,I,{centerAffix:1===C.value&&!N.value,focused:i.value}),{...n,default:a=>{let{isDisabled:l,isDirty:o,isReadonly:s,isValid:c}=a
return t.createVNode(zr,t.mergeProps({ref:f,style:{"--v-textarea-control-height":m.value},onClick:V,onMousedown:w,"onClick:clear":S,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},R,{active:y.value||o.value,centerAffix:1===C.value&&!N.value,dirty:o.value||e.dirty,disabled:l.value,focused:i.value,error:!1===c.value}),{...n,default:a=>{let{props:{class:o,...n}}=a
return t.createVNode(t.Fragment,null,[e.prefix&&t.createVNode("span",{class:"v-text-field__prefix"},[e.prefix]),t.withDirectives(t.createVNode("textarea",t.mergeProps({ref:h,class:o,value:r.value,onInput:k,autofocus:e.autofocus,readonly:s.value,disabled:l.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:b,onBlur:u},n,g),null),[[t.resolveDirective("intersect"),{handler:v},null,{once:!0}]]),e.autoGrow&&t.withDirectives(t.createVNode("textarea",{class:[o,"v-textarea__sizer"],id:`${n.id}-sizer`,"onUpdate:modelValue":e=>r.value=e,ref:x,readonly:!0,"aria-hidden":"true"},null),[[t.vModelText,r.value]]),e.suffix&&t.createVNode("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:o?l=>t.createVNode(t.Fragment,null,[n.details?.(l),a&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(Lr,{active:e.persistentCounter||i.value,value:c.value,max:d.value},n.counter)])]):void 0})})),Er({},p,f,h)}}),Pc=a({withBackground:Boolean,...l(),...Kt(),...la()},"VThemeProvider"),$c=ut()({name:"VThemeProvider",props:Pc(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e)
return()=>e.withBackground?t.createVNode(e.tag,{class:["v-theme-provider",o.value,e.class],style:e.style},{default:()=>[l.default?.()]}):l.default?.()}}),Lc=a({align:{type:String,default:"center",validator:e=>["center","start"].includes(e)},direction:{type:String,default:"vertical",validator:e=>["vertical","horizontal"].includes(e)},justify:{type:String,default:"auto",validator:e=>["auto","center"].includes(e)},side:{type:String,validator:e=>null==e||["start","end"].includes(e)},lineInset:{type:[String,Number],default:0},lineThickness:{type:[String,Number],default:2},lineColor:String,truncateLine:{type:String,validator:e=>["start","end","both"].includes(e)},...l(),...ol(),...la(),...Kt()},"VTimeline"),Mc=ut()({name:"VTimeline",props:Lc(),setup(e,a){let{slots:l}=a
const{themeClasses:o}=Zt(e),{densityClasses:n}=nl(e),{rtlClasses:r}=Yt()
nt({VTimelineDivider:{lineColor:t.toRef(e,"lineColor")},VTimelineItem:{density:t.toRef(e,"density"),lineInset:t.toRef(e,"lineInset")}})
const i=t.computed((()=>{const t=e.side?e.side:"default"!==e.density?"end":null
return t&&`v-timeline--side-${t}`})),s=t.computed((()=>{const t=["v-timeline--truncate-line-start","v-timeline--truncate-line-end"]
switch(e.truncateLine){case"both":return t
case"start":return t[0]
case"end":return t[1]
default:return null}}))
return kt((()=>t.createVNode(e.tag,{class:["v-timeline",`v-timeline--${e.direction}`,`v-timeline--align-${e.align}`,`v-timeline--justify-${e.justify}`,s.value,{"v-timeline--inset-line":!!e.lineInset},o.value,n.value,i.value,r.value,e.class],style:[{"--v-timeline-line-thickness":g(e.lineThickness)},e.style]},l))),{}}}),Fc=a({dotColor:String,fillDot:Boolean,hideDot:Boolean,icon:Sl,iconColor:String,lineColor:String,...l(),...Ka(),...El(),...Ya()},"VTimelineDivider"),Dc=ut()({name:"VTimelineDivider",props:Fc(),setup(e,a){let{slots:l}=a
const{sizeClasses:o,sizeStyles:n}=Tl(e,"v-timeline-divider__dot"),{backgroundColorStyles:r,backgroundColorClasses:i}=Wa(t.toRef(e,"dotColor")),{roundedClasses:s}=qa(e,"v-timeline-divider__dot"),{elevationClasses:u}=Ga(e),{backgroundColorClasses:c,backgroundColorStyles:d}=Wa(t.toRef(e,"lineColor"))
return kt((()=>t.createVNode("div",{class:["v-timeline-divider",{"v-timeline-divider--fill-dot":e.fillDot},e.class],style:e.style},[t.createVNode("div",{class:["v-timeline-divider__before",c.value],style:d.value},null),!e.hideDot&&t.createVNode("div",{key:"dot",class:["v-timeline-divider__dot",u.value,s.value,o.value],style:n.value},[t.createVNode("div",{class:["v-timeline-divider__inner-dot",i.value,s.value],style:r.value},[l.default?t.createVNode(Ra,{key:"icon-defaults",disabled:!e.icon,defaults:{VIcon:{color:e.iconColor,icon:e.icon,size:e.size}}},l.default):t.createVNode($l,{key:"icon",color:e.iconColor,icon:e.icon,size:e.size},null)])]),t.createVNode("div",{class:["v-timeline-divider__after",c.value],style:d.value},null)]))),{}}}),Oc=a({density:String,dotColor:String,fillDot:Boolean,hideDot:Boolean,hideOpposite:{type:Boolean,default:void 0},icon:Sl,iconColor:String,lineInset:[Number,String],...l(),...Aa(),...Ya(),...Ka(),...El(),...la()},"VTimelineItem"),zc=ut()({name:"VTimelineItem",props:Oc(),setup(e,a){let{slots:l}=a
const{dimensionStyles:o}=Ea(e),n=t.shallowRef(0),r=t.ref()
return t.watch(r,(e=>{e&&(n.value=e.$el.querySelector(".v-timeline-divider__dot")?.getBoundingClientRect().width??0)}),{flush:"post"}),kt((()=>t.createVNode("div",{class:["v-timeline-item",{"v-timeline-item--fill-dot":e.fillDot},e.class],style:[{"--v-timeline-dot-size":g(n.value),"--v-timeline-line-inset":e.lineInset?`calc(var(--v-timeline-dot-size) / 2 + ${g(e.lineInset)})`:g(0)},e.style]},[t.createVNode("div",{class:"v-timeline-item__body",style:o.value},[l.default?.()]),t.createVNode(Dc,{ref:r,hideDot:e.hideDot,icon:e.icon,iconColor:e.iconColor,size:e.size,elevation:e.elevation,dotColor:e.dotColor,fillDot:e.fillDot,rounded:e.rounded},{default:l.icon}),"compact"!==e.density&&t.createVNode("div",{class:"v-timeline-item__opposite"},[!e.hideOpposite&&l.opposite?.()])]))),{}}}),jc=a({...l(),...sl({variant:"text"})},"VToolbarItems"),Hc=ut()({name:"VToolbarItems",props:jc(),setup(e,a){let{slots:l}=a
return nt({VBtn:{color:t.toRef(e,"color"),height:"inherit",variant:t.toRef(e,"variant")}}),kt((()=>t.createVNode("div",{class:["v-toolbar-items",e.class],style:e.style},[l.default?.()]))),{}}}),Uc=a({id:String,text:String,...x(Ir({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent"])},"VTooltip"),Wc=ut()({name:"VTooltip",props:Uc(),emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:l}=a
const o=$t(e,"modelValue"),{scopeId:n}=br(),r=ht(),i=t.computed((()=>e.id||`v-tooltip-${r}`)),s=t.ref(),u=t.computed((()=>e.location.split(" ").length>1?e.location:e.location+" center")),c=t.computed((()=>"auto"===e.origin||"overlap"===e.origin||e.origin.split(" ").length>1||e.location.split(" ").length>1?e.origin:e.origin+" center")),d=t.computed((()=>e.transition?e.transition:o.value?"scale-transition":"fade-transition")),v=t.computed((()=>t.mergeProps({"aria-describedby":i.value},e.activatorProps)))
return kt((()=>{const[a]=Br.filterProps(e)
return t.createVNode(Br,t.mergeProps({ref:s,class:["v-tooltip",e.class],style:e.style,id:i.value},a,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,transition:d.value,absolute:!0,location:u.value,origin:c.value,persistent:!0,role:"tooltip",activatorProps:v.value,_disableGlobalStack:!0},n),{activator:l.activator,default:function(){for(var t=arguments.length,a=new Array(t),o=0;o<t;o++)a[o]=arguments[o]
return l.default?.(...a)??e.text}})})),Er({},s)}}),Yc=ut()({name:"VValidation",props:Wo(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t
const l=Yo(e,"validation")
return()=>a.default?.(l)}})
var Gc=Object.freeze({__proto__:null,VAlert:No,VAlertTitle:ko,VApp:aa,VAppBar:al,VAppBarNavIcon:wo,VAppBarTitle:So,VAutocomplete:ri,VAvatar:Jo,VBadge:si,VBanner:pi,VBannerActions:ci,VBannerText:di,VBottomNavigation:mi,VBreadcrumbs:wi,VBreadcrumbsDivider:hi,VBreadcrumbsItem:bi,VBtn:bo,VBtnGroup:dl,VBtnToggle:bl,VCard:Bi,VCardActions:Si,VCardItem:Ni,VCardSubtitle:ki,VCardText:_i,VCardTitle:xi,VCarousel:Di,VCarouselItem:Hi,VCheckbox:Xo,VCheckboxBtn:Lo,VChip:ln,VChipGroup:tn,VClassIcon:Il,VCode:Ui,VCol:du,VColorPicker:$s,VCombobox:Ms,VComponentIcon:Cl,VContainer:lu,VCounter:Lr,VDefaultsProvider:Ra,VDialog:Ds,VDialogBottomTransition:ma,VDialogTopTransition:ga,VDialogTransition:da,VDivider:In,VExpandTransition:_a,VExpandXTransition:Ia,VExpansionPanel:qs,VExpansionPanelText:Ws,VExpansionPanelTitle:Gs,VExpansionPanels:Hs,VFabTransition:fa,VFadeTransition:ha,VField:zr,VFieldLabel:Fr,VFileInput:Zs,VFooter:Qs,VForm:tu,VHover:Au,VIcon:$l,VImg:Oa,VInput:Ko,VItem:$u,VItemGroup:Pu,VKbd:Lu,VLabel:Io,VLayout:Fu,VLayoutItem:Ou,VLazy:ju,VLigatureIcon:_l,VList:Fn,VListGroup:Vn,VListImg:Dn,VListItem:xn,VListItemAction:zn,VListItemMedia:Hn,VListItemSubtitle:wn,VListItemTitle:Sn,VListSubheader:Nn,VLocaleProvider:Uu,VMain:Yu,VMenu:Pr,VMessages:Do,VNavigationDrawer:Qu,VNoSsr:ec,VOverlay:Br,VPagination:ac,VParallax:oc,VProgressCircular:Fl,VProgressLinear:Hl,VRadio:rc,VRadioGroup:sc,VRangeSlider:cc,VRating:vc,VResponsive:Pa,VRow:Iu,VScaleTransition:ya,VScrollXReverseTransition:Va,VScrollXTransition:ba,VScrollYReverseTransition:Sa,VScrollYTransition:wa,VSelect:ti,VSelectionControl:Po,VSelectionControlGroup:Eo,VSheet:Ps,VSlideGroup:hc,VSlideGroupItem:yc,VSlideXReverseTransition:xa,VSlideXTransition:ka,VSlideYReverseTransition:Na,VSlideYTransition:Ca,VSlider:us,VSnackbar:Vc,VSpacer:Bu,VSvgIcon:Nl,VSwitch:Sc,VSystemBar:xc,VTab:_c,VTable:Ac,VTabs:Bc,VTextField:Wr,VTextarea:Tc,VThemeProvider:$c,VTimeline:Mc,VTimelineItem:zc,VToolbar:Ja,VToolbarItems:Hc,VToolbarTitle:na,VTooltip:Wc,VValidation:Yc,VVirtualScroll:Zr,VWindow:Mi,VWindowItem:zi})
function Kc(e,t){e._mutate?.[t.instance.$.uid]&&(e._mutate[t.instance.$.uid].observer.disconnect(),delete e._mutate[t.instance.$.uid])}const qc={mounted:function(e,t){const a=t.modifiers||{},l=t.value,{once:o,immediate:n,...r}=a,i=!Object.keys(r).length,{handler:s,options:u}="object"==typeof l?l:{handler:l,options:{attributes:r?.attr??i,characterData:r?.char??i,childList:r?.child??i,subtree:r?.sub??i}},c=new MutationObserver((function(){let a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],l=arguments.length>1?arguments[1]:void 0
s?.(a,l),o&&Kc(e,t)}))
n&&s?.([],c),e._mutate=Object(e._mutate),e._mutate[t.instance.$.uid]={observer:c},c.observe(e,u)},unmounted:Kc}
const Xc={mounted:function(e,t){const a=t.value,l={passive:!t.modifiers?.active}
window.addEventListener("resize",a,l),e._onResize=Object(e._onResize),e._onResize[t.instance.$.uid]={handler:a,options:l},t.modifiers?.quiet||a()},unmounted:function(e,t){if(!e._onResize?.[t.instance.$.uid])return
const{handler:a,options:l}=e._onResize[t.instance.$.uid]
window.removeEventListener("resize",a,l),delete e._onResize[t.instance.$.uid]}}
function Zc(e,t){const{self:a=!1}=t.modifiers??{},l=t.value,o="object"==typeof l&&l.options||{passive:!0},n="function"==typeof l||"handleEvent"in l?l:l.handler,r=a?e:t.arg?document.querySelector(t.arg):window
r&&(r.addEventListener("scroll",n,o),e._onScroll=Object(e._onScroll),e._onScroll[t.instance.$.uid]={handler:n,options:o,target:a?void 0:r})}function Jc(e,t){if(!e._onScroll?.[t.instance.$.uid])return
const{handler:a,options:l,target:o=e}=e._onScroll[t.instance.$.uid]
o.removeEventListener("scroll",a,l),delete e._onScroll[t.instance.$.uid]}const Qc={mounted:Zc,unmounted:Jc,updated:function(e,t){t.value!==t.oldValue&&(Jc(e,t),Zc(e,t))}}
var ed=Object.freeze({__proto__:null,ClickOutside:Nr,Intersect:Fa,Mutate:qc,Resize:Xc,Ripple:ho,Scroll:Qc,Touch:Ti})
const td={"001":1,AD:1,AE:6,AF:6,AG:0,AI:1,AL:1,AM:1,AN:1,AR:1,AS:0,AT:1,AU:1,AX:1,AZ:1,BA:1,BD:0,BE:1,BG:1,BH:6,BM:1,BN:1,BR:0,BS:0,BT:0,BW:0,BY:1,BZ:0,CA:0,CH:1,CL:1,CM:1,CN:1,CO:0,CR:1,CY:1,CZ:1,DE:1,DJ:6,DK:1,DM:0,DO:0,DZ:6,EC:1,EE:1,EG:6,ES:1,ET:0,FI:1,FJ:1,FO:1,FR:1,GB:1,"GB-alt-variant":0,GE:1,GF:1,GP:1,GR:1,GT:0,GU:0,HK:0,HN:0,HR:1,HU:1,ID:0,IE:1,IL:0,IN:0,IQ:6,IR:6,IS:1,IT:1,JM:0,JO:6,JP:0,KE:0,KG:1,KH:0,KR:0,KW:6,KZ:1,LA:0,LB:1,LI:1,LK:1,LT:1,LU:1,LV:1,LY:6,MC:1,MD:1,ME:1,MH:0,MK:1,MM:0,MN:1,MO:0,MQ:1,MT:0,MV:5,MX:0,MY:1,MZ:0,NI:0,NL:1,NO:1,NP:0,NZ:1,OM:6,PA:0,PE:0,PH:0,PK:0,PL:1,PR:0,PT:0,PY:0,QA:6,RE:1,RO:1,RS:1,RU:1,SA:0,SD:6,SE:1,SG:0,SI:1,SK:1,SM:1,SV:0,SY:6,TH:0,TJ:1,TM:1,TR:1,TT:0,TW:0,UA:1,UM:0,US:0,UY:1,UZ:1,VA:1,VE:0,VI:0,VN:1,WS:0,XK:1,YE:0,ZA:0,ZW:0}
function ad(e){return new Date(e.getFullYear(),e.getMonth(),1)}function ld(e){return new Date(e.getFullYear(),e.getMonth()+1,0)}const od=/([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))/
function nd(e){if(null==e)return new Date
if(e instanceof Date)return e
if("string"==typeof e){let t
if(od.test(e))return function(e){const t=e.split("-").map(Number)
return new Date(t[0],t[1]-1,t[2])}(e)
if(t=Date.parse(e),!isNaN(t))return new Date(t)}return null}const rd=new Date(2e3,0,2)
function id(e,t){return e.getTime()>t.getTime()}function sd(e,t){return e.getTime()===t.getTime()}class ud{constructor(e){this.locale=e.locale}date(e){return nd(e)}toJsDate(e){return e}toISO(e){return function(e,t){const a=e.toJsDate(t)
return`${a.getFullYear()}-${P(String(a.getMonth()+1),2,"0")}-${P(String(a.getDate()),2,"0")}`}(this,e)}parseISO(e){return function(e){const[t,a,l]=e.split("-").map(Number)
return new Date(t,a-1,l)}(e)}addDays(e,t){return function(e,t){const a=new Date(e)
return a.setDate(a.getDate()+t),a}(e,t)}addMonths(e,t){return function(e,t){const a=new Date(e)
return a.setMonth(a.getMonth()+t),a}(e,t)}getWeekArray(e){return function(e,t){const a=[]
let l=[]
const o=ad(e),n=ld(e),r=(o.getDay()-td[t.slice(-2).toUpperCase()]+7)%7,i=(n.getDay()-td[t.slice(-2).toUpperCase()]+7)%7
for(let e=0;e<r;e++){const t=new Date(o)
t.setDate(t.getDate()-(r-e)),l.push(t)}for(let t=1;t<=n.getDate();t++){const o=new Date(e.getFullYear(),e.getMonth(),t)
l.push(o),7===l.length&&(a.push(l),l=[])}for(let e=1;e<7-i;e++){const t=new Date(n)
t.setDate(t.getDate()+e),l.push(t)}return a.push(l),a}(e,this.locale)}startOfMonth(e){return ad(e)}endOfMonth(e){return ld(e)}format(e,t){return function(e,t,a){const l=new Date(e)
let o={}
switch(t){case"fullDateWithWeekday":o={weekday:"long",day:"numeric",month:"long",year:"numeric"}
break
case"normalDateWithWeekday":o={weekday:"short",day:"numeric",month:"short"}
break
case"keyboardDate":o={}
break
case"monthAndDate":o={month:"long",day:"numeric"}
break
case"monthAndYear":o={month:"long",year:"numeric"}
break
case"dayOfMonth":o={day:"numeric"}
break
case"shortDate":o={year:"numeric"}
break
default:o={timeZone:"UTC",timeZoneName:"short"}}return new Intl.DateTimeFormat(a,o).format(l)}(e,t,this.locale)}isEqual(e,t){return sd(e,t)}isValid(e){return function(e){if(!e||null==e)return!1
const t=new Date(e)
return t instanceof Date&&!isNaN(t.getTime())}(e)}isWithinRange(e,t){return function(e,t){return id(e,t[0])&&function(e,t){return e.getTime()<t.getTime()}(e,t[1])}(e,t)}isAfter(e,t){return id(e,t)}isBefore(e,t){return!id(e,t)&&!sd(e,t)}isSameDay(e,t){return function(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}(e,t)}isSameMonth(e,t){return function(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}(e,t)}setYear(e,t){return function(e,t){const a=new Date(e)
return a.setFullYear(t),a}(e,t)}getDiff(e,t,a){return function(e,t,a){const l=new Date(e),o=new Date(t)
return"month"===a?l.getMonth()-o.getMonth()+12*(l.getFullYear()-o.getFullYear()):Math.floor((l.getTime()-o.getTime())/864e5)}(e,t,a)}getWeekdays(){return function(e){const t=td[e.slice(-2).toUpperCase()]
return m(7).map((a=>{const l=new Date(rd)
return l.setDate(rd.getDate()+t+a),new Intl.DateTimeFormat(e,{weekday:"narrow"}).format(l)}))}(this.locale)}getYear(e){return function(e){return e.getFullYear()}(e)}getMonth(e){return function(e){return e.getMonth()}(e)}startOfDay(e){return function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())}(e)}endOfDay(e){return function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59,999)}(e)}startOfYear(e){return function(e){return new Date(e.getFullYear(),0,1)}(e)}endOfYear(e){return function(e){return new Date(e.getFullYear(),11,31)}(e)}}const cd=Symbol.for("vuetify:date-adapter")
function dd(e){return L({adapter:ud,locale:{af:"af-ZA",bg:"bg-BG",ca:"ca-ES",ckb:"",cs:"",de:"de-DE",el:"el-GR",en:"en-US",et:"et-EE",fa:"fa-IR",fi:"fi-FI",hr:"hr-HR",hu:"hu-HU",he:"he-IL",id:"id-ID",it:"it-IT",ja:"ja-JP",ko:"ko-KR",lv:"lv-LV",lt:"lt-LT",nl:"nl-NL",no:"no-NO",pl:"pl-PL",pt:"pt-PT",ro:"ro-RO",ru:"ru-RU",sk:"sk-SK",sl:"sl-SI",srCyrl:"sr-SP",srLatn:"sr-SP",sv:"sv-SE",th:"th-TH",tr:"tr-TR",az:"az-AZ",uk:"uk-UA",vi:"vi-VN",zhHans:"zh-CN",zhHant:"zh-TW"}},e)}function vd(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const{blueprint:a,...l}=e,n=L(a,l),{aliases:r={},components:i={},directives:s={}}=n,u=lt(n.defaults),c=fr(n.display,n.ssr),d=Xt(n.theme),v=Rl(n.icons),p=Ht(n.locale),f=dd(n.date),m=e=>{for(const t in s)e.directive(t,s[t])
for(const t in i)e.component(t,i[t])
for(const t in r)e.component(t,st({...r[t],name:t,aliasName:r[t].name}))
if(d.install(e),e.provide(at,u),e.provide(ur,c),e.provide(Gt,d),e.provide(kl,v),e.provide(jt,p),e.provide(cd,f),o&&n.ssr)if(e.$nuxt)e.$nuxt.hook("app:suspense:resolve",(()=>{c.update()}))
else{const{mount:a}=e
e.mount=function(){const l=a(...arguments)
return t.nextTick((()=>c.update())),e.mount=a,l}}ht.reset(),("boolean"!=typeof __VUE_OPTIONS_API__||__VUE_OPTIONS_API__)&&e.mixin({computed:{$vuetify(){return t.reactive({defaults:pd.call(this,at),display:pd.call(this,ur),theme:pd.call(this,Gt),icons:pd.call(this,kl),locale:pd.call(this,jt),date:pd.call(this,cd)})}}})}
return{install:m,defaults:u,display:c,theme:d,icons:v,locale:p,date:f}}function pd(e){const t=this.$,a=t.parent?.provides??t.vnode.appContext?.provides
if(a&&e in a)return a[e]}vd.version="3.3.22"
const fd=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
return vd({components:Gc,directives:ed,...e})},md="3.3.22"
fd.version=md,e.components=Gc,e.createVuetify=fd,e.directives=ed,e.useDefaults=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0
const{props:a,provideSubDefaults:l}=it(e,t)
return l(),a},e.useDisplay=mr,e.useLayout=Bt,e.useLocale=Ut,e.useRtl=Yt,e.useTheme=Jt,e.version=md}))
//# sourceMappingURL=vuetify.min.js.map
