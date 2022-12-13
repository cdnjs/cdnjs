/*!
* Vuetify v3.0.5
* Forged by John Leider
* Released under the MIT License.
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Vuetify={},e.Vue)}(this,(function(e,t){"use strict"
const l="undefined"!=typeof window,a=l&&"IntersectionObserver"in window,o=l&&("ontouchstart"in window||window.navigator.maxTouchPoints>0),n=l&&"undefined"!=typeof CSS&&CSS.supports("selector(:focus-visible)")
function r(e){const a=t.ref(),o=t.ref()
if(l){const l=new ResizeObserver((t=>{null==e||e(t,l),t.length&&(o.value=t[0].contentRect)}))
t.onBeforeUnmount((()=>{l.disconnect()})),t.watch(a,((e,t)=>{t&&(l.unobserve(t),o.value=void 0),e&&l.observe(e)}),{flush:"post"})}return{resizeRef:a,contentRect:t.readonly(o)}}function i(e,t,l){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,l)}function s(e,t,l){return function(e,t,l){if(t.set)t.set.call(e,l)
else{if(!t.writable)throw new TypeError("attempted to set read only private field")
t.value=l}}(e,c(e,t,"set"),l),l}function u(e,t){return function(e,t){if(t.get)return t.get.call(e)
return t.value}(e,c(e,t,"get"))}function c(e,t,l){if(!t.has(e))throw new TypeError("attempted to "+l+" private field on non-instance")
return t.get(e)}function d(e,t,l){const a=t.length-1
if(a<0)return void 0===e?l:e
for(let o=0;o<a;o++){if(null==e)return l
e=e[t[o]]}return null==e||void 0===e[t[a]]?l:e[t[a]]}function v(e,t){if(e===t)return!0
if(e instanceof Date&&t instanceof Date&&e.getTime()!==t.getTime())return!1
if(e!==Object(e)||t!==Object(t))return!1
const l=Object.keys(e)
return l.length===Object.keys(t).length&&l.every((l=>v(e[l],t[l])))}function p(e,t,l){return null!=e&&t&&"string"==typeof t?void 0!==e[t]?e[t]:d(e,(t=(t=t.replace(/\[(\w+)\]/g,".$1")).replace(/^\./,"")).split("."),l):l}function f(e,t,l){if(null==t)return void 0===e?l:e
if(e!==Object(e)){if("function"!=typeof t)return l
const a=t(e,l)
return void 0===a?l:a}if("string"==typeof t)return p(e,t,l)
if(Array.isArray(t))return d(e,t,l)
if("function"!=typeof t)return l
const a=t(e,l)
return void 0===a?l:a}function m(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
return Array.from({length:e},((e,l)=>t+l))}function g(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"px"
return null==e||""===e?void 0:isNaN(+e)?String(e):isFinite(+e)?`${Number(e)}${t}`:void 0}function h(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}const y=Object.freeze({enter:13,tab:9,delete:46,esc:27,space:32,up:38,down:40,left:37,right:39,end:35,home:36,del:46,backspace:8,insert:45,pageup:33,pagedown:34,shift:16}),b=Object.freeze({enter:"Enter",tab:"Tab",delete:"Delete",esc:"Escape",space:"Space",up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",end:"End",home:"Home",del:"Delete",backspace:"Backspace",insert:"Insert",pageup:"PageUp",pagedown:"PageDown",shift:"Shift"})
function V(e){return Object.keys(e)}function S(e,t){const l=Object.create(null),a=Object.create(null)
for(const o in e)t.some((e=>e instanceof RegExp?e.test(o):e===o))?l[o]=e[o]:a[o]=e[o]
return[l,a]}function w(e,t){const l={...e}
return t.forEach((e=>delete l[e])),l}function k(e){return S(e,["class","style","id",/^data-/])}function x(e){return null==e?[]:Array.isArray(e)?e:[e]}function C(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1
return Math.max(t,Math.min(l,e))}function N(e,t){let l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0"
return e+l.repeat(Math.max(0,t-e.length))}function _(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3
if(e<t)return`${e} B`
const l=1024===t?["Ki","Mi","Gi"]:["k","M","G"]
let a=-1
for(;Math.abs(e)>=t&&a<l.length-1;)e/=t,++a
return`${e.toFixed(1)} ${l[a]}B`}function B(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=arguments.length>2?arguments[2]:void 0
const a={}
for(const t in e)a[t]=e[t]
for(const o in t){const n=e[o],r=t[o]
h(n)&&h(r)?a[o]=B(n,r,l):Array.isArray(n)&&Array.isArray(r)&&l?a[o]=l(n,r):a[o]=r}return a}function I(e){return e.map((e=>e.type===t.Fragment?I(e.children):e)).flat()}function $(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:""
return e.replace(/[^a-z]/gi,"-").replace(/\B([A-Z])/g,"-$1").toLowerCase()}function A(e,t){if(!t||"object"!=typeof t)return[]
if(Array.isArray(t))return t.map((t=>A(e,t))).flat(1)
if(Array.isArray(t.children))return t.children.map((t=>A(e,t))).flat(1)
if(t.component){if(Object.getOwnPropertySymbols(t.component.provides).includes(e))return[t.component]
if(t.component.subTree)return A(e,t.component.subTree).flat(1)}return[]}var E=new WeakMap,R=new WeakMap
class T{constructor(e){i(this,E,{writable:!0,value:[]}),i(this,R,{writable:!0,value:0}),this.size=e}push(e){u(this,E)[u(this,R)]=e,s(this,R,(u(this,R)+1)%this.size)}values(){return u(this,E).slice(u(this,R)).concat(u(this,E).slice(0,u(this,R)))}}function L(e){const l=t.reactive({}),a=t.computed(e)
return t.watchEffect((()=>{for(const e in a.value)l[e]=a.value[e]}),{flush:"sync"}),t.toRefs(l)}function P(e,t){return e.includes(t)}const O=/^on[^a-z]/,F=e=>O.test(e),M=[Function,Array]
function z(e,l){return!!(e[l="on"+t.capitalize(l)]||e[`${l}Once`]||e[`${l}Capture`]||e[`${l}OnceCapture`]||e[`${l}CaptureOnce`])}function D(e){for(var t=arguments.length,l=new Array(t>1?t-1:0),a=1;a<t;a++)l[a-1]=arguments[a]
if(Array.isArray(e))for(const t of e)t(...l)
else"function"==typeof e&&e(...l)}const j=["top","bottom"],H=["start","end","left","right"]
function W(e,t){let[l,a]=e.split(" ")
return a||(a=P(j,l)?"start":P(H,l)?"top":"center"),{side:U(l,t),align:U(a,t)}}function U(e,t){return"start"===e?t?"right":"left":"end"===e?t?"left":"right":e}function Y(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function X(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function G(e){return{side:e.align,align:e.side}}function q(e){return P(j,e.side)?"y":"x"}class K{constructor(e){let{x:t,y:l,width:a,height:o}=e
this.x=t,this.y=l,this.width=a,this.height=o}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function Z(e,t){return{x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}}}function J(e){const t=e.getBoundingClientRect(),l=getComputedStyle(e),a=l.transform
if(a){let o,n,r,i,s
if(a.startsWith("matrix3d("))o=a.slice(9,-1).split(/, /),n=+o[0],r=+o[5],i=+o[12],s=+o[13]
else{if(!a.startsWith("matrix("))return new K(t)
o=a.slice(7,-1).split(/, /),n=+o[0],r=+o[3],i=+o[4],s=+o[5]}const u=l.transformOrigin,c=t.x-i-(1-n)*parseFloat(u),d=t.y-s-(1-r)*parseFloat(u.slice(u.indexOf(" ")+1)),v=n?t.width/n:e.offsetWidth+1,p=r?t.height/r:e.offsetHeight+1
return new K({x:c,y:d,width:v,height:p})}return new K(t)}function Q(e,t,l){if(void 0===e.animate)return{finished:Promise.resolve()}
const a=e.animate(t,l)
return void 0===a.finished&&(a.finished=new Promise((e=>{a.onfinish=()=>{e(a)}}))),a}function ee(e,t,l){if(l&&(t={__isVue:!0,$parent:l,$options:t}),t){if(t.$_alreadyWarned=t.$_alreadyWarned||[],t.$_alreadyWarned.includes(e))return
t.$_alreadyWarned.push(e)}return`[Vuetify] ${e}`+(t?function(e){if(e.__isVue&&e.$parent){const t=[]
let l=0
for(;e;){if(t.length>0){const a=t[t.length-1]
if(a.constructor===e.constructor){l++,e=e.$parent
continue}l>0&&(t[t.length-1]=[a,l],l=0)}t.push(e),e=e.$parent}return"\n\nfound in\n\n"+t.map(((e,t)=>`${0===t?"---\x3e ":" ".repeat(5+2*t)}${Array.isArray(e)?`${oe(e[0])}... (${e[1]} recursive calls)`:oe(e)}`)).join("\n")}return`\n\n(found in ${oe(e)})`}(t):"")}function te(e,t,l){const a=ee(e,t,l)
null!=a&&console.warn(a)}function le(e,t,l){const a=ee(e,t,l)
null!=a&&console.error(a)}const ae=/(?:^|[-_])(\w)/g
function oe(e,t){if(e.$root===e)return"<Root>"
const l="function"==typeof e&&null!=e.cid?e.options:e.__isVue?e.$options||e.constructor.options:e||{}
let a=l.name||l._componentTag
const o=l.__file
if(!a&&o){const e=o.match(/([^/\\]+)\.vue$/)
a=null==e?void 0:e[1]}return(a?`<${n=a,n.replace(ae,(e=>e.toUpperCase())).replace(/[-_]/g,"")}>`:"<Anonymous>")+(o&&!1!==t?` at ${o}`:"")
var n}const ne=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]],re=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055,ie=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],se=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4
function ue(e){const t=Array(3),l=re,a=ne
for(let o=0;o<3;++o)t[o]=Math.round(255*C(l(a[o][0]*e[0]+a[o][1]*e[1]+a[o][2]*e[2])))
return{r:t[0],g:t[1],b:t[2]}}function ce(e){let{r:t,g:l,b:a}=e
const o=[0,0,0],n=se,r=ie
t=n(t/255),l=n(l/255),a=n(a/255)
for(let e=0;e<3;++e)o[e]=r[e][0]*t+r[e][1]*l+r[e][2]*a
return o}const de=.20689655172413793,ve=e=>e>de**3?Math.cbrt(e):e/(3*de**2)+4/29,pe=e=>e>de?e**3:3*de**2*(e-4/29)
function fe(e){const t=ve,l=t(e[1])
return[116*l-16,500*(t(e[0]/.95047)-l),200*(l-t(e[2]/1.08883))]}function me(e){const t=pe,l=(e[0]+16)/116
return[.95047*t(l+e[1]/500),t(l),1.08883*t(l-e[2]/200)]}function ge(e){return!!e&&/^(#|var\(--|(rgb|hsl)a?\()/.test(e)}function he(e){if("number"==typeof e)return(isNaN(e)||e<0||e>16777215)&&te(`'${e}' is not a valid hex color`),{r:(16711680&e)>>16,g:(65280&e)>>8,b:255&e}
if("string"==typeof e){let t=e.startsWith("#")?e.slice(1):e;[3,4].includes(t.length)?t=t.split("").map((e=>e+e)).join(""):[6,8].includes(t.length)||te(`'${e}' is not a valid hex(a) color`)
const l=parseInt(t,16)
return(isNaN(l)||l<0||l>4294967295)&&te(`'${e}' is not a valid hex(a) color`),Ce(t)}throw new TypeError(`Colors can only be numbers or strings, recieved ${null==e?e:e.constructor.name} instead`)}function ye(e){const{h:t,s:l,v:a,a:o}=e,n=e=>{const o=(e+t/60)%6
return a-a*l*Math.max(Math.min(o,4-o,1),0)},r=[n(5),n(3),n(1)].map((e=>Math.round(255*e)))
return{r:r[0],g:r[1],b:r[2],a:o}}function be(e){if(!e)return{h:0,s:1,v:1,a:1}
const t=e.r/255,l=e.g/255,a=e.b/255,o=Math.max(t,l,a),n=Math.min(t,l,a)
let r=0
o!==n&&(o===t?r=60*(0+(l-a)/(o-n)):o===l?r=60*(2+(a-t)/(o-n)):o===a&&(r=60*(4+(t-l)/(o-n)))),r<0&&(r+=360)
const i=[r,0===o?0:(o-n)/o,o]
return{h:i[0],s:i[1],v:i[2],a:e.a}}function Ve(e){const{h:t,s:l,v:a,a:o}=e,n=a-a*l/2
return{h:t,s:1===n||0===n?0:(a-n)/Math.min(n,1-n),l:n,a:o}}function Se(e){const{h:t,s:l,l:a,a:o}=e,n=a+l*Math.min(a,1-a)
return{h:t,s:0===n?0:2-2*a/n,v:n,a:o}}function we(e){return function(e){let{r:t,g:l,b:a,a:o}=e
return void 0===o?`rgb(${t}, ${l}, ${a})`:`rgba(${t}, ${l}, ${a}, ${o})`}(ye(e))}function ke(e){const t=Math.round(e).toString(16)
return("00".substr(0,2-t.length)+t).toUpperCase()}function xe(e){let{r:t,g:l,b:a,a:o}=e
return`#${[ke(t),ke(l),ke(a),void 0!==o?ke(Math.round(255*o)):"FF"].join("")}`}function Ce(e){let[t,l,a,o]=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
const l=[]
let a=0
for(;a<e.length;)l.push(e.substr(a,t)),a+=t
return l}(e,2).map((e=>parseInt(e,16)))
return o=void 0===o?o:Math.round(o/255*100)/100,{r:t,g:l,b:a,a:o}}function Ne(e){return be(Ce(e))}function _e(e){return xe(ye(e))}function Be(e,t){const l=fe(ce(e))
return l[0]=l[0]+10*t,ue(me(l))}function Ie(e,t){const l=fe(ce(e))
return l[0]=l[0]-10*t,ue(me(l))}function $e(e){return ce(he(e))[1]}function Ae(e,t){const l=$e(e),a=$e(t)
return(Math.max(l,a)+.05)/(Math.min(l,a)+.05)}function Ee(e,l){const a=t.getCurrentInstance()
if(!a)throw new Error(`[Vuetify] ${e} ${l||"must be called from inside a setup function"}`)
return a}function Re(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"composables"
const t=Ee(e).type
return $((null==t?void 0:t.aliasName)||(null==t?void 0:t.name))}let Te=0,Le=new WeakMap
function Pe(){const e=Ee("getUid")
if(Le.has(e))return Le.get(e)
{const t=Te++
return Le.set(e,t),t}}Pe.reset=()=>{Te=0,Le=new WeakMap}
const Oe=Symbol.for("vuetify:defaults")
function Fe(e){return t.ref(e??{})}function Me(){const e=t.inject(Oe)
if(!e)throw new Error("[Vuetify] Could not find defaults instance")
return e}function ze(e,l){const a=Me(),o=t.ref(e),n=t.computed((()=>{const e=t.unref(null==l?void 0:l.scoped),n=t.unref(null==l?void 0:l.reset),r=t.unref(null==l?void 0:l.root)
let i=B(o.value,{prev:a.value})
if(e)return i
if(n||r){const e=Number(n||1/0)
for(let t=0;t<=e&&i.prev;t++)i=i.prev
return i}return B(i.prev,i)}))
return t.provide(Oe,n),n}function De(e,l){let a
t.watch(e,(e=>{if(e&&!a)a=t.effectScope(),a.run(l)
else if(!e){var o
null==(o=a)||o.stop(),a=void 0}}),{immediate:!0}),t.onScopeDispose((()=>{var e
null==(e=a)||e.stop()}))}function je(e,t){return l=>Object.keys(e).reduce(((a,o)=>{const n="object"==typeof e[o]&&null!=e[o]&&!Array.isArray(e[o])?e[o]:{type:e[o]}
return a[o]=l&&o in l?{...n,default:l[o]}:n,t&&!a[o].source&&(a[o].source=t),a}),{})}function He(e,t){var l,a
return(null==(l=e.props)?void 0:l.hasOwnProperty(t))||(null==(a=e.props)?void 0:a.hasOwnProperty($(t)))}const We=function(e){return e._setup=e._setup??e.setup,e.name?(e._setup&&(e.props=e.props??{},e.props=je(e.props,$(e.name))(),e.props._as=String,e.setup=function(l,a){const o=t.getCurrentInstance(),n=Me(),r=t.shallowRef(),i=t.shallowReactive({...t.toRaw(l)})
t.watchEffect((()=>{const t=n.value.global,a=n.value[l._as??e.name]
if(a){const e=Object.entries(a).filter((e=>{let[t]=e
return t.startsWith(t[0].toUpperCase())}))
e.length&&(r.value=Object.fromEntries(e))}for(const e of Object.keys(l)){let n=l[e]
He(o.vnode,e)||(n=(null==a?void 0:a[e])??(null==t?void 0:t[e])??l[e]),i[e]!==n&&(i[e]=n)}}))
const s=e._setup(i,a)
return De(r,(()=>{var e
ze(B((null==(e=function(e){const{provides:t}=Ee("injectSelf")
if(t&&e in t)return t[e]}(Oe))?void 0:e.value)??{},r.value))})),s}),e):(te("The component is missing an explicit name, unable to generate default prop value"),e)}
function Ue(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0]
return l=>(e?We:t.defineComponent)(l)}function Ye(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"div",a=arguments.length>2?arguments[2]:void 0
return We({name:a??t.capitalize(t.camelize(e.replace(/__/g,"-"))),props:{tag:{type:String,default:l}},setup(l,a){let{slots:o}=a
return()=>{var a
return t.h(l.tag,{class:e},null==(a=o.default)?void 0:a.call(o))}}})}function Xe(e){if("function"!=typeof e.getRootNode){for(;e.parentNode;)e=e.parentNode
return e!==document?null:document}const t=e.getRootNode()
return t!==document&&t.getRootNode({composed:!0})!==document?null:t}const Ge="cubic-bezier(0.4, 0, 0.2, 1)"
function qe(e){for(;e;){if(Ze(e))return e
e=e.parentElement}return document.scrollingElement}function Ke(e,t){const l=[]
if(t&&e&&!t.contains(e))return l
for(;e&&(Ze(e)&&l.push(e),e!==t);)e=e.parentElement
return l}function Ze(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1
const t=window.getComputedStyle(e)
return"scroll"===t.overflowY||"auto"===t.overflowY&&e.scrollHeight>e.clientHeight}function Je(e){Ee("useRender").render=e}const Qe=Symbol.for("vuetify:layout"),et=Symbol.for("vuetify:layout-item"),tt=je({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),lt=je({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item")
function at(){const e=t.inject(Qe)
if(!e)throw new Error("[Vuetify] Could not find injected layout")
return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function ot(e){const l=t.inject(Qe)
if(!l)throw new Error("[Vuetify] Could not find injected layout")
const a=e.id??`layout-item-${Pe()}`,o=Ee("useLayoutItem")
t.provide(et,{id:a})
const n=t.ref(!1)
t.onDeactivated((()=>n.value=!0)),t.onActivated((()=>n.value=!1))
const{layoutItemStyles:r,layoutItemScrimStyles:i}=l.register(o,{...e,active:t.computed((()=>!n.value&&e.active.value)),id:a})
return t.onBeforeUnmount((()=>l.unregister(a))),{layoutItemStyles:r,layoutRect:l.layoutRect,layoutItemScrimStyles:i}}function nt(e){const l=t.inject(Qe,null),a=t.computed((()=>l?l.rootZIndex.value-100:1e3)),o=t.ref([]),n=t.reactive(new Map),i=t.reactive(new Map),s=t.reactive(new Map),u=t.reactive(new Map),c=t.reactive(new Map),{resizeRef:d,contentRect:v}=r(),p=t.computed((()=>{const t=new Map,l=e.overlaps??[]
for(const e of l.filter((e=>e.includes(":")))){const[l,a]=e.split(":")
if(!o.value.includes(l)||!o.value.includes(a))continue
const r=n.get(l),s=n.get(a),u=i.get(l),c=i.get(a)
r&&s&&u&&c&&(t.set(a,{position:r.value,amount:parseInt(u.value,10)}),t.set(l,{position:s.value,amount:-parseInt(c.value,10)}))}return t})),f=t.computed((()=>{const e=[...new Set([...s.values()].map((e=>e.value)))].sort(((e,t)=>e-t)),t=[]
for(const l of e){const e=o.value.filter((e=>{var t
return(null==(t=s.get(e))?void 0:t.value)===l}))
t.push(...e)}return((e,t,l,a)=>{let o={top:0,left:0,right:0,bottom:0}
const n=[{id:"",layer:{...o}}]
for(const r of e){const e=t.get(r),i=l.get(r),s=a.get(r)
if(!e||!i||!s)continue
const u={...o,[e.value]:parseInt(o[e.value],10)+(s.value?parseInt(i.value,10):0)}
n.push({id:r,layer:u}),o=u}return n})(t,n,i,u)})),m=t.computed((()=>!Array.from(c.values()).some((e=>e.value)))),h=t.computed((()=>f.value[f.value.length-1].layer)),y=t.computed((()=>({"--v-layout-left":g(h.value.left),"--v-layout-right":g(h.value.right),"--v-layout-top":g(h.value.top),"--v-layout-bottom":g(h.value.bottom),...m.value?void 0:{transition:"none"}}))),b=t.computed((()=>f.value.slice(1).map(((e,t)=>{let{id:l}=e
const{layer:a}=f.value[t],o=i.get(l),r=n.get(l)
return{id:l,...a,size:Number(o.value),position:r.value}})))),V=e=>b.value.find((t=>t.id===e)),S=Ee("createLayout"),w=t.ref(!1)
t.onMounted((()=>{w.value=!0})),t.provide(Qe,{register:(e,l)=>{let{id:r,order:d,position:v,layoutSize:g,elementSize:h,active:y,disableTransitions:V,absolute:k}=l
s.set(r,d),n.set(r,v),i.set(r,g),u.set(r,y),V&&c.set(r,V)
const x=A(et,null==S?void 0:S.vnode).indexOf(e)
x>-1?o.value.splice(x,0,r):o.value.push(r)
const C=t.computed((()=>b.value.findIndex((e=>e.id===r)))),N=t.computed((()=>a.value+2*f.value.length-2*C.value))
return{layoutItemStyles:t.computed((()=>{const e="left"===v.value||"right"===v.value,t="right"===v.value,l="bottom"===v.value,o={[v.value]:0,zIndex:N.value,transform:`translate${e?"X":"Y"}(${(y.value?0:-110)*(t||l?-1:1)}%)`,position:k.value||1e3!==a.value?"absolute":"fixed",...m.value?void 0:{transition:"none"}}
if(!w.value)return o
const n=b.value[C.value]
if(!n)throw new Error(`[Vuetify] Could not find layout item "${r}"`)
const i=p.value.get(r)
return i&&(n[i.position]+=i.amount),{...o,height:e?`calc(100% - ${n.top}px - ${n.bottom}px)`:h.value?`${h.value}px`:void 0,left:t?void 0:`${n.left}px`,right:t?`${n.right}px`:void 0,top:"bottom"!==v.value?`${n.top}px`:void 0,bottom:"top"!==v.value?`${n.bottom}px`:void 0,width:e?h.value?`${h.value}px`:void 0:`calc(100% - ${n.left}px - ${n.right}px)`}})),layoutItemScrimStyles:t.computed((()=>({zIndex:N.value-1}))),zIndex:N}},unregister:e=>{s.delete(e),n.delete(e),i.delete(e),u.delete(e),c.delete(e),o.value=o.value.filter((t=>t!==e))},mainRect:h,mainStyles:y,getLayoutItem:V,items:b,layoutRect:v,rootZIndex:a})
return{layoutClasses:t.computed((()=>["v-layout",{"v-layout--full-height":e.fullHeight}])),layoutStyles:t.computed((()=>({zIndex:a.value,position:l?"relative":void 0,overflow:l?"hidden":void 0}))),getLayoutItem:V,items:b,layoutRect:v,layoutRef:d}}const rt=2.4,it=.2126729,st=.7151522,ut=.072175,ct=.03,dt=12.82051282051282,vt=.06
function pt(e,t){const l=(e.r/255)**rt,a=(e.g/255)**rt,o=(e.b/255)**rt,n=(t.r/255)**rt,r=(t.g/255)**rt,i=(t.b/255)**rt
let s,u=l*it+a*st+o*ut,c=n*it+r*st+i*ut
if(u<=ct&&(u+=(ct-u)**1.45),c<=ct&&(c+=(ct-c)**1.45),Math.abs(c-u)<5e-4)return 0
if(c>u){const e=1.25*(c**.55-u**.58)
s=e<.001?0:e<.078?e-e*dt*vt:e-vt}else{const e=1.25*(c**.62-u**.57)
s=e>-.001?0:e>-.078?e-e*dt*vt:e+vt}return 100*s}const ft=Symbol.for("vuetify:theme"),mt=je({theme:String},"theme"),gt={defaultTheme:"light",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#6200EE","primary-darken-1":"#3700B3",secondary:"#03DAC6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-variant":"#BDBDBD","on-surface-variant":"#424242",primary:"#BB86FC","primary-darken-1":"#3700B3",secondary:"#03DAC5","secondary-darken-1":"#03DAC5",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#212529","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}}}
function ht(e){const a=t.reactive(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gt
if(!e)return{...gt,isDisabled:!0}
const t={}
for(const[o,n]of Object.entries(e.themes??{})){var l,a
const e=n.dark||"dark"===o?null==(l=gt.themes)?void 0:l.dark:null==(a=gt.themes)?void 0:a.light
t[o]=B(e,n)}return B(gt,{...e,themes:t})}(e)),o=t.ref(a.defaultTheme),n=t.ref(a.themes),r=t.computed((()=>{const e={}
for(const[t,l]of Object.entries(n.value)){const o=e[t]={...l,colors:{...l.colors}}
if(a.variations)for(const e of a.variations.colors){const t=o.colors[e]
if(t)for(const l of["lighten","darken"]){const n="lighten"===l?Be:Ie
for(const r of m(a.variations[l],1))o.colors[`${e}-${l}-${r}`]=xe(n(he(t),r))}}for(const e of Object.keys(o.colors)){if(/^on-[a-z]/.test(e)||o.colors[`on-${e}`])continue
const t=`on-${e}`,l=he(o.colors[e]),a=Math.abs(pt(he(0),l)),n=Math.abs(pt(he(16777215),l))
o.colors[t]=n>Math.min(a,50)?"#fff":"#000"}}return e})),i=t.computed((()=>r.value[o.value])),s=t.computed((()=>{const e=[]
i.value.dark&&Vt(e,":root",["color-scheme: dark"])
for(const[t,l]of Object.entries(r.value)){const{variables:a,dark:o}=l
Vt(e,`.v-theme--${t}`,["color-scheme: "+(o?"dark":"normal"),...St(l),...Object.keys(a).map((e=>{const t=a[e],l="string"==typeof t&&t.startsWith("#")?he(t):void 0
return`--v-${e}: ${(l?`${l.r}, ${l.g}, ${l.b}`:void 0)??t}`}))])}const t=[],l=[],a=new Set(Object.values(r.value).flatMap((e=>Object.keys(e.colors))))
for(const e of a)/^on-[a-z]/.test(e)?Vt(l,`.${e}`,[`color: rgb(var(--v-theme-${e})) !important`]):(Vt(t,`.bg-${e}`,[`--v-theme-overlay-multiplier: var(--v-theme-${e}-overlay-multiplier)`,`background: rgb(var(--v-theme-${e})) !important`,`color: rgb(var(--v-theme-on-${e})) !important`]),Vt(l,`.text-${e}`,[`color: rgb(var(--v-theme-${e})) !important`]),Vt(l,`.border-${e}`,[`--v-border-color: var(--v-theme-${e})`]))
return e.push(...t,...l),e.map(((e,t)=>0===t?e:`    ${e}`)).join("")}))
const u=t.computed((()=>a.isDisabled?void 0:`v-theme--${o.value}`))
return{install:function(e){const o=e._context.provides.usehead
if(o)o.addHeadObjs(t.computed((()=>{const e={children:s.value,type:"text/css",id:"vuetify-theme-stylesheet"}
return a.cspNonce&&(e.nonce=a.cspNonce),{style:[e]}}))),l&&t.watchEffect((()=>o.updateDOM()))
else{let e=l?document.getElementById("vuetify-theme-stylesheet"):null
function o(){if(!a.isDisabled){if("undefined"!=typeof document&&!e){const t=document.createElement("style")
t.type="text/css",t.id="vuetify-theme-stylesheet",a.cspNonce&&t.setAttribute("nonce",a.cspNonce),e=t,document.head.appendChild(e)}e&&(e.innerHTML=s.value)}}t.watch(s,o,{immediate:!0})}},isDisabled:a.isDisabled,name:o,themes:n,current:i,computedThemes:r,themeClasses:u,styles:s,global:{name:o,current:i}}}function yt(e){Ee("provideTheme")
const l=t.inject(ft,null)
if(!l)throw new Error("Could not find Vuetify theme injection")
const a=t.computed((()=>e.theme??(null==l?void 0:l.name.value))),o=t.computed((()=>l.isDisabled?void 0:`v-theme--${a.value}`)),n={...l,name:a,themeClasses:o}
return t.provide(ft,n),n}function bt(){Ee("useTheme")
const e=t.inject(ft,null)
if(!e)throw new Error("Could not find Vuetify theme injection")
return e}function Vt(e,t,l){e.push(`${t} {\n`,...l.map((e=>`  ${e};\n`)),"}\n")}function St(e){const t=e.dark?2:1,l=e.dark?1:2,a=[]
for(const[o,n]of Object.entries(e.colors)){const e=he(n)
a.push(`--v-theme-${o}: ${e.r},${e.g},${e.b}`),o.startsWith("on-")||a.push(`--v-theme-${o}-overlay-multiplier: ${$e(n)>.18?t:l}`)}return a}function wt(e,l,a){let o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e=>e,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e=>e
const r=Ee("useProxiedModel"),i=t.ref(void 0!==e[l]?e[l]:a),s=$(l),u=s!==l,c=u?t.computed((()=>{var t,a,o,n
return e[l],!(!(null!=(t=r.vnode.props)&&t.hasOwnProperty(l)||null!=(a=r.vnode.props)&&a.hasOwnProperty(s))||!(null!=(o=r.vnode.props)&&o.hasOwnProperty(`onUpdate:${l}`)||null!=(n=r.vnode.props)&&n.hasOwnProperty(`onUpdate:${s}`)))})):t.computed((()=>{var t,a
return e[l],!(null==(t=r.vnode.props)||!t.hasOwnProperty(l)||null==(a=r.vnode.props)||!a.hasOwnProperty(`onUpdate:${l}`))}))
De((()=>!c.value),(()=>{t.watch((()=>e[l]),(e=>{i.value=e}))}))
const d=t.computed({get:()=>o(c.value?e[l]:i.value),set(t){const a=n(t);(c.value?e[l]:i.value)!==a&&o(c.value?e[l]:i.value)!==t&&(i.value=a,null==r||r.emit(`update:${l}`,a))}})
return Object.defineProperty(d,"externalValue",{get:()=>c.value?e[l]:i.value}),d}var kt={badge:"Badge",close:"Close",dataIterator:{noResultsText:"No matching records found",loadingText:"Loading items..."},dataTable:{itemsPerPageText:"Rows per page:",ariaLabel:{sortDescending:"Sorted descending.",sortAscending:"Sorted ascending.",sortNone:"Not sorted.",activateNone:"Activate to remove sorting.",activateDescending:"Activate to sort descending.",activateAscending:"Activate to sort ascending."},sortBy:"Sort by"},dataFooter:{itemsPerPageText:"Items per page:",itemsPerPageAll:"All",nextPage:"Next page",prevPage:"Previous page",firstPage:"First page",lastPage:"Last page",pageText:"{0}-{1} of {2}"},datePicker:{itemsSelected:"{0} selected",nextMonthAriaLabel:"Next month",nextYearAriaLabel:"Next year",prevMonthAriaLabel:"Previous month",prevYearAriaLabel:"Previous year"},noDataText:"No data available",carousel:{prev:"Previous visual",next:"Next visual",ariaLabel:{delimiter:"Carousel slide {0} of {1}"}},calendar:{moreEvents:"{0} more"},input:{clear:"Clear {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action"},fileInput:{counter:"{0} files",counterSize:"{0} files ({1} in total)"},timePicker:{am:"AM",pm:"PM"},pagination:{ariaLabel:{root:"Pagination Navigation",next:"Next page",previous:"Previous page",page:"Goto Page {0}",currentPage:"Page {0}, Current Page",first:"First page",last:"Last page"}},rating:{ariaLabel:{item:"Rating {0} of {1}"}}}
const xt="$vuetify.",Ct=(e,t)=>e.replace(/\{(\d+)\}/g,((e,l)=>String(t[+l]))),Nt=(e,t,l)=>function(a){for(var o=arguments.length,n=new Array(o>1?o-1:0),r=1;r<o;r++)n[r-1]=arguments[r]
if(!a.startsWith(xt))return Ct(a,n)
const i=a.replace(xt,""),s=e.value&&l.value[e.value],u=t.value&&l.value[t.value]
let c=p(s,i,null)
return c||(te(`Translation key "${a}" not found in "${e.value}", trying fallback locale`),c=p(u,i,null)),c||(le(`Translation key "${a}" not found in fallback`),c=a),"string"!=typeof c&&(le(`Translation key "${a}" has a non-string value`),c=a),Ct(c,n)}
function _t(e,t){return(l,a)=>new Intl.NumberFormat([e.value,t.value],a).format(l)}function Bt(e,l,a){const o=wt(e,l,e[l]??a.value)
return o.value=e[l]??a.value,t.watch(a,(t=>{null==e[l]&&(o.value=a.value)})),o}function It(e){return t=>{const l=Bt(t,"locale",e.current),a=Bt(t,"fallback",e.fallback),o=Bt(t,"messages",e.messages)
return{name:"vuetify",current:l,fallback:a,messages:o,t:Nt(l,a,o),n:_t(l,a),provide:It({current:l,fallback:a,messages:o})}}}const $t={af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!1,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1},At=Symbol.for("vuetify:locale")
function Et(e){const l=null!=e&&e.adapter&&null!=(null==e?void 0:e.adapter).name?null==e?void 0:e.adapter:function(e){const l=t.ref((null==e?void 0:e.locale)??"en"),a=t.ref((null==e?void 0:e.fallback)??"en"),o=t.ref({en:kt,...null==e?void 0:e.messages})
return{name:"vuetify",current:l,fallback:a,messages:o,t:Nt(l,a,o),n:_t(l,a),provide:It({current:l,fallback:a,messages:o})}}(e)
const a=function(e,l){const a=t.ref((null==l?void 0:l.rtl)??$t),o=t.computed((()=>a.value[e.current.value]??!1))
return{isRtl:o,rtl:a,rtlClasses:t.computed((()=>"v-locale--is-"+(o.value?"rtl":"ltr")))}}(l,e)
return{...l,...a}}function Rt(){const e=t.inject(At)
if(!e)throw new Error("[Vuetify] Could not find injected locale instance")
return e}function Tt(e){const l=t.inject(At)
if(!l)throw new Error("[Vuetify] Could not find injected locale instance")
const a=l.provide(e),o=function(e,l,a){const o=t.computed((()=>a.rtl??l.value[e.current.value]??!1))
return{isRtl:o,rtl:l,rtlClasses:t.computed((()=>"v-locale--is-"+(o.value?"rtl":"ltr")))}}(a,l.rtl,e),n={...a,...o}
return t.provide(At,n),n}function Lt(){const e=t.inject(At)
if(!e)throw new Error("[Vuetify] Could not find injected rtl instance")
return{isRtl:e.isRtl,rtlClasses:e.rtlClasses}}const Pt=We({name:"VApp",props:{...tt({fullHeight:!0}),...mt()},setup(e,l){let{slots:a}=l
const o=yt(e),{layoutClasses:n,layoutStyles:r,getLayoutItem:i,items:s,layoutRef:u}=nt(e),{rtlClasses:c}=Lt()
return Je((()=>{var e
return t.createVNode("div",{ref:u,class:["v-application",o.themeClasses.value,n.value,c.value],style:r.value},[t.createVNode("div",{class:"v-application__wrap"},[null==(e=a.default)?void 0:e.call(a)])])})),{getLayoutItem:i,items:s,theme:o}}}),Ot=t.defineComponent({name:"VDefaultsProvider",props:{defaults:Object,reset:[Number,String],root:Boolean,scoped:Boolean},setup(e,l){let{slots:a}=l
const{defaults:o,reset:n,root:r,scoped:i}=t.toRefs(e)
return ze(o,{reset:n,root:r,scoped:i}),()=>{var e
return null==(e=a.default)?void 0:e.call(a)}}})
function Ft(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top center 0",a=arguments.length>2?arguments[2]:void 0
return We({name:e,props:{group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:{type:String,default:a},origin:{type:String,default:l}},setup(l,a){let{slots:o}=a
return()=>{const a=l.group?t.TransitionGroup:t.Transition
return t.h(a,{name:e,mode:l.mode,onBeforeEnter(e){e.style.transformOrigin=l.origin},onLeave(e){if(l.leaveAbsolute){const{offsetTop:t,offsetLeft:l,offsetWidth:a,offsetHeight:o}=e
e._transitionInitialStyles={position:e.style.position,top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},e.style.position="absolute",e.style.top=`${t}px`,e.style.left=`${l}px`,e.style.width=`${a}px`,e.style.height=`${o}px`}l.hideOnLeave&&e.style.setProperty("display","none","important")},onAfterLeave(e){if(l.leaveAbsolute&&null!=e&&e._transitionInitialStyles){const{position:t,top:l,left:a,width:o,height:n}=e._transitionInitialStyles
delete e._transitionInitialStyles,e.style.position=t||"",e.style.top=l||"",e.style.left=a||"",e.style.width=o||"",e.style.height=n||""}}},o.default)}}})}function Mt(e,l){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in-out"
return We({name:e,props:{mode:{type:String,default:a}},setup(a,o){let{slots:n}=o
return()=>t.h(t.Transition,{name:e,...l},n.default)}})}function zt(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",l=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
const a=l?"width":"height",o=t.camelize(`offset-${a}`)
return{onBeforeEnter(e){e._parent=e.parentNode,e._initialStyle={transition:e.style.transition,overflow:e.style.overflow,[a]:e.style[a]}},onEnter(t){const l=t._initialStyle
t.style.setProperty("transition","none","important"),t.style.overflow="hidden"
const n=`${t[o]}px`
t.style[a]="0",t.offsetHeight,t.style.transition=l.transition,e&&t._parent&&t._parent.classList.add(e),requestAnimationFrame((()=>{t.style[a]=n}))},onAfterEnter:r,onEnterCancelled:r,onLeave(e){e._initialStyle={transition:"",overflow:e.style.overflow,[a]:e.style[a]},e.style.overflow="hidden",e.style[a]=`${e[o]}px`,e.offsetHeight,requestAnimationFrame((()=>e.style[a]="0"))},onAfterLeave:n,onLeaveCancelled:n}
function n(t){e&&t._parent&&t._parent.classList.remove(e),r(t)}function r(e){const t=e._initialStyle[a]
e.style.overflow=e._initialStyle.overflow,null!=t&&(e.style[a]=t),delete e._initialStyle}}const Dt=We({name:"VDialogTransition",props:{target:Object},setup(e,l){let{slots:a}=l
const o={onBeforeEnter(e){e.style.pointerEvents="none",e.style.visibility="hidden"},async onEnter(t,l){var a
await new Promise((e=>requestAnimationFrame(e))),await new Promise((e=>requestAnimationFrame(e))),t.style.visibility=""
const{x:o,y:n,sx:r,sy:i,speed:s}=Ht(e.target,t),u=Q(t,[{transform:`translate(${o}px, ${n}px) scale(${r}, ${i})`,opacity:0},{transform:""}],{duration:225*s,easing:"cubic-bezier(0.0, 0, 0.2, 1)"})
null==(a=jt(t))||a.forEach((e=>{Q(e,[{opacity:0},{opacity:0,offset:.33},{opacity:1}],{duration:450*s,easing:Ge})})),u.finished.then((()=>l()))},onAfterEnter(e){e.style.removeProperty("pointer-events")},onBeforeLeave(e){e.style.pointerEvents="none"},async onLeave(t,l){var a
await new Promise((e=>requestAnimationFrame(e)))
const{x:o,y:n,sx:r,sy:i,speed:s}=Ht(e.target,t)
Q(t,[{transform:""},{transform:`translate(${o}px, ${n}px) scale(${r}, ${i})`,opacity:0}],{duration:125*s,easing:"cubic-bezier(0.4, 0, 1, 1)"}).finished.then((()=>l())),null==(a=jt(t))||a.forEach((e=>{Q(e,[{},{opacity:0,offset:.2},{opacity:0}],{duration:250*s,easing:Ge})}))},onAfterLeave(e){e.style.removeProperty("pointer-events")}}
return()=>e.target?t.createVNode(t.Transition,t.mergeProps({name:"dialog-transition"},o,{css:!1}),a):t.createVNode(t.Transition,{name:"dialog-transition"},a)}})
function jt(e){var t
const l=null==(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))?void 0:t.children
return l&&[...l]}function Ht(e,t){const l=e.getBoundingClientRect(),a=J(t),[o,n]=getComputedStyle(t).transformOrigin.split(" ").map((e=>parseFloat(e))),[r,i]=getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ")
let s=l.left+l.width/2
"left"===r||"left"===i?s-=l.width/2:"right"!==r&&"right"!==i||(s+=l.width/2)
let u=l.top+l.height/2
"top"===r||"top"===i?u-=l.height/2:"bottom"!==r&&"bottom"!==i||(u+=l.height/2)
const c=l.width/a.width,d=l.height/a.height,v=Math.max(1,c,d),p=c/v||0,f=d/v||0,m=a.width*a.height/(window.innerWidth*window.innerHeight),g=m>.12?Math.min(1.5,10*(m-.12)+1):1
return{x:s-(o+a.left),y:u-(n+a.top),sx:p,sy:f,speed:g}}const Wt=Ft("fab-transition","center center","out-in"),Ut=Ft("dialog-bottom-transition"),Yt=Ft("dialog-top-transition"),Xt=Ft("fade-transition"),Gt=Ft("scale-transition"),qt=Ft("scroll-x-transition"),Kt=Ft("scroll-x-reverse-transition"),Zt=Ft("scroll-y-transition"),Jt=Ft("scroll-y-reverse-transition"),Qt=Ft("slide-x-transition"),el=Ft("slide-x-reverse-transition"),tl=Ft("slide-y-transition"),ll=Ft("slide-y-reverse-transition"),al=Mt("expand-transition",zt()),ol=Mt("expand-x-transition",zt("",!0)),nl=je({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension")
function rl(e){return{dimensionStyles:t.computed((()=>({height:g(e.height),maxHeight:g(e.maxHeight),maxWidth:g(e.maxWidth),minHeight:g(e.minHeight),minWidth:g(e.minWidth),width:g(e.width)})))}}const il=We({name:"VResponsive",props:{aspectRatio:[String,Number],contentClass:String,...nl()},setup(e,l){let{slots:a}=l
const{aspectStyles:o}=function(e){return{aspectStyles:t.computed((()=>{const t=Number(e.aspectRatio)
return t?{paddingBottom:String(1/t*100)+"%"}:void 0}))}}(e),{dimensionStyles:n}=rl(e)
return Je((()=>{var l
return t.createVNode("div",{class:"v-responsive",style:n.value},[t.createVNode("div",{class:"v-responsive__sizer",style:o.value},null),null==(l=a.additional)?void 0:l.call(a),a.default&&t.createVNode("div",{class:["v-responsive__content",e.contentClass]},[a.default()])])})),{}}})
function sl(e,t){var l
const a=null==(l=e._observe)?void 0:l[t.instance.$.uid]
a&&(a.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const ul={mounted:function(e,t){if(!a)return
const l=t.modifiers||{},o=t.value,{handler:n,options:r}="object"==typeof o?o:{handler:o,options:{}},i=new IntersectionObserver((function(){var a
let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1?arguments[1]:void 0
const i=null==(a=e._observe)?void 0:a[t.instance.$.uid]
if(!i)return
const s=o.some((e=>e.isIntersecting))
!n||l.quiet&&!i.init||l.once&&!s&&!i.init||n(s,o,r),s&&l.once?sl(e,t):i.init=!0}),r)
e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:i},i.observe(e)},unmounted:sl},cl=je({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>!0!==e}},"transition"),dl=(e,l)=>{let{slots:a}=l
const{transition:o,...n}=e,{component:r=t.Transition,...i}="object"==typeof o?o:{}
return t.h(r,t.mergeProps("string"==typeof o?{name:o}:i,n),a)},vl=We({name:"VImg",directives:{intersect:ul},props:{aspectRatio:[String,Number],alt:String,cover:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},srcset:String,width:[String,Number],...cl()},emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,l){let{emit:o,slots:n}=l
const r=t.ref(""),i=t.ref(),s=t.ref(e.eager?"loading":"idle"),u=t.ref(),c=t.ref(),d=t.computed((()=>e.src&&"object"==typeof e.src?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)})),v=t.computed((()=>d.value.aspect||u.value/c.value||0))
function p(l){if((!e.eager||!l)&&(!a||l||e.eager)){if(s.value="loading",d.value.lazySrc){const e=new Image
e.src=d.value.lazySrc,y(e,null)}d.value.src&&t.nextTick((()=>{var e,t
if(o("loadstart",(null==(e=i.value)?void 0:e.currentSrc)||d.value.src),null!=(t=i.value)&&t.complete){if(i.value.naturalWidth||m(),"error"===s.value)return
v.value||y(i.value,null),f()}else v.value||y(i.value),h()}))}}function f(){var e
h(),s.value="loaded",o("load",(null==(e=i.value)?void 0:e.currentSrc)||d.value.src)}function m(){var e
s.value="error",o("error",(null==(e=i.value)?void 0:e.currentSrc)||d.value.src)}function h(){const e=i.value
e&&(r.value=e.currentSrc||e.src)}function y(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100
const l=()=>{const{naturalHeight:a,naturalWidth:o}=e
a||o?(u.value=o,c.value=a):e.complete||"loading"!==s.value||null==t?(e.currentSrc.endsWith(".svg")||e.currentSrc.startsWith("data:image/svg+xml"))&&(u.value=1,c.value=1):setTimeout(l,t)}
l()}t.watch((()=>e.src),(()=>{p("idle"!==s.value)})),t.onBeforeMount((()=>p()))
const b=t.computed((()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover}))),V=()=>{var l
if(!d.value.src||"idle"===s.value)return null
const a=t.createVNode("img",{class:["v-img__img",b.value],src:d.value.src,srcset:d.value.srcset,alt:"",sizes:e.sizes,ref:i,onLoad:f,onError:m},null),o=null==(l=n.sources)?void 0:l.call(n)
return t.createVNode(dl,{transition:e.transition,appear:!0},{default:()=>[t.withDirectives(o?t.createVNode("picture",{class:"v-img__picture"},[o,a]):a,[[t.vShow,"loaded"===s.value]])]})},S=()=>t.createVNode(dl,{transition:e.transition},{default:()=>[d.value.lazySrc&&"loaded"!==s.value&&t.createVNode("img",{class:["v-img__img","v-img__img--preload",b.value],src:d.value.lazySrc,alt:""},null)]}),w=()=>n.placeholder?t.createVNode(dl,{transition:e.transition,appear:!0},{default:()=>[("loading"===s.value||"error"===s.value&&!n.error)&&t.createVNode("div",{class:"v-img__placeholder"},[n.placeholder()])]}):null,k=()=>n.error?t.createVNode(dl,{transition:e.transition,appear:!0},{default:()=>["error"===s.value&&t.createVNode("div",{class:"v-img__error"},[n.error()])]}):null,x=()=>e.gradient?t.createVNode("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,C=t.ref(!1)
{const e=t.watch(v,(t=>{t&&(requestAnimationFrame((()=>{requestAnimationFrame((()=>{C.value=!0}))})),e())}))}return Je((()=>t.withDirectives(t.createVNode(il,{class:["v-img",{"v-img--booting":!C.value}],style:{width:g("auto"===e.width?u.value:e.width)},aspectRatio:v.value,"aria-label":e.alt,role:e.alt?"img":void 0},{additional:()=>t.createVNode(t.Fragment,null,[t.createVNode(V,null,null),t.createVNode(S,null,null),t.createVNode(x,null,null),t.createVNode(w,null,null),t.createVNode(k,null,null)]),default:n.default}),[[t.resolveDirective("intersect"),{handler:p,options:e.options},null,{once:!0}]]))),{currentSrc:r,image:i,state:s,naturalWidth:u,naturalHeight:c}}}),pl=je({tag:{type:String,default:"div"}},"tag"),fl=Ue()({name:"VToolbarTitle",props:{text:String,...pl()},setup(e,l){let{slots:a}=l
return Je((()=>{var l
const o=!!(a.default||a.text||e.text)
return t.createVNode(e.tag,{class:"v-toolbar-title"},{default:()=>[o&&t.createVNode("div",{class:"v-toolbar-title__placeholder"},[a.text?a.text():e.text,null==(l=a.default)?void 0:l.call(a)])]})})),{}}}),ml=je({border:[Boolean,Number,String]},"border")
function gl(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
const a=t.computed((()=>{const a=t.isRef(e)?e.value:e.border,o=[]
if(!0===a||""===a)o.push(`${l}--border`)
else if("string"==typeof a||0===a)for(const e of String(a).split(" "))o.push(`border-${e}`)
return o}))
return{borderClasses:a}}const hl=je({elevation:{type:[Number,String],validator(e){const t=parseInt(e)
return!isNaN(t)&&t>=0&&t<=24}}},"elevation")
function yl(e){return{elevationClasses:t.computed((()=>{const l=t.isRef(e)?e.value:e.elevation,a=[]
return null==l||a.push(`elevation-${l}`),a}))}}const bl=je({rounded:{type:[Boolean,Number,String],default:void 0}},"rounded")
function Vl(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
const a=t.computed((()=>{const a=t.isRef(e)?e.value:e.rounded,o=[]
if(!0===a||""===a)o.push(`${l}--rounded`)
else if("string"==typeof a||0===a)for(const e of String(a).split(" "))o.push(`rounded-${e}`)
return o}))
return{roundedClasses:a}}function Sl(e){return L((()=>{const t=[],l={}
return e.value.background&&(ge(e.value.background)?l.backgroundColor=e.value.background:t.push(`bg-${e.value.background}`)),e.value.text&&(ge(e.value.text)?(l.color=e.value.text,l.caretColor=e.value.text):t.push(`text-${e.value.text}`)),{colorClasses:t,colorStyles:l}}))}function wl(e,l){const a=t.computed((()=>({text:t.isRef(e)?e.value:l?e[l]:null}))),{colorClasses:o,colorStyles:n}=Sl(a)
return{textColorClasses:o,textColorStyles:n}}function kl(e,l){const a=t.computed((()=>({background:t.isRef(e)?e.value:l?e[l]:null}))),{colorClasses:o,colorStyles:n}=Sl(a)
return{backgroundColorClasses:o,backgroundColorStyles:n}}const xl=[null,"prominent","default","comfortable","compact"],Cl=je({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>xl.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...ml(),...hl(),...bl(),...pl({tag:"header"}),...mt()},"v-toolbar"),Nl=Ue()({name:"VToolbar",props:Cl(),setup(e,l){var a
let{slots:o}=l
const{backgroundColorClasses:n,backgroundColorStyles:r}=kl(t.toRef(e,"color")),{borderClasses:i}=gl(e),{elevationClasses:s}=yl(e),{roundedClasses:u}=Vl(e),{themeClasses:c}=yt(e),d=t.ref(!!(e.extended||null!=(a=o.extension)&&a.call(o))),v=t.computed((()=>parseInt(Number(e.height)+("prominent"===e.density?Number(e.height):0)-("comfortable"===e.density?8:0)-("compact"===e.density?16:0),10))),p=t.computed((()=>d.value?parseInt(Number(e.extensionHeight)+("prominent"===e.density?Number(e.extensionHeight):0)-("comfortable"===e.density?4:0)-("compact"===e.density?8:0),10):0))
return ze({VBtn:{variant:"text"}}),Je((()=>{var l,a,f,m,h
const y=!(!e.title&&!o.title),b=!(!o.image&&!e.image),V=null==(l=o.extension)?void 0:l.call(o)
return d.value=!(!e.extended&&!V),t.createVNode(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},n.value,i.value,s.value,u.value,c.value],style:[r.value]},{default:()=>[b&&t.createVNode("div",{key:"image",class:"v-toolbar__image"},[t.createVNode(Ot,{defaults:{VImg:{cover:!0,src:e.image}}},{default:()=>[o.image?null==(a=o.image)?void 0:a.call(o):t.createVNode(vl,null,null)]})]),t.createVNode(Ot,{defaults:{VTabs:{height:g(v.value)}}},{default:()=>[t.createVNode("div",{class:"v-toolbar__content",style:{height:g(v.value)}},[o.prepend&&t.createVNode("div",{class:"v-toolbar__prepend"},[null==(f=o.prepend)?void 0:f.call(o)]),y&&t.createVNode(fl,{key:"title",text:e.title},{text:o.title}),null==(m=o.default)?void 0:m.call(o),o.append&&t.createVNode("div",{class:"v-toolbar__append"},[null==(h=o.append)?void 0:h.call(o)])])]}),t.createVNode(Ot,{defaults:{VTabs:{height:g(p.value)}}},{default:()=>[t.createVNode(al,null,{default:()=>[d.value&&t.createVNode("div",{class:"v-toolbar__extension",style:{height:g(p.value)}},[V])]})]})]})})),{contentHeight:v,extensionHeight:p}}})
const _l=Ue()({name:"VAppBar",props:{modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...Cl(),...lt(),height:{type:[Number,String],default:64}},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=t.ref(),n=wt(e,"modelValue"),r=t.computed((()=>{var e,t
return((null==(e=o.value)?void 0:e.contentHeight)??0)+((null==(t=o.value)?void 0:t.extensionHeight)??0)})),{layoutItemStyles:i}=ot({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef(e,"location"),layoutSize:r,elementSize:r,active:n,absolute:t.toRef(e,"absolute")})
return Je((()=>{const[l]=function(e){return S(e,Object.keys((null==Nl?void 0:Nl.props)??{}))}(e)
return t.createVNode(Nl,t.mergeProps({ref:o,class:["v-app-bar",{"v-app-bar--bottom":"bottom"===e.location}],style:{...i.value,height:void 0}},l),a)})),{}}}),Bl=[null,"default","comfortable","compact"],Il=je({density:{type:String,default:"default",validator:e=>Bl.includes(e)}},"density")
function $l(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
const a=t.computed((()=>`${l}--density-${e.density}`))
return{densityClasses:a}}const Al=["elevated","flat","tonal","outlined","text","plain"]
function El(e,l){return t.createVNode(t.Fragment,null,[e&&t.createVNode("span",{key:"overlay",class:`${l}__overlay`},null),t.createVNode("span",{key:"underlay",class:`${l}__underlay`},null)])}const Rl=je({color:String,variant:{type:String,default:"elevated",validator:e=>Al.includes(e)}},"variant")
function Tl(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
const a=t.computed((()=>{const{variant:a}=t.unref(e)
return`${l}--variant-${a}`})),{colorClasses:o,colorStyles:n}=Sl(t.computed((()=>{const{variant:l,color:a}=t.unref(e)
return{[["elevated","flat"].includes(l)?"background":"text"]:a}})))
return{colorClasses:o,colorStyles:n,variantClasses:a}}const Ll=We({name:"VBtnGroup",props:{divided:Boolean,...ml(),...Il(),...hl(),...bl(),...pl(),...mt(),...Rl()},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{densityClasses:n}=$l(e),{borderClasses:r}=gl(e),{elevationClasses:i}=yl(e),{roundedClasses:s}=Vl(e)
ze({VBtn:{height:"auto",color:t.toRef(e,"color"),density:t.toRef(e,"density"),flat:!0,variant:t.toRef(e,"variant")}}),Je((()=>t.createVNode(e.tag,{class:["v-btn-group",{"v-btn-group--divided":e.divided},o.value,r.value,n.value,i.value,s.value]},a)))}}),Pl=je({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),Ol=je({value:null,disabled:Boolean,selectedClass:String},"group-item")
function Fl(e,l){let a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]
const o=Ee("useGroupItem")
if(!o)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function")
const n=Pe()
t.provide(Symbol.for(`${l.description}:id`),n)
const r=t.inject(l,null)
if(!r){if(!a)return r
throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${l.description}`)}const i=t.toRef(e,"value"),s=t.computed((()=>r.disabled.value||e.disabled))
r.register({id:n,value:i,disabled:s},o),t.onBeforeUnmount((()=>{r.unregister(n)}))
const u=t.computed((()=>r.isSelected(n))),c=t.computed((()=>u.value&&[r.selectedClass.value,e.selectedClass]))
return t.watch(u,(e=>{o.emit("group:selected",{value:e})})),{id:n,isSelected:u,toggle:()=>r.select(n,!u.value),select:e=>r.select(n,e),selectedClass:c,value:i,disabled:s,group:r}}function Ml(e,l){let a=!1
const o=t.reactive([]),n=wt(e,"modelValue",[],(e=>null==e?[]:zl(o,x(e))),(t=>{const l=function(e,t){const l=[]
for(let a=0;a<e.length;a++){const o=e[a]
t.includes(o.id)&&l.push(null!=o.value?o.value:a)}return l}(o,t)
return e.multiple?l:l[0]})),r=Ee("useGroup")
function i(){const t=o.find((e=>!e.disabled))
t&&"force"===e.mandatory&&!n.value.length&&(n.value=[t.id])}function s(t){if(e.multiple&&te('This method is not supported when using "multiple" prop'),n.value.length){const e=n.value[0],l=o.findIndex((t=>t.id===e))
let a=(l+t)%o.length,r=o[a]
for(;r.disabled&&a!==l;)a=(a+t)%o.length,r=o[a]
if(r.disabled)return
n.value=[o[a].id]}else{const e=o.find((e=>!e.disabled))
e&&(n.value=[e.id])}}t.onMounted((()=>{i()})),t.onBeforeUnmount((()=>{a=!0}))
const u={register:function(e,t){const a=e,n=A(Symbol.for(`${l.description}:id`),null==r?void 0:r.vnode).indexOf(t)
n>-1?o.splice(n,0,a):o.push(a)},unregister:function(e){if(a)return
i()
const t=o.findIndex((t=>t.id===e))
o.splice(t,1)},selected:n,select:function(t,l){const a=o.find((e=>e.id===t))
if(!l||null==a||!a.disabled)if(e.multiple){const a=n.value.slice(),o=a.findIndex((e=>e===t)),r=~o
if(l=l??!r,r&&e.mandatory&&a.length<=1)return
if(!r&&null!=e.max&&a.length+1>e.max)return
o<0&&l?a.push(t):o>=0&&!l&&a.splice(o,1),n.value=a}else{const a=n.value.includes(t)
if(e.mandatory&&a)return
n.value=l??!a?[t]:[]}},disabled:t.toRef(e,"disabled"),prev:()=>s(o.length-1),next:()=>s(1),isSelected:e=>n.value.includes(e),selectedClass:t.computed((()=>e.selectedClass)),items:t.computed((()=>o)),getItemIndex:e=>function(e,t){const l=zl(e,[t])
return l.length?e.findIndex((e=>e.id===l[0])):-1}(o,e)}
return t.provide(l,u),u}function zl(e,t){const l=[]
for(let a=0;a<e.length;a++){const o=e[a]
null!=o.value?null!=t.find((e=>v(e,o.value)))&&l.push(o.id):t.includes(a)&&l.push(o.id)}return l}const Dl=Symbol.for("vuetify:v-btn-toggle"),jl=Ue()({name:"VBtnToggle",props:Pl(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const{isSelected:o,next:n,prev:r,select:i,selected:s}=Ml(e,Dl)
return Je((()=>{var e
return t.createVNode(Ll,{class:"v-btn-toggle"},{default:()=>[null==(e=a.default)?void 0:e.call(a,{isSelected:o,next:n,prev:r,select:i,selected:s})]})})),{next:n,prev:r,select:i}}}),Hl={collapse:"mdi-chevron-up",complete:"mdi-check",cancel:"mdi-close-circle",close:"mdi-close",delete:"mdi-close-circle",clear:"mdi-close-circle",success:"mdi-check-circle",info:"mdi-information",warning:"mdi-alert-circle",error:"mdi-close-circle",prev:"mdi-chevron-left",next:"mdi-chevron-right",checkboxOn:"mdi-checkbox-marked",checkboxOff:"mdi-checkbox-blank-outline",checkboxIndeterminate:"mdi-minus-box",delimiter:"mdi-circle",sort:"mdi-arrow-up",expand:"mdi-chevron-down",menu:"mdi-menu",subgroup:"mdi-menu-down",dropdown:"mdi-menu-down",radioOn:"mdi-radiobox-marked",radioOff:"mdi-radiobox-blank",edit:"mdi-pencil",ratingEmpty:"mdi-star-outline",ratingFull:"mdi-star",ratingHalf:"mdi-star-half-full",loading:"mdi-cached",first:"mdi-page-first",last:"mdi-page-last",unfold:"mdi-unfold-more-horizontal",file:"mdi-paperclip",plus:"mdi-plus",minus:"mdi-minus"},Wl={component:e=>t.h(Zl,{...e,class:"mdi"})},Ul=[String,Function,Object],Yl=Symbol.for("vuetify:icons"),Xl=je({icon:{type:Ul,required:!0},tag:{type:String,required:!0}},"icon"),Gl=We({name:"VComponentIcon",props:Xl(),setup:e=>()=>t.createVNode(e.tag,null,{default:()=>[t.createVNode(e.icon,null,null)]})}),ql=We({name:"VSvgIcon",inheritAttrs:!1,props:Xl(),setup(e,l){let{attrs:a}=l
return()=>t.createVNode(e.tag,t.mergeProps(a,{style:null}),{default:()=>[t.createVNode("svg",{class:"v-icon__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true"},[t.createVNode("path",{d:e.icon},null)])]})}}),Kl=We({name:"VLigatureIcon",props:Xl(),setup:e=>()=>t.createVNode(e.tag,null,{default:()=>[e.icon]})}),Zl=We({name:"VClassIcon",props:Xl(),setup:e=>()=>t.createVNode(e.tag,{class:e.icon},null)}),Jl={svg:{component:ql},class:{component:Zl}}
function Ql(e){return B({defaultSet:"mdi",sets:{...Jl,mdi:Wl},aliases:Hl},e)}const ea=["x-small","small","default","large","x-large"],ta=je({size:{type:[String,Number],default:"default"}},"size")
function la(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
return L((()=>{let l,a
return P(ea,e.size)?l=`${t}--size-${e.size}`:e.size&&(a={width:g(e.size),height:g(e.size)}),{sizeClasses:l,sizeStyles:a}}))}const aa=je({color:String,start:Boolean,end:Boolean,icon:Ul,...ta(),...pl({tag:"i"}),...mt()},"v-icon"),oa=We({name:"VIcon",props:aa(),setup(e,l){let a,{attrs:o,slots:n}=l
n.default&&(a=t.computed((()=>{var e,t
const l=null==(e=n.default)?void 0:e.call(n)
if(l)return null==(t=I(l).filter((e=>e.children&&"string"==typeof e.children))[0])?void 0:t.children})))
const{themeClasses:r}=yt(e),{iconData:i}=(e=>{const l=t.inject(Yl)
if(!l)throw new Error("Missing Vuetify Icons provide!")
return{iconData:t.computed((()=>{const a=t.isRef(e)?e.value:e.icon
if(!a)throw new Error("Icon value is undefined or null")
let o=a
var n
if("string"==typeof o&&(o=o.trim(),o.startsWith("$")&&(o=null==(n=l.aliases)?void 0:n[o.slice(1)])),!o)throw new Error(`Could not find aliased icon "${a}"`)
if("string"!=typeof o)return{component:Gl,icon:o}
const r=Object.keys(l.sets).find((e=>"string"==typeof o&&o.startsWith(`${e}:`))),i=r?o.slice(r.length+1):o
return{component:l.sets[r??l.defaultSet].component,icon:i}}))}})(a||e),{sizeClasses:s}=la(e),{textColorClasses:u,textColorStyles:c}=wl(t.toRef(e,"color"))
return Je((()=>t.createVNode(i.value.component,{tag:e.tag,icon:i.value.icon,class:["v-icon","notranslate",r.value,s.value,u.value,{"v-icon--clickable":!!o.onClick,"v-icon--start":e.start,"v-icon--end":e.end}],style:[s.value?void 0:{fontSize:g(e.size),height:g(e.size),width:g(e.size)},c.value],role:o.onClick?"button":void 0,"aria-hidden":!o.onClick},null))),{}}})
function na(e){const l=t.ref(),o=t.ref(!1)
if(a){const a=new IntersectionObserver((t=>{null==e||e(t,a),o.value=!!t.find((e=>e.isIntersecting))}))
t.onBeforeUnmount((()=>{a.disconnect()})),t.watch(l,((e,t)=>{t&&(a.unobserve(t),o.value=!1),e&&a.observe(e)}),{flush:"post"})}return{intersectionRef:l,isIntersecting:o}}const ra=We({name:"VProgressCircular",props:{bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...ta(),...pl({tag:"div"}),...mt()},setup(e,l){let{slots:a}=l
const o=2*Math.PI*20,n=t.ref(),{themeClasses:i}=yt(e),{sizeClasses:s,sizeStyles:u}=la(e),{textColorClasses:c,textColorStyles:d}=wl(t.toRef(e,"color")),{textColorClasses:v,textColorStyles:p}=wl(t.toRef(e,"bgColor")),{intersectionRef:f,isIntersecting:m}=na(),{resizeRef:h,contentRect:y}=r(),b=t.computed((()=>Math.max(0,Math.min(100,parseFloat(e.modelValue))))),V=t.computed((()=>Number(e.width))),S=t.computed((()=>u.value?Number(e.size):y.value?y.value.width:Math.max(V.value,32))),w=t.computed((()=>20/(1-V.value/S.value)*2)),k=t.computed((()=>V.value/S.value*w.value)),x=t.computed((()=>g((100-b.value)/100*o)))
return t.watchEffect((()=>{f.value=n.value,h.value=n.value})),Je((()=>t.createVNode(e.tag,{ref:n,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":m.value,"v-progress-circular--disable-shrink":"disable-shrink"===e.indeterminate},i.value,s.value,c.value],style:[u.value,d.value],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:b.value},{default:()=>[t.createVNode("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${w.value} ${w.value}`},[t.createVNode("circle",{class:["v-progress-circular__underlay",v.value],style:p.value,fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":k.value,"stroke-dasharray":o,"stroke-dashoffset":0},null),t.createVNode("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:20,"stroke-width":k.value,"stroke-dasharray":o,"stroke-dashoffset":x.value},null)]),a.default&&t.createVNode("div",{class:"v-progress-circular__content"},[a.default({value:b.value})])]}))),{}}}),ia=Symbol("rippleStop")
function sa(e,t){e.style.transform=t,e.style.webkitTransform=t}function ua(e,t){e.style.opacity=`calc(${t} * var(--v-theme-overlay-multiplier))`}function ca(e){return"TouchEvent"===e.constructor.name}function da(e){return"KeyboardEvent"===e.constructor.name}const va={show(e,t){var l
let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}
if(null==t||null==(l=t._ripple)||!l.enabled)return
const o=document.createElement("span"),n=document.createElement("span")
o.appendChild(n),o.className="v-ripple__container",a.class&&(o.className+=` ${a.class}`)
const{radius:r,scale:i,x:s,y:u,centerX:c,centerY:d}=function(e,t){var l
let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=0,n=0
if(!da(e)){const l=t.getBoundingClientRect(),a=ca(e)?e.touches[e.touches.length-1]:e
o=a.clientX-l.left,n=a.clientY-l.top}let r=0,i=.3
null!=(l=t._ripple)&&l.circle?(i=.15,r=t.clientWidth/2,r=a.center?r:r+Math.sqrt((o-r)**2+(n-r)**2)/4):r=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2
const s=(t.clientWidth-2*r)/2+"px",u=(t.clientHeight-2*r)/2+"px",c=a.center?s:o-r+"px",d=a.center?u:n-r+"px"
return{radius:r,scale:i,x:c,y:d,centerX:s,centerY:u}}(e,t,a),v=2*r+"px"
n.className="v-ripple__animation",n.style.width=v,n.style.height=v,t.appendChild(o)
const p=window.getComputedStyle(t)
p&&"static"===p.position&&(t.style.position="relative",t.dataset.previousPosition="static"),n.classList.add("v-ripple__animation--enter"),n.classList.add("v-ripple__animation--visible"),sa(n,`translate(${s}, ${u}) scale3d(${i},${i},${i})`),ua(n,0),n.dataset.activated=String(performance.now()),setTimeout((()=>{n.classList.remove("v-ripple__animation--enter"),n.classList.add("v-ripple__animation--in"),sa(n,`translate(${c}, ${d}) scale3d(1,1,1)`),ua(n,.08)}),0)},hide(e){var t
if(null==e||null==(t=e._ripple)||!t.enabled)return
const l=e.getElementsByClassName("v-ripple__animation")
if(0===l.length)return
const a=l[l.length-1]
if(a.dataset.isHiding)return
a.dataset.isHiding="true"
const o=performance.now()-Number(a.dataset.activated),n=Math.max(250-o,0)
setTimeout((()=>{a.classList.remove("v-ripple__animation--in"),a.classList.add("v-ripple__animation--out"),ua(a,0),setTimeout((()=>{1===e.getElementsByClassName("v-ripple__animation").length&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),a.parentNode&&e.removeChild(a.parentNode)}),300)}),n)}}
function pa(e){return void 0===e||!!e}function fa(e){const t={},l=e.currentTarget
if(null!=l&&l._ripple&&!l._ripple.touched&&!e[ia]){if(e[ia]=!0,ca(e))l._ripple.touched=!0,l._ripple.isTouch=!0
else if(l._ripple.isTouch)return
if(t.center=l._ripple.centered||da(e),l._ripple.class&&(t.class=l._ripple.class),ca(e)){if(l._ripple.showTimerCommit)return
l._ripple.showTimerCommit=()=>{va.show(e,l,t)},l._ripple.showTimer=window.setTimeout((()=>{var e
null!=l&&null!=(e=l._ripple)&&e.showTimerCommit&&(l._ripple.showTimerCommit(),l._ripple.showTimerCommit=null)}),80)}else va.show(e,l,t)}}function ma(e){e[ia]=!0}function ga(e){const t=e.currentTarget
if(t&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),"touchend"===e.type&&t._ripple.showTimerCommit)return t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,void(t._ripple.showTimer=window.setTimeout((()=>{ga(e)})))
window.setTimeout((()=>{t._ripple&&(t._ripple.touched=!1)})),va.hide(t)}}function ha(e){const t=e.currentTarget
t&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let ya=!1
function ba(e){ya||e.keyCode!==y.enter&&e.keyCode!==y.space||(ya=!0,fa(e))}function Va(e){ya=!1,ga(e)}function Sa(e){ya&&(ya=!1,ga(e))}function wa(e,t,l){const{value:a,modifiers:o}=t,n=pa(a)
if(n||va.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=n,e._ripple.centered=o.center,e._ripple.circle=o.circle,h(a)&&a.class&&(e._ripple.class=a.class),n&&!l){if(o.stop)return e.addEventListener("touchstart",ma,{passive:!0}),void e.addEventListener("mousedown",ma)
e.addEventListener("touchstart",fa,{passive:!0}),e.addEventListener("touchend",ga,{passive:!0}),e.addEventListener("touchmove",ha,{passive:!0}),e.addEventListener("touchcancel",ga),e.addEventListener("mousedown",fa),e.addEventListener("mouseup",ga),e.addEventListener("mouseleave",ga),e.addEventListener("keydown",ba),e.addEventListener("keyup",Va),e.addEventListener("blur",Sa),e.addEventListener("dragstart",ga,{passive:!0})}else!n&&l&&ka(e)}function ka(e){e.removeEventListener("mousedown",fa),e.removeEventListener("touchstart",fa),e.removeEventListener("touchend",ga),e.removeEventListener("touchmove",ha),e.removeEventListener("touchcancel",ga),e.removeEventListener("mouseup",ga),e.removeEventListener("mouseleave",ga),e.removeEventListener("keydown",ba),e.removeEventListener("keyup",Va),e.removeEventListener("dragstart",ga),e.removeEventListener("blur",Sa)}const xa={mounted:function(e,t){wa(e,t,!1)},unmounted:function(e){delete e._ripple,ka(e)},updated:function(e,t){if(t.value===t.oldValue)return
wa(e,t,pa(t.oldValue))}},Ca=We({name:"VProgressLinear",props:{active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...bl(),...pl(),...mt()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),{isRtl:n}=Lt(),{themeClasses:r}=yt(e),{textColorClasses:i,textColorStyles:s}=wl(e,"color"),{backgroundColorClasses:u,backgroundColorStyles:c}=kl(t.computed((()=>e.bgColor||e.color))),{backgroundColorClasses:d,backgroundColorStyles:v}=kl(e,"color"),{roundedClasses:p}=Vl(e),{intersectionRef:f,isIntersecting:m}=na(),h=t.computed((()=>parseInt(e.max,10))),y=t.computed((()=>parseInt(e.height,10))),b=t.computed((()=>parseFloat(e.bufferValue)/h.value*100)),V=t.computed((()=>parseFloat(o.value)/h.value*100)),S=t.computed((()=>n.value!==e.reverse)),w=t.computed((()=>e.indeterminate?"fade-transition":"slide-x-transition")),k=t.computed((()=>null==e.bgOpacity?e.bgOpacity:parseFloat(e.bgOpacity)))
function x(e){if(!f.value)return
const{left:t,right:l,width:a}=f.value.getBoundingClientRect(),n=S.value?a-e.clientX+(l-a):e.clientX-t
o.value=Math.round(n/a*h.value)}return Je((()=>t.createVNode(e.tag,{ref:f,class:["v-progress-linear",{"v-progress-linear--active":e.active&&m.value,"v-progress-linear--reverse":S.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},p.value,r.value],style:{height:e.active?g(y.value):0,"--v-progress-linear-height":g(y.value)},role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:V.value,onClick:e.clickable&&x},{default:()=>[e.stream&&t.createVNode("div",{key:"stream",class:["v-progress-linear__stream",i.value],style:{...s.value,[S.value?"left":"right"]:g(-y.value),borderTop:`${g(y.value/2)} dotted`,opacity:k.value,top:`calc(50% - ${g(y.value/4)})`,width:g(100-b.value,"%"),"--v-progress-linear-stream-to":g(y.value*(S.value?1:-1))}},null),t.createVNode("div",{class:["v-progress-linear__background",u.value],style:[c.value,{opacity:k.value,width:g(e.stream?b.value:100,"%")}]},null),t.createVNode(t.Transition,{name:w.value},{default:()=>[e.indeterminate?t.createVNode("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map((e=>t.createVNode("div",{key:e,class:["v-progress-linear__indeterminate",e,d.value],style:v.value},null)))]):t.createVNode("div",{class:["v-progress-linear__determinate",d.value],style:[v.value,{width:g(V.value,"%")}]},null)]}),a.default&&t.createVNode("div",{class:"v-progress-linear__content"},[a.default({value:V.value,buffer:b.value})])]}))),{}}}),Na=je({loading:[Boolean,String]},"loader")
function _a(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
const a=t.computed((()=>({[`${l}--loading`]:e.loading})))
return{loaderClasses:a}}function Ba(e,l){var a
let{slots:o}=l
return t.createVNode("div",{class:`${e.name}__loader`},[(null==(a=o.default)?void 0:a.call(o,{color:e.color,isActive:e.active}))||t.createVNode(Ca,{active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const Ia={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},$a=je({location:String},"location")
function Aa(e){let l=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2?arguments[2]:void 0
const{isRtl:o}=Lt(),n=t.computed((()=>{if(!e.location)return{}
const{side:t,align:n}=W(e.location.split(" ").length>1?e.location:`${e.location} center`,o.value)
function r(e){return a?a(e):0}const i={}
return"center"!==t&&(l?i[Ia[t]]=`calc(100% - ${r(t)}px)`:i[t]=0),"center"!==n?l?i[Ia[n]]=`calc(100% - ${r(n)}px)`:i[n]=0:("center"===t?i.top=i.left="50%":i[{top:"left",bottom:"left",left:"top",right:"top"}[t]]="50%",i.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[t]),i}))
return{locationStyles:n}}const Ea=["static","relative","fixed","absolute","sticky"],Ra=je({position:{type:String,validator:e=>Ea.includes(e)}},"position")
function Ta(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
const a=t.computed((()=>e.position?`${l}--${e.position}`:void 0))
return{positionClasses:a}}function La(){var e,t
return null==(e=Ee("useRouter"))||null==(t=e.proxy)?void 0:t.$router}function Pa(e,l){const a=t.resolveDynamicComponent("RouterLink"),o=t.computed((()=>!(!e.href&&!e.to))),n=t.computed((()=>(null==o?void 0:o.value)||z(l,"click")||z(e,"click")))
if("string"==typeof a)return{isLink:o,isClickable:n,href:t.toRef(e,"href")}
const r=e.to?a.useLink(e):void 0
return{isLink:o,isClickable:n,route:null==r?void 0:r.route,navigate:null==r?void 0:r.navigate,isActive:r&&t.computed((()=>{var t,l
return e.exact?null==(t=r.isExactActive)?void 0:t.value:null==(l=r.isActive)?void 0:l.value})),href:t.computed((()=>e.to?null==r?void 0:r.route.value.href:e.href))}}const Oa=je({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router")
let Fa=!1
const Ma=We({name:"VBtn",directives:{Ripple:xa},props:{active:{type:Boolean,default:void 0},symbol:{type:null,default:Dl},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:Ul,appendIcon:Ul,block:Boolean,stacked:Boolean,ripple:{type:Boolean,default:!0},...ml(),...bl(),...Il(),...nl(),...hl(),...Ol(),...Na(),...$a(),...Ra(),...Oa(),...ta(),...pl({tag:"button"}),...mt(),...Rl({variant:"elevated"})},emits:{"group:selected":e=>!0},setup(e,l){let{attrs:a,slots:o}=l
const{themeClasses:n}=yt(e),{borderClasses:r}=gl(e),{colorClasses:i,colorStyles:s,variantClasses:u}=Tl(e),{densityClasses:c}=$l(e),{dimensionStyles:d}=rl(e),{elevationClasses:v}=yl(e),{loaderClasses:p}=_a(e),{locationStyles:f}=Aa(e),{positionClasses:m}=Ta(e),{roundedClasses:g}=Vl(e),{sizeClasses:h,sizeStyles:y}=la(e),b=Fl(e,e.symbol,!1),V=Pa(e,a),S=t.computed((()=>{var t
return!1!==e.active&&(e.active||(null==(t=V.isActive)?void 0:t.value)||(null==b?void 0:b.isSelected.value))})),w=t.computed((()=>(null==b?void 0:b.disabled.value)||e.disabled)),k=t.computed((()=>"elevated"===e.variant&&!(e.disabled||e.flat||e.border)))
return function(e,l){t.watch((()=>{var t
return null==(t=e.isActive)?void 0:t.value}),(a=>{e.isLink.value&&a&&l&&t.nextTick((()=>{l(!0)}))}),{immediate:!0})}(V,null==b?void 0:b.select),Je((()=>{var l,a,x,C
const N=V.isLink.value?"a":e.tag,_=!b||b.isSelected.value,B=!(!e.prependIcon&&!o.prepend),I=!(!e.appendIcon&&!o.append),$=!(!e.icon||!0===e.icon)
return t.withDirectives(t.createVNode(N,{type:"a"===N?void 0:"button",class:["v-btn",null==b?void 0:b.selectedClass.value,{"v-btn--active":S.value,"v-btn--block":e.block,"v-btn--disabled":w.value,"v-btn--elevated":k.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--stacked":e.stacked},n.value,r.value,_?i.value:void 0,c.value,v.value,p.value,m.value,g.value,h.value,u.value],style:[_?s.value:void 0,d.value,f.value,y.value],disabled:w.value||void 0,href:V.href.value,onClick:e=>{var t
w.value||(null==(t=V.navigate)||t.call(V,e),null==b||b.toggle())}},{default:()=>[El(!0,"v-btn"),!e.icon&&B&&t.createVNode(Ot,{key:"prepend",defaults:{VIcon:{icon:e.prependIcon}}},{default:()=>[t.createVNode("span",{class:"v-btn__prepend"},[(null==(l=o.prepend)?void 0:l.call(o))??t.createVNode(oa,null,null)])]}),t.createVNode("span",{class:"v-btn__content","data-no-activator":""},[t.createVNode(Ot,{key:"content",defaults:{VIcon:{icon:$?e.icon:void 0}}},{default:()=>[(null==(a=o.default)?void 0:a.call(o))??($&&t.createVNode(oa,{key:"icon"},null))]})]),!e.icon&&I&&t.createVNode(Ot,{key:"append",defaults:{VIcon:{icon:e.appendIcon}}},{default:()=>[t.createVNode("span",{class:"v-btn__append"},[(null==(x=o.append)?void 0:x.call(o))??t.createVNode(oa,null,null)])]}),!!e.loading&&t.createVNode("span",{key:"loader",class:"v-btn__loader"},[(null==(C=o.loader)?void 0:C.call(o))??t.createVNode(ra,{color:"boolean"==typeof e.loading?void 0:e.loading,indeterminate:!0,size:"23",width:"2"},null)])]}),[[t.resolveDirective("ripple"),!w.value&&e.ripple,null]])})),{}}}),za=We({name:"VAppBarNavIcon",props:{icon:{type:Ul,default:"$menu"}},setup(e,l){let{slots:a}=l
return Je((()=>t.createVNode(Ma,{class:"v-app-bar-nav-icon",icon:e.icon},a))),{}}}),Da=We({name:"VToolbarItems",props:Rl({variant:"text"}),setup(e,l){let{slots:a}=l
return ze({VBtn:{color:t.toRef(e,"color"),height:"inherit",variant:t.toRef(e,"variant")}}),Je((()=>{var e
return t.createVNode("div",{class:"v-toolbar-items"},[null==(e=a.default)?void 0:e.call(a)])})),{}}}),ja=We({name:"VAppBarTitle",props:{...fl.props},setup(e,l){let{slots:a}=l
return Je((()=>t.createVNode(fl,{class:"v-app-bar-title"},a))),{}}}),Ha=Ye("v-alert-title"),Wa=["success","info","warning","error"],Ua=We({name:"VAlert",props:{border:{type:[Boolean,String],validator:e=>"boolean"==typeof e||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:Ul,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>Wa.includes(e)},...Il(),...nl(),...hl(),...$a(),...Ra(),...bl(),...pl(),...mt(),...Rl({variant:"flat"})},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),n=t.computed((()=>{if(!1!==e.icon)return e.type?e.icon??`$${e.type}`:e.icon})),r=t.computed((()=>({color:e.color??e.type,variant:e.variant}))),{themeClasses:i}=yt(e),{colorClasses:s,colorStyles:u,variantClasses:c}=Tl(r),{densityClasses:d}=$l(e),{dimensionStyles:v}=rl(e),{elevationClasses:p}=yl(e),{locationStyles:f}=Aa(e),{positionClasses:m}=Ta(e),{roundedClasses:g}=Vl(e),{textColorClasses:h,textColorStyles:y}=wl(t.toRef(e,"borderColor")),{t:b}=Rt(),V=t.computed((()=>({"aria-label":b(e.closeLabel),onClick(e){o.value=!1}})))
return()=>{var l,r
const b=!(!a.prepend&&!n.value),S=!(!a.title&&!e.title),w=!(!e.text&&!a.text),k=!(!a.close&&!e.closable)
return o.value&&t.createVNode(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${!0===e.border?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},i.value,s.value,d.value,p.value,m.value,g.value,c.value],style:[u.value,v.value,f.value],role:"alert"},{default:()=>[El(!1,"v-alert"),e.border&&t.createVNode("div",{key:"border",class:["v-alert__border",h.value],style:y.value},null),b&&t.createVNode(Ot,{key:"prepend",defaults:{VIcon:{density:e.density,icon:n.value,size:e.prominent?44:28}}},{default:()=>[t.createVNode("div",{class:"v-alert__prepend"},[a.prepend?a.prepend():n.value&&t.createVNode(oa,null,null)])]}),t.createVNode("div",{class:"v-alert__content"},[S&&t.createVNode(Ha,{key:"title"},{default:()=>[a.title?a.title():e.title]}),w&&(a.text?a.text():e.text),null==(l=a.default)?void 0:l.call(a)]),a.append&&t.createVNode("div",{key:"append",class:"v-alert__append"},[a.append()]),k&&t.createVNode(Ot,{key:"close",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>[t.createVNode("div",{class:"v-alert__close"},[(null==(r=a.close)?void 0:r.call(a,{props:V.value}))??t.createVNode(Ma,V.value,null)])]})]})}}})
function Ya(e){const{t:l}=Rt()
return{InputIcon:function(a){let{name:o}=a
const n={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[o],r=e[`onClick:${o}`],i=r&&n?l(`$vuetify.input.${n}`,e.label??""):void 0
return t.createVNode(oa,{icon:e[`${o}Icon`],"aria-label":i,onClick:r},null)}}}const Xa=We({name:"VLabel",props:{text:String,clickable:Boolean,...mt()},setup(e,l){let{slots:a}=l
return Je((()=>{var l
return t.createVNode("label",{class:["v-label",{"v-label--clickable":e.clickable}]},[e.text,null==(l=a.default)?void 0:l.call(a)])})),{}}}),Ga=We({name:"VFieldLabel",props:{floating:Boolean},setup(e,l){let{slots:a}=l
return Je((()=>t.createVNode(Xa,{class:["v-field-label",{"v-field-label--floating":e.floating}],"aria-hidden":e.floating||void 0},a))),{}}}),qa=je({focused:Boolean},"focus")
function Ka(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re()
const a=wt(e,"focused"),o=t.computed((()=>({[`${l}--focused`]:a.value})))
function n(){a.value=!0}function r(){a.value=!1}return{focusClasses:o,isFocused:a,focus:n,blur:r}}const Za=["underlined","outlined","filled","solo","plain"],Ja=je({appendInnerIcon:Ul,bgColor:String,clearable:Boolean,clearIcon:{type:Ul,default:"$clear"},active:Boolean,color:String,dirty:Boolean,disabled:Boolean,error:Boolean,label:String,persistentClear:Boolean,prependInnerIcon:Ul,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:"filled",validator:e=>Za.includes(e)},"onClick:clear":M,"onClick:appendInner":M,"onClick:prependInner":M,...mt(),...Na()},"v-field"),Qa=Ue()({name:"VField",inheritAttrs:!1,props:{id:String,...qa(),...Ja()},emits:{"click:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{attrs:a,emit:o,slots:n}=l
const{themeClasses:r}=yt(e),{loaderClasses:i}=_a(e),{focusClasses:s,isFocused:u,focus:c,blur:d}=Ka(e),{InputIcon:v}=Ya(e),p=t.computed((()=>e.dirty||e.active)),f=t.computed((()=>!(e.singleLine||!e.label&&!n.label))),m=Pe(),h=t.computed((()=>e.id||`input-${m}`)),y=t.ref(),b=t.ref(),V=t.ref(),{backgroundColorClasses:S,backgroundColorStyles:w}=kl(t.toRef(e,"bgColor")),{textColorClasses:k,textColorStyles:x}=wl(t.computed((()=>p.value&&u.value&&!e.error&&!e.disabled?e.color:void 0)))
t.watch(p,(e=>{if(f.value){const t=y.value.$el,l=b.value.$el,a=J(t),o=l.getBoundingClientRect(),n=o.x-a.x,r=o.y-a.y-(a.height/2-o.height/2),i=o.width/.75,s=Math.abs(i-a.width)>1?{maxWidth:g(i)}:void 0,u=getComputedStyle(t),c=getComputedStyle(l),d=1e3*parseFloat(u.transitionDuration)||150,v=parseFloat(c.getPropertyValue("--v-field-label-scale")),p=c.getPropertyValue("color")
t.style.visibility="visible",l.style.visibility="hidden",Q(t,{transform:`translate(${n}px, ${r}px) scale(${v})`,color:p,...s},{duration:d,easing:Ge,direction:e?"normal":"reverse"}).finished.then((()=>{t.style.removeProperty("visibility"),l.style.removeProperty("visibility")}))}}),{flush:"post"})
const C=t.computed((()=>({isActive:p,isFocused:u,controlRef:V,blur:d,focus:c})))
function N(e){e.target!==document.activeElement&&e.preventDefault(),o("click:control",e)}return Je((()=>{var l,o,u
const m="outlined"===e.variant,g=n["prepend-inner"]||e.prependInnerIcon,V=!(!e.clearable&&!n.clear),_=!!(n["append-inner"]||e.appendInnerIcon||V),B=n.label?n.label({label:e.label,props:{for:h.value}}):e.label
return t.createVNode("div",t.mergeProps({class:["v-field",{"v-field--active":p.value,"v-field--appended":_,"v-field--disabled":e.disabled,"v-field--dirty":e.dirty,"v-field--error":e.error,"v-field--has-background":!!e.bgColor,"v-field--persistent-clear":e.persistentClear,"v-field--prepended":g,"v-field--reverse":e.reverse,"v-field--single-line":e.singleLine,"v-field--no-label":!B,[`v-field--variant-${e.variant}`]:!0},r.value,S.value,s.value,i.value],style:[w.value,x.value],onClick:N},a),[t.createVNode("div",{class:"v-field__overlay"},null),t.createVNode(Ba,{name:"v-field",active:!!e.loading,color:e.error?"error":e.color},{default:n.loader}),g&&t.createVNode("div",{key:"prepend",class:"v-field__prepend-inner"},[e.prependInnerIcon&&t.createVNode(v,{key:"prepend-icon",name:"prependInner"},null),null==(l=n["prepend-inner"])?void 0:l.call(n,C.value)]),t.createVNode("div",{class:"v-field__field","data-no-activator":""},[["solo","filled"].includes(e.variant)&&f.value&&t.createVNode(Ga,{key:"floating-label",ref:b,class:[k.value],floating:!0,for:h.value},{default:()=>[B]}),t.createVNode(Ga,{ref:y,for:h.value},{default:()=>[B]}),null==(o=n.default)?void 0:o.call(n,{...C.value,props:{id:h.value,class:"v-field__input"},focus:c,blur:d})]),V&&t.createVNode(ol,{key:"clear"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-field__clearable"},[n.clear?n.clear():t.createVNode(v,{name:"clear"},null)]),[[t.vShow,e.dirty]])]}),_&&t.createVNode("div",{key:"append",class:"v-field__append-inner"},[null==(u=n["append-inner"])?void 0:u.call(n,C.value),e.appendInnerIcon&&t.createVNode(v,{key:"append-icon",name:"appendInner"},null)]),t.createVNode("div",{class:["v-field__outline",k.value]},[m&&t.createVNode(t.Fragment,null,[t.createVNode("div",{class:"v-field__outline__start"},null),f.value&&t.createVNode("div",{class:"v-field__outline__notch"},[t.createVNode(Ga,{ref:b,floating:!0,for:h.value},{default:()=>[B]})]),t.createVNode("div",{class:"v-field__outline__end"},null)]),["plain","underlined"].includes(e.variant)&&f.value&&t.createVNode(Ga,{ref:b,floating:!0,for:h.value},{default:()=>[B]})])])})),{controlRef:V}}})
function eo(e){return S(e,Object.keys(Qa.props).filter((e=>!F(e))))}const to=We({name:"VMessages",props:{active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...cl({transition:{component:tl,leaveAbsolute:!0,group:!0}})},setup(e,l){let{slots:a}=l
const o=t.computed((()=>x(e.messages))),{textColorClasses:n,textColorStyles:r}=wl(t.computed((()=>e.color)))
return Je((()=>t.createVNode(dl,{transition:e.transition,tag:"div",class:["v-messages",n.value],style:r.value},{default:()=>[e.active&&o.value.map(((e,l)=>t.createVNode("div",{class:"v-messages__message",key:`${l}-${o.value}`},[a.message?a.message({message:e}):e])))]}))),{}}}),lo=Symbol.for("vuetify:form"),ao=je({disabled:Boolean,fastFail:Boolean,lazyValidation:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form")
function oo(){return t.inject(lo,null)}const no=je({disabled:Boolean,error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:Boolean,rules:{type:Array,default:()=>[]},modelValue:null,validateOn:String,validationValue:null,...qa()},"validation")
function ro(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Re(),a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Pe()
const o=wt(e,"modelValue"),n=t.computed((()=>void 0===e.validationValue?o.value:e.validationValue)),r=oo(),i=t.ref([]),s=t.ref(!0),u=t.computed((()=>!(!x(""===o.value?null:o.value).length&&!x(""===n.value?null:n.value).length))),c=t.computed((()=>!!(e.disabled||null!=r&&r.isDisabled.value))),d=t.computed((()=>!!(e.readonly||null!=r&&r.isReadonly.value))),v=t.computed((()=>e.errorMessages.length?x(e.errorMessages).slice(0,Math.max(0,+e.maxErrors)):i.value)),p=t.computed((()=>!e.error&&!v.value.length&&(!e.rules.length||(!s.value||null)))),f=t.ref(!1),m=t.computed((()=>({[`${l}--error`]:!1===p.value,[`${l}--dirty`]:u.value,[`${l}--disabled`]:c.value,[`${l}--readonly`]:d.value}))),g=t.computed((()=>e.name??t.unref(a)))
t.onBeforeMount((()=>{null==r||r.register({id:g.value,validate:V,reset:y,resetValidation:b})})),t.onBeforeUnmount((()=>{null==r||r.unregister(g.value)}))
const h=t.computed((()=>e.validateOn||(null==r?void 0:r.validateOn.value)||"input"))
function y(){b(),o.value=null}function b(){s.value=!0,i.value=[]}async function V(){const t=[]
f.value=!0
for(const l of e.rules){if(t.length>=(e.maxErrors??1))break
const a="function"==typeof l?l:()=>l,o=await a(n.value)
!0!==o&&("string"==typeof o?t.push(o):console.warn(`${o} is not a valid value. Rule functions must return boolean true or a string.`))}return i.value=t,f.value=!1,s.value=!1,i.value}return t.onMounted((()=>null==r?void 0:r.update(g.value,p.value,v.value))),De((()=>"input"===h.value),(()=>{t.watch(n,(()=>{if(null!=n.value)V()
else if(e.focused){const l=t.watch((()=>e.focused),(e=>{e||V(),l()}))}}))})),De((()=>"blur"===h.value),(()=>{t.watch((()=>e.focused),(e=>{e||V()}))})),t.watch(p,(()=>{null==r||r.update(g.value,p.value,v.value)})),{errorMessages:v,isDirty:u,isDisabled:c,isReadonly:d,isPristine:s,isValid:p,isValidating:f,reset:y,resetValidation:b,validate:V,validationClasses:m}}const io=je({id:String,appendIcon:Ul,prependIcon:Ul,hideDetails:[Boolean,String],messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":M,"onClick:append":M,...Il(),...no()},"v-input"),so=Ue()({name:"VInput",props:{...io()},emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:a,slots:o,emit:n}=l
const{densityClasses:r}=$l(e),{InputIcon:i}=Ya(e),s=Pe(),u=t.computed((()=>e.id||`input-${s}`)),{errorMessages:c,isDirty:d,isDisabled:v,isReadonly:p,isPristine:f,isValid:m,isValidating:g,reset:h,resetValidation:y,validate:b,validationClasses:V}=ro(e,"v-input",u),S=t.computed((()=>({id:u,isDirty:d,isDisabled:v,isReadonly:p,isPristine:f,isValid:m,isValidating:g,reset:h,resetValidation:y,validate:b})))
return Je((()=>{var l,a,n,s,u
const d=!(!o.prepend&&!e.prependIcon),v=!(!o.append&&!e.appendIcon),p=!!(null!=(l=e.messages)&&l.length||c.value.length),f=!e.hideDetails||"auto"===e.hideDetails&&(p||!!o.details)
return t.createVNode("div",{class:["v-input",`v-input--${e.direction}`,r.value,V.value]},[d&&t.createVNode("div",{key:"prepend",class:"v-input__prepend"},[null==(a=o.prepend)?void 0:a.call(o,S.value),e.prependIcon&&t.createVNode(i,{key:"prepend-icon",name:"prepend"},null)]),o.default&&t.createVNode("div",{class:"v-input__control"},[null==(n=o.default)?void 0:n.call(o,S.value)]),v&&t.createVNode("div",{key:"append",class:"v-input__append"},[e.appendIcon&&t.createVNode(i,{key:"append-icon",name:"append"},null),null==(s=o.append)?void 0:s.call(o,S.value)]),f&&t.createVNode("div",{class:"v-input__details"},[t.createVNode(to,{active:p,messages:c.value.length>0?c.value:e.messages},{message:o.message}),null==(u=o.details)?void 0:u.call(o,S.value)])])})),{reset:h,resetValidation:y,validate:b}}})
function uo(e){return S(e,Object.keys(so.props).filter((e=>!F(e))))}const co=We({name:"VCounter",functional:!0,props:{active:Boolean,max:[Number,String],value:{type:[Number,String],default:0},...cl({transition:{component:tl}})},setup(e,l){let{slots:a}=l
const o=t.computed((()=>e.max?`${e.value} / ${e.max}`:String(e.value)))
return Je((()=>t.createVNode(dl,{transition:e.transition},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-counter"},[a.default?a.default({counter:o.value,max:e.max,value:e.value}):o.value]),[[t.vShow,e.active]])]}))),{}}}),vo=Symbol("Forwarded refs")
function po(e){for(var t=arguments.length,l=new Array(t>1?t-1:0),a=1;a<t;a++)l[a-1]=arguments[a]
return e[vo]=l,new Proxy(e,{get(e,t){if(Reflect.has(e,t))return Reflect.get(e,t)
for(const e of l)if(e.value&&Reflect.has(e.value,t)){const l=Reflect.get(e.value,t)
return"function"==typeof l?l.bind(e.value):l}},getOwnPropertyDescriptor(e,t){const a=Reflect.getOwnPropertyDescriptor(e,t)
if(a)return a
if("symbol"!=typeof t&&!t.startsWith("__")){for(const e of l){if(!e.value)continue
const l=Reflect.getOwnPropertyDescriptor(e.value,t)
if(l)return l
if("_"in e.value&&"setupState"in e.value._){const l=Reflect.getOwnPropertyDescriptor(e.value._.setupState,t)
if(l)return l}}for(const e of l){let l=e.value&&Object.getPrototypeOf(e.value)
for(;l;){const e=Reflect.getOwnPropertyDescriptor(l,t)
if(e)return e
l=Object.getPrototypeOf(l)}}for(const e of l){const l=e.value&&e.value[vo]
if(!l)continue
const a=l.slice()
for(;a.length;){const e=a.shift(),l=Reflect.getOwnPropertyDescriptor(e.value,t)
if(l)return l
const o=e.value&&e.value[vo]
o&&a.push(...o)}}}}})}const fo=["color","file","time","date","datetime-local","week","month"],mo=je({autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,hint:String,persistentHint:Boolean,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,type:{type:String,default:"text"},...io(),...Ja()},"v-text-field"),go=Ue()({name:"VTextField",directives:{Intersect:ul},inheritAttrs:!1,props:mo(),emits:{"click:control":e=>!0,"click:input":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{attrs:a,emit:o,slots:n}=l
const r=wt(e,"modelValue"),{isFocused:i,focus:s,blur:u}=Ka(e),c=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(r.value):(r.value??"").toString().length)),d=t.computed((()=>a.maxlength?a.maxlength:!e.counter||"number"!=typeof e.counter&&"string"!=typeof e.counter?void 0:e.counter))
function v(t,l){var a,o
e.autofocus&&t&&(null==(a=l[0].target)||null==(o=a.focus)||o.call(a))}const p=t.ref(),f=t.ref(),m=t.ref(),g=t.computed((()=>fo.includes(e.type)||e.persistentPlaceholder||i.value)),h=t.computed((()=>e.messages.length?e.messages:i.value||e.persistentHint?e.hint:""))
function y(){var e
m.value!==document.activeElement&&(null==(e=m.value)||e.focus())
i.value||s()}function b(e){y(),o("click:control",e)}function V(l){l.stopPropagation(),y(),t.nextTick((()=>{r.value=null,D(e["onClick:clear"],l)}))}function S(e){r.value=e.target.value}return Je((()=>{const l=!!(n.counter||e.counter||e.counterValue),s=!(!l&&!n.details),[w,x]=k(a),[{modelValue:C,...N}]=uo(e),[_]=eo(e)
return t.createVNode(so,t.mergeProps({ref:p,modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)}],"onClick:prepend":e["onClick:prepend"],"onClick:append":e["onClick:append"]},w,N,{focused:i.value,messages:h.value}),{...n,default:l=>{let{id:a,isDisabled:s,isDirty:c,isReadonly:d,isValid:p}=l
return t.createVNode(Qa,t.mergeProps({ref:f,onMousedown:e=>{e.target!==m.value&&e.preventDefault()},"onClick:control":b,"onClick:clear":V,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},_,{id:a.value,active:g.value||c.value,dirty:c.value||e.dirty,focused:i.value,error:!1===p.value}),{...n,default:l=>{let{props:{class:a,...i}}=l
const c=t.withDirectives(t.createVNode("input",t.mergeProps({ref:m,value:r.value,onInput:S,autofocus:e.autofocus,readonly:d.value,disabled:s.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:y,onBlur:u},i,x),null),[[t.resolveDirective("intersect"),{handler:v},null,{once:!0}]])
return t.createVNode(t.Fragment,null,[e.prefix&&t.createVNode("span",{class:"v-text-field__prefix"},[e.prefix]),n.default?t.createVNode("div",{class:a,onClick:e=>o("click:input",e),"data-no-activator":""},[n.default(),c]):t.cloneVNode(c,{class:a}),e.suffix&&t.createVNode("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:s?a=>{var o
return t.createVNode(t.Fragment,null,[null==(o=n.details)?void 0:o.call(n,a),l&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(co,{active:e.persistentCounter||i.value,value:c.value,max:d.value},n.counter)])])}:void 0})})),po({},p,f,m)}})
function ho(e){return S(e,Object.keys(go.props))}const yo=Symbol.for("vuetify:selection-control-group"),bo=je({color:String,disabled:Boolean,error:Boolean,id:String,inline:Boolean,falseIcon:Ul,trueIcon:Ul,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:v},...mt(),...Il()},"v-selection-control-group"),Vo=We({name:"VSelectionControlGroup",props:{defaultsTarget:{type:String,default:"VSelectionControl"},...bo()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),n=Pe(),r=t.computed((()=>e.id||`v-selection-control-group-${n}`)),i=t.computed((()=>e.name||r.value))
return t.provide(yo,{modelValue:o}),ze({[e.defaultsTarget]:{color:t.toRef(e,"color"),disabled:t.toRef(e,"disabled"),density:t.toRef(e,"density"),error:t.toRef(e,"error"),inline:t.toRef(e,"inline"),modelValue:o,multiple:t.computed((()=>!!e.multiple||null==e.multiple&&Array.isArray(o.value))),name:i,falseIcon:t.toRef(e,"falseIcon"),trueIcon:t.toRef(e,"trueIcon"),readonly:t.toRef(e,"readonly"),ripple:t.toRef(e,"ripple"),type:t.toRef(e,"type"),valueComparator:t.toRef(e,"valueComparator")}}),Je((()=>{var l
return t.createVNode("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline}],"aria-labelled-by":"radio"===e.type?r.value:void 0,role:"radio"===e.type?"radiogroup":void 0},[null==(l=a.default)?void 0:l.call(a)])})),{}}}),So=je({label:String,trueValue:null,falseValue:null,value:null,...bo()},"v-selection-control")
const wo=Ue()({name:"VSelectionControl",directives:{Ripple:xa},inheritAttrs:!1,props:So(),emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:a,slots:o}=l
const{densityClasses:r,icon:i,model:s,textColorClasses:u,textColorStyles:c,trueValue:d}=function(e){const l=t.inject(yo,void 0),{densityClasses:a}=$l(e),o=wt(e,"modelValue"),n=t.computed((()=>void 0!==e.trueValue?e.trueValue:void 0===e.value||e.value)),r=t.computed((()=>void 0!==e.falseValue&&e.falseValue)),i=t.computed((()=>!!e.multiple||null==e.multiple&&Array.isArray(o.value))),s=t.computed({get(){const t=l?l.modelValue.value:o.value
return i.value?t.some((t=>e.valueComparator(t,n.value))):e.valueComparator(t,n.value)},set(t){if(e.readonly)return
const a=t?n.value:r.value
let s=a
i.value&&(s=t?[...x(o.value),a]:x(o.value).filter((t=>!e.valueComparator(t,n.value)))),l?l.modelValue.value=s:o.value=s}}),{textColorClasses:u,textColorStyles:c}=wl(t.computed((()=>!s.value||e.error||e.disabled?void 0:e.color))),d=t.computed((()=>s.value?e.trueIcon:e.falseIcon))
return{group:l,densityClasses:a,trueValue:n,falseValue:r,model:s,textColorClasses:u,textColorStyles:c,icon:d}}(e),v=Pe(),p=t.computed((()=>e.id||`input-${v}`)),f=t.ref(!1),m=t.ref(!1),g=t.ref()
function h(e){f.value=!0,(!n||n&&e.target.matches(":focus-visible"))&&(m.value=!0)}function y(){f.value=!1,m.value=!1}function b(e){s.value=e.target.checked}return Je((()=>{var l,n
const v=o.label?o.label({label:e.label,props:{for:p.value}}):e.label,[V,S]=k(a)
return t.createVNode("div",t.mergeProps({class:["v-selection-control",{"v-selection-control--dirty":s.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":f.value,"v-selection-control--focus-visible":m.value,"v-selection-control--inline":e.inline},r.value]},V),[t.createVNode("div",{class:["v-selection-control__wrapper",u.value],style:c.value},[null==(l=o.default)?void 0:l.call(o),t.withDirectives(t.createVNode("div",{class:["v-selection-control__input"]},[i.value&&t.createVNode(oa,{key:"icon",icon:i.value},null),t.createVNode("input",t.mergeProps({ref:g,checked:s.value,disabled:e.disabled,id:p.value,onBlur:y,onFocus:h,onInput:b,"aria-readonly":e.readonly,type:e.type,value:d.value,name:e.name,"aria-checked":"checkbox"===e.type?s.value:void 0},S),null),null==(n=o.input)?void 0:n.call(o,{model:s,textColorClasses:u,textColorStyles:c,props:{onFocus:h,onBlur:y,id:p.value}})]),[[t.resolveDirective("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),v&&t.createVNode(Xa,{for:p.value,clickable:!0},{default:()=>[v]})])})),{isFocused:f,input:g}}})
function ko(e){return S(e,Object.keys(wo.props))}const xo=je({indeterminate:Boolean,indeterminateIcon:{type:Ul,default:"$checkboxIndeterminate"},...So({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"v-checkbox-btn"),Co=We({name:"VCheckboxBtn",props:xo(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"indeterminate"),n=wt(e,"modelValue")
function r(e){o.value&&(o.value=!1)}const i=t.computed((()=>e.indeterminate?e.indeterminateIcon:e.falseIcon)),s=t.computed((()=>e.indeterminate?e.indeterminateIcon:e.trueIcon))
return Je((()=>t.createVNode(wo,t.mergeProps(e,{modelValue:n.value,"onUpdate:modelValue":[e=>n.value=e,r],class:"v-checkbox-btn",type:"checkbox",inline:!0,falseIcon:i.value,trueIcon:s.value,"aria-checked":e.indeterminate?"mixed":void 0}),a))),{}}})
const No=We({name:"VCheckbox",inheritAttrs:!1,props:{...io(),...xo()},emits:{"update:focused":e=>!0},setup(e,l){let{attrs:a,slots:o}=l
const{isFocused:n,focus:r,blur:i}=Ka(e),s=Pe(),u=t.computed((()=>e.id||`checkbox-${s}`))
return Je((()=>{const[l,s]=k(a),[c,d]=uo(e),[v,p]=function(e){return S(e,Object.keys(Co.props))}(e)
return t.createVNode(so,t.mergeProps({class:"v-checkbox"},l,c,{id:u.value,focused:n.value}),{...o,default:e=>{let{id:l,isDisabled:a,isReadonly:n}=e
return t.createVNode(Co,t.mergeProps(v,{id:l.value,disabled:a.value,readonly:n.value},s,{onFocus:r,onBlur:i}),o)}})})),{}}}),_o=je({start:Boolean,end:Boolean,icon:Ul,image:String,...Il(),...bl(),...ta(),...pl(),...Rl({variant:"flat"})},"v-avatar"),Bo=We({name:"VAvatar",props:_o(),setup(e,l){let{slots:a}=l
const{colorClasses:o,colorStyles:n,variantClasses:r}=Tl(e),{densityClasses:i}=$l(e),{roundedClasses:s}=Vl(e),{sizeClasses:u,sizeStyles:c}=la(e)
return Je((()=>{var l
return t.createVNode(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},o.value,i.value,s.value,u.value,r.value],style:[n.value,c.value]},{default:()=>[e.image?t.createVNode(vl,{key:"image",src:e.image,alt:""},null):e.icon?t.createVNode(oa,{key:"icon",icon:e.icon},null):null==(l=a.default)?void 0:l.call(a),El(!1,"v-avatar")]})})),{}}}),Io=Symbol.for("vuetify:v-chip-group"),$o=We({name:"VChipGroup",props:{column:Boolean,filter:Boolean,valueComparator:{type:Function,default:v},...Pl({selectedClass:"v-chip--selected"}),...pl(),...mt(),...Rl({variant:"tonal"})},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{isSelected:n,select:r,next:i,prev:s,selected:u}=Ml(e,Io)
return ze({VChip:{color:t.toRef(e,"color"),filter:t.toRef(e,"filter"),variant:t.toRef(e,"variant")}}),Je((()=>{var l
return t.createVNode(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value]},{default:()=>[null==(l=a.default)?void 0:l.call(a,{isSelected:n,select:r,next:i,prev:s,selected:u.value})]})})),{}}}),Ao=We({name:"VChip",directives:{Ripple:xa},props:{activeClass:String,appendAvatar:String,appendIcon:Ul,closable:Boolean,closeIcon:{type:Ul,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,pill:Boolean,prependAvatar:String,prependIcon:Ul,ripple:{type:Boolean,default:!0},text:String,modelValue:{type:Boolean,default:!0},...ml(),...Il(),...hl(),...Ol(),...bl(),...Oa(),...ta(),...pl({tag:"span"}),...mt(),...Rl({variant:"tonal"})},emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,l){let{attrs:a,emit:o,slots:n}=l
const{borderClasses:r}=gl(e),{colorClasses:i,colorStyles:s,variantClasses:u}=Tl(e),{densityClasses:c}=$l(e),{elevationClasses:d}=yl(e),{roundedClasses:v}=Vl(e),{sizeClasses:p}=la(e),{themeClasses:f}=yt(e),m=wt(e,"modelValue"),g=Fl(e,Io,!1),h=Pa(e,a),y=t.computed((()=>!e.disabled&&(!!g||h.isClickable.value||e.link)))
function b(e){m.value=!1,o("click:close",e)}function V(e){var t
o("click",e),y.value&&(null==(t=h.navigate)||t.call(h,e),null==g||g.toggle())}return()=>{var l
const a=h.isLink.value?"a":e.tag,o=!!(n.append||e.appendIcon||e.appendAvatar),S=!(!n.close&&!e.closable),w=!(!n.filter&&!e.filter)&&g,k=!!(n.prepend||e.prependIcon||e.prependAvatar),x=!g||g.isSelected.value
return m.value&&t.withDirectives(t.createVNode(a,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":y.value,"v-chip--filter":w,"v-chip--pill":e.pill},f.value,r.value,x?i.value:void 0,c.value,d.value,v.value,p.value,u.value,null==g?void 0:g.selectedClass.value],style:[x?s.value:void 0],disabled:e.disabled||void 0,draggable:e.draggable,href:h.href.value,onClick:V},{default:()=>[El(y.value,"v-chip"),w&&t.createVNode(Ot,{key:"filter",defaults:{VIcon:{icon:e.filterIcon}}},{default:()=>[t.createVNode(ol,null,{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-chip__filter"},[n.filter?n.filter():t.createVNode(oa,null,null)]),[[t.vShow,g.isSelected.value]])]})]}),k&&t.createVNode(Ot,{key:"prepend",defaults:{VAvatar:{image:e.prependAvatar},VIcon:{icon:e.prependIcon}}},{default:()=>[n.prepend?t.createVNode("div",{class:"v-chip__prepend"},[n.prepend()]):e.prependAvatar?t.createVNode(Bo,{start:!0},null):e.prependIcon?t.createVNode(oa,{start:!0},null):void 0]}),(null==(l=n.default)?void 0:l.call(n,{isSelected:null==g?void 0:g.isSelected.value,selectedClass:null==g?void 0:g.selectedClass.value,select:null==g?void 0:g.select,toggle:null==g?void 0:g.toggle,value:null==g?void 0:g.value.value,disabled:e.disabled}))??e.text,o&&t.createVNode(Ot,{key:"append",defaults:{VAvatar:{image:e.appendAvatar},VIcon:{icon:e.appendIcon}}},{default:()=>[n.append?t.createVNode("div",{class:"v-chip__append"},[n.append()]):e.appendAvatar?t.createVNode(Bo,{end:!0},null):e.appendIcon?t.createVNode(oa,{end:!0},null):void 0]}),S&&t.createVNode(Ot,{key:"close",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},{default:()=>[t.createVNode("div",{class:"v-chip__close",onClick:b},[n.close?n.close():t.createVNode(oa,null,null)])]})]}),[[t.resolveDirective("ripple"),y.value&&e.ripple,null]])}}}),Eo=We({name:"VDivider",props:{color:String,inset:Boolean,length:[Number,String],thickness:[Number,String],vertical:Boolean,...mt()},setup(e,l){let{attrs:a}=l
const{themeClasses:o}=yt(e),{backgroundColorClasses:n,backgroundColorStyles:r}=kl(t.toRef(e,"color")),i=t.computed((()=>{const t={}
return e.length&&(t[e.vertical?"maxHeight":"maxWidth"]=g(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=g(e.thickness)),t}))
return Je((()=>t.createVNode("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},o.value,n.value],style:[i.value,r.value],"aria-orientation":a.role&&"separator"!==a.role?void 0:e.vertical?"vertical":"horizontal",role:`${a.role||"separator"}`},null))),{}}}),Ro=Symbol.for("vuetify:list")
function To(){const e=t.inject(Ro,{hasPrepend:t.ref(!1),updateHasPrepend:()=>null}),l={hasPrepend:t.ref(!1),updateHasPrepend:e=>{e&&(l.hasPrepend.value=e)}}
return t.provide(Ro,l),e}function Lo(){return t.inject(Ro,null)}const Po={open:e=>{let{id:t,value:l,opened:a,parents:o}=e
if(l){const e=new Set
e.add(t)
let l=o.get(t)
for(;null!=l;)e.add(l),l=o.get(l)
return e}return a.delete(t),a},select:()=>null},Oo={open:e=>{let{id:t,value:l,opened:a,parents:o}=e
if(l){let e=o.get(t)
for(a.add(t);null!=e&&e!==t;)a.add(e),e=o.get(e)
return a}return a.delete(t),a},select:()=>null},Fo={open:Oo.open,select:e=>{let{id:t,value:l,opened:a,parents:o}=e
if(!l)return a
const n=[]
let r=o.get(t)
for(;null!=r;)n.push(r),r=o.get(r)
return new Set(n)}},Mo=e=>{const t={select:t=>{let{id:l,value:a,selected:o}=t
if(e&&!a){const e=Array.from(o.entries()).reduce(((e,t)=>{let[l,a]=t
return"on"===a?[...e,l]:e}),[])
if(1===e.length&&e[0]===l)return o}return o.set(l,a?"on":"off"),o},in:(e,l,a)=>{let o=new Map
for(const n of e||[])o=t.select({id:n,value:!0,selected:new Map(o),children:l,parents:a})
return o},out:e=>{const t=[]
for(const[l,a]of e.entries())"on"===a&&t.push(l)
return t}}
return t},zo=e=>{const t=Mo(e)
return{select:e=>{let{selected:l,id:a,...o}=e
const n=l.has(a)?new Map([[a,l.get(a)]]):new Map
return t.select({...o,id:a,selected:n})},in:(e,l,a)=>{let o=new Map
return null!=e&&e.length&&(o=t.in(e.slice(0,1),l,a)),o},out:(e,l,a)=>t.out(e,l,a)}},Do=Symbol.for("vuetify:nested"),jo={id:t.ref(),root:{register:()=>null,unregister:()=>null,parents:t.ref(new Map),children:t.ref(new Map),open:()=>null,openOnSelect:()=>null,select:()=>null,opened:t.ref(new Set),selected:t.ref(new Map),selectedValues:t.ref([])}},Ho=je({selectStrategy:[String,Function],openStrategy:[String,Object],opened:Array,selected:Array,mandatory:Boolean},"nested"),Wo=e=>{let l=!1
const a=t.ref(new Map),o=t.ref(new Map),n=wt(e,"opened",e.opened,(e=>new Set(e)),(e=>[...e.values()])),r=t.computed((()=>{if("object"==typeof e.selectStrategy)return e.selectStrategy
switch(e.selectStrategy){case"single-leaf":return(e=>{const t=zo(e)
return{select:e=>{let{id:l,selected:a,children:o,...n}=e
return o.has(l)?a:t.select({id:l,selected:a,children:o,...n})},in:t.in,out:t.out}})(e.mandatory)
case"leaf":return(e=>{const t=Mo(e)
return{select:e=>{let{id:l,selected:a,children:o,...n}=e
return o.has(l)?a:t.select({id:l,selected:a,children:o,...n})},in:t.in,out:t.out}})(e.mandatory)
case"independent":return Mo(e.mandatory)
case"single-independent":return zo(e.mandatory)
case"classic":default:return(e=>{const t={select:t=>{let{id:l,value:a,selected:o,children:n,parents:r}=t
const i=new Map(o),s=[l]
for(;s.length;){const e=s.shift()
o.set(e,a?"on":"off"),n.has(e)&&s.push(...n.get(e))}let u=r.get(l)
for(;u;){const e=n.get(u),t=e.every((e=>"on"===o.get(e))),l=e.every((e=>!o.has(e)||"off"===o.get(e)))
o.set(u,t?"on":l?"off":"indeterminate"),u=r.get(u)}return e&&!a&&0===Array.from(o.entries()).reduce(((e,t)=>{let[l,a]=t
return"on"===a?[...e,l]:e}),[]).length?i:o},in:(e,l,a)=>{let o=new Map
for(const n of e||[])o=t.select({id:n,value:!0,selected:new Map(o),children:l,parents:a})
return o},out:(e,t)=>{const l=[]
for(const[a,o]of e.entries())"on"!==o||t.has(a)||l.push(a)
return l}}
return t})(e.mandatory)}})),i=t.computed((()=>{if("object"==typeof e.openStrategy)return e.openStrategy
switch(e.openStrategy){case"list":return Fo
case"single":return Po
case"multiple":default:return Oo}})),s=wt(e,"selected",e.selected,(e=>r.value.in(e,a.value,o.value)),(e=>r.value.out(e,a.value,o.value)))
function u(e){const t=[]
let l=e
for(;null!=l;)t.unshift(l),l=o.value.get(l)
return t}t.onBeforeUnmount((()=>{l=!0}))
const c=Ee("nested"),d={id:t.ref(),root:{opened:n,selected:s,selectedValues:t.computed((()=>{const e=[]
for(const[t,l]of s.value.entries())"on"===l&&e.push(t)
return e})),register:(e,t,l)=>{t&&e!==t&&o.value.set(e,t),l&&a.value.set(e,[]),null!=t&&a.value.set(t,[...a.value.get(t)||[],e])},unregister:e=>{if(l)return
a.value.delete(e)
const t=o.value.get(e)
if(t){const l=a.value.get(t)??[]
a.value.set(t,l.filter((t=>t!==e)))}o.value.delete(e),n.value.delete(e)},open:(e,t,l)=>{c.emit("click:open",{id:e,value:t,path:u(e),event:l})
const r=i.value.open({id:e,value:t,opened:new Set(n.value),children:a.value,parents:o.value,event:l})
r&&(n.value=r)},openOnSelect:(e,t,l)=>{const r=i.value.select({id:e,value:t,selected:new Map(s.value),opened:new Set(n.value),children:a.value,parents:o.value,event:l})
r&&(n.value=r)},select:(e,t,l)=>{c.emit("click:select",{id:e,value:t,path:u(e),event:l})
const n=r.value.select({id:e,value:t,selected:new Map(s.value),children:a.value,parents:o.value,event:l})
n&&(s.value=n),d.root.openOnSelect(e,t,l)},children:a,parents:o}}
return t.provide(Do,d),d.root},Uo=(e,l)=>{const a=t.inject(Do,jo),o=t.computed((()=>e.value??Symbol(Pe()))),n={...a,id:o,open:(e,t)=>a.root.open(o.value,e,t),openOnSelect:(e,t)=>a.root.openOnSelect(o.value,e,t),isOpen:t.computed((()=>a.root.opened.value.has(o.value))),parent:t.computed((()=>a.root.parents.value.get(o.value))),select:(e,t)=>a.root.select(o.value,e,t),isSelected:t.computed((()=>"on"===a.root.selected.value.get(o.value))),isIndeterminate:t.computed((()=>"indeterminate"===a.root.selected.value.get(o.value))),isLeaf:t.computed((()=>!a.root.children.value.get(o.value))),isGroupActivator:a.isGroupActivator}
return!a.isGroupActivator&&a.root.register(o.value,a.id.value,l),t.onBeforeUnmount((()=>{!a.isGroupActivator&&a.root.unregister(o.value)})),l&&t.provide(Do,n),n},Yo=We({name:"VListGroupActivator",setup(e,l){let{slots:a}=l
return(()=>{const e=t.inject(Do,jo)
t.provide(Do,{...e,isGroupActivator:!0})})(),()=>{var e
return null==(e=a.default)?void 0:e.call(a)}}}),Xo=je({activeColor:String,color:String,collapseIcon:{type:Ul,default:"$collapse"},expandIcon:{type:Ul,default:"$expand"},prependIcon:Ul,appendIcon:Ul,fluid:Boolean,subgroup:Boolean,value:null,...pl()},"v-list-group"),Go=Ue()({name:"VListGroup",props:{title:String,...Xo()},setup(e,l){let{slots:a}=l
const{isOpen:o,open:n,id:r}=Uo(t.toRef(e,"value"),!0),i=t.computed((()=>`v-list-group--id-${String(r.value)}`)),s=Lo()
function u(e){n(!o.value,e)}const c=t.computed((()=>({onClick:u,class:"v-list-group__header",id:i.value}))),d=t.computed((()=>o.value?e.collapseIcon:e.expandIcon))
return Je((()=>{var l
return t.createVNode(e.tag,{class:["v-list-group",{"v-list-group--prepend":null==s?void 0:s.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup}]},{default:()=>[a.activator&&t.createVNode(Ot,{defaults:{VListItem:{active:o.value,activeColor:e.activeColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&d.value,appendIcon:e.appendIcon||!e.subgroup&&d.value,title:e.title,value:e.value}}},{default:()=>[t.createVNode(Yo,null,{default:()=>[a.activator({props:c.value,isOpen:o})]})]}),t.createVNode(al,null,{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-list-group__items",role:"group","aria-labelledby":i.value},[null==(l=a.default)?void 0:l.call(a)]),[[t.vShow,o.value]])]})]})})),{}}})
const qo=Ye("v-list-item-subtitle"),Ko=Ye("v-list-item-title"),Zo=Ue()({name:"VListItem",directives:{Ripple:xa},props:{active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:Ul,disabled:Boolean,lines:String,link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:Ul,subtitle:[String,Number,Boolean],title:[String,Number,Boolean],value:null,onClick:M,onClickOnce:M,...ml(),...Il(),...nl(),...hl(),...bl(),...Oa(),...pl(),...mt(),...Rl({variant:"text"})},emits:{click:e=>!0},setup(e,l){let{attrs:a,slots:o,emit:n}=l
const r=Pa(e,a),i=t.computed((()=>e.value??r.href.value)),{select:s,isSelected:u,isIndeterminate:c,isGroupActivator:d,root:v,parent:p,openOnSelect:f}=Uo(i,!1),m=Lo(),g=t.computed((()=>{var t
return!1!==e.active&&(e.active||(null==(t=r.isActive)?void 0:t.value)||u.value)})),h=t.computed((()=>!1!==e.link&&r.isLink.value)),y=t.computed((()=>!e.disabled&&!1!==e.link&&(e.link||r.isClickable.value||null!=e.value&&!!m))),b=t.computed((()=>e.rounded||e.nav)),V=t.computed((()=>({color:g.value?e.activeColor??e.color:e.color,variant:e.variant})))
t.watch((()=>{var e
return null==(e=r.isActive)?void 0:e.value}),(e=>{e&&null!=p.value&&v.open(p.value,!0),e&&f(e)}),{immediate:!0})
const{themeClasses:S}=yt(e),{borderClasses:w}=gl(e),{colorClasses:k,colorStyles:x,variantClasses:C}=Tl(V),{densityClasses:N}=$l(e),{dimensionStyles:_}=rl(e),{elevationClasses:B}=yl(e),{roundedClasses:I}=Vl(b),$=t.computed((()=>e.lines?`v-list-item--${e.lines}-line`:void 0)),A=t.computed((()=>({isActive:g.value,select:s,isSelected:u.value,isIndeterminate:c.value})))
function E(t){var l
n("click",t),!d&&y.value&&(null==(l=r.navigate)||l.call(r,t),null!=e.value&&s(!u.value,t))}function R(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),E(e))}return Je((()=>{var l,a,n,i,s
const c=h.value?"a":e.tag,d=!m||u.value||g.value,v=o.title||e.title,p=o.subtitle||e.subtitle,f=!!(o.append||e.appendAvatar||e.appendIcon),b=!!(o.prepend||e.prependAvatar||e.prependIcon)
return null==m||m.updateHasPrepend(b),t.withDirectives(t.createVNode(c,{class:["v-list-item",{"v-list-item--active":g.value,"v-list-item--disabled":e.disabled,"v-list-item--link":y.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!b&&(null==m?void 0:m.hasPrepend.value),[`${e.activeClass}`]:e.activeClass&&g.value},S.value,w.value,d?k.value:void 0,N.value,B.value,$.value,I.value,C.value],style:[d?x.value:void 0,_.value],href:r.href.value,tabindex:y.value?0:void 0,onClick:E,onKeydown:y.value&&!h.value&&R},{default:()=>[El(y.value||g.value,"v-list-item"),b&&t.createVNode(Ot,{key:"prepend",defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>[t.createVNode("div",{class:"v-list-item__prepend"},[e.prependAvatar&&t.createVNode(Bo,{key:"prepend-avatar"},null),e.prependIcon&&t.createVNode(oa,{key:"prepend-icon"},null),null==(l=o.prepend)?void 0:l.call(o,A.value)])]}),t.createVNode("div",{class:"v-list-item__content","data-no-activator":""},[v&&t.createVNode(Ko,{key:"title"},{default:()=>[(null==(a=o.title)?void 0:a.call(o,{title:e.title}))??e.title]}),p&&t.createVNode(qo,{key:"subtitle"},{default:()=>[(null==(n=o.subtitle)?void 0:n.call(o,{subtitle:e.subtitle}))??e.subtitle]}),null==(i=o.default)?void 0:i.call(o,A.value)]),f&&t.createVNode(Ot,{key:"append",defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>[t.createVNode("div",{class:"v-list-item__append"},[null==(s=o.append)?void 0:s.call(o,A.value),e.appendIcon&&t.createVNode(oa,{key:"append-icon"},null),e.appendAvatar&&t.createVNode(Bo,{key:"append-avatar"},null)])]})]}),[[t.resolveDirective("ripple"),y.value]])})),{}}}),Jo=We({name:"VListSubheader",props:{color:String,inset:Boolean,sticky:Boolean,title:String,...pl()},setup(e,l){let{slots:a}=l
const{textColorClasses:o,textColorStyles:n}=wl(t.toRef(e,"color"))
return Je((()=>{var l
const r=!(!a.default&&!e.title)
return t.createVNode(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},o.value],style:{textColorStyles:n}},{default:()=>[r&&t.createVNode("div",{class:"v-list-subheader__text"},[(null==(l=a.default)?void 0:l.call(a))??e.title])]})})),{}}}),Qo=Ue()({name:"VListChildren",props:{items:Array},setup(e,l){let{slots:a}=l
return To(),()=>{var l,o
return(null==(l=a.default)?void 0:l.call(a))??(null==(o=e.items)?void 0:o.map((e=>{let{children:l,props:o,type:n,raw:r}=e
var i,s
if("divider"===n)return(null==(i=a.divider)?void 0:i.call(a,{props:o}))??t.createVNode(Eo,o,null)
if("subheader"===n)return(null==(s=a.subheader)?void 0:s.call(a,{props:o}))??t.createVNode(Jo,o,{default:a.subheader})
const u={subtitle:a.subtitle?e=>{var t
return null==(t=a.subtitle)?void 0:t.call(a,{...e,item:r})}:void 0,prepend:a.prepend?e=>{var t
return null==(t=a.prepend)?void 0:t.call(a,{...e,item:r})}:void 0,append:a.append?e=>{var t
return null==(t=a.append)?void 0:t.call(a,{...e,item:r})}:void 0,default:a.default?e=>{var t
return null==(t=a.default)?void 0:t.call(a,{...e,item:r})}:void 0,title:a.title?e=>{var t
return null==(t=a.title)?void 0:t.call(a,{...e,item:r})}:void 0},[c,d]=function(e){return S(e,Object.keys(Go.props))}(o)
return l?t.createVNode(Go,t.mergeProps({value:null==o?void 0:o.value},c),{activator:e=>{let{props:l}=e
return a.header?a.header({...o,...l}):t.createVNode(Zo,t.mergeProps(o,l),u)},default:()=>t.createVNode(Qo,{items:l},a)}):a.item?a.item(o):t.createVNode(Zo,o,u)})))}}}),en=je({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean},"item")
function tn(e,t){const l=f(t,e.itemTitle,t),a=e.returnObject?t:f(t,e.itemValue,l),o=f(t,e.itemChildren),n={title:l,value:a,...!0===e.itemProps?"object"!=typeof t||null==t||Array.isArray(t)?void 0:"children"in t?S(t,["children"])[1]:t:f(t,e.itemProps)}
return{title:String(n.title??""),value:n.value,props:n,children:Array.isArray(o)?ln(e,o):void 0,raw:t}}function ln(e,t){const l=[]
for(const a of t)l.push(tn(e,a))
return l}function an(e){return{items:t.computed((()=>ln(e,e.items))),transformIn:function(t){return t.map((t=>tn(e,t)))},transformOut:function(e){return e.map((e=>{let{props:t}=e
return t.value}))}}}function on(e,t){const l=f(t,e.itemType,"item"),a="string"==typeof t?t:f(t,e.itemTitle),o=f(t,e.itemValue,void 0),n=f(t,e.itemChildren),r={title:a,value:o,...!0===e.itemProps?S(t,["children"])[1]:f(t,e.itemProps)}
return{type:l,title:r.title,value:r.value,props:r,children:"item"===l&&n?nn(e,n):void 0,raw:t}}function nn(e,t){const l=[]
for(const a of t)l.push(on(e,a))
return l}const rn=Ue()({name:"VList",props:{activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,lines:{type:[Boolean,String],default:"one"},nav:Boolean,...Ho({selectStrategy:"single-leaf",openStrategy:"list"}),...ml(),...Il(),...nl(),...hl(),itemType:{type:String,default:"type"},...en(),...bl(),...pl(),...mt(),...Rl({variant:"text"})},emits:{"update:selected":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:select":e=>!0},setup(e,l){let{slots:a}=l
const{items:o}=function(e){return{items:t.computed((()=>nn(e,e.items)))}}(e),{themeClasses:n}=yt(e),{backgroundColorClasses:r,backgroundColorStyles:i}=kl(t.toRef(e,"bgColor")),{borderClasses:s}=gl(e),{densityClasses:u}=$l(e),{dimensionStyles:c}=rl(e),{elevationClasses:d}=yl(e),{roundedClasses:v}=Vl(e),{open:p,select:f}=Wo(e),m=t.computed((()=>e.lines?`v-list--${e.lines}-line`:void 0)),g=t.toRef(e,"activeColor"),h=t.toRef(e,"color")
To(),ze({VListGroup:{activeColor:g,color:h},VListItem:{activeClass:t.toRef(e,"activeClass"),activeColor:g,color:h,density:t.toRef(e,"density"),disabled:t.toRef(e,"disabled"),lines:t.toRef(e,"lines"),nav:t.toRef(e,"nav"),variant:t.toRef(e,"variant")}})
const y=t.ref(!1),b=t.ref()
function V(e){y.value=!0}function S(e){y.value=!1}function w(e){var t
y.value||e.relatedTarget&&null!=(t=b.value)&&t.contains(e.relatedTarget)||x()}function k(e){if(b.value){if("ArrowDown"===e.key)x("next")
else if("ArrowUp"===e.key)x("prev")
else if("Home"===e.key)x("first")
else{if("End"!==e.key)return
x("last")}e.preventDefault()}}function x(e){if(!b.value)return
const t=[...b.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((e=>!e.hasAttribute("disabled"))),l=t.indexOf(document.activeElement)
var a
if(e)if("first"===e){var o
null==(o=t[0])||o.focus()}else if("last"===e){var n
null==(n=t.at(-1))||n.focus()}else{let a,o=l
const n="next"===e?1:-1
do{o+=n,a=t[o]}while((!a||null==a.offsetParent)&&o<t.length&&o>=0)
a?a.focus():x("next"===e?"first":"last")}else null==(a=t[0])||a.focus()}return Je((()=>t.createVNode(e.tag,{ref:b,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav},n.value,r.value,s.value,u.value,d.value,m.value,v.value],style:[i.value,c.value],role:"listbox","aria-activedescendant":void 0,onFocusin:V,onFocusout:S,onFocus:w,onKeydown:k},{default:()=>[t.createVNode(Qo,{items:o.value},a)]}))),{open:p,select:f,focus:x}}}),sn=Ye("v-list-img"),un=We({name:"VListItemAction",props:{start:Boolean,end:Boolean,...pl()},setup(e,l){let{slots:a}=l
return Je((()=>t.createVNode(e.tag,{class:["v-list-item-action",{"v-list-item-action--start":e.start,"v-list-item-action--end":e.end}]},a))),{}}}),cn=We({name:"VListItemMedia",props:{start:Boolean,end:Boolean,...pl()},setup(e,l){let{slots:a}=l
return Je((()=>t.createVNode(e.tag,{class:["v-list-item-media",{"v-list-item-media--start":e.start,"v-list-item-media--end":e.end}]},a))),{}}}),dn=je({closeDelay:[Number,String],openDelay:[Number,String]},"delay")
function vn(e,t){const a={},o=o=>()=>{if(!l)return Promise.resolve(!0)
const n="openDelay"===o
return a.closeDelay&&window.clearTimeout(a.closeDelay),delete a.closeDelay,a.openDelay&&window.clearTimeout(a.openDelay),delete a.openDelay,new Promise((l=>{const r=parseInt(e[o]??0,10)
a[o]=window.setTimeout((()=>{null==t||t(n),l(n)}),r)}))}
return{runCloseDelay:o("closeDelay"),runOpenDelay:o("openDelay")}}const pn=Symbol.for("vuetify:v-menu"),fn=je({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...dn()},"v-overlay-activator")
function mn(e,a){let{isActive:o,isTop:r}=a
const i=t.ref()
let s=!1,u=!1,c=!0
const d=t.computed((()=>e.openOnFocus||null==e.openOnFocus&&e.openOnHover)),v=t.computed((()=>e.openOnClick||null==e.openOnClick&&!e.openOnHover&&!d.value)),{runOpenDelay:p,runCloseDelay:f}=vn(e,(t=>{t!==(e.openOnHover&&s||d.value&&u)||e.openOnHover&&o.value&&!r.value||(o.value!==t&&(c=!0),o.value=t)})),m=e=>{e.stopPropagation(),i.value=e.currentTarget||e.target,o.value=!o.value},g=e=>{s=!0,i.value=e.currentTarget||e.target,p()},h=e=>{s=!1,f()},y=e=>{n&&!e.target.matches(":focus-visible")||(u=!0,e.stopPropagation(),i.value=e.currentTarget||e.target,p())},b=e=>{u=!1,e.stopPropagation(),f()},V=t.computed((()=>{const t={}
return v.value&&(t.click=m),e.openOnHover&&(t.mouseenter=g,t.mouseleave=h),d.value&&(t.focus=y,t.blur=b),t})),S=t.computed((()=>{const l={}
if(e.openOnHover&&(l.mouseenter=()=>{s=!0,p()},l.mouseleave=()=>{s=!1,f()}),e.closeOnContentClick){const e=t.inject(pn,null)
l.click=()=>{o.value=!1,null==e||e.closeParents()}}return l})),w=t.computed((()=>{const t={}
return e.openOnHover&&(t.mouseenter=()=>{c&&(s=!0,c=!1,p())},t.mouseleave=()=>{s=!1,f()}),t}))
t.watch(r,(t=>{!t||(!e.openOnHover||s||d.value&&u)&&(!d.value||u||e.openOnHover&&s)||(o.value=!1)}))
const k=t.ref()
t.watchEffect((()=>{k.value&&t.nextTick((()=>{const e=k.value
var t
i.value=(null==(t=e)?void 0:t.$el)?e.$el:e}))}))
const x=Ee("useActivator")
let C
return t.watch((()=>!!e.activator),(a=>{a&&l?(C=t.effectScope(),C.run((()=>{!function(e,l,a){let{activatorEl:o,activatorEvents:n}=a
function r(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s(),l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.activatorProps
t&&(Object.entries(n.value).forEach((e=>{let[l,a]=e
t.addEventListener(l,a)})),Object.keys(l).forEach((e=>{null==l[e]?t.removeAttribute(e):t.setAttribute(e,l[e])})))}function i(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s(),l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.activatorProps
t&&(Object.entries(n.value).forEach((e=>{let[l,a]=e
t.removeEventListener(l,a)})),Object.keys(l).forEach((e=>{t.removeAttribute(e)})))}function s(){var t
let a,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.activator
if(n)if("parent"===n){var r,i
let e=null==l||null==(r=l.proxy)||null==(i=r.$el)?void 0:i.parentNode
for(;e.hasAttribute("data-no-activator");)e=e.parentNode
a=e}else a="string"==typeof n?document.querySelector(n):"$el"in n?n.$el:n
return o.value=(null==(t=a)?void 0:t.nodeType)===Node.ELEMENT_NODE?a:null,o.value}t.watch((()=>e.activator),((e,l)=>{if(l&&e!==l){const e=s(l)
e&&i(e)}e&&t.nextTick((()=>r()))}),{immediate:!0}),t.watch((()=>e.activatorProps),(()=>{r()})),t.onScopeDispose((()=>{i()}))}(e,x,{activatorEl:i,activatorEvents:V})}))):C&&C.stop()}),{flush:"post",immediate:!0}),t.onScopeDispose((()=>{var e
null==(e=C)||e.stop()})),{activatorEl:i,activatorRef:k,activatorEvents:V,contentEvents:S,scrimEvents:w}}const gn=je({eager:Boolean},"lazy")
function hn(e,l){const a=t.ref(!1),o=t.computed((()=>a.value||e.eager||l.value))
return t.watch(l,(()=>a.value=!0)),{isBooted:a,hasContent:o,onAfterLeave:function(){e.eager||(a.value=!1)}}}function yn(e,t){return{x:e.x+t.x,y:e.y+t.y}}function bn(e,t){if("top"===e.side||"bottom"===e.side){const{side:l,align:a}=e
return yn({x:"left"===a?0:"center"===a?t.width/2:"right"===a?t.width:a,y:"top"===l?0:"bottom"===l?t.height:l},t)}if("left"===e.side||"right"===e.side){const{side:l,align:a}=e
return yn({x:"left"===l?0:"right"===l?t.width:l,y:"top"===a?0:"center"===a?t.height/2:"bottom"===a?t.height:a},t)}return yn({x:t.width/2,y:t.height/2},t)}const Vn={static:function(){},connected:function(e,l,a){const o=function(e){for(;e;){if("fixed"===window.getComputedStyle(e).position)return!0
e=e.offsetParent}return!1}(e.activatorEl.value)
o&&Object.assign(a.value,{position:"fixed"})
const{preferredAnchor:n,preferredOrigin:r}=L((()=>{const t=W(l.location,e.isRtl.value),a="overlap"===l.origin?t:"auto"===l.origin?Y(t):W(l.origin,e.isRtl.value)
return t.side===a.side&&t.align===X(a).align?{preferredAnchor:G(t),preferredOrigin:G(a)}:{preferredAnchor:t,preferredOrigin:a}})),[i,s,u,c]=["minWidth","minHeight","maxWidth","maxHeight"].map((e=>t.computed((()=>{const t=parseFloat(l[e])
return isNaN(t)?1/0:t})))),d=t.computed((()=>{if(Array.isArray(l.offset))return l.offset
if("string"==typeof l.offset){const e=l.offset.split(" ").map(parseFloat)
return e.length<2&&e.push(0),e}return"number"==typeof l.offset?[l.offset,0]:[0,0]}))
let v=!1
const p=new ResizeObserver((()=>{v&&f()}))
function f(){if(v=!1,requestAnimationFrame((()=>{requestAnimationFrame((()=>v=!0))})),!e.activatorEl.value||!e.contentEl.value)return
const t=e.activatorEl.value.getBoundingClientRect(),l=function(e){const t=J(e)
return t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}(e.contentEl.value),o=Ke(e.contentEl.value)
o.length||(o.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(l.x+=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),l.y+=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)))
const p=o.reduce(((e,t)=>{const l=t.getBoundingClientRect(),a=new K({x:t===document.documentElement?0:l.x,y:t===document.documentElement?0:l.y,width:t.clientWidth,height:t.clientHeight})
return e?new K({x:Math.max(e.left,a.left),y:Math.max(e.top,a.top),width:Math.min(e.right,a.right)-Math.max(e.left,a.left),height:Math.min(e.bottom,a.bottom)-Math.max(e.top,a.top)}):a}),void 0)
p.x+=12,p.y+=12,p.width-=24,p.height-=24
let f={anchor:n.value,origin:r.value}
function m(e){const a=new K(l),o=bn(e.anchor,t),n=bn(e.origin,a)
let{x:r,y:i}=(v=n,{x:(s=o).x-v.x,y:s.y-v.y})
var s,v
switch(e.anchor.side){case"top":i-=d.value[0]
break
case"bottom":i+=d.value[0]
break
case"left":r-=d.value[0]
break
case"right":r+=d.value[0]}switch(e.anchor.align){case"top":i-=d.value[1]
break
case"bottom":i+=d.value[1]
break
case"left":r-=d.value[1]
break
case"right":r+=d.value[1]}a.x+=r,a.y+=i,a.width=Math.min(a.width,u.value),a.height=Math.min(a.height,c.value)
return{overflows:Z(a,p),x:r,y:i}}let h=0,y=0
const b={x:0,y:0},V={x:!1,y:!1}
let S=-1
for(;;){if(S++>10){le("Infinite loop detected in connectedLocationStrategy")
break}const{x:e,y:t,overflows:a}=m(f)
h+=e,y+=t,l.x+=e,l.y+=t
{const e=q(f.anchor),t=a.x.before||a.x.after,l=a.y.before||a.y.after
let o=!1
if(["x","y"].forEach((n=>{if("x"===n&&t&&!V.x||"y"===n&&l&&!V.y){const t={anchor:{...f.anchor},origin:{...f.origin}},l="x"===n?"y"===e?X:Y:"y"===e?Y:X
t.anchor=l(t.anchor),t.origin=l(t.origin)
const{overflows:r}=m(t);(r[n].before<=a[n].before&&r[n].after<=a[n].after||r[n].before+r[n].after<(a[n].before+a[n].after)/2)&&(f=t,o=V[n]=!0)}})),o)continue}a.x.before&&(h+=a.x.before,l.x+=a.x.before),a.x.after&&(h-=a.x.after,l.x-=a.x.after),a.y.before&&(y+=a.y.before,l.y+=a.y.before),a.y.after&&(y-=a.y.after,l.y-=a.y.after)
{const e=Z(l,p)
b.x=p.width-e.x.before-e.x.after,b.y=p.height-e.y.before-e.y.after,h+=e.x.before,l.x+=e.x.before,y+=e.y.before,l.y+=e.y.before}break}const w=q(f.anchor)
Object.assign(a.value,{"--v-overlay-anchor-origin":`${f.anchor.side} ${f.anchor.align}`,transformOrigin:`${f.origin.side} ${f.origin.align}`,top:g(wn(y)),left:g(wn(h)),minWidth:g("y"===w?Math.min(i.value,t.width):i.value),maxWidth:g(kn(C(b.x,i.value===1/0?0:i.value,u.value))),maxHeight:g(kn(C(b.y,s.value===1/0?0:s.value,c.value)))})}t.watch([e.activatorEl,e.contentEl],((e,t)=>{let[l,a]=e,[o,n]=t
o&&p.unobserve(o),l&&p.observe(l),n&&p.unobserve(n),a&&p.observe(a)}),{immediate:!0}),t.onScopeDispose((()=>{p.disconnect()})),t.watch((()=>[n.value,r.value,l.offset,l.minWidth,l.minHeight,l.maxWidth,l.maxHeight]),(()=>f()),{immediate:!o}),o&&t.nextTick((()=>f()))
return requestAnimationFrame((()=>{a.value.maxHeight&&f()})),{updateLocation:f}}},Sn=je({locationStrategy:{type:[String,Function],default:"static",validator:e=>"function"==typeof e||e in Vn},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"v-overlay-location-strategies")
function wn(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function kn(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let xn=!0
const Cn=[]
let Nn=-1
function _n(){cancelAnimationFrame(Nn),Nn=requestAnimationFrame((()=>{const e=Cn.shift()
e&&e(),Cn.length?_n():xn=!0}))}const Bn={none:null,close:function(e){$n(e.activatorEl.value??e.contentEl.value,(function(t){e.isActive.value=!1}))},block:function(e,l){var a
const o=null==(a=e.root.value)?void 0:a.offsetParent,n=[...new Set([...Ke(e.activatorEl.value,l.contained?o:void 0),...Ke(e.contentEl.value,l.contained?o:void 0)])].filter((e=>!e.classList.contains("v-overlay-scroll-blocked"))),r=window.innerWidth-document.documentElement.offsetWidth,i=(s=o||document.documentElement,Ze(s)&&s)
var s
i&&e.root.value.classList.add("v-overlay--scroll-blocked")
n.forEach(((e,t)=>{e.style.setProperty("--v-body-scroll-x",g(-e.scrollLeft)),e.style.setProperty("--v-body-scroll-y",g(-e.scrollTop)),e.style.setProperty("--v-scrollbar-offset",g(r)),e.classList.add("v-overlay-scroll-blocked")})),t.onScopeDispose((()=>{n.forEach(((e,t)=>{const l=parseFloat(e.style.getPropertyValue("--v-body-scroll-x")),a=parseFloat(e.style.getPropertyValue("--v-body-scroll-y"))
e.style.removeProperty("--v-body-scroll-x"),e.style.removeProperty("--v-body-scroll-y"),e.style.removeProperty("--v-scrollbar-offset"),e.classList.remove("v-overlay-scroll-blocked"),e.scrollLeft=-l,e.scrollTop=-a})),i&&e.root.value.classList.remove("v-overlay--scroll-blocked")}))},reposition:function(e){let t=!1,l=-1
function a(l){var a
a=()=>{var a,o
const n=performance.now()
null==(a=(o=e.updateLocation).value)||a.call(o,l)
const r=performance.now()-n
t=r/(1e3/60)>2},!xn||Cn.length?(Cn.push(a),_n()):(xn=!1,a(),_n())}$n(e.activatorEl.value??e.contentEl.value,(e=>{t?(cancelAnimationFrame(l),l=requestAnimationFrame((()=>{l=requestAnimationFrame((()=>{a(e)}))}))):a(e)}))}},In=je({scrollStrategy:{type:[String,Function],default:"block",validator:e=>"function"==typeof e||e in Bn}},"v-overlay-scroll-strategies")
function $n(e,l){const a=[document,...Ke(e)]
a.forEach((e=>{e.addEventListener("scroll",l,{passive:!0})})),t.onScopeDispose((()=>{a.forEach((e=>{e.removeEventListener("scroll",l)}))}))}const An=Symbol.for("vuetify:display"),En={mobileBreakpoint:"lg",thresholds:{xs:0,sm:600,md:960,lg:1280,xl:1920,xxl:2560}}
function Rn(e){return l&&!e?window.innerWidth:0}function Tn(e){return l&&!e?window.innerHeight:0}function Ln(e,a){const{thresholds:n,mobileBreakpoint:r}=function(){return B(En,arguments.length>0&&void 0!==arguments[0]?arguments[0]:En)}(e),i=t.ref(Tn(a)),s=function(){const e=l?window.navigator.userAgent:"ssr"
function t(t){return Boolean(e.match(t))}const a=t(/android/i),n=t(/iphone|ipad|ipod/i),r=t(/cordova/i),i=t(/electron/i),s=t(/chrome/i),u=t(/edge/i),c=t(/firefox/i),d=t(/opera/i),v=t(/win/i),p=t(/mac/i),f=t(/linux/i),m=t(/ssr/i)
return{android:a,ios:n,cordova:r,electron:i,chrome:s,edge:u,firefox:c,opera:d,win:v,mac:p,linux:f,touch:o,ssr:m}}(),u=t.reactive({}),c=t.ref(Rn(a))
function d(){i.value=Tn(),c.value=Rn()}return t.watchEffect((()=>{const e=c.value<n.sm,t=c.value<n.md&&!e,l=c.value<n.lg&&!(t||e),a=c.value<n.xl&&!(l||t||e),o=c.value<n.xxl&&!(a||l||t||e),d=c.value>=n.xxl,v=e?"xs":t?"sm":l?"md":a?"lg":o?"xl":"xxl",p="number"==typeof r?r:n[r],f=s.ssr?s.android||s.ios||s.opera:c.value<p
u.xs=e,u.sm=t,u.md=l,u.lg=a,u.xl=o,u.xxl=d,u.smAndUp=!e,u.mdAndUp=!(e||t),u.lgAndUp=!(e||t||l),u.xlAndUp=!(e||t||l||a),u.smAndDown=!(l||a||o||d),u.mdAndDown=!(a||o||d),u.lgAndDown=!(o||d),u.xlAndDown=!d,u.name=v,u.height=i.value,u.width=c.value,u.mobile=f,u.mobileBreakpoint=r,u.platform=s,u.thresholds=n})),l&&window.addEventListener("resize",d,{passive:!0}),{...t.toRefs(u),update:d,ssr:!!a}}function Pn(){const e=t.inject(An)
if(!e)throw new Error("Could not find Vuetify display injection")
return e}function On(){if(!l)return t.ref(!1)
const{ssr:e}=Pn()
if(e){const e=t.ref(!1)
return t.onMounted((()=>{e.value=!0})),e}return t.ref(!0)}function Fn(){const e=Ee("useScopeId").vnode.scopeId
return{scopeId:e?{[e]:""}:void 0}}const Mn=Symbol.for("vuetify:stack"),zn=t.reactive([])
function Dn(e){return{teleportTarget:t.computed((()=>{const a=e.value
if(!0===a||!l)return
const o=!1===a?document.body:"string"==typeof a?document.querySelector(a):a
if(null!=o){if(!Dn.cache.has(o)){const e=document.createElement("div")
e.className="v-overlay-container",o.appendChild(e),Dn.cache.set(o,e)}return Dn.cache.get(o)}t.warn(`Unable to locate target ${a}`)}))}}function jn(){return!0}function Hn(e,t,l){if(!e||!1===Wn(e,l))return!1
const a=Xe(t)
if("undefined"!=typeof ShadowRoot&&a instanceof ShadowRoot&&a.host===e.target)return!1
const o=("object"==typeof l.value&&l.value.include||(()=>[]))()
return o.push(t),!o.some((t=>null==t?void 0:t.contains(e.target)))}function Wn(e,t){return("object"==typeof t.value&&t.value.closeConditional||jn)(e)}function Un(e,t){const l=Xe(e)
t(document),"undefined"!=typeof ShadowRoot&&l instanceof ShadowRoot&&t(l)}Dn.cache=new WeakMap
const Yn={mounted(e,t){const l=l=>function(e,t,l){const a="function"==typeof l.value?l.value:l.value.handler
t._clickOutside.lastMousedownWasOutside&&Hn(e,t,l)&&setTimeout((()=>{Wn(e,l)&&a&&a(e)}),0)}(l,e,t),a=l=>{e._clickOutside.lastMousedownWasOutside=Hn(l,e,t)}
Un(e,(e=>{e.addEventListener("click",l,!0),e.addEventListener("mousedown",a,!0)})),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!0}),e._clickOutside[t.instance.$.uid]={onClick:l,onMousedown:a}},unmounted(e,t){e._clickOutside&&(Un(e,(l=>{var a
if(!l||null==(a=e._clickOutside)||!a[t.instance.$.uid])return
const{onClick:o,onMousedown:n}=e._clickOutside[t.instance.$.uid]
l.removeEventListener("click",o,!0),l.removeEventListener("mousedown",n,!0)})),delete e._clickOutside[t.instance.$.uid])}}
function Xn(e){const{modelValue:l,color:a,...o}=e
return t.createVNode(t.Transition,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&t.createVNode("div",t.mergeProps({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const Gn=je({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[String,Boolean],default:!0},zIndex:{type:[Number,String],default:2e3},...fn(),...nl(),...gn(),...Sn(),...In(),...mt(),...cl()},"v-overlay"),qn=Ue()({name:"VOverlay",directives:{ClickOutside:Yn},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...Gn()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,a){let{slots:o,attrs:n,emit:r}=a
const i=wt(e,"modelValue"),s=t.computed({get:()=>i.value,set:t=>{t&&e.disabled||(i.value=t)}}),{teleportTarget:u}=Dn(t.computed((()=>e.attach||e.contained))),{themeClasses:c}=yt(e),{rtlClasses:d,isRtl:v}=Lt(),{hasContent:p,onAfterLeave:f}=hn(e,s),m=kl(t.computed((()=>"string"==typeof e.scrim?e.scrim:null))),{globalTop:h,localTop:y,stackStyles:b}=function(e,l,a){const o=Ee("useStack"),n=!a,r=t.inject(Mn,void 0),i=t.reactive({activeChildren:new Set})
t.provide(Mn,i)
const s=t.ref(+l.value)
De(e,(()=>{var e
const a=null==(e=zn.at(-1))?void 0:e[1]
s.value=a?a+10:+l.value,n&&zn.push([o.uid,s.value]),null==r||r.activeChildren.add(o.uid),t.onScopeDispose((()=>{if(n){const e=zn.findIndex((e=>e[0]===o.uid))
zn.splice(e,1)}null==r||r.activeChildren.delete(o.uid)}))}))
const u=t.ref(!0)
n&&t.watchEffect((()=>{var e
const t=(null==(e=zn.at(-1))?void 0:e[0])===o.uid
setTimeout((()=>u.value=t))}))
const c=t.computed((()=>!i.activeChildren.size))
return{globalTop:t.readonly(u),localTop:c,stackStyles:t.computed((()=>({zIndex:s.value})))}}(s,t.toRef(e,"zIndex"),e._disableGlobalStack),{activatorEl:V,activatorRef:S,activatorEvents:w,contentEvents:k,scrimEvents:x}=mn(e,{isActive:s,isTop:y}),{dimensionStyles:C}=rl(e),N=On(),{scopeId:_}=Fn()
t.watch((()=>e.disabled),(e=>{e&&(s.value=!1)}))
const B=t.ref(),I=t.ref(),{contentStyles:$,updateLocation:A}=function(e,a){const o=t.ref({}),n=t.ref()
let r
function i(e){var t
null==(t=n.value)||t.call(n,e)}return t.watchEffect((async()=>{var i
null==(i=r)||i.stop(),n.value=void 0,l&&a.isActive.value&&e.locationStrategy&&(r=t.effectScope(),"connected"!==e.locationStrategy&&await t.nextTick(),r.run((()=>{var t,l
"function"==typeof e.locationStrategy?n.value=null==(t=e.locationStrategy(a,e,o))?void 0:t.updateLocation:n.value=null==(l=Vn[e.locationStrategy](a,e,o))?void 0:l.updateLocation})))})),l&&window.addEventListener("resize",i,{passive:!0}),t.onScopeDispose((()=>{var e
l&&window.removeEventListener("resize",i),n.value=void 0,null==(e=r)||e.stop()})),{contentStyles:o,updateLocation:n}}(e,{isRtl:v,contentEl:I,activatorEl:V,isActive:s})
function E(t){r("click:outside",t),e.persistent?O():s.value=!1}function R(){return s.value&&h.value}function T(t){"Escape"===t.key&&h.value&&(e.persistent?O():s.value=!1)}!function(e,a){if(!l)return
let o
t.watchEffect((async()=>{var l
null==(l=o)||l.stop(),a.isActive.value&&e.scrollStrategy&&(o=t.effectScope(),await t.nextTick(),o.run((()=>{var t
"function"==typeof e.scrollStrategy?e.scrollStrategy(a,e):null==(t=Bn[e.scrollStrategy])||t.call(Bn,a,e)})))})),t.onScopeDispose((()=>{var e
null==(e=o)||e.stop()}))}(e,{root:B,contentEl:I,activatorEl:V,isActive:s,updateLocation:A}),l&&t.watch(s,(e=>{e?window.addEventListener("keydown",T):window.removeEventListener("keydown",T)}),{immediate:!0})
const L=La()
De((()=>e.closeOnBack),(()=>{!function(e,a){let o,n,r=!1
function i(e){var t
null!=(t=e.state)&&t.replaced||(r=!0,setTimeout((()=>r=!1)))}l&&(t.nextTick((()=>{window.addEventListener("popstate",i),o=null==e?void 0:e.beforeEach(((e,t,l)=>{Fa?r?a(l):l():setTimeout((()=>r?a(l):l())),Fa=!0})),n=null==e?void 0:e.afterEach((()=>{Fa=!1}))})),t.onScopeDispose((()=>{var e,t
window.removeEventListener("popstate",i),null==(e=o)||e(),null==(t=n)||t()})))}(L,(t=>{h.value&&s.value?(t(!1),e.persistent?O():s.value=!1):t()}))}))
const P=t.ref()
function O(){e.noClickAnimation||I.value&&Q(I.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:Ge})}return t.watch((()=>s.value&&(e.absolute||e.contained)&&null==u.value),(e=>{if(e){const e=qe(B.value)
e&&e!==document.scrollingElement&&(P.value=e.scrollTop)}})),Je((()=>{var l,a
return t.createVNode(t.Fragment,null,[null==(l=o.activator)?void 0:l.call(o,{isActive:s.value,props:t.mergeProps({ref:S},t.toHandlers(w.value),e.activatorProps)}),N.value&&t.createVNode(t.Teleport,{disabled:!u.value,to:u.value},{default:()=>[p.value&&t.createVNode("div",t.mergeProps({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":s.value,"v-overlay--contained":e.contained},c.value,d.value],style:[b.value,{top:g(P.value)}],ref:B},_,n),[t.createVNode(Xn,t.mergeProps({color:m,modelValue:s.value&&!!e.scrim},t.toHandlers(x.value)),null),t.createVNode(dl,{appear:!0,persisted:!0,transition:e.transition,target:V.value,onAfterLeave:()=>{f(),r("afterLeave")}},{default:()=>[t.withDirectives(t.createVNode("div",t.mergeProps({ref:I,class:["v-overlay__content",e.contentClass],style:[C.value,$.value]},t.toHandlers(k.value),e.contentProps),[null==(a=o.default)?void 0:a.call(o,{isActive:s})]),[[t.vShow,s.value],[t.resolveDirective("click-outside"),{handler:E,closeConditional:R,include:()=>[V.value]}]])]})])]})])})),{activatorEl:V,animateClick:O,contentEl:I,globalTop:h,localTop:y,updateLocation:A}}})
function Kn(e){return S(e,Object.keys(qn.props))}const Zn=Ue()({name:"VMenu",props:{id:String,...w(Gn({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:Dt}}),["absolute"])},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),{scopeId:n}=Fn(),r=Pe(),i=t.computed((()=>e.id||`v-menu-${r}`)),s=t.ref(),u=t.inject(pn,null)
let c=0
function d(){null==u||u.closeParents()}return t.provide(pn,{register(){++c},unregister(){--c},closeParents(){setTimeout((()=>{c||(o.value=!1,null==u||u.closeParents())}),40)}}),t.watch(o,(e=>{e?null==u||u.register():null==u||u.unregister()})),Je((()=>{const[l]=Kn(e)
return t.createVNode(qn,t.mergeProps({ref:s,class:["v-menu"]},l,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,absolute:!0,activatorProps:t.mergeProps({"aria-haspopup":"menu","aria-expanded":String(o.value),"aria-owns":i.value},e.activatorProps),"onClick:outside":d},n),{activator:a.activator,default:function(){for(var e,l=arguments.length,o=new Array(l),n=0;n<l;n++)o[n]=arguments[n]
return t.createVNode(Ot,{root:!0},{default:()=>[null==(e=a.default)?void 0:e.call(a,...o)]})}})})),po({id:i},s)}}),Jn=je({chips:Boolean,closableChips:Boolean,eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menu:Boolean,menuIcon:{type:Ul,default:"$dropdown"},menuProps:{type:Object},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,valueComparator:{type:Function,default:v},...en({itemChildren:!1})},"v-select"),Qn=Ue()({name:"VSelect",props:{...Jn(),...w(mo({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...cl({transition:{component:Dt}})},emits:{"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:a}=l
const{t:o}=Rt(),n=t.ref(),r=wt(e,"menu"),{items:i,transformIn:s,transformOut:u}=an(e),c=wt(e,"modelValue",[],(e=>s(x(e))),(t=>{const l=u(t)
return e.multiple?l:l[0]??null})),d=t.computed((()=>c.value.map((t=>i.value.find((l=>e.valueComparator(l.value,t.value)))||t)))),v=t.computed((()=>d.value.map((e=>e.props.value)))),p=t.ref()
function f(t){c.value=[],e.openOnClear&&(r.value=!0)}function m(){e.hideNoData&&!i.value.length||e.readonly||(r.value=!r.value)}function g(t){var l
if(!e.readonly)if(["Enter","ArrowDown"," "].includes(t.key)&&(t.preventDefault(),r.value=!0),["Escape","Tab"].includes(t.key)&&(r.value=!1),"ArrowDown"===t.key)null==(l=p.value)||l.focus("next")
else if("ArrowUp"===t.key){var a
t.preventDefault(),null==(a=p.value)||a.focus("prev")}else if("Home"===t.key){var o
t.preventDefault(),null==(o=p.value)||o.focus("first")}else if("End"===t.key){var n
t.preventDefault(),null==(n=p.value)||n.focus("last")}}function h(t){if(e.multiple){const e=v.value.findIndex((e=>e===t.value))
if(-1===e)c.value=[...c.value,t]
else{const t=[...c.value]
t.splice(e,1),c.value=t}}else c.value=[t],r.value=!1}function y(e){var t
null!=(t=p.value)&&t.$el.contains(e.relatedTarget)||(r.value=!1)}function b(e){var t
null==e.relatedTarget&&(null==(t=n.value)||t.focus())}return Je((()=>{const l=!(!e.chips&&!a.chip),[s]=ho(e)
return t.createVNode(go,t.mergeProps({ref:n},s,{modelValue:c.value.map((e=>e.props.value)).join(", "),"onUpdate:modelValue":e=>{null==e&&(c.value=[])},validationValue:c.externalValue,dirty:c.value.length>0,class:["v-select",{"v-select--active-menu":r.value,"v-select--chips":!!e.chips,["v-select--"+(e.multiple?"multiple":"single")]:!0,"v-select--selected":c.value.length}],appendInnerIcon:e.menuIcon,readonly:!0,"onClick:clear":f,"onClick:control":m,onBlur:y,onKeydown:g}),{...a,default:()=>{var n,s,u
return t.createVNode(t.Fragment,null,[t.createVNode(Zn,t.mergeProps({modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,activator:"parent",contentClass:"v-select__content",eager:e.eager,openOnClick:!1,closeOnContentClick:!1,transition:e.transition},e.menuProps),{default:()=>[t.createVNode(rn,{ref:p,selected:v.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onFocusout:b},{default:()=>[!i.value.length&&!e.hideNoData&&((null==(n=a["no-data"])?void 0:n.call(a))??t.createVNode(Zo,{title:o(e.noDataText)},null)),null==(s=a["prepend-item"])?void 0:s.call(a),i.value.map(((l,o)=>{var n
return(null==(n=a.item)?void 0:n.call(a,{item:l,index:o,props:t.mergeProps(l.props,{onClick:()=>h(l)})}))??t.createVNode(Zo,t.mergeProps({key:o},l.props,{onClick:()=>h(l)}),{prepend:l=>{let{isSelected:a}=l
return e.multiple&&!e.hideSelected?t.createVNode(Co,{modelValue:a,ripple:!1},null):void 0}})})),null==(u=a["append-item"])?void 0:u.call(a)]})]}),d.value.map(((o,n)=>{const r={"onClick:close":function(e){e.stopPropagation(),e.preventDefault(),h(o)},modelValue:!0,"onUpdate:modelValue":void 0}
return t.createVNode("div",{key:o.value,class:"v-select__selection"},[l?t.createVNode(Ot,{defaults:{VChip:{closable:e.closableChips,size:"small",text:o.title}}},{default:()=>[a.chip?a.chip({item:o,index:n,props:r}):t.createVNode(Ao,r,null)]}):a.selection?a.selection({item:o,index:n}):t.createVNode("span",{class:"v-select__selection-text"},[o.title,e.multiple&&n<d.value.length-1&&t.createVNode("span",{class:"v-select__selection-comma"},[t.createTextVNode(",")])])])}))])}})})),po({menu:r,select:h},n)}}),er=(e,t,l)=>null==e||null==t?-1:e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()),tr=je({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter")
function lr(e,l,a){const o=t.computed((()=>"string"!=typeof(null==a?void 0:a.value)&&"number"!=typeof(null==a?void 0:a.value)?"":String(a.value)))
return{filteredItems:t.computed((()=>{const a=t.unref(l)
return function(e,t,l){const a=[],o=(null==l?void 0:l.default)??er,n=!(null==l||!l.filterKeys)&&x(l.filterKeys),r=Object.keys((null==l?void 0:l.customKeyFilter)??{}).length
if(null==e||!e.length)return a
e:for(let s=0;s<e.length;s++){const u=e[s],c={},d={}
let v=-1
if(t&&(null==l||!l.noFilter)){if("object"==typeof u){const e=n||Object.keys(u)
for(const a of e){var i
const e=f(u,a,u),n=null==l||null==(i=l.customKeyFilter)?void 0:i[a]
if(v=n?n(e,t,u):o(e,t,u),-1!==v&&!1!==v)n?c[a]=v:d[a]=v
else if("every"===(null==l?void 0:l.filterMode))continue e}}else v=o(u,t,u),-1!==v&&!1!==v&&(d.title=v)
const e=Object.keys(d).length,a=Object.keys(c).length
if(!e&&!a)continue
if("union"===(null==l?void 0:l.filterMode)&&a!==r&&!e)continue
if("intersection"===(null==l?void 0:l.filterMode)&&(a!==r||!e))continue}a.push({index:s,matches:{...d,...c}})}return a}(a,o.value,{customKeyFilter:e.customKeyFilter,default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}).map((e=>{let{index:t,matches:l}=e
return{item:a[t],matches:l}}))}))}}const ar=Ue()({name:"VAutocomplete",props:{search:String,...tr({filterKeys:["title"]}),...Jn(),...w(mo({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...cl({transition:!1})},emits:{"update:search":e=>!0,"update:modelValue":e=>!0,"update:menu":e=>!0},setup(e,l){let{slots:a}=l
const{t:o}=Rt(),n=t.ref(),r=t.ref(!1),i=t.ref(!0),s=wt(e,"menu"),{items:u,transformIn:c,transformOut:d}=an(e),v=wt(e,"search",""),p=wt(e,"modelValue",[],(e=>c(x(e))),(t=>{const l=d(t)
return e.multiple?l:l[0]??null})),{filteredItems:f}=lr(e,u,t.computed((()=>i.value?void 0:v.value))),m=t.computed((()=>p.value.map((t=>u.value.find((l=>e.valueComparator(l.value,t.value)))||t)))),g=t.computed((()=>m.value.map((e=>e.props.value)))),h=t.ref()
function y(t){p.value=[],e.openOnClear&&(s.value=!0),v.value=""}function b(){e.hideNoData&&!u.value.length||e.readonly||(s.value=!0)}function V(t){var l
if(!e.readonly)if(["Enter","ArrowDown"].includes(t.key)&&(s.value=!0),["Escape"].includes(t.key)&&(s.value=!1),["Enter","Escape","Tab"].includes(t.key)&&(i.value=!0),"ArrowDown"===t.key)t.preventDefault(),null==(l=h.value)||l.focus("next")
else if("ArrowUp"===t.key){var a
t.preventDefault(),null==(a=h.value)||a.focus("prev")}}function S(e){v.value=e.target.value}function w(){r.value&&(i.value=!0)}function k(e){r.value=!0}function C(e){var t
null==e.relatedTarget&&(null==(t=n.value)||t.focus())}const N=t.ref(!1)
function _(l){if(e.multiple){const e=g.value.findIndex((e=>e===l.value))
if(-1===e)p.value=[...p.value,l],v.value=""
else{const t=[...p.value]
t.splice(e,1),p.value=t}}else p.value=[l],N.value=!0,a.selection||(v.value=l.title),s.value=!1,i.value=!0,t.nextTick((()=>N.value=!1))}return t.watch(r,(l=>{var o
l?(N.value=!0,v.value=e.multiple||a.selection?"":String((null==(o=m.value.at(-1))?void 0:o.props.title)??""),i.value=!0,t.nextTick((()=>N.value=!1))):(s.value=!1,v.value="")})),t.watch(v,(e=>{r.value&&!N.value&&(e&&(s.value=!0),i.value=!e)})),Je((()=>{const l=!(!e.chips&&!a.chip),[u]=ho(e)
return t.createVNode(go,t.mergeProps({ref:n},u,{modelValue:v.value,"onUpdate:modelValue":e=>{null==e&&(p.value=[])},validationValue:p.externalValue,dirty:p.value.length>0,onInput:S,class:["v-autocomplete",{"v-autocomplete--active-menu":s.value,"v-autocomplete--chips":!!e.chips,["v-autocomplete--"+(e.multiple?"multiple":"single")]:!0,"v-autocomplete--selection-slot":!!a.selection}],appendInnerIcon:e.menuIcon,readonly:e.readonly,"onClick:clear":y,"onClick:control":b,"onClick:input":b,onFocus:()=>r.value=!0,onBlur:()=>r.value=!1,onKeydown:V}),{...a,default:()=>{var n,r,u
return t.createVNode(t.Fragment,null,[t.createVNode(Zn,t.mergeProps({modelValue:s.value,"onUpdate:modelValue":e=>s.value=e,activator:"parent",contentClass:"v-autocomplete__content",eager:e.eager,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:w},e.menuProps),{default:()=>[t.createVNode(rn,{ref:h,selected:g.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onFocusin:k,onFocusout:C},{default:()=>[!f.value.length&&!e.hideNoData&&((null==(n=a["no-data"])?void 0:n.call(a))??t.createVNode(Zo,{title:o(e.noDataText)},null)),null==(r=a["prepend-item"])?void 0:r.call(a),f.value.map(((l,o)=>{var n
let{item:r,matches:s}=l
return(null==(n=a.item)?void 0:n.call(a,{item:r,index:o,props:t.mergeProps(r.props,{onClick:()=>_(r)})}))??t.createVNode(Zo,t.mergeProps({key:o},r.props,{onClick:()=>_(r)}),{prepend:l=>{let{isSelected:a}=l
return e.multiple&&!e.hideSelected?t.createVNode(Co,{modelValue:a,ripple:!1},null):void 0},title:()=>{var e
return i.value?r.title:function(e,l,a){if(Array.isArray(l))throw new Error("Multiple matches is not implemented")
return"number"==typeof l&&~l?t.createVNode(t.Fragment,null,[t.createVNode("span",{class:"v-autocomplete__unmask"},[e.substr(0,l)]),t.createVNode("span",{class:"v-autocomplete__mask"},[e.substr(l,a)]),t.createVNode("span",{class:"v-autocomplete__unmask"},[e.substr(l+a)])]):e}(r.title,s.title,(null==(e=v.value)?void 0:e.length)??0)}})})),null==(u=a["append-item"])?void 0:u.call(a)]})]}),m.value.map(((o,n)=>{const r={"onClick:close":function(e){e.stopPropagation(),e.preventDefault(),_(o)},modelValue:!0,"onUpdate:modelValue":void 0}
return t.createVNode("div",{key:o.value,class:"v-autocomplete__selection"},[l?t.createVNode(Ot,{defaults:{VChip:{closable:e.closableChips,size:"small",text:o.title}}},{default:()=>[a.chip?a.chip({item:o,index:n,props:r}):t.createVNode(Ao,r,null)]}):a.selection?a.selection({item:o,index:n}):t.createVNode("span",{class:"v-autocomplete__selection-text"},[o.title,e.multiple&&n<m.value.length-1&&t.createVNode("span",{class:"v-autocomplete__selection-comma"},[t.createTextVNode(",")])])])}))])}})})),po({isFocused:r,isPristine:i,menu:s,search:v,filteredItems:f,select:_},n)}}),or=We({name:"VBadge",inheritAttrs:!1,props:{bordered:Boolean,color:String,content:[Number,String],dot:Boolean,floating:Boolean,icon:Ul,inline:Boolean,label:{type:String,default:"$vuetify.badge"},max:[Number,String],modelValue:{type:Boolean,default:!0},offsetX:[Number,String],offsetY:[Number,String],textColor:String,...$a({location:"top end"}),...bl(),...pl(),...mt(),...cl({transition:"scale-rotate-transition"})},setup(e,l){const{backgroundColorClasses:a,backgroundColorStyles:o}=kl(t.toRef(e,"color")),{roundedClasses:n}=Vl(e),{t:r}=Rt(),{textColorClasses:i,textColorStyles:s}=wl(t.toRef(e,"textColor")),{themeClasses:u}=bt(),{locationStyles:c}=Aa(e,!0,(t=>(e.floating?e.dot?2:4:e.dot?8:12)+(["top","bottom"].includes(t)?+(e.offsetY??0):["left","right"].includes(t)?+(e.offsetX??0):0)))
return Je((()=>{var d,v,p,f
const m=Number(e.content),g=!e.max||isNaN(m)?e.content:m<=e.max?m:`${e.max}+`,[h,y]=S(l.attrs,["aria-atomic","aria-label","aria-live","role","title"])
return t.createVNode(e.tag,t.mergeProps({class:["v-badge",{"v-badge--bordered":e.bordered,"v-badge--dot":e.dot,"v-badge--floating":e.floating,"v-badge--inline":e.inline}]},y),{default:()=>[t.createVNode("div",{class:"v-badge__wrapper"},[null==(d=(v=l.slots).default)?void 0:d.call(v),t.createVNode(dl,{transition:e.transition},{default:()=>[t.withDirectives(t.createVNode("span",t.mergeProps({class:["v-badge__badge",u.value,a.value,n.value,i.value],style:[o.value,s.value,e.inline?{}:c.value],"aria-atomic":"true","aria-label":r(e.label,m),"aria-live":"polite",role:"status"},h),[e.dot?void 0:l.slots.badge?null==(p=(f=l.slots).badge)?void 0:p.call(f):e.icon?t.createVNode(oa,{icon:e.icon},null):g]),[[t.vShow,e.modelValue]])]})])]})})),{}}}),nr=We({name:"VBannerActions",props:{color:String,density:String},setup(e,l){let{slots:a}=l
return ze({VBtn:{color:e.color,density:e.density,variant:"text"}}),Je((()=>{var e
return t.createVNode("div",{class:"v-banner-actions"},[null==(e=a.default)?void 0:e.call(a)])})),{}}}),rr=Ye("v-banner-text"),ir=We({name:"VBanner",props:{avatar:String,color:String,icon:Ul,lines:String,stacked:Boolean,sticky:Boolean,text:String,...ml(),...Il(),...nl(),...hl(),...$a(),...Ra(),...bl(),...pl(),...mt()},setup(e,l){let{slots:a}=l
const{borderClasses:o}=gl(e),{densityClasses:n}=$l(e),{mobile:r}=Pn(),{dimensionStyles:i}=rl(e),{elevationClasses:s}=yl(e),{locationStyles:u}=Aa(e),{positionClasses:c}=Ta(e),{roundedClasses:d}=Vl(e),{themeClasses:v}=yt(e),p=t.toRef(e,"color"),f=t.toRef(e,"density")
ze({VBannerActions:{color:p,density:f}}),Je((()=>{var l
const m=!(!e.text&&!a.text),g=!!(a.prepend||e.avatar||e.icon)
return t.createVNode(e.tag,{class:["v-banner",{"v-banner--stacked":e.stacked||r.value,"v-banner--sticky":e.sticky,[`v-banner--${e.lines}-line`]:!!e.lines},o.value,n.value,s.value,c.value,d.value,v.value],style:[i.value,u.value],role:"banner"},{default:()=>[g&&t.createVNode(Ot,{key:"prepend",defaults:{VAvatar:{color:p.value,density:f.value,icon:e.icon,image:e.avatar}}},{default:()=>[t.createVNode("div",{class:"v-banner__prepend"},[a.prepend?a.prepend():(e.avatar||e.icon)&&t.createVNode(Bo,null,null)])]}),t.createVNode("div",{class:"v-banner__content"},[m&&t.createVNode(rr,{key:"text"},{default:()=>[a.text?a.text():e.text]}),null==(l=a.default)?void 0:l.call(a)]),a.actions&&t.createVNode(nr,null,{default:()=>[a.actions()]})]})}))}}),sr=We({name:"VBottomNavigation",props:{bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...ml(),...Il(),...hl(),...bl(),...lt({name:"bottom-navigation"}),...pl({tag:"header"}),...Pl({modelValue:!0,selectedClass:"v-btn--selected"}),...mt()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const{themeClasses:o}=bt(),{borderClasses:n}=gl(e),{backgroundColorClasses:r,backgroundColorStyles:i}=kl(t.toRef(e,"bgColor")),{densityClasses:s}=$l(e),{elevationClasses:u}=yl(e),{roundedClasses:c}=Vl(e),d=t.computed((()=>Number(e.height)-("comfortable"===e.density?8:0)-("compact"===e.density?16:0))),v=t.toRef(e,"active"),{layoutItemStyles:p}=ot({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.computed((()=>"bottom")),layoutSize:t.computed((()=>v.value?d.value:0)),elementSize:d,active:v,absolute:t.toRef(e,"absolute")})
return Ml(e,Dl),ze({VBtn:{color:t.toRef(e,"color"),density:t.toRef(e,"density"),stacked:t.computed((()=>"horizontal"!==e.mode)),variant:"text"}},{scoped:!0}),Je((()=>t.createVNode(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":v.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":"shift"===e.mode},o.value,r.value,n.value,s.value,u.value,c.value],style:[i.value,p.value,{height:g(d.value),transform:`translateY(${g(v.value?0:100,"%")})`}]},{default:()=>[a.default&&t.createVNode("div",{class:"v-bottom-navigation__content"},[a.default()])]}))),{}}}),ur=Ye("v-breadcrumbs-divider","li"),cr=We({name:"VBreadcrumbsItem",props:{active:Boolean,activeClass:String,activeColor:String,color:String,disabled:Boolean,title:String,...Oa(),...pl({tag:"li"})},setup(e,l){let{slots:a,attrs:o}=l
const n=Pa(e,o),r=t.computed((()=>{var t
return e.active||(null==(t=n.isActive)?void 0:t.value)})),i=t.computed((()=>r.value?e.activeColor:e.color)),{textColorClasses:s,textColorStyles:u}=wl(i)
return Je((()=>{var l
const o=n.isLink.value?"a":e.tag
return t.createVNode(o,{class:["v-breadcrumbs-item",{"v-breadcrumbs-item--active":r.value,"v-breadcrumbs-item--disabled":e.disabled,"v-breadcrumbs-item--link":n.isLink.value,[`${e.activeClass}`]:r.value&&e.activeClass},s.value],style:[u.value],href:n.href.value,"aria-current":r.value?"page":void 0,onClick:n.navigate},{default:()=>[(null==(l=a.default)?void 0:l.call(a))??e.title]})})),{}}}),dr=Ue()({name:"VBreadcrumbs",props:{activeClass:String,activeColor:String,bgColor:String,color:String,disabled:Boolean,divider:{type:String,default:"/"},icon:Ul,items:{type:Array,default:()=>[]},...Il(),...bl(),...pl({tag:"ul"})},setup(e,l){let{slots:a}=l
const{backgroundColorClasses:o,backgroundColorStyles:n}=kl(t.toRef(e,"bgColor")),{densityClasses:r}=$l(e),{roundedClasses:i}=Vl(e)
return ze({VBreadcrumbsItem:{activeClass:t.toRef(e,"activeClass"),activeColor:t.toRef(e,"activeColor"),color:t.toRef(e,"color"),disabled:t.toRef(e,"disabled")}}),Je((()=>{var l
const s=!(!a.prepend&&!e.icon)
return t.createVNode(e.tag,{class:["v-breadcrumbs",o.value,r.value,i.value],style:n.value},{default:()=>[s&&t.createVNode(Ot,{key:"prepend",defaults:{VIcon:{icon:e.icon,start:!0}}},{default:()=>[t.createVNode("div",{class:"v-breadcrumbs__prepend"},[a.prepend?a.prepend():e.icon&&t.createVNode(oa,null,null)])]}),e.items.map(((l,o,n)=>{var r
return t.createVNode(t.Fragment,null,[t.createVNode(cr,t.mergeProps({key:o,disabled:o>=n.length-1},"string"==typeof l?{title:l}:l),{default:a.title?()=>{var e
return null==(e=a.title)?void 0:e.call(a,{item:l,index:o})}:void 0}),o<n.length-1&&t.createVNode(ur,null,{default:()=>[(null==(r=a.divider)?void 0:r.call(a,{item:l,index:o}))??e.divider]})])})),null==(l=a.default)?void 0:l.call(a)]})})),{}}}),vr=We({name:"VCardActions",setup(e,l){let{slots:a}=l
return ze({VBtn:{variant:"text"}}),Je((()=>{var e
return t.createVNode("div",{class:"v-card-actions"},[null==(e=a.default)?void 0:e.call(a)])})),{}}}),pr=Ye("v-card-subtitle"),fr=Ye("v-card-title"),mr=We({name:"VCardItem",props:{appendAvatar:String,appendIcon:Ul,prependAvatar:String,prependIcon:Ul,subtitle:String,title:String,...Il()},setup(e,l){let{slots:a}=l
return Je((()=>{var l,o,n,r,i
const s=!!(e.prependAvatar||e.prependIcon||a.prepend),u=!!(e.appendAvatar||e.appendIcon||a.append),c=!(!e.title&&!a.title),d=!(!e.subtitle&&!a.subtitle)
return t.createVNode("div",{class:"v-card-item"},[s&&t.createVNode(Ot,{key:"prepend",defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},{default:()=>[t.createVNode("div",{class:"v-card-item__prepend"},[(null==(l=a.prepend)?void 0:l.call(a))??t.createVNode(Bo,null,null)])]}),t.createVNode("div",{class:"v-card-item__content"},[c&&t.createVNode(fr,{key:"title"},{default:()=>[(null==(o=a.title)?void 0:o.call(a))??e.title]}),d&&t.createVNode(pr,{key:"subtitle"},{default:()=>[(null==(n=a.subtitle)?void 0:n.call(a))??e.subtitle]}),null==(r=a.default)?void 0:r.call(a)]),u&&t.createVNode(Ot,{key:"append",defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},{default:()=>[t.createVNode("div",{class:"v-card-item__append"},[(null==(i=a.append)?void 0:i.call(a))??t.createVNode(Bo,null,null)])]})])})),{}}}),gr=Ye("v-card-text"),hr=We({name:"VCard",directives:{Ripple:xa},props:{appendAvatar:String,appendIcon:Ul,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:Ul,ripple:Boolean,subtitle:String,text:String,title:String,...mt(),...ml(),...Il(),...nl(),...hl(),...Na(),...$a(),...Ra(),...bl(),...Oa(),...pl(),...Rl({variant:"elevated"})},setup(e,l){let{attrs:a,slots:o}=l
const{themeClasses:n}=yt(e),{borderClasses:r}=gl(e),{colorClasses:i,colorStyles:s,variantClasses:u}=Tl(e),{densityClasses:c}=$l(e),{dimensionStyles:d}=rl(e),{elevationClasses:v}=yl(e),{loaderClasses:p}=_a(e),{locationStyles:f}=Aa(e),{positionClasses:m}=Ta(e),{roundedClasses:g}=Vl(e),h=Pa(e,a),y=t.computed((()=>!1!==e.link&&h.isLink.value)),b=t.computed((()=>!e.disabled&&!1!==e.link&&(e.link||h.isClickable.value)))
return Je((()=>{var l,a,V
const S=y.value?"a":e.tag,w=!(!o.title&&!e.title),k=!(!o.subtitle&&!e.subtitle),x=w||k,C=!!(o.append||e.appendAvatar||e.appendIcon),N=!!(o.prepend||e.prependAvatar||e.prependIcon),_=!(!o.image&&!e.image),B=x||N||C,I=!(!o.text&&!e.text)
return t.withDirectives(t.createVNode(S,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":b.value},n.value,r.value,i.value,c.value,v.value,p.value,m.value,g.value,u.value],style:[s.value,d.value,f.value],href:h.href.value,onClick:b.value&&h.navigate,tabindex:e.disabled?-1:void 0},{default:()=>[_&&t.createVNode(Ot,{key:"image",defaults:{VImg:{cover:!0,src:e.image}}},{default:()=>[t.createVNode("div",{class:"v-card__image"},[(null==(l=o.image)?void 0:l.call(o))??t.createVNode(vl,null,null)])]}),t.createVNode(Ba,{name:"v-card",active:!!e.loading,color:"boolean"==typeof e.loading?void 0:e.loading},{default:o.loader}),B&&t.createVNode(mr,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:o.item,prepend:o.prepend,title:o.title,subtitle:o.subtitle,append:o.append}),I&&t.createVNode(gr,{key:"text"},{default:()=>[(null==(a=o.text)?void 0:a.call(o))??e.text]}),null==(V=o.default)?void 0:V.call(o),o.actions&&t.createVNode(vr,null,{default:o.actions}),El(b.value,"v-card")]}),[[t.resolveDirective("ripple"),b.value]])})),{}}})
function yr(e,t){var l
const a=e.changedTouches[0]
t.touchstartX=a.clientX,t.touchstartY=a.clientY,null==(l=t.start)||l.call(t,{originalEvent:e,...t})}function br(e,t){var l
const a=e.changedTouches[0]
t.touchendX=a.clientX,t.touchendY=a.clientY,null==(l=t.end)||l.call(t,{originalEvent:e,...t}),(e=>{const{touchstartX:t,touchendX:l,touchstartY:a,touchendY:o}=e
e.offsetX=l-t,e.offsetY=o-a,Math.abs(e.offsetY)<.5*Math.abs(e.offsetX)&&(e.left&&l<t-16&&e.left(e),e.right&&l>t+16&&e.right(e)),Math.abs(e.offsetX)<.5*Math.abs(e.offsetY)&&(e.up&&o<a-16&&e.up(e),e.down&&o>a+16&&e.down(e))})(t)}function Vr(e,t){var l
const a=e.changedTouches[0]
t.touchmoveX=a.clientX,t.touchmoveY=a.clientY,null==(l=t.move)||l.call(t,{originalEvent:e,...t})}const Sr={mounted:function(e,t){var l
const a=t.value,o=null!=a&&a.parent?e.parentElement:e,n=(null==a?void 0:a.options)??{passive:!0},r=null==(l=t.instance)?void 0:l.$.uid
if(!o||!r)return
const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const t={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end}
return{touchstart:e=>yr(e,t),touchend:e=>br(e,t),touchmove:e=>Vr(e,t)}}(t.value)
o._touchHandlers=o._touchHandlers??Object.create(null),o._touchHandlers[r]=i,V(i).forEach((e=>{o.addEventListener(e,i[e],n)}))},unmounted:function(e,t){var l,a
const o=null!=(l=t.value)&&l.parent?e.parentElement:e,n=null==(a=t.instance)?void 0:a.$.uid
if(null==o||!o._touchHandlers||!n)return
const r=o._touchHandlers[n]
V(r).forEach((e=>{o.removeEventListener(e,r[e])})),delete o._touchHandlers[n]}},wr=Symbol.for("vuetify:v-window"),kr=Symbol.for("vuetify:v-window-group"),xr=Ue()({name:"VWindow",directives:{Touch:Sr},props:{continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>"boolean"==typeof e||"hover"===e},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{default:"force"},...pl(),...mt()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{isRtl:n}=Lt(),{t:r}=Rt(),i=Ml(e,kr),s=t.ref(),u=t.computed((()=>n.value?!e.reverse:e.reverse)),c=t.ref(!1),d=t.computed((()=>`v-window-${"vertical"===e.direction?"y":"x"}${(u.value?!c.value:c.value)?"-reverse":""}-transition`)),v=t.ref(0),p=t.ref(void 0),f=t.computed((()=>i.items.value.findIndex((e=>i.selected.value.includes(e.id)))))
t.watch(f,((e,t)=>{const l=i.items.value.length,a=l-1
c.value=l<=2?e<t:e===a&&0===t||(0!==e||t!==a)&&e<t})),t.provide(wr,{transition:d,isReversed:c,transitionCount:v,transitionHeight:p,rootRef:s})
const m=t.computed((()=>e.continuous||0!==f.value)),g=t.computed((()=>e.continuous||f.value!==i.items.value.length-1))
function h(){m.value&&i.prev()}function y(){g.value&&i.next()}const b=t.computed((()=>{const l=[],o={icon:n.value?e.nextIcon:e.prevIcon,class:"v-window__"+(u.value?"right":"left"),onClick:i.prev,ariaLabel:r("$vuetify.carousel.prev")}
l.push(m.value?a.prev?a.prev({props:o}):t.createVNode(Ma,o,null):t.createVNode("div",null,null))
const s={icon:n.value?e.prevIcon:e.nextIcon,class:"v-window__"+(u.value?"left":"right"),onClick:i.next,ariaLabel:r("$vuetify.carousel.next")}
return l.push(g.value?a.next?a.next({props:s}):t.createVNode(Ma,s,null):t.createVNode("div",null,null)),l})),V=t.computed((()=>{if(!1===e.touch)return e.touch
return{...{left:()=>{u.value?h():y()},right:()=>{u.value?y():h()},start:e=>{let{originalEvent:t}=e
t.stopPropagation()}},...!0===e.touch?{}:e.touch}}))
return Je((()=>{var l,n
return t.withDirectives(t.createVNode(e.tag,{ref:s,class:["v-window",{"v-window--show-arrows-on-hover":"hover"===e.showArrows},o.value]},{default:()=>[t.createVNode("div",{class:"v-window__container",style:{height:p.value}},[null==(l=a.default)?void 0:l.call(a,{group:i}),!1!==e.showArrows&&t.createVNode("div",{class:"v-window__controls"},[b.value])]),null==(n=a.additional)?void 0:n.call(a,{group:i})]}),[[t.resolveDirective("touch"),V.value]])})),{group:i}}})
function Cr(){const e=t.ref(!1)
t.onMounted((()=>{window.requestAnimationFrame((()=>{e.value=!0}))}))
return{ssrBootStyles:t.computed((()=>e.value?void 0:{transition:"none !important"})),isBooted:t.readonly(e)}}const Nr=We({name:"VWindowItem",directives:{Touch:Sr},props:{reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...Ol(),...gn()},emits:{"group:selected":e=>!0},setup(e,l){let{slots:a}=l
const o=t.inject(wr),n=Fl(e,kr),{isBooted:r}=Cr()
if(!o||!n)throw new Error("[Vuetify] VWindowItem must be used inside VWindow")
const i=t.ref(!1),s=t.computed((()=>o.isReversed.value?!1!==e.reverseTransition:!1!==e.transition))
function u(){i.value&&o&&(i.value=!1,o.transitionCount.value>0&&(o.transitionCount.value-=1,0===o.transitionCount.value&&(o.transitionHeight.value=void 0)))}function c(){if(!i.value&&o){var e
if(i.value=!0,0===o.transitionCount.value)o.transitionHeight.value=g(null==(e=o.rootRef.value)?void 0:e.clientHeight)
o.transitionCount.value+=1}}function d(){u()}function v(e){i.value&&t.nextTick((()=>{s.value&&i.value&&o&&(o.transitionHeight.value=g(e.clientHeight))}))}const p=t.computed((()=>{const t=o.isReversed.value?e.reverseTransition:e.transition
return!!s.value&&{name:"string"!=typeof t?o.transition.value:t,onBeforeEnter:c,onAfterEnter:u,onEnterCancelled:d,onBeforeLeave:c,onAfterLeave:u,onLeaveCancelled:d,onEnter:v}})),{hasContent:f}=hn(e,n.isSelected)
return Je((()=>{var e
return t.createVNode(dl,{transition:r.value&&p.value},{default:()=>[t.withDirectives(t.createVNode("div",{class:["v-window-item",n.selectedClass.value]},[f.value&&(null==(e=a.default)?void 0:e.call(a))]),[[t.vShow,n.isSelected.value]])]})})),{}}}),_r=We({name:"VCarousel",props:{color:String,cycle:Boolean,delimiterIcon:{type:Ul,default:"$delimiter"},height:{type:[Number,String],default:500},hideDelimiters:Boolean,hideDelimiterBackground:Boolean,interval:{type:[Number,String],default:6e3,validator:e=>e>0},modelValue:null,progress:[Boolean,String],showArrows:{type:[Boolean,String],default:!0,validator:e=>"boolean"==typeof e||"hover"===e},verticalDelimiters:[Boolean,String]},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),{t:n}=Rt(),r=t.ref()
let i=-1
function s(){e.cycle&&r.value&&(i=window.setTimeout(r.value.group.next,+e.interval>0?+e.interval:6e3))}function u(){window.clearTimeout(i),window.requestAnimationFrame(s)}return t.watch(o,u),t.watch((()=>e.interval),u),t.watch((()=>e.cycle),(e=>{e?u():window.clearTimeout(i)})),t.onMounted(s),Je((()=>t.createVNode(xr,{ref:r,modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:["v-carousel",{"v-carousel--hide-delimiter-background":e.hideDelimiterBackground,"v-carousel--vertical-delimiters":e.verticalDelimiters}],style:{height:g(e.height)},continuous:!0,mandatory:"force",showArrows:e.showArrows},{default:a.default,additional:l=>{let{group:r}=l
return t.createVNode(t.Fragment,null,[!e.hideDelimiters&&t.createVNode("div",{class:"v-carousel__controls",style:{left:"left"===e.verticalDelimiters&&e.verticalDelimiters?0:"auto",right:"right"===e.verticalDelimiters?0:"auto"}},[r.items.value.length>0&&t.createVNode(Ot,{defaults:{VBtn:{color:e.color,icon:e.delimiterIcon,size:"x-small",variant:"text"}},scoped:!0},{default:()=>[r.items.value.map(((e,l)=>{const o={"aria-label":n("$vuetify.carousel.ariaLabel.delimiter",l+1,r.items.value.length),class:[r.isSelected(e.id)&&"v-btn--active"],onClick:()=>r.select(e.id,!0)}
return a.item?a.item({props:o,item:e}):t.createVNode(Ma,t.mergeProps(e,o),null)}))]})]),e.progress&&t.createVNode(Ca,{class:"v-carousel__progress",color:"string"==typeof e.progress?e.progress:void 0,modelValue:(r.getItemIndex(o.value)+1)/r.items.value.length*100},null)])},prev:a.prev,next:a.next}))),{}}}),Br=We({name:"VCarouselItem",inheritAttrs:!1,props:{value:null},setup(e,l){let{slots:a,attrs:o}=l
Je((()=>t.createVNode(Nr,{class:"v-carousel-item",value:e.value},{default:()=>[t.createVNode(vl,o,a)]})))}}),Ir=Ye("v-code"),$r=We({name:"VColorPickerCanvas",props:{color:{type:Object},disabled:Boolean,dotSize:{type:[Number,String],default:10},height:{type:[Number,String],default:150},width:{type:[Number,String],default:300}},emits:{"update:color":e=>!0,"update:position":e=>!0},setup(e,l){let{emit:a}=l
const o=t.ref(!1),n=t.ref(!1),r=t.ref({x:0,y:0}),i=t.computed((()=>{const{x:t,y:l}=r.value,a=parseInt(e.dotSize,10)/2
return{width:g(e.dotSize),height:g(e.dotSize),transform:`translate(${g(t-a)}, ${g(l-a)})`}})),s=t.ref()
function u(e,t,l){const{left:a,top:o,width:n,height:i}=l
r.value={x:C(e-a,0,n),y:C(t-o,0,i)}}function c(t){!e.disabled&&s.value&&u(t.clientX,t.clientY,s.value.getBoundingClientRect())}function d(t){t.preventDefault(),e.disabled||(o.value=!0,window.addEventListener("mousemove",v),window.addEventListener("mouseup",p),window.addEventListener("touchmove",v),window.addEventListener("touchend",p))}function v(t){if(e.disabled||!s.value)return
o.value=!0
const l=function(e){return"touches"in e?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:{clientX:e.clientX,clientY:e.clientY}}(t)
u(l.clientX,l.clientY,s.value.getBoundingClientRect())}function p(){window.removeEventListener("mousemove",v),window.removeEventListener("mouseup",p),window.removeEventListener("touchmove",v),window.removeEventListener("touchend",p)}function f(){var t
if(!s.value)return
const l=s.value,a=l.getContext("2d")
if(!a)return
const o=a.createLinearGradient(0,0,l.width,0)
o.addColorStop(0,"hsla(0, 0%, 100%, 1)"),o.addColorStop(1,`hsla(${(null==(t=e.color)?void 0:t.h)??0}, 100%, 50%, 1)`),a.fillStyle=o,a.fillRect(0,0,l.width,l.height)
const n=a.createLinearGradient(0,0,0,l.height)
n.addColorStop(0,"hsla(0, 0%, 100%, 0)"),n.addColorStop(1,"hsla(0, 0%, 0%, 1)"),a.fillStyle=n,a.fillRect(0,0,l.width,l.height)}return t.watch(r,(()=>{var t,l
if(n.value)return void(n.value=!1)
if(!s.value)return
const{width:o,height:i}=s.value.getBoundingClientRect(),{x:u,y:c}=r.value
a("update:color",{h:(null==(t=e.color)?void 0:t.h)??0,s:C(u,0,o)/o,v:1-C(c,0,i)/i,a:(null==(l=e.color)?void 0:l.a)??1})})),t.watch((()=>{var t
return null==(t=e.color)?void 0:t.h}),f,{immediate:!0}),t.watch((()=>e.color),(()=>{o.value?o.value=!1:e.color&&(n.value=!0,r.value={x:e.color.s*parseInt(e.width,10),y:(1-e.color.v)*parseInt(e.height,10)})}),{deep:!0,immediate:!0}),t.onMounted((()=>f())),Je((()=>t.createVNode("div",{class:"v-color-picker-canvas",style:{width:g(e.width),height:g(e.height)},onClick:c,onMousedown:d,onTouchstart:d},[t.createVNode("canvas",{ref:s,width:e.width,height:e.height},null),t.createVNode("div",{class:["v-color-picker-canvas__dot",{"v-color-picker-canvas__dot--disabled":e.disabled}],style:i.value},null)]))),{}}})
var Ar
function Er(e,t){return t.every((t=>e.hasOwnProperty(t)))}function Rr(e){if(!e)return null
let t=null
if("string"==typeof e){t=Ne(function(e){return e.startsWith("#")&&(e=e.slice(1)),3!==(e=e.replace(/([^0-9a-f])/gi,"F")).length&&4!==e.length||(e=e.split("").map((e=>e+e)).join("")),6===e.length?N(e,8,"F"):N(N(e,6),8,"F")}(e))}return"object"==typeof e&&(Er(e,["r","g","b"])?t=be(e):Er(e,["h","s","l"])?t=Se(e):Er(e,["h","s","v"])&&(t=e)),null!=t?{...t,a:t.a??1}:null}const Tr={h:0,s:0,v:1,a:1},Lr={inputProps:{type:"number",min:0},inputs:[{label:"R",max:255,step:1,getValue:e=>Math.round(e.r),getColor:(e,t)=>({...e,r:Number(t)})},{label:"G",max:255,step:1,getValue:e=>Math.round(e.g),getColor:(e,t)=>({...e,g:Number(t)})},{label:"B",max:255,step:1,getValue:e=>Math.round(e.b),getColor:(e,t)=>({...e,b:Number(t)})},{label:"A",max:1,step:.01,getValue:e=>{let{a:t}=e
return t?Math.round(100*t)/100:1},getColor:(e,t)=>({...e,a:Number(t)})}],to:ye,from:be},Pr={inputProps:{type:"number",min:0},inputs:[{label:"H",max:360,step:1,getValue:e=>Math.round(e.h),getColor:(e,t)=>({...e,h:Number(t)})},{label:"S",max:1,step:.01,getValue:e=>Math.round(100*e.s)/100,getColor:(e,t)=>({...e,s:Number(t)})},{label:"L",max:1,step:.01,getValue:e=>Math.round(100*e.l)/100,getColor:(e,t)=>({...e,l:Number(t)})},{label:"A",max:1,step:.01,getValue:e=>{let{a:t}=e
return t?Math.round(100*t)/100:1},getColor:(e,t)=>({...e,a:Number(t)})}],to:Ve,from:Se},Or={inputProps:{type:"text"},inputs:[{label:"HEXA",getValue:e=>e,getColor:(e,t)=>t}],to:_e,from:Ne},Fr={rgb:{...Lr,inputs:null==(Ar=Lr.inputs)?void 0:Ar.slice(0,3)},rgba:Lr,hsl:{...Pr,inputs:Pr.inputs.slice(0,3)},hsla:Pr,hex:{...Or,inputs:[{label:"HEX",getValue:e=>e.slice(0,7),getColor:(e,t)=>t}]},hexa:Or},Mr=e=>{let{label:l,...a}=e
return t.createVNode("div",{class:"v-color-picker-edit__input"},[t.createVNode("input",a,null),t.createVNode("span",null,[l])])},zr=We({name:"VColorPickerEdit",props:{color:Object,disabled:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(Fr).includes(e)},modes:{type:Array,default:()=>Object.keys(Fr),validator:e=>Array.isArray(e)&&e.every((e=>Object.keys(Fr).includes(e)))}},emits:{"update:color":e=>!0,"update:mode":e=>!0},setup(e,l){let{emit:a}=l
const o=t.computed((()=>e.modes.map((e=>({...Fr[e],name:e}))))),n=t.computed((()=>{var t
const l=o.value.find((t=>t.name===e.mode))
if(!l)return[]
const n=e.color?l.to(e.color):{}
return null==(t=l.inputs)?void 0:t.map((t=>{let{getValue:o,getColor:r,...i}=t
return{...l.inputProps,...i,disabled:e.disabled,value:o(n),onChange:e=>{const t=e.target
t&&a("update:color",l.from(r(n,t.value)))}}}))}))
return Je((()=>{var l
return t.createVNode("div",{class:"v-color-picker-edit"},[null==(l=n.value)?void 0:l.map((e=>t.createVNode(Mr,e,null))),o.value.length>1&&t.createVNode(Ma,{icon:"$unfold",size:"x-small",variant:"plain",onClick:()=>{const t=o.value.findIndex((t=>t.name===e.mode))
a("update:mode",o.value[(t+1)%o.value.length].name)}},null)])})),{}}}),Dr=Symbol.for("vuetify:v-slider")
function jr(e,t,l){const a="vertical"===l,o=t.getBoundingClientRect(),n="touches"in e?e.touches[0]:e
return a?n.clientY-(o.top+o.height/2):n.clientX-(o.left+o.width/2)}const Hr=je({disabled:Boolean,error:Boolean,readonly:Boolean,max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:0},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>"boolean"==typeof e||"always"===e},thumbSize:{type:[Number,String],default:20},showTicks:{type:[Boolean,String],default:!1,validator:e=>"boolean"==typeof e||"always"===e},ticks:{type:[Array,Object]},tickSize:{type:[Number,String],default:2},color:String,trackColor:String,trackFillColor:String,trackSize:{type:[Number,String],default:4},direction:{type:String,default:"horizontal",validator:e=>["vertical","horizontal"].includes(e)},reverse:Boolean,...bl(),...hl({elevation:2})},"slider"),Wr=e=>{let{props:l,handleSliderMouseUp:a,handleMouseMove:o,getActiveThumb:n}=e
const{isRtl:r}=Lt(),i=t.computed((()=>r.value!==l.reverse)),s=t.computed((()=>{let e=r.value?"rtl":"ltr"
return l.reverse&&(e="rtl"===e?"ltr":"rtl"),e})),u=t.computed((()=>parseFloat(l.min))),c=t.computed((()=>parseFloat(l.max))),d=t.computed((()=>l.step>0?parseFloat(l.step):0)),v=t.computed((()=>{const e=d.value.toString().trim()
return e.includes(".")?e.length-e.indexOf(".")-1:0})),p=t.computed((()=>parseInt(l.thumbSize,10))),f=t.computed((()=>parseInt(l.tickSize,10))),g=t.computed((()=>parseInt(l.trackSize,10))),h=t.computed((()=>(c.value-u.value)/d.value)),y=t.toRef(l,"disabled"),b=t.computed((()=>"vertical"===l.direction)),V=t.computed((()=>l.error||l.disabled?void 0:l.thumbColor??l.color)),S=t.computed((()=>l.error||l.disabled?void 0:l.trackColor??l.color)),w=t.computed((()=>l.error||l.disabled?void 0:l.trackFillColor??l.color)),k=t.ref(!1),x=t.ref(0),N=t.ref(),_=t.ref()
function B(e){if(d.value<=0)return e
const t=C(e,u.value,c.value),l=u.value%d.value,a=Math.round((t-l)/d.value)*d.value+l
return parseFloat(Math.min(a,c.value).toFixed(v.value))}function I(e){var t
const a="vertical"===l.direction,o=a?"top":"left",n=a?"height":"width",r=a?"clientY":"clientX",{[o]:s,[n]:d}=null==(t=N.value)?void 0:t.$el.getBoundingClientRect(),v=function(e,t){return"touches"in e&&e.touches.length?e.touches[0][t]:"changedTouches"in e&&e.changedTouches.length?e.changedTouches[0][t]:e[t]}(e,r)
let p=Math.min(Math.max((v-s-x.value)/d,0),1)||0
return(a||i.value)&&(p=1-p),B(u.value+p*(c.value-u.value))}let $=!1
const A=e=>{$||(x.value=0,a(I(e))),k.value=!1,$=!1,x.value=0},E=e=>{_.value=n(e),_.value&&(_.value.focus(),k.value=!0,_.value.contains(e.target)?($=!0,x.value=jr(e,_.value,l.direction)):(x.value=0,o(I(e))))},R={passive:!0,capture:!0}
function T(e){$=!0,o(I(e))}function L(e){e.stopPropagation(),e.preventDefault(),A(e),window.removeEventListener("mousemove",T,R),window.removeEventListener("mouseup",L)}function P(e){var t
A(e),window.removeEventListener("touchmove",T,R),null==(t=e.target)||t.removeEventListener("touchend",P)}const O=e=>{const t=(e-u.value)/(c.value-u.value)*100
return C(isNaN(t)?0:t,0,100)},F=t.computed((()=>l.ticks?Array.isArray(l.ticks)?l.ticks.map((e=>({value:e,position:O(e),label:e.toString()}))):Object.keys(l.ticks).map((e=>({value:parseFloat(e),position:O(parseFloat(e)),label:l.ticks[e]}))):h.value!==1/0?m(h.value+1).map((e=>{const t=u.value+e*d.value
return{value:t,position:O(t)}})):[])),M=t.computed((()=>F.value.some((e=>{let{label:t}=e
return!!t})))),z={activeThumbRef:_,color:t.toRef(l,"color"),decimals:v,disabled:y,direction:t.toRef(l,"direction"),elevation:t.toRef(l,"elevation"),hasLabels:M,horizontalDirection:s,isReversed:i,min:u,max:c,mousePressed:k,numTicks:h,onSliderMousedown:function(e){e.preventDefault(),E(e),window.addEventListener("mousemove",T,R),window.addEventListener("mouseup",L,{passive:!1})},onSliderTouchstart:function(e){var t
E(e),window.addEventListener("touchmove",T,R),null==(t=e.target)||t.addEventListener("touchend",P,{passive:!1})},parsedTicks:F,parseMouseMove:I,position:O,readonly:t.toRef(l,"readonly"),rounded:t.toRef(l,"rounded"),roundValue:B,showTicks:t.toRef(l,"showTicks"),startOffset:x,step:d,thumbSize:p,thumbColor:V,thumbLabel:t.toRef(l,"thumbLabel"),ticks:t.toRef(l,"ticks"),tickSize:f,trackColor:S,trackContainerRef:N,trackFillColor:w,trackSize:g,vertical:b}
return t.provide(Dr,z),z},Ur=We({name:"VSliderThumb",directives:{Ripple:xa},props:{focused:Boolean,max:{type:Number,required:!0},min:{type:Number,required:!0},modelValue:{type:Number,required:!0},position:{type:Number,required:!0}},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a,emit:o}=l
const n=t.inject(Dr)
if(!n)throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider")
const{thumbColor:r,step:i,vertical:s,disabled:u,thumbSize:c,thumbLabel:d,direction:v,readonly:p,elevation:f,isReversed:m,horizontalDirection:h,mousePressed:y,decimals:V}=n,{textColorClasses:S,textColorStyles:w}=wl(r),{pageup:k,pagedown:x,end:C,home:N,left:_,right:B,down:I,up:$}=b,A=[k,x,C,N,_,B,I,$],E=t.computed((()=>i.value?[1,2,3]:[1,5,10]))
function R(t){const l=function(t,l){if(!A.includes(t.key))return
t.preventDefault()
const a=i.value||.1,o=(e.max-e.min)/a
if([_,B,I,$].includes(t.key)){const e=(m.value?[_,$]:[B,$]).includes(t.key)?1:-1,o=t.shiftKey?2:t.ctrlKey?1:0
l+=e*a*E.value[o]}else t.key===N?l=e.min:t.key===C?l=e.max:l-=(t.key===x?1:-1)*a*(o>100?o/10:10)
return Math.max(e.min,Math.min(e.max,l))}(t,e.modelValue)
null!=l&&o("update:modelValue",l)}return Je((()=>{var l
const o=g(s.value?100-e.position:e.position,"%"),n=s.value?"block":"inline",{elevationClasses:r}=yl(t.computed((()=>u.value?void 0:f.value)))
return t.createVNode("div",{class:["v-slider-thumb",{"v-slider-thumb--focused":e.focused,"v-slider-thumb--pressed":e.focused&&y.value}],style:{[`inset-${n}-start`]:`calc(${o} - var(--v-slider-thumb-size) / 2)`,"--v-slider-thumb-size":g(c.value),direction:s.value?void 0:h.value},role:"slider",tabindex:u.value?-1:0,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,"aria-readonly":p.value,"aria-orientation":v.value,onKeydown:p.value?void 0:R},[t.createVNode("div",{class:["v-slider-thumb__surface",S.value,r.value],style:{...w.value}},null),t.withDirectives(t.createVNode("div",{class:["v-slider-thumb__ripple",S.value],style:w.value},null),[[t.resolveDirective("ripple"),!0,null,{circle:!0,center:!0}]]),t.createVNode(Gt,{origin:"bottom center"},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-slider-thumb__label-container"},[t.createVNode("div",{class:["v-slider-thumb__label"]},[t.createVNode("div",null,[(null==(l=a["thumb-label"])?void 0:l.call(a,{modelValue:e.modelValue}))??e.modelValue.toFixed(i.value?V.value:1)])])]),[[t.vShow,d.value&&e.focused||"always"===d.value]])]})])})),{}}}),Yr=We({name:"VSliderTrack",props:{start:{type:Number,required:!0},stop:{type:Number,required:!0}},emits:{},setup(e,l){let{slots:a}=l
const o=t.inject(Dr)
if(!o)throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider")
const{color:n,horizontalDirection:r,parsedTicks:i,rounded:s,showTicks:u,tickSize:c,trackColor:d,trackFillColor:v,trackSize:p,vertical:f,min:m,max:h}=o,{roundedClasses:y}=Vl(s),{backgroundColorClasses:b,backgroundColorStyles:V}=kl(v),{backgroundColorClasses:S,backgroundColorStyles:w}=kl(d),k=t.computed((()=>"inset-"+(f.value?"block-end":"inline-start"))),x=t.computed((()=>f.value?"height":"width")),C=t.computed((()=>({[k.value]:"0%",[x.value]:"100%"}))),N=t.computed((()=>e.stop-e.start)),_=t.computed((()=>({[k.value]:g(e.start,"%"),[x.value]:g(N.value,"%")}))),B=t.computed((()=>(f.value?i.value.slice().reverse():i.value).map(((l,o)=>{var n
const r=f.value?"bottom":"margin-inline-start",i=l.value!==m.value&&l.value!==h.value?g(l.position,"%"):void 0
return t.createVNode("div",{key:l.value,class:["v-slider-track__tick",{"v-slider-track__tick--filled":l.position>=e.start&&l.position<=e.stop,"v-slider-track__tick--first":l.value===m.value,"v-slider-track__tick--last":l.value===h.value}],style:{[r]:i}},[(l.label||a["tick-label"])&&t.createVNode("div",{class:"v-slider-track__tick-label"},[(null==(n=a["tick-label"])?void 0:n.call(a,{tick:l,index:o}))??l.label])])}))))
return Je((()=>t.createVNode("div",{class:["v-slider-track",y.value],style:{"--v-slider-track-size":g(p.value),"--v-slider-tick-size":g(c.value),direction:f.value?void 0:r.value}},[t.createVNode("div",{class:["v-slider-track__background",S.value,{"v-slider-track__background--opacity":!!n.value||!v.value}],style:{...C.value,...w.value}},null),t.createVNode("div",{class:["v-slider-track__fill",b.value],style:{..._.value,...V.value}},null),u.value&&t.createVNode("div",{class:["v-slider-track__ticks",{"v-slider-track__ticks--always-show":"always"===u.value}]},[B.value])]))),{}}}),Xr=We({name:"VSlider",props:{...qa(),...Hr(),...io(),modelValue:{type:[Number,String],default:0}},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=t.ref(),{min:n,max:r,mousePressed:i,roundValue:s,onSliderMousedown:u,onSliderTouchstart:c,trackContainerRef:d,position:v,hasLabels:p,readonly:f}=Wr({props:e,handleSliderMouseUp:e=>m.value=s(e),handleMouseMove:e=>m.value=s(e),getActiveThumb:()=>{var e
return null==(e=o.value)?void 0:e.$el}}),m=wt(e,"modelValue",void 0,(e=>{const t="string"==typeof e?parseFloat(e):null==e?n.value:e
return s(t)})),{isFocused:g,focus:h,blur:y}=Ka(e),b=t.computed((()=>v(m.value)))
return Je((()=>{const[l,s]=uo(e),v=!!(e.label||a.label||a.prepend)
return t.createVNode(so,t.mergeProps({class:["v-slider",{"v-slider--has-labels":!!a["tick-label"]||p.value,"v-slider--focused":g.value,"v-slider--pressed":i.value,"v-slider--disabled":e.disabled}]},l,{focused:g.value}),{...a,prepend:v?l=>{var o,n
return t.createVNode(t.Fragment,null,[(null==(o=a.label)?void 0:o.call(a,l))??e.label?t.createVNode(Xa,{class:"v-slider__label",text:e.label},null):void 0,null==(n=a.prepend)?void 0:n.call(a,l)])}:void 0,default:l=>{let{id:i}=l
return t.createVNode("div",{class:"v-slider__container",onMousedown:f.value?void 0:u,onTouchstartPassive:f.value?void 0:c},[t.createVNode("input",{id:i.value,name:e.name||i.value,disabled:e.disabled,readonly:e.readonly,tabindex:"-1",value:m.value},null),t.createVNode(Yr,{ref:d,start:0,stop:b.value},{"tick-label":a["tick-label"]}),t.createVNode(Ur,{ref:o,focused:g.value,min:n.value,max:r.value,modelValue:m.value,"onUpdate:modelValue":e=>m.value=e,position:b.value,elevation:e.elevation,onFocus:h,onBlur:y},{"thumb-label":a["thumb-label"]})])}})})),{}}}),Gr=We({name:"VColorPickerPreview",props:{color:{type:Object},disabled:Boolean,hideAlpha:Boolean},emits:{"update:color":e=>!0},setup(e,l){let{emit:a}=l
return Je((()=>{var l,o
return t.createVNode("div",{class:["v-color-picker-preview",{"v-color-picker-preview--hide-alpha":e.hideAlpha}]},[t.createVNode("div",{class:"v-color-picker-preview__dot"},[t.createVNode("div",{style:{background:we(e.color??Tr)}},null)]),t.createVNode("div",{class:"v-color-picker-preview__sliders"},[t.createVNode(Xr,{class:"v-color-picker-preview__track v-color-picker-preview__hue",modelValue:null==(l=e.color)?void 0:l.h,"onUpdate:modelValue":t=>a("update:color",{...e.color??Tr,h:t}),step:0,min:0,max:360,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null),!e.hideAlpha&&t.createVNode(Xr,{class:"v-color-picker-preview__track v-color-picker-preview__alpha",modelValue:null==(o=e.color)?void 0:o.a,"onUpdate:modelValue":t=>a("update:color",{...e.color??Tr,a:t}),step:0,min:0,max:1,disabled:e.disabled,thumbSize:14,trackSize:8,trackFillColor:"white",hideDetails:!0},null)])])})),{}}}),qr=Object.freeze({base:"#f44336",lighten5:"#ffebee",lighten4:"#ffcdd2",lighten3:"#ef9a9a",lighten2:"#e57373",lighten1:"#ef5350",darken1:"#e53935",darken2:"#d32f2f",darken3:"#c62828",darken4:"#b71c1c",accent1:"#ff8a80",accent2:"#ff5252",accent3:"#ff1744",accent4:"#d50000"}),Kr=Object.freeze({base:"#e91e63",lighten5:"#fce4ec",lighten4:"#f8bbd0",lighten3:"#f48fb1",lighten2:"#f06292",lighten1:"#ec407a",darken1:"#d81b60",darken2:"#c2185b",darken3:"#ad1457",darken4:"#880e4f",accent1:"#ff80ab",accent2:"#ff4081",accent3:"#f50057",accent4:"#c51162"}),Zr=Object.freeze({base:"#9c27b0",lighten5:"#f3e5f5",lighten4:"#e1bee7",lighten3:"#ce93d8",lighten2:"#ba68c8",lighten1:"#ab47bc",darken1:"#8e24aa",darken2:"#7b1fa2",darken3:"#6a1b9a",darken4:"#4a148c",accent1:"#ea80fc",accent2:"#e040fb",accent3:"#d500f9",accent4:"#aa00ff"}),Jr=Object.freeze({base:"#673ab7",lighten5:"#ede7f6",lighten4:"#d1c4e9",lighten3:"#b39ddb",lighten2:"#9575cd",lighten1:"#7e57c2",darken1:"#5e35b1",darken2:"#512da8",darken3:"#4527a0",darken4:"#311b92",accent1:"#b388ff",accent2:"#7c4dff",accent3:"#651fff",accent4:"#6200ea"}),Qr=Object.freeze({base:"#3f51b5",lighten5:"#e8eaf6",lighten4:"#c5cae9",lighten3:"#9fa8da",lighten2:"#7986cb",lighten1:"#5c6bc0",darken1:"#3949ab",darken2:"#303f9f",darken3:"#283593",darken4:"#1a237e",accent1:"#8c9eff",accent2:"#536dfe",accent3:"#3d5afe",accent4:"#304ffe"}),ei=Object.freeze({base:"#2196f3",lighten5:"#e3f2fd",lighten4:"#bbdefb",lighten3:"#90caf9",lighten2:"#64b5f6",lighten1:"#42a5f5",darken1:"#1e88e5",darken2:"#1976d2",darken3:"#1565c0",darken4:"#0d47a1",accent1:"#82b1ff",accent2:"#448aff",accent3:"#2979ff",accent4:"#2962ff"}),ti=Object.freeze({base:"#03a9f4",lighten5:"#e1f5fe",lighten4:"#b3e5fc",lighten3:"#81d4fa",lighten2:"#4fc3f7",lighten1:"#29b6f6",darken1:"#039be5",darken2:"#0288d1",darken3:"#0277bd",darken4:"#01579b",accent1:"#80d8ff",accent2:"#40c4ff",accent3:"#00b0ff",accent4:"#0091ea"}),li=Object.freeze({base:"#00bcd4",lighten5:"#e0f7fa",lighten4:"#b2ebf2",lighten3:"#80deea",lighten2:"#4dd0e1",lighten1:"#26c6da",darken1:"#00acc1",darken2:"#0097a7",darken3:"#00838f",darken4:"#006064",accent1:"#84ffff",accent2:"#18ffff",accent3:"#00e5ff",accent4:"#00b8d4"}),ai=Object.freeze({base:"#009688",lighten5:"#e0f2f1",lighten4:"#b2dfdb",lighten3:"#80cbc4",lighten2:"#4db6ac",lighten1:"#26a69a",darken1:"#00897b",darken2:"#00796b",darken3:"#00695c",darken4:"#004d40",accent1:"#a7ffeb",accent2:"#64ffda",accent3:"#1de9b6",accent4:"#00bfa5"}),oi=Object.freeze({base:"#4caf50",lighten5:"#e8f5e9",lighten4:"#c8e6c9",lighten3:"#a5d6a7",lighten2:"#81c784",lighten1:"#66bb6a",darken1:"#43a047",darken2:"#388e3c",darken3:"#2e7d32",darken4:"#1b5e20",accent1:"#b9f6ca",accent2:"#69f0ae",accent3:"#00e676",accent4:"#00c853"}),ni=Object.freeze({base:"#8bc34a",lighten5:"#f1f8e9",lighten4:"#dcedc8",lighten3:"#c5e1a5",lighten2:"#aed581",lighten1:"#9ccc65",darken1:"#7cb342",darken2:"#689f38",darken3:"#558b2f",darken4:"#33691e",accent1:"#ccff90",accent2:"#b2ff59",accent3:"#76ff03",accent4:"#64dd17"}),ri=Object.freeze({base:"#cddc39",lighten5:"#f9fbe7",lighten4:"#f0f4c3",lighten3:"#e6ee9c",lighten2:"#dce775",lighten1:"#d4e157",darken1:"#c0ca33",darken2:"#afb42b",darken3:"#9e9d24",darken4:"#827717",accent1:"#f4ff81",accent2:"#eeff41",accent3:"#c6ff00",accent4:"#aeea00"}),ii=Object.freeze({base:"#ffeb3b",lighten5:"#fffde7",lighten4:"#fff9c4",lighten3:"#fff59d",lighten2:"#fff176",lighten1:"#ffee58",darken1:"#fdd835",darken2:"#fbc02d",darken3:"#f9a825",darken4:"#f57f17",accent1:"#ffff8d",accent2:"#ffff00",accent3:"#ffea00",accent4:"#ffd600"}),si=Object.freeze({base:"#ffc107",lighten5:"#fff8e1",lighten4:"#ffecb3",lighten3:"#ffe082",lighten2:"#ffd54f",lighten1:"#ffca28",darken1:"#ffb300",darken2:"#ffa000",darken3:"#ff8f00",darken4:"#ff6f00",accent1:"#ffe57f",accent2:"#ffd740",accent3:"#ffc400",accent4:"#ffab00"}),ui=Object.freeze({base:"#ff9800",lighten5:"#fff3e0",lighten4:"#ffe0b2",lighten3:"#ffcc80",lighten2:"#ffb74d",lighten1:"#ffa726",darken1:"#fb8c00",darken2:"#f57c00",darken3:"#ef6c00",darken4:"#e65100",accent1:"#ffd180",accent2:"#ffab40",accent3:"#ff9100",accent4:"#ff6d00"}),ci=Object.freeze({base:"#ff5722",lighten5:"#fbe9e7",lighten4:"#ffccbc",lighten3:"#ffab91",lighten2:"#ff8a65",lighten1:"#ff7043",darken1:"#f4511e",darken2:"#e64a19",darken3:"#d84315",darken4:"#bf360c",accent1:"#ff9e80",accent2:"#ff6e40",accent3:"#ff3d00",accent4:"#dd2c00"}),di=Object.freeze({base:"#795548",lighten5:"#efebe9",lighten4:"#d7ccc8",lighten3:"#bcaaa4",lighten2:"#a1887f",lighten1:"#8d6e63",darken1:"#6d4c41",darken2:"#5d4037",darken3:"#4e342e",darken4:"#3e2723"}),vi=Object.freeze({base:"#607d8b",lighten5:"#eceff1",lighten4:"#cfd8dc",lighten3:"#b0bec5",lighten2:"#90a4ae",lighten1:"#78909c",darken1:"#546e7a",darken2:"#455a64",darken3:"#37474f",darken4:"#263238"}),pi=Object.freeze({base:"#9e9e9e",lighten5:"#fafafa",lighten4:"#f5f5f5",lighten3:"#eeeeee",lighten2:"#e0e0e0",lighten1:"#bdbdbd",darken1:"#757575",darken2:"#616161",darken3:"#424242",darken4:"#212121"}),fi=Object.freeze({black:"#000000",white:"#ffffff",transparent:"#ffffff00"})
var mi=Object.freeze({red:qr,pink:Kr,purple:Zr,deepPurple:Jr,indigo:Qr,blue:ei,lightBlue:ti,cyan:li,teal:ai,green:oi,lightGreen:ni,lime:ri,yellow:ii,amber:si,orange:ui,deepOrange:ci,brown:di,blueGrey:vi,grey:pi,shades:fi})
const gi=We({name:"VColorPickerSwatches",props:{swatches:{type:Array,default:()=>function(e){return Object.keys(e).map((t=>{const l=e[t]
return l.base?[l.base,l.darken4,l.darken3,l.darken2,l.darken1,l.lighten1,l.lighten2,l.lighten3,l.lighten4,l.lighten5]:[l.black,l.white,l.transparent]}))}(mi)},disabled:Boolean,color:Object,maxHeight:[Number,String]},emits:{"update:color":e=>!0},setup(e,l){let{emit:a}=l
return Je((()=>t.createVNode("div",{class:"v-color-picker-swatches",style:{maxHeight:g(e.maxHeight)}},[t.createVNode("div",null,[e.swatches.map((l=>t.createVNode("div",{class:"v-color-picker-swatches__swatch"},[l.map((l=>{const o=Rr(l)
return t.createVNode("div",{class:"v-color-picker-swatches__color",onClick:()=>o&&a("update:color",o)},[t.createVNode("div",{style:{background:l}},[e.color&&v(e.color,o)?t.createVNode(oa,{size:"x-small",icon:"$success",color:Ae(l,"#FFFFFF")>2?"white":"black"},null):void 0])])}))])))])]))),{}}}),hi=We({name:"VSheet",props:{color:String,...ml(),...nl(),...hl(),...$a(),...Ra(),...bl(),...pl(),...mt()},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{backgroundColorClasses:n,backgroundColorStyles:r}=kl(t.toRef(e,"color")),{borderClasses:i}=gl(e),{dimensionStyles:s}=rl(e),{elevationClasses:u}=yl(e),{locationStyles:c}=Aa(e),{positionClasses:d}=Ta(e),{roundedClasses:v}=Vl(e)
return()=>t.createVNode(e.tag,{class:["v-sheet",o.value,n.value,i.value,u.value,d.value,v.value],style:[r.value,s.value,c.value]},a)}}),yi=We({name:"VColorPicker",inheritAttrs:!1,props:{canvasHeight:{type:[String,Number],default:150},disabled:Boolean,dotSize:{type:[Number,String],default:10},hideCanvas:Boolean,hideSliders:Boolean,hideInputs:Boolean,mode:{type:String,default:"rgba",validator:e=>Object.keys(Fr).includes(e)},modes:{type:Array,default:()=>Object.keys(Fr),validator:e=>Array.isArray(e)&&e.every((e=>Object.keys(Fr).includes(e)))},showSwatches:Boolean,swatches:Array,swatchesMaxHeight:{type:[Number,String],default:150},modelValue:{type:[Object,String]},width:{type:[Number,String],default:300},...hl(),...bl(),...mt()},emits:{"update:modelValue":e=>!0,"update:mode":e=>!0},setup(e){const l=wt(e,"mode"),a=t.ref(null),o=wt(e,"modelValue",void 0,(e=>{let t=Rr(e)
return t?(a.value&&(t={...t,h:a.value.h},a.value=null),t):null}),(t=>t?function(e,t){if(null==t||"string"==typeof t){const t=_e(e)
return 1===e.a?t.slice(0,7):t}if("object"==typeof t){let l
return Er(t,["r","g","b"])?l=ye(e):Er(t,["h","s","l"])?l=Ve(e):Er(t,["h","s","v"])&&(l=e),function(e,t){if(t){const{a:t,...l}=e
return l}return e}(l,!Er(t,["a"]))}return e}(t,e.modelValue):null)),n=e=>{o.value=e,a.value=e}
return t.onMounted((()=>{e.modes.includes(l.value)||(l.value=e.modes[0])})),Je((()=>t.createVNode(hi,{rounded:e.rounded,elevation:e.elevation,theme:e.theme,class:["v-color-picker"],style:{"--v-color-picker-color-hsv":we({...o.value??Tr,a:1})},maxWidth:e.width},{default:()=>[!e.hideCanvas&&t.createVNode($r,{key:"canvas",color:o.value,"onUpdate:color":n,disabled:e.disabled,dotSize:e.dotSize,width:e.width,height:e.canvasHeight},null),(!e.hideSliders||!e.hideInputs)&&t.createVNode("div",{key:"controls",class:"v-color-picker__controls"},[!e.hideSliders&&t.createVNode(Gr,{key:"preview",color:o.value,"onUpdate:color":n,hideAlpha:!l.value.endsWith("a"),disabled:e.disabled},null),!e.hideInputs&&t.createVNode(zr,{key:"edit",modes:e.modes,mode:l.value,"onUpdate:mode":e=>l.value=e,color:o.value,"onUpdate:color":n,disabled:e.disabled},null)]),e.showSwatches&&t.createVNode(gi,{key:"swatches",color:o.value,"onUpdate:color":n,maxHeight:e.swatchesMaxHeight,swatches:e.swatches,disabled:e.disabled},null)]}))),{}}})
const bi=Ue()({name:"VCombobox",props:{delimiters:Array,...tr({filterKeys:["title"]}),...Jn({hideNoData:!0,returnObject:!0}),...w(mo({modelValue:null}),["validationValue","dirty","appendInnerIcon"]),...cl({transition:!1})},emits:{"update:modelValue":e=>!0,"update:search":e=>!0,"update:menu":e=>!0},setup(e,l){var a
let{emit:o,slots:n}=l
const{t:r}=Rt(),i=t.ref(),s=t.ref(!1),u=t.ref(!0),c=wt(e,"menu"),d=t.ref(-1),v=t.computed((()=>{var e
return null==(e=i.value)?void 0:e.color})),{items:p,transformIn:f,transformOut:m}=an(e),{textColorClasses:g,textColorStyles:h}=wl(v),y=wt(e,"modelValue",[],(e=>f(x(e||[]))),(t=>{const l=m(t)
return e.multiple?l:l[0]??null})),b=t.ref(e.multiple?"":(null==(a=y.value[0])?void 0:a.title)??""),V=t.computed({get:()=>b.value,set:t=>{var l
if(b.value=t,e.multiple||(y.value=[tn(e,t)]),t&&e.multiple&&null!=(l=e.delimiters)&&l.length){const l=t.split(new RegExp(`(?:${e.delimiters.join("|")})+`))
l.length>1&&(l.forEach((t=>{(t=t.trim())&&A(tn(e,t))})),b.value="")}t||(d.value=-1),s.value&&(c.value=!0),u.value=!t}})
t.watch(b,(e=>{o("update:search",e)})),t.watch(y,(t=>{var l
e.multiple||(b.value=(null==(l=t[0])?void 0:l.title)??"")}))
const{filteredItems:S}=lr(e,p,t.computed((()=>u.value?void 0:V.value))),w=t.computed((()=>y.value.map((t=>p.value.find((l=>e.valueComparator(l.value,t.value)))||t)))),k=t.computed((()=>w.value.map((e=>e.props.value)))),C=t.computed((()=>w.value[d.value])),N=t.ref()
function _(t){y.value=[],e.openOnClear&&(c.value=!0)}function B(){e.hideNoData&&!p.value.length||e.readonly||(c.value=!0)}function I(l){if(e.readonly)return
const a=i.value.selectionStart,o=k.value.length
var n
if(d.value>-1&&l.preventDefault(),["Enter","ArrowDown"].includes(l.key)&&(c.value=!0),["Escape"].includes(l.key)&&(c.value=!1),["Enter","Escape","Tab"].includes(l.key)&&(u.value=!0),"ArrowDown"===l.key)l.preventDefault(),null==(n=N.value)||n.focus("next")
else if("ArrowUp"===l.key){var r
l.preventDefault(),null==(r=N.value)||r.focus("prev")}if(e.multiple){if(["Backspace","Delete"].includes(l.key)){if(d.value<0)return void("Backspace"!==l.key||V.value||(d.value=o-1))
A(C.value),t.nextTick((()=>!C.value&&(d.value=o-2)))}if("ArrowLeft"===l.key){if(d.value<0&&a>0)return
const e=d.value>-1?d.value-1:o-1
w.value[e]?d.value=e:(d.value=-1,i.value.setSelectionRange(V.value.length,V.value.length))}if("ArrowRight"===l.key){if(d.value<0)return
const e=d.value+1
w.value[e]?d.value=e:(d.value=-1,i.value.setSelectionRange(0,0))}"Enter"===l.key&&(A(tn(e,V.value)),V.value="")}}function $(){s.value&&(u.value=!0)}function A(l){if(e.multiple){const e=k.value.findIndex((e=>e===l.value))
if(-1===e)y.value=[...y.value,l]
else{const t=[...y.value]
t.splice(e,1),y.value=t}V.value=""}else y.value=[l],b.value=l.title,t.nextTick((()=>{c.value=!1,u.value=!0}))}function E(e){s.value=!0}function R(e){var t
null==e.relatedTarget&&(null==(t=i.value)||t.focus())}return t.watch(S,(t=>{!t.length&&e.hideNoData&&(c.value=!1)})),t.watch(s,(t=>{if(t)d.value=-1
else{if(c.value=!1,!e.multiple||!V.value)return
y.value=[...y.value,tn(e,V.value)],V.value=""}})),Je((()=>{const l=!(!e.chips&&!n.chip),[a]=ho(e)
return t.createVNode(go,t.mergeProps({ref:i},a,{modelValue:V.value,"onUpdate:modelValue":[e=>V.value=e,e=>{null==e&&(y.value=[])}],validationValue:y.externalValue,dirty:y.value.length>0,class:["v-combobox",{"v-combobox--active-menu":c.value,"v-combobox--chips":!!e.chips,"v-combobox--selecting-index":d.value>-1,["v-combobox--"+(e.multiple?"multiple":"single")]:!0}],appendInnerIcon:e.items.length?e.menuIcon:void 0,readonly:e.readonly,"onClick:clear":_,"onClick:control":B,"onClick:input":B,onFocus:()=>s.value=!0,onBlur:()=>s.value=!1,onKeydown:I}),{...n,default:()=>{var a,o,i
return t.createVNode(t.Fragment,null,[t.createVNode(Zn,t.mergeProps({modelValue:c.value,"onUpdate:modelValue":e=>c.value=e,activator:"parent",contentClass:"v-combobox__content",eager:e.eager,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:$},e.menuProps),{default:()=>[t.createVNode(rn,{ref:N,selected:k.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:e=>e.preventDefault(),onFocusin:E,onFocusout:R},{default:()=>[!S.value.length&&!e.hideNoData&&((null==(a=n["no-data"])?void 0:a.call(n))??t.createVNode(Zo,{title:r(e.noDataText)},null)),null==(o=n["prepend-item"])?void 0:o.call(n),S.value.map(((l,a)=>{var o
let{item:r,matches:i}=l
return(null==(o=n.item)?void 0:o.call(n,{item:r,index:a,props:t.mergeProps(r.props,{onClick:()=>A(r)})}))??t.createVNode(Zo,t.mergeProps({key:a},r.props,{onClick:()=>A(r)}),{prepend:l=>{let{isSelected:a}=l
return e.multiple&&!e.hideSelected?t.createVNode(Co,{modelValue:a,ripple:!1},null):void 0},title:()=>{var e
return u.value?r.title:function(e,l,a){if(Array.isArray(l))throw new Error("Multiple matches is not implemented")
return"number"==typeof l&&~l?t.createVNode(t.Fragment,null,[t.createVNode("span",{class:"v-combobox__unmask"},[e.substr(0,l)]),t.createVNode("span",{class:"v-combobox__mask"},[e.substr(l,a)]),t.createVNode("span",{class:"v-combobox__unmask"},[e.substr(l+a)])]):e}(r.title,i.title,(null==(e=V.value)?void 0:e.length)??0)}})})),null==(i=n["append-item"])?void 0:i.call(n)]})]}),w.value.map(((a,o)=>{const r={"onClick:close":function(e){e.stopPropagation(),e.preventDefault(),A(a)},modelValue:!0,"onUpdate:modelValue":void 0}
return t.createVNode("div",{key:a.value,class:["v-combobox__selection",o===d.value&&["v-combobox__selection--selected",g.value]],style:o===d.value?h.value:{}},[l?t.createVNode(Ot,{defaults:{VChip:{closable:e.closableChips,size:"small",text:a.title}}},{default:()=>[n.chip?n.chip({item:a,index:o,props:r}):t.createVNode(Ao,r,null)]}):n.selection?n.selection({item:a,index:o}):t.createVNode("span",{class:"v-combobox__selection-text"},[a.title,e.multiple&&o<w.value.length-1&&t.createVNode("span",{class:"v-combobox__selection-comma"},[t.createTextVNode(",")])])])}))])}})})),po({isFocused:s,isPristine:u,menu:c,search:V,selectionIndex:d,filteredItems:S,select:A},i)}}),Vi=Ue()({name:"VDialog",props:{fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...Gn({origin:"center center",scrollStrategy:"block",transition:{component:Dt},zIndex:2400})},emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:o}=a
const n=wt(e,"modelValue"),{scopeId:r}=Fn(),i=t.ref()
function s(e){var t,l
const a=e.relatedTarget,o=e.target
if(a!==o&&null!=(t=i.value)&&t.contentEl&&null!=(l=i.value)&&l.globalTop&&![document,i.value.contentEl].includes(o)&&!i.value.contentEl.contains(o)){const e=[...i.value.contentEl.querySelectorAll('button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])')].filter((e=>!e.hasAttribute("disabled")&&!e.matches('[tabindex="-1"]')))
if(!e.length)return
const t=e[0],l=e[e.length-1]
a===t?l.focus():t.focus()}}return l&&t.watch((()=>n.value&&e.retainFocus),(e=>{e?document.addEventListener("focusin",s):document.removeEventListener("focusin",s)}),{immediate:!0}),t.watch(n,(async e=>{var l,a;(await t.nextTick(),e)?null==(l=i.value.contentEl)||l.focus({preventScroll:!0}):null==(a=i.value.activatorEl)||a.focus({preventScroll:!0})})),Je((()=>{const[l]=Kn(e)
return t.createVNode(qn,t.mergeProps({ref:i,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable}]},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-role":"dialog","aria-modal":"true",activatorProps:t.mergeProps({"aria-haspopup":"dialog","aria-expanded":String(n.value)},e.activatorProps)},r),{activator:o.activator,default:function(){for(var e,l=arguments.length,a=new Array(l),n=0;n<l;n++)a[n]=arguments[n]
return t.createVNode(Ot,{root:!0},{default:()=>[null==(e=o.default)?void 0:e.call(o,...a)]})}})})),po({},i)}}),Si=Symbol.for("vuetify:v-expansion-panel"),wi=["default","accordion","inset","popout"],ki=We({name:"VExpansionPanels",props:{color:String,variant:{type:String,default:"default",validator:e=>wi.includes(e)},readonly:Boolean,...Pl(),...pl(),...mt()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
Ml(e,Si)
const{themeClasses:o}=yt(e),n=t.computed((()=>e.variant&&`v-expansion-panels--variant-${e.variant}`))
return ze({VExpansionPanel:{color:t.toRef(e,"color")},VExpansionPanelTitle:{readonly:t.toRef(e,"readonly")}}),Je((()=>t.createVNode(e.tag,{class:["v-expansion-panels",o.value,n.value]},a))),{}}}),xi=je({color:String,expandIcon:{type:Ul,default:"$expand"},collapseIcon:{type:Ul,default:"$collapse"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1},readonly:Boolean},"v-expansion-panel-title"),Ci=We({name:"VExpansionPanelTitle",directives:{Ripple:xa},props:{...xi()},setup(e,l){let{slots:a}=l
const o=t.inject(Si)
if(!o)throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel")
const{backgroundColorClasses:n,backgroundColorStyles:r}=kl(e,"color"),i=t.computed((()=>({collapseIcon:e.collapseIcon,disabled:o.disabled.value,expanded:o.isSelected.value,expandIcon:e.expandIcon,readonly:e.readonly})))
return Je((()=>{var l
return t.withDirectives(t.createVNode("button",{class:["v-expansion-panel-title",{"v-expansion-panel-title--active":o.isSelected.value},n.value],style:r.value,type:"button",tabindex:o.disabled.value?-1:void 0,disabled:o.disabled.value,"aria-expanded":o.isSelected.value,onClick:e.readonly?void 0:o.toggle},[t.createVNode("span",{class:"v-expansion-panel-title__overlay"},null),null==(l=a.default)?void 0:l.call(a,i.value),!e.hideActions&&t.createVNode("span",{class:"v-expansion-panel-title__icon"},[a.actions?a.actions(i.value):t.createVNode(oa,{icon:o.isSelected.value?e.collapseIcon:e.expandIcon},null)])]),[[t.resolveDirective("ripple"),e.ripple]])})),{}}}),Ni=We({name:"VExpansionPanelText",props:{...gn()},setup(e,l){let{slots:a}=l
const o=t.inject(Si)
if(!o)throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel")
const{hasContent:n,onAfterLeave:r}=hn(e,o.isSelected)
return Je((()=>{var e
return t.createVNode(al,{onAfterLeave:r},{default:()=>[t.withDirectives(t.createVNode("div",{class:"v-expansion-panel-text"},[a.default&&n.value&&t.createVNode("div",{class:"v-expansion-panel-text__wrapper"},[null==(e=a.default)?void 0:e.call(a)])]),[[t.vShow,o.isSelected.value]])]})})),{}}}),_i=We({name:"VExpansionPanel",props:{title:String,text:String,bgColor:String,...hl(),...Ol(),...gn(),...bl(),...pl(),...xi()},emits:{"group:selected":e=>!0},setup(e,l){let{slots:a}=l
const o=Fl(e,Si),{backgroundColorClasses:n,backgroundColorStyles:r}=kl(e,"bgColor"),{elevationClasses:i}=yl(e),{roundedClasses:s}=Vl(e),u=t.computed((()=>(null==o?void 0:o.disabled.value)||e.disabled)),c=t.computed((()=>o.group.items.value.reduce(((e,t,l)=>(o.group.selected.value.includes(t.id)&&e.push(l),e)),[]))),d=t.computed((()=>{const e=o.group.items.value.findIndex((e=>e.id===o.id))
return!o.isSelected.value&&c.value.some((t=>t-e==1))})),v=t.computed((()=>{const e=o.group.items.value.findIndex((e=>e.id===o.id))
return!o.isSelected.value&&c.value.some((t=>t-e==-1))}))
return t.provide(Si,o),Je((()=>{var l
const c=!(!a.text&&!e.text),p=!(!a.title&&!e.title)
return t.createVNode(e.tag,{class:["v-expansion-panel",{"v-expansion-panel--active":o.isSelected.value,"v-expansion-panel--before-active":d.value,"v-expansion-panel--after-active":v.value,"v-expansion-panel--disabled":u.value},s.value,n.value],style:r.value,"aria-expanded":o.isSelected.value},{default:()=>[t.createVNode("div",{class:["v-expansion-panel__shadow",...i.value]},null),p&&t.createVNode(Ci,{key:"title",collapseIcon:e.collapseIcon,color:e.color,expandIcon:e.expandIcon,hideActions:e.hideActions,ripple:e.ripple},{default:()=>[a.title?a.title():e.title]}),c&&t.createVNode(Ni,{key:"text",eager:e.eager},{default:()=>[a.text?a.text():e.text]}),null==(l=a.default)?void 0:l.call(a)]})})),{}}}),Bi=We({name:"VFileInput",inheritAttrs:!1,props:{chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,hint:String,persistentHint:Boolean,placeholder:String,showSize:{type:[Boolean,Number],default:!1,validator:e=>"boolean"==typeof e||[1e3,1024].includes(e)},...io({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:e=>x(e).every((e=>null!=e&&"object"==typeof e))},...Ja({clearable:!0})},emits:{"click:control":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{attrs:a,emit:o,slots:n}=l
const{t:r}=Rt(),i=wt(e,"modelValue"),s=t.computed((()=>"boolean"!=typeof e.showSize?e.showSize:void 0)),u=t.computed((()=>(i.value??[]).reduce(((e,t)=>{let{size:l=0}=t
return e+l}),0))),c=t.computed((()=>_(u.value,s.value))),d=t.computed((()=>(i.value??[]).map((t=>{const{name:l="",size:a=0}=t
return e.showSize?`${l} (${_(a,s.value)})`:l})))),v=t.computed((()=>{var t
const l=(null==(t=i.value)?void 0:t.length)??0
return e.showSize?r(e.counterSizeString,l,c.value):r(e.counterString,l)})),p=t.ref(),f=t.ref(),m=t.ref(!1),g=t.ref(),h=t.computed((()=>e.messages.length?e.messages:e.persistentHint?e.hint:""))
function y(){var e
g.value!==document.activeElement&&(null==(e=g.value)||e.focus())
m.value||(m.value=!0)}function b(t){D(e["onClick:prepend"],t),V(t)}function V(e){var t
null==(t=g.value)||t.click(),o("click:control",e)}function S(l){l.stopPropagation(),y(),t.nextTick((()=>{i.value=[],null!=g&&g.value&&(g.value.value=""),D(e["onClick:clear"],l)}))}return Je((()=>{const l=!(!n.counter&&!e.counter),o=!(!l&&!n.details),[r,s]=k(a),[{modelValue:w,...x}]=uo(e),[C]=eo(e)
return t.createVNode(so,t.mergeProps({ref:p,modelValue:i.value,"onUpdate:modelValue":e=>i.value=e,class:"v-file-input","onClick:prepend":b,"onClick:append":e["onClick:append"]},r,x,{focused:m.value,messages:h.value}),{...n,default:l=>{let{isDisabled:a,isDirty:o,isReadonly:r,isValid:v}=l
return t.createVNode(Qa,t.mergeProps({ref:f,"prepend-icon":e.prependIcon,"onClick:control":V,"onClick:clear":S,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},C,{active:o.value||m.value,dirty:o.value,focused:m.value,error:!1===v.value}),{...n,default:l=>{let{props:{class:o,...v}}=l
return t.createVNode(t.Fragment,null,[t.createVNode("input",t.mergeProps({ref:g,type:"file",readonly:r.value,disabled:a.value,multiple:e.multiple,name:e.name,onClick:e=>{e.stopPropagation(),y()},onChange:e=>{if(!e.target)return
const t=e.target
i.value=[...t.files??[]]},onFocus:y,onBlur:()=>m.value=!1},v,s),null),t.createVNode("div",{class:o},[i.value.length>0&&(n.selection?n.selection({fileNames:d.value,totalBytes:u.value,totalBytesReadable:c.value}):e.chips?d.value.map((l=>t.createVNode(Ao,{key:l,size:"small",color:e.color},{default:()=>[l]}))):d.value.join(", "))])])}})},details:o?e=>{var a
return t.createVNode(t.Fragment,null,[null==(a=n.details)?void 0:a.call(n,e),l&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(co,{active:!!i.value.length,value:v.value},n.counter)])])}:void 0})})),po({},p,f,g)}}),Ii=We({name:"VFooter",props:{app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...ml(),...hl(),...lt(),...bl(),...pl({tag:"footer"}),...mt()},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{backgroundColorClasses:n,backgroundColorStyles:i}=kl(t.toRef(e,"color")),{borderClasses:s}=gl(e),{elevationClasses:u}=yl(e),{roundedClasses:c}=Vl(e),d=t.ref(32),{resizeRef:v}=r((e=>{e.length&&(d.value=e[0].target.clientHeight)})),p=t.computed((()=>"auto"===e.height?d.value:parseInt(e.height,10))),{layoutItemStyles:f}=ot({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.computed((()=>"bottom")),layoutSize:p,elementSize:t.computed((()=>"auto"===e.height?void 0:p.value)),active:t.computed((()=>e.app)),absolute:t.toRef(e,"absolute")})
return Je((()=>t.createVNode(e.tag,{ref:v,class:["v-footer",o.value,n.value,s.value,u.value,c.value],style:[i.value,e.app?f.value:void 0]},a))),{}}}),$i=We({name:"VForm",props:{...ao()},emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,l){let{slots:a,emit:o}=l
const n=function(e){const l=wt(e,"modelValue"),a=t.computed((()=>e.disabled)),o=t.computed((()=>e.readonly)),n=t.ref(!1),r=t.ref([]),i=t.ref([])
return t.watch(r,(()=>{let e=0,t=0
const a=[]
for(const l of r.value)!1===l.isValid?(t++,a.push({id:l.id,errorMessages:l.errorMessages})):!0===l.isValid&&e++
i.value=a,l.value=!(t>0)&&(e===r.value.length||null)}),{deep:!0}),t.provide(lo,{register:e=>{let{id:t,validate:l,reset:a,resetValidation:o}=e
r.value.some((e=>e.id===t))&&te(`Duplicate input name "${t}"`),r.value.push({id:t,validate:l,reset:a,resetValidation:o,isValid:null,errorMessages:[]})},unregister:e=>{r.value=r.value.filter((t=>t.id!==e))},update:(e,t,l)=>{const a=r.value.find((t=>t.id===e))
a&&(a.isValid=t,a.errorMessages=l)},isDisabled:a,isReadonly:o,isValidating:n,items:r,validateOn:t.toRef(e,"validateOn")}),{errors:i,isDisabled:a,isReadonly:o,isValidating:n,items:r,validate:async function(){const t=[]
let l=!0
i.value=[],n.value=!0
for(const a of r.value){const o=await a.validate()
if(o.length>0&&(l=!1,t.push({id:a.id,errorMessages:o})),!l&&e.fastFail)break}return i.value=t,n.value=!1,{valid:l,errors:i.value}},reset:function(){r.value.forEach((e=>e.reset())),l.value=null},resetValidation:function(){r.value.forEach((e=>e.resetValidation())),i.value=[],l.value=null}}}(e),r=t.ref()
function i(e){e.preventDefault(),n.reset()}function s(e){const t=e,l=n.validate()
t.then=l.then.bind(l),t.catch=l.catch.bind(l),t.finally=l.finally.bind(l),o("submit",t),t.defaultPrevented||l.then((e=>{let{valid:t}=e
var l
t&&(null==(l=r.value)||l.submit())})),t.preventDefault()}return Je((()=>{var e
return t.createVNode("form",{ref:r,class:"v-form",novalidate:!0,onReset:i,onSubmit:s},[null==(e=a.default)?void 0:e.call(a,n)])})),po(n,r)}}),Ai=We({name:"VContainer",props:{fluid:{type:Boolean,default:!1},...pl()},setup(e,l){let{slots:a}=l
return Je((()=>t.createVNode(e.tag,{class:["v-container",{"v-container--fluid":e.fluid}]},a))),{}}}),Ei=["sm","md","lg","xl","xxl"],Ri=Ei.reduce(((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e)),{}),Ti=Ei.reduce(((e,l)=>(e["offset"+t.capitalize(l)]={type:[String,Number],default:null},e)),{}),Li=Ei.reduce(((e,l)=>(e["order"+t.capitalize(l)]={type:[String,Number],default:null},e)),{}),Pi={col:Object.keys(Ri),offset:Object.keys(Ti),order:Object.keys(Li)}
function Oi(e,t,l){let a=e
if(null!=l&&!1!==l){if(t){a+=`-${t.replace(e,"")}`}return"col"===e&&(a="v-"+a),"col"!==e||""!==l&&!0!==l?(a+=`-${l}`,a.toLowerCase()):a.toLowerCase()}}const Fi=["auto","start","end","center","baseline","stretch"],Mi=We({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...Ri,offset:{type:[String,Number],default:null},...Ti,order:{type:[String,Number],default:null},...Li,alignSelf:{type:String,default:null,validator:e=>Fi.includes(e)},...pl()},setup(e,l){let{slots:a}=l
const o=t.computed((()=>{const t=[]
let l
for(l in Pi)Pi[l].forEach((a=>{const o=e[a],n=Oi(l,a,o)
n&&t.push(n)}))
const a=t.some((e=>e.startsWith("v-col-")))
return t.push({"v-col":!a||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),t}))
return()=>{var l
return t.h(e.tag,{class:o.value},null==(l=a.default)?void 0:l.call(a))}}}),zi=["sm","md","lg","xl","xxl"],Di=["start","end","center"],ji=["space-between","space-around","space-evenly"]
function Hi(e,l){return zi.reduce(((a,o)=>(a[e+t.capitalize(o)]=l(),a)),{})}const Wi=[...Di,"baseline","stretch"],Ui=e=>Wi.includes(e),Yi=Hi("align",(()=>({type:String,default:null,validator:Ui}))),Xi=[...Di,...ji],Gi=e=>Xi.includes(e),qi=Hi("justify",(()=>({type:String,default:null,validator:Gi}))),Ki=[...Di,...ji,"stretch"],Zi=e=>Ki.includes(e),Ji=Hi("alignContent",(()=>({type:String,default:null,validator:Zi}))),Qi={align:Object.keys(Yi),justify:Object.keys(qi),alignContent:Object.keys(Ji)},es={align:"align",justify:"justify",alignContent:"align-content"}
function ts(e,t,l){let a=es[e]
if(null!=l){if(t){a+=`-${t.replace(e,"")}`}return a+=`-${l}`,a.toLowerCase()}}const ls=We({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:Ui},...Yi,justify:{type:String,default:null,validator:Gi},...qi,alignContent:{type:String,default:null,validator:Zi},...Ji,...pl()},setup(e,l){let{slots:a}=l
const o=t.computed((()=>{const t=[]
let l
for(l in Qi)Qi[l].forEach((a=>{const o=e[a],n=ts(l,a,o)
n&&t.push(n)}))
return t.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),t}))
return()=>{var l
return t.h(e.tag,{class:["v-row",o.value]},null==(l=a.default)?void 0:l.call(a))}}}),as=Ye("flex-grow-1","div","VSpacer"),os=We({name:"VHover",props:{disabled:Boolean,modelValue:{type:Boolean,default:void 0},...dn()},emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:l}=t
const a=wt(e,"modelValue"),{runOpenDelay:o,runCloseDelay:n}=vn(e,(t=>!e.disabled&&(a.value=t)))
return()=>{var e
return null==(e=l.default)?void 0:e.call(l,{isHovering:a.value,props:{onMouseenter:o,onMouseleave:n}})}}}),ns=Symbol.for("vuetify:v-item-group"),rs=We({name:"VItemGroup",props:{...Pl({selectedClass:"v-item--selected"}),...pl(),...mt()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{isSelected:n,select:r,next:i,prev:s,selected:u}=Ml(e,ns)
return()=>{var l
return t.createVNode(e.tag,{class:["v-item-group",o.value]},{default:()=>[null==(l=a.default)?void 0:l.call(a,{isSelected:n,select:r,next:i,prev:s,selected:u.value})]})}}}),is=Ue()({name:"VItem",props:Ol(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:l}=t
const{isSelected:a,select:o,toggle:n,selectedClass:r,value:i,disabled:s}=Fl(e,ns)
return()=>{var e
return null==(e=l.default)?void 0:e.call(l,{isSelected:a.value,selectedClass:r.value,select:o,toggle:n,value:i.value,disabled:s.value})}}}),ss=Ye("v-kbd"),us=We({name:"VLayout",props:tt(),setup(e,l){let{slots:a}=l
const{layoutClasses:o,layoutStyles:n,getLayoutItem:r,items:i,layoutRef:s}=nt(e)
return Je((()=>{var e
return t.createVNode("div",{ref:s,class:o.value,style:n.value},[null==(e=a.default)?void 0:e.call(a)])})),{getLayoutItem:r,items:i}}}),cs=We({name:"VLayoutItem",props:{position:{type:String,required:!0},size:{type:[Number,String],default:300},modelValue:Boolean,...lt()},setup(e,l){let{slots:a}=l
const{layoutItemStyles:o}=ot({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.toRef(e,"position"),elementSize:t.toRef(e,"size"),layoutSize:t.toRef(e,"size"),active:t.toRef(e,"modelValue"),absolute:t.toRef(e,"absolute")})
return()=>{var e
return t.createVNode("div",{class:["v-layout-item"],style:o.value},[null==(e=a.default)?void 0:e.call(a)])}}}),ds=We({name:"VLazy",directives:{intersect:ul},props:{modelValue:Boolean,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},...nl(),...pl(),...cl({transition:"fade-transition"})},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const{dimensionStyles:o}=rl(e),n=wt(e,"modelValue")
function r(e){n.value||(n.value=e)}return Je((()=>{var l
return t.withDirectives(t.createVNode(e.tag,{class:"v-lazy",style:o.value},{default:()=>[n.value&&t.createVNode(dl,{transition:e.transition,appear:!0},{default:()=>[null==(l=a.default)?void 0:l.call(a)]})]}),[[t.resolveDirective("intersect"),r,e.options]])})),{}}}),vs=We({name:"VLocaleProvider",props:{locale:String,fallbackLocale:String,messages:Object,rtl:{type:Boolean,default:void 0}},setup(e,l){let{slots:a}=l
const{rtlClasses:o}=Tt(e)
return Je((()=>{var e
return t.createVNode("div",{class:["v-locale-provider",o.value]},[null==(e=a.default)?void 0:e.call(a)])})),{}}}),ps=We({name:"VMain",props:{scrollable:Boolean,...pl({tag:"main"})},setup(e,l){let{slots:a}=l
const{mainStyles:o}=at(),{ssrBootStyles:n}=Cr()
return Je((()=>{var l,r
return t.createVNode(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable}],style:[o.value,n.value]},{default:()=>[e.scrollable?t.createVNode("div",{class:"v-main__scroller"},[null==(l=a.default)?void 0:l.call(a)]):null==(r=a.default)?void 0:r.call(a)]})})),{}}})
function fs(e){return(e<0?-1:1)*Math.sqrt(Math.abs(e))*1.41421356237}function ms(e){if(e.length<2)return 0
if(2===e.length)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t)
let t=0
for(let l=e.length-1;l>0;l--){if(e[l].t===e[l-1].t)continue
const a=fs(t),o=(e[l].d-e[l-1].d)/(e[l].t-e[l-1].t)
t+=(o-a)*Math.abs(o),l===e.length-1&&(t*=.5)}return 1e3*fs(t)}function gs(){const e={}
return{addMovement:function(t){Array.from(t.changedTouches).forEach((l=>{(e[l.identifier]??(e[l.identifier]=new T(20))).push([t.timeStamp,l])}))},endTouch:function(t){Array.from(t.changedTouches).forEach((t=>{delete e[t.identifier]}))},getVelocity:function(t){var l
const a=null==(l=e[t])?void 0:l.values().reverse()
if(!a)throw new Error(`No samples for touch id ${t}`)
const o=a[0],n=[],r=[]
for(const e of a){if(o[0]-e[0]>100)break
n.push({t:e[0],d:e[1].clientX}),r.push({t:e[0],d:e[1].clientY})}return{x:ms(n),y:ms(r),get direction(){const{x:e,y:t}=this,[l,a]=[Math.abs(e),Math.abs(t)]
return l>a&&e>=0?"right":l>a&&e<=0?"left":a>l&&t>=0?"down":a>l&&t<=0?"up":function(){throw new Error}()}}}}}function hs(){throw new Error}const ys=["start","end","left","right","bottom"],bs=We({name:"VNavigationDrawer",props:{color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:Boolean,railWidth:{type:[Number,String],default:56},scrim:{type:[String,Boolean],default:!0},image:String,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>ys.includes(e)},sticky:Boolean,...ml(),...hl(),...lt(),...bl(),...pl({tag:"nav"}),...mt()},emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:a,slots:o}=l
const{isRtl:n}=Lt(),{themeClasses:r}=yt(e),{borderClasses:i}=gl(e),{backgroundColorClasses:s,backgroundColorStyles:u}=kl(t.toRef(e,"color")),{elevationClasses:c}=yl(e),{mobile:d}=Pn(),{roundedClasses:v}=Vl(e),p=La(),f=wt(e,"modelValue",null,(e=>!!e)),{ssrBootStyles:m}=Cr(),h=t.ref(),y=t.ref(!1),b=t.computed((()=>e.rail&&e.expandOnHover&&y.value?Number(e.width):Number(e.rail?e.railWidth:e.width))),V=t.computed((()=>U(e.location,n.value))),S=t.computed((()=>!e.permanent&&(d.value||e.temporary))),w=t.computed((()=>e.sticky&&!S.value&&"bottom"!==V.value))
e.disableResizeWatcher||t.watch(S,(l=>!e.permanent&&t.nextTick((()=>f.value=!l)))),!e.disableRouteWatcher&&p&&t.watch(p.currentRoute,(()=>S.value&&(f.value=!1))),t.watch((()=>e.permanent),(e=>{e&&(f.value=!0)})),t.onBeforeMount((()=>{null!=e.modelValue||S.value||(f.value=e.permanent||!d.value)}))
const{isDragging:k,dragProgress:x,dragStyles:C}=function(e){let{isActive:l,isTemporary:a,width:o,touchless:n,position:r}=e
t.onMounted((()=>{window.addEventListener("touchstart",y,{passive:!0}),window.addEventListener("touchmove",b,{passive:!1}),window.addEventListener("touchend",V,{passive:!0})})),t.onBeforeUnmount((()=>{window.removeEventListener("touchstart",y),window.removeEventListener("touchmove",b),window.removeEventListener("touchend",V)}))
const i=t.computed((()=>"bottom"!==r.value)),{addMovement:s,endTouch:u,getVelocity:c}=gs()
let d=!1
const v=t.ref(!1),p=t.ref(0),f=t.ref(0)
let m
function g(e,t){return("left"===r.value?e:"right"===r.value?document.documentElement.clientWidth-e:"bottom"===r.value?document.documentElement.clientHeight-e:hs())-(t?o.value:0)}function h(e){let t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1]
const l="left"===r.value?(e-f.value)/o.value:"right"===r.value?(document.documentElement.clientWidth-e-f.value)/o.value:"bottom"===r.value?(document.documentElement.clientHeight-e-f.value)/o.value:hs()
return t?Math.max(0,Math.min(1,l)):l}function y(e){if(n.value)return
const t=e.changedTouches[0].clientX,c=e.changedTouches[0].clientY,v="left"===r.value?t<25:"right"===r.value?t>document.documentElement.clientWidth-25:"bottom"===r.value?c>document.documentElement.clientHeight-25:hs(),y=l.value&&("left"===r.value?t<o.value:"right"===r.value?t>document.documentElement.clientWidth-o.value:"bottom"===r.value?c>document.documentElement.clientHeight-o.value:hs());(v||y||l.value&&a.value)&&(d=!0,m=[t,c],f.value=g(i.value?t:c,l.value),p.value=h(i.value?t:c),u(e),s(e))}function b(e){const t=e.changedTouches[0].clientX,l=e.changedTouches[0].clientY
if(d){if(!e.cancelable)return void(d=!1)
const a=Math.abs(t-m[0]),o=Math.abs(l-m[1]);(i.value?a>o&&a>3:o>a&&o>3)?(v.value=!0,d=!1):(i.value?o:a)>3&&(d=!1)}if(!v.value)return
e.preventDefault(),s(e)
const a=h(i.value?t:l,!1)
p.value=Math.max(0,Math.min(1,a)),a>1?f.value=g(i.value?t:l,!0):a<0&&(f.value=g(i.value?t:l,!1))}function V(e){if(d=!1,!v.value)return
s(e),v.value=!1
const t=c(e.changedTouches[0].identifier),a=Math.abs(t.x),o=Math.abs(t.y),n=i.value?a>o&&a>400:o>a&&o>3
l.value=n?t.direction===({left:"right",right:"left",bottom:"up"}[r.value]||hs()):p.value>.5}const S=t.computed((()=>v.value?{transform:"left"===r.value?`translateX(calc(-100% + ${p.value*o.value}px))`:"right"===r.value?`translateX(calc(100% - ${p.value*o.value}px))`:"bottom"===r.value?`translateY(calc(100% - ${p.value*o.value}px))`:hs(),transition:"none"}:void 0))
return{isDragging:v,dragProgress:p,dragStyles:S}}({isActive:f,isTemporary:S,width:b,touchless:t.toRef(e,"touchless"),position:V}),N=t.computed((()=>{const t=S.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):b.value
return k.value?t*x.value:t})),{layoutItemStyles:_,layoutRect:B,layoutItemScrimStyles:I}=ot({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:V,layoutSize:N,elementSize:b,active:t.computed((()=>f.value||k.value)),disableTransitions:t.computed((()=>k.value)),absolute:t.computed((()=>e.absolute||w.value&&"string"!=typeof $.value))}),{isStuck:$,stickyStyles:A}=function(e){let{rootEl:l,isSticky:a,layoutItemStyles:o}=e
const n=t.ref(!1),r=t.ref(0),i=t.computed((()=>{const e="boolean"==typeof n.value?"top":n.value
return[a.value?{top:"auto",bottom:"auto",height:void 0}:void 0,n.value?{[e]:g(r.value)}:{top:o.value.top}]}))
t.onMounted((()=>{t.watch(a,(e=>{e?window.addEventListener("scroll",u,{passive:!0}):window.removeEventListener("scroll",u)}),{immediate:!0})})),t.onBeforeUnmount((()=>{document.removeEventListener("scroll",u)}))
let s=0
function u(){const e=s>window.scrollY?"up":"down",t=l.value.getBoundingClientRect(),a=parseFloat(o.value.top??0),i=window.scrollY-Math.max(0,r.value-a),u=t.height+Math.max(r.value,a)-window.scrollY-window.innerHeight
t.height<window.innerHeight-a?(n.value="top",r.value=a):"up"===e&&"bottom"===n.value||"down"===e&&"top"===n.value?(r.value=window.scrollY+t.top,n.value=!0):"down"===e&&u<=0?(r.value=0,n.value="bottom"):"up"===e&&i<=0&&(r.value=t.top+i,n.value="top"),s=window.scrollY}return{isStuck:n,stickyStyles:i}}({rootEl:h,isSticky:w,layoutItemStyles:_}),E=kl(t.computed((()=>"string"==typeof e.scrim?e.scrim:null))),R=t.computed((()=>({...k.value?{opacity:.2*x.value,transition:"none"}:void 0,...B.value?{left:g(B.value.left),right:g(B.value.right),top:g(B.value.top),bottom:g(B.value.bottom)}:void 0,...I.value})))
return ze({VList:{bgColor:"transparent"}}),Je((()=>{var l,n,d,p
const g=o.image||e.image
return t.createVNode(t.Fragment,null,[t.createVNode(e.tag,t.mergeProps({ref:h,onMouseenter:()=>y.value=!0,onMouseleave:()=>y.value=!1,class:["v-navigation-drawer",`v-navigation-drawer--${V.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":y.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":S.value,"v-navigation-drawer--active":f.value,"v-navigation-drawer--sticky":w.value},r.value,s.value,i.value,c.value,v.value],style:[u.value,_.value,C.value,m.value,A.value]},a),{default:()=>[g&&t.createVNode("div",{key:"image",class:"v-navigation-drawer__img"},[o.image?null==(l=o.image)?void 0:l.call(o,{image:e.image}):t.createVNode("img",{src:e.image,alt:""},null)]),o.prepend&&t.createVNode("div",{class:"v-navigation-drawer__prepend"},[null==(n=o.prepend)?void 0:n.call(o)]),t.createVNode("div",{class:"v-navigation-drawer__content"},[null==(d=o.default)?void 0:d.call(o)]),o.append&&t.createVNode("div",{class:"v-navigation-drawer__append"},[null==(p=o.append)?void 0:p.call(o)])]}),t.createVNode(t.Transition,{name:"fade-transition"},{default:()=>[S.value&&(k.value||f.value)&&!!e.scrim&&t.createVNode("div",{class:["v-navigation-drawer__scrim",E.backgroundColorClasses.value],style:[R.value,E.backgroundColorStyles.value],onClick:()=>f.value=!1},null)]})])})),{isStuck:$}}}),Vs=We({name:"VNoSsr",setup(e,t){let{slots:l}=t
const a=On()
return()=>{var e
return a.value&&(null==(e=l.default)?void 0:e.call(l))}}})
const Ss=We({name:"VPagination",props:{activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:e=>e.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:e=>e%1==0},totalVisible:[Number,String],firstIcon:{type:Ul,default:"$first"},prevIcon:{type:Ul,default:"$prev"},nextIcon:{type:Ul,default:"$next"},lastIcon:{type:Ul,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...ml(),...Il(),...hl(),...bl(),...ta(),...pl({tag:"nav"}),...mt(),...Rl({variant:"text"})},emits:{"update:modelValue":e=>!0,first:e=>!0,prev:e=>!0,next:e=>!0,last:e=>!0},setup(e,l){let{slots:a,emit:o}=l
const n=wt(e,"modelValue"),{t:i,n:s}=Rt(),{isRtl:u}=Lt(),{themeClasses:c}=yt(e),d=t.ref(-1)
ze(void 0,{scoped:!0})
const{resizeRef:v}=r((t=>{if(!t.length)return
const{target:l,contentRect:a}=t[0],o=l.querySelector(".v-pagination__list > *")
if(!o)return
const n=a.width,r=o.offsetWidth+2*parseFloat(getComputedStyle(o).marginRight),i=e.showFirstLastPage?5:3
d.value=Math.max(0,Math.floor(+((n-r*i)/r).toFixed(2)))})),p=t.computed((()=>parseInt(e.length,10))),f=t.computed((()=>parseInt(e.start,10))),g=t.computed((()=>e.totalVisible?parseInt(e.totalVisible,10):d.value>=0?d.value:p.value)),h=t.computed((()=>{if(p.value<=0||isNaN(p.value)||p.value>Number.MAX_SAFE_INTEGER)return[]
if(g.value<=1)return[n.value]
if(p.value<=g.value)return m(p.value,f.value)
const t=g.value%2==0,l=t?g.value/2:Math.floor(g.value/2),a=t?l:l+1,o=p.value-l
if(a-n.value>=0)return[...m(Math.max(1,g.value-1),f.value),e.ellipsis,p.value]
if(n.value-o>=(t?1:0)){const t=g.value-1,l=p.value-t+f.value
return[f.value,e.ellipsis,...m(t,l)]}{const t=Math.max(1,g.value-3),l=1===t?n.value:n.value-Math.ceil(t/2)+f.value
return[f.value,e.ellipsis,...m(t,l),e.ellipsis,p.value]}}))
function y(e,t,l){e.preventDefault(),n.value=t,l&&o(l,t)}const{refs:V,updateRef:S}=function(){const e=t.ref([])
return t.onBeforeUpdate((()=>e.value=[])),{refs:e,updateRef:function(t,l){e.value[l]=t}}}()
ze({VPaginationBtn:{color:t.toRef(e,"color"),border:t.toRef(e,"border"),density:t.toRef(e,"density"),size:t.toRef(e,"size"),variant:t.toRef(e,"variant"),rounded:t.toRef(e,"rounded"),elevation:t.toRef(e,"elevation")}})
const w=t.computed((()=>h.value.map(((t,l)=>{const a=e=>S(e,l)
if("string"==typeof t)return{isActive:!1,key:`ellipsis-${l}`,page:t,props:{ref:a,ellipsis:!0,icon:!0,disabled:!0}}
{const o=t===n.value
return{isActive:o,key:t,page:s(t),props:{ref:a,ellipsis:!1,icon:!0,disabled:!!e.disabled||e.length<2,color:o?e.activeColor:e.color,ariaCurrent:o,ariaLabel:i(o?e.currentPageAriaLabel:e.pageAriaLabel,l+1),onClick:e=>y(e,t)}}}})))),k=t.computed((()=>{const t=!!e.disabled||n.value<=f.value,l=!!e.disabled||n.value>=f.value+p.value-1
return{first:e.showFirstLastPage?{icon:u.value?e.lastIcon:e.firstIcon,onClick:e=>y(e,f.value,"first"),disabled:t,ariaLabel:i(e.firstAriaLabel),ariaDisabled:t}:void 0,prev:{icon:u.value?e.nextIcon:e.prevIcon,onClick:e=>y(e,n.value-1,"prev"),disabled:t,ariaLabel:i(e.previousAriaLabel),ariaDisabled:t},next:{icon:u.value?e.prevIcon:e.nextIcon,onClick:e=>y(e,n.value+1,"next"),disabled:l,ariaLabel:i(e.nextAriaLabel),ariaDisabled:l},last:e.showFirstLastPage?{icon:u.value?e.firstIcon:e.lastIcon,onClick:e=>y(e,f.value+p.value-1,"last"),disabled:l,ariaLabel:i(e.lastAriaLabel),ariaDisabled:l}:void 0}}))
function x(){var e
const t=n.value-f.value
null==(e=V.value[t])||e.$el.focus()}function C(l){l.key===b.left&&!e.disabled&&n.value>e.start?(n.value=n.value-1,t.nextTick(x)):l.key===b.right&&!e.disabled&&n.value<f.value+p.value-1&&(n.value=n.value+1,t.nextTick(x))}return Je((()=>t.createVNode(e.tag,{ref:v,class:["v-pagination",c.value],role:"navigation","aria-label":i(e.ariaLabel),onKeydown:C,"data-test":"v-pagination-root"},{default:()=>[t.createVNode("ul",{class:"v-pagination__list"},[e.showFirstLastPage&&t.createVNode("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[a.first?a.first(k.value.first):t.createVNode(Ma,t.mergeProps({_as:"VPaginationBtn"},k.value.first),null)]),t.createVNode("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[a.prev?a.prev(k.value.prev):t.createVNode(Ma,t.mergeProps({_as:"VPaginationBtn"},k.value.prev),null)]),w.value.map(((e,l)=>t.createVNode("li",{key:e.key,class:["v-pagination__item",{"v-pagination__item--is-active":e.isActive}],"data-test":"v-pagination-item"},[a.item?a.item(e):t.createVNode(Ma,t.mergeProps({_as:"VPaginationBtn"},e.props),{default:()=>[e.page]})]))),t.createVNode("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[a.next?a.next(k.value.next):t.createVNode(Ma,t.mergeProps({_as:"VPaginationBtn"},k.value.next),null)]),e.showFirstLastPage&&t.createVNode("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[a.last?a.last(k.value.last):t.createVNode(Ma,t.mergeProps({_as:"VPaginationBtn"},k.value.last),null)])])]}))),{}}})
const ws=We({name:"VParallax",props:{scale:{type:[Number,String],default:.5}},setup(e,l){let{slots:a}=l
const{intersectionRef:o,isIntersecting:n}=na(),{resizeRef:i,contentRect:s}=r(),{height:u}=Pn(),c=t.ref()
let d
t.watchEffect((()=>{var e
o.value=i.value=null==(e=c.value)?void 0:e.$el})),t.watch(n,(e=>{e?(d=qe(o.value),d=d===document.scrollingElement?document:d,d.addEventListener("scroll",f,{passive:!0}),f()):d.removeEventListener("scroll",f)})),t.onBeforeUnmount((()=>{var e
null==(e=d)||e.removeEventListener("scroll",f)})),t.watch(u,f),t.watch((()=>{var e
return null==(e=s.value)?void 0:e.height}),f)
const v=t.computed((()=>1-C(+e.scale)))
let p=-1
function f(){n.value&&(cancelAnimationFrame(p),p=requestAnimationFrame((()=>{var e
const t=(null==(e=c.value)?void 0:e.$el).querySelector(".v-img__img")
if(!t)return
const l=d.clientHeight??document.documentElement.clientHeight,a=d.scrollTop??window.scrollY,n=o.value.offsetTop,r=s.value.height,i=(u=(a-(n+(r-l)/2))*v.value,Math.floor(Math.abs(u))*Math.sign(u))
var u
const p=Math.max(1,(v.value*(l-r)+r)/r)
t.style.setProperty("transform",`translateY(${i}px) scale(${p})`)})))}return Je((()=>t.createVNode(vl,{class:["v-parallax",{"v-parallax--active":n.value}],ref:c,cover:!0,onLoadstart:f,onLoad:f},a))),{}}}),ks=We({name:"VRadio",props:{...So({falseIcon:"$radioOff",trueIcon:"$radioOn"})},setup(e,l){let{slots:a}=l
return Je((()=>t.createVNode(wo,t.mergeProps(e,{class:"v-radio",type:"radio"}),a))),{}}}),xs=We({name:"VRadioGroup",inheritAttrs:!1,props:{height:{type:[Number,String],default:"auto"},...io(),...w(bo(),["multiple"]),trueIcon:{type:Ul,default:"$radioOn"},falseIcon:{type:Ul,default:"$radioOff"},type:{type:String,default:"radio"}},emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:a,slots:o}=l
const n=Pe(),r=t.computed((()=>e.id||`radio-group-${n}`)),i=wt(e,"modelValue")
return Je((()=>{const[l,n]=k(a),[s,u]=uo(e),[c,d]=ko({...e,multiple:!1}),v=o.label?o.label({label:e.label,props:{for:r.value}}):e.label
return t.createVNode(so,t.mergeProps({class:"v-radio-group"},l,s,{modelValue:i.value,"onUpdate:modelValue":e=>i.value=e,id:r.value}),{...o,default:l=>{let{id:a,isDisabled:r,isReadonly:s}=l
return t.createVNode(t.Fragment,null,[v&&t.createVNode(Xa,{for:a.value},{default:()=>[v]}),t.createVNode(Vo,t.mergeProps(c,{id:a.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:r.value,readonly:s.value},n,{modelValue:i.value,"onUpdate:modelValue":e=>i.value=e}),o)])}})})),{}}}),Cs=We({name:"VRangeSlider",props:{...qa(),...io(),...Hr(),strict:Boolean,modelValue:{type:Array,default:()=>[0,0]}},emits:{"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=t.ref(),n=t.ref(),r=t.ref()
const{activeThumbRef:i,hasLabels:s,max:u,min:c,mousePressed:d,onSliderMousedown:v,onSliderTouchstart:p,position:f,roundValue:m,trackContainerRef:g}=Wr({props:e,handleSliderMouseUp:e=>{var t
h.value=i.value===(null==(t=o.value)?void 0:t.$el)?[e,h.value[1]]:[h.value[0],e]},handleMouseMove:t=>{var l
const[a,r]=h.value
var s,u,d
e.strict||a!==r||a===c.value||(i.value=t>a?null==(s=n.value)?void 0:s.$el:null==(u=o.value)?void 0:u.$el,null==(d=i.value)||d.focus())
i.value===(null==(l=o.value)?void 0:l.$el)?h.value=[Math.min(t,r),r]:h.value=[a,Math.max(a,t)]},getActiveThumb:function(t){if(!o.value||!n.value)return
const l=jr(t,o.value.$el,e.direction),a=jr(t,n.value.$el,e.direction),r=Math.abs(l),i=Math.abs(a)
return r<i||r===i&&l<0?o.value.$el:n.value.$el}}),h=wt(e,"modelValue",void 0,(e=>e&&e.length?e.map((e=>m(e))):[0,0])),{isFocused:y,focus:b,blur:V}=Ka(e),S=t.computed((()=>f(h.value[0]))),w=t.computed((()=>f(h.value[1])))
return Je((()=>{const[l,f]=uo(e),m=!!(e.label||a.label||a.prepend)
return t.createVNode(so,t.mergeProps({class:["v-slider","v-range-slider",{"v-slider--has-labels":!!a["tick-label"]||s.value,"v-slider--focused":y.value,"v-slider--pressed":d.value,"v-slider--disabled":e.disabled}],ref:r},l,{focused:y.value}),{...a,prepend:m?l=>{var o,n
return t.createVNode(t.Fragment,null,[(null==(o=a.label)?void 0:o.call(a,l))??e.label?t.createVNode(Xa,{class:"v-slider__label",text:e.label},null):void 0,null==(n=a.prepend)?void 0:n.call(a,l)])}:void 0,default:l=>{var r,s
let{id:d}=l
return t.createVNode("div",{class:"v-slider__container",onMousedown:v,onTouchstartPassive:p},[t.createVNode("input",{id:`${d.value}_start`,name:e.name||d.value,disabled:e.disabled,readonly:e.readonly,tabindex:"-1",value:h.value[0]},null),t.createVNode("input",{id:`${d.value}_stop`,name:e.name||d.value,disabled:e.disabled,readonly:e.readonly,tabindex:"-1",value:h.value[1]},null),t.createVNode(Yr,{ref:g,start:S.value,stop:w.value},{"tick-label":a["tick-label"]}),t.createVNode(Ur,{ref:o,focused:y&&i.value===(null==(r=o.value)?void 0:r.$el),modelValue:h.value[0],"onUpdate:modelValue":e=>h.value=[e,h.value[1]],onFocus:e=>{var t,l,a,r;(b(),i.value=null==(t=o.value)?void 0:t.$el,h.value[0]===h.value[1]&&h.value[1]===c.value&&e.relatedTarget!==(null==(l=n.value)?void 0:l.$el))&&(null==(a=o.value)||a.$el.blur(),null==(r=n.value)||r.$el.focus())},onBlur:()=>{V(),i.value=void 0},min:c.value,max:h.value[1],position:S.value},{"thumb-label":a["thumb-label"]}),t.createVNode(Ur,{ref:n,focused:y&&i.value===(null==(s=n.value)?void 0:s.$el),modelValue:h.value[1],"onUpdate:modelValue":e=>h.value=[h.value[0],e],onFocus:e=>{var t,l,a,r;(b(),i.value=null==(t=n.value)?void 0:t.$el,h.value[0]===h.value[1]&&h.value[0]===u.value&&e.relatedTarget!==(null==(l=o.value)?void 0:l.$el))&&(null==(a=n.value)||a.$el.blur(),null==(r=o.value)||r.$el.focus())},onBlur:()=>{V(),i.value=void 0},min:h.value[0],max:u.value,position:w.value},{"thumb-label":a["thumb-label"]})])}})})),{}}}),Ns=Ue()({name:"VRating",props:{name:String,itemAriaLabel:{type:String,default:"$vuetify.rating.ariaLabel.item"},activeColor:String,color:String,clearable:Boolean,disabled:Boolean,emptyIcon:{type:Ul,default:"$ratingEmpty"},fullIcon:{type:Ul,default:"$ratingFull"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,modelValue:{type:[Number,String],default:0},itemLabels:Array,itemLabelPosition:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},ripple:Boolean,...Il(),...ta(),...pl(),...mt()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const{t:o}=Rt(),{themeClasses:n}=yt(e),r=wt(e,"modelValue"),i=t.computed((()=>C(parseFloat(r.value),0,+e.length))),s=t.computed((()=>m(Number(e.length),1))),u=t.computed((()=>s.value.flatMap((t=>e.halfIncrements?[t-.5,t]:[t])))),c=t.ref(-1),d=t.ref(-1),v=t.ref()
let p=!1
const f=t.computed((()=>u.value.map((t=>{const l=e.hover&&c.value>-1,a=i.value>=t,o=c.value>=t,n=(l?o:a)?e.fullIcon:e.emptyIcon,r=e.activeColor??e.color
return{isFilled:a,isHovered:o,icon:n,color:a||o?r:e.color}})))),g=t.computed((()=>[0,...u.value].map((t=>({onMouseenter:e.hover?function(){c.value=t}:void 0,onMouseleave:e.hover?function(){c.value=-1}:void 0,onFocus:function(){var e
0===t&&0===i.value?null==(e=v.value)||e.focus():d.value=t},onBlur:function(){p||(d.value=-1)},onClick:function(){e.disabled||e.readonly||(r.value=i.value===t&&e.clearable?0:t)}})))))
function h(){p=!0}function y(){p=!1}const b=t.computed((()=>e.name??`v-rating-${Pe()}`))
function V(l){var n,r
let{value:s,index:u,showStar:c=!0}=l
const{onMouseenter:d,onMouseleave:p,onFocus:m,onBlur:V,onClick:S}=g.value[u+1],w=`${b.value}-${String(s).replace(".","-")}`,k={color:null==(n=f.value[u])?void 0:n.color,density:e.density,disabled:e.disabled,icon:null==(r=f.value[u])?void 0:r.icon,ripple:e.ripple,size:e.size,tag:"span",variant:"plain"}
return t.createVNode(t.Fragment,null,[t.createVNode("label",{for:w,class:{"v-rating__item--half":e.halfIncrements&&s%1>0,"v-rating__item--full":e.halfIncrements&&s%1==0},onMousedown:h,onMouseup:y,onMouseenter:d,onMouseleave:p},[t.createVNode("span",{class:"v-rating__hidden"},[o(e.itemAriaLabel,s,e.length)]),c?a.item?a.item({...f.value[u],props:k,value:s,index:u}):t.createVNode(Ma,k,null):void 0]),t.createVNode("input",{class:"v-rating__hidden",name:b.value,id:w,type:"radio",value:s,checked:i.value===s,onClick:S,onFocus:m,onBlur:V,ref:0===u?v:void 0,readonly:e.readonly,disabled:e.disabled},null)])}function S(e){return a["item-label"]?a["item-label"](e):e.label?t.createVNode("span",null,[e.label]):t.createVNode("span",null,[t.createTextVNode(" ")])}return Je((()=>{var l
const o=!(null==(l=e.itemLabels)||!l.length)||a["item-label"]
return t.createVNode(e.tag,{class:["v-rating",{"v-rating--hover":e.hover,"v-rating--readonly":e.readonly},n.value]},{default:()=>[t.createVNode(V,{value:0,index:-1,showStar:!1},null),s.value.map(((l,a)=>{var n,r
return t.createVNode("div",{class:"v-rating__wrapper"},[o&&"top"===e.itemLabelPosition?S({value:l,index:a,label:null==(n=e.itemLabels)?void 0:n[a]}):void 0,t.createVNode("div",{class:["v-rating__item",{"v-rating__item--focused":Math.ceil(d.value)===l}]},[e.halfIncrements?t.createVNode(t.Fragment,null,[t.createVNode(V,{value:l-.5,index:2*a},null),t.createVNode(V,{value:l,index:2*a+1},null)]):t.createVNode(V,{value:l,index:a},null)]),o&&"bottom"===e.itemLabelPosition?S({value:l,index:a,label:null==(r=e.itemLabels)?void 0:r[a]}):void 0])}))]})})),{}}})
function _s(e){const t=Math.abs(e)
return Math.sign(e)*(t/((1/.501-2)*(1-t)+1))}function Bs(e){let{selectedElement:t,containerSize:l,contentSize:a,isRtl:o,currentScrollOffset:n,isHorizontal:r}=e
const i=r?t.clientWidth:t.clientHeight,s=r?t.offsetLeft:t.offsetTop,u=o&&r?a-s-i:s,c=l+n,d=i+u,v=.4*i
return u<=n?n=Math.max(u-v,0):c<=d&&(n=Math.min(n-(c-d-v),a-l)),n}const Is=Symbol.for("vuetify:v-slide-group"),$s=Ue()({name:"VSlideGroup",props:{centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Is},nextIcon:{type:Ul,default:"$next"},prevIcon:{type:Ul,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>"boolean"==typeof e||["always","desktop","mobile"].includes(e)},...pl(),...Pl({selectedClass:"v-slide-group-item--active"})},emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:o}=a
const{isRtl:n}=Lt(),{mobile:i}=Pn(),s=Ml(e,e.symbol),u=t.ref(!1),c=t.ref(0),d=t.ref(0),v=t.ref(0),p=t.computed((()=>"horizontal"===e.direction)),{resizeRef:f,contentRect:m}=r(),{resizeRef:g,contentRect:h}=r(),y=t.computed((()=>s.selected.value.length?s.items.value.findIndex((e=>e.id===s.selected.value[0])):-1)),b=t.computed((()=>s.selected.value.length?s.items.value.findIndex((e=>e.id===s.selected.value[s.selected.value.length-1])):-1))
if(l){let l=-1
t.watch((()=>[s.selected.value,m.value,h.value,p.value]),(()=>{cancelAnimationFrame(l),l=requestAnimationFrame((()=>{if(m.value&&h.value){const e=p.value?"width":"height"
d.value=m.value[e],v.value=h.value[e],u.value=d.value+1<v.value}if(y.value>=0&&g.value){const t=g.value.children[b.value]
0!==y.value&&u.value?e.centerActive?c.value=function(e){let{selectedElement:t,containerSize:l,contentSize:a,isRtl:o,isHorizontal:n}=e
const r=n?t.clientWidth:t.clientHeight,i=n?t.offsetLeft:t.offsetTop,s=o&&n?a-i-r/2-l/2:i+r/2-l/2
return Math.min(a-l,Math.max(0,s))}({selectedElement:t,containerSize:d.value,contentSize:v.value,isRtl:n.value,isHorizontal:p.value}):u.value&&(c.value=Bs({selectedElement:t,containerSize:d.value,contentSize:v.value,isRtl:n.value,currentScrollOffset:c.value,isHorizontal:p.value})):c.value=0}}))}))}const V=t.ref(!1)
let S=0,w=0
function k(e){const t=p.value?"clientX":"clientY",l=n.value&&p.value?-1:1
w=l*c.value,S=e.touches[0][t],V.value=!0}function x(e){if(!u.value)return
const t=p.value?"clientX":"clientY",l=n.value&&p.value?-1:1
c.value=l*(w+S-e.touches[0][t])}function N(e){const t=v.value-d.value
c.value<0||!u.value?c.value=0:c.value>=t&&(c.value=t),V.value=!1}function _(){f.value&&(f.value[p.value?"scrollLeft":"scrollTop"]=0)}const B=t.ref(!1)
function I(e){if(B.value=!0,u.value&&g.value)for(const t of e.composedPath())for(const e of g.value.children)if(e===t)return void(c.value=Bs({selectedElement:e,containerSize:d.value,contentSize:v.value,isRtl:n.value,currentScrollOffset:c.value,isHorizontal:p.value}))}function $(e){B.value=!1}function A(e){var t
B.value||e.relatedTarget&&null!=(t=g.value)&&t.contains(e.relatedTarget)||R()}function E(e){g.value&&(p.value?"ArrowRight"===e.key?R(n.value?"prev":"next"):"ArrowLeft"===e.key&&R(n.value?"next":"prev"):"ArrowDown"===e.key?R("next"):"ArrowUp"===e.key&&R("prev"),"Home"===e.key?R("first"):"End"===e.key&&R("last"))}function R(e){if(g.value)if(e){if("next"===e){var t
const e=null==(t=g.value.querySelector(":focus"))?void 0:t.nextElementSibling
e?e.focus():R("first")}else if("prev"===e){var l
const e=null==(l=g.value.querySelector(":focus"))?void 0:l.previousElementSibling
e?e.focus():R("last")}else if("first"===e){var a
null==(a=g.value.firstElementChild)||a.focus()}else if("last"===e){var o
null==(o=g.value.lastElementChild)||o.focus()}}else{var n
null==(n=[...g.value.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((e=>!e.hasAttribute("disabled")))[0])||n.focus()}}function T(e){const t=c.value+("prev"===e?-1:1)*d.value
c.value=C(t,0,v.value-d.value)}const L=t.computed((()=>{let e=c.value>v.value-d.value?-(v.value-d.value)+_s(v.value-d.value-c.value):-c.value
c.value<=0&&(e=_s(-c.value))
const t=n.value&&p.value?-1:1
return{transform:`translate${p.value?"X":"Y"}(${t*e}px)`,transition:V.value?"none":"",willChange:V.value?"transform":""}})),P=t.computed((()=>({next:s.next,prev:s.prev,select:s.select,isSelected:s.isSelected}))),O=t.computed((()=>{switch(e.showArrows){case"always":return!0
case"desktop":return!i.value
case!0:return u.value||Math.abs(c.value)>0
case"mobile":return i.value||u.value||Math.abs(c.value)>0
default:return!i.value&&(u.value||Math.abs(c.value)>0)}})),F=t.computed((()=>Math.abs(c.value)>0)),M=t.computed((()=>v.value>Math.abs(c.value)+d.value))
return Je((()=>{var l,a,r
return t.createVNode(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!p.value,"v-slide-group--has-affixes":O.value,"v-slide-group--is-overflowing":u.value}],tabindex:B.value||s.selected.value.length?-1:0,onFocus:A},{default:()=>[O.value&&t.createVNode("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!F.value}],onClick:()=>T("prev")},[(null==(l=o.prev)?void 0:l.call(o,P.value))??t.createVNode(Xt,null,{default:()=>[t.createVNode(oa,{icon:n.value?e.nextIcon:e.prevIcon},null)]})]),t.createVNode("div",{key:"container",ref:f,class:"v-slide-group__container",onScroll:_},[t.createVNode("div",{ref:g,class:"v-slide-group__content",style:L.value,onTouchstartPassive:k,onTouchmovePassive:x,onTouchendPassive:N,onFocusin:I,onFocusout:$,onKeydown:E},[null==(a=o.default)?void 0:a.call(o,P.value)])]),O.value&&t.createVNode("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!M.value}],onClick:()=>T("next")},[(null==(r=o.next)?void 0:r.call(o,P.value))??t.createVNode(Xt,null,{default:()=>[t.createVNode(oa,{icon:n.value?e.prevIcon:e.nextIcon},null)]})])]})})),{selected:s.selected,scrollTo:T,scrollOffset:c,focus:R}}}),As=Ue()({name:"VSlideGroupItem",props:{...Ol()},emits:{"group:selected":e=>!0},setup(e,t){let{slots:l}=t
const a=Fl(e,Is)
return()=>{var e
return null==(e=l.default)?void 0:e.call(l,{isSelected:a.isSelected.value,select:a.select,toggle:a.toggle,selectedClass:a.selectedClass.value})}}}),Es=Ue()({name:"VSnackbar",props:{multiLine:Boolean,timeout:{type:[Number,String],default:5e3},vertical:Boolean,...$a({location:"bottom"}),...Ra(),...bl(),...Rl(),...w(Gn({transition:"v-snackbar-transition"}),["persistent","noClickAnimation","scrim","scrollStrategy"])},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),{locationStyles:n}=Aa(e),{positionClasses:r}=Ta(e),{scopeId:i}=Fn(),{colorClasses:s,colorStyles:u,variantClasses:c}=Tl(e),{roundedClasses:d}=Vl(e),v=t.ref()
t.watch(o,f),t.watch((()=>e.timeout),f),t.onMounted((()=>{o.value&&f()}))
let p=-1
function f(){window.clearTimeout(p)
const t=Number(e.timeout)
o.value&&-1!==t&&(p=window.setTimeout((()=>{o.value=!1}),t))}function m(){window.clearTimeout(p)}return Je((()=>{const[l]=Kn(e)
return t.createVNode(qn,t.mergeProps({ref:v,class:["v-snackbar",{"v-snackbar--active":o.value,"v-snackbar--multi-line":e.multiLine&&!e.vertical,"v-snackbar--vertical":e.vertical},r.value]},l,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,contentProps:t.mergeProps({style:n.value},l.contentProps),persistent:!0,noClickAnimation:!0,scrim:!1,scrollStrategy:"none"},i),{default:()=>[t.createVNode("div",{class:["v-snackbar__wrapper",s.value,d.value,c.value],style:[u.value],onPointerenter:m,onPointerleave:f},[El(!1,"v-snackbar"),a.default&&t.createVNode("div",{class:"v-snackbar__content",role:"status","aria-live":"polite"},[a.default()]),a.actions&&t.createVNode(Ot,{defaults:{VBtn:{variant:"text",ripple:!1}}},{default:()=>[t.createVNode("div",{class:"v-snackbar__actions"},[a.actions()])]})])],activator:a.activator})})),po({},v)}}),Rs=We({name:"VSwitch",inheritAttrs:!1,props:{indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...io(),...So()},emits:{"update:focused":e=>!0,"update:modelValue":()=>!0,"update:indeterminate":e=>!0},setup(e,l){let{attrs:a,slots:o}=l
const n=wt(e,"indeterminate"),r=wt(e,"modelValue"),{loaderClasses:i}=_a(e),{isFocused:s,focus:u,blur:c}=Ka(e),d=t.computed((()=>"string"==typeof e.loading&&""!==e.loading?e.loading:e.color)),v=Pe(),p=t.computed((()=>e.id||`switch-${v}`))
function f(){n.value&&(n.value=!1)}return Je((()=>{const[l,v]=k(a),[m,g]=uo(e),[h,y]=ko(e),b=t.ref()
function V(){var e,t
null==(e=b.value)||null==(t=e.input)||t.click()}return t.createVNode(so,t.mergeProps({class:["v-switch",{"v-switch--inset":e.inset},{"v-switch--indeterminate":n.value},i.value]},l,m,{id:p.value,focused:s.value}),{...o,default:l=>{let{id:a,isDisabled:i,isReadonly:s,isValid:p}=l
return t.createVNode(wo,t.mergeProps({ref:b},h,{modelValue:r.value,"onUpdate:modelValue":[e=>r.value=e,f],id:a.value,type:"checkbox","aria-checked":n.value?"mixed":void 0,disabled:i.value,readonly:s.value,onFocus:u,onBlur:c},v),{...o,default:()=>t.createVNode("div",{class:"v-switch__track",onClick:V},null),input:l=>{let{textColorClasses:a,textColorStyles:n}=l
return t.createVNode("div",{class:["v-switch__thumb",a.value],style:n.value},[e.loading&&t.createVNode(Ba,{name:"v-switch",active:!0,color:!1===p.value?void 0:d.value},{default:e=>o.loader?o.loader(e):t.createVNode(ra,{active:e.isActive,color:e.color,indeterminate:!0,size:"16",width:"2"},null)})])}})}})})),{}}}),Ts=We({name:"VSystemBar",props:{color:String,height:[Number,String],window:Boolean,...hl(),...lt(),...bl(),...pl(),...mt()},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{backgroundColorClasses:n,backgroundColorStyles:r}=kl(t.toRef(e,"color")),{elevationClasses:i}=yl(e),{roundedClasses:s}=Vl(e),u=t.computed((()=>e.height??(e.window?32:24))),{layoutItemStyles:c}=ot({id:e.name,order:t.computed((()=>parseInt(e.order,10))),position:t.ref("top"),layoutSize:u,elementSize:u,active:t.computed((()=>!0)),absolute:t.toRef(e,"absolute")})
return Je((()=>t.createVNode(e.tag,{class:["v-system-bar",{"v-system-bar--window":e.window},o.value,n.value,i.value,s.value],style:[r.value,c.value]},a))),{}}}),Ls=Symbol.for("vuetify:v-tabs"),Ps=We({name:"VTab",props:{fixed:Boolean,icon:[Boolean,String,Function,Object],prependIcon:Ul,appendIcon:Ul,stacked:Boolean,title:String,ripple:{type:Boolean,default:!0},color:String,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...pl(),...Oa(),...Ol({selectedClass:"v-tab--selected"}),...mt()},setup(e,l){let{slots:a,attrs:o}=l
const{textColorClasses:n,textColorStyles:r}=wl(e,"sliderColor"),i=t.computed((()=>"horizontal"===e.direction)),s=t.ref(!1),u=t.ref(),c=t.ref()
function d(e){let{value:t}=e
if(s.value=t,t){var l,a
const e=null==(l=u.value)||null==(a=l.$el.parentElement)?void 0:a.querySelector(".v-tab--selected .v-tab__slider"),t=c.value
if(!e||!t)return
const o=getComputedStyle(e).color,n=e.getBoundingClientRect(),r=t.getBoundingClientRect(),s=i.value?"x":"y",d=i.value?"X":"Y",v=i.value?"right":"bottom",p=i.value?"width":"height",f=n[s]>r[s]?n[v]-r[v]:n[s]-r[s],m=Math.sign(f)>0?i.value?"right":"bottom":Math.sign(f)<0?i.value?"left":"top":"center",g=(Math.abs(f)+(Math.sign(f)<0?n[p]:r[p]))/Math.max(n[p],r[p]),h=1.5
Q(t,{backgroundColor:[o,""],transform:[`translate${d}(${f}px) scale${d}(${n[p]/r[p]})`,`translate${d}(${f/h}px) scale${d}(${(g-1)/h+1})`,""],transformOrigin:Array(3).fill(m)},{duration:225,easing:Ge})}}return Je((()=>{const[l]=S(e,["href","to","replace","icon","stacked","prependIcon","appendIcon","ripple","theme","disabled","selectedClass","value","color"])
return t.createVNode(Ma,t.mergeProps({_as:"VTab",symbol:Ls,ref:u,class:["v-tab"],tabindex:s.value?0:-1,role:"tab","aria-selected":String(s.value),active:!1,block:e.fixed,maxWidth:e.fixed?300:void 0,variant:"text",rounded:0},l,o,{"onGroup:selected":d}),{default:()=>[a.default?a.default():e.title,!e.hideSlider&&t.createVNode("div",{ref:c,class:["v-tab__slider",n.value],style:r.value},null)]})})),{}}})
const Os=We({name:"VTabs",props:{alignTabs:{type:String,default:"start"},color:String,direction:{type:String,default:"horizontal"},fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,modelValue:null,mandatory:{type:[Boolean,String],default:"force"},...Il(),...pl()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),n=t.computed((()=>{return(t=e.items)?t.map((e=>"string"==typeof e?{title:e,value:e}:e)):[]
var t})),{densityClasses:r}=$l(e),{backgroundColorClasses:i,backgroundColorStyles:s}=kl(t.toRef(e,"bgColor"))
return ze({VTab:{color:t.toRef(e,"color"),direction:t.toRef(e,"direction"),stacked:t.toRef(e,"stacked"),fixed:t.toRef(e,"fixedTabs"),sliderColor:t.toRef(e,"sliderColor"),hideSlider:t.toRef(e,"hideSlider")}}),Je((()=>t.createVNode($s,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},r.value,i.value],style:[{"--v-tabs-height":g(e.height)},s.value],role:"tablist",symbol:Ls,mandatory:e.mandatory,direction:e.direction},{default:()=>[a.default?a.default():n.value.map((e=>t.createVNode(Ps,t.mergeProps(e,{key:e.title}),null)))]}))),{}}}),Fs=We({name:"VTable",props:{fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...Il(),...pl(),...mt()},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{densityClasses:n}=$l(e)
return Je((()=>{var l,r
return t.createVNode(e.tag,{class:["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!a.top,"v-table--has-bottom":!!a.bottom,"v-table--hover":e.hover},o.value,n.value]},{default:()=>[null==(l=a.top)?void 0:l.call(a),a.default&&t.createVNode("div",{class:"v-table__wrapper",style:{height:g(e.height)}},[t.createVNode("table",null,[a.default()])]),null==(r=a.bottom)?void 0:r.call(a)]})})),{}}}),Ms=We({name:"VTextarea",directives:{Intersect:ul},inheritAttrs:!1,props:{autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,hint:String,persistentHint:Boolean,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,...io(),...Ja()},emits:{"click:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{attrs:a,emit:o,slots:n}=l
const r=wt(e,"modelValue"),{isFocused:i,focus:s,blur:u}=Ka(e),c=t.computed((()=>"function"==typeof e.counterValue?e.counterValue(r.value):(r.value||"").toString().length)),d=t.computed((()=>a.maxlength?a.maxlength:!e.counter||"number"!=typeof e.counter&&"string"!=typeof e.counter?void 0:e.counter))
function v(t,l){var a,o
e.autofocus&&t&&(null==(a=l[0].target)||null==(o=a.focus)||o.call(a))}const p=t.ref(),f=t.ref(),m=t.ref(""),h=t.ref(),y=t.computed((()=>i.value||e.persistentPlaceholder)),b=t.computed((()=>e.messages.length?e.messages:y.value||e.persistentHint?e.hint:""))
function V(){var e
h.value!==document.activeElement&&(null==(e=h.value)||e.focus())
i.value||s()}function S(e){V(),o("click:control",e)}function w(l){l.stopPropagation(),V(),t.nextTick((()=>{r.value="",D(e["onClick:clear"],l)}))}function x(e){r.value=e.target.value}const N=t.ref()
function _(){e.autoGrow&&t.nextTick((()=>{if(!N.value||!f.value)return
const t=getComputedStyle(N.value),l=getComputedStyle(f.value.$el),a=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),o=N.value.scrollHeight,n=parseFloat(t.lineHeight),r=Math.max(parseFloat(e.rows)*n+a,parseFloat(l.getPropertyValue("--v-input-control-height"))),i=parseFloat(e.maxRows)*n+a||1/0
m.value=g(C(o??0,r,i))}))}let B
return t.onMounted(_),t.watch(r,_),t.watch((()=>e.rows),_),t.watch((()=>e.maxRows),_),t.watch((()=>e.density),_),t.watch(N,(e=>{var t
e?(B=new ResizeObserver(_),B.observe(N.value)):null==(t=B)||t.disconnect()})),t.onBeforeUnmount((()=>{var e
null==(e=B)||e.disconnect()})),Je((()=>{const l=!!(n.counter||e.counter||e.counterValue),o=!(!l&&!n.details),[s,g]=k(a),[{modelValue:C,..._}]=uo(e),[B]=eo(e)
return t.createVNode(so,t.mergeProps({ref:p,modelValue:r.value,"onUpdate:modelValue":e=>r.value=e,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)}],"onClick:prepend":e["onClick:prepend"],"onClick:append":e["onClick:append"]},s,_,{focused:i.value,messages:b.value}),{...n,default:l=>{let{isDisabled:a,isDirty:o,isReadonly:s,isValid:c}=l
return t.createVNode(Qa,t.mergeProps({ref:f,style:{"--v-textarea-control-height":m.value},"onClick:control":S,"onClick:clear":w,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},B,{active:y.value||o.value,dirty:o.value||e.dirty,focused:i.value,error:!1===c.value}),{...n,default:l=>{let{props:{class:o,...n}}=l
return t.createVNode(t.Fragment,null,[e.prefix&&t.createVNode("span",{class:"v-text-field__prefix"},[e.prefix]),t.withDirectives(t.createVNode("textarea",t.mergeProps({ref:h,class:o,value:r.value,onInput:x,autofocus:e.autofocus,readonly:s.value,disabled:a.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:V,onBlur:u},n,g),null),[[t.resolveDirective("intersect"),{handler:v},null,{once:!0}]]),e.autoGrow&&t.withDirectives(t.createVNode("textarea",{class:[o,"v-textarea__sizer"],"onUpdate:modelValue":e=>r.value=e,ref:N,readonly:!0,"aria-hidden":"true"},null),[[t.vModelText,r.value]]),e.suffix&&t.createVNode("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:o?a=>{var o
return t.createVNode(t.Fragment,null,[null==(o=n.details)?void 0:o.call(n,a),l&&t.createVNode(t.Fragment,null,[t.createVNode("span",null,null),t.createVNode(co,{active:e.persistentCounter||i.value,value:c.value,max:d.value},n.counter)])])}:void 0})})),po({},p,f,h)}}),zs=We({name:"VThemeProvider",props:{withBackground:Boolean,...mt(),...pl()},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e)
return()=>{var l,n
return e.withBackground?t.createVNode(e.tag,{class:["v-theme-provider",o.value]},{default:()=>[null==(n=a.default)?void 0:n.call(a)]}):null==(l=a.default)?void 0:l.call(a)}}}),Ds=We({name:"VTimeline",props:{align:{type:String,default:"center",validator:e=>["center","start"].includes(e)},direction:{type:String,default:"vertical",validator:e=>["vertical","horizontal"].includes(e)},justify:{type:String,default:"auto",validator:e=>["auto","center"].includes(e)},side:{type:String,validator:e=>null==e||["start","end"].includes(e)},lineInset:{type:[String,Number],default:0},lineThickness:{type:[String,Number],default:2},lineColor:String,truncateLine:{type:String,validator:e=>["start","end","both"].includes(e)},...Il(),...pl(),...mt()},setup(e,l){let{slots:a}=l
const{themeClasses:o}=yt(e),{densityClasses:n}=$l(e)
ze({VTimelineDivider:{lineColor:t.toRef(e,"lineColor")},VTimelineItem:{density:t.toRef(e,"density"),lineInset:t.toRef(e,"lineInset")}})
const r=t.computed((()=>{const t=e.side?e.side:"default"!==e.density?"end":null
return t&&`v-timeline--side-${t}`})),i=t.computed((()=>{const t=["v-timeline--truncate-line-start","v-timeline--truncate-line-end"]
switch(e.truncateLine){case"both":return t
case"start":return t[0]
case"end":return t[1]
default:return null}}))
return Je((()=>t.createVNode(e.tag,{class:["v-timeline",`v-timeline--${e.direction}`,`v-timeline--align-${e.align}`,`v-timeline--justify-${e.justify}`,i.value,{"v-timeline--inset-line":!!e.lineInset},o.value,n.value,r.value],style:{"--v-timeline-line-thickness":g(e.lineThickness)}},a))),{}}}),js=We({name:"VTimelineDivider",props:{dotColor:String,fillDot:Boolean,hideDot:Boolean,icon:Ul,iconColor:String,lineColor:String,...bl(),...ta(),...hl()},setup(e,l){let{slots:a}=l
const{sizeClasses:o,sizeStyles:n}=la(e,"v-timeline-divider__dot"),{backgroundColorStyles:r,backgroundColorClasses:i}=kl(t.toRef(e,"dotColor")),{roundedClasses:s}=Vl(e,"v-timeline-divider__dot"),{elevationClasses:u}=yl(e),{backgroundColorClasses:c,backgroundColorStyles:d}=kl(t.toRef(e,"lineColor"))
return ze({VIcon:{color:t.toRef(e,"iconColor"),icon:t.toRef(e,"icon"),size:t.toRef(e,"size")}}),Je((()=>{var l
return t.createVNode("div",{class:["v-timeline-divider",{"v-timeline-divider--fill-dot":e.fillDot}]},[t.createVNode("div",{class:["v-timeline-divider__before",c.value],style:d.value},null),!e.hideDot&&t.createVNode("div",{key:"dot",class:["v-timeline-divider__dot",u.value,s.value,o.value],style:n.value},[t.createVNode("div",{class:["v-timeline-divider__inner-dot",i.value,s.value],style:r.value},[(null==(l=a.default)?void 0:l.call(a))??(e.icon?t.createVNode(oa,null,null):void 0)])]),t.createVNode("div",{class:["v-timeline-divider__after",c.value],style:d.value},null)])})),{}}}),Hs=We({name:"VTimelineItem",props:{density:String,dotColor:String,fillDot:Boolean,hideDot:Boolean,hideOpposite:{type:Boolean,default:void 0},icon:Ul,iconColor:String,lineInset:[Number,String],...bl(),...hl(),...ta(),...pl(),...nl()},setup(e,l){let{slots:a}=l
const{dimensionStyles:o}=rl(e),n=t.ref(0),r=t.ref()
return t.watch(r,(e=>{var t
e&&(n.value=(null==(t=e.$el.querySelector(".v-timeline-divider__dot"))?void 0:t.getBoundingClientRect().width)??0)}),{flush:"post"}),Je((()=>{var l,i
return t.createVNode("div",{class:["v-timeline-item",{"v-timeline-item--fill-dot":e.fillDot}],style:{"--v-timeline-dot-size":g(n.value),"--v-timeline-line-inset":e.lineInset?`calc(var(--v-timeline-dot-size) / 2 + ${g(e.lineInset)})`:g(0)}},[t.createVNode("div",{class:"v-timeline-item__body",style:o.value},[null==(l=a.default)?void 0:l.call(a)]),t.createVNode(js,{ref:r,hideDot:e.hideDot,icon:e.icon,iconColor:e.iconColor,size:e.size,elevation:e.elevation,dotColor:e.dotColor,fillDot:e.fillDot,rounded:e.rounded},{default:a.icon}),"compact"!==e.density&&t.createVNode("div",{class:"v-timeline-item__opposite"},[!e.hideOpposite&&(null==(i=a.opposite)?void 0:i.call(a))])])})),{}}}),Ws=Ue()({name:"VTooltip",props:{id:String,text:String,...w(Gn({closeOnBack:!1,location:"end",locationStrategy:"connected",minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:!1}),["absolute","persistent","eager"])},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l
const o=wt(e,"modelValue"),{scopeId:n}=Fn(),r=Pe(),i=t.computed((()=>e.id||`v-tooltip-${r}`)),s=t.ref(),u=t.computed((()=>e.location.split(" ").length>1?e.location:e.location+" center")),c=t.computed((()=>"auto"===e.origin||"overlap"===e.origin||e.origin.split(" ").length>1||e.location.split(" ").length>1?e.origin:e.origin+" center")),d=t.computed((()=>e.transition?e.transition:o.value?"scale-transition":"fade-transition"))
return Je((()=>{const[l]=Kn(e)
return t.createVNode(qn,t.mergeProps({ref:s,class:["v-tooltip"],id:i.value},l,{modelValue:o.value,"onUpdate:modelValue":e=>o.value=e,transition:d.value,absolute:!0,location:u.value,origin:c.value,persistent:!0,role:"tooltip",eager:!0,activatorProps:t.mergeProps({"aria-describedby":i.value},e.activatorProps),_disableGlobalStack:!0},n),{activator:a.activator,default:function(){for(var t,l=arguments.length,o=new Array(l),n=0;n<l;n++)o[n]=arguments[n]
return(null==(t=a.default)?void 0:t.call(a,...o))??e.text}})})),po({},s)}}),Us=We({name:"VValidation",props:{...no()},emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:l}=t
const a=ro(e,"validation")
return()=>{var e
return null==(e=l.default)?void 0:e.call(l,a)}}})
var Ys=Object.freeze({__proto__:null,VApp:Pt,VAppBar:_l,VAppBarNavIcon:za,VAppBarTitle:ja,VAlert:Ua,VAlertTitle:Ha,VAutocomplete:ar,VAvatar:Bo,VBadge:or,VBanner:ir,VBannerActions:nr,VBannerText:rr,VBottomNavigation:sr,VBreadcrumbs:dr,VBreadcrumbsItem:cr,VBreadcrumbsDivider:ur,VBtn:Ma,VBtnGroup:Ll,VBtnToggle:jl,VCard:hr,VCardActions:vr,VCardItem:mr,VCardSubtitle:pr,VCardText:gr,VCardTitle:fr,VCarousel:_r,VCarouselItem:Br,VCheckbox:No,VCheckboxBtn:Co,VChip:Ao,VChipGroup:$o,VCode:Ir,VColorPicker:yi,VCombobox:bi,VCounter:co,VDefaultsProvider:Ot,VDialog:Vi,VDivider:Eo,VExpansionPanels:ki,VExpansionPanel:_i,VExpansionPanelText:Ni,VExpansionPanelTitle:Ci,VField:Qa,VFieldLabel:Ga,VFileInput:Bi,VFooter:Ii,VForm:$i,VContainer:Ai,VCol:Mi,VRow:ls,VSpacer:as,VHover:os,VIcon:oa,VComponentIcon:Gl,VSvgIcon:ql,VLigatureIcon:Kl,VClassIcon:Zl,VImg:vl,VInput:so,VItemGroup:rs,VItem:is,VKbd:ss,VLabel:Xa,VLayout:us,VLayoutItem:cs,VLazy:ds,VList:rn,VListGroup:Go,VListImg:sn,VListItem:Zo,VListItemAction:un,VListItemMedia:cn,VListItemSubtitle:qo,VListItemTitle:Ko,VListSubheader:Jo,VLocaleProvider:vs,VMain:ps,VMenu:Zn,VMessages:to,VNavigationDrawer:bs,VNoSsr:Vs,VOverlay:qn,VPagination:Ss,VParallax:ws,VProgressCircular:ra,VProgressLinear:Ca,VRadio:ks,VRadioGroup:xs,VRangeSlider:Cs,VRating:Ns,VResponsive:il,VSelect:Qn,VSelectionControl:wo,VSelectionControlGroup:Vo,VSheet:hi,VSlideGroup:$s,VSlideGroupItem:As,VSlider:Xr,VSnackbar:Es,VSwitch:Rs,VSystemBar:Ts,VTabs:Os,VTab:Ps,VTable:Fs,VTextarea:Ms,VTextField:go,VThemeProvider:zs,VTimeline:Ds,VTimelineItem:Hs,VToolbar:Nl,VToolbarTitle:fl,VToolbarItems:Da,VTooltip:Ws,VValidation:Us,VWindow:xr,VWindowItem:Nr,VDialogTransition:Dt,VFabTransition:Wt,VDialogBottomTransition:Ut,VDialogTopTransition:Yt,VFadeTransition:Xt,VScaleTransition:Gt,VScrollXTransition:qt,VScrollXReverseTransition:Kt,VScrollYTransition:Zt,VScrollYReverseTransition:Jt,VSlideXTransition:Qt,VSlideXReverseTransition:el,VSlideYTransition:tl,VSlideYReverseTransition:ll,VExpandTransition:al,VExpandXTransition:ol})
function Xs(e,t){var l
null!=(l=e._mutate)&&l[t.instance.$.uid]&&(e._mutate[t.instance.$.uid].observer.disconnect(),delete e._mutate[t.instance.$.uid])}const Gs={mounted:function(e,t){const l=t.modifiers||{},a=t.value,{once:o,immediate:n,...r}=l,i=!Object.keys(r).length,{handler:s,options:u}="object"==typeof a?a:{handler:a,options:{attributes:(null==r?void 0:r.attr)??i,characterData:(null==r?void 0:r.char)??i,childList:(null==r?void 0:r.child)??i,subtree:(null==r?void 0:r.sub)??i}},c=new MutationObserver((function(){let l=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0
null==s||s(l,a),o&&Xs(e,t)}))
n&&(null==s||s([],c)),e._mutate=Object(e._mutate),e._mutate[t.instance.$.uid]={observer:c},c.observe(e,u)},unmounted:Xs}
const qs={mounted:function(e,t){var l,a
const o=t.value,n={passive:!(null!=(l=t.modifiers)&&l.active)}
window.addEventListener("resize",o,n),e._onResize=Object(e._onResize),e._onResize[t.instance.$.uid]={handler:o,options:n},null!=(a=t.modifiers)&&a.quiet||o()},unmounted:function(e,t){var l
if(null==(l=e._onResize)||!l[t.instance.$.uid])return
const{handler:a,options:o}=e._onResize[t.instance.$.uid]
window.removeEventListener("resize",a,o),delete e._onResize[t.instance.$.uid]}}
function Ks(e,t){const{self:l=!1}=t.modifiers??{},a=t.value,o="object"==typeof a&&a.options||{passive:!0},n="function"==typeof a||"handleEvent"in a?a:a.handler,r=l?e:t.arg?document.querySelector(t.arg):window
r&&(r.addEventListener("scroll",n,o),e._onScroll=Object(e._onScroll),e._onScroll[t.instance.$.uid]={handler:n,options:o,target:l?void 0:r})}function Zs(e,t){var l
if(null==(l=e._onScroll)||!l[t.instance.$.uid])return
const{handler:a,options:o,target:n=e}=e._onScroll[t.instance.$.uid]
n.removeEventListener("scroll",a,o),delete e._onScroll[t.instance.$.uid]}const Js={mounted:Ks,unmounted:Zs,updated:function(e,t){t.value!==t.oldValue&&(Zs(e,t),Ks(e,t))}}
var Qs=Object.freeze({__proto__:null,ClickOutside:Yn,Intersect:ul,Mutate:Gs,Resize:qs,Ripple:xa,Scroll:Js,Touch:Sr})
function eu(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const{blueprint:a,...o}=e,n=B(a,o),{aliases:r={},components:i={},directives:s={}}=n,u=Fe(n.defaults),c=Ln(n.display,n.ssr),d=ht(n.theme),v=Ql(n.icons),p=Et(n.locale),f=e=>{for(const t in s)e.directive(t,s[t])
for(const t in i)e.component(t,i[t])
for(const t in r)e.component(t,We({...r[t],name:t,aliasName:r[t].name}))
if(d.install(e),e.provide(Oe,u),e.provide(An,c),e.provide(ft,d),e.provide(Yl,v),e.provide(At,p),l&&n.ssr)if(e.$nuxt)e.$nuxt.hook("app:suspense:resolve",(()=>{c.update()}))
else{const{mount:l}=e
e.mount=function(){const a=l(...arguments)
return t.nextTick((()=>c.update())),e.mount=l,a}}Pe.reset(),e.mixin({computed:{$vuetify(){return t.reactive({defaults:tu.call(this,Oe),display:tu.call(this,An),theme:tu.call(this,ft),icons:tu.call(this,Yl),locale:tu.call(this,At)})}}})}
return{install:f,defaults:u,display:c,theme:d,icons:v,locale:p}}function tu(e){var t,l
const a=this.$,o=(null==(t=a.parent)?void 0:t.provides)??(null==(l=a.vnode.appContext)?void 0:l.provides)
if(o&&e in o)return o[e]}eu.version="3.0.5"
const lu=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
return eu({components:Ys,directives:Qs,...e})},au="3.0.5"
lu.version=au,e.components=Ys,e.createVuetify=lu,e.directives=Qs,e.useDisplay=Pn,e.useLayout=at,e.useLocale=Rt,e.useRtl=Lt,e.useTheme=bt,e.version=au,Object.defineProperty(e,"__esModule",{value:!0})}))
//# sourceMappingURL=vuetify.min.js.map
