/*!
 * PixiJS - v8.0.0-alpha.2
 * Compiled Fri, 04 Aug 2023 12:36:22 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */var Xd=Object.defineProperty,qd=Object.defineProperties,Kd=Object.getOwnPropertyDescriptors,Co=Object.getOwnPropertySymbols,Zd=Object.prototype.hasOwnProperty,Qd=Object.prototype.propertyIsEnumerable,Bo=(r,e,t)=>e in r?Xd(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ro=(r,e)=>{for(var t in e||(e={}))Zd.call(e,t)&&Bo(r,t,e[t]);if(Co)for(var t of Co(e))Qd.call(e,t)&&Bo(r,t,e[t]);return r},Jd=(r,e)=>qd(r,Kd(e)),x=(r=>(r.Renderer="renderer",r.Application="application",r.WebGLPipes="webgl-pipes",r.WebGLPipesAdaptor="webgl-pipes-adaptor",r.WebGLSystem="webgl-system",r.WebGPUPipes="webgpu-pipes",r.WebGPUPipesAdaptor="webgpu-pipes-adaptor",r.WebGPUSystem="webgpu-system",r.CanvasSystem="canvas-system",r.CanvasPipesAdaptor="canvas-pipes-adaptor",r.CanvasPipes="canvas-pipes",r.Asset="asset",r.LoadParser="load-parser",r.ResolveParser="resolve-parser",r.CacheParser="cache-parser",r.DetectionParser="detection-parser",r.MaskEffect="mask-effect",r))(x||{});const mn=r=>{if(typeof r=="function"||typeof r=="object"&&r.extension){const e=typeof r.extension!="object"?{type:r.extension}:r.extension;r=Jd(Ro({},e),{ref:r})}if(typeof r=="object")r=Ro({},r);else throw new Error("Invalid extension type");return typeof r.type=="string"&&(r.type=[r.type]),r},Bt=(r,e)=>{var t;return(t=mn(r).priority)!=null?t:e},Z={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...r){return r.map(mn).forEach(e=>{e.type.forEach(t=>{var n,i;return(i=(n=this._removeHandlers)[t])==null?void 0:i.call(n,e)})}),this},add(...r){return r.map(mn).forEach(e=>{e.type.forEach(t=>{const n=this._addHandlers,i=this._queue;n[t]?n[t](e):(i[t]=i[t]||[],i[t].push(e))})}),this},handle(r,e,t){const n=this._addHandlers,i=this._removeHandlers;n[r]=e,i[r]=t;const s=this._queue;return s[r]&&(s[r].forEach(o=>e(o)),delete s[r]),this},handleByMap(r,e){return this.handle(r,t=>{e[t.name]=t.ref},t=>{delete e[t.name]})},handleByNamedList(r,e,t=-1){return this.handle(r,n=>{e.findIndex(i=>i.name===n.name)>=0||(e.push({name:n.name,value:n.ref}),e.sort((i,s)=>Bt(s.value,t)-Bt(i.value,t)))},n=>{const i=e.findIndex(s=>s.name===n.name);i!==-1&&e.splice(i,1)})},handleByList(r,e,t=-1){return this.handle(r,n=>{e.includes(n.ref)||(e.push(n.ref),e.sort((i,s)=>Bt(s,t)-Bt(i,t)))},n=>{const i=e.indexOf(n.ref);i!==-1&&e.splice(i,1)})}};var ht=(r=>(r[r.INTERACTION=50]="INTERACTION",r[r.HIGH=25]="HIGH",r[r.NORMAL=0]="NORMAL",r[r.LOW=-25]="LOW",r[r.UTILITY=-50]="UTILITY",r))(ht||{});class fr{constructor(e,t=null,n=0,i=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=e,this._context=t,this.priority=n,this._once=i}match(e,t=null){return this._fn===e&&this._context===t}emit(e){this._fn&&(this._context?this._fn.call(this._context,e):this._fn(e));const t=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),t}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const t=this.next;return this.next=e?null:t,this.previous=null,t}}const ce=class{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new fr(null,null,1/0),this.deltaMS=1/ce.targetFPMS,this.elapsedMS=1/ce.targetFPMS,this._tick=r=>{this._requestId=null,this.started&&(this.update(r),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(r,e,t=ht.NORMAL){return this._addListener(new fr(r,e,t))}addOnce(r,e,t=ht.NORMAL){return this._addListener(new fr(r,e,t,!0))}_addListener(r){let e=this._head.next,t=this._head;if(!e)r.connect(t);else{for(;e;){if(r.priority>e.priority){r.connect(t);break}t=e,e=e.next}r.previous||r.connect(t)}return this._startIfPossible(),this}remove(r,e){let t=this._head.next;for(;t;)t.match(r,e)?t=t.destroy():t=t.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let r=0,e=this._head;for(;e=e.next;)r++;return r}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let r=this._head.next;for(;r;)r=r.destroy(!0);this._head.destroy(),this._head=null}}update(r=performance.now()){let e;if(r>this.lastTime){if(e=this.elapsedMS=r-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const i=r-this._lastFrame|0;if(i<this._minElapsedMS)return;this._lastFrame=r-i%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*ce.targetFPMS;const t=this._head;let n=t.next;for(;n;)n=n.emit(this);t.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=r}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(r){const e=Math.min(this.maxFPS,r),t=Math.min(Math.max(0,e)/1e3,ce.targetFPMS);this._maxElapsedMS=1/t}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(r){if(r===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,r);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!ce._shared){const r=ce._shared=new ce;r.autoStart=!0,r._protected=!0}return ce._shared}static get system(){if(!ce._system){const r=ce._system=new ce;r.autoStart=!0,r._protected=!0}return ce._system}};let ct=ce;ct.targetFPMS=.06;class vn{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,ht.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?ct.shared:new ct,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}vn.extension=x.Application;class bn{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,n;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,n=globalThis.innerHeight;else{const{clientWidth:i,clientHeight:s}=this._resizeTo;t=i,n=s}this.renderer.resize(t,n),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}bn.extension=x.Application,Z.add(bn),Z.add(vn);var Ae=(r=>(r[r.Low=0]="Low",r[r.Normal=1]="Normal",r[r.High=2]="High",r))(Ae||{});const pr=(r,e)=>{const t=e.split("?")[1];return t&&(r+=`?${t}`),r},ko={createCanvas:(r,e)=>{const t=document.createElement("canvas");return t.width=r,t.height=e,t},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>{var r;return(r=document.baseURI)!=null?r:window.location.href},getFontFaceSet:()=>document.fonts,fetch:(r,e)=>fetch(r,e),parseXML:r=>new DOMParser().parseFromString(r,"text/xml")},$={ADAPTER:ko,RETINA_PREFIX:/@([0-9\.]+)x/,FAIL_IF_MAJOR_PERFORMANCE_CAVEAT:!1,RESOLUTION:2};function _e(r){if(typeof r!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`)}function Rt(r){return r.split("?")[0].split("#")[0]}function ef(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function tf(r,e,t){return r.replace(new RegExp(ef(e),"g"),t)}function rf(r,e){let t="",n=0,i=-1,s=0,o=-1;for(let a=0;a<=r.length;++a){if(a<r.length)o=r.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(i===a-1||s===1))if(i!==a-1&&s===2){if(t.length<2||n!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){const l=t.lastIndexOf("/");if(l!==t.length-1){l===-1?(t="",n=0):(t=t.slice(0,l),n=t.length-1-t.lastIndexOf("/")),i=a,s=0;continue}}else if(t.length===2||t.length===1){t="",n=0,i=a,s=0;continue}}e&&(t.length>0?t+="/..":t="..",n=2)}else t.length>0?t+=`/${r.slice(i+1,a)}`:t=r.slice(i+1,a),n=a-i-1;i=a,s=0}else o===46&&s!==-1?++s:s=-1}return t}const ae={toPosix(r){return tf(r,"\\","/")},isUrl(r){return/^https?:/.test(this.toPosix(r))},isDataUrl(r){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(r)},hasProtocol(r){return/^[^/:]+:\//.test(this.toPosix(r))},getProtocol(r){_e(r),r=this.toPosix(r);let e="";const t=/^file:\/\/\//.exec(r),n=/^[^/:]+:\/\//.exec(r),i=/^[^/:]+:\//.exec(r);if(t||n||i){const s=(t==null?void 0:t[0])||(n==null?void 0:n[0])||(i==null?void 0:i[0]);e=s,r=r.slice(s.length)}return e},toAbsolute(r,e,t){if(this.isDataUrl(r))return r;const n=Rt(this.toPosix(e!=null?e:$.ADAPTER.getBaseUrl())),i=Rt(this.toPosix(t!=null?t:this.rootname(n)));return _e(r),r=this.toPosix(r),r.startsWith("/")?ae.join(i,r.slice(1)):this.isAbsolute(r)?r:this.join(n,r)},normalize(r){if(r=this.toPosix(r),_e(r),r.length===0)return".";let e="";const t=r.startsWith("/");this.hasProtocol(r)&&(e=this.rootname(r),r=r.slice(e.length));const n=r.endsWith("/");return r=rf(r,!1),r.length>0&&n&&(r+="/"),t?`/${r}`:e+r},isAbsolute(r){return _e(r),r=this.toPosix(r),this.hasProtocol(r)?!0:r.startsWith("/")},join(...r){var e;if(r.length===0)return".";let t;for(let n=0;n<r.length;++n){const i=r[n];if(_e(i),i.length>0)if(t===void 0)t=i;else{const s=(e=r[n-1])!=null?e:"";this.extname(s)?t+=`/../${i}`:t+=`/${i}`}}return t===void 0?".":this.normalize(t)},dirname(r){if(_e(r),r.length===0)return".";r=this.toPosix(r);let e=r.charCodeAt(0);const t=e===47;let n=-1,i=!0;const s=this.getProtocol(r),o=r;r=r.slice(s.length);for(let a=r.length-1;a>=1;--a)if(e=r.charCodeAt(a),e===47){if(!i){n=a;break}}else i=!1;return n===-1?t?"/":this.isUrl(o)?s+r:s:t&&n===1?"//":s+r.slice(0,n)},rootname(r){_e(r),r=this.toPosix(r);let e="";if(r.startsWith("/")?e="/":e=this.getProtocol(r),this.isUrl(r)){const t=r.indexOf("/",e.length);t!==-1?e=r.slice(0,t):e=r,e.endsWith("/")||(e+="/")}return e},basename(r,e){_e(r),e&&_e(e),r=Rt(this.toPosix(r));let t=0,n=-1,i=!0,s;if(e!==void 0&&e.length>0&&e.length<=r.length){if(e.length===r.length&&e===r)return"";let o=e.length-1,a=-1;for(s=r.length-1;s>=0;--s){const l=r.charCodeAt(s);if(l===47){if(!i){t=s+1;break}}else a===-1&&(i=!1,a=s+1),o>=0&&(l===e.charCodeAt(o)?--o===-1&&(n=s):(o=-1,n=a))}return t===n?n=a:n===-1&&(n=r.length),r.slice(t,n)}for(s=r.length-1;s>=0;--s)if(r.charCodeAt(s)===47){if(!i){t=s+1;break}}else n===-1&&(i=!1,n=s+1);return n===-1?"":r.slice(t,n)},extname(r){_e(r),r=Rt(this.toPosix(r));let e=-1,t=0,n=-1,i=!0,s=0;for(let o=r.length-1;o>=0;--o){const a=r.charCodeAt(o);if(a===47){if(!i){t=o+1;break}continue}n===-1&&(i=!1,n=o+1),a===46?e===-1?e=o:s!==1&&(s=1):e!==-1&&(s=-1)}return e===-1||n===-1||s===0||s===1&&e===n-1&&e===t+1?"":r.slice(e,n)},parse(r){_e(r);const e={root:"",dir:"",base:"",ext:"",name:""};if(r.length===0)return e;r=Rt(this.toPosix(r));let t=r.charCodeAt(0);const n=this.isAbsolute(r);let i;const s="";e.root=this.rootname(r),n||this.hasProtocol(r)?i=1:i=0;let o=-1,a=0,l=-1,u=!0,h=r.length-1,c=0;for(;h>=i;--h){if(t=r.charCodeAt(h),t===47){if(!u){a=h+1;break}continue}l===-1&&(u=!1,l=h+1),t===46?o===-1?o=h:c!==1&&(c=1):o!==-1&&(c=-1)}return o===-1||l===-1||c===0||c===1&&o===l-1&&o===a+1?l!==-1&&(a===0&&n?e.base=e.name=r.slice(1,l):e.base=e.name=r.slice(a,l)):(a===0&&n?(e.name=r.slice(1,o),e.base=r.slice(1,l)):(e.name=r.slice(a,o),e.base=r.slice(a,l)),e.ext=r.slice(o,l)),e.dir=this.dirname(r),s&&(e.dir=s+e.dir),e},sep:"/",delimiter:":"};class W{constructor(e=0,t=0){this.x=0,this.y=0,this.x=e,this.y=t}clone(){return new W(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,t=e){return this.x=e,this.y=t,this}static get shared(){return yn.x=0,yn.y=0,yn}}const yn=new W,gr=[new W,new W,new W,new W];class q{constructor(e=0,t=0,n=0,i=0){this.type="rectangle",this.x=Number(e),this.y=Number(t),this.width=Number(n),this.height=Number(i)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}static get EMPTY(){return new q(0,0,0,0)}clone(){return new q(this.x,this.y,this.width,this.height)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&t>=this.y&&t<this.y+this.height}intersects(e,t){if(!t){const P=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=P)return!1;const w=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>w}const n=this.left,i=this.right,s=this.top,o=this.bottom;if(i<=n||o<=s)return!1;const a=gr[0].set(e.left,e.top),l=gr[1].set(e.left,e.bottom),u=gr[2].set(e.right,e.top),h=gr[3].set(e.right,e.bottom);if(u.x<=a.x||l.y<=a.y)return!1;const c=Math.sign(t.a*t.d-t.b*t.c);if(c===0||(t.apply(a,a),t.apply(l,l),t.apply(u,u),t.apply(h,h),Math.max(a.x,l.x,u.x,h.x)<=n||Math.min(a.x,l.x,u.x,h.x)>=i||Math.max(a.y,l.y,u.y,h.y)<=s||Math.min(a.y,l.y,u.y,h.y)>=o))return!1;const d=c*(l.y-a.y),f=c*(a.x-l.x),p=d*n+f*s,m=d*i+f*s,g=d*n+f*o,y=d*i+f*o;if(Math.max(p,m,g,y)<=d*a.x+f*a.y||Math.min(p,m,g,y)>=d*h.x+f*h.y)return!1;const v=c*(a.y-u.y),b=c*(u.x-a.x),_=v*n+b*s,S=v*i+b*s,M=v*n+b*o,B=v*i+b*o;return!(Math.max(_,S,M,B)<=v*a.x+b*a.y||Math.min(_,S,M,B)>=v*h.x+b*h.y)}pad(e=0,t=e){return this.x-=e,this.y-=t,this.width+=e*2,this.height+=t*2,this}fit(e){const t=Math.max(this.x,e.x),n=Math.min(this.x+this.width,e.x+e.width),i=Math.max(this.y,e.y),s=Math.min(this.y+this.height,e.y+e.height);return this.x=t,this.width=Math.max(n-t,0),this.y=i,this.height=Math.max(s-i,0),this}ceil(e=1,t=.001){const n=Math.ceil((this.x+this.width-t)*e)/e,i=Math.ceil((this.y+this.height-t)*e)/e;return this.x=Math.floor((this.x+t)*e)/e,this.y=Math.floor((this.y+t)*e)/e,this.width=n-this.x,this.height=i-this.y,this}enlarge(e){const t=Math.min(this.x,e.x),n=Math.max(this.x+this.width,e.x+e.width),i=Math.min(this.y,e.y),s=Math.max(this.y+this.height,e.y+e.height);return this.x=t,this.width=n-t,this.y=i,this.height=s-i,this}getBounds(e){return e=e||new q,e.copyFrom(this),e}}var Fy=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function Iy(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function nf(r,e,t){return t={path:e,exports:{},require:function(n,i){return sf(n,i==null?t.path:i)}},r(t,t.exports),t.exports}function Gy(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function Ly(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")&&Object.keys(r).length===1?r.default:r}function Dy(r){if(r.__esModule)return r;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(r).forEach(function(t){var n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}),e}function sf(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var ie=nf(function(r){"use strict";var e=Object.prototype.hasOwnProperty,t="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(t=!1));function i(l,u,h){this.fn=l,this.context=u,this.once=h||!1}function s(l,u,h,c,d){if(typeof h!="function")throw new TypeError("The listener must be a function");var f=new i(h,c||l,d),p=t?t+u:u;return l._events[p]?l._events[p].fn?l._events[p]=[l._events[p],f]:l._events[p].push(f):(l._events[p]=f,l._eventsCount++),l}function o(l,u){--l._eventsCount===0?l._events=new n:delete l._events[u]}function a(){this._events=new n,this._eventsCount=0}a.prototype.eventNames=function(){var u=[],h,c;if(this._eventsCount===0)return u;for(c in h=this._events)e.call(h,c)&&u.push(t?c.slice(1):c);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(h)):u},a.prototype.listeners=function(u){var h=t?t+u:u,c=this._events[h];if(!c)return[];if(c.fn)return[c.fn];for(var d=0,f=c.length,p=new Array(f);d<f;d++)p[d]=c[d].fn;return p},a.prototype.listenerCount=function(u){var h=t?t+u:u,c=this._events[h];return c?c.fn?1:c.length:0},a.prototype.emit=function(u,h,c,d,f,p){var m=t?t+u:u;if(!this._events[m])return!1;var g=this._events[m],y=arguments.length,v,b;if(g.fn){switch(g.once&&this.removeListener(u,g.fn,void 0,!0),y){case 1:return g.fn.call(g.context),!0;case 2:return g.fn.call(g.context,h),!0;case 3:return g.fn.call(g.context,h,c),!0;case 4:return g.fn.call(g.context,h,c,d),!0;case 5:return g.fn.call(g.context,h,c,d,f),!0;case 6:return g.fn.call(g.context,h,c,d,f,p),!0}for(b=1,v=new Array(y-1);b<y;b++)v[b-1]=arguments[b];g.fn.apply(g.context,v)}else{var _=g.length,S;for(b=0;b<_;b++)switch(g[b].once&&this.removeListener(u,g[b].fn,void 0,!0),y){case 1:g[b].fn.call(g[b].context);break;case 2:g[b].fn.call(g[b].context,h);break;case 3:g[b].fn.call(g[b].context,h,c);break;case 4:g[b].fn.call(g[b].context,h,c,d);break;default:if(!v)for(S=1,v=new Array(y-1);S<y;S++)v[S-1]=arguments[S];g[b].fn.apply(g[b].context,v)}}return!0},a.prototype.on=function(u,h,c){return s(this,u,h,c,!1)},a.prototype.once=function(u,h,c){return s(this,u,h,c,!0)},a.prototype.removeListener=function(u,h,c,d){var f=t?t+u:u;if(!this._events[f])return this;if(!h)return o(this,f),this;var p=this._events[f];if(p.fn)p.fn===h&&(!d||p.once)&&(!c||p.context===c)&&o(this,f);else{for(var m=0,g=[],y=p.length;m<y;m++)(p[m].fn!==h||d&&!p[m].once||c&&p[m].context!==c)&&g.push(p[m]);g.length?this._events[f]=g.length===1?g[0]:g:o(this,f)}return this},a.prototype.removeAllListeners=function(u){var h;return u?(h=t?t+u:u,this._events[h]&&o(this,h)):(this._events=new n,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=t,a.EventEmitter=a,r.exports=a});const be=(r,e)=>(Array.isArray(r)||(r=[r]),e?r.map(t=>typeof t=="string"?e(t):t):r);class of{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){return this._cache.get(e)}set(e,t){const n=be(e);let i;for(let a=0;a<this.parsers.length;a++){const l=this.parsers[a];if(l.test(t)){i=l.getCacheableAssets(n,t);break}}i||(i={},n.forEach(a=>{i[a]=t}));const s=Object.keys(i),o={cacheKeys:s,keys:n};n.forEach(a=>{this._cacheMap.set(a,o)}),s.forEach(a=>{this._cache.has(a)&&this._cache.get(a),this._cache.set(a,i[a])})}remove(e){if(!this._cacheMap.has(e))return;const t=this._cacheMap.get(e);t.cacheKeys.forEach(n=>{this._cache.delete(n)}),t.keys.forEach(n=>{this._cacheMap.delete(n)})}get parsers(){return this._parsers}}const se=new of,Oo={},N="8.0.0";function z(r,e,t=3){if(Oo[e])return;let n=new Error().stack;typeof n=="undefined"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`):(n=n.split(`
`).splice(t).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${r}`),console.warn(n),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`),console.warn(n))),Oo[e]=!0}const xn=()=>{},_n=Object.create(null),Uo=Object.create(null);function mr(r,e){let t=Uo[r];return t===void 0&&(_n[e]===void 0&&(_n[e]=1),Uo[r]=t=_n[e]++),t}var af=Object.defineProperty,Fo=Object.getOwnPropertySymbols,lf=Object.prototype.hasOwnProperty,uf=Object.prototype.propertyIsEnumerable,Io=(r,e,t)=>e in r?af(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Go=(r,e)=>{for(var t in e||(e={}))lf.call(e,t)&&Io(r,t,e[t]);if(Fo)for(var t of Fo(e))uf.call(e,t)&&Io(r,t,e[t]);return r};const Lo=class extends ie{constructor(r={}){var e,t,n,i,s,o,a;super(),this.resourceType="textureSampler",this._maxAnisotropy=1,r=Go(Go({},Lo.defaultOptions),r),this.addressMode=r.addressMode,this.addressModeU=(e=r.addressModeU)!=null?e:this.addressModeU,this.addressModeV=(t=r.addressModeV)!=null?t:this.addressModeV,this.addressModeW=(n=r.addressModeW)!=null?n:this.addressModeW,this.scaleMode=r.scaleMode,this.magFilter=(i=r.magFilter)!=null?i:this.magFilter,this.minFilter=(s=r.minFilter)!=null?s:this.minFilter,this.mipmapFilter=(o=r.mipmapFilter)!=null?o:this.mipmapFilter,this.lodMinClamp=r.lodMinClamp,this.lodMaxClamp=r.lodMaxClamp,this.compare=r.compare,this.maxAnisotropy=(a=r.maxAnisotropy)!=null?a:1}set addressMode(r){this.addressModeU=r,this.addressModeV=r,this.addressModeW=r}get addressMode(){return this.addressModeU}set wrapMode(r){z("8","TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=r}get wrapMode(){return this.addressMode}set scaleMode(r){this.magFilter=r,this.minFilter=r,this.mipmapFilter=r}get scaleMode(){return this.magFilter}set maxAnisotropy(r){this._maxAnisotropy=Math.min(r,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get resourceId(){return this._resourceId||this._generateResourceId()}update(){this.emit("change",this),this._resourceId=null}_generateResourceId(){const r=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._resourceId=mr(r,"sampler"),this._resourceId}destroy(){this.emit("destroy",this),this.removeAllListeners()}};let He=Lo;He.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};let hf=0,cf=0;class le extends ie{constructor(e={}){var t,n,i,s,o,a,l,u,h,c,d,f;super(),this.uid=hf++,this.resourceType="textureSource",this.resourceId=cf++,this.type="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm-srgb",this.dimension="2d",this.antialias=!1,this.depthStencil=!0,this.resource=e.resource,this._resolution=(t=e.resolution)!=null?t:1,e.width?this.pixelWidth=e.width*this._resolution:this.pixelWidth=(i=(n=e.resource)==null?void 0:n.width)!=null?i:1,e.height?this.pixelHeight=e.height*this._resolution:this.pixelHeight=(o=(s=e.resource)==null?void 0:s.height)!=null?o:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=(a=e.format)!=null?a:"bgra8unorm",this.dimension=(l=e.dimensions)!=null?l:"2d",this.mipLevelCount=(u=e.mipLevelCount)!=null?u:1,this.autoGenerateMipmaps=(h=e.autoGenerateMipmaps)!=null?h:!1,this.sampleCount=(c=e.sampleCount)!=null?c:1,this.antialias=(d=e.antialias)!=null?d:!1;const p=(f=e.style)!=null?f:{};this.style=p instanceof He?p:new He(p),this.style.on("change",this.onStyleUpdate,this),this.styleSourceKey=(this.style.resourceId<<24)+this.uid}get source(){return this}update(){this.emit("update",this)}onStyleUpdate(){this.styleSourceKey=(this.style.resourceId<<24)+this.uid}destroy(){this.emit("destroy",this),this.style&&(this.style.destroy(),this.style=null),this.type=null,this.resource=null,this.removeAllListeners()}get resolution(){return this._resolution}set resolution(e){this._resolution!==e&&(this._resolution=e,this.width=this.pixelWidth/e,this.height=this.pixelHeight/e)}resize(e,t,n){n=n||this._resolution,e=e||this.width,t=t||this.height;const i=Math.round(e*n),s=Math.round(t*n);this.width=i/n,this.height=s/n,this._resolution=n,!(this.pixelWidth===i&&this.pixelHeight===s)&&(this.pixelWidth=i,this.pixelHeight=s,this.emit("resize",this),this.resourceId++,this.emit("change",this))}set wrapMode(e){z(N,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this.style.wrapMode=e}get wrapMode(){return z(N,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this.style.wrapMode}set scaleMode(e){z(N,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this.style.scaleMode=e}get scaleMode(){return z(N,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this.style.scaleMode}}const Do=Math.PI*2,$o=180/Math.PI,zo=Math.PI/180;class k{constructor(e=1,t=0,n=0,i=1,s=0,o=0){this.array=null,this.a=e,this.b=t,this.c=n,this.d=i,this.tx=s,this.ty=o}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,t,n,i,s,o){return this.a=e,this.b=t,this.c=n,this.d=i,this.tx=s,this.ty=o,this}toArray(e,t){this.array||(this.array=new Float32Array(9));const n=t||this.array;return e?(n[0]=this.a,n[1]=this.b,n[2]=0,n[3]=this.c,n[4]=this.d,n[5]=0,n[6]=this.tx,n[7]=this.ty,n[8]=1):(n[0]=this.a,n[1]=this.c,n[2]=this.tx,n[3]=this.b,n[4]=this.d,n[5]=this.ty,n[6]=0,n[7]=0,n[8]=1),n}apply(e,t){t=t||new W;const n=e.x,i=e.y;return t.x=this.a*n+this.c*i+this.tx,t.y=this.b*n+this.d*i+this.ty,t}applyInverse(e,t){t=t||new W;const n=this.a,i=this.b,s=this.c,o=this.d,a=this.tx,l=this.ty,u=1/(n*o+s*-i),h=e.x,c=e.y;return t.x=o*u*h+-s*u*c+(l*s-a*o)*u,t.y=n*u*c+-i*u*h+(-l*n+a*i)*u,t}translate(e,t){return this.tx+=e,this.ty+=t,this}scale(e,t){return this.a*=e,this.d*=t,this.c*=e,this.b*=t,this.tx*=e,this.ty*=t,this}rotate(e){const t=Math.cos(e),n=Math.sin(e),i=this.a,s=this.c,o=this.tx;return this.a=i*t-this.b*n,this.b=i*n+this.b*t,this.c=s*t-this.d*n,this.d=s*n+this.d*t,this.tx=o*t-this.ty*n,this.ty=o*n+this.ty*t,this}append(e){const t=this.a,n=this.b,i=this.c,s=this.d;return this.a=e.a*t+e.b*i,this.b=e.a*n+e.b*s,this.c=e.c*t+e.d*i,this.d=e.c*n+e.d*s,this.tx=e.tx*t+e.ty*i+this.tx,this.ty=e.tx*n+e.ty*s+this.ty,this}appendFrom(e,t){const n=e.a,i=e.b,s=e.c,o=e.d,a=e.tx,l=e.ty,u=t.a,h=t.b,c=t.c,d=t.d;return this.a=n*u+i*c,this.b=n*h+i*d,this.c=s*u+o*c,this.d=s*h+o*d,this.tx=a*u+l*c+t.tx,this.ty=a*h+l*d+t.ty,this}setTransform(e,t,n,i,s,o,a,l,u){return this.a=Math.cos(a+u)*s,this.b=Math.sin(a+u)*s,this.c=-Math.sin(a-l)*o,this.d=Math.cos(a-l)*o,this.tx=e-(n*this.a+i*this.c),this.ty=t-(n*this.b+i*this.d),this}prepend(e){const t=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const n=this.a,i=this.c;this.a=n*e.a+this.b*e.c,this.b=n*e.b+this.b*e.d,this.c=i*e.a+this.d*e.c,this.d=i*e.b+this.d*e.d}return this.tx=t*e.a+this.ty*e.c+e.tx,this.ty=t*e.b+this.ty*e.d+e.ty,this}decompose(e){const t=this.a,n=this.b,i=this.c,s=this.d,o=e.pivot,a=-Math.atan2(-i,s),l=Math.atan2(n,t),u=Math.abs(a+l);return u<1e-5||Math.abs(Do-u)<1e-5?(e.rotation=l,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=a,e.skew.y=l),e.scale.x=Math.sqrt(t*t+n*n),e.scale.y=Math.sqrt(i*i+s*s),e.position.x=this.tx+(o.x*t+o.y*i),e.position.y=this.ty+(o.x*n+o.y*s),e}invert(){const e=this.a,t=this.b,n=this.c,i=this.d,s=this.tx,o=e*i-t*n;return this.a=i/o,this.b=-t/o,this.c=-n/o,this.d=e/o,this.tx=(n*this.ty-i*s)/o,this.ty=-(e*this.ty-t*s)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new k;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}static get IDENTITY(){return ff.identity()}static get shared(){return df.identity()}}const df=new k,ff=new k,Ve=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],je=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],Ye=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],Xe=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],wn=[],No=[],vr=Math.sign;function pf(){for(let r=0;r<16;r++){const e=[];wn.push(e);for(let t=0;t<16;t++){const n=vr(Ve[r]*Ve[t]+Ye[r]*je[t]),i=vr(je[r]*Ve[t]+Xe[r]*je[t]),s=vr(Ve[r]*Ye[t]+Ye[r]*Xe[t]),o=vr(je[r]*Ye[t]+Xe[r]*Xe[t]);for(let a=0;a<16;a++)if(Ve[a]===n&&je[a]===i&&Ye[a]===s&&Xe[a]===o){e.push(a);break}}}for(let r=0;r<16;r++){const e=new k;e.set(Ve[r],je[r],Ye[r],Xe[r],0,0),No.push(e)}}pf();const F={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:r=>Ve[r],uY:r=>je[r],vX:r=>Ye[r],vY:r=>Xe[r],inv:r=>r&8?r&15:-r&7,add:(r,e)=>wn[r][e],sub:(r,e)=>wn[r][F.inv(e)],rotate180:r=>r^4,isVertical:r=>(r&3)===2,byDirection:(r,e)=>Math.abs(r)*2<=Math.abs(e)?e>=0?F.S:F.N:Math.abs(e)*2<=Math.abs(r)?r>0?F.E:F.W:e>0?r>0?F.SE:F.SW:r>0?F.NE:F.NW,matrixAppendRotationInv:(r,e,t=0,n=0)=>{const i=No[F.inv(e)];i.tx=t,i.ty=n,r.append(i)}};class Tn extends ie{constructor(e={}){var t;super(),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=e.frame||new q(0,0,1,1),this.orig=e.orig||this.frame,this.rotate=(t=e.rotate)!=null?t:0,this.trim=e.trim,this.defaultAnchor=e.defaultAnchor,this.updateUvs()}updateUvs(){const e=this.uvs,t=this.frame;let n=this.rotate;if(n){const i=t.width/2,s=t.height/2,o=t.x+i,a=t.y+s;n=F.add(n,F.NW),e.x0=o+i*F.uX(n),e.y0=a+s*F.uY(n),n=F.add(n,2),e.x1=o+i*F.uX(n),e.y1=a+s*F.uY(n),n=F.add(n,2),e.x2=o+i*F.uX(n),e.y2=a+s*F.uY(n),n=F.add(n,2),e.x3=o+i*F.uX(n),e.y3=a+s*F.uY(n)}else e.x0=t.x,e.y0=t.y,e.x1=t.x+t.width,e.y1=t.y,e.x2=t.x+t.width,e.y2=t.y+t.height,e.x3=t.x,e.y3=t.y+t.height}update(){this.updateUvs(),this.emit("update",this)}destroy(){this.emit("destroy",this),this.removeAllListeners(),this.frame=null,this.orig=null,this.trim=null,this.defaultAnchor=null,this.uvs=null}}const Wo=new k;class Sn{constructor(e,t){this.mapCoord=new k,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof t=="undefined"?.5:t,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){var t;this.texture!==e&&((t=this._texture)==null||t.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,t){t===void 0&&(t=e);const n=this.mapCoord;for(let i=0;i<e.length;i+=2){const s=e[i],o=e[i+1];t[i]=s*n.a+o*n.c+n.tx,t[i+1]=s*n.b+o*n.d+n.ty}return t}update(){const e=this._texture;this._updateID++;const t=e.layout.uvs;this.mapCoord.set(t.x1-t.x0,t.y1-t.y0,t.x3-t.x0,t.y3-t.y0,t.x0,t.y0);const n=e.layout.orig,i=e.layout.trim;i&&(Wo.set(n.width/i.width,0,0,n.height/i.height,-i.x/i.width,-i.y/i.height),this.mapCoord.append(Wo));const s=e.source,o=this.uClampFrame,a=this.clampMargin/s._resolution,l=this.clampOffset;return o[0]=(e.frameX+a+l)/s.width,o[1]=(e.frameY+a+l)/s.height,o[2]=(e.frameX+e.frameWidth-a+l)/s.width,o[3]=(e.frameY+e.frameHeight-a+l)/s.height,this.uClampOffset[0]=l/s.pixelWidth,this.uClampOffset[1]=l/s.pixelHeight,this.isSimple=e.frameWidth===s.width&&e.frameHeight===s.height&&e.layout.rotate===0,!0}}let gf=0;class C extends ie{constructor({source:e,style:t,layout:n,label:i}={}){var s;super(),this.id=gf++,this.styleSourceKey=0,this.label=i,this.source=(s=e==null?void 0:e.source)!=null?s:new le,this.layout=n instanceof Tn?n:new Tn(n),t&&(this._style=t instanceof He?t:new He(t)),this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid}static from(e){return typeof e=="string"?se.get(e):e instanceof le?new C({source:e}):new C({source:new le(e)})}set source(e){this._source&&(this._source.off("update",this.onStyleSourceUpdate,this),this._source.off("resize",this.onUpdate,this)),this._source=e,e.on("update",this.onStyleSourceUpdate,this),e.on("resize",this.onUpdate,this),this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid,this.emit("update",this)}get source(){return this._source}get style(){return this._style||this.source.style}set style(e){var t,n;(t=this._style)==null||t.off("change",this.onStyleSourceUpdate,this),this._style=e,(n=this._style)==null||n.on("change",this.onStyleSourceUpdate,this)}get layout(){return this._layout}set layout(e){var t;(t=this._layout)==null||t.off("update",this.onUpdate,this),this._layout=e,e.on("update",this.onUpdate,this),this.emit("update",this)}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new Sn(this)),this._textureMatrix}set frameWidth(e){this._layout.frame.width=e/this._source.width}get frameWidth(){return this._source.pixelWidth/this._source._resolution*this._layout.frame.width}set frameHeight(e){this._layout.frame.height=e/this._source.height}get frameHeight(){return this._source.pixelHeight/this._source._resolution*this._layout.frame.height}set frameX(e){if(e===0){this._layout.frame.x=0;return}this._layout.frame.x=this._source.width/e}get frameX(){return this._source.width*this._layout.frame.x}set frameY(e){if(e===0){this._layout.frame.y=0;return}this._layout.frame.y=this._source.height/e}get frameY(){return this._source.height*this._layout.frame.y}get width(){return this._source.width*this._layout.orig.width}get height(){return this._source.height*this._layout.orig.height}destroy(e=!1){this._style&&(this._style.destroy(),this._style=null),this._layout&&(this._layout.destroy(),this._layout=null),this._source&&e&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.removeAllListeners()}onStyleSourceUpdate(){this.styleSourceKey=(this.style.resourceId<<24)+this._source.uid,this.emit("update",this)}onUpdate(){this.emit("update",this)}get baseTexture(){return z(N,"Texture.baseTexture is now Texture.source"),this._source}}C.EMPTY=new C({}),C.EMPTY.label="EMPTY",C.EMPTY.destroy=xn;class Pn extends ie{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontName="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return z(N,"BitmapFont.font is deprecated, please use BitmapFont.fontName instead."),this.fontName}get pageTextures(){return z(N,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return z(N,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return z(N,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return z(N,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture.destroy();this.chars=null}}class En extends Pn{constructor(e){var t;super();const{textures:n,data:i}=e;Object.keys(i.pages).forEach(o=>{const a=i.pages[parseInt(o,10)],l=n[a.id];this.pages.push({texture:l})}),Object.keys(i.chars).forEach(o=>{var a;const l=i.chars[o],u=n[l.page].source,h=new q(l.x/u.width,l.y/u.height,l.width/u.width,l.height/u.height),c=new C({source:u,layout:{frame:h}});this.chars[o]={id:o.codePointAt(0),xOffset:l.xOffset,yOffset:l.yOffset,xAdvance:l.xAdvance,kerning:(a=l.kerning)!=null?a:{},texture:c}}),this.baseRenderedFontSize=i.fontSize;const s=this;s.baseMeasurementFontSize=i.fontSize,s.fontMetrics={ascent:0,descent:0,fontSize:i.fontSize},s.baseLineOffset=i.baseLineOffset,s.lineHeight=i.lineHeight,s.fontName=i.fontName,s.distanceField=(t=i.distanceField)!=null?t:{type:"none",range:0}}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{texture:t}=this.pages[e];t.destroy(!0)}this.pages=null}}const br={test(r){return typeof r=="string"&&r.startsWith("info face=")},parse(r){var e,t;const n=r.match(/^[a-z]+\s+.+$/gm),i={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const f in n){const p=n[f].match(/^[a-z]+/gm)[0],m=n[f].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),g={};for(const y in m){const v=m[y].split("="),b=v[0],_=v[1].replace(/"/gm,""),S=parseFloat(_),M=isNaN(S)?_:S;g[b]=M}i[p].push(g)}const s={chars:{},pages:[],lineHeight:0,fontSize:0,fontName:"",distanceField:null,baseLineOffset:0},[o]=i.info,[a]=i.common,[l]=(e=i.distanceField)!=null?e:[];l&&(s.distanceField={range:parseInt(l.distanceRange,10),type:l.fieldType}),s.fontSize=parseInt(o.size,10),s.fontName=o.face,s.lineHeight=parseInt(a.lineHeight,10);const u=i.page;for(let f=0;f<u.length;f++)s.pages.push({id:parseInt(u[f].id,10)||0,file:u[f].file});const h={};s.baseLineOffset=s.lineHeight-parseInt(a.base,10);const c=i.char;for(let f=0;f<c.length;f++){const p=c[f],m=parseInt(p.id,10);let g=(t=p.letter)!=null?t:p.char;g==="space"&&(g=" "),h[m]=g,s.chars[g]={id:m,page:parseInt(p.page,10)||0,x:parseInt(p.x,10),y:parseInt(p.y,10),width:parseInt(p.width,10),height:parseInt(p.height,10),xOffset:parseInt(p.xoffset,10),yOffset:parseInt(p.yoffset,10),xAdvance:parseInt(p.xadvance,10),kerning:{}}}const d=i.kerning||[];for(let f=0;f<d.length;f++){const p=parseInt(d[f].first,10),m=parseInt(d[f].second,10),g=parseInt(d[f].amount,10);s.chars[h[m]].kerning[h[p]]=g}return s}},An={test(r){const e=r;return"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(r){var e;const t={chars:{},pages:[],lineHeight:0,fontSize:0,fontName:"",distanceField:null,baseLineOffset:0},n=r.getElementsByTagName("info")[0],i=r.getElementsByTagName("common")[0],s=r.getElementsByTagName("distanceField")[0];s&&(t.distanceField={type:s.getAttribute("fieldType"),range:parseInt(s.getAttribute("distanceRange"),10)});const o=r.getElementsByTagName("page"),a=r.getElementsByTagName("char"),l=r.getElementsByTagName("kerning");t.fontSize=parseInt(n.getAttribute("size"),10),t.fontName=n.getAttribute("face"),t.lineHeight=parseInt(i.getAttribute("lineHeight"),10);for(let h=0;h<o.length;h++)t.pages.push({id:parseInt(o[h].getAttribute("id"),10)||0,file:o[h].getAttribute("file")});const u={};t.baseLineOffset=t.lineHeight-parseInt(i.getAttribute("base"),10);for(let h=0;h<a.length;h++){const c=a[h],d=parseInt(c.getAttribute("id"),10);let f=(e=c.getAttribute("letter"))!=null?e:c.getAttribute("char");f==="space"&&(f=" "),u[d]=f,t.chars[f]={id:d,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let h=0;h<l.length;h++){const c=parseInt(l[h].getAttribute("first"),10),d=parseInt(l[h].getAttribute("second"),10),f=parseInt(l[h].getAttribute("amount"),10);t.chars[u[d]].kerning[u[c]]=f}return t}},Mn={test(r){return typeof r=="string"&&r.includes("<font>")?An.test($.ADAPTER.parseXML(r)):!1},parse(r){return An.parse($.ADAPTER.parseXML(r))}},mf=[".xml",".fnt"],Ho={extension:x.CacheParser,test:r=>r instanceof En,getCacheableAssets(r,e){const t={};return r.forEach(n=>{t[n]=e}),t[e.fontName]=e,t}},Vo={extension:{type:x.LoadParser,priority:Ae.Normal},test(r){return mf.includes(ae.extname(r).toLowerCase())},async testParse(r){return br.test(r)||Mn.test(r)},async parse(r,e,t){const n=br.test(r)?br.parse(r):Mn.parse(r),{src:i}=e,{pages:s}=n,o=[];for(let u=0;u<s.length;++u){const h=s[u].file;let c=ae.join(ae.dirname(i),h);c=pr(c,i),o.push(c)}const a=await t.load(o),l=o.map(u=>a[u]);return new En({data:n,textures:l})},async load(r,e){return await(await $.ADAPTER.fetch(r)).text()},unload(r){r.destroy()}},jo={extension:x.CacheParser,test:r=>Array.isArray(r)&&r.every(e=>e instanceof C),getCacheableAssets:(r,e)=>{const t={};return r.forEach(n=>{e.forEach((i,s)=>{t[n+(s===0?"":s+1)]=i})}),t}},Yo={extension:{type:x.DetectionParser,priority:1},test:async()=>{const r="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=r})},add:async r=>[...r,"avif"],remove:async r=>r.filter(e=>e!=="avif")},Xo=["png","jpg","jpeg"],qo={extension:{type:x.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async r=>[...r,...Xo],remove:async r=>r.filter(e=>!Xo.includes(e))},vf="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function yr(r){return vf?!1:document.createElement("video").canPlayType(r)!==""}const Ko={extension:{type:x.DetectionParser,priority:0},test:async()=>yr("video/mp4"),add:async r=>[...r,"mp4","m4v"],remove:async r=>r.filter(e=>e!=="mp4"&&e!=="m4v")},Zo={extension:{type:x.DetectionParser,priority:0},test:async()=>yr("video/ogg"),add:async r=>[...r,"ogv"],remove:async r=>r.filter(e=>e!=="ogv")},Qo={extension:{type:x.DetectionParser,priority:0},test:async()=>yr("video/webm"),add:async r=>[...r,"webm"],remove:async r=>r.filter(e=>e!=="webm")},Jo={extension:{type:x.DetectionParser,priority:0},test:async()=>{const r="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=r})},add:async r=>[...r,"webp"],remove:async r=>r.filter(e=>e!=="webp")};function dt(r,e){if(Array.isArray(e)){for(const t of e)if(r.startsWith(`data:${t}`))return!0;return!1}return r.startsWith(`data:${e}`)}function ft(r,e){const t=r.split("?")[0],n=ae.extname(t).toLowerCase();return Array.isArray(e)?e.includes(n):n===e}const bf=".json",yf="application/json",ea={extension:{type:x.LoadParser,priority:Ae.Low},name:"loadJson",test(r){return dt(r,yf)||ft(r,bf)},async load(r){return await(await $.ADAPTER.fetch(r)).json()}},xf=".txt",_f="text/plain",ta={name:"loadTxt",extension:{type:x.LoadParser,priority:Ae.Low},test(r){return dt(r,_f)||ft(r,xf)},async load(r){return await(await $.ADAPTER.fetch(r)).text()}};var wf=Object.defineProperty,Tf=Object.defineProperties,Sf=Object.getOwnPropertyDescriptors,ra=Object.getOwnPropertySymbols,Pf=Object.prototype.hasOwnProperty,Ef=Object.prototype.propertyIsEnumerable,na=(r,e,t)=>e in r?wf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Af=(r,e)=>{for(var t in e||(e={}))Pf.call(e,t)&&na(r,t,e[t]);if(ra)for(var t of ra(e))Ef.call(e,t)&&na(r,t,e[t]);return r},Mf=(r,e)=>Tf(r,Sf(e));const Cf=["normal","bold","100","200","300","400","500","600","700","800","900"],Bf=[".ttf",".otf",".woff",".woff2"],Rf=["font/ttf","font/otf","font/woff","font/woff2"],kf=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function ia(r){const e=ae.extname(r),t=ae.basename(r,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1));let n=t.length>0;for(const s of t)if(!s.match(kf)){n=!1;break}let i=t.join(" ");return n||(i=`"${i.replace(/[\\"]/g,"\\$&")}"`),i}const sa={extension:{type:x.LoadParser,priority:Ae.Low},name:"loadWebFont",test(r){return dt(r,Rf)||ft(r,Bf)},async load(r,e){var t,n,i,s,o,a;const l=$.ADAPTER.getFontFaceSet();if(l){const u=[],h=(n=(t=e.data)==null?void 0:t.family)!=null?n:ia(r),c=(o=(s=(i=e.data)==null?void 0:i.weights)==null?void 0:s.filter(f=>Cf.includes(f)))!=null?o:["normal"],d=(a=e.data)!=null?a:{};for(let f=0;f<c.length;f++){const p=c[f],m=new FontFace(h,`url(${encodeURI(r)})`,Mf(Af({},d),{weight:p}));await m.load(),l.add(m),u.push(m)}return u.length===1?u[0]:u}return null},unload(r){(Array.isArray(r)?r:[r]).forEach(e=>$.ADAPTER.getFontFaceSet().delete(e))}},Cn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function de(r){if(typeof r=="number")return r;if(typeof r=="string"){if(Cn[r]!==void 0)return Cn[r];let e=0;if(r[0]==="#"&&e++,r.length===4){const t=parseInt(r[e]+r[e],16),n=parseInt(r[e+1]+r[e+1],16),i=parseInt(r[e+2]+r[e+2],16);return(t<<16)+(n<<8)+i}return parseInt(r.substring(e),16)}return 0}class ve{constructor(e=1/0,t=1/0,n=-1/0,i=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack=[],this.matrix=new k,this.minX=e,this.minY=t,this.maxX=n,this.maxY=i}get rectangle(){this._rectangle||(this._rectangle=new q);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):(e.x=this.minX,e.y=this.minY,e.width=this.maxX-this.minX,e.height=this.maxY-this.minY),e}clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack.length=0,this.matrix.identity()}pushMatrix(e){this._matrixStack.push(e),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(e)):this.matrix.copyFrom(e)}popMatrix(){this._matrixStack.pop(),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(this._matrixStack[this._matrixStack.length-1])):this._matrixStack.length===1?this.matrix.copyFrom(this._matrixStack[0]):this.matrix.identity()}setMatrix(e){this.matrix.copyFrom(e)}set(e,t,n,i){this.minX=e,this.minY=t,this.maxX=n,this.maxY=i}addFrame(e,t,n,i){const s=this.matrix,o=s.a,a=s.b,l=s.c,u=s.d,h=s.tx,c=s.ty;let d=this.minX,f=this.minY,p=this.maxX,m=this.maxY,g=o*e+l*t+h,y=a*e+u*t+c;d=g<d?g:d,f=y<f?y:f,p=g>p?g:p,m=y>m?y:m,g=o*n+l*t+h,y=a*n+u*t+c,d=g<d?g:d,f=y<f?y:f,p=g>p?g:p,m=y>m?y:m,g=o*e+l*i+h,y=a*e+u*i+c,d=g<d?g:d,f=y<f?y:f,p=g>p?g:p,m=y>m?y:m,g=o*n+l*i+h,y=a*n+u*i+c,d=g<d?g:d,f=y<f?y:f,p=g>p?g:p,m=y>m?y:m,this.minX=d,this.minY=f,this.maxX=p,this.maxY=m}addRect(e){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height)}addBounds(e){this.addFrame(e.minX,e.minY,e.maxX,e.maxY)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const t=this.minX,n=this.minY,i=this.maxX,s=this.maxY,{a:o,b:a,c:l,d:u,tx:h,ty:c}=e;let d=o*t+l*n+h,f=a*t+u*n+c;this.minX=d,this.minY=f,this.maxX=d,this.maxY=f,d=o*i+l*n+h,f=a*i+u*n+c,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*t+l*s+h,f=a*t+u*s+c,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY,d=o*i+l*s+h,f=a*i+u*s+c,this.minX=d<this.minX?d:this.minX,this.minY=f<this.minY?f:this.minY,this.maxX=d>this.maxX?d:this.maxX,this.maxY=f>this.maxY?f:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}pad(e,t=e){return this.minX-=e,this.maxX+=e,this.minY-=t,this.maxY+=t,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new ve(this.minX,this.minY,this.maxX,this.maxY)}scale(e,t=e){return this.minX*=e,this.minY*=t,this.maxX*=e,this.maxY*=t,this}get x(){return this.minX}get y(){return this.minY}get width(){return this.maxX-this.minX}get height(){return this.maxY-this.minY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,t,n){let i=this.minX,s=this.minY,o=this.maxX,a=this.maxY;const l=this.matrix,u=l.a,h=l.b,c=l.c,d=l.d,f=l.tx,p=l.ty;for(let m=t;m<n;m+=2){const g=e[m],y=e[m+1],v=u*g+c*y+f,b=h*g+d*y+p;i=v<i?v:i,s=b<s?b:s,o=v>o?v:o,a=b>a?b:a}this.minX=i,this.minY=s,this.maxX=o,this.maxY=a}toString(){return`[@pixi:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}}function xr(r){if(typeof r=="string")return r;let e=(r|0).toString(16);return e="000000".substring(0,6-e.length)+e,`#${e}`}class kt extends le{constructor(e){var t;super(e),this.type="image",this.alphaMode=(t=e.alphaMode)!=null?t:0}}const _r=$.ADAPTER.createCanvas(),qe=1;_r.width=qe,_r.height=qe;const Me=_r.getContext("2d");Me.fillStyle="#ffffff",Me.fillRect(0,0,qe,qe),Me.beginPath(),Me.moveTo(0,0),Me.lineTo(qe,0),Me.lineTo(qe,qe),Me.closePath(),Me.fillStyle="#ffffff",Me.fill(),C.WHITE=new C({source:new kt({resource:_r})}),C.WHITE.label="WHITE",C.WHITE.destroy=xn;let Of=0;const Bn=class{constructor(r,e,t,n){this.uid=Of++,this.type="linear",this.gradientStops=[],this.x0=r,this.y0=e,this.x1=t,this.y1=n}addColorStop(r,e){return e=xr(e),this.gradientStops.push({offset:r,color:e}),this}buildLinearGradient(){const r=Bn.defaultTextureSize,{gradientStops:e}=this,t=$.ADAPTER.createCanvas();t.width=r,t.height=r;const n=t.getContext("2d"),i=n.createLinearGradient(0,0,Bn.defaultTextureSize,1);for(let p=0;p<e.length;p++){const m=e[p];i.addColorStop(m.offset,m.color)}n.fillStyle=i,n.fillRect(0,0,r,r),this.texture=new C({source:new kt({resource:t}),style:{addressModeU:"clamp-to-edge",addressModeV:"repeat"}});const{x0:s,y0:o,x1:a,y1:l}=this,u=new k,h=a-s,c=l-o,d=Math.sqrt(h*h+c*c),f=Math.atan2(c,h);u.translate(-s,-o),u.scale(1/r,1/r),u.rotate(-f),u.scale(256/d,1),this.transform=u}};let Ke=Bn;Ke.defaultTextureSize=256;const oa={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};let Uf=0;class wr{constructor(e,t){this.uid=Uf++,this.transform=new k,this.texture=e,this.transform.scale(1/e.frameWidth,1/e.frameHeight),t&&(e.style.addressModeU=oa[t].addressModeU,e.style.addressModeV=oa[t].addressModeV)}setTransform(e){const t=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/t.frameWidth,1/t.frameHeight)}}const Ff={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0};function aa(r,e){var t;const n=r.match(/[a-df-z][^a-df-z]*/gi),i=(t=r.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:t.map(parseFloat),s=[];n.forEach(u=>{var h;const c=(h=u.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:h.map(parseFloat),d=u[0];let f=1;c&&(f=c.length/Ff[d.toLowerCase()]);for(let p=0;p<f;p++)s.push(d)});let o=0,a=0,l=0;for(let u=0;u<s.length;u++){const h=s[u];switch(h){case"M":a=i[o++],l=i[o++],e.moveTo(a,l);break;case"m":a+=i[o++],l+=i[o++],e.moveTo(a,l);break;case"H":a=i[o++],e.lineTo(a,l);break;case"h":a+=i[o++],e.lineTo(a,l);break;case"V":l=i[o++],e.lineTo(a,l);break;case"v":l+=i[o++],e.lineTo(a,l);break;case"L":a=i[o++],l=i[o++],e.lineTo(a,l);break;case"l":a+=i[o++],l+=i[o++],e.lineTo(a,l);break;case"C":a=i[o+4],l=i[o+5],e.bezierCurveTo(i[o],i[o+1],i[o+2],i[o+3],a,l),o+=6;break;case"c":e.bezierCurveTo(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3],a+i[o+4],l+i[o+5]),a+=i[o+4],l+=i[o+5],o+=6;break;case"S":a=i[o+2],l=i[o+3],e.bezierCurveToShort(i[o],i[o+1],a,l),o+=4;break;case"s":e.bezierCurveToShort(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3]),a+=i[o+2],l+=i[o+3],o+=4;break;case"Q":a=i[o+2],l=i[o+3],e.quadraticCurveTo(i[o],i[o+1],a,l),o+=4;break;case"q":e.quadraticCurveTo(a+i[o],l+i[o+1],a+i[o+2],l+i[o+3]),a+=i[o+2],l+=i[o+3],o+=4;break;case"T":a=i[o++],l=i[o++],e.quadraticCurveToShort(a,l);break;case"t":a+=i[o++],l+=i[o++],e.quadraticCurveToShort(a,l);break;case"A":a=i[o+5],l=i[o+6],e.arcToSvg(i[o],i[o+1],i[o+2],i[o+3],i[o+4],a,l),o+=7;break;case"a":a+=i[o+5],l+=i[o+6],e.arcToSvg(i[o],i[o+1],i[o+2],i[o+3],i[o+4],a,l),o+=7;break;case"Z":case"z":e.closePath();break;default:console.warn(`Unknown SVG path command: ${h}`)}}return e}class dn{constructor(e=0,t=0,n=0){this.type="circle",this.x=e,this.y=t,this.radius=n}clone(){return new dn(this.x,this.y,this.radius)}contains(e,t){if(this.radius<=0)return!1;const n=this.radius*this.radius;let i=this.x-e,s=this.y-t;return i*=i,s*=s,i+s<=n}getBounds(e){return e=e||new q,e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}}class fn{constructor(e=0,t=0,n=0,i=0){this.type="ellipse",this.x=e,this.y=t,this.halfWidth=n,this.halfHeight=i}clone(){return new fn(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,t){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let n=(e-this.x)/this.halfWidth,i=(t-this.y)/this.halfHeight;return n*=n,i*=i,n+i<=1}getBounds(){return new q(this.x-this.halfWidth,this.y-this.halfHeight,this.halfWidth*2,this.halfHeight*2)}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}}class lt{constructor(...e){this.type="polygon";let t=Array.isArray(e[0])?e[0]:e;if(typeof t[0]!="number"){const n=[];for(let i=0,s=t.length;i<s;i++)n.push(t[i].x,t[i].y);t=n}this.points=t,this.closePath=!0}clone(){const e=this.points.slice(),t=new lt(e);return t.closePath=this.closePath,t}contains(e,t){let n=!1;const i=this.points.length/2;for(let s=0,o=i-1;s<i;o=s++){const a=this.points[s*2],l=this.points[s*2+1],u=this.points[o*2],h=this.points[o*2+1];l>t!=h>t&&e<(u-a)*((t-l)/(h-l))+a&&(n=!n)}return n}getBounds(e){e=e||new q;const t=this.points;let n=1/0,i=-1/0,s=1/0,o=-1/0;for(let a=0,l=t.length;a<l;a+=2){const u=t[a],h=t[a+1];n=u<n?u:n,i=u>i?u:i,s=h<s?h:s,o=h>o?h:o}return e.x=n,e.width=i-n,e.y=s,e.height=o-s,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}class pn{constructor(e=0,t=0,n=0,i=0,s=20){this.type="roundedRectangle",this.x=e,this.y=t,this.width=n,this.height=i,this.radius=s}getBounds(e){return e=e||new q,e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new pn(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&t>=this.y&&t<=this.y+this.height){const n=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(t>=this.y+n&&t<=this.y+this.height-n||e>=this.x+n&&e<=this.x+this.width-n)return!0;let i=e-(this.x+n),s=t-(this.y+n);const o=n*n;if(i*i+s*s<=o||(i=e-(this.x+this.width-n),i*i+s*s<=o)||(s=t-(this.y+this.height-n),i*i+s*s<=o)||(i=e-(this.x+n),i*i+s*s<=o))return!0}return!1}}const $y=8,Tr=11920929e-14,If=1,Rn=.01,pt=0,Ze=0;function kn(r,e,t,n,i,s,o,a,l){let u=If/1;return u*=u,Gf(e,t,n,i,s,o,a,l,r,u),r}function Gf(r,e,t,n,i,s,o,a,l,u){On(r,e,t,n,i,s,o,a,l,u,0),l.push(o,a)}function On(r,e,t,n,i,s,o,a,l,u,h){if(h>8)return;const c=Math.PI,d=(r+t)/2,f=(e+n)/2,p=(t+i)/2,m=(n+s)/2,g=(i+o)/2,y=(s+a)/2,v=(d+p)/2,b=(f+m)/2,_=(p+g)/2,S=(m+y)/2,M=(v+_)/2,B=(b+S)/2;if(h>0){let P=o-r,w=a-e;const T=Math.abs((t-o)*w-(n-a)*P),L=Math.abs((i-o)*w-(s-a)*P);let I,R;if(T>Tr&&L>Tr){if((T+L)*(T+L)<=u*(P*P+w*w)){if(pt<Rn){l.push(M,B);return}const E=Math.atan2(s-n,i-t);if(I=Math.abs(E-Math.atan2(n-e,t-r)),R=Math.abs(Math.atan2(a-s,o-i)-E),I>=c&&(I=2*c-I),R>=c&&(R=2*c-R),I+R<pt){l.push(M,B);return}if(Ze!==0){if(I>Ze){l.push(t,n);return}if(R>Ze){l.push(i,s);return}}}}else if(T>Tr){if(T*T<=u*(P*P+w*w)){if(pt<Rn){l.push(M,B);return}if(I=Math.abs(Math.atan2(s-n,i-t)-Math.atan2(n-e,t-r)),I>=c&&(I=2*c-I),I<pt){l.push(t,n),l.push(i,s);return}if(Ze!==0&&I>Ze){l.push(t,n);return}}}else if(L>Tr){if(L*L<=u*(P*P+w*w)){if(pt<Rn){l.push(M,B);return}if(I=Math.abs(Math.atan2(a-s,o-i)-Math.atan2(s-n,i-t)),I>=c&&(I=2*c-I),I<pt){l.push(t,n),l.push(i,s);return}if(Ze!==0&&I>Ze){l.push(i,s);return}}}else if(P=M-(r+o)/2,w=B-(e+a)/2,P*P+w*w<=u){l.push(M,B);return}}On(r,e,d,f,v,b,M,B,l,u,h+1),On(M,B,_,S,g,y,o,a,l,u,h+1)}const zy=8,Lf=11920929e-14,Df=1,$f=.01,la=0;function ua(r,e,t,n,i,s,o){let a=Df/1;return a*=a,zf(e,t,n,i,s,o,r,a),r}function zf(r,e,t,n,i,s,o,a){Un(o,r,e,t,n,i,s,a,0),o.push(i,s)}function Un(r,e,t,n,i,s,o,a,l){if(l>8)return;const u=Math.PI,h=(e+n)/2,c=(t+i)/2,d=(n+s)/2,f=(i+o)/2,p=(h+d)/2,m=(c+f)/2;let g=s-e,y=o-t;const v=Math.abs((n-s)*y-(i-o)*g);if(v>Lf){if(v*v<=a*(g*g+y*y)){if(la<$f){r.push(p,m);return}let b=Math.abs(Math.atan2(o-i,s-n)-Math.atan2(i-t,n-e));if(b>=u&&(b=2*u-b),b<la){r.push(p,m);return}}}else if(g=p-(e+s)/2,y=m-(t+o)/2,g*g+y*y<=a){r.push(p,m);return}Un(r,e,t,h,c,p,m,a,l+1),Un(r,p,m,d,f,s,o,a,l+1)}function Fn(r,e,t,n,i,s,o,a){let l=Math.abs(i-s);(!o&&i>s||o&&s>i)&&(l=2*Math.PI-l),a=a||Math.max(6,Math.floor(6*Math.pow(n,1/3)*(l/Math.PI))),a=Math.max(a,3);let u=l/a,h=i;u*=o?-1:1;for(let c=0;c<a+1;c++){const d=Math.cos(h),f=Math.sin(h),p=e+d*n,m=t+f*n;r.push(p,m),h+=u}}function ha(r,e,t,n,i,s){const o=r[r.length-2],a=r[r.length-1]-t,l=o-e,u=i-t,h=n-e,c=Math.abs(a*h-l*u);if(c<1e-8||s===0){(r[r.length-2]!==e||r[r.length-1]!==t)&&r.push(e,t);return}const d=a*a+l*l,f=u*u+h*h,p=a*u+l*h,m=s*Math.sqrt(d)/c,g=s*Math.sqrt(f)/c,y=m*p/d,v=g*p/f,b=m*h+g*l,_=m*u+g*a,S=l*(g+y),M=a*(g+y),B=h*(m+v),P=u*(m+v),w=Math.atan2(M-_,S-b),T=Math.atan2(P-_,B-b);Fn(r,b+e,_+t,s,w,T,l*u>h*a)}const Ot=Math.PI*2,In={centerX:0,centerY:0,ang1:0,ang2:0},Gn=({x:r,y:e},t,n,i,s,o,a,l)=>{r*=t,e*=n;const u=i*r-s*e,h=s*r+i*e;return l.x=u+o,l.y=h+a,l};function Nf(r,e){const t=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),n=e===1.5707963267948966?.551915024494:t,i=Math.cos(r),s=Math.sin(r),o=Math.cos(r+e),a=Math.sin(r+e);return[{x:i-s*n,y:s+i*n},{x:o+a*n,y:a-o*n},{x:o,y:a}]}const ca=(r,e,t,n)=>{const i=r*n-e*t<0?-1:1;let s=r*t+e*n;return s>1&&(s=1),s<-1&&(s=-1),i*Math.acos(s)},Wf=(r,e,t,n,i,s,o,a,l,u,h,c,d)=>{const f=Math.pow(i,2),p=Math.pow(s,2),m=Math.pow(h,2),g=Math.pow(c,2);let y=f*p-f*g-p*m;y<0&&(y=0),y/=f*g+p*m,y=Math.sqrt(y)*(o===a?-1:1);const v=y*i/s*c,b=y*-s/i*h,_=u*v-l*b+(r+t)/2,S=l*v+u*b+(e+n)/2,M=(h-v)/i,B=(c-b)/s,P=(-h-v)/i,w=(-c-b)/s,T=ca(1,0,M,B);let L=ca(M,B,P,w);a===0&&L>0&&(L-=Ot),a===1&&L<0&&(L+=Ot),d.centerX=_,d.centerY=S,d.ang1=T,d.ang2=L};function da(r,e,t,n,i,s,o,a=0,l=0,u=0){if(s===0||o===0)return;const h=Math.sin(a*Ot/360),c=Math.cos(a*Ot/360),d=c*(e-n)/2+h*(t-i)/2,f=-h*(e-n)/2+c*(t-i)/2;if(d===0&&f===0)return;s=Math.abs(s),o=Math.abs(o);const p=Math.pow(d,2)/Math.pow(s,2)+Math.pow(f,2)/Math.pow(o,2);p>1&&(s*=Math.sqrt(p),o*=Math.sqrt(p)),Wf(e,t,n,i,s,o,l,u,h,c,d,f,In);let{ang1:m,ang2:g}=In;const{centerX:y,centerY:v}=In;let b=Math.abs(g)/(Ot/4);Math.abs(1-b)<1e-7&&(b=1);const _=Math.max(Math.ceil(b),1);g/=_;let S=r[r.length-2],M=r[r.length-1];const B={x:0,y:0};for(let P=0;P<_;P++){const w=Nf(m,g),{x:T,y:L}=Gn(w[0],s,o,c,h,y,v,B),{x:I,y:R}=Gn(w[1],s,o,c,h,y,v,B),{x:E,y:j}=Gn(w[2],s,o,c,h,y,v,B);kn(r,S,M,T,L,I,R,E,j),S=E,M=j,m+=g}}const Hf=new q;class fa{constructor(e){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new ve,this._graphicsPath2D=e}moveTo(e,t){return this.startPoly(e,t),this}lineTo(e,t){this._ensurePoly();const n=this._currentPoly.points,i=n[n.length-2],s=n[n.length-1];return(i!==e||s!==t)&&n.push(e,t),this}arc(e,t,n,i,s,o){this._ensurePoly(!1);const a=this._currentPoly.points;return Fn(a,e,t,n,i,s,o),this}arcTo(e,t,n,i,s){this._ensurePoly();const o=this._currentPoly.points;return ha(o,e,t,n,i,s),this}arcToSvg(e,t,n,i,s,o,a){const l=this._currentPoly.points;return da(l,this._currentPoly.lastX,this._currentPoly.lastY,o,a,e,t,n,i,s),this}bezierCurveTo(e,t,n,i,s,o){this._ensurePoly();const a=this._currentPoly;return kn(this._currentPoly.points,a.lastX,a.lastY,e,t,n,i,s,o),this}quadraticCurveTo(e,t,n,i){this._ensurePoly();const s=this._currentPoly;return ua(this._currentPoly.points,s.lastX,s.lastY,e,t,n,i),this}closePath(){return this.endPoly(!0),this}addPath(e,t){this.endPoly(),t&&!t.isIdentity()&&(e=e.clone(!0),e.transform(t));for(let n=0;n<e.instructions.length;n++){const i=e.instructions[n];this[i.action](...i.data)}return this}finish(e=!1){this.endPoly(e)}rect(e,t,n,i,s){return this.drawShape(new q(e,t,n,i),s),this}circle(e,t,n,i){return this.drawShape(new dn(e,t,n),i),this}poly(e,t,n){const i=new lt(e);i.closePath=t,this.drawShape(i,n)}ellipse(e,t,n,i,s){return this.drawShape(new fn(e,t,n,i),s),this}roundRect(e,t,n,i,s,o){return this.drawShape(new pn(e,t,n,i,s),o),this}drawShape(e,t){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:t}),this}startPoly(e,t){let n=this._currentPoly;return n&&this.endPoly(),n=new lt,n.points.push(e,t),this._currentPoly=n,this}endPoly(e=!1){const t=this._currentPoly;return t&&t.points.length>2&&(t.closePath=e,this.shapePrimitives.push({shape:t})),this._currentPoly=null,this}_ensurePoly(e=!0){if(!this._currentPoly&&(this._currentPoly=new lt,e)){const t=this.shapePrimitives[this.shapePrimitives.length-1];if(t){let n=t.shape.x,i=t.shape.y;if(t.transform.isIdentity()){const s=t.transform,o=n;n=s.a*n+s.c*i+s.tx,i=s.b*o+s.d*i+s.ty}this._currentPoly.points.push(n,n)}else this._currentPoly.points.push(0,0)}}buildPath(){const e=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let t=0;t<e.instructions.length;t++){const n=e.instructions[t];this[n.action](...n.data)}this.finish()}get bounds(){const e=this._bounds;e.clear();const t=this.shapePrimitives;for(let n=0;n<t.length;n++){const i=t[n],s=i.shape.getBounds(Hf);i.transform?(e.pushMatrix(i.transform),e.addRect(s),e.popMatrix()):e.addRect(s)}return e}}let Vf=0;class ut{constructor(e){this.instructions=[],this.uid=Vf++,this._dirty=!0;var t;typeof e=="string"?aa(e,this):this.instructions=(t=e==null?void 0:e.slice())!=null?t:[]}get shapePath(){return this._shapePath||(this._shapePath=new fa(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,t){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,t]}),this._dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this._dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this._dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this._dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this._dirty=!0,this}bezierCurveToShort(e,t,n,i){const s=this.instructions[this.instructions.length-1],o=this._getLastPoint(W.shared);let a=0,l=0;if(!s||s.action!=="bezierCurveTo")a=o.x,l=o.y;else{a=s.data[2],l=s.data[3];const u=o.x,h=o.y;a=u+(u-a),l=h+(h-l)}return this.instructions.push({action:"bezierCurveTo",data:[a,l,e,t,n,i]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this._dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this._dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this._dirty=!0,this}quadraticCurveToShort(e,t){const n=this.instructions[this.instructions.length-1],i=this._getLastPoint(W.shared);let s=0,o=0;if(!n||n.action!=="quadraticCurveTo")s=i.x,o=i.y;else{s=n.data[0],o=n.data[1];const a=i.x,l=i.y;s=a+(a-s),o=l+(l-o)}return this.instructions.push({action:"quadraticCurveTo",data:[s,o,e,t]}),this._dirty=!0,this}rect(e,t,n,i,s){return this.instructions.push({action:"rect",data:[e,t,n,i,s]}),this._dirty=!0,this}circle(e,t,n,i){return this.instructions.push({action:"circle",data:[e,t,n,i]}),this._dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this._dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this._dirty=!0,this}star(e,t,n,i,s,o=0,a){s=s||i/2;const l=-1*Math.PI/2+o,u=n*2,h=Math.PI*2/u,c=[];for(let d=0;d<u;d++){const f=d%2?s:i,p=d*h+l;c.push(e+f*Math.cos(p),t+f*Math.sin(p))}return this.poly(c,!0,a),this}clone(e=!1){const t=new ut;if(!e)t.instructions=this.instructions.slice();else for(let n=0;n<this.instructions.length;n++){const i=this.instructions[n];t.instructions.push({action:i.action,data:i.data.slice()})}return t}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(e){if(e.isIdentity())return this;const t=e.a,n=e.b,i=e.c,s=e.d,o=e.tx,a=e.ty;let l=0,u=0,h=0,c=0,d=0,f=0,p=0,m=0;for(let g=0;g<this.instructions.length;g++){const y=this.instructions[g],v=y.data;switch(y.action){case"moveTo":case"lineTo":l=v[0],u=v[1],v[0]=t*l+i*u+o,v[1]=n*l+s*u+a;break;case"bezierCurveTo":h=v[0],c=v[1],d=v[2],f=v[3],l=v[4],u=v[5],v[0]=t*h+i*c+o,v[1]=n*h+s*c+a,v[2]=t*d+i*f+o,v[3]=n*d+s*f+a,v[4]=t*l+i*u+o,v[5]=n*l+s*u+a;break;case"quadraticCurveTo":h=v[0],c=v[1],l=v[2],u=v[3],v[0]=t*h+i*c+o,v[1]=n*h+s*c+a,v[2]=t*l+i*u+o,v[3]=n*l+s*u+a;break;case"arcToSvg":l=v[5],u=v[6],p=v[0],m=v[1],v[0]=t*p+i*m,v[1]=n*p+s*m,v[5]=t*l+i*u+o,v[6]=n*l+s*u+a;break;case"rect":v[4]=Ln(v[4],e);break;case"ellipse":v[8]=Ln(v[8],e);break;case"roundRect":v[5]=Ln(v[5],e);break;case"addPath":v[0].transform(e);break;default:console.warn("unknown transform action",y.action);break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}_getLastPoint(e){let t=this.instructions.length-1,n=this.instructions[t];if(!n)return e.x=0,e.y=0,e;for(;n.action==="closePath";){if(t--,t<0)return e.x=0,e.y=0,e;n=this.instructions[t]}let i,s,o;switch(n.action){case"moveTo":case"lineTo":e.x=n.data[0],e.y=n.data[1];break;case"quadraticCurveTo":e.x=n.data[2],e.y=n.data[3];break;case"bezierCurveTo":e.x=n.data[4],e.y=n.data[5];break;case"arc":case"arcToSvg":e.x=n.data[5],e.y=n.data[6];break;case"addPath":e.x=n.data[0].lastX,e.y=n.data[2].lastY;break;case"rect":if(o=n.data[4],i=n.data[0],s=n.data[1],o){const{a,b:l,c:u,d:h,tx:c,ty:d}=o;e.x=a*i+u*s+c,e.y=l*i+h*s+d}else e.x=i,e.y=s;break;default:console.warn(`${n.action} is not supported yet`);break}return e}}function Ln(r,e){return r?r.prepend(e):e.clone()}var jf=Object.defineProperty,pa=Object.getOwnPropertySymbols,Yf=Object.prototype.hasOwnProperty,Xf=Object.prototype.propertyIsEnumerable,ga=(r,e,t)=>e in r?jf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Sr=(r,e)=>{for(var t in e||(e={}))Yf.call(e,t)&&ga(r,t,e[t]);if(pa)for(var t of pa(e))Xf.call(e,t)&&ga(r,t,e[t]);return r};function ma(r,e){if(typeof r=="string"){const n=document.createElement("div");n.innerHTML=r.trim(),r=n.querySelector("svg")}const t={context:e,path:new ut};return va(r,t,null,null),e}function va(r,e,t,n){const i=r.children,{fillStyle:s,strokeStyle:o}=qf(r);s&&t?t=Sr(Sr({},t),s):s&&(t=s),o&&n?n=Sr(Sr({},n),o):o&&(n=o),e.context.fillStyle=t,e.context.strokeStyle=n;let a,l,u,h,c,d,f,p,m,g,y,v,b,_,S,M,B;switch(r.nodeName.toLowerCase()){case"path":_=r.getAttribute("d"),S=new ut(_),e.context.path(S),t&&e.context.fill(),n&&e.context.stroke();break;case"circle":f=ne(r,"cx",0),p=ne(r,"cy",0),m=ne(r,"r",0),e.context.ellipse(f,p,m,m),t&&e.context.fill(),n&&e.context.stroke();break;case"rect":a=ne(r,"x",0),l=ne(r,"y",0),M=ne(r,"width",0),B=ne(r,"height",0),g=ne(r,"rx",0),y=ne(r,"ry",0),g||y?e.context.roundRect(a,l,M,B,g||y):e.context.rect(a,l,M,B),t&&e.context.fill(),n&&e.context.stroke();break;case"ellipse":f=ne(r,"cx",0),p=ne(r,"cy",0),g=ne(r,"rx",0),y=ne(r,"ry",0),e.context.beginPath(),e.context.ellipse(f,p,g,y),t&&e.context.fill(),n&&e.context.stroke();break;case"line":u=ne(r,"x1",0),h=ne(r,"y1",0),c=ne(r,"x2",0),d=ne(r,"y2",0),e.context.beginPath(),e.context.moveTo(u,h),e.context.lineTo(c,d),n&&e.context.stroke();break;case"polygon":b=r.getAttribute("points"),v=b.match(/\d+/g).map(P=>parseInt(P,10)),e.context.poly(v,!0),t&&e.context.fill(),n&&e.context.stroke();break;case"polyline":b=r.getAttribute("points"),v=b.match(/\d+/g).map(P=>parseInt(P,10)),e.context.poly(v,!1),n&&e.context.stroke();break;case"g":case"svg":break;default:{console.info(`[SVG parser] <${r.nodeName}> elements unsupported`);break}}for(let P=0;P<i.length;P++)va(i[P],e,t,n)}function ne(r,e,t){const n=r.getAttribute(e);return n?Number(n):t}function qf(r){const e=r.getAttribute("style"),t={},n={};let i=!1,s=!1;if(e){const o=e.split(";");for(let a=0;a<o.length;a++){const l=o[a],[u,h]=l.split(":");switch(u){case"stroke":h!=="none"&&(t.color=de(h),s=!0);break;case"stroke-width":t.width=Number(h);break;case"fill":h!=="none"&&(i=!0,n.color=de(h));break;case"fill-opacity":n.alpha=Number(h);break;case"stroke-opacity":t.alpha=Number(h);break;case"opacity":n.alpha=Number(h),t.alpha=Number(h);break}}}else{const o=r.getAttribute("stroke");o&&o!=="none"&&(s=!0,t.color=de(o),t.width=ne(r,"stroke-width",1));const a=r.getAttribute("fill");a&&a!=="none"&&(i=!0,n.color=de(a))}return{strokeStyle:s?t:null,fillStyle:i?n:null}}var Kf=Object.defineProperty,Zf=Object.defineProperties,Qf=Object.getOwnPropertyDescriptors,ba=Object.getOwnPropertySymbols,Jf=Object.prototype.hasOwnProperty,ep=Object.prototype.propertyIsEnumerable,ya=(r,e,t)=>e in r?Kf(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Qe=(r,e)=>{for(var t in e||(e={}))Jf.call(e,t)&&ya(r,t,e[t]);if(ba)for(var t of ba(e))ep.call(e,t)&&ya(r,t,e[t]);return r},Dn=(r,e)=>Zf(r,Qf(e));function Ut(r,e){if(!r)return null;let t,n;if(r!=null&&r.fill?(n=r.fill,t=Qe(Qe({},e),r)):(n=r,t=e),typeof n=="number"||typeof n=="string")return Dn(Qe({},t),{color:de(n),texture:C.WHITE});if(n instanceof wr){const s=n;return Dn(Qe({},t),{color:16777215,texture:s.texture,matrix:s.transform})}else if(n instanceof Ke){const s=n;return s.buildLinearGradient(),Dn(Qe({},t),{color:16777215,texture:s.texture,matrix:s.transform})}const i=Qe(Qe({},e),r);if(i.texture!==C.WHITE){const s=i.matrix||new k;s.scale(1/i.texture.frameWidth,1/i.texture.frameHeight),i.matrix=s,i.color=16777215}return i.color=de(i.color),i}var tp=Object.defineProperty,xa=Object.getOwnPropertySymbols,rp=Object.prototype.hasOwnProperty,np=Object.prototype.propertyIsEnumerable,_a=(r,e,t)=>e in r?tp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ie=(r,e)=>{for(var t in e||(e={}))rp.call(e,t)&&_a(r,t,e[t]);if(xa)for(var t of xa(e))np.call(e,t)&&_a(r,t,e[t]);return r};let ip=0;const gt=new W,wa=new k,Je=class extends ie{constructor(){super(...arguments),this.uid=ip++,this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new ut,this._transform=new k,this._fillStyle=Ie({},Je.defaultFillStyle),this._fillStyleOriginal=16777215,this._strokeStyle=Ie({},Je.defaultStrokeStyle),this._strokeStyleOriginal=16777215,this._stateStack=[],this._tick=0,this._bounds=new ve,this._boundsDirty=!0}set fillStyle(r){if(this._fillStyleOriginal!==r)if(this._fillStyleOriginal=r,typeof r=="number"||typeof r=="string")this._fillStyle.color=de(r),this._fillStyle.texture=C.WHITE;else if(r instanceof wr){const e=r;this._fillStyle.color=16777215,this._fillStyle.texture=e.texture,this._fillStyle.matrix=e.transform}else if(r instanceof Ke){const e=r;e.buildLinearGradient(),this._fillStyle.color=16777215,this._fillStyle.texture=e.texture,this._fillStyle.matrix=e.transform}else this._fillStyle=Ie(Ie({},Je.defaultFillStyle),r)}get fillStyle(){return this._fillStyleOriginal}set strokeStyle(r){if(this._strokeStyleOriginal!==r)if(this._strokeStyleOriginal=r,typeof r=="number"||typeof r=="string")this._strokeStyle.color=de(r),this._strokeStyle.texture=C.WHITE;else if(r instanceof Ke){const e=r;e.buildLinearGradient(),this._strokeStyle.color=16777215,this._strokeStyle.texture=e.texture,this._strokeStyle.matrix=e.transform}else this._strokeStyle=Ie(Ie({},Je.defaultStrokeStyle),r)}get strokeStyle(){return this._strokeStyleOriginal}setFillStyle(r){return this.fillStyle=r,this}setStrokeStyle(r){return this.strokeStyle=r,this}texture(r,e,t,n,i,s){return this.instructions.push({action:"texture",data:{image:r,dx:t||0,dy:n||0,dw:i||r.frameWidth,dh:s||r.frameHeight,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e||16777215}}),this.onUpdate(),this}beginPath(){return this._activePath=new ut,this}fill(r){let e;const t=this.instructions[this.instructions.length-1];if(this._tick===0&&t&&t.action==="stroke"?e=t.data.path:e=this._activePath.clone(),!e)return this;let n=this._fillStyle;return r&&(n=Ut(r,Je.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:n,path:e}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this}stroke(r){let e;const t=this.instructions[this.instructions.length-1];if(this._tick===0&&t&&t.action==="fill"?e=t.data.path:e=this._activePath.clone(),!e)return this;let n=this._strokeStyle;return r&&(n=Ut(r,Je.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:n,path:e}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this}cut(){for(let r=0;r<2;r++){const e=this.instructions[this.instructions.length-1-r],t=this._activePath.clone();e&&(e.action==="stroke"||e.action==="fill")&&(e.data.hole=t)}return this._activePath.instructions.length=0,this}arc(r,e,t,n,i,s){this._tick++;const o=this._transform;return this._activePath.arc(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,t,n,i,s),this}arcTo(r,e,t,n,i){this._tick++;const s=this._transform;return this._activePath.arcTo(s.a*r+s.c*e+s.tx,s.b*r+s.d*e+s.ty,s.a*t+s.c*n+s.tx,s.b*t+s.d*n+s.ty,i),this}arcToSvg(r,e,t,n,i,s,o){this._tick++;const a=this._transform;return this._activePath.arcToSvg(r,e,t,n,i,a.a*s+a.c*o+a.tx,a.b*s+a.d*o+a.ty),this}bezierCurveTo(r,e,t,n,i,s){this._tick++;const o=this._transform;return this._activePath.bezierCurveTo(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,o.a*t+o.c*n+o.tx,o.b*t+o.d*n+o.ty,o.a*i+o.c*s+o.tx,o.b*i+o.d*s+o.ty),this}closePath(){var r;return this._tick++,(r=this._activePath)==null||r.closePath(),this}ellipse(r,e,t,n){return this._tick++,this._activePath.ellipse(r,e,t,n,this._transform.clone()),this}circle(r,e,t){return this._tick++,this._activePath.circle(r,e,t,this._transform.clone()),this}path(r){return this._tick++,this._activePath.addPath(r,this._transform.clone()),this}lineTo(r,e){this._tick++;const t=this._transform;return this._activePath.lineTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}moveTo(r,e){this._tick++;const t=this._transform;return this._activePath.moveTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}quadraticCurveTo(r,e,t,n){this._tick++;const i=this._transform;this._activePath.quadraticCurveTo(i.a*r+i.c*e+i.tx,i.b*r+i.d*e+i.ty,i.a*t+i.c*n+i.tx,i.b*t+i.d*n+i.ty)}rect(r,e,t,n){return this._tick++,this._activePath.rect(r,e,t,n,this._transform.clone()),this}roundRect(r,e,t,n,i){return this._tick++,this._activePath.roundRect(r,e,t,n,i,this._transform.clone()),this}poly(r,e){return this._tick++,this._activePath.poly(r,e,this._transform.clone()),this}star(r,e,t,n,i,s){return this._tick++,this._activePath.star(r,e,t,n,i,s,this._transform.clone()),this}svg(r){this._tick++,ma(r,this)}restore(){const r=this._stateStack.pop();r&&(this._transform=r.transform,this._fillStyle=r.fillStyle,this._strokeStyle=r.strokeStyle)}save(){this._stateStack.push({transform:this._transform.clone(),fillStyle:Ie({},this._fillStyle),strokeStyle:Ie({},this._strokeStyle)})}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(r){return this._transform.rotate(r),this}scale(r,e=r){return this._transform.scale(r,e),this}setTransform(r,e,t,n,i,s){return r instanceof k?(this._transform.set(r.a,r.b,r.c,r.d,r.tx,r.ty),this):(this._transform.set(r,e,t,n,i,s),this)}transform(r,e,t,n,i,s){return r instanceof k?(this._transform.append(r),this):(wa.set(r,e,t,n,i,s),this._transform.append(wa),this)}translate(r,e){return this._transform.translate(r,e),this}clear(){return this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this._boundsDirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;const r=this._bounds;r.clear();for(let e=0;e<this.instructions.length;e++){const t=this.instructions[e],n=t.action;if(n==="fill"){const i=t.data;r.addBounds(i.path.bounds)}else if(n==="texture"){const i=t.data;r.pushMatrix(i.transform),r.addFrame(i.dx,i.dy,i.dx+i.dw,i.dy+i.dh),r.popMatrix()}}return r}containsPoint(r){const e=this.instructions;let t=!1;return e.forEach(n=>{var i;const s=n.data,o=s.path;if(!n.action||!o)return;const a=s.style,l=(i=o.shapePath)==null?void 0:i.shapePrimitives;this._forEachShape(l,u=>{var h;if(!a||!u)return;typeof a!="number"&&a.matrix?a.matrix.applyInverse(r,gt):gt.copyFrom(r),t=u.contains(gt.x,gt.y);const c=s.hole;if(!c)return;const d=(h=c.shapePath)==null?void 0:h.shapePrimitives;d&&this._forEachShape(d,f=>{f.contains(gt.x,gt.y)&&(t=!1)})})}),t}_forEachShape(r,e){r==null||r.forEach(t=>{const n=t==null?void 0:t.shape;n&&e(n)})}destroy(r=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(e),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(e)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};let Ge=Je;Ge.defaultFillStyle={color:0,alpha:1,texture:C.WHITE},Ge.defaultStrokeStyle={width:1,color:0,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:C.WHITE};const sp=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,op=".svg",ap="image/svg+xml",Ta={extension:{type:x.LoadParser,priority:Ae.Low},name:"loadSVG",test(r){return dt(r,ap)||ft(r,op)},async testParse(r){return typeof r=="string"&&r.startsWith("data:image/svg+xml")||typeof r=="string"&&sp.test(r)},async parse(r){const e=new Ge;return e.svg(r),e},async load(r){return(await $.ADAPTER.fetch(r)).text()},unload(r){r.destroy(!0)}};function Sa(r,e=1){var t;const n=(t=$.RETINA_PREFIX)==null?void 0:t.exec(r);return n?parseFloat(n[1]):e}let Pa=0,$n;const lp="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",up={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${lp}');
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
    `},hp={id:"loadImageBitmap",code:`
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
    };`};let zn;class cp{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const t=URL.createObjectURL(new Blob([up.code],{type:"application/javascript"})),n=new Worker(t);n.addEventListener("message",i=>{n.terminate(),URL.revokeObjectURL(t),e(i.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e){return this._run("loadImageBitmap",[e])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){$n===void 0&&($n=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<$n&&(zn||(zn=URL.createObjectURL(new Blob([hp.code],{type:"application/javascript"}))),this._createdWorkers++,e=new Worker(zn),e.addEventListener("message",t=>{this._complete(t.data),this._returnWorker(t.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){e.error!==void 0?this._resolveHash[e.uuid].reject(e.error):this._resolveHash[e.uuid].resolve(e.data),this._resolveHash[e.uuid]=null}async _run(e,t){await this._initWorkers();const n=new Promise((i,s)=>{this._queue.push({id:e,arguments:t,resolve:i,reject:s})});return this._next(),n}_next(){if(!this._queue.length)return;const e=this._getWorker();if(!e)return;const t=this._queue.pop(),n=t.id;this._resolveHash[Pa]={resolve:t.resolve,reject:t.reject},e.postMessage({data:t.arguments,uuid:Pa++,id:n})}}const Nn=new cp;function Ea(r,e,t){const n=new C({source:r,label:t});return n.source.on("destroy",()=>{delete e.promiseCache[t],se.has(t)&&se.remove(t)}),n}var dp=Object.defineProperty,Aa=Object.getOwnPropertySymbols,fp=Object.prototype.hasOwnProperty,pp=Object.prototype.propertyIsEnumerable,Ma=(r,e,t)=>e in r?dp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,gp=(r,e)=>{for(var t in e||(e={}))fp.call(e,t)&&Ma(r,t,e[t]);if(Aa)for(var t of Aa(e))pp.call(e,t)&&Ma(r,t,e[t]);return r};const mp=[".jpeg",".jpg",".png",".webp",".avif"],vp=["image/jpeg","image/png","image/webp","image/avif"];async function Ca(r){const e=await $.ADAPTER.fetch(r);if(!e.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${r}: ${e.status} ${e.statusText}`);const t=await e.blob();return await createImageBitmap(t)}const Wn={name:"loadTextures",extension:{type:x.LoadParser,priority:Ae.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(r){return dt(r,vp)||ft(r,mp)},async load(r,e,t){var n;let i=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await Nn.isImageBitmapSupported()?i=await Nn.loadImageBitmap(r):i=await Ca(r):i=await new Promise(o=>{i=new Image,i.crossOrigin=this.config.crossOrigin,i.src=r,i.complete?o(i):i.onload=()=>{o(i)}});const s=new kt(gp({resource:i,resolution:((n=e.data)==null?void 0:n.resolution)||Sa(r)},e.data));return Ea(s,t,r)},unload(r){r.destroy(!0)}},Ba={extension:x.ResolveParser,test:Wn.test,parse:r=>{var e,t;return{resolution:parseFloat((t=(e=$.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:r.split(".").pop(),src:r}}};Z.add(jo,qo,Yo,Jo,Ko,Zo,Qo,ea,ta,sa,Ta,Wn,Ba,Vo,Ho);const Ra={loader:x.LoadParser,resolver:x.ResolveParser,cache:x.CacheParser,detection:x.DetectionParser};Z.handle(x.Asset,r=>{const e=r.ref;Object.entries(Ra).filter(([t])=>!!e[t]).forEach(([t,n])=>{var i;return Z.add(Object.assign(e[t],{extension:(i=e[t].extension)!=null?i:n}))})},r=>{const e=r.ref;Object.keys(Ra).filter(t=>!!e[t]).forEach(t=>Z.remove(e[t]))});class re{constructor(e,t,n){this._x=t||0,this._y=n||0,this._observer=e}clone(e){return new re(e,this._x,this._y)}set(e=0,t=e){return(this._x!==e||this._y!==t)&&(this._x=e,this._y=t,this._observer.onUpdate()),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this._observer.onUpdate()),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this._observer.onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this._observer.onUpdate(this))}}function ka(r,e,t){const n=r.length;let i;if(e>=n||t===0)return;t=e+t>n?n-e:t;const s=n-t;for(i=e;i<s;++i)r[i]=r[i+t];r.length=s}const Oa={removeChildren(r=0,e){const t=e!=null?e:this.children.length,n=t-r,i=[];if(n>0&&n<=t){for(let s=t-1;s>=r;s--){const o=this.children[s];o&&(this.layerGroup&&this.layerGroup.removeChild(o),i.push(o),o.parent=null)}ka(this.children,r,t);for(let s=0;s<i.length;++s)this.emit("childRemoved",i[s],this,s),i[s].emit("removed",this);return i}else if(n===0&&this.children.length===0)return i;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(r){const e=this.getChildAt(r);return this.removeChild(e)},getChildAt(r){if(r<0||r>=this.children.length)throw new Error(`getChildAt: Index (${r}) does not exist.`);return this.children[r]},setChildIndex(r,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(r),this.addChildAt(r,e)},getChildIndex(r){const e=this.children.indexOf(r);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(r,e){const{children:t}=this;if(e<0||e>t.length)throw new Error(`${r}addChildAt: The index ${e} supplied is out of bounds ${t.length}`);if(r.parent){const n=r.parent.children.indexOf(r);if(r.parent===this&&n===e)return r;n!==-1&&r.parent.children.splice(n,1)}return e===t.length?t.push(r):t.splice(e,0,r),r.parent=this,r.didChange=!0,r.didViewUpdate=!1,r._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(r),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",r,this,e),r.emit("added",this),r},swapChildren(r,e){if(r===e)return;const t=this.getChildIndex(r),n=this.getChildIndex(e);this.children[t]=e,this.children[n]=r},removeFromParent(){var r;(r=this.parent)==null||r.removeChild(this)}};class Pr{constructor(e){this.pipe="filter",this.priority=1,this.filters=e==null?void 0:e.filters}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null}}const Ua=[];function Fa(r){const e=Ua.pop()||new Pr;return e.filters=r,e}function Ia(r){r.filters=null,Ua.push(r)}class Ga{constructor(e,t){this._pool=[],this._count=0,this._index=0,this._classType=e,t&&this.prepopulate(t)}prepopulate(e){for(let t=0;t<e;t++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){var t;let n;return this._index>0?n=this._pool[--this._index]:n=new this._classType,(t=n.init)==null||t.call(n,e),n}return(e){var t;(t=e.reset)==null||t.call(e),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._pool.length}get totalUsed(){return this._count-this._pool.length}}class La{constructor(){this._poolsByClass=new Map}prepopulate(e,t){this.getPool(e).prepopulate(t)}get(e,t){return this.getPool(e).get(t)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new Ga(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(t=>{const n=e[t._classType.name]?t._classType.name+t._classType.ID:t._classType.name;e[n]={free:t.totalFree,used:t.totalUsed,size:t.totalSize}}),e}}const V=new La;class Da{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this._tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let t=0;t<this._tests.length;t++){const n=this._tests[t];if(n.test(e))return V.get(n.maskClass,e)}return e}returnMaskEffect(e){V.return(e)}}const Er=new Da;Z.handleByList(x.MaskEffect,Er._effectClasses);const $a={_mask:null,_filters:null,set mask(r){if(this._mask||(this._mask={mask:null,effect:null}),this._mask.mask===r||(this._mask.effect&&(this.removeEffect(this._mask.effect),Er.returnMaskEffect(this._mask.effect),this._mask.effect=null),this._mask.mask=r,r==null))return;const e=Er.getMaskEffect(r);this._mask.effect=e,this.addEffect(e)},get mask(){var r;return(r=this._mask)==null?void 0:r.mask},set filters(r){if(!Array.isArray(r)&&r!==null&&(r=[r]),this._filters||(this._filters={filters:null,effect:null}),this._filters.filters===r||(this._filters.effect&&(this.removeEffect(this._filters.effect),Ia(this._filters.effect),this._filters.effect=null),this._filters.filters=r,!r))return;const e=Fa(r);this._filters.effect=e,this.addEffect(e)},get filters(){var r;return(r=this._filters)==null?void 0:r.filters}},za={getChildByLabel(r,e=!1){const t=this.children;for(let n=0;n<t.length;n++){const i=t[n];if(i.label===r||r instanceof RegExp&&r.test(i.label))return i}if(e)for(let n=0;n<t.length;n++){const i=t[n].getChildByLabel(r,!0);if(i)return i}return null},getChildrenByLabel(r,e=!1,t=[]){const n=this.children;for(let i=0;i<n.length;i++){const s=n[i];(s.label===r||r instanceof RegExp&&r.test(s.label))&&t.push(s)}if(e)for(let i=0;i<n.length;i++)n[i].getChildrenByLabel(r,!0,t);return t}};function Ce(r,e){const t=e._scale,n=e._pivot,i=e._position,s=t._x,o=t._y,a=n._x,l=n._y;r.a=e._cx*s,r.b=e._sx*s,r.c=e._cy*o,r.d=e._sy*o,r.tx=i._x-(a*r.a+l*r.c),r.ty=i._y-(a*r.b+l*r.d)}function Ft(r,e,t){t.clear();let n;return r.parent?e?n=r.parent.worldTransform:n=It(r,new k):n=k.IDENTITY,Hn(r,t,n,e),t.isValid||t.set(0,0,0,0),t}function Hn(r,e,t,n){var i,s;if(!r.visible||!r.measurable)return;let o;n?o=r.worldTransform:(r.didChange&&Ce(r.localTransform,r),o=k.shared.appendFrom(r.localTransform,t).clone());const a=e,l=!!r.effects.length;l&&(e=e.clone()),r.view&&(e.setMatrix(o),r.view.addBounds(e));for(let u=0;u<r.children.length;u++)Hn(r.children[u],e,o,n);if(l){for(let u=0;u<r.effects.length;u++)(s=(i=r.effects[u]).addBounds)==null||s.call(i,e);a.setMatrix(k.IDENTITY),a.addBounds(e)}}function It(r,e){const t=r.parent;return t&&(It(t,e),t.didChange&&Ce(t.localTransform,t),e.append(t.localTransform)),e}function et(r,e,t){e.clear(),t||(t=new k),r.view&&(e.setMatrix(t),r.view.addBounds(e));for(let n=0;n<r.children.length;n++)Na(r.children[n],e,t,r);return e.isValid||e.set(0,0,0,0),e}function Na(r,e,t,n){var i,s;if(!r.visible||!r.measurable)return;r.didChange&&Ce(r.localTransform,r);const o=r.localTransform,a=k.shared.appendFrom(o,t).clone(),l=e,u=!!r.effects.length;u&&(e=new ve),r.view&&(e.setMatrix(a),r.view.addBounds(e));for(let h=0;h<r.children.length;h++)Na(r.children[h],e,a,n);if(u){for(let h=0;h<r.effects.length;h++)(s=(i=r.effects[h]).addLocalBounds)==null||s.call(i,e,n);l.setMatrix(k.IDENTITY),l.addBounds(e)}}function Wa(r,e,t){const n=r.parent;if(!n){console.warn("Item is not inside the root container");return}n!==e&&(Wa(n,e,t),Ce(n.localTransform,n),t.append(n.localTransform))}const Gt=new ve,Lt=new k,Ha={get width(){return Math.abs(this.scale.x*et(this,Gt,Lt).width)},set width(r){const e=et(this,Gt,Lt).width;e!==0?this.scale.x=r/e:this.scale.x=1},get height(){return Math.abs(this.scale.y*et(this,Gt,Lt).height)},set height(r){const e=et(this,Gt,Lt).height;e!==0?this.scale.y=r/e:this.scale.y=1},getLocalBounds(){return et(this,new ve,Lt).rectangle},getBounds(r){return Ft(this,r,Gt).rectangle}},Va={_onRender:null,set onRender(r){const e=this.layerGroup;if(!r){this._onRender&&(e==null||e.removeOnRender(this)),this._onRender=null;return}this._onRender||e==null||e.addOnRender(this),this._onRender=r},get onRender(){return this._onRender}},ja={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(r){this._zIndex!==r&&(this._zIndex=r,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(bp))}};function bp(r,e){return r._zIndex-e._zIndex}const Ya={getGlobalPosition(r=new W,e=!1){return this.parent?this.parent.toGlobal(this._position,r,e):(r.x=this._position.x,r.y=this._position.y),r},toGlobal(r,e,t=!1){if(!t){this.didChange&&Ce(this.localTransform,this);const n=It(this,new k);return n.append(this.localTransform),n.apply(r,e)}return this.worldTransform.apply(r,e)},toLocal(r,e,t,n){if(e&&(r=e.toGlobal(r,t,n)),!n){this.didChange&&Ce(this.localTransform,this);const i=It(this,new k);return i.append(this.localTransform),i.applyInverse(r,t)}return this.worldTransform.applyInverse(r,t)}};let yp=0;class Xa{constructor(){this.uid=yp++,this.instructions=[],this.instructionSize=0}reset(){this.instructionSize=0}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}lastInstruction(){return this.instructions[this.instructionSize-1]}}class qa{constructor(e){this.type="layer",this.root=null,this.canBundle=!1,this.layerGroupParent=null,this.layerGroupChildren=[],this._children=[],this.worldTransform=new k,this.worldColor=4294967295,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new Xa,this._onRenderContainers=[],this.root=e,this.addChild(e)}get localTransform(){return this.root.localTransform}get layerTransform(){return this.root.layerTransform}addLayerGroupChild(e){e.layerGroupParent&&e.layerGroupParent._removeLayerGroupChild(e),e.layerGroupParent=this,this.onChildUpdate(e.root),this.layerGroupChildren.push(e)}_removeLayerGroupChild(e){e.root.didChange&&this._removeChildFromUpdate(e.root);const t=this.layerGroupChildren.indexOf(e);t>-1&&this.layerGroupChildren.splice(t,1),e.layerGroupParent=null}addChild(e){if(this.structureDidChange=!0,e!==this.root&&(this._children.push(e),e.updateTick=-1,e.parent===this.root?e.relativeLayerDepth=1:e.relativeLayerDepth=e.parent.relativeLayerDepth+1,e._onRender&&this.addOnRender(e)),e.layerGroup){if(e.layerGroup.root===e){this.addLayerGroupChild(e.layerGroup);return}}else e.layerGroup=this,e.didChange=!0;const t=e.children;e.isLayerRoot||this.onChildUpdate(e);for(let n=0;n<t.length;n++)this.addChild(t[n])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&this.removeOnRender(e),e.layerGroup.root!==e){const n=e.children;for(let i=0;i<n.length;i++)this.removeChild(n[i]);e.didChange&&e.layerGroup._removeChildFromUpdate(e),e.layerGroup=null}else this._removeLayerGroupChild(e.layerGroup);const t=this._children.indexOf(e);t>-1&&this._children.splice(t,1)}onChildUpdate(e){let t=this.childrenToUpdate[e.relativeLayerDepth];t||(t=this.childrenToUpdate[e.relativeLayerDepth]={index:0,list:[]}),t.list[t.index++]=e}updateRenderable(e){e.layerVisibleRenderable<3||(e.didViewUpdate=!1,this.instructionSet.renderPipes[e.view.type].updateRenderable(e))}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}_removeChildFromUpdate(e){const t=this.childrenToUpdate[e.relativeLayerDepth];if(!t)return;const n=t.list.indexOf(e);n>-1&&t.list.splice(n,1),t.index--}get isRenderable(){const e=this.worldColor>>24&255;return this.root.localVisibleRenderable===3&&e>0}addOnRender(e){this._onRenderContainers.push(e)}removeOnRender(e){this._onRenderContainers.splice(this._onRenderContainers.indexOf(e),1)}runOnRender(){this._onRenderContainers.forEach(e=>{e._onRender()})}}let Ka=0;function Vn(){return Ka++}const Za=new re(null),jn=new re(null),Yn=new re(null,1,1),Ar=1,Xn=2,Mr=4,xp=8;class J extends ie{constructor({label:e,layer:t,view:n,sortableChildren:i}={}){super(),this.uid=Ka++,this.label=null,this._updateFlags=15,this.isLayerRoot=!1,this.layerGroup=null,this.didChange=!1,this.didViewUpdate=!1,this.relativeLayerDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new k,this.layerTransform=new k,this.destroyed=!1,this._position=new re(this,0,0),this._scale=Yn,this._pivot=jn,this._skew=Za,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=4294967295,this.layerColor=4294967295,this.localBlendMode="inherit",this.layerBlendMode="normal",this.localVisibleRenderable=3,this.layerVisibleRenderable=3,this.effects=[],e&&(this.label=e),t&&this.enableLayer(),n&&(this.view=n,this.view.owner=this),this.sortableChildren=!!i}static mixin(e){Object.defineProperties(J.prototype,Object.getOwnPropertyDescriptors(e))}addEffect(e){this.effects.indexOf(e)===-1&&(this.effects.push(e),this.effects.sort((t,n)=>t.priority-n.priority),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())}removeEffect(e){const t=this.effects.indexOf(e);t!==-1&&(this.effects.splice(t,1),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())}addChild(...e){if(e.length>1){for(let n=0;n<e.length;n++)this.addChild(e[n]);return e[0]}const t=e[0];return t.parent===this?(this.children.splice(this.children.indexOf(t),1),this.children.push(t),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),t):(t.parent&&t.parent.removeChild(t),this.children.push(t),this.sortableChildren&&(this.sortDirty=!0),t.parent=this,t.didChange=!0,t.didViewUpdate=!1,t._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(t),this.emit("childAdded",t,this,this.children.length-1),t.emit("added",this),t._zIndex!==0&&t.depthOfChildModified(),t)}removeChild(...e){if(e.length>1){for(let i=0;i<e.length;i++)this.removeChild(e[i]);return e[0]}const t=e[0],n=this.children.indexOf(t);return n>-1&&(this.children.splice(n,1),this.layerGroup&&this.layerGroup.removeChild(t)),t.parent=null,this.emit("childRemoved",t,this,n),t.emit("removed",this),t}onUpdate(e){if(e&&e===this._skew&&this._updateSkew(),!this.didChange)if(this.didChange=!0,this.isLayerRoot){const t=this.layerGroup.layerGroupParent;t&&t.onChildUpdate(this)}else this.layerGroup&&this.layerGroup.onChildUpdate(this)}onViewUpdate(){this.didViewUpdate||(this.didViewUpdate=!0,this.layerGroup&&this.layerGroup.onChildViewUpdate(this))}set layer(e){if(this.isLayerRoot&&e===!1)throw new Error("[Pixi] cannot undo a layer just yet");e&&this.enableLayer()}get layer(){return this.isLayerRoot}enableLayer(){if(this.layerGroup&&this.layerGroup.root===this)return;this.isLayerRoot=!0;const e=this.layerGroup;if(e&&e.removeChild(this),this.layerGroup=new qa(this),e){for(let t=0;t<e.layerGroupChildren.length;t++){const n=e.layerGroupChildren[t];let i=n.root;for(;i;){if(i===this){this.layerGroup.addLayerGroupChild(n);break}i=i.parent}}e.addLayerGroupChild(this.layerGroup)}this._updateIsSimple()}get worldTransform(){return this._worldTransform||(this._worldTransform=new k),this.layerGroup&&(this.isLayerRoot?this._worldTransform.copyFrom(this.layerGroup.worldTransform):this._worldTransform.appendFrom(this.layerTransform,this.layerGroup.worldTransform)),this._worldTransform}get x(){return this._position.x}set x(e){this._position.x=e}get y(){return this._position.y}set y(e){this._position.y=e}get position(){return this._position}set position(e){this._position.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.onUpdate(this._skew))}get angle(){return this.rotation*$o}set angle(e){this.rotation=e*zo}get pivot(){return this._pivot===jn&&(this._pivot=new re(this,0,0)),this._pivot}set pivot(e){this._pivot===jn&&(this._pivot=new re(this,0,0)),this._pivot.copyFrom(e)}get skew(){return this._skew===Za&&(this._skew=new re(this,0,0)),this._skew}get scale(){return this._scale===Yn&&(this._scale=new re(this,1,1)),this._scale}set scale(e){this._scale===Yn&&(this._scale=new re(this,0,0)),this._scale.copyFrom(e)}_updateSkew(){const e=this._rotation,t=this._skew;this._cx=Math.cos(e+t._y),this._sx=Math.sin(e+t._y),this._cy=-Math.sin(e-t._x),this._sy=Math.cos(e-t._x)}set alpha(e){e=e*255|0,e!==(this.localColor>>24&255)&&(this.localColor=this.localColor&16777215|e<<24,this._updateFlags|=Ar,this.onUpdate())}get alpha(){return(this.localColor>>24&255)/255}set tint(e){e=de(e),e=((e&255)<<16)+(e&65280)+(e>>16&255),e!==(this.localColor&16777215)&&(this.localColor=this.localColor&4278190080|e&16777215,this._updateFlags|=Ar,this.onUpdate())}get tint(){const e=this.localColor&16777215;return((e&255)<<16)+(e&65280)+(e>>16&255)}set blendMode(e){this.localBlendMode!==e&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=Xn,this.localBlendMode=e,this.onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localVisibleRenderable&2)}set visible(e){const t=e?1:0;(this.localVisibleRenderable&2)>>1!==t&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=Mr,this.localVisibleRenderable=this.localVisibleRenderable&1|t<<1,this.onUpdate())}get renderable(){return!!(this.localVisibleRenderable&1)}set renderable(e){const t=e?1:0;(this.localVisibleRenderable&1)!==t&&(this.localVisibleRenderable=this.localVisibleRenderable&2|t,this._updateFlags|=Mr,this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.onUpdate())}get isRenderable(){const e=this.layerColor>>24&255;return this.localVisibleRenderable===3&&e>0}_updateIsSimple(){this.isSimple=!this.isLayerRoot&&this.effects.length===0}destroy(e=!1){if(this.destroyed)return;this.destroyed=!0,this.removeFromParent(),this.parent=null,this._mask=null,this._filters=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed"),this.removeAllListeners();const t=typeof e=="boolean"?e:e==null?void 0:e.children,n=this.removeChildren(0,this.children.length);if(t)for(let i=0;i<n.length;++i)n[i].destroy(e);this.view&&(this.view.destroy(e),this.view.owner=null)}}J.mixin(Oa),J.mixin(Ya),J.mixin(Va),J.mixin(Ha),J.mixin($a),J.mixin(za),J.mixin(ja);class _p{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){this._tickerAdded||!this.domElement||(ct.system.add(this._tickerUpdate,this,ht.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(ct.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const e=this.events._rootPointerEvent;this.events.supportsTouchEvents&&e.pointerType==="touch"||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY}))}_tickerUpdate(e){this._deltaTime+=e.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this._update())}}const Be=new _p;class ur{constructor(e){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=ur.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new W,this.page=new W,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=e}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(e,t,n){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(e,t,n,i,s){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}class Dt extends ur{constructor(){super(...arguments),this.client=new W,this.movement=new W,this.offset=new W,this.global=new W,this.screen=new W}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(e,t,n){return e.worldTransform.applyInverse(n||this.global,t)}getModifierState(e){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(e)}initMouseEvent(e,t,n,i,s,o,a,l,u,h,c,d,f,p,m){throw new Error("Method not implemented.")}}class ye extends Dt{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class tt extends Dt{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}tt.DOM_DELTA_PIXEL=0,tt.DOM_DELTA_LINE=1,tt.DOM_DELTA_PAGE=2;const wp=2048,Tp=new W,$t=new W;class Qa{constructor(e){this.dispatch=new ie,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,t){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:t,priority:0}),this.mappingTable[e].sort((n,i)=>n.priority-i.priority)}dispatchEvent(e,t){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,t),this.dispatch.emit(t||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const t=this.mappingTable[e.type];if(t)for(let n=0,i=t.length;n<i;n++)t[n].fn(e);else console.warn(`[EventBoundary]: Event mapping not defined for ${e.type}`)}hitTest(e,t){Be.pauseUpdate=!0;const n=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",i=this[n](this.rootTarget,this.rootTarget.eventMode,Tp.set(e,t),this.hitTestFn,this.hitPruneFn);return i&&i[0]}propagate(e,t){if(!e.target)return;const n=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let i=0,s=n.length-1;i<s;i++)if(e.currentTarget=n[i],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,t),!(e.propagationStopped||e.propagationImmediatelyStopped)){e.eventPhase=e.BUBBLING_PHASE;for(let i=n.length-2;i>=0;i--)if(e.currentTarget=n[i],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,t,n=this._allInteractiveElements){if(n.length===0)return;e.eventPhase=e.BUBBLING_PHASE;const i=Array.isArray(t)?t:[t];for(let s=n.length-1;s>=0;s--)i.forEach(o=>{e.currentTarget=n[s],this.notifyTarget(e,o)})}propagationPath(e){const t=[e];for(let n=0;n<wp&&e!==this.rootTarget&&e.parent;n++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");t.push(e.parent),e=e.parent}return t.reverse(),t}hitTestMoveRecursive(e,t,n,i,s,o=!1){let a=!1;if(this._interactivePrune(e))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Be.pauseUpdate=!1),e.interactiveChildren&&e.children){const h=e.children;for(let c=h.length-1;c>=0;c--){const d=h[c],f=this.hitTestMoveRecursive(d,this._isInteractive(t)?t:d.eventMode,n,i,s,o||s(e,n));if(f){if(f.length>0&&!f[f.length-1].parent)continue;const p=e.isInteractive();(f.length>0||p)&&(p&&this._allInteractiveElements.push(e),f.push(e)),this._hitElements.length===0&&(this._hitElements=f),a=!0}}}const l=this._isInteractive(t),u=e.isInteractive();return u&&u&&this._allInteractiveElements.push(e),o||this._hitElements.length>0?null:a?this._hitElements:l&&!s(e,n)&&i(e,n)?u?[e]:[]:null}hitTestRecursive(e,t,n,i,s){if(this._interactivePrune(e)||s(e,n))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Be.pauseUpdate=!1),e.interactiveChildren&&e.children){const l=e.children,u=n;for(let h=l.length-1;h>=0;h--){const c=l[h],d=this.hitTestRecursive(c,this._isInteractive(t)?t:c.eventMode,u,i,s);if(d){if(d.length>0&&!d[d.length-1].parent)continue;const f=e.isInteractive();return(d.length>0||f)&&d.push(e),d}}}const o=this._isInteractive(t),a=e.isInteractive();return o&&i(e,n)?a?[e]:[]:null}_isInteractive(e){return e==="static"||e==="dynamic"}_interactivePrune(e){return!e||!e.visible||!e.renderable||e.eventMode==="none"||e.eventMode==="passive"&&!e.interactiveChildren}hitPruneFn(e,t){if(e.hitArea&&(e.worldTransform.applyInverse(t,$t),!e.hitArea.contains($t.x,$t.y)))return!0;if(e.effects&&e.effects.length)for(let n=0;n<e.effects.length;n++){const i=e.effects[n];if(i.containsPoint&&!i.containsPoint(t,this.hitTestFn))return!0}return!1}hitTestFn(e,t){var n;return e.eventMode==="passive"?!1:e.hitArea?!0:(n=e.view)!=null&&n.containsPoint?(e.worldTransform.applyInverse(t,$t),e.view.containsPoint($t)):!1}notifyTarget(e,t){var n,i;t=t!=null?t:e.type;const s=`on${t}`;(i=(n=e.currentTarget)[s])==null||i.call(n,e);const o=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${t}capture`:t;this._notifyListeners(e,o),e.eventPhase===e.AT_TARGET&&this._notifyListeners(e,t)}mapPointerDown(e){if(!(e instanceof ye)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.createPointerEvent(e);if(this.dispatchEvent(t,"pointerdown"),t.pointerType==="touch")this.dispatchEvent(t,"touchstart");else if(t.pointerType==="mouse"||t.pointerType==="pen"){const i=t.button===2;this.dispatchEvent(t,i?"rightdown":"mousedown")}const n=this.trackingData(e.pointerId);n.pressTargetsByButton[e.button]=t.composedPath(),this.freeEvent(t)}mapPointerMove(e){var t,n,i;if(!(e instanceof ye)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const s=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const o=s.pointerType==="mouse"||s.pointerType==="pen",a=this.trackingData(e.pointerId),l=this.findMountedTarget(a.overTargets);if(((t=a.overTargets)==null?void 0:t.length)>0&&l!==s.target){const c=e.type==="mousemove"?"mouseout":"pointerout",d=this.createPointerEvent(e,c,l);if(this.dispatchEvent(d,"pointerout"),o&&this.dispatchEvent(d,"mouseout"),!s.composedPath().includes(l)){const f=this.createPointerEvent(e,"pointerleave",l);for(f.eventPhase=f.AT_TARGET;f.target&&!s.composedPath().includes(f.target);)f.currentTarget=f.target,this.notifyTarget(f),o&&this.notifyTarget(f,"mouseleave"),f.target=f.target.parent;this.freeEvent(f)}this.freeEvent(d)}if(l!==s.target){const c=e.type==="mousemove"?"mouseover":"pointerover",d=this.clonePointerEvent(s,c);this.dispatchEvent(d,"pointerover"),o&&this.dispatchEvent(d,"mouseover");let f=l==null?void 0:l.parent;for(;f&&f!==this.rootTarget.parent&&f!==s.target;)f=f.parent;if(!f||f===this.rootTarget.parent){const p=this.clonePointerEvent(s,"pointerenter");for(p.eventPhase=p.AT_TARGET;p.target&&p.target!==l&&p.target!==this.rootTarget.parent;)p.currentTarget=p.target,this.notifyTarget(p),o&&this.notifyTarget(p,"mouseenter"),p.target=p.target.parent;this.freeEvent(p)}this.freeEvent(d)}const u=[],h=(n=this.enableGlobalMoveEvents)!=null?n:!0;this.moveOnAll?u.push("pointermove"):this.dispatchEvent(s,"pointermove"),h&&u.push("globalpointermove"),s.pointerType==="touch"&&(this.moveOnAll?u.splice(1,0,"touchmove"):this.dispatchEvent(s,"touchmove"),h&&u.push("globaltouchmove")),o&&(this.moveOnAll?u.splice(1,0,"mousemove"):this.dispatchEvent(s,"mousemove"),h&&u.push("globalmousemove"),this.cursor=(i=s.target)==null?void 0:i.cursor),u.length>0&&this.all(s,u),this._allInteractiveElements.length=0,this._hitElements.length=0,a.overTargets=s.composedPath(),this.freeEvent(s)}mapPointerOver(e){var t;if(!(e instanceof ye)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const n=this.trackingData(e.pointerId),i=this.createPointerEvent(e),s=i.pointerType==="mouse"||i.pointerType==="pen";this.dispatchEvent(i,"pointerover"),s&&this.dispatchEvent(i,"mouseover"),i.pointerType==="mouse"&&(this.cursor=(t=i.target)==null?void 0:t.cursor);const o=this.clonePointerEvent(i,"pointerenter");for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),s&&this.notifyTarget(o,"mouseenter"),o.target=o.target.parent;n.overTargets=i.composedPath(),this.freeEvent(i),this.freeEvent(o)}mapPointerOut(e){if(!(e instanceof ye)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId);if(t.overTargets){const n=e.pointerType==="mouse"||e.pointerType==="pen",i=this.findMountedTarget(t.overTargets),s=this.createPointerEvent(e,"pointerout",i);this.dispatchEvent(s),n&&this.dispatchEvent(s,"mouseout");const o=this.createPointerEvent(e,"pointerleave",i);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),n&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;t.overTargets=null,this.freeEvent(s),this.freeEvent(o)}this.cursor=null}mapPointerUp(e){if(!(e instanceof ye)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=performance.now(),n=this.createPointerEvent(e);if(this.dispatchEvent(n,"pointerup"),n.pointerType==="touch")this.dispatchEvent(n,"touchend");else if(n.pointerType==="mouse"||n.pointerType==="pen"){const a=n.button===2;this.dispatchEvent(n,a?"rightup":"mouseup")}const i=this.trackingData(e.pointerId),s=this.findMountedTarget(i.pressTargetsByButton[e.button]);let o=s;if(s&&!n.composedPath().includes(s)){let a=s;for(;a&&!n.composedPath().includes(a);){if(n.currentTarget=a,this.notifyTarget(n,"pointerupoutside"),n.pointerType==="touch")this.notifyTarget(n,"touchendoutside");else if(n.pointerType==="mouse"||n.pointerType==="pen"){const l=n.button===2;this.notifyTarget(n,l?"rightupoutside":"mouseupoutside")}a=a.parent}delete i.pressTargetsByButton[e.button],o=a}if(o){const a=this.clonePointerEvent(n,"click");a.target=o,a.path=null,i.clicksByButton[e.button]||(i.clicksByButton[e.button]={clickCount:0,target:a.target,timeStamp:t});const l=i.clicksByButton[e.button];if(l.target===a.target&&t-l.timeStamp<200?++l.clickCount:l.clickCount=1,l.target=a.target,l.timeStamp=t,a.detail=l.clickCount,a.pointerType==="mouse"){const u=a.button===2;this.dispatchEvent(a,u?"rightclick":"click")}else a.pointerType==="touch"&&this.dispatchEvent(a,"tap");this.dispatchEvent(a,"pointertap"),this.freeEvent(a)}this.freeEvent(n)}mapPointerUpOutside(e){if(!(e instanceof ye)){console.warn("EventBoundary cannot map a non-pointer event as a pointer event");return}const t=this.trackingData(e.pointerId),n=this.findMountedTarget(t.pressTargetsByButton[e.button]),i=this.createPointerEvent(e);if(n){let s=n;for(;s;)i.currentTarget=s,this.notifyTarget(i,"pointerupoutside"),i.pointerType==="touch"?this.notifyTarget(i,"touchendoutside"):(i.pointerType==="mouse"||i.pointerType==="pen")&&this.notifyTarget(i,i.button===2?"rightupoutside":"mouseupoutside"),s=s.parent;delete t.pressTargetsByButton[e.button]}this.freeEvent(i)}mapWheel(e){if(!(e instanceof tt)){console.warn("EventBoundary cannot map a non-wheel event as a wheel event");return}const t=this.createWheelEvent(e);this.dispatchEvent(t),this.freeEvent(t)}findMountedTarget(e){if(!e)return null;let t=e[0];for(let n=1;n<e.length&&e[n].parent===t;n++)t=e[n];return t}createPointerEvent(e,t,n){var i;const s=this.allocateEvent(ye);return this.copyPointerData(e,s),this.copyMouseData(e,s),this.copyData(e,s),s.nativeEvent=e.nativeEvent,s.originalEvent=e,s.target=(i=n!=null?n:this.hitTest(s.global.x,s.global.y))!=null?i:this._hitElements[0],typeof t=="string"&&(s.type=t),s}createWheelEvent(e){const t=this.allocateEvent(tt);return this.copyWheelData(e,t),this.copyMouseData(e,t),this.copyData(e,t),t.nativeEvent=e.nativeEvent,t.originalEvent=e,t.target=this.hitTest(t.global.x,t.global.y),t}clonePointerEvent(e,t){const n=this.allocateEvent(ye);return n.nativeEvent=e.nativeEvent,n.originalEvent=e.originalEvent,this.copyPointerData(e,n),this.copyMouseData(e,n),this.copyData(e,n),n.target=e.target,n.path=e.composedPath().slice(),n.type=t!=null?t:n.type,n}copyWheelData(e,t){t.deltaMode=e.deltaMode,t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ}copyPointerData(e,t){e instanceof ye&&t instanceof ye&&(t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist)}copyMouseData(e,t){e instanceof Dt&&t instanceof Dt&&(t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.copyFrom(e.client),t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.copyFrom(e.movement),t.screen.copyFrom(e.screen),t.shiftKey=e.shiftKey,t.global.copyFrom(e.global))}copyData(e,t){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.detail=e.detail,t.view=e.view,t.which=e.which,t.layer.copyFrom(e.layer),t.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const t=this.eventPool.get(e).pop()||new e(this);return t.eventPhase=t.NONE,t.currentTarget=null,t.path=null,t.target=null,t}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const t=e.constructor;this.eventPool.has(t)||this.eventPool.set(t,[]),this.eventPool.get(t).push(e)}_notifyListeners(e,t){const n=e.currentTarget._events[t];if(n&&e.currentTarget.isInteractive())if("fn"in n)n.once&&e.currentTarget.removeListener(t,n.fn,void 0,!0),n.fn.call(n.context,e);else for(let i=0,s=n.length;i<s&&!e.propagationImmediatelyStopped;i++)n[i].once&&e.currentTarget.removeListener(t,n[i].fn,void 0,!0),n[i].fn.call(n[i].context,e)}}var Sp=Object.defineProperty,Ja=Object.getOwnPropertySymbols,Pp=Object.prototype.hasOwnProperty,Ep=Object.prototype.propertyIsEnumerable,el=(r,e,t)=>e in r?Sp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ap=(r,e)=>{for(var t in e||(e={}))Pp.call(e,t)&&el(r,t,e[t]);if(Ja)for(var t of Ja(e))Ep.call(e,t)&&el(r,t,e[t]);return r};const Mp=1,Cp={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},qn=class{constructor(r){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=r,this.rootBoundary=new Qa(null),Be.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new ye(null),this._rootWheelEvent=new tt(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy(Ap({},qn.defaultEventFeatures),{set:(e,t,n)=>(t==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=n),e[t]=n,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(r){var e,t;const{element:n,resolution:i}=this.renderer;this.setTargetElement(n),this.resolution=i,qn._defaultEventMode=(e=r.eventMode)!=null?e:"auto",Object.assign(this.features,(t=r.eventFeatures)!=null?t:{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(r){this.resolution=r}destroy(){this.setTargetElement(null),this.renderer=null}setCursor(r){r=r||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this._currentCursor===r)return;this._currentCursor=r;const t=this.cursorStyles[r];if(t)switch(typeof t){case"string":e&&(this.domElement.style.cursor=t);break;case"function":t(r);break;case"object":e&&Object.assign(this.domElement.style,t);break}else e&&typeof r=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,r)&&(this.domElement.style.cursor=r)}get pointer(){return this._rootPointerEvent}_onPointerDown(r){if(!this.features.click||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;const e=this._normalizeToPointerData(r);this.autoPreventDefault&&e[0].isNormalized&&(r.cancelable||!("cancelable"in r))&&r.preventDefault();for(let t=0,n=e.length;t<n;t++){const i=e[t],s=this._bootstrapEvent(this._rootPointerEvent,i);this.rootBoundary.mapEvent(s)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(r){if(!this.features.move||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;Be.pointerMoved();const e=this._normalizeToPointerData(r);for(let t=0,n=e.length;t<n;t++){const i=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(r){if(!this.features.click||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;let e=r.target;r.composedPath&&r.composedPath().length>0&&(e=r.composedPath()[0]);const t=e!==this.domElement?"outside":"",n=this._normalizeToPointerData(r);for(let i=0,s=n.length;i<s;i++){const o=this._bootstrapEvent(this._rootPointerEvent,n[i]);o.type+=t,this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(r){if(!this.features.click||(this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.supportsTouchEvents&&r.pointerType==="touch"))return;const e=this._normalizeToPointerData(r);for(let t=0,n=e.length;t<n;t++){const i=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(i)}this.setCursor(this.rootBoundary.cursor)}onWheel(r){if(!this.features.wheel)return;const e=this.normalizeWheelEvent(r);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}setTargetElement(r){this._removeEvents(),this.domElement=r,Be.domElement=r,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;Be.addTickerListener();const r=this.domElement.style;r&&(globalThis.navigator.msPointerEnabled?(r.msContentZooming="none",r.msTouchAction="none"):this.supportsPointerEvents&&(r.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0)),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0)),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;Be.removeTickerListener();const r=this.domElement.style;globalThis.navigator.msPointerEnabled?(r.msContentZooming="",r.msTouchAction=""):this.supportsPointerEvents&&(r.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0)),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0)),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(r,e,t){const n=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},i=1/this.resolution;r.x=(e-n.left)*(this.domElement.width/n.width)*i,r.y=(t-n.top)*(this.domElement.height/n.height)*i}_normalizeToPointerData(r){const e=[];if(this.supportsTouchEvents&&r instanceof TouchEvent)for(let t=0,n=r.changedTouches.length;t<n;t++){const i=r.changedTouches[t];typeof i.button=="undefined"&&(i.button=0),typeof i.buttons=="undefined"&&(i.buttons=1),typeof i.isPrimary=="undefined"&&(i.isPrimary=r.touches.length===1&&r.type==="touchstart"),typeof i.width=="undefined"&&(i.width=i.radiusX||1),typeof i.height=="undefined"&&(i.height=i.radiusY||1),typeof i.tiltX=="undefined"&&(i.tiltX=0),typeof i.tiltY=="undefined"&&(i.tiltY=0),typeof i.pointerType=="undefined"&&(i.pointerType="touch"),typeof i.pointerId=="undefined"&&(i.pointerId=i.identifier||0),typeof i.pressure=="undefined"&&(i.pressure=i.force||.5),typeof i.twist=="undefined"&&(i.twist=0),typeof i.tangentialPressure=="undefined"&&(i.tangentialPressure=0),typeof i.layerX=="undefined"&&(i.layerX=i.offsetX=i.clientX),typeof i.layerY=="undefined"&&(i.layerY=i.offsetY=i.clientY),i.isNormalized=!0,i.type=r.type,e.push(i)}else if(!globalThis.MouseEvent||r instanceof MouseEvent&&(!this.supportsPointerEvents||!(r instanceof globalThis.PointerEvent))){const t=r;typeof t.isPrimary=="undefined"&&(t.isPrimary=!0),typeof t.width=="undefined"&&(t.width=1),typeof t.height=="undefined"&&(t.height=1),typeof t.tiltX=="undefined"&&(t.tiltX=0),typeof t.tiltY=="undefined"&&(t.tiltY=0),typeof t.pointerType=="undefined"&&(t.pointerType="mouse"),typeof t.pointerId=="undefined"&&(t.pointerId=Mp),typeof t.pressure=="undefined"&&(t.pressure=.5),typeof t.twist=="undefined"&&(t.twist=0),typeof t.tangentialPressure=="undefined"&&(t.tangentialPressure=0),t.isNormalized=!0,e.push(t)}else e.push(r);return e}normalizeWheelEvent(r){const e=this._rootWheelEvent;return this._transferMouseData(e,r),e.deltaX=r.deltaX,e.deltaY=r.deltaY,e.deltaZ=r.deltaZ,e.deltaMode=r.deltaMode,this.mapPositionToPoint(e.screen,r.clientX,r.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=r,e.type=r.type,e}_bootstrapEvent(r,e){return r.originalEvent=null,r.nativeEvent=e,r.pointerId=e.pointerId,r.width=e.width,r.height=e.height,r.isPrimary=e.isPrimary,r.pointerType=e.pointerType,r.pressure=e.pressure,r.tangentialPressure=e.tangentialPressure,r.tiltX=e.tiltX,r.tiltY=e.tiltY,r.twist=e.twist,this._transferMouseData(r,e),this.mapPositionToPoint(r.screen,e.clientX,e.clientY),r.global.copyFrom(r.screen),r.offset.copyFrom(r.screen),r.isTrusted=e.isTrusted,r.type==="pointerleave"&&(r.type="pointerout"),r.type.startsWith("mouse")&&(r.type=r.type.replace("mouse","pointer")),r.type.startsWith("touch")&&(r.type=Cp[r.type]||r.type),r}_transferMouseData(r,e){r.isTrusted=e.isTrusted,r.srcElement=e.srcElement,r.timeStamp=performance.now(),r.type=e.type,r.altKey=e.altKey,r.button=e.button,r.buttons=e.buttons,r.client.x=e.clientX,r.client.y=e.clientY,r.ctrlKey=e.ctrlKey,r.metaKey=e.metaKey,r.movement.x=e.movementX,r.movement.y=e.movementY,r.page.x=e.pageX,r.page.y=e.pageY,r.relatedTarget=null,r.shiftKey=e.shiftKey}};let zt=qn;zt.extension={name:"events",type:[x.WebGLSystem,x.CanvasSystem,x.WebGPUSystem],priority:-1},zt.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};const tl={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(r){this.eventMode=r?"static":"passive"},_internalEventMode:void 0,get eventMode(){var r;return(r=this._internalEventMode)!=null?r:zt.defaultEventMode},set eventMode(r){this._internalEventMode=r},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(r,e,t){const n=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,i=typeof e=="function"?void 0:e;r=n?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.on(r,e,i)},removeEventListener(r,e,t){const n=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,i=typeof e=="function"?void 0:e;r=n?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.off(r,e,i)},dispatchEvent(r){if(!(r instanceof ur))throw new Error("DisplayObject cannot propagate events outside of the Federated Events API");return r.defaultPrevented=!1,r.path=null,r.target=this,r.manager.dispatchEvent(r),!r.defaultPrevented}};Z.add(zt),J.mixin(tl);const Nt=class{constructor(r,e){this.linkedSheets=[],this._texture=r instanceof C?r:null,this.textureSource=r.source,this.textures={},this.animations={},this.data=e;const t=parseFloat(e.meta.scale);t?(this.resolution=t,r.source.resolution=this.resolution):this.resolution=r.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(r=>{this._callback=r,this._batchIndex=0,this._frameKeys.length<=Nt.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(r){let e=r;const t=Nt.BATCH_SIZE;for(;e-r<t&&e<this._frameKeys.length;){const n=this._frameKeys[e],i=this._frames[n],s=i.frame;if(s){let o=null,a=null;const l=i.trimmed!==!1&&i.sourceSize?i.sourceSize:i.frame,u=new q(0,0,Math.floor(l.w)/this.resolution,Math.floor(l.h)/this.resolution);i.rotated?o=new q(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.h)/this.resolution,Math.floor(s.w)/this.resolution):o=new q(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),i.trimmed!==!1&&i.spriteSourceSize&&(a=new q(Math.floor(i.spriteSourceSize.x)/this.resolution,Math.floor(i.spriteSourceSize.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),a.x/=this.textureSource.width,a.y/=this.textureSource.height,a.width/=this.textureSource.width,a.height/=this.textureSource.height),o.x/=this.textureSource.width,o.y/=this.textureSource.height,o.width/=this.textureSource.width,o.height/=this.textureSource.height,u.x/=this.textureSource.width,u.y/=this.textureSource.height,u.width/=this.textureSource.width,u.height/=this.textureSource.height,this.textures[n]=new C({source:this.textureSource,layout:{frame:o,orig:u,trim:a,rotate:i.rotated?2:0,defaultAnchor:i.anchor},label:n.toString()})}e++}}_processAnimations(){const r=this.data.animations||{};for(const e in r){this.animations[e]=[];for(let t=0;t<r[e].length;t++){const n=r[e][t];this.animations[e].push(this.textures[n])}}}_parseComplete(){const r=this._callback;this._callback=null,this._batchIndex=0,r.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*Nt.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*Nt.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(r=!1){var e;for(const t in this.textures)this.textures[t].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,r&&((e=this._texture)==null||e.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};let Cr=Nt;Cr.BATCH_SIZE=1e3;const Bp=["jpg","png","jpeg","avif","webp"];function rl(r,e,t){const n={};if(r.forEach(i=>{n[i]=e}),Object.keys(e.textures).forEach(i=>{n[i]=e.textures[i]}),!t){const i=ae.dirname(r[0]);e.linkedSheets.forEach((s,o)=>{const a=rl([`${i}/${e.data.meta.related_multi_packs[o]}`],s,!0);Object.assign(n,a)})}return n}const nl={extension:x.Asset,cache:{test:r=>r instanceof Cr,getCacheableAssets:(r,e)=>rl(r,e,!1)},resolver:{test:r=>{const e=r.split("?")[0].split("."),t=e.pop(),n=e.pop();return t==="json"&&Bp.includes(n)},parse:r=>{var e,t;const n=r.split(".");return{resolution:parseFloat((t=(e=$.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:n[n.length-2],src:r}}},loader:{name:"spritesheetLoader",extension:{type:x.LoadParser,priority:Ae.Normal},async testParse(r,e){return ae.extname(e.src).toLowerCase()===".json"&&!!r.frames},async parse(r,e,t){var n,i;let s=ae.dirname(e.src);s&&s.lastIndexOf("/")!==s.length-1&&(s+="/");let o=s+r.meta.image;o=pr(o,e.src);const a=(await t.load([o]))[o],l=new Cr(a.source,r);await l.parse();const u=(n=r==null?void 0:r.meta)==null?void 0:n.related_multi_packs;if(Array.isArray(u)){const h=[];for(const d of u){if(typeof d!="string")continue;let f=s+d;(i=e.data)!=null&&i.ignoreMultiPack||(f=pr(f,e.src),h.push(t.load({src:f,data:{ignoreMultiPack:!0}})))}const c=await Promise.all(h);l.linkedSheets=c,c.forEach(d=>{d.linkedSheets=[l].concat(l.linkedSheets.filter(f=>f!==d))})}return l},unload(r){r.destroy(!0)}}};Z.add(nl);const mt={onViewUpdate:()=>{}};let Rp=0;class il{constructor(e){this.type="sprite",this.owner=mt,this.uid=Rp++,this.batched=!0,this._didUpdate=!1,this._bounds=[0,1,0,0],this._sourceBounds=[0,1,0,0],this._boundsDirty=!0,this._sourceBoundsDirty=!0;var t,n;this.anchor=new re(this,((t=e.layout.defaultAnchor)==null?void 0:t.x)||0,((n=e.layout.defaultAnchor)==null?void 0:n.y)||0),this.texture=e}set texture(e){e||(e=C.EMPTY),this._texture!==e&&(e.on("update",this.onUpdate,this),this._texture=e,e.off("update",this.onUpdate,this),this.onUpdate())}get texture(){return this._texture}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}get sourceBounds(){return this._sourceBoundsDirty&&(this._updateSourceBounds(),this._sourceBoundsDirty=!1),this._sourceBounds}containsPoint(e){const t=this._texture.frameWidth,n=this._texture.frameHeight,i=-t*this.anchor.x;let s=0;return e.x>=i&&e.x<i+t&&(s=-n*this.anchor.y,e.y>=s&&e.y<s+n)}addBounds(e){if(this._texture._layout.trim){const t=this.sourceBounds;e.addFrame(t[0],t[2],t[1],t[3])}else{const t=this.bounds;e.addFrame(t[0],t[2],t[1],t[3])}}onUpdate(){this._didUpdate=!0,this._sourceBoundsDirty=this._boundsDirty=!0,this.owner.onViewUpdate()}_updateBounds(){const e=this._texture,t=e._source,n=e.layout,i=n.orig,s=n.trim,o=t.width,a=t.height,l=o*i.width,u=a*i.height,h=this.anchor,c=this._bounds;if(s){const d=o*s.width,f=a*s.height;c[1]=s.x*o-h._x*l,c[0]=c[1]+d,c[3]=s.y*a-h._y*u,c[2]=c[3]+f}else c[1]=-h._x*l,c[0]=c[1]+l,c[3]=-h._y*u,c[2]=c[3]+u}_updateSourceBounds(){const e=this.anchor,t=this._texture,n=t._source,i=t.layout.orig,s=this._sourceBounds,o=n.width*i.width,a=n.height*i.height;s[1]=-e._x*o,s[0]=s[1]+o,s[3]=-e._y*a,s[2]=s[3]+a}destroy(e=!1){if(this.anchor=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._bounds=null,this._sourceBounds=null}}var kp=Object.defineProperty,sl=Object.getOwnPropertySymbols,Op=Object.prototype.hasOwnProperty,Up=Object.prototype.propertyIsEnumerable,ol=(r,e,t)=>e in r?kp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Fp=(r,e)=>{for(var t in e||(e={}))Op.call(e,t)&&ol(r,t,e[t]);if(sl)for(var t of sl(e))Up.call(e,t)&&ol(r,t,e[t]);return r};class Ue extends J{static from(e){return typeof e=="string"?new Ue(se.get(e)):new Ue(e)}constructor(e=C.EMPTY){var t;e instanceof C&&(e={texture:e}),(t=e.texture)!=null||(e.texture=C.EMPTY),super(Fp({view:new il(e.texture),label:"Sprite"},e))}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get texture(){return this.view.texture}set texture(e){this.view.texture=e}}const al=new ve;function Br(r,e,t){const n=al;r.measurable=!0,Ft(r,t,n),e.addBoundsMask(n),r.measurable=!1}function Rr(r,e,t){const n=new ve;r.measurable=!0;const i=Kn(r,t,new k);et(r,n,i),r.measurable=!1,e.addBoundsMask(n)}function Kn(r,e,t){return r?(r!==e&&(Kn(r.parent,e,t),r.didChange&&Ce(r.localTransform,r),t.append(r.localTransform)),t):(console.warn("Item is not inside the root container"),t)}class Zn{constructor(e){this.priority=0,this.pipe="alphaMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof Ue),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(e,t){Br(this.mask,e,t)}addLocalBounds(e,t){Rr(this.mask,e,t)}containsPoint(e,t){const n=this.mask;return t(n,e)}destroy(){this.reset()}static test(e){return e instanceof Ue}}Zn.extension=x.MaskEffect;class Qn{constructor(e){this.priority=0,this.pipe="colorMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}Qn.extension=x.MaskEffect;class Jn{constructor(e){this.priority=0,this.pipe="stencilMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(e,t){Br(this.mask,e,t)}addLocalBounds(e,t){Rr(this.mask,e,t)}containsPoint(e,t){const n=this.mask;return t(n,e)}destroy(){this.reset()}static test(e){return e instanceof J}}Jn.extension=x.MaskEffect,Z.add(Zn,Qn,Jn);var Ip={__proto__:null};let ei;function Gp(){return typeof ei=="undefined"&&(ei=function(){var r;const e={stencil:!0,failIfMajorPerformanceCaveat:$.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};try{if(!$.ADAPTER.getWebGLRenderingContext())return!1;let t=$.ADAPTER.createCanvas().getContext("webgl2",e);const n=!!((r=t==null?void 0:t.getContextAttributes())!=null&&r.stencil);if(t){const i=t.getExtension("WEBGL_lose_context");i&&i.loseContext()}return t=null,n}catch(t){return!1}}()),ei}async function Lp(r={}){if(!$.ADAPTER.getNavigator().gpu)return!1;try{return await(await navigator.gpu.requestAdapter(r)).requestDevice(),!0}catch(e){return!1}}var Dp=Object.defineProperty,ll=Object.getOwnPropertySymbols,$p=Object.prototype.hasOwnProperty,zp=Object.prototype.propertyIsEnumerable,ul=(r,e,t)=>e in r?Dp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Wt=(r,e)=>{for(var t in e||(e={}))$p.call(e,t)&&ul(r,t,e[t]);if(ll)for(var t of ll(e))zp.call(e,t)&&ul(r,t,e[t]);return r};const hl=["webgpu","webgl","canvas"];async function cl(r){var e;let t=[];r.preference?(t.push(r.preference),hl.forEach(o=>{o!==r.preference&&t.push(o)})):t=hl.slice();let n;((e=r.manageImports)==null||e)&&await Promise.resolve().then(function(){return Ip});let i={};for(let o=0;o<t.length;o++){const a=t[o];if(a==="webgpu"&&await Lp()){const{WebGPURenderer:l}=await Promise.resolve().then(function(){return Vb});n=l,i=Wt(Wt({},r),r.webgpu);break}else if(a==="webgl"&&Gp()){const{WebGLRenderer:l}=await Promise.resolve().then(function(){return Ob});n=l,i=Wt(Wt({},r),r.webgl);break}else if(a==="canvas"){i=Wt({},r);break}}delete i.webgpu,delete i.webgl;const s=new n;return await s.init(i),s}var Np=Object.defineProperty,dl=Object.getOwnPropertySymbols,Wp=Object.prototype.hasOwnProperty,Hp=Object.prototype.propertyIsEnumerable,fl=(r,e,t)=>e in r?Np(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Vp=(r,e)=>{for(var t in e||(e={}))Wp.call(e,t)&&fl(r,t,e[t]);if(dl)for(var t of dl(e))Hp.call(e,t)&&fl(r,t,e[t]);return r};const pl=class{constructor(){this.stage=new J}async init(r){r=Vp({},r),this.renderer=await cl(r),pl._plugins.forEach(e=>{e.init.call(this,r)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.element}get screen(){return this.renderer.screen}};let ti=pl;ti._plugins=[],Z.handleByList(x.Application,ti._plugins);class gl{constructor(e,t=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=t}add(e){e.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],t=Math.min(this._assetList.length,this._maxConcurrent);for(let n=0;n<t;n++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}const Ht=r=>!Array.isArray(r);var jp=Object.defineProperty,Yp=Object.defineProperties,Xp=Object.getOwnPropertyDescriptors,ml=Object.getOwnPropertySymbols,qp=Object.prototype.hasOwnProperty,Kp=Object.prototype.propertyIsEnumerable,vl=(r,e,t)=>e in r?jp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Zp=(r,e)=>{for(var t in e||(e={}))qp.call(e,t)&&vl(r,t,e[t]);if(ml)for(var t of ml(e))Kp.call(e,t)&&vl(r,t,e[t]);return r},Qp=(r,e)=>Yp(r,Xp(e));class bl{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,t,n)=>(this._parsersValidated=!1,e[t]=n,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,t){const n={promise:null,parser:null};return n.promise=(async()=>{var i,s;let o=null,a=null;if(t.loadParser&&(a=this._parserHash[t.loadParser]),!a){for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];if(u.load&&(i=u.test)!=null&&i.call(u,e,t,this)){a=u;break}}if(!a)return null}o=await a.load(e,t,this),n.parser=a;for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];u.parse&&u.parse&&await((s=u.testParse)==null?void 0:s.call(u,o,t,this))&&(o=await u.parse(o,t,this)||o,n.parser=u)}return o})(),n}async load(e,t){this._parsersValidated||this._validateParsers();let n=0;const i={},s=Ht(e),o=be(e,u=>({alias:[u],src:u})),a=o.length,l=o.map(async u=>{const h=ae.toAbsolute(u.src);if(!i[u.src])try{this.promiseCache[h]||(this.promiseCache[h]=this._getLoadPromiseAndParser(h,u)),i[u.src]=await this.promiseCache[h].promise,t&&t(++n/a)}catch(c){throw delete this.promiseCache[h],delete i[u.src],new Error(`[Loader.load] Failed to load ${h}.
${c}`)}});return await Promise.all(l),s?i[o[0].src]:i}async unload(e){const t=be(e,n=>({alias:[n],src:n})).map(async n=>{var i,s;const o=ae.toAbsolute(n.src),a=this.promiseCache[o];if(a){const l=await a.promise;(s=(i=a.parser)==null?void 0:i.unload)==null||s.call(i,l,n,this),delete this.promiseCache[o]}});await Promise.all(t)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name).reduce((e,t)=>(e[t.name],Qp(Zp({},e),{[t.name]:t})),{})}}function yl(r,e,t,n,i){const s=e[t];for(let o=0;o<s.length;o++){const a=s[o];t<e.length-1?yl(r.replace(n[t],a),e,t+1,n,i):i.push(r.replace(n[t],a))}}function xl(r){const e=/\{(.*?)\}/g,t=r.match(e),n=[];if(t){const i=[];t.forEach(s=>{const o=s.substring(1,s.length-1).split(",");i.push(o)}),yl(r,i,0,t,n)}else n.push(r);return n}var Jp=Object.defineProperty,eg=Object.defineProperties,tg=Object.getOwnPropertyDescriptors,_l=Object.getOwnPropertySymbols,rg=Object.prototype.hasOwnProperty,ng=Object.prototype.propertyIsEnumerable,wl=(r,e,t)=>e in r?Jp(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,vt=(r,e)=>{for(var t in e||(e={}))rg.call(e,t)&&wl(r,t,e[t]);if(_l)for(var t of _l(e))ng.call(e,t)&&wl(r,t,e[t]);return r},Tl=(r,e)=>eg(r,tg(e));class Sl{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,t)=>`${e}${this._bundleIdConnector}${t}`,extractAssetIdFromBundle:(e,t)=>t.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){var t,n,i;if(this._bundleIdConnector=(t=e.connector)!=null?t:this._bundleIdConnector,this._createBundleAssetId=(n=e.createBundleAssetId)!=null?n:this._createBundleAssetId,this._extractAssetIdFromBundle=(i=e.extractAssetIdFromBundle)!=null?i:this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const t=e;this._defaultSearchParams=Object.keys(t).map(n=>`${encodeURIComponent(n)}=${encodeURIComponent(t[n])}`).join("&")}}addManifest(e){this._manifest,this._manifest=e,e.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}addBundle(e,t){const n=[];Array.isArray(t)?t.forEach(i=>{var s,o;const a=(s=i.src)!=null?s:i.srcs,l=(o=i.alias)!=null?o:i.name;let u;if(typeof l=="string"){const h=this._createBundleAssetId(e,l);n.push(h),u=[l,h]}else{const h=l.map(c=>this._createBundleAssetId(e,c));n.push(...h),u=[...l,...h]}this.add(Tl(vt({},i),{alias:u,src:a}))}):Object.keys(t).forEach(i=>{var s;const o=[i,this._createBundleAssetId(e,i)];if(typeof t[i]=="string")this.add({alias:o,src:t[i]});else if(Array.isArray(t[i]))this.add({alias:o,src:t[i]});else{const a=t[i],l=(s=a.src)!=null?s:a.srcs;this.add(Tl(vt({},a),{alias:o,src:Array.isArray(l)?l:[l]}))}n.push(...o)}),this._bundles[e]=n}add(e){const t=[];Array.isArray(e)?t.push(...e):t.push(e);let n;be(t).forEach(i=>{const{alias:s,name:o,src:a,srcs:l}=i;let{data:u,format:h,loadParser:c}=i;const d=be(a||l).map(m=>typeof m=="string"?xl(m):Array.isArray(m)?m:[m]),f=be(s||o),p=[];d.forEach(m=>{m.forEach(g=>{var y,v,b;let _={};if(typeof g!="object"){_.src=g;for(let S=0;S<this._parsers.length;S++){const M=this._parsers[S];if(M.test(g)){_=M.parse(g);break}}}else u=(y=g.data)!=null?y:u,h=(v=g.format)!=null?v:h,c=(b=g.loadParser)!=null?b:c,_=vt(vt({},_),g);_=this._buildResolvedAsset(_,{aliases:f,data:u,format:h,loadParser:c}),p.push(_)})}),f.forEach(m=>{this._assetMap[m]=p})})}resolveBundle(e){const t=Ht(e);e=be(e);const n={};return e.forEach(i=>{const s=this._bundles[i];if(s){const o=this.resolve(s),a={};for(const l in o){const u=o[l];a[this._extractAssetIdFromBundle(i,l)]=u}n[i]=a}}),t?n[e[0]]:n}resolveUrl(e){const t=this.resolve(e);if(typeof e!="string"){const n={};for(const i in t)n[i]=t[i].src;return n}return t.src}resolve(e){const t=Ht(e);e=be(e);const n={};return e.forEach(i=>{var s;if(!this._resolverHash[i])if(this._assetMap[i]){let o=this._assetMap[i];const a=o[0],l=this._getPreferredOrder(o);l==null||l.priority.forEach(u=>{l.params[u].forEach(h=>{const c=o.filter(d=>d[u]?d[u]===h:!1);c.length&&(o=c)})}),this._resolverHash[i]=(s=o[0])!=null?s:a}else this._resolverHash[i]=this._buildResolvedAsset({alias:[i],src:i},{});n[i]=this._resolverHash[i]}),t?n[e[0]]:n}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let t=0;t<e.length;t++){const n=e[0],i=this._preferredOrder.find(s=>s.params.format.includes(n.format));if(i)return i}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const t=/\?/.test(e)?"&":"?";return`${e}${t}${this._defaultSearchParams}`}_buildResolvedAsset(e,t){var n;const{aliases:i,data:s,loadParser:o,format:a}=t;return(this._basePath||this._rootPath)&&(e.src=ae.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=(n=i!=null?i:e.alias)!=null?n:[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data=vt(vt({},s||{}),e.data),e.loadParser=o!=null?o:e.loadParser,e.format=a!=null?a:e.src.split(".").pop(),e.srcs=e.src,e.name=e.alias,e}}class Pl{constructor(){this._detections=[],this._initialized=!1,this.resolver=new Sl,this.loader=new bl,this.cache=se,this._backgroundLoader=new gl(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){var t,n,i;if(this._initialized)return;if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let l=e.manifest;typeof l=="string"&&(l=await this.load(l)),this.resolver.addManifest(l)}const s=(n=(t=e.texturePreference)==null?void 0:t.resolution)!=null?n:1,o=typeof s=="number"?[s]:s,a=await this._detectFormats({preferredFormats:(i=e.texturePreference)==null?void 0:i.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:a,resolution:o}}),e.preferences&&this.setPreferences(e.preferences)}add(e){this.resolver.add(e)}async load(e,t){this._initialized||await this.init();const n=Ht(e),i=be(e).map(a=>{if(typeof a!="string"){this.add(a);const l=a.src||a.srcs,u=a.alias||a.name;return u&&Array.isArray(u)?u[0]:l&&Array.isArray(l)?l[0]:u||l}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),s=this.resolver.resolve(i),o=await this._mapLoadToResolve(s,t);return n?o[i[0]]:o}addBundle(e,t){this.resolver.addBundle(e,t)}async loadBundle(e,t){this._initialized||await this.init();let n=!1;typeof e=="string"&&(n=!0,e=[e]);const i=this.resolver.resolveBundle(e),s={},o=Object.keys(i);let a=0,l=0;const u=()=>{t==null||t(++a/l)},h=o.map(c=>{const d=i[c];return l+=Object.keys(d).length,this._mapLoadToResolve(d,u).then(f=>{s[c]=f})});return await Promise.all(h),n?s[e[0]]:s}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(t))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolveBundle(e);Object.values(t).forEach(n=>{this._backgroundLoader.add(Object.values(n))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return se.get(e);const t={};for(let n=0;n<e.length;n++)t[n]=se.get(e[n]);return t}async _mapLoadToResolve(e,t){const n=Object.values(e),i=Object.keys(e);this._backgroundLoader.active=!1;const s=await this.loader.load(n,t);this._backgroundLoader.active=!0;const o={};return n.forEach((a,l)=>{const u=s[a.src],h=[a.src];a.alias&&h.push(...a.alias),o[i[l]]=u,se.set(h,u)}),o}async unload(e){this._initialized||await this.init();const t=be(e).map(i=>typeof i!="string"?i.src:i),n=this.resolver.resolve(t);await this._unloadFromResolved(n)}async unloadBundle(e){this._initialized||await this.init(),e=be(e);const t=this.resolver.resolveBundle(e),n=Object.keys(t).map(i=>this._unloadFromResolved(t[i]));await Promise.all(n)}async _unloadFromResolved(e){const t=Object.values(e);t.forEach(n=>{se.remove(n.src)}),await this.loader.unload(t)}async _detectFormats(e){let t=[];e.preferredFormats&&(t=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(const n of e.detections)e.skipDetections||await n.test()?t=await n.add(t):e.skipDetections||(t=await n.remove(t));return t=t.filter((n,i)=>t.indexOf(n)===i),t}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(t=>{t.config&&Object.keys(t.config).filter(n=>n in e).forEach(n=>{t.config[n]=e[n]})})}}const Vt=new Pl;Z.handleByList(x.LoadParser,Vt.loader.parsers).handleByList(x.ResolveParser,Vt.resolver.parsers).handleByList(x.CacheParser,Vt.cache.parsers).handleByList(x.DetectionParser,Vt.detections);class we{constructor(e){this.resources=Object.create(null),this._dirty=!0;let t=0;for(const n in e){const i=e[n];this.setResource(i,t++)}this.updateKey()}update(){this.updateKey()}updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let t=0;for(const n in this.resources)e[t++]=this.resources[n].resourceId;this.key=e.join("|")}setResource(e,t){var n,i;const s=this.resources[t];e!==s&&(s&&((n=e.off)==null||n.call(e,"change",this.onResourceChange,this)),(i=e.on)==null||i.call(e,"change",this.onResourceChange,this),this.resources[t]=e,this._dirty=!0)}getResource(e){return this.resources[e]}destroy(){var e;const t=this.resources;for(const n in t){const i=t[n];(e=i.off)==null||e.call(i,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(){this._dirty=!0,this.update()}}var Re=(r=>(r[r.WEBGL=1]="WEBGL",r[r.WEBGPU=2]="WEBGPU",r))(Re||{});let ig=0;function rt(){return ig++}function El(r,e){switch(r){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}var sg=Object.defineProperty,Al=Object.getOwnPropertySymbols,og=Object.prototype.hasOwnProperty,ag=Object.prototype.propertyIsEnumerable,Ml=(r,e,t)=>e in r?sg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Cl=(r,e)=>{for(var t in e||(e={}))og.call(e,t)&&Ml(r,t,e[t]);if(Al)for(var t of Al(e))ag.call(e,t)&&Ml(r,t,e[t]);return r};const Bl=class{constructor(r,e){this.uid=rt(),this.resourceType="uniformGroup",this.resourceId=this.uid,this.isUniformGroup=!0,this.dirtyId=0;var t,n;e=Cl(Cl({},Bl.DEFAULT),e),this.uniformStructures=r;const i={};for(const s in r){const o=r[s];o.name=s,o.size=(t=o.size)!=null?t:1,(n=o.value)!=null||(o.value=El(o.type,o.size)),i[s]=o.value}this.uniforms=i,this.dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this.signature=Object.keys(i).map(s=>`${s}-${r[s].type}`).join("-")}update(){this.dirtyId++}};let Q=Bl;Q.DEFAULT={ubo:!1,isStatic:!1};class Se extends ie{constructor({gpuProgram:e,glProgram:t,groups:n,resources:i,groupMap:s,compatibleRenderers:o}){super(),this.uniformBindMap=Object.create(null),this.gpuProgram=e,this.glProgram=t,o===void 0&&(o=0,e&&(o|=Re.WEBGPU),t&&(o|=Re.WEBGL)),this.compatibleRenderers=o;const a={};if(i&&n)throw new Error("[Shader] Cannot have both resources and groups");if(!i&&!n)throw new Error("[Shader] Must provide either resources or groups descriptor");if(!e&&n&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&n&&s)for(const l in s)for(const u in s[l]){const h=s[l][u];a[h]={group:l,binding:u,name:h}}else if(e&&n&&!s){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else if(i){if(e){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else{s={},n={99:new we};let l=0;for(const u in i)a[u]={group:99,binding:l,name:u},s[99]=s[99]||{},s[99][l]=u,l++}n={};for(const l in i){const u=l;let h=i[l];!h.source&&!h.resourceType&&(h=new Q(h));const c=a[u];c&&(n[c.group]=n[c.group]||new we,n[c.group].setResource(h,c.binding))}}this.groups=n,this.uniformBindMap=s,this.resources=this._buildResourceAccessor(n,a)}addResource(e,t,n){var i,s;(i=this.uniformBindMap)[t]||(i[t]={}),(s=this.uniformBindMap[t])[n]||(s[n]=e)}_buildResourceAccessor(e,t){const n={};for(const i in t){const s=t[i];Object.defineProperty(n,s.name,{get(){return e[s.group].getResource(s.binding)},set(o){e[s.group].setResource(o,s.binding)}})}return n}destroy(e=!1){var t,n;this.emit("destroy",this),e&&((t=this.gpuProgram)==null||t.destroy(),(n=this.glProgram)==null||n.destroy()),this.gpuProgram=null,this.glProgram=null,this.groups=null,this.removeAllListeners(),this.uniformBindMap=null,this.resources=null}}const lg={normal:0,additive:1,multiply:2,screen:3,overlay:4,erase:5},ri=0,ni=1,ii=2,si=3,oi=4,ai=5;class Ee{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<ri)}set blend(e){!!(this.data&1<<ri)!==e&&(this.data^=1<<ri)}get offsets(){return!!(this.data&1<<ni)}set offsets(e){!!(this.data&1<<ni)!==e&&(this.data^=1<<ni)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<ii)}set culling(e){!!(this.data&1<<ii)!==e&&(this.data^=1<<ii)}get depthTest(){return!!(this.data&1<<si)}set depthTest(e){!!(this.data&1<<si)!==e&&(this.data^=1<<si)}get depthMask(){return!!(this.data&1<<ai)}set depthMask(e){!!(this.data&1<<ai)!==e&&(this.data^=1<<ai)}get clockwiseFrontFace(){return!!(this.data&1<<oi)}set clockwiseFrontFace(e){!!(this.data&1<<oi)!==e&&(this.data^=1<<oi)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=lg[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}static for2d(){const e=new Ee;return e.depthTest=!1,e.blend=!0,e}}var ug=Object.defineProperty,Rl=Object.getOwnPropertySymbols,hg=Object.prototype.hasOwnProperty,cg=Object.prototype.propertyIsEnumerable,kl=(r,e,t)=>e in r?ug(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ol=(r,e)=>{for(var t in e||(e={}))hg.call(e,t)&&kl(r,t,e[t]);if(Rl)for(var t of Rl(e))cg.call(e,t)&&kl(r,t,e[t]);return r};const Ul=class extends Se{constructor(r){var e;r=Ol(Ol({},Ul.defaultOptions),r),super(r),this.enabled=!0,this._state=Ee.for2d(),this.padding=r.padding,typeof r.antialias=="boolean"?this.antialias=r.antialias?"on":"off":this.antialias=(e=r.antialias)!=null?e:"inherit",this.resolution=r.resolution,this.blendRequired=r.blendRequired,this.addResource("filterUniforms",0,0),this.addResource("uSampler",0,1)}apply(r,e,t,n){r.applyFilter(this,e,t,n)}get blendMode(){return this._state.blendMode}set blendMode(r){this._state.blendMode=r}};let Te=Ul;Te.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"inherit",blendRequired:!1};function Fl(r){var e;const t=new RegExp("(?<!\\/\\/.*)@(group|binding)\\(\\d+\\)[^;]+;","g"),n=/@group\((\d+)\)/,i=/@binding\((\d+)\)/,s=/var(<[^>]+>)? (\w+)/,o=/:\s*(\w+)/,a=/struct\s+(\w+)\s*{([^}]+)}/g,l=/(\w+)\s*:\s*([\w\<\>]+)/g,u=/struct\s+(\w+)/,h=(e=r.match(t))==null?void 0:e.map(d=>({group:parseInt(d.match(n)[1],10),binding:parseInt(d.match(i)[1],10),name:d.match(s)[2],isUniform:d.match(s)[1]==="<uniform>",type:d.match(o)[1]}));if(!h)return{groups:[],structs:[]};const c=r.match(a).map(d=>{const f=d.match(u)[1],p=d.match(l).reduce((m,g)=>{const[y,v]=g.split(":");return m[y.trim()]=v.trim(),m},{});return{name:f,members:p}}).filter(({name:d})=>h.some(f=>f.type===d));return{groups:h,structs:c}}var bt=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(bt||{});function Il({groups:r}){const e=[];for(let t=0;t<r.length;t++){const n=r[t];e[n.group]||(e[n.group]=[]),n.isUniform?e[n.group].push({binding:n.binding,visibility:bt.VERTEX|bt.FRAGMENT,buffer:{type:"uniform"}}):n.type==="sampler"?e[n.group].push({binding:n.binding,visibility:bt.FRAGMENT,sampler:{type:"filtering"}}):n.type==="texture_2d"&&e[n.group].push({binding:n.binding,visibility:bt.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function Gl({groups:r}){const e=[];for(let t=0;t<r.length;t++){const n=r[t];e[n.group]||(e[n.group]={}),e[n.group][n.name]=n.binding}return e}const jt=class{constructor({fragment:r,vertex:e,layout:t,gpuLayout:n}){this._layoutKey=0,this.fragment=r,this.vertex=e;const i=Fl(this.fragment.source);this.structsAndGroups=i,this.layout=t!=null?t:Gl(i),this.gpuLayout=n!=null?n:Il(i)}destroy(){this._gpuLayout=null,this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(r){const e=`${r.vertex.source}:${r.fragment.source}:${r.fragment.entryPoint}:${r.vertex.entryPoint}`;return jt.programCached[e]||(jt.programCached[e]=new jt(r)),jt.programCached[e]}};let fe=jt;fe.programCached=Object.create(null);var li=`struct GlobalUniforms {
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
}`,dg=Object.defineProperty,Ll=Object.getOwnPropertySymbols,fg=Object.prototype.hasOwnProperty,pg=Object.prototype.propertyIsEnumerable,Dl=(r,e,t)=>e in r?dg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,$l=(r,e)=>{for(var t in e||(e={}))fg.call(e,t)&&Dl(r,t,e[t]);if(Ll)for(var t of Ll(e))pg.call(e,t)&&Dl(r,t,e[t]);return r};const zl=class extends Te{constructor(r){r=$l($l({},zl.DEFAULT_OPTIONS),r);const e=new fe({vertex:{source:li,entryPoint:"mainVertex"},fragment:{source:li,entryPoint:"mainFragment"}}),t=new Q({uAlpha:{value:r.alpha,type:"f32"}});super({gpuProgram:e,resources:{filterUniforms:t}})}get alpha(){return this.resources.filterUniforms.uniforms.uAlpha}set alpha(r){this.resources.filterUniforms.uniforms.uAlpha=r}};let Nl=zl;Nl.DEFAULT_OPTIONS={alpha:1};function nt(r){return r+=r===0?1:0,--r,r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r+1}function gg(r){return!(r&r-1)&&!!r}function mg(r){let e=(r>65535?1:0)<<4;r>>>=e;let t=(r>255?1:0)<<3;return r>>>=t,e|=t,t=(r>15?1:0)<<2,r>>>=t,e|=t,t=(r>3?1:0)<<1,r>>>=t,e|=t,e|r>>1}var vg=Object.defineProperty,bg=Object.defineProperties,yg=Object.getOwnPropertyDescriptors,Wl=Object.getOwnPropertySymbols,xg=Object.prototype.hasOwnProperty,_g=Object.prototype.propertyIsEnumerable,Hl=(r,e,t)=>e in r?vg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wg=(r,e)=>{for(var t in e||(e={}))xg.call(e,t)&&Hl(r,t,e[t]);if(Wl)for(var t of Wl(e))_g.call(e,t)&&Hl(r,t,e[t]);return r},Tg=(r,e)=>bg(r,yg(e));let Sg=0;class Vl{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,n){const i=new le(Tg(wg({},this.textureOptions),{width:e,height:t,resolution:1,antialias:n}));return new C({source:i,label:`texturePool_${Sg++}`})}getOptimalTexture(e,t,n=1,i){let s=Math.ceil(e*n-1e-6),o=Math.ceil(t*n-1e-6);s=nt(s),o=nt(o);const a=(s<<17)+(o<<1)+(i?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let l=this._texturePool[a].pop();return l||(l=this.createTexture(s,o,i)),l.source._resolution=n,l.source.width=s/n,l.source.height=o/n,l.source.pixelWidth=s,l.source.pixelHeight=o,l.frameX=0,l.frameY=0,l.frameWidth=e,l.frameHeight=t,l.layout.update(),this._poolKeyHash[l.id]=a,l}getSameSizeTexture(e){const t=e.source;return this.getOptimalTexture(e.width,e.height,t._resolution,t.antialias)}returnTexture(e){const t=this._poolKeyHash[e.id];this._texturePool[t].push(e)}clear(e){if(e=e!==!1,e)for(const t in this._texturePool){const n=this._texturePool[t];if(n)for(let i=0;i<n.length;i++)n[i].destroy(!0)}this._texturePool={}}}const oe=new Vl;function jl(r,{requestedPrecision:e,maxSupportedPrecision:t}){if(r.substring(0,9)!=="precision"){let n=e;if(e==="highp"&&t!=="highp"&&(n="mediump"),r.substring(0,8)!=="#version")return`precision ${n} float;
${r}`;const i=r.indexOf(`
`);return`${r.substring(0,i+1)}precision ${n} float;
${r.substring(i+1)}`}else if(t!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}const Pg={},Eg={};function Yl(r,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const n=t?Pg:Eg;if(n[e]?(n[e]++,e+=`-${n[e]}`):n[e]=1,r.indexOf("#define SHADER_NAME")!==-1)return r;const i=`#define SHADER_NAME ${e}`;if(r.substring(0,8)!=="#version")return`${i}
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}${i}
${r.substring(s+1)}`}function Xl(r,{version:e="300 es"}){return r.substring(0,8)==="#version"?r:`#version ${e}
${r}`}const ui={ensurePrecision:jl,setProgramName:Yl,setProgramVersion:Xl},Yt=class{constructor({fragment:r,vertex:e,name:t}){const n={ensurePrecision:{requestedPrecision:"highp",maxSupportedPrecision:"highp"},setProgramName:{name:t},setProgramVersion:{version:"300 es"}};Object.keys(ui).forEach(i=>{var s;const o=(s=n[i])!=null?s:{};r=ui[i](r,o,!0),e=ui[i](e,o,!1)}),this.fragment=r,this.vertex=e,this.key=`${this.vertex}:${this.fragment}`}destroy(){this.fragment=null,this.vertex=null,this.attributeData=null,this.uniformData=null,this.uniformBlockData=null,this.transformFeedbackVaryings=null}static from(r){const e=`${r.vertex}:${r.fragment}`;return Yt.programCached[e]||(Yt.programCached[e]=new Yt(r)),Yt.programCached[e]}};let pe=Yt;pe.programCached=Object.create(null);const hi={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},Ag=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","out vec4 fragColor;","void main(void)","{","    fragColor = vec4(0.0);","    %blur%","}"].join(`
`);function ql(r){const e=hi[r],t=e.length;let n=Ag,i="";const s="fragColor += texture(uSampler, vBlurTexCoords[%index%]) * %value%;";let o;for(let a=0;a<r;a++){let l=s.replace("%index%",a.toString());o=a,a>=t&&(o=r-a-1),l=l.replace("%value%",e[o].toString()),i+=l,i+=`
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
    }`;function Kl(r,e){const t=Math.ceil(r/2);let n=Mg,i="",s;e?s="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":s="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let o=0;o<r;o++){let a=s.replace("%index%",o.toString());a=a.replace("%sampleIndex%",`${o-(t-1)}.0`),i+=a,i+=`
`}return n=n.replace("%blur%",i),n=n.replace("%size%",r.toString()),n=n.replace("%dimension%",e?"z":"w"),n}function Zl(r,e){const t=Kl(e,r),n=ql(e);return pe.from({vertex:t,fragment:n,name:`blur-${r?"horizontal":"vertical"}-pass-filter`})}var Ql=`

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
}`;function Jl(r,e){const t=hi[e],n=t.length,i=[],s=[],o=[];for(let c=0;c<e;c++){i[c]=`@location(${c}) offset${c}: vec2<f32>,`,r?s[c]=`filteredCord + vec2(${c-n+1} * strength, 0.0),`:s[c]=`filteredCord + vec2(0.0, ${c-n+1} * strength),`;const d=c<n?c:e-c-1,f=t[d].toString();o[c]=`fragColor += textureSample(uSampler, mySampler, offset${c}) * ${f};`}const a=i.join(`
`),l=s.join(`
`),u=o.join(`
`),h=Ql.replace("%blur-struct%",a).replace("%blur-vertex-out%",l).replace("%blur-fragment-in%",a).replace("%blur-sampling%",u);return fe.from({vertex:{source:h,entryPoint:"mainVertex"},fragment:{source:h,entryPoint:"mainFragment"}})}var Cg=Object.defineProperty,eu=Object.getOwnPropertySymbols,Bg=Object.prototype.hasOwnProperty,Rg=Object.prototype.propertyIsEnumerable,tu=(r,e,t)=>e in r?Cg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ci=(r,e)=>{for(var t in e||(e={}))Bg.call(e,t)&&tu(r,t,e[t]);if(eu)for(var t of eu(e))Rg.call(e,t)&&tu(r,t,e[t]);return r};const ru=class extends Te{constructor(r){r=ci(ci({},ru.defaultOptions),r);const e=Zl(r.horizontal,r.kernelSize),t=Jl(r.horizontal,r.kernelSize);super(ci({glProgram:e,gpuProgram:t,resources:{blurUniforms:{strength:{value:0,type:"f32"}}}},r)),this.horizontal=r.horizontal,this._quality=0,this.quality=r.quality,this.blur=r.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(r,e,t,n){if(this._uniforms.strength=this.strength/this.passes,this.passes===1)r.applyFilter(this,e,t,n);else{const i=oe.getSameSizeTexture(e);let s=e,o=i;this._state.blend=!1;for(let a=0;a<this.passes-1;a++){r.applyFilter(this,s,o,r.renderer.type===Re.WEBGPU);const l=o;o=s,s=l}this._state.blend=!0,r.applyFilter(this,s,t,n),oe.returnTexture(i)}}get blur(){return this.strength}set blur(r){this.padding=1+Math.abs(r)*2,this.strength=r}get quality(){return this._quality}set quality(r){this._quality=r,this.passes=r}};let Xt=ru;Xt.defaultOptions={strength:8,quality:4,kernelSize:5};var kg=Object.defineProperty,Og=Object.defineProperties,Ug=Object.getOwnPropertyDescriptors,nu=Object.getOwnPropertySymbols,Fg=Object.prototype.hasOwnProperty,Ig=Object.prototype.propertyIsEnumerable,iu=(r,e,t)=>e in r?kg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,qt=(r,e)=>{for(var t in e||(e={}))Fg.call(e,t)&&iu(r,t,e[t]);if(nu)for(var t of nu(e))Ig.call(e,t)&&iu(r,t,e[t]);return r},Gg=(r,e)=>Og(r,Ug(e));class su extends Te{constructor(...e){var t;let n=(t=e[0])!=null?t:{};typeof n=="number"&&(z(N,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),n={strength:n},e[1]&&(n.quality=e[1]),e[2]&&(n.resolution=e[2]),e[3]&&(n.kernelSize=e[3])),n=qt(qt({},Xt.defaultOptions),n),super(Gg(qt({},n),{compatibleRenderers:Re.WEBGL|Re.WEBGPU,resources:{}})),this._repeatEdgePixels=!1,this.blurXFilter=new Xt(qt({horizontal:!1},n)),this.blurYFilter=new Xt(qt({horizontal:!0},n)),this.quality=n.quality,this.blur=n.strength,this.repeatEdgePixels=!1}apply(e,t,n,i){const s=Math.abs(this.blurXFilter.strength),o=Math.abs(this.blurYFilter.strength);if(s&&o){const a=oe.getSameSizeTexture(t);this.blurXFilter.apply(e,t,a,!0),this.blurYFilter.apply(e,a,n,i),oe.returnTexture(a)}else o?this.blurYFilter.apply(e,t,n,i):this.blurXFilter.apply(e,t,n,i)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get blur(){return this.blurXFilter.blur}set blur(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get blurX(){return this.blurXFilter.blur}set blurX(e){this.blurXFilter.blur=e,this.updatePadding()}get blurY(){return this.blurYFilter.blur}set blurY(e){this.blurYFilter.blur=e,this.updatePadding()}get blendMode(){return this.blurYFilter.blendMode}set blendMode(e){this.blurYFilter.blendMode=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}}su.defaultOptions={strength:8,quality:4,kernelSize:5};var di=`in vec2 aPosition;
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
`,ou=`
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
`,fi=`struct GlobalUniforms {
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
}`;class Lg extends Te{constructor(){const e=new Q({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"vec4<f32>",size:5},uAlpha:{value:1,type:"f32"}}),t=fe.from({vertex:{source:fi,entryPoint:"mainVertex"},fragment:{source:fi,entryPoint:"mainFragment"}}),n=pe.from({vertex:di,fragment:ou,name:"color-matrix-filter"});super({gpuProgram:t,glProgram:n,resources:{colorMatrixUniforms:e}}),this.alpha=1}_loadMatrix(e,t=!1){let n=e;t&&(this._multiply(n,this.matrix,e),n=this._colorMatrix(n)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=n,this.resources.colorMatrixUniforms.update()}_multiply(e,t,n){return e[0]=t[0]*n[0]+t[1]*n[5]+t[2]*n[10]+t[3]*n[15],e[1]=t[0]*n[1]+t[1]*n[6]+t[2]*n[11]+t[3]*n[16],e[2]=t[0]*n[2]+t[1]*n[7]+t[2]*n[12]+t[3]*n[17],e[3]=t[0]*n[3]+t[1]*n[8]+t[2]*n[13]+t[3]*n[18],e[4]=t[0]*n[4]+t[1]*n[9]+t[2]*n[14]+t[3]*n[19]+t[4],e[5]=t[5]*n[0]+t[6]*n[5]+t[7]*n[10]+t[8]*n[15],e[6]=t[5]*n[1]+t[6]*n[6]+t[7]*n[11]+t[8]*n[16],e[7]=t[5]*n[2]+t[6]*n[7]+t[7]*n[12]+t[8]*n[17],e[8]=t[5]*n[3]+t[6]*n[8]+t[7]*n[13]+t[8]*n[18],e[9]=t[5]*n[4]+t[6]*n[9]+t[7]*n[14]+t[8]*n[19]+t[9],e[10]=t[10]*n[0]+t[11]*n[5]+t[12]*n[10]+t[13]*n[15],e[11]=t[10]*n[1]+t[11]*n[6]+t[12]*n[11]+t[13]*n[16],e[12]=t[10]*n[2]+t[11]*n[7]+t[12]*n[12]+t[13]*n[17],e[13]=t[10]*n[3]+t[11]*n[8]+t[12]*n[13]+t[13]*n[18],e[14]=t[10]*n[4]+t[11]*n[9]+t[12]*n[14]+t[13]*n[19]+t[14],e[15]=t[15]*n[0]+t[16]*n[5]+t[17]*n[10]+t[18]*n[15],e[16]=t[15]*n[1]+t[16]*n[6]+t[17]*n[11]+t[18]*n[16],e[17]=t[15]*n[2]+t[16]*n[7]+t[17]*n[12]+t[18]*n[17],e[18]=t[15]*n[3]+t[16]*n[8]+t[17]*n[13]+t[18]*n[18],e[19]=t[15]*n[4]+t[16]*n[9]+t[17]*n[14]+t[18]*n[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const n=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}tint(e,t){const n=e>>16&255,i=e>>8&255,s=e&255,o=[n/255,0,0,0,0,0,i/255,0,0,0,0,0,s/255,0,0,0,0,0,1,0];this._loadMatrix(o,t)}greyscale(e,t){const n=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(n,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const n=Math.cos(e),i=Math.sin(e),s=Math.sqrt,o=1/3,a=s(o),l=n+(1-n)*o,u=o*(1-n)-a*i,h=o*(1-n)+a*i,c=o*(1-n)+a*i,d=n+o*(1-n),f=o*(1-n)-a*i,p=o*(1-n)-a*i,m=o*(1-n)+a*i,g=n+o*(1-n),y=[l,u,h,0,0,c,d,f,0,0,p,m,g,0,0,0,0,0,1,0];this._loadMatrix(y,t)}contrast(e,t){const n=(e||0)+1,i=-.5*(n-1),s=[n,0,0,0,i,0,n,0,0,i,0,0,n,0,i,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const n=e*2/3+1,i=(n-1)*-.5,s=[n,i,i,0,0,i,n,i,0,0,i,i,n,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,n,i,s){e=e||.2,t=t||.15,n=n||16770432,i=i||3375104;const o=(n>>16&255)/255,a=(n>>8&255)/255,l=(n&255)/255,u=(i>>16&255)/255,h=(i>>8&255)/255,c=(i&255)/255,d=[.3,.59,.11,0,0,o,a,l,e,0,u,h,c,t,0,o-u,a-h,l-c,0,0];this._loadMatrix(d,s)}night(e,t){e=e||.1;const n=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(n,t)}predator(e,t){const n=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(n,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}var au=`
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
`,lu=`in vec2 aPosition;
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
`,pi=`struct GlobalUniforms {
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
}`;class Dg extends Te{constructor(...e){var t;let n=e[0];n instanceof Ue&&(e[1]&&z(N,"DisplacementFilter now uses options object instead of params. {sprite, scale}"),n={sprite:n,scale:e[1]});let i=(t=n.scale)!=null?t:20;typeof i=="number"&&(i=new W(i,i));const s=new Q({filterMatrix:{value:new k,type:"mat3x3<f32>"},scale:{value:i,type:"vec2<f32>"},rotation:{value:new Float32Array([0,0,0,0]),type:"vec4<f32>"}}),o=pe.from({vertex:lu,fragment:au,name:"displacement-filter"}),a=fe.from({vertex:{source:pi,entryPoint:"mainVertex"},fragment:{source:pi,entryPoint:"mainFragment"}}),l=n.sprite.texture;super({gpuProgram:a,glProgram:o,resources:{filterUniforms:s,mapTexture:l.source,mapSampler:l.style}}),this._sprite=n.sprite,this._sprite.renderable=!1}apply(e,t,n,i){const s=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(s.filterMatrix,this._sprite);const o=this._sprite.worldTransform,a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.sqrt(o.c*o.c+o.d*o.d);a!==0&&l!==0&&(s.rotation[0]=o.a/a,s.rotation[1]=o.b/a,s.rotation[2]=o.c/l,s.rotation[3]=o.d/l),this.resources.mapTexture=this._sprite.texture.source,e.applyFilter(this,t,n,i)}get scale(){return this.resources.filterUniforms.uniforms.scale}}var uu=`
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
`,gi=`

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
}`,$g=Object.defineProperty,hu=Object.getOwnPropertySymbols,zg=Object.prototype.hasOwnProperty,Ng=Object.prototype.propertyIsEnumerable,cu=(r,e,t)=>e in r?$g(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,du=(r,e)=>{for(var t in e||(e={}))zg.call(e,t)&&cu(r,t,e[t]);if(hu)for(var t of hu(e))Ng.call(e,t)&&cu(r,t,e[t]);return r};const fu=class extends Te{constructor(r={}){var e,t,n;r=du(du({},fu.DEFAULT),r);const i=new fe({vertex:{source:gi,entryPoint:"mainVertex"},fragment:{source:gi,entryPoint:"mainFragment"}}),s=new pe({vertex:di,fragment:uu,name:"noise-filter"});super({gpuProgram:i,glProgram:s,resources:{noiseUniforms:new Q({uNoise:{value:r.noise,type:"f32"},uSeed:{value:(e=r.seed)!=null?e:Math.random(),type:"f32"}})},resolution:1});const o=(t=r.noise)!=null?t:.5,a=(n=r.seed)!=null?n:Math.random();this.noise=o,this.seed=a}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(r){this.resources.noiseUniforms.uniforms.uNoise=r}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(r){this.resources.noiseUniforms.uniforms.uSeed=r}};let pu=fu;pu.DEFAULT={noise:.5,seed:void 0};var gu=`
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
`,mu=`in vec2 aPosition;
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
`,mi=`struct GlobalUniforms {
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
`,Wg=Object.defineProperty,vu=Object.getOwnPropertySymbols,Hg=Object.prototype.hasOwnProperty,Vg=Object.prototype.propertyIsEnumerable,bu=(r,e,t)=>e in r?Wg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,yu=(r,e)=>{for(var t in e||(e={}))Hg.call(e,t)&&bu(r,t,e[t]);if(vu)for(var t of vu(e))Vg.call(e,t)&&bu(r,t,e[t]);return r};const xu=class extends Te{constructor(r={}){r=yu(yu({},xu.DEFAULT),r);const e=new fe({vertex:{source:mi,entryPoint:"mainVertex"},fragment:{source:mi,entryPoint:"mainFragment"}}),t=new pe({vertex:mu,fragment:gu,name:"shockwave-filter"});super({gpuProgram:e,glProgram:t,resources:{shockwaveUniforms:new Q({uTime:{value:0,type:"f32"},uCenter:{value:r.center,type:"vec2<f32>"},uSpeed:{value:r.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}})},resolution:1}),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,r)}apply(r,e,t,n){this.uniforms.uTime=this.time,r.applyFilter(this,e,t,n)}get center(){return this.uniforms.uCenter}set center(r){this.uniforms.uCenter=r}get centerX(){return this.uniforms.uCenter.x}set centerX(r){this.uniforms.uCenter.x=r}get centerY(){return this.uniforms.uCenter.y}set centerY(r){this.uniforms.uCenter.y=r}get speed(){return this.uniforms.uSpeed}set speed(r){this.uniforms.uSpeed=r}get amplitude(){return this.uniforms.uWave[0]}set amplitude(r){this.uniforms.uWave[0]=r}get wavelength(){return this.uniforms.uWave[1]}set wavelength(r){this.uniforms.uWave[1]=r}get brightness(){return this.uniforms.uWave[2]}set brightness(r){this.uniforms.uWave[2]=r}get radius(){return this.uniforms.uWave[3]}set radius(r){this.uniforms.uWave[3]=r}};let _u=xu;_u.DEFAULT={center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1};class So{constructor(e=0,t=0,n=0,i=0,s=0,o=0){this.type="triangle",this.x=e,this.y=t,this.x2=n,this.y2=i,this.x3=s,this.y3=o}contains(e,t){const n=(this.x-this.x3)*(t-this.y3)-(this.y-this.y3)*(e-this.x3),i=(this.x2-this.x)*(t-this.y)-(this.y2-this.y)*(e-this.x);if(n<0!=i<0&&n!==0&&i!==0)return!1;const s=(this.x3-this.x2)*(t-this.y2)-(this.y3-this.y2)*(e-this.x2);return s===0||s<0==n+i<=0}clone(){return new So(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e=e||new q;const t=Math.min(this.x,this.x2,this.x3),n=Math.max(this.x,this.x2,this.x3),i=Math.min(this.y,this.y2,this.y3),s=Math.max(this.y,this.y2,this.y3);return e.x=t,e.y=i,e.width=n-t,e.height=s-i,e}}let jg=0;class ue extends ie{constructor({data:e,size:t,usage:n,label:i}){super(),this.resourceType="buffer",this.resourceId=rt(),this.uid=jg++,this._updateID=1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,t=t!=null?t:e==null?void 0:e.byteLength;const s=!!e;this.descriptor={size:t,usage:n,mappedAtCreation:s,label:i}}get data(){return this._data}set data(e){if(this._data!==e){const t=this._data;this._data=e,t.length!==e.length?(this.descriptor.size=e.byteLength,this.resourceId=rt(),this.emit("change",this)):this.emit("update",this)}}update(e){this._updateSize=e||this.descriptor.size,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}var G=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))(G||{});function vi(r,e){if(!(r instanceof ue)){let t=e?G.INDEX:G.VERTEX;r instanceof Array&&(e?(r=new Uint32Array(r),t=G.INDEX|G.COPY_DST):(r=new Float32Array(r),t=G.VERTEX|G.COPY_DST)),r=new ue({data:r,label:"index-mesh-buffer",usage:t})}return r}let Yg=1;class Kt extends ie{constructor({attributes:e,indexBuffer:t,topology:n}){super(),this.uid=Yg++,this._layoutKey=0,this.attributes=e,this.buffers=[];for(const i in e){const s=e[i];s.buffer=vi(s.buffer,!1),this.buffers.indexOf(s.buffer)===-1&&(this.buffers.push(s.buffer),s.buffer.on("update",this.onBufferUpdate,this))}t&&(this.indexBuffer=vi(t,!0),this.buffers.push(this.indexBuffer)),this.topology=n||"triangle-list"}onBufferUpdate(){this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const t=this.attributes[e];return this.getBuffer(e).data.length/(t.stride/4||t.size)}return 0}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(t=>t.destroy()),this.attributes=null,this.buffers=null}}var Xg=Object.defineProperty,wu=Object.getOwnPropertySymbols,qg=Object.prototype.hasOwnProperty,Kg=Object.prototype.propertyIsEnumerable,Tu=(r,e,t)=>e in r?Xg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Su=(r,e)=>{for(var t in e||(e={}))qg.call(e,t)&&Tu(r,t,e[t]);if(wu)for(var t of wu(e))Kg.call(e,t)&&Tu(r,t,e[t]);return r};const Pu=class extends Kt{constructor(...r){var e;let t=(e=r[0])!=null?e:{};t instanceof Float32Array&&(z(N,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:r[1],indices:r[2]}),t=Su(Su({},Pu.defaultOptions),t);const n=t.positions||new Float32Array([0,0,1,0,1,1,0,1]),i=t.uvs||new Float32Array([0,0,1,0,1,1,0,1]),s=t.indices||new Uint32Array([0,1,2,0,2,3]),o=new ue({data:n,label:"attribute-mesh-positions",usage:G.VERTEX|G.COPY_DST}),a=new ue({data:i,label:"attribute-mesh-uvs",usage:G.VERTEX|G.COPY_DST}),l=new ue({data:s,label:"index-mesh-buffer",usage:G.INDEX|G.COPY_DST});super({attributes:{aPosition:{buffer:o,shaderLocation:0,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:a,shaderLocation:1,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(r){this.attributes.aPosition.buffer.data=r}get uvs(){return this.attributes.aUV.buffer.data}set uvs(r){this.attributes.aUV.buffer.data=r}get indices(){return this.indexBuffer.data}set indices(r){this.indexBuffer.data=r}};let yt=Pu;yt.defaultOptions={topology:"triangle-list"};var Zg=Object.defineProperty,Eu=Object.getOwnPropertySymbols,Qg=Object.prototype.hasOwnProperty,Jg=Object.prototype.propertyIsEnumerable,Au=(r,e,t)=>e in r?Zg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Mu=(r,e)=>{for(var t in e||(e={}))Qg.call(e,t)&&Au(r,t,e[t]);if(Eu)for(var t of Eu(e))Jg.call(e,t)&&Au(r,t,e[t]);return r};const Cu=class extends yt{constructor(...r){var e;super({});let t=(e=r[0])!=null?e:{};typeof t=="number"&&(z(N,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:r[1],verticesX:r[2],verticesY:r[3]}),this.build(t)}build(r){var e,t,n,i;r=Mu(Mu({},Cu.defaultOptions),r),this.verticesX=(e=this.verticesX)!=null?e:r.verticesX,this.verticesY=(t=this.verticesY)!=null?t:r.verticesY,this.width=(n=this.width)!=null?n:r.width,this.height=(i=this.height)!=null?i:r.height;const s=this.verticesX*this.verticesY,o=[],a=[],l=[],u=this.verticesX-1,h=this.verticesY-1,c=this.width/u,d=this.height/h;for(let p=0;p<s;p++){const m=p%this.verticesX,g=p/this.verticesX|0;o.push(m*c,g*d),a.push(m/u,g/h)}const f=u*h;for(let p=0;p<f;p++){const m=p%u,g=p/u|0,y=g*this.verticesX+m,v=g*this.verticesX+m+1,b=(g+1)*this.verticesX+m,_=(g+1)*this.verticesX+m+1;l.push(y,v,b,v,_,b)}this.buffers[0].data=new Float32Array(o),this.buffers[1].data=new Float32Array(a),this.indexBuffer.data=new Uint32Array(l),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};let bi=Cu;bi.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};var em=Object.defineProperty,Bu=Object.getOwnPropertySymbols,tm=Object.prototype.hasOwnProperty,rm=Object.prototype.propertyIsEnumerable,Ru=(r,e,t)=>e in r?em(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ku=(r,e)=>{for(var t in e||(e={}))tm.call(e,t)&&Ru(r,t,e[t]);if(Bu)for(var t of Bu(e))rm.call(e,t)&&Ru(r,t,e[t]);return r};const Ou=class extends bi{constructor(r){r=ku(ku({},Ou.defaultOptions),r),super({width:r.width,height:r.height,verticesX:4,verticesY:4}),this._textureMatrix=new k,this.update(r)}update(r){this.updateUvs(r),this.updatePositions(r)}updatePositions(r){var e,t,n,i,s,o;this.width=(e=r.width)!=null?e:this.width,this.height=(t=r.height)!=null?t:this.height,this._leftWidth=(n=r.leftWidth)!=null?n:this._leftWidth,this._rightWidth=(i=r.rightWidth)!=null?i:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight;const a=this.positions,l=this._leftWidth+this._rightWidth,u=this.width>l?1:this.width/l,h=this._topHeight+this._bottomHeight,c=this.height>h?1:this.height/h,d=Math.min(u,c);a[9]=a[11]=a[13]=a[15]=this._topHeight*d,a[17]=a[19]=a[21]=a[23]=this.height-this._bottomHeight*d,a[25]=a[27]=a[29]=a[31]=this.height,a[2]=a[10]=a[18]=a[26]=this._leftWidth*d,a[4]=a[12]=a[20]=a[28]=this.width-this._rightWidth*d,a[6]=a[14]=a[22]=a[30]=this.width,this.getBuffer("aPosition").update()}updateUvs(r){var e,t,n,i,s,o;this._originalWidth=(e=r.originalWidth)!=null?e:this._originalWidth,this._originalHeight=(t=r.originalHeight)!=null?t:this._originalHeight,this._leftWidth=(n=r.leftWidth)!=null?n:this._leftWidth,this._rightWidth=(i=r.rightWidth)!=null?i:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight,r.textureMatrix&&this._textureMatrix.copyFrom(r.textureMatrix);const a=this._textureMatrix,l=this.uvs;l[0]=l[8]=l[16]=l[24]=0,l[1]=l[3]=l[5]=l[7]=0,l[6]=l[14]=l[22]=l[30]=1,l[25]=l[27]=l[29]=l[31]=1;const u=1/this._originalWidth,h=1/this._originalHeight;l[2]=l[10]=l[18]=l[26]=u*this._leftWidth,l[9]=l[11]=l[13]=l[15]=h*this._topHeight,l[4]=l[12]=l[20]=l[28]=1-u*this._rightWidth,l[17]=l[19]=l[21]=l[23]=1-h*this._bottomHeight,nm(a,l),this.getBuffer("aUV").update()}};let yi=Ou;yi.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};function nm(r,e,t){t!=null||(t=e);const n=r.a,i=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty;for(let u=0;u<e.length;u+=2){const h=e[u],c=e[u+1];t[u]=h*n+c*s+a,t[u+1]=h*i+c*o+l}return t}let im=0;const Uu=new lt;class Zt{constructor(e){this.uid=im++,this.type="mesh",this.canBundle=!0,this.owner=mt;var t,n,i;this.shader=e.shader,this.texture=(i=(n=e.texture)!=null?n:(t=this.shader)==null?void 0:t.texture)!=null?i:C.WHITE,this._geometry=e.geometry,this._geometry.on("update",this.onUpdate,this)}set shader(e){this._shader!==e&&(this._shader=e,this.onUpdate())}get shader(){return this._shader}set geometry(e){var t;this._geometry!==e&&((t=this._geometry)==null||t.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._geometry=e,this.onUpdate())}get geometry(){return this._geometry}set texture(e){this._texture!==e&&(this.shader&&(this.shader.texture=e),this._texture=e,this.onUpdate())}get texture(){return this._texture}get batched(){return this._shader?!1:this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch"}addBounds(e){e.addVertexData(this.geometry.positions,0,this.geometry.positions.length)}containsPoint(e){const{x:t,y:n}=e,i=this.geometry.getBuffer("aPosition").data,s=Uu.points,o=this.geometry.getIndex().data,a=o.length,l=this.geometry.topology==="triangle-strip"?3:1;for(let u=0;u+2<a;u+=l){const h=o[u]*2,c=o[u+1]*2,d=o[u+2]*2;if(s[0]=i[h],s[1]=i[h+1],s[2]=i[c],s[3]=i[c+1],s[4]=i[d],s[5]=i[d+1],Uu.contains(t,n))return!0}return!1}onUpdate(){this.owner.onViewUpdate()}destroy(e=!1){if(typeof e=="boolean"?e:e!=null&&e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._geometry=null,this._shader=null}}var sm=Object.defineProperty,Fu=Object.getOwnPropertySymbols,om=Object.prototype.hasOwnProperty,am=Object.prototype.propertyIsEnumerable,Iu=(r,e,t)=>e in r?sm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,xi=(r,e)=>{for(var t in e||(e={}))om.call(e,t)&&Iu(r,t,e[t]);if(Fu)for(var t of Fu(e))am.call(e,t)&&Iu(r,t,e[t]);return r};const Gu=class extends J{constructor(r){r instanceof C&&(r={texture:r}),r=xi(xi({},Gu.defaultOptions),r);const e=r.texture,t=new yi({width:e.width,height:e.height,originalWidth:e.width,originalHeight:e.height,leftWidth:r.leftWidth,topHeight:r.topHeight,rightWidth:r.rightWidth,bottomHeight:r.bottomHeight,textureMatrix:e.textureMatrix.mapCoord});super(xi({view:new Zt({geometry:t,texture:e}),label:"NineSliceSprite"},r))}get width(){return this.view.geometry.width}set width(r){this.view.geometry.updatePositions({width:r})}get height(){return this.view.geometry.height}set height(r){this.view.geometry.updatePositions({height:r})}get leftWidth(){return this.view.geometry._leftWidth}set leftWidth(r){this.view.geometry.updateUvs({leftWidth:r})}get topHeight(){return this.view.geometry._topHeight}set topHeight(r){this.view.geometry.updateUvs({topHeight:r})}get rightWidth(){return this.view.geometry._rightWidth}set rightWidth(r){this.view.geometry.updateUvs({rightWidth:r})}get bottomHeight(){return this.view.geometry._bottomHeight}set bottomHeight(r){this.view.geometry.updateUvs({bottomHeight:r})}get texture(){return this.view.texture}set texture(r){r!==this.view.texture&&(this.view.geometry.updateUvs({originalWidth:r.width,originalHeight:r.height,textureMatrix:r.textureMatrix.mapCoord}),this.view.texture=r)}};let _i=Gu;_i.defaultOptions={texture:C.EMPTY,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10};class lm extends _i{constructor(...e){let t=e[0];t instanceof C&&(z(N,"NineSlicePlane now uses the options object {texture, leftWidth, rightWidth, topHeight, bottomHeight}"),t={texture:t,leftWidth:e[1],topHeight:e[2],rightWidth:e[3],bottomHeight:e[4]}),z(N,"NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(t)}}function kr({vertexSrc:r,fragmentSrc:e,maxTextures:t,name:n}){if(e.indexOf("%count%")<0)throw new Error('Fragment template must contain "%count%".');if(e.indexOf("%forloop%")<0)throw new Error('Fragment template must contain "%forloop%".');const i=um(t);return e=e.replace(/%count%/gi,`${t}`),e=e.replace(/%forloop%/gi,i),n=n?`${n}-`:"",new pe({vertex:r,fragment:e,name:`${n}batch`})}function um(r){const e=[];for(let t=0;t<r;t++)t>0&&e.push("else"),t<r-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uSamplers[${t}], vTextureCoord);`),e.push("}");return e.join(`
`)}var Lu=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,Du=`precision highp float;
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
`;function $u(r){return kr({vertexSrc:Du,fragmentSrc:Lu,maxTextures:r,name:"default"})}const xe=16,zu=new Int32Array(xe);for(let r=0;r<xe;r++)zu[r]=r;const Or=new Q({uSamplers:{value:zu,type:"u32",size:xe}},{isStatic:!0});class wi{constructor(){this._didUpload=!1}init(){const e=new Q({tint:{value:new Float32Array([1,1,1,1]),type:"f32"},translationMatrix:{value:new k,type:"mat3x3<f32>"}});this._shader=new Se({glProgram:$u(xe),resources:{uniforms:e,batchSamplers:Or}})}execute(e,t){const n=e.renderer;e.state.blendMode=t.blendMode,n.state.set(e.state),n.shader.bind(this._shader,this._didUpload),this._didUpload=!0;const i=t.batchParent;n.geometry.bind(i.geometry,this._shader.glProgram);for(let s=0;s<t.textures.textures.length;s++)n.texture.bind(t.textures.textures[s],s);n.shader.bindUniformBlock(n.globalUniforms.uniformGroup,"globalUniforms",0),n.geometry.draw("triangle-list",t.size,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}wi.extension={type:[x.WebGLPipesAdaptor],name:"batch"};const Nu=new Float32Array(1),Wu=new Uint32Array(1);class Hu extends Kt{constructor(){const e=new ue({data:Nu,label:"attribute-batch-buffer",usage:G.VERTEX|G.COPY_DST}),t=new ue({data:Wu,label:"index-batch-buffer",usage:G.INDEX|G.COPY_DST}),n=6*4;super({attributes:{aPosition:{buffer:e,shaderLocation:0,format:"float32x2",stride:n,offset:0},aUV:{buffer:e,shaderLocation:1,format:"float32x2",stride:n,offset:2*4},aColor:{buffer:e,shaderLocation:2,format:"unorm8x4",stride:n,offset:4*4},aTextureId:{buffer:e,shaderLocation:3,format:"float32",stride:n,offset:5*4}},indexBuffer:t})}reset(){this.indexBuffer.data=Wu,this.buffers[0].data=Nu}}function Ur({vertex:r,fragment:e,maxTextures:t}){if(e.source.indexOf("%bindings%")<0)throw new Error('Fragment template must contain "%bindings%".');if(e.source.indexOf("%forloop%")<0)throw new Error('Fragment template must contain "%forloop%".');const n=ju(t),i=Vu(t);let s=e.source;s=s.replace(/%bindings%/gi,n),s=s.replace(/%forloop%/gi,i);let o=r.source;return o===e.source&&(o=s),new fe({vertex:{source:o,entryPoint:r.entryPoint},fragment:{source:s,entryPoint:e.entryPoint}})}function hm(r){const e={};let t=0;for(let n=0;n<r;n++)e[`textureSource${n+1}`]=t++,e[`textureSampler${n+1}`]=t++;return e}function cm(r){const e=[];let t=0;for(let n=0;n<r;n++)e[t]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:t,visibility:GPUShaderStage.FRAGMENT},t++,e[t]={sampler:{type:"filtering"},binding:t,visibility:GPUShaderStage.FRAGMENT},t++;return e}function Vu(r){const e=[];if(r===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, uv, uvDx, uvDy);");else{e.push("switch textureId {");for(let t=0;t<r;t++)t===r-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, uv, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function ju(r){const e=[];if(r===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let n=0;n<r;n++)e.push(`@group(1) @binding(${t++}) var textureSource${n+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${n+1}: sampler;`)}return e.join(`
`)}var Ti=`struct GlobalUniforms {
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
`;function Yu(r){return Ur({vertex:{source:Ti,entryPoint:"mainVertex"},fragment:{source:Ti,entryPoint:"mainFragment"},maxTextures:r})}const dm=new Float32Array(1),fm=new Uint32Array(1);function Xu(){const r=new ue({data:dm,label:"attribute-batch-buffer",usage:G.VERTEX|G.COPY_DST}),e=new ue({data:fm,label:"index-batch-buffer",usage:G.INDEX|G.COPY_DST}),t=6*4;return new Kt({attributes:{aPosition:{buffer:r,shaderLocation:0,format:"float32x2",stride:t,offset:0},aUV:{buffer:r,shaderLocation:1,format:"float32x2",stride:t,offset:2*4},aColor:{buffer:r,shaderLocation:2,format:"unorm8x4",stride:t,offset:4*4},aTextureId:{buffer:r,shaderLocation:3,format:"float32",stride:t,offset:5*4}},indexBuffer:e})}const qu={};function Si(r){const e=r.map(t=>t.styleSourceKey).join("-");return qu[e]||pm(r,e)}function pm(r,e){const t={};let n=0;for(let s=0;s<xe;s++){const o=s<r.length?r[s]:C.EMPTY.source;t[n++]=o.source,t[n++]=o.style}const i=new we(t);return qu[e]=i,i}class Pi{init(){this._shader=new Se({gpuProgram:Yu(xe),groups:{}})}execute(e,t){e.state.blendMode=t.blendMode,t.textures.bindGroup||(t.textures.bindGroup=Si(t.textures.textures));const n=this._shader.gpuProgram,i=e.renderer.encoder,s=e.renderer.globalUniforms.bindGroup;this._shader.groups[1]=t.textures.bindGroup;const o=t.batchParent;i.setPipelineFromGeometryProgramAndState(o.geometry,n,e.state),i.setGeometry(o.geometry),i.setBindGroup(0,s,n),i.setBindGroup(1,t.textures.bindGroup,n),i.renderPassEncoder.drawIndexed(t.size,1,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}Pi.extension={type:[x.WebGPUPipesAdaptor],name:"batch"};class Ei{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function Fr(r,e){const t=r.byteLength/8|0,n=new Float64Array(r,0,t),i=new Float64Array(e,0,t);for(let a=0;a<t;a++)i[a]=n[a];const s=new Uint8Array(r,t*8),o=new Uint8Array(e,t*8);for(let a=0;a<s.length;a++)o[a]=s[a]}const Ai=[];let Ir=0;const Ku=[];let Gr=0;const Lr=Object.create(null);function Zu(r,e,t,n){Ir=0,Gr=0;const i=16,s=r.textures,o=e.textures,a=Ku;for(let u=0;u<o.length;u++)a[u]=o[u],Gr++;for(let u=0;u<s.length;u++)o[u]=s[u];const l=e.batchLocations;for(let u=0;u<Gr;u++){const h=a[u];let c=!1;for(let d=0;d<s.length;d++)if(h===s[d]){c=!0,Lr[u]=t,l[h.styleSourceKey]=d;break}c||(Ai[Ir++]=a[u])}for(let u=0;u<Ir;u++){const h=Ai[u];for(let c=0;c<i;c++){const d=(c+n)%16;if(Lr[d]!==t){o[d]=h,Lr[d]=t,l[h.styleSourceKey]=d;break}}}return e}const gm=[];let Mi=0;class Qu{constructor(){this.textures=[],this.size=0,this.batchLocations=Object.create(null)}}class Ju{constructor(){this._textureTicks=Object.create(null),this._tick=1e3}begin(){Mi=0,this._bindingOffset=0,this.reset()}reset(){this._tick++,this._output=gm[Mi++]||new Qu,this._output.size=0}finish(e){let t=this._output;return e&&e.textures.length&&t.textures.length&&(t=Zu(e,t,this._tick,this._bindingOffset++)),this.reset(),t}add(e){const t=this._tick,n=this._textureTicks;if(n[e.styleSourceKey]===t)return!0;const i=e.styleSourceKey,s=this._output;return s.size===xe?!1:(s.textures[s.size]=e,n[i]=t,s.batchLocations[i]=s.size++,Mi=0,!0)}destroy(){this._output=null,this._textureTicks=null}}class Ci{constructor(){this.type="batch",this.action="renderer",this.elementStart=0,this.elementSize=0,this.start=0,this.size=0,this.canBundle=!0}destroy(){this.textures=null,this.batchParent=null}}class Bi{constructor(e=4,t=6){this._maxSize=4096*20,this.dirty=!0,this.batchIndex=0,this.batches=[],this._vertexSize=6,this._textureBatcher=new Ju,this._elements=[],this.attributeBuffer=new Ei(e*this._vertexSize*4),this.indexBuffer=new Uint32Array(t)}begin(){this.batchIndex=0,this._currentBlendMode="inherit";let e=this.batches[this.batchIndex];e||(e=this.batches[this.batchIndex]=new Ci),e.elementSize=0,e.start=0,e.size=0,this.attributeSize=0,this.indexSize=0,this.elementSize=0,this._textureBatcher.begin(),this.dirty=!0}add(e){let t=this.batches[this.batchIndex];const n=e.texture,i=e.blendMode;(this._currentBlendMode!==i||t.elementSize>=this._maxSize||!this._textureBatcher.add(n))&&(this.break(!1),this._currentBlendMode=i,t=this.batches[this.batchIndex],t.blendMode=i,this._textureBatcher.add(n)),t.elementSize++,e.batcher=this,e.batch=t,e.location=this.attributeSize,e.indexStart=this.indexSize,this.indexSize+=e.indexSize,this.attributeSize+=e.vertexSize*this._vertexSize,this._elements[this.elementSize++]=e}checkAndUpdateTexture(e,t){const n=e.batch.textures.batchLocations[t.styleSourceKey];return n===void 0?!1:(e.textureId=n,e.texture=t,!0)}updateElement(e){this.dirty=!0,e.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,e.location,e.textureId)}hideElement(e){this.dirty=!0;const t=this.attributeBuffer.float32View;let n=e.location;for(let i=0;i<e.vertexSize;i++)t[n]=0,t[n+1]=0,n+=6}break(e){if(this.elementSize===0)return;let t;this.batchIndex>0&&(t=this.batches[this.batchIndex-1]),this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const n=this.batches[this.batchIndex];n.size=this.indexSize-n.start,!e&&t?n.textures=this._textureBatcher.finish(t.textures):n.textures=this._textureBatcher.finish();const i=this.elementSize-n.elementStart;for(let o=0;o<i;o++){const a=this._elements[n.elementStart+o];a.textureId=n.textures.batchLocations[a.texture.styleSourceKey],a.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,a.location,a.textureId),a.packIndex(this.indexBuffer,a.indexStart,a.location/this._vertexSize)}this.batchIndex++;let s=this.batches[this.batchIndex];s||(s=this.batches[this.batchIndex]=new Ci),s.blendMode=this._currentBlendMode,s.elementStart=this.elementSize,s.elementSize=0,s.start=this.indexSize}finish(){if(this.break(!1),this.elementSize===0)return;const e=this.batches[this.batchIndex];if(e.size=this.indexSize-e.start,this.batchIndex>0){const t=this.batches[this.batchIndex-1];e.textures=this._textureBatcher.finish(t.textures);return}e.textures=this._textureBatcher.finish()}ensureAttributeBuffer(e){e*4<this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const t=Math.max(e,this.attributeBuffer.size*2),n=new Ei(t);Fr(this.attributeBuffer.rawBinaryData,n.rawBinaryData),this.attributeBuffer=n}_resizeIndexBuffer(e){const t=this.indexBuffer,n=Math.max(e,t.length*2),i=new Uint32Array(n);Fr(t.buffer,i.buffer),this.indexBuffer=i}destroy(){for(let e=0;e<this.batches.length;e++)this.batches[e].destroy();this.batches=null;for(let e=0;e<this._elements.length;e++)this._elements[e].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null,this._textureBatcher.destroy()}}class Ri{constructor(e,t){this.state=Ee.for2d(),this._batches=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}buildStart(e){this._lastBatch=0,this._batches[e.uid]||(this._batches[e.uid]={batcher:new Bi,geometry:Xu()}),this._batches[e.uid].batcher.begin()}addToBatch(e,t){this._batches[t.uid].batcher.add(e)}break(e){const t=this._batches[e.uid].batcher,n=e.instructionSize>0&&e.lastInstruction().type!=="batch";for(t.break(n);this._lastBatch<t.batchIndex;){const i=t.batches[this._lastBatch++];i.elementSize!==0&&(i.batchParent=this._batches[e.uid],e.instructions[e.instructionSize++]=i)}}buildEnd(e){this.break(e);const{geometry:t,batcher:n}=this._batches[e.uid];n.elementSize!==0&&(n.finish(),t.indexBuffer.data=n.indexBuffer,t.buffers[0].data=n.attributeBuffer.float32View,t.indexBuffer.update(n.indexSize*4))}upload(e){const t=this._batches[e.uid];if(t&&t.batcher.dirty){t.batcher.dirty=!1;const n=t.geometry.buffers[0];n.update(t.batcher.attributeSize*4),this.renderer.buffer.updateBuffer(n)}}execute(e){this._adaptor.execute(this,e)}destroy(){this.state=null,this._batches=null,this.renderer=null,this._adaptor.destroy(),this._adaptor=null;for(const e in this._batches){const t=this._batches[e];t.batcher.destroy(),t.geometry.destroy()}}}Ri.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"batch"};var eh=`
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
`,th=`in vec2 aPosition;
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
`,rh=`struct GlobalUniforms {
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
}`,mm=Object.defineProperty,nh=Object.getOwnPropertySymbols,vm=Object.prototype.hasOwnProperty,bm=Object.prototype.propertyIsEnumerable,ih=(r,e,t)=>e in r?mm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,sh=(r,e)=>{for(var t in e||(e={}))vm.call(e,t)&&ih(r,t,e[t]);if(nh)for(var t of nh(e))bm.call(e,t)&&ih(r,t,e[t]);return r};class K extends Te{constructor(e){const t=e.gpu,n=oh(sh({source:rh},t)),i=new fe({vertex:{source:n,entryPoint:"mainVertex"},fragment:{source:n,entryPoint:"mainFragment"}}),s=e.gl,o=oh(sh({source:eh},s)),a=new pe({vertex:th,fragment:o}),l=new Q({uBlend:{value:1,type:"f32"}});super({gpuProgram:i,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,backTexture:C.EMPTY}})}}function oh(r){const{source:e,functions:t,main:n}=r;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",n)}const Dr=`
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
    `,$r=`
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
	`;var ah=`in vec2 vMaskCoord;
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
`,lh=`in vec2 aPosition;

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
`,ki=`struct GlobalFilterUniforms {
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
  
}`;class uh extends Te{constructor({sprite:e}){const t=new Sn(e.texture),n=new Q({filterMatrix:{value:new k,type:"mat3x3<f32>"},maskClamp:{value:t.uClampFrame,type:"vec4<f32>"},alpha:{value:1,type:"f32"}}),i=new fe({vertex:{source:ki,entryPoint:"mainVertex"},fragment:{source:ki,entryPoint:"mainFragment"}}),s=pe.from({vertex:lh,fragment:ah,name:"mask-filter"});super({gpuProgram:i,glProgram:s,resources:{filterUniforms:n,mapTexture:e.texture.source}}),this.sprite=e,this._textureMatrix=t}apply(e,t,n,i){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.filterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,t,n,i)}}class Oi{constructor(e){this._renderer=e}push(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({type:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({type:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Oi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"filter"};function hh(r,e){e.clear();const t=e.matrix;for(let n=0;n<r.length;n++){const i=r[n];i.layerVisibleRenderable<3||(e.matrix=i.worldTransform,i.view.addBounds(e))}return e.matrix=t,e}const ym=new Kt({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),shaderLocation:0,format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Ui{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new Q({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"},outputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new we({}),this.renderer=e}push(e){const t=this.renderer,n=e.filterEffect.filters;this._filterStack[this._filterStackIndex]||(this._filterStack[this._filterStackIndex]=this._getFilterData());const i=this._filterStack[this._filterStackIndex];this._filterStackIndex++;const s=i.bounds;if(e.renderables?hh(e.renderables,s):Ft(e.container,!0,s),n.length===0){i.skip=!0;return}let o=t.renderTarget.rootRenderTarget.colorTexture.source._resolution,a=0,l=t.renderTarget.rootRenderTarget.colorTexture.source.antialias,u=!1,h=!1;for(let c=0;c<n.length;c++){const d=n[c];if(o=Math.min(o,d.resolution),a+=d.padding,d.antialias!=="inherit"&&(d.antialias==="on"?l=!0:l=!1),!(d.compatibleRenderers&t.type)){h=!1;break}h=d.enabled||h,u=u||d.blendRequired}if(!h){i.skip=!0;return}if(s.scale(o).fit(t.renderTarget.rootRenderTarget.viewport).scale(1/o).pad(a).ceil(),!s.isPositive){i.skip=!0;return}i.skip=!1,i.bounds=s,i.blendRequired=u,i.container=e.container,i.filterEffect=e.filterEffect,i.previousRenderSurface=t.renderTarget.renderTarget,i.inputTexture=oe.getOptimalTexture(s.width,s.height,o,l),t.renderTarget.bind(i.inputTexture,!0),t.globalUniforms.push({offset:s})}pop(){const e=this.renderer;this._filterStackIndex--;const t=this._filterStack[this._filterStackIndex];if(t.skip)return;this._activeFilterData=t;const n=t.inputTexture,i=t.bounds;let s=C.EMPTY;if(t.blendRequired){e.encoder.finishRenderPass();const a=this._filterStackIndex>0?this._filterStack[this._filterStackIndex-1].bounds:null;s=this.getBackTexture(t.previousRenderSurface,i,a)}t.backTexture=s;const o=t.filterEffect.filters;if(this._globalFilterBindGroup.setResource(n.style,2),this._globalFilterBindGroup.setResource(s.source,3),e.globalUniforms.pop(),o.length===1)o[0].apply(this,n,t.previousRenderSurface,!1),oe.returnTexture(n);else{let a=t.inputTexture,l=oe.getOptimalTexture(i.width,i.height,a.source._resolution,!1),u=0;for(u=0;u<o.length-1;++u){o[u].apply(this,a,l,!0);const h=a;a=l,l=h}o[u].apply(this,a,t.previousRenderSurface,!1),oe.returnTexture(a),oe.returnTexture(l)}t.blendRequired&&oe.returnTexture(s)}getBackTexture(e,t,n){const i=e.colorTexture.source._resolution,s=oe.getOptimalTexture(t.width,t.height,i,!1);let o=t.minX,a=t.minY;n&&(o-=n.minX,a-=n.minY),o=Math.floor(o*i),a=Math.floor(a*i);const l=Math.ceil(t.width*i),u=Math.ceil(t.height*i);return this.renderer.renderTarget.copyToTexture(e,s,{x:o,y:a},{width:l,height:u}),s}applyFilter(e,t,n,i){const s=this.renderer,o=this._filterStack[this._filterStackIndex],a=o.bounds,l=W.shared,u=o.previousRenderSurface===this.renderer.renderTarget.getRenderTarget(n);let h=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;this._filterStackIndex>0&&(h=this._filterStack[this._filterStackIndex-1].inputTexture.source._resolution);const c=this._filterGlobalUniforms,d=c.uniforms,f=d.outputFrame,p=d.inputSize,m=d.inputPixel,g=d.inputClamp,y=d.globalFrame,v=d.outputTexture;u?(this._filterStackIndex>0&&(l.x=this._filterStack[this._filterStackIndex-1].bounds.minX,l.y=this._filterStack[this._filterStackIndex-1].bounds.minY),f[0]=a.minX-l.x,f[1]=a.minY-l.y):(f[0]=0,f[1]=0),f[2]=t.frameWidth,f[3]=t.frameHeight,p[0]=t.source.width,p[1]=t.source.height,p[2]=1/p[0],p[3]=1/p[1],m[0]=t.source.pixelWidth,m[1]=t.source.pixelHeight,m[2]=1/m[0],m[3]=1/m[1],g[0]=.5*m[2],g[1]=.5*m[3],g[2]=t.frameWidth*p[2]-.5*m[2],g[3]=t.frameHeight*p[3]-.5*m[3];const b=this.renderer.renderTarget.rootRenderTarget.colorTexture;y[0]=l.x*h,y[1]=l.y*h,y[2]=b.source.width*h,y[3]=b.source.height*h;const _=this.renderer.renderTarget.getRenderTarget(n);if(v[0]=_.colorTexture.frameWidth,v[1]=_.colorTexture.frameHeight,v[2]=_.isRoot?-1:1,c.update(),s.renderPipes.uniformBatch){const S=s.renderPipes.uniformBatch.getUniformBufferResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(S,0)}else this._globalFilterBindGroup.setResource(c,0);this._globalFilterBindGroup.setResource(t.source,1),s.renderTarget.bind(n,!!i),e.groups[0]=this._globalFilterBindGroup,s.encoder.draw({geometry:ym,shader:e,state:e._state,topology:"triangle-list"})}_getFilterData(){return{skip:!1,inputTexture:null,bounds:new ve,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,t){const n=this._activeFilterData,i=e.set(n.inputTexture._source.width,0,0,n.inputTexture._source.height,n.bounds.minX,n.bounds.minY),s=t.worldTransform.copyTo(k.shared);return s.invert(),i.prepend(s),i.scale(1/t.texture.frameWidth,1/t.texture.frameHeight),i.translate(t.anchor.x,t.anchor.y),i}destroy(){}}Ui.extension={type:[x.WebGLSystem,x.WebGPUSystem],name:"filter"};var ch=`in vec2 vTextureCoord;
in vec4 vColor;
in float vTextureId;
uniform sampler2D uSamplers[%count%];

out vec4 finalColor;

void main(void){
    vec4 outColor;
    %forloop%
    finalColor = outColor * vColor;
}
`,dh=`precision highp float;
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
`;function fh(r){return kr({vertexSrc:dh,fragmentSrc:ch,maxTextures:r,name:"graphics"})}function xm(r,e,t,n){t[n++]=(r>>16&255)/255,t[n++]=(r>>8&255)/255,t[n++]=(r&255)/255,t[n++]=e}function Qt(r,e,t){e[t++]=(r&255)/255,e[t++]=(r>>8&255)/255,e[t++]=(r>>16&255)/255,e[t++]=(r>>24&255)/255}class Fi{init(){const e=new Q({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new k,type:"mat3x3<f32>"}});this._shader=new Se({glProgram:fh(xe),resources:{localUniforms:e,batchSamplers:Or}})}execute(e,t){const n=t.view.context,i=n.customShader||this._shader,s=e.renderer,o=s.graphicsContext;if(!o.updateGpuContext(n).batches.length)return;const{geometry:a,batches:l}=o.getContextRenderData(n),u=e.state;u.blendMode=t.layerBlendMode,s.state.set(e.state);const h=i.resources.localUniforms.uniforms;h.transformMatrix=t.layerTransform,Qt(t.layerColor,h.color,0),s.shader.bind(i),s.shader.bindUniformBlock(s.globalUniforms.uniformGroup,"globalUniforms"),s.geometry.bind(a,i.glProgram);for(let c=0;c<l.length;c++){const d=l[c];if(d.size){for(let f=0;f<d.textures.textures.length;f++)s.texture.bind(d.textures.textures[f],f);s.geometry.draw("triangle-list",d.size,d.start)}}}destroy(){this._shader.destroy(!0),this._shader=null}}Fi.extension={type:[x.WebGLPipesAdaptor],name:"graphics"};var Ii=`struct GlobalUniforms {
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
`;function ph(r){return Ur({vertex:{source:Ii,entryPoint:"mainVertex"},fragment:{source:Ii,entryPoint:"mainFragment"},maxTextures:r})}class Gi{init(){const e=new Q({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new k,type:"mat3x3<f32>"}});this._shader=new Se({gpuProgram:ph(xe),groups:{2:new we({0:e})}})}execute(e,t){const n=t.view.context,i=n.customShader||this._shader,s=e.renderer,o=s.graphicsContext;if(!o.getGpuContext(n).batches.length)return;const{geometry:a,batches:l}=o.getContextRenderData(n);e.state.blendMode=t.layerBlendMode;const u=i.resources.localUniforms;i.resources.localUniforms.uniforms.transformMatrix=t.layerTransform,Qt(t.layerColor,u.uniforms.color,0);const h=s.encoder;h.setPipelineFromGeometryProgramAndState(a,i.gpuProgram,e.state),h.setGeometry(a);const c=s.globalUniforms.bindGroup;h.setBindGroup(0,c,i.gpuProgram);const d=s.renderPipes.uniformBatch.getUniformBindGroup(u,!0);h.setBindGroup(2,d,i.gpuProgram);for(let f=0;f<l.length;f++){const p=l[f];i.groups[1]=p.textures.bindGroup,h.setBindGroup(1,p.textures.bindGroup,i.gpuProgram),h.renderPassEncoder.drawIndexed(p.size,1,p.start)}}destroy(){this._shader.destroy(!0),this._shader=null}}Gi.extension={type:[x.WebGPUPipesAdaptor],name:"graphics"};function Li(r,e,t){const n=r>>16&255,i=r>>8&255,s=r&255,o=e>>16&255,a=e>>8&255,l=e&255,u=n+(o-n)*t,h=i+(a-i)*t,c=s+(l-s)*t;return(u<<16)+(h<<8)+c}const gh=16777215+16777215;function zr(r,e){const t=(r>>24&255)/255,n=(e>>24&255)/255,i=t*n*255,s=r&16777215,o=e&16777215;let a=16777215;return s+(o<<32)!==gh&&(s===16777215?a=o:o===16777215?a=s:a=Li(s,o,.5)),a+(i<<24)}function _m(r,e,t){const n=(t>>24&255)/255,i=e*n*255,s=((r&255)<<16)+(r&65280)+(r>>16&255),o=t&16777215;let a=16777215;return s+(o<<32)!==gh&&(s===16777215?a=o:o===16777215?a=s:a=Li(s,o,.5)),a+(i<<24)}class Nr{constructor(){this.batcher=null,this.batch=null,this.applyTransform=!0}get blendMode(){return this.applyTransform?this.renderable.layerBlendMode:"normal"}packIndex(e,t,n){const i=this.geometryData.indices;for(let s=0;s<this.indexSize;s++)e[t++]=i[s+this.indexOffset]+n-this.vertexOffset}packAttributes(e,t,n,i){const s=this.geometryData,o=s.vertices,a=s.uvs,l=this.vertexOffset*2,u=(this.vertexOffset+this.vertexSize)*2,h=this.color,c=h>>16|h&65280|(h&255)<<16;if(this.applyTransform){const d=this.renderable,f=zr(c+(this.alpha*255<<24),d.layerColor),p=d.layerTransform,m=p.a,g=p.b,y=p.c,v=p.d,b=p.tx,_=p.ty;for(let S=l;S<u;S+=2){const M=o[S],B=o[S+1];e[n++]=m*M+y*B+b,e[n++]=g*M+v*B+_,e[n++]=a[S],e[n++]=a[S+1],t[n++]=f,e[n++]=i}}else{const d=c+(this.alpha*255<<24);for(let f=l;f<u;f+=2)e[n++]=o[f],e[n++]=o[f+1],e[n++]=a[f],e[n++]=a[f+1],t[n++]=d,e[n++]=i}}get vertSize(){return this.vertexSize}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.vertexOffset=this.vertexOffset,e.vertexSize=this.vertexSize,e.color=this.color,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}}const it={build(r,e){let t,n,i,s,o,a;if(r.type==="circle"){const _=r;t=_.x,n=_.y,o=a=_.radius,i=s=0}else if(r.type==="ellipse"){const _=r;t=_.x,n=_.y,o=_.halfWidth,a=_.halfHeight,i=s=0}else{const _=r,S=_.width/2,M=_.height/2;t=_.x+S,n=_.y+M,o=a=Math.max(0,Math.min(_.radius,Math.min(S,M))),i=S-o,s=M-a}if(!(o>=0&&a>=0&&i>=0&&s>=0))return e;const l=Math.ceil(2.3*Math.sqrt(o+a)),u=l*8+(i?4:0)+(s?4:0);if(u===0)return e;if(l===0)return e[0]=e[6]=t+i,e[1]=e[3]=n+s,e[2]=e[4]=t-i,e[5]=e[7]=n-s,e;let h=0,c=l*4+(i?2:0)+2,d=c,f=u,p=i+o,m=s,g=t+p,y=t-p,v=n+m;if(e[h++]=g,e[h++]=v,e[--c]=v,e[--c]=y,s){const _=n-m;e[d++]=y,e[d++]=_,e[--f]=_,e[--f]=g}for(let _=1;_<l;_++){const S=Math.PI/2*(_/l),M=i+Math.cos(S)*o,B=s+Math.sin(S)*a,P=t+M,w=t-M,T=n+B,L=n-B;e[h++]=P,e[h++]=T,e[--c]=T,e[--c]=w,e[d++]=w,e[d++]=L,e[--f]=L,e[--f]=P}p=i,m=s+a,g=t+p,y=t-p,v=n+m;const b=n-m;return e[h++]=g,e[h++]=v,e[--f]=b,e[--f]=g,i&&(e[h++]=y,e[h++]=v,e[--f]=b,e[--f]=y),e},triangulate(r,e,t,n,i,s){if(r.length===0)return;let o=0,a=0;const l=r.length/4;o+=r[0],a+=r[1],o+=r[l|0],a+=r[(l|0)+1],o+=r[l*2|0],a+=r[(l*2|0)+1],o+=r[l*3|0],a+=r[(l*3|0)+1],o/=4,a/=4;let u=n;e[u*t]=o,e[u*t+1]=a,u++;const h=n;e[u*t]=r[0],e[u*t+1]=r[1],u++;for(let c=2;c<r.length;c+=2)e[u*t]=r[c],e[u*t+1]=r[c+1],i[s++]=u,i[s++]=h,i[s++]=u-1,u++;i[s++]=u-1,i[s++]=h,i[s++]=h+1}},mh=1e-4,Di=1e-4;function vh(r){const e=r.length;if(e<6)return 1;let t=0;for(let n=0,i=r[e-2],s=r[e-1];n<e;n+=2){const o=r[n],a=r[n+1];t+=(o-i)*(a+s),i=o,s=a}return t<0?-1:1}function bh(r,e,t,n,i,s,o,a){const l=r-t*i,u=e-n*i,h=r+t*s,c=e+n*s;let d,f;o?(d=n,f=-t):(d=-n,f=t);const p=l+d,m=u+f,g=h+d,y=c+f;return a.push(p,m),a.push(g,y),2}function st(r,e,t,n,i,s,o,a){const l=t-r,u=n-e;let h=Math.atan2(l,u),c=Math.atan2(i-r,s-e);a&&h<c?h+=Math.PI*2:!a&&h>c&&(c+=Math.PI*2);let d=h;const f=c-h,p=Math.abs(f),m=Math.sqrt(l*l+u*u),g=(15*p*Math.sqrt(m)/Math.PI>>0)+1,y=f/g;if(d+=y,a){o.push(r,e),o.push(t,n);for(let v=1,b=d;v<g;v++,b+=y)o.push(r,e),o.push(r+Math.sin(b)*m,e+Math.cos(b)*m);o.push(r,e),o.push(i,s)}else{o.push(t,n),o.push(r,e);for(let v=1,b=d;v<g;v++,b+=y)o.push(r+Math.sin(b)*m,e+Math.cos(b)*m),o.push(r,e);o.push(i,s),o.push(r,e)}return g*2}function yh(r,e,t,n,i,s,o,a,l){const u=mh;if(r.length===0)return;const h=e;let c=h.alignment;if(e.alignment!==.5){let H=vh(r);t&&(H*=-1),c=(c-.5)*H+.5}const d=new W(r[0],r[1]),f=new W(r[r.length-2],r[r.length-1]),p=n,m=Math.abs(d.x-f.x)<u&&Math.abs(d.y-f.y)<u;if(p){r=r.slice(),m&&(r.pop(),r.pop(),f.set(r[r.length-2],r[r.length-1]));const H=(d.x+f.x)*.5,Fe=(f.y+d.y)*.5;r.unshift(H,Fe),r.push(H,Fe)}const g=i,y=r.length/2;let v=r.length;const b=g.length/2,_=h.width/2,S=_*_,M=h.miterLimit*h.miterLimit;let B=r[0],P=r[1],w=r[2],T=r[3],L=0,I=0,R=-(P-T),E=B-w,j=0,Y=0,he=Math.sqrt(R*R+E*E);R/=he,E/=he,R*=_,E*=_;const Pt=c,O=(1-Pt)*2,U=Pt*2;p||(h.cap==="round"?v+=st(B-R*(O-U)*.5,P-E*(O-U)*.5,B-R*O,P-E*O,B+R*U,P+E*U,g,!0)+2:h.cap==="square"&&(v+=bh(B,P,R,E,O,U,!0,g))),g.push(B-R*O,P-E*O),g.push(B+R*U,P+E*U);for(let H=1;H<y-1;++H){B=r[(H-1)*2],P=r[(H-1)*2+1],w=r[H*2],T=r[H*2+1],L=r[(H+1)*2],I=r[(H+1)*2+1],R=-(P-T),E=B-w,he=Math.sqrt(R*R+E*E),R/=he,E/=he,R*=_,E*=_,j=-(T-I),Y=w-L,he=Math.sqrt(j*j+Y*Y),j/=he,Y/=he,j*=_,Y*=_;const Fe=w-B,Et=P-T,At=w-L,Mt=I-T,Po=Fe*At+Et*Mt,hr=Et*At-Mt*Fe,Ct=hr<0;if(Math.abs(hr)<.001*Math.abs(Po)){g.push(w-R*O,T-E*O),g.push(w+R*U,T+E*U),Po>=0&&(h.join==="round"?v+=st(w,T,w-R*O,T-E*O,w-j*O,T-Y*O,g,!1)+4:v+=2,g.push(w-j*U,T-Y*U),g.push(w+j*O,T+Y*O));continue}const Eo=(-R+B)*(-E+T)-(-R+w)*(-E+P),Ao=(-j+L)*(-Y+T)-(-j+w)*(-Y+I),cr=(Fe*Ao-At*Eo)/hr,dr=(Mt*Eo-Et*Ao)/hr,gn=(cr-w)*(cr-w)+(dr-T)*(dr-T),$e=w+(cr-w)*O,ze=T+(dr-T)*O,Ne=w-(cr-w)*U,We=T-(dr-T)*U,jd=Math.min(Fe*Fe+Et*Et,At*At+Mt*Mt),Mo=Ct?O:U,Yd=jd+Mo*Mo*S;gn<=Yd?h.join==="bevel"||gn/S>M?(Ct?(g.push($e,ze),g.push(w+R*U,T+E*U),g.push($e,ze),g.push(w+j*U,T+Y*U)):(g.push(w-R*O,T-E*O),g.push(Ne,We),g.push(w-j*O,T-Y*O),g.push(Ne,We)),v+=2):h.join==="round"?Ct?(g.push($e,ze),g.push(w+R*U,T+E*U),v+=st(w,T,w+R*U,T+E*U,w+j*U,T+Y*U,g,!0)+4,g.push($e,ze),g.push(w+j*U,T+Y*U)):(g.push(w-R*O,T-E*O),g.push(Ne,We),v+=st(w,T,w-R*O,T-E*O,w-j*O,T-Y*O,g,!1)+4,g.push(w-j*O,T-Y*O),g.push(Ne,We)):(g.push($e,ze),g.push(Ne,We)):(g.push(w-R*O,T-E*O),g.push(w+R*U,T+E*U),h.join==="round"?Ct?v+=st(w,T,w+R*U,T+E*U,w+j*U,T+Y*U,g,!0)+2:v+=st(w,T,w-R*O,T-E*O,w-j*O,T-Y*O,g,!1)+2:h.join==="miter"&&gn/S<=M&&(Ct?(g.push(Ne,We),g.push(Ne,We)):(g.push($e,ze),g.push($e,ze)),v+=2),g.push(w-j*O,T-Y*O),g.push(w+j*U,T+Y*U),v+=2)}B=r[(y-2)*2],P=r[(y-2)*2+1],w=r[(y-1)*2],T=r[(y-1)*2+1],R=-(P-T),E=B-w,he=Math.sqrt(R*R+E*E),R/=he,E/=he,R*=_,E*=_,g.push(w-R*O,T-E*O),g.push(w+R*U,T+E*U),p||(h.cap==="round"?v+=st(w-R*(O-U)*.5,T-E*(O-U)*.5,w-R*O,T-E*O,w+R*U,T+E*U,g,!1)+2:h.cap==="square"&&(v+=bh(w,T,R,E,O,U,!1,g)));const Vd=Di*Di;for(let H=b;H<v+b-2;++H)B=g[H*2],P=g[H*2+1],w=g[(H+1)*2],T=g[(H+1)*2+1],L=g[(H+2)*2],I=g[(H+2)*2+1],!(Math.abs(B*(T-I)+w*(I-P)+L*(P-T))<Vd)&&a.push(H,H+1,H+2)}var xh=Wr,wm=Wr;function Wr(r,e,t){t=t||2;var n=e&&e.length,i=n?e[0]*t:r.length,s=_h(r,0,i,t,!0),o=[];if(!s||s.next===s.prev)return o;var a,l,u,h,c,d,f;if(n&&(s=Am(r,e,s,t)),r.length>80*t){a=u=r[0],l=h=r[1];for(var p=t;p<i;p+=t)c=r[p],d=r[p+1],c<a&&(a=c),d<l&&(l=d),c>u&&(u=c),d>h&&(h=d);f=Math.max(u-a,h-l),f=f!==0?32767/f:0}return Jt(s,o,t,a,l,f,0),o}function _h(r,e,t,n,i){var s,o;if(i===Ni(r,e,t,n)>0)for(s=e;s<t;s+=n)o=Sh(s,r[s],r[s+1],o);else for(s=t-n;s>=e;s-=n)o=Sh(s,r[s],r[s+1],o);return o&&Hr(o,o.next)&&(tr(o),o=o.next),o}function ot(r,e){if(!r)return r;e||(e=r);var t=r,n;do if(n=!1,!t.steiner&&(Hr(t,t.next)||X(t.prev,t,t.next)===0)){if(tr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Jt(r,e,t,n,i,s,o){if(r){!o&&s&&km(r,n,i,s);for(var a=r,l,u;r.prev!==r.next;){if(l=r.prev,u=r.next,s?Sm(r,n,i,s):Tm(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(u.i/t|0),tr(r),r=u.next,a=u.next;continue}if(r=u,r===a){o?o===1?(r=Pm(ot(r),e,t),Jt(r,e,t,n,i,s,2)):o===2&&Em(r,e,t,n,i,s):Jt(ot(r),e,t,n,i,s,1);break}}}}function Tm(r){var e=r.prev,t=r,n=r.next;if(X(e,t,n)>=0)return!1;for(var i=e.x,s=t.x,o=n.x,a=e.y,l=t.y,u=n.y,h=i<s?i<o?i:o:s<o?s:o,c=a<l?a<u?a:u:l<u?l:u,d=i>s?i>o?i:o:s>o?s:o,f=a>l?a>u?a:u:l>u?l:u,p=n.next;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=c&&p.y<=f&&xt(i,a,s,l,o,u,p.x,p.y)&&X(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Sm(r,e,t,n){var i=r.prev,s=r,o=r.next;if(X(i,s,o)>=0)return!1;for(var a=i.x,l=s.x,u=o.x,h=i.y,c=s.y,d=o.y,f=a<l?a<u?a:u:l<u?l:u,p=h<c?h<d?h:d:c<d?c:d,m=a>l?a>u?a:u:l>u?l:u,g=h>c?h>d?h:d:c>d?c:d,y=$i(f,p,e,t,n),v=$i(m,g,e,t,n),b=r.prevZ,_=r.nextZ;b&&b.z>=y&&_&&_.z<=v;){if(b.x>=f&&b.x<=m&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&xt(a,h,l,c,u,d,b.x,b.y)&&X(b.prev,b,b.next)>=0||(b=b.prevZ,_.x>=f&&_.x<=m&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&xt(a,h,l,c,u,d,_.x,_.y)&&X(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;b&&b.z>=y;){if(b.x>=f&&b.x<=m&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&xt(a,h,l,c,u,d,b.x,b.y)&&X(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;_&&_.z<=v;){if(_.x>=f&&_.x<=m&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&xt(a,h,l,c,u,d,_.x,_.y)&&X(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Pm(r,e,t){var n=r;do{var i=n.prev,s=n.next.next;!Hr(i,s)&&wh(i,n,n.next,s)&&er(i,s)&&er(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),tr(n),tr(n.next),n=r=s),n=n.next}while(n!==r);return ot(n)}function Em(r,e,t,n,i,s){var o=r;do{for(var a=o.next.next;a!==o.prev;){if(o.i!==a.i&&Fm(o,a)){var l=Th(o,a);o=ot(o,o.next),l=ot(l,l.next),Jt(o,e,t,n,i,s,0),Jt(l,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function Am(r,e,t,n){var i=[],s,o,a,l,u;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:r.length,u=_h(r,a,l,n,!1),u===u.next&&(u.steiner=!0),i.push(Um(u));for(i.sort(Mm),s=0;s<i.length;s++)t=Cm(i[s],t);return t}function Mm(r,e){return r.x-e.x}function Cm(r,e){var t=Bm(r,e);if(!t)return e;var n=Th(t,r);return ot(n,n.next),ot(t,t.next)}function Bm(r,e){var t=e,n=r.x,i=r.y,s=-1/0,o;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){var a=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=n&&a>s&&(s=a,o=t.x<t.next.x?t:t.next,a===n))return o}t=t.next}while(t!==e);if(!o)return null;var l=o,u=o.x,h=o.y,c=1/0,d;t=o;do n>=t.x&&t.x>=u&&n!==t.x&&xt(i<h?n:s,i,u,h,i<h?s:n,i,t.x,t.y)&&(d=Math.abs(i-t.y)/(n-t.x),er(t,r)&&(d<c||d===c&&(t.x>o.x||t.x===o.x&&Rm(o,t)))&&(o=t,c=d)),t=t.next;while(t!==l);return o}function Rm(r,e){return X(r.prev,r,e.prev)<0&&X(e.next,r,r.next)<0}function km(r,e,t,n){var i=r;do i.z===0&&(i.z=$i(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Om(i)}function Om(r){var e,t,n,i,s,o,a,l,u=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<u&&(a++,n=n.nextZ,!!n);e++);for(l=u;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,u*=2}while(o>1);return r}function $i(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Um(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function xt(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function Fm(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Im(r,e)&&(er(r,e)&&er(e,r)&&Gm(r,e)&&(X(r.prev,r,e.prev)||X(r,e.prev,e))||Hr(r,e)&&X(r.prev,r,r.next)>0&&X(e.prev,e,e.next)>0)}function X(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Hr(r,e){return r.x===e.x&&r.y===e.y}function wh(r,e,t,n){var i=jr(X(r,e,t)),s=jr(X(r,e,n)),o=jr(X(t,n,r)),a=jr(X(t,n,e));return!!(i!==s&&o!==a||i===0&&Vr(r,t,e)||s===0&&Vr(r,n,e)||o===0&&Vr(t,r,n)||a===0&&Vr(t,e,n))}function Vr(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function jr(r){return r>0?1:r<0?-1:0}function Im(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&wh(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function er(r,e){return X(r.prev,r,r.next)<0?X(r,e,r.next)>=0&&X(r,r.prev,e)>=0:X(r,e,r.prev)<0||X(r,r.next,e)<0}function Gm(r,e){var t=r,n=!1,i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Th(r,e){var t=new zi(r.i,r.x,r.y),n=new zi(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Sh(r,e,t,n){var i=new zi(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function tr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function zi(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Wr.deviation=function(r,e,t,n){var i=e&&e.length,s=i?e[0]*t:r.length,o=Math.abs(Ni(r,0,s,t));if(i)for(var a=0,l=e.length;a<l;a++){var u=e[a]*t,h=a<l-1?e[a+1]*t:r.length;o-=Math.abs(Ni(r,u,h,t))}var c=0;for(a=0;a<n.length;a+=3){var d=n[a]*t,f=n[a+1]*t,p=n[a+2]*t;c+=Math.abs((r[d]-r[p])*(r[f+1]-r[d+1])-(r[d]-r[f])*(r[p+1]-r[d+1]))}return o===0&&c===0?0:Math.abs((c-o)/o)};function Ni(r,e,t,n){for(var i=0,s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}Wr.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},n=0,i=0;i<r.length;i++){for(var s=0;s<r[i].length;s++)for(var o=0;o<e;o++)t.vertices.push(r[i][s][o]);i>0&&(n+=r[i-1].length,t.holes.push(n))}return t},xh.default=wm;function Wi(r,e,t,n,i,s,o){const a=xh(r,e,2);if(!a)return;for(let u=0;u<a.length;u+=3)s[o++]=a[u]+i,s[o++]=a[u+1]+i,s[o++]=a[u+2]+i;let l=i*n;for(let u=0;u<r.length;u+=2)t[l]=r[u],t[l+1]=r[u+1],l+=n}const Lm=[],Hi={build(r,e){for(let t=0;t<r.points.length;t++)e[t]=r.points[t];return e},triangulate(r,e,t,n,i,s){Wi(r,Lm,e,t,n,i,s)}},Vi={build(r,e){const t=r,n=t.x,i=t.y,s=t.width,o=t.height;return s>=0&&o>=0&&(e[0]=n,e[1]=i,e[2]=n+s,e[3]=i,e[4]=n+s,e[5]=i+o,e[6]=n,e[7]=i+o),e},triangulate(r,e,t,n,i,s){let o=0;n*=t,e[n+o]=r[0],e[n+o+1]=r[1],o+=t,e[n+o]=r[2],e[n+o+1]=r[3],o+=t,e[n+o]=r[6],e[n+o+1]=r[7],o+=t,e[n+o]=r[4],e[n+o+1]=r[5],o+=t;const a=n/t;i[s++]=a,i[s++]=a+1,i[s++]=a+2,i[s++]=a+1,i[s++]=a+3,i[s++]=a+2}},ji={build(r,e){return e[0]=r.x,e[1]=r.y,e[2]=r.x2,e[3]=r.y2,e[4]=r.x3,e[5]=r.y3,e},triangulate(r,e,t,n,i,s){let o=0;n*=t,e[n+o]=r[0],e[n+o+1]=r[1],o+=t,e[n+o]=r[2],e[n+o+1]=r[3],o+=t,e[n+o]=r[4],e[n+o+1]=r[5];const a=n/t;i[s++]=a,i[s++]=a+1,i[s++]=a+2}};let Dm=0;class Yi{constructor(e){this.uid=Dm++,this.canBundle=!0,this.owner=mt,this.type="graphics",this._context=e||new Ge,this._context.on("update",this.onGraphicsContextUpdate,this)}set context(e){e!==this._context&&(this._context.off("update",this.onGraphicsContextUpdate,this),this._context=e,this._context.on("update",this.onGraphicsContextUpdate,this),this.onGraphicsContextUpdate())}get context(){return this._context}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onGraphicsContextUpdate(){this._didUpdate=!0,this.owner.onViewUpdate()}destroy(e=!1){this.owner=null,(typeof e=="boolean"?e:e!=null&&e.context)&&this._context.destroy(e),this._context=null}}var $m=Object.defineProperty,Ph=Object.getOwnPropertySymbols,zm=Object.prototype.hasOwnProperty,Nm=Object.prototype.propertyIsEnumerable,Eh=(r,e,t)=>e in r?$m(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Wm=(r,e)=>{for(var t in e||(e={}))zm.call(e,t)&&Eh(r,t,e[t]);if(Ph)for(var t of Ph(e))Nm.call(e,t)&&Eh(r,t,e[t]);return r};class Hm extends J{constructor(e){e instanceof Ge&&(e={context:e}),super(Wm({view:new Yi(e==null?void 0:e.context),label:"Graphics"},e))}get context(){return this.view.context}set context(e){this.view.context=e}}function Xi(r,e,t,n,i,s,o,a=null){let l=0;t*=e,i*=s;const u=a.a,h=a.b,c=a.c,d=a.d,f=a.tx,p=a.ty;for(;l<o;){const m=r[t],g=r[t+1];n[i]=u*m+c*g+f,n[i+1]=h*m+d*g+p,i+=s,t+=e,l++}}function qi(r,e,t,n){let i=0;for(e*=t;i<n;)r[e]=0,r[e+1]=0,e+=t,i++}function Yr(r,e,t,n,i){const s=e.a,o=e.b,a=e.c,l=e.d,u=e.tx,h=e.ty;t=t||0,n=n||2,i=i||r.length/n-t;let c=t*n;for(let d=0;d<i;d++){const f=r[c],p=r[c+1];r[c]=s*f+a*p+u,r[c+1]=o*f+l*p+h,c+=n}}const Ki={rectangle:Vi,polygon:Hi,triangle:ji,circle:it,ellipse:it,roundedRectangle:it},Vm=new q;function Ah(r){const e={vertices:[],uvs:[],indices:[]},t=[];for(let n=0;n<r.instructions.length;n++){const i=r.instructions[n];if(i.action==="texture")jm(i.data,t,e);else if(i.action==="fill"||i.action==="stroke"){const s=i.action==="stroke",o=i.data.path.shapePath,a=i.data.style,l=i.data.hole;s&&l&&Mh(l.shapePath,a,null,!0,t,e),Mh(o,a,l,s,t,e)}}return t}function jm(r,e,t){const{vertices:n,uvs:i,indices:s}=t,o=s.length,a=n.length/2,l=[],u=Ki.rectangle,h=Vm,c=r.image;h.x=r.dx,h.y=r.dy,h.width=r.dw,h.height=r.dh;const d=r.transform;u.build(h,l),d&&Yr(l,d),u.triangulate(l,n,2,a,s,o);const f=c.layout.uvs;i.push(f.x0,f.y0,f.x1,f.y1,f.x3,f.y3,f.x2,f.y2);const p=V.get(Nr);p.indexOffset=o,p.indexSize=s.length-o,p.vertexOffset=a,p.vertexSize=n.length/2-a,p.color=r.style,p.alpha=r.alpha,p.texture=c,p.geometryData=t,e.push(p)}function Mh(r,e,t,n,i,s){const{vertices:o,uvs:a,indices:l}=s,u=r.shapePrimitives.length-1;r.shapePrimitives.forEach(({shape:h,transform:c},d)=>{var f;const p=l.length,m=o.length/2,g=[],y=Ki[h.type];if(y.build(h,g),c&&Yr(g,c),n){const S=(f=h.closePath)!=null?f:!0;yh(g,e,!1,S,o,2,m,l,p)}else if(t&&u===d){u!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const S=[],M=g.slice();Ym(t.shapePath).forEach(B=>{S.push(M.length/2),M.push(...B)}),Wi(M,S,o,2,m,l,p)}else y.triangulate(g,o,2,m,l,p);const v=a.length/2,b=e.texture;if(b!==C.WHITE){const S=e.matrix;c&&S.append(c.clone().invert()),Xi(o,2,m,a,v,2,o.length/2-m,S)}else qi(a,v,2,o.length/2-m);const _=V.get(Nr);_.indexOffset=p,_.indexSize=l.length-p,_.vertexOffset=m,_.vertexSize=o.length/2-m,_.color=e.color,_.alpha=e.alpha,_.texture=b,_.geometryData=s,i.push(_)})}function Ym(r){if(!r)return[];const e=r.shapePrimitives,t=[];for(let n=0;n<e.length;n++){const i=e[n].shape,s=[];Ki[i.type].build(i,s),t.push(s)}return t}class Ch{}class Bh{constructor(){this.geometry=new Hu,this.batches=[]}init(){this.batches.length=0,this.geometry.reset()}}class Zi{constructor(){this._activeBatchers=[],this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),this._needsContextNeedsRebuild=[]}prerender(){this._returnActiveBatchers()}getContextRenderData(e){return this._graphicsDataContextHash[e.uid]||this._initContextRenderData(e)}updateGpuContext(e){let t=this._gpuContextHash[e.uid]||this._initContext(e);if(e.dirty){t?this._cleanGraphicsContextData(e):t=this._initContext(e);const n=Ah(e);let i=0;const s=e.batchMode;let o=!0;if(s==="auto"){for(let a=0;a<n.length;a++)if(i+=n[a].vertexSize,i>400){o=!1;break}}else s==="no-batch"&&(o=!1);t=this._gpuContextHash[e.uid]={isBatchable:o,batches:n},e.dirty=!1}return t}getGpuContext(e){return this._gpuContextHash[e.uid]||this._initContext(e)}_returnActiveBatchers(){for(let e=0;e<this._activeBatchers.length;e++)V.return(this._activeBatchers[e]);this._activeBatchers.length=0}_initContextRenderData(e){const t=V.get(Bh),n=this._gpuContextHash[e.uid].batches;let i=0,s=0;n.forEach(u=>{u.applyTransform=!1,i+=u.geometryData.vertices.length,s+=u.geometryData.indices.length});const o=V.get(Bi);this._activeBatchers.push(o),o.ensureAttributeBuffer(i),o.ensureIndexBuffer(s),o.begin();for(let u=0;u<n.length;u++){const h=n[u];o.add(h)}o.finish();const a=t.geometry;a.indexBuffer.data=o.indexBuffer,a.buffers[0].data=o.attributeBuffer.float32View,a.indexBuffer.update(o.indexSize*4),a.buffers[0].update(o.attributeSize*4);const l=o.batches;for(let u=0;u<l.length;u++){const h=l[u];h.textures.bindGroup=Si(h.textures.textures)}return this._graphicsDataContextHash[e.uid]=t,t.batches=l,t}_initContext(e){const t=new Ch;return this._gpuContextHash[e.uid]=t,e.on("update",this.onGraphicsContextUpdate,this),e.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]}onGraphicsContextUpdate(e){this._needsContextNeedsRebuild.push(e)}onGraphicsContextDestroy(e){this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null}_cleanGraphicsContextData(e){const t=this._gpuContextHash[e.uid];t.isBatchable||this._graphicsDataContextHash[e.uid]&&(V.return(this.getContextRenderData(e)),this._graphicsDataContextHash[e.uid]=null),t.batches&&t.batches.forEach(n=>{V.return(n)})}destroy(){}}Zi.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"graphicsContext"};class Qi{constructor(e,t){this.state=Ee.for2d(),this._renderableBatchesHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=e.view.context,n=!!this._renderableBatchesHash[e.uid],i=this.renderer.graphicsContext.updateGpuContext(t);return!!(i.isBatchable||n!==i.isBatchable)}addRenderable(e,t){const n=this.renderer.graphicsContext.updateGpuContext(e.view.context);e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e)),n.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add({type:"graphics",renderable:e}))}updateRenderable(e){const t=this._renderableBatchesHash[e.uid];if(t)for(let n=0;n<t.length;n++){const i=t[n];i.batcher.updateElement(i)}}destroyRenderable(e){this._removeBatchForRenderable(e.uid)}execute({renderable:e}){e.isRenderable&&this._adaptor.execute(this,e)}_rebuild(e){const t=!!this._renderableBatchesHash[e.uid],n=this.renderer.graphicsContext.updateGpuContext(e.view.context);t&&this._removeBatchForRenderable(e.uid),n.isBatchable&&this._initBatchesForRenderable(e),e.view.batched=n.isBatchable}_addToBatcher(e,t){const n=this.renderer.renderPipes.batch,i=this._getBatchesForRenderable(e);for(let s=0;s<i.length;s++){const o=i[s];n.addToBatch(o,t)}}_getBatchesForRenderable(e){return this._renderableBatchesHash[e.uid]||this._initBatchesForRenderable(e)}_initBatchesForRenderable(e){const t=e.view.context,n=this.renderer.graphicsContext.getGpuContext(t).batches.map(i=>{const s=V.get(Nr);return i.copyTo(s),s.renderable=e,s});return this._renderableBatchesHash[e.uid]=n,e.on("destroyed",()=>{this.destroyRenderable(e)}),n}_removeBatchForRenderable(e){this._renderableBatchesHash[e].forEach(t=>{V.return(t)}),this._renderableBatchesHash[e]=null}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null;for(const e in this._renderableBatchesHash)this._removeBatchForRenderable(e);this._renderableBatchesHash=null}}Qi.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"graphics"};const Xm={rectangle:Vi,polygon:Hi,triangle:ji,circle:it,ellipse:it,roundedRectangle:it};function qm(r){const e=[],t=[],n=[],i=r.path.shapePath,s=r.textureMatrix;i.shapePrimitives.forEach(({shape:a,transform:l})=>{const u=n.length,h=e.length/2,c=[],d=Xm[a.type];d.build(a,c),l&&Yr(c,l),d.triangulate(c,e,2,h,n,u);const f=t.length/2;s?(l&&s.append(l.clone().invert()),Xi(e,2,h,t,f,2,e.length/2-h,s)):qi(t,f,2,e.length/2-h)});const o=r.out;return o?(o.positions=new Float32Array(e),o.uvs=new Float32Array(t),o.indices=new Uint32Array(n),o):new yt({positions:new Float32Array(e),uvs:new Float32Array(t),indices:new Uint32Array(n)})}class Rh extends ie{constructor({original:e,view:t}){super(),this.uid=Vn(),this.view=t,this._original=e,this.layerTransform=new k,this.layerColor=4294967295,this.layerVisibleRenderable=3,this.view.owner=this}get layerBlendMode(){return this._original.layerBlendMode}onViewUpdate(){this.didViewUpdate=!0,this._original.layerGroup.onChildViewUpdate(this)}get isRenderable(){return this._original.isRenderable}}function kh(r,e){const t=r.root,n=r.instructionSet;n.reset(),e.batch.buildStart(n),e.blendMode.buildStart(),e.colorMask.buildStart(),t.sortableChildren&&t.sortChildren(),Oh(t,n,e,!0),e.batch.buildEnd(n),e.blendMode.buildEnd(n)}function rr(r,e,t){r.layerVisibleRenderable<3||!r.includeInBuild||(r.sortableChildren&&r.sortChildren(),r.isSimple?Km(r,e,t):Oh(r,e,t,!1))}function Km(r,e,t){const n=r.view;if(n&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[n.type].addRenderable(r,e)),!r.isLayerRoot){const i=r.children,s=i.length;for(let o=0;o<s;o++)rr(i[o],e,t)}}function Oh(r,e,t,n){var i;if(n){const s=r.layerGroup;if(s.root.view){const o=(i=s.proxyRenderable)!=null?i:Zm(s);o&&(t.blendMode.setBlendMode(o,o.layerBlendMode,e),t[o.view.type].addRenderable(o,e))}}else for(let s=0;s<r.effects.length;s++){const o=r.effects[s];t[o.pipe].push(o,r,e)}if(!n&&r.isLayerRoot)t.layer.addLayerGroup(r.layerGroup,e);else{const s=r.view;s&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[s.type].addRenderable(r,e));const o=r.children;if(o.length)for(let a=0;a<o.length;a++)rr(o[a],e,t)}if(!n)for(let s=r.effects.length-1;s>=0;s--){const o=r.effects[s];t[o.pipe].pop(o,r,e)}}function Zm(r){const e=r.root;r.proxyRenderable=new Rh({original:e,view:e.view})}const Qm=new ve;class Jm extends Pr{constructor(){super({filters:[new uh({sprite:new Ue(C.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class Ji{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,n){const i=this._renderer;if(i.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:t}),e.renderMaskToTexture){const s=e.mask;s.includeInBuild=!0,rr(s,n,i.renderPipes),s.includeInBuild=!1}i.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,canBundle:!1})}pop(e,t,n){this._renderer.renderPipes.batch.break(n),n.add({type:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const t=this._renderer,n=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const i=V.get(Jm);if(n){e.mask.mask.measurable=!0;const s=Ft(e.mask.mask,!0,Qm);e.mask.mask.measurable=!1,s.ceil();const o=oe.getOptimalTexture(s.width,s.height,1,!1),a=t.renderTarget.push(o,!0);t.globalUniforms.push({projectionMatrix:a.projectionMatrix,offset:s,worldColor:4294967295});const l=i.sprite;l.texture=o,l.worldTransform.tx=s.minX,l.worldTransform.ty=s.minY,this._activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer,filterTexture:o})}else i.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:i,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const i=this._activeMaskStage[this._activeMaskStage.length-1];n&&(t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({type:"filter",action:"pushFilter",container:i.maskedContainer,filterEffect:i.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const i=this._activeMaskStage.pop();n&&oe.returnTexture(i.filterTexture),V.return(i.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}Ji.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"alphaMask"};class es{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,n){this._renderer.renderPipes.batch.break(n);const i=this._colorStack;i[this._colorStackIndex]=i[this._colorStackIndex-1]&e.mask;const s=this._colorStack[this._colorStackIndex];s!==this._currentColor&&(this._currentColor=s,n.add({type:"colorMask",colorMask:s,canBundle:!1})),this._colorStackIndex++}pop(e,t,n){this._renderer.renderPipes.batch.break(n);const i=this._colorStack;this._colorStackIndex--;const s=i[this._colorStackIndex-1];s!==this._currentColor&&(this._currentColor=s,n.add({type:"colorMask",colorMask:s,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}es.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"colorMask"};class ev{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1}addBounds(e,t){Br(this.mask,e,t)}addLocalBounds(e,t){Rr(this.mask,e,t)}containsPoint(e,t){const n=this.mask;return t(n,e)}reset(){this.mask.measurable=!0,this.mask=null}destroy(){this.reset()}}var ge=(r=>(r[r.NONE=0]="NONE",r[r.COLOR=16384]="COLOR",r[r.STENCIL=1024]="STENCIL",r[r.DEPTH=256]="DEPTH",r[r.COLOR_DEPTH=16640]="COLOR_DEPTH",r[r.COLOR_STENCIL=17408]="COLOR_STENCIL",r[r.DEPTH_STENCIL=1280]="DEPTH_STENCIL",r[r.ALL=17664]="ALL",r))(ge||{}),te=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(te||{});class ts{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,n){const i=e,s=this._renderer;s.renderPipes.batch.break(n),s.renderPipes.blendMode.setBlendMode(i.mask,"none",n),n.add({type:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const o=i.mask;o.includeInBuild=!0,this._maskHash.has(i)||this._maskHash.set(i,{instructionsStart:0,instructionsLength:0});const a=this._maskHash.get(i);a.instructionsStart=n.instructionSize,rr(o,n,s.renderPipes),o.includeInBuild=!1,s.renderPipes.batch.break(n),n.add({type:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const l=n.instructionSize-a.instructionsStart-1;a.instructionsLength=l;const u=s.renderTarget.renderTarget.uid;this._maskStackHash[u]===void 0&&(this._maskStackHash[u]=0),this._maskStackHash[u]++}pop(e,t,n){const i=e,s=this._renderer,o=s.renderTarget.renderTarget.uid;this._maskStackHash[o]--,s.renderPipes.batch.break(n),s.renderPipes.blendMode.setBlendMode(i.mask,"none",n),n.add({type:"stencilMask",action:"popMaskBegin",canBundle:!1});const a=this._maskHash.get(e);if(this._maskStackHash[o]!==0)for(let l=0;l<a.instructionsLength;l++)n.instructions[n.instructionSize++]=n.instructions[a.instructionsStart++];n.add({type:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;const n=this._renderer,i=n.renderTarget.renderTarget.uid;let s=(t=this._maskStackHash[i])!=null?t:0;e.action==="pushMaskBegin"?(s++,n.stencil.setStencilMode(te.RENDERING_MASK_ADD,s),n.colorMask.setMask(0)):e.action==="pushMaskEnd"?(n.stencil.setStencilMode(te.MASK_ACTIVE,s),n.colorMask.setMask(15)):e.action==="popMaskBegin"?(s--,s!==0?(n.stencil.setStencilMode(te.RENDERING_MASK_REMOVE,s),n.colorMask.setMask(0)):n.renderTarget.clear(ge.STENCIL)):e.action==="popMaskEnd"&&(s===0?n.stencil.setStencilMode(te.DISABLED,s):n.stencil.setStencilMode(te.MASK_ACTIVE,s),n.colorMask.setMask(15)),this._maskStackHash[i]=s}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}ts.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"stencilMask"};class rs{execute(e,t){const n=e.renderer,i=t.view,s=e.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.transformMatrix=t.layerTransform,o.update(),Qt(t.layerColor,o.uniforms.color,0);let a=i._shader;a||(a=e.meshShader,a.texture=i.texture),a.groups[0]=n.globalUniforms.bindGroup,a.groups[1]=e.localUniformsBindGroup,n.encoder.draw({geometry:i._geometry,shader:a,state:s})}}rs.extension={type:[x.WebGLPipesAdaptor],name:"mesh"};class ns{execute(e,t){const n=e.renderer,i=t.view,s=e.state;s.blendMode=t.layerBlendMode;const o=e.localUniforms;o.uniforms.transformMatrix=t.layerTransform,o.update(),Qt(t.layerColor,o.uniforms.color,0);let a=i._shader;a||(a=e.meshShader,a.groups[2]=n.texture.getTextureBindGroup(i.texture)),a.groups[0]=n.globalUniforms.bindGroup,a.groups[1]=n.renderPipes.uniformBatch.getUniformBindGroup(o,!0),n.encoder.draw({geometry:i._geometry,shader:a,state:s})}}ns.extension={type:[x.WebGPUPipesAdaptor],name:"mesh"};class Uh{constructor(){this.batcher=null,this.batch=null}get blendMode(){return this.renderable.layerBlendMode}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null}packIndex(e,t,n){const i=this.renderable.view.geometry.indices;for(let s=0;s<i.length;s++)e[t++]=i[s]+n}packAttributes(e,t,n,i){const s=this.renderable,o=this.renderable.view.geometry,a=s.layerTransform,l=a.a,u=a.b,h=a.c,c=a.d,d=a.tx,f=a.ty,p=o.positions,m=o.uvs,g=s.layerColor;for(let y=0;y<p.length;y+=2){const v=p[y],b=p[y+1];e[n++]=l*v+h*b+d,e[n++]=u*v+c*b+f,e[n++]=m[y],e[n++]=m[y+1],t[n++]=g,e[n++]=i}}get vertexSize(){return this.renderable.view.geometry.positions.length/2}get indexSize(){return this.renderable.view.geometry.indices.length}}function tv(r,e){const{frameWidth:t,frameHeight:n}=r;return e.scale(1/t,1/n),e}var rv=Object.defineProperty,Fh=Object.getOwnPropertySymbols,nv=Object.prototype.hasOwnProperty,iv=Object.prototype.propertyIsEnumerable,Ih=(r,e,t)=>e in r?rv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,sv=(r,e)=>{for(var t in e||(e={}))nv.call(e,t)&&Ih(r,t,e[t]);if(Fh)for(var t of Fh(e))iv.call(e,t)&&Ih(r,t,e[t]);return r};class ov extends J{constructor(...e){let t=e[0];t instanceof yt&&(z(N,"Mesh: use new Mesh({ geometry, shader }) instead"),t={geometry:t,shader:e[1]},e[3]&&(z(N,"Mesh: topology argument has been removed, use geometry.topology instead"),t.geometry.topology=e[3])),super(sv({view:new Zt(t),label:"Mesh"},t))}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get geometry(){return this.view.geometry}set geometry(e){this.view.geometry=e}get material(){return z(N,"mesh.material property has been removed, use mesh.shader instead"),this.view.shader}get shader(){return this.view.shader}}var Gh=`in vec2 vTextureCoord;
in vec4 vColor;

uniform sampler2D uTexture;

out vec4 outColor;

void main(void){
   outColor = texture(uTexture, vTextureCoord) * vColor;
}`,Lh=`
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
}`,is=`struct GlobalUniforms {
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
  
}`;class Dh extends Se{constructor(e){const t=pe.from({vertex:Lh,fragment:Gh,name:"mesh-default"}),n=fe.from({vertex:{source:is,entryPoint:"mainVertex"},fragment:{source:is,entryPoint:"mainFragment"}});super({glProgram:t,gpuProgram:n,resources:{uTexture:e.texture.source,uSampler:e.texture.style}}),this._texture=e.texture}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.style)}}class ss{constructor(e,t){this.localUniforms=new Q({transformMatrix:{value:new k,type:"mat3x3<f32>"},color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"}}),this.localUniformsBindGroup=new we({0:this.localUniforms}),this.meshShader=new Dh({texture:C.EMPTY}),this.state=Ee.for2d(),this._renderableHash=Object.create(null),this._gpuBatchableMeshHash=Object.create(null),this.renderer=e,this._adaptor=t}validateRenderable(e){const t=this._getRenderableData(e),n=t.batched,i=e.view.batched;if(t.batched=i,n!==i)return!0;if(i){const s=e.view._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const o=this._getBatchableMesh(e),a=e.view.texture;if(o.texture._source!==a._source&&o.texture._source!==a._source)return o.batcher.checkAndUpdateTexture(o,a)}return!1}addRenderable(e,t){const n=this.renderer.renderPipes.batch,{batched:i}=this._getRenderableData(e);if(i){const s=this._getBatchableMesh(e);s.texture=e.view._texture,n.addToBatch(s,t)}else n.break(t),t.add({type:"mesh",renderable:e})}updateRenderable(e){if(e.view.batched){const t=this._gpuBatchableMeshHash[e.uid];t.texture=e.view._texture,t.batcher.updateElement(t)}}destroyRenderable(e){this._renderableHash[e.uid]=null;const t=this._gpuBatchableMeshHash[e.uid];V.return(t),this._gpuBatchableMeshHash[e.uid]=null}execute({renderable:e}){e.isRenderable&&this._adaptor.execute(this,e)}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t=e.view;return this._renderableHash[e.uid]={batched:t.batched,indexSize:t._geometry.indices.length,vertexSize:t._geometry.positions.length},e.on("destroyed",()=>{this.destroyRenderable(e)}),this._renderableHash[e.uid]}_getBatchableMesh(e){return this._gpuBatchableMeshHash[e.uid]||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=V.get(Uh);return t.renderable=e,t.texture=e.view._texture,this._gpuBatchableMeshHash[e.uid]=t,t.renderable=e,t}destroy(){for(const e in this._gpuBatchableMeshHash)this._gpuBatchableMeshHash[e]&&V.return(this._gpuBatchableMeshHash[e]);this._gpuBatchableMeshHash=null,this._renderableHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this.meshShader.destroy(),this.meshShader=null,this._adaptor=null,this.renderer=null,this.state=null}}ss.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"mesh"};var nr=(r=>(r[r.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",r[r.ARRAY_BUFFER=34962]="ARRAY_BUFFER",r[r.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",r))(nr||{});class $h{constructor(e,t){this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.type=t}}class os{constructor(e){this._gpuBuffers=Object.create(null),this._boundBufferBases=Object.create(null),this._renderer=e}destroy(){this._renderer=null}contextChange(){this.destroyAll(!0),this._gl=this._renderer.gl}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{_gl:t}=this,n=this.getGlBuffer(e);t.bindBuffer(n.type,n.buffer)}bindBufferBase(e,t){const{_gl:n}=this;if(this._boundBufferBases[t]!==e){const i=this.getGlBuffer(e);this._boundBufferBases[t]=e,n.bindBufferBase(n.UNIFORM_BUFFER,t,i.buffer)}}bindBufferRange(e,t,n){const{_gl:i}=this;n=n||0;const s=this.getGlBuffer(e);i.bindBufferRange(i.UNIFORM_BUFFER,t||0,s.buffer,n*256,256)}updateBuffer(e){const{_gl:t}=this,n=this.getGlBuffer(e);if(e._updateID===n.updateID)return n;if(n.updateID=e._updateID,t.bindBuffer(n.type,n.buffer),n.byteLength>=e.data.byteLength)t.bufferSubData(n.type,0,e.data,0,e._updateSize/4);else{const i=e.descriptor.usage&G.STATIC?t.STATIC_DRAW:t.DYNAMIC_DRAW;n.byteLength=e.data.byteLength,t.bufferData(n.type,e.data,i)}return n}destroyAll(e){const t=this._gl;if(!e)for(const n in this._gpuBuffers)t.deleteBuffer(this._gpuBuffers[n].buffer);this._gpuBuffers={}}onBufferDestroy(e,t){const n=this._gpuBuffers[e.uid],i=this._gl;t||i.deleteBuffer(n.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{_gl:t}=this;let n=nr.ARRAY_BUFFER;e.descriptor.usage&G.INDEX?n=nr.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&G.UNIFORM&&(n=nr.UNIFORM_BUFFER);const i=new $h(t.createBuffer(),n);return this._gpuBuffers[e.uid]=i,e.on("destroy",this.onBufferDestroy,this),i}}os.extension={type:[x.WebGLSystem],name:"buffer"};class Xr{constructor(e){this._renderer=e,this.webGLVersion=1,this.extensions=Object.create(null),this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this._renderer.gl=e,e.isContextLost()&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").restoreContext()}init(e){var t;if(e!=null&&e.context)this.initFromContext(e.context);else{const n=this._renderer.background.alpha<1,i=(t=e.premultipliedAlpha)!=null?t:!0;this.initFromOptions({alpha:n,premultipliedAlpha:i,antialias:e.antialias,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference})}}initFromContext(e){this.gl=e,this.validateContext(e),this._renderer.runners.contextChange.emit(e);const t=this._renderer.view.element;t.addEventListener("webglcontextlost",this.handleContextLost,!1),t.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}initFromOptions(e){const t=this.createContext(this._renderer.view.element,e);this.initFromContext(t)}createContext(e,t){const n=e.getContext("webgl2",t);return this.webGLVersion=2,this.gl=n,this.getExtensions(),this.gl}getExtensions(){const{gl:e}=this,t={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc")};Object.assign(this.extensions,t,{colorBufferFloat:e.getExtension("EXT_color_buffer_float")})}handleContextLost(e){e.preventDefault()}handleContextRestored(){this._renderer.runners.contextChange.emit(this.gl)}destroy(){const e=this._renderer.view.element;this._renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}validateContext(e){const t=e.getContextAttributes(),n="WebGL2RenderingContext"in globalThis&&e instanceof globalThis.WebGL2RenderingContext;n&&(this.webGLVersion=2),t&&!t.stencil&&console.warn("Provided WebGL context does not have a stencil buffer, masks may not render correctly");const i=n||!!e.getExtension("OES_element_index_uint");this.supports.uint32Indices=i,i||console.warn("Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly")}}Xr.extension={type:[x.WebGLSystem],name:"context"},Xr.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"default"};var qr=(r=>(r[r.RGBA=6408]="RGBA",r[r.RGB=6407]="RGB",r[r.RG=33319]="RG",r[r.RED=6403]="RED",r[r.RGBA_INTEGER=36249]="RGBA_INTEGER",r[r.RGB_INTEGER=36248]="RGB_INTEGER",r[r.RG_INTEGER=33320]="RG_INTEGER",r[r.RED_INTEGER=36244]="RED_INTEGER",r[r.ALPHA=6406]="ALPHA",r[r.LUMINANCE=6409]="LUMINANCE",r[r.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",r[r.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",r[r.DEPTH_STENCIL=34041]="DEPTH_STENCIL",r))(qr||{}),as=(r=>(r[r.TEXTURE_2D=3553]="TEXTURE_2D",r[r.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",r[r.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",r[r.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",r[r.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",r[r.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",r[r.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",r))(as||{}),zh=(r=>(r[r.CLAMP=33071]="CLAMP",r[r.REPEAT=10497]="REPEAT",r[r.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",r))(zh||{}),D=(r=>(r[r.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",r[r.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",r[r.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",r[r.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",r[r.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",r[r.UNSIGNED_INT=5125]="UNSIGNED_INT",r[r.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",r[r.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",r[r.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",r[r.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",r[r.BYTE=5120]="BYTE",r[r.SHORT=5122]="SHORT",r[r.INT=5124]="INT",r[r.FLOAT=5126]="FLOAT",r[r.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",r[r.HALF_FLOAT=36193]="HALF_FLOAT",r))(D||{});const Nh={uint8x2:{type:D.UNSIGNED_BYTE,size:2,normalised:!1},uint8x4:{type:D.UNSIGNED_BYTE,size:4,normalised:!1},sint8x2:{type:D.BYTE,size:2,normalised:!1},sint8x4:{type:D.BYTE,size:4,normalised:!1},unorm8x2:{type:D.UNSIGNED_BYTE,size:2,normalised:!0},unorm8x4:{type:D.UNSIGNED_BYTE,size:4,normalised:!0},snorm8x2:{type:D.BYTE,size:2,normalised:!0},snorm8x4:{type:D.BYTE,size:4,normalised:!0},uint16x2:{type:D.UNSIGNED_SHORT,size:2,normalised:!1},uint16x4:{type:D.UNSIGNED_SHORT,size:4,normalised:!1},sint16x2:{type:D.SHORT,size:2,normalised:!1},sint16x4:{type:D.SHORT,size:4,normalised:!1},unorm16x2:{type:D.UNSIGNED_SHORT,size:2,normalised:!0},unorm16x4:{type:D.UNSIGNED_SHORT,size:4,normalised:!0},snorm16x2:{type:D.SHORT,size:2,normalised:!0},snorm16x4:{type:D.SHORT,size:4,normalised:!0},float16x2:{type:D.HALF_FLOAT,size:2,normalised:!1},float16x4:{type:D.HALF_FLOAT,size:4,normalised:!1},float32:{type:D.FLOAT,size:1,normalised:!1},float32x2:{type:D.FLOAT,size:2,normalised:!1},float32x3:{type:D.FLOAT,size:3,normalised:!1},float32x4:{type:D.FLOAT,size:4,normalised:!1},uint32:{type:D.UNSIGNED_INT,size:1,normalised:!1},uint32x2:{type:D.UNSIGNED_INT,size:2,normalised:!1},uint32x3:{type:D.UNSIGNED_INT,size:3,normalised:!1},uint32x4:{type:D.UNSIGNED_INT,size:4,normalised:!1},sint32:{type:D.INT,size:1,normalised:!1},sint32x2:{type:D.INT,size:2,normalised:!1},sint32x3:{type:D.INT,size:3,normalised:!1},sint32x4:{type:D.INT,size:4,normalised:!1}};function Wh(r){var e;return(e=Nh[r])!=null?e:Nh.float32}const ls={5126:4,5123:2,5121:1},av={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class us{constructor(e){this._geometryVaoHash={},this._renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!0}contextChange(){this.gl=this._renderer.gl}bind(e,t){const n=this.gl;this._activeGeometry=e;const i=this.getVao(e,t);this._activeVao!==i&&(this._activeVao=i,n.bindVertexArray(i)),this.updateBuffers()}reset(){this.unbind()}updateBuffers(){const e=this._activeGeometry,t=this._renderer.buffer;for(let n=0;n<e.buffers.length;n++){const i=e.buffers[n];t.updateBuffer(i)}}checkCompatibility(e,t){const n=e.attributes,i=t.attributeData;for(const s in i)if(!n[s])throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`)}getSignature(e,t){const n=e.attributes,i=t.attributeData,s=["g",e.uid];for(const o in n)i[o]&&s.push(o,i[o].location);return s.join("-")}getVao(e,t){var n;return((n=this._geometryVaoHash[e.uid])==null?void 0:n[t.key])||this.initGeometryVao(e,t)}initGeometryVao(e,t,n=!0){const i=this._renderer.gl,s=this._renderer.buffer;this._renderer.shader.getProgramData(t),this.checkCompatibility(e,t);const o=this.getSignature(e,t);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]=Object.create(null),e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let l=a[o];if(l)return a[t.key]=l,l;const u=e.buffers,h=e.attributes,c={},d={};for(const f in u)c[f]=0,d[f]=0;for(const f in h)!h[f].size&&t.attributeData[f]?h[f].size=t.attributeData[f].size:h[f].size||console.warn(`PIXI Geometry attribute '${f}' size cannot be determined (likely the bound shader does not have the attribute)`),c[h[f].buffer.uid]+=h[f].size*ls[h[f].type];for(const f in h){const p=h[f],m=p.size;p.stride===void 0&&(c[p.buffer.uid]===m*ls[p.type]?p.stride=0:p.stride=c[p.buffer.uid]),p.start===void 0&&(p.start=d[p.buffer.uid],d[p.buffer.uid]+=m*ls[p.type])}l=i.createVertexArray(),i.bindVertexArray(l);for(let f=0;f<u.length;f++){const p=u[f];s.bind(p)}return this.activateVao(e,t),a[t.key]=l,a[o]=l,i.bindVertexArray(null),l}onGeometryDestroy(e,t){const n=this._geometryVaoHash[e.uid],i=this.gl;if(n){if(t)for(const s in n)this._activeVao!==n[s]&&this.unbind(),i.deleteVertexArray(n[s]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const t=this.gl;for(const n in this._geometryVaoHash){if(e)for(const i in this._geometryVaoHash[n]){const s=this._geometryVaoHash[n];this._activeVao!==s&&this.unbind(),t.deleteVertexArray(s[i])}this._geometryVaoHash[n]=null}}activateVao(e,t){const n=this._renderer.gl,i=this._renderer.buffer,s=e.attributes;e.indexBuffer&&i.bind(e.indexBuffer);let o=null;for(const a in s){const l=s[a],u=l.buffer,h=i.getGlBuffer(u);if(t.attributeData[a]){o!==h&&(i.bind(u),o=h);const c=t.attributeData[a].location;n.enableVertexAttribArray(c);const d=Wh(l.format);if(n.vertexAttribPointer(c,d.size,d.type,d.normalised,l.stride,l.offset),l.instance)if(this.hasInstance)n.vertexAttribDivisor(c,1);else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,t,n,i){const{gl:s}=this._renderer,o=this._activeGeometry,a=av[o.topology||e];if(o.indexBuffer){const l=o.indexBuffer.data.BYTES_PER_ELEMENT,u=l===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;o.instanced?s.drawElementsInstanced(a,t||o.indexBuffer.data.length,u,(n||0)*l,o.instanceCount||1):s.drawElements(a,t||o.indexBuffer.data.length,u,(n||0)*l)}else o.instanced?s.drawArraysInstanced(a,n,t||o.getSize(),i||1):s.drawArrays(a,n,t||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this._renderer=null}}us.extension={type:[x.WebGLSystem],name:"geometry"};const lv=new pe({vertex:`
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
        }`,name:"big-triangle"}),Hh=new Se({glProgram:lv,resources:{uTexture:C.WHITE.source}});class hs{constructor(e){this._useBackBuffer=!1,this._renderer=e}init({useBackBuffer:e}={}){this._useBackBuffer=e}renderStart({target:e,clear:t}){if(this._useBackBuffer){const n=this._renderer.renderTarget.getRenderTarget(e);this._targetTexture=n.colorTexture,e=this._getBackBufferTexture(n.colorTexture)}this._renderer.renderTarget.start(e,t,this._renderer.background.colorRgba)}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){if(!this._useBackBuffer)return;const e=this._renderer,t=e.gl;e.renderTarget.finishRenderPass(),e.renderTarget.bind(this._targetTexture,!1),Hh.resources.uTexture=this._backBufferTexture.source,e.shader.bind(Hh,!1),e.state.set(Ee.for2d()),t.drawArrays(t.TRIANGLES,0,3)}_getBackBufferTexture(e){const t=e.source;return this._backBufferTexture=this._backBufferTexture||new C({source:new le({width:1,height:1,resolution:1,antialias:!1})}),this._backBufferTexture.source.resize(t.width,t.height,t._resolution),this._backBufferTexture}destroy(){}}hs.extension={type:[x.WebGLSystem],name:"backBuffer"};class cs{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}destroy(){}}cs.extension={type:[x.WebGLSystem],name:"colorMask"};class ds{constructor(e){this.commandFinished=Promise.resolve(),this._renderer=e}setGeometry(e,t){this._renderer.geometry.bind(e,t.glProgram)}finishRenderPass(){}draw(e){const t=this._renderer,{geometry:n,shader:i,state:s,skipSync:o,topology:a,size:l,start:u,instanceCount:h}=e;t.shader.bind(i,o),t.geometry.bind(n,t.shader.activeProgram),s&&t.state.set(s),t.geometry.draw(a,l,u,h)}destroy(){}}ds.extension={type:[x.WebGLSystem],name:"encoder"};class Vh{constructor(){this.width=-1,this.height=-1,this.msaaRenderBuffer=[],this.msaa=!1,this.dirtyId=-1}}function fs(r){const e=r.colorTexture.source.resource;return e instanceof HTMLCanvasElement&&document.body.contains(e)}function jh(r,e,t,n,i,s){const o=s?1:-1;return r.identity(),r.a=1/n*2,r.d=o*(1/i*2),r.tx=-1-e*r.a,r.ty=-o-t*r.d,r}var uv=Object.defineProperty,Yh=Object.getOwnPropertySymbols,hv=Object.prototype.hasOwnProperty,cv=Object.prototype.propertyIsEnumerable,Xh=(r,e,t)=>e in r?uv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,qh=(r,e)=>{for(var t in e||(e={}))hv.call(e,t)&&Xh(r,t,e[t]);if(Yh)for(var t of Yh(e))cv.call(e,t)&&Xh(r,t,e[t]);return r};let dv=0;const Kh=class{constructor(r={}){if(this.uid=dv++,this.width=0,this.height=0,this.resolution=1,this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._projectionMatrix=new k,r=qh(qh({},Kh.defaultDescriptor),r),this.width=r.width,this.height=r.height,this.resolution=r.resolution,this.stencil=r.stencil,this._viewport=new q(0,0,this.width,this.height),typeof r.colorTextures=="number")for(let e=0;e<r.colorTextures;e++)this.colorTextures.push(new C({source:new le({width:this.width,height:this.height,resolution:r.resolution,antialias:r.antialias})}));else{this.colorTextures=[...r.colorTextures];const e=this.colorTexture.source;this._resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),r.depthTexture&&(this.depthTexture=new C({source:new le({width:this.width,height:this.height,resolution:this.resolution,format:"stencil8"})}))}get pixelWidth(){return this.width*this.resolution}get pixelHeight(){return this.height*this.resolution}get colorTexture(){return this.colorTextures[0]}get projectionMatrix(){const r=this.colorTexture;return jh(this._projectionMatrix,0,0,r.frameWidth,r.frameHeight,!this.isRoot),this._projectionMatrix}get viewport(){const r=this.colorTexture,e=r.source,t=e.pixelWidth,n=e.pixelHeight,i=this._viewport,s=r.layout.frame;return i.x=s.x*t|0,i.y=s.y*n|0,i.width=s.width*t|0,i.height=s.height*n|0,i}onSourceResize(r){this._resize(r.width,r.height,r._resolution,!0)}_resize(r,e,t=this.resolution,n=!1){this.width=r,this.height=e,this.resolution=t,this.dirtyId++,this.colorTextures.forEach((i,s)=>{n&&s===0||i.source.resize(r,e,t)}),this.depthTexture&&this.depthTexture.source.resize(r,e,t)}destroy(){throw new Error("Method not implemented.")}};let _t=Kh;_t.defaultDescriptor={width:0,height:0,resolution:1,colorTextures:1,stencil:!0,antialias:!1};class Kr{constructor(e){this.items=[],this._name=e}emit(e,t,n,i,s,o,a,l){const{name:u,items:h}=this;for(let c=0,d=h.length;c<d;c++)h[c][u](e,t,n,i,s,o,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}class Zh extends le{constructor(e){e.resource||(e.resource=$.ADAPTER.createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),super(e),this.type="image",this.alphaMode=0,this.autoDensity=e.autoDensity;const t=e.resource;(this.pixelWidth!==t.width||this.pixelWidth!==t.height)&&this.resizeCanvas()}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight}resize(e=this.width,t=this.height,n=this._resolution){super.resize(e,t,n),this.resizeCanvas()}}var fv=Object.defineProperty,Qh=Object.getOwnPropertySymbols,pv=Object.prototype.hasOwnProperty,gv=Object.prototype.propertyIsEnumerable,Jh=(r,e,t)=>e in r?fv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,mv=(r,e)=>{for(var t in e||(e={}))pv.call(e,t)&&Jh(r,t,e[t]);if(Qh)for(var t of Qh(e))gv.call(e,t)&&Jh(r,t,e[t]);return r};const ps=new Map;function Zr(r,e){if(!ps.has(r)){const t=new C({source:new Zh(mv({resource:r},e))});ps.set(r,t)}return ps.get(r)}class gs{constructor(e){this.onRenderTargetChange=new Kr("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._clearColorCache=[0,0,0,0],this._viewPortCache={x:0,y:0,width:0,height:0},this.rootProjectionMatrix=new k,this._renderer=e}contextChange(e){this._gl=e}start(e,t=!0,n){this._renderTargetStack.length=0;const i=this.getRenderTarget(e);this.rootRenderTarget=i,this.renderingToScreen=fs(this.rootRenderTarget),this.rootProjectionMatrix=i.projectionMatrix,this.push(i,t,n)}bind(e,t=!0,n){const i=this.getRenderTarget(e);this.renderTarget=i;const s=this._getGpuRenderTarget(i);i.dirtyId!==s.dirtyId&&(s.dirtyId=i.dirtyId,this._resizeGpuRenderTarget(i));const o=this._gl;o.bindFramebuffer(o.FRAMEBUFFER,s.framebuffer),i.colorTextures.forEach(h=>{this._renderer.texture.unbind(h)});const a=i.viewport;let l=a.y;i.isRoot&&(l=this._renderer.view.element.height-a.height);const u=this._viewPortCache;return(u.x!==a.x||u.y!==l||u.width!==a.width||u.height!==a.height)&&(u.x=a.x,u.y=l,u.width=a.width,u.height=a.height,o.viewport(a.x,l,a.width,a.height)),this.clear(t,n),this.onRenderTargetChange.emit(i),i}clear(e,t){if(!e)return;typeof e=="boolean"&&(e=e?ge.ALL:ge.NONE);const n=this._gl;if(e&ge.COLOR){t=t!=null?t:this._defaultClearColor;const i=this._clearColorCache;(i[0]!==t[0]||i[1]!==t[1]||i[2]!==t[2]||i[3]!==t[3])&&(i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[3],n.clearColor(t[0],t[1],t[2],t[3]))}n.clear(e)}getGpuColorTexture(e){return e.colorTexture}push(e,t=!0,n){const i=this.bind(e,t,n);return this._renderTargetStack.push(i),i}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=Zr(e)),e instanceof _t?t=e:e instanceof C&&(t=new _t({colorTextures:[e]}),e.source.resource instanceof HTMLCanvasElement&&(t.isRoot=!0),e.source.on("destroy",()=>{t.destroy()})),this._renderSurfaceToRenderTargetHash.set(e,t),t}finishRenderPass(){const e=this._getGpuRenderTarget(this.renderTarget);if(!e.msaa)return;const t=this._renderer.gl;t.bindFramebuffer(t.FRAMEBUFFER,e.resolveTargetFramebuffer),t.bindFramebuffer(t.READ_FRAMEBUFFER,e.framebuffer),t.blitFramebuffer(0,0,e.width,e.height,0,0,e.width,e.height,t.COLOR_BUFFER_BIT,t.NEAREST),t.bindFramebuffer(t.FRAMEBUFFER,e.framebuffer),t.bindFramebuffer(t.READ_FRAMEBUFFER,null)}copyToTexture(e,t,n,i){const s=this._renderer,o=s.renderTarget.getGpuColorTexture(e);s.renderTarget.bind(o,!1),s.texture.bind(t,0);const a=s.gl;return a.copyTexSubImage2D(a.TEXTURE_2D,0,0,0,n.x,n.y,i.width,i.height),t}_getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){const t=this._renderer.gl,n=new Vh;return e.colorTexture.source.resource instanceof HTMLCanvasElement?(this._gpuRenderTargetHash[e.uid]=n,n.framebuffer=null,n):(this._initColor(e,n),e.stencil&&this._initStencil(n),t.bindFramebuffer(t.FRAMEBUFFER,null),this._gpuRenderTargetHash[e.uid]=n,n)}_resizeGpuRenderTarget(e){if(e.isRoot)return;const t=this._getGpuRenderTarget(e);this._resizeColor(e,t),e.stencil&&this._resizeStencil(t)}_initColor(e,t){const n=this._renderer,i=n.gl,s=i.createFramebuffer();if(t.resolveTargetFramebuffer=s,i.bindFramebuffer(i.FRAMEBUFFER,s),t.width=e.colorTexture.source.pixelWidth,t.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((o,a)=>{const l=o.source;l.antialias&&(t.msaa=!0),n.texture.bindSource(l,0);const u=n.texture.getGlSource(l).texture;i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+a,3553,u,0)}),t.msaa){const o=i.createFramebuffer();t.framebuffer=o,i.bindFramebuffer(i.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=i.createRenderbuffer();t.msaaRenderBuffer[l]=u})}else t.framebuffer=s}_resizeColor(e,t){const n=e.colorTexture.source;if(t.width=n.pixelWidth,t.height=n.pixelHeight,e.colorTextures.forEach((i,s)=>{s!==0&&i.source.resize(n.width,n.height,n._resolution)}),t.msaa){const i=this._renderer,s=i.gl,o=t.framebuffer;s.bindFramebuffer(s.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=a.source;i.texture.bindSource(u,0);const h=i.texture.getGlSource(u).internalFormat,c=t.msaaRenderBuffer[l];s.bindRenderbuffer(s.RENDERBUFFER,c),s.renderbufferStorageMultisample(s.RENDERBUFFER,4,h,u.pixelWidth,u.pixelHeight),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+l,s.RENDERBUFFER,c)})}}_initStencil(e){const t=this._renderer.gl,n=t.createRenderbuffer();e.depthStencilRenderBuffer=n,t.bindRenderbuffer(t.RENDERBUFFER,n),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,n)}_resizeStencil(e){const t=this._renderer.gl;t.bindRenderbuffer(t.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?t.renderbufferStorageMultisample(t.RENDERBUFFER,4,t.DEPTH24_STENCIL8,e.width,e.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH24_STENCIL8,e.width,e.height)}destroy(){}}gs.extension={type:[x.WebGLSystem],name:"renderTarget"};const Pe=[];Pe[te.NONE]=void 0,Pe[te.DISABLED]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilReadMask:0,stencilBack:{compare:"always",passOp:"keep"}},Pe[te.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},Pe[te.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},Pe[te.RENDERING_MASK_REMOVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"decrement-clamp"}},Pe[te.MASK_ACTIVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilBack:{compare:"equal",passOp:"keep"}};class ms{constructor(e){this._stencilCache={enabled:!1,stencilReference:0,stencilMode:te.NONE},this._renderTargetStencilState=Object.create(null),e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this._gl=e,this._comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this._stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP}}onRenderTargetChange(e){if(this._activeRenderTarget===e)return;this._activeRenderTarget=e;let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:te.DISABLED,stencilReference:0}),this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const n=this._renderTargetStencilState[this._activeRenderTarget.uid],i=this._gl,s=Pe[e],o=this._stencilCache;if(n.stencilMode=e,n.stencilReference=t,e===te.DISABLED){this._stencilCache.enabled&&(this._stencilCache.enabled=!1,i.disable(i.STENCIL_TEST));return}this._stencilCache.enabled||(this._stencilCache.enabled=!0,i.enable(i.STENCIL_TEST)),(e!==o.stencilMode||o.stencilReference!==t)&&(o.stencilMode=e,o.stencilReference=t,i.stencilFunc(this._comparisonFuncMapping[s.stencilBack.compare],t,255),i.stencilOp(i.KEEP,i.KEEP,this._stencilOpsMapping[s.stencilBack.passOp]))}destroy(){}}ms.extension={type:[x.WebGLSystem],name:"stencil"};class vv{}class ec{constructor(e,t){this.program=e,this.uniformData=t,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}class Qr extends ie{constructor({buffer:e,offset:t,size:n}){super(),this.uid=rt(),this.resourceType="bufferResource",this.resourceId=rt(),this.bufferResource=!0,this.buffer=e,this.offset=t,this.size=n,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this.resourceId=rt(),this.emit("change",this)}destroy(e=!1){e&&this.buffer.destroy(),this.buffer=null}}function vs(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}function bs(r){const e=new Array(r);for(let t=0;t<e.length;t++)e[t]=!1;return e}function ys(r,e){switch(r){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return bs(2*e);case"bvec3":return bs(3*e);case"bvec4":return bs(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const bv={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function tc(r){return bv[r]}let Jr=null;const rc={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function xs(r,e){if(!Jr){const t=Object.keys(rc);Jr={};for(let n=0;n<t.length;++n){const i=t[n];Jr[r[i]]=rc[i]}}return Jr[e]}function nc(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=e.getActiveAttrib(r,i);if(s.name.startsWith("gl_"))continue;const o=xs(e,s.type),a={type:o,name:s.name,size:tc(o),location:e.getAttribLocation(r,s.name)};t[s.name]=a}return t}function ic(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_UNIFORM_BLOCKS);for(let i=0;i<n;i++){const s=e.getActiveUniformBlockName(r,i),o=e.getUniformBlockIndex(r,s),a=e.getActiveUniformBlockParameter(r,i,e.UNIFORM_BLOCK_DATA_SIZE);t[s]={name:s,index:o,size:a}}return t}function sc(r,e){const t={},n=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let i=0;i<n;i++){const s=e.getActiveUniform(r,i),o=s.name.replace(/\[.*?\]$/,""),a=!!s.name.match(/\[.*?\]$/),l=xs(e,s.type);t[o]={name:o,index:i,type:l,size:s.size,isArray:a,value:ys(l,s.size)}}return t}function oc(r,e){const t=r.getShaderSource(e).split(`
`).map((u,h)=>`${h}: ${u}`),n=r.getShaderInfoLog(e),i=n.split(`
`),s={},o=i.map(u=>parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(u=>u&&!s[u]?(s[u]=!0,!0):!1),a=[""];o.forEach(u=>{t[u-1]=`%c${t[u-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const l=t.join(`
`);a[0]=l,console.error(n),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function ac(r,e,t,n){r.getProgramParameter(e,r.LINK_STATUS)||(r.getShaderParameter(t,r.COMPILE_STATUS)||oc(r,t),r.getShaderParameter(n,r.COMPILE_STATUS)||oc(r,n),console.error("PixiJS Error: Could not initialize shader."),r.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",r.getProgramInfoLog(e)))}function lc(r,e){const t=vs(r,r.VERTEX_SHADER,e.vertex),n=vs(r,r.FRAGMENT_SHADER,e.fragment),i=r.createProgram();r.attachShader(i,t),r.attachShader(i,n);const s=e.transformFeedbackVaryings;s&&(typeof r.transformFeedbackVaryings!="function"||r.transformFeedbackVaryings(i,s.names,s.bufferMode==="separate"?r.SEPARATE_ATTRIBS:r.INTERLEAVED_ATTRIBS)),r.linkProgram(i),r.getProgramParameter(i,r.LINK_STATUS)||ac(r,i,t,n),e.attributeData=nc(i,r),e.uniformData=sc(i,r),e.uniformBlockData=ic(i,r),r.deleteShader(t),r.deleteShader(n);const o={};for(const a in e.uniformData){const l=e.uniformData[a];o[a]={location:r.getUniformLocation(i,a),value:ys(l.type,l.size)}}return new ec(i,o)}const ke={textureCount:0,blockIndex:0};class _s{constructor(e){this.activeProgram=null,this._programDataHash=Object.create(null),this._nextIndex=0,this._boundUniformsIdsToIndexHash=Object.create(null),this._boundIndexToUniformsHash=Object.create(null),this._renderer=e}contextChange(e){this._gl=e,this._maxBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}bind(e,t){if(this._setProgram(e.glProgram),t)return;ke.textureCount=0,ke.blockIndex=0;const n=this._gl,i=this.getProgramData(e.glProgram);for(const s in e.groups){const o=e.groups[s];for(const a in o.resources){const l=o.resources[a];if(l instanceof Q)l.ubo?this.bindUniformBlock(l,e.uniformBindMap[s][a],ke.blockIndex++):this._updateUniformGroup(l);else if(l instanceof Qr)this.bindUniformBlock(l,e.uniformBindMap[s][a],ke.blockIndex++);else if(l instanceof le){this._renderer.texture.bind(l,ke.textureCount);const u=e.uniformBindMap[s][a],h=i.uniformData[u];h&&(h.value!==ke.textureCount&&n.uniform1i(h.location,ke.textureCount),ke.textureCount++)}else l instanceof He}}}_updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this.activeProgram,ke)}bindUniformBlock(e,t,n=0){const i=this._renderer.buffer,s=this.getProgramData(this.activeProgram),o=e.bufferResource;o&&this._renderer.uniformBuffer.updateUniformGroup(e),i.updateBuffer(e.buffer);let a=this._boundUniformsIdsToIndexHash[e.uid];if(a===void 0){const h=this._nextIndex++%this._maxBindings,c=this._boundIndexToUniformsHash[h];c&&(this._boundUniformsIdsToIndexHash[c.uid]=void 0),a=this._boundUniformsIdsToIndexHash[e.uid]=h,this._boundIndexToUniformsHash[h]=e,o?i.bindBufferRange(e.buffer,h,e.offset):i.bindBufferBase(e.buffer,h)}const l=this._gl,u=this.activeProgram.uniformBlockData[t].index;s.uniformBlockBindings[n]!==a&&(s.uniformBlockBindings[n]=a,l.uniformBlockBinding(s.program,u,a))}_setProgram(e){if(this.activeProgram===e)return;this.activeProgram=e;const t=this.getProgramData(e);this._gl.useProgram(t.program)}getProgramData(e){const t=e.key;return this._programDataHash[t]||this._createProgramData(e)}_createProgramData(e){const t=e.key;return this._programDataHash[t]=lc(this._gl,e),this._programDataHash[t]}}_s.extension={type:[x.WebGLSystem],name:"shader"};let ir;function yv(){if(typeof ir=="boolean")return ir;try{ir=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch(r){ir=!1}return ir}const en=[{test:r=>r.type==="float"&&r.size===1&&!r.isArray,code:r=>`
            if(uv["${r}"] !== ud["${r}"].value)
            {
                ud["${r}"].value = uv["${r}"]
                gl.uniform1f(ud["${r}"].location, uv["${r}"])
            }
            `},{test:(r,e)=>(r.type==="sampler2D"||r.type==="samplerCube"||r.type==="sampler2DArray")&&r.size===1&&!r.isArray&&(e==null||e instanceof C),code:r=>`t = syncData.textureCount++;

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
                }`}],xv={float:`
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
    }`},_v={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"};function uc(r,e){const t=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(const n in r.uniforms){const i=e[n];if(!i){r.uniforms[n]instanceof Q?r.uniforms[n].ubo?t.push(`
                        renderer.shader.bindUniformBlock(uv.${n}, "${n}");
                    `):t.push(`
                        renderer.shader.updateUniformGroup(uv.${n});
                    `):r.uniforms[n]instanceof Qr&&t.push(`
                        renderer.shader.bindBufferResource(uv.${n}, "${n}");
                    `);continue}const s=r.uniforms[n];let o=!1;for(let a=0;a<en.length;a++)if(en[a].test(i,s)){t.push(en[a].code(n,s)),o=!0;break}if(!o){const a=(i.size===1&&!i.isArray?xv:_v)[i.type].replace("location",`ud["${n}"].location`);t.push(`
            cu = ud["${n}"];
            cv = cu.value;
            v = uv["${n}"];
            ${a};`)}}return new Function("ud","uv","renderer","syncData",t.join(`
`))}class ws{constructor(e){this.destroyed=!1,this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this._systemCheck(),this.gl=null,this._cache={}}_systemCheck(){if(!yv())throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(e){this.gl=e}updateUniformGroup(e,t,n){const i=this._renderer.shader.getProgramData(t);(!e.isStatic||e.dirtyId!==i.uniformDirtyGroups[e.uid])&&(i.uniformDirtyGroups[e.uid]=e.dirtyId,this._getUniformSyncFunction(e,t)(i.uniformData,e.uniforms,this._renderer,n))}_getUniformSyncFunction(e,t){var n;return((n=this._uniformGroupSyncHash[e.signature])==null?void 0:n[t.key])||this._createUniformSyncFunction(e,t)}_createUniformSyncFunction(e,t){const n=this._uniformGroupSyncHash[e.signature]||(this._uniformGroupSyncHash[e.signature]={}),i=this._getSignature(e,t.uniformData,"u");return this._cache[i]||(this._cache[i]=uc(e,t.uniformData)),n[t.key]=this._cache[i],n[t.key]}_getSignature(e,t,n){const i=e.uniforms,s=[`${n}-`];for(const o in i)s.push(o),t[o]&&s.push(t[o].type);return s.join("-")}destroy(){this._renderer=null,this.destroyed=!0}}ws.extension={type:[x.WebGLSystem],name:"uniformGroup"};function wv(r){return r=r.replaceAll("texture2D","texture").replaceAll("gl_FragColor","fragColor").replaceAll("varying","in"),r=`
        out vec4 fragColor;
    ${r}
    `,r}function hc(r){const e={};return e.normal=[r.ONE,r.ONE_MINUS_SRC_ALPHA],e.add=[r.ONE,r.ONE],e.multiply=[r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.screen=[r.ONE,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[r.SRC_ALPHA,r.ONE,r.ONE,r.ONE],e["screen-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.erase=[r.ZERO,r.ONE_MINUS_SRC_ALPHA],e}const Tv=0,Sv=1,Pv=2,Ev=3,Av=4,Mv=5,Ts=class{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[Tv]=this.setBlend,this.map[Sv]=this.setOffset,this.map[Pv]=this.setCullFace,this.map[Ev]=this.setDepthTest,this.map[Av]=this.setFrontFace,this.map[Mv]=this.setDepthMask,this.checks=[],this.defaultState=new Ee,this.defaultState.blend=!0}contextChange(r){this.gl=r,this.blendModesMap=hc(r),this.set(this.defaultState),this.reset()}set(r){if(r=r||this.defaultState,this.stateId!==r.data){let e=this.stateId^r.data,t=0;for(;e;)e&1&&this.map[t].call(this,!!(r.data&1<<t)),e=e>>1,t++;this.stateId=r.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,r)}forceState(r){r=r||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(r.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,r);this.stateId=r.data}setBlend(r){this._updateCheck(Ts._checkBlendMode,r),this.gl[r?"enable":"disable"](this.gl.BLEND)}setOffset(r){this._updateCheck(Ts._checkPolygonOffset,r),this.gl[r?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(r){this.gl[r?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(r){this.gl.depthMask(r)}setCullFace(r){this.gl[r?"enable":"disable"](this.gl.CULL_FACE)}setFrontFace(r){this.gl.frontFace(this.gl[r?"CW":"CCW"])}setBlendMode(r){if(this.blendModesMap[r]||(r="normal"),r===this.blendMode)return;this.blendMode=r;const e=this.blendModesMap[r],t=this.gl;e.length===2?t.blendFunc(e[0],e[1]):t.blendFuncSeparate(e[0],e[1],e[2],e[3]),e.length===6?(this._blendEq=!0,t.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD))}setPolygonOffset(r,e){this.gl.polygonOffset(r,e)}reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}_updateCheck(r,e){const t=this.checks.indexOf(r);e&&t===-1?this.checks.push(r):!e&&t!==-1&&this.checks.splice(t,1)}static _checkBlendMode(r,e){r.setBlendMode(e.blendMode)}static _checkPolygonOffset(r,e){r.setPolygonOffset(1,e.polygonOffset)}destroy(){this.gl=null}};let Ss=Ts;Ss.extension={type:[x.WebGLSystem],name:"state"};class cc{constructor(e){this.target=as.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=D.UNSIGNED_BYTE,this.internalFormat=qr.RGBA,this.format=qr.RGBA,this.samplerType=0}}const dc={type:"image",upload(r,e,t){e.width===r.width||e.height===r.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,r.width,r.height,0,e.format,e.type,r.resource),e.width=r.width,e.height=r.height}},fc={type:"image",upload(r,e,t){t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.alphaMode!==0),e.width===r.width||e.height===r.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,r.pixelWidth,r.pixelHeight,0,e.format,e.type,r.resource),e.width=r.pixelWidth,e.height=r.pixelHeight}};function pc(r){return{r8unorm:r.RED,r8snorm:r.RED,r8uint:r.RED,r8sint:r.RED,r16uint:r.RED,r16sint:r.RED,r16float:r.RED,rg8unorm:r.RG,rg8snorm:r.RG,rg8uint:r.RG,rg8sint:r.RG,r32uint:r.RED,r32sint:r.RED,r32float:r.RED,rg16uint:r.RG,rg16sint:r.RG,rg16float:r.RG,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.RGBA,rgba8snorm:r.RGBA,rgba8uint:r.RGBA,rgba8sint:r.RGBA,bgra8unorm:r.RGBA,"bgra8unorm-srgb":r.RGBA,rgb9e5ufloat:r.RGB,rgb10a2unorm:r.RGBA,rg11b10ufloat:r.RGB,rg32uint:r.RG,rg32sint:r.RG,rg32float:r.RG,rgba16uint:r.RGBA,rgba16sint:r.RGBA,rgba16float:r.RGBA,rgba32uint:r.RGBA,rgba32sint:r.RGBA,rgba32float:r.RGBA,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT,depth24plus:r.DEPTH_COMPONENT,"depth24plus-stencil8":r.DEPTH_STENCIL,depth32float:r.DEPTH_COMPONENT,"depth32float-stencil8":r.DEPTH_STENCIL}}function gc(r){return{r8unorm:r.R8,r8snorm:r.R8_SNORM,r8uint:r.R8UI,r8sint:r.R8I,r16uint:r.R16UI,r16sint:r.R16I,r16float:r.R16F,rg8unorm:r.RG8,rg8snorm:r.RG8_SNORM,rg8uint:r.RG8UI,rg8sint:r.RG8I,r32uint:r.R32UI,r32sint:r.R32I,r32float:r.R32F,rg16uint:r.RG16UI,rg16sint:r.RG16I,rg16float:r.RG16F,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.SRGB8_ALPHA8,rgba8snorm:r.RGBA8_SNORM,rgba8uint:r.RGBA8UI,rgba8sint:r.RGBA8I,bgra8unorm:r.RGBA8,"bgra8unorm-srgb":r.SRGB8_ALPHA8,rgb9e5ufloat:r.RGB9_E5,rgb10a2unorm:r.RGB10_A2,rg11b10ufloat:r.R11F_G11F_B10F,rg32uint:r.RG32UI,rg32sint:r.RG32I,rg32float:r.RG32F,rgba16uint:r.RGBA16UI,rgba16sint:r.RGBA16I,rgba16float:r.RGBA16F,rgba32uint:r.RGBA32UI,rgba32sint:r.RGBA32I,rgba32float:r.RGBA32F,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT16,depth24plus:r.DEPTH_COMPONENT24,"depth24plus-stencil8":r.DEPTH24_STENCIL8,depth32float:r.DEPTH_COMPONENT32F,"depth32float-stencil8":r.DEPTH32F_STENCIL8}}function mc(r){return{r8unorm:r.UNSIGNED_BYTE,r8snorm:r.BYTE,r8uint:r.UNSIGNED_BYTE,r8sint:r.BYTE,r16uint:r.UNSIGNED_SHORT,r16sint:r.SHORT,r16float:r.HALF_FLOAT,rg8unorm:r.UNSIGNED_BYTE,rg8snorm:r.BYTE,rg8uint:r.UNSIGNED_BYTE,rg8sint:r.BYTE,r32uint:r.UNSIGNED_INT,r32sint:r.INT,r32float:r.FLOAT,rg16uint:r.UNSIGNED_SHORT,rg16sint:r.SHORT,rg16float:r.HALF_FLOAT,rgba8unorm:r.UNSIGNED_BYTE,"rgba8unorm-srgb":r.UNSIGNED_BYTE,rgba8snorm:r.BYTE,rgba8uint:r.UNSIGNED_BYTE,rgba8sint:r.BYTE,bgra8unorm:r.UNSIGNED_BYTE,"bgra8unorm-srgb":r.UNSIGNED_BYTE,rgb9e5ufloat:r.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:r.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:r.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:r.UNSIGNED_INT,rg32sint:r.INT,rg32float:r.FLOAT,rgba16uint:r.UNSIGNED_SHORT,rgba16sint:r.SHORT,rgba16float:r.HALF_FLOAT,rgba32uint:r.UNSIGNED_INT,rgba32sint:r.INT,rgba32float:r.FLOAT,stencil8:r.UNSIGNED_BYTE,depth16unorm:r.UNSIGNED_SHORT,depth24plus:r.UNSIGNED_INT,"depth24plus-stencil8":r.UNSIGNED_INT_24_8,depth32float:r.FLOAT,"depth32float-stencil8":r.FLOAT_32_UNSIGNED_INT_24_8_REV}}const Ps={linear:9729,nearest:9728},vc={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},tn={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},bc={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};class Es{constructor(e){this._glTextures=Object.create(null),this._glSamplers=Object.create(null),this._boundTextures=[],this._activeTextureLocation=-1,this._boundSamplers=Object.create(null),this._uploads={image:fc,buffer:dc},this._renderer=e}contextChange(e){this._gl=e,this._mapFormatToInternalFormat||(this._mapFormatToInternalFormat=gc(e),this._mapFormatToType=mc(e),this._mapFormatToFormat=pc(e));for(let t=0;t<16;t++)this.bind(C.EMPTY,t)}bind(e,t=0){e?(this.bindSource(e.source,t),this._bindSampler(e.style,t)):(this.bindSource(null,t),this._bindSampler(null,t))}bindSource(e,t=0){const n=this._gl;if(this._boundTextures[t]!==e){this._boundTextures[t]=e,this._activateLocation(t),e=e||C.EMPTY.source;const i=this.getGlSource(e);n.bindTexture(i.target,i.texture)}}_bindSampler(e,t=0){const n=this._gl;if(!e){this._boundSamplers[t]=null,n.bindSampler(t,null);return}const i=this._getGlSampler(e);this._boundSamplers[t]!==i&&(this._boundSamplers[t]=i,n.bindSampler(t,i))}unbind(e){const t=e.source,n=this._boundTextures,i=this._gl;for(let s=0;s<n.length;s++)if(n[s]===t){this._activateLocation(s);const o=this.getGlSource(t);i.bindTexture(o.target,null),n[s]=null}}_activateLocation(e){this._activeTextureLocation!==e&&(this._activeTextureLocation=e,this._gl.activeTexture(this._gl.TEXTURE0+e))}_initSource(e){const t=this._gl,n=new cc(t.createTexture());if(n.type=this._mapFormatToType[e.format],n.internalFormat=this._mapFormatToInternalFormat[e.format],n.format=this._mapFormatToFormat[e.format],e.autoGenerateMipmaps){const i=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(i))+1}return this._glTextures[e.uid]=n,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceUpdate,this),e.on("destroy",this.onSourceDestroy,this),this.onSourceUpdate(e),n}onSourceUpdate(e){const t=this._gl,n=this._glTextures[e.uid];t.bindTexture(t.TEXTURE_2D,n.texture),this._boundTextures[this._activeTextureLocation]=e,this._uploads[e.type]?(this._uploads[e.type].upload(e,n,this._gl),e.autoGenerateMipmaps&&e.mipLevelCount>1&&t.generateMipmap(n.target)):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.pixelWidth,e.pixelHeight,0,t.RGBA,t.UNSIGNED_BYTE,null)}onSourceDestroy(e){const t=this._gl;e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this);const n=this._glTextures[e.uid];delete this._glTextures[e.uid],t.deleteTexture(n.target)}_initSampler(e){const t=this._gl,n=this._gl.createSampler();if(this._glSamplers[e.resourceId]=n,t.samplerParameteri(n,t.TEXTURE_WRAP_S,tn[e.addressModeU]),t.samplerParameteri(n,t.TEXTURE_WRAP_T,tn[e.addressModeV]),t.samplerParameteri(n,t.TEXTURE_WRAP_R,tn[e.addressModeW]),t.samplerParameteri(n,t.TEXTURE_MAG_FILTER,Ps[e.minFilter]),this._boundTextures[this._activeTextureLocation].mipLevelCount>1){const s=vc[e.minFilter][e.mipmapFilter];t.samplerParameteri(n,t.TEXTURE_MIN_FILTER,s)}else t.samplerParameteri(n,t.TEXTURE_MIN_FILTER,Ps[e.magFilter]);const i=this._renderer.context.extensions.anisotropicFiltering;if(i&&e.maxAnisotropy>1){const s=Math.min(e.maxAnisotropy,t.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));t.samplerParameteri(n,i.TEXTURE_MAX_ANISOTROPY_EXT,s)}return e.compare&&t.samplerParameteri(n,t.TEXTURE_COMPARE_FUNC,bc[e.compare]),this._glSamplers[e.resourceId]}_getGlSampler(e){return this._glSamplers[e.resourceId]||this._initSampler(e)}getGlSource(e){return this._glTextures[e.uid]||this._initSource(e)}destroy(){throw new Error("Method not implemented.")}}Es.extension={type:[x.WebGLSystem],name:"texture"};var Cv=Object.defineProperty,yc=Object.getOwnPropertySymbols,Bv=Object.prototype.hasOwnProperty,Rv=Object.prototype.propertyIsEnumerable,xc=(r,e,t)=>e in r?Cv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,_c=(r,e)=>{for(var t in e||(e={}))Bv.call(e,t)&&xc(r,t,e[t]);if(yc)for(var t of yc(e))Rv.call(e,t)&&xc(r,t,e[t]);return r};const kv=["init","destroy","contextChange","reset","renderEnd","renderStart","render","update","postrender","prerender"];class As{constructor(e){this.runners=Object.create(null),this.renderPipes=Object.create(null),this._systemsHash=Object.create(null);var t;this.type=e.type,this.name=e.name;const n=[...kv,...(t=e.runners)!=null?t:[]];this._addRunners(...n),this._addSystems(e.systems),this._addPipes(e.renderPipes,e.renderPipeAdaptors)}async init(e={}){for(const t in this._systemsHash){const n=this._systemsHash[t].constructor.defaultOptions;e=_c(_c({},n),e)}for(let t=0;t<this.runners.init.items.length;t++)await this.runners.init.items[t].init(e)}render(...e){let t=e[0];t instanceof J&&(t={container:t},e[1]&&(z(N,"passing target as a second argument is deprecated, please use render options instead"),t.target=e[1])),t.target||(t.target=this.view.texture),this._lastObjectRendered=t.container,this.runners.prerender.emit(t),this.runners.renderStart.emit(t),this.runners.render.emit(t),this.runners.renderEnd.emit(t),this.runners.postrender.emit(t)}resize(e,t,n){this.view.resize(e,t,n)}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e}get width(){return this.view.texture.frameWidth}get height(){return this.view.texture.frameHeight}get element(){return this.view.element}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(t=>{this.runners[t]=new Kr(t)})}_addSystems(e){let t;for(t in e){const n=e[t];this._addSystem(n.value,n.name)}}_addSystem(e,t){const n=new e(this);if(this[t])throw new Error(`Whoops! The name "${t}" is already in use`);this[t]=n,this._systemsHash[t]=n;for(const i in this.runners)this.runners[i].add(n);return this}_addPipes(e,t){const n=t.reduce((i,s)=>(i[s.name]=s.value,i),{});e.forEach(i=>{const s=i.value,o=i.name,a=n[o];this.renderPipes[o]=new s(this,a?new a:null)})}destroy(){Object.values(this.runners).forEach(t=>{t.destroy()}),this._systemsHash=null;const e=this;e.renderPipes=null,e.runners=null}}class rn extends ie{constructor({original:e,view:t}){super(),this.uid=Vn(),this.didViewUpdate=!1,this.view=t,e&&this.init(e)}init(e){this._original=e,this.layerTransform=e.layerTransform}get layerColor(){return this._original.layerColor}get layerBlendMode(){return this._original.layerBlendMode}get layerVisibleRenderable(){return this._original.layerVisibleRenderable}get isRenderable(){return this._original.isRenderable}}class Ms extends yt{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}var wc=`precision lowp float;

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
`,Tc=`precision lowp float;

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
`,Cs=`struct GlobalUniforms {
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

}`;class Sc extends Se{constructor(e){const t=pe.from({vertex:Tc,fragment:wc,name:"tiling-sprite"}),n=fe.from({vertex:{source:Cs,entryPoint:"mainVertex"},fragment:{source:Cs,entryPoint:"mainFragment"}}),i=new Q({uMapCoord:{value:new k,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new k,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,200,.5,.5]),type:"vec4<f32>"}});super({glProgram:t,gpuProgram:n,resources:{tilingUniforms:i,uTexture:e.texture.source,uSampler:e.texture.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.style)}}const Ov=new Ms;class Bs{constructor(e){this._renderableHash=Object.create(null),this._gpuBatchedTilingSprite=Object.create(null),this._gpuTilingSprite=Object.create(null),this._renderer=e}validateRenderable(e){const t=e.view.texture.textureMatrix;let n=!1;const i=this._getRenderableData(e);return i.batched!==t.isSimple&&(i.batched=t.isSimple,n=!0),n}addRenderable(e,t){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:n}=this._getRenderableData(e);if(n){const i=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(i,t)}else{const i=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(i.meshRenderable,t)}}updateRenderable(e){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:t}=this._getRenderableData(e);if(t){const n=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(n)}else{const n=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(n.meshRenderable)}}destroyRenderable(e){this._renderableHash[e.uid]=null,this._gpuTilingSprite[e.uid]=null,this._gpuBatchedTilingSprite[e.uid]=null}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t={batched:!0};return this._renderableHash[e.uid]=t,this.validateRenderable(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}_rebuild(e){const t=this._getRenderableData(e),n=e.view,i=n.texture.textureMatrix;if(t.batched){const s=this._getBatchedTilingSprite(e);s.view.texture=n.texture,n.texture.style.addressMode="repeat",n.texture.style.update(),this._updateBatchPositions(e),this._updateBatchUvs(e)}else{const s=this._getGpuTilingSprite(e),{meshRenderable:o}=s,a=o.view;a.shader.texture=n.texture;const l=a.shader.resources.tilingUniforms,u=n.width,h=n.height,c=n.texture.width,d=n.texture.height,f=n._tileTransform.matrix,p=l.uniforms.uTextureTransform;p.set(f.a*c/u,f.b*c/h,f.c*d/u,f.d*d/h,f.tx/u,f.ty/h),p.invert(),l.uniforms.uMapCoord=i.mapCoord,l.uniforms.uClampFrame=i.uClampFrame,l.uniforms.uClampOffset=i.uClampOffset,l.uniforms.uTextureTransform=p,l.uniforms.uSizeAnchor[0]=u,l.uniforms.uSizeAnchor[1]=h,l.uniforms.uSizeAnchor[2]=e.view.anchor.x,l.uniforms.uSizeAnchor[3]=e.view.anchor.y,l.update()}}_getGpuTilingSprite(e){return this._gpuTilingSprite[e.uid]||this._initGpuTilingSprite(e)}_initGpuTilingSprite(e){const t=e.view;t.texture.style.addressMode="repeat",t.texture.style.update();const n=new Zt({geometry:Ov,shader:new Sc({texture:t.texture})}),i=new rn({original:e,view:n}),s=new k,o={meshRenderable:i,textureMatrix:s};return this._gpuTilingSprite[e.uid]=o,o}_getBatchedTilingSprite(e){return this._gpuBatchedTilingSprite[e.uid]||this._initBatchedTilingSprite(e)}_initBatchedTilingSprite(e){const t=new Zt({geometry:new Ms,texture:e.view.texture}),n=new rn({original:e,view:t});return this._gpuBatchedTilingSprite[e.uid]=n,n}_updateBatchPositions(e){const t=this._getBatchedTilingSprite(e),n=e.view,i=t.view.geometry.getBuffer("aPosition").data,s=n.anchor.x,o=n.anchor.y;i[0]=-s*n.width,i[1]=-o*n.height,i[2]=(1-s)*n.width,i[3]=-o*n.height,i[4]=(1-s)*n.width,i[5]=(1-o)*n.height,i[6]=-s*n.width,i[7]=(1-o)*n.height}_updateBatchUvs(e){const t=e.view,n=t.texture.frameWidth,i=t.texture.frameHeight,s=this._getBatchedTilingSprite(e).view.geometry.getBuffer("aUV").data;let o=0,a=0;t._applyAnchorToTexture&&(o=t.anchor.x,a=t.anchor.y),s[0]=s[6]=-o,s[2]=s[4]=1-o,s[1]=s[3]=-a,s[5]=s[7]=1-a;const l=k.shared;l.copyFrom(t._tileTransform.matrix),l.tx/=t.width,l.ty/=t.height,l.invert(),l.scale(t.width/n,t.height/i),Pc(s,2,0,l)}destroy(){this._renderableHash=null,this._gpuTilingSprite=null,this._gpuBatchedTilingSprite=null,this._renderer=null}}Bs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"tilingSprite"};function Pc(r,e,t,n){let i=0;const s=r.length/(e||2),o=n.a,a=n.b,l=n.c,u=n.d,h=n.tx,c=n.ty;for(t*=e;i<s;){const d=r[t],f=r[t+1];r[t]=o*d+l*f+h,r[t+1]=a*d+u*f+c,t+=e,i++}}function Rs(r,e){const t=r.instructionSet,n=t.instructions;for(let i=0;i<t.instructionSize;i++){const s=n[i];e[s.type].execute(s)}}class ks{constructor(e){this._renderer=e}addLayerGroup(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({projectionMatrix:this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:e.worldTransform,worldColor:e.worldColor}),Rs(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}}ks.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"layer"};function Os(r,e=[]){e.push(r);for(let t=0;t<r.layerGroupChildren.length;t++)Os(r.layerGroupChildren[t],e);return e}const Uv=new J;function Us(r,e=!1){Ec(r);const t=r.childrenToUpdate,n=r.updateTick;r.updateTick++;for(const i in t){const s=t[i],o=s.list,a=s.index;for(let l=0;l<a;l++)Fs(o[l],n,0);s.index=0}if(e)for(let i=0;i<r.layerGroupChildren.length;i++)Us(r.layerGroupChildren[i],e)}function Ec(r){r.layerGroupParent?(r.worldTransform.appendFrom(r.root.layerTransform,r.layerGroupParent.worldTransform),r.worldColor=zr(r.root.layerColor,r.layerGroupParent.worldColor)):(r.worldTransform.copyFrom(r.root.layerTransform),r.worldColor=r.root.localColor)}function Fs(r,e,t){if(e===r.updateTick)return;r.updateTick=e,r.didChange=!1;const n=r.localTransform;Ce(n,r);const i=r.parent;if(i&&!i.isLayerRoot?(t=t|r._updateFlags,r.layerTransform.appendFrom(n,i.layerTransform),t&&Ac(r,i,t)):(t=r._updateFlags,r.layerTransform.copyFrom(n),t&&Ac(r,Uv,t)),!r.isLayerRoot){const s=r.children,o=s.length;for(let l=0;l<o;l++)Fs(s[l],e,t);const a=r.layerGroup;r.view&&!a.structureDidChange&&a.updateRenderable(r)}}function Ac(r,e,t){t&Ar&&(r.layerColor=zr(r.localColor,e.layerColor)),t&Xn&&(r.layerBlendMode=r.localBlendMode==="inherit"?e.layerBlendMode:r.localBlendMode),t&Mr&&(r.layerVisibleRenderable=r.localVisibleRenderable&e.layerVisibleRenderable),r._updateFlags=0}function Mc(r,e){const{list:t,index:n}=r.childrenRenderablesToUpdate;let i=!1;for(let s=0;s<n;s++){const o=t[s],a=o.view;if(i=e[a.type].validateRenderable(o),i)break}return r.structureDidChange=i,i&&(r.childrenRenderablesToUpdate.index=0),i}class Is{constructor(e){this._renderer=e}render({container:e}){e.layer=!0;const t=this._renderer,n=Os(e.layerGroup,[]),i=t.renderPipes;for(let s=0;s<n.length;s++){const o=n[s];o.runOnRender(),o.instructionSet.renderPipes=i,o.structureDidChange||Mc(o,i),Us(o),o.structureDidChange?(o.structureDidChange=!1,kh(o,i)):Fv(o),t.renderPipes.batch.upload(o.instructionSet)}t.globalUniforms.start({projectionMatrix:t.renderTarget.rootProjectionMatrix,worldTransformMatrix:e.layerGroup.worldTransform}),Rs(e.layerGroup,i),i.uniformBatch&&(i.uniformBatch.renderEnd(),i.uniformBuffer.renderEnd())}destroy(){}}Is.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"layer"};function Fv(r){const{list:e,index:t}=r.childrenRenderablesToUpdate;for(let n=0;n<t;n++){const i=e[n];i.didViewUpdate&&r.updateRenderable(i)}r.childrenRenderablesToUpdate.index=0}class Gs{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null}get blendMode(){return this.sprite.layerBlendMode}packAttributes(e,t,n,i){const s=this.sprite,o=this.texture,a=s.layerTransform,l=a.a,u=a.b,h=a.c,c=a.d,d=a.tx,f=a.ty,p=this.bounds,m=p[0],g=p[1],y=p[2],v=p[3],b=o._layout.uvs,_=s.layerColor;e[n++]=l*g+h*v+d,e[n++]=c*v+u*g+f,e[n++]=b.x0,e[n++]=b.y0,t[n++]=_,e[n++]=i,e[n++]=l*m+h*v+d,e[n++]=c*v+u*m+f,e[n++]=b.x1,e[n++]=b.y1,t[n++]=_,e[n++]=i,e[n++]=l*m+h*y+d,e[n++]=c*y+u*m+f,e[n++]=b.x2,e[n++]=b.y2,t[n++]=_,e[n++]=i,e[n++]=l*g+h*y+d,e[n++]=c*y+u*g+f,e[n++]=b.x3,e[n++]=b.y3,t[n++]=_,e[n++]=i}packIndex(e,t,n){e[t++]=n+0,e[t++]=n+1,e[t++]=n+2,e[t++]=n+0,e[t++]=n+2,e[t++]=n+3}reset(){this.sprite=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}let wt;class Ls{constructor(e){this._gpuSpriteHash=Object.create(null),this._renderer=e,wt=this._gpuSpriteHash}addRenderable(e,t){const n=this._getGpuSprite(e);e.view._didUpdate&&this._updateBatchableSprite(e,n),this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){const t=wt[e.uid];e.view._didUpdate&&this._updateBatchableSprite(e,t),t.batcher.updateElement(t)}validateRenderable(e){const t=e.view._texture,n=this._getGpuSprite(e);return n.texture._source!==t._source?!n.batcher.checkAndUpdateTexture(n,t):!1}destroyRenderable(e){const t=wt[e.uid];V.return(t),wt[e.uid]=null}_updateBatchableSprite(e,t){const n=e.view;n._didUpdate=!1,t.bounds=n.bounds,t.texture=n._texture}_getGpuSprite(e){return wt[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=V.get(Gs);return t.sprite=e,t.texture=e.view._texture,t.bounds=e.view.bounds,wt[e.uid]=t,e.view._didUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuSpriteHash)V.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}}Ls.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"sprite"};var Cc=`in vec2 vTextureCoord;
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
`,Bc=`precision highp float;
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
`;function Rc(r){return kr({vertexSrc:Bc,fragmentSrc:Cc,maxTextures:r,name:"sdf"})}var Ds=`struct GlobalUniforms {
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
`;function kc(r){return Ur({vertex:{source:Ds,entryPoint:"mainVertex"},fragment:{source:Ds,entryPoint:"mainFragment"},maxTextures:r})}class Oc extends Se{constructor(){const e=new Q({color:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},transformMatrix:{value:new k,type:"mat3x3<f32>"},distance:{value:4,type:"f32"}});super({glProgram:Rc(xe),gpuProgram:kc(xe),resources:{localUniforms:e,batchSamplers:Or}})}}var Iv=Object.defineProperty,Uc=Object.getOwnPropertySymbols,Gv=Object.prototype.hasOwnProperty,Lv=Object.prototype.propertyIsEnumerable,Fc=(r,e,t)=>e in r?Iv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,sr=(r,e)=>{for(var t in e||(e={}))Gv.call(e,t)&&Fc(r,t,e[t]);if(Uc)for(var t of Uc(e))Lv.call(e,t)&&Fc(r,t,e[t]);return r};const Ic=["_fontFamily","_fontStyle","_fontVariant","_fontWeight","_breakWords","_align","_leading","_letterSpacing","_lineHeight","_textBaseline","_whiteSpace","_wordWrap","_wordWrapWidth","_padding"],Tt=class extends ie{constructor(r={}){super(),$v(r);const e=sr(sr({},Tt.defaultTextStyle),r);for(const t in Tt.defaultTextStyle){const n=t;this[n]=e[t]}this.dropShadow=null,typeof e.fill=="string"?this.fontSize=parseInt(e.fontSize,10):this.fontSize=e.fontSize,r.dropShadow&&(r.dropShadow instanceof Boolean?r.dropShadow===!0&&(this.dropShadow=sr({},Tt.defaultTextStyle.dropShadow)):this.dropShadow=sr(sr({},Tt.defaultTextStyle.dropShadow),r.dropShadow)),this.update()}get align(){return this._align}set align(r){this._align=r,this.update()}get breakWords(){return this._breakWords}set breakWords(r){this._breakWords=r,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(r){this._dropShadow=r,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(r){this._fontFamily=r,this.update()}get fontSize(){return this._fontSize}set fontSize(r){this._fontSize=r,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(r){this._fontStyle=r,this.update()}get fontVariant(){return this._fontVariant}set fontVariant(r){this._fontVariant=r,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(r){this._fontWeight=r,this.update()}get leading(){return this._leading}set leading(r){this._leading=r,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(r){this._letterSpacing=r,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(r){this._lineHeight=r,this.update()}get padding(){return this._padding}set padding(r){this._padding=r,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(r){this._textBaseline=r,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(r){this._whiteSpace=r,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(r){this._wordWrap=r,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(r){this._wordWrapWidth=r,this.update()}get fill(){return this._originalFill}set fill(r){r!==this._originalFill&&(this._originalFill=r,this._fill=Ut(r,Ge.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(r){r!==this._originalFill&&(this._originalFill=r,this._stroke=Ut(r,Ge.defaultStrokeStyle),this.update())}_generateKey(){const r=[];let e=0;for(let t=0;t<Ic.length;t++){const n=Ic[t];r[e++]=this[n]}return e=Gc(this._fill,r,e),e=Dv(this._stroke,r,e),this._styleKey=r.join("-"),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}get styleKey(){return this._styleKey||this._generateKey()}clone(){return new Tt({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(r=!1){var e,t,n,i;if(this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const s=typeof r=="boolean"?r:r==null?void 0:r.textureSource;(e=this._fill)!=null&&e.texture&&this._fill.texture.destroy(s),(t=this._originalFill)!=null&&t.texture&&this._originalFill.texture.destroy(s),(n=this._stroke)!=null&&n.texture&&this._stroke.texture.destroy(s),(i=this._originalStroke)!=null&&i.texture&&this._originalStroke.texture.destroy(s)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}};let Le=Tt;Le.defaultTextStyle={align:"left",breakWords:!1,dropShadow:{alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5},fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};function Gc(r,e,t){var n;return r&&(e[t++]=r.color,e[t++]=r.alpha,e[t++]=(n=r.fill)==null?void 0:n.uid),t}function Dv(r,e,t){return r&&(t=Gc(r,e,t),e[t++]=r.width,e[t++]=r.alignment,e[t++]=r.cap,e[t++]=r.join,e[t++]=r.miterLimit),t}function $v(r){var e,t;const n=r;if(typeof n.dropShadow=="boolean"&&(z(N,"dropShadow is now an object, not a boolean"),r.dropShadow={alpha:(e=n.dropShadowAlpha)!=null?e:1,angle:n.dropShadowAngle,blur:(t=n.dropShadowBlur)!=null?t:0,color:n.dropShadowColor,distance:n.dropShadowDistance}),n.strokeThickness){z(N,"strokeThickness is now a part of stroke");const i=n.stroke;r.stroke={color:i,width:n.strokeThickness}}if(Array.isArray(n.fill)){z(N,"gradient fill is now a fill pattern: `new FillGradient(...)`");const i=new Ke(0,0,0,r.fontSize*1.7),s=n.fill.map(de);s.forEach((o,a)=>{var l;const u=(l=n.fillGradientStops[a])!=null?l:a/s.length;i.addColorStop(u,o)}),r.fill={fill:i}}}function nn(r,e=[]){return e[0]=(r>>16&255)/255,e[1]=(r>>8&255)/255,e[2]=(r&255)/255,e}function Lc(r){let e=r.toString(16);return e="000000".substring(0,6-e.length)+e,`#${e}`}function zv(r){return typeof r=="string"&&r[0]==="#"&&(r=r.slice(1)),parseInt(r,16)}function Nv(r){return(r[0]*255<<16)+(r[1]*255<<8)+(r[2]*255|0)}class Dc{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,t){const n=$.ADAPTER.createCanvas();n.width=e,n.height=t;const i=n.getContext("2d");return{canvas:n,context:i}}getOptimalCanvasAndContext(e,t,n=1){e=Math.ceil(e*n-1e-6),t=Math.ceil(t*n-1e-6),e=nt(e),t=nt(t);const i=(e<<17)+(t<<1);this._canvasPool[i]||(this._canvasPool[i]=[]);let s=this._canvasPool[i].pop();return s||(s=this._createCanvasAndContext(e,t)),s}returnCanvasAndContext(e){const{width:t,height:n}=e.canvas,i=(t<<17)+(n<<1);this._canvasPool[i].push(e)}clear(){this._canvasPool={}}}const or=new Dc;var at=(r=>(r[r.NPM=0]="NPM",r[r.UNPACK=1]="UNPACK",r[r.PMA=2]="PMA",r[r.NO_PREMULTIPLIED_ALPHA=0]="NO_PREMULTIPLIED_ALPHA",r[r.PREMULTIPLY_ON_UPLOAD=1]="PREMULTIPLY_ON_UPLOAD",r[r.PREMULTIPLIED_ALPHA=2]="PREMULTIPLIED_ALPHA",r))(at||{}),$c=(r=>(r[r.NONE=0]="NONE",r[r.LOW=2]="LOW",r[r.MEDIUM=4]="MEDIUM",r[r.HIGH=8]="HIGH",r))($c||{}),$s=(r=>(r.CLAMP="clamp-to-edge",r.REPEAT="repeat",r.MIRRORED_REPEAT="mirror-repeat",r))($s||{});const Wv=new Proxy($s,{get(r,e){return z(N,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}});var zs=(r=>(r.NEAREST="nearest",r.LINEAR="linear",r))(zs||{});const Hv=new Proxy(zs,{get(r,e){return z(N,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}}),Vv=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function ar(r){const e=typeof r.fontSize=="number"?`${r.fontSize}px`:r.fontSize;let t=r.fontFamily;Array.isArray(r.fontFamily)||(t=r.fontFamily.split(","));for(let n=t.length-1;n>=0;n--){let i=t[n].trim();!/([\"\'])[^\'\"]+\1/.test(i)&&!Vv.includes(i)&&(i=`"${i}"`),t[n]=i}return`${r.fontStyle} ${r.fontVariant} ${r.fontWeight} ${e} ${t.join(",")}`}const Ns={willReadFrequently:!0},A=class{static get experimentalLetterSpacingSupported(){let r=A._experimentalLetterSpacingSupported;if(r!==void 0){const e=$.ADAPTER.getCanvasRenderingContext2D().prototype;r=A._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return r}constructor(r,e,t,n,i,s,o,a,l){this.text=r,this.style=e,this.width=t,this.height=n,this.lines=i,this.lineWidths=s,this.lineHeight=o,this.maxLineWidth=a,this.fontProperties=l}static measureText(r=" ",e,t=A._canvas,n=e.wordWrap){var i;const s=`${r}:${e.styleKey}`;if(A._measurementCache[s])return A._measurementCache[s];const o=ar(e),a=A.measureFont(o);a.fontSize===0&&(a.fontSize=e.fontSize,a.ascent=e.fontSize);const l=A.__context;l.font=o;const u=(n?A._wordWrap(r,e,t):r).split(/(?:\r\n|\r|\n)/),h=new Array(u.length);let c=0;for(let g=0;g<u.length;g++){const y=A._measureText(u[g],e.letterSpacing,l);h[g]=y,c=Math.max(c,y)}const d=((i=e._stroke)==null?void 0:i.width)||0;let f=c+d;e.dropShadow&&(f+=e.dropShadow.distance);const p=e.lineHeight||a.fontSize+d;let m=Math.max(p,a.fontSize+d*2)+(u.length-1)*(p+e.leading);return e.dropShadow&&(m+=e.dropShadow.distance),new A(r,e,f,m,u,h,p+e.leading,c,a)}static _measureText(r,e,t){let n=!1;A.experimentalLetterSpacingSupported&&(A.experimentalLetterSpacing?(t.letterSpacing=`${e}px`,t.textLetterSpacing=`${e}px`,n=!0):(t.letterSpacing="0px",t.textLetterSpacing="0px"));let i=t.measureText(r).width;return i>0&&(n?i-=e:i+=(A.graphemeSegmenter(r).length-1)*e),i}static _wordWrap(r,e,t=A._canvas){const n=t.getContext("2d",Ns);let i=0,s="",o="";const a=Object.create(null),{letterSpacing:l,whiteSpace:u}=e,h=A._collapseSpaces(u),c=A._collapseNewlines(u);let d=!h;const f=e.wordWrapWidth+l,p=A._tokenize(r);for(let m=0;m<p.length;m++){let g=p[m];if(A._isNewline(g)){if(!c){o+=A._addLine(s),d=!h,s="",i=0;continue}g=" "}if(h){const v=A.isBreakingSpace(g),b=A.isBreakingSpace(s[s.length-1]);if(v&&b)continue}const y=A._getFromCache(g,l,a,n);if(y>f)if(s!==""&&(o+=A._addLine(s),s="",i=0),A.canBreakWords(g,e.breakWords)){const v=A.wordWrapSplit(g);for(let b=0;b<v.length;b++){let _=v[b],S=_,M=1;for(;v[b+M];){const P=v[b+M];if(!A.canBreakChars(S,P,g,b,e.breakWords))_+=P;else break;S=P,M++}b+=M-1;const B=A._getFromCache(_,l,a,n);B+i>f&&(o+=A._addLine(s),d=!1,s="",i=0),s+=_,i+=B}}else{s.length>0&&(o+=A._addLine(s),s="",i=0);const v=m===p.length-1;o+=A._addLine(g,!v),d=!1,s="",i=0}else y+i>f&&(d=!1,o+=A._addLine(s),s="",i=0),(s.length>0||!A.isBreakingSpace(g)||d)&&(s+=g,i+=y)}return o+=A._addLine(s,!1),o}static _addLine(r,e=!0){return r=A._trimRight(r),r=e?`${r}
`:r,r}static _getFromCache(r,e,t,n){let i=t[r];return typeof i!="number"&&(i=A._measureText(r,e,n)+e,t[r]=i),i}static _collapseSpaces(r){return r==="normal"||r==="pre-line"}static _collapseNewlines(r){return r==="normal"}static _trimRight(r){if(typeof r!="string")return"";for(let e=r.length-1;e>=0;e--){const t=r[e];if(!A.isBreakingSpace(t))break;r=r.slice(0,-1)}return r}static _isNewline(r){return typeof r!="string"?!1:A._newlines.includes(r.charCodeAt(0))}static isBreakingSpace(r,e){return typeof r!="string"?!1:A._breakingSpaces.includes(r.charCodeAt(0))}static _tokenize(r){const e=[];let t="";if(typeof r!="string")return e;for(let n=0;n<r.length;n++){const i=r[n],s=r[n+1];if(A.isBreakingSpace(i,s)||A._isNewline(i)){t!==""&&(e.push(t),t=""),e.push(i);continue}t+=i}return t!==""&&e.push(t),e}static canBreakWords(r,e){return e}static canBreakChars(r,e,t,n,i){return!0}static wordWrapSplit(r){return A.graphemeSegmenter(r)}static measureFont(r){if(A._fonts[r])return A._fonts[r];const e=A._context;e.font=r;const t=e.measureText(A.METRICS_STRING+A.BASELINE_SYMBOL),n={ascent:t.actualBoundingBoxAscent,descent:t.actualBoundingBoxDescent,fontSize:t.actualBoundingBoxAscent+t.actualBoundingBoxDescent};return A._fonts[r]=n,n}static clearMetrics(r=""){r?delete A._fonts[r]:A._fonts={}}static get _canvas(){if(!A.__canvas){let r;try{const e=new OffscreenCanvas(0,0),t=e.getContext("2d",Ns);if(t!=null&&t.measureText)return A.__canvas=e,e;r=$.ADAPTER.createCanvas()}catch(e){r=$.ADAPTER.createCanvas()}r.width=r.height=10,A.__canvas=r}return A.__canvas}static get _context(){return A.__context||(A.__context=A._canvas.getContext("2d",Ns)),A.__context}};let ee=A;ee.METRICS_STRING="|\xC9q\xC5",ee.BASELINE_SYMBOL="M",ee.BASELINE_MULTIPLIER=1.4,ee.HEIGHT_MULTIPLIER=2,ee.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const r=new Intl.Segmenter;return e=>[...r.segment(e)].map(t=>t.segment)}return r=>[...r]})(),ee.experimentalLetterSpacing=!1,ee._fonts={},ee._newlines=[10,13],ee._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],ee._measurementCache={};function lr(r,e){if(r.texture===C.WHITE&&!r.fill)return xr(r.color);if(r.fill){if(r.fill instanceof wr){const t=r.fill,n=e.createPattern(t.texture.source.resource,"repeat"),i=t.transform.copyTo(k.shared);return i.scale(t.texture.frameWidth,t.texture.frameHeight),n.setTransform(i),n}else if(r.fill instanceof Ke){const t=r.fill;if(t.type==="linear"){const n=e.createLinearGradient(t.x0,t.y0,t.x1,t.y1);return t.gradientStops.forEach(i=>{n.addColorStop(i.offset,xr(i.color))}),n}}}else{const t=e.createPattern(r.texture.source.resource,"repeat"),n=r.matrix.copyTo(k.shared);return n.scale(r.texture.frameWidth,r.texture.frameHeight),t.setTransform(n),t}return console.warn("[PixiJS] FillStyle not recognised",r),"red"}function Ws(r){typeof r=="string"&&(r=[r]);const e=[];for(let t=0,n=r.length;t<n;t++){const i=r[t];if(Array.isArray(i)){if(i.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${i.length}.`);const s=i[0].charCodeAt(0),o=i[1].charCodeAt(0);if(o<s)throw new Error("[BitmapFont]: Invalid character range.");for(let a=s,l=o;a<=l;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(i))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}class Hs extends Pn{constructor(e){var t,n,i;super(),this.resolution=1,this.pages=[],this._padding=4,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentPageIndex=-1,this._skipKerning=!1;const s=e,o=s.style.clone();o.fontSize=this.baseMeasurementFontSize,s.overrideFill&&(o._fill.color=16777215,o._fill.alpha=1,o._fill.texture=C.WHITE,o._fill.fill=null),this._style=o,this._skipKerning=(t=s.skipKerning)!=null?t:!1,this.resolution=(n=s.resolution)!=null?n:1,this._padding=(i=s.padding)!=null?i:4;const a=ar(o),l=this;l.fontMetrics=ee.measureFont(a),l.lineHeight=o.lineHeight||this.fontMetrics.fontSize||o.fontSize}ensureCharacters(e){var t,n,i,s;const o=Ws(e).filter(b=>!this._currentChars.includes(b)).filter((b,_,S)=>S.indexOf(b)===_);if(!o.length)return;this._currentChars=[...this._currentChars,...o];let a;this._currentPageIndex===-1?a=this._nextPage():a=this.pages[this._currentPageIndex];let{canvas:l,context:u}=a.canvasAndContext,h=a.texture.source;const c=this._style;let d=this._currentX,f=this._currentY;const p=this.baseRenderedFontSize/this.baseMeasurementFontSize,m=this._padding*p,g=c.fontStyle==="italic"?2:1;let y=0,v=!1;for(let b=0;b<o.length;b++){const _=o[b],S=ee.measureText(_,c,l,!1),M=g*S.width*p,B=S.height*p,P=M+m*2,w=B+m*2;if(v=!1,_!==`
`&&_!=="\r"&&_!=="	"&&_!==" "&&(v=!0,y=Math.ceil(Math.max(w,y))),d+P>512&&(f+=y,y=w,d=0,f+y>512)){h.update();const L=this._nextPage();l=L.canvasAndContext.canvas,u=L.canvasAndContext.context,h=L.texture.source,f=0}const T=M/p-((n=(t=c.dropShadow)==null?void 0:t.distance)!=null?n:0)-((s=(i=c._stroke)==null?void 0:i.width)!=null?s:0);if(this.chars[_]={id:_.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:T,kerning:{}},v){this._drawGlyph(u,S,d+m,f+m,p,c);const L=h.width*p,I=h.height*p,R=new q(d/L,f/I,P/L,w/I);this.chars[_].texture=new C({source:h,layout:{frame:R}}),d+=Math.ceil(P)}}h.update(),this._currentX=d,this._currentY=f,this._skipKerning&&this._applyKerning(o,u)}get pageTextures(){return z(N,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,t){const n=this._measureCache;for(let i=0;i<e.length;i++){const s=e[i];for(let o=0;o<this._currentChars.length;o++){const a=this._currentChars[o];let l=n[s];l||(l=n[s]=t.measureText(s).width);let u=n[a];u||(u=n[a]=t.measureText(a).width);let h=t.measureText(s+a).width,c=h-(l+u);c&&(this.chars[s].kerning[a]=c),h=t.measureText(s+a).width,c=h-(l+u),c&&(this.chars[a].kerning[s]=c)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,t=or.getOptimalCanvasAndContext(512,512,e);this._setupContext(t.context,this._style,e);const n=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),i=new C({source:new kt({resource:t.canvas,resolution:n,alphaMode:at.PMA})}),s={canvasAndContext:t,texture:i};return this.pages[this._currentPageIndex]=s,s}_setupContext(e,t,n){var i;t.fontSize=this.baseRenderedFontSize,e.scale(n,n),e.font=ar(t),t.fontSize=this.baseMeasurementFontSize,e.textBaseline=t.textBaseline;const s=t._stroke,o=(i=s==null?void 0:s.width)!=null?i:0;if(s&&(e.lineWidth=o,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=lr(s,e)),t._fill&&(e.fillStyle=lr(t._fill,e)),t.dropShadow){const a=t.dropShadow,l=de(a.color),u=nn(l),h=a.blur*n,c=a.distance*n;e.shadowColor=`rgba(${u[0]*255},${u[1]*255},${u[2]*255},${a.alpha})`,e.shadowBlur=h,e.shadowOffsetX=Math.cos(a.angle)*c,e.shadowOffsetY=Math.sin(a.angle)*c}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,t,n,i,s,o){var a;const l=t.text,u=t.fontProperties,h=o._stroke,c=((a=h==null?void 0:h.width)!=null?a:0)*s,d=n+c/2,f=i-c/2,p=u.descent*s,m=t.lineHeight*s;o.stroke&&c&&e.strokeText(l,d,f+m-p),o._fill&&e.fillText(l,d,f+m-p)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:t,texture:n}=this.pages[e];or.returnCanvasAndContext(t),n.destroy(!0)}this.pages=null}}function Vs(r,e,t){const n={width:0,height:0,offsetY:0,scale:e.fontSize/t.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};n.offsetY=t.baseLineOffset;let i=n.lines[0],s=null,o=!0;const a={spaceWord:!1,width:0,start:0,index:0,positions:[],chars:[]},l=f=>{const p=i.width;for(let m=0;m<a.index;m++){const g=f.positions[m];i.chars.push(f.chars[m]),i.charPositions.push(g+p)}i.width+=f.width,o=!1,a.width=0,a.index=0,a.chars.length=0},u=()=>{let f=i.chars.length-1,p=i.chars[f];for(;p===" ";)i.width-=t.chars[p].xAdvance,p=i.chars[--f];n.width=Math.max(n.width,i.width),i={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},o=!0,n.lines.push(i),n.height+=t.lineHeight},h=t.baseMeasurementFontSize/e.fontSize,c=e.letterSpacing*h,d=e.wordWrapWidth*h;for(let f=0;f<r.length+1;f++){let p;const m=f===r.length;m||(p=r[f]);const g=t.chars[p];if(/(?:\s)/.test(p)||p==="\r"||p===`
`||m){if(!o&&e.wordWrap&&i.width+a.width-c>d?(u(),l(a),m||i.charPositions.push(0)):(a.start=i.width,l(a),m||i.charPositions.push(0)),p==="\r"||p===`
`)i.width!==0&&u();else if(!m){const y=g.xAdvance+(g.kerning[s]||0)+c;i.width+=y,i.spaceWidth=y,i.spacesIndex.push(i.charPositions.length),i.chars.push(p)}}else{const y=g.kerning[s]||0,v=g.xAdvance+y+c;a.positions[a.index++]=a.width+y,a.chars.push(p),a.width+=v}s=p}return u(),e.align==="center"?jv(n):e.align==="right"?Yv(n):e.align==="justify"&&Xv(n),n}function jv(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],n=r.width/2-t.width/2;for(let i=0;i<t.charPositions.length;i++)t.charPositions[i]+=n}}function Yv(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],n=r.width-t.width;for(let i=0;i<t.charPositions.length;i++)t.charPositions[i]+=n}}function Xv(r){const e=r.width;for(let t=0;t<r.lines.length;t++){const n=r.lines[t];let i=0,s=n.spacesIndex[i++],o=0;const a=n.spacesIndex.length,l=(e-n.width)/a;for(let u=0;u<n.charPositions.length;u++)u===s&&(s=n.spacesIndex[i++],o+=l),n.charPositions[u]+=o}}var qv=Object.defineProperty,zc=Object.getOwnPropertySymbols,Kv=Object.prototype.hasOwnProperty,Zv=Object.prototype.propertyIsEnumerable,Nc=(r,e,t)=>e in r?qv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,js=(r,e)=>{for(var t in e||(e={}))Kv.call(e,t)&&Nc(r,t,e[t]);if(zc)for(var t of zc(e))Zv.call(e,t)&&Nc(r,t,e[t]);return r};class Qv{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1}}getFont(e,t){var n;let i=t.fontFamily,s=!0;t._fill.fill&&(i+=t._fill.fill.uid,s=!1),se.has(i)||se.set(i,new Hs(js({style:t,overrideFill:s},this.defaultOptions)));const o=se.get(i);return(n=o.ensureCharacters)==null||n.call(o,e),o}getLayout(e,t){const n=this.getFont(e,t);return Vs(e.split(""),t,n)}measureText(e,t){return this.getLayout(e,t)}install(e,t,n){if(!e)throw new Error("[BitmapFontManager] Property `name` is required.");n=js(js({},this.defaultOptions),n);const i=t instanceof Le?t:new Le(t),s=i._fill.fill!==null&&i._fill.fill!==void 0,o=new Hs({style:i,overrideFill:s,skipKerning:n.skipKerning,padding:n.padding,resolution:n.resolution}),a=Ws(n.chars);return o.ensureCharacters(a.join("")),se.set(e,o),o}}const Ys=new Qv;class Jv extends rn{constructor(){super({view:new Yi})}}class Xs{constructor(e){this._gpuBitmapText={},this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._updateContext(e,t.view.context),this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const n=this._getGpuBitmapText(e);this._renderer.renderPipes.graphics.addRenderable(n,t),n.view.context.customShader&&this._updateDistanceField(e)}destroyRenderable(e){this._destroyRenderableByUid(e.uid)}_destroyRenderableByUid(e){V.return(this._gpuBitmapText[e]),this._gpuBitmapText[e]=null}updateRenderable(e){const t=this._getGpuBitmapText(e);this._renderer.renderPipes.graphics.updateRenderable(t),t.view.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){var n;const i=e.view,s=Ys.getFont(i.text,i._style);t.clear(),s.distanceField.type!=="none"&&(t.customShader||(this._sdfShader||(this._sdfShader=new Oc),t.customShader=this._sdfShader));const o=Array.from(i.text),a=i._style;let l=(((n=a._stroke)==null?void 0:n.width)||0)/2;l+=s.baseLineOffset;const u=Vs(o,a,s);let h=0;const c=a.fontSize/s.baseMeasurementFontSize;t.scale(c,c);const d=-i.anchor.x*u.width,f=-i.anchor.y*u.height;t.translate(d,f);const p=a._fill.color;for(let m=0;m<u.lines.length;m++){const g=u.lines[m];for(let y=0;y<g.charPositions.length;y++){const v=o[h++],b=s.chars[v];b!=null&&b.texture&&t.texture(b.texture,p,Math.round(g.charPositions[y]+b.xOffset),Math.round(l+b.yOffset))}l+=s.lineHeight}}_getGpuBitmapText(e){return this._gpuBitmapText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t=V.get(Jv,e);return this._gpuBitmapText[e.uid]=t,this._updateContext(e,t.view.context),e.on("destroyed",()=>{this.destroyRenderable(e)}),this._gpuBitmapText[e.uid]}_updateDistanceField(e){const t=this._getGpuBitmapText(e).view.context,n=e.view,i=n._style.fontFamily,s=se.get(i),{a:o,b:a,c:l,d:u}=e.layerTransform,h=Math.sqrt(o*o+a*a),c=Math.sqrt(l*l+u*u),d=(Math.abs(h)+Math.abs(c))/2,f=s.baseRenderedFontSize/n._style.fontSize,p=1,m=d*s.distanceField.distanceRange*(1/f)*p;t.customShader.resources.localUniforms.uniforms.distance=m}destroy(){var e;for(const t in this._gpuBitmapText)this._destroyRenderableByUid(t);this._gpuBitmapText=null,(e=this._sdfShader)==null||e.destroy(!0),this._sdfShader=null,this._renderer=null}}Xs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"bitmapText"};class qs{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),n=e.view._getKey();if(t.currentKey!==n){const i=e.view,s=i._autoResolution?this._renderer.view.resolution:i._resolution,{width:o,height:a}=this._renderer.canvasText.getTextureSize(i.text,s,i._style);return!(this._renderer.canvasText.getReferenceCount(t.currentKey)===1&&o===t.texture._source.width&&a===t.texture._source.height)}return!1}addRenderable(e,t){const n=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(n,t)}updateRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.canvasText.decreaseReferenceCount(t.currentKey),V.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),n=this._getGpuText(e),i=n.batchableSprite;n.currentKey!==t&&this._updateGpuText(e),e.view._didUpdate=!1,eb(i.bounds,e.view.anchor,i.texture)}_updateGpuText(e){const t=this._getGpuText(e),n=t.batchableSprite,i=e.view;t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey);const s=i._autoResolution?this._renderer.view.resolution:i._resolution;t.texture=n.texture=this._renderer.canvasText.getTexture(i.text,s,i._style,i._getKey()),t.currentKey=i._getKey(),n.texture=t.texture,t.needsTextureUpdate=!1}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t={texture:null,currentKey:"--",batchableSprite:V.get(Gs),needsTextureUpdate:!0};return t.batchableSprite.sprite=e,t.batchableSprite.bounds=[0,1,0,0],this._gpuText[e.uid]=t,this._updateText(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}qs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"text"};function eb(r,e,t){const n=t._source,i=t.layout,s=i.orig,o=i.trim,a=n.width,l=n.height,u=a*s.width,h=l*s.height;if(o){const c=a*o.width,d=l*o.height;r[1]=o.x*a-e._x*u,r[0]=r[1]+c,r[3]=o.y*l-e._y*h,r[2]=r[3]+d}else r[1]=-e._x*u,r[0]=r[1]+u,r[3]=-e._y*h,r[2]=r[3]+h}const tb=new ve;class Ks{constructor(){this._activeTextures={}}getTextureSize(e,t,n){const i=ee.measureText(e||" ",n);let s=Math.ceil(Math.ceil(Math.max(1,i.width)+n.padding*2)*t),o=Math.ceil(Math.ceil(Math.max(1,i.height)+n.padding*2)*t);return s=Math.ceil(s-1e-6),o=Math.ceil(o-1e-6),s=nt(s),o=nt(o),{width:s,height:o}}getTexture(e,t,n,i){if(this._activeTextures[i])return this._increaseReferenceCount(i),this._activeTextures[i].texture;const s=ee.measureText(e||" ",n),o=Math.ceil(Math.ceil(Math.max(1,s.width)+n.padding*2)*t),a=Math.ceil(Math.ceil(Math.max(1,s.height)+n.padding*2)*t),l=or.getOptimalCanvasAndContext(o,a),{canvas:u}=l;this.renderTextToCanvas(e,n,t,l);const h=tb;h.minX=0,h.minY=0,h.maxX=u.width/t|0,h.maxY=u.height/t|0;const c=oe.getOptimalTexture(h.width,h.height,t,!1);return c.source.type="image",c.source.resource=u,c.frameWidth=s.width,c.frameHeight=s.height,c.source.update(),c.layout.updateUvs(),this._activeTextures[i]={canvasAndContext:l,texture:c,usageCount:1},c}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(or.returnCanvasAndContext(t.canvasAndContext),oe.returnTexture(t.texture),t.texture.source.resource=null,t.texture.source.type="unknown",this._activeTextures[e]=null)}getReferenceCount(e){return this._activeTextures[e].usageCount}renderTextToCanvas(e,t,n,i){var s,o,a,l,u,h;const{canvas:c,context:d}=i,f=ar(t),p=ee.measureText(e||" ",t),m=p.lines,g=p.lineHeight,y=p.lineWidths,v=p.maxLineWidth,b=p.fontProperties,_=c.height;if(d.resetTransform(),d.scale(n,n),d.clearRect(0,0,p.width,p.height),(s=t._stroke)!=null&&s.width){const P=t._stroke;d.lineWidth=P.width,d.miterLimit=P.miterLimit,d.lineJoin=P.join,d.lineCap=P.cap}d.font=f;let S,M;const B=t.dropShadow?2:1;for(let P=0;P<B;++P){const w=t.dropShadow&&P===0,T=w?Math.ceil(Math.max(1,_)+t.padding*2):0,L=T*n;if(w){d.fillStyle="black",d.strokeStyle="black";const E=t.dropShadow,j=de(E.color),Y=nn(j),he=E.blur*n,Pt=E.distance*n;d.shadowColor=`rgba(${Y[0]*255},${Y[1]*255},${Y[2]*255},${E.alpha})`,d.shadowBlur=he,d.shadowOffsetX=Math.cos(E.angle)*Pt,d.shadowOffsetY=Math.sin(E.angle)*Pt+L}else d.globalAlpha=(a=(o=t._fill)==null?void 0:o.alpha)!=null?a:1,d.fillStyle=t._fill?lr(t._fill,d):null,(l=t._stroke)!=null&&l.width&&(d.strokeStyle=lr(t._stroke,d)),d.shadowColor="black";let I=(g-b.fontSize)/2;g-b.fontSize<0&&(I=0);const R=(h=(u=t._stroke)==null?void 0:u.width)!=null?h:0;for(let E=0;E<m.length;E++)S=R/2,M=R/2+E*g+b.ascent+I,t.align==="right"?S+=v-y[E]:t.align==="center"&&(S+=(v-y[E])/2),t._stroke&&this._drawLetterSpacing(m[E],t,i,S+t.padding,M+t.padding-T,!0),t._fill!==void 0&&this._drawLetterSpacing(m[E],t,i,S+t.padding,M+t.padding-T)}}_drawLetterSpacing(e,t,n,i,s,o=!1){const{context:a}=n,l=t.letterSpacing;let u=!1;if(ee.experimentalLetterSpacingSupported&&(ee.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,u=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||u){o?a.strokeText(e,i,s):a.fillText(e,i,s);return}let h=i;const c=ee.graphemeSegmenter(e);let d=a.measureText(e).width,f=0;for(let p=0;p<c.length;++p){const m=c[p];o?a.strokeText(m,h,s):a.fillText(m,h,s);let g="";for(let y=p+1;y<c.length;++y)g+=c[y];f=a.measureText(g).width,h+=d-f+l,d=f}}destroy(){}}Ks.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"canvasText"};var rb=Object.defineProperty,Wc=Object.getOwnPropertySymbols,nb=Object.prototype.hasOwnProperty,ib=Object.prototype.propertyIsEnumerable,Hc=(r,e,t)=>e in r?rb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Vc=(r,e)=>{for(var t in e||(e={}))nb.call(e,t)&&Hc(r,t,e[t]);if(Wc)for(var t of Wc(e))ib.call(e,t)&&Hc(r,t,e[t]);return r};const jc={alpha:1,color:0,clearBeforeRender:!0};class sn{constructor(){this.clearBeforeRender=!0,this._backgroundColor=0,this._backgroundColorRgba=[0,0,0,1],this._backgroundColorRgbaObject={r:0,g:0,b:0,a:1},this._backgroundColorString="#000000",this.color=this._backgroundColor,this.alpha=1}init(e){e=Vc(Vc({},jc),e),this.clearBeforeRender=e.clearBeforeRender,this.color=e.backgroundColor||this._backgroundColor,this.alpha=e.backgroundAlpha}get color(){return this._backgroundColor}set color(e){this._backgroundColor=e,this._backgroundColorString=Lc(e);const t=this._backgroundColorRgbaObject,n=this._backgroundColorRgba;nn(e,n),t.r=n[0],t.g=n[1],t.b=n[2],t.a=n[3]}get alpha(){return this._backgroundColorRgba[3]}set alpha(e){this._backgroundColorRgba[3]=e}get colorRgba(){return this._backgroundColorRgba}get colorRgbaObject(){return this._backgroundColorRgbaObject}get colorString(){return this._backgroundColorString}destroy(){}}sn.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"background",priority:0},sn.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};class sb extends K{constructor(){super({gl:{functions:`
                ${Dr}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendColor(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${$r}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class ob extends K{constructor(){super({gl:{functions:`
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
            `}})}}class ab extends K{constructor(){super({gl:{functions:`
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
                `}})}}class lb extends K{constructor(){super({gl:{functions:`
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
                `}})}}class ub extends K{constructor(){super({gl:{functions:`
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
            `}})}}class hb extends K{constructor(){super({gl:{functions:`
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
            `}})}}class cb extends K{constructor(){super({gl:{functions:`
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
            `}})}}class db extends K{constructor(){super({gl:{functions:`
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
                `}})}}class fb extends K{constructor(){super({gl:{functions:`
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
            `}})}}class pb extends K{constructor(){super({gl:{functions:`
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
            `}})}}class gb extends K{constructor(){super({gl:{functions:`
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
                `}})}}class mb extends K{constructor(){super({gl:{functions:`
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
            `}})}}class vb extends K{constructor(){super({gl:{functions:`
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
            `}})}}class bb extends K{constructor(){super({gl:{functions:`
                ${Dr}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLuminosity(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${$r}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class yb extends K{constructor(){super({gl:{functions:`
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
            `}})}}class xb extends K{constructor(){super({gl:{functions:`
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
                `}})}}class _b extends K{constructor(){super({gl:{functions:`
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
                `}})}}class wb extends K{constructor(){super({gl:{functions:`
                ${Dr}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                ${$r}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class Tb extends K{constructor(){super({gl:{functions:`
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
                `}})}}class Sb extends K{constructor(){super({gl:{functions:`
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
                `}})}}class Pb extends K{constructor(){super({gl:{functions:`
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
                `}})}}const Zs={color:sb,"color-burn":ob,"color-dodge":ab,darken:lb,difference:ub,divide:hb,exclusion:cb,"hard-light":db,"hard-mix":fb,lighten:pb,"linear-burn":gb,"linear-dodge":mb,"linear-light":vb,luminosity:bb,negation:yb,overlay:xb,"pin-light":_b,saturation:wb,"soft-light":Tb,subtract:Sb,"vivid-light":Pb};class Qs{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,t,n){if(this._activeBlendMode===t){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=t,this._isAdvanced&&this._endAdvancedBlendMode(n),this._isAdvanced=!!Zs[t],this._isAdvanced&&(this._beginAdvancedBlendMode(n),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);const t=this._activeBlendMode;if(!Zs[t]){console.warn(`Unable to assign 'BLEND_MODES.${t}' using the blend mode pipeline`);return}this._filterHash[t]||(this._filterHash[t]=new Pr({filters:[new Zs[t]]}));const n={type:"filter",action:"pushFilter",renderables:[],filterEffect:this._filterHash[t],canBundle:!1};this._renderableList=n.renderables,e.add(n)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({type:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}Qs.extension={type:[x.WebGLPipes,x.WebGPUPipes,x.CanvasPipes],name:"blendMode"};class Js{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({projectionMatrix:e,worldTransformMatrix:t,worldColor:n,offset:i}){const s=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionMatrix:this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:new k,worldColor:4294967295,offset:new W},o={projectionMatrix:e||this._renderer.renderTarget.renderTarget.projectionMatrix,worldTransformMatrix:t||s.worldTransformMatrix,worldColor:n||s.worldColor,offset:i||s.offset,bindGroup:null},a=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(a);const l=a.uniforms;l.projectionMatrix=o.projectionMatrix,l.worldTransformMatrix.copyFrom(o.worldTransformMatrix),l.worldTransformMatrix.tx-=o.offset.x,l.worldTransformMatrix.ty-=o.offset.y,l.worldAlpha=(o.worldColor>>24&255)/255,a.update();let u;this._renderer.renderPipes.uniformBatch?u=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(a,!1):(this._renderer.uniformBuffer.updateUniformGroup(a),u=this._bindGroupPool.pop()||new we,this._activeBindGroups.push(u),u.setResource(a,0)),o.bindGroup=u,this._currentGlobalUniformData=o}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1]}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new Q({projectionMatrix:{value:new k,type:"mat3x3<f32>"},worldTransformMatrix:{value:new k,type:"mat3x3<f32>"},worldAlpha:{value:1,type:"f32"}},{ubo:!0,isStatic:!0})}destroy(){}}Js.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"globalUniforms"};const eo={f32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"mat2x2<f32>":48,"mat3x3<f32>":48,"mat4x4<f32>":64};function Yc(r){const e=r.map(s=>({data:s,offset:0,size:0}));let t=0,n=0,i=0;for(let s=0;s<e.length;s++){const o=e[s];if(t=eo[o.data.type],!t)throw new Error(`Unknown type ${o.data.type}`);if(o.data.size>1&&(t=Math.max(t,16)*o.data.size),o.size=t,n%t!==0&&n<16){const a=n%t%16;n+=a,i+=a}n+t>16?(i=Math.ceil(i/16)*16,o.offset=i,i+=t,n=t):(o.offset=i,n+=t,i+=t)}return i=Math.ceil(i/16)*16,{uboElements:e,size:i}}const on=[{type:"mat3x3<f32>",test:r=>r.value.a!==void 0,code:r=>`
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
                `}],Eb={f32:`
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
    `};function Xc(r){const e=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
    `];let t=0;for(let i=0;i<r.length;i++){const s=r[i],o=s.data.name;let a=!1,l=0;for(let u=0;u<on.length;u++)if(on[u].test(s.data)){l=s.offset/4,e.push(`offset += ${l-t};`,on[u].code(o)),a=!0;break}if(!a)if(s.data.size>1){const u=Math.max(eo[s.data.type]/16,1),h=s.data.value.length/s.data.size,c=(4-h%4)%4;l=s.offset/4,e.push(`
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
                `)}else{const u=Eb[s.data.type];l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};
                    ${u};
                `)}t=l}const n=e.join(`
`);return new Function("uv","data","offset",n)}class to{constructor(){this._syncFunctionHash=Object.create(null)}ensureUniformGroup(e){e._syncFunction||this._initUniformGroup(e)}_initUniformGroup(e){const t=e.signature;let n=this._syncFunctionHash[t];if(!n){const i=Object.keys(e.uniformStructures).map(a=>e.uniformStructures[a]),s=Yc(i),o=Xc(s.uboElements);n=this._syncFunctionHash[t]={layout:s,syncFunction:o}}return e._syncFunction=n.syncFunction,e.buffer=new ue({data:new Float32Array(n.layout.size/4),usage:G.UNIFORM|G.COPY_DST}),e._syncFunction}syncUniformGroup(e,t,n){const i=e._syncFunction||this._initUniformGroup(e);return t||(t=e.buffer.data),n||(n=0),i(e.uniforms,t,n),!0}updateUniformGroup(e){if(e.isStatic&&!e.dirtyId)return!1;e.dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){throw new Error("Method not implemented.")}}to.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"uniformBuffer"};let qc=!1;const ro="8.0.0-alpha.2";function Kc(r){if(!qc){if($.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${ro} (${r}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${ro} - ${r} - http://www.pixijs.com/`);qc=!0}}class an{constructor(e){this._renderer=e}init(e){e.hello&&Kc(this._renderer.name)}}an.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"hello",priority:0},an.defaultOptions={hello:!1};var Ab=Object.defineProperty,Zc=Object.getOwnPropertySymbols,Mb=Object.prototype.hasOwnProperty,Cb=Object.prototype.propertyIsEnumerable,Qc=(r,e,t)=>e in r?Ab(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Jc=(r,e)=>{for(var t in e||(e={}))Mb.call(e,t)&&Qc(r,t,e[t]);if(Zc)for(var t of Zc(e))Cb.call(e,t)&&Qc(r,t,e[t]);return r};const ed=class{get resolution(){return this.texture.source._resolution}set resolution(r){this.texture.source.resize(this.texture.source.width,this.texture.source.height,r)}init(r){r=Jc(Jc({},ed.defaultOptions),r),this.screen=new q(0,0,r.width,r.height),this.element=r.element||$.ADAPTER.createCanvas(),this.antialias=!!r.antialias,this.texture=Zr(this.element,r),this.multiView=!!r.multiView,this.autoDensity&&(this.element.style.width=`${this.texture.width}px`,this.element.style.height=`${this.texture.height}px`)}resize(r,e,t){this.texture.source.resize(r,e,t),this.screen.width=this.texture.frameWidth,this.screen.height=this.texture.frameHeight,this.autoDensity&&(this.element.style.width=`${r}px`,this.element.style.height=`${e}px`)}destroy(r){r&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}};let ln=ed;ln.extension={type:[x.WebGLSystem,x.WebGPUSystem,x.CanvasSystem],name:"view",priority:0},ln.defaultOptions={width:800,height:600,resolution:$.RESOLUTION,autoDensity:!1,antialias:!1};const no=[sn,Ui,Zi,Js,an,ln,Ks,Is,to],io=[Qs,Ri,Ls,ks,ss,Qi,qs,Xs,Bs,Oi,Ji,ts,es],Bb=[...no,hs,Xr,os,Es,gs,us,ws,_s,ds,Ss,ms,cs],Rb=[...io],kb=[wi,rs,Fi],td=[],rd=[],nd=[];Z.handleByNamedList(x.WebGLSystem,td),Z.handleByNamedList(x.WebGLPipes,rd),Z.handleByNamedList(x.WebGLPipesAdaptor,nd),Z.add(...Bb,...Rb,...kb);class id extends As{constructor(){const e={name:"webgl2",type:Re.WEBGL,systems:td,renderPipes:rd,renderPipeAdaptors:nd};super(e)}}var Ob={__proto__:null,WebGLRenderer:id};class so{constructor(e){this._hash=Object.create(null),this._renderer=e}contextChange(e){this._gpu=e}getBindGroup(e,t,n){return e.updateKey(),this._hash[e.key]||this._createBindGroup(e,t,n)}_createBindGroup(e,t,n){var i;const s=this._gpu.device,o=t.layout[n],a=[];for(const u in o){const h=(i=e.resources[u])!=null?i:e.resources[o[u]];let c;if(h.resourceType==="uniformGroup"){const d=h;this._renderer.uniformBuffer.updateUniformGroup(d);const f=d.buffer;c={buffer:this._renderer.buffer.getGPUBuffer(f),offset:0,size:f.descriptor.size}}else if(h.resourceType==="buffer"){const d=h;c={buffer:this._renderer.buffer.getGPUBuffer(d),offset:0,size:d.descriptor.size}}else if(h.resourceType==="bufferResource"){const d=h;c={buffer:this._renderer.buffer.getGPUBuffer(d.buffer),offset:d.offset,size:d.size}}else if(h.resourceType==="textureSampler"){const d=h;c=this._renderer.texture.getGpuSampler(d)}else if(h.resourceType==="textureSource"){const d=h;c=this._renderer.texture.getGpuSource(d).createView({})}a.push({binding:o[u],resource:c})}const l=s.createBindGroup({layout:t._gpuLayout.bindGroups[n],entries:a});return this._hash[e.key]=l,l}destroy(){}}so.extension={type:[x.WebGPUSystem],name:"bindGroup"};class oo{constructor(){this._gpuBuffers=Object.create(null)}contextChange(e){this._gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){const t=this._gpuBuffers[e.uid]||this.createGPUBuffer(e);return e._updateID&&e.data&&(e._updateID=0,this._gpu.device.queue.writeBuffer(t,0,e.data.buffer,0,e._updateSize)),t}destroyAll(){for(const e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){const t=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(Fr(e.data.buffer,t.getMappedRange()),t.unmap()),this._gpuBuffers[e.uid]=t,e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),t}onBufferChange(e){let t=this._gpuBuffers[e.uid];t.destroy(),t=this.createGPUBuffer(e),e._updateID=0}onBufferDestroy(e){this._gpuBuffers[e.uid].destroy(),this._gpuBuffers[e.uid]=null}destroy(){throw new Error("Method not implemented.")}}oo.extension={type:[x.WebGPUSystem],name:"buffer"};function Ub(r,e){const t=r.descriptor.size,n=e.gpu.device,i=new ue({data:new Float32Array(24e5),usage:G.MAP_READ|G.COPY_DST}),s=e.buffer.createGPUBuffer(i),o=n.createCommandEncoder();o.copyBufferToBuffer(e.buffer.getGPUBuffer(r),0,s,0,t),n.queue.submit([o.finish()]),s.mapAsync(GPUMapMode.READ,0,t).then(()=>{s.getMappedRange(0,t),s.unmap()})}class sd{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const t=this.byteIndex;let n=t+e*4;if(n=Math.ceil(n/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,n>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=n,t}addGroup(e){const t=this.addEmptyGroup(e.length);for(let n=0;n<e.length;n++)this.data[t/4+n]=e[n];return t}destroy(){this._buffer.destroy(),this._buffer=null,this.data=null}}class ao{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){}}ao.extension={type:[x.WebGPUSystem],name:"colorMask"};class lo{constructor(e){this._renderer=e}async init(){return this._initPromise?this._initPromise:(this._initPromise=this._createDeviceAndAdaptor({}).then(e=>{this.gpu=e,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async _createDeviceAndAdaptor(e){const t=await navigator.gpu.requestAdapter(e),n=await t.requestDevice();return{adapter:t,device:n}}destroy(){this._renderer=null}}lo.extension={type:[x.WebGPUSystem],name:"device"};var Fb=Object.defineProperty,od=Object.getOwnPropertySymbols,Ib=Object.prototype.hasOwnProperty,Gb=Object.prototype.propertyIsEnumerable,ad=(r,e,t)=>e in r?Fb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ld=(r,e)=>{for(var t in e||(e={}))Ib.call(e,t)&&ad(r,t,e[t]);if(od)for(var t of od(e))Gb.call(e,t)&&ad(r,t,e[t]);return r};class uo{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}start(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e,t){this.renderPassEncoder&&this.renderPassEncoder.end(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(t.descriptor),this._setViewport(e.viewport)}_setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,t,n,i){const s=this._renderer.pipeline.getPipeline(e,t,n,i);this._setPipeline(s)}_setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,t){this._boundVertexBuffer[e]!==t&&(this._boundVertexBuffer[e]=t,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(t)))}_setIndexBuffer(e){this._boundIndexBuffer!==e&&(this._boundIndexBuffer=e,this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),"uint32"))}setBindGroup(e,t,n){if(this._boundBindGroup[e]===t)return;this._boundBindGroup[e]=t;const i=this._renderer.bindGroup.getBindGroup(t,n,e);this.renderPassEncoder.setBindGroup(e,i)}setGeometry(e){for(const t in e.attributes){const n=e.attributes[t];this._setVertexBuffer(n.shaderLocation,n.buffer)}e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,t){for(const n in e.groups){const i=e.groups[n];t||this._syncBindGroup(i),this.setBindGroup(n,i,e.gpuProgram)}}_syncBindGroup(e){for(const t in e.resources){const n=e.resources[t];n.isUniformGroup&&this._renderer.uniformBuffer.updateUniformGroup(n)}}draw(e){const{geometry:t,shader:n,state:i,topology:s,size:o,start:a,instanceCount:l,skipSync:u}=e;this.setPipelineFromGeometryProgramAndState(t,n.gpuProgram,i,s),this.setGeometry(t),this._setShaderBindGroups(n,u),t.indexBuffer?this.renderPassEncoder.drawIndexed(o||t.indexBuffer.data.length,l||1,a||0):this.renderPassEncoder.draw(o||t.getSize(),l||1,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished()}restoreRenderPass(){const e=this._renderer.renderTarget.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const t=this._boundPipeline,n=ld({},this._boundVertexBuffer),i=this._boundIndexBuffer,s=ld({},this._boundBindGroup);this._clearCache();const o=this._renderer.renderTarget.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this._setPipeline(t);for(const a in n)this._setVertexBuffer(a,n[a]);for(const a in s)this.setBindGroup(a,s[a],null);this._setIndexBuffer(i)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){}contextChange(e){this._gpu=e}}uo.extension={type:[x.WebGPUSystem],name:"encoder"};class ho{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:te.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const n=this._renderTargetStencilState[this._activeRenderTarget.uid];n.stencilMode=e,n.stencilReference=t;const i=this._renderer;i.pipeline.setStencilMode(e),i.encoder.renderPassEncoder.setStencilReference(t)}destroy(){}}ho.extension={type:[x.WebGPUSystem],name:"stencil"};const De=128;class co{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._batchBuffer=new sd({minUniformOffsetAlignment:De});const t=256/De;for(let n=0;n<t;n++){let i=G.UNIFORM|G.COPY_DST;n===0&&(i|=G.COPY_SRC),this._buffers.push(new ue({data:this._batchBuffer.data,usage:i}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){for(const e in this._bindGroupHash)this._bindGroupHash[e]=null;this._batchBuffer.clear()}getUniformBindGroup(e,t){if(!t&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.uniformBuffer.ensureUniformGroup(e);const n=e.buffer.data,i=this._batchBuffer.addEmptyGroup(n.length);return this._renderer.uniformBuffer.syncUniformGroup(e,this._batchBuffer.data,i/4),this._bindGroupHash[e.uid]=this._getBindGroup(i/De),this._bindGroupHash[e.uid]}getUniformBufferResource(e){this._renderer.uniformBuffer.updateUniformGroup(e);const t=e.buffer.data,n=this._batchBuffer.addGroup(t);return this._getBufferResource(n/De)}getArrayBindGroup(e){const t=this._batchBuffer.addGroup(e);return this._getBindGroup(t/De)}getArrayBufferResource(e){const t=this._batchBuffer.addGroup(e)/De;return this._getBufferResource(t)}_getBufferResource(e){if(!this._bufferResources[e]){const t=this._buffers[e%2];this._bufferResources[e]=new Qr({buffer:t,offset:(e/2|0)*256,size:De})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){const t=new we({0:this._getBufferResource(e)});this._bindGroups[e]=t}return this._bindGroups[e]}_uploadBindGroups(){const e=this._renderer.buffer,t=this._buffers[0];t.update(this._batchBuffer.byteIndex),e.updateBuffer(t);const n=this._renderer.gpu.device.createCommandEncoder();for(let i=1;i<this._buffers.length;i++){const s=this._buffers[i];n.copyBufferToBuffer(e.getGPUBuffer(t),De,e.getGPUBuffer(s),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([n.finish()])}destroy(){for(let e=0;e<this._bindGroups.length;e++)this._bindGroups[e].destroy();this._bindGroups=null,this._bindGroupHash=null;for(let e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers=null;for(let e=0;e<this._bufferResources.length;e++)this._bufferResources[e].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._bindGroupHash=null,this._renderer=null}}co.extension={type:[x.WebGPUPipes],name:"uniformBatch"};class Lb extends we{constructor(){super({0:new ue({data:new Float32Array(128),usage:G.UNIFORM|G.COPY_DST})})}get buffer(){return this.resources[0]}get data(){return this.resources[0].data}}class fo{constructor(e){this._activeBindGroups=[],this._activeBindGroupIndex=0,this._renderer=e}getUniformBindGroup(e){const t=this._renderer;t.uniformBuffer.ensureUniformGroup(e);const n=V.get(Lb);return t.uniformBuffer.syncUniformGroup(e,n.data,0),n.buffer.update(e.buffer.data.byteLength),this._activeBindGroups[this._activeBindGroupIndex++]=n,n}renderEnd(){for(let e=0;e<this._activeBindGroupIndex;e++)V.return(this._activeBindGroups[e]);this._activeBindGroupIndex=0}}fo.extension={type:[x.WebGPUPipes],name:"uniformBuffer"};const Db={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function $b(r,e,t,n,i,s,o,a){return r<<26|e<<18|o<<14|t<<8|n<<3|a<<1|i<<4|s}class po{constructor(e){this._moduleCache=Object.create(null),this._bufferLayoutsCache=Object.create(null),this._pipeCache=Object.create(null),this._colorMask=15,this._multisampleCount=1,this._renderer=e}contextChange(e){this._gpu=e,this.setStencilMode(te.DISABLED)}setMultisampleCount(e){this._multisampleCount=e}setColorMask(e){this._colorMask=e}setStencilMode(e){this._stencilMode=e,this._stencilState=Pe[e]}setPipeline(e,t,n,i){const s=this.getPipeline(e,t,n);i.setPipeline(s)}getPipeline(e,t,n,i){e._layoutKey||this._generateBufferKey(e),t._layoutKey||(this._generateProgramKey(t),this._renderer.shader.createProgramLayout(t)),i=i||e.topology;const s=$b(e._layoutKey,t._layoutKey,n.data,n._blendModeId,this._stencilMode,this._multisampleCount,this._colorMask,Db[i]);return this._pipeCache[s]?this._pipeCache[s]:(this._pipeCache[s]=this._createPipeline(e,t,n,i),this._pipeCache[s])}_createPipeline(e,t,n,i){const s=this._gpu.device,o=this._createVertexBufferLayouts(e),a=this._renderer.state.getColorTargets(n);let l=this._stencilState;l=Pe[this._stencilMode],a[0].writeMask=this._stencilMode===te.RENDERING_MASK_ADD?0:this._colorMask;const u={vertex:{module:this._getModule(t.vertex.source),entryPoint:t.vertex.entryPoint,buffers:o},fragment:{module:this._getModule(t.fragment.source),entryPoint:t.fragment.entryPoint,targets:a},primitive:{topology:i,cullMode:n.cullMode},layout:t._gpuLayout.pipeline,multisample:{count:this._multisampleCount},depthStencil:l,label:"PIXI Pipeline"};return s.createRenderPipeline(u)}_getModule(e){return this._moduleCache[e]||this._createModule(e)}_createModule(e){const t=this._gpu.device;return this._moduleCache[e]=t.createShaderModule({code:e}),this._moduleCache[e]}_generateProgramKey(e){const{vertex:t,fragment:n}=e,i=t.source+n.source+t.entryPoint+n.entryPoint;return e._layoutKey=mr(i,"program"),e._layoutKey}_generateBufferKey(e){const t=[];let n=0;const i=Object.keys(e.attributes).sort();for(let o=0;o<i.length;o++){const a=e.attributes[i[o]];t[n++]=a.shaderLocation,t[n++]=a.offset,t[n++]=a.format,t[n++]=a.stride}const s=t.join("");return e._layoutKey=mr(s,"geometry"),e._layoutKey}_createVertexBufferLayouts(e){if(this._bufferLayoutsCache[e._layoutKey])return this._bufferLayoutsCache[e._layoutKey];const t=[];return e.buffers.forEach(n=>{const i={arrayStride:0,stepMode:"vertex",attributes:[]},s=i.attributes;for(const o in e.attributes){const a=e.attributes[o];a.buffer===n&&(i.arrayStride=a.stride,s.push({shaderLocation:a.shaderLocation,offset:a.offset,format:a.format}))}s.length&&t.push(i)}),this._bufferLayoutsCache[e._layoutKey]=t,t}destroy(){throw new Error("Method not implemented.")}}po.extension={type:[x.WebGPUSystem],name:"pipeline"};class ud{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}const zb=[0,0,0,0];class go{constructor(e){this.rootProjectionMatrix=new k,this.onRenderTargetChange=new Kr("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._renderer=e}renderStart({target:e,clear:t,clearColor:n}){this.rootRenderTarget=this.getRenderTarget(e),this.rootProjectionMatrix=this.rootRenderTarget.projectionMatrix,this.renderingToScreen=fs(this.rootRenderTarget),this._renderTargetStack.length=0,this._renderer.encoder.start(),this.push(this.rootRenderTarget,t,n!=null?n:this._renderer.background.colorRgba)}contextChange(e){this._gpu=e}bind(e,t=!0,n){const i=this.getRenderTarget(e),s=this.renderTarget!==i;return this.renderTarget=i,this._startRenderPass(t,n),s&&this.onRenderTargetChange.emit(i),i}_getGpuColorTexture(e){const t=this._getGpuRenderTarget(e);return t.contexts[0]?t.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,t,n){typeof t=="boolean"&&(t=t?ge.ALL:ge.NONE);const i=this._getGpuRenderTarget(e),s=e.colorTextures.map((a,l)=>{const u=i.contexts[l];let h,c;u?h=u.getCurrentTexture().createView():h=this._renderer.texture.getTextureView(a),i.msaaTextures[l]&&(c=h,h=this._renderer.texture.getTextureView(i.msaaTextures[l]));const d=t&ge.COLOR?"clear":"load";return{view:h,resolveTarget:c,clearValue:n||zb,storeOp:"store",loadOp:d}});let o;if(e.depthTexture){const a=t&ge.STENCIL?"clear":"load";o={view:this._renderer.texture.getGpuSource(e.depthTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:a}}return{colorAttachments:s,depthStencilAttachment:o}}clear(e=ge.ALL,t){e&&this._startRenderPass(e,t)}push(e,t=ge.ALL,n){const i=this.bind(e,t,n);return this._renderTargetStack.push(i),i}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}copyToTexture(e,t,n,i){const s=this._renderer,o=s.renderTarget._getGpuColorTexture(e),a=s.texture.getGpuSource(t.source);return s.encoder.commandEncoder.copyTextureToTexture({texture:o,origin:n},{texture:a},i),t}restart(){this.bind(this.rootRenderTarget,ge.NONE)}destroy(){}_startRenderPass(e=!0,t){const n=this.renderTarget,i=this._getGpuRenderTarget(n);(n.width!==i.width||n.height!==i.height)&&this._resizeGpuRenderTarget(n);const s=this.getDescriptor(n,e,t);i.descriptor=s,this._renderer.encoder.beginRenderPass(n,i),this._renderer.pipeline.setMultisampleCount(i.msaaSamples)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=Zr(e)),e instanceof _t?t=e:e instanceof C&&(t=new _t({colorTextures:[e],depthTexture:e.source.depthStencil})),t.isRoot=!0,this._renderSurfaceToRenderTargetHash.set(e,t),t}_getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){e.isRoot=!0;const t=new ud;return e.colorTextures.forEach((n,i)=>{if(n.source.resource instanceof HTMLCanvasElement){const s=e.colorTexture.source.resource.getContext("webgpu");try{s.configure({device:this._gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"})}catch(o){console.error(o)}t.contexts[i]=s}if(t.msaa=n.source.antialias,n.source.antialias){const s=new le({width:0,height:0,sampleCount:4});t.msaaTextures[i]=s}}),t.msaa&&(t.msaaSamples=4,e.depthTexture&&(e.depthTexture.source.sampleCount=4)),this._gpuRenderTargetHash[e.uid]=t,t}_resizeGpuRenderTarget(e){const t=this._getGpuRenderTarget(e);t.width=e.width,t.height=e.height,t.msaa&&e.colorTextures.forEach((n,i)=>{const s=t.msaaTextures[i];s==null||s.resize(n.source.width,n.source.height,n.source._resolution)})}}go.extension={type:[x.WebGPUSystem],name:"renderTarget"};class mo{contextChange(e){this._gpu=e}createProgramLayout(e){const t=this._gpu.device;if(!e._gpuLayout)if(e.gpuLayout){const n=e.gpuLayout.map(s=>t.createBindGroupLayout({entries:s})),i={bindGroupLayouts:n};e._gpuLayout={bindGroups:n,pipeline:t.createPipelineLayout(i)}}else e._gpuLayout={bindGroups:null,pipeline:"auto"}}destroy(){throw new Error("Method not implemented.")}}mo.extension={type:[x.WebGPUSystem],name:"shader"};const me={};me.normal={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},me.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}},me.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}},me.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},me.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},me.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}},me["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},me["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}},me["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}},me.erase={alpha:{srcFactor:"zero",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"one-minus-src",operation:"add"}};class vo{constructor(){this.defaultState=new Ee,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:me[e.blendMode]||me.normal}]}destroy(){this.gpu=null}}vo.extension={type:[x.WebGPUSystem],name:"state"};const hd={type:"image",upload(r,e,t){const n=r.resource,i=(r.pixelWidth|0)*(r.pixelHeight|0),s=n.byteLength/i;t.device.queue.writeTexture({texture:e},n,{offset:0,rowsPerImage:r.pixelWidth,bytesPerRow:r.pixelWidth*s},{width:r.pixelWidth,height:r.pixelHeight,depthOrArrayLayers:1})}},cd={type:"image",upload(r,e,t){var n,i;const s=r.resource;if(!s)return;const o=((n=r.resource)==null?void 0:n.width)||r.pixelWidth,a=((i=r.resource)==null?void 0:i.height)||r.pixelHeight;t.device.queue.copyExternalImageToTexture({source:s},{texture:e},{width:o,height:a})}};class dd{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let t=this.pipelines[e];return t||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
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
                    `})),t=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=t),t}generateMipmap(e){const t=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let n=e;const i=e.depthOrArrayLayers||1,s=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!s){const l={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};n=this.device.createTexture(l)}const o=this.device.createCommandEncoder({}),a=t.getBindGroupLayout(0);for(let l=0;l<i;++l){let u=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),h=s?1:0;for(let c=1;c<e.mipLevelCount;++c){const d=n.createView({baseMipLevel:h++,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),f=o.beginRenderPass({colorAttachments:[{view:d,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),p=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:u}]});f.setPipeline(t),f.setBindGroup(0,p),f.draw(3,1,0,0),f.end(),u=d}}if(!s){const l={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:i};for(let u=1;u<e.mipLevelCount;++u)o.copyTextureToTexture({texture:n,mipLevel:u-1},{texture:e,mipLevel:u},l),l.width=Math.ceil(l.width/2),l.height=Math.ceil(l.height/2)}return this.device.queue.submit([o.finish()]),s||n.destroy(),e}}class bo{constructor(){this._gpuSources=Object.create(null),this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._textureViewHash=Object.create(null),this._uploads={image:cd,buffer:hd}}contextChange(e){this._gpu=e}initSource(e){if(e.autoGenerateMipmaps){const i=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(i))+1}const t={size:{width:e.pixelWidth,height:e.pixelHeight},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC},n=this._gpu.device.createTexture(t);return this._gpuSources[e.uid]=n,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("destroy",this.onSourceDestroy,this),this.onSourceUpdate(e),n}onSourceUpdate(e){const t=this._gpuSources[e.uid];t&&(this._uploads[e.type]&&this._uploads[e.type].upload(e,t,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&(this._mipmapGenerator||(this._mipmapGenerator=new dd(this._gpu.device)),this._mipmapGenerator.generateMipmap(t)))}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this);const t=this._gpuSources[e.uid];delete this._gpuSources[e.uid],t.destroy()}onSourceResize(e){const t=this._gpuSources[e.uid];(t.width!==e.pixelWidth||t.height!==e.pixelHeight)&&(this._gpuSources[e.uid].destroy(),this._gpuSources[e.uid]=null,this.initSource(e))}_initSampler(e){return this._gpuSamplers[e.resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e.resourceId]}getGpuSampler(e){return this._gpuSamplers[e.resourceId]||this._initSampler(e)}getGpuSource(e){return this._gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){var t;return(t=this._bindGroupHash[e.id])!=null?t:this._createTextureBindGroup(e)}_createTextureBindGroup(e){const t=e.id;return this._bindGroupHash[t]=new we({0:e.source,1:e.style}),this._bindGroupHash[t]}getTextureView(e){var t;const n=e.source;return(t=this._textureViewHash[n.uid])!=null?t:this._createTextureView(n)}_createTextureView(e){return this._textureViewHash[e.uid]=this.getGpuSource(e).createView(),this._textureViewHash[e.uid]}destroy(){throw new Error("Method not implemented.")}}bo.extension={type:[x.WebGPUSystem],name:"texture"};const Nb=[...no,lo,oo,bo,go,uo,mo,vo,po,ao,ho,so],Wb=[...io,co,fo],Hb=[Pi,ns,Gi],fd=[],pd=[],gd=[];Z.handleByNamedList(x.WebGPUSystem,fd),Z.handleByNamedList(x.WebGPUPipes,pd),Z.handleByNamedList(x.WebGPUPipesAdaptor,gd),Z.add(...Nb,...Wb,...Hb);class yo extends As{constructor(){const e={name:"webgpu",type:Re.WEBGPU,systems:fd,renderPipes:pd,renderPipeAdaptors:gd};super(e)}}var Vb={__proto__:null,WebGPURenderer:yo};function md(r,e){e.encoder.finishRenderPass();const t=e.encoder.commandEncoder,n=$.ADAPTER.createCanvas();n.width=r.source.pixelWidth,n.height=r.source.pixelHeight;const i=n.getContext("webgpu");return i.configure({device:e.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"}),t.copyTextureToTexture({texture:e.texture.getGpuSource(r.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:n.width,height:n.height}),e.encoder.restoreRenderPass(),n}function jb(r,e){for(let t=0;t<r.length;t+=4){const n=e[t+3]=r[t+3];n!==0?(e[t]=Math.round(Math.min(r[t]*255/n,255)),e[t+1]=Math.round(Math.min(r[t+1]*255/n,255)),e[t+2]=Math.round(Math.min(r[t+2]*255/n,255))):(e[t]=r[t],e[t+1]=r[t+1],e[t+2]=r[t+2])}}function vd(r,e){const t=e.renderTarget.renderTarget;e.renderTarget.bind(r,!1);const n=Math.round(r.source.pixelWidth),i=Math.round(r.source.pixelHeight),s=new Uint8Array(4*n*i),o=$.ADAPTER.createCanvas();o.width=n,o.height=i;const a=e.gl;a.readPixels(Math.round(r.frameX),Math.round(r.frameY),n,i,a.RGBA,a.UNSIGNED_BYTE,s);const l=o.getContext("2d"),u=l.getImageData(0,0,n,i);jb(s,u.data),l.putImageData(u,0,0);const h=$.ADAPTER.createCanvas();h.width=n,h.height=i;const c=h.getContext("2d");return c.scale(1,-1),c.drawImage(o,0,-i),e.renderTarget.bind(t,!1),h}async function Yb(r,e,t=200){let n;e instanceof yo?n=md(r,e):n=vd(r,e),await e.encoder.commandFinished;const i=n.toDataURL(),s=t;console.log(`logging texture ${r.source.width}px ${r.source.height}px`);const o=["font-size: 1px;",`padding: ${s}px 300px;`,`background: url(${i}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",o)}function Xb(r,e){const t=e.gpu.device.createCommandEncoder(),n=$.ADAPTER.createCanvas();n.width=r.source.pixelWidth,n.height=r.source.pixelHeight;const i=n.getContext("webgpu");return i.configure({device:e.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"}),t.copyTextureToTexture({texture:e.texture.getGpuSource(r.source),origin:{x:0,y:0}},{texture:i.getCurrentTexture()},{width:n.width,height:n.height}),e.gpu.device.queue.submit([t.finish()]),n}const qb={POINTS:"point-list",LINES:"line-list",LINE_STRIP:"line-strip",TRIANGLES:"triangle-list",TRIANGLE_STRIP:"triangle-strip"},Kb=new Proxy(qb,{get(r,e){return z(N,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}}),Zb={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};function Qb(r){console.log("Render Flow"),["prerender","renderStart","render","renderEnd","postrender"].forEach(e=>{Jb(r.runners[e])})}function Jb(r){console.log(` - ${r.name}`);for(let e=0;e<r.items.length;e++)console.log(`   ${e+1}.`,r.items[e].constructor.name||"anonymous")}class ey extends C{static create(e){return new C({source:new le(e)})}resize(e,t,n){return this.source.resize(e,t,n),this}}class ty extends le{constructor(){super(...arguments),this.type="buffer"}}class ry{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}set(e,t,n){const i=t.width,s=t.height;if(n){const o=e.width/2/i,a=e.height/2/s,l=e.x/i+o,u=e.y/s+a;n=F.add(n,F.NW),this.x0=l+o*F.uX(n),this.y0=u+a*F.uY(n),n=F.add(n,2),this.x1=l+o*F.uX(n),this.y1=u+a*F.uY(n),n=F.add(n,2),this.x2=l+o*F.uX(n),this.y2=u+a*F.uY(n),n=F.add(n,2),this.x3=l+o*F.uX(n),this.y3=u+a*F.uY(n)}else this.x0=e.x/i,this.y0=e.y/s,this.x1=(e.x+e.width)/i,this.y1=e.y/s,this.x2=(e.x+e.width)/i,this.y2=(e.y+e.height)/s,this.x3=e.x/i,this.y3=(e.y+e.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}function ny(r,e){if(r===16777215||!e)return e;if(e===16777215||!r)return r;const t=r>>16&255,n=r>>8&255,i=r&255,s=e>>16&255,o=e>>8&255,a=e&255,l=t*s/255,u=n*o/255,h=i*a/255;return(l<<16)+(u<<8)+h}function iy(r,e,t){const n=r.a,i=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty,u=e.a,h=e.b,c=e.c,d=e.d;t.a=n*u+i*c,t.b=n*h+i*d,t.c=s*u+o*c,t.d=s*h+o*d,t.tx=a*u+l*c+e.tx,t.ty=a*h+l*d+e.ty}let sy=0;const oy={canvas:"text",html:"text",bitmap:"bitmapText"},un=class{constructor(r){this.uid=sy++,this.type="text",this.owner=mt,this.batched=!0,this._autoResolution=un.defaultAutoResolution,this._resolution=un.defaultResolution,this._didUpdate=!0,this._bounds=[0,1,0,0],this._boundsDirty=!0;var e,t,n;this.text=(e=r.text)!=null?e:"",this._style=r.style instanceof Le?r.style:new Le(r.style);const i=(t=r.renderMode)!=null?t:this._detectRenderType(this._style);this.type=oy[i],this.anchor=new re(this,0,0),this._resolution=(n=r.resolution)!=null?n:un.defaultResolution}set text(r){r=r.toString(),this._text!==r&&(this._text=r,this.onUpdate())}get text(){return this._text}get style(){return this._style}set style(r){var e;r=r||{},(e=this._style)==null||e.off("update",this.onUpdate,this),r instanceof Le?this._style=r:this._style=new Le(r),this._style.on("update",this.onUpdate,this),this.onUpdate()}set resolution(r){this._resolution=r}get resolution(){return this._resolution}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[1],e[2],e[3])}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],n=-e*this.anchor.x;let i=0;return r.x>=n&&r.x<n+e&&(i=-t*this.anchor.y,r.y>=i&&r.y<i+t)}onUpdate(){this._didUpdate=!0,this._boundsDirty=!0,this.owner.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}`}_updateBounds(){const r=this._bounds;if(this.type==="bitmapText"){const e=Ys.measureText(this.text,this._style),t=e.scale,n=e.offsetY*t;r[0]=0,r[1]=n,r[2]=e.width*t,r[3]=e.height*t+n}else{const e=ee.measureText(this.text,this._style);r[0]=0,r[1]=0,r[2]=e.width,r[3]=e.height}}_detectRenderType(r){return se.has(r.fontFamily)?"bitmap":"canvas"}destroy(r=!1){this.owner=null,this._bounds=null,this.anchor=null,this._style.destroy(r),this._style=null,this._text=null}};let hn=un;hn.defaultResolution=1,hn.defaultAutoResolution=!0;var ay=Object.defineProperty,bd=Object.getOwnPropertySymbols,ly=Object.prototype.hasOwnProperty,uy=Object.prototype.propertyIsEnumerable,yd=(r,e,t)=>e in r?ay(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,hy=(r,e)=>{for(var t in e||(e={}))ly.call(e,t)&&yd(r,t,e[t]);if(bd)for(var t of bd(e))uy.call(e,t)&&yd(r,t,e[t]);return r};class cy extends J{constructor(...e){let t=e[0];(typeof t=="string"||e[1])&&(z(N,'use new Text({ text: "hi!", style }) instead'),t={text:t,style:e[1]}),super(hy({view:new hn(t),label:"Text"},t))}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}set text(e){this.view.text=e}get text(){return this.view.text}set style(e){this.view.style=e}get style(){return this.view.style}}var xo=/iPhone/i,xd=/iPod/i,_d=/iPad/i,wd=/\biOS-universal(?:.+)Mac\b/i,_o=/\bAndroid(?:.+)Mobile\b/i,Td=/Android/i,St=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,cn=/Silk/i,Oe=/Windows Phone/i,Sd=/\bWindows(?:.+)ARM\b/i,Pd=/BlackBerry/i,Ed=/BB10/i,Ad=/Opera Mini/i,Md=/\b(CriOS|Chrome)(?:.+)Mobile/i,Cd=/Mobile(?:.+)Firefox\b/i,Bd=function(r){return typeof r!="undefined"&&r.platform==="MacIntel"&&typeof r.maxTouchPoints=="number"&&r.maxTouchPoints>1&&typeof MSStream=="undefined"};function dy(r){return function(e){return e.test(r)}}function Rd(r){var e={userAgent:"",platform:"",maxTouchPoints:0};!r&&typeof navigator!="undefined"?e={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0}:typeof r=="string"?e.userAgent=r:r&&r.userAgent&&(e={userAgent:r.userAgent,platform:r.platform,maxTouchPoints:r.maxTouchPoints||0});var t=e.userAgent,n=t.split("[FBAN");typeof n[1]!="undefined"&&(t=n[0]),n=t.split("Twitter"),typeof n[1]!="undefined"&&(t=n[0]);var i=dy(t),s={apple:{phone:i(xo)&&!i(Oe),ipod:i(xd),tablet:!i(xo)&&(i(_d)||Bd(e))&&!i(Oe),universal:i(wd),device:(i(xo)||i(xd)||i(_d)||i(wd)||Bd(e))&&!i(Oe)},amazon:{phone:i(St),tablet:!i(St)&&i(cn),device:i(St)||i(cn)},android:{phone:!i(Oe)&&i(St)||!i(Oe)&&i(_o),tablet:!i(Oe)&&!i(St)&&!i(_o)&&(i(cn)||i(Td)),device:!i(Oe)&&(i(St)||i(cn)||i(_o)||i(Td))||i(/\bokhttp\b/i)},windows:{phone:i(Oe),tablet:i(Sd),device:i(Oe)||i(Sd)},other:{blackberry:i(Pd),blackberry10:i(Ed),opera:i(Ad),firefox:i(Cd),chrome:i(Md),device:i(Pd)||i(Ed)||i(Ad)||i(Cd)||i(Md)},any:!1,phone:!1,tablet:!1};return s.any=s.apple.device||s.android.device||s.windows.device||s.other.device,s.phone=s.apple.phone||s.android.phone||s.windows.phone,s.tablet=s.apple.tablet||s.android.tablet||s.windows.tablet,s}var kd;const fy=(kd=Rd.default)!=null?kd:Rd,py=fy(globalThis.navigator);class Od{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e!=null?e:new k,this.observer=t,this.position=new re(this,0,0),this.scale=new re(this,1,1),this.pivot=new re(this,0,0),this.skew=new re(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}onUpdate(e){var t;this.dirty=!0,e===this.skew&&this.updateSkew(),(t=this.observer)==null||t.onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.updateSkew())}}var gy=Object.defineProperty,Ud=Object.getOwnPropertySymbols,my=Object.prototype.hasOwnProperty,vy=Object.prototype.propertyIsEnumerable,Fd=(r,e,t)=>e in r?gy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Id=(r,e)=>{for(var t in e||(e={}))my.call(e,t)&&Fd(r,t,e[t]);if(Ud)for(var t of Ud(e))vy.call(e,t)&&Fd(r,t,e[t]);return r};let by=0;const Gd=class{constructor(r){this.owner=mt,this.uid=by++,this.type="tilingSprite",this.batched=!0,this._bounds=[0,1,0,0],this._boundsDirty=!0,r=Id(Id({},Gd.defaultOptions),r),this.anchor=new re(this,0,0),this._applyAnchorToTexture=r.applyAnchorToTexture,this.texture=r.texture,this._width=r.width,this._height=r.height,this._tileTransform=new Od({observer:this})}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}set texture(r){this._texture!==r&&(this._texture=r,this.onUpdate())}get texture(){return this._texture}set width(r){this._width=r,this.onUpdate()}get width(){return this._width}set height(r){this._height=r,this.onUpdate()}get height(){return this._height}_updateBounds(){const r=this._bounds,e=this.anchor,t=this._width,n=this._height;r[1]=-e._x*t,r[0]=r[1]+t,r[3]=-e._y*n,r[2]=r[3]+n}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[2],e[1],e[3])}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],n=-e*this.anchor.x;let i=0;return r.x>=n&&r.x<n+e&&(i=-t*this.anchor.y,r.y>=i&&r.y<i+t)}onUpdate(){this._boundsDirty=!0,this._didUpdate=!0,this.owner.onViewUpdate()}destroy(r=!1){if(this.anchor=null,this._tileTransform=null,this._bounds=null,typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._texture.destroy(e)}this._texture=null}};let wo=Gd;wo.defaultOptions={texture:C.WHITE,width:256,height:256,applyAnchorToTexture:!1};var yy=Object.defineProperty,Ld=Object.getOwnPropertySymbols,xy=Object.prototype.hasOwnProperty,_y=Object.prototype.propertyIsEnumerable,Dd=(r,e,t)=>e in r?yy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,wy=(r,e)=>{for(var t in e||(e={}))xy.call(e,t)&&Dd(r,t,e[t]);if(Ld)for(var t of Ld(e))_y.call(e,t)&&Dd(r,t,e[t]);return r};class Ty extends J{constructor(e){super(wy({view:new wo(e),label:"TilingSprite"},e))}set texture(e){this.view.texture=e}get texture(){return this.view.texture}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get width(){return this.view.width}set width(e){this.view.width=e}get height(){return this.view.height}set height(e){this.view.height=e}get tilePosition(){return this.view._tileTransform.position}set tilePosition(e){this.view._tileTransform.position.copyFrom(e)}get tileScale(){return this.view._tileTransform.scale}set tileScale(e){this.view._tileTransform.scale.copyFrom(e)}set tileRotation(e){this.view._tileTransform.rotation=e}get tileRotation(){return this.view._tileTransform.rotation}get tileTransform(){return this.view._tileTransform}}let To;async function Sy(){return To!=null||(To=(async()=>{var r;const e=document.createElement("canvas").getContext("webgl");if(!e)return at.UNPACK;const t=await new Promise(o=>{const a=document.createElement("video");a.onloadeddata=()=>o(a),a.onerror=()=>o(null),a.autoplay=!1,a.crossOrigin="anonymous",a.preload="auto",a.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",a.load()});if(!t)return at.UNPACK;const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);const i=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);const s=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,s),e.deleteFramebuffer(i),e.deleteTexture(n),(r=e.getExtension("WEBGL_lose_context"))==null||r.loseContext(),s[0]<=s[3]?at.PMA:at.UNPACK})()),To}const Py=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;var Ey=Object.defineProperty,Ay=Object.defineProperties,My=Object.getOwnPropertyDescriptors,$d=Object.getOwnPropertySymbols,Cy=Object.prototype.hasOwnProperty,By=Object.prototype.propertyIsEnumerable,zd=(r,e,t)=>e in r?Ey(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Nd=(r,e)=>{for(var t in e||(e={}))Cy.call(e,t)&&zd(r,t,e[t]);if($d)for(var t of $d(e))By.call(e,t)&&zd(r,t,e[t]);return r},Ry=(r,e)=>Ay(r,My(e));const ky=["#000080","#228B22","#8B0000","#4169E1","#008080","#800000","#9400D3","#FF8C00","#556B2F","#8B008B"];let Oy=0;function Wd(r,e=0,t={color:"#000000"}){r.isLayerRoot&&(t.color=ky[Oy++]);let n="";for(let o=0;o<e;o++)n+="    ";let i=r.label;!i&&r instanceof Ue&&(i=`sprite:${r.view.texture.label}`);let s=`%c ${n}|- ${i} (worldX:${r.worldTransform.tx}, layerX:${r.layerTransform.tx}, localX:${r.x})`;r.isLayerRoot&&(s+=" (LayerGroup)"),r.filters&&(s+="(*filters)"),console.log(s,`color:${t.color}; font-weight:bold;`),e++;for(let o=0;o<r.children.length;o++){const a=r.children[o];Wd(a,e,Nd({},t))}}function Hd(r,e=0,t={index:0,color:"#000000"}){let n="";for(let s=0;s<e;s++)n+="    ";const i=`%c ${n}- ${t.index}: ${r.root.label} worldX:${r.worldTransform.tx}`;console.log(i,`color:${t.color}; font-weight:bold;`),e++;for(let s=0;s<r.layerGroupChildren.length;s++){const o=r.layerGroupChildren[s];Hd(o,e,Ry(Nd({},t),{index:s}))}}var Uy=`fn getLuminosity(c: vec3<f32>) -> f32 {
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
}`;export{at as ALPHA_MODES,Pn as AbstractBitmapFont,As as AbstractRenderer,Nl as AlphaFilter,Zn as AlphaMask,Ji as AlphaMaskPipe,ti as Application,Vt as Assets,Pl as AssetsClass,nr as BUFFER_TYPE,gl as BackgroundLoader,sn as BackgroundSystem,Ci as Batch,Hu as BatchGeometry,Nr as BatchableGraphics,Uh as BatchableMesh,Gs as BatchableSprite,Bi as Batcher,Ri as BatcherPipe,V as BigPool,we as BindGroup,so as BindGroupSystem,En as BitmapFont,Ys as BitmapFontManager,Xs as BitmapTextPipe,K as BlendModeFilter,Qs as BlendModePipe,su as BlurFilter,Xt as BlurFilterPass,ve as Bounds,ko as BrowserAdapter,ue as Buffer,ty as BufferImageSource,Qr as BufferResource,oo as BufferSystem,G as BufferUsage,ge as CLEAR,se as Cache,or as CanvasPool,Dc as CanvasPoolClass,Zh as CanvasSource,ee as CanvasTextMetrics,qs as CanvasTextPipe,Ks as CanvasTextSystem,dn as Circle,Qn as ColorMask,es as ColorMaskPipe,Lg as ColorMatrixFilter,Cn as ColorNames,J as Container,Py as DATA_URI,zo as DEG_TO_RAD,zs as DEPRECATED_SCALE_MODES,$s as DEPRECATED_WRAP_MODES,Kb as DRAW_MODES,Dg as DisplacementFilter,Hs as DynamicBitmapFont,fn as Ellipse,Qa as EventBoundary,ie as EventEmitter,zt as EventSystem,Be as EventsTicker,x as ExtensionType,tl as FederatedContainer,ur as FederatedEvent,Dt as FederatedMouseEvent,ye as FederatedPointerEvent,tt as FederatedWheelEvent,Ke as FillGradient,wr as FillPattern,Te as Filter,Pr as FilterEffect,Oi as FilterPipe,Ui as FilterSystem,hi as GAUSSIAN_VALUES,Zb as GLSL_TO_STD40_SIZE,qr as GL_FORMATS,as as GL_TARGETS,D as GL_TYPES,zh as GL_WRAP_MODES,Kt as Geometry,hs as GlBackBufferSystem,wi as GlBatchAdaptor,$h as GlBuffer,os as GlBufferSystem,cs as GlColorMaskSystem,Xr as GlContextSystem,ds as GlEncoderSystem,us as GlGeometrySystem,Fi as GlGraphicsAdaptor,rs as GlMeshAdaptor,pe as GlProgram,ec as GlProgramData,Vh as GlRenderTarget,gs as GlRenderTargetSystem,_s as GlShaderSystem,Ss as GlStateSystem,ms as GlStencilSystem,cc as GlTexture,Es as GlTextureSystem,ws as GlUniformGroupSystem,Js as GlobalUniformSystem,Pi as GpuBatchAdaptor,me as GpuBlendModesToPixi,ao as GpuColorMaskSystem,lo as GpuDeviceSystem,uo as GpuEncoderSystem,Gi as GpuGraphicsAdaptor,Ch as GpuGraphicsContext,ns as GpuMeshAdapter,dd as GpuMipmapGenerator,fe as GpuProgram,Ub as GpuReadBuffer,ud as GpuRenderTarget,go as GpuRenderTargetSystem,mo as GpuShaderSystem,vo as GpuStateSystem,Pe as GpuStencilModesToPixi,ho as GpuStencilSystem,bo as GpuTextureSystem,co as GpuUniformBatchPipe,fo as GpuUniformBufferPipe,Hm as Graphics,Ge as GraphicsContext,Bh as GraphicsContextRenderData,Zi as GraphicsContextSystem,ut as GraphicsPath,Qi as GraphicsPipe,Yi as GraphicsView,an as HelloSystem,vv as IGLUniformData,kt as ImageSource,Xa as InstructionSet,qa as LayerGroup,ks as LayerPipe,Rh as LayerRenderable,Is as LayerSystem,bl as Loader,Ae as LoaderParserPriority,xe as MAX_TEXTURES,$c as MSAA_QUALITY,Er as MaskEffectManager,Da as MaskEffectManagerClass,uh as MaskFilter,k as Matrix,ov as Mesh,yt as MeshGeometry,ss as MeshPipe,Dh as MeshShader,Zt as MeshView,xn as NOOP,yi as NineSliceGeometry,lm as NineSlicePlane,_i as NineSliceSprite,pu as NoiseFilter,re as ObservablePoint,Do as PI_2,po as PipelineSystem,bi as PlaneGeometry,W as Point,lt as Polygon,Ga as Pool,La as PoolGroupClass,rn as ProxyRenderable,Ms as QuadGeometry,$o as RAD_TO_DEG,q as Rectangle,_t as RenderTarget,ey as RenderTexture,Re as RendererType,bn as ResizePlugin,Sl as Resolver,pn as RoundedRectangle,Hv as SCALE_MODES,te as STENCIL_MODES,ma as SVGParser,aa as SVGToGraphicsPath,ev as ScissorMask,Oc as SdfShader,Se as Shader,bt as ShaderStage,fa as ShapePath,io as SharedRenderPipes,no as SharedSystems,_u as ShockwaveFilter,Ue as Sprite,Ls as SpritePipe,il as SpriteView,Cr as Spritesheet,Ee as State,Jn as StencilMask,ts as StencilMaskPipe,Kr as SystemRunner,cy as Text,br as TextFormat,Le as TextStyle,hn as TextView,C as Texture,Qu as TextureBatchOutput,Ju as TextureBatcher,Tn as TextureLayout,Sn as TextureMatrix,oe as TexturePool,Vl as TexturePoolClass,le as TextureSource,He as TextureStyle,ry as TextureUvs,ct as Ticker,fr as TickerListener,vn as TickerPlugin,Ty as TilingSprite,Bs as TilingSpritePipe,Sc as TilingSpriteShader,wo as TilingSpriteView,Od as Transform,So as Triangle,Xn as UPDATE_BLEND,Ar as UPDATE_COLOR,ht as UPDATE_PRIORITY,xp as UPDATE_TRANSFORM,Mr as UPDATE_VISIBLE,sd as UniformBufferBatch,to as UniformBufferSystem,Q as UniformGroup,ro as VERSION,ln as ViewSystem,Ei as ViewableBuffer,eo as WGSL_TO_STD40_SIZE,Wv as WRAP_MODES,id as WebGLRenderer,yo as WebGPURenderer,Nn as WorkerManager,An as XMLFormat,Mn as XMLStringFormat,Hn as _getGlobalBounds,Br as addMaskBounds,Rr as addMaskLocalBounds,li as alphaWgsl,Pc as applyMatrix,cl as autoDetectRenderer,Or as batchSamplersUniformGroup,Lu as batcherTemplateFrag,Du as batcherTemplateVert,Ti as batcherTemplateWgsl,Ho as bitmapFontCachePlugin,eh as blendTemplateFrag,th as blendTemplateVert,rh as blendTemplateWgsl,Ql as blurTemplateWgsl,kn as buildAdaptiveBezier,ua as buildAdaptiveQuadratic,Fn as buildArc,ha as buildArcTo,da as buildArcToSvg,it as buildCircle,Ah as buildContextBatches,qm as buildGeometryFromPath,kh as buildInstructions,yh as buildLine,Hi as buildPolygon,Vi as buildRectangle,qi as buildSimpleUvs,ji as buildTriangle,Xi as buildUvs,jo as cacheTextureArray,jh as calculateProjection,dt as checkDataUrl,ft as checkExtension,Oa as childrenHelperMixin,mh as closePointEps,rr as collectAllRenderables,Os as collectLayerGroups,Qt as color32BitToUniform,ou as colorMatrixFilterFrag,fi as colorMatrixFilterWgsl,xm as colorToUniform,bc as compareModeToGlCompare,vs as compileShader,de as convertColorToNumber,Ut as convertFillInputToFillStyle,xr as convertNumberToHex,be as convertToList,pr as copySearchParams,mr as createIdFromString,xl as createStringVariations,Ea as createTexture,Yc as createUBOElements,Ku as currentCopy,Gr as currentCount,Di as curveEps,jc as defaultBackgroundOptions,di as defaultFilterVert,El as defaultUniformValue,ys as defaultValue,z as deprecation,Yo as detectAvif,qo as detectDefaults,Ko as detectMp4,Zo as detectOgv,Sy as detectVideoAlphaMode,Qo as detectWebm,Jo as detectWebp,au as displacementFrag,lu as displacementVert,pi as displacementWgsl,$a as effectsMixin,mt as emptyViewObserver,vi as ensureIsBuffer,jl as ensurePrecision,Rs as executeInstructions,Z as extensions,Fl as extractStructAndGroups,Fr as fastCopy,za as findMixin,ar as fontStringFromTextStyle,kr as generateBatchGlProgram,Ur as generateBatchProgram,ju as generateBindingSrc,ql as generateBlurFragSource,Zl as generateBlurGlProgram,Jl as generateBlurProgram,Kl as generateBlurVertSource,$u as generateDefaultBatchGlProgram,Yu as generateDefaultBatchProgram,fh as generateDefaultGraphicsBatchGlProgram,ph as generateDefaultGraphicsBatchProgram,Rc as generateDefaultSdfBatchGlProgram,kc as generateDefaultSdfBatchProgram,cm as generateGPULayout,Il as generateGpuLayoutGroups,hm as generateLayout,Gl as generateLayoutHash,lc as generateProgram,Vu as generateSampleSrc,rt as generateUID,Xc as generateUniformBufferSync,uc as generateUniformsSync,nc as getAttributeData,Xu as getBatchedGeometry,Vs as getBitmapTextLayout,lr as getCanvasFillStyle,Zr as getCanvasTexture,Fa as getFilterEffect,ia as getFontFamilyName,Wh as getGlInfoFromFormat,Ft as getGlobalBounds,hh as getGlobalRenderableBounds,et as getLocalBounds,Kn as getMatrixRelativeToParent,vh as getOrientationOfPoints,Wa as getParent,Vn as getRenderableUID,Sa as getResolutionOfUrl,Si as getTextureBatchBindGroup,tv as getTextureDefaultMatrix,ic as getUniformBufferData,sc as getUniformData,dc as glUploadBufferImageResource,fc as glUploadImageResource,hd as gpuUploadBufferImageResource,cd as gpuUploadImageResource,ch as graphicsBatcherTemplateFrag,dh as graphicsBatcherTemplateVert,Ii as graphicsBatcherTemplateWgsl,F as groupD8,nn as hex2rgb,Lc as hex2string,Uy as hslWgsl,Dr as hslgl,$r as hslgpu,py as isMobile,gg as isPow2,fs as isRenderingToScreen,Ht as isSingleItem,Ca as loadImageBitmap,ea as loadJson,Ta as loadSvg,Wn as loadTextures,ta as loadTxt,sa as loadWebFont,mg as log2,Yb as logDebugTexture,Hd as logLayerGroupScene,ac as logProgramError,Qb as logRenderFlow,Wd as logScene,Xb as logTexture,pc as mapFormatToGlFormat,gc as mapFormatToGlInternalFormat,mc as mapFormatToGlType,tc as mapSize,xs as mapType,hc as mapWebGLBlendModesToPixi,ah as maskFrag,lh as maskVert,ki as maskWgsl,Ha as measureMixin,Gh as meshDefaultFrag,Lh as meshDefaultVert,is as meshDefaultWgsl,wv as migrateFragmentFromV7toV8,vc as mipmapScaleModeToGlFilter,Ai as missing,Ir as missingCount,zr as mixColors,Li as mixHexColors,_m as mixStandardAnd32BitColors,ny as multiplyHexColors,nt as nextPow2,uu as noiseFrag,gi as noiseWgsl,Bt as normalizeExtensionPriority,Va as onRenderMixin,Zu as optimizeBindings,ae as path,ka as removeItems,Ws as resolveCharacters,Ba as resolveTextureUrl,Ia as returnFilterEffect,Nv as rgb2hex,Kc as sayHello,Ps as scaleModeToGlFilter,Cc as sdfBatcherTemplateFrag,Bc as sdfBatcherTemplateVert,Ds as sdfBatcherTemplateWgsl,Yl as setProgramName,Xl as setProgramVersion,$ as settings,gu as shockwaveFrag,mu as shockwaveVert,mi as shockwaveWgsl,ja as sortMixin,nl as spritesheetAsset,zv as string2hex,al as tempBounds,yr as testVideoFormat,md as textureToCanvas,vd as textureToCanvasWebGL,wc as tilingSpriteFrag,Tc as tilingSpriteVert,Cs as tilingSpriteWgsl,Ya as toLocalGlobalMixin,Yr as transformVertices,Wi as triangulateWithHoles,on as uniformBufferParsers,en as uniformParsers,Us as updateLayerGroupTransforms,Ec as updateLayerTransform,Ce as updateLocalTransform,Fs as updateTransformAndChildren,It as updateTransformBackwards,iy as updateWorldTransform,Lr as usedSlots,N as v8_0_0,Mc as validateRenderables,tn as wrapModeToGlAddress,Vo as xmlBitmapFontLoader};
//# sourceMappingURL=pixi.min.mjs.map
