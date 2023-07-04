/*!
 * PixiJS - v8.0.0-alpha.1
 * Compiled Fri, 30 Jun 2023 10:42:48 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var md=Object.defineProperty,gd=Object.defineProperties,vd=Object.getOwnPropertyDescriptors,fo=Object.getOwnPropertySymbols,bd=Object.prototype.hasOwnProperty,yd=Object.prototype.propertyIsEnumerable,po=(r,e,t)=>e in r?md(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,mo=(r,e)=>{for(var t in e||(e={}))bd.call(e,t)&&po(r,t,e[t]);if(fo)for(var t of fo(e))yd.call(e,t)&&po(r,t,e[t]);return r},xd=(r,e)=>gd(r,vd(e)),x=(r=>(r.Renderer="renderer",r.Application="application",r.WebGLPipes="webgl-pipes",r.WebGLPipesAdaptor="webgl-pipes-adaptor",r.WebGLSystem="webgl-system",r.WebGPUPipes="webgpu-pipes",r.WebGPUPipesAdaptor="webgpu-pipes-adaptor",r.WebGPUSystem="webgpu-system",r.CanvasSystem="canvas-system",r.CanvasPipesAdaptor="canvas-pipes-adaptor",r.CanvasPipes="canvas-pipes",r.Asset="asset",r.LoadParser="load-parser",r.ResolveParser="resolve-parser",r.CacheParser="cache-parser",r.DetectionParser="detection-parser",r.MaskEffect="mask-effect",r))(x||{});const un=r=>{if(typeof r=="function"||typeof r=="object"&&r.extension){const e=typeof r.extension!="object"?{type:r.extension}:r.extension;r=xd(mo({},e),{ref:r})}if(typeof r=="object")r=mo({},r);else throw new Error("Invalid extension type");return typeof r.type=="string"&&(r.type=[r.type]),r},Mt=(r,e)=>{var t;return(t=un(r).priority)!=null?t:e},K={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...r){return r.map(un).forEach(e=>{e.type.forEach(t=>{var n,i;return(i=(n=this._removeHandlers)[t])==null?void 0:i.call(n,e)})}),this},add(...r){return r.map(un).forEach(e=>{e.type.forEach(t=>{const n=this._addHandlers,i=this._queue;n[t]?n[t](e):(i[t]=i[t]||[],i[t].push(e))})}),this},handle(r,e,t){const n=this._addHandlers,i=this._removeHandlers;n[r]=e,i[r]=t;const s=this._queue;return s[r]&&(s[r].forEach(o=>e(o)),delete s[r]),this},handleByMap(r,e){return this.handle(r,t=>{e[t.name]=t.ref},t=>{delete e[t.name]})},handleByNamedList(r,e,t=-1){return this.handle(r,n=>{e.findIndex(i=>i.name===n.name)>=0||(e.push({name:n.name,value:n.ref}),e.sort((i,s)=>Mt(s.value,t)-Mt(i.value,t)))},n=>{const i=e.findIndex(s=>s.name===n.name);i!==-1&&e.splice(i,1)})},handleByList(r,e,t=-1){return this.handle(r,n=>{e.includes(n.ref)||(e.push(n.ref),e.sort((i,s)=>Mt(s,t)-Mt(i,t)))},n=>{const i=e.indexOf(n.ref);i!==-1&&e.splice(i,1)})}};var it=(r=>(r[r.INTERACTION=50]="INTERACTION",r[r.HIGH=25]="HIGH",r[r.NORMAL=0]="NORMAL",r[r.LOW=-25]="LOW",r[r.UTILITY=-50]="UTILITY",r))(it||{});class or{constructor(e,t=null,n=0,i=!1){this.next=null,this.previous=null,this._destroyed=!1,this.fn=e,this.context=t,this.priority=n,this.once=i}match(e,t=null){return this.fn===e&&this.context===t}emit(e){this.fn&&(this.context?this.fn.call(this.context,e):this.fn(e));const t=this.next;return this.once&&this.destroy(!0),this._destroyed&&(this.next=null),t}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this.fn=null,this.context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const t=this.next;return this.next=e?null:t,this.previous=null,t}}const oe=class{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new or(null,null,1/0),this.deltaMS=1/oe.targetFPMS,this.elapsedMS=1/oe.targetFPMS,this._tick=r=>{this._requestId=null,this.started&&(this.update(r),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(r,e,t=it.NORMAL){return this._addListener(new or(r,e,t))}addOnce(r,e,t=it.NORMAL){return this._addListener(new or(r,e,t,!0))}_addListener(r){let e=this._head.next,t=this._head;if(!e)r.connect(t);else{for(;e;){if(r.priority>e.priority){r.connect(t);break}t=e,e=e.next}r.previous||r.connect(t)}return this._startIfPossible(),this}remove(r,e){let t=this._head.next;for(;t;)t.match(r,e)?t=t.destroy():t=t.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let r=0,e=this._head;for(;e=e.next;)r++;return r}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let r=this._head.next;for(;r;)r=r.destroy(!0);this._head.destroy(),this._head=null}}update(r=performance.now()){let e;if(r>this.lastTime){if(e=this.elapsedMS=r-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const i=r-this._lastFrame|0;if(i<this._minElapsedMS)return;this._lastFrame=r-i%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*oe.targetFPMS;const t=this._head;let n=t.next;for(;n;)n=n.emit(this);t.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=r}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(r){const e=Math.min(this.maxFPS,r),t=Math.min(Math.max(0,e)/1e3,oe.targetFPMS);this._maxElapsedMS=1/t}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(r){if(r===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,r);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!oe._shared){const r=oe._shared=new oe;r.autoStart=!0,r._protected=!0}return oe._shared}static get system(){if(!oe._system){const r=oe._system=new oe;r.autoStart=!0,r._protected=!0}return oe._system}};let st=oe;st.targetFPMS=.06;class cn{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,it.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?st.shared:new st,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}cn.extension=x.Application;class dn{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this.cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this.cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this.cancelResize();let t,n;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,n=globalThis.innerHeight;else{const{clientWidth:i,clientHeight:s}=this._resizeTo;t=i,n=s}this.renderer.resize(t,n),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this.cancelResize(),this.cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}dn.extension=x.Application,K.add(dn),K.add(cn);var Te=(r=>(r[r.Low=0]="Low",r[r.Normal=1]="Normal",r[r.High=2]="High",r))(Te||{});const ar=(r,e)=>{const t=e.split("?")[1];return t&&(r+=`?${t}`),r},go={createCanvas:(r,e)=>{const t=document.createElement("canvas");return t.width=r,t.height=e,t},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>{var r;return(r=document.baseURI)!=null?r:window.location.href},getFontFaceSet:()=>document.fonts,fetch:(r,e)=>fetch(r,e),parseXML:r=>new DOMParser().parseFromString(r,"text/xml")},F={ADAPTER:go,RETINA_PREFIX:/@([0-9\.]+)x/,FAIL_IF_MAJOR_PERFORMANCE_CAVEAT:!1,RESOLUTION:2};function me(r){if(typeof r!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`)}function Ct(r){return r.split("?")[0].split("#")[0]}function wd(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function _d(r,e,t){return r.replace(new RegExp(wd(e),"g"),t)}function Td(r,e){let t="",n=0,i=-1,s=0,o=-1;for(let a=0;a<=r.length;++a){if(a<r.length)o=r.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(i===a-1||s===1))if(i!==a-1&&s===2){if(t.length<2||n!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){const l=t.lastIndexOf("/");if(l!==t.length-1){l===-1?(t="",n=0):(t=t.slice(0,l),n=t.length-1-t.lastIndexOf("/")),i=a,s=0;continue}}else if(t.length===2||t.length===1){t="",n=0,i=a,s=0;continue}}e&&(t.length>0?t+="/..":t="..",n=2)}else t.length>0?t+=`/${r.slice(i+1,a)}`:t=r.slice(i+1,a),n=a-i-1;i=a,s=0}else o===46&&s!==-1?++s:s=-1}return t}const ie={toPosix(r){return _d(r,"\\","/")},isUrl(r){return/^https?:/.test(this.toPosix(r))},isDataUrl(r){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(r)},hasProtocol(r){return/^[^/:]+:\//.test(this.toPosix(r))},getProtocol(r){me(r),r=this.toPosix(r);let e="";const t=/^file:\/\/\//.exec(r),n=/^[^/:]+:\/\//.exec(r),i=/^[^/:]+:\//.exec(r);if(t||n||i){const s=(t==null?void 0:t[0])||(n==null?void 0:n[0])||(i==null?void 0:i[0]);e=s,r=r.slice(s.length)}return e},toAbsolute(r,e,t){if(this.isDataUrl(r))return r;const n=Ct(this.toPosix(e!=null?e:F.ADAPTER.getBaseUrl())),i=Ct(this.toPosix(t!=null?t:this.rootname(n)));return me(r),r=this.toPosix(r),r.startsWith("/")?ie.join(i,r.slice(1)):this.isAbsolute(r)?r:this.join(n,r)},normalize(r){if(r=this.toPosix(r),me(r),r.length===0)return".";let e="";const t=r.startsWith("/");this.hasProtocol(r)&&(e=this.rootname(r),r=r.slice(e.length));const n=r.endsWith("/");return r=Td(r,!1),r.length>0&&n&&(r+="/"),t?`/${r}`:e+r},isAbsolute(r){return me(r),r=this.toPosix(r),this.hasProtocol(r)?!0:r.startsWith("/")},join(...r){var e;if(r.length===0)return".";let t;for(let n=0;n<r.length;++n){const i=r[n];if(me(i),i.length>0)if(t===void 0)t=i;else{const s=(e=r[n-1])!=null?e:"";this.extname(s)?t+=`/../${i}`:t+=`/${i}`}}return t===void 0?".":this.normalize(t)},dirname(r){if(me(r),r.length===0)return".";r=this.toPosix(r);let e=r.charCodeAt(0);const t=e===47;let n=-1,i=!0;const s=this.getProtocol(r),o=r;r=r.slice(s.length);for(let a=r.length-1;a>=1;--a)if(e=r.charCodeAt(a),e===47){if(!i){n=a;break}}else i=!1;return n===-1?t?"/":this.isUrl(o)?s+r:s:t&&n===1?"//":s+r.slice(0,n)},rootname(r){me(r),r=this.toPosix(r);let e="";if(r.startsWith("/")?e="/":e=this.getProtocol(r),this.isUrl(r)){const t=r.indexOf("/",e.length);t!==-1?e=r.slice(0,t):e=r,e.endsWith("/")||(e+="/")}return e},basename(r,e){me(r),e&&me(e),r=Ct(this.toPosix(r));let t=0,n=-1,i=!0,s;if(e!==void 0&&e.length>0&&e.length<=r.length){if(e.length===r.length&&e===r)return"";let o=e.length-1,a=-1;for(s=r.length-1;s>=0;--s){const l=r.charCodeAt(s);if(l===47){if(!i){t=s+1;break}}else a===-1&&(i=!1,a=s+1),o>=0&&(l===e.charCodeAt(o)?--o===-1&&(n=s):(o=-1,n=a))}return t===n?n=a:n===-1&&(n=r.length),r.slice(t,n)}for(s=r.length-1;s>=0;--s)if(r.charCodeAt(s)===47){if(!i){t=s+1;break}}else n===-1&&(i=!1,n=s+1);return n===-1?"":r.slice(t,n)},extname(r){me(r),r=Ct(this.toPosix(r));let e=-1,t=0,n=-1,i=!0,s=0;for(let o=r.length-1;o>=0;--o){const a=r.charCodeAt(o);if(a===47){if(!i){t=o+1;break}continue}n===-1&&(i=!1,n=o+1),a===46?e===-1?e=o:s!==1&&(s=1):e!==-1&&(s=-1)}return e===-1||n===-1||s===0||s===1&&e===n-1&&e===t+1?"":r.slice(e,n)},parse(r){me(r);const e={root:"",dir:"",base:"",ext:"",name:""};if(r.length===0)return e;r=Ct(this.toPosix(r));let t=r.charCodeAt(0);const n=this.isAbsolute(r);let i;const s="";e.root=this.rootname(r),n||this.hasProtocol(r)?i=1:i=0;let o=-1,a=0,l=-1,h=!0,u=r.length-1,c=0;for(;u>=i;--u){if(t=r.charCodeAt(u),t===47){if(!h){a=u+1;break}continue}l===-1&&(h=!1,l=u+1),t===46?o===-1?o=u:c!==1&&(c=1):o!==-1&&(c=-1)}return o===-1||l===-1||c===0||c===1&&o===l-1&&o===a+1?l!==-1&&(a===0&&n?e.base=e.name=r.slice(1,l):e.base=e.name=r.slice(a,l)):(a===0&&n?(e.name=r.slice(1,o),e.base=r.slice(1,l)):(e.name=r.slice(a,o),e.base=r.slice(a,l)),e.ext=r.slice(o,l)),e.dir=this.dirname(r),s&&(e.dir=s+e.dir),e},sep:"/",delimiter:":"};var Fb=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function Ob(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Sd(r,e,t){return t={path:e,exports:{},require:function(n,i){return Pd(n,i==null?t.path:i)}},r(t,t.exports),t.exports}function Lb(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Db(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")&&Object.keys(r).length===1?r.default:r}function $b(r){if(r.__esModule)return r;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(r).forEach(function(t){var n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}),e}function Pd(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var re=Sd(function(r){"use strict";var e=Object.prototype.hasOwnProperty,t="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(t=!1));function i(l,h,u){this.fn=l,this.context=h,this.once=u||!1}function s(l,h,u,c,d){if(typeof u!="function")throw new TypeError("The listener must be a function");var f=new i(u,c||l,d),p=t?t+h:h;return l._events[p]?l._events[p].fn?l._events[p]=[l._events[p],f]:l._events[p].push(f):(l._events[p]=f,l._eventsCount++),l}function o(l,h){--l._eventsCount===0?l._events=new n:delete l._events[h]}function a(){this._events=new n,this._eventsCount=0}a.prototype.eventNames=function(){var h=[],u,c;if(this._eventsCount===0)return h;for(c in u=this._events)e.call(u,c)&&h.push(t?c.slice(1):c);return Object.getOwnPropertySymbols?h.concat(Object.getOwnPropertySymbols(u)):h},a.prototype.listeners=function(h){var u=t?t+h:h,c=this._events[u];if(!c)return[];if(c.fn)return[c.fn];for(var d=0,f=c.length,p=new Array(f);d<f;d++)p[d]=c[d].fn;return p},a.prototype.listenerCount=function(h){var u=t?t+h:h,c=this._events[u];return c?c.fn?1:c.length:0},a.prototype.emit=function(h,u,c,d,f,p){var g=t?t+h:h;if(!this._events[g])return!1;var m=this._events[g],y=arguments.length,b,v;if(m.fn){switch(m.once&&this.removeListener(h,m.fn,void 0,!0),y){case 1:return m.fn.call(m.context),!0;case 2:return m.fn.call(m.context,u),!0;case 3:return m.fn.call(m.context,u,c),!0;case 4:return m.fn.call(m.context,u,c,d),!0;case 5:return m.fn.call(m.context,u,c,d,f),!0;case 6:return m.fn.call(m.context,u,c,d,f,p),!0}for(v=1,b=new Array(y-1);v<y;v++)b[v-1]=arguments[v];m.fn.apply(m.context,b)}else{var w=m.length,P;for(v=0;v<w;v++)switch(m[v].once&&this.removeListener(h,m[v].fn,void 0,!0),y){case 1:m[v].fn.call(m[v].context);break;case 2:m[v].fn.call(m[v].context,u);break;case 3:m[v].fn.call(m[v].context,u,c);break;case 4:m[v].fn.call(m[v].context,u,c,d);break;default:if(!b)for(P=1,b=new Array(y-1);P<y;P++)b[P-1]=arguments[P];m[v].fn.apply(m[v].context,b)}}return!0},a.prototype.on=function(h,u,c){return s(this,h,u,c,!1)},a.prototype.once=function(h,u,c){return s(this,h,u,c,!0)},a.prototype.removeListener=function(h,u,c,d){var f=t?t+h:h;if(!this._events[f])return this;if(!u)return o(this,f),this;var p=this._events[f];if(p.fn)p.fn===u&&(!d||p.once)&&(!c||p.context===c)&&o(this,f);else{for(var g=0,m=[],y=p.length;g<y;g++)(p[g].fn!==u||d&&!p[g].once||c&&p[g].context!==c)&&m.push(p[g]);m.length?this._events[f]=m.length===1?m[0]:m:o(this,f)}return this},a.prototype.removeAllListeners=function(h){var u;return h?(u=t?t+h:h,this._events[u]&&o(this,u)):(this._events=new n,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=t,a.EventEmitter=a,r.exports=a});class N{constructor(e=0,t=0){this.x=0,this.y=0,this.x=e,this.y=t}clone(){return new N(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,t=e){return this.x=e,this.y=t,this}static get shared(){return fn.x=0,fn.y=0,fn}}const fn=new N,lr=[new N,new N,new N,new N];class q{constructor(e=0,t=0,n=0,i=0){this.type="rectangle",this.x=Number(e),this.y=Number(t),this.width=Number(n),this.height=Number(i)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}static get EMPTY(){return new q(0,0,0,0)}clone(){return new q(this.x,this.y,this.width,this.height)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&t>=this.y&&t<this.y+this.height}intersects(e,t){if(!t){const E=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=E)return!1;const _=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>_}const n=this.left,i=this.right,s=this.top,o=this.bottom;if(i<=n||o<=s)return!1;const a=lr[0].set(e.left,e.top),l=lr[1].set(e.left,e.bottom),h=lr[2].set(e.right,e.top),u=lr[3].set(e.right,e.bottom);if(h.x<=a.x||l.y<=a.y)return!1;const c=Math.sign(t.a*t.d-t.b*t.c);if(c===0||(t.apply(a,a),t.apply(l,l),t.apply(h,h),t.apply(u,u),Math.max(a.x,l.x,h.x,u.x)<=n||Math.min(a.x,l.x,h.x,u.x)>=i||Math.max(a.y,l.y,h.y,u.y)<=s||Math.min(a.y,l.y,h.y,u.y)>=o))return!1;const d=c*(l.y-a.y),f=c*(a.x-l.x),p=d*n+f*s,g=d*i+f*s,m=d*n+f*o,y=d*i+f*o;if(Math.max(p,g,m,y)<=d*a.x+f*a.y||Math.min(p,g,m,y)>=d*u.x+f*u.y)return!1;const b=c*(a.y-h.y),v=c*(h.x-a.x),w=b*n+v*s,P=b*i+v*s,A=b*n+v*o,C=b*i+v*o;return!(Math.max(w,P,A,C)<=b*a.x+v*a.y||Math.min(w,P,A,C)>=b*u.x+v*u.y)}pad(e=0,t=e){return this.x-=e,this.y-=t,this.width+=e*2,this.height+=t*2,this}fit(e){const t=Math.max(this.x,e.x),n=Math.min(this.x+this.width,e.x+e.width),i=Math.max(this.y,e.y),s=Math.min(this.y+this.height,e.y+e.height);return this.x=t,this.width=Math.max(n-t,0),this.y=i,this.height=Math.max(s-i,0),this}ceil(e=1,t=.001){const n=Math.ceil((this.x+this.width-t)*e)/e,i=Math.ceil((this.y+this.height-t)*e)/e;return this.x=Math.floor((this.x+t)*e)/e,this.y=Math.floor((this.y+t)*e)/e,this.width=n-this.x,this.height=i-this.y,this}enlarge(e){const t=Math.min(this.x,e.x),n=Math.max(this.x+this.width,e.x+e.width),i=Math.min(this.y,e.y),s=Math.max(this.y+this.height,e.y+e.height);return this.x=t,this.width=n-t,this.y=i,this.height=s-i,this}getBounds(e){return e=e||new q,e.copyFrom(this),e}}const le=(r,e)=>(Array.isArray(r)||(r=[r]),e?r.map(t=>typeof t=="string"?e(t):t):r);class Ed{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){return this._cache.get(e)}set(e,t){const n=le(e);let i;for(let a=0;a<this.parsers.length;a++){const l=this.parsers[a];if(l.test(t)){i=l.getCacheableAssets(n,t);break}}i||(i={},n.forEach(a=>{i[a]=t}));const s=Object.keys(i),o={cacheKeys:s,keys:n};n.forEach(a=>{this._cacheMap.set(a,o)}),s.forEach(a=>{this._cache.has(a)&&this._cache.get(a),this._cache.set(a,i[a])})}remove(e){if(this._cacheMap.get(e),!this._cacheMap.has(e))return;const t=this._cacheMap.get(e);t.cacheKeys.forEach(n=>{this._cache.delete(n)}),t.keys.forEach(n=>{this._cacheMap.delete(n)})}get parsers(){return this._parsers}}const ae=new Ed,At=()=>{},pn={},vo={};function hr(r,e){let t=vo[r];return t===void 0&&(pn[e]===void 0&&(pn[e]=1),vo[r]=t=pn[e]++),t}var Md=Object.defineProperty,bo=Object.getOwnPropertySymbols,Cd=Object.prototype.hasOwnProperty,Ad=Object.prototype.propertyIsEnumerable,yo=(r,e,t)=>e in r?Md(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,xo=(r,e)=>{for(var t in e||(e={}))Cd.call(e,t)&&yo(r,t,e[t]);if(bo)for(var t of bo(e))Ad.call(e,t)&&yo(r,t,e[t]);return r};let Bd=0;const wo=class extends re{constructor(r={}){var e,t,n,i,s,o,a;super(),this.resourceType="textureSampler",this.uid=Bd++,this._maxAnisotropy=1,r=xo(xo({},wo.DEFAULT),r),this.addressMode=r.addressMode,this.addressModeU=(e=r.addressModeU)!=null?e:this.addressModeU,this.addressModeV=(t=r.addressModeV)!=null?t:this.addressModeV,this.addressModeW=(n=r.addressModeW)!=null?n:this.addressModeW,this.scaleMode=r.scaleMode,this.magFilter=(i=r.magFilter)!=null?i:this.magFilter,this.minFilter=(s=r.minFilter)!=null?s:this.minFilter,this.mipmapFilter=(o=r.mipmapFilter)!=null?o:this.mipmapFilter,this.lodMinClamp=r.lodMinClamp,this.lodMaxClamp=r.lodMaxClamp,this.compare=r.compare,this.maxAnisotropy=(a=r.maxAnisotropy)!=null?a:1}set addressMode(r){this.addressModeU=r,this.addressModeV=r,this.addressModeW=r}get addressMode(){return this.addressModeU}set scaleMode(r){this.magFilter=r,this.minFilter=r,this.mipmapFilter=r}get scaleMode(){return this.magFilter}set maxAnisotropy(r){this._maxAnisotropy=Math.min(r,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get resourceId(){return this._resourceId||this.generateResourceId()}update(){this.emit("change",this),this._resourceId=null}generateResourceId(){const r=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._resourceId=hr(r,"sampler"),this._resourceId}destroy(){this.emit("destroy",this),this.removeAllListeners()}};let De=wo;De.DEFAULT={addressMode:"clamp-to-edge",scaleMode:"nearest"};let Rd=0,kd=0;class ge extends re{constructor(e={}){var t,n,i,s,o,a,l,h,u,c,d,f,p;super(),this.uid=Rd++,this.resourceType="textureSource",this.resourceId=kd++,this.type="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm-srgb",this.viewDimensions="2d",this.dimension="2d",this.antialias=!1,this.depthStencil=!0,this.resource=e.resource,this._resolution=(t=e.resolution)!=null?t:1,e.width?this.pixelWidth=e.width*this._resolution:this.pixelWidth=(i=(n=e.resource)==null?void 0:n.width)!=null?i:1,e.height?this.pixelHeight=e.height*this._resolution:this.pixelHeight=(o=(s=e.resource)==null?void 0:s.height)!=null?o:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=(a=e.format)!=null?a:"bgra8unorm",this.viewDimensions=(l=e.view)!=null?l:"2d",this.dimension=(h=e.dimensions)!=null?h:"2d",this.mipLevelCount=(u=e.mipLevelCount)!=null?u:1,this.autoGenerateMipmaps=(c=e.autoGenerateMipmaps)!=null?c:!1,this.sampleCount=(d=e.sampleCount)!=null?d:1,this.antialias=(f=e.antialias)!=null?f:!1;const g=(p=e.style)!=null?p:{};this.style=g instanceof De?g:new De(g),this.style.on("change",this.onStyleUpdate,this),this.styleSourceKey=(this.style.resourceId<<24)+this.uid}get source(){return this}update(){this.emit("update",this)}onStyleUpdate(){this.styleSourceKey=(this.style.resourceId<<24)+this.uid}destroy(){this.emit("destroy",this),this.style&&(this.style.destroy(),this.style=null),this.type=null,this.resource=null,this.removeAllListeners()}get resolution(){return this._resolution}set resolution(e){this._resolution!==e&&(this._resolution=e,this.width=this.pixelWidth/e,this.height=this.pixelHeight/e)}resize(e,t,n){n=n||this._resolution,e=e||this.width,t=t||this.height;const i=Math.round(e*n),s=Math.round(t*n);this.width=i/n,this.height=s/n,this._resolution=n,!(this.pixelWidth===i&&this.pixelHeight===s)&&(this.pixelWidth=i,this.pixelHeight=s,this.emit("resize",this),this.resourceId++,this.emit("change",this))}}const _o=Math.PI*2,To=180/Math.PI,So=Math.PI/180;class B{constructor(e=1,t=0,n=0,i=1,s=0,o=0){this.array=null,this.a=e,this.b=t,this.c=n,this.d=i,this.tx=s,this.ty=o}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,t,n,i,s,o){return this.a=e,this.b=t,this.c=n,this.d=i,this.tx=s,this.ty=o,this}toArray(e,t){this.array||(this.array=new Float32Array(9));const n=t||this.array;return e?(n[0]=this.a,n[1]=this.b,n[2]=0,n[3]=this.c,n[4]=this.d,n[5]=0,n[6]=this.tx,n[7]=this.ty,n[8]=1):(n[0]=this.a,n[1]=this.c,n[2]=this.tx,n[3]=this.b,n[4]=this.d,n[5]=this.ty,n[6]=0,n[7]=0,n[8]=1),n}apply(e,t){t=t||new N;const n=e.x,i=e.y;return t.x=this.a*n+this.c*i+this.tx,t.y=this.b*n+this.d*i+this.ty,t}applyInverse(e,t){t=t||new N;const n=this.a,i=this.b,s=this.c,o=this.d,a=this.tx,l=this.ty,h=1/(n*o+s*-i),u=e.x,c=e.y;return t.x=o*h*u+-s*h*c+(l*s-a*o)*h,t.y=n*h*c+-i*h*u+(-l*n+a*i)*h,t}translate(e,t){return this.tx+=e,this.ty+=t,this}scale(e,t){return this.a*=e,this.d*=t,this.c*=e,this.b*=t,this.tx*=e,this.ty*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),i=this.a,s=this.c,o=this.tx;return this.a=i*t-this.b*n,this.b=i*n+this.b*t,this.c=s*t-this.d*n,this.d=s*n+this.d*t,this.tx=o*t-this.ty*n,this.ty=o*n+this.ty*t,this}append(e){const t=this.a,n=this.b,i=this.c,s=this.d;return this.a=e.a*t+e.b*i,this.b=e.a*n+e.b*s,this.c=e.c*t+e.d*i,this.d=e.c*n+e.d*s,this.tx=e.tx*t+e.ty*i+this.tx,this.ty=e.tx*n+e.ty*s+this.ty,this}appendFrom(e,t){const n=e.a,i=e.b,s=e.c,o=e.d,a=e.tx,l=e.ty,h=t.a,u=t.b,c=t.c,d=t.d;return this.a=n*h+i*c,this.b=n*u+i*d,this.c=s*h+o*c,this.d=s*u+o*d,this.tx=a*h+l*c+t.tx,this.ty=a*u+l*d+t.ty,this}setTransform(e,t,n,i,s,o,a,l,h){return this.a=Math.cos(a+h)*s,this.b=Math.sin(a+h)*s,this.c=-Math.sin(a-l)*o,this.d=Math.cos(a-l)*o,this.tx=e-(n*this.a+i*this.c),this.ty=t-(n*this.b+i*this.d),this}prepend(e){const t=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const n=this.a,i=this.c;this.a=n*e.a+this.b*e.c,this.b=n*e.b+this.b*e.d,this.c=i*e.a+this.d*e.c,this.d=i*e.b+this.d*e.d}return this.tx=t*e.a+this.ty*e.c+e.tx,this.ty=t*e.b+this.ty*e.d+e.ty,this}decompose(e){const t=this.a,n=this.b,i=this.c,s=this.d,o=e.pivot,a=-Math.atan2(-i,s),l=Math.atan2(n,t),h=Math.abs(a+l);return h<1e-5||Math.abs(_o-h)<1e-5?(e.rotation=l,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=a,e.skew.y=l),e.scale.x=Math.sqrt(t*t+n*n),e.scale.y=Math.sqrt(i*i+s*s),e.position.x=this.tx+(o.x*t+o.y*i),e.position.y=this.ty+(o.x*n+o.y*s),e}invert(){const e=this.a,t=this.b,n=this.c,i=this.d,s=this.tx,o=e*i-t*n;return this.a=i/o,this.b=-t/o,this.c=-n/o,this.d=e/o,this.tx=(n*this.ty-i*s)/o,this.ty=-(e*this.ty-t*s)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new B;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}static get IDENTITY(){return Gd.identity()}static get shared(){return Ud.identity()}}const Ud=new B,Gd=new B,$e=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],Ne=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],ze=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],We=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],mn=[],Po=[],ur=Math.sign;function Id(){for(let r=0;r<16;r++){const e=[];mn.push(e);for(let t=0;t<16;t++){const n=ur($e[r]*$e[t]+ze[r]*Ne[t]),i=ur(Ne[r]*$e[t]+We[r]*Ne[t]),s=ur($e[r]*ze[t]+ze[r]*We[t]),o=ur(Ne[r]*ze[t]+We[r]*We[t]);for(let a=0;a<16;a++)if($e[a]===n&&Ne[a]===i&&ze[a]===s&&We[a]===o){e.push(a);break}}}for(let r=0;r<16;r++){const e=new B;e.set($e[r],Ne[r],ze[r],We[r],0,0),Po.push(e)}}Id();const I={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:r=>$e[r],uY:r=>Ne[r],vX:r=>ze[r],vY:r=>We[r],inv:r=>r&8?r&15:-r&7,add:(r,e)=>mn[r][e],sub:(r,e)=>mn[r][I.inv(e)],rotate180:r=>r^4,isVertical:r=>(r&3)===2,byDirection:(r,e)=>Math.abs(r)*2<=Math.abs(e)?e>=0?I.S:I.N:Math.abs(e)*2<=Math.abs(r)?r>0?I.E:I.W:e>0?r>0?I.SE:I.SW:r>0?I.NE:I.NW,matrixAppendRotationInv:(r,e,t=0,n=0)=>{const i=Po[I.inv(e)];i.tx=t,i.ty=n,r.append(i)}};class gn extends re{constructor(e={}){var t;super(),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=e.frame||new q(0,0,1,1),this.orig=e.orig||this.frame,this.rotate=(t=e.rotate)!=null?t:0,this.trim=e.trim,this.defaultAnchor=e.defaultAnchor,this.updateUvs()}updateUvs(){const e=this.uvs,t=this.frame;let n=this.rotate;if(n){const i=t.width/2,s=t.height/2,o=t.x+i,a=t.y+s;n=I.add(n,I.NW),e.x0=o+i*I.uX(n),e.y0=a+s*I.uY(n),n=I.add(n,2),e.x1=o+i*I.uX(n),e.y1=a+s*I.uY(n),n=I.add(n,2),e.x2=o+i*I.uX(n),e.y2=a+s*I.uY(n),n=I.add(n,2),e.x3=o+i*I.uX(n),e.y3=a+s*I.uY(n)}else e.x0=t.x,e.y0=t.y,e.x1=t.x+t.width,e.y1=t.y,e.x2=t.x+t.width,e.y2=t.y+t.height,e.x3=t.x,e.y3=t.y+t.height}update(){this.updateUvs(),this.emit("update",this)}destroy(){this.emit("destroy",this),this.removeAllListeners(),this.frame=null,this.orig=null,this.trim=null,this.defaultAnchor=null,this.uvs=null}}const Eo=new B;class vn{constructor(e,t){this.mapCoord=new B,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof t=="undefined"?.5:t,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){var t;this.texture!==e&&((t=this._texture)==null||t.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,t){t===void 0&&(t=e);const n=this.mapCoord;for(let i=0;i<e.length;i+=2){const s=e[i],o=e[i+1];t[i]=s*n.a+o*n.c+n.tx,t[i+1]=s*n.b+o*n.d+n.ty}return t}update(){const e=this._texture;this._updateID++;const t=e.layout.uvs;this.mapCoord.set(t.x1-t.x0,t.y1-t.y0,t.x3-t.x0,t.y3-t.y0,t.x0,t.y0);const n=e.layout.orig,i=e.layout.trim;i&&(Eo.set(n.width/i.width,0,0,n.height/i.height,-i.x/i.width,-i.y/i.height),this.mapCoord.append(Eo));const s=e.source,o=this.uClampFrame,a=this.clampMargin/s._resolution,l=this.clampOffset;return o[0]=(e.frameX+a+l)/s.width,o[1]=(e.frameY+a+l)/s.height,o[2]=(e.frameX+e.frameWidth-a+l)/s.width,o[3]=(e.frameY+e.frameHeight-a+l)/s.height,this.uClampOffset[0]=l/s.pixelWidth,this.uClampOffset[1]=l/s.pixelHeight,this.isSimple=e.frameWidth===s.width&&e.frameHeight===s.height&&e.layout.rotate===0,!0}}let Fd=0;class k extends re{constructor({source:e,style:t,layout:n,label:i}={}){var s;super(),this.id=Fd++,this.styleSourceKey=0,this.label=i,this.source=(s=e==null?void 0:e.source)!=null?s:new ge,this.layout=n instanceof gn?n:new gn(n),t&&(this._style=t instanceof De?t:new De(t)),this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid}static from(e){return ae.get(e)}set source(e){this._source&&(this._source.off("update",this.onStyleSourceUpdate,this),this._source.off("resize",this.onUpdate,this)),this._source=e,e.on("update",this.onStyleSourceUpdate,this),e.on("resize",this.onUpdate,this),this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid,this.emit("update",this)}get source(){return this._source}get style(){return this._style||this.source.style}set style(e){var t,n;(t=this._style)==null||t.off("change",this.onStyleSourceUpdate,this),this._style=e,(n=this._style)==null||n.on("change",this.onStyleSourceUpdate,this)}get layout(){return this._layout}set layout(e){var t;(t=this._layout)==null||t.off("update",this.onUpdate,this),this._layout=e,e.on("update",this.onUpdate,this),this.emit("update",this)}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new vn(this)),this._textureMatrix}set frameWidth(e){this._layout.frame.width=e/this._source.width}get frameWidth(){return this._source.pixelWidth/this._source._resolution*this._layout.frame.width}set frameHeight(e){this._layout.frame.height=e/this._source.height}get frameHeight(){return this._source.pixelHeight/this._source._resolution*this._layout.frame.height}set frameX(e){if(e===0){this._layout.frame.x=0;return}this._layout.frame.x=this._source.width/e}get frameX(){return this._source.width*this._layout.frame.x}set frameY(e){if(e===0){this._layout.frame.y=0;return}this._layout.frame.y=this._source.height/e}get frameY(){return this._source.height*this._layout.frame.y}get width(){return this._source.width*this._layout.orig.width}get height(){return this._source.height*this._layout.orig.height}destroy(e=!1){this._style&&(this._style.destroy(),this._style=null),this._layout&&(this._layout.destroy(),this._layout=null),this._source&&e&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.removeAllListeners()}onStyleSourceUpdate(){this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid,this.emit("update",this)}onUpdate(){this.emit("update",this)}}k.EMPTY=new k({}),k.EMPTY.label="EMPTY",k.EMPTY.destroy=At;class bn extends re{constructor(e){var t;super(),this.baseRenderedFontSize=100,this.baseMeasurementFontSize=100,this.pages=[],this.chars={},this.lineHeight=0,this.baseLineOffset=0,this.pages=[];const{textures:n,data:i}=e;Object.keys(i.pages).forEach(s=>{const o=i.pages[parseInt(s,10)],a=n[o.id];this.pages.push({texture:a})}),Object.keys(i.chars).forEach(s=>{var o;const a=i.chars[s],l=n[a.page].source,h=new q(a.x/l.width,a.y/l.height,a.width/l.width,a.height/l.height),u=new k({source:l,layout:{frame:h}});this.chars[s]={id:s.codePointAt(0),xOffset:a.xOffset,yOffset:a.yOffset,xAdvance:a.xAdvance,kerning:(o=a.kerning)!=null?o:{},texture:u}}),this.fontMetrics={ascent:0,descent:0,fontSize:i.fontSize},this.baseLineOffset=i.baseLineOffset,this.lineHeight=i.lineHeight,this.fontName=i.fontName,this.baseMeasurementFontSize=i.fontSize,this.baseRenderedFontSize=i.fontSize,this.distanceField=(t=i.distanceField)!=null?t:{fieldType:"none",distanceRange:0}}destroy(){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture.destroy();this.chars=null;for(let e=0;e<this.pages.length;e++){const{texture:t}=this.pages[e];t.destroy(!0)}this.pages=null}}const cr={test(r){return typeof r=="string"&&r.startsWith("info face=")},parse(r){var e,t;const n=r.match(/^[a-z]+\s+.+$/gm),i={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const f in n){const p=n[f].match(/^[a-z]+/gm)[0],g=n[f].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),m={};for(const y in g){const b=g[y].split("="),v=b[0],w=b[1].replace(/"/gm,""),P=parseFloat(w),A=isNaN(P)?w:P;m[v]=A}i[p].push(m)}const s={chars:{},pages:[],lineHeight:0,fontSize:0,fontName:"",distanceField:null,baseLineOffset:0},[o]=i.info,[a]=i.common,[l]=(e=i.distanceField)!=null?e:[];l&&(s.distanceField={distanceRange:parseInt(l.distanceRange,10),fieldType:l.fieldType}),s.fontSize=parseInt(o.size,10),s.fontName=o.face,s.lineHeight=parseInt(a.lineHeight,10);const h=i.page;for(let f=0;f<h.length;f++)s.pages.push({id:parseInt(h[f].id,10)||0,file:h[f].file});const u={};s.baseLineOffset=s.lineHeight-parseInt(a.base,10);const c=i.char;for(let f=0;f<c.length;f++){const p=c[f],g=parseInt(p.id,10);let m=(t=p.letter)!=null?t:p.char;m==="space"&&(m=" "),u[g]=m,s.chars[m]={id:g,page:parseInt(p.page,10)||0,x:parseInt(p.x,10),y:parseInt(p.y,10),width:parseInt(p.width,10),height:parseInt(p.height,10),xOffset:parseInt(p.xoffset,10),yOffset:parseInt(p.yoffset,10),xAdvance:parseInt(p.xadvance,10),kerning:{}}}const d=i.kerning||[];for(let f=0;f<d.length;f++){const p=parseInt(d[f].first,10),g=parseInt(d[f].second,10),m=parseInt(d[f].amount,10);s.chars[u[g]].kerning[u[p]]=m}return s}},yn={test(r){const e=r;return"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(r){var e;const t={chars:{},pages:[],lineHeight:0,fontSize:0,fontName:"",distanceField:null,baseLineOffset:0},n=r.getElementsByTagName("info")[0],i=r.getElementsByTagName("common")[0],s=r.getElementsByTagName("distanceField")[0];s&&(t.distanceField={fieldType:s.getAttribute("fieldType"),distanceRange:parseInt(s.getAttribute("distanceRange"),10)});const o=r.getElementsByTagName("page"),a=r.getElementsByTagName("char"),l=r.getElementsByTagName("kerning");t.fontSize=parseInt(n.getAttribute("size"),10),t.fontName=n.getAttribute("face"),t.lineHeight=parseInt(i.getAttribute("lineHeight"),10);for(let u=0;u<o.length;u++)t.pages.push({id:parseInt(o[u].getAttribute("id"),10)||0,file:o[u].getAttribute("file")});const h={};t.baseLineOffset=t.lineHeight-parseInt(i.getAttribute("base"),10);for(let u=0;u<a.length;u++){const c=a[u],d=parseInt(c.getAttribute("id"),10);let f=(e=c.getAttribute("letter"))!=null?e:c.getAttribute("char");f==="space"&&(f=" "),h[d]=f,t.chars[f]={id:d,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let u=0;u<l.length;u++){const c=parseInt(l[u].getAttribute("first"),10),d=parseInt(l[u].getAttribute("second"),10),f=parseInt(l[u].getAttribute("amount"),10);t.chars[h[d]].kerning[h[c]]=f}return t}},xn={test(r){return typeof r=="string"&&r.includes("<font>")?yn.test(F.ADAPTER.parseXML(r)):!1},parse(r){return yn.parse(F.ADAPTER.parseXML(r))}},Od=[".xml",".fnt"],Mo={extension:x.CacheParser,test:r=>r instanceof bn,getCacheableAssets(r,e){const t={};return r.forEach(n=>{t[n]=e}),t[e.fontName]=e,t}},Co={extension:{type:x.LoadParser,priority:Te.Normal},test(r){return Od.includes(ie.extname(r).toLowerCase())},async testParse(r){return cr.test(r)||xn.test(r)},async parse(r,e,t){const n=cr.test(r)?cr.parse(r):xn.parse(r),{src:i}=e,{pages:s}=n,o=[];for(let h=0;h<s.length;++h){const u=s[h].file;let c=ie.join(ie.dirname(i),u);c=ar(c,i),o.push(c)}const a=await t.load(o),l=o.map(h=>a[h]);return new bn({data:n,textures:l})},async load(r,e){return await(await F.ADAPTER.fetch(r)).text()},unload(r){r.destroy()}},Ao={extension:x.CacheParser,test:r=>Array.isArray(r)&&r.every(e=>e instanceof k),getCacheableAssets:(r,e)=>{const t={};return r.forEach(n=>{e.forEach((i,s)=>{t[n+(s===0?"":s+1)]=i})}),t}},Bo={extension:{type:x.DetectionParser,priority:1},test:async()=>{if(!globalThis.createImageBitmap)return!1;const r="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=",e=await F.ADAPTER.fetch(r).then(t=>t.blob());return createImageBitmap(e).then(()=>!0,()=>!1)},add:async r=>[...r,"avif"],remove:async r=>r.filter(e=>e!=="avif")},Ro=["png","jpg","jpeg"],ko={extension:{type:x.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async r=>[...r,...Ro],remove:async r=>r.filter(e=>!Ro.includes(e))},Ld="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function dr(r){return Ld?!1:document.createElement("video").canPlayType(r)!==""}const Uo={extension:{type:x.DetectionParser,priority:0},test:async()=>dr("video/mp4"),add:async r=>[...r,"mp4","m4v"],remove:async r=>r.filter(e=>e!=="mp4"&&e!=="m4v")},Go={extension:{type:x.DetectionParser,priority:0},test:async()=>dr("video/ogg"),add:async r=>[...r,"ogv"],remove:async r=>r.filter(e=>e!=="ogv")},Io={extension:{type:x.DetectionParser,priority:0},test:async()=>dr("video/webm"),add:async r=>[...r,"webm"],remove:async r=>r.filter(e=>e!=="webm")},Fo={extension:{type:x.DetectionParser,priority:0},test:async()=>{if(!globalThis.createImageBitmap)return!1;const r="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",e=await F.ADAPTER.fetch(r).then(t=>t.blob());return createImageBitmap(e).then(()=>!0,()=>!1)},add:async r=>[...r,"webp"],remove:async r=>r.filter(e=>e!=="webp")};function ot(r,e){if(Array.isArray(e)){for(const t of e)if(r.startsWith(`data:${t}`))return!0;return!1}return r.startsWith(`data:${e}`)}function at(r,e){const t=r.split("?")[0],n=ie.extname(t).toLowerCase();return Array.isArray(e)?e.includes(n):n===e}const Dd=".json",$d="application/json",Oo={extension:{type:x.LoadParser,priority:Te.Low},name:"loadJson",test(r){return ot(r,$d)||at(r,Dd)},async load(r){return await(await F.ADAPTER.fetch(r)).json()}},Nd=".txt",zd="text/plain",Lo={name:"loadTxt",extension:{type:x.LoadParser,priority:Te.Low},test(r){return ot(r,zd)||at(r,Nd)},async load(r){return await(await F.ADAPTER.fetch(r)).text()}};var Wd=Object.defineProperty,Hd=Object.defineProperties,Vd=Object.getOwnPropertyDescriptors,Do=Object.getOwnPropertySymbols,jd=Object.prototype.hasOwnProperty,Yd=Object.prototype.propertyIsEnumerable,$o=(r,e,t)=>e in r?Wd(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Xd=(r,e)=>{for(var t in e||(e={}))jd.call(e,t)&&$o(r,t,e[t]);if(Do)for(var t of Do(e))Yd.call(e,t)&&$o(r,t,e[t]);return r},qd=(r,e)=>Hd(r,Vd(e));const Kd=["normal","bold","100","200","300","400","500","600","700","800","900"],Zd=[".ttf",".otf",".woff",".woff2"],Qd=["font/ttf","font/otf","font/woff","font/woff2"],Jd=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function No(r){const e=ie.extname(r),t=ie.basename(r,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1));let n=t.length>0;for(const s of t)if(!s.match(Jd)){n=!1;break}let i=t.join(" ");return n||(i=`"${i.replace(/[\\"]/g,"\\$&")}"`),i}const zo={extension:{type:x.LoadParser,priority:Te.Low},name:"loadWebFont",test(r){return ot(r,Qd)||at(r,Zd)},async load(r,e){var t,n,i,s,o,a;const l=F.ADAPTER.getFontFaceSet();if(l){const h=[],u=(n=(t=e.data)==null?void 0:t.family)!=null?n:No(r),c=(o=(s=(i=e.data)==null?void 0:i.weights)==null?void 0:s.filter(f=>Kd.includes(f)))!=null?o:["normal"],d=(a=e.data)!=null?a:{};for(let f=0;f<c.length;f++){const p=c[f],g=new FontFace(u,`url(${encodeURI(r)})`,qd(Xd({},d),{weight:p}));await g.load(),l.add(g),h.push(g)}return h.length===1?h[0]:h}return null},unload(r){(Array.isArray(r)?r:[r]).forEach(e=>F.ADAPTER.getFontFaceSet().delete(e))}},wn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function ve(r){if(typeof r=="number")return r;if(typeof r=="string"){if(wn[r]!==void 0)return wn[r];if(r[0]==="#"){if(r.length===4){const e=parseInt(r[1]+r[1],16),t=parseInt(r[2]+r[2],16),n=parseInt(r[3]+r[3],16);return(e<<16)+(t<<8)+n}return parseInt(r.substring(1),16)}console.warn(`[pixi.js] Invalid color: ${r}`)}return 0}class pe{constructor(e=1/0,t=1/0,n=-1/0,i=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrixStack=[],this.matrix=new B,this.minX=e,this.minY=t,this.maxX=n,this.maxY=i}get rectangle(){this._rectangle||(this._rectangle=new q);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):(e.x=this.minX,e.y=this.minY,e.width=this.maxX-this.minX,e.height=this.maxY-this.minY),e}clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this.matrixStack.length=0,this.matrix.identity()}pushMatrix(e){this.matrixStack.push(e),this.matrixStack.length>1?(this.matrix.copyFrom(this.matrixStack[this.matrixStack.length-2]),this.matrix.append(e)):this.matrix.copyFrom(e)}popMatrix(){this.matrixStack.pop(),this.matrixStack.length>1?(this.matrix.copyFrom(this.matrixStack[this.matrixStack.length-2]),this.matrix.append(this.matrixStack[this.matrixStack.length-1])):this.matrixStack.length===1?this.matrix.copyFrom(this.matrixStack[0]):this.matrix.identity()}setMatrix(e){this.matrix.copyFrom(e)}set(e,t,n,i){this.minX=e,this.minY=t,this.maxX=n,this.maxY=i}addFrame(e,t,n,i){const s=this.matrix,o=s.a,a=s.b,l=s.c,h=s.d,u=s.tx,c=s.ty;let d=this.minX,f=this.minY,p=this.maxX,g=this.maxY,m=o*e+l*t+u,y=a*e+h*t+c;d=m<d?m:d,f=y<f?y:f,p=m>p?m:p,g=y>g?y:g,m=o*n+l*t+u,y=a*n+h*t+c,d=m<d?m:d,f=y<f?y:f,p=m>p?m:p,g=y>g?y:g,m=o*e+l*i+u,y=a*e+h*i+c,d=m<d?m:d,f=y<f?y:f,p=m>p?m:p,g=y>g?y:g,m=o*n+l*i+u,y=a*n+h*i+c,d=m<d?m:d,f=y<f?y:f,p=m>p?m:p,g=y>g?y:g,this.minX=d,this.minY=f,this.maxX=p,this.maxY=g}addRect(e){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height)}addBounds(e){this.addFrame(e.minX,e.minY,e.maxX,e.maxY)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const t=this.minX,n=this.minY,i=this.maxX,s=this.maxY,{a:o,b:a,c:l,d:h,tx:u,ty:c}=e;let d=o*t+l*n+u,f=a*t+h*n+c;this.minX=d,this.minY=f,this.maxX=d,this.maxY=f,d=o*i+l*n+u,f=a*i+h*n+c,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*t+l*s+u,f=a*t+h*s+c,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*i+l*s+u,f=a*i+h*s+c,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}pad(e,t=e){return this.minX-=e,this.maxX+=e,this.minY-=t,this.maxY+=t,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new pe(this.minX,this.minY,this.maxX,this.maxY)}scale(e,t=e){return this.minX*=e,this.minY*=t,this.maxX*=e,this.maxY*=t,this}get x(){return this.minX}get y(){return this.minY}get width(){return this.maxX-this.minX}get height(){return this.maxY-this.minY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,t,n){let i=this.minX,s=this.minY,o=this.maxX,a=this.maxY;const l=this.matrix,h=l.a,u=l.b,c=l.c,d=l.d,f=l.tx,p=l.ty;for(let g=t;g<n;g+=2){const m=e[g],y=e[g+1],b=h*m+c*y+f,v=u*m+d*y+p;i=b<i?b:i,s=v<s?v:s,o=b>o?b:o,a=v>a?v:a}this.minX=i,this.minY=s,this.maxX=o,this.maxY=a}toString(){return`[@pixi:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}}function fr(r){if(typeof r=="string")return r;let e=(r|0).toString(16);return e="000000".substring(0,6-e.length)+e,`#${e}`}class Bt extends ge{constructor(e){var t;super(e),this.type="image",this.alphaMode=(t=e.alphaMode)!=null?t:0}}const pr=F.ADAPTER.createCanvas(),He=1;pr.width=He,pr.height=He;const Se=pr.getContext("2d");Se.fillStyle="#ffffff",Se.fillRect(0,0,He,He),Se.beginPath(),Se.moveTo(0,0),Se.lineTo(He,0),Se.lineTo(He,He),Se.closePath(),Se.fillStyle="#ffffff",Se.fill(),k.WHITE=new k({source:new Bt({resource:pr})}),k.WHITE.label="WHITE",k.WHITE.destroy=At;let ef=0;const _n=class{constructor(r,e,t,n){this.uid=ef++,this.type="linear",this.gradientStops=[],this.x0=r,this.y0=e,this.x1=t,this.y1=n}addColorStop(r,e){return e=fr(e),this.gradientStops.push({offset:r,color:e}),this}buildLinearGradient(){const r=_n.defaultTextureSize,{gradientStops:e}=this,t=F.ADAPTER.createCanvas();t.width=r,t.height=r;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,_n.defaultTextureSize,1);for(let p=0;p<e.length;p++){const g=e[p];i.addColorStop(g.offset,g.color)}n.fillStyle=i,n.fillRect(0,0,r,r),this.texture=new k({source:new Bt({resource:t}),style:{addressModeU:"clamp-to-edge",addressModeV:"repeat"}});const{x0:s,y0:o,x1:a,y1:l}=this,h=new B,u=a-s,c=l-o,d=Math.sqrt(u*u+c*c),f=Math.atan2(c,u);h.translate(-s,-o),h.scale(1/r,1/r),h.rotate(-f),h.scale(256/d,1),this.transform=h}};let lt=_n;lt.defaultTextureSize=256;const Wo={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};let tf=0;class mr{constructor(e,t){this.uid=tf++,this.transform=new B,this.texture=e,this.repetition=t,this.transform.scale(1/e.frameWidth,1/e.frameHeight),t&&(e.style.addressModeU=Wo[t].addressModeU,e.style.addressModeV=Wo[t].addressModeV)}setTransform(e){const t=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/t.frameWidth,1/t.frameHeight)}}const rf={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0};function Ho(r,e){var t;const n=r.match(/[a-df-z][^a-df-z]*/gi),i=(t=r.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:t.map(parseFloat),s=[];n.forEach(h=>{var u;const c=(u=h.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:u.map(parseFloat),d=h[0];let f=1;c&&(f=c.length/rf[d.toLowerCase()]);for(let p=0;p<f;p++)s.push(d)});let o=0,a=0,l=0;for(let h=0;h<s.length;h++){const u=s[h];switch(u){case"M":a=i[o++],l=i[o++],e.moveTo(a,l);break;case"m":a+=i[o++],l+=i[o++],e.moveTo(a,l);break;case"H":a=i[o++],e.lineTo(a,l);break;case"h":a+=i[o++],e.lineTo(a,l);break;case"V":l=i[o++],e.lineTo(a,l);break;case"v":l+=i[o++],e.lineTo(a,l);break;case"L":a=i[o++],l=i[o++],e.lineTo(a,l);break;case"l":a+=i[o++],l+=i[o++],e.lineTo(a,l);break;case"C":a=i[o+4],l=i[o+5],e.bezierCurveTo(i[o],i[o+1],i[o+2],i[o+3],a,l),o+=6;break;case"c":e.bezierCurveTo(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3],a+i[o+4],l+i[o+5]),a+=i[o+4],l+=i[o+5],o+=6;break;case"S":a=i[o+2],l=i[o+3],e.bezierCurveToShort(i[o],i[o+1],a,l),o+=4;break;case"s":e.bezierCurveToShort(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3]),a+=i[o+2],l+=i[o+3],o+=4;break;case"Q":a=i[o+2],l=i[o+3],e.quadraticCurveTo(i[o],i[o+1],a,l),o+=4;break;case"q":e.quadraticCurveTo(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3]),a+=i[o+2],l+=i[o+3],o+=4;break;case"T":a=i[o++],l=i[o++],e.quadraticCurveToShort(a,l);break;case"t":a+=i[o++],l+=i[o++],e.quadraticCurveToShort(a,l);break;case"A":a=i[o+5],l=i[o+6],e.arcToSvg(i[o],i[o+1],i[o+2],i[o+3],i[o+4],a,l),o+=7;break;case"a":a+=i[o+5],l+=i[o+6],e.arcToSvg(i[o],i[o+1],i[o+2],i[o+3],i[o+4],a,l),o+=7;break;case"Z":case"z":e.closePath();break;default:console.warn(`Unknown SVG path command: ${u}`)}}return e}class on{constructor(e=0,t=0,n=0){this.type="circle",this.x=e,this.y=t,this.radius=n}clone(){return new on(this.x,this.y,this.radius)}contains(e,t){if(this.radius<=0)return!1;const n=this.radius*this.radius;let i=this.x-e,s=this.y-t;return i*=i,s*=s,i+s<=n}getBounds(e){return e=e||new q,e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}}class an{constructor(e=0,t=0,n=0,i=0){this.type="ellipse",this.x=e,this.y=t,this.halfWidth=n,this.halfHeight=i}clone(){return new an(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,t){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let n=(e-this.x)/this.halfWidth,i=(t-this.y)/this.halfHeight;return n*=n,i*=i,n+i<=1}getBounds(){return new q(this.x-this.halfWidth,this.y-this.halfHeight,this.halfWidth*2,this.halfHeight*2)}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}}class rt{constructor(...e){this.type="polygon";let t=Array.isArray(e[0])?e[0]:e;if(typeof t[0]!="number"){const n=[];for(let i=0,s=t.length;i<s;i++)n.push(t[i].x,t[i].y);t=n}this.points=t,this.closePath=!0}clone(){const e=this.points.slice(),t=new rt(e);return t.closePath=this.closePath,t}contains(e,t){let n=!1;const i=this.points.length/2;for(let s=0,o=i-1;s<i;o=s++){const a=this.points[s*2],l=this.points[s*2+1],h=this.points[o*2],u=this.points[o*2+1];l>t!=u>t&&e<(h-a)*((t-l)/(u-l))+a&&(n=!n)}return n}getBounds(e){e=e||new q;const t=this.points;let n=1/0,i=-1/0,s=1/0,o=-1/0;for(let a=0,l=t.length;a<l;a+=2){const h=t[a],u=t[a+1];n=h<n?h:n,i=h>i?h:i,s=u<s?u:s,o=u>o?u:o}return e.x=n,e.width=i-n,e.y=s,e.height=o-s,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}class ln{constructor(e=0,t=0,n=0,i=0,s=20){this.type="roundedRectangle",this.x=e,this.y=t,this.width=n,this.height=i,this.radius=s}getBounds(e){return e=e||new q,e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new ln(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&t>=this.y&&t<=this.y+this.height){const n=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(t>=this.y+n&&t<=this.y+this.height-n||e>=this.x+n&&e<=this.x+this.width-n)return!0;let i=e-(this.x+n),s=t-(this.y+n);const o=n*n;if(i*i+s*s<=o||(i=e-(this.x+this.width-n),i*i+s*s<=o)||(s=t-(this.y+this.height-n),i*i+s*s<=o)||(i=e-(this.x+n),i*i+s*s<=o))return!0}return!1}}const Nb=8,gr=11920929e-14,nf=1,Tn=.01,ht=0,Ve=0;function Sn(r,e,t,n,i,s,o,a,l){let h=nf/1;return h*=h,sf(e,t,n,i,s,o,a,l,r,h),r}function sf(r,e,t,n,i,s,o,a,l,h){Pn(r,e,t,n,i,s,o,a,l,h,0),l.push(o,a)}function Pn(r,e,t,n,i,s,o,a,l,h,u){if(u>8)return;const c=Math.PI,d=(r+t)/2,f=(e+n)/2,p=(t+i)/2,g=(n+s)/2,m=(i+o)/2,y=(s+a)/2,b=(d+p)/2,v=(f+g)/2,w=(p+m)/2,P=(g+y)/2,A=(b+w)/2,C=(v+P)/2;if(u>0){let E=o-r,_=a-e;const T=Math.abs((t-o)*_-(n-a)*E),O=Math.abs((i-o)*_-(s-a)*E);let L,S;if(T>gr&&O>gr){if((T+O)*(T+O)<=h*(E*E+_*_)){if(ht<Tn){l.push(A,C);return}const R=Math.atan2(s-n,i-t);if(L=Math.abs(R-Math.atan2(n-e,t-r)),S=Math.abs(Math.atan2(a-s,o-i)-R),L>=c&&(L=2*c-L),S>=c&&(S=2*c-S),L+S<ht){l.push(A,C);return}if(Ve!==0){if(L>Ve){l.push(t,n);return}if(S>Ve){l.push(i,s);return}}}}else if(T>gr){if(T*T<=h*(E*E+_*_)){if(ht<Tn){l.push(A,C);return}if(L=Math.abs(Math.atan2(s-n,i-t)-Math.atan2(n-e,t-r)),L>=c&&(L=2*c-L),L<ht){l.push(t,n),l.push(i,s);return}if(Ve!==0&&L>Ve){l.push(t,n);return}}}else if(O>gr){if(O*O<=h*(E*E+_*_)){if(ht<Tn){l.push(A,C);return}if(L=Math.abs(Math.atan2(a-s,o-i)-Math.atan2(s-n,i-t)),L>=c&&(L=2*c-L),L<ht){l.push(t,n),l.push(i,s);return}if(Ve!==0&&L>Ve){l.push(i,s);return}}}else if(E=A-(r+o)/2,_=C-(e+a)/2,E*E+_*_<=h){l.push(A,C);return}}Pn(r,e,d,f,b,v,A,C,l,h,u+1),Pn(A,C,w,P,m,y,o,a,l,h,u+1)}const zb=8,of=11920929e-14,af=1,lf=.01,Vo=0;function jo(r,e,t,n,i,s,o){let a=af/1;return a*=a,hf(e,t,n,i,s,o,r,a),r}function hf(r,e,t,n,i,s,o,a){En(o,r,e,t,n,i,s,a,0),o.push(i,s)}function En(r,e,t,n,i,s,o,a,l){if(l>8)return;const h=Math.PI,u=(e+n)/2,c=(t+i)/2,d=(n+s)/2,f=(i+o)/2,p=(u+d)/2,g=(c+f)/2;let m=s-e,y=o-t;const b=Math.abs((n-s)*y-(i-o)*m);if(b>of){if(b*b<=a*(m*m+y*y)){if(Vo<lf){r.push(p,g);return}let v=Math.abs(Math.atan2(o-i,s-n)-Math.atan2(i-t,n-e));if(v>=h&&(v=2*h-v),v<Vo){r.push(p,g);return}}}else if(m=p-(e+s)/2,y=g-(t+o)/2,m*m+y*y<=a){r.push(p,g);return}En(r,e,t,u,c,p,g,a,l+1),En(r,p,g,d,f,s,o,a,l+1)}function Mn(r,e,t,n,i,s,o,a){let l=Math.abs(i-s);(!o&&i>s||o&&s>i)&&(l=2*Math.PI-l),a=a||Math.max(6,Math.floor(6*Math.pow(n,1/3)*(l/Math.PI))),a=Math.max(a,3);let h=l/a,u=i;h*=o?-1:1;for(let c=0;c<a+1;c++){const d=Math.cos(u),f=Math.sin(u),p=e+d*n,g=t+f*n;r.push(p,g),u+=h}}function Yo(r,e,t,n,i,s){const o=r[r.length-2],a=r[r.length-1]-t,l=o-e,h=i-t,u=n-e,c=Math.abs(a*u-l*h);if(c<1e-8||s===0){(r[r.length-2]!==e||r[r.length-1]!==t)&&r.push(e,t);return}const d=a*a+l*l,f=h*h+u*u,p=a*h+l*u,g=s*Math.sqrt(d)/c,m=s*Math.sqrt(f)/c,y=g*p/d,b=m*p/f,v=g*u+m*l,w=g*h+m*a,P=l*(m+y),A=a*(m+y),C=u*(g+b),E=h*(g+b),_=Math.atan2(A-w,P-v),T=Math.atan2(E-w,C-v);Mn(r,v+e,w+t,s,_,T,l*h>u*a)}const Rt=Math.PI*2,Cn={centerX:0,centerY:0,ang1:0,ang2:0},An=({x:r,y:e},t,n,i,s,o,a,l)=>{r*=t,e*=n;const h=i*r-s*e,u=s*r+i*e;return l.x=h+o,l.y=u+a,l};function uf(r,e){const t=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),n=e===1.5707963267948966?.551915024494:t,i=Math.cos(r),s=Math.sin(r),o=Math.cos(r+e),a=Math.sin(r+e);return[{x:i-s*n,y:s+i*n},{x:o+a*n,y:a-o*n},{x:o,y:a}]}const Xo=(r,e,t,n)=>{const i=r*n-e*t<0?-1:1;let s=r*t+e*n;return s>1&&(s=1),s<-1&&(s=-1),i*Math.acos(s)},cf=(r,e,t,n,i,s,o,a,l,h,u,c,d)=>{const f=Math.pow(i,2),p=Math.pow(s,2),g=Math.pow(u,2),m=Math.pow(c,2);let y=f*p-f*m-p*g;y<0&&(y=0),y/=f*m+p*g,y=Math.sqrt(y)*(o===a?-1:1);const b=y*i/s*c,v=y*-s/i*u,w=h*b-l*v+(r+t)/2,P=l*b+h*v+(e+n)/2,A=(u-b)/i,C=(c-v)/s,E=(-u-b)/i,_=(-c-v)/s,T=Xo(1,0,A,C);let O=Xo(A,C,E,_);a===0&&O>0&&(O-=Rt),a===1&&O<0&&(O+=Rt),d.centerX=w,d.centerY=P,d.ang1=T,d.ang2=O};function qo(r,e,t,n,i,s,o,a=0,l=0,h=0){if(s===0||o===0)return;const u=Math.sin(a*Rt/360),c=Math.cos(a*Rt/360),d=c*(e-n)/2+u*(t-i)/2,f=-u*(e-n)/2+c*(t-i)/2;if(d===0&&f===0)return;s=Math.abs(s),o=Math.abs(o);const p=Math.pow(d,2)/Math.pow(s,2)+Math.pow(f,2)/Math.pow(o,2);p>1&&(s*=Math.sqrt(p),o*=Math.sqrt(p)),cf(e,t,n,i,s,o,l,h,u,c,d,f,Cn);let{ang1:g,ang2:m}=Cn;const{centerX:y,centerY:b}=Cn;let v=Math.abs(m)/(Rt/4);Math.abs(1-v)<1e-7&&(v=1);const w=Math.max(Math.ceil(v),1);m/=w;let P=r[r.length-2],A=r[r.length-1];const C={x:0,y:0};for(let E=0;E<w;E++){const _=uf(g,m),{x:T,y:O}=An(_[0],s,o,c,u,y,b,C),{x:L,y:S}=An(_[1],s,o,c,u,y,b,C),{x:R,y:z}=An(_[2],s,o,c,u,y,b,C);Sn(r,P,A,T,O,L,S,R,z),P=R,A=z,g+=m}}const df=new q;class Ko{constructor(e){this.shapePrimitives=[],this.currentPoly=null,this._bounds=new pe,this.graphicsPath2D=e}moveTo(e,t){return this.startPoly(e,t),this}lineTo(e,t){this._ensurePoly();const n=this.currentPoly.points,i=n[n.length-2],s=n[n.length-1];return(i!==e||s!==t)&&n.push(e,t),this}arc(e,t,n,i,s,o){this._ensurePoly(!1);const a=this.currentPoly.points;return Mn(a,e,t,n,i,s,o),this}arcTo(e,t,n,i,s){this._ensurePoly();const o=this.currentPoly.points;return Yo(o,e,t,n,i,s),this}arcToSvg(e,t,n,i,s,o,a){const l=this.currentPoly.points;return qo(l,this.currentPoly.lastX,this.currentPoly.lastY,o,a,e,t,n,i,s),this}bezierCurveTo(e,t,n,i,s,o){this._ensurePoly();const a=this.currentPoly;return Sn(this.currentPoly.points,a.lastX,a.lastY,e,t,n,i,s,o),this}quadraticCurveTo(e,t,n,i){this._ensurePoly();const s=this.currentPoly;return jo(this.currentPoly.points,s.lastX,s.lastY,e,t,n,i),this}closePath(){return this.endPoly(!0),this}addPath(e,t){this.endPoly(),t&&!t.isIdentity()&&(e=e.clone(!0),e.transform(t));for(let n=0;n<e.instructions.length;n++){const i=e.instructions[n];this[i.action](...i.data)}return this}finish(e=!1){this.endPoly(e)}rect(e,t,n,i,s){return this.drawShape(new q(e,t,n,i),s),this}circle(e,t,n,i){return this.drawShape(new on(e,t,n),i),this}poly(e,t,n){const i=new rt(e);i.closePath=t,this.drawShape(i,n)}ellipse(e,t,n,i,s){return this.drawShape(new an(e,t,n,i),s),this}roundRect(e,t,n,i,s,o){return this.drawShape(new ln(e,t,n,i,s),o),this}drawShape(e,t){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:t}),this}startPoly(e,t){let n=this.currentPoly;return n&&this.endPoly(),n=new rt,n.points.push(e,t),this.currentPoly=n,this}endPoly(e=!1){const t=this.currentPoly;return t&&t.points.length>2&&(t.closePath=e,this.shapePrimitives.push({shape:t})),this.currentPoly=null,this}_ensurePoly(e=!0){if(!this.currentPoly&&(this.currentPoly=new rt,e)){const t=this.shapePrimitives[this.shapePrimitives.length-1];if(t){let n=t.shape.x,i=t.shape.y;if(t.transform.isIdentity()){const s=t.transform,o=n;n=s.a*n+s.c*i+s.tx,i=s.b*o+s.d*i+s.ty}this.currentPoly.points.push(n,n)}else this.currentPoly.points.push(0,0)}}buildPath(){const e=this.graphicsPath2D;this.shapePrimitives.length=0,this.currentPoly=null;for(let t=0;t<e.instructions.length;t++){const n=e.instructions[t];this[n.action](...n.data)}this.finish()}isPointInPath(e,t){const n=this.shapePrimitives;for(let i=0;i<n.length;i++)if(n[i].shape.contains(e,t))return!0;return!1}get bounds(){const e=this._bounds;e.clear();const t=this.shapePrimitives;for(let n=0;n<t.length;n++){const i=t[n],s=i.shape.getBounds(df);i.transform?(e.pushMatrix(i.transform),e.addRect(s),e.popMatrix()):e.addRect(s)}return e}}let ff=0;class nt{constructor(e){this.instructions=[],this.uid=ff++,this.dirty=!0;var t;typeof e=="string"?Ho(e,this):this.instructions=(t=e==null?void 0:e.slice())!=null?t:[]}get shapePath(){return this._shapePath||(this._shapePath=new Ko(this)),this.dirty&&(this.dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,t){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,t]}),this.dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this.dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this.dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this.dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this.dirty=!0,this}bezierCurveToShort(e,t,n,i){const s=this.instructions[this.instructions.length-1],o=this.getLastPoint(N.shared);let a=0,l=0;if(!s||s.action!=="bezierCurveTo")a=o.x,l=o.y;else{a=s.data[2],l=s.data[3];const h=o.x,u=o.y;a=h+(h-a),l=u+(u-l)}return this.instructions.push({action:"bezierCurveTo",data:[a,l,e,t,n,i]}),this.dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this.dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this.dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this.dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this.dirty=!0,this}quadraticCurveToShort(e,t){const n=this.instructions[this.instructions.length-1],i=this.getLastPoint(N.shared);let s=0,o=0;if(!n||n.action!=="quadraticCurveTo")s=i.x,o=i.y;else{s=n.data[0],o=n.data[1];const a=i.x,l=i.y;s=a+(a-s),o=l+(l-o)}return this.instructions.push({action:"quadraticCurveTo",data:[s,o,e,t]}),this.dirty=!0,this}rect(e,t,n,i,s){return this.instructions.push({action:"rect",data:[e,t,n,i,s]}),this.dirty=!0,this}circle(e,t,n,i){return this.instructions.push({action:"circle",data:[e,t,n,i]}),this.dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this.dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this.dirty=!0,this}star(e,t,n,i,s,o=0,a){s=s||i/2;const l=-1*Math.PI/2+o,h=n*2,u=Math.PI*2/h,c=[];for(let d=0;d<h;d++){const f=d%2?s:i,p=d*u+l;c.push(e+f*Math.cos(p),t+f*Math.sin(p))}return this.poly(c,!0,a),this}clone(e=!1){const t=new nt;if(!e)t.instructions=this.instructions.slice();else for(let n=0;n<this.instructions.length;n++){const i=this.instructions[n];t.instructions.push({action:i.action,data:i.data.slice()})}return t}getLastPoint(e){let t=this.instructions.length-1,n=this.instructions[t];if(!n)return e.x=0,e.y=0,e;for(;n.action==="closePath";){if(t--,t<0)return e.x=0,e.y=0,e;n=this.instructions[t]}let i,s,o;switch(n.action){case"moveTo":case"lineTo":e.x=n.data[0],e.y=n.data[1];break;case"quadraticCurveTo":e.x=n.data[2],e.y=n.data[3];break;case"bezierCurveTo":e.x=n.data[4],e.y=n.data[5];break;case"arc":case"arcToSvg":e.x=n.data[5],e.y=n.data[6];break;case"addPath":e.x=n.data[0].lastX,e.y=n.data[2].lastY;break;case"rect":if(o=n.data[4],i=n.data[0],s=n.data[1],o){const{a,b:l,c:h,d:u,tx:c,ty:d}=o;e.x=a*i+h*s+c,e.y=l*i+u*s+d}else e.x=i,e.y=s;break;default:console.warn(`${n.action} is not supported yet`);break}return e}clear(){return this.instructions.length=0,this.dirty=!0,this}transform(e){if(e.isIdentity())return this;const t=e.a,n=e.b,i=e.c,s=e.d,o=e.tx,a=e.ty;let l=0,h=0,u=0,c=0,d=0,f=0,p=0,g=0;for(let m=0;m<this.instructions.length;m++){const y=this.instructions[m],b=y.data;switch(y.action){case"moveTo":case"lineTo":l=b[0],h=b[1],b[0]=t*l+i*h+o,b[1]=n*l+s*h+a;break;case"bezierCurveTo":u=b[0],c=b[1],d=b[2],f=b[3],l=b[4],h=b[5],b[0]=t*u+i*c+o,b[1]=n*u+s*c+a,b[2]=t*d+i*f+o,b[3]=n*d+s*f+a,b[4]=t*l+i*h+o,b[5]=n*l+s*h+a;break;case"quadraticCurveTo":u=b[0],c=b[1],l=b[2],h=b[3],b[0]=t*u+i*c+o,b[1]=n*u+s*c+a,b[2]=t*l+i*h+o,b[3]=n*l+s*h+a;break;case"arcToSvg":l=b[5],h=b[6],p=b[0],g=b[1],b[0]=t*p+i*g,b[1]=n*p+s*g,b[5]=t*l+i*h+o,b[6]=n*l+s*h+a;break;case"rect":b[4]=Bn(b[4],e);break;case"ellipse":b[8]=Bn(b[8],e);break;case"roundRect":b[5]=Bn(b[5],e);break;case"addPath":b[0].transform(e);break;default:console.warn("unknown transform action",y.action);break}}return this.dirty=!0,this}get bounds(){return this.shapePath.bounds}}function Bn(r,e){return r?r.prepend(e):e.clone()}var pf=Object.defineProperty,Zo=Object.getOwnPropertySymbols,mf=Object.prototype.hasOwnProperty,gf=Object.prototype.propertyIsEnumerable,Qo=(r,e,t)=>e in r?pf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,vr=(r,e)=>{for(var t in e||(e={}))mf.call(e,t)&&Qo(r,t,e[t]);if(Zo)for(var t of Zo(e))gf.call(e,t)&&Qo(r,t,e[t]);return r};function Jo(r,e){if(typeof r=="string"){const n=document.createElement("div");n.innerHTML=r.trim(),r=n.querySelector("svg")}const t={context:e,path:new nt};return ea(r,t,null,null),e}function ea(r,e,t,n){const i=r.children,{fillStyle:s,strokeStyle:o}=vf(r);s&&t?t=vr(vr({},t),s):s&&(t=s),o&&n?n=vr(vr({},n),o):o&&(n=o),e.context.fillStyle=t,e.context.strokeStyle=n;let a,l,h,u,c,d,f,p,g,m,y,b,v,w,P,A,C;switch(r.nodeName.toLowerCase()){case"path":w=r.getAttribute("d"),P=new nt(w),e.context.path(P),t&&e.context.fill(),n&&e.context.stroke();break;case"circle":f=J(r,"cx",0),p=J(r,"cy",0),g=J(r,"r",0),e.context.ellipse(f,p,g,g),t&&e.context.fill(),n&&e.context.stroke();break;case"rect":a=J(r,"x",0),l=J(r,"y",0),A=J(r,"width",0),C=J(r,"height",0),m=J(r,"rx",0),y=J(r,"ry",0),m||y?e.context.roundRect(a,l,A,C,m||y):e.context.rect(a,l,A,C),t&&e.context.fill(),n&&e.context.stroke();break;case"ellipse":f=J(r,"cx",0),p=J(r,"cy",0),m=J(r,"rx",0),y=J(r,"ry",0),e.context.beginPath(),e.context.ellipse(f,p,m,y),t&&e.context.fill(),n&&e.context.stroke();break;case"line":h=J(r,"x1",0),u=J(r,"y1",0),c=J(r,"x2",0),d=J(r,"y2",0),e.context.beginPath(),e.context.moveTo(h,u),e.context.lineTo(c,d),n&&e.context.stroke();break;case"polygon":v=r.getAttribute("points"),b=v.match(/\d+/g).map(E=>parseInt(E,10)),e.context.poly(b,!0),t&&e.context.fill(),n&&e.context.stroke();break;case"polyline":v=r.getAttribute("points"),b=v.match(/\d+/g).map(E=>parseInt(E,10)),e.context.poly(b,!1),n&&e.context.stroke();break;case"g":case"svg":break;default:{console.info(`[SVG parser] <${r.nodeName}> elements unsupported`);break}}for(let E=0;E<i.length;E++)ea(i[E],e,t,n)}function J(r,e,t){const n=r.getAttribute(e);return n?Number(n):t}function vf(r){const e=r.getAttribute("style"),t={},n={};let i=!1,s=!1;if(e){const o=e.split(";");for(let a=0;a<o.length;a++){const l=o[a],[h,u]=l.split(":");switch(h){case"stroke":u!=="none"&&(t.color=ve(u),s=!0);break;case"stroke-width":t.width=Number(u);break;case"fill":u!=="none"&&(i=!0,n.color=ve(u));break;case"fill-opacity":n.alpha=Number(u);break;case"stroke-opacity":t.alpha=Number(u);break;case"opacity":n.alpha=Number(u),t.alpha=Number(u);break}}}else{const o=r.getAttribute("stroke");o&&o!=="none"&&(s=!0,t.color=ve(o),t.width=J(r,"stroke-width",1));const a=r.getAttribute("fill");a&&a!=="none"&&(i=!0,n.color=ve(a))}return{strokeStyle:s?t:null,fillStyle:i?n:null}}var bf=Object.defineProperty,yf=Object.defineProperties,xf=Object.getOwnPropertyDescriptors,ta=Object.getOwnPropertySymbols,wf=Object.prototype.hasOwnProperty,_f=Object.prototype.propertyIsEnumerable,ra=(r,e,t)=>e in r?bf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,je=(r,e)=>{for(var t in e||(e={}))wf.call(e,t)&&ra(r,t,e[t]);if(ta)for(var t of ta(e))_f.call(e,t)&&ra(r,t,e[t]);return r},Rn=(r,e)=>yf(r,xf(e));function kt(r,e){if(!r)return null;let t,n;if(r!=null&&r.fill?(n=r.fill,t=je(je({},e),r)):(n=r,t=e),typeof n=="number"||typeof n=="string")return Rn(je({},t),{color:ve(n),texture:k.WHITE});if(n instanceof mr){const s=n;return Rn(je({},t),{color:16777215,texture:s.texture,matrix:s.transform})}else if(n instanceof lt){const s=n;return s.buildLinearGradient(),Rn(je({},t),{color:16777215,texture:s.texture,matrix:s.transform})}const i=je(je({},e),r);if(i.texture!==k.WHITE){const s=i.matrix||new B;s.scale(1/i.texture.frameWidth,1/i.texture.frameHeight),i.matrix=s,i.color=16777215}return i.color=ve(i.color),i}var Tf=Object.defineProperty,na=Object.getOwnPropertySymbols,Sf=Object.prototype.hasOwnProperty,Pf=Object.prototype.propertyIsEnumerable,ia=(r,e,t)=>e in r?Tf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Be=(r,e)=>{for(var t in e||(e={}))Sf.call(e,t)&&ia(r,t,e[t]);if(na)for(var t of na(e))Pf.call(e,t)&&ia(r,t,e[t]);return r};let Ef=0;const ut=new N,sa=new B,Ye=class extends re{constructor(){super(...arguments),this.uid=Ef++,this.usage=0,this.dirty=!0,this.batchMode="auto",this.instructions=[],this.activePath=new nt,this._transform=new B,this._fillStyle=Be({},Ye.defaultFillStyle),this._fillStyleOriginal=16777215,this._strokeStyle=Be({},Ye.defaultStrokeStyle),this._strokeStyleOriginal=16777215,this._stateStack=[],this._tick=0,this._bounds=new pe,this.boundsDirty=!0}set fillStyle(r){if(this._fillStyleOriginal!==r)if(this._fillStyleOriginal=r,typeof r=="number"||typeof r=="string")this._fillStyle.color=ve(r),this._fillStyle.texture=k.WHITE;else if(r instanceof mr){const e=r;this._fillStyle.color=16777215,this._fillStyle.texture=e.texture,this._fillStyle.matrix=e.transform}else if(r instanceof lt){const e=r;e.buildLinearGradient(),this._fillStyle.color=16777215,this._fillStyle.texture=e.texture,this._fillStyle.matrix=e.transform}else this._fillStyle=Be(Be({},Ye.defaultFillStyle),r)}get fillStyle(){return this._fillStyleOriginal}set strokeStyle(r){if(this._strokeStyleOriginal!==r)if(this._strokeStyleOriginal=r,typeof r=="number"||typeof r=="string")this._strokeStyle.color=ve(r),this._strokeStyle.texture=k.WHITE;else if(r instanceof lt){const e=r;e.buildLinearGradient(),this._strokeStyle.color=16777215,this._strokeStyle.texture=e.texture,this._strokeStyle.matrix=e.transform}else this._strokeStyle=Be(Be({},Ye.defaultStrokeStyle),r)}get strokeStyle(){return this._strokeStyleOriginal}setFillStyle(r){return this.fillStyle=r,this}setStrokeStyle(r){return this.strokeStyle=r,this}texture(r,e,t,n,i,s){return this.instructions.push({action:"texture",data:{image:r,dx:t||0,dy:n||0,dw:i||r.frameWidth,dh:s||r.frameHeight,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e||16777215}}),this.onUpdate(),this}beginPath(){return this.activePath=new nt,this}fill(r){let e;const t=this.instructions[this.instructions.length-1];if(this._tick===0&&t&&t.action==="stroke"?e=t.data.path:e=this.activePath.clone(),!e)return this;let n=this._fillStyle;return r&&(n=kt(r,Ye.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:n,path:e}}),this.onUpdate(),this.activePath.instructions.length=0,this._tick=0,this}stroke(r){let e;const t=this.instructions[this.instructions.length-1];if(this._tick===0&&t&&t.action==="fill"?e=t.data.path:e=this.activePath.clone(),!e)return this;let n=this._strokeStyle;return r&&(n=kt(r,Ye.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:n,path:e}}),this.onUpdate(),this.activePath.instructions.length=0,this._tick=0,this}cut(){for(let r=0;r<2;r++){const e=this.instructions[this.instructions.length-1-r],t=this.activePath.clone();e&&(e.action==="stroke"||e.action==="fill")&&(e.data.hole=t)}return this.activePath.instructions.length=0,this}arc(r,e,t,n,i,s){this._tick++;const o=this._transform;return this.activePath.arc(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,t,n,i,s),this}arcTo(r,e,t,n,i){this._tick++;const s=this._transform;return this.activePath.arcTo(s.a*r+s.c*e+s.tx,s.b*r+s.d*e+s.ty,s.a*t+s.c*n+s.tx,s.b*t+s.d*n+s.ty,i),this}arcToSvg(r,e,t,n,i,s,o){this._tick++;const a=this._transform;return this.activePath.arcToSvg(r,e,t,n,i,a.a*s+a.c*o+a.tx,a.b*s+a.d*o+a.ty),this}bezierCurveTo(r,e,t,n,i,s){this._tick++;const o=this._transform;return this.activePath.bezierCurveTo(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,o.a*t+o.c*n+o.tx,o.b*t+o.d*n+o.ty,o.a*i+o.c*s+o.tx,o.b*i+o.d*s+o.ty),this}closePath(){var r;return this._tick++,(r=this.activePath)==null||r.closePath(),this}ellipse(r,e,t,n){return this._tick++,this.activePath.ellipse(r,e,t,n,this._transform.clone()),this}circle(r,e,t){return this._tick++,this.activePath.circle(r,e,t,this._transform.clone()),this}path(r){return this._tick++,this.activePath.addPath(r,this._transform.clone()),this}lineTo(r,e){this._tick++;const t=this._transform;return this.activePath.lineTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}moveTo(r,e){this._tick++;const t=this._transform;return this.activePath.moveTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}quadraticCurveTo(r,e,t,n){this._tick++;const i=this._transform;this.activePath.quadraticCurveTo(i.a*r+i.c*e+i.tx,i.b*r+i.d*e+i.ty,i.a*t+i.c*n+i.tx,i.b*t+i.d*n+i.ty)}rect(r,e,t,n){return this._tick++,this.activePath.rect(r,e,t,n,this._transform.clone()),this}roundRect(r,e,t,n,i){return this._tick++,this.activePath.roundRect(r,e,t,n,i,this._transform.clone()),this}poly(r,e){return this._tick++,this.activePath.poly(r,e,this._transform.clone()),this}star(r,e,t,n,i,s){return this._tick++,this.activePath.star(r,e,t,n,i,s,this._transform.clone()),this}svg(r){this._tick++,Jo(r,this)}restore(){const r=this._stateStack.pop();r&&(this._transform=r.transform,this._fillStyle=r.fillStyle,this._strokeStyle=r.strokeStyle)}save(){this._stateStack.push({transform:this._transform.clone(),fillStyle:Be({},this._fillStyle),strokeStyle:Be({},this._strokeStyle)})}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(r){return this._transform.rotate(r),this}scale(r,e=r){return this._transform.scale(r,e),this}setTransform(r,e,t,n,i,s){return r instanceof B?(this._transform.set(r.a,r.b,r.c,r.d,r.tx,r.ty),this):(this._transform.set(r,e,t,n,i,s),this)}transform(r,e,t,n,i,s){return r instanceof B?(this._transform.append(r),this):(sa.set(r,e,t,n,i,s),this._transform.append(sa),this)}translate(r,e){return this._transform.translate(r,e),this}clear(){return this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this.boundsDirty=!0)}get bounds(){if(!this.boundsDirty)return this._bounds;const r=this._bounds;r.clear();for(let e=0;e<this.instructions.length;e++){const t=this.instructions[e],n=t.action;if(n==="fill"){const i=t.data;r.addBounds(i.path.bounds)}else if(n==="texture"){const i=t.data;r.pushMatrix(i.transform),r.addFrame(i.dx,i.dy,i.dx+i.dw,i.dy+i.dh),r.popMatrix()}}return r}containsPoint(r){const e=this.instructions;let t=!1;return e.forEach(n=>{var i;const s=n.data,o=s.path;if(!n.action||!o)return;const a=s.style,l=(i=o.shapePath)==null?void 0:i.shapePrimitives;this._forEachShape(l,h=>{var u;if(!a||!h)return;typeof a!="number"&&a.matrix?a.matrix.applyInverse(r,ut):ut.copyFrom(r),t=h.contains(ut.x,ut.y);const c=s.hole;if(!c)return;const d=(u=c.shapePath)==null?void 0:u.shapePrimitives;d&&this._forEachShape(d,f=>{f.contains(ut.x,ut.y)&&(t=!1)})})}),t}_forEachShape(r,e){r==null||r.forEach(t=>{const n=t==null?void 0:t.shape;n&&e(n)})}destroy(r=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(e),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(e)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this.activePath=null,this._bounds=null,this._stateStack=null,this.transformMatrix=null,this.customShader=null,this._transform=null}};let Re=Ye;Re.defaultFillStyle={color:0,alpha:1,texture:k.WHITE},Re.defaultStrokeStyle={width:1,color:0,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:k.WHITE};const Mf=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,Cf=".svg",Af="image/svg+xml",oa={extension:{type:x.LoadParser,priority:Te.Low},name:"loadSVG",test(r){return ot(r,Af)||at(r,Cf)},async testParse(r){return typeof r=="string"&&r.startsWith("data:image/svg+xml")||typeof r=="string"&&Mf.test(r)},async parse(r){const e=new Re;return e.svg(r),e},async load(r){return(await F.ADAPTER.fetch(r)).text()}};function aa(r,e=1){var t;const n=(t=F.RETINA_PREFIX)==null?void 0:t.exec(r);return n?parseFloat(n[1]):e}let la=0,kn;const Bf="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",Rf={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${Bf}');
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
    `},kf={id:"loadImageBitmap",code:`
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
    };`};let Un;class Uf{constructor(){this._initialized=!1,this._createdWorkers=0,this.workerPool=[],this.queue=[],this.resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const t=URL.createObjectURL(new Blob([Rf.code],{type:"application/javascript"})),n=new Worker(t);n.addEventListener("message",i=>{n.terminate(),URL.revokeObjectURL(t),e(i.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e){return this._run("loadImageBitmap",[e])}async _initWorkers(){this._initialized||(this._initialized=!0)}getWorker(){kn===void 0&&(kn=navigator.hardwareConcurrency||4);let e=this.workerPool.pop();return!e&&this._createdWorkers<kn&&(Un||(Un=URL.createObjectURL(new Blob([kf.code],{type:"application/javascript"}))),this._createdWorkers++,e=new Worker(Un),e.addEventListener("message",t=>{this.complete(t.data),this.returnWorker(t.target),this.next()})),e}returnWorker(e){this.workerPool.push(e)}complete(e){e.error!==void 0?this.resolveHash[e.uuid].reject(e.error):this.resolveHash[e.uuid].resolve(e.data),this.resolveHash[e.uuid]=null}async _run(e,t){await this._initWorkers();const n=new Promise((i,s)=>{this.queue.push({id:e,arguments:t,resolve:i,reject:s})});return this.next(),n}next(){if(!this.queue.length)return;const e=this.getWorker();if(!e)return;const t=this.queue.pop(),n=t.id;this.resolveHash[la]={resolve:t.resolve,reject:t.reject},e.postMessage({data:t.arguments,uuid:la++,id:n})}}const Gn=new Uf;function ha(r,e,t){return new k({source:r,label:t})}var Gf=Object.defineProperty,ua=Object.getOwnPropertySymbols,If=Object.prototype.hasOwnProperty,Ff=Object.prototype.propertyIsEnumerable,ca=(r,e,t)=>e in r?Gf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Of=(r,e)=>{for(var t in e||(e={}))If.call(e,t)&&ca(r,t,e[t]);if(ua)for(var t of ua(e))Ff.call(e,t)&&ca(r,t,e[t]);return r};const Lf=[".jpeg",".jpg",".png",".webp",".avif"],Df=["image/jpeg","image/png","image/webp","image/avif"];async function da(r){const e=await F.ADAPTER.fetch(r);if(!e.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${r}: ${e.status} ${e.statusText}`);const t=await e.blob();return await createImageBitmap(t)}const In={name:"loadTextures",extension:{type:x.LoadParser,priority:Te.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(r){return ot(r,Df)||at(r,Lf)},async load(r,e,t){var n;let i=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await Gn.isImageBitmapSupported()?i=await Gn.loadImageBitmap(r):i=await da(r):i=await new Promise(o=>{i=new Image,i.crossOrigin=this.config.crossOrigin,i.src=r,i.complete?o(i):i.onload=()=>{o(i)}});const s=new Bt(Of({resource:i,resolution:((n=e.data)==null?void 0:n.resolution)||aa(r)},e.data));return ha(s,t,r)},unload(r){r.destroy(!0)}},fa={extension:x.ResolveParser,test:In.test,parse:r=>{var e,t;return{resolution:parseFloat((t=(e=F.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:r.split(".").pop(),src:r}}};K.add(Ao,ko,Bo,Fo,Uo,Go,Io,Oo,Lo,zo,oa,In,fa,Co,Mo);const pa={loader:x.LoadParser,resolver:x.ResolveParser,cache:x.CacheParser,detection:x.DetectionParser};K.handle(x.Asset,r=>{const e=r.ref;Object.entries(pa).filter(([t])=>!!e[t]).forEach(([t,n])=>{var i;return K.add(Object.assign(e[t],{extension:(i=e[t].extension)!=null?i:n}))})},r=>{const e=r.ref;Object.keys(pa).filter(t=>!!e[t]).forEach(t=>K.remove(e[t]))});class te{constructor(e,t,n){this._x=t||0,this._y=n||0,this.observer=e}clone(e){return new te(e,this._x,this._y)}set(e=0,t=e){return(this._x!==e||this._y!==t)&&(this._x=e,this._y=t,this.observer.onUpdate()),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this.observer.onUpdate()),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this.observer.onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this.observer.onUpdate(this))}}function ma(r,e,t){const n=r.length;let i;if(e>=n||t===0)return;t=e+t>n?n-e:t;const s=n-t;for(i=e;i<s;++i)r[i]=r[i+t];r.length=s}const ga={removeChildren(r=0,e){const t=e!=null?e:this.children.length,n=t-r,i=[];if(n>0&&n<=t){for(let s=t-1;s>=r;s--){const o=this.children[s];o&&(this.layerGroup&&this.layerGroup.removeChild(o),i.push(o),o.parent=null)}ma(this.children,r,t);for(let s=0;s<i.length;++s)this.emit("childRemoved",i[s],this,s),i[s].emit("removed",this);return i}else if(n===0&&this.children.length===0)return i;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(r){const e=this.getChildAt(r);return this.removeChild(e)},getChildAt(r){if(r<0||r>=this.children.length)throw new Error(`getChildAt: Index (${r}) does not exist.`);return this.children[r]},setChildIndex(r,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(r),this.addChildAt(r,e)},getChildIndex(r){const e=this.children.indexOf(r);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(r,e){const{children:t}=this;if(e<0||e>t.length)throw new Error(`${r}addChildAt: The index ${e} supplied is out of bounds ${t.length}`);if(r.parent){const n=r.parent.children.indexOf(r);if(r.parent===this&&n===e)return r;n!==-1&&r.parent.children.splice(n,1)}return e===t.length?t.push(r):t.splice(e,0,r),r.parent=this,r.didChange=!0,r.didViewUpdate=!1,r.updateFlags=15,this.layerGroup&&this.layerGroup.addChild(r),this.emit("childAdded",r,this,e),r.emit("added",this),r},swapChildren(r,e){if(r===e)return;const t=this.getChildIndex(r),n=this.getChildIndex(e);this.children[t]=e,this.children[n]=r},removeFromParent(){var r;(r=this.parent)==null||r.removeChild(this)}};class br{constructor(e){this.pipe="filter",this.priority=1,this.filters=e==null?void 0:e.filters}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null}}const va=[];function ba(r){const e=va.pop()||new br;return e.filters=r,e}function ya(r){r.filters=null,va.push(r)}class xa{constructor(e,t){this._pool=[],this._count=0,this._index=0,this._classType=e,t&&this.prepopulate(t)}prepopulate(e){for(let t=0;t<e;t++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){var t;let n;return this._index>0?n=this._pool[--this._index]:n=new this._classType,(t=n.init)==null||t.call(n,e),n}return(e){var t;(t=e.reset)==null||t.call(e),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._pool.length}get totalUsed(){return this._count-this._pool.length}}class wa{constructor(){this._poolsByClass=new Map}prepopulate(e,t){this.getPool(e).prepopulate(t)}get(e,t){return this.getPool(e).get(t)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new xa(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(t=>{const n=e[t._classType.name]?t._classType.name+t._classType.ID:t._classType.name;e[n]={free:t.totalFree,used:t.totalUsed,size:t.totalSize}}),e}}const H=new wa;class _a{constructor(){this._effectClasses=[],this.tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this.tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let t=0;t<this.tests.length;t++){const n=this.tests[t];if(n.test(e))return H.get(n.maskClass,e)}return e}returnMaskEffect(e){H.return(e)}}const yr=new _a;K.handleByList(x.MaskEffect,yr._effectClasses);const Ta={_mask:null,_filters:null,set mask(r){if(this._mask||(this._mask={mask:null,effect:null}),this._mask.mask===r||(this._mask.effect&&(this.removeEffect(this._mask.effect),yr.returnMaskEffect(this._mask.effect),this._mask.effect=null),this._mask.mask=r,r==null))return;const e=yr.getMaskEffect(r);this._mask.effect=e,this.addEffect(e)},get mask(){var r;return(r=this._mask)==null?void 0:r.mask},set filters(r){if(!Array.isArray(r)&&r!==null&&(r=[r]),this._filters||(this._filters={filters:null,effect:null}),this._filters.filters===r||(this._filters.effect&&(this.removeEffect(this._filters.effect),ya(this._filters.effect),this._filters.effect=null),this._filters.filters=r,!r))return;const e=ba(r);this._filters.effect=e,this.addEffect(e)},get filters(){var r;return(r=this._filters)==null?void 0:r.filters}},Sa={getChildByLabel(r,e=!1){const t=this.children;for(let n=0;n<t.length;n++){const i=t[n];if(i.label===r||r instanceof RegExp&&r.test(i.label))return i}if(e)for(let n=0;n<t.length;n++){const i=t[n].getChildByLabel(r,!0);if(i)return i}return null},getChildrenByLabel(r,e=!1,t=[]){const n=this.children;for(let i=0;i<n.length;i++){const s=n[i];(s.label===r||r instanceof RegExp&&r.test(s.label))&&t.push(s)}if(e)for(let i=0;i<n.length;i++)n[i].getChildrenByLabel(r,!0,t);return t}};function Pe(r,e){const t=e._scale,n=e._pivot,i=e.position,s=t._x,o=t._y,a=n._x,l=n._y;r.a=e._cx*s,r.b=e._sx*s,r.c=e._cy*o,r.d=e._sy*o,r.tx=i._x-(a*r.a+l*r.c),r.ty=i._y-(a*r.b+l*r.d)}function ct(r,e,t){t.clear();let n;return r.parent?e?n=r.parent.worldTransform:n=Ut(r,new B):n=B.IDENTITY,Fn(r,t,n,e),t.isValid||t.set(0,0,0,0),t}function Fn(r,e,t,n){var i,s;if(!r.visible||!r.measurable)return;let o;n?o=r.worldTransform:(r.didChange&&Pe(r.localTransform,r),o=B.shared.appendFrom(r.localTransform,t).clone());const a=e,l=!!r.effects.length;l&&(e=e.clone()),r.view&&(e.setMatrix(o),r.view.addBounds(e));for(let h=0;h<r.children.length;h++)Fn(r.children[h],e,o,n);if(l){for(let h=0;h<r.effects.length;h++)(s=(i=r.effects[h]).addBounds)==null||s.call(i,e);a.addBounds(e)}}function Ut(r,e){const t=r.parent;return t&&(Ut(t,e),t.didChange&&Pe(t.localTransform,t),e.append(t.localTransform)),e}function Xe(r,e,t){e.clear(),t||(t=new B),r.view&&(e.setMatrix(t),r.view.addBounds(e));for(let n=0;n<r.children.length;n++)Pa(r.children[n],e,t,r);return e.isValid||e.set(0,0,0,0),e}function Pa(r,e,t,n){var i,s;if(!r.visible||!r.measurable)return;r.didChange&&Pe(r.localTransform,r);const o=r.localTransform,a=B.shared.appendFrom(o,t).clone();r.view&&(e.setMatrix(a),r.view.addBounds(e));for(let l=0;l<r.children.length;l++)Pa(r.children[l],e,a,n);for(let l=0;l<r.effects.length;l++)(s=(i=r.effects[l]).addLocalBounds)==null||s.call(i,e,n)}function Ea(r,e,t){const n=r.parent;if(!n){console.warn("Item is not inside the root container");return}n!==e&&(Ea(n,e,t),Pe(n.localTransform,n),t.append(n.localTransform))}const dt=new pe,xr=new B,Ma={get width(){return this.scale.x*Xe(this,dt,xr).width},set width(r){this.scale.x=r/Xe(this,dt,xr).width},get height(){return this.scale.y*Xe(this,dt,xr).height},set height(r){this.scale.y=r/Xe(this,dt,xr).height},getLocalBounds(){return Xe(this,dt,this.localTransform).rectangle},getBounds(r){return ct(this,r,dt).rectangle}},Ca={_onRender:null,set onRender(r){const e=this.layerGroup;if(!r){this._onRender&&(e==null||e.removeOnRender(this)),this._onRender=null;return}this._onRender||e==null||e.addOnRender(this),this._onRender=r},get onRender(){return this._onRender}},Aa={getGlobalPosition(r=new N,e=!1){return this.parent?this.parent.toGlobal(this.position,r,e):(r.x=this.position.x,r.y=this.position.y),r},toGlobal(r,e,t=!1){if(!t){this.didChange&&Pe(this.localTransform,this);const n=Ut(this,new B);return n.append(this.localTransform),n.apply(r,e)}return this.worldTransform.apply(r,e)},toLocal(r,e,t,n){if(e&&(r=e.toGlobal(r,t,n)),!n){this.didChange&&Pe(this.localTransform,this);const i=Ut(this,new B);return i.append(this.localTransform),i.applyInverse(r,t)}return this.worldTransform.applyInverse(r,t)}};let $f=0;class Ba{constructor(){this.uid=$f++,this.instructions=[],this.instructionSize=0}reset(){this.instructionSize=0}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}lastInstruction(){return this.instructions[this.instructionSize-1]}}class Ra{constructor(e){this.type="layer",this.root=null,this.rootRenderable=null,this.canBundle=!1,this.layerGroupParent=null,this.layerGroupChildren=[],this.children=[],this.worldTransform=new B,this.worldColor=4294967295,this.childrenToUpdate={},this.updateTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new Ba,this.onRenderContainers=[],this.root=e,this.addChild(e)}get localTransform(){return this.root.localTransform}get layerTransform(){return this.root.layerTransform}addLayerGroupChild(e){e.layerGroupParent&&e.layerGroupParent.removeLayerGroupChild(e),e.layerGroupParent=this,this.onChildUpdate(e.root),this.layerGroupChildren.push(e)}removeLayerGroupChild(e){e.root.didChange&&this.removeChildFromUpdate(e.root);const t=this.layerGroupChildren.indexOf(e);t>-1&&this.layerGroupChildren.splice(t,1),e.layerGroupParent=null}addChild(e){if(this.structureDidChange=!0,e!==this.root&&(this.children.push(e),e.updateTick=-1,e.parent===this.root?e.relativeLayerDepth=1:e.relativeLayerDepth=e.parent.relativeLayerDepth+1,e._onRender&&this.addOnRender(e)),e.layerGroup){if(e.layerGroup.root===e){this.addLayerGroupChild(e.layerGroup);return}}else e.layerGroup=this,e.didChange=!0;const t=e.children;e.isLayerRoot||this.onChildUpdate(e);for(let n=0;n<t.length;n++)this.addChild(t[n])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&this.removeOnRender(e),e.layerGroup.root!==e){const n=e.children;for(let i=0;i<n.length;i++)this.removeChild(n[i]);e.didChange&&e.layerGroup.removeChildFromUpdate(e),e.layerGroup=null}else this.removeLayerGroupChild(e.layerGroup);const t=this.children.indexOf(e);t>-1&&this.children.splice(t,1)}onChildUpdate(e){let t=this.childrenToUpdate[e.relativeLayerDepth];t||(t=this.childrenToUpdate[e.relativeLayerDepth]={index:0,list:[]}),t.list[t.index++]=e}updateRenderable(e){e.layerVisibleRenderable<3||(e.didViewUpdate=!1,this.instructionSet.renderPipes[e.view.type].updateRenderable(e))}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}removeChildFromUpdate(e){const t=this.childrenToUpdate[e.relativeLayerDepth];if(!t)return;const n=t.list.indexOf(e);n>-1&&t.list.splice(n,1),t.index--}get isRenderable(){const e=this.worldColor>>24&255;return this.root.localVisibleRenderable===3&&e>0}addOnRender(e){this.onRenderContainers.push(e)}removeOnRender(e){this.onRenderContainers.splice(this.onRenderContainers.indexOf(e),1)}runOnRender(){this.onRenderContainers.forEach(e=>{e._onRender()})}}let ka=0;function On(){return ka++}const Ua=new te(null),Ga=new te(null),Ia=new te(null,1,1),wr=1,Ln=2,_r=4,Nf=8;class Q extends re{constructor({label:e,layer:t,view:n}={}){super(),this.uid=ka++,this.label=null,this.updateFlags=15,this.isLayerRoot=!1,this.layerGroup=null,this.didChange=!1,this.didViewUpdate=!1,this.relativeLayerDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new B,this.layerTransform=new B,this.position=new te(this,0,0),this._scale=Ia,this._pivot=Ga,this._skew=Ua,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=4294967295,this.layerColor=4294967295,this.localBlendMode="inherit",this.layerBlendMode="normal",this.localVisibleRenderable=3,this.layerVisibleRenderable=3,this.effects=[],e&&(this.label=e),t&&this.enableLayer(),n&&(this.view=n,this.view.owner=this)}static mixin(e){Object.defineProperties(Q.prototype,Object.getOwnPropertyDescriptors(e))}addEffect(e){this.effects.indexOf(e)===-1&&(this.effects.push(e),this.effects.sort((t,n)=>t.priority-n.priority),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this.updateIsSimple())}removeEffect(e){const t=this.effects.indexOf(e);t!==-1&&(this.effects.splice(t,1),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this.updateIsSimple())}addChild(...e){if(e.length>1){for(let n=0;n<e.length;n++)this.addChild(e[n]);return e[0]}const t=e[0];return t.parent===this?(this.children.splice(this.children.indexOf(t),1),this.children.push(t),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),t):(t.parent&&t.parent.removeChild(t),this.children.push(t),t.parent=this,t.didChange=!0,t.didViewUpdate=!1,t.updateFlags=15,this.layerGroup&&this.layerGroup.addChild(t),t)}removeChild(...e){if(e.length>1){for(let i=0;i<e.length;i++)this.removeChild(e[i]);return e[0]}const t=e[0],n=this.children.indexOf(t);return n>-1&&(this.children.splice(n,1),this.layerGroup&&this.layerGroup.removeChild(t)),t.parent=null,t}onUpdate(e){if(e&&e===this._skew&&this.updateSkew(),!this.didChange)if(this.didChange=!0,this.isLayerRoot){const t=this.layerGroup.layerGroupParent;t&&t.onChildUpdate(this)}else this.layerGroup&&this.layerGroup.onChildUpdate(this)}onViewUpdate(){this.didViewUpdate||(this.didViewUpdate=!0,this.layerGroup&&this.layerGroup.onChildViewUpdate(this))}set layer(e){if(this.isLayerRoot&&e===!1)throw new Error("[Pixi] cannot undo a layer just yet");e&&this.enableLayer()}get layer(){return this.isLayerRoot}enableLayer(){if(this.layerGroup&&this.layerGroup.root===this)return;this.isLayerRoot=!0;const e=this.layerGroup;if(e&&e.removeChild(this),this.layerGroup=new Ra(this),e){for(let t=0;t<e.layerGroupChildren.length;t++){const n=e.layerGroupChildren[t];let i=n.root;for(;i;){if(i===this){this.layerGroup.addLayerGroupChild(n);break}i=i.parent}}e.addLayerGroupChild(this.layerGroup)}this.updateIsSimple()}get worldTransform(){return this._worldTransform||(this._worldTransform=new B),this.layerGroup&&(this.isLayerRoot?this._worldTransform.copyFrom(this.layerGroup.worldTransform):this._worldTransform.appendFrom(this.layerTransform,this.layerGroup.worldTransform)),this._worldTransform}get x(){return this.position.x}set x(e){this.position.x=e}get y(){return this.position.y}set y(e){this.position.y=e}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.onUpdate(this._skew))}get angle(){return this.rotation*To}set angle(e){this.rotation=e*So}get pivot(){return this._pivot===Ga&&(this._pivot=new te(this,0,0)),this._pivot}get skew(){return this._skew===Ua&&(this._skew=new te(this,0,0)),this._skew}get scale(){return this._scale===Ia&&(this._scale=new te(this,1,1)),this._scale}updateSkew(){const e=this._rotation,t=this._skew;this._cx=Math.cos(e+t._y),this._sx=Math.sin(e+t._y),this._cy=-Math.sin(e-t._x),this._sy=Math.cos(e-t._x)}set alpha(e){e=e*255|0,e!==(this.localColor>>24&255)&&(this.localColor=this.localColor&16777215|e<<24,this.updateFlags|=wr,this.onUpdate())}get alpha(){return(this.localColor>>24&255)/255}set tint(e){e=((e&255)<<16)+(e&65280)+(e>>16&255),e!==(this.localColor&16777215)&&(this.localColor=this.localColor&4278190080|e&16777215,this.updateFlags|=wr,this.onUpdate())}get tint(){const e=this.localColor&16777215;return((e&255)<<16)+(e&65280)+(e>>16&255)}set blendMode(e){this.localBlendMode!==e&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.updateFlags|=Ln,this.localBlendMode=e,this.onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localVisibleRenderable&2)}set visible(e){const t=e?1:0;(this.localVisibleRenderable&2)>>1!==t&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.updateFlags|=_r,this.localVisibleRenderable=this.localVisibleRenderable&1|t<<1,this.onUpdate())}get renderable(){return!!(this.localVisibleRenderable&1)}set renderable(e){const t=e?1:0;(this.localVisibleRenderable&1)!==t&&(this.localVisibleRenderable=this.localVisibleRenderable&2|t,this.updateFlags|=_r,this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.onUpdate())}get isRenderable(){const e=this.layerColor>>24&255;return this.localVisibleRenderable===3&&e>0}updateIsSimple(){this.isSimple=!this.isLayerRoot&&this.effects.length===0}destroy(e=!1){this.removeFromParent(),this.parent=null,this._mask=null,this._filters=null,this.effects=null,this.position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed"),this.removeAllListeners();const t=typeof e=="boolean"?e:e==null?void 0:e.children,n=this.removeChildren(0,this.children.length);if(t)for(let i=0;i<n.length;++i)n[i].destroy(e);this.view&&(this.view.destroy(e),this.view.owner=null)}}Q.mixin(ga),Q.mixin(Aa),Q.mixin(Ca),Q.mixin(Ma),Q.mixin(Ta),Q.mixin(Sa);class zf{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this.tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this.tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){this.tickerAdded||!this.domElement||(st.system.add(this.tickerUpdate,this,it.INTERACTION),this.tickerAdded=!0)}removeTickerListener(){this.tickerAdded&&(st.system.remove(this.tickerUpdate,this),this.tickerAdded=!1)}pointerMoved(){this._didMove=!0}update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const e=this.events.rootPointerEvent;this.events.supportsTouchEvents&&e.pointerType==="touch"||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY}))}tickerUpdate(e){this._deltaTime+=e.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this.update())}}const Ee=new zf;class rr{constructor(e){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=rr.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new N,this.page=new N,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=e}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(e,t,n){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(e,t,n,i,s){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}class Gt extends rr{constructor(){super(...arguments),this.client=new N,this.movement=new N,this.offset=new N,this.global=new N,this.screen=new N}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(e,t,n){return e.worldTransform.applyInverse(n||this.global,t)}getModifierState(e){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(e)}initMouseEvent(e,t,n,i,s,o,a,l,h,u,c,d,f,p,g){throw new Error("Method not implemented.")}}class he extends Gt{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class qe extends Gt{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}qe.DOM_DELTA_PIXEL=0,qe.DOM_DELTA_LINE=1,qe.DOM_DELTA_PAGE=2;const Wf=2048,Hf=new N,It=new N;class Fa{constructor(e){this.dispatch=new re,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,t){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:t,priority:0}),this.mappingTable[e].sort((n,i)=>n.priority-i.priority)}dispatchEvent(e,t){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,t),this.dispatch.emit(t||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const t=this.mappingTable[e.type];if(t)for(let n=0,i=t.length;n<i;n++)t[n].fn(e);else console.warn(`[EventBoundary]: Event mapping not defined for ${e.type}`)}hitTest(e,t){Ee.pauseUpdate=!0;const n=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",i=this[n](this.rootTarget,this.rootTarget.eventMode,Hf.set(e,t),this.hitTestFn,this.hitPruneFn);return i&&i[0]}propagate(e,t){if(!e.target)return;const n=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let i=0,s=n.length-1;i<s;i++)if(e.currentTarget=n[i],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,t),!(e.propagationStopped||e.propagationImmediatelyStopped)){e.eventPhase=e.BUBBLING_PHASE;for(let i=n.length-2;i>=0;i--)if(e.currentTarget=n[i],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,t,n=this._allInteractiveElements){if(n.length===0)return;e.eventPhase=e.BUBBLING_PHASE;const i=Array.isArray(t)?t:[t];for(let s=n.length-1;s>=0;s--)i.forEach(o=>{e.currentTarget=n[s],this.notifyTarget(e,o)})}propagationPath(e){const t=[e];for(let n=0;n<Wf&&e!==this.rootTarget&&e.parent;n++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");t.push(e.parent),e=e.parent}return t.reverse(),t}hitTestMoveRecursive(e,t,n,i,s,o=!1){let a=!1;if(this._interactivePrune(e))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Ee.pauseUpdate=!1),e.interactiveChildren&&e.children){const u=e.children;for(let c=u.length-1;c>=0;c--){const d=u[c],f=this.hitTestMoveRecursive(d,this._isInteractive(t)?t:d.eventMode,n,i,s,o||s(e,n));if(f){if(f.length>0&&!f[f.length-1].parent)continue;const p=e.isInteractive();(f.length>0||p)&&(p&&this._allInteractiveElements.push(e),f.push(e)),this._hitElements.length===0&&(this._hitElements=f),a=!0}}}const l=this._isInteractive(t),h=e.isInteractive();return h&&h&&this._allInteractiveElements.push(e),o||this._hitElements.length>0?null:a?this._hitElements:l&&!s(e,n)&&i(e,n)?h?[e]:[]:null}hitTestRecursive(e,t,n,i,s){if(this._interactivePrune(e)||s(e,n))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Ee.pauseUpdate=!1),e.interactiveChildren&&e.children){const l=e.children,h=n;for(let u=l.length-1;u>=0;u--){const c=l[u],d=this.hitTestRecursive(c,this._isInteractive(t)?t:c.eventMode,h,i,s);if(d){if(d.length>0&&!d[d.length-1].parent)continue;const f=e.isInteractive();return(d.length>0||f)&&d.push(e),d}}}const o=this._isInteractive(t),a=e.isInteractive();return o&&i(e,n)?a?[e]:[]:null}_isInteractive(e){return e==="static"||e==="dynamic"}_interactivePrune(e){return!e||!e.visible||!e.renderable||e.eventMode==="none"||e.eventMode==="passive"&&!e.interactiveChildren}hitPruneFn(e,t){if(e.hitArea&&(e.worldTransform.applyInverse(t,It),!e.hitArea.contains(It.x,It.y)))return!0;if(e.effects&&e.effects.length){let n=!1;for(let i=0;i<e.effects.length;i++){const s=e.effects[i];if(s.containsPoint){if(!s.containsPoint(t))return!1;n=!0}}return n}return!1}hitTestFn(e,t){var n;return e.eventMode==="passive"?!1:e.hitArea?!0:(n=e.view)!=null&&n.containsPoint?(e.worldTransform.applyInverse(t,It),e.view.containsPoint(It)):!1}notifyTarget(e,t){var n,i;t=t!=null?t:e.type;const s=`on${t}`;(i=(n=e.currentTarget)[s])==null||i.call(n,e);const o=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${t}capture`:t;this.notifyListeners(e,o),e.eventPhase===e.AT_TARGET&&this.notifyListeners(e,t)}mapPointerDown(e){if(!(e instanceof he)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.createPointerEvent(e);if(this.dispatchEvent(t,"pointerdown"),t.pointerType==="touch")this.dispatchEvent(t,"touchstart");else if(t.pointerType==="mouse"||t.pointerType==="pen"){const i=t.button===2;this.dispatchEvent(t,i?"rightdown":"mousedown")}const n=this.trackingData(e.pointerId);n.pressTargetsByButton[e.button]=t.composedPath(),this.freeEvent(t)}mapPointerMove(e){var t,n,i;if(!(e instanceof he)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const s=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const o=s.pointerType==="mouse"||s.pointerType==="pen",a=this.trackingData(e.pointerId),l=this.findMountedTarget(a.overTargets);if(((t=a.overTargets)==null?void 0:t.length)>0&&l!==s.target){const c=e.type==="mousemove"?"mouseout":"pointerout",d=this.createPointerEvent(e,c,l);if(this.dispatchEvent(d,"pointerout"),o&&this.dispatchEvent(d,"mouseout"),!s.composedPath().includes(l)){const f=this.createPointerEvent(e,"pointerleave",l);for(f.eventPhase=f.AT_TARGET;f.target&&!s.composedPath().includes(f.target);)f.currentTarget=f.target,this.notifyTarget(f),o&&this.notifyTarget(f,"mouseleave"),f.target=f.target.parent;this.freeEvent(f)}this.freeEvent(d)}if(l!==s.target){const c=e.type==="mousemove"?"mouseover":"pointerover",d=this.clonePointerEvent(s,c);this.dispatchEvent(d,"pointerover"),o&&this.dispatchEvent(d,"mouseover");let f=l==null?void 0:l.parent;for(;f&&f!==this.rootTarget.parent&&f!==s.target;)f=f.parent;if(!f||f===this.rootTarget.parent){const p=this.clonePointerEvent(s,"pointerenter");for(p.eventPhase=p.AT_TARGET;p.target&&p.target!==l&&p.target!==this.rootTarget.parent;)p.currentTarget=p.target,this.notifyTarget(p),o&&this.notifyTarget(p,"mouseenter"),p.target=p.target.parent;this.freeEvent(p)}this.freeEvent(d)}const h=[],u=(n=this.enableGlobalMoveEvents)!=null?n:!0;this.moveOnAll?h.push("pointermove"):this.dispatchEvent(s,"pointermove"),u&&h.push("globalpointermove"),s.pointerType==="touch"&&(this.moveOnAll?h.splice(1,0,"touchmove"):this.dispatchEvent(s,"touchmove"),u&&h.push("globaltouchmove")),o&&(this.moveOnAll?h.splice(1,0,"mousemove"):this.dispatchEvent(s,"mousemove"),u&&h.push("globalmousemove"),this.cursor=(i=s.target)==null?void 0:i.cursor),h.length>0&&this.all(s,h),this._allInteractiveElements.length=0,this._hitElements.length=0,a.overTargets=s.composedPath(),this.freeEvent(s)}mapPointerOver(e){var t;if(!(e instanceof he)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const n=this.trackingData(e.pointerId),i=this.createPointerEvent(e),s=i.pointerType==="mouse"||i.pointerType==="pen";this.dispatchEvent(i,"pointerover"),s&&this.dispatchEvent(i,"mouseover"),i.pointerType==="mouse"&&(this.cursor=(t=i.target)==null?void 0:t.cursor);const o=this.clonePointerEvent(i,"pointerenter");for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),s&&this.notifyTarget(o,"mouseenter"),o.target=o.target.parent;n.overTargets=i.composedPath(),this.freeEvent(i),this.freeEvent(o)}mapPointerOut(e){if(!(e instanceof he)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId);if(t.overTargets){const n=e.pointerType==="mouse"||e.pointerType==="pen",i=this.findMountedTarget(t.overTargets),s=this.createPointerEvent(e,"pointerout",i);this.dispatchEvent(s),n&&this.dispatchEvent(s,"mouseout");const o=this.createPointerEvent(e,"pointerleave",i);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),n&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;t.overTargets=null,this.freeEvent(s),this.freeEvent(o)}this.cursor=null}mapPointerUp(e){if(!(e instanceof he)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=performance.now(),n=this.createPointerEvent(e);if(this.dispatchEvent(n,"pointerup"),n.pointerType==="touch")this.dispatchEvent(n,"touchend");else if(n.pointerType==="mouse"||n.pointerType==="pen"){const a=n.button===2;this.dispatchEvent(n,a?"rightup":"mouseup")}const i=this.trackingData(e.pointerId),s=this.findMountedTarget(i.pressTargetsByButton[e.button]);let o=s;if(s&&!n.composedPath().includes(s)){let a=s;for(;a&&!n.composedPath().includes(a);){if(n.currentTarget=a,this.notifyTarget(n,"pointerupoutside"),n.pointerType==="touch")this.notifyTarget(n,"touchendoutside");else if(n.pointerType==="mouse"||n.pointerType==="pen"){const l=n.button===2;this.notifyTarget(n,l?"rightupoutside":"mouseupoutside")}a=a.parent}delete i.pressTargetsByButton[e.button],o=a}if(o){const a=this.clonePointerEvent(n,"click");a.target=o,a.path=null,i.clicksByButton[e.button]||(i.clicksByButton[e.button]={clickCount:0,target:a.target,timeStamp:t});const l=i.clicksByButton[e.button];if(l.target===a.target&&t-l.timeStamp<200?++l.clickCount:l.clickCount=1,l.target=a.target,l.timeStamp=t,a.detail=l.clickCount,a.pointerType==="mouse"){const h=a.button===2;this.dispatchEvent(a,h?"rightclick":"click")}else a.pointerType==="touch"&&this.dispatchEvent(a,"tap");this.dispatchEvent(a,"pointertap"),this.freeEvent(a)}this.freeEvent(n)}mapPointerUpOutside(e){if(!(e instanceof he)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId),n=this.findMountedTarget(t.pressTargetsByButton[e.button]),i=this.createPointerEvent(e);if(n){let s=n;for(;s;)i.currentTarget=s,this.notifyTarget(i,"pointerupoutside"),i.pointerType==="touch"?this.notifyTarget(i,"touchendoutside"):(i.pointerType==="mouse"||i.pointerType==="pen")&&this.notifyTarget(i,i.button===2?"rightupoutside":"mouseupoutside"),s=s.parent;delete t.pressTargetsByButton[e.button]}this.freeEvent(i)}mapWheel(e){if(!(e instanceof qe)){console.warn("EventBoundary cannot map a non-wheel event as a wheel event");return}const t=this.createWheelEvent(e);this.dispatchEvent(t),this.freeEvent(t)}findMountedTarget(e){if(!e)return null;let t=e[0];for(let n=1;n<e.length&&e[n].parent===t;n++)t=e[n];return t}createPointerEvent(e,t,n){var i;const s=this.allocateEvent(he);return this.copyPointerData(e,s),this.copyMouseData(e,s),this.copyData(e,s),s.nativeEvent=e.nativeEvent,s.originalEvent=e,s.target=(i=n!=null?n:this.hitTest(s.global.x,s.global.y))!=null?i:this._hitElements[0],typeof t=="string"&&(s.type=t),s}createWheelEvent(e){const t=this.allocateEvent(qe);return this.copyWheelData(e,t),this.copyMouseData(e,t),this.copyData(e,t),t.nativeEvent=e.nativeEvent,t.originalEvent=e,t.target=this.hitTest(t.global.x,t.global.y),t}clonePointerEvent(e,t){const n=this.allocateEvent(he);return n.nativeEvent=e.nativeEvent,n.originalEvent=e.originalEvent,this.copyPointerData(e,n),this.copyMouseData(e,n),this.copyData(e,n),n.target=e.target,n.path=e.composedPath().slice(),n.type=t!=null?t:n.type,n}copyWheelData(e,t){t.deltaMode=e.deltaMode,t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ}copyPointerData(e,t){e instanceof he&&t instanceof he&&(t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist)}copyMouseData(e,t){e instanceof Gt&&t instanceof Gt&&(t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.copyFrom(e.client),t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.copyFrom(e.movement),t.screen.copyFrom(e.screen),t.shiftKey=e.shiftKey,t.global.copyFrom(e.global))}copyData(e,t){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.detail=e.detail,t.view=e.view,t.which=e.which,t.layer.copyFrom(e.layer),t.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const t=this.eventPool.get(e).pop()||new e(this);return t.eventPhase=t.NONE,t.currentTarget=null,t.path=null,t.target=null,t}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const t=e.constructor;this.eventPool.has(t)||this.eventPool.set(t,[]),this.eventPool.get(t).push(e)}notifyListeners(e,t){const n=e.currentTarget._events[t];if(n&&e.currentTarget.isInteractive())if("fn"in n)n.once&&e.currentTarget.removeListener(t,n.fn,void 0,!0),n.fn.call(n.context,e);else for(let i=0,s=n.length;i<s&&!e.propagationImmediatelyStopped;i++)n[i].once&&e.currentTarget.removeListener(t,n[i].fn,void 0,!0),n[i].fn.call(n[i].context,e)}}var Vf=Object.defineProperty,Oa=Object.getOwnPropertySymbols,jf=Object.prototype.hasOwnProperty,Yf=Object.prototype.propertyIsEnumerable,La=(r,e,t)=>e in r?Vf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Xf=(r,e)=>{for(var t in e||(e={}))jf.call(e,t)&&La(r,t,e[t]);if(Oa)for(var t of Oa(e))Yf.call(e,t)&&La(r,t,e[t]);return r};const qf=1,Kf={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},Dn=class{constructor(r){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=r,this.rootBoundary=new Fa(null),Ee.init(this),this.autoPreventDefault=!0,this.eventsAdded=!1,this.rootPointerEvent=new he(null),this.rootWheelEvent=new qe(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy(Xf({},Dn.defaultEventFeatures),{set:(e,t,n)=>(t==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=n),e[t]=n,!0)}),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onPointerOverOut=this.onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(r){var e,t;const{element:n,resolution:i}=this.renderer;this.setTargetElement(n),this.resolution=i,Dn._defaultEventMode=(e=r.eventMode)!=null?e:"passive",Object.assign(this.features,(t=r.eventFeatures)!=null?t:{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(r){this.resolution=r}destroy(){this.setTargetElement(null),this.renderer=null}setCursor(r){r=r||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this.currentCursor===r)return;this.currentCursor=r;const t=this.cursorStyles[r];if(t)switch(typeof t){case"string":e&&(this.domElement.style.cursor=t);break;case"function":t(r);break;case"object":e&&Object.assign(this.domElement.style,t);break}else e&&typeof r=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,r)&&(this.domElement.style.cursor=r)}get pointer(){return this.rootPointerEvent}onPointerDown(r){if(!this.features.click||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;const e=this.normalizeToPointerData(r);this.autoPreventDefault&&e[0].isNormalized&&(r.cancelable||!("cancelable"in r))&&r.preventDefault();for(let t=0,n=e.length;t<n;t++){const i=e[t],s=this.bootstrapEvent(this.rootPointerEvent,i);this.rootBoundary.mapEvent(s)}this.setCursor(this.rootBoundary.cursor)}onPointerMove(r){if(!this.features.move||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;Ee.pointerMoved();const e=this.normalizeToPointerData(r);for(let t=0,n=e.length;t<n;t++){const i=this.bootstrapEvent(this.rootPointerEvent,e[t]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}onPointerUp(r){if(!this.features.click||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;let e=r.target;r.composedPath&&r.composedPath().length>0&&(e=r.composedPath()[0]);const t=e!==this.domElement?"outside":"",n=this.normalizeToPointerData(r);for(let i=0,s=n.length;i<s;i++){const o=this.bootstrapEvent(this.rootPointerEvent,n[i]);o.type+=t,this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}onPointerOverOut(r){if(!this.features.click||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;const e=this.normalizeToPointerData(r);for(let t=0,n=e.length;t<n;t++){const i=this.bootstrapEvent(this.rootPointerEvent,e[t]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}onWheel(r){if(!this.features.wheel)return;const e=this.normalizeWheelEvent(r);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}setTargetElement(r){this.removeEvents(),this.domElement=r,Ee.domElement=r,this.addEvents()}addEvents(){if(this.eventsAdded||!this.domElement)return;Ee.addTickerListener();const r=this.domElement.style;r&&(globalThis.navigator.msPointerEnabled?(r.msContentZooming="none",r.msTouchAction="none"):this.supportsPointerEvents&&(r.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this.onPointerMove,!0),this.domElement.addEventListener("pointerdown",this.onPointerDown,!0),this.domElement.addEventListener("pointerleave",this.onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this.onPointerOverOut,!0),globalThis.addEventListener("pointerup",this.onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this.onPointerMove,!0),this.domElement.addEventListener("mousedown",this.onPointerDown,!0),this.domElement.addEventListener("mouseout",this.onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this.onPointerOverOut,!0),globalThis.addEventListener("mouseup",this.onPointerUp,!0)),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this.onPointerDown,!0),this.domElement.addEventListener("touchend",this.onPointerUp,!0),this.domElement.addEventListener("touchmove",this.onPointerMove,!0)),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this.eventsAdded=!0}removeEvents(){if(!this.eventsAdded||!this.domElement)return;Ee.removeTickerListener();const r=this.domElement.style;globalThis.navigator.msPointerEnabled?(r.msContentZooming="",r.msTouchAction=""):this.supportsPointerEvents&&(r.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this.onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this.onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this.onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this.onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this.onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this.onPointerMove,!0),this.domElement.removeEventListener("mousedown",this.onPointerDown,!0),this.domElement.removeEventListener("mouseout",this.onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this.onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this.onPointerUp,!0)),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this.onPointerDown,!0),this.domElement.removeEventListener("touchend",this.onPointerUp,!0),this.domElement.removeEventListener("touchmove",this.onPointerMove,!0)),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this.eventsAdded=!1}mapPositionToPoint(r,e,t){const n=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},i=1/this.resolution;r.x=(e-n.left)*(this.domElement.width/n.width)*i,r.y=(t-n.top)*(this.domElement.height/n.height)*i}normalizeToPointerData(r){const e=[];if(this.supportsTouchEvents&&r instanceof TouchEvent)for(let t=0,n=r.changedTouches.length;t<n;t++){const i=r.changedTouches[t];typeof i.button=="undefined"&&(i.button=0),typeof i.buttons=="undefined"&&(i.buttons=1),typeof i.isPrimary=="undefined"&&(i.isPrimary=r.touches.length===1&&r.type==="touchstart"),typeof i.width=="undefined"&&(i.width=i.radiusX||1),typeof i.height=="undefined"&&(i.height=i.radiusY||1),typeof i.tiltX=="undefined"&&(i.tiltX=0),typeof i.tiltY=="undefined"&&(i.tiltY=0),typeof i.pointerType=="undefined"&&(i.pointerType="touch"),typeof i.pointerId=="undefined"&&(i.pointerId=i.identifier||0),typeof i.pressure=="undefined"&&(i.pressure=i.force||.5),typeof i.twist=="undefined"&&(i.twist=0),typeof i.tangentialPressure=="undefined"&&(i.tangentialPressure=0),typeof i.layerX=="undefined"&&(i.layerX=i.offsetX=i.clientX),typeof i.layerY=="undefined"&&(i.layerY=i.offsetY=i.clientY),i.isNormalized=!0,i.type=r.type,e.push(i)}else if(!globalThis.MouseEvent||r instanceof MouseEvent&&(!this.supportsPointerEvents||!(r instanceof globalThis.PointerEvent))){const t=r;typeof t.isPrimary=="undefined"&&(t.isPrimary=!0),typeof t.width=="undefined"&&(t.width=1),typeof t.height=="undefined"&&(t.height=1),typeof t.tiltX=="undefined"&&(t.tiltX=0),typeof t.tiltY=="undefined"&&(t.tiltY=0),typeof t.pointerType=="undefined"&&(t.pointerType="mouse"),typeof t.pointerId=="undefined"&&(t.pointerId=qf),typeof t.pressure=="undefined"&&(t.pressure=.5),typeof t.twist=="undefined"&&(t.twist=0),typeof t.tangentialPressure=="undefined"&&(t.tangentialPressure=0),t.isNormalized=!0,e.push(t)}else e.push(r);return e}normalizeWheelEvent(r){const e=this.rootWheelEvent;return this.transferMouseData(e,r),e.deltaX=r.deltaX,e.deltaY=r.deltaY,e.deltaZ=r.deltaZ,e.deltaMode=r.deltaMode,this.mapPositionToPoint(e.screen,r.clientX,r.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=r,e.type=r.type,e}bootstrapEvent(r,e){return r.originalEvent=null,r.nativeEvent=e,r.pointerId=e.pointerId,r.width=e.width,r.height=e.height,r.isPrimary=e.isPrimary,r.pointerType=e.pointerType,r.pressure=e.pressure,r.tangentialPressure=e.tangentialPressure,r.tiltX=e.tiltX,r.tiltY=e.tiltY,r.twist=e.twist,this.transferMouseData(r,e),this.mapPositionToPoint(r.screen,e.clientX,e.clientY),r.global.copyFrom(r.screen),r.offset.copyFrom(r.screen),r.isTrusted=e.isTrusted,r.type==="pointerleave"&&(r.type="pointerout"),r.type.startsWith("mouse")&&(r.type=r.type.replace("mouse","pointer")),r.type.startsWith("touch")&&(r.type=Kf[r.type]||r.type),r}transferMouseData(r,e){r.isTrusted=e.isTrusted,r.srcElement=e.srcElement,r.timeStamp=performance.now(),r.type=e.type,r.altKey=e.altKey,r.button=e.button,r.buttons=e.buttons,r.client.x=e.clientX,r.client.y=e.clientY,r.ctrlKey=e.ctrlKey,r.metaKey=e.metaKey,r.movement.x=e.movementX,r.movement.y=e.movementY,r.page.x=e.pageX,r.page.y=e.pageY,r.relatedTarget=null,r.shiftKey=e.shiftKey}};let Ft=Dn;Ft.extension={name:"events",type:[x.WebGLSystem,x.CanvasSystem,x.WebGPUSystem],priority:-1},Ft.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};const Da={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(r){this.eventMode=r?"static":"passive"},_internalEventMode:void 0,get eventMode(){var r;return(r=this._internalEventMode)!=null?r:Ft.defaultEventMode},set eventMode(r){this._internalEventMode=r},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(r,e,t){const n=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,i=typeof e=="function"?void 0:e;r=n?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.on(r,e,i)},removeEventListener(r,e,t){const n=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,i=typeof e=="function"?void 0:e;r=n?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.off(r,e,i)},dispatchEvent(r){if(!(r instanceof rr))throw new Error("DisplayObject cannot propagate events outside of the Federated Events API");return r.defaultPrevented=!1,r.path=null,r.target=this,r.manager.dispatchEvent(r),!r.defaultPrevented}};K.add(Ft),Q.mixin(Da);const Ot=class{constructor(r,e){this.linkedSheets=[],this._texture=r instanceof k?r:null,this.textureSource=r.source,this.textures={},this.animations={},this.data=e;const t=parseFloat(e.meta.scale);t?(this.resolution=t,r.source.resolution=this.resolution):this.resolution=r.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(r=>{this._callback=r,this._batchIndex=0,this._frameKeys.length<=Ot.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(r){let e=r;const t=Ot.BATCH_SIZE;for(;e-r<t&&e<this._frameKeys.length;){const n=this._frameKeys[e],i=this._frames[n],s=i.frame;if(s){let o=null,a=null;const l=i.trimmed!==!1&&i.sourceSize?i.sourceSize:i.frame,h=new q(0,0,Math.floor(l.w)/this.resolution,Math.floor(l.h)/this.resolution);i.rotated?o=new q(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.h)/this.resolution,Math.floor(s.w)/this.resolution):o=new q(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),i.trimmed!==!1&&i.spriteSourceSize&&(a=new q(Math.floor(i.spriteSourceSize.x)/this.resolution,Math.floor(i.spriteSourceSize.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),a.x/=this.textureSource.width,a.y/=this.textureSource.height,a.width/=this.textureSource.width,a.height/=this.textureSource.height),o.x/=this.textureSource.width,o.y/=this.textureSource.height,o.width/=this.textureSource.width,o.height/=this.textureSource.height,h.x/=this.textureSource.width,h.y/=this.textureSource.height,h.width/=this.textureSource.width,h.height/=this.textureSource.height,this.textures[n]=new k({source:this.textureSource,layout:{frame:o,orig:h,trim:a,rotate:i.rotated?2:0,defaultAnchor:i.anchor},label:n})}e++}}_processAnimations(){const r=this.data.animations||{};for(const e in r){this.animations[e]=[];for(let t=0;t<r[e].length;t++){const n=r[e][t];this.animations[e].push(this.textures[n])}}}_parseComplete(){const r=this._callback;this._callback=null,this._batchIndex=0,r.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*Ot.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*Ot.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(r=!1){var e;for(const t in this.textures)this.textures[t].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,r&&((e=this._texture)==null||e.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};let Tr=Ot;Tr.BATCH_SIZE=1e3;const Zf=["jpg","png","jpeg","avif","webp"];function $a(r,e,t){const n={};if(r.forEach(i=>{n[i]=e}),Object.keys(e.textures).forEach(i=>{n[i]=e.textures[i]}),!t){const i=ie.dirname(r[0]);e.linkedSheets.forEach((s,o)=>{const a=$a([`${i}/${e.data.meta.related_multi_packs[o]}`],s,!0);Object.assign(n,a)})}return n}const Na={extension:x.Asset,cache:{test:r=>r instanceof Tr,getCacheableAssets:(r,e)=>$a(r,e,!1)},resolver:{test:r=>{const e=r.split("?")[0].split("."),t=e.pop(),n=e.pop();return t==="json"&&Zf.includes(n)},parse:r=>{var e,t;const n=r.split(".");return{resolution:parseFloat((t=(e=F.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:n[n.length-2],src:r}}},loader:{name:"spritesheetLoader",extension:{type:x.LoadParser,priority:Te.Normal},async testParse(r,e){return ie.extname(e.src).toLowerCase()===".json"&&!!r.frames},async parse(r,e,t){var n,i;let s=ie.dirname(e.src);s&&s.lastIndexOf("/")!==s.length-1&&(s+="/");let o=s+r.meta.image;o=ar(o,e.src);const a=(await t.load([o]))[o],l=new Tr(a.source,r);await l.parse();const h=(n=r==null?void 0:r.meta)==null?void 0:n.related_multi_packs;if(Array.isArray(h)){const u=[];for(const d of h){if(typeof d!="string")continue;let f=s+d;(i=e.data)!=null&&i.ignoreMultiPack||(f=ar(f,e.src),u.push(t.load({src:f,data:{ignoreMultiPack:!0}})))}const c=await Promise.all(u);l.linkedSheets=c,c.forEach(d=>{d.linkedSheets=[l].concat(l.linkedSheets.filter(f=>f!==d))})}return l},unload(r){r.destroy(!0)}}};K.add(Na);const ft={onViewUpdate:()=>{}};let Qf=0;class za{constructor(e){this.owner=ft,this.batched=!0,this.buildId=0,this.uid=Qf++,this.type="sprite",this._bounds=[0,1,0,0],this._sourceBounds=[0,1,0,0],this.boundsDirty=!0,this.sourceBoundsDirty=!0;var t,n;this.anchor=new te(this,((t=e.layout.defaultAnchor)==null?void 0:t.x)||0,((n=e.layout.defaultAnchor)==null?void 0:n.y)||0),this.texture=e}set texture(e){this._texture!==e&&(e.on("update",this.onUpdate,this),this._texture=e,e.off("update",this.onUpdate,this),this.onUpdate())}get texture(){return this._texture}get bounds(){return this.boundsDirty&&(this.updateBounds(),this.boundsDirty=!1),this._bounds}get sourceBounds(){return this.sourceBoundsDirty&&(this._updateSourceBounds(),this.sourceBoundsDirty=!1),this._sourceBounds}updateBounds(){const e=this._texture,t=e._source,n=e.layout,i=n.orig,s=n.trim,o=t.width,a=t.height,l=o*i.width,h=a*i.height,u=this.anchor,c=this._bounds;if(s){const d=o*s.width,f=a*s.height;c[1]=s.x*o-u._x*l,c[0]=c[1]+d,c[3]=s.y*a-u._y*h,c[2]=c[3]+f}else c[1]=-u._x*l,c[0]=c[1]+l,c[3]=-u._y*h,c[2]=c[3]+h}_updateSourceBounds(){const e=this.anchor,t=this._texture,n=t._source,i=t.layout.orig,s=this._sourceBounds,o=n.width*i.width,a=n.height*i.height;s[1]=-e._x*o,s[0]=s[1]+o,s[3]=-e._y*a,s[2]=s[3]+a}addBounds(e){if(this._texture._layout.trim){const t=this.sourceBounds;e.addFrame(t[0],t[2],t[1],t[3])}else{const t=this.bounds;e.addFrame(t[0],t[2],t[1],t[3])}}onUpdate(){this.didUpdate=!0,this.sourceBoundsDirty=this.boundsDirty=!0,this.owner.onViewUpdate()}containsPoint(e){const t=this._texture.frameWidth,n=this._texture.frameHeight,i=-t*this.anchor.x;let s=0;return e.x>=i&&e.x<i+t&&(s=-n*this.anchor.y,e.y>=s&&e.y<s+n)}destroy(e=!1){if(this.anchor=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._bounds=null,this._sourceBounds=null}}var Jf=Object.defineProperty,Wa=Object.getOwnPropertySymbols,ep=Object.prototype.hasOwnProperty,tp=Object.prototype.propertyIsEnumerable,Ha=(r,e,t)=>e in r?Jf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,rp=(r,e)=>{for(var t in e||(e={}))ep.call(e,t)&&Ha(r,t,e[t]);if(Wa)for(var t of Wa(e))tp.call(e,t)&&Ha(r,t,e[t]);return r};class Ge extends Q{static from(e){return typeof e=="string"?new Ge(ae.get(e)):new Ge(e)}constructor(e=k.EMPTY){var t;e instanceof k&&(e={texture:e}),(t=e.texture)!=null||(e.texture=k.EMPTY),super(rp({view:new za(e.texture),label:"Sprite"},e))}get anchor(){return this.view.anchor}get texture(){return this.view.texture}set texture(e){this.view.texture=e}}const Va=new pe;function Sr(r,e,t){const n=Va;r.measurable=!0,ct(r,t,n),e.addBoundsMask(n),r.measurable=!1}function Pr(r,e,t){const n=new pe;r.measurable=!0;const i=$n(r,t,new B);Xe(r,n,i),r.measurable=!1,e.addBoundsMask(n)}function $n(r,e,t){return r?(r!==e&&($n(r.parent,e,t),r.didChange&&Pe(r.localTransform,r),t.append(r.localTransform)),t):(console.warn("Item is not inside the root container"),t)}class Nn{constructor(e){this.priority=0,this.pipe="alphaMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof Ge),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(e,t){Sr(this.mask,e,t)}addLocalBounds(e,t){Pr(this.mask,e,t)}containsPoint(e){const t=this.mask;return t.containsPoint?t.containsPoint(e):!1}destroy(){this.reset()}static test(e){return e instanceof Ge}}Nn.extension=x.MaskEffect;class zn{constructor(e){this.priority=0,this.pipe="colorMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}zn.extension=x.MaskEffect;class Wn{constructor(e){this.priority=0,this.pipe="stencilMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(e,t){Sr(this.mask,e,t)}addLocalBounds(e,t){Pr(this.mask,e,t)}containsPoint(e){const t=this.mask;return t.containsPoint?t.containsPoint(e):!1}destroy(){this.reset()}static test(e){return e instanceof Q}}Wn.extension=x.MaskEffect,K.add(Nn,zn,Wn);var np={__proto__:null};let Hn;function ip(){return typeof Hn=="undefined"&&(Hn=function(){var r;const e={stencil:!0,failIfMajorPerformanceCaveat:F.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};try{if(!F.ADAPTER.getWebGLRenderingContext())return!1;let t=F.ADAPTER.createCanvas().getContext("webgl2",e);const n=!!((r=t==null?void 0:t.getContextAttributes())!=null&&r.stencil);if(t){const i=t.getExtension("WEBGL_lose_context");i&&i.loseContext()}return t=null,n}catch(t){return!1}}()),Hn}function sp(){return!!F.ADAPTER.getNavigator().gpu}var op=Object.defineProperty,ja=Object.getOwnPropertySymbols,ap=Object.prototype.hasOwnProperty,lp=Object.prototype.propertyIsEnumerable,Ya=(r,e,t)=>e in r?op(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Lt=(r,e)=>{for(var t in e||(e={}))ap.call(e,t)&&Ya(r,t,e[t]);if(ja)for(var t of ja(e))lp.call(e,t)&&Ya(r,t,e[t]);return r};const Xa=["webgpu","webgl","canvas"];async function qa(r){var e;let t=[];r.preference?(t.push(r.preference),Xa.forEach(o=>{o!==r.preference&&t.push(o)})):t=Xa.slice();let n;((e=r.manageImports)==null||e)&&await Promise.resolve().then(function(){return np});let i={};for(let o=0;o<t.length;o++){const a=t[o];if(a==="webgpu"&&sp()){const{WebGPURenderer:l}=await Promise.resolve().then(function(){return qv});n=l,i=Lt(Lt({},r),r.webgpu);break}else if(a==="webgl"&&ip()){const{WebGLRenderer:l}=await Promise.resolve().then(function(){return Ov});n=l,i=Lt(Lt({},r),r.webgl);break}else if(a==="canvas"){i=Lt({},r);break}}delete i.webgpu,delete i.webgl;const s=new n;return await s.init(i),s}var hp=Object.defineProperty,Ka=Object.getOwnPropertySymbols,up=Object.prototype.hasOwnProperty,cp=Object.prototype.propertyIsEnumerable,Za=(r,e,t)=>e in r?hp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,dp=(r,e)=>{for(var t in e||(e={}))up.call(e,t)&&Za(r,t,e[t]);if(Ka)for(var t of Ka(e))cp.call(e,t)&&Za(r,t,e[t]);return r};const Qa=class{constructor(){this.stage=new Q}async init(r){r=dp({},r),this.renderer=await qa(r),Qa._plugins.forEach(e=>{e.init.call(this,r)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.element}};let Vn=Qa;Vn._plugins=[],K.handleByList(x.Application,Vn._plugins);class Ja{constructor(e,t=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=t}add(e){e.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],t=Math.min(this._assetList.length,this._maxConcurrent);for(let n=0;n<t;n++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}const Dt=r=>!Array.isArray(r);var fp=Object.defineProperty,pp=Object.defineProperties,mp=Object.getOwnPropertyDescriptors,el=Object.getOwnPropertySymbols,gp=Object.prototype.hasOwnProperty,vp=Object.prototype.propertyIsEnumerable,tl=(r,e,t)=>e in r?fp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,bp=(r,e)=>{for(var t in e||(e={}))gp.call(e,t)&&tl(r,t,e[t]);if(el)for(var t of el(e))vp.call(e,t)&&tl(r,t,e[t]);return r},yp=(r,e)=>pp(r,mp(e));class rl{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,t,n)=>(this._parsersValidated=!1,e[t]=n,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,t){const n={promise:null,parser:null};return n.promise=(async()=>{var i,s;let o=null,a=null;if(t.loadParser&&(a=this._parserHash[t.loadParser]),!a){for(let l=0;l<this.parsers.length;l++){const h=this.parsers[l];if(h.load&&(i=h.test)!=null&&i.call(h,e,t,this)){a=h;break}}if(!a)return null}o=await a.load(e,t,this),n.parser=a;for(let l=0;l<this.parsers.length;l++){const h=this.parsers[l];h.parse&&h.parse&&await((s=h.testParse)==null?void 0:s.call(h,o,t,this))&&(o=await h.parse(o,t,this)||o,n.parser=h)}return o})(),n}async load(e,t){this._parsersValidated||this._validateParsers();let n=0;const i={},s=Dt(e),o=le(e,h=>({alias:[h],src:h})),a=o.length,l=o.map(async h=>{const u=ie.toAbsolute(h.src);if(!i[h.src])try{this.promiseCache[u]||(this.promiseCache[u]=this._getLoadPromiseAndParser(u,h)),i[h.src]=await this.promiseCache[u].promise,t&&t(++n/a)}catch(c){throw delete this.promiseCache[u],delete i[h.src],new Error(`[Loader.load] Failed to load ${u}.
${c}`)}});return await Promise.all(l),s?i[o[0].src]:i}async unload(e){const t=le(e,n=>({alias:[n],src:n})).map(async n=>{var i,s;const o=ie.toAbsolute(n.src),a=this.promiseCache[o];if(a){const l=await a.promise;(s=(i=a.parser)==null?void 0:i.unload)==null||s.call(i,l,n,this),delete this.promiseCache[o]}});await Promise.all(t)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name).reduce((e,t)=>(e[t.name],yp(bp({},e),{[t.name]:t})),{})}}function nl(r,e,t,n,i){const s=e[t];for(let o=0;o<s.length;o++){const a=s[o];t<e.length-1?nl(r.replace(n[t],a),e,t+1,n,i):i.push(r.replace(n[t],a))}}function il(r){const e=/\{(.*?)\}/g,t=r.match(e),n=[];if(t){const i=[];t.forEach(s=>{const o=s.substring(1,s.length-1).split(",");i.push(o)}),nl(r,i,0,t,n)}else n.push(r);return n}var xp=Object.defineProperty,wp=Object.defineProperties,_p=Object.getOwnPropertyDescriptors,sl=Object.getOwnPropertySymbols,Tp=Object.prototype.hasOwnProperty,Sp=Object.prototype.propertyIsEnumerable,ol=(r,e,t)=>e in r?xp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,pt=(r,e)=>{for(var t in e||(e={}))Tp.call(e,t)&&ol(r,t,e[t]);if(sl)for(var t of sl(e))Sp.call(e,t)&&ol(r,t,e[t]);return r},al=(r,e)=>wp(r,_p(e));class ll{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,t)=>`${e}${this._bundleIdConnector}${t}`,extractAssetIdFromBundle:(e,t)=>t.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){var t,n,i;if(this._bundleIdConnector=(t=e.connector)!=null?t:this._bundleIdConnector,this._createBundleAssetId=(n=e.createBundleAssetId)!=null?n:this._createBundleAssetId,this._extractAssetIdFromBundle=(i=e.extractAssetIdFromBundle)!=null?i:this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const t=e;this._defaultSearchParams=Object.keys(t).map(n=>`${encodeURIComponent(n)}=${encodeURIComponent(t[n])}`).join("&")}}addManifest(e){this._manifest,this._manifest=e,e.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}addBundle(e,t){const n=[];Array.isArray(t)?t.forEach(i=>{var s,o;const a=(s=i.src)!=null?s:i.srcs,l=(o=i.alias)!=null?o:i.name;let h;if(typeof l=="string"){const u=this._createBundleAssetId(e,l);n.push(u),h=[l,u]}else{const u=l.map(c=>this._createBundleAssetId(e,c));n.push(...u),h=[...l,...u]}this.add(al(pt({},i),{alias:h,src:a}))}):Object.keys(t).forEach(i=>{var s;const o=[i,this._createBundleAssetId(e,i)];if(typeof t[i]=="string")this.add({alias:o,src:t[i]});else if(Array.isArray(t[i]))this.add({alias:o,src:t[i]});else{const a=t[i],l=(s=a.src)!=null?s:a.srcs;this.add(al(pt({},a),{alias:o,src:Array.isArray(l)?l:[l]}))}n.push(...o)}),this._bundles[e]=n}add(e){const t=[];Array.isArray(e)?t.push(...e):t.push(e),le(t).forEach(n=>{const{alias:i,name:s,src:o,srcs:a}=n;let{data:l,format:h,loadParser:u}=n;const c=le(o||a).map(p=>typeof p=="string"?il(p):Array.isArray(p)?p:[p]),d=le(i||s),f=[];c.forEach(p=>{p.forEach(g=>{var m,y,b;let v={};if(typeof g!="object"){v.src=g;for(let w=0;w<this._parsers.length;w++){const P=this._parsers[w];if(P.test(g)){v=P.parse(g);break}}}else l=(m=g.data)!=null?m:l,h=(y=g.format)!=null?y:h,u=(b=g.loadParser)!=null?b:u,v=pt(pt({},v),g);v=this.buildResolvedAsset(v,{aliases:d,data:l,format:h,loadParser:u}),f.push(v)})}),d.forEach(p=>{this._assetMap[p]=f})})}resolveBundle(e){const t=Dt(e);e=le(e);const n={};return e.forEach(i=>{const s=this._bundles[i];if(s){const o=this.resolve(s),a={};for(const l in o){const h=o[l];a[this._extractAssetIdFromBundle(i,l)]=h}n[i]=a}}),t?n[e[0]]:n}resolveUrl(e){const t=this.resolve(e);if(typeof e!="string"){const n={};for(const i in t)n[i]=t[i].src;return n}return t.src}resolve(e){const t=Dt(e);e=le(e);const n={};return e.forEach(i=>{var s;if(!this._resolverHash[i])if(this._assetMap[i]){let o=this._assetMap[i];const a=o[0],l=this._getPreferredOrder(o);l==null||l.priority.forEach(h=>{l.params[h].forEach(u=>{const c=o.filter(d=>d[h]?d[h]===u:!1);c.length&&(o=c)})}),this._resolverHash[i]=(s=o[0])!=null?s:a}else this._resolverHash[i]=this.buildResolvedAsset({alias:[i],src:i},{});n[i]=this._resolverHash[i]}),t?n[e[0]]:n}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let t=0;t<e.length;t++){const n=e[0],i=this._preferredOrder.find(s=>s.params.format.includes(n.format));if(i)return i}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const t=/\?/.test(e)?"&":"?";return`${e}${t}${this._defaultSearchParams}`}buildResolvedAsset(e,t){var n;const{aliases:i,data:s,loadParser:o,format:a}=t;return(this._basePath||this._rootPath)&&(e.src=ie.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=(n=i!=null?i:e.alias)!=null?n:[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data=pt(pt({},s||{}),e.data),e.loadParser=o!=null?o:e.loadParser,e.format=a!=null?a:e.src.split(".").pop(),e.srcs=e.src,e.name=e.alias,e}}class hl{constructor(){this._detections=[],this._initialized=!1,this.resolver=new ll,this.loader=new rl,this.cache=ae,this._backgroundLoader=new Ja(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){var t,n,i,s;if(this._initialized)return;if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let h=e.manifest;typeof h=="string"&&(h=await this.load(h)),this.resolver.addManifest(h)}const o=(n=(t=e.texturePreference)==null?void 0:t.resolution)!=null?n:1,a=typeof o=="number"?[o]:o;let l=[];if((i=e.texturePreference)!=null&&i.format){const h=(s=e.texturePreference)==null?void 0:s.format;l=typeof h=="string"?[h]:h;for(const u of this._detections)await u.test()||(l=await u.remove(l))}else for(const h of this._detections)await h.test()&&(l=await h.add(l));this.resolver.prefer({params:{format:l,resolution:a}}),e.preferences&&this.setPreferences(e.preferences)}add(e){this.resolver.add(e)}async load(e,t){this._initialized||await this.init();const n=Dt(e),i=le(e).map(a=>{if(typeof a!="string"){this.add(a);const l=a.src||a.srcs,h=a.alias||a.name;return h&&Array.isArray(h)?h[0]:l&&Array.isArray(l)?l[0]:h||l}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),s=this.resolver.resolve(i),o=await this._mapLoadToResolve(s,t);return n?o[i[0]]:o}addBundle(e,t){this.resolver.addBundle(e,t)}async loadBundle(e,t){this._initialized||await this.init();let n=!1;typeof e=="string"&&(n=!0,e=[e]);const i=this.resolver.resolveBundle(e),s={},o=Object.keys(i);let a=0,l=0;const h=()=>{t==null||t(++a/l)},u=o.map(c=>{const d=i[c];return l+=Object.keys(d).length,this._mapLoadToResolve(d,h).then(f=>{s[c]=f})});return await Promise.all(u),n?s[e[0]]:s}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(t))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolveBundle(e);Object.values(t).forEach(n=>{this._backgroundLoader.add(Object.values(n))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return ae.get(e);const t={};for(let n=0;n<e.length;n++)t[n]=ae.get(e[n]);return t}async _mapLoadToResolve(e,t){const n=Object.values(e),i=Object.keys(e);this._backgroundLoader.active=!1;const s=await this.loader.load(n,t);this._backgroundLoader.active=!0;const o={};return n.forEach((a,l)=>{const h=s[a.src],u=[a.src];a.alias&&u.push(...a.alias),o[i[l]]=h,ae.set(u,h)}),o}async unload(e){this._initialized||await this.init();const t=le(e).map(i=>typeof i!="string"?i.src:i),n=this.resolver.resolve(t);await this._unloadFromResolved(n)}async unloadBundle(e){this._initialized||await this.init(),e=le(e);const t=this.resolver.resolveBundle(e),n=Object.keys(t).map(i=>this._unloadFromResolved(t[i]));await Promise.all(n)}async _unloadFromResolved(e){const t=Object.values(e);t.forEach(n=>{ae.remove(n.src)}),await this.loader.unload(t)}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(t=>{t.config&&Object.keys(t.config).filter(n=>n in e).forEach(n=>{t.config[n]=e[n]})})}}const $t=new hl;K.handleByList(x.LoadParser,$t.loader.parsers).handleByList(x.ResolveParser,$t.resolver.parsers).handleByList(x.CacheParser,$t.cache.parsers).handleByList(x.DetectionParser,$t.detections);class be{constructor(e){this.usageTick=0,this.dirty=!0,this.resources={};let t=0;for(const n in e){const i=e[n];this.setResource(i,t++)}this.updateKey()}update(){this.updateKey()}updateKey(){if(!this.dirty)return;this.dirty=!1;const e=[];let t=0;for(const n in this.resources)e[t++]=this.resources[n].resourceId;this.key=e.join("|")}setResource(e,t){var n,i;const s=this.resources[t];e!==s&&(s&&((n=e.off)==null||n.call(e,"change",this.onResourceChange,this)),(i=e.on)==null||i.call(e,"change",this.onResourceChange,this),this.resources[t]=e,this.dirty=!0)}getResource(e){return this.resources[e]}destroy(){var e;const t=this.resources;for(const n in t){const i=t[n];(e=i.off)==null||e.call(i,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(){this.dirty=!0,this.update()}}class Me extends re{constructor({gpuProgram:e,glProgram:t,groups:n,resources:i,groupMap:s}){super(),this.uniformBindMap={},this.gpuProgram=e,this.glProgram=t;const o={};if(i&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!i&&!n)throw new Error("[Shader] Must provide either resources or groups descriptor");if(!e&&n&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&n&&s)for(const a in s)for(const l in s[a]){const h=s[a][l];o[h]={group:a,binding:l,name:h}}else if(e&&n&&!s){const a=e.structsAndGroups.groups;s={},a.forEach(l=>{s[l.group]=s[l.group]||{},s[l.group][l.binding]=l.name,o[l.name]=l})}else if(i){if(e){const a=e.structsAndGroups.groups;s={},a.forEach(l=>{s[l.group]=s[l.group]||{},s[l.group][l.binding]=l.name,o[l.name]=l})}else{s={},n={99:new be};let a=0;for(const l in i)o[l]={group:99,binding:a,name:l},n[99].setResource(i[l],a),s[99]=s[99]||{},s[99][a]=l,a++}n={};for(const a in i){const l=a,h=i[a],u=o[l];u&&(n[u.group]=n[u.group]||new be,n[u.group].setResource(h,u.binding))}}this.groups=n,this.uniformBindMap=s,this.resources=this._buildResourceAccessor(n,o)}_buildResourceAccessor(e,t){const n={};for(const i in t){const s=t[i];Object.defineProperty(n,s.name,{get(){return e[s.group].getResource(s.binding)},set(o){e[s.group].setResource(o,s.binding)}})}return n}destroy(e=!1){var t,n;this.emit("destroy",this),e&&((t=this.gpuProgram)==null||t.destroy(),(n=this.glProgram)==null||n.destroy()),this.gpuProgram=null,this.glProgram=null,this.groups=null,this.removeAllListeners(),this.uniformBindMap=null,this.resources=null}}const Pp={normal:0,additive:1,multiply:2,screen:3,overlay:4},jn=0,Yn=1,Xn=2,qn=3,Kn=4,Zn=5;class _e{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<jn)}set blend(e){!!(this.data&1<<jn)!==e&&(this.data^=1<<jn)}get offsets(){return!!(this.data&1<<Yn)}set offsets(e){!!(this.data&1<<Yn)!==e&&(this.data^=1<<Yn)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<Xn)}set culling(e){!!(this.data&1<<Xn)!==e&&(this.data^=1<<Xn)}get depthTest(){return!!(this.data&1<<qn)}set depthTest(e){!!(this.data&1<<qn)!==e&&(this.data^=1<<qn)}get depthMask(){return!!(this.data&1<<Zn)}set depthMask(e){!!(this.data&1<<Zn)!==e&&(this.data^=1<<Zn)}get clockwiseFrontFace(){return!!(this.data&1<<Kn)}set clockwiseFrontFace(e){!!(this.data&1<<Kn)!==e&&(this.data^=1<<Kn)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=Pp[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}static for2d(){const e=new _e;return e.depthTest=!1,e.blend=!0,e}}var Ep=Object.defineProperty,ul=Object.getOwnPropertySymbols,Mp=Object.prototype.hasOwnProperty,Cp=Object.prototype.propertyIsEnumerable,cl=(r,e,t)=>e in r?Ep(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,dl=(r,e)=>{for(var t in e||(e={}))Mp.call(e,t)&&cl(r,t,e[t]);if(ul)for(var t of ul(e))Cp.call(e,t)&&cl(r,t,e[t]);return r};const fl=class extends Me{constructor(r){var e;r=dl(dl({},fl.defaultOptions),r),super({gpuProgram:r.gpuProgram,glProgram:r.glProgram,resources:r.resources}),this.enabled=!0,this._state=_e.for2d(),this.padding=r.padding,typeof r.antialias=="boolean"?this.antialias=r.antialias?"on":"off":this.antialias=(e=r.antialias)!=null?e:"inherit",this.resolution=r.resolution,this.blendRequired=r.blendRequired}apply(r,e,t,n){r.applyFilter(this,e,t,n)}get blendMode(){return this._state.blendMode}set blendMode(r){this._state.blendMode=r}};let ye=fl;ye.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"inherit",blendRequired:!1};function pl(r,{requestedPrecision:e,maxSupportedPrecision:t}){if(r.substring(0,9)!=="precision"){let n=e;if(e==="highp"&&t!=="highp"&&(n="mediump"),r.substring(0,8)!=="#version")return`precision ${n} float;
${r}`;const i=r.indexOf(`
`);return`${r.substring(0,i+1)}precision ${n} float;
${r.substring(i+1)}`}else if(t!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}const Ap={},Bp={};function ml(r,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const n=t?Ap:Bp;if(n[e]?(n[e]++,e+=`-${n[e]}`):n[e]=1,r.indexOf("#define SHADER_NAME")!==-1)return r;const i=`#define SHADER_NAME ${e}`;if(r.substring(0,8)!=="#version")return`${i}
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}${i}
${r.substring(s+1)}`}function gl(r,{version:e="300 es"}){return r.substring(0,8)==="#version"?r:`#version ${e}
${r}`}const Qn={ensurePrecision:pl,setProgramName:ml,setProgramVersion:gl},Nt=class{constructor({fragment:r,vertex:e,name:t}){const n={ensurePrecision:{requestedPrecision:"highp",maxSupportedPrecision:"highp"},setProgramName:{name:t},setProgramVersion:{version:"300 es"}};Object.keys(Qn).forEach(i=>{var s;const o=(s=n[i])!=null?s:{};r=Qn[i](r,o,!0),e=Qn[i](e,o,!1)}),this.fragment=r,this.vertex=e,this.key=`${this.vertex}:${this.fragment}`}destroy(){this.fragment=null,this.vertex=null,this.attributeData=null,this.uniformData=null,this.uniformBlockData=null,this.transformFeedbackVaryings=null}static from(r){const e=`${r.vertex}:${r.fragment}`;return Nt.programCached[e]||(Nt.programCached[e]=new Nt(r)),Nt.programCached[e]}};let xe=Nt;xe.programCached={};function vl(r){var e;const t=new RegExp("(?<!\\/\\/.*)@(group|binding)\\(\\d+\\)[^;]+;","g"),n=/@group\((\d+)\)/,i=/@binding\((\d+)\)/,s=/var(<[^>]+>)? (\w+)/,o=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,l=/(\w+)\s*:\s*([\w\<\>]+)/g,h=/struct\s+(\w+)/,u=(e=r.match(t))==null?void 0:e.map(d=>({group:parseInt(d.match(n)[1],10),binding:parseInt(d.match(i)[1],10),name:d.match(s)[2],isUniform:d.match(s)[1]==="<uniform>",type:d.match(o)[1]}));if(!u)return{groups:[],structs:[]};const c=r.match(a).map(d=>{const f=d.match(h)[1],p=d.match(l).reduce((g,m)=>{const[y,b]=m.split(":");return g[y.trim()]=b.trim(),g},{});return{name:f,members:p}}).filter(({name:d})=>u.some(f=>f.type===d));return{groups:u,structs:c}}var mt=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(mt||{});function bl({groups:r}){const e=[];for(let t=0;t<r.length;t++){const n=r[t];e[n.group]||(e[n.group]=[]),n.isUniform?e[n.group].push({binding:n.binding,visibility:mt.VERTEX|mt.FRAGMENT,buffer:{type:"uniform"}}):n.type==="sampler"?e[n.group].push({binding:n.binding,visibility:mt.FRAGMENT,sampler:{type:"filtering"}}):n.type==="texture_2d"&&e[n.group].push({binding:n.binding,visibility:mt.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function yl({groups:r}){const e=[];for(let t=0;t<r.length;t++){const n=r[t];e[n.group]||(e[n.group]={}),e[n.group][n.name]=n.binding}return e}const zt=class{constructor({fragment:r,vertex:e,compute:t,layout:n,gpuLayout:i}){this._layoutKey=0,this.fragment=r,this.vertex=e,this.compute=t;const s=vl(this.fragment.source);this.structsAndGroups=s,this.layout=n!=null?n:yl(s),this.gpuLayout=i!=null?i:bl(s)}destroy(){this._gpuLayout=null,this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null,this.compute=null}static from(r){const e=`${r.vertex.source}:${r.fragment.source}:${r.fragment.entryPoint}:${r.vertex.entryPoint}`;return zt.programCached[e]||(zt.programCached[e]=new zt(r)),zt.programCached[e]}};let ue=zt;ue.programCached={};let Rp=0;function Ke(){return Rp++}var kp=Object.defineProperty,xl=Object.getOwnPropertySymbols,Up=Object.prototype.hasOwnProperty,Gp=Object.prototype.propertyIsEnumerable,wl=(r,e,t)=>e in r?kp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,_l=(r,e)=>{for(var t in e||(e={}))Up.call(e,t)&&wl(r,t,e[t]);if(xl)for(var t of xl(e))Gp.call(e,t)&&wl(r,t,e[t]);return r};const Tl=class{constructor(r,e){this.uid=Ke(),this.resourceType="uniformGroup",this.resourceId=this.uid,this.isUniformGroup=!0,this.dirtyId=0;var t,n;e=_l(_l({},Tl.DEFAULT),e),this.uniformStructures=r;const i={};for(const s in r){const o=r[s];o.name=s,o.size=(t=o.size)!=null?t:1,i[s]=(n=o.value)!=null?n:o}this.uniforms=i,this.dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this.signature=Object.keys(i).map(s=>`${s}-${r[s].type}`).join("-")}update(){this.dirtyId++}};let Y=Tl;Y.DEFAULT={ubo:!1,isStatic:!1};var Sl=`
in vec2 vTextureCoord;
in vec4 vColor;

uniform vec4 inputSize;
uniform vec4 inputClamp;

out vec4 fragColor;

uniform vec2 uCenter;
uniform float uTime;
uniform float uSpeed;
uniform vec4 uWave;

uniform sampler2D myTexture;


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
            fragColor = texture(myTexture, vTextureCoord);
            return;
        }
        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);
    }

    vec2 dir = vec2(vTextureCoord - uCenter / inputSize.xy);
    dir.y *= inputSize.y / inputSize.x;
    float dist = length(dir);

    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {
        fragColor = texture(myTexture, vTextureCoord);
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
    vec4 color = texture(myTexture, clampedCoord);
    if (coord != clampedCoord) {
        color *= max(0.0, 1.0 - length(coord - clampedCoord));
    }

    // No clamp :
    // fragColor = texture(myTexture, vTextureCoord + offset);

    color.rgb *= 1.0 + (uBrightness - 1.0) * p * fade;

    fragColor = color;
}
`,Pl=`in vec2 aPosition;
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
`,Jn=`struct GlobalUniforms {
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
@group(1) @binding(1) var myTexture: texture_2d<f32>;
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

    var clampedColor: vec4<f32> = textureSample(myTexture, mySampler, clampedCoord);
    
    if (boolVec2(coord, clampedCoord)) 
    {
        clampedColor *= max(0.0, 1.0 - length(coord - clampedCoord));
    }
    // No clamp :
    return select(clampedColor * vec4<f32>(vec3<f32>(1.0 + (uBrightness - 1.0) * p * fade), clampedColor.a), textureSample(myTexture, mySampler, uv), returnColorOnly);
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
`,Ip=Object.defineProperty,El=Object.getOwnPropertySymbols,Fp=Object.prototype.hasOwnProperty,Op=Object.prototype.propertyIsEnumerable,Ml=(r,e,t)=>e in r?Ip(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Cl=(r,e)=>{for(var t in e||(e={}))Fp.call(e,t)&&Ml(r,t,e[t]);if(El)for(var t of El(e))Op.call(e,t)&&Ml(r,t,e[t]);return r};const Al=class extends ye{constructor(r={}){r=Cl(Cl({},Al.DEFAULT),r);const e=new ue({vertex:{source:Jn,entryPoint:"mainVertex"},fragment:{source:Jn,entryPoint:"mainFragment"}}),t=new xe({vertex:Pl,fragment:Sl,name:"shockwave-filter"});super({gpuProgram:e,glProgram:t,resources:{shockwaveUniforms:new Y({uTime:{value:0,type:"f32"},uCenter:{value:r.center,type:"vec2<f32>"},uSpeed:{value:r.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}})},resolution:1}),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,r)}apply(r,e,t,n){this.uniforms.uTime=this.time,r.applyFilter(this,e,t,n)}get center(){return this.uniforms.uCenter}set center(r){this.uniforms.uCenter=r}get centerX(){return this.uniforms.uCenter.x}set centerX(r){this.uniforms.uCenter.x=r}get centerY(){return this.uniforms.uCenter.y}set centerY(r){this.uniforms.uCenter.y=r}get speed(){return this.uniforms.uSpeed}set speed(r){this.uniforms.uSpeed=r}get amplitude(){return this.uniforms.uWave[0]}set amplitude(r){this.uniforms.uWave[0]=r}get wavelength(){return this.uniforms.uWave[1]}set wavelength(r){this.uniforms.uWave[1]=r}get brightness(){return this.uniforms.uWave[2]}set brightness(r){this.uniforms.uWave[2]=r}get radius(){return this.uniforms.uWave[3]}set radius(r){this.uniforms.uWave[3]=r}};let Bl=Al;Bl.DEFAULT={center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1};function Ze(r){return r+=r===0?1:0,--r,r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r+1}function Lp(r){return!(r&r-1)&&!!r}function Dp(r){let e=(r>65535?1:0)<<4;r>>>=e;let t=(r>255?1:0)<<3;return r>>>=t,e|=t,t=(r>15?1:0)<<2,r>>>=t,e|=t,t=(r>3?1:0)<<1,r>>>=t,e|=t,e|r>>1}class oo{constructor(e=0,t=0,n=0,i=0,s=0,o=0){this.type="triangle",this.x=e,this.y=t,this.x2=n,this.y2=i,this.x3=s,this.y3=o}contains(e,t){const n=(this.x-this.x3)*(t-this.y3)-(this.y-this.y3)*(e-this.x3),i=(this.x2-this.x)*(t-this.y)-(this.y2-this.y)*(e-this.x);if(n<0!=i<0&&n!==0&&i!==0)return!1;const s=(this.x3-this.x2)*(t-this.y2)-(this.y3-this.y2)*(e-this.x2);return s===0||s<0==n+i<=0}clone(){return new oo(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e=e||new q;const t=Math.min(this.x,this.x2,this.x3),n=Math.max(this.x,this.x2,this.x3),i=Math.min(this.y,this.y2,this.y3),s=Math.max(this.y,this.y2,this.y3);return e.x=t,e.y=i,e.width=n-t,e.height=s-i,e}}let $p=0;class se extends re{constructor({data:e,size:t,usage:n,label:i}){super(),this.resourceType="buffer",this.resourceId=Ke(),this.uid=$p++,this._updateID=1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,t=t!=null?t:e==null?void 0:e.byteLength;const s=!!e;this.descriptor={size:t,usage:n,mappedAtCreation:s,label:i}}get data(){return this._data}set data(e){if(this._data!==e){const t=this._data;this._data=e,t.length!==e.length?(this.descriptor.size=e.byteLength,this.resourceId=Ke(),this.emit("change",this)):this.emit("update",this)}}update(e){this._updateSize=e||this.descriptor.size,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}var D=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))(D||{});function ei(r,e){if(!(r instanceof se)){let t=e?D.INDEX:D.VERTEX;r instanceof Array&&(e?(r=new Uint32Array(r),t=D.INDEX|D.COPY_DST):(r=new Float32Array(r),t=D.VERTEX|D.COPY_DST)),r=new se({data:r,label:"index-mesh-buffer",usage:t})}return r}let Np=1;class Wt extends re{constructor({attributes:e,indexBuffer:t,topology:n}){super(),this.uid=Np++,this._layoutKey=0,this.tick=0,this.attributes=e,this.buffers=[];for(const i in e){const s=e[i];s.buffer=ei(s.buffer,!1),this.buffers.indexOf(s.buffer)===-1&&(this.buffers.push(s.buffer),s.buffer.on("update",this.onBufferUpdate,this))}t&&(this.indexBuffer=ei(t,!0),this.buffers.push(this.indexBuffer)),this.topology=n||"triangle-list"}setBufferAtIndex(e,t){const n=this.buffers[t];n.off("update",this.onBufferUpdate,this),e.on("update",this.onBufferUpdate,this),this.buffers[t]=e;for(const i in this.attributes){const s=this.attributes[i];s.buffer===n&&(s.buffer=e)}}onBufferUpdate(){this.tick=this.tick++,this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const t=this.attributes[e];return this.getBuffer(e).data.length/(t.stride/4||t.size)}return 0}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(t=>t.destroy()),this.attributes=null,this.buffers=null}}var zp=Object.defineProperty,Rl=Object.getOwnPropertySymbols,Wp=Object.prototype.hasOwnProperty,Hp=Object.prototype.propertyIsEnumerable,kl=(r,e,t)=>e in r?zp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ul=(r,e)=>{for(var t in e||(e={}))Wp.call(e,t)&&kl(r,t,e[t]);if(Rl)for(var t of Rl(e))Hp.call(e,t)&&kl(r,t,e[t]);return r};const Gl=class extends Wt{constructor(r={}){r=Ul(Ul({},Gl.defaultOptions),r);const e=r.positions||new Float32Array([0,0,1,0,1,1,0,1]),t=r.uvs||new Float32Array([0,0,1,0,1,1,0,1]),n=r.indices||new Uint32Array([0,1,2,0,2,3]),i=new se({data:e,label:"attribute-mesh-positions",usage:D.VERTEX|D.COPY_DST}),s=new se({data:t,label:"attribute-mesh-uvs",usage:D.VERTEX|D.COPY_DST}),o=new se({data:n,label:"index-mesh-buffer",usage:D.INDEX|D.COPY_DST});super({attributes:{aPosition:{buffer:i,shaderLocation:0,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:s,shaderLocation:1,format:"float32x2",stride:2*4,offset:0}},indexBuffer:o,topology:r.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(r){this.attributes.aPosition.buffer.data=r}get uvs(){return this.attributes.aUV.buffer.data}set uvs(r){this.attributes.aUV.buffer.data=r}get indices(){return this.indexBuffer.data}set indices(r){this.indexBuffer.data=r}};let Ht=Gl;Ht.defaultOptions={topology:"triangle-list"};var Vp=Object.defineProperty,Il=Object.getOwnPropertySymbols,jp=Object.prototype.hasOwnProperty,Yp=Object.prototype.propertyIsEnumerable,Fl=(r,e,t)=>e in r?Vp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ol=(r,e)=>{for(var t in e||(e={}))jp.call(e,t)&&Fl(r,t,e[t]);if(Il)for(var t of Il(e))Yp.call(e,t)&&Fl(r,t,e[t]);return r};const Ll=class extends Ht{constructor(r={}){super({}),this.build(r)}build(r){var e,t,n,i;r=Ol(Ol({},Ll.defaultOptions),r),this.verticesX=(e=this.verticesX)!=null?e:r.verticesX,this.verticesY=(t=this.verticesY)!=null?t:r.verticesY,this.width=(n=this.width)!=null?n:r.width,this.height=(i=this.height)!=null?i:r.height;const s=this.verticesX*this.verticesY,o=[],a=[],l=[],h=this.verticesX-1,u=this.verticesY-1,c=this.width/h,d=this.height/u;for(let p=0;p<s;p++){const g=p%this.verticesX,m=p/this.verticesX|0;o.push(g*c,m*d),a.push(g/h,m/u)}const f=h*u;for(let p=0;p<f;p++){const g=p%h,m=p/h|0,y=m*this.verticesX+g,b=m*this.verticesX+g+1,v=(m+1)*this.verticesX+g,w=(m+1)*this.verticesX+g+1;l.push(y,b,v,b,w,v)}this.buffers[0].data=new Float32Array(o),this.buffers[1].data=new Float32Array(a),this.indexBuffer.data=new Uint32Array(l),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};let ti=Ll;ti.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};var Xp=Object.defineProperty,Dl=Object.getOwnPropertySymbols,qp=Object.prototype.hasOwnProperty,Kp=Object.prototype.propertyIsEnumerable,$l=(r,e,t)=>e in r?Xp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Nl=(r,e)=>{for(var t in e||(e={}))qp.call(e,t)&&$l(r,t,e[t]);if(Dl)for(var t of Dl(e))Kp.call(e,t)&&$l(r,t,e[t]);return r};const zl=class extends ti{constructor(r){r=Nl(Nl({},zl.defaultOptions),r),super({width:r.width,height:r.height,verticesX:4,verticesY:4}),this._textureMatrix=new B,this.update(r)}update(r){this.updateUvs(r),this.updatePositions(r)}updatePositions(r){var e,t,n,i,s,o;this.width=(e=r.width)!=null?e:this.width,this.height=(t=r.height)!=null?t:this.height,this._leftWidth=(n=r.leftWidth)!=null?n:this._leftWidth,this._rightWidth=(i=r.rightWidth)!=null?i:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight;const a=this.positions,l=this._leftWidth+this._rightWidth,h=this.width>l?1:this.width/l,u=this._topHeight+this._bottomHeight,c=this.height>u?1:this.height/u,d=Math.min(h,c);a[9]=a[11]=a[13]=a[15]=this._topHeight*d,a[17]=a[19]=a[21]=a[23]=this.height-this._bottomHeight*d,a[25]=a[27]=a[29]=a[31]=this.height,a[2]=a[10]=a[18]=a[26]=this._leftWidth*d,a[4]=a[12]=a[20]=a[28]=this.width-this._rightWidth*d,a[6]=a[14]=a[22]=a[30]=this.width,this.getBuffer("aPosition").update()}updateUvs(r){var e,t,n,i,s,o;this._originalWidth=(e=r.originalWidth)!=null?e:this._originalWidth,this._originalHeight=(t=r.originalHeight)!=null?t:this._originalHeight,this._leftWidth=(n=r.leftWidth)!=null?n:this._leftWidth,this._rightWidth=(i=r.rightWidth)!=null?i:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight,r.textureMatrix&&this._textureMatrix.copyFrom(r.textureMatrix);const a=this._textureMatrix,l=this.uvs;l[0]=l[8]=l[16]=l[24]=0,l[1]=l[3]=l[5]=l[7]=0,l[6]=l[14]=l[22]=l[30]=1,l[25]=l[27]=l[29]=l[31]=1;const h=1/this._originalWidth,u=1/this._originalHeight;l[2]=l[10]=l[18]=l[26]=h*this._leftWidth,l[9]=l[11]=l[13]=l[15]=u*this._topHeight,l[4]=l[12]=l[20]=l[28]=1-h*this._rightWidth,l[17]=l[19]=l[21]=l[23]=1-u*this._bottomHeight,Zp(a,l),this.getBuffer("aUV").update()}};let ri=zl;ri.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};function Zp(r,e,t){t!=null||(t=e);const n=r.a,i=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty;for(let h=0;h<e.length;h+=2){const u=e[h],c=e[h+1];t[h]=u*n+c*s+a,t[h+1]=u*i+c*o+l}return t}let Qp=0;const Wl=new rt;class Vt{constructor(e){this.uid=Qp++,this.type="mesh",this.canBundle=!0,this.owner=ft,this.shader=e.shader,e.texture&&(this.texture=e.texture),this._geometry=e.geometry,this._geometry.on("update",this.onGeometryUpdate,this)}set shader(e){this._shader!==e&&(this._shader=e,this.onUpdate())}get shader(){return this._shader}set geometry(e){var t;this._geometry!==e&&((t=this._geometry)==null||t.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._geometry=e,this.onUpdate())}get geometry(){return this._geometry}set texture(e){this._texture!==e&&(this.shader&&(this.shader.resources.uTexture=e.source,this.shader.resources.uSampler=e.style),this._texture=e,this.onUpdate())}get texture(){return this._texture}addBounds(e){e.addVertexData(this.geometry.positions,0,this.geometry.positions.length)}containsPoint(e){const{x:t,y:n}=e,i=this.geometry.getBuffer("aPosition").data,s=Wl.points,o=this.geometry.getIndex().data,a=o.length,l=this.geometry.topology==="triangle-strip"?3:1;for(let h=0;h+2<a;h+=l){const u=o[h]*2,c=o[h+1]*2,d=o[h+2]*2;if(s[0]=i[u],s[1]=i[u+1],s[2]=i[c],s[3]=i[c+1],s[4]=i[d],s[5]=i[d+1],Wl.contains(t,n))return!0}return!1}get batched(){return this._shader?!1:this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch"}destroy(e=!1){if(typeof e=="boolean"?e:e!=null&&e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._geometry=null,this._shader=null}onGeometryUpdate(){this.onUpdate()}onUpdate(){this.owner.onViewUpdate()}}const Hl={};function ni(r,e,t=3){if(Hl[e])return;let n=new Error().stack;typeof n=="undefined"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`):(n=n.split(`
`).splice(t).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${r}`),console.warn(n),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`),console.warn(n))),Hl[e]=!0}var Jp=Object.defineProperty,Vl=Object.getOwnPropertySymbols,em=Object.prototype.hasOwnProperty,tm=Object.prototype.propertyIsEnumerable,jl=(r,e,t)=>e in r?Jp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ii=(r,e)=>{for(var t in e||(e={}))em.call(e,t)&&jl(r,t,e[t]);if(Vl)for(var t of Vl(e))tm.call(e,t)&&jl(r,t,e[t]);return r};const Yl=class extends Q{constructor(r){r instanceof k&&(r={texture:r}),r=ii(ii({},Yl.defaultOptions),r);const e=r.texture,t=new ri({width:e.width,height:e.height,originalWidth:e.width,originalHeight:e.height,leftWidth:r.leftWidth,topHeight:r.topHeight,rightWidth:r.rightWidth,bottomHeight:r.bottomHeight,textureMatrix:e.textureMatrix.mapCoord});super(ii({view:new Vt({geometry:t,texture:e}),label:"NineSlicePlane"},r))}get width(){return this.view.geometry.width}set width(r){this.view.geometry.updatePositions({width:r})}get height(){return this.view.geometry.height}set height(r){this.view.geometry.updatePositions({height:r})}get leftWidth(){return this.view.geometry._leftWidth}set leftWidth(r){this.view.geometry.updateUvs({leftWidth:r})}get topHeight(){return this.view.geometry._topHeight}set topHeight(r){this.view.geometry.updateUvs({topHeight:r})}get rightWidth(){return this.view.geometry._rightWidth}set rightWidth(r){this.view.geometry.updateUvs({rightWidth:r})}get bottomHeight(){return this.view.geometry._bottomHeight}set bottomHeight(r){this.view.geometry.updateUvs({bottomHeight:r})}get texture(){return this.view.texture}set texture(r){r!==this.view.texture&&(this.view.geometry.updateUvs({originalWidth:r.width,originalHeight:r.height,textureMatrix:r.textureMatrix.mapCoord}),this.view.texture=r)}};let si=Yl;si.defaultOptions={texture:k.EMPTY,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10};class rm extends si{constructor(e){ni("v8","NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(e)}}function Er({vertexSrc:r,fragmentSrc:e,maxTextures:t,name:n}){if(e.indexOf("%count%")<0)throw new Error('Fragment template must contain "%count%".');if(e.indexOf("%forloop%")<0)throw new Error('Fragment template must contain "%forloop%".');const i=nm(t);return e=e.replace(/%count%/gi,`${t}`),e=e.replace(/%forloop%/gi,i),n=n?`${n}-`:"",new xe({vertex:r,fragment:e,name:`${n}batch`})}function nm(r){const e=[];for(let t=0;t<r;t++)t>0&&e.push("else"),t<r-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uSamplers[${t}], vTextureCoord);`),e.push("}");return e.join(`
`)}var Xl=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,ql=`precision highp float;
in vec2 aPosition;
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
`;function Kl(r){return Er({vertexSrc:ql,fragmentSrc:Xl,maxTextures:r,name:"default"})}const ce=16,Zl=new Int32Array(ce);for(let r=0;r<ce;r++)Zl[r]=r;const Mr=new Y({uSamplers:{value:Zl,type:`array<u32,${ce}>`}},{isStatic:!0});class oi{constructor(){this.didUpload=!1}init(){const e=new Y({tint:{value:new Float32Array([1,1,1,1]),type:"f32"},translationMatrix:{value:new B,type:"mat3x3<f32>"}});this.shader=new Me({glProgram:Kl(ce),resources:{uniforms:e,batchSamplers:Mr}})}execute(e,t){const n=e.renderer;e.state.blendMode=t.blendMode,n.state.set(e.state),n.shader.bind(this.shader,this.didUpload),this.didUpload=!0;const i=t.batchParent;n.geometry.bind(i.geometry,this.shader.glProgram);for(let s=0;s<t.textures.textures.length;s++)n.texture.bind(t.textures.textures[s],s);n.shader.bindUniformBlock(n.globalUniforms.uniformGroup,"globalUniforms",0),n.geometry.draw("triangle-list",t.size,t.start)}destroy(){this.shader.destroy(!0),this.shader=null}}oi.extension={type:[x.WebGLPipesAdaptor],name:"batch"};const Ql=new Float32Array(1),Jl=new Uint32Array(1);class eh extends Wt{constructor(){const e=new se({data:Ql,label:"attribute-batch-buffer",usage:D.VERTEX|D.COPY_DST}),t=new se({data:Jl,label:"index-batch-buffer",usage:D.INDEX|D.COPY_DST}),n=6*4;super({attributes:{aPosition:{buffer:e,shaderLocation:0,format:"float32x2",stride:n,offset:0},aUV:{buffer:e,shaderLocation:1,format:"float32x2",stride:n,offset:2*4},aColor:{buffer:e,shaderLocation:2,format:"unorm8x4",stride:n,offset:4*4},aTextureId:{buffer:e,shaderLocation:3,format:"float32",stride:n,offset:5*4}},indexBuffer:t})}reset(){this.indexBuffer.data=Jl,this.buffers[0].data=Ql}}function Cr({vertex:r,fragment:e,maxTextures:t}){if(e.source.indexOf("%bindings%")<0)throw new Error('Fragment template must contain "%bindings%".');if(e.source.indexOf("%forloop%")<0)throw new Error('Fragment template must contain "%forloop%".');const n=rh(t),i=th(t);let s=e.source;s=s.replace(/%bindings%/gi,n),s=s.replace(/%forloop%/gi,i);let o=r.source;return o===e.source&&(o=s),new ue({vertex:{source:o,entryPoint:r.entryPoint},fragment:{source:s,entryPoint:e.entryPoint}})}function im(r){const e={};let t=0;for(let n=0;n<r;n++)e[`textureSource${n+1}`]=t++,e[`textureSampler${n+1}`]=t++;return e}function sm(r){const e=[];let t=0;for(let n=0;n<r;n++)e[t]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:t,visibility:GPUShaderStage.FRAGMENT},t++,e[t]={sampler:{type:"filtering"},binding:t,visibility:GPUShaderStage.FRAGMENT},t++;return e}function th(r){const e=[];if(r===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, uv, uvDx, uvDy);");else{e.push("switch textureId {");for(let t=0;t<r;t++)t===r-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, uv, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function rh(r){const e=[];if(r===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let n=0;n<r;n++)e.push(`@group(1) @binding(${t++}) var textureSource${n+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${n+1}: sampler;`)}return e.join(`
`)}var ai=`struct GlobalUniforms {
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
`;function nh(r){return Cr({vertex:{source:ai,entryPoint:"mainVertex"},fragment:{source:ai,entryPoint:"mainFragment"},maxTextures:r})}const om=new Float32Array(1),am=new Uint32Array(1);function ih(){const r=new se({data:om,label:"attribute-batch-buffer",usage:D.VERTEX|D.COPY_DST}),e=new se({data:am,label:"index-batch-buffer",usage:D.INDEX|D.COPY_DST}),t=6*4;return new Wt({attributes:{aPosition:{buffer:r,shaderLocation:0,format:"float32x2",stride:t,offset:0},aUV:{buffer:r,shaderLocation:1,format:"float32x2",stride:t,offset:2*4},aColor:{buffer:r,shaderLocation:2,format:"unorm8x4",stride:t,offset:4*4},aTextureId:{buffer:r,shaderLocation:3,format:"float32",stride:t,offset:5*4}},indexBuffer:e})}const sh={};function li(r){const e=r.map(t=>t.styleSourceKey).join("-");return sh[e]||lm(r,e)}function lm(r,e){const t={};let n=0;for(let s=0;s<ce;s++){const o=s<r.length?r[s]:k.EMPTY.source;t[n++]=o.source,t[n++]=o.style}const i=new be(t);return sh[e]=i,i}class hi{init(){this.shader=new Me({gpuProgram:nh(ce),groups:{}})}execute(e,t){e.state.blendMode=t.blendMode,t.textures.bindGroup||(t.textures.bindGroup=li(t.textures.textures));const n=this.shader.gpuProgram,i=e.renderer.encoder,s=e.renderer.globalUniforms.bindGroup;this.shader.groups[1]=t.textures.bindGroup;const o=t.batchParent;i.setPipelineFromGeometryProgramAndState(o.geometry,n,e.state),i.setGeometry(o.geometry),i.setBindGroup(0,s,n),i.setBindGroup(1,t.textures.bindGroup,n),i.renderPassEncoder.drawIndexed(t.size,1,t.start)}destroy(){this.shader.destroy(!0),this.shader=null}}hi.extension={type:[x.WebGPUPipesAdaptor],name:"batch"};class ui{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function Ar(r,e){const t=r.byteLength/8|0,n=new Float64Array(r,0,t),i=new Float64Array(e,0,t);for(let a=0;a<t;a++)i[a]=n[a];const s=new Uint8Array(r,t*8),o=new Uint8Array(e,t*8);for(let a=0;a<s.length;a++)o[a]=s[a]}const ci=[];let Br=0;const oh=[];let Rr=0;const kr={};function ah(r,e,t,n){Br=0,Rr=0;const i=16,s=r.textures,o=e.textures,a=oh;for(let h=0;h<o.length;h++)a[h]=o[h],Rr++;for(let h=0;h<s.length;h++)o[h]=s[h];const l=e.batchLocations;for(let h=0;h<Rr;h++){const u=a[h];let c=!1;for(let d=0;d<s.length;d++)if(u===s[d]){c=!0,kr[h]=t,l[u.styleSourceKey]=d;break}c||(ci[Br++]=a[h])}for(let h=0;h<Br;h++){const u=ci[h];for(let c=0;c<i;c++){const d=(c+n)%16;if(kr[d]!==t){o[d]=u,kr[d]=t,l[u.styleSourceKey]=d;break}}}return e}const hm=[];let di=0;class lh{constructor(){this.textures=[],this.size=0,this.batchLocations={}}}class hh{constructor(){this.textureTicks={},this.tick=1e3}begin(){di=0,this.bindingOffset=0,this.reset()}reset(){this.tick++,this.output=hm[di++]||new lh,this.output.size=0}finish(e){let t=this.output;return e&&e.textures.length&&t.textures.length&&(t=ah(e,t,this.tick,this.bindingOffset++)),this.reset(),t}add(e){const t=this.tick,n=this.textureTicks;if(n[e.styleSourceKey]===t)return!0;const i=e.styleSourceKey,s=this.output;return s.size===ce?!1:(s.textures[s.size]=e,n[i]=t,s.batchLocations[i]=s.size++,di=0,!0)}destroy(){this.output=null,this.textureTicks=null}}class fi{constructor(){this.type="batch",this.action="renderer",this.elementStart=0,this.elementSize=0,this.start=0,this.size=0,this.canBundle=!0}destroy(){this.textures=null,this.batchParent=null}}class pi{constructor(e=4,t=6){this.maxSize=4096*20,this.dirty=!0,this.batchIndex=0,this.batches=[],this.vertexSize=6,this.textureBatcher=new hh,this.elements=[],this.attributeBuffer=new ui(e*this.vertexSize*4),this.indexBuffer=new Uint32Array(t)}begin(){this.batchIndex=0,this.currentBlendMode="inherit";let e=this.batches[this.batchIndex];e||(e=this.batches[this.batchIndex]=new fi),e.elementSize=0,e.start=0,e.size=0,this.attributeSize=0,this.indexSize=0,this.elementSize=0,this.textureBatcher.begin(),this.dirty=!0}add(e){let t=this.batches[this.batchIndex];const n=e.texture,i=e.blendMode;(this.currentBlendMode!==i||t.elementSize>=this.maxSize||!this.textureBatcher.add(n))&&(this.break(!1),this.currentBlendMode=i,t=this.batches[this.batchIndex],t.blendMode=i,this.textureBatcher.add(n)),t.elementSize++,e.batcher=this,e.batch=t,e.location=this.attributeSize,e.indexStart=this.indexSize,this.indexSize+=e.indexSize,this.attributeSize+=e.vertexSize*this.vertexSize,this.elements[this.elementSize++]=e}checkAndUpdateTexture(e,t){const n=e.batch.textures.batchLocations[t.styleSourceKey];return n===void 0?!1:(e.textureId=n,e.texture=t,!0)}updateElement(e){this.dirty=!0,e.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,e.location,e.textureId)}hideElement(e){this.dirty=!0;const t=this.attributeBuffer.float32View;let n=e.location;for(let i=0;i<e.vertexSize;i++)t[n]=0,t[n+1]=0,n+=6}break(e){if(this.elementSize===0)return;let t;this.batchIndex>0&&(t=this.batches[this.batchIndex-1]),this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const n=this.batches[this.batchIndex];n.size=this.indexSize-n.start,!e&&t?n.textures=this.textureBatcher.finish(t.textures):n.textures=this.textureBatcher.finish();const i=this.elementSize-n.elementStart;for(let o=0;o<i;o++){const a=this.elements[n.elementStart+o];a.textureId=n.textures.batchLocations[a.texture.styleSourceKey],a.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,a.location,a.textureId),a.packIndex(this.indexBuffer,a.indexStart,a.location/this.vertexSize)}this.batchIndex++;let s=this.batches[this.batchIndex];s||(s=this.batches[this.batchIndex]=new fi),s.blendMode=this.currentBlendMode,s.elementStart=this.elementSize,s.elementSize=0,s.start=this.indexSize}finish(){if(this.break(!1),this.elementSize===0)return;const e=this.batches[this.batchIndex];if(e.size=this.indexSize-e.start,this.batchIndex>0){const t=this.batches[this.batchIndex-1];e.textures=this.textureBatcher.finish(t.textures);return}e.textures=this.textureBatcher.finish()}update(){}ensureAttributeBuffer(e){e*4<this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const t=Math.max(e,this.attributeBuffer.size*2),n=new ui(t);Ar(this.attributeBuffer.rawBinaryData,n.rawBinaryData),this.attributeBuffer=n}_resizeIndexBuffer(e){const t=this.indexBuffer,n=Math.max(e,t.length*2),i=new Uint32Array(n);Ar(t.buffer,i.buffer),this.indexBuffer=i}destroy(){for(let e=0;e<this.batches.length;e++)this.batches[e].destroy();this.batches=null;for(let e=0;e<this.elements.length;e++)this.elements[e].batch=null;this.elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null,this.textureBatcher.destroy(),this.boundTextures=null}}class mi{constructor(e,t){this.toUpdate=[],this.state=_e.for2d(),this._batches={},this.renderer=e,this.adaptor=t,this.adaptor.init()}buildStart(e){this.lastBatch=0,this._batches[e.uid]||(this._batches[e.uid]={batcher:new pi,geometry:ih()}),this._batches[e.uid].batcher.begin()}addToBatch(e,t){this._batches[t.uid].batcher.add(e)}break(e){const t=this._batches[e.uid].batcher,n=e.instructionSize>0&&e.lastInstruction().type!=="batch";for(t.break(n);this.lastBatch<t.batchIndex;){const i=t.batches[this.lastBatch++];i.elementSize!==0&&(i.batchParent=this._batches[e.uid],e.instructions[e.instructionSize++]=i)}}buildEnd(e){this.break(e);const{geometry:t,batcher:n}=this._batches[e.uid];n.elementSize!==0&&(n.finish(),t.indexBuffer.data=n.indexBuffer,t.buffers[0].data=n.attributeBuffer.float32View,t.indexBuffer.update(n.indexSize*4))}upload(e){const t=this._batches[e.uid];if(t&&t.batcher.dirty){t.batcher.dirty=!1;const n=t.geometry.buffers[0];n.update(t.batcher.attributeSize*4),this.renderer.buffer.updateBuffer(n)}}execute(e){this.adaptor.execute(this,e)}destroy(){this.toUpdate=null,this.instructionSet=null,this.activeBatcher=null,this.state=null,this._batches=null,this.renderer=null,this.adaptor.destroy(),this.adaptor=null;for(const e in this._batches){const t=this._batches[e];t.batcher.destroy(),t.geometry.destroy()}}}mi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"batch"};var gi=`struct GlobalUniforms {
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
}`,um=Object.defineProperty,uh=Object.getOwnPropertySymbols,cm=Object.prototype.hasOwnProperty,dm=Object.prototype.propertyIsEnumerable,ch=(r,e,t)=>e in r?um(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,dh=(r,e)=>{for(var t in e||(e={}))cm.call(e,t)&&ch(r,t,e[t]);if(uh)for(var t of uh(e))dm.call(e,t)&&ch(r,t,e[t]);return r};const fh=class extends ye{constructor(r){r=dh(dh({},fh.DEFAULT_OPTIONS),r);const e=new ue({vertex:{source:gi,entryPoint:"mainVertex"},fragment:{source:gi,entryPoint:"mainFragment"}}),t=new Y({uAlpha:{value:r.alpha,type:"f32"}});super({gpuProgram:e,resources:{filterUniforms:t}})}get alpha(){return this.resources.filterUniforms.uniforms.uAlpha}set alpha(r){this.resources.filterUniforms.uniforms.uAlpha=r}};let ph=fh;ph.DEFAULT_OPTIONS={alpha:1};var mh=`
in vec2 vTextureCoord;
in vec2 backgroundUv;
in vec4 vColor;

out vec4 fragColor;

uniform float uBlend;

uniform sampler2D myTexture;
uniform sampler2D backTexture;

{FUNCTIONS}

void main()
{ 
    vec4 back = texture(backTexture, backgroundUv);
    vec4 front = texture(myTexture, vTextureCoord);

    {MAIN}
}
`,gh=`in vec2 aPosition;
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

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (outputFrame.zw * inputSize.zw);
}

vec2 filterBackgroundTextureCoord( void ) 
{
    return aPosition * aPosition * backgroundFrame.zw;
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
    backgroundUv = filterBackgroundTextureCoord();
}
`,vh=`struct GlobalUniforms {
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

struct BlendUniforms {
  uBlend:f32,
};

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;

@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(1) @binding(1) var myTexture: texture_2d<f32>;
@group(1) @binding(2) var mySampler : sampler;
@group(1) @binding(3) var backTexture: texture_2d<f32>;

@group(2) @binding(0) var<uniform> blendUniforms : BlendUniforms;


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
    return aPosition * aPosition * gfu.backgroundFrame.zw;
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
   filterTextureCoord(aPosition),
   filterBackgroundTextureCoord(aPosition),
  );
}

{FUNCTIONS}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) backgroundUv: vec2<f32>,
) -> @location(0) vec4<f32> {


   var back =  textureSample(backTexture, mySampler, backgroundUv);
   var front = textureSample(myTexture, mySampler, uv);
   
   var out = vec4<f32>(0.0,0.0,0.0,0.0);

   {MAIN}

   return out;
}`,fm=Object.defineProperty,bh=Object.getOwnPropertySymbols,pm=Object.prototype.hasOwnProperty,mm=Object.prototype.propertyIsEnumerable,yh=(r,e,t)=>e in r?fm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,xh=(r,e)=>{for(var t in e||(e={}))pm.call(e,t)&&yh(r,t,e[t]);if(bh)for(var t of bh(e))mm.call(e,t)&&yh(r,t,e[t]);return r};class X extends ye{constructor(e){const t=e.gpu,n=wh(xh({source:vh},t)),i=new ue({vertex:{source:n,entryPoint:"mainVertex"},fragment:{source:n,entryPoint:"mainFragment"}}),s=e.gl,o=wh(xh({source:mh},s)),a=new xe({vertex:gh,fragment:o}),l=new Y({uBlend:{value:1,type:"f32"}});super({gpuProgram:i,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,backTexture:k.EMPTY}})}}function wh(r){const{source:e,functions:t,main:n}=r;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",n)}const Ur=`
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
    `,Gr=`
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
	`;var vi=`struct GlobalUniforms {
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

struct ColorMatrixUniforms {
  uColorMatrix:array<vec4<f32>, 5>,
  uAlpha:f32,
};

@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;

@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(1) @binding(1) var myTexture: texture_2d<f32>;
@group(1) @binding(2) var mySampler : sampler;
@group(1) @binding(3) var backTexture: texture_2d<f32>;
@group(2) @binding(0) var<uniform> colorMatrixUniforms : ColorMatrixUniforms;


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


  var c = textureSample(myTexture, mySampler, uv);
  
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
}`;class gm extends ye{constructor(){const e=new Y({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"vec4<f32>",size:5},uAlpha:{value:1,type:"f32"}}),t=new ue({vertex:{source:vi,entryPoint:"mainVertex"},fragment:{source:vi,entryPoint:"mainFragment"}});super({gpuProgram:t,resources:{colorMatrixUniforms:e}}),this.alpha=1}_loadMatrix(e,t=!1){let n=e;t&&(this._multiply(n,this.matrix,e),n=this._colorMatrix(n)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=n,this.resources.colorMatrixUniforms.update()}_multiply(e,t,n){return e[0]=t[0]*n[0]+t[1]*n[5]+t[2]*n[10]+t[3]*n[15],e[1]=t[0]*n[1]+t[1]*n[6]+t[2]*n[11]+t[3]*n[16],e[2]=t[0]*n[2]+t[1]*n[7]+t[2]*n[12]+t[3]*n[17],e[3]=t[0]*n[3]+t[1]*n[8]+t[2]*n[13]+t[3]*n[18],e[4]=t[0]*n[4]+t[1]*n[9]+t[2]*n[14]+t[3]*n[19]+t[4],e[5]=t[5]*n[0]+t[6]*n[5]+t[7]*n[10]+t[8]*n[15],e[6]=t[5]*n[1]+t[6]*n[6]+t[7]*n[11]+t[8]*n[16],e[7]=t[5]*n[2]+t[6]*n[7]+t[7]*n[12]+t[8]*n[17],e[8]=t[5]*n[3]+t[6]*n[8]+t[7]*n[13]+t[8]*n[18],e[9]=t[5]*n[4]+t[6]*n[9]+t[7]*n[14]+t[8]*n[19]+t[9],e[10]=t[10]*n[0]+t[11]*n[5]+t[12]*n[10]+t[13]*n[15],e[11]=t[10]*n[1]+t[11]*n[6]+t[12]*n[11]+t[13]*n[16],e[12]=t[10]*n[2]+t[11]*n[7]+t[12]*n[12]+t[13]*n[17],e[13]=t[10]*n[3]+t[11]*n[8]+t[12]*n[13]+t[13]*n[18],e[14]=t[10]*n[4]+t[11]*n[9]+t[12]*n[14]+t[13]*n[19]+t[14],e[15]=t[15]*n[0]+t[16]*n[5]+t[17]*n[10]+t[18]*n[15],e[16]=t[15]*n[1]+t[16]*n[6]+t[17]*n[11]+t[18]*n[16],e[17]=t[15]*n[2]+t[16]*n[7]+t[17]*n[12]+t[18]*n[17],e[18]=t[15]*n[3]+t[16]*n[8]+t[17]*n[13]+t[18]*n[18],e[19]=t[15]*n[4]+t[16]*n[9]+t[17]*n[14]+t[18]*n[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const n=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}tint(e,t){const n=e>>16&255,i=e>>8&255,s=e&255,o=[n/255,0,0,0,0,0,i/255,0,0,0,0,0,s/255,0,0,0,0,0,1,0];this._loadMatrix(o,t)}greyscale(e,t){const n=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const n=Math.cos(e),i=Math.sin(e),s=Math.sqrt,o=1/3,a=s(o),l=n+(1-n)*o,h=o*(1-n)-a*i,u=o*(1-n)+a*i,c=o*(1-n)+a*i,d=n+o*(1-n),f=o*(1-n)-a*i,p=o*(1-n)-a*i,g=o*(1-n)+a*i,m=n+o*(1-n),y=[l,h,u,0,0,c,d,f,0,0,p,g,m,0,0,0,0,0,1,0];this._loadMatrix(y,t)}contrast(e,t){const n=(e||0)+1,i=-.5*(n-1),s=[n,0,0,0,i,0,n,0,0,i,0,0,n,0,i,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const n=e*2/3+1,i=(n-1)*-.5,s=[n,i,i,0,0,i,n,i,0,0,i,i,n,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,n,i,s){e=e||.2,t=t||.15,n=n||16770432,i=i||3375104;const o=(n>>16&255)/255,a=(n>>8&255)/255,l=(n&255)/255,h=(i>>16&255)/255,u=(i>>8&255)/255,c=(i&255)/255,d=[.3,.59,.11,0,0,o,a,l,e,0,h,u,c,t,0,o-h,a-u,l-c,0,0];this._loadMatrix(d,s)}night(e,t){e=e||.1;const n=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(n,t)}predator(e,t){const n=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(n,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}var bi=`struct GlobalUniforms {
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

struct DisplacementUniforms {
  filterMatrix:mat3x3<f32>,
  scale:vec2<f32>,
  rotation:mat2x2<f32>
};



@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;

@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(1) @binding(1) var myTexture: texture_2d<f32>;
@group(1) @binding(2) var mySampler : sampler;
@group(1) @binding(3) var backTexture: texture_2d<f32>;

@group(2) @binding(0) var<uniform> filterUniforms : DisplacementUniforms;
@group(2) @binding(1) var mapTexture: texture_2d<f32>;
@group(2) @binding(2) var mapSampler : sampler;




struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) backgroundUv : vec2<f32>,
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
   
     return textureSample(myTexture, mySampler, clamp(uv + offset, gfu.inputClamp.xy, gfu.inputClamp.zw));
}`;class vm extends ye{constructor(e){let t=e.scale||20;const n=new Y({filterMatrix:{value:new B,type:"mat3x3<f32>"},scale:{value:t,type:"vec2<f32>"},rotation:{value:new Float32Array([0,0,0,0]),type:"vec4<f32>"}}),i=new ue({vertex:{source:bi,entryPoint:"mainVertex"},fragment:{source:bi,entryPoint:"mainFragment"}}),s=e.sprite.texture;super({gpuProgram:i,resources:{filterUniforms:n,mapTexture:s.source,mapStyle:s.style}}),this.sprite=e.sprite,this.sprite.renderable=!1,typeof t=="number"&&(t=new N(t,t))}apply(e,t,n,i){e.calculateSpriteMatrix(this.uniformGroup.uniforms.filterMatrix,this.sprite);const s=this.sprite.worldTransform,o=Math.sqrt(s.a*s.a+s.b*s.b),a=Math.sqrt(s.c*s.c+s.d*s.d),l=this.resources.filterUniforms.uniforms;o!==0&&a!==0&&(l.rotation[0]=s.a/o,l.rotation[1]=s.b/o,l.rotation[2]=s.c/a,l.rotation[3]=s.d/a),this.uniformGroup.update(),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,t,n,i)}get scale(){return this.uniformGroup.uniforms.scale}}var _h=`in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D myTexture;
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
    vec4 original = texture(myTexture, vTextureCoord);
    vec4 masky = texture(mapTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    fragColor = original;
}
`,Th=`in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;

uniform globalUniforms {
  mat3 projectionMatrix;
  mat3 worldTransformMatrix;
  float worldAlpha;
};

uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform mat3 filterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
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
`,yi=`struct GlobalUniforms {
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

struct MaskUniforms {
  filterMatrix:mat3x3<f32>,
  maskClamp:vec4<f32>,
  alpha:f32,
};



@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;

@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(1) @binding(1) var myTexture: texture_2d<f32>;
@group(1) @binding(2) var mySampler : sampler;
@group(1) @binding(3) var backTexture: texture_2d<f32>;

@group(2) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(2) @binding(1) var mapTexture: texture_2d<f32>;

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
    var source = textureSample(myTexture, mySampler, uv);
    
    var npmAlpha = 0.0;

    var alphaMul = 1.0 - npmAlpha * (1.0 - mask.a);

   
    //return source * (alphaMul * masky.r * alpha * clip);
    return source  * (alphaMul * mask.r) * clip;//  * (alphaMul * mask.r) * clip;// * filterUniforms.alpha * clip);
}`;class Sh extends ye{constructor({sprite:e}){const t=new vn(e.texture),n=new Y({filterMatrix:{value:new B,type:"mat3x3<f32>"},maskClamp:{value:t.uClampFrame,type:"vec4<f32>"},alpha:{value:1,type:"f32"}}),i=new ue({vertex:{source:yi,entryPoint:"mainVertex"},fragment:{source:yi,entryPoint:"mainFragment"}}),s=xe.from({vertex:Th,fragment:_h,name:"mask-filter"});super({gpuProgram:i,glProgram:s,resources:{filterUniforms:n,mapTexture:e.texture.source}}),this.sprite=e,this.textureMatrix=t}apply(e,t,n,i){this.textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.filterMatrix,this.sprite).prepend(this.textureMatrix.mapCoord),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,t,n,i)}}var Ph=`
in vec2 vTextureCoord;
in vec4 vColor;

out vec4 fragColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D myTexture;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture(myTexture, vTextureCoord);
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
`,Eh=`in vec2 aPosition;
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
`,xi=`struct GlobalUniforms {
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

struct NoiseUniforms {
  uNoise:f32,
  uSeed:f32,
};



@group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;

@group(1) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(1) @binding(1) var myTexture: texture_2d<f32>;
@group(1) @binding(2) var mySampler : sampler;
@group(1) @binding(3) var backTexture: texture_2d<f32>;

@group(2) @binding(0) var<uniform> noiseUniforms : NoiseUniforms;

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

fn rand(co:vec2<f32>) -> f32
{
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}



@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) backgroundUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var pixelPosition =  globalTextureCoord(position.xy);// / (getSize());//-  gfu.outputFrame.xy);
  
    
    var sample = textureSample(myTexture, mySampler, uv);
    var back = textureSample(backTexture, mySampler, backgroundUv);
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
}`,bm=Object.defineProperty,Mh=Object.getOwnPropertySymbols,ym=Object.prototype.hasOwnProperty,xm=Object.prototype.propertyIsEnumerable,Ch=(r,e,t)=>e in r?bm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ah=(r,e)=>{for(var t in e||(e={}))ym.call(e,t)&&Ch(r,t,e[t]);if(Mh)for(var t of Mh(e))xm.call(e,t)&&Ch(r,t,e[t]);return r};const Bh=class extends ye{constructor(r={}){var e,t,n;r=Ah(Ah({},Bh.DEFAULT),r);const i=new ue({vertex:{source:xi,entryPoint:"mainVertex"},fragment:{source:xi,entryPoint:"mainFragment"}}),s=new xe({vertex:Eh,fragment:Ph,name:"noise-filter"});super({gpuProgram:i,glProgram:s,resources:{noiseUniforms:new Y({uNoise:{value:r.noise,type:"f32"},uSeed:{value:(e=r.seed)!=null?e:Math.random(),type:"f32"}})},resolution:1});const o=(t=r.noise)!=null?t:.5,a=(n=r.seed)!=null?n:Math.random();this.noise=o,this.seed=a}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(r){this.resources.noiseUniforms.uniforms.uNoise=r}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(r){this.resources.noiseUniforms.uniforms.uSeed=r}};let Rh=Bh;Rh.DEFAULT={noise:.5,seed:void 0};class wi{constructor(e){this.filterGlobalUniforms=new Y({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},backgroundFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"}}),this.renderer=e}push(e,t,n){this.renderer.renderPipes.batch.break(n),n.add({type:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,n){this.renderer.renderPipes.batch.break(n),n.add({type:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this.renderer.filter.push(e):e.action==="popFilter"&&this.renderer.filter.pop()}destroy(){this.renderer=null,this.filterGlobalUniforms=null}}wi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"filter"};var wm=Object.defineProperty,_m=Object.defineProperties,Tm=Object.getOwnPropertyDescriptors,kh=Object.getOwnPropertySymbols,Sm=Object.prototype.hasOwnProperty,Pm=Object.prototype.propertyIsEnumerable,Uh=(r,e,t)=>e in r?wm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Em=(r,e)=>{for(var t in e||(e={}))Sm.call(e,t)&&Uh(r,t,e[t]);if(kh)for(var t of kh(e))Pm.call(e,t)&&Uh(r,t,e[t]);return r},Mm=(r,e)=>_m(r,Tm(e));let Cm=0;class Gh{constructor(e){this.poolKeyHash={},this.texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,n){const i=new ge(Mm(Em({},this.textureOptions),{width:e,height:t,resolution:1,antialias:n}));return new k({source:i,label:`texturePool_${Cm++}`})}getOptimalTexture(e,t,n=1,i){let s=Math.ceil(e*n-1e-6),o=Math.ceil(t*n-1e-6);s=Ze(s),o=Ze(o);const a=(s<<17)+(o<<1)+(i?1:0);this.texturePool[a]||(this.texturePool[a]=[]);let l=this.texturePool[a].pop();return l||(l=this.createTexture(s,o,i)),l.source._resolution=n,l.source.width=s/n,l.source.height=o/n,l.source.pixelWidth=s,l.source.pixelHeight=o,l.frameX=0,l.frameY=0,l.frameWidth=e,l.frameHeight=t,l.layout.update(),this.poolKeyHash[l.id]=a,l}getSameSizeTexture(e){const t=e.source;return this.getOptimalTexture(t.width,t.height,t._resolution,t.antialias)}returnTexture(e){const t=this.poolKeyHash[e.id];this.texturePool[t].push(e)}clear(e){if(e=e!==!1,e)for(const t in this.texturePool){const n=this.texturePool[t];if(n)for(let i=0;i<n.length;i++)n[i].destroy(!0)}this.texturePool={}}}const de=new Gh;function Ih(r,e){e.clear();const t=e.matrix;for(let n=0;n<r.length;n++){const i=r[n];i.layerVisibleRenderable<3||(e.matrix=i.worldTransform,i.view.addBounds(e))}return e.matrix=t,e}const Am=new Wt({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),shaderLocation:0,format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class _i{constructor(e){this.filterStackIndex=0,this.filterStack=[],this.filterGlobalUniforms=new Y({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},backgroundFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"}}),this.globalFilterBindGroup=new be({}),this.renderer=e}push(e){const t=this.renderer,n=e.filterEffect.filters;this.filterStack[this.filterStackIndex]||(this.filterStack[this.filterStackIndex]=this.getFilterData());const i=this.filterStack[this.filterStackIndex];this.filterStackIndex++;const s=i.bounds;if(e.renderables?Ih(e.renderables,s):ct(e.container,!0,s),n.length===0){i.skip=!0;return}let o=t.renderTarget.rootRenderTarget.colorTexture.source._resolution,a=0,l=t.renderTarget.rootRenderTarget.colorTexture.source.antialias,h=!1,u=!1;for(let c=0;c<n.length;c++){const d=n[c];o=Math.min(o,d.resolution),a+=d.padding,d.antialias!=="inherit"&&(d.antialias==="on"?l=!0:l=!1),u=d.enabled||u,h=h||d.blendRequired}if(!u){i.skip=!0;return}if(s.scale(o).fit(t.renderTarget.rootRenderTarget.viewport).scale(1/o).pad(a).ceil(),!s.isPositive){i.skip=!0;return}i.skip=!1,i.bounds=s,i.blendRequired=h,i.container=e.container,i.filterEffect=e.filterEffect,i.previousRenderSurface=t.renderTarget.renderTarget,i.inputTexture=de.getOptimalTexture(s.width,s.height,o,l),t.renderTarget.bind(i.inputTexture,!0),t.globalUniforms.push({offset:s})}pop(){const e=this.renderer;this.filterStackIndex--;const t=this.filterStack[this.filterStackIndex];if(t.skip)return;this.activeFilterData=t;const n=t.inputTexture,i=t.bounds;let s=k.EMPTY;t.blendRequired&&(e.encoder.finishRenderPass(),s=this.getBackTexture(t.previousRenderSurface,i));const o=N.shared;this.filterStackIndex>0&&(o.x=this.filterStack[this.filterStackIndex-1].bounds.minX,o.y=this.filterStack[this.filterStackIndex-1].bounds.minY),this.updateGlobalFilterUniforms(i,n,s,o);const a=t.filterEffect.filters;this.filterGlobalUniforms.update();let l=this.filterGlobalUniforms;if(e.renderPipes.uniformBatch&&(l=e.renderPipes.uniformBatch.getUniformBufferResource(this.filterGlobalUniforms)),this.globalFilterBindGroup.setResource(l,0),this.globalFilterBindGroup.setResource(n.style,2),this.globalFilterBindGroup.setResource(s.source,3),a.length===1)e.globalUniforms.pop(),a[0].apply(this,n,t.previousRenderSurface,!1),de.returnTexture(n);else{let h=t.inputTexture;const u=this.filterGlobalUniforms.uniforms.outputFrame,c=u[0],d=u[1];if(u[0]=0,u[1]=0,this.filterGlobalUniforms.update(),e.renderPipes.uniformBatch){const g=e.renderPipes.uniformBatch.getUniformBufferResource(this.filterGlobalUniforms);this.globalFilterBindGroup.setResource(g,0)}let f=de.getOptimalTexture(i.width,i.height,h.source._resolution,!1),p=0;for(p=0;p<a.length-1;++p){a[p].apply(this,h,f,!0);const g=h;h=f,f=g}e.globalUniforms.pop(),e.renderPipes.uniformBatch?this.globalFilterBindGroup.setResource(l,0):(u[0]=c,u[1]=d,this.filterGlobalUniforms.update()),a[p].apply(this,h,t.previousRenderSurface,!1),de.returnTexture(h),de.returnTexture(f)}t.blendRequired&&de.returnTexture(s)}updateGlobalFilterUniforms(e,t,n,i){const s=e.minX,o=e.minY,a=this.filterGlobalUniforms.uniforms,l=a.outputFrame,h=a.inputSize,u=a.inputPixel,c=a.inputClamp,d=a.backgroundFrame,f=a.globalFrame;l[0]=s-i.x,l[1]=o-i.y,l[2]=t.frameWidth,l[3]=t.frameHeight,h[0]=t.source.width,h[1]=t.source.height,h[2]=1/h[0],h[3]=1/h[1],u[0]=t.source.pixelWidth,u[1]=t.source.pixelHeight,u[2]=1/u[0],u[3]=1/u[1],c[0]=.5*u[2],c[1]=.5*u[3],c[2]=t.frameWidth*h[2]-.5*u[2],c[3]=t.frameHeight*h[3]-.5*u[3],d[0]=0,d[1]=0,d[2]=n.layout.frame.width,d[3]=n.layout.frame.height;let p=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;this.filterStackIndex>0&&(p=this.filterStack[this.filterStackIndex-1].inputTexture.source._resolution),f[0]=i.x*p,f[1]=i.y*p;const g=this.renderer.renderTarget.rootRenderTarget.colorTexture;f[2]=g.source.width*p,f[3]=g.source.height*p}getBackTexture(e,t){const n=e.colorTexture.source._resolution,i=de.getOptimalTexture(t.width,t.height,n,!1);let s=t.minX,o=t.minY;this.filterStackIndex&&(s-=this.filterStack[this.filterStackIndex-1].bounds.minX,o-=this.filterStack[this.filterStackIndex-1].bounds.minY),s=Math.floor(s*n),o=Math.floor(o*n);const a=Math.ceil(t.width*n),l=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,i,{x:s,y:o},{width:a,height:l}),i}applyFilter(e,t,n,i){const s=this.renderer;s.renderTarget.bind(n,!!i),this.globalFilterBindGroup.setResource(t.source,1),e.groups[0]=s.globalUniforms.bindGroup,e.groups[1]=this.globalFilterBindGroup,s.encoder.draw({geometry:Am,shader:e,state:e._state,topology:"triangle-list"})}getFilterData(){return{skip:!1,inputTexture:null,bounds:new pe,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,t){const n=this.activeFilterData,i=e.set(n.inputTexture._source.width,0,0,n.inputTexture._source.height,n.bounds.minX,n.bounds.minY),s=t.worldTransform.copyTo(B.shared);return s.invert(),i.prepend(s),i.scale(1/t.texture.frameWidth,1/t.texture.frameHeight),i.translate(t.anchor.x,t.anchor.y),i}destroy(){}}_i.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"filter"};var Fh=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,Oh=`precision highp float;
in vec2 aPosition;
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
`;function Lh(r){return Er({vertexSrc:Oh,fragmentSrc:Fh,maxTextures:r,name:"graphics"})}function Bm(r,e,t,n){t[n++]=(r>>16&255)/255,t[n++]=(r>>8&255)/255,t[n++]=(r&255)/255,t[n++]=e}function jt(r,e,t){e[t++]=(r&255)/255,e[t++]=(r>>8&255)/255,e[t++]=(r>>16&255)/255,e[t++]=(r>>24&255)/255}class Ti{init(){const e=new Y({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new B,type:"mat3x3<f32>"}});this.shader=new Me({glProgram:Lh(ce),resources:{localUniforms:e,batchSamplers:Mr}})}execute(e,t){const n=t.view.context,i=n.customShader||this.shader,s=e.renderer,o=s.graphicsContext;if(!o.updateGpuContext(n).batches.length)return;const{geometry:a,batches:l}=o.getContextRenderData(n),h=e.state;h.blendMode=t.layerBlendMode,s.state.set(e.state);const u=i.resources.localUniforms.uniforms;u.transformMatrix=t.layerTransform,jt(t.layerColor,u.color,0),s.shader.bind(i),s.shader.bindUniformBlock(s.globalUniforms.uniformGroup,"globalUniforms"),s.geometry.bind(a,i.glProgram);for(let c=0;c<l.length;c++){const d=l[c];if(d.size){for(let f=0;f<d.textures.textures.length;f++)s.texture.bind(d.textures.textures[f],f);s.geometry.draw("triangle-list",d.size,d.start)}}}destroy(){this.shader.destroy(!0),this.shader=null}}Ti.extension={type:[x.WebGLPipesAdaptor],name:"graphics"};var Si=`struct GlobalUniforms {
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
`;function Dh(r){return Cr({vertex:{source:Si,entryPoint:"mainVertex"},fragment:{source:Si,entryPoint:"mainFragment"},maxTextures:r})}class Pi{init(){const e=new Y({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new B,type:"mat3x3<f32>"}});this.shader=new Me({gpuProgram:Dh(ce),groups:{2:new be({0:e})}})}execute(e,t){const n=t.view.context,i=n.customShader||this.shader,s=e.renderer,o=s.graphicsContext;if(!o.getGpuContext(n).batches.length)return;const{geometry:a,batches:l}=o.getContextRenderData(n);e.state.blendMode=t.layerBlendMode;const h=i.resources.localUniforms;i.resources.localUniforms.uniforms.transformMatrix=t.layerTransform,jt(t.layerColor,h.uniforms.color,0);const u=s.encoder;u.setPipelineFromGeometryProgramAndState(a,i.gpuProgram,e.state),u.setGeometry(a);const c=s.globalUniforms.bindGroup;u.setBindGroup(0,c,i.gpuProgram);const d=s.renderPipes.uniformBatch.getUniformBindGroup(h,!0);u.setBindGroup(2,d,i.gpuProgram);for(let f=0;f<l.length;f++){const p=l[f];i.groups[1]=p.textures.bindGroup,u.setBindGroup(1,p.textures.bindGroup,i.gpuProgram),u.renderPassEncoder.drawIndexed(p.size,1,p.start)}}destroy(){this.shader.destroy(!0),this.shader=null}}Pi.extension={type:[x.WebGPUPipesAdaptor],name:"graphics"};function Ei(r,e,t){const n=r>>16&255,i=r>>8&255,s=r&255,o=e>>16&255,a=e>>8&255,l=e&255,h=n+(o-n)*t,u=i+(a-i)*t,c=s+(l-s)*t;return(h<<16)+(u<<8)+c}const $h=16777215+16777215;function Ir(r,e){const t=(r>>24&255)/255,n=(e>>24&255)/255,i=t*n*255,s=r&16777215,o=e&16777215;let a=16777215;return s+(o<<32)!==$h&&(s===16777215?a=o:o===16777215?a=s:a=Ei(s,o,.5)),a+(i<<24)}function Rm(r,e,t){const n=(t>>24&255)/255,i=e*n*255,s=((r&255)<<16)+(r&65280)+(r>>16&255),o=t&16777215;let a=16777215;return s+(o<<32)!==$h&&(s===16777215?a=o:o===16777215?a=s:a=Ei(s,o,.5)),a+(i<<24)}class Fr{constructor(){this.batcher=null,this.batch=null,this.applyTransform=!0}get blendMode(){return this.applyTransform?this.renderable.layerBlendMode:"normal"}packIndex(e,t,n){const i=this.geometryData.indices;for(let s=0;s<this.indexSize;s++)e[t++]=i[s+this.indexOffset]+n-this.vertexOffset}packAttributes(e,t,n,i){const s=this.geometryData,o=s.vertices,a=s.uvs,l=this.vertexOffset*2,h=(this.vertexOffset+this.vertexSize)*2,u=this.color,c=u>>16|u&65280|(u&255)<<16;if(this.applyTransform){const d=this.renderable,f=Ir(c+(this.alpha*255<<24),d.layerColor),p=d.layerTransform,g=p.a,m=p.b,y=p.c,b=p.d,v=p.tx,w=p.ty;for(let P=l;P<h;P+=2){const A=o[P],C=o[P+1];e[n++]=g*A+y*C+v,e[n++]=m*A+b*C+w,e[n++]=a[P],e[n++]=a[P+1],t[n++]=f,e[n++]=i}}else{const d=c+(this.alpha*255<<24);for(let f=l;f<h;f+=2)e[n++]=o[f],e[n++]=o[f+1],e[n++]=a[f],e[n++]=a[f+1],t[n++]=d,e[n++]=i}}get vertSize(){return this.vertexSize}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.vertexOffset=this.vertexOffset,e.vertexSize=this.vertexSize,e.color=this.color,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}}const Qe={build(r,e){let t,n,i,s,o,a;if(r.type==="circle"){const w=r;t=w.x,n=w.y,o=a=w.radius,i=s=0}else if(r.type==="ellipse"){const w=r;t=w.x,n=w.y,o=w.halfWidth,a=w.halfHeight,i=s=0}else{const w=r,P=w.width/2,A=w.height/2;t=w.x+P,n=w.y+A,o=a=Math.max(0,Math.min(w.radius,Math.min(P,A))),i=P-o,s=A-a}if(!(o>=0&&a>=0&&i>=0&&s>=0))return e;const l=Math.ceil(2.3*Math.sqrt(o+a)),h=l*8+(i?4:0)+(s?4:0);if(h===0)return e;if(l===0)return e[0]=e[6]=t+i,e[1]=e[3]=n+s,e[2]=e[4]=t-i,e[5]=e[7]=n-s,e;let u=0,c=l*4+(i?2:0)+2,d=c,f=h,p=i+o,g=s,m=t+p,y=t-p,b=n+g;if(e[u++]=m,e[u++]=b,e[--c]=b,e[--c]=y,s){const w=n-g;e[d++]=y,e[d++]=w,e[--f]=w,e[--f]=m}for(let w=1;w<l;w++){const P=Math.PI/2*(w/l),A=i+Math.cos(P)*o,C=s+Math.sin(P)*a,E=t+A,_=t-A,T=n+C,O=n-C;e[u++]=E,e[u++]=T,e[--c]=T,e[--c]=_,e[d++]=_,e[d++]=O,e[--f]=O,e[--f]=E}p=i,g=s+a,m=t+p,y=t-p,b=n+g;const v=n-g;return e[u++]=m,e[u++]=b,e[--f]=v,e[--f]=m,i&&(e[u++]=y,e[u++]=b,e[--f]=v,e[--f]=y),e},triangulate(r,e,t,n,i,s){if(r.length===0)return;let o=0,a=0;const l=r.length/4;o+=r[0],a+=r[1],o+=r[l|0],a+=r[(l|0)+1],o+=r[l*2|0],a+=r[(l*2|0)+1],o+=r[l*3|0],a+=r[(l*3|0)+1],o/=4,a/=4;let h=n;e[h*t]=o,e[h*t+1]=a,h++;const u=n;e[h*t]=r[0],e[h*t+1]=r[1],h++;for(let c=2;c<r.length;c+=2)e[h*t]=r[c],e[h*t+1]=r[c+1],i[s++]=h,i[s++]=u,i[s++]=h-1,h++;i[s++]=h-1,i[s++]=u,i[s++]=u+1}},Nh=1e-4,Mi=1e-4;function zh(r){const e=r.length;if(e<6)return 1;let t=0;for(let n=0,i=r[e-2],s=r[e-1];n<e;n+=2){const o=r[n],a=r[n+1];t+=(o-i)*(a+s),i=o,s=a}return t<0?-1:1}function Wh(r,e,t,n,i,s,o,a){const l=r-t*i,h=e-n*i,u=r+t*s,c=e+n*s;let d,f;o?(d=n,f=-t):(d=-n,f=t);const p=l+d,g=h+f,m=u+d,y=c+f;return a.push(p,g),a.push(m,y),2}function Je(r,e,t,n,i,s,o,a){const l=t-r,h=n-e;let u=Math.atan2(l,h),c=Math.atan2(i-r,s-e);a&&u<c?u+=Math.PI*2:!a&&u>c&&(c+=Math.PI*2);let d=u;const f=c-u,p=Math.abs(f),g=Math.sqrt(l*l+h*h),m=(15*p*Math.sqrt(g)/Math.PI>>0)+1,y=f/m;if(d+=y,a){o.push(r,e),o.push(t,n);for(let b=1,v=d;b<m;b++,v+=y)o.push(r,e),o.push(r+Math.sin(v)*g,e+Math.cos(v)*g);o.push(r,e),o.push(i,s)}else{o.push(t,n),o.push(r,e);for(let b=1,v=d;b<m;b++,v+=y)o.push(r+Math.sin(v)*g,e+Math.cos(v)*g),o.push(r,e);o.push(i,s),o.push(r,e)}return m*2}function Hh(r,e,t,n,i,s,o,a,l){const h=Nh;if(r.length===0)return;const u=e;let c=u.alignment;if(e.alignment!==.5){let W=zh(r);t&&(W*=-1),c=(c-.5)*W+.5}const d=new N(r[0],r[1]),f=new N(r[r.length-2],r[r.length-1]),p=n,g=Math.abs(d.x-f.x)<h&&Math.abs(d.y-f.y)<h;if(p){r=r.slice(),g&&(r.pop(),r.pop(),f.set(r[r.length-2],r[r.length-1]));const W=(d.x+f.x)*.5,Ae=(f.y+d.y)*.5;r.unshift(W,Ae),r.push(W,Ae)}const m=i,y=r.length/2;let b=r.length;const v=m.length/2,w=u.width/2,P=w*w,A=u.miterLimit*u.miterLimit;let C=r[0],E=r[1],_=r[2],T=r[3],O=0,L=0,S=-(E-T),R=C-_,z=0,j=0,ne=Math.sqrt(S*S+R*R);S/=ne,R/=ne,S*=w,R*=w;const ao=c,U=(1-ao)*2,G=ao*2;p||(u.cap==="round"?b+=Je(C-S*(U-G)*.5,E-R*(U-G)*.5,C-S*U,E-R*U,C+S*G,E+R*G,m,!0)+2:u.cap==="square"&&(b+=Wh(C,E,S,R,U,G,!0,m))),m.push(C-S*U,E-R*U),m.push(C+S*G,E+R*G);for(let W=1;W<y-1;++W){C=r[(W-1)*2],E=r[(W-1)*2+1],_=r[W*2],T=r[W*2+1],O=r[(W+1)*2],L=r[(W+1)*2+1],S=-(E-T),R=C-_,ne=Math.sqrt(S*S+R*R),S/=ne,R/=ne,S*=w,R*=w,z=-(T-L),j=_-O,ne=Math.sqrt(z*z+j*j),z/=ne,j/=ne,z*=w,j*=w;const Ae=_-C,Tt=E-T,St=_-O,Pt=L-T,lo=Ae*St+Tt*Pt,nr=Tt*St-Pt*Ae,Et=nr<0;if(Math.abs(nr)<.001*Math.abs(lo)){m.push(_-S*U,T-R*U),m.push(_+S*G,T+R*G),lo>=0&&(u.join==="round"?b+=Je(_,T,_-S*U,T-R*U,_-z*U,T-j*U,m,!1)+4:b+=2,m.push(_-z*G,T-j*G),m.push(_+z*U,T+j*U));continue}const ho=(-S+C)*(-R+T)-(-S+_)*(-R+E),uo=(-z+O)*(-j+T)-(-z+_)*(-j+L),ir=(Ae*uo-St*ho)/nr,sr=(Pt*ho-Tt*uo)/nr,hn=(ir-_)*(ir-_)+(sr-T)*(sr-T),Ie=_+(ir-_)*U,Fe=T+(sr-T)*U,Oe=_-(ir-_)*G,Le=T-(sr-T)*G,fd=Math.min(Ae*Ae+Tt*Tt,St*St+Pt*Pt),co=Et?U:G,pd=fd+co*co*P;hn<=pd?u.join==="bevel"||hn/P>A?(Et?(m.push(Ie,Fe),m.push(_+S*G,T+R*G),m.push(Ie,Fe),m.push(_+z*G,T+j*G)):(m.push(_-S*U,T-R*U),m.push(Oe,Le),m.push(_-z*U,T-j*U),m.push(Oe,Le)),b+=2):u.join==="round"?Et?(m.push(Ie,Fe),m.push(_+S*G,T+R*G),b+=Je(_,T,_+S*G,T+R*G,_+z*G,T+j*G,m,!0)+4,m.push(Ie,Fe),m.push(_+z*G,T+j*G)):(m.push(_-S*U,T-R*U),m.push(Oe,Le),b+=Je(_,T,_-S*U,T-R*U,_-z*U,T-j*U,m,!1)+4,m.push(_-z*U,T-j*U),m.push(Oe,Le)):(m.push(Ie,Fe),m.push(Oe,Le)):(m.push(_-S*U,T-R*U),m.push(_+S*G,T+R*G),u.join==="round"?Et?b+=Je(_,T,_+S*G,T+R*G,_+z*G,T+j*G,m,!0)+2:b+=Je(_,T,_-S*U,T-R*U,_-z*U,T-j*U,m,!1)+2:u.join==="miter"&&hn/P<=A&&(Et?(m.push(Oe,Le),m.push(Oe,Le)):(m.push(Ie,Fe),m.push(Ie,Fe)),b+=2),m.push(_-z*U,T-j*U),m.push(_+z*G,T+j*G),b+=2)}C=r[(y-2)*2],E=r[(y-2)*2+1],_=r[(y-1)*2],T=r[(y-1)*2+1],S=-(E-T),R=C-_,ne=Math.sqrt(S*S+R*R),S/=ne,R/=ne,S*=w,R*=w,m.push(_-S*U,T-R*U),m.push(_+S*G,T+R*G),p||(u.cap==="round"?b+=Je(_-S*(U-G)*.5,T-R*(U-G)*.5,_-S*U,T-R*U,_+S*G,T+R*G,m,!1)+2:u.cap==="square"&&(b+=Wh(_,T,S,R,U,G,!1,m)));const dd=Mi*Mi;for(let W=v;W<b+v-2;++W)C=m[W*2],E=m[W*2+1],_=m[(W+1)*2],T=m[(W+1)*2+1],O=m[(W+2)*2],L=m[(W+2)*2+1],!(Math.abs(C*(T-L)+_*(L-E)+O*(E-T))<dd)&&a.push(W,W+1,W+2)}var Vh=Or,km=Or;function Or(r,e,t){t=t||2;var n=e&&e.length,i=n?e[0]*t:r.length,s=jh(r,0,i,t,!0),o=[];if(!s||s.next===s.prev)return o;var a,l,h,u,c,d,f;if(n&&(s=Om(r,e,s,t)),r.length>80*t){a=h=r[0],l=u=r[1];for(var p=t;p<i;p+=t)c=r[p],d=r[p+1],c<a&&(a=c),d<l&&(l=d),c>h&&(h=c),d>u&&(u=d);f=Math.max(h-a,u-l),f=f!==0?32767/f:0}return Yt(s,o,t,a,l,f,0),o}function jh(r,e,t,n,i){var s,o;if(i===Bi(r,e,t,n)>0)for(s=e;s<t;s+=n)o=qh(s,r[s],r[s+1],o);else for(s=t-n;s>=e;s-=n)o=qh(s,r[s],r[s+1],o);return o&&Lr(o,o.next)&&(qt(o),o=o.next),o}function et(r,e){if(!r)return r;e||(e=r);var t=r,n;do if(n=!1,!t.steiner&&(Lr(t,t.next)||V(t.prev,t,t.next)===0)){if(qt(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Yt(r,e,t,n,i,s,o){if(r){!o&&s&&zm(r,n,i,s);for(var a=r,l,h;r.prev!==r.next;){if(l=r.prev,h=r.next,s?Gm(r,n,i,s):Um(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(h.i/t|0),qt(r),r=h.next,a=h.next;continue}if(r=h,r===a){o?o===1?(r=Im(et(r),e,t),Yt(r,e,t,n,i,s,2)):o===2&&Fm(r,e,t,n,i,s):Yt(et(r),e,t,n,i,s,1);break}}}}function Um(r){var e=r.prev,t=r,n=r.next;if(V(e,t,n)>=0)return!1;for(var i=e.x,s=t.x,o=n.x,a=e.y,l=t.y,h=n.y,u=i<s?i<o?i:o:s<o?s:o,c=a<l?a<h?a:h:l<h?l:h,d=i>s?i>o?i:o:s>o?s:o,f=a>l?a>h?a:h:l>h?l:h,p=n.next;p!==e;){if(p.x>=u&&p.x<=d&&p.y>=c&&p.y<=f&&gt(i,a,s,l,o,h,p.x,p.y)&&V(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Gm(r,e,t,n){var i=r.prev,s=r,o=r.next;if(V(i,s,o)>=0)return!1;for(var a=i.x,l=s.x,h=o.x,u=i.y,c=s.y,d=o.y,f=a<l?a<h?a:h:l<h?l:h,p=u<c?u<d?u:d:c<d?c:d,g=a>l?a>h?a:h:l>h?l:h,m=u>c?u>d?u:d:c>d?c:d,y=Ci(f,p,e,t,n),b=Ci(g,m,e,t,n),v=r.prevZ,w=r.nextZ;v&&v.z>=y&&w&&w.z<=b;){if(v.x>=f&&v.x<=g&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&gt(a,u,l,c,h,d,v.x,v.y)&&V(v.prev,v,v.next)>=0||(v=v.prevZ,w.x>=f&&w.x<=g&&w.y>=p&&w.y<=m&&w!==i&&w!==o&&gt(a,u,l,c,h,d,w.x,w.y)&&V(w.prev,w,w.next)>=0))return!1;w=w.nextZ}for(;v&&v.z>=y;){if(v.x>=f&&v.x<=g&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&gt(a,u,l,c,h,d,v.x,v.y)&&V(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;w&&w.z<=b;){if(w.x>=f&&w.x<=g&&w.y>=p&&w.y<=m&&w!==i&&w!==o&&gt(a,u,l,c,h,d,w.x,w.y)&&V(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function Im(r,e,t){var n=r;do{var i=n.prev,s=n.next.next;!Lr(i,s)&&Yh(i,n,n.next,s)&&Xt(i,s)&&Xt(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),qt(n),qt(n.next),n=r=s),n=n.next}while(n!==r);return et(n)}function Fm(r,e,t,n,i,s){var o=r;do{for(var a=o.next.next;a!==o.prev;){if(o.i!==a.i&&Vm(o,a)){var l=Xh(o,a);o=et(o,o.next),l=et(l,l.next),Yt(o,e,t,n,i,s,0),Yt(l,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Om(r,e,t,n){var i=[],s,o,a,l,h;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:r.length,h=jh(r,a,l,n,!1),h===h.next&&(h.steiner=!0),i.push(Hm(h));for(i.sort(Lm),s=0;s<i.length;s++)t=Dm(i[s],t);return t}function Lm(r,e){return r.x-e.x}function Dm(r,e){var t=$m(r,e);if(!t)return e;var n=Xh(t,r);return et(n,n.next),et(t,t.next)}function $m(r,e){var t=e,n=r.x,i=r.y,s=-1/0,o;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){var a=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=n&&a>s&&(s=a,o=t.x<t.next.x?t:t.next,a===n))return o}t=t.next}while(t!==e);if(!o)return null;var l=o,h=o.x,u=o.y,c=1/0,d;t=o;do n>=t.x&&t.x>=h&&n!==t.x&&gt(i<u?n:s,i,h,u,i<u?s:n,i,t.x,t.y)&&(d=Math.abs(i-t.y)/(n-t.x),Xt(t,r)&&(d<c||d===c&&(t.x>o.x||t.x===o.x&&Nm(o,t)))&&(o=t,c=d)),t=t.next;while(t!==l);return o}function Nm(r,e){return V(r.prev,r,e.prev)<0&&V(e.next,r,r.next)<0}function zm(r,e,t,n){var i=r;do i.z===0&&(i.z=Ci(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Wm(i)}function Wm(r){var e,t,n,i,s,o,a,l,h=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<h&&(a++,n=n.nextZ,!!n);e++);for(l=h;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,h*=2}while(o>1);return r}function Ci(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Hm(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function gt(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function Vm(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!jm(r,e)&&(Xt(r,e)&&Xt(e,r)&&Ym(r,e)&&(V(r.prev,r,e.prev)||V(r,e.prev,e))||Lr(r,e)&&V(r.prev,r,r.next)>0&&V(e.prev,e,e.next)>0)}function V(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Lr(r,e){return r.x===e.x&&r.y===e.y}function Yh(r,e,t,n){var i=$r(V(r,e,t)),s=$r(V(r,e,n)),o=$r(V(t,n,r)),a=$r(V(t,n,e));return!!(i!==s&&o!==a||i===0&&Dr(r,t,e)||s===0&&Dr(r,n,e)||o===0&&Dr(t,r,n)||a===0&&Dr(t,e,n))}function Dr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function $r(r){return r>0?1:r<0?-1:0}function jm(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Yh(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function Xt(r,e){return V(r.prev,r,r.next)<0?V(r,e,r.next)>=0&&V(r,r.prev,e)>=0:V(r,e,r.prev)<0||V(r,r.next,e)<0}function Ym(r,e){var t=r,n=!1,i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Xh(r,e){var t=new Ai(r.i,r.x,r.y),n=new Ai(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function qh(r,e,t,n){var i=new Ai(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function qt(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Ai(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Or.deviation=function(r,e,t,n){var i=e&&e.length,s=i?e[0]*t:r.length,o=Math.abs(Bi(r,0,s,t));if(i)for(var a=0,l=e.length;a<l;a++){var h=e[a]*t,u=a<l-1?e[a+1]*t:r.length;o-=Math.abs(Bi(r,h,u,t))}var c=0;for(a=0;a<n.length;a+=3){var d=n[a]*t,f=n[a+1]*t,p=n[a+2]*t;c+=Math.abs((r[d]-r[p])*(r[f+1]-r[d+1])-(r[d]-r[f])*(r[p+1]-r[d+1]))}return o===0&&c===0?0:Math.abs((c-o)/o)};function Bi(r,e,t,n){for(var i=0,s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}Or.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},n=0,i=0;i<r.length;i++){for(var s=0;s<r[i].length;s++)for(var o=0;o<e;o++)t.vertices.push(r[i][s][o]);i>0&&(n+=r[i-1].length,t.holes.push(n))}return t},Vh.default=km;function Ri(r,e,t,n,i,s,o){const a=Vh(r,e,2);if(!a)return;for(let h=0;h<a.length;h+=3)s[o++]=a[h]+i,s[o++]=a[h+1]+i,s[o++]=a[h+2]+i;let l=i*n;for(let h=0;h<r.length;h+=2)t[l]=r[h],t[l+1]=r[h+1],l+=n}const Xm=[],ki={build(r,e){for(let t=0;t<r.points.length;t++)e[t]=r.points[t];return e},triangulate(r,e,t,n,i,s){Ri(r,Xm,e,t,n,i,s)}},Ui={build(r,e){const t=r,n=t.x,i=t.y,s=t.width,o=t.height;return s>=0&&o>=0&&(e[0]=n,e[1]=i,e[2]=n+s,e[3]=i,e[4]=n+s,e[5]=i+o,e[6]=n,e[7]=i+o),e},triangulate(r,e,t,n,i,s){let o=0;n*=t,e[n+o]=r[0],e[n+o+1]=r[1],o+=t,e[n+o]=r[2],e[n+o+1]=r[3],o+=t,e[n+o]=r[6],e[n+o+1]=r[7],o+=t,e[n+o]=r[4],e[n+o+1]=r[5],o+=t;const a=n/t;i[s++]=a,i[s++]=a+1,i[s++]=a+2,i[s++]=a+1,i[s++]=a+3,i[s++]=a+2}},Gi={build(r,e){return e[0]=r.x,e[1]=r.y,e[2]=r.x2,e[3]=r.y2,e[4]=r.x3,e[5]=r.y3,e},triangulate(r,e,t,n,i,s){let o=0;n*=t,e[n+o]=r[0],e[n+o+1]=r[1],o+=t,e[n+o]=r[2],e[n+o+1]=r[3],o+=t,e[n+o]=r[4],e[n+o+1]=r[5];const a=n/t;i[s++]=a,i[s++]=a+1,i[s++]=a+2}};let qm=0;class Ii{constructor(e){this.uid=qm++,this.canBundle=!0,this.owner=ft,this.type="graphics",this._context=e||new Re,this._context.on("update",this.onGraphicsContextUpdate,this)}set context(e){e!==this._context&&(this._context.off("update",this.onGraphicsContextUpdate,this),this._context=e,this._context.on("update",this.onGraphicsContextUpdate,this),this.onGraphicsContextUpdate())}get context(){return this._context}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onGraphicsContextUpdate(){this.didUpdate=!0,this.owner.onViewUpdate()}destroy(e=!1){this.owner=null,(typeof e=="boolean"?e:e!=null&&e.context)&&this._context.destroy(e),this._context=null}}var Km=Object.defineProperty,Kh=Object.getOwnPropertySymbols,Zm=Object.prototype.hasOwnProperty,Qm=Object.prototype.propertyIsEnumerable,Zh=(r,e,t)=>e in r?Km(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Jm=(r,e)=>{for(var t in e||(e={}))Zm.call(e,t)&&Zh(r,t,e[t]);if(Kh)for(var t of Kh(e))Qm.call(e,t)&&Zh(r,t,e[t]);return r};class eg extends Q{constructor(e){e instanceof Re&&(e={context:e}),super(Jm({view:new Ii(e==null?void 0:e.context),label:"Graphics"},e))}get context(){return this.view.context}set context(e){this.view.context=e}}function Fi(r,e,t,n,i,s,o,a=null){let l=0;t*=e,i*=s;const h=a.a,u=a.b,c=a.c,d=a.d,f=a.tx,p=a.ty;for(;l<o;){const g=r[t],m=r[t+1];n[i]=h*g+c*m+f,n[i+1]=u*g+d*m+p,i+=s,t+=e,l++}}function Oi(r,e,t,n){let i=0;for(e*=t;i<n;)r[e]=0,r[e+1]=0,e+=t,i++}function Nr(r,e,t,n,i){const s=e.a,o=e.b,a=e.c,l=e.d,h=e.tx,u=e.ty;t=t||0,n=n||2,i=i||r.length/n-t;let c=t*n;for(let d=0;d<i;d++){const f=r[c],p=r[c+1];r[c]=s*f+a*p+h,r[c+1]=o*f+l*p+u,c+=n}}const Li={rectangle:Ui,polygon:ki,triangle:Gi,circle:Qe,ellipse:Qe,roundedRectangle:Qe},tg=new q;function Qh(r){const e={vertices:[],uvs:[],indices:[]},t=[];for(let n=0;n<r.instructions.length;n++){const i=r.instructions[n];if(i.action==="texture")rg(i.data,t,e);else if(i.action==="fill"||i.action==="stroke"){const s=i.action==="stroke",o=i.data.path.shapePath,a=i.data.style,l=i.data.hole;s&&l&&Jh(l.shapePath,a,null,!0,t,e),Jh(o,a,l,s,t,e)}}return t}function rg(r,e,t){const{vertices:n,uvs:i,indices:s}=t,o=s.length,a=n.length/2,l=[],h=Li.rectangle,u=tg,c=r.image;u.x=r.dx,u.y=r.dy,u.width=r.dw,u.height=r.dh;const d=r.transform;h.build(u,l),d&&Nr(l,d),h.triangulate(l,n,2,a,s,o);const f=c.layout.uvs;i.push(f.x0,f.y0,f.x1,f.y1,f.x3,f.y3,f.x2,f.y2);const p=H.get(Fr);p.indexOffset=o,p.indexSize=s.length-o,p.vertexOffset=a,p.vertexSize=n.length/2-a,p.color=r.style,p.alpha=r.alpha,p.texture=c,p.geometryData=t,e.push(p)}function Jh(r,e,t,n,i,s){const{vertices:o,uvs:a,indices:l}=s,h=r.shapePrimitives.length-1;r.shapePrimitives.forEach(({shape:u,transform:c},d)=>{var f;const p=l.length,g=o.length/2,m=[],y=Li[u.type];if(y.build(u,m),c&&Nr(m,c),n){const P=(f=u.closePath)!=null?f:!0;Hh(m,e,!1,P,o,2,g,l,p)}else if(t&&h===d){h!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const P=[],A=m.slice();ng(t.shapePath).forEach(C=>{P.push(A.length/2),A.push(...C)}),Ri(A,P,o,2,g,l,p)}else y.triangulate(m,o,2,g,l,p);const b=a.length/2,v=e.texture;if(v!==k.WHITE){const P=e.matrix;c&&P.append(c.clone().invert()),Fi(o,2,g,a,b,2,o.length/2-g,P)}else Oi(a,b,2,o.length/2-g);const w=H.get(Fr);w.indexOffset=p,w.indexSize=l.length-p,w.vertexOffset=g,w.vertexSize=o.length/2-g,w.color=e.color,w.alpha=e.alpha,w.texture=v,w.geometryData=s,i.push(w)})}function ng(r){if(!r)return[];const e=r.shapePrimitives,t=[];for(let n=0;n<e.length;n++){const i=e[n].shape,s=[];Li[i.type].build(i,s),t.push(s)}return t}class eu{}class tu{constructor(){this.geometry=new eh,this.batches=[]}init(){this.batches.length=0,this.geometry.reset()}}class Di{constructor(){this.activeBatchers=[],this.gpuContextHash={},this.graphicsDataContextHash={},this._needsContextNeedsRebuild=[]}prerender(){this.returnActiveBatchers()}getContextRenderData(e){return this.graphicsDataContextHash[e.uid]||this.initContextRenderData(e)}updateGpuContext(e){let t=this.gpuContextHash[e.uid]||this.initContext(e);if(e.dirty){t?this.cleanGraphicsContextData(e):t=this.initContext(e);const n=Qh(e);let i=0;const s=e.batchMode;let o=!0;if(s==="auto"){for(let a=0;a<n.length;a++)if(i+=n[a].vertexSize,i>100){o=!1;break}}else s==="no-batch"&&(o=!1);t=this.gpuContextHash[e.uid]={isBatchable:o,batches:n},e.dirty=!1}return t}getGpuContext(e){return this.gpuContextHash[e.uid]||this.initContext(e)}returnActiveBatchers(){for(let e=0;e<this.activeBatchers.length;e++)H.return(this.activeBatchers[e]);this.activeBatchers.length=0}initContextRenderData(e){const t=H.get(tu),n=this.gpuContextHash[e.uid].batches;let i=0,s=0;n.forEach(h=>{h.applyTransform=!1,i+=h.geometryData.vertices.length,s+=h.geometryData.indices.length});const o=H.get(pi);this.activeBatchers.push(o),o.ensureAttributeBuffer(i),o.ensureIndexBuffer(s),o.begin();for(let h=0;h<n.length;h++){const u=n[h];o.add(u)}o.finish();const a=t.geometry;a.indexBuffer.data=o.indexBuffer,a.buffers[0].data=o.attributeBuffer.float32View;const l=o.batches;for(let h=0;h<l.length;h++){const u=l[h];u.textures.bindGroup=li(u.textures.textures)}return this.graphicsDataContextHash[e.uid]=t,t.batches=l,t}initContext(e){const t=new eu;return this.gpuContextHash[e.uid]=t,e.on("update",this.onGraphicsContextUpdate,this),e.on("destroy",this.onGraphicsContextDestroy,this),this.gpuContextHash[e.uid]}onGraphicsContextUpdate(e){this._needsContextNeedsRebuild.push(e)}onGraphicsContextDestroy(e){this.cleanGraphicsContextData(e),this.gpuContextHash[e.uid]=null}cleanGraphicsContextData(e){const t=this.gpuContextHash[e.uid];t.isBatchable||this.graphicsDataContextHash[e.uid]&&(H.return(this.getContextRenderData(e)),this.graphicsDataContextHash[e.uid]=null),t.batches&&t.batches.forEach(n=>{H.return(n)})}destroy(){}}Di.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"graphicsContext"};class $i{constructor(e,t){this.state=_e.for2d(),this.renderableBatchesHash={},this.renderer=e,this.adaptor=t,this.adaptor.init()}validateRenderable(e){const t=e.view.context,n=!!this.renderableBatchesHash[e.uid],i=this.renderer.graphicsContext.updateGpuContext(t);return!!(i.isBatchable||n!==i.isBatchable)}addRenderable(e,t){const n=this.renderer.graphicsContext.updateGpuContext(e.view.context);e.view.didUpdate&&(e.view.didUpdate=!1,this.rebuild(e)),n.isBatchable?this.addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add({type:"graphics",renderable:e}))}updateRenderable(e){const t=this.renderableBatchesHash[e.uid];if(t)for(let n=0;n<t.length;n++){const i=t[n];i.batcher.updateElement(i)}}execute({renderable:e}){e.isRenderable&&this.adaptor.execute(this,e)}rebuild(e){const t=!!this.renderableBatchesHash[e.uid],n=this.renderer.graphicsContext.updateGpuContext(e.view.context);t&&this.removeBatchForRenderable(e.uid),n.isBatchable&&this.initBatchesForRenderable(e),e.view.batched=n.isBatchable}addToBatcher(e,t){const n=this.renderer.renderPipes.batch,i=this.getBatchesForRenderable(e);for(let s=0;s<i.length;s++){const o=i[s];n.addToBatch(o,t)}}getBatchesForRenderable(e){return this.renderableBatchesHash[e.uid]||this.initBatchesForRenderable(e)}initBatchesForRenderable(e){const t=e.view.context,n=this.renderer.graphicsContext.getGpuContext(t).batches.map(i=>{const s=H.get(Fr);return i.copyTo(s),s.renderable=e,s});return this.renderableBatchesHash[e.uid]=n,e.on("destroyed",()=>{this.destroyRenderable(e)}),n}destroyRenderable(e){this.removeBatchForRenderable(e.uid)}removeBatchForRenderable(e){this.renderableBatchesHash[e].forEach(t=>{H.return(t)}),this.renderableBatchesHash[e]=null}destroy(){this.renderer=null,this.shader.destroy(),this.shader=null,this.adaptor.destroy(),this.adaptor=null,this.state=null;for(const e in this.renderableBatchesHash)this.removeBatchForRenderable(e);this.renderableBatchesHash=null}}$i.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"graphics"};const ig={rectangle:Ui,polygon:ki,triangle:Gi,circle:Qe,ellipse:Qe,roundedRectangle:Qe};function sg(r){const e=[],t=[],n=[],i=r.path.shapePath,s=r.textureMatrix;i.shapePrimitives.forEach(({shape:a,transform:l})=>{const h=n.length,u=e.length/2,c=[],d=ig[a.type];d.build(a,c),l&&Nr(c,l),d.triangulate(c,e,2,u,n,h);const f=t.length/2;s?(l&&s.append(l.clone().invert()),Fi(e,2,u,t,f,2,e.length/2-u,s)):Oi(t,f,2,e.length/2-u)});const o=r.out;return o?(o.positions=new Float32Array(e),o.uvs=new Float32Array(t),o.indices=new Uint32Array(n),o):new Ht({positions:new Float32Array(e),uvs:new Float32Array(t),indices:new Uint32Array(n)})}const og=new pe;class ru{constructor(e){this.renderer=e}push(e,t,n){this.renderer.renderPipes.batch.break(n),n.add({type:"scissorMask",action:"pushMaskBegin",mask:e,canBundle:!1})}pop(e,t,n){this.renderer.renderPipes.batch.break(n),n.add({type:"scissorMask",action:"popMaskEnd",canBundle:!1})}execute(e){const t=this.renderer;if(e.action==="pushMaskBegin"){const n=ct(e.mask.mask,!0,og);n.ceil(),t.encoder.setScissor(n)}else e.action==="popMaskEnd"&&t.encoder.clearScissor()}}ru.extension={type:[x.WebGPUPipes],name:"scissorMask"};class nu extends re{constructor({original:e,view:t}){super(),this.uid=On(),this.view=t,this.original=e,this.layerTransform=new B,this.layerColor=4294967295,this.layerVisibleRenderable=3,this.view.owner=this}get layerBlendMode(){return this.original.layerBlendMode}onViewUpdate(){this.didViewUpdate=!0,this.original.layerGroup.onChildViewUpdate(this)}get isRenderable(){return this.original.isRenderable}}function iu(r,e){var t;const n=r.root,i=r.instructionSet;if(i.reset(),e.batch.buildStart(i),e.blendMode.buildStart(),e.colorMask.buildStart(),r.root.view){const a=(t=r.proxyRenderable)!=null?t:hg(r);a&&(e.blendMode.setBlendMode(a,a.layerBlendMode,i),e[a.view.type].addRenderable(a,i))}const s=n.children,o=s.length;for(let a=0;a<o;a++)vt(s[a],i,e);e.batch.buildEnd(i),e.blendMode.buildEnd(i)}function vt(r,e,t){r.layerVisibleRenderable<3||!r.includeInBuild||(r.isSimple?ag(r,e,t):lg(r,e,t))}function ag(r,e,t){const n=r.view;if(n&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[n.type].addRenderable(r,e)),!r.isLayerRoot){const i=r.children,s=i.length;for(let o=0;o<s;o++)vt(i[o],e,t)}}function lg(r,e,t){for(let n=0;n<r.effects.length;n++){const i=r.effects[n];t[i.pipe].push(i,r,e)}if(r.isLayerRoot)t.layer.addLayerGroup(r.layerGroup,e);else{const n=r.view;n&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[n.type].addRenderable(r,e));const i=r.children;if(i.length)for(let s=0;s<i.length;s++)vt(i[s],e,t)}for(let n=r.effects.length-1;n>=0;n--){const i=r.effects[n];t[i.pipe].pop(i,r,e)}}function hg(r){const e=r.root;e.view&&(r.proxyRenderable=new nu({original:e,view:e.view}))}const ug=new pe;class cg extends br{constructor(){super({filters:[new Sh({sprite:new Ge(k.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class Ni{constructor(e){this.activeMaskStage=[],this.renderer=e}push(e,t,n){const i=this.renderer;if(i.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:t}),e.renderMaskToTexture){const s=e.mask;s.includeInBuild=!0,vt(s,n,i.renderPipes),s.includeInBuild=!1}i.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,canBundle:!1})}pop(e,t,n){this.renderer.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const t=this.renderer,n=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const i=H.get(cg);if(n){e.mask.mask.measurable=!0;const s=ct(e.mask.mask,!0,ug);e.mask.mask.measurable=!1,s.ceil();const o=de.getOptimalTexture(s.width,s.height,1,!1),a=t.renderTarget.push(o,!0);t.globalUniforms.push({projectionMatrix:a.projectionMatrix,offset:s,worldColor:4294967295});const l=i.sprite;l.texture=o,l.worldTransform.tx=s.minX,l.worldTransform.ty=s.minY,this.activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer,filterTexture:o})}else i.sprite=e.mask.mask,this.activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const i=this.activeMaskStage[this.activeMaskStage.length-1];n&&(t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({type:"filter",action:"pushFilter",container:i.maskedContainer,filterEffect:i.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const i=this.activeMaskStage.pop();n&&de.returnTexture(i.filterTexture),H.return(i.filterEffect)}}destroy(){this.renderer=null,this.activeMaskStage=null}}Ni.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"alphaMask"};class zi{constructor(e){this.colorStack=[],this.colorStackIndex=0,this.currentColor=0,this.renderer=e}buildStart(){this.colorStack[0]=15,this.colorStackIndex=1,this.currentColor=15}push(e,t,n){this.renderer.renderPipes.batch.break(n);const i=this.colorStack;i[this.colorStackIndex]=i[this.colorStackIndex-1]&e.mask;const s=this.colorStack[this.colorStackIndex];s!==this.currentColor&&(this.currentColor=s,n.add({type:"colorMask",colorMask:s,canBundle:!1})),this.colorStackIndex++}pop(e,t,n){this.renderer.renderPipes.batch.break(n);const i=this.colorStack;this.colorStackIndex--;const s=i[this.colorStackIndex-1];s!==this.currentColor&&(this.currentColor=s,n.add({type:"colorMask",colorMask:s,canBundle:!1}))}execute(e){this.renderer.colorMask.setMask(e.colorMask)}destroy(){this.colorStack=null}}zi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"colorMask"};class dg{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1,this.renderMask=!1}addBounds(e,t){Sr(this.mask,e,t)}addLocalBounds(e,t){Pr(this.mask,e,t)}containsPoint(e){const t=this.mask;return t.containsPoint?t.containsPoint(e):!1}reset(){this.mask.measurable=!0,this.mask=null}destroy(){this.reset()}}var ee=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(ee||{});class Wi{constructor(e){this.maskStackHash={},this.maskHash=new WeakMap,this.renderer=e}push(e,t,n){const i=this.renderer;i.renderPipes.batch.break(n),n.add({type:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const s=e.mask;s.includeInBuild=!0,this.maskHash.has(e)||this.maskHash.set(e,{instructionsStart:0,instructionsLength:0});const o=this.maskHash.get(e);o.instructionsStart=n.instructionSize,vt(s,n,i.renderPipes),s.includeInBuild=!1,i.renderPipes.batch.break(n),n.add({type:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const a=n.instructionSize-o.instructionsStart-1;o.instructionsLength=a,this.maskStackHash[t.uid]===void 0&&(this.maskStackHash[t.uid]=0),this.maskStackHash[t.uid]++}pop(e,t,n){const i=this.renderer;this.maskStackHash[t.uid]--,i.renderPipes.batch.break(n),n.add({type:"stencilMask",action:"popMaskBegin",canBundle:!1});const s=this.maskHash.get(e);if(this.maskStackHash[t.uid])for(let o=0;o<s.instructionsLength;o++)n.instructions[n.instructionSize++]=n.instructions[s.instructionsStart++];n.add({type:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;const n=this.renderer,i=n.renderTarget.renderTarget.uid;let s=(t=this.maskStackHash[i])!=null?t:0;e.action==="pushMaskBegin"?(s++,n.stencil.setStencilMode(ee.RENDERING_MASK_ADD,s),n.colorMask.setMask(0)):e.action==="pushMaskEnd"?(n.stencil.setStencilMode(ee.MASK_ACTIVE,s),n.colorMask.setMask(15)):e.action==="popMaskBegin"?(s--,s!==0&&(n.stencil.setStencilMode(ee.RENDERING_MASK_REMOVE,s),n.colorMask.setMask(0))):e.action==="popMaskEnd"&&(s===0?n.stencil.setStencilMode(ee.DISABLED,s):n.stencil.setStencilMode(ee.MASK_ACTIVE,s),n.colorMask.setMask(15)),this.maskStackHash[i]=s}destroy(){this.renderer=null,this.maskStackHash=null,this.maskHash=null}}Wi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"stencilMask"};class Hi{execute(e,t){const n=e.renderer,i=t.view,s=e.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.transformMatrix=t.layerTransform,o.update(),jt(t.layerColor,o.uniforms.color,0);let a=i._shader;a||(a=e.meshShader,a.texture=i.texture),a.groups[0]=n.globalUniforms.bindGroup,a.groups[1]=e.localUniformsBindGroup,n.encoder.draw({geometry:i._geometry,shader:a,state:s})}}Hi.extension={type:[x.WebGLPipesAdaptor],name:"mesh"};class Vi{execute(e,t){const n=e.renderer,i=t.view,s=e.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.transformMatrix=t.layerTransform,o.update(),jt(t.layerColor,o.uniforms.color,0);let a=i._shader;a||(a=e.meshShader,a.groups[2]=n.texture.getTextureBindGroup(i.texture)),a.groups[0]=n.globalUniforms.bindGroup,a.groups[1]=n.renderPipes.uniformBatch.getUniformBindGroup(o,!0),n.encoder.draw({geometry:i._geometry,shader:a,state:s})}}Vi.extension={type:[x.WebGPUPipesAdaptor],name:"mesh"};class su{constructor(){this.batcher=null,this.batch=null}get blendMode(){return this.renderable.layerBlendMode}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null}packIndex(e,t,n){const i=this.renderable.view.geometry.indices;for(let s=0;s<i.length;s++)e[t++]=i[s]+n}packAttributes(e,t,n,i){const s=this.renderable,o=this.renderable.view.geometry,a=s.layerTransform,l=a.a,h=a.b,u=a.c,c=a.d,d=a.tx,f=a.ty,p=o.positions,g=o.uvs,m=s.layerColor;for(let y=0;y<p.length;y+=2){const b=p[y],v=p[y+1];e[n++]=l*b+u*v+d,e[n++]=h*b+c*v+f,e[n++]=g[y],e[n++]=g[y+1],t[n++]=m,e[n++]=i}}get vertexSize(){return this.renderable.view.geometry.positions.length/2}get indexSize(){return this.renderable.view.geometry.indices.length}}function fg(r,e){const{frameWidth:t,frameHeight:n}=r;return e.scale(1/t,1/n),e}var pg=Object.defineProperty,ou=Object.getOwnPropertySymbols,mg=Object.prototype.hasOwnProperty,gg=Object.prototype.propertyIsEnumerable,au=(r,e,t)=>e in r?pg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,vg=(r,e)=>{for(var t in e||(e={}))mg.call(e,t)&&au(r,t,e[t]);if(ou)for(var t of ou(e))gg.call(e,t)&&au(r,t,e[t]);return r};class bg extends Q{constructor(e){super(vg({view:new Vt(e),label:"Mesh"},e))}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get geometry(){return this.view.geometry}set geometry(e){this.view.geometry=e}}var lu=`in vec2 vTextureCoord;
in vec4 vColor;

uniform sampler2D uTexture;

out vec4 outColor;

void main(void){
   outColor = texture(uTexture, vTextureCoord) * vColor;
}`,hu=`
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
}`,ji=`struct GlobalUniforms {
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
  
}`;class uu extends Me{constructor(e){const t=xe.from({vertex:hu,fragment:lu,name:"mesh-default"}),n=ue.from({vertex:{source:ji,entryPoint:"mainVertex"},fragment:{source:ji,entryPoint:"mainFragment"}});super({glProgram:t,gpuProgram:n,resources:{uTexture:e.texture.source,uSampler:e.texture.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.style)}}class Yi{constructor(e,t){this.localUniforms=new Y({transformMatrix:{value:new B,type:"mat3x3<f32>"},color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"}}),this.localUniformsBindGroup=new be({0:this.localUniforms}),this.meshShader=new uu({texture:k.EMPTY}),this.state=_e.for2d(),this.renderableHash={},this.gpuBatchableMeshHash={},this.renderer=e,this.adaptor=t}validateRenderable(e){const t=this.getRenderableData(e),n=t.batched,i=e.view.batched;if(t.batched=i,n!==i)return!0;if(i){const s=e.view._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const o=this.getBatchableMesh(e),a=e.view.texture;if(o.texture._source!==a._source&&o.texture._source!==a._source)return o.batcher.checkAndUpdateTexture(o,a)}return!1}addRenderable(e,t){const n=this.renderer.renderPipes.batch,{batched:i}=this.getRenderableData(e);if(i){const s=this.getBatchableMesh(e);s.texture=e.view._texture,n.addToBatch(s,t)}else n.break(t),t.add({type:"mesh",renderable:e})}updateRenderable(e){if(e.view.batched){const t=this.gpuBatchableMeshHash[e.uid];t.texture=e.view._texture,t.batcher.updateElement(t)}}destroyRenderable(e){this.renderableHash[e.uid]=null;const t=this.gpuBatchableMeshHash[e.uid];H.return(t),this.gpuBatchableMeshHash[e.uid]=null}execute({renderable:e}){e.isRenderable&&this.adaptor.execute(this,e)}getRenderableData(e){return this.renderableHash[e.uid]||this.initRenderableData(e)}initRenderableData(e){const t=e.view;return this.renderableHash[e.uid]={batched:t.batched,indexSize:t._geometry.indices.length,vertexSize:t._geometry.positions.length},e.on("destroyed",()=>{this.destroyRenderable(e)}),this.renderableHash[e.uid]}getBatchableMesh(e){return this.gpuBatchableMeshHash[e.uid]||this.initBatchableMesh(e)}initBatchableMesh(e){const t=H.get(su);return t.renderable=e,t.texture=e.view._texture,this.gpuBatchableMeshHash[e.uid]=t,t.renderable=e,t}destroy(){for(const e in this.gpuBatchableMeshHash)this.gpuBatchableMeshHash[e]&&H.return(this.gpuBatchableMeshHash[e]);this.gpuBatchableMeshHash=null,this.renderableHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this.meshShader.destroy(),this.meshShader=null,this.adaptor=null,this.renderer=null,this.state=null}}Yi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"mesh"};var Kt=(r=>(r[r.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",r[r.ARRAY_BUFFER=34962]="ARRAY_BUFFER",r[r.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",r))(Kt||{});class cu{constructor(e,t){this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.refCount=0,this.type=t}}class Xi{constructor(e){this._gpuBuffers={},this.renderer=e,this.boundBufferBases={}}destroy(){this.renderer=null}contextChange(){this.destroyAll(!0),this.gl=this.renderer.gl}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{gl:t}=this,n=this.getGlBuffer(e);t.bindBuffer(n.type,n.buffer)}bindBufferBase(e,t){const{gl:n}=this;if(this.boundBufferBases[t]!==e){const i=this.getGlBuffer(e);this.boundBufferBases[t]=e,n.bindBufferBase(n.UNIFORM_BUFFER,t,i.buffer)}}bindBufferRange(e,t,n){const{gl:i}=this;n=n||0;const s=this.getGlBuffer(e);i.bindBufferRange(i.UNIFORM_BUFFER,t||0,s.buffer,n*256,256)}updateBuffer(e){const{gl:t}=this,n=this.getGlBuffer(e);if(e._updateID===n.updateID)return n;if(n.updateID=e._updateID,t.bindBuffer(n.type,n.buffer),n.byteLength>=e.data.byteLength)t.bufferSubData(n.type,0,e.data,0,e._updateSize/4);else{const i=e.descriptor.usage&D.STATIC?t.STATIC_DRAW:t.DYNAMIC_DRAW;n.byteLength=e.data.byteLength,t.bufferData(n.type,e.data,i)}return n}destroyAll(e){const t=this.gl;if(!e)for(const n in this._gpuBuffers)t.deleteBuffer(this._gpuBuffers[n].buffer);this._gpuBuffers={}}onBufferDestroy(e,t){const n=this._gpuBuffers[e.uid],i=this.gl;t||i.deleteBuffer(n.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{gl:t}=this;let n=Kt.ARRAY_BUFFER;e.descriptor.usage&D.INDEX?n=Kt.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&D.UNIFORM&&(n=Kt.UNIFORM_BUFFER);const i=new cu(t.createBuffer(),n);return this._gpuBuffers[e.uid]=i,e.on("destroy",this.onBufferDestroy,this),i}}Xi.extension={type:[x.WebGLSystem],name:"buffer"};class zr{constructor(e){this.renderer=e,this.webGLVersion=1,this.extensions={},this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this.renderer.gl=e,e.isContextLost()&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").restoreContext()}init(e){var t;if(e!=null&&e.context)this.initFromContext(e.context);else{const n=this.renderer.background.alpha<1,i=(t=e.premultipliedAlpha)!=null?t:!0;this.preserveDrawingBuffer=e.preserveDrawingBuffer,this.powerPreference=e.powerPreference,this.initFromOptions({alpha:n,premultipliedAlpha:i,antialias:e.antialias,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference})}}initFromContext(e){this.gl=e,this.validateContext(e),this.renderer.runners.contextChange.emit(e);const t=this.renderer.view.element;t.addEventListener("webglcontextlost",this.handleContextLost,!1),t.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}initFromOptions(e){const t=this.createContext(this.renderer.view.element,e);this.initFromContext(t)}createContext(e,t){const n=e.getContext("webgl2",t);return this.webGLVersion=2,this.gl=n,this.getExtensions(),this.gl}getExtensions(){const{gl:e}=this,t={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc")};Object.assign(this.extensions,t,{colorBufferFloat:e.getExtension("EXT_color_buffer_float")})}handleContextLost(e){e.preventDefault()}handleContextRestored(){this.renderer.runners.contextChange.emit(this.gl)}destroy(){const e=this.renderer.view.element;this.renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}postrender(){}validateContext(e){const t=e.getContextAttributes(),n="WebGL2RenderingContext"in globalThis&&e instanceof globalThis.WebGL2RenderingContext;n&&(this.webGLVersion=2),t&&!t.stencil&&console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");const i=n||!!e.getExtension("OES_element_index_uint");this.supports.uint32Indices=i,i||console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")}}zr.extension={type:[x.WebGLSystem],name:"context"},zr.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"default"};let yg=0;class xg{constructor(){this.uid=yg++}initFromCanvas(e){this.element=e;const t=e.getContext("webgl2",{});this.extensions={anisotropicFiltering:t.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:t.getExtension("OES_texture_float_linear"),s3tc:t.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:t.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:t.getExtension("WEBGL_compressed_texture_etc"),etc1:t.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:t.getExtension("WEBGL_compressed_texture_atc"),astc:t.getExtension("WEBGL_compressed_texture_astc"),colorBufferFloat:t.getExtension("EXT_color_buffer_float")},this.gl=t}}var Wr=(r=>(r[r.RGBA=6408]="RGBA",r[r.RGB=6407]="RGB",r[r.RG=33319]="RG",r[r.RED=6403]="RED",r[r.RGBA_INTEGER=36249]="RGBA_INTEGER",r[r.RGB_INTEGER=36248]="RGB_INTEGER",r[r.RG_INTEGER=33320]="RG_INTEGER",r[r.RED_INTEGER=36244]="RED_INTEGER",r[r.ALPHA=6406]="ALPHA",r[r.LUMINANCE=6409]="LUMINANCE",r[r.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",r[r.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",r[r.DEPTH_STENCIL=34041]="DEPTH_STENCIL",r))(Wr||{}),qi=(r=>(r[r.TEXTURE_2D=3553]="TEXTURE_2D",r[r.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",r[r.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",r[r.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",r[r.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",r[r.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",r[r.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",r))(qi||{}),du=(r=>(r[r.CLAMP=33071]="CLAMP",r[r.REPEAT=10497]="REPEAT",r[r.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",r))(du||{}),$=(r=>(r[r.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",r[r.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",r[r.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",r[r.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",r[r.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",r[r.UNSIGNED_INT=5125]="UNSIGNED_INT",r[r.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",r[r.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",r[r.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",r[r.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",r[r.BYTE=5120]="BYTE",r[r.SHORT=5122]="SHORT",r[r.INT=5124]="INT",r[r.FLOAT=5126]="FLOAT",r[r.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",r[r.HALF_FLOAT=36193]="HALF_FLOAT",r))($||{});const fu={uint8x2:{type:$.UNSIGNED_BYTE,size:2,normalised:!1},uint8x4:{type:$.UNSIGNED_BYTE,size:4,normalised:!1},sint8x2:{type:$.BYTE,size:2,normalised:!1},sint8x4:{type:$.BYTE,size:4,normalised:!1},unorm8x2:{type:$.UNSIGNED_BYTE,size:2,normalised:!0},unorm8x4:{type:$.UNSIGNED_BYTE,size:4,normalised:!0},snorm8x2:{type:$.BYTE,size:2,normalised:!0},snorm8x4:{type:$.BYTE,size:4,normalised:!0},uint16x2:{type:$.UNSIGNED_SHORT,size:2,normalised:!1},uint16x4:{type:$.UNSIGNED_SHORT,size:4,normalised:!1},sint16x2:{type:$.SHORT,size:2,normalised:!1},sint16x4:{type:$.SHORT,size:4,normalised:!1},unorm16x2:{type:$.UNSIGNED_SHORT,size:2,normalised:!0},unorm16x4:{type:$.UNSIGNED_SHORT,size:4,normalised:!0},snorm16x2:{type:$.SHORT,size:2,normalised:!0},snorm16x4:{type:$.SHORT,size:4,normalised:!0},float16x2:{type:$.HALF_FLOAT,size:2,normalised:!1},float16x4:{type:$.HALF_FLOAT,size:4,normalised:!1},float32:{type:$.FLOAT,size:1,normalised:!1},float32x2:{type:$.FLOAT,size:2,normalised:!1},float32x3:{type:$.FLOAT,size:3,normalised:!1},float32x4:{type:$.FLOAT,size:4,normalised:!1},uint32:{type:$.UNSIGNED_INT,size:1,normalised:!1},uint32x2:{type:$.UNSIGNED_INT,size:2,normalised:!1},uint32x3:{type:$.UNSIGNED_INT,size:3,normalised:!1},uint32x4:{type:$.UNSIGNED_INT,size:4,normalised:!1},sint32:{type:$.INT,size:1,normalised:!1},sint32x2:{type:$.INT,size:2,normalised:!1},sint32x3:{type:$.INT,size:3,normalised:!1},sint32x4:{type:$.INT,size:4,normalised:!1}};function pu(r){var e;return(e=fu[r])!=null?e:fu.float32}const Ki={5126:4,5123:2,5121:1},wg={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class Zi{constructor(e){this._geometryVaoHash={},this.renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!0,this.managedGeometries={}}contextChange(){this.gl=this.renderer.gl}bind(e,t){const n=this.gl;this._activeGeometry=e;const i=this.getVao(e,t);this._activeVao!==i&&(this._activeVao=i,n.bindVertexArray(i)),this.updateBuffers()}reset(){this.unbind()}updateBuffers(){const e=this._activeGeometry,t=this.renderer.buffer;for(let n=0;n<e.buffers.length;n++){const i=e.buffers[n];t.updateBuffer(i)}}checkCompatibility(e,t){const n=e.attributes,i=t.attributeData;for(const s in i)if(!n[s])throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`)}getSignature(e,t){const n=e.attributes,i=t.attributeData,s=["g",e.uid];for(const o in n)i[o]&&s.push(o,i[o].location);return s.join("-")}getVao(e,t){var n;return((n=this._geometryVaoHash[e.uid])==null?void 0:n[t.key])||this.initGeometryVao(e,t)}initGeometryVao(e,t,n=!0){const i=this.renderer.gl,s=this.renderer.buffer;this.renderer.shader.getProgramData(t),this.checkCompatibility(e,t);const o=this.getSignature(e,t);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]={},e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let l=a[o];if(l)return a[t.key]=l,l;const h=e.buffers,u=e.attributes,c={},d={};for(const f in h)c[f]=0,d[f]=0;for(const f in u)!u[f].size&&t.attributeData[f]?u[f].size=t.attributeData[f].size:u[f].size||console.warn(`PIXI Geometry attribute '${f}' size cannot be determined (likely the bound shader does not have the attribute)`),c[u[f].buffer.uid]+=u[f].size*Ki[u[f].type];for(const f in u){const p=u[f],g=p.size;p.stride===void 0&&(c[p.buffer.uid]===g*Ki[p.type]?p.stride=0:p.stride=c[p.buffer.uid]),p.start===void 0&&(p.start=d[p.buffer.uid],d[p.buffer.uid]+=g*Ki[p.type])}l=i.createVertexArray(),i.bindVertexArray(l);for(let f=0;f<h.length;f++){const p=h[f];s.bind(p)}return this.activateVao(e,t),a[t.key]=l,a[o]=l,i.bindVertexArray(null),l}onGeometryDestroy(e,t){const n=this._geometryVaoHash[e.uid],i=this.gl;if(n){if(t)for(const s in n)this._activeVao!==n[s]&&this.unbind(),i.deleteVertexArray(n[s]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const t=this.gl;for(const n in this._geometryVaoHash){if(e)for(const i in this._geometryVaoHash[n]){const s=this._geometryVaoHash[n];this._activeVao!==s&&this.unbind(),t.deleteVertexArray(s[i])}this._geometryVaoHash[n]=null}}activateVao(e,t){const n=this.renderer.gl,i=this.renderer.buffer,s=e.attributes;e.indexBuffer&&i.bind(e.indexBuffer);let o=null;for(const a in s){const l=s[a],h=l.buffer,u=i.getGlBuffer(h);if(t.attributeData[a]){o!==u&&(i.bind(h),o=u);const c=t.attributeData[a].location;n.enableVertexAttribArray(c);const d=pu(l.format);if(n.vertexAttribPointer(c,d.size,d.type,d.normalised,l.stride,l.offset),l.instance)if(this.hasInstance)n.vertexAttribDivisor(c,1);else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,t,n,i){const{gl:s}=this.renderer,o=this._activeGeometry,a=wg[o.topology||e];if(o.indexBuffer){const l=o.indexBuffer.data.BYTES_PER_ELEMENT,h=l===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;o.instanced?s.drawElementsInstanced(a,t||o.indexBuffer.data.length,h,(n||0)*l,o.instanceCount||1):s.drawElements(a,t||o.indexBuffer.data.length,h,(n||0)*l)}else o.instanced?s.drawArraysInstanced(a,n,t||o.getSize(),i||1):s.drawArrays(a,n,t||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this.renderer=null}}Zi.extension={type:[x.WebGLSystem],name:"geometry"};const _g=new xe({vertex:`
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
        }`,name:"big-triangle"}),mu=new Me({glProgram:_g,resources:{uTexture:k.WHITE.source}});class Qi{constructor(e){this.useBackBuffer=!1,this.renderer=e}init({useBackBuffer:e}={}){this.useBackBuffer=e}renderStart({target:e,clear:t}){if(this.useBackBuffer){const n=this.renderer.renderTarget.getRenderTarget(e);this.targetTexture=n.colorTexture,e=this._getBackBufferTexture(n.colorTexture)}this.renderer.renderTarget.start(e,t,this.renderer.background.colorRgba)}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){if(!this.useBackBuffer)return;const e=this.renderer,t=e.gl;e.renderTarget.finishRenderPass(),e.renderTarget.bind(this.targetTexture,!1),mu.resources.uTexture=this.backBufferTexture.source,e.shader.bind(mu,!1),e.state.set(_e.for2d()),t.drawArrays(t.TRIANGLES,0,3)}_getBackBufferTexture(e){const t=e.source;return this.backBufferTexture=this.backBufferTexture||new k({source:new ge({width:1,height:1,resolution:1,antialias:!1})}),this.backBufferTexture.source.resize(t.width,t.height,t._resolution),this.backBufferTexture}destroy(){}}Qi.extension={type:[x.WebGLSystem],name:"backBuffer"};class Ji{constructor(e){this.colorMaskCache=15,this.renderer=e}setMask(e){this.colorMaskCache!==e&&(this.colorMaskCache=e,this.renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}destroy(){}}Ji.extension={type:[x.WebGLSystem],name:"colorMask"};class es{constructor(e){this.commandFinished=Promise.resolve(),this.renderer=e}start(){}beginRenderPass(e,t){this.setViewport(e.viewport)}setViewport(e){}setScissor(e){e.fit(this.renderer.renderTarget.renderTarget.viewport)}clearScissor(){}setGeometry(e,t){this.renderer.geometry.bind(e,t.glProgram)}setShaderBindGroups(e,t){}syncBindGroup(e){}draw(e){const t=this.renderer,{geometry:n,shader:i,state:s,skipSync:o,topology:a,size:l,start:h,instanceCount:u}=e;t.shader.bind(i,o),t.geometry.bind(n,t.shader.activeProgram),s&&t.state.set(s),t.geometry.draw(a,l,h,u)}finishRenderPass(){}finish(){}restoreRenderPass(){}destroy(){}}es.extension={type:[x.WebGLSystem],name:"encoder"};class gu{constructor(){this.width=-1,this.height=-1,this.msaaRenderBuffer=[],this.msaa=!1,this.dirtyId=-1}}function ts(r){const e=r.colorTexture.source.resource;return e instanceof HTMLCanvasElement&&document.body.contains(e)}function vu(r,e,t,n,i,s){const o=s?1:-1;return r.identity(),r.a=1/n*2,r.d=o*(1/i*2),r.tx=-1-e*r.a,r.ty=-o-t*r.d,r}var Tg=Object.defineProperty,bu=Object.getOwnPropertySymbols,Sg=Object.prototype.hasOwnProperty,Pg=Object.prototype.propertyIsEnumerable,yu=(r,e,t)=>e in r?Tg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,xu=(r,e)=>{for(var t in e||(e={}))Sg.call(e,t)&&yu(r,t,e[t]);if(bu)for(var t of bu(e))Pg.call(e,t)&&yu(r,t,e[t]);return r};let Eg=0;const wu=class{constructor(r={}){if(this.uid=Eg++,this.width=0,this.height=0,this.resolution=1,this.colorTextures=[],this.clearColor=0,this.dirtyId=0,this.isRoot=!1,this._projectionMatrix=new B,r=xu(xu({},wu.defaultDescriptor),r),this.width=r.width,this.height=r.height,this.resolution=r.resolution,this.stencil=r.stencil,this._viewport=new q(0,0,this.width,this.height),typeof r.colorTextures=="number")for(let e=0;e<r.colorTextures;e++)this.colorTextures.push(new k({source:new ge({width:this.width,height:this.height,resolution:r.resolution,antialias:r.antialias})}));else{this.colorTextures=[...r.colorTextures];const e=this.colorTexture.source;this.resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),r.depthTexture&&(this.depthTexture=new k({source:new ge({width:this.width,height:this.height,resolution:this.resolution,format:"stencil8"})}))}get pixelWidth(){return this.width*this.resolution}get pixelHeight(){return this.height*this.resolution}get colorTexture(){return this.colorTextures[0]}get projectionMatrix(){const r=this.colorTexture;return vu(this._projectionMatrix,0,0,r.frameWidth,r.frameHeight,!this.isRoot),this._projectionMatrix}get viewport(){const r=this.colorTexture,e=r.source,t=e.pixelWidth,n=e.pixelHeight,i=this._viewport,s=r.layout.frame;return i.x=s.x*t|0,i.y=s.y*n|0,i.width=s.width*t|0,i.height=s.height*n|0,i}onSourceResize(r){this.resize(r.width,r.height,r._resolution,!0)}resize(r,e,t=this.resolution,n=!1){this.width=r,this.height=e,this.resolution=t,this.dirtyId++,this.colorTextures.forEach((i,s)=>{n&&s===0||i.source.resize(r,e,t)}),this.depthTexture&&this.depthTexture.source.resize(r,e,t)}destroy(){throw new Error("Method not implemented.")}};let bt=wu;bt.defaultDescriptor={width:0,height:0,resolution:1,colorTextures:1,stencil:!0,antialias:!1};class Hr{constructor(e){this.items=[],this._name=e}emit(e,t,n,i,s,o,a,l){const{name:h,items:u}=this;for(let c=0,d=u.length;c<d;c++)u[c][h](e,t,n,i,s,o,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}class _u extends ge{constructor(e){e.resource||(e.resource=F.ADAPTER.createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),super(e),this.type="image",this.alphaMode=0,this.autoDensity=e.autoDensity;const t=e.resource;(this.pixelWidth!==t.width||this.pixelWidth!==t.height)&&this.resizeCanvas()}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight}resize(e=this.width,t=this.height,n=this._resolution){super.resize(e,t,n),this.resizeCanvas()}}var Mg=Object.defineProperty,Tu=Object.getOwnPropertySymbols,Cg=Object.prototype.hasOwnProperty,Ag=Object.prototype.propertyIsEnumerable,Su=(r,e,t)=>e in r?Mg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Bg=(r,e)=>{for(var t in e||(e={}))Cg.call(e,t)&&Su(r,t,e[t]);if(Tu)for(var t of Tu(e))Ag.call(e,t)&&Su(r,t,e[t]);return r};const rs=new Map;function Vr(r,e){if(!rs.has(r)){const t=new k({source:new _u(Bg({resource:r},e))});rs.set(r,t)}return rs.get(r)}class ns{constructor(e){this.onRenderTargetChange=new Hr("onRenderTargetChange"),this.renderSurfaceToRenderTargetHash=new Map,this.gpuRenderTargetHash={},this.renderTargetStack=[],this.defaultClearColor=[0,0,0,0],this.clearColorCache=[0,0,0,0],this.viewPortCache={x:0,y:0,width:0,height:0},this.rootProjectionMatrix=new B,this.renderer=e}contextChange(e){this.gl=e}start(e,t=!0,n){this.renderTargetStack.length=0;const i=this.getRenderTarget(e);this.rootRenderTarget=i,this.renderingToScreen=ts(this.rootRenderTarget),this.rootProjectionMatrix=i.projectionMatrix,this.push(i,t,n)}renderEnd(){this.finish()}bind(e,t=!0,n){const i=this.getRenderTarget(e);this.renderTarget=i;const s=this.getGpuRenderTarget(i);i.dirtyId!==s.dirtyId&&(s.dirtyId=i.dirtyId,this.resizeGpuRenderTarget(i));const o=this.gl;o.bindFramebuffer(o.FRAMEBUFFER,s.framebuffer),i.colorTextures.forEach(u=>{this.renderer.texture.unbind(u)});const a=i.viewport;let l=a.y;i.isRoot&&(l=this.renderer.view.element.height-a.height);const h=this.viewPortCache;if((h.x!==a.x||h.y!==l||h.width!==a.width||h.height!==a.height)&&(h.x=a.x,h.y=l,h.width=a.width,h.height=a.height,o.viewport(a.x,l,a.width,a.height)),t){const u=this.gl;if(t){n=n!=null?n:this.defaultClearColor;const c=this.clearColorCache;(c[0]!==n[0]||c[1]!==n[1]||c[2]!==n[2]||c[3]!==n[3])&&(c[0]=n[0],c[1]=n[1],c[2]=n[2],c[3]=n[3],u.clearColor(n[0],n[1],n[2],n[3])),u.clear(u.COLOR_BUFFER_BIT|u.DEPTH_BUFFER_BIT|u.STENCIL_BUFFER_BIT)}}return this.onRenderTargetChange.emit(i),i}getGpuColorTexture(e){return e.colorTexture}push(e,t=!0,n){const i=this.bind(e,t,n);return this.renderTargetStack.push(i),i}pop(){this.renderTargetStack.pop(),this.bind(this.renderTargetStack[this.renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this.renderSurfaceToRenderTargetHash.get(e))!=null?t:this.initRenderTarget(e)}initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=Vr(e)),e instanceof bt?t=e:e instanceof k&&(t=new bt({colorTextures:[e]}),e.source.resource instanceof HTMLCanvasElement&&(t.isRoot=!0),e.source.on("destroy",()=>{t.destroy()})),this.renderSurfaceToRenderTargetHash.set(e,t),t}finishRenderPass(){const e=this.getGpuRenderTarget(this.renderTarget);if(!e.msaa)return;const t=this.renderer.gl;t.bindFramebuffer(t.FRAMEBUFFER,e.resolveTargetFramebuffer),t.bindFramebuffer(t.READ_FRAMEBUFFER,e.framebuffer),t.blitFramebuffer(0,0,e.width,e.height,0,0,e.width,e.height,t.COLOR_BUFFER_BIT,t.NEAREST),t.bindFramebuffer(t.FRAMEBUFFER,e.framebuffer),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)}finish(){}copyToTexture(e,t,n,i){const s=this.renderer,o=s.renderTarget.getGpuColorTexture(e);s.renderTarget.bind(o,!1),s.texture.bind(t,0);const a=s.gl;return a.copyTexSubImage2D(a.TEXTURE_2D,0,0,0,n.x,n.y,i.width,i.height),t}getGpuRenderTarget(e){return this.gpuRenderTargetHash[e.uid]||this.initGpuRenderTarget(e)}initGpuRenderTarget(e){const t=this.renderer.gl,n=new gu;return e.colorTexture.source.resource instanceof HTMLCanvasElement?(this.gpuRenderTargetHash[e.uid]=n,n.framebuffer=null,n):(this.initColor(e,n),e.stencil&&this.initStencil(n),t.bindFramebuffer(t.FRAMEBUFFER,null),this.gpuRenderTargetHash[e.uid]=n,n)}resizeGpuRenderTarget(e){if(e.isRoot)return;const t=this.getGpuRenderTarget(e);this.resizeColor(e,t),e.stencil&&this.resizeStencil(t)}initColor(e,t){const n=this.renderer,i=n.gl,s=i.createFramebuffer();if(t.resolveTargetFramebuffer=s,i.bindFramebuffer(i.FRAMEBUFFER,s),t.width=e.colorTexture.source.pixelWidth,t.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((o,a)=>{const l=o.source;l.antialias&&(t.msaa=!0),n.texture.bindSource(l,0);const h=n.texture.getGlSource(l).texture;i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+a,3553,h,0)}),t.msaa){const o=i.createFramebuffer();t.framebuffer=o,i.bindFramebuffer(i.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const h=i.createRenderbuffer();t.msaaRenderBuffer[l]=h})}else t.framebuffer=s}resizeColor(e,t){const n=e.colorTexture.source;if(t.width=n.pixelWidth,t.height=n.pixelHeight,e.colorTextures.forEach((i,s)=>{s!==0&&i.source.resize(n.width,n.height,n._resolution)}),t.msaa){const i=this.renderer,s=i.gl,o=t.framebuffer;s.bindFramebuffer(s.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const h=a.source;i.texture.bindSource(h,0);const u=i.texture.getGlSource(h).internalFormat,c=t.msaaRenderBuffer[l];s.bindRenderbuffer(s.RENDERBUFFER,c),s.renderbufferStorageMultisample(s.RENDERBUFFER,4,u,h.pixelWidth,h.pixelHeight),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+l,s.RENDERBUFFER,c)})}}initStencil(e){const t=this.renderer.gl,n=t.createRenderbuffer();e.depthStencilRenderBuffer=n,t.bindRenderbuffer(t.RENDERBUFFER,n),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,n)}resizeStencil(e){const t=this.renderer.gl;t.bindRenderbuffer(t.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?t.renderbufferStorageMultisample(t.RENDERBUFFER,4,t.DEPTH24_STENCIL8,e.width,e.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,e.width,e.height)}destroy(){}}ns.extension={type:[x.WebGLSystem],name:"renderTarget"};const we=[];we[ee.NONE]=void 0,we[ee.DISABLED]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilReadMask:0,stencilBack:{compare:"always",passOp:"keep"}},we[ee.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},we[ee.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},we[ee.RENDERING_MASK_REMOVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"decrement-clamp"}},we[ee.MASK_ACTIVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilBack:{compare:"equal",passOp:"keep"}};class is{constructor(e){this.stencilCache={enabled:!1,stencilReference:0},this.renderTargetStencilState={},e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this.gl=e,this.comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this.stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP}}onRenderTargetChange(e){this.activeRenderTarget=e;let t=this.renderTargetStencilState[e.uid];t||(t=this.renderTargetStencilState[e.uid]={stencilMode:ee.DISABLED,stencilReference:0}),this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const n=this.renderTargetStencilState[this.activeRenderTarget.uid];n.stencilMode=e,n.stencilReference=t;const i=we[e],s=this.gl;if(e===ee.DISABLED){this.stencilCache.enabled&&(this.stencilCache.enabled=!1,s.disable(s.STENCIL_TEST));return}this.stencilCache.enabled||(this.stencilCache.enabled=!0,s.enable(s.STENCIL_TEST)),s.stencilFunc(this.comparisonFuncMapping[i.stencilBack.compare],t,255),s.stencilOp(s.KEEP,s.KEEP,this.stencilOpsMapping[i.stencilBack.passOp])}destroy(){}}is.extension={type:[x.WebGLSystem],name:"stencil"};class Rg{}class Pu{constructor(e,t){this.program=e,this.uniformData=t,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}class jr extends re{constructor({buffer:e,offset:t,size:n}){super(),this.uid=Ke(),this.resourceType="bufferResource",this.resourceId=Ke(),this.bufferResource=!0,this.buffer=e,this.offset=t,this.size=n,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this.resourceId=Ke(),this.emit("change",this)}destroy(e=!1){e&&this.buffer.destroy(),this.buffer=null}}function ss(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}function os(r){const e=new Array(r);for(let t=0;t<e.length;t++)e[t]=!1;return e}function as(r,e){switch(r){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return os(2*e);case"bvec3":return os(3*e);case"bvec4":return os(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const kg={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function Eu(r){return kg[r]}let Yr=null;const Mu={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function ls(r,e){if(!Yr){const t=Object.keys(Mu);Yr={};for(let n=0;n<t.length;++n){const i=t[n];Yr[r[i]]=Mu[i]}}return Yr[e]}function Cu(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=e.getActiveAttrib(r,i);if(s.name.startsWith("gl_"))continue;const o=ls(e,s.type),a={type:o,name:s.name,size:Eu(o),location:e.getAttribLocation(r,s.name)};t[s.name]=a}return t}function Au(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_UNIFORM_BLOCKS);for(let i=0;i<n;i++){const s=e.getActiveUniformBlockName(r,i),o=e.getUniformBlockIndex(r,s),a=e.getActiveUniformBlockParameter(r,i,e.UNIFORM_BLOCK_DATA_SIZE);t[s]={name:s,index:o,size:a}}return t}function Bu(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const s=e.getActiveUniform(r,i),o=s.name.replace(/\[.*?\]$/,""),a=!!s.name.match(/\[.*?\]$/),l=ls(e,s.type);t[o]={name:o,index:i,type:l,size:s.size,isArray:a,value:as(l,s.size)}}return t}function Ru(r,e){const t=r.getShaderSource(e).split(`
`).map((h,u)=>`${u}: ${h}`),n=r.getShaderInfoLog(e),i=n.split(`
`),s={},o=i.map(h=>parseFloat(h.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(h=>h&&!s[h]?(s[h]=!0,!0):!1),a=[""];o.forEach(h=>{t[h-1]=`%c${t[h-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const l=t.join(`
`);a[0]=l,console.error(n),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function ku(r,e,t,n){r.getProgramParameter(e,r.LINK_STATUS)||(r.getShaderParameter(t,r.COMPILE_STATUS)||Ru(r,t),r.getShaderParameter(n,r.COMPILE_STATUS)||Ru(r,n),console.error("PixiJS Error: Could not initialize shader."),r.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",r.getProgramInfoLog(e)))}function Uu(r,e){const t=ss(r,r.VERTEX_SHADER,e.vertex),n=ss(r,r.FRAGMENT_SHADER,e.fragment),i=r.createProgram();r.attachShader(i,t),r.attachShader(i,n);const s=e.transformFeedbackVaryings;s&&(typeof r.transformFeedbackVaryings!="function"||r.transformFeedbackVaryings(i,s.names,s.bufferMode==="separate"?r.SEPARATE_ATTRIBS:r.INTERLEAVED_ATTRIBS)),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)||ku(r,i,t,n),e.attributeData=Cu(i,r),e.uniformData=Bu(i,r),e.uniformBlockData=Au(i,r),r.deleteShader(t),r.deleteShader(n);const o={};for(const a in e.uniformData){const l=e.uniformData[a];o[a]={location:r.getUniformLocation(i,a),value:as(l.type,l.size)}}return new Pu(i,o)}const tt={textureCount:0,blockIndex:0};class hs{constructor(e){this.programDataHash={},this.activeProgram=null,this.nextIndex=0,this.boundUniformsIdsToIndexHash={},this.boundIndexToUniformsHash={},this.renderer=e}contextChange(e){this.gl=e,this.maxBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}bind(e,t){if(this.setProgram(e.glProgram),t)return;tt.textureCount=0,tt.blockIndex=0;const n=this.gl,i=this.getProgramData(e.glProgram);for(const s in e.groups){const o=e.groups[s];for(const a in o.resources){const l=o.resources[a];if(l instanceof Y)l.ubo?this.bindUniformBlock(l,e.uniformBindMap[s][a],tt.blockIndex++):this.updateUniformGroup(l);else if(l instanceof jr)this.bindUniformBlock(l,e.uniformBindMap[s][a],tt.blockIndex++);else if(l instanceof ge){this.renderer.texture.bind(l,tt.textureCount);const h=e.uniformBindMap[s][a],u=i.uniformData[h];u&&n.uniform1i(u.location,tt.textureCount++)}else l instanceof De}}}updateUniformGroup(e){this.renderer.uniformGroup.updateUniformGroup(e,this.activeProgram,tt)}bindUniformBlock(e,t,n=0){const i=this.renderer.buffer,s=this.getProgramData(this.activeProgram),o=e.bufferResource;o&&this.renderer.uniformBuffer.updateUniformGroup(e),i.updateBuffer(e.buffer);let a=this.boundUniformsIdsToIndexHash[e.uid];if(a===void 0){const u=this.nextIndex++%this.maxBindings,c=this.boundIndexToUniformsHash[u];c&&(this.boundUniformsIdsToIndexHash[c.uid]=void 0),a=this.boundUniformsIdsToIndexHash[e.uid]=u,this.boundIndexToUniformsHash[u]=e,o?i.bindBufferRange(e.buffer,u,e.offset):i.bindBufferBase(e.buffer,u)}const l=this.gl,h=this.activeProgram.uniformBlockData[t].index;s.uniformBlockBindings[n]!==a&&(s.uniformBlockBindings[n]=a,l.uniformBlockBinding(s.program,h,a))}setProgram(e){if(this.activeProgram===e)return;this.activeProgram=e;const t=this.getProgramData(e);this.gl.useProgram(t.program)}getProgramData(e){const t=e.key;return this.programDataHash[t]||this.createProgramData(e)}createProgramData(e){const t=e.key;return this.programDataHash[t]=Uu(this.gl,e),this.programDataHash[t]}}hs.extension={type:[x.WebGLSystem],name:"shader"};let Zt;function Ug(){if(typeof Zt=="boolean")return Zt;try{Zt=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch(r){Zt=!1}return Zt}const Xr=[{test:r=>r.type==="float"&&r.size===1&&!r.isArray,code:r=>`
            if(uv["${r}"] !== ud["${r}"].value)
            {
                ud["${r}"].value = uv["${r}"]
                gl.uniform1f(ud["${r}"].location, uv["${r}"])
            }
            `},{test:(r,e)=>(r.type==="sampler2D"||r.type==="samplerCube"||r.type==="sampler2DArray")&&r.size===1&&!r.isArray&&(e==null||e instanceof k),code:r=>`t = syncData.textureCount++;

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
                }`}],Gg={float:`
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
    }`},Ig={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"};function Gu(r,e){const t=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(const n in r.uniforms){const i=e[n];if(!i){r.uniforms[n]instanceof Y?r.uniforms[n].ubo?t.push(`
                        renderer.shader.bindUniformBlock(uv.${n}, "${n}");
                    `):t.push(`
                        renderer.shader.updateUniformGroup(uv.${n});
                    `):r.uniforms[n]instanceof jr&&t.push(`
                        renderer.shader.bindBufferResource(uv.${n}, "${n}");
                    `);continue}const s=r.uniforms[n];let o=!1;for(let a=0;a<Xr.length;a++)if(Xr[a].test(i,s)){t.push(Xr[a].code(n,s)),o=!0;break}if(!o){const a=(i.size===1&&!i.isArray?Gg:Ig)[i.type].replace("location",`ud["${n}"].location`);t.push(`
            cu = ud["${n}"];
            cv = cu.value;
            v = uv["${n}"];
            ${a};`)}}return new Function("ud","uv","renderer","syncData",t.join(`
`))}class us{constructor(e){this.destroyed=!1,this.cache={},this.uniformGroupSyncHash={},this.renderer=e,this.systemCheck(),this.gl=null,this.cache={}}systemCheck(){if(!Ug())throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(e){this.gl=e}updateUniformGroup(e,t,n){const i=this.renderer.shader.getProgramData(t);(!e.isStatic||e.dirtyId!==i.uniformDirtyGroups[e.uid])&&(i.uniformDirtyGroups[e.uid]=e.dirtyId,this.getUniformSyncFunction(e,t)(i.uniformData,e.uniforms,this.renderer,n))}getUniformSyncFunction(e,t){var n;return((n=this.uniformGroupSyncHash[e.signature])==null?void 0:n[t.key])||this.createUniformSyncFunction(e,t)}createUniformSyncFunction(e,t){const n=this.uniformGroupSyncHash[e.signature]||(this.uniformGroupSyncHash[e.signature]={}),i=this.getSignature(e,t.uniformData,"u");return this.cache[i]||(this.cache[i]=Gu(e,t.uniformData)),n[t.key]=this.cache[i],n[t.key]}getSignature(e,t,n){const i=e.uniforms,s=[`${n}-`];for(const o in i)s.push(o),t[o]&&s.push(t[o].type);return s.join("-")}destroy(){this.renderer=null,this.destroyed=!0}}us.extension={type:[x.WebGLSystem],name:"uniformGroup"};function Iu(r){const e={};return e.normal=[r.ONE,r.ONE_MINUS_SRC_ALPHA],e.add=[r.ONE,r.ONE],e.multiply=[r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.screen=[r.ONE,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[r.SRC_ALPHA,r.ONE,r.ONE,r.ONE],e["screen-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e}const Fg=0,Og=1,Lg=2,Dg=3,$g=4,Ng=5,cs=class{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[Fg]=this.setBlend,this.map[Og]=this.setOffset,this.map[Lg]=this.setCullFace,this.map[Dg]=this.setDepthTest,this.map[$g]=this.setFrontFace,this.map[Ng]=this.setDepthMask,this.checks=[],this.defaultState=new _e,this.defaultState.blend=!0}contextChange(r){this.gl=r,this.blendModesMap=Iu(r),this.set(this.defaultState),this.reset()}set(r){if(r=r||this.defaultState,this.stateId!==r.data){let e=this.stateId^r.data,t=0;for(;e;)e&1&&this.map[t].call(this,!!(r.data&1<<t)),e=e>>1,t++;this.stateId=r.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,r)}forceState(r){r=r||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(r.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,r);this.stateId=r.data}setBlend(r){this.updateCheck(cs.checkBlendMode,r),this.gl[r?"enable":"disable"](this.gl.BLEND)}setOffset(r){this.updateCheck(cs.checkPolygonOffset,r),this.gl[r?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(r){this.gl[r?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(r){this.gl.depthMask(r)}setCullFace(r){this.gl[r?"enable":"disable"](this.gl.CULL_FACE)}setFrontFace(r){this.gl.frontFace(this.gl[r?"CW":"CCW"])}setBlendMode(r){if(this.blendModesMap[r]||(r="normal"),r===this.blendMode)return;this.blendMode=r;const e=this.blendModesMap[r],t=this.gl;e.length===2?t.blendFunc(e[0],e[1]):t.blendFuncSeparate(e[0],e[1],e[2],e[3]),e.length===6?(this._blendEq=!0,t.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD))}setPolygonOffset(r,e){this.gl.polygonOffset(r,e)}reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}updateCheck(r,e){const t=this.checks.indexOf(r);e&&t===-1?this.checks.push(r):!e&&t!==-1&&this.checks.splice(t,1)}static checkBlendMode(r,e){r.setBlendMode(e.blendMode)}static checkPolygonOffset(r,e){r.setPolygonOffset(1,e.polygonOffset)}destroy(){this.gl=null}};let ds=cs;ds.extension={type:[x.WebGLSystem],name:"state"};class Fu{constructor(e){this.target=qi.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=$.UNSIGNED_BYTE,this.internalFormat=Wr.RGBA,this.format=Wr.RGBA,this.samplerType=0}}const Ou={type:"image",upload(r,e,t){e.width===r.width||e.height===r.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,r.width,r.height,0,e.format,e.type,r.resource),e.width=r.width,e.height=r.height}},Lu={type:"image",upload(r,e,t){t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.alphaMode!==0),e.width===r.width||e.height===r.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,r.pixelWidth,r.pixelHeight,0,e.format,e.type,r.resource),e.width=r.pixelWidth,e.height=r.pixelHeight}};function Du(r){return{r8unorm:r.RED,r8snorm:r.RED,r8uint:r.RED,r8sint:r.RED,r16uint:r.RED,r16sint:r.RED,r16float:r.RED,rg8unorm:r.RG,rg8snorm:r.RG,rg8uint:r.RG,rg8sint:r.RG,r32uint:r.RED,r32sint:r.RED,r32float:r.RED,rg16uint:r.RG,rg16sint:r.RG,rg16float:r.RG,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.RGBA,rgba8snorm:r.RGBA,rgba8uint:r.RGBA,rgba8sint:r.RGBA,bgra8unorm:r.RGBA,"bgra8unorm-srgb":r.RGBA,rgb9e5ufloat:r.RGB,rgb10a2unorm:r.RGBA,rg11b10ufloat:r.RGB,rg32uint:r.RG,rg32sint:r.RG,rg32float:r.RG,rgba16uint:r.RGBA,rgba16sint:r.RGBA,rgba16float:r.RGBA,rgba32uint:r.RGBA,rgba32sint:r.RGBA,rgba32float:r.RGBA,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT,depth24plus:r.DEPTH_COMPONENT,"depth24plus-stencil8":r.DEPTH_STENCIL,depth32float:r.DEPTH_COMPONENT,"depth32float-stencil8":r.DEPTH_STENCIL}}function $u(r){return{r8unorm:r.R8,r8snorm:r.R8_SNORM,r8uint:r.R8UI,r8sint:r.R8I,r16uint:r.R16UI,r16sint:r.R16I,r16float:r.R16F,rg8unorm:r.RG8,rg8snorm:r.RG8_SNORM,rg8uint:r.RG8UI,rg8sint:r.RG8I,r32uint:r.R32UI,r32sint:r.R32I,r32float:r.R32F,rg16uint:r.RG16UI,rg16sint:r.RG16I,rg16float:r.RG16F,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.SRGB8_ALPHA8,rgba8snorm:r.RGBA8_SNORM,rgba8uint:r.RGBA8UI,rgba8sint:r.RGBA8I,bgra8unorm:r.RGBA8,"bgra8unorm-srgb":r.SRGB8_ALPHA8,rgb9e5ufloat:r.RGB9_E5,rgb10a2unorm:r.RGB10_A2,rg11b10ufloat:r.R11F_G11F_B10F,rg32uint:r.RG32UI,rg32sint:r.RG32I,rg32float:r.RG32F,rgba16uint:r.RGBA16UI,rgba16sint:r.RGBA16I,rgba16float:r.RGBA16F,rgba32uint:r.RGBA32UI,rgba32sint:r.RGBA32I,rgba32float:r.RGBA32F,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT16,depth24plus:r.DEPTH_COMPONENT24,"depth24plus-stencil8":r.DEPTH24_STENCIL8,depth32float:r.DEPTH_COMPONENT32F,"depth32float-stencil8":r.DEPTH32F_STENCIL8}}function Nu(r){return{r8unorm:r.UNSIGNED_BYTE,r8snorm:r.BYTE,r8uint:r.UNSIGNED_BYTE,r8sint:r.BYTE,r16uint:r.UNSIGNED_SHORT,r16sint:r.SHORT,r16float:r.HALF_FLOAT,rg8unorm:r.UNSIGNED_BYTE,rg8snorm:r.BYTE,rg8uint:r.UNSIGNED_BYTE,rg8sint:r.BYTE,r32uint:r.UNSIGNED_INT,r32sint:r.INT,r32float:r.FLOAT,rg16uint:r.UNSIGNED_SHORT,rg16sint:r.SHORT,rg16float:r.HALF_FLOAT,rgba8unorm:r.UNSIGNED_BYTE,"rgba8unorm-srgb":r.UNSIGNED_BYTE,rgba8snorm:r.BYTE,rgba8uint:r.UNSIGNED_BYTE,rgba8sint:r.BYTE,bgra8unorm:r.UNSIGNED_BYTE,"bgra8unorm-srgb":r.UNSIGNED_BYTE,rgb9e5ufloat:r.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:r.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:r.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:r.UNSIGNED_INT,rg32sint:r.INT,rg32float:r.FLOAT,rgba16uint:r.UNSIGNED_SHORT,rgba16sint:r.SHORT,rgba16float:r.HALF_FLOAT,rgba32uint:r.UNSIGNED_INT,rgba32sint:r.INT,rgba32float:r.FLOAT,stencil8:r.UNSIGNED_BYTE,depth16unorm:r.UNSIGNED_SHORT,depth24plus:r.UNSIGNED_INT,"depth24plus-stencil8":r.UNSIGNED_INT_24_8,depth32float:r.FLOAT,"depth32float-stencil8":r.FLOAT_32_UNSIGNED_INT_24_8_REV}}const fs={linear:9729,nearest:9728},zu={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},qr={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},Wu={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};class ps{constructor(e){this.glTextures={},this.glSamplers={},this.boundTextures=[],this.boundTexturesSamplers=[],this.activeTextureLocation=-1,this.boundSamplers={},this.managedTextureSources={},this.uploads={image:Lu,buffer:Ou},this.renderer=e}contextChange(e){this.gl=e,this.mapFormatToInternalFormat||(this.mapFormatToInternalFormat=$u(e),this.mapFormatToType=Nu(e),this.mapFormatToFormat=Du(e));for(let t=0;t<16;t++)this.bind(k.EMPTY,t)}bind(e,t=0){e?(this.bindSource(e.source,t),this.bindSampler(e.style,t)):(this.bindSource(null,t),this.bindSampler(null,t))}bindSource(e,t=0){const n=this.gl;if(this.boundTextures[t]!==e){this.boundTextures[t]=e,this.activateLocation(t),e=e||k.EMPTY.source;const i=this.getGlSource(e);n.bindTexture(i.target,i.texture)}}bindSampler(e,t=0){const n=this.gl;if(!e){this.boundSamplers[t]=null,n.bindSampler(t,null);return}const i=this.getGlSampler(e);this.boundSamplers[t]!==i&&(this.boundSamplers[t]=i,n.bindSampler(t,i))}unbind(e){const t=e.source,n=this.boundTextures,i=this.gl;for(let s=0;s<n.length;s++)if(n[s]===t){this.activateLocation(s);const o=this.getGlSource(t);i.bindTexture(o.target,null),n[s]=null}}activateLocation(e){this.activeTextureLocation!==e&&(this.activeTextureLocation=e,this.gl.activeTexture(this.gl.TEXTURE0+e))}initSource(e){const t=this.gl,n=new Fu(t.createTexture());if(n.type=this.mapFormatToType[e.format],n.internalFormat=this.mapFormatToInternalFormat[e.format],n.format=this.mapFormatToFormat[e.format],e.autoGenerateMipmaps){const i=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(i))+1}return this.glTextures[e.uid]=n,e.on("update",this.onSourceUpdate,this),e.on("destroy",this.onSourceDestroy,this),this.onSourceUpdate(e),n}onSourceUpdate(e){const t=this.gl,n=this.glTextures[e.uid];t.bindTexture(t.TEXTURE_2D,n.texture),this.boundTextures[this.activeTextureLocation]=e,this.uploads[e.type]?(this.uploads[e.type].upload(e,n,this.gl),e.autoGenerateMipmaps&&e.mipLevelCount>1&&t.generateMipmap(n.target)):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.pixelWidth,e.pixelHeight,0,t.RGBA,t.UNSIGNED_BYTE,null)}onSourceDestroy(e){const t=this.gl;e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this);const n=this.glTextures[e.uid];delete this.glTextures[e.uid],t.deleteTexture(n.target)}initSampler(e){const t=this.gl,n=this.gl.createSampler();if(this.glSamplers[e.resourceId]=n,t.samplerParameteri(n,t.TEXTURE_WRAP_S,qr[e.addressModeU]),t.samplerParameteri(n,t.TEXTURE_WRAP_T,qr[e.addressModeV]),t.samplerParameteri(n,t.TEXTURE_WRAP_R,qr[e.addressModeW]),t.samplerParameteri(n,t.TEXTURE_MAG_FILTER,fs[e.minFilter]),this.boundTextures[this.activeTextureLocation].mipLevelCount>1){const s=zu[e.minFilter][e.mipmapFilter];t.samplerParameteri(n,t.TEXTURE_MIN_FILTER,s)}else t.samplerParameteri(n,t.TEXTURE_MIN_FILTER,fs[e.magFilter]);const i=this.renderer.context.extensions.anisotropicFiltering;if(i&&e.maxAnisotropy>1){const s=Math.min(e.maxAnisotropy,t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));t.samplerParameteri(n,i.TEXTURE_MAX_ANISOTROPY_EXT,s)}return e.compare&&t.samplerParameteri(n,t.TEXTURE_COMPARE_FUNC,Wu[e.compare]),this.glSamplers[e.resourceId]}getGlSampler(e){return this.glSamplers[e.resourceId]||this.initSampler(e)}getGlSource(e){return this.glTextures[e.uid]||this.initSource(e)}destroy(){throw new Error("Method not implemented.")}}ps.extension={type:[x.WebGLSystem],name:"texture"};var zg=Object.defineProperty,Hu=Object.getOwnPropertySymbols,Wg=Object.prototype.hasOwnProperty,Hg=Object.prototype.propertyIsEnumerable,Vu=(r,e,t)=>e in r?zg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ju=(r,e)=>{for(var t in e||(e={}))Wg.call(e,t)&&Vu(r,t,e[t]);if(Hu)for(var t of Hu(e))Hg.call(e,t)&&Vu(r,t,e[t]);return r};const Vg=["init","destroy","contextChange","reset","renderEnd","renderStart","render","update","postrender","prerender"];class ms{constructor(e){this.runners={},this.renderPipes={},this._systemsHash={};var t;this.type=e.type;const n=[...Vg,...(t=e.runners)!=null?t:[]];this.addRunners(...n),this.addSystems(e.systems),this.addPipes(e.renderPipes,e.renderPipeAdaptors)}async init(e={}){for(const t in this._systemsHash){const n=this._systemsHash[t].constructor.defaultOptions;e=ju(ju({},n),e)}for(let t=0;t<this.runners.init.items.length;t++)await this.runners.init.items[t].init(e)}render(e){e instanceof Q&&(ni("8","passing Container as argument is deprecated, please use render options instead"),e={container:e,target:arguments[1]}),e.target=e.target||this.view.texture,this._lastObjectRendered=e.container,this.runners.prerender.emit(e),this.runners.renderStart.emit(e),this.runners.render.emit(e),this.runners.renderEnd.emit(e),this.runners.postrender.emit(e)}resize(e,t,n){this.view.resize(e,t,n)}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e}get width(){return this.view.texture.frameWidth}get height(){return this.view.texture.frameHeight}get element(){return this.view.element}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}addRunners(...e){e.forEach(t=>{this.runners[t]=new Hr(t)})}addSystems(e){let t;for(t in e){const n=e[t];this.addSystem(n.value,n.name)}}addSystem(e,t){const n=new e(this);if(this[t])throw new Error(`Whoops! The name "${t}" is already in use`);this[t]=n,this._systemsHash[t]=n;for(const i in this.runners)this.runners[i].add(n);return this}addPipes(e,t){const n=t.reduce((i,s)=>(i[s.name]=s.value,i),{});e.forEach(i=>{const s=i.value,o=i.name,a=n[o];this.renderPipes[o]=new s(this,a?new a:null)})}destroy(){Object.values(this.runners).forEach(e=>{e.destroy()}),this._systemsHash=null,this.renderPipes=null,this.runners=null}}class Kr extends re{constructor({original:e,view:t}){super(),this.uid=On(),this.didViewUpdate=!1,this.view=t,e&&this.init(e)}init(e){this.original=e,this.layerTransform=e.layerTransform}get layerColor(){return this.original.layerColor}get layerBlendMode(){return this.original.layerBlendMode}get layerVisibleRenderable(){return this.original.layerVisibleRenderable}get isRenderable(){return this.original.isRenderable}}class gs extends Ht{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}var Yu=`precision lowp float;

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
`,Xu=`precision lowp float;

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
`,vs=`struct GlobalUniforms {
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

}`;class qu extends Me{constructor(e){const t=xe.from({vertex:Xu,fragment:Yu,name:"tiling-sprite"}),n=ue.from({vertex:{source:vs,entryPoint:"mainVertex"},fragment:{source:vs,entryPoint:"mainFragment"}}),i=new Y({uMapCoord:{value:new B,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new B,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,200,.5,.5]),type:"vec4<f32>"}});super({glProgram:t,gpuProgram:n,resources:{tilingUniforms:i,uTexture:e.texture.source,uSampler:e.texture.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.style)}}const jg=new gs;class bs{constructor(e){this.renderableHash={},this.gpuBatchedTilingSprite={},this.gpuTilingSprite={},this.renderer=e}validateRenderable(e){const t=e.view.texture.textureMatrix;let n=!1;const i=this.getRenderableData(e);return i.batched!==t.isSimple&&(i.batched=t.isSimple,n=!0),n}addRenderable(e,t){e.view.didUpdate&&(e.view.didUpdate=!1,this.rebuild(e));const{batched:n}=this.getRenderableData(e);if(n){const i=this.getBatchedTilingSprite(e);this.renderer.renderPipes.mesh.addRenderable(i,t)}else{const i=this.getGpuTilingSprite(e);this.renderer.renderPipes.mesh.addRenderable(i.meshRenderable,t)}}updateRenderable(e){e.view.didUpdate&&(e.view.didUpdate=!1,this.rebuild(e));const{batched:t}=this.getRenderableData(e);if(t){const n=this.getBatchedTilingSprite(e);this.renderer.renderPipes.mesh.updateRenderable(n)}else{const n=this.getGpuTilingSprite(e);this.renderer.renderPipes.mesh.updateRenderable(n.meshRenderable)}}destroyRenderable(e){this.renderableHash[e.uid]=null,this.gpuTilingSprite[e.uid]=null,this.gpuBatchedTilingSprite[e.uid]=null}getRenderableData(e){return this.renderableHash[e.uid]||this.initRenderableData(e)}initRenderableData(e){const t={batched:!0};return this.renderableHash[e.uid]=t,this.validateRenderable(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}rebuild(e){const t=this.getRenderableData(e),n=e.view,i=n.texture.textureMatrix;if(t.batched){const s=this.getBatchedTilingSprite(e);s.view.texture=n.texture,n.texture.style.addressMode="repeat",n.texture.style.update(),this.updateBatchPositions(e),this.updateBatchUvs(e)}else{const s=this.getGpuTilingSprite(e),{meshRenderable:o}=s,a=o.view;a.shader.texture=n.texture;const l=a.shader.resources.tilingUniforms,h=n.width,u=n.height,c=n.texture.width,d=n.texture.height,f=n.tileTransform.matrix,p=l.uniforms.uTextureTransform;p.set(f.a*c/h,f.b*c/u,f.c*d/h,f.d*d/u,f.tx/h,f.ty/u),p.invert(),l.uniforms.uMapCoord=i.mapCoord,l.uniforms.uClampFrame=i.uClampFrame,l.uniforms.uClampOffset=i.uClampOffset,l.uniforms.uTextureTransform=p,l.uniforms.uSizeAnchor[0]=h,l.uniforms.uSizeAnchor[1]=u,l.uniforms.uSizeAnchor[2]=e.view.anchor.x,l.uniforms.uSizeAnchor[3]=e.view.anchor.y,l.update()}}getGpuTilingSprite(e){return this.gpuTilingSprite[e.uid]||this.initGpuTilingSprite(e)}initGpuTilingSprite(e){const t=e.view;t.texture.style.addressMode="repeat",t.texture.style.update();const n=new Vt({geometry:jg,shader:new qu({texture:t.texture})}),i=new Kr({original:e,view:n}),s=new B,o={meshRenderable:i,textureMatrix:s};return this.gpuTilingSprite[e.uid]=o,o}getBatchedTilingSprite(e){return this.gpuBatchedTilingSprite[e.uid]||this.initBatchedTilingSprite(e)}initBatchedTilingSprite(e){const t=new Vt({geometry:new gs,texture:e.view.texture}),n=new Kr({original:e,view:t});return this.gpuBatchedTilingSprite[e.uid]=n,n}updateBatchPositions(e){const t=this.getBatchedTilingSprite(e),n=e.view,i=t.view.geometry.getBuffer("aPosition").data,s=n.anchor.x,o=n.anchor.y;i[0]=-s*n.width,i[1]=-o*n.height,i[2]=(1-s)*n.width,i[3]=-o*n.height,i[4]=(1-s)*n.width,i[5]=(1-o)*n.height,i[6]=-s*n.width,i[7]=(1-o)*n.height}updateBatchUvs(e){const t=e.view,n=t.texture.frameWidth,i=t.texture.frameHeight,s=this.getBatchedTilingSprite(e).view.geometry.getBuffer("aUV").data;let o=0,a=0;t.applyAnchorToTexture&&(o=t.anchor.x,a=t.anchor.y),s[0]=s[6]=-o,s[2]=s[4]=1-o,s[1]=s[3]=-a,s[5]=s[7]=1-a;const l=B.shared;l.copyFrom(t.tileTransform.matrix),l.tx/=t.width,l.ty/=t.height,l.invert(),l.scale(t.width/n,t.height/i),Ku(s,2,0,l)}destroy(){this.renderableHash=null,this.gpuTilingSprite=null,this.gpuBatchedTilingSprite=null,this.renderer=null}}bs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"tilingSprite"};function Ku(r,e,t,n){let i=0;const s=r.length/(e||2),o=n.a,a=n.b,l=n.c,h=n.d,u=n.tx,c=n.ty;for(t*=e;i<s;){const d=r[t],f=r[t+1];r[t]=o*d+l*f+u,r[t+1]=a*d+h*f+c,t+=e,i++}}function ys(r,e){const t=r.instructionSet,n=t.instructions;for(let i=0;i<t.instructionSize;i++){const s=n[i];e[s.type].execute(s)}}class xs{constructor(e){this.renderer=e}addLayerGroup(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this.renderer.globalUniforms.push({projectionMatrix:this.renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:e.worldTransform,worldColor:e.worldColor}),ys(e,this.renderer.renderPipes),this.renderer.globalUniforms.pop())}destroy(){this.renderer=null}}xs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"layer"};function ws(r,e=[]){e.push(r);for(let t=0;t<r.layerGroupChildren.length;t++)ws(r.layerGroupChildren[t],e);return e}const Yg=new Q;function _s(r,e=!1){Zu(r);const t=r.childrenToUpdate,n=r.updateTick;r.updateTick++;for(const i in t){const s=t[i],o=s.list,a=s.index;for(let l=0;l<a;l++)Ts(o[l],n,0);s.index=0}if(e)for(let i=0;i<r.layerGroupChildren.length;i++)_s(r.layerGroupChildren[i],e)}function Zu(r){r.layerGroupParent?(r.worldTransform.appendFrom(r.root.layerTransform,r.layerGroupParent.worldTransform),r.worldColor=Ir(r.root.layerColor,r.layerGroupParent.worldColor)):(r.worldTransform.copyFrom(r.root.layerTransform),r.worldColor=r.root.localColor)}function Ts(r,e,t){if(e===r.updateTick)return;r.updateTick=e,r.didChange=!1;const n=r.localTransform;Pe(n,r);const i=r.parent;if(i&&!i.isLayerRoot?(t=t|r.updateFlags,r.layerTransform.appendFrom(n,i.layerTransform),t&&Qu(r,i,t)):(t=r.updateFlags,r.layerTransform.copyFrom(n),t&&Qu(r,Yg,t)),!r.isLayerRoot){const s=r.children,o=s.length;for(let l=0;l<o;l++)Ts(s[l],e,t);const a=r.layerGroup;r.view&&!a.structureDidChange&&a.updateRenderable(r)}}function Qu(r,e,t){t&wr&&(r.layerColor=Ir(r.localColor,e.layerColor)),t&Ln&&(r.layerBlendMode=r.localBlendMode==="inherit"?e.layerBlendMode:r.localBlendMode),t&_r&&(r.layerVisibleRenderable=r.localVisibleRenderable&e.layerVisibleRenderable),r.updateFlags=0}function Ju(r,e){const{list:t,index:n}=r.childrenRenderablesToUpdate;let i=!1;for(let s=0;s<n;s++){const o=t[s],a=o.view;if(i=e[a.type].validateRenderable(o),i)break}return r.structureDidChange=i,i&&(r.childrenRenderablesToUpdate.index=0),i}class Ss{constructor(e){this.renderer=e}render({container:e}){e.layer=!0;const t=this.renderer,n=ws(e.layerGroup,[]),i=t.renderPipes;for(let s=0;s<n.length;s++){const o=n[s];o.runOnRender(),o.instructionSet.renderPipes=i,o.structureDidChange||Ju(o,i),_s(o),o.structureDidChange?(o.structureDidChange=!1,iu(o,i)):Xg(o),t.renderPipes.batch.upload(o.instructionSet)}t.globalUniforms.start({projectionMatrix:t.renderTarget.rootProjectionMatrix,worldTransformMatrix:e.layerGroup.worldTransform}),ys(e.layerGroup,i),i.uniformBatch&&(i.uniformBatch.renderEnd(),i.uniformBuffer.renderEnd())}destroy(){}}Ss.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"layer"};function Xg(r){const{list:e,index:t}=r.childrenRenderablesToUpdate;for(let n=0;n<t;n++){const i=e[n];i.didViewUpdate&&r.updateRenderable(i)}r.childrenRenderablesToUpdate.index=0}class Ps{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null}get blendMode(){return this.sprite.layerBlendMode}packAttributes(e,t,n,i){const s=this.sprite,o=this.texture,a=s.layerTransform,l=a.a,h=a.b,u=a.c,c=a.d,d=a.tx,f=a.ty,p=this.bounds,g=p[0],m=p[1],y=p[2],b=p[3],v=o._layout.uvs,w=s.layerColor;e[n++]=l*m+u*b+d,e[n++]=c*b+h*m+f,e[n++]=v.x0,e[n++]=v.y0,t[n++]=w,e[n++]=i,e[n++]=l*g+u*b+d,e[n++]=c*b+h*g+f,e[n++]=v.x1,e[n++]=v.y1,t[n++]=w,e[n++]=i,e[n++]=l*g+u*y+d,e[n++]=c*y+h*g+f,e[n++]=v.x2,e[n++]=v.y2,t[n++]=w,e[n++]=i,e[n++]=l*m+u*y+d,e[n++]=c*y+h*m+f,e[n++]=v.x3,e[n++]=v.y3,t[n++]=w,e[n++]=i}packIndex(e,t,n){e[t++]=n+0,e[t++]=n+1,e[t++]=n+2,e[t++]=n+0,e[t++]=n+2,e[t++]=n+3}reset(){this.sprite=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}let yt;class Es{constructor(e){this.gpuSpriteHash={},this.renderer=e,yt=this.gpuSpriteHash}addRenderable(e,t){const n=this.getGpuSprite(e);e.view.didUpdate&&this.updateBatchableSprite(e,n),this.renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){const t=yt[e.uid];e.view.didUpdate&&this.updateBatchableSprite(e,t),t.batcher.updateElement(t)}validateRenderable(e){const t=e.view._texture,n=this.getGpuSprite(e);return n.texture._source!==t._source?!n.batcher.checkAndUpdateTexture(n,t):!1}destroyRenderable(e){const t=yt[e.uid];H.return(t),yt[e.uid]=null}updateBatchableSprite(e,t){const n=e.view;n.didUpdate=!1,t.bounds=n.bounds,t.texture=n._texture}getGpuSprite(e){return yt[e.uid]||this.initGPUSprite(e)}initGPUSprite(e){const t=H.get(Ps);return t.sprite=e,t.texture=e.view._texture,t.bounds=e.view.bounds,yt[e.uid]=t,e.view.didUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this.gpuSpriteHash)H.return(this.gpuSpriteHash[e]);this.gpuSpriteHash=null,this.renderer=null}}Es.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"sprite"};var ec=`in vec2 vTextureCoord;
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
`,tc=`precision highp float;
in vec2 aPosition;
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
`;function rc(r){return Er({vertexSrc:tc,fragmentSrc:ec,maxTextures:r,name:"sdf"})}var Ms=`struct GlobalUniforms {
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
`;function nc(r){return Cr({vertex:{source:Ms,entryPoint:"mainVertex"},fragment:{source:Ms,entryPoint:"mainFragment"},maxTextures:r})}class ic extends ye{constructor(){const e=new Y({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new B,type:"mat3x3<f32>"},distance:{value:4,type:"f32"}});super({glProgram:rc(ce),gpuProgram:nc(ce),resources:{localUniforms:e,batchSamplers:Mr}})}}function Zr(r,e=[]){return e[0]=(r>>16&255)/255,e[1]=(r>>8&255)/255,e[2]=(r&255)/255,e}function sc(r){let e=r.toString(16);return e="000000".substring(0,6-e.length)+e,`#${e}`}function qg(r){return typeof r=="string"&&r[0]==="#"&&(r=r.slice(1)),parseInt(r,16)}function Kg(r){return(r[0]*255<<16)+(r[1]*255<<8)+(r[2]*255|0)}class oc{constructor(e){this.poolKeyHash={},this.canvasPool={},this.canvasOptions=e||{},this.enableFullScreen=!1}createCanvasAndContext(e,t){const n=F.ADAPTER.createCanvas();n.width=e,n.height=t;const i=n.getContext("2d");return{canvas:n,context:i}}getOptimalCanvasAndContext(e,t,n=1){e=Math.ceil(e*n-1e-6),t=Math.ceil(t*n-1e-6),e=Ze(e),t=Ze(t);const i=(e<<17)+(t<<1);this.canvasPool[i]||(this.canvasPool[i]=[]);let s=this.canvasPool[i].pop();return s||(s=this.createCanvasAndContext(e,t)),s}returnCanvasAndContext(e){const{width:t,height:n}=e.canvas,i=(t<<17)+(n<<1);this.canvasPool[i].push(e)}clear(){this.canvasPool={}}}const Qt=new oc;var xt=(r=>(r[r.NPM=0]="NPM",r[r.UNPACK=1]="UNPACK",r[r.PMA=2]="PMA",r[r.NO_PREMULTIPLIED_ALPHA=0]="NO_PREMULTIPLIED_ALPHA",r[r.PREMULTIPLY_ON_UPLOAD=1]="PREMULTIPLY_ON_UPLOAD",r[r.PREMULTIPLIED_ALPHA=2]="PREMULTIPLIED_ALPHA",r))(xt||{}),ac=(r=>(r[r.NONE=0]="NONE",r[r.LOW=2]="LOW",r[r.MEDIUM=4]="MEDIUM",r[r.HIGH=8]="HIGH",r))(ac||{});const Zg=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function Jt(r){const e=typeof r.fontSize=="number"?`${r.fontSize}px`:r.fontSize;let t=r.fontFamily;Array.isArray(r.fontFamily)||(t=r.fontFamily.split(","));for(let n=t.length-1;n>=0;n--){let i=t[n].trim();!/([\"\'])[^\'\"]+\1/.test(i)&&!Zg.includes(i)&&(i=`"${i}"`),t[n]=i}return`${r.fontStyle} ${r.fontVariant} ${r.fontWeight} ${e} ${t.join(",")}`}const Cs={willReadFrequently:!0},M=class{static get experimentalLetterSpacingSupported(){let r=M._experimentalLetterSpacingSupported;if(r!==void 0){const e=F.ADAPTER.getCanvasRenderingContext2D().prototype;r=M._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return r}constructor(r,e,t,n,i,s,o,a,l){this.text=r,this.style=e,this.width=t,this.height=n,this.lines=i,this.lineWidths=s,this.lineHeight=o,this.maxLineWidth=a,this.fontProperties=l}static measureText(r=" ",e,t=M._canvas,n=e.wordWrap){var i;const s=`${r}:${e.styleKey}`;if(M._measurementCache[s])return M._measurementCache[s];const o=Jt(e),a=M.measureFont(o);a.fontSize===0&&(a.fontSize=e.fontSize,a.ascent=e.fontSize);const l=M.__context;l.font=o;const h=(n?M.wordWrap(r,e,t):r).split(/(?:\r\n|\r|\n)/),u=new Array(h.length);let c=0;for(let m=0;m<h.length;m++){const y=M._measureText(h[m],e.letterSpacing,l);u[m]=y,c=Math.max(c,y)}const d=((i=e.stroke)==null?void 0:i.width)||0;let f=c+d;e.dropShadow&&(f+=e.dropShadow.distance);const p=e.lineHeight||a.fontSize+d;let g=Math.max(p,a.fontSize+d*2)+(h.length-1)*(p+e.leading);return e.dropShadow&&(g+=e.dropShadow.distance),new M(r,e,f,g,h,u,p+e.leading,c,a)}static _measureText(r,e,t){let n=!1;M.experimentalLetterSpacingSupported&&(M.experimentalLetterSpacing?(t.letterSpacing=`${e}px`,t.textLetterSpacing=`${e}px`,n=!0):(t.letterSpacing="0px",t.textLetterSpacing="0px"));let i=t.measureText(r).width;return i>0&&(n?i-=e:i+=(M.graphemeSegmenter(r).length-1)*e),i}static wordWrap(r,e,t=M._canvas){const n=t.getContext("2d",Cs);let i=0,s="",o="";const a=Object.create(null),{letterSpacing:l,whiteSpace:h}=e,u=M.collapseSpaces(h),c=M.collapseNewlines(h);let d=!u;const f=e.wordWrapWidth+l,p=M.tokenize(r);for(let g=0;g<p.length;g++){let m=p[g];if(M.isNewline(m)){if(!c){o+=M.addLine(s),d=!u,s="",i=0;continue}m=" "}if(u){const b=M.isBreakingSpace(m),v=M.isBreakingSpace(s[s.length-1]);if(b&&v)continue}const y=M.getFromCache(m,l,a,n);if(y>f)if(s!==""&&(o+=M.addLine(s),s="",i=0),M.canBreakWords(m,e.breakWords)){const b=M.wordWrapSplit(m);for(let v=0;v<b.length;v++){let w=b[v],P=w,A=1;for(;b[v+A];){const E=b[v+A];if(!M.canBreakChars(P,E,m,v,e.breakWords))w+=E;else break;P=E,A++}v+=A-1;const C=M.getFromCache(w,l,a,n);C+i>f&&(o+=M.addLine(s),d=!1,s="",i=0),s+=w,i+=C}}else{s.length>0&&(o+=M.addLine(s),s="",i=0);const b=g===p.length-1;o+=M.addLine(m,!b),d=!1,s="",i=0}else y+i>f&&(d=!1,o+=M.addLine(s),s="",i=0),(s.length>0||!M.isBreakingSpace(m)||d)&&(s+=m,i+=y)}return o+=M.addLine(s,!1),o}static addLine(r,e=!0){return r=M.trimRight(r),r=e?`${r}
`:r,r}static getFromCache(r,e,t,n){let i=t[r];return typeof i!="number"&&(i=M._measureText(r,e,n)+e,t[r]=i),i}static collapseSpaces(r){return r==="normal"||r==="pre-line"}static collapseNewlines(r){return r==="normal"}static trimRight(r){if(typeof r!="string")return"";for(let e=r.length-1;e>=0;e--){const t=r[e];if(!M.isBreakingSpace(t))break;r=r.slice(0,-1)}return r}static isNewline(r){return typeof r!="string"?!1:M._newlines.includes(r.charCodeAt(0))}static isBreakingSpace(r,e){return typeof r!="string"?!1:M._breakingSpaces.includes(r.charCodeAt(0))}static tokenize(r){const e=[];let t="";if(typeof r!="string")return e;for(let n=0;n<r.length;n++){const i=r[n],s=r[n+1];if(M.isBreakingSpace(i,s)||M.isNewline(i)){t!==""&&(e.push(t),t=""),e.push(i);continue}t+=i}return t!==""&&e.push(t),e}static canBreakWords(r,e){return e}static canBreakChars(r,e,t,n,i){return!0}static wordWrapSplit(r){return M.graphemeSegmenter(r)}static measureFont(r){if(M._fonts[r])return M._fonts[r];const e=M._context;e.font=r;const t=e.measureText(M.METRICS_STRING+M.BASELINE_SYMBOL),n={ascent:t.actualBoundingBoxAscent,descent:t.actualBoundingBoxDescent,fontSize:t.actualBoundingBoxAscent+t.actualBoundingBoxDescent};return M._fonts[r]=n,n}static clearMetrics(r=""){r?delete M._fonts[r]:M._fonts={}}static get _canvas(){if(!M.__canvas){let r;try{const e=new OffscreenCanvas(0,0),t=e.getContext("2d",Cs);if(t!=null&&t.measureText)return M.__canvas=e,e;r=F.ADAPTER.createCanvas()}catch(e){r=F.ADAPTER.createCanvas()}r.width=r.height=10,M.__canvas=r}return M.__canvas}static get _context(){return M.__context||(M.__context=M._canvas.getContext("2d",Cs)),M.__context}};let Z=M;Z.METRICS_STRING="|\xC9q\xC5",Z.BASELINE_SYMBOL="M",Z.BASELINE_MULTIPLIER=1.4,Z.HEIGHT_MULTIPLIER=2,Z.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const r=new Intl.Segmenter;return e=>[...r.segment(e)].map(t=>t.segment)}return r=>[...r]})(),Z.experimentalLetterSpacing=!1,Z._fonts={},Z._newlines=[10,13],Z._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],Z._measurementCache={};function er(r,e){if(r.texture===k.WHITE&&!r.fill)return fr(r.color);if(r.fill){if(r.fill instanceof mr){const t=r.fill,n=e.createPattern(t.texture.source.resource,"repeat"),i=t.transform.copyTo(B.shared);return i.scale(t.texture.frameWidth,t.texture.frameHeight),n.setTransform(i),n}else if(r.fill instanceof lt){const t=r.fill;if(t.type==="linear"){const n=e.createLinearGradient(t.x0,t.y0,t.x1,t.y1);return t.gradientStops.forEach(i=>{n.addColorStop(i.offset,fr(i.color))}),n}}}else{const t=e.createPattern(r.texture.source.resource,"repeat"),n=r.matrix.copyTo(B.shared);return n.scale(r.texture.frameWidth,r.texture.frameHeight),t.setTransform(n),t}return console.warn("[PixiJS] FillStyle not recognised",r),"red"}var Qg=Object.defineProperty,lc=Object.getOwnPropertySymbols,Jg=Object.prototype.hasOwnProperty,ev=Object.prototype.propertyIsEnumerable,hc=(r,e,t)=>e in r?Qg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,tr=(r,e)=>{for(var t in e||(e={}))Jg.call(e,t)&&hc(r,t,e[t]);if(lc)for(var t of lc(e))ev.call(e,t)&&hc(r,t,e[t]);return r};const uc=["fontFamily","fontStyle","fontVariant","fontWeight","breakWords","align","leading","letterSpacing","lineHeight","textBaseline","whiteSpace","wordWrap","wordWrapWidth","padding"],wt=class extends re{constructor(r={}){super();const e=tr(tr({},wt.defaultTextStyle),r);for(const t in wt.defaultTextStyle){const n=t;this[n]=e[t]}this.dropShadow=null,typeof e.fill=="string"?this.fontSize=parseInt(e.fontSize,10):this.fontSize=e.fontSize,r.dropShadow&&(r.dropShadow instanceof Boolean?r.dropShadow===!0&&(this.dropShadow=tr({},wt.defaultTextStyle.dropShadow)):this.dropShadow=tr(tr({},wt.defaultTextStyle.dropShadow),r.dropShadow)),this.update()}generateKey(){const r=[];let e=0;for(let t=0;t<uc.length;t++){const n=uc[t];r[e++]=this[n]}return e=cc(this._fill,r,e),e=tv(this._stroke,r,e),this._styleKey=r.join("-"),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}get fill(){return this._originalFill}set fill(r){r!==this._fill&&(this._originalFill=r,this._fill=kt(r,Re.defaultFillStyle))}get stroke(){return this._originalStroke}set stroke(r){r!==this._fill&&(this._originalFill=r,this._stroke=kt(r,Re.defaultStrokeStyle))}get styleKey(){return this._styleKey||this.generateKey()}clone(){return new wt({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(r=!1){var e,t,n,i;if(this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const s=typeof r=="boolean"?r:r==null?void 0:r.textureSource;(e=this._fill)!=null&&e.texture&&this._fill.texture.destroy(s),(t=this._originalFill)!=null&&t.texture&&this._originalFill.texture.destroy(s),(n=this._stroke)!=null&&n.texture&&this._stroke.texture.destroy(s),(i=this._originalStroke)!=null&&i.texture&&this._originalStroke.texture.destroy(s)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}};let ke=wt;ke.defaultTextStyle={align:"left",breakWords:!1,dropShadow:{alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5},fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};function cc(r,e,t){var n;return r&&(e[t++]=r.color,e[t++]=r.alpha,e[t++]=(n=r.fill)==null?void 0:n.uid),t}function tv(r,e,t){return r&&(t=cc(r,e,t),e[t++]=r.width,e[t++]=r.alignment,e[t++]=r.cap,e[t++]=r.join,e[t++]=r.miterLimit),t}function dc(r){typeof r=="string"&&(r=[r]);const e=[];for(let t=0,n=r.length;t<n;t++){const i=r[t];if(Array.isArray(i)){if(i.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);const s=i[0].charCodeAt(0),o=i[1].charCodeAt(0);if(o<s)throw new Error("[BitmapFont]: Invalid character range.");for(let a=s,l=o;a<=l;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(i))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}class fc extends re{constructor(e){super(),this.baseRenderedFontSize=100,this.baseMeasurementFontSize=100,this.padding=4,this.baseLineOffset=0,this.pages=[],this.chars={},this.lineHeight=0,this.measureCache={},this.currentChars=[],this.dynamic=!0,this.currentX=0,this.currentY=0,this.currentPageIndex=-1,this.resolution=1,this.distanceField={fieldType:"none",distanceRange:0},this.pages=[];const t=e;this.dynamic=!0;let n;t.style instanceof ke?n=t.style.clone():n=new ke(t.style),n.fontSize=this.baseMeasurementFontSize,t.overrideFill&&(n._fill.color=16777215,n._fill.alpha=1,n._fill.texture=k.WHITE,n._fill.fill=null),this.style=n;const i=Jt(n);this.fontMetrics=Z.measureFont(i),this.lineHeight=n.lineHeight||this.fontMetrics.fontSize||n.fontSize}ensureCharacters(e){var t,n,i,s;const o=dc(e).filter(v=>!this.currentChars.includes(v)).filter((v,w,P)=>P.indexOf(v)===w);if(!o.length)return;this.currentChars=[...this.currentChars,...o];let a;this.currentPageIndex===-1?a=this.nextPage():a=this.pages[this.currentPageIndex];let{canvas:l,context:h}=a.canvasAndContext,u=a.texture.source;const c=this.style;let d=this.currentX,f=this.currentY;const p=this.baseRenderedFontSize/this.baseMeasurementFontSize,g=this.padding*p,m=c.fontStyle==="italic"?2:1;let y=0,b=!1;for(let v=0;v<o.length;v++){const w=o[v],P=Z.measureText(w,c,l,!1),A=m*P.width*p,C=P.height*p,E=A+g*2,_=C+g*2;if(b=!1,w!==`
`&&w!=="\r"&&w!=="	"&&w!==" "&&(b=!0,y=Math.ceil(Math.max(_,y))),d+E>512&&(f+=y,y=_,d=0,f+y>512)){u.update();const O=this.nextPage();l=O.canvasAndContext.canvas,h=O.canvasAndContext.context,u=O.texture.source,f=0}const T=A/p-((n=(t=c.dropShadow)==null?void 0:t.distance)!=null?n:0)-((s=(i=c._stroke)==null?void 0:i.width)!=null?s:0);if(this.chars[w]={id:w.codePointAt(0),xOffset:-this.padding,yOffset:-this.padding,xAdvance:T,kerning:{}},b){this.drawGlyph(h,P,d+g,f+g,p,c);const O=u.width*p,L=u.height*p,S=new q(d/O,f/L,E/O,_/L);this.chars[w].texture=new k({source:u,layout:{frame:S}}),d+=Math.ceil(E)}}u.update(),this.currentX=d,this.currentY=f,this.applyKerning(o,h)}applyKerning(e,t){const n=this.measureCache;for(let i=0;i<e.length;i++){const s=e[i];for(let o=0;o<this.currentChars.length;o++){const a=this.currentChars[o];let l=n[s];l||(l=n[s]=t.measureText(s).width);let h=n[a];h||(h=n[a]=t.measureText(a).width);let u=t.measureText(s+a).width,c=u-(l+h);c&&(this.chars[s].kerning[a]=c),u=t.measureText(s+a).width,c=u-(l+h),c&&(this.chars[a].kerning[s]=c)}}}nextPage(){this.currentPageIndex++;const e=this.resolution,t=Qt.getOptimalCanvasAndContext(512,512,e);this.setupContext(t.context,this.style,e);const n=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),i=new k({source:new Bt({resource:t.canvas,resolution:n,alphaMode:xt.PMA})}),s={canvasAndContext:t,texture:i};return this.pages[this.currentPageIndex]=s,s}setupContext(e,t,n){var i;t.fontSize=this.baseRenderedFontSize,e.scale(n,n),e.font=Jt(t),t.fontSize=this.baseMeasurementFontSize,e.textBaseline=t.textBaseline;const s=t._stroke,o=(i=s==null?void 0:s.width)!=null?i:0;if(s&&(e.lineWidth=o,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=er(s,e)),t._fill&&(e.fillStyle=er(t._fill,e)),t.dropShadow){const a=t.dropShadow,l=ve(a.color),h=Zr(l),u=a.blur*n,c=a.distance*n;e.shadowColor=`rgba(${h[0]*255},${h[1]*255},${h[2]*255},${a.alpha})`,e.shadowBlur=u,e.shadowOffsetX=Math.cos(a.angle)*c,e.shadowOffsetY=Math.sin(a.angle)*c}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}drawGlyph(e,t,n,i,s,o){var a;const l=t.text,h=t.fontProperties,u=o._stroke,c=((a=u==null?void 0:u.width)!=null?a:0)*s,d=n+c/2,f=i-c/2,p=h.descent*s,g=t.lineHeight*s;o.stroke&&c&&e.strokeText(l,d,f+g-p),o._fill&&e.fillText(l,d,f+g-p)}destroy(){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture.destroy();this.chars=null;for(let e=0;e<this.pages.length;e++){const{canvasAndContext:t,texture:n}=this.pages[e];Qt.returnCanvasAndContext(t),n.destroy(!0)}this.pages=null}}function As(r,e,t){const n={width:0,height:0,offsetY:0,scale:e.fontSize/t.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};n.offsetY=t.baseLineOffset;let i=n.lines[0],s=null,o=!0;const a={spaceWord:!1,width:0,start:0,index:0,positions:[],chars:[]},l=f=>{const p=i.width;for(let g=0;g<a.index;g++){const m=f.positions[g];i.chars.push(f.chars[g]),i.charPositions.push(m+p)}i.width+=f.width,o=!1,a.width=0,a.index=0,a.chars.length=0},h=()=>{let f=i.chars.length-1,p=i.chars[f];for(;p===" ";)i.width-=t.chars[p].xAdvance,p=i.chars[--f];n.width=Math.max(n.width,i.width),i={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},o=!0,n.lines.push(i),n.height+=t.lineHeight},u=t.baseMeasurementFontSize/e.fontSize,c=e.letterSpacing*u,d=e.wordWrapWidth*u;for(let f=0;f<r.length+1;f++){let p;const g=f===r.length;g||(p=r[f]);const m=t.chars[p];if(/(?:\s)/.test(p)||p==="\r"||p===`
`||g){if(!o&&e.wordWrap&&i.width+a.width-c>d?(h(),l(a),g||i.charPositions.push(0)):(a.start=i.width,l(a),g||i.charPositions.push(0)),p==="\r"||p===`
`)i.width!==0&&h();else if(!g){const y=m.xAdvance+(m.kerning[s]||0)+c;i.width+=y,i.spaceWidth=y,i.spacesIndex.push(i.charPositions.length),i.chars.push(p)}}else{const y=m.kerning[s]||0,b=m.xAdvance+y+c;a.positions[a.index++]=a.width+y,a.chars.push(p),a.width+=b}s=p}return h(),e.align==="center"?rv(n):e.align==="right"?nv(n):e.align==="justify"&&iv(n),n}function rv(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],n=r.width/2-t.width/2;for(let i=0;i<t.charPositions.length;i++)t.charPositions[i]+=n}}function nv(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],n=r.width-t.width;for(let i=0;i<t.charPositions.length;i++)t.charPositions[i]+=n}}function iv(r){const e=r.width;for(let t=0;t<r.lines.length;t++){const n=r.lines[t];let i=0,s=n.spacesIndex[i++],o=0;const a=n.spacesIndex.length,l=(e-n.width)/a;for(let h=0;h<n.charPositions.length;h++)h===s&&(s=n.spacesIndex[i++],o+=l),n.charPositions[h]+=o}}class sv{getFont(e,t){var n;let i=t.fontFamily,s=!0;t._fill.fill&&(i+=t._fill.fill.uid,s=!1),ae.has(i)||ae.set(i,new fc({style:t,overrideFill:s}));const o=ae.get(i);return(n=o.ensureCharacters)==null||n.call(o,e),o}getLayout(e,t){const n=this.getFont(e,t);return As(e.split(""),t,n)}measureText(e,t){return this.getLayout(e,t)}}const Bs=new sv;class ov extends Kr{constructor(){super({view:new Ii})}}class Rs{constructor(e){this.gpuBitmapText={},this.renderer=e}validateRenderable(e){const t=this.getGpuBitmapText(e);return this.updateContext(e,t.view.context),this.renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const n=this.getGpuBitmapText(e);this.renderer.renderPipes.batch.break(t),this.renderer.renderPipes.graphics.addRenderable(n,t),n.view.context.customShader&&this.updateDistanceField(e)}destroyRenderable(e){this.destroyRenderableByUid(e.uid)}destroyRenderableByUid(e){H.return(this.gpuBitmapText[e]),this.gpuBitmapText[e]=null}updateRenderable(e){const t=this.getGpuBitmapText(e);this.renderer.renderPipes.graphics.updateRenderable(t),t.view.context.customShader&&this.updateDistanceField(e)}updateContext(e,t){var n;const i=e.view,s=Bs.getFont(i.text,i._style);t.clear(),s.distanceField.fieldType!=="none"&&(t.customShader||(this.sdfShader||(this.sdfShader=new ic),t.customShader=this.sdfShader));const o=Array.from(i.text),a=i._style;let l=(((n=a._stroke)==null?void 0:n.width)||0)/2;l+=s.baseLineOffset;const h=As(o,a,s);let u=0;const c=a.fontSize/s.baseMeasurementFontSize;t.scale(c,c);const d=-i.anchor.x*h.width,f=-i.anchor.y*h.height;t.translate(d,f);const p=a._fill.color;for(let g=0;g<h.lines.length;g++){const m=h.lines[g];for(let y=0;y<m.charPositions.length;y++){const b=o[u++],v=s.chars[b];v!=null&&v.texture&&t.texture(v.texture,p,Math.round(m.charPositions[y]+v.xOffset),Math.round(l+v.yOffset))}l+=s.lineHeight}}getGpuBitmapText(e){return this.gpuBitmapText[e.uid]||this.initGpuText(e)}initGpuText(e){e.view._style.update();const t=H.get(ov,e);return this.gpuBitmapText[e.uid]=t,this.updateContext(e,t.view.context),e.on("destroyed",()=>{this.destroyRenderable(e)}),this.gpuBitmapText[e.uid]}updateDistanceField(e){const t=this.getGpuBitmapText(e).view.context,n=e.view,i=n._style.fontFamily,s=ae.get(i),{a:o,b:a,c:l,d:h}=e.layerTransform,u=Math.sqrt(o*o+a*a),c=Math.sqrt(l*l+h*h),d=(Math.abs(u)+Math.abs(c))/2,f=s.baseRenderedFontSize/n._style.fontSize,p=1,g=d*s.distanceField.distanceRange*(1/f)*p;t.customShader.resources.localUniforms.uniforms.distance=g}destroy(){var e;for(const t in this.gpuBitmapText)this.destroyRenderableByUid(t);this.gpuBitmapText=null,(e=this.sdfShader)==null||e.destroy(!0),this.sdfShader=null,this.renderer=null}}Rs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"bitmapText"};class ks{constructor(e){this.gpuText={},this.renderer=e}validateRenderable(e){const t=this.getGpuText(e),n=e.view._getKey();if(t.currentKey!==n){const i=e.view,s=i._autoResolution?this.renderer.view.resolution:i._resolution,{width:o,height:a}=this.renderer.canvasText.getTextureSize(i.text,s,i._style);return!(this.renderer.canvasText.getReferenceCount(t.currentKey)===1&&o===t.texture._source.width&&a===t.texture._source.height)}return!1}addRenderable(e,t){const n=this.getGpuText(e).batchableSprite;e.view.didUpdate&&this.updateText(e),this.renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){const t=this.getGpuText(e).batchableSprite;e.view.didUpdate&&this.updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this.destroyRenderableById(e.uid)}destroyRenderableById(e){const t=this.gpuText[e];this.renderer.canvasText.decreaseReferenceCount(t.currentKey),H.return(t.batchableSprite),this.gpuText[e]=null}updateText(e){const t=e.view._getKey(),n=this.getGpuText(e),i=n.batchableSprite;n.currentKey!==t&&this.updateGpuText(e),e.view.didUpdate=!1,av(i.bounds,e.view.anchor,i.texture)}updateGpuText(e){const t=this.getGpuText(e),n=t.batchableSprite,i=e.view;t.texture&&this.renderer.canvasText.decreaseReferenceCount(t.currentKey);const s=i._autoResolution?this.renderer.view.resolution:i._resolution;t.texture=n.texture=this.renderer.canvasText.getTexture(i.text,s,i._style,i._getKey()),t.currentKey=i._getKey(),n.texture=t.texture,t.needsTextureUpdate=!1}getGpuText(e){return this.gpuText[e.uid]||this.initGpuText(e)}initGpuText(e){e.view._style.update();const t={texture:null,currentKey:"--",batchableSprite:H.get(Ps),needsTextureUpdate:!0};return t.batchableSprite.sprite=e,t.batchableSprite.bounds=[0,1,0,0],this.gpuText[e.uid]=t,this.updateText(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this.gpuText)this.destroyRenderableById(e);this.gpuText=null,this.renderer=null}}ks.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"text"};function av(r,e,t){const n=t._source,i=t.layout,s=i.orig,o=i.trim,a=n.width,l=n.height,h=a*s.width,u=l*s.height;if(o){const c=a*o.width,d=l*o.height;r[1]=o.x*a-e._x*h,r[0]=r[1]+c,r[3]=o.y*l-e._y*u,r[2]=r[3]+d}else r[1]=-e._x*h,r[0]=r[1]+h,r[3]=-e._y*u,r[2]=r[3]+u}const lv=new pe;class Us{constructor(){this.activeTextures={}}getTextureSize(e,t,n){const i=Z.measureText(e||" ",n);let s=Math.ceil(Math.ceil(Math.max(1,i.width)+n.padding*2)*t),o=Math.ceil(Math.ceil(Math.max(1,i.height)+n.padding*2)*t);return s=Math.ceil(s-1e-6),o=Math.ceil(o-1e-6),s=Ze(s),o=Ze(o),{width:s,height:o}}getTexture(e,t,n,i){if(this.activeTextures[i])return this.increaseReferenceCount(i),this.activeTextures[i].texture;const s=Z.measureText(e||" ",n),o=Math.ceil(Math.ceil(Math.max(1,s.width)+n.padding*2)*t),a=Math.ceil(Math.ceil(Math.max(1,s.height)+n.padding*2)*t),l=Qt.getOptimalCanvasAndContext(o,a),{canvas:h}=l;this.renderTextToCanvas(e,n,t,l);const u=lv;u.minX=0,u.minY=0,u.maxX=h.width/t|0,u.maxY=h.height/t|0;const c=de.getOptimalTexture(u.width,u.height,t,!1);return c.source.type="image",c.source.resource=h,c.frameWidth=s.width,c.frameHeight=s.height,c.source.update(),c.layout.updateUvs(),this.activeTextures[i]={canvasAndContext:l,texture:c,usageCount:1},c}increaseReferenceCount(e){this.activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this.activeTextures[e];t.usageCount--,t.usageCount===0&&(Qt.returnCanvasAndContext(t.canvasAndContext),de.returnTexture(t.texture),t.texture.source.resource=null,t.texture.source.type="unknown",this.activeTextures[e]=null)}getReferenceCount(e){return this.activeTextures[e].usageCount}renderTextToCanvas(e,t,n,i){var s,o,a,l,h;const{canvas:u,context:c}=i,d=Jt(t),f=Z.measureText(e||" ",t),p=f.lines,g=f.lineHeight,m=f.lineWidths,y=f.maxLineWidth,b=f.fontProperties,v=u.height;c.resetTransform(),c.scale(n,n),c.clearRect(0,0,f.width,f.height),c.font=d;let w,P;const A=t.dropShadow?2:1;for(let C=0;C<A;++C){const E=t.dropShadow&&C===0,_=E?Math.ceil(Math.max(1,v)+t.padding*2):0,T=_*n;if(E){c.fillStyle="black",c.strokeStyle="black";const S=t.dropShadow,R=ve(S.color),z=Zr(R),j=S.blur*n,ne=S.distance*n;c.shadowColor=`rgba(${z[0]*255},${z[1]*255},${z[2]*255},${S.alpha})`,c.shadowBlur=j,c.shadowOffsetX=Math.cos(S.angle)*ne,c.shadowOffsetY=Math.sin(S.angle)*ne+T}else{if(c.globalAlpha=(o=(s=t._fill)==null?void 0:s.alpha)!=null?o:1,c.fillStyle=t._fill?er(t._fill,c):null,(a=t._stroke)!=null&&a.width){const S=t._stroke;c.strokeStyle=er(t._stroke,c),c.lineWidth=S.width,c.miterLimit=S.miterLimit,c.lineJoin=S.join,c.lineCap=S.cap}c.shadowColor="black",c.shadowBlur=0,c.shadowOffsetX=0,c.shadowOffsetY=0}let O=(g-b.fontSize)/2;g-b.fontSize<0&&(O=0);const L=(h=(l=t.stroke)==null?void 0:l.width)!=null?h:0;for(let S=0;S<p.length;S++)w=L/2,P=L/2+S*g+b.ascent+O,t.align==="right"?w+=y-m[S]:t.align==="center"&&(w+=(y-m[S])/2),t._stroke&&this.drawLetterSpacing(p[S],t,i,w+t.padding,P+t.padding-_,!0),t._fill!==void 0&&this.drawLetterSpacing(p[S],t,i,w+t.padding,P+t.padding-_)}}drawLetterSpacing(e,t,n,i,s,o=!1){const{context:a}=n,l=t.letterSpacing;let h=!1;if(Z.experimentalLetterSpacingSupported&&(Z.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,h=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||h){o?a.strokeText(e,i,s):a.fillText(e,i,s);return}let u=i;const c=Z.graphemeSegmenter(e);let d=a.measureText(e).width,f=0;for(let p=0;p<c.length;++p){const g=c[p];o?a.strokeText(g,u,s):a.fillText(g,u,s);let m="";for(let y=p+1;y<c.length;++y)m+=c[y];f=a.measureText(m).width,u+=d-f+l,d=f}}destroy(){}}Us.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"canvasText"};var hv=Object.defineProperty,pc=Object.getOwnPropertySymbols,uv=Object.prototype.hasOwnProperty,cv=Object.prototype.propertyIsEnumerable,mc=(r,e,t)=>e in r?hv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,gc=(r,e)=>{for(var t in e||(e={}))uv.call(e,t)&&mc(r,t,e[t]);if(pc)for(var t of pc(e))cv.call(e,t)&&mc(r,t,e[t]);return r};const vc={alpha:1,color:0,clearBeforeRender:!0};class Qr{constructor(){this.clearBeforeRender=!0,this._backgroundColor=0,this._backgroundColorRgba=[0,0,0,1],this._backgroundColorRgbaObject={r:0,g:0,b:0,a:1},this._backgroundColorString="#000000",this.color=this._backgroundColor,this.alpha=1}init(e){e=gc(gc({},vc),e),this.clearBeforeRender=e.clearBeforeRender,this.color=e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha}get color(){return this._backgroundColor}set color(e){this._backgroundColor=e,this._backgroundColorString=sc(e);const t=this._backgroundColorRgbaObject,n=this._backgroundColorRgba;Zr(e,n),t.r=n[0],t.g=n[1],t.b=n[2],t.a=n[3]}get alpha(){return this._backgroundColorRgba[3]}set alpha(e){this._backgroundColorRgba[3]=e}get colorRgba(){return this._backgroundColorRgba}get colorRgbaObject(){return this._backgroundColorRgbaObject}get colorString(){return this._backgroundColorString}destroy(){}}Qr.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"background",priority:0},Qr.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};class dv extends X{constructor(){super({gl:{functions:`
                ${Ur}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendColor(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${Gr}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class fv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class pv extends X{constructor(){super({gl:{functions:`
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
                `}})}}class mv extends X{constructor(){super({gl:{functions:`
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
                `}})}}class gv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class vv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class bv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class yv extends X{constructor(){super({gl:{functions:`
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
                `}})}}class xv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class wv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class _v extends X{constructor(){super({gl:{functions:`
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
                `}})}}class Tv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class Sv extends X{constructor(){super({gl:{functions:`
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
            `}})}}class Pv extends X{constructor(){super({gl:{functions:`
                ${Ur}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLuminosity(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${Gr}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Ev extends X{constructor(){super({gl:{functions:`
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
            `}})}}class Mv extends X{constructor(){super({gl:{functions:`
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
                `}})}}class Cv extends X{constructor(){super({gl:{functions:`
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
                `}})}}class Av extends X{constructor(){super({gl:{functions:`
                ${Ur}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                ${Gr}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Bv extends X{constructor(){super({gl:{functions:`
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
                `}})}}class Rv extends X{constructor(){super({gl:{functions:`
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
                `}})}}class kv extends X{constructor(){super({gl:{functions:`
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
                `}})}}const Gs={color:dv,"color-burn":fv,"color-dodge":pv,darken:mv,difference:gv,divide:vv,exclusion:bv,"hard-light":yv,"hard-mix":xv,lighten:wv,"linear-burn":_v,"linear-dodge":Tv,"linear-light":Sv,luminosity:Pv,negation:Ev,overlay:Mv,"pin-light":Cv,saturation:Av,"soft-light":Bv,subtract:Rv,"vivid-light":kv};class Is{constructor(e){this.isAdvanced=!1,this.filterHash={},this.renderer=e}setBlendMode(e,t,n){if(this.activeBlendMode===t){this.isAdvanced&&this.renderableList.push(e);return}this.activeBlendMode=t,this.isAdvanced&&this.endAdvancedBlendMode(n),this.isAdvanced=!!Gs[t],this.isAdvanced&&(this.beginAdvancedBlendMode(n),this.renderableList.push(e))}beginAdvancedBlendMode(e){this.renderer.renderPipes.batch.break(e);const t=this.activeBlendMode;if(!Gs[t]){console.warn(`Unable to assign 'BLEND_MODES.${t}' using the blend mode pipeline`);return}this.filterHash[t]||(this.filterHash[t]=new br({filters:[new Gs[t]]}));const n={type:"filter",action:"pushFilter",renderables:[],filterEffect:this.filterHash[t],canBundle:!1};this.renderableList=n.renderables,e.add(n)}endAdvancedBlendMode(e){this.renderableList=null,this.renderer.renderPipes.batch.break(e),e.add({type:"filter",action:"popFilter",canBundle:!1})}buildStart(){this.isAdvanced=!1}buildEnd(e){this.isAdvanced&&this.endAdvancedBlendMode(e)}destroy(){this.renderer=null,this.renderableList=null;for(const e in this.filterHash)this.filterHash[e].destroy();this.filterHash=null}}Is.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"blendMode"};class Fs{constructor(e){this.stackIndex=0,this.globalUniformDataStack=[],this.uniformsPool=[],this.activeUniforms=[],this.bindGroupPool=[],this.activeBindGroups=[],this.renderer=e}reset(){this.stackIndex=0;for(let e=0;e<this.activeUniforms.length;e++)this.uniformsPool.push(this.activeUniforms[e]);for(let e=0;e<this.activeBindGroups.length;e++)this.bindGroupPool.push(this.activeBindGroups[e]);this.activeUniforms.length=0,this.activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({projectionMatrix:e,worldTransformMatrix:t,worldColor:n,offset:i}){const s=this.stackIndex?this.globalUniformDataStack[this.stackIndex-1]:{projectionMatrix:this.renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:new B,worldColor:4294967295,offset:new N},o={projectionMatrix:e||this.renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:t||s.worldTransformMatrix,worldColor:n||s.worldColor,offset:i||s.offset,bindGroup:null},a=this.uniformsPool.pop()||this.createUniforms();this.activeUniforms.push(a);const l=a.uniforms;l.projectionMatrix=o.projectionMatrix,l.worldTransformMatrix.copyFrom(o.worldTransformMatrix),l.worldTransformMatrix.tx-=o.offset.x,l.worldTransformMatrix.ty-=o.offset.y,l.worldAlpha=(o.worldColor>>24&255)/255,a.update();let h;this.renderer.renderPipes.uniformBatch?h=this.renderer.renderPipes.uniformBatch.getUniformBindGroup(a,!1):(this.renderer.uniformBuffer.updateUniformGroup(a),h=this.bindGroupPool.pop()||new be,this.activeBindGroups.push(h),h.setResource(a,0)),o.bindGroup=h,this.currentGlobalUniformData=o}push(e){this.bind(e),this.globalUniformDataStack[this.stackIndex++]=this.currentGlobalUniformData}pop(){this.currentGlobalUniformData=this.globalUniformDataStack[--this.stackIndex-1]}get bindGroup(){return this.currentGlobalUniformData.bindGroup}get uniformGroup(){return this.currentGlobalUniformData.bindGroup.resources[0]}createUniforms(){return new Y({projectionMatrix:{value:new B,type:"mat3x3<f32>"},worldTransformMatrix:{value:new B,type:"mat3x3<f32>"},worldAlpha:{value:1,type:"f32"}},{ubo:!0,isStatic:!0})}destroy(){}}Fs.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"globalUniforms"};const Os={f32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"mat2x2<f32>":48,"mat3x3<f32>":48,"mat4x4<f32>":64};function bc(r){const e=r.map(s=>({data:s,offset:0,size:0}));let t=0,n=0,i=0;for(let s=0;s<e.length;s++){const o=e[s];if(t=Os[o.data.type],!t)throw new Error(`Unknown type ${o.data.type}`);if(o.data.size>1&&(t=Math.max(t,16)*o.data.size),o.size=t,n%t!==0&&n<16){const a=n%t%16;n+=a,i+=a}n+t>16?(i=Math.ceil(i/16)*16,o.offset=i,i+=t,n=t):(o.offset=i,n+=t,i+=t)}return i=Math.ceil(i/16)*16,{uboElements:e,size:i}}const Jr=[{type:"mat3x3<f32>",test:r=>r.value.a!==void 0,code:r=>`
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
                `}],Uv={f32:`
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
    `};function yc(r){const e=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
    `];let t=0;for(let i=0;i<r.length;i++){const s=r[i],o=s.data.name;let a=!1,l=0;for(let h=0;h<Jr.length;h++)if(Jr[h].test(s.data)){l=s.offset/4,e.push(`offset += ${l-t};`,Jr[h].code(o)),a=!0;break}if(!a)if(s.data.size>1){const h=Math.max(Os[s.data.type]/16,1),u=s.data.value.length/s.data.size,c=(4-u%4)%4;l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};

                    t = 0;

                    for(var i=0; i < ${s.data.size*h}; i++)
                    {
                        for(var j = 0; j < ${u}; j++)
                        {
                            data[offset++] = v[t++];
                        }
                        offset += ${c};
                    }
                `)}else{const h=Uv[s.data.type];l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};
                    ${h};
                `)}t=l}const n=e.join(`
`);return new Function("uv","data","offset",n)}class Ls{constructor(e){this._syncFunctionHash={},this.renderer=e}ensureUniformGroup(e){e._syncFunction||this.initUniformGroup(e)}initUniformGroup(e){const t=e.signature;let n=this._syncFunctionHash[t];if(!n){const i=Object.keys(e.uniformStructures).map(a=>e.uniformStructures[a]),s=bc(i),o=yc(s.uboElements);n=this._syncFunctionHash[t]={layout:s,syncFunction:o}}return e._syncFunction=n.syncFunction,e.buffer=new se({data:new Float32Array(n.layout.size/4),usage:D.UNIFORM|D.COPY_DST}),e._syncFunction}syncUniformGroup(e,t,n){const i=e._syncFunction||this.initUniformGroup(e);return t||(t=e.buffer.data),n||(n=0),i(e.uniforms,t,n),!0}updateUniformGroup(e){if(e.isStatic&&!e.dirtyId)return!1;e.dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){throw new Error("Method not implemented.")}}Ls.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"uniformBuffer"};let xc=!1;const Ds="8.0.0-alpha.1";function wc(r){if(!xc){if(F.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${Ds} (${r}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${Ds} - ${r} - http://www.pixijs.com/`);xc=!0}}class en{constructor(e){this.renderer=e}init(e){e.hello&&wc(this.renderer.type)}}en.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"hello",priority:0},en.defaultOptions={hello:!1};class tn{constructor(e){this.renderer=e}get resolution(){return this.texture.source._resolution}set resolution(e){this.texture.source.resize(this.texture.source.width,this.texture.source.height,e)}init(e){this.element=e.element||F.ADAPTER.createCanvas(),this.antialias=!!e.antialias,this.texture=Vr(this.element,e),this.multiView=!!e.multiView,this.autoDensity&&(this.element.style.width=`${this.texture.width}px`,this.element.style.height=`${this.texture.height}px`)}resize(e,t,n){this.texture.source.resize(e,t,n),this.autoDensity&&(this.element.style.width=`${e}px`,this.element.style.height=`${t}px`)}destroy(e){e&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}}tn.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"view",priority:0},tn.defaultOptions={width:800,height:600,resolution:F.RESOLUTION,autoDensity:!0,antialias:!1};const $s=[Qr,_i,Di,Fs,en,tn,Us,Ss,Ls],Ns=[Is,mi,Es,xs,Yi,$i,ks,Rs,bs,wi,Ni,Wi,zi],Gv=[...$s,Qi,zr,Xi,ps,ns,Zi,us,hs,es,ds,is,Ji],Iv=[...Ns],Fv=[oi,Hi,Ti],_c=[],Tc=[],Sc=[];K.handleByNamedList(x.WebGLSystem,_c),K.handleByNamedList(x.WebGLPipes,Tc),K.handleByNamedList(x.WebGLPipesAdaptor,Sc),K.add(...Gv,...Iv,...Fv);class Pc extends ms{constructor(){super({type:"webgl2",systems:_c,renderPipes:Tc,renderPipeAdaptors:Sc})}}var Ov={__proto__:null,WebGLRenderer:Pc};class zs{constructor(e){this.hash={},this.renderer=e}contextChange(e){this.gpu=e}getBindGroup(e,t,n){return e.updateKey(),this.hash[e.key]||this.createBindGroup(e,t,n)}createBindGroup(e,t,n){var i;const s=this.gpu.device,o=t.layout[n],a=[];for(const h in o){const u=(i=e.resources[h])!=null?i:e.resources[o[h]];let c;if(u.resourceType==="uniformGroup"){const d=u;this.renderer.uniformBuffer.updateUniformGroup(d);const f=d.buffer;c={buffer:this.renderer.buffer.getGPUBuffer(f),offset:0,size:f.descriptor.size}}else if(u.resourceType==="buffer"){const d=u;c={buffer:this.renderer.buffer.getGPUBuffer(d),offset:0,size:d.descriptor.size}}else if(u.resourceType==="bufferResource"){const d=u;c={buffer:this.renderer.buffer.getGPUBuffer(d.buffer),offset:d.offset,size:d.size}}else if(u.resourceType==="textureSampler"){const d=u;c=this.renderer.texture.getGpuSampler(d)}else if(u.resourceType==="textureSource"){const d=u;c=this.renderer.texture.getGpuSource(d).createView({})}a.push({binding:o[h],resource:c})}const l=s.createBindGroup({layout:t._gpuLayout.bindGroups[n],entries:a});return this.hash[e.key]=l,l}destroy(){}}zs.extension={type:[x.WebGPUSystem],name:"bindGroup"};class Ws{constructor(){this._gpuBuffers={}}contextChange(e){this.gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){const t=this._gpuBuffers[e.uid]||this.createGPUBuffer(e);return e._updateID&&e.data&&(e._updateID=0,this.gpu.device.queue.writeBuffer(t,0,e.data.buffer,0,e._updateSize)),t}destroyAll(){for(const e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){const t=this.gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(Ar(e.data.buffer,t.getMappedRange()),t.unmap()),this._gpuBuffers[e.uid]=t,e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),t}onBufferChange(e){let t=this._gpuBuffers[e.uid];t.destroy(),t=this.createGPUBuffer(e),e._updateID=0}onBufferDestroy(e){this._gpuBuffers[e.uid].destroy(),this._gpuBuffers[e.uid]=null}destroy(){throw new Error("Method not implemented.")}}Ws.extension={type:[x.WebGPUSystem],name:"buffer"};function Lv(r,e){const t=r.descriptor.size,n=e.gpu.device,i=new se({data:new Float32Array(24e5),usage:D.MAP_READ|D.COPY_DST}),s=e.buffer.createGPUBuffer(i),o=n.createCommandEncoder();o.copyBufferToBuffer(e.buffer.getGPUBuffer(r),0,s,0,t),n.queue.submit([o.finish()]),s.mapAsync(GPUMapMode.READ,0,t).then(()=>{s.getMappedRange(0,t),s.unmap()})}class Ec{constructor({minUniformOffsetAlignment:e}){this.minUniformOffsetAlignment=256,this.byteIndex=0,this.minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this.minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const t=this.byteIndex;let n=t+e*4;if(n=Math.ceil(n/this.minUniformOffsetAlignment)*this.minUniformOffsetAlignment,n>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=n,t}addGroup(e){const t=this.addEmptyGroup(e.length);for(let n=0;n<e.length;n++)this.data[t/4+n]=e[n];return t}upload(){}destroy(){this.buffer.destroy(),this.buffer=null,this.data=null}}class Hs{constructor(e){this.colorMaskCache=15,this.renderer=e}setMask(e){this.colorMaskCache!==e&&(this.colorMaskCache=e,this.renderer.pipeline.setColorMask(e))}destroy(){}}Hs.extension={type:[x.WebGPUSystem],name:"colorMask"};class Vs{constructor(e){this._renderer=e}async init(){return this._initPromise?this._initPromise:(this._initPromise=this.createDeviceAndAdaptor({}).then(e=>{this.gpu=e,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async createDeviceAndAdaptor(e){const t=await navigator.gpu.requestAdapter(e),n=await t.requestDevice();return{adapter:t,device:n}}destroy(){this._renderer=null}}Vs.extension={type:[x.WebGPUSystem],name:"device"};var Dv=Object.defineProperty,Mc=Object.getOwnPropertySymbols,$v=Object.prototype.hasOwnProperty,Nv=Object.prototype.propertyIsEnumerable,Cc=(r,e,t)=>e in r?Dv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ac=(r,e)=>{for(var t in e||(e={}))$v.call(e,t)&&Cc(r,t,e[t]);if(Mc)for(var t of Mc(e))Nv.call(e,t)&&Cc(r,t,e[t]);return r};class js{constructor(e){this.boundBindGroup={},this.boundVertexBuffer={},this.renderer=e}start(){this.commandFinished=new Promise(e=>{this.resolveCommandFinished=e}),this.commandEncoder=this.renderer.gpu.device.createCommandEncoder()}beginRenderPass(e,t){this.renderPassEncoder&&this.renderPassEncoder.end(),this.clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(t.descriptor),this.setViewport(e.viewport)}setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setScissor(e){e.fit(this.renderer.renderTarget.renderTarget.viewport),this.renderPassEncoder.setScissorRect(e.minX,e.minY,e.width,e.height)}clearScissor(){const e=this.renderer.renderTarget.renderTarget.viewport;this.renderPassEncoder.setScissorRect(e.x,e.y,e.width,e.height)}setPipelineFromGeometryProgramAndState(e,t,n,i){const s=this.renderer.pipeline.getPipeline(e,t,n,i);this.setPipeline(s)}setPipeline(e){this.boundPipeline!==e&&(this.boundPipeline=e,this.renderPassEncoder.setPipeline(e))}setVertexBuffer(e,t){this.boundVertexBuffer[e]!==t&&(this.boundVertexBuffer[e]=t,this.renderPassEncoder.setVertexBuffer(e,this.renderer.buffer.updateBuffer(t)))}setIndexBuffer(e){this.boundIndexBuffer!==e&&(this.boundIndexBuffer=e,this.renderPassEncoder.setIndexBuffer(this.renderer.buffer.updateBuffer(e),"uint32"))}setBindGroup(e,t,n){if(this.boundBindGroup[e]===t)return;this.boundBindGroup[e]=t;const i=this.renderer.bindGroup.getBindGroup(t,n,e);this.renderPassEncoder.setBindGroup(e,i)}setGeometry(e){for(const t in e.attributes){const n=e.attributes[t];this.setVertexBuffer(n.shaderLocation,n.buffer)}e.indexBuffer&&this.setIndexBuffer(e.indexBuffer)}setShaderBindGroups(e,t){for(const n in e.groups){const i=e.groups[n];t||this.syncBindGroup(i),this.setBindGroup(n,i,e.gpuProgram)}}syncBindGroup(e){for(const t in e.resources){const n=e.resources[t];n.isUniformGroup&&this.renderer.uniformBuffer.updateUniformGroup(n)}}draw(e){const{geometry:t,shader:n,state:i,topology:s,size:o,start:a,instanceCount:l,skipSync:h}=e;this.setPipelineFromGeometryProgramAndState(t,n.gpuProgram,i,s),this.setGeometry(t),this.setShaderBindGroups(n,h),t.indexBuffer?this.renderPassEncoder.drawIndexed(o||t.indexBuffer.data.length,l||1,a||0):this.renderPassEncoder.draw(o||t.getSize(),l||1,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this.gpu.device.queue.submit([this.commandEncoder.finish()]),this.resolveCommandFinished()}restoreRenderPass(){const e=this.renderer.renderTarget.getDescriptor(this.renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const t=this.boundPipeline,n=Ac({},this.boundVertexBuffer),i=this.boundIndexBuffer,s=Ac({},this.boundBindGroup);this.clearCache();const o=this.renderer.renderTarget.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this.setPipeline(t);for(const a in n)this.setVertexBuffer(a,n[a]);for(const a in s)this.setBindGroup(a,s[a],null);this.setIndexBuffer(i)}clearCache(){for(let e=0;e<16;e++)this.boundBindGroup[e]=null,this.boundVertexBuffer[e]=null;this.boundIndexBuffer=null,this.boundPipeline=null}destroy(){}contextChange(e){this.gpu=e}}js.extension={type:[x.WebGPUSystem],name:"encoder"};class Ys{constructor(e){this.renderTargetStencilState={},this.renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let t=this.renderTargetStencilState[e.uid];t||(t=this.renderTargetStencilState[e.uid]={stencilMode:ee.DISABLED,stencilReference:0}),this.activeRenderTarget=e,this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const n=this.renderTargetStencilState[this.activeRenderTarget.uid];n.stencilMode=e,n.stencilReference=t;const i=this.renderer;i.pipeline.setStencilMode(e),i.encoder.renderPassEncoder.setStencilReference(t)}destroy(){}}Ys.extension={type:[x.WebGPUSystem],name:"stencil"};const Ue=128;class Xs{constructor(e){this.bindGroupHash={},this.buffers=[],this.bindGroups=[],this.bufferResources=[],this.renderer=e,this.batchBuffer=new Ec({minUniformOffsetAlignment:Ue});const t=256/Ue;for(let n=0;n<t;n++){let i=D.UNIFORM|D.COPY_DST;n===0&&(i|=D.COPY_SRC),this.buffers.push(new se({data:this.batchBuffer.data,usage:i}))}}renderEnd(){this.uploadBindGroups(),this.resetBindGroups()}resetBindGroups(){for(const e in this.bindGroupHash)this.bindGroupHash[e]=null;this.batchBuffer.clear()}getUniformBindGroup(e,t){if(!t&&this.bindGroupHash[e.uid])return this.bindGroupHash[e.uid];this.renderer.uniformBuffer.ensureUniformGroup(e);const n=e.buffer.data,i=this.batchBuffer.addEmptyGroup(n.length);return this.renderer.uniformBuffer.syncUniformGroup(e,this.batchBuffer.data,i/4),this.bindGroupHash[e.uid]=this.getBindGroup(i/Ue),this.bindGroupHash[e.uid]}getUniformBufferResource(e){this.renderer.uniformBuffer.updateUniformGroup(e);const t=e.buffer.data,n=this.batchBuffer.addGroup(t);return this.getBufferResource(n/Ue)}getArrayBindGroup(e){const t=this.batchBuffer.addGroup(e);return this.getBindGroup(t/Ue)}getArrayBufferResource(e){const t=this.batchBuffer.addGroup(e)/Ue;return this.getBufferResource(t)}getBufferResource(e){if(!this.bufferResources[e]){const t=this.buffers[e%2];this.bufferResources[e]=new jr({buffer:t,offset:(e/2|0)*256,size:Ue})}return this.bufferResources[e]}getBindGroup(e){if(!this.bindGroups[e]){const t=new be({0:this.getBufferResource(e)});this.bindGroups[e]=t}return this.bindGroups[e]}uploadBindGroups(){const e=this.renderer.buffer,t=this.buffers[0];t.update(this.batchBuffer.byteIndex),e.updateBuffer(t);const n=this.renderer.gpu.device.createCommandEncoder();for(let i=1;i<this.buffers.length;i++){const s=this.buffers[i];n.copyBufferToBuffer(e.getGPUBuffer(t),Ue,e.getGPUBuffer(s),0,this.batchBuffer.byteIndex)}this.renderer.gpu.device.queue.submit([n.finish()])}destroy(){for(let e=0;e<this.bindGroups.length;e++)this.bindGroups[e].destroy();this.bindGroups=null,this.bindGroupHash=null;for(let e=0;e<this.buffers.length;e++)this.buffers[e].destroy();this.buffers=null;for(let e=0;e<this.bufferResources.length;e++)this.bufferResources[e].destroy();this.bufferResources=null,this.batchBuffer.destroy(),this.bindGroupHash=null,this.renderer=null}}Xs.extension={type:[x.WebGPUPipes],name:"uniformBatch"};class zv extends be{constructor(){super({0:new se({data:new Float32Array(128),usage:D.UNIFORM|D.COPY_DST})})}get buffer(){return this.resources[0]}get data(){return this.resources[0].data}}class qs{constructor(e){this.activeBindGroups=[],this.activeBindGroupIndex=0,this.renderer=e}getUniformBindGroup(e){const t=this.renderer;t.uniformBuffer.ensureUniformGroup(e);const n=H.get(zv);return t.uniformBuffer.syncUniformGroup(e,n.data,0),n.buffer.update(e.buffer.data.byteLength),this.activeBindGroups[this.activeBindGroupIndex++]=n,n}renderEnd(){for(let e=0;e<this.activeBindGroupIndex;e++)H.return(this.activeBindGroups[e]);this.activeBindGroupIndex=0}}qs.extension={type:[x.WebGPUPipes],name:"uniformBuffer"};const Wv={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function Hv(r,e,t,n,i,s,o,a){return r<<26|e<<18|o<<14|t<<8|n<<3|a<<1|i<<4|s}class Ks{constructor(e){this._moduleCache={},this._bufferLayoutsCache={},this._pipeCache={},this.colorMask=15,this.multisampleCount=1,this.renderer=e}contextChange(e){this.gpu=e,this.setStencilMode(ee.DISABLED)}setMultisampleCount(e){this.multisampleCount=e}setColorMask(e){this.colorMask=e}setStencilMode(e){this.stencilMode=e,this.stencilState=we[e]}setPipeline(e,t,n,i){const s=this.getPipeline(e,t,n);i.setPipeline(s)}getPipeline(e,t,n,i){e._layoutKey||this.generateBufferKey(e),t._layoutKey||(this.generateProgramKey(t),this.renderer.shader.createProgramLayout(t)),i=i||e.topology;const s=Hv(e._layoutKey,t._layoutKey,n.data,n._blendModeId,this.stencilMode,this.multisampleCount,this.colorMask,Wv[i]);return this._pipeCache[s]?this._pipeCache[s]:(this._pipeCache[s]=this.createPipeline(e,t,n,i),this._pipeCache[s])}createPipeline(e,t,n,i){const s=this.gpu.device,o=this.createVertexBufferLayouts(e),a=this.renderer.state.getColorTargets(n);let l=this.stencilState;l=we[this.stencilMode],a[0].writeMask=this.stencilMode===ee.RENDERING_MASK_ADD?0:this.colorMask;const h={vertex:{module:this.getModule(t.vertex.source),entryPoint:t.vertex.entryPoint,buffers:o},fragment:{module:this.getModule(t.fragment.source),entryPoint:t.fragment.entryPoint,targets:a},primitive:{topology:i,cullMode:n.cullMode},layout:t._gpuLayout.pipeline,multisample:{count:this.multisampleCount},depthStencil:l,label:"PIXI Pipeline"};return s.createRenderPipeline(h)}getModule(e){return this._moduleCache[e]||this.createModule(e)}createModule(e){const t=this.gpu.device;return this._moduleCache[e]=t.createShaderModule({code:e}),this._moduleCache[e]}generateProgramKey(e){const{vertex:t,fragment:n}=e,i=t.source+n.source+t.entryPoint+n.entryPoint;return e._layoutKey=hr(i,"program"),e._layoutKey}generateBufferKey(e){const t=[];let n=0;const i=Object.keys(e.attributes).sort();for(let o=0;o<i.length;o++){const a=e.attributes[i[o]];t[n++]=a.shaderLocation,t[n++]=a.offset,t[n++]=a.format,t[n++]=a.stride}const s=t.join("");return e._layoutKey=hr(s,"geometry"),e._layoutKey}createVertexBufferLayouts(e){if(this._bufferLayoutsCache[e._layoutKey])return this._bufferLayoutsCache[e._layoutKey];const t=[];return e.buffers.forEach(n=>{const i={arrayStride:0,stepMode:"vertex",attributes:[]},s=i.attributes;for(const o in e.attributes){const a=e.attributes[o];a.buffer===n&&(i.arrayStride=a.stride,s.push({shaderLocation:a.shaderLocation,offset:a.offset,format:a.format}))}s.length&&t.push(i)}),this._bufferLayoutsCache[e._layoutKey]=t,t}destroy(){throw new Error("Method not implemented.")}}Ks.extension={type:[x.WebGPUSystem],name:"pipeline"};class Bc{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}const Vv=[0,0,0,0];class Zs{constructor(e){this.rootProjectionMatrix=new B,this.onRenderTargetChange=new Hr("onRenderTargetChange"),this.renderSurfaceToRenderTargetHash=new Map,this.gpuRenderTargetHash={},this.renderTargetStack=[],this.renderer=e}renderStart({target:e,clear:t,clearColor:n}){this.rootRenderTarget=this.getRenderTarget(e),this.rootProjectionMatrix=this.rootRenderTarget.projectionMatrix,this.renderingToScreen=ts(this.rootRenderTarget),this.renderTargetStack.length=0,this.renderer.encoder.start(),this.push(this.rootRenderTarget,t,n!=null?n:this.renderer.background.colorRgba)}contextChange(e){this.gpu=e}bind(e,t=!0,n){const i=this.getRenderTarget(e);this.renderTarget=i;const s=this.getGpuRenderTarget(i);(i.width!==s.width||i.height!==s.height)&&this.resizeGpuRenderTarget(i);const o=this.getDescriptor(i,t,n);return s.descriptor=o,this.renderer.encoder.beginRenderPass(i,s),this.renderer.pipeline.setMultisampleCount(s.msaaSamples),this.onRenderTargetChange.emit(i),i}getGpuColorTexture(e){const t=this.getGpuRenderTarget(e);return t.contexts[0]?t.contexts[0].getCurrentTexture():this.renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,t,n){const i=this.getGpuRenderTarget(e),s=t?"clear":"load",o=e.colorTextures.map((l,h)=>{const u=i.contexts[h];let c,d;return u?c=u.getCurrentTexture().createView():c=this.renderer.texture.getTextureView(l),i.msaaTextures[h]&&(d=c,c=this.renderer.texture.getTextureView(i.msaaTextures[h])),{view:c,resolveTarget:d,clearValue:n||Vv,storeOp:"store",loadOp:s}});let a;return e.depthTexture&&(a={view:this.renderer.texture.getGpuSource(e.depthTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:s}),{colorAttachments:o,depthStencilAttachment:a}}push(e,t=!0,n){const i=this.bind(e,t,n);return this.renderTargetStack.push(i),i}pop(){this.renderTargetStack.pop(),this.bind(this.renderTargetStack[this.renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this.renderSurfaceToRenderTargetHash.get(e))!=null?t:this.initRenderTarget(e)}copyToTexture(e,t,n,i){const s=this.renderer,o=s.renderTarget.getGpuColorTexture(e),a=s.texture.getGpuSource(t.source);return s.encoder.commandEncoder.copyTextureToTexture({texture:o,origin:n},{texture:a},i),t}restart(){this.bind(this.rootRenderTarget,!1)}destroy(){}initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=Vr(e)),e instanceof bt?t=e:e instanceof k&&(t=new bt({colorTextures:[e],depthTexture:e.source.depthStencil})),t.isRoot=!0,this.renderSurfaceToRenderTargetHash.set(e,t),t}getGpuRenderTarget(e){return this.gpuRenderTargetHash[e.uid]||this.initGpuRenderTarget(e)}initGpuRenderTarget(e){e.isRoot=!0;const t=new Bc;return e.colorTextures.forEach((n,i)=>{if(n.source.resource instanceof HTMLCanvasElement){const s=e.colorTexture.source.resource.getContext("webgpu");try{s.configure({device:this.gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"})}catch(o){console.error(o)}t.contexts[i]=s}if(t.msaa=n.source.antialias,n.source.antialias){const s=new ge({width:0,height:0,sampleCount:4});t.msaaTextures[i]=s}}),t.msaa&&(t.msaaSamples=4,e.depthTexture&&(e.depthTexture.source.sampleCount=4)),this.gpuRenderTargetHash[e.uid]=t,t}resizeGpuRenderTarget(e){const t=this.getGpuRenderTarget(e);t.width=e.width,t.height=e.height,t.msaa&&e.colorTextures.forEach((n,i)=>{const s=t.msaaTextures[i];s==null||s.resize(n.source.width,n.source.height,n.source._resolution)})}}Zs.extension={type:[x.WebGPUSystem],name:"renderTarget"};class Qs{constructor(e){this.renderer=e}contextChange(e){this.gpu=e}createProgramLayout(e){const t=this.gpu.device;if(!e._gpuLayout)if(e.gpuLayout){const n=e.gpuLayout.map(s=>t.createBindGroupLayout({entries:s})),i={bindGroupLayouts:n};e._gpuLayout={bindGroups:n,pipeline:t.createPipelineLayout(i)}}else e._gpuLayout={bindGroups:null,pipeline:"auto"}}updateData(e){var t;for(let n=0;n<e.gpuProgram.layout.length;n++){const i=e.groups[n],s=e.gpuProgram.layout[n];for(const o in s){const a=(t=i.resources[o])!=null?t:i.resources[s[o]];if(a instanceof Y){const l=a;this.renderer.uniformBuffer.updateUniformGroup(l)}}}}destroy(){throw new Error("Method not implemented.")}}Qs.extension={type:[x.WebGPUSystem],name:"shader"};const fe={};fe.normal={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},fe.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}},fe.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}},fe.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},fe.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},fe.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}},fe["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},fe["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}},fe["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}};class Js{constructor(){this.defaultState=new _e,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:fe[e.blendMode]||fe.normal}]}destroy(){this.gpu=null}}Js.extension={type:[x.WebGPUSystem],name:"state"};const Rc={type:"image",upload(r,e,t){const n=r.resource,i=(r.pixelWidth|0)*(r.pixelHeight|0),s=n.byteLength/i;t.device.queue.writeTexture({texture:e},n,{offset:0,rowsPerImage:r.pixelWidth,bytesPerRow:r.pixelWidth*s},{width:r.pixelWidth,height:r.pixelHeight,depthOrArrayLayers:1})}},kc={type:"image",upload(r,e,t){var n,i;const s=r.resource;if(!s)return;const o=((n=r.resource)==null?void 0:n.width)||r.pixelWidth,a=((i=r.resource)==null?void 0:i.height)||r.pixelHeight;t.device.queue.copyExternalImageToTexture({source:s},{texture:e},{width:o,height:a})}};class Uc{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}getMipmapPipeline(e){let t=this.pipelines[e];return t||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
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
                    `})),t=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=t),t}generateMipmap(e){const t=this.getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let n=e;const i=e.depthOrArrayLayers||1,s=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!s){const l={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};n=this.device.createTexture(l)}const o=this.device.createCommandEncoder({}),a=t.getBindGroupLayout(0);for(let l=0;l<i;++l){let h=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),u=s?1:0;for(let c=1;c<e.mipLevelCount;++c){const d=n.createView({baseMipLevel:u++,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),f=o.beginRenderPass({colorAttachments:[{view:d,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),p=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:h}]});f.setPipeline(t),f.setBindGroup(0,p),f.draw(3,1,0,0),f.end(),h=d}}if(!s){const l={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i};for(let h=1;h<e.mipLevelCount;++h)o.copyTextureToTexture({texture:n,mipLevel:h-1},{texture:e,mipLevel:h},l),l.width=Math.ceil(l.width/2),l.height=Math.ceil(l.height/2)}return this.device.queue.submit([o.finish()]),s||n.destroy(),e}}class eo{constructor(){this.gpuSources={},this.gpuSamplers={},this.bindGroupHash={},this.textureViewHash={},this.managedTextureSources={},this.uploads={image:kc,buffer:Rc}}contextChange(e){this.gpu=e}initSource(e){if(e.autoGenerateMipmaps){const i=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(i))+1}const t={size:{width:e.pixelWidth,height:e.pixelHeight},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC},n=this.gpu.device.createTexture(t);return this.gpuSources[e.uid]=n,this.managedTextureSources[e.uid]=e,e.on("update",this.onSourceUpdate,this),e.on("destroy",this.onSourceDestroy,this),e.on("resize",this.onSourceResize,this),this.onSourceUpdate(e),n}onSourceUpdate(e){const t=this.gpuSources[e.uid];t&&(this.uploads[e.type]&&this.uploads[e.type].upload(e,t,this.gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&(this.mipmapGenerator||(this.mipmapGenerator=new Uc(this.gpu.device)),this.mipmapGenerator.generateMipmap(t)))}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this);const t=this.gpuSources[e.uid];delete this.gpuSources[e.uid],t.destroy()}onSourceResize(e){const t=this.gpuSources[e.uid];(t.width!==e.pixelWidth||t.height!==e.pixelHeight)&&(this.gpuSources[e.uid].destroy(),this.gpuSources[e.uid]=null,this.initSource(e))}initSampler(e){return this.gpuSamplers[e.resourceId]=this.gpu.device.createSampler(e),this.gpuSamplers[e.resourceId]}getGpuSampler(e){return this.gpuSamplers[e.resourceId]||this.initSampler(e)}getGpuSource(e){return this.gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){var t;return(t=this.bindGroupHash[e.id])!=null?t:this.createTextureBindGroup(e)}createTextureBindGroup(e){const t=e.id;return this.bindGroupHash[t]=new be({0:e.source,1:e.style}),this.bindGroupHash[t]}getTextureView(e){var t;const n=e.source;return(t=this.textureViewHash[n.uid])!=null?t:this.createTextureView(n)}createTextureView(e){return this.textureViewHash[e.uid]=this.getGpuSource(e).createView(),this.textureViewHash[e.uid]}destroy(){throw new Error("Method not implemented.")}}eo.extension={type:[x.WebGPUSystem],name:"texture"};const jv=[...$s,Vs,Ws,eo,Zs,js,Qs,Js,Ks,Hs,Ys,zs],Yv=[...Ns,Xs,qs],Xv=[hi,Vi,Pi],Gc=[],Ic=[],Fc=[];K.handleByNamedList(x.WebGPUSystem,Gc),K.handleByNamedList(x.WebGPUPipes,Ic),K.handleByNamedList(x.WebGPUPipesAdaptor,Fc),K.add(...jv,...Yv,...Xv);class to extends ms{constructor(){super({type:"webgpu",systems:Gc,renderPipes:Ic,renderPipeAdaptors:Fc})}}var qv={__proto__:null,WebGPURenderer:to};function Oc(r,e){e.encoder.finishRenderPass();const t=e.encoder.commandEncoder,n=F.ADAPTER.createCanvas();n.width=r.source.pixelWidth,n.height=r.source.pixelHeight;const i=n.getContext("webgpu");return i.configure({device:e.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"}),t.copyTextureToTexture({texture:e.texture.getGpuSource(r.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:n.width,height:n.height}),e.encoder.restoreRenderPass(),n}function Kv(r,e){for(let t=0;t<r.length;t+=4){const n=e[t+3]=r[t+3];n!==0?(e[t]=Math.round(Math.min(r[t]*255/n,255)),e[t+1]=Math.round(Math.min(r[t+1]*255/n,255)),e[t+2]=Math.round(Math.min(r[t+2]*255/n,255))):(e[t]=r[t],e[t+1]=r[t+1],e[t+2]=r[t+2])}}function Lc(r,e){const t=e.renderTarget.renderTarget;e.renderTarget.bind(r,!1);const n=Math.round(r.source.pixelWidth),i=Math.round(r.source.pixelHeight),s=new Uint8Array(4*n*i),o=F.ADAPTER.createCanvas();o.width=n,o.height=i;const a=e.gl;a.readPixels(Math.round(r.frameX),Math.round(r.frameY),n,i,a.RGBA,a.UNSIGNED_BYTE,s);const l=o.getContext("2d"),h=l.getImageData(0,0,n,i);Kv(s,h.data),l.putImageData(h,0,0);const u=F.ADAPTER.createCanvas();u.width=n,u.height=i;const c=u.getContext("2d");return c.scale(1,-1),c.drawImage(o,0,-i),e.renderTarget.bind(t,!1),u}async function Zv(r,e,t=200){let n;e instanceof to?n=Oc(r,e):n=Lc(r,e),await e.encoder.commandFinished;const i=n.toDataURL(),s=t;console.log(`logging texture ${r.source.width}px ${r.source.height}px`);const o=["font-size: 1px;",`padding: ${s}px 300px;`,`background: url(${i}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",o)}function Qv(r,e){const t=e.gpu.device.createCommandEncoder(),n=F.ADAPTER.createCanvas();n.width=r.source.pixelWidth,n.height=r.source.pixelHeight;const i=n.getContext("webgpu");return i.configure({device:e.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"}),t.copyTextureToTexture({texture:e.texture.getGpuSource(r.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:n.width,height:n.height}),e.gpu.device.queue.submit([t.finish()]),n}const Jv={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};function eb(r){console.log("Render Flow"),["prerender","renderStart","render","renderEnd","postrender"].forEach(e=>{tb(r.runners[e])})}function tb(r){console.log(` - ${r.name}`);for(let e=0;e<r.items.length;e++)console.log(`   ${e+1}.`,r.items[e].constructor.name||"anonymous")}class rb extends ge{constructor(){super(...arguments),this.type="buffer"}}class nb{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}set(e,t,n){const i=t.width,s=t.height;if(n){const o=e.width/2/i,a=e.height/2/s,l=e.x/i+o,h=e.y/s+a;n=I.add(n,I.NW),this.x0=l+o*I.uX(n),this.y0=h+a*I.uY(n),n=I.add(n,2),this.x1=l+o*I.uX(n),this.y1=h+a*I.uY(n),n=I.add(n,2),this.x2=l+o*I.uX(n),this.y2=h+a*I.uY(n),n=I.add(n,2),this.x3=l+o*I.uX(n),this.y3=h+a*I.uY(n)}else this.x0=e.x/i,this.y0=e.y/s,this.x1=(e.x+e.width)/i,this.y1=e.y/s,this.x2=(e.x+e.width)/i,this.y2=(e.y+e.height)/s,this.x3=e.x/i,this.y3=(e.y+e.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}function ib(r,e){if(r===16777215||!e)return e;if(e===16777215||!r)return r;const t=r>>16&255,n=r>>8&255,i=r&255,s=e>>16&255,o=e>>8&255,a=e&255,l=t*s/255,h=n*o/255,u=i*a/255;return(l<<16)+(h<<8)+u}function sb(r,e,t){const n=r.a,i=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty,h=e.a,u=e.b,c=e.c,d=e.d;t.a=n*h+i*c,t.b=n*u+i*d,t.c=s*h+o*c,t.d=s*u+o*d,t.tx=a*h+l*c+e.tx,t.ty=a*u+l*d+e.ty}let ob=0;const ab={canvas:"text",html:"text",bitmap:"bitmapText"},rn=class{constructor(r){this.uid=ob++,this.batched=!0,this.type="text",this.owner=ft,this._bounds=[0,1,0,0],this.boundsDirty=!0,this._autoResolution=rn.defaultAutoResolution,this._resolution=rn.defaultResolution,this.didUpdate=!0;var e,t,n;this.text=(e=r.text)!=null?e:"",this._style=r.style instanceof ke?r.style:new ke(r.style);const i=(t=r.renderMode)!=null?t:this.detectRenderType(this._style);this.type=ab[i],this.anchor=new te(this,0,0),this._resolution=(n=r.resolution)!=null?n:rn.defaultResolution}set text(r){r=r.toString(),this._text!==r&&(this._text=r,this.onUpdate())}get text(){return this._text}get style(){return this._style}set style(r){var e;r=r||{},(e=this._style)==null||e.off("update",this.onUpdate,this),r instanceof ke?this._style=r:this._style=new ke(r),this._style.on("update",this.onUpdate,this),this.onUpdate()}set resolution(r){this._resolution=r}get resolution(){return this._resolution}get bounds(){return this.boundsDirty&&(this.updateBounds(),this.boundsDirty=!1),this._bounds}updateBounds(){const r=this._bounds;if(this.type==="bitmapText"){const e=Bs.measureText(this.text,this._style),t=e.scale,n=e.offsetY*t;r[0]=0,r[1]=n,r[2]=e.width*t,r[3]=e.height*t+n}else{const e=Z.measureText(this.text,this._style);r[0]=0,r[1]=0,r[2]=e.width,r[3]=e.height}}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[1],e[2],e[3])}onUpdate(){this.didUpdate=!0,this.boundsDirty=!0,this.owner.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}`}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],n=-e*this.anchor.x;let i=0;return r.x>=n&&r.x<n+e&&(i=-t*this.anchor.y,r.y>=i&&r.y<i+t)}detectRenderType(r){return ae.has(r.fontFamily)?"bitmap":"canvas"}destroy(r=!1){this.owner=null,this._bounds=null,this.anchor=null,this._style.destroy(r),this._style=null,this._text=null}};let nn=rn;nn.defaultResolution=1,nn.defaultAutoResolution=!0;var lb=Object.defineProperty,Dc=Object.getOwnPropertySymbols,hb=Object.prototype.hasOwnProperty,ub=Object.prototype.propertyIsEnumerable,$c=(r,e,t)=>e in r?lb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,cb=(r,e)=>{for(var t in e||(e={}))hb.call(e,t)&&$c(r,t,e[t]);if(Dc)for(var t of Dc(e))ub.call(e,t)&&$c(r,t,e[t]);return r};class db extends Q{constructor(e){super(cb({view:new nn(e),label:"Text"},e))}get anchor(){return this.view.anchor}set text(e){this.view.text=e}get text(){return this.view.text}set style(e){this.view.style=e}get style(){return this.view.style}}var ro=/iPhone/i,Nc=/iPod/i,zc=/iPad/i,Wc=/\biOS-universal(?:.+)Mac\b/i,no=/\bAndroid(?:.+)Mobile\b/i,Hc=/Android/i,_t=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,sn=/Silk/i,Ce=/Windows Phone/i,Vc=/\bWindows(?:.+)ARM\b/i,jc=/BlackBerry/i,Yc=/BB10/i,Xc=/Opera Mini/i,qc=/\b(CriOS|Chrome)(?:.+)Mobile/i,Kc=/Mobile(?:.+)Firefox\b/i,Zc=function(r){return typeof r!="undefined"&&r.platform==="MacIntel"&&typeof r.maxTouchPoints=="number"&&r.maxTouchPoints>1&&typeof MSStream=="undefined"};function fb(r){return function(e){return e.test(r)}}function Qc(r){var e={userAgent:"",platform:"",maxTouchPoints:0};!r&&typeof navigator!="undefined"?e={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0}:typeof r=="string"?e.userAgent=r:r&&r.userAgent&&(e={userAgent:r.userAgent,platform:r.platform,maxTouchPoints:r.maxTouchPoints||0});var t=e.userAgent,n=t.split("[FBAN");typeof n[1]!="undefined"&&(t=n[0]),n=t.split("Twitter"),typeof n[1]!="undefined"&&(t=n[0]);var i=fb(t),s={apple:{phone:i(ro)&&!i(Ce),ipod:i(Nc),tablet:!i(ro)&&(i(zc)||Zc(e))&&!i(Ce),universal:i(Wc),device:(i(ro)||i(Nc)||i(zc)||i(Wc)||Zc(e))&&!i(Ce)},amazon:{phone:i(_t),tablet:!i(_t)&&i(sn),device:i(_t)||i(sn)},android:{phone:!i(Ce)&&i(_t)||!i(Ce)&&i(no),tablet:!i(Ce)&&!i(_t)&&!i(no)&&(i(sn)||i(Hc)),device:!i(Ce)&&(i(_t)||i(sn)||i(no)||i(Hc))||i(/\bokhttp\b/i)},windows:{phone:i(Ce),tablet:i(Vc),device:i(Ce)||i(Vc)},other:{blackberry:i(jc),blackberry10:i(Yc),opera:i(Xc),firefox:i(Kc),chrome:i(qc),device:i(jc)||i(Yc)||i(Xc)||i(Kc)||i(qc)},any:!1,phone:!1,tablet:!1};return s.any=s.apple.device||s.android.device||s.windows.device||s.other.device,s.phone=s.apple.phone||s.android.phone||s.windows.phone,s.tablet=s.apple.tablet||s.android.tablet||s.windows.tablet,s}var Jc;const pb=(Jc=Qc.default)!=null?Jc:Qc,mb=pb(globalThis.navigator);class ed{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e!=null?e:new B,this.observer=t,this.position=new te(this,0,0),this.scale=new te(this,1,1),this.pivot=new te(this,0,0),this.skew=new te(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}onUpdate(e){var t;this.dirty=!0,e===this.skew&&this.updateSkew(),(t=this.observer)==null||t.onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.updateSkew())}}var gb=Object.defineProperty,td=Object.getOwnPropertySymbols,vb=Object.prototype.hasOwnProperty,bb=Object.prototype.propertyIsEnumerable,rd=(r,e,t)=>e in r?gb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,nd=(r,e)=>{for(var t in e||(e={}))vb.call(e,t)&&rd(r,t,e[t]);if(td)for(var t of td(e))bb.call(e,t)&&rd(r,t,e[t]);return r};let yb=0;const id=class{constructor(r){this.batched=!0,this.owner=ft,this.uid=yb++,this.type="tilingSprite",this.onRenderableUpdate=At,this._bounds=[0,1,0,0],this.boundsDirty=!0,r=nd(nd({},id.defaultOptions),r),this.anchor=new te(this,0,0),this.applyAnchorToTexture=r.applyAnchorToTexture,this.texture=r.texture,this._width=r.width,this._height=r.height,this.tileTransform=new ed({observer:this})}get bounds(){return this.boundsDirty&&(this.updateBounds(),this.boundsDirty=!1),this._bounds}updateBounds(){const r=this._bounds,e=this.anchor,t=this._width,n=this._height;r[1]=-e._x*t,r[0]=r[1]+t,r[3]=-e._y*n,r[2]=r[3]+n}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[2],e[1],e[3])}set texture(r){this._texture!==r&&(this._texture=r,this.onUpdate())}get texture(){return this._texture}set width(r){this._width=r,this.onUpdate()}get width(){return this._width}set height(r){this._height=r,this.onUpdate()}get height(){return this._height}onUpdate(){this.boundsDirty=!0,this.didUpdate=!0,this.owner.onViewUpdate()}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],n=-e*this.anchor.x;let i=0;return r.x>=n&&r.x<n+e&&(i=-t*this.anchor.y,r.y>=i&&r.y<i+t)}destroy(r=!1){if(this.onRenderableUpdate=At,this.anchor=null,this.tileTransform=null,this._bounds=null,typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._texture.destroy(e)}this._texture=null}};let io=id;io.defaultOptions={texture:k.WHITE,width:256,height:256,applyAnchorToTexture:!1};var xb=Object.defineProperty,sd=Object.getOwnPropertySymbols,wb=Object.prototype.hasOwnProperty,_b=Object.prototype.propertyIsEnumerable,od=(r,e,t)=>e in r?xb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Tb=(r,e)=>{for(var t in e||(e={}))wb.call(e,t)&&od(r,t,e[t]);if(sd)for(var t of sd(e))_b.call(e,t)&&od(r,t,e[t]);return r};class Sb extends Q{constructor(e){super(Tb({view:new io(e),label:"TilingSprite"},e))}set texture(e){this.view.texture=e}get texture(){return this.view.texture}get anchor(){return this.view.anchor}get width(){return this.view.width}set width(e){this.view.width=e}get height(){return this.view.height}set height(e){this.view.height=e}get tilePosition(){return this.view.tileTransform.position}set tilePosition(e){this.view.tileTransform.position.copyFrom(e)}get tileScale(){return this.view.tileTransform.scale}set tileScale(e){this.view.tileTransform.scale.copyFrom(e)}set tileRotation(e){this.view.tileTransform.rotation=e}get tileRotation(){return this.view.tileTransform.rotation}get tileTransform(){return this.view.tileTransform}}let so;async function Pb(){return so!=null||(so=(async()=>{var r;const e=F.ADAPTER.createCanvas().getContext("webgl");if(!e)return xt.UNPACK;const t=document.createElement("video");t.autoplay=!1,t.crossOrigin="anonymous",t.preload="auto",t.src=URL.createObjectURL(new Blob([new Uint8Array([26,69,223,163,159,66,134,129,1,66,247,129,1,66,242,129,4,66,243,129,8,66,130,132,119,101,98,109,66,135,129,2,66,133,129,2,24,83,128,103,1,0,0,0,0,0,1,211,17,77,155,116,186,77,187,139,83,171,132,21,73,169,102,83,172,129,161,77,187,139,83,171,132,22,84,174,107,83,172,129,198,77,187,140,83,171,132,18,84,195,103,83,172,130,1,23,77,187,140,83,171,132,28,83,187,107,83,172,130,1,189,236,1,0,0,0,0,0,0,89,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,21,73,169,102,160,42,215,177,131,15,66,64,77,128,132,76,97,118,102,87,65,132,76,97,118,102,68,137,136,64,143,64,0,0,0,0,0,22,84,174,107,204,174,1,0,0,0,0,0,0,67,215,129,1,115,197,136,0,0,0,0,0,0,0,1,156,129,0,34,181,156,131,117,110,100,136,129,0,134,133,86,95,86,80,57,131,129,1,35,227,131,132,59,154,202,0,224,148,176,129,2,186,129,2,154,129,2,83,192,129,1,85,176,132,85,185,129,1,18,84,195,103,213,115,115,210,99,192,139,99,197,136,0,0,0,0,0,0,0,1,103,200,156,69,163,135,69,78,67,79,68,69,82,68,135,143,76,97,118,99,32,108,105,98,118,112,120,45,118,112,57,103,200,162,69,163,136,68,85,82,65,84,73,79,78,68,135,148,48,48,58,48,48,58,48,49,46,48,48,48,48,48,48,48,48,48,0,0,31,67,182,117,199,231,129,0,160,194,161,160,129,0,0,0,130,73,131,66,0,0,16,0,22,0,56,36,28,24,74,0,0,32,32,0,17,191,255,255,138,254,0,0,117,161,157,166,155,238,129,1,165,150,130,73,131,66,0,0,16,0,22,0,56,36,28,24,74,0,0,32,32,0,72,64,28,83,187,107,145,187,143,179,129,0,183,138,247,129,1,241,130,1,113,240,129,3])],{type:"video/webm"})),t.load(),await new Promise(o=>{function a(){t.readyState<=1?setTimeout(a,1):o()}a()});const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);const s=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,s),e.deleteFramebuffer(i),e.deleteTexture(n),(r=e.getExtension("WEBGL_lose_context"))==null||r.loseContext(),URL.revokeObjectURL(t.src),s[0]<=s[3]?xt.PMA:xt.UNPACK})()),so}const Eb=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;var Mb=Object.defineProperty,Cb=Object.defineProperties,Ab=Object.getOwnPropertyDescriptors,ad=Object.getOwnPropertySymbols,Bb=Object.prototype.hasOwnProperty,Rb=Object.prototype.propertyIsEnumerable,ld=(r,e,t)=>e in r?Mb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,hd=(r,e)=>{for(var t in e||(e={}))Bb.call(e,t)&&ld(r,t,e[t]);if(ad)for(var t of ad(e))Rb.call(e,t)&&ld(r,t,e[t]);return r},kb=(r,e)=>Cb(r,Ab(e));const Ub=["#000080","#228B22","#8B0000","#4169E1","#008080","#800000","#9400D3","#FF8C00","#556B2F","#8B008B"];let Gb=0;function ud(r,e=0,t={color:"#000000"}){r.isLayerRoot&&(t.color=Ub[Gb++]);let n="";for(let o=0;o<e;o++)n+="    ";let i=r.label;!i&&r instanceof Ge&&(i=`sprite:${r.view.texture.label}`);let s=`%c ${n}|- ${i} (worldX:${r.worldTransform.tx}, layerX:${r.layerTransform.tx}, localX:${r.x})`;r.isLayerRoot&&(s+=" (LayerGroup)"),r.filters&&(s+="(*filters)"),console.log(s,`color:${t.color}; font-weight:bold;`),e++;for(let o=0;o<r.children.length;o++){const a=r.children[o];ud(a,e,hd({},t))}}function cd(r,e=0,t={index:0,color:"#000000"}){let n="";for(let s=0;s<e;s++)n+="    ";const i=`%c ${n}- ${t.index}: ${r.root.label} worldX:${r.worldTransform.tx}`;console.log(i,`color:${t.color}; font-weight:bold;`),e++;for(let s=0;s<r.layerGroupChildren.length;s++){const o=r.layerGroupChildren[s];cd(o,e,kb(hd({},t),{index:s}))}}var Ib=`fn getLuminosity(c: vec3<f32>) -> f32 {
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
}`;export{xt as ALPHA_MODES,ms as AbstractRenderer,ph as AlphaFilter,Nn as AlphaMask,Ni as AlphaMaskPipe,Vn as Application,$t as Assets,hl as AssetsClass,Kt as BUFFER_TYPE,Ja as BackgroundLoader,Qr as BackgroundSystem,fi as Batch,eh as BatchGeometry,Fr as BatchableGraphics,su as BatchableMesh,Ps as BatchableSprite,pi as Batcher,mi as BatcherPipe,H as BigPool,be as BindGroup,zs as BindGroupSystem,bn as BitmapFont,Bs as BitmapFontManager,Rs as BitmapTextPipe,X as BlendModeFilter,Is as BlendModePipe,pe as Bounds,go as BrowserAdapter,se as Buffer,rb as BufferImageSource,jr as BufferResource,Ws as BufferSystem,D as BufferUsage,ae as Cache,Qt as CanvasPool,oc as CanvasPoolClass,_u as CanvasSource,Z as CanvasTextMetrics,ks as CanvasTextPipe,Us as CanvasTextSystem,on as Circle,zn as ColorMask,zi as ColorMaskPipe,gm as ColorMatrixFilter,wn as ColorNames,Q as Container,Eb as DATA_URI,So as DEG_TO_RAD,vm as DisplacementFilter,fc as DynamicBitmapFont,an as Ellipse,Fa as EventBoundary,Ft as EventSystem,Ee as EventsTicker,x as ExtensionType,Da as FederatedContainer,rr as FederatedEvent,Gt as FederatedMouseEvent,he as FederatedPointerEvent,qe as FederatedWheelEvent,lt as FillGradient,mr as FillPattern,ye as Filter,br as FilterEffect,wi as FilterPipe,_i as FilterSystem,Jv as GLSL_TO_STD40_SIZE,Wr as GL_FORMATS,qi as GL_TARGETS,$ as GL_TYPES,du as GL_WRAP_MODES,Wt as Geometry,Qi as GlBackBufferSystem,oi as GlBatchAdaptor,cu as GlBuffer,Xi as GlBufferSystem,Ji as GlColorMaskSystem,zr as GlContextSystem,es as GlEncoderSystem,Zi as GlGeometrySystem,Ti as GlGraphicsAdaptor,Hi as GlMeshAdaptor,xe as GlProgram,Pu as GlProgramData,xg as GlRenderSurface,gu as GlRenderTarget,ns as GlRenderTargetSystem,hs as GlShaderSystem,ds as GlStateSystem,is as GlStencilSystem,Fu as GlTexture,ps as GlTextureSystem,us as GlUniformGroupSystem,Fs as GlobalUniformSystem,hi as GpuBatchAdaptor,fe as GpuBlendModesToPixi,Hs as GpuColorMaskSystem,Vs as GpuDeviceSystem,js as GpuEncoderSystem,Pi as GpuGraphicsAdaptor,eu as GpuGraphicsContext,Vi as GpuMeshAdapter,Uc as GpuMipmapGenerator,ue as GpuProgram,Lv as GpuReadBuffer,Bc as GpuRenderTarget,Zs as GpuRenderTargetSystem,ru as GpuScissorMaskPipe,Qs as GpuShaderSystem,Js as GpuStateSystem,we as GpuStencilModesToPixi,Ys as GpuStencilSystem,eo as GpuTextureSystem,Xs as GpuUniformBatchPipe,qs as GpuUniformBufferPipe,eg as Graphics,Re as GraphicsContext,tu as GraphicsContextRenderData,Di as GraphicsContextSystem,nt as GraphicsPath,$i as GraphicsPipe,Ii as GraphicsView,en as HelloSystem,Rg as IGLUniformData,Bt as ImageSource,Ba as InstructionSet,Ra as LayerGroup,xs as LayerPipe,nu as LayerRenderable,Ss as LayerSystem,rl as Loader,Te as LoaderParserPriority,ce as MAX_TEXTURES,ac as MSAA_QUALITY,yr as MaskEffectManager,_a as MaskEffectManagerClass,Sh as MaskFilter,B as Matrix,bg as Mesh,Ht as MeshGeometry,Yi as MeshPipe,uu as MeshShader,Vt as MeshView,At as NOOP,ri as NineSliceGeometry,rm as NineSlicePlane,si as NineSliceSprite,Rh as NoiseFilter,te as ObservablePoint,_o as PI_2,Ks as PipelineSystem,ti as PlaneGeometry,N as Point,rt as Polygon,xa as Pool,wa as PoolGroupClass,Kr as ProxyRenderable,gs as QuadGeometry,To as RAD_TO_DEG,q as Rectangle,bt as RenderTarget,dn as ResizePlugin,ll as Resolver,ln as RoundedRectangle,ee as STENCIL_MODES,Jo as SVGParser,Ho as SVGToGraphicsPath,dg as ScissorMask,ic as SdfShader,Me as Shader,mt as ShaderStage,Ko as ShapePath,Ns as SharedRenderPipes,$s as SharedSystems,Bl as ShockwaveFilter,Ge as Sprite,Es as SpritePipe,za as SpriteView,Tr as Spritesheet,_e as State,Wn as StencilMask,Wi as StencilMaskPipe,Hr as SystemRunner,db as Text,cr as TextFormat,ke as TextStyle,nn as TextView,k as Texture,lh as TextureBatchOutput,hh as TextureBatcher,gn as TextureLayout,vn as TextureMatrix,de as TexturePool,Gh as TexturePoolClass,ge as TextureSource,De as TextureStyle,nb as TextureUvs,st as Ticker,or as TickerListener,cn as TickerPlugin,Sb as TilingSprite,bs as TilingSpritePipe,qu as TilingSpriteShader,io as TilingSpriteView,ed as Transform,oo as Triangle,Ln as UPDATE_BLEND,wr as UPDATE_COLOR,it as UPDATE_PRIORITY,Nf as UPDATE_TRANSFORM,_r as UPDATE_VISIBLE,Ec as UniformBufferBatch,Ls as UniformBufferSystem,Y as UniformGroup,Ds as VERSION,tn as ViewSystem,ui as ViewableBuffer,Os as WGSL_TO_STD40_SIZE,Pc as WebGLRenderer,to as WebGPURenderer,Gn as WorkerManager,yn as XMLFormat,xn as XMLStringFormat,Fn as _getGlobalBounds,Sr as addMaskBounds,Pr as addMaskLocalBounds,gi as alphaWgsl,Ku as applyMatrix,qa as autoDetectRenderer,Mr as batchSamplersUniformGroup,Xl as batcherTemplateFrag,ql as batcherTemplateVert,ai as batcherTemplateWgsl,Mo as bitmapFontCachePlugin,mh as blendTemplateFrag,gh as blendTemplateVert,vh as blendTemplateWgsl,Sn as buildAdaptiveBezier,jo as buildAdaptiveQuadratic,Mn as buildArc,Yo as buildArcTo,qo as buildArcToSvg,Qe as buildCircle,Qh as buildContextBatches,sg as buildGeometryFromPath,iu as buildInstructions,Hh as buildLine,ki as buildPolygon,Ui as buildRectangle,Oi as buildSimpleUvs,Gi as buildTriangle,Fi as buildUvs,Ao as cacheTextureArray,vu as calculateProjection,ot as checkDataUrl,at as checkExtension,ga as childrenHelperMixin,Nh as closePointEps,vt as collectAllRenderables,ws as collectLayerGroups,jt as color32BitToUniform,vi as colorMatrixFilterWgsl,Bm as colorToUniform,Wu as compareModeToGlCompare,ss as compileShader,ve as convertColorToNumber,kt as convertFillInputToFillStyle,fr as convertNumberToHex,le as convertToList,ar as copySearchParams,hr as createIdFromString,il as createStringVariations,ha as createTexture,bc as createUBOElements,oh as currentCopy,Rr as currentCount,Mi as curveEps,vc as defaultBackgroundOptions,as as defaultValue,ni as deprecation,Bo as detectAvif,ko as detectDefaults,Uo as detectMp4,Go as detectOgv,Pb as detectVideoAlphaMode,Io as detectWebm,Fo as detectWebp,bi as displacementWgsl,Ta as effectsMixin,ft as emptyViewObserver,ei as ensureIsBuffer,pl as ensurePrecision,ys as executeInstructions,K as extensions,vl as extractStructAndGroups,Ar as fastCopy,Sa as findMixin,Jt as fontStringFromTextStyle,Er as generateBatchGlProgram,Cr as generateBatchProgram,rh as generateBindingSrc,Kl as generateDefaultBatchGlProgram,nh as generateDefaultBatchProgram,Lh as generateDefaultGraphicsBatchGlProgram,Dh as generateDefaultGraphicsBatchProgram,rc as generateDefaultSdfBatchGlProgram,nc as generateDefaultSdfBatchProgram,sm as generateGPULayout,bl as generateGpuLayoutGroups,im as generateLayout,yl as generateLayoutHash,Uu as generateProgram,th as generateSampleSrc,Ke as generateUID,yc as generateUniformBufferSync,Gu as generateUniformsSync,Cu as getAttributeData,ih as getBatchedGeometry,As as getBitmapTextLayout,er as getCanvasFillStyle,Vr as getCanvasTexture,ba as getFilterEffect,No as getFontFamilyName,pu as getGlInfoFromFormat,ct as getGlobalBounds,Ih as getGlobalRenderableBounds,Xe as getLocalBounds,$n as getMatrixRelativeToParent,zh as getOrientationOfPoints,Ea as getParent,On as getRenderableUID,aa as getResolutionOfUrl,li as getTextureBatchBindGroup,fg as getTextureDefaultMatrix,Au as getUniformBufferData,Bu as getUniformData,Ou as glUploadBufferImageResource,Lu as glUploadImageResource,Rc as gpuUploadBufferImageResource,kc as gpuUploadImageResource,Fh as graphicsBatcherTemplateFrag,Oh as graphicsBatcherTemplateVert,Si as graphicsBatcherTemplateWgsl,I as groupD8,Zr as hex2rgb,sc as hex2string,Ib as hslWgsl,Ur as hslgl,Gr as hslgpu,mb as isMobile,Lp as isPow2,ts as isRenderingToScreen,Dt as isSingleItem,da as loadImageBitmap,Oo as loadJson,oa as loadSvg,In as loadTextures,Lo as loadTxt,zo as loadWebFont,Dp as log2,Zv as logDebugTexture,cd as logLayerGroupScene,ku as logProgramError,eb as logRenderFlow,ud as logScene,Qv as logTexture,Du as mapFormatToGlFormat,$u as mapFormatToGlInternalFormat,Nu as mapFormatToGlType,Eu as mapSize,ls as mapType,Iu as mapWebGLBlendModesToPixi,_h as maskFrag,Th as maskVert,yi as maskWgsl,Ma as measureMixin,lu as meshDefaultFrag,hu as meshDefaultVert,ji as meshDefaultWgsl,zu as mipmapScaleModeToGlFilter,ci as missing,Br as missingCount,Ir as mixColors,Ei as mixHexColors,Rm as mixStandardAnd32BitColors,ib as multiplyHexColors,Ze as nextPow2,Ph as noiseFrag,Eh as noiseVert,xi as noiseWgsl,Mt as normalizeExtensionPriority,Ca as onRenderMixin,ah as optimizeBindings,ie as path,ma as removeItems,dc as resolveCharacters,fa as resolveTextureUrl,ya as returnFilterEffect,Kg as rgb2hex,wc as sayHello,fs as scaleModeToGlFilter,ec as sdfBatcherTemplateFrag,tc as sdfBatcherTemplateVert,Ms as sdfBatcherTemplateWgsl,ml as setProgramName,gl as setProgramVersion,F as settings,Sl as shockwaveFrag,Pl as shockwaveVert,Jn as shockwaveWgsl,Na as spritesheetAsset,qg as string2hex,Va as tempBounds,dr as testVideoFormat,Oc as textureToCanvas,Lc as textureToCanvasWebGL,Yu as tilingSpriteFrag,Xu as tilingSpriteVert,vs as tilingSpriteWgsl,Aa as toLocalGlobalMixin,Nr as transformVertices,Ri as triangulateWithHoles,Jr as uniformBufferParsers,Xr as uniformParsers,_s as updateLayerGroupTransforms,Zu as updateLayerTransform,Pe as updateLocalTransform,Ts as updateTransformAndChildren,Ut as updateTransformBackwards,sb as updateWorldTransform,kr as usedSlots,Ju as validateRenderables,qr as wrapModeToGlAddress,Co as xmlBitmapFontLoader};
//# sourceMappingURL=pixi.min.mjs.map
