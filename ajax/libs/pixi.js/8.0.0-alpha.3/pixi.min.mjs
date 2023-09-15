/*!
 * PixiJS - v8.0.0-alpha.3
 * Compiled Fri, 15 Sep 2023 12:28:54 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var zp=Object.defineProperty,Np=Object.defineProperties,Wp=Object.getOwnPropertyDescriptors,qo=Object.getOwnPropertySymbols,Hp=Object.prototype.hasOwnProperty,jp=Object.prototype.propertyIsEnumerable,Ko=(r,e,t)=>e in r?zp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Zo=(r,e)=>{for(var t in e||(e={}))Hp.call(e,t)&&Ko(r,t,e[t]);if(qo)for(var t of qo(e))jp.call(e,t)&&Ko(r,t,e[t]);return r},Vp=(r,e)=>Np(r,Wp(e)),x=(r=>(r.Renderer="renderer",r.Application="application",r.WebGLPipes="webgl-pipes",r.WebGLPipesAdaptor="webgl-pipes-adaptor",r.WebGLSystem="webgl-system",r.WebGPUPipes="webgpu-pipes",r.WebGPUPipesAdaptor="webgpu-pipes-adaptor",r.WebGPUSystem="webgpu-system",r.CanvasSystem="canvas-system",r.CanvasPipesAdaptor="canvas-pipes-adaptor",r.CanvasPipes="canvas-pipes",r.Asset="asset",r.LoadParser="load-parser",r.ResolveParser="resolve-parser",r.CacheParser="cache-parser",r.DetectionParser="detection-parser",r.MaskEffect="mask-effect",r))(x||{});const Cn=r=>{if(typeof r=="function"||typeof r=="object"&&r.extension){const e=typeof r.extension!="object"?{type:r.extension}:r.extension;r=Vp(Zo({},e),{ref:r})}if(typeof r=="object")r=Zo({},r);else throw new Error("Invalid extension type");return typeof r.type=="string"&&(r.type=[r.type]),r},Ft=(r,e)=>{var t;return(t=Cn(r).priority)!=null?t:e},Z={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...r){return r.map(Cn).forEach(e=>{e.type.forEach(t=>{var n,i;return(i=(n=this._removeHandlers)[t])==null?void 0:i.call(n,e)})}),this},add(...r){return r.map(Cn).forEach(e=>{e.type.forEach(t=>{const n=this._addHandlers,i=this._queue;n[t]?n[t](e):(i[t]=i[t]||[],i[t].push(e))})}),this},handle(r,e,t){const n=this._addHandlers,i=this._removeHandlers;n[r]=e,i[r]=t;const s=this._queue;return s[r]&&(s[r].forEach(o=>e(o)),delete s[r]),this},handleByMap(r,e){return this.handle(r,t=>{e[t.name]=t.ref},t=>{delete e[t.name]})},handleByNamedList(r,e,t=-1){return this.handle(r,n=>{e.findIndex(i=>i.name===n.name)>=0||(e.push({name:n.name,value:n.ref}),e.sort((i,s)=>Ft(s.value,t)-Ft(i.value,t)))},n=>{const i=e.findIndex(s=>s.name===n.name);i!==-1&&e.splice(i,1)})},handleByList(r,e,t=-1){return this.handle(r,n=>{e.includes(n.ref)||(e.push(n.ref),e.sort((i,s)=>Ft(s,t)-Ft(i,t)))},n=>{const i=e.indexOf(n.ref);i!==-1&&e.splice(i,1)})}};var Ve=(r=>(r[r.INTERACTION=50]="INTERACTION",r[r.HIGH=25]="HIGH",r[r.NORMAL=0]="NORMAL",r[r.LOW=-25]="LOW",r[r.UTILITY=-50]="UTILITY",r))(Ve||{});class Pr{constructor(e,t=null,n=0,i=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=e,this._context=t,this.priority=n,this._once=i}match(e,t=null){return this._fn===e&&this._context===t}emit(e){this._fn&&(this._context?this._fn.call(this._context,e):this._fn(e));const t=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),t}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const t=this.next;return this.next=e?null:t,this.previous=null,t}}const pe=class{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new Pr(null,null,1/0),this.deltaMS=1/pe.targetFPMS,this.elapsedMS=1/pe.targetFPMS,this._tick=r=>{this._requestId=null,this.started&&(this.update(r),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(r,e,t=Ve.NORMAL){return this._addListener(new Pr(r,e,t))}addOnce(r,e,t=Ve.NORMAL){return this._addListener(new Pr(r,e,t,!0))}_addListener(r){let e=this._head.next,t=this._head;if(!e)r.connect(t);else{for(;e;){if(r.priority>e.priority){r.connect(t);break}t=e,e=e.next}r.previous||r.connect(t)}return this._startIfPossible(),this}remove(r,e){let t=this._head.next;for(;t;)t.match(r,e)?t=t.destroy():t=t.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let r=0,e=this._head;for(;e=e.next;)r++;return r}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let r=this._head.next;for(;r;)r=r.destroy(!0);this._head.destroy(),this._head=null}}update(r=performance.now()){let e;if(r>this.lastTime){if(e=this.elapsedMS=r-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const i=r-this._lastFrame|0;if(i<this._minElapsedMS)return;this._lastFrame=r-i%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*pe.targetFPMS;const t=this._head;let n=t.next;for(;n;)n=n.emit(this);t.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=r}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(r){const e=Math.min(this.maxFPS,r),t=Math.min(Math.max(0,e)/1e3,pe.targetFPMS);this._maxElapsedMS=1/t}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(r){if(r===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,r);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!pe._shared){const r=pe._shared=new pe;r.autoStart=!0,r._protected=!0}return pe._shared}static get system(){if(!pe._system){const r=pe._system=new pe;r.autoStart=!0,r._protected=!0}return pe._system}};let Pe=pe;Pe.targetFPMS=.06;class Bn{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,Ve.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?Pe.shared:new Pe,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Bn.extension=x.Application;class Rn{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,n;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,n=globalThis.innerHeight;else{const{clientWidth:i,clientHeight:s}=this._resizeTo;t=i,n=s}this.renderer.resize(t,n),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Rn.extension=x.Application,Z.add(Rn),Z.add(Bn);var Be=(r=>(r[r.Low=0]="Low",r[r.Normal=1]="Normal",r[r.High=2]="High",r))(Be||{});const Ar=(r,e)=>{const t=e.split("?")[1];return t&&(r+=`?${t}`),r},Qo={createCanvas:(r,e)=>{const t=document.createElement("canvas");return t.width=r,t.height=e,t},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>{var r;return(r=document.baseURI)!=null?r:window.location.href},getFontFaceSet:()=>document.fonts,fetch:(r,e)=>fetch(r,e),parseXML:r=>new DOMParser().parseFromString(r,"text/xml")},I={ADAPTER:Qo,RETINA_PREFIX:/@([0-9\.]+)x/,FAIL_IF_MAJOR_PERFORMANCE_CAVEAT:!1,RESOLUTION:2};function we(r){if(typeof r!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`)}function Ut(r){return r.split("?")[0].split("#")[0]}function Yp(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Xp(r,e,t){return r.replace(new RegExp(Yp(e),"g"),t)}function qp(r,e){let t="",n=0,i=-1,s=0,o=-1;for(let a=0;a<=r.length;++a){if(a<r.length)o=r.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(i===a-1||s===1))if(i!==a-1&&s===2){if(t.length<2||n!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){const l=t.lastIndexOf("/");if(l!==t.length-1){l===-1?(t="",n=0):(t=t.slice(0,l),n=t.length-1-t.lastIndexOf("/")),i=a,s=0;continue}}else if(t.length===2||t.length===1){t="",n=0,i=a,s=0;continue}}e&&(t.length>0?t+="/..":t="..",n=2)}else t.length>0?t+=`/${r.slice(i+1,a)}`:t=r.slice(i+1,a),n=a-i-1;i=a,s=0}else o===46&&s!==-1?++s:s=-1}return t}const ue={toPosix(r){return Xp(r,"\\","/")},isUrl(r){return/^https?:/.test(this.toPosix(r))},isDataUrl(r){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(r)},isBlobUrl(r){return r.startsWith("blob:")},hasProtocol(r){return/^[^/:]+:/.test(this.toPosix(r))},getProtocol(r){we(r),r=this.toPosix(r);const e=/^file:\/\/\//.exec(r);if(e)return e[0];const t=/^[^/:]+:\/{0,2}/.exec(r);return t?t[0]:""},toAbsolute(r,e,t){if(we(r),this.isDataUrl(r)||this.isBlobUrl(r))return r;const n=Ut(this.toPosix(e!=null?e:I.ADAPTER.getBaseUrl())),i=Ut(this.toPosix(t!=null?t:this.rootname(n)));return r=this.toPosix(r),r.startsWith("/")?ue.join(i,r.slice(1)):this.isAbsolute(r)?r:this.join(n,r)},normalize(r){if(we(r),r.length===0)return".";if(this.isDataUrl(r)||this.isBlobUrl(r))return r;r=this.toPosix(r);let e="";const t=r.startsWith("/");this.hasProtocol(r)&&(e=this.rootname(r),r=r.slice(e.length));const n=r.endsWith("/");return r=qp(r,!1),r.length>0&&n&&(r+="/"),t?`/${r}`:e+r},isAbsolute(r){return we(r),r=this.toPosix(r),this.hasProtocol(r)?!0:r.startsWith("/")},join(...r){var e;if(r.length===0)return".";let t;for(let n=0;n<r.length;++n){const i=r[n];if(we(i),i.length>0)if(t===void 0)t=i;else{const s=(e=r[n-1])!=null?e:"";this.extname(s)?t+=`/../${i}`:t+=`/${i}`}}return t===void 0?".":this.normalize(t)},dirname(r){if(we(r),r.length===0)return".";r=this.toPosix(r);let e=r.charCodeAt(0);const t=e===47;let n=-1,i=!0;const s=this.getProtocol(r),o=r;r=r.slice(s.length);for(let a=r.length-1;a>=1;--a)if(e=r.charCodeAt(a),e===47){if(!i){n=a;break}}else i=!1;return n===-1?t?"/":this.isUrl(o)?s+r:s:t&&n===1?"//":s+r.slice(0,n)},rootname(r){we(r),r=this.toPosix(r);let e="";if(r.startsWith("/")?e="/":e=this.getProtocol(r),this.isUrl(r)){const t=r.indexOf("/",e.length);t!==-1?e=r.slice(0,t):e=r,e.endsWith("/")||(e+="/")}return e},basename(r,e){we(r),e&&we(e),r=Ut(this.toPosix(r));let t=0,n=-1,i=!0,s;if(e!==void 0&&e.length>0&&e.length<=r.length){if(e.length===r.length&&e===r)return"";let o=e.length-1,a=-1;for(s=r.length-1;s>=0;--s){const l=r.charCodeAt(s);if(l===47){if(!i){t=s+1;break}}else a===-1&&(i=!1,a=s+1),o>=0&&(l===e.charCodeAt(o)?--o===-1&&(n=s):(o=-1,n=a))}return t===n?n=a:n===-1&&(n=r.length),r.slice(t,n)}for(s=r.length-1;s>=0;--s)if(r.charCodeAt(s)===47){if(!i){t=s+1;break}}else n===-1&&(i=!1,n=s+1);return n===-1?"":r.slice(t,n)},extname(r){we(r),r=Ut(this.toPosix(r));let e=-1,t=0,n=-1,i=!0,s=0;for(let o=r.length-1;o>=0;--o){const a=r.charCodeAt(o);if(a===47){if(!i){t=o+1;break}continue}n===-1&&(i=!1,n=o+1),a===46?e===-1?e=o:s!==1&&(s=1):e!==-1&&(s=-1)}return e===-1||n===-1||s===0||s===1&&e===n-1&&e===t+1?"":r.slice(e,n)},parse(r){we(r);const e={root:"",dir:"",base:"",ext:"",name:""};if(r.length===0)return e;r=Ut(this.toPosix(r));let t=r.charCodeAt(0);const n=this.isAbsolute(r);let i;const s="";e.root=this.rootname(r),n||this.hasProtocol(r)?i=1:i=0;let o=-1,a=0,l=-1,u=!0,h=r.length-1,c=0;for(;h>=i;--h){if(t=r.charCodeAt(h),t===47){if(!u){a=h+1;break}continue}l===-1&&(u=!1,l=h+1),t===46?o===-1?o=h:c!==1&&(c=1):o!==-1&&(c=-1)}return o===-1||l===-1||c===0||c===1&&o===l-1&&o===a+1?l!==-1&&(a===0&&n?e.base=e.name=r.slice(1,l):e.base=e.name=r.slice(a,l)):(a===0&&n?(e.name=r.slice(1,o),e.base=r.slice(1,l)):(e.name=r.slice(a,o),e.base=r.slice(a,l)),e.ext=r.slice(o,l)),e.dir=this.dirname(r),s&&(e.dir=s+e.dir),e},sep:"/",delimiter:":"};class H{constructor(e=0,t=0){this.x=0,this.y=0,this.x=e,this.y=t}clone(){return new H(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,t=e){return this.x=e,this.y=t,this}static get shared(){return kn.x=0,kn.y=0,kn}}const kn=new H,Er=[new H,new H,new H,new H];class X{constructor(e=0,t=0,n=0,i=0){this.type="rectangle",this.x=Number(e),this.y=Number(t),this.width=Number(n),this.height=Number(i)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}static get EMPTY(){return new X(0,0,0,0)}clone(){return new X(this.x,this.y,this.width,this.height)}copyFromBounds(e){return this.x=e.minX,this.y=e.minY,this.width=e.maxX-e.minX,this.height=e.maxY-e.minY,this}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&t>=this.y&&t<this.y+this.height}intersects(e,t){if(!t){const P=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=P)return!1;const w=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>w}const n=this.left,i=this.right,s=this.top,o=this.bottom;if(i<=n||o<=s)return!1;const a=Er[0].set(e.left,e.top),l=Er[1].set(e.left,e.bottom),u=Er[2].set(e.right,e.top),h=Er[3].set(e.right,e.bottom);if(u.x<=a.x||l.y<=a.y)return!1;const c=Math.sign(t.a*t.d-t.b*t.c);if(c===0||(t.apply(a,a),t.apply(l,l),t.apply(u,u),t.apply(h,h),Math.max(a.x,l.x,u.x,h.x)<=n||Math.min(a.x,l.x,u.x,h.x)>=i||Math.max(a.y,l.y,u.y,h.y)<=s||Math.min(a.y,l.y,u.y,h.y)>=o))return!1;const p=c*(l.y-a.y),d=c*(a.x-l.x),f=p*n+d*s,g=p*i+d*s,m=p*n+d*o,y=p*i+d*o;if(Math.max(f,g,m,y)<=p*a.x+d*a.y||Math.min(f,g,m,y)>=p*h.x+d*h.y)return!1;const v=c*(a.y-u.y),b=c*(u.x-a.x),_=v*n+b*s,S=v*i+b*s,k=v*n+b*o,C=v*i+b*o;return!(Math.max(_,S,k,C)<=v*a.x+b*a.y||Math.min(_,S,k,C)>=v*h.x+b*h.y)}pad(e=0,t=e){return this.x-=e,this.y-=t,this.width+=e*2,this.height+=t*2,this}fit(e){const t=Math.max(this.x,e.x),n=Math.min(this.x+this.width,e.x+e.width),i=Math.max(this.y,e.y),s=Math.min(this.y+this.height,e.y+e.height);return this.x=t,this.width=Math.max(n-t,0),this.y=i,this.height=Math.max(s-i,0),this}ceil(e=1,t=.001){const n=Math.ceil((this.x+this.width-t)*e)/e,i=Math.ceil((this.y+this.height-t)*e)/e;return this.x=Math.floor((this.x+t)*e)/e,this.y=Math.floor((this.y+t)*e)/e,this.width=n-this.x,this.height=i-this.y,this}enlarge(e){const t=Math.min(this.x,e.x),n=Math.max(this.x+this.width,e.x+e.width),i=Math.min(this.y,e.y),s=Math.max(this.y+this.height,e.y+e.height);return this.x=t,this.width=n-t,this.y=i,this.height=s-i,this}getBounds(e){return e=e||new X,e.copyFrom(this),e}}var c_=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function d_(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Kp(r,e,t){return t={path:e,exports:{},require:function(n,i){return Zp(n,i==null?t.path:i)}},r(t,t.exports),t.exports}function p_(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function f_(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")&&Object.keys(r).length===1?r.default:r}function m_(r){if(r.__esModule)return r;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(r).forEach(function(t){var n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}),e}function Zp(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var oe=Kp(function(r){"use strict";var e=Object.prototype.hasOwnProperty,t="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(t=!1));function i(l,u,h){this.fn=l,this.context=u,this.once=h||!1}function s(l,u,h,c,p){if(typeof h!="function")throw new TypeError("The listener must be a function");var d=new i(h,c||l,p),f=t?t+u:u;return l._events[f]?l._events[f].fn?l._events[f]=[l._events[f],d]:l._events[f].push(d):(l._events[f]=d,l._eventsCount++),l}function o(l,u){--l._eventsCount===0?l._events=new n:delete l._events[u]}function a(){this._events=new n,this._eventsCount=0}a.prototype.eventNames=function(){var u=[],h,c;if(this._eventsCount===0)return u;for(c in h=this._events)e.call(h,c)&&u.push(t?c.slice(1):c);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(h)):u},a.prototype.listeners=function(u){var h=t?t+u:u,c=this._events[h];if(!c)return[];if(c.fn)return[c.fn];for(var p=0,d=c.length,f=new Array(d);p<d;p++)f[p]=c[p].fn;return f},a.prototype.listenerCount=function(u){var h=t?t+u:u,c=this._events[h];return c?c.fn?1:c.length:0},a.prototype.emit=function(u,h,c,p,d,f){var g=t?t+u:u;if(!this._events[g])return!1;var m=this._events[g],y=arguments.length,v,b;if(m.fn){switch(m.once&&this.removeListener(u,m.fn,void 0,!0),y){case 1:return m.fn.call(m.context),!0;case 2:return m.fn.call(m.context,h),!0;case 3:return m.fn.call(m.context,h,c),!0;case 4:return m.fn.call(m.context,h,c,p),!0;case 5:return m.fn.call(m.context,h,c,p,d),!0;case 6:return m.fn.call(m.context,h,c,p,d,f),!0}for(b=1,v=new Array(y-1);b<y;b++)v[b-1]=arguments[b];m.fn.apply(m.context,v)}else{var _=m.length,S;for(b=0;b<_;b++)switch(m[b].once&&this.removeListener(u,m[b].fn,void 0,!0),y){case 1:m[b].fn.call(m[b].context);break;case 2:m[b].fn.call(m[b].context,h);break;case 3:m[b].fn.call(m[b].context,h,c);break;case 4:m[b].fn.call(m[b].context,h,c,p);break;default:if(!v)for(S=1,v=new Array(y-1);S<y;S++)v[S-1]=arguments[S];m[b].fn.apply(m[b].context,v)}}return!0},a.prototype.on=function(u,h,c){return s(this,u,h,c,!1)},a.prototype.once=function(u,h,c){return s(this,u,h,c,!0)},a.prototype.removeListener=function(u,h,c,p){var d=t?t+u:u;if(!this._events[d])return this;if(!h)return o(this,d),this;var f=this._events[d];if(f.fn)f.fn===h&&(!p||f.once)&&(!c||f.context===c)&&o(this,d);else{for(var g=0,m=[],y=f.length;g<y;g++)(f[g].fn!==h||p&&!f[g].once||c&&f[g].context!==c)&&m.push(f[g]);m.length?this._events[d]=m.length===1?m[0]:m:o(this,d)}return this},a.prototype.removeAllListeners=function(u){var h;return u?(h=t?t+u:u,this._events[h]&&o(this,h)):(this._events=new n,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=t,a.EventEmitter=a,r.exports=a});const ye=(r,e,t=!1)=>(Array.isArray(r)||(r=[r]),e?r.map(n=>typeof n=="string"||t?e(n):n):r);class Qp{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){return this._cache.get(e)}set(e,t){const n=ye(e);let i;for(let a=0;a<this.parsers.length;a++){const l=this.parsers[a];if(l.test(t)){i=l.getCacheableAssets(n,t);break}}i||(i={},n.forEach(a=>{i[a]=t}));const s=Object.keys(i),o={cacheKeys:s,keys:n};n.forEach(a=>{this._cacheMap.set(a,o)}),s.forEach(a=>{this._cache.has(a)&&this._cache.get(a),this._cache.set(a,i[a])})}remove(e){if(!this._cacheMap.has(e))return;const t=this._cacheMap.get(e);t.cacheKeys.forEach(n=>{this._cache.delete(n)}),t.keys.forEach(n=>{this._cacheMap.delete(n)})}get parsers(){return this._parsers}}const ee=new Qp,Jo={},N="8.0.0";function U(r,e,t=3){if(Jo[e])return;let n=new Error().stack;typeof n=="undefined"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`):(n=n.split(`
`).splice(t).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${r}`),console.warn(n),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`),console.warn(n))),Jo[e]=!0}const On=()=>{},Fn=Object.create(null),ea=Object.create(null);function Mr(r,e){let t=ea[r];return t===void 0&&(Fn[e]===void 0&&(Fn[e]=1),ea[r]=t=Fn[e]++),t}var Jp=Object.defineProperty,ta=Object.getOwnPropertySymbols,ef=Object.prototype.hasOwnProperty,tf=Object.prototype.propertyIsEnumerable,ra=(r,e,t)=>e in r?Jp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,na=(r,e)=>{for(var t in e||(e={}))ef.call(e,t)&&ra(r,t,e[t]);if(ta)for(var t of ta(e))tf.call(e,t)&&ra(r,t,e[t]);return r};const ia=class extends oe{constructor(r={}){var e,t,n,i,s,o,a;super(),this.resourceType="textureSampler",this.touched=0,this._maxAnisotropy=1,r=na(na({},ia.defaultOptions),r),this.addressMode=r.addressMode,this.addressModeU=(e=r.addressModeU)!=null?e:this.addressModeU,this.addressModeV=(t=r.addressModeV)!=null?t:this.addressModeV,this.addressModeW=(n=r.addressModeW)!=null?n:this.addressModeW,this.scaleMode=r.scaleMode,this.magFilter=(i=r.magFilter)!=null?i:this.magFilter,this.minFilter=(s=r.minFilter)!=null?s:this.minFilter,this.mipmapFilter=(o=r.mipmapFilter)!=null?o:this.mipmapFilter,this.lodMinClamp=r.lodMinClamp,this.lodMaxClamp=r.lodMaxClamp,this.compare=r.compare,this.maxAnisotropy=(a=r.maxAnisotropy)!=null?a:1}set addressMode(r){this.addressModeU=r,this.addressModeV=r,this.addressModeW=r}get addressMode(){return this.addressModeU}set wrapMode(r){U("8","TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=r}get wrapMode(){return this.addressMode}set scaleMode(r){this.magFilter=r,this.minFilter=r,this.mipmapFilter=r}get scaleMode(){return this.magFilter}set maxAnisotropy(r){this._maxAnisotropy=Math.min(r,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get resourceId(){return this._resourceId||this._generateResourceId()}update(){this.emit("change",this),this._resourceId=null}_generateResourceId(){const r=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._resourceId=Mr(r,"sampler"),this._resourceId}destroy(){this.emit("destroy",this),this.removeAllListeners()}};let Ye=ia;Ye.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};var rf=Object.defineProperty,sa=Object.getOwnPropertySymbols,nf=Object.prototype.hasOwnProperty,sf=Object.prototype.propertyIsEnumerable,oa=(r,e,t)=>e in r?rf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,aa=(r,e)=>{for(var t in e||(e={}))nf.call(e,t)&&oa(r,t,e[t]);if(sa)for(var t of sa(e))sf.call(e,t)&&oa(r,t,e[t]);return r};let of=0,af=0;const la=class extends oe{constructor(r={}){var e,t,n,i,s;super(),this.uid=of++,this.resourceType="textureSource",this.resourceId=af++,this.type="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm-srgb",this.dimension="2d",this.antialias=!1,this.depthStencil=!0,this.touched=0,this._batchTick=-1,this._textureBindLocation=-1,r=aa(aa({},la.defaultOptions),r),this.resource=r.resource,this._resolution=r.resolution,r.width?this.pixelWidth=r.width*this._resolution:this.pixelWidth=(t=(e=r.resource)==null?void 0:e.width)!=null?t:1,r.height?this.pixelHeight=r.height*this._resolution:this.pixelHeight=(i=(n=r.resource)==null?void 0:n.height)!=null?i:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=r.format,this.dimension=r.dimensions,this.mipLevelCount=r.mipLevelCount,this.autoGenerateMipmaps=r.autoGenerateMipmaps,this.sampleCount=r.sampleCount,this.antialias=r.antialias;const o=(s=r.style)!=null?s:{};this.style=o instanceof Ye?o:new Ye(o),this.style.on("change",this.onStyleUpdate,this),this.styleSourceKey=(this.style.resourceId<<24)+this.uid,this.destroyed=!1}get source(){return this}update(){this.emit("update",this)}onStyleUpdate(){this.styleSourceKey=(this.style.resourceId<<24)+this.uid}destroy(){this.destroyed=!0,this.emit("destroy",this),this.style&&(this.style.destroy(),this.style=null),this.type=null,this.resource=null,this.removeAllListeners()}unload(){this.resourceId++,this.emit("change",this),this.emit("unload",this)}get resolution(){return this._resolution}set resolution(r){this._resolution!==r&&(this._resolution=r,this.width=this.pixelWidth/r,this.height=this.pixelHeight/r)}resize(r,e,t){t=t||this._resolution,r=r||this.width,e=e||this.height;const n=Math.round(r*t),i=Math.round(e*t);this.width=n/t,this.height=i/t,this._resolution=t,!(this.pixelWidth===n&&this.pixelHeight===i)&&(this.pixelWidth=n,this.pixelHeight=i,this.emit("resize",this),this.resourceId++,this.emit("change",this))}set wrapMode(r){U(N,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this.style.wrapMode=r}get wrapMode(){return U(N,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this.style.wrapMode}set scaleMode(r){U(N,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this.style.scaleMode=r}get scaleMode(){return U(N,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this.style.scaleMode}};let ae=la;ae.defaultOptions={resolution:1,format:"bgra8unorm",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,style:{}};const ua=Math.PI*2,ha=180/Math.PI,ca=Math.PI/180;class R{constructor(e=1,t=0,n=0,i=1,s=0,o=0){this.array=null,this.a=e,this.b=t,this.c=n,this.d=i,this.tx=s,this.ty=o}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,t,n,i,s,o){return this.a=e,this.b=t,this.c=n,this.d=i,this.tx=s,this.ty=o,this}toArray(e,t){this.array||(this.array=new Float32Array(9));const n=t||this.array;return e?(n[0]=this.a,n[1]=this.b,n[2]=0,n[3]=this.c,n[4]=this.d,n[5]=0,n[6]=this.tx,n[7]=this.ty,n[8]=1):(n[0]=this.a,n[1]=this.c,n[2]=this.tx,n[3]=this.b,n[4]=this.d,n[5]=this.ty,n[6]=0,n[7]=0,n[8]=1),n}apply(e,t){t=t||new H;const n=e.x,i=e.y;return t.x=this.a*n+this.c*i+this.tx,t.y=this.b*n+this.d*i+this.ty,t}applyInverse(e,t){t=t||new H;const n=this.a,i=this.b,s=this.c,o=this.d,a=this.tx,l=this.ty,u=1/(n*o+s*-i),h=e.x,c=e.y;return t.x=o*u*h+-s*u*c+(l*s-a*o)*u,t.y=n*u*c+-i*u*h+(-l*n+a*i)*u,t}translate(e,t){return this.tx+=e,this.ty+=t,this}scale(e,t){return this.a*=e,this.d*=t,this.c*=e,this.b*=t,this.tx*=e,this.ty*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),i=this.a,s=this.c,o=this.tx;return this.a=i*t-this.b*n,this.b=i*n+this.b*t,this.c=s*t-this.d*n,this.d=s*n+this.d*t,this.tx=o*t-this.ty*n,this.ty=o*n+this.ty*t,this}append(e){const t=this.a,n=this.b,i=this.c,s=this.d;return this.a=e.a*t+e.b*i,this.b=e.a*n+e.b*s,this.c=e.c*t+e.d*i,this.d=e.c*n+e.d*s,this.tx=e.tx*t+e.ty*i+this.tx,this.ty=e.tx*n+e.ty*s+this.ty,this}appendFrom(e,t){const n=e.a,i=e.b,s=e.c,o=e.d,a=e.tx,l=e.ty,u=t.a,h=t.b,c=t.c,p=t.d;return this.a=n*u+i*c,this.b=n*h+i*p,this.c=s*u+o*c,this.d=s*h+o*p,this.tx=a*u+l*c+t.tx,this.ty=a*h+l*p+t.ty,this}setTransform(e,t,n,i,s,o,a,l,u){return this.a=Math.cos(a+u)*s,this.b=Math.sin(a+u)*s,this.c=-Math.sin(a-l)*o,this.d=Math.cos(a-l)*o,this.tx=e-(n*this.a+i*this.c),this.ty=t-(n*this.b+i*this.d),this}prepend(e){const t=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const n=this.a,i=this.c;this.a=n*e.a+this.b*e.c,this.b=n*e.b+this.b*e.d,this.c=i*e.a+this.d*e.c,this.d=i*e.b+this.d*e.d}return this.tx=t*e.a+this.ty*e.c+e.tx,this.ty=t*e.b+this.ty*e.d+e.ty,this}decompose(e){const t=this.a,n=this.b,i=this.c,s=this.d,o=e.pivot,a=-Math.atan2(-i,s),l=Math.atan2(n,t),u=Math.abs(a+l);return u<1e-5||Math.abs(ua-u)<1e-5?(e.rotation=l,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=a,e.skew.y=l),e.scale.x=Math.sqrt(t*t+n*n),e.scale.y=Math.sqrt(i*i+s*s),e.position.x=this.tx+(o.x*t+o.y*i),e.position.y=this.ty+(o.x*n+o.y*s),e}invert(){const e=this.a,t=this.b,n=this.c,i=this.d,s=this.tx,o=e*i-t*n;return this.a=i/o,this.b=-t/o,this.c=-n/o,this.d=e/o,this.tx=(n*this.ty-i*s)/o,this.ty=-(e*this.ty-t*s)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new R;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}static get IDENTITY(){return uf.identity()}static get shared(){return lf.identity()}}const lf=new R,uf=new R,Xe=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],qe=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],Ke=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],Ze=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],Un=[],da=[],Cr=Math.sign;function hf(){for(let r=0;r<16;r++){const e=[];Un.push(e);for(let t=0;t<16;t++){const n=Cr(Xe[r]*Xe[t]+Ke[r]*qe[t]),i=Cr(qe[r]*Xe[t]+Ze[r]*qe[t]),s=Cr(Xe[r]*Ke[t]+Ke[r]*Ze[t]),o=Cr(qe[r]*Ke[t]+Ze[r]*Ze[t]);for(let a=0;a<16;a++)if(Xe[a]===n&&qe[a]===i&&Ke[a]===s&&Ze[a]===o){e.push(a);break}}}for(let r=0;r<16;r++){const e=new R;e.set(Xe[r],qe[r],Ke[r],Ze[r],0,0),da.push(e)}}hf();const G={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:r=>Xe[r],uY:r=>qe[r],vX:r=>Ke[r],vY:r=>Ze[r],inv:r=>r&8?r&15:-r&7,add:(r,e)=>Un[r][e],sub:(r,e)=>Un[r][G.inv(e)],rotate180:r=>r^4,isVertical:r=>(r&3)===2,byDirection:(r,e)=>Math.abs(r)*2<=Math.abs(e)?e>=0?G.S:G.N:Math.abs(e)*2<=Math.abs(r)?r>0?G.E:G.W:e>0?r>0?G.SE:G.SW:r>0?G.NE:G.NW,matrixAppendRotationInv:(r,e,t=0,n=0)=>{const i=da[G.inv(e)];i.tx=t,i.ty=n,r.append(i)}};class In extends oe{constructor(e={}){var t;super(),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=e.frame||new X(0,0,1,1),this.orig=e.orig||this.frame,this.rotate=(t=e.rotate)!=null?t:0,this.trim=e.trim,this.defaultAnchor=e.defaultAnchor,this.updateUvs()}updateUvs(){const e=this.uvs,t=this.frame;let n=this.rotate;if(n){const i=t.width/2,s=t.height/2,o=t.x+i,a=t.y+s;n=G.add(n,G.NW),e.x0=o+i*G.uX(n),e.y0=a+s*G.uY(n),n=G.add(n,2),e.x1=o+i*G.uX(n),e.y1=a+s*G.uY(n),n=G.add(n,2),e.x2=o+i*G.uX(n),e.y2=a+s*G.uY(n),n=G.add(n,2),e.x3=o+i*G.uX(n),e.y3=a+s*G.uY(n)}else e.x0=t.x,e.y0=t.y,e.x1=t.x+t.width,e.y1=t.y,e.x2=t.x+t.width,e.y2=t.y+t.height,e.x3=t.x,e.y3=t.y+t.height}update(){this.updateUvs(),this.emit("update",this)}destroy(){this.emit("destroy",this),this.removeAllListeners(),this.frame=null,this.orig=null,this.trim=null,this.defaultAnchor=null,this.uvs=null}}const pa=new R;class Gn{constructor(e,t){this.mapCoord=new R,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof t=="undefined"?.5:t,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){var t;this.texture!==e&&((t=this._texture)==null||t.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,t){t===void 0&&(t=e);const n=this.mapCoord;for(let i=0;i<e.length;i+=2){const s=e[i],o=e[i+1];t[i]=s*n.a+o*n.c+n.tx,t[i+1]=s*n.b+o*n.d+n.ty}return t}update(){const e=this._texture;this._updateID++;const t=e.layout.uvs;this.mapCoord.set(t.x1-t.x0,t.y1-t.y0,t.x3-t.x0,t.y3-t.y0,t.x0,t.y0);const n=e.layout.orig,i=e.layout.trim;i&&(pa.set(n.width/i.width,0,0,n.height/i.height,-i.x/i.width,-i.y/i.height),this.mapCoord.append(pa));const s=e.source,o=this.uClampFrame,a=this.clampMargin/s._resolution,l=this.clampOffset;return o[0]=(e.frameX+a+l)/s.width,o[1]=(e.frameY+a+l)/s.height,o[2]=(e.frameX+e.frameWidth-a+l)/s.width,o[3]=(e.frameY+e.frameHeight-a+l)/s.height,this.uClampOffset[0]=l/s.pixelWidth,this.uClampOffset[1]=l/s.pixelHeight,this.isSimple=e.frameWidth===s.width&&e.frameHeight===s.height&&e.layout.rotate===0,!0}}let cf=0;class A extends oe{constructor({source:e,style:t,layout:n,label:i}={}){var s;super(),this.id=cf++,this.styleSourceKey=0,this.label=i,this.source=(s=e==null?void 0:e.source)!=null?s:new ae,this.layout=n instanceof In?n:new In(n),t&&(this._style=t instanceof Ye?t:new Ye(t)),this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid,this.destroyed=!1}static from(e){return typeof e=="string"?ee.get(e):e instanceof ae?new A({source:e}):new A({source:new ae(e)})}set source(e){this._source&&(this._source.off("update",this.onStyleSourceUpdate,this),this._source.off("resize",this.onUpdate,this)),this._source=e,e.on("update",this.onStyleSourceUpdate,this),e.on("resize",this.onUpdate,this),this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid,this.emit("update",this)}get source(){return this._source}get style(){return this._style||this.source.style}set style(e){var t,n;(t=this._style)==null||t.off("change",this.onStyleSourceUpdate,this),this._style=e,(n=this._style)==null||n.on("change",this.onStyleSourceUpdate,this)}get layout(){return this._layout}set layout(e){var t;(t=this._layout)==null||t.off("update",this.onUpdate,this),this._layout=e,e.on("update",this.onUpdate,this),this.emit("update",this)}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new Gn(this)),this._textureMatrix}set frameWidth(e){this._layout.frame.width=e/this._source.width}get frameWidth(){return this._source.pixelWidth/this._source._resolution*this._layout.frame.width}set frameHeight(e){this._layout.frame.height=e/this._source.height}get frameHeight(){return this._source.pixelHeight/this._source._resolution*this._layout.frame.height}set frameX(e){if(e===0){this._layout.frame.x=0;return}this._layout.frame.x=this._source.width/e}get frameX(){return this._source.width*this._layout.frame.x}set frameY(e){if(e===0){this._layout.frame.y=0;return}this._layout.frame.y=this._source.height/e}get frameY(){return this._source.height*this._layout.frame.y}get width(){return this._source.width*this._layout.orig.width}get height(){return this._source.height*this._layout.orig.height}destroy(e=!1){this._style&&(this._style.destroy(),this._style=null),this._layout&&(this._layout.destroy(),this._layout=null),this._source&&e&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}onStyleSourceUpdate(){this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid,this.emit("update",this)}onUpdate(){this.emit("update",this)}get baseTexture(){return U(N,"Texture.baseTexture is now Texture.source"),this._source}}A.EMPTY=new A({}),A.EMPTY.label="EMPTY",A.EMPTY.destroy=On;class Ln extends oe{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return U(N,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return U(N,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return U(N,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return U(N,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return U(N,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture.destroy();this.chars=null}}class $n extends Ln{constructor(e){var t;super();const{textures:n,data:i}=e;Object.keys(i.pages).forEach(o=>{const a=i.pages[parseInt(o,10)],l=n[a.id];this.pages.push({texture:l})}),Object.keys(i.chars).forEach(o=>{var a;const l=i.chars[o],u=n[l.page].source,h=new X(l.x/u.width,l.y/u.height,l.width/u.width,l.height/u.height),c=new A({source:u,layout:{frame:h}});this.chars[o]={id:o.codePointAt(0),xOffset:l.xOffset,yOffset:l.yOffset,xAdvance:l.xAdvance,kerning:(a=l.kerning)!=null?a:{},texture:c}}),this.baseRenderedFontSize=i.fontSize;const s=this;s.baseMeasurementFontSize=i.fontSize,s.fontMetrics={ascent:0,descent:0,fontSize:i.fontSize},s.baseLineOffset=i.baseLineOffset,s.lineHeight=i.lineHeight,s.fontFamily=i.fontFamily,s.distanceField=(t=i.distanceField)!=null?t:{type:"none",range:0}}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{texture:t}=this.pages[e];t.destroy(!0)}this.pages=null}}const Br={test(r){return typeof r=="string"&&r.startsWith("info face=")},parse(r){var e,t;const n=r.match(/^[a-z]+\s+.+$/gm),i={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const d in n){const f=n[d].match(/^[a-z]+/gm)[0],g=n[d].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),m={};for(const y in g){const v=g[y].split("="),b=v[0],_=v[1].replace(/"/gm,""),S=parseFloat(_),k=isNaN(S)?_:S;m[b]=k}i[f].push(m)}const s={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},[o]=i.info,[a]=i.common,[l]=(e=i.distanceField)!=null?e:[];l&&(s.distanceField={range:parseInt(l.distanceRange,10),type:l.fieldType}),s.fontSize=parseInt(o.size,10),s.fontFamily=o.face,s.lineHeight=parseInt(a.lineHeight,10);const u=i.page;for(let d=0;d<u.length;d++)s.pages.push({id:parseInt(u[d].id,10)||0,file:u[d].file});const h={};s.baseLineOffset=s.lineHeight-parseInt(a.base,10);const c=i.char;for(let d=0;d<c.length;d++){const f=c[d],g=parseInt(f.id,10);let m=(t=f.letter)!=null?t:f.char;m==="space"&&(m=" "),h[g]=m,s.chars[m]={id:g,page:parseInt(f.page,10)||0,x:parseInt(f.x,10),y:parseInt(f.y,10),width:parseInt(f.width,10),height:parseInt(f.height,10),xOffset:parseInt(f.xoffset,10),yOffset:parseInt(f.yoffset,10),xAdvance:parseInt(f.xadvance,10),kerning:{}}}const p=i.kerning||[];for(let d=0;d<p.length;d++){const f=parseInt(p[d].first,10),g=parseInt(p[d].second,10),m=parseInt(p[d].amount,10);s.chars[h[g]].kerning[h[f]]=m}return s}},Dn={test(r){const e=r;return typeof e!="string"&&"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(r){var e;const t={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},n=r.getElementsByTagName("info")[0],i=r.getElementsByTagName("common")[0],s=r.getElementsByTagName("distanceField")[0];s&&(t.distanceField={type:s.getAttribute("fieldType"),range:parseInt(s.getAttribute("distanceRange"),10)});const o=r.getElementsByTagName("page"),a=r.getElementsByTagName("char"),l=r.getElementsByTagName("kerning");t.fontSize=parseInt(n.getAttribute("size"),10),t.fontFamily=n.getAttribute("face"),t.lineHeight=parseInt(i.getAttribute("lineHeight"),10);for(let h=0;h<o.length;h++)t.pages.push({id:parseInt(o[h].getAttribute("id"),10)||0,file:o[h].getAttribute("file")});const u={};t.baseLineOffset=t.lineHeight-parseInt(i.getAttribute("base"),10);for(let h=0;h<a.length;h++){const c=a[h],p=parseInt(c.getAttribute("id"),10);let d=(e=c.getAttribute("letter"))!=null?e:c.getAttribute("char");d==="space"&&(d=" "),u[p]=d,t.chars[d]={id:p,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let h=0;h<l.length;h++){const c=parseInt(l[h].getAttribute("first"),10),p=parseInt(l[h].getAttribute("second"),10),d=parseInt(l[h].getAttribute("amount"),10);t.chars[u[p]].kerning[u[c]]=d}return t}},zn={test(r){return typeof r=="string"&&r.includes("<font>")?Dn.test(I.ADAPTER.parseXML(r)):!1},parse(r){return Dn.parse(I.ADAPTER.parseXML(r))}},df=[".xml",".fnt"],fa={extension:x.CacheParser,test:r=>r instanceof $n,getCacheableAssets(r,e){const t={};return r.forEach(n=>{t[n]=e}),t[e.fontFamily]=e,t}},ma={extension:{type:x.LoadParser,priority:Be.Normal},test(r){return df.includes(ue.extname(r).toLowerCase())},async testParse(r){return Br.test(r)||zn.test(r)},async parse(r,e,t){const n=Br.test(r)?Br.parse(r):zn.parse(r),{src:i}=e,{pages:s}=n,o=[];for(let u=0;u<s.length;++u){const h=s[u].file;let c=ue.join(ue.dirname(i),h);c=Ar(c,i),o.push(c)}const a=await t.load(o),l=o.map(u=>a[u]);return new $n({data:n,textures:l})},async load(r,e){return await(await I.ADAPTER.fetch(r)).text()},unload(r){r.destroy()}},ga={extension:x.CacheParser,test:r=>Array.isArray(r)&&r.every(e=>e instanceof A),getCacheableAssets:(r,e)=>{const t={};return r.forEach(n=>{e.forEach((i,s)=>{t[n+(s===0?"":s+1)]=i})}),t}},va={extension:{type:x.DetectionParser,priority:1},test:async()=>{const r="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=r})},add:async r=>[...r,"avif"],remove:async r=>r.filter(e=>e!=="avif")},ba=["png","jpg","jpeg"],ya={extension:{type:x.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async r=>[...r,...ba],remove:async r=>r.filter(e=>!ba.includes(e))},pf="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function Rr(r){return pf?!1:document.createElement("video").canPlayType(r)!==""}const xa={extension:{type:x.DetectionParser,priority:0},test:async()=>Rr("video/mp4"),add:async r=>[...r,"mp4","m4v"],remove:async r=>r.filter(e=>e!=="mp4"&&e!=="m4v")},_a={extension:{type:x.DetectionParser,priority:0},test:async()=>Rr("video/ogg"),add:async r=>[...r,"ogv"],remove:async r=>r.filter(e=>e!=="ogv")},wa={extension:{type:x.DetectionParser,priority:0},test:async()=>Rr("video/webm"),add:async r=>[...r,"webm"],remove:async r=>r.filter(e=>e!=="webm")},Ta={extension:{type:x.DetectionParser,priority:0},test:async()=>{const r="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=r})},add:async r=>[...r,"webp"],remove:async r=>r.filter(e=>e!=="webp")};function pt(r,e){if(Array.isArray(e)){for(const t of e)if(r.startsWith(`data:${t}`))return!0;return!1}return r.startsWith(`data:${e}`)}function ft(r,e){const t=r.split("?")[0],n=ue.extname(t).toLowerCase();return Array.isArray(e)?e.includes(n):n===e}const ff=".json",mf="application/json",Sa={extension:{type:x.LoadParser,priority:Be.Low},name:"loadJson",test(r){return pt(r,mf)||ft(r,ff)},async load(r){return await(await I.ADAPTER.fetch(r)).json()}},gf=".txt",vf="text/plain",Pa={name:"loadTxt",extension:{type:x.LoadParser,priority:Be.Low},test(r){return pt(r,vf)||ft(r,gf)},async load(r){return await(await I.ADAPTER.fetch(r)).text()}};var bf=Object.defineProperty,yf=Object.defineProperties,xf=Object.getOwnPropertyDescriptors,Aa=Object.getOwnPropertySymbols,_f=Object.prototype.hasOwnProperty,wf=Object.prototype.propertyIsEnumerable,Ea=(r,e,t)=>e in r?bf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Tf=(r,e)=>{for(var t in e||(e={}))_f.call(e,t)&&Ea(r,t,e[t]);if(Aa)for(var t of Aa(e))wf.call(e,t)&&Ea(r,t,e[t]);return r},Sf=(r,e)=>yf(r,xf(e));const Pf=["normal","bold","100","200","300","400","500","600","700","800","900"],Af=[".ttf",".otf",".woff",".woff2"],Ef=["font/ttf","font/otf","font/woff","font/woff2"],Mf=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function Ma(r){const e=ue.extname(r),t=ue.basename(r,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1));let n=t.length>0;for(const s of t)if(!s.match(Mf)){n=!1;break}let i=t.join(" ");return n||(i=`"${i.replace(/[\\"]/g,"\\$&")}"`),i}const Ca={extension:{type:x.LoadParser,priority:Be.Low},name:"loadWebFont",test(r){return pt(r,Ef)||ft(r,Af)},async load(r,e){var t,n,i,s,o,a;const l=I.ADAPTER.getFontFaceSet();if(l){const u=[],h=(n=(t=e.data)==null?void 0:t.family)!=null?n:Ma(r),c=(o=(s=(i=e.data)==null?void 0:i.weights)==null?void 0:s.filter(d=>Pf.includes(d)))!=null?o:["normal"],p=(a=e.data)!=null?a:{};for(let d=0;d<c.length;d++){const f=c[d],g=new FontFace(h,`url(${encodeURI(r)})`,Sf(Tf({},p),{weight:f}));await g.load(),l.add(g),u.push(g)}return ee.set(h,{url:r,fontFaces:u}),u.length===1?u[0]:u}return null},unload(r){(Array.isArray(r)?r:[r]).forEach(e=>{ee.remove(e.family),I.ADAPTER.getFontFaceSet().delete(e)})}},Nn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function fe(r){if(typeof r=="number")return r;if(typeof r=="string"){if(Nn[r]!==void 0)return Nn[r];let e=0;if(r[0]==="#"&&e++,r.length===4){const t=parseInt(r[e]+r[e],16),n=parseInt(r[e+1]+r[e+1],16),i=parseInt(r[e+2]+r[e+2],16);return(t<<16)+(n<<8)+i}return parseInt(r.substring(e),16)}return 0}class le{constructor(e=1/0,t=1/0,n=-1/0,i=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack=[],this.matrix=new R,this.minX=e,this.minY=t,this.maxX=n,this.maxY=i}get rectangle(){this._rectangle||(this._rectangle=new X);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):e.copyFromBounds(this),e}clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack.length=0,this.matrix.identity()}pushMatrix(e){this._matrixStack.push(e),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(e)):this.matrix.copyFrom(e)}popMatrix(){this._matrixStack.pop(),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(this._matrixStack[this._matrixStack.length-1])):this._matrixStack.length===1?this.matrix.copyFrom(this._matrixStack[0]):this.matrix.identity()}setMatrix(e){this.matrix.copyFrom(e)}set(e,t,n,i){this.minX=e,this.minY=t,this.maxX=n,this.maxY=i}addFrame(e,t,n,i){const s=this.matrix,o=s.a,a=s.b,l=s.c,u=s.d,h=s.tx,c=s.ty;let p=this.minX,d=this.minY,f=this.maxX,g=this.maxY,m=o*e+l*t+h,y=a*e+u*t+c;p=m<p?m:p,d=y<d?y:d,f=m>f?m:f,g=y>g?y:g,m=o*n+l*t+h,y=a*n+u*t+c,p=m<p?m:p,d=y<d?y:d,f=m>f?m:f,g=y>g?y:g,m=o*e+l*i+h,y=a*e+u*i+c,p=m<p?m:p,d=y<d?y:d,f=m>f?m:f,g=y>g?y:g,m=o*n+l*i+h,y=a*n+u*i+c,p=m<p?m:p,d=y<d?y:d,f=m>f?m:f,g=y>g?y:g,this.minX=p,this.minY=d,this.maxX=f,this.maxY=g}addRect(e){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height)}addBounds(e){this.addFrame(e.minX,e.minY,e.maxX,e.maxY)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const t=this.minX,n=this.minY,i=this.maxX,s=this.maxY,{a:o,b:a,c:l,d:u,tx:h,ty:c}=e;let p=o*t+l*n+h,d=a*t+u*n+c;this.minX=p,this.minY=d,this.maxX=p,this.maxY=d,p=o*i+l*n+h,d=a*i+u*n+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*t+l*s+h,d=a*t+u*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*i+l*s+h,d=a*i+u*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}pad(e,t=e){return this.minX-=e,this.maxX+=e,this.minY-=t,this.maxY+=t,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new le(this.minX,this.minY,this.maxX,this.maxY)}scale(e,t=e){return this.minX*=e,this.minY*=t,this.maxX*=e,this.maxY*=t,this}get x(){return this.minX}get y(){return this.minY}get width(){return this.maxX-this.minX}get height(){return this.maxY-this.minY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,t,n){let i=this.minX,s=this.minY,o=this.maxX,a=this.maxY;const l=this.matrix,u=l.a,h=l.b,c=l.c,p=l.d,d=l.tx,f=l.ty;for(let g=t;g<n;g+=2){const m=e[g],y=e[g+1],v=u*m+c*y+d,b=h*m+p*y+f;i=v<i?v:i,s=b<s?b:s,o=v>o?v:o,a=b>a?b:a}this.minX=i,this.minY=s,this.maxX=o,this.maxY=a}toString(){return`[@pixi:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}}function kr(r){if(typeof r=="string")return r;let e=(r|0).toString(16);return e="000000".substring(0,6-e.length)+e,`#${e}`}class It extends ae{constructor(e){var t;super(e),this.type="image",this.alphaMode=(t=e.alphaMode)!=null?t:0}}const Or=I.ADAPTER.createCanvas(),Qe=1;Or.width=Qe,Or.height=Qe;const Re=Or.getContext("2d");Re.fillStyle="#ffffff",Re.fillRect(0,0,Qe,Qe),Re.beginPath(),Re.moveTo(0,0),Re.lineTo(Qe,0),Re.lineTo(Qe,Qe),Re.closePath(),Re.fillStyle="#ffffff",Re.fill(),A.WHITE=new A({source:new It({resource:Or})}),A.WHITE.label="WHITE",A.WHITE.destroy=On;let Cf=0;const Wn=class{constructor(r,e,t,n){this.uid=Cf++,this.type="linear",this.gradientStops=[],this.x0=r,this.y0=e,this.x1=t,this.y1=n}addColorStop(r,e){return e=kr(e),this.gradientStops.push({offset:r,color:e}),this}buildLinearGradient(){const r=Wn.defaultTextureSize,{gradientStops:e}=this,t=I.ADAPTER.createCanvas();t.width=r,t.height=r;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,Wn.defaultTextureSize,1);for(let f=0;f<e.length;f++){const g=e[f];i.addColorStop(g.offset,g.color)}n.fillStyle=i,n.fillRect(0,0,r,r),this.texture=new A({source:new It({resource:t}),style:{addressModeU:"clamp-to-edge",addressModeV:"repeat"}});const{x0:s,y0:o,x1:a,y1:l}=this,u=new R,h=a-s,c=l-o,p=Math.sqrt(h*h+c*c),d=Math.atan2(c,h);u.translate(-s,-o),u.scale(1/r,1/r),u.rotate(-d),u.scale(256/p,1),this.transform=u}};let Je=Wn;Je.defaultTextureSize=256;const Ba={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};let Bf=0;class Fr{constructor(e,t){this.uid=Bf++,this.transform=new R,this.texture=e,this.transform.scale(1/e.frameWidth,1/e.frameHeight),t&&(e.style.addressModeU=Ba[t].addressModeU,e.style.addressModeV=Ba[t].addressModeV)}setTransform(e){const t=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/t.frameWidth,1/t.frameHeight)}}const Rf={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0};function Ra(r,e){var t;const n=r.match(/[a-df-z][^a-df-z]*/gi),i=(t=r.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:t.map(parseFloat),s=[];n.forEach(u=>{var h;const c=(h=u.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:h.map(parseFloat),p=u[0];let d=1;c&&(d=c.length/Rf[p.toLowerCase()]);for(let f=0;f<d;f++)s.push(p)});let o=0,a=0,l=0;for(let u=0;u<s.length;u++){const h=s[u];switch(h){case"M":a=i[o++],l=i[o++],e.moveTo(a,l);break;case"m":a+=i[o++],l+=i[o++],e.moveTo(a,l);break;case"H":a=i[o++],e.lineTo(a,l);break;case"h":a+=i[o++],e.lineTo(a,l);break;case"V":l=i[o++],e.lineTo(a,l);break;case"v":l+=i[o++],e.lineTo(a,l);break;case"L":a=i[o++],l=i[o++],e.lineTo(a,l);break;case"l":a+=i[o++],l+=i[o++],e.lineTo(a,l);break;case"C":a=i[o+4],l=i[o+5],e.bezierCurveTo(i[o],i[o+1],i[o+2],i[o+3],a,l),o+=6;break;case"c":e.bezierCurveTo(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3],a+i[o+4],l+i[o+5]),a+=i[o+4],l+=i[o+5],o+=6;break;case"S":a=i[o+2],l=i[o+3],e.bezierCurveToShort(i[o],i[o+1],a,l),o+=4;break;case"s":e.bezierCurveToShort(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3]),a+=i[o+2],l+=i[o+3],o+=4;break;case"Q":a=i[o+2],l=i[o+3],e.quadraticCurveTo(i[o],i[o+1],a,l),o+=4;break;case"q":e.quadraticCurveTo(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3]),a+=i[o+2],l+=i[o+3],o+=4;break;case"T":a=i[o++],l=i[o++],e.quadraticCurveToShort(a,l);break;case"t":a+=i[o++],l+=i[o++],e.quadraticCurveToShort(a,l);break;case"A":a=i[o+5],l=i[o+6],e.arcToSvg(i[o],i[o+1],i[o+2],i[o+3],i[o+4],a,l),o+=7;break;case"a":a+=i[o+5],l+=i[o+6],e.arcToSvg(i[o],i[o+1],i[o+2],i[o+3],i[o+4],a,l),o+=7;break;case"Z":case"z":e.closePath();break;default:console.warn(`Unknown SVG path command: ${h}`)}}return e}class Sn{constructor(e=0,t=0,n=0){this.type="circle",this.x=e,this.y=t,this.radius=n}clone(){return new Sn(this.x,this.y,this.radius)}contains(e,t){if(this.radius<=0)return!1;const n=this.radius*this.radius;let i=this.x-e,s=this.y-t;return i*=i,s*=s,i+s<=n}getBounds(e){return e=e||new X,e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}}class Pn{constructor(e=0,t=0,n=0,i=0){this.type="ellipse",this.x=e,this.y=t,this.halfWidth=n,this.halfHeight=i}clone(){return new Pn(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,t){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let n=(e-this.x)/this.halfWidth,i=(t-this.y)/this.halfHeight;return n*=n,i*=i,n+i<=1}getBounds(){return new X(this.x-this.halfWidth,this.y-this.halfHeight,this.halfWidth*2,this.halfHeight*2)}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}}class ct{constructor(...e){this.type="polygon";let t=Array.isArray(e[0])?e[0]:e;if(typeof t[0]!="number"){const n=[];for(let i=0,s=t.length;i<s;i++)n.push(t[i].x,t[i].y);t=n}this.points=t,this.closePath=!0}clone(){const e=this.points.slice(),t=new ct(e);return t.closePath=this.closePath,t}contains(e,t){let n=!1;const i=this.points.length/2;for(let s=0,o=i-1;s<i;o=s++){const a=this.points[s*2],l=this.points[s*2+1],u=this.points[o*2],h=this.points[o*2+1];l>t!=h>t&&e<(u-a)*((t-l)/(h-l))+a&&(n=!n)}return n}getBounds(e){e=e||new X;const t=this.points;let n=1/0,i=-1/0,s=1/0,o=-1/0;for(let a=0,l=t.length;a<l;a+=2){const u=t[a],h=t[a+1];n=u<n?u:n,i=u>i?u:i,s=h<s?h:s,o=h>o?h:o}return e.x=n,e.width=i-n,e.y=s,e.height=o-s,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}class An{constructor(e=0,t=0,n=0,i=0,s=20){this.type="roundedRectangle",this.x=e,this.y=t,this.width=n,this.height=i,this.radius=s}getBounds(e){return e=e||new X,e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new An(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&t>=this.y&&t<=this.y+this.height){const n=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(t>=this.y+n&&t<=this.y+this.height-n||e>=this.x+n&&e<=this.x+this.width-n)return!0;let i=e-(this.x+n),s=t-(this.y+n);const o=n*n;if(i*i+s*s<=o||(i=e-(this.x+this.width-n),i*i+s*s<=o)||(s=t-(this.y+this.height-n),i*i+s*s<=o)||(i=e-(this.x+n),i*i+s*s<=o))return!0}return!1}}const g_=8,Ur=11920929e-14,kf=1,Hn=.01,mt=0,et=0;function jn(r,e,t,n,i,s,o,a,l){let u=kf/1;return u*=u,Of(e,t,n,i,s,o,a,l,r,u),r}function Of(r,e,t,n,i,s,o,a,l,u){Vn(r,e,t,n,i,s,o,a,l,u,0),l.push(o,a)}function Vn(r,e,t,n,i,s,o,a,l,u,h){if(h>8)return;const c=Math.PI,p=(r+t)/2,d=(e+n)/2,f=(t+i)/2,g=(n+s)/2,m=(i+o)/2,y=(s+a)/2,v=(p+f)/2,b=(d+g)/2,_=(f+m)/2,S=(g+y)/2,k=(v+_)/2,C=(b+S)/2;if(h>0){let P=o-r,w=a-e;const T=Math.abs((t-o)*w-(n-a)*P),D=Math.abs((i-o)*w-(s-a)*P);let L,B;if(T>Ur&&D>Ur){if((T+D)*(T+D)<=u*(P*P+w*w)){if(mt<Hn){l.push(k,C);return}const E=Math.atan2(s-n,i-t);if(L=Math.abs(E-Math.atan2(n-e,t-r)),B=Math.abs(Math.atan2(a-s,o-i)-E),L>=c&&(L=2*c-L),B>=c&&(B=2*c-B),L+B<mt){l.push(k,C);return}if(et!==0){if(L>et){l.push(t,n);return}if(B>et){l.push(i,s);return}}}}else if(T>Ur){if(T*T<=u*(P*P+w*w)){if(mt<Hn){l.push(k,C);return}if(L=Math.abs(Math.atan2(s-n,i-t)-Math.atan2(n-e,t-r)),L>=c&&(L=2*c-L),L<mt){l.push(t,n),l.push(i,s);return}if(et!==0&&L>et){l.push(t,n);return}}}else if(D>Ur){if(D*D<=u*(P*P+w*w)){if(mt<Hn){l.push(k,C);return}if(L=Math.abs(Math.atan2(a-s,o-i)-Math.atan2(s-n,i-t)),L>=c&&(L=2*c-L),L<mt){l.push(t,n),l.push(i,s);return}if(et!==0&&L>et){l.push(i,s);return}}}else if(P=k-(r+o)/2,w=C-(e+a)/2,P*P+w*w<=u){l.push(k,C);return}}Vn(r,e,p,d,v,b,k,C,l,u,h+1),Vn(k,C,_,S,m,y,o,a,l,u,h+1)}const v_=8,Ff=11920929e-14,Uf=1,If=.01,ka=0;function Oa(r,e,t,n,i,s,o){let a=Uf/1;return a*=a,Gf(e,t,n,i,s,o,r,a),r}function Gf(r,e,t,n,i,s,o,a){Yn(o,r,e,t,n,i,s,a,0),o.push(i,s)}function Yn(r,e,t,n,i,s,o,a,l){if(l>8)return;const u=Math.PI,h=(e+n)/2,c=(t+i)/2,p=(n+s)/2,d=(i+o)/2,f=(h+p)/2,g=(c+d)/2;let m=s-e,y=o-t;const v=Math.abs((n-s)*y-(i-o)*m);if(v>Ff){if(v*v<=a*(m*m+y*y)){if(ka<If){r.push(f,g);return}let b=Math.abs(Math.atan2(o-i,s-n)-Math.atan2(i-t,n-e));if(b>=u&&(b=2*u-b),b<ka){r.push(f,g);return}}}else if(m=f-(e+s)/2,y=g-(t+o)/2,m*m+y*y<=a){r.push(f,g);return}Yn(r,e,t,h,c,f,g,a,l+1),Yn(r,f,g,p,d,s,o,a,l+1)}function Xn(r,e,t,n,i,s,o,a){let l=Math.abs(i-s);(!o&&i>s||o&&s>i)&&(l=2*Math.PI-l),a=a||Math.max(6,Math.floor(6*Math.pow(n,1/3)*(l/Math.PI))),a=Math.max(a,3);let u=l/a,h=i;u*=o?-1:1;for(let c=0;c<a+1;c++){const p=Math.cos(h),d=Math.sin(h),f=e+p*n,g=t+d*n;r.push(f,g),h+=u}}function Fa(r,e,t,n,i,s){const o=r[r.length-2],a=r[r.length-1]-t,l=o-e,u=i-t,h=n-e,c=Math.abs(a*h-l*u);if(c<1e-8||s===0){(r[r.length-2]!==e||r[r.length-1]!==t)&&r.push(e,t);return}const p=a*a+l*l,d=u*u+h*h,f=a*u+l*h,g=s*Math.sqrt(p)/c,m=s*Math.sqrt(d)/c,y=g*f/p,v=m*f/d,b=g*h+m*l,_=g*u+m*a,S=l*(m+y),k=a*(m+y),C=h*(g+v),P=u*(g+v),w=Math.atan2(k-_,S-b),T=Math.atan2(P-_,C-b);Xn(r,b+e,_+t,s,w,T,l*u>h*a)}const Gt=Math.PI*2,qn={centerX:0,centerY:0,ang1:0,ang2:0},Kn=({x:r,y:e},t,n,i,s,o,a,l)=>{r*=t,e*=n;const u=i*r-s*e,h=s*r+i*e;return l.x=u+o,l.y=h+a,l};function Lf(r,e){const t=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),n=e===1.5707963267948966?.551915024494:t,i=Math.cos(r),s=Math.sin(r),o=Math.cos(r+e),a=Math.sin(r+e);return[{x:i-s*n,y:s+i*n},{x:o+a*n,y:a-o*n},{x:o,y:a}]}const Ua=(r,e,t,n)=>{const i=r*n-e*t<0?-1:1;let s=r*t+e*n;return s>1&&(s=1),s<-1&&(s=-1),i*Math.acos(s)},$f=(r,e,t,n,i,s,o,a,l,u,h,c,p)=>{const d=Math.pow(i,2),f=Math.pow(s,2),g=Math.pow(h,2),m=Math.pow(c,2);let y=d*f-d*m-f*g;y<0&&(y=0),y/=d*m+f*g,y=Math.sqrt(y)*(o===a?-1:1);const v=y*i/s*c,b=y*-s/i*h,_=u*v-l*b+(r+t)/2,S=l*v+u*b+(e+n)/2,k=(h-v)/i,C=(c-b)/s,P=(-h-v)/i,w=(-c-b)/s,T=Ua(1,0,k,C);let D=Ua(k,C,P,w);a===0&&D>0&&(D-=Gt),a===1&&D<0&&(D+=Gt),p.centerX=_,p.centerY=S,p.ang1=T,p.ang2=D};function Ia(r,e,t,n,i,s,o,a=0,l=0,u=0){if(s===0||o===0)return;const h=Math.sin(a*Gt/360),c=Math.cos(a*Gt/360),p=c*(e-n)/2+h*(t-i)/2,d=-h*(e-n)/2+c*(t-i)/2;if(p===0&&d===0)return;s=Math.abs(s),o=Math.abs(o);const f=Math.pow(p,2)/Math.pow(s,2)+Math.pow(d,2)/Math.pow(o,2);f>1&&(s*=Math.sqrt(f),o*=Math.sqrt(f)),$f(e,t,n,i,s,o,l,u,h,c,p,d,qn);let{ang1:g,ang2:m}=qn;const{centerX:y,centerY:v}=qn;let b=Math.abs(m)/(Gt/4);Math.abs(1-b)<1e-7&&(b=1);const _=Math.max(Math.ceil(b),1);m/=_;let S=r[r.length-2],k=r[r.length-1];const C={x:0,y:0};for(let P=0;P<_;P++){const w=Lf(g,m),{x:T,y:D}=Kn(w[0],s,o,c,h,y,v,C),{x:L,y:B}=Kn(w[1],s,o,c,h,y,v,C),{x:E,y:V}=Kn(w[2],s,o,c,h,y,v,C);jn(r,S,k,T,D,L,B,E,V),S=E,k=V,g+=m}}const Df=new X;class Ga{constructor(e){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new le,this._graphicsPath2D=e}moveTo(e,t){return this.startPoly(e,t),this}lineTo(e,t){this._ensurePoly();const n=this._currentPoly.points,i=n[n.length-2],s=n[n.length-1];return(i!==e||s!==t)&&n.push(e,t),this}arc(e,t,n,i,s,o){this._ensurePoly(!1);const a=this._currentPoly.points;return Xn(a,e,t,n,i,s,o),this}arcTo(e,t,n,i,s){this._ensurePoly();const o=this._currentPoly.points;return Fa(o,e,t,n,i,s),this}arcToSvg(e,t,n,i,s,o,a){const l=this._currentPoly.points;return Ia(l,this._currentPoly.lastX,this._currentPoly.lastY,o,a,e,t,n,i,s),this}bezierCurveTo(e,t,n,i,s,o){this._ensurePoly();const a=this._currentPoly;return jn(this._currentPoly.points,a.lastX,a.lastY,e,t,n,i,s,o),this}quadraticCurveTo(e,t,n,i){this._ensurePoly();const s=this._currentPoly;return Oa(this._currentPoly.points,s.lastX,s.lastY,e,t,n,i),this}closePath(){return this.endPoly(!0),this}addPath(e,t){this.endPoly(),t&&!t.isIdentity()&&(e=e.clone(!0),e.transform(t));for(let n=0;n<e.instructions.length;n++){const i=e.instructions[n];this[i.action](...i.data)}return this}finish(e=!1){this.endPoly(e)}rect(e,t,n,i,s){return this.drawShape(new X(e,t,n,i),s),this}circle(e,t,n,i){return this.drawShape(new Sn(e,t,n),i),this}poly(e,t,n){const i=new ct(e);i.closePath=t,this.drawShape(i,n)}ellipse(e,t,n,i,s){return this.drawShape(new Pn(e,t,n,i),s),this}roundRect(e,t,n,i,s,o){return this.drawShape(new An(e,t,n,i,s),o),this}drawShape(e,t){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:t}),this}startPoly(e,t){let n=this._currentPoly;return n&&this.endPoly(),n=new ct,n.points.push(e,t),this._currentPoly=n,this}endPoly(e=!1){const t=this._currentPoly;return t&&t.points.length>2&&(t.closePath=e,this.shapePrimitives.push({shape:t})),this._currentPoly=null,this}_ensurePoly(e=!0){if(!this._currentPoly&&(this._currentPoly=new ct,e)){const t=this.shapePrimitives[this.shapePrimitives.length-1];if(t){let n=t.shape.x,i=t.shape.y;if(t.transform.isIdentity()){const s=t.transform,o=n;n=s.a*n+s.c*i+s.tx,i=s.b*o+s.d*i+s.ty}this._currentPoly.points.push(n,n)}else this._currentPoly.points.push(0,0)}}buildPath(){const e=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let t=0;t<e.instructions.length;t++){const n=e.instructions[t];this[n.action](...n.data)}this.finish()}get bounds(){const e=this._bounds;e.clear();const t=this.shapePrimitives;for(let n=0;n<t.length;n++){const i=t[n],s=i.shape.getBounds(Df);i.transform?(e.pushMatrix(i.transform),e.addRect(s),e.popMatrix()):e.addRect(s)}return e}}let zf=0;class dt{constructor(e){this.instructions=[],this.uid=zf++,this._dirty=!0;var t;typeof e=="string"?Ra(e,this):this.instructions=(t=e==null?void 0:e.slice())!=null?t:[]}get shapePath(){return this._shapePath||(this._shapePath=new Ga(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,t){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,t]}),this._dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this._dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this._dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this._dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this._dirty=!0,this}bezierCurveToShort(e,t,n,i){const s=this.instructions[this.instructions.length-1],o=this._getLastPoint(H.shared);let a=0,l=0;if(!s||s.action!=="bezierCurveTo")a=o.x,l=o.y;else{a=s.data[2],l=s.data[3];const u=o.x,h=o.y;a=u+(u-a),l=h+(h-l)}return this.instructions.push({action:"bezierCurveTo",data:[a,l,e,t,n,i]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this._dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this._dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this._dirty=!0,this}quadraticCurveToShort(e,t){const n=this.instructions[this.instructions.length-1],i=this._getLastPoint(H.shared);let s=0,o=0;if(!n||n.action!=="quadraticCurveTo")s=i.x,o=i.y;else{s=n.data[0],o=n.data[1];const a=i.x,l=i.y;s=a+(a-s),o=l+(l-o)}return this.instructions.push({action:"quadraticCurveTo",data:[s,o,e,t]}),this._dirty=!0,this}rect(e,t,n,i,s){return this.instructions.push({action:"rect",data:[e,t,n,i,s]}),this._dirty=!0,this}circle(e,t,n,i){return this.instructions.push({action:"circle",data:[e,t,n,i]}),this._dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this._dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this._dirty=!0,this}star(e,t,n,i,s,o=0,a){s=s||i/2;const l=-1*Math.PI/2+o,u=n*2,h=Math.PI*2/u,c=[];for(let p=0;p<u;p++){const d=p%2?s:i,f=p*h+l;c.push(e+d*Math.cos(f),t+d*Math.sin(f))}return this.poly(c,!0,a),this}clone(e=!1){const t=new dt;if(!e)t.instructions=this.instructions.slice();else for(let n=0;n<this.instructions.length;n++){const i=this.instructions[n];t.instructions.push({action:i.action,data:i.data.slice()})}return t}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(e){if(e.isIdentity())return this;const t=e.a,n=e.b,i=e.c,s=e.d,o=e.tx,a=e.ty;let l=0,u=0,h=0,c=0,p=0,d=0,f=0,g=0;for(let m=0;m<this.instructions.length;m++){const y=this.instructions[m],v=y.data;switch(y.action){case"moveTo":case"lineTo":l=v[0],u=v[1],v[0]=t*l+i*u+o,v[1]=n*l+s*u+a;break;case"bezierCurveTo":h=v[0],c=v[1],p=v[2],d=v[3],l=v[4],u=v[5],v[0]=t*h+i*c+o,v[1]=n*h+s*c+a,v[2]=t*p+i*d+o,v[3]=n*p+s*d+a,v[4]=t*l+i*u+o,v[5]=n*l+s*u+a;break;case"quadraticCurveTo":h=v[0],c=v[1],l=v[2],u=v[3],v[0]=t*h+i*c+o,v[1]=n*h+s*c+a,v[2]=t*l+i*u+o,v[3]=n*l+s*u+a;break;case"arcToSvg":l=v[5],u=v[6],f=v[0],g=v[1],v[0]=t*f+i*g,v[1]=n*f+s*g,v[5]=t*l+i*u+o,v[6]=n*l+s*u+a;break;case"rect":v[4]=Zn(v[4],e);break;case"ellipse":v[8]=Zn(v[8],e);break;case"roundRect":v[5]=Zn(v[5],e);break;case"addPath":v[0].transform(e);break;default:console.warn("unknown transform action",y.action);break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}_getLastPoint(e){let t=this.instructions.length-1,n=this.instructions[t];if(!n)return e.x=0,e.y=0,e;for(;n.action==="closePath";){if(t--,t<0)return e.x=0,e.y=0,e;n=this.instructions[t]}let i,s,o;switch(n.action){case"moveTo":case"lineTo":e.x=n.data[0],e.y=n.data[1];break;case"quadraticCurveTo":e.x=n.data[2],e.y=n.data[3];break;case"bezierCurveTo":e.x=n.data[4],e.y=n.data[5];break;case"arc":case"arcToSvg":e.x=n.data[5],e.y=n.data[6];break;case"addPath":e.x=n.data[0].lastX,e.y=n.data[2].lastY;break;case"rect":if(o=n.data[4],i=n.data[0],s=n.data[1],o){const{a,b:l,c:u,d:h,tx:c,ty:p}=o;e.x=a*i+u*s+c,e.y=l*i+h*s+p}else e.x=i,e.y=s;break;default:console.warn(`${n.action} is not supported yet`);break}return e}}function Zn(r,e){return r?r.prepend(e):e.clone()}var Nf=Object.defineProperty,La=Object.getOwnPropertySymbols,Wf=Object.prototype.hasOwnProperty,Hf=Object.prototype.propertyIsEnumerable,$a=(r,e,t)=>e in r?Nf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ir=(r,e)=>{for(var t in e||(e={}))Wf.call(e,t)&&$a(r,t,e[t]);if(La)for(var t of La(e))Hf.call(e,t)&&$a(r,t,e[t]);return r};function Da(r,e){if(typeof r=="string"){const n=document.createElement("div");n.innerHTML=r.trim(),r=n.querySelector("svg")}const t={context:e,path:new dt};return za(r,t,null,null),e}function za(r,e,t,n){const i=r.children,{fillStyle:s,strokeStyle:o}=jf(r);s&&t?t=Ir(Ir({},t),s):s&&(t=s),o&&n?n=Ir(Ir({},n),o):o&&(n=o),e.context.fillStyle=t,e.context.strokeStyle=n;let a,l,u,h,c,p,d,f,g,m,y,v,b,_,S,k,C;switch(r.nodeName.toLowerCase()){case"path":_=r.getAttribute("d"),S=new dt(_),e.context.path(S),t&&e.context.fill(),n&&e.context.stroke();break;case"circle":d=ie(r,"cx",0),f=ie(r,"cy",0),g=ie(r,"r",0),e.context.ellipse(d,f,g,g),t&&e.context.fill(),n&&e.context.stroke();break;case"rect":a=ie(r,"x",0),l=ie(r,"y",0),k=ie(r,"width",0),C=ie(r,"height",0),m=ie(r,"rx",0),y=ie(r,"ry",0),m||y?e.context.roundRect(a,l,k,C,m||y):e.context.rect(a,l,k,C),t&&e.context.fill(),n&&e.context.stroke();break;case"ellipse":d=ie(r,"cx",0),f=ie(r,"cy",0),m=ie(r,"rx",0),y=ie(r,"ry",0),e.context.beginPath(),e.context.ellipse(d,f,m,y),t&&e.context.fill(),n&&e.context.stroke();break;case"line":u=ie(r,"x1",0),h=ie(r,"y1",0),c=ie(r,"x2",0),p=ie(r,"y2",0),e.context.beginPath(),e.context.moveTo(u,h),e.context.lineTo(c,p),n&&e.context.stroke();break;case"polygon":b=r.getAttribute("points"),v=b.match(/\d+/g).map(P=>parseInt(P,10)),e.context.poly(v,!0),t&&e.context.fill(),n&&e.context.stroke();break;case"polyline":b=r.getAttribute("points"),v=b.match(/\d+/g).map(P=>parseInt(P,10)),e.context.poly(v,!1),n&&e.context.stroke();break;case"g":case"svg":break;default:{console.info(`[SVG parser] <${r.nodeName}> elements unsupported`);break}}for(let P=0;P<i.length;P++)za(i[P],e,t,n)}function ie(r,e,t){const n=r.getAttribute(e);return n?Number(n):t}function jf(r){const e=r.getAttribute("style"),t={},n={};let i=!1,s=!1;if(e){const o=e.split(";");for(let a=0;a<o.length;a++){const l=o[a],[u,h]=l.split(":");switch(u){case"stroke":h!=="none"&&(t.color=fe(h),s=!0);break;case"stroke-width":t.width=Number(h);break;case"fill":h!=="none"&&(i=!0,n.color=fe(h));break;case"fill-opacity":n.alpha=Number(h);break;case"stroke-opacity":t.alpha=Number(h);break;case"opacity":n.alpha=Number(h),t.alpha=Number(h);break}}}else{const o=r.getAttribute("stroke");o&&o!=="none"&&(s=!0,t.color=fe(o),t.width=ie(r,"stroke-width",1));const a=r.getAttribute("fill");a&&a!=="none"&&(i=!0,n.color=fe(a))}return{strokeStyle:s?t:null,fillStyle:i?n:null}}var Vf=Object.defineProperty,Yf=Object.defineProperties,Xf=Object.getOwnPropertyDescriptors,Na=Object.getOwnPropertySymbols,qf=Object.prototype.hasOwnProperty,Kf=Object.prototype.propertyIsEnumerable,Wa=(r,e,t)=>e in r?Vf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,tt=(r,e)=>{for(var t in e||(e={}))qf.call(e,t)&&Wa(r,t,e[t]);if(Na)for(var t of Na(e))Kf.call(e,t)&&Wa(r,t,e[t]);return r},Qn=(r,e)=>Yf(r,Xf(e));function Lt(r,e){if(!r)return null;let t,n;if(r!=null&&r.fill?(n=r.fill,t=tt(tt({},e),r)):(n=r,t=e),typeof n=="number"||typeof n=="string")return Qn(tt({},t),{color:fe(n),texture:A.WHITE});if(n instanceof Fr){const s=n;return Qn(tt({},t),{color:16777215,texture:s.texture,matrix:s.transform})}else if(n instanceof Je){const s=n;return s.buildLinearGradient(),Qn(tt({},t),{color:16777215,texture:s.texture,matrix:s.transform})}const i=tt(tt({},e),r);if(i.texture!==A.WHITE){const s=i.matrix||new R;s.scale(1/i.texture.frameWidth,1/i.texture.frameHeight),i.matrix=s,i.color=16777215}return i.color=fe(i.color),i}var Zf=Object.defineProperty,Ha=Object.getOwnPropertySymbols,Qf=Object.prototype.hasOwnProperty,Jf=Object.prototype.propertyIsEnumerable,ja=(r,e,t)=>e in r?Zf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Le=(r,e)=>{for(var t in e||(e={}))Qf.call(e,t)&&ja(r,t,e[t]);if(Ha)for(var t of Ha(e))Jf.call(e,t)&&ja(r,t,e[t]);return r};let em=0;const gt=new H,Va=new R,rt=class extends oe{constructor(){super(...arguments),this.uid=em++,this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new dt,this._transform=new R,this._fillStyle=Le({},rt.defaultFillStyle),this._fillStyleOriginal=16777215,this._strokeStyle=Le({},rt.defaultStrokeStyle),this._strokeStyleOriginal=16777215,this._stateStack=[],this._tick=0,this._bounds=new le,this._boundsDirty=!0}set fillStyle(r){if(this._fillStyleOriginal!==r)if(this._fillStyleOriginal=r,typeof r=="number"||typeof r=="string")this._fillStyle.color=fe(r),this._fillStyle.texture=A.WHITE;else if(r instanceof Fr){const e=r;this._fillStyle.color=16777215,this._fillStyle.texture=e.texture,this._fillStyle.matrix=e.transform}else if(r instanceof Je){const e=r;e.buildLinearGradient(),this._fillStyle.color=16777215,this._fillStyle.texture=e.texture,this._fillStyle.matrix=e.transform}else this._fillStyle=Le(Le({},rt.defaultFillStyle),r)}get fillStyle(){return this._fillStyleOriginal}set strokeStyle(r){if(this._strokeStyleOriginal!==r)if(this._strokeStyleOriginal=r,typeof r=="number"||typeof r=="string")this._strokeStyle.color=fe(r),this._strokeStyle.texture=A.WHITE;else if(r instanceof Je){const e=r;e.buildLinearGradient(),this._strokeStyle.color=16777215,this._strokeStyle.texture=e.texture,this._strokeStyle.matrix=e.transform}else this._strokeStyle=Le(Le({},rt.defaultStrokeStyle),r)}get strokeStyle(){return this._strokeStyleOriginal}setFillStyle(r){return this.fillStyle=r,this}setStrokeStyle(r){return this.strokeStyle=r,this}texture(r,e,t,n,i,s){return this.instructions.push({action:"texture",data:{image:r,dx:t||0,dy:n||0,dw:i||r.frameWidth,dh:s||r.frameHeight,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e||16777215}}),this.onUpdate(),this}beginPath(){return this._activePath=new dt,this}fill(r,e){let t;const n=this.instructions[this.instructions.length-1];if(this._tick===0&&n&&n.action==="stroke"?t=n.data.path:t=this._activePath.clone(),!t)return this;let i=this._fillStyle;return r&&(e!==void 0&&typeof r=="number"&&(U("8.0.0","GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),r={color:r,alpha:e}),i=Lt(r,rt.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:i,path:t}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this}stroke(r){let e;const t=this.instructions[this.instructions.length-1];if(this._tick===0&&t&&t.action==="fill"?e=t.data.path:e=this._activePath.clone(),!e)return this;let n=this._strokeStyle;return r&&(n=Lt(r,rt.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:n,path:e}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this}cut(){for(let r=0;r<2;r++){const e=this.instructions[this.instructions.length-1-r],t=this._activePath.clone();e&&(e.action==="stroke"||e.action==="fill")&&(e.data.hole=t)}return this._activePath.instructions.length=0,this}arc(r,e,t,n,i,s){this._tick++;const o=this._transform;return this._activePath.arc(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,t,n,i,s),this}arcTo(r,e,t,n,i){this._tick++;const s=this._transform;return this._activePath.arcTo(s.a*r+s.c*e+s.tx,s.b*r+s.d*e+s.ty,s.a*t+s.c*n+s.tx,s.b*t+s.d*n+s.ty,i),this}arcToSvg(r,e,t,n,i,s,o){this._tick++;const a=this._transform;return this._activePath.arcToSvg(r,e,t,n,i,a.a*s+a.c*o+a.tx,a.b*s+a.d*o+a.ty),this}bezierCurveTo(r,e,t,n,i,s){this._tick++;const o=this._transform;return this._activePath.bezierCurveTo(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,o.a*t+o.c*n+o.tx,o.b*t+o.d*n+o.ty,o.a*i+o.c*s+o.tx,o.b*i+o.d*s+o.ty),this}closePath(){var r;return this._tick++,(r=this._activePath)==null||r.closePath(),this}ellipse(r,e,t,n){return this._tick++,this._activePath.ellipse(r,e,t,n,this._transform.clone()),this}circle(r,e,t){return this._tick++,this._activePath.circle(r,e,t,this._transform.clone()),this}path(r){return this._tick++,this._activePath.addPath(r,this._transform.clone()),this}lineTo(r,e){this._tick++;const t=this._transform;return this._activePath.lineTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}moveTo(r,e){this._tick++;const t=this._transform;return this._activePath.moveTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}quadraticCurveTo(r,e,t,n){this._tick++;const i=this._transform;this._activePath.quadraticCurveTo(i.a*r+i.c*e+i.tx,i.b*r+i.d*e+i.ty,i.a*t+i.c*n+i.tx,i.b*t+i.d*n+i.ty)}rect(r,e,t,n){return this._tick++,this._activePath.rect(r,e,t,n,this._transform.clone()),this}roundRect(r,e,t,n,i){return this._tick++,this._activePath.roundRect(r,e,t,n,i,this._transform.clone()),this}poly(r,e){return this._tick++,this._activePath.poly(r,e,this._transform.clone()),this}star(r,e,t,n,i,s){return this._tick++,this._activePath.star(r,e,t,n,i,s,this._transform.clone()),this}svg(r){this._tick++,Da(r,this)}restore(){const r=this._stateStack.pop();r&&(this._transform=r.transform,this._fillStyle=r.fillStyle,this._strokeStyle=r.strokeStyle)}save(){this._stateStack.push({transform:this._transform.clone(),fillStyle:Le({},this._fillStyle),strokeStyle:Le({},this._strokeStyle)})}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(r){return this._transform.rotate(r),this}scale(r,e=r){return this._transform.scale(r,e),this}setTransform(r,e,t,n,i,s){return r instanceof R?(this._transform.set(r.a,r.b,r.c,r.d,r.tx,r.ty),this):(this._transform.set(r,e,t,n,i,s),this)}transform(r,e,t,n,i,s){return r instanceof R?(this._transform.append(r),this):(Va.set(r,e,t,n,i,s),this._transform.append(Va),this)}translate(r,e){return this._transform.translate(r,e),this}clear(){return this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this._boundsDirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;const r=this._bounds;r.clear();for(let e=0;e<this.instructions.length;e++){const t=this.instructions[e],n=t.action;if(n==="fill"){const i=t.data;r.addBounds(i.path.bounds)}else if(n==="texture"){const i=t.data;r.pushMatrix(i.transform),r.addFrame(i.dx,i.dy,i.dx+i.dw,i.dy+i.dh),r.popMatrix()}}return r}containsPoint(r){const e=this.instructions;let t=!1;return e.forEach(n=>{var i;const s=n.data,o=s.path;if(!n.action||!o)return;const a=s.style,l=(i=o.shapePath)==null?void 0:i.shapePrimitives;this._forEachShape(l,u=>{var h;if(!a||!u)return;typeof a!="number"&&a.matrix?a.matrix.applyInverse(r,gt):gt.copyFrom(r),t=u.contains(gt.x,gt.y);const c=s.hole;if(!c)return;const p=(h=c.shapePath)==null?void 0:h.shapePrimitives;p&&this._forEachShape(p,d=>{d.contains(gt.x,gt.y)&&(t=!1)})})}),t}_forEachShape(r,e){r==null||r.forEach(t=>{const n=t==null?void 0:t.shape;n&&e(n)})}destroy(r=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(e),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(e)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};let $e=rt;$e.defaultFillStyle={color:0,alpha:1,texture:A.WHITE},$e.defaultStrokeStyle={width:1,color:0,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:A.WHITE};const tm=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,rm=".svg",nm="image/svg+xml",Ya={extension:{type:x.LoadParser,priority:Be.Low},name:"loadSVG",test(r){return pt(r,nm)||ft(r,rm)},async testParse(r){return typeof r=="string"&&r.startsWith("data:image/svg+xml")||typeof r=="string"&&tm.test(r)},async parse(r){const e=new $e;return e.svg(r),e},async load(r){return(await I.ADAPTER.fetch(r)).text()},unload(r){r.destroy(!0)}};function Xa(r,e=1){var t;const n=(t=I.RETINA_PREFIX)==null?void 0:t.exec(r);return n?parseFloat(n[1]):e}let qa=0,Jn;const im="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",sm={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${im}');
            const imageBlob =  await response.blob();
            const imageBitmap = await createImageBitmap(imageBlob);

            return imageBitmap.width === 1 && imageBitmap.height === 1;
        }
        catch (e)
        {
            return false;
        }
    }
    checkImageBitmap().then((result) => { self.postMessage(result); });
    `},om={id:"loadImageBitmap",code:`
    async function loadImageBitmap(url)
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \`
                + \`\${response.status} \${response.statusText}\`);
        }

        const imageBlob =  await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);

        return imageBitmap;
    }
    self.onmessage = async (event) =>
    {
        try
        {
            const imageBitmap = await loadImageBitmap(event.data.data[0]);

            self.postMessage({
                data: imageBitmap,
                uuid: event.data.uuid,
                id: event.data.id,
            }, [imageBitmap]);
        }
        catch(e)
        {
            self.postMessage({
                error: e,
                uuid: event.data.uuid,
                id: event.data.id,
            });
        }
    };`};let ei;class am{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const t=URL.createObjectURL(new Blob([sm.code],{type:"application/javascript"})),n=new Worker(t);n.addEventListener("message",i=>{n.terminate(),URL.revokeObjectURL(t),e(i.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e){return this._run("loadImageBitmap",[e])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){Jn===void 0&&(Jn=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<Jn&&(ei||(ei=URL.createObjectURL(new Blob([om.code],{type:"application/javascript"}))),this._createdWorkers++,e=new Worker(ei),e.addEventListener("message",t=>{this._complete(t.data),this._returnWorker(t.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){e.error!==void 0?this._resolveHash[e.uuid].reject(e.error):this._resolveHash[e.uuid].resolve(e.data),this._resolveHash[e.uuid]=null}async _run(e,t){await this._initWorkers();const n=new Promise((i,s)=>{this._queue.push({id:e,arguments:t,resolve:i,reject:s})});return this._next(),n}_next(){if(!this._queue.length)return;const e=this._getWorker();if(!e)return;const t=this._queue.pop(),n=t.id;this._resolveHash[qa]={resolve:t.resolve,reject:t.reject},e.postMessage({data:t.arguments,uuid:qa++,id:n})}}const ti=new am;function Ka(r,e,t){const n=new A({source:r,label:t}),i=()=>{delete e.promiseCache[t],ee.has(t)&&ee.remove(t)};return n.once("destroy",()=>{t in e.promiseCache&&(console.warn("[Assets] A BaseTexture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the BaseTexture."),i())}),n.source.once("destroy",()=>{r.destroyed||(console.warn("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."),i())}),n}var lm=Object.defineProperty,Za=Object.getOwnPropertySymbols,um=Object.prototype.hasOwnProperty,hm=Object.prototype.propertyIsEnumerable,Qa=(r,e,t)=>e in r?lm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,cm=(r,e)=>{for(var t in e||(e={}))um.call(e,t)&&Qa(r,t,e[t]);if(Za)for(var t of Za(e))hm.call(e,t)&&Qa(r,t,e[t]);return r};const dm=[".jpeg",".jpg",".png",".webp",".avif"],pm=["image/jpeg","image/png","image/webp","image/avif"];async function Ja(r){const e=await I.ADAPTER.fetch(r);if(!e.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${r}: ${e.status} ${e.statusText}`);const t=await e.blob();return await createImageBitmap(t)}const ri={name:"loadTextures",extension:{type:x.LoadParser,priority:Be.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(r){return pt(r,pm)||ft(r,dm)},async load(r,e,t){var n;let i=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await ti.isImageBitmapSupported()?i=await ti.loadImageBitmap(r):i=await Ja(r):i=await new Promise(o=>{i=new Image,i.crossOrigin=this.config.crossOrigin,i.src=r,i.complete?o(i):i.onload=()=>{o(i)}});const s=new It(cm({resource:i,resolution:((n=e.data)==null?void 0:n.resolution)||Xa(r)},e.data));return Ka(s,t,r)},unload(r){r.destroy(!0)}},el={extension:x.ResolveParser,test:ri.test,parse:r=>{var e,t;return{resolution:parseFloat((t=(e=I.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:r.split(".").pop(),src:r}}};Z.add(ga,ya,va,Ta,xa,_a,wa,Sa,Pa,Ca,Ya,ri,el,ma,fa);const tl={loader:x.LoadParser,resolver:x.ResolveParser,cache:x.CacheParser,detection:x.DetectionParser};Z.handle(x.Asset,r=>{const e=r.ref;Object.entries(tl).filter(([t])=>!!e[t]).forEach(([t,n])=>{var i;return Z.add(Object.assign(e[t],{extension:(i=e[t].extension)!=null?i:n}))})},r=>{const e=r.ref;Object.keys(tl).filter(t=>!!e[t]).forEach(t=>Z.remove(e[t]))});class ne{constructor(e,t,n){this._x=t||0,this._y=n||0,this._observer=e}clone(e){return new ne(e!=null?e:this._observer,this._x,this._y)}set(e=0,t=e){return(this._x!==e||this._y!==t)&&(this._x=e,this._y=t,this._observer.onUpdate()),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this._observer.onUpdate()),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this._observer.onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this._observer.onUpdate(this))}}function rl(r,e,t){const n=r.length;let i;if(e>=n||t===0)return;t=e+t>n?n-e:t;const s=n-t;for(i=e;i<s;++i)r[i]=r[i+t];r.length=s}const nl={removeChildren(r=0,e){const t=e!=null?e:this.children.length,n=t-r,i=[];if(n>0&&n<=t){for(let s=t-1;s>=r;s--){const o=this.children[s];o&&(this.layerGroup&&this.layerGroup.removeChild(o),i.push(o),o.parent=null)}rl(this.children,r,t);for(let s=0;s<i.length;++s)this.emit("childRemoved",i[s],this,s),i[s].emit("removed",this);return i}else if(n===0&&this.children.length===0)return i;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(r){const e=this.getChildAt(r);return this.removeChild(e)},getChildAt(r){if(r<0||r>=this.children.length)throw new Error(`getChildAt: Index (${r}) does not exist.`);return this.children[r]},setChildIndex(r,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(r),this.addChildAt(r,e)},getChildIndex(r){const e=this.children.indexOf(r);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(r,e){const{children:t}=this;if(e<0||e>t.length)throw new Error(`${r}addChildAt: The index ${e} supplied is out of bounds ${t.length}`);if(r.parent){const n=r.parent.children.indexOf(r);if(r.parent===this&&n===e)return r;n!==-1&&r.parent.children.splice(n,1)}return e===t.length?t.push(r):t.splice(e,0,r),r.parent=this,r.didChange=!0,r.didViewUpdate=!1,r._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(r),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",r,this,e),r.emit("added",this),r},swapChildren(r,e){if(r===e)return;const t=this.getChildIndex(r),n=this.getChildIndex(e);this.children[t]=e,this.children[n]=r},removeFromParent(){var r;(r=this.parent)==null||r.removeChild(this)}};class Gr{constructor(e){this.pipe="filter",this.priority=1,this.filters=e==null?void 0:e.filters}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null}}const il=[];function sl(r){const e=il.pop()||new Gr;return e.filters=r,e}function ol(r){r.filters=null,il.push(r)}class al{constructor(e,t){this._pool=[],this._count=0,this._index=0,this._classType=e,t&&this.prepopulate(t)}prepopulate(e){for(let t=0;t<e;t++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){var t;let n;return this._index>0?n=this._pool[--this._index]:n=new this._classType,(t=n.init)==null||t.call(n,e),n}return(e){var t;(t=e.reset)==null||t.call(e),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._pool.length}get totalUsed(){return this._count-this._pool.length}}class ll{constructor(){this._poolsByClass=new Map}prepopulate(e,t){this.getPool(e).prepopulate(t)}get(e,t){return this.getPool(e).get(t)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new al(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(t=>{const n=e[t._classType.name]?t._classType.name+t._classType.ID:t._classType.name;e[n]={free:t.totalFree,used:t.totalUsed,size:t.totalSize}}),e}}const W=new ll;class ul{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this._tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let t=0;t<this._tests.length;t++){const n=this._tests[t];if(n.test(e))return W.get(n.maskClass,e)}return e}returnMaskEffect(e){W.return(e)}}const Lr=new ul;Z.handleByList(x.MaskEffect,Lr._effectClasses);const hl={_mask:null,_filters:null,set mask(r){if(this._mask||(this._mask={mask:null,effect:null}),this._mask.mask===r||(this._mask.effect&&(this.removeEffect(this._mask.effect),Lr.returnMaskEffect(this._mask.effect),this._mask.effect=null),this._mask.mask=r,r==null))return;const e=Lr.getMaskEffect(r);this._mask.effect=e,this.addEffect(e)},get mask(){var r;return(r=this._mask)==null?void 0:r.mask},set filters(r){if(!Array.isArray(r)&&r!==null&&(r=[r]),this._filters||(this._filters={filters:null,effect:null}),this._filters.filters===r||(this._filters.effect&&(this.removeEffect(this._filters.effect),ol(this._filters.effect),this._filters.effect=null),this._filters.filters=r,!r))return;const e=sl(r);this._filters.effect=e,this.addEffect(e)},get filters(){var r;return(r=this._filters)==null?void 0:r.filters}},cl={getChildByName(r,e=!1){return this.getChildByLabel(r,e)},getChildByLabel(r,e=!1){const t=this.children;for(let n=0;n<t.length;n++){const i=t[n];if(i.label===r||r instanceof RegExp&&r.test(i.label))return i}if(e)for(let n=0;n<t.length;n++){const i=t[n].getChildByLabel(r,!0);if(i)return i}return null},getChildrenByLabel(r,e=!1,t=[]){const n=this.children;for(let i=0;i<n.length;i++){const s=n[i];(s.label===r||r instanceof RegExp&&r.test(s.label))&&t.push(s)}if(e)for(let i=0;i<n.length;i++)n[i].getChildrenByLabel(r,!0,t);return t}};function ke(r,e){const t=e._scale,n=e._pivot,i=e._position,s=t._x,o=t._y,a=n._x,l=n._y;r.a=e._cx*s,r.b=e._sx*s,r.c=e._cy*o,r.d=e._sy*o,r.tx=i._x-(a*r.a+l*r.c),r.ty=i._y-(a*r.b+l*r.d)}function $t(r,e,t){t.clear();let n;return r.parent?e?n=r.parent.worldTransform:n=Dt(r,new R):n=R.IDENTITY,ni(r,t,n,e),t.isValid||t.set(0,0,0,0),t}function ni(r,e,t,n){var i,s;if(!r.visible||!r.measurable)return;let o;n?o=r.worldTransform:(r.didChange&&ke(r.localTransform,r),o=R.shared.appendFrom(r.localTransform,t).clone());const a=e,l=!!r.effects.length;l&&(e=e.clone()),r.view&&(e.setMatrix(o),r.view.addBounds(e));for(let u=0;u<r.children.length;u++)ni(r.children[u],e,o,n);if(l){for(let u=0;u<r.effects.length;u++)(s=(i=r.effects[u]).addBounds)==null||s.call(i,e);a.setMatrix(R.IDENTITY),a.addBounds(e)}}function Dt(r,e){const t=r.parent;return t&&(Dt(t,e),t.didChange&&ke(t.localTransform,t),e.append(t.localTransform)),e}function De(r,e,t){e.clear(),t||(t=new R),r.view&&(e.setMatrix(t),r.view.addBounds(e));for(let n=0;n<r.children.length;n++)dl(r.children[n],e,t,r);return e.isValid||e.set(0,0,0,0),e}function dl(r,e,t,n){var i,s;if(!r.visible||!r.measurable)return;r.didChange&&ke(r.localTransform,r);const o=r.localTransform,a=R.shared.appendFrom(o,t).clone(),l=e,u=!!r.effects.length;u&&(e=new le),r.view&&(e.setMatrix(a),r.view.addBounds(e));for(let h=0;h<r.children.length;h++)dl(r.children[h],e,a,n);if(u){for(let h=0;h<r.effects.length;h++)(s=(i=r.effects[h]).addLocalBounds)==null||s.call(i,e,n);l.setMatrix(R.IDENTITY),l.addBounds(e)}}function pl(r,e,t){const n=r.parent;if(!n){console.warn("Item is not inside the root container");return}n!==e&&(pl(n,e,t),ke(n.localTransform,n),t.append(n.localTransform))}const zt=new le,Nt=new R,fl={get width(){return Math.abs(this.scale.x*De(this,zt,Nt).width)},set width(r){const e=De(this,zt,Nt).width;e!==0?this.scale.x=r/e:this.scale.x=1},get height(){return Math.abs(this.scale.y*De(this,zt,Nt).height)},set height(r){const e=De(this,zt,Nt).height;e!==0?this.scale.y=r/e:this.scale.y=1},getLocalBounds(r){const e=De(this,new le,Nt);return r?r.copyFromBounds(e):e.rectangle.clone()},getBounds(r,e){const t=$t(this,r,zt);return e?e.copyFromBounds(t):t.rectangle.clone()}},ml={_onRender:null,set onRender(r){const e=this.layerGroup;if(!r){this._onRender&&(e==null||e.removeOnRender(this)),this._onRender=null;return}this._onRender||e==null||e.addOnRender(this),this._onRender=r},get onRender(){return this._onRender}},gl={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(r){this._zIndex!==r&&(this._zIndex=r,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(fm))}};function fm(r,e){return r._zIndex-e._zIndex}const vl={getGlobalPosition(r=new H,e=!1){return this.parent?this.parent.toGlobal(this._position,r,e):(r.x=this._position.x,r.y=this._position.y),r},toGlobal(r,e,t=!1){if(!t){this.didChange&&ke(this.localTransform,this);const n=Dt(this,new R);return n.append(this.localTransform),n.apply(r,e)}return this.worldTransform.apply(r,e)},toLocal(r,e,t,n){if(e&&(r=e.toGlobal(r,t,n)),!n){this.didChange&&ke(this.localTransform,this);const i=Dt(this,new R);return i.append(this.localTransform),i.applyInverse(r,t)}return this.worldTransform.applyInverse(r,t)}};let mm=0;class ii{constructor(){this.uid=mm++,this.instructions=[],this.instructionSize=0}reset(){this.instructionSize=0}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}lastInstruction(){return this.instructions[this.instructionSize-1]}}class bl{constructor(e){this.type="layer",this.root=null,this.canBundle=!1,this.layerGroupParent=null,this.layerGroupChildren=[],this._children=[],this.worldTransform=new R,this.worldColor=4294967295,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new ii,this._onRenderContainers=[],this.root=e,this.addChild(e)}get localTransform(){return this.root.localTransform}get layerTransform(){return this.root.layerTransform}addLayerGroupChild(e){e.layerGroupParent&&e.layerGroupParent._removeLayerGroupChild(e),e.layerGroupParent=this,this.onChildUpdate(e.root),this.layerGroupChildren.push(e)}_removeLayerGroupChild(e){e.root.didChange&&this._removeChildFromUpdate(e.root);const t=this.layerGroupChildren.indexOf(e);t>-1&&this.layerGroupChildren.splice(t,1),e.layerGroupParent=null}addChild(e){if(this.structureDidChange=!0,e!==this.root&&(this._children.push(e),e.updateTick=-1,e.parent===this.root?e.relativeLayerDepth=1:e.relativeLayerDepth=e.parent.relativeLayerDepth+1,e._onRender&&this.addOnRender(e)),e.layerGroup){if(e.layerGroup.root===e){this.addLayerGroupChild(e.layerGroup);return}}else e.layerGroup=this,e.didChange=!0;const t=e.children;e.isLayerRoot||this.onChildUpdate(e);for(let n=0;n<t.length;n++)this.addChild(t[n])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&this.removeOnRender(e),e.layerGroup.root!==e){const n=e.children;for(let i=0;i<n.length;i++)this.removeChild(n[i]);e.didChange&&e.layerGroup._removeChildFromUpdate(e),e.layerGroup=null}else this._removeLayerGroupChild(e.layerGroup);const t=this._children.indexOf(e);t>-1&&this._children.splice(t,1)}onChildUpdate(e){let t=this.childrenToUpdate[e.relativeLayerDepth];t||(t=this.childrenToUpdate[e.relativeLayerDepth]={index:0,list:[]}),t.list[t.index++]=e}updateRenderable(e){e.layerVisibleRenderable<3||(e.didViewUpdate=!1,this.instructionSet.renderPipes[e.view.renderPipeId].updateRenderable(e))}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}_removeChildFromUpdate(e){const t=this.childrenToUpdate[e.relativeLayerDepth];if(!t)return;const n=t.list.indexOf(e);n>-1&&t.list.splice(n,1),t.index--}get isRenderable(){const e=this.worldColor>>24&255;return this.root.localVisibleRenderable===3&&e>0}addOnRender(e){this._onRenderContainers.push(e)}removeOnRender(e){this._onRenderContainers.splice(this._onRenderContainers.indexOf(e),1)}runOnRender(){this._onRenderContainers.forEach(e=>{e._onRender()})}}let yl=0;function si(){return yl++}const xl=new ne(null),oi=new ne(null),ai=new ne(null,1,1),$r=1,li=2,Dr=4,gm=8;class Y extends oe{constructor({label:e,layer:t,view:n,sortableChildren:i}={}){super(),this.uid=yl++,this.label=null,this._updateFlags=15,this.isLayerRoot=!1,this.layerGroup=null,this.didChange=!1,this.didViewUpdate=!1,this.relativeLayerDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new R,this.layerTransform=new R,this.destroyed=!1,this._position=new ne(this,0,0),this._scale=ai,this._pivot=oi,this._skew=xl,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=4294967295,this.layerColor=4294967295,this.localBlendMode="inherit",this.layerBlendMode="normal",this.localVisibleRenderable=3,this.layerVisibleRenderable=3,this.effects=[],e&&(this.label=e),t&&this.enableLayer(),n&&(this.view=n,this.view.owner=this),this.sortableChildren=!!i}static mixin(e){Object.defineProperties(Y.prototype,Object.getOwnPropertyDescriptors(e))}get name(){return U("8.0.0","Container.name property has been removed, use Container.label instead"),this.label}set name(e){U("8.0.0","Container.name property has been removed, use Container.label instead"),this.label=e}addEffect(e){this.effects.indexOf(e)===-1&&(this.effects.push(e),this.effects.sort((t,n)=>t.priority-n.priority),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())}removeEffect(e){const t=this.effects.indexOf(e);t!==-1&&(this.effects.splice(t,1),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())}addChild(...e){if(e.length>1){for(let n=0;n<e.length;n++)this.addChild(e[n]);return e[0]}const t=e[0];return t.parent===this?(this.children.splice(this.children.indexOf(t),1),this.children.push(t),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),t):(t.parent&&t.parent.removeChild(t),this.children.push(t),this.sortableChildren&&(this.sortDirty=!0),t.parent=this,t.didChange=!0,t.didViewUpdate=!1,t._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(t),this.emit("childAdded",t,this,this.children.length-1),t.emit("added",this),t._zIndex!==0&&t.depthOfChildModified(),t)}removeChild(...e){if(e.length>1){for(let i=0;i<e.length;i++)this.removeChild(e[i]);return e[0]}const t=e[0],n=this.children.indexOf(t);return n>-1&&(this.children.splice(n,1),this.layerGroup&&this.layerGroup.removeChild(t)),t.parent=null,this.emit("childRemoved",t,this,n),t.emit("removed",this),t}onUpdate(e){if(e&&e===this._skew&&this._updateSkew(),!this.didChange)if(this.didChange=!0,this.isLayerRoot){const t=this.layerGroup.layerGroupParent;t&&t.onChildUpdate(this)}else this.layerGroup&&this.layerGroup.onChildUpdate(this)}onViewUpdate(){this.didViewUpdate||(this.didViewUpdate=!0,this.layerGroup&&this.layerGroup.onChildViewUpdate(this))}set layer(e){if(this.isLayerRoot&&e===!1)throw new Error("[Pixi] cannot undo a layer just yet");e&&this.enableLayer()}get layer(){return this.isLayerRoot}enableLayer(){if(this.layerGroup&&this.layerGroup.root===this)return;this.isLayerRoot=!0;const e=this.layerGroup;if(e&&e.removeChild(this),this.layerGroup=new bl(this),e){for(let t=0;t<e.layerGroupChildren.length;t++){const n=e.layerGroupChildren[t];let i=n.root;for(;i;){if(i===this){this.layerGroup.addLayerGroupChild(n);break}i=i.parent}}e.addLayerGroupChild(this.layerGroup)}this._updateIsSimple()}get worldTransform(){return this._worldTransform||(this._worldTransform=new R),this.layerGroup&&(this.isLayerRoot?this._worldTransform.copyFrom(this.layerGroup.worldTransform):this._worldTransform.appendFrom(this.layerTransform,this.layerGroup.worldTransform)),this._worldTransform}get x(){return this._position.x}set x(e){this._position.x=e}get y(){return this._position.y}set y(e){this._position.y=e}get position(){return this._position}set position(e){this._position.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.onUpdate(this._skew))}get angle(){return this.rotation*ha}set angle(e){this.rotation=e*ca}get pivot(){return this._pivot===oi&&(this._pivot=new ne(this,0,0)),this._pivot}set pivot(e){this._pivot===oi&&(this._pivot=new ne(this,0,0)),this._pivot.copyFrom(e)}get skew(){return this._skew===xl&&(this._skew=new ne(this,0,0)),this._skew}get scale(){return this._scale===ai&&(this._scale=new ne(this,1,1)),this._scale}set scale(e){this._scale===ai&&(this._scale=new ne(this,0,0)),this._scale.copyFrom(e)}_updateSkew(){const e=this._rotation,t=this._skew;this._cx=Math.cos(e+t._y),this._sx=Math.sin(e+t._y),this._cy=-Math.sin(e-t._x),this._sy=Math.cos(e-t._x)}set alpha(e){e=e*255|0,e!==(this.localColor>>24&255)&&(this.localColor=this.localColor&16777215|e<<24,this._updateFlags|=$r,this.onUpdate())}get alpha(){return(this.localColor>>24&255)/255}set tint(e){e=fe(e),e=((e&255)<<16)+(e&65280)+(e>>16&255),e!==(this.localColor&16777215)&&(this.localColor=this.localColor&4278190080|e&16777215,this._updateFlags|=$r,this.onUpdate())}get tint(){const e=this.localColor&16777215;return((e&255)<<16)+(e&65280)+(e>>16&255)}set blendMode(e){this.localBlendMode!==e&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=li,this.localBlendMode=e,this.onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localVisibleRenderable&2)}set visible(e){const t=e?1:0;(this.localVisibleRenderable&2)>>1!==t&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=Dr,this.localVisibleRenderable=this.localVisibleRenderable&1|t<<1,this.onUpdate())}get renderable(){return!!(this.localVisibleRenderable&1)}set renderable(e){const t=e?1:0;(this.localVisibleRenderable&1)!==t&&(this.localVisibleRenderable=this.localVisibleRenderable&2|t,this._updateFlags|=Dr,this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.onUpdate())}get isRenderable(){const e=this.layerColor>>24&255;return this.localVisibleRenderable===3&&e>0}_updateIsSimple(){this.isSimple=!this.isLayerRoot&&this.effects.length===0}destroy(e=!1){if(this.destroyed)return;this.destroyed=!0,this.removeFromParent(),this.parent=null,this._mask=null,this._filters=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed"),this.removeAllListeners();const t=typeof e=="boolean"?e:e==null?void 0:e.children,n=this.removeChildren(0,this.children.length);if(t)for(let i=0;i<n.length;++i)n[i].destroy(e);this.view&&(this.view.destroy(e),this.view.owner=null)}}Y.mixin(nl),Y.mixin(vl),Y.mixin(ml),Y.mixin(fl),Y.mixin(hl),Y.mixin(cl),Y.mixin(gl);class vm{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){this._tickerAdded||!this.domElement||(Pe.system.add(this._tickerUpdate,this,Ve.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(Pe.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const e=this.events._rootPointerEvent;this.events.supportsTouchEvents&&e.pointerType==="touch"||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY}))}_tickerUpdate(e){this._deltaTime+=e.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this._update())}}const Oe=new vm;class _r{constructor(e){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=_r.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new H,this.page=new H,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=e}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(e,t,n){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(e,t,n,i,s){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}class Wt extends _r{constructor(){super(...arguments),this.client=new H,this.movement=new H,this.offset=new H,this.global=new H,this.screen=new H}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(e,t,n){return e.worldTransform.applyInverse(n||this.global,t)}getModifierState(e){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(e)}initMouseEvent(e,t,n,i,s,o,a,l,u,h,c,p,d,f,g){throw new Error("Method not implemented.")}}class xe extends Wt{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class nt extends Wt{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}nt.DOM_DELTA_PIXEL=0,nt.DOM_DELTA_LINE=1,nt.DOM_DELTA_PAGE=2;const bm=2048,ym=new H,Ht=new H;class _l{constructor(e){this.dispatch=new oe,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,t){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:t,priority:0}),this.mappingTable[e].sort((n,i)=>n.priority-i.priority)}dispatchEvent(e,t){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,t),this.dispatch.emit(t||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const t=this.mappingTable[e.type];if(t)for(let n=0,i=t.length;n<i;n++)t[n].fn(e);else console.warn(`[EventBoundary]: Event mapping not defined for ${e.type}`)}hitTest(e,t){Oe.pauseUpdate=!0;const n=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",i=this[n](this.rootTarget,this.rootTarget.eventMode,ym.set(e,t),this.hitTestFn,this.hitPruneFn);return i&&i[0]}propagate(e,t){if(!e.target)return;const n=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let i=0,s=n.length-1;i<s;i++)if(e.currentTarget=n[i],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,t),!(e.propagationStopped||e.propagationImmediatelyStopped)){e.eventPhase=e.BUBBLING_PHASE;for(let i=n.length-2;i>=0;i--)if(e.currentTarget=n[i],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,t,n=this._allInteractiveElements){if(n.length===0)return;e.eventPhase=e.BUBBLING_PHASE;const i=Array.isArray(t)?t:[t];for(let s=n.length-1;s>=0;s--)i.forEach(o=>{e.currentTarget=n[s],this.notifyTarget(e,o)})}propagationPath(e){const t=[e];for(let n=0;n<bm&&e!==this.rootTarget&&e.parent;n++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");t.push(e.parent),e=e.parent}return t.reverse(),t}hitTestMoveRecursive(e,t,n,i,s,o=!1){let a=!1;if(this._interactivePrune(e))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Oe.pauseUpdate=!1),e.interactiveChildren&&e.children){const h=e.children;for(let c=h.length-1;c>=0;c--){const p=h[c],d=this.hitTestMoveRecursive(p,this._isInteractive(t)?t:p.eventMode,n,i,s,o||s(e,n));if(d){if(d.length>0&&!d[d.length-1].parent)continue;const f=e.isInteractive();(d.length>0||f)&&(f&&this._allInteractiveElements.push(e),d.push(e)),this._hitElements.length===0&&(this._hitElements=d),a=!0}}}const l=this._isInteractive(t),u=e.isInteractive();return u&&u&&this._allInteractiveElements.push(e),o||this._hitElements.length>0?null:a?this._hitElements:l&&!s(e,n)&&i(e,n)?u?[e]:[]:null}hitTestRecursive(e,t,n,i,s){if(this._interactivePrune(e)||s(e,n))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Oe.pauseUpdate=!1),e.interactiveChildren&&e.children){const l=e.children,u=n;for(let h=l.length-1;h>=0;h--){const c=l[h],p=this.hitTestRecursive(c,this._isInteractive(t)?t:c.eventMode,u,i,s);if(p){if(p.length>0&&!p[p.length-1].parent)continue;const d=e.isInteractive();return(p.length>0||d)&&p.push(e),p}}}const o=this._isInteractive(t),a=e.isInteractive();return o&&i(e,n)?a?[e]:[]:null}_isInteractive(e){return e==="static"||e==="dynamic"}_interactivePrune(e){return!e||!e.visible||!e.renderable||e.eventMode==="none"||e.eventMode==="passive"&&!e.interactiveChildren}hitPruneFn(e,t){if(e.hitArea&&(e.worldTransform.applyInverse(t,Ht),!e.hitArea.contains(Ht.x,Ht.y)))return!0;if(e.effects&&e.effects.length)for(let n=0;n<e.effects.length;n++){const i=e.effects[n];if(i.containsPoint&&!i.containsPoint(t,this.hitTestFn))return!0}return!1}hitTestFn(e,t){var n;return e.eventMode==="passive"?!1:e.hitArea?!0:(n=e.view)!=null&&n.containsPoint?(e.worldTransform.applyInverse(t,Ht),e.view.containsPoint(Ht)):!1}notifyTarget(e,t){var n,i;t=t!=null?t:e.type;const s=`on${t}`;(i=(n=e.currentTarget)[s])==null||i.call(n,e);const o=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${t}capture`:t;this._notifyListeners(e,o),e.eventPhase===e.AT_TARGET&&this._notifyListeners(e,t)}mapPointerDown(e){if(!(e instanceof xe)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.createPointerEvent(e);if(this.dispatchEvent(t,"pointerdown"),t.pointerType==="touch")this.dispatchEvent(t,"touchstart");else if(t.pointerType==="mouse"||t.pointerType==="pen"){const i=t.button===2;this.dispatchEvent(t,i?"rightdown":"mousedown")}const n=this.trackingData(e.pointerId);n.pressTargetsByButton[e.button]=t.composedPath(),this.freeEvent(t)}mapPointerMove(e){var t,n,i;if(!(e instanceof xe)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const s=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const o=s.pointerType==="mouse"||s.pointerType==="pen",a=this.trackingData(e.pointerId),l=this.findMountedTarget(a.overTargets);if(((t=a.overTargets)==null?void 0:t.length)>0&&l!==s.target){const c=e.type==="mousemove"?"mouseout":"pointerout",p=this.createPointerEvent(e,c,l);if(this.dispatchEvent(p,"pointerout"),o&&this.dispatchEvent(p,"mouseout"),!s.composedPath().includes(l)){const d=this.createPointerEvent(e,"pointerleave",l);for(d.eventPhase=d.AT_TARGET;d.target&&!s.composedPath().includes(d.target);)d.currentTarget=d.target,this.notifyTarget(d),o&&this.notifyTarget(d,"mouseleave"),d.target=d.target.parent;this.freeEvent(d)}this.freeEvent(p)}if(l!==s.target){const c=e.type==="mousemove"?"mouseover":"pointerover",p=this.clonePointerEvent(s,c);this.dispatchEvent(p,"pointerover"),o&&this.dispatchEvent(p,"mouseover");let d=l==null?void 0:l.parent;for(;d&&d!==this.rootTarget.parent&&d!==s.target;)d=d.parent;if(!d||d===this.rootTarget.parent){const f=this.clonePointerEvent(s,"pointerenter");for(f.eventPhase=f.AT_TARGET;f.target&&f.target!==l&&f.target!==this.rootTarget.parent;)f.currentTarget=f.target,this.notifyTarget(f),o&&this.notifyTarget(f,"mouseenter"),f.target=f.target.parent;this.freeEvent(f)}this.freeEvent(p)}const u=[],h=(n=this.enableGlobalMoveEvents)!=null?n:!0;this.moveOnAll?u.push("pointermove"):this.dispatchEvent(s,"pointermove"),h&&u.push("globalpointermove"),s.pointerType==="touch"&&(this.moveOnAll?u.splice(1,0,"touchmove"):this.dispatchEvent(s,"touchmove"),h&&u.push("globaltouchmove")),o&&(this.moveOnAll?u.splice(1,0,"mousemove"):this.dispatchEvent(s,"mousemove"),h&&u.push("globalmousemove"),this.cursor=(i=s.target)==null?void 0:i.cursor),u.length>0&&this.all(s,u),this._allInteractiveElements.length=0,this._hitElements.length=0,a.overTargets=s.composedPath(),this.freeEvent(s)}mapPointerOver(e){var t;if(!(e instanceof xe)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const n=this.trackingData(e.pointerId),i=this.createPointerEvent(e),s=i.pointerType==="mouse"||i.pointerType==="pen";this.dispatchEvent(i,"pointerover"),s&&this.dispatchEvent(i,"mouseover"),i.pointerType==="mouse"&&(this.cursor=(t=i.target)==null?void 0:t.cursor);const o=this.clonePointerEvent(i,"pointerenter");for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),s&&this.notifyTarget(o,"mouseenter"),o.target=o.target.parent;n.overTargets=i.composedPath(),this.freeEvent(i),this.freeEvent(o)}mapPointerOut(e){if(!(e instanceof xe)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId);if(t.overTargets){const n=e.pointerType==="mouse"||e.pointerType==="pen",i=this.findMountedTarget(t.overTargets),s=this.createPointerEvent(e,"pointerout",i);this.dispatchEvent(s),n&&this.dispatchEvent(s,"mouseout");const o=this.createPointerEvent(e,"pointerleave",i);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),n&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;t.overTargets=null,this.freeEvent(s),this.freeEvent(o)}this.cursor=null}mapPointerUp(e){if(!(e instanceof xe)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=performance.now(),n=this.createPointerEvent(e);if(this.dispatchEvent(n,"pointerup"),n.pointerType==="touch")this.dispatchEvent(n,"touchend");else if(n.pointerType==="mouse"||n.pointerType==="pen"){const a=n.button===2;this.dispatchEvent(n,a?"rightup":"mouseup")}const i=this.trackingData(e.pointerId),s=this.findMountedTarget(i.pressTargetsByButton[e.button]);let o=s;if(s&&!n.composedPath().includes(s)){let a=s;for(;a&&!n.composedPath().includes(a);){if(n.currentTarget=a,this.notifyTarget(n,"pointerupoutside"),n.pointerType==="touch")this.notifyTarget(n,"touchendoutside");else if(n.pointerType==="mouse"||n.pointerType==="pen"){const l=n.button===2;this.notifyTarget(n,l?"rightupoutside":"mouseupoutside")}a=a.parent}delete i.pressTargetsByButton[e.button],o=a}if(o){const a=this.clonePointerEvent(n,"click");a.target=o,a.path=null,i.clicksByButton[e.button]||(i.clicksByButton[e.button]={clickCount:0,target:a.target,timeStamp:t});const l=i.clicksByButton[e.button];if(l.target===a.target&&t-l.timeStamp<200?++l.clickCount:l.clickCount=1,l.target=a.target,l.timeStamp=t,a.detail=l.clickCount,a.pointerType==="mouse"){const u=a.button===2;this.dispatchEvent(a,u?"rightclick":"click")}else a.pointerType==="touch"&&this.dispatchEvent(a,"tap");this.dispatchEvent(a,"pointertap"),this.freeEvent(a)}this.freeEvent(n)}mapPointerUpOutside(e){if(!(e instanceof xe)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId),n=this.findMountedTarget(t.pressTargetsByButton[e.button]),i=this.createPointerEvent(e);if(n){let s=n;for(;s;)i.currentTarget=s,this.notifyTarget(i,"pointerupoutside"),i.pointerType==="touch"?this.notifyTarget(i,"touchendoutside"):(i.pointerType==="mouse"||i.pointerType==="pen")&&this.notifyTarget(i,i.button===2?"rightupoutside":"mouseupoutside"),s=s.parent;delete t.pressTargetsByButton[e.button]}this.freeEvent(i)}mapWheel(e){if(!(e instanceof nt)){console.warn("EventBoundary cannot map a non-wheel event as a wheel event");return}const t=this.createWheelEvent(e);this.dispatchEvent(t),this.freeEvent(t)}findMountedTarget(e){if(!e)return null;let t=e[0];for(let n=1;n<e.length&&e[n].parent===t;n++)t=e[n];return t}createPointerEvent(e,t,n){var i;const s=this.allocateEvent(xe);return this.copyPointerData(e,s),this.copyMouseData(e,s),this.copyData(e,s),s.nativeEvent=e.nativeEvent,s.originalEvent=e,s.target=(i=n!=null?n:this.hitTest(s.global.x,s.global.y))!=null?i:this._hitElements[0],typeof t=="string"&&(s.type=t),s}createWheelEvent(e){const t=this.allocateEvent(nt);return this.copyWheelData(e,t),this.copyMouseData(e,t),this.copyData(e,t),t.nativeEvent=e.nativeEvent,t.originalEvent=e,t.target=this.hitTest(t.global.x,t.global.y),t}clonePointerEvent(e,t){const n=this.allocateEvent(xe);return n.nativeEvent=e.nativeEvent,n.originalEvent=e.originalEvent,this.copyPointerData(e,n),this.copyMouseData(e,n),this.copyData(e,n),n.target=e.target,n.path=e.composedPath().slice(),n.type=t!=null?t:n.type,n}copyWheelData(e,t){t.deltaMode=e.deltaMode,t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ}copyPointerData(e,t){e instanceof xe&&t instanceof xe&&(t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist)}copyMouseData(e,t){e instanceof Wt&&t instanceof Wt&&(t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.copyFrom(e.client),t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.copyFrom(e.movement),t.screen.copyFrom(e.screen),t.shiftKey=e.shiftKey,t.global.copyFrom(e.global))}copyData(e,t){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.detail=e.detail,t.view=e.view,t.which=e.which,t.layer.copyFrom(e.layer),t.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const t=this.eventPool.get(e).pop()||new e(this);return t.eventPhase=t.NONE,t.currentTarget=null,t.path=null,t.target=null,t}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const t=e.constructor;this.eventPool.has(t)||this.eventPool.set(t,[]),this.eventPool.get(t).push(e)}_notifyListeners(e,t){const n=e.currentTarget._events[t];if(n&&e.currentTarget.isInteractive())if("fn"in n)n.once&&e.currentTarget.removeListener(t,n.fn,void 0,!0),n.fn.call(n.context,e);else for(let i=0,s=n.length;i<s&&!e.propagationImmediatelyStopped;i++)n[i].once&&e.currentTarget.removeListener(t,n[i].fn,void 0,!0),n[i].fn.call(n[i].context,e)}}var xm=Object.defineProperty,wl=Object.getOwnPropertySymbols,_m=Object.prototype.hasOwnProperty,wm=Object.prototype.propertyIsEnumerable,Tl=(r,e,t)=>e in r?xm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Tm=(r,e)=>{for(var t in e||(e={}))_m.call(e,t)&&Tl(r,t,e[t]);if(wl)for(var t of wl(e))wm.call(e,t)&&Tl(r,t,e[t]);return r};const Sm=1,Pm={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},ui=class{constructor(r){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=r,this.rootBoundary=new _l(null),Oe.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new xe(null),this._rootWheelEvent=new nt(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy(Tm({},ui.defaultEventFeatures),{set:(e,t,n)=>(t==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=n),e[t]=n,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(r){var e,t;const{element:n,resolution:i}=this.renderer;this.setTargetElement(n),this.resolution=i,ui._defaultEventMode=(e=r.eventMode)!=null?e:"auto",Object.assign(this.features,(t=r.eventFeatures)!=null?t:{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(r){this.resolution=r}destroy(){this.setTargetElement(null),this.renderer=null}setCursor(r){r=r||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this._currentCursor===r)return;this._currentCursor=r;const t=this.cursorStyles[r];if(t)switch(typeof t){case"string":e&&(this.domElement.style.cursor=t);break;case"function":t(r);break;case"object":e&&Object.assign(this.domElement.style,t);break}else e&&typeof r=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,r)&&(this.domElement.style.cursor=r)}get pointer(){return this._rootPointerEvent}_onPointerDown(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(r);this.autoPreventDefault&&e[0].isNormalized&&(r.cancelable||!("cancelable"in r))&&r.preventDefault();for(let t=0,n=e.length;t<n;t++){const i=e[t],s=this._bootstrapEvent(this._rootPointerEvent,i);this.rootBoundary.mapEvent(s)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(r){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,Oe.pointerMoved();const e=this._normalizeToPointerData(r);for(let t=0,n=e.length;t<n;t++){const i=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=r.target;r.composedPath&&r.composedPath().length>0&&(e=r.composedPath()[0]);const t=e!==this.domElement?"outside":"",n=this._normalizeToPointerData(r);for(let i=0,s=n.length;i<s;i++){const o=this._bootstrapEvent(this._rootPointerEvent,n[i]);o.type+=t,this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(r);for(let t=0,n=e.length;t<n;t++){const i=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}onWheel(r){if(!this.features.wheel)return;const e=this.normalizeWheelEvent(r);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}setTargetElement(r){this._removeEvents(),this.domElement=r,Oe.domElement=r,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;Oe.addTickerListener();const r=this.domElement.style;r&&(globalThis.navigator.msPointerEnabled?(r.msContentZooming="none",r.msTouchAction="none"):this.supportsPointerEvents&&(r.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;Oe.removeTickerListener();const r=this.domElement.style;globalThis.navigator.msPointerEnabled?(r.msContentZooming="",r.msTouchAction=""):this.supportsPointerEvents&&(r.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(r,e,t){const n=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},i=1/this.resolution;r.x=(e-n.left)*(this.domElement.width/n.width)*i,r.y=(t-n.top)*(this.domElement.height/n.height)*i}_normalizeToPointerData(r){const e=[];if(this.supportsTouchEvents&&r instanceof TouchEvent)for(let t=0,n=r.changedTouches.length;t<n;t++){const i=r.changedTouches[t];typeof i.button=="undefined"&&(i.button=0),typeof i.buttons=="undefined"&&(i.buttons=1),typeof i.isPrimary=="undefined"&&(i.isPrimary=r.touches.length===1&&r.type==="touchstart"),typeof i.width=="undefined"&&(i.width=i.radiusX||1),typeof i.height=="undefined"&&(i.height=i.radiusY||1),typeof i.tiltX=="undefined"&&(i.tiltX=0),typeof i.tiltY=="undefined"&&(i.tiltY=0),typeof i.pointerType=="undefined"&&(i.pointerType="touch"),typeof i.pointerId=="undefined"&&(i.pointerId=i.identifier||0),typeof i.pressure=="undefined"&&(i.pressure=i.force||.5),typeof i.twist=="undefined"&&(i.twist=0),typeof i.tangentialPressure=="undefined"&&(i.tangentialPressure=0),typeof i.layerX=="undefined"&&(i.layerX=i.offsetX=i.clientX),typeof i.layerY=="undefined"&&(i.layerY=i.offsetY=i.clientY),i.isNormalized=!0,i.type=r.type,e.push(i)}else if(!globalThis.MouseEvent||r instanceof MouseEvent&&(!this.supportsPointerEvents||!(r instanceof globalThis.PointerEvent))){const t=r;typeof t.isPrimary=="undefined"&&(t.isPrimary=!0),typeof t.width=="undefined"&&(t.width=1),typeof t.height=="undefined"&&(t.height=1),typeof t.tiltX=="undefined"&&(t.tiltX=0),typeof t.tiltY=="undefined"&&(t.tiltY=0),typeof t.pointerType=="undefined"&&(t.pointerType="mouse"),typeof t.pointerId=="undefined"&&(t.pointerId=Sm),typeof t.pressure=="undefined"&&(t.pressure=.5),typeof t.twist=="undefined"&&(t.twist=0),typeof t.tangentialPressure=="undefined"&&(t.tangentialPressure=0),t.isNormalized=!0,e.push(t)}else e.push(r);return e}normalizeWheelEvent(r){const e=this._rootWheelEvent;return this._transferMouseData(e,r),e.deltaX=r.deltaX,e.deltaY=r.deltaY,e.deltaZ=r.deltaZ,e.deltaMode=r.deltaMode,this.mapPositionToPoint(e.screen,r.clientX,r.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=r,e.type=r.type,e}_bootstrapEvent(r,e){return r.originalEvent=null,r.nativeEvent=e,r.pointerId=e.pointerId,r.width=e.width,r.height=e.height,r.isPrimary=e.isPrimary,r.pointerType=e.pointerType,r.pressure=e.pressure,r.tangentialPressure=e.tangentialPressure,r.tiltX=e.tiltX,r.tiltY=e.tiltY,r.twist=e.twist,this._transferMouseData(r,e),this.mapPositionToPoint(r.screen,e.clientX,e.clientY),r.global.copyFrom(r.screen),r.offset.copyFrom(r.screen),r.isTrusted=e.isTrusted,r.type==="pointerleave"&&(r.type="pointerout"),r.type.startsWith("mouse")&&(r.type=r.type.replace("mouse","pointer")),r.type.startsWith("touch")&&(r.type=Pm[r.type]||r.type),r}_transferMouseData(r,e){r.isTrusted=e.isTrusted,r.srcElement=e.srcElement,r.timeStamp=performance.now(),r.type=e.type,r.altKey=e.altKey,r.button=e.button,r.buttons=e.buttons,r.client.x=e.clientX,r.client.y=e.clientY,r.ctrlKey=e.ctrlKey,r.metaKey=e.metaKey,r.movement.x=e.movementX,r.movement.y=e.movementY,r.page.x=e.pageX,r.page.y=e.pageY,r.relatedTarget=null,r.shiftKey=e.shiftKey}};let jt=ui;jt.extension={name:"events",type:[x.WebGLSystem,x.CanvasSystem,x.WebGPUSystem],priority:-1},jt.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};const Sl={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(r){this.eventMode=r?"static":"passive"},_internalEventMode:void 0,get eventMode(){var r;return(r=this._internalEventMode)!=null?r:jt.defaultEventMode},set eventMode(r){this._internalEventMode=r},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(r,e,t){const n=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,i=typeof e=="function"?void 0:e;r=n?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.on(r,e,i)},removeEventListener(r,e,t){const n=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,i=typeof e=="function"?void 0:e;r=n?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.off(r,e,i)},dispatchEvent(r){if(!(r instanceof _r))throw new Error("DisplayObject cannot propagate events outside of the Federated Events API");return r.defaultPrevented=!1,r.path=null,r.target=this,r.manager.dispatchEvent(r),!r.defaultPrevented}};Z.add(jt),Y.mixin(Sl);const Vt=class{constructor(r,e){this.linkedSheets=[],this._texture=r instanceof A?r:null,this.textureSource=r.source,this.textures={},this.animations={},this.data=e;const t=parseFloat(e.meta.scale);t?(this.resolution=t,r.source.resolution=this.resolution):this.resolution=r.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(r=>{this._callback=r,this._batchIndex=0,this._frameKeys.length<=Vt.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(r){let e=r;const t=Vt.BATCH_SIZE;for(;e-r<t&&e<this._frameKeys.length;){const n=this._frameKeys[e],i=this._frames[n],s=i.frame;if(s){let o=null,a=null;const l=i.trimmed!==!1&&i.sourceSize?i.sourceSize:i.frame,u=new X(0,0,Math.floor(l.w)/this.resolution,Math.floor(l.h)/this.resolution);i.rotated?o=new X(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.h)/this.resolution,Math.floor(s.w)/this.resolution):o=new X(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),i.trimmed!==!1&&i.spriteSourceSize&&(a=new X(Math.floor(i.spriteSourceSize.x)/this.resolution,Math.floor(i.spriteSourceSize.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),a.x/=this.textureSource.width,a.y/=this.textureSource.height,a.width/=this.textureSource.width,a.height/=this.textureSource.height),o.x/=this.textureSource.width,o.y/=this.textureSource.height,o.width/=this.textureSource.width,o.height/=this.textureSource.height,u.x/=this.textureSource.width,u.y/=this.textureSource.height,u.width/=this.textureSource.width,u.height/=this.textureSource.height,this.textures[n]=new A({source:this.textureSource,layout:{frame:o,orig:u,trim:a,rotate:i.rotated?2:0,defaultAnchor:i.anchor},label:n.toString()})}e++}}_processAnimations(){const r=this.data.animations||{};for(const e in r){this.animations[e]=[];for(let t=0;t<r[e].length;t++){const n=r[e][t];this.animations[e].push(this.textures[n])}}}_parseComplete(){const r=this._callback;this._callback=null,this._batchIndex=0,r.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*Vt.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*Vt.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(r=!1){var e;for(const t in this.textures)this.textures[t].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,r&&((e=this._texture)==null||e.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};let zr=Vt;zr.BATCH_SIZE=1e3;const Am=["jpg","png","jpeg","avif","webp"];function Pl(r,e,t){const n={};if(r.forEach(i=>{n[i]=e}),Object.keys(e.textures).forEach(i=>{n[i]=e.textures[i]}),!t){const i=ue.dirname(r[0]);e.linkedSheets.forEach((s,o)=>{const a=Pl([`${i}/${e.data.meta.related_multi_packs[o]}`],s,!0);Object.assign(n,a)})}return n}const Al={extension:x.Asset,cache:{test:r=>r instanceof zr,getCacheableAssets:(r,e)=>Pl(r,e,!1)},resolver:{test:r=>{const e=r.split("?")[0].split("."),t=e.pop(),n=e.pop();return t==="json"&&Am.includes(n)},parse:r=>{var e,t;const n=r.split(".");return{resolution:parseFloat((t=(e=I.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:n[n.length-2],src:r}}},loader:{name:"spritesheetLoader",extension:{type:x.LoadParser,priority:Be.Normal},async testParse(r,e){return ue.extname(e.src).toLowerCase()===".json"&&!!r.frames},async parse(r,e,t){var n,i;let s=ue.dirname(e.src);s&&s.lastIndexOf("/")!==s.length-1&&(s+="/");let o=s+r.meta.image;o=Ar(o,e.src);const a=(await t.load([o]))[o],l=new zr(a.source,r);await l.parse();const u=(n=r==null?void 0:r.meta)==null?void 0:n.related_multi_packs;if(Array.isArray(u)){const h=[];for(const p of u){if(typeof p!="string")continue;let d=s+p;(i=e.data)!=null&&i.ignoreMultiPack||(d=Ar(d,e.src),h.push(t.load({src:d,data:{ignoreMultiPack:!0}})))}const c=await Promise.all(h);l.linkedSheets=c,c.forEach(p=>{p.linkedSheets=[l].concat(l.linkedSheets.filter(d=>d!==p))})}return l},unload(r){r.destroy(!0)}}};Z.add(Al);function Yt(r,e,t,n){const i=t._source,s=t.layout,o=s.orig,a=s.trim,l=i.width,u=i.height,h=l*o.width,c=u*o.height;if(a){const p=l*a.width,d=u*a.height;r[1]=a.x*l-e._x*h-n,r[0]=r[1]+p,r[3]=a.y*u-e._y*c-n,r[2]=r[3]+d}else r[1]=-e._x*h-n,r[0]=r[1]+h,r[3]=-e._y*c-n,r[2]=r[3]+c}const vt={onViewUpdate:()=>{}};let Em=0;class El{constructor(e){this.renderPipeId="sprite",this.owner=vt,this.uid=Em++,this.batched=!0,this._didUpdate=!1,this._bounds=[0,1,0,0],this._sourceBounds=[0,1,0,0],this._boundsDirty=!0,this._sourceBoundsDirty=!0;var t,n;this.anchor=new ne(this,((t=e.layout.defaultAnchor)==null?void 0:t.x)||0,((n=e.layout.defaultAnchor)==null?void 0:n.y)||0),this.texture=e}set texture(e){e||(e=A.EMPTY),this._texture!==e&&(e.on("update",this.onUpdate,this),this._texture=e,e.off("update",this.onUpdate,this),this.onUpdate())}get texture(){return this._texture}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}get sourceBounds(){return this._sourceBoundsDirty&&(this._updateSourceBounds(),this._sourceBoundsDirty=!1),this._sourceBounds}containsPoint(e){const t=this._texture.frameWidth,n=this._texture.frameHeight,i=-t*this.anchor.x;let s=0;return e.x>=i&&e.x<i+t&&(s=-n*this.anchor.y,e.y>=s&&e.y<s+n)}addBounds(e){if(this._texture._layout.trim){const t=this.sourceBounds;e.addFrame(t[0],t[2],t[1],t[3])}else{const t=this.bounds;e.addFrame(t[0],t[2],t[1],t[3])}}onUpdate(){this._didUpdate=!0,this._sourceBoundsDirty=this._boundsDirty=!0,this.owner.onViewUpdate()}_updateBounds(){Yt(this._bounds,this.anchor,this._texture,0)}_updateSourceBounds(){const e=this.anchor,t=this._texture,n=t._source,i=t.layout.orig,s=this._sourceBounds,o=n.width*i.width,a=n.height*i.height;s[1]=-e._x*o,s[0]=s[1]+o,s[3]=-e._y*a,s[2]=s[3]+a}destroy(e=!1){if(this.anchor=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._bounds=null,this._sourceBounds=null}}var Mm=Object.defineProperty,Ml=Object.getOwnPropertySymbols,Cm=Object.prototype.hasOwnProperty,Bm=Object.prototype.propertyIsEnumerable,Cl=(r,e,t)=>e in r?Mm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Rm=(r,e)=>{for(var t in e||(e={}))Cm.call(e,t)&&Cl(r,t,e[t]);if(Ml)for(var t of Ml(e))Bm.call(e,t)&&Cl(r,t,e[t]);return r};class Ce extends Y{static from(e){return typeof e=="string"?new Ce(ee.get(e)):new Ce(e)}constructor(e=A.EMPTY){var t;e instanceof A&&(e={texture:e}),(t=e.texture)!=null||(e.texture=A.EMPTY),super(Rm({view:new El(e.texture),label:"Sprite"},e))}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get texture(){return this.view.texture}set texture(e){this.view.texture=e}}const km=new le;function Nr(r,e,t){const n=km;r.measurable=!0,$t(r,t,n),e.addBoundsMask(n),r.measurable=!1}function Wr(r,e,t){const n=new le;r.measurable=!0;const i=hi(r,t,new R);De(r,n,i),r.measurable=!1,e.addBoundsMask(n)}function hi(r,e,t){return r?(r!==e&&(hi(r.parent,e,t),r.didChange&&ke(r.localTransform,r),t.append(r.localTransform)),t):(console.warn("Item is not inside the root container"),t)}class ci{constructor(e){this.priority=0,this.pipe="alphaMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof Ce),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(e,t){Nr(this.mask,e,t)}addLocalBounds(e,t){Wr(this.mask,e,t)}containsPoint(e,t){const n=this.mask;return t(n,e)}destroy(){this.reset()}static test(e){return e instanceof Ce}}ci.extension=x.MaskEffect;class di{constructor(e){this.priority=0,this.pipe="colorMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}di.extension=x.MaskEffect;class pi{constructor(e){this.priority=0,this.pipe="stencilMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(e,t){Nr(this.mask,e,t)}addLocalBounds(e,t){Wr(this.mask,e,t)}containsPoint(e,t){const n=this.mask;return t(n,e)}destroy(){this.reset()}static test(e){return e instanceof Y}}pi.extension=x.MaskEffect,Z.add(ci,di,pi);var Om={__proto__:null};let fi;function Fm(){return typeof fi=="undefined"&&(fi=function(){var r;const e={stencil:!0,failIfMajorPerformanceCaveat:I.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};try{if(!I.ADAPTER.getWebGLRenderingContext())return!1;let t=I.ADAPTER.createCanvas().getContext("webgl2",e);const n=!!((r=t==null?void 0:t.getContextAttributes())!=null&&r.stencil);if(t){const i=t.getExtension("WEBGL_lose_context");i&&i.loseContext()}return t=null,n}catch(t){return!1}}()),fi}async function Um(r={}){if(!I.ADAPTER.getNavigator().gpu)return!1;try{return await(await navigator.gpu.requestAdapter(r)).requestDevice(),!0}catch(e){return!1}}var Im=Object.defineProperty,Bl=Object.getOwnPropertySymbols,Gm=Object.prototype.hasOwnProperty,Lm=Object.prototype.propertyIsEnumerable,Rl=(r,e,t)=>e in r?Im(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Xt=(r,e)=>{for(var t in e||(e={}))Gm.call(e,t)&&Rl(r,t,e[t]);if(Bl)for(var t of Bl(e))Lm.call(e,t)&&Rl(r,t,e[t]);return r};const kl=["webgpu","webgl","canvas"];async function Ol(r){var e;let t=[];r.preference?(t.push(r.preference),kl.forEach(o=>{o!==r.preference&&t.push(o)})):t=kl.slice();let n;((e=r.manageImports)==null||e)&&await Promise.resolve().then(function(){return Om});let i={};for(let o=0;o<t.length;o++){const a=t[o];if(a==="webgpu"&&await Um()){const{WebGPURenderer:l}=await Promise.resolve().then(function(){return xx});n=l,i=Xt(Xt({},r),r.webgpu);break}else if(a==="webgl"&&Fm()){const{WebGLRenderer:l}=await Promise.resolve().then(function(){return lx});n=l,i=Xt(Xt({},r),r.webgl);break}else if(a==="canvas"){i=Xt({},r);break}}delete i.webgpu,delete i.webgl;const s=new n;return await s.init(i),s}var $m=Object.defineProperty,Fl=Object.getOwnPropertySymbols,Dm=Object.prototype.hasOwnProperty,zm=Object.prototype.propertyIsEnumerable,Ul=(r,e,t)=>e in r?$m(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Nm=(r,e)=>{for(var t in e||(e={}))Dm.call(e,t)&&Ul(r,t,e[t]);if(Fl)for(var t of Fl(e))zm.call(e,t)&&Ul(r,t,e[t]);return r};const Il=class{constructor(){this.stage=new Y}async init(r){r=Nm({},r),this.renderer=await Ol(r),Il._plugins.forEach(e=>{e.init.call(this,r)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.element}get screen(){return this.renderer.screen}};let mi=Il;mi._plugins=[],Z.handleByList(x.Application,mi._plugins);class Gl{constructor(e,t=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=t}add(e){e.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],t=Math.min(this._assetList.length,this._maxConcurrent);for(let n=0;n<t;n++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}const qt=r=>!Array.isArray(r);var Wm=Object.defineProperty,Hm=Object.defineProperties,jm=Object.getOwnPropertyDescriptors,Ll=Object.getOwnPropertySymbols,Vm=Object.prototype.hasOwnProperty,Ym=Object.prototype.propertyIsEnumerable,$l=(r,e,t)=>e in r?Wm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Xm=(r,e)=>{for(var t in e||(e={}))Vm.call(e,t)&&$l(r,t,e[t]);if(Ll)for(var t of Ll(e))Ym.call(e,t)&&$l(r,t,e[t]);return r},qm=(r,e)=>Hm(r,jm(e));class Dl{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,t,n)=>(this._parsersValidated=!1,e[t]=n,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,t){const n={promise:null,parser:null};return n.promise=(async()=>{var i,s;let o=null,a=null;if(t.loadParser&&(a=this._parserHash[t.loadParser]),!a){for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];if(u.load&&(i=u.test)!=null&&i.call(u,e,t,this)){a=u;break}}if(!a)return null}o=await a.load(e,t,this),n.parser=a;for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];u.parse&&u.parse&&await((s=u.testParse)==null?void 0:s.call(u,o,t,this))&&(o=await u.parse(o,t,this)||o,n.parser=u)}return o})(),n}async load(e,t){this._parsersValidated||this._validateParsers();let n=0;const i={},s=qt(e),o=ye(e,u=>({alias:[u],src:u})),a=o.length,l=o.map(async u=>{const h=ue.toAbsolute(u.src);if(!i[u.src])try{this.promiseCache[h]||(this.promiseCache[h]=this._getLoadPromiseAndParser(h,u)),i[u.src]=await this.promiseCache[h].promise,t&&t(++n/a)}catch(c){throw delete this.promiseCache[h],delete i[u.src],new Error(`[Loader.load] Failed to load ${h}.
${c}`)}});return await Promise.all(l),s?i[o[0].src]:i}async unload(e){const t=ye(e,n=>({alias:[n],src:n})).map(async n=>{var i,s;const o=ue.toAbsolute(n.src),a=this.promiseCache[o];if(a){const l=await a.promise;delete this.promiseCache[o],(s=(i=a.parser)==null?void 0:i.unload)==null||s.call(i,l,n,this)}});await Promise.all(t)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name).reduce((e,t)=>(e[t.name],qm(Xm({},e),{[t.name]:t})),{})}}function zl(r,e,t,n,i){const s=e[t];for(let o=0;o<s.length;o++){const a=s[o];t<e.length-1?zl(r.replace(n[t],a),e,t+1,n,i):i.push(r.replace(n[t],a))}}function Nl(r){const e=/\{(.*?)\}/g,t=r.match(e),n=[];if(t){const i=[];t.forEach(s=>{const o=s.substring(1,s.length-1).split(",");i.push(o)}),zl(r,i,0,t,n)}else n.push(r);return n}var Km=Object.defineProperty,Zm=Object.defineProperties,Qm=Object.getOwnPropertyDescriptors,Wl=Object.getOwnPropertySymbols,Jm=Object.prototype.hasOwnProperty,eg=Object.prototype.propertyIsEnumerable,Hl=(r,e,t)=>e in r?Km(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,bt=(r,e)=>{for(var t in e||(e={}))Jm.call(e,t)&&Hl(r,t,e[t]);if(Wl)for(var t of Wl(e))eg.call(e,t)&&Hl(r,t,e[t]);return r},jl=(r,e)=>Zm(r,Qm(e));class Vl{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,t)=>`${e}${this._bundleIdConnector}${t}`,extractAssetIdFromBundle:(e,t)=>t.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){var t,n,i;if(this._bundleIdConnector=(t=e.connector)!=null?t:this._bundleIdConnector,this._createBundleAssetId=(n=e.createBundleAssetId)!=null?n:this._createBundleAssetId,this._extractAssetIdFromBundle=(i=e.extractAssetIdFromBundle)!=null?i:this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const t=e;this._defaultSearchParams=Object.keys(t).map(n=>`${encodeURIComponent(n)}=${encodeURIComponent(t[n])}`).join("&")}}getAlias(e){const{alias:t,name:n,src:i,srcs:s}=e;return ye(t||n||i||s,o=>{var a;return typeof o=="string"?o:Array.isArray(o)?o.map(l=>{var u,h;return(h=(u=l==null?void 0:l.src)!=null?u:l==null?void 0:l.srcs)!=null?h:l}):o!=null&&o.src||o!=null&&o.srcs?(a=o.src)!=null?a:o.srcs:o},!0)}addManifest(e){this._manifest,this._manifest=e,e.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}addBundle(e,t){const n=[];Array.isArray(t)?t.forEach(i=>{var s,o;const a=(s=i.src)!=null?s:i.srcs,l=(o=i.alias)!=null?o:i.name;let u;if(typeof l=="string"){const h=this._createBundleAssetId(e,l);n.push(h),u=[l,h]}else{const h=l.map(c=>this._createBundleAssetId(e,c));n.push(...h),u=[...l,...h]}this.add(jl(bt({},i),{alias:u,src:a}))}):Object.keys(t).forEach(i=>{var s;const o=[i,this._createBundleAssetId(e,i)];if(typeof t[i]=="string")this.add({alias:o,src:t[i]});else if(Array.isArray(t[i]))this.add({alias:o,src:t[i]});else{const a=t[i],l=(s=a.src)!=null?s:a.srcs;this.add(jl(bt({},a),{alias:o,src:Array.isArray(l)?l:[l]}))}n.push(...o)}),this._bundles[e]=n}add(e){const t=[];Array.isArray(e)?t.push(...e):t.push(e);let n;ye(t).forEach(i=>{const{src:s,srcs:o}=i;let{data:a,format:l,loadParser:u}=i;const h=ye(s||o).map(d=>typeof d=="string"?Nl(d):Array.isArray(d)?d:[d]),c=this.getAlias(i),p=[];h.forEach(d=>{d.forEach(f=>{var g,m,y;let v={};if(typeof f!="object"){v.src=f;for(let b=0;b<this._parsers.length;b++){const _=this._parsers[b];if(_.test(f)){v=_.parse(f);break}}}else a=(g=f.data)!=null?g:a,l=(m=f.format)!=null?m:l,u=(y=f.loadParser)!=null?y:u,v=bt(bt({},v),f);if(!c)throw new Error(`[Resolver] alias is undefined for this asset: ${v.src}`);v=this._buildResolvedAsset(v,{aliases:c,data:a,format:l,loadParser:u}),p.push(v)})}),c.forEach(d=>{this._assetMap[d]=p})})}resolveBundle(e){const t=qt(e);e=ye(e);const n={};return e.forEach(i=>{const s=this._bundles[i];if(s){const o=this.resolve(s),a={};for(const l in o){const u=o[l];a[this._extractAssetIdFromBundle(i,l)]=u}n[i]=a}}),t?n[e[0]]:n}resolveUrl(e){const t=this.resolve(e);if(typeof e!="string"){const n={};for(const i in t)n[i]=t[i].src;return n}return t.src}resolve(e){const t=qt(e);e=ye(e);const n={};return e.forEach(i=>{var s;if(!this._resolverHash[i])if(this._assetMap[i]){let o=this._assetMap[i];const a=o[0],l=this._getPreferredOrder(o);l==null||l.priority.forEach(u=>{l.params[u].forEach(h=>{const c=o.filter(p=>p[u]?p[u]===h:!1);c.length&&(o=c)})}),this._resolverHash[i]=(s=o[0])!=null?s:a}else this._resolverHash[i]=this._buildResolvedAsset({alias:[i],src:i},{});n[i]=this._resolverHash[i]}),t?n[e[0]]:n}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let t=0;t<e.length;t++){const n=e[0],i=this._preferredOrder.find(s=>s.params.format.includes(n.format));if(i)return i}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const t=/\?/.test(e)?"&":"?";return`${e}${t}${this._defaultSearchParams}`}_buildResolvedAsset(e,t){var n;const{aliases:i,data:s,loadParser:o,format:a}=t;return(this._basePath||this._rootPath)&&(e.src=ue.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=(n=i!=null?i:e.alias)!=null?n:[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data=bt(bt({},s||{}),e.data),e.loadParser=o!=null?o:e.loadParser,e.format=a!=null?a:e.src.split(".").pop(),e.srcs=e.src,e.name=e.alias,e}}class Yl{constructor(){this._detections=[],this._initialized=!1,this.resolver=new Vl,this.loader=new Dl,this.cache=ee,this._backgroundLoader=new Gl(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){var t,n,i;if(this._initialized)return;if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let l=e.manifest;typeof l=="string"&&(l=await this.load(l)),this.resolver.addManifest(l)}const s=(n=(t=e.texturePreference)==null?void 0:t.resolution)!=null?n:1,o=typeof s=="number"?[s]:s,a=await this._detectFormats({preferredFormats:(i=e.texturePreference)==null?void 0:i.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:a,resolution:o}}),e.preferences&&this.setPreferences(e.preferences)}add(e){this.resolver.add(e)}async load(e,t){this._initialized||await this.init();const n=qt(e),i=ye(e).map(a=>{if(typeof a!="string"){const l=this.resolver.getAlias(a);return l.some(u=>!this.resolver.hasKey(u))&&this.add(a),Array.isArray(l)?l[0]:l}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),s=this.resolver.resolve(i),o=await this._mapLoadToResolve(s,t);return n?o[i[0]]:o}addBundle(e,t){this.resolver.addBundle(e,t)}async loadBundle(e,t){this._initialized||await this.init();let n=!1;typeof e=="string"&&(n=!0,e=[e]);const i=this.resolver.resolveBundle(e),s={},o=Object.keys(i);let a=0,l=0;const u=()=>{t==null||t(++a/l)},h=o.map(c=>{const p=i[c];return l+=Object.keys(p).length,this._mapLoadToResolve(p,u).then(d=>{s[c]=d})});return await Promise.all(h),n?s[e[0]]:s}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(t))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolveBundle(e);Object.values(t).forEach(n=>{this._backgroundLoader.add(Object.values(n))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return ee.get(e);const t={};for(let n=0;n<e.length;n++)t[n]=ee.get(e[n]);return t}async _mapLoadToResolve(e,t){const n=Object.values(e),i=Object.keys(e);this._backgroundLoader.active=!1;const s=await this.loader.load(n,t);this._backgroundLoader.active=!0;const o={};return n.forEach((a,l)=>{const u=s[a.src],h=[a.src];a.alias&&h.push(...a.alias),o[i[l]]=u,ee.set(h,u)}),o}async unload(e){this._initialized||await this.init();const t=ye(e).map(i=>typeof i!="string"?i.src:i),n=this.resolver.resolve(t);await this._unloadFromResolved(n)}async unloadBundle(e){this._initialized||await this.init(),e=ye(e);const t=this.resolver.resolveBundle(e),n=Object.keys(t).map(i=>this._unloadFromResolved(t[i]));await Promise.all(n)}async _unloadFromResolved(e){const t=Object.values(e);t.forEach(n=>{ee.remove(n.src)}),await this.loader.unload(t)}async _detectFormats(e){let t=[];e.preferredFormats&&(t=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(const n of e.detections)e.skipDetections||await n.test()?t=await n.add(t):e.skipDetections||(t=await n.remove(t));return t=t.filter((n,i)=>t.indexOf(n)===i),t}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(t=>{t.config&&Object.keys(t.config).filter(n=>n in e).forEach(n=>{t.config[n]=e[n]})})}}const Kt=new Yl;Z.handleByList(x.LoadParser,Kt.loader.parsers).handleByList(x.ResolveParser,Kt.resolver.parsers).handleByList(x.CacheParser,Kt.cache.parsers).handleByList(x.DetectionParser,Kt.detections);class Te{constructor(e){this.resources=Object.create(null),this._dirty=!0;let t=0;for(const n in e){const i=e[n];this.setResource(i,t++)}this.updateKey()}update(){this.updateKey()}updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let t=0;for(const n in this.resources)e[t++]=this.resources[n].resourceId;this.key=e.join("|")}setResource(e,t){var n,i;const s=this.resources[t];e!==s&&(s&&((n=e.off)==null||n.call(e,"change",this.onResourceChange,this)),(i=e.on)==null||i.call(e,"change",this.onResourceChange,this),this.resources[t]=e,this._dirty=!0)}getResource(e){return this.resources[e]}touch(e){const t=this.resources;for(const n in t)t[n].touched=e}destroy(){var e;const t=this.resources;for(const n in t){const i=t[n];(e=i.off)==null||e.call(i,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(){this._dirty=!0,this.update()}}var Ae=(r=>(r[r.WEBGL=1]="WEBGL",r[r.WEBGPU=2]="WEBGPU",r))(Ae||{});let tg=0;function it(){return tg++}function Xl(r,e){switch(r){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}var rg=Object.defineProperty,ql=Object.getOwnPropertySymbols,ng=Object.prototype.hasOwnProperty,ig=Object.prototype.propertyIsEnumerable,Kl=(r,e,t)=>e in r?rg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Zl=(r,e)=>{for(var t in e||(e={}))ng.call(e,t)&&Kl(r,t,e[t]);if(ql)for(var t of ql(e))ig.call(e,t)&&Kl(r,t,e[t]);return r};const Ql=class{constructor(r,e){this.touched=0,this.uid=it(),this.resourceType="uniformGroup",this.resourceId=this.uid,this.isUniformGroup=!0,this.dirtyId=0;var t,n;e=Zl(Zl({},Ql.DEFAULT),e),this.uniformStructures=r;const i={};for(const s in r){const o=r[s];o.name=s,o.size=(t=o.size)!=null?t:1,(n=o.value)!=null||(o.value=Xl(o.type,o.size)),i[s]=o.value}this.uniforms=i,this.dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this.signature=Object.keys(i).map(s=>`${s}-${r[s].type}`).join("-")}update(){this.dirtyId++}};let J=Ql;J.DEFAULT={ubo:!1,isStatic:!1};class Ee extends oe{constructor({gpuProgram:e,glProgram:t,groups:n,resources:i,groupMap:s,compatibleRenderers:o}){super(),this.uniformBindMap=Object.create(null),this.gpuProgram=e,this.glProgram=t,o===void 0&&(o=0,e&&(o|=Ae.WEBGPU),t&&(o|=Ae.WEBGL)),this.compatibleRenderers=o;const a={};if(i&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!i&&!n)throw new Error("[Shader] Must provide either resources or groups descriptor");if(!e&&n&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&n&&s)for(const l in s)for(const u in s[l]){const h=s[l][u];a[h]={group:l,binding:u,name:h}}else if(e&&n&&!s){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else if(i){if(e){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else{s={},n={99:new Te};let l=0;for(const u in i)a[u]={group:99,binding:l,name:u},s[99]=s[99]||{},s[99][l]=u,l++}n={};for(const l in i){const u=l;let h=i[l];!h.source&&!h.resourceType&&(h=new J(h));const c=a[u];c&&(n[c.group]=n[c.group]||new Te,n[c.group].setResource(h,c.binding))}}this.groups=n,this.uniformBindMap=s,this.resources=this._buildResourceAccessor(n,a)}addResource(e,t,n){var i,s;(i=this.uniformBindMap)[t]||(i[t]={}),(s=this.uniformBindMap[t])[n]||(s[n]=e)}_buildResourceAccessor(e,t){const n={};for(const i in t){const s=t[i];Object.defineProperty(n,s.name,{get(){return e[s.group].getResource(s.binding)},set(o){e[s.group].setResource(o,s.binding)}})}return n}destroy(e=!1){var t,n;this.emit("destroy",this),e&&((t=this.gpuProgram)==null||t.destroy(),(n=this.glProgram)==null||n.destroy()),this.gpuProgram=null,this.glProgram=null,this.groups=null,this.removeAllListeners(),this.uniformBindMap=null,this.resources=null}}const sg={normal:0,additive:1,multiply:2,screen:3,overlay:4,erase:5},gi=0,vi=1,bi=2,yi=3,xi=4,_i=5;class _e{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<gi)}set blend(e){!!(this.data&1<<gi)!==e&&(this.data^=1<<gi)}get offsets(){return!!(this.data&1<<vi)}set offsets(e){!!(this.data&1<<vi)!==e&&(this.data^=1<<vi)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<bi)}set culling(e){!!(this.data&1<<bi)!==e&&(this.data^=1<<bi)}get depthTest(){return!!(this.data&1<<yi)}set depthTest(e){!!(this.data&1<<yi)!==e&&(this.data^=1<<yi)}get depthMask(){return!!(this.data&1<<_i)}set depthMask(e){!!(this.data&1<<_i)!==e&&(this.data^=1<<_i)}get clockwiseFrontFace(){return!!(this.data&1<<xi)}set clockwiseFrontFace(e){!!(this.data&1<<xi)!==e&&(this.data^=1<<xi)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=sg[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}static for2d(){const e=new _e;return e.depthTest=!1,e.blend=!0,e}}var og=Object.defineProperty,Jl=Object.getOwnPropertySymbols,ag=Object.prototype.hasOwnProperty,lg=Object.prototype.propertyIsEnumerable,eu=(r,e,t)=>e in r?og(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,tu=(r,e)=>{for(var t in e||(e={}))ag.call(e,t)&&eu(r,t,e[t]);if(Jl)for(var t of Jl(e))lg.call(e,t)&&eu(r,t,e[t]);return r};const ru=class extends Ee{constructor(r){var e;r=tu(tu({},ru.defaultOptions),r),super(r),this.enabled=!0,this._state=_e.for2d(),this.padding=r.padding,typeof r.antialias=="boolean"?this.antialias=r.antialias?"on":"off":this.antialias=(e=r.antialias)!=null?e:"inherit",this.resolution=r.resolution,this.blendRequired=r.blendRequired,this.addResource("filterUniforms",0,0),this.addResource("uSampler",0,1)}apply(r,e,t,n){r.applyFilter(this,e,t,n)}get blendMode(){return this._state.blendMode}set blendMode(r){this._state.blendMode=r}};let Se=ru;Se.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"inherit",blendRequired:!1};function nu(r){var e;const t=new RegExp("(?<!\\/\\/.*)@(group|binding)\\(\\d+\\)[^;]+;","g"),n=/@group\((\d+)\)/,i=/@binding\((\d+)\)/,s=/var(<[^>]+>)? (\w+)/,o=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,l=/(\w+)\s*:\s*([\w\<\>]+)/g,u=/struct\s+(\w+)/,h=(e=r.match(t))==null?void 0:e.map(p=>({group:parseInt(p.match(n)[1],10),binding:parseInt(p.match(i)[1],10),name:p.match(s)[2],isUniform:p.match(s)[1]==="<uniform>",type:p.match(o)[1]}));if(!h)return{groups:[],structs:[]};const c=r.match(a).map(p=>{const d=p.match(u)[1],f=p.match(l).reduce((g,m)=>{const[y,v]=m.split(":");return g[y.trim()]=v.trim(),g},{});return{name:d,members:f}}).filter(({name:p})=>h.some(d=>d.type===p));return{groups:h,structs:c}}var yt=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(yt||{});function iu({groups:r}){const e=[];for(let t=0;t<r.length;t++){const n=r[t];e[n.group]||(e[n.group]=[]),n.isUniform?e[n.group].push({binding:n.binding,visibility:yt.VERTEX|yt.FRAGMENT,buffer:{type:"uniform"}}):n.type==="sampler"?e[n.group].push({binding:n.binding,visibility:yt.FRAGMENT,sampler:{type:"filtering"}}):n.type==="texture_2d"&&e[n.group].push({binding:n.binding,visibility:yt.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function su({groups:r}){const e=[];for(let t=0;t<r.length;t++){const n=r[t];e[n.group]||(e[n.group]={}),e[n.group][n.name]=n.binding}return e}const Zt=class{constructor({fragment:r,vertex:e,layout:t,gpuLayout:n}){this._layoutKey=0,this.fragment=r,this.vertex=e;const i=nu(this.fragment.source);this.structsAndGroups=i,this.layout=t!=null?t:su(i),this.gpuLayout=n!=null?n:iu(i)}destroy(){this._gpuLayout=null,this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(r){const e=`${r.vertex.source}:${r.fragment.source}:${r.fragment.entryPoint}:${r.vertex.entryPoint}`;return Zt.programCached[e]||(Zt.programCached[e]=new Zt(r)),Zt.programCached[e]}};let me=Zt;me.programCached=Object.create(null);var wi=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  backgroundFrame:vec4<f32>,
  globalFrame:vec4<f32>,
};

struct AlphaUniforms {
  uAlpha:f32,
};

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;

@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(1) @binding(1) var iTexture: texture_2d<f32>;
@group(1) @binding(2) var iSampler : sampler;

@group(2) @binding(0) var<uniform> alphaUniforms : AlphaUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * max(gfu.outputFrame.zw, vec2(0.)) + gfu.outputFrame.xy;

    return vec4((globalUniforms.projectionMatrix * globalUniforms.worldTransformMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn filterBackgroundTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * gfu.backgroundFrame.zw;
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.globalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
  return textureSample(iTexture, iSampler, uv) * alphaUniforms.uAlpha;
}`,ug=Object.defineProperty,ou=Object.getOwnPropertySymbols,hg=Object.prototype.hasOwnProperty,cg=Object.prototype.propertyIsEnumerable,au=(r,e,t)=>e in r?ug(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,lu=(r,e)=>{for(var t in e||(e={}))hg.call(e,t)&&au(r,t,e[t]);if(ou)for(var t of ou(e))cg.call(e,t)&&au(r,t,e[t]);return r};const uu=class extends Se{constructor(r){r=lu(lu({},uu.DEFAULT_OPTIONS),r);const e=new me({vertex:{source:wi,entryPoint:"mainVertex"},fragment:{source:wi,entryPoint:"mainFragment"}}),t=new J({uAlpha:{value:r.alpha,type:"f32"}});super({gpuProgram:e,resources:{filterUniforms:t}})}get alpha(){return this.resources.filterUniforms.uniforms.uAlpha}set alpha(r){this.resources.filterUniforms.uniforms.uAlpha=r}};let hu=uu;hu.DEFAULT_OPTIONS={alpha:1};function st(r){return r+=r===0?1:0,--r,r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r+1}function dg(r){return!(r&r-1)&&!!r}function pg(r){let e=(r>65535?1:0)<<4;r>>>=e;let t=(r>255?1:0)<<3;return r>>>=t,e|=t,t=(r>15?1:0)<<2,r>>>=t,e|=t,t=(r>3?1:0)<<1,r>>>=t,e|=t,e|r>>1}var fg=Object.defineProperty,mg=Object.defineProperties,gg=Object.getOwnPropertyDescriptors,cu=Object.getOwnPropertySymbols,vg=Object.prototype.hasOwnProperty,bg=Object.prototype.propertyIsEnumerable,du=(r,e,t)=>e in r?fg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,yg=(r,e)=>{for(var t in e||(e={}))vg.call(e,t)&&du(r,t,e[t]);if(cu)for(var t of cu(e))bg.call(e,t)&&du(r,t,e[t]);return r},xg=(r,e)=>mg(r,gg(e));let _g=0;class pu{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,n){const i=new ae(xg(yg({},this.textureOptions),{width:e,height:t,resolution:1,antialias:n}));return new A({source:i,label:`texturePool_${_g++}`})}getOptimalTexture(e,t,n=1,i){let s=Math.ceil(e*n-1e-6),o=Math.ceil(t*n-1e-6);s=st(s),o=st(o);const a=(s<<17)+(o<<1)+(i?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let l=this._texturePool[a].pop();return l||(l=this.createTexture(s,o,i)),l.source._resolution=n,l.source.width=s/n,l.source.height=o/n,l.source.pixelWidth=s,l.source.pixelHeight=o,l.frameX=0,l.frameY=0,l.frameWidth=e,l.frameHeight=t,l.layout.update(),this._poolKeyHash[l.id]=a,l}getSameSizeTexture(e){const t=e.source;return this.getOptimalTexture(e.width,e.height,t._resolution,t.antialias)}returnTexture(e){const t=this._poolKeyHash[e.id];this._texturePool[t].push(e)}clear(e){if(e=e!==!1,e)for(const t in this._texturePool){const n=this._texturePool[t];if(n)for(let i=0;i<n.length;i++)n[i].destroy(!0)}this._texturePool={}}}const se=new pu;function fu(r,e,t){const n=t?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(r.substring(0,9)!=="precision"){let i=t?e.requestedFragmentPrecision:e.requestedVertexPrecision;if(i==="highp"&&n!=="highp"&&(i="mediump"),r.substring(0,8)!=="#version")return`precision ${i} float;
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}precision ${i} float;
${r.substring(s+1)}`}else if(n!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}const mu={};let Qt=mu;function gu(){return(Qt===mu||Qt!=null&&Qt.isContextLost())&&(Qt=I.ADAPTER.createCanvas().getContext("webgl2",{})),Qt}let Hr;function vu(){if(!Hr){Hr="mediump";const r=gu();r&&r.getShaderPrecisionFormat&&(Hr=r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision?"highp":"mediump")}return Hr}const wg={},Tg={};function bu(r,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const n=t?wg:Tg;if(n[e]?(n[e]++,e+=`-${n[e]}`):n[e]=1,r.indexOf("#define SHADER_NAME")!==-1)return r;const i=`#define SHADER_NAME ${e}`;if(r.substring(0,8)!=="#version")return`${i}
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}${i}
${r.substring(s+1)}`}function yu(r,{version:e="300 es"}){return r.substring(0,8)==="#version"?r:`#version ${e}
${r}`}var Sg=Object.defineProperty,xu=Object.getOwnPropertySymbols,Pg=Object.prototype.hasOwnProperty,Ag=Object.prototype.propertyIsEnumerable,_u=(r,e,t)=>e in r?Sg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wu=(r,e)=>{for(var t in e||(e={}))Pg.call(e,t)&&_u(r,t,e[t]);if(xu)for(var t of xu(e))Ag.call(e,t)&&_u(r,t,e[t]);return r};const Ti={ensurePrecision:fu,setProgramName:bu,setProgramVersion:yu},xt=class{constructor(r){r=wu(wu({},xt.defaultOptions),r);const e={ensurePrecision:{requestedFragmentPrecision:r.preferredFragmentPrecision,requestedVertexPrecision:r.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:vu()},setProgramName:{name:r.name},setProgramVersion:{version:"300 es"}};let t=r.fragment,n=r.vertex;Object.keys(Ti).forEach(i=>{var s;const o=(s=e[i])!=null?s:{};t=Ti[i](t,o,!0),n=Ti[i](n,o,!1)}),this.fragment=t,this.vertex=n,this.key=`${this.vertex}:${this.fragment}`}destroy(){this.fragment=null,this.vertex=null,this.attributeData=null,this.uniformData=null,this.uniformBlockData=null,this.transformFeedbackVaryings=null}static from(r){const e=`${r.vertex}:${r.fragment}`;return xt.programCached[e]||(xt.programCached[e]=new xt(r)),xt.programCached[e]}};let he=xt;he.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"},he.programCached=Object.create(null);const Si={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},Eg=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","out vec4 fragColor;","void main(void)","{","    fragColor = vec4(0.0);","    %blur%","}"].join(`
`);function Tu(r){const e=Si[r],t=e.length;let n=Eg,i="";const s="fragColor += texture(uSampler, vBlurTexCoords[%index%]) * %value%;";let o;for(let a=0;a<r;a++){let l=s.replace("%index%",a.toString());o=a,a>=t&&(o=r-a-1),l=l.replace("%value%",e[o].toString()),i+=l,i+=`
`}return n=n.replace("%blur%",i),n=n.replace("%size%",r.toString()),n}const Mg=`
    in vec2 aPosition;

    uniform float strength;

    out vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;
    uniform vec4 inputPixel;
    uniform vec4 outputTexture;

    vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * outputFrame.zw + outputFrame.xy;
    
    position.x = position.x * (2.0 / outputTexture.x) - 1.0;
    position.y = position.y * (2.0*outputTexture.z / outputTexture.y) - outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

    vec2 filterTextureCoord( void )
    {
        return aPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        float pixelStrength = inputSize.%dimension% * strength;

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;function Su(r,e){const t=Math.ceil(r/2);let n=Mg,i="",s;e?s="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":s="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let o=0;o<r;o++){let a=s.replace("%index%",o.toString());a=a.replace("%sampleIndex%",`${o-(t-1)}.0`),i+=a,i+=`
`}return n=n.replace("%blur%",i),n=n.replace("%size%",r.toString()),n=n.replace("%dimension%",e?"z":"w"),n}function Pu(r,e){const t=Su(e,r),n=Tu(e);return he.from({vertex:t,fragment:n,name:`blur-${r?"horizontal":"vertical"}-pass-filter`})}var Au=`

struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  globalFrame:vec4<f32>,
  outputTexture:vec4<f32>,
};

struct BlurUniforms {
  strength:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uSampler: texture_2d<f32>;
@group(0) @binding(2) var mySampler : sampler;

@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    %blur-struct%
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;

    position.x = position.x * (2.0 / gfu.outputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.outputTexture.z / gfu.outputTexture.y) - gfu.outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.globalFrame.zw;
}


@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {

  let filteredCord = filterTextureCoord(aPosition);

  let strength = gfu.inputSize.w * blurUniforms.strength;

  return VSOutput(
   filterVertexPosition(aPosition),
    %blur-vertex-out%
  );
}

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  %blur-fragment-in%
) -> @location(0) vec4<f32> {

    var   fragColor = vec4(0.0);

    %blur-sampling%

    return fragColor;
}`;function Eu(r,e){const t=Si[e],n=t.length,i=[],s=[],o=[];for(let c=0;c<e;c++){i[c]=`@location(${c}) offset${c}: vec2<f32>,`,r?s[c]=`filteredCord + vec2(${c-n+1} * strength, 0.0),`:s[c]=`filteredCord + vec2(0.0, ${c-n+1} * strength),`;const p=c<n?c:e-c-1,d=t[p].toString();o[c]=`fragColor += textureSample(uSampler, mySampler, offset${c}) * ${d};`}const a=i.join(`
`),l=s.join(`
`),u=o.join(`
`),h=Au.replace("%blur-struct%",a).replace("%blur-vertex-out%",l).replace("%blur-fragment-in%",a).replace("%blur-sampling%",u);return me.from({vertex:{source:h,entryPoint:"mainVertex"},fragment:{source:h,entryPoint:"mainFragment"}})}var Cg=Object.defineProperty,Mu=Object.getOwnPropertySymbols,Bg=Object.prototype.hasOwnProperty,Rg=Object.prototype.propertyIsEnumerable,Cu=(r,e,t)=>e in r?Cg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Pi=(r,e)=>{for(var t in e||(e={}))Bg.call(e,t)&&Cu(r,t,e[t]);if(Mu)for(var t of Mu(e))Rg.call(e,t)&&Cu(r,t,e[t]);return r};const Bu=class extends Se{constructor(r){r=Pi(Pi({},Bu.defaultOptions),r);const e=Pu(r.horizontal,r.kernelSize),t=Eu(r.horizontal,r.kernelSize);super(Pi({glProgram:e,gpuProgram:t,resources:{blurUniforms:{strength:{value:0,type:"f32"}}}},r)),this.horizontal=r.horizontal,this._quality=0,this.quality=r.quality,this.blur=r.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(r,e,t,n){if(this._uniforms.strength=this.strength/this.passes,this.passes===1)r.applyFilter(this,e,t,n);else{const i=se.getSameSizeTexture(e);let s=e,o=i;this._state.blend=!1;for(let a=0;a<this.passes-1;a++){r.applyFilter(this,s,o,r.renderer.type===Ae.WEBGPU);const l=o;o=s,s=l}this._state.blend=!0,r.applyFilter(this,s,t,n),se.returnTexture(i)}}get blur(){return this.strength}set blur(r){this.padding=1+Math.abs(r)*2,this.strength=r}get quality(){return this._quality}set quality(r){this._quality=r,this.passes=r}};let Jt=Bu;Jt.defaultOptions={strength:8,quality:4,kernelSize:5};var kg=Object.defineProperty,Og=Object.defineProperties,Fg=Object.getOwnPropertyDescriptors,Ru=Object.getOwnPropertySymbols,Ug=Object.prototype.hasOwnProperty,Ig=Object.prototype.propertyIsEnumerable,ku=(r,e,t)=>e in r?kg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,er=(r,e)=>{for(var t in e||(e={}))Ug.call(e,t)&&ku(r,t,e[t]);if(Ru)for(var t of Ru(e))Ig.call(e,t)&&ku(r,t,e[t]);return r},Gg=(r,e)=>Og(r,Fg(e));class Ou extends Se{constructor(...e){var t;let n=(t=e[0])!=null?t:{};typeof n=="number"&&(U(N,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),n={strength:n},e[1]&&(n.quality=e[1]),e[2]&&(n.resolution=e[2]),e[3]&&(n.kernelSize=e[3])),n=er(er({},Jt.defaultOptions),n),super(Gg(er({},n),{compatibleRenderers:Ae.WEBGL|Ae.WEBGPU,resources:{}})),this._repeatEdgePixels=!1,this.blurXFilter=new Jt(er({horizontal:!1},n)),this.blurYFilter=new Jt(er({horizontal:!0},n)),this.quality=n.quality,this.blur=n.strength,this.repeatEdgePixels=!1}apply(e,t,n,i){const s=Math.abs(this.blurXFilter.strength),o=Math.abs(this.blurYFilter.strength);if(s&&o){const a=se.getSameSizeTexture(t);this.blurXFilter.apply(e,t,a,!0),this.blurYFilter.apply(e,a,n,i),se.returnTexture(a)}else o?this.blurYFilter.apply(e,t,n,i):this.blurXFilter.apply(e,t,n,i)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get blur(){return this.blurXFilter.blur}set blur(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get blurX(){return this.blurXFilter.blur}set blurX(e){this.blurXFilter.blur=e,this.updatePadding()}get blurY(){return this.blurYFilter.blur}set blurY(e){this.blurYFilter.blur=e,this.updatePadding()}get blendMode(){return this.blurYFilter.blendMode}set blendMode(e){this.blurYFilter.blendMode=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}}Ou.defaultOptions={strength:8,quality:4,kernelSize:5};var Ai=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform vec4 outputTexture;
// uniform vec4 globalFrame;
// uniform float flipped;


vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * outputFrame.zw + outputFrame.xy;
    
    position.x = position.x * (2.0 / outputTexture.x) - 1.0;
    position.y = position.y * (2.0*outputTexture.z / outputTexture.y) - outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Fu=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 fragColor;

uniform float uColorMatrix[20];
uniform float uAlpha;

uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;
    
    float[20] cm = uColorMatrix;


    if (uAlpha == 0.0) {
        fragColor = color;
        return;
    }

    vec4 result;

    result.r = (cm[0] * color.r);
        result.r += (cm[1] * color.g);
        result.r += (cm[2] * color.b);
        result.r += (cm[3] * color.a);
        result.r += cm[4];

    result.g = (cm[5] * color.r);
        result.g += (cm[6] * color.g);
        result.g += (cm[7] * color.b);
        result.g += (cm[8] * color.a);
        result.g += cm[9];

    result.b = (cm[10] * color.r);
       result.b += (cm[11] * color.g);
       result.b += (cm[12] * color.b);
       result.b += (cm[13] * color.a);
       result.b += cm[14];

    result.a = (cm[15] * color.r);
       result.a += (cm[16] * color.g);
       result.a += (cm[17] * color.b);
       result.a += (cm[18] * color.a);
       result.a += cm[19];

    vec3 rgb = mix(color.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    fragColor = vec4(rgb, result.a);
}
`,Ei=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  globalFrame:vec4<f32>,
  outputTexture:vec4<f32>,
};

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uSampler: texture_2d<f32>;
@group(0) @binding(2) var mySampler : sampler;
@group(0) @binding(3) var backTexture: texture_2d<f32>;
@group(1) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
  };
  
fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;

    position.x = position.x * (2.0 / gfu.outputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.outputTexture.z / gfu.outputTexture.y) - gfu.outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
  );
}


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {


  var c = textureSample(uSampler, mySampler, uv);
  
  if (colorMatrixUniforms.uAlpha == 0.0) {
    return c;
  }

 
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    // if (c.a > 0.0) {
    //   c.r /= c.a;
    //   c.g /= c.a;
    //   c.b /= c.a;
    // }

    var cm = colorMatrixUniforms.uColorMatrix;


    var result = vec4<f32>(0.);

    result.r = (cm[0][0] * c.r);
    result.r += (cm[0][1] * c.g);
    result.r += (cm[0][2] * c.b);
    result.r += (cm[0][3] * c.a);
    result.r += cm[1][0];

    result.g = (cm[1][1] * c.r);
    result.g += (cm[1][2] * c.g);
    result.g += (cm[1][3] * c.b);
    result.g += (cm[2][0] * c.a);
    result.g += cm[2][1];

    result.b = (cm[2][2] * c.r);
    result.b += (cm[2][3] * c.g);
    result.b += (cm[3][0] * c.b);
    result.b += (cm[3][1] * c.a);
    result.b += cm[3][2];

    result.a = (cm[3][3] * c.r);
    result.a += (cm[4][0] * c.g);
    result.a += (cm[4][1] * c.b);
    result.a += (cm[4][2] * c.a);
    result.a += cm[4][3];

    var rgb = mix(c.rgb, result.rgb, colorMatrixUniforms.uAlpha);

    // rgb.r *= result.a;
    // rgb.g *= result.a;
    // rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;class Lg extends Se{constructor(){const e=new J({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"vec4<f32>",size:5},uAlpha:{value:1,type:"f32"}}),t=me.from({vertex:{source:Ei,entryPoint:"mainVertex"},fragment:{source:Ei,entryPoint:"mainFragment"}}),n=he.from({vertex:Ai,fragment:Fu,name:"color-matrix-filter"});super({gpuProgram:t,glProgram:n,resources:{colorMatrixUniforms:e}}),this.alpha=1}_loadMatrix(e,t=!1){let n=e;t&&(this._multiply(n,this.matrix,e),n=this._colorMatrix(n)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=n,this.resources.colorMatrixUniforms.update()}_multiply(e,t,n){return e[0]=t[0]*n[0]+t[1]*n[5]+t[2]*n[10]+t[3]*n[15],e[1]=t[0]*n[1]+t[1]*n[6]+t[2]*n[11]+t[3]*n[16],e[2]=t[0]*n[2]+t[1]*n[7]+t[2]*n[12]+t[3]*n[17],e[3]=t[0]*n[3]+t[1]*n[8]+t[2]*n[13]+t[3]*n[18],e[4]=t[0]*n[4]+t[1]*n[9]+t[2]*n[14]+t[3]*n[19]+t[4],e[5]=t[5]*n[0]+t[6]*n[5]+t[7]*n[10]+t[8]*n[15],e[6]=t[5]*n[1]+t[6]*n[6]+t[7]*n[11]+t[8]*n[16],e[7]=t[5]*n[2]+t[6]*n[7]+t[7]*n[12]+t[8]*n[17],e[8]=t[5]*n[3]+t[6]*n[8]+t[7]*n[13]+t[8]*n[18],e[9]=t[5]*n[4]+t[6]*n[9]+t[7]*n[14]+t[8]*n[19]+t[9],e[10]=t[10]*n[0]+t[11]*n[5]+t[12]*n[10]+t[13]*n[15],e[11]=t[10]*n[1]+t[11]*n[6]+t[12]*n[11]+t[13]*n[16],e[12]=t[10]*n[2]+t[11]*n[7]+t[12]*n[12]+t[13]*n[17],e[13]=t[10]*n[3]+t[11]*n[8]+t[12]*n[13]+t[13]*n[18],e[14]=t[10]*n[4]+t[11]*n[9]+t[12]*n[14]+t[13]*n[19]+t[14],e[15]=t[15]*n[0]+t[16]*n[5]+t[17]*n[10]+t[18]*n[15],e[16]=t[15]*n[1]+t[16]*n[6]+t[17]*n[11]+t[18]*n[16],e[17]=t[15]*n[2]+t[16]*n[7]+t[17]*n[12]+t[18]*n[17],e[18]=t[15]*n[3]+t[16]*n[8]+t[17]*n[13]+t[18]*n[18],e[19]=t[15]*n[4]+t[16]*n[9]+t[17]*n[14]+t[18]*n[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const n=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}tint(e,t){const n=e>>16&255,i=e>>8&255,s=e&255,o=[n/255,0,0,0,0,0,i/255,0,0,0,0,0,s/255,0,0,0,0,0,1,0];this._loadMatrix(o,t)}greyscale(e,t){const n=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const n=Math.cos(e),i=Math.sin(e),s=Math.sqrt,o=1/3,a=s(o),l=n+(1-n)*o,u=o*(1-n)-a*i,h=o*(1-n)+a*i,c=o*(1-n)+a*i,p=n+o*(1-n),d=o*(1-n)-a*i,f=o*(1-n)-a*i,g=o*(1-n)+a*i,m=n+o*(1-n),y=[l,u,h,0,0,c,p,d,0,0,f,g,m,0,0,0,0,0,1,0];this._loadMatrix(y,t)}contrast(e,t){const n=(e||0)+1,i=-.5*(n-1),s=[n,0,0,0,i,0,n,0,0,i,0,0,n,0,i,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const n=e*2/3+1,i=(n-1)*-.5,s=[n,i,i,0,0,i,n,i,0,0,i,i,n,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,n,i,s){e=e||.2,t=t||.15,n=n||16770432,i=i||3375104;const o=(n>>16&255)/255,a=(n>>8&255)/255,l=(n&255)/255,u=(i>>16&255)/255,h=(i>>8&255)/255,c=(i&255)/255,p=[.3,.59,.11,0,0,o,a,l,e,0,u,h,c,t,0,o-u,a-h,l-c,0,0];this._loadMatrix(p,s)}night(e,t){e=e||.1;const n=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(n,t)}predator(e,t){const n=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(n,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}var Uu=`
in vec2 vTextureCoord;
in vec2 vFilterUv;

out vec4 fragColor;

uniform sampler2D uSampler;
uniform sampler2D mapTexture;

uniform vec4 filterArea;
uniform vec4 filterClamp;
uniform vec4 inputClamp;
uniform vec4 inputSize;
uniform mat2 rotation;
uniform vec2 scale;


void main()
{
vec4 map = texture(mapTexture, vFilterUv);
    
    vec2 offset = inputSize.zw * (rotation * (map.xy - 0.5)) * scale; 

    fragColor = texture(uSampler, clamp(vTextureCoord + offset, inputClamp.xy, inputClamp.zw));
}
`,Iu=`in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 vFilterUv;


uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform vec4 outputTexture;

uniform mat3 filterMatrix;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * outputFrame.zw + outputFrame.xy;
    
    position.x = position.x * (2.0 / outputTexture.x) - 1.0;
    position.y = position.y * (2.0*outputTexture.z / outputTexture.y) - outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (outputFrame.zw * inputSize.zw);
}

vec2 getFilterCoord( void )
{
  return ( filterMatrix * vec3( filterTextureCoord(), 1.0)  ).xy;
}


void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    vFilterUv = getFilterCoord();
}
`,Mi=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  globalFrame:vec4<f32>,
  outputTexture:vec4<f32>,
};

struct DisplacementUniforms {
  filterMatrix:mat3x3<f32>,
  scale:vec2<f32>,
  rotation:mat2x2<f32>
};



@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uSampler: texture_2d<f32>;
@group(0) @binding(2) var mySampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : DisplacementUniforms;
@group(1) @binding(1) var mapTexture: texture_2d<f32>;
@group(1) @binding(2) var mapSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;

    position.x = position.x * (2.0 / gfu.outputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.outputTexture.z / gfu.outputTexture.y) - gfu.outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.filterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{

  
  return gfu.globalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var map = textureSample(mapTexture, mapSampler, filterUv);
    
    var offset =  gfu.inputSize.zw * (filterUniforms.rotation * (map.xy - 0.5)) * filterUniforms.scale; 
   
     return textureSample(uSampler, mySampler, clamp(uv + offset, gfu.inputClamp.xy, gfu.inputClamp.zw));
}`;class $g extends Se{constructor(...e){var t;let n=e[0];n instanceof Ce&&(e[1]&&U(N,"DisplacementFilter now uses options object instead of params. {sprite, scale}"),n={sprite:n,scale:e[1]});let i=(t=n.scale)!=null?t:20;typeof i=="number"&&(i=new H(i,i));const s=new J({filterMatrix:{value:new R,type:"mat3x3<f32>"},scale:{value:i,type:"vec2<f32>"},rotation:{value:new Float32Array([0,0,0,0]),type:"vec4<f32>"}}),o=he.from({vertex:Iu,fragment:Uu,name:"displacement-filter"}),a=me.from({vertex:{source:Mi,entryPoint:"mainVertex"},fragment:{source:Mi,entryPoint:"mainFragment"}}),l=n.sprite.texture;super({gpuProgram:a,glProgram:o,resources:{filterUniforms:s,mapTexture:l.source,mapSampler:l.style}}),this._sprite=n.sprite,this._sprite.renderable=!1}apply(e,t,n,i){const s=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(s.filterMatrix,this._sprite);const o=this._sprite.worldTransform,a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.sqrt(o.c*o.c+o.d*o.d);a!==0&&l!==0&&(s.rotation[0]=o.a/a,s.rotation[1]=o.b/a,s.rotation[2]=o.c/l,s.rotation[3]=o.d/l),this.resources.mapTexture=this._sprite.texture.source,e.applyFilter(this,t,n,i)}get scale(){return this.resources.filterUniforms.uniforms.scale}}var Gu=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 fragColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * 0.2);
    float diff = (randomValue - 0.5) *  0.5;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    fragColor = color;
}
`,Ci=`

struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  globalFrame:vec4<f32>,
  outputTexture:vec4<f32>,
};

struct NoiseUniforms {
  uNoise:f32,
  uSeed:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uSampler: texture_2d<f32>;
@group(0) @binding(2) var mySampler : sampler;
@group(0) @binding(3) var backTexture: texture_2d<f32>;

@group(1) @binding(0) var<uniform> noiseUniforms : NoiseUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;

    position.x = position.x * (2.0 / gfu.outputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.outputTexture.z / gfu.outputTexture.y) - gfu.outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.globalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

fn rand(co:vec2<f32>) -> f32
{
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}



@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var pixelPosition =  globalTextureCoord(position.xy);// / (getSize());//-  gfu.outputFrame.xy);
  
    
    var sample = textureSample(uSampler, mySampler, uv);
    var randomValue =  rand(pixelPosition.xy * noiseUniforms.uSeed);
    var diff = (randomValue - 0.5) * noiseUniforms.uNoise;
  
    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (sample.a > 0.0) {
      sample.r /= sample.a;
      sample.g /= sample.a;
      sample.b /= sample.a;
    }

    sample.r += diff;
    sample.g += diff;
    sample.b += diff;

    // Premultiply alpha again.
    sample.r *= sample.a;
    sample.g *= sample.a;
    sample.b *= sample.a;
    
    return sample;
}`,Dg=Object.defineProperty,Lu=Object.getOwnPropertySymbols,zg=Object.prototype.hasOwnProperty,Ng=Object.prototype.propertyIsEnumerable,$u=(r,e,t)=>e in r?Dg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Du=(r,e)=>{for(var t in e||(e={}))zg.call(e,t)&&$u(r,t,e[t]);if(Lu)for(var t of Lu(e))Ng.call(e,t)&&$u(r,t,e[t]);return r};const zu=class extends Se{constructor(r={}){var e,t,n;r=Du(Du({},zu.DEFAULT),r);const i=new me({vertex:{source:Ci,entryPoint:"mainVertex"},fragment:{source:Ci,entryPoint:"mainFragment"}}),s=new he({vertex:Ai,fragment:Gu,name:"noise-filter"});super({gpuProgram:i,glProgram:s,resources:{noiseUniforms:new J({uNoise:{value:r.noise,type:"f32"},uSeed:{value:(e=r.seed)!=null?e:Math.random(),type:"f32"}})},resolution:1});const o=(t=r.noise)!=null?t:.5,a=(n=r.seed)!=null?n:Math.random();this.noise=o,this.seed=a}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(r){this.resources.noiseUniforms.uniforms.uNoise=r}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(r){this.resources.noiseUniforms.uniforms.uSeed=r}};let Nu=zu;Nu.DEFAULT={noise:.5,seed:void 0};var Wu=`
in vec2 vTextureCoord;
in vec4 vColor;

uniform vec4 inputSize;
uniform vec4 inputClamp;

out vec4 fragColor;

uniform vec2 uCenter;
uniform float uTime;
uniform float uSpeed;
uniform vec4 uWave;

uniform sampler2D uSampler;


const float PI = 3.14159;

void main()
{
    float uAmplitude = uWave[0];
    float uWavelength = uWave[1];
    float uBrightness = uWave[2];
    float uRadius = uWave[3];

    float halfWavelength = uWavelength * 0.5 / inputSize.x;
    float maxRadius = uRadius / inputSize.x;
    float currentRadius = uTime * uSpeed / inputSize.x;

    float fade = 1.0;

    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            fragColor = texture(uSampler, vTextureCoord);
            return;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }

    vec2 dir = vec2(vTextureCoord - uCenter / inputSize.xy);
    dir.y *= inputSize.y / inputSize.x;
    float dist = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        fragColor = texture(uSampler, vTextureCoord);
        return;
    }

    vec2 diffUV = normalize(dir);

    float diff = (dist - currentRadius) / halfWavelength;

    float p = 1.0 - pow(abs(diff), 2.0);

    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );
    float powDiff = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );

    vec2 offset = diffUV * powDiff / inputSize.xy;

    // Do clamp :
    vec2 coord = vTextureCoord + offset;
    vec2 clampedCoord = clamp(coord, inputClamp.xy, inputClamp.zw);
    vec4 color = texture(uSampler, clampedCoord);
    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    // No clamp :
    // fragColor = texture(uSampler, vTextureCoord + offset);

    color.rgb *= 1.0 + (uBrightness - 1.0) * p * fade;

    fragColor = color;
}
`,Hu=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * outputFrame.zw + outputFrame.xy;
    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Bi=`struct GlobalUniforms {
    projectionMatrix:mat3x3<f32>,
    worldTransformMatrix:mat3x3<f32>,
    worldAlpha: f32
}

struct GlobalFilterUniforms {
    inputSize:vec4<f32>,
    inputPixel:vec4<f32>,
    inputClamp:vec4<f32>,
    outputFrame:vec4<f32>,
    backgroundFrame:vec4<f32>,
    globalFrame:vec4<f32>,
};

struct ShockWaveUniforms {
    uTime: f32,
    uOffset: vec2<f32>,
    uSpeed: f32,
    uWave: vec4<f32>,
};
@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(1) @binding(1) var uSampler: texture_2d<f32>;
@group(1) @binding(2) var mySampler : sampler;
@group(1) @binding(3) var backTexture: texture_2d<f32>;
@group(2) @binding(0) var<uniform> shockwaveUniforms : ShockWaveUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) backgroundUv : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;
    return vec4((globalUniforms.projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn filterBackgroundTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * gfu.backgroundFrame.zw;
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}
fn getSize() -> vec2<f32>
{
    return gfu.globalFrame.zw;
}

@vertex
fn mainVertex(
    @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
    return VSOutput(
        filterVertexPosition(aPosition),
        filterTextureCoord(aPosition),
        filterBackgroundTextureCoord(aPosition),
    );
}

@fragment
fn mainFragment(
    @location(0) uv: vec2<f32>,
    @location(1) backgroundUv: vec2<f32>,
    @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    let uTime = shockwaveUniforms.uTime;
    let uOffset = shockwaveUniforms.uOffset;
    let uSpeed = shockwaveUniforms.uSpeed;
    let uAmplitude = shockwaveUniforms.uWave[0];
    let uWavelength = shockwaveUniforms.uWave[1];
    let uBrightness = shockwaveUniforms.uWave[2];
    let uRadius = shockwaveUniforms.uWave[3];
    let halfWavelength: f32 = uWavelength * 0.5 / gfu.inputSize.x;
    let maxRadius: f32 = uRadius / gfu.inputSize.x;
    let currentRadius: f32 = uTime * uSpeed / gfu.inputSize.x;
    var fade: f32 = 1.0;
    var returnColorOnly: bool = false;
    
    if (maxRadius > 0.0) {
        if (currentRadius > maxRadius) {
            returnColorOnly = true;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }
    var dir: vec2<f32> = vec2<f32>(uv - uOffset / gfu.inputSize.xy);
    dir.y *= gfu.inputSize.y / gfu.inputSize.x;

    let dist:f32 = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        returnColorOnly = true;
    }

    let diffUV: vec2<f32> = normalize(dir);
    let diff: f32 = (dist - currentRadius) / halfWavelength;
    let p: f32 = 1.0 - pow(abs(diff), 2.0);
    let powDiff: f32 = 1.25 * sin(diff * PI) * p * ( uAmplitude * fade );
    let offset: vec2<f32> = diffUV * powDiff / gfu.inputSize.xy;
    // Do clamp :
    let coord: vec2<f32> = uv + offset;
    let clampedCoord: vec2<f32> = clamp(coord, gfu.inputClamp.xy, gfu.inputClamp.zw);

    var clampedColor: vec4<f32> = textureSample(uSampler, mySampler, clampedCoord);
    
    if (boolVec2(coord, clampedCoord)) 
    {
        clampedColor *= max(0.0, 1.0 - length(coord - clampedCoord));
    }
    // No clamp :
    return select(clampedColor * vec4<f32>(vec3<f32>(1.0 + (uBrightness - 1.0) * p * fade), clampedColor.a), textureSample(uSampler, mySampler, uv), returnColorOnly);
}

fn boolVec2(x: vec2<f32>, y: vec2<f32>) -> bool
{
    if (x.x == y.x && x.y == y.y)
    {
        return true;
    }
    
    return false;
}

const PI: f32 = 3.14159265358979323846264;
`,Wg=Object.defineProperty,ju=Object.getOwnPropertySymbols,Hg=Object.prototype.hasOwnProperty,jg=Object.prototype.propertyIsEnumerable,Vu=(r,e,t)=>e in r?Wg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Yu=(r,e)=>{for(var t in e||(e={}))Hg.call(e,t)&&Vu(r,t,e[t]);if(ju)for(var t of ju(e))jg.call(e,t)&&Vu(r,t,e[t]);return r};const Xu=class extends Se{constructor(r={}){r=Yu(Yu({},Xu.DEFAULT),r);const e=new me({vertex:{source:Bi,entryPoint:"mainVertex"},fragment:{source:Bi,entryPoint:"mainFragment"}}),t=new he({vertex:Hu,fragment:Wu,name:"shockwave-filter"});super({gpuProgram:e,glProgram:t,resources:{shockwaveUniforms:new J({uTime:{value:0,type:"f32"},uCenter:{value:r.center,type:"vec2<f32>"},uSpeed:{value:r.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}})},resolution:1}),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,r)}apply(r,e,t,n){this.uniforms.uTime=this.time,r.applyFilter(this,e,t,n)}get center(){return this.uniforms.uCenter}set center(r){this.uniforms.uCenter=r}get centerX(){return this.uniforms.uCenter.x}set centerX(r){this.uniforms.uCenter.x=r}get centerY(){return this.uniforms.uCenter.y}set centerY(r){this.uniforms.uCenter.y=r}get speed(){return this.uniforms.uSpeed}set speed(r){this.uniforms.uSpeed=r}get amplitude(){return this.uniforms.uWave[0]}set amplitude(r){this.uniforms.uWave[0]=r}get wavelength(){return this.uniforms.uWave[1]}set wavelength(r){this.uniforms.uWave[1]=r}get brightness(){return this.uniforms.uWave[2]}set brightness(r){this.uniforms.uWave[2]=r}get radius(){return this.uniforms.uWave[3]}set radius(r){this.uniforms.uWave[3]=r}};let qu=Xu;qu.DEFAULT={center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1};class Ho{constructor(e=0,t=0,n=0,i=0,s=0,o=0){this.type="triangle",this.x=e,this.y=t,this.x2=n,this.y2=i,this.x3=s,this.y3=o}contains(e,t){const n=(this.x-this.x3)*(t-this.y3)-(this.y-this.y3)*(e-this.x3),i=(this.x2-this.x)*(t-this.y)-(this.y2-this.y)*(e-this.x);if(n<0!=i<0&&n!==0&&i!==0)return!1;const s=(this.x3-this.x2)*(t-this.y2)-(this.y3-this.y2)*(e-this.x2);return s===0||s<0==n+i<=0}clone(){return new Ho(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e=e||new X;const t=Math.min(this.x,this.x2,this.x3),n=Math.max(this.x,this.x2,this.x3),i=Math.min(this.y,this.y2,this.y3),s=Math.max(this.y,this.y2,this.y3);return e.x=t,e.y=i,e.width=n-t,e.height=s-i,e}}let Vg=0;class ce extends oe{constructor({data:e,size:t,usage:n,label:i}){super(),this.resourceType="buffer",this.resourceId=it(),this.touched=0,this.uid=Vg++,this._updateID=1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,t=t!=null?t:e==null?void 0:e.byteLength;const s=!!e;this.descriptor={size:t,usage:n,mappedAtCreation:s,label:i}}get data(){return this._data}set data(e){if(this._data!==e){const t=this._data;this._data=e,t.length!==e.length?(this.descriptor.size=e.byteLength,this.resourceId=it(),this.emit("change",this)):this.emit("update",this)}}update(e){this._updateSize=e||this.descriptor.size,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}var $=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))($||{});function Ri(r,e){if(!(r instanceof ce)){let t=e?$.INDEX:$.VERTEX;r instanceof Array&&(e?(r=new Uint32Array(r),t=$.INDEX|$.COPY_DST):(r=new Float32Array(r),t=$.VERTEX|$.COPY_DST)),r=new ce({data:r,label:"index-mesh-buffer",usage:t})}return r}let Yg=1;class tr extends oe{constructor({attributes:e,indexBuffer:t,topology:n}){super(),this.uid=Yg++,this._layoutKey=0,this.attributes=e,this.buffers=[];for(const i in e){const s=e[i];s.buffer=Ri(s.buffer,!1),this.buffers.indexOf(s.buffer)===-1&&(this.buffers.push(s.buffer),s.buffer.on("update",this.onBufferUpdate,this))}t&&(this.indexBuffer=Ri(t,!0),this.buffers.push(this.indexBuffer)),this.topology=n||"triangle-list"}onBufferUpdate(){this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const t=this.attributes[e];return this.getBuffer(e).data.length/(t.stride/4||t.size)}return 0}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(t=>t.destroy()),this.attributes=null,this.buffers=null}}var Xg=Object.defineProperty,Ku=Object.getOwnPropertySymbols,qg=Object.prototype.hasOwnProperty,Kg=Object.prototype.propertyIsEnumerable,Zu=(r,e,t)=>e in r?Xg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Qu=(r,e)=>{for(var t in e||(e={}))qg.call(e,t)&&Zu(r,t,e[t]);if(Ku)for(var t of Ku(e))Kg.call(e,t)&&Zu(r,t,e[t]);return r};const Ju=class extends tr{constructor(...r){var e;let t=(e=r[0])!=null?e:{};t instanceof Float32Array&&(U(N,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:r[1],indices:r[2]}),t=Qu(Qu({},Ju.defaultOptions),t);const n=t.positions||new Float32Array([0,0,1,0,1,1,0,1]),i=t.uvs||new Float32Array([0,0,1,0,1,1,0,1]),s=t.indices||new Uint32Array([0,1,2,0,2,3]),o=new ce({data:n,label:"attribute-mesh-positions",usage:$.VERTEX|$.COPY_DST}),a=new ce({data:i,label:"attribute-mesh-uvs",usage:$.VERTEX|$.COPY_DST}),l=new ce({data:s,label:"index-mesh-buffer",usage:$.INDEX|$.COPY_DST});super({attributes:{aPosition:{buffer:o,shaderLocation:0,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:a,shaderLocation:1,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(r){this.attributes.aPosition.buffer.data=r}get uvs(){return this.attributes.aUV.buffer.data}set uvs(r){this.attributes.aUV.buffer.data=r}get indices(){return this.indexBuffer.data}set indices(r){this.indexBuffer.data=r}};let _t=Ju;_t.defaultOptions={topology:"triangle-list"};var Zg=Object.defineProperty,eh=Object.getOwnPropertySymbols,Qg=Object.prototype.hasOwnProperty,Jg=Object.prototype.propertyIsEnumerable,th=(r,e,t)=>e in r?Zg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,rh=(r,e)=>{for(var t in e||(e={}))Qg.call(e,t)&&th(r,t,e[t]);if(eh)for(var t of eh(e))Jg.call(e,t)&&th(r,t,e[t]);return r};const nh=class extends _t{constructor(...r){var e;super({});let t=(e=r[0])!=null?e:{};typeof t=="number"&&(U(N,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:r[1],verticesX:r[2],verticesY:r[3]}),this.build(t)}build(r){var e,t,n,i;r=rh(rh({},nh.defaultOptions),r),this.verticesX=(e=this.verticesX)!=null?e:r.verticesX,this.verticesY=(t=this.verticesY)!=null?t:r.verticesY,this.width=(n=this.width)!=null?n:r.width,this.height=(i=this.height)!=null?i:r.height;const s=this.verticesX*this.verticesY,o=[],a=[],l=[],u=this.verticesX-1,h=this.verticesY-1,c=this.width/u,p=this.height/h;for(let f=0;f<s;f++){const g=f%this.verticesX,m=f/this.verticesX|0;o.push(g*c,m*p),a.push(g/u,m/h)}const d=u*h;for(let f=0;f<d;f++){const g=f%u,m=f/u|0,y=m*this.verticesX+g,v=m*this.verticesX+g+1,b=(m+1)*this.verticesX+g,_=(m+1)*this.verticesX+g+1;l.push(y,v,b,v,_,b)}this.buffers[0].data=new Float32Array(o),this.buffers[1].data=new Float32Array(a),this.indexBuffer.data=new Uint32Array(l),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};let ki=nh;ki.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};var ev=Object.defineProperty,ih=Object.getOwnPropertySymbols,tv=Object.prototype.hasOwnProperty,rv=Object.prototype.propertyIsEnumerable,sh=(r,e,t)=>e in r?ev(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,oh=(r,e)=>{for(var t in e||(e={}))tv.call(e,t)&&sh(r,t,e[t]);if(ih)for(var t of ih(e))rv.call(e,t)&&sh(r,t,e[t]);return r};const ah=class extends ki{constructor(r){r=oh(oh({},ah.defaultOptions),r),super({width:r.width,height:r.height,verticesX:4,verticesY:4}),this._textureMatrix=new R,this.update(r)}update(r){this.updateUvs(r),this.updatePositions(r)}updatePositions(r){var e,t,n,i,s,o;this.width=(e=r.width)!=null?e:this.width,this.height=(t=r.height)!=null?t:this.height,this._leftWidth=(n=r.leftWidth)!=null?n:this._leftWidth,this._rightWidth=(i=r.rightWidth)!=null?i:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight;const a=this.positions,l=this._leftWidth+this._rightWidth,u=this.width>l?1:this.width/l,h=this._topHeight+this._bottomHeight,c=this.height>h?1:this.height/h,p=Math.min(u,c);a[9]=a[11]=a[13]=a[15]=this._topHeight*p,a[17]=a[19]=a[21]=a[23]=this.height-this._bottomHeight*p,a[25]=a[27]=a[29]=a[31]=this.height,a[2]=a[10]=a[18]=a[26]=this._leftWidth*p,a[4]=a[12]=a[20]=a[28]=this.width-this._rightWidth*p,a[6]=a[14]=a[22]=a[30]=this.width,this.getBuffer("aPosition").update()}updateUvs(r){var e,t,n,i,s,o;this._originalWidth=(e=r.originalWidth)!=null?e:this._originalWidth,this._originalHeight=(t=r.originalHeight)!=null?t:this._originalHeight,this._leftWidth=(n=r.leftWidth)!=null?n:this._leftWidth,this._rightWidth=(i=r.rightWidth)!=null?i:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight,r.textureMatrix&&this._textureMatrix.copyFrom(r.textureMatrix);const a=this._textureMatrix,l=this.uvs;l[0]=l[8]=l[16]=l[24]=0,l[1]=l[3]=l[5]=l[7]=0,l[6]=l[14]=l[22]=l[30]=1,l[25]=l[27]=l[29]=l[31]=1;const u=1/this._originalWidth,h=1/this._originalHeight;l[2]=l[10]=l[18]=l[26]=u*this._leftWidth,l[9]=l[11]=l[13]=l[15]=h*this._topHeight,l[4]=l[12]=l[20]=l[28]=1-u*this._rightWidth,l[17]=l[19]=l[21]=l[23]=1-h*this._bottomHeight,nv(a,l),this.getBuffer("aUV").update()}};let Oi=ah;Oi.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};function nv(r,e,t){t!=null||(t=e);const n=r.a,i=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty;for(let u=0;u<e.length;u+=2){const h=e[u],c=e[u+1];t[u]=h*n+c*s+a,t[u+1]=h*i+c*o+l}return t}let iv=0;const lh=new ct;class rr{constructor(e){this.uid=iv++,this.renderPipeId="mesh",this.canBundle=!0,this.owner=vt,this.state=_e.for2d();var t,n,i;this.shader=e.shader,this.texture=(i=(n=e.texture)!=null?n:(t=this.shader)==null?void 0:t.texture)!=null?i:A.WHITE,this._geometry=e.geometry,this._geometry.on("update",this.onUpdate,this)}set shader(e){this._shader!==e&&(this._shader=e,this.onUpdate())}get shader(){return this._shader}set geometry(e){var t;this._geometry!==e&&((t=this._geometry)==null||t.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._geometry=e,this.onUpdate())}get geometry(){return this._geometry}set texture(e){this._texture!==e&&(this.shader&&(this.shader.texture=e),this._texture=e,this.onUpdate())}get texture(){return this._texture}get batched(){return this._shader?!1:this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch"}addBounds(e){e.addVertexData(this.geometry.positions,0,this.geometry.positions.length)}containsPoint(e){const{x:t,y:n}=e,i=this.geometry.getBuffer("aPosition").data,s=lh.points,o=this.geometry.getIndex().data,a=o.length,l=this.geometry.topology==="triangle-strip"?3:1;for(let u=0;u+2<a;u+=l){const h=o[u]*2,c=o[u+1]*2,p=o[u+2]*2;if(s[0]=i[h],s[1]=i[h+1],s[2]=i[c],s[3]=i[c+1],s[4]=i[p],s[5]=i[p+1],lh.contains(t,n))return!0}return!1}onUpdate(){this.owner.onViewUpdate()}destroy(e=!1){if(typeof e=="boolean"?e:e!=null&&e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._geometry=null,this._shader=null}}var sv=Object.defineProperty,uh=Object.getOwnPropertySymbols,ov=Object.prototype.hasOwnProperty,av=Object.prototype.propertyIsEnumerable,hh=(r,e,t)=>e in r?sv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Fi=(r,e)=>{for(var t in e||(e={}))ov.call(e,t)&&hh(r,t,e[t]);if(uh)for(var t of uh(e))av.call(e,t)&&hh(r,t,e[t]);return r};const ch=class extends Y{constructor(r){r instanceof A&&(r={texture:r}),r=Fi(Fi({},ch.defaultOptions),r);const e=r.texture,t=new Oi({width:e.width,height:e.height,originalWidth:e.width,originalHeight:e.height,leftWidth:r.leftWidth,topHeight:r.topHeight,rightWidth:r.rightWidth,bottomHeight:r.bottomHeight,textureMatrix:e.textureMatrix.mapCoord});super(Fi({view:new rr({geometry:t,texture:e}),label:"NineSliceSprite"},r))}get width(){return this.view.geometry.width}set width(r){this.view.geometry.updatePositions({width:r})}get height(){return this.view.geometry.height}set height(r){this.view.geometry.updatePositions({height:r})}get leftWidth(){return this.view.geometry._leftWidth}set leftWidth(r){this.view.geometry.updateUvs({leftWidth:r})}get topHeight(){return this.view.geometry._topHeight}set topHeight(r){this.view.geometry.updateUvs({topHeight:r})}get rightWidth(){return this.view.geometry._rightWidth}set rightWidth(r){this.view.geometry.updateUvs({rightWidth:r})}get bottomHeight(){return this.view.geometry._bottomHeight}set bottomHeight(r){this.view.geometry.updateUvs({bottomHeight:r})}get texture(){return this.view.texture}set texture(r){r!==this.view.texture&&(this.view.geometry.updateUvs({originalWidth:r.width,originalHeight:r.height,textureMatrix:r.textureMatrix.mapCoord}),this.view.texture=r)}};let Ui=ch;Ui.defaultOptions={texture:A.EMPTY,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10};class lv extends Ui{constructor(...e){let t=e[0];t instanceof A&&(U(N,"NineSlicePlane now uses the options object {texture, leftWidth, rightWidth, topHeight, bottomHeight}"),t={texture:t,leftWidth:e[1],topHeight:e[2],rightWidth:e[3],bottomHeight:e[4]}),U(N,"NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(t)}}class En extends Ce{constructor(e,t=!0){super(e[0]instanceof A?e[0]:e[0].texture),this._textures=null,this._durations=null,this._autoUpdate=t,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=e}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(Pe.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(Pe.shared.add(this.update,this,Ve.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,n=this.animationSpeed*t,i=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=n/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const o=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*o,this._currentTime+=o;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=n;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):i!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<i||this.animationSpeed<0&&this.currentFrame>i)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.layout.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let n=0;n<e.length;++n)t.push(A.from(e[n]));return new En(t)}static fromImages(e){const t=[];for(let n=0;n<e.length;++n)t.push(A.from(e[n]));return new En(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof A)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(Pe.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(Pe.shared.add(this.update,this),this._isConnectedToTicker=!0))}}function jr({vertexSrc:r,fragmentSrc:e,maxTextures:t,name:n}){if(e.indexOf("%count%")<0)throw new Error('Fragment template must contain "%count%".');if(e.indexOf("%forloop%")<0)throw new Error('Fragment template must contain "%forloop%".');const i=uv(t);return e=e.replace(/%count%/gi,`${t}`),e=e.replace(/%forloop%/gi,i),n=n?`${n}-`:"",new he({vertex:r,fragment:e,name:`${n}batch`})}function uv(r){const e=[];for(let t=0;t<r;t++)t>0&&e.push("else"),t<r-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uSamplers[${t}], vTextureCoord);`),e.push("}");return e.join(`
`)}var dh=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,ph=`in vec2 aPosition;
in vec2 aUV;
in vec4 aColor;
in float aTextureId;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

out vec2 vTextureCoord;
out vec4 vColor;
out float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * worldTransformMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aUV;
    vTextureId = aTextureId;
    
    vColor = vec4(aColor.rgb * aColor.a, aColor.a)  * worldAlpha;
}
`;function fh(r){return jr({vertexSrc:ph,fragmentSrc:dh,maxTextures:r,name:"default"})}const ge=16,mh=new Int32Array(ge);for(let r=0;r<ge;r++)mh[r]=r;const Vr=new J({uSamplers:{value:mh,type:"u32",size:ge}},{isStatic:!0});class Ii{constructor(){this._didUpload=!1,this._tempState=_e.for2d()}init(){const e=new J({tint:{value:new Float32Array([1,1,1,1]),type:"f32"},translationMatrix:{value:new R,type:"mat3x3<f32>"}});this._shader=new Ee({glProgram:fh(ge),resources:{uniforms:e,batchSamplers:Vr}})}start(e,t){const n=e.renderer;n.shader.bind(this._shader,this._didUpload),n.shader.bindUniformBlock(n.globalUniforms.uniformGroup,"globalUniforms",0),n.geometry.bind(t,this._shader.glProgram)}execute(e,t){const n=e.renderer;this._didUpload=!0,this._tempState.blendMode=t.blendMode,n.state.set(this._tempState);const i=t.textures.textures;for(let s=0;s<i.length;s++)n.texture.bind(i[s],s);n.geometry.draw("triangle-list",t.size,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}Ii.extension={type:[x.WebGLPipesAdaptor],name:"batch"};const gh=new Float32Array(1),vh=new Uint32Array(1);class bh extends tr{constructor(){const e=new ce({data:gh,label:"attribute-batch-buffer",usage:$.VERTEX|$.COPY_DST}),t=new ce({data:vh,label:"index-batch-buffer",usage:$.INDEX|$.COPY_DST}),n=6*4;super({attributes:{aPosition:{buffer:e,shaderLocation:0,format:"float32x2",stride:n,offset:0},aUV:{buffer:e,shaderLocation:1,format:"float32x2",stride:n,offset:2*4},aColor:{buffer:e,shaderLocation:2,format:"unorm8x4",stride:n,offset:4*4},aTextureId:{buffer:e,shaderLocation:3,format:"float32",stride:n,offset:5*4}},indexBuffer:t})}reset(){this.indexBuffer.data=vh,this.buffers[0].data=gh}}function Yr({vertex:r,fragment:e,maxTextures:t}){if(e.source.indexOf("%bindings%")<0)throw new Error('Fragment template must contain "%bindings%".');if(e.source.indexOf("%forloop%")<0)throw new Error('Fragment template must contain "%forloop%".');const n=xh(t),i=yh(t);let s=e.source;s=s.replace(/%bindings%/gi,n),s=s.replace(/%forloop%/gi,i);let o=r.source;return o===e.source&&(o=s),new me({vertex:{source:o,entryPoint:r.entryPoint},fragment:{source:s,entryPoint:e.entryPoint}})}function hv(r){const e={};let t=0;for(let n=0;n<r;n++)e[`textureSource${n+1}`]=t++,e[`textureSampler${n+1}`]=t++;return e}function cv(r){const e=[];let t=0;for(let n=0;n<r;n++)e[t]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:t,visibility:GPUShaderStage.FRAGMENT},t++,e[t]={sampler:{type:"filtering"},binding:t,visibility:GPUShaderStage.FRAGMENT},t++;return e}function yh(r){const e=[];if(r===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, uv, uvDx, uvDy);");else{e.push("switch textureId {");for(let t=0;t<r;t++)t===r-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, uv, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function xh(r){const e=[];if(r===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let n=0;n<r;n++)e.push(`@group(1) @binding(${t++}) var textureSource${n+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${n+1}: sampler;`)}return e.join(`
`)}var Gi=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
    @location(2) @interpolate(flat) textureId : u32,
  };

  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aUV : vec2<f32>,
  @location(2) aColor : vec4<f32>,
  @location(3) aTexture : f32,
) -> VSOutput {

  var  mvpMatrix = globalUniforms.projectionMatrix * globalUniforms.worldTransformMatrix;

  var  colorOut = aColor;

  var alpha = vec4<f32>(
    colorOut.a * globalUniforms.worldAlpha,
    colorOut.a * globalUniforms.worldAlpha,
    colorOut.a * globalUniforms.worldAlpha,
    globalUniforms.worldAlpha
  );

  colorOut *= alpha;


  return VSOutput(
    vec4<f32>((mvpMatrix * vec3<f32>(aPosition, 1.0)).xy, 0.0, 1.0),
    aUV,
    colorOut,
    u32(aTexture)
  );
};

%bindings%

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color:vec4<f32>,
  @location(2) @interpolate(flat) textureId: u32,
) -> @location(0) vec4<f32> {


    var uvDx = dpdx(uv);
    var uvDy = dpdy(uv);

    var outColor:vec4<f32>;
    
    %forloop%
  
    // multiply the alpha!
    outColor.r *= outColor.a;
    outColor.g *= outColor.a;
    outColor.b *= outColor.a;

    return (outColor) * color;
};
`;function _h(r){return Yr({vertex:{source:Gi,entryPoint:"mainVertex"},fragment:{source:Gi,entryPoint:"mainFragment"},maxTextures:r})}const dv=new Float32Array(1),pv=new Uint32Array(1);function Li(){const r=new ce({data:dv,label:"attribute-batch-buffer",usage:$.VERTEX|$.COPY_DST}),e=new ce({data:pv,label:"index-batch-buffer",usage:$.INDEX|$.COPY_DST}),t=6*4;return new tr({attributes:{aPosition:{buffer:r,shaderLocation:0,format:"float32x2",stride:t,offset:0},aUV:{buffer:r,shaderLocation:1,format:"float32x2",stride:t,offset:2*4},aColor:{buffer:r,shaderLocation:2,format:"unorm8x4",stride:t,offset:4*4},aTextureId:{buffer:r,shaderLocation:3,format:"float32",stride:t,offset:5*4}},indexBuffer:e})}const wh={};function $i(r,e){let t=0;for(let n=0;n<e;n++)t=t*31+r[n].styleSourceKey>>>0;return wh[t]||fv(r,t)}function fv(r,e){const t={};let n=0;for(let s=0;s<ge;s++){const o=s<r.length?r[s]:A.EMPTY.source;t[n++]=o.source,t[n++]=o.style}const i=new Te(t);return wh[e]=i,i}const Xr=_e.for2d();class Di{constructor(){this._pipelines={}}init(){this._shader=new Ee({gpuProgram:_h(ge),groups:{}})}start(e,t){const n=e.renderer,i=n.encoder,s=this._shader.gpuProgram;i.setGeometry(t),this._pipelines.normal||(Xr.blendMode="normal",this._pipelines.normal=n.pipeline.getPipeline(t,s,Xr));const o=n.globalUniforms.bindGroup;i.setBindGroup(0,o,s)}execute(e,t){const n=this._shader.gpuProgram,i=e.renderer,s=i.encoder;if(!t.gpuBindGroup){const o=t.textures;t.bindGroup=$i(o.textures,o.count),t.gpuBindGroup=i.bindGroup.getBindGroup(t.bindGroup,n,1)}this._pipelines[t.blendMode]||(Xr.blendMode=t.blendMode,this._pipelines[t.blendMode]=i.pipeline.getPipeline(t.batcher.geometry,n,Xr)),t.bindGroup.touch(i.textureGC.count),s.setPipeline(this._pipelines[t.blendMode]),s.renderPassEncoder.setBindGroup(1,t.gpuBindGroup),s.renderPassEncoder.drawIndexed(t.size,1,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}Di.extension={type:[x.WebGPUPipesAdaptor],name:"batch"};class nr{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function wt(r,e){const t=r.byteLength/8|0,n=new Float64Array(r,0,t),i=new Float64Array(e,0,t);for(let a=0;a<t;a++)i[a]=n[a];const s=new Uint8Array(r,t*8),o=new Uint8Array(e,t*8);for(let a=0;a<s.length;a++)o[a]=s[a]}class ir{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){const t=this.textures[e];this.textures[e]=null,this.ids[t._textureBindLocation]=null}this.count=0}}class sr{constructor(){this.type="batch",this.action="startBatch",this.start=0,this.size=0,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}let or=0,mv=0;class zi{constructor(e=4,t=6){this.uid=mv++,this.dirty=!0,this.batchIndex=0,this.batches=[],this.geometry=Li(),this._vertexSize=6,this._elements=[],this._batchPool=[],this._batchPoolIndex=0,this._textureBatchPool=[],this._textureBatchPoolIndex=0,this.attributeBuffer=new nr(e*this._vertexSize*4),this.indexBuffer=new Uint32Array(t)}begin(){this.batchIndex=0,this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0,this._batchPoolIndex=0,this._textureBatchPoolIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e.indexStart=this.indexSize,e.location=this.attributeSize,e.batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.vertexSize*this._vertexSize}checkAndUpdateTexture(e,t){const n=e.batch.textures.ids[t._source._textureBindLocation];return n===void 0?!1:(e.textureId=n,e.texture=t,!0)}updateElement(e){this.dirty=!0,e.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,e.location,e.textureId)}break(e){const t=this._elements;let n=this._textureBatchPool[this._textureBatchPoolIndex++]||new ir;if(n.clear(),!t[this.elementStart])return;let i=t[this.elementStart].blendMode;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const s=this.attributeBuffer.float32View,o=this.attributeBuffer.uint32View,a=this.indexBuffer;let l=this._batchIndexSize,u=this._batchIndexStart,h="startBatch",c=this._batchPool[this._batchPoolIndex++]||new sr;for(let p=this.elementStart;p<this.elementSize;++p){const d=t[p];t[p]=null;const f=d.texture._source,g=i!==d.blendMode;if(f._batchTick===or&&!g){d.textureId=f._textureBindLocation,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize),d.batch=c;continue}f._batchTick=or,(n.count>=ge||g)&&(this._finishBatch(c,u,l-u,n,i,e,h),h="renderBatch",u=l,i=d.blendMode,n=this._textureBatchPool[this._textureBatchPoolIndex++]||new ir,n.clear(),c=this._batchPool[this._batchPoolIndex++]||new sr,++or),d.textureId=f._textureBindLocation=n.count,n.ids[f._textureBindLocation]=n.count,n.textures[n.count++]=f,d.batch=c,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize)}n.count>0&&(this._finishBatch(c,u,l-u,n,i,e,h),u=l,++or),this.elementStart=this.elementSize,this._batchIndexStart=u,this._batchIndexSize=l}_finishBatch(e,t,n,i,s,o,a){e.gpuBindGroup=null,e.action=a,e.batcher=this,e.textures=i,e.blendMode=s,e.start=t,e.size=n,++or,o.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const t=Math.max(e,this.attributeBuffer.size*2),n=new nr(t);wt(this.attributeBuffer.rawBinaryData,n.rawBinaryData),this.attributeBuffer=n}_resizeIndexBuffer(e){const t=this.indexBuffer,n=Math.max(e,t.length*2),i=new Uint32Array(n);wt(t.buffer,i.buffer),this.indexBuffer=i}destroy(){for(let e=0;e<this.batches.length;e++)this.batches[e].destroy();this.batches=null;for(let e=0;e<this._elements.length;e++)this._elements[e].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}class Ni{constructor(e,t){this.state=_e.for2d(),this._batches=Object.create(null),this._geometries=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}buildStart(e){this._batches[e.uid]||(this._batches[e.uid]=new zi,this._geometries[e.uid]=Li()),this._activeBatch=this._batches[e.uid],this._activeGeometry=this._geometries[this._activeBatch.uid],this._activeBatch.begin()}addToBatch(e){this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){const t=this._activeBatch,n=this._activeGeometry;t.finish(e),n.indexBuffer.data=t.indexBuffer,n.indexBuffer.update(t.indexSize*4),n.buffers[0].data=t.attributeBuffer.float32View}upload(){const e=this._activeBatch;e.dirty&&(e.dirty=!1,this._activeGeometry.buffers[0].update(e.attributeSize*4))}execute(e){if(e.action==="startBatch"){const t=e.batcher,n=this._geometries[t.uid];this._adaptor.start(this,n)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor.destroy(),this._adaptor=null;for(const e in this._batches)this._batches[e].destroy();this._batches=null;for(const e in this._geometries)this._geometries[e].destroy();this._geometries=null}}Ni.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"batch"};class gv{constructor(){this.batchTick=-1,this.batchLocation=-1}}let ar=0;const vv=Object.create(null);let bv=0;class yv{constructor(e=4,t=6){this.uid=bv++,this.dirty=!0,this.batchIndex=0,this.batches=[],this._vertexSize=6,this._elements=[],this._batchPool=[],this._batchPoolIndex=0,this._textureBatchPool=[],this._textureBatchPoolIndex=0,this.attributeBuffer=new nr(e*this._vertexSize*4),this.indexBuffer=new Uint32Array(t)}begin(){this.batchIndex=0,this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0,this._batchPoolIndex=0,this._textureBatchPoolIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e.indexStart=this.indexSize,e.location=this.attributeSize,e.batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.vertexSize*this._vertexSize}checkAndUpdateTexture(e,t){const n=e.batch.textures.ids[t._source._textureBindLocation];return n===void 0?!1:(e.textureId=n,e.texture=t,!0)}updateElement(e){this.dirty=!0,e.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,e.location,e.textureId)}break(e){const t=this._elements;let n=this._textureBatchPool[this._textureBatchPoolIndex++]||new ir;if(n.clear(),!t[this.elementStart])return;let i=t[this.elementStart].blendMode;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const s=this.attributeBuffer.float32View,o=this.attributeBuffer.uint32View,a=this.indexBuffer;let l=this._batchIndexSize,u=this._batchIndexStart,h="startBatch",c=this._batchPool[this._batchPoolIndex++]||new sr;for(let p=this.elementStart;p<this.elementSize;++p){const d=t[p];t[p]=null;const f=d.texture,g=f.styleSourceKey,m=vv[g]||new gv;if(m.batchTick===ar){d.textureId=m.batchLocation,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize),d.batch=c;continue}m.batchTick=ar,(n.count>=ge||i!==d.blendMode)&&(this._finishBatch(c,u,l-u,n,i,e,h),h="renderBatch",u=l,i=d.blendMode,n=this._textureBatchPool[this._textureBatchPoolIndex++]||new ir,n.clear(),c=this._batchPool[this._batchPoolIndex++]||new sr,++ar),m.batchLocation=d.textureId=n.count,n.ids[g]=n.count,n.textures[n.count++]=f,d.batch=c,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize)}n.count>0&&(this._finishBatch(c,u,l-u,n,i,e,h),u=l,++ar),this.elementStart=this.elementSize,this._batchIndexStart=u,this._batchIndexSize=l}_finishBatch(e,t,n,i,s,o,a){e.gpuBindGroup=null,e.action=a,e.batcher=this,e.textures=i,e.blendMode=s,e.start=t,e.size=n,++ar,o.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const t=Math.max(e,this.attributeBuffer.size*2),n=new nr(t);wt(this.attributeBuffer.rawBinaryData,n.rawBinaryData),this.attributeBuffer=n}_resizeIndexBuffer(e){const t=this.indexBuffer,n=Math.max(e,t.length*2),i=new Uint32Array(n);wt(t.buffer,i.buffer),this.indexBuffer=i}destroy(){for(let e=0;e<this.batches.length;e++)this.batches[e].destroy();this.batches=null;for(let e=0;e<this._elements.length;e++)this._elements[e].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}var Th=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 fragColor;

uniform float uBlend;

uniform sampler2D uSampler;
uniform sampler2D backTexture;

{FUNCTIONS}

void main()
{ 
    vec4 back = texture(backTexture, vTextureCoord);
    vec4 front = texture(uSampler, vTextureCoord);

    {MAIN}
}
`,Sh=`in vec2 aPosition;
out vec2 vTextureCoord;
out vec2 backgroundUv;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform vec4 backgroundFrame;
uniform vec4 outputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * outputFrame.zw + outputFrame.xy;
    
    position.x = position.x * (2.0 / outputTexture.x) - 1.0;
    position.y = position.y * (2.0*outputTexture.z / outputTexture.y) - outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Ph=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  globalFrame:vec4<f32>,
  outputTexture:vec4<f32>,
};

struct BlendUniforms {
  uBlend:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uSampler: texture_2d<f32>;
@group(0) @binding(2) var mySampler : sampler;
@group(0) @binding(3) var backTexture: texture_2d<f32>;

@group(1) @binding(0) var<uniform> blendUniforms : BlendUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;

    position.x = position.x * (2.0 / gfu.outputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.outputTexture.z / gfu.outputTexture.y) - gfu.outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

{FUNCTIONS}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>
) -> @location(0) vec4<f32> {


   var back =  textureSample(backTexture, mySampler, uv);
   var front = textureSample(uSampler, mySampler, uv);
   
   var out = vec4<f32>(0.0,0.0,0.0,0.0);

   {MAIN}

   return out;
}`,xv=Object.defineProperty,Ah=Object.getOwnPropertySymbols,_v=Object.prototype.hasOwnProperty,wv=Object.prototype.propertyIsEnumerable,Eh=(r,e,t)=>e in r?xv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Mh=(r,e)=>{for(var t in e||(e={}))_v.call(e,t)&&Eh(r,t,e[t]);if(Ah)for(var t of Ah(e))wv.call(e,t)&&Eh(r,t,e[t]);return r};class Q extends Se{constructor(e){const t=e.gpu,n=Ch(Mh({source:Ph},t)),i=new me({vertex:{source:n,entryPoint:"mainVertex"},fragment:{source:n,entryPoint:"mainFragment"}}),s=e.gl,o=Ch(Mh({source:Th},s)),a=new he({vertex:Sh,fragment:o}),l=new J({uBlend:{value:1,type:"f32"}});super({gpuProgram:i,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,backTexture:A.EMPTY}})}}function Ch(r){const{source:e,functions:t,main:n}=r;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",n)}const qr=`
	float getLuminosity(vec3 c) {
		return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
	}

	vec3 setLuminosity(vec3 c, float lum) {
		float modLum = lum - getLuminosity(c);
		vec3 color = c.rgb + vec3(modLum);

		// clip back into legal range
		modLum = getLuminosity(color);
		vec3 modLumVec = vec3(modLum);

		float cMin = min(color.r, min(color.g, color.b));
		float cMax = max(color.r, max(color.g, color.b));

		if(cMin < 0.0) {
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0) {
			color = mix(modLumVec, color, (1.0 - modLum) / (cMax - modLum));
		}

		return color;
	}

	float getSaturation(vec3 c) {
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	vec3 setSaturationMinMidMax(vec3 cSorted, float s) {
		vec3 colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x) {
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else {
			colorSorted.y = 0.0;
			colorSorted.z = 0.0;
		}

		colorSorted.x = 0.0;

		return colorSorted;
	}

	vec3 setSaturation(vec3 c, float s) {
		vec3 color = c;

		if(color.r <= color.g && color.r <= color.b) {
			if(color.g <= color.b) {
				color = setSaturationMinMidMax(color.rgb, s).rgb;
			}
			else {
				color = setSaturationMinMidMax(color.rbg, s).rbg;
			}
		}
		else if(color.g <= color.r && color.g <= color.b) {
			if(color.r <= color.b) {
				color = setSaturationMinMidMax(color.grb, s).grb;
			}
			else {
				color = setSaturationMinMidMax(color.gbr, s).gbr;
			}
		}
		else {
			// Using bgr for both fixes part of hue
			if(color.r <= color.g) {
				color = setSaturationMinMidMax(color.brg, s).brg;
			}
			else {
				color = setSaturationMinMidMax(color.bgr, s).bgr;
			}
		}

		return color;
	}
    `,Kr=`
	fn getLuminosity(c: vec3<f32>) -> f32
	{
		return 0.3*c.r + 0.59*c.g + 0.11*c.b;
	}

	fn setLuminosity(c: vec3<f32>, lum: f32) -> vec3<f32>
	{
		var modLum: f32 = lum - getLuminosity(c);
		var color: vec3<f32> = c.rgb + modLum;

		// clip back into legal range
		modLum = getLuminosity(color);
		let modLumVec = vec3<f32>(modLum);

		let cMin: f32 = min(color.r, min(color.g, color.b));
		let cMax: f32 = max(color.r, max(color.g, color.b));

		if(cMin < 0.0)
		{
			color = mix(modLumVec, color, modLum / (modLum - cMin));
		}

		if(cMax > 1.0)
		{
			color = mix(modLumVec, color, (1 - modLum) / (cMax - modLum));
		}

		return color;
	}

	fn getSaturation(c: vec3<f32>) -> f32
	{
		return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
	}

	fn setSaturationMinMidMax(cSorted: vec3<f32>, s: f32) -> vec3<f32>
	{
		var colorSorted = cSorted;

		if(colorSorted.z > colorSorted.x)
		{
			colorSorted.y = (((colorSorted.y - colorSorted.x) * s) / (colorSorted.z - colorSorted.x));
			colorSorted.z = s;
		}
		else
		{
			colorSorted.y = 0;
			colorSorted.z = 0;
		}

		colorSorted.x = 0;

		return colorSorted;
	}

	fn setSaturation(c: vec3<f32>, s: f32) -> vec3<f32>
	{
		var color = c;

		if (color.r <= color.g && color.r <= color.b)
		{
			if (color.g <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rgb, s)).rgb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.rbg, s)).rbg;
			}
		}
		else if (color.g <= color.r && color.g <= color.b)
		{
			if (color.r <= color.b)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.grb, s)).grb;
			}
			else
			{
				color = vec3<f32>(setSaturationMinMidMax(color.gbr, s)).gbr;
			}
		}
		else
		{
			// Using bgr for both fixes part of hue
			if (color.r <= color.g)
			{
				color = vec3<f32>(setSaturationMinMidMax(color.brg, s)).brg;
			}
			else
			{
				color  = vec3<f32>(setSaturationMinMidMax(color.bgr, s)).bgr;
			}
		}

		return color;
	}
	`;var Bh=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mapTexture;

uniform float alpha;
uniform vec4 maskClamp;

out vec4 fragColor;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = alpha; 
    vec4 original = texture(uSampler, vTextureCoord);
    vec4 masky = texture(mapTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    fragColor = original;
}
`,Rh=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform vec4 outputTexture;
uniform mat3 filterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * outputFrame.zw + outputFrame.xy;
       
    position.x = position.x * (2.0 / outputTexture.x) - 1.0;
    position.y = position.y * (2.0*outputTexture.z / outputTexture.y) - outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (outputFrame.zw * inputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( filterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`,Wi=`struct GlobalFilterUniforms {
  inputSize:vec4<f32>,
  inputPixel:vec4<f32>,
  inputClamp:vec4<f32>,
  outputFrame:vec4<f32>,
  globalFrame:vec4<f32>,
  outputTexture:vec4<f32>,  
};

struct MaskUniforms {
  filterMatrix:mat3x3<f32>,
  maskClamp:vec4<f32>,
  alpha:f32,
};


@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uSampler: texture_2d<f32>;
@group(0) @binding(2) var mySampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var mapTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.outputFrame.zw + gfu.outputFrame.xy;

    position.x = position.x * (2.0 / gfu.outputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.outputTexture.z / gfu.outputTexture.y) - gfu.outputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.outputFrame.zw * gfu.inputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.globalFrame.zw) + (gfu.globalFrame.xy / gfu.globalFrame.zw);  
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.filterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{

  
  return gfu.globalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.maskClamp;

     var clip = step(3.5,
        step(maskClamp.x, filterUv.x) +
        step(maskClamp.y, filterUv.y) +
        step(filterUv.x, maskClamp.z) +
        step(filterUv.y, maskClamp.w));

    var mask = textureSample(mapTexture, mySampler, filterUv);
    var source = textureSample(uSampler, mySampler, uv);
    
    var npmAlpha = 0.0;

    var alphaMul = 1.0 - npmAlpha * (1.0 - mask.a);

    var a = (alphaMul * mask.r) * clip;

    return vec4(source.rgb * a, source.a) * a;
  
}`;class kh extends Se{constructor({sprite:e}){const t=new Gn(e.texture),n=new J({filterMatrix:{value:new R,type:"mat3x3<f32>"},maskClamp:{value:t.uClampFrame,type:"vec4<f32>"},alpha:{value:1,type:"f32"}}),i=new me({vertex:{source:Wi,entryPoint:"mainVertex"},fragment:{source:Wi,entryPoint:"mainFragment"}}),s=he.from({vertex:Rh,fragment:Bh,name:"mask-filter"});super({gpuProgram:i,glProgram:s,resources:{filterUniforms:n,mapTexture:e.texture.source}}),this.sprite=e,this._textureMatrix=t}apply(e,t,n,i){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.filterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,t,n,i)}}class Hi{constructor(e){this._renderer=e}push(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({type:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({type:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Hi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"filter"};function Oh(r,e){e.clear();const t=e.matrix;for(let n=0;n<r.length;n++){const i=r[n];i.layerVisibleRenderable<3||(e.matrix=i.worldTransform,i.view.addBounds(e))}return e.matrix=t,e}const Tv=new tr({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),shaderLocation:0,format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class ji{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new J({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"},outputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Te({}),this.renderer=e}push(e){const t=this.renderer,n=e.filterEffect.filters;this._filterStack[this._filterStackIndex]||(this._filterStack[this._filterStackIndex]=this._getFilterData());const i=this._filterStack[this._filterStackIndex];this._filterStackIndex++;const s=i.bounds;if(e.renderables?Oh(e.renderables,s):$t(e.container,!0,s),n.length===0){i.skip=!0;return}let o=t.renderTarget.rootRenderTarget.colorTexture.source._resolution,a=0,l=t.renderTarget.rootRenderTarget.colorTexture.source.antialias,u=!1,h=!1;for(let c=0;c<n.length;c++){const p=n[c];if(o=Math.min(o,p.resolution),a+=p.padding,p.antialias!=="inherit"&&(p.antialias==="on"?l=!0:l=!1),!(p.compatibleRenderers&t.type)){h=!1;break}h=p.enabled||h,u=u||p.blendRequired}if(!h){i.skip=!0;return}if(s.scale(o).fit(t.renderTarget.rootRenderTarget.viewport).scale(1/o).pad(a).ceil(),!s.isPositive){i.skip=!0;return}i.skip=!1,i.bounds=s,i.blendRequired=u,i.container=e.container,i.filterEffect=e.filterEffect,i.previousRenderSurface=t.renderTarget.renderTarget,i.inputTexture=se.getOptimalTexture(s.width,s.height,o,l),t.renderTarget.bind(i.inputTexture,!0),t.globalUniforms.push({offset:s})}pop(){const e=this.renderer;this._filterStackIndex--;const t=this._filterStack[this._filterStackIndex];if(t.skip)return;this._activeFilterData=t;const n=t.inputTexture,i=t.bounds;let s=A.EMPTY;if(t.blendRequired){e.encoder.finishRenderPass();const a=this._filterStackIndex>0?this._filterStack[this._filterStackIndex-1].bounds:null;s=this.getBackTexture(t.previousRenderSurface,i,a)}t.backTexture=s;const o=t.filterEffect.filters;if(this._globalFilterBindGroup.setResource(n.style,2),this._globalFilterBindGroup.setResource(s.source,3),e.globalUniforms.pop(),o.length===1)o[0].apply(this,n,t.previousRenderSurface,!1),se.returnTexture(n);else{let a=t.inputTexture,l=se.getOptimalTexture(i.width,i.height,a.source._resolution,!1),u=0;for(u=0;u<o.length-1;++u){o[u].apply(this,a,l,!0);const h=a;a=l,l=h}o[u].apply(this,a,t.previousRenderSurface,!1),se.returnTexture(a),se.returnTexture(l)}t.blendRequired&&se.returnTexture(s)}getBackTexture(e,t,n){const i=e.colorTexture.source._resolution,s=se.getOptimalTexture(t.width,t.height,i,!1);let o=t.minX,a=t.minY;n&&(o-=n.minX,a-=n.minY),o=Math.floor(o*i),a=Math.floor(a*i);const l=Math.ceil(t.width*i),u=Math.ceil(t.height*i);return this.renderer.renderTarget.copyToTexture(e,s,{x:o,y:a},{width:l,height:u}),s}applyFilter(e,t,n,i){const s=this.renderer,o=this._filterStack[this._filterStackIndex],a=o.bounds,l=H.shared,u=o.previousRenderSurface===this.renderer.renderTarget.getRenderTarget(n);let h=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;this._filterStackIndex>0&&(h=this._filterStack[this._filterStackIndex-1].inputTexture.source._resolution);const c=this._filterGlobalUniforms,p=c.uniforms,d=p.outputFrame,f=p.inputSize,g=p.inputPixel,m=p.inputClamp,y=p.globalFrame,v=p.outputTexture;u?(this._filterStackIndex>0&&(l.x=this._filterStack[this._filterStackIndex-1].bounds.minX,l.y=this._filterStack[this._filterStackIndex-1].bounds.minY),d[0]=a.minX-l.x,d[1]=a.minY-l.y):(d[0]=0,d[1]=0),d[2]=t.frameWidth,d[3]=t.frameHeight,f[0]=t.source.width,f[1]=t.source.height,f[2]=1/f[0],f[3]=1/f[1],g[0]=t.source.pixelWidth,g[1]=t.source.pixelHeight,g[2]=1/g[0],g[3]=1/g[1],m[0]=.5*g[2],m[1]=.5*g[3],m[2]=t.frameWidth*f[2]-.5*g[2],m[3]=t.frameHeight*f[3]-.5*g[3];const b=this.renderer.renderTarget.rootRenderTarget.colorTexture;y[0]=l.x*h,y[1]=l.y*h,y[2]=b.source.width*h,y[3]=b.source.height*h;const _=this.renderer.renderTarget.getRenderTarget(n);if(v[0]=_.colorTexture.frameWidth,v[1]=_.colorTexture.frameHeight,v[2]=_.isRoot?-1:1,c.update(),s.renderPipes.uniformBatch){const S=s.renderPipes.uniformBatch.getUniformBufferResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(S,0)}else this._globalFilterBindGroup.setResource(c,0);this._globalFilterBindGroup.setResource(t.source,1),s.renderTarget.bind(n,!!i),e.groups[0]=this._globalFilterBindGroup,s.encoder.draw({geometry:Tv,shader:e,state:e._state,topology:"triangle-list"})}_getFilterData(){return{skip:!1,inputTexture:null,bounds:new le,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,t){const n=this._activeFilterData,i=e.set(n.inputTexture._source.width,0,0,n.inputTexture._source.height,n.bounds.minX,n.bounds.minY),s=t.worldTransform.copyTo(R.shared);return s.invert(),i.prepend(s),i.scale(1/t.texture.frameWidth,1/t.texture.frameHeight),i.translate(t.anchor.x,t.anchor.y),i}destroy(){}}ji.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"filter"};var Fh=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,Uh=`in vec2 aPosition;
in vec2 aUV;
in vec4 aColor;
in float aTextureId;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

uniform mat3 transformMatrix;
uniform vec4 color;

out vec2 vTextureCoord;
out vec4 vColor;
out float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * worldTransformMatrix * transformMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aUV;
    vTextureId = aTextureId;
    
    vColor = vec4(aColor.rgb * aColor.a, aColor.a)  * worldAlpha;
}
`;function Ih(r){return jr({vertexSrc:Uh,fragmentSrc:Fh,maxTextures:r,name:"graphics"})}function Sv(r,e,t,n){t[n++]=(r>>16&255)/255,t[n++]=(r>>8&255)/255,t[n++]=(r&255)/255,t[n++]=e}function lr(r,e,t){e[t++]=(r&255)/255,e[t++]=(r>>8&255)/255,e[t++]=(r>>16&255)/255,e[t++]=(r>>24&255)/255}class Vi{init(){const e=new J({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new R,type:"mat3x3<f32>"}});this._shader=new Ee({glProgram:Ih(ge),resources:{localUniforms:e,batchSamplers:Vr}})}execute(e,t){const n=t.view.context,i=n.customShader||this._shader,s=e.renderer,o=s.graphicsContext;if(!o.updateGpuContext(n).batches.length)return;const{geometry:a,instructions:l}=o.getContextRenderData(n),u=e.state;u.blendMode=t.layerBlendMode,s.state.set(e.state);const h=i.resources.localUniforms.uniforms;h.transformMatrix=t.layerTransform,lr(t.layerColor,h.color,0),s.shader.bind(i),s.shader.bindUniformBlock(s.globalUniforms.uniformGroup,"globalUniforms"),s.geometry.bind(a,i.glProgram);const c=l.instructions;for(let p=0;p<l.instructionSize;p++){const d=c[p];if(d.size){for(let f=0;f<d.textures.textures.length;f++)s.texture.bind(d.textures.textures[f],f);s.geometry.draw("triangle-list",d.size,d.start)}}}destroy(){this._shader.destroy(!0),this._shader=null}}Vi.extension={type:[x.WebGLPipesAdaptor],name:"graphics"};var Yi=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

struct LocalUniforms {
  color:vec4<f32>,
  transformMatrix:mat3x3<f32>
}


@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
%bindings%
@group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
    @location(2) @interpolate(flat) textureId : u32,
  };

  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aUV : vec2<f32>,
  @location(2) aColor : vec4<f32>,
  @location(3) aTexture : f32,
) -> VSOutput {

  var  mvpMatrix = globalUniforms.projectionMatrix * globalUniforms.worldTransformMatrix * localUniforms.transformMatrix;

  var  colorOut = aColor * localUniforms.color.bgra;

  var alpha = vec4<f32>(
    colorOut.a * globalUniforms.worldAlpha,
    colorOut.a * globalUniforms.worldAlpha,
    colorOut.a * globalUniforms.worldAlpha,
    globalUniforms.worldAlpha
  );

  colorOut *= alpha;


  return VSOutput(
    vec4<f32>((mvpMatrix * vec3<f32>(aPosition, 1.0)).xy, 0.0, 1.0),
    aUV,
    colorOut,
    u32(aTexture)
  );
};


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color:vec4<f32>,
  @location(2) @interpolate(flat) textureId: u32,
) -> @location(0) vec4<f32> {


    var uvDx = dpdx(uv);
    var uvDy = dpdy(uv);

    var outColor:vec4<f32>;
    
    %forloop%
  
    // multiply the alpha!
    outColor.r *= outColor.a;
    outColor.g *= outColor.a;
    outColor.b *= outColor.a;

    return (outColor) * color; //* 0.1;
};
`;function Gh(r){return Yr({vertex:{source:Yi,entryPoint:"mainVertex"},fragment:{source:Yi,entryPoint:"mainFragment"},maxTextures:r})}class Xi{init(){const e=new J({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new R,type:"mat3x3<f32>"}});this._shader=new Ee({gpuProgram:Gh(ge),groups:{2:new Te({0:e})}})}execute(e,t){const n=t.view.context,i=n.customShader||this._shader,s=e.renderer,o=s.graphicsContext;if(!o.getGpuContext(n).batches.length)return;const{geometry:a,instructions:l}=o.getContextRenderData(n);e.state.blendMode=t.layerBlendMode;const u=i.resources.localUniforms;i.resources.localUniforms.uniforms.transformMatrix=t.layerTransform,lr(t.layerColor,u.uniforms.color,0);const h=s.encoder;h.setPipelineFromGeometryProgramAndState(a,i.gpuProgram,e.state),h.setGeometry(a);const c=s.globalUniforms.bindGroup;h.setBindGroup(0,c,i.gpuProgram);const p=s.renderPipes.uniformBatch.getUniformBindGroup(u,!0);h.setBindGroup(2,p,i.gpuProgram);const d=l.instructions;for(let f=0;f<l.instructionSize;f++){const g=d[f];i.groups[1]=g.bindGroup,h.setBindGroup(1,g.bindGroup,i.gpuProgram),h.renderPassEncoder.drawIndexed(g.size,1,g.start)}}destroy(){this._shader.destroy(!0),this._shader=null}}Xi.extension={type:[x.WebGPUPipesAdaptor],name:"graphics"};function qi(r,e,t){const n=r>>16&255,i=r>>8&255,s=r&255,o=e>>16&255,a=e>>8&255,l=e&255,u=n+(o-n)*t,h=i+(a-i)*t,c=s+(l-s)*t;return(u<<16)+(h<<8)+c}const Lh=16777215+16777215;function Zr(r,e){const t=(r>>24&255)/255,n=(e>>24&255)/255,i=t*n*255,s=r&16777215,o=e&16777215;let a=16777215;return s+(o<<32)!==Lh&&(s===16777215?a=o:o===16777215?a=s:a=qi(s,o,.5)),a+(i<<24)}function Pv(r,e,t){const n=(t>>24&255)/255,i=e*n*255,s=((r&255)<<16)+(r&65280)+(r>>16&255),o=t&16777215;let a=16777215;return s+(o<<32)!==Lh&&(s===16777215?a=o:o===16777215?a=s:a=qi(s,o,.5)),a+(i<<24)}class Qr{constructor(){this.batcher=null,this.batch=null,this.applyTransform=!0}get blendMode(){return this.applyTransform?this.renderable.layerBlendMode:"normal"}packIndex(e,t,n){const i=this.geometryData.indices;for(let s=0;s<this.indexSize;s++)e[t++]=i[s+this.indexOffset]+n-this.vertexOffset}packAttributes(e,t,n,i){const s=this.geometryData,o=s.vertices,a=s.uvs,l=this.vertexOffset*2,u=(this.vertexOffset+this.vertexSize)*2,h=this.color,c=h>>16|h&65280|(h&255)<<16;if(this.applyTransform){const p=this.renderable,d=Zr(c+(this.alpha*255<<24),p.layerColor),f=p.layerTransform,g=f.a,m=f.b,y=f.c,v=f.d,b=f.tx,_=f.ty;for(let S=l;S<u;S+=2){const k=o[S],C=o[S+1];e[n++]=g*k+y*C+b,e[n++]=m*k+v*C+_,e[n++]=a[S],e[n++]=a[S+1],t[n++]=d,e[n++]=i}}else{const p=c+(this.alpha*255<<24);for(let d=l;d<u;d+=2)e[n++]=o[d],e[n++]=o[d+1],e[n++]=a[d],e[n++]=a[d+1],t[n++]=p,e[n++]=i}}get vertSize(){return this.vertexSize}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.vertexOffset=this.vertexOffset,e.vertexSize=this.vertexSize,e.color=this.color,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}}const ot={build(r,e){let t,n,i,s,o,a;if(r.type==="circle"){const _=r;t=_.x,n=_.y,o=a=_.radius,i=s=0}else if(r.type==="ellipse"){const _=r;t=_.x,n=_.y,o=_.halfWidth,a=_.halfHeight,i=s=0}else{const _=r,S=_.width/2,k=_.height/2;t=_.x+S,n=_.y+k,o=a=Math.max(0,Math.min(_.radius,Math.min(S,k))),i=S-o,s=k-a}if(!(o>=0&&a>=0&&i>=0&&s>=0))return e;const l=Math.ceil(2.3*Math.sqrt(o+a)),u=l*8+(i?4:0)+(s?4:0);if(u===0)return e;if(l===0)return e[0]=e[6]=t+i,e[1]=e[3]=n+s,e[2]=e[4]=t-i,e[5]=e[7]=n-s,e;let h=0,c=l*4+(i?2:0)+2,p=c,d=u,f=i+o,g=s,m=t+f,y=t-f,v=n+g;if(e[h++]=m,e[h++]=v,e[--c]=v,e[--c]=y,s){const _=n-g;e[p++]=y,e[p++]=_,e[--d]=_,e[--d]=m}for(let _=1;_<l;_++){const S=Math.PI/2*(_/l),k=i+Math.cos(S)*o,C=s+Math.sin(S)*a,P=t+k,w=t-k,T=n+C,D=n-C;e[h++]=P,e[h++]=T,e[--c]=T,e[--c]=w,e[p++]=w,e[p++]=D,e[--d]=D,e[--d]=P}f=i,g=s+a,m=t+f,y=t-f,v=n+g;const b=n-g;return e[h++]=m,e[h++]=v,e[--d]=b,e[--d]=m,i&&(e[h++]=y,e[h++]=v,e[--d]=b,e[--d]=y),e},triangulate(r,e,t,n,i,s){if(r.length===0)return;let o=0,a=0;const l=r.length/4;o+=r[0],a+=r[1],o+=r[l|0],a+=r[(l|0)+1],o+=r[l*2|0],a+=r[(l*2|0)+1],o+=r[l*3|0],a+=r[(l*3|0)+1],o/=4,a/=4;let u=n;e[u*t]=o,e[u*t+1]=a,u++;const h=n;e[u*t]=r[0],e[u*t+1]=r[1],u++;for(let c=2;c<r.length;c+=2)e[u*t]=r[c],e[u*t+1]=r[c+1],i[s++]=u,i[s++]=h,i[s++]=u-1,u++;i[s++]=u-1,i[s++]=h,i[s++]=h+1}},$h=1e-4,Ki=1e-4;function Dh(r){const e=r.length;if(e<6)return 1;let t=0;for(let n=0,i=r[e-2],s=r[e-1];n<e;n+=2){const o=r[n],a=r[n+1];t+=(o-i)*(a+s),i=o,s=a}return t<0?-1:1}function zh(r,e,t,n,i,s,o,a){const l=r-t*i,u=e-n*i,h=r+t*s,c=e+n*s;let p,d;o?(p=n,d=-t):(p=-n,d=t);const f=l+p,g=u+d,m=h+p,y=c+d;return a.push(f,g),a.push(m,y),2}function at(r,e,t,n,i,s,o,a){const l=t-r,u=n-e;let h=Math.atan2(l,u),c=Math.atan2(i-r,s-e);a&&h<c?h+=Math.PI*2:!a&&h>c&&(c+=Math.PI*2);let p=h;const d=c-h,f=Math.abs(d),g=Math.sqrt(l*l+u*u),m=(15*f*Math.sqrt(g)/Math.PI>>0)+1,y=d/m;if(p+=y,a){o.push(r,e),o.push(t,n);for(let v=1,b=p;v<m;v++,b+=y)o.push(r,e),o.push(r+Math.sin(b)*g,e+Math.cos(b)*g);o.push(r,e),o.push(i,s)}else{o.push(t,n),o.push(r,e);for(let v=1,b=p;v<m;v++,b+=y)o.push(r+Math.sin(b)*g,e+Math.cos(b)*g),o.push(r,e);o.push(i,s),o.push(r,e)}return m*2}function Nh(r,e,t,n,i,s,o,a,l){const u=$h;if(r.length===0)return;const h=e;let c=h.alignment;if(e.alignment!==.5){let j=Dh(r);t&&(j*=-1),c=(c-.5)*j+.5}const p=new H(r[0],r[1]),d=new H(r[r.length-2],r[r.length-1]),f=n,g=Math.abs(p.x-d.x)<u&&Math.abs(p.y-d.y)<u;if(f){r=r.slice(),g&&(r.pop(),r.pop(),d.set(r[r.length-2],r[r.length-1]));const j=(p.x+d.x)*.5,Ge=(d.y+p.y)*.5;r.unshift(j,Ge),r.push(j,Ge)}const m=i,y=r.length/2;let v=r.length;const b=m.length/2,_=h.width/2,S=_*_,k=h.miterLimit*h.miterLimit;let C=r[0],P=r[1],w=r[2],T=r[3],D=0,L=0,B=-(P-T),E=C-w,V=0,q=0,de=Math.sqrt(B*B+E*E);B/=de,E/=de,B*=_,E*=_;const Ct=c,O=(1-Ct)*2,F=Ct*2;f||(h.cap==="round"?v+=at(C-B*(O-F)*.5,P-E*(O-F)*.5,C-B*O,P-E*O,C+B*F,P+E*F,m,!0)+2:h.cap==="square"&&(v+=zh(C,P,B,E,O,F,!0,m))),m.push(C-B*O,P-E*O),m.push(C+B*F,P+E*F);for(let j=1;j<y-1;++j){C=r[(j-1)*2],P=r[(j-1)*2+1],w=r[j*2],T=r[j*2+1],D=r[(j+1)*2],L=r[(j+1)*2+1],B=-(P-T),E=C-w,de=Math.sqrt(B*B+E*E),B/=de,E/=de,B*=_,E*=_,V=-(T-L),q=w-D,de=Math.sqrt(V*V+q*q),V/=de,q/=de,V*=_,q*=_;const Ge=w-C,Bt=P-T,Rt=w-D,kt=L-T,jo=Ge*Rt+Bt*kt,wr=Bt*Rt-kt*Ge,Ot=wr<0;if(Math.abs(wr)<.001*Math.abs(jo)){m.push(w-B*O,T-E*O),m.push(w+B*F,T+E*F),jo>=0&&(h.join==="round"?v+=at(w,T,w-B*O,T-E*O,w-V*O,T-q*O,m,!1)+4:v+=2,m.push(w-V*F,T-q*F),m.push(w+V*O,T+q*O));continue}const Vo=(-B+C)*(-E+T)-(-B+w)*(-E+P),Yo=(-V+D)*(-q+T)-(-V+w)*(-q+L),Tr=(Ge*Yo-Rt*Vo)/wr,Sr=(kt*Vo-Bt*Yo)/wr,Mn=(Tr-w)*(Tr-w)+(Sr-T)*(Sr-T),Ne=w+(Tr-w)*O,We=T+(Sr-T)*O,He=w-(Tr-w)*F,je=T-(Sr-T)*F,$p=Math.min(Ge*Ge+Bt*Bt,Rt*Rt+kt*kt),Xo=Ot?O:F,Dp=$p+Xo*Xo*S;Mn<=Dp?h.join==="bevel"||Mn/S>k?(Ot?(m.push(Ne,We),m.push(w+B*F,T+E*F),m.push(Ne,We),m.push(w+V*F,T+q*F)):(m.push(w-B*O,T-E*O),m.push(He,je),m.push(w-V*O,T-q*O),m.push(He,je)),v+=2):h.join==="round"?Ot?(m.push(Ne,We),m.push(w+B*F,T+E*F),v+=at(w,T,w+B*F,T+E*F,w+V*F,T+q*F,m,!0)+4,m.push(Ne,We),m.push(w+V*F,T+q*F)):(m.push(w-B*O,T-E*O),m.push(He,je),v+=at(w,T,w-B*O,T-E*O,w-V*O,T-q*O,m,!1)+4,m.push(w-V*O,T-q*O),m.push(He,je)):(m.push(Ne,We),m.push(He,je)):(m.push(w-B*O,T-E*O),m.push(w+B*F,T+E*F),h.join==="round"?Ot?v+=at(w,T,w+B*F,T+E*F,w+V*F,T+q*F,m,!0)+2:v+=at(w,T,w-B*O,T-E*O,w-V*O,T-q*O,m,!1)+2:h.join==="miter"&&Mn/S<=k&&(Ot?(m.push(He,je),m.push(He,je)):(m.push(Ne,We),m.push(Ne,We)),v+=2),m.push(w-V*O,T-q*O),m.push(w+V*F,T+q*F),v+=2)}C=r[(y-2)*2],P=r[(y-2)*2+1],w=r[(y-1)*2],T=r[(y-1)*2+1],B=-(P-T),E=C-w,de=Math.sqrt(B*B+E*E),B/=de,E/=de,B*=_,E*=_,m.push(w-B*O,T-E*O),m.push(w+B*F,T+E*F),f||(h.cap==="round"?v+=at(w-B*(O-F)*.5,T-E*(O-F)*.5,w-B*O,T-E*O,w+B*F,T+E*F,m,!1)+2:h.cap==="square"&&(v+=zh(w,T,B,E,O,F,!1,m)));const Lp=Ki*Ki;for(let j=b;j<v+b-2;++j)C=m[j*2],P=m[j*2+1],w=m[(j+1)*2],T=m[(j+1)*2+1],D=m[(j+2)*2],L=m[(j+2)*2+1],!(Math.abs(C*(T-L)+w*(L-P)+D*(P-T))<Lp)&&a.push(j,j+1,j+2)}var Wh=Jr,Av=Jr;function Jr(r,e,t){t=t||2;var n=e&&e.length,i=n?e[0]*t:r.length,s=Hh(r,0,i,t,!0),o=[];if(!s||s.next===s.prev)return o;var a,l,u,h,c,p,d;if(n&&(s=Rv(r,e,s,t)),r.length>80*t){a=u=r[0],l=h=r[1];for(var f=t;f<i;f+=t)c=r[f],p=r[f+1],c<a&&(a=c),p<l&&(l=p),c>u&&(u=c),p>h&&(h=p);d=Math.max(u-a,h-l),d=d!==0?32767/d:0}return ur(s,o,t,a,l,d,0),o}function Hh(r,e,t,n,i){var s,o;if(i===Ji(r,e,t,n)>0)for(s=e;s<t;s+=n)o=Yh(s,r[s],r[s+1],o);else for(s=t-n;s>=e;s-=n)o=Yh(s,r[s],r[s+1],o);return o&&en(o,o.next)&&(cr(o),o=o.next),o}function lt(r,e){if(!r)return r;e||(e=r);var t=r,n;do if(n=!1,!t.steiner&&(en(t,t.next)||K(t.prev,t,t.next)===0)){if(cr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ur(r,e,t,n,i,s,o){if(r){!o&&s&&Iv(r,n,i,s);for(var a=r,l,u;r.prev!==r.next;){if(l=r.prev,u=r.next,s?Mv(r,n,i,s):Ev(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(u.i/t|0),cr(r),r=u.next,a=u.next;continue}if(r=u,r===a){o?o===1?(r=Cv(lt(r),e,t),ur(r,e,t,n,i,s,2)):o===2&&Bv(r,e,t,n,i,s):ur(lt(r),e,t,n,i,s,1);break}}}}function Ev(r){var e=r.prev,t=r,n=r.next;if(K(e,t,n)>=0)return!1;for(var i=e.x,s=t.x,o=n.x,a=e.y,l=t.y,u=n.y,h=i<s?i<o?i:o:s<o?s:o,c=a<l?a<u?a:u:l<u?l:u,p=i>s?i>o?i:o:s>o?s:o,d=a>l?a>u?a:u:l>u?l:u,f=n.next;f!==e;){if(f.x>=h&&f.x<=p&&f.y>=c&&f.y<=d&&Tt(i,a,s,l,o,u,f.x,f.y)&&K(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function Mv(r,e,t,n){var i=r.prev,s=r,o=r.next;if(K(i,s,o)>=0)return!1;for(var a=i.x,l=s.x,u=o.x,h=i.y,c=s.y,p=o.y,d=a<l?a<u?a:u:l<u?l:u,f=h<c?h<p?h:p:c<p?c:p,g=a>l?a>u?a:u:l>u?l:u,m=h>c?h>p?h:p:c>p?c:p,y=Zi(d,f,e,t,n),v=Zi(g,m,e,t,n),b=r.prevZ,_=r.nextZ;b&&b.z>=y&&_&&_.z<=v;){if(b.x>=d&&b.x<=g&&b.y>=f&&b.y<=m&&b!==i&&b!==o&&Tt(a,h,l,c,u,p,b.x,b.y)&&K(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=d&&_.x<=g&&_.y>=f&&_.y<=m&&_!==i&&_!==o&&Tt(a,h,l,c,u,p,_.x,_.y)&&K(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=y;){if(b.x>=d&&b.x<=g&&b.y>=f&&b.y<=m&&b!==i&&b!==o&&Tt(a,h,l,c,u,p,b.x,b.y)&&K(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=g&&_.y>=f&&_.y<=m&&_!==i&&_!==o&&Tt(a,h,l,c,u,p,_.x,_.y)&&K(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Cv(r,e,t){var n=r;do{var i=n.prev,s=n.next.next;!en(i,s)&&jh(i,n,n.next,s)&&hr(i,s)&&hr(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),cr(n),cr(n.next),n=r=s),n=n.next}while(n!==r);return lt(n)}function Bv(r,e,t,n,i,s){var o=r;do{for(var a=o.next.next;a!==o.prev;){if(o.i!==a.i&&$v(o,a)){var l=Vh(o,a);o=lt(o,o.next),l=lt(l,l.next),ur(o,e,t,n,i,s,0),ur(l,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Rv(r,e,t,n){var i=[],s,o,a,l,u;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:r.length,u=Hh(r,a,l,n,!1),u===u.next&&(u.steiner=!0),i.push(Lv(u));for(i.sort(kv),s=0;s<i.length;s++)t=Ov(i[s],t);return t}function kv(r,e){return r.x-e.x}function Ov(r,e){var t=Fv(r,e);if(!t)return e;var n=Vh(t,r);return lt(n,n.next),lt(t,t.next)}function Fv(r,e){var t=e,n=r.x,i=r.y,s=-1/0,o;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){var a=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=n&&a>s&&(s=a,o=t.x<t.next.x?t:t.next,a===n))return o}t=t.next}while(t!==e);if(!o)return null;var l=o,u=o.x,h=o.y,c=1/0,p;t=o;do n>=t.x&&t.x>=u&&n!==t.x&&Tt(i<h?n:s,i,u,h,i<h?s:n,i,t.x,t.y)&&(p=Math.abs(i-t.y)/(n-t.x),hr(t,r)&&(p<c||p===c&&(t.x>o.x||t.x===o.x&&Uv(o,t)))&&(o=t,c=p)),t=t.next;while(t!==l);return o}function Uv(r,e){return K(r.prev,r,e.prev)<0&&K(e.next,r,r.next)<0}function Iv(r,e,t,n){var i=r;do i.z===0&&(i.z=Zi(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Gv(i)}function Gv(r){var e,t,n,i,s,o,a,l,u=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<u&&(a++,n=n.nextZ,!!n);e++);for(l=u;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,u*=2}while(o>1);return r}function Zi(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Lv(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Tt(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function $v(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Dv(r,e)&&(hr(r,e)&&hr(e,r)&&zv(r,e)&&(K(r.prev,r,e.prev)||K(r,e.prev,e))||en(r,e)&&K(r.prev,r,r.next)>0&&K(e.prev,e,e.next)>0)}function K(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function en(r,e){return r.x===e.x&&r.y===e.y}function jh(r,e,t,n){var i=rn(K(r,e,t)),s=rn(K(r,e,n)),o=rn(K(t,n,r)),a=rn(K(t,n,e));return!!(i!==s&&o!==a||i===0&&tn(r,t,e)||s===0&&tn(r,n,e)||o===0&&tn(t,r,n)||a===0&&tn(t,e,n))}function tn(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function rn(r){return r>0?1:r<0?-1:0}function Dv(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&jh(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function hr(r,e){return K(r.prev,r,r.next)<0?K(r,e,r.next)>=0&&K(r,r.prev,e)>=0:K(r,e,r.prev)<0||K(r,r.next,e)<0}function zv(r,e){var t=r,n=!1,i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Vh(r,e){var t=new Qi(r.i,r.x,r.y),n=new Qi(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Yh(r,e,t,n){var i=new Qi(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function cr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Qi(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Jr.deviation=function(r,e,t,n){var i=e&&e.length,s=i?e[0]*t:r.length,o=Math.abs(Ji(r,0,s,t));if(i)for(var a=0,l=e.length;a<l;a++){var u=e[a]*t,h=a<l-1?e[a+1]*t:r.length;o-=Math.abs(Ji(r,u,h,t))}var c=0;for(a=0;a<n.length;a+=3){var p=n[a]*t,d=n[a+1]*t,f=n[a+2]*t;c+=Math.abs((r[p]-r[f])*(r[d+1]-r[p+1])-(r[p]-r[d])*(r[f+1]-r[p+1]))}return o===0&&c===0?0:Math.abs((c-o)/o)};function Ji(r,e,t,n){for(var i=0,s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}Jr.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},n=0,i=0;i<r.length;i++){for(var s=0;s<r[i].length;s++)for(var o=0;o<e;o++)t.vertices.push(r[i][s][o]);i>0&&(n+=r[i-1].length,t.holes.push(n))}return t},Wh.default=Av;function es(r,e,t,n,i,s,o){const a=Wh(r,e,2);if(!a)return;for(let u=0;u<a.length;u+=3)s[o++]=a[u]+i,s[o++]=a[u+1]+i,s[o++]=a[u+2]+i;let l=i*n;for(let u=0;u<r.length;u+=2)t[l]=r[u],t[l+1]=r[u+1],l+=n}const Nv=[],ts={build(r,e){for(let t=0;t<r.points.length;t++)e[t]=r.points[t];return e},triangulate(r,e,t,n,i,s){es(r,Nv,e,t,n,i,s)}},rs={build(r,e){const t=r,n=t.x,i=t.y,s=t.width,o=t.height;return s>=0&&o>=0&&(e[0]=n,e[1]=i,e[2]=n+s,e[3]=i,e[4]=n+s,e[5]=i+o,e[6]=n,e[7]=i+o),e},triangulate(r,e,t,n,i,s){let o=0;n*=t,e[n+o]=r[0],e[n+o+1]=r[1],o+=t,e[n+o]=r[2],e[n+o+1]=r[3],o+=t,e[n+o]=r[6],e[n+o+1]=r[7],o+=t,e[n+o]=r[4],e[n+o+1]=r[5],o+=t;const a=n/t;i[s++]=a,i[s++]=a+1,i[s++]=a+2,i[s++]=a+1,i[s++]=a+3,i[s++]=a+2}},ns={build(r,e){return e[0]=r.x,e[1]=r.y,e[2]=r.x2,e[3]=r.y2,e[4]=r.x3,e[5]=r.y3,e},triangulate(r,e,t,n,i,s){let o=0;n*=t,e[n+o]=r[0],e[n+o+1]=r[1],o+=t,e[n+o]=r[2],e[n+o+1]=r[3],o+=t,e[n+o]=r[4],e[n+o+1]=r[5];const a=n/t;i[s++]=a,i[s++]=a+1,i[s++]=a+2}};let Wv=0;class is{constructor(e){this.uid=Wv++,this.canBundle=!0,this.owner=vt,this.renderPipeId="graphics",this._context=e||new $e,this._context.on("update",this.onGraphicsContextUpdate,this)}set context(e){e!==this._context&&(this._context.off("update",this.onGraphicsContextUpdate,this),this._context=e,this._context.on("update",this.onGraphicsContextUpdate,this),this.onGraphicsContextUpdate())}get context(){return this._context}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onGraphicsContextUpdate(){this._didUpdate=!0,this.owner.onViewUpdate()}destroy(e=!1){this.owner=null,(typeof e=="boolean"?e:e!=null&&e.context)&&this._context.destroy(e),this._context=null}}var Hv=Object.defineProperty,Xh=Object.getOwnPropertySymbols,jv=Object.prototype.hasOwnProperty,Vv=Object.prototype.propertyIsEnumerable,qh=(r,e,t)=>e in r?Hv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Yv=(r,e)=>{for(var t in e||(e={}))jv.call(e,t)&&qh(r,t,e[t]);if(Xh)for(var t of Xh(e))Vv.call(e,t)&&qh(r,t,e[t]);return r};class Xv extends Y{constructor(e){e instanceof $e&&(e={context:e}),super(Yv({view:new is(e==null?void 0:e.context),label:"Graphics"},e))}get context(){return this.view.context}set context(e){this.view.context=e}_callContextMethod(e,t){return this.view.context[e](...t),this}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}setFillStyle(...e){return this._callContextMethod("setFillStyle",e)}setStrokeStyle(...e){return this._callContextMethod("setStrokeStyle",e)}beginPath(...e){return this._callContextMethod("beginPath",e)}cut(...e){return this._callContextMethod("cut",e)}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(...e){return this._callContextMethod("closePath",e)}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(...e){return this._callContextMethod("save",e)}getTransform(...e){return this._callContextMethod("getTransform",e)}resetTransform(...e){return this._callContextMethod("resetTransform",e)}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(...e){return this._callContextMethod("clear",e)}get fillStyle(){return this.view.context.fillStyle}set fillStyle(e){this.view.context.fillStyle=e}get strokeStyle(){return this.view.context.strokeStyle}set strokeStyle(e){this.view.context.strokeStyle=e}drawCircle(...e){return U("8.0.0","Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return U("8.0.0","Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return U("8.0.0","Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return U("8.0.0","Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return U("8.0.0","Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return U("8.0.0","Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}}function ss(r,e,t,n,i,s,o,a=null){let l=0;t*=e,i*=s;const u=a.a,h=a.b,c=a.c,p=a.d,d=a.tx,f=a.ty;for(;l<o;){const g=r[t],m=r[t+1];n[i]=u*g+c*m+d,n[i+1]=h*g+p*m+f,i+=s,t+=e,l++}}function os(r,e,t,n){let i=0;for(e*=t;i<n;)r[e]=0,r[e+1]=0,e+=t,i++}function nn(r,e,t,n,i){const s=e.a,o=e.b,a=e.c,l=e.d,u=e.tx,h=e.ty;t=t||0,n=n||2,i=i||r.length/n-t;let c=t*n;for(let p=0;p<i;p++){const d=r[c],f=r[c+1];r[c]=s*d+a*f+u,r[c+1]=o*d+l*f+h,c+=n}}const as={rectangle:rs,polygon:ts,triangle:ns,circle:ot,ellipse:ot,roundedRectangle:ot},qv=new X;function Kh(r){const e={vertices:[],uvs:[],indices:[]},t=[];for(let n=0;n<r.instructions.length;n++){const i=r.instructions[n];if(i.action==="texture")Kv(i.data,t,e);else if(i.action==="fill"||i.action==="stroke"){const s=i.action==="stroke",o=i.data.path.shapePath,a=i.data.style,l=i.data.hole;s&&l&&Zh(l.shapePath,a,null,!0,t,e),Zh(o,a,l,s,t,e)}}return t}function Kv(r,e,t){const{vertices:n,uvs:i,indices:s}=t,o=s.length,a=n.length/2,l=[],u=as.rectangle,h=qv,c=r.image;h.x=r.dx,h.y=r.dy,h.width=r.dw,h.height=r.dh;const p=r.transform;u.build(h,l),p&&nn(l,p),u.triangulate(l,n,2,a,s,o);const d=c.layout.uvs;i.push(d.x0,d.y0,d.x1,d.y1,d.x3,d.y3,d.x2,d.y2);const f=W.get(Qr);f.indexOffset=o,f.indexSize=s.length-o,f.vertexOffset=a,f.vertexSize=n.length/2-a,f.color=r.style,f.alpha=r.alpha,f.texture=c,f.geometryData=t,e.push(f)}function Zh(r,e,t,n,i,s){const{vertices:o,uvs:a,indices:l}=s,u=r.shapePrimitives.length-1;r.shapePrimitives.forEach(({shape:h,transform:c},p)=>{var d;const f=l.length,g=o.length/2,m=[],y=as[h.type];if(y.build(h,m),c&&nn(m,c),n){const S=(d=h.closePath)!=null?d:!0;Nh(m,e,!1,S,o,2,g,l,f)}else if(t&&u===p){u!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const S=[],k=m.slice();Zv(t.shapePath).forEach(C=>{S.push(k.length/2),k.push(...C)}),es(k,S,o,2,g,l,f)}else y.triangulate(m,o,2,g,l,f);const v=a.length/2,b=e.texture;if(b!==A.WHITE){const S=e.matrix;c&&S.append(c.clone().invert()),ss(o,2,g,a,v,2,o.length/2-g,S)}else os(a,v,2,o.length/2-g);const _=W.get(Qr);_.indexOffset=f,_.indexSize=l.length-f,_.vertexOffset=g,_.vertexSize=o.length/2-g,_.color=e.color,_.alpha=e.alpha,_.texture=b,_.geometryData=s,i.push(_)})}function Zv(r){if(!r)return[];const e=r.shapePrimitives,t=[];for(let n=0;n<e.length;n++){const i=e[n].shape,s=[];as[i.type].build(i,s),t.push(s)}return t}class Qh{}class Jh{constructor(){this.geometry=new bh,this.instructions=new ii}init(){this.geometry.reset(),this.instructions.reset()}}class ls{constructor(){this._activeBatchers=[],this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),this._needsContextNeedsRebuild=[]}prerender(){this._returnActiveBatchers()}getContextRenderData(e){return this._graphicsDataContextHash[e.uid]||this._initContextRenderData(e)}updateGpuContext(e){let t=this._gpuContextHash[e.uid]||this._initContext(e);if(e.dirty){t?this._cleanGraphicsContextData(e):t=this._initContext(e);const n=Kh(e);let i=0;const s=e.batchMode;let o=!0;if(e.customShader||s==="no-batch")o=!1;else if(s==="auto"){for(let a=0;a<n.length;a++)if(i+=n[a].vertexSize,i>400){o=!1;break}}t=this._gpuContextHash[e.uid]={isBatchable:o,batches:n},e.dirty=!1}return t}getGpuContext(e){return this._gpuContextHash[e.uid]||this._initContext(e)}_returnActiveBatchers(){for(let e=0;e<this._activeBatchers.length;e++)W.return(this._activeBatchers[e]);this._activeBatchers.length=0}_initContextRenderData(e){const t=W.get(Jh),n=this._gpuContextHash[e.uid].batches;let i=0,s=0;n.forEach(u=>{u.applyTransform=!1,i+=u.geometryData.vertices.length,s+=u.geometryData.indices.length});const o=W.get(zi);this._activeBatchers.push(o),o.ensureAttributeBuffer(i),o.ensureIndexBuffer(s),o.begin();for(let u=0;u<n.length;u++){const h=n[u];o.add(h)}o.finish(t.instructions);const a=t.geometry;a.indexBuffer.data=o.indexBuffer,a.buffers[0].data=o.attributeBuffer.float32View,a.indexBuffer.update(o.indexSize*4),a.buffers[0].update(o.attributeSize*4);const l=o.batches;for(let u=0;u<l.length;u++){const h=l[u];h.bindGroup=$i(h.textures.textures,h.textures.count)}return this._graphicsDataContextHash[e.uid]=t,t}_initContext(e){const t=new Qh;return this._gpuContextHash[e.uid]=t,e.on("update",this.onGraphicsContextUpdate,this),e.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]}onGraphicsContextUpdate(e){this._needsContextNeedsRebuild.push(e)}onGraphicsContextDestroy(e){this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null}_cleanGraphicsContextData(e){const t=this._gpuContextHash[e.uid];t.isBatchable||this._graphicsDataContextHash[e.uid]&&(W.return(this.getContextRenderData(e)),this._graphicsDataContextHash[e.uid]=null),t.batches&&t.batches.forEach(n=>{W.return(n)})}destroy(){}}ls.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"graphicsContext"};class us{constructor(e,t){this.state=_e.for2d(),this._renderableBatchesHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=e.view.context,n=!!this._renderableBatchesHash[e.uid],i=this.renderer.graphicsContext.updateGpuContext(t);return!!(i.isBatchable||n!==i.isBatchable)}addRenderable(e,t){const n=this.renderer.graphicsContext.updateGpuContext(e.view.context);e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e)),n.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add({type:"graphics",renderable:e}))}updateRenderable(e){const t=this._renderableBatchesHash[e.uid];if(t)for(let n=0;n<t.length;n++){const i=t[n];i.batcher.updateElement(i)}}destroyRenderable(e){this._removeBatchForRenderable(e.uid)}execute({renderable:e}){e.isRenderable&&this._adaptor.execute(this,e)}_rebuild(e){const t=!!this._renderableBatchesHash[e.uid],n=this.renderer.graphicsContext.updateGpuContext(e.view.context);t&&this._removeBatchForRenderable(e.uid),n.isBatchable&&this._initBatchesForRenderable(e),e.view.batched=n.isBatchable}_addToBatcher(e,t){const n=this.renderer.renderPipes.batch,i=this._getBatchesForRenderable(e);for(let s=0;s<i.length;s++){const o=i[s];n.addToBatch(o,t)}}_getBatchesForRenderable(e){return this._renderableBatchesHash[e.uid]||this._initBatchesForRenderable(e)}_initBatchesForRenderable(e){const t=e.view.context,n=this.renderer.graphicsContext.getGpuContext(t).batches.map(i=>{const s=W.get(Qr);return i.copyTo(s),s.renderable=e,s});return this._renderableBatchesHash[e.uid]=n,e.on("destroyed",()=>{this.destroyRenderable(e)}),n}_removeBatchForRenderable(e){this._renderableBatchesHash[e].forEach(t=>{W.return(t)}),this._renderableBatchesHash[e]=null}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null;for(const e in this._renderableBatchesHash)this._removeBatchForRenderable(e);this._renderableBatchesHash=null}}us.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"graphics"};const Qv={rectangle:rs,polygon:ts,triangle:ns,circle:ot,ellipse:ot,roundedRectangle:ot};function Jv(r){const e=[],t=[],n=[],i=r.path.shapePath,s=r.textureMatrix;i.shapePrimitives.forEach(({shape:a,transform:l})=>{const u=n.length,h=e.length/2,c=[],p=Qv[a.type];p.build(a,c),l&&nn(c,l),p.triangulate(c,e,2,h,n,u);const d=t.length/2;s?(l&&s.append(l.clone().invert()),ss(e,2,h,t,d,2,e.length/2-h,s)):os(t,d,2,e.length/2-h)});const o=r.out;return o?(o.positions=new Float32Array(e),o.uvs=new Float32Array(t),o.indices=new Uint32Array(n),o):new _t({positions:new Float32Array(e),uvs:new Float32Array(t),indices:new Uint32Array(n)})}class ec extends oe{constructor({original:e,view:t}){super(),this.uid=si(),this.view=t,this._original=e,this.layerTransform=new R,this.layerColor=4294967295,this.layerVisibleRenderable=3,this.view.owner=this}get layerBlendMode(){return this._original.layerBlendMode}onViewUpdate(){this.didViewUpdate=!0,this._original.layerGroup.onChildViewUpdate(this)}get isRenderable(){return this._original.isRenderable}}function tc(r,e){const t=r.root,n=r.instructionSet;n.reset(),e.batch.buildStart(n),e.blendMode.buildStart(),e.colorMask.buildStart(),t.sortableChildren&&t.sortChildren(),rc(t,n,e,!0),e.batch.buildEnd(n),e.blendMode.buildEnd(n)}function dr(r,e,t){r.layerVisibleRenderable<3||!r.includeInBuild||(r.sortableChildren&&r.sortChildren(),r.isSimple?eb(r,e,t):rc(r,e,t,!1))}function eb(r,e,t){const n=r.view;if(n&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[n.renderPipeId].addRenderable(r,e)),!r.isLayerRoot){const i=r.children,s=i.length;for(let o=0;o<s;o++)dr(i[o],e,t)}}function rc(r,e,t,n){var i;if(n){const s=r.layerGroup;if(s.root.view){const o=(i=s.proxyRenderable)!=null?i:tb(s);o&&(t.blendMode.setBlendMode(o,o.layerBlendMode,e),t[o.view.renderPipeId].addRenderable(o,e))}}else for(let s=0;s<r.effects.length;s++){const o=r.effects[s];t[o.pipe].push(o,r,e)}if(!n&&r.isLayerRoot)t.layer.addLayerGroup(r.layerGroup,e);else{const s=r.view;s&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[s.renderPipeId].addRenderable(r,e));const o=r.children;if(o.length)for(let a=0;a<o.length;a++)dr(o[a],e,t)}if(!n)for(let s=r.effects.length-1;s>=0;s--){const o=r.effects[s];t[o.pipe].pop(o,r,e)}}function tb(r){const e=r.root;r.proxyRenderable=new ec({original:e,view:e.view})}const rb=new le;class nb extends Gr{constructor(){super({filters:[new kh({sprite:new Ce(A.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class hs{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,n){const i=this._renderer;if(i.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:t}),e.renderMaskToTexture){const s=e.mask;s.includeInBuild=!0,dr(s,n,i.renderPipes),s.includeInBuild=!1}i.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,canBundle:!1})}pop(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const t=this._renderer,n=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const i=W.get(nb);if(n){e.mask.mask.measurable=!0;const s=$t(e.mask.mask,!0,rb);e.mask.mask.measurable=!1,s.ceil();const o=se.getOptimalTexture(s.width,s.height,1,!1),a=t.renderTarget.push(o,!0);t.globalUniforms.push({projectionMatrix:a.projectionMatrix,offset:s,worldColor:4294967295});const l=i.sprite;l.texture=o,l.worldTransform.tx=s.minX,l.worldTransform.ty=s.minY,this._activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer,filterTexture:o})}else i.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const i=this._activeMaskStage[this._activeMaskStage.length-1];n&&(t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({type:"filter",action:"pushFilter",container:i.maskedContainer,filterEffect:i.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const i=this._activeMaskStage.pop();n&&se.returnTexture(i.filterTexture),W.return(i.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}hs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"alphaMask"};class cs{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,n){this._renderer.renderPipes.batch.break(n);const i=this._colorStack;i[this._colorStackIndex]=i[this._colorStackIndex-1]&e.mask;const s=this._colorStack[this._colorStackIndex];s!==this._currentColor&&(this._currentColor=s,n.add({type:"colorMask",colorMask:s,canBundle:!1})),this._colorStackIndex++}pop(e,t,n){this._renderer.renderPipes.batch.break(n);const i=this._colorStack;this._colorStackIndex--;const s=i[this._colorStackIndex-1];s!==this._currentColor&&(this._currentColor=s,n.add({type:"colorMask",colorMask:s,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}cs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"colorMask"};class ib{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1}addBounds(e,t){Nr(this.mask,e,t)}addLocalBounds(e,t){Wr(this.mask,e,t)}containsPoint(e,t){const n=this.mask;return t(n,e)}reset(){this.mask.measurable=!0,this.mask=null}destroy(){this.reset()}}var ve=(r=>(r[r.NONE=0]="NONE",r[r.COLOR=16384]="COLOR",r[r.STENCIL=1024]="STENCIL",r[r.DEPTH=256]="DEPTH",r[r.COLOR_DEPTH=16640]="COLOR_DEPTH",r[r.COLOR_STENCIL=17408]="COLOR_STENCIL",r[r.DEPTH_STENCIL=1280]="DEPTH_STENCIL",r[r.ALL=17664]="ALL",r))(ve||{}),re=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(re||{});class ds{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,n){const i=e,s=this._renderer;s.renderPipes.batch.break(n),s.renderPipes.blendMode.setBlendMode(i.mask,"none",n),n.add({type:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const o=i.mask;o.includeInBuild=!0,this._maskHash.has(i)||this._maskHash.set(i,{instructionsStart:0,instructionsLength:0});const a=this._maskHash.get(i);a.instructionsStart=n.instructionSize,dr(o,n,s.renderPipes),o.includeInBuild=!1,s.renderPipes.batch.break(n),n.add({type:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const l=n.instructionSize-a.instructionsStart-1;a.instructionsLength=l;const u=s.renderTarget.renderTarget.uid;this._maskStackHash[u]===void 0&&(this._maskStackHash[u]=0),this._maskStackHash[u]++}pop(e,t,n){const i=e,s=this._renderer,o=s.renderTarget.renderTarget.uid;this._maskStackHash[o]--,s.renderPipes.batch.break(n),s.renderPipes.blendMode.setBlendMode(i.mask,"none",n),n.add({type:"stencilMask",action:"popMaskBegin",canBundle:!1});const a=this._maskHash.get(e);if(this._maskStackHash[o]!==0)for(let l=0;l<a.instructionsLength;l++)n.instructions[n.instructionSize++]=n.instructions[a.instructionsStart++];n.add({type:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;const n=this._renderer,i=n.renderTarget.renderTarget.uid;let s=(t=this._maskStackHash[i])!=null?t:0;e.action==="pushMaskBegin"?(s++,n.stencil.setStencilMode(re.RENDERING_MASK_ADD,s),n.colorMask.setMask(0)):e.action==="pushMaskEnd"?(n.stencil.setStencilMode(re.MASK_ACTIVE,s),n.colorMask.setMask(15)):e.action==="popMaskBegin"?(s--,s!==0?(n.stencil.setStencilMode(re.RENDERING_MASK_REMOVE,s),n.colorMask.setMask(0)):n.renderTarget.clear(ve.STENCIL)):e.action==="popMaskEnd"&&(s===0?n.stencil.setStencilMode(re.DISABLED,s):n.stencil.setStencilMode(re.MASK_ACTIVE,s),n.colorMask.setMask(15)),this._maskStackHash[i]=s}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}ds.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"stencilMask"};class ps{execute(e,t){const n=e.renderer,i=t.view,s=i.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.transformMatrix=t.layerTransform,o.update(),lr(t.layerColor,o.uniforms.color,0);let a=i._shader;a||(a=e.meshShader,a.texture=i.texture),a.groups[0]=n.globalUniforms.bindGroup,a.groups[1]=e.localUniformsBindGroup,n.encoder.draw({geometry:i._geometry,shader:a,state:s})}}ps.extension={type:[x.WebGLPipesAdaptor],name:"mesh"};class fs{execute(e,t){const n=e.renderer,i=t.view,s=i.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.transformMatrix=t.layerTransform,o.update(),lr(t.layerColor,o.uniforms.color,0);let a=i._shader;a||(a=e.meshShader,a.groups[2]=n.texture.getTextureBindGroup(i.texture)),a.groups[0]=n.globalUniforms.bindGroup,a.groups[1]=n.renderPipes.uniformBatch.getUniformBindGroup(o,!0),n.encoder.draw({geometry:i._geometry,shader:a,state:s})}}fs.extension={type:[x.WebGPUPipesAdaptor],name:"mesh"};class nc{constructor(){this.batcher=null,this.batch=null}get blendMode(){return this.renderable.layerBlendMode}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null}packIndex(e,t,n){const i=this.renderable.view.geometry.indices;for(let s=0;s<i.length;s++)e[t++]=i[s]+n}packAttributes(e,t,n,i){const s=this.renderable,o=this.renderable.view.geometry,a=s.layerTransform,l=a.a,u=a.b,h=a.c,c=a.d,p=a.tx,d=a.ty,f=o.positions,g=o.uvs,m=s.layerColor;for(let y=0;y<f.length;y+=2){const v=f[y],b=f[y+1];e[n++]=l*v+h*b+p,e[n++]=u*v+c*b+d,e[n++]=g[y],e[n++]=g[y+1],t[n++]=m,e[n++]=i}}get vertexSize(){return this.renderable.view.geometry.positions.length/2}get indexSize(){return this.renderable.view.geometry.indices.length}}function sb(r,e){const{frameWidth:t,frameHeight:n}=r;return e.scale(1/t,1/n),e}var ob=Object.defineProperty,ic=Object.getOwnPropertySymbols,ab=Object.prototype.hasOwnProperty,lb=Object.prototype.propertyIsEnumerable,sc=(r,e,t)=>e in r?ob(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ub=(r,e)=>{for(var t in e||(e={}))ab.call(e,t)&&sc(r,t,e[t]);if(ic)for(var t of ic(e))lb.call(e,t)&&sc(r,t,e[t]);return r};class hb extends Y{constructor(...e){let t=e[0];t instanceof _t&&(U(N,"Mesh: use new Mesh({ geometry, shader }) instead"),t={geometry:t,shader:e[1]},e[3]&&(U(N,"Mesh: topology argument has been removed, use geometry.topology instead"),t.geometry.topology=e[3])),super(ub({view:new rr(t),label:"Mesh"},t))}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get geometry(){return this.view.geometry}set geometry(e){this.view.geometry=e}get material(){return U(N,"mesh.material property has been removed, use mesh.shader instead"),this.view.shader}get shader(){return this.view.shader}}var oc=`in vec2 vTextureCoord;
in vec4 vColor;

uniform sampler2D uTexture;

out vec4 outColor;

void main(void){
   outColor = texture(uTexture, vTextureCoord) * vColor;
}`,ac=`
in vec2 aPosition;
in vec2 aUV;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

uniform mat3 transformMatrix;
uniform vec4 color;

out vec2 vTextureCoord;
out vec4 vColor;

void main(void){
    gl_Position = vec4((projectionMatrix * worldTransformMatrix * transformMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aUV;
    
    vColor = vec4(color.rgb * color.a, color.a) * worldAlpha;
}`,ms=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

struct LocalUniforms {
  transformMatrix:mat3x3<f32>,
  color:vec4<f32>
}


@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
@group(1) @binding(0) var<uniform> localUniforms: LocalUniforms;

@group(2) @binding(0) var uTexture: texture_2d<f32>;
@group(2) @binding(1) var uSampler: sampler;



struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };

  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aUV : vec2<f32>,
) -> VSOutput {

    var  mvpMatrix = globalUniforms.projectionMatrix * globalUniforms.worldTransformMatrix * localUniforms.transformMatrix;

    var  colorOut = localUniforms.color;

    colorOut.r *= colorOut.a;
    colorOut.g *= colorOut.a;
    colorOut.b *= colorOut.a;
    
  return VSOutput(
    vec4<f32>((mvpMatrix * vec3<f32>(aPosition, 1.0)).xy, 0.0, 1.0),
    aUV,
    colorOut,
  );
};


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color:vec4<f32>,
) -> @location(0) vec4<f32> {

  return textureSample(uTexture, uSampler, uv) * color;
  
}`;class lc extends Ee{constructor(e){const t=he.from({vertex:ac,fragment:oc,name:"mesh-default"}),n=me.from({vertex:{source:ms,entryPoint:"mainVertex"},fragment:{source:ms,entryPoint:"mainFragment"}});super({glProgram:t,gpuProgram:n,resources:{uTexture:e.texture.source,uSampler:e.texture.style}}),this._texture=e.texture}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.style)}}class gs{constructor(e,t){this.localUniforms=new J({transformMatrix:{value:new R,type:"mat3x3<f32>"},color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"}}),this.localUniformsBindGroup=new Te({0:this.localUniforms}),this.meshShader=new lc({texture:A.EMPTY}),this._renderableHash=Object.create(null),this._gpuBatchableMeshHash=Object.create(null),this.renderer=e,this._adaptor=t}validateRenderable(e){const t=this._getRenderableData(e),n=t.batched,i=e.view.batched;if(t.batched=i,n!==i)return!0;if(i){const s=e.view._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const o=this._getBatchableMesh(e),a=e.view.texture;if(o.texture._source!==a._source&&o.texture._source!==a._source)return o.batcher.checkAndUpdateTexture(o,a)}return!1}addRenderable(e,t){const n=this.renderer.renderPipes.batch,{batched:i}=this._getRenderableData(e);if(i){const s=this._getBatchableMesh(e);s.texture=e.view._texture,n.addToBatch(s)}else n.break(t),t.add({type:"mesh",renderable:e})}updateRenderable(e){if(e.view.batched){const t=this._gpuBatchableMeshHash[e.uid];t.texture=e.view._texture,t.batcher.updateElement(t)}}destroyRenderable(e){this._renderableHash[e.uid]=null;const t=this._gpuBatchableMeshHash[e.uid];W.return(t),this._gpuBatchableMeshHash[e.uid]=null}execute({renderable:e}){e.isRenderable&&this._adaptor.execute(this,e)}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t=e.view;return this._renderableHash[e.uid]={batched:t.batched,indexSize:t._geometry.indices.length,vertexSize:t._geometry.positions.length},e.on("destroyed",()=>{this.destroyRenderable(e)}),this._renderableHash[e.uid]}_getBatchableMesh(e){return this._gpuBatchableMeshHash[e.uid]||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=W.get(nc);return t.renderable=e,t.texture=e.view._texture,this._gpuBatchableMeshHash[e.uid]=t,t.renderable=e,t}destroy(){for(const e in this._gpuBatchableMeshHash)this._gpuBatchableMeshHash[e]&&W.return(this._gpuBatchableMeshHash[e]);this._gpuBatchableMeshHash=null,this._renderableHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this.meshShader.destroy(),this.meshShader=null,this._adaptor=null,this.renderer=null}}gs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"mesh"};var pr=(r=>(r[r.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",r[r.ARRAY_BUFFER=34962]="ARRAY_BUFFER",r[r.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",r))(pr||{});class uc{constructor(e,t){this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.type=t}}class vs{constructor(e){this._gpuBuffers=Object.create(null),this._boundBufferBases=Object.create(null),this._renderer=e}destroy(){this._renderer=null}contextChange(){this.destroyAll(!0),this._gl=this._renderer.gl}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{_gl:t}=this,n=this.getGlBuffer(e);t.bindBuffer(n.type,n.buffer)}bindBufferBase(e,t){const{_gl:n}=this;if(this._boundBufferBases[t]!==e){const i=this.getGlBuffer(e);this._boundBufferBases[t]=e,n.bindBufferBase(n.UNIFORM_BUFFER,t,i.buffer)}}bindBufferRange(e,t,n){const{_gl:i}=this;n=n||0;const s=this.getGlBuffer(e);i.bindBufferRange(i.UNIFORM_BUFFER,t||0,s.buffer,n*256,256)}updateBuffer(e){const{_gl:t}=this,n=this.getGlBuffer(e);if(e._updateID===n.updateID)return n;if(n.updateID=e._updateID,t.bindBuffer(n.type,n.buffer),n.byteLength>=e.data.byteLength)t.bufferSubData(n.type,0,e.data,0,e._updateSize/4);else{const i=e.descriptor.usage&$.STATIC?t.STATIC_DRAW:t.DYNAMIC_DRAW;n.byteLength=e.data.byteLength,t.bufferData(n.type,e.data,i)}return n}destroyAll(e){const t=this._gl;if(!e)for(const n in this._gpuBuffers)t.deleteBuffer(this._gpuBuffers[n].buffer);this._gpuBuffers={}}onBufferDestroy(e,t){const n=this._gpuBuffers[e.uid],i=this._gl;t||i.deleteBuffer(n.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{_gl:t}=this;let n=pr.ARRAY_BUFFER;e.descriptor.usage&$.INDEX?n=pr.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&$.UNIFORM&&(n=pr.UNIFORM_BUFFER);const i=new uc(t.createBuffer(),n);return this._gpuBuffers[e.uid]=i,e.on("destroy",this.onBufferDestroy,this),i}}vs.extension={type:[x.WebGLSystem],name:"buffer"};class sn{constructor(e){this._renderer=e,this.webGLVersion=1,this.extensions=Object.create(null),this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this._renderer.gl=e,e.isContextLost()&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").restoreContext()}init(e){var t;if(e!=null&&e.context)this.initFromContext(e.context);else{const n=this._renderer.background.alpha<1,i=(t=e.premultipliedAlpha)!=null?t:!0;this.initFromOptions({alpha:n,premultipliedAlpha:i,antialias:e.antialias,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference})}}initFromContext(e){this.gl=e,this.validateContext(e),this._renderer.runners.contextChange.emit(e);const t=this._renderer.view.element;t.addEventListener("webglcontextlost",this.handleContextLost,!1),t.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}initFromOptions(e){const t=this.createContext(this._renderer.view.element,e);this.initFromContext(t)}createContext(e,t){const n=e.getContext("webgl2",t);return this.webGLVersion=2,this.gl=n,this.getExtensions(),this.gl}getExtensions(){const{gl:e}=this,t={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc")};Object.assign(this.extensions,t,{colorBufferFloat:e.getExtension("EXT_color_buffer_float")})}handleContextLost(e){e.preventDefault()}handleContextRestored(){this._renderer.runners.contextChange.emit(this.gl)}destroy(){const e=this._renderer.view.element;this._renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}validateContext(e){const t=e.getContextAttributes(),n="WebGL2RenderingContext"in globalThis&&e instanceof globalThis.WebGL2RenderingContext;n&&(this.webGLVersion=2),t&&!t.stencil&&console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");const i=n||!!e.getExtension("OES_element_index_uint");this.supports.uint32Indices=i,i||console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")}}sn.extension={type:[x.WebGLSystem],name:"context"},sn.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"default"};var on=(r=>(r[r.RGBA=6408]="RGBA",r[r.RGB=6407]="RGB",r[r.RG=33319]="RG",r[r.RED=6403]="RED",r[r.RGBA_INTEGER=36249]="RGBA_INTEGER",r[r.RGB_INTEGER=36248]="RGB_INTEGER",r[r.RG_INTEGER=33320]="RG_INTEGER",r[r.RED_INTEGER=36244]="RED_INTEGER",r[r.ALPHA=6406]="ALPHA",r[r.LUMINANCE=6409]="LUMINANCE",r[r.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",r[r.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",r[r.DEPTH_STENCIL=34041]="DEPTH_STENCIL",r))(on||{}),bs=(r=>(r[r.TEXTURE_2D=3553]="TEXTURE_2D",r[r.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",r[r.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",r[r.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",r[r.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",r[r.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",r[r.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",r))(bs||{}),hc=(r=>(r[r.CLAMP=33071]="CLAMP",r[r.REPEAT=10497]="REPEAT",r[r.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",r))(hc||{}),z=(r=>(r[r.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",r[r.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",r[r.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",r[r.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",r[r.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",r[r.UNSIGNED_INT=5125]="UNSIGNED_INT",r[r.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",r[r.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",r[r.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",r[r.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",r[r.BYTE=5120]="BYTE",r[r.SHORT=5122]="SHORT",r[r.INT=5124]="INT",r[r.FLOAT=5126]="FLOAT",r[r.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",r[r.HALF_FLOAT=36193]="HALF_FLOAT",r))(z||{});const cc={uint8x2:{type:z.UNSIGNED_BYTE,size:2,normalised:!1},uint8x4:{type:z.UNSIGNED_BYTE,size:4,normalised:!1},sint8x2:{type:z.BYTE,size:2,normalised:!1},sint8x4:{type:z.BYTE,size:4,normalised:!1},unorm8x2:{type:z.UNSIGNED_BYTE,size:2,normalised:!0},unorm8x4:{type:z.UNSIGNED_BYTE,size:4,normalised:!0},snorm8x2:{type:z.BYTE,size:2,normalised:!0},snorm8x4:{type:z.BYTE,size:4,normalised:!0},uint16x2:{type:z.UNSIGNED_SHORT,size:2,normalised:!1},uint16x4:{type:z.UNSIGNED_SHORT,size:4,normalised:!1},sint16x2:{type:z.SHORT,size:2,normalised:!1},sint16x4:{type:z.SHORT,size:4,normalised:!1},unorm16x2:{type:z.UNSIGNED_SHORT,size:2,normalised:!0},unorm16x4:{type:z.UNSIGNED_SHORT,size:4,normalised:!0},snorm16x2:{type:z.SHORT,size:2,normalised:!0},snorm16x4:{type:z.SHORT,size:4,normalised:!0},float16x2:{type:z.HALF_FLOAT,size:2,normalised:!1},float16x4:{type:z.HALF_FLOAT,size:4,normalised:!1},float32:{type:z.FLOAT,size:1,normalised:!1},float32x2:{type:z.FLOAT,size:2,normalised:!1},float32x3:{type:z.FLOAT,size:3,normalised:!1},float32x4:{type:z.FLOAT,size:4,normalised:!1},uint32:{type:z.UNSIGNED_INT,size:1,normalised:!1},uint32x2:{type:z.UNSIGNED_INT,size:2,normalised:!1},uint32x3:{type:z.UNSIGNED_INT,size:3,normalised:!1},uint32x4:{type:z.UNSIGNED_INT,size:4,normalised:!1},sint32:{type:z.INT,size:1,normalised:!1},sint32x2:{type:z.INT,size:2,normalised:!1},sint32x3:{type:z.INT,size:3,normalised:!1},sint32x4:{type:z.INT,size:4,normalised:!1}};function dc(r){var e;return(e=cc[r])!=null?e:cc.float32}const ys={5126:4,5123:2,5121:1},cb={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class xs{constructor(e){this._geometryVaoHash={},this._renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!0}contextChange(){this.gl=this._renderer.gl}bind(e,t){const n=this.gl;this._activeGeometry=e;const i=this.getVao(e,t);this._activeVao!==i&&(this._activeVao=i,n.bindVertexArray(i)),this.updateBuffers()}reset(){this.unbind()}updateBuffers(){const e=this._activeGeometry,t=this._renderer.buffer;for(let n=0;n<e.buffers.length;n++){const i=e.buffers[n];t.updateBuffer(i)}}checkCompatibility(e,t){const n=e.attributes,i=t.attributeData;for(const s in i)if(!n[s])throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`)}getSignature(e,t){const n=e.attributes,i=t.attributeData,s=["g",e.uid];for(const o in n)i[o]&&s.push(o,i[o].location);return s.join("-")}getVao(e,t){var n;return((n=this._geometryVaoHash[e.uid])==null?void 0:n[t.key])||this.initGeometryVao(e,t)}initGeometryVao(e,t,n=!0){const i=this._renderer.gl,s=this._renderer.buffer;this._renderer.shader.getProgramData(t),this.checkCompatibility(e,t);const o=this.getSignature(e,t);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]=Object.create(null),e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let l=a[o];if(l)return a[t.key]=l,l;const u=e.buffers,h=e.attributes,c={},p={};for(const d in u)c[d]=0,p[d]=0;for(const d in h)!h[d].size&&t.attributeData[d]?h[d].size=t.attributeData[d].size:h[d].size||console.warn(`PIXI Geometry attribute '${d}' size cannot be determined (likely the bound shader does not have the attribute)`),c[h[d].buffer.uid]+=h[d].size*ys[h[d].type];for(const d in h){const f=h[d],g=f.size;f.stride===void 0&&(c[f.buffer.uid]===g*ys[f.type]?f.stride=0:f.stride=c[f.buffer.uid]),f.start===void 0&&(f.start=p[f.buffer.uid],p[f.buffer.uid]+=g*ys[f.type])}l=i.createVertexArray(),i.bindVertexArray(l);for(let d=0;d<u.length;d++){const f=u[d];s.bind(f)}return this.activateVao(e,t),a[t.key]=l,a[o]=l,i.bindVertexArray(null),l}onGeometryDestroy(e,t){const n=this._geometryVaoHash[e.uid],i=this.gl;if(n){if(t)for(const s in n)this._activeVao!==n[s]&&this.unbind(),i.deleteVertexArray(n[s]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const t=this.gl;for(const n in this._geometryVaoHash){if(e)for(const i in this._geometryVaoHash[n]){const s=this._geometryVaoHash[n];this._activeVao!==s&&this.unbind(),t.deleteVertexArray(s[i])}this._geometryVaoHash[n]=null}}activateVao(e,t){const n=this._renderer.gl,i=this._renderer.buffer,s=e.attributes;e.indexBuffer&&i.bind(e.indexBuffer);let o=null;for(const a in s){const l=s[a],u=l.buffer,h=i.getGlBuffer(u);if(t.attributeData[a]){o!==h&&(i.bind(u),o=h);const c=t.attributeData[a].location;n.enableVertexAttribArray(c);const p=dc(l.format);if(n.vertexAttribPointer(c,p.size,p.type,p.normalised,l.stride,l.offset),l.instance)if(this.hasInstance)n.vertexAttribDivisor(c,1);else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,t,n,i){const{gl:s}=this._renderer,o=this._activeGeometry,a=cb[o.topology||e];if(o.indexBuffer){const l=o.indexBuffer.data.BYTES_PER_ELEMENT,u=l===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;o.instanced?s.drawElementsInstanced(a,t||o.indexBuffer.data.length,u,(n||0)*l,o.instanceCount||1):s.drawElements(a,t||o.indexBuffer.data.length,u,(n||0)*l)}else o.instanced?s.drawArraysInstanced(a,n,t||o.getSize(),i||1):s.drawArrays(a,n,t||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this._renderer=null}}xs.extension={type:[x.WebGLSystem],name:"geometry"};const db=new he({vertex:`
        out vec2 vUv;

        void main() {
            vUv = vec2((gl_VertexID << 1) & 2, (gl_VertexID & 2));

            gl_Position = vec4(vUv * 2.0f + -1.0f, 0.0f, 1.0f);

            // flip dem UVs
            vUv.y = 1.0f - vUv.y;
        }`,fragment:`
        in vec2 vUv;
        out vec4 fragColor;

        uniform sampler2D uTexture;

        void main() {
            fragColor = texture(uTexture, vUv);
        }`,name:"big-triangle"}),pc=new Ee({glProgram:db,resources:{uTexture:A.WHITE.source}});class _s{constructor(e){this._useBackBuffer=!1,this._useBackBufferThisRender=!1,this._renderer=e}init({useBackBuffer:e}={}){this._useBackBuffer=e}renderStart({target:e,clear:t}){if(this._useBackBufferThisRender=this._useBackBuffer&&!!e,this._useBackBuffer){const n=this._renderer.renderTarget.getRenderTarget(e);this._targetTexture=n.colorTexture,e=this._getBackBufferTexture(n.colorTexture)}this._renderer.renderTarget.start(e,t,this._renderer.background.colorRgba)}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){const e=this._renderer;if(e.renderTarget.finishRenderPass(),!this._useBackBufferThisRender)return;const t=e.gl;e.renderTarget.bind(this._targetTexture,!1),pc.resources.uTexture=this._backBufferTexture.source,e.shader.bind(pc,!1),e.state.set(_e.for2d()),t.drawArrays(t.TRIANGLES,0,3)}_getBackBufferTexture(e){const t=e.source;return this._backBufferTexture=this._backBufferTexture||new A({source:new ae({width:1,height:1,resolution:1,antialias:!1})}),this._backBufferTexture.source.resize(t.width,t.height,t._resolution),this._backBufferTexture}destroy(){}}_s.extension={type:[x.WebGLSystem],name:"backBuffer"};class ws{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}destroy(){}}ws.extension={type:[x.WebGLSystem],name:"colorMask"};class Ts{constructor(e){this.commandFinished=Promise.resolve(),this._renderer=e}setGeometry(e,t){this._renderer.geometry.bind(e,t.glProgram)}finishRenderPass(){}draw(e){const t=this._renderer,{geometry:n,shader:i,state:s,skipSync:o,topology:a,size:l,start:u,instanceCount:h}=e;t.shader.bind(i,o),t.geometry.bind(n,t.shader.activeProgram),s&&t.state.set(s),t.geometry.draw(a,l,u,h)}destroy(){}}Ts.extension={type:[x.WebGLSystem],name:"encoder"};class fc{constructor(){this.width=-1,this.height=-1,this.msaaRenderBuffer=[],this.msaa=!1,this.dirtyId=-1}}function Ss(r){const e=r.colorTexture.source.resource;return e instanceof HTMLCanvasElement&&document.body.contains(e)}function mc(r,e,t,n,i,s){const o=s?1:-1;return r.identity(),r.a=1/n*2,r.d=o*(1/i*2),r.tx=-1-e*r.a,r.ty=-o-t*r.d,r}var pb=Object.defineProperty,gc=Object.getOwnPropertySymbols,fb=Object.prototype.hasOwnProperty,mb=Object.prototype.propertyIsEnumerable,vc=(r,e,t)=>e in r?pb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,bc=(r,e)=>{for(var t in e||(e={}))fb.call(e,t)&&vc(r,t,e[t]);if(gc)for(var t of gc(e))mb.call(e,t)&&vc(r,t,e[t]);return r};let gb=0;const yc=class{constructor(r={}){if(this.uid=gb++,this.width=0,this.height=0,this.resolution=1,this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._projectionMatrix=new R,r=bc(bc({},yc.defaultDescriptor),r),this.width=r.width,this.height=r.height,this.resolution=r.resolution,this.stencil=r.stencil,this._viewport=new X(0,0,this.width,this.height),typeof r.colorTextures=="number")for(let e=0;e<r.colorTextures;e++)this.colorTextures.push(new A({source:new ae({width:this.width,height:this.height,resolution:r.resolution,antialias:r.antialias})}));else{this.colorTextures=[...r.colorTextures];const e=this.colorTexture.source;this._resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),r.depthTexture&&(this.depthTexture=new A({source:new ae({width:this.width,height:this.height,resolution:this.resolution,format:"stencil8"})}))}get pixelWidth(){return this.width*this.resolution}get pixelHeight(){return this.height*this.resolution}get colorTexture(){return this.colorTextures[0]}get projectionMatrix(){const r=this.colorTexture;return mc(this._projectionMatrix,0,0,r.frameWidth,r.frameHeight,!this.isRoot),this._projectionMatrix}get viewport(){const r=this.colorTexture,e=r.source,t=e.pixelWidth,n=e.pixelHeight,i=this._viewport,s=r.layout.frame;return i.x=s.x*t|0,i.y=s.y*n|0,i.width=s.width*t|0,i.height=s.height*n|0,i}onSourceResize(r){this._resize(r.width,r.height,r._resolution,!0)}_resize(r,e,t=this.resolution,n=!1){this.width=r,this.height=e,this.resolution=t,this.dirtyId++,this.colorTextures.forEach((i,s)=>{n&&s===0||i.source.resize(r,e,t)}),this.depthTexture&&this.depthTexture.source.resize(r,e,t)}destroy(){throw new Error("Method not implemented.")}};let St=yc;St.defaultDescriptor={width:0,height:0,resolution:1,colorTextures:1,stencil:!0,antialias:!1};class an{constructor(e){this.items=[],this._name=e}emit(e,t,n,i,s,o,a,l){const{name:u,items:h}=this;for(let c=0,p=h.length;c<p;c++)h[c][u](e,t,n,i,s,o,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}class xc extends ae{constructor(e){e.resource||(e.resource=I.ADAPTER.createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),super(e),this.type="image",this.alphaMode=0,this.autoDensity=e.autoDensity;const t=e.resource;(this.pixelWidth!==t.width||this.pixelWidth!==t.height)&&this.resizeCanvas()}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight}resize(e=this.width,t=this.height,n=this._resolution){super.resize(e,t,n),this.resizeCanvas()}}var vb=Object.defineProperty,_c=Object.getOwnPropertySymbols,bb=Object.prototype.hasOwnProperty,yb=Object.prototype.propertyIsEnumerable,wc=(r,e,t)=>e in r?vb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,xb=(r,e)=>{for(var t in e||(e={}))bb.call(e,t)&&wc(r,t,e[t]);if(_c)for(var t of _c(e))yb.call(e,t)&&wc(r,t,e[t]);return r};const Ps=new Map;function ln(r,e){if(!Ps.has(r)){const t=new A({source:new xc(xb({resource:r},e))});Ps.set(r,t)}return Ps.get(r)}class As{constructor(e){this.onRenderTargetChange=new an("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._clearColorCache=[0,0,0,0],this._viewPortCache={x:0,y:0,width:0,height:0},this.rootProjectionMatrix=new R,this._renderer=e}contextChange(e){this._gl=e}start(e,t=!0,n){this._renderTargetStack.length=0;const i=this.getRenderTarget(e);this.rootRenderTarget=i,this.renderingToScreen=Ss(this.rootRenderTarget),this.rootProjectionMatrix=i.projectionMatrix,this.push(i,t,n)}bind(e,t=!0,n){const i=this.getRenderTarget(e);this.renderTarget=i;const s=this.getGpuRenderTarget(i);i.dirtyId!==s.dirtyId&&(s.dirtyId=i.dirtyId,this._resizeGpuRenderTarget(i));const o=this._gl;o.bindFramebuffer(o.FRAMEBUFFER,s.framebuffer),i.colorTextures.forEach(h=>{this._renderer.texture.unbind(h)});const a=i.viewport;let l=a.y;i.isRoot&&(l=this._renderer.view.element.height-a.height);const u=this._viewPortCache;return(u.x!==a.x||u.y!==l||u.width!==a.width||u.height!==a.height)&&(u.x=a.x,u.y=l,u.width=a.width,u.height=a.height,o.viewport(a.x,l,a.width,a.height)),this.clear(t,n),this.onRenderTargetChange.emit(i),i}clear(e,t){if(!e)return;typeof e=="boolean"&&(e=e?ve.ALL:ve.NONE);const n=this._gl;if(e&ve.COLOR){t=t!=null?t:this._defaultClearColor;const i=this._clearColorCache;(i[0]!==t[0]||i[1]!==t[1]||i[2]!==t[2]||i[3]!==t[3])&&(i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[3],n.clearColor(t[0],t[1],t[2],t[3]))}n.clear(e)}getGpuColorTexture(e){return e.colorTexture}push(e,t=!0,n){const i=this.bind(e,t,n);return this._renderTargetStack.push(i),i}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=ln(e)),e instanceof St?t=e:e instanceof A&&(t=new St({colorTextures:[e]}),e.source.resource instanceof HTMLCanvasElement&&(t.isRoot=!0),e.source.on("destroy",()=>{t.destroy()})),this._renderSurfaceToRenderTargetHash.set(e,t),t}finishRenderPass(){const e=this.getGpuRenderTarget(this.renderTarget);if(!e.msaa)return;const t=this._renderer.gl;t.bindFramebuffer(t.FRAMEBUFFER,e.resolveTargetFramebuffer),t.bindFramebuffer(t.READ_FRAMEBUFFER,e.framebuffer),t.blitFramebuffer(0,0,e.width,e.height,0,0,e.width,e.height,t.COLOR_BUFFER_BIT,t.NEAREST),t.bindFramebuffer(t.FRAMEBUFFER,e.framebuffer),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)}copyToTexture(e,t,n,i){const s=this._renderer,o=s.renderTarget.getGpuColorTexture(e);s.renderTarget.bind(o,!1),s.texture.bind(t,0);const a=s.gl;return a.copyTexSubImage2D(a.TEXTURE_2D,0,0,0,n.x,n.y,i.width,i.height),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){const t=this._renderer.gl,n=new fc;return e.colorTexture.source.resource instanceof HTMLCanvasElement?(this._gpuRenderTargetHash[e.uid]=n,n.framebuffer=null,n):(this._initColor(e,n),e.stencil&&this._initStencil(n),t.bindFramebuffer(t.FRAMEBUFFER,null),this._gpuRenderTargetHash[e.uid]=n,n)}_resizeGpuRenderTarget(e){if(e.isRoot)return;const t=this.getGpuRenderTarget(e);this._resizeColor(e,t),e.stencil&&this._resizeStencil(t)}_initColor(e,t){const n=this._renderer,i=n.gl,s=i.createFramebuffer();if(t.resolveTargetFramebuffer=s,i.bindFramebuffer(i.FRAMEBUFFER,s),t.width=e.colorTexture.source.pixelWidth,t.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((o,a)=>{const l=o.source;l.antialias&&(t.msaa=!0),n.texture.bindSource(l,0);const u=n.texture.getGlSource(l).texture;i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+a,3553,u,0)}),t.msaa){const o=i.createFramebuffer();t.framebuffer=o,i.bindFramebuffer(i.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=i.createRenderbuffer();t.msaaRenderBuffer[l]=u})}else t.framebuffer=s}_resizeColor(e,t){const n=e.colorTexture.source;if(t.width=n.pixelWidth,t.height=n.pixelHeight,e.colorTextures.forEach((i,s)=>{s!==0&&i.source.resize(n.width,n.height,n._resolution)}),t.msaa){const i=this._renderer,s=i.gl,o=t.framebuffer;s.bindFramebuffer(s.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=a.source;i.texture.bindSource(u,0);const h=i.texture.getGlSource(u).internalFormat,c=t.msaaRenderBuffer[l];s.bindRenderbuffer(s.RENDERBUFFER,c),s.renderbufferStorageMultisample(s.RENDERBUFFER,4,h,u.pixelWidth,u.pixelHeight),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+l,s.RENDERBUFFER,c)})}}_initStencil(e){const t=this._renderer.gl,n=t.createRenderbuffer();e.depthStencilRenderBuffer=n,t.bindRenderbuffer(t.RENDERBUFFER,n),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,n)}_resizeStencil(e){const t=this._renderer.gl;t.bindRenderbuffer(t.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?t.renderbufferStorageMultisample(t.RENDERBUFFER,4,t.DEPTH24_STENCIL8,e.width,e.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH24_STENCIL8,e.width,e.height)}destroy(){}}As.extension={type:[x.WebGLSystem],name:"renderTarget"};const Me=[];Me[re.NONE]=void 0,Me[re.DISABLED]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilReadMask:0,stencilBack:{compare:"always",passOp:"keep"}},Me[re.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},Me[re.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},Me[re.RENDERING_MASK_REMOVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"decrement-clamp"}},Me[re.MASK_ACTIVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilBack:{compare:"equal",passOp:"keep"}};class Es{constructor(e){this._stencilCache={enabled:!1,stencilReference:0,stencilMode:re.NONE},this._renderTargetStencilState=Object.create(null),e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this._gl=e,this._comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this._stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP}}onRenderTargetChange(e){if(this._activeRenderTarget===e)return;this._activeRenderTarget=e;let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:re.DISABLED,stencilReference:0}),this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const n=this._renderTargetStencilState[this._activeRenderTarget.uid],i=this._gl,s=Me[e],o=this._stencilCache;if(n.stencilMode=e,n.stencilReference=t,e===re.DISABLED){this._stencilCache.enabled&&(this._stencilCache.enabled=!1,i.disable(i.STENCIL_TEST));return}this._stencilCache.enabled||(this._stencilCache.enabled=!0,i.enable(i.STENCIL_TEST)),(e!==o.stencilMode||o.stencilReference!==t)&&(o.stencilMode=e,o.stencilReference=t,i.stencilFunc(this._comparisonFuncMapping[s.stencilBack.compare],t,255),i.stencilOp(i.KEEP,i.KEEP,this._stencilOpsMapping[s.stencilBack.passOp]))}destroy(){}}Es.extension={type:[x.WebGLSystem],name:"stencil"};class _b{}class Tc{constructor(e,t){this.program=e,this.uniformData=t,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}class un extends oe{constructor({buffer:e,offset:t,size:n}){super(),this.uid=it(),this.touched=0,this.resourceType="bufferResource",this.resourceId=it(),this.bufferResource=!0,this.buffer=e,this.offset=t,this.size=n,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this.resourceId=it(),this.emit("change",this)}destroy(e=!1){e&&this.buffer.destroy(),this.buffer=null}}function Ms(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}function Cs(r){const e=new Array(r);for(let t=0;t<e.length;t++)e[t]=!1;return e}function Bs(r,e){switch(r){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return Cs(2*e);case"bvec3":return Cs(3*e);case"bvec4":return Cs(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const wb={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function Sc(r){return wb[r]}let hn=null;const Pc={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function Rs(r,e){if(!hn){const t=Object.keys(Pc);hn={};for(let n=0;n<t.length;++n){const i=t[n];hn[r[i]]=Pc[i]}}return hn[e]}function Ac(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=e.getActiveAttrib(r,i);if(s.name.startsWith("gl_"))continue;const o=Rs(e,s.type),a={type:o,name:s.name,size:Sc(o),location:e.getAttribLocation(r,s.name)};t[s.name]=a}return t}function Ec(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_UNIFORM_BLOCKS);for(let i=0;i<n;i++){const s=e.getActiveUniformBlockName(r,i),o=e.getUniformBlockIndex(r,s),a=e.getActiveUniformBlockParameter(r,i,e.UNIFORM_BLOCK_DATA_SIZE);t[s]={name:s,index:o,size:a}}return t}function Mc(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const s=e.getActiveUniform(r,i),o=s.name.replace(/\[.*?\]$/,""),a=!!s.name.match(/\[.*?\]$/),l=Rs(e,s.type);t[o]={name:o,index:i,type:l,size:s.size,isArray:a,value:Bs(l,s.size)}}return t}function Cc(r,e){const t=r.getShaderSource(e).split(`
`).map((u,h)=>`${h}: ${u}`),n=r.getShaderInfoLog(e),i=n.split(`
`),s={},o=i.map(u=>parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(u=>u&&!s[u]?(s[u]=!0,!0):!1),a=[""];o.forEach(u=>{t[u-1]=`%c${t[u-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const l=t.join(`
`);a[0]=l,console.error(n),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function Bc(r,e,t,n){r.getProgramParameter(e,r.LINK_STATUS)||(r.getShaderParameter(t,r.COMPILE_STATUS)||Cc(r,t),r.getShaderParameter(n,r.COMPILE_STATUS)||Cc(r,n),console.error("PixiJS Error: Could not initialize shader."),r.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",r.getProgramInfoLog(e)))}function Rc(r,e){const t=Ms(r,r.VERTEX_SHADER,e.vertex),n=Ms(r,r.FRAGMENT_SHADER,e.fragment),i=r.createProgram();r.attachShader(i,t),r.attachShader(i,n);const s=e.transformFeedbackVaryings;s&&(typeof r.transformFeedbackVaryings!="function"||r.transformFeedbackVaryings(i,s.names,s.bufferMode==="separate"?r.SEPARATE_ATTRIBS:r.INTERLEAVED_ATTRIBS)),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)||Bc(r,i,t,n),e.attributeData=Ac(i,r),e.uniformData=Mc(i,r),e.uniformBlockData=Ec(i,r),r.deleteShader(t),r.deleteShader(n);const o={};for(const a in e.uniformData){const l=e.uniformData[a];o[a]={location:r.getUniformLocation(i,a),value:Bs(l.type,l.size)}}return new Tc(i,o)}const Fe={textureCount:0,blockIndex:0};class ks{constructor(e){this.activeProgram=null,this._programDataHash=Object.create(null),this._nextIndex=0,this._boundUniformsIdsToIndexHash=Object.create(null),this._boundIndexToUniformsHash=Object.create(null),this._renderer=e}contextChange(e){this._gl=e,this._maxBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}bind(e,t){if(this._setProgram(e.glProgram),t)return;Fe.textureCount=0,Fe.blockIndex=0;const n=this._gl,i=this.getProgramData(e.glProgram);for(const s in e.groups){const o=e.groups[s];for(const a in o.resources){const l=o.resources[a];if(l instanceof J)l.ubo?this.bindUniformBlock(l,e.uniformBindMap[s][a],Fe.blockIndex++):this._updateUniformGroup(l);else if(l instanceof un)this.bindUniformBlock(l,e.uniformBindMap[s][a],Fe.blockIndex++);else if(l instanceof ae){this._renderer.texture.bind(l,Fe.textureCount);const u=e.uniformBindMap[s][a],h=i.uniformData[u];h&&(h.value!==Fe.textureCount&&n.uniform1i(h.location,Fe.textureCount),Fe.textureCount++)}else l instanceof Ye}}}_updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this.activeProgram,Fe)}bindUniformBlock(e,t,n=0){const i=this._renderer.buffer,s=this.getProgramData(this.activeProgram),o=e.bufferResource;o&&this._renderer.uniformBuffer.updateUniformGroup(e),i.updateBuffer(e.buffer);let a=this._boundUniformsIdsToIndexHash[e.uid];if(a===void 0){const h=this._nextIndex++%this._maxBindings,c=this._boundIndexToUniformsHash[h];c&&(this._boundUniformsIdsToIndexHash[c.uid]=void 0),a=this._boundUniformsIdsToIndexHash[e.uid]=h,this._boundIndexToUniformsHash[h]=e,o?i.bindBufferRange(e.buffer,h,e.offset):i.bindBufferBase(e.buffer,h)}const l=this._gl,u=this.activeProgram.uniformBlockData[t].index;s.uniformBlockBindings[n]!==a&&(s.uniformBlockBindings[n]=a,l.uniformBlockBinding(s.program,u,a))}_setProgram(e){if(this.activeProgram===e)return;this.activeProgram=e;const t=this.getProgramData(e);this._gl.useProgram(t.program)}getProgramData(e){return this._programDataHash[e.key]||this._createProgramData(e)}_createProgramData(e){const t=e.key;return this._programDataHash[t]=Rc(this._gl,e),this._programDataHash[t]}}ks.extension={type:[x.WebGLSystem],name:"shader"};let fr;function Tb(){if(typeof fr=="boolean")return fr;try{fr=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch(r){fr=!1}return fr}const cn=[{test:r=>r.type==="float"&&r.size===1&&!r.isArray,code:r=>`
            if(uv["${r}"] !== ud["${r}"].value)
            {
                ud["${r}"].value = uv["${r}"]
                gl.uniform1f(ud["${r}"].location, uv["${r}"])
            }
            `},{test:(r,e)=>(r.type==="sampler2D"||r.type==="samplerCube"||r.type==="sampler2DArray")&&r.size===1&&!r.isArray&&(e==null||e instanceof A),code:r=>`t = syncData.textureCount++;

            renderer.texture.bind(uv["${r}"], t);

            if(ud["${r}"].value !== t)
            {
                ud["${r}"].value = t;
                gl.uniform1i(ud["${r}"].location, t);
; // eslint-disable-line max-len
            }`},{test:(r,e)=>r.type==="mat3"&&r.size===1&&!r.isArray&&e.a!==void 0,code:r=>`
            gl.uniformMatrix3fv(ud["${r}"].location, false, uv["${r}"].toArray(true));
            `},{test:(r,e)=>r.type==="vec2"&&r.size===1&&!r.isArray&&e.x!==void 0,code:r=>`
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${r}"].location, v.x, v.y);
                }`},{test:r=>r.type==="vec2"&&r.size===1&&!r.isArray,code:r=>`
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${r}"].location, v[0], v[1]);
                }
            `},{test:(r,e)=>r.type==="vec4"&&r.size===1&&!r.isArray&&e.width!==void 0,code:r=>`
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${r}"].location, v.x, v.y, v.width, v.height)
                }`},{test:(r,e)=>r.type==="vec4"&&r.size===1&&!r.isArray&&e.red!==void 0,code:r=>`
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${r}"].location, v.red, v.green, v.blue, v.alpha)
                }`},{test:(r,e)=>r.type==="vec3"&&r.size===1&&!r.isArray&&e.red!==void 0,code:r=>`
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${r}"].location, v.red, v.green, v.blue)
                }`},{test:r=>r.type==="vec4"&&r.size===1&&!r.isArray,code:r=>`
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${r}"].location, v[0], v[1], v[2], v[3])
                }`}],Sb={float:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,vec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,vec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,vec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,int:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,ivec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,ivec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,ivec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,uint:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,uvec2:`
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,uvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,uvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,bool:`
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,bvec2:`
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,bvec3:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,bvec4:`
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,mat2:"gl.uniformMatrix2fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",sampler2D:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,samplerCube:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,sampler2DArray:`
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`},Pb={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"};function kc(r,e){const t=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(const n in r.uniforms){const i=e[n];if(!i){r.uniforms[n]instanceof J?r.uniforms[n].ubo?t.push(`
                        renderer.shader.bindUniformBlock(uv.${n}, "${n}");
                    `):t.push(`
                        renderer.shader.updateUniformGroup(uv.${n});
                    `):r.uniforms[n]instanceof un&&t.push(`
                        renderer.shader.bindBufferResource(uv.${n}, "${n}");
                    `);continue}const s=r.uniforms[n];let o=!1;for(let a=0;a<cn.length;a++)if(cn[a].test(i,s)){t.push(cn[a].code(n,s)),o=!0;break}if(!o){const a=(i.size===1&&!i.isArray?Sb:Pb)[i.type].replace("location",`ud["${n}"].location`);t.push(`
            cu = ud["${n}"];
            cv = cu.value;
            v = uv["${n}"];
            ${a};`)}}return new Function("ud","uv","renderer","syncData",t.join(`
`))}class Os{constructor(e){this.destroyed=!1,this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this._systemCheck(),this.gl=null,this._cache={}}_systemCheck(){if(!Tb())throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(e){this.gl=e}updateUniformGroup(e,t,n){const i=this._renderer.shader.getProgramData(t);(!e.isStatic||e.dirtyId!==i.uniformDirtyGroups[e.uid])&&(i.uniformDirtyGroups[e.uid]=e.dirtyId,this._getUniformSyncFunction(e,t)(i.uniformData,e.uniforms,this._renderer,n))}_getUniformSyncFunction(e,t){var n;return((n=this._uniformGroupSyncHash[e.signature])==null?void 0:n[t.key])||this._createUniformSyncFunction(e,t)}_createUniformSyncFunction(e,t){const n=this._uniformGroupSyncHash[e.signature]||(this._uniformGroupSyncHash[e.signature]={}),i=this._getSignature(e,t.uniformData,"u");return this._cache[i]||(this._cache[i]=kc(e,t.uniformData)),n[t.key]=this._cache[i],n[t.key]}_getSignature(e,t,n){const i=e.uniforms,s=[`${n}-`];for(const o in i)s.push(o),t[o]&&s.push(t[o].type);return s.join("-")}destroy(){this._renderer=null,this.destroyed=!0}}Os.extension={type:[x.WebGLSystem],name:"uniformGroup"};function Ab(r){return r=r.replaceAll("texture2D","texture").replaceAll("gl_FragColor","fragColor").replaceAll("varying","in"),r=`
        out vec4 fragColor;
    ${r}
    `,r}function Oc(r){const e={};return e.normal=[r.ONE,r.ONE_MINUS_SRC_ALPHA],e.add=[r.ONE,r.ONE],e.multiply=[r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.screen=[r.ONE,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[r.SRC_ALPHA,r.ONE,r.ONE,r.ONE],e["screen-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.erase=[r.ZERO,r.ONE_MINUS_SRC_ALPHA],e}const Eb=0,Mb=1,Cb=2,Bb=3,Rb=4,kb=5,Fs=class{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[Eb]=this.setBlend,this.map[Mb]=this.setOffset,this.map[Cb]=this.setCullFace,this.map[Bb]=this.setDepthTest,this.map[Rb]=this.setFrontFace,this.map[kb]=this.setDepthMask,this.checks=[],this.defaultState=new _e,this.defaultState.blend=!0}contextChange(r){this.gl=r,this.blendModesMap=Oc(r),this.set(this.defaultState),this.reset()}set(r){if(r=r||this.defaultState,this.stateId!==r.data){let e=this.stateId^r.data,t=0;for(;e;)e&1&&this.map[t].call(this,!!(r.data&1<<t)),e=e>>1,t++;this.stateId=r.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,r)}forceState(r){r=r||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(r.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,r);this.stateId=r.data}setBlend(r){this._updateCheck(Fs._checkBlendMode,r),this.gl[r?"enable":"disable"](this.gl.BLEND)}setOffset(r){this._updateCheck(Fs._checkPolygonOffset,r),this.gl[r?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(r){this.gl[r?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(r){this.gl.depthMask(r)}setCullFace(r){this.gl[r?"enable":"disable"](this.gl.CULL_FACE)}setFrontFace(r){this.gl.frontFace(this.gl[r?"CW":"CCW"])}setBlendMode(r){if(this.blendModesMap[r]||(r="normal"),r===this.blendMode)return;this.blendMode=r;const e=this.blendModesMap[r],t=this.gl;e.length===2?t.blendFunc(e[0],e[1]):t.blendFuncSeparate(e[0],e[1],e[2],e[3]),e.length===6?(this._blendEq=!0,t.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD))}setPolygonOffset(r,e){this.gl.polygonOffset(r,e)}reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}_updateCheck(r,e){const t=this.checks.indexOf(r);e&&t===-1?this.checks.push(r):!e&&t!==-1&&this.checks.splice(t,1)}static _checkBlendMode(r,e){r.setBlendMode(e.blendMode)}static _checkPolygonOffset(r,e){r.setPolygonOffset(1,e.polygonOffset)}destroy(){this.gl=null}};let Us=Fs;Us.extension={type:[x.WebGLSystem],name:"state"};class Fc{constructor(e){this.target=bs.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=z.UNSIGNED_BYTE,this.internalFormat=on.RGBA,this.format=on.RGBA,this.samplerType=0}}const Uc={type:"image",upload(r,e,t){e.width===r.width||e.height===r.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,r.width,r.height,0,e.format,e.type,r.resource),e.width=r.width,e.height=r.height}},Ic={type:"image",upload(r,e,t){t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.alphaMode!==0);const n=e.width,i=e.height,s=r.pixelWidth,o=r.pixelHeight,a=r.resource.width,l=r.resource.height;a<s||l<o?((n!==s||i!==o)&&t.texImage2D(e.target,0,e.internalFormat,s,o,0,e.format,e.type,null),t.texSubImage2D(t.TEXTURE_2D,0,0,0,a,l,e.format,e.type,r.resource)):n===s||i===o?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,s,o,0,e.format,e.type,r.resource),e.width=s,e.height=o}};function Gc(r){return{r8unorm:r.RED,r8snorm:r.RED,r8uint:r.RED,r8sint:r.RED,r16uint:r.RED,r16sint:r.RED,r16float:r.RED,rg8unorm:r.RG,rg8snorm:r.RG,rg8uint:r.RG,rg8sint:r.RG,r32uint:r.RED,r32sint:r.RED,r32float:r.RED,rg16uint:r.RG,rg16sint:r.RG,rg16float:r.RG,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.RGBA,rgba8snorm:r.RGBA,rgba8uint:r.RGBA,rgba8sint:r.RGBA,bgra8unorm:r.RGBA,"bgra8unorm-srgb":r.RGBA,rgb9e5ufloat:r.RGB,rgb10a2unorm:r.RGBA,rg11b10ufloat:r.RGB,rg32uint:r.RG,rg32sint:r.RG,rg32float:r.RG,rgba16uint:r.RGBA,rgba16sint:r.RGBA,rgba16float:r.RGBA,rgba32uint:r.RGBA,rgba32sint:r.RGBA,rgba32float:r.RGBA,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT,depth24plus:r.DEPTH_COMPONENT,"depth24plus-stencil8":r.DEPTH_STENCIL,depth32float:r.DEPTH_COMPONENT,"depth32float-stencil8":r.DEPTH_STENCIL}}function Lc(r){return{r8unorm:r.R8,r8snorm:r.R8_SNORM,r8uint:r.R8UI,r8sint:r.R8I,r16uint:r.R16UI,r16sint:r.R16I,r16float:r.R16F,rg8unorm:r.RG8,rg8snorm:r.RG8_SNORM,rg8uint:r.RG8UI,rg8sint:r.RG8I,r32uint:r.R32UI,r32sint:r.R32I,r32float:r.R32F,rg16uint:r.RG16UI,rg16sint:r.RG16I,rg16float:r.RG16F,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.SRGB8_ALPHA8,rgba8snorm:r.RGBA8_SNORM,rgba8uint:r.RGBA8UI,rgba8sint:r.RGBA8I,bgra8unorm:r.RGBA8,"bgra8unorm-srgb":r.SRGB8_ALPHA8,rgb9e5ufloat:r.RGB9_E5,rgb10a2unorm:r.RGB10_A2,rg11b10ufloat:r.R11F_G11F_B10F,rg32uint:r.RG32UI,rg32sint:r.RG32I,rg32float:r.RG32F,rgba16uint:r.RGBA16UI,rgba16sint:r.RGBA16I,rgba16float:r.RGBA16F,rgba32uint:r.RGBA32UI,rgba32sint:r.RGBA32I,rgba32float:r.RGBA32F,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT16,depth24plus:r.DEPTH_COMPONENT24,"depth24plus-stencil8":r.DEPTH24_STENCIL8,depth32float:r.DEPTH_COMPONENT32F,"depth32float-stencil8":r.DEPTH32F_STENCIL8}}function $c(r){return{r8unorm:r.UNSIGNED_BYTE,r8snorm:r.BYTE,r8uint:r.UNSIGNED_BYTE,r8sint:r.BYTE,r16uint:r.UNSIGNED_SHORT,r16sint:r.SHORT,r16float:r.HALF_FLOAT,rg8unorm:r.UNSIGNED_BYTE,rg8snorm:r.BYTE,rg8uint:r.UNSIGNED_BYTE,rg8sint:r.BYTE,r32uint:r.UNSIGNED_INT,r32sint:r.INT,r32float:r.FLOAT,rg16uint:r.UNSIGNED_SHORT,rg16sint:r.SHORT,rg16float:r.HALF_FLOAT,rgba8unorm:r.UNSIGNED_BYTE,"rgba8unorm-srgb":r.UNSIGNED_BYTE,rgba8snorm:r.BYTE,rgba8uint:r.UNSIGNED_BYTE,rgba8sint:r.BYTE,bgra8unorm:r.UNSIGNED_BYTE,"bgra8unorm-srgb":r.UNSIGNED_BYTE,rgb9e5ufloat:r.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:r.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:r.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:r.UNSIGNED_INT,rg32sint:r.INT,rg32float:r.FLOAT,rgba16uint:r.UNSIGNED_SHORT,rgba16sint:r.SHORT,rgba16float:r.HALF_FLOAT,rgba32uint:r.UNSIGNED_INT,rgba32sint:r.INT,rgba32float:r.FLOAT,stencil8:r.UNSIGNED_BYTE,depth16unorm:r.UNSIGNED_SHORT,depth24plus:r.UNSIGNED_INT,"depth24plus-stencil8":r.UNSIGNED_INT_24_8,depth32float:r.FLOAT,"depth32float-stencil8":r.FLOAT_32_UNSIGNED_INT_24_8_REV}}const Is={linear:9729,nearest:9728},Dc={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},dn={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},zc={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};function Ob(r){r instanceof Uint8ClampedArray&&(r=new Uint8Array(r.buffer));const e=r.length;for(let t=0;t<e;t+=4){const n=r[t+3];if(n!==0){const i=255.001/n;r[t]=r[t]*i+.5,r[t+1]=r[t+1]*i+.5,r[t+2]=r[t+2]*i+.5}}}const Fb=new X,Ub=4;class Gs{constructor(e){this.managedTextures=[],this._glTextures=Object.create(null),this._glSamplers=Object.create(null),this._boundTextures=[],this._activeTextureLocation=-1,this._boundSamplers=Object.create(null),this._uploads={image:Ic,buffer:Uc},this._renderer=e}contextChange(e){this._gl=e,this._mapFormatToInternalFormat||(this._mapFormatToInternalFormat=Lc(e),this._mapFormatToType=$c(e),this._mapFormatToFormat=Gc(e));for(let t=0;t<16;t++)this.bind(A.EMPTY,t)}bind(e,t=0){e?(this.bindSource(e.source,t),this._bindSampler(e.style,t)):(this.bindSource(null,t),this._bindSampler(null,t))}bindSource(e,t=0){const n=this._gl;if(e.touched=this._renderer.textureGC.count,this._boundTextures[t]!==e){this._boundTextures[t]=e,this._activateLocation(t),e=e||A.EMPTY.source;const i=this.getGlSource(e);n.bindTexture(i.target,i.texture)}}_bindSampler(e,t=0){const n=this._gl;if(!e){this._boundSamplers[t]=null,n.bindSampler(t,null);return}const i=this._getGlSampler(e);this._boundSamplers[t]!==i&&(this._boundSamplers[t]=i,n.bindSampler(t,i))}unbind(e){const t=e.source,n=this._boundTextures,i=this._gl;for(let s=0;s<n.length;s++)if(n[s]===t){this._activateLocation(s);const o=this.getGlSource(t);i.bindTexture(o.target,null),n[s]=null}}_activateLocation(e){this._activeTextureLocation!==e&&(this._activeTextureLocation=e,this._gl.activeTexture(this._gl.TEXTURE0+e))}_initSource(e){const t=this._gl,n=new Fc(t.createTexture());if(n.type=this._mapFormatToType[e.format],n.internalFormat=this._mapFormatToInternalFormat[e.format],n.format=this._mapFormatToFormat[e.format],e.autoGenerateMipmaps){const i=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(i))+1}return this._glTextures[e.uid]=n,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceUpdate,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),n}onSourceUnload(e){const t=this._glTextures[e.uid];t&&(this.unbind(e),this._glTextures[e.uid]=null,this._gl.deleteTexture(t.texture))}onSourceUpdate(e){const t=this._gl,n=this._glTextures[e.uid];t.bindTexture(t.TEXTURE_2D,n.texture),this._boundTextures[this._activeTextureLocation]=e,this._uploads[e.type]?(this._uploads[e.type].upload(e,n,this._gl),e.autoGenerateMipmaps&&e.mipLevelCount>1&&t.generateMipmap(n.target)):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.pixelWidth,e.pixelHeight,0,t.RGBA,t.UNSIGNED_BYTE,null)}onSourceDestroy(e){e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}_initSampler(e){const t=this._gl,n=this._gl.createSampler();if(this._glSamplers[e.resourceId]=n,t.samplerParameteri(n,t.TEXTURE_WRAP_S,dn[e.addressModeU]),t.samplerParameteri(n,t.TEXTURE_WRAP_T,dn[e.addressModeV]),t.samplerParameteri(n,t.TEXTURE_WRAP_R,dn[e.addressModeW]),t.samplerParameteri(n,t.TEXTURE_MAG_FILTER,Is[e.minFilter]),this._boundTextures[this._activeTextureLocation].mipLevelCount>1){const s=Dc[e.minFilter][e.mipmapFilter];t.samplerParameteri(n,t.TEXTURE_MIN_FILTER,s)}else t.samplerParameteri(n,t.TEXTURE_MIN_FILTER,Is[e.magFilter]);const i=this._renderer.context.extensions.anisotropicFiltering;if(i&&e.maxAnisotropy>1){const s=Math.min(e.maxAnisotropy,t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));t.samplerParameteri(n,i.TEXTURE_MAX_ANISOTROPY_EXT,s)}return e.compare&&t.samplerParameteri(n,t.TEXTURE_COMPARE_FUNC,zc[e.compare]),this._glSamplers[e.resourceId]}_getGlSampler(e){return this._glSamplers[e.resourceId]||this._initSampler(e)}getGlSource(e){return this._glTextures[e.uid]||this._initSource(e)}generateCanvas(e){const{pixels:t,width:n,height:i}=this.getPixels(e),s=I.ADAPTER.createCanvas();s.width=n,s.height=i;const o=s.getContext("2d");if(o){const a=o.createImageData(n,i);a.data.set(t),o.putImageData(a,0,0)}return s}getPixels(e){const t=e.source.resolution,n=Fb;n.x=e.frameX,n.y=e.frameY,n.width=e.frameWidth,n.height=e.frameHeight;const i=Math.max(Math.round(n.width*t),1),s=Math.max(Math.round(n.height*t),1),o=new Uint8Array(Ub*i*s),a=this._renderer,l=a.renderTarget.getRenderTarget(e),u=a.renderTarget.getGpuRenderTarget(l),h=a.gl;return h.bindFramebuffer(h.FRAMEBUFFER,u.resolveTargetFramebuffer),h.readPixels(Math.round(n.x*t),Math.round(n.y*t),i,s,h.RGBA,h.UNSIGNED_BYTE,o),{pixels:new Uint8ClampedArray(o.buffer),width:i,height:s}}destroy(){throw new Error("Method not implemented.")}}Gs.extension={type:[x.WebGLSystem],name:"texture"};var Ib=Object.defineProperty,Nc=Object.getOwnPropertySymbols,Gb=Object.prototype.hasOwnProperty,Lb=Object.prototype.propertyIsEnumerable,Wc=(r,e,t)=>e in r?Ib(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Hc=(r,e)=>{for(var t in e||(e={}))Gb.call(e,t)&&Wc(r,t,e[t]);if(Nc)for(var t of Nc(e))Lb.call(e,t)&&Wc(r,t,e[t]);return r};const $b=["init","destroy","contextChange","reset","renderEnd","renderStart","render","update","postrender","prerender"];class Ls{constructor(e){this.runners=Object.create(null),this.renderPipes=Object.create(null),this._systemsHash=Object.create(null);var t;this.type=e.type,this.name=e.name;const n=[...$b,...(t=e.runners)!=null?t:[]];this._addRunners(...n),this._addSystems(e.systems),this._addPipes(e.renderPipes,e.renderPipeAdaptors)}async init(e={}){for(const t in this._systemsHash){const n=this._systemsHash[t].constructor.defaultOptions;e=Hc(Hc({},n),e)}for(let t=0;t<this.runners.init.items.length;t++)await this.runners.init.items[t].init(e)}render(e,t){let n=e;n instanceof Y&&(n={container:n},t&&(U(N,"passing a second argument is deprecated, please use render options instead"),n.target=t.renderTexture)),n.target||(n.target=this.view.texture),this._lastObjectRendered=n.container,this.runners.prerender.emit(n),this.runners.renderStart.emit(n),this.runners.render.emit(n),this.runners.renderEnd.emit(n),this.runners.postrender.emit(n)}resize(e,t,n){this.view.resize(e,t,n)}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e}get width(){return this.view.texture.frameWidth}get height(){return this.view.texture.frameHeight}get element(){return this.view.element}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(t=>{this.runners[t]=new an(t)})}_addSystems(e){let t;for(t in e){const n=e[t];this._addSystem(n.value,n.name)}}_addSystem(e,t){const n=new e(this);if(this[t])throw new Error(`Whoops! The name "${t}" is already in use`);this[t]=n,this._systemsHash[t]=n;for(const i in this.runners)this.runners[i].add(n);return this}_addPipes(e,t){const n=t.reduce((i,s)=>(i[s.name]=s.value,i),{});e.forEach(i=>{const s=i.value,o=i.name,a=n[o];this.renderPipes[o]=new s(this,a?new a:null)})}destroy(){Object.values(this.runners).forEach(t=>{t.destroy()}),this._systemsHash=null;const e=this;e.renderPipes=null,e.runners=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}}class pn extends oe{constructor({original:e,view:t}){super(),this.uid=si(),this.didViewUpdate=!1,this.view=t,e&&this.init(e)}init(e){this._original=e,this.layerTransform=e.layerTransform}get layerColor(){return this._original.layerColor}get layerBlendMode(){return this._original.layerBlendMode}get layerVisibleRenderable(){return this._original.layerVisibleRenderable}get isRenderable(){return this._original.isRenderable}}class $s extends _t{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}var jc=`precision lowp float;

in vec2 vTextureCoord;
in vec4 vColor;

out vec4 outColor;

uniform sampler2D uTexture;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture(uTexture, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0

    outColor = texSample * vColor;
}
`,Vc=`precision lowp float;

in vec2 aPosition;
in vec2 aUV;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};


uniform mat3 transformMatrix;
uniform vec4 color;
uniform mat3 uTextureTransform;
uniform vec4 uSizeAnchor;

out vec2 vTextureCoord;
out vec4 vColor;

void main(void)
{
    vec2 modifiedPosition = (aPosition - uSizeAnchor.zw) * uSizeAnchor.xy;
  
    gl_Position = vec4((projectionMatrix * worldTransformMatrix * transformMatrix * vec3(modifiedPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureTransform * vec3(aUV, 1.0)).xy;

    vColor = color * worldAlpha;
}
`,Ds=`struct GlobalUniforms {
projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
};

struct LocalUniforms {
  transformMatrix:mat3x3<f32>,
  color:vec4<f32>,
};

struct TilingUniforms {
  uMapCoord:mat3x3<f32>,
  uClampFrame:vec4<f32>,
  uClampOffset:vec2<f32>,
  uTextureTransform:mat3x3<f32>,
  uSizeAnchor:vec4<f32>
};

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
@group(1) @binding(0) var<uniform> localUniforms: LocalUniforms;

@group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
@group(2) @binding(1) var uTexture: texture_2d<f32>;
@group(2) @binding(2) var uSampler: sampler;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };

  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aUV : vec2<f32>,
) -> VSOutput {

    var modifiedPosition = (aPosition - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
  
    var  mvpMatrix = globalUniforms.projectionMatrix * globalUniforms.worldTransformMatrix * localUniforms.transformMatrix;

    var  colorOut = localUniforms.color;

    colorOut.r *= colorOut.a;
    colorOut.g *= colorOut.a;
    colorOut.b *= colorOut.a;
    
  return VSOutput(
    vec4<f32>((mvpMatrix * vec3<f32>(modifiedPosition, 1.0)).xy, 0.0, 1.0),
    (tilingUniforms.uTextureTransform * vec3(aUV, 1.0)).xy,
    colorOut,
  );
};


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color:vec4<f32>,
) -> @location(0) vec4<f32> {

    var coord = uv + ceil(tilingUniforms.uClampOffset - uv);
    coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
    var unclamped = coord;
    coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

    var bias = 0.;

    if(unclamped.x == coord.x && unclamped.y == coord.y)
    {
      bias = -32.;
    } 
    

    var finalColor = textureSampleBias(uTexture, uSampler, coord, bias);
    
   return finalColor * color;

}`;class Yc extends Ee{constructor(e){const t=he.from({vertex:Vc,fragment:jc,name:"tiling-sprite"}),n=me.from({vertex:{source:Ds,entryPoint:"mainVertex"},fragment:{source:Ds,entryPoint:"mainFragment"}}),i=new J({uMapCoord:{value:new R,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new R,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,200,.5,.5]),type:"vec4<f32>"}});super({glProgram:t,gpuProgram:n,resources:{tilingUniforms:i,uTexture:e.texture.source,uSampler:e.texture.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.style)}}const Db=new $s;class zs{constructor(e){this._renderableHash=Object.create(null),this._gpuBatchedTilingSprite=Object.create(null),this._gpuTilingSprite=Object.create(null),this._renderer=e}validateRenderable(e){const t=e.view.texture.textureMatrix;let n=!1;const i=this._getRenderableData(e);return i.batched!==t.isSimple&&(i.batched=t.isSimple,n=!0),n}addRenderable(e,t){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:n}=this._getRenderableData(e);if(n){const i=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(i,t)}else{const i=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(i.meshRenderable,t)}}updateRenderable(e){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:t}=this._getRenderableData(e);if(t){const n=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(n)}else{const n=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(n.meshRenderable)}}destroyRenderable(e){this._renderableHash[e.uid]=null,this._gpuTilingSprite[e.uid]=null,this._gpuBatchedTilingSprite[e.uid]=null}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t={batched:!0};return this._renderableHash[e.uid]=t,this.validateRenderable(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}_rebuild(e){const t=this._getRenderableData(e),n=e.view,i=n.texture.textureMatrix;if(t.batched){const s=this._getBatchedTilingSprite(e);s.view.texture=n.texture,n.texture.style.addressMode="repeat",n.texture.style.update(),this._updateBatchPositions(e),this._updateBatchUvs(e)}else{const s=this._getGpuTilingSprite(e),{meshRenderable:o}=s,a=o.view;a.shader.texture=n.texture;const l=a.shader.resources.tilingUniforms,u=n.width,h=n.height,c=n.texture.width,p=n.texture.height,d=n._tileTransform.matrix,f=l.uniforms.uTextureTransform;f.set(d.a*c/u,d.b*c/h,d.c*p/u,d.d*p/h,d.tx/u,d.ty/h),f.invert(),l.uniforms.uMapCoord=i.mapCoord,l.uniforms.uClampFrame=i.uClampFrame,l.uniforms.uClampOffset=i.uClampOffset,l.uniforms.uTextureTransform=f,l.uniforms.uSizeAnchor[0]=u,l.uniforms.uSizeAnchor[1]=h,l.uniforms.uSizeAnchor[2]=e.view.anchor.x,l.uniforms.uSizeAnchor[3]=e.view.anchor.y,l.update()}}_getGpuTilingSprite(e){return this._gpuTilingSprite[e.uid]||this._initGpuTilingSprite(e)}_initGpuTilingSprite(e){const t=e.view;t.texture.style.addressMode="repeat",t.texture.style.update();const n=new rr({geometry:Db,shader:new Yc({texture:t.texture})}),i=new pn({original:e,view:n}),s=new R,o={meshRenderable:i,textureMatrix:s};return this._gpuTilingSprite[e.uid]=o,o}_getBatchedTilingSprite(e){return this._gpuBatchedTilingSprite[e.uid]||this._initBatchedTilingSprite(e)}_initBatchedTilingSprite(e){const t=new rr({geometry:new $s,texture:e.view.texture}),n=new pn({original:e,view:t});return this._gpuBatchedTilingSprite[e.uid]=n,n}_updateBatchPositions(e){const t=this._getBatchedTilingSprite(e),n=e.view,i=t.view.geometry.getBuffer("aPosition").data,s=n.anchor.x,o=n.anchor.y;i[0]=-s*n.width,i[1]=-o*n.height,i[2]=(1-s)*n.width,i[3]=-o*n.height,i[4]=(1-s)*n.width,i[5]=(1-o)*n.height,i[6]=-s*n.width,i[7]=(1-o)*n.height}_updateBatchUvs(e){const t=e.view,n=t.texture.frameWidth,i=t.texture.frameHeight,s=this._getBatchedTilingSprite(e).view.geometry.getBuffer("aUV").data;let o=0,a=0;t._applyAnchorToTexture&&(o=t.anchor.x,a=t.anchor.y),s[0]=s[6]=-o,s[2]=s[4]=1-o,s[1]=s[3]=-a,s[5]=s[7]=1-a;const l=R.shared;l.copyFrom(t._tileTransform.matrix),l.tx/=t.width,l.ty/=t.height,l.invert(),l.scale(t.width/n,t.height/i),Xc(s,2,0,l)}destroy(){this._renderableHash=null,this._gpuTilingSprite=null,this._gpuBatchedTilingSprite=null,this._renderer=null}}zs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"tilingSprite"};function Xc(r,e,t,n){let i=0;const s=r.length/(e||2),o=n.a,a=n.b,l=n.c,u=n.d,h=n.tx,c=n.ty;for(t*=e;i<s;){const p=r[t],d=r[t+1];r[t]=o*p+l*d+h,r[t+1]=a*p+u*d+c,t+=e,i++}}function Ns(r,e){const t=r.instructionSet,n=t.instructions;for(let i=0;i<t.instructionSize;i++){const s=n[i];e[s.type].execute(s)}}class Ws{constructor(e){this._renderer=e}addLayerGroup(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({projectionMatrix:this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:e.worldTransform,worldColor:e.worldColor}),Ns(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}}Ws.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"layer"};function Hs(r,e=[]){e.push(r);for(let t=0;t<r.layerGroupChildren.length;t++)Hs(r.layerGroupChildren[t],e);return e}const zb=new Y;function js(r,e=!1){qc(r);const t=r.childrenToUpdate,n=r.updateTick;r.updateTick++;for(const i in t){const s=t[i],o=s.list,a=s.index;for(let l=0;l<a;l++)Vs(o[l],n,0);s.index=0}if(e)for(let i=0;i<r.layerGroupChildren.length;i++)js(r.layerGroupChildren[i],e)}function qc(r){r.layerGroupParent?(r.worldTransform.appendFrom(r.root.layerTransform,r.layerGroupParent.worldTransform),r.worldColor=Zr(r.root.layerColor,r.layerGroupParent.worldColor)):(r.worldTransform.copyFrom(r.root.layerTransform),r.worldColor=r.root.localColor)}function Vs(r,e,t){if(e===r.updateTick)return;r.updateTick=e,r.didChange=!1;const n=r.localTransform;ke(n,r);const i=r.parent;if(i&&!i.isLayerRoot?(t=t|r._updateFlags,r.layerTransform.appendFrom(n,i.layerTransform),t&&Kc(r,i,t)):(t=r._updateFlags,r.layerTransform.copyFrom(n),t&&Kc(r,zb,t)),!r.isLayerRoot){const s=r.children,o=s.length;for(let l=0;l<o;l++)Vs(s[l],e,t);const a=r.layerGroup;r.view&&!a.structureDidChange&&a.updateRenderable(r)}}function Kc(r,e,t){t&$r&&(r.layerColor=Zr(r.localColor,e.layerColor)),t&li&&(r.layerBlendMode=r.localBlendMode==="inherit"?e.layerBlendMode:r.localBlendMode),t&Dr&&(r.layerVisibleRenderable=r.localVisibleRenderable&e.layerVisibleRenderable),r._updateFlags=0}function Zc(r,e){const{list:t,index:n}=r.childrenRenderablesToUpdate;let i=!1;for(let s=0;s<n;s++){const o=t[s],a=o.view;if(i=e[a.renderPipeId].validateRenderable(o),i)break}return r.structureDidChange=i,i&&(r.childrenRenderablesToUpdate.index=0),i}class Ys{constructor(e){this._renderer=e}render({container:e,transform:t}){e.layer=!0;const n=this._renderer,i=Hs(e.layerGroup,[]),s=n.renderPipes;for(let o=0;o<i.length;o++){const a=i[o];a.runOnRender(),a.instructionSet.renderPipes=s,a.structureDidChange||Zc(a,s),js(a),a.structureDidChange?(a.structureDidChange=!1,tc(a,s)):Nb(a),n.renderPipes.batch.upload()}t&&e.layerGroup.worldTransform.copyFrom(t),n.globalUniforms.start({projectionMatrix:n.renderTarget.rootProjectionMatrix,worldTransformMatrix:e.layerGroup.worldTransform}),Ns(e.layerGroup,s),s.uniformBatch&&(s.uniformBatch.renderEnd(),s.uniformBuffer.renderEnd())}destroy(){}}Ys.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"layer"};function Nb(r){const{list:e,index:t}=r.childrenRenderablesToUpdate;for(let n=0;n<t;n++){const i=e[n];i.didViewUpdate&&r.updateRenderable(i)}r.childrenRenderablesToUpdate.index=0}class fn{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null}get blendMode(){return this.sprite.layerBlendMode}packAttributes(e,t,n,i){const s=this.sprite,o=this.texture,a=s.layerTransform,l=a.a,u=a.b,h=a.c,c=a.d,p=a.tx,d=a.ty,f=this.bounds,g=f[0],m=f[1],y=f[2],v=f[3],b=o._layout.uvs,_=s.layerColor;e[n++]=l*m+h*v+p,e[n++]=c*v+u*m+d,e[n++]=b.x0,e[n++]=b.y0,t[n++]=_,e[n++]=i,e[n++]=l*g+h*v+p,e[n++]=c*v+u*g+d,e[n++]=b.x1,e[n++]=b.y1,t[n++]=_,e[n++]=i,e[n++]=l*g+h*y+p,e[n++]=c*y+u*g+d,e[n++]=b.x2,e[n++]=b.y2,t[n++]=_,e[n++]=i,e[n++]=l*m+h*y+p,e[n++]=c*y+u*m+d,e[n++]=b.x3,e[n++]=b.y3,t[n++]=_,e[n++]=i}packIndex(e,t,n){e[t++]=n+0,e[t++]=n+1,e[t++]=n+2,e[t++]=n+0,e[t++]=n+2,e[t++]=n+3}reset(){this.sprite=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}let Pt;class Xs{constructor(e){this._gpuSpriteHash=Object.create(null),this._renderer=e,Pt=this._gpuSpriteHash}addRenderable(e,t){const n=this._getGpuSprite(e);e.view._didUpdate&&this._updateBatchableSprite(e,n),this._renderer.renderPipes.batch.addToBatch(n)}updateRenderable(e){const t=Pt[e.uid];e.view._didUpdate&&this._updateBatchableSprite(e,t),t.batcher.updateElement(t)}validateRenderable(e){const t=e.view._texture,n=this._getGpuSprite(e);return n.texture._source!==t._source?!n.batcher.checkAndUpdateTexture(n,t):!1}destroyRenderable(e){const t=Pt[e.uid];W.return(t),Pt[e.uid]=null}_updateBatchableSprite(e,t){const n=e.view;n._didUpdate=!1,t.bounds=n.bounds,t.texture=n._texture}_getGpuSprite(e){return Pt[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=W.get(fn);return t.sprite=e,t.texture=e.view._texture,t.bounds=e.view.bounds,Pt[e.uid]=t,e.view._didUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuSpriteHash)W.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}}Xs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"sprite"};var Qc=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;

uniform sampler2D uSamplers[%count%];
uniform float distance;

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%


    // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.
   outColor.rgb = outColor.rgb / outColor.a;

    // MSDF
    float median = outColor.r + outColor.g + outColor.b -
                    min(outColor.r, min(outColor.g, outColor.b)) -
                    max(outColor.r, max(outColor.g, outColor.b));
   
    // SDF
    median = min(median, outColor.a);

    float screenPxDistance = distance * (median - 0.5);
    float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
    if (median < 0.01) {
        alpha = 0.0;
    } else if (median > 0.99) {
        alpha = 1.0;
    }

    finalColor =  vec4(vColor.rgb * alpha, alpha);
}
`,Jc=`in vec2 aPosition;
in vec2 aUV;
in vec4 aColor;
in float aTextureId;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

uniform mat3 transformMatrix;
uniform vec4 color;

out vec2 vTextureCoord;
out vec4 vColor;
out float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * worldTransformMatrix * transformMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aUV;
    vTextureId = aTextureId;

    vColor = vec4(aColor.rgb * aColor.a, aColor.a)  * worldAlpha;
}
`;function ed(r){return jr({vertexSrc:Jc,fragmentSrc:Qc,maxTextures:r,name:"sdf"})}var qs=`struct GlobalUniforms {
  projectionMatrix:mat3x3<f32>,
  worldTransformMatrix:mat3x3<f32>,
  worldAlpha: f32
}

struct LocalUniforms {
  color:vec4<f32>,
  transformMatrix:mat3x3<f32>,
  distance: f32
}

// struct DistanceUniforms {
//   distance: f32,
// }

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
%bindings%
@group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
//@group(3) @binding(0) var<uniform> distanceUniforms : DistanceUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
    @location(2) @interpolate(flat) textureId : u32,
  };

  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
  @location(1) aUV : vec2<f32>,
  @location(2) aColor : vec4<f32>,
  @location(3) aTexture : f32,
) -> VSOutput {

  var  mvpMatrix = globalUniforms.projectionMatrix * globalUniforms.worldTransformMatrix * localUniforms.transformMatrix;

  var  colorOut = aColor.bgra * localUniforms.color.rgba;

  var alpha = vec4<f32>(
    colorOut.a * globalUniforms.worldAlpha,
    colorOut.a * globalUniforms.worldAlpha,
    colorOut.a * globalUniforms.worldAlpha,
    globalUniforms.worldAlpha
  );

  colorOut *= alpha;


  return VSOutput(
    vec4<f32>((mvpMatrix * vec3<f32>(aPosition, 1.0)).xy, 0.0, 1.0),
    aUV,
    colorOut,
    u32(aTexture)
  );
};


@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color:vec4<f32>,
  @location(2) @interpolate(flat) textureId: u32,
) -> @location(0) vec4<f32> {


    var uvDx = dpdx(uv);
    var uvDy = dpdy(uv);

    var outColor:vec4<f32>;
    
    %forloop%
  
    var dist = outColor.r;

    // MSDF
  var median = outColor.r + outColor.g + outColor.b -
      min(outColor.r, min(outColor.g, outColor.b)) -
      max(outColor.r, max(outColor.g, outColor.b));
  // SDF
  median = min(median, outColor.a);

  // on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange
  
  var screenPxDistance = localUniforms.distance * (median - 0.5);
  var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
  if (median < 0.01) {
    alpha = 0.0;
  } else if (median > 0.99) {
    alpha = 1.0;
  }

  return vec4(color.rgb * alpha, alpha);
};
`;function td(r){return Yr({vertex:{source:qs,entryPoint:"mainVertex"},fragment:{source:qs,entryPoint:"mainFragment"},maxTextures:r})}class rd extends Ee{constructor(){const e=new J({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new R,type:"mat3x3<f32>"},distance:{value:4,type:"f32"}});super({glProgram:ed(ge),gpuProgram:td(ge),resources:{localUniforms:e,batchSamplers:Vr}})}}const nd=["_fontFamily","_fontStyle","_fontVariant","_fontWeight","_breakWords","_align","_leading","_letterSpacing","_lineHeight","_textBaseline","_whiteSpace","_wordWrap","_wordWrapWidth","_padding","_cssOverrides"];function Ks(r){const e=[];let t=0;for(let n=0;n<nd.length;n++){const i=nd[n];e[t++]=r[i]}return t=id(r._fill,e,t),t=Wb(r._stroke,e,t),e.join("-")}function id(r,e,t){var n;return r&&(e[t++]=r.color,e[t++]=r.alpha,e[t++]=(n=r.fill)==null?void 0:n.uid),t}function Wb(r,e,t){return r&&(t=id(r,e,t),e[t++]=r.width,e[t++]=r.alignment,e[t++]=r.cap,e[t++]=r.join,e[t++]=r.miterLimit),t}var Hb=Object.defineProperty,sd=Object.getOwnPropertySymbols,jb=Object.prototype.hasOwnProperty,Vb=Object.prototype.propertyIsEnumerable,od=(r,e,t)=>e in r?Hb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,mr=(r,e)=>{for(var t in e||(e={}))jb.call(e,t)&&od(r,t,e[t]);if(sd)for(var t of sd(e))Vb.call(e,t)&&od(r,t,e[t]);return r};const At=class extends oe{constructor(r={}){super(),Yb(r);const e=mr(mr({},At.defaultTextStyle),r);for(const t in At.defaultTextStyle){const n=t;this[n]=e[t]}this.dropShadow=null,typeof e.fill=="string"?this.fontSize=parseInt(e.fontSize,10):this.fontSize=e.fontSize,r.dropShadow&&(r.dropShadow instanceof Boolean?r.dropShadow===!0&&(this.dropShadow=mr({},At.defaultTextStyle.dropShadow)):this.dropShadow=mr(mr({},At.defaultTextStyle.dropShadow),r.dropShadow)),this.update()}get align(){return this._align}set align(r){this._align=r,this.update()}get breakWords(){return this._breakWords}set breakWords(r){this._breakWords=r,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(r){this._dropShadow=r,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(r){this._fontFamily=r,this.update()}get fontSize(){return this._fontSize}set fontSize(r){this._fontSize=r,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(r){this._fontStyle=r,this.update()}get fontVariant(){return this._fontVariant}set fontVariant(r){this._fontVariant=r,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(r){this._fontWeight=r,this.update()}get leading(){return this._leading}set leading(r){this._leading=r,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(r){this._letterSpacing=r,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(r){this._lineHeight=r,this.update()}get padding(){return this._padding}set padding(r){this._padding=r,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(r){this._textBaseline=r,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(r){this._whiteSpace=r,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(r){this._wordWrap=r,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(r){this._wordWrapWidth=r,this.update()}get fill(){return this._originalFill}set fill(r){r!==this._originalFill&&(this._originalFill=r,this._fill=Lt(r,$e.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(r){r!==this._originalFill&&(this._originalFill=r,this._stroke=Lt(r,$e.defaultStrokeStyle),this.update())}_generateKey(){return this._styleKey=Ks(this),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}get styleKey(){return this._styleKey||this._generateKey()}clone(){return new At({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(r=!1){var e,t,n,i;if(this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const s=typeof r=="boolean"?r:r==null?void 0:r.textureSource;(e=this._fill)!=null&&e.texture&&this._fill.texture.destroy(s),(t=this._originalFill)!=null&&t.texture&&this._originalFill.texture.destroy(s),(n=this._stroke)!=null&&n.texture&&this._stroke.texture.destroy(s),(i=this._originalStroke)!=null&&i.texture&&this._originalStroke.texture.destroy(s)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}};let ut=At;ut.defaultTextStyle={align:"left",breakWords:!1,dropShadow:{alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5},fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};function Yb(r){var e,t;const n=r;if(typeof n.dropShadow=="boolean"&&(U(N,"dropShadow is now an object, not a boolean"),r.dropShadow={alpha:(e=n.dropShadowAlpha)!=null?e:1,angle:n.dropShadowAngle,blur:(t=n.dropShadowBlur)!=null?t:0,color:n.dropShadowColor,distance:n.dropShadowDistance}),n.strokeThickness){U(N,"strokeThickness is now a part of stroke");const i=n.stroke;r.stroke={color:i,width:n.strokeThickness}}if(Array.isArray(n.fill)){U(N,"gradient fill is now a fill pattern: `new FillGradient(...)`");const i=new Je(0,0,0,r.fontSize*1.7),s=n.fill.map(fe);s.forEach((o,a)=>{var l;const u=(l=n.fillGradientStops[a])!=null?l:a/s.length;i.addColorStop(u,o)}),r.fill={fill:i}}}function mn(r,e=[]){return e[0]=(r>>16&255)/255,e[1]=(r>>8&255)/255,e[2]=(r&255)/255,e}function Zs(r){let e=r.toString(16);return e="000000".substring(0,6-e.length)+e,`#${e}`}function Xb(r){return typeof r=="string"&&r[0]==="#"&&(r=r.slice(1)),parseInt(r,16)}function ad(r){return(r[0]*255<<16)+(r[1]*255<<8)+(r[2]*255|0)}class ld{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,t){const n=I.ADAPTER.createCanvas();n.width=e,n.height=t;const i=n.getContext("2d");return{canvas:n,context:i}}getOptimalCanvasAndContext(e,t,n=1){e=Math.ceil(e*n-1e-6),t=Math.ceil(t*n-1e-6),e=st(e),t=st(t);const i=(e<<17)+(t<<1);this._canvasPool[i]||(this._canvasPool[i]=[]);let s=this._canvasPool[i].pop();return s||(s=this._createCanvasAndContext(e,t)),s}returnCanvasAndContext(e){const{width:t,height:n}=e.canvas,i=(t<<17)+(n<<1);this._canvasPool[i].push(e)}clear(){this._canvasPool={}}}const Ue=new ld;var ht=(r=>(r[r.NPM=0]="NPM",r[r.UNPACK=1]="UNPACK",r[r.PMA=2]="PMA",r[r.NO_PREMULTIPLIED_ALPHA=0]="NO_PREMULTIPLIED_ALPHA",r[r.PREMULTIPLY_ON_UPLOAD=1]="PREMULTIPLY_ON_UPLOAD",r[r.PREMULTIPLIED_ALPHA=2]="PREMULTIPLIED_ALPHA",r))(ht||{}),ud=(r=>(r[r.NONE=0]="NONE",r[r.LOW=2]="LOW",r[r.MEDIUM=4]="MEDIUM",r[r.HIGH=8]="HIGH",r))(ud||{}),Qs=(r=>(r.CLAMP="clamp-to-edge",r.REPEAT="repeat",r.MIRRORED_REPEAT="mirror-repeat",r))(Qs||{});const qb=new Proxy(Qs,{get(r,e){return U(N,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}});var Js=(r=>(r.NEAREST="nearest",r.LINEAR="linear",r))(Js||{});const Kb=new Proxy(Js,{get(r,e){return U(N,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}}),Zb=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function gr(r){const e=typeof r.fontSize=="number"?`${r.fontSize}px`:r.fontSize;let t=r.fontFamily;Array.isArray(r.fontFamily)||(t=r.fontFamily.split(","));for(let n=t.length-1;n>=0;n--){let i=t[n].trim();!/([\"\'])[^\'\"]+\1/.test(i)&&!Zb.includes(i)&&(i=`"${i}"`),t[n]=i}return`${r.fontStyle} ${r.fontVariant} ${r.fontWeight} ${e} ${t.join(",")}`}const eo={willReadFrequently:!0},M=class{static get experimentalLetterSpacingSupported(){let r=M._experimentalLetterSpacingSupported;if(r!==void 0){const e=I.ADAPTER.getCanvasRenderingContext2D().prototype;r=M._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return r}constructor(r,e,t,n,i,s,o,a,l){this.text=r,this.style=e,this.width=t,this.height=n,this.lines=i,this.lineWidths=s,this.lineHeight=o,this.maxLineWidth=a,this.fontProperties=l}static measureText(r=" ",e,t=M._canvas,n=e.wordWrap){var i;const s=`${r}:${e.styleKey}`;if(M._measurementCache[s])return M._measurementCache[s];const o=gr(e),a=M.measureFont(o);a.fontSize===0&&(a.fontSize=e.fontSize,a.ascent=e.fontSize);const l=M.__context;l.font=o;const u=(n?M._wordWrap(r,e,t):r).split(/(?:\r\n|\r|\n)/),h=new Array(u.length);let c=0;for(let m=0;m<u.length;m++){const y=M._measureText(u[m],e.letterSpacing,l);h[m]=y,c=Math.max(c,y)}const p=((i=e._stroke)==null?void 0:i.width)||0;let d=c+p;e.dropShadow&&(d+=e.dropShadow.distance);const f=e.lineHeight||a.fontSize+p;let g=Math.max(f,a.fontSize+p*2)+(u.length-1)*(f+e.leading);return e.dropShadow&&(g+=e.dropShadow.distance),new M(r,e,d,g,u,h,f+e.leading,c,a)}static _measureText(r,e,t){let n=!1;M.experimentalLetterSpacingSupported&&(M.experimentalLetterSpacing?(t.letterSpacing=`${e}px`,t.textLetterSpacing=`${e}px`,n=!0):(t.letterSpacing="0px",t.textLetterSpacing="0px"));let i=t.measureText(r).width;return i>0&&(n?i-=e:i+=(M.graphemeSegmenter(r).length-1)*e),i}static _wordWrap(r,e,t=M._canvas){const n=t.getContext("2d",eo);let i=0,s="",o="";const a=Object.create(null),{letterSpacing:l,whiteSpace:u}=e,h=M._collapseSpaces(u),c=M._collapseNewlines(u);let p=!h;const d=e.wordWrapWidth+l,f=M._tokenize(r);for(let g=0;g<f.length;g++){let m=f[g];if(M._isNewline(m)){if(!c){o+=M._addLine(s),p=!h,s="",i=0;continue}m=" "}if(h){const v=M.isBreakingSpace(m),b=M.isBreakingSpace(s[s.length-1]);if(v&&b)continue}const y=M._getFromCache(m,l,a,n);if(y>d)if(s!==""&&(o+=M._addLine(s),s="",i=0),M.canBreakWords(m,e.breakWords)){const v=M.wordWrapSplit(m);for(let b=0;b<v.length;b++){let _=v[b],S=_,k=1;for(;v[b+k];){const P=v[b+k];if(!M.canBreakChars(S,P,m,b,e.breakWords))_+=P;else break;S=P,k++}b+=k-1;const C=M._getFromCache(_,l,a,n);C+i>d&&(o+=M._addLine(s),p=!1,s="",i=0),s+=_,i+=C}}else{s.length>0&&(o+=M._addLine(s),s="",i=0);const v=g===f.length-1;o+=M._addLine(m,!v),p=!1,s="",i=0}else y+i>d&&(p=!1,o+=M._addLine(s),s="",i=0),(s.length>0||!M.isBreakingSpace(m)||p)&&(s+=m,i+=y)}return o+=M._addLine(s,!1),o}static _addLine(r,e=!0){return r=M._trimRight(r),r=e?`${r}
`:r,r}static _getFromCache(r,e,t,n){let i=t[r];return typeof i!="number"&&(i=M._measureText(r,e,n)+e,t[r]=i),i}static _collapseSpaces(r){return r==="normal"||r==="pre-line"}static _collapseNewlines(r){return r==="normal"}static _trimRight(r){if(typeof r!="string")return"";for(let e=r.length-1;e>=0;e--){const t=r[e];if(!M.isBreakingSpace(t))break;r=r.slice(0,-1)}return r}static _isNewline(r){return typeof r!="string"?!1:M._newlines.includes(r.charCodeAt(0))}static isBreakingSpace(r,e){return typeof r!="string"?!1:M._breakingSpaces.includes(r.charCodeAt(0))}static _tokenize(r){const e=[];let t="";if(typeof r!="string")return e;for(let n=0;n<r.length;n++){const i=r[n],s=r[n+1];if(M.isBreakingSpace(i,s)||M._isNewline(i)){t!==""&&(e.push(t),t=""),e.push(i);continue}t+=i}return t!==""&&e.push(t),e}static canBreakWords(r,e){return e}static canBreakChars(r,e,t,n,i){return!0}static wordWrapSplit(r){return M.graphemeSegmenter(r)}static measureFont(r){if(M._fonts[r])return M._fonts[r];const e=M._context;e.font=r;const t=e.measureText(M.METRICS_STRING+M.BASELINE_SYMBOL),n={ascent:t.actualBoundingBoxAscent,descent:t.actualBoundingBoxDescent,fontSize:t.actualBoundingBoxAscent+t.actualBoundingBoxDescent};return M._fonts[r]=n,n}static clearMetrics(r=""){r?delete M._fonts[r]:M._fonts={}}static get _canvas(){if(!M.__canvas){let r;try{const e=new OffscreenCanvas(0,0),t=e.getContext("2d",eo);if(t!=null&&t.measureText)return M.__canvas=e,e;r=I.ADAPTER.createCanvas()}catch(e){r=I.ADAPTER.createCanvas()}r.width=r.height=10,M.__canvas=r}return M.__canvas}static get _context(){return M.__context||(M.__context=M._canvas.getContext("2d",eo)),M.__context}};let te=M;te.METRICS_STRING="|\xC9q\xC5",te.BASELINE_SYMBOL="M",te.BASELINE_MULTIPLIER=1.4,te.HEIGHT_MULTIPLIER=2,te.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const r=new Intl.Segmenter;return e=>[...r.segment(e)].map(t=>t.segment)}return r=>[...r]})(),te.experimentalLetterSpacing=!1,te._fonts={},te._newlines=[10,13],te._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],te._measurementCache={};function vr(r,e){if(r.texture===A.WHITE&&!r.fill)return kr(r.color);if(r.fill){if(r.fill instanceof Fr){const t=r.fill,n=e.createPattern(t.texture.source.resource,"repeat"),i=t.transform.copyTo(R.shared);return i.scale(t.texture.frameWidth,t.texture.frameHeight),n.setTransform(i),n}else if(r.fill instanceof Je){const t=r.fill;if(t.type==="linear"){const n=e.createLinearGradient(t.x0,t.y0,t.x1,t.y1);return t.gradientStops.forEach(i=>{n.addColorStop(i.offset,kr(i.color))}),n}}}else{const t=e.createPattern(r.texture.source.resource,"repeat"),n=r.matrix.copyTo(R.shared);return n.scale(r.texture.frameWidth,r.texture.frameHeight),t.setTransform(n),t}return console.warn("[PixiJS] FillStyle not recognised",r),"red"}function to(r){typeof r=="string"&&(r=[r]);const e=[];for(let t=0,n=r.length;t<n;t++){const i=r[t];if(Array.isArray(i)){if(i.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);const s=i[0].charCodeAt(0),o=i[1].charCodeAt(0);if(o<s)throw new Error("[BitmapFont]: Invalid character range.");for(let a=s,l=o;a<=l;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(i))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}class ro extends Ln{constructor(e){var t,n,i;super(),this.resolution=1,this.pages=[],this._padding=4,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentPageIndex=-1,this._skipKerning=!1;const s=e,o=s.style.clone();o.fontSize=this.baseMeasurementFontSize,s.overrideFill&&(o._fill.color=16777215,o._fill.alpha=1,o._fill.texture=A.WHITE,o._fill.fill=null),this._style=o,this._skipKerning=(t=s.skipKerning)!=null?t:!1,this.resolution=(n=s.resolution)!=null?n:1,this._padding=(i=s.padding)!=null?i:4;const a=gr(o),l=this;l.fontMetrics=te.measureFont(a),l.lineHeight=o.lineHeight||this.fontMetrics.fontSize||o.fontSize}ensureCharacters(e){var t,n,i,s;const o=to(e).filter(b=>!this._currentChars.includes(b)).filter((b,_,S)=>S.indexOf(b)===_);if(!o.length)return;this._currentChars=[...this._currentChars,...o];let a;this._currentPageIndex===-1?a=this._nextPage():a=this.pages[this._currentPageIndex];let{canvas:l,context:u}=a.canvasAndContext,h=a.texture.source;const c=this._style;let p=this._currentX,d=this._currentY;const f=this.baseRenderedFontSize/this.baseMeasurementFontSize,g=this._padding*f,m=c.fontStyle==="italic"?2:1;let y=0,v=!1;for(let b=0;b<o.length;b++){const _=o[b],S=te.measureText(_,c,l,!1),k=m*S.width*f,C=S.height*f,P=k+g*2,w=C+g*2;if(v=!1,_!==`
`&&_!=="\r"&&_!=="	"&&_!==" "&&(v=!0,y=Math.ceil(Math.max(w,y))),p+P>512&&(d+=y,y=w,p=0,d+y>512)){h.update();const D=this._nextPage();l=D.canvasAndContext.canvas,u=D.canvasAndContext.context,h=D.texture.source,d=0}const T=k/f-((n=(t=c.dropShadow)==null?void 0:t.distance)!=null?n:0)-((s=(i=c._stroke)==null?void 0:i.width)!=null?s:0);if(this.chars[_]={id:_.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:T,kerning:{}},v){this._drawGlyph(u,S,p+g,d+g,f,c);const D=h.width*f,L=h.height*f,B=new X(p/D,d/L,P/D,w/L);this.chars[_].texture=new A({source:h,layout:{frame:B}}),p+=Math.ceil(P)}}h.update(),this._currentX=p,this._currentY=d,this._skipKerning&&this._applyKerning(o,u)}get pageTextures(){return U(N,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,t){const n=this._measureCache;for(let i=0;i<e.length;i++){const s=e[i];for(let o=0;o<this._currentChars.length;o++){const a=this._currentChars[o];let l=n[s];l||(l=n[s]=t.measureText(s).width);let u=n[a];u||(u=n[a]=t.measureText(a).width);let h=t.measureText(s+a).width,c=h-(l+u);c&&(this.chars[s].kerning[a]=c),h=t.measureText(s+a).width,c=h-(l+u),c&&(this.chars[a].kerning[s]=c)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,t=Ue.getOptimalCanvasAndContext(512,512,e);this._setupContext(t.context,this._style,e);const n=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),i=new A({source:new It({resource:t.canvas,resolution:n,alphaMode:ht.PMA})}),s={canvasAndContext:t,texture:i};return this.pages[this._currentPageIndex]=s,s}_setupContext(e,t,n){var i;t.fontSize=this.baseRenderedFontSize,e.scale(n,n),e.font=gr(t),t.fontSize=this.baseMeasurementFontSize,e.textBaseline=t.textBaseline;const s=t._stroke,o=(i=s==null?void 0:s.width)!=null?i:0;if(s&&(e.lineWidth=o,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=vr(s,e)),t._fill&&(e.fillStyle=vr(t._fill,e)),t.dropShadow){const a=t.dropShadow,l=fe(a.color),u=mn(l),h=a.blur*n,c=a.distance*n;e.shadowColor=`rgba(${u[0]*255},${u[1]*255},${u[2]*255},${a.alpha})`,e.shadowBlur=h,e.shadowOffsetX=Math.cos(a.angle)*c,e.shadowOffsetY=Math.sin(a.angle)*c}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,t,n,i,s,o){var a;const l=t.text,u=t.fontProperties,h=o._stroke,c=((a=h==null?void 0:h.width)!=null?a:0)*s,p=n+c/2,d=i-c/2,f=u.descent*s,g=t.lineHeight*s;o.stroke&&c&&e.strokeText(l,p,d+g-f),o._fill&&e.fillText(l,p,d+g-f)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:t,texture:n}=this.pages[e];Ue.returnCanvasAndContext(t),n.destroy(!0)}this.pages=null}}function no(r,e,t){const n={width:0,height:0,offsetY:0,scale:e.fontSize/t.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};n.offsetY=t.baseLineOffset;let i=n.lines[0],s=null,o=!0;const a={spaceWord:!1,width:0,start:0,index:0,positions:[],chars:[]},l=d=>{const f=i.width;for(let g=0;g<a.index;g++){const m=d.positions[g];i.chars.push(d.chars[g]),i.charPositions.push(m+f)}i.width+=d.width,o=!1,a.width=0,a.index=0,a.chars.length=0},u=()=>{let d=i.chars.length-1,f=i.chars[d];for(;f===" ";)i.width-=t.chars[f].xAdvance,f=i.chars[--d];n.width=Math.max(n.width,i.width),i={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},o=!0,n.lines.push(i),n.height+=t.lineHeight},h=t.baseMeasurementFontSize/e.fontSize,c=e.letterSpacing*h,p=e.wordWrapWidth*h;for(let d=0;d<r.length+1;d++){let f;const g=d===r.length;g||(f=r[d]);const m=t.chars[f];if(/(?:\s)/.test(f)||f==="\r"||f===`
`||g){if(!o&&e.wordWrap&&i.width+a.width-c>p?(u(),l(a),g||i.charPositions.push(0)):(a.start=i.width,l(a),g||i.charPositions.push(0)),f==="\r"||f===`
`)i.width!==0&&u();else if(!g){const y=m.xAdvance+(m.kerning[s]||0)+c;i.width+=y,i.spaceWidth=y,i.spacesIndex.push(i.charPositions.length),i.chars.push(f)}}else{const y=m.kerning[s]||0,v=m.xAdvance+y+c;a.positions[a.index++]=a.width+y,a.chars.push(f),a.width+=v}s=f}return u(),e.align==="center"?Qb(n):e.align==="right"?Jb(n):e.align==="justify"&&ey(n),n}function Qb(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],n=r.width/2-t.width/2;for(let i=0;i<t.charPositions.length;i++)t.charPositions[i]+=n}}function Jb(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],n=r.width-t.width;for(let i=0;i<t.charPositions.length;i++)t.charPositions[i]+=n}}function ey(r){const e=r.width;for(let t=0;t<r.lines.length;t++){const n=r.lines[t];let i=0,s=n.spacesIndex[i++],o=0;const a=n.spacesIndex.length,l=(e-n.width)/a;for(let u=0;u<n.charPositions.length;u++)u===s&&(s=n.spacesIndex[i++],o+=l),n.charPositions[u]+=o}}var ty=Object.defineProperty,hd=Object.getOwnPropertySymbols,ry=Object.prototype.hasOwnProperty,ny=Object.prototype.propertyIsEnumerable,cd=(r,e,t)=>e in r?ty(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,io=(r,e)=>{for(var t in e||(e={}))ry.call(e,t)&&cd(r,t,e[t]);if(hd)for(var t of hd(e))ny.call(e,t)&&cd(r,t,e[t]);return r};class iy{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1}}getFont(e,t){var n;let i=t.fontFamily,s=!0;t._fill.fill&&(i+=t._fill.fill.uid,s=!1),ee.has(i)||ee.set(i,new ro(io({style:t,overrideFill:s},this.defaultOptions)));const o=ee.get(i);return(n=o.ensureCharacters)==null||n.call(o,e),o}getLayout(e,t){const n=this.getFont(e,t);return no(e.split(""),t,n)}measureText(e,t){return this.getLayout(e,t)}install(e,t,n){if(!e)throw new Error("[BitmapFontManager] Property `name` is required.");n=io(io({},this.defaultOptions),n);const i=t instanceof ut?t:new ut(t),s=i._fill.fill!==null&&i._fill.fill!==void 0,o=new ro({style:i,overrideFill:s,skipKerning:n.skipKerning,padding:n.padding,resolution:n.resolution}),a=to(n.chars);return o.ensureCharacters(a.join("")),ee.set(e,o),o}}const so=new iy;class sy extends pn{constructor(){super({view:new is})}}class oo{constructor(e){this._gpuBitmapText={},this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,t.view.context)),this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const n=this._getGpuBitmapText(e);e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,n.view.context)),this._renderer.renderPipes.graphics.addRenderable(n,t),n.view.context.customShader&&this._updateDistanceField(e)}destroyRenderable(e){this._destroyRenderableByUid(e.uid)}_destroyRenderableByUid(e){W.return(this._gpuBitmapText[e]),this._gpuBitmapText[e]=null}updateRenderable(e){const t=this._getGpuBitmapText(e);this._renderer.renderPipes.graphics.updateRenderable(t),t.view.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){var n;const i=e.view,s=so.getFont(i.text,i._style);t.clear(),s.distanceField.type!=="none"&&(t.customShader||(this._sdfShader||(this._sdfShader=new rd),t.customShader=this._sdfShader));const o=Array.from(i.text),a=i._style;let l=(((n=a._stroke)==null?void 0:n.width)||0)/2;l+=s.baseLineOffset;const u=no(o,a,s);let h=0;const c=a.fontSize/s.baseMeasurementFontSize;t.scale(c,c);const p=-i.anchor.x*u.width,d=-i.anchor.y*u.height;t.translate(p,d);const f=a._fill.color;for(let g=0;g<u.lines.length;g++){const m=u.lines[g];for(let y=0;y<m.charPositions.length;y++){const v=o[h++],b=s.chars[v];b!=null&&b.texture&&t.texture(b.texture,f,Math.round(m.charPositions[y]+b.xOffset),Math.round(l+b.yOffset))}l+=s.lineHeight}}_getGpuBitmapText(e){return this._gpuBitmapText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t=W.get(sy,e);return this._gpuBitmapText[e.uid]=t,this._updateContext(e,t.view.context),e.on("destroyed",()=>{this.destroyRenderable(e)}),this._gpuBitmapText[e.uid]}_updateDistanceField(e){const t=this._getGpuBitmapText(e).view.context,n=e.view,i=n._style.fontFamily,s=ee.get(i),{a:o,b:a,c:l,d:u}=e.layerTransform,h=Math.sqrt(o*o+a*a),c=Math.sqrt(l*l+u*u),p=(Math.abs(h)+Math.abs(c))/2,d=s.baseRenderedFontSize/n._style.fontSize,f=1,g=p*s.distanceField.range*(1/d)*f;t.customShader.resources.localUniforms.uniforms.distance=g}destroy(){var e;for(const t in this._gpuBitmapText)this._destroyRenderableByUid(t);this._gpuBitmapText=null,(e=this._sdfShader)==null||e.destroy(!0),this._sdfShader=null,this._renderer=null}}oo.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"bitmapText"};class ao{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),n=e.view._getKey();if(t.currentKey!==n){const i=e.view,s=i._autoResolution?this._renderer.view.resolution:i._resolution,{width:o,height:a}=this._renderer.canvasText.getTextureSize(i.text,s,i._style);return!(this._renderer.canvasText.getReferenceCount(t.currentKey)===1&&o===t.texture._source.width&&a===t.texture._source.height)}return!1}addRenderable(e,t){const n=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(n)}updateRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.canvasText.decreaseReferenceCount(t.currentKey),W.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),n=this._getGpuText(e),i=n.batchableSprite;n.currentKey!==t&&this._updateGpuText(e),e.view._didUpdate=!1;const s=e.view._style.padding;Yt(i.bounds,e.view.anchor,i.texture,s)}_updateGpuText(e){const t=this._getGpuText(e),n=t.batchableSprite,i=e.view;t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey);const s=i._autoResolution?this._renderer.view.resolution:i._resolution;t.texture=n.texture=this._renderer.canvasText.getTexture(i.text,s,i._style,i._getKey()),t.currentKey=i._getKey(),n.texture=t.texture}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t={texture:null,currentKey:"--",batchableSprite:W.get(fn)};return t.batchableSprite.sprite=e,t.batchableSprite.bounds=[0,1,0,0],this._gpuText[e.uid]=t,this._updateText(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}ao.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"text"};const oy=new le;class lo{constructor(){this._activeTextures={}}getTextureSize(e,t,n){const i=te.measureText(e||" ",n);let s=Math.ceil(Math.ceil(Math.max(1,i.width)+n.padding*2)*t),o=Math.ceil(Math.ceil(Math.max(1,i.height)+n.padding*2)*t);return s=Math.ceil(s-1e-6),o=Math.ceil(o-1e-6),s=st(s),o=st(o),{width:s,height:o}}getTexture(e,t,n,i){if(this._activeTextures[i])return this._increaseReferenceCount(i),this._activeTextures[i].texture;const s=te.measureText(e||" ",n),o=Math.ceil(Math.ceil(Math.max(1,s.width)+n.padding*2)*t),a=Math.ceil(Math.ceil(Math.max(1,s.height)+n.padding*2)*t),l=Ue.getOptimalCanvasAndContext(o,a),{canvas:u}=l;this.renderTextToCanvas(e,n,t,l);const h=oy;h.minX=0,h.minY=0,h.maxX=u.width/t|0,h.maxY=u.height/t|0;const c=se.getOptimalTexture(h.width,h.height,t,!1);return c.source.type="image",c.source.resource=u,c.frameWidth=o,c.frameHeight=a,c.source.update(),c.layout.updateUvs(),this._activeTextures[i]={canvasAndContext:l,texture:c,usageCount:1},c}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(Ue.returnCanvasAndContext(t.canvasAndContext),se.returnTexture(t.texture),t.texture.source.resource=null,t.texture.source.type="unknown",this._activeTextures[e]=null)}getReferenceCount(e){return this._activeTextures[e].usageCount}renderTextToCanvas(e,t,n,i){var s,o,a,l,u,h;const{canvas:c,context:p}=i,d=gr(t),f=te.measureText(e||" ",t),g=f.lines,m=f.lineHeight,y=f.lineWidths,v=f.maxLineWidth,b=f.fontProperties,_=c.height;if(p.resetTransform(),p.scale(n,n),p.clearRect(0,0,f.width,f.height),(s=t._stroke)!=null&&s.width){const P=t._stroke;p.lineWidth=P.width,p.miterLimit=P.miterLimit,p.lineJoin=P.join,p.lineCap=P.cap}p.font=d;let S,k;const C=t.dropShadow?2:1;for(let P=0;P<C;++P){const w=t.dropShadow&&P===0,T=w?Math.ceil(Math.max(1,_)+t.padding*2):0,D=T*n;if(w){p.fillStyle="black",p.strokeStyle="black";const E=t.dropShadow,V=fe(E.color),q=mn(V),de=E.blur*n,Ct=E.distance*n;p.shadowColor=`rgba(${q[0]*255},${q[1]*255},${q[2]*255},${E.alpha})`,p.shadowBlur=de,p.shadowOffsetX=Math.cos(E.angle)*Ct,p.shadowOffsetY=Math.sin(E.angle)*Ct+D}else p.globalAlpha=(a=(o=t._fill)==null?void 0:o.alpha)!=null?a:1,p.fillStyle=t._fill?vr(t._fill,p):null,(l=t._stroke)!=null&&l.width&&(p.strokeStyle=vr(t._stroke,p)),p.shadowColor="black";let L=(m-b.fontSize)/2;m-b.fontSize<0&&(L=0);const B=(h=(u=t._stroke)==null?void 0:u.width)!=null?h:0;for(let E=0;E<g.length;E++)S=B/2,k=B/2+E*m+b.ascent+L,t.align==="right"?S+=v-y[E]:t.align==="center"&&(S+=(v-y[E])/2),t._stroke&&this._drawLetterSpacing(g[E],t,i,S+t.padding,k+t.padding-T,!0),t._fill!==void 0&&this._drawLetterSpacing(g[E],t,i,S+t.padding,k+t.padding-T)}}_drawLetterSpacing(e,t,n,i,s,o=!1){const{context:a}=n,l=t.letterSpacing;let u=!1;if(te.experimentalLetterSpacingSupported&&(te.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,u=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||u){o?a.strokeText(e,i,s):a.fillText(e,i,s);return}let h=i;const c=te.graphemeSegmenter(e);let p=a.measureText(e).width,d=0;for(let f=0;f<c.length;++f){const g=c[f];o?a.strokeText(g,h,s):a.fillText(g,h,s);let m="";for(let y=f+1;y<c.length;++y)m+=c[y];d=a.measureText(m).width,h+=p-d+l,p=d}}destroy(){}}lo.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"canvasText"};class uo{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),n=e.view._getKey();return t.textureNeedsUploading?(t.textureNeedsUploading=!1,!0):t.currentKey!==n}addRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(t)}updateRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.htmlText.decreaseReferenceCount(t.currentKey),W.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),n=this._getGpuText(e),i=n.batchableSprite;n.currentKey!==t&&this._updateGpuText(e).catch(o=>{console.error(o)}),e.view._didUpdate=!1;const s=e.view._style.padding;Yt(i.bounds,e.view.anchor,i.texture,s)}async _updateGpuText(e){e.view._didUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const n=e.view._getKey();this._renderer.htmlText.decreaseReferenceCount(t.currentKey),t.generatingTexture=!0,t.currentKey=n;const i=e.view,s=i._autoResolution?this._renderer.view.resolution:i._resolution,o=await this._renderer.htmlText.getManagedTexture(i.text,s,i._style,i._getKey()),a=t.batchableSprite;a.texture=t.texture=o,t.generatingTexture=!1,t.textureNeedsUploading=!0,e.view.onUpdate();const l=e.view._style.padding;Yt(a.bounds,e.view.anchor,a.texture,l)}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t={texture:A.EMPTY,currentKey:"--",batchableSprite:W.get(fn),textureNeedsUploading:!1,generatingTexture:!1};return t.batchableSprite.sprite=e,t.batchableSprite.texture=A.EMPTY,t.batchableSprite.bounds=[0,1,0,0],this._gpuText[e.uid]=t,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}uo.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"htmlText"};function dd(){const{userAgent:r}=I.ADAPTER.getNavigator();return/^((?!chrome|android).)*safari/i.test(r)}function pd(r,e){const t=/font-family:([^;"\s]+)/g,n=r.match(t),i=[e],s={};return s[e]=!0,n&&n.forEach(o=>{const a=o.split(":")[1].trim();s[a]||(i.push(a),s[a]=!0)}),i}async function fd(r){const e=await(await I.ADAPTER.fetch(r)).blob(),t=new FileReader;return await new Promise((n,i)=>{t.onloadend=()=>n(t.result),t.onerror=i,t.readAsDataURL(e)})}async function ho(r,e){const t=await fd(e);return`@font-face {
        font-family: "${r.fontFamily}";
        src: url('${t}');
        font-weight: ${r.fontWeight};
        font-style: ${r.fontStyle};
    }`}var ay=Object.defineProperty,ly=Object.defineProperties,uy=Object.getOwnPropertyDescriptors,md=Object.getOwnPropertySymbols,hy=Object.prototype.hasOwnProperty,cy=Object.prototype.propertyIsEnumerable,gd=(r,e,t)=>e in r?ay(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,dy=(r,e)=>{for(var t in e||(e={}))hy.call(e,t)&&gd(r,t,e[t]);if(md)for(var t of md(e))cy.call(e,t)&&gd(r,t,e[t]);return r},py=(r,e)=>ly(r,uy(e));async function vd(r,e){const t=r.filter(n=>ee.has(n)).map((n,i)=>{if(!br.has(n)){const{url:s}=ee.get(n);i===0?br.set(n,ho(e,s)):br.set(n,ho(py(dy({},yr.defaultFontOptions),{fontFamily:n}),s))}return br.get(n)});return(await Promise.all(t)).join(`
`)}const fy=new le;function bd(r,e){const t=fy;t.minX=0,t.minY=0,t.maxX=r.width/e|0,t.maxY=r.height/e|0;const n=se.getOptimalTexture(t.width,t.height,e,!1);return n.source.type="image",n.source.resource=r,n.frameWidth=r.width,n.frameHeight=r.height,n.source.update(),n.layout.updateUvs(),n}function yd(r,e,t,n,i){const{domElement:s,styleElement:o,svgRoot:a}=i;s.innerHTML=r,s.setAttribute("style",`transform: scale(${t});
${e.cssStyle}`),o.textContent=n;const{width:l,height:u}=i.image;return a.setAttribute("width",l.toString()),a.setAttribute("height",u.toString()),new XMLSerializer().serializeToString(a)}function xd(r,e){const t=Ue.getOptimalCanvasAndContext(r.width,r.height,e),{context:n}=t;return n.clearRect(0,0,r.width,r.height),n.drawImage(r,0,0),Ue.returnCanvasAndContext(t),t.canvas}function _d(r,e,t){return new Promise(async n=>{t&&await new Promise(i=>setTimeout(i,100)),r.onload=()=>{n()},r.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,r.crossOrigin="anonymous"})}let wd;function Td(r,e,t,n){n=n||wd||(wd=new co);const{domElement:i,styleElement:s,svgRoot:o}=n;i.innerHTML=r,i.setAttribute("style",e.cssStyle),t&&(s.textContent=t),document.body.appendChild(o);const a=i.getBoundingClientRect();return o.remove(),{width:a.width,height:a.height}}const Sd="http://www.w3.org/2000/svg",Pd="http://www.w3.org/1999/xhtml",br=new Map;class co{constructor(){this.svgRoot=document.createElementNS(Sd,"svg"),this.foreignObject=document.createElementNS(Sd,"foreignObject"),this.domElement=document.createElementNS(Pd,"div"),this.styleElement=document.createElementNS(Pd,"style"),this.image=new Image;const{foreignObject:e,svgRoot:t,styleElement:n,domElement:i}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(n),e.appendChild(i)}}class yr{constructor(e){this._activeTextures={},this._createCanvas=e.type===Ae.WEBGPU}getTexture(e){return this._buildTexturePromise(e.text,e.resolution,e.style)}getManagedTexture(e,t,n,i){if(this._activeTextures[i])return this._increaseReferenceCount(i),this._activeTextures[i].promise;const s=this._buildTexturePromise(e,t,n).then(o=>(this._activeTextures[i].texture=o,o));return this._activeTextures[i]={texture:null,promise:s,usageCount:1},s}async _buildTexturePromise(e,t,n){const i=W.get(co),s=pd(e,n.fontFamily),o=await vd(s,n),a=Td(e,n,o,i),l=Math.ceil(Math.ceil(Math.max(1,a.width)+n.padding*2)*t),u=Math.ceil(Math.ceil(Math.max(1,a.height)+n.padding*2)*t),h=i.image;h.width=l|0,h.height=u|0;const c=yd(e,n,t,o,i);await _d(h,c,dd()&&s.length>0);let p=h;return this._createCanvas&&(p=xd(h,t)),W.return(i),bd(p,t)}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t):t.promise.then(n=>{t.texture=n,this._cleanUp(t)}).catch(()=>{console.warn("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}_cleanUp(e){se.returnTexture(e.texture),e.texture.source.resource=null,e.texture.source.type="unknown"}getReferenceCount(e){return this._activeTextures[e].usageCount}destroy(){}}yr.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"htmlText"},yr.defaultFontOptions={fontFamily:"Arial",fontStyle:"normal",fontWeight:"normal"};var my=Object.defineProperty,Ad=Object.getOwnPropertySymbols,gy=Object.prototype.hasOwnProperty,vy=Object.prototype.propertyIsEnumerable,Ed=(r,e,t)=>e in r?my(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Md=(r,e)=>{for(var t in e||(e={}))gy.call(e,t)&&Ed(r,t,e[t]);if(Ad)for(var t of Ad(e))vy.call(e,t)&&Ed(r,t,e[t]);return r};const Cd={alpha:1,color:0,clearBeforeRender:!0};class gn{constructor(){this.clearBeforeRender=!0,this._backgroundColor=0,this._backgroundColorRgba=[0,0,0,1],this._backgroundColorRgbaObject={r:0,g:0,b:0,a:1},this._backgroundColorString="#000000",this.color=this._backgroundColor,this.alpha=1}init(e){e=Md(Md({},Cd),e),this.clearBeforeRender=e.clearBeforeRender,this.color=e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha}get color(){return this._backgroundColor}set color(e){this._backgroundColor=e,this._backgroundColorString=Zs(e);const t=this._backgroundColorRgbaObject,n=this._backgroundColorRgba;mn(e,n),t.r=n[0],t.g=n[1],t.b=n[2],t.a=n[3]}get alpha(){return this._backgroundColorRgba[3]}set alpha(e){this._backgroundColorRgba[3]=e}get colorRgba(){return this._backgroundColorRgba}get colorRgbaObject(){return this._backgroundColorRgbaObject}get colorString(){return this._backgroundColorString}destroy(){}}gn.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"background",priority:0},gn.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};class by extends Q{constructor(){super({gl:{functions:`
                ${qr}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendColor(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${Kr}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class yy extends Q{constructor(){super({gl:{functions:`
                float colorBurn(float base, float blend)
                {
                    return max((1.0 - ((1.0 - base) / blend)), 0.0);
                }

                vec3 blendColorBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendColorBurn(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn blendColorBurn(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorBurn(base.r, blend.r),
                        colorBurn(base.g, blend.g),
                        colorBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendColorBurn(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class xy extends Q{constructor(){super({gl:{functions:`
                float colorDodge(float base, float blend)
                {
                    return base / (1.0 - blend);
                }

                vec3 blendColorDodge(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendColorDodge(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return base / (1.0 - blend);
                }

                fn blendColorDodge(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        colorDodge(base.r, blend.r),
                        colorDodge(base.g, blend.g),
                        colorDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                    out = vec4<f32>(blendColorDodge(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class _y extends Q{constructor(){super({gl:{functions:`
                vec3 blendDarken(vec3 base, vec3 blend, float opacity)
                {
                    return (min(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendDarken(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn blendDarken(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (min(blend,base) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendDarken(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class wy extends Q{constructor(){super({gl:{functions:`
                vec3 blendDifference(vec3 base, vec3 blend,  float opacity)
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendDifference(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                fn blendDifference(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (abs(blend - base) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendDifference(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Ty extends Q{constructor(){super({gl:{functions:`
                float divide(float base, float blend)
                {
                    return (blend > 0.0) ? clamp(base / blend, 0.0, 1.0) : 1.0;
                }

                vec3 blendDivide(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendDivide(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn divide(base: f32, blend: f32) -> f32
                {
                    return select(1.0, clamp(base / blend, 0.0, 1.0), blend > 0.0);
                }

                fn blendDivide(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        divide(base.r, blend.r),
                        divide(base.g, blend.g),
                        divide(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendDivide(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Sy extends Q{constructor(){super({gl:{functions:`
                vec3 exclusion(vec3 base, vec3 blend)
                {
                    return base + blend - 2.0 * base * blend;
                }

                vec3 blendExclusion(vec3 base, vec3 blend, float opacity)
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendExclusion(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn exclusion(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return base+blend-2.0*base*blend;
                }

                fn blendExclusion(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (exclusion(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendExclusion(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Py extends Q{constructor(){super({gl:{functions:`
                float hardLight(float base, float blend)
                {
                    return (blend < 0.5) ? 2.0 * base * blend : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
                }

                vec3 blendHardLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendHardLight(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                fn hardLight(base: f32, blend: f32) -> f32
                {
                    return select(1.0 - 2.0 * (1.0 - base) * (1.0 - blend), 2.0 * base * blend, blend < 0.5);
                }

                fn blendHardLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        hardLight(base.r, blend.r),
                        hardLight(base.g, blend.g),
                        hardLight(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendHardLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class Ay extends Q{constructor(){super({gl:{functions:`
                float hardMix(float base, float blend)
                {
                    return (base + blend >= 1.0) ? 1.0 : 0.0;
                }

                vec3 blendHardMix(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blended = vec3(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendHardMix(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                fn hardMix(base: f32, blend: f32) -> f32
                {
                    return select(0.0, 1.0, base + blend >= 1.0);
                }

                fn blendHardMix(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        hardMix(base.r, blend.r),
                        hardMix(base.g, blend.g),
                        hardMix(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendHardMix(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Ey extends Q{constructor(){super({gl:{functions:`
                vec3 blendLighten(vec3 base, vec3 blend, float opacity)
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLighten(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn blendLighten(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (max(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLighten(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class My extends Q{constructor(){super({gl:{functions:`
                float linearBurn(float base, float blend)
                {
                    return max(0.0, base + blend - 1.0);
                }

                vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLinearBurn(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn blendLinearBurn(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearBurn(base.r, blend.r),
                        linearBurn(base.g, blend.g),
                        linearBurn(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendLinearBurn(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class Cy extends Q{constructor(){super({gl:{functions:`
                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );
                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLinearDodge(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1, base + blend);
                }

                fn blendLinearDodge(base:vec3<f32>, blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearDodge(base.r, blend.r),
                        linearDodge(base.g, blend.g),
                        linearDodge(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLinearDodge(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class By extends Q{constructor(){super({gl:{functions:`
                float linearBurn(float base, float blend) {
                    return max(0.0, base + blend - 1.0);
                }

                float linearDodge(float base, float blend) {
                    return min(1.0, base + blend);
                }

                float linearLight(float base, float blend) {
                    return (blend <= 0.5) ? linearBurn(base,2.0*blend) : linearBurn(base,2.0*(blend-0.5));
                }

                vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
                    vec3 blended = vec3(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendLinearLight(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn linearBurn(base: f32, blend: f32) -> f32
                {
                    return max(0.0, base + blend - 1.0);
                }

                fn linearDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base + blend);
                }

                fn linearLight(base: f32, blend: f32) -> f32
                {
                    return select(linearBurn(base,2.0*(blend-0.5)), linearBurn(base,2.0*blend), blend <= 0.5);
                }

                fn blendLinearLightOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        linearLight(base.r, blend.r),
                        linearLight(base.g, blend.g),
                        linearLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLinearLightOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Ry extends Q{constructor(){super({gl:{functions:`
                ${qr}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLuminosity(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${Kr}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class ky extends Q{constructor(){super({gl:{functions:`
                vec3 negation(vec3 base, vec3 blend)
                {
                    return 1.0-abs(1.0-base-blend);
                }

                vec3 blendNegation(vec3 base, vec3 blend, float opacity)
                {
                    return (negation(base, blend) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendNegation(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn blendNegation(base: vec3<f32>, blend: vec3<f32>) -> vec3<f32>
                {
                    return 1.0-abs(1.0-base-blend);
                }

                fn blendNegationOpacity(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendNegationOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Oy extends Q{constructor(){super({gl:{functions:`
                float overlay(float base, float blend)
                {
                    return (blend < 0.5) ? (2.0*base*blend) : (1.0-2.0*(1.0-base)*(1.0-blend));
                }

                vec3 blendOverlay(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendOverlay(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn overlay(base: f32, blend: f32) -> f32
                {
                    return select((1.0-2.0*(1.0-base)*(1.0-blend)), (2.0*base*blend), base < 0.5);
                }

                fn blendOverlay(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        overlay(base.r, blend.r),
                        overlay(base.g, blend.g),
                        overlay(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendOverlay(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class Fy extends Q{constructor(){super({gl:{functions:`
                float pinLight(float base, float blend)
                {
                    return (blend <= 0.5) ? min(base, 2.0 * blend) : max(base, 2.0 * (blend - 0.5));
                }

                vec3 blendPinLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendPinLight(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn pinLight(base: f32, blend: f32) -> f32
                {
                    return select(max(base,2.0*(blend-0.5)), min(base,2.0*blend), blend <= 0.5);
                }

                fn blendPinLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        pinLight(base.r, blend.r),
                        pinLight(base.g, blend.g),
                        pinLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendPinLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class Uy extends Q{constructor(){super({gl:{functions:`
                ${qr}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                ${Kr}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Iy extends Q{constructor(){super({gl:{functions:`
                float softLight(float base, float blend)
                {
                    return (blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
                }

                vec3 blendSoftLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendSoftLight(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn softLight(base: f32, blend: f32) -> f32
                {
                    return select(2.0 * base * blend + base * base * (1.0 - 2.0 * blend), sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend), blend < 0.5);
                }

                fn blendSoftLight(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        softLight(base.r, blend.r),
                        softLight(base.g, blend.g),
                        softLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendSoftLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class Gy extends Q{constructor(){super({gl:{functions:`
                float subtract(float base, float blend)
                {
                    return max(0.0, base - blend);
                }

                vec3 blendSubtract(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendSubtract(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                fn subtract(base: f32, blend: f32) -> f32
                {
                    return max(0, base - blend);
                }

                fn blendSubtract(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blended = vec3<f32>(
                        subtract(base.r, blend.r),
                        subtract(base.g, blend.g),
                        subtract(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendSubtract(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class Ly extends Q{constructor(){super({gl:{functions:`
                float colorBurn(float base, float blend)
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                float colorDodge(float base, float blend)
                {
                    return min(1.0, base / (1.0-blend));
                }

                float vividLight(float base, float blend)
                {
                    return (blend < 0.5) ? colorBurn(base,(2.0*blend)) : colorDodge(base,(2.0*(blend-0.5)));
                }

                vec3 blendVividLight(vec3 base, vec3 blend, float opacity)
                {
                    vec3 blended = vec3(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendVividLight(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                fn colorBurn(base:f32, blend:f32) -> f32
                {
                    return max((1.0-((1.0-base)/blend)),0.0);
                }

                fn colorDodge(base: f32, blend: f32) -> f32
                {
                    return min(1.0, base / (1.0-blend));
                }

                fn vividLight(base: f32, blend: f32) -> f32
                {
                    return select(colorDodge(base,(2.0*(blend-0.5))), colorBurn(base,(2.0*blend)), blend<0.5);
                }

                fn blendVividLight(base: vec3<f32>, blend: vec3<f32>, opacity: f32) -> vec3<f32>
                {
                    let blended: vec3<f32> = vec3<f32>(
                        vividLight(base.r, blend.r),
                        vividLight(base.g, blend.g),
                        vividLight(base.b, blend.b)
                    );

                    return (blended * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendVividLight(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}const po={color:by,"color-burn":yy,"color-dodge":xy,darken:_y,difference:wy,divide:Ty,exclusion:Sy,"hard-light":Py,"hard-mix":Ay,lighten:Ey,"linear-burn":My,"linear-dodge":Cy,"linear-light":By,luminosity:Ry,negation:ky,overlay:Oy,"pin-light":Fy,saturation:Uy,"soft-light":Iy,subtract:Gy,"vivid-light":Ly};class fo{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,t,n){if(this._activeBlendMode===t){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=t,this._isAdvanced&&this._endAdvancedBlendMode(n),this._isAdvanced=!!po[t],this._isAdvanced&&(this._beginAdvancedBlendMode(n),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);const t=this._activeBlendMode;if(!po[t]){console.warn(`Unable to assign 'BLEND_MODES.${t}' using the blend mode pipeline`);return}this._filterHash[t]||(this._filterHash[t]=new Gr({filters:[new po[t]]}));const n={type:"filter",action:"pushFilter",renderables:[],filterEffect:this._filterHash[t],canBundle:!1};this._renderableList=n.renderables,e.add(n)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({type:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}fo.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"blendMode"};var $y=Object.defineProperty,Bd=Object.getOwnPropertySymbols,Dy=Object.prototype.hasOwnProperty,zy=Object.prototype.propertyIsEnumerable,Rd=(r,e,t)=>e in r?$y(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,mo=(r,e)=>{for(var t in e||(e={}))Dy.call(e,t)&&Rd(r,t,e[t]);if(Bd)for(var t of Bd(e))zy.call(e,t)&&Rd(r,t,e[t]);return r};const Ny={format:"png",quality:1};class go{constructor(e){this._renderer=e}_normalizeOptions(e,t={}){return e instanceof Y||e instanceof A?mo({target:e},t):mo(mo({},t),e)}async image(e){const t=new Image;return t.src=await this.base64(e),t}async base64(e){const{target:t,format:n,quality:i,frame:s}=this._normalizeOptions(e,Ny),o=this.canvas({target:t,frame:s});if(o.toBlob!==void 0)return new Promise((a,l)=>{o.toBlob(u=>{if(!u){l(new Error("ICanvas.toBlob failed!"));return}const h=new FileReader;h.onload=()=>a(h.result),h.onerror=l,h.readAsDataURL(u)},n,i)});if(o.toDataURL!==void 0)return o.toDataURL(n,i);if(o.convertToBlob!==void 0){const a=await o.convertToBlob({type:n,quality:i});return new Promise((l,u)=>{const h=new FileReader;h.onload=()=>l(h.result),h.onerror=u,h.readAsDataURL(a)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(e){const{target:t,frame:n}=this._normalizeOptions(e),i=this._renderer,s=t instanceof A?t:i.textureGenerator.generateTexture({container:t,region:n}),o=i.texture.generateCanvas(s);return t instanceof Y&&s.destroy(),o}pixels(e){const{target:t,frame:n}=this._normalizeOptions(e),i=this._renderer,s=t instanceof A?t:i.textureGenerator.generateTexture({container:t,region:n}),o=i.texture.getPixels(s);return t instanceof Y&&s.destroy(),o}texture(e){const{target:t,frame:n}=this._normalizeOptions(e);return this._renderer.textureGenerator.generateTexture({container:t,region:n})}download(e){const{filename:t}=this._normalizeOptions(e),n=this.canvas(e),i=document.createElement("a");i.download=t!=null?t:"image.png",i.href=n.toDataURL("image/png"),document.body.appendChild(i),i.click(),document.body.removeChild(i)}destroy(){this._renderer=null}}go.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"extract"};class kd extends A{static create(e){return new A({source:new ae(e)})}resize(e,t,n){return this.source.resize(e,t,n),this}}var Wy=Object.defineProperty,Hy=Object.defineProperties,jy=Object.getOwnPropertyDescriptors,Od=Object.getOwnPropertySymbols,Vy=Object.prototype.hasOwnProperty,Yy=Object.prototype.propertyIsEnumerable,Fd=(r,e,t)=>e in r?Wy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Xy=(r,e)=>{for(var t in e||(e={}))Vy.call(e,t)&&Fd(r,t,e[t]);if(Od)for(var t of Od(e))Yy.call(e,t)&&Fd(r,t,e[t]);return r},qy=(r,e)=>Hy(r,jy(e));const Ky=new X,Zy=new le;class vo{constructor(e){this._renderer=e}generateTexture(e){var t;e instanceof Y&&(e={container:e,region:void 0,textureSourceOptions:{},resolution:void 0});const n=e.resolution||this._renderer.resolution,i=e.container,s=((t=e.region)==null?void 0:t.copyTo(Ky))||De(i,Zy).rectangle;s.width=Math.max(s.width,1/n)|0,s.height=Math.max(s.height,1/n)|0;const o=kd.create(qy(Xy({},e.textureSourceOptions),{width:s.width,height:s.height,resolution:n})),a=R.shared.translate(-s.x,-s.y);return this._renderer.render({container:i,transform:a,target:o}),o}destroy(){}}vo.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"textureGenerator"};class bo{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({projectionMatrix:e,worldTransformMatrix:t,worldColor:n,offset:i}){const s=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionMatrix:this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:new R,worldColor:4294967295,offset:new H},o={projectionMatrix:e||this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:t||s.worldTransformMatrix,worldColor:n||s.worldColor,offset:i||s.offset,bindGroup:null},a=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(a);const l=a.uniforms;l.projectionMatrix=o.projectionMatrix,l.worldTransformMatrix.copyFrom(o.worldTransformMatrix),l.worldTransformMatrix.tx-=o.offset.x,l.worldTransformMatrix.ty-=o.offset.y,l.worldAlpha=(o.worldColor>>24&255)/255,a.update();let u;this._renderer.renderPipes.uniformBatch?u=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(a,!1):(this._renderer.uniformBuffer.updateUniformGroup(a),u=this._bindGroupPool.pop()||new Te,this._activeBindGroups.push(u),u.setResource(a,0)),o.bindGroup=u,this._currentGlobalUniformData=o}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1]}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new J({projectionMatrix:{value:new R,type:"mat3x3<f32>"},worldTransformMatrix:{value:new R,type:"mat3x3<f32>"},worldAlpha:{value:1,type:"f32"}},{ubo:!0,isStatic:!0})}destroy(){}}bo.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"globalUniforms"};const yo={f32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"mat2x2<f32>":48,"mat3x3<f32>":48,"mat4x4<f32>":64};function Ud(r){const e=r.map(s=>({data:s,offset:0,size:0}));let t=0,n=0,i=0;for(let s=0;s<e.length;s++){const o=e[s];if(t=yo[o.data.type],!t)throw new Error(`Unknown type ${o.data.type}`);if(o.data.size>1&&(t=Math.max(t,16)*o.data.size),o.size=t,n%t!==0&&n<16){const a=n%t%16;n+=a,i+=a}n+t>16?(i=Math.ceil(i/16)*16,o.offset=i,i+=t,n=t):(o.offset=i,n+=t,i+=t)}return i=Math.ceil(i/16)*16,{uboElements:e,size:i}}const vn=[{type:"mat3x3<f32>",test:r=>r.value.a!==void 0,code:r=>`
                var ${r}_matrix = uv.${r}.toArray(true);

                data[offset] = ${r}_matrix[0];
                data[offset+1] = ${r}_matrix[1];
                data[offset+2] = ${r}_matrix[2];

                data[offset + 4] = ${r}_matrix[3];
                data[offset + 5] = ${r}_matrix[4];
                data[offset + 6] = ${r}_matrix[5];

                data[offset + 8] = ${r}_matrix[6];
                data[offset + 9] = ${r}_matrix[7];
                data[offset + 10] = ${r}_matrix[8];
            `},{type:"vec4<f32>",test:r=>r.type==="vec4<f32>"&&r.size===1&&r.value.width!==void 0,code:r=>`
                        v = uv.${r};

                        data[offset] = v.x;
                        data[offset+1] = v.y;
                        data[offset+2] = v.width;
                        data[offset+3] = v.height;
                    `},{type:"vec2<f32>",test:r=>r.type==="vec2<f32>"&&r.size===1&&r.value.x!==void 0,code:r=>`
                    v = uv.${r};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                `}],Qy={f32:`
        data[offset] = v;
    `,"vec2<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,"vec3<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,"vec4<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,"mat4x4<f32>":`
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `};function Id(r){const e=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
    `];let t=0;for(let i=0;i<r.length;i++){const s=r[i],o=s.data.name;let a=!1,l=0;for(let u=0;u<vn.length;u++)if(vn[u].test(s.data)){l=s.offset/4,e.push(`offset += ${l-t};`,vn[u].code(o)),a=!0;break}if(!a)if(s.data.size>1){const u=Math.max(yo[s.data.type]/16,1),h=s.data.value.length/s.data.size,c=(4-h%4)%4;l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};

                    let arrayOffset = offset;
                    
                    t = 0;

                    for(var i=0; i < ${s.data.size*u}; i++)
                    {
                        for(var j = 0; j < ${h}; j++)
                        {
                            data[arrayOffset++] = v[t++];
                        }
                        ${c!==0?"arrayOffset += ${remainder};":""}
                    }
                `)}else{const u=Qy[s.data.type];l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};
                    ${u};
                `)}t=l}const n=e.join(`
`);return new Function("uv","data","offset",n)}class xo{constructor(){this._syncFunctionHash=Object.create(null)}ensureUniformGroup(e){e._syncFunction||this._initUniformGroup(e)}_initUniformGroup(e){const t=e.signature;let n=this._syncFunctionHash[t];if(!n){const i=Object.keys(e.uniformStructures).map(a=>e.uniformStructures[a]),s=Ud(i),o=Id(s.uboElements);n=this._syncFunctionHash[t]={layout:s,syncFunction:o}}return e._syncFunction=n.syncFunction,e.buffer=new ce({data:new Float32Array(n.layout.size/4),usage:$.UNIFORM|$.COPY_DST}),e._syncFunction}syncUniformGroup(e,t,n){const i=e._syncFunction||this._initUniformGroup(e);return t||(t=e.buffer.data),n||(n=0),i(e.uniforms,t,n),!0}updateUniformGroup(e){if(e.isStatic&&!e.dirtyId)return!1;e.dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){throw new Error("Method not implemented.")}}xo.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"uniformBuffer"};let Gd=!1;const _o="8.0.0-alpha.3";function Ld(r){if(!Gd){if(I.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${_o} (${r}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${_o} - ${r} - http://www.pixijs.com/`);Gd=!0}}class bn{constructor(e){this._renderer=e}init(e){e.hello&&Ld(this._renderer.name)}}bn.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"hello",priority:0},bn.defaultOptions={hello:!1};var Jy=Object.defineProperty,$d=Object.getOwnPropertySymbols,ex=Object.prototype.hasOwnProperty,tx=Object.prototype.propertyIsEnumerable,Dd=(r,e,t)=>e in r?Jy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,zd=(r,e)=>{for(var t in e||(e={}))ex.call(e,t)&&Dd(r,t,e[t]);if($d)for(var t of $d(e))tx.call(e,t)&&Dd(r,t,e[t]);return r};const Nd=class{constructor(r){this._renderer=r,this.count=0,this.checkCount=0}init(r){r=zd(zd({},Nd.defaultOptions),r),this.checkCountMax=r.textureGCCheckCountMax,this.maxIdle=r.textureGCAMaxIdle,this.active=r.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const r=this._renderer.texture.managedTextures;for(let e=0;e<r.length;e++){const t=r[e];t.resource&&t.touched>-1&&this.count-t.touched>this.maxIdle&&(t.touched=-1,t.unload())}}destroy(){this._renderer=null}};let xr=Nd;xr.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"textureGC"},xr.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:60*60,textureGCCheckCountMax:600},Z.add(xr);var rx=Object.defineProperty,Wd=Object.getOwnPropertySymbols,nx=Object.prototype.hasOwnProperty,ix=Object.prototype.propertyIsEnumerable,Hd=(r,e,t)=>e in r?rx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,jd=(r,e)=>{for(var t in e||(e={}))nx.call(e,t)&&Hd(r,t,e[t]);if(Wd)for(var t of Wd(e))ix.call(e,t)&&Hd(r,t,e[t]);return r};const Vd=class{get resolution(){return this.texture.source._resolution}set resolution(r){this.texture.source.resize(this.texture.source.width,this.texture.source.height,r)}init(r){r=jd(jd({},Vd.defaultOptions),r),this.screen=new X(0,0,r.width,r.height),this.element=r.element||I.ADAPTER.createCanvas(),this.antialias=!!r.antialias,this.texture=ln(this.element,r),this.multiView=!!r.multiView,this.autoDensity&&(this.element.style.width=`${this.texture.width}px`,this.element.style.height=`${this.texture.height}px`)}resize(r,e,t){this.texture.source.resize(r,e,t),this.screen.width=this.texture.frameWidth,this.screen.height=this.texture.frameHeight,this.autoDensity&&(this.element.style.width=`${r}px`,this.element.style.height=`${e}px`)}destroy(r){r&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}};let yn=Vd;yn.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"view",priority:0},yn.defaultOptions={width:800,height:600,resolution:I.RESOLUTION,autoDensity:!1,antialias:!1};const wo=[gn,ji,ls,bo,bn,yn,lo,yr,Ys,xo,xr,vo,go],To=[fo,Ni,Xs,Ws,gs,us,ao,uo,oo,zs,Hi,hs,ds,cs],sx=[...wo,_s,sn,vs,Gs,As,xs,Os,ks,Ts,Us,Es,ws],ox=[...To],ax=[Ii,ps,Vi],Yd=[],Xd=[],qd=[];Z.handleByNamedList(x.WebGLSystem,Yd),Z.handleByNamedList(x.WebGLPipes,Xd),Z.handleByNamedList(x.WebGLPipesAdaptor,qd),Z.add(...sx,...ox,...ax);class Kd extends Ls{constructor(){const e={name:"webgl2",type:Ae.WEBGL,systems:Yd,renderPipes:Xd,renderPipeAdaptors:qd};super(e)}}var lx={__proto__:null,WebGLRenderer:Kd};class So{constructor(e){this._hash=Object.create(null),this._renderer=e}contextChange(e){this._gpu=e}getBindGroup(e,t,n){return e.updateKey(),this._hash[e.key]||this._createBindGroup(e,t,n)}_createBindGroup(e,t,n){var i;const s=this._gpu.device,o=t.layout[n],a=[];for(const u in o){const h=(i=e.resources[u])!=null?i:e.resources[o[u]];let c;if(h.resourceType==="uniformGroup"){const p=h;this._renderer.uniformBuffer.updateUniformGroup(p);const d=p.buffer;c={buffer:this._renderer.buffer.getGPUBuffer(d),offset:0,size:d.descriptor.size}}else if(h.resourceType==="buffer"){const p=h;c={buffer:this._renderer.buffer.getGPUBuffer(p),offset:0,size:p.descriptor.size}}else if(h.resourceType==="bufferResource"){const p=h;c={buffer:this._renderer.buffer.getGPUBuffer(p.buffer),offset:p.offset,size:p.size}}else if(h.resourceType==="textureSampler"){const p=h;c=this._renderer.texture.getGpuSampler(p)}else if(h.resourceType==="textureSource"){const p=h;c=this._renderer.texture.getGpuSource(p).createView({})}a.push({binding:o[u],resource:c})}const l=s.createBindGroup({layout:t._gpuLayout.bindGroups[n],entries:a});return this._hash[e.key]=l,l}destroy(){}}So.extension={type:[x.WebGPUSystem],name:"bindGroup"};class Po{constructor(){this._gpuBuffers=Object.create(null)}contextChange(e){this._gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){const t=this._gpuBuffers[e.uid]||this.createGPUBuffer(e);return e._updateID&&e.data&&(e._updateID=0,this._gpu.device.queue.writeBuffer(t,0,e.data.buffer,0,e._updateSize)),t}destroyAll(){for(const e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){const t=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(wt(e.data.buffer,t.getMappedRange()),t.unmap()),this._gpuBuffers[e.uid]=t,e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),t}onBufferChange(e){let t=this._gpuBuffers[e.uid];t.destroy(),t=this.createGPUBuffer(e),e._updateID=0}onBufferDestroy(e){this._gpuBuffers[e.uid].destroy(),this._gpuBuffers[e.uid]=null}destroy(){throw new Error("Method not implemented.")}}Po.extension={type:[x.WebGPUSystem],name:"buffer"};function ux(r,e){const t=r.descriptor.size,n=e.gpu.device,i=new ce({data:new Float32Array(24e5),usage:$.MAP_READ|$.COPY_DST}),s=e.buffer.createGPUBuffer(i),o=n.createCommandEncoder();o.copyBufferToBuffer(e.buffer.getGPUBuffer(r),0,s,0,t),n.queue.submit([o.finish()]),s.mapAsync(GPUMapMode.READ,0,t).then(()=>{s.getMappedRange(0,t),s.unmap()})}class Zd{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const t=this.byteIndex;let n=t+e*4;if(n=Math.ceil(n/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,n>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=n,t}addGroup(e){const t=this.addEmptyGroup(e.length);for(let n=0;n<e.length;n++)this.data[t/4+n]=e[n];return t}destroy(){this._buffer.destroy(),this._buffer=null,this.data=null}}class Ao{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){}}Ao.extension={type:[x.WebGPUSystem],name:"colorMask"};class Eo{constructor(e){this._renderer=e}async init(){return this._initPromise?this._initPromise:(this._initPromise=this._createDeviceAndAdaptor({}).then(e=>{this.gpu=e,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async _createDeviceAndAdaptor(e){const t=await navigator.gpu.requestAdapter(e),n=await t.requestDevice();return{adapter:t,device:n}}destroy(){this._renderer=null}}Eo.extension={type:[x.WebGPUSystem],name:"device"};var hx=Object.defineProperty,Qd=Object.getOwnPropertySymbols,cx=Object.prototype.hasOwnProperty,dx=Object.prototype.propertyIsEnumerable,Jd=(r,e,t)=>e in r?hx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ep=(r,e)=>{for(var t in e||(e={}))cx.call(e,t)&&Jd(r,t,e[t]);if(Qd)for(var t of Qd(e))dx.call(e,t)&&Jd(r,t,e[t]);return r};class Mo{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}start(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e,t){this.renderPassEncoder&&this.renderPassEncoder.end(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(t.descriptor),this._setViewport(e.viewport)}_setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,t,n,i){const s=this._renderer.pipeline.getPipeline(e,t,n,i);this.setPipeline(s)}setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,t){this._boundVertexBuffer[e]!==t&&(this._boundVertexBuffer[e]=t,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(t)))}_setIndexBuffer(e){this._boundIndexBuffer!==e&&(this._boundIndexBuffer=e,this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),"uint32"))}setBindGroup(e,t,n){if(this._boundBindGroup[e]===t)return;this._boundBindGroup[e]=t,t.touch(this._renderer.textureGC.count);const i=this._renderer.bindGroup.getBindGroup(t,n,e);this.renderPassEncoder.setBindGroup(e,i)}setGeometry(e){for(const t in e.attributes){const n=e.attributes[t];this._setVertexBuffer(n.shaderLocation,n.buffer)}e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,t){for(const n in e.groups){const i=e.groups[n];t||this._syncBindGroup(i),this.setBindGroup(n,i,e.gpuProgram)}}_syncBindGroup(e){for(const t in e.resources){const n=e.resources[t];n.isUniformGroup&&this._renderer.uniformBuffer.updateUniformGroup(n)}}draw(e){const{geometry:t,shader:n,state:i,topology:s,size:o,start:a,instanceCount:l,skipSync:u}=e;this.setPipelineFromGeometryProgramAndState(t,n.gpuProgram,i,s),this.setGeometry(t),this._setShaderBindGroups(n,u),t.indexBuffer?this.renderPassEncoder.drawIndexed(o||t.indexBuffer.data.length,l||1,a||0):this.renderPassEncoder.draw(o||t.getSize(),l||1,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished()}restoreRenderPass(){const e=this._renderer.renderTarget.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const t=this._boundPipeline,n=ep({},this._boundVertexBuffer),i=this._boundIndexBuffer,s=ep({},this._boundBindGroup);this._clearCache();const o=this._renderer.renderTarget.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this.setPipeline(t);for(const a in n)this._setVertexBuffer(a,n[a]);for(const a in s)this.setBindGroup(a,s[a],null);this._setIndexBuffer(i)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){}contextChange(e){this._gpu=e}}Mo.extension={type:[x.WebGPUSystem],name:"encoder"};class Co{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:re.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const n=this._renderTargetStencilState[this._activeRenderTarget.uid];n.stencilMode=e,n.stencilReference=t;const i=this._renderer;i.pipeline.setStencilMode(e),i.encoder.renderPassEncoder.setStencilReference(t)}destroy(){}}Co.extension={type:[x.WebGPUSystem],name:"stencil"};const ze=128;class Bo{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._batchBuffer=new Zd({minUniformOffsetAlignment:ze});const t=256/ze;for(let n=0;n<t;n++){let i=$.UNIFORM|$.COPY_DST;n===0&&(i|=$.COPY_SRC),this._buffers.push(new ce({data:this._batchBuffer.data,usage:i}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){for(const e in this._bindGroupHash)this._bindGroupHash[e]=null;this._batchBuffer.clear()}getUniformBindGroup(e,t){if(!t&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.uniformBuffer.ensureUniformGroup(e);const n=e.buffer.data,i=this._batchBuffer.addEmptyGroup(n.length);return this._renderer.uniformBuffer.syncUniformGroup(e,this._batchBuffer.data,i/4),this._bindGroupHash[e.uid]=this._getBindGroup(i/ze),this._bindGroupHash[e.uid]}getUniformBufferResource(e){this._renderer.uniformBuffer.updateUniformGroup(e);const t=e.buffer.data,n=this._batchBuffer.addGroup(t);return this._getBufferResource(n/ze)}getArrayBindGroup(e){const t=this._batchBuffer.addGroup(e);return this._getBindGroup(t/ze)}getArrayBufferResource(e){const t=this._batchBuffer.addGroup(e)/ze;return this._getBufferResource(t)}_getBufferResource(e){if(!this._bufferResources[e]){const t=this._buffers[e%2];this._bufferResources[e]=new un({buffer:t,offset:(e/2|0)*256,size:ze})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){const t=new Te({0:this._getBufferResource(e)});this._bindGroups[e]=t}return this._bindGroups[e]}_uploadBindGroups(){const e=this._renderer.buffer,t=this._buffers[0];t.update(this._batchBuffer.byteIndex),e.updateBuffer(t);const n=this._renderer.gpu.device.createCommandEncoder();for(let i=1;i<this._buffers.length;i++){const s=this._buffers[i];n.copyBufferToBuffer(e.getGPUBuffer(t),ze,e.getGPUBuffer(s),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([n.finish()])}destroy(){for(let e=0;e<this._bindGroups.length;e++)this._bindGroups[e].destroy();this._bindGroups=null,this._bindGroupHash=null;for(let e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers=null;for(let e=0;e<this._bufferResources.length;e++)this._bufferResources[e].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._bindGroupHash=null,this._renderer=null}}Bo.extension={type:[x.WebGPUPipes],name:"uniformBatch"};class px extends Te{constructor(){super({0:new ce({data:new Float32Array(128),usage:$.UNIFORM|$.COPY_DST})})}get buffer(){return this.resources[0]}get data(){return this.resources[0].data}}class Ro{constructor(e){this._activeBindGroups=[],this._activeBindGroupIndex=0,this._renderer=e}getUniformBindGroup(e){const t=this._renderer;t.uniformBuffer.ensureUniformGroup(e);const n=W.get(px);return t.uniformBuffer.syncUniformGroup(e,n.data,0),n.buffer.update(e.buffer.data.byteLength),this._activeBindGroups[this._activeBindGroupIndex++]=n,n}renderEnd(){for(let e=0;e<this._activeBindGroupIndex;e++)W.return(this._activeBindGroups[e]);this._activeBindGroupIndex=0}}Ro.extension={type:[x.WebGPUPipes],name:"uniformBuffer"};const fx={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function mx(r,e,t,n,i,s,o,a){return r<<26|e<<18|o<<14|t<<8|n<<3|a<<1|i<<4|s}class ko{constructor(e){this._moduleCache=Object.create(null),this._bufferLayoutsCache=Object.create(null),this._pipeCache=Object.create(null),this._colorMask=15,this._multisampleCount=1,this._renderer=e}contextChange(e){this._gpu=e,this.setStencilMode(re.DISABLED)}setMultisampleCount(e){this._multisampleCount=e}setColorMask(e){this._colorMask=e}setStencilMode(e){this._stencilMode=e,this._stencilState=Me[e]}setPipeline(e,t,n,i){const s=this.getPipeline(e,t,n);i.setPipeline(s)}getPipeline(e,t,n,i){e._layoutKey||this._generateBufferKey(e),t._layoutKey||(this._generateProgramKey(t),this._renderer.shader.createProgramLayout(t)),i=i||e.topology;const s=mx(e._layoutKey,t._layoutKey,n.data,n._blendModeId,this._stencilMode,this._multisampleCount,this._colorMask,fx[i]);return this._pipeCache[s]?this._pipeCache[s]:(this._pipeCache[s]=this._createPipeline(e,t,n,i),this._pipeCache[s])}_createPipeline(e,t,n,i){const s=this._gpu.device,o=this._createVertexBufferLayouts(e),a=this._renderer.state.getColorTargets(n);let l=this._stencilState;l=Me[this._stencilMode],a[0].writeMask=this._stencilMode===re.RENDERING_MASK_ADD?0:this._colorMask;const u={vertex:{module:this._getModule(t.vertex.source),entryPoint:t.vertex.entryPoint,buffers:o},fragment:{module:this._getModule(t.fragment.source),entryPoint:t.fragment.entryPoint,targets:a},primitive:{topology:i,cullMode:n.cullMode},layout:t._gpuLayout.pipeline,multisample:{count:this._multisampleCount},depthStencil:l,label:"PIXI Pipeline"};return s.createRenderPipeline(u)}_getModule(e){return this._moduleCache[e]||this._createModule(e)}_createModule(e){const t=this._gpu.device;return this._moduleCache[e]=t.createShaderModule({code:e}),this._moduleCache[e]}_generateProgramKey(e){const{vertex:t,fragment:n}=e,i=t.source+n.source+t.entryPoint+n.entryPoint;return e._layoutKey=Mr(i,"program"),e._layoutKey}_generateBufferKey(e){const t=[];let n=0;const i=Object.keys(e.attributes).sort();for(let o=0;o<i.length;o++){const a=e.attributes[i[o]];t[n++]=a.shaderLocation,t[n++]=a.offset,t[n++]=a.format,t[n++]=a.stride}const s=t.join("");return e._layoutKey=Mr(s,"geometry"),e._layoutKey}_createVertexBufferLayouts(e){if(this._bufferLayoutsCache[e._layoutKey])return this._bufferLayoutsCache[e._layoutKey];const t=[];return e.buffers.forEach(n=>{const i={arrayStride:0,stepMode:"vertex",attributes:[]},s=i.attributes;for(const o in e.attributes){const a=e.attributes[o];a.buffer===n&&(i.arrayStride=a.stride,s.push({shaderLocation:a.shaderLocation,offset:a.offset,format:a.format}))}s.length&&t.push(i)}),this._bufferLayoutsCache[e._layoutKey]=t,t}destroy(){throw new Error("Method not implemented.")}}ko.extension={type:[x.WebGPUSystem],name:"pipeline"};class tp{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}const gx=[0,0,0,0];class Oo{constructor(e){this.rootProjectionMatrix=new R,this.onRenderTargetChange=new an("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e}renderStart({target:e,clear:t,clearColor:n}){this.rootRenderTarget=this.getRenderTarget(e),this.rootProjectionMatrix=this.rootRenderTarget.projectionMatrix,this.renderingToScreen=Ss(this.rootRenderTarget),this._renderTargetStack.length=0,this._renderer.encoder.start(),this.push(this.rootRenderTarget,t,n!=null?n:this._renderer.background.colorRgba)}contextChange(e){this._gpu=e}bind(e,t=!0,n){const i=this.getRenderTarget(e),s=this.renderTarget!==i;return this.renderTarget=i,this._startRenderPass(t,n),s&&this.onRenderTargetChange.emit(i),i}_getGpuColorTexture(e){const t=this._getGpuRenderTarget(e);return t.contexts[0]?t.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,t,n){typeof t=="boolean"&&(t=t?ve.ALL:ve.NONE);const i=this._getGpuRenderTarget(e),s=e.colorTextures.map((a,l)=>{const u=i.contexts[l];let h,c;u?h=u.getCurrentTexture().createView():h=this._renderer.texture.getTextureView(a),i.msaaTextures[l]&&(c=h,h=this._renderer.texture.getTextureView(i.msaaTextures[l]));const p=t&ve.COLOR?"clear":"load";return{view:h,resolveTarget:c,clearValue:n||gx,storeOp:"store",loadOp:p}});let o;if(e.depthTexture){const a=t&ve.STENCIL?"clear":"load";o={view:this._renderer.texture.getGpuSource(e.depthTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:a}}return{colorAttachments:s,depthStencilAttachment:o}}clear(e=ve.ALL,t){e&&this._startRenderPass(e,t)}push(e,t=ve.ALL,n){const i=this.bind(e,t,n);return this._renderTargetStack.push(i),i}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}copyToTexture(e,t,n,i){const s=this._renderer,o=s.renderTarget._getGpuColorTexture(e),a=s.texture.getGpuSource(t.source);return s.encoder.commandEncoder.copyTextureToTexture({texture:o,origin:n},{texture:a},i),t}restart(){this.bind(this.rootRenderTarget,ve.NONE)}destroy(){}_startRenderPass(e=!0,t){const n=this.renderTarget,i=this._getGpuRenderTarget(n);(n.width!==i.width||n.height!==i.height)&&this._resizeGpuRenderTarget(n);const s=this.getDescriptor(n,e,t);i.descriptor=s,this._renderer.encoder.beginRenderPass(n,i),this._renderer.pipeline.setMultisampleCount(i.msaaSamples)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=ln(e)),e instanceof St?t=e:e instanceof A&&(t=new St({colorTextures:[e],depthTexture:e.source.depthStencil})),t.isRoot=!0,this._renderSurfaceToRenderTargetHash.set(e,t),t}_getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){e.isRoot=!0;const t=new tp;return e.colorTextures.forEach((n,i)=>{if(n.source.resource instanceof HTMLCanvasElement){const s=e.colorTexture.source.resource.getContext("webgpu");try{s.configure({device:this._gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"})}catch(o){console.error(o)}t.contexts[i]=s}if(t.msaa=n.source.antialias,n.source.antialias){const s=new ae({width:0,height:0,sampleCount:4});t.msaaTextures[i]=s}}),t.msaa&&(t.msaaSamples=4,e.depthTexture&&(e.depthTexture.source.sampleCount=4)),this._gpuRenderTargetHash[e.uid]=t,t}_resizeGpuRenderTarget(e){const t=this._getGpuRenderTarget(e);t.width=e.width,t.height=e.height,t.msaa&&e.colorTextures.forEach((n,i)=>{const s=t.msaaTextures[i];s==null||s.resize(n.source.width,n.source.height,n.source._resolution)})}}Oo.extension={type:[x.WebGPUSystem],name:"renderTarget"};class Fo{contextChange(e){this._gpu=e}createProgramLayout(e){const t=this._gpu.device;if(!e._gpuLayout)if(e.gpuLayout){const n=e.gpuLayout.map(s=>t.createBindGroupLayout({entries:s})),i={bindGroupLayouts:n};e._gpuLayout={bindGroups:n,pipeline:t.createPipelineLayout(i)}}else e._gpuLayout={bindGroups:null,pipeline:"auto"}}destroy(){throw new Error("Method not implemented.")}}Fo.extension={type:[x.WebGPUSystem],name:"shader"};const be={};be.normal={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},be.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}},be.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}},be.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},be.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},be.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}},be["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},be["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}},be["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}},be.erase={alpha:{srcFactor:"zero",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"one-minus-src",operation:"add"}};class Uo{constructor(){this.defaultState=new _e,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:be[e.blendMode]||be.normal}]}destroy(){this.gpu=null}}Uo.extension={type:[x.WebGPUSystem],name:"state"};const rp={type:"image",upload(r,e,t){const n=r.resource,i=(r.pixelWidth|0)*(r.pixelHeight|0),s=n.byteLength/i;t.device.queue.writeTexture({texture:e},n,{offset:0,rowsPerImage:r.pixelWidth,bytesPerRow:r.pixelWidth*s},{width:r.pixelWidth,height:r.pixelHeight,depthOrArrayLayers:1})}},np={type:"image",upload(r,e,t){var n,i;const s=r.resource;if(!s)return;const o=((n=r.resource)==null?void 0:n.width)||r.pixelWidth,a=((i=r.resource)==null?void 0:i.height)||r.pixelHeight;t.device.queue.copyExternalImageToTexture({source:s},{texture:e},{width:o,height:a})}};class ip{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let t=this.pipelines[e];return t||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
                        var<private> pos : array<vec2<f32>, 3> = array<vec2<f32>, 3>(
                        vec2<f32>(-1.0, -1.0), vec2<f32>(-1.0, 3.0), vec2<f32>(3.0, -1.0));

                        struct VertexOutput {
                        @builtin(position) position : vec4<f32>,
                        @location(0) texCoord : vec2<f32>,
                        };

                        @vertex
                        fn vertexMain(@builtin(vertex_index) vertexIndex : u32) -> VertexOutput {
                        var output : VertexOutput;
                        output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
                        output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
                        return output;
                        }

                        @group(0) @binding(0) var imgSampler : sampler;
                        @group(0) @binding(1) var img : texture_2d<f32>;

                        @fragment
                        fn fragmentMain(@location(0) texCoord : vec2<f32>) -> @location(0) vec4<f32> {
                        return textureSample(img, imgSampler, texCoord);
                        }
                    `})),t=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=t),t}generateMipmap(e){const t=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let n=e;const i=e.depthOrArrayLayers||1,s=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!s){const l={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};n=this.device.createTexture(l)}const o=this.device.createCommandEncoder({}),a=t.getBindGroupLayout(0);for(let l=0;l<i;++l){let u=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),h=s?1:0;for(let c=1;c<e.mipLevelCount;++c){const p=n.createView({baseMipLevel:h++,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),d=o.beginRenderPass({colorAttachments:[{view:p,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),f=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:u}]});d.setPipeline(t),d.setBindGroup(0,f),d.draw(3,1,0,0),d.end(),u=p}}if(!s){const l={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i};for(let u=1;u<e.mipLevelCount;++u)o.copyTextureToTexture({texture:n,mipLevel:u-1},{texture:e,mipLevel:u},l),l.width=Math.ceil(l.width/2),l.height=Math.ceil(l.height/2)}return this.device.queue.submit([o.finish()]),s||n.destroy(),e}}class Io{constructor(e){this.managedTextures=[],this._gpuSources=Object.create(null),this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._textureViewHash=Object.create(null),this._uploads={image:np,buffer:rp},this._renderer=e}contextChange(e){this._gpu=e}initSource(e){if(e.autoGenerateMipmaps){const i=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(i))+1}const t={size:{width:e.pixelWidth,height:e.pixelHeight},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC},n=this._gpu.device.createTexture(t);return this._gpuSources[e.uid]=n,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),n}onSourceUpdate(e){const t=this._gpuSources[e.uid];t&&(this._uploads[e.type]&&this._uploads[e.type].upload(e,t,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&(this._mipmapGenerator||(this._mipmapGenerator=new ip(this._gpu.device)),this._mipmapGenerator.generateMipmap(t)))}onSourceUnload(e){const t=this._gpuSources[e.uid];t&&(this._gpuSources[e.uid]=null,t.destroy())}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}onSourceResize(e){const t=this._gpuSources[e.uid];(t.width!==e.pixelWidth||t.height!==e.pixelHeight)&&(this.onSourceUnload(e),this.initSource(e))}_initSampler(e){return this._gpuSamplers[e.resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e.resourceId]}getGpuSampler(e){return this._gpuSamplers[e.resourceId]||this._initSampler(e)}getGpuSource(e){return this._gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){var t;return(t=this._bindGroupHash[e.id])!=null?t:this._createTextureBindGroup(e)}_createTextureBindGroup(e){const t=e.id;return this._bindGroupHash[t]=new Te({0:e.source,1:e.style}),this._bindGroupHash[t]}getTextureView(e){var t;const n=e.source;return(t=this._textureViewHash[n.uid])!=null?t:this._createTextureView(n)}_createTextureView(e){return this._textureViewHash[e.uid]=this.getGpuSource(e).createView(),this._textureViewHash[e.uid]}generateCanvas(e){const t=this._renderer,n=t.gpu.device.createCommandEncoder(),i=I.ADAPTER.createCanvas();i.width=e.source.pixelWidth,i.height=e.source.pixelHeight;const s=i.getContext("webgpu");return s.configure({device:t.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"}),n.copyTextureToTexture({texture:t.texture.getGpuSource(e.source),origin:{x:0,y:0}},{texture:s.getCurrentTexture()},{width:i.width,height:i.height}),t.gpu.device.queue.submit([n.finish()]),i}getPixels(e){const t=this.generateCanvas(e),n=Ue.getOptimalCanvasAndContext(t.width,t.height),i=n.context;i.drawImage(t,0,0);const{width:s,height:o}=t,a=i.getImageData(0,0,s,o),l=new Uint8ClampedArray(a.data.buffer);return Ue.returnCanvasAndContext(n),{pixels:l,width:s,height:o}}destroy(){throw new Error("Method not implemented.")}}Io.extension={type:[x.WebGPUSystem],name:"texture"};const vx=[...wo,Eo,Po,Io,Oo,Mo,Fo,Uo,ko,Ao,Co,So],bx=[...To,Bo,Ro],yx=[Di,fs,Xi],sp=[],op=[],ap=[];Z.handleByNamedList(x.WebGPUSystem,sp),Z.handleByNamedList(x.WebGPUPipes,op),Z.handleByNamedList(x.WebGPUPipesAdaptor,ap),Z.add(...vx,...bx,...yx);class Go extends Ls{constructor(){const e={name:"webgpu",type:Ae.WEBGPU,systems:sp,renderPipes:op,renderPipeAdaptors:ap};super(e)}}var xx={__proto__:null,WebGPURenderer:Go};function lp(r,e){e.encoder.finishRenderPass();const t=e.encoder.commandEncoder,n=I.ADAPTER.createCanvas();n.width=r.source.pixelWidth,n.height=r.source.pixelHeight;const i=n.getContext("webgpu");return i.configure({device:e.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"}),t.copyTextureToTexture({texture:e.texture.getGpuSource(r.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:n.width,height:n.height}),e.encoder.restoreRenderPass(),n}function _x(r,e){for(let t=0;t<r.length;t+=4){const n=e[t+3]=r[t+3];n!==0?(e[t]=Math.round(Math.min(r[t]*255/n,255)),e[t+1]=Math.round(Math.min(r[t+1]*255/n,255)),e[t+2]=Math.round(Math.min(r[t+2]*255/n,255))):(e[t]=r[t],e[t+1]=r[t+1],e[t+2]=r[t+2])}}function up(r,e){const t=e.renderTarget.renderTarget;e.renderTarget.bind(r,!1);const n=Math.round(r.source.pixelWidth),i=Math.round(r.source.pixelHeight),s=new Uint8Array(4*n*i),o=I.ADAPTER.createCanvas();o.width=n,o.height=i;const a=e.gl;a.readPixels(Math.round(r.frameX),Math.round(r.frameY),n,i,a.RGBA,a.UNSIGNED_BYTE,s);const l=o.getContext("2d"),u=l.getImageData(0,0,n,i);_x(s,u.data),l.putImageData(u,0,0);const h=I.ADAPTER.createCanvas();h.width=n,h.height=i;const c=h.getContext("2d");return c.scale(1,-1),c.drawImage(o,0,-i),e.renderTarget.bind(t,!1),h}async function wx(r,e,t=200){let n;e instanceof Go?n=lp(r,e):n=up(r,e),await e.encoder.commandFinished;const i=n.toDataURL(),s=t;console.log(`logging texture ${r.source.width}px ${r.source.height}px`);const o=["font-size: 1px;",`padding: ${s}px 300px;`,`background: url(${i}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",o)}function Tx(r,e){const t=e.gpu.device.createCommandEncoder(),n=I.ADAPTER.createCanvas();n.width=r.source.pixelWidth,n.height=r.source.pixelHeight;const i=n.getContext("webgpu");return i.configure({device:e.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"}),t.copyTextureToTexture({texture:e.texture.getGpuSource(r.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:n.width,height:n.height}),e.gpu.device.queue.submit([t.finish()]),n}const Sx={POINTS:"point-list",LINES:"line-list",LINE_STRIP:"line-strip",TRIANGLES:"triangle-list",TRIANGLE_STRIP:"triangle-strip"},Px=new Proxy(Sx,{get(r,e){return U(N,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}}),Ax={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};function Ex(r){console.log("Render Flow"),["prerender","renderStart","render","renderEnd","postrender"].forEach(e=>{Mx(r.runners[e])})}function Mx(r){console.log(` - ${r.name}`);for(let e=0;e<r.items.length;e++)console.log(`   ${e+1}.`,r.items[e].constructor.name||"anonymous")}class Cx extends ae{constructor(){super(...arguments),this.type="buffer"}}class Bx{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}set(e,t,n){const i=t.width,s=t.height;if(n){const o=e.width/2/i,a=e.height/2/s,l=e.x/i+o,u=e.y/s+a;n=G.add(n,G.NW),this.x0=l+o*G.uX(n),this.y0=u+a*G.uY(n),n=G.add(n,2),this.x1=l+o*G.uX(n),this.y1=u+a*G.uY(n),n=G.add(n,2),this.x2=l+o*G.uX(n),this.y2=u+a*G.uY(n),n=G.add(n,2),this.x3=l+o*G.uX(n),this.y3=u+a*G.uY(n)}else this.x0=e.x/i,this.y0=e.y/s,this.x1=(e.x+e.width)/i,this.y1=e.y/s,this.x2=(e.x+e.width)/i,this.y2=(e.y+e.height)/s,this.x3=e.x/i,this.y3=(e.y+e.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}function Rx(r,e){if(r===16777215||!e)return e;if(e===16777215||!r)return r;const t=r>>16&255,n=r>>8&255,i=r&255,s=e>>16&255,o=e>>8&255,a=e&255,l=t*s/255,u=n*o/255,h=i*a/255;return(l<<16)+(u<<8)+h}function kx(r,e,t){const n=r.a,i=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty,u=e.a,h=e.b,c=e.c,p=e.d;t.a=n*u+i*c,t.b=n*h+i*p,t.c=s*u+o*c,t.d=s*h+o*p,t.tx=a*u+l*c+e.tx,t.ty=a*h+l*p+e.ty}function hp(r){const e=r._stroke,t=r._fill;return["transform-origin: top left","display: inline-block",`color: ${xn(t.color)}`,`font-size: ${r.fontSize}px`,`font-family: ${r.fontFamily}`,`font-weight: ${r.fontWeight}`,`font-style: ${r.fontStyle}`,`font-variant: ${r.fontVariant}`,`letter-spacing: ${r.letterSpacing}px`,`text-align: ${r.align}`,`padding: ${r.padding}px`,`white-space: ${r.whiteSpace}`,...r.lineHeight?[`line-height: ${r.lineHeight}px`]:[],...r.wordWrap?[`word-wrap: ${r.breakWords?"break-all":"break-word"}`,`max-width: ${r.wordWrapWidth}px`]:[],...e?[`-webkit-text-stroke-width: ${e.width}px`,`-webkit-text-stroke-color: ${xn(e.fill)}`,`text-stroke-width: ${e.width}px`,`text-stroke-color: ${xn(e.color)}`,"paint-order: stroke"]:[],...r.dropShadow?[Ox(r.dropShadow)]:[],...r.cssOverrides].join(";")}function Ox(r){let e=xn(r.color);const t=r.alpha,n=Math.round(Math.cos(r.angle)*r.distance),i=Math.round(Math.sin(r.angle)*r.distance);e.startsWith("#")&&t<1&&(e+=(t*255|0).toString(16).padStart(2,"0"));const s=`${n}px ${i}px`;return r.blur>0?`text-shadow: ${s} ${r.blur}px ${e}`:`text-shadow: ${s} ${e}`}function xn(r){return Array.isArray(r)&&(r=ad(r)),typeof r=="number"?Zs(r):r}class Mt extends ut{constructor(e){var t;super(e),this._cssOverrides=[],(t=this.cssOverrides)!=null||(this.cssOverrides=e.cssOverrides)}set cssOverrides(e){this._cssOverrides=e instanceof Array?e:[e],this.update()}get cssOverrides(){return this._cssOverrides}_generateKey(){return this._styleKey=Ks(this)+this._cssOverrides.join("-"),this._styleKey}update(){this._cssStyle=null,super.update()}clone(){return new Mt({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,cssOverrides:this.cssOverrides})}get cssStyle(){return this._cssStyle||(this._cssStyle=hp(this)),this._cssStyle}addOverride(...e){const t=e.filter(n=>!this.cssOverrides.includes(n));t.length>0&&(this.cssOverrides.push(...t),this.update())}removeOverride(...e){const t=e.filter(n=>this.cssOverrides.includes(n));t.length>0&&(this.cssOverrides=this.cssOverrides.filter(n=>!t.includes(n)),this.update())}set fill(e){typeof e!="string"&&typeof e!="number"&&console.warn("[HTMLTextStyle] only color fill is not supported by HTMLText"),super.fill=e}set stroke(e){e&&typeof e!="string"&&typeof e!="number"&&console.warn("[HTMLTextStyle] only color stroke is not supported by HTMLText"),super.stroke=e}}function Lo(r,e){return e instanceof ut||e instanceof Mt?e:r==="html"?new Mt(e):new ut(e)}const Fx={canvas:"text",html:"htmlText",bitmap:"bitmapText"};let Ux=0;const _n=class{constructor(r){this.uid=Ux++,this.renderPipeId="text",this.owner=vt,this.batched=!0,this._autoResolution=_n.defaultAutoResolution,this._resolution=_n.defaultResolution,this._didUpdate=!0,this._bounds=[0,1,0,0],this._boundsDirty=!0;var e,t,n;this.text=(e=r.text)!=null?e:"";const i=(t=r.renderMode)!=null?t:this._detectRenderType(r.style);this._renderMode=i,this._style=Lo(i,r.style),this.renderPipeId=Fx[i],this.anchor=new ne(this,0,0),this._resolution=(n=r.resolution)!=null?n:_n.defaultResolution,this._autoResolution=!r.resolution}set text(r){r=r.toString(),this._text!==r&&(this._text=r,this.onUpdate())}get text(){return this._text}get style(){return this._style}set style(r){var e;r=r||{},(e=this._style)==null||e.off("update",this.onUpdate,this),this._style=Lo(this._renderMode,r),this._style.on("update",this.onUpdate,this),this.onUpdate()}set resolution(r){this._resolution=r}get resolution(){return this._resolution}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[1],e[2],e[3])}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],n=-e*this.anchor.x;let i=0;return r.x>=n&&r.x<n+e&&(i=-t*this.anchor.y,r.y>=i&&r.y<i+t)}onUpdate(){this._didUpdate=!0,this._boundsDirty=!0,this.owner.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}`}_updateBounds(){const r=this._bounds,e=this._style.padding;if(this.renderPipeId==="bitmapText"){const t=so.measureText(this.text,this._style),n=t.scale,i=t.offsetY*n;r[0]=-e,r[1]=i-e,r[2]=t.width*n-e,r[3]=t.height*n+i-e}else if(this.renderPipeId==="htmlText"){const t=Td(this.text,this._style);r[0]=-e,r[1]=-e,r[2]=t.width-e,r[3]=t.height-e}else{const t=te.measureText(this.text,this._style);r[0]=-e,r[1]=-e,r[2]=t.width-e,r[3]=t.height-e}}_detectRenderType(r){return r instanceof Mt?"html":ee.has(r==null?void 0:r.fontFamily)?"bitmap":"canvas"}destroy(r=!1){this.owner=null,this._bounds=null,this.anchor=null,this._style.destroy(r),this._style=null,this._text=null}};let wn=_n;wn.defaultResolution=1,wn.defaultAutoResolution=!0;var Ix=Object.defineProperty,cp=Object.getOwnPropertySymbols,Gx=Object.prototype.hasOwnProperty,Lx=Object.prototype.propertyIsEnumerable,dp=(r,e,t)=>e in r?Ix(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,$x=(r,e)=>{for(var t in e||(e={}))Gx.call(e,t)&&dp(r,t,e[t]);if(cp)for(var t of cp(e))Lx.call(e,t)&&dp(r,t,e[t]);return r};class $o extends Y{constructor(...e){let t=e[0];(typeof t=="string"||e[1])&&(U(N,'use new Text({ text: "hi!", style }) instead'),t={text:t,style:e[1]}),super($x({view:new wn(t),label:"Text"},t))}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}set text(e){this.view.text=e}get text(){return this.view.text}set style(e){this.view.style=e}get style(){return this.view.style}}class Dx extends $o{constructor(...e){U(N,'use new Text({ text: "hi!", style, renderMode: "bitmap" }) instead');let t=e[0];(typeof t=="string"||e[1])&&(t={text:t,style:e[1]}),t.renderMode="bitmap",super(t)}}class zx extends $o{constructor(...e){U(N,'use new Text({ text: "hi!", style, renderMode: "html" }) instead');let t=e[0];(typeof t=="string"||e[1])&&(t={text:t,style:e[1]}),t.renderMode="html",super(t)}}var Do=/iPhone/i,pp=/iPod/i,fp=/iPad/i,mp=/\biOS-universal(?:.+)Mac\b/i,zo=/\bAndroid(?:.+)Mobile\b/i,gp=/Android/i,Et=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,Tn=/Silk/i,Ie=/Windows Phone/i,vp=/\bWindows(?:.+)ARM\b/i,bp=/BlackBerry/i,yp=/BB10/i,xp=/Opera Mini/i,_p=/\b(CriOS|Chrome)(?:.+)Mobile/i,wp=/Mobile(?:.+)Firefox\b/i,Tp=function(r){return typeof r!="undefined"&&r.platform==="MacIntel"&&typeof r.maxTouchPoints=="number"&&r.maxTouchPoints>1&&typeof MSStream=="undefined"};function Nx(r){return function(e){return e.test(r)}}function Sp(r){var e={userAgent:"",platform:"",maxTouchPoints:0};!r&&typeof navigator!="undefined"?e={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0}:typeof r=="string"?e.userAgent=r:r&&r.userAgent&&(e={userAgent:r.userAgent,platform:r.platform,maxTouchPoints:r.maxTouchPoints||0});var t=e.userAgent,n=t.split("[FBAN");typeof n[1]!="undefined"&&(t=n[0]),n=t.split("Twitter"),typeof n[1]!="undefined"&&(t=n[0]);var i=Nx(t),s={apple:{phone:i(Do)&&!i(Ie),ipod:i(pp),tablet:!i(Do)&&(i(fp)||Tp(e))&&!i(Ie),universal:i(mp),device:(i(Do)||i(pp)||i(fp)||i(mp)||Tp(e))&&!i(Ie)},amazon:{phone:i(Et),tablet:!i(Et)&&i(Tn),device:i(Et)||i(Tn)},android:{phone:!i(Ie)&&i(Et)||!i(Ie)&&i(zo),tablet:!i(Ie)&&!i(Et)&&!i(zo)&&(i(Tn)||i(gp)),device:!i(Ie)&&(i(Et)||i(Tn)||i(zo)||i(gp))||i(/\bokhttp\b/i)},windows:{phone:i(Ie),tablet:i(vp),device:i(Ie)||i(vp)},other:{blackberry:i(bp),blackberry10:i(yp),opera:i(xp),firefox:i(wp),chrome:i(_p),device:i(bp)||i(yp)||i(xp)||i(wp)||i(_p)},any:!1,phone:!1,tablet:!1};return s.any=s.apple.device||s.android.device||s.windows.device||s.other.device,s.phone=s.apple.phone||s.android.phone||s.windows.phone,s.tablet=s.apple.tablet||s.android.tablet||s.windows.tablet,s}var Pp;const Wx=(Pp=Sp.default)!=null?Pp:Sp,Hx=Wx(globalThis.navigator);class Ap{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e!=null?e:new R,this.observer=t,this.position=new ne(this,0,0),this.scale=new ne(this,1,1),this.pivot=new ne(this,0,0),this.skew=new ne(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}onUpdate(e){var t;this.dirty=!0,e===this.skew&&this.updateSkew(),(t=this.observer)==null||t.onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.updateSkew())}}var jx=Object.defineProperty,Ep=Object.getOwnPropertySymbols,Vx=Object.prototype.hasOwnProperty,Yx=Object.prototype.propertyIsEnumerable,Mp=(r,e,t)=>e in r?jx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Cp=(r,e)=>{for(var t in e||(e={}))Vx.call(e,t)&&Mp(r,t,e[t]);if(Ep)for(var t of Ep(e))Yx.call(e,t)&&Mp(r,t,e[t]);return r};let Xx=0;const Bp=class{constructor(r){this.owner=vt,this.uid=Xx++,this.renderPipeId="tilingSprite",this.batched=!0,this._bounds=[0,1,0,0],this._boundsDirty=!0,r=Cp(Cp({},Bp.defaultOptions),r),this.anchor=new ne(this,0,0),this._applyAnchorToTexture=r.applyAnchorToTexture,this.texture=r.texture,this._width=r.width,this._height=r.height,this._tileTransform=new Ap({observer:this})}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}set texture(r){this._texture!==r&&(this._texture=r,this.onUpdate())}get texture(){return this._texture}set width(r){this._width=r,this.onUpdate()}get width(){return this._width}set height(r){this._height=r,this.onUpdate()}get height(){return this._height}_updateBounds(){const r=this._bounds,e=this.anchor,t=this._width,n=this._height;r[1]=-e._x*t,r[0]=r[1]+t,r[3]=-e._y*n,r[2]=r[3]+n}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[2],e[1],e[3])}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],n=-e*this.anchor.x;let i=0;return r.x>=n&&r.x<n+e&&(i=-t*this.anchor.y,r.y>=i&&r.y<i+t)}onUpdate(){this._boundsDirty=!0,this._didUpdate=!0,this.owner.onViewUpdate()}destroy(r=!1){if(this.anchor=null,this._tileTransform=null,this._bounds=null,typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._texture.destroy(e)}this._texture=null}};let No=Bp;No.defaultOptions={texture:A.WHITE,width:256,height:256,applyAnchorToTexture:!1};var qx=Object.defineProperty,Rp=Object.getOwnPropertySymbols,Kx=Object.prototype.hasOwnProperty,Zx=Object.prototype.propertyIsEnumerable,kp=(r,e,t)=>e in r?qx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Qx=(r,e)=>{for(var t in e||(e={}))Kx.call(e,t)&&kp(r,t,e[t]);if(Rp)for(var t of Rp(e))Zx.call(e,t)&&kp(r,t,e[t]);return r};class Jx extends Y{constructor(e){super(Qx({view:new No(e),label:"TilingSprite"},e))}set texture(e){this.view.texture=e}get texture(){return this.view.texture}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get width(){return this.view.width}set width(e){this.view.width=e}get height(){return this.view.height}set height(e){this.view.height=e}get tilePosition(){return this.view._tileTransform.position}set tilePosition(e){this.view._tileTransform.position.copyFrom(e)}get tileScale(){return this.view._tileTransform.scale}set tileScale(e){this.view._tileTransform.scale.copyFrom(e)}set tileRotation(e){this.view._tileTransform.rotation=e}get tileRotation(){return this.view._tileTransform.rotation}get tileTransform(){return this.view._tileTransform}}let Wo;async function e_(){return Wo!=null||(Wo=(async()=>{var r;const e=document.createElement("canvas").getContext("webgl");if(!e)return ht.UNPACK;const t=await new Promise(o=>{const a=document.createElement("video");a.onloadeddata=()=>o(a),a.onerror=()=>o(null),a.autoplay=!1,a.crossOrigin="anonymous",a.preload="auto",a.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",a.load()});if(!t)return ht.UNPACK;const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);const s=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,s),e.deleteFramebuffer(i),e.deleteTexture(n),(r=e.getExtension("WEBGL_lose_context"))==null||r.loseContext(),s[0]<=s[3]?ht.PMA:ht.UNPACK})()),Wo}const t_=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;var r_=Object.defineProperty,n_=Object.defineProperties,i_=Object.getOwnPropertyDescriptors,Op=Object.getOwnPropertySymbols,s_=Object.prototype.hasOwnProperty,o_=Object.prototype.propertyIsEnumerable,Fp=(r,e,t)=>e in r?r_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Up=(r,e)=>{for(var t in e||(e={}))s_.call(e,t)&&Fp(r,t,e[t]);if(Op)for(var t of Op(e))o_.call(e,t)&&Fp(r,t,e[t]);return r},a_=(r,e)=>n_(r,i_(e));const l_=["#000080","#228B22","#8B0000","#4169E1","#008080","#800000","#9400D3","#FF8C00","#556B2F","#8B008B"];let u_=0;function Ip(r,e=0,t={color:"#000000"}){r.isLayerRoot&&(t.color=l_[u_++]);let n="";for(let o=0;o<e;o++)n+="    ";let i=r.label;!i&&r instanceof Ce&&(i=`sprite:${r.view.texture.label}`);let s=`%c ${n}|- ${i} (worldX:${r.worldTransform.tx}, layerX:${r.layerTransform.tx}, localX:${r.x})`;r.isLayerRoot&&(s+=" (LayerGroup)"),r.filters&&(s+="(*filters)"),console.log(s,`color:${t.color}; font-weight:bold;`),e++;for(let o=0;o<r.children.length;o++){const a=r.children[o];Ip(a,e,Up({},t))}}function Gp(r,e=0,t={index:0,color:"#000000"}){let n="";for(let s=0;s<e;s++)n+="    ";const i=`%c ${n}- ${t.index}: ${r.root.label} worldX:${r.worldTransform.tx}`;console.log(i,`color:${t.color}; font-weight:bold;`),e++;for(let s=0;s<r.layerGroupChildren.length;s++){const o=r.layerGroupChildren[s];Gp(o,e,a_(Up({},t),{index:s}))}}var h_=`fn getLuminosity(c: vec3<f32>) -> f32 {
  return 0.3 * c.r + 0.59 * c.g + 0.11 * c.b;
}

fn setLuminosity(c: vec3<f32>, lum: f32) -> vec3<f32> {
  let d: f32 = lum - getLuminosity(c);
  let newColor: vec3<f32> = c.rgb + vec3<f32>(d, d, d);

  // clip back into legal range
  let newLum: f32 = getLuminosity(newColor);
  let cMin: f32 = min(newColor.r, min(newColor.g, newColor.b));
  let cMax: f32 = max(newColor.r, max(newColor.g, newColor.b));

  let t1: f32 = newLum / (newLum - cMin);
  let t2: f32 = (1.0 - newLum) / (cMax - newLum);

  let finalColor = mix(vec3<f32>(newLum, newLum, newLum), newColor, select(select(1.0, t2, cMax > 1.0), t1, cMin < 0.0));

  return finalColor;
}

fn getSaturation(c: vec3<f32>) -> f32 {
  return max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
}

// Set saturation if color components are sorted in ascending order.
fn setSaturationMinMidMax(cSorted: vec3<f32>, s: f32) -> vec3<f32> {
  var result: vec3<f32>;
  if (cSorted.z > cSorted.x) {
    let newY = (((cSorted.y - cSorted.x) * s) / (cSorted.z - cSorted.x));
    result = vec3<f32>(0.0, newY, s);
  } else {
    result = vec3<f32>(0.0, 0.0, 0.0);
  }
  return vec3<f32>(result.x, result.y, result.z);
}

fn setSaturation(c: vec3<f32>, s: f32) -> vec3<f32> {
    var result: vec3<f32> = c;

    if (c.r <= c.g && c.r <= c.b) {
        if (c.g <= c.b) {
            result = setSaturationMinMidMax(result, s);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.r, result.b, result.g);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.r, temp.b, temp.g);
        }
    } else if (c.g <= c.r && c.g <= c.b) {
        if (c.r <= c.b) {
            var temp: vec3<f32> = vec3<f32>(result.g, result.r, result.b);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.g, temp.r, temp.b);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.g, result.b, result.r);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.g, temp.b, temp.r);
        }
    } else {
        if (c.r <= c.g) {
            var temp: vec3<f32> = vec3<f32>(result.b, result.r, result.g);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.b, temp.r, temp.g);
        } else {
            var temp: vec3<f32> = vec3<f32>(result.b, result.g, result.r);
            temp = setSaturationMinMidMax(temp, s);
            result = vec3<f32>(temp.b, temp.g, temp.r);
        }
    }

    return result;
}`;export{ht as ALPHA_MODES,Ln as AbstractBitmapFont,Ls as AbstractRenderer,hu as AlphaFilter,ci as AlphaMask,hs as AlphaMaskPipe,En as AnimatedSprite,mi as Application,Kt as Assets,Yl as AssetsClass,pr as BUFFER_TYPE,Gl as BackgroundLoader,gn as BackgroundSystem,sr as Batch,bh as BatchGeometry,ir as BatchTextureArray,Qr as BatchableGraphics,nc as BatchableMesh,fn as BatchableSprite,zi as Batcher,Ni as BatcherPipe,yv as BatcherStyleSource,W as BigPool,Te as BindGroup,So as BindGroupSystem,$n as BitmapFont,so as BitmapFontManager,Dx as BitmapText,oo as BitmapTextPipe,Q as BlendModeFilter,fo as BlendModePipe,Ou as BlurFilter,Jt as BlurFilterPass,le as Bounds,Qo as BrowserAdapter,ce as Buffer,Cx as BufferImageSource,un as BufferResource,Po as BufferSystem,$ as BufferUsage,ve as CLEAR,ee as Cache,Ue as CanvasPool,ld as CanvasPoolClass,xc as CanvasSource,te as CanvasTextMetrics,ao as CanvasTextPipe,lo as CanvasTextSystem,Sn as Circle,di as ColorMask,cs as ColorMaskPipe,Lg as ColorMatrixFilter,Nn as ColorNames,Y as Container,t_ as DATA_URI,ca as DEG_TO_RAD,Js as DEPRECATED_SCALE_MODES,Qs as DEPRECATED_WRAP_MODES,Px as DRAW_MODES,$g as DisplacementFilter,ro as DynamicBitmapFont,Pn as Ellipse,_l as EventBoundary,oe as EventEmitter,jt as EventSystem,Oe as EventsTicker,x as ExtensionType,go as ExtractSystem,Sl as FederatedContainer,_r as FederatedEvent,Wt as FederatedMouseEvent,xe as FederatedPointerEvent,nt as FederatedWheelEvent,Je as FillGradient,Fr as FillPattern,Se as Filter,Gr as FilterEffect,Hi as FilterPipe,ji as FilterSystem,br as FontStylePromiseCache,Si as GAUSSIAN_VALUES,Ax as GLSL_TO_STD40_SIZE,on as GL_FORMATS,bs as GL_TARGETS,z as GL_TYPES,hc as GL_WRAP_MODES,vo as GenerateTextureSystem,tr as Geometry,_s as GlBackBufferSystem,Ii as GlBatchAdaptor,uc as GlBuffer,vs as GlBufferSystem,ws as GlColorMaskSystem,sn as GlContextSystem,Ts as GlEncoderSystem,xs as GlGeometrySystem,Vi as GlGraphicsAdaptor,ps as GlMeshAdaptor,he as GlProgram,Tc as GlProgramData,fc as GlRenderTarget,As as GlRenderTargetSystem,ks as GlShaderSystem,Us as GlStateSystem,Es as GlStencilSystem,Fc as GlTexture,Gs as GlTextureSystem,Os as GlUniformGroupSystem,bo as GlobalUniformSystem,Di as GpuBatchAdaptor,be as GpuBlendModesToPixi,Ao as GpuColorMaskSystem,Eo as GpuDeviceSystem,Mo as GpuEncoderSystem,Xi as GpuGraphicsAdaptor,Qh as GpuGraphicsContext,fs as GpuMeshAdapter,ip as GpuMipmapGenerator,me as GpuProgram,ux as GpuReadBuffer,tp as GpuRenderTarget,Oo as GpuRenderTargetSystem,Fo as GpuShaderSystem,Uo as GpuStateSystem,Me as GpuStencilModesToPixi,Co as GpuStencilSystem,Io as GpuTextureSystem,Bo as GpuUniformBatchPipe,Ro as GpuUniformBufferPipe,Xv as Graphics,$e as GraphicsContext,Jh as GraphicsContextRenderData,ls as GraphicsContextSystem,dt as GraphicsPath,us as GraphicsPipe,is as GraphicsView,zx as HTMLText,uo as HTMLTextPipe,co as HTMLTextRenderData,Mt as HTMLTextStyle,yr as HTMLTextSystem,bn as HelloSystem,_b as IGLUniformData,It as ImageSource,ii as InstructionSet,bl as LayerGroup,Ws as LayerPipe,ec as LayerRenderable,Ys as LayerSystem,Dl as Loader,Be as LoaderParserPriority,ge as MAX_TEXTURES,ud as MSAA_QUALITY,Lr as MaskEffectManager,ul as MaskEffectManagerClass,kh as MaskFilter,R as Matrix,hb as Mesh,_t as MeshGeometry,gs as MeshPipe,lc as MeshShader,rr as MeshView,On as NOOP,Oi as NineSliceGeometry,lv as NineSlicePlane,Ui as NineSliceSprite,Nu as NoiseFilter,ne as ObservablePoint,ua as PI_2,ko as PipelineSystem,ki as PlaneGeometry,H as Point,ct as Polygon,al as Pool,ll as PoolGroupClass,pn as ProxyRenderable,$s as QuadGeometry,ha as RAD_TO_DEG,X as Rectangle,St as RenderTarget,kd as RenderTexture,Ae as RendererType,Rn as ResizePlugin,Vl as Resolver,An as RoundedRectangle,Kb as SCALE_MODES,re as STENCIL_MODES,Da as SVGParser,Ra as SVGToGraphicsPath,ib as ScissorMask,rd as SdfShader,Ee as Shader,yt as ShaderStage,Ga as ShapePath,To as SharedRenderPipes,wo as SharedSystems,qu as ShockwaveFilter,Ce as Sprite,Xs as SpritePipe,El as SpriteView,zr as Spritesheet,_e as State,pi as StencilMask,ds as StencilMaskPipe,an as SystemRunner,$o as Text,Br as TextFormat,ut as TextStyle,wn as TextView,A as Texture,xr as TextureGCSystem,In as TextureLayout,Gn as TextureMatrix,se as TexturePool,pu as TexturePoolClass,ae as TextureSource,Ye as TextureStyle,Bx as TextureUvs,Pe as Ticker,Pr as TickerListener,Bn as TickerPlugin,Jx as TilingSprite,zs as TilingSpritePipe,Yc as TilingSpriteShader,No as TilingSpriteView,Ap as Transform,Ho as Triangle,li as UPDATE_BLEND,$r as UPDATE_COLOR,Ve as UPDATE_PRIORITY,gm as UPDATE_TRANSFORM,Dr as UPDATE_VISIBLE,Zd as UniformBufferBatch,xo as UniformBufferSystem,J as UniformGroup,_o as VERSION,yn as ViewSystem,nr as ViewableBuffer,yo as WGSL_TO_STD40_SIZE,qb as WRAP_MODES,Kd as WebGLRenderer,Go as WebGPURenderer,ti as WorkerManager,Dn as XMLFormat,zn as XMLStringFormat,ni as _getGlobalBounds,Nr as addMaskBounds,Wr as addMaskLocalBounds,wi as alphaWgsl,Xc as applyMatrix,Ol as autoDetectRenderer,Vr as batchSamplersUniformGroup,dh as batcherTemplateFrag,ph as batcherTemplateVert,Gi as batcherTemplateWgsl,fa as bitmapFontCachePlugin,Th as blendTemplateFrag,Sh as blendTemplateVert,Ph as blendTemplateWgsl,Au as blurTemplateWgsl,jn as buildAdaptiveBezier,Oa as buildAdaptiveQuadratic,Xn as buildArc,Fa as buildArcTo,Ia as buildArcToSvg,ot as buildCircle,Kh as buildContextBatches,Jv as buildGeometryFromPath,tc as buildInstructions,Nh as buildLine,ts as buildPolygon,rs as buildRectangle,os as buildSimpleUvs,ns as buildTriangle,ss as buildUvs,ga as cacheTextureArray,mc as calculateProjection,pt as checkDataUrl,ft as checkExtension,nl as childrenHelperMixin,$h as closePointEps,dr as collectAllRenderables,Hs as collectLayerGroups,lr as color32BitToUniform,Fu as colorMatrixFilterFrag,Ei as colorMatrixFilterWgsl,Sv as colorToUniform,zc as compareModeToGlCompare,Ms as compileShader,fe as convertColorToNumber,Lt as convertFillInputToFillStyle,kr as convertNumberToHex,ye as convertToList,Ar as copySearchParams,Mr as createIdFromString,Nl as createStringVariations,Ka as createTexture,Ud as createUBOElements,Ki as curveEps,Cd as defaultBackgroundOptions,Ai as defaultFilterVert,Xl as defaultUniformValue,Bs as defaultValue,U as deprecation,va as detectAvif,ya as detectDefaults,xa as detectMp4,_a as detectOgv,e_ as detectVideoAlphaMode,wa as detectWebm,Ta as detectWebp,Uu as displacementFrag,Iu as displacementVert,Mi as displacementWgsl,hl as effectsMixin,vt as emptyViewObserver,Ri as ensureIsBuffer,fu as ensurePrecision,Lo as ensureTextStyle,Ns as executeInstructions,Z as extensions,pd as extractFontFamilies,nu as extractStructAndGroups,wt as fastCopy,cl as findMixin,gr as fontStringFromTextStyle,jr as generateBatchGlProgram,Yr as generateBatchProgram,xh as generateBindingSrc,Tu as generateBlurFragSource,Pu as generateBlurGlProgram,Eu as generateBlurProgram,Su as generateBlurVertSource,fh as generateDefaultBatchGlProgram,_h as generateDefaultBatchProgram,Ih as generateDefaultGraphicsBatchGlProgram,Gh as generateDefaultGraphicsBatchProgram,ed as generateDefaultSdfBatchGlProgram,td as generateDefaultSdfBatchProgram,cv as generateGPULayout,iu as generateGpuLayoutGroups,hv as generateLayout,su as generateLayoutHash,Rc as generateProgram,yh as generateSampleSrc,Ks as generateTextStyleKey,it as generateUID,Id as generateUniformBufferSync,kc as generateUniformsSync,Ac as getAttributeData,Li as getBatchedGeometry,no as getBitmapTextLayout,vr as getCanvasFillStyle,ln as getCanvasTexture,sl as getFilterEffect,vd as getFontCss,Ma as getFontFamilyName,dc as getGlInfoFromFormat,$t as getGlobalBounds,Oh as getGlobalRenderableBounds,De as getLocalBounds,hi as getMatrixRelativeToParent,vu as getMaxFragmentPrecision,Dh as getOrientationOfPoints,pl as getParent,bd as getPo2TextureFromSource,si as getRenderableUID,Xa as getResolutionOfUrl,yd as getSVGUrl,xd as getTemporaryCanvasFromImage,gu as getTestContext,$i as getTextureBatchBindGroup,sb as getTextureDefaultMatrix,Ec as getUniformBufferData,Mc as getUniformData,Uc as glUploadBufferImageResource,Ic as glUploadImageResource,rp as gpuUploadBufferImageResource,np as gpuUploadImageResource,Fh as graphicsBatcherTemplateFrag,Uh as graphicsBatcherTemplateVert,Yi as graphicsBatcherTemplateWgsl,G as groupD8,mn as hex2rgb,Zs as hex2string,h_ as hslWgsl,qr as hslgl,Kr as hslgpu,Hx as isMobile,dg as isPow2,Ss as isRenderingToScreen,dd as isSafari,qt as isSingleItem,fd as loadFontAsBase64,ho as loadFontCSS,Ja as loadImageBitmap,Sa as loadJson,_d as loadSVGImage,Ya as loadSvg,ri as loadTextures,Pa as loadTxt,Ca as loadWebFont,pg as log2,wx as logDebugTexture,Gp as logLayerGroupScene,Bc as logProgramError,Ex as logRenderFlow,Ip as logScene,Tx as logTexture,Gc as mapFormatToGlFormat,Lc as mapFormatToGlInternalFormat,$c as mapFormatToGlType,Sc as mapSize,Rs as mapType,Oc as mapWebGLBlendModesToPixi,Bh as maskFrag,Rh as maskVert,Wi as maskWgsl,fl as measureMixin,oc as meshDefaultFrag,ac as meshDefaultVert,ms as meshDefaultWgsl,Ab as migrateFragmentFromV7toV8,Dc as mipmapScaleModeToGlFilter,Zr as mixColors,qi as mixHexColors,Pv as mixStandardAnd32BitColors,Rx as multiplyHexColors,st as nextPow2,Gu as noiseFrag,Ci as noiseWgsl,Ft as normalizeExtensionPriority,ml as onRenderMixin,ue as path,rl as removeItems,to as resolveCharacters,el as resolveTextureUrl,ol as returnFilterEffect,ad as rgb2hex,Ld as sayHello,Is as scaleModeToGlFilter,Qc as sdfBatcherTemplateFrag,Jc as sdfBatcherTemplateVert,qs as sdfBatcherTemplateWgsl,bu as setProgramName,yu as setProgramVersion,I as settings,Wu as shockwaveFrag,Hu as shockwaveVert,Bi as shockwaveWgsl,gl as sortMixin,Al as spritesheetAsset,Xb as string2hex,Rr as testVideoFormat,hp as textStyleToCSS,lp as textureToCanvas,up as textureToCanvasWebGL,jc as tilingSpriteFrag,Vc as tilingSpriteVert,Ds as tilingSpriteWgsl,vl as toLocalGlobalMixin,nn as transformVertices,es as triangulateWithHoles,vn as uniformBufferParsers,cn as uniformParsers,Ob as unpremultiplyAlpha,js as updateLayerGroupTransforms,qc as updateLayerTransform,ke as updateLocalTransform,Yt as updateQuadBounds,Vs as updateTransformAndChildren,Dt as updateTransformBackwards,kx as updateWorldTransform,N as v8_0_0,Zc as validateRenderables,dn as wrapModeToGlAddress,ma as xmlBitmapFontLoader};
//# sourceMappingURL=pixi.min.mjs.map
