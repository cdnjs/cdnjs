/*!
 * PixiJS - v8.0.0-beta.0
 * Compiled Mon, 25 Sep 2023 16:30:05 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Nf=Object.defineProperty,Hf=Object.defineProperties,jf=Object.getOwnPropertyDescriptors,xa=Object.getOwnPropertySymbols,Wf=Object.prototype.hasOwnProperty,Vf=Object.prototype.propertyIsEnumerable,_a=(r,e,t)=>e in r?Nf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wa=(r,e)=>{for(var t in e||(e={}))Wf.call(e,t)&&_a(r,t,e[t]);if(xa)for(var t of xa(e))Vf.call(e,t)&&_a(r,t,e[t]);return r},Yf=(r,e)=>Hf(r,jf(e)),y=(r=>(r.Renderer="renderer",r.Application="application",r.WebGLPipes="webgl-pipes",r.WebGLPipesAdaptor="webgl-pipes-adaptor",r.WebGLSystem="webgl-system",r.WebGPUPipes="webgpu-pipes",r.WebGPUPipesAdaptor="webgpu-pipes-adaptor",r.WebGPUSystem="webgpu-system",r.CanvasSystem="canvas-system",r.CanvasPipesAdaptor="canvas-pipes-adaptor",r.CanvasPipes="canvas-pipes",r.Asset="asset",r.LoadParser="load-parser",r.ResolveParser="resolve-parser",r.CacheParser="cache-parser",r.DetectionParser="detection-parser",r.MaskEffect="mask-effect",r))(y||{});const Li=r=>{if(typeof r=="function"||typeof r=="object"&&r.extension){const e=typeof r.extension!="object"?{type:r.extension}:r.extension;r=Yf(wa({},e),{ref:r})}if(typeof r=="object")r=wa({},r);else throw new Error("Invalid extension type");return typeof r.type=="string"&&(r.type=[r.type]),r},zt=(r,e)=>{var t;return(t=Li(r).priority)!=null?t:e},J={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...r){return r.map(Li).forEach(e=>{e.type.forEach(t=>{var i,n;return(n=(i=this._removeHandlers)[t])==null?void 0:n.call(i,e)})}),this},add(...r){return r.map(Li).forEach(e=>{e.type.forEach(t=>{const i=this._addHandlers,n=this._queue;i[t]?i[t](e):(n[t]=n[t]||[],n[t].push(e))})}),this},handle(r,e,t){const i=this._addHandlers,n=this._removeHandlers;i[r]=e,n[r]=t;const s=this._queue;return s[r]&&(s[r].forEach(o=>e(o)),delete s[r]),this},handleByMap(r,e){return this.handle(r,t=>{e[t.name]=t.ref},t=>{delete e[t.name]})},handleByNamedList(r,e,t=-1){return this.handle(r,i=>{e.findIndex(n=>n.name===i.name)>=0||(e.push({name:i.name,value:i.ref}),e.sort((n,s)=>zt(s.value,t)-zt(n.value,t)))},i=>{const n=e.findIndex(s=>s.name===i.name);n!==-1&&e.splice(n,1)})},handleByList(r,e,t=-1){return this.handle(r,i=>{e.includes(i.ref)||(e.push(i.ref),e.sort((n,s)=>zt(s,t)-zt(n,t)))},i=>{const n=e.indexOf(i.ref);n!==-1&&e.splice(n,1)})}};var Ke=(r=>(r[r.INTERACTION=50]="INTERACTION",r[r.HIGH=25]="HIGH",r[r.NORMAL=0]="NORMAL",r[r.LOW=-25]="LOW",r[r.UTILITY=-50]="UTILITY",r))(Ke||{});class Br{constructor(e,t=null,i=0,n=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=e,this._context=t,this.priority=i,this._once=n}match(e,t=null){return this._fn===e&&this._context===t}emit(e){this._fn&&(this._context?this._fn.call(this._context,e):this._fn(e));const t=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),t}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const t=this.next;return this.next=e?null:t,this.previous=null,t}}const ge=class{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new Br(null,null,1/0),this.deltaMS=1/ge.targetFPMS,this.elapsedMS=1/ge.targetFPMS,this._tick=r=>{this._requestId=null,this.started&&(this.update(r),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(r,e,t=Ke.NORMAL){return this._addListener(new Br(r,e,t))}addOnce(r,e,t=Ke.NORMAL){return this._addListener(new Br(r,e,t,!0))}_addListener(r){let e=this._head.next,t=this._head;if(!e)r.connect(t);else{for(;e;){if(r.priority>e.priority){r.connect(t);break}t=e,e=e.next}r.previous||r.connect(t)}return this._startIfPossible(),this}remove(r,e){let t=this._head.next;for(;t;)t.match(r,e)?t=t.destroy():t=t.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let r=0,e=this._head;for(;e=e.next;)r++;return r}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let r=this._head.next;for(;r;)r=r.destroy(!0);this._head.destroy(),this._head=null}}update(r=performance.now()){let e;if(r>this.lastTime){if(e=this.elapsedMS=r-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const n=r-this._lastFrame|0;if(n<this._minElapsedMS)return;this._lastFrame=r-n%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*ge.targetFPMS;const t=this._head;let i=t.next;for(;i;)i=i.emit(this);t.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=r}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(r){const e=Math.min(this.maxFPS,r),t=Math.min(Math.max(0,e)/1e3,ge.targetFPMS);this._maxElapsedMS=1/t}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(r){if(r===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,r);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!ge._shared){const r=ge._shared=new ge;r.autoStart=!0,r._protected=!0}return ge._shared}static get system(){if(!ge._system){const r=ge._system=new ge;r.autoStart=!0,r._protected=!0}return ge._system}};let de=ge;de.targetFPMS=.06;class Di{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,Ke.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?de.shared:new de,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Di.extension=y.Application;class zi{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,i;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,i=globalThis.innerHeight;else{const{clientWidth:n,clientHeight:s}=this._resizeTo;t=n,i=s}this.renderer.resize(t,i),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}zi.extension=y.Application,J.add(zi),J.add(Di);var Oe=(r=>(r[r.Low=0]="Low",r[r.Normal=1]="Normal",r[r.High=2]="High",r))(Oe||{});const Rr=(r,e)=>{const t=e.split("?")[1];return t&&(r+=`?${t}`),r},Ta={createCanvas:(r,e)=>{const t=document.createElement("canvas");return t.width=r,t.height=e,t},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>{var r;return(r=document.baseURI)!=null?r:window.location.href},getFontFaceSet:()=>document.fonts,fetch:(r,e)=>fetch(r,e),parseXML:r=>new DOMParser().parseFromString(r,"text/xml")},D={ADAPTER:Ta,RETINA_PREFIX:/@([0-9\.]+)x/,FAIL_IF_MAJOR_PERFORMANCE_CAVEAT:!1,RESOLUTION:1};function Pe(r){if(typeof r!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`)}function Nt(r){return r.split("?")[0].split("#")[0]}function Xf(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function qf(r,e,t){return r.replace(new RegExp(Xf(e),"g"),t)}function Kf(r,e){let t="",i=0,n=-1,s=0,o=-1;for(let a=0;a<=r.length;++a){if(a<r.length)o=r.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(n===a-1||s===1))if(n!==a-1&&s===2){if(t.length<2||i!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){const l=t.lastIndexOf("/");if(l!==t.length-1){l===-1?(t="",i=0):(t=t.slice(0,l),i=t.length-1-t.lastIndexOf("/")),n=a,s=0;continue}}else if(t.length===2||t.length===1){t="",i=0,n=a,s=0;continue}}e&&(t.length>0?t+="/..":t="..",i=2)}else t.length>0?t+=`/${r.slice(n+1,a)}`:t=r.slice(n+1,a),i=a-n-1;n=a,s=0}else o===46&&s!==-1?++s:s=-1}return t}const pe={toPosix(r){return qf(r,"\\","/")},isUrl(r){return/^https?:/.test(this.toPosix(r))},isDataUrl(r){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(r)},isBlobUrl(r){return r.startsWith("blob:")},hasProtocol(r){return/^[^/:]+:/.test(this.toPosix(r))},getProtocol(r){Pe(r),r=this.toPosix(r);const e=/^file:\/\/\//.exec(r);if(e)return e[0];const t=/^[^/:]+:\/{0,2}/.exec(r);return t?t[0]:""},toAbsolute(r,e,t){if(Pe(r),this.isDataUrl(r)||this.isBlobUrl(r))return r;const i=Nt(this.toPosix(e!=null?e:D.ADAPTER.getBaseUrl())),n=Nt(this.toPosix(t!=null?t:this.rootname(i)));return r=this.toPosix(r),r.startsWith("/")?pe.join(n,r.slice(1)):this.isAbsolute(r)?r:this.join(i,r)},normalize(r){if(Pe(r),r.length===0)return".";if(this.isDataUrl(r)||this.isBlobUrl(r))return r;r=this.toPosix(r);let e="";const t=r.startsWith("/");this.hasProtocol(r)&&(e=this.rootname(r),r=r.slice(e.length));const i=r.endsWith("/");return r=Kf(r,!1),r.length>0&&i&&(r+="/"),t?`/${r}`:e+r},isAbsolute(r){return Pe(r),r=this.toPosix(r),this.hasProtocol(r)?!0:r.startsWith("/")},join(...r){var e;if(r.length===0)return".";let t;for(let i=0;i<r.length;++i){const n=r[i];if(Pe(n),n.length>0)if(t===void 0)t=n;else{const s=(e=r[i-1])!=null?e:"";this.extname(s)?t+=`/../${n}`:t+=`/${n}`}}return t===void 0?".":this.normalize(t)},dirname(r){if(Pe(r),r.length===0)return".";r=this.toPosix(r);let e=r.charCodeAt(0);const t=e===47;let i=-1,n=!0;const s=this.getProtocol(r),o=r;r=r.slice(s.length);for(let a=r.length-1;a>=1;--a)if(e=r.charCodeAt(a),e===47){if(!n){i=a;break}}else n=!1;return i===-1?t?"/":this.isUrl(o)?s+r:s:t&&i===1?"//":s+r.slice(0,i)},rootname(r){Pe(r),r=this.toPosix(r);let e="";if(r.startsWith("/")?e="/":e=this.getProtocol(r),this.isUrl(r)){const t=r.indexOf("/",e.length);t!==-1?e=r.slice(0,t):e=r,e.endsWith("/")||(e+="/")}return e},basename(r,e){Pe(r),e&&Pe(e),r=Nt(this.toPosix(r));let t=0,i=-1,n=!0,s;if(e!==void 0&&e.length>0&&e.length<=r.length){if(e.length===r.length&&e===r)return"";let o=e.length-1,a=-1;for(s=r.length-1;s>=0;--s){const l=r.charCodeAt(s);if(l===47){if(!n){t=s+1;break}}else a===-1&&(n=!1,a=s+1),o>=0&&(l===e.charCodeAt(o)?--o===-1&&(i=s):(o=-1,i=a))}return t===i?i=a:i===-1&&(i=r.length),r.slice(t,i)}for(s=r.length-1;s>=0;--s)if(r.charCodeAt(s)===47){if(!n){t=s+1;break}}else i===-1&&(n=!1,i=s+1);return i===-1?"":r.slice(t,i)},extname(r){Pe(r),r=Nt(this.toPosix(r));let e=-1,t=0,i=-1,n=!0,s=0;for(let o=r.length-1;o>=0;--o){const a=r.charCodeAt(o);if(a===47){if(!n){t=o+1;break}continue}i===-1&&(n=!1,i=o+1),a===46?e===-1?e=o:s!==1&&(s=1):e!==-1&&(s=-1)}return e===-1||i===-1||s===0||s===1&&e===i-1&&e===t+1?"":r.slice(e,i)},parse(r){Pe(r);const e={root:"",dir:"",base:"",ext:"",name:""};if(r.length===0)return e;r=Nt(this.toPosix(r));let t=r.charCodeAt(0);const i=this.isAbsolute(r);let n;const s="";e.root=this.rootname(r),i||this.hasProtocol(r)?n=1:n=0;let o=-1,a=0,l=-1,h=!0,u=r.length-1,c=0;for(;u>=n;--u){if(t=r.charCodeAt(u),t===47){if(!h){a=u+1;break}continue}l===-1&&(h=!1,l=u+1),t===46?o===-1?o=u:c!==1&&(c=1):o!==-1&&(c=-1)}return o===-1||l===-1||c===0||c===1&&o===l-1&&o===a+1?l!==-1&&(a===0&&i?e.base=e.name=r.slice(1,l):e.base=e.name=r.slice(a,l)):(a===0&&i?(e.name=r.slice(1,o),e.base=r.slice(1,l)):(e.name=r.slice(a,o),e.base=r.slice(a,l)),e.ext=r.slice(o,l)),e.dir=this.dirname(r),s&&(e.dir=s+e.dir),e},sep:"/",delimiter:":"};class W{constructor(e=0,t=0){this.x=0,this.y=0,this.x=e,this.y=t}clone(){return new W(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,t=e){return this.x=e,this.y=t,this}static get shared(){return Ni.x=0,Ni.y=0,Ni}}const Ni=new W,kr=[new W,new W,new W,new W];class K{constructor(e=0,t=0,i=0,n=0){this.type="rectangle",this.x=Number(e),this.y=Number(t),this.width=Number(i),this.height=Number(n)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}static get EMPTY(){return new K(0,0,0,0)}clone(){return new K(this.x,this.y,this.width,this.height)}copyFromBounds(e){return this.x=e.minX,this.y=e.minY,this.width=e.maxX-e.minX,this.height=e.maxY-e.minY,this}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&t>=this.y&&t<this.y+this.height}intersects(e,t){if(!t){const A=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=A)return!1;const w=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>w}const i=this.left,n=this.right,s=this.top,o=this.bottom;if(n<=i||o<=s)return!1;const a=kr[0].set(e.left,e.top),l=kr[1].set(e.left,e.bottom),h=kr[2].set(e.right,e.top),u=kr[3].set(e.right,e.bottom);if(h.x<=a.x||l.y<=a.y)return!1;const c=Math.sign(t.a*t.d-t.b*t.c);if(c===0||(t.apply(a,a),t.apply(l,l),t.apply(h,h),t.apply(u,u),Math.max(a.x,l.x,h.x,u.x)<=i||Math.min(a.x,l.x,h.x,u.x)>=n||Math.max(a.y,l.y,h.y,u.y)<=s||Math.min(a.y,l.y,h.y,u.y)>=o))return!1;const p=c*(l.y-a.y),d=c*(a.x-l.x),f=p*i+d*s,g=p*n+d*s,m=p*i+d*o,x=p*n+d*o;if(Math.max(f,g,m,x)<=p*a.x+d*a.y||Math.min(f,g,m,x)>=p*u.x+d*u.y)return!1;const b=c*(a.y-h.y),v=c*(h.x-a.x),_=b*i+v*s,S=b*n+v*s,k=b*i+v*o,M=b*n+v*o;return!(Math.max(_,S,k,M)<=b*a.x+v*a.y||Math.min(_,S,k,M)>=b*u.x+v*u.y)}pad(e=0,t=e){return this.x-=e,this.y-=t,this.width+=e*2,this.height+=t*2,this}fit(e){const t=Math.max(this.x,e.x),i=Math.min(this.x+this.width,e.x+e.width),n=Math.max(this.y,e.y),s=Math.min(this.y+this.height,e.y+e.height);return this.x=t,this.width=Math.max(i-t,0),this.y=n,this.height=Math.max(s-n,0),this}ceil(e=1,t=.001){const i=Math.ceil((this.x+this.width-t)*e)/e,n=Math.ceil((this.y+this.height-t)*e)/e;return this.x=Math.floor((this.x+t)*e)/e,this.y=Math.floor((this.y+t)*e)/e,this.width=i-this.x,this.height=n-this.y,this}enlarge(e){const t=Math.min(this.x,e.x),i=Math.max(this.x+this.width,e.x+e.width),n=Math.min(this.y,e.y),s=Math.max(this.y+this.height,e.y+e.height);return this.x=t,this.width=i-t,this.y=n,this.height=s-n,this}getBounds(e){return e=e||new K,e.copyFrom(this),e}}var G0=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function $0(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Zf(r,e,t){return t={path:e,exports:{},require:function(i,n){return Qf(i,n==null?t.path:n)}},r(t,t.exports),t.exports}function L0(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function D0(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")&&Object.keys(r).length===1?r.default:r}function z0(r){if(r.__esModule)return r;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(r).forEach(function(t){var i=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:function(){return r[t]}})}),e}function Qf(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var ue=Zf(function(r){"use strict";var e=Object.prototype.hasOwnProperty,t="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(t=!1));function n(l,h,u){this.fn=l,this.context=h,this.once=u||!1}function s(l,h,u,c,p){if(typeof u!="function")throw new TypeError("The listener must be a function");var d=new n(u,c||l,p),f=t?t+h:h;return l._events[f]?l._events[f].fn?l._events[f]=[l._events[f],d]:l._events[f].push(d):(l._events[f]=d,l._eventsCount++),l}function o(l,h){--l._eventsCount===0?l._events=new i:delete l._events[h]}function a(){this._events=new i,this._eventsCount=0}a.prototype.eventNames=function(){var h=[],u,c;if(this._eventsCount===0)return h;for(c in u=this._events)e.call(u,c)&&h.push(t?c.slice(1):c);return Object.getOwnPropertySymbols?h.concat(Object.getOwnPropertySymbols(u)):h},a.prototype.listeners=function(h){var u=t?t+h:h,c=this._events[u];if(!c)return[];if(c.fn)return[c.fn];for(var p=0,d=c.length,f=new Array(d);p<d;p++)f[p]=c[p].fn;return f},a.prototype.listenerCount=function(h){var u=t?t+h:h,c=this._events[u];return c?c.fn?1:c.length:0},a.prototype.emit=function(h,u,c,p,d,f){var g=t?t+h:h;if(!this._events[g])return!1;var m=this._events[g],x=arguments.length,b,v;if(m.fn){switch(m.once&&this.removeListener(h,m.fn,void 0,!0),x){case 1:return m.fn.call(m.context),!0;case 2:return m.fn.call(m.context,u),!0;case 3:return m.fn.call(m.context,u,c),!0;case 4:return m.fn.call(m.context,u,c,p),!0;case 5:return m.fn.call(m.context,u,c,p,d),!0;case 6:return m.fn.call(m.context,u,c,p,d,f),!0}for(v=1,b=new Array(x-1);v<x;v++)b[v-1]=arguments[v];m.fn.apply(m.context,b)}else{var _=m.length,S;for(v=0;v<_;v++)switch(m[v].once&&this.removeListener(h,m[v].fn,void 0,!0),x){case 1:m[v].fn.call(m[v].context);break;case 2:m[v].fn.call(m[v].context,u);break;case 3:m[v].fn.call(m[v].context,u,c);break;case 4:m[v].fn.call(m[v].context,u,c,p);break;default:if(!b)for(S=1,b=new Array(x-1);S<x;S++)b[S-1]=arguments[S];m[v].fn.apply(m[v].context,b)}}return!0},a.prototype.on=function(h,u,c){return s(this,h,u,c,!1)},a.prototype.once=function(h,u,c){return s(this,h,u,c,!0)},a.prototype.removeListener=function(h,u,c,p){var d=t?t+h:h;if(!this._events[d])return this;if(!u)return o(this,d),this;var f=this._events[d];if(f.fn)f.fn===u&&(!p||f.once)&&(!c||f.context===c)&&o(this,d);else{for(var g=0,m=[],x=f.length;g<x;g++)(f[g].fn!==u||p&&!f[g].once||c&&f[g].context!==c)&&m.push(f[g]);m.length?this._events[d]=m.length===1?m[0]:m:o(this,d)}return this},a.prototype.removeAllListeners=function(h){var u;return h?(u=t?t+h:h,this._events[u]&&o(this,u)):(this._events=new i,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=t,a.EventEmitter=a,r.exports=a});const ye=(r,e,t=!1)=>(Array.isArray(r)||(r=[r]),e?r.map(i=>typeof i=="string"||t?e(i):i):r);class Jf{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){return this._cache.get(e)}set(e,t){const i=ye(e);let n;for(let a=0;a<this.parsers.length;a++){const l=this.parsers[a];if(l.test(t)){n=l.getCacheableAssets(i,t);break}}n||(n={},i.forEach(a=>{n[a]=t}));const s=Object.keys(n),o={cacheKeys:s,keys:i};i.forEach(a=>{this._cacheMap.set(a,o)}),s.forEach(a=>{this._cache.has(a)&&this._cache.get(a),this._cache.set(a,n[a])})}remove(e){if(!this._cacheMap.has(e))return;const t=this._cacheMap.get(e);t.cacheKeys.forEach(i=>{this._cache.delete(i)}),t.keys.forEach(i=>{this._cacheMap.delete(i)})}get parsers(){return this._parsers}}const re=new Jf,Hi={default:-1};function Y(r="default"){return Hi[r]===void 0&&(Hi[r]=-1),++Hi[r]}const Sa={},z="8.0.0";function O(r,e,t=3){if(Sa[e])return;let i=new Error().stack;typeof i=="undefined"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`):(i=i.split(`
`).splice(t).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${r}`),console.warn(i),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`),console.warn(i))),Sa[e]=!0}const ji=()=>{},Wi=Object.create(null),Pa=Object.create(null);function Fr(r,e){let t=Pa[r];return t===void 0&&(Wi[e]===void 0&&(Wi[e]=1),Pa[r]=t=Wi[e]++),t}var em=Object.defineProperty,Aa=Object.getOwnPropertySymbols,tm=Object.prototype.hasOwnProperty,rm=Object.prototype.propertyIsEnumerable,Ea=(r,e,t)=>e in r?em(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ca=(r,e)=>{for(var t in e||(e={}))tm.call(e,t)&&Ea(r,t,e[t]);if(Aa)for(var t of Aa(e))rm.call(e,t)&&Ea(r,t,e[t]);return r};const Ma=class extends ue{constructor(r={}){var e,t,i,n,s,o,a;super(),this.resourceType="textureSampler",this.touched=0,this._maxAnisotropy=1,r=Ca(Ca({},Ma.defaultOptions),r),this.addressMode=r.addressMode,this.addressModeU=(e=r.addressModeU)!=null?e:this.addressModeU,this.addressModeV=(t=r.addressModeV)!=null?t:this.addressModeV,this.addressModeW=(i=r.addressModeW)!=null?i:this.addressModeW,this.scaleMode=r.scaleMode,this.magFilter=(n=r.magFilter)!=null?n:this.magFilter,this.minFilter=(s=r.minFilter)!=null?s:this.minFilter,this.mipmapFilter=(o=r.mipmapFilter)!=null?o:this.mipmapFilter,this.lodMinClamp=r.lodMinClamp,this.lodMaxClamp=r.lodMaxClamp,this.compare=r.compare,this.maxAnisotropy=(a=r.maxAnisotropy)!=null?a:1}set addressMode(r){this.addressModeU=r,this.addressModeV=r,this.addressModeW=r}get addressMode(){return this.addressModeU}set wrapMode(r){O("8","TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=r}get wrapMode(){return this.addressMode}set scaleMode(r){this.magFilter=r,this.minFilter=r,this.mipmapFilter=r}get scaleMode(){return this.magFilter}set maxAnisotropy(r){this._maxAnisotropy=Math.min(r,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get resourceId(){return this._resourceId||this._generateResourceId()}update(){this.emit("change",this),this._resourceId=null}_generateResourceId(){const r=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._resourceId=Fr(r,"sampler"),this._resourceId}destroy(){this.emit("destroy",this),this.removeAllListeners()}};let Ht=Ma;Ht.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};var im=Object.defineProperty,Ba=Object.getOwnPropertySymbols,nm=Object.prototype.hasOwnProperty,sm=Object.prototype.propertyIsEnumerable,Ra=(r,e,t)=>e in r?im(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ka=(r,e)=>{for(var t in e||(e={}))nm.call(e,t)&&Ra(r,t,e[t]);if(Ba)for(var t of Ba(e))sm.call(e,t)&&Ra(r,t,e[t]);return r};const Fa=class extends ue{constructor(r={}){var e,t,i,n,s;super(),this.options=r,this.uid=Y("textureSource"),this.resourceType="textureSource",this.resourceId=Y("textureResource"),this.uploadMethodId="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm-srgb",this.dimension="2d",this.antialias=!1,this.depthStencil=!0,this.touched=0,this._batchTick=-1,this._textureBindLocation=-1,r=ka(ka({},Fa.defaultOptions),r),this.resource=r.resource,this._resolution=r.resolution,r.width?this.pixelWidth=r.width*this._resolution:this.pixelWidth=(t=(e=r.resource)==null?void 0:e.width)!=null?t:1,r.height?this.pixelHeight=r.height*this._resolution:this.pixelHeight=(n=(i=r.resource)==null?void 0:i.height)!=null?n:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=r.format,this.dimension=r.dimensions,this.mipLevelCount=r.mipLevelCount,this.autoGenerateMipmaps=r.autoGenerateMipmaps,this.sampleCount=r.sampleCount,this.antialias=r.antialias,this.alphaMode=r.alphaMode;const o=(s=r.style)!=null?s:{};this.style=o instanceof Ht?o:new Ht(o),this.destroyed=!1}get source(){return this}get style(){return this._style}set style(r){var e,t;this.style!==r&&((e=this._style)==null||e.off("change",this._onStyleChange,this),this._style=r,(t=this._style)==null||t.on("change",this._onStyleChange,this),this._onStyleChange())}_onStyleChange(){this.emit("styleChange",this)}update(){this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this._style&&(this._style.destroy(),this._style=null),this.uploadMethodId=null,this.resource=null,this.removeAllListeners()}unload(){this.resourceId++,this.emit("change",this),this.emit("unload",this)}get resourceWidth(){const{resource:r}=this;return r.naturalWidth||r.videoWidth||r.displayWidth||r.width}get resourceHeight(){const{resource:r}=this;return r.naturalHeight||r.videoHeight||r.displayHeight||r.height}get resolution(){return this._resolution}set resolution(r){this._resolution!==r&&(this._resolution=r,this.width=this.pixelWidth/r,this.height=this.pixelHeight/r)}resize(r,e,t){t=t||this._resolution,r=r||this.width,e=e||this.height;const i=Math.round(r*t),n=Math.round(e*t);this.width=i/t,this.height=n/t,this._resolution=t,!(this.pixelWidth===i&&this.pixelHeight===n)&&(this.pixelWidth=i,this.pixelHeight=n,this.emit("resize",this),this.resourceId++,this.emit("change",this))}set wrapMode(r){O(z,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this._style.wrapMode=r}get wrapMode(){return O(z,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this._style.wrapMode}set scaleMode(r){O(z,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this._style.scaleMode=r}get scaleMode(){return O(z,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this._style.scaleMode}};let he=Fa;he.defaultOptions={resolution:1,format:"bgra8unorm",alphaMode:"no-premultiply-alpha",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,style:{}};var om=Object.defineProperty,am=Object.defineProperties,lm=Object.getOwnPropertyDescriptors,Oa=Object.getOwnPropertySymbols,hm=Object.prototype.hasOwnProperty,um=Object.prototype.propertyIsEnumerable,Ua=(r,e,t)=>e in r?om(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,cm=(r,e)=>{for(var t in e||(e={}))hm.call(e,t)&&Ua(r,t,e[t]);if(Oa)for(var t of Oa(e))um.call(e,t)&&Ua(r,t,e[t]);return r},dm=(r,e)=>am(r,lm(e));class Fi extends he{constructor(){super(...arguments),this.uploadMethodId="buffer"}static from(e){const t=e.resource||new Float32Array(e.width*e.height*4);let i=e.format;return i||(t instanceof Float32Array?i="rgba32float":t instanceof Int32Array||t instanceof Uint32Array?i="rgba32uint":t instanceof Int16Array||t instanceof Uint16Array?i="rgba16uint":(t instanceof Int8Array,i="bgra8unorm")),new Fi(dm(cm({},e),{format:i}))}}const Ia=Math.PI*2,Ga=180/Math.PI,$a=Math.PI/180;class R{constructor(e=1,t=0,i=0,n=1,s=0,o=0){this.array=null,this.a=e,this.b=t,this.c=i,this.d=n,this.tx=s,this.ty=o}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,t,i,n,s,o){return this.a=e,this.b=t,this.c=i,this.d=n,this.tx=s,this.ty=o,this}toArray(e,t){this.array||(this.array=new Float32Array(9));const i=t||this.array;return e?(i[0]=this.a,i[1]=this.b,i[2]=0,i[3]=this.c,i[4]=this.d,i[5]=0,i[6]=this.tx,i[7]=this.ty,i[8]=1):(i[0]=this.a,i[1]=this.c,i[2]=this.tx,i[3]=this.b,i[4]=this.d,i[5]=this.ty,i[6]=0,i[7]=0,i[8]=1),i}apply(e,t){t=t||new W;const i=e.x,n=e.y;return t.x=this.a*i+this.c*n+this.tx,t.y=this.b*i+this.d*n+this.ty,t}applyInverse(e,t){t=t||new W;const i=this.a,n=this.b,s=this.c,o=this.d,a=this.tx,l=this.ty,h=1/(i*o+s*-n),u=e.x,c=e.y;return t.x=o*h*u+-s*h*c+(l*s-a*o)*h,t.y=i*h*c+-n*h*u+(-l*i+a*n)*h,t}translate(e,t){return this.tx+=e,this.ty+=t,this}scale(e,t){return this.a*=e,this.d*=t,this.c*=e,this.b*=t,this.tx*=e,this.ty*=t,this}rotate(e){const t=Math.cos(e),i=Math.sin(e),n=this.a,s=this.c,o=this.tx;return this.a=n*t-this.b*i,this.b=n*i+this.b*t,this.c=s*t-this.d*i,this.d=s*i+this.d*t,this.tx=o*t-this.ty*i,this.ty=o*i+this.ty*t,this}append(e){const t=this.a,i=this.b,n=this.c,s=this.d;return this.a=e.a*t+e.b*n,this.b=e.a*i+e.b*s,this.c=e.c*t+e.d*n,this.d=e.c*i+e.d*s,this.tx=e.tx*t+e.ty*n+this.tx,this.ty=e.tx*i+e.ty*s+this.ty,this}appendFrom(e,t){const i=e.a,n=e.b,s=e.c,o=e.d,a=e.tx,l=e.ty,h=t.a,u=t.b,c=t.c,p=t.d;return this.a=i*h+n*c,this.b=i*u+n*p,this.c=s*h+o*c,this.d=s*u+o*p,this.tx=a*h+l*c+t.tx,this.ty=a*u+l*p+t.ty,this}setTransform(e,t,i,n,s,o,a,l,h){return this.a=Math.cos(a+h)*s,this.b=Math.sin(a+h)*s,this.c=-Math.sin(a-l)*o,this.d=Math.cos(a-l)*o,this.tx=e-(i*this.a+n*this.c),this.ty=t-(i*this.b+n*this.d),this}prepend(e){const t=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const i=this.a,n=this.c;this.a=i*e.a+this.b*e.c,this.b=i*e.b+this.b*e.d,this.c=n*e.a+this.d*e.c,this.d=n*e.b+this.d*e.d}return this.tx=t*e.a+this.ty*e.c+e.tx,this.ty=t*e.b+this.ty*e.d+e.ty,this}decompose(e){const t=this.a,i=this.b,n=this.c,s=this.d,o=e.pivot,a=-Math.atan2(-n,s),l=Math.atan2(i,t),h=Math.abs(a+l);return h<1e-5||Math.abs(Ia-h)<1e-5?(e.rotation=l,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=a,e.skew.y=l),e.scale.x=Math.sqrt(t*t+i*i),e.scale.y=Math.sqrt(n*n+s*s),e.position.x=this.tx+(o.x*t+o.y*n),e.position.y=this.ty+(o.x*i+o.y*s),e}invert(){const e=this.a,t=this.b,i=this.c,n=this.d,s=this.tx,o=e*n-t*i;return this.a=n/o,this.b=-t/o,this.c=-i/o,this.d=e/o,this.tx=(i*this.ty-n*s)/o,this.ty=-(e*this.ty-t*s)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new R;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}static get IDENTITY(){return fm.identity()}static get shared(){return pm.identity()}}const pm=new R,fm=new R,Ze=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],Qe=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],Je=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],et=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],Vi=[],La=[],Or=Math.sign;function mm(){for(let r=0;r<16;r++){const e=[];Vi.push(e);for(let t=0;t<16;t++){const i=Or(Ze[r]*Ze[t]+Je[r]*Qe[t]),n=Or(Qe[r]*Ze[t]+et[r]*Qe[t]),s=Or(Ze[r]*Je[t]+Je[r]*et[t]),o=Or(Qe[r]*Je[t]+et[r]*et[t]);for(let a=0;a<16;a++)if(Ze[a]===i&&Qe[a]===n&&Je[a]===s&&et[a]===o){e.push(a);break}}}for(let r=0;r<16;r++){const e=new R;e.set(Ze[r],Qe[r],Je[r],et[r],0,0),La.push(e)}}mm();const I={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:r=>Ze[r],uY:r=>Qe[r],vX:r=>Je[r],vY:r=>et[r],inv:r=>r&8?r&15:-r&7,add:(r,e)=>Vi[r][e],sub:(r,e)=>Vi[r][I.inv(e)],rotate180:r=>r^4,isVertical:r=>(r&3)===2,byDirection:(r,e)=>Math.abs(r)*2<=Math.abs(e)?e>=0?I.S:I.N:Math.abs(e)*2<=Math.abs(r)?r>0?I.E:I.W:e>0?r>0?I.SE:I.SW:r>0?I.NE:I.NW,matrixAppendRotationInv:(r,e,t=0,i=0)=>{const n=La[I.inv(e)];n.tx=t,n.ty=i,r.append(n)}};class Yi extends ue{constructor(e={}){var t;super(),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=e.frame||new K(0,0,1,1),this.orig=e.orig||this.frame,this.rotate=(t=e.rotate)!=null?t:0,this.trim=e.trim,this.defaultAnchor=e.defaultAnchor,this.updateUvs()}updateUvs(){const e=this.uvs,t=this.frame;let i=this.rotate;if(i){const n=t.width/2,s=t.height/2,o=t.x+n,a=t.y+s;i=I.add(i,I.NW),e.x0=o+n*I.uX(i),e.y0=a+s*I.uY(i),i=I.add(i,2),e.x1=o+n*I.uX(i),e.y1=a+s*I.uY(i),i=I.add(i,2),e.x2=o+n*I.uX(i),e.y2=a+s*I.uY(i),i=I.add(i,2),e.x3=o+n*I.uX(i),e.y3=a+s*I.uY(i)}else e.x0=t.x,e.y0=t.y,e.x1=t.x+t.width,e.y1=t.y,e.x2=t.x+t.width,e.y2=t.y+t.height,e.x3=t.x,e.y3=t.y+t.height}update(){this.updateUvs(),this.emit("update",this)}destroy(){this.emit("destroy",this),this.removeAllListeners(),this.frame=null,this.orig=null,this.trim=null,this.defaultAnchor=null,this.uvs=null}}const Da=new R;class Xi{constructor(e,t){this.mapCoord=new R,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof t=="undefined"?.5:t,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){var t;this.texture!==e&&((t=this._texture)==null||t.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,t){t===void 0&&(t=e);const i=this.mapCoord;for(let n=0;n<e.length;n+=2){const s=e[n],o=e[n+1];t[n]=s*i.a+o*i.c+i.tx,t[n+1]=s*i.b+o*i.d+i.ty}return t}update(){const e=this._texture;this._updateID++;const t=e.layout.uvs;this.mapCoord.set(t.x1-t.x0,t.y1-t.y0,t.x3-t.x0,t.y3-t.y0,t.x0,t.y0);const i=e.layout.orig,n=e.layout.trim;n&&(Da.set(i.width/n.width,0,0,i.height/n.height,-n.x/n.width,-n.y/n.height),this.mapCoord.append(Da));const s=e.source,o=this.uClampFrame,a=this.clampMargin/s._resolution,l=this.clampOffset;return o[0]=(e.frameX+a+l)/s.width,o[1]=(e.frameY+a+l)/s.height,o[2]=(e.frameX+e.frameWidth-a+l)/s.width,o[3]=(e.frameY+e.frameHeight-a+l)/s.height,this.uClampOffset[0]=l/s.pixelWidth,this.uClampOffset[1]=l/s.pixelHeight,this.isSimple=e.frameWidth===s.width&&e.frameHeight===s.height&&e.layout.rotate===0,!0}}var gm=Object.defineProperty,bm=Object.defineProperties,vm=Object.getOwnPropertyDescriptors,za=Object.getOwnPropertySymbols,ym=Object.prototype.hasOwnProperty,xm=Object.prototype.propertyIsEnumerable,Na=(r,e,t)=>e in r?gm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,_m=(r,e)=>{for(var t in e||(e={}))ym.call(e,t)&&Na(r,t,e[t]);if(za)for(var t of za(e))xm.call(e,t)&&Na(r,t,e[t]);return r},wm=(r,e)=>bm(r,vm(e));class P extends ue{constructor({source:e,layout:t,label:i,frame:n}={}){var s;if(super(),this.id=Y("texture"),this.styleSourceKey=0,this.label=i,this.source=(s=e==null?void 0:e.source)!=null?s:new he,t=t instanceof Yi?t:new Yi(t),n){const{width:o,height:a}=this._source;t.frame.x=n.x/o,t.frame.y=n.y/a,t.frame.width=n.width/o,t.frame.height=n.height/a,t.updateUvs()}this.layout=t,this.destroyed=!1}static from(e){return typeof e=="string"?re.get(e):e instanceof he?new P({source:e}):new P({source:new he(e)})}static fromBuffer(e){return new P({source:Fi.from(wm(_m({},e),{style:{scaleMode:"nearest"}}))})}set source(e){this._source&&this._source.off("resize",this.onUpdate,this),this._source=e,e.on("resize",this.onUpdate,this),this.emit("update",this)}get source(){return this._source}get layout(){return this._layout}set layout(e){var t;(t=this._layout)==null||t.off("update",this.onUpdate,this),this._layout=e,e.on("update",this.onUpdate,this),this.emit("update",this)}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new Xi(this)),this._textureMatrix}set frameWidth(e){this._layout.frame.width=e/this._source.width}get frameWidth(){return this._source.pixelWidth/this._source._resolution*this._layout.frame.width}set frameHeight(e){this._layout.frame.height=e/this._source.height}get frameHeight(){return this._source.pixelHeight/this._source._resolution*this._layout.frame.height}set frameX(e){if(e===0){this._layout.frame.x=0;return}this._layout.frame.x=this._source.width/e}get frameX(){return this._source.width*this._layout.frame.x}set frameY(e){if(e===0){this._layout.frame.y=0;return}this._layout.frame.y=this._source.height/e}get frameY(){return this._source.height*this._layout.frame.y}get width(){return this._source.width*this._layout.orig.width}get height(){return this._source.height*this._layout.orig.height}destroy(e=!1){this._layout&&(this._layout.destroy(),this._layout=null),this._source&&e&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}onUpdate(){this.emit("update",this)}get baseTexture(){return O(z,"Texture.baseTexture is now Texture.source"),this._source}}P.EMPTY=new P({}),P.EMPTY.label="EMPTY",P.EMPTY.destroy=ji;class qi extends ue{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return O(z,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return O(z,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return O(z,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return O(z,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return O(z,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture.destroy();this.chars=null}}class Ur extends qi{constructor(e){var t;super();const{textures:i,data:n}=e;Object.keys(n.pages).forEach(o=>{const a=n.pages[parseInt(o,10)],l=i[a.id];this.pages.push({texture:l})}),Object.keys(n.chars).forEach(o=>{var a;const l=n.chars[o],h=i[l.page].source,u=new K(l.x/h.width,l.y/h.height,l.width/h.width,l.height/h.height),c=new P({source:h,layout:{frame:u}});this.chars[o]={id:o.codePointAt(0),xOffset:l.xOffset,yOffset:l.yOffset,xAdvance:l.xAdvance,kerning:(a=l.kerning)!=null?a:{},texture:c}}),this.baseRenderedFontSize=n.fontSize;const s=this;s.baseMeasurementFontSize=n.fontSize,s.fontMetrics={ascent:0,descent:0,fontSize:n.fontSize},s.baseLineOffset=n.baseLineOffset,s.lineHeight=n.lineHeight,s.fontFamily=n.fontFamily,s.distanceField=(t=n.distanceField)!=null?t:{type:"none",range:0}}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{texture:t}=this.pages[e];t.destroy(!0)}this.pages=null}}const Ir={test(r){return typeof r=="string"&&r.startsWith("info face=")},parse(r){var e,t;const i=r.match(/^[a-z]+\s+.+$/gm),n={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const d in i){const f=i[d].match(/^[a-z]+/gm)[0],g=i[d].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),m={};for(const x in g){const b=g[x].split("="),v=b[0],_=b[1].replace(/"/gm,""),S=parseFloat(_),k=isNaN(S)?_:S;m[v]=k}n[f].push(m)}const s={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},[o]=n.info,[a]=n.common,[l]=(e=n.distanceField)!=null?e:[];l&&(s.distanceField={range:parseInt(l.distanceRange,10),type:l.fieldType}),s.fontSize=parseInt(o.size,10),s.fontFamily=o.face,s.lineHeight=parseInt(a.lineHeight,10);const h=n.page;for(let d=0;d<h.length;d++)s.pages.push({id:parseInt(h[d].id,10)||0,file:h[d].file});const u={};s.baseLineOffset=s.lineHeight-parseInt(a.base,10);const c=n.char;for(let d=0;d<c.length;d++){const f=c[d],g=parseInt(f.id,10);let m=(t=f.letter)!=null?t:f.char;m==="space"&&(m=" "),u[g]=m,s.chars[m]={id:g,page:parseInt(f.page,10)||0,x:parseInt(f.x,10),y:parseInt(f.y,10),width:parseInt(f.width,10),height:parseInt(f.height,10),xOffset:parseInt(f.xoffset,10),yOffset:parseInt(f.yoffset,10),xAdvance:parseInt(f.xadvance,10),kerning:{}}}const p=n.kerning||[];for(let d=0;d<p.length;d++){const f=parseInt(p[d].first,10),g=parseInt(p[d].second,10),m=parseInt(p[d].amount,10);s.chars[u[g]].kerning[u[f]]=m}return s}},Ki={test(r){const e=r;return typeof e!="string"&&"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(r){var e;const t={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},i=r.getElementsByTagName("info")[0],n=r.getElementsByTagName("common")[0],s=r.getElementsByTagName("distanceField")[0];s&&(t.distanceField={type:s.getAttribute("fieldType"),range:parseInt(s.getAttribute("distanceRange"),10)});const o=r.getElementsByTagName("page"),a=r.getElementsByTagName("char"),l=r.getElementsByTagName("kerning");t.fontSize=parseInt(i.getAttribute("size"),10),t.fontFamily=i.getAttribute("face"),t.lineHeight=parseInt(n.getAttribute("lineHeight"),10);for(let u=0;u<o.length;u++)t.pages.push({id:parseInt(o[u].getAttribute("id"),10)||0,file:o[u].getAttribute("file")});const h={};t.baseLineOffset=t.lineHeight-parseInt(n.getAttribute("base"),10);for(let u=0;u<a.length;u++){const c=a[u],p=parseInt(c.getAttribute("id"),10);let d=(e=c.getAttribute("letter"))!=null?e:c.getAttribute("char");d==="space"&&(d=" "),h[p]=d,t.chars[d]={id:p,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let u=0;u<l.length;u++){const c=parseInt(l[u].getAttribute("first"),10),p=parseInt(l[u].getAttribute("second"),10),d=parseInt(l[u].getAttribute("amount"),10);t.chars[h[p]].kerning[h[c]]=d}return t}},Zi={test(r){return typeof r=="string"&&r.includes("<font>")?Ki.test(D.ADAPTER.parseXML(r)):!1},parse(r){return Ki.parse(D.ADAPTER.parseXML(r))}},Tm=[".xml",".fnt"],Ha={extension:y.CacheParser,test:r=>r instanceof Ur,getCacheableAssets(r,e){const t={};return r.forEach(i=>{t[i]=e}),t[e.fontFamily]=e,t}},ja={extension:{type:y.LoadParser,priority:Oe.Normal},test(r){return Tm.includes(pe.extname(r).toLowerCase())},async testParse(r){return Ir.test(r)||Zi.test(r)},async parse(r,e,t){const i=Ir.test(r)?Ir.parse(r):Zi.parse(r),{src:n}=e,{pages:s}=i,o=[];for(let h=0;h<s.length;++h){const u=s[h].file;let c=pe.join(pe.dirname(n),u);c=Rr(c,n),o.push(c)}const a=await t.load(o),l=o.map(h=>a[h]);return new Ur({data:i,textures:l})},async load(r,e){return await(await D.ADAPTER.fetch(r)).text()},unload(r){r.destroy()}},Wa={extension:y.CacheParser,test:r=>Array.isArray(r)&&r.every(e=>e instanceof P),getCacheableAssets:(r,e)=>{const t={};return r.forEach(i=>{e.forEach((n,s)=>{t[i+(s===0?"":s+1)]=n})}),t}},Va={extension:{type:y.DetectionParser,priority:1},test:async()=>{const r="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=r})},add:async r=>[...r,"avif"],remove:async r=>r.filter(e=>e!=="avif")},Ya=["png","jpg","jpeg"],Xa={extension:{type:y.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async r=>[...r,...Ya],remove:async r=>r.filter(e=>!Ya.includes(e))},Sm="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function Gr(r){return Sm?!1:document.createElement("video").canPlayType(r)!==""}const qa={extension:{type:y.DetectionParser,priority:0},test:async()=>Gr("video/mp4"),add:async r=>[...r,"mp4","m4v"],remove:async r=>r.filter(e=>e!=="mp4"&&e!=="m4v")},Ka={extension:{type:y.DetectionParser,priority:0},test:async()=>Gr("video/ogg"),add:async r=>[...r,"ogv"],remove:async r=>r.filter(e=>e!=="ogv")},Za={extension:{type:y.DetectionParser,priority:0},test:async()=>Gr("video/webm"),add:async r=>[...r,"webm"],remove:async r=>r.filter(e=>e!=="webm")},Qa={extension:{type:y.DetectionParser,priority:0},test:async()=>{const r="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=r})},add:async r=>[...r,"webp"],remove:async r=>r.filter(e=>e!=="webp")};function tt(r,e){if(Array.isArray(e)){for(const t of e)if(r.startsWith(`data:${t}`))return!0;return!1}return r.startsWith(`data:${e}`)}function rt(r,e){const t=r.split("?")[0],i=pe.extname(t).toLowerCase();return Array.isArray(e)?e.includes(i):i===e}const Pm=".json",Am="application/json",Ja={extension:{type:y.LoadParser,priority:Oe.Low},name:"loadJson",test(r){return tt(r,Am)||rt(r,Pm)},async load(r){return await(await D.ADAPTER.fetch(r)).json()}},Em=".txt",Cm="text/plain",el={name:"loadTxt",extension:{type:y.LoadParser,priority:Oe.Low},test(r){return tt(r,Cm)||rt(r,Em)},async load(r){return await(await D.ADAPTER.fetch(r)).text()}};var Mm=Object.defineProperty,Bm=Object.defineProperties,Rm=Object.getOwnPropertyDescriptors,tl=Object.getOwnPropertySymbols,km=Object.prototype.hasOwnProperty,Fm=Object.prototype.propertyIsEnumerable,rl=(r,e,t)=>e in r?Mm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Om=(r,e)=>{for(var t in e||(e={}))km.call(e,t)&&rl(r,t,e[t]);if(tl)for(var t of tl(e))Fm.call(e,t)&&rl(r,t,e[t]);return r},Um=(r,e)=>Bm(r,Rm(e));const Im=["normal","bold","100","200","300","400","500","600","700","800","900"],Gm=[".ttf",".otf",".woff",".woff2"],$m=["font/ttf","font/otf","font/woff","font/woff2"],Lm=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function il(r){const e=pe.extname(r),t=pe.basename(r,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1));let i=t.length>0;for(const s of t)if(!s.match(Lm)){i=!1;break}let n=t.join(" ");return i||(n=`"${n.replace(/[\\"]/g,"\\$&")}"`),n}const nl={extension:{type:y.LoadParser,priority:Oe.Low},name:"loadWebFont",test(r){return tt(r,$m)||rt(r,Gm)},async load(r,e){var t,i,n,s,o,a;const l=D.ADAPTER.getFontFaceSet();if(l){const h=[],u=(i=(t=e.data)==null?void 0:t.family)!=null?i:il(r),c=(o=(s=(n=e.data)==null?void 0:n.weights)==null?void 0:s.filter(d=>Im.includes(d)))!=null?o:["normal"],p=(a=e.data)!=null?a:{};for(let d=0;d<c.length;d++){const f=c[d],g=new FontFace(u,`url(${encodeURI(r)})`,Um(Om({},p),{weight:f}));await g.load(),l.add(g),h.push(g)}return re.set(u,{url:r,fontFaces:h}),h.length===1?h[0]:h}return null},unload(r){(Array.isArray(r)?r:[r]).forEach(e=>{re.remove(e.family),D.ADAPTER.getFontFaceSet().delete(e)})}};var Dm={grad:.9,turn:360,rad:360/(2*Math.PI)},Ue=function(r){return typeof r=="string"?r.length>0:typeof r=="number"},oe=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=Math.pow(10,e)),Math.round(t*r)/t+0},xe=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=1),r>t?t:r>e?r:e},sl=function(r){return(r=isFinite(r)?r%360:0)>0?r:r+360},ol=function(r){return{r:xe(r.r,0,255),g:xe(r.g,0,255),b:xe(r.b,0,255),a:xe(r.a)}},Qi=function(r){return{r:oe(r.r),g:oe(r.g),b:oe(r.b),a:oe(r.a,3)}},zm=/^#([0-9a-f]{3,8})$/i,$r=function(r){var e=r.toString(16);return e.length<2?"0"+e:e},al=function(r){var e=r.r,t=r.g,i=r.b,n=r.a,s=Math.max(e,t,i),o=s-Math.min(e,t,i),a=o?s===e?(t-i)/o:s===t?2+(i-e)/o:4+(e-t)/o:0;return{h:60*(a<0?a+6:a),s:s?o/s*100:0,v:s/255*100,a:n}},ll=function(r){var e=r.h,t=r.s,i=r.v,n=r.a;e=e/360*6,t/=100,i/=100;var s=Math.floor(e),o=i*(1-t),a=i*(1-(e-s)*t),l=i*(1-(1-e+s)*t),h=s%6;return{r:255*[i,a,o,o,l,i][h],g:255*[l,i,i,a,o,o][h],b:255*[o,o,l,i,i,a][h],a:n}},hl=function(r){return{h:sl(r.h),s:xe(r.s,0,100),l:xe(r.l,0,100),a:xe(r.a)}},ul=function(r){return{h:oe(r.h),s:oe(r.s),l:oe(r.l),a:oe(r.a,3)}},cl=function(r){return ll((t=(e=r).s,{h:e.h,s:(t*=((i=e.l)<50?i:100-i)/100)>0?2*t/(i+t)*100:0,v:i+t,a:e.a}));var e,t,i},jt=function(r){return{h:(e=al(r)).h,s:(n=(200-(t=e.s))*(i=e.v)/100)>0&&n<200?t*i/100/(n<=100?n:200-n)*100:0,l:n/2,a:e.a};var e,t,i,n},Nm=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Hm=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,jm=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Wm=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,Ji={string:[[function(r){var e=zm.exec(r);return e?(r=e[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:r.length===4?oe(parseInt(r[3]+r[3],16)/255,2):1}:r.length===6||r.length===8?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:r.length===8?oe(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var e=jm.exec(r)||Wm.exec(r);return e?e[2]!==e[4]||e[4]!==e[6]?null:ol({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(r){var e=Nm.exec(r)||Hm.exec(r);if(!e)return null;var t,i,n=hl({h:(t=e[1],i=e[2],i===void 0&&(i="deg"),Number(t)*(Dm[i]||1)),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)});return cl(n)},"hsl"]],object:[[function(r){var e=r.r,t=r.g,i=r.b,n=r.a,s=n===void 0?1:n;return Ue(e)&&Ue(t)&&Ue(i)?ol({r:Number(e),g:Number(t),b:Number(i),a:Number(s)}):null},"rgb"],[function(r){var e=r.h,t=r.s,i=r.l,n=r.a,s=n===void 0?1:n;if(!Ue(e)||!Ue(t)||!Ue(i))return null;var o=hl({h:Number(e),s:Number(t),l:Number(i),a:Number(s)});return cl(o)},"hsl"],[function(r){var e=r.h,t=r.s,i=r.v,n=r.a,s=n===void 0?1:n;if(!Ue(e)||!Ue(t)||!Ue(i))return null;var o=function(a){return{h:sl(a.h),s:xe(a.s,0,100),v:xe(a.v,0,100),a:xe(a.a)}}({h:Number(e),s:Number(t),v:Number(i),a:Number(s)});return ll(o)},"hsv"]]},dl=function(r,e){for(var t=0;t<e.length;t++){var i=e[t][0](r);if(i)return[i,e[t][1]]}return[null,void 0]},pl=function(r){return typeof r=="string"?dl(r.trim(),Ji.string):typeof r=="object"&&r!==null?dl(r,Ji.object):[null,void 0]},N0=function(r){return pl(r)[1]},en=function(r,e){var t=jt(r);return{h:t.h,s:xe(t.s+100*e,0,100),l:t.l,a:t.a}},tn=function(r){return(299*r.r+587*r.g+114*r.b)/1e3/255},fl=function(r,e){var t=jt(r);return{h:t.h,s:t.s,l:xe(t.l+100*e,0,100),a:t.a}},Lr=function(){function r(e){this.parsed=pl(e)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return r.prototype.isValid=function(){return this.parsed!==null},r.prototype.brightness=function(){return oe(tn(this.rgba),2)},r.prototype.isDark=function(){return tn(this.rgba)<.5},r.prototype.isLight=function(){return tn(this.rgba)>=.5},r.prototype.toHex=function(){return e=Qi(this.rgba),t=e.r,i=e.g,n=e.b,o=(s=e.a)<1?$r(oe(255*s)):"","#"+$r(t)+$r(i)+$r(n)+o;var e,t,i,n,s,o},r.prototype.toRgb=function(){return Qi(this.rgba)},r.prototype.toRgbString=function(){return e=Qi(this.rgba),t=e.r,i=e.g,n=e.b,(s=e.a)<1?"rgba("+t+", "+i+", "+n+", "+s+")":"rgb("+t+", "+i+", "+n+")";var e,t,i,n,s},r.prototype.toHsl=function(){return ul(jt(this.rgba))},r.prototype.toHslString=function(){return e=ul(jt(this.rgba)),t=e.h,i=e.s,n=e.l,(s=e.a)<1?"hsla("+t+", "+i+"%, "+n+"%, "+s+")":"hsl("+t+", "+i+"%, "+n+"%)";var e,t,i,n,s},r.prototype.toHsv=function(){return e=al(this.rgba),{h:oe(e.h),s:oe(e.s),v:oe(e.v),a:oe(e.a,3)};var e},r.prototype.invert=function(){return Be({r:255-(e=this.rgba).r,g:255-e.g,b:255-e.b,a:e.a});var e},r.prototype.saturate=function(e){return e===void 0&&(e=.1),Be(en(this.rgba,e))},r.prototype.desaturate=function(e){return e===void 0&&(e=.1),Be(en(this.rgba,-e))},r.prototype.grayscale=function(){return Be(en(this.rgba,-1))},r.prototype.lighten=function(e){return e===void 0&&(e=.1),Be(fl(this.rgba,e))},r.prototype.darken=function(e){return e===void 0&&(e=.1),Be(fl(this.rgba,-e))},r.prototype.rotate=function(e){return e===void 0&&(e=15),this.hue(this.hue()+e)},r.prototype.alpha=function(e){return typeof e=="number"?Be({r:(t=this.rgba).r,g:t.g,b:t.b,a:e}):oe(this.rgba.a,3);var t},r.prototype.hue=function(e){var t=jt(this.rgba);return typeof e=="number"?Be({h:e,s:t.s,l:t.l,a:t.a}):oe(t.h)},r.prototype.isEqual=function(e){return this.toHex()===Be(e).toHex()},r}(),Be=function(r){return r instanceof Lr?r:new Lr(r)},ml=[],Vm=function(r){r.forEach(function(e){ml.indexOf(e)<0&&(e(Lr,Ji),ml.push(e))})},H0=function(){return new Lr({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})};function Ym(r,e){var t={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},i={};for(var n in t)i[t[n]]=n;var s={};r.prototype.toName=function(o){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,l,h=i[this.toHex()];if(h)return h;if(o!=null&&o.closest){var u=this.toRgb(),c=1/0,p="black";if(!s.length)for(var d in t)s[d]=new r(t[d]).toRgb();for(var f in t){var g=(a=u,l=s[f],Math.pow(a.r-l.r,2)+Math.pow(a.g-l.g,2)+Math.pow(a.b-l.b,2));g<c&&(c=g,p=f)}return p}},e.string.push([function(o){var a=o.toLowerCase(),l=a==="transparent"?"#0000":t[a];return l?new r(l).toRgb():null},"name"])}var Xm=Object.defineProperty,gl=Object.getOwnPropertySymbols,qm=Object.prototype.hasOwnProperty,Km=Object.prototype.propertyIsEnumerable,bl=(r,e,t)=>e in r?Xm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Zm=(r,e)=>{for(var t in e||(e={}))qm.call(e,t)&&bl(r,t,e[t]);if(gl)for(var t of gl(e))Km.call(e,t)&&bl(r,t,e[t]);return r};Vm([Ym]);const it=class{constructor(r=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=r}get red(){return this._components[0]}get green(){return this._components[1]}get blue(){return this._components[2]}get alpha(){return this._components[3]}setValue(r){return this.value=r,this}set value(r){if(r instanceof it)this._value=this._cloneSource(r._value),this._int=r._int,this._components.set(r._components);else{if(r===null)throw new Error("Cannot set Color#value to null");(this._value===null||!this._isSourceEqual(this._value,r))&&(this._normalize(r),this._value=this._cloneSource(r))}}get value(){return this._value}_cloneSource(r){return typeof r=="string"||typeof r=="number"||r instanceof Number||r===null?r:Array.isArray(r)||ArrayBuffer.isView(r)?r.slice(0):typeof r=="object"&&r!==null?Zm({},r):r}_isSourceEqual(r,e){const t=typeof r;if(t!==typeof e)return!1;if(t==="number"||t==="string"||r instanceof Number)return r===e;if(Array.isArray(r)&&Array.isArray(e)||ArrayBuffer.isView(r)&&ArrayBuffer.isView(e))return r.length!==e.length?!1:r.every((i,n)=>i===e[n]);if(r!==null&&e!==null){const i=Object.keys(r),n=Object.keys(e);return i.length!==n.length?!1:i.every(s=>r[s]===e[s])}return r===e}toRgba(){const[r,e,t,i]=this._components;return{r,g:e,b:t,a:i}}toRgb(){const[r,e,t]=this._components;return{r,g:e,b:t}}toRgbaString(){const[r,e,t]=this.toUint8RgbArray();return`rgba(${r},${e},${t},${this.alpha})`}toUint8RgbArray(r){const[e,t,i]=this._components;return this._arrayRgb||(this._arrayRgb=[]),r=r||this._arrayRgb,r[0]=Math.round(e*255),r[1]=Math.round(t*255),r[2]=Math.round(i*255),r}toArray(r){this._arrayRgba||(this._arrayRgba=[]),r=r||this._arrayRgba;const[e,t,i,n]=this._components;return r[0]=e,r[1]=t,r[2]=i,r[3]=n,r}toRgbArray(r){this._arrayRgb||(this._arrayRgb=[]),r=r||this._arrayRgb;const[e,t,i]=this._components;return r[0]=e,r[1]=t,r[2]=i,r}toNumber(){return this._int}toBgrNumber(){const[r,e,t]=this.toUint8RgbArray();return(t<<16)+(e<<8)+r}toLittleEndianNumber(){const r=this._int;return(r>>16)+(r&65280)+((r&255)<<16)}multiply(r){const[e,t,i,n]=it._temp.setValue(r)._components;return this._components[0]*=e,this._components[1]*=t,this._components[2]*=i,this._components[3]*=n,this._refreshInt(),this._value=null,this}premultiply(r,e=!0){return e&&(this._components[0]*=r,this._components[1]*=r,this._components[2]*=r),this._components[3]=r,this._refreshInt(),this._value=null,this}toPremultiplied(r,e=!0){if(r===1)return(255<<24)+this._int;if(r===0)return e?0:this._int;let t=this._int>>16&255,i=this._int>>8&255,n=this._int&255;return e&&(t=t*r+.5|0,i=i*r+.5|0,n=n*r+.5|0),(r*255<<24)+(t<<16)+(i<<8)+n}toHex(){const r=this._int.toString(16);return`#${"000000".substring(0,6-r.length)+r}`}toHexa(){const r=Math.round(this._components[3]*255).toString(16);return this.toHex()+"00".substring(0,2-r.length)+r}setAlpha(r){return this._components[3]=this._clamp(r),this}_normalize(r){let e,t,i,n;if((typeof r=="number"||r instanceof Number)&&r>=0&&r<=16777215){const s=r;e=(s>>16&255)/255,t=(s>>8&255)/255,i=(s&255)/255,n=1}else if((Array.isArray(r)||r instanceof Float32Array)&&r.length>=3&&r.length<=4)r=this._clamp(r),[e,t,i,n=1]=r;else if((r instanceof Uint8Array||r instanceof Uint8ClampedArray)&&r.length>=3&&r.length<=4)r=this._clamp(r,0,255),[e,t,i,n=255]=r,e/=255,t/=255,i/=255,n/=255;else if(typeof r=="string"||typeof r=="object"){if(typeof r=="string"){const o=it.HEX_PATTERN.exec(r);o&&(r=`#${o[2]}`)}const s=Be(r);s.isValid()&&({r:e,g:t,b:i,a:n}=s.rgba,e/=255,t/=255,i/=255)}if(e!==void 0)this._components[0]=e,this._components[1]=t,this._components[2]=i,this._components[3]=n,this._refreshInt();else throw new Error(`Unable to convert color ${r}`)}_refreshInt(){this._clamp(this._components);const[r,e,t]=this._components;this._int=(r*255<<16)+(e*255<<8)+(t*255|0)}_clamp(r,e=0,t=1){return typeof r=="number"?Math.min(Math.max(r,e),t):(r.forEach((i,n)=>{r[n]=Math.min(Math.max(i,e),t)}),r)}static isColorLike(r){return typeof r=="number"||typeof r=="string"||r instanceof Number||r instanceof it||Array.isArray(r)||r instanceof Uint8Array||r instanceof Uint8ClampedArray||r instanceof Float32Array||r.r!==void 0&&r.g!==void 0&&r.b!==void 0||r.r!==void 0&&r.g!==void 0&&r.b!==void 0&&r.a!==void 0||r.h!==void 0&&r.s!==void 0&&r.l!==void 0||r.h!==void 0&&r.s!==void 0&&r.l!==void 0&&r.a!==void 0||r.h!==void 0&&r.s!==void 0&&r.v!==void 0||r.h!==void 0&&r.s!==void 0&&r.v!==void 0&&r.a!==void 0}};let j=it;j.shared=new it,j._temp=new it,j.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;class ce{constructor(e=1/0,t=1/0,i=-1/0,n=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack=[],this.matrix=new R,this.minX=e,this.minY=t,this.maxX=i,this.maxY=n}get rectangle(){this._rectangle||(this._rectangle=new K);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):e.copyFromBounds(this),e}clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack.length=0,this.matrix.identity()}pushMatrix(e){this._matrixStack.push(e),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(e)):this.matrix.copyFrom(e)}popMatrix(){this._matrixStack.pop(),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(this._matrixStack[this._matrixStack.length-1])):this._matrixStack.length===1?this.matrix.copyFrom(this._matrixStack[0]):this.matrix.identity()}setMatrix(e){this.matrix.copyFrom(e)}set(e,t,i,n){this.minX=e,this.minY=t,this.maxX=i,this.maxY=n}addFrame(e,t,i,n){const s=this.matrix,o=s.a,a=s.b,l=s.c,h=s.d,u=s.tx,c=s.ty;let p=this.minX,d=this.minY,f=this.maxX,g=this.maxY,m=o*e+l*t+u,x=a*e+h*t+c;p=m<p?m:p,d=x<d?x:d,f=m>f?m:f,g=x>g?x:g,m=o*i+l*t+u,x=a*i+h*t+c,p=m<p?m:p,d=x<d?x:d,f=m>f?m:f,g=x>g?x:g,m=o*e+l*n+u,x=a*e+h*n+c,p=m<p?m:p,d=x<d?x:d,f=m>f?m:f,g=x>g?x:g,m=o*i+l*n+u,x=a*i+h*n+c,p=m<p?m:p,d=x<d?x:d,f=m>f?m:f,g=x>g?x:g,this.minX=p,this.minY=d,this.maxX=f,this.maxY=g}addRect(e){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height)}addBounds(e){this.addFrame(e.minX,e.minY,e.maxX,e.maxY)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const t=this.minX,i=this.minY,n=this.maxX,s=this.maxY,{a:o,b:a,c:l,d:h,tx:u,ty:c}=e;let p=o*t+l*i+u,d=a*t+h*i+c;this.minX=p,this.minY=d,this.maxX=p,this.maxY=d,p=o*n+l*i+u,d=a*n+h*i+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*t+l*s+u,d=a*t+h*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*n+l*s+u,d=a*n+h*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}pad(e,t=e){return this.minX-=e,this.maxX+=e,this.minY-=t,this.maxY+=t,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new ce(this.minX,this.minY,this.maxX,this.maxY)}scale(e,t=e){return this.minX*=e,this.minY*=t,this.maxX*=e,this.maxY*=t,this}get x(){return this.minX}get y(){return this.minY}get width(){return this.maxX-this.minX}get height(){return this.maxY-this.minY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,t,i){let n=this.minX,s=this.minY,o=this.maxX,a=this.maxY;const l=this.matrix,h=l.a,u=l.b,c=l.c,p=l.d,d=l.tx,f=l.ty;for(let g=t;g<i;g+=2){const m=e[g],x=e[g+1],b=h*m+c*x+d,v=u*m+p*x+f;n=b<n?b:n,s=v<s?v:s,o=b>o?b:o,a=v>a?v:a}this.minX=n,this.minY=s,this.maxX=o,this.maxY=a}toString(){return`[@pixi:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}}const Qm={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0};function vl(r,e){var t;const i=r.match(/[a-df-z][^a-df-z]*/gi),n=(t=r.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:t.map(parseFloat),s=[];i.forEach(h=>{var u;const c=(u=h.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:u.map(parseFloat),p=h[0];let d=1;c&&(d=c.length/Qm[p.toLowerCase()]);for(let f=0;f<d;f++)s.push(p)});let o=0,a=0,l=0;for(let h=0;h<s.length;h++)switch(s[h]){case"M":a=n[o++],l=n[o++],e.moveTo(a,l);break;case"m":a+=n[o++],l+=n[o++],e.moveTo(a,l);break;case"H":a=n[o++],e.lineTo(a,l);break;case"h":a+=n[o++],e.lineTo(a,l);break;case"V":l=n[o++],e.lineTo(a,l);break;case"v":l+=n[o++],e.lineTo(a,l);break;case"L":a=n[o++],l=n[o++],e.lineTo(a,l);break;case"l":a+=n[o++],l+=n[o++],e.lineTo(a,l);break;case"C":a=n[o+4],l=n[o+5],e.bezierCurveTo(n[o],n[o+1],n[o+2],n[o+3],a,l),o+=6;break;case"c":e.bezierCurveTo(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3],a+n[o+4],l+n[o+5]),a+=n[o+4],l+=n[o+5],o+=6;break;case"S":a=n[o+2],l=n[o+3],e.bezierCurveToShort(n[o],n[o+1],a,l),o+=4;break;case"s":e.bezierCurveToShort(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3]),a+=n[o+2],l+=n[o+3],o+=4;break;case"Q":a=n[o+2],l=n[o+3],e.quadraticCurveTo(n[o],n[o+1],a,l),o+=4;break;case"q":e.quadraticCurveTo(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3]),a+=n[o+2],l+=n[o+3],o+=4;break;case"T":a=n[o++],l=n[o++],e.quadraticCurveToShort(a,l);break;case"t":a+=n[o++],l+=n[o++],e.quadraticCurveToShort(a,l);break;case"A":a=n[o+5],l=n[o+6],e.arcToSvg(n[o],n[o+1],n[o+2],n[o+3],n[o+4],a,l),o+=7;break;case"a":a+=n[o+5],l+=n[o+6],e.arcToSvg(n[o],n[o+1],n[o+2],n[o+3],n[o+4],a,l),o+=7;break;case"Z":case"z":e.closePath();break;default:}return e}class Oi{constructor(e=0,t=0,i=0){this.type="circle",this.x=e,this.y=t,this.radius=i}clone(){return new Oi(this.x,this.y,this.radius)}contains(e,t){if(this.radius<=0)return!1;const i=this.radius*this.radius;let n=this.x-e,s=this.y-t;return n*=n,s*=s,n+s<=i}getBounds(e){return e=e||new K,e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}}class Ui{constructor(e=0,t=0,i=0,n=0){this.type="ellipse",this.x=e,this.y=t,this.halfWidth=i,this.halfHeight=n}clone(){return new Ui(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,t){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let i=(e-this.x)/this.halfWidth,n=(t-this.y)/this.halfHeight;return i*=i,n*=n,i+n<=1}getBounds(){return new K(this.x-this.halfWidth,this.y-this.halfHeight,this.halfWidth*2,this.halfHeight*2)}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}}class gt{constructor(...e){this.type="polygon";let t=Array.isArray(e[0])?e[0]:e;if(typeof t[0]!="number"){const i=[];for(let n=0,s=t.length;n<s;n++)i.push(t[n].x,t[n].y);t=i}this.points=t,this.closePath=!0}clone(){const e=this.points.slice(),t=new gt(e);return t.closePath=this.closePath,t}contains(e,t){let i=!1;const n=this.points.length/2;for(let s=0,o=n-1;s<n;o=s++){const a=this.points[s*2],l=this.points[s*2+1],h=this.points[o*2],u=this.points[o*2+1];l>t!=u>t&&e<(h-a)*((t-l)/(u-l))+a&&(i=!i)}return i}getBounds(e){e=e||new K;const t=this.points;let i=1/0,n=-1/0,s=1/0,o=-1/0;for(let a=0,l=t.length;a<l;a+=2){const h=t[a],u=t[a+1];i=h<i?h:i,n=h>n?h:n,s=u<s?u:s,o=u>o?u:o}return e.x=i,e.width=n-i,e.y=s,e.height=o-s,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}class Ii{constructor(e=0,t=0,i=0,n=0,s=20){this.type="roundedRectangle",this.x=e,this.y=t,this.width=i,this.height=n,this.radius=s}getBounds(e){return e=e||new K,e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new Ii(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&t>=this.y&&t<=this.y+this.height){const i=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(t>=this.y+i&&t<=this.y+this.height-i||e>=this.x+i&&e<=this.x+this.width-i)return!0;let n=e-(this.x+i),s=t-(this.y+i);const o=i*i;if(n*n+s*s<=o||(n=e-(this.x+this.width-i),n*n+s*s<=o)||(s=t-(this.y+this.height-i),n*n+s*s<=o)||(n=e-(this.x+i),n*n+s*s<=o))return!0}return!1}}const j0=8,Dr=11920929e-14,Jm=1,rn=.01,vt=0,nt=0;function nn(r,e,t,i,n,s,o,a,l){let h=Jm/1;return h*=h,eg(e,t,i,n,s,o,a,l,r,h),r}function eg(r,e,t,i,n,s,o,a,l,h){sn(r,e,t,i,n,s,o,a,l,h,0),l.push(o,a)}function sn(r,e,t,i,n,s,o,a,l,h,u){if(u>8)return;const c=Math.PI,p=(r+t)/2,d=(e+i)/2,f=(t+n)/2,g=(i+s)/2,m=(n+o)/2,x=(s+a)/2,b=(p+f)/2,v=(d+g)/2,_=(f+m)/2,S=(g+x)/2,k=(b+_)/2,M=(v+S)/2;if(u>0){let A=o-r,w=a-e;const T=Math.abs((t-o)*w-(i-a)*A),L=Math.abs((n-o)*w-(s-a)*A);let G,B;if(T>Dr&&L>Dr){if((T+L)*(T+L)<=h*(A*A+w*w)){if(vt<rn){l.push(k,M);return}const E=Math.atan2(s-i,n-t);if(G=Math.abs(E-Math.atan2(i-e,t-r)),B=Math.abs(Math.atan2(a-s,o-n)-E),G>=c&&(G=2*c-G),B>=c&&(B=2*c-B),G+B<vt){l.push(k,M);return}if(nt!==0){if(G>nt){l.push(t,i);return}if(B>nt){l.push(n,s);return}}}}else if(T>Dr){if(T*T<=h*(A*A+w*w)){if(vt<rn){l.push(k,M);return}if(G=Math.abs(Math.atan2(s-i,n-t)-Math.atan2(i-e,t-r)),G>=c&&(G=2*c-G),G<vt){l.push(t,i),l.push(n,s);return}if(nt!==0&&G>nt){l.push(t,i);return}}}else if(L>Dr){if(L*L<=h*(A*A+w*w)){if(vt<rn){l.push(k,M);return}if(G=Math.abs(Math.atan2(a-s,o-n)-Math.atan2(s-i,n-t)),G>=c&&(G=2*c-G),G<vt){l.push(t,i),l.push(n,s);return}if(nt!==0&&G>nt){l.push(n,s);return}}}else if(A=k-(r+o)/2,w=M-(e+a)/2,A*A+w*w<=h){l.push(k,M);return}}sn(r,e,p,d,b,v,k,M,l,h,u+1),sn(k,M,_,S,m,x,o,a,l,h,u+1)}const W0=8,tg=11920929e-14,rg=1,ig=.01,yl=0;function xl(r,e,t,i,n,s,o){let a=rg/1;return a*=a,ng(e,t,i,n,s,o,r,a),r}function ng(r,e,t,i,n,s,o,a){on(o,r,e,t,i,n,s,a,0),o.push(n,s)}function on(r,e,t,i,n,s,o,a,l){if(l>8)return;const h=Math.PI,u=(e+i)/2,c=(t+n)/2,p=(i+s)/2,d=(n+o)/2,f=(u+p)/2,g=(c+d)/2;let m=s-e,x=o-t;const b=Math.abs((i-s)*x-(n-o)*m);if(b>tg){if(b*b<=a*(m*m+x*x)){if(yl<ig){r.push(f,g);return}let v=Math.abs(Math.atan2(o-n,s-i)-Math.atan2(n-t,i-e));if(v>=h&&(v=2*h-v),v<yl){r.push(f,g);return}}}else if(m=f-(e+s)/2,x=g-(t+o)/2,m*m+x*x<=a){r.push(f,g);return}on(r,e,t,u,c,f,g,a,l+1),on(r,f,g,p,d,s,o,a,l+1)}function an(r,e,t,i,n,s,o,a){let l=Math.abs(n-s);(!o&&n>s||o&&s>n)&&(l=2*Math.PI-l),a=a||Math.max(6,Math.floor(6*Math.pow(i,1/3)*(l/Math.PI))),a=Math.max(a,3);let h=l/a,u=n;h*=o?-1:1;for(let c=0;c<a+1;c++){const p=Math.cos(u),d=Math.sin(u),f=e+p*i,g=t+d*i;r.push(f,g),u+=h}}function _l(r,e,t,i,n,s){const o=r[r.length-2],a=r[r.length-1]-t,l=o-e,h=n-t,u=i-e,c=Math.abs(a*u-l*h);if(c<1e-8||s===0){(r[r.length-2]!==e||r[r.length-1]!==t)&&r.push(e,t);return}const p=a*a+l*l,d=h*h+u*u,f=a*h+l*u,g=s*Math.sqrt(p)/c,m=s*Math.sqrt(d)/c,x=g*f/p,b=m*f/d,v=g*u+m*l,_=g*h+m*a,S=l*(m+x),k=a*(m+x),M=u*(g+b),A=h*(g+b),w=Math.atan2(k-_,S-v),T=Math.atan2(A-_,M-v);an(r,v+e,_+t,s,w,T,l*h>u*a)}const Wt=Math.PI*2,ln={centerX:0,centerY:0,ang1:0,ang2:0},hn=({x:r,y:e},t,i,n,s,o,a,l)=>{r*=t,e*=i;const h=n*r-s*e,u=s*r+n*e;return l.x=h+o,l.y=u+a,l};function sg(r,e){const t=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),i=e===1.5707963267948966?.551915024494:t,n=Math.cos(r),s=Math.sin(r),o=Math.cos(r+e),a=Math.sin(r+e);return[{x:n-s*i,y:s+n*i},{x:o+a*i,y:a-o*i},{x:o,y:a}]}const wl=(r,e,t,i)=>{const n=r*i-e*t<0?-1:1;let s=r*t+e*i;return s>1&&(s=1),s<-1&&(s=-1),n*Math.acos(s)},og=(r,e,t,i,n,s,o,a,l,h,u,c,p)=>{const d=Math.pow(n,2),f=Math.pow(s,2),g=Math.pow(u,2),m=Math.pow(c,2);let x=d*f-d*m-f*g;x<0&&(x=0),x/=d*m+f*g,x=Math.sqrt(x)*(o===a?-1:1);const b=x*n/s*c,v=x*-s/n*u,_=h*b-l*v+(r+t)/2,S=l*b+h*v+(e+i)/2,k=(u-b)/n,M=(c-v)/s,A=(-u-b)/n,w=(-c-v)/s,T=wl(1,0,k,M);let L=wl(k,M,A,w);a===0&&L>0&&(L-=Wt),a===1&&L<0&&(L+=Wt),p.centerX=_,p.centerY=S,p.ang1=T,p.ang2=L};function Tl(r,e,t,i,n,s,o,a=0,l=0,h=0){if(s===0||o===0)return;const u=Math.sin(a*Wt/360),c=Math.cos(a*Wt/360),p=c*(e-i)/2+u*(t-n)/2,d=-u*(e-i)/2+c*(t-n)/2;if(p===0&&d===0)return;s=Math.abs(s),o=Math.abs(o);const f=Math.pow(p,2)/Math.pow(s,2)+Math.pow(d,2)/Math.pow(o,2);f>1&&(s*=Math.sqrt(f),o*=Math.sqrt(f)),og(e,t,i,n,s,o,l,h,u,c,p,d,ln);let{ang1:g,ang2:m}=ln;const{centerX:x,centerY:b}=ln;let v=Math.abs(m)/(Wt/4);Math.abs(1-v)<1e-7&&(v=1);const _=Math.max(Math.ceil(v),1);m/=_;let S=r[r.length-2],k=r[r.length-1];const M={x:0,y:0};for(let A=0;A<_;A++){const w=sg(g,m),{x:T,y:L}=hn(w[0],s,o,c,u,x,b,M),{x:G,y:B}=hn(w[1],s,o,c,u,x,b,M),{x:E,y:X}=hn(w[2],s,o,c,u,x,b,M);nn(r,S,k,T,L,G,B,E,X),S=E,k=X,g+=m}}const ag=new K;class Sl{constructor(e){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new ce,this._graphicsPath2D=e}moveTo(e,t){return this.startPoly(e,t),this}lineTo(e,t){this._ensurePoly();const i=this._currentPoly.points,n=i[i.length-2],s=i[i.length-1];return(n!==e||s!==t)&&i.push(e,t),this}arc(e,t,i,n,s,o){this._ensurePoly(!1);const a=this._currentPoly.points;return an(a,e,t,i,n,s,o),this}arcTo(e,t,i,n,s){this._ensurePoly();const o=this._currentPoly.points;return _l(o,e,t,i,n,s),this}arcToSvg(e,t,i,n,s,o,a){const l=this._currentPoly.points;return Tl(l,this._currentPoly.lastX,this._currentPoly.lastY,o,a,e,t,i,n,s),this}bezierCurveTo(e,t,i,n,s,o){this._ensurePoly();const a=this._currentPoly;return nn(this._currentPoly.points,a.lastX,a.lastY,e,t,i,n,s,o),this}quadraticCurveTo(e,t,i,n){this._ensurePoly();const s=this._currentPoly;return xl(this._currentPoly.points,s.lastX,s.lastY,e,t,i,n),this}closePath(){return this.endPoly(!0),this}addPath(e,t){this.endPoly(),t&&!t.isIdentity()&&(e=e.clone(!0),e.transform(t));for(let i=0;i<e.instructions.length;i++){const n=e.instructions[i];this[n.action](...n.data)}return this}finish(e=!1){this.endPoly(e)}rect(e,t,i,n,s){return this.drawShape(new K(e,t,i,n),s),this}circle(e,t,i,n){return this.drawShape(new Oi(e,t,i),n),this}poly(e,t,i){const n=new gt(e);n.closePath=t,this.drawShape(n,i)}ellipse(e,t,i,n,s){return this.drawShape(new Ui(e,t,i,n),s),this}roundRect(e,t,i,n,s,o){return this.drawShape(new Ii(e,t,i,n,s),o),this}drawShape(e,t){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:t}),this}startPoly(e,t){let i=this._currentPoly;return i&&this.endPoly(),i=new gt,i.points.push(e,t),this._currentPoly=i,this}endPoly(e=!1){const t=this._currentPoly;return t&&t.points.length>2&&(t.closePath=e,this.shapePrimitives.push({shape:t})),this._currentPoly=null,this}_ensurePoly(e=!0){if(!this._currentPoly&&(this._currentPoly=new gt,e)){const t=this.shapePrimitives[this.shapePrimitives.length-1];if(t){let i=t.shape.x,n=t.shape.y;if(t.transform.isIdentity()){const s=t.transform,o=i;i=s.a*i+s.c*n+s.tx,n=s.b*o+s.d*n+s.ty}this._currentPoly.points.push(i,i)}else this._currentPoly.points.push(0,0)}}buildPath(){const e=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let t=0;t<e.instructions.length;t++){const i=e.instructions[t];this[i.action](...i.data)}this.finish()}get bounds(){const e=this._bounds;e.clear();const t=this.shapePrimitives;for(let i=0;i<t.length;i++){const n=t[i],s=n.shape.getBounds(ag);n.transform?(e.pushMatrix(n.transform),e.addRect(s),e.popMatrix()):e.addRect(s)}return e}}class bt{constructor(e){this.instructions=[],this.uid=Y("graphicsPath"),this._dirty=!0;var t;typeof e=="string"?vl(e,this):this.instructions=(t=e==null?void 0:e.slice())!=null?t:[]}get shapePath(){return this._shapePath||(this._shapePath=new Sl(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,t){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,t]}),this._dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this._dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this._dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this._dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this._dirty=!0,this}bezierCurveToShort(e,t,i,n){const s=this.instructions[this.instructions.length-1],o=this._getLastPoint(W.shared);let a=0,l=0;if(!s||s.action!=="bezierCurveTo")a=o.x,l=o.y;else{a=s.data[2],l=s.data[3];const h=o.x,u=o.y;a=h+(h-a),l=u+(u-l)}return this.instructions.push({action:"bezierCurveTo",data:[a,l,e,t,i,n]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this._dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this._dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this._dirty=!0,this}quadraticCurveToShort(e,t){const i=this.instructions[this.instructions.length-1],n=this._getLastPoint(W.shared);let s=0,o=0;if(!i||i.action!=="quadraticCurveTo")s=n.x,o=n.y;else{s=i.data[0],o=i.data[1];const a=n.x,l=n.y;s=a+(a-s),o=l+(l-o)}return this.instructions.push({action:"quadraticCurveTo",data:[s,o,e,t]}),this._dirty=!0,this}rect(e,t,i,n,s){return this.instructions.push({action:"rect",data:[e,t,i,n,s]}),this._dirty=!0,this}circle(e,t,i,n){return this.instructions.push({action:"circle",data:[e,t,i,n]}),this._dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this._dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this._dirty=!0,this}star(e,t,i,n,s,o=0,a){s=s||n/2;const l=-1*Math.PI/2+o,h=i*2,u=Math.PI*2/h,c=[];for(let p=0;p<h;p++){const d=p%2?s:n,f=p*u+l;c.push(e+d*Math.cos(f),t+d*Math.sin(f))}return this.poly(c,!0,a),this}clone(e=!1){const t=new bt;if(!e)t.instructions=this.instructions.slice();else for(let i=0;i<this.instructions.length;i++){const n=this.instructions[i];t.instructions.push({action:n.action,data:n.data.slice()})}return t}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(e){if(e.isIdentity())return this;const t=e.a,i=e.b,n=e.c,s=e.d,o=e.tx,a=e.ty;let l=0,h=0,u=0,c=0,p=0,d=0,f=0,g=0;for(let m=0;m<this.instructions.length;m++){const x=this.instructions[m],b=x.data;switch(x.action){case"moveTo":case"lineTo":l=b[0],h=b[1],b[0]=t*l+n*h+o,b[1]=i*l+s*h+a;break;case"bezierCurveTo":u=b[0],c=b[1],p=b[2],d=b[3],l=b[4],h=b[5],b[0]=t*u+n*c+o,b[1]=i*u+s*c+a,b[2]=t*p+n*d+o,b[3]=i*p+s*d+a,b[4]=t*l+n*h+o,b[5]=i*l+s*h+a;break;case"quadraticCurveTo":u=b[0],c=b[1],l=b[2],h=b[3],b[0]=t*u+n*c+o,b[1]=i*u+s*c+a,b[2]=t*l+n*h+o,b[3]=i*l+s*h+a;break;case"arcToSvg":l=b[5],h=b[6],f=b[0],g=b[1],b[0]=t*f+n*g,b[1]=i*f+s*g,b[5]=t*l+n*h+o,b[6]=i*l+s*h+a;break;case"rect":b[4]=un(b[4],e);break;case"ellipse":b[8]=un(b[8],e);break;case"roundRect":b[5]=un(b[5],e);break;case"addPath":b[0].transform(e);break;default:break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}_getLastPoint(e){let t=this.instructions.length-1,i=this.instructions[t];if(!i)return e.x=0,e.y=0,e;for(;i.action==="closePath";){if(t--,t<0)return e.x=0,e.y=0,e;i=this.instructions[t]}let n,s,o;switch(i.action){case"moveTo":case"lineTo":e.x=i.data[0],e.y=i.data[1];break;case"quadraticCurveTo":e.x=i.data[2],e.y=i.data[3];break;case"bezierCurveTo":e.x=i.data[4],e.y=i.data[5];break;case"arc":case"arcToSvg":e.x=i.data[5],e.y=i.data[6];break;case"addPath":e.x=i.data[0].lastX,e.y=i.data[2].lastY;break;case"rect":if(o=i.data[4],n=i.data[0],s=i.data[1],o){const{a,b:l,c:h,d:u,tx:c,ty:p}=o;e.x=a*n+h*s+c,e.y=l*n+u*s+p}else e.x=n,e.y=s;break;default:break}return e}}function un(r,e){return r?r.prepend(e):e.clone()}var lg=Object.defineProperty,Pl=Object.getOwnPropertySymbols,hg=Object.prototype.hasOwnProperty,ug=Object.prototype.propertyIsEnumerable,Al=(r,e,t)=>e in r?lg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,zr=(r,e)=>{for(var t in e||(e={}))hg.call(e,t)&&Al(r,t,e[t]);if(Pl)for(var t of Pl(e))ug.call(e,t)&&Al(r,t,e[t]);return r};function El(r,e){if(typeof r=="string"){const i=document.createElement("div");i.innerHTML=r.trim(),r=i.querySelector("svg")}const t={context:e,path:new bt};return Cl(r,t,null,null),e}function Cl(r,e,t,i){const n=r.children,{fillStyle:s,strokeStyle:o}=cg(r);s&&t?t=zr(zr({},t),s):s&&(t=s),o&&i?i=zr(zr({},i),o):o&&(i=o),e.context.fillStyle=t,e.context.strokeStyle=i;let a,l,h,u,c,p,d,f,g,m,x,b,v,_,S,k,M;switch(r.nodeName.toLowerCase()){case"path":_=r.getAttribute("d"),S=new bt(_),e.context.path(S),t&&e.context.fill(),i&&e.context.stroke();break;case"circle":d=ae(r,"cx",0),f=ae(r,"cy",0),g=ae(r,"r",0),e.context.ellipse(d,f,g,g),t&&e.context.fill(),i&&e.context.stroke();break;case"rect":a=ae(r,"x",0),l=ae(r,"y",0),k=ae(r,"width",0),M=ae(r,"height",0),m=ae(r,"rx",0),x=ae(r,"ry",0),m||x?e.context.roundRect(a,l,k,M,m||x):e.context.rect(a,l,k,M),t&&e.context.fill(),i&&e.context.stroke();break;case"ellipse":d=ae(r,"cx",0),f=ae(r,"cy",0),m=ae(r,"rx",0),x=ae(r,"ry",0),e.context.beginPath(),e.context.ellipse(d,f,m,x),t&&e.context.fill(),i&&e.context.stroke();break;case"line":h=ae(r,"x1",0),u=ae(r,"y1",0),c=ae(r,"x2",0),p=ae(r,"y2",0),e.context.beginPath(),e.context.moveTo(h,u),e.context.lineTo(c,p),i&&e.context.stroke();break;case"polygon":v=r.getAttribute("points"),b=v.match(/\d+/g).map(A=>parseInt(A,10)),e.context.poly(b,!0),t&&e.context.fill(),i&&e.context.stroke();break;case"polyline":v=r.getAttribute("points"),b=v.match(/\d+/g).map(A=>parseInt(A,10)),e.context.poly(b,!1),i&&e.context.stroke();break;case"g":case"svg":break;default:{console.info(`[SVG parser] <${r.nodeName}> elements unsupported`);break}}for(let A=0;A<n.length;A++)Cl(n[A],e,t,i)}function ae(r,e,t){const i=r.getAttribute(e);return i?Number(i):t}function cg(r){const e=r.getAttribute("style"),t={},i={};let n=!1,s=!1;if(e){const o=e.split(";");for(let a=0;a<o.length;a++){const l=o[a],[h,u]=l.split(":");switch(h){case"stroke":u!=="none"&&(t.color=j.shared.setValue(u).toNumber(),s=!0);break;case"stroke-width":t.width=Number(u);break;case"fill":u!=="none"&&(n=!0,i.color=j.shared.setValue(u).toNumber());break;case"fill-opacity":i.alpha=Number(u);break;case"stroke-opacity":t.alpha=Number(u);break;case"opacity":i.alpha=Number(u),t.alpha=Number(u);break}}}else{const o=r.getAttribute("stroke");o&&o!=="none"&&(s=!0,t.color=j.shared.setValue(o).toNumber(),t.width=ae(r,"stroke-width",1));const a=r.getAttribute("fill");a&&a!=="none"&&(n=!0,i.color=j.shared.setValue(a).toNumber())}return{strokeStyle:s?t:null,fillStyle:n?i:null}}class Vt extends he{constructor(){super(...arguments),this.uploadMethodId="image"}}const Nr=D.ADAPTER.createCanvas(),st=1;Nr.width=st,Nr.height=st;const Ie=Nr.getContext("2d");Ie.fillStyle="#ffffff",Ie.fillRect(0,0,st,st),Ie.beginPath(),Ie.moveTo(0,0),Ie.lineTo(st,0),Ie.lineTo(st,st),Ie.closePath(),Ie.fillStyle="#ffffff",Ie.fill(),P.WHITE=new P({source:new Vt({resource:Nr})}),P.WHITE.label="WHITE",P.WHITE.destroy=ji;const cn=class{constructor(r,e,t,i){this.uid=Y("fillGradient"),this.type="linear",this.gradientStops=[],this.x0=r,this.y0=e,this.x1=t,this.y1=i}addColorStop(r,e){return this.gradientStops.push({offset:r,color:j.shared.setValue(e).toHex()}),this}buildLinearGradient(){const r=cn.defaultTextureSize,{gradientStops:e}=this,t=D.ADAPTER.createCanvas();t.width=r,t.height=r;const i=t.getContext("2d"),n=i.createLinearGradient(0,0,cn.defaultTextureSize,1);for(let f=0;f<e.length;f++){const g=e[f];n.addColorStop(g.offset,g.color)}i.fillStyle=n,i.fillRect(0,0,r,r),this.texture=new P({source:new Vt({resource:t,style:{addressModeU:"clamp-to-edge",addressModeV:"repeat"}})});const{x0:s,y0:o,x1:a,y1:l}=this,h=new R,u=a-s,c=l-o,p=Math.sqrt(u*u+c*c),d=Math.atan2(c,u);h.translate(-s,-o),h.scale(1/r,1/r),h.rotate(-d),h.scale(256/p,1),this.transform=h}};let Yt=cn;Yt.defaultTextureSize=256;const Ml={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};class dn{constructor(e,t){this.uid=Y("fillPattern"),this.transform=new R,this.texture=e,this.transform.scale(1/e.frameWidth,1/e.frameHeight),t&&(e.source.style.addressModeU=Ml[t].addressModeU,e.source.style.addressModeV=Ml[t].addressModeV)}setTransform(e){const t=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/t.frameWidth,1/t.frameHeight)}}var dg=Object.defineProperty,pg=Object.defineProperties,fg=Object.getOwnPropertyDescriptors,Bl=Object.getOwnPropertySymbols,mg=Object.prototype.hasOwnProperty,gg=Object.prototype.propertyIsEnumerable,Rl=(r,e,t)=>e in r?dg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ot=(r,e)=>{for(var t in e||(e={}))mg.call(e,t)&&Rl(r,t,e[t]);if(Bl)for(var t of Bl(e))gg.call(e,t)&&Rl(r,t,e[t]);return r},pn=(r,e)=>pg(r,fg(e));function at(r,e){var t,i;if(!r)return null;let n,s;if(r!=null&&r.fill?(s=r.fill,n=ot(ot({},e),r)):(s=r,n=e),j.isColorLike(s)){const a=j.shared.setValue(s!=null?s:0);return pn(ot({},n),{color:a.toNumber(),alpha:(t=n.alpha)!=null?t:a.alpha,texture:P.WHITE})}else if(s instanceof dn){const a=s;return pn(ot({},n),{color:16777215,texture:a.texture,matrix:a.transform,fill:(i=n.fill)!=null?i:null})}else if(s instanceof Yt){const a=s;return a.buildLinearGradient(),pn(ot({},n),{color:16777215,texture:a.texture,matrix:a.transform})}const o=ot(ot({},e),r);if(o.texture!==P.WHITE){const a=o.matrix||new R;a.scale(1/o.texture.frameWidth,1/o.texture.frameHeight),o.matrix=a,o.color=16777215}return o.color=j.shared.setValue(o.color).toNumber(),o}var bg=Object.defineProperty,kl=Object.getOwnPropertySymbols,vg=Object.prototype.hasOwnProperty,yg=Object.prototype.propertyIsEnumerable,Fl=(r,e,t)=>e in r?bg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Hr=(r,e)=>{for(var t in e||(e={}))vg.call(e,t)&&Fl(r,t,e[t]);if(kl)for(var t of kl(e))yg.call(e,t)&&Fl(r,t,e[t]);return r};const yt=new W,Ol=new R,lt=class extends ue{constructor(){super(...arguments),this.uid=Y("graphicsContext"),this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new bt,this._transform=new R,this._fillStyle=Hr({},lt.defaultFillStyle),this._strokeStyle=Hr({},lt.defaultStrokeStyle),this._stateStack=[],this._tick=0,this._bounds=new ce,this._boundsDirty=!0}get fillStyle(){return this._fillStyle}set fillStyle(r){this._fillStyle=at(r,lt.defaultFillStyle)}get strokeStyle(){return this._strokeStyle}set strokeStyle(r){this._strokeStyle=at(r,lt.defaultStrokeStyle)}texture(r,e,t,i,n,s){return this.instructions.push({action:"texture",data:{image:r,dx:t||0,dy:i||0,dw:n||r.frameWidth,dh:s||r.frameHeight,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e?j.shared.setValue(e).toNumber():16777215}}),this.onUpdate(),this}beginPath(){return this._activePath=new bt,this}fill(r,e){let t;const i=this.instructions[this.instructions.length-1];return this._tick===0&&i&&i.action==="stroke"?t=i.data.path:t=this._activePath.clone(),t?(r&&(e!==void 0&&typeof r=="number"&&(O("8.0.0","GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),r={color:r,alpha:e}),this.fillStyle=at(r,lt.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:this.fillStyle,path:t}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this):this}stroke(r){let e;const t=this.instructions[this.instructions.length-1];return this._tick===0&&t&&t.action==="fill"?e=t.data.path:e=this._activePath.clone(),e?(r&&(this.strokeStyle=at(r,lt.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:this.strokeStyle,path:e}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this):this}cut(){for(let r=0;r<2;r++){const e=this.instructions[this.instructions.length-1-r],t=this._activePath.clone();e&&(e.action==="stroke"||e.action==="fill")&&(e.data.hole=t)}return this._activePath.instructions.length=0,this}arc(r,e,t,i,n,s){this._tick++;const o=this._transform;return this._activePath.arc(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,t,i,n,s),this}arcTo(r,e,t,i,n){this._tick++;const s=this._transform;return this._activePath.arcTo(s.a*r+s.c*e+s.tx,s.b*r+s.d*e+s.ty,s.a*t+s.c*i+s.tx,s.b*t+s.d*i+s.ty,n),this}arcToSvg(r,e,t,i,n,s,o){this._tick++;const a=this._transform;return this._activePath.arcToSvg(r,e,t,i,n,a.a*s+a.c*o+a.tx,a.b*s+a.d*o+a.ty),this}bezierCurveTo(r,e,t,i,n,s){this._tick++;const o=this._transform;return this._activePath.bezierCurveTo(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,o.a*t+o.c*i+o.tx,o.b*t+o.d*i+o.ty,o.a*n+o.c*s+o.tx,o.b*n+o.d*s+o.ty),this}closePath(){var r;return this._tick++,(r=this._activePath)==null||r.closePath(),this}ellipse(r,e,t,i){return this._tick++,this._activePath.ellipse(r,e,t,i,this._transform.clone()),this}circle(r,e,t){return this._tick++,this._activePath.circle(r,e,t,this._transform.clone()),this}path(r){return this._tick++,this._activePath.addPath(r,this._transform.clone()),this}lineTo(r,e){this._tick++;const t=this._transform;return this._activePath.lineTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}moveTo(r,e){this._tick++;const t=this._transform;return this._activePath.moveTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}quadraticCurveTo(r,e,t,i){this._tick++;const n=this._transform;this._activePath.quadraticCurveTo(n.a*r+n.c*e+n.tx,n.b*r+n.d*e+n.ty,n.a*t+n.c*i+n.tx,n.b*t+n.d*i+n.ty)}rect(r,e,t,i){return this._tick++,this._activePath.rect(r,e,t,i,this._transform.clone()),this}roundRect(r,e,t,i,n){return this._tick++,this._activePath.roundRect(r,e,t,i,n,this._transform.clone()),this}poly(r,e){return this._tick++,this._activePath.poly(r,e,this._transform.clone()),this}star(r,e,t,i,n,s){return this._tick++,this._activePath.star(r,e,t,i,n,s,this._transform.clone()),this}svg(r){this._tick++,El(r,this)}restore(){const r=this._stateStack.pop();r&&(this._transform=r.transform,this._fillStyle=r.fillStyle,this._strokeStyle=r.strokeStyle)}save(){this._stateStack.push({transform:this._transform.clone(),fillStyle:Hr({},this._fillStyle),strokeStyle:Hr({},this._strokeStyle)})}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(r){return this._transform.rotate(r),this}scale(r,e=r){return this._transform.scale(r,e),this}setTransform(r,e,t,i,n,s){return r instanceof R?(this._transform.set(r.a,r.b,r.c,r.d,r.tx,r.ty),this):(this._transform.set(r,e,t,i,n,s),this)}transform(r,e,t,i,n,s){return r instanceof R?(this._transform.append(r),this):(Ol.set(r,e,t,i,n,s),this._transform.append(Ol),this)}translate(r,e){return this._transform.translate(r,e),this}clear(){return this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this._boundsDirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;const r=this._bounds;r.clear();for(let e=0;e<this.instructions.length;e++){const t=this.instructions[e],i=t.action;if(i==="fill"){const n=t.data;r.addBounds(n.path.bounds)}else if(i==="texture"){const n=t.data;r.pushMatrix(n.transform),r.addFrame(n.dx,n.dy,n.dx+n.dw,n.dy+n.dh),r.popMatrix()}}return r}containsPoint(r){const e=this.instructions;let t=!1;return e.forEach(i=>{var n;const s=i.data,o=s.path;if(!i.action||!o)return;const a=s.style,l=(n=o.shapePath)==null?void 0:n.shapePrimitives;this._forEachShape(l,h=>{var u;if(!a||!h)return;typeof a!="number"&&a.matrix?a.matrix.applyInverse(r,yt):yt.copyFrom(r),t=h.contains(yt.x,yt.y);const c=s.hole;if(!c)return;const p=(u=c.shapePath)==null?void 0:u.shapePrimitives;p&&this._forEachShape(p,d=>{d.contains(yt.x,yt.y)&&(t=!1)})})}),t}_forEachShape(r,e){r==null||r.forEach(t=>{const i=t==null?void 0:t.shape;i&&e(i)})}destroy(r=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(e),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(e)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};let He=lt;He.defaultFillStyle={color:0,alpha:1,texture:P.WHITE,matrix:null,fill:null},He.defaultStrokeStyle={width:1,color:0,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:P.WHITE,matrix:null,fill:null};const xg=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,_g=".svg",wg="image/svg+xml",Ul={extension:{type:y.LoadParser,priority:Oe.Low},name:"loadSVG",test(r){return tt(r,wg)||rt(r,_g)},async testParse(r){return typeof r=="string"&&r.startsWith("data:image/svg+xml")||typeof r=="string"&&xg.test(r)},async parse(r){const e=new He;return e.svg(r),e},async load(r){return(await D.ADAPTER.fetch(r)).text()},unload(r){r.destroy(!0)}};function fn(r,e=1){var t;const i=(t=D.RETINA_PREFIX)==null?void 0:t.exec(r);return i?parseFloat(i[1]):e}let Il=0,mn;const Tg="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",Sg={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${Tg}');
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
    `},Pg={id:"loadImageBitmap",code:`
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
    };`};let gn;class Ag{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const t=URL.createObjectURL(new Blob([Sg.code],{type:"application/javascript"})),i=new Worker(t);i.addEventListener("message",n=>{i.terminate(),URL.revokeObjectURL(t),e(n.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e){return this._run("loadImageBitmap",[e])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){mn===void 0&&(mn=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<mn&&(gn||(gn=URL.createObjectURL(new Blob([Pg.code],{type:"application/javascript"}))),this._createdWorkers++,e=new Worker(gn),e.addEventListener("message",t=>{this._complete(t.data),this._returnWorker(t.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){e.error!==void 0?this._resolveHash[e.uuid].reject(e.error):this._resolveHash[e.uuid].resolve(e.data),this._resolveHash[e.uuid]=null}async _run(e,t){await this._initWorkers();const i=new Promise((n,s)=>{this._queue.push({id:e,arguments:t,resolve:n,reject:s})});return this._next(),i}_next(){if(!this._queue.length)return;const e=this._getWorker();if(!e)return;const t=this._queue.pop(),i=t.id;this._resolveHash[Il]={resolve:t.resolve,reject:t.reject},e.postMessage({data:t.arguments,uuid:Il++,id:i})}}const bn=new Ag;function vn(r,e,t){const i=new P({source:r,label:t}),n=()=>{delete e.promiseCache[t],re.has(t)&&re.remove(t)};return i.once("destroy",()=>{t in e.promiseCache&&n()}),i.source.once("destroy",()=>{r.destroyed||n()}),i}var Eg=Object.defineProperty,Gl=Object.getOwnPropertySymbols,Cg=Object.prototype.hasOwnProperty,Mg=Object.prototype.propertyIsEnumerable,$l=(r,e,t)=>e in r?Eg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Bg=(r,e)=>{for(var t in e||(e={}))Cg.call(e,t)&&$l(r,t,e[t]);if(Gl)for(var t of Gl(e))Mg.call(e,t)&&$l(r,t,e[t]);return r};const Rg=[".jpeg",".jpg",".png",".webp",".avif"],kg=["image/jpeg","image/png","image/webp","image/avif"];async function Ll(r){const e=await D.ADAPTER.fetch(r);if(!e.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${r}: ${e.status} ${e.statusText}`);const t=await e.blob();return await createImageBitmap(t)}const yn={name:"loadTextures",extension:{type:y.LoadParser,priority:Oe.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(r){return tt(r,kg)||rt(r,Rg)},async load(r,e,t){var i;let n=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await bn.isImageBitmapSupported()?n=await bn.loadImageBitmap(r):n=await Ll(r):n=await new Promise(o=>{n=new Image,n.crossOrigin=this.config.crossOrigin,n.src=r,n.complete?o(n):n.onload=()=>{o(n)}});const s=new Vt(Bg({resource:n,alphaMode:"premultiply-alpha-on-upload",resolution:((i=e.data)==null?void 0:i.resolution)||fn(r)},e.data));return vn(s,t,r)},unload(r){r.destroy(!0)}};let xn;async function _n(){return xn!=null||(xn=(async()=>{var r;const e=document.createElement("canvas").getContext("webgl");if(!e)return"premultiply-alpha-on-upload";const t=await new Promise(o=>{const a=document.createElement("video");a.onloadeddata=()=>o(a),a.onerror=()=>o(null),a.autoplay=!1,a.crossOrigin="anonymous",a.preload="auto",a.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",a.load()});if(!t)return"premultiply-alpha-on-upload";const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i);const n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);const s=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,s),e.deleteFramebuffer(n),e.deleteTexture(i),(r=e.getExtension("WEBGL_lose_context"))==null||r.loseContext(),s[0]<=s[3]?"premultiplied-alpha":"premultiply-alpha-on-upload"})()),xn}var Fg=Object.defineProperty,Og=Object.defineProperties,Ug=Object.getOwnPropertyDescriptors,Dl=Object.getOwnPropertySymbols,Ig=Object.prototype.hasOwnProperty,Gg=Object.prototype.propertyIsEnumerable,zl=(r,e,t)=>e in r?Fg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wn=(r,e)=>{for(var t in e||(e={}))Ig.call(e,t)&&zl(r,t,e[t]);if(Dl)for(var t of Dl(e))Gg.call(e,t)&&zl(r,t,e[t]);return r},$g=(r,e)=>Og(r,Ug(e));const Nl=class extends he{constructor(r){var e;super(r),this.isReady=!1,this.uploadMethodId="video",r=wn(wn({},Nl.defaultOptions),r),this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=r.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=r.autoPlay!==!1,this.alphaMode=(e=r.alphaMode)!=null?e:"premultiply-alpha-on-upload",this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),r.autoLoad!==!1&&this.load()}updateFrame(){if(!this.destroyed){if(this._updateFPS){const r=de.shared.elapsedMS*this.resource.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-r)}(!this._updateFPS||this._msToNextUpdate<=0)&&(this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0),this.isValid&&this.update()}}_videoFrameRequestCallback(){this.updateFrame(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback)}get isValid(){return!!this.resource.videoWidth&&!!this.resource.videoHeight}async load(){if(this._load)return this._load;const r=this.resource;return(r.readyState===r.HAVE_ENOUGH_DATA||r.readyState===r.HAVE_FUTURE_DATA)&&r.width&&r.height&&(r.complete=!0),r.addEventListener("play",this._onPlayStart),r.addEventListener("pause",this._onPlayStop),r.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._onCanPlay():(this.options.preload||r.addEventListener("canplay",this._onCanPlay),r.addEventListener("canplaythrough",this._onCanPlay),r.addEventListener("error",this._onError,!0)),this.alphaMode=await _n(),this._load=new Promise((e,t)=>{this.isValid?e(this):(this._resolve=e,this._reject=t,r.load())}),this._load}_onError(r){this.resource.removeEventListener("error",this._onError,!0),this.emit("error",r),this._reject&&(this._reject(r),this._reject=null,this._resolve=null)}_isSourcePlaying(){const r=this.resource;return!r.paused&&!r.ended&&this._isSourceReady()}_isSourceReady(){return this.resource.readyState>2}_onPlayStart(){this.isValid||this._onCanPlay(),this._configureAutoUpdate()}_onPlayStop(){this._configureAutoUpdate()}_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0)}_onCanPlay(){const r=this.resource;r.removeEventListener("canplay",this._onCanPlay),r.removeEventListener("canplaythrough",this._onCanPlay),this.isValid&&(this.isReady=!0,this.resize(r.videoWidth,r.videoHeight)),this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0,this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.resource.play()}destroy(){this._configureAutoUpdate();const r=this.resource;r&&(r.removeEventListener("play",this._onPlayStart),r.removeEventListener("pause",this._onPlayStop),r.removeEventListener("seeked",this._onSeeked),r.removeEventListener("canplay",this._onCanPlay),r.removeEventListener("canplaythrough",this._onCanPlay),r.removeEventListener("error",this._onError,!0),r.pause(),r.src="",r.load()),super.destroy()}get autoUpdate(){return this._autoUpdate}set autoUpdate(r){r!==this._autoUpdate&&(this._autoUpdate=r,this._configureAutoUpdate())}get updateFPS(){return this._updateFPS}set updateFPS(r){r!==this._updateFPS&&(this._updateFPS=r,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.source.requestVideoFrameCallback?(this._isConnectedToTicker&&(de.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),this._videoFrameRequestCallbackHandle===null&&(this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback))):(this._videoFrameRequestCallbackHandle!==null&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(de.shared.add(this.updateFrame,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(this._videoFrameRequestCallbackHandle!==null&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(de.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}};let xt=Nl;xt.defaultOptions=$g(wn({},he.defaultOptions),{autoLoad:!0,autoPlay:!0,updateFPS:0,crossorigin:!0,loop:!1,muted:!0,playsinline:!0,preload:!1}),xt.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};var Lg=Object.defineProperty,Dg=Object.defineProperties,zg=Object.getOwnPropertyDescriptors,Hl=Object.getOwnPropertySymbols,Ng=Object.prototype.hasOwnProperty,Hg=Object.prototype.propertyIsEnumerable,jl=(r,e,t)=>e in r?Lg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Tn=(r,e)=>{for(var t in e||(e={}))Ng.call(e,t)&&jl(r,t,e[t]);if(Hl)for(var t of Hl(e))Hg.call(e,t)&&jl(r,t,e[t]);return r},Wl=(r,e)=>Dg(r,zg(e));const Vl=[".mp4",".m4v",".webm",".ogg",".ogv",".h264",".avi",".mov"],jg=Vl.map(r=>`video/${r.substring(1)}`);function Yl(r,e,t){t===void 0&&!e.startsWith("data:")?r.crossOrigin=Xl(e):t!==!1&&(r.crossOrigin=typeof t=="string"?t:"anonymous")}function Xl(r,e=globalThis.location){if(r.startsWith("data:"))return"";e=e||globalThis.location;const t=new URL(r,document.baseURI);return t.hostname!==e.hostname||t.port!==e.port||t.protocol!==e.protocol?"anonymous":""}const ql={name:"loadVideoTextures",extension:{type:y.LoadParser},config:null,test(r){const e=tt(r,jg),t=rt(r,Vl);return e||t},async load(r,e,t){var i,n;const s=Tn(Wl(Tn({},xt.defaultOptions),{resolution:((i=e.data)==null?void 0:i.resolution)||fn(r),alphaMode:((n=e.data)==null?void 0:n.alphaMode)||await _n()}),e.data),o=document.createElement("video"),a={preload:s.autoLoad!==!1?"auto":void 0,"webkit-playsinline":s.playsinline!==!1?"":void 0,playsinline:s.playsinline!==!1?"":void 0,muted:s.muted===!0?"":void 0,loop:s.loop===!0?"":void 0,autoplay:s.autoPlay!==!1?"":void 0};Object.keys(a).forEach(c=>{const p=a[c];p!==void 0&&o.setAttribute(c,p)}),s.muted===!0&&(o.muted=!0),Yl(o,r,s.crossorigin);const l=document.createElement("source");let h;if(r.startsWith("data:"))h=r.slice(5,r.indexOf(";"));else if(!r.startsWith("blob:")){const c=r.split("?")[0].slice(r.lastIndexOf(".")+1).toLowerCase();h=xt.MIME_TYPES[c]||`video/${c}`}l.src=r,h&&(l.type=h),o.appendChild(l);const u=new xt(Wl(Tn({},s),{resource:o}));return vn(u,t,r)},unload(r){r.destroy(!0)}},Kl={extension:y.ResolveParser,test:yn.test,parse:r=>{var e,t;return{resolution:parseFloat((t=(e=D.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:r.split(".").pop(),src:r}}};J.add(Wa,Xa,Va,Qa,qa,Ka,Za,Ja,el,nl,Ul,yn,ql,Kl,ja,Ha);const Zl={loader:y.LoadParser,resolver:y.ResolveParser,cache:y.CacheParser,detection:y.DetectionParser};J.handle(y.Asset,r=>{const e=r.ref;Object.entries(Zl).filter(([t])=>!!e[t]).forEach(([t,i])=>{var n;return J.add(Object.assign(e[t],{extension:(n=e[t].extension)!=null?n:i}))})},r=>{const e=r.ref;Object.keys(Zl).filter(t=>!!e[t]).forEach(t=>J.remove(e[t]))});class se{constructor(e,t,i){this._x=t||0,this._y=i||0,this._observer=e}clone(e){return new se(e!=null?e:this._observer,this._x,this._y)}set(e=0,t=e){return(this._x!==e||this._y!==t)&&(this._x=e,this._y=t,this._observer.onUpdate()),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this._observer.onUpdate()),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this._observer.onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this._observer.onUpdate(this))}}function Ql(r,e,t){const i=r.length;let n;if(e>=i||t===0)return;t=e+t>i?i-e:t;const s=i-t;for(n=e;n<s;++n)r[n]=r[n+t];r.length=s}const Jl={allowChildren:!0,removeChildren(r=0,e){const t=e!=null?e:this.children.length,i=t-r,n=[];if(i>0&&i<=t){for(let s=t-1;s>=r;s--){const o=this.children[s];o&&(this.layerGroup&&this.layerGroup.removeChild(o),n.push(o),o.parent=null)}Ql(this.children,r,t);for(let s=0;s<n.length;++s)this.emit("childRemoved",n[s],this,s),n[s].emit("removed",this);return n}else if(i===0&&this.children.length===0)return n;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(r){const e=this.getChildAt(r);return this.removeChild(e)},getChildAt(r){if(r<0||r>=this.children.length)throw new Error(`getChildAt: Index (${r}) does not exist.`);return this.children[r]},setChildIndex(r,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(r),this.addChildAt(r,e)},getChildIndex(r){const e=this.children.indexOf(r);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(r,e){this.allowChildren||O(z,"addChildAt: Only Containers will be allowed to add children in v8.0.0");const{children:t}=this;if(e<0||e>t.length)throw new Error(`${r}addChildAt: The index ${e} supplied is out of bounds ${t.length}`);if(r.parent){const i=r.parent.children.indexOf(r);if(r.parent===this&&i===e)return r;i!==-1&&r.parent.children.splice(i,1)}return e===t.length?t.push(r):t.splice(e,0,r),r.parent=this,r.didChange=!0,r.didViewUpdate=!1,r._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(r),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",r,this,e),r.emit("added",this),r},swapChildren(r,e){if(r===e)return;const t=this.getChildIndex(r),i=this.getChildIndex(e);this.children[t]=e,this.children[i]=r},removeFromParent(){var r;(r=this.parent)==null||r.removeChild(this)}};class jr{constructor(e){this.pipe="filter",this.priority=1,this.filters=e==null?void 0:e.filters}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null}}const eh=[];function th(r){const e=eh.pop()||new jr;return e.filters=r,e}function rh(r){r.filters=null,eh.push(r)}class ih{constructor(e,t){this._pool=[],this._count=0,this._index=0,this._classType=e,t&&this.prepopulate(t)}prepopulate(e){for(let t=0;t<e;t++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){var t;let i;return this._index>0?i=this._pool[--this._index]:i=new this._classType,(t=i.init)==null||t.call(i,e),i}return(e){var t;(t=e.reset)==null||t.call(e),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._pool.length}get totalUsed(){return this._count-this._pool.length}}class nh{constructor(){this._poolsByClass=new Map}prepopulate(e,t){this.getPool(e).prepopulate(t)}get(e,t){return this.getPool(e).get(t)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new ih(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(t=>{const i=e[t._classType.name]?t._classType.name+t._classType.ID:t._classType.name;e[i]={free:t.totalFree,used:t.totalUsed,size:t.totalSize}}),e}}const H=new nh;class sh{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this._tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let t=0;t<this._tests.length;t++){const i=this._tests[t];if(i.test(e))return H.get(i.maskClass,e)}return e}returnMaskEffect(e){H.return(e)}}const Wr=new sh;J.handleByList(y.MaskEffect,Wr._effectClasses);const oh={_mask:null,_filters:null,set mask(r){if(this._mask||(this._mask={mask:null,effect:null}),this._mask.mask===r||(this._mask.effect&&(this.removeEffect(this._mask.effect),Wr.returnMaskEffect(this._mask.effect),this._mask.effect=null),this._mask.mask=r,r==null))return;const e=Wr.getMaskEffect(r);this._mask.effect=e,this.addEffect(e)},get mask(){var r;return(r=this._mask)==null?void 0:r.mask},set filters(r){if(!Array.isArray(r)&&r!==null&&(r=[r]),this._filters||(this._filters={filters:null,effect:null}),this._filters.filters===r||(this._filters.effect&&(this.removeEffect(this._filters.effect),rh(this._filters.effect),this._filters.effect=null),this._filters.filters=r,!r))return;const e=th(r);this._filters.effect=e,this.addEffect(e)},get filters(){var r;return(r=this._filters)==null?void 0:r.filters}},ah={getChildByName(r,e=!1){return this.getChildByLabel(r,e)},getChildByLabel(r,e=!1){const t=this.children;for(let i=0;i<t.length;i++){const n=t[i];if(n.label===r||r instanceof RegExp&&r.test(n.label))return n}if(e)for(let i=0;i<t.length;i++){const n=t[i].getChildByLabel(r,!0);if(n)return n}return null},getChildrenByLabel(r,e=!1,t=[]){const i=this.children;for(let n=0;n<i.length;n++){const s=i[n];(s.label===r||r instanceof RegExp&&r.test(s.label))&&t.push(s)}if(e)for(let n=0;n<i.length;n++)i[n].getChildrenByLabel(r,!0,t);return t}};function Ge(r,e){const t=e._scale,i=e._pivot,n=e._position,s=t._x,o=t._y,a=i._x,l=i._y;r.a=e._cx*s,r.b=e._sx*s,r.c=e._cy*o,r.d=e._sy*o,r.tx=n._x-(a*r.a+l*r.c),r.ty=n._y-(a*r.b+l*r.d)}function Xt(r,e,t){t.clear();let i;return r.parent?e?i=r.parent.worldTransform:i=qt(r,new R):i=R.IDENTITY,Sn(r,t,i,e),t.isValid||t.set(0,0,0,0),t}function Sn(r,e,t,i){var n,s;if(!r.visible||!r.measurable)return;let o;i?o=r.worldTransform:(r.didChange&&Ge(r.localTransform,r),o=R.shared.appendFrom(r.localTransform,t).clone());const a=e,l=!!r.effects.length;l&&(e=e.clone()),r.view&&(e.setMatrix(o),r.view.addBounds(e));for(let h=0;h<r.children.length;h++)Sn(r.children[h],e,o,i);if(l){for(let h=0;h<r.effects.length;h++)(s=(n=r.effects[h]).addBounds)==null||s.call(n,e);a.setMatrix(R.IDENTITY),a.addBounds(e)}}function qt(r,e){const t=r.parent;return t&&(qt(t,e),t.didChange&&Ge(t.localTransform,t),e.append(t.localTransform)),e}function je(r,e,t){e.clear(),t||(t=new R),r.view&&(e.setMatrix(t),r.view.addBounds(e));for(let i=0;i<r.children.length;i++)lh(r.children[i],e,t,r);return e.isValid||e.set(0,0,0,0),e}function lh(r,e,t,i){var n,s;if(!r.visible||!r.measurable)return;r.didChange&&Ge(r.localTransform,r);const o=r.localTransform,a=R.shared.appendFrom(o,t).clone(),l=e,h=!!r.effects.length;h&&(e=new ce),r.view&&(e.setMatrix(a),r.view.addBounds(e));for(let u=0;u<r.children.length;u++)lh(r.children[u],e,a,i);if(h){for(let u=0;u<r.effects.length;u++)(s=(n=r.effects[u]).addLocalBounds)==null||s.call(n,e,i);l.setMatrix(R.IDENTITY),l.addBounds(e)}}function hh(r,e,t){const i=r.parent;i&&i!==e&&(hh(i,e,t),Ge(i.localTransform,i),t.append(i.localTransform))}const Kt=new ce,Zt=new R,uh={get width(){return Math.abs(this.scale.x*je(this,Kt,Zt).width)},set width(r){const e=je(this,Kt,Zt).width;e!==0?this.scale.x=r/e:this.scale.x=1},get height(){return Math.abs(this.scale.y*je(this,Kt,Zt).height)},set height(r){const e=je(this,Kt,Zt).height;e!==0?this.scale.y=r/e:this.scale.y=1},getLocalBounds(r){const e=je(this,new ce,Zt);return r?r.copyFromBounds(e):e.rectangle.clone()},getBounds(r,e){const t=Xt(this,r,Kt);return e?e.copyFromBounds(t):t.rectangle.clone()}},ch={_onRender:null,set onRender(r){const e=this.layerGroup;if(!r){this._onRender&&(e==null||e.removeOnRender(this)),this._onRender=null;return}this._onRender||e==null||e.addOnRender(this),this._onRender=r},get onRender(){return this._onRender}},dh={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(r){this._zIndex!==r&&(this._zIndex=r,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(Wg))}};function Wg(r,e){return r._zIndex-e._zIndex}const ph={getGlobalPosition(r=new W,e=!1){return this.parent?this.parent.toGlobal(this._position,r,e):(r.x=this._position.x,r.y=this._position.y),r},toGlobal(r,e,t=!1){if(!t){this.didChange&&Ge(this.localTransform,this);const i=qt(this,new R);return i.append(this.localTransform),i.apply(r,e)}return this.worldTransform.apply(r,e)},toLocal(r,e,t,i){if(e&&(r=e.toGlobal(r,t,i)),!i){this.didChange&&Ge(this.localTransform,this);const n=qt(this,new R);return n.append(this.localTransform),n.applyInverse(r,t)}return this.worldTransform.applyInverse(r,t)}};class Pn{constructor(){this.uid=Y("instructionSet"),this.instructions=[],this.instructionSize=0}reset(){this.instructionSize=0}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}lastInstruction(){return this.instructions[this.instructionSize-1]}}class fh{constructor(e){this.type="layer",this.root=null,this.canBundle=!1,this.layerGroupParent=null,this.layerGroupChildren=[],this._children=[],this.worldTransform=new R,this.worldColor=4294967295,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new Pn,this._onRenderContainers=[],this.root=e,this.addChild(e)}get localTransform(){return this.root.localTransform}get layerTransform(){return this.root.layerTransform}addLayerGroupChild(e){e.layerGroupParent&&e.layerGroupParent._removeLayerGroupChild(e),e.layerGroupParent=this,this.onChildUpdate(e.root),this.layerGroupChildren.push(e)}_removeLayerGroupChild(e){e.root.didChange&&this._removeChildFromUpdate(e.root);const t=this.layerGroupChildren.indexOf(e);t>-1&&this.layerGroupChildren.splice(t,1),e.layerGroupParent=null}addChild(e){if(this.structureDidChange=!0,e!==this.root&&(this._children.push(e),e.updateTick=-1,e.parent===this.root?e.relativeLayerDepth=1:e.relativeLayerDepth=e.parent.relativeLayerDepth+1,e._onRender&&this.addOnRender(e)),e.layerGroup){if(e.layerGroup.root===e){this.addLayerGroupChild(e.layerGroup);return}}else e.layerGroup=this,e.didChange=!0;const t=e.children;e.isLayerRoot||this.onChildUpdate(e);for(let i=0;i<t.length;i++)this.addChild(t[i])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&this.removeOnRender(e),e.layerGroup.root!==e){const i=e.children;for(let n=0;n<i.length;n++)this.removeChild(i[n]);e.didChange&&e.layerGroup._removeChildFromUpdate(e),e.layerGroup=null}else this._removeLayerGroupChild(e.layerGroup);const t=this._children.indexOf(e);t>-1&&this._children.splice(t,1)}onChildUpdate(e){let t=this.childrenToUpdate[e.relativeLayerDepth];t||(t=this.childrenToUpdate[e.relativeLayerDepth]={index:0,list:[]}),t.list[t.index++]=e}updateRenderable(e){e.layerVisibleRenderable<3||(e.didViewUpdate=!1,this.instructionSet.renderPipes[e.view.renderPipeId].updateRenderable(e))}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}_removeChildFromUpdate(e){const t=this.childrenToUpdate[e.relativeLayerDepth];if(!t)return;const i=t.list.indexOf(e);i>-1&&t.list.splice(i,1),t.index--}get isRenderable(){const e=this.worldColor>>24&255;return this.root.localVisibleRenderable===3&&e>0}addOnRender(e){this._onRenderContainers.push(e)}removeOnRender(e){this._onRenderContainers.splice(this._onRenderContainers.indexOf(e),1)}runOnRender(){this._onRenderContainers.forEach(e=>{e._onRender()})}}const mh=new se(null),An=new se(null),En=new se(null,1,1),Vr=1,Cn=2,Yr=4,Vg=8;class q extends ue{constructor({label:e,layer:t,view:i,sortableChildren:n}={}){super(),this.uid=Y("renderable"),this.label=null,this._updateFlags=15,this.isLayerRoot=!1,this.layerGroup=null,this.didChange=!1,this.didViewUpdate=!1,this.relativeLayerDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new R,this.layerTransform=new R,this.destroyed=!1,this._position=new se(this,0,0),this._scale=En,this._pivot=An,this._skew=mh,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=4294967295,this.layerColor=4294967295,this._tintColor=new j,this.localBlendMode="inherit",this.layerBlendMode="normal",this.localVisibleRenderable=3,this.layerVisibleRenderable=3,this.effects=[],e&&(this.label=e),t&&this.enableLayer(),i&&(this.view=i,this.view.owner=this),this.sortableChildren=!!n}static mixin(e){Object.defineProperties(q.prototype,Object.getOwnPropertyDescriptors(e))}get name(){return O("8.0.0","Container.name property has been removed, use Container.label instead"),this.label}set name(e){O("8.0.0","Container.name property has been removed, use Container.label instead"),this.label=e}addEffect(e){this.effects.indexOf(e)===-1&&(this.effects.push(e),this.effects.sort((t,i)=>t.priority-i.priority),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())}removeEffect(e){const t=this.effects.indexOf(e);t!==-1&&(this.effects.splice(t,1),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())}addChild(...e){if(this.allowChildren||O(z,"addChild: Only Containers will be allowed to add children in v8.0.0"),e.length>1){for(let i=0;i<e.length;i++)this.addChild(e[i]);return e[0]}const t=e[0];return t.parent===this?(this.children.splice(this.children.indexOf(t),1),this.children.push(t),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),t):(t.parent&&t.parent.removeChild(t),this.children.push(t),this.sortableChildren&&(this.sortDirty=!0),t.parent=this,t.didChange=!0,t.didViewUpdate=!1,t._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(t),this.emit("childAdded",t,this,this.children.length-1),t.emit("added",this),t._zIndex!==0&&t.depthOfChildModified(),t)}removeChild(...e){if(e.length>1){for(let n=0;n<e.length;n++)this.removeChild(e[n]);return e[0]}const t=e[0],i=this.children.indexOf(t);return i>-1&&(this.children.splice(i,1),this.layerGroup&&this.layerGroup.removeChild(t)),t.parent=null,this.emit("childRemoved",t,this,i),t.emit("removed",this),t}onUpdate(e){if(e&&e===this._skew&&this._updateSkew(),!this.didChange)if(this.didChange=!0,this.isLayerRoot){const t=this.layerGroup.layerGroupParent;t&&t.onChildUpdate(this)}else this.layerGroup&&this.layerGroup.onChildUpdate(this)}onViewUpdate(){this.didViewUpdate||(this.didViewUpdate=!0,this.layerGroup&&this.layerGroup.onChildViewUpdate(this))}set layer(e){if(this.isLayerRoot&&e===!1)throw new Error("[Pixi] cannot undo a layer just yet");e&&this.enableLayer()}get layer(){return this.isLayerRoot}enableLayer(){if(this.layerGroup&&this.layerGroup.root===this)return;this.isLayerRoot=!0;const e=this.layerGroup;if(e&&e.removeChild(this),this.layerGroup=new fh(this),e){for(let t=0;t<e.layerGroupChildren.length;t++){const i=e.layerGroupChildren[t];let n=i.root;for(;n;){if(n===this){this.layerGroup.addLayerGroupChild(i);break}n=n.parent}}e.addLayerGroupChild(this.layerGroup)}this._updateIsSimple()}get worldTransform(){return this._worldTransform||(this._worldTransform=new R),this.layerGroup&&(this.isLayerRoot?this._worldTransform.copyFrom(this.layerGroup.worldTransform):this._worldTransform.appendFrom(this.layerTransform,this.layerGroup.worldTransform)),this._worldTransform}get x(){return this._position.x}set x(e){this._position.x=e}get y(){return this._position.y}set y(e){this._position.y=e}get position(){return this._position}set position(e){this._position.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.onUpdate(this._skew))}get angle(){return this.rotation*Ga}set angle(e){this.rotation=e*$a}get pivot(){return this._pivot===An&&(this._pivot=new se(this,0,0)),this._pivot}set pivot(e){this._pivot===An&&(this._pivot=new se(this,0,0)),this._pivot.copyFrom(e)}get skew(){return this._skew===mh&&(this._skew=new se(this,0,0)),this._skew}get scale(){return this._scale===En&&(this._scale=new se(this,1,1)),this._scale}set scale(e){this._scale===En&&(this._scale=new se(this,0,0)),this._scale.copyFrom(e)}_updateSkew(){const e=this._rotation,t=this._skew;this._cx=Math.cos(e+t._y),this._sx=Math.sin(e+t._y),this._cy=-Math.sin(e-t._x),this._sy=Math.cos(e-t._x)}set alpha(e){e=e*255|0,e!==(this.localColor>>24&255)&&(this.localColor=this.localColor&16777215|e<<24,this._updateFlags|=Vr,this.onUpdate())}get alpha(){return(this.localColor>>24&255)/255}set tint(e){this._tintColor.setValue(e);const t=this._tintColor.toBgrNumber();t!==(this.localColor&16777215)&&(this.localColor=this.localColor&4278190080|t&16777215,this._updateFlags|=Vr,this.onUpdate())}get tint(){return this._tintColor.value}set blendMode(e){this.localBlendMode!==e&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=Cn,this.localBlendMode=e,this.onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localVisibleRenderable&2)}set visible(e){const t=e?1:0;(this.localVisibleRenderable&2)>>1!==t&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=Yr,this.localVisibleRenderable=this.localVisibleRenderable&1|t<<1,this.onUpdate())}get renderable(){return!!(this.localVisibleRenderable&1)}set renderable(e){const t=e?1:0;(this.localVisibleRenderable&1)!==t&&(this.localVisibleRenderable=this.localVisibleRenderable&2|t,this._updateFlags|=Yr,this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.onUpdate())}get isRenderable(){const e=this.layerColor>>24&255;return this.localVisibleRenderable===3&&e>0}_updateIsSimple(){this.isSimple=!this.isLayerRoot&&this.effects.length===0}destroy(e=!1){if(this.destroyed)return;this.destroyed=!0,this.removeFromParent(),this.parent=null,this._mask=null,this._filters=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed"),this.removeAllListeners();const t=typeof e=="boolean"?e:e==null?void 0:e.children,i=this.removeChildren(0,this.children.length);if(t)for(let n=0;n<i.length;++n)i[n].destroy(e);this.view&&(this.view.destroy(e),this.view.owner=null)}}q.mixin(Jl),q.mixin(ph),q.mixin(ch),q.mixin(uh),q.mixin(oh),q.mixin(ah),q.mixin(dh);class Yg{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){this._tickerAdded||!this.domElement||(de.system.add(this._tickerUpdate,this,Ke.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(de.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const e=this.events._rootPointerEvent;this.events.supportsTouchEvents&&e.pointerType==="touch"||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY}))}_tickerUpdate(e){this._deltaTime+=e.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this._update())}}const $e=new Yg;class Ar{constructor(e){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=Ar.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new W,this.page=new W,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=e}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(e,t,i){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(e,t,i,n,s){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}class Qt extends Ar{constructor(){super(...arguments),this.client=new W,this.movement=new W,this.offset=new W,this.global=new W,this.screen=new W}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(e,t,i){return e.worldTransform.applyInverse(i||this.global,t)}getModifierState(e){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(e)}initMouseEvent(e,t,i,n,s,o,a,l,h,u,c,p,d,f,g){throw new Error("Method not implemented.")}}class _e extends Qt{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class ht extends Qt{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}ht.DOM_DELTA_PIXEL=0,ht.DOM_DELTA_LINE=1,ht.DOM_DELTA_PAGE=2;const Xg=2048,qg=new W,Jt=new W;class gh{constructor(e){this.dispatch=new ue,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,t){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:t,priority:0}),this.mappingTable[e].sort((i,n)=>i.priority-n.priority)}dispatchEvent(e,t){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,t),this.dispatch.emit(t||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const t=this.mappingTable[e.type];if(t)for(let i=0,n=t.length;i<n;i++)t[i].fn(e)}hitTest(e,t){$e.pauseUpdate=!0;const i=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",n=this[i](this.rootTarget,this.rootTarget.eventMode,qg.set(e,t),this.hitTestFn,this.hitPruneFn);return n&&n[0]}propagate(e,t){if(!e.target)return;const i=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let n=0,s=i.length-1;n<s;n++)if(e.currentTarget=i[n],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,t),!(e.propagationStopped||e.propagationImmediatelyStopped)){e.eventPhase=e.BUBBLING_PHASE;for(let n=i.length-2;n>=0;n--)if(e.currentTarget=i[n],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,t,i=this._allInteractiveElements){if(i.length===0)return;e.eventPhase=e.BUBBLING_PHASE;const n=Array.isArray(t)?t:[t];for(let s=i.length-1;s>=0;s--)n.forEach(o=>{e.currentTarget=i[s],this.notifyTarget(e,o)})}propagationPath(e){const t=[e];for(let i=0;i<Xg&&e!==this.rootTarget&&e.parent;i++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");t.push(e.parent),e=e.parent}return t.reverse(),t}hitTestMoveRecursive(e,t,i,n,s,o=!1){let a=!1;if(this._interactivePrune(e))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&($e.pauseUpdate=!1),e.interactiveChildren&&e.children){const u=e.children;for(let c=u.length-1;c>=0;c--){const p=u[c],d=this.hitTestMoveRecursive(p,this._isInteractive(t)?t:p.eventMode,i,n,s,o||s(e,i));if(d){if(d.length>0&&!d[d.length-1].parent)continue;const f=e.isInteractive();(d.length>0||f)&&(f&&this._allInteractiveElements.push(e),d.push(e)),this._hitElements.length===0&&(this._hitElements=d),a=!0}}}const l=this._isInteractive(t),h=e.isInteractive();return h&&h&&this._allInteractiveElements.push(e),o||this._hitElements.length>0?null:a?this._hitElements:l&&!s(e,i)&&n(e,i)?h?[e]:[]:null}hitTestRecursive(e,t,i,n,s){if(this._interactivePrune(e)||s(e,i))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&($e.pauseUpdate=!1),e.interactiveChildren&&e.children){const l=e.children,h=i;for(let u=l.length-1;u>=0;u--){const c=l[u],p=this.hitTestRecursive(c,this._isInteractive(t)?t:c.eventMode,h,n,s);if(p){if(p.length>0&&!p[p.length-1].parent)continue;const d=e.isInteractive();return(p.length>0||d)&&p.push(e),p}}}const o=this._isInteractive(t),a=e.isInteractive();return o&&n(e,i)?a?[e]:[]:null}_isInteractive(e){return e==="static"||e==="dynamic"}_interactivePrune(e){return!e||!e.visible||!e.renderable||e.eventMode==="none"||e.eventMode==="passive"&&!e.interactiveChildren}hitPruneFn(e,t){if(e.hitArea&&(e.worldTransform.applyInverse(t,Jt),!e.hitArea.contains(Jt.x,Jt.y)))return!0;if(e.effects&&e.effects.length)for(let i=0;i<e.effects.length;i++){const n=e.effects[i];if(n.containsPoint&&!n.containsPoint(t,this.hitTestFn))return!0}return!1}hitTestFn(e,t){var i;return e.eventMode==="passive"?!1:e.hitArea?!0:(i=e.view)!=null&&i.containsPoint?(e.worldTransform.applyInverse(t,Jt),e.view.containsPoint(Jt)):!1}notifyTarget(e,t){var i,n;t=t!=null?t:e.type;const s=`on${t}`;(n=(i=e.currentTarget)[s])==null||n.call(i,e);const o=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${t}capture`:t;this._notifyListeners(e,o),e.eventPhase===e.AT_TARGET&&this._notifyListeners(e,t)}mapPointerDown(e){if(!(e instanceof _e))return;const t=this.createPointerEvent(e);if(this.dispatchEvent(t,"pointerdown"),t.pointerType==="touch")this.dispatchEvent(t,"touchstart");else if(t.pointerType==="mouse"||t.pointerType==="pen"){const n=t.button===2;this.dispatchEvent(t,n?"rightdown":"mousedown")}const i=this.trackingData(e.pointerId);i.pressTargetsByButton[e.button]=t.composedPath(),this.freeEvent(t)}mapPointerMove(e){var t,i,n;if(!(e instanceof _e))return;this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const s=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const o=s.pointerType==="mouse"||s.pointerType==="pen",a=this.trackingData(e.pointerId),l=this.findMountedTarget(a.overTargets);if(((t=a.overTargets)==null?void 0:t.length)>0&&l!==s.target){const c=e.type==="mousemove"?"mouseout":"pointerout",p=this.createPointerEvent(e,c,l);if(this.dispatchEvent(p,"pointerout"),o&&this.dispatchEvent(p,"mouseout"),!s.composedPath().includes(l)){const d=this.createPointerEvent(e,"pointerleave",l);for(d.eventPhase=d.AT_TARGET;d.target&&!s.composedPath().includes(d.target);)d.currentTarget=d.target,this.notifyTarget(d),o&&this.notifyTarget(d,"mouseleave"),d.target=d.target.parent;this.freeEvent(d)}this.freeEvent(p)}if(l!==s.target){const c=e.type==="mousemove"?"mouseover":"pointerover",p=this.clonePointerEvent(s,c);this.dispatchEvent(p,"pointerover"),o&&this.dispatchEvent(p,"mouseover");let d=l==null?void 0:l.parent;for(;d&&d!==this.rootTarget.parent&&d!==s.target;)d=d.parent;if(!d||d===this.rootTarget.parent){const f=this.clonePointerEvent(s,"pointerenter");for(f.eventPhase=f.AT_TARGET;f.target&&f.target!==l&&f.target!==this.rootTarget.parent;)f.currentTarget=f.target,this.notifyTarget(f),o&&this.notifyTarget(f,"mouseenter"),f.target=f.target.parent;this.freeEvent(f)}this.freeEvent(p)}const h=[],u=(i=this.enableGlobalMoveEvents)!=null?i:!0;this.moveOnAll?h.push("pointermove"):this.dispatchEvent(s,"pointermove"),u&&h.push("globalpointermove"),s.pointerType==="touch"&&(this.moveOnAll?h.splice(1,0,"touchmove"):this.dispatchEvent(s,"touchmove"),u&&h.push("globaltouchmove")),o&&(this.moveOnAll?h.splice(1,0,"mousemove"):this.dispatchEvent(s,"mousemove"),u&&h.push("globalmousemove"),this.cursor=(n=s.target)==null?void 0:n.cursor),h.length>0&&this.all(s,h),this._allInteractiveElements.length=0,this._hitElements.length=0,a.overTargets=s.composedPath(),this.freeEvent(s)}mapPointerOver(e){var t;if(!(e instanceof _e))return;const i=this.trackingData(e.pointerId),n=this.createPointerEvent(e),s=n.pointerType==="mouse"||n.pointerType==="pen";this.dispatchEvent(n,"pointerover"),s&&this.dispatchEvent(n,"mouseover"),n.pointerType==="mouse"&&(this.cursor=(t=n.target)==null?void 0:t.cursor);const o=this.clonePointerEvent(n,"pointerenter");for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),s&&this.notifyTarget(o,"mouseenter"),o.target=o.target.parent;i.overTargets=n.composedPath(),this.freeEvent(n),this.freeEvent(o)}mapPointerOut(e){if(!(e instanceof _e))return;const t=this.trackingData(e.pointerId);if(t.overTargets){const i=e.pointerType==="mouse"||e.pointerType==="pen",n=this.findMountedTarget(t.overTargets),s=this.createPointerEvent(e,"pointerout",n);this.dispatchEvent(s),i&&this.dispatchEvent(s,"mouseout");const o=this.createPointerEvent(e,"pointerleave",n);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),i&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;t.overTargets=null,this.freeEvent(s),this.freeEvent(o)}this.cursor=null}mapPointerUp(e){if(!(e instanceof _e))return;const t=performance.now(),i=this.createPointerEvent(e);if(this.dispatchEvent(i,"pointerup"),i.pointerType==="touch")this.dispatchEvent(i,"touchend");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const a=i.button===2;this.dispatchEvent(i,a?"rightup":"mouseup")}const n=this.trackingData(e.pointerId),s=this.findMountedTarget(n.pressTargetsByButton[e.button]);let o=s;if(s&&!i.composedPath().includes(s)){let a=s;for(;a&&!i.composedPath().includes(a);){if(i.currentTarget=a,this.notifyTarget(i,"pointerupoutside"),i.pointerType==="touch")this.notifyTarget(i,"touchendoutside");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const l=i.button===2;this.notifyTarget(i,l?"rightupoutside":"mouseupoutside")}a=a.parent}delete n.pressTargetsByButton[e.button],o=a}if(o){const a=this.clonePointerEvent(i,"click");a.target=o,a.path=null,n.clicksByButton[e.button]||(n.clicksByButton[e.button]={clickCount:0,target:a.target,timeStamp:t});const l=n.clicksByButton[e.button];if(l.target===a.target&&t-l.timeStamp<200?++l.clickCount:l.clickCount=1,l.target=a.target,l.timeStamp=t,a.detail=l.clickCount,a.pointerType==="mouse"){const h=a.button===2;this.dispatchEvent(a,h?"rightclick":"click")}else a.pointerType==="touch"&&this.dispatchEvent(a,"tap");this.dispatchEvent(a,"pointertap"),this.freeEvent(a)}this.freeEvent(i)}mapPointerUpOutside(e){if(!(e instanceof _e))return;const t=this.trackingData(e.pointerId),i=this.findMountedTarget(t.pressTargetsByButton[e.button]),n=this.createPointerEvent(e);if(i){let s=i;for(;s;)n.currentTarget=s,this.notifyTarget(n,"pointerupoutside"),n.pointerType==="touch"?this.notifyTarget(n,"touchendoutside"):(n.pointerType==="mouse"||n.pointerType==="pen")&&this.notifyTarget(n,n.button===2?"rightupoutside":"mouseupoutside"),s=s.parent;delete t.pressTargetsByButton[e.button]}this.freeEvent(n)}mapWheel(e){if(!(e instanceof ht))return;const t=this.createWheelEvent(e);this.dispatchEvent(t),this.freeEvent(t)}findMountedTarget(e){if(!e)return null;let t=e[0];for(let i=1;i<e.length&&e[i].parent===t;i++)t=e[i];return t}createPointerEvent(e,t,i){var n;const s=this.allocateEvent(_e);return this.copyPointerData(e,s),this.copyMouseData(e,s),this.copyData(e,s),s.nativeEvent=e.nativeEvent,s.originalEvent=e,s.target=(n=i!=null?i:this.hitTest(s.global.x,s.global.y))!=null?n:this._hitElements[0],typeof t=="string"&&(s.type=t),s}createWheelEvent(e){const t=this.allocateEvent(ht);return this.copyWheelData(e,t),this.copyMouseData(e,t),this.copyData(e,t),t.nativeEvent=e.nativeEvent,t.originalEvent=e,t.target=this.hitTest(t.global.x,t.global.y),t}clonePointerEvent(e,t){const i=this.allocateEvent(_e);return i.nativeEvent=e.nativeEvent,i.originalEvent=e.originalEvent,this.copyPointerData(e,i),this.copyMouseData(e,i),this.copyData(e,i),i.target=e.target,i.path=e.composedPath().slice(),i.type=t!=null?t:i.type,i}copyWheelData(e,t){t.deltaMode=e.deltaMode,t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ}copyPointerData(e,t){e instanceof _e&&t instanceof _e&&(t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist)}copyMouseData(e,t){e instanceof Qt&&t instanceof Qt&&(t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.copyFrom(e.client),t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.copyFrom(e.movement),t.screen.copyFrom(e.screen),t.shiftKey=e.shiftKey,t.global.copyFrom(e.global))}copyData(e,t){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.detail=e.detail,t.view=e.view,t.which=e.which,t.layer.copyFrom(e.layer),t.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const t=this.eventPool.get(e).pop()||new e(this);return t.eventPhase=t.NONE,t.currentTarget=null,t.path=null,t.target=null,t}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const t=e.constructor;this.eventPool.has(t)||this.eventPool.set(t,[]),this.eventPool.get(t).push(e)}_notifyListeners(e,t){const i=e.currentTarget._events[t];if(i&&e.currentTarget.isInteractive())if("fn"in i)i.once&&e.currentTarget.removeListener(t,i.fn,void 0,!0),i.fn.call(i.context,e);else for(let n=0,s=i.length;n<s&&!e.propagationImmediatelyStopped;n++)i[n].once&&e.currentTarget.removeListener(t,i[n].fn,void 0,!0),i[n].fn.call(i[n].context,e)}}var Kg=Object.defineProperty,bh=Object.getOwnPropertySymbols,Zg=Object.prototype.hasOwnProperty,Qg=Object.prototype.propertyIsEnumerable,vh=(r,e,t)=>e in r?Kg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Jg=(r,e)=>{for(var t in e||(e={}))Zg.call(e,t)&&vh(r,t,e[t]);if(bh)for(var t of bh(e))Qg.call(e,t)&&vh(r,t,e[t]);return r};const eb=1,tb={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},Mn=class{constructor(r){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=r,this.rootBoundary=new gh(null),$e.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new _e(null),this._rootWheelEvent=new ht(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy(Jg({},Mn.defaultEventFeatures),{set:(e,t,i)=>(t==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=i),e[t]=i,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(r){var e,t;const{element:i,resolution:n}=this.renderer;this.setTargetElement(i),this.resolution=n,Mn._defaultEventMode=(e=r.eventMode)!=null?e:"auto",Object.assign(this.features,(t=r.eventFeatures)!=null?t:{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(r){this.resolution=r}destroy(){this.setTargetElement(null),this.renderer=null,this._currentCursor=null}setCursor(r){r=r||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this._currentCursor===r)return;this._currentCursor=r;const t=this.cursorStyles[r];if(t)switch(typeof t){case"string":e&&(this.domElement.style.cursor=t);break;case"function":t(r);break;case"object":e&&Object.assign(this.domElement.style,t);break}else e&&typeof r=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,r)&&(this.domElement.style.cursor=r)}get pointer(){return this._rootPointerEvent}_onPointerDown(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(r);this.autoPreventDefault&&e[0].isNormalized&&(r.cancelable||!("cancelable"in r))&&r.preventDefault();for(let t=0,i=e.length;t<i;t++){const n=e[t],s=this._bootstrapEvent(this._rootPointerEvent,n);this.rootBoundary.mapEvent(s)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(r){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,$e.pointerMoved();const e=this._normalizeToPointerData(r);for(let t=0,i=e.length;t<i;t++){const n=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=r.target;r.composedPath&&r.composedPath().length>0&&(e=r.composedPath()[0]);const t=e!==this.domElement?"outside":"",i=this._normalizeToPointerData(r);for(let n=0,s=i.length;n<s;n++){const o=this._bootstrapEvent(this._rootPointerEvent,i[n]);o.type+=t,this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(r);for(let t=0,i=e.length;t<i;t++){const n=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}onWheel(r){if(!this.features.wheel)return;const e=this.normalizeWheelEvent(r);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}setTargetElement(r){this._removeEvents(),this.domElement=r,$e.domElement=r,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;$e.addTickerListener();const r=this.domElement.style;r&&(globalThis.navigator.msPointerEnabled?(r.msContentZooming="none",r.msTouchAction="none"):this.supportsPointerEvents&&(r.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;$e.removeTickerListener();const r=this.domElement.style;globalThis.navigator.msPointerEnabled?(r.msContentZooming="",r.msTouchAction=""):this.supportsPointerEvents&&(r.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(r,e,t){const i=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},n=1/this.resolution;r.x=(e-i.left)*(this.domElement.width/i.width)*n,r.y=(t-i.top)*(this.domElement.height/i.height)*n}_normalizeToPointerData(r){const e=[];if(this.supportsTouchEvents&&r instanceof TouchEvent)for(let t=0,i=r.changedTouches.length;t<i;t++){const n=r.changedTouches[t];typeof n.button=="undefined"&&(n.button=0),typeof n.buttons=="undefined"&&(n.buttons=1),typeof n.isPrimary=="undefined"&&(n.isPrimary=r.touches.length===1&&r.type==="touchstart"),typeof n.width=="undefined"&&(n.width=n.radiusX||1),typeof n.height=="undefined"&&(n.height=n.radiusY||1),typeof n.tiltX=="undefined"&&(n.tiltX=0),typeof n.tiltY=="undefined"&&(n.tiltY=0),typeof n.pointerType=="undefined"&&(n.pointerType="touch"),typeof n.pointerId=="undefined"&&(n.pointerId=n.identifier||0),typeof n.pressure=="undefined"&&(n.pressure=n.force||.5),typeof n.twist=="undefined"&&(n.twist=0),typeof n.tangentialPressure=="undefined"&&(n.tangentialPressure=0),typeof n.layerX=="undefined"&&(n.layerX=n.offsetX=n.clientX),typeof n.layerY=="undefined"&&(n.layerY=n.offsetY=n.clientY),n.isNormalized=!0,n.type=r.type,e.push(n)}else if(!globalThis.MouseEvent||r instanceof MouseEvent&&(!this.supportsPointerEvents||!(r instanceof globalThis.PointerEvent))){const t=r;typeof t.isPrimary=="undefined"&&(t.isPrimary=!0),typeof t.width=="undefined"&&(t.width=1),typeof t.height=="undefined"&&(t.height=1),typeof t.tiltX=="undefined"&&(t.tiltX=0),typeof t.tiltY=="undefined"&&(t.tiltY=0),typeof t.pointerType=="undefined"&&(t.pointerType="mouse"),typeof t.pointerId=="undefined"&&(t.pointerId=eb),typeof t.pressure=="undefined"&&(t.pressure=.5),typeof t.twist=="undefined"&&(t.twist=0),typeof t.tangentialPressure=="undefined"&&(t.tangentialPressure=0),t.isNormalized=!0,e.push(t)}else e.push(r);return e}normalizeWheelEvent(r){const e=this._rootWheelEvent;return this._transferMouseData(e,r),e.deltaX=r.deltaX,e.deltaY=r.deltaY,e.deltaZ=r.deltaZ,e.deltaMode=r.deltaMode,this.mapPositionToPoint(e.screen,r.clientX,r.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=r,e.type=r.type,e}_bootstrapEvent(r,e){return r.originalEvent=null,r.nativeEvent=e,r.pointerId=e.pointerId,r.width=e.width,r.height=e.height,r.isPrimary=e.isPrimary,r.pointerType=e.pointerType,r.pressure=e.pressure,r.tangentialPressure=e.tangentialPressure,r.tiltX=e.tiltX,r.tiltY=e.tiltY,r.twist=e.twist,this._transferMouseData(r,e),this.mapPositionToPoint(r.screen,e.clientX,e.clientY),r.global.copyFrom(r.screen),r.offset.copyFrom(r.screen),r.isTrusted=e.isTrusted,r.type==="pointerleave"&&(r.type="pointerout"),r.type.startsWith("mouse")&&(r.type=r.type.replace("mouse","pointer")),r.type.startsWith("touch")&&(r.type=tb[r.type]||r.type),r}_transferMouseData(r,e){r.isTrusted=e.isTrusted,r.srcElement=e.srcElement,r.timeStamp=performance.now(),r.type=e.type,r.altKey=e.altKey,r.button=e.button,r.buttons=e.buttons,r.client.x=e.clientX,r.client.y=e.clientY,r.ctrlKey=e.ctrlKey,r.metaKey=e.metaKey,r.movement.x=e.movementX,r.movement.y=e.movementY,r.page.x=e.pageX,r.page.y=e.pageY,r.relatedTarget=null,r.shiftKey=e.shiftKey}};let er=Mn;er.extension={name:"events",type:[y.WebGLSystem,y.CanvasSystem,y.WebGPUSystem],priority:-1},er.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};const yh={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(r){this.eventMode=r?"static":"passive"},_internalEventMode:void 0,get eventMode(){var r;return(r=this._internalEventMode)!=null?r:er.defaultEventMode},set eventMode(r){this._internalEventMode=r},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(r,e,t){const i=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,n=typeof e=="function"?void 0:e;r=i?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.on(r,e,n)},removeEventListener(r,e,t){const i=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,n=typeof e=="function"?void 0:e;r=i?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.off(r,e,n)},dispatchEvent(r){if(!(r instanceof Ar))throw new Error("Container cannot propagate events outside of the Federated Events API");return r.defaultPrevented=!1,r.path=null,r.target=this,r.manager.dispatchEvent(r),!r.defaultPrevented}};J.add(er),q.mixin(yh);const tr=class{constructor(r,e){this.linkedSheets=[],this._texture=r instanceof P?r:null,this.textureSource=r.source,this.textures={},this.animations={},this.data=e;const t=parseFloat(e.meta.scale);t?(this.resolution=t,r.source.resolution=this.resolution):this.resolution=r.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(r=>{this._callback=r,this._batchIndex=0,this._frameKeys.length<=tr.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(r){let e=r;const t=tr.BATCH_SIZE;for(;e-r<t&&e<this._frameKeys.length;){const i=this._frameKeys[e],n=this._frames[i],s=n.frame;if(s){let o=null,a=null;const l=n.trimmed!==!1&&n.sourceSize?n.sourceSize:n.frame,h=new K(0,0,Math.floor(l.w)/this.resolution,Math.floor(l.h)/this.resolution);n.rotated?o=new K(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.h)/this.resolution,Math.floor(s.w)/this.resolution):o=new K(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),n.trimmed!==!1&&n.spriteSourceSize&&(a=new K(Math.floor(n.spriteSourceSize.x)/this.resolution,Math.floor(n.spriteSourceSize.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),a.x/=this.textureSource.width,a.y/=this.textureSource.height,a.width/=this.textureSource.width,a.height/=this.textureSource.height),o.x/=this.textureSource.width,o.y/=this.textureSource.height,o.width/=this.textureSource.width,o.height/=this.textureSource.height,h.x/=this.textureSource.width,h.y/=this.textureSource.height,h.width/=this.textureSource.width,h.height/=this.textureSource.height,this.textures[i]=new P({source:this.textureSource,layout:{frame:o,orig:h,trim:a,rotate:n.rotated?2:0,defaultAnchor:n.anchor},label:i.toString()})}e++}}_processAnimations(){const r=this.data.animations||{};for(const e in r){this.animations[e]=[];for(let t=0;t<r[e].length;t++){const i=r[e][t];this.animations[e].push(this.textures[i])}}}_parseComplete(){const r=this._callback;this._callback=null,this._batchIndex=0,r.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*tr.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*tr.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(r=!1){var e;for(const t in this.textures)this.textures[t].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,r&&((e=this._texture)==null||e.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};let Xr=tr;Xr.BATCH_SIZE=1e3;const rb=["jpg","png","jpeg","avif","webp"];function xh(r,e,t){const i={};if(r.forEach(n=>{i[n]=e}),Object.keys(e.textures).forEach(n=>{i[n]=e.textures[n]}),!t){const n=pe.dirname(r[0]);e.linkedSheets.forEach((s,o)=>{const a=xh([`${n}/${e.data.meta.related_multi_packs[o]}`],s,!0);Object.assign(i,a)})}return i}const _h={extension:y.Asset,cache:{test:r=>r instanceof Xr,getCacheableAssets:(r,e)=>xh(r,e,!1)},resolver:{test:r=>{const e=r.split("?")[0].split("."),t=e.pop(),i=e.pop();return t==="json"&&rb.includes(i)},parse:r=>{var e,t;const i=r.split(".");return{resolution:parseFloat((t=(e=D.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:i[i.length-2],src:r}}},loader:{name:"spritesheetLoader",extension:{type:y.LoadParser,priority:Oe.Normal},async testParse(r,e){return pe.extname(e.src).toLowerCase()===".json"&&!!r.frames},async parse(r,e,t){var i,n;let s=pe.dirname(e.src);s&&s.lastIndexOf("/")!==s.length-1&&(s+="/");let o=s+r.meta.image;o=Rr(o,e.src);const a=(await t.load([o]))[o],l=new Xr(a.source,r);await l.parse();const h=(i=r==null?void 0:r.meta)==null?void 0:i.related_multi_packs;if(Array.isArray(h)){const u=[];for(const p of h){if(typeof p!="string")continue;let d=s+p;(n=e.data)!=null&&n.ignoreMultiPack||(d=Rr(d,e.src),u.push(t.load({src:d,data:{ignoreMultiPack:!0}})))}const c=await Promise.all(u);l.linkedSheets=c,c.forEach(p=>{p.linkedSheets=[l].concat(l.linkedSheets.filter(d=>d!==p))})}return l},unload(r){r.destroy(!0)}}};J.add(_h);function rr(r,e,t,i){const n=t._source,s=t.layout,o=s.orig,a=s.trim,l=n.width,h=n.height,u=l*o.width,c=h*o.height;if(a){const p=l*a.width,d=h*a.height;r[0]=a.x*l-e._x*u-i,r[1]=r[0]+p,r[2]=a.y*h-e._y*c-i,r[3]=r[2]+d}else r[0]=-e._x*u-i,r[1]=r[0]+u,r[2]=-e._y*c-i,r[3]=r[2]+c}const _t={onViewUpdate:()=>{}};class wh{constructor(e){this.renderPipeId="sprite",this.owner=_t,this.uid=Y("spriteView"),this.batched=!0,this._didUpdate=!1,this._bounds=[0,1,0,0],this._sourceBounds=[0,1,0,0],this._boundsDirty=!0,this._sourceBoundsDirty=!0;var t,i;this.anchor=new se(this,((t=e.layout.defaultAnchor)==null?void 0:t.x)||0,((i=e.layout.defaultAnchor)==null?void 0:i.y)||0),this.texture=e}set texture(e){e||(e=P.EMPTY),this._texture!==e&&(this._texture&&this._texture.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._texture=e,this.onUpdate())}get texture(){return this._texture}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}get sourceBounds(){return this._sourceBoundsDirty&&(this._updateSourceBounds(),this._sourceBoundsDirty=!1),this._sourceBounds}containsPoint(e){const t=this._texture.frameWidth,i=this._texture.frameHeight,n=-t*this.anchor.x;let s=0;return e.x>=n&&e.x<n+t&&(s=-i*this.anchor.y,e.y>=s&&e.y<s+i)}addBounds(e){if(this._texture._layout.trim){const t=this.sourceBounds;e.addFrame(t[0],t[2],t[1],t[3])}else{const t=this.bounds;e.addFrame(t[0],t[2],t[1],t[3])}}onUpdate(){this._didUpdate=!0,this._sourceBoundsDirty=this._boundsDirty=!0,this.owner.onViewUpdate()}_updateBounds(){rr(this._bounds,this.anchor,this._texture,0)}_updateSourceBounds(){const e=this.anchor,t=this._texture,i=t._source,n=t.layout.orig,s=this._sourceBounds,o=i.width*n.width,a=i.height*n.height;s[1]=-e._x*o,s[0]=s[1]+o,s[3]=-e._y*a,s[2]=s[3]+a}destroy(e=!1){if(this.anchor=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._bounds=null,this._sourceBounds=null}}var ib=Object.defineProperty,Th=Object.getOwnPropertySymbols,nb=Object.prototype.hasOwnProperty,sb=Object.prototype.propertyIsEnumerable,Sh=(r,e,t)=>e in r?ib(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ob=(r,e)=>{for(var t in e||(e={}))nb.call(e,t)&&Sh(r,t,e[t]);if(Th)for(var t of Th(e))sb.call(e,t)&&Sh(r,t,e[t]);return r};class Fe extends q{static from(e){return typeof e=="string"?new Fe(re.get(e)):new Fe(e)}constructor(e=P.EMPTY){var t;e instanceof P&&(e={texture:e}),(t=e.texture)!=null||(e.texture=P.EMPTY),super(ob({view:new wh(e.texture),label:"Sprite"},e)),this.allowChildren=!1}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get texture(){return this.view.texture}set texture(e){this.view.texture=e}}const ab=new ce;function qr(r,e,t){const i=ab;r.measurable=!0,Xt(r,t,i),e.addBoundsMask(i),r.measurable=!1}function Kr(r,e,t){const i=new ce;r.measurable=!0;const n=Bn(r,t,new R);je(r,i,n),r.measurable=!1,e.addBoundsMask(i)}function Bn(r,e,t){return r&&r!==e&&(Bn(r.parent,e,t),r.didChange&&Ge(r.localTransform,r),t.append(r.localTransform)),t}class Rn{constructor(e){this.priority=0,this.pipe="alphaMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof Fe),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(e,t){qr(this.mask,e,t)}addLocalBounds(e,t){Kr(this.mask,e,t)}containsPoint(e,t){const i=this.mask;return t(i,e)}destroy(){this.reset()}static test(e){return e instanceof Fe}}Rn.extension=y.MaskEffect;class kn{constructor(e){this.priority=0,this.pipe="colorMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}kn.extension=y.MaskEffect;class Fn{constructor(e){this.priority=0,this.pipe="stencilMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(e,t){qr(this.mask,e,t)}addLocalBounds(e,t){Kr(this.mask,e,t)}containsPoint(e,t){const i=this.mask;return t(i,e)}destroy(){this.reset()}static test(e){return e instanceof q}}Fn.extension=y.MaskEffect,J.add(Rn,kn,Fn);var lb={__proto__:null};let On;function hb(){return typeof On=="undefined"&&(On=function(){var r;const e={stencil:!0,failIfMajorPerformanceCaveat:D.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};try{if(!D.ADAPTER.getWebGLRenderingContext())return!1;let t=D.ADAPTER.createCanvas().getContext("webgl2",e);const i=!!((r=t==null?void 0:t.getContextAttributes())!=null&&r.stencil);if(t){const n=t.getExtension("WEBGL_lose_context");n&&n.loseContext()}return t=null,i}catch(t){return!1}}()),On}async function ub(r={}){if(!D.ADAPTER.getNavigator().gpu)return!1;try{return await(await navigator.gpu.requestAdapter(r)).requestDevice(),!0}catch(e){return!1}}var cb=Object.defineProperty,Ph=Object.getOwnPropertySymbols,db=Object.prototype.hasOwnProperty,pb=Object.prototype.propertyIsEnumerable,Ah=(r,e,t)=>e in r?cb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ir=(r,e)=>{for(var t in e||(e={}))db.call(e,t)&&Ah(r,t,e[t]);if(Ph)for(var t of Ph(e))pb.call(e,t)&&Ah(r,t,e[t]);return r};const Eh=["webgpu","webgl","canvas"];async function Ch(r){var e;let t=[];r.preference?(t.push(r.preference),Eh.forEach(o=>{o!==r.preference&&t.push(o)})):t=Eh.slice();let i;((e=r.manageImports)==null||e)&&await Promise.resolve().then(function(){return lb});let n={};for(let o=0;o<t.length;o++){const a=t[o];if(a==="webgpu"&&await ub()){const{WebGPURenderer:l}=await Promise.resolve().then(function(){return q_});i=l,n=ir(ir({},r),r.webgpu);break}else if(a==="webgl"&&hb()){const{WebGLRenderer:l}=await Promise.resolve().then(function(){return $_});i=l,n=ir(ir({},r),r.webgl);break}else if(a==="canvas"){n=ir({},r);break}}delete n.webgpu,delete n.webgl;const s=new i;return await s.init(n),s}var fb=Object.defineProperty,Mh=Object.getOwnPropertySymbols,mb=Object.prototype.hasOwnProperty,gb=Object.prototype.propertyIsEnumerable,Bh=(r,e,t)=>e in r?fb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,bb=(r,e)=>{for(var t in e||(e={}))mb.call(e,t)&&Bh(r,t,e[t]);if(Mh)for(var t of Mh(e))gb.call(e,t)&&Bh(r,t,e[t]);return r};const Un=class{constructor(){this.stage=new q}async init(r){r=bb({},r),this.renderer=await Ch(r),Un._plugins.forEach(e=>{e.init.call(this,r)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.element}get screen(){return this.renderer.screen}destroy(r=!1){const e=Un._plugins.slice(0);e.reverse(),e.forEach(t=>{t.destroy.call(this)}),this.stage.destroy(r),this.stage=null,this.renderer.destroy(r),this.renderer=null}};let In=Un;In._plugins=[],J.handleByList(y.Application,In._plugins);class Rh{constructor(e,t=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=t}add(e){e.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],t=Math.min(this._assetList.length,this._maxConcurrent);for(let i=0;i<t;i++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}const nr=r=>!Array.isArray(r);var vb=Object.defineProperty,yb=Object.defineProperties,xb=Object.getOwnPropertyDescriptors,kh=Object.getOwnPropertySymbols,_b=Object.prototype.hasOwnProperty,wb=Object.prototype.propertyIsEnumerable,Fh=(r,e,t)=>e in r?vb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Tb=(r,e)=>{for(var t in e||(e={}))_b.call(e,t)&&Fh(r,t,e[t]);if(kh)for(var t of kh(e))wb.call(e,t)&&Fh(r,t,e[t]);return r},Sb=(r,e)=>yb(r,xb(e));class Oh{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,t,i)=>(this._parsersValidated=!1,e[t]=i,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,t){const i={promise:null,parser:null};return i.promise=(async()=>{var n,s;let o=null,a=null;if(t.loadParser&&(a=this._parserHash[t.loadParser]),!a){for(let l=0;l<this.parsers.length;l++){const h=this.parsers[l];if(h.load&&(n=h.test)!=null&&n.call(h,e,t,this)){a=h;break}}if(!a)return null}o=await a.load(e,t,this),i.parser=a;for(let l=0;l<this.parsers.length;l++){const h=this.parsers[l];h.parse&&h.parse&&await((s=h.testParse)==null?void 0:s.call(h,o,t,this))&&(o=await h.parse(o,t,this)||o,i.parser=h)}return o})(),i}async load(e,t){this._parsersValidated||this._validateParsers();let i=0;const n={},s=nr(e),o=ye(e,h=>({alias:[h],src:h})),a=o.length,l=o.map(async h=>{const u=pe.toAbsolute(h.src);if(!n[h.src])try{this.promiseCache[u]||(this.promiseCache[u]=this._getLoadPromiseAndParser(u,h)),n[h.src]=await this.promiseCache[u].promise,t&&t(++i/a)}catch(c){throw delete this.promiseCache[u],delete n[h.src],new Error(`[Loader.load] Failed to load ${u}.
${c}`)}});return await Promise.all(l),s?n[o[0].src]:n}async unload(e){const t=ye(e,i=>({alias:[i],src:i})).map(async i=>{var n,s;const o=pe.toAbsolute(i.src),a=this.promiseCache[o];if(a){const l=await a.promise;delete this.promiseCache[o],(s=(n=a.parser)==null?void 0:n.unload)==null||s.call(n,l,i,this)}});await Promise.all(t)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name).reduce((e,t)=>(e[t.name],Sb(Tb({},e),{[t.name]:t})),{})}}function Uh(r,e,t,i,n){const s=e[t];for(let o=0;o<s.length;o++){const a=s[o];t<e.length-1?Uh(r.replace(i[t],a),e,t+1,i,n):n.push(r.replace(i[t],a))}}function Ih(r){const e=/\{(.*?)\}/g,t=r.match(e),i=[];if(t){const n=[];t.forEach(s=>{const o=s.substring(1,s.length-1).split(",");n.push(o)}),Uh(r,n,0,t,i)}else i.push(r);return i}var Pb=Object.defineProperty,Ab=Object.defineProperties,Eb=Object.getOwnPropertyDescriptors,Gh=Object.getOwnPropertySymbols,Cb=Object.prototype.hasOwnProperty,Mb=Object.prototype.propertyIsEnumerable,$h=(r,e,t)=>e in r?Pb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wt=(r,e)=>{for(var t in e||(e={}))Cb.call(e,t)&&$h(r,t,e[t]);if(Gh)for(var t of Gh(e))Mb.call(e,t)&&$h(r,t,e[t]);return r},Lh=(r,e)=>Ab(r,Eb(e));class Dh{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,t)=>`${e}${this._bundleIdConnector}${t}`,extractAssetIdFromBundle:(e,t)=>t.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){var t,i,n;if(this._bundleIdConnector=(t=e.connector)!=null?t:this._bundleIdConnector,this._createBundleAssetId=(i=e.createBundleAssetId)!=null?i:this._createBundleAssetId,this._extractAssetIdFromBundle=(n=e.extractAssetIdFromBundle)!=null?n:this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const t=e;this._defaultSearchParams=Object.keys(t).map(i=>`${encodeURIComponent(i)}=${encodeURIComponent(t[i])}`).join("&")}}getAlias(e){const{alias:t,name:i,src:n,srcs:s}=e;return ye(t||i||n||s,o=>{var a;return typeof o=="string"?o:Array.isArray(o)?o.map(l=>{var h,u;return(u=(h=l==null?void 0:l.src)!=null?h:l==null?void 0:l.srcs)!=null?u:l}):o!=null&&o.src||o!=null&&o.srcs?(a=o.src)!=null?a:o.srcs:o},!0)}addManifest(e){this._manifest,this._manifest=e,e.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}addBundle(e,t){const i=[];Array.isArray(t)?t.forEach(n=>{var s,o;const a=(s=n.src)!=null?s:n.srcs,l=(o=n.alias)!=null?o:n.name;let h;if(typeof l=="string"){const u=this._createBundleAssetId(e,l);i.push(u),h=[l,u]}else{const u=l.map(c=>this._createBundleAssetId(e,c));i.push(...u),h=[...l,...u]}this.add(Lh(wt({},n),{alias:h,src:a}))}):Object.keys(t).forEach(n=>{var s;const o=[n,this._createBundleAssetId(e,n)];if(typeof t[n]=="string")this.add({alias:o,src:t[n]});else if(Array.isArray(t[n]))this.add({alias:o,src:t[n]});else{const a=t[n],l=(s=a.src)!=null?s:a.srcs;this.add(Lh(wt({},a),{alias:o,src:Array.isArray(l)?l:[l]}))}i.push(...o)}),this._bundles[e]=i}add(e){const t=[];Array.isArray(e)?t.push(...e):t.push(e);let i;ye(t).forEach(n=>{const{src:s,srcs:o}=n;let{data:a,format:l,loadParser:h}=n;const u=ye(s||o).map(d=>typeof d=="string"?Ih(d):Array.isArray(d)?d:[d]),c=this.getAlias(n),p=[];u.forEach(d=>{d.forEach(f=>{var g,m,x;let b={};if(typeof f!="object"){b.src=f;for(let v=0;v<this._parsers.length;v++){const _=this._parsers[v];if(_.test(f)){b=_.parse(f);break}}}else a=(g=f.data)!=null?g:a,l=(m=f.format)!=null?m:l,h=(x=f.loadParser)!=null?x:h,b=wt(wt({},b),f);if(!c)throw new Error(`[Resolver] alias is undefined for this asset: ${b.src}`);b=this._buildResolvedAsset(b,{aliases:c,data:a,format:l,loadParser:h}),p.push(b)})}),c.forEach(d=>{this._assetMap[d]=p})})}resolveBundle(e){const t=nr(e);e=ye(e);const i={};return e.forEach(n=>{const s=this._bundles[n];if(s){const o=this.resolve(s),a={};for(const l in o){const h=o[l];a[this._extractAssetIdFromBundle(n,l)]=h}i[n]=a}}),t?i[e[0]]:i}resolveUrl(e){const t=this.resolve(e);if(typeof e!="string"){const i={};for(const n in t)i[n]=t[n].src;return i}return t.src}resolve(e){const t=nr(e);e=ye(e);const i={};return e.forEach(n=>{var s;if(!this._resolverHash[n])if(this._assetMap[n]){let o=this._assetMap[n];const a=o[0],l=this._getPreferredOrder(o);l==null||l.priority.forEach(h=>{l.params[h].forEach(u=>{const c=o.filter(p=>p[h]?p[h]===u:!1);c.length&&(o=c)})}),this._resolverHash[n]=(s=o[0])!=null?s:a}else this._resolverHash[n]=this._buildResolvedAsset({alias:[n],src:n},{});i[n]=this._resolverHash[n]}),t?i[e[0]]:i}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let t=0;t<e.length;t++){const i=e[0],n=this._preferredOrder.find(s=>s.params.format.includes(i.format));if(n)return n}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const t=/\?/.test(e)?"&":"?";return`${e}${t}${this._defaultSearchParams}`}_buildResolvedAsset(e,t){var i;const{aliases:n,data:s,loadParser:o,format:a}=t;return(this._basePath||this._rootPath)&&(e.src=pe.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=(i=n!=null?n:e.alias)!=null?i:[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data=wt(wt({},s||{}),e.data),e.loadParser=o!=null?o:e.loadParser,e.format=a!=null?a:e.src.split(".").pop(),e.srcs=e.src,e.name=e.alias,e}}class zh{constructor(){this._detections=[],this._initialized=!1,this.resolver=new Dh,this.loader=new Oh,this.cache=re,this._backgroundLoader=new Rh(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){var t,i,n;if(this._initialized)return;if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let l=e.manifest;typeof l=="string"&&(l=await this.load(l)),this.resolver.addManifest(l)}const s=(i=(t=e.texturePreference)==null?void 0:t.resolution)!=null?i:1,o=typeof s=="number"?[s]:s,a=await this._detectFormats({preferredFormats:(n=e.texturePreference)==null?void 0:n.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:a,resolution:o}}),e.preferences&&this.setPreferences(e.preferences)}add(e){this.resolver.add(e)}async load(e,t){this._initialized||await this.init();const i=nr(e),n=ye(e).map(a=>{if(typeof a!="string"){const l=this.resolver.getAlias(a);return l.some(h=>!this.resolver.hasKey(h))&&this.add(a),Array.isArray(l)?l[0]:l}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),s=this.resolver.resolve(n),o=await this._mapLoadToResolve(s,t);return i?o[n[0]]:o}addBundle(e,t){this.resolver.addBundle(e,t)}async loadBundle(e,t){this._initialized||await this.init();let i=!1;typeof e=="string"&&(i=!0,e=[e]);const n=this.resolver.resolveBundle(e),s={},o=Object.keys(n);let a=0,l=0;const h=()=>{t==null||t(++a/l)},u=o.map(c=>{const p=n[c];return l+=Object.keys(p).length,this._mapLoadToResolve(p,h).then(d=>{s[c]=d})});return await Promise.all(u),i?s[e[0]]:s}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(t))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolveBundle(e);Object.values(t).forEach(i=>{this._backgroundLoader.add(Object.values(i))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return re.get(e);const t={};for(let i=0;i<e.length;i++)t[i]=re.get(e[i]);return t}async _mapLoadToResolve(e,t){const i=Object.values(e),n=Object.keys(e);this._backgroundLoader.active=!1;const s=await this.loader.load(i,t);this._backgroundLoader.active=!0;const o={};return i.forEach((a,l)=>{const h=s[a.src],u=[a.src];a.alias&&u.push(...a.alias),o[n[l]]=h,re.set(u,h)}),o}async unload(e){this._initialized||await this.init();const t=ye(e).map(n=>typeof n!="string"?n.src:n),i=this.resolver.resolve(t);await this._unloadFromResolved(i)}async unloadBundle(e){this._initialized||await this.init(),e=ye(e);const t=this.resolver.resolveBundle(e),i=Object.keys(t).map(n=>this._unloadFromResolved(t[n]));await Promise.all(i)}async _unloadFromResolved(e){const t=Object.values(e);t.forEach(i=>{re.remove(i.src)}),await this.loader.unload(t)}async _detectFormats(e){let t=[];e.preferredFormats&&(t=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(const i of e.detections)e.skipDetections||await i.test()?t=await i.add(t):e.skipDetections||(t=await i.remove(t));return t=t.filter((i,n)=>t.indexOf(i)===n),t}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(t=>{t.config&&Object.keys(t.config).filter(i=>i in e).forEach(i=>{t.config[i]=e[i]})})}}const sr=new zh;J.handleByList(y.LoadParser,sr.loader.parsers).handleByList(y.ResolveParser,sr.resolver.parsers).handleByList(y.CacheParser,sr.cache.parsers).handleByList(y.DetectionParser,sr.detections);class Ae{constructor(e){this.resources=Object.create(null),this._dirty=!0;let t=0;for(const i in e){const n=e[i];this.setResource(n,t++)}this.updateKey()}update(){this.updateKey()}updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let t=0;for(const i in this.resources)e[t++]=this.resources[i].resourceId;this.key=e.join("|")}setResource(e,t){var i,n;const s=this.resources[t];e!==s&&(s&&((i=e.off)==null||i.call(e,"change",this.onResourceChange,this)),(n=e.on)==null||n.call(e,"change",this.onResourceChange,this),this.resources[t]=e,this._dirty=!0)}getResource(e){return this.resources[e]}touch(e){const t=this.resources;for(const i in t)t[i].touched=e}destroy(){var e;const t=this.resources;for(const i in t){const n=t[i];(e=n.off)==null||e.call(n,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(){this._dirty=!0,this.update()}}var Re=(r=>(r[r.WEBGL=1]="WEBGL",r[r.WEBGPU=2]="WEBGPU",r))(Re||{});function Nh(r,e){switch(r){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}var Bb=Object.defineProperty,Hh=Object.getOwnPropertySymbols,Rb=Object.prototype.hasOwnProperty,kb=Object.prototype.propertyIsEnumerable,jh=(r,e,t)=>e in r?Bb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Wh=(r,e)=>{for(var t in e||(e={}))Rb.call(e,t)&&jh(r,t,e[t]);if(Hh)for(var t of Hh(e))kb.call(e,t)&&jh(r,t,e[t]);return r};const Vh=class{constructor(r,e){this.touched=0,this.uid=Y("uniform"),this.resourceType="uniformGroup",this.resourceId=this.uid,this.isUniformGroup=!0,this.dirtyId=0;var t,i;e=Wh(Wh({},Vh.DEFAULT),e),this.uniformStructures=r;const n={};for(const s in r){const o=r[s];o.name=s,o.size=(t=o.size)!=null?t:1,(i=o.value)!=null||(o.value=Nh(o.type,o.size)),n[s]=o.value}this.uniforms=n,this.dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this.signature=Object.keys(n).map(s=>`${s}-${r[s].type}`).join("-")}update(){this.dirtyId++}};let te=Vh;te.DEFAULT={ubo:!1,isStatic:!1};class Ee extends ue{constructor({gpuProgram:e,glProgram:t,groups:i,resources:n,groupMap:s,compatibleRenderers:o}){super(),this.uniformBindMap=Object.create(null),this.gpuProgram=e,this.glProgram=t,o===void 0&&(o=0,e&&(o|=Re.WEBGPU),t&&(o|=Re.WEBGL)),this.compatibleRenderers=o;const a={};if(n&&i)throw new Error("[Shader] Cannot have both resources and groups");if(!n&&!i)throw new Error("[Shader] Must provide either resources or groups descriptor");if(!e&&i&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&i&&s)for(const l in s)for(const h in s[l]){const u=s[l][h];a[u]={group:l,binding:h,name:u}}else if(e&&i&&!s){const l=e.structsAndGroups.groups;s={},l.forEach(h=>{s[h.group]=s[h.group]||{},s[h.group][h.binding]=h.name,a[h.name]=h})}else if(n){if(e){const l=e.structsAndGroups.groups;s={},l.forEach(h=>{s[h.group]=s[h.group]||{},s[h.group][h.binding]=h.name,a[h.name]=h})}else{s={},i={99:new Ae};let l=0;for(const h in n)a[h]={group:99,binding:l,name:h},s[99]=s[99]||{},s[99][l]=h,l++}i={};for(const l in n){const h=l;let u=n[l];!u.source&&!u.resourceType&&(u=new te(u));const c=a[h];c&&(i[c.group]=i[c.group]||new Ae,i[c.group].setResource(u,c.binding))}}this.groups=i,this.uniformBindMap=s,this.resources=this._buildResourceAccessor(i,a)}addResource(e,t,i){var n,s;(n=this.uniformBindMap)[t]||(n[t]={}),(s=this.uniformBindMap[t])[i]||(s[i]=e)}_buildResourceAccessor(e,t){const i={};for(const n in t){const s=t[n];Object.defineProperty(i,s.name,{get(){return e[s.group].getResource(s.binding)},set(o){e[s.group].setResource(o,s.binding)}})}return i}destroy(e=!1){var t,i;this.emit("destroy",this),e&&((t=this.gpuProgram)==null||t.destroy(),(i=this.glProgram)==null||i.destroy()),this.gpuProgram=null,this.glProgram=null,this.groups=null,this.removeAllListeners(),this.uniformBindMap=null,this.resources=null}}const Fb={normal:0,additive:1,multiply:2,screen:3,overlay:4,erase:5},Gn=0,$n=1,Ln=2,Dn=3,zn=4,Nn=5;class Se{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<Gn)}set blend(e){!!(this.data&1<<Gn)!==e&&(this.data^=1<<Gn)}get offsets(){return!!(this.data&1<<$n)}set offsets(e){!!(this.data&1<<$n)!==e&&(this.data^=1<<$n)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<Ln)}set culling(e){!!(this.data&1<<Ln)!==e&&(this.data^=1<<Ln)}get depthTest(){return!!(this.data&1<<Dn)}set depthTest(e){!!(this.data&1<<Dn)!==e&&(this.data^=1<<Dn)}get depthMask(){return!!(this.data&1<<Nn)}set depthMask(e){!!(this.data&1<<Nn)!==e&&(this.data^=1<<Nn)}get clockwiseFrontFace(){return!!(this.data&1<<zn)}set clockwiseFrontFace(e){!!(this.data&1<<zn)!==e&&(this.data^=1<<zn)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=Fb[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}static for2d(){const e=new Se;return e.depthTest=!1,e.blend=!0,e}}var Ob=Object.defineProperty,Yh=Object.getOwnPropertySymbols,Ub=Object.prototype.hasOwnProperty,Ib=Object.prototype.propertyIsEnumerable,Xh=(r,e,t)=>e in r?Ob(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,qh=(r,e)=>{for(var t in e||(e={}))Ub.call(e,t)&&Xh(r,t,e[t]);if(Yh)for(var t of Yh(e))Ib.call(e,t)&&Xh(r,t,e[t]);return r};const Kh=class extends Ee{constructor(r){var e;r=qh(qh({},Kh.defaultOptions),r),super(r),this.enabled=!0,this._state=Se.for2d(),this.padding=r.padding,typeof r.antialias=="boolean"?this.antialias=r.antialias?"on":"off":this.antialias=(e=r.antialias)!=null?e:"inherit",this.resolution=r.resolution,this.blendRequired=r.blendRequired,this.addResource("filterUniforms",0,0),this.addResource("uSampler",0,1)}apply(r,e,t,i){r.applyFilter(this,e,t,i)}get blendMode(){return this._state.blendMode}set blendMode(r){this._state.blendMode=r}};let Ce=Kh;Ce.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"inherit",blendRequired:!1};function Zr(r){var e,t,i;const n=new RegExp("(?<!\\/\\/.*)@(group|binding)\\(\\d+\\)[^;]+;","g"),s=/@group\((\d+)\)/,o=/@binding\((\d+)\)/,a=/var(<[^>]+>)? (\w+)/,l=/:\s*(\w+)/,h=/struct\s+(\w+)\s*{([^}]+)}/g,u=/(\w+)\s*:\s*([\w\<\>]+)/g,c=/struct\s+(\w+)/,p=(e=r.match(n))==null?void 0:e.map(f=>({group:parseInt(f.match(s)[1],10),binding:parseInt(f.match(o)[1],10),name:f.match(a)[2],isUniform:f.match(a)[1]==="<uniform>",type:f.match(l)[1]}));if(!p)return{groups:[],structs:[]};const d=(i=(t=r.match(h))==null?void 0:t.map(f=>{const g=f.match(c)[1],m=f.match(u).reduce((x,b)=>{const[v,_]=b.split(":");return x[v.trim()]=_.trim(),x},{});return m?{name:g,members:m}:null}).filter(({name:f})=>p.some(g=>g.type===f)))!=null?i:[];return{groups:p,structs:d}}var Tt=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(Tt||{});function Zh({groups:r}){const e=[];for(let t=0;t<r.length;t++){const i=r[t];e[i.group]||(e[i.group]=[]),i.isUniform?e[i.group].push({binding:i.binding,visibility:Tt.VERTEX|Tt.FRAGMENT,buffer:{type:"uniform"}}):i.type==="sampler"?e[i.group].push({binding:i.binding,visibility:Tt.FRAGMENT,sampler:{type:"filtering"}}):i.type==="texture_2d"&&e[i.group].push({binding:i.binding,visibility:Tt.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function Qh({groups:r}){const e=[];for(let t=0;t<r.length;t++){const i=r[t];e[i.group]||(e[i.group]={}),e[i.group][i.name]=i.binding}return e}function Jh(r,e){const t=new Set,i=new Set,n=[...r.structs,...e.structs].filter(o=>t.has(o.name)?!1:(t.add(o.name),!0)),s=[...r.groups,...e.groups].filter(o=>{const a=`${o.name}-${o.binding}`;return i.has(a)?!1:(i.add(a),!0)});return{structs:n,groups:s}}const or=class{constructor({fragment:r,vertex:e,layout:t,gpuLayout:i,name:n}){if(this._layoutKey=0,this.name=n,this.fragment=r,this.vertex=e,r.source===e.source){const s=Zr(r.source);this.structsAndGroups=s}else{const s=Zr(e.source),o=Zr(r.source);this.structsAndGroups=Jh(s,o)}this.layout=t!=null?t:Qh(this.structsAndGroups),this.gpuLayout=i!=null?i:Zh(this.structsAndGroups)}destroy(){this._gpuLayout=null,this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(r){const e=`${r.vertex.source}:${r.fragment.source}:${r.fragment.entryPoint}:${r.vertex.entryPoint}`;return or.programCached[e]||(or.programCached[e]=new or(r)),or.programCached[e]}};let Me=or;Me.programCached=Object.create(null);var Hn=`struct GlobalUniforms {
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
}`,Gb=Object.defineProperty,eu=Object.getOwnPropertySymbols,$b=Object.prototype.hasOwnProperty,Lb=Object.prototype.propertyIsEnumerable,tu=(r,e,t)=>e in r?Gb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ru=(r,e)=>{for(var t in e||(e={}))$b.call(e,t)&&tu(r,t,e[t]);if(eu)for(var t of eu(e))Lb.call(e,t)&&tu(r,t,e[t]);return r};const iu=class extends Ce{constructor(r){r=ru(ru({},iu.DEFAULT_OPTIONS),r);const e=new Me({vertex:{source:Hn,entryPoint:"mainVertex"},fragment:{source:Hn,entryPoint:"mainFragment"}}),t=new te({uAlpha:{value:r.alpha,type:"f32"}});super({gpuProgram:e,resources:{filterUniforms:t}})}get alpha(){return this.resources.filterUniforms.uniforms.uAlpha}set alpha(r){this.resources.filterUniforms.uniforms.uAlpha=r}};let nu=iu;nu.DEFAULT_OPTIONS={alpha:1};function ut(r){return r+=r===0?1:0,--r,r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r+1}function Db(r){return!(r&r-1)&&!!r}function zb(r){let e=(r>65535?1:0)<<4;r>>>=e;let t=(r>255?1:0)<<3;return r>>>=t,e|=t,t=(r>15?1:0)<<2,r>>>=t,e|=t,t=(r>3?1:0)<<1,r>>>=t,e|=t,e|r>>1}var Nb=Object.defineProperty,Hb=Object.defineProperties,jb=Object.getOwnPropertyDescriptors,su=Object.getOwnPropertySymbols,Wb=Object.prototype.hasOwnProperty,Vb=Object.prototype.propertyIsEnumerable,ou=(r,e,t)=>e in r?Nb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Yb=(r,e)=>{for(var t in e||(e={}))Wb.call(e,t)&&ou(r,t,e[t]);if(su)for(var t of su(e))Vb.call(e,t)&&ou(r,t,e[t]);return r},Xb=(r,e)=>Hb(r,jb(e));let qb=0;class au{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,i){const n=new he(Xb(Yb({},this.textureOptions),{width:e,height:t,resolution:1,antialias:i}));return new P({source:n,label:`texturePool_${qb++}`})}getOptimalTexture(e,t,i=1,n){let s=Math.ceil(e*i-1e-6),o=Math.ceil(t*i-1e-6);s=ut(s),o=ut(o);const a=(s<<17)+(o<<1)+(n?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let l=this._texturePool[a].pop();return l||(l=this.createTexture(s,o,n)),l.source._resolution=i,l.source.width=s/i,l.source.height=o/i,l.source.pixelWidth=s,l.source.pixelHeight=o,l.frameX=0,l.frameY=0,l.frameWidth=e,l.frameHeight=t,l.layout.update(),this._poolKeyHash[l.id]=a,l}getSameSizeTexture(e,t=!1){const i=e.source;return this.getOptimalTexture(e.width,e.height,i._resolution,t)}returnTexture(e){const t=this._poolKeyHash[e.id];this._texturePool[t].push(e)}clear(e){if(e=e!==!1,e)for(const t in this._texturePool){const i=this._texturePool[t];if(i)for(let n=0;n<i.length;n++)i[n].destroy(!0)}this._texturePool={}}}const le=new au;function lu(r,e,t){const i=t?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(r.substring(0,9)!=="precision"){let n=t?e.requestedFragmentPrecision:e.requestedVertexPrecision;if(n==="highp"&&i!=="highp"&&(n="mediump"),r.substring(0,8)!=="#version")return`precision ${n} float;
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}precision ${n} float;
${r.substring(s+1)}`}else if(i!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}const hu={};let ar=hu;function uu(){return(ar===hu||ar!=null&&ar.isContextLost())&&(ar=D.ADAPTER.createCanvas().getContext("webgl2",{})),ar}let Qr;function cu(){if(!Qr){Qr="mediump";const r=uu();r&&r.getShaderPrecisionFormat&&(Qr=r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision?"highp":"mediump")}return Qr}const Kb={},Zb={};function du(r,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const i=t?Kb:Zb;if(i[e]?(i[e]++,e+=`-${i[e]}`):i[e]=1,r.indexOf("#define SHADER_NAME")!==-1)return r;const n=`#define SHADER_NAME ${e}`;if(r.substring(0,8)!=="#version")return`${n}
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}${n}
${r.substring(s+1)}`}function pu(r,{version:e="300 es"}){return r.substring(0,8)==="#version"?r:`#version ${e}
${r}`}var Qb=Object.defineProperty,fu=Object.getOwnPropertySymbols,Jb=Object.prototype.hasOwnProperty,ev=Object.prototype.propertyIsEnumerable,mu=(r,e,t)=>e in r?Qb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,gu=(r,e)=>{for(var t in e||(e={}))Jb.call(e,t)&&mu(r,t,e[t]);if(fu)for(var t of fu(e))ev.call(e,t)&&mu(r,t,e[t]);return r};const jn={ensurePrecision:lu,setProgramName:du,setProgramVersion:pu},St=class{constructor(r){r=gu(gu({},St.defaultOptions),r);const e={ensurePrecision:{requestedFragmentPrecision:r.preferredFragmentPrecision,requestedVertexPrecision:r.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:cu()},setProgramName:{name:r.name},setProgramVersion:{version:"300 es"}};let t=r.fragment,i=r.vertex;Object.keys(jn).forEach(n=>{var s;const o=(s=e[n])!=null?s:{};t=jn[n](t,o,!0),i=jn[n](i,o,!1)}),this.fragment=t,this.vertex=i,this.key=`${this.vertex}:${this.fragment}`}destroy(){this.fragment=null,this.vertex=null,this.attributeData=null,this.uniformData=null,this.uniformBlockData=null,this.transformFeedbackVaryings=null}static from(r){const e=`${r.vertex}:${r.fragment}`;return St.programCached[e]||(St.programCached[e]=new St(r)),St.programCached[e]}};let we=St;we.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"},we.programCached=Object.create(null);const Wn={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},tv=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","out vec4 fragColor;","void main(void)","{","    fragColor = vec4(0.0);","    %blur%","}"].join(`
`);function bu(r){const e=Wn[r],t=e.length;let i=tv,n="";const s="fragColor += texture(uSampler, vBlurTexCoords[%index%]) * %value%;";let o;for(let a=0;a<r;a++){let l=s.replace("%index%",a.toString());o=a,a>=t&&(o=r-a-1),l=l.replace("%value%",e[o].toString()),n+=l,n+=`
`}return i=i.replace("%blur%",n),i=i.replace("%size%",r.toString()),i}const rv=`
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
    }`;function vu(r,e){const t=Math.ceil(r/2);let i=rv,n="",s;e?s="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":s="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let o=0;o<r;o++){let a=s.replace("%index%",o.toString());a=a.replace("%sampleIndex%",`${o-(t-1)}.0`),n+=a,n+=`
`}return i=i.replace("%blur%",n),i=i.replace("%size%",r.toString()),i=i.replace("%dimension%",e?"z":"w"),i}function yu(r,e){const t=vu(e,r),i=bu(e);return we.from({vertex:t,fragment:i,name:`blur-${r?"horizontal":"vertical"}-pass-filter`})}var xu=`

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
}`;function _u(r,e){const t=Wn[e],i=t.length,n=[],s=[],o=[];for(let c=0;c<e;c++){n[c]=`@location(${c}) offset${c}: vec2<f32>,`,r?s[c]=`filteredCord + vec2(${c-i+1} * strength, 0.0),`:s[c]=`filteredCord + vec2(0.0, ${c-i+1} * strength),`;const p=c<i?c:e-c-1,d=t[p].toString();o[c]=`fragColor += textureSample(uSampler, mySampler, offset${c}) * ${d};`}const a=n.join(`
`),l=s.join(`
`),h=o.join(`
`),u=xu.replace("%blur-struct%",a).replace("%blur-vertex-out%",l).replace("%blur-fragment-in%",a).replace("%blur-sampling%",h);return Me.from({vertex:{source:u,entryPoint:"mainVertex"},fragment:{source:u,entryPoint:"mainFragment"}})}var iv=Object.defineProperty,wu=Object.getOwnPropertySymbols,nv=Object.prototype.hasOwnProperty,sv=Object.prototype.propertyIsEnumerable,Tu=(r,e,t)=>e in r?iv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Vn=(r,e)=>{for(var t in e||(e={}))nv.call(e,t)&&Tu(r,t,e[t]);if(wu)for(var t of wu(e))sv.call(e,t)&&Tu(r,t,e[t]);return r};const Su=class extends Ce{constructor(r){r=Vn(Vn({},Su.defaultOptions),r);const e=yu(r.horizontal,r.kernelSize),t=_u(r.horizontal,r.kernelSize);super(Vn({glProgram:e,gpuProgram:t,resources:{blurUniforms:{strength:{value:0,type:"f32"}}}},r)),this.horizontal=r.horizontal,this._quality=0,this.quality=r.quality,this.blur=r.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(r,e,t,i){if(this._uniforms.strength=this.strength/this.passes,this.passes===1)r.applyFilter(this,e,t,i);else{const n=le.getSameSizeTexture(e);let s=e,o=n;this._state.blend=!1;for(let a=0;a<this.passes-1;a++){r.applyFilter(this,s,o,r.renderer.type===Re.WEBGPU);const l=o;o=s,s=l}this._state.blend=!0,r.applyFilter(this,s,t,i),le.returnTexture(n)}}get blur(){return this.strength}set blur(r){this.padding=1+Math.abs(r)*2,this.strength=r}get quality(){return this._quality}set quality(r){this._quality=r,this.passes=r}};let lr=Su;lr.defaultOptions={strength:8,quality:4,kernelSize:5};var ov=Object.defineProperty,av=Object.defineProperties,lv=Object.getOwnPropertyDescriptors,Pu=Object.getOwnPropertySymbols,hv=Object.prototype.hasOwnProperty,uv=Object.prototype.propertyIsEnumerable,Au=(r,e,t)=>e in r?ov(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,hr=(r,e)=>{for(var t in e||(e={}))hv.call(e,t)&&Au(r,t,e[t]);if(Pu)for(var t of Pu(e))uv.call(e,t)&&Au(r,t,e[t]);return r},cv=(r,e)=>av(r,lv(e));class Eu extends Ce{constructor(...e){var t;let i=(t=e[0])!=null?t:{};typeof i=="number"&&(O(z,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),i={strength:i},e[1]&&(i.quality=e[1]),e[2]&&(i.resolution=e[2]),e[3]&&(i.kernelSize=e[3])),i=hr(hr({},lr.defaultOptions),i),super(cv(hr({},i),{compatibleRenderers:Re.WEBGL|Re.WEBGPU,resources:{}})),this._repeatEdgePixels=!1,this.blurXFilter=new lr(hr({horizontal:!1},i)),this.blurYFilter=new lr(hr({horizontal:!0},i)),this.quality=i.quality,this.blur=i.strength,this.repeatEdgePixels=!1}apply(e,t,i,n){const s=Math.abs(this.blurXFilter.strength),o=Math.abs(this.blurYFilter.strength);if(s&&o){const a=le.getSameSizeTexture(t);this.blurXFilter.apply(e,t,a,!0),this.blurYFilter.apply(e,a,i,n),le.returnTexture(a)}else o?this.blurYFilter.apply(e,t,i,n):this.blurXFilter.apply(e,t,i,n)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get blur(){return this.blurXFilter.blur}set blur(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get blurX(){return this.blurXFilter.blur}set blurX(e){this.blurXFilter.blur=e,this.updatePadding()}get blurY(){return this.blurYFilter.blur}set blurY(e){this.blurYFilter.blur=e,this.updatePadding()}get blendMode(){return this.blurYFilter.blendMode}set blendMode(e){this.blurYFilter.blendMode=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}}Eu.defaultOptions={strength:8,quality:4,kernelSize:5};var Yn=`in vec2 aPosition;
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
`,Cu=`
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

    if (color.a > 0.0) {
        color.rgb /= color.a;
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
`,Xn=`struct GlobalUniforms {
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
    if (c.a > 0.0) {
      c.r /= c.a;
      c.g /= c.a;
      c.b /= c.a;
    }

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

    rgb.r *= result.a;
    rgb.g *= result.a;
    rgb.b *= result.a;

    return vec4(rgb, result.a);
}`;class dv extends Ce{constructor(){const e=new te({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"vec4<f32>",size:5},uAlpha:{value:1,type:"f32"}}),t=Me.from({vertex:{source:Xn,entryPoint:"mainVertex"},fragment:{source:Xn,entryPoint:"mainFragment"}}),i=we.from({vertex:Yn,fragment:Cu,name:"color-matrix-filter"});super({gpuProgram:t,glProgram:i,resources:{colorMatrixUniforms:e}}),this.alpha=1}_loadMatrix(e,t=!1){let i=e;t&&(this._multiply(i,this.matrix,e),i=this._colorMatrix(i)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=i,this.resources.colorMatrixUniforms.update()}_multiply(e,t,i){return e[0]=t[0]*i[0]+t[1]*i[5]+t[2]*i[10]+t[3]*i[15],e[1]=t[0]*i[1]+t[1]*i[6]+t[2]*i[11]+t[3]*i[16],e[2]=t[0]*i[2]+t[1]*i[7]+t[2]*i[12]+t[3]*i[17],e[3]=t[0]*i[3]+t[1]*i[8]+t[2]*i[13]+t[3]*i[18],e[4]=t[0]*i[4]+t[1]*i[9]+t[2]*i[14]+t[3]*i[19]+t[4],e[5]=t[5]*i[0]+t[6]*i[5]+t[7]*i[10]+t[8]*i[15],e[6]=t[5]*i[1]+t[6]*i[6]+t[7]*i[11]+t[8]*i[16],e[7]=t[5]*i[2]+t[6]*i[7]+t[7]*i[12]+t[8]*i[17],e[8]=t[5]*i[3]+t[6]*i[8]+t[7]*i[13]+t[8]*i[18],e[9]=t[5]*i[4]+t[6]*i[9]+t[7]*i[14]+t[8]*i[19]+t[9],e[10]=t[10]*i[0]+t[11]*i[5]+t[12]*i[10]+t[13]*i[15],e[11]=t[10]*i[1]+t[11]*i[6]+t[12]*i[11]+t[13]*i[16],e[12]=t[10]*i[2]+t[11]*i[7]+t[12]*i[12]+t[13]*i[17],e[13]=t[10]*i[3]+t[11]*i[8]+t[12]*i[13]+t[13]*i[18],e[14]=t[10]*i[4]+t[11]*i[9]+t[12]*i[14]+t[13]*i[19]+t[14],e[15]=t[15]*i[0]+t[16]*i[5]+t[17]*i[10]+t[18]*i[15],e[16]=t[15]*i[1]+t[16]*i[6]+t[17]*i[11]+t[18]*i[16],e[17]=t[15]*i[2]+t[16]*i[7]+t[17]*i[12]+t[18]*i[17],e[18]=t[15]*i[3]+t[16]*i[8]+t[17]*i[13]+t[18]*i[18],e[19]=t[15]*i[4]+t[16]*i[9]+t[17]*i[14]+t[18]*i[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const i=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(i,t)}tint(e,t){const[i,n,s]=j.shared.setValue(e).toArray(),o=[i,0,0,0,0,0,n,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(o,t)}greyscale(e,t){const i=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(i,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const i=Math.cos(e),n=Math.sin(e),s=Math.sqrt,o=1/3,a=s(o),l=i+(1-i)*o,h=o*(1-i)-a*n,u=o*(1-i)+a*n,c=o*(1-i)+a*n,p=i+o*(1-i),d=o*(1-i)-a*n,f=o*(1-i)-a*n,g=o*(1-i)+a*n,m=i+o*(1-i),x=[l,h,u,0,0,c,p,d,0,0,f,g,m,0,0,0,0,0,1,0];this._loadMatrix(x,t)}contrast(e,t){const i=(e||0)+1,n=-.5*(i-1),s=[i,0,0,0,n,0,i,0,0,n,0,0,i,0,n,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const i=e*2/3+1,n=(i-1)*-.5,s=[i,n,n,0,0,n,i,n,0,0,n,n,i,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,i,n,s){e=e||.2,t=t||.15,i=i||16770432,n=n||3375104;const o=j.shared,[a,l,h]=o.setValue(i).toArray(),[u,c,p]=o.setValue(n).toArray(),d=[.3,.59,.11,0,0,a,l,h,e,0,u,c,p,t,0,a-u,l-c,h-p,0,0];this._loadMatrix(d,s)}night(e,t){e=e||.1;const i=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(i,t)}predator(e,t){const i=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(i,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}var Mu=`
in vec2 vTextureCoord;
in vec2 vFilterUv;

out vec4 fragColor;

uniform sampler2D uSampler;
uniform sampler2D mapTexture;

uniform vec4 filterArea;
uniform vec4 filterClamp;
uniform vec4 inputClamp;
uniform highp vec4 inputSize;
uniform mat2 rotation;
uniform vec2 scale;


void main()
{
vec4 map = texture(mapTexture, vFilterUv);
    
    vec2 offset = inputSize.zw * (rotation * (map.xy - 0.5)) * scale; 

    fragColor = texture(uSampler, clamp(vTextureCoord + offset, inputClamp.xy, inputClamp.zw));
}
`,Bu=`in vec2 aPosition;
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
`,qn=`struct GlobalUniforms {
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
}`;class pv extends Ce{constructor(...e){var t;let i=e[0];i instanceof Fe&&(e[1]&&O(z,"DisplacementFilter now uses options object instead of params. {sprite, scale}"),i={sprite:i,scale:e[1]});let n=(t=i.scale)!=null?t:20;typeof n=="number"&&(n=new W(n,n));const s=new te({filterMatrix:{value:new R,type:"mat3x3<f32>"},scale:{value:n,type:"vec2<f32>"},rotation:{value:new Float32Array([0,0,0,0]),type:"vec4<f32>"}}),o=we.from({vertex:Bu,fragment:Mu,name:"displacement-filter"}),a=Me.from({vertex:{source:qn,entryPoint:"mainVertex"},fragment:{source:qn,entryPoint:"mainFragment"}}),l=i.sprite.texture.source;super({gpuProgram:a,glProgram:o,resources:{filterUniforms:s,mapTexture:l,mapSampler:l.style}}),this._sprite=i.sprite,this._sprite.renderable=!1}apply(e,t,i,n){const s=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(s.filterMatrix,this._sprite);const o=this._sprite.worldTransform,a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.sqrt(o.c*o.c+o.d*o.d);a!==0&&l!==0&&(s.rotation[0]=o.a/a,s.rotation[1]=o.b/a,s.rotation[2]=o.c/l,s.rotation[3]=o.d/l),this.resources.mapTexture=this._sprite.texture.source,e.applyFilter(this,t,i,n)}get scale(){return this.resources.filterUniforms.uniforms.scale}}var Ru=`
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
`,Kn=`

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
}`,fv=Object.defineProperty,ku=Object.getOwnPropertySymbols,mv=Object.prototype.hasOwnProperty,gv=Object.prototype.propertyIsEnumerable,Fu=(r,e,t)=>e in r?fv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ou=(r,e)=>{for(var t in e||(e={}))mv.call(e,t)&&Fu(r,t,e[t]);if(ku)for(var t of ku(e))gv.call(e,t)&&Fu(r,t,e[t]);return r};const Uu=class extends Ce{constructor(r={}){var e,t,i;r=Ou(Ou({},Uu.DEFAULT),r);const n=new Me({vertex:{source:Kn,entryPoint:"mainVertex"},fragment:{source:Kn,entryPoint:"mainFragment"}}),s=new we({vertex:Yn,fragment:Ru,name:"noise-filter"});super({gpuProgram:n,glProgram:s,resources:{noiseUniforms:new te({uNoise:{value:r.noise,type:"f32"},uSeed:{value:(e=r.seed)!=null?e:Math.random(),type:"f32"}})},resolution:1});const o=(t=r.noise)!=null?t:.5,a=(i=r.seed)!=null?i:Math.random();this.noise=o,this.seed=a}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(r){this.resources.noiseUniforms.uniforms.uNoise=r}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(r){this.resources.noiseUniforms.uniforms.uSeed=r}};let Iu=Uu;Iu.DEFAULT={noise:.5,seed:void 0};var Gu=`
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
`,$u=`in vec2 aPosition;
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
`,Zn=`struct GlobalUniforms {
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
`,bv=Object.defineProperty,Lu=Object.getOwnPropertySymbols,vv=Object.prototype.hasOwnProperty,yv=Object.prototype.propertyIsEnumerable,Du=(r,e,t)=>e in r?bv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,zu=(r,e)=>{for(var t in e||(e={}))vv.call(e,t)&&Du(r,t,e[t]);if(Lu)for(var t of Lu(e))yv.call(e,t)&&Du(r,t,e[t]);return r};const Nu=class extends Ce{constructor(r={}){r=zu(zu({},Nu.DEFAULT),r);const e=new Me({vertex:{source:Zn,entryPoint:"mainVertex"},fragment:{source:Zn,entryPoint:"mainFragment"}}),t=new we({vertex:$u,fragment:Gu,name:"shockwave-filter"});super({gpuProgram:e,glProgram:t,resources:{shockwaveUniforms:new te({uTime:{value:0,type:"f32"},uCenter:{value:r.center,type:"vec2<f32>"},uSpeed:{value:r.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}})},resolution:1}),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,r)}apply(r,e,t,i){this.uniforms.uTime=this.time,r.applyFilter(this,e,t,i)}get center(){return this.uniforms.uCenter}set center(r){this.uniforms.uCenter=r}get centerX(){return this.uniforms.uCenter.x}set centerX(r){this.uniforms.uCenter.x=r}get centerY(){return this.uniforms.uCenter.y}set centerY(r){this.uniforms.uCenter.y=r}get speed(){return this.uniforms.uSpeed}set speed(r){this.uniforms.uSpeed=r}get amplitude(){return this.uniforms.uWave[0]}set amplitude(r){this.uniforms.uWave[0]=r}get wavelength(){return this.uniforms.uWave[1]}set wavelength(r){this.uniforms.uWave[1]=r}get brightness(){return this.uniforms.uWave[2]}set brightness(r){this.uniforms.uWave[2]=r}get radius(){return this.uniforms.uWave[3]}set radius(r){this.uniforms.uWave[3]=r}};let Hu=Nu;Hu.DEFAULT={center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1};class ma{constructor(e=0,t=0,i=0,n=0,s=0,o=0){this.type="triangle",this.x=e,this.y=t,this.x2=i,this.y2=n,this.x3=s,this.y3=o}contains(e,t){const i=(this.x-this.x3)*(t-this.y3)-(this.y-this.y3)*(e-this.x3),n=(this.x2-this.x)*(t-this.y)-(this.y2-this.y)*(e-this.x);if(i<0!=n<0&&i!==0&&n!==0)return!1;const s=(this.x3-this.x2)*(t-this.y2)-(this.y3-this.y2)*(e-this.x2);return s===0||s<0==i+n<=0}clone(){return new ma(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e=e||new K;const t=Math.min(this.x,this.x2,this.x3),i=Math.max(this.x,this.x2,this.x3),n=Math.min(this.y,this.y2,this.y3),s=Math.max(this.y,this.y2,this.y3);return e.x=t,e.y=n,e.width=i-t,e.height=s-n,e}}class fe extends ue{constructor({data:e,size:t,usage:i,label:n}){super(),this.resourceType="buffer",this.resourceId=Y("bufferResource"),this.touched=0,this.uid=Y("buffer"),this._updateID=1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,t=t!=null?t:e==null?void 0:e.byteLength;const s=!!e;this.descriptor={size:t,usage:i,mappedAtCreation:s,label:n}}get data(){return this._data}set data(e){if(this._data!==e){const t=this._data;this._data=e,t.length!==e.length?(this.descriptor.size=e.byteLength,this.resourceId=Y("bufferResource"),this.emit("change",this)):this.emit("update",this)}}update(e){this._updateSize=e||this.descriptor.size,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}var $=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))($||{});function Qn(r,e){if(!(r instanceof fe)){let t=e?$.INDEX:$.VERTEX;r instanceof Array&&(e?(r=new Uint32Array(r),t=$.INDEX|$.COPY_DST):(r=new Float32Array(r),t=$.VERTEX|$.COPY_DST)),r=new fe({data:r,label:"index-mesh-buffer",usage:t})}return r}class ur extends ue{constructor({attributes:e,indexBuffer:t,topology:i}){super(),this.uid=Y("geometry"),this._layoutKey=0,this.attributes=e,this.buffers=[];for(const n in e){const s=e[n];s.buffer=Qn(s.buffer,!1),this.buffers.indexOf(s.buffer)===-1&&(this.buffers.push(s.buffer),s.buffer.on("update",this.onBufferUpdate,this))}t&&(this.indexBuffer=Qn(t,!0),this.buffers.push(this.indexBuffer)),this.topology=i||"triangle-list"}onBufferUpdate(){this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const t=this.attributes[e];return this.getBuffer(e).data.length/(t.stride/4||t.size)}return 0}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(t=>t.destroy()),this.attributes=null,this.buffers=null}}var xv=Object.defineProperty,ju=Object.getOwnPropertySymbols,_v=Object.prototype.hasOwnProperty,wv=Object.prototype.propertyIsEnumerable,Wu=(r,e,t)=>e in r?xv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Vu=(r,e)=>{for(var t in e||(e={}))_v.call(e,t)&&Wu(r,t,e[t]);if(ju)for(var t of ju(e))wv.call(e,t)&&Wu(r,t,e[t]);return r};const Yu=class extends ur{constructor(...r){var e;let t=(e=r[0])!=null?e:{};t instanceof Float32Array&&(O(z,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:r[1],indices:r[2]}),t=Vu(Vu({},Yu.defaultOptions),t);const i=t.positions||new Float32Array([0,0,1,0,1,1,0,1]),n=t.uvs||new Float32Array([0,0,1,0,1,1,0,1]),s=t.indices||new Uint32Array([0,1,2,0,2,3]),o=new fe({data:i,label:"attribute-mesh-positions",usage:$.VERTEX|$.COPY_DST}),a=new fe({data:n,label:"attribute-mesh-uvs",usage:$.VERTEX|$.COPY_DST}),l=new fe({data:s,label:"index-mesh-buffer",usage:$.INDEX|$.COPY_DST});super({attributes:{aPosition:{buffer:o,shaderLocation:0,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:a,shaderLocation:1,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(r){this.attributes.aPosition.buffer.data=r}get uvs(){return this.attributes.aUV.buffer.data}set uvs(r){this.attributes.aUV.buffer.data=r}get indices(){return this.indexBuffer.data}set indices(r){this.indexBuffer.data=r}};let Pt=Yu;Pt.defaultOptions={topology:"triangle-list"};var Tv=Object.defineProperty,Xu=Object.getOwnPropertySymbols,Sv=Object.prototype.hasOwnProperty,Pv=Object.prototype.propertyIsEnumerable,qu=(r,e,t)=>e in r?Tv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ku=(r,e)=>{for(var t in e||(e={}))Sv.call(e,t)&&qu(r,t,e[t]);if(Xu)for(var t of Xu(e))Pv.call(e,t)&&qu(r,t,e[t]);return r};const Zu=class extends Pt{constructor(...r){var e;super({});let t=(e=r[0])!=null?e:{};typeof t=="number"&&(O(z,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:r[1],verticesX:r[2],verticesY:r[3]}),this.build(t)}build(r){var e,t,i,n;r=Ku(Ku({},Zu.defaultOptions),r),this.verticesX=(e=this.verticesX)!=null?e:r.verticesX,this.verticesY=(t=this.verticesY)!=null?t:r.verticesY,this.width=(i=this.width)!=null?i:r.width,this.height=(n=this.height)!=null?n:r.height;const s=this.verticesX*this.verticesY,o=[],a=[],l=[],h=this.verticesX-1,u=this.verticesY-1,c=this.width/h,p=this.height/u;for(let f=0;f<s;f++){const g=f%this.verticesX,m=f/this.verticesX|0;o.push(g*c,m*p),a.push(g/h,m/u)}const d=h*u;for(let f=0;f<d;f++){const g=f%h,m=f/h|0,x=m*this.verticesX+g,b=m*this.verticesX+g+1,v=(m+1)*this.verticesX+g,_=(m+1)*this.verticesX+g+1;l.push(x,b,v,b,_,v)}this.buffers[0].data=new Float32Array(o),this.buffers[1].data=new Float32Array(a),this.indexBuffer.data=new Uint32Array(l),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};let Jn=Zu;Jn.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};var Av=Object.defineProperty,Qu=Object.getOwnPropertySymbols,Ev=Object.prototype.hasOwnProperty,Cv=Object.prototype.propertyIsEnumerable,Ju=(r,e,t)=>e in r?Av(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ec=(r,e)=>{for(var t in e||(e={}))Ev.call(e,t)&&Ju(r,t,e[t]);if(Qu)for(var t of Qu(e))Cv.call(e,t)&&Ju(r,t,e[t]);return r};const tc=class extends Jn{constructor(r){r=ec(ec({},tc.defaultOptions),r),super({width:r.width,height:r.height,verticesX:4,verticesY:4}),this._textureMatrix=new R,this.update(r)}update(r){this.updateUvs(r),this.updatePositions(r)}updatePositions(r){var e,t,i,n,s,o;this.width=(e=r.width)!=null?e:this.width,this.height=(t=r.height)!=null?t:this.height,this._leftWidth=(i=r.leftWidth)!=null?i:this._leftWidth,this._rightWidth=(n=r.rightWidth)!=null?n:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight;const a=this.positions,l=this._leftWidth+this._rightWidth,h=this.width>l?1:this.width/l,u=this._topHeight+this._bottomHeight,c=this.height>u?1:this.height/u,p=Math.min(h,c);a[9]=a[11]=a[13]=a[15]=this._topHeight*p,a[17]=a[19]=a[21]=a[23]=this.height-this._bottomHeight*p,a[25]=a[27]=a[29]=a[31]=this.height,a[2]=a[10]=a[18]=a[26]=this._leftWidth*p,a[4]=a[12]=a[20]=a[28]=this.width-this._rightWidth*p,a[6]=a[14]=a[22]=a[30]=this.width,this.getBuffer("aPosition").update()}updateUvs(r){var e,t,i,n,s,o;this._originalWidth=(e=r.originalWidth)!=null?e:this._originalWidth,this._originalHeight=(t=r.originalHeight)!=null?t:this._originalHeight,this._leftWidth=(i=r.leftWidth)!=null?i:this._leftWidth,this._rightWidth=(n=r.rightWidth)!=null?n:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight,r.textureMatrix&&this._textureMatrix.copyFrom(r.textureMatrix);const a=this._textureMatrix,l=this.uvs;l[0]=l[8]=l[16]=l[24]=0,l[1]=l[3]=l[5]=l[7]=0,l[6]=l[14]=l[22]=l[30]=1,l[25]=l[27]=l[29]=l[31]=1;const h=1/this._originalWidth,u=1/this._originalHeight;l[2]=l[10]=l[18]=l[26]=h*this._leftWidth,l[9]=l[11]=l[13]=l[15]=u*this._topHeight,l[4]=l[12]=l[20]=l[28]=1-h*this._rightWidth,l[17]=l[19]=l[21]=l[23]=1-u*this._bottomHeight,Mv(a,l),this.getBuffer("aUV").update()}};let es=tc;es.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};function Mv(r,e,t){t!=null||(t=e);const i=r.a,n=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty;for(let h=0;h<e.length;h+=2){const u=e[h],c=e[h+1];t[h]=u*i+c*s+a,t[h+1]=u*n+c*o+l}return t}const rc=new gt;class cr{constructor(e){this.uid=Y("meshView"),this.renderPipeId="mesh",this.canBundle=!0,this.owner=_t,this.state=Se.for2d();var t,i,n;this.shader=e.shader,this.texture=(n=(i=e.texture)!=null?i:(t=this.shader)==null?void 0:t.texture)!=null?n:P.WHITE,this._geometry=e.geometry,this._geometry.on("update",this.onUpdate,this)}set shader(e){this._shader!==e&&(this._shader=e,this.onUpdate())}get shader(){return this._shader}set geometry(e){var t;this._geometry!==e&&((t=this._geometry)==null||t.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._geometry=e,this.onUpdate())}get geometry(){return this._geometry}set texture(e){this._texture!==e&&(this.shader&&(this.shader.texture=e),this._texture=e,this.onUpdate())}get texture(){return this._texture}get batched(){return this._shader?!1:this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch"}addBounds(e){e.addVertexData(this.geometry.positions,0,this.geometry.positions.length)}containsPoint(e){const{x:t,y:i}=e,n=this.geometry.getBuffer("aPosition").data,s=rc.points,o=this.geometry.getIndex().data,a=o.length,l=this.geometry.topology==="triangle-strip"?3:1;for(let h=0;h+2<a;h+=l){const u=o[h]*2,c=o[h+1]*2,p=o[h+2]*2;if(s[0]=n[u],s[1]=n[u+1],s[2]=n[c],s[3]=n[c+1],s[4]=n[p],s[5]=n[p+1],rc.contains(t,i))return!0}return!1}onUpdate(){this.owner.onViewUpdate()}destroy(e=!1){if(typeof e=="boolean"?e:e!=null&&e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._geometry=null,this._shader=null}}var Bv=Object.defineProperty,ic=Object.getOwnPropertySymbols,Rv=Object.prototype.hasOwnProperty,kv=Object.prototype.propertyIsEnumerable,nc=(r,e,t)=>e in r?Bv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ts=(r,e)=>{for(var t in e||(e={}))Rv.call(e,t)&&nc(r,t,e[t]);if(ic)for(var t of ic(e))kv.call(e,t)&&nc(r,t,e[t]);return r};const sc=class extends q{constructor(r){r instanceof P&&(r={texture:r}),r=ts(ts({},sc.defaultOptions),r);const e=r.texture,t=new es({width:e.width,height:e.height,originalWidth:e.width,originalHeight:e.height,leftWidth:r.leftWidth,topHeight:r.topHeight,rightWidth:r.rightWidth,bottomHeight:r.bottomHeight,textureMatrix:e.textureMatrix.mapCoord});super(ts({view:new cr({geometry:t,texture:e}),label:"NineSliceSprite"},r)),this.allowChildren=!1}get width(){return this.view.geometry.width}set width(r){this.view.geometry.updatePositions({width:r})}get height(){return this.view.geometry.height}set height(r){this.view.geometry.updatePositions({height:r})}get leftWidth(){return this.view.geometry._leftWidth}set leftWidth(r){this.view.geometry.updateUvs({leftWidth:r})}get topHeight(){return this.view.geometry._topHeight}set topHeight(r){this.view.geometry.updateUvs({topHeight:r})}get rightWidth(){return this.view.geometry._rightWidth}set rightWidth(r){this.view.geometry.updateUvs({rightWidth:r})}get bottomHeight(){return this.view.geometry._bottomHeight}set bottomHeight(r){this.view.geometry.updateUvs({bottomHeight:r})}get texture(){return this.view.texture}set texture(r){r!==this.view.texture&&(this.view.geometry.updateUvs({originalWidth:r.width,originalHeight:r.height,textureMatrix:r.textureMatrix.mapCoord}),this.view.texture=r)}};let rs=sc;rs.defaultOptions={texture:P.EMPTY,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10};class Fv extends rs{constructor(...e){let t=e[0];t instanceof P&&(O(z,"NineSlicePlane now uses the options object {texture, leftWidth, rightWidth, topHeight, bottomHeight}"),t={texture:t,leftWidth:e[1],topHeight:e[2],rightWidth:e[3],bottomHeight:e[4]}),O(z,"NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(t)}}class Gi extends Fe{constructor(e,t=!0){super(e[0]instanceof P?e[0]:e[0].texture),this._textures=null,this._durations=null,this._autoUpdate=t,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=e}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(de.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(de.shared.add(this.update,this,Ke.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,i=this.animationSpeed*t,n=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=i/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const o=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*o,this._currentTime+=o;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=i;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):n!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<n||this.animationSpeed<0&&this.currentFrame>n)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.layout.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let i=0;i<e.length;++i)t.push(P.from(e[i]));return new Gi(t)}static fromImages(e){const t=[];for(let i=0;i<e.length;++i)t.push(P.from(e[i]));return new Gi(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof P)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(de.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(de.shared.add(this.update,this),this._isConnectedToTicker=!0))}}function is(r,e,t){if(r)for(const i in r){const n=i.toLocaleLowerCase(),s=e[n];if(s){let o=r[i];i==="header"&&(o=o.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),t&&s.push(`//----${t}----//`),s.push(o)}}}const oc=/\{\{(.*?)\}\}/g;function ns(r){var e,t;const i={};return((t=(e=r.match(oc))==null?void 0:e.map(n=>n.replace(/[{()}]/g,"")))!=null?t:[]).forEach(n=>{i[n]=[]}),i}function ac(r,e){let t;const i=/@in\s+([^;]+);/g;for(;(t=i.exec(r))!==null;)e.push(t[1])}function ss(r,e,t=!1){const i=[];ac(e,i),r.forEach(a=>{a.header&&ac(a.header,i)});const n=i;t&&n.sort();const s=n.map((a,l)=>`       @location(${l}) ${a},`).join(`
`);let o=e.replace(/@in\s+[^;]+;\s*/g,"");return o=o.replace("{{in}}",`
${s}
`),o}function lc(r,e){let t;const i=/@out\s+([^;]+);/g;for(;(t=i.exec(r))!==null;)e.push(t[1])}function Ov(r){const e=/\b(\w+)\s*:/g.exec(r);return e?e[1]:""}function Uv(r){const e=/@.*?\s+/g;return r.replace(e,"")}function hc(r,e){const t=[];lc(e,t),r.forEach(l=>{l.header&&lc(l.header,t)});let i=0;const n=t.sort().map(l=>l.indexOf("builtin")>-1?l:`@location(${i++}) ${l}`).join(`,
`),s=t.sort().map(l=>`       var ${Uv(l)};`).join(`
`),o=`return VSOutput(
                ${t.sort().map(l=>` ${Ov(l)}`).join(`,
`)});`;let a=e.replace(/@out\s+[^;]+;\s*/g,"");return a=a.replace("{{struct}}",`
${n}
`),a=a.replace("{{start}}",`
${s}
`),a=a.replace("{{return}}",`
${o}
`),a}function os(r,e){let t=r;for(const i in e){const n=e[i];n.join(`
`).length?t=t.replace(`{{${i}}}`,`//-----${i} START-----//
${n.join(`
`)}
//----${i} FINISH----//`):t=t.replace(`{{${i}}}`,"")}return t}const ct=Object.create(null),as=new Map;let Iv=0;function uc({template:r,bits:e}){const t=dc(r,e);if(ct[t])return ct[t];const{vertex:i,fragment:n}=Gv(r,e);return ct[t]=pc(i,n,e),ct[t]}function cc({template:r,bits:e}){const t=dc(r,e);return ct[t]||(ct[t]=pc(r.vertex,r.fragment,e)),ct[t]}function Gv(r,e){const t=e.map(o=>o.vertex).filter(o=>!!o),i=e.map(o=>o.fragment).filter(o=>!!o);let n=ss(t,r.vertex);n=hc(t,n);const s=ss(i,r.fragment,!0);return{vertex:n,fragment:s}}function dc(r,e){return e.map(t=>(as.has(t)||as.set(t,Iv++),as.get(t))).sort((t,i)=>t-i).join("-")+r.vertex+r.fragment}function pc(r,e,t){const i=ns(r),n=ns(e);return t.forEach(s=>{is(s.vertex,i,s.name),is(s.fragment,n,s.name)}),{vertex:os(r,i),fragment:os(e,n)}}const fc=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.worldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);
        vUV = aUV;

        {{main}}

        var modelViewProjectionMatrix = globalUniforms.projectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.worldAlpha;

        {{return}}
    };
`,mc=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,gc=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = worldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;

        {{start}}
        
        vColor = vec4(1.);
        vUV = aUV;

        {{main}}

        mat3 modelViewProjectionMatrix = projectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= worldAlpha;

        {{return}}
    }
`,bc=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`,vc={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            projectionMatrix:mat3x3<f32>,
            worldTransformMatrix:mat3x3<f32>,
            worldAlpha: f32
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},yc={name:"global-uniforms-bit",vertex:{header:`
          uniform globalUniforms {
            mat3 projectionMatrix;
            mat3 worldTransformMatrix;
            float worldAlpha;
          };
        `}};var $v=Object.defineProperty,xc=Object.getOwnPropertySymbols,Lv=Object.prototype.hasOwnProperty,Dv=Object.prototype.propertyIsEnumerable,_c=(r,e,t)=>e in r?$v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,zv=(r,e)=>{for(var t in e||(e={}))Lv.call(e,t)&&_c(r,t,e[t]);if(xc)for(var t of xc(e))Dv.call(e,t)&&_c(r,t,e[t]);return r};function At({bits:r,name:e}){const t=uc({template:{fragment:mc,vertex:fc},bits:[vc,...r]});return new Me({name:e,vertex:{source:t.vertex,entryPoint:"main"},fragment:{source:t.fragment,entryPoint:"main"}})}function Et({bits:r,name:e}){return new we(zv({name:e},cc({template:{vertex:gc,fragment:bc},bits:[yc,...r]})))}const Jr={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},ei={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},Ct={};function Nv(r){const e=[];if(r===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let i=0;i<r;i++)e.push(`@group(1) @binding(${t++}) var textureSource${i+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${i+1}: sampler;`)}return e.join(`
`)}function Hv(r){const e=[];if(r===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let t=0;t<r;t++)t===r-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function ti(r){return Ct[r]||(Ct[r]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureId: f32;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = u32(aTextureId);
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${Nv(16)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${Hv(16)}
            `}}),Ct[r]}function jv(r){const e=[];for(let t=0;t<r;t++)t>0&&e.push("else"),t<r-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uSamplers[${t}], vUV);`),e.push("}");return e.join(`
`)}function ri(r){return Ct[r]||(Ct[r]={name:"texture-batch-bit",vertex:{header:`
                in float aTextureId;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureId;
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uSamplers[${r}];
              
            `,main:`
    
                ${jv(16)}
            `}}),Ct[r]}const Te=16,wc=new Int32Array(Te);for(let r=0;r<Te;r++)wc[r]=r;const ii=new te({uSamplers:{value:wc,type:"u32",size:Te}},{isStatic:!0});class ls{constructor(){this._didUpload=!1,this._tempState=Se.for2d()}init(){const e=new te({tint:{value:new Float32Array([1,1,1,1]),type:"f32"},translationMatrix:{value:new R,type:"mat3x3<f32>"}}),t=Et({name:"batch",bits:[ei,ri(Te)]});this._shader=new Ee({glProgram:t,resources:{uniforms:e,batchSamplers:ii}})}start(e,t){const i=e.renderer;i.shader.bind(this._shader,this._didUpload),i.shader.bindUniformBlock(i.globalUniforms.uniformGroup,"globalUniforms",0),i.geometry.bind(t,this._shader.glProgram)}execute(e,t){const i=e.renderer;this._didUpload=!0,this._tempState.blendMode=t.blendMode,i.state.set(this._tempState);const n=t.textures.textures;for(let s=0;s<n.length;s++)i.texture.bind(n[s],s);i.geometry.draw("triangle-list",t.size,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}ls.extension={type:[y.WebGLPipesAdaptor],name:"batch"};const Tc=new Float32Array(1),Sc=new Uint32Array(1);class Pc extends ur{constructor(){const e=new fe({data:Tc,label:"attribute-batch-buffer",usage:$.VERTEX|$.COPY_DST}),t=new fe({data:Sc,label:"index-batch-buffer",usage:$.INDEX|$.COPY_DST}),i=6*4;super({attributes:{aPosition:{buffer:e,shaderLocation:0,format:"float32x2",stride:i,offset:0},aUV:{buffer:e,shaderLocation:1,format:"float32x2",stride:i,offset:2*4},aColor:{buffer:e,shaderLocation:2,format:"unorm8x4",stride:i,offset:4*4},aTextureId:{buffer:e,shaderLocation:3,format:"float32",stride:i,offset:5*4}},indexBuffer:t})}reset(){this.indexBuffer.data=Sc,this.buffers[0].data=Tc}}function Wv(r){const e=[];let t=0;for(let i=0;i<r;i++)e[t]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:t,visibility:GPUShaderStage.FRAGMENT},t++,e[t]={sampler:{type:"filtering"},binding:t,visibility:GPUShaderStage.FRAGMENT},t++;return e}function Vv(r){const e={};let t=0;for(let i=0;i<r;i++)e[`textureSource${i+1}`]=t++,e[`textureSampler${i+1}`]=t++;return e}const Yv=new Float32Array(1),Xv=new Uint32Array(1);function hs(){const r=new fe({data:Yv,label:"attribute-batch-buffer",usage:$.VERTEX|$.COPY_DST}),e=new fe({data:Xv,label:"index-batch-buffer",usage:$.INDEX|$.COPY_DST}),t=6*4;return new ur({attributes:{aPosition:{buffer:r,shaderLocation:0,format:"float32x2",stride:t,offset:0},aUV:{buffer:r,shaderLocation:1,format:"float32x2",stride:t,offset:2*4},aColor:{buffer:r,shaderLocation:2,format:"unorm8x4",stride:t,offset:4*4},aTextureId:{buffer:r,shaderLocation:3,format:"float32",stride:t,offset:5*4}},indexBuffer:e})}const Ac={};function ni(r,e){let t=0;for(let i=0;i<e;i++)t=t*31+r[i].uid>>>0;return Ac[t]||qv(r,t)}function qv(r,e){const t={};let i=0;for(let s=0;s<Te;s++){const o=s<r.length?r[s]:P.EMPTY.source;t[i++]=o.source,t[i++]=o.style}const n=new Ae(t);return Ac[e]=n,n}const us=Se.for2d();class cs{init(){const e=At({name:"batch",bits:[Jr,ti(Te)]});this._shader=new Ee({gpuProgram:e,groups:{}})}start(e,t){const i=e.renderer,n=i.encoder,s=this._shader.gpuProgram;n.setGeometry(t),us.blendMode="normal",i.pipeline.getPipeline(t,s,us);const o=i.globalUniforms.bindGroup;n.setBindGroup(0,o,s)}execute(e,t){const i=this._shader.gpuProgram,n=e.renderer,s=n.encoder;if(!t.bindGroup){const l=t.textures;t.bindGroup=ni(l.textures,l.count)}const o=n.bindGroup.getBindGroup(t.bindGroup,i,1),a=n.pipeline.getPipeline(t.batcher.geometry,i,us);t.bindGroup.touch(n.textureGC.count),s.setPipeline(a),s.renderPassEncoder.setBindGroup(1,o),s.renderPassEncoder.drawIndexed(t.size,1,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}cs.extension={type:[y.WebGPUPipesAdaptor],name:"batch"};class ds{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function si(r,e){const t=r.byteLength/8|0,i=new Float64Array(r,0,t),n=new Float64Array(e,0,t);for(let a=0;a<t;a++)n[a]=i[a];const s=new Uint8Array(r,t*8),o=new Uint8Array(e,t*8);for(let a=0;a<s.length;a++)o[a]=s[a]}class ps{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){const t=this.textures[e];this.textures[e]=null,this.ids[t.uid]=null}this.count=0}}class fs{constructor(){this.type="batch",this.action="startBatch",this.start=0,this.size=0,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}let dr=0;class ms{constructor(e=4,t=6){this.uid=Y("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this.geometry=hs(),this._vertexSize=6,this._elements=[],this._batchPool=[],this._batchPoolIndex=0,this._textureBatchPool=[],this._textureBatchPoolIndex=0,this.attributeBuffer=new ds(e*this._vertexSize*4),this.indexBuffer=new Uint32Array(t)}begin(){this.batchIndex=0,this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0,this._batchPoolIndex=0,this._textureBatchPoolIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e.indexStart=this.indexSize,e.location=this.attributeSize,e.batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.vertexSize*this._vertexSize}checkAndUpdateTexture(e,t){const i=e.batch.textures.ids[t._source.uid];return!i&&i!==0?!1:(e.textureId=i,e.texture=t,!0)}updateElement(e){this.dirty=!0,e.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,e.location,e.textureId)}break(e){const t=this._elements;let i=this._textureBatchPool[this._textureBatchPoolIndex++]||new ps;if(i.clear(),!t[this.elementStart])return;let n=t[this.elementStart].blendMode;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const s=this.attributeBuffer.float32View,o=this.attributeBuffer.uint32View,a=this.indexBuffer;let l=this._batchIndexSize,h=this._batchIndexStart,u="startBatch",c=this._batchPool[this._batchPoolIndex++]||new fs;for(let p=this.elementStart;p<this.elementSize;++p){const d=t[p];t[p]=null;const f=d.texture._source,g=n!==d.blendMode;if(f._batchTick===dr&&!g){d.textureId=f._textureBindLocation,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize),d.batch=c;continue}f._batchTick=dr,(i.count>=Te||g)&&(this._finishBatch(c,h,l-h,i,n,e,u),u="renderBatch",h=l,n=d.blendMode,i=this._textureBatchPool[this._textureBatchPoolIndex++]||new ps,i.clear(),c=this._batchPool[this._batchPoolIndex++]||new fs,++dr),d.textureId=f._textureBindLocation=i.count,i.ids[f.uid]=i.count,i.textures[i.count++]=f,d.batch=c,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize)}i.count>0&&(this._finishBatch(c,h,l-h,i,n,e,u),h=l,++dr),this.elementStart=this.elementSize,this._batchIndexStart=h,this._batchIndexSize=l}_finishBatch(e,t,i,n,s,o,a){e.gpuBindGroup=null,e.action=a,e.batcher=this,e.textures=n,e.blendMode=s,e.start=t,e.size=i,++dr,o.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const t=Math.max(e,this.attributeBuffer.size*2),i=new ds(t);si(this.attributeBuffer.rawBinaryData,i.rawBinaryData),this.attributeBuffer=i}_resizeIndexBuffer(e){const t=this.indexBuffer,i=Math.max(e,t.length*2),n=new Uint32Array(i);si(t.buffer,n.buffer),this.indexBuffer=n}destroy(){for(let e=0;e<this.batches.length;e++)this.batches[e].destroy();this.batches=null;for(let e=0;e<this._elements.length;e++)this._elements[e].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}class gs{constructor(e,t){this.state=Se.for2d(),this._batches=Object.create(null),this._geometries=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}buildStart(e){if(!this._batches[e.uid]){const t=new ms;this._batches[e.uid]=t,this._geometries[t.uid]=hs()}this._activeBatch=this._batches[e.uid],this._activeGeometry=this._geometries[this._activeBatch.uid],this._activeBatch.begin()}addToBatch(e){this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){const t=this._activeBatch,i=this._activeGeometry;t.finish(e),i.indexBuffer.data=t.indexBuffer,i.indexBuffer.update(t.indexSize*4),i.buffers[0].data=t.attributeBuffer.float32View}upload(e){const t=this._batches[e.uid],i=this._geometries[t.uid];t.dirty&&(t.dirty=!1,i.buffers[0].update(t.attributeSize*4))}execute(e){if(e.action==="startBatch"){const t=e.batcher,i=this._geometries[t.uid];this._adaptor.start(this,i)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor.destroy(),this._adaptor=null;for(const e in this._batches)this._batches[e].destroy();this._batches=null;for(const e in this._geometries)this._geometries[e].destroy();this._geometries=null}}gs.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"batch"};var Ec=`
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
`,Cc=`in vec2 aPosition;
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
`,Mc=`struct GlobalUniforms {
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
}`,Kv=Object.defineProperty,Bc=Object.getOwnPropertySymbols,Zv=Object.prototype.hasOwnProperty,Qv=Object.prototype.propertyIsEnumerable,Rc=(r,e,t)=>e in r?Kv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,kc=(r,e)=>{for(var t in e||(e={}))Zv.call(e,t)&&Rc(r,t,e[t]);if(Bc)for(var t of Bc(e))Qv.call(e,t)&&Rc(r,t,e[t]);return r};class ee extends Ce{constructor(e){const t=e.gpu,i=Fc(kc({source:Mc},t)),n=new Me({vertex:{source:i,entryPoint:"mainVertex"},fragment:{source:i,entryPoint:"mainFragment"}}),s=e.gl,o=Fc(kc({source:Ec},s)),a=new we({vertex:Cc,fragment:o}),l=new te({uBlend:{value:1,type:"f32"}});super({gpuProgram:n,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,backTexture:P.EMPTY}})}}function Fc(r){const{source:e,functions:t,main:i}=r;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",i)}const oi=`
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
    `,ai=`
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
	`;var Oc=`in vec2 vMaskCoord;
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
`,Uc=`in vec2 aPosition;

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
`,bs=`struct GlobalFilterUniforms {
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
  
}`;class Ic extends Ce{constructor({sprite:e}){const t=new Xi(e.texture),i=new te({filterMatrix:{value:new R,type:"mat3x3<f32>"},maskClamp:{value:t.uClampFrame,type:"vec4<f32>"},alpha:{value:1,type:"f32"}}),n=new Me({vertex:{source:bs,entryPoint:"mainVertex"},fragment:{source:bs,entryPoint:"mainFragment"}}),s=we.from({vertex:Uc,fragment:Oc,name:"mask-filter"});super({gpuProgram:n,glProgram:s,resources:{filterUniforms:i,mapTexture:e.texture.source}}),this.sprite=e,this._textureMatrix=t}apply(e,t,i,n){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.filterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,t,i,n)}}class vs{constructor(e){this._renderer=e}push(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({type:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({type:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}vs.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"filter"};function Gc(r,e){e.clear();const t=e.matrix;for(let i=0;i<r.length;i++){const n=r[i];n.layerVisibleRenderable<3||(e.matrix=n.worldTransform,n.view.addBounds(e))}return e.matrix=t,e}const Jv=new ur({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),shaderLocation:0,format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class ys{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new te({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"},outputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Ae({}),this.renderer=e}push(e){var t,i;const n=this.renderer,s=e.filterEffect.filters;this._filterStack[this._filterStackIndex]||(this._filterStack[this._filterStackIndex]=this._getFilterData());const o=this._filterStack[this._filterStackIndex];this._filterStackIndex++;const a=o.bounds;if(e.renderables?Gc(e.renderables,a):Xt(e.container,!0,a),s.length===0){o.skip=!0;return}let l=n.renderTarget.rootRenderTarget.colorTexture.source._resolution,h=0,u=n.renderTarget.rootRenderTarget.colorTexture.source.antialias,c=!1,p=!1;for(let d=0;d<s.length;d++){const f=s[d];if(l=Math.min(l,f.resolution),h+=f.padding,f.antialias!=="inherit"&&(f.antialias==="on"?u=!0:u=!1),!(f.compatibleRenderers&n.type)){p=!1;break}if(f.blendRequired&&!((i=(t=n.backBuffer)==null?void 0:t.useBackBuffer)==null||i)){p=!1;break}p=f.enabled||p,c=c||f.blendRequired}if(!p){o.skip=!0;return}if(a.scale(l).fit(n.renderTarget.rootRenderTarget.viewport).scale(1/l).pad(h).ceil(),!a.isPositive){o.skip=!0;return}o.skip=!1,o.bounds=a,o.blendRequired=c,o.container=e.container,o.filterEffect=e.filterEffect,o.previousRenderSurface=n.renderTarget.renderTarget,o.inputTexture=le.getOptimalTexture(a.width,a.height,l,u),n.renderTarget.bind(o.inputTexture,!0),n.globalUniforms.push({offset:a})}pop(){var e,t;const i=this.renderer;this._filterStackIndex--;const n=this._filterStack[this._filterStackIndex];if(n.skip)return;this._activeFilterData=n;const s=n.inputTexture,o=n.bounds;let a=P.EMPTY;if((t=(e=i.renderTarget).finishRenderPass)==null||t.call(e),n.blendRequired){i.encoder.finishRenderPass();const h=this._filterStackIndex>0?this._filterStack[this._filterStackIndex-1].bounds:null;a=this.getBackTexture(n.previousRenderSurface,o,h)}n.backTexture=a;const l=n.filterEffect.filters;if(this._globalFilterBindGroup.setResource(s.source.style,2),this._globalFilterBindGroup.setResource(a.source,3),i.globalUniforms.pop(),l.length===1)l[0].apply(this,s,n.previousRenderSurface,!1),le.returnTexture(s);else{let h=n.inputTexture,u=le.getOptimalTexture(o.width,o.height,h.source._resolution,!1),c=0;for(c=0;c<l.length-1;++c){l[c].apply(this,h,u,!0);const p=h;h=u,u=p}l[c].apply(this,h,n.previousRenderSurface,!1),le.returnTexture(h),le.returnTexture(u)}n.blendRequired&&le.returnTexture(a)}getBackTexture(e,t,i){const n=e.colorTexture.source._resolution,s=le.getOptimalTexture(t.width,t.height,n,!1);let o=t.minX,a=t.minY;i&&(o-=i.minX,a-=i.minY),o=Math.floor(o*n),a=Math.floor(a*n);const l=Math.ceil(t.width*n),h=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,s,{x:o,y:a},{width:l,height:h}),s}applyFilter(e,t,i,n){const s=this.renderer,o=this._filterStack[this._filterStackIndex],a=o.bounds,l=W.shared,h=o.previousRenderSurface===this.renderer.renderTarget.getRenderTarget(i);let u=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;this._filterStackIndex>0&&(u=this._filterStack[this._filterStackIndex-1].inputTexture.source._resolution);const c=this._filterGlobalUniforms,p=c.uniforms,d=p.outputFrame,f=p.inputSize,g=p.inputPixel,m=p.inputClamp,x=p.globalFrame,b=p.outputTexture;h?(this._filterStackIndex>0&&(l.x=this._filterStack[this._filterStackIndex-1].bounds.minX,l.y=this._filterStack[this._filterStackIndex-1].bounds.minY),d[0]=a.minX-l.x,d[1]=a.minY-l.y):(d[0]=0,d[1]=0),d[2]=t.frameWidth,d[3]=t.frameHeight,f[0]=t.source.width,f[1]=t.source.height,f[2]=1/f[0],f[3]=1/f[1],g[0]=t.source.pixelWidth,g[1]=t.source.pixelHeight,g[2]=1/g[0],g[3]=1/g[1],m[0]=.5*g[2],m[1]=.5*g[3],m[2]=t.frameWidth*f[2]-.5*g[2],m[3]=t.frameHeight*f[3]-.5*g[3];const v=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=l.x*u,x[1]=l.y*u,x[2]=v.source.width*u,x[3]=v.source.height*u;const _=this.renderer.renderTarget.getRenderTarget(i);if(b[0]=_.colorTexture.frameWidth,b[1]=_.colorTexture.frameHeight,b[2]=_.isRoot?-1:1,c.update(),s.renderPipes.uniformBatch){const S=s.renderPipes.uniformBatch.getUniformBufferResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(S,0)}else this._globalFilterBindGroup.setResource(c,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),s.renderTarget.bind(i,!!n),e.groups[0]=this._globalFilterBindGroup,s.encoder.draw({geometry:Jv,shader:e,state:e._state,topology:"triangle-list"})}_getFilterData(){return{skip:!1,inputTexture:null,bounds:new ce,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,t){const i=this._activeFilterData,n=e.set(i.inputTexture._source.width,0,0,i.inputTexture._source.height,i.bounds.minX,i.bounds.minY),s=t.worldTransform.copyTo(R.shared);return s.invert(),n.prepend(s),n.scale(1/t.texture.frameWidth,1/t.texture.frameHeight),n.translate(t.anchor.x,t.anchor.y),n}}ys.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"filter"};const xs={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `}},Mt={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `}};function ey(r,e,t,i){t[i++]=(r>>16&255)/255,t[i++]=(r>>8&255)/255,t[i++]=(r&255)/255,t[i++]=e}function pr(r,e,t){e[t++]=(r&255)/255,e[t++]=(r>>8&255)/255,e[t++]=(r>>16&255)/255,e[t++]=(r>>24&255)/255}class _s{init(){const e=new te({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new R,type:"mat3x3<f32>"}}),t=Et({name:"graphics",bits:[ei,ri(Te),Mt]});this._shader=new Ee({glProgram:t,resources:{localUniforms:e,batchSamplers:ii}})}execute(e,t){const i=t.view.context,n=i.customShader||this._shader,s=e.renderer,o=s.graphicsContext;if(!o.updateGpuContext(i).batches.length)return;const{geometry:a,instructions:l}=o.getContextRenderData(i),h=e.state;h.blendMode=t.layerBlendMode,s.state.set(e.state);const u=n.resources.localUniforms.uniforms;u.uTransformMatrix=t.layerTransform,pr(t.layerColor,u.uColor,0),s.shader.bind(n),s.shader.bindUniformBlock(s.globalUniforms.uniformGroup,"globalUniforms"),s.geometry.bind(a,n.glProgram);const c=l.instructions;for(let p=0;p<l.instructionSize;p++){const d=c[p];if(d.size){for(let f=0;f<d.textures.textures.length;f++)s.texture.bind(d.textures.textures[f],f);s.geometry.draw("triangle-list",d.size,d.start)}}}destroy(){this._shader.destroy(!0),this._shader=null}}_s.extension={type:[y.WebGLPipesAdaptor],name:"graphics"};class ws{init(){const e=new te({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new R,type:"mat3x3<f32>"}}),t=At({name:"graphics",bits:[Jr,ti(Te),xs]});this._shader=new Ee({gpuProgram:t,groups:{2:new Ae({0:e})}})}execute(e,t){const i=t.view.context,n=i.customShader||this._shader,s=e.renderer,o=s.graphicsContext;if(!o.getGpuContext(i).batches.length)return;const{geometry:a,instructions:l}=o.getContextRenderData(i);e.state.blendMode=t.layerBlendMode;const h=n.resources.localUniforms;n.resources.localUniforms.uniforms.uTransformMatrix=t.layerTransform,pr(t.layerColor,h.uniforms.uColor,0);const u=s.encoder;u.setPipelineFromGeometryProgramAndState(a,n.gpuProgram,e.state),u.setGeometry(a);const c=s.globalUniforms.bindGroup;u.setBindGroup(0,c,n.gpuProgram);const p=s.renderPipes.uniformBatch.getUniformBindGroup(h,!0);u.setBindGroup(2,p,n.gpuProgram);const d=l.instructions;for(let f=0;f<l.instructionSize;f++){const g=d[f];if(n.groups[1]=g.bindGroup,!g.gpuBindGroup){const m=g.textures;g.bindGroup=ni(m.textures,m.count),g.gpuBindGroup=s.bindGroup.getBindGroup(g.bindGroup,n.gpuProgram,1)}u.setBindGroup(1,g.bindGroup,n.gpuProgram),u.renderPassEncoder.drawIndexed(g.size,1,g.start)}}destroy(){this._shader.destroy(!0),this._shader=null}}ws.extension={type:[y.WebGPUPipesAdaptor],name:"graphics"};function Ts(r,e,t){const i=r>>16&255,n=r>>8&255,s=r&255,o=e>>16&255,a=e>>8&255,l=e&255,h=i+(o-i)*t,u=n+(a-n)*t,c=s+(l-s)*t;return(h<<16)+(u<<8)+c}const $c=16777215+16777215;function li(r,e){const t=(r>>24&255)/255,i=(e>>24&255)/255,n=t*i*255,s=r&16777215,o=e&16777215;let a=16777215;return s+(o<<32)!==$c&&(s===16777215?a=o:o===16777215?a=s:a=Ts(s,o,.5)),a+(n<<24)}function ty(r,e,t){const i=(t>>24&255)/255,n=e*i*255,s=((r&255)<<16)+(r&65280)+(r>>16&255),o=t&16777215;let a=16777215;return s+(o<<32)!==$c&&(s===16777215?a=o:o===16777215?a=s:a=Ts(s,o,.5)),a+(n<<24)}class hi{constructor(){this.batcher=null,this.batch=null,this.applyTransform=!0}get blendMode(){return this.applyTransform?this.renderable.layerBlendMode:"normal"}packIndex(e,t,i){const n=this.geometryData.indices;for(let s=0;s<this.indexSize;s++)e[t++]=n[s+this.indexOffset]+i-this.vertexOffset}packAttributes(e,t,i,n){const s=this.geometryData,o=s.vertices,a=s.uvs,l=this.vertexOffset*2,h=(this.vertexOffset+this.vertexSize)*2,u=this.color,c=u>>16|u&65280|(u&255)<<16;if(this.applyTransform){const p=this.renderable,d=li(c+(this.alpha*255<<24),p.layerColor),f=p.layerTransform,g=f.a,m=f.b,x=f.c,b=f.d,v=f.tx,_=f.ty;for(let S=l;S<h;S+=2){const k=o[S],M=o[S+1];e[i++]=g*k+x*M+v,e[i++]=m*k+b*M+_,e[i++]=a[S],e[i++]=a[S+1],t[i++]=d,e[i++]=n}}else{const p=c+(this.alpha*255<<24);for(let d=l;d<h;d+=2)e[i++]=o[d],e[i++]=o[d+1],e[i++]=a[d],e[i++]=a[d+1],t[i++]=p,e[i++]=n}}get vertSize(){return this.vertexSize}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.vertexOffset=this.vertexOffset,e.vertexSize=this.vertexSize,e.color=this.color,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}}const dt={build(r,e){let t,i,n,s,o,a;if(r.type==="circle"){const _=r;t=_.x,i=_.y,o=a=_.radius,n=s=0}else if(r.type==="ellipse"){const _=r;t=_.x,i=_.y,o=_.halfWidth,a=_.halfHeight,n=s=0}else{const _=r,S=_.width/2,k=_.height/2;t=_.x+S,i=_.y+k,o=a=Math.max(0,Math.min(_.radius,Math.min(S,k))),n=S-o,s=k-a}if(!(o>=0&&a>=0&&n>=0&&s>=0))return e;const l=Math.ceil(2.3*Math.sqrt(o+a)),h=l*8+(n?4:0)+(s?4:0);if(h===0)return e;if(l===0)return e[0]=e[6]=t+n,e[1]=e[3]=i+s,e[2]=e[4]=t-n,e[5]=e[7]=i-s,e;let u=0,c=l*4+(n?2:0)+2,p=c,d=h,f=n+o,g=s,m=t+f,x=t-f,b=i+g;if(e[u++]=m,e[u++]=b,e[--c]=b,e[--c]=x,s){const _=i-g;e[p++]=x,e[p++]=_,e[--d]=_,e[--d]=m}for(let _=1;_<l;_++){const S=Math.PI/2*(_/l),k=n+Math.cos(S)*o,M=s+Math.sin(S)*a,A=t+k,w=t-k,T=i+M,L=i-M;e[u++]=A,e[u++]=T,e[--c]=T,e[--c]=w,e[p++]=w,e[p++]=L,e[--d]=L,e[--d]=A}f=n,g=s+a,m=t+f,x=t-f,b=i+g;const v=i-g;return e[u++]=m,e[u++]=b,e[--d]=v,e[--d]=m,n&&(e[u++]=x,e[u++]=b,e[--d]=v,e[--d]=x),e},triangulate(r,e,t,i,n,s){if(r.length===0)return;let o=0,a=0;const l=r.length/4;o+=r[0],a+=r[1],o+=r[l|0],a+=r[(l|0)+1],o+=r[l*2|0],a+=r[(l*2|0)+1],o+=r[l*3|0],a+=r[(l*3|0)+1],o/=4,a/=4;let h=i;e[h*t]=o,e[h*t+1]=a,h++;const u=i;e[h*t]=r[0],e[h*t+1]=r[1],h++;for(let c=2;c<r.length;c+=2)e[h*t]=r[c],e[h*t+1]=r[c+1],n[s++]=h,n[s++]=u,n[s++]=h-1,h++;n[s++]=h-1,n[s++]=u,n[s++]=u+1}},Lc=1e-4,Ss=1e-4;function Dc(r){const e=r.length;if(e<6)return 1;let t=0;for(let i=0,n=r[e-2],s=r[e-1];i<e;i+=2){const o=r[i],a=r[i+1];t+=(o-n)*(a+s),n=o,s=a}return t<0?-1:1}function zc(r,e,t,i,n,s,o,a){const l=r-t*n,h=e-i*n,u=r+t*s,c=e+i*s;let p,d;o?(p=i,d=-t):(p=-i,d=t);const f=l+p,g=h+d,m=u+p,x=c+d;return a.push(f,g),a.push(m,x),2}function pt(r,e,t,i,n,s,o,a){const l=t-r,h=i-e;let u=Math.atan2(l,h),c=Math.atan2(n-r,s-e);a&&u<c?u+=Math.PI*2:!a&&u>c&&(c+=Math.PI*2);let p=u;const d=c-u,f=Math.abs(d),g=Math.sqrt(l*l+h*h),m=(15*f*Math.sqrt(g)/Math.PI>>0)+1,x=d/m;if(p+=x,a){o.push(r,e),o.push(t,i);for(let b=1,v=p;b<m;b++,v+=x)o.push(r,e),o.push(r+Math.sin(v)*g,e+Math.cos(v)*g);o.push(r,e),o.push(n,s)}else{o.push(t,i),o.push(r,e);for(let b=1,v=p;b<m;b++,v+=x)o.push(r+Math.sin(v)*g,e+Math.cos(v)*g),o.push(r,e);o.push(n,s),o.push(r,e)}return m*2}function Nc(r,e,t,i,n,s,o,a,l){const h=Lc;if(r.length===0)return;const u=e;let c=u.alignment;if(e.alignment!==.5){let V=Dc(r);t&&(V*=-1),c=(c-.5)*V+.5}const p=new W(r[0],r[1]),d=new W(r[r.length-2],r[r.length-1]),f=i,g=Math.abs(p.x-d.x)<h&&Math.abs(p.y-d.y)<h;if(f){r=r.slice(),g&&(r.pop(),r.pop(),d.set(r[r.length-2],r[r.length-1]));const V=(p.x+d.x)*.5,Ne=(d.y+p.y)*.5;r.unshift(V,Ne),r.push(V,Ne)}const m=n,x=r.length/2;let b=r.length;const v=m.length/2,_=u.width/2,S=_*_,k=u.miterLimit*u.miterLimit;let M=r[0],A=r[1],w=r[2],T=r[3],L=0,G=0,B=-(A-T),E=M-w,X=0,Q=0,me=Math.sqrt(B*B+E*E);B/=me,E/=me,B*=_,E*=_;const It=c,F=(1-It)*2,U=It*2;f||(u.cap==="round"?b+=pt(M-B*(F-U)*.5,A-E*(F-U)*.5,M-B*F,A-E*F,M+B*U,A+E*U,m,!0)+2:u.cap==="square"&&(b+=zc(M,A,B,E,F,U,!0,m))),m.push(M-B*F,A-E*F),m.push(M+B*U,A+E*U);for(let V=1;V<x-1;++V){M=r[(V-1)*2],A=r[(V-1)*2+1],w=r[V*2],T=r[V*2+1],L=r[(V+1)*2],G=r[(V+1)*2+1],B=-(A-T),E=M-w,me=Math.sqrt(B*B+E*E),B/=me,E/=me,B*=_,E*=_,X=-(T-G),Q=w-L,me=Math.sqrt(X*X+Q*Q),X/=me,Q/=me,X*=_,Q*=_;const Ne=w-M,Gt=A-T,$t=w-L,Lt=G-T,ga=Ne*$t+Gt*Lt,Er=Gt*$t-Lt*Ne,Dt=Er<0;if(Math.abs(Er)<.001*Math.abs(ga)){m.push(w-B*F,T-E*F),m.push(w+B*U,T+E*U),ga>=0&&(u.join==="round"?b+=pt(w,T,w-B*F,T-E*F,w-X*F,T-Q*F,m,!1)+4:b+=2,m.push(w-X*U,T-Q*U),m.push(w+X*F,T+Q*F));continue}const ba=(-B+M)*(-E+T)-(-B+w)*(-E+A),va=(-X+L)*(-Q+T)-(-X+w)*(-Q+G),Cr=(Ne*va-$t*ba)/Er,Mr=(Lt*ba-Gt*va)/Er,$i=(Cr-w)*(Cr-w)+(Mr-T)*(Mr-T),Ve=w+(Cr-w)*F,Ye=T+(Mr-T)*F,Xe=w-(Cr-w)*U,qe=T-(Mr-T)*U,Df=Math.min(Ne*Ne+Gt*Gt,$t*$t+Lt*Lt),ya=Dt?F:U,zf=Df+ya*ya*S;$i<=zf?u.join==="bevel"||$i/S>k?(Dt?(m.push(Ve,Ye),m.push(w+B*U,T+E*U),m.push(Ve,Ye),m.push(w+X*U,T+Q*U)):(m.push(w-B*F,T-E*F),m.push(Xe,qe),m.push(w-X*F,T-Q*F),m.push(Xe,qe)),b+=2):u.join==="round"?Dt?(m.push(Ve,Ye),m.push(w+B*U,T+E*U),b+=pt(w,T,w+B*U,T+E*U,w+X*U,T+Q*U,m,!0)+4,m.push(Ve,Ye),m.push(w+X*U,T+Q*U)):(m.push(w-B*F,T-E*F),m.push(Xe,qe),b+=pt(w,T,w-B*F,T-E*F,w-X*F,T-Q*F,m,!1)+4,m.push(w-X*F,T-Q*F),m.push(Xe,qe)):(m.push(Ve,Ye),m.push(Xe,qe)):(m.push(w-B*F,T-E*F),m.push(w+B*U,T+E*U),u.join==="round"?Dt?b+=pt(w,T,w+B*U,T+E*U,w+X*U,T+Q*U,m,!0)+2:b+=pt(w,T,w-B*F,T-E*F,w-X*F,T-Q*F,m,!1)+2:u.join==="miter"&&$i/S<=k&&(Dt?(m.push(Xe,qe),m.push(Xe,qe)):(m.push(Ve,Ye),m.push(Ve,Ye)),b+=2),m.push(w-X*F,T-Q*F),m.push(w+X*U,T+Q*U),b+=2)}M=r[(x-2)*2],A=r[(x-2)*2+1],w=r[(x-1)*2],T=r[(x-1)*2+1],B=-(A-T),E=M-w,me=Math.sqrt(B*B+E*E),B/=me,E/=me,B*=_,E*=_,m.push(w-B*F,T-E*F),m.push(w+B*U,T+E*U),f||(u.cap==="round"?b+=pt(w-B*(F-U)*.5,T-E*(F-U)*.5,w-B*F,T-E*F,w+B*U,T+E*U,m,!1)+2:u.cap==="square"&&(b+=zc(w,T,B,E,F,U,!1,m)));const Lf=Ss*Ss;for(let V=v;V<b+v-2;++V)M=m[V*2],A=m[V*2+1],w=m[(V+1)*2],T=m[(V+1)*2+1],L=m[(V+2)*2],G=m[(V+2)*2+1],!(Math.abs(M*(T-G)+w*(G-A)+L*(A-T))<Lf)&&a.push(V,V+1,V+2)}var Ps=ui,ry=ui;function ui(r,e,t){t=t||2;var i=e&&e.length,n=i?e[0]*t:r.length,s=Hc(r,0,n,t,!0),o=[];if(!s||s.next===s.prev)return o;var a,l,h,u,c,p,d;if(i&&(s=ay(r,e,s,t)),r.length>80*t){a=h=r[0],l=u=r[1];for(var f=t;f<n;f+=t)c=r[f],p=r[f+1],c<a&&(a=c),p<l&&(l=p),c>h&&(h=c),p>u&&(u=p);d=Math.max(h-a,u-l),d=d!==0?32767/d:0}return fr(s,o,t,a,l,d,0),o}function Hc(r,e,t,i,n){var s,o;if(n===Cs(r,e,t,i)>0)for(s=e;s<t;s+=i)o=Vc(s,r[s],r[s+1],o);else for(s=t-i;s>=e;s-=i)o=Vc(s,r[s],r[s+1],o);return o&&ci(o,o.next)&&(gr(o),o=o.next),o}function ft(r,e){if(!r)return r;e||(e=r);var t=r,i;do if(i=!1,!t.steiner&&(ci(t,t.next)||Z(t.prev,t,t.next)===0)){if(gr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function fr(r,e,t,i,n,s,o){if(r){!o&&s&&dy(r,i,n,s);for(var a=r,l,h;r.prev!==r.next;){if(l=r.prev,h=r.next,s?ny(r,i,n,s):iy(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(h.i/t|0),gr(r),r=h.next,a=h.next;continue}if(r=h,r===a){o?o===1?(r=sy(ft(r),e,t),fr(r,e,t,i,n,s,2)):o===2&&oy(r,e,t,i,n,s):fr(ft(r),e,t,i,n,s,1);break}}}}function iy(r){var e=r.prev,t=r,i=r.next;if(Z(e,t,i)>=0)return!1;for(var n=e.x,s=t.x,o=i.x,a=e.y,l=t.y,h=i.y,u=n<s?n<o?n:o:s<o?s:o,c=a<l?a<h?a:h:l<h?l:h,p=n>s?n>o?n:o:s>o?s:o,d=a>l?a>h?a:h:l>h?l:h,f=i.next;f!==e;){if(f.x>=u&&f.x<=p&&f.y>=c&&f.y<=d&&Bt(n,a,s,l,o,h,f.x,f.y)&&Z(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function ny(r,e,t,i){var n=r.prev,s=r,o=r.next;if(Z(n,s,o)>=0)return!1;for(var a=n.x,l=s.x,h=o.x,u=n.y,c=s.y,p=o.y,d=a<l?a<h?a:h:l<h?l:h,f=u<c?u<p?u:p:c<p?c:p,g=a>l?a>h?a:h:l>h?l:h,m=u>c?u>p?u:p:c>p?c:p,x=As(d,f,e,t,i),b=As(g,m,e,t,i),v=r.prevZ,_=r.nextZ;v&&v.z>=x&&_&&_.z<=b;){if(v.x>=d&&v.x<=g&&v.y>=f&&v.y<=m&&v!==n&&v!==o&&Bt(a,u,l,c,h,p,v.x,v.y)&&Z(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=d&&_.x<=g&&_.y>=f&&_.y<=m&&_!==n&&_!==o&&Bt(a,u,l,c,h,p,_.x,_.y)&&Z(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=x;){if(v.x>=d&&v.x<=g&&v.y>=f&&v.y<=m&&v!==n&&v!==o&&Bt(a,u,l,c,h,p,v.x,v.y)&&Z(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=b;){if(_.x>=d&&_.x<=g&&_.y>=f&&_.y<=m&&_!==n&&_!==o&&Bt(a,u,l,c,h,p,_.x,_.y)&&Z(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function sy(r,e,t){var i=r;do{var n=i.prev,s=i.next.next;!ci(n,s)&&jc(n,i,i.next,s)&&mr(n,s)&&mr(s,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(s.i/t|0),gr(i),gr(i.next),i=r=s),i=i.next}while(i!==r);return ft(i)}function oy(r,e,t,i,n,s){var o=r;do{for(var a=o.next.next;a!==o.prev;){if(o.i!==a.i&&my(o,a)){var l=Wc(o,a);o=ft(o,o.next),l=ft(l,l.next),fr(o,e,t,i,n,s,0),fr(l,e,t,i,n,s,0);return}a=a.next}o=o.next}while(o!==r)}function ay(r,e,t,i){var n=[],s,o,a,l,h;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:r.length,h=Hc(r,a,l,i,!1),h===h.next&&(h.steiner=!0),n.push(fy(h));for(n.sort(ly),s=0;s<n.length;s++)t=hy(n[s],t);return t}function ly(r,e){return r.x-e.x}function hy(r,e){var t=uy(r,e);if(!t)return e;var i=Wc(t,r);return ft(i,i.next),ft(t,t.next)}function uy(r,e){var t=e,i=r.x,n=r.y,s=-1/0,o;do{if(n<=t.y&&n>=t.next.y&&t.next.y!==t.y){var a=t.x+(n-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=i&&a>s&&(s=a,o=t.x<t.next.x?t:t.next,a===i))return o}t=t.next}while(t!==e);if(!o)return null;var l=o,h=o.x,u=o.y,c=1/0,p;t=o;do i>=t.x&&t.x>=h&&i!==t.x&&Bt(n<u?i:s,n,h,u,n<u?s:i,n,t.x,t.y)&&(p=Math.abs(n-t.y)/(i-t.x),mr(t,r)&&(p<c||p===c&&(t.x>o.x||t.x===o.x&&cy(o,t)))&&(o=t,c=p)),t=t.next;while(t!==l);return o}function cy(r,e){return Z(r.prev,r,e.prev)<0&&Z(e.next,r,r.next)<0}function dy(r,e,t,i){var n=r;do n.z===0&&(n.z=As(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==r);n.prevZ.nextZ=null,n.prevZ=null,py(n)}function py(r){var e,t,i,n,s,o,a,l,h=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,i=t,a=0,e=0;e<h&&(a++,i=i.nextZ,!!i);e++);for(l=h;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,a--):(n=i,i=i.nextZ,l--),s?s.nextZ=n:r=n,n.prevZ=s,s=n;t=i}s.nextZ=null,h*=2}while(o>1);return r}function As(r,e,t,i,n){return r=(r-t)*n|0,e=(e-i)*n|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function fy(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Bt(r,e,t,i,n,s,o,a){return(n-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(n-o)*(i-a)}function my(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!gy(r,e)&&(mr(r,e)&&mr(e,r)&&by(r,e)&&(Z(r.prev,r,e.prev)||Z(r,e.prev,e))||ci(r,e)&&Z(r.prev,r,r.next)>0&&Z(e.prev,e,e.next)>0)}function Z(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ci(r,e){return r.x===e.x&&r.y===e.y}function jc(r,e,t,i){var n=pi(Z(r,e,t)),s=pi(Z(r,e,i)),o=pi(Z(t,i,r)),a=pi(Z(t,i,e));return!!(n!==s&&o!==a||n===0&&di(r,t,e)||s===0&&di(r,i,e)||o===0&&di(t,r,i)||a===0&&di(t,e,i))}function di(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function pi(r){return r>0?1:r<0?-1:0}function gy(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&jc(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function mr(r,e){return Z(r.prev,r,r.next)<0?Z(r,e,r.next)>=0&&Z(r,r.prev,e)>=0:Z(r,e,r.prev)<0||Z(r,r.next,e)<0}function by(r,e){var t=r,i=!1,n=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&n<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==r);return i}function Wc(r,e){var t=new Es(r.i,r.x,r.y),i=new Es(e.i,e.x,e.y),n=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=n,n.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Vc(r,e,t,i){var n=new Es(r,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function gr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Es(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}ui.deviation=function(r,e,t,i){var n=e&&e.length,s=n?e[0]*t:r.length,o=Math.abs(Cs(r,0,s,t));if(n)for(var a=0,l=e.length;a<l;a++){var h=e[a]*t,u=a<l-1?e[a+1]*t:r.length;o-=Math.abs(Cs(r,h,u,t))}var c=0;for(a=0;a<i.length;a+=3){var p=i[a]*t,d=i[a+1]*t,f=i[a+2]*t;c+=Math.abs((r[p]-r[f])*(r[d+1]-r[p+1])-(r[p]-r[d])*(r[f+1]-r[p+1]))}return o===0&&c===0?0:Math.abs((c-o)/o)};function Cs(r,e,t,i){for(var n=0,s=e,o=t-i;s<t;s+=i)n+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return n}ui.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},i=0,n=0;n<r.length;n++){for(var s=0;s<r[n].length;s++)for(var o=0;o<e;o++)t.vertices.push(r[n][s][o]);n>0&&(i+=r[n-1].length,t.holes.push(i))}return t},Ps.default=ry;function Ms(r,e,t,i,n,s,o){const a=Ps(r,e,2);if(!a)return;for(let h=0;h<a.length;h+=3)s[o++]=a[h]+n,s[o++]=a[h+1]+n,s[o++]=a[h+2]+n;let l=n*i;for(let h=0;h<r.length;h+=2)t[l]=r[h],t[l+1]=r[h+1],l+=i}const vy=[],Bs={build(r,e){for(let t=0;t<r.points.length;t++)e[t]=r.points[t];return e},triangulate(r,e,t,i,n,s){Ms(r,vy,e,t,i,n,s)}},Rs={build(r,e){const t=r,i=t.x,n=t.y,s=t.width,o=t.height;return s>=0&&o>=0&&(e[0]=i,e[1]=n,e[2]=i+s,e[3]=n,e[4]=i+s,e[5]=n+o,e[6]=i,e[7]=n+o),e},triangulate(r,e,t,i,n,s){let o=0;i*=t,e[i+o]=r[0],e[i+o+1]=r[1],o+=t,e[i+o]=r[2],e[i+o+1]=r[3],o+=t,e[i+o]=r[6],e[i+o+1]=r[7],o+=t,e[i+o]=r[4],e[i+o+1]=r[5],o+=t;const a=i/t;n[s++]=a,n[s++]=a+1,n[s++]=a+2,n[s++]=a+1,n[s++]=a+3,n[s++]=a+2}},ks={build(r,e){return e[0]=r.x,e[1]=r.y,e[2]=r.x2,e[3]=r.y2,e[4]=r.x3,e[5]=r.y3,e},triangulate(r,e,t,i,n,s){let o=0;i*=t,e[i+o]=r[0],e[i+o+1]=r[1],o+=t,e[i+o]=r[2],e[i+o+1]=r[3],o+=t,e[i+o]=r[4],e[i+o+1]=r[5];const a=i/t;n[s++]=a,n[s++]=a+1,n[s++]=a+2}};class Fs{constructor(e){this.uid=Y("graphicsView"),this.canBundle=!0,this.owner=_t,this.renderPipeId="graphics",this._context=e||new He,this._context.on("update",this.onGraphicsContextUpdate,this)}set context(e){e!==this._context&&(this._context.off("update",this.onGraphicsContextUpdate,this),this._context=e,this._context.on("update",this.onGraphicsContextUpdate,this),this.onGraphicsContextUpdate())}get context(){return this._context}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onGraphicsContextUpdate(){this._didUpdate=!0,this.owner.onViewUpdate()}destroy(e=!1){this.owner=null,(typeof e=="boolean"?e:e!=null&&e.context)&&this._context.destroy(e),this._context=null}}var yy=Object.defineProperty,Yc=Object.getOwnPropertySymbols,xy=Object.prototype.hasOwnProperty,_y=Object.prototype.propertyIsEnumerable,Xc=(r,e,t)=>e in r?yy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wy=(r,e)=>{for(var t in e||(e={}))xy.call(e,t)&&Xc(r,t,e[t]);if(Yc)for(var t of Yc(e))_y.call(e,t)&&Xc(r,t,e[t]);return r};class Ty extends q{constructor(e){e instanceof He&&(e={context:e}),super(wy({view:new Fs(e==null?void 0:e.context),label:"Graphics"},e)),this.allowChildren=!1}get context(){return this.view.context}set context(e){this.view.context=e}_callContextMethod(e,t){return this.view.context[e](...t),this}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(...e){return this._callContextMethod("beginPath",e)}cut(...e){return this._callContextMethod("cut",e)}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(...e){return this._callContextMethod("closePath",e)}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(...e){return this._callContextMethod("save",e)}getTransform(...e){return this._callContextMethod("getTransform",e)}resetTransform(...e){return this._callContextMethod("resetTransform",e)}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(...e){return this._callContextMethod("clear",e)}get fillStyle(){return this.view.context.fillStyle}set fillStyle(e){this.view.context.fillStyle=e}get strokeStyle(){return this.view.context.strokeStyle}set strokeStyle(e){this.view.context.strokeStyle=e}beginFill(e,t){return O("8.0.0","Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.endFill(),this.context.fillStyle={color:e,alpha:t},this}endFill(){return O("8.0.0","Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill(),this}drawCircle(...e){return O("8.0.0","Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return O("8.0.0","Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return O("8.0.0","Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return O("8.0.0","Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return O("8.0.0","Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return O("8.0.0","Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}}function Os(r,e,t,i,n,s,o,a=null){let l=0;t*=e,n*=s;const h=a.a,u=a.b,c=a.c,p=a.d,d=a.tx,f=a.ty;for(;l<o;){const g=r[t],m=r[t+1];i[n]=h*g+c*m+d,i[n+1]=u*g+p*m+f,n+=s,t+=e,l++}}function Us(r,e,t,i){let n=0;for(e*=t;n<i;)r[e]=0,r[e+1]=0,e+=t,n++}function fi(r,e,t,i,n){const s=e.a,o=e.b,a=e.c,l=e.d,h=e.tx,u=e.ty;t=t||0,i=i||2,n=n||r.length/i-t;let c=t*i;for(let p=0;p<n;p++){const d=r[c],f=r[c+1];r[c]=s*d+a*f+h,r[c+1]=o*d+l*f+u,c+=i}}const Is={rectangle:Rs,polygon:Bs,triangle:ks,circle:dt,ellipse:dt,roundedRectangle:dt},Sy=new K;function qc(r){const e={vertices:[],uvs:[],indices:[]},t=[];for(let i=0;i<r.instructions.length;i++){const n=r.instructions[i];if(n.action==="texture")Py(n.data,t,e);else if(n.action==="fill"||n.action==="stroke"){const s=n.action==="stroke",o=n.data.path.shapePath,a=n.data.style,l=n.data.hole;s&&l&&Kc(l.shapePath,a,null,!0,t,e),Kc(o,a,l,s,t,e)}}return t}function Py(r,e,t){const{vertices:i,uvs:n,indices:s}=t,o=s.length,a=i.length/2,l=[],h=Is.rectangle,u=Sy,c=r.image;u.x=r.dx,u.y=r.dy,u.width=r.dw,u.height=r.dh;const p=r.transform;h.build(u,l),p&&fi(l,p),h.triangulate(l,i,2,a,s,o);const d=c.layout.uvs;n.push(d.x0,d.y0,d.x1,d.y1,d.x3,d.y3,d.x2,d.y2);const f=H.get(hi);f.indexOffset=o,f.indexSize=s.length-o,f.vertexOffset=a,f.vertexSize=i.length/2-a,f.color=r.style,f.alpha=r.alpha,f.texture=c,f.geometryData=t,e.push(f)}function Kc(r,e,t,i,n,s){const{vertices:o,uvs:a,indices:l}=s,h=r.shapePrimitives.length-1;r.shapePrimitives.forEach(({shape:u,transform:c},p)=>{var d;const f=l.length,g=o.length/2,m=[],x=Is[u.type];if(x.build(u,m),c&&fi(m,c),i){const S=(d=u.closePath)!=null?d:!0;Nc(m,e,!1,S,o,2,g,l,f)}else if(t&&h===p){h!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const S=[],k=m.slice();Ay(t.shapePath).forEach(M=>{S.push(k.length/2),k.push(...M)}),Ms(k,S,o,2,g,l,f)}else x.triangulate(m,o,2,g,l,f);const b=a.length/2,v=e.texture;if(v!==P.WHITE){const S=e.matrix;c&&S.append(c.clone().invert()),Os(o,2,g,a,b,2,o.length/2-g,S)}else Us(a,b,2,o.length/2-g);const _=H.get(hi);_.indexOffset=f,_.indexSize=l.length-f,_.vertexOffset=g,_.vertexSize=o.length/2-g,_.color=e.color,_.alpha=e.alpha,_.texture=v,_.geometryData=s,n.push(_)})}function Ay(r){if(!r)return[];const e=r.shapePrimitives,t=[];for(let i=0;i<e.length;i++){const n=e[i].shape,s=[];Is[n.type].build(n,s),t.push(s)}return t}class Zc{}class Qc{constructor(){this.geometry=new Pc,this.instructions=new Pn}init(){this.geometry.reset(),this.instructions.reset()}}class Gs{constructor(){this._activeBatchers=[],this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),this._needsContextNeedsRebuild=[]}prerender(){this._returnActiveBatchers()}getContextRenderData(e){return this._graphicsDataContextHash[e.uid]||this._initContextRenderData(e)}updateGpuContext(e){let t=this._gpuContextHash[e.uid]||this._initContext(e);if(e.dirty){t?this._cleanGraphicsContextData(e):t=this._initContext(e);const i=qc(e);let n=0;const s=e.batchMode;let o=!0;if(e.customShader||s==="no-batch")o=!1;else if(s==="auto"){for(let a=0;a<i.length;a++)if(n+=i[a].vertexSize,n>400){o=!1;break}}t=this._gpuContextHash[e.uid]={isBatchable:o,batches:i},e.dirty=!1}return t}getGpuContext(e){return this._gpuContextHash[e.uid]||this._initContext(e)}_returnActiveBatchers(){for(let e=0;e<this._activeBatchers.length;e++)H.return(this._activeBatchers[e]);this._activeBatchers.length=0}_initContextRenderData(e){const t=H.get(Qc),i=this._gpuContextHash[e.uid].batches;let n=0,s=0;i.forEach(h=>{h.applyTransform=!1,n+=h.geometryData.vertices.length,s+=h.geometryData.indices.length});const o=H.get(ms);this._activeBatchers.push(o),o.ensureAttributeBuffer(n),o.ensureIndexBuffer(s),o.begin();for(let h=0;h<i.length;h++){const u=i[h];o.add(u)}o.finish(t.instructions);const a=t.geometry;a.indexBuffer.data=o.indexBuffer,a.buffers[0].data=o.attributeBuffer.float32View,a.indexBuffer.update(o.indexSize*4),a.buffers[0].update(o.attributeSize*4);const l=o.batches;for(let h=0;h<l.length;h++){const u=l[h];u.bindGroup=ni(u.textures.textures,u.textures.count)}return this._graphicsDataContextHash[e.uid]=t,t}_initContext(e){const t=new Zc;return this._gpuContextHash[e.uid]=t,e.on("update",this.onGraphicsContextUpdate,this),e.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]}onGraphicsContextUpdate(e){this._needsContextNeedsRebuild.push(e)}onGraphicsContextDestroy(e){this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null}_cleanGraphicsContextData(e){const t=this._gpuContextHash[e.uid];t.isBatchable||this._graphicsDataContextHash[e.uid]&&(H.return(this.getContextRenderData(e)),this._graphicsDataContextHash[e.uid]=null),t.batches&&t.batches.forEach(i=>{H.return(i)})}destroy(){for(const e of this._needsContextNeedsRebuild)this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null;this._needsContextNeedsRebuild.length=0}}Gs.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"graphicsContext"};class $s{constructor(e,t){this.state=Se.for2d(),this._renderableBatchesHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=e.view.context,i=!!this._renderableBatchesHash[e.uid],n=this.renderer.graphicsContext.updateGpuContext(t);return!!(n.isBatchable||i!==n.isBatchable)}addRenderable(e,t){const i=this.renderer.graphicsContext.updateGpuContext(e.view.context);e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e)),i.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add({type:"graphics",renderable:e}))}updateRenderable(e){const t=this._renderableBatchesHash[e.uid];if(t)for(let i=0;i<t.length;i++){const n=t[i];n.batcher.updateElement(n)}}destroyRenderable(e){this._removeBatchForRenderable(e.uid)}execute({renderable:e}){e.isRenderable&&this._adaptor.execute(this,e)}_rebuild(e){const t=!!this._renderableBatchesHash[e.uid],i=this.renderer.graphicsContext.updateGpuContext(e.view.context);t&&this._removeBatchForRenderable(e.uid),i.isBatchable&&this._initBatchesForRenderable(e),e.view.batched=i.isBatchable}_addToBatcher(e,t){const i=this.renderer.renderPipes.batch,n=this._getBatchesForRenderable(e);for(let s=0;s<n.length;s++){const o=n[s];i.addToBatch(o,t)}}_getBatchesForRenderable(e){return this._renderableBatchesHash[e.uid]||this._initBatchesForRenderable(e)}_initBatchesForRenderable(e){const t=e.view.context,i=this.renderer.graphicsContext.getGpuContext(t).batches.map(n=>{const s=H.get(hi);return n.copyTo(s),s.renderable=e,s});return this._renderableBatchesHash[e.uid]=i,e.on("destroyed",()=>{this.destroyRenderable(e)}),i}_removeBatchForRenderable(e){this._renderableBatchesHash[e].forEach(t=>{H.return(t)}),this._renderableBatchesHash[e]=null}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null;for(const e in this._renderableBatchesHash)this._removeBatchForRenderable(e);this._renderableBatchesHash=null}}$s.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"graphics"};const Ey={rectangle:Rs,polygon:Bs,triangle:ks,circle:dt,ellipse:dt,roundedRectangle:dt};function Cy(r){const e=[],t=[],i=[],n=r.path.shapePath,s=r.textureMatrix;n.shapePrimitives.forEach(({shape:a,transform:l})=>{const h=i.length,u=e.length/2,c=[],p=Ey[a.type];p.build(a,c),l&&fi(c,l),p.triangulate(c,e,2,u,i,h);const d=t.length/2;s?(l&&s.append(l.clone().invert()),Os(e,2,u,t,d,2,e.length/2-u,s)):Us(t,d,2,e.length/2-u)});const o=r.out;return o?(o.positions=new Float32Array(e),o.uvs=new Float32Array(t),o.indices=new Uint32Array(i),o):new Pt({positions:new Float32Array(e),uvs:new Float32Array(t),indices:new Uint32Array(i)})}function My(r){const e=r.split(/([\n{}])/g).map(i=>i.trim()).filter(i=>i.length);let t="";return e.map(i=>{let n=t+i;return i==="{"?t+="    ":i==="}"&&(t=t.substr(0,t.length-4),n=t+i),n}).join(`
`)}const By={name:"texture-bit",fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;

         
        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},Ls={name:"texture-bit",fragment:{header:`
        uniform sampler2D uTexture;

         
        `,main:`
            outColor = texture(uTexture, vUV);
        `}};class Jc extends ue{constructor({original:e,view:t}){super(),this.uid=Y("renderable"),this.view=t,this._original=e,this.layerTransform=new R,this.layerColor=4294967295,this.layerVisibleRenderable=3,this.view.owner=this}get layerBlendMode(){return this._original.layerBlendMode}onViewUpdate(){this.didViewUpdate=!0,this._original.layerGroup.onChildViewUpdate(this)}get isRenderable(){return this._original.isRenderable}}function ed(r,e){const t=r.root,i=r.instructionSet;i.reset(),e.batch.buildStart(i),e.blendMode.buildStart(),e.colorMask.buildStart(),t.sortableChildren&&t.sortChildren(),td(t,i,e,!0),e.batch.buildEnd(i),e.blendMode.buildEnd(i)}function br(r,e,t){r.layerVisibleRenderable<3||!r.includeInBuild||(r.sortableChildren&&r.sortChildren(),r.isSimple?Ry(r,e,t):td(r,e,t,!1))}function Ry(r,e,t){const i=r.view;if(i&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[i.renderPipeId].addRenderable(r,e)),!r.isLayerRoot){const n=r.children,s=n.length;for(let o=0;o<s;o++)br(n[o],e,t)}}function td(r,e,t,i){var n;if(i){const s=r.layerGroup;if(s.root.view){const o=(n=s.proxyRenderable)!=null?n:ky(s);o&&(t.blendMode.setBlendMode(o,o.layerBlendMode,e),t[o.view.renderPipeId].addRenderable(o,e))}}else for(let s=0;s<r.effects.length;s++){const o=r.effects[s];t[o.pipe].push(o,r,e)}if(!i&&r.isLayerRoot)t.layer.addLayerGroup(r.layerGroup,e);else{const s=r.view;s&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[s.renderPipeId].addRenderable(r,e));const o=r.children;if(o.length)for(let a=0;a<o.length;a++)br(o[a],e,t)}if(!i)for(let s=r.effects.length-1;s>=0;s--){const o=r.effects[s];t[o.pipe].pop(o,r,e)}}function ky(r){const e=r.root;r.proxyRenderable=new Jc({original:e,view:e.view})}const Fy=new ce;class Oy extends jr{constructor(){super({filters:[new Ic({sprite:new Fe(P.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class Ds{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,i){const n=this._renderer;if(n.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:t}),e.renderMaskToTexture){const s=e.mask;s.includeInBuild=!0,br(s,i,n.renderPipes),s.includeInBuild=!1}n.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,canBundle:!1})}pop(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const t=this._renderer,i=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const n=H.get(Oy);if(i){e.mask.mask.measurable=!0;const s=Xt(e.mask.mask,!0,Fy);e.mask.mask.measurable=!1,s.ceil();const o=le.getOptimalTexture(s.width,s.height,1,!1),a=t.renderTarget.push(o,!0);t.globalUniforms.push({projectionMatrix:a.projectionMatrix,offset:s,worldColor:4294967295});const l=n.sprite;l.texture=o,l.worldTransform.tx=s.minX,l.worldTransform.ty=s.minY,this._activeMaskStage.push({filterEffect:n,maskedContainer:e.maskedContainer,filterTexture:o})}else n.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:n,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const n=this._activeMaskStage[this._activeMaskStage.length-1];i&&(t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({type:"filter",action:"pushFilter",container:n.maskedContainer,filterEffect:n.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const n=this._activeMaskStage.pop();i&&le.returnTexture(n.filterTexture),H.return(n.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}Ds.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"alphaMask"};class zs{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;n[this._colorStackIndex]=n[this._colorStackIndex-1]&e.mask;const s=this._colorStack[this._colorStackIndex];s!==this._currentColor&&(this._currentColor=s,i.add({type:"colorMask",colorMask:s,canBundle:!1})),this._colorStackIndex++}pop(e,t,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;this._colorStackIndex--;const s=n[this._colorStackIndex-1];s!==this._currentColor&&(this._currentColor=s,i.add({type:"colorMask",colorMask:s,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}zs.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"colorMask"};class Uy{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1}addBounds(e,t){qr(this.mask,e,t)}addLocalBounds(e,t){Kr(this.mask,e,t)}containsPoint(e,t){const i=this.mask;return t(i,e)}reset(){this.mask.measurable=!0,this.mask=null}destroy(){this.reset()}}var be=(r=>(r[r.NONE=0]="NONE",r[r.COLOR=16384]="COLOR",r[r.STENCIL=1024]="STENCIL",r[r.DEPTH=256]="DEPTH",r[r.COLOR_DEPTH=16640]="COLOR_DEPTH",r[r.COLOR_STENCIL=17408]="COLOR_STENCIL",r[r.DEPTH_STENCIL=1280]="DEPTH_STENCIL",r[r.ALL=17664]="ALL",r))(be||{}),ne=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(ne||{});class Ns{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,i){const n=e,s=this._renderer;s.renderPipes.batch.break(i),s.renderPipes.blendMode.setBlendMode(n.mask,"none",i),i.add({type:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const o=n.mask;o.includeInBuild=!0,this._maskHash.has(n)||this._maskHash.set(n,{instructionsStart:0,instructionsLength:0});const a=this._maskHash.get(n);a.instructionsStart=i.instructionSize,br(o,i,s.renderPipes),o.includeInBuild=!1,s.renderPipes.batch.break(i),i.add({type:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const l=i.instructionSize-a.instructionsStart-1;a.instructionsLength=l;const h=s.renderTarget.renderTarget.uid;this._maskStackHash[h]===void 0&&(this._maskStackHash[h]=0),this._maskStackHash[h]++}pop(e,t,i){const n=e,s=this._renderer,o=s.renderTarget.renderTarget.uid;this._maskStackHash[o]--,s.renderPipes.batch.break(i),s.renderPipes.blendMode.setBlendMode(n.mask,"none",i),i.add({type:"stencilMask",action:"popMaskBegin",canBundle:!1});const a=this._maskHash.get(e);if(this._maskStackHash[o]!==0)for(let l=0;l<a.instructionsLength;l++)i.instructions[i.instructionSize++]=i.instructions[a.instructionsStart++];i.add({type:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;const i=this._renderer,n=i.renderTarget.renderTarget.uid;let s=(t=this._maskStackHash[n])!=null?t:0;e.action==="pushMaskBegin"?(s++,i.stencil.setStencilMode(ne.RENDERING_MASK_ADD,s),i.colorMask.setMask(0)):e.action==="pushMaskEnd"?(i.stencil.setStencilMode(ne.MASK_ACTIVE,s),i.colorMask.setMask(15)):e.action==="popMaskBegin"?(s--,s!==0?(i.stencil.setStencilMode(ne.RENDERING_MASK_REMOVE,s),i.colorMask.setMask(0)):i.renderTarget.clear(be.STENCIL)):e.action==="popMaskEnd"&&(s===0?i.stencil.setStencilMode(ne.DISABLED,s):i.stencil.setStencilMode(ne.MASK_ACTIVE,s),i.colorMask.setMask(15)),this._maskStackHash[n]=s}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}Ns.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"stencilMask"};class Hs{init(){const e=Et({name:"mesh",bits:[Mt,Ls]});this._shader=new Ee({glProgram:e,resources:{uTexture:P.EMPTY.source}}),this._shader.addResource("globalUniforms",0,0),this._shader.addResource("localUniforms",1,0)}execute(e,t){const i=e.renderer,n=t.view,s=n.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.uTransformMatrix=t.layerTransform,o.update(),pr(t.layerColor,o.uniforms.uColor,0);let a=n._shader;if(!a){a=this._shader;const l=n.texture.source;a.resources.uTexture=l,a.resources.uSampler=l.style}a.groups[0]=i.globalUniforms.bindGroup,a.groups[1]=e.localUniformsBindGroup,i.encoder.draw({geometry:n._geometry,shader:a,state:s})}destroy(){this._shader.destroy(!0),this._shader=null}}Hs.extension={type:[y.WebGLPipesAdaptor],name:"mesh"};class js{init(){const e=At({name:"mesh",bits:[Mt,Ls]});this._shader=new Ee({gpuProgram:e,resources:{uTexture:P.EMPTY._source,uSampler:P.EMPTY._source.style}})}execute(e,t){const i=e.renderer,n=t.view,s=n.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.uTransformMatrix=t.layerTransform,o.update(),pr(t.layerColor,o.uniforms.uColor,0);let a=n._shader;a||(a=this._shader,a.groups[2]=i.texture.getTextureBindGroup(n.texture)),a.groups[0]=i.globalUniforms.bindGroup,a.groups[1]=i.renderPipes.uniformBatch.getUniformBindGroup(o,!0),i.encoder.draw({geometry:n._geometry,shader:a,state:s})}destroy(){this._shader.destroy(!0),this._shader=null}}js.extension={type:[y.WebGPUPipesAdaptor],name:"mesh"};class rd{constructor(){this.batcher=null,this.batch=null}get blendMode(){return this.renderable.layerBlendMode}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null}packIndex(e,t,i){const n=this.renderable.view.geometry.indices;for(let s=0;s<n.length;s++)e[t++]=n[s]+i}packAttributes(e,t,i,n){const s=this.renderable,o=this.renderable.view.geometry,a=s.layerTransform,l=a.a,h=a.b,u=a.c,c=a.d,p=a.tx,d=a.ty,f=o.positions,g=o.uvs,m=s.layerColor;for(let x=0;x<f.length;x+=2){const b=f[x],v=f[x+1];e[i++]=l*b+u*v+p,e[i++]=h*b+c*v+d,e[i++]=g[x],e[i++]=g[x+1],t[i++]=m,e[i++]=n}}get vertexSize(){return this.renderable.view.geometry.positions.length/2}get indexSize(){return this.renderable.view.geometry.indices.length}}function Iy(r,e){const{frameWidth:t,frameHeight:i}=r;return e.scale(1/t,1/i),e}var Gy=Object.defineProperty,id=Object.getOwnPropertySymbols,$y=Object.prototype.hasOwnProperty,Ly=Object.prototype.propertyIsEnumerable,nd=(r,e,t)=>e in r?Gy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Dy=(r,e)=>{for(var t in e||(e={}))$y.call(e,t)&&nd(r,t,e[t]);if(id)for(var t of id(e))Ly.call(e,t)&&nd(r,t,e[t]);return r};class zy extends q{constructor(...e){let t=e[0];t instanceof Pt&&(O(z,"Mesh: use new Mesh({ geometry, shader }) instead"),t={geometry:t,shader:e[1]},e[3]&&(O(z,"Mesh: topology argument has been removed, use geometry.topology instead"),t.geometry.topology=e[3])),super(Dy({view:new cr(t),label:"Mesh"},t)),this.allowChildren=!1}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get geometry(){return this.view.geometry}set geometry(e){this.view.geometry=e}get material(){return O(z,"mesh.material property has been removed, use mesh.shader instead"),this.view.shader}get shader(){return this.view.shader}}class Ws{constructor(e,t){this.localUniforms=new te({uTransformMatrix:{value:new R,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"}}),this.localUniformsBindGroup=new Ae({0:this.localUniforms}),this._renderableHash=Object.create(null),this._gpuBatchableMeshHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getRenderableData(e),i=t.batched,n=e.view.batched;if(t.batched=n,i!==n)return!0;if(n){const s=e.view._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const o=this._getBatchableMesh(e),a=e.view.texture;if(o.texture._source!==a._source&&o.texture._source!==a._source)return o.batcher.checkAndUpdateTexture(o,a)}return!1}addRenderable(e,t){const i=this.renderer.renderPipes.batch,{batched:n}=this._getRenderableData(e);if(n){const s=this._getBatchableMesh(e);s.texture=e.view._texture,i.addToBatch(s)}else i.break(t),t.add({type:"mesh",renderable:e})}updateRenderable(e){if(e.view.batched){const t=this._gpuBatchableMeshHash[e.uid];t.texture=e.view._texture,t.batcher.updateElement(t)}}destroyRenderable(e){this._renderableHash[e.uid]=null;const t=this._gpuBatchableMeshHash[e.uid];H.return(t),this._gpuBatchableMeshHash[e.uid]=null}execute({renderable:e}){e.isRenderable&&this._adaptor.execute(this,e)}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t=e.view;return this._renderableHash[e.uid]={batched:t.batched,indexSize:t._geometry.indices.length,vertexSize:t._geometry.positions.length},e.on("destroyed",()=>{this.destroyRenderable(e)}),this._renderableHash[e.uid]}_getBatchableMesh(e){return this._gpuBatchableMeshHash[e.uid]||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=H.get(rd);return t.renderable=e,t.texture=e.view._texture,this._gpuBatchableMeshHash[e.uid]=t,t.renderable=e,t}destroy(){for(const e in this._gpuBatchableMeshHash)this._gpuBatchableMeshHash[e]&&H.return(this._gpuBatchableMeshHash[e]);this._gpuBatchableMeshHash=null,this._renderableHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Ws.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"mesh"};var vr=(r=>(r[r.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",r[r.ARRAY_BUFFER=34962]="ARRAY_BUFFER",r[r.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",r))(vr||{});class sd{constructor(e,t){this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.type=t}}class Vs{constructor(e){this._gpuBuffers=Object.create(null),this._boundBufferBases=Object.create(null),this._renderer=e}destroy(){const e=this;this.destroyAll(!0),this._renderer=null,this._gl=null,this._gpuBuffers=null,e._boundBufferBases=null}contextChange(){this.destroyAll(!0),this._gl=this._renderer.gl}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{_gl:t}=this,i=this.getGlBuffer(e);t.bindBuffer(i.type,i.buffer)}bindBufferBase(e,t){const{_gl:i}=this;if(this._boundBufferBases[t]!==e){const n=this.getGlBuffer(e);this._boundBufferBases[t]=e,i.bindBufferBase(i.UNIFORM_BUFFER,t,n.buffer)}}bindBufferRange(e,t,i){const{_gl:n}=this;i=i||0;const s=this.getGlBuffer(e);n.bindBufferRange(n.UNIFORM_BUFFER,t||0,s.buffer,i*256,256)}updateBuffer(e){const{_gl:t}=this,i=this.getGlBuffer(e);if(e._updateID===i.updateID)return i;if(i.updateID=e._updateID,t.bindBuffer(i.type,i.buffer),i.byteLength>=e.data.byteLength)t.bufferSubData(i.type,0,e.data,0,e._updateSize/4);else{const n=e.descriptor.usage&$.STATIC?t.STATIC_DRAW:t.DYNAMIC_DRAW;i.byteLength=e.data.byteLength,t.bufferData(i.type,e.data,n)}return i}destroyAll(e){const t=this._gl;if(!e)for(const i in this._gpuBuffers)t.deleteBuffer(this._gpuBuffers[i].buffer);this._gpuBuffers={}}onBufferDestroy(e,t){const i=this._gpuBuffers[e.uid],n=this._gl;t||n.deleteBuffer(i.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{_gl:t}=this;let i=vr.ARRAY_BUFFER;e.descriptor.usage&$.INDEX?i=vr.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&$.UNIFORM&&(i=vr.UNIFORM_BUFFER);const n=new sd(t.createBuffer(),i);return this._gpuBuffers[e.uid]=n,e.on("destroy",this.onBufferDestroy,this),n}}Vs.extension={type:[y.WebGLSystem],name:"buffer"};class mi{constructor(e){this._renderer=e,this.webGLVersion=1,this.extensions=Object.create(null),this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this._renderer.gl=e,e.isContextLost()&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").restoreContext()}init(e){var t;if(e!=null&&e.context)this.initFromContext(e.context);else{const i=this._renderer.background.alpha<1,n=(t=e.premultipliedAlpha)!=null?t:!0,s=e.antialias&&!this._renderer.backBuffer.useBackBuffer;this.initFromOptions({alpha:i,premultipliedAlpha:n,antialias:s,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference})}}initFromContext(e){this.gl=e,this.validateContext(e),this._renderer.runners.contextChange.emit(e);const t=this._renderer.view.element;t.addEventListener("webglcontextlost",this.handleContextLost,!1),t.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}initFromOptions(e){const t=this.createContext(this._renderer.view.element,e);this.initFromContext(t)}createContext(e,t){const i=e.getContext("webgl2",t);return this.webGLVersion=2,this.gl=i,this.getExtensions(),this.gl}getExtensions(){const{gl:e}=this,t={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc")};Object.assign(this.extensions,t,{colorBufferFloat:e.getExtension("EXT_color_buffer_float")})}handleContextLost(e){e.preventDefault()}handleContextRestored(){this._renderer.runners.contextChange.emit(this.gl)}destroy(){const e=this._renderer.view.element;this._renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}validateContext(e){const t=e.getContextAttributes(),i="WebGL2RenderingContext"in globalThis&&e instanceof globalThis.WebGL2RenderingContext;i&&(this.webGLVersion=2),t&&t.stencil;const n=i||!!e.getExtension("OES_element_index_uint");this.supports.uint32Indices=n}}mi.extension={type:[y.WebGLSystem],name:"context"},mi.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"default"};var gi=(r=>(r[r.RGBA=6408]="RGBA",r[r.RGB=6407]="RGB",r[r.RG=33319]="RG",r[r.RED=6403]="RED",r[r.RGBA_INTEGER=36249]="RGBA_INTEGER",r[r.RGB_INTEGER=36248]="RGB_INTEGER",r[r.RG_INTEGER=33320]="RG_INTEGER",r[r.RED_INTEGER=36244]="RED_INTEGER",r[r.ALPHA=6406]="ALPHA",r[r.LUMINANCE=6409]="LUMINANCE",r[r.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",r[r.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",r[r.DEPTH_STENCIL=34041]="DEPTH_STENCIL",r))(gi||{}),Ys=(r=>(r[r.TEXTURE_2D=3553]="TEXTURE_2D",r[r.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",r[r.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",r[r.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",r[r.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",r[r.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",r[r.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",r))(Ys||{}),od=(r=>(r[r.CLAMP=33071]="CLAMP",r[r.REPEAT=10497]="REPEAT",r[r.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",r))(od||{}),N=(r=>(r[r.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",r[r.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",r[r.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",r[r.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",r[r.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",r[r.UNSIGNED_INT=5125]="UNSIGNED_INT",r[r.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",r[r.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",r[r.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",r[r.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",r[r.BYTE=5120]="BYTE",r[r.SHORT=5122]="SHORT",r[r.INT=5124]="INT",r[r.FLOAT=5126]="FLOAT",r[r.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",r[r.HALF_FLOAT=36193]="HALF_FLOAT",r))(N||{});const ad={uint8x2:{type:N.UNSIGNED_BYTE,size:2,normalised:!1},uint8x4:{type:N.UNSIGNED_BYTE,size:4,normalised:!1},sint8x2:{type:N.BYTE,size:2,normalised:!1},sint8x4:{type:N.BYTE,size:4,normalised:!1},unorm8x2:{type:N.UNSIGNED_BYTE,size:2,normalised:!0},unorm8x4:{type:N.UNSIGNED_BYTE,size:4,normalised:!0},snorm8x2:{type:N.BYTE,size:2,normalised:!0},snorm8x4:{type:N.BYTE,size:4,normalised:!0},uint16x2:{type:N.UNSIGNED_SHORT,size:2,normalised:!1},uint16x4:{type:N.UNSIGNED_SHORT,size:4,normalised:!1},sint16x2:{type:N.SHORT,size:2,normalised:!1},sint16x4:{type:N.SHORT,size:4,normalised:!1},unorm16x2:{type:N.UNSIGNED_SHORT,size:2,normalised:!0},unorm16x4:{type:N.UNSIGNED_SHORT,size:4,normalised:!0},snorm16x2:{type:N.SHORT,size:2,normalised:!0},snorm16x4:{type:N.SHORT,size:4,normalised:!0},float16x2:{type:N.HALF_FLOAT,size:2,normalised:!1},float16x4:{type:N.HALF_FLOAT,size:4,normalised:!1},float32:{type:N.FLOAT,size:1,normalised:!1},float32x2:{type:N.FLOAT,size:2,normalised:!1},float32x3:{type:N.FLOAT,size:3,normalised:!1},float32x4:{type:N.FLOAT,size:4,normalised:!1},uint32:{type:N.UNSIGNED_INT,size:1,normalised:!1},uint32x2:{type:N.UNSIGNED_INT,size:2,normalised:!1},uint32x3:{type:N.UNSIGNED_INT,size:3,normalised:!1},uint32x4:{type:N.UNSIGNED_INT,size:4,normalised:!1},sint32:{type:N.INT,size:1,normalised:!1},sint32x2:{type:N.INT,size:2,normalised:!1},sint32x3:{type:N.INT,size:3,normalised:!1},sint32x4:{type:N.INT,size:4,normalised:!1}};function ld(r){var e;return(e=ad[r])!=null?e:ad.float32}const Xs={5126:4,5123:2,5121:1},Ny={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class qs{constructor(e){this._geometryVaoHash={},this._renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!0}contextChange(){this.gl=this._renderer.gl}bind(e,t){const i=this.gl;this._activeGeometry=e;const n=this.getVao(e,t);this._activeVao!==n&&(this._activeVao=n,i.bindVertexArray(n)),this.updateBuffers()}reset(){this.unbind()}updateBuffers(){const e=this._activeGeometry,t=this._renderer.buffer;for(let i=0;i<e.buffers.length;i++){const n=e.buffers[i];t.updateBuffer(n)}}checkCompatibility(e,t){const i=e.attributes,n=t.attributeData;for(const s in n)if(!i[s])throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`)}getSignature(e,t){const i=e.attributes,n=t.attributeData,s=["g",e.uid];for(const o in i)n[o]&&s.push(o,n[o].location);return s.join("-")}getVao(e,t){var i;return((i=this._geometryVaoHash[e.uid])==null?void 0:i[t.key])||this.initGeometryVao(e,t)}initGeometryVao(e,t,i=!0){const n=this._renderer.gl,s=this._renderer.buffer;this._renderer.shader.getProgramData(t),this.checkCompatibility(e,t);const o=this.getSignature(e,t);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]=Object.create(null),e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let l=a[o];if(l)return a[t.key]=l,l;const h=e.buffers,u=e.attributes,c={},p={};for(const d in h)c[d]=0,p[d]=0;for(const d in u)!u[d].size&&t.attributeData[d]?u[d].size=t.attributeData[d].size:u[d].size,c[u[d].buffer.uid]+=u[d].size*Xs[u[d].type];for(const d in u){const f=u[d],g=f.size;f.stride===void 0&&(c[f.buffer.uid]===g*Xs[f.type]?f.stride=0:f.stride=c[f.buffer.uid]),f.start===void 0&&(f.start=p[f.buffer.uid],p[f.buffer.uid]+=g*Xs[f.type])}l=n.createVertexArray(),n.bindVertexArray(l);for(let d=0;d<h.length;d++){const f=h[d];s.bind(f)}return this.activateVao(e,t),a[t.key]=l,a[o]=l,n.bindVertexArray(null),l}onGeometryDestroy(e,t){const i=this._geometryVaoHash[e.uid],n=this.gl;if(i){if(t)for(const s in i)this._activeVao!==i[s]&&this.unbind(),n.deleteVertexArray(i[s]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const t=this.gl;for(const i in this._geometryVaoHash){if(e)for(const n in this._geometryVaoHash[i]){const s=this._geometryVaoHash[i];this._activeVao!==s&&this.unbind(),t.deleteVertexArray(s[n])}this._geometryVaoHash[i]=null}}activateVao(e,t){const i=this._renderer.gl,n=this._renderer.buffer,s=e.attributes;e.indexBuffer&&n.bind(e.indexBuffer);let o=null;for(const a in s){const l=s[a],h=l.buffer,u=n.getGlBuffer(h);if(t.attributeData[a]){o!==u&&(n.bind(h),o=u);const c=t.attributeData[a].location;i.enableVertexAttribArray(c);const p=ld(l.format);if(i.vertexAttribPointer(c,p.size,p.type,p.normalised,l.stride,l.offset),l.instance)if(this.hasInstance)i.vertexAttribDivisor(c,1);else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,t,i,n){const{gl:s}=this._renderer,o=this._activeGeometry,a=Ny[o.topology||e];if(o.indexBuffer){const l=o.indexBuffer.data.BYTES_PER_ELEMENT,h=l===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;o.instanced?s.drawElementsInstanced(a,t||o.indexBuffer.data.length,h,(i||0)*l,o.instanceCount||1):s.drawElements(a,t||o.indexBuffer.data.length,h,(i||0)*l)}else o.instanced?s.drawArraysInstanced(a,i,t||o.getSize(),n||1):s.drawArrays(a,i,t||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this._renderer=null,this.gl=null,this._activeVao=null,this._activeGeometry=null}}qs.extension={type:[y.WebGLSystem],name:"geometry"};var Hy=Object.defineProperty,hd=Object.getOwnPropertySymbols,jy=Object.prototype.hasOwnProperty,Wy=Object.prototype.propertyIsEnumerable,ud=(r,e,t)=>e in r?Hy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,cd=(r,e)=>{for(var t in e||(e={}))jy.call(e,t)&&ud(r,t,e[t]);if(hd)for(var t of hd(e))Wy.call(e,t)&&ud(r,t,e[t]);return r};const Vy=new we({vertex:`
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
        }`,name:"big-triangle"}),dd=new Ee({glProgram:Vy,resources:{uTexture:P.WHITE.source}}),pd=class{constructor(r){this.useBackBuffer=!1,this._useBackBufferThisRender=!1,this._renderer=r}init(r={}){const{useBackBuffer:e,antialias:t}=cd(cd({},pd.defaultOptions),r);this.useBackBuffer=e,this._antialias=t}renderStart({target:r,clear:e,clearColor:t}){if(this._useBackBufferThisRender=this.useBackBuffer&&!!r,this.useBackBuffer){const i=this._renderer.renderTarget.getRenderTarget(r);this._targetTexture=i.colorTexture,r=this._getBackBufferTexture(i.colorTexture)}t!=null||(t=this._renderer.background.colorRgba),this._renderer.renderTarget.start(r,e,t)}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){const r=this._renderer;if(r.renderTarget.finishRenderPass(),!this._useBackBufferThisRender)return;const e=r.gl;r.renderTarget.bind(this._targetTexture,!1),dd.resources.uTexture=this._backBufferTexture.source,r.shader.bind(dd,!1),r.state.set(Se.for2d()),e.drawArrays(e.TRIANGLES,0,3)}_getBackBufferTexture(r){const e=r.source;return this._backBufferTexture=this._backBufferTexture||new P({source:new he({width:e.width,height:e.height,resolution:e._resolution,antialias:this._antialias})}),this._backBufferTexture.source.resize(e.width,e.height,e._resolution),this._backBufferTexture}destroy(){this._backBufferTexture&&(this._backBufferTexture.destroy(),this._backBufferTexture=null)}};let bi=pd;bi.extension={type:[y.WebGLSystem],name:"backBuffer"},bi.defaultOptions={useBackBuffer:!1};class Ks{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}}Ks.extension={type:[y.WebGLSystem],name:"colorMask"};class Zs{constructor(e){this.commandFinished=Promise.resolve(),this._renderer=e}setGeometry(e,t){this._renderer.geometry.bind(e,t.glProgram)}finishRenderPass(){}draw(e){const t=this._renderer,{geometry:i,shader:n,state:s,skipSync:o,topology:a,size:l,start:h,instanceCount:u}=e;t.shader.bind(n,o),t.geometry.bind(i,t.shader.activeProgram),s&&t.state.set(s),t.geometry.draw(a,l,h,u)}destroy(){const e=this;e._renderer=null}}Zs.extension={type:[y.WebGLSystem],name:"encoder"};class fd{constructor(){this.width=-1,this.height=-1,this.msaaRenderBuffer=[],this.msaa=!1,this.dirtyId=-1}}function Qs(r){const e=r.colorTexture.source.resource;return e instanceof HTMLCanvasElement&&document.body.contains(e)}function md(r,e,t,i,n,s){const o=s?1:-1;return r.identity(),r.a=1/i*2,r.d=o*(1/n*2),r.tx=-1-e*r.a,r.ty=-o-t*r.d,r}var Yy=Object.defineProperty,gd=Object.getOwnPropertySymbols,Xy=Object.prototype.hasOwnProperty,qy=Object.prototype.propertyIsEnumerable,bd=(r,e,t)=>e in r?Yy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,vd=(r,e)=>{for(var t in e||(e={}))Xy.call(e,t)&&bd(r,t,e[t]);if(gd)for(var t of gd(e))qy.call(e,t)&&bd(r,t,e[t]);return r};const yd=class{constructor(r={}){if(this.uid=Y("renderTarget"),this.width=0,this.height=0,this.resolution=1,this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._projectionMatrix=new R,r=vd(vd({},yd.defaultDescriptor),r),this.width=r.width,this.height=r.height,this.resolution=r.resolution,this.stencil=r.stencil,this._viewport=new K(0,0,this.width,this.height),typeof r.colorTextures=="number")for(let e=0;e<r.colorTextures;e++)this.colorTextures.push(new P({source:new he({width:this.width,height:this.height,resolution:r.resolution,antialias:r.antialias})}));else{this.colorTextures=[...r.colorTextures];const e=this.colorTexture.source;this._resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),r.depthTexture&&(this.depthTexture=new P({source:new he({width:this.width,height:this.height,resolution:this.resolution,format:"stencil8"})}))}get pixelWidth(){return this.width*this.resolution}get pixelHeight(){return this.height*this.resolution}get colorTexture(){return this.colorTextures[0]}get projectionMatrix(){const r=this.colorTexture;return md(this._projectionMatrix,0,0,r.frameWidth,r.frameHeight,!this.isRoot),this._projectionMatrix}get viewport(){const r=this.colorTexture,e=r.source,t=e.pixelWidth,i=e.pixelHeight,n=this._viewport,s=r.layout.frame;return n.x=s.x*t|0,n.y=s.y*i|0,n.width=s.width*t|0,n.height=s.height*i|0,n}onSourceResize(r){this._resize(r.width,r.height,r._resolution,!0)}_resize(r,e,t=this.resolution,i=!1){this.width=r,this.height=e,this.resolution=t,this.dirtyId++,this.colorTextures.forEach((n,s)=>{i&&s===0||n.source.resize(r,e,t)}),this.depthTexture&&this.depthTexture.source.resize(r,e,t)}destroy(){throw new Error("Method not implemented.")}};let Rt=yd;Rt.defaultDescriptor={width:0,height:0,resolution:1,colorTextures:1,stencil:!0,antialias:!1};class vi{constructor(e){this.items=[],this._name=e}emit(e,t,i,n,s,o,a,l){const{name:h,items:u}=this;for(let c=0,p=u.length;c<p;c++)u[c][h](e,t,i,n,s,o,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}class xd extends he{constructor(e){var t;e.resource||(e.resource=D.ADAPTER.createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),(t=e.alphaMode)!=null||(e.alphaMode="premultiply-alpha-on-upload"),super(e),this.uploadMethodId="image",this.autoDensity=e.autoDensity;const i=e.resource;(this.pixelWidth!==i.width||this.pixelWidth!==i.height)&&this.resizeCanvas()}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight}resize(e=this.width,t=this.height,i=this._resolution){super.resize(e,t,i),this.resizeCanvas()}}var Ky=Object.defineProperty,_d=Object.getOwnPropertySymbols,Zy=Object.prototype.hasOwnProperty,Qy=Object.prototype.propertyIsEnumerable,wd=(r,e,t)=>e in r?Ky(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Jy=(r,e)=>{for(var t in e||(e={}))Zy.call(e,t)&&wd(r,t,e[t]);if(_d)for(var t of _d(e))Qy.call(e,t)&&wd(r,t,e[t]);return r};const Js=new Map;function yi(r,e){if(!Js.has(r)){const t=new P({source:new xd(Jy({resource:r},e))});Js.set(r,t)}return Js.get(r)}class eo{constructor(e){this.onRenderTargetChange=new vi("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._clearColorCache=[0,0,0,0],this._viewPortCache={x:0,y:0,width:0,height:0},this.rootProjectionMatrix=new R,this._renderer=e}contextChange(e){this._gl=e}start(e,t=!0,i){this._renderTargetStack.length=0;const n=this.getRenderTarget(e);this.rootRenderTarget=n,this.renderingToScreen=Qs(this.rootRenderTarget),this.rootProjectionMatrix=n.projectionMatrix,this.push(n,t,i)}bind(e,t=!0,i){const n=this.getRenderTarget(e);this.renderTarget=n;const s=this.getGpuRenderTarget(n);n.dirtyId!==s.dirtyId&&(s.dirtyId=n.dirtyId,this._resizeGpuRenderTarget(n));const o=this._gl;o.bindFramebuffer(o.FRAMEBUFFER,s.framebuffer),n.colorTextures.forEach(u=>{this._renderer.texture.unbind(u)});const a=n.viewport;let l=a.y;n.isRoot&&(l=this._renderer.view.element.height-a.height);const h=this._viewPortCache;return(h.x!==a.x||h.y!==l||h.width!==a.width||h.height!==a.height)&&(h.x=a.x,h.y=l,h.width=a.width,h.height=a.height,o.viewport(a.x,l,a.width,a.height)),this.clear(t,i),this.onRenderTargetChange.emit(n),n}clear(e,t){if(!e)return;typeof e=="boolean"&&(e=e?be.ALL:be.NONE);const i=this._gl;if(e&be.COLOR){t!=null||(t=this._defaultClearColor);const n=this._clearColorCache,s=t;(n[0]!==s[0]||n[1]!==s[1]||n[2]!==s[2]||n[3]!==s[3])&&(n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],i.clearColor(s[0],s[1],s[2],s[3]))}i.clear(e)}push(e,t=!0,i){const n=this.bind(e,t,i);return this._renderTargetStack.push(n),n}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=yi(e)),e instanceof Rt?t=e:e instanceof P&&(t=new Rt({colorTextures:[e]}),e.source.resource instanceof HTMLCanvasElement&&(t.isRoot=!0),e.source.on("destroy",()=>{t.destroy()})),this._renderSurfaceToRenderTargetHash.set(e,t),t}finishRenderPass(e){e=e||this.renderTarget;const t=this.getGpuRenderTarget(e);if(!t.msaa)return;const i=this._renderer.gl;i.bindFramebuffer(i.FRAMEBUFFER,t.resolveTargetFramebuffer),i.bindFramebuffer(i.READ_FRAMEBUFFER,t.framebuffer),i.blitFramebuffer(0,0,t.width,t.height,0,0,t.width,t.height,i.COLOR_BUFFER_BIT,i.NEAREST),i.bindFramebuffer(i.FRAMEBUFFER,t.framebuffer)}copyToTexture(e,t,i,n){const s=this._renderer,o=this.getGpuRenderTarget(e),a=s.gl;return this.finishRenderPass(e),a.bindFramebuffer(a.FRAMEBUFFER,o.resolveTargetFramebuffer),s.texture.bind(t,0),a.copyTexSubImage2D(a.TEXTURE_2D,0,0,0,i.x,i.y,n.width,n.height),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){const t=this._renderer.gl,i=new fd;return e.colorTexture.source.resource instanceof HTMLCanvasElement?(this._gpuRenderTargetHash[e.uid]=i,i.framebuffer=null,i):(this._initColor(e,i),e.stencil&&this._initStencil(i),t.bindFramebuffer(t.FRAMEBUFFER,null),this._gpuRenderTargetHash[e.uid]=i,i)}_resizeGpuRenderTarget(e){if(e.isRoot)return;const t=this.getGpuRenderTarget(e);this._resizeColor(e,t),e.stencil&&this._resizeStencil(t)}_initColor(e,t){const i=this._renderer,n=i.gl,s=n.createFramebuffer();if(t.resolveTargetFramebuffer=s,n.bindFramebuffer(n.FRAMEBUFFER,s),t.width=e.colorTexture.source.pixelWidth,t.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((o,a)=>{const l=o.source;l.antialias&&(t.msaa=!0),i.texture.bindSource(l,0);const h=i.texture.getGlSource(l).texture;n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+a,3553,h,0)}),t.msaa){const o=n.createFramebuffer();t.framebuffer=o,n.bindFramebuffer(n.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const h=n.createRenderbuffer();t.msaaRenderBuffer[l]=h})}else t.framebuffer=s}_resizeColor(e,t){const i=e.colorTexture.source;if(t.width=i.pixelWidth,t.height=i.pixelHeight,e.colorTextures.forEach((n,s)=>{s!==0&&n.source.resize(i.width,i.height,i._resolution)}),t.msaa){const n=this._renderer,s=n.gl,o=t.framebuffer;s.bindFramebuffer(s.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const h=a.source;n.texture.bindSource(h,0);const u=n.texture.getGlSource(h).internalFormat,c=t.msaaRenderBuffer[l];s.bindRenderbuffer(s.RENDERBUFFER,c),s.renderbufferStorageMultisample(s.RENDERBUFFER,4,u,h.pixelWidth,h.pixelHeight),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+l,s.RENDERBUFFER,c)})}}_initStencil(e){const t=this._renderer.gl,i=t.createRenderbuffer();e.depthStencilRenderBuffer=i,t.bindRenderbuffer(t.RENDERBUFFER,i),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,i)}_resizeStencil(e){const t=this._renderer.gl;t.bindRenderbuffer(t.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?t.renderbufferStorageMultisample(t.RENDERBUFFER,4,t.DEPTH24_STENCIL8,e.width,e.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH24_STENCIL8,e.width,e.height)}}eo.extension={type:[y.WebGLSystem],name:"renderTarget"};const ke=[];ke[ne.NONE]=void 0,ke[ne.DISABLED]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilReadMask:0,stencilBack:{compare:"always",passOp:"keep"}},ke[ne.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},ke[ne.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},ke[ne.RENDERING_MASK_REMOVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"decrement-clamp"}},ke[ne.MASK_ACTIVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilBack:{compare:"equal",passOp:"keep"}};class to{constructor(e){this._stencilCache={enabled:!1,stencilReference:0,stencilMode:ne.NONE},this._renderTargetStencilState=Object.create(null),e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this._gl=e,this._comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this._stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP}}onRenderTargetChange(e){if(this._activeRenderTarget===e)return;this._activeRenderTarget=e;let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:ne.DISABLED,stencilReference:0}),this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const i=this._renderTargetStencilState[this._activeRenderTarget.uid],n=this._gl,s=ke[e],o=this._stencilCache;if(i.stencilMode=e,i.stencilReference=t,e===ne.DISABLED){this._stencilCache.enabled&&(this._stencilCache.enabled=!1,n.disable(n.STENCIL_TEST));return}this._stencilCache.enabled||(this._stencilCache.enabled=!0,n.enable(n.STENCIL_TEST)),(e!==o.stencilMode||o.stencilReference!==t)&&(o.stencilMode=e,o.stencilReference=t,n.stencilFunc(this._comparisonFuncMapping[s.stencilBack.compare],t,255),n.stencilOp(n.KEEP,n.KEEP,this._stencilOpsMapping[s.stencilBack.passOp]))}}to.extension={type:[y.WebGLSystem],name:"stencil"};class ex{}class Td{constructor(e,t){this.program=e,this.uniformData=t,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}class xi extends ue{constructor({buffer:e,offset:t,size:i}){super(),this.uid=Y("buffer"),this.touched=0,this.resourceType="bufferResource",this.resourceId=Y("buffer"),this.bufferResource=!0,this.buffer=e,this.offset=t,this.size=i,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this.resourceId=Y("buffer"),this.emit("change",this)}destroy(e=!1){e&&this.buffer.destroy(),this.buffer=null}}function ro(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}function io(r){const e=new Array(r);for(let t=0;t<e.length;t++)e[t]=!1;return e}function no(r,e){switch(r){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return io(2*e);case"bvec3":return io(3*e);case"bvec4":return io(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const tx={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function Sd(r){return tx[r]}let _i=null;const Pd={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function so(r,e){if(!_i){const t=Object.keys(Pd);_i={};for(let i=0;i<t.length;++i){const n=t[i];_i[r[n]]=Pd[n]}}return _i[e]}function Ad(r,e){const t={},i=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=e.getActiveAttrib(r,n);if(s.name.startsWith("gl_"))continue;const o=so(e,s.type),a={type:o,name:s.name,size:Sd(o),location:e.getAttribLocation(r,s.name)};t[s.name]=a}return t}function Ed(r,e){const t={},i=e.getProgramParameter(r,e.ACTIVE_UNIFORM_BLOCKS);for(let n=0;n<i;n++){const s=e.getActiveUniformBlockName(r,n),o=e.getUniformBlockIndex(r,s),a=e.getActiveUniformBlockParameter(r,n,e.UNIFORM_BLOCK_DATA_SIZE);t[s]={name:s,index:o,size:a}}return t}function Cd(r,e){const t={},i=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let n=0;n<i;n++){const s=e.getActiveUniform(r,n),o=s.name.replace(/\[.*?\]$/,""),a=!!s.name.match(/\[.*?\]$/),l=so(e,s.type);t[o]={name:o,index:n,type:l,size:s.size,isArray:a,value:no(l,s.size)}}return t}function Md(r,e){const t=r.getShaderSource(e).split(`
`).map((h,u)=>`${u}: ${h}`),i=r.getShaderInfoLog(e),n=i.split(`
`),s={},o=n.map(h=>parseFloat(h.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(h=>h&&!s[h]?(s[h]=!0,!0):!1),a=[""];o.forEach(h=>{t[h-1]=`%c${t[h-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const l=t.join(`
`);a[0]=l,console.error(i),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function Bd(r,e,t,i){r.getProgramParameter(e,r.LINK_STATUS)||(r.getShaderParameter(t,r.COMPILE_STATUS)||Md(r,t),r.getShaderParameter(i,r.COMPILE_STATUS)||Md(r,i),console.error("PixiJS Error: Could not initialize shader."),r.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",r.getProgramInfoLog(e)))}function Rd(r,e){const t=ro(r,r.VERTEX_SHADER,e.vertex),i=ro(r,r.FRAGMENT_SHADER,e.fragment),n=r.createProgram();r.attachShader(n,t),r.attachShader(n,i);const s=e.transformFeedbackVaryings;s&&(typeof r.transformFeedbackVaryings!="function"||r.transformFeedbackVaryings(n,s.names,s.bufferMode==="separate"?r.SEPARATE_ATTRIBS:r.INTERLEAVED_ATTRIBS)),r.linkProgram(n),r.getProgramParameter(n,r.LINK_STATUS)||Bd(r,n,t,i),e.attributeData=Ad(n,r),e.uniformData=Cd(n,r),e.uniformBlockData=Ed(n,r),r.deleteShader(t),r.deleteShader(i);const o={};for(const a in e.uniformData){const l=e.uniformData[a];o[a]={location:r.getUniformLocation(n,a),value:no(l.type,l.size)}}return new Td(n,o)}const Le={textureCount:0,blockIndex:0};class oo{constructor(e){this.activeProgram=null,this._programDataHash=Object.create(null),this._nextIndex=0,this._boundUniformsIdsToIndexHash=Object.create(null),this._boundIndexToUniformsHash=Object.create(null),this._renderer=e}contextChange(e){this._gl=e,this._maxBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}bind(e,t){if(this._setProgram(e.glProgram),t)return;Le.textureCount=0,Le.blockIndex=0;const i=this._gl,n=this.getProgramData(e.glProgram);for(const s in e.groups){const o=e.groups[s];for(const a in o.resources){const l=o.resources[a];if(l instanceof te)l.ubo?this.bindUniformBlock(l,e.uniformBindMap[s][a],Le.blockIndex++):this._updateUniformGroup(l);else if(l instanceof xi)this.bindUniformBlock(l,e.uniformBindMap[s][a],Le.blockIndex++);else if(l instanceof he){this._renderer.texture.bind(l,Le.textureCount);const h=e.uniformBindMap[s][a],u=n.uniformData[h];u&&(u.value!==Le.textureCount&&i.uniform1i(u.location,Le.textureCount),Le.textureCount++)}else l instanceof Ht}}}_updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this.activeProgram,Le)}bindUniformBlock(e,t,i=0){const n=this._renderer.buffer,s=this.getProgramData(this.activeProgram),o=e.bufferResource;o&&this._renderer.uniformBuffer.updateUniformGroup(e),n.updateBuffer(e.buffer);let a=this._boundUniformsIdsToIndexHash[e.uid];if(a===void 0){const u=this._nextIndex++%this._maxBindings,c=this._boundIndexToUniformsHash[u];c&&(this._boundUniformsIdsToIndexHash[c.uid]=void 0),a=this._boundUniformsIdsToIndexHash[e.uid]=u,this._boundIndexToUniformsHash[u]=e,o?n.bindBufferRange(e.buffer,u,e.offset):n.bindBufferBase(e.buffer,u)}const l=this._gl,h=this.activeProgram.uniformBlockData[t].index;s.uniformBlockBindings[i]!==a&&(s.uniformBlockBindings[i]=a,l.uniformBlockBinding(s.program,h,a))}_setProgram(e){if(this.activeProgram===e)return;this.activeProgram=e;const t=this.getProgramData(e);this._gl.useProgram(t.program)}getProgramData(e){return this._programDataHash[e.key]||this._createProgramData(e)}_createProgramData(e){const t=e.key;return this._programDataHash[t]=Rd(this._gl,e),this._programDataHash[t]}destroy(){for(const e of Object.keys(this._programDataHash))this._programDataHash[e].destroy(),this._programDataHash[e]=null;this._programDataHash=null,this._boundUniformsIdsToIndexHash=null}}oo.extension={type:[y.WebGLSystem],name:"shader"};let yr;function rx(){if(typeof yr=="boolean")return yr;try{yr=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch(r){yr=!1}return yr}const wi=[{test:r=>r.type==="float"&&r.size===1&&!r.isArray,code:r=>`
            if(uv["${r}"] !== ud["${r}"].value)
            {
                ud["${r}"].value = uv["${r}"]
                gl.uniform1f(ud["${r}"].location, uv["${r}"])
            }
            `},{test:(r,e)=>(r.type==="sampler2D"||r.type==="samplerCube"||r.type==="sampler2DArray")&&r.size===1&&!r.isArray&&(e==null||e instanceof P),code:r=>`t = syncData.textureCount++;

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
                }`}],ix={float:`
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
    }`},nx={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"};function kd(r,e){const t=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(const i in r.uniforms){const n=e[i];if(!n){r.uniforms[i]instanceof te?r.uniforms[i].ubo?t.push(`
                        renderer.shader.bindUniformBlock(uv.${i}, "${i}");
                    `):t.push(`
                        renderer.shader.updateUniformGroup(uv.${i});
                    `):r.uniforms[i]instanceof xi&&t.push(`
                        renderer.shader.bindBufferResource(uv.${i}, "${i}");
                    `);continue}const s=r.uniforms[i];let o=!1;for(let a=0;a<wi.length;a++)if(wi[a].test(n,s)){t.push(wi[a].code(i,s)),o=!0;break}if(!o){const a=(n.size===1&&!n.isArray?ix:nx)[n.type].replace("location",`ud["${i}"].location`);t.push(`
            cu = ud["${i}"];
            cv = cu.value;
            v = uv["${i}"];
            ${a};`)}}return new Function("ud","uv","renderer","syncData",t.join(`
`))}class ao{constructor(e){this.destroyed=!1,this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this._systemCheck(),this.gl=null,this._cache={}}_systemCheck(){if(!rx())throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(e){this.gl=e}updateUniformGroup(e,t,i){const n=this._renderer.shader.getProgramData(t);(!e.isStatic||e.dirtyId!==n.uniformDirtyGroups[e.uid])&&(n.uniformDirtyGroups[e.uid]=e.dirtyId,this._getUniformSyncFunction(e,t)(n.uniformData,e.uniforms,this._renderer,i))}_getUniformSyncFunction(e,t){var i;return((i=this._uniformGroupSyncHash[e.signature])==null?void 0:i[t.key])||this._createUniformSyncFunction(e,t)}_createUniformSyncFunction(e,t){const i=this._uniformGroupSyncHash[e.signature]||(this._uniformGroupSyncHash[e.signature]={}),n=this._getSignature(e,t.uniformData,"u");return this._cache[n]||(this._cache[n]=kd(e,t.uniformData)),i[t.key]=this._cache[n],i[t.key]}_getSignature(e,t,i){const n=e.uniforms,s=[`${i}-`];for(const o in n)s.push(o),t[o]&&s.push(t[o].type);return s.join("-")}destroy(){this._renderer=null,this.destroyed=!0,this._cache=null}}ao.extension={type:[y.WebGLSystem],name:"uniformGroup"};function sx(r){return r=r.replaceAll("texture2D","texture").replaceAll("gl_FragColor","fragColor").replaceAll("varying","in"),r=`
        out vec4 fragColor;
    ${r}
    `,r}function Fd(r){const e={};return e.normal=[r.ONE,r.ONE_MINUS_SRC_ALPHA],e.add=[r.ONE,r.ONE],e.multiply=[r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.screen=[r.ONE,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[r.SRC_ALPHA,r.ONE,r.ONE,r.ONE],e["screen-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.erase=[r.ZERO,r.ONE_MINUS_SRC_ALPHA],e}const ox=0,ax=1,lx=2,hx=3,ux=4,cx=5,lo=class{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[ox]=this.setBlend,this.map[ax]=this.setOffset,this.map[lx]=this.setCullFace,this.map[hx]=this.setDepthTest,this.map[ux]=this.setFrontFace,this.map[cx]=this.setDepthMask,this.checks=[],this.defaultState=new Se,this.defaultState.blend=!0}contextChange(r){this.gl=r,this.blendModesMap=Fd(r),this.set(this.defaultState),this.reset()}set(r){if(r=r||this.defaultState,this.stateId!==r.data){let e=this.stateId^r.data,t=0;for(;e;)e&1&&this.map[t].call(this,!!(r.data&1<<t)),e=e>>1,t++;this.stateId=r.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,r)}forceState(r){r=r||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(r.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,r);this.stateId=r.data}setBlend(r){this._updateCheck(lo._checkBlendMode,r),this.gl[r?"enable":"disable"](this.gl.BLEND)}setOffset(r){this._updateCheck(lo._checkPolygonOffset,r),this.gl[r?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(r){this.gl[r?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(r){this.gl.depthMask(r)}setCullFace(r){this.gl[r?"enable":"disable"](this.gl.CULL_FACE)}setFrontFace(r){this.gl.frontFace(this.gl[r?"CW":"CCW"])}setBlendMode(r){if(this.blendModesMap[r]||(r="normal"),r===this.blendMode)return;this.blendMode=r;const e=this.blendModesMap[r],t=this.gl;e.length===2?t.blendFunc(e[0],e[1]):t.blendFuncSeparate(e[0],e[1],e[2],e[3]),e.length===6?(this._blendEq=!0,t.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD))}setPolygonOffset(r,e){this.gl.polygonOffset(r,e)}reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}_updateCheck(r,e){const t=this.checks.indexOf(r);e&&t===-1?this.checks.push(r):!e&&t!==-1&&this.checks.splice(t,1)}static _checkBlendMode(r,e){r.setBlendMode(e.blendMode)}static _checkPolygonOffset(r,e){r.setPolygonOffset(1,e.polygonOffset)}destroy(){this.gl=null,this.checks.length=0}};let ho=lo;ho.extension={type:[y.WebGLSystem],name:"state"};class Od{constructor(e){this.target=Ys.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=N.UNSIGNED_BYTE,this.internalFormat=gi.RGBA,this.format=gi.RGBA,this.samplerType=0}}const Ud={id:"image",upload(r,e,t){e.width===r.width||e.height===r.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,r.width,r.height,0,e.format,e.type,r.resource),e.width=r.width,e.height=r.height}},uo={id:"image",upload(r,e,t){const i=r.alphaMode==="premultiply-alpha-on-upload";t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i);const n=e.width,s=e.height,o=r.pixelWidth,a=r.pixelHeight,l=r.resourceWidth,h=r.resourceHeight;l<o||h<a?((n!==o||s!==a)&&t.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,null),t.texSubImage2D(t.TEXTURE_2D,0,0,0,l,h,e.format,e.type,r.resource)):n===o||s===a?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,r.resource),e.width=o,e.height=a}},Id={id:"video",upload(r,e,t){if(!r.isValid){t.texImage2D(e.target,0,e.internalFormat,1,1,0,e.format,e.type,null);return}uo.upload(r,e,t)}},co={linear:9729,nearest:9728},Gd={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},Ti={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},$d={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};function po(r,e,t,i,n,s){const o=s;if(e[n](o,e.TEXTURE_WRAP_S,Ti[r.addressModeU]),e[n](o,e.TEXTURE_WRAP_T,Ti[r.addressModeV]),e[n](o,e.TEXTURE_WRAP_R,Ti[r.addressModeW]),e[n](o,e.TEXTURE_MAG_FILTER,co[r.magFilter]),t){const a=Gd[r.minFilter][r.mipmapFilter];e[n](o,e.TEXTURE_MIN_FILTER,a)}else e[n](o,e.TEXTURE_MIN_FILTER,co[r.minFilter]);if(i&&r.maxAnisotropy>1){const a=Math.min(r.maxAnisotropy,e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));e[n](o,i.TEXTURE_MAX_ANISOTROPY_EXT,a)}r.compare&&e[n](o,e.TEXTURE_COMPARE_FUNC,$d[r.compare])}function Ld(r){return{r8unorm:r.RED,r8snorm:r.RED,r8uint:r.RED,r8sint:r.RED,r16uint:r.RED,r16sint:r.RED,r16float:r.RED,rg8unorm:r.RG,rg8snorm:r.RG,rg8uint:r.RG,rg8sint:r.RG,r32uint:r.RED,r32sint:r.RED,r32float:r.RED,rg16uint:r.RG,rg16sint:r.RG,rg16float:r.RG,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.RGBA,rgba8snorm:r.RGBA,rgba8uint:r.RGBA,rgba8sint:r.RGBA,bgra8unorm:r.RGBA,"bgra8unorm-srgb":r.RGBA,rgb9e5ufloat:r.RGB,rgb10a2unorm:r.RGBA,rg11b10ufloat:r.RGB,rg32uint:r.RG,rg32sint:r.RG,rg32float:r.RG,rgba16uint:r.RGBA,rgba16sint:r.RGBA,rgba16float:r.RGBA,rgba32uint:r.RGBA,rgba32sint:r.RGBA,rgba32float:r.RGBA,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT,depth24plus:r.DEPTH_COMPONENT,"depth24plus-stencil8":r.DEPTH_STENCIL,depth32float:r.DEPTH_COMPONENT,"depth32float-stencil8":r.DEPTH_STENCIL}}function Dd(r){return{r8unorm:r.R8,r8snorm:r.R8_SNORM,r8uint:r.R8UI,r8sint:r.R8I,r16uint:r.R16UI,r16sint:r.R16I,r16float:r.R16F,rg8unorm:r.RG8,rg8snorm:r.RG8_SNORM,rg8uint:r.RG8UI,rg8sint:r.RG8I,r32uint:r.R32UI,r32sint:r.R32I,r32float:r.R32F,rg16uint:r.RG16UI,rg16sint:r.RG16I,rg16float:r.RG16F,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.SRGB8_ALPHA8,rgba8snorm:r.RGBA8_SNORM,rgba8uint:r.RGBA8UI,rgba8sint:r.RGBA8I,bgra8unorm:r.RGBA8,"bgra8unorm-srgb":r.SRGB8_ALPHA8,rgb9e5ufloat:r.RGB9_E5,rgb10a2unorm:r.RGB10_A2,rg11b10ufloat:r.R11F_G11F_B10F,rg32uint:r.RG32UI,rg32sint:r.RG32I,rg32float:r.RG32F,rgba16uint:r.RGBA16UI,rgba16sint:r.RGBA16I,rgba16float:r.RGBA16F,rgba32uint:r.RGBA32UI,rgba32sint:r.RGBA32I,rgba32float:r.RGBA32F,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT16,depth24plus:r.DEPTH_COMPONENT24,"depth24plus-stencil8":r.DEPTH24_STENCIL8,depth32float:r.DEPTH_COMPONENT32F,"depth32float-stencil8":r.DEPTH32F_STENCIL8}}function zd(r){return{r8unorm:r.UNSIGNED_BYTE,r8snorm:r.BYTE,r8uint:r.UNSIGNED_BYTE,r8sint:r.BYTE,r16uint:r.UNSIGNED_SHORT,r16sint:r.SHORT,r16float:r.HALF_FLOAT,rg8unorm:r.UNSIGNED_BYTE,rg8snorm:r.BYTE,rg8uint:r.UNSIGNED_BYTE,rg8sint:r.BYTE,r32uint:r.UNSIGNED_INT,r32sint:r.INT,r32float:r.FLOAT,rg16uint:r.UNSIGNED_SHORT,rg16sint:r.SHORT,rg16float:r.HALF_FLOAT,rgba8unorm:r.UNSIGNED_BYTE,"rgba8unorm-srgb":r.UNSIGNED_BYTE,rgba8snorm:r.BYTE,rgba8uint:r.UNSIGNED_BYTE,rgba8sint:r.BYTE,bgra8unorm:r.UNSIGNED_BYTE,"bgra8unorm-srgb":r.UNSIGNED_BYTE,rgb9e5ufloat:r.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:r.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:r.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:r.UNSIGNED_INT,rg32sint:r.INT,rg32float:r.FLOAT,rgba16uint:r.UNSIGNED_SHORT,rgba16sint:r.SHORT,rgba16float:r.HALF_FLOAT,rgba32uint:r.UNSIGNED_INT,rgba32sint:r.INT,rgba32float:r.FLOAT,stencil8:r.UNSIGNED_BYTE,depth16unorm:r.UNSIGNED_SHORT,depth24plus:r.UNSIGNED_INT,"depth24plus-stencil8":r.UNSIGNED_INT_24_8,depth32float:r.FLOAT,"depth32float-stencil8":r.FLOAT_32_UNSIGNED_INT_24_8_REV}}function dx(r){r instanceof Uint8ClampedArray&&(r=new Uint8Array(r.buffer));const e=r.length;for(let t=0;t<e;t+=4){const i=r[t+3];if(i!==0){const n=255.001/i;r[t]=r[t]*n+.5,r[t+1]=r[t+1]*n+.5,r[t+2]=r[t+2]*n+.5}}}const px=new K,fx=4;class fo{constructor(e){this.managedTextures=[],this._glTextures=Object.create(null),this._glSamplers=Object.create(null),this._boundTextures=[],this._activeTextureLocation=-1,this._boundSamplers=Object.create(null),this._uploads={image:uo,buffer:Ud,video:Id},this._useSeparateSamplers=!1,this._renderer=e}contextChange(e){this._gl=e,this._mapFormatToInternalFormat||(this._mapFormatToInternalFormat=Dd(e),this._mapFormatToType=zd(e),this._mapFormatToFormat=Ld(e));for(let t=0;t<16;t++)this.bind(P.EMPTY,t)}bind(e,t=0){const i=e.source;e?(this.bindSource(i,t),this._useSeparateSamplers&&this._bindSampler(i.style,t)):(this.bindSource(null,t),this._useSeparateSamplers&&this._bindSampler(null,t))}bindSource(e,t=0){const i=this._gl;if(e.touched=this._renderer.textureGC.count,this._boundTextures[t]!==e){this._boundTextures[t]=e,this._activateLocation(t),e=e||P.EMPTY.source;const n=this.getGlSource(e);i.bindTexture(n.target,n.texture)}}_bindSampler(e,t=0){const i=this._gl;if(!e){this._boundSamplers[t]=null,i.bindSampler(t,null);return}const n=this._getGlSampler(e);this._boundSamplers[t]!==n&&(this._boundSamplers[t]=n,i.bindSampler(t,n))}unbind(e){const t=e.source,i=this._boundTextures,n=this._gl;for(let s=0;s<i.length;s++)if(i[s]===t){this._activateLocation(s);const o=this.getGlSource(t);n.bindTexture(o.target,null),i[s]=null}}_activateLocation(e){this._activeTextureLocation!==e&&(this._activeTextureLocation=e,this._gl.activeTexture(this._gl.TEXTURE0+e))}_initSource(e){const t=this._gl,i=new Od(t.createTexture());if(i.type=this._mapFormatToType[e.format],i.internalFormat=this._mapFormatToInternalFormat[e.format],i.format=this._mapFormatToFormat[e.format],e.autoGenerateMipmaps){const n=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(n))+1}return this._glTextures[e.uid]=i,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceUpdate,this),e.on("styleChange",this.onStyleChange,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),this.onStyleChange(e),i}onStyleChange(e){const t=this._gl,i=this._glTextures[e.uid];t.bindTexture(t.TEXTURE_2D,i.texture),po(e.style,t,e.mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"texParameteri",t.TEXTURE_2D)}onSourceUnload(e){const t=this._glTextures[e.uid];t&&(this.unbind(e),this._glTextures[e.uid]=null,this._gl.deleteTexture(t.texture))}onSourceUpdate(e){const t=this._gl,i=this.getGlSource(e);t.bindTexture(t.TEXTURE_2D,i.texture),this._boundTextures[this._activeTextureLocation]=e,this._uploads[e.uploadMethodId]?(this._uploads[e.uploadMethodId].upload(e,i,this._gl),e.autoGenerateMipmaps&&e.mipLevelCount>1&&t.generateMipmap(i.target)):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.pixelWidth,e.pixelHeight,0,t.RGBA,t.UNSIGNED_BYTE,null)}onSourceDestroy(e){e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}_initSampler(e){const t=this._gl,i=this._gl.createSampler();return this._glSamplers[e.resourceId]=i,po(e,t,this._boundTextures[this._activeTextureLocation].mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"samplerParameteri",i),this._glSamplers[e.resourceId]}_getGlSampler(e){return this._glSamplers[e.resourceId]||this._initSampler(e)}getGlSource(e){return this._glTextures[e.uid]||this._initSource(e)}generateCanvas(e){const{pixels:t,width:i,height:n}=this.getPixels(e),s=D.ADAPTER.createCanvas();s.width=i,s.height=n;const o=s.getContext("2d");if(o){const a=o.createImageData(i,n);a.data.set(t),o.putImageData(a,0,0)}return s}getPixels(e){const t=e.source.resolution,i=px;i.x=e.frameX,i.y=e.frameY,i.width=e.frameWidth,i.height=e.frameHeight;const n=Math.max(Math.round(i.width*t),1),s=Math.max(Math.round(i.height*t),1),o=new Uint8Array(fx*n*s),a=this._renderer,l=a.renderTarget.getRenderTarget(e),h=a.renderTarget.getGpuRenderTarget(l),u=a.gl;return u.bindFramebuffer(u.FRAMEBUFFER,h.resolveTargetFramebuffer),u.readPixels(Math.round(i.x*t),Math.round(i.y*t),n,s,u.RGBA,u.UNSIGNED_BYTE,o),{pixels:new Uint8ClampedArray(o.buffer),width:n,height:s}}destroy(){const e=this;e._renderer=null}}fo.extension={type:[y.WebGLSystem],name:"texture"};var mx=Object.defineProperty,Nd=Object.getOwnPropertySymbols,gx=Object.prototype.hasOwnProperty,bx=Object.prototype.propertyIsEnumerable,Hd=(r,e,t)=>e in r?mx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,jd=(r,e)=>{for(var t in e||(e={}))gx.call(e,t)&&Hd(r,t,e[t]);if(Nd)for(var t of Nd(e))bx.call(e,t)&&Hd(r,t,e[t]);return r};const vx=["init","destroy","contextChange","reset","renderEnd","renderStart","render","update","postrender","prerender"];class mo{constructor(e){this.runners=Object.create(null),this.renderPipes=Object.create(null),this._systemsHash=Object.create(null);var t;this.type=e.type,this.name=e.name;const i=[...vx,...(t=e.runners)!=null?t:[]];this._addRunners(...i),this._addSystems(e.systems),this._addPipes(e.renderPipes,e.renderPipeAdaptors)}async init(e={}){for(const t in this._systemsHash){const i=this._systemsHash[t].constructor.defaultOptions;e=jd(jd({},i),e)}for(let t=0;t<this.runners.init.items.length;t++)await this.runners.init.items[t].init(e)}render(e,t){let i=e;if(i instanceof q&&(i={container:i},t&&(O(z,"passing a second argument is deprecated, please use render options instead"),i.target=t.renderTexture)),i.target||(i.target=this.view.texture),i.target===this.view.texture&&(this._lastObjectRendered=i.container),i.clearColor){const n=Array.isArray(i.clearColor)&&i.clearColor.length===4;i.clearColor=n?i.clearColor:j.shared.setValue(i.clearColor).toArray()}this.runners.prerender.emit(i),this.runners.renderStart.emit(i),this.runners.render.emit(i),this.runners.renderEnd.emit(i),this.runners.postrender.emit(i)}resize(e,t,i){this.view.resize(e,t,i)}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e}get width(){return this.view.texture.frameWidth}get height(){return this.view.texture.frameHeight}get element(){return this.view.element}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(t=>{this.runners[t]=new vi(t)})}_addSystems(e){let t;for(t in e){const i=e[t];this._addSystem(i.value,i.name)}}_addSystem(e,t){const i=new e(this);if(this[t])throw new Error(`Whoops! The name "${t}" is already in use`);this[t]=i,this._systemsHash[t]=i;for(const n in this.runners)this.runners[n].add(i);return this}_addPipes(e,t){const i=t.reduce((n,s)=>(n[s.name]=s.value,n),{});e.forEach(n=>{const s=n.value,o=n.name,a=i[o];this.renderPipes[o]=new s(this,a?new a:null)})}destroy(e=!1){const t=this;this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(i=>{i.destroy()}),t.runners=null,this._systemsHash=null,t.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}}class Si extends ue{constructor({original:e,view:t}){super(),this.uid=Y("renderable"),this.didViewUpdate=!1,this.view=t,e&&this.init(e)}init(e){this._original=e,this.layerTransform=e.layerTransform}get layerColor(){return this._original.layerColor}get layerBlendMode(){return this._original.layerBlendMode}get layerVisibleRenderable(){return this._original.layerVisibleRenderable}get isRenderable(){return this._original.isRenderable}}class go extends Pt{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}const Wd={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            vUV = (tilingUniforms.uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            } 

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},Vd={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;
        
        `,main:`
            vUV = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);
        
        outColor = texture(uTexture, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0
    
        `}};class Yd extends Ee{constructor(e){const t=At({name:"tiling-sprite-shader",bits:[xs,Wd]}),i=Et({name:"tiling-sprite-shader",bits:[Mt,Vd]}),n=new te({uMapCoord:{value:new R,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new R,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,200,.5,.5]),type:"vec4<f32>"}});super({glProgram:i,gpuProgram:t,resources:{tilingUniforms:n,uTexture:e.texture.source,uSampler:e.texture.source.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.source.style)}}const yx=new go;class bo{constructor(e){this._renderableHash=Object.create(null),this._gpuBatchedTilingSprite=Object.create(null),this._gpuTilingSprite=Object.create(null),this._renderer=e}validateRenderable(e){const t=e.view.texture.textureMatrix;let i=!1;const n=this._getRenderableData(e);return n.batched!==t.isSimple&&(n.batched=t.isSimple,i=!0),i}addRenderable(e,t){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:i}=this._getRenderableData(e);if(i){const n=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(n,t)}else{const n=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(n.meshRenderable,t)}}updateRenderable(e){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:t}=this._getRenderableData(e);if(t){const i=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i)}else{const i=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i.meshRenderable)}}destroyRenderable(e){this._renderableHash[e.uid]=null,this._gpuTilingSprite[e.uid]=null,this._gpuBatchedTilingSprite[e.uid]=null}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t={batched:!0};return this._renderableHash[e.uid]=t,this.validateRenderable(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}_rebuild(e){const t=this._getRenderableData(e),i=e.view,n=i.texture.textureMatrix;if(t.batched){const s=this._getBatchedTilingSprite(e);s.view.texture=i.texture,i.texture.source.style.addressMode="repeat",i.texture.source.style.update(),this._updateBatchPositions(e),this._updateBatchUvs(e)}else{const s=this._getGpuTilingSprite(e),{meshRenderable:o}=s,a=o.view;a.shader.texture=i.texture;const l=a.shader.resources.tilingUniforms,h=i.width,u=i.height,c=i.texture.width,p=i.texture.height,d=i._tileTransform.matrix,f=l.uniforms.uTextureTransform;f.set(d.a*c/h,d.b*c/u,d.c*p/h,d.d*p/u,d.tx/h,d.ty/u),f.invert(),l.uniforms.uMapCoord=n.mapCoord,l.uniforms.uClampFrame=n.uClampFrame,l.uniforms.uClampOffset=n.uClampOffset,l.uniforms.uTextureTransform=f,l.uniforms.uSizeAnchor[0]=h,l.uniforms.uSizeAnchor[1]=u,l.uniforms.uSizeAnchor[2]=e.view.anchor.x,l.uniforms.uSizeAnchor[3]=e.view.anchor.y,l.update()}}_getGpuTilingSprite(e){return this._gpuTilingSprite[e.uid]||this._initGpuTilingSprite(e)}_initGpuTilingSprite(e){const t=e.view,i=t.texture.source.style;i.addressMode="repeat",i.update();const n=new cr({geometry:yx,shader:new Yd({texture:t.texture})}),s=new Si({original:e,view:n}),o=new R,a={meshRenderable:s,textureMatrix:o};return this._gpuTilingSprite[e.uid]=a,a}_getBatchedTilingSprite(e){return this._gpuBatchedTilingSprite[e.uid]||this._initBatchedTilingSprite(e)}_initBatchedTilingSprite(e){const t=new cr({geometry:new go,texture:e.view.texture}),i=new Si({original:e,view:t});return this._gpuBatchedTilingSprite[e.uid]=i,i}_updateBatchPositions(e){const t=this._getBatchedTilingSprite(e),i=e.view,n=t.view.geometry.getBuffer("aPosition").data,s=i.anchor.x,o=i.anchor.y;n[0]=-s*i.width,n[1]=-o*i.height,n[2]=(1-s)*i.width,n[3]=-o*i.height,n[4]=(1-s)*i.width,n[5]=(1-o)*i.height,n[6]=-s*i.width,n[7]=(1-o)*i.height}_updateBatchUvs(e){const t=e.view,i=t.texture.frameWidth,n=t.texture.frameHeight,s=this._getBatchedTilingSprite(e).view.geometry.getBuffer("aUV").data;let o=0,a=0;t._applyAnchorToTexture&&(o=t.anchor.x,a=t.anchor.y),s[0]=s[6]=-o,s[2]=s[4]=1-o,s[1]=s[3]=-a,s[5]=s[7]=1-a;const l=R.shared;l.copyFrom(t._tileTransform.matrix),l.tx/=t.width,l.ty/=t.height,l.invert(),l.scale(t.width/i,t.height/n),Xd(s,2,0,l)}destroy(){this._renderableHash=null,this._gpuTilingSprite=null,this._gpuBatchedTilingSprite=null,this._renderer=null}}bo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"tilingSprite"};function Xd(r,e,t,i){let n=0;const s=r.length/(e||2),o=i.a,a=i.b,l=i.c,h=i.d,u=i.tx,c=i.ty;for(t*=e;n<s;){const p=r[t],d=r[t+1];r[t]=o*p+l*d+u,r[t+1]=a*p+h*d+c,t+=e,n++}}function vo(r,e){const t=r.instructionSet,i=t.instructions;for(let n=0;n<t.instructionSize;n++){const s=i[n];e[s.type].execute(s)}}class yo{constructor(e){this._renderer=e}addLayerGroup(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({projectionMatrix:this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:e.worldTransform,worldColor:e.worldColor}),vo(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}}yo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"layer"};function xo(r,e=[]){e.push(r);for(let t=0;t<r.layerGroupChildren.length;t++)xo(r.layerGroupChildren[t],e);return e}const xx=new q;function _o(r,e=!1){qd(r);const t=r.childrenToUpdate,i=r.updateTick;r.updateTick++;for(const n in t){const s=t[n],o=s.list,a=s.index;for(let l=0;l<a;l++)wo(o[l],i,0);s.index=0}if(e)for(let n=0;n<r.layerGroupChildren.length;n++)_o(r.layerGroupChildren[n],e)}function qd(r){r.layerGroupParent?(r.worldTransform.appendFrom(r.root.layerTransform,r.layerGroupParent.worldTransform),r.worldColor=li(r.root.layerColor,r.layerGroupParent.worldColor)):(r.worldTransform.copyFrom(r.root.layerTransform),r.worldColor=r.root.localColor)}function wo(r,e,t){if(e===r.updateTick)return;r.updateTick=e,r.didChange=!1;const i=r.localTransform;Ge(i,r);const n=r.parent;if(n&&!n.isLayerRoot?(t=t|r._updateFlags,r.layerTransform.appendFrom(i,n.layerTransform),t&&Kd(r,n,t)):(t=r._updateFlags,r.layerTransform.copyFrom(i),t&&Kd(r,xx,t)),!r.isLayerRoot){const s=r.children,o=s.length;for(let l=0;l<o;l++)wo(s[l],e,t);const a=r.layerGroup;r.view&&!a.structureDidChange&&a.updateRenderable(r)}}function Kd(r,e,t){t&Vr&&(r.layerColor=li(r.localColor,e.layerColor)),t&Cn&&(r.layerBlendMode=r.localBlendMode==="inherit"?e.layerBlendMode:r.localBlendMode),t&Yr&&(r.layerVisibleRenderable=r.localVisibleRenderable&e.layerVisibleRenderable),r._updateFlags=0}function Zd(r,e){const{list:t,index:i}=r.childrenRenderablesToUpdate;let n=!1;for(let s=0;s<i;s++){const o=t[s],a=o.view;if(n=e[a.renderPipeId].validateRenderable(o),n)break}return r.structureDidChange=n,n&&(r.childrenRenderablesToUpdate.index=0),n}class To{constructor(e){this._renderer=e}render({container:e,transform:t}){e.layer=!0;const i=this._renderer,n=xo(e.layerGroup,[]),s=i.renderPipes;for(let o=0;o<n.length;o++){const a=n[o];a.runOnRender(),a.instructionSet.renderPipes=s,a.structureDidChange||Zd(a,s),_o(a),a.structureDidChange?(a.structureDidChange=!1,ed(a,s)):_x(a),i.renderPipes.batch.upload(a.instructionSet)}t&&e.layerGroup.worldTransform.copyFrom(t),i.globalUniforms.start({projectionMatrix:i.renderTarget.rootProjectionMatrix,worldTransformMatrix:e.layerGroup.worldTransform}),vo(e.layerGroup,s),s.uniformBatch&&(s.uniformBatch.renderEnd(),s.uniformBuffer.renderEnd())}destroy(){const e=this;e._renderer=null}}To.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"layer"};function _x(r){const{list:e,index:t}=r.childrenRenderablesToUpdate;for(let i=0;i<t;i++){const n=e[i];n.didViewUpdate&&r.updateRenderable(n)}r.childrenRenderablesToUpdate.index=0}class Pi{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null}get blendMode(){return this.sprite.layerBlendMode}packAttributes(e,t,i,n){const s=this.sprite,o=this.texture,a=s.layerTransform,l=a.a,h=a.b,u=a.c,c=a.d,p=a.tx,d=a.ty,f=this.bounds,g=f[1],m=f[0],x=f[3],b=f[2],v=o._layout.uvs,_=s.layerColor;e[i++]=l*m+u*b+p,e[i++]=c*b+h*m+d,e[i++]=v.x0,e[i++]=v.y0,t[i++]=_,e[i++]=n,e[i++]=l*g+u*b+p,e[i++]=c*b+h*g+d,e[i++]=v.x1,e[i++]=v.y1,t[i++]=_,e[i++]=n,e[i++]=l*g+u*x+p,e[i++]=c*x+h*g+d,e[i++]=v.x2,e[i++]=v.y2,t[i++]=_,e[i++]=n,e[i++]=l*m+u*x+p,e[i++]=c*x+h*m+d,e[i++]=v.x3,e[i++]=v.y3,t[i++]=_,e[i++]=n}packIndex(e,t,i){e[t++]=i+0,e[t++]=i+1,e[t++]=i+2,e[t++]=i+0,e[t++]=i+2,e[t++]=i+3}reset(){this.sprite=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}let kt;class So{constructor(e){this._gpuSpriteHash=Object.create(null),this._renderer=e,kt=this._gpuSpriteHash}addRenderable(e,t){const i=this._getGpuSprite(e);e.view._didUpdate&&this._updateBatchableSprite(e,i),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const t=kt[e.uid];e.view._didUpdate&&this._updateBatchableSprite(e,t),t.batcher.updateElement(t)}validateRenderable(e){const t=e.view._texture,i=this._getGpuSprite(e);return i.texture._source!==t._source?!i.batcher.checkAndUpdateTexture(i,t):!1}destroyRenderable(e){const t=kt[e.uid];H.return(t),kt[e.uid]=null}_updateBatchableSprite(e,t){const i=e.view;i._didUpdate=!1,t.bounds=i.bounds,t.texture=i._texture}_getGpuSprite(e){return kt[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=H.get(Pi);return t.sprite=e,t.texture=e.view._texture,t.bounds=e.view.bounds,kt[e.uid]=t,e.view._didUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuSpriteHash)H.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}}So.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"sprite"};const Qd={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:` 
            outColor = vColor * calculateMSDFAlpha(outColor, localUniforms.uDistance);
        `}},Jd={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, distance:f32) -> f32 {
                
                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));
            
                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }
        `}},ep={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, float distance) {
                
                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));
               
                // SDF
                median = min(median, msdfColor.a);
            
                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
           
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                return alpha;
            }

            uniform float uDistance;
        `,main:`

            outColor = vColor * calculateMSDFAlpha(outColor, uDistance);
        `}};class tp extends Ee{constructor(){const e=new te({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new R,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"}}),t=At({name:"sdf-shader",bits:[Jr,ti(Te),Qd,Jd]}),i=Et({name:"sdf-shader",bits:[ei,ri(Te),Mt,ep]});super({glProgram:i,gpuProgram:t,resources:{localUniforms:e,batchSamplers:ii}})}}const rp=["_fontFamily","_fontStyle","_fontVariant","_fontWeight","_breakWords","_align","_leading","_letterSpacing","_lineHeight","_textBaseline","_whiteSpace","_wordWrap","_wordWrapWidth","_padding","_cssOverrides"];function Po(r){const e=[];let t=0;for(let i=0;i<rp.length;i++){const n=rp[i];e[t++]=r[n]}return t=ip(r._fill,e,t),t=wx(r._stroke,e,t),e.join("-")}function ip(r,e,t){var i;return r&&(e[t++]=r.color,e[t++]=r.alpha,e[t++]=(i=r.fill)==null?void 0:i.uid),t}function wx(r,e,t){return r&&(t=ip(r,e,t),e[t++]=r.width,e[t++]=r.alignment,e[t++]=r.cap,e[t++]=r.join,e[t++]=r.miterLimit),t}var Tx=Object.defineProperty,np=Object.getOwnPropertySymbols,Sx=Object.prototype.hasOwnProperty,Px=Object.prototype.propertyIsEnumerable,sp=(r,e,t)=>e in r?Tx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,xr=(r,e)=>{for(var t in e||(e={}))Sx.call(e,t)&&sp(r,t,e[t]);if(np)for(var t of np(e))Px.call(e,t)&&sp(r,t,e[t]);return r};const Ft=class extends ue{constructor(r={}){super(),Ax(r);const e=xr(xr({},Ft.defaultTextStyle),r);for(const t in Ft.defaultTextStyle){const i=t;this[i]=e[t]}this.dropShadow=null,typeof e.fill=="string"?this.fontSize=parseInt(e.fontSize,10):this.fontSize=e.fontSize,r.dropShadow&&(r.dropShadow instanceof Boolean?r.dropShadow===!0&&(this.dropShadow=xr({},Ft.defaultTextStyle.dropShadow)):this.dropShadow=xr(xr({},Ft.defaultTextStyle.dropShadow),r.dropShadow)),this.update()}get align(){return this._align}set align(r){this._align=r,this.update()}get breakWords(){return this._breakWords}set breakWords(r){this._breakWords=r,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(r){this._dropShadow=r,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(r){this._fontFamily=r,this.update()}get fontSize(){return this._fontSize}set fontSize(r){this._fontSize=r,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(r){this._fontStyle=r,this.update()}get fontVariant(){return this._fontVariant}set fontVariant(r){this._fontVariant=r,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(r){this._fontWeight=r,this.update()}get leading(){return this._leading}set leading(r){this._leading=r,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(r){this._letterSpacing=r,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(r){this._lineHeight=r,this.update()}get padding(){return this._padding}set padding(r){this._padding=r,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(r){this._textBaseline=r,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(r){this._whiteSpace=r,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(r){this._wordWrap=r,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(r){this._wordWrapWidth=r,this.update()}get fill(){return this._originalFill}set fill(r){r!==this._originalFill&&(this._originalFill=r,this._fill=at(r,He.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(r){r!==this._originalFill&&(this._originalFill=r,this._stroke=at(r,He.defaultStrokeStyle),this.update())}_generateKey(){return this._styleKey=Po(this),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}get styleKey(){return this._styleKey||this._generateKey()}clone(){return new Ft({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(r=!1){var e,t,i,n;if(this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const s=typeof r=="boolean"?r:r==null?void 0:r.textureSource;(e=this._fill)!=null&&e.texture&&this._fill.texture.destroy(s),(t=this._originalFill)!=null&&t.texture&&this._originalFill.texture.destroy(s),(i=this._stroke)!=null&&i.texture&&this._stroke.texture.destroy(s),(n=this._originalStroke)!=null&&n.texture&&this._originalStroke.texture.destroy(s)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}};let mt=Ft;mt.defaultTextStyle={align:"left",breakWords:!1,dropShadow:{alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5},fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};function Ax(r){var e,t;const i=r;if(typeof i.dropShadow=="boolean"&&(O(z,"dropShadow is now an object, not a boolean"),r.dropShadow={alpha:(e=i.dropShadowAlpha)!=null?e:1,angle:i.dropShadowAngle,blur:(t=i.dropShadowBlur)!=null?t:0,color:i.dropShadowColor,distance:i.dropShadowDistance}),i.strokeThickness){O(z,"strokeThickness is now a part of stroke");const n=i.stroke;r.stroke={color:n,width:i.strokeThickness}}if(Array.isArray(i.fill)){O(z,"gradient fill is now a fill pattern: `new FillGradient(...)`");const n=new Yt(0,0,0,r.fontSize*1.7),s=i.fill.map(o=>j.shared.setValue(o).toNumber());s.forEach((o,a)=>{var l;const h=(l=i.fillGradientStops[a])!=null?l:a/s.length;n.addColorStop(h,o)}),r.fill={fill:n}}}class op{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,t){const i=D.ADAPTER.createCanvas();i.width=e,i.height=t;const n=i.getContext("2d");return{canvas:i,context:n}}getOptimalCanvasAndContext(e,t,i=1){e=Math.ceil(e*i-1e-6),t=Math.ceil(t*i-1e-6),e=ut(e),t=ut(t);const n=(e<<17)+(t<<1);this._canvasPool[n]||(this._canvasPool[n]=[]);let s=this._canvasPool[n].pop();return s||(s=this._createCanvasAndContext(e,t)),s}returnCanvasAndContext(e){const{width:t,height:i}=e.canvas,n=(t<<17)+(i<<1);this._canvasPool[n].push(e)}clear(){this._canvasPool={}}}const De=new op,Ex=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function _r(r){const e=typeof r.fontSize=="number"?`${r.fontSize}px`:r.fontSize;let t=r.fontFamily;Array.isArray(r.fontFamily)||(t=r.fontFamily.split(","));for(let i=t.length-1;i>=0;i--){let n=t[i].trim();!/([\"\'])[^\'\"]+\1/.test(n)&&!Ex.includes(n)&&(n=`"${n}"`),t[i]=n}return`${r.fontStyle} ${r.fontVariant} ${r.fontWeight} ${e} ${t.join(",")}`}const Ao={willReadFrequently:!0},C=class{static get experimentalLetterSpacingSupported(){let r=C._experimentalLetterSpacingSupported;if(r!==void 0){const e=D.ADAPTER.getCanvasRenderingContext2D().prototype;r=C._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return r}constructor(r,e,t,i,n,s,o,a,l){this.text=r,this.style=e,this.width=t,this.height=i,this.lines=n,this.lineWidths=s,this.lineHeight=o,this.maxLineWidth=a,this.fontProperties=l}static measureText(r=" ",e,t=C._canvas,i=e.wordWrap){var n;const s=`${r}:${e.styleKey}`;if(C._measurementCache[s])return C._measurementCache[s];const o=_r(e),a=C.measureFont(o);a.fontSize===0&&(a.fontSize=e.fontSize,a.ascent=e.fontSize);const l=C.__context;l.font=o;const h=(i?C._wordWrap(r,e,t):r).split(/(?:\r\n|\r|\n)/),u=new Array(h.length);let c=0;for(let m=0;m<h.length;m++){const x=C._measureText(h[m],e.letterSpacing,l);u[m]=x,c=Math.max(c,x)}const p=((n=e._stroke)==null?void 0:n.width)||0;let d=c+p;e.dropShadow&&(d+=e.dropShadow.distance);const f=e.lineHeight||a.fontSize+p;let g=Math.max(f,a.fontSize+p*2)+(h.length-1)*(f+e.leading);return e.dropShadow&&(g+=e.dropShadow.distance),new C(r,e,d,g,h,u,f+e.leading,c,a)}static _measureText(r,e,t){let i=!1;C.experimentalLetterSpacingSupported&&(C.experimentalLetterSpacing?(t.letterSpacing=`${e}px`,t.textLetterSpacing=`${e}px`,i=!0):(t.letterSpacing="0px",t.textLetterSpacing="0px"));let n=t.measureText(r).width;return n>0&&(i?n-=e:n+=(C.graphemeSegmenter(r).length-1)*e),n}static _wordWrap(r,e,t=C._canvas){const i=t.getContext("2d",Ao);let n=0,s="",o="";const a=Object.create(null),{letterSpacing:l,whiteSpace:h}=e,u=C._collapseSpaces(h),c=C._collapseNewlines(h);let p=!u;const d=e.wordWrapWidth+l,f=C._tokenize(r);for(let g=0;g<f.length;g++){let m=f[g];if(C._isNewline(m)){if(!c){o+=C._addLine(s),p=!u,s="",n=0;continue}m=" "}if(u){const b=C.isBreakingSpace(m),v=C.isBreakingSpace(s[s.length-1]);if(b&&v)continue}const x=C._getFromCache(m,l,a,i);if(x>d)if(s!==""&&(o+=C._addLine(s),s="",n=0),C.canBreakWords(m,e.breakWords)){const b=C.wordWrapSplit(m);for(let v=0;v<b.length;v++){let _=b[v],S=_,k=1;for(;b[v+k];){const A=b[v+k];if(!C.canBreakChars(S,A,m,v,e.breakWords))_+=A;else break;S=A,k++}v+=k-1;const M=C._getFromCache(_,l,a,i);M+n>d&&(o+=C._addLine(s),p=!1,s="",n=0),s+=_,n+=M}}else{s.length>0&&(o+=C._addLine(s),s="",n=0);const b=g===f.length-1;o+=C._addLine(m,!b),p=!1,s="",n=0}else x+n>d&&(p=!1,o+=C._addLine(s),s="",n=0),(s.length>0||!C.isBreakingSpace(m)||p)&&(s+=m,n+=x)}return o+=C._addLine(s,!1),o}static _addLine(r,e=!0){return r=C._trimRight(r),r=e?`${r}
`:r,r}static _getFromCache(r,e,t,i){let n=t[r];return typeof n!="number"&&(n=C._measureText(r,e,i)+e,t[r]=n),n}static _collapseSpaces(r){return r==="normal"||r==="pre-line"}static _collapseNewlines(r){return r==="normal"}static _trimRight(r){if(typeof r!="string")return"";for(let e=r.length-1;e>=0;e--){const t=r[e];if(!C.isBreakingSpace(t))break;r=r.slice(0,-1)}return r}static _isNewline(r){return typeof r!="string"?!1:C._newlines.includes(r.charCodeAt(0))}static isBreakingSpace(r,e){return typeof r!="string"?!1:C._breakingSpaces.includes(r.charCodeAt(0))}static _tokenize(r){const e=[];let t="";if(typeof r!="string")return e;for(let i=0;i<r.length;i++){const n=r[i],s=r[i+1];if(C.isBreakingSpace(n,s)||C._isNewline(n)){t!==""&&(e.push(t),t=""),e.push(n);continue}t+=n}return t!==""&&e.push(t),e}static canBreakWords(r,e){return e}static canBreakChars(r,e,t,i,n){return!0}static wordWrapSplit(r){return C.graphemeSegmenter(r)}static measureFont(r){if(C._fonts[r])return C._fonts[r];const e=C._context;e.font=r;const t=e.measureText(C.METRICS_STRING+C.BASELINE_SYMBOL),i={ascent:t.actualBoundingBoxAscent,descent:t.actualBoundingBoxDescent,fontSize:t.actualBoundingBoxAscent+t.actualBoundingBoxDescent};return C._fonts[r]=i,i}static clearMetrics(r=""){r?delete C._fonts[r]:C._fonts={}}static get _canvas(){if(!C.__canvas){let r;try{const e=new OffscreenCanvas(0,0),t=e.getContext("2d",Ao);if(t!=null&&t.measureText)return C.__canvas=e,e;r=D.ADAPTER.createCanvas()}catch(e){r=D.ADAPTER.createCanvas()}r.width=r.height=10,C.__canvas=r}return C.__canvas}static get _context(){return C.__context||(C.__context=C._canvas.getContext("2d",Ao)),C.__context}};let ie=C;ie.METRICS_STRING="|\xC9q\xC5",ie.BASELINE_SYMBOL="M",ie.BASELINE_MULTIPLIER=1.4,ie.HEIGHT_MULTIPLIER=2,ie.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const r=new Intl.Segmenter;return e=>[...r.segment(e)].map(t=>t.segment)}return r=>[...r]})(),ie.experimentalLetterSpacing=!1,ie._fonts={},ie._newlines=[10,13],ie._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],ie._measurementCache={};function wr(r,e){if(r.texture===P.WHITE&&!r.fill)return j.shared.setValue(r.color).toHex();if(r.fill){if(r.fill instanceof dn){const t=r.fill,i=e.createPattern(t.texture.source.resource,"repeat"),n=t.transform.copyTo(R.shared);return n.scale(t.texture.frameWidth,t.texture.frameHeight),i.setTransform(n),i}else if(r.fill instanceof Yt){const t=r.fill;if(t.type==="linear"){const i=e.createLinearGradient(t.x0,t.y0,t.x1,t.y1);return t.gradientStops.forEach(n=>{i.addColorStop(n.offset,j.shared.setValue(n.color).toHex())}),i}}}else{const t=e.createPattern(r.texture.source.resource,"repeat"),i=r.matrix.copyTo(R.shared);return i.scale(r.texture.frameWidth,r.texture.frameHeight),t.setTransform(i),t}return"red"}function Eo(r){if(r==="")return[];typeof r=="string"&&(r=[r]);const e=[];for(let t=0,i=r.length;t<i;t++){const n=r[t];if(Array.isArray(n)){if(n.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${n.length}.`);if(n[0].length===0||n[1].length===0)throw new Error("[BitmapFont]: Invalid character delimiter.");const s=n[0].charCodeAt(0),o=n[1].charCodeAt(0);if(o<s)throw new Error("[BitmapFont]: Invalid character range.");for(let a=s,l=o;a<=l;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(n))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}class Ai extends qi{constructor(e){var t,i,n;super(),this.resolution=1,this.pages=[],this._padding=4,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentPageIndex=-1,this._skipKerning=!1;const s=e,o=s.style.clone();o.fontSize=this.baseMeasurementFontSize,s.overrideFill&&(o._fill.color=16777215,o._fill.alpha=1,o._fill.texture=P.WHITE,o._fill.fill=null),this._style=o,this._skipKerning=(t=s.skipKerning)!=null?t:!1,this.resolution=(i=s.resolution)!=null?i:1,this._padding=(n=s.padding)!=null?n:4;const a=_r(o),l=this;l.fontMetrics=ie.measureFont(a),l.lineHeight=o.lineHeight||this.fontMetrics.fontSize||o.fontSize}ensureCharacters(e){var t,i,n,s;const o=Eo(e).filter(v=>!this._currentChars.includes(v)).filter((v,_,S)=>S.indexOf(v)===_);if(!o.length)return;this._currentChars=[...this._currentChars,...o];let a;this._currentPageIndex===-1?a=this._nextPage():a=this.pages[this._currentPageIndex];let{canvas:l,context:h}=a.canvasAndContext,u=a.texture.source;const c=this._style;let p=this._currentX,d=this._currentY;const f=this.baseRenderedFontSize/this.baseMeasurementFontSize,g=this._padding*f,m=c.fontStyle==="italic"?2:1;let x=0,b=!1;for(let v=0;v<o.length;v++){const _=o[v],S=ie.measureText(_,c,l,!1),k=m*S.width*f,M=S.height*f,A=k+g*2,w=M+g*2;if(b=!1,_!==`
`&&_!=="\r"&&_!=="	"&&_!==" "&&(b=!0,x=Math.ceil(Math.max(w,x))),p+A>512&&(d+=x,x=w,p=0,d+x>512)){u.update();const L=this._nextPage();l=L.canvasAndContext.canvas,h=L.canvasAndContext.context,u=L.texture.source,d=0}const T=k/f-((i=(t=c.dropShadow)==null?void 0:t.distance)!=null?i:0)-((s=(n=c._stroke)==null?void 0:n.width)!=null?s:0);if(this.chars[_]={id:_.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:T,kerning:{}},b){this._drawGlyph(h,S,p+g,d+g,f,c);const L=u.width*f,G=u.height*f,B=new K(p/L,d/G,A/L,w/G);this.chars[_].texture=new P({source:u,layout:{frame:B}}),p+=Math.ceil(A)}}u.update(),this._currentX=p,this._currentY=d,this._skipKerning&&this._applyKerning(o,h)}get pageTextures(){return O(z,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,t){const i=this._measureCache;for(let n=0;n<e.length;n++){const s=e[n];for(let o=0;o<this._currentChars.length;o++){const a=this._currentChars[o];let l=i[s];l||(l=i[s]=t.measureText(s).width);let h=i[a];h||(h=i[a]=t.measureText(a).width);let u=t.measureText(s+a).width,c=u-(l+h);c&&(this.chars[s].kerning[a]=c),u=t.measureText(s+a).width,c=u-(l+h),c&&(this.chars[a].kerning[s]=c)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,t=De.getOptimalCanvasAndContext(512,512,e);this._setupContext(t.context,this._style,e);const i=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),n=new P({source:new Vt({resource:t.canvas,resolution:i,alphaMode:"premultiply-alpha-on-upload"})}),s={canvasAndContext:t,texture:n};return this.pages[this._currentPageIndex]=s,s}_setupContext(e,t,i){var n;t.fontSize=this.baseRenderedFontSize,e.scale(i,i),e.font=_r(t),t.fontSize=this.baseMeasurementFontSize,e.textBaseline=t.textBaseline;const s=t._stroke,o=(n=s==null?void 0:s.width)!=null?n:0;if(s&&(e.lineWidth=o,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=wr(s,e)),t._fill&&(e.fillStyle=wr(t._fill,e)),t.dropShadow){const a=t.dropShadow,l=j.shared.setValue(a.color).toArray(),h=a.blur*i,u=a.distance*i;e.shadowColor=`rgba(${l[0]*255},${l[1]*255},${l[2]*255},${a.alpha})`,e.shadowBlur=h,e.shadowOffsetX=Math.cos(a.angle)*u,e.shadowOffsetY=Math.sin(a.angle)*u}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,t,i,n,s,o){var a;const l=t.text,h=t.fontProperties,u=o._stroke,c=((a=u==null?void 0:u.width)!=null?a:0)*s,p=i+c/2,d=n-c/2,f=h.descent*s,g=t.lineHeight*s;o.stroke&&c&&e.strokeText(l,p,d+g-f),o._fill&&e.fillText(l,p,d+g-f)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:t,texture:i}=this.pages[e];De.returnCanvasAndContext(t),i.destroy(!0)}this.pages=null}}function Co(r,e,t){const i={width:0,height:0,offsetY:0,scale:e.fontSize/t.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};i.offsetY=t.baseLineOffset;let n=i.lines[0],s=null,o=!0;const a={spaceWord:!1,width:0,start:0,index:0,positions:[],chars:[]},l=d=>{const f=n.width;for(let g=0;g<a.index;g++){const m=d.positions[g];n.chars.push(d.chars[g]),n.charPositions.push(m+f)}n.width+=d.width,o=!1,a.width=0,a.index=0,a.chars.length=0},h=()=>{let d=n.chars.length-1,f=n.chars[d];for(;f===" ";)n.width-=t.chars[f].xAdvance,f=n.chars[--d];i.width=Math.max(i.width,n.width),n={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},o=!0,i.lines.push(n),i.height+=t.lineHeight},u=t.baseMeasurementFontSize/e.fontSize,c=e.letterSpacing*u,p=e.wordWrapWidth*u;for(let d=0;d<r.length+1;d++){let f;const g=d===r.length;g||(f=r[d]);const m=t.chars[f];if(/(?:\s)/.test(f)||f==="\r"||f===`
`||g){if(!o&&e.wordWrap&&n.width+a.width-c>p?(h(),l(a),g||n.charPositions.push(0)):(a.start=n.width,l(a),g||n.charPositions.push(0)),f==="\r"||f===`
`)n.width!==0&&h();else if(!g){const x=m.xAdvance+(m.kerning[s]||0)+c;n.width+=x,n.spaceWidth=x,n.spacesIndex.push(n.charPositions.length),n.chars.push(f)}}else{const x=m.kerning[s]||0,b=m.xAdvance+x+c;a.positions[a.index++]=a.width+x,a.chars.push(f),a.width+=b}s=f}return h(),e.align==="center"?Cx(i):e.align==="right"?Mx(i):e.align==="justify"&&Bx(i),i}function Cx(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],i=r.width/2-t.width/2;for(let n=0;n<t.charPositions.length;n++)t.charPositions[n]+=i}}function Mx(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],i=r.width-t.width;for(let n=0;n<t.charPositions.length;n++)t.charPositions[n]+=i}}function Bx(r){const e=r.width;for(let t=0;t<r.lines.length;t++){const i=r.lines[t];let n=0,s=i.spacesIndex[n++],o=0;const a=i.spacesIndex.length,l=(e-i.width)/a;for(let h=0;h<i.charPositions.length;h++)h===s&&(s=i.spacesIndex[n++],o+=l),i.charPositions[h]+=o}}var Rx=Object.defineProperty,ap=Object.getOwnPropertySymbols,kx=Object.prototype.hasOwnProperty,Fx=Object.prototype.propertyIsEnumerable,lp=(r,e,t)=>e in r?Rx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Mo=(r,e)=>{for(var t in e||(e={}))kx.call(e,t)&&lp(r,t,e[t]);if(ap)for(var t of ap(e))Fx.call(e,t)&&lp(r,t,e[t]);return r};class Ox{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1}}getFont(e,t){var i;let n=t.fontFamily,s=!0;t._fill.fill&&(n+=t._fill.fill.uid,s=!1),re.has(n)||re.set(n,new Ai(Mo({style:t,overrideFill:s},this.defaultOptions)));const o=re.get(n);return(i=o.ensureCharacters)==null||i.call(o,e),o}getLayout(e,t){const i=this.getFont(e,t);return Co(e.split(""),t,i)}measureText(e,t){return this.getLayout(e,t)}install(e,t,i){if(!e)throw new Error("[BitmapFontManager] Property `name` is required.");i=Mo(Mo({},this.defaultOptions),i);const n=t instanceof mt?t:new mt(t),s=n._fill.fill!==null&&n._fill.fill!==void 0,o=new Ai({style:n,overrideFill:s,skipKerning:i.skipKerning,padding:i.padding,resolution:i.resolution}),a=Eo(i.chars);return o.ensureCharacters(a.join("")),re.set(e,o),o}}const Bo=new Ox;class Ux extends Si{constructor(){super({view:new Fs})}}class Ro{constructor(e){this._gpuBitmapText={},this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,t.view.context)),this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const i=this._getGpuBitmapText(e);e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,i.view.context)),this._renderer.renderPipes.graphics.addRenderable(i,t),i.view.context.customShader&&this._updateDistanceField(e)}destroyRenderable(e){this._destroyRenderableByUid(e.uid)}_destroyRenderableByUid(e){H.return(this._gpuBitmapText[e]),this._gpuBitmapText[e]=null}updateRenderable(e){const t=this._getGpuBitmapText(e);this._renderer.renderPipes.graphics.updateRenderable(t),t.view.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){var i;const n=e.view,s=Bo.getFont(n.text,n._style);t.clear(),s.distanceField.type!=="none"&&(t.customShader||(this._sdfShader||(this._sdfShader=new tp),t.customShader=this._sdfShader));const o=Array.from(n.text),a=n._style;let l=(((i=a._stroke)==null?void 0:i.width)||0)/2;l+=s.baseLineOffset;const h=Co(o,a,s);let u=0;const c=a.padding,p=h.scale;t.translate(-n.anchor._x*h.width-c,-n.anchor._y*(h.height+h.offsetY)-c).scale(p,p);const d=a._fill.color;for(let f=0;f<h.lines.length;f++){const g=h.lines[f];for(let m=0;m<g.charPositions.length;m++){const x=o[u++],b=s.chars[x];b!=null&&b.texture&&t.texture(b.texture,d,Math.round(g.charPositions[m]+b.xOffset),Math.round(l+b.yOffset))}l+=s.lineHeight}}_getGpuBitmapText(e){return this._gpuBitmapText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t=H.get(Ux,e);return this._gpuBitmapText[e.uid]=t,this._updateContext(e,t.view.context),e.on("destroyed",()=>{this.destroyRenderable(e)}),this._gpuBitmapText[e.uid]}_updateDistanceField(e){var t;const i=this._getGpuBitmapText(e).view.context,n=e.view,s=n._style.fontFamily,o=re.get(s),{a,b:l,c:h,d:u}=e.layerTransform,c=Math.sqrt(a*a+l*l),p=Math.sqrt(h*h+u*u),d=(Math.abs(c)+Math.abs(p))/2,f=o.baseRenderedFontSize/n._style.fontSize,g=(t=n.resolution)!=null?t:this._renderer.resolution,m=d*o.distanceField.range*(1/f)*g;i.customShader.resources.localUniforms.uniforms.uDistance=m}destroy(){var e;for(const t in this._gpuBitmapText)this._destroyRenderableByUid(t);this._gpuBitmapText=null,(e=this._sdfShader)==null||e.destroy(!0),this._sdfShader=null,this._renderer=null}}Ro.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"bitmapText"};class ko{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){var t;const i=this._getGpuText(e),n=e.view._getKey();if(i.currentKey!==n){const s=e.view,o=(t=s.resolution)!=null?t:this._renderer.resolution,{width:a,height:l}=this._renderer.canvasText.getTextureSize(s.text,o,s._style);return!(this._renderer.canvasText.getReferenceCount(i.currentKey)===1&&a===i.texture._source.width&&l===i.texture._source.height)}return!1}addRenderable(e,t){const i=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.canvasText.decreaseReferenceCount(t.currentKey),H.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),i=this._getGpuText(e),n=i.batchableSprite;i.currentKey!==t&&this._updateGpuText(e),e.view._didUpdate=!1;const s=e.view._style.padding;rr(n.bounds,e.view.anchor,n.texture,s)}_updateGpuText(e){var t;const i=this._getGpuText(e),n=i.batchableSprite,s=e.view;i.texture&&this._renderer.canvasText.decreaseReferenceCount(i.currentKey);const o=(t=s.resolution)!=null?t:this._renderer.resolution;i.texture=n.texture=this._renderer.canvasText.getTexture(s.text,o,s._style,s._getKey()),i.currentKey=s._getKey(),n.texture=i.texture}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t={texture:null,currentKey:"--",batchableSprite:H.get(Pi)};return t.batchableSprite.sprite=e,t.batchableSprite.bounds=[0,1,0,0],this._gpuText[e.uid]=t,this._updateText(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}ko.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"text"};const Ix=new ce;class Fo{constructor(){this._activeTextures={}}getTextureSize(e,t,i){const n=ie.measureText(e||" ",i);let s=Math.ceil(Math.ceil(Math.max(1,n.width)+i.padding*2)*t),o=Math.ceil(Math.ceil(Math.max(1,n.height)+i.padding*2)*t);return s=Math.ceil(s-1e-6),o=Math.ceil(o-1e-6),s=ut(s),o=ut(o),{width:s,height:o}}getTexture(e,t,i,n){if(this._activeTextures[n])return this._increaseReferenceCount(n),this._activeTextures[n].texture;const s=ie.measureText(e||" ",i),o=Math.ceil(Math.ceil(Math.max(1,s.width)+i.padding*2)*t),a=Math.ceil(Math.ceil(Math.max(1,s.height)+i.padding*2)*t),l=De.getOptimalCanvasAndContext(o,a),{canvas:h}=l;this.renderTextToCanvas(e,i,t,l);const u=Ix;u.minX=0,u.minY=0,u.maxX=h.width/t|0,u.maxY=h.height/t|0;const c=le.getOptimalTexture(u.width,u.height,t,!1);return c.source.uploadMethodId="image",c.source.resource=h,c.frameWidth=o/t,c.frameHeight=a/t,c.source.update(),c.layout.updateUvs(),this._activeTextures[n]={canvasAndContext:l,texture:c,usageCount:1},c}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(De.returnCanvasAndContext(t.canvasAndContext),le.returnTexture(t.texture),t.texture.source.resource=null,t.texture.source.uploadMethodId="unknown",this._activeTextures[e]=null)}getReferenceCount(e){return this._activeTextures[e].usageCount}renderTextToCanvas(e,t,i,n){var s,o,a,l,h,u;const{canvas:c,context:p}=n,d=_r(t),f=ie.measureText(e||" ",t),g=f.lines,m=f.lineHeight,x=f.lineWidths,b=f.maxLineWidth,v=f.fontProperties,_=c.height;if(p.resetTransform(),p.scale(i,i),p.clearRect(0,0,f.width+4,f.height+4),(s=t._stroke)!=null&&s.width){const A=t._stroke;p.lineWidth=A.width,p.miterLimit=A.miterLimit,p.lineJoin=A.join,p.lineCap=A.cap}p.font=d;let S,k;const M=t.dropShadow?2:1;for(let A=0;A<M;++A){const w=t.dropShadow&&A===0,T=w?Math.ceil(Math.max(1,_)+t.padding*2):0,L=T*i;if(w){p.fillStyle="black",p.strokeStyle="black";const E=t.dropShadow,X=E.color,Q=E.alpha;p.shadowColor=j.shared.setValue(X).setAlpha(Q).toRgbaString();const me=E.blur*i,It=E.distance*i;p.shadowBlur=me,p.shadowOffsetX=Math.cos(E.angle)*It,p.shadowOffsetY=Math.sin(E.angle)*It+L}else p.globalAlpha=(a=(o=t._fill)==null?void 0:o.alpha)!=null?a:1,p.fillStyle=t._fill?wr(t._fill,p):null,(l=t._stroke)!=null&&l.width&&(p.strokeStyle=wr(t._stroke,p)),p.shadowColor="black";let G=(m-v.fontSize)/2;m-v.fontSize<0&&(G=0);const B=(u=(h=t._stroke)==null?void 0:h.width)!=null?u:0;for(let E=0;E<g.length;E++)S=B/2,k=B/2+E*m+v.ascent+G,t.align==="right"?S+=b-x[E]:t.align==="center"&&(S+=(b-x[E])/2),t._stroke&&this._drawLetterSpacing(g[E],t,n,S+t.padding,k+t.padding-T,!0),t._fill!==void 0&&this._drawLetterSpacing(g[E],t,n,S+t.padding,k+t.padding-T)}}_drawLetterSpacing(e,t,i,n,s,o=!1){const{context:a}=i,l=t.letterSpacing;let h=!1;if(ie.experimentalLetterSpacingSupported&&(ie.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,h=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||h){o?a.strokeText(e,n,s):a.fillText(e,n,s);return}let u=n;const c=ie.graphemeSegmenter(e);let p=a.measureText(e).width,d=0;for(let f=0;f<c.length;++f){const g=c[f];o?a.strokeText(g,u,s):a.fillText(g,u,s);let m="";for(let x=f+1;x<c.length;++x)m+=c[x];d=a.measureText(m).width,u+=p-d+l,p=d}}destroy(){this._activeTextures=null}}Fo.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"canvasText"};class Oo{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),i=e.view._getKey();return t.textureNeedsUploading?(t.textureNeedsUploading=!1,!0):t.currentKey!==i}addRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(t)}updateRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.htmlText.decreaseReferenceCount(t.currentKey),H.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),i=this._getGpuText(e),n=i.batchableSprite;i.currentKey!==t&&this._updateGpuText(e).catch(o=>{console.error(o)}),e.view._didUpdate=!1;const s=e.view._style.padding;rr(n.bounds,e.view.anchor,n.texture,s)}async _updateGpuText(e){var t;e.view._didUpdate=!1;const i=this._getGpuText(e);if(i.generatingTexture)return;const n=e.view._getKey();this._renderer.htmlText.decreaseReferenceCount(i.currentKey),i.generatingTexture=!0,i.currentKey=n;const s=e.view,o=(t=s.resolution)!=null?t:this._renderer.resolution,a=await this._renderer.htmlText.getManagedTexture(s.text,o,s._style,s._getKey()),l=i.batchableSprite;l.texture=i.texture=a,i.generatingTexture=!1,i.textureNeedsUploading=!0,e.view.onUpdate();const h=e.view._style.padding;rr(l.bounds,e.view.anchor,l.texture,h)}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t={texture:P.EMPTY,currentKey:"--",batchableSprite:H.get(Pi),textureNeedsUploading:!1,generatingTexture:!1};return t.batchableSprite.sprite=e,t.batchableSprite.texture=P.EMPTY,t.batchableSprite.bounds=[0,1,0,0],this._gpuText[e.uid]=t,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}Oo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"htmlText"};function hp(){const{userAgent:r}=D.ADAPTER.getNavigator();return/^((?!chrome|android).)*safari/i.test(r)}function up(r,e){const t=/font-family:([^;"\s]+)/g,i=r.match(t),n=[e],s={};return s[e]=!0,i&&i.forEach(o=>{const a=o.split(":")[1].trim();s[a]||(n.push(a),s[a]=!0)}),n}async function cp(r){const e=await(await D.ADAPTER.fetch(r)).blob(),t=new FileReader;return await new Promise((i,n)=>{t.onloadend=()=>i(t.result),t.onerror=n,t.readAsDataURL(e)})}async function Uo(r,e){const t=await cp(e);return`@font-face {
        font-family: "${r.fontFamily}";
        src: url('${t}');
        font-weight: ${r.fontWeight};
        font-style: ${r.fontStyle};
    }`}var Gx=Object.defineProperty,$x=Object.defineProperties,Lx=Object.getOwnPropertyDescriptors,dp=Object.getOwnPropertySymbols,Dx=Object.prototype.hasOwnProperty,zx=Object.prototype.propertyIsEnumerable,pp=(r,e,t)=>e in r?Gx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Nx=(r,e)=>{for(var t in e||(e={}))Dx.call(e,t)&&pp(r,t,e[t]);if(dp)for(var t of dp(e))zx.call(e,t)&&pp(r,t,e[t]);return r},Hx=(r,e)=>$x(r,Lx(e));async function fp(r,e){const t=r.filter(i=>re.has(i)).map((i,n)=>{if(!Tr.has(i)){const{url:s}=re.get(i);n===0?Tr.set(i,Uo(e,s)):Tr.set(i,Uo(Hx(Nx({},Sr.defaultFontOptions),{fontFamily:i}),s))}return Tr.get(i)});return(await Promise.all(t)).join(`
`)}const jx=new ce;function mp(r,e){const t=jx;t.minX=0,t.minY=0,t.maxX=r.width/e|0,t.maxY=r.height/e|0;const i=le.getOptimalTexture(t.width,t.height,e,!1);return i.source.uploadMethodId="image",i.source.resource=r,i.frameWidth=r.width/e,i.frameHeight=r.height/e,i.source.update(),i.layout.updateUvs(),i}function gp(r,e,t,i,n){const{domElement:s,styleElement:o,svgRoot:a}=n;s.innerHTML=r,s.setAttribute("style",`transform: scale(${t});
${e.cssStyle}`),o.textContent=i;const{width:l,height:h}=n.image;return a.setAttribute("width",l.toString()),a.setAttribute("height",h.toString()),new XMLSerializer().serializeToString(a)}function bp(r,e){const t=De.getOptimalCanvasAndContext(r.width,r.height,e),{context:i}=t;return i.clearRect(0,0,r.width,r.height),i.drawImage(r,0,0),De.returnCanvasAndContext(t),t.canvas}function vp(r,e,t){return new Promise(async i=>{t&&await new Promise(n=>setTimeout(n,100)),r.onload=()=>{i()},r.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,r.crossOrigin="anonymous"})}let yp;function xp(r,e,t,i){i=i||yp||(yp=new Io);const{domElement:n,styleElement:s,svgRoot:o}=i;n.innerHTML=r,n.setAttribute("style",e.cssStyle),t&&(s.textContent=t),document.body.appendChild(o);const a=n.getBoundingClientRect();return o.remove(),{width:a.width,height:a.height}}const _p="http://www.w3.org/2000/svg",wp="http://www.w3.org/1999/xhtml",Tr=new Map;class Io{constructor(){this.svgRoot=document.createElementNS(_p,"svg"),this.foreignObject=document.createElementNS(_p,"foreignObject"),this.domElement=document.createElementNS(wp,"div"),this.styleElement=document.createElementNS(wp,"style"),this.image=new Image;const{foreignObject:e,svgRoot:t,styleElement:i,domElement:n}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(i),e.appendChild(n)}}class Sr{constructor(e){this._activeTextures={},this._createCanvas=e.type===Re.WEBGPU}getTexture(e){return this._buildTexturePromise(e.text,e.resolution,e.style)}getManagedTexture(e,t,i,n){if(this._activeTextures[n])return this._increaseReferenceCount(n),this._activeTextures[n].promise;const s=this._buildTexturePromise(e,t,i).then(o=>(this._activeTextures[n].texture=o,o));return this._activeTextures[n]={texture:null,promise:s,usageCount:1},s}async _buildTexturePromise(e,t,i){const n=H.get(Io),s=up(e,i.fontFamily),o=await fp(s,i),a=xp(e,i,o,n),l=Math.ceil(Math.ceil(Math.max(1,a.width)+i.padding*2)*t),h=Math.ceil(Math.ceil(Math.max(1,a.height)+i.padding*2)*t),u=n.image;u.width=l|0,u.height=h|0;const c=gp(e,i,t,o,n);await vp(u,c,hp()&&s.length>0);let p=u;return this._createCanvas&&(p=bp(u,t)),H.return(n),mp(p,t)}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t):t.promise.then(i=>{t.texture=i,this._cleanUp(t)}).catch(()=>{}),this._activeTextures[e]=null))}_cleanUp(e){le.returnTexture(e.texture),e.texture.source.resource=null,e.texture.source.uploadMethodId="unknown"}getReferenceCount(e){return this._activeTextures[e].usageCount}destroy(){this._activeTextures=null}}Sr.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"htmlText"},Sr.defaultFontOptions={fontFamily:"Arial",fontStyle:"normal",fontWeight:"normal"};var Wx=Object.defineProperty,Tp=Object.getOwnPropertySymbols,Vx=Object.prototype.hasOwnProperty,Yx=Object.prototype.propertyIsEnumerable,Sp=(r,e,t)=>e in r?Wx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Pp=(r,e)=>{for(var t in e||(e={}))Vx.call(e,t)&&Sp(r,t,e[t]);if(Tp)for(var t of Tp(e))Yx.call(e,t)&&Sp(r,t,e[t]);return r};const Ap=class{constructor(){this._backgroundColorRgba=[0,0,0,0],this.clearBeforeRender=!0,this._backgroundColor=new j(0),this.color=this._backgroundColor,this.alpha=1}init(r){r=Pp(Pp({},Ap.defaultOptions),r),this.clearBeforeRender=r.clearBeforeRender,this.color=r.background||r.backgroundColor||this._backgroundColor,this.alpha=r.backgroundAlpha}get color(){return this._backgroundColor}set color(r){this._backgroundColor.setValue(r),this._backgroundColorRgba=this._backgroundColor.toArray()}get alpha(){return this._backgroundColor.alpha}set alpha(r){this._backgroundColor.setAlpha(r)}get colorRgba(){return this._backgroundColorRgba}destroy(){}};let Ei=Ap;Ei.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"background",priority:0},Ei.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};class Xx extends ee{constructor(){super({gl:{functions:`
                ${oi}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendColor(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${ai}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class qx extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class Kx extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class Zx extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class Qx extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class Jx extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class e_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class t_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class r_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class i_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class n_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class s_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class o_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class a_ extends ee{constructor(){super({gl:{functions:`
                ${oi}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLuminosity(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${ai}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class l_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class h_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class u_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class c_ extends ee{constructor(){super({gl:{functions:`
                ${oi}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                ${ai}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class d_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class p_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class f_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}const Go={color:Xx,"color-burn":qx,"color-dodge":Kx,darken:Zx,difference:Qx,divide:Jx,exclusion:e_,"hard-light":t_,"hard-mix":r_,lighten:i_,"linear-burn":n_,"linear-dodge":s_,"linear-light":o_,luminosity:a_,negation:l_,overlay:h_,"pin-light":u_,saturation:c_,"soft-light":d_,subtract:p_,"vivid-light":f_};class $o{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,t,i){if(this._activeBlendMode===t){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=t,this._isAdvanced&&this._endAdvancedBlendMode(i),this._isAdvanced=!!Go[t],this._isAdvanced&&(this._beginAdvancedBlendMode(i),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);const t=this._activeBlendMode;if(!Go[t])return;this._filterHash[t]||(this._filterHash[t]=new jr({filters:[new Go[t]]}));const i={type:"filter",action:"pushFilter",renderables:[],filterEffect:this._filterHash[t],canBundle:!1};this._renderableList=i.renderables,e.add(i)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({type:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}$o.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"blendMode"};var m_=Object.defineProperty,Ep=Object.getOwnPropertySymbols,g_=Object.prototype.hasOwnProperty,b_=Object.prototype.propertyIsEnumerable,Cp=(r,e,t)=>e in r?m_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Lo=(r,e)=>{for(var t in e||(e={}))g_.call(e,t)&&Cp(r,t,e[t]);if(Ep)for(var t of Ep(e))b_.call(e,t)&&Cp(r,t,e[t]);return r};const Mp=class{constructor(r){this._renderer=r}_normalizeOptions(r,e={}){return r instanceof q||r instanceof P?Lo({target:r},e):Lo(Lo({},e),r)}async image(r){const e=new Image;return e.src=await this.base64(r),e}async base64(r){r=this._normalizeOptions(r,Mp.defaultImageOptions);const{format:e,quality:t}=r,i=this.canvas(r);if(i.toBlob!==void 0)return new Promise((n,s)=>{i.toBlob(o=>{if(!o){s(new Error("ICanvas.toBlob failed!"));return}const a=new FileReader;a.onload=()=>n(a.result),a.onerror=s,a.readAsDataURL(o)},e,t)});if(i.toDataURL!==void 0)return i.toDataURL(e,t);if(i.convertToBlob!==void 0){const n=await i.convertToBlob({type:e,quality:t});return new Promise((s,o)=>{const a=new FileReader;a.onload=()=>s(a.result),a.onerror=o,a.readAsDataURL(n)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(r){r=this._normalizeOptions(r);const e=r.target,t=this._renderer,i=e instanceof P?e:t.textureGenerator.generateTexture(r),n=t.texture.generateCanvas(i);return e instanceof q&&i.destroy(),n}pixels(r){r=this._normalizeOptions(r);const e=r.target,t=this._renderer,i=e instanceof P?e:t.textureGenerator.generateTexture(r),n=t.texture.getPixels(i);return e instanceof q&&i.destroy(),n}texture(r){return r=this._normalizeOptions(r),r.target instanceof P?r.target:this._renderer.textureGenerator.generateTexture(r)}download(r){var e;r=this._normalizeOptions(r);const t=this.canvas(r),i=document.createElement("a");i.download=(e=r.filename)!=null?e:"image.png",i.href=t.toDataURL("image/png"),document.body.appendChild(i),i.click(),document.body.removeChild(i)}log(r){var e;const t=(e=r.width)!=null?e:200;r=this._normalizeOptions(r);const i=this.canvas(r),n=i.toDataURL();console.log(`[Pixi Texture] ${i.width}px ${i.height}px`);const s=["font-size: 1px;",`padding: ${t}px 300px;`,`background: url(${n}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",s)}destroy(){this._renderer=null}};let Ci=Mp;Ci.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"extract"},Ci.defaultImageOptions={format:"png",quality:1};class Bp extends P{static create(e){return new P({source:new he(e)})}resize(e,t,i){return this.source.resize(e,t,i),this}}var v_=Object.defineProperty,y_=Object.defineProperties,x_=Object.getOwnPropertyDescriptors,Rp=Object.getOwnPropertySymbols,__=Object.prototype.hasOwnProperty,w_=Object.prototype.propertyIsEnumerable,kp=(r,e,t)=>e in r?v_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,T_=(r,e)=>{for(var t in e||(e={}))__.call(e,t)&&kp(r,t,e[t]);if(Rp)for(var t of Rp(e))w_.call(e,t)&&kp(r,t,e[t]);return r},S_=(r,e)=>y_(r,x_(e));const P_=new K,A_=new ce,E_=[0,0,0,0];class Do{constructor(e){this._renderer=e}generateTexture(e){var t;e instanceof q&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const i=e.resolution||this._renderer.resolution,n=e.target;let s=e.clearColor;s?s=Array.isArray(s)&&s.length===4?s:j.shared.setValue(s).toArray():s=E_;const o=((t=e.frame)==null?void 0:t.copyTo(P_))||je(n,A_).rectangle;o.width=Math.max(o.width,1/i)|0,o.height=Math.max(o.height,1/i)|0;const a=Bp.create(S_(T_({},e.textureSourceOptions),{width:o.width,height:o.height,resolution:i})),l=R.shared.translate(-o.x,-o.y);return this._renderer.render({container:n,transform:l,target:a,clearColor:s}),a}destroy(){const e=this;e._renderer=null}}Do.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"textureGenerator"};class zo{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({projectionMatrix:e,worldTransformMatrix:t,worldColor:i,offset:n}){const s=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionMatrix:this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:new R,worldColor:4294967295,offset:new W},o={projectionMatrix:e||this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:t||s.worldTransformMatrix,worldColor:i||s.worldColor,offset:n||s.offset,bindGroup:null},a=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(a);const l=a.uniforms;l.projectionMatrix=o.projectionMatrix,l.worldTransformMatrix.copyFrom(o.worldTransformMatrix),l.worldTransformMatrix.tx-=o.offset.x,l.worldTransformMatrix.ty-=o.offset.y,l.worldAlpha=(o.worldColor>>24&255)/255,a.update();let h;this._renderer.renderPipes.uniformBatch?h=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(a,!1):(this._renderer.uniformBuffer.updateUniformGroup(a),h=this._bindGroupPool.pop()||new Ae,this._activeBindGroups.push(h),h.setResource(a,0)),o.bindGroup=h,this._currentGlobalUniformData=o}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1]}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new te({projectionMatrix:{value:new R,type:"mat3x3<f32>"},worldTransformMatrix:{value:new R,type:"mat3x3<f32>"},worldAlpha:{value:1,type:"f32"}},{ubo:!0,isStatic:!0})}destroy(){const e=this;e._renderer=null}}zo.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"globalUniforms"};const No={f32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"mat2x2<f32>":48,"mat3x3<f32>":48,"mat4x4<f32>":64};function Fp(r){const e=r.map(s=>({data:s,offset:0,size:0}));let t=0,i=0,n=0;for(let s=0;s<e.length;s++){const o=e[s];if(t=No[o.data.type],!t)throw new Error(`Unknown type ${o.data.type}`);if(o.data.size>1&&(t=Math.max(t,16)*o.data.size),o.size=t,i%t!==0&&i<16){const a=i%t%16;i+=a,n+=a}i+t>16?(n=Math.ceil(n/16)*16,o.offset=n,n+=t,i=t):(o.offset=n,i+=t,n+=t)}return n=Math.ceil(n/16)*16,{uboElements:e,size:n}}const Mi=[{type:"mat3x3<f32>",test:r=>r.value.a!==void 0,code:r=>`
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
                `}],C_={f32:`
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
    `};function Op(r){const e=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
    `];let t=0;for(let n=0;n<r.length;n++){const s=r[n],o=s.data.name;let a=!1,l=0;for(let h=0;h<Mi.length;h++)if(Mi[h].test(s.data)){l=s.offset/4,e.push(`offset += ${l-t};`,Mi[h].code(o)),a=!0;break}if(!a)if(s.data.size>1){const h=Math.max(No[s.data.type]/16,1),u=s.data.value.length/s.data.size,c=(4-u%4)%4;l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};

                    let arrayOffset = offset;
                    
                    t = 0;

                    for(var i=0; i < ${s.data.size*h}; i++)
                    {
                        for(var j = 0; j < ${u}; j++)
                        {
                            data[arrayOffset++] = v[t++];
                        }
                        ${c!==0?"arrayOffset += ${remainder};":""}
                    }
                `)}else{const h=C_[s.data.type];l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};
                    ${h};
                `)}t=l}const i=e.join(`
`);return new Function("uv","data","offset",i)}class Ho{constructor(){this._syncFunctionHash=Object.create(null)}ensureUniformGroup(e){e._syncFunction||this._initUniformGroup(e)}_initUniformGroup(e){const t=e.signature;let i=this._syncFunctionHash[t];if(!i){const n=Object.keys(e.uniformStructures).map(a=>e.uniformStructures[a]),s=Fp(n),o=Op(s.uboElements);i=this._syncFunctionHash[t]={layout:s,syncFunction:o}}return e._syncFunction=i.syncFunction,e.buffer=new fe({data:new Float32Array(i.layout.size/4),usage:$.UNIFORM|$.COPY_DST}),e._syncFunction}syncUniformGroup(e,t,i){const n=e._syncFunction||this._initUniformGroup(e);return t||(t=e.buffer.data),i||(i=0),n(e.uniforms,t,i),!0}updateUniformGroup(e){if(e.isStatic&&!e.dirtyId)return!1;e.dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}}Ho.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"uniformBuffer"};let Up=!1;const jo="8.0.0-beta.0";function Ip(r){if(!Up){if(D.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${jo} (${r}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${jo} - ${r} - http://www.pixijs.com/`);Up=!0}}class Bi{constructor(e){this._renderer=e}init(e){e.hello&&Ip(this._renderer.name)}}Bi.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"hello",priority:0},Bi.defaultOptions={hello:!1};var M_=Object.defineProperty,Gp=Object.getOwnPropertySymbols,B_=Object.prototype.hasOwnProperty,R_=Object.prototype.propertyIsEnumerable,$p=(r,e,t)=>e in r?M_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Lp=(r,e)=>{for(var t in e||(e={}))B_.call(e,t)&&$p(r,t,e[t]);if(Gp)for(var t of Gp(e))R_.call(e,t)&&$p(r,t,e[t]);return r};const Dp=class{constructor(r){this._renderer=r,this.count=0,this.checkCount=0}init(r){r=Lp(Lp({},Dp.defaultOptions),r),this.checkCountMax=r.textureGCCheckCountMax,this.maxIdle=r.textureGCAMaxIdle,this.active=r.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const r=this._renderer.texture.managedTextures;for(let e=0;e<r.length;e++){const t=r[e];t.resource&&t.touched>-1&&this.count-t.touched>this.maxIdle&&(t.touched=-1,t.unload())}}destroy(){this._renderer=null}};let Pr=Dp;Pr.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"textureGC"},Pr.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:60*60,textureGCCheckCountMax:600},J.add(Pr);var k_=Object.defineProperty,zp=Object.getOwnPropertySymbols,F_=Object.prototype.hasOwnProperty,O_=Object.prototype.propertyIsEnumerable,Np=(r,e,t)=>e in r?k_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Hp=(r,e)=>{for(var t in e||(e={}))F_.call(e,t)&&Np(r,t,e[t]);if(zp)for(var t of zp(e))O_.call(e,t)&&Np(r,t,e[t]);return r};const jp=class{get resolution(){return this.texture.source._resolution}set resolution(r){this.texture.source.resize(this.texture.source.width,this.texture.source.height,r)}init(r){r=Hp(Hp({},jp.defaultOptions),r),this.screen=new K(0,0,r.width,r.height),this.element=r.element||D.ADAPTER.createCanvas(),this.antialias=!!r.antialias,this.texture=yi(this.element,r),this.multiView=!!r.multiView,this.autoDensity&&(this.element.style.width=`${this.texture.width}px`,this.element.style.height=`${this.texture.height}px`)}resize(r,e,t){this.texture.source.resize(r,e,t),this.screen.width=this.texture.frameWidth,this.screen.height=this.texture.frameHeight,this.autoDensity&&(this.element.style.width=`${r}px`,this.element.style.height=`${e}px`)}destroy(r=!1){(typeof r=="boolean"?r:r!=null&&r.removeView)&&this.element.parentNode&&this.element.parentNode.removeChild(this.element)}};let Ri=jp;Ri.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"view",priority:0},Ri.defaultOptions={width:800,height:600,resolution:D.RESOLUTION,autoDensity:!1,antialias:!1};const Wo=[Ei,ys,Gs,zo,Bi,Ri,Fo,Sr,To,Ho,Pr,Do,Ci],Vo=[$o,gs,So,yo,Ws,$s,ko,Oo,Ro,bo,vs,Ds,Ns,zs],U_=[...Wo,bi,mi,Vs,fo,eo,qs,ao,oo,Zs,ho,to,Ks],I_=[...Vo],G_=[ls,Hs,_s],Wp=[],Vp=[],Yp=[];J.handleByNamedList(y.WebGLSystem,Wp),J.handleByNamedList(y.WebGLPipes,Vp),J.handleByNamedList(y.WebGLPipesAdaptor,Yp),J.add(...U_,...I_,...G_);class Xp extends mo{constructor(){const e={name:"webgl2",type:Re.WEBGL,systems:Wp,renderPipes:Vp,renderPipeAdaptors:Yp};super(e)}}var $_={__proto__:null,WebGLRenderer:Xp};class Yo{constructor(e){this._hash=Object.create(null),this._renderer=e}contextChange(e){this._gpu=e}getBindGroup(e,t,i){return e.updateKey(),this._hash[e.key]||this._createBindGroup(e,t,i)}_createBindGroup(e,t,i){var n;const s=this._gpu.device,o=t.layout[i],a=[];for(const h in o){const u=(n=e.resources[h])!=null?n:e.resources[o[h]];let c;if(u.resourceType==="uniformGroup"){const p=u;this._renderer.uniformBuffer.updateUniformGroup(p);const d=p.buffer;c={buffer:this._renderer.buffer.getGPUBuffer(d),offset:0,size:d.descriptor.size}}else if(u.resourceType==="buffer"){const p=u;c={buffer:this._renderer.buffer.getGPUBuffer(p),offset:0,size:p.descriptor.size}}else if(u.resourceType==="bufferResource"){const p=u;c={buffer:this._renderer.buffer.getGPUBuffer(p.buffer),offset:p.offset,size:p.size}}else if(u.resourceType==="textureSampler"){const p=u;c=this._renderer.texture.getGpuSampler(p)}else if(u.resourceType==="textureSource"){const p=u;c=this._renderer.texture.getGpuSource(p).createView({})}a.push({binding:o[h],resource:c})}const l=s.createBindGroup({layout:t._gpuLayout.bindGroups[i],entries:a});return this._hash[e.key]=l,l}destroy(){for(const t of Object.keys(this._hash))this._hash[t]=null;this._hash=null;const e=this;e._renderer=null}}Yo.extension={type:[y.WebGPUSystem],name:"bindGroup"};class Xo{constructor(){this._gpuBuffers=Object.create(null)}contextChange(e){this._gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){const t=this._gpuBuffers[e.uid]||this.createGPUBuffer(e);return e._updateID&&e.data&&(e._updateID=0,this._gpu.device.queue.writeBuffer(t,0,e.data.buffer,0,e._updateSize)),t}destroyAll(){for(const e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){const t=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(si(e.data.buffer,t.getMappedRange()),t.unmap()),this._gpuBuffers[e.uid]=t,e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),t}onBufferChange(e){let t=this._gpuBuffers[e.uid];t.destroy(),t=this.createGPUBuffer(e),e._updateID=0}onBufferDestroy(e){this._gpuBuffers[e.uid].destroy(),this._gpuBuffers[e.uid]=null}destroy(){for(const t of Object.keys(this._gpuBuffers)){const i=Number(t);this._gpuBuffers[i].destroy(),this._gpuBuffers[i]=null}this._gpuBuffers=null;const e=this;e._renderer=null}}Xo.extension={type:[y.WebGPUSystem],name:"buffer"};function L_(r,e){const t=r.descriptor.size,i=e.gpu.device,n=new fe({data:new Float32Array(24e5),usage:$.MAP_READ|$.COPY_DST}),s=e.buffer.createGPUBuffer(n),o=i.createCommandEncoder();o.copyBufferToBuffer(e.buffer.getGPUBuffer(r),0,s,0,t),i.queue.submit([o.finish()]),s.mapAsync(GPUMapMode.READ,0,t).then(()=>{s.getMappedRange(0,t),s.unmap()})}class qp{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const t=this.byteIndex;let i=t+e*4;if(i=Math.ceil(i/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,i>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=i,t}addGroup(e){const t=this.addEmptyGroup(e.length);for(let i=0;i<e.length;i++)this.data[t/4+i]=e[i];return t}destroy(){this._buffer.destroy(),this._buffer=null,this.data=null}}class qo{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){const e=this;e._renderer=null,this._colorMaskCache=null}}qo.extension={type:[y.WebGPUSystem],name:"colorMask"};class Ko{constructor(e){this._renderer=e}async init(){return this._initPromise?this._initPromise:(this._initPromise=this._createDeviceAndAdaptor({}).then(e=>{this.gpu=e,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async _createDeviceAndAdaptor(e){const t=await navigator.gpu.requestAdapter(e),i=await t.requestDevice();return{adapter:t,device:i}}destroy(){this.gpu=null,this._renderer=null}}Ko.extension={type:[y.WebGPUSystem],name:"device"};var D_=Object.defineProperty,Kp=Object.getOwnPropertySymbols,z_=Object.prototype.hasOwnProperty,N_=Object.prototype.propertyIsEnumerable,Zp=(r,e,t)=>e in r?D_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Qp=(r,e)=>{for(var t in e||(e={}))z_.call(e,t)&&Zp(r,t,e[t]);if(Kp)for(var t of Kp(e))N_.call(e,t)&&Zp(r,t,e[t]);return r};class Zo{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}start(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e,t){this.renderPassEncoder&&this.renderPassEncoder.end(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(t.descriptor),this._setViewport(e.viewport)}_setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,t,i,n){const s=this._renderer.pipeline.getPipeline(e,t,i,n);this.setPipeline(s)}setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,t){this._boundVertexBuffer[e]!==t&&(this._boundVertexBuffer[e]=t,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(t)))}_setIndexBuffer(e){this._boundIndexBuffer!==e&&(this._boundIndexBuffer=e,this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),"uint32"))}setBindGroup(e,t,i){if(this._boundBindGroup[e]===t)return;this._boundBindGroup[e]=t,t.touch(this._renderer.textureGC.count);const n=this._renderer.bindGroup.getBindGroup(t,i,e);this.renderPassEncoder.setBindGroup(e,n)}setGeometry(e){for(const t in e.attributes){const i=e.attributes[t];this._setVertexBuffer(i.shaderLocation,i.buffer)}e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,t){for(const i in e.groups){const n=e.groups[i];t||this._syncBindGroup(n),this.setBindGroup(i,n,e.gpuProgram)}}_syncBindGroup(e){for(const t in e.resources){const i=e.resources[t];i.isUniformGroup&&this._renderer.uniformBuffer.updateUniformGroup(i)}}draw(e){const{geometry:t,shader:i,state:n,topology:s,size:o,start:a,instanceCount:l,skipSync:h}=e;this.setPipelineFromGeometryProgramAndState(t,i.gpuProgram,n,s),this.setGeometry(t),this._setShaderBindGroups(i,h),t.indexBuffer?this.renderPassEncoder.drawIndexed(o||t.indexBuffer.data.length,l||1,a||0):this.renderPassEncoder.draw(o||t.getSize(),l||1,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished()}restoreRenderPass(){const e=this._renderer.renderTarget.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const t=this._boundPipeline,i=Qp({},this._boundVertexBuffer),n=this._boundIndexBuffer,s=Qp({},this._boundBindGroup);this._clearCache();const o=this._renderer.renderTarget.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this.setPipeline(t);for(const a in i)this._setVertexBuffer(a,i[a]);for(const a in s)this.setBindGroup(a,s[a],null);this._setIndexBuffer(n)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){const e=this;e._renderer=null,this._gpu=null,this._boundBindGroup=null,this._boundVertexBuffer=null,this._boundIndexBuffer=null,this._boundPipeline=null}contextChange(e){this._gpu=e}}Zo.extension={type:[y.WebGPUSystem],name:"encoder"};class Qo{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:ne.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const i=this._renderTargetStencilState[this._activeRenderTarget.uid];i.stencilMode=e,i.stencilReference=t;const n=this._renderer;n.pipeline.setStencilMode(e),n.encoder.renderPassEncoder.setStencilReference(t)}destroy(){this._renderer.renderTarget.onRenderTargetChange.remove(this);const e=this;e._renderer=null,this._activeRenderTarget=null,this._renderTargetStencilState=null}}Qo.extension={type:[y.WebGPUSystem],name:"stencil"};const We=128;class Jo{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._batchBuffer=new qp({minUniformOffsetAlignment:We});const t=256/We;for(let i=0;i<t;i++){let n=$.UNIFORM|$.COPY_DST;i===0&&(n|=$.COPY_SRC),this._buffers.push(new fe({data:this._batchBuffer.data,usage:n}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){for(const e in this._bindGroupHash)this._bindGroupHash[e]=null;this._batchBuffer.clear()}getUniformBindGroup(e,t){if(!t&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.uniformBuffer.ensureUniformGroup(e);const i=e.buffer.data,n=this._batchBuffer.addEmptyGroup(i.length);return this._renderer.uniformBuffer.syncUniformGroup(e,this._batchBuffer.data,n/4),this._bindGroupHash[e.uid]=this._getBindGroup(n/We),this._bindGroupHash[e.uid]}getUniformBufferResource(e){this._renderer.uniformBuffer.updateUniformGroup(e);const t=e.buffer.data,i=this._batchBuffer.addGroup(t);return this._getBufferResource(i/We)}getArrayBindGroup(e){const t=this._batchBuffer.addGroup(e);return this._getBindGroup(t/We)}getArrayBufferResource(e){const t=this._batchBuffer.addGroup(e)/We;return this._getBufferResource(t)}_getBufferResource(e){if(!this._bufferResources[e]){const t=this._buffers[e%2];this._bufferResources[e]=new xi({buffer:t,offset:(e/2|0)*256,size:We})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){const t=new Ae({0:this._getBufferResource(e)});this._bindGroups[e]=t}return this._bindGroups[e]}_uploadBindGroups(){const e=this._renderer.buffer,t=this._buffers[0];t.update(this._batchBuffer.byteIndex),e.updateBuffer(t);const i=this._renderer.gpu.device.createCommandEncoder();for(let n=1;n<this._buffers.length;n++){const s=this._buffers[n];i.copyBufferToBuffer(e.getGPUBuffer(t),We,e.getGPUBuffer(s),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([i.finish()])}destroy(){for(let e=0;e<this._bindGroups.length;e++)this._bindGroups[e].destroy();this._bindGroups=null,this._bindGroupHash=null;for(let e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers=null;for(let e=0;e<this._bufferResources.length;e++)this._bufferResources[e].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._bindGroupHash=null,this._renderer=null}}Jo.extension={type:[y.WebGPUPipes],name:"uniformBatch"};class H_ extends Ae{constructor(){super({0:new fe({data:new Float32Array(128),usage:$.UNIFORM|$.COPY_DST})})}get buffer(){return this.resources[0]}get data(){return this.resources[0].data}}class ea{constructor(e){this._activeBindGroups=[],this._activeBindGroupIndex=0,this._renderer=e}getUniformBindGroup(e){const t=this._renderer;t.uniformBuffer.ensureUniformGroup(e);const i=H.get(H_);return t.uniformBuffer.syncUniformGroup(e,i.data,0),i.buffer.update(e.buffer.data.byteLength),this._activeBindGroups[this._activeBindGroupIndex++]=i,i}renderEnd(){for(let e=0;e<this._activeBindGroupIndex;e++)H.return(this._activeBindGroups[e]);this._activeBindGroupIndex=0}}ea.extension={type:[y.WebGPUPipes],name:"uniformBuffer"};const j_={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function W_(r,e,t,i,n,s,o,a){return r<<26|e<<18|o<<14|t<<8|i<<3|a<<1|n<<4|s}class ta{constructor(e){this._moduleCache=Object.create(null),this._bufferLayoutsCache=Object.create(null),this._pipeCache=Object.create(null),this._colorMask=15,this._multisampleCount=1,this._renderer=e}contextChange(e){this._gpu=e,this.setStencilMode(ne.DISABLED)}setMultisampleCount(e){this._multisampleCount=e}setColorMask(e){this._colorMask=e}setStencilMode(e){this._stencilMode=e,this._stencilState=ke[e]}setPipeline(e,t,i,n){const s=this.getPipeline(e,t,i);n.setPipeline(s)}getPipeline(e,t,i,n){e._layoutKey||this._generateBufferKey(e),t._layoutKey||(this._generateProgramKey(t),this._renderer.shader.createProgramLayout(t)),n=n||e.topology;const s=W_(e._layoutKey,t._layoutKey,i.data,i._blendModeId,this._stencilMode,this._multisampleCount,this._colorMask,j_[n]);return this._pipeCache[s]?this._pipeCache[s]:(this._pipeCache[s]=this._createPipeline(e,t,i,n),this._pipeCache[s])}_createPipeline(e,t,i,n){const s=this._gpu.device,o=this._createVertexBufferLayouts(e),a=this._renderer.state.getColorTargets(i);let l=this._stencilState;l=ke[this._stencilMode],a[0].writeMask=this._stencilMode===ne.RENDERING_MASK_ADD?0:this._colorMask;const h={vertex:{module:this._getModule(t.vertex.source),entryPoint:t.vertex.entryPoint,buffers:o},fragment:{module:this._getModule(t.fragment.source),entryPoint:t.fragment.entryPoint,targets:a},primitive:{topology:n,cullMode:i.cullMode},layout:t._gpuLayout.pipeline,multisample:{count:this._multisampleCount},depthStencil:l,label:"PIXI Pipeline"};return s.createRenderPipeline(h)}_getModule(e){return this._moduleCache[e]||this._createModule(e)}_createModule(e){const t=this._gpu.device;return this._moduleCache[e]=t.createShaderModule({code:e}),this._moduleCache[e]}_generateProgramKey(e){const{vertex:t,fragment:i}=e,n=t.source+i.source+t.entryPoint+i.entryPoint;return e._layoutKey=Fr(n,"program"),e._layoutKey}_generateBufferKey(e){const t=[];let i=0;const n=Object.keys(e.attributes).sort();for(let o=0;o<n.length;o++){const a=e.attributes[n[o]];t[i++]=a.shaderLocation,t[i++]=a.offset,t[i++]=a.format,t[i++]=a.stride}const s=t.join("");return e._layoutKey=Fr(s,"geometry"),e._layoutKey}_createVertexBufferLayouts(e){if(this._bufferLayoutsCache[e._layoutKey])return this._bufferLayoutsCache[e._layoutKey];const t=[];return e.buffers.forEach(i=>{const n={arrayStride:0,stepMode:"vertex",attributes:[]},s=n.attributes;for(const o in e.attributes){const a=e.attributes[o];a.buffer===i&&(n.arrayStride=a.stride,s.push({shaderLocation:a.shaderLocation,offset:a.offset,format:a.format}))}s.length&&t.push(n)}),this._bufferLayoutsCache[e._layoutKey]=t,t}destroy(){const e=this;e._renderer=null,this._bufferLayoutsCache=null}}ta.extension={type:[y.WebGPUSystem],name:"pipeline"};class Jp{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}class ra{constructor(e){this.rootProjectionMatrix=new R,this.onRenderTargetChange=new vi("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._renderer=e}renderStart({target:e,clear:t,clearColor:i}){this.rootRenderTarget=this.getRenderTarget(e),this.rootProjectionMatrix=this.rootRenderTarget.projectionMatrix,this.renderingToScreen=Qs(this.rootRenderTarget),this._renderTargetStack.length=0,this._renderer.encoder.start(),this.push(this.rootRenderTarget,t,i!=null?i:this._renderer.background.colorRgba)}contextChange(e){this._gpu=e}bind(e,t=!0,i){const n=this.getRenderTarget(e),s=this.renderTarget!==n;return this.renderTarget=n,this._startRenderPass(t,i),s&&this.onRenderTargetChange.emit(n),n}_getGpuColorTexture(e){const t=this._getGpuRenderTarget(e);return t.contexts[0]?t.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,t,i){typeof t=="boolean"&&(t=t?be.ALL:be.NONE);const n=this._getGpuRenderTarget(e),s=e.colorTextures.map((a,l)=>{const h=n.contexts[l];let u,c;h?u=h.getCurrentTexture().createView():u=this._renderer.texture.getTextureView(a),n.msaaTextures[l]&&(c=u,u=this._renderer.texture.getTextureView(n.msaaTextures[l]));const p=t&be.COLOR?"clear":"load";return i!=null||(i=this._defaultClearColor),{view:u,resolveTarget:c,clearValue:i,storeOp:"store",loadOp:p}});let o;if(e.depthTexture){const a=t&be.STENCIL?"clear":"load";o={view:this._renderer.texture.getGpuSource(e.depthTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:a}}return{colorAttachments:s,depthStencilAttachment:o}}clear(e=be.ALL,t){e&&this._startRenderPass(e,t)}push(e,t=be.ALL,i){const n=this.bind(e,t,i);return this._renderTargetStack.push(n),n}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}copyToTexture(e,t,i,n){const s=this._renderer,o=s.renderTarget._getGpuColorTexture(e),a=s.texture.getGpuSource(t.source);return s.encoder.commandEncoder.copyTextureToTexture({texture:o,origin:i},{texture:a},n),t}restart(){this.bind(this.rootRenderTarget,be.NONE)}destroy(){const e=this;e._renderer=null,this._renderSurfaceToRenderTargetHash.clear()}_startRenderPass(e=!0,t){const i=this.renderTarget,n=this._getGpuRenderTarget(i);(i.width!==n.width||i.height!==n.height)&&this._resizeGpuRenderTarget(i);const s=this.getDescriptor(i,e,t);n.descriptor=s,this._renderer.encoder.beginRenderPass(i,n),this._renderer.pipeline.setMultisampleCount(n.msaaSamples)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=yi(e)),e instanceof Rt?t=e:e instanceof P&&(t=new Rt({colorTextures:[e],depthTexture:e.source.depthStencil})),t.isRoot=!0,this._renderSurfaceToRenderTargetHash.set(e,t),t}_getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){e.isRoot=!0;const t=new Jp;return e.colorTextures.forEach((i,n)=>{if(i.source.resource instanceof HTMLCanvasElement){const s=e.colorTexture.source.resource.getContext("webgpu");try{s.configure({device:this._gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"})}catch(o){console.error(o)}t.contexts[n]=s}if(t.msaa=i.source.antialias,i.source.antialias){const s=new he({width:0,height:0,sampleCount:4});t.msaaTextures[n]=s}}),t.msaa&&(t.msaaSamples=4,e.depthTexture&&(e.depthTexture.source.sampleCount=4)),this._gpuRenderTargetHash[e.uid]=t,t}_resizeGpuRenderTarget(e){const t=this._getGpuRenderTarget(e);t.width=e.width,t.height=e.height,t.msaa&&e.colorTextures.forEach((i,n)=>{const s=t.msaaTextures[n];s==null||s.resize(i.source.width,i.source.height,i.source._resolution)})}}ra.extension={type:[y.WebGPUSystem],name:"renderTarget"};class ia{contextChange(e){this._gpu=e}createProgramLayout(e){const t=this._gpu.device;if(!e._gpuLayout)if(e.gpuLayout){const i=e.gpuLayout.map(s=>t.createBindGroupLayout({entries:s})),n={bindGroupLayouts:i};e._gpuLayout={bindGroups:i,pipeline:t.createPipelineLayout(n)}}else e._gpuLayout={bindGroups:null,pipeline:"auto"}}destroy(){this._gpu=null}}ia.extension={type:[y.WebGPUSystem],name:"shader"};const ve={};ve.normal={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},ve.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}},ve.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}},ve.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},ve.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},ve.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}},ve["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},ve["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}},ve["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}},ve.erase={alpha:{srcFactor:"zero",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"one-minus-src",operation:"add"}};class na{constructor(){this.defaultState=new Se,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:ve[e.blendMode]||ve.normal}]}destroy(){this.gpu=null}}na.extension={type:[y.WebGPUSystem],name:"state"};const ef={type:"image",upload(r,e,t){const i=r.resource,n=(r.pixelWidth|0)*(r.pixelHeight|0),s=i.byteLength/n;t.device.queue.writeTexture({texture:e},i,{offset:0,rowsPerImage:r.pixelWidth,bytesPerRow:r.pixelWidth*s},{width:r.pixelWidth,height:r.pixelHeight,depthOrArrayLayers:1})}},sa={type:"image",upload(r,e,t){const i=r.resource;if(!i)return;const n=r.resourceWidth||r.pixelWidth,s=r.resourceHeight||r.pixelHeight,o=r.alphaMode==="premultiply-alpha-on-upload";t.device.queue.copyExternalImageToTexture({source:i},{texture:e,premultipliedAlpha:o},{width:n,height:s})}},tf={type:"video",upload(r,e,t){sa.upload(r,e,t)}};class rf{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let t=this.pipelines[e];return t||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
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
                    `})),t=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=t),t}generateMipmap(e){const t=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let i=e;const n=e.depthOrArrayLayers||1,s=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!s){const l={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:n},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};i=this.device.createTexture(l)}const o=this.device.createCommandEncoder({}),a=t.getBindGroupLayout(0);for(let l=0;l<n;++l){let h=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),u=s?1:0;for(let c=1;c<e.mipLevelCount;++c){const p=i.createView({baseMipLevel:u++,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),d=o.beginRenderPass({colorAttachments:[{view:p,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),f=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:h}]});d.setPipeline(t),d.setBindGroup(0,f),d.draw(3,1,0,0),d.end(),h=p}}if(!s){const l={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:n};for(let h=1;h<e.mipLevelCount;++h)o.copyTextureToTexture({texture:i,mipLevel:h-1},{texture:e,mipLevel:h},l),l.width=Math.ceil(l.width/2),l.height=Math.ceil(l.height/2)}return this.device.queue.submit([o.finish()]),s||i.destroy(),e}}class oa{constructor(e){this.managedTextures=[],this._gpuSources=Object.create(null),this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._textureViewHash=Object.create(null),this._uploads={image:sa,buffer:ef,video:tf},this._renderer=e}contextChange(e){this._gpu=e}initSource(e){if(e.autoGenerateMipmaps){const n=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(n))+1}const t={size:{width:e.pixelWidth||1,height:e.pixelHeight||1},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC},i=this._gpu.device.createTexture(t);return this._gpuSources[e.uid]=i,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),i}onSourceUpdate(e){const t=this.getGpuSource(e);t&&(this._uploads[e.uploadMethodId]&&this._uploads[e.uploadMethodId].upload(e,t,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&(this._mipmapGenerator||(this._mipmapGenerator=new rf(this._gpu.device)),this._mipmapGenerator.generateMipmap(t)))}onSourceUnload(e){const t=this._gpuSources[e.uid];t&&(this._gpuSources[e.uid]=null,t.destroy())}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}onSourceResize(e){const t=this._gpuSources[e.uid];(t.width!==e.pixelWidth||t.height!==e.pixelHeight)&&(this._textureViewHash[e.uid]=null,this._bindGroupHash[e.uid]=null,this.onSourceUnload(e),this.initSource(e))}_initSampler(e){return this._gpuSamplers[e.resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e.resourceId]}getGpuSampler(e){return this._gpuSamplers[e.resourceId]||this._initSampler(e)}getGpuSource(e){return this._gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){var t;return(t=this._bindGroupHash[e.id])!=null?t:this._createTextureBindGroup(e)}_createTextureBindGroup(e){const t=e.source,i=t.uid;return this._bindGroupHash[i]=new Ae({0:t,1:t.style}),this._bindGroupHash[i]}getTextureView(e){var t;const i=e.source;return(t=this._textureViewHash[i.uid])!=null?t:this._createTextureView(i)}_createTextureView(e){return this._textureViewHash[e.uid]=this.getGpuSource(e).createView(),this._textureViewHash[e.uid]}generateCanvas(e){const t=this._renderer,i=t.gpu.device.createCommandEncoder(),n=D.ADAPTER.createCanvas();n.width=e.source.pixelWidth,n.height=e.source.pixelHeight;const s=n.getContext("webgpu");return s.configure({device:t.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"premultiplied"}),i.copyTextureToTexture({texture:t.texture.getGpuSource(e.source),origin:{x:0,y:0}},{texture:s.getCurrentTexture()},{width:n.width,height:n.height}),t.gpu.device.queue.submit([i.finish()]),n}getPixels(e){const t=this.generateCanvas(e),i=De.getOptimalCanvasAndContext(t.width,t.height),n=i.context;n.drawImage(t,0,0);const{width:s,height:o}=t,a=n.getImageData(0,0,s,o),l=new Uint8ClampedArray(a.data.buffer);return De.returnCanvasAndContext(i),{pixels:l,width:s,height:o}}destroy(){for(const e of Object.keys(this._gpuSources)){const t=Number(e);this._gpuSources[t].destroy(),this._gpuSources[t]=null}for(const e of Object.keys(this._bindGroupHash)){const t=Number(e);this._bindGroupHash[t].destroy(),this._bindGroupHash[t]=null}this._gpu=null,this._mipmapGenerator=null,this._gpuSources=null,this._bindGroupHash=null,this._textureViewHash=null,this._gpuSamplers=null}}oa.extension={type:[y.WebGPUSystem],name:"texture"};const V_=[...Wo,Ko,Xo,oa,ra,Zo,ia,na,ta,qo,Qo,Yo],Y_=[...Vo,Jo,ea],X_=[cs,js,ws],nf=[],sf=[],of=[];J.handleByNamedList(y.WebGPUSystem,nf),J.handleByNamedList(y.WebGPUPipes,sf),J.handleByNamedList(y.WebGPUPipesAdaptor,of),J.add(...V_,...Y_,...X_);class af extends mo{constructor(){const e={name:"webgpu",type:Re.WEBGPU,systems:nf,renderPipes:sf,renderPipeAdaptors:of};super(e)}}var q_={__proto__:null,WebGPURenderer:af};const K_={POINTS:"point-list",LINES:"line-list",LINE_STRIP:"line-strip",TRIANGLES:"triangle-list",TRIANGLE_STRIP:"triangle-strip"},Z_=new Proxy(K_,{get(r,e){return O(z,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}}),Q_={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};var lf=(r=>(r[r.NONE=0]="NONE",r[r.LOW=2]="LOW",r[r.MEDIUM=4]="MEDIUM",r[r.HIGH=8]="HIGH",r))(lf||{}),aa=(r=>(r.CLAMP="clamp-to-edge",r.REPEAT="repeat",r.MIRRORED_REPEAT="mirror-repeat",r))(aa||{});const J_=new Proxy(aa,{get(r,e){return O(z,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}});var la=(r=>(r.NEAREST="nearest",r.LINEAR="linear",r))(la||{});const e0=new Proxy(la,{get(r,e){return O(z,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}});class t0{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}set(e,t,i){const n=t.width,s=t.height;if(i){const o=e.width/2/n,a=e.height/2/s,l=e.x/n+o,h=e.y/s+a;i=I.add(i,I.NW),this.x0=l+o*I.uX(i),this.y0=h+a*I.uY(i),i=I.add(i,2),this.x1=l+o*I.uX(i),this.y1=h+a*I.uY(i),i=I.add(i,2),this.x2=l+o*I.uX(i),this.y2=h+a*I.uY(i),i=I.add(i,2),this.x3=l+o*I.uX(i),this.y3=h+a*I.uY(i)}else this.x0=e.x/n,this.y0=e.y/s,this.x1=(e.x+e.width)/n,this.y1=e.y/s,this.x2=(e.x+e.width)/n,this.y2=(e.y+e.height)/s,this.x3=e.x/n,this.y3=(e.y+e.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}let r0=0;function i0(){return r0++}function n0(r,e){if(r===16777215||!e)return e;if(e===16777215||!r)return r;const t=r>>16&255,i=r>>8&255,n=r&255,s=e>>16&255,o=e>>8&255,a=e&255,l=t*s/255,h=i*o/255,u=n*a/255;return(l<<16)+(h<<8)+u}function s0(r,e,t){const i=r.a,n=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty,h=e.a,u=e.b,c=e.c,p=e.d;t.a=i*h+n*c,t.b=i*u+n*p,t.c=s*h+o*c,t.d=s*u+o*p,t.tx=a*h+l*c+e.tx,t.ty=a*u+l*p+e.ty}function hf(r){const e=r._stroke,t=r._fill;return["transform-origin: top left","display: inline-block",`color: ${j.shared.setValue(t.color).toHex()}`,`font-size: ${r.fontSize}px`,`font-family: ${r.fontFamily}`,`font-weight: ${r.fontWeight}`,`font-style: ${r.fontStyle}`,`font-variant: ${r.fontVariant}`,`letter-spacing: ${r.letterSpacing}px`,`text-align: ${r.align}`,`padding: ${r.padding}px`,`white-space: ${r.whiteSpace}`,...r.lineHeight?[`line-height: ${r.lineHeight}px`]:[],...r.wordWrap?[`word-wrap: ${r.breakWords?"break-all":"break-word"}`,`max-width: ${r.wordWrapWidth}px`]:[],...e?[`-webkit-text-stroke-width: ${e.width}px`,`-webkit-text-stroke-color: ${j.shared.setValue(e.color).toHex()}`,`text-stroke-width: ${e.width}px`,`text-stroke-color: ${j.shared.setValue(e.color).toHex()}`,"paint-order: stroke"]:[],...r.dropShadow?[o0(r.dropShadow)]:[],...r.cssOverrides].join(";")}function o0(r){const e=j.shared.setValue(r.color).setAlpha(r.alpha).toHexa(),t=Math.round(Math.cos(r.angle)*r.distance),i=Math.round(Math.sin(r.angle)*r.distance),n=`${t}px ${i}px`;return r.blur>0?`text-shadow: ${n} ${r.blur}px ${e}`:`text-shadow: ${n} ${e}`}class Ut extends mt{constructor(e){var t;super(e),this._cssOverrides=[],(t=this.cssOverrides)!=null||(this.cssOverrides=e.cssOverrides)}set cssOverrides(e){this._cssOverrides=e instanceof Array?e:[e],this.update()}get cssOverrides(){return this._cssOverrides}_generateKey(){return this._styleKey=Po(this)+this._cssOverrides.join("-"),this._styleKey}update(){this._cssStyle=null,super.update()}clone(){return new Ut({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,cssOverrides:this.cssOverrides})}get cssStyle(){return this._cssStyle||(this._cssStyle=hf(this)),this._cssStyle}addOverride(...e){const t=e.filter(i=>!this.cssOverrides.includes(i));t.length>0&&(this.cssOverrides.push(...t),this.update())}removeOverride(...e){const t=e.filter(i=>this.cssOverrides.includes(i));t.length>0&&(this.cssOverrides=this.cssOverrides.filter(i=>!t.includes(i)),this.update())}set fill(e){super.fill=e}set stroke(e){super.stroke=e}}function ha(r,e){return e instanceof mt||e instanceof Ut?e:r==="html"?new Ut(e):new mt(e)}const a0={canvas:"text",html:"htmlText",bitmap:"bitmapText"};class uf{constructor(e){this.uid=Y("textView"),this.renderPipeId="text",this.owner=_t,this.batched=!0,this.resolution=null,this._didUpdate=!0,this._bounds=[0,1,0,0],this._boundsDirty=!0;var t,i,n;this.text=(t=e.text)!=null?t:"";const s=(i=e.renderMode)!=null?i:this._detectRenderType(e.style);this._renderMode=s,this._style=ha(s,e.style),this.renderPipeId=a0[s],this.anchor=new se(this,0,0),this.resolution=(n=e.resolution)!=null?n:null}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onUpdate())}get text(){return this._text}get style(){return this._style}set style(e){var t;e=e||{},(t=this._style)==null||t.off("update",this.onUpdate,this),this._style=ha(this._renderMode,e),this._style.on("update",this.onUpdate,this),this.onUpdate()}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}addBounds(e){const t=this.bounds;e.addFrame(t[0],t[2],t[1],t[3])}containsPoint(e){const t=this.bounds[2],i=this.bounds[3],n=-t*this.anchor.x;let s=0;return e.x>=n&&e.x<n+t&&(s=-i*this.anchor.y,e.y>=s&&e.y<s+i)}onUpdate(){this._didUpdate=!0,this._boundsDirty=!0,this.owner.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}`}_updateBounds(){const e=this._bounds,t=this._style.padding,i=this.anchor;if(this.renderPipeId==="bitmapText"){const n=Bo.measureText(this.text,this._style),s=n.scale,o=n.offsetY*s,a=n.width*s,l=n.height*s;e[0]=-i._x*a-t,e[1]=e[0]+a,e[2]=-i._y*(l+o)-t,e[3]=e[2]+l}else if(this.renderPipeId==="htmlText"){const n=xp(this.text,this._style),{width:s,height:o}=n;e[0]=-i._x*s-t,e[1]=e[0]+s,e[2]=-i._y*o-t,e[3]=e[2]+o}else{const n=ie.measureText(this.text,this._style),{width:s,height:o}=n;e[0]=-i._x*s-t,e[1]=e[0]+s,e[2]=-i._y*o-t,e[3]=e[2]+o}}_detectRenderType(e){if(e instanceof Ut)return"html";const t=re.get(e==null?void 0:e.fontFamily);return t instanceof Ai||t instanceof Ur?"bitmap":"canvas"}destroy(e=!1){this.owner=null,this._bounds=null,this.anchor=null,this._style.destroy(e),this._style=null,this._text=null}}var l0=Object.defineProperty,cf=Object.getOwnPropertySymbols,h0=Object.prototype.hasOwnProperty,u0=Object.prototype.propertyIsEnumerable,df=(r,e,t)=>e in r?l0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,c0=(r,e)=>{for(var t in e||(e={}))h0.call(e,t)&&df(r,t,e[t]);if(cf)for(var t of cf(e))u0.call(e,t)&&df(r,t,e[t]);return r};class ua extends q{constructor(...e){let t=e[0];(typeof t=="string"||e[1])&&(O(z,'use new Text({ text: "hi!", style }) instead'),t={text:t,style:e[1]}),super(c0({view:new uf(t),label:"Text"},t)),this.allowChildren=!1}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}set text(e){this.view.text=e}get text(){return this.view.text}set style(e){this.view.style=e}get style(){return this.view.style}}class d0 extends ua{constructor(...e){O(z,'use new Text({ text: "hi!", style, renderMode: "bitmap" }) instead');let t=e[0];(typeof t=="string"||e[1])&&(t={text:t,style:e[1]}),t.renderMode="bitmap",super(t)}}class p0 extends ua{constructor(...e){O(z,'use new Text({ text: "hi!", style, renderMode: "html" }) instead');let t=e[0];(typeof t=="string"||e[1])&&(t={text:t,style:e[1]}),t.renderMode="html",super(t)}}var ca=/iPhone/i,pf=/iPod/i,ff=/iPad/i,mf=/\biOS-universal(?:.+)Mac\b/i,da=/\bAndroid(?:.+)Mobile\b/i,gf=/Android/i,Ot=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,ki=/Silk/i,ze=/Windows Phone/i,bf=/\bWindows(?:.+)ARM\b/i,vf=/BlackBerry/i,yf=/BB10/i,xf=/Opera Mini/i,_f=/\b(CriOS|Chrome)(?:.+)Mobile/i,wf=/Mobile(?:.+)Firefox\b/i,Tf=function(r){return typeof r!="undefined"&&r.platform==="MacIntel"&&typeof r.maxTouchPoints=="number"&&r.maxTouchPoints>1&&typeof MSStream=="undefined"};function f0(r){return function(e){return e.test(r)}}function Sf(r){var e={userAgent:"",platform:"",maxTouchPoints:0};!r&&typeof navigator!="undefined"?e={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0}:typeof r=="string"?e.userAgent=r:r&&r.userAgent&&(e={userAgent:r.userAgent,platform:r.platform,maxTouchPoints:r.maxTouchPoints||0});var t=e.userAgent,i=t.split("[FBAN");typeof i[1]!="undefined"&&(t=i[0]),i=t.split("Twitter"),typeof i[1]!="undefined"&&(t=i[0]);var n=f0(t),s={apple:{phone:n(ca)&&!n(ze),ipod:n(pf),tablet:!n(ca)&&(n(ff)||Tf(e))&&!n(ze),universal:n(mf),device:(n(ca)||n(pf)||n(ff)||n(mf)||Tf(e))&&!n(ze)},amazon:{phone:n(Ot),tablet:!n(Ot)&&n(ki),device:n(Ot)||n(ki)},android:{phone:!n(ze)&&n(Ot)||!n(ze)&&n(da),tablet:!n(ze)&&!n(Ot)&&!n(da)&&(n(ki)||n(gf)),device:!n(ze)&&(n(Ot)||n(ki)||n(da)||n(gf))||n(/\bokhttp\b/i)},windows:{phone:n(ze),tablet:n(bf),device:n(ze)||n(bf)},other:{blackberry:n(vf),blackberry10:n(yf),opera:n(xf),firefox:n(wf),chrome:n(_f),device:n(vf)||n(yf)||n(xf)||n(wf)||n(_f)},any:!1,phone:!1,tablet:!1};return s.any=s.apple.device||s.android.device||s.windows.device||s.other.device,s.phone=s.apple.phone||s.android.phone||s.windows.phone,s.tablet=s.apple.tablet||s.android.tablet||s.windows.tablet,s}var Pf;const m0=(Pf=Sf.default)!=null?Pf:Sf,g0=m0(globalThis.navigator);class Af{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e!=null?e:new R,this.observer=t,this.position=new se(this,0,0),this.scale=new se(this,1,1),this.pivot=new se(this,0,0),this.skew=new se(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}onUpdate(e){var t;this.dirty=!0,e===this.skew&&this.updateSkew(),(t=this.observer)==null||t.onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.updateSkew())}}var b0=Object.defineProperty,Ef=Object.getOwnPropertySymbols,v0=Object.prototype.hasOwnProperty,y0=Object.prototype.propertyIsEnumerable,Cf=(r,e,t)=>e in r?b0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Mf=(r,e)=>{for(var t in e||(e={}))v0.call(e,t)&&Cf(r,t,e[t]);if(Ef)for(var t of Ef(e))y0.call(e,t)&&Cf(r,t,e[t]);return r};const Bf=class{constructor(r){this.owner=_t,this.uid=Y("tilingSpriteView"),this.renderPipeId="tilingSprite",this.batched=!0,this._bounds=[0,1,0,0],this._boundsDirty=!0,r=Mf(Mf({},Bf.defaultOptions),r),this.anchor=new se(this,0,0),this._applyAnchorToTexture=r.applyAnchorToTexture,this.texture=r.texture,this._width=r.width,this._height=r.height,this._tileTransform=new Af({observer:this})}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}set texture(r){this._texture!==r&&(this._texture=r,this.onUpdate())}get texture(){return this._texture}set width(r){this._width=r,this.onUpdate()}get width(){return this._width}set height(r){this._height=r,this.onUpdate()}get height(){return this._height}_updateBounds(){const r=this._bounds,e=this.anchor,t=this._width,i=this._height;r[1]=-e._x*t,r[0]=r[1]+t,r[3]=-e._y*i,r[2]=r[3]+i}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[2],e[1],e[3])}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],i=-e*this.anchor.x;let n=0;return r.x>=i&&r.x<i+e&&(n=-t*this.anchor.y,r.y>=n&&r.y<n+t)}onUpdate(){this._boundsDirty=!0,this._didUpdate=!0,this.owner.onViewUpdate()}destroy(r=!1){if(this.anchor=null,this._tileTransform=null,this._bounds=null,typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._texture.destroy(e)}this._texture=null}};let pa=Bf;pa.defaultOptions={texture:P.WHITE,width:256,height:256,applyAnchorToTexture:!1};var x0=Object.defineProperty,Rf=Object.getOwnPropertySymbols,_0=Object.prototype.hasOwnProperty,w0=Object.prototype.propertyIsEnumerable,kf=(r,e,t)=>e in r?x0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,T0=(r,e)=>{for(var t in e||(e={}))_0.call(e,t)&&kf(r,t,e[t]);if(Rf)for(var t of Rf(e))w0.call(e,t)&&kf(r,t,e[t]);return r};class S0 extends q{constructor(e){super(T0({view:new pa(e),label:"TilingSprite"},e)),this.allowChildren=!1}set texture(e){this.view.texture=e}get texture(){return this.view.texture}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get width(){return this.view.width}set width(e){this.view.width=e}get height(){return this.view.height}set height(e){this.view.height=e}get tilePosition(){return this.view._tileTransform.position}set tilePosition(e){this.view._tileTransform.position.copyFrom(e)}get tileScale(){return this.view._tileTransform.scale}set tileScale(e){this.view._tileTransform.scale.copyFrom(e)}set tileRotation(e){this.view._tileTransform.rotation=e}get tileRotation(){return this.view._tileTransform.rotation}get tileTransform(){return this.view._tileTransform}}const P0=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;async function A0(r,e,t=200){const i=await e.extract.base64(r);await e.encoder.commandFinished;const n=t;console.log(`logging texture ${r.source.width}px ${r.source.height}px`);const s=["font-size: 1px;",`padding: ${n}px 300px;`,`background: url(${i}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",s)}var E0=Object.defineProperty,C0=Object.defineProperties,M0=Object.getOwnPropertyDescriptors,Ff=Object.getOwnPropertySymbols,B0=Object.prototype.hasOwnProperty,R0=Object.prototype.propertyIsEnumerable,Of=(r,e,t)=>e in r?E0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Uf=(r,e)=>{for(var t in e||(e={}))B0.call(e,t)&&Of(r,t,e[t]);if(Ff)for(var t of Ff(e))R0.call(e,t)&&Of(r,t,e[t]);return r},k0=(r,e)=>C0(r,M0(e));const F0=["#000080","#228B22","#8B0000","#4169E1","#008080","#800000","#9400D3","#FF8C00","#556B2F","#8B008B"];let O0=0;function If(r,e=0,t={color:"#000000"}){r.isLayerRoot&&(t.color=F0[O0++]);let i="";for(let o=0;o<e;o++)i+="    ";let n=r.label;!n&&r instanceof Fe&&(n=`sprite:${r.view.texture.label}`);let s=`%c ${i}|- ${n} (worldX:${r.worldTransform.tx}, layerX:${r.layerTransform.tx}, localX:${r.x})`;r.isLayerRoot&&(s+=" (LayerGroup)"),r.filters&&(s+="(*filters)"),console.log(s,`color:${t.color}; font-weight:bold;`),e++;for(let o=0;o<r.children.length;o++){const a=r.children[o];If(a,e,Uf({},t))}}function Gf(r,e=0,t={index:0,color:"#000000"}){let i="";for(let s=0;s<e;s++)i+="    ";const n=`%c ${i}- ${t.index}: ${r.root.label} worldX:${r.worldTransform.tx}`;console.log(n,`color:${t.color}; font-weight:bold;`),e++;for(let s=0;s<r.layerGroupChildren.length;s++){const o=r.layerGroupChildren[s];Gf(o,e,k0(Uf({},t),{index:s}))}}let fa=0;const $f=500;function U0(...r){fa!==$f&&(fa++,fa===$f?console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS."):console.warn("PixiJS Warning: ",...r))}var I0=`fn getLuminosity(c: vec3<f32>) -> f32 {
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
}`;export{qi as AbstractBitmapFont,mo as AbstractRenderer,nu as AlphaFilter,Rn as AlphaMask,Ds as AlphaMaskPipe,Gi as AnimatedSprite,In as Application,sr as Assets,zh as AssetsClass,vr as BUFFER_TYPE,Rh as BackgroundLoader,Ei as BackgroundSystem,fs as Batch,Pc as BatchGeometry,ps as BatchTextureArray,hi as BatchableGraphics,rd as BatchableMesh,Pi as BatchableSprite,ms as Batcher,gs as BatcherPipe,H as BigPool,Ae as BindGroup,Yo as BindGroupSystem,Ur as BitmapFont,Bo as BitmapFontManager,d0 as BitmapText,Ro as BitmapTextPipe,ee as BlendModeFilter,$o as BlendModePipe,Eu as BlurFilter,lr as BlurFilterPass,ce as Bounds,Ta as BrowserAdapter,fe as Buffer,Fi as BufferImageSource,xi as BufferResource,Xo as BufferSystem,$ as BufferUsage,be as CLEAR,re as Cache,De as CanvasPool,op as CanvasPoolClass,xd as CanvasSource,ie as CanvasTextMetrics,ko as CanvasTextPipe,Fo as CanvasTextSystem,Oi as Circle,j as Color,kn as ColorMask,zs as ColorMaskPipe,dv as ColorMatrixFilter,q as Container,P0 as DATA_URI,$a as DEG_TO_RAD,la as DEPRECATED_SCALE_MODES,aa as DEPRECATED_WRAP_MODES,Z_ as DRAW_MODES,pv as DisplacementFilter,Ai as DynamicBitmapFont,Ui as Ellipse,gh as EventBoundary,ue as EventEmitter,er as EventSystem,$e as EventsTicker,y as ExtensionType,Ci as ExtractSystem,yh as FederatedContainer,Ar as FederatedEvent,Qt as FederatedMouseEvent,_e as FederatedPointerEvent,ht as FederatedWheelEvent,Yt as FillGradient,dn as FillPattern,Ce as Filter,jr as FilterEffect,vs as FilterPipe,ys as FilterSystem,Tr as FontStylePromiseCache,Wn as GAUSSIAN_VALUES,Q_ as GLSL_TO_STD40_SIZE,gi as GL_FORMATS,Ys as GL_TARGETS,N as GL_TYPES,od as GL_WRAP_MODES,Do as GenerateTextureSystem,ur as Geometry,bi as GlBackBufferSystem,ls as GlBatchAdaptor,sd as GlBuffer,Vs as GlBufferSystem,Ks as GlColorMaskSystem,mi as GlContextSystem,Zs as GlEncoderSystem,qs as GlGeometrySystem,_s as GlGraphicsAdaptor,Hs as GlMeshAdaptor,we as GlProgram,Td as GlProgramData,fd as GlRenderTarget,eo as GlRenderTargetSystem,oo as GlShaderSystem,ho as GlStateSystem,to as GlStencilSystem,Od as GlTexture,fo as GlTextureSystem,ao as GlUniformGroupSystem,zo as GlobalUniformSystem,cs as GpuBatchAdaptor,ve as GpuBlendModesToPixi,qo as GpuColorMaskSystem,Ko as GpuDeviceSystem,Zo as GpuEncoderSystem,ws as GpuGraphicsAdaptor,Zc as GpuGraphicsContext,js as GpuMeshAdapter,rf as GpuMipmapGenerator,Me as GpuProgram,L_ as GpuReadBuffer,Jp as GpuRenderTarget,ra as GpuRenderTargetSystem,ia as GpuShaderSystem,na as GpuStateSystem,ke as GpuStencilModesToPixi,Qo as GpuStencilSystem,oa as GpuTextureSystem,Jo as GpuUniformBatchPipe,ea as GpuUniformBufferPipe,Ty as Graphics,He as GraphicsContext,Qc as GraphicsContextRenderData,Gs as GraphicsContextSystem,bt as GraphicsPath,$s as GraphicsPipe,Fs as GraphicsView,p0 as HTMLText,Oo as HTMLTextPipe,Io as HTMLTextRenderData,Ut as HTMLTextStyle,Sr as HTMLTextSystem,Bi as HelloSystem,ex as IGLUniformData,Vt as ImageSource,Pn as InstructionSet,fh as LayerGroup,yo as LayerPipe,Jc as LayerRenderable,To as LayerSystem,Oh as Loader,Oe as LoaderParserPriority,Te as MAX_TEXTURES,lf as MSAA_QUALITY,Wr as MaskEffectManager,sh as MaskEffectManagerClass,Ic as MaskFilter,R as Matrix,zy as Mesh,Pt as MeshGeometry,Ws as MeshPipe,cr as MeshView,ji as NOOP,es as NineSliceGeometry,Fv as NineSlicePlane,rs as NineSliceSprite,Iu as NoiseFilter,se as ObservablePoint,Ia as PI_2,ta as PipelineSystem,Jn as PlaneGeometry,W as Point,gt as Polygon,ih as Pool,nh as PoolGroupClass,Si as ProxyRenderable,go as QuadGeometry,Ga as RAD_TO_DEG,K as Rectangle,Rt as RenderTarget,Bp as RenderTexture,Re as RendererType,zi as ResizePlugin,Dh as Resolver,Ii as RoundedRectangle,e0 as SCALE_MODES,ne as STENCIL_MODES,El as SVGParser,vl as SVGToGraphicsPath,Uy as ScissorMask,tp as SdfShader,Ee as Shader,Tt as ShaderStage,Sl as ShapePath,Vo as SharedRenderPipes,Wo as SharedSystems,Hu as ShockwaveFilter,Fe as Sprite,So as SpritePipe,wh as SpriteView,Xr as Spritesheet,Se as State,Fn as StencilMask,Ns as StencilMaskPipe,vi as SystemRunner,ua as Text,Ir as TextFormat,mt as TextStyle,uf as TextView,P as Texture,Pr as TextureGCSystem,Yi as TextureLayout,Xi as TextureMatrix,le as TexturePool,au as TexturePoolClass,he as TextureSource,Ht as TextureStyle,t0 as TextureUvs,de as Ticker,Br as TickerListener,Di as TickerPlugin,S0 as TilingSprite,bo as TilingSpritePipe,Yd as TilingSpriteShader,pa as TilingSpriteView,Af as Transform,ma as Triangle,Cn as UPDATE_BLEND,Vr as UPDATE_COLOR,Ke as UPDATE_PRIORITY,Vg as UPDATE_TRANSFORM,Yr as UPDATE_VISIBLE,qp as UniformBufferBatch,Ho as UniformBufferSystem,te as UniformGroup,jo as VERSION,xt as VideoSource,Ri as ViewSystem,ds as ViewableBuffer,No as WGSL_TO_STD40_SIZE,J_ as WRAP_MODES,Xp as WebGLRenderer,af as WebGPURenderer,bn as WorkerManager,Ki as XMLFormat,Zi as XMLStringFormat,Sn as _getGlobalBounds,is as addBits,qr as addMaskBounds,Kr as addMaskLocalBounds,Hn as alphaWgsl,Xd as applyMatrix,po as applyStyleParams,Ch as autoDetectRenderer,ii as batchSamplersUniformGroup,Ha as bitmapFontCachePlugin,Ec as blendTemplateFrag,Cc as blendTemplateVert,Mc as blendTemplateWgsl,xu as blurTemplateWgsl,nn as buildAdaptiveBezier,xl as buildAdaptiveQuadratic,an as buildArc,_l as buildArcTo,Tl as buildArcToSvg,dt as buildCircle,qc as buildContextBatches,Cy as buildGeometryFromPath,ed as buildInstructions,Nc as buildLine,Bs as buildPolygon,Rs as buildRectangle,Us as buildSimpleUvs,ks as buildTriangle,Os as buildUvs,Wa as cacheTextureArray,md as calculateProjection,tt as checkDataUrl,rt as checkExtension,Jl as childrenHelperMixin,Lc as closePointEps,br as collectAllRenderables,xo as collectLayerGroups,pr as color32BitToUniform,Jr as colorBit,ei as colorBitGl,Cu as colorMatrixFilterFrag,Xn as colorMatrixFilterWgsl,ey as colorToUniform,$d as compareModeToGlCompare,uc as compileHighShader,cc as compileHighShaderGl,Et as compileHighShaderGlProgram,At as compileHighShaderGpuProgram,ns as compileHooks,ss as compileInputs,hc as compileOutputs,ro as compileShader,at as convertFillInputToFillStyle,ye as convertToList,Rr as copySearchParams,Fr as createIdFromString,Ih as createStringVariations,vn as createTexture,Fp as createUBOElements,Yl as crossOrigin,Ss as curveEps,Yn as defaultFilterVert,Nh as defaultUniformValue,no as defaultValue,O as deprecation,Va as detectAvif,Xa as detectDefaults,qa as detectMp4,Ka as detectOgv,_n as detectVideoAlphaMode,Za as detectWebm,Qa as detectWebp,Xl as determineCrossOrigin,Mu as displacementFrag,Bu as displacementVert,qn as displacementWgsl,Ps as earcut,oh as effectsMixin,_t as emptyViewObserver,Qn as ensureIsBuffer,lu as ensurePrecision,ha as ensureTextStyle,vo as executeInstructions,J as extensions,up as extractFontFamilies,Zr as extractStructAndGroups,si as fastCopy,oc as findHooksRx,ah as findMixin,_r as fontStringFromTextStyle,My as formatShader,mc as fragmentGPUTemplate,bc as fragmentGlTemplate,bu as generateBlurFragSource,yu as generateBlurGlProgram,_u as generateBlurProgram,vu as generateBlurVertSource,Wv as generateGPULayout,Zh as generateGpuLayoutGroups,Vv as generateLayout,Qh as generateLayoutHash,Rd as generateProgram,Po as generateTextStyleKey,ti as generateTextureBatchBit,ri as generateTextureBatchBitGl,i0 as generateUID,Op as generateUniformBufferSync,kd as generateUniformsSync,Ad as getAttributeData,hs as getBatchedGeometry,Co as getBitmapTextLayout,wr as getCanvasFillStyle,yi as getCanvasTexture,th as getFilterEffect,fp as getFontCss,il as getFontFamilyName,ld as getGlInfoFromFormat,Xt as getGlobalBounds,Gc as getGlobalRenderableBounds,je as getLocalBounds,Bn as getMatrixRelativeToParent,cu as getMaxFragmentPrecision,Dc as getOrientationOfPoints,hh as getParent,mp as getPo2TextureFromSource,fn as getResolutionOfUrl,gp as getSVGUrl,bp as getTemporaryCanvasFromImage,uu as getTestContext,ni as getTextureBatchBindGroup,Iy as getTextureDefaultMatrix,Ed as getUniformBufferData,Cd as getUniformData,Ud as glUploadBufferImageResource,uo as glUploadImageResource,Id as glUploadVideoResource,vc as globalUniformsBit,yc as globalUniformsBitGl,ef as gpuUploadBufferImageResource,sa as gpuUploadImageResource,tf as gpuUploadVideoResource,I as groupD8,I0 as hslWgsl,oi as hslgl,ai as hslgpu,os as injectBits,g0 as isMobile,Db as isPow2,Qs as isRenderingToScreen,hp as isSafari,nr as isSingleItem,cp as loadFontAsBase64,Uo as loadFontCSS,Ll as loadImageBitmap,Ja as loadJson,vp as loadSVGImage,Ul as loadSvg,yn as loadTextures,el as loadTxt,ql as loadVideoTextures,nl as loadWebFont,xs as localUniformBit,Mt as localUniformBitGl,Qd as localUniformMSDFBit,zb as log2,A0 as logDebugTexture,Gf as logLayerGroupScene,Bd as logProgramError,If as logScene,Jd as mSDFBit,ep as mSDFBitGl,Ld as mapFormatToGlFormat,Dd as mapFormatToGlInternalFormat,zd as mapFormatToGlType,Sd as mapSize,so as mapType,Fd as mapWebGLBlendModesToPixi,Oc as maskFrag,Uc as maskVert,bs as maskWgsl,uh as measureMixin,sx as migrateFragmentFromV7toV8,Gd as mipmapScaleModeToGlFilter,li as mixColors,Ts as mixHexColors,ty as mixStandardAnd32BitColors,n0 as multiplyHexColors,ut as nextPow2,Ru as noiseFrag,Kn as noiseWgsl,zt as normalizeExtensionPriority,ch as onRenderMixin,pe as path,Ql as removeItems,Jh as removeStructAndGroupDuplicates,Eo as resolveCharacters,Kl as resolveTextureUrl,rh as returnFilterEffect,Ip as sayHello,co as scaleModeToGlFilter,du as setProgramName,pu as setProgramVersion,D as settings,Gu as shockwaveFrag,$u as shockwaveVert,Zn as shockwaveWgsl,dh as sortMixin,_h as spritesheetAsset,Gr as testVideoFormat,hf as textStyleToCSS,By as textureBit,Ls as textureBitGl,Wd as tilingBit,Vd as tilingBitGl,ph as toLocalGlobalMixin,fi as transformVertices,Ms as triangulateWithHoles,Mi as uniformBufferParsers,wi as uniformParsers,dx as unpremultiplyAlpha,_o as updateLayerGroupTransforms,qd as updateLayerTransform,Ge as updateLocalTransform,rr as updateQuadBounds,wo as updateTransformAndChildren,qt as updateTransformBackwards,s0 as updateWorldTransform,z as v8_0_0,Zd as validateRenderables,fc as vertexGPUTemplate,gc as vertexGlTemplate,U0 as warn,Ti as wrapModeToGlAddress,ja as xmlBitmapFontLoader};
//# sourceMappingURL=pixi.min.mjs.map
