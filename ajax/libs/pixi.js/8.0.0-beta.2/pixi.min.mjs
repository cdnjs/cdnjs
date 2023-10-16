/*!
 * PixiJS - v8.0.0-beta.2
 * Compiled Fri, 29 Sep 2023 15:44:27 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */class W{constructor(e=0,t=0){this.x=0,this.y=0,this.x=e,this.y=t}clone(){return new W(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,t=e){return this.x=e,this.y=t,this}static get shared(){return Zi.x=0,Zi.y=0,Zi}}const Zi=new W;class $t{constructor(e){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=$t.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new W,this.page=new W,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=e}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(e,t,i){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(e,t,i,n,s){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}var ug=Object.defineProperty,hg=Object.defineProperties,cg=Object.getOwnPropertyDescriptors,Fa=Object.getOwnPropertySymbols,dg=Object.prototype.hasOwnProperty,pg=Object.prototype.propertyIsEnumerable,Ua=(r,e,t)=>e in r?ug(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ia=(r,e)=>{for(var t in e||(e={}))dg.call(e,t)&&Ua(r,t,e[t]);if(Fa)for(var t of Fa(e))pg.call(e,t)&&Ua(r,t,e[t]);return r},fg=(r,e)=>hg(r,cg(e)),y=(r=>(r.Renderer="renderer",r.Application="application",r.WebGLPipes="webgl-pipes",r.WebGLPipesAdaptor="webgl-pipes-adaptor",r.WebGLSystem="webgl-system",r.WebGPUPipes="webgpu-pipes",r.WebGPUPipesAdaptor="webgpu-pipes-adaptor",r.WebGPUSystem="webgpu-system",r.CanvasSystem="canvas-system",r.CanvasPipesAdaptor="canvas-pipes-adaptor",r.CanvasPipes="canvas-pipes",r.Asset="asset",r.LoadParser="load-parser",r.ResolveParser="resolve-parser",r.CacheParser="cache-parser",r.DetectionParser="detection-parser",r.MaskEffect="mask-effect",r))(y||{});const Qi=r=>{if(typeof r=="function"||typeof r=="object"&&r.extension){const e=typeof r.extension!="object"?{type:r.extension}:r.extension;r=fg(Ia({},e),{ref:r})}if(typeof r=="object")r=Ia({},r);else throw new Error("Invalid extension type");return typeof r.type=="string"&&(r.type=[r.type]),r},Wt=(r,e)=>{var t;return(t=Qi(r).priority)!=null?t:e},Z={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...r){return r.map(Qi).forEach(e=>{e.type.forEach(t=>{var i,n;return(n=(i=this._removeHandlers)[t])==null?void 0:n.call(i,e)})}),this},add(...r){return r.map(Qi).forEach(e=>{e.type.forEach(t=>{const i=this._addHandlers,n=this._queue;i[t]?i[t](e):(n[t]=n[t]||[],n[t].push(e))})}),this},handle(r,e,t){const i=this._addHandlers,n=this._removeHandlers;i[r]=e,n[r]=t;const s=this._queue;return s[r]&&(s[r].forEach(o=>e(o)),delete s[r]),this},handleByMap(r,e){return this.handle(r,t=>{e[t.name]=t.ref},t=>{delete e[t.name]})},handleByNamedList(r,e,t=-1){return this.handle(r,i=>{e.findIndex(n=>n.name===i.name)>=0||(e.push({name:i.name,value:i.ref}),e.sort((n,s)=>Wt(s.value,t)-Wt(n.value,t)))},i=>{const n=e.findIndex(s=>s.name===i.name);n!==-1&&e.splice(n,1)})},handleByList(r,e,t=-1){return this.handle(r,i=>{e.includes(i.ref)||(e.push(i.ref),e.sort((n,s)=>Wt(s,t)-Wt(n,t)))},i=>{const n=e.indexOf(i.ref);n!==-1&&e.splice(n,1)})}};var r1=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function i1(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function gg(r,e,t){return t={path:e,exports:{},require:function(i,n){return mg(i,n==null?t.path:n)}},r(t,t.exports),t.exports}function n1(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}function s1(r){return r&&Object.prototype.hasOwnProperty.call(r,"default")&&Object.keys(r).length===1?r.default:r}function o1(r){if(r.__esModule)return r;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(r).forEach(function(t){var i=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:function(){return r[t]}})}),e}function mg(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var he=gg(function(r){"use strict";var e=Object.prototype.hasOwnProperty,t="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(t=!1));function n(l,u,h){this.fn=l,this.context=u,this.once=h||!1}function s(l,u,h,c,p){if(typeof h!="function")throw new TypeError("The listener must be a function");var d=new n(h,c||l,p),f=t?t+u:u;return l._events[f]?l._events[f].fn?l._events[f]=[l._events[f],d]:l._events[f].push(d):(l._events[f]=d,l._eventsCount++),l}function o(l,u){--l._eventsCount===0?l._events=new i:delete l._events[u]}function a(){this._events=new i,this._eventsCount=0}a.prototype.eventNames=function(){var u=[],h,c;if(this._eventsCount===0)return u;for(c in h=this._events)e.call(h,c)&&u.push(t?c.slice(1):c);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(h)):u},a.prototype.listeners=function(u){var h=t?t+u:u,c=this._events[h];if(!c)return[];if(c.fn)return[c.fn];for(var p=0,d=c.length,f=new Array(d);p<d;p++)f[p]=c[p].fn;return f},a.prototype.listenerCount=function(u){var h=t?t+u:u,c=this._events[h];return c?c.fn?1:c.length:0},a.prototype.emit=function(u,h,c,p,d,f){var m=t?t+u:u;if(!this._events[m])return!1;var g=this._events[m],x=arguments.length,b,v;if(g.fn){switch(g.once&&this.removeListener(u,g.fn,void 0,!0),x){case 1:return g.fn.call(g.context),!0;case 2:return g.fn.call(g.context,h),!0;case 3:return g.fn.call(g.context,h,c),!0;case 4:return g.fn.call(g.context,h,c,p),!0;case 5:return g.fn.call(g.context,h,c,p,d),!0;case 6:return g.fn.call(g.context,h,c,p,d,f),!0}for(v=1,b=new Array(x-1);v<x;v++)b[v-1]=arguments[v];g.fn.apply(g.context,b)}else{var _=g.length,P;for(v=0;v<_;v++)switch(g[v].once&&this.removeListener(u,g[v].fn,void 0,!0),x){case 1:g[v].fn.call(g[v].context);break;case 2:g[v].fn.call(g[v].context,h);break;case 3:g[v].fn.call(g[v].context,h,c);break;case 4:g[v].fn.call(g[v].context,h,c,p);break;default:if(!b)for(P=1,b=new Array(x-1);P<x;P++)b[P-1]=arguments[P];g[v].fn.apply(g[v].context,b)}}return!0},a.prototype.on=function(u,h,c){return s(this,u,h,c,!1)},a.prototype.once=function(u,h,c){return s(this,u,h,c,!0)},a.prototype.removeListener=function(u,h,c,p){var d=t?t+u:u;if(!this._events[d])return this;if(!h)return o(this,d),this;var f=this._events[d];if(f.fn)f.fn===h&&(!p||f.once)&&(!c||f.context===c)&&o(this,d);else{for(var m=0,g=[],x=f.length;m<x;m++)(f[m].fn!==h||p&&!f[m].once||c&&f[m].context!==c)&&g.push(f[m]);g.length?this._events[d]=g.length===1?g[0]:g:o(this,d)}return this},a.prototype.removeAllListeners=function(u){var h;return u?(h=t?t+u:u,this._events[h]&&o(this,h)):(this._events=new i,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=t,a.EventEmitter=a,r.exports=a}),bg={grad:.9,turn:360,rad:360/(2*Math.PI)},Fe=function(r){return typeof r=="string"?r.length>0:typeof r=="number"},oe=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=Math.pow(10,e)),Math.round(t*r)/t+0},ve=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=1),r>t?t:r>e?r:e},Ga=function(r){return(r=isFinite(r)?r%360:0)>0?r:r+360},$a=function(r){return{r:ve(r.r,0,255),g:ve(r.g,0,255),b:ve(r.b,0,255),a:ve(r.a)}},Ji=function(r){return{r:oe(r.r),g:oe(r.g),b:oe(r.b),a:oe(r.a,3)}},vg=/^#([0-9a-f]{3,8})$/i,Or=function(r){var e=r.toString(16);return e.length<2?"0"+e:e},La=function(r){var e=r.r,t=r.g,i=r.b,n=r.a,s=Math.max(e,t,i),o=s-Math.min(e,t,i),a=o?s===e?(t-i)/o:s===t?2+(i-e)/o:4+(e-t)/o:0;return{h:60*(a<0?a+6:a),s:s?o/s*100:0,v:s/255*100,a:n}},Da=function(r){var e=r.h,t=r.s,i=r.v,n=r.a;e=e/360*6,t/=100,i/=100;var s=Math.floor(e),o=i*(1-t),a=i*(1-(e-s)*t),l=i*(1-(1-e+s)*t),u=s%6;return{r:255*[i,a,o,o,l,i][u],g:255*[l,i,i,a,o,o][u],b:255*[o,o,l,i,i,a][u],a:n}},za=function(r){return{h:Ga(r.h),s:ve(r.s,0,100),l:ve(r.l,0,100),a:ve(r.a)}},Na=function(r){return{h:oe(r.h),s:oe(r.s),l:oe(r.l),a:oe(r.a,3)}},Ha=function(r){return Da((t=(e=r).s,{h:e.h,s:(t*=((i=e.l)<50?i:100-i)/100)>0?2*t/(i+t)*100:0,v:i+t,a:e.a}));var e,t,i},Vt=function(r){return{h:(e=La(r)).h,s:(n=(200-(t=e.s))*(i=e.v)/100)>0&&n<200?t*i/100/(n<=100?n:200-n)*100:0,l:n/2,a:e.a};var e,t,i,n},yg=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,xg=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,_g=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,wg=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,en={string:[[function(r){var e=vg.exec(r);return e?(r=e[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:r.length===4?oe(parseInt(r[3]+r[3],16)/255,2):1}:r.length===6||r.length===8?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:r.length===8?oe(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var e=_g.exec(r)||wg.exec(r);return e?e[2]!==e[4]||e[4]!==e[6]?null:$a({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(r){var e=yg.exec(r)||xg.exec(r);if(!e)return null;var t,i,n=za({h:(t=e[1],i=e[2],i===void 0&&(i="deg"),Number(t)*(bg[i]||1)),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)});return Ha(n)},"hsl"]],object:[[function(r){var e=r.r,t=r.g,i=r.b,n=r.a,s=n===void 0?1:n;return Fe(e)&&Fe(t)&&Fe(i)?$a({r:Number(e),g:Number(t),b:Number(i),a:Number(s)}):null},"rgb"],[function(r){var e=r.h,t=r.s,i=r.l,n=r.a,s=n===void 0?1:n;if(!Fe(e)||!Fe(t)||!Fe(i))return null;var o=za({h:Number(e),s:Number(t),l:Number(i),a:Number(s)});return Ha(o)},"hsl"],[function(r){var e=r.h,t=r.s,i=r.v,n=r.a,s=n===void 0?1:n;if(!Fe(e)||!Fe(t)||!Fe(i))return null;var o=function(a){return{h:Ga(a.h),s:ve(a.s,0,100),v:ve(a.v,0,100),a:ve(a.a)}}({h:Number(e),s:Number(t),v:Number(i),a:Number(s)});return Da(o)},"hsv"]]},ja=function(r,e){for(var t=0;t<e.length;t++){var i=e[t][0](r);if(i)return[i,e[t][1]]}return[null,void 0]},Wa=function(r){return typeof r=="string"?ja(r.trim(),en.string):typeof r=="object"&&r!==null?ja(r,en.object):[null,void 0]},a1=function(r){return Wa(r)[1]},tn=function(r,e){var t=Vt(r);return{h:t.h,s:ve(t.s+100*e,0,100),l:t.l,a:t.a}},rn=function(r){return(299*r.r+587*r.g+114*r.b)/1e3/255},Va=function(r,e){var t=Vt(r);return{h:t.h,s:t.s,l:ve(t.l+100*e,0,100),a:t.a}},Fr=function(){function r(e){this.parsed=Wa(e)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return r.prototype.isValid=function(){return this.parsed!==null},r.prototype.brightness=function(){return oe(rn(this.rgba),2)},r.prototype.isDark=function(){return rn(this.rgba)<.5},r.prototype.isLight=function(){return rn(this.rgba)>=.5},r.prototype.toHex=function(){return e=Ji(this.rgba),t=e.r,i=e.g,n=e.b,o=(s=e.a)<1?Or(oe(255*s)):"","#"+Or(t)+Or(i)+Or(n)+o;var e,t,i,n,s,o},r.prototype.toRgb=function(){return Ji(this.rgba)},r.prototype.toRgbString=function(){return e=Ji(this.rgba),t=e.r,i=e.g,n=e.b,(s=e.a)<1?"rgba("+t+", "+i+", "+n+", "+s+")":"rgb("+t+", "+i+", "+n+")";var e,t,i,n,s},r.prototype.toHsl=function(){return Na(Vt(this.rgba))},r.prototype.toHslString=function(){return e=Na(Vt(this.rgba)),t=e.h,i=e.s,n=e.l,(s=e.a)<1?"hsla("+t+", "+i+"%, "+n+"%, "+s+")":"hsl("+t+", "+i+"%, "+n+"%)";var e,t,i,n,s},r.prototype.toHsv=function(){return e=La(this.rgba),{h:oe(e.h),s:oe(e.s),v:oe(e.v),a:oe(e.a,3)};var e},r.prototype.invert=function(){return Me({r:255-(e=this.rgba).r,g:255-e.g,b:255-e.b,a:e.a});var e},r.prototype.saturate=function(e){return e===void 0&&(e=.1),Me(tn(this.rgba,e))},r.prototype.desaturate=function(e){return e===void 0&&(e=.1),Me(tn(this.rgba,-e))},r.prototype.grayscale=function(){return Me(tn(this.rgba,-1))},r.prototype.lighten=function(e){return e===void 0&&(e=.1),Me(Va(this.rgba,e))},r.prototype.darken=function(e){return e===void 0&&(e=.1),Me(Va(this.rgba,-e))},r.prototype.rotate=function(e){return e===void 0&&(e=15),this.hue(this.hue()+e)},r.prototype.alpha=function(e){return typeof e=="number"?Me({r:(t=this.rgba).r,g:t.g,b:t.b,a:e}):oe(this.rgba.a,3);var t},r.prototype.hue=function(e){var t=Vt(this.rgba);return typeof e=="number"?Me({h:e,s:t.s,l:t.l,a:t.a}):oe(t.h)},r.prototype.isEqual=function(e){return this.toHex()===Me(e).toHex()},r}(),Me=function(r){return r instanceof Fr?r:new Fr(r)},Ya=[],Tg=function(r){r.forEach(function(e){Ya.indexOf(e)<0&&(e(Fr,en),Ya.push(e))})},l1=function(){return new Fr({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})};function Sg(r,e){var t={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},i={};for(var n in t)i[t[n]]=n;var s={};r.prototype.toName=function(o){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,l,u=i[this.toHex()];if(u)return u;if(o!=null&&o.closest){var h=this.toRgb(),c=1/0,p="black";if(!s.length)for(var d in t)s[d]=new r(t[d]).toRgb();for(var f in t){var m=(a=h,l=s[f],Math.pow(a.r-l.r,2)+Math.pow(a.g-l.g,2)+Math.pow(a.b-l.b,2));m<c&&(c=m,p=f)}return p}},e.string.push([function(o){var a=o.toLowerCase(),l=a==="transparent"?"#0000":t[a];return l?new r(l).toRgb():null},"name"])}var Pg=Object.defineProperty,Xa=Object.getOwnPropertySymbols,Ag=Object.prototype.hasOwnProperty,Eg=Object.prototype.propertyIsEnumerable,qa=(r,e,t)=>e in r?Pg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Cg=(r,e)=>{for(var t in e||(e={}))Ag.call(e,t)&&qa(r,t,e[t]);if(Xa)for(var t of Xa(e))Eg.call(e,t)&&qa(r,t,e[t]);return r};Tg([Sg]);const Ke=class{constructor(r=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=r}get red(){return this._components[0]}get green(){return this._components[1]}get blue(){return this._components[2]}get alpha(){return this._components[3]}setValue(r){return this.value=r,this}set value(r){if(r instanceof Ke)this._value=this._cloneSource(r._value),this._int=r._int,this._components.set(r._components);else{if(r===null)throw new Error("Cannot set Color#value to null");(this._value===null||!this._isSourceEqual(this._value,r))&&(this._normalize(r),this._value=this._cloneSource(r))}}get value(){return this._value}_cloneSource(r){return typeof r=="string"||typeof r=="number"||r instanceof Number||r===null?r:Array.isArray(r)||ArrayBuffer.isView(r)?r.slice(0):typeof r=="object"&&r!==null?Cg({},r):r}_isSourceEqual(r,e){const t=typeof r;if(t!==typeof e)return!1;if(t==="number"||t==="string"||r instanceof Number)return r===e;if(Array.isArray(r)&&Array.isArray(e)||ArrayBuffer.isView(r)&&ArrayBuffer.isView(e))return r.length!==e.length?!1:r.every((i,n)=>i===e[n]);if(r!==null&&e!==null){const i=Object.keys(r),n=Object.keys(e);return i.length!==n.length?!1:i.every(s=>r[s]===e[s])}return r===e}toRgba(){const[r,e,t,i]=this._components;return{r,g:e,b:t,a:i}}toRgb(){const[r,e,t]=this._components;return{r,g:e,b:t}}toRgbaString(){const[r,e,t]=this.toUint8RgbArray();return`rgba(${r},${e},${t},${this.alpha})`}toUint8RgbArray(r){const[e,t,i]=this._components;return this._arrayRgb||(this._arrayRgb=[]),r=r||this._arrayRgb,r[0]=Math.round(e*255),r[1]=Math.round(t*255),r[2]=Math.round(i*255),r}toArray(r){this._arrayRgba||(this._arrayRgba=[]),r=r||this._arrayRgba;const[e,t,i,n]=this._components;return r[0]=e,r[1]=t,r[2]=i,r[3]=n,r}toRgbArray(r){this._arrayRgb||(this._arrayRgb=[]),r=r||this._arrayRgb;const[e,t,i]=this._components;return r[0]=e,r[1]=t,r[2]=i,r}toNumber(){return this._int}toBgrNumber(){const[r,e,t]=this.toUint8RgbArray();return(t<<16)+(e<<8)+r}toLittleEndianNumber(){const r=this._int;return(r>>16)+(r&65280)+((r&255)<<16)}multiply(r){const[e,t,i,n]=Ke._temp.setValue(r)._components;return this._components[0]*=e,this._components[1]*=t,this._components[2]*=i,this._components[3]*=n,this._refreshInt(),this._value=null,this}premultiply(r,e=!0){return e&&(this._components[0]*=r,this._components[1]*=r,this._components[2]*=r),this._components[3]=r,this._refreshInt(),this._value=null,this}toPremultiplied(r,e=!0){if(r===1)return(255<<24)+this._int;if(r===0)return e?0:this._int;let t=this._int>>16&255,i=this._int>>8&255,n=this._int&255;return e&&(t=t*r+.5|0,i=i*r+.5|0,n=n*r+.5|0),(r*255<<24)+(t<<16)+(i<<8)+n}toHex(){const r=this._int.toString(16);return`#${"000000".substring(0,6-r.length)+r}`}toHexa(){const r=Math.round(this._components[3]*255).toString(16);return this.toHex()+"00".substring(0,2-r.length)+r}setAlpha(r){return this._components[3]=this._clamp(r),this}_normalize(r){let e,t,i,n;if((typeof r=="number"||r instanceof Number)&&r>=0&&r<=16777215){const s=r;e=(s>>16&255)/255,t=(s>>8&255)/255,i=(s&255)/255,n=1}else if((Array.isArray(r)||r instanceof Float32Array)&&r.length>=3&&r.length<=4)r=this._clamp(r),[e,t,i,n=1]=r;else if((r instanceof Uint8Array||r instanceof Uint8ClampedArray)&&r.length>=3&&r.length<=4)r=this._clamp(r,0,255),[e,t,i,n=255]=r,e/=255,t/=255,i/=255,n/=255;else if(typeof r=="string"||typeof r=="object"){if(typeof r=="string"){const o=Ke.HEX_PATTERN.exec(r);o&&(r=`#${o[2]}`)}const s=Me(r);s.isValid()&&({r:e,g:t,b:i,a:n}=s.rgba,e/=255,t/=255,i/=255)}if(e!==void 0)this._components[0]=e,this._components[1]=t,this._components[2]=i,this._components[3]=n,this._refreshInt();else throw new Error(`Unable to convert color ${r}`)}_refreshInt(){this._clamp(this._components);const[r,e,t]=this._components;this._int=(r*255<<16)+(e*255<<8)+(t*255|0)}_clamp(r,e=0,t=1){return typeof r=="number"?Math.min(Math.max(r,e),t):(r.forEach((i,n)=>{r[n]=Math.min(Math.max(i,e),t)}),r)}static isColorLike(r){return typeof r=="number"||typeof r=="string"||r instanceof Number||r instanceof Ke||Array.isArray(r)||r instanceof Uint8Array||r instanceof Uint8ClampedArray||r instanceof Float32Array||r.r!==void 0&&r.g!==void 0&&r.b!==void 0||r.r!==void 0&&r.g!==void 0&&r.b!==void 0&&r.a!==void 0||r.h!==void 0&&r.s!==void 0&&r.l!==void 0||r.h!==void 0&&r.s!==void 0&&r.l!==void 0&&r.a!==void 0||r.h!==void 0&&r.s!==void 0&&r.v!==void 0||r.h!==void 0&&r.s!==void 0&&r.v!==void 0&&r.a!==void 0}};let j=Ke;j.shared=new Ke,j._temp=new Ke,j.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;const Ka=Math.PI*2,Za=180/Math.PI,Qa=Math.PI/180;class k{constructor(e=1,t=0,i=0,n=1,s=0,o=0){this.array=null,this.a=e,this.b=t,this.c=i,this.d=n,this.tx=s,this.ty=o}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,t,i,n,s,o){return this.a=e,this.b=t,this.c=i,this.d=n,this.tx=s,this.ty=o,this}toArray(e,t){this.array||(this.array=new Float32Array(9));const i=t||this.array;return e?(i[0]=this.a,i[1]=this.b,i[2]=0,i[3]=this.c,i[4]=this.d,i[5]=0,i[6]=this.tx,i[7]=this.ty,i[8]=1):(i[0]=this.a,i[1]=this.c,i[2]=this.tx,i[3]=this.b,i[4]=this.d,i[5]=this.ty,i[6]=0,i[7]=0,i[8]=1),i}apply(e,t){t=t||new W;const i=e.x,n=e.y;return t.x=this.a*i+this.c*n+this.tx,t.y=this.b*i+this.d*n+this.ty,t}applyInverse(e,t){t=t||new W;const i=this.a,n=this.b,s=this.c,o=this.d,a=this.tx,l=this.ty,u=1/(i*o+s*-n),h=e.x,c=e.y;return t.x=o*u*h+-s*u*c+(l*s-a*o)*u,t.y=i*u*c+-n*u*h+(-l*i+a*n)*u,t}translate(e,t){return this.tx+=e,this.ty+=t,this}scale(e,t){return this.a*=e,this.d*=t,this.c*=e,this.b*=t,this.tx*=e,this.ty*=t,this}rotate(e){const t=Math.cos(e),i=Math.sin(e),n=this.a,s=this.c,o=this.tx;return this.a=n*t-this.b*i,this.b=n*i+this.b*t,this.c=s*t-this.d*i,this.d=s*i+this.d*t,this.tx=o*t-this.ty*i,this.ty=o*i+this.ty*t,this}append(e){const t=this.a,i=this.b,n=this.c,s=this.d;return this.a=e.a*t+e.b*n,this.b=e.a*i+e.b*s,this.c=e.c*t+e.d*n,this.d=e.c*i+e.d*s,this.tx=e.tx*t+e.ty*n+this.tx,this.ty=e.tx*i+e.ty*s+this.ty,this}appendFrom(e,t){const i=e.a,n=e.b,s=e.c,o=e.d,a=e.tx,l=e.ty,u=t.a,h=t.b,c=t.c,p=t.d;return this.a=i*u+n*c,this.b=i*h+n*p,this.c=s*u+o*c,this.d=s*h+o*p,this.tx=a*u+l*c+t.tx,this.ty=a*h+l*p+t.ty,this}setTransform(e,t,i,n,s,o,a,l,u){return this.a=Math.cos(a+u)*s,this.b=Math.sin(a+u)*s,this.c=-Math.sin(a-l)*o,this.d=Math.cos(a-l)*o,this.tx=e-(i*this.a+n*this.c),this.ty=t-(i*this.b+n*this.d),this}prepend(e){const t=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const i=this.a,n=this.c;this.a=i*e.a+this.b*e.c,this.b=i*e.b+this.b*e.d,this.c=n*e.a+this.d*e.c,this.d=n*e.b+this.d*e.d}return this.tx=t*e.a+this.ty*e.c+e.tx,this.ty=t*e.b+this.ty*e.d+e.ty,this}decompose(e){const t=this.a,i=this.b,n=this.c,s=this.d,o=e.pivot,a=-Math.atan2(-n,s),l=Math.atan2(i,t),u=Math.abs(a+l);return u<1e-5||Math.abs(Ka-u)<1e-5?(e.rotation=l,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=a,e.skew.y=l),e.scale.x=Math.sqrt(t*t+i*i),e.scale.y=Math.sqrt(n*n+s*s),e.position.x=this.tx+(o.x*t+o.y*n),e.position.y=this.ty+(o.x*i+o.y*s),e}invert(){const e=this.a,t=this.b,i=this.c,n=this.d,s=this.tx,o=e*n-t*i;return this.a=n/o,this.b=-t/o,this.c=-i/o,this.d=e/o,this.tx=(i*this.ty-n*s)/o,this.ty=-(e*this.ty-t*s)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new k;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}static get IDENTITY(){return Bg.identity()}static get shared(){return Mg.identity()}}const Mg=new k,Bg=new k;class se{constructor(e,t,i){this._x=t||0,this._y=i||0,this._observer=e}clone(e){return new se(e!=null?e:this._observer,this._x,this._y)}set(e=0,t=e){return(this._x!==e||this._y!==t)&&(this._x=e,this._y=t,this._observer.onUpdate()),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this._observer.onUpdate()),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this._observer.onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this._observer.onUpdate(this))}}const nn={default:-1};function X(r="default"){return nn[r]===void 0&&(nn[r]=-1),++nn[r]}const Ja={},G="8.0.0";function O(r,e,t=3){if(Ja[e])return;let i=new Error().stack;typeof i=="undefined"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`):(i=i.split(`
`).splice(t).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${r}`),console.warn(i),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${r}`),console.warn(i))),Ja[e]=!0}function sn(r,e,t){const i=r.length;let n;if(e>=i||t===0)return;t=e+t>i?i-e:t;const s=i-t;for(n=e;n<s;++n)r[n]=r[n+t];r.length=s}const el={allowChildren:!0,removeChildren(r=0,e){const t=e!=null?e:this.children.length,i=t-r,n=[];if(i>0&&i<=t){for(let s=t-1;s>=r;s--){const o=this.children[s];o&&(this.layerGroup&&this.layerGroup.removeChild(o),n.push(o),o.parent=null)}sn(this.children,r,t);for(let s=0;s<n.length;++s)this.emit("childRemoved",n[s],this,s),n[s].emit("removed",this);return n}else if(i===0&&this.children.length===0)return n;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(r){const e=this.getChildAt(r);return this.removeChild(e)},getChildAt(r){if(r<0||r>=this.children.length)throw new Error(`getChildAt: Index (${r}) does not exist.`);return this.children[r]},setChildIndex(r,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(r),this.addChildAt(r,e)},getChildIndex(r){const e=this.children.indexOf(r);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(r,e){this.allowChildren||O(G,"addChildAt: Only Containers will be allowed to add children in v8.0.0");const{children:t}=this;if(e<0||e>t.length)throw new Error(`${r}addChildAt: The index ${e} supplied is out of bounds ${t.length}`);if(r.parent){const i=r.parent.children.indexOf(r);if(r.parent===this&&i===e)return r;i!==-1&&r.parent.children.splice(i,1)}return e===t.length?t.push(r):t.splice(e,0,r),r.parent=this,r.didChange=!0,r.didViewUpdate=!1,r._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(r),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",r,this,e),r.emit("added",this),r},swapChildren(r,e){if(r===e)return;const t=this.getChildIndex(r),i=this.getChildIndex(e);this.children[t]=e,this.children[i]=r},removeFromParent(){var r;(r=this.parent)==null||r.removeChild(this)}};class Ur{constructor(e){this.pipe="filter",this.priority=1,this.filters=e==null?void 0:e.filters}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null}}const tl=[];function rl(r){const e=tl.pop()||new Ur;return e.filters=r,e}function il(r){r.filters=null,tl.push(r)}class nl{constructor(e,t){this._pool=[],this._count=0,this._index=0,this._classType=e,t&&this.prepopulate(t)}prepopulate(e){for(let t=0;t<e;t++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){var t;let i;return this._index>0?i=this._pool[--this._index]:i=new this._classType,(t=i.init)==null||t.call(i,e),i}return(e){var t;(t=e.reset)==null||t.call(e),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._pool.length}get totalUsed(){return this._count-this._pool.length}}class sl{constructor(){this._poolsByClass=new Map}prepopulate(e,t){this.getPool(e).prepopulate(t)}get(e,t){return this.getPool(e).get(t)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new nl(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(t=>{const i=e[t._classType.name]?t._classType.name+t._classType.ID:t._classType.name;e[i]={free:t.totalFree,used:t.totalUsed,size:t.totalSize}}),e}}const N=new sl;class ol{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this._tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let t=0;t<this._tests.length;t++){const i=this._tests[t];if(i.test(e))return N.get(i.maskClass,e)}return e}returnMaskEffect(e){N.return(e)}}const Ir=new ol;Z.handleByList(y.MaskEffect,Ir._effectClasses);const al={_mask:null,_filters:null,effects:[],addEffect(r){this.effects.indexOf(r)===-1&&(this.effects.push(r),this.effects.sort((e,t)=>e.priority-t.priority),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())},removeEffect(r){const e=this.effects.indexOf(r);e!==-1&&(this.effects.splice(e,1),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())},set mask(r){if(this._mask||(this._mask={mask:null,effect:null}),this._mask.mask===r||(this._mask.effect&&(this.removeEffect(this._mask.effect),Ir.returnMaskEffect(this._mask.effect),this._mask.effect=null),this._mask.mask=r,r==null))return;const e=Ir.getMaskEffect(r);this._mask.effect=e,this.addEffect(e)},get mask(){var r;return(r=this._mask)==null?void 0:r.mask},set filters(r){if(!Array.isArray(r)&&r!==null&&(r=[r]),this._filters||(this._filters={filters:null,effect:null}),this._filters.filters===r||(this._filters.effect&&(this.removeEffect(this._filters.effect),il(this._filters.effect),this._filters.effect=null),this._filters.filters=r,!r))return;const e=rl(r);this._filters.effect=e,this.addEffect(e)},get filters(){var r;return(r=this._filters)==null?void 0:r.filters}},ll={label:null,get name(){return O(G,"Container.name property has been removed, use Container.label instead"),this.label},set name(r){O(G,"Container.name property has been removed, use Container.label instead"),this.label=r},getChildByName(r,e=!1){return this.getChildByLabel(r,e)},getChildByLabel(r,e=!1){const t=this.children;for(let i=0;i<t.length;i++){const n=t[i];if(n.label===r||r instanceof RegExp&&r.test(n.label))return n}if(e)for(let i=0;i<t.length;i++){const n=t[i].getChildByLabel(r,!0);if(n)return n}return null},getChildrenByLabel(r,e=!1,t=[]){const i=this.children;for(let n=0;n<i.length;n++){const s=i[n];(s.label===r||r instanceof RegExp&&r.test(s.label))&&t.push(s)}if(e)for(let n=0;n<i.length;n++)i[n].getChildrenByLabel(r,!0,t);return t}},Gr=[new W,new W,new W,new W];class K{constructor(e=0,t=0,i=0,n=0){this.type="rectangle",this.x=Number(e),this.y=Number(t),this.width=Number(i),this.height=Number(n)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}static get EMPTY(){return new K(0,0,0,0)}clone(){return new K(this.x,this.y,this.width,this.height)}copyFromBounds(e){return this.x=e.minX,this.y=e.minY,this.width=e.maxX-e.minX,this.height=e.maxY-e.minY,this}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&t>=this.y&&t<this.y+this.height}intersects(e,t){if(!t){const S=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=S)return!1;const w=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>w}const i=this.left,n=this.right,s=this.top,o=this.bottom;if(n<=i||o<=s)return!1;const a=Gr[0].set(e.left,e.top),l=Gr[1].set(e.left,e.bottom),u=Gr[2].set(e.right,e.top),h=Gr[3].set(e.right,e.bottom);if(u.x<=a.x||l.y<=a.y)return!1;const c=Math.sign(t.a*t.d-t.b*t.c);if(c===0||(t.apply(a,a),t.apply(l,l),t.apply(u,u),t.apply(h,h),Math.max(a.x,l.x,u.x,h.x)<=i||Math.min(a.x,l.x,u.x,h.x)>=n||Math.max(a.y,l.y,u.y,h.y)<=s||Math.min(a.y,l.y,u.y,h.y)>=o))return!1;const p=c*(l.y-a.y),d=c*(a.x-l.x),f=p*i+d*s,m=p*n+d*s,g=p*i+d*o,x=p*n+d*o;if(Math.max(f,m,g,x)<=p*a.x+d*a.y||Math.min(f,m,g,x)>=p*h.x+d*h.y)return!1;const b=c*(a.y-u.y),v=c*(u.x-a.x),_=b*i+v*s,P=b*n+v*s,C=b*i+v*o,B=b*n+v*o;return!(Math.max(_,P,C,B)<=b*a.x+v*a.y||Math.min(_,P,C,B)>=b*h.x+v*h.y)}pad(e=0,t=e){return this.x-=e,this.y-=t,this.width+=e*2,this.height+=t*2,this}fit(e){const t=Math.max(this.x,e.x),i=Math.min(this.x+this.width,e.x+e.width),n=Math.max(this.y,e.y),s=Math.min(this.y+this.height,e.y+e.height);return this.x=t,this.width=Math.max(i-t,0),this.y=n,this.height=Math.max(s-n,0),this}ceil(e=1,t=.001){const i=Math.ceil((this.x+this.width-t)*e)/e,n=Math.ceil((this.y+this.height-t)*e)/e;return this.x=Math.floor((this.x+t)*e)/e,this.y=Math.floor((this.y+t)*e)/e,this.width=i-this.x,this.height=n-this.y,this}enlarge(e){const t=Math.min(this.x,e.x),i=Math.max(this.x+this.width,e.x+e.width),n=Math.min(this.y,e.y),s=Math.max(this.y+this.height,e.y+e.height);return this.x=t,this.width=i-t,this.y=n,this.height=s-n,this}getBounds(e){return e=e||new K,e.copyFrom(this),e}}class pe{constructor(e=1/0,t=1/0,i=-1/0,n=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack=[],this.matrix=new k,this.minX=e,this.minY=t,this.maxX=i,this.maxY=n}get rectangle(){this._rectangle||(this._rectangle=new K);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):e.copyFromBounds(this),e}clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack.length=0,this.matrix.identity()}pushMatrix(e){this._matrixStack.push(e),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(e)):this.matrix.copyFrom(e)}popMatrix(){this._matrixStack.pop(),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(this._matrixStack[this._matrixStack.length-1])):this._matrixStack.length===1?this.matrix.copyFrom(this._matrixStack[0]):this.matrix.identity()}setMatrix(e){this.matrix.copyFrom(e)}set(e,t,i,n){this.minX=e,this.minY=t,this.maxX=i,this.maxY=n}addFrame(e,t,i,n){const s=this.matrix,o=s.a,a=s.b,l=s.c,u=s.d,h=s.tx,c=s.ty;let p=this.minX,d=this.minY,f=this.maxX,m=this.maxY,g=o*e+l*t+h,x=a*e+u*t+c;p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,g=o*i+l*t+h,x=a*i+u*t+c,p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,g=o*e+l*n+h,x=a*e+u*n+c,p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,g=o*i+l*n+h,x=a*i+u*n+c,p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,this.minX=p,this.minY=d,this.maxX=f,this.maxY=m}addRect(e){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height)}addBounds(e){this.addFrame(e.minX,e.minY,e.maxX,e.maxY)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const t=this.minX,i=this.minY,n=this.maxX,s=this.maxY,{a:o,b:a,c:l,d:u,tx:h,ty:c}=e;let p=o*t+l*i+h,d=a*t+u*i+c;this.minX=p,this.minY=d,this.maxX=p,this.maxY=d,p=o*n+l*i+h,d=a*n+u*i+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*t+l*s+h,d=a*t+u*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*n+l*s+h,d=a*n+u*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}pad(e,t=e){return this.minX-=e,this.maxX+=e,this.minY-=t,this.maxY+=t,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new pe(this.minX,this.minY,this.maxX,this.maxY)}scale(e,t=e){return this.minX*=e,this.minY*=t,this.maxX*=e,this.maxY*=t,this}get x(){return this.minX}get y(){return this.minY}get width(){return this.maxX-this.minX}get height(){return this.maxY-this.minY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,t,i){let n=this.minX,s=this.minY,o=this.maxX,a=this.maxY;const l=this.matrix,u=l.a,h=l.b,c=l.c,p=l.d,d=l.tx,f=l.ty;for(let m=t;m<i;m+=2){const g=e[m],x=e[m+1],b=u*g+c*x+d,v=h*g+p*x+f;n=b<n?b:n,s=v<s?v:s,o=b>o?b:o,a=v>a?v:a}this.minX=n,this.minY=s,this.maxX=o,this.maxY=a}toString(){return`[@pixi:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}}function Ue(r,e){const t=e._scale,i=e._pivot,n=e._position,s=t._x,o=t._y,a=i._x,l=i._y;r.a=e._cx*s,r.b=e._sx*s,r.c=e._cy*o,r.d=e._sy*o,r.tx=n._x-(a*r.a+l*r.c),r.ty=n._y-(a*r.b+l*r.d)}function Yt(r,e,t){t.clear();let i;return r.parent?e?i=r.parent.worldTransform:i=Xt(r,new k):i=k.IDENTITY,on(r,t,i,e),t.isValid||t.set(0,0,0,0),t}function on(r,e,t,i){var n,s;if(!r.visible||!r.measurable)return;let o;i?o=r.worldTransform:(r.didChange&&Ue(r.localTransform,r),o=k.shared.appendFrom(r.localTransform,t).clone());const a=e,l=!!r.effects.length;l&&(e=e.clone()),r.view&&(e.setMatrix(o),r.view.addBounds(e));for(let u=0;u<r.children.length;u++)on(r.children[u],e,o,i);if(l){for(let u=0;u<r.effects.length;u++)(s=(n=r.effects[u]).addBounds)==null||s.call(n,e);a.setMatrix(k.IDENTITY),a.addBounds(e)}}function Xt(r,e){const t=r.parent;return t&&(Xt(t,e),t.didChange&&Ue(t.localTransform,t),e.append(t.localTransform)),e}function He(r,e,t){e.clear(),t||(t=new k),r.view&&(e.setMatrix(t),r.view.addBounds(e));for(let i=0;i<r.children.length;i++)ul(r.children[i],e,t,r);return e.isValid||e.set(0,0,0,0),e}function ul(r,e,t,i){var n,s;if(!r.visible||!r.measurable)return;r.didChange&&Ue(r.localTransform,r);const o=r.localTransform,a=k.shared.appendFrom(o,t).clone(),l=e,u=!!r.effects.length;u&&(e=new pe),r.view&&(e.setMatrix(a),r.view.addBounds(e));for(let h=0;h<r.children.length;h++)ul(r.children[h],e,a,i);if(u){for(let h=0;h<r.effects.length;h++)(s=(n=r.effects[h]).addLocalBounds)==null||s.call(n,e,i);l.setMatrix(k.IDENTITY),l.addBounds(e)}}function hl(r,e,t){const i=r.parent;i&&i!==e&&(hl(i,e,t),Ue(i.localTransform,i),t.append(i.localTransform))}const qt=new pe,Kt=new k,cl={get width(){return Math.abs(this.scale.x*He(this,qt,Kt).width)},set width(r){const e=He(this,qt,Kt).width;e!==0?this.scale.x=r/e:this.scale.x=1},get height(){return Math.abs(this.scale.y*He(this,qt,Kt).height)},set height(r){const e=He(this,qt,Kt).height;e!==0?this.scale.y=r/e:this.scale.y=1},getLocalBounds(r){const e=He(this,new pe,Kt);return r?r.copyFromBounds(e):e.rectangle.clone()},getBounds(r,e){const t=Yt(this,r,qt);return e?e.copyFromBounds(t):t.rectangle.clone()}},dl={_onRender:null,set onRender(r){const e=this.layerGroup;if(!r){this._onRender&&(e==null||e.removeOnRender(this)),this._onRender=null;return}this._onRender||e==null||e.addOnRender(this),this._onRender=r},get onRender(){return this._onRender}},pl={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(r){this._zIndex!==r&&(this._zIndex=r,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(Rg))}};function Rg(r,e){return r._zIndex-e._zIndex}const fl={getGlobalPosition(r=new W,e=!1){return this.parent?this.parent.toGlobal(this._position,r,e):(r.x=this._position.x,r.y=this._position.y),r},toGlobal(r,e,t=!1){if(!t){this.didChange&&Ue(this.localTransform,this);const i=Xt(this,new k);return i.append(this.localTransform),i.apply(r,e)}return this.worldTransform.apply(r,e)},toLocal(r,e,t,i){if(e&&(r=e.toGlobal(r,t,i)),!i){this.didChange&&Ue(this.localTransform,this);const n=Xt(this,new k);return n.append(this.localTransform),n.applyInverse(r,t)}return this.worldTransform.applyInverse(r,t)}};class an{constructor(){this.uid=X("instructionSet"),this.instructions=[],this.instructionSize=0}reset(){this.instructionSize=0}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}lastInstruction(){return this.instructions[this.instructionSize-1]}}class gl{constructor(e){this.type="layer",this.root=null,this.canBundle=!1,this.layerGroupParent=null,this.layerGroupChildren=[],this._children=[],this.worldTransform=new k,this.worldColor=4294967295,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new an,this._onRenderContainers=[],this.root=e,this.addChild(e)}get localTransform(){return this.root.localTransform}get layerTransform(){return this.root.layerTransform}addLayerGroupChild(e){e.layerGroupParent&&e.layerGroupParent._removeLayerGroupChild(e),e.layerGroupParent=this,this.onChildUpdate(e.root),this.layerGroupChildren.push(e)}_removeLayerGroupChild(e){e.root.didChange&&this._removeChildFromUpdate(e.root);const t=this.layerGroupChildren.indexOf(e);t>-1&&this.layerGroupChildren.splice(t,1),e.layerGroupParent=null}addChild(e){if(this.structureDidChange=!0,e!==this.root&&(this._children.push(e),e.updateTick=-1,e.parent===this.root?e.relativeLayerDepth=1:e.relativeLayerDepth=e.parent.relativeLayerDepth+1,e._onRender&&this.addOnRender(e)),e.layerGroup){if(e.layerGroup.root===e){this.addLayerGroupChild(e.layerGroup);return}}else e.layerGroup=this,e.didChange=!0;const t=e.children;e.isLayerRoot||this.onChildUpdate(e);for(let i=0;i<t.length;i++)this.addChild(t[i])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&this.removeOnRender(e),e.layerGroup.root!==e){const i=e.children;for(let n=0;n<i.length;n++)this.removeChild(i[n]);e.didChange&&e.layerGroup._removeChildFromUpdate(e),e.layerGroup=null}else this._removeLayerGroupChild(e.layerGroup);const t=this._children.indexOf(e);t>-1&&this._children.splice(t,1)}onChildUpdate(e){let t=this.childrenToUpdate[e.relativeLayerDepth];t||(t=this.childrenToUpdate[e.relativeLayerDepth]={index:0,list:[]}),t.list[t.index++]=e}updateRenderable(e){e.layerVisibleRenderable<3||(e.didViewUpdate=!1,this.instructionSet.renderPipes[e.view.renderPipeId].updateRenderable(e))}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}_removeChildFromUpdate(e){const t=this.childrenToUpdate[e.relativeLayerDepth];if(!t)return;const i=t.list.indexOf(e);i>-1&&t.list.splice(i,1),t.index--}get isRenderable(){const e=this.worldColor>>24&255;return this.root.localVisibleRenderable===3&&e>0}addOnRender(e){this._onRenderContainers.push(e)}removeOnRender(e){this._onRenderContainers.splice(this._onRenderContainers.indexOf(e),1)}runOnRender(){this._onRenderContainers.forEach(e=>{e._onRender()})}}function Ze(r){return Object.fromEntries(Object.entries(r).filter(([e,t])=>t!==void 0))}const ml=new se(null),ln=new se(null),un=new se(null,1,1),$r=1,hn=2,Lr=4,kg=8;class V extends he{constructor(e={}){var t,i;super(),this.uid=X("renderable"),this._updateFlags=15,this.isLayerRoot=!1,this.layerGroup=null,this.didChange=!1,this.didViewUpdate=!1,this.relativeLayerDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new k,this.layerTransform=new k,this.destroyed=!1,this._position=new se(this,0,0),this._scale=un,this._pivot=ln,this._skew=ml,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=4294967295,this.layerColor=4294967295,this.localBlendMode="inherit",this.layerBlendMode="normal",this.localVisibleRenderable=3,this.layerVisibleRenderable=3,e.view&&(this.view=e.view,this.view.owner=this,e.view=void 0),Object.assign(this,Ze(e)),this.children=[],(t=e.children)==null||t.forEach(n=>this.addChild(n)),this.effects=[],(i=e.effects)==null||i.forEach(n=>this.addEffect(n))}static mixin(e){Object.defineProperties(V.prototype,Object.getOwnPropertyDescriptors(e))}addChild(...e){if(this.allowChildren||O(G,"addChild: Only Containers will be allowed to add children in v8.0.0"),e.length>1){for(let i=0;i<e.length;i++)this.addChild(e[i]);return e[0]}const t=e[0];return t.parent===this?(this.children.splice(this.children.indexOf(t),1),this.children.push(t),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),t):(t.parent&&t.parent.removeChild(t),this.children.push(t),this.sortableChildren&&(this.sortDirty=!0),t.parent=this,t.didChange=!0,t.didViewUpdate=!1,t._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(t),this.emit("childAdded",t,this,this.children.length-1),t.emit("added",this),t._zIndex!==0&&t.depthOfChildModified(),t)}removeChild(...e){if(e.length>1){for(let n=0;n<e.length;n++)this.removeChild(e[n]);return e[0]}const t=e[0],i=this.children.indexOf(t);return i>-1&&(this.children.splice(i,1),this.layerGroup&&this.layerGroup.removeChild(t)),t.parent=null,this.emit("childRemoved",t,this,i),t.emit("removed",this),t}onUpdate(e){if(e&&e===this._skew&&this._updateSkew(),!this.didChange)if(this.didChange=!0,this.isLayerRoot){const t=this.layerGroup.layerGroupParent;t&&t.onChildUpdate(this)}else this.layerGroup&&this.layerGroup.onChildUpdate(this)}onViewUpdate(){this.didViewUpdate||(this.didViewUpdate=!0,this.layerGroup&&this.layerGroup.onChildViewUpdate(this))}set layer(e){if(this.isLayerRoot&&e===!1)throw new Error("[Pixi] cannot undo a layer just yet");e&&this.enableLayer()}get layer(){return this.isLayerRoot}enableLayer(){if(this.layerGroup&&this.layerGroup.root===this)return;this.isLayerRoot=!0;const e=this.layerGroup;if(e&&e.removeChild(this),this.layerGroup=new gl(this),e){for(let t=0;t<e.layerGroupChildren.length;t++){const i=e.layerGroupChildren[t];let n=i.root;for(;n;){if(n===this){this.layerGroup.addLayerGroupChild(i);break}n=n.parent}}e.addLayerGroupChild(this.layerGroup)}this._updateIsSimple()}_updateIsSimple(){this.isSimple=!this.isLayerRoot&&this.effects.length===0}get worldTransform(){return this._worldTransform||(this._worldTransform=new k),this.layerGroup&&(this.isLayerRoot?this._worldTransform.copyFrom(this.layerGroup.worldTransform):this._worldTransform.appendFrom(this.layerTransform,this.layerGroup.worldTransform)),this._worldTransform}get x(){return this._position.x}set x(e){this._position.x=e}get y(){return this._position.y}set y(e){this._position.y=e}get position(){return this._position}set position(e){this._position.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.onUpdate(this._skew))}get angle(){return this.rotation*Za}set angle(e){this.rotation=e*Qa}get pivot(){return this._pivot===ln&&(this._pivot=new se(this,0,0)),this._pivot}set pivot(e){this._pivot===ln&&(this._pivot=new se(this,0,0)),this._pivot.copyFrom(e)}get skew(){return this._skew===ml&&(this._skew=new se(this,0,0)),this._skew}get scale(){return this._scale===un&&(this._scale=new se(this,1,1)),this._scale}set scale(e){this._scale===un&&(this._scale=new se(this,0,0)),this._scale.copyFrom(e)}_updateSkew(){const e=this._rotation,t=this._skew;this._cx=Math.cos(e+t._y),this._sx=Math.sin(e+t._y),this._cy=-Math.sin(e-t._x),this._sy=Math.cos(e-t._x)}set alpha(e){e=e*255|0,e!==(this.localColor>>24&255)&&(this.localColor=this.localColor&16777215|e<<24,this._updateFlags|=$r,this.onUpdate())}get alpha(){return(this.localColor>>24&255)/255}set tint(e){const t=j.shared.setValue(e).toBgrNumber();t!==(this.localColor&16777215)&&(this.localColor=this.localColor&4278190080|t&16777215,this._updateFlags|=$r,this.onUpdate())}get tint(){const e=this.localColor&16777215;return((e&255)<<16)+(e&65280)+(e>>16&255)}set blendMode(e){this.localBlendMode!==e&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=hn,this.localBlendMode=e,this.onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localVisibleRenderable&2)}set visible(e){const t=e?1:0;(this.localVisibleRenderable&2)>>1!==t&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=Lr,this.localVisibleRenderable=this.localVisibleRenderable&1|t<<1,this.onUpdate())}get renderable(){return!!(this.localVisibleRenderable&1)}set renderable(e){const t=e?1:0;(this.localVisibleRenderable&1)!==t&&(this.localVisibleRenderable=this.localVisibleRenderable&2|t,this._updateFlags|=Lr,this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.onUpdate())}get isRenderable(){const e=this.layerColor>>24&255;return this.localVisibleRenderable===3&&e>0}destroy(e=!1){if(this.destroyed)return;this.destroyed=!0,this.removeFromParent(),this.parent=null,this._mask=null,this._filters=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed"),this.removeAllListeners();const t=typeof e=="boolean"?e:e==null?void 0:e.children,i=this.removeChildren(0,this.children.length);if(t)for(let n=0;n<i.length;++n)i[n].destroy(e);this.view&&(this.view.destroy(e),this.view.owner=null)}}V.mixin(el),V.mixin(fl),V.mixin(dl),V.mixin(cl),V.mixin(al),V.mixin(ll),V.mixin(pl);var cn=/iPhone/i,bl=/iPod/i,vl=/iPad/i,yl=/\biOS-universal(?:.+)Mac\b/i,dn=/\bAndroid(?:.+)Mobile\b/i,xl=/Android/i,yt=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,Dr=/Silk/i,Ie=/Windows Phone/i,_l=/\bWindows(?:.+)ARM\b/i,wl=/BlackBerry/i,Tl=/BB10/i,Sl=/Opera Mini/i,Pl=/\b(CriOS|Chrome)(?:.+)Mobile/i,Al=/Mobile(?:.+)Firefox\b/i,El=function(r){return typeof r!="undefined"&&r.platform==="MacIntel"&&typeof r.maxTouchPoints=="number"&&r.maxTouchPoints>1&&typeof MSStream=="undefined"};function Og(r){return function(e){return e.test(r)}}function Cl(r){var e={userAgent:"",platform:"",maxTouchPoints:0};!r&&typeof navigator!="undefined"?e={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0}:typeof r=="string"?e.userAgent=r:r&&r.userAgent&&(e={userAgent:r.userAgent,platform:r.platform,maxTouchPoints:r.maxTouchPoints||0});var t=e.userAgent,i=t.split("[FBAN");typeof i[1]!="undefined"&&(t=i[0]),i=t.split("Twitter"),typeof i[1]!="undefined"&&(t=i[0]);var n=Og(t),s={apple:{phone:n(cn)&&!n(Ie),ipod:n(bl),tablet:!n(cn)&&(n(vl)||El(e))&&!n(Ie),universal:n(yl),device:(n(cn)||n(bl)||n(vl)||n(yl)||El(e))&&!n(Ie)},amazon:{phone:n(yt),tablet:!n(yt)&&n(Dr),device:n(yt)||n(Dr)},android:{phone:!n(Ie)&&n(yt)||!n(Ie)&&n(dn),tablet:!n(Ie)&&!n(yt)&&!n(dn)&&(n(Dr)||n(xl)),device:!n(Ie)&&(n(yt)||n(Dr)||n(dn)||n(xl))||n(/\bokhttp\b/i)},windows:{phone:n(Ie),tablet:n(_l),device:n(Ie)||n(_l)},other:{blackberry:n(wl),blackberry10:n(Tl),opera:n(Sl),firefox:n(Al),chrome:n(Pl),device:n(wl)||n(Tl)||n(Sl)||n(Al)||n(Pl)},any:!1,phone:!1,tablet:!1};return s.any=s.apple.device||s.android.device||s.windows.device||s.other.device,s.phone=s.apple.phone||s.android.phone||s.windows.phone,s.tablet=s.apple.tablet||s.android.tablet||s.windows.tablet,s}var Ml;const Fg=(Ml=Cl.default)!=null?Ml:Cl,Bl=Fg(globalThis.navigator),pn={accessible:!1,accessibleTitle:null,accessibleHint:null,tabIndex:0,_accessibleActive:!1,_accessibleDiv:null,accessibleType:"button",accessiblePointerEvents:"auto",accessibleChildren:!0,renderId:-1};V.mixin(pn);const Ug=9,zr=100,Ig=0,Gg=0,Rl=2,kl=1,$g=-1e3,Lg=-1e3,Dg=2;class Zt{constructor(e,t=Bl){this._mobileInfo=t,this.debug=!1,this._isActive=!1,this._isMobileAccessibility=!1,this._pool=[],this._renderId=0,this._children=[],this._androidUpdateCount=0,this._androidUpdateFrequency=500,this._hookDiv=null,(t.tablet||t.phone)&&this._createTouchHook();const i=document.createElement("div");i.style.width=`${zr}px`,i.style.height=`${zr}px`,i.style.position="absolute",i.style.top=`${Ig}px`,i.style.left=`${Gg}px`,i.style.zIndex=Rl.toString(),this._div=i,this._renderer=e,this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),globalThis.addEventListener("keydown",this._onKeyDown,!1)}get isActive(){return this._isActive}get isMobileAccessibility(){return this._isMobileAccessibility}get hookDiv(){return this._hookDiv}_createTouchHook(){const e=document.createElement("button");e.style.width=`${kl}px`,e.style.height=`${kl}px`,e.style.position="absolute",e.style.top=`${$g}px`,e.style.left=`${Lg}px`,e.style.zIndex=Dg.toString(),e.style.backgroundColor="#FF0000",e.title="select to enable accessibility for this content",e.addEventListener("focus",()=>{this._isMobileAccessibility=!0,this._activate(),this._destroyTouchHook()}),document.body.appendChild(e),this._hookDiv=e}_destroyTouchHook(){this._hookDiv&&(document.body.removeChild(this._hookDiv),this._hookDiv=null)}_activate(){var e;this._isActive||(this._isActive=!0,globalThis.document.addEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown,!1),this._renderer.runners.postrender.add(this),(e=this._renderer.view.canvas.parentNode)==null||e.appendChild(this._div))}_deactivate(){var e;!this._isActive||this._isMobileAccessibility||(this._isActive=!1,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.addEventListener("keydown",this._onKeyDown,!1),this._renderer.runners.postrender.remove(this),(e=this._div.parentNode)==null||e.removeChild(this._div))}_updateAccessibleObjects(e){if(!e.visible||!e.accessibleChildren)return;e.accessible&&e.isInteractive()&&(e._accessibleActive||this._addChild(e),e.renderId=this._renderId);const t=e.children;if(t)for(let i=0;i<t.length;i++)this._updateAccessibleObjects(t[i])}init(e){var t;this.debug=(t=e==null?void 0:e.debug)!=null?t:this.debug,this._renderer.runners.postrender.remove(this)}postrender(){const e=performance.now();if(this._mobileInfo.android.device&&e<this._androidUpdateCount||(this._androidUpdateCount=e+this._androidUpdateFrequency,!this._renderer.renderingToScreen||!this._renderer.view.canvas))return;this._renderer.lastObjectRendered&&this._updateAccessibleObjects(this._renderer.lastObjectRendered);const{x:t,y:i,width:n,height:s}=this._renderer.view.canvas.getBoundingClientRect(),{width:o,height:a,resolution:l}=this._renderer,u=n/o*l,h=s/a*l;let c=this._div;c.style.left=`${t}px`,c.style.top=`${i}px`,c.style.width=`${o}px`,c.style.height=`${a}px`;for(let p=0;p<this._children.length;p++){const d=this._children[p];if(d.renderId!==this._renderId)d._accessibleActive=!1,sn(this._children,p,1),this._div.removeChild(d._accessibleDiv),this._pool.push(d._accessibleDiv),d._accessibleDiv=null,p--;else{c=d._accessibleDiv;let f=d.hitArea;const m=d.worldTransform;d.hitArea?(c.style.left=`${(m.tx+f.x*m.a)*u}px`,c.style.top=`${(m.ty+f.y*m.d)*h}px`,c.style.width=`${f.width*m.a*u}px`,c.style.height=`${f.height*m.d*h}px`):(f=d.getBounds(),this.capHitArea(f),c.style.left=`${f.x*u}px`,c.style.top=`${f.y*h}px`,c.style.width=`${f.width*u}px`,c.style.height=`${f.height*h}px`,c.title!==d.accessibleTitle&&d.accessibleTitle!==null&&(c.title=d.accessibleTitle),c.getAttribute("aria-label")!==d.accessibleHint&&d.accessibleHint!==null&&c.setAttribute("aria-label",d.accessibleHint)),(d.accessibleTitle!==c.title||d.tabIndex!==c.tabIndex)&&(c.title=d.accessibleTitle,c.tabIndex=d.tabIndex,this.debug&&this.updateDebugHTML(c))}}this._renderId++}updateDebugHTML(e){e.innerHTML=`type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`}capHitArea(e){e.x<0&&(e.width+=e.x,e.x=0),e.y<0&&(e.height+=e.y,e.y=0);const{width:t,height:i}=this._renderer;e.x+e.width>t&&(e.width=t-e.x),e.y+e.height>i&&(e.height=i-e.y)}_addChild(e){let t=this._pool.pop();t||(t=document.createElement("button"),t.style.width=`${zr}px`,t.style.height=`${zr}px`,t.style.backgroundColor=this.debug?"rgba(255,255,255,0.5)":"transparent",t.style.position="absolute",t.style.zIndex=Rl.toString(),t.style.borderStyle="none",navigator.userAgent.toLowerCase().includes("chrome")?t.setAttribute("aria-live","off"):t.setAttribute("aria-live","polite"),navigator.userAgent.match(/rv:.*Gecko\//)?t.setAttribute("aria-relevant","additions"):t.setAttribute("aria-relevant","text"),t.addEventListener("click",this._onClick.bind(this)),t.addEventListener("focus",this._onFocus.bind(this)),t.addEventListener("focusout",this._onFocusOut.bind(this))),t.style.pointerEvents=e.accessiblePointerEvents,t.type=e.accessibleType,e.accessibleTitle&&e.accessibleTitle!==null?t.title=e.accessibleTitle:(!e.accessibleHint||e.accessibleHint===null)&&(t.title=`container ${e.tabIndex}`),e.accessibleHint&&e.accessibleHint!==null&&t.setAttribute("aria-label",e.accessibleHint),this.debug&&this.updateDebugHTML(t),e._accessibleActive=!0,e._accessibleDiv=t,t.container=e,this._children.push(e),this._div.appendChild(e._accessibleDiv),e._accessibleDiv.tabIndex=e.tabIndex}_dispatchEvent(e,t){const{container:i}=e.target,n=this._renderer.events.rootBoundary,s=Object.assign(new $t(n),{target:i});n.rootTarget=this._renderer.lastObjectRendered,t.forEach(o=>n.dispatchEvent(s,o))}_onClick(e){this._dispatchEvent(e,["click","pointertap","tap"])}_onFocus(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","assertive"),this._dispatchEvent(e,["mouseover"])}_onFocusOut(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","polite"),this._dispatchEvent(e,["mouseout"])}_onKeyDown(e){e.keyCode===Ug&&this._activate()}_onMouseMove(e){e.movementX===0&&e.movementY===0||this._deactivate()}destroy(){this._destroyTouchHook(),this._div=null,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown),this._pool=null,this._children=null,this._renderer=null}}Zt.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"accessibility"},Z.add(Zt),Z.add(Zt),V.mixin(pn);var Qe=(r=>(r[r.INTERACTION=50]="INTERACTION",r[r.HIGH=25]="HIGH",r[r.NORMAL=0]="NORMAL",r[r.LOW=-25]="LOW",r[r.UTILITY=-50]="UTILITY",r))(Qe||{});class Nr{constructor(e,t=null,i=0,n=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=e,this._context=t,this.priority=i,this._once=n}match(e,t=null){return this._fn===e&&this._context===t}emit(e){this._fn&&(this._context?this._fn.call(this._context,e):this._fn(e));const t=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),t}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const t=this.next;return this.next=e?null:t,this.previous=null,t}}const ge=class{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new Nr(null,null,1/0),this.deltaMS=1/ge.targetFPMS,this.elapsedMS=1/ge.targetFPMS,this._tick=r=>{this._requestId=null,this.started&&(this.update(r),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(r,e,t=Qe.NORMAL){return this._addListener(new Nr(r,e,t))}addOnce(r,e,t=Qe.NORMAL){return this._addListener(new Nr(r,e,t,!0))}_addListener(r){let e=this._head.next,t=this._head;if(!e)r.connect(t);else{for(;e;){if(r.priority>e.priority){r.connect(t);break}t=e,e=e.next}r.previous||r.connect(t)}return this._startIfPossible(),this}remove(r,e){let t=this._head.next;for(;t;)t.match(r,e)?t=t.destroy():t=t.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let r=0,e=this._head;for(;e=e.next;)r++;return r}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let r=this._head.next;for(;r;)r=r.destroy(!0);this._head.destroy(),this._head=null}}update(r=performance.now()){let e;if(r>this.lastTime){if(e=this.elapsedMS=r-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const n=r-this._lastFrame|0;if(n<this._minElapsedMS)return;this._lastFrame=r-n%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*ge.targetFPMS;const t=this._head;let i=t.next;for(;i;)i=i.emit(this);t.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=r}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(r){const e=Math.min(this.maxFPS,r),t=Math.min(Math.max(0,e)/1e3,ge.targetFPMS);this._maxElapsedMS=1/t}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(r){if(r===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,r);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!ge._shared){const r=ge._shared=new ge;r.autoStart=!0,r._protected=!0}return ge._shared}static get system(){if(!ge._system){const r=ge._system=new ge;r.autoStart=!0,r._protected=!0}return ge._system}};let ce=ge;ce.targetFPMS=.06;class fn{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,Qe.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?ce.shared:new ce,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}fn.extension=y.Application;class gn{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,i;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,i=globalThis.innerHeight;else{const{clientWidth:n,clientHeight:s}=this._resizeTo;t=n,i=s}this.renderer.resize(t,i),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}gn.extension=y.Application,Z.add(gn),Z.add(fn);var Ge=(r=>(r[r.Low=0]="Low",r[r.Normal=1]="Normal",r[r.High=2]="High",r))(Ge||{});const Hr=(r,e)=>{const t=e.split("?")[1];return t&&(r+=`?${t}`),r},Ol={createCanvas:(r,e)=>{const t=document.createElement("canvas");return t.width=r,t.height=e,t},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>{var r;return(r=document.baseURI)!=null?r:window.location.href},getFontFaceSet:()=>document.fonts,fetch:(r,e)=>fetch(r,e),parseXML:r=>new DOMParser().parseFromString(r,"text/xml")},D={ADAPTER:Ol,RETINA_PREFIX:/@([0-9\.]+)x/,FAIL_IF_MAJOR_PERFORMANCE_CAVEAT:!1,RESOLUTION:1};function Pe(r){if(typeof r!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`)}function Qt(r){return r.split("?")[0].split("#")[0]}function zg(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ng(r,e,t){return r.replace(new RegExp(zg(e),"g"),t)}function Hg(r,e){let t="",i=0,n=-1,s=0,o=-1;for(let a=0;a<=r.length;++a){if(a<r.length)o=r.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(n===a-1||s===1))if(n!==a-1&&s===2){if(t.length<2||i!==2||t.charCodeAt(t.length-1)!==46||t.charCodeAt(t.length-2)!==46){if(t.length>2){const l=t.lastIndexOf("/");if(l!==t.length-1){l===-1?(t="",i=0):(t=t.slice(0,l),i=t.length-1-t.lastIndexOf("/")),n=a,s=0;continue}}else if(t.length===2||t.length===1){t="",i=0,n=a,s=0;continue}}e&&(t.length>0?t+="/..":t="..",i=2)}else t.length>0?t+=`/${r.slice(n+1,a)}`:t=r.slice(n+1,a),i=a-n-1;n=a,s=0}else o===46&&s!==-1?++s:s=-1}return t}const de={toPosix(r){return Ng(r,"\\","/")},isUrl(r){return/^https?:/.test(this.toPosix(r))},isDataUrl(r){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(r)},isBlobUrl(r){return r.startsWith("blob:")},hasProtocol(r){return/^[^/:]+:/.test(this.toPosix(r))},getProtocol(r){Pe(r),r=this.toPosix(r);const e=/^file:\/\/\//.exec(r);if(e)return e[0];const t=/^[^/:]+:\/{0,2}/.exec(r);return t?t[0]:""},toAbsolute(r,e,t){if(Pe(r),this.isDataUrl(r)||this.isBlobUrl(r))return r;const i=Qt(this.toPosix(e!=null?e:D.ADAPTER.getBaseUrl())),n=Qt(this.toPosix(t!=null?t:this.rootname(i)));return r=this.toPosix(r),r.startsWith("/")?de.join(n,r.slice(1)):this.isAbsolute(r)?r:this.join(i,r)},normalize(r){if(Pe(r),r.length===0)return".";if(this.isDataUrl(r)||this.isBlobUrl(r))return r;r=this.toPosix(r);let e="";const t=r.startsWith("/");this.hasProtocol(r)&&(e=this.rootname(r),r=r.slice(e.length));const i=r.endsWith("/");return r=Hg(r,!1),r.length>0&&i&&(r+="/"),t?`/${r}`:e+r},isAbsolute(r){return Pe(r),r=this.toPosix(r),this.hasProtocol(r)?!0:r.startsWith("/")},join(...r){var e;if(r.length===0)return".";let t;for(let i=0;i<r.length;++i){const n=r[i];if(Pe(n),n.length>0)if(t===void 0)t=n;else{const s=(e=r[i-1])!=null?e:"";this.extname(s)?t+=`/../${n}`:t+=`/${n}`}}return t===void 0?".":this.normalize(t)},dirname(r){if(Pe(r),r.length===0)return".";r=this.toPosix(r);let e=r.charCodeAt(0);const t=e===47;let i=-1,n=!0;const s=this.getProtocol(r),o=r;r=r.slice(s.length);for(let a=r.length-1;a>=1;--a)if(e=r.charCodeAt(a),e===47){if(!n){i=a;break}}else n=!1;return i===-1?t?"/":this.isUrl(o)?s+r:s:t&&i===1?"//":s+r.slice(0,i)},rootname(r){Pe(r),r=this.toPosix(r);let e="";if(r.startsWith("/")?e="/":e=this.getProtocol(r),this.isUrl(r)){const t=r.indexOf("/",e.length);t!==-1?e=r.slice(0,t):e=r,e.endsWith("/")||(e+="/")}return e},basename(r,e){Pe(r),e&&Pe(e),r=Qt(this.toPosix(r));let t=0,i=-1,n=!0,s;if(e!==void 0&&e.length>0&&e.length<=r.length){if(e.length===r.length&&e===r)return"";let o=e.length-1,a=-1;for(s=r.length-1;s>=0;--s){const l=r.charCodeAt(s);if(l===47){if(!n){t=s+1;break}}else a===-1&&(n=!1,a=s+1),o>=0&&(l===e.charCodeAt(o)?--o===-1&&(i=s):(o=-1,i=a))}return t===i?i=a:i===-1&&(i=r.length),r.slice(t,i)}for(s=r.length-1;s>=0;--s)if(r.charCodeAt(s)===47){if(!n){t=s+1;break}}else i===-1&&(n=!1,i=s+1);return i===-1?"":r.slice(t,i)},extname(r){Pe(r),r=Qt(this.toPosix(r));let e=-1,t=0,i=-1,n=!0,s=0;for(let o=r.length-1;o>=0;--o){const a=r.charCodeAt(o);if(a===47){if(!n){t=o+1;break}continue}i===-1&&(n=!1,i=o+1),a===46?e===-1?e=o:s!==1&&(s=1):e!==-1&&(s=-1)}return e===-1||i===-1||s===0||s===1&&e===i-1&&e===t+1?"":r.slice(e,i)},parse(r){Pe(r);const e={root:"",dir:"",base:"",ext:"",name:""};if(r.length===0)return e;r=Qt(this.toPosix(r));let t=r.charCodeAt(0);const i=this.isAbsolute(r);let n;const s="";e.root=this.rootname(r),i||this.hasProtocol(r)?n=1:n=0;let o=-1,a=0,l=-1,u=!0,h=r.length-1,c=0;for(;h>=n;--h){if(t=r.charCodeAt(h),t===47){if(!u){a=h+1;break}continue}l===-1&&(u=!1,l=h+1),t===46?o===-1?o=h:c!==1&&(c=1):o!==-1&&(c=-1)}return o===-1||l===-1||c===0||c===1&&o===l-1&&o===a+1?l!==-1&&(a===0&&i?e.base=e.name=r.slice(1,l):e.base=e.name=r.slice(a,l)):(a===0&&i?(e.name=r.slice(1,o),e.base=r.slice(1,l)):(e.name=r.slice(a,o),e.base=r.slice(a,l)),e.ext=r.slice(o,l)),e.dir=this.dirname(r),s&&(e.dir=s+e.dir),e},sep:"/",delimiter:":"},ye=(r,e,t=!1)=>(Array.isArray(r)||(r=[r]),e?r.map(i=>typeof i=="string"||t?e(i):i):r);class jg{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){return this._cache.get(e)}set(e,t){const i=ye(e);let n;for(let a=0;a<this.parsers.length;a++){const l=this.parsers[a];if(l.test(t)){n=l.getCacheableAssets(i,t);break}}n||(n={},i.forEach(a=>{n[a]=t}));const s=Object.keys(n),o={cacheKeys:s,keys:i};i.forEach(a=>{this._cacheMap.set(a,o)}),s.forEach(a=>{this._cache.has(a)&&this._cache.get(a),this._cache.set(a,n[a])})}remove(e){if(!this._cacheMap.has(e))return;const t=this._cacheMap.get(e);t.cacheKeys.forEach(i=>{this._cache.delete(i)}),t.keys.forEach(i=>{this._cacheMap.delete(i)})}get parsers(){return this._parsers}}const ie=new jg,mn=()=>{},bn=Object.create(null),Fl=Object.create(null);function jr(r,e){let t=Fl[r];return t===void 0&&(bn[e]===void 0&&(bn[e]=1),Fl[r]=t=bn[e]++),t}var Wg=Object.defineProperty,Ul=Object.getOwnPropertySymbols,Vg=Object.prototype.hasOwnProperty,Yg=Object.prototype.propertyIsEnumerable,Il=(r,e,t)=>e in r?Wg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Gl=(r,e)=>{for(var t in e||(e={}))Vg.call(e,t)&&Il(r,t,e[t]);if(Ul)for(var t of Ul(e))Yg.call(e,t)&&Il(r,t,e[t]);return r};const $l=class extends he{constructor(r={}){var e,t,i,n,s,o,a;super(),this.resourceType="textureSampler",this.touched=0,this._maxAnisotropy=1,r=Gl(Gl({},$l.defaultOptions),r),this.addressMode=r.addressMode,this.addressModeU=(e=r.addressModeU)!=null?e:this.addressModeU,this.addressModeV=(t=r.addressModeV)!=null?t:this.addressModeV,this.addressModeW=(i=r.addressModeW)!=null?i:this.addressModeW,this.scaleMode=r.scaleMode,this.magFilter=(n=r.magFilter)!=null?n:this.magFilter,this.minFilter=(s=r.minFilter)!=null?s:this.minFilter,this.mipmapFilter=(o=r.mipmapFilter)!=null?o:this.mipmapFilter,this.lodMinClamp=r.lodMinClamp,this.lodMaxClamp=r.lodMaxClamp,this.compare=r.compare,this.maxAnisotropy=(a=r.maxAnisotropy)!=null?a:1}set addressMode(r){this.addressModeU=r,this.addressModeV=r,this.addressModeW=r}get addressMode(){return this.addressModeU}set wrapMode(r){O("8","TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=r}get wrapMode(){return this.addressMode}set scaleMode(r){this.magFilter=r,this.minFilter=r,this.mipmapFilter=r}get scaleMode(){return this.magFilter}set maxAnisotropy(r){this._maxAnisotropy=Math.min(r,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get resourceId(){return this._resourceId||this._generateResourceId()}update(){this.emit("change",this),this._resourceId=null}_generateResourceId(){const r=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._resourceId=jr(r,"sampler"),this._resourceId}destroy(){this.emit("destroy",this),this.removeAllListeners()}};let Jt=$l;Jt.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};var Xg=Object.defineProperty,Ll=Object.getOwnPropertySymbols,qg=Object.prototype.hasOwnProperty,Kg=Object.prototype.propertyIsEnumerable,Dl=(r,e,t)=>e in r?Xg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,zl=(r,e)=>{for(var t in e||(e={}))qg.call(e,t)&&Dl(r,t,e[t]);if(Ll)for(var t of Ll(e))Kg.call(e,t)&&Dl(r,t,e[t]);return r};const Nl=class extends he{constructor(r={}){var e,t,i,n,s;super(),this.options=r,this.uid=X("textureSource"),this.resourceType="textureSource",this.resourceId=X("textureResource"),this.uploadMethodId="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm-srgb",this.dimension="2d",this.antialias=!1,this.depthStencil=!0,this.touched=0,this._batchTick=-1,this._textureBindLocation=-1,r=zl(zl({},Nl.defaultOptions),r),this.resource=r.resource,this._resolution=r.resolution,r.width?this.pixelWidth=r.width*this._resolution:this.pixelWidth=(t=(e=r.resource)==null?void 0:e.width)!=null?t:1,r.height?this.pixelHeight=r.height*this._resolution:this.pixelHeight=(n=(i=r.resource)==null?void 0:i.height)!=null?n:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=r.format,this.dimension=r.dimensions,this.mipLevelCount=r.mipLevelCount,this.autoGenerateMipmaps=r.autoGenerateMipmaps,this.sampleCount=r.sampleCount,this.antialias=r.antialias,this.alphaMode=r.alphaMode;const o=(s=r.style)!=null?s:{};this.style=o instanceof Jt?o:new Jt(o),this.destroyed=!1}get source(){return this}get style(){return this._style}set style(r){var e,t;this.style!==r&&((e=this._style)==null||e.off("change",this._onStyleChange,this),this._style=r,(t=this._style)==null||t.on("change",this._onStyleChange,this),this._onStyleChange())}_onStyleChange(){this.emit("styleChange",this)}update(){this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this._style&&(this._style.destroy(),this._style=null),this.uploadMethodId=null,this.resource=null,this.removeAllListeners()}unload(){this.resourceId++,this.emit("change",this),this.emit("unload",this)}get resourceWidth(){const{resource:r}=this;return r.naturalWidth||r.videoWidth||r.displayWidth||r.width}get resourceHeight(){const{resource:r}=this;return r.naturalHeight||r.videoHeight||r.displayHeight||r.height}get resolution(){return this._resolution}set resolution(r){this._resolution!==r&&(this._resolution=r,this.width=this.pixelWidth/r,this.height=this.pixelHeight/r)}resize(r,e,t){t=t||this._resolution,r=r||this.width,e=e||this.height;const i=Math.round(r*t),n=Math.round(e*t);this.width=i/t,this.height=n/t,this._resolution=t,!(this.pixelWidth===i&&this.pixelHeight===n)&&(this.pixelWidth=i,this.pixelHeight=n,this.emit("resize",this),this.resourceId++,this.emit("change",this))}set wrapMode(r){O(G,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this._style.wrapMode=r}get wrapMode(){return O(G,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this._style.wrapMode}set scaleMode(r){O(G,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this._style.scaleMode=r}get scaleMode(){return O(G,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this._style.scaleMode}};let le=Nl;le.defaultOptions={resolution:1,format:"bgra8unorm",alphaMode:"no-premultiply-alpha",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,style:{}};var Zg=Object.defineProperty,Qg=Object.defineProperties,Jg=Object.getOwnPropertyDescriptors,Hl=Object.getOwnPropertySymbols,em=Object.prototype.hasOwnProperty,tm=Object.prototype.propertyIsEnumerable,jl=(r,e,t)=>e in r?Zg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,rm=(r,e)=>{for(var t in e||(e={}))em.call(e,t)&&jl(r,t,e[t]);if(Hl)for(var t of Hl(e))tm.call(e,t)&&jl(r,t,e[t]);return r},im=(r,e)=>Qg(r,Jg(e));class Wi extends le{constructor(){super(...arguments),this.uploadMethodId="buffer"}static from(e){const t=e.resource||new Float32Array(e.width*e.height*4);let i=e.format;return i||(t instanceof Float32Array?i="rgba32float":t instanceof Int32Array||t instanceof Uint32Array?i="rgba32uint":t instanceof Int16Array||t instanceof Uint16Array?i="rgba16uint":(t instanceof Int8Array,i="bgra8unorm")),new Wi(im(rm({},e),{format:i}))}}const Je=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],et=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],tt=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],rt=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],vn=[],Wl=[],Wr=Math.sign;function nm(){for(let r=0;r<16;r++){const e=[];vn.push(e);for(let t=0;t<16;t++){const i=Wr(Je[r]*Je[t]+tt[r]*et[t]),n=Wr(et[r]*Je[t]+rt[r]*et[t]),s=Wr(Je[r]*tt[t]+tt[r]*rt[t]),o=Wr(et[r]*tt[t]+rt[r]*rt[t]);for(let a=0;a<16;a++)if(Je[a]===i&&et[a]===n&&tt[a]===s&&rt[a]===o){e.push(a);break}}}for(let r=0;r<16;r++){const e=new k;e.set(Je[r],et[r],tt[r],rt[r],0,0),Wl.push(e)}}nm();const I={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:r=>Je[r],uY:r=>et[r],vX:r=>tt[r],vY:r=>rt[r],inv:r=>r&8?r&15:-r&7,add:(r,e)=>vn[r][e],sub:(r,e)=>vn[r][I.inv(e)],rotate180:r=>r^4,isVertical:r=>(r&3)===2,byDirection:(r,e)=>Math.abs(r)*2<=Math.abs(e)?e>=0?I.S:I.N:Math.abs(e)*2<=Math.abs(r)?r>0?I.E:I.W:e>0?r>0?I.SE:I.SW:r>0?I.NE:I.NW,matrixAppendRotationInv:(r,e,t=0,i=0)=>{const n=Wl[I.inv(e)];n.tx=t,n.ty=i,r.append(n)}};class yn extends he{constructor(e={}){var t;super(),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=e.frame||new K(0,0,1,1),this.orig=e.orig||this.frame,this.rotate=(t=e.rotate)!=null?t:0,this.trim=e.trim,this.defaultAnchor=e.defaultAnchor,this.defaultBorders=e.defaultBorders,this.updateUvs()}updateUvs(){const e=this.uvs,t=this.frame;let i=this.rotate;if(i){const n=t.width/2,s=t.height/2,o=t.x+n,a=t.y+s;i=I.add(i,I.NW),e.x0=o+n*I.uX(i),e.y0=a+s*I.uY(i),i=I.add(i,2),e.x1=o+n*I.uX(i),e.y1=a+s*I.uY(i),i=I.add(i,2),e.x2=o+n*I.uX(i),e.y2=a+s*I.uY(i),i=I.add(i,2),e.x3=o+n*I.uX(i),e.y3=a+s*I.uY(i)}else e.x0=t.x,e.y0=t.y,e.x1=t.x+t.width,e.y1=t.y,e.x2=t.x+t.width,e.y2=t.y+t.height,e.x3=t.x,e.y3=t.y+t.height}update(){this.updateUvs(),this.emit("update",this)}destroy(){this.emit("destroy",this),this.removeAllListeners(),this.frame=null,this.orig=null,this.trim=null,this.defaultAnchor=null,this.uvs=null}}const Vl=new k;class xn{constructor(e,t){this.mapCoord=new k,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof t=="undefined"?.5:t,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){var t;this.texture!==e&&((t=this._texture)==null||t.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,t){t===void 0&&(t=e);const i=this.mapCoord;for(let n=0;n<e.length;n+=2){const s=e[n],o=e[n+1];t[n]=s*i.a+o*i.c+i.tx,t[n+1]=s*i.b+o*i.d+i.ty}return t}update(){const e=this._texture;this._updateID++;const t=e.layout.uvs;this.mapCoord.set(t.x1-t.x0,t.y1-t.y0,t.x3-t.x0,t.y3-t.y0,t.x0,t.y0);const i=e.layout.orig,n=e.layout.trim;n&&(Vl.set(i.width/n.width,0,0,i.height/n.height,-n.x/n.width,-n.y/n.height),this.mapCoord.append(Vl));const s=e.source,o=this.uClampFrame,a=this.clampMargin/s._resolution,l=this.clampOffset;return o[0]=(e.frameX+a+l)/s.width,o[1]=(e.frameY+a+l)/s.height,o[2]=(e.frameX+e.frameWidth-a+l)/s.width,o[3]=(e.frameY+e.frameHeight-a+l)/s.height,this.uClampOffset[0]=l/s.pixelWidth,this.uClampOffset[1]=l/s.pixelHeight,this.isSimple=e.frameWidth===s.width&&e.frameHeight===s.height&&e.layout.rotate===0,!0}}var sm=Object.defineProperty,om=Object.defineProperties,am=Object.getOwnPropertyDescriptors,Yl=Object.getOwnPropertySymbols,lm=Object.prototype.hasOwnProperty,um=Object.prototype.propertyIsEnumerable,Xl=(r,e,t)=>e in r?sm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,hm=(r,e)=>{for(var t in e||(e={}))lm.call(e,t)&&Xl(r,t,e[t]);if(Yl)for(var t of Yl(e))um.call(e,t)&&Xl(r,t,e[t]);return r},cm=(r,e)=>om(r,am(e));class A extends he{constructor({source:e,layout:t,label:i,frame:n}={}){var s;if(super(),this.id=X("texture"),this.styleSourceKey=0,this.label=i,this.source=(s=e==null?void 0:e.source)!=null?s:new le,t=t instanceof yn?t:new yn(t),n){const{width:o,height:a}=this._source;t.frame.x=n.x/o,t.frame.y=n.y/a,t.frame.width=n.width/o,t.frame.height=n.height/a,t.updateUvs()}this.layout=t,this.destroyed=!1}static from(e){return typeof e=="string"?ie.get(e):e instanceof le?new A({source:e}):new A({source:new le(e)})}static fromBuffer(e){return new A({source:Wi.from(cm(hm({},e),{style:{scaleMode:"nearest"}}))})}set source(e){this._source&&this._source.off("resize",this.onUpdate,this),this._source=e,e.on("resize",this.onUpdate,this),this.emit("update",this)}get source(){return this._source}get layout(){return this._layout}set layout(e){var t;(t=this._layout)==null||t.off("update",this.onUpdate,this),this._layout=e,e.on("update",this.onUpdate,this),this.emit("update",this)}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new xn(this)),this._textureMatrix}set frameWidth(e){this._layout.frame.width=e/this._source.width}get frameWidth(){return this._source.pixelWidth/this._source._resolution*this._layout.frame.width}set frameHeight(e){this._layout.frame.height=e/this._source.height}get frameHeight(){return this._source.pixelHeight/this._source._resolution*this._layout.frame.height}set frameX(e){if(e===0){this._layout.frame.x=0;return}this._layout.frame.x=this._source.width/e}get frameX(){return this._source.width*this._layout.frame.x}set frameY(e){if(e===0){this._layout.frame.y=0;return}this._layout.frame.y=this._source.height/e}get frameY(){return this._source.height*this._layout.frame.y}get width(){return this._source.width*this._layout.orig.width}get height(){return this._source.height*this._layout.orig.height}destroy(e=!1){this._layout&&(this._layout.destroy(),this._layout=null),this._source&&e&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}onUpdate(){this.emit("update",this)}get baseTexture(){return O(G,"Texture.baseTexture is now Texture.source"),this._source}}A.EMPTY=new A({}),A.EMPTY.label="EMPTY",A.EMPTY.destroy=mn;class _n extends he{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return O(G,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return O(G,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return O(G,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return O(G,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return O(G,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture.destroy();this.chars=null}}class Vr extends _n{constructor(e){var t;super();const{textures:i,data:n}=e;Object.keys(n.pages).forEach(o=>{const a=n.pages[parseInt(o,10)],l=i[a.id];this.pages.push({texture:l})}),Object.keys(n.chars).forEach(o=>{var a;const l=n.chars[o],u=i[l.page].source,h=new K(l.x/u.width,l.y/u.height,l.width/u.width,l.height/u.height),c=new A({source:u,layout:{frame:h}});this.chars[o]={id:o.codePointAt(0),xOffset:l.xOffset,yOffset:l.yOffset,xAdvance:l.xAdvance,kerning:(a=l.kerning)!=null?a:{},texture:c}}),this.baseRenderedFontSize=n.fontSize;const s=this;s.baseMeasurementFontSize=n.fontSize,s.fontMetrics={ascent:0,descent:0,fontSize:n.fontSize},s.baseLineOffset=n.baseLineOffset,s.lineHeight=n.lineHeight,s.fontFamily=n.fontFamily,s.distanceField=(t=n.distanceField)!=null?t:{type:"none",range:0}}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{texture:t}=this.pages[e];t.destroy(!0)}this.pages=null}}const Yr={test(r){return typeof r=="string"&&r.startsWith("info face=")},parse(r){var e,t;const i=r.match(/^[a-z]+\s+.+$/gm),n={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const d in i){const f=i[d].match(/^[a-z]+/gm)[0],m=i[d].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),g={};for(const x in m){const b=m[x].split("="),v=b[0],_=b[1].replace(/"/gm,""),P=parseFloat(_),C=isNaN(P)?_:P;g[v]=C}n[f].push(g)}const s={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},[o]=n.info,[a]=n.common,[l]=(e=n.distanceField)!=null?e:[];l&&(s.distanceField={range:parseInt(l.distanceRange,10),type:l.fieldType}),s.fontSize=parseInt(o.size,10),s.fontFamily=o.face,s.lineHeight=parseInt(a.lineHeight,10);const u=n.page;for(let d=0;d<u.length;d++)s.pages.push({id:parseInt(u[d].id,10)||0,file:u[d].file});const h={};s.baseLineOffset=s.lineHeight-parseInt(a.base,10);const c=n.char;for(let d=0;d<c.length;d++){const f=c[d],m=parseInt(f.id,10);let g=(t=f.letter)!=null?t:f.char;g==="space"&&(g=" "),h[m]=g,s.chars[g]={id:m,page:parseInt(f.page,10)||0,x:parseInt(f.x,10),y:parseInt(f.y,10),width:parseInt(f.width,10),height:parseInt(f.height,10),xOffset:parseInt(f.xoffset,10),yOffset:parseInt(f.yoffset,10),xAdvance:parseInt(f.xadvance,10),kerning:{}}}const p=n.kerning||[];for(let d=0;d<p.length;d++){const f=parseInt(p[d].first,10),m=parseInt(p[d].second,10),g=parseInt(p[d].amount,10);s.chars[h[m]].kerning[h[f]]=g}return s}},wn={test(r){const e=r;return typeof e!="string"&&"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(r){var e;const t={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},i=r.getElementsByTagName("info")[0],n=r.getElementsByTagName("common")[0],s=r.getElementsByTagName("distanceField")[0];s&&(t.distanceField={type:s.getAttribute("fieldType"),range:parseInt(s.getAttribute("distanceRange"),10)});const o=r.getElementsByTagName("page"),a=r.getElementsByTagName("char"),l=r.getElementsByTagName("kerning");t.fontSize=parseInt(i.getAttribute("size"),10),t.fontFamily=i.getAttribute("face"),t.lineHeight=parseInt(n.getAttribute("lineHeight"),10);for(let h=0;h<o.length;h++)t.pages.push({id:parseInt(o[h].getAttribute("id"),10)||0,file:o[h].getAttribute("file")});const u={};t.baseLineOffset=t.lineHeight-parseInt(n.getAttribute("base"),10);for(let h=0;h<a.length;h++){const c=a[h],p=parseInt(c.getAttribute("id"),10);let d=(e=c.getAttribute("letter"))!=null?e:c.getAttribute("char");d==="space"&&(d=" "),u[p]=d,t.chars[d]={id:p,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let h=0;h<l.length;h++){const c=parseInt(l[h].getAttribute("first"),10),p=parseInt(l[h].getAttribute("second"),10),d=parseInt(l[h].getAttribute("amount"),10);t.chars[u[p]].kerning[u[c]]=d}return t}},Tn={test(r){return typeof r=="string"&&r.includes("<font>")?wn.test(D.ADAPTER.parseXML(r)):!1},parse(r){return wn.parse(D.ADAPTER.parseXML(r))}},dm=[".xml",".fnt"],ql={extension:y.CacheParser,test:r=>r instanceof Vr,getCacheableAssets(r,e){const t={};return r.forEach(i=>{t[i]=e}),t[e.fontFamily]=e,t}},Kl={extension:{type:y.LoadParser,priority:Ge.Normal},test(r){return dm.includes(de.extname(r).toLowerCase())},async testParse(r){return Yr.test(r)||Tn.test(r)},async parse(r,e,t){const i=Yr.test(r)?Yr.parse(r):Tn.parse(r),{src:n}=e,{pages:s}=i,o=[];for(let u=0;u<s.length;++u){const h=s[u].file;let c=de.join(de.dirname(n),h);c=Hr(c,n),o.push(c)}const a=await t.load(o),l=o.map(u=>a[u]);return new Vr({data:i,textures:l})},async load(r,e){return await(await D.ADAPTER.fetch(r)).text()},unload(r){r.destroy()}},Zl={extension:y.CacheParser,test:r=>Array.isArray(r)&&r.every(e=>e instanceof A),getCacheableAssets:(r,e)=>{const t={};return r.forEach(i=>{e.forEach((n,s)=>{t[i+(s===0?"":s+1)]=n})}),t}};async function Sn(r){if("Image"in globalThis)return new Promise(e=>{const t=new Image;t.onload=()=>{e(!0)},t.onerror=()=>{e(!1)},t.src=r});if("createImageBitmap"in globalThis&&"fetch"in globalThis){try{const e=await(await fetch(r)).blob();await createImageBitmap(e)}catch(e){return!1}return!0}return!1}const Ql={extension:{type:y.DetectionParser,priority:1},test:async()=>Sn("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),add:async r=>[...r,"avif"],remove:async r=>r.filter(e=>e!=="avif")},Jl=["png","jpg","jpeg"],eu={extension:{type:y.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async r=>[...r,...Jl],remove:async r=>r.filter(e=>!Jl.includes(e))},pm="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function Xr(r){return pm?!1:document.createElement("video").canPlayType(r)!==""}const tu={extension:{type:y.DetectionParser,priority:0},test:async()=>Xr("video/mp4"),add:async r=>[...r,"mp4","m4v"],remove:async r=>r.filter(e=>e!=="mp4"&&e!=="m4v")},ru={extension:{type:y.DetectionParser,priority:0},test:async()=>Xr("video/ogg"),add:async r=>[...r,"ogv"],remove:async r=>r.filter(e=>e!=="ogv")},iu={extension:{type:y.DetectionParser,priority:0},test:async()=>Xr("video/webm"),add:async r=>[...r,"webm"],remove:async r=>r.filter(e=>e!=="webm")},nu={extension:{type:y.DetectionParser,priority:0},test:async()=>Sn("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),add:async r=>[...r,"webp"],remove:async r=>r.filter(e=>e!=="webp")};function it(r,e){if(Array.isArray(e)){for(const t of e)if(r.startsWith(`data:${t}`))return!0;return!1}return r.startsWith(`data:${e}`)}function nt(r,e){const t=r.split("?")[0],i=de.extname(t).toLowerCase();return Array.isArray(e)?e.includes(i):i===e}const fm=".json",gm="application/json",su={extension:{type:y.LoadParser,priority:Ge.Low},name:"loadJson",test(r){return it(r,gm)||nt(r,fm)},async load(r){return await(await D.ADAPTER.fetch(r)).json()}},mm=".txt",bm="text/plain",ou={name:"loadTxt",extension:{type:y.LoadParser,priority:Ge.Low},test(r){return it(r,bm)||nt(r,mm)},async load(r){return await(await D.ADAPTER.fetch(r)).text()}};var vm=Object.defineProperty,ym=Object.defineProperties,xm=Object.getOwnPropertyDescriptors,au=Object.getOwnPropertySymbols,_m=Object.prototype.hasOwnProperty,wm=Object.prototype.propertyIsEnumerable,lu=(r,e,t)=>e in r?vm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Tm=(r,e)=>{for(var t in e||(e={}))_m.call(e,t)&&lu(r,t,e[t]);if(au)for(var t of au(e))wm.call(e,t)&&lu(r,t,e[t]);return r},Sm=(r,e)=>ym(r,xm(e));const Pm=["normal","bold","100","200","300","400","500","600","700","800","900"],Am=[".ttf",".otf",".woff",".woff2"],Em=["font/ttf","font/otf","font/woff","font/woff2"],Cm=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function uu(r){const e=de.extname(r),t=de.basename(r,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1));let i=t.length>0;for(const s of t)if(!s.match(Cm)){i=!1;break}let n=t.join(" ");return i||(n=`"${n.replace(/[\\"]/g,"\\$&")}"`),n}const Mm=/^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;function Bm(r){return Mm.test(r)?r:encodeURI(r)}const hu={extension:{type:y.LoadParser,priority:Ge.Low},name:"loadWebFont",test(r){return it(r,Em)||nt(r,Am)},async load(r,e){var t,i,n,s,o,a;const l=D.ADAPTER.getFontFaceSet();if(l){const u=[],h=(i=(t=e.data)==null?void 0:t.family)!=null?i:uu(r),c=(o=(s=(n=e.data)==null?void 0:n.weights)==null?void 0:s.filter(d=>Pm.includes(d)))!=null?o:["normal"],p=(a=e.data)!=null?a:{};for(let d=0;d<c.length;d++){const f=c[d],m=new FontFace(h,`url(${Bm(r)})`,Sm(Tm({},p),{weight:f}));await m.load(),l.add(m),u.push(m)}return ie.set(h,{url:r,fontFaces:u}),u.length===1?u[0]:u}return null},unload(r){(Array.isArray(r)?r:[r]).forEach(e=>{ie.remove(e.family),D.ADAPTER.getFontFaceSet().delete(e)})}},Rm={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0};function cu(r,e){var t;const i=r.match(/[a-df-z][^a-df-z]*/gi),n=(t=r.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:t.map(parseFloat),s=[];i.forEach(u=>{var h;const c=(h=u.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:h.map(parseFloat),p=u[0];let d=1;c&&(d=c.length/Rm[p.toLowerCase()]);for(let f=0;f<d;f++)s.push(p)});let o=0,a=0,l=0;for(let u=0;u<s.length;u++)switch(s[u]){case"M":a=n[o++],l=n[o++],e.moveTo(a,l);break;case"m":a+=n[o++],l+=n[o++],e.moveTo(a,l);break;case"H":a=n[o++],e.lineTo(a,l);break;case"h":a+=n[o++],e.lineTo(a,l);break;case"V":l=n[o++],e.lineTo(a,l);break;case"v":l+=n[o++],e.lineTo(a,l);break;case"L":a=n[o++],l=n[o++],e.lineTo(a,l);break;case"l":a+=n[o++],l+=n[o++],e.lineTo(a,l);break;case"C":a=n[o+4],l=n[o+5],e.bezierCurveTo(n[o],n[o+1],n[o+2],n[o+3],a,l),o+=6;break;case"c":e.bezierCurveTo(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3],a+n[o+4],l+n[o+5]),a+=n[o+4],l+=n[o+5],o+=6;break;case"S":a=n[o+2],l=n[o+3],e.bezierCurveToShort(n[o],n[o+1],a,l),o+=4;break;case"s":e.bezierCurveToShort(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3]),a+=n[o+2],l+=n[o+3],o+=4;break;case"Q":a=n[o+2],l=n[o+3],e.quadraticCurveTo(n[o],n[o+1],a,l),o+=4;break;case"q":e.quadraticCurveTo(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3]),a+=n[o+2],l+=n[o+3],o+=4;break;case"T":a=n[o++],l=n[o++],e.quadraticCurveToShort(a,l);break;case"t":a+=n[o++],l+=n[o++],e.quadraticCurveToShort(a,l);break;case"A":a=n[o+5],l=n[o+6],e.arcToSvg(n[o],n[o+1],n[o+2],n[o+3],n[o+4],a,l),o+=7;break;case"a":a+=n[o+5],l+=n[o+6],e.arcToSvg(n[o],n[o+1],n[o+2],n[o+3],n[o+4],a,l),o+=7;break;case"Z":case"z":e.closePath();break;default:}return e}class Vi{constructor(e=0,t=0,i=0){this.type="circle",this.x=e,this.y=t,this.radius=i}clone(){return new Vi(this.x,this.y,this.radius)}contains(e,t){if(this.radius<=0)return!1;const i=this.radius*this.radius;let n=this.x-e,s=this.y-t;return n*=n,s*=s,n+s<=i}getBounds(e){return e=e||new K,e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}}class Yi{constructor(e=0,t=0,i=0,n=0){this.type="ellipse",this.x=e,this.y=t,this.halfWidth=i,this.halfHeight=n}clone(){return new Yi(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,t){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let i=(e-this.x)/this.halfWidth,n=(t-this.y)/this.halfHeight;return i*=i,n*=n,i+n<=1}getBounds(){return new K(this.x-this.halfWidth,this.y-this.halfHeight,this.halfWidth*2,this.halfHeight*2)}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}}class bt{constructor(...e){this.type="polygon";let t=Array.isArray(e[0])?e[0]:e;if(typeof t[0]!="number"){const i=[];for(let n=0,s=t.length;n<s;n++)i.push(t[n].x,t[n].y);t=i}this.points=t,this.closePath=!0}clone(){const e=this.points.slice(),t=new bt(e);return t.closePath=this.closePath,t}contains(e,t){let i=!1;const n=this.points.length/2;for(let s=0,o=n-1;s<n;o=s++){const a=this.points[s*2],l=this.points[s*2+1],u=this.points[o*2],h=this.points[o*2+1];l>t!=h>t&&e<(u-a)*((t-l)/(h-l))+a&&(i=!i)}return i}getBounds(e){e=e||new K;const t=this.points;let i=1/0,n=-1/0,s=1/0,o=-1/0;for(let a=0,l=t.length;a<l;a+=2){const u=t[a],h=t[a+1];i=u<i?u:i,n=u>n?u:n,s=h<s?h:s,o=h>o?h:o}return e.x=i,e.width=n-i,e.y=s,e.height=o-s,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}class Xi{constructor(e=0,t=0,i=0,n=0,s=20){this.type="roundedRectangle",this.x=e,this.y=t,this.width=i,this.height=n,this.radius=s}getBounds(e){return e=e||new K,e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new Xi(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,t){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&t>=this.y&&t<=this.y+this.height){const i=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(t>=this.y+i&&t<=this.y+this.height-i||e>=this.x+i&&e<=this.x+this.width-i)return!0;let n=e-(this.x+i),s=t-(this.y+i);const o=i*i;if(n*n+s*s<=o||(n=e-(this.x+this.width-i),n*n+s*s<=o)||(s=t-(this.y+this.height-i),n*n+s*s<=o)||(n=e-(this.x+i),n*n+s*s<=o))return!0}return!1}}const u1=8,qr=11920929e-14,km=1,Pn=.01,xt=0,st=0;function An(r,e,t,i,n,s,o,a,l){let u=km/1;return u*=u,Om(e,t,i,n,s,o,a,l,r,u),r}function Om(r,e,t,i,n,s,o,a,l,u){En(r,e,t,i,n,s,o,a,l,u,0),l.push(o,a)}function En(r,e,t,i,n,s,o,a,l,u,h){if(h>8)return;const c=Math.PI,p=(r+t)/2,d=(e+i)/2,f=(t+n)/2,m=(i+s)/2,g=(n+o)/2,x=(s+a)/2,b=(p+f)/2,v=(d+m)/2,_=(f+g)/2,P=(m+x)/2,C=(b+_)/2,B=(v+P)/2;if(h>0){let S=o-r,w=a-e;const T=Math.abs((t-o)*w-(i-a)*S),L=Math.abs((n-o)*w-(s-a)*S);let $,R;if(T>qr&&L>qr){if((T+L)*(T+L)<=u*(S*S+w*w)){if(xt<Pn){l.push(C,B);return}const E=Math.atan2(s-i,n-t);if($=Math.abs(E-Math.atan2(i-e,t-r)),R=Math.abs(Math.atan2(a-s,o-n)-E),$>=c&&($=2*c-$),R>=c&&(R=2*c-R),$+R<xt){l.push(C,B);return}if(st!==0){if($>st){l.push(t,i);return}if(R>st){l.push(n,s);return}}}}else if(T>qr){if(T*T<=u*(S*S+w*w)){if(xt<Pn){l.push(C,B);return}if($=Math.abs(Math.atan2(s-i,n-t)-Math.atan2(i-e,t-r)),$>=c&&($=2*c-$),$<xt){l.push(t,i),l.push(n,s);return}if(st!==0&&$>st){l.push(t,i);return}}}else if(L>qr){if(L*L<=u*(S*S+w*w)){if(xt<Pn){l.push(C,B);return}if($=Math.abs(Math.atan2(a-s,o-n)-Math.atan2(s-i,n-t)),$>=c&&($=2*c-$),$<xt){l.push(t,i),l.push(n,s);return}if(st!==0&&$>st){l.push(n,s);return}}}else if(S=C-(r+o)/2,w=B-(e+a)/2,S*S+w*w<=u){l.push(C,B);return}}En(r,e,p,d,b,v,C,B,l,u,h+1),En(C,B,_,P,g,x,o,a,l,u,h+1)}const h1=8,Fm=11920929e-14,Um=1,Im=.01,du=0;function pu(r,e,t,i,n,s,o){let a=Um/1;return a*=a,Gm(e,t,i,n,s,o,r,a),r}function Gm(r,e,t,i,n,s,o,a){Cn(o,r,e,t,i,n,s,a,0),o.push(n,s)}function Cn(r,e,t,i,n,s,o,a,l){if(l>8)return;const u=Math.PI,h=(e+i)/2,c=(t+n)/2,p=(i+s)/2,d=(n+o)/2,f=(h+p)/2,m=(c+d)/2;let g=s-e,x=o-t;const b=Math.abs((i-s)*x-(n-o)*g);if(b>Fm){if(b*b<=a*(g*g+x*x)){if(du<Im){r.push(f,m);return}let v=Math.abs(Math.atan2(o-n,s-i)-Math.atan2(n-t,i-e));if(v>=u&&(v=2*u-v),v<du){r.push(f,m);return}}}else if(g=f-(e+s)/2,x=m-(t+o)/2,g*g+x*x<=a){r.push(f,m);return}Cn(r,e,t,h,c,f,m,a,l+1),Cn(r,f,m,p,d,s,o,a,l+1)}function Mn(r,e,t,i,n,s,o,a){let l=Math.abs(n-s);(!o&&n>s||o&&s>n)&&(l=2*Math.PI-l),a=a||Math.max(6,Math.floor(6*Math.pow(i,1/3)*(l/Math.PI))),a=Math.max(a,3);let u=l/a,h=n;u*=o?-1:1;for(let c=0;c<a+1;c++){const p=Math.cos(h),d=Math.sin(h),f=e+p*i,m=t+d*i;r.push(f,m),h+=u}}function fu(r,e,t,i,n,s){const o=r[r.length-2],a=r[r.length-1]-t,l=o-e,u=n-t,h=i-e,c=Math.abs(a*h-l*u);if(c<1e-8||s===0){(r[r.length-2]!==e||r[r.length-1]!==t)&&r.push(e,t);return}const p=a*a+l*l,d=u*u+h*h,f=a*u+l*h,m=s*Math.sqrt(p)/c,g=s*Math.sqrt(d)/c,x=m*f/p,b=g*f/d,v=m*h+g*l,_=m*u+g*a,P=l*(g+x),C=a*(g+x),B=h*(m+b),S=u*(m+b),w=Math.atan2(C-_,P-v),T=Math.atan2(S-_,B-v);Mn(r,v+e,_+t,s,w,T,l*u>h*a)}const er=Math.PI*2,Bn={centerX:0,centerY:0,ang1:0,ang2:0},Rn=({x:r,y:e},t,i,n,s,o,a,l)=>{r*=t,e*=i;const u=n*r-s*e,h=s*r+n*e;return l.x=u+o,l.y=h+a,l};function $m(r,e){const t=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),i=e===1.5707963267948966?.551915024494:t,n=Math.cos(r),s=Math.sin(r),o=Math.cos(r+e),a=Math.sin(r+e);return[{x:n-s*i,y:s+n*i},{x:o+a*i,y:a-o*i},{x:o,y:a}]}const gu=(r,e,t,i)=>{const n=r*i-e*t<0?-1:1;let s=r*t+e*i;return s>1&&(s=1),s<-1&&(s=-1),n*Math.acos(s)},Lm=(r,e,t,i,n,s,o,a,l,u,h,c,p)=>{const d=Math.pow(n,2),f=Math.pow(s,2),m=Math.pow(h,2),g=Math.pow(c,2);let x=d*f-d*g-f*m;x<0&&(x=0),x/=d*g+f*m,x=Math.sqrt(x)*(o===a?-1:1);const b=x*n/s*c,v=x*-s/n*h,_=u*b-l*v+(r+t)/2,P=l*b+u*v+(e+i)/2,C=(h-b)/n,B=(c-v)/s,S=(-h-b)/n,w=(-c-v)/s,T=gu(1,0,C,B);let L=gu(C,B,S,w);a===0&&L>0&&(L-=er),a===1&&L<0&&(L+=er),p.centerX=_,p.centerY=P,p.ang1=T,p.ang2=L};function mu(r,e,t,i,n,s,o,a=0,l=0,u=0){if(s===0||o===0)return;const h=Math.sin(a*er/360),c=Math.cos(a*er/360),p=c*(e-i)/2+h*(t-n)/2,d=-h*(e-i)/2+c*(t-n)/2;if(p===0&&d===0)return;s=Math.abs(s),o=Math.abs(o);const f=Math.pow(p,2)/Math.pow(s,2)+Math.pow(d,2)/Math.pow(o,2);f>1&&(s*=Math.sqrt(f),o*=Math.sqrt(f)),Lm(e,t,i,n,s,o,l,u,h,c,p,d,Bn);let{ang1:m,ang2:g}=Bn;const{centerX:x,centerY:b}=Bn;let v=Math.abs(g)/(er/4);Math.abs(1-v)<1e-7&&(v=1);const _=Math.max(Math.ceil(v),1);g/=_;let P=r[r.length-2],C=r[r.length-1];const B={x:0,y:0};for(let S=0;S<_;S++){const w=$m(m,g),{x:T,y:L}=Rn(w[0],s,o,c,h,x,b,B),{x:$,y:R}=Rn(w[1],s,o,c,h,x,b,B),{x:E,y:q}=Rn(w[2],s,o,c,h,x,b,B);An(r,P,C,T,L,$,R,E,q),P=E,C=q,m+=g}}const Dm=new K;class bu{constructor(e){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new pe,this._graphicsPath2D=e}moveTo(e,t){return this.startPoly(e,t),this}lineTo(e,t){this._ensurePoly();const i=this._currentPoly.points,n=i[i.length-2],s=i[i.length-1];return(n!==e||s!==t)&&i.push(e,t),this}arc(e,t,i,n,s,o){this._ensurePoly(!1);const a=this._currentPoly.points;return Mn(a,e,t,i,n,s,o),this}arcTo(e,t,i,n,s){this._ensurePoly();const o=this._currentPoly.points;return fu(o,e,t,i,n,s),this}arcToSvg(e,t,i,n,s,o,a){const l=this._currentPoly.points;return mu(l,this._currentPoly.lastX,this._currentPoly.lastY,o,a,e,t,i,n,s),this}bezierCurveTo(e,t,i,n,s,o){this._ensurePoly();const a=this._currentPoly;return An(this._currentPoly.points,a.lastX,a.lastY,e,t,i,n,s,o),this}quadraticCurveTo(e,t,i,n){this._ensurePoly();const s=this._currentPoly;return pu(this._currentPoly.points,s.lastX,s.lastY,e,t,i,n),this}closePath(){return this.endPoly(!0),this}addPath(e,t){this.endPoly(),t&&!t.isIdentity()&&(e=e.clone(!0),e.transform(t));for(let i=0;i<e.instructions.length;i++){const n=e.instructions[i];this[n.action](...n.data)}return this}finish(e=!1){this.endPoly(e)}rect(e,t,i,n,s){return this.drawShape(new K(e,t,i,n),s),this}circle(e,t,i,n){return this.drawShape(new Vi(e,t,i),n),this}poly(e,t,i){const n=new bt(e);n.closePath=t,this.drawShape(n,i)}ellipse(e,t,i,n,s){return this.drawShape(new Yi(e,t,i,n),s),this}roundRect(e,t,i,n,s,o){return this.drawShape(new Xi(e,t,i,n,s),o),this}drawShape(e,t){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:t}),this}startPoly(e,t){let i=this._currentPoly;return i&&this.endPoly(),i=new bt,i.points.push(e,t),this._currentPoly=i,this}endPoly(e=!1){const t=this._currentPoly;return t&&t.points.length>2&&(t.closePath=e,this.shapePrimitives.push({shape:t})),this._currentPoly=null,this}_ensurePoly(e=!0){if(!this._currentPoly&&(this._currentPoly=new bt,e)){const t=this.shapePrimitives[this.shapePrimitives.length-1];if(t){let i=t.shape.x,n=t.shape.y;if(t.transform.isIdentity()){const s=t.transform,o=i;i=s.a*i+s.c*n+s.tx,n=s.b*o+s.d*n+s.ty}this._currentPoly.points.push(i,i)}else this._currentPoly.points.push(0,0)}}buildPath(){const e=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let t=0;t<e.instructions.length;t++){const i=e.instructions[t];this[i.action](...i.data)}this.finish()}get bounds(){const e=this._bounds;e.clear();const t=this.shapePrimitives;for(let i=0;i<t.length;i++){const n=t[i],s=n.shape.getBounds(Dm);n.transform?(e.pushMatrix(n.transform),e.addRect(s),e.popMatrix()):e.addRect(s)}return e}}class vt{constructor(e){this.instructions=[],this.uid=X("graphicsPath"),this._dirty=!0;var t;typeof e=="string"?cu(e,this):this.instructions=(t=e==null?void 0:e.slice())!=null?t:[]}get shapePath(){return this._shapePath||(this._shapePath=new bu(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,t){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,t]}),this._dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this._dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this._dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this._dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this._dirty=!0,this}bezierCurveToShort(e,t,i,n){const s=this.instructions[this.instructions.length-1],o=this._getLastPoint(W.shared);let a=0,l=0;if(!s||s.action!=="bezierCurveTo")a=o.x,l=o.y;else{a=s.data[2],l=s.data[3];const u=o.x,h=o.y;a=u+(u-a),l=h+(h-l)}return this.instructions.push({action:"bezierCurveTo",data:[a,l,e,t,i,n]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this._dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this._dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this._dirty=!0,this}quadraticCurveToShort(e,t){const i=this.instructions[this.instructions.length-1],n=this._getLastPoint(W.shared);let s=0,o=0;if(!i||i.action!=="quadraticCurveTo")s=n.x,o=n.y;else{s=i.data[0],o=i.data[1];const a=n.x,l=n.y;s=a+(a-s),o=l+(l-o)}return this.instructions.push({action:"quadraticCurveTo",data:[s,o,e,t]}),this._dirty=!0,this}rect(e,t,i,n,s){return this.instructions.push({action:"rect",data:[e,t,i,n,s]}),this._dirty=!0,this}circle(e,t,i,n){return this.instructions.push({action:"circle",data:[e,t,i,n]}),this._dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this._dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this._dirty=!0,this}star(e,t,i,n,s,o=0,a){s=s||n/2;const l=-1*Math.PI/2+o,u=i*2,h=Math.PI*2/u,c=[];for(let p=0;p<u;p++){const d=p%2?s:n,f=p*h+l;c.push(e+d*Math.cos(f),t+d*Math.sin(f))}return this.poly(c,!0,a),this}clone(e=!1){const t=new vt;if(!e)t.instructions=this.instructions.slice();else for(let i=0;i<this.instructions.length;i++){const n=this.instructions[i];t.instructions.push({action:n.action,data:n.data.slice()})}return t}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(e){if(e.isIdentity())return this;const t=e.a,i=e.b,n=e.c,s=e.d,o=e.tx,a=e.ty;let l=0,u=0,h=0,c=0,p=0,d=0,f=0,m=0;for(let g=0;g<this.instructions.length;g++){const x=this.instructions[g],b=x.data;switch(x.action){case"moveTo":case"lineTo":l=b[0],u=b[1],b[0]=t*l+n*u+o,b[1]=i*l+s*u+a;break;case"bezierCurveTo":h=b[0],c=b[1],p=b[2],d=b[3],l=b[4],u=b[5],b[0]=t*h+n*c+o,b[1]=i*h+s*c+a,b[2]=t*p+n*d+o,b[3]=i*p+s*d+a,b[4]=t*l+n*u+o,b[5]=i*l+s*u+a;break;case"quadraticCurveTo":h=b[0],c=b[1],l=b[2],u=b[3],b[0]=t*h+n*c+o,b[1]=i*h+s*c+a,b[2]=t*l+n*u+o,b[3]=i*l+s*u+a;break;case"arcToSvg":l=b[5],u=b[6],f=b[0],m=b[1],b[0]=t*f+n*m,b[1]=i*f+s*m,b[5]=t*l+n*u+o,b[6]=i*l+s*u+a;break;case"rect":b[4]=kn(b[4],e);break;case"ellipse":b[8]=kn(b[8],e);break;case"roundRect":b[5]=kn(b[5],e);break;case"addPath":b[0].transform(e);break;default:break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}_getLastPoint(e){let t=this.instructions.length-1,i=this.instructions[t];if(!i)return e.x=0,e.y=0,e;for(;i.action==="closePath";){if(t--,t<0)return e.x=0,e.y=0,e;i=this.instructions[t]}let n,s,o;switch(i.action){case"moveTo":case"lineTo":e.x=i.data[0],e.y=i.data[1];break;case"quadraticCurveTo":e.x=i.data[2],e.y=i.data[3];break;case"bezierCurveTo":e.x=i.data[4],e.y=i.data[5];break;case"arc":case"arcToSvg":e.x=i.data[5],e.y=i.data[6];break;case"addPath":e.x=i.data[0].lastX,e.y=i.data[2].lastY;break;case"rect":if(o=i.data[4],n=i.data[0],s=i.data[1],o){const{a,b:l,c:u,d:h,tx:c,ty:p}=o;e.x=a*n+u*s+c,e.y=l*n+h*s+p}else e.x=n,e.y=s;break;default:break}return e}}function kn(r,e){return r?r.prepend(e):e.clone()}var zm=Object.defineProperty,vu=Object.getOwnPropertySymbols,Nm=Object.prototype.hasOwnProperty,Hm=Object.prototype.propertyIsEnumerable,yu=(r,e,t)=>e in r?zm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Kr=(r,e)=>{for(var t in e||(e={}))Nm.call(e,t)&&yu(r,t,e[t]);if(vu)for(var t of vu(e))Hm.call(e,t)&&yu(r,t,e[t]);return r};function xu(r,e){if(typeof r=="string"){const i=document.createElement("div");i.innerHTML=r.trim(),r=i.querySelector("svg")}const t={context:e,path:new vt};return _u(r,t,null,null),e}function _u(r,e,t,i){const n=r.children,{fillStyle:s,strokeStyle:o}=jm(r);s&&t?t=Kr(Kr({},t),s):s&&(t=s),o&&i?i=Kr(Kr({},i),o):o&&(i=o),e.context.fillStyle=t,e.context.strokeStyle=i;let a,l,u,h,c,p,d,f,m,g,x,b,v,_,P,C,B;switch(r.nodeName.toLowerCase()){case"path":_=r.getAttribute("d"),P=new vt(_),e.context.path(P),t&&e.context.fill(),i&&e.context.stroke();break;case"circle":d=ae(r,"cx",0),f=ae(r,"cy",0),m=ae(r,"r",0),e.context.ellipse(d,f,m,m),t&&e.context.fill(),i&&e.context.stroke();break;case"rect":a=ae(r,"x",0),l=ae(r,"y",0),C=ae(r,"width",0),B=ae(r,"height",0),g=ae(r,"rx",0),x=ae(r,"ry",0),g||x?e.context.roundRect(a,l,C,B,g||x):e.context.rect(a,l,C,B),t&&e.context.fill(),i&&e.context.stroke();break;case"ellipse":d=ae(r,"cx",0),f=ae(r,"cy",0),g=ae(r,"rx",0),x=ae(r,"ry",0),e.context.beginPath(),e.context.ellipse(d,f,g,x),t&&e.context.fill(),i&&e.context.stroke();break;case"line":u=ae(r,"x1",0),h=ae(r,"y1",0),c=ae(r,"x2",0),p=ae(r,"y2",0),e.context.beginPath(),e.context.moveTo(u,h),e.context.lineTo(c,p),i&&e.context.stroke();break;case"polygon":v=r.getAttribute("points"),b=v.match(/\d+/g).map(S=>parseInt(S,10)),e.context.poly(b,!0),t&&e.context.fill(),i&&e.context.stroke();break;case"polyline":v=r.getAttribute("points"),b=v.match(/\d+/g).map(S=>parseInt(S,10)),e.context.poly(b,!1),i&&e.context.stroke();break;case"g":case"svg":break;default:{console.info(`[SVG parser] <${r.nodeName}> elements unsupported`);break}}for(let S=0;S<n.length;S++)_u(n[S],e,t,i)}function ae(r,e,t){const i=r.getAttribute(e);return i?Number(i):t}function jm(r){const e=r.getAttribute("style"),t={},i={};let n=!1,s=!1;if(e){const o=e.split(";");for(let a=0;a<o.length;a++){const l=o[a],[u,h]=l.split(":");switch(u){case"stroke":h!=="none"&&(t.color=j.shared.setValue(h).toNumber(),s=!0);break;case"stroke-width":t.width=Number(h);break;case"fill":h!=="none"&&(n=!0,i.color=j.shared.setValue(h).toNumber());break;case"fill-opacity":i.alpha=Number(h);break;case"stroke-opacity":t.alpha=Number(h);break;case"opacity":i.alpha=Number(h),t.alpha=Number(h);break}}}else{const o=r.getAttribute("stroke");o&&o!=="none"&&(s=!0,t.color=j.shared.setValue(o).toNumber(),t.width=ae(r,"stroke-width",1));const a=r.getAttribute("fill");a&&a!=="none"&&(n=!0,i.color=j.shared.setValue(a).toNumber())}return{strokeStyle:s?t:null,fillStyle:n?i:null}}class tr extends le{constructor(){super(...arguments),this.uploadMethodId="image"}}const Zr=D.ADAPTER.createCanvas(),ot=1;Zr.width=ot,Zr.height=ot;const $e=Zr.getContext("2d");$e.fillStyle="#ffffff",$e.fillRect(0,0,ot,ot),$e.beginPath(),$e.moveTo(0,0),$e.lineTo(ot,0),$e.lineTo(ot,ot),$e.closePath(),$e.fillStyle="#ffffff",$e.fill(),A.WHITE=new A({source:new tr({resource:Zr})}),A.WHITE.label="WHITE",A.WHITE.destroy=mn;const On=class{constructor(r,e,t,i){this.uid=X("fillGradient"),this.type="linear",this.gradientStops=[],this.x0=r,this.y0=e,this.x1=t,this.y1=i}addColorStop(r,e){return this.gradientStops.push({offset:r,color:j.shared.setValue(e).toHex()}),this}buildLinearGradient(){const r=On.defaultTextureSize,{gradientStops:e}=this,t=D.ADAPTER.createCanvas();t.width=r,t.height=r;const i=t.getContext("2d"),n=i.createLinearGradient(0,0,On.defaultTextureSize,1);for(let f=0;f<e.length;f++){const m=e[f];n.addColorStop(m.offset,m.color)}i.fillStyle=n,i.fillRect(0,0,r,r),this.texture=new A({source:new tr({resource:t,style:{addressModeU:"clamp-to-edge",addressModeV:"repeat"}})});const{x0:s,y0:o,x1:a,y1:l}=this,u=new k,h=a-s,c=l-o,p=Math.sqrt(h*h+c*c),d=Math.atan2(c,h);u.translate(-s,-o),u.scale(1/r,1/r),u.rotate(-d),u.scale(256/p,1),this.transform=u}};let rr=On;rr.defaultTextureSize=256;const wu={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};class Fn{constructor(e,t){this.uid=X("fillPattern"),this.transform=new k,this.texture=e,this.transform.scale(1/e.frameWidth,1/e.frameHeight),t&&(e.source.style.addressModeU=wu[t].addressModeU,e.source.style.addressModeV=wu[t].addressModeV)}setTransform(e){const t=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/t.frameWidth,1/t.frameHeight)}}var Wm=Object.defineProperty,Vm=Object.defineProperties,Ym=Object.getOwnPropertyDescriptors,Tu=Object.getOwnPropertySymbols,Xm=Object.prototype.hasOwnProperty,qm=Object.prototype.propertyIsEnumerable,Su=(r,e,t)=>e in r?Wm(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,at=(r,e)=>{for(var t in e||(e={}))Xm.call(e,t)&&Su(r,t,e[t]);if(Tu)for(var t of Tu(e))qm.call(e,t)&&Su(r,t,e[t]);return r},Un=(r,e)=>Vm(r,Ym(e));function lt(r,e){var t,i;if(!r)return null;let n,s;if(r!=null&&r.fill?(s=r.fill,n=at(at({},e),r)):(s=r,n=e),j.isColorLike(s)){const a=j.shared.setValue(s!=null?s:0);return Un(at({},n),{color:a.toNumber(),alpha:(t=n.alpha)!=null?t:a.alpha,texture:A.WHITE})}else if(s instanceof Fn){const a=s;return Un(at({},n),{color:16777215,texture:a.texture,matrix:a.transform,fill:(i=n.fill)!=null?i:null})}else if(s instanceof rr){const a=s;return a.buildLinearGradient(),Un(at({},n),{color:16777215,texture:a.texture,matrix:a.transform})}const o=at(at({},e),r);if(o.texture!==A.WHITE){const a=o.matrix||new k;a.scale(1/o.texture.frameWidth,1/o.texture.frameHeight),o.matrix=a,o.color=16777215}return o.color=j.shared.setValue(o.color).toNumber(),o}var Km=Object.defineProperty,Pu=Object.getOwnPropertySymbols,Zm=Object.prototype.hasOwnProperty,Qm=Object.prototype.propertyIsEnumerable,Au=(r,e,t)=>e in r?Km(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Qr=(r,e)=>{for(var t in e||(e={}))Zm.call(e,t)&&Au(r,t,e[t]);if(Pu)for(var t of Pu(e))Qm.call(e,t)&&Au(r,t,e[t]);return r};const _t=new W,Eu=new k,ut=class extends he{constructor(){super(...arguments),this.uid=X("graphicsContext"),this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new vt,this._transform=new k,this._fillStyle=Qr({},ut.defaultFillStyle),this._strokeStyle=Qr({},ut.defaultStrokeStyle),this._stateStack=[],this._tick=0,this._bounds=new pe,this._boundsDirty=!0}get fillStyle(){return this._fillStyle}set fillStyle(r){this._fillStyle=lt(r,ut.defaultFillStyle)}get strokeStyle(){return this._strokeStyle}set strokeStyle(r){this._strokeStyle=lt(r,ut.defaultStrokeStyle)}texture(r,e,t,i,n,s){return this.instructions.push({action:"texture",data:{image:r,dx:t||0,dy:i||0,dw:n||r.frameWidth,dh:s||r.frameHeight,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e?j.shared.setValue(e).toNumber():0}}),this.onUpdate(),this}beginPath(){return this._activePath=new vt,this}fill(r,e){let t;const i=this.instructions[this.instructions.length-1];return this._tick===0&&i&&i.action==="stroke"?t=i.data.path:t=this._activePath.clone(),t?(r&&(e!==void 0&&typeof r=="number"&&(O("8.0.0","GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),r={color:r,alpha:e}),this.fillStyle=lt(r,ut.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:this.fillStyle,path:t}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this):this}stroke(r){let e;const t=this.instructions[this.instructions.length-1];return this._tick===0&&t&&t.action==="fill"?e=t.data.path:e=this._activePath.clone(),e?(r&&(this.strokeStyle=lt(r,ut.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:this.strokeStyle,path:e}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this):this}cut(){for(let r=0;r<2;r++){const e=this.instructions[this.instructions.length-1-r],t=this._activePath.clone();e&&(e.action==="stroke"||e.action==="fill")&&(e.data.hole=t)}return this._activePath.instructions.length=0,this}arc(r,e,t,i,n,s){this._tick++;const o=this._transform;return this._activePath.arc(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,t,i,n,s),this}arcTo(r,e,t,i,n){this._tick++;const s=this._transform;return this._activePath.arcTo(s.a*r+s.c*e+s.tx,s.b*r+s.d*e+s.ty,s.a*t+s.c*i+s.tx,s.b*t+s.d*i+s.ty,n),this}arcToSvg(r,e,t,i,n,s,o){this._tick++;const a=this._transform;return this._activePath.arcToSvg(r,e,t,i,n,a.a*s+a.c*o+a.tx,a.b*s+a.d*o+a.ty),this}bezierCurveTo(r,e,t,i,n,s){this._tick++;const o=this._transform;return this._activePath.bezierCurveTo(o.a*r+o.c*e+o.tx,o.b*r+o.d*e+o.ty,o.a*t+o.c*i+o.tx,o.b*t+o.d*i+o.ty,o.a*n+o.c*s+o.tx,o.b*n+o.d*s+o.ty),this}closePath(){var r;return this._tick++,(r=this._activePath)==null||r.closePath(),this}ellipse(r,e,t,i){return this._tick++,this._activePath.ellipse(r,e,t,i,this._transform.clone()),this}circle(r,e,t){return this._tick++,this._activePath.circle(r,e,t,this._transform.clone()),this}path(r){return this._tick++,this._activePath.addPath(r,this._transform.clone()),this}lineTo(r,e){this._tick++;const t=this._transform;return this._activePath.lineTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}moveTo(r,e){this._tick++;const t=this._transform;return this._activePath.moveTo(t.a*r+t.c*e+t.tx,t.b*r+t.d*e+t.ty),this}quadraticCurveTo(r,e,t,i){this._tick++;const n=this._transform;this._activePath.quadraticCurveTo(n.a*r+n.c*e+n.tx,n.b*r+n.d*e+n.ty,n.a*t+n.c*i+n.tx,n.b*t+n.d*i+n.ty)}rect(r,e,t,i){return this._tick++,this._activePath.rect(r,e,t,i,this._transform.clone()),this}roundRect(r,e,t,i,n){return this._tick++,this._activePath.roundRect(r,e,t,i,n,this._transform.clone()),this}poly(r,e){return this._tick++,this._activePath.poly(r,e,this._transform.clone()),this}star(r,e,t,i,n,s){return this._tick++,this._activePath.star(r,e,t,i,n,s,this._transform.clone()),this}svg(r){this._tick++,xu(r,this)}restore(){const r=this._stateStack.pop();r&&(this._transform=r.transform,this._fillStyle=r.fillStyle,this._strokeStyle=r.strokeStyle)}save(){this._stateStack.push({transform:this._transform.clone(),fillStyle:Qr({},this._fillStyle),strokeStyle:Qr({},this._strokeStyle)})}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(r){return this._transform.rotate(r),this}scale(r,e=r){return this._transform.scale(r,e),this}setTransform(r,e,t,i,n,s){return r instanceof k?(this._transform.set(r.a,r.b,r.c,r.d,r.tx,r.ty),this):(this._transform.set(r,e,t,i,n,s),this)}transform(r,e,t,i,n,s){return r instanceof k?(this._transform.append(r),this):(Eu.set(r,e,t,i,n,s),this._transform.append(Eu),this)}translate(r,e){return this._transform.translate(r,e),this}clear(){return this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this._boundsDirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;const r=this._bounds;r.clear();for(let e=0;e<this.instructions.length;e++){const t=this.instructions[e],i=t.action;if(i==="fill"){const n=t.data;r.addBounds(n.path.bounds)}else if(i==="texture"){const n=t.data;r.pushMatrix(n.transform),r.addFrame(n.dx,n.dy,n.dx+n.dw,n.dy+n.dh),r.popMatrix()}}return r}containsPoint(r){const e=this.instructions;let t=!1;return e.forEach(i=>{var n;const s=i.data,o=s.path;if(!i.action||!o)return;const a=s.style,l=(n=o.shapePath)==null?void 0:n.shapePrimitives;this._forEachShape(l,u=>{var h;if(!a||!u)return;typeof a!="number"&&a.matrix?a.matrix.applyInverse(r,_t):_t.copyFrom(r),t=u.contains(_t.x,_t.y);const c=s.hole;if(!c)return;const p=(h=c.shapePath)==null?void 0:h.shapePrimitives;p&&this._forEachShape(p,d=>{d.contains(_t.x,_t.y)&&(t=!1)})})}),t}_forEachShape(r,e){r==null||r.forEach(t=>{const i=t==null?void 0:t.shape;i&&e(i)})}destroy(r=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(e),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(e)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};let je=ut;je.defaultFillStyle={color:0,alpha:1,texture:A.WHITE,matrix:null,fill:null},je.defaultStrokeStyle={width:1,color:0,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:A.WHITE,matrix:null,fill:null};const Jm=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,eb=".svg",tb="image/svg+xml",Cu={extension:{type:y.LoadParser,priority:Ge.Low},name:"loadSVG",test(r){return it(r,tb)||nt(r,eb)},async testParse(r){return typeof r=="string"&&r.startsWith("data:image/svg+xml")||typeof r=="string"&&Jm.test(r)},async parse(r){const e=new je;return e.svg(r),e},async load(r){return(await D.ADAPTER.fetch(r)).text()},unload(r){r.destroy(!0)}};function In(r,e=1){var t;const i=(t=D.RETINA_PREFIX)==null?void 0:t.exec(r);return i?parseFloat(i[1]):e}let Mu=0,Gn;const rb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",ib={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${rb}');
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
    `},nb={id:"loadImageBitmap",code:`
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
    };`};let $n;class sb{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const t=URL.createObjectURL(new Blob([ib.code],{type:"application/javascript"})),i=new Worker(t);i.addEventListener("message",n=>{i.terminate(),URL.revokeObjectURL(t),e(n.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e){return this._run("loadImageBitmap",[e])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){Gn===void 0&&(Gn=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<Gn&&($n||($n=URL.createObjectURL(new Blob([nb.code],{type:"application/javascript"}))),this._createdWorkers++,e=new Worker($n),e.addEventListener("message",t=>{this._complete(t.data),this._returnWorker(t.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){e.error!==void 0?this._resolveHash[e.uuid].reject(e.error):this._resolveHash[e.uuid].resolve(e.data),this._resolveHash[e.uuid]=null}async _run(e,t){await this._initWorkers();const i=new Promise((n,s)=>{this._queue.push({id:e,arguments:t,resolve:n,reject:s})});return this._next(),i}_next(){if(!this._queue.length)return;const e=this._getWorker();if(!e)return;const t=this._queue.pop(),i=t.id;this._resolveHash[Mu]={resolve:t.resolve,reject:t.reject},e.postMessage({data:t.arguments,uuid:Mu++,id:i})}}const Ln=new sb;function Dn(r,e,t){const i=new A({source:r,label:t}),n=()=>{delete e.promiseCache[t],ie.has(t)&&ie.remove(t)};return i.once("destroy",()=>{t in e.promiseCache&&n()}),i.source.once("destroy",()=>{r.destroyed||n()}),i}var ob=Object.defineProperty,Bu=Object.getOwnPropertySymbols,ab=Object.prototype.hasOwnProperty,lb=Object.prototype.propertyIsEnumerable,Ru=(r,e,t)=>e in r?ob(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ub=(r,e)=>{for(var t in e||(e={}))ab.call(e,t)&&Ru(r,t,e[t]);if(Bu)for(var t of Bu(e))lb.call(e,t)&&Ru(r,t,e[t]);return r};const hb=[".jpeg",".jpg",".png",".webp",".avif"],cb=["image/jpeg","image/png","image/webp","image/avif"];async function ku(r){const e=await D.ADAPTER.fetch(r);if(!e.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${r}: ${e.status} ${e.statusText}`);const t=await e.blob();return await createImageBitmap(t)}const zn={name:"loadTextures",extension:{type:y.LoadParser,priority:Ge.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(r){return it(r,cb)||nt(r,hb)},async load(r,e,t){var i;let n=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await Ln.isImageBitmapSupported()?n=await Ln.loadImageBitmap(r):n=await ku(r):n=await new Promise(o=>{n=new Image,n.crossOrigin=this.config.crossOrigin,n.src=r,n.complete?o(n):n.onload=()=>{o(n)}});const s=new tr(ub({resource:n,alphaMode:"premultiply-alpha-on-upload",resolution:((i=e.data)==null?void 0:i.resolution)||In(r)},e.data));return Dn(s,t,r)},unload(r){r.destroy(!0)}};let Nn;async function Hn(){return Nn!=null||(Nn=(async()=>{var r;const e=document.createElement("canvas").getContext("webgl");if(!e)return"premultiply-alpha-on-upload";const t=await new Promise(o=>{const a=document.createElement("video");a.onloadeddata=()=>o(a),a.onerror=()=>o(null),a.autoplay=!1,a.crossOrigin="anonymous",a.preload="auto",a.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",a.load()});if(!t)return"premultiply-alpha-on-upload";const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i);const n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t);const s=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,s),e.deleteFramebuffer(n),e.deleteTexture(i),(r=e.getExtension("WEBGL_lose_context"))==null||r.loseContext(),s[0]<=s[3]?"premultiplied-alpha":"premultiply-alpha-on-upload"})()),Nn}var db=Object.defineProperty,pb=Object.defineProperties,fb=Object.getOwnPropertyDescriptors,Ou=Object.getOwnPropertySymbols,gb=Object.prototype.hasOwnProperty,mb=Object.prototype.propertyIsEnumerable,Fu=(r,e,t)=>e in r?db(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,jn=(r,e)=>{for(var t in e||(e={}))gb.call(e,t)&&Fu(r,t,e[t]);if(Ou)for(var t of Ou(e))mb.call(e,t)&&Fu(r,t,e[t]);return r},bb=(r,e)=>pb(r,fb(e));const Uu=class extends le{constructor(r){var e;super(r),this.isReady=!1,this.uploadMethodId="video",r=jn(jn({},Uu.defaultOptions),r),this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=r.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=r.autoPlay!==!1,this.alphaMode=(e=r.alphaMode)!=null?e:"premultiply-alpha-on-upload",this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),r.autoLoad!==!1&&this.load()}updateFrame(){if(!this.destroyed){if(this._updateFPS){const r=ce.shared.elapsedMS*this.resource.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-r)}(!this._updateFPS||this._msToNextUpdate<=0)&&(this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0),this.isValid&&this.update()}}_videoFrameRequestCallback(){this.updateFrame(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback)}get isValid(){return!!this.resource.videoWidth&&!!this.resource.videoHeight}async load(){if(this._load)return this._load;const r=this.resource;return(r.readyState===r.HAVE_ENOUGH_DATA||r.readyState===r.HAVE_FUTURE_DATA)&&r.width&&r.height&&(r.complete=!0),r.addEventListener("play",this._onPlayStart),r.addEventListener("pause",this._onPlayStop),r.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._onCanPlay():(this.options.preload||r.addEventListener("canplay",this._onCanPlay),r.addEventListener("canplaythrough",this._onCanPlay),r.addEventListener("error",this._onError,!0)),this.alphaMode=await Hn(),this._load=new Promise((e,t)=>{this.isValid?e(this):(this._resolve=e,this._reject=t,r.load())}),this._load}_onError(r){this.resource.removeEventListener("error",this._onError,!0),this.emit("error",r),this._reject&&(this._reject(r),this._reject=null,this._resolve=null)}_isSourcePlaying(){const r=this.resource;return!r.paused&&!r.ended}_isSourceReady(){return this.resource.readyState>2}_onPlayStart(){this.isValid||this._onCanPlay(),this._configureAutoUpdate()}_onPlayStop(){this._configureAutoUpdate()}_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0)}_onCanPlay(){const r=this.resource;r.removeEventListener("canplay",this._onCanPlay),r.removeEventListener("canplaythrough",this._onCanPlay),this.isValid&&(this.isReady=!0,this.resize(r.videoWidth,r.videoHeight)),this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0,this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.resource.play()}destroy(){this._configureAutoUpdate();const r=this.resource;r&&(r.removeEventListener("play",this._onPlayStart),r.removeEventListener("pause",this._onPlayStop),r.removeEventListener("seeked",this._onSeeked),r.removeEventListener("canplay",this._onCanPlay),r.removeEventListener("canplaythrough",this._onCanPlay),r.removeEventListener("error",this._onError,!0),r.pause(),r.src="",r.load()),super.destroy()}get autoUpdate(){return this._autoUpdate}set autoUpdate(r){r!==this._autoUpdate&&(this._autoUpdate=r,this._configureAutoUpdate())}get updateFPS(){return this._updateFPS}set updateFPS(r){r!==this._updateFPS&&(this._updateFPS=r,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.source.requestVideoFrameCallback?(this._isConnectedToTicker&&(ce.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),this._videoFrameRequestCallbackHandle===null&&(this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback))):(this._videoFrameRequestCallbackHandle!==null&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(ce.shared.add(this.updateFrame,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(this._videoFrameRequestCallbackHandle!==null&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(ce.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}};let wt=Uu;wt.defaultOptions=bb(jn({},le.defaultOptions),{autoLoad:!0,autoPlay:!0,updateFPS:0,crossorigin:!0,loop:!1,muted:!0,playsinline:!0,preload:!1}),wt.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};var vb=Object.defineProperty,yb=Object.defineProperties,xb=Object.getOwnPropertyDescriptors,Iu=Object.getOwnPropertySymbols,_b=Object.prototype.hasOwnProperty,wb=Object.prototype.propertyIsEnumerable,Gu=(r,e,t)=>e in r?vb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Wn=(r,e)=>{for(var t in e||(e={}))_b.call(e,t)&&Gu(r,t,e[t]);if(Iu)for(var t of Iu(e))wb.call(e,t)&&Gu(r,t,e[t]);return r},$u=(r,e)=>yb(r,xb(e));const Lu=[".mp4",".m4v",".webm",".ogg",".ogv",".h264",".avi",".mov"],Tb=Lu.map(r=>`video/${r.substring(1)}`);function Du(r,e,t){t===void 0&&!e.startsWith("data:")?r.crossOrigin=zu(e):t!==!1&&(r.crossOrigin=typeof t=="string"?t:"anonymous")}function zu(r,e=globalThis.location){if(r.startsWith("data:"))return"";e=e||globalThis.location;const t=new URL(r,document.baseURI);return t.hostname!==e.hostname||t.port!==e.port||t.protocol!==e.protocol?"anonymous":""}const Nu={name:"loadVideo",extension:{type:y.LoadParser},config:null,test(r){const e=it(r,Tb),t=nt(r,Lu);return e||t},async load(r,e,t){var i,n;const s=Wn($u(Wn({},wt.defaultOptions),{resolution:((i=e.data)==null?void 0:i.resolution)||In(r),alphaMode:((n=e.data)==null?void 0:n.alphaMode)||await Hn()}),e.data),o=document.createElement("video"),a={preload:s.autoLoad!==!1?"auto":void 0,"webkit-playsinline":s.playsinline!==!1?"":void 0,playsinline:s.playsinline!==!1?"":void 0,muted:s.muted===!0?"":void 0,loop:s.loop===!0?"":void 0,autoplay:s.autoPlay!==!1?"":void 0};Object.keys(a).forEach(c=>{const p=a[c];p!==void 0&&o.setAttribute(c,p)}),s.muted===!0&&(o.muted=!0),Du(o,r,s.crossorigin);const l=document.createElement("source");let u;if(r.startsWith("data:"))u=r.slice(5,r.indexOf(";"));else if(!r.startsWith("blob:")){const c=r.split("?")[0].slice(r.lastIndexOf(".")+1).toLowerCase();u=wt.MIME_TYPES[c]||`video/${c}`}l.src=r,u&&(l.type=u),o.appendChild(l);const h=new wt($u(Wn({},s),{resource:o}));return Dn(h,t,r)},unload(r){r.destroy(!0)}},Hu={extension:y.ResolveParser,test:zn.test,parse:r=>{var e,t;return{resolution:parseFloat((t=(e=D.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:r.split(".").pop(),src:r}}};Z.add(Zl,eu,Ql,nu,tu,ru,iu,su,ou,hu,Cu,zn,Nu,Hu,Kl,ql);const ju={loader:y.LoadParser,resolver:y.ResolveParser,cache:y.CacheParser,detection:y.DetectionParser};Z.handle(y.Asset,r=>{const e=r.ref;Object.entries(ju).filter(([t])=>!!e[t]).forEach(([t,i])=>{var n;return Z.add(Object.assign(e[t],{extension:(n=e[t].extension)!=null?n:i}))})},r=>{const e=r.ref;Object.keys(ju).filter(t=>!!e[t]).forEach(t=>Z.remove(e[t]))});class Sb{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){this._tickerAdded||!this.domElement||(ce.system.add(this._tickerUpdate,this,Qe.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(ce.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const e=this.events._rootPointerEvent;this.events.supportsTouchEvents&&e.pointerType==="touch"||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY}))}_tickerUpdate(e){this._deltaTime+=e.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this._update())}}const Le=new Sb;class ir extends $t{constructor(){super(...arguments),this.client=new W,this.movement=new W,this.offset=new W,this.global=new W,this.screen=new W}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(e,t,i){return e.worldTransform.applyInverse(i||this.global,t)}getModifierState(e){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(e)}initMouseEvent(e,t,i,n,s,o,a,l,u,h,c,p,d,f,m){throw new Error("Method not implemented.")}}class xe extends ir{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class ht extends ir{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}ht.DOM_DELTA_PIXEL=0,ht.DOM_DELTA_LINE=1,ht.DOM_DELTA_PAGE=2;const Pb=2048,Ab=new W,nr=new W;class Wu{constructor(e){this.dispatch=new he,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,t){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:t,priority:0}),this.mappingTable[e].sort((i,n)=>i.priority-n.priority)}dispatchEvent(e,t){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,t),this.dispatch.emit(t||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const t=this.mappingTable[e.type];if(t)for(let i=0,n=t.length;i<n;i++)t[i].fn(e)}hitTest(e,t){Le.pauseUpdate=!0;const i=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",n=this[i](this.rootTarget,this.rootTarget.eventMode,Ab.set(e,t),this.hitTestFn,this.hitPruneFn);return n&&n[0]}propagate(e,t){if(!e.target)return;const i=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let n=0,s=i.length-1;n<s;n++)if(e.currentTarget=i[n],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,t),!(e.propagationStopped||e.propagationImmediatelyStopped)){e.eventPhase=e.BUBBLING_PHASE;for(let n=i.length-2;n>=0;n--)if(e.currentTarget=i[n],this.notifyTarget(e,t),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,t,i=this._allInteractiveElements){if(i.length===0)return;e.eventPhase=e.BUBBLING_PHASE;const n=Array.isArray(t)?t:[t];for(let s=i.length-1;s>=0;s--)n.forEach(o=>{e.currentTarget=i[s],this.notifyTarget(e,o)})}propagationPath(e){const t=[e];for(let i=0;i<Pb&&e!==this.rootTarget&&e.parent;i++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");t.push(e.parent),e=e.parent}return t.reverse(),t}hitTestMoveRecursive(e,t,i,n,s,o=!1){let a=!1;if(this._interactivePrune(e))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Le.pauseUpdate=!1),e.interactiveChildren&&e.children){const h=e.children;for(let c=h.length-1;c>=0;c--){const p=h[c],d=this.hitTestMoveRecursive(p,this._isInteractive(t)?t:p.eventMode,i,n,s,o||s(e,i));if(d){if(d.length>0&&!d[d.length-1].parent)continue;const f=e.isInteractive();(d.length>0||f)&&(f&&this._allInteractiveElements.push(e),d.push(e)),this._hitElements.length===0&&(this._hitElements=d),a=!0}}}const l=this._isInteractive(t),u=e.isInteractive();return u&&u&&this._allInteractiveElements.push(e),o||this._hitElements.length>0?null:a?this._hitElements:l&&!s(e,i)&&n(e,i)?u?[e]:[]:null}hitTestRecursive(e,t,i,n,s){if(this._interactivePrune(e)||s(e,i))return null;if((e.eventMode==="dynamic"||t==="dynamic")&&(Le.pauseUpdate=!1),e.interactiveChildren&&e.children){const l=e.children,u=i;for(let h=l.length-1;h>=0;h--){const c=l[h],p=this.hitTestRecursive(c,this._isInteractive(t)?t:c.eventMode,u,n,s);if(p){if(p.length>0&&!p[p.length-1].parent)continue;const d=e.isInteractive();return(p.length>0||d)&&p.push(e),p}}}const o=this._isInteractive(t),a=e.isInteractive();return o&&n(e,i)?a?[e]:[]:null}_isInteractive(e){return e==="static"||e==="dynamic"}_interactivePrune(e){return!e||!e.visible||!e.renderable||e.eventMode==="none"||e.eventMode==="passive"&&!e.interactiveChildren}hitPruneFn(e,t){if(e.hitArea&&(e.worldTransform.applyInverse(t,nr),!e.hitArea.contains(nr.x,nr.y)))return!0;if(e.effects&&e.effects.length)for(let i=0;i<e.effects.length;i++){const n=e.effects[i];if(n.containsPoint&&!n.containsPoint(t,this.hitTestFn))return!0}return!1}hitTestFn(e,t){var i;return e.hitArea?!0:(i=e.view)!=null&&i.containsPoint?(e.worldTransform.applyInverse(t,nr),e.view.containsPoint(nr)):!1}notifyTarget(e,t){var i,n;t=t!=null?t:e.type;const s=`on${t}`;(n=(i=e.currentTarget)[s])==null||n.call(i,e);const o=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${t}capture`:t;this._notifyListeners(e,o),e.eventPhase===e.AT_TARGET&&this._notifyListeners(e,t)}mapPointerDown(e){if(!(e instanceof xe))return;const t=this.createPointerEvent(e);if(this.dispatchEvent(t,"pointerdown"),t.pointerType==="touch")this.dispatchEvent(t,"touchstart");else if(t.pointerType==="mouse"||t.pointerType==="pen"){const n=t.button===2;this.dispatchEvent(t,n?"rightdown":"mousedown")}const i=this.trackingData(e.pointerId);i.pressTargetsByButton[e.button]=t.composedPath(),this.freeEvent(t)}mapPointerMove(e){var t,i,n;if(!(e instanceof xe))return;this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const s=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const o=s.pointerType==="mouse"||s.pointerType==="pen",a=this.trackingData(e.pointerId),l=this.findMountedTarget(a.overTargets);if(((t=a.overTargets)==null?void 0:t.length)>0&&l!==s.target){const c=e.type==="mousemove"?"mouseout":"pointerout",p=this.createPointerEvent(e,c,l);if(this.dispatchEvent(p,"pointerout"),o&&this.dispatchEvent(p,"mouseout"),!s.composedPath().includes(l)){const d=this.createPointerEvent(e,"pointerleave",l);for(d.eventPhase=d.AT_TARGET;d.target&&!s.composedPath().includes(d.target);)d.currentTarget=d.target,this.notifyTarget(d),o&&this.notifyTarget(d,"mouseleave"),d.target=d.target.parent;this.freeEvent(d)}this.freeEvent(p)}if(l!==s.target){const c=e.type==="mousemove"?"mouseover":"pointerover",p=this.clonePointerEvent(s,c);this.dispatchEvent(p,"pointerover"),o&&this.dispatchEvent(p,"mouseover");let d=l==null?void 0:l.parent;for(;d&&d!==this.rootTarget.parent&&d!==s.target;)d=d.parent;if(!d||d===this.rootTarget.parent){const f=this.clonePointerEvent(s,"pointerenter");for(f.eventPhase=f.AT_TARGET;f.target&&f.target!==l&&f.target!==this.rootTarget.parent;)f.currentTarget=f.target,this.notifyTarget(f),o&&this.notifyTarget(f,"mouseenter"),f.target=f.target.parent;this.freeEvent(f)}this.freeEvent(p)}const u=[],h=(i=this.enableGlobalMoveEvents)!=null?i:!0;this.moveOnAll?u.push("pointermove"):this.dispatchEvent(s,"pointermove"),h&&u.push("globalpointermove"),s.pointerType==="touch"&&(this.moveOnAll?u.splice(1,0,"touchmove"):this.dispatchEvent(s,"touchmove"),h&&u.push("globaltouchmove")),o&&(this.moveOnAll?u.splice(1,0,"mousemove"):this.dispatchEvent(s,"mousemove"),h&&u.push("globalmousemove"),this.cursor=(n=s.target)==null?void 0:n.cursor),u.length>0&&this.all(s,u),this._allInteractiveElements.length=0,this._hitElements.length=0,a.overTargets=s.composedPath(),this.freeEvent(s)}mapPointerOver(e){var t;if(!(e instanceof xe))return;const i=this.trackingData(e.pointerId),n=this.createPointerEvent(e),s=n.pointerType==="mouse"||n.pointerType==="pen";this.dispatchEvent(n,"pointerover"),s&&this.dispatchEvent(n,"mouseover"),n.pointerType==="mouse"&&(this.cursor=(t=n.target)==null?void 0:t.cursor);const o=this.clonePointerEvent(n,"pointerenter");for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),s&&this.notifyTarget(o,"mouseenter"),o.target=o.target.parent;i.overTargets=n.composedPath(),this.freeEvent(n),this.freeEvent(o)}mapPointerOut(e){if(!(e instanceof xe))return;const t=this.trackingData(e.pointerId);if(t.overTargets){const i=e.pointerType==="mouse"||e.pointerType==="pen",n=this.findMountedTarget(t.overTargets),s=this.createPointerEvent(e,"pointerout",n);this.dispatchEvent(s),i&&this.dispatchEvent(s,"mouseout");const o=this.createPointerEvent(e,"pointerleave",n);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),i&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;t.overTargets=null,this.freeEvent(s),this.freeEvent(o)}this.cursor=null}mapPointerUp(e){if(!(e instanceof xe))return;const t=performance.now(),i=this.createPointerEvent(e);if(this.dispatchEvent(i,"pointerup"),i.pointerType==="touch")this.dispatchEvent(i,"touchend");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const a=i.button===2;this.dispatchEvent(i,a?"rightup":"mouseup")}const n=this.trackingData(e.pointerId),s=this.findMountedTarget(n.pressTargetsByButton[e.button]);let o=s;if(s&&!i.composedPath().includes(s)){let a=s;for(;a&&!i.composedPath().includes(a);){if(i.currentTarget=a,this.notifyTarget(i,"pointerupoutside"),i.pointerType==="touch")this.notifyTarget(i,"touchendoutside");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const l=i.button===2;this.notifyTarget(i,l?"rightupoutside":"mouseupoutside")}a=a.parent}delete n.pressTargetsByButton[e.button],o=a}if(o){const a=this.clonePointerEvent(i,"click");a.target=o,a.path=null,n.clicksByButton[e.button]||(n.clicksByButton[e.button]={clickCount:0,target:a.target,timeStamp:t});const l=n.clicksByButton[e.button];if(l.target===a.target&&t-l.timeStamp<200?++l.clickCount:l.clickCount=1,l.target=a.target,l.timeStamp=t,a.detail=l.clickCount,a.pointerType==="mouse"){const u=a.button===2;this.dispatchEvent(a,u?"rightclick":"click")}else a.pointerType==="touch"&&this.dispatchEvent(a,"tap");this.dispatchEvent(a,"pointertap"),this.freeEvent(a)}this.freeEvent(i)}mapPointerUpOutside(e){if(!(e instanceof xe))return;const t=this.trackingData(e.pointerId),i=this.findMountedTarget(t.pressTargetsByButton[e.button]),n=this.createPointerEvent(e);if(i){let s=i;for(;s;)n.currentTarget=s,this.notifyTarget(n,"pointerupoutside"),n.pointerType==="touch"?this.notifyTarget(n,"touchendoutside"):(n.pointerType==="mouse"||n.pointerType==="pen")&&this.notifyTarget(n,n.button===2?"rightupoutside":"mouseupoutside"),s=s.parent;delete t.pressTargetsByButton[e.button]}this.freeEvent(n)}mapWheel(e){if(!(e instanceof ht))return;const t=this.createWheelEvent(e);this.dispatchEvent(t),this.freeEvent(t)}findMountedTarget(e){if(!e)return null;let t=e[0];for(let i=1;i<e.length&&e[i].parent===t;i++)t=e[i];return t}createPointerEvent(e,t,i){var n;const s=this.allocateEvent(xe);return this.copyPointerData(e,s),this.copyMouseData(e,s),this.copyData(e,s),s.nativeEvent=e.nativeEvent,s.originalEvent=e,s.target=(n=i!=null?i:this.hitTest(s.global.x,s.global.y))!=null?n:this._hitElements[0],typeof t=="string"&&(s.type=t),s}createWheelEvent(e){const t=this.allocateEvent(ht);return this.copyWheelData(e,t),this.copyMouseData(e,t),this.copyData(e,t),t.nativeEvent=e.nativeEvent,t.originalEvent=e,t.target=this.hitTest(t.global.x,t.global.y),t}clonePointerEvent(e,t){const i=this.allocateEvent(xe);return i.nativeEvent=e.nativeEvent,i.originalEvent=e.originalEvent,this.copyPointerData(e,i),this.copyMouseData(e,i),this.copyData(e,i),i.target=e.target,i.path=e.composedPath().slice(),i.type=t!=null?t:i.type,i}copyWheelData(e,t){t.deltaMode=e.deltaMode,t.deltaX=e.deltaX,t.deltaY=e.deltaY,t.deltaZ=e.deltaZ}copyPointerData(e,t){e instanceof xe&&t instanceof xe&&(t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist)}copyMouseData(e,t){e instanceof ir&&t instanceof ir&&(t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.copyFrom(e.client),t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.copyFrom(e.movement),t.screen.copyFrom(e.screen),t.shiftKey=e.shiftKey,t.global.copyFrom(e.global))}copyData(e,t){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.detail=e.detail,t.view=e.view,t.which=e.which,t.layer.copyFrom(e.layer),t.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const t=this.eventPool.get(e).pop()||new e(this);return t.eventPhase=t.NONE,t.currentTarget=null,t.path=null,t.target=null,t}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const t=e.constructor;this.eventPool.has(t)||this.eventPool.set(t,[]),this.eventPool.get(t).push(e)}_notifyListeners(e,t){const i=e.currentTarget._events[t];if(i&&e.currentTarget.isInteractive())if("fn"in i)i.once&&e.currentTarget.removeListener(t,i.fn,void 0,!0),i.fn.call(i.context,e);else for(let n=0,s=i.length;n<s&&!e.propagationImmediatelyStopped;n++)i[n].once&&e.currentTarget.removeListener(t,i[n].fn,void 0,!0),i[n].fn.call(i[n].context,e)}}var Eb=Object.defineProperty,Vu=Object.getOwnPropertySymbols,Cb=Object.prototype.hasOwnProperty,Mb=Object.prototype.propertyIsEnumerable,Yu=(r,e,t)=>e in r?Eb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Bb=(r,e)=>{for(var t in e||(e={}))Cb.call(e,t)&&Yu(r,t,e[t]);if(Vu)for(var t of Vu(e))Mb.call(e,t)&&Yu(r,t,e[t]);return r};const Rb=1,kb={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},Vn=class{constructor(r){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=r,this.rootBoundary=new Wu(null),Le.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new xe(null),this._rootWheelEvent=new ht(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy(Bb({},Vn.defaultEventFeatures),{set:(e,t,i)=>(t==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=i),e[t]=i,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(r){var e,t;const{canvas:i,resolution:n}=this.renderer;this.setTargetElement(i),this.resolution=n,Vn._defaultEventMode=(e=r.eventMode)!=null?e:"passive",Object.assign(this.features,(t=r.eventFeatures)!=null?t:{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(r){this.resolution=r}destroy(){this.setTargetElement(null),this.renderer=null,this._currentCursor=null}setCursor(r){r=r||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this._currentCursor===r)return;this._currentCursor=r;const t=this.cursorStyles[r];if(t)switch(typeof t){case"string":e&&(this.domElement.style.cursor=t);break;case"function":t(r);break;case"object":e&&Object.assign(this.domElement.style,t);break}else e&&typeof r=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,r)&&(this.domElement.style.cursor=r)}get pointer(){return this._rootPointerEvent}_onPointerDown(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(r);this.autoPreventDefault&&e[0].isNormalized&&(r.cancelable||!("cancelable"in r))&&r.preventDefault();for(let t=0,i=e.length;t<i;t++){const n=e[t],s=this._bootstrapEvent(this._rootPointerEvent,n);this.rootBoundary.mapEvent(s)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(r){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,Le.pointerMoved();const e=this._normalizeToPointerData(r);for(let t=0,i=e.length;t<i;t++){const n=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=r.target;r.composedPath&&r.composedPath().length>0&&(e=r.composedPath()[0]);const t=e!==this.domElement?"outside":"",i=this._normalizeToPointerData(r);for(let n=0,s=i.length;n<s;n++){const o=this._bootstrapEvent(this._rootPointerEvent,i[n]);o.type+=t,this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(r){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(r);for(let t=0,i=e.length;t<i;t++){const n=this._bootstrapEvent(this._rootPointerEvent,e[t]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}onWheel(r){if(!this.features.wheel)return;const e=this.normalizeWheelEvent(r);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}setTargetElement(r){this._removeEvents(),this.domElement=r,Le.domElement=r,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;Le.addTickerListener();const r=this.domElement.style;r&&(globalThis.navigator.msPointerEnabled?(r.msContentZooming="none",r.msTouchAction="none"):this.supportsPointerEvents&&(r.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;Le.removeTickerListener();const r=this.domElement.style;globalThis.navigator.msPointerEnabled?(r.msContentZooming="",r.msTouchAction=""):this.supportsPointerEvents&&(r.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(r,e,t){const i=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},n=1/this.resolution;r.x=(e-i.left)*(this.domElement.width/i.width)*n,r.y=(t-i.top)*(this.domElement.height/i.height)*n}_normalizeToPointerData(r){const e=[];if(this.supportsTouchEvents&&r instanceof TouchEvent)for(let t=0,i=r.changedTouches.length;t<i;t++){const n=r.changedTouches[t];typeof n.button=="undefined"&&(n.button=0),typeof n.buttons=="undefined"&&(n.buttons=1),typeof n.isPrimary=="undefined"&&(n.isPrimary=r.touches.length===1&&r.type==="touchstart"),typeof n.width=="undefined"&&(n.width=n.radiusX||1),typeof n.height=="undefined"&&(n.height=n.radiusY||1),typeof n.tiltX=="undefined"&&(n.tiltX=0),typeof n.tiltY=="undefined"&&(n.tiltY=0),typeof n.pointerType=="undefined"&&(n.pointerType="touch"),typeof n.pointerId=="undefined"&&(n.pointerId=n.identifier||0),typeof n.pressure=="undefined"&&(n.pressure=n.force||.5),typeof n.twist=="undefined"&&(n.twist=0),typeof n.tangentialPressure=="undefined"&&(n.tangentialPressure=0),typeof n.layerX=="undefined"&&(n.layerX=n.offsetX=n.clientX),typeof n.layerY=="undefined"&&(n.layerY=n.offsetY=n.clientY),n.isNormalized=!0,n.type=r.type,e.push(n)}else if(!globalThis.MouseEvent||r instanceof MouseEvent&&(!this.supportsPointerEvents||!(r instanceof globalThis.PointerEvent))){const t=r;typeof t.isPrimary=="undefined"&&(t.isPrimary=!0),typeof t.width=="undefined"&&(t.width=1),typeof t.height=="undefined"&&(t.height=1),typeof t.tiltX=="undefined"&&(t.tiltX=0),typeof t.tiltY=="undefined"&&(t.tiltY=0),typeof t.pointerType=="undefined"&&(t.pointerType="mouse"),typeof t.pointerId=="undefined"&&(t.pointerId=Rb),typeof t.pressure=="undefined"&&(t.pressure=.5),typeof t.twist=="undefined"&&(t.twist=0),typeof t.tangentialPressure=="undefined"&&(t.tangentialPressure=0),t.isNormalized=!0,e.push(t)}else e.push(r);return e}normalizeWheelEvent(r){const e=this._rootWheelEvent;return this._transferMouseData(e,r),e.deltaX=r.deltaX,e.deltaY=r.deltaY,e.deltaZ=r.deltaZ,e.deltaMode=r.deltaMode,this.mapPositionToPoint(e.screen,r.clientX,r.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=r,e.type=r.type,e}_bootstrapEvent(r,e){return r.originalEvent=null,r.nativeEvent=e,r.pointerId=e.pointerId,r.width=e.width,r.height=e.height,r.isPrimary=e.isPrimary,r.pointerType=e.pointerType,r.pressure=e.pressure,r.tangentialPressure=e.tangentialPressure,r.tiltX=e.tiltX,r.tiltY=e.tiltY,r.twist=e.twist,this._transferMouseData(r,e),this.mapPositionToPoint(r.screen,e.clientX,e.clientY),r.global.copyFrom(r.screen),r.offset.copyFrom(r.screen),r.isTrusted=e.isTrusted,r.type==="pointerleave"&&(r.type="pointerout"),r.type.startsWith("mouse")&&(r.type=r.type.replace("mouse","pointer")),r.type.startsWith("touch")&&(r.type=kb[r.type]||r.type),r}_transferMouseData(r,e){r.isTrusted=e.isTrusted,r.srcElement=e.srcElement,r.timeStamp=performance.now(),r.type=e.type,r.altKey=e.altKey,r.button=e.button,r.buttons=e.buttons,r.client.x=e.clientX,r.client.y=e.clientY,r.ctrlKey=e.ctrlKey,r.metaKey=e.metaKey,r.movement.x=e.movementX,r.movement.y=e.movementY,r.page.x=e.pageX,r.page.y=e.pageY,r.relatedTarget=null,r.shiftKey=e.shiftKey}};let sr=Vn;sr.extension={name:"events",type:[y.WebGLSystem,y.CanvasSystem,y.WebGPUSystem],priority:-1},sr.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};const Xu={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(r){this.eventMode=r?"static":"passive"},_internalEventMode:void 0,get eventMode(){var r;return(r=this._internalEventMode)!=null?r:sr.defaultEventMode},set eventMode(r){this._internalEventMode=r},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(r,e,t){const i=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,n=typeof e=="function"?void 0:e;r=i?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.on(r,e,n)},removeEventListener(r,e,t){const i=typeof t=="boolean"&&t||typeof t=="object"&&t.capture,n=typeof e=="function"?void 0:e;r=i?`${r}capture`:r,e=typeof e=="function"?e:e.handleEvent,this.off(r,e,n)},dispatchEvent(r){if(!(r instanceof $t))throw new Error("Container cannot propagate events outside of the Federated Events API");return r.defaultPrevented=!1,r.path=null,r.target=this,r.manager.dispatchEvent(r),!r.defaultPrevented}};Z.add(sr),V.mixin(Xu);const or=class{constructor(r,e){this.linkedSheets=[],this._texture=r instanceof A?r:null,this.textureSource=r.source,this.textures={},this.animations={},this.data=e;const t=parseFloat(e.meta.scale);t?(this.resolution=t,r.source.resolution=this.resolution):this.resolution=r.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(r=>{this._callback=r,this._batchIndex=0,this._frameKeys.length<=or.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(r){let e=r;const t=or.BATCH_SIZE;for(;e-r<t&&e<this._frameKeys.length;){const i=this._frameKeys[e],n=this._frames[i],s=n.frame;if(s){let o=null,a=null;const l=n.trimmed!==!1&&n.sourceSize?n.sourceSize:n.frame,u=new K(0,0,Math.floor(l.w)/this.resolution,Math.floor(l.h)/this.resolution);n.rotated?o=new K(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.h)/this.resolution,Math.floor(s.w)/this.resolution):o=new K(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),n.trimmed!==!1&&n.spriteSourceSize&&(a=new K(Math.floor(n.spriteSourceSize.x)/this.resolution,Math.floor(n.spriteSourceSize.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),a.x/=this.textureSource.width,a.y/=this.textureSource.height,a.width/=this.textureSource.width,a.height/=this.textureSource.height),o.x/=this.textureSource.width,o.y/=this.textureSource.height,o.width/=this.textureSource.width,o.height/=this.textureSource.height,u.x/=this.textureSource.width,u.y/=this.textureSource.height,u.width/=this.textureSource.width,u.height/=this.textureSource.height,this.textures[i]=new A({source:this.textureSource,layout:{frame:o,orig:u,trim:a,rotate:n.rotated?2:0,defaultAnchor:n.anchor,defaultBorders:n.borders},label:i.toString()})}e++}}_processAnimations(){const r=this.data.animations||{};for(const e in r){this.animations[e]=[];for(let t=0;t<r[e].length;t++){const i=r[e][t];this.animations[e].push(this.textures[i])}}}_parseComplete(){const r=this._callback;this._callback=null,this._batchIndex=0,r.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*or.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*or.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(r=!1){var e;for(const t in this.textures)this.textures[t].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,r&&((e=this._texture)==null||e.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};let Jr=or;Jr.BATCH_SIZE=1e3;const Ob=["jpg","png","jpeg","avif","webp"];function qu(r,e,t){const i={};if(r.forEach(n=>{i[n]=e}),Object.keys(e.textures).forEach(n=>{i[n]=e.textures[n]}),!t){const n=de.dirname(r[0]);e.linkedSheets.forEach((s,o)=>{const a=qu([`${n}/${e.data.meta.related_multi_packs[o]}`],s,!0);Object.assign(i,a)})}return i}const Ku={extension:y.Asset,cache:{test:r=>r instanceof Jr,getCacheableAssets:(r,e)=>qu(r,e,!1)},resolver:{test:r=>{const e=r.split("?")[0].split("."),t=e.pop(),i=e.pop();return t==="json"&&Ob.includes(i)},parse:r=>{var e,t;const i=r.split(".");return{resolution:parseFloat((t=(e=D.RETINA_PREFIX.exec(r))==null?void 0:e[1])!=null?t:"1"),format:i[i.length-2],src:r}}},loader:{name:"spritesheetLoader",extension:{type:y.LoadParser,priority:Ge.Normal},async testParse(r,e){return de.extname(e.src).toLowerCase()===".json"&&!!r.frames},async parse(r,e,t){var i,n;let s=de.dirname(e.src);s&&s.lastIndexOf("/")!==s.length-1&&(s+="/");let o=s+r.meta.image;o=Hr(o,e.src);const a=(await t.load([o]))[o],l=new Jr(a.source,r);await l.parse();const u=(i=r==null?void 0:r.meta)==null?void 0:i.related_multi_packs;if(Array.isArray(u)){const h=[];for(const p of u){if(typeof p!="string")continue;let d=s+p;(n=e.data)!=null&&n.ignoreMultiPack||(d=Hr(d,e.src),h.push(t.load({src:d,data:{ignoreMultiPack:!0}})))}const c=await Promise.all(h);l.linkedSheets=c,c.forEach(p=>{p.linkedSheets=[l].concat(l.linkedSheets.filter(d=>d!==p))})}return l},unload(r){r.destroy(!0)}}};Z.add(Ku);const Tt={onViewUpdate:()=>{}};function ar(r,e,t,i){const n=t._source,s=t.layout,o=s.orig,a=s.trim,l=n.width,u=n.height,h=l*o.width,c=u*o.height;if(a){const p=l*a.width,d=u*a.height;r[0]=a.x*l-e._x*h-i,r[1]=r[0]+p,r[2]=a.y*u-e._y*c-i,r[3]=r[2]+d}else r[0]=-e._x*h-i,r[1]=r[0]+h,r[2]=-e._y*c-i,r[3]=r[2]+c}class Zu{constructor(e){this.renderPipeId="sprite",this.owner=Tt,this.uid=X("spriteView"),this.batched=!0,this._didUpdate=!1,this._bounds=[0,1,0,0],this._sourceBounds=[0,1,0,0],this._boundsDirty=!0,this._sourceBoundsDirty=!0,this.roundPixels=0;var t,i;this.anchor=new se(this,((t=e.layout.defaultAnchor)==null?void 0:t.x)||0,((i=e.layout.defaultAnchor)==null?void 0:i.y)||0),this.texture=e}set texture(e){e||(e=A.EMPTY),this._texture!==e&&(this._texture&&this._texture.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._texture=e,this.onUpdate())}get texture(){return this._texture}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}get sourceBounds(){return this._sourceBoundsDirty&&(this._updateSourceBounds(),this._sourceBoundsDirty=!1),this._sourceBounds}containsPoint(e){const t=this._texture.frameWidth,i=this._texture.frameHeight,n=-t*this.anchor.x;let s=0;return e.x>=n&&e.x<n+t&&(s=-i*this.anchor.y,e.y>=s&&e.y<s+i)}addBounds(e){if(this._texture._layout.trim){const t=this.sourceBounds;e.addFrame(t[0],t[2],t[1],t[3])}else{const t=this.bounds;e.addFrame(t[0],t[2],t[1],t[3])}}onUpdate(){this._didUpdate=!0,this._sourceBoundsDirty=this._boundsDirty=!0,this.owner.onViewUpdate()}_updateBounds(){ar(this._bounds,this.anchor,this._texture,0)}_updateSourceBounds(){const e=this.anchor,t=this._texture,i=t._source,n=t.layout.orig,s=this._sourceBounds,o=i.width*n.width,a=i.height*n.height;s[1]=-e._x*o,s[0]=s[1]+o,s[3]=-e._y*a,s[2]=s[3]+a}destroy(e=!1){if(this.anchor=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._bounds=null,this._sourceBounds=null}}var Fb=Object.defineProperty,ei=Object.getOwnPropertySymbols,Qu=Object.prototype.hasOwnProperty,Ju=Object.prototype.propertyIsEnumerable,eh=(r,e,t)=>e in r?Fb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ub=(r,e)=>{for(var t in e||(e={}))Qu.call(e,t)&&eh(r,t,e[t]);if(ei)for(var t of ei(e))Ju.call(e,t)&&eh(r,t,e[t]);return r},Ib=(r,e)=>{var t={};for(var i in r)Qu.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&ei)for(var i of ei(r))e.indexOf(i)<0&&Ju.call(r,i)&&(t[i]=r[i]);return t};class Oe extends V{static from(e){return typeof e=="string"?new Oe(ie.get(e)):new Oe(e)}constructor(e=A.EMPTY){e instanceof A&&(e={texture:e});const t=e,{texture:i}=t,n=Ib(t,["texture"]);super(Ub({view:new Zu(i!=null?i:A.EMPTY),label:"Sprite"},n)),this.allowChildren=!1}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}const Gb=new pe;function ti(r,e,t){const i=Gb;r.measurable=!0,Yt(r,t,i),e.addBoundsMask(i),r.measurable=!1}function ri(r,e,t){const i=new pe;r.measurable=!0;const n=Yn(r,t,new k);He(r,i,n),r.measurable=!1,e.addBoundsMask(i)}function Yn(r,e,t){return r&&r!==e&&(Yn(r.parent,e,t),r.didChange&&Ue(r.localTransform,r),t.append(r.localTransform)),t}class Xn{constructor(e){this.priority=0,this.pipe="alphaMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof Oe),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(e,t){ti(this.mask,e,t)}addLocalBounds(e,t){ri(this.mask,e,t)}containsPoint(e,t){const i=this.mask;return t(i,e)}destroy(){this.reset()}static test(e){return e instanceof Oe}}Xn.extension=y.MaskEffect;class qn{constructor(e){this.priority=0,this.pipe="colorMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}qn.extension=y.MaskEffect;class Kn{constructor(e){this.priority=0,this.pipe="stencilMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(e,t){ti(this.mask,e,t)}addLocalBounds(e,t){ri(this.mask,e,t)}containsPoint(e,t){const i=this.mask;return t(i,e)}destroy(){this.reset()}static test(e){return e instanceof V}}Kn.extension=y.MaskEffect,Z.add(Xn,qn,Kn);var $b={__proto__:null};let Zn;function Lb(){return typeof Zn=="undefined"&&(Zn=function(){var r;const e={stencil:!0,failIfMajorPerformanceCaveat:D.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT};try{if(!D.ADAPTER.getWebGLRenderingContext())return!1;let t=D.ADAPTER.createCanvas().getContext("webgl2",e);const i=!!((r=t==null?void 0:t.getContextAttributes())!=null&&r.stencil);if(t){const n=t.getExtension("WEBGL_lose_context");n&&n.loseContext()}return t=null,i}catch(t){return!1}}()),Zn}async function Db(r={}){if(!D.ADAPTER.getNavigator().gpu)return!1;try{return await(await navigator.gpu.requestAdapter(r)).requestDevice(),!0}catch(e){return!1}}var zb=Object.defineProperty,th=Object.getOwnPropertySymbols,Nb=Object.prototype.hasOwnProperty,Hb=Object.prototype.propertyIsEnumerable,rh=(r,e,t)=>e in r?zb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,lr=(r,e)=>{for(var t in e||(e={}))Nb.call(e,t)&&rh(r,t,e[t]);if(th)for(var t of th(e))Hb.call(e,t)&&rh(r,t,e[t]);return r};const ih=["webgpu","webgl","canvas"];async function nh(r){var e;let t=[];r.preference?(t.push(r.preference),ih.forEach(o=>{o!==r.preference&&t.push(o)})):t=ih.slice();let i;((e=r.manageImports)==null||e)&&await Promise.resolve().then(function(){return $b});let n={};for(let o=0;o<t.length;o++){const a=t[o];if(a==="webgpu"&&await Db()){const{WebGPURenderer:l}=await Promise.resolve().then(function(){return Z_});i=l,n=lr(lr({},r),r.webgpu);break}else if(a==="webgl"&&Lb()){const{WebGLRenderer:l}=await Promise.resolve().then(function(){return D_});i=l,n=lr(lr({},r),r.webgl);break}else if(a==="canvas"){n=lr({},r);break}}delete n.webgpu,delete n.webgl;const s=new i;return await s.init(n),s}var jb=Object.defineProperty,sh=Object.getOwnPropertySymbols,Wb=Object.prototype.hasOwnProperty,Vb=Object.prototype.propertyIsEnumerable,oh=(r,e,t)=>e in r?jb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Yb=(r,e)=>{for(var t in e||(e={}))Wb.call(e,t)&&oh(r,t,e[t]);if(sh)for(var t of sh(e))Vb.call(e,t)&&oh(r,t,e[t]);return r};const Qn=class{constructor(){this.stage=new V}async init(r){r=Yb({},r),this.renderer=await nh(r),Qn._plugins.forEach(e=>{e.init.call(this,r)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get screen(){return this.renderer.screen}destroy(r=!1){const e=Qn._plugins.slice(0);e.reverse(),e.forEach(t=>{t.destroy.call(this)}),this.stage.destroy(r),this.stage=null,this.renderer.destroy(r),this.renderer=null}};let Jn=Qn;Jn._plugins=[],Z.handleByList(y.Application,Jn._plugins);class ah{constructor(e,t=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=t}add(e){e.forEach(t=>{this._assetList.push(t)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],t=Math.min(this._assetList.length,this._maxConcurrent);for(let i=0;i<t;i++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}const ur=r=>!Array.isArray(r);var Xb=Object.defineProperty,qb=Object.defineProperties,Kb=Object.getOwnPropertyDescriptors,lh=Object.getOwnPropertySymbols,Zb=Object.prototype.hasOwnProperty,Qb=Object.prototype.propertyIsEnumerable,uh=(r,e,t)=>e in r?Xb(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Jb=(r,e)=>{for(var t in e||(e={}))Zb.call(e,t)&&uh(r,t,e[t]);if(lh)for(var t of lh(e))Qb.call(e,t)&&uh(r,t,e[t]);return r},ev=(r,e)=>qb(r,Kb(e));class hh{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,t,i)=>(this._parsersValidated=!1,e[t]=i,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,t){const i={promise:null,parser:null};return i.promise=(async()=>{var n,s;let o=null,a=null;if(t.loadParser&&(a=this._parserHash[t.loadParser]),!a){for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];if(u.load&&(n=u.test)!=null&&n.call(u,e,t,this)){a=u;break}}if(!a)return null}o=await a.load(e,t,this),i.parser=a;for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];u.parse&&u.parse&&await((s=u.testParse)==null?void 0:s.call(u,o,t,this))&&(o=await u.parse(o,t,this)||o,i.parser=u)}return o})(),i}async load(e,t){this._parsersValidated||this._validateParsers();let i=0;const n={},s=ur(e),o=ye(e,u=>({alias:[u],src:u})),a=o.length,l=o.map(async u=>{const h=de.toAbsolute(u.src);if(!n[u.src])try{this.promiseCache[h]||(this.promiseCache[h]=this._getLoadPromiseAndParser(h,u)),n[u.src]=await this.promiseCache[h].promise,t&&t(++i/a)}catch(c){throw delete this.promiseCache[h],delete n[u.src],new Error(`[Loader.load] Failed to load ${h}.
${c}`)}});return await Promise.all(l),s?n[o[0].src]:n}async unload(e){const t=ye(e,i=>({alias:[i],src:i})).map(async i=>{var n,s;const o=de.toAbsolute(i.src),a=this.promiseCache[o];if(a){const l=await a.promise;delete this.promiseCache[o],(s=(n=a.parser)==null?void 0:n.unload)==null||s.call(n,l,i,this)}});await Promise.all(t)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name).reduce((e,t)=>(t.name&&e[t.name],ev(Jb({},e),{[t.name]:t})),{})}}function ch(r,e,t,i,n){const s=e[t];for(let o=0;o<s.length;o++){const a=s[o];t<e.length-1?ch(r.replace(i[t],a),e,t+1,i,n):n.push(r.replace(i[t],a))}}function dh(r){const e=/\{(.*?)\}/g,t=r.match(e),i=[];if(t){const n=[];t.forEach(s=>{const o=s.substring(1,s.length-1).split(",");n.push(o)}),ch(r,n,0,t,i)}else i.push(r);return i}var tv=Object.defineProperty,rv=Object.defineProperties,iv=Object.getOwnPropertyDescriptors,ph=Object.getOwnPropertySymbols,nv=Object.prototype.hasOwnProperty,sv=Object.prototype.propertyIsEnumerable,fh=(r,e,t)=>e in r?tv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,St=(r,e)=>{for(var t in e||(e={}))nv.call(e,t)&&fh(r,t,e[t]);if(ph)for(var t of ph(e))sv.call(e,t)&&fh(r,t,e[t]);return r},gh=(r,e)=>rv(r,iv(e));class mh{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,t)=>`${e}${this._bundleIdConnector}${t}`,extractAssetIdFromBundle:(e,t)=>t.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){var t,i,n;if(this._bundleIdConnector=(t=e.connector)!=null?t:this._bundleIdConnector,this._createBundleAssetId=(i=e.createBundleAssetId)!=null?i:this._createBundleAssetId,this._extractAssetIdFromBundle=(n=e.extractAssetIdFromBundle)!=null?n:this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(t=>{this._preferredOrder.push(t),t.priority||(t.priority=Object.keys(t.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const t=e;this._defaultSearchParams=Object.keys(t).map(i=>`${encodeURIComponent(i)}=${encodeURIComponent(t[i])}`).join("&")}}getAlias(e){const{alias:t,name:i,src:n,srcs:s}=e;return ye(t||i||n||s,o=>{var a;return typeof o=="string"?o:Array.isArray(o)?o.map(l=>{var u,h;return(h=(u=l==null?void 0:l.src)!=null?u:l==null?void 0:l.srcs)!=null?h:l}):o!=null&&o.src||o!=null&&o.srcs?(a=o.src)!=null?a:o.srcs:o},!0)}addManifest(e){this._manifest,this._manifest=e,e.bundles.forEach(t=>{this.addBundle(t.name,t.assets)})}addBundle(e,t){const i=[];Array.isArray(t)?t.forEach(n=>{var s,o;const a=(s=n.src)!=null?s:n.srcs,l=(o=n.alias)!=null?o:n.name;let u;if(typeof l=="string"){const h=this._createBundleAssetId(e,l);i.push(h),u=[l,h]}else{const h=l.map(c=>this._createBundleAssetId(e,c));i.push(...h),u=[...l,...h]}this.add(gh(St({},n),{alias:u,src:a}))}):Object.keys(t).forEach(n=>{var s;const o=[n,this._createBundleAssetId(e,n)];if(typeof t[n]=="string")this.add({alias:o,src:t[n]});else if(Array.isArray(t[n]))this.add({alias:o,src:t[n]});else{const a=t[n],l=(s=a.src)!=null?s:a.srcs;this.add(gh(St({},a),{alias:o,src:Array.isArray(l)?l:[l]}))}i.push(...o)}),this._bundles[e]=i}add(e){const t=[];Array.isArray(e)?t.push(...e):t.push(e);let i;ye(t).forEach(n=>{const{src:s,srcs:o}=n;let{data:a,format:l,loadParser:u}=n;const h=ye(s||o).map(d=>typeof d=="string"?dh(d):Array.isArray(d)?d:[d]),c=this.getAlias(n),p=[];h.forEach(d=>{d.forEach(f=>{var m,g,x;let b={};if(typeof f!="object"){b.src=f;for(let v=0;v<this._parsers.length;v++){const _=this._parsers[v];if(_.test(f)){b=_.parse(f);break}}}else a=(m=f.data)!=null?m:a,l=(g=f.format)!=null?g:l,u=(x=f.loadParser)!=null?x:u,b=St(St({},b),f);if(!c)throw new Error(`[Resolver] alias is undefined for this asset: ${b.src}`);b=this._buildResolvedAsset(b,{aliases:c,data:a,format:l,loadParser:u}),p.push(b)})}),c.forEach(d=>{this._assetMap[d]=p})})}resolveBundle(e){const t=ur(e);e=ye(e);const i={};return e.forEach(n=>{const s=this._bundles[n];if(s){const o=this.resolve(s),a={};for(const l in o){const u=o[l];a[this._extractAssetIdFromBundle(n,l)]=u}i[n]=a}}),t?i[e[0]]:i}resolveUrl(e){const t=this.resolve(e);if(typeof e!="string"){const i={};for(const n in t)i[n]=t[n].src;return i}return t.src}resolve(e){const t=ur(e);e=ye(e);const i={};return e.forEach(n=>{var s;if(!this._resolverHash[n])if(this._assetMap[n]){let o=this._assetMap[n];const a=o[0],l=this._getPreferredOrder(o);l==null||l.priority.forEach(u=>{l.params[u].forEach(h=>{const c=o.filter(p=>p[u]?p[u]===h:!1);c.length&&(o=c)})}),this._resolverHash[n]=(s=o[0])!=null?s:a}else this._resolverHash[n]=this._buildResolvedAsset({alias:[n],src:n},{});i[n]=this._resolverHash[n]}),t?i[e[0]]:i}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let t=0;t<e.length;t++){const i=e[0],n=this._preferredOrder.find(s=>s.params.format.includes(i.format));if(n)return n}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const t=/\?/.test(e)?"&":"?";return`${e}${t}${this._defaultSearchParams}`}_buildResolvedAsset(e,t){var i;const{aliases:n,data:s,loadParser:o,format:a}=t;return(this._basePath||this._rootPath)&&(e.src=de.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=(i=n!=null?n:e.alias)!=null?i:[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data=St(St({},s||{}),e.data),e.loadParser=o!=null?o:e.loadParser,e.format=a!=null?a:e.src.split(".").pop(),e.srcs=e.src,e.name=e.alias,e}}class bh{constructor(){this._detections=[],this._initialized=!1,this.resolver=new mh,this.loader=new hh,this.cache=ie,this._backgroundLoader=new ah(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){var t,i,n;if(this._initialized)return;if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let l=e.manifest;typeof l=="string"&&(l=await this.load(l)),this.resolver.addManifest(l)}const s=(i=(t=e.texturePreference)==null?void 0:t.resolution)!=null?i:1,o=typeof s=="number"?[s]:s,a=await this._detectFormats({preferredFormats:(n=e.texturePreference)==null?void 0:n.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:a,resolution:o}}),e.preferences&&this.setPreferences(e.preferences)}add(e){this.resolver.add(e)}async load(e,t){this._initialized||await this.init();const i=ur(e),n=ye(e).map(a=>{if(typeof a!="string"){const l=this.resolver.getAlias(a);return l.some(u=>!this.resolver.hasKey(u))&&this.add(a),Array.isArray(l)?l[0]:l}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),s=this.resolver.resolve(n),o=await this._mapLoadToResolve(s,t);return i?o[n[0]]:o}addBundle(e,t){this.resolver.addBundle(e,t)}async loadBundle(e,t){this._initialized||await this.init();let i=!1;typeof e=="string"&&(i=!0,e=[e]);const n=this.resolver.resolveBundle(e),s={},o=Object.keys(n);let a=0,l=0;const u=()=>{t==null||t(++a/l)},h=o.map(c=>{const p=n[c];return l+=Object.keys(p).length,this._mapLoadToResolve(p,u).then(d=>{s[c]=d})});return await Promise.all(h),i?s[e[0]]:s}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(t))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const t=this.resolver.resolveBundle(e);Object.values(t).forEach(i=>{this._backgroundLoader.add(Object.values(i))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return ie.get(e);const t={};for(let i=0;i<e.length;i++)t[i]=ie.get(e[i]);return t}async _mapLoadToResolve(e,t){const i=Object.values(e),n=Object.keys(e);this._backgroundLoader.active=!1;const s=await this.loader.load(i,t);this._backgroundLoader.active=!0;const o={};return i.forEach((a,l)=>{const u=s[a.src],h=[a.src];a.alias&&h.push(...a.alias),o[n[l]]=u,ie.set(h,u)}),o}async unload(e){this._initialized||await this.init();const t=ye(e).map(n=>typeof n!="string"?n.src:n),i=this.resolver.resolve(t);await this._unloadFromResolved(i)}async unloadBundle(e){this._initialized||await this.init(),e=ye(e);const t=this.resolver.resolveBundle(e),i=Object.keys(t).map(n=>this._unloadFromResolved(t[n]));await Promise.all(i)}async _unloadFromResolved(e){const t=Object.values(e);t.forEach(i=>{ie.remove(i.src)}),await this.loader.unload(t)}async _detectFormats(e){let t=[];e.preferredFormats&&(t=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(const i of e.detections)e.skipDetections||await i.test()?t=await i.add(t):e.skipDetections||(t=await i.remove(t));return t=t.filter((i,n)=>t.indexOf(i)===n),t}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(t=>{t.config&&Object.keys(t.config).filter(i=>i in e).forEach(i=>{t.config[i]=e[i]})})}}const hr=new bh;Z.handleByList(y.LoadParser,hr.loader.parsers).handleByList(y.ResolveParser,hr.resolver.parsers).handleByList(y.CacheParser,hr.cache.parsers).handleByList(y.DetectionParser,hr.detections);function vh(r,e,t){const i=t?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(r.substring(0,9)!=="precision"){let n=t?e.requestedFragmentPrecision:e.requestedVertexPrecision;if(n==="highp"&&i!=="highp"&&(n="mediump"),r.substring(0,8)!=="#version")return`precision ${n} float;
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}precision ${n} float;
${r.substring(s+1)}`}else if(i!=="highp"&&r.substring(0,15)==="precision highp")return r.replace("precision highp","precision mediump");return r}const yh={};let cr=yh;function xh(){return(cr===yh||cr!=null&&cr.isContextLost())&&(cr=D.ADAPTER.createCanvas().getContext("webgl2",{})),cr}let ii;function _h(){if(!ii){ii="mediump";const r=xh();r&&r.getShaderPrecisionFormat&&(ii=r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision?"highp":"mediump")}return ii}const ov={},av={};function wh(r,{name:e="pixi-program"},t=!0){e=e.replace(/\s+/g,"-"),e+=t?"-fragment":"-vertex";const i=t?ov:av;if(i[e]?(i[e]++,e+=`-${i[e]}`):i[e]=1,r.indexOf("#define SHADER_NAME")!==-1)return r;const n=`#define SHADER_NAME ${e}`;if(r.substring(0,8)!=="#version")return`${n}
${r}`;const s=r.indexOf(`
`);return`${r.substring(0,s+1)}${n}
${r.substring(s+1)}`}function Th(r,{version:e="300 es"}){return r.substring(0,8)==="#version"?r:`#version ${e}
${r}`}var lv=Object.defineProperty,Sh=Object.getOwnPropertySymbols,uv=Object.prototype.hasOwnProperty,hv=Object.prototype.propertyIsEnumerable,Ph=(r,e,t)=>e in r?lv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ah=(r,e)=>{for(var t in e||(e={}))uv.call(e,t)&&Ph(r,t,e[t]);if(Sh)for(var t of Sh(e))hv.call(e,t)&&Ph(r,t,e[t]);return r};const es={ensurePrecision:vh,setProgramName:wh,setProgramVersion:Th},Pt=class{constructor(r){r=Ah(Ah({},Pt.defaultOptions),r);const e={ensurePrecision:{requestedFragmentPrecision:r.preferredFragmentPrecision,requestedVertexPrecision:r.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:_h()},setProgramName:{name:r.name},setProgramVersion:{version:"300 es"}};let t=r.fragment,i=r.vertex;Object.keys(es).forEach(n=>{var s;const o=(s=e[n])!=null?s:{};t=es[n](t,o,!0),i=es[n](i,o,!1)}),this.fragment=t,this.vertex=i,this.key=`${this.vertex}:${this.fragment}`}destroy(){this.fragment=null,this.vertex=null,this.attributeData=null,this.uniformData=null,this.uniformBlockData=null,this.transformFeedbackVaryings=null}static from(r){const e=`${r.vertex}:${r.fragment}`;return Pt.programCached[e]||(Pt.programCached[e]=new Pt(r)),Pt.programCached[e]}};let _e=Pt;_e.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"},_e.programCached=Object.create(null);function ni(r){var e,t,i;const n=new RegExp("(?<!\\/\\/.*)@(group|binding)\\(\\d+\\)[^;]+;","g"),s=/@group\((\d+)\)/,o=/@binding\((\d+)\)/,a=/var(<[^>]+>)? (\w+)/,l=/:\s*(\w+)/,u=/struct\s+(\w+)\s*{([^}]+)}/g,h=/(\w+)\s*:\s*([\w\<\>]+)/g,c=/struct\s+(\w+)/,p=(e=r.match(n))==null?void 0:e.map(f=>({group:parseInt(f.match(s)[1],10),binding:parseInt(f.match(o)[1],10),name:f.match(a)[2],isUniform:f.match(a)[1]==="<uniform>",type:f.match(l)[1]}));if(!p)return{groups:[],structs:[]};const d=(i=(t=r.match(u))==null?void 0:t.map(f=>{const m=f.match(c)[1],g=f.match(h).reduce((x,b)=>{const[v,_]=b.split(":");return x[v.trim()]=_.trim(),x},{});return g?{name:m,members:g}:null}).filter(({name:f})=>p.some(m=>m.type===f)))!=null?i:[];return{groups:p,structs:d}}var At=(r=>(r[r.VERTEX=1]="VERTEX",r[r.FRAGMENT=2]="FRAGMENT",r[r.COMPUTE=4]="COMPUTE",r))(At||{});function Eh({groups:r}){const e=[];for(let t=0;t<r.length;t++){const i=r[t];e[i.group]||(e[i.group]=[]),i.isUniform?e[i.group].push({binding:i.binding,visibility:At.VERTEX|At.FRAGMENT,buffer:{type:"uniform"}}):i.type==="sampler"?e[i.group].push({binding:i.binding,visibility:At.FRAGMENT,sampler:{type:"filtering"}}):i.type==="texture_2d"&&e[i.group].push({binding:i.binding,visibility:At.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function Ch({groups:r}){const e=[];for(let t=0;t<r.length;t++){const i=r[t];e[i.group]||(e[i.group]={}),e[i.group][i.name]=i.binding}return e}function Mh(r,e){const t=new Set,i=new Set,n=[...r.structs,...e.structs].filter(o=>t.has(o.name)?!1:(t.add(o.name),!0)),s=[...r.groups,...e.groups].filter(o=>{const a=`${o.name}-${o.binding}`;return i.has(a)?!1:(i.add(a),!0)});return{structs:n,groups:s}}const dr=class{constructor({fragment:r,vertex:e,layout:t,gpuLayout:i,name:n}){if(this._layoutKey=0,this.name=n,this.fragment=r,this.vertex=e,r.source===e.source){const s=ni(r.source);this.structsAndGroups=s}else{const s=ni(e.source),o=ni(r.source);this.structsAndGroups=Mh(s,o)}this.layout=t!=null?t:Ch(this.structsAndGroups),this.gpuLayout=i!=null?i:Eh(this.structsAndGroups)}destroy(){this._gpuLayout=null,this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(r){const e=`${r.vertex.source}:${r.fragment.source}:${r.fragment.entryPoint}:${r.vertex.entryPoint}`;return dr.programCached[e]||(dr.programCached[e]=new dr(r)),dr.programCached[e]}};let Ae=dr;Ae.programCached=Object.create(null);function Bh(r,e){switch(r){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}var cv=Object.defineProperty,Rh=Object.getOwnPropertySymbols,dv=Object.prototype.hasOwnProperty,pv=Object.prototype.propertyIsEnumerable,kh=(r,e,t)=>e in r?cv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Oh=(r,e)=>{for(var t in e||(e={}))dv.call(e,t)&&kh(r,t,e[t]);if(Rh)for(var t of Rh(e))pv.call(e,t)&&kh(r,t,e[t]);return r};const Fh=class{constructor(r,e){this.touched=0,this.uid=X("uniform"),this.resourceType="uniformGroup",this.resourceId=this.uid,this.isUniformGroup=!0,this.dirtyId=0;var t,i;e=Oh(Oh({},Fh.DEFAULT),e),this.uniformStructures=r;const n={};for(const s in r){const o=r[s];o.name=s,o.size=(t=o.size)!=null?t:1,(i=o.value)!=null||(o.value=Bh(o.type,o.size)),n[s]=o.value}this.uniforms=n,this.dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this.signature=Object.keys(n).map(s=>`${s}-${r[s].type}`).join("-")}update(){this.dirtyId++}};let te=Fh;te.DEFAULT={ubo:!1,isStatic:!1};class Be{constructor(e){this.resources=Object.create(null),this._dirty=!0;let t=0;for(const i in e){const n=e[i];this.setResource(n,t++)}this.updateKey()}update(){this.updateKey()}updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let t=0;for(const i in this.resources)e[t++]=this.resources[i].resourceId;this.key=e.join("|")}setResource(e,t){var i,n;const s=this.resources[t];e!==s&&(s&&((i=e.off)==null||i.call(e,"change",this.onResourceChange,this)),(n=e.on)==null||n.call(e,"change",this.onResourceChange,this),this.resources[t]=e,this._dirty=!0)}getResource(e){return this.resources[e]}touch(e){const t=this.resources;for(const i in t)t[i].touched=e}destroy(){var e;const t=this.resources;for(const i in t){const n=t[i];(e=n.off)==null||e.call(n,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(){this._dirty=!0,this.update()}}var Re=(r=>(r[r.WEBGL=1]="WEBGL",r[r.WEBGPU=2]="WEBGPU",r))(Re||{});class Ee extends he{constructor({gpuProgram:e,glProgram:t,groups:i,resources:n,groupMap:s,compatibleRenderers:o}){super(),this.uniformBindMap=Object.create(null),this.gpuProgram=e,this.glProgram=t,o===void 0&&(o=0,e&&(o|=Re.WEBGPU),t&&(o|=Re.WEBGL)),this.compatibleRenderers=o;const a={};if(n&&i)throw new Error("[Shader] Cannot have both resources and groups");if(!n&&!i)throw new Error("[Shader] Must provide either resources or groups descriptor");if(!e&&i&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&i&&s)for(const l in s)for(const u in s[l]){const h=s[l][u];a[h]={group:l,binding:u,name:h}}else if(e&&i&&!s){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else if(n){if(e){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else{s={},i={99:new Be};let l=0;for(const u in n)a[u]={group:99,binding:l,name:u},s[99]=s[99]||{},s[99][l]=u,l++}i={};for(const l in n){const u=l;let h=n[l];!h.source&&!h.resourceType&&(h=new te(h));const c=a[u];c&&(i[c.group]=i[c.group]||new Be,i[c.group].setResource(h,c.binding))}}this.groups=i,this.uniformBindMap=s,this.resources=this._buildResourceAccessor(i,a)}addResource(e,t,i){var n,s;(n=this.uniformBindMap)[t]||(n[t]={}),(s=this.uniformBindMap[t])[i]||(s[i]=e)}_buildResourceAccessor(e,t){const i={};for(const n in t){const s=t[n];Object.defineProperty(i,s.name,{get(){return e[s.group].getResource(s.binding)},set(o){e[s.group].setResource(o,s.binding)}})}return i}destroy(e=!1){var t,i;this.emit("destroy",this),e&&((t=this.gpuProgram)==null||t.destroy(),(i=this.glProgram)==null||i.destroy()),this.gpuProgram=null,this.glProgram=null,this.groups=null,this.removeAllListeners(),this.uniformBindMap=null,this.resources=null}}const fv={normal:0,additive:1,multiply:2,screen:3,overlay:4,erase:5},ts=0,rs=1,is=2,ns=3,ss=4,os=5;class Se{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<ts)}set blend(e){!!(this.data&1<<ts)!==e&&(this.data^=1<<ts)}get offsets(){return!!(this.data&1<<rs)}set offsets(e){!!(this.data&1<<rs)!==e&&(this.data^=1<<rs)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<is)}set culling(e){!!(this.data&1<<is)!==e&&(this.data^=1<<is)}get depthTest(){return!!(this.data&1<<ns)}set depthTest(e){!!(this.data&1<<ns)!==e&&(this.data^=1<<ns)}get depthMask(){return!!(this.data&1<<os)}set depthMask(e){!!(this.data&1<<os)!==e&&(this.data^=1<<os)}get clockwiseFrontFace(){return!!(this.data&1<<ss)}set clockwiseFrontFace(e){!!(this.data&1<<ss)!==e&&(this.data^=1<<ss)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=fv[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}static for2d(){const e=new Se;return e.depthTest=!1,e.blend=!0,e}}var gv=Object.defineProperty,Uh=Object.getOwnPropertySymbols,mv=Object.prototype.hasOwnProperty,bv=Object.prototype.propertyIsEnumerable,Ih=(r,e,t)=>e in r?gv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Gh=(r,e)=>{for(var t in e||(e={}))mv.call(e,t)&&Ih(r,t,e[t]);if(Uh)for(var t of Uh(e))bv.call(e,t)&&Ih(r,t,e[t]);return r};const $h=class extends Ee{constructor(r){var e;r=Gh(Gh({},$h.defaultOptions),r),super(r),this.enabled=!0,this._state=Se.for2d(),this.padding=r.padding,typeof r.antialias=="boolean"?this.antialias=r.antialias?"on":"off":this.antialias=(e=r.antialias)!=null?e:"inherit",this.resolution=r.resolution,this.blendRequired=r.blendRequired,this.addResource("filterUniforms",0,0),this.addResource("uSampler",0,1)}apply(r,e,t,i){r.applyFilter(this,e,t,i)}get blendMode(){return this._state.blendMode}set blendMode(r){this._state.blendMode=r}};let Ce=$h;Ce.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"inherit",blendRequired:!1};var Lh=`
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
`,Dh=`in vec2 aPosition;
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
`,zh=`struct GlobalUniforms {
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
}`,vv=Object.defineProperty,Nh=Object.getOwnPropertySymbols,yv=Object.prototype.hasOwnProperty,xv=Object.prototype.propertyIsEnumerable,Hh=(r,e,t)=>e in r?vv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,jh=(r,e)=>{for(var t in e||(e={}))yv.call(e,t)&&Hh(r,t,e[t]);if(Nh)for(var t of Nh(e))xv.call(e,t)&&Hh(r,t,e[t]);return r};class ee extends Ce{constructor(e){const t=e.gpu,i=Wh(jh({source:zh},t)),n=new Ae({vertex:{source:i,entryPoint:"mainVertex"},fragment:{source:i,entryPoint:"mainFragment"}}),s=e.gl,o=Wh(jh({source:Lh},s)),a=new _e({vertex:Dh,fragment:o}),l=new te({uBlend:{value:1,type:"f32"}});super({gpuProgram:n,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,backTexture:A.EMPTY}})}}function Wh(r){const{source:e,functions:t,main:i}=r;return e.replace("{FUNCTIONS}",t).replace("{MAIN}",i)}const si=`
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
    `,oi=`
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
	`;var as=`struct GlobalUniforms {
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
}`,_v=Object.defineProperty,Vh=Object.getOwnPropertySymbols,wv=Object.prototype.hasOwnProperty,Tv=Object.prototype.propertyIsEnumerable,Yh=(r,e,t)=>e in r?_v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Xh=(r,e)=>{for(var t in e||(e={}))wv.call(e,t)&&Yh(r,t,e[t]);if(Vh)for(var t of Vh(e))Tv.call(e,t)&&Yh(r,t,e[t]);return r};const qh=class extends Ce{constructor(r){r=Xh(Xh({},qh.DEFAULT_OPTIONS),r);const e=new Ae({vertex:{source:as,entryPoint:"mainVertex"},fragment:{source:as,entryPoint:"mainFragment"}}),t=new te({uAlpha:{value:r.alpha,type:"f32"}});super({gpuProgram:e,resources:{filterUniforms:t}})}get alpha(){return this.resources.filterUniforms.uniforms.uAlpha}set alpha(r){this.resources.filterUniforms.uniforms.uAlpha=r}};let Kh=qh;Kh.DEFAULT_OPTIONS={alpha:1};function ct(r){return r+=r===0?1:0,--r,r|=r>>>1,r|=r>>>2,r|=r>>>4,r|=r>>>8,r|=r>>>16,r+1}function Sv(r){return!(r&r-1)&&!!r}function Pv(r){let e=(r>65535?1:0)<<4;r>>>=e;let t=(r>255?1:0)<<3;return r>>>=t,e|=t,t=(r>15?1:0)<<2,r>>>=t,e|=t,t=(r>3?1:0)<<1,r>>>=t,e|=t,e|r>>1}var Av=Object.defineProperty,Ev=Object.defineProperties,Cv=Object.getOwnPropertyDescriptors,Zh=Object.getOwnPropertySymbols,Mv=Object.prototype.hasOwnProperty,Bv=Object.prototype.propertyIsEnumerable,Qh=(r,e,t)=>e in r?Av(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Rv=(r,e)=>{for(var t in e||(e={}))Mv.call(e,t)&&Qh(r,t,e[t]);if(Zh)for(var t of Zh(e))Bv.call(e,t)&&Qh(r,t,e[t]);return r},kv=(r,e)=>Ev(r,Cv(e));let Ov=0;class Jh{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,t,i){const n=new le(kv(Rv({},this.textureOptions),{width:e,height:t,resolution:1,antialias:i}));return new A({source:n,label:`texturePool_${Ov++}`})}getOptimalTexture(e,t,i=1,n){let s=Math.ceil(e*i-1e-6),o=Math.ceil(t*i-1e-6);s=ct(s),o=ct(o);const a=(s<<17)+(o<<1)+(n?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let l=this._texturePool[a].pop();return l||(l=this.createTexture(s,o,n)),l.source._resolution=i,l.source.width=s/i,l.source.height=o/i,l.source.pixelWidth=s,l.source.pixelHeight=o,l.frameX=0,l.frameY=0,l.frameWidth=e,l.frameHeight=t,l.layout.update(),this._poolKeyHash[l.id]=a,l}getSameSizeTexture(e,t=!1){const i=e.source;return this.getOptimalTexture(e.width,e.height,i._resolution,t)}returnTexture(e){const t=this._poolKeyHash[e.id];this._texturePool[t].push(e)}clear(e){if(e=e!==!1,e)for(const t in this._texturePool){const i=this._texturePool[t];if(i)for(let n=0;n<i.length;n++)i[n].destroy(!0)}this._texturePool={}}}const ue=new Jh,ls={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},Fv=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","out vec4 fragColor;","void main(void)","{","    fragColor = vec4(0.0);","    %blur%","}"].join(`
`);function ec(r){const e=ls[r],t=e.length;let i=Fv,n="";const s="fragColor += texture(uSampler, vBlurTexCoords[%index%]) * %value%;";let o;for(let a=0;a<r;a++){let l=s.replace("%index%",a.toString());o=a,a>=t&&(o=r-a-1),l=l.replace("%value%",e[o].toString()),n+=l,n+=`
`}return i=i.replace("%blur%",n),i=i.replace("%size%",r.toString()),i}const Uv=`
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
    }`;function tc(r,e){const t=Math.ceil(r/2);let i=Uv,n="",s;e?s="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":s="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let o=0;o<r;o++){let a=s.replace("%index%",o.toString());a=a.replace("%sampleIndex%",`${o-(t-1)}.0`),n+=a,n+=`
`}return i=i.replace("%blur%",n),i=i.replace("%size%",r.toString()),i=i.replace("%dimension%",e?"z":"w"),i}function rc(r,e){const t=tc(e,r),i=ec(e);return _e.from({vertex:t,fragment:i,name:`blur-${r?"horizontal":"vertical"}-pass-filter`})}var ic=`

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
}`;function nc(r,e){const t=ls[e],i=t.length,n=[],s=[],o=[];for(let c=0;c<e;c++){n[c]=`@location(${c}) offset${c}: vec2<f32>,`,r?s[c]=`filteredCord + vec2(${c-i+1} * strength, 0.0),`:s[c]=`filteredCord + vec2(0.0, ${c-i+1} * strength),`;const p=c<i?c:e-c-1,d=t[p].toString();o[c]=`fragColor += textureSample(uSampler, mySampler, offset${c}) * ${d};`}const a=n.join(`
`),l=s.join(`
`),u=o.join(`
`),h=ic.replace("%blur-struct%",a).replace("%blur-vertex-out%",l).replace("%blur-fragment-in%",a).replace("%blur-sampling%",u);return Ae.from({vertex:{source:h,entryPoint:"mainVertex"},fragment:{source:h,entryPoint:"mainFragment"}})}var Iv=Object.defineProperty,sc=Object.getOwnPropertySymbols,Gv=Object.prototype.hasOwnProperty,$v=Object.prototype.propertyIsEnumerable,oc=(r,e,t)=>e in r?Iv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,us=(r,e)=>{for(var t in e||(e={}))Gv.call(e,t)&&oc(r,t,e[t]);if(sc)for(var t of sc(e))$v.call(e,t)&&oc(r,t,e[t]);return r};const ac=class extends Ce{constructor(r){r=us(us({},ac.defaultOptions),r);const e=rc(r.horizontal,r.kernelSize),t=nc(r.horizontal,r.kernelSize);super(us({glProgram:e,gpuProgram:t,resources:{blurUniforms:{strength:{value:0,type:"f32"}}}},r)),this.horizontal=r.horizontal,this._quality=0,this.quality=r.quality,this.blur=r.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(r,e,t,i){if(this._uniforms.strength=this.strength/this.passes,this.passes===1)r.applyFilter(this,e,t,i);else{const n=ue.getSameSizeTexture(e);let s=e,o=n;this._state.blend=!1;for(let a=0;a<this.passes-1;a++){r.applyFilter(this,s,o,r.renderer.type===Re.WEBGPU);const l=o;o=s,s=l}this._state.blend=!0,r.applyFilter(this,s,t,i),ue.returnTexture(n)}}get blur(){return this.strength}set blur(r){this.padding=1+Math.abs(r)*2,this.strength=r}get quality(){return this._quality}set quality(r){this._quality=r,this.passes=r}};let pr=ac;pr.defaultOptions={strength:8,quality:4,kernelSize:5};var Lv=Object.defineProperty,Dv=Object.defineProperties,zv=Object.getOwnPropertyDescriptors,lc=Object.getOwnPropertySymbols,Nv=Object.prototype.hasOwnProperty,Hv=Object.prototype.propertyIsEnumerable,uc=(r,e,t)=>e in r?Lv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,fr=(r,e)=>{for(var t in e||(e={}))Nv.call(e,t)&&uc(r,t,e[t]);if(lc)for(var t of lc(e))Hv.call(e,t)&&uc(r,t,e[t]);return r},jv=(r,e)=>Dv(r,zv(e));class hc extends Ce{constructor(...e){var t;let i=(t=e[0])!=null?t:{};typeof i=="number"&&(O(G,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),i={strength:i},e[1]&&(i.quality=e[1]),e[2]&&(i.resolution=e[2]),e[3]&&(i.kernelSize=e[3])),i=fr(fr({},pr.defaultOptions),i),super(jv(fr({},i),{compatibleRenderers:Re.WEBGL|Re.WEBGPU,resources:{}})),this._repeatEdgePixels=!1,this.blurXFilter=new pr(fr({horizontal:!1},i)),this.blurYFilter=new pr(fr({horizontal:!0},i)),this.quality=i.quality,this.blur=i.strength,this.repeatEdgePixels=!1}apply(e,t,i,n){const s=Math.abs(this.blurXFilter.strength),o=Math.abs(this.blurYFilter.strength);if(s&&o){const a=ue.getSameSizeTexture(t);this.blurXFilter.apply(e,t,a,!0),this.blurYFilter.apply(e,a,i,n),ue.returnTexture(a)}else o?this.blurYFilter.apply(e,t,i,n):this.blurXFilter.apply(e,t,i,n)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get blur(){return this.blurXFilter.blur}set blur(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get blurX(){return this.blurXFilter.blur}set blurX(e){this.blurXFilter.blur=e,this.updatePadding()}get blurY(){return this.blurYFilter.blur}set blurY(e){this.blurYFilter.blur=e,this.updatePadding()}get blendMode(){return this.blurYFilter.blendMode}set blendMode(e){this.blurYFilter.blendMode=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}}hc.defaultOptions={strength:8,quality:4,kernelSize:5};var hs=`in vec2 aPosition;
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
`,cc=`
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
`,cs=`struct GlobalUniforms {
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
}`;class Wv extends Ce{constructor(){const e=new te({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"vec4<f32>",size:5},uAlpha:{value:1,type:"f32"}}),t=Ae.from({vertex:{source:cs,entryPoint:"mainVertex"},fragment:{source:cs,entryPoint:"mainFragment"}}),i=_e.from({vertex:hs,fragment:cc,name:"color-matrix-filter"});super({gpuProgram:t,glProgram:i,resources:{colorMatrixUniforms:e}}),this.alpha=1}_loadMatrix(e,t=!1){let i=e;t&&(this._multiply(i,this.matrix,e),i=this._colorMatrix(i)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=i,this.resources.colorMatrixUniforms.update()}_multiply(e,t,i){return e[0]=t[0]*i[0]+t[1]*i[5]+t[2]*i[10]+t[3]*i[15],e[1]=t[0]*i[1]+t[1]*i[6]+t[2]*i[11]+t[3]*i[16],e[2]=t[0]*i[2]+t[1]*i[7]+t[2]*i[12]+t[3]*i[17],e[3]=t[0]*i[3]+t[1]*i[8]+t[2]*i[13]+t[3]*i[18],e[4]=t[0]*i[4]+t[1]*i[9]+t[2]*i[14]+t[3]*i[19]+t[4],e[5]=t[5]*i[0]+t[6]*i[5]+t[7]*i[10]+t[8]*i[15],e[6]=t[5]*i[1]+t[6]*i[6]+t[7]*i[11]+t[8]*i[16],e[7]=t[5]*i[2]+t[6]*i[7]+t[7]*i[12]+t[8]*i[17],e[8]=t[5]*i[3]+t[6]*i[8]+t[7]*i[13]+t[8]*i[18],e[9]=t[5]*i[4]+t[6]*i[9]+t[7]*i[14]+t[8]*i[19]+t[9],e[10]=t[10]*i[0]+t[11]*i[5]+t[12]*i[10]+t[13]*i[15],e[11]=t[10]*i[1]+t[11]*i[6]+t[12]*i[11]+t[13]*i[16],e[12]=t[10]*i[2]+t[11]*i[7]+t[12]*i[12]+t[13]*i[17],e[13]=t[10]*i[3]+t[11]*i[8]+t[12]*i[13]+t[13]*i[18],e[14]=t[10]*i[4]+t[11]*i[9]+t[12]*i[14]+t[13]*i[19]+t[14],e[15]=t[15]*i[0]+t[16]*i[5]+t[17]*i[10]+t[18]*i[15],e[16]=t[15]*i[1]+t[16]*i[6]+t[17]*i[11]+t[18]*i[16],e[17]=t[15]*i[2]+t[16]*i[7]+t[17]*i[12]+t[18]*i[17],e[18]=t[15]*i[3]+t[16]*i[8]+t[17]*i[13]+t[18]*i[18],e[19]=t[15]*i[4]+t[16]*i[9]+t[17]*i[14]+t[18]*i[19]+t[19],e}_colorMatrix(e){const t=new Float32Array(e);return t[4]/=255,t[9]/=255,t[14]/=255,t[19]/=255,t}brightness(e,t){const i=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(i,t)}tint(e,t){const[i,n,s]=j.shared.setValue(e).toArray(),o=[i,0,0,0,0,0,n,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(o,t)}greyscale(e,t){const i=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(i,t)}grayscale(e,t){this.greyscale(e,t)}blackAndWhite(e){const t=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(t,e)}hue(e,t){e=(e||0)/180*Math.PI;const i=Math.cos(e),n=Math.sin(e),s=Math.sqrt,o=1/3,a=s(o),l=i+(1-i)*o,u=o*(1-i)-a*n,h=o*(1-i)+a*n,c=o*(1-i)+a*n,p=i+o*(1-i),d=o*(1-i)-a*n,f=o*(1-i)-a*n,m=o*(1-i)+a*n,g=i+o*(1-i),x=[l,u,h,0,0,c,p,d,0,0,f,m,g,0,0,0,0,0,1,0];this._loadMatrix(x,t)}contrast(e,t){const i=(e||0)+1,n=-.5*(i-1),s=[i,0,0,0,n,0,i,0,0,n,0,0,i,0,n,0,0,0,1,0];this._loadMatrix(s,t)}saturate(e=0,t){const i=e*2/3+1,n=(i-1)*-.5,s=[i,n,n,0,0,n,i,n,0,0,n,n,i,0,0,0,0,0,1,0];this._loadMatrix(s,t)}desaturate(){this.saturate(-1)}negative(e){const t=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(t,e)}sepia(e){const t=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(t,e)}technicolor(e){const t=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(t,e)}polaroid(e){const t=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(t,e)}toBGR(e){const t=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(t,e)}kodachrome(e){const t=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(t,e)}browni(e){const t=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(t,e)}vintage(e){const t=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(t,e)}colorTone(e,t,i,n,s){e=e||.2,t=t||.15,i=i||16770432,n=n||3375104;const o=j.shared,[a,l,u]=o.setValue(i).toArray(),[h,c,p]=o.setValue(n).toArray(),d=[.3,.59,.11,0,0,a,l,u,e,0,h,c,p,t,0,a-h,l-c,u-p,0,0];this._loadMatrix(d,s)}night(e,t){e=e||.1;const i=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(i,t)}predator(e,t){const i=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(i,t)}lsd(e){const t=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(t,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}var dc=`
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
`,pc=`in vec2 aPosition;
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
`,ds=`struct GlobalUniforms {
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
}`;class Vv extends Ce{constructor(...e){var t;let i=e[0];i instanceof Oe&&(e[1]&&O(G,"DisplacementFilter now uses options object instead of params. {sprite, scale}"),i={sprite:i,scale:e[1]});let n=(t=i.scale)!=null?t:20;typeof n=="number"&&(n=new W(n,n));const s=new te({filterMatrix:{value:new k,type:"mat3x3<f32>"},scale:{value:n,type:"vec2<f32>"},rotation:{value:new Float32Array([0,0,0,0]),type:"vec4<f32>"}}),o=_e.from({vertex:pc,fragment:dc,name:"displacement-filter"}),a=Ae.from({vertex:{source:ds,entryPoint:"mainVertex"},fragment:{source:ds,entryPoint:"mainFragment"}}),l=i.sprite.texture.source;super({gpuProgram:a,glProgram:o,resources:{filterUniforms:s,mapTexture:l,mapSampler:l.style}}),this._sprite=i.sprite,this._sprite.renderable=!1}apply(e,t,i,n){const s=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(s.filterMatrix,this._sprite);const o=this._sprite.worldTransform,a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.sqrt(o.c*o.c+o.d*o.d);a!==0&&l!==0&&(s.rotation[0]=o.a/a,s.rotation[1]=o.b/a,s.rotation[2]=o.c/l,s.rotation[3]=o.d/l),this.resources.mapTexture=this._sprite.texture.source,e.applyFilter(this,t,i,n)}get scale(){return this.resources.filterUniforms.uniforms.scale}}var fc=`
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
`,ps=`

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
}`,Yv=Object.defineProperty,gc=Object.getOwnPropertySymbols,Xv=Object.prototype.hasOwnProperty,qv=Object.prototype.propertyIsEnumerable,mc=(r,e,t)=>e in r?Yv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,bc=(r,e)=>{for(var t in e||(e={}))Xv.call(e,t)&&mc(r,t,e[t]);if(gc)for(var t of gc(e))qv.call(e,t)&&mc(r,t,e[t]);return r};const vc=class extends Ce{constructor(r={}){var e,t,i;r=bc(bc({},vc.DEFAULT),r);const n=new Ae({vertex:{source:ps,entryPoint:"mainVertex"},fragment:{source:ps,entryPoint:"mainFragment"}}),s=new _e({vertex:hs,fragment:fc,name:"noise-filter"});super({gpuProgram:n,glProgram:s,resources:{noiseUniforms:new te({uNoise:{value:r.noise,type:"f32"},uSeed:{value:(e=r.seed)!=null?e:Math.random(),type:"f32"}})},resolution:1});const o=(t=r.noise)!=null?t:.5,a=(i=r.seed)!=null?i:Math.random();this.noise=o,this.seed=a}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(r){this.resources.noiseUniforms.uniforms.uNoise=r}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(r){this.resources.noiseUniforms.uniforms.uSeed=r}};let yc=vc;yc.DEFAULT={noise:.5,seed:void 0};var xc=`
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
`,_c=`in vec2 aPosition;
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
`,fs=`struct GlobalUniforms {
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
`,Kv=Object.defineProperty,wc=Object.getOwnPropertySymbols,Zv=Object.prototype.hasOwnProperty,Qv=Object.prototype.propertyIsEnumerable,Tc=(r,e,t)=>e in r?Kv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Sc=(r,e)=>{for(var t in e||(e={}))Zv.call(e,t)&&Tc(r,t,e[t]);if(wc)for(var t of wc(e))Qv.call(e,t)&&Tc(r,t,e[t]);return r};const Pc=class extends Ce{constructor(r={}){r=Sc(Sc({},Pc.DEFAULT),r);const e=new Ae({vertex:{source:fs,entryPoint:"mainVertex"},fragment:{source:fs,entryPoint:"mainFragment"}}),t=new _e({vertex:_c,fragment:xc,name:"shockwave-filter"});super({gpuProgram:e,glProgram:t,resources:{shockwaveUniforms:new te({uTime:{value:0,type:"f32"},uCenter:{value:r.center,type:"vec2<f32>"},uSpeed:{value:r.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}})},resolution:1}),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,r)}apply(r,e,t,i){this.uniforms.uTime=this.time,r.applyFilter(this,e,t,i)}get center(){return this.uniforms.uCenter}set center(r){this.uniforms.uCenter=r}get centerX(){return this.uniforms.uCenter.x}set centerX(r){this.uniforms.uCenter.x=r}get centerY(){return this.uniforms.uCenter.y}set centerY(r){this.uniforms.uCenter.y=r}get speed(){return this.uniforms.uSpeed}set speed(r){this.uniforms.uSpeed=r}get amplitude(){return this.uniforms.uWave[0]}set amplitude(r){this.uniforms.uWave[0]=r}get wavelength(){return this.uniforms.uWave[1]}set wavelength(r){this.uniforms.uWave[1]=r}get brightness(){return this.uniforms.uWave[2]}set brightness(r){this.uniforms.uWave[2]=r}get radius(){return this.uniforms.uWave[3]}set radius(r){this.uniforms.uWave[3]=r}};let Ac=Pc;Ac.DEFAULT={center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1};class gs{constructor(e){this._renderer=e}push(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({type:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({type:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}gs.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"filter"};class we extends he{constructor({data:e,size:t,usage:i,label:n}){super(),this.resourceType="buffer",this.resourceId=X("bufferResource"),this.touched=0,this.uid=X("buffer"),this._updateID=1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,t=t!=null?t:e==null?void 0:e.byteLength;const s=!!e;this.descriptor={size:t,usage:i,mappedAtCreation:s,label:n}}get data(){return this._data}set data(e){if(this._data!==e){const t=this._data;this._data=e,t.length!==e.length?(this.descriptor.size=e.byteLength,this.resourceId=X("bufferResource"),this.emit("change",this)):this.emit("update",this)}}update(e){this._updateSize=e||this.descriptor.size,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}var H=(r=>(r[r.MAP_READ=1]="MAP_READ",r[r.MAP_WRITE=2]="MAP_WRITE",r[r.COPY_SRC=4]="COPY_SRC",r[r.COPY_DST=8]="COPY_DST",r[r.INDEX=16]="INDEX",r[r.VERTEX=32]="VERTEX",r[r.UNIFORM=64]="UNIFORM",r[r.STORAGE=128]="STORAGE",r[r.INDIRECT=256]="INDIRECT",r[r.QUERY_RESOLVE=512]="QUERY_RESOLVE",r[r.STATIC=1024]="STATIC",r))(H||{});function ms(r,e){if(!(r instanceof we)){let t=e?H.INDEX:H.VERTEX;r instanceof Array&&(e?(r=new Uint32Array(r),t=H.INDEX|H.COPY_DST):(r=new Float32Array(r),t=H.VERTEX|H.COPY_DST)),r=new we({data:r,label:"index-mesh-buffer",usage:t})}return r}class ai extends he{constructor({attributes:e,indexBuffer:t,topology:i}){super(),this.uid=X("geometry"),this._layoutKey=0,this.attributes=e,this.buffers=[];for(const n in e){const s=e[n];s.buffer=ms(s.buffer,!1),this.buffers.indexOf(s.buffer)===-1&&(this.buffers.push(s.buffer),s.buffer.on("update",this.onBufferUpdate,this))}t&&(this.indexBuffer=ms(t,!0),this.buffers.push(this.indexBuffer)),this.topology=i||"triangle-list"}onBufferUpdate(){this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const t=this.attributes[e];return this.getBuffer(e).data.length/(t.stride/4||t.size)}return 0}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(t=>t.destroy()),this.attributes=null,this.buffers=null}}function Ec(r,e){e.clear();const t=e.matrix;for(let i=0;i<r.length;i++){const n=r[i];n.layerVisibleRenderable<3||(e.matrix=n.worldTransform,n.view.addBounds(e))}return e.matrix=t,e}const Jv=new ai({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),shaderLocation:0,format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class bs{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new te({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"},outputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Be({}),this.renderer=e}push(e){var t,i;const n=this.renderer,s=e.filterEffect.filters;this._filterStack[this._filterStackIndex]||(this._filterStack[this._filterStackIndex]=this._getFilterData());const o=this._filterStack[this._filterStackIndex];this._filterStackIndex++;const a=o.bounds;if(e.renderables?Ec(e.renderables,a):Yt(e.container,!0,a),s.length===0){o.skip=!0;return}let l=n.renderTarget.rootRenderTarget.colorTexture.source._resolution,u=0,h=n.renderTarget.rootRenderTarget.colorTexture.source.antialias,c=!1,p=!1;for(let d=0;d<s.length;d++){const f=s[d];if(l=Math.min(l,f.resolution),u+=f.padding,f.antialias!=="inherit"&&(f.antialias==="on"?h=!0:h=!1),!(f.compatibleRenderers&n.type)){p=!1;break}if(f.blendRequired&&!((i=(t=n.backBuffer)==null?void 0:t.useBackBuffer)==null||i)){p=!1;break}p=f.enabled||p,c=c||f.blendRequired}if(!p){o.skip=!0;return}if(a.scale(l).fit(n.renderTarget.rootRenderTarget.viewport).scale(1/l).pad(u).ceil(),!a.isPositive){o.skip=!0;return}o.skip=!1,o.bounds=a,o.blendRequired=c,o.container=e.container,o.filterEffect=e.filterEffect,o.previousRenderSurface=n.renderTarget.renderTarget,o.inputTexture=ue.getOptimalTexture(a.width,a.height,l,h),n.renderTarget.bind(o.inputTexture,!0),n.globalUniforms.push({offset:a})}pop(){var e,t;const i=this.renderer;this._filterStackIndex--;const n=this._filterStack[this._filterStackIndex];if(n.skip)return;this._activeFilterData=n;const s=n.inputTexture,o=n.bounds;let a=A.EMPTY;if((t=(e=i.renderTarget).finishRenderPass)==null||t.call(e),n.blendRequired){i.encoder.finishRenderPass();const u=this._filterStackIndex>0?this._filterStack[this._filterStackIndex-1].bounds:null;a=this.getBackTexture(n.previousRenderSurface,o,u)}n.backTexture=a;const l=n.filterEffect.filters;if(this._globalFilterBindGroup.setResource(s.source.style,2),this._globalFilterBindGroup.setResource(a.source,3),i.globalUniforms.pop(),l.length===1)l[0].apply(this,s,n.previousRenderSurface,!1),ue.returnTexture(s);else{let u=n.inputTexture,h=ue.getOptimalTexture(o.width,o.height,u.source._resolution,!1),c=0;for(c=0;c<l.length-1;++c){l[c].apply(this,u,h,!0);const p=u;u=h,h=p}l[c].apply(this,u,n.previousRenderSurface,!1),ue.returnTexture(u),ue.returnTexture(h)}n.blendRequired&&ue.returnTexture(a)}getBackTexture(e,t,i){const n=e.colorTexture.source._resolution,s=ue.getOptimalTexture(t.width,t.height,n,!1);let o=t.minX,a=t.minY;i&&(o-=i.minX,a-=i.minY),o=Math.floor(o*n),a=Math.floor(a*n);const l=Math.ceil(t.width*n),u=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,s,{x:o,y:a},{width:l,height:u}),s}applyFilter(e,t,i,n){const s=this.renderer,o=this._filterStack[this._filterStackIndex],a=o.bounds,l=W.shared,u=o.previousRenderSurface===this.renderer.renderTarget.getRenderTarget(i);let h=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;this._filterStackIndex>0&&(h=this._filterStack[this._filterStackIndex-1].inputTexture.source._resolution);const c=this._filterGlobalUniforms,p=c.uniforms,d=p.outputFrame,f=p.inputSize,m=p.inputPixel,g=p.inputClamp,x=p.globalFrame,b=p.outputTexture;u?(this._filterStackIndex>0&&(l.x=this._filterStack[this._filterStackIndex-1].bounds.minX,l.y=this._filterStack[this._filterStackIndex-1].bounds.minY),d[0]=a.minX-l.x,d[1]=a.minY-l.y):(d[0]=0,d[1]=0),d[2]=t.frameWidth,d[3]=t.frameHeight,f[0]=t.source.width,f[1]=t.source.height,f[2]=1/f[0],f[3]=1/f[1],m[0]=t.source.pixelWidth,m[1]=t.source.pixelHeight,m[2]=1/m[0],m[3]=1/m[1],g[0]=.5*m[2],g[1]=.5*m[3],g[2]=t.frameWidth*f[2]-.5*m[2],g[3]=t.frameHeight*f[3]-.5*m[3];const v=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=l.x*h,x[1]=l.y*h,x[2]=v.source.width*h,x[3]=v.source.height*h;const _=this.renderer.renderTarget.getRenderTarget(i);if(b[0]=_.colorTexture.frameWidth,b[1]=_.colorTexture.frameHeight,b[2]=_.isRoot?-1:1,c.update(),s.renderPipes.uniformBatch){const P=s.renderPipes.uniformBatch.getUniformBufferResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(P,0)}else this._globalFilterBindGroup.setResource(c,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),s.renderTarget.bind(i,!!n),e.groups[0]=this._globalFilterBindGroup,s.encoder.draw({geometry:Jv,shader:e,state:e._state,topology:"triangle-list"})}_getFilterData(){return{skip:!1,inputTexture:null,bounds:new pe,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,t){const i=this._activeFilterData,n=e.set(i.inputTexture._source.width,0,0,i.inputTexture._source.height,i.bounds.minX,i.bounds.minY),s=t.worldTransform.copyTo(k.shared);return s.invert(),n.prepend(s),n.scale(1/t.texture.frameWidth,1/t.texture.frameHeight),n.translate(t.anchor.x,t.anchor.y),n}}bs.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"filter"};var Cc=`in vec2 vMaskCoord;
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
`,Mc=`in vec2 aPosition;

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
`,vs=`struct GlobalFilterUniforms {
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
  
}`;class Bc extends Ce{constructor({sprite:e}){const t=new xn(e.texture),i=new te({filterMatrix:{value:new k,type:"mat3x3<f32>"},maskClamp:{value:t.uClampFrame,type:"vec4<f32>"},alpha:{value:1,type:"f32"}}),n=new Ae({vertex:{source:vs,entryPoint:"mainVertex"},fragment:{source:vs,entryPoint:"mainFragment"}}),s=_e.from({vertex:Mc,fragment:Cc,name:"mask-filter"});super({gpuProgram:n,glProgram:s,resources:{filterUniforms:i,mapTexture:e.texture.source}}),this.sprite=e,this._textureMatrix=t}apply(e,t,i,n){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.filterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,t,i,n)}}class Ma{constructor(e=0,t=0,i=0,n=0,s=0,o=0){this.type="triangle",this.x=e,this.y=t,this.x2=i,this.y2=n,this.x3=s,this.y3=o}contains(e,t){const i=(this.x-this.x3)*(t-this.y3)-(this.y-this.y3)*(e-this.x3),n=(this.x2-this.x)*(t-this.y)-(this.y2-this.y)*(e-this.x);if(i<0!=n<0&&i!==0&&n!==0)return!1;const s=(this.x3-this.x2)*(t-this.y2)-(this.y3-this.y2)*(e-this.x2);return s===0||s<0==i+n<=0}clone(){return new Ma(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e=e||new K;const t=Math.min(this.x,this.x2,this.x3),i=Math.max(this.x,this.x2,this.x3),n=Math.min(this.y,this.y2,this.y3),s=Math.max(this.y,this.y2,this.y3);return e.x=t,e.y=n,e.width=i-t,e.height=s-n,e}}function ys(r,e,t){if(r)for(const i in r){const n=i.toLocaleLowerCase(),s=e[n];if(s){let o=r[i];i==="header"&&(o=o.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),t&&s.push(`//----${t}----//`),s.push(o)}}}const Rc=/\{\{(.*?)\}\}/g;function xs(r){var e,t;const i={};return((t=(e=r.match(Rc))==null?void 0:e.map(n=>n.replace(/[{()}]/g,"")))!=null?t:[]).forEach(n=>{i[n]=[]}),i}function kc(r,e){let t;const i=/@in\s+([^;]+);/g;for(;(t=i.exec(r))!==null;)e.push(t[1])}function _s(r,e,t=!1){const i=[];kc(e,i),r.forEach(a=>{a.header&&kc(a.header,i)});const n=i;t&&n.sort();const s=n.map((a,l)=>`       @location(${l}) ${a},`).join(`
`);let o=e.replace(/@in\s+[^;]+;\s*/g,"");return o=o.replace("{{in}}",`
${s}
`),o}function Oc(r,e){let t;const i=/@out\s+([^;]+);/g;for(;(t=i.exec(r))!==null;)e.push(t[1])}function ey(r){const e=/\b(\w+)\s*:/g.exec(r);return e?e[1]:""}function ty(r){const e=/@.*?\s+/g;return r.replace(e,"")}function Fc(r,e){const t=[];Oc(e,t),r.forEach(l=>{l.header&&Oc(l.header,t)});let i=0;const n=t.sort().map(l=>l.indexOf("builtin")>-1?l:`@location(${i++}) ${l}`).join(`,
`),s=t.sort().map(l=>`       var ${ty(l)};`).join(`
`),o=`return VSOutput(
                ${t.sort().map(l=>` ${ey(l)}`).join(`,
`)});`;let a=e.replace(/@out\s+[^;]+;\s*/g,"");return a=a.replace("{{struct}}",`
${n}
`),a=a.replace("{{start}}",`
${s}
`),a=a.replace("{{return}}",`
${o}
`),a}function ws(r,e){let t=r;for(const i in e){const n=e[i];n.join(`
`).length?t=t.replace(`{{${i}}}`,`//-----${i} START-----//
${n.join(`
`)}
//----${i} FINISH----//`):t=t.replace(`{{${i}}}`,"")}return t}const dt=Object.create(null),Ts=new Map;let ry=0;function Uc({template:r,bits:e}){const t=Gc(r,e);if(dt[t])return dt[t];const{vertex:i,fragment:n}=iy(r,e);return dt[t]=$c(i,n,e),dt[t]}function Ic({template:r,bits:e}){const t=Gc(r,e);return dt[t]||(dt[t]=$c(r.vertex,r.fragment,e)),dt[t]}function iy(r,e){const t=e.map(o=>o.vertex).filter(o=>!!o),i=e.map(o=>o.fragment).filter(o=>!!o);let n=_s(t,r.vertex);n=Fc(t,n);const s=_s(i,r.fragment,!0);return{vertex:n,fragment:s}}function Gc(r,e){return e.map(t=>(Ts.has(t)||Ts.set(t,ry++),Ts.get(t))).sort((t,i)=>t-i).join("-")+r.vertex+r.fragment}function $c(r,e,t){const i=xs(r),n=xs(e);return t.forEach(s=>{ys(s.vertex,i,s.name),ys(s.fragment,n,s.name)}),{vertex:ws(r,i),fragment:ws(e,n)}}const Lc=`
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

        {{end}}

        {{return}}
    };
`,Dc=`
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
`,zc=`
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

        {{end}}
    }
`,Nc=`
   
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
`,Hc={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            projectionMatrix:mat3x3<f32>,
            worldTransformMatrix:mat3x3<f32>,
            worldAlpha: f32,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},jc={name:"global-uniforms-bit",vertex:{header:`
          uniform globalUniforms {
            mat3 projectionMatrix;
            mat3 worldTransformMatrix;
            float worldAlpha;
            vec2 uResolution;
          };
        `}};var ny=Object.defineProperty,Wc=Object.getOwnPropertySymbols,sy=Object.prototype.hasOwnProperty,oy=Object.prototype.propertyIsEnumerable,Vc=(r,e,t)=>e in r?ny(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ay=(r,e)=>{for(var t in e||(e={}))sy.call(e,t)&&Vc(r,t,e[t]);if(Wc)for(var t of Wc(e))oy.call(e,t)&&Vc(r,t,e[t]);return r};function Et({bits:r,name:e}){const t=Uc({template:{fragment:Dc,vertex:Lc},bits:[Hc,...r]});return new Ae({name:e,vertex:{source:t.vertex,entryPoint:"main"},fragment:{source:t.fragment,entryPoint:"main"}})}function Ct({bits:r,name:e}){return new _e(ay({name:e},Ic({template:{vertex:zc,fragment:Nc},bits:[jc,...r]})))}const li={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},ui={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},Mt={};function ly(r){const e=[];if(r===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let t=0;for(let i=0;i<r;i++)e.push(`@group(1) @binding(${t++}) var textureSource${i+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${t++}) var textureSampler${i+1}: sampler;`)}return e.join(`
`)}function uy(r){const e=[];if(r===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let t=0;t<r;t++)t===r-1?e.push("  default:{"):e.push(`  case ${t}:{`),e.push(`      outColor = textureSampleGrad(textureSource${t+1}, textureSampler${t+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function hi(r){return Mt[r]||(Mt[r]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${ly(16)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${uy(16)}
            `}}),Mt[r]}function hy(r){const e=[];for(let t=0;t<r;t++)t>0&&e.push("else"),t<r-1&&e.push(`if(vTextureId < ${t}.5)`),e.push("{"),e.push(`	outColor = texture(uSamplers[${t}], vUV);`),e.push("}");return e.join(`
`)}function ci(r){return Mt[r]||(Mt[r]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uSamplers[${r}];
              
            `,main:`
    
                ${hy(16)}
            `}}),Mt[r]}const Bt={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},Rt={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},Te=16,Yc=new Int32Array(Te);for(let r=0;r<Te;r++)Yc[r]=r;const di=new te({uSamplers:{value:Yc,type:"u32",size:Te}},{isStatic:!0});class Ss{constructor(){this._didUpload=!1,this._tempState=Se.for2d()}init(){const e=new te({tint:{value:new Float32Array([1,1,1,1]),type:"f32"},translationMatrix:{value:new k,type:"mat3x3<f32>"}}),t=Ct({name:"batch",bits:[ui,ci(Te),Rt]});this._shader=new Ee({glProgram:t,resources:{uniforms:e,batchSamplers:di}})}start(e,t){const i=e.renderer;i.shader.bind(this._shader,this._didUpload),i.shader.bindUniformBlock(i.globalUniforms.uniformGroup,"globalUniforms",0),i.geometry.bind(t,this._shader.glProgram)}execute(e,t){const i=e.renderer;this._didUpload=!0,this._tempState.blendMode=t.blendMode,i.state.set(this._tempState);const n=t.textures.textures;for(let s=0;s<n.length;s++)i.texture.bind(n[s],s);i.geometry.draw("triangle-list",t.size,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}Ss.extension={type:[y.WebGLPipesAdaptor],name:"batch"};const Xc=new Float32Array(1),qc=new Uint32Array(1);class Ps extends ai{constructor(){const e=new we({data:Xc,label:"attribute-batch-buffer",usage:H.VERTEX|H.COPY_DST}),t=new we({data:qc,label:"index-batch-buffer",usage:H.INDEX|H.COPY_DST}),i=6*4;super({attributes:{aPosition:{buffer:e,shaderLocation:0,format:"float32x2",stride:i,offset:0},aUV:{buffer:e,shaderLocation:1,format:"float32x2",stride:i,offset:2*4},aColor:{buffer:e,shaderLocation:2,format:"unorm8x4",stride:i,offset:4*4},aTextureIdAndRound:{buffer:e,shaderLocation:3,format:"uint16x2",stride:i,offset:5*4}},indexBuffer:t})}reset(){this.indexBuffer.data=qc,this.buffers[0].data=Xc}}function cy(r){const e=[];let t=0;for(let i=0;i<r;i++)e[t]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:t,visibility:GPUShaderStage.FRAGMENT},t++,e[t]={sampler:{type:"filtering"},binding:t,visibility:GPUShaderStage.FRAGMENT},t++;return e}function dy(r){const e={};let t=0;for(let i=0;i<r;i++)e[`textureSource${i+1}`]=t++,e[`textureSampler${i+1}`]=t++;return e}const Kc={};function pi(r,e){let t=0;for(let i=0;i<e;i++)t=t*31+r[i].uid>>>0;return Kc[t]||py(r,t)}function py(r,e){const t={};let i=0;for(let s=0;s<Te;s++){const o=s<r.length?r[s]:A.EMPTY.source;t[i++]=o.source,t[i++]=o.style}const n=new Be(t);return Kc[e]=n,n}const fi=Se.for2d();class As{init(){const e=Et({name:"batch",bits:[li,hi(Te),Bt]});this._shader=new Ee({gpuProgram:e,groups:{}})}start(e,t){const i=e.renderer,n=i.encoder,s=this._shader.gpuProgram;this._geometry=t,n.setGeometry(t),fi.blendMode="normal",i.pipeline.getPipeline(t,s,fi);const o=i.globalUniforms.bindGroup;n.setBindGroup(0,o,s)}execute(e,t){const i=this._shader.gpuProgram,n=e.renderer,s=n.encoder;if(!t.bindGroup){const l=t.textures;t.bindGroup=pi(l.textures,l.count)}fi.blendMode=t.blendMode;const o=n.bindGroup.getBindGroup(t.bindGroup,i,1),a=n.pipeline.getPipeline(this._geometry,i,fi);t.bindGroup.touch(n.textureGC.count),s.setPipeline(a),s.renderPassEncoder.setBindGroup(1,o),s.renderPassEncoder.drawIndexed(t.size,1,t.start)}destroy(){this._shader.destroy(!0),this._shader=null}}As.extension={type:[y.WebGPUPipesAdaptor],name:"batch"};class Es{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function gi(r,e){const t=r.byteLength/8|0,i=new Float64Array(r,0,t),n=new Float64Array(e,0,t);for(let a=0;a<t;a++)n[a]=i[a];const s=new Uint8Array(r,t*8),o=new Uint8Array(e,t*8);for(let a=0;a<s.length;a++)o[a]=s[a]}class Cs{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){const t=this.textures[e];this.textures[e]=null,this.ids[t.uid]=null}this.count=0}}class Ms{constructor(){this.type="batch",this.action="startBatch",this.start=0,this.size=0,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}let gr=0;class Bs{constructor(e=4,t=6){this.uid=X("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._vertexSize=6,this._elements=[],this._batchPool=[],this._batchPoolIndex=0,this._textureBatchPool=[],this._textureBatchPoolIndex=0,this.attributeBuffer=new Es(e*this._vertexSize*4),this.indexBuffer=new Uint32Array(t)}begin(){this.batchIndex=0,this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0,this._batchPoolIndex=0,this._textureBatchPoolIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e.indexStart=this.indexSize,e.location=this.attributeSize,e.batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.vertexSize*this._vertexSize}checkAndUpdateTexture(e,t){const i=e.batch.textures.ids[t._source.uid];return!i&&i!==0?!1:(e.textureId=i,e.texture=t,!0)}updateElement(e){this.dirty=!0,e.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,e.location,e.textureId)}break(e){const t=this._elements;let i=this._textureBatchPool[this._textureBatchPoolIndex++]||new Cs;if(i.clear(),!t[this.elementStart])return;let n=t[this.elementStart].blendMode;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const s=this.attributeBuffer.float32View,o=this.attributeBuffer.uint32View,a=this.indexBuffer;let l=this._batchIndexSize,u=this._batchIndexStart,h="startBatch",c=this._batchPool[this._batchPoolIndex++]||new Ms;for(let p=this.elementStart;p<this.elementSize;++p){const d=t[p];t[p]=null;const f=d.texture._source,m=n!==d.blendMode;if(f._batchTick===gr&&!m){d.textureId=f._textureBindLocation,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize),d.batch=c;continue}f._batchTick=gr,(i.count>=Te||m)&&(this._finishBatch(c,u,l-u,i,n,e,h),h="renderBatch",u=l,n=d.blendMode,i=this._textureBatchPool[this._textureBatchPoolIndex++]||new Cs,i.clear(),c=this._batchPool[this._batchPoolIndex++]||new Ms,++gr),d.textureId=f._textureBindLocation=i.count,i.ids[f.uid]=i.count,i.textures[i.count++]=f,d.batch=c,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize)}i.count>0&&(this._finishBatch(c,u,l-u,i,n,e,h),u=l,++gr),this.elementStart=this.elementSize,this._batchIndexStart=u,this._batchIndexSize=l}_finishBatch(e,t,i,n,s,o,a){e.gpuBindGroup=null,e.action=a,e.batcher=this,e.textures=n,e.blendMode=s,e.start=t,e.size=i,++gr,o.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const t=Math.max(e,this.attributeBuffer.size*2),i=new Es(t);gi(this.attributeBuffer.rawBinaryData,i.rawBinaryData),this.attributeBuffer=i}_resizeIndexBuffer(e){const t=this.indexBuffer,i=Math.max(e,t.length*2),n=new Uint32Array(i);gi(t.buffer,n.buffer),this.indexBuffer=n}destroy(){for(let e=0;e<this.batches.length;e++)this.batches[e].destroy();this.batches=null;for(let e=0;e<this._elements.length;e++)this._elements[e].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}class Rs{constructor(e,t){this.state=Se.for2d(),this._batches=Object.create(null),this._geometries=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}buildStart(e){if(!this._batches[e.uid]){const t=new Bs;this._batches[e.uid]=t,this._geometries[t.uid]=new Ps}this._activeBatch=this._batches[e.uid],this._activeGeometry=this._geometries[this._activeBatch.uid],this._activeBatch.begin()}addToBatch(e){this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){const t=this._activeBatch,i=this._activeGeometry;t.finish(e),i.indexBuffer.data=t.indexBuffer,i.indexBuffer.update(t.indexSize*4),i.buffers[0].data=t.attributeBuffer.float32View}upload(e){const t=this._batches[e.uid],i=this._geometries[t.uid];t.dirty&&(t.dirty=!1,i.buffers[0].update(t.attributeSize*4))}execute(e){if(e.action==="startBatch"){const t=e.batcher,i=this._geometries[t.uid];this._adaptor.start(this,i)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor.destroy(),this._adaptor=null;for(const e in this._batches)this._batches[e].destroy();this._batches=null;for(const e in this._geometries)this._geometries[e].destroy();this._geometries=null}}Rs.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"batch"};function fy(r){const e=r.split(/([\n{}])/g).map(i=>i.trim()).filter(i=>i.length);let t="";return e.map(i=>{let n=t+i;return i==="{"?t+="    ":i==="}"&&(t=t.substr(0,t.length-4),n=t+i),n}).join(`
`)}const ks={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},mr={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}},Zc={name:"texture-bit",fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;

         
        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},Qc={name:"texture-bit",fragment:{header:`
        uniform sampler2D uTexture;

         
        `,main:`
            outColor = texture(uTexture, vUV);
        `}};class Jc extends he{constructor({original:e,view:t}){super(),this.uid=X("renderable"),this.view=t,this._original=e,this.layerTransform=new k,this.layerColor=4294967295,this.layerVisibleRenderable=3,this.view.owner=this}get layerBlendMode(){return this._original.layerBlendMode}onViewUpdate(){this.didViewUpdate=!0,this._original.layerGroup.onChildViewUpdate(this)}get isRenderable(){return this._original.isRenderable}}function ed(r,e){const t=r.root,i=r.instructionSet;i.reset(),e.batch.buildStart(i),e.blendMode.buildStart(),e.colorMask.buildStart(),t.sortableChildren&&t.sortChildren(),td(t,i,e,!0),e.batch.buildEnd(i),e.blendMode.buildEnd(i)}function br(r,e,t){r.layerVisibleRenderable<3||!r.includeInBuild||(r.sortableChildren&&r.sortChildren(),r.isSimple?gy(r,e,t):td(r,e,t,!1))}function gy(r,e,t){const i=r.view;if(i&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[i.renderPipeId].addRenderable(r,e)),!r.isLayerRoot){const n=r.children,s=n.length;for(let o=0;o<s;o++)br(n[o],e,t)}}function td(r,e,t,i){var n;if(i){const s=r.layerGroup;if(s.root.view){const o=(n=s.proxyRenderable)!=null?n:my(s);o&&(t.blendMode.setBlendMode(o,o.layerBlendMode,e),t[o.view.renderPipeId].addRenderable(o,e))}}else for(let s=0;s<r.effects.length;s++){const o=r.effects[s];t[o.pipe].push(o,r,e)}if(!i&&r.isLayerRoot)t.layer.addLayerGroup(r.layerGroup,e);else{const s=r.view;s&&(t.blendMode.setBlendMode(r,r.layerBlendMode,e),r.didViewUpdate=!1,t[s.renderPipeId].addRenderable(r,e));const o=r.children;if(o.length)for(let a=0;a<o.length;a++)br(o[a],e,t)}if(!i)for(let s=r.effects.length-1;s>=0;s--){const o=r.effects[s];t[o.pipe].pop(o,r,e)}}function my(r){const e=r.root;r.proxyRenderable=new Jc({original:e,view:e.view})}const by=new pe;class vy extends Ur{constructor(){super({filters:[new Bc({sprite:new Oe(A.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class Os{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,t,i){const n=this._renderer;if(n.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:t}),e.renderMaskToTexture){const s=e.mask;s.includeInBuild=!0,br(s,i,n.renderPipes),s.includeInBuild=!1}n.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:t,canBundle:!1})}pop(e,t,i){this._renderer.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const t=this._renderer,i=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const n=N.get(vy);if(i){e.mask.mask.measurable=!0;const s=Yt(e.mask.mask,!0,by);e.mask.mask.measurable=!1,s.ceil();const o=ue.getOptimalTexture(s.width,s.height,1,!1),a=t.renderTarget.push(o,!0);t.globalUniforms.push({projectionData:a,offset:s,worldColor:4294967295});const l=n.sprite;l.texture=o,l.worldTransform.tx=s.minX,l.worldTransform.ty=s.minY,this._activeMaskStage.push({filterEffect:n,maskedContainer:e.maskedContainer,filterTexture:o})}else n.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:n,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const n=this._activeMaskStage[this._activeMaskStage.length-1];i&&(t.renderTarget.pop(),t.globalUniforms.pop()),t.filter.push({type:"filter",action:"pushFilter",container:n.maskedContainer,filterEffect:n.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){t.filter.pop();const n=this._activeMaskStage.pop();i&&ue.returnTexture(n.filterTexture),N.return(n.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}Os.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"alphaMask"};class Fs{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,t,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;n[this._colorStackIndex]=n[this._colorStackIndex-1]&e.mask;const s=this._colorStack[this._colorStackIndex];s!==this._currentColor&&(this._currentColor=s,i.add({type:"colorMask",colorMask:s,canBundle:!1})),this._colorStackIndex++}pop(e,t,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;this._colorStackIndex--;const s=n[this._colorStackIndex-1];s!==this._currentColor&&(this._currentColor=s,i.add({type:"colorMask",colorMask:s,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}Fs.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"colorMask"};class yy{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1}addBounds(e,t){ti(this.mask,e,t)}addLocalBounds(e,t){ri(this.mask,e,t)}containsPoint(e,t){const i=this.mask;return t(i,e)}reset(){this.mask.measurable=!0,this.mask=null}destroy(){this.reset()}}var me=(r=>(r[r.NONE=0]="NONE",r[r.COLOR=16384]="COLOR",r[r.STENCIL=1024]="STENCIL",r[r.DEPTH=256]="DEPTH",r[r.COLOR_DEPTH=16640]="COLOR_DEPTH",r[r.COLOR_STENCIL=17408]="COLOR_STENCIL",r[r.DEPTH_STENCIL=1280]="DEPTH_STENCIL",r[r.ALL=17664]="ALL",r))(me||{}),ne=(r=>(r[r.DISABLED=0]="DISABLED",r[r.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",r[r.MASK_ACTIVE=2]="MASK_ACTIVE",r[r.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",r[r.NONE=4]="NONE",r))(ne||{});class Us{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,t,i){const n=e,s=this._renderer;s.renderPipes.batch.break(i),s.renderPipes.blendMode.setBlendMode(n.mask,"none",i),i.add({type:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const o=n.mask;o.includeInBuild=!0,this._maskHash.has(n)||this._maskHash.set(n,{instructionsStart:0,instructionsLength:0});const a=this._maskHash.get(n);a.instructionsStart=i.instructionSize,br(o,i,s.renderPipes),o.includeInBuild=!1,s.renderPipes.batch.break(i),i.add({type:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const l=i.instructionSize-a.instructionsStart-1;a.instructionsLength=l;const u=s.renderTarget.renderTarget.uid;this._maskStackHash[u]===void 0&&(this._maskStackHash[u]=0),this._maskStackHash[u]++}pop(e,t,i){const n=e,s=this._renderer,o=s.renderTarget.renderTarget.uid;this._maskStackHash[o]--,s.renderPipes.batch.break(i),s.renderPipes.blendMode.setBlendMode(n.mask,"none",i),i.add({type:"stencilMask",action:"popMaskBegin",canBundle:!1});const a=this._maskHash.get(e);if(this._maskStackHash[o]!==0)for(let l=0;l<a.instructionsLength;l++)i.instructions[i.instructionSize++]=i.instructions[a.instructionsStart++];i.add({type:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var t;const i=this._renderer,n=i.renderTarget.renderTarget.uid;let s=(t=this._maskStackHash[n])!=null?t:0;e.action==="pushMaskBegin"?(s++,i.stencil.setStencilMode(ne.RENDERING_MASK_ADD,s),i.colorMask.setMask(0)):e.action==="pushMaskEnd"?(i.stencil.setStencilMode(ne.MASK_ACTIVE,s),i.colorMask.setMask(15)):e.action==="popMaskBegin"?(s--,s!==0?(i.stencil.setStencilMode(ne.RENDERING_MASK_REMOVE,s),i.colorMask.setMask(0)):i.renderTarget.clear(me.STENCIL)):e.action==="popMaskEnd"&&(s===0?i.stencil.setStencilMode(ne.DISABLED,s):i.stencil.setStencilMode(ne.MASK_ACTIVE,s),i.colorMask.setMask(15)),this._maskStackHash[n]=s}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}Us.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"stencilMask"};var vr=(r=>(r[r.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",r[r.ARRAY_BUFFER=34962]="ARRAY_BUFFER",r[r.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",r))(vr||{});class rd{constructor(e,t){this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.type=t}}class Is{constructor(e){this._gpuBuffers=Object.create(null),this._boundBufferBases=Object.create(null),this._renderer=e}destroy(){const e=this;this.destroyAll(!0),this._renderer=null,this._gl=null,this._gpuBuffers=null,e._boundBufferBases=null}contextChange(){this.destroyAll(!0),this._gl=this._renderer.gl}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{_gl:t}=this,i=this.getGlBuffer(e);t.bindBuffer(i.type,i.buffer)}bindBufferBase(e,t){const{_gl:i}=this;if(this._boundBufferBases[t]!==e){const n=this.getGlBuffer(e);this._boundBufferBases[t]=e,i.bindBufferBase(i.UNIFORM_BUFFER,t,n.buffer)}}bindBufferRange(e,t,i){const{_gl:n}=this;i=i||0;const s=this.getGlBuffer(e);n.bindBufferRange(n.UNIFORM_BUFFER,t||0,s.buffer,i*256,256)}updateBuffer(e){const{_gl:t}=this,i=this.getGlBuffer(e);if(e._updateID===i.updateID)return i;if(i.updateID=e._updateID,t.bindBuffer(i.type,i.buffer),i.byteLength>=e.data.byteLength)t.bufferSubData(i.type,0,e.data,0,e._updateSize/4);else{const n=e.descriptor.usage&H.STATIC?t.STATIC_DRAW:t.DYNAMIC_DRAW;i.byteLength=e.data.byteLength,t.bufferData(i.type,e.data,n)}return i}destroyAll(e){const t=this._gl;if(!e)for(const i in this._gpuBuffers)t.deleteBuffer(this._gpuBuffers[i].buffer);this._gpuBuffers={}}onBufferDestroy(e,t){const i=this._gpuBuffers[e.uid],n=this._gl;t||n.deleteBuffer(i.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{_gl:t}=this;let i=vr.ARRAY_BUFFER;e.descriptor.usage&H.INDEX?i=vr.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&H.UNIFORM&&(i=vr.UNIFORM_BUFFER);const n=new rd(t.createBuffer(),i);return this._gpuBuffers[e.uid]=n,e.on("destroy",this.onBufferDestroy,this),n}}Is.extension={type:[y.WebGLSystem],name:"buffer"};class mi{constructor(e){this._renderer=e,this.webGLVersion=1,this.extensions=Object.create(null),this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this._renderer.gl=e,e.isContextLost()&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").restoreContext()}init(e){var t;if(e!=null&&e.context)this.initFromContext(e.context);else{const i=this._renderer.background.alpha<1,n=(t=e.premultipliedAlpha)!=null?t:!0,s=e.antialias&&!this._renderer.backBuffer.useBackBuffer;this.initFromOptions({alpha:i,premultipliedAlpha:n,antialias:s,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference})}}initFromContext(e){this.gl=e,this.validateContext(e),this._renderer.runners.contextChange.emit(e);const t=this._renderer.view.canvas;t.addEventListener("webglcontextlost",this.handleContextLost,!1),t.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}initFromOptions(e){const t=this.createContext(this._renderer.view.canvas,e);this.initFromContext(t)}createContext(e,t){const i=e.getContext("webgl2",t);return this.webGLVersion=2,this.gl=i,this.getExtensions(),this.gl}getExtensions(){const{gl:e}=this,t={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc")};Object.assign(this.extensions,t,{colorBufferFloat:e.getExtension("EXT_color_buffer_float")})}handleContextLost(e){e.preventDefault()}handleContextRestored(){this._renderer.runners.contextChange.emit(this.gl)}destroy(){const e=this._renderer.view.canvas;this._renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}validateContext(e){const t=e.getContextAttributes(),i="WebGL2RenderingContext"in globalThis&&e instanceof globalThis.WebGL2RenderingContext;i&&(this.webGLVersion=2),t&&t.stencil;const n=i||!!e.getExtension("OES_element_index_uint");this.supports.uint32Indices=n}}mi.extension={type:[y.WebGLSystem],name:"context"},mi.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"default"};var bi=(r=>(r[r.RGBA=6408]="RGBA",r[r.RGB=6407]="RGB",r[r.RG=33319]="RG",r[r.RED=6403]="RED",r[r.RGBA_INTEGER=36249]="RGBA_INTEGER",r[r.RGB_INTEGER=36248]="RGB_INTEGER",r[r.RG_INTEGER=33320]="RG_INTEGER",r[r.RED_INTEGER=36244]="RED_INTEGER",r[r.ALPHA=6406]="ALPHA",r[r.LUMINANCE=6409]="LUMINANCE",r[r.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",r[r.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",r[r.DEPTH_STENCIL=34041]="DEPTH_STENCIL",r))(bi||{}),Gs=(r=>(r[r.TEXTURE_2D=3553]="TEXTURE_2D",r[r.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",r[r.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",r[r.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",r[r.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",r[r.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",r[r.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",r[r.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",r))(Gs||{}),id=(r=>(r[r.CLAMP=33071]="CLAMP",r[r.REPEAT=10497]="REPEAT",r[r.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",r))(id||{}),z=(r=>(r[r.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",r[r.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",r[r.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",r[r.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",r[r.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",r[r.UNSIGNED_INT=5125]="UNSIGNED_INT",r[r.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",r[r.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",r[r.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",r[r.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",r[r.BYTE=5120]="BYTE",r[r.SHORT=5122]="SHORT",r[r.INT=5124]="INT",r[r.FLOAT=5126]="FLOAT",r[r.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",r[r.HALF_FLOAT=36193]="HALF_FLOAT",r))(z||{});const nd={uint8x2:{type:z.UNSIGNED_BYTE,size:2,normalised:!1},uint8x4:{type:z.UNSIGNED_BYTE,size:4,normalised:!1},sint8x2:{type:z.BYTE,size:2,normalised:!1},sint8x4:{type:z.BYTE,size:4,normalised:!1},unorm8x2:{type:z.UNSIGNED_BYTE,size:2,normalised:!0},unorm8x4:{type:z.UNSIGNED_BYTE,size:4,normalised:!0},snorm8x2:{type:z.BYTE,size:2,normalised:!0},snorm8x4:{type:z.BYTE,size:4,normalised:!0},uint16x2:{type:z.UNSIGNED_SHORT,size:2,normalised:!1},uint16x4:{type:z.UNSIGNED_SHORT,size:4,normalised:!1},sint16x2:{type:z.SHORT,size:2,normalised:!1},sint16x4:{type:z.SHORT,size:4,normalised:!1},unorm16x2:{type:z.UNSIGNED_SHORT,size:2,normalised:!0},unorm16x4:{type:z.UNSIGNED_SHORT,size:4,normalised:!0},snorm16x2:{type:z.SHORT,size:2,normalised:!0},snorm16x4:{type:z.SHORT,size:4,normalised:!0},float16x2:{type:z.HALF_FLOAT,size:2,normalised:!1},float16x4:{type:z.HALF_FLOAT,size:4,normalised:!1},float32:{type:z.FLOAT,size:1,normalised:!1},float32x2:{type:z.FLOAT,size:2,normalised:!1},float32x3:{type:z.FLOAT,size:3,normalised:!1},float32x4:{type:z.FLOAT,size:4,normalised:!1},uint32:{type:z.UNSIGNED_INT,size:1,normalised:!1},uint32x2:{type:z.UNSIGNED_INT,size:2,normalised:!1},uint32x3:{type:z.UNSIGNED_INT,size:3,normalised:!1},uint32x4:{type:z.UNSIGNED_INT,size:4,normalised:!1},sint32:{type:z.INT,size:1,normalised:!1},sint32x2:{type:z.INT,size:2,normalised:!1},sint32x3:{type:z.INT,size:3,normalised:!1},sint32x4:{type:z.INT,size:4,normalised:!1}};function sd(r){var e;return(e=nd[r])!=null?e:nd.float32}const $s={5126:4,5123:2,5121:1},xy={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class Ls{constructor(e){this._geometryVaoHash={},this._renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!0}contextChange(){this.gl=this._renderer.gl}bind(e,t){const i=this.gl;this._activeGeometry=e;const n=this.getVao(e,t);this._activeVao!==n&&(this._activeVao=n,i.bindVertexArray(n)),this.updateBuffers()}reset(){this.unbind()}updateBuffers(){const e=this._activeGeometry,t=this._renderer.buffer;for(let i=0;i<e.buffers.length;i++){const n=e.buffers[i];t.updateBuffer(n)}}checkCompatibility(e,t){const i=e.attributes,n=t.attributeData;for(const s in n)if(!i[s])throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`)}getSignature(e,t){const i=e.attributes,n=t.attributeData,s=["g",e.uid];for(const o in i)n[o]&&s.push(o,n[o].location);return s.join("-")}getVao(e,t){var i;return((i=this._geometryVaoHash[e.uid])==null?void 0:i[t.key])||this.initGeometryVao(e,t)}initGeometryVao(e,t,i=!0){const n=this._renderer.gl,s=this._renderer.buffer;this._renderer.shader.getProgramData(t),this.checkCompatibility(e,t);const o=this.getSignature(e,t);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]=Object.create(null),e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let l=a[o];if(l)return a[t.key]=l,l;const u=e.buffers,h=e.attributes,c={},p={};for(const d in u)c[d]=0,p[d]=0;for(const d in h)!h[d].size&&t.attributeData[d]?h[d].size=t.attributeData[d].size:h[d].size,c[h[d].buffer.uid]+=h[d].size*$s[h[d].type];for(const d in h){const f=h[d],m=f.size;f.stride===void 0&&(c[f.buffer.uid]===m*$s[f.type]?f.stride=0:f.stride=c[f.buffer.uid]),f.start===void 0&&(f.start=p[f.buffer.uid],p[f.buffer.uid]+=m*$s[f.type])}l=n.createVertexArray(),n.bindVertexArray(l);for(let d=0;d<u.length;d++){const f=u[d];s.bind(f)}return this.activateVao(e,t),a[t.key]=l,a[o]=l,n.bindVertexArray(null),l}onGeometryDestroy(e,t){const i=this._geometryVaoHash[e.uid],n=this.gl;if(i){if(t)for(const s in i)this._activeVao!==i[s]&&this.unbind(),n.deleteVertexArray(i[s]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const t=this.gl;for(const i in this._geometryVaoHash){if(e)for(const n in this._geometryVaoHash[i]){const s=this._geometryVaoHash[i];this._activeVao!==s&&this.unbind(),t.deleteVertexArray(s[n])}this._geometryVaoHash[i]=null}}activateVao(e,t){const i=this._renderer.gl,n=this._renderer.buffer,s=e.attributes;e.indexBuffer&&n.bind(e.indexBuffer);let o=null;for(const a in s){const l=s[a],u=l.buffer,h=n.getGlBuffer(u);if(t.attributeData[a]){o!==h&&(n.bind(u),o=h);const c=t.attributeData[a].location;i.enableVertexAttribArray(c);const p=sd(l.format);if(i.vertexAttribPointer(c,p.size,p.type,p.normalised,l.stride,l.offset),l.instance)if(this.hasInstance)i.vertexAttribDivisor(c,1);else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,t,i,n){const{gl:s}=this._renderer,o=this._activeGeometry,a=xy[o.topology||e];if(o.indexBuffer){const l=o.indexBuffer.data.BYTES_PER_ELEMENT,u=l===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;o.instanced?s.drawElementsInstanced(a,t||o.indexBuffer.data.length,u,(i||0)*l,o.instanceCount||1):s.drawElements(a,t||o.indexBuffer.data.length,u,(i||0)*l)}else o.instanced?s.drawArraysInstanced(a,i,t||o.getSize(),n||1):s.drawArrays(a,i,t||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this._renderer=null,this.gl=null,this._activeVao=null,this._activeGeometry=null}}Ls.extension={type:[y.WebGLSystem],name:"geometry"};var _y=Object.defineProperty,od=Object.getOwnPropertySymbols,wy=Object.prototype.hasOwnProperty,Ty=Object.prototype.propertyIsEnumerable,ad=(r,e,t)=>e in r?_y(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ld=(r,e)=>{for(var t in e||(e={}))wy.call(e,t)&&ad(r,t,e[t]);if(od)for(var t of od(e))Ty.call(e,t)&&ad(r,t,e[t]);return r};const Sy=new _e({vertex:`
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
        }`,name:"big-triangle"}),ud=new Ee({glProgram:Sy,resources:{uTexture:A.WHITE.source}}),hd=class{constructor(r){this.useBackBuffer=!1,this._useBackBufferThisRender=!1,this._renderer=r}init(r={}){const{useBackBuffer:e,antialias:t}=ld(ld({},hd.defaultOptions),r);this.useBackBuffer=e,this._antialias=t}renderStart({target:r,clear:e,clearColor:t}){if(this._useBackBufferThisRender=this.useBackBuffer&&!!r,this.useBackBuffer){const i=this._renderer.renderTarget.getRenderTarget(r);this._targetTexture=i.colorTexture,r=this._getBackBufferTexture(i.colorTexture)}t!=null||(t=this._renderer.background.colorRgba),this._renderer.renderTarget.start(r,e,t)}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){const r=this._renderer;if(r.renderTarget.finishRenderPass(),!this._useBackBufferThisRender)return;const e=r.gl;r.renderTarget.bind(this._targetTexture,!1),ud.resources.uTexture=this._backBufferTexture.source,r.shader.bind(ud,!1),r.state.set(Se.for2d()),e.drawArrays(e.TRIANGLES,0,3)}_getBackBufferTexture(r){const e=r.source;return this._backBufferTexture=this._backBufferTexture||new A({source:new le({width:e.width,height:e.height,resolution:e._resolution,antialias:this._antialias})}),this._backBufferTexture.source.resize(e.width,e.height,e._resolution),this._backBufferTexture}destroy(){this._backBufferTexture&&(this._backBufferTexture.destroy(),this._backBufferTexture=null)}};let vi=hd;vi.extension={type:[y.WebGLSystem],name:"backBuffer"},vi.defaultOptions={useBackBuffer:!1};class Ds{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}}Ds.extension={type:[y.WebGLSystem],name:"colorMask"};class zs{constructor(e){this.commandFinished=Promise.resolve(),this._renderer=e}setGeometry(e,t){this._renderer.geometry.bind(e,t.glProgram)}finishRenderPass(){}draw(e){const t=this._renderer,{geometry:i,shader:n,state:s,skipSync:o,topology:a,size:l,start:u,instanceCount:h}=e;t.shader.bind(n,o),t.geometry.bind(i,t.shader.activeProgram),s&&t.state.set(s),t.geometry.draw(a,l,u,h)}destroy(){const e=this;e._renderer=null}}zs.extension={type:[y.WebGLSystem],name:"encoder"};class cd{constructor(){this.width=-1,this.height=-1,this.msaaRenderBuffer=[],this.msaa=!1,this.dirtyId=-1}}function Ns(r){const e=r.colorTexture.source.resource;return e instanceof HTMLCanvasElement&&document.body.contains(e)}function dd(r,e,t,i,n,s){const o=s?1:-1;return r.identity(),r.a=1/i*2,r.d=o*(1/n*2),r.tx=-1-e*r.a,r.ty=-o-t*r.d,r}var Py=Object.defineProperty,pd=Object.getOwnPropertySymbols,Ay=Object.prototype.hasOwnProperty,Ey=Object.prototype.propertyIsEnumerable,fd=(r,e,t)=>e in r?Py(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,gd=(r,e)=>{for(var t in e||(e={}))Ay.call(e,t)&&fd(r,t,e[t]);if(pd)for(var t of pd(e))Ey.call(e,t)&&fd(r,t,e[t]);return r};const md=class{constructor(r={}){if(this.uid=X("renderTarget"),this.width=0,this.height=0,this.resolution=1,this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._projectionMatrix=new k,this._size=new Float32Array(2),r=gd(gd({},md.defaultDescriptor),r),this.width=r.width,this.height=r.height,this.resolution=r.resolution,this.stencil=r.stencil,this._viewport=new K(0,0,this.width,this.height),typeof r.colorTextures=="number")for(let e=0;e<r.colorTextures;e++)this.colorTextures.push(new A({source:new le({width:this.width,height:this.height,resolution:r.resolution,antialias:r.antialias})}));else{this.colorTextures=[...r.colorTextures];const e=this.colorTexture.source;this._resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),r.depthTexture&&(this.depthTexture=new A({source:new le({width:this.width,height:this.height,resolution:this.resolution,format:"stencil8"})}))}get size(){const r=this._size;return r[0]=this.pixelWidth,r[1]=this.pixelHeight,r}get pixelWidth(){return this.width*this.resolution}get pixelHeight(){return this.height*this.resolution}get colorTexture(){return this.colorTextures[0]}get projectionMatrix(){const r=this.colorTexture;return dd(this._projectionMatrix,0,0,r.frameWidth,r.frameHeight,!this.isRoot),this._projectionMatrix}get viewport(){const r=this.colorTexture,e=r.source,t=e.pixelWidth,i=e.pixelHeight,n=this._viewport,s=r.layout.frame;return n.x=s.x*t|0,n.y=s.y*i|0,n.width=s.width*t|0,n.height=s.height*i|0,n}onSourceResize(r){this._resize(r.width,r.height,r._resolution,!0)}_resize(r,e,t=this.resolution,i=!1){this.width=r,this.height=e,this.resolution=t,this.dirtyId++,this.colorTextures.forEach((n,s)=>{i&&s===0||n.source.resize(r,e,t)}),this.depthTexture&&this.depthTexture.source.resize(r,e,t)}destroy(){throw new Error("Method not implemented.")}};let kt=md;kt.defaultDescriptor={width:0,height:0,resolution:1,colorTextures:1,stencil:!0,antialias:!1};class yi{constructor(e){this.items=[],this._name=e}emit(e,t,i,n,s,o,a,l){const{name:u,items:h}=this;for(let c=0,p=h.length;c<p;c++)h[c][u](e,t,i,n,s,o,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const t=this.items.indexOf(e);return t!==-1&&this.items.splice(t,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}class bd extends le{constructor(e){var t;e.resource||(e.resource=D.ADAPTER.createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),(t=e.alphaMode)!=null||(e.alphaMode="premultiply-alpha-on-upload"),super(e),this.uploadMethodId="image",this.autoDensity=e.autoDensity;const i=e.resource;(this.pixelWidth!==i.width||this.pixelWidth!==i.height)&&this.resizeCanvas()}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight}resize(e=this.width,t=this.height,i=this._resolution){super.resize(e,t,i),this.resizeCanvas()}}var Cy=Object.defineProperty,vd=Object.getOwnPropertySymbols,My=Object.prototype.hasOwnProperty,By=Object.prototype.propertyIsEnumerable,yd=(r,e,t)=>e in r?Cy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ry=(r,e)=>{for(var t in e||(e={}))My.call(e,t)&&yd(r,t,e[t]);if(vd)for(var t of vd(e))By.call(e,t)&&yd(r,t,e[t]);return r};const Hs=new Map;function xi(r,e){if(!Hs.has(r)){const t=new A({source:new bd(Ry({resource:r},e))});Hs.set(r,t)}return Hs.get(r)}class js{constructor(e){this.onRenderTargetChange=new yi("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._clearColorCache=[0,0,0,0],this._viewPortCache={x:0,y:0,width:0,height:0},this.rootProjectionMatrix=new k,this._renderer=e}contextChange(e){this._gl=e}start(e,t=!0,i){this._renderTargetStack.length=0;const n=this.getRenderTarget(e);this.rootRenderTarget=n,this.renderingToScreen=Ns(this.rootRenderTarget),this.rootProjectionMatrix=n.projectionMatrix,this.push(n,t,i)}bind(e,t=!0,i){const n=this.getRenderTarget(e);this.renderTarget=n;const s=this.getGpuRenderTarget(n);n.dirtyId!==s.dirtyId&&(s.dirtyId=n.dirtyId,this._resizeGpuRenderTarget(n));const o=this._gl;o.bindFramebuffer(o.FRAMEBUFFER,s.framebuffer),n.colorTextures.forEach(h=>{this._renderer.texture.unbind(h)});const a=n.viewport;let l=a.y;n.isRoot&&(l=this._renderer.view.canvas.height-a.height);const u=this._viewPortCache;return(u.x!==a.x||u.y!==l||u.width!==a.width||u.height!==a.height)&&(u.x=a.x,u.y=l,u.width=a.width,u.height=a.height,o.viewport(a.x,l,a.width,a.height)),this.clear(t,i),this.onRenderTargetChange.emit(n),n}clear(e,t){if(!e)return;typeof e=="boolean"&&(e=e?me.ALL:me.NONE);const i=this._gl;if(e&me.COLOR){t!=null||(t=this._defaultClearColor);const n=this._clearColorCache,s=t;(n[0]!==s[0]||n[1]!==s[1]||n[2]!==s[2]||n[3]!==s[3])&&(n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],i.clearColor(s[0],s[1],s[2],s[3]))}i.clear(e)}push(e,t=!0,i){const n=this.bind(e,t,i);return this._renderTargetStack.push(n),n}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=xi(e)),e instanceof kt?t=e:e instanceof A&&(t=new kt({colorTextures:[e]}),e.source.resource instanceof HTMLCanvasElement&&(t.isRoot=!0),e.source.on("destroy",()=>{t.destroy()})),this._renderSurfaceToRenderTargetHash.set(e,t),t}finishRenderPass(e){e=e||this.renderTarget;const t=this.getGpuRenderTarget(e);if(!t.msaa)return;const i=this._renderer.gl;i.bindFramebuffer(i.FRAMEBUFFER,t.resolveTargetFramebuffer),i.bindFramebuffer(i.READ_FRAMEBUFFER,t.framebuffer),i.blitFramebuffer(0,0,t.width,t.height,0,0,t.width,t.height,i.COLOR_BUFFER_BIT,i.NEAREST),i.bindFramebuffer(i.FRAMEBUFFER,t.framebuffer)}copyToTexture(e,t,i,n){const s=this._renderer,o=this.getGpuRenderTarget(e),a=s.gl;return this.finishRenderPass(e),a.bindFramebuffer(a.FRAMEBUFFER,o.resolveTargetFramebuffer),s.texture.bind(t,0),a.copyTexSubImage2D(a.TEXTURE_2D,0,0,0,i.x,i.y,n.width,n.height),t}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){const t=this._renderer.gl,i=new cd;return e.colorTexture.source.resource instanceof HTMLCanvasElement?(this._gpuRenderTargetHash[e.uid]=i,i.framebuffer=null,i):(this._initColor(e,i),e.stencil&&this._initStencil(i),t.bindFramebuffer(t.FRAMEBUFFER,null),this._gpuRenderTargetHash[e.uid]=i,i)}_resizeGpuRenderTarget(e){if(e.isRoot)return;const t=this.getGpuRenderTarget(e);this._resizeColor(e,t),e.stencil&&this._resizeStencil(t)}_initColor(e,t){const i=this._renderer,n=i.gl,s=n.createFramebuffer();if(t.resolveTargetFramebuffer=s,n.bindFramebuffer(n.FRAMEBUFFER,s),t.width=e.colorTexture.source.pixelWidth,t.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((o,a)=>{const l=o.source;l.antialias&&(t.msaa=!0),i.texture.bindSource(l,0);const u=i.texture.getGlSource(l).texture;n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+a,3553,u,0)}),t.msaa){const o=n.createFramebuffer();t.framebuffer=o,n.bindFramebuffer(n.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=n.createRenderbuffer();t.msaaRenderBuffer[l]=u})}else t.framebuffer=s}_resizeColor(e,t){const i=e.colorTexture.source;if(t.width=i.pixelWidth,t.height=i.pixelHeight,e.colorTextures.forEach((n,s)=>{s!==0&&n.source.resize(i.width,i.height,i._resolution)}),t.msaa){const n=this._renderer,s=n.gl,o=t.framebuffer;s.bindFramebuffer(s.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=a.source;n.texture.bindSource(u,0);const h=n.texture.getGlSource(u).internalFormat,c=t.msaaRenderBuffer[l];s.bindRenderbuffer(s.RENDERBUFFER,c),s.renderbufferStorageMultisample(s.RENDERBUFFER,4,h,u.pixelWidth,u.pixelHeight),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+l,s.RENDERBUFFER,c)})}}_initStencil(e){const t=this._renderer.gl,i=t.createRenderbuffer();e.depthStencilRenderBuffer=i,t.bindRenderbuffer(t.RENDERBUFFER,i),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,i)}_resizeStencil(e){const t=this._renderer.gl;t.bindRenderbuffer(t.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?t.renderbufferStorageMultisample(t.RENDERBUFFER,4,t.DEPTH24_STENCIL8,e.width,e.height):t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH24_STENCIL8,e.width,e.height)}}js.extension={type:[y.WebGLSystem],name:"renderTarget"};const ke=[];ke[ne.NONE]=void 0,ke[ne.DISABLED]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilReadMask:0,stencilBack:{compare:"always",passOp:"keep"}},ke[ne.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},ke[ne.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},ke[ne.RENDERING_MASK_REMOVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"decrement-clamp"}},ke[ne.MASK_ACTIVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilBack:{compare:"equal",passOp:"keep"}};class Ws{constructor(e){this._stencilCache={enabled:!1,stencilReference:0,stencilMode:ne.NONE},this._renderTargetStencilState=Object.create(null),e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this._gl=e,this._comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this._stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP}}onRenderTargetChange(e){if(this._activeRenderTarget===e)return;this._activeRenderTarget=e;let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:ne.DISABLED,stencilReference:0}),this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const i=this._renderTargetStencilState[this._activeRenderTarget.uid],n=this._gl,s=ke[e],o=this._stencilCache;if(i.stencilMode=e,i.stencilReference=t,e===ne.DISABLED){this._stencilCache.enabled&&(this._stencilCache.enabled=!1,n.disable(n.STENCIL_TEST));return}this._stencilCache.enabled||(this._stencilCache.enabled=!0,n.enable(n.STENCIL_TEST)),(e!==o.stencilMode||o.stencilReference!==t)&&(o.stencilMode=e,o.stencilReference=t,n.stencilFunc(this._comparisonFuncMapping[s.stencilBack.compare],t,255),n.stencilOp(n.KEEP,n.KEEP,this._stencilOpsMapping[s.stencilBack.passOp]))}}Ws.extension={type:[y.WebGLSystem],name:"stencil"};class ky{}class xd{constructor(e,t){this.program=e,this.uniformData=t,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}class _i extends he{constructor({buffer:e,offset:t,size:i}){super(),this.uid=X("buffer"),this.touched=0,this.resourceType="bufferResource",this.resourceId=X("buffer"),this.bufferResource=!0,this.buffer=e,this.offset=t,this.size=i,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this.resourceId=X("buffer"),this.emit("change",this)}destroy(e=!1){e&&this.buffer.destroy(),this.buffer=null}}function Vs(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}function Ys(r){const e=new Array(r);for(let t=0;t<e.length;t++)e[t]=!1;return e}function Xs(r,e){switch(r){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return Ys(2*e);case"bvec3":return Ys(3*e);case"bvec4":return Ys(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const Oy={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function _d(r){return Oy[r]}let wi=null;const wd={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function qs(r,e){if(!wi){const t=Object.keys(wd);wi={};for(let i=0;i<t.length;++i){const n=t[i];wi[r[n]]=wd[n]}}return wi[e]}function Td(r,e){const t={},i=e.getProgramParameter(r,e.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=e.getActiveAttrib(r,n);if(s.name.startsWith("gl_"))continue;const o=qs(e,s.type),a={type:o,name:s.name,size:_d(o),location:e.getAttribLocation(r,s.name)};t[s.name]=a}return t}function Sd(r,e){const t={},i=e.getProgramParameter(r,e.ACTIVE_UNIFORM_BLOCKS);for(let n=0;n<i;n++){const s=e.getActiveUniformBlockName(r,n),o=e.getUniformBlockIndex(r,s),a=e.getActiveUniformBlockParameter(r,n,e.UNIFORM_BLOCK_DATA_SIZE);t[s]={name:s,index:o,size:a}}return t}function Pd(r,e){const t={},i=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let n=0;n<i;n++){const s=e.getActiveUniform(r,n),o=s.name.replace(/\[.*?\]$/,""),a=!!s.name.match(/\[.*?\]$/),l=qs(e,s.type);t[o]={name:o,index:n,type:l,size:s.size,isArray:a,value:Xs(l,s.size)}}return t}function Ad(r,e){const t=r.getShaderSource(e).split(`
`).map((u,h)=>`${h}: ${u}`),i=r.getShaderInfoLog(e),n=i.split(`
`),s={},o=n.map(u=>parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(u=>u&&!s[u]?(s[u]=!0,!0):!1),a=[""];o.forEach(u=>{t[u-1]=`%c${t[u-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const l=t.join(`
`);a[0]=l,console.error(i),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function Ed(r,e,t,i){r.getProgramParameter(e,r.LINK_STATUS)||(r.getShaderParameter(t,r.COMPILE_STATUS)||Ad(r,t),r.getShaderParameter(i,r.COMPILE_STATUS)||Ad(r,i),console.error("PixiJS Error: Could not initialize shader."),r.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",r.getProgramInfoLog(e)))}function Cd(r,e){const t=Vs(r,r.VERTEX_SHADER,e.vertex),i=Vs(r,r.FRAGMENT_SHADER,e.fragment),n=r.createProgram();r.attachShader(n,t),r.attachShader(n,i);const s=e.transformFeedbackVaryings;s&&(typeof r.transformFeedbackVaryings!="function"||r.transformFeedbackVaryings(n,s.names,s.bufferMode==="separate"?r.SEPARATE_ATTRIBS:r.INTERLEAVED_ATTRIBS)),r.linkProgram(n),r.getProgramParameter(n,r.LINK_STATUS)||Ed(r,n,t,i),e.attributeData=Td(n,r),e.uniformData=Pd(n,r),e.uniformBlockData=Sd(n,r),r.deleteShader(t),r.deleteShader(i);const o={};for(const a in e.uniformData){const l=e.uniformData[a];o[a]={location:r.getUniformLocation(n,a),value:Xs(l.type,l.size)}}return new xd(n,o)}const De={textureCount:0,blockIndex:0};class Ks{constructor(e){this.activeProgram=null,this._programDataHash=Object.create(null),this._nextIndex=0,this._boundUniformsIdsToIndexHash=Object.create(null),this._boundIndexToUniformsHash=Object.create(null),this._renderer=e}contextChange(e){this._gl=e,this._maxBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}bind(e,t){if(this._setProgram(e.glProgram),t)return;De.textureCount=0,De.blockIndex=0;const i=this._gl,n=this.getProgramData(e.glProgram);for(const s in e.groups){const o=e.groups[s];for(const a in o.resources){const l=o.resources[a];if(l instanceof te)l.ubo?this.bindUniformBlock(l,e.uniformBindMap[s][a],De.blockIndex++):this._updateUniformGroup(l);else if(l instanceof _i)this.bindUniformBlock(l,e.uniformBindMap[s][a],De.blockIndex++);else if(l instanceof le){this._renderer.texture.bind(l,De.textureCount);const u=e.uniformBindMap[s][a],h=n.uniformData[u];h&&(h.value!==De.textureCount&&i.uniform1i(h.location,De.textureCount),De.textureCount++)}else l instanceof Jt}}}_updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this.activeProgram,De)}bindUniformBlock(e,t,i=0){const n=this._renderer.buffer,s=this.getProgramData(this.activeProgram),o=e.bufferResource;o&&this._renderer.uniformBuffer.updateUniformGroup(e),n.updateBuffer(e.buffer);let a=this._boundUniformsIdsToIndexHash[e.uid];if(a===void 0){const h=this._nextIndex++%this._maxBindings,c=this._boundIndexToUniformsHash[h];c&&(this._boundUniformsIdsToIndexHash[c.uid]=void 0),a=this._boundUniformsIdsToIndexHash[e.uid]=h,this._boundIndexToUniformsHash[h]=e,o?n.bindBufferRange(e.buffer,h,e.offset):n.bindBufferBase(e.buffer,h)}const l=this._gl,u=this.activeProgram.uniformBlockData[t].index;s.uniformBlockBindings[i]!==a&&(s.uniformBlockBindings[i]=a,l.uniformBlockBinding(s.program,u,a))}_setProgram(e){if(this.activeProgram===e)return;this.activeProgram=e;const t=this.getProgramData(e);this._gl.useProgram(t.program)}getProgramData(e){return this._programDataHash[e.key]||this._createProgramData(e)}_createProgramData(e){const t=e.key;return this._programDataHash[t]=Cd(this._gl,e),this._programDataHash[t]}destroy(){for(const e of Object.keys(this._programDataHash))this._programDataHash[e].destroy(),this._programDataHash[e]=null;this._programDataHash=null,this._boundUniformsIdsToIndexHash=null}}Ks.extension={type:[y.WebGLSystem],name:"shader"};let yr;function Fy(){if(typeof yr=="boolean")return yr;try{yr=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch(r){yr=!1}return yr}const Ti=[{test:r=>r.type==="float"&&r.size===1&&!r.isArray,code:r=>`
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
                }`}],Uy={float:`
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
    }`},Iy={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"};function Md(r,e){const t=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(const i in r.uniforms){const n=e[i];if(!n){r.uniforms[i]instanceof te?r.uniforms[i].ubo?t.push(`
                        renderer.shader.bindUniformBlock(uv.${i}, "${i}");
                    `):t.push(`
                        renderer.shader.updateUniformGroup(uv.${i});
                    `):r.uniforms[i]instanceof _i&&t.push(`
                        renderer.shader.bindBufferResource(uv.${i}, "${i}");
                    `);continue}const s=r.uniforms[i];let o=!1;for(let a=0;a<Ti.length;a++)if(Ti[a].test(n,s)){t.push(Ti[a].code(i,s)),o=!0;break}if(!o){const a=(n.size===1&&!n.isArray?Uy:Iy)[n.type].replace("location",`ud["${i}"].location`);t.push(`
            cu = ud["${i}"];
            cv = cu.value;
            v = uv["${i}"];
            ${a};`)}}return new Function("ud","uv","renderer","syncData",t.join(`
`))}class Zs{constructor(e){this.destroyed=!1,this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this._systemCheck(),this.gl=null,this._cache={}}_systemCheck(){if(!Fy())throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(e){this.gl=e}updateUniformGroup(e,t,i){const n=this._renderer.shader.getProgramData(t);(!e.isStatic||e.dirtyId!==n.uniformDirtyGroups[e.uid])&&(n.uniformDirtyGroups[e.uid]=e.dirtyId,this._getUniformSyncFunction(e,t)(n.uniformData,e.uniforms,this._renderer,i))}_getUniformSyncFunction(e,t){var i;return((i=this._uniformGroupSyncHash[e.signature])==null?void 0:i[t.key])||this._createUniformSyncFunction(e,t)}_createUniformSyncFunction(e,t){const i=this._uniformGroupSyncHash[e.signature]||(this._uniformGroupSyncHash[e.signature]={}),n=this._getSignature(e,t.uniformData,"u");return this._cache[n]||(this._cache[n]=Md(e,t.uniformData)),i[t.key]=this._cache[n],i[t.key]}_getSignature(e,t,i){const n=e.uniforms,s=[`${i}-`];for(const o in n)s.push(o),t[o]&&s.push(t[o].type);return s.join("-")}destroy(){this._renderer=null,this.destroyed=!0,this._cache=null}}Zs.extension={type:[y.WebGLSystem],name:"uniformGroup"};function Gy(r){return r=r.replaceAll("texture2D","texture").replaceAll("gl_FragColor","fragColor").replaceAll("varying","in"),r=`
        out vec4 fragColor;
    ${r}
    `,r}function Bd(r){const e={};return e.normal=[r.ONE,r.ONE_MINUS_SRC_ALPHA],e.add=[r.ONE,r.ONE],e.multiply=[r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.screen=[r.ONE,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[r.SRC_ALPHA,r.ONE,r.ONE,r.ONE],e["screen-npm"]=[r.SRC_ALPHA,r.ONE_MINUS_SRC_COLOR,r.ONE,r.ONE_MINUS_SRC_ALPHA],e.erase=[r.ZERO,r.ONE_MINUS_SRC_ALPHA],e}const $y=0,Ly=1,Dy=2,zy=3,Ny=4,Hy=5,Qs=class{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[$y]=this.setBlend,this.map[Ly]=this.setOffset,this.map[Dy]=this.setCullFace,this.map[zy]=this.setDepthTest,this.map[Ny]=this.setFrontFace,this.map[Hy]=this.setDepthMask,this.checks=[],this.defaultState=new Se,this.defaultState.blend=!0}contextChange(r){this.gl=r,this.blendModesMap=Bd(r),this.set(this.defaultState),this.reset()}set(r){if(r=r||this.defaultState,this.stateId!==r.data){let e=this.stateId^r.data,t=0;for(;e;)e&1&&this.map[t].call(this,!!(r.data&1<<t)),e=e>>1,t++;this.stateId=r.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,r)}forceState(r){r=r||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(r.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,r);this.stateId=r.data}setBlend(r){this._updateCheck(Qs._checkBlendMode,r),this.gl[r?"enable":"disable"](this.gl.BLEND)}setOffset(r){this._updateCheck(Qs._checkPolygonOffset,r),this.gl[r?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(r){this.gl[r?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(r){this.gl.depthMask(r)}setCullFace(r){this.gl[r?"enable":"disable"](this.gl.CULL_FACE)}setFrontFace(r){this.gl.frontFace(this.gl[r?"CW":"CCW"])}setBlendMode(r){if(this.blendModesMap[r]||(r="normal"),r===this.blendMode)return;this.blendMode=r;const e=this.blendModesMap[r],t=this.gl;e.length===2?t.blendFunc(e[0],e[1]):t.blendFuncSeparate(e[0],e[1],e[2],e[3]),e.length===6?(this._blendEq=!0,t.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD))}setPolygonOffset(r,e){this.gl.polygonOffset(r,e)}reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}_updateCheck(r,e){const t=this.checks.indexOf(r);e&&t===-1?this.checks.push(r):!e&&t!==-1&&this.checks.splice(t,1)}static _checkBlendMode(r,e){r.setBlendMode(e.blendMode)}static _checkPolygonOffset(r,e){r.setPolygonOffset(1,e.polygonOffset)}destroy(){this.gl=null,this.checks.length=0}};let Js=Qs;Js.extension={type:[y.WebGLSystem],name:"state"};class Rd{constructor(e){this.target=Gs.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=z.UNSIGNED_BYTE,this.internalFormat=bi.RGBA,this.format=bi.RGBA,this.samplerType=0}}const kd={id:"image",upload(r,e,t){e.width===r.width||e.height===r.height?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,r.width,r.height,0,e.format,e.type,r.resource),e.width=r.width,e.height=r.height}},eo={id:"image",upload(r,e,t){const i=r.alphaMode==="premultiply-alpha-on-upload";t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i);const n=e.width,s=e.height,o=r.pixelWidth,a=r.pixelHeight,l=r.resourceWidth,u=r.resourceHeight;l<o||u<a?((n!==o||s!==a)&&t.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,null),t.texSubImage2D(t.TEXTURE_2D,0,0,0,l,u,e.format,e.type,r.resource)):n===o||s===a?t.texSubImage2D(t.TEXTURE_2D,0,0,0,e.format,e.type,r.resource):t.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,r.resource),e.width=o,e.height=a}},Od={id:"video",upload(r,e,t){if(!r.isValid){t.texImage2D(e.target,0,e.internalFormat,1,1,0,e.format,e.type,null);return}eo.upload(r,e,t)}},to={linear:9729,nearest:9728},Fd={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},Si={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},Ud={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};function ro(r,e,t,i,n,s){const o=s;if(e[n](o,e.TEXTURE_WRAP_S,Si[r.addressModeU]),e[n](o,e.TEXTURE_WRAP_T,Si[r.addressModeV]),e[n](o,e.TEXTURE_WRAP_R,Si[r.addressModeW]),e[n](o,e.TEXTURE_MAG_FILTER,to[r.magFilter]),t){const a=Fd[r.minFilter][r.mipmapFilter];e[n](o,e.TEXTURE_MIN_FILTER,a)}else e[n](o,e.TEXTURE_MIN_FILTER,to[r.minFilter]);if(i&&r.maxAnisotropy>1){const a=Math.min(r.maxAnisotropy,e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));e[n](o,i.TEXTURE_MAX_ANISOTROPY_EXT,a)}r.compare&&e[n](o,e.TEXTURE_COMPARE_FUNC,Ud[r.compare])}function Id(r){return{r8unorm:r.RED,r8snorm:r.RED,r8uint:r.RED,r8sint:r.RED,r16uint:r.RED,r16sint:r.RED,r16float:r.RED,rg8unorm:r.RG,rg8snorm:r.RG,rg8uint:r.RG,rg8sint:r.RG,r32uint:r.RED,r32sint:r.RED,r32float:r.RED,rg16uint:r.RG,rg16sint:r.RG,rg16float:r.RG,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.RGBA,rgba8snorm:r.RGBA,rgba8uint:r.RGBA,rgba8sint:r.RGBA,bgra8unorm:r.RGBA,"bgra8unorm-srgb":r.RGBA,rgb9e5ufloat:r.RGB,rgb10a2unorm:r.RGBA,rg11b10ufloat:r.RGB,rg32uint:r.RG,rg32sint:r.RG,rg32float:r.RG,rgba16uint:r.RGBA,rgba16sint:r.RGBA,rgba16float:r.RGBA,rgba32uint:r.RGBA,rgba32sint:r.RGBA,rgba32float:r.RGBA,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT,depth24plus:r.DEPTH_COMPONENT,"depth24plus-stencil8":r.DEPTH_STENCIL,depth32float:r.DEPTH_COMPONENT,"depth32float-stencil8":r.DEPTH_STENCIL}}function Gd(r){return{r8unorm:r.R8,r8snorm:r.R8_SNORM,r8uint:r.R8UI,r8sint:r.R8I,r16uint:r.R16UI,r16sint:r.R16I,r16float:r.R16F,rg8unorm:r.RG8,rg8snorm:r.RG8_SNORM,rg8uint:r.RG8UI,rg8sint:r.RG8I,r32uint:r.R32UI,r32sint:r.R32I,r32float:r.R32F,rg16uint:r.RG16UI,rg16sint:r.RG16I,rg16float:r.RG16F,rgba8unorm:r.RGBA,"rgba8unorm-srgb":r.SRGB8_ALPHA8,rgba8snorm:r.RGBA8_SNORM,rgba8uint:r.RGBA8UI,rgba8sint:r.RGBA8I,bgra8unorm:r.RGBA8,"bgra8unorm-srgb":r.SRGB8_ALPHA8,rgb9e5ufloat:r.RGB9_E5,rgb10a2unorm:r.RGB10_A2,rg11b10ufloat:r.R11F_G11F_B10F,rg32uint:r.RG32UI,rg32sint:r.RG32I,rg32float:r.RG32F,rgba16uint:r.RGBA16UI,rgba16sint:r.RGBA16I,rgba16float:r.RGBA16F,rgba32uint:r.RGBA32UI,rgba32sint:r.RGBA32I,rgba32float:r.RGBA32F,stencil8:r.STENCIL_INDEX8,depth16unorm:r.DEPTH_COMPONENT16,depth24plus:r.DEPTH_COMPONENT24,"depth24plus-stencil8":r.DEPTH24_STENCIL8,depth32float:r.DEPTH_COMPONENT32F,"depth32float-stencil8":r.DEPTH32F_STENCIL8}}function $d(r){return{r8unorm:r.UNSIGNED_BYTE,r8snorm:r.BYTE,r8uint:r.UNSIGNED_BYTE,r8sint:r.BYTE,r16uint:r.UNSIGNED_SHORT,r16sint:r.SHORT,r16float:r.HALF_FLOAT,rg8unorm:r.UNSIGNED_BYTE,rg8snorm:r.BYTE,rg8uint:r.UNSIGNED_BYTE,rg8sint:r.BYTE,r32uint:r.UNSIGNED_INT,r32sint:r.INT,r32float:r.FLOAT,rg16uint:r.UNSIGNED_SHORT,rg16sint:r.SHORT,rg16float:r.HALF_FLOAT,rgba8unorm:r.UNSIGNED_BYTE,"rgba8unorm-srgb":r.UNSIGNED_BYTE,rgba8snorm:r.BYTE,rgba8uint:r.UNSIGNED_BYTE,rgba8sint:r.BYTE,bgra8unorm:r.UNSIGNED_BYTE,"bgra8unorm-srgb":r.UNSIGNED_BYTE,rgb9e5ufloat:r.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:r.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:r.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:r.UNSIGNED_INT,rg32sint:r.INT,rg32float:r.FLOAT,rgba16uint:r.UNSIGNED_SHORT,rgba16sint:r.SHORT,rgba16float:r.HALF_FLOAT,rgba32uint:r.UNSIGNED_INT,rgba32sint:r.INT,rgba32float:r.FLOAT,stencil8:r.UNSIGNED_BYTE,depth16unorm:r.UNSIGNED_SHORT,depth24plus:r.UNSIGNED_INT,"depth24plus-stencil8":r.UNSIGNED_INT_24_8,depth32float:r.FLOAT,"depth32float-stencil8":r.FLOAT_32_UNSIGNED_INT_24_8_REV}}function jy(r){r instanceof Uint8ClampedArray&&(r=new Uint8Array(r.buffer));const e=r.length;for(let t=0;t<e;t+=4){const i=r[t+3];if(i!==0){const n=255.001/i;r[t]=r[t]*n+.5,r[t+1]=r[t+1]*n+.5,r[t+2]=r[t+2]*n+.5}}}const Wy=new K,Vy=4;class io{constructor(e){this.managedTextures=[],this._glTextures=Object.create(null),this._glSamplers=Object.create(null),this._boundTextures=[],this._activeTextureLocation=-1,this._boundSamplers=Object.create(null),this._uploads={image:eo,buffer:kd,video:Od},this._useSeparateSamplers=!1,this._renderer=e}contextChange(e){this._gl=e,this._mapFormatToInternalFormat||(this._mapFormatToInternalFormat=Gd(e),this._mapFormatToType=$d(e),this._mapFormatToFormat=Id(e));for(let t=0;t<16;t++)this.bind(A.EMPTY,t)}bind(e,t=0){const i=e.source;e?(this.bindSource(i,t),this._useSeparateSamplers&&this._bindSampler(i.style,t)):(this.bindSource(null,t),this._useSeparateSamplers&&this._bindSampler(null,t))}bindSource(e,t=0){const i=this._gl;if(e.touched=this._renderer.textureGC.count,this._boundTextures[t]!==e){this._boundTextures[t]=e,this._activateLocation(t),e=e||A.EMPTY.source;const n=this.getGlSource(e);i.bindTexture(n.target,n.texture)}}_bindSampler(e,t=0){const i=this._gl;if(!e){this._boundSamplers[t]=null,i.bindSampler(t,null);return}const n=this._getGlSampler(e);this._boundSamplers[t]!==n&&(this._boundSamplers[t]=n,i.bindSampler(t,n))}unbind(e){const t=e.source,i=this._boundTextures,n=this._gl;for(let s=0;s<i.length;s++)if(i[s]===t){this._activateLocation(s);const o=this.getGlSource(t);n.bindTexture(o.target,null),i[s]=null}}_activateLocation(e){this._activeTextureLocation!==e&&(this._activeTextureLocation=e,this._gl.activeTexture(this._gl.TEXTURE0+e))}_initSource(e){const t=this._gl,i=new Rd(t.createTexture());if(i.type=this._mapFormatToType[e.format],i.internalFormat=this._mapFormatToInternalFormat[e.format],i.format=this._mapFormatToFormat[e.format],e.autoGenerateMipmaps){const n=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(n))+1}return this._glTextures[e.uid]=i,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceUpdate,this),e.on("styleChange",this.onStyleChange,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),this.onStyleChange(e),i}onStyleChange(e){const t=this._gl,i=this._glTextures[e.uid];t.bindTexture(t.TEXTURE_2D,i.texture),this._boundTextures[this._activeTextureLocation]=e,ro(e.style,t,e.mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"texParameteri",t.TEXTURE_2D)}onSourceUnload(e){const t=this._glTextures[e.uid];t&&(this.unbind(e),this._glTextures[e.uid]=null,this._gl.deleteTexture(t.texture))}onSourceUpdate(e){const t=this._gl,i=this.getGlSource(e);t.bindTexture(t.TEXTURE_2D,i.texture),this._boundTextures[this._activeTextureLocation]=e,this._uploads[e.uploadMethodId]?(this._uploads[e.uploadMethodId].upload(e,i,this._gl),e.autoGenerateMipmaps&&e.mipLevelCount>1&&t.generateMipmap(i.target)):t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e.pixelWidth,e.pixelHeight,0,t.RGBA,t.UNSIGNED_BYTE,null)}onSourceDestroy(e){e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}_initSampler(e){const t=this._gl,i=this._gl.createSampler();return this._glSamplers[e.resourceId]=i,ro(e,t,this._boundTextures[this._activeTextureLocation].mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"samplerParameteri",i),this._glSamplers[e.resourceId]}_getGlSampler(e){return this._glSamplers[e.resourceId]||this._initSampler(e)}getGlSource(e){return this._glTextures[e.uid]||this._initSource(e)}generateCanvas(e){const{pixels:t,width:i,height:n}=this.getPixels(e),s=D.ADAPTER.createCanvas();s.width=i,s.height=n;const o=s.getContext("2d");if(o){const a=o.createImageData(i,n);a.data.set(t),o.putImageData(a,0,0)}return s}getPixels(e){const t=e.source.resolution,i=Wy;i.x=e.frameX,i.y=e.frameY,i.width=e.frameWidth,i.height=e.frameHeight;const n=Math.max(Math.round(i.width*t),1),s=Math.max(Math.round(i.height*t),1),o=new Uint8Array(Vy*n*s),a=this._renderer,l=a.renderTarget.getRenderTarget(e),u=a.renderTarget.getGpuRenderTarget(l),h=a.gl;return h.bindFramebuffer(h.FRAMEBUFFER,u.resolveTargetFramebuffer),h.readPixels(Math.round(i.x*t),Math.round(i.y*t),n,s,h.RGBA,h.UNSIGNED_BYTE,o),{pixels:new Uint8ClampedArray(o.buffer),width:n,height:s}}destroy(){const e=this;e._renderer=null}}io.extension={type:[y.WebGLSystem],name:"texture"};class no{init(){const e=new te({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new k,type:"mat3x3<f32>"}}),t=Ct({name:"graphics",bits:[ui,ci(Te),mr,Rt]});this.shader=new Ee({glProgram:t,resources:{localUniforms:e,batchSamplers:di}})}execute(e,t){const i=t.view.context,n=i.customShader||this.shader,s=e.renderer,o=s.graphicsContext,{geometry:a,instructions:l}=o.getContextRenderData(i);s.shader.bind(n),s.shader.bindUniformBlock(s.globalUniforms.uniformGroup,"globalUniforms"),s.geometry.bind(a,n.glProgram);const u=l.instructions;for(let h=0;h<l.instructionSize;h++){const c=u[h];if(c.size){for(let p=0;p<c.textures.textures.length;p++)s.texture.bind(c.textures.textures[p],p);s.geometry.draw("triangle-list",c.size,c.start)}}}destroy(){this.shader.destroy(!0),this.shader=null}}no.extension={type:[y.WebGLPipesAdaptor],name:"graphics"};class so{init(){const e=Ct({name:"mesh",bits:[mr,Qc,Rt]});this._shader=new Ee({glProgram:e,resources:{uTexture:A.EMPTY.source}}),this._shader.addResource("globalUniforms",0,0),this._shader.addResource("localUniforms",1,0)}execute(e,t){const i=e.renderer,n=t.view;let s=n._shader;if(!s){s=this._shader;const o=n.texture.source;s.resources.uTexture=o,s.resources.uSampler=o.style}s.groups[0]=i.globalUniforms.bindGroup,s.groups[1]=e.localUniformsBindGroup,i.encoder.draw({geometry:n._geometry,shader:s,state:n.state})}destroy(){this._shader.destroy(!0),this._shader=null}}so.extension={type:[y.WebGLPipesAdaptor],name:"mesh"};var Yy=Object.defineProperty,Ld=Object.getOwnPropertySymbols,Xy=Object.prototype.hasOwnProperty,qy=Object.prototype.propertyIsEnumerable,Dd=(r,e,t)=>e in r?Yy(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,zd=(r,e)=>{for(var t in e||(e={}))Xy.call(e,t)&&Dd(r,t,e[t]);if(Ld)for(var t of Ld(e))qy.call(e,t)&&Dd(r,t,e[t]);return r};const Ky=["init","destroy","contextChange","reset","renderEnd","renderStart","render","update","postrender","prerender"];class oo{constructor(e){this.runners=Object.create(null),this.renderPipes=Object.create(null),this._systemsHash=Object.create(null);var t;this.type=e.type,this.name=e.name;const i=[...Ky,...(t=e.runners)!=null?t:[]];this._addRunners(...i),this._addSystems(e.systems),this._addPipes(e.renderPipes,e.renderPipeAdaptors)}async init(e={}){for(const t in this._systemsHash){const i=this._systemsHash[t].constructor.defaultOptions;e=zd(zd({},i),e),this._roundPixels=e.roundPixels?1:0}for(let t=0;t<this.runners.init.items.length;t++)await this.runners.init.items[t].init(e)}render(e,t){let i=e;if(i instanceof V&&(i={container:i},t&&(O(G,"passing a second argument is deprecated, please use render options instead"),i.target=t.renderTexture)),i.target||(i.target=this.view.texture),i.target===this.view.texture&&(this._lastObjectRendered=i.container),i.clearColor){const n=Array.isArray(i.clearColor)&&i.clearColor.length===4;i.clearColor=n?i.clearColor:j.shared.setValue(i.clearColor).toArray()}this.runners.prerender.emit(i),this.runners.renderStart.emit(i),this.runners.render.emit(i),this.runners.renderEnd.emit(i),this.runners.postrender.emit(i)}resize(e,t,i){this.view.resize(e,t,i)}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e}get width(){return this.view.texture.frameWidth}get height(){return this.view.texture.frameHeight}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(t=>{this.runners[t]=new yi(t)})}_addSystems(e){let t;for(t in e){const i=e[t];this._addSystem(i.value,i.name)}}_addSystem(e,t){const i=new e(this);if(this[t])throw new Error(`Whoops! The name "${t}" is already in use`);this[t]=i,this._systemsHash[t]=i;for(const n in this.runners)this.runners[n].add(i);return this}_addPipes(e,t){const i=t.reduce((n,s)=>(n[s.name]=s.value,n),{});e.forEach(n=>{const s=n.value,o=n.name,a=i[o];this.renderPipes[o]=new s(this,a?new a:null)})}destroy(e=!1){const t=this;this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(i=>{i.destroy()}),t.runners=null,this._systemsHash=null,t.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}}function ao(r,e){const t=r.instructionSet,i=t.instructions;for(let n=0;n<t.instructionSize;n++){const s=i[n];e[s.type].execute(s)}}class lo{constructor(e){this._renderer=e}addLayerGroup(e,t){this._renderer.renderPipes.batch.break(t),t.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({projectionData:this._renderer.renderTarget.renderTarget,worldTransformMatrix:e.worldTransform,worldColor:e.worldColor}),ao(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}}lo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"layer"};function uo(r,e=[]){e.push(r);for(let t=0;t<r.layerGroupChildren.length;t++)uo(r.layerGroupChildren[t],e);return e}function ho(r,e,t){const i=r>>16&255,n=r>>8&255,s=r&255,o=e>>16&255,a=e>>8&255,l=e&255,u=i+(o-i)*t,h=n+(a-n)*t,c=s+(l-s)*t;return(u<<16)+(h<<8)+c}const Nd=16777215+16777215;function Pi(r,e){const t=(r>>24&255)/255,i=(e>>24&255)/255,n=t*i*255,s=r&16777215,o=e&16777215;let a=16777215;return s+(o<<32)!==Nd&&(s===16777215?a=o:o===16777215?a=s:a=ho(s,o,.5)),a+(n<<24)}function Zy(r,e,t){const i=(t>>24&255)/255,n=e*i*255,s=((r&255)<<16)+(r&65280)+(r>>16&255),o=t&16777215;let a=16777215;return s+(o<<32)!==Nd&&(s===16777215?a=o:o===16777215?a=s:a=ho(s,o,.5)),a+(n<<24)}const Qy=new V;function co(r,e=!1){Hd(r);const t=r.childrenToUpdate,i=r.updateTick;r.updateTick++;for(const n in t){const s=t[n],o=s.list,a=s.index;for(let l=0;l<a;l++)po(o[l],i,0);s.index=0}if(e)for(let n=0;n<r.layerGroupChildren.length;n++)co(r.layerGroupChildren[n],e)}function Hd(r){r.layerGroupParent?(r.worldTransform.appendFrom(r.root.layerTransform,r.layerGroupParent.worldTransform),r.worldColor=Pi(r.root.layerColor,r.layerGroupParent.worldColor)):(r.worldTransform.copyFrom(r.root.layerTransform),r.worldColor=r.root.localColor)}function po(r,e,t){if(e===r.updateTick)return;r.updateTick=e,r.didChange=!1;const i=r.localTransform;Ue(i,r);const n=r.parent;if(n&&!n.isLayerRoot?(t=t|r._updateFlags,r.layerTransform.appendFrom(i,n.layerTransform),t&&jd(r,n,t)):(t=r._updateFlags,r.layerTransform.copyFrom(i),t&&jd(r,Qy,t)),!r.isLayerRoot){const s=r.children,o=s.length;for(let l=0;l<o;l++)po(s[l],e,t);const a=r.layerGroup;r.view&&!a.structureDidChange&&a.updateRenderable(r)}}function jd(r,e,t){t&$r&&(r.layerColor=Pi(r.localColor,e.layerColor)),t&hn&&(r.layerBlendMode=r.localBlendMode==="inherit"?e.layerBlendMode:r.localBlendMode),t&Lr&&(r.layerVisibleRenderable=r.localVisibleRenderable&e.layerVisibleRenderable),r._updateFlags=0}function Wd(r,e){const{list:t,index:i}=r.childrenRenderablesToUpdate;let n=!1;for(let s=0;s<i;s++){const o=t[s],a=o.view;if(n=e[a.renderPipeId].validateRenderable(o),n)break}return r.structureDidChange=n,n&&(r.childrenRenderablesToUpdate.index=0),n}class fo{constructor(e){this._renderer=e}render({container:e,transform:t}){e.layer=!0;const i=this._renderer,n=uo(e.layerGroup,[]),s=i.renderPipes;for(let o=0;o<n.length;o++){const a=n[o];a.runOnRender(),a.instructionSet.renderPipes=s,a.structureDidChange||Wd(a,s),co(a),a.structureDidChange?(a.structureDidChange=!1,ed(a,s)):Jy(a),i.renderPipes.batch.upload(a.instructionSet)}t&&e.layerGroup.worldTransform.copyFrom(t),i.globalUniforms.start({projectionData:i.renderTarget.rootRenderTarget,worldTransformMatrix:e.layerGroup.worldTransform}),ao(e.layerGroup,s),s.uniformBatch&&(s.uniformBatch.renderEnd(),s.uniformBuffer.renderEnd())}destroy(){const e=this;e._renderer=null}}fo.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"layer"};function Jy(r){const{list:e,index:t}=r.childrenRenderablesToUpdate;for(let i=0;i<t;i++){const n=e[i];n.didViewUpdate&&r.updateRenderable(n)}r.childrenRenderablesToUpdate.index=0}function go(r,e,t,i,n,s,o,a=null){let l=0;t*=e,n*=s;const u=a.a,h=a.b,c=a.c,p=a.d,d=a.tx,f=a.ty;for(;l<o;){const m=r[t],g=r[t+1];i[n]=u*m+c*g+d,i[n+1]=h*m+p*g+f,n+=s,t+=e,l++}}function mo(r,e,t,i){let n=0;for(e*=t;n<i;)r[e]=0,r[e+1]=0,e+=t,n++}function Ai(r,e,t,i,n){const s=e.a,o=e.b,a=e.c,l=e.d,u=e.tx,h=e.ty;t=t||0,i=i||2,n=n||r.length/i-t;let c=t*i;for(let p=0;p<n;p++){const d=r[c],f=r[c+1];r[c]=s*d+a*f+u,r[c+1]=o*d+l*f+h,c+=i}}class Ei{constructor(){this.batcher=null,this.batch=null,this.applyTransform=!0,this.roundPixels=0}get blendMode(){return this.applyTransform?this.renderable.layerBlendMode:"normal"}packIndex(e,t,i){const n=this.geometryData.indices;for(let s=0;s<this.indexSize;s++)e[t++]=n[s+this.indexOffset]+i-this.vertexOffset}packAttributes(e,t,i,n){const s=this.geometryData,o=this.renderable,a=s.vertices,l=s.uvs,u=this.vertexOffset*2,h=(this.vertexOffset+this.vertexSize)*2,c=this.color,p=c>>16|c&65280|(c&255)<<16;if(this.applyTransform){const d=Pi(p+(this.alpha*255<<24),o.layerColor),f=o.layerTransform,m=n<<16|this.roundPixels&65535,g=f.a,x=f.b,b=f.c,v=f.d,_=f.tx,P=f.ty;for(let C=u;C<h;C+=2){const B=a[C],S=a[C+1];e[i]=g*B+b*S+_,e[i+1]=x*B+v*S+P,e[i+2]=l[C],e[i+3]=l[C+1],t[i+4]=d,t[i+5]=m,i+=6}}else{const d=p+(this.alpha*255<<24);for(let f=u;f<h;f+=2)e[i]=a[f],e[i+1]=a[f+1],e[i+2]=l[f],e[i+3]=l[f+1],t[i+4]=d,t[i+5]=n,i+=6}}get vertSize(){return this.vertexSize}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.vertexOffset=this.vertexOffset,e.vertexSize=this.vertexSize,e.color=this.color,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}}const pt={build(r,e){let t,i,n,s,o,a;if(r.type==="circle"){const _=r;t=_.x,i=_.y,o=a=_.radius,n=s=0}else if(r.type==="ellipse"){const _=r;t=_.x,i=_.y,o=_.halfWidth,a=_.halfHeight,n=s=0}else{const _=r,P=_.width/2,C=_.height/2;t=_.x+P,i=_.y+C,o=a=Math.max(0,Math.min(_.radius,Math.min(P,C))),n=P-o,s=C-a}if(!(o>=0&&a>=0&&n>=0&&s>=0))return e;const l=Math.ceil(2.3*Math.sqrt(o+a)),u=l*8+(n?4:0)+(s?4:0);if(u===0)return e;if(l===0)return e[0]=e[6]=t+n,e[1]=e[3]=i+s,e[2]=e[4]=t-n,e[5]=e[7]=i-s,e;let h=0,c=l*4+(n?2:0)+2,p=c,d=u,f=n+o,m=s,g=t+f,x=t-f,b=i+m;if(e[h++]=g,e[h++]=b,e[--c]=b,e[--c]=x,s){const _=i-m;e[p++]=x,e[p++]=_,e[--d]=_,e[--d]=g}for(let _=1;_<l;_++){const P=Math.PI/2*(_/l),C=n+Math.cos(P)*o,B=s+Math.sin(P)*a,S=t+C,w=t-C,T=i+B,L=i-B;e[h++]=S,e[h++]=T,e[--c]=T,e[--c]=w,e[p++]=w,e[p++]=L,e[--d]=L,e[--d]=S}f=n,m=s+a,g=t+f,x=t-f,b=i+m;const v=i-m;return e[h++]=g,e[h++]=b,e[--d]=v,e[--d]=g,n&&(e[h++]=x,e[h++]=b,e[--d]=v,e[--d]=x),e},triangulate(r,e,t,i,n,s){if(r.length===0)return;let o=0,a=0;const l=r.length/4;o+=r[0],a+=r[1],o+=r[l|0],a+=r[(l|0)+1],o+=r[l*2|0],a+=r[(l*2|0)+1],o+=r[l*3|0],a+=r[(l*3|0)+1],o/=4,a/=4;let u=i;e[u*t]=o,e[u*t+1]=a,u++;const h=i;e[u*t]=r[0],e[u*t+1]=r[1],u++;for(let c=2;c<r.length;c+=2)e[u*t]=r[c],e[u*t+1]=r[c+1],n[s++]=u,n[s++]=h,n[s++]=u-1,u++;n[s++]=u-1,n[s++]=h,n[s++]=h+1}},Vd=1e-4,bo=1e-4;function Yd(r){const e=r.length;if(e<6)return 1;let t=0;for(let i=0,n=r[e-2],s=r[e-1];i<e;i+=2){const o=r[i],a=r[i+1];t+=(o-n)*(a+s),n=o,s=a}return t<0?-1:1}function Xd(r,e,t,i,n,s,o,a){const l=r-t*n,u=e-i*n,h=r+t*s,c=e+i*s;let p,d;o?(p=i,d=-t):(p=-i,d=t);const f=l+p,m=u+d,g=h+p,x=c+d;return a.push(f,m),a.push(g,x),2}function ft(r,e,t,i,n,s,o,a){const l=t-r,u=i-e;let h=Math.atan2(l,u),c=Math.atan2(n-r,s-e);a&&h<c?h+=Math.PI*2:!a&&h>c&&(c+=Math.PI*2);let p=h;const d=c-h,f=Math.abs(d),m=Math.sqrt(l*l+u*u),g=(15*f*Math.sqrt(m)/Math.PI>>0)+1,x=d/g;if(p+=x,a){o.push(r,e),o.push(t,i);for(let b=1,v=p;b<g;b++,v+=x)o.push(r,e),o.push(r+Math.sin(v)*m,e+Math.cos(v)*m);o.push(r,e),o.push(n,s)}else{o.push(t,i),o.push(r,e);for(let b=1,v=p;b<g;b++,v+=x)o.push(r+Math.sin(v)*m,e+Math.cos(v)*m),o.push(r,e);o.push(n,s),o.push(r,e)}return g*2}function qd(r,e,t,i,n,s,o,a,l){const u=Vd;if(r.length===0)return;const h=e;let c=h.alignment;if(e.alignment!==.5){let Y=Yd(r);t&&(Y*=-1),c=(c-.5)*Y+.5}const p=new W(r[0],r[1]),d=new W(r[r.length-2],r[r.length-1]),f=i,m=Math.abs(p.x-d.x)<u&&Math.abs(p.y-d.y)<u;if(f){r=r.slice(),m&&(r.pop(),r.pop(),d.set(r[r.length-2],r[r.length-1]));const Y=(p.x+d.x)*.5,Ne=(d.y+p.y)*.5;r.unshift(Y,Ne),r.push(Y,Ne)}const g=n,x=r.length/2;let b=r.length;const v=g.length/2,_=h.width/2,P=_*_,C=h.miterLimit*h.miterLimit;let B=r[0],S=r[1],w=r[2],T=r[3],L=0,$=0,R=-(S-T),E=B-w,q=0,J=0,fe=Math.sqrt(R*R+E*E);R/=fe,E/=fe,R*=_,E*=_;const Dt=c,F=(1-Dt)*2,U=Dt*2;f||(h.cap==="round"?b+=ft(B-R*(F-U)*.5,S-E*(F-U)*.5,B-R*F,S-E*F,B+R*U,S+E*U,g,!0)+2:h.cap==="square"&&(b+=Xd(B,S,R,E,F,U,!0,g))),g.push(B-R*F,S-E*F),g.push(B+R*U,S+E*U);for(let Y=1;Y<x-1;++Y){B=r[(Y-1)*2],S=r[(Y-1)*2+1],w=r[Y*2],T=r[Y*2+1],L=r[(Y+1)*2],$=r[(Y+1)*2+1],R=-(S-T),E=B-w,fe=Math.sqrt(R*R+E*E),R/=fe,E/=fe,R*=_,E*=_,q=-(T-$),J=w-L,fe=Math.sqrt(q*q+J*J),q/=fe,J/=fe,q*=_,J*=_;const Ne=w-B,zt=S-T,Nt=w-L,Ht=$-T,Ba=Ne*Nt+zt*Ht,Br=zt*Nt-Ht*Ne,jt=Br<0;if(Math.abs(Br)<.001*Math.abs(Ba)){g.push(w-R*F,T-E*F),g.push(w+R*U,T+E*U),Ba>=0&&(h.join==="round"?b+=ft(w,T,w-R*F,T-E*F,w-q*F,T-J*F,g,!1)+4:b+=2,g.push(w-q*U,T-J*U),g.push(w+q*F,T+J*F));continue}const Ra=(-R+B)*(-E+T)-(-R+w)*(-E+S),ka=(-q+L)*(-J+T)-(-q+w)*(-J+$),Rr=(Ne*ka-Nt*Ra)/Br,kr=(Ht*Ra-zt*ka)/Br,Ki=(Rr-w)*(Rr-w)+(kr-T)*(kr-T),Ve=w+(Rr-w)*F,Ye=T+(kr-T)*F,Xe=w-(Rr-w)*U,qe=T-(kr-T)*U,ag=Math.min(Ne*Ne+zt*zt,Nt*Nt+Ht*Ht),Oa=jt?F:U,lg=ag+Oa*Oa*P;Ki<=lg?h.join==="bevel"||Ki/P>C?(jt?(g.push(Ve,Ye),g.push(w+R*U,T+E*U),g.push(Ve,Ye),g.push(w+q*U,T+J*U)):(g.push(w-R*F,T-E*F),g.push(Xe,qe),g.push(w-q*F,T-J*F),g.push(Xe,qe)),b+=2):h.join==="round"?jt?(g.push(Ve,Ye),g.push(w+R*U,T+E*U),b+=ft(w,T,w+R*U,T+E*U,w+q*U,T+J*U,g,!0)+4,g.push(Ve,Ye),g.push(w+q*U,T+J*U)):(g.push(w-R*F,T-E*F),g.push(Xe,qe),b+=ft(w,T,w-R*F,T-E*F,w-q*F,T-J*F,g,!1)+4,g.push(w-q*F,T-J*F),g.push(Xe,qe)):(g.push(Ve,Ye),g.push(Xe,qe)):(g.push(w-R*F,T-E*F),g.push(w+R*U,T+E*U),h.join==="round"?jt?b+=ft(w,T,w+R*U,T+E*U,w+q*U,T+J*U,g,!0)+2:b+=ft(w,T,w-R*F,T-E*F,w-q*F,T-J*F,g,!1)+2:h.join==="miter"&&Ki/P<=C&&(jt?(g.push(Xe,qe),g.push(Xe,qe)):(g.push(Ve,Ye),g.push(Ve,Ye)),b+=2),g.push(w-q*F,T-J*F),g.push(w+q*U,T+J*U),b+=2)}B=r[(x-2)*2],S=r[(x-2)*2+1],w=r[(x-1)*2],T=r[(x-1)*2+1],R=-(S-T),E=B-w,fe=Math.sqrt(R*R+E*E),R/=fe,E/=fe,R*=_,E*=_,g.push(w-R*F,T-E*F),g.push(w+R*U,T+E*U),f||(h.cap==="round"?b+=ft(w-R*(F-U)*.5,T-E*(F-U)*.5,w-R*F,T-E*F,w+R*U,T+E*U,g,!1)+2:h.cap==="square"&&(b+=Xd(w,T,R,E,F,U,!1,g)));const og=bo*bo;for(let Y=v;Y<b+v-2;++Y)B=g[Y*2],S=g[Y*2+1],w=g[(Y+1)*2],T=g[(Y+1)*2+1],L=g[(Y+2)*2],$=g[(Y+2)*2+1],!(Math.abs(B*(T-$)+w*($-S)+L*(S-T))<og)&&a.push(Y,Y+1,Y+2)}var vo=Ci,ex=Ci;function Ci(r,e,t){t=t||2;var i=e&&e.length,n=i?e[0]*t:r.length,s=Kd(r,0,n,t,!0),o=[];if(!s||s.next===s.prev)return o;var a,l,u,h,c,p,d;if(i&&(s=sx(r,e,s,t)),r.length>80*t){a=u=r[0],l=h=r[1];for(var f=t;f<n;f+=t)c=r[f],p=r[f+1],c<a&&(a=c),p<l&&(l=p),c>u&&(u=c),p>h&&(h=p);d=Math.max(u-a,h-l),d=d!==0?32767/d:0}return xr(s,o,t,a,l,d,0),o}function Kd(r,e,t,i,n){var s,o;if(n===_o(r,e,t,i)>0)for(s=e;s<t;s+=i)o=Jd(s,r[s],r[s+1],o);else for(s=t-i;s>=e;s-=i)o=Jd(s,r[s],r[s+1],o);return o&&Mi(o,o.next)&&(wr(o),o=o.next),o}function gt(r,e){if(!r)return r;e||(e=r);var t=r,i;do if(i=!1,!t.steiner&&(Mi(t,t.next)||Q(t.prev,t,t.next)===0)){if(wr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function xr(r,e,t,i,n,s,o){if(r){!o&&s&&hx(r,i,n,s);for(var a=r,l,u;r.prev!==r.next;){if(l=r.prev,u=r.next,s?rx(r,i,n,s):tx(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(u.i/t|0),wr(r),r=u.next,a=u.next;continue}if(r=u,r===a){o?o===1?(r=ix(gt(r),e,t),xr(r,e,t,i,n,s,2)):o===2&&nx(r,e,t,i,n,s):xr(gt(r),e,t,i,n,s,1);break}}}}function tx(r){var e=r.prev,t=r,i=r.next;if(Q(e,t,i)>=0)return!1;for(var n=e.x,s=t.x,o=i.x,a=e.y,l=t.y,u=i.y,h=n<s?n<o?n:o:s<o?s:o,c=a<l?a<u?a:u:l<u?l:u,p=n>s?n>o?n:o:s>o?s:o,d=a>l?a>u?a:u:l>u?l:u,f=i.next;f!==e;){if(f.x>=h&&f.x<=p&&f.y>=c&&f.y<=d&&Ot(n,a,s,l,o,u,f.x,f.y)&&Q(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function rx(r,e,t,i){var n=r.prev,s=r,o=r.next;if(Q(n,s,o)>=0)return!1;for(var a=n.x,l=s.x,u=o.x,h=n.y,c=s.y,p=o.y,d=a<l?a<u?a:u:l<u?l:u,f=h<c?h<p?h:p:c<p?c:p,m=a>l?a>u?a:u:l>u?l:u,g=h>c?h>p?h:p:c>p?c:p,x=yo(d,f,e,t,i),b=yo(m,g,e,t,i),v=r.prevZ,_=r.nextZ;v&&v.z>=x&&_&&_.z<=b;){if(v.x>=d&&v.x<=m&&v.y>=f&&v.y<=g&&v!==n&&v!==o&&Ot(a,h,l,c,u,p,v.x,v.y)&&Q(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=d&&_.x<=m&&_.y>=f&&_.y<=g&&_!==n&&_!==o&&Ot(a,h,l,c,u,p,_.x,_.y)&&Q(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=x;){if(v.x>=d&&v.x<=m&&v.y>=f&&v.y<=g&&v!==n&&v!==o&&Ot(a,h,l,c,u,p,v.x,v.y)&&Q(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=b;){if(_.x>=d&&_.x<=m&&_.y>=f&&_.y<=g&&_!==n&&_!==o&&Ot(a,h,l,c,u,p,_.x,_.y)&&Q(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function ix(r,e,t){var i=r;do{var n=i.prev,s=i.next.next;!Mi(n,s)&&Zd(n,i,i.next,s)&&_r(n,s)&&_r(s,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(s.i/t|0),wr(i),wr(i.next),i=r=s),i=i.next}while(i!==r);return gt(i)}function nx(r,e,t,i,n,s){var o=r;do{for(var a=o.next.next;a!==o.prev;){if(o.i!==a.i&&px(o,a)){var l=Qd(o,a);o=gt(o,o.next),l=gt(l,l.next),xr(o,e,t,i,n,s,0),xr(l,e,t,i,n,s,0);return}a=a.next}o=o.next}while(o!==r)}function sx(r,e,t,i){var n=[],s,o,a,l,u;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:r.length,u=Kd(r,a,l,i,!1),u===u.next&&(u.steiner=!0),n.push(dx(u));for(n.sort(ox),s=0;s<n.length;s++)t=ax(n[s],t);return t}function ox(r,e){return r.x-e.x}function ax(r,e){var t=lx(r,e);if(!t)return e;var i=Qd(t,r);return gt(i,i.next),gt(t,t.next)}function lx(r,e){var t=e,i=r.x,n=r.y,s=-1/0,o;do{if(n<=t.y&&n>=t.next.y&&t.next.y!==t.y){var a=t.x+(n-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(a<=i&&a>s&&(s=a,o=t.x<t.next.x?t:t.next,a===i))return o}t=t.next}while(t!==e);if(!o)return null;var l=o,u=o.x,h=o.y,c=1/0,p;t=o;do i>=t.x&&t.x>=u&&i!==t.x&&Ot(n<h?i:s,n,u,h,n<h?s:i,n,t.x,t.y)&&(p=Math.abs(n-t.y)/(i-t.x),_r(t,r)&&(p<c||p===c&&(t.x>o.x||t.x===o.x&&ux(o,t)))&&(o=t,c=p)),t=t.next;while(t!==l);return o}function ux(r,e){return Q(r.prev,r,e.prev)<0&&Q(e.next,r,r.next)<0}function hx(r,e,t,i){var n=r;do n.z===0&&(n.z=yo(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==r);n.prevZ.nextZ=null,n.prevZ=null,cx(n)}function cx(r){var e,t,i,n,s,o,a,l,u=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,i=t,a=0,e=0;e<u&&(a++,i=i.nextZ,!!i);e++);for(l=u;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,a--):(n=i,i=i.nextZ,l--),s?s.nextZ=n:r=n,n.prevZ=s,s=n;t=i}s.nextZ=null,u*=2}while(o>1);return r}function yo(r,e,t,i,n){return r=(r-t)*n|0,e=(e-i)*n|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function dx(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function Ot(r,e,t,i,n,s,o,a){return(n-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(n-o)*(i-a)}function px(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!fx(r,e)&&(_r(r,e)&&_r(e,r)&&gx(r,e)&&(Q(r.prev,r,e.prev)||Q(r,e.prev,e))||Mi(r,e)&&Q(r.prev,r,r.next)>0&&Q(e.prev,e,e.next)>0)}function Q(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Mi(r,e){return r.x===e.x&&r.y===e.y}function Zd(r,e,t,i){var n=Ri(Q(r,e,t)),s=Ri(Q(r,e,i)),o=Ri(Q(t,i,r)),a=Ri(Q(t,i,e));return!!(n!==s&&o!==a||n===0&&Bi(r,t,e)||s===0&&Bi(r,i,e)||o===0&&Bi(t,r,i)||a===0&&Bi(t,e,i))}function Bi(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Ri(r){return r>0?1:r<0?-1:0}function fx(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Zd(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function _r(r,e){return Q(r.prev,r,r.next)<0?Q(r,e,r.next)>=0&&Q(r,r.prev,e)>=0:Q(r,e,r.prev)<0||Q(r,r.next,e)<0}function gx(r,e){var t=r,i=!1,n=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&n<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==r);return i}function Qd(r,e){var t=new xo(r.i,r.x,r.y),i=new xo(e.i,e.x,e.y),n=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=n,n.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Jd(r,e,t,i){var n=new xo(r,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function wr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function xo(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Ci.deviation=function(r,e,t,i){var n=e&&e.length,s=n?e[0]*t:r.length,o=Math.abs(_o(r,0,s,t));if(n)for(var a=0,l=e.length;a<l;a++){var u=e[a]*t,h=a<l-1?e[a+1]*t:r.length;o-=Math.abs(_o(r,u,h,t))}var c=0;for(a=0;a<i.length;a+=3){var p=i[a]*t,d=i[a+1]*t,f=i[a+2]*t;c+=Math.abs((r[p]-r[f])*(r[d+1]-r[p+1])-(r[p]-r[d])*(r[f+1]-r[p+1]))}return o===0&&c===0?0:Math.abs((c-o)/o)};function _o(r,e,t,i){for(var n=0,s=e,o=t-i;s<t;s+=i)n+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return n}Ci.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},i=0,n=0;n<r.length;n++){for(var s=0;s<r[n].length;s++)for(var o=0;o<e;o++)t.vertices.push(r[n][s][o]);n>0&&(i+=r[n-1].length,t.holes.push(i))}return t},vo.default=ex;function wo(r,e,t,i,n,s,o){const a=vo(r,e,2);if(!a)return;for(let u=0;u<a.length;u+=3)s[o++]=a[u]+n,s[o++]=a[u+1]+n,s[o++]=a[u+2]+n;let l=n*i;for(let u=0;u<r.length;u+=2)t[l]=r[u],t[l+1]=r[u+1],l+=i}const mx=[],To={build(r,e){for(let t=0;t<r.points.length;t++)e[t]=r.points[t];return e},triangulate(r,e,t,i,n,s){wo(r,mx,e,t,i,n,s)}},So={build(r,e){const t=r,i=t.x,n=t.y,s=t.width,o=t.height;return s>=0&&o>=0&&(e[0]=i,e[1]=n,e[2]=i+s,e[3]=n,e[4]=i+s,e[5]=n+o,e[6]=i,e[7]=n+o),e},triangulate(r,e,t,i,n,s){let o=0;i*=t,e[i+o]=r[0],e[i+o+1]=r[1],o+=t,e[i+o]=r[2],e[i+o+1]=r[3],o+=t,e[i+o]=r[6],e[i+o+1]=r[7],o+=t,e[i+o]=r[4],e[i+o+1]=r[5],o+=t;const a=i/t;n[s++]=a,n[s++]=a+1,n[s++]=a+2,n[s++]=a+1,n[s++]=a+3,n[s++]=a+2}},Po={build(r,e){return e[0]=r.x,e[1]=r.y,e[2]=r.x2,e[3]=r.y2,e[4]=r.x3,e[5]=r.y3,e},triangulate(r,e,t,i,n,s){let o=0;i*=t,e[i+o]=r[0],e[i+o+1]=r[1],o+=t,e[i+o]=r[2],e[i+o+1]=r[3],o+=t,e[i+o]=r[4],e[i+o+1]=r[5];const a=i/t;n[s++]=a,n[s++]=a+1,n[s++]=a+2}},Ao={rectangle:So,polygon:To,triangle:Po,circle:pt,ellipse:pt,roundedRectangle:pt},bx=new K;function ep(r){const e={vertices:[],uvs:[],indices:[]},t=[];for(let i=0;i<r.instructions.length;i++){const n=r.instructions[i];if(n.action==="texture")vx(n.data,t,e);else if(n.action==="fill"||n.action==="stroke"){const s=n.action==="stroke",o=n.data.path.shapePath,a=n.data.style,l=n.data.hole;s&&l&&tp(l.shapePath,a,null,!0,t,e),tp(o,a,l,s,t,e)}}return t}function vx(r,e,t){const{vertices:i,uvs:n,indices:s}=t,o=s.length,a=i.length/2,l=[],u=Ao.rectangle,h=bx,c=r.image;h.x=r.dx,h.y=r.dy,h.width=r.dw,h.height=r.dh;const p=r.transform;u.build(h,l),p&&Ai(l,p),u.triangulate(l,i,2,a,s,o);const d=c.layout.uvs;n.push(d.x0,d.y0,d.x1,d.y1,d.x3,d.y3,d.x2,d.y2);const f=N.get(Ei);f.indexOffset=o,f.indexSize=s.length-o,f.vertexOffset=a,f.vertexSize=i.length/2-a,f.color=r.style,f.alpha=r.alpha,f.texture=c,f.geometryData=t,e.push(f)}function tp(r,e,t,i,n,s){const{vertices:o,uvs:a,indices:l}=s,u=r.shapePrimitives.length-1;r.shapePrimitives.forEach(({shape:h,transform:c},p)=>{var d;const f=l.length,m=o.length/2,g=[],x=Ao[h.type];if(x.build(h,g),c&&Ai(g,c),i){const P=(d=h.closePath)!=null?d:!0;qd(g,e,!1,P,o,2,m,l,f)}else if(t&&u===p){u!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const P=[],C=g.slice();yx(t.shapePath).forEach(B=>{P.push(C.length/2),C.push(...B)}),wo(C,P,o,2,m,l,f)}else x.triangulate(g,o,2,m,l,f);const b=a.length/2,v=e.texture;if(v!==A.WHITE){const P=e.matrix;c&&P.append(c.clone().invert()),go(o,2,m,a,b,2,o.length/2-m,P)}else mo(a,b,2,o.length/2-m);const _=N.get(Ei);_.indexOffset=f,_.indexSize=l.length-f,_.vertexOffset=m,_.vertexSize=o.length/2-m,_.color=e.color,_.alpha=e.alpha,_.texture=v,_.geometryData=s,n.push(_)})}function yx(r){if(!r)return[];const e=r.shapePrimitives,t=[];for(let i=0;i<e.length;i++){const n=e[i].shape,s=[];Ao[n.type].build(n,s),t.push(s)}return t}class rp{}class ip{constructor(){this.geometry=new Ps,this.instructions=new an}init(){this.geometry.reset(),this.instructions.reset()}}class Eo{constructor(){this._activeBatchers=[],this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),this._needsContextNeedsRebuild=[]}prerender(){this._returnActiveBatchers()}getContextRenderData(e){return this._graphicsDataContextHash[e.uid]||this._initContextRenderData(e)}updateGpuContext(e){let t=this._gpuContextHash[e.uid]||this._initContext(e);if(e.dirty){t?this._cleanGraphicsContextData(e):t=this._initContext(e);const i=ep(e);let n=0;const s=e.batchMode;let o=!0;if(e.customShader||s==="no-batch")o=!1;else if(s==="auto"){for(let a=0;a<i.length;a++)if(n+=i[a].vertexSize,n>400){o=!1;break}}t=this._gpuContextHash[e.uid]={isBatchable:o,batches:i},e.dirty=!1}return t}getGpuContext(e){return this._gpuContextHash[e.uid]||this._initContext(e)}_returnActiveBatchers(){for(let e=0;e<this._activeBatchers.length;e++)N.return(this._activeBatchers[e]);this._activeBatchers.length=0}_initContextRenderData(e){const t=N.get(ip),i=this._gpuContextHash[e.uid].batches;let n=0,s=0;i.forEach(u=>{u.applyTransform=!1,n+=u.geometryData.vertices.length,s+=u.geometryData.indices.length});const o=N.get(Bs);this._activeBatchers.push(o),o.ensureAttributeBuffer(n),o.ensureIndexBuffer(s),o.begin();for(let u=0;u<i.length;u++){const h=i[u];o.add(h)}o.finish(t.instructions);const a=t.geometry;a.indexBuffer.data=o.indexBuffer,a.buffers[0].data=o.attributeBuffer.float32View,a.indexBuffer.update(o.indexSize*4),a.buffers[0].update(o.attributeSize*4);const l=o.batches;for(let u=0;u<l.length;u++){const h=l[u];h.bindGroup=pi(h.textures.textures,h.textures.count)}return this._graphicsDataContextHash[e.uid]=t,t}_initContext(e){const t=new rp;return this._gpuContextHash[e.uid]=t,e.on("update",this.onGraphicsContextUpdate,this),e.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]}onGraphicsContextUpdate(e){this._needsContextNeedsRebuild.push(e)}onGraphicsContextDestroy(e){this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null}_cleanGraphicsContextData(e){const t=this._gpuContextHash[e.uid];t.isBatchable||this._graphicsDataContextHash[e.uid]&&(N.return(this.getContextRenderData(e)),this._graphicsDataContextHash[e.uid]=null),t.batches&&t.batches.forEach(i=>{N.return(i)})}destroy(){for(const e of this._needsContextNeedsRebuild)this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null;this._needsContextNeedsRebuild.length=0}}Eo.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"graphicsContext"};function xx(r,e,t,i){t[i++]=(r>>16&255)/255,t[i++]=(r>>8&255)/255,t[i++]=(r&255)/255,t[i++]=e}function Co(r,e,t){e[t++]=(r&255)/255,e[t++]=(r>>8&255)/255,e[t++]=(r>>16&255)/255,e[t++]=(r>>24&255)/255}class Mo{constructor(e,t){this.state=Se.for2d(),this._renderableBatchesHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=e.view.context,i=!!this._renderableBatchesHash[e.uid],n=this.renderer.graphicsContext.updateGpuContext(t);return!!(n.isBatchable||i!==n.isBatchable)}addRenderable(e,t){const i=this.renderer.graphicsContext.updateGpuContext(e.view.context);e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e)),i.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add({type:"graphics",renderable:e}))}updateRenderable(e){const t=this._renderableBatchesHash[e.uid];if(t)for(let i=0;i<t.length;i++){const n=t[i];n.batcher.updateElement(n)}}destroyRenderable(e){this._removeBatchForRenderable(e.uid)}execute({renderable:e}){if(!e.isRenderable)return;const t=this.renderer,i=e.view.context;if(!t.graphicsContext.getGpuContext(i).batches.length)return;const n=i.customShader||this._adaptor.shader;this.state.blendMode=e.layerBlendMode;const s=n.resources.localUniforms.uniforms;s.uTransformMatrix=e.layerTransform,s.uRound=t._roundPixels|e.view.roundPixels,Co(e.layerColor,s.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=!!this._renderableBatchesHash[e.uid],i=this.renderer.graphicsContext.updateGpuContext(e.view.context);t&&this._removeBatchForRenderable(e.uid),i.isBatchable&&this._initBatchesForRenderable(e),e.view.batched=i.isBatchable}_addToBatcher(e,t){const i=this.renderer.renderPipes.batch,n=this._getBatchesForRenderable(e);for(let s=0;s<n.length;s++){const o=n[s];i.addToBatch(o,t)}}_getBatchesForRenderable(e){return this._renderableBatchesHash[e.uid]||this._initBatchesForRenderable(e)}_initBatchesForRenderable(e){const t=e.view.context,i=this.renderer.graphicsContext.getGpuContext(t),n=this.renderer._roundPixels|e.view.roundPixels,s=i.batches.map(o=>{const a=N.get(Ei);return o.copyTo(a),a.renderable=e,a.roundPixels=n,a});return this._renderableBatchesHash[e.uid]=s,e.on("destroyed",()=>{this.destroyRenderable(e)}),s}_removeBatchForRenderable(e){this._renderableBatchesHash[e].forEach(t=>{N.return(t)}),this._renderableBatchesHash[e]=null}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null;for(const e in this._renderableBatchesHash)this._removeBatchForRenderable(e);this._renderableBatchesHash=null}}Mo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"graphics"};class np{constructor(){this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.layerBlendMode}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null}packIndex(e,t,i){const n=this.renderable.view.geometry.indices;for(let s=0;s<n.length;s++)e[t++]=n[s]+i}packAttributes(e,t,i,n){const s=this.renderable,o=this.renderable.view.geometry,a=s.layerTransform,l=n<<16|this.roundPixels&65535,u=a.a,h=a.b,c=a.c,p=a.d,d=a.tx,f=a.ty,m=o.positions,g=o.uvs,x=s.layerColor;for(let b=0;b<m.length;b+=2){const v=m[b],_=m[b+1];e[i]=u*v+c*_+d,e[i+1]=h*v+p*_+f,e[i+2]=g[b],e[i+3]=g[b+1],t[i+4]=x,t[i+5]=l,i+=6}}get vertexSize(){return this.renderable.view.geometry.positions.length/2}get indexSize(){return this.renderable.view.geometry.indices.length}}class Bo{constructor(e,t){this.localUniforms=new te({uTransformMatrix:{value:new k,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Be({0:this.localUniforms}),this._renderableHash=Object.create(null),this._gpuBatchableMeshHash=Object.create(null),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getRenderableData(e),i=t.batched,n=e.view.batched;if(t.batched=n,i!==n)return!0;if(n){const s=e.view._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const o=this._getBatchableMesh(e),a=e.view.texture;if(o.texture._source!==a._source&&o.texture._source!==a._source)return o.batcher.checkAndUpdateTexture(o,a)}return!1}addRenderable(e,t){const i=this.renderer.renderPipes.batch,{batched:n}=this._getRenderableData(e);if(n){const s=this._getBatchableMesh(e);s.texture=e.view._texture,i.addToBatch(s)}else i.break(t),t.add({type:"mesh",renderable:e})}updateRenderable(e){if(e.view.batched){const t=this._gpuBatchableMeshHash[e.uid];t.texture=e.view._texture,t.batcher.updateElement(t)}}destroyRenderable(e){this._renderableHash[e.uid]=null;const t=this._gpuBatchableMeshHash[e.uid];N.return(t),this._gpuBatchableMeshHash[e.uid]=null}execute({renderable:e}){if(!e.isRenderable)return;const t=e.view;t.state.blendMode=e.layerBlendMode;const i=this.localUniforms;i.uniforms.uTransformMatrix=e.layerTransform,i.uniforms.uRound=this.renderer._roundPixels|e.view.roundPixels,i.update(),Co(e.layerColor,i.uniforms.uColor,0),this._adaptor.execute(this,e)}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t=e.view;return this._renderableHash[e.uid]={batched:t.batched,indexSize:t._geometry.indices.length,vertexSize:t._geometry.positions.length},e.on("destroyed",()=>{this.destroyRenderable(e)}),this._renderableHash[e.uid]}_getBatchableMesh(e){return this._gpuBatchableMeshHash[e.uid]||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=N.get(np);return t.renderable=e,t.texture=e.view._texture,t.roundPixels=this.renderer._roundPixels|e.view.roundPixels,this._gpuBatchableMeshHash[e.uid]=t,t.renderable=e,t}destroy(){for(const e in this._gpuBatchableMeshHash)this._gpuBatchableMeshHash[e]&&N.return(this._gpuBatchableMeshHash[e]);this._gpuBatchableMeshHash=null,this._renderableHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Bo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"mesh"};class ki{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.layerBlendMode}packAttributes(e,t,i,n){const s=this.renderable,o=this.texture,a=s.layerTransform,l=a.a,u=a.b,h=a.c,c=a.d,p=a.tx,d=a.ty,f=this.bounds,m=f[1],g=f[0],x=f[3],b=f[2],v=o._layout.uvs,_=s.layerColor,P=n<<16|this.roundPixels&65535;e[i+0]=l*g+h*b+p,e[i+1]=c*b+u*g+d,e[i+2]=v.x0,e[i+3]=v.y0,t[i+4]=_,t[i+5]=P,e[i+6]=l*m+h*b+p,e[i+7]=c*b+u*m+d,e[i+8]=v.x1,e[i+9]=v.y1,t[i+10]=_,t[i+11]=P,e[i+12]=l*m+h*x+p,e[i+13]=c*x+u*m+d,e[i+14]=v.x2,e[i+15]=v.y2,t[i+16]=_,t[i+17]=P,e[i+18]=l*g+h*x+p,e[i+19]=c*x+u*g+d,e[i+20]=v.x3,e[i+21]=v.y3,t[i+22]=_,t[i+23]=P}packIndex(e,t,i){e[t]=i+0,e[t+1]=i+1,e[t+2]=i+2,e[t+3]=i+0,e[t+4]=i+2,e[t+5]=i+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}let Ft;class Ro{constructor(e){this._gpuSpriteHash=Object.create(null),this._renderer=e,Ft=this._gpuSpriteHash}addRenderable(e,t){const i=this._getGpuSprite(e);e.view._didUpdate&&this._updateBatchableSprite(e,i),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const t=Ft[e.uid];e.view._didUpdate&&this._updateBatchableSprite(e,t),t.batcher.updateElement(t)}validateRenderable(e){const t=e.view._texture,i=this._getGpuSprite(e);return i.texture._source!==t._source?!i.batcher.checkAndUpdateTexture(i,t):!1}destroyRenderable(e){const t=Ft[e.uid];N.return(t),Ft[e.uid]=null}_updateBatchableSprite(e,t){const i=e.view;i._didUpdate=!1,t.bounds=i.bounds,t.texture=i._texture}_getGpuSprite(e){return Ft[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=N.get(ki);t.renderable=e;const i=e.view;return t.texture=i._texture,t.bounds=i.bounds,t.roundPixels=this._renderer._roundPixels|i.roundPixels,Ft[e.uid]=t,e.view._didUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuSpriteHash)N.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}}Ro.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"sprite"};class Oi extends he{constructor({original:e,view:t}){super(),this.uid=X("renderable"),this.didViewUpdate=!1,this.view=t,e&&this.init(e)}init(e){this._original=e,this.layerTransform=e.layerTransform}get layerColor(){return this._original.layerColor}get layerBlendMode(){return this._original.layerBlendMode}get layerVisibleRenderable(){return this._original.layerVisibleRenderable}get isRenderable(){return this._original.isRenderable}}const sp=new bt;class Tr{constructor(e){this.uid=X("meshView"),this.renderPipeId="mesh",this.canBundle=!0,this.owner=Tt,this.state=Se.for2d(),this.roundPixels=0;var t,i,n;this.shader=e.shader,this.texture=(n=(i=e.texture)!=null?i:(t=this.shader)==null?void 0:t.texture)!=null?n:A.WHITE,this._geometry=e.geometry,this._geometry.on("update",this.onUpdate,this)}set shader(e){this._shader!==e&&(this._shader=e,this.onUpdate())}get shader(){return this._shader}set geometry(e){var t;this._geometry!==e&&((t=this._geometry)==null||t.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._geometry=e,this.onUpdate())}get geometry(){return this._geometry}set texture(e){this._texture!==e&&(this.shader&&(this.shader.texture=e),this._texture=e,this.onUpdate())}get texture(){return this._texture}get batched(){return this._shader?!1:this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch"}addBounds(e){e.addVertexData(this.geometry.positions,0,this.geometry.positions.length)}containsPoint(e){const{x:t,y:i}=e,n=this.geometry.getBuffer("aPosition").data,s=sp.points,o=this.geometry.getIndex().data,a=o.length,l=this.geometry.topology==="triangle-strip"?3:1;for(let u=0;u+2<a;u+=l){const h=o[u]*2,c=o[u+1]*2,p=o[u+2]*2;if(s[0]=n[h],s[1]=n[h+1],s[2]=n[c],s[3]=n[c+1],s[4]=n[p],s[5]=n[p+1],sp.contains(t,i))return!0}return!1}onUpdate(){this.owner.onViewUpdate()}destroy(e=!1){if(typeof e=="boolean"?e:e!=null&&e.texture){const t=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(t)}this._texture=null,this._geometry=null,this._shader=null}}var _x=Object.defineProperty,op=Object.getOwnPropertySymbols,wx=Object.prototype.hasOwnProperty,Tx=Object.prototype.propertyIsEnumerable,ap=(r,e,t)=>e in r?_x(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,lp=(r,e)=>{for(var t in e||(e={}))wx.call(e,t)&&ap(r,t,e[t]);if(op)for(var t of op(e))Tx.call(e,t)&&ap(r,t,e[t]);return r};const up=class extends ai{constructor(...r){var e;let t=(e=r[0])!=null?e:{};t instanceof Float32Array&&(O(G,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:r[1],indices:r[2]}),t=lp(lp({},up.defaultOptions),t);const i=t.positions||new Float32Array([0,0,1,0,1,1,0,1]),n=t.uvs||new Float32Array([0,0,1,0,1,1,0,1]),s=t.indices||new Uint32Array([0,1,2,0,2,3]),o=new we({data:i,label:"attribute-mesh-positions",usage:H.VERTEX|H.COPY_DST}),a=new we({data:n,label:"attribute-mesh-uvs",usage:H.VERTEX|H.COPY_DST}),l=new we({data:s,label:"index-mesh-buffer",usage:H.INDEX|H.COPY_DST});super({attributes:{aPosition:{buffer:o,shaderLocation:0,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:a,shaderLocation:1,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(r){this.attributes.aPosition.buffer.data=r}get uvs(){return this.attributes.aUV.buffer.data}set uvs(r){this.attributes.aUV.buffer.data=r}get indices(){return this.indexBuffer.data}set indices(r){this.indexBuffer.data=r}};let Ut=up;Ut.defaultOptions={topology:"triangle-list"};class ko extends Ut{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}const hp={name:"tiling-bit",vertex:{header:`
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
        `}},cp={name:"tiling-bit",vertex:{header:`
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
    
        `}};class dp extends Ee{constructor(e){const t=Et({name:"tiling-sprite-shader",bits:[ks,hp,Bt]}),i=Ct({name:"tiling-sprite-shader",bits:[mr,cp,Rt]}),n=new te({uMapCoord:{value:new k,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new k,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,200,.5,.5]),type:"vec4<f32>"}});super({glProgram:i,gpuProgram:t,resources:{tilingUniforms:n,uTexture:e.texture.source,uSampler:e.texture.source.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.source.style)}}const Sx=new ko;class Oo{constructor(e){this._renderableHash=Object.create(null),this._gpuBatchedTilingSprite=Object.create(null),this._gpuTilingSprite=Object.create(null),this._renderer=e}validateRenderable(e){const t=e.view.texture.textureMatrix;let i=!1;const n=this._getRenderableData(e);return n.batched!==t.isSimple&&(n.batched=t.isSimple,i=!0),i}addRenderable(e,t){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:i}=this._getRenderableData(e);if(i){const n=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(n,t)}else{const n=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(n.meshRenderable,t)}}updateRenderable(e){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:t}=this._getRenderableData(e);if(t){const i=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i)}else{const i=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i.meshRenderable)}}destroyRenderable(e){this._renderableHash[e.uid]=null,this._gpuTilingSprite[e.uid]=null,this._gpuBatchedTilingSprite[e.uid]=null}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const t={batched:!0};return this._renderableHash[e.uid]=t,this.validateRenderable(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}_rebuild(e){const t=this._getRenderableData(e),i=e.view,n=i.texture.textureMatrix;if(t.batched){const s=this._getBatchedTilingSprite(e);s.view.texture=i.texture;const o=i.texture.source.style;o.addressMode!=="repeat"&&(o.addressMode="repeat",o.update()),this._updateBatchPositions(e),this._updateBatchUvs(e)}else{const s=this._getGpuTilingSprite(e),{meshRenderable:o}=s,a=o.view;a.shader.texture=i.texture;const l=a.shader.resources.tilingUniforms,u=i.width,h=i.height,c=i.texture.width,p=i.texture.height,d=i._tileTransform.matrix,f=l.uniforms.uTextureTransform;f.set(d.a*c/u,d.b*c/h,d.c*p/u,d.d*p/h,d.tx/u,d.ty/h),f.invert(),l.uniforms.uMapCoord=n.mapCoord,l.uniforms.uClampFrame=n.uClampFrame,l.uniforms.uClampOffset=n.uClampOffset,l.uniforms.uTextureTransform=f,l.uniforms.uSizeAnchor[0]=u,l.uniforms.uSizeAnchor[1]=h,l.uniforms.uSizeAnchor[2]=e.view.anchor.x,l.uniforms.uSizeAnchor[3]=e.view.anchor.y,l.update()}}_getGpuTilingSprite(e){return this._gpuTilingSprite[e.uid]||this._initGpuTilingSprite(e)}_initGpuTilingSprite(e){const t=e.view,i=t.texture.source.style;i.addressMode="repeat",i.update();const n=new Tr({geometry:Sx,shader:new dp({texture:t.texture})}),s=new Oi({original:e,view:n}),o=new k,a={meshRenderable:s,textureMatrix:o};return this._gpuTilingSprite[e.uid]=a,a}_getBatchedTilingSprite(e){return this._gpuBatchedTilingSprite[e.uid]||this._initBatchedTilingSprite(e)}_initBatchedTilingSprite(e){const t=new Tr({geometry:new ko,texture:e.view.texture});t.roundPixels=this._renderer._roundPixels|e.view.roundPixels;const i=new Oi({original:e,view:t});return this._gpuBatchedTilingSprite[e.uid]=i,i}_updateBatchPositions(e){const t=this._getBatchedTilingSprite(e),i=e.view,n=t.view.geometry.getBuffer("aPosition").data,s=i.anchor.x,o=i.anchor.y;n[0]=-s*i.width,n[1]=-o*i.height,n[2]=(1-s)*i.width,n[3]=-o*i.height,n[4]=(1-s)*i.width,n[5]=(1-o)*i.height,n[6]=-s*i.width,n[7]=(1-o)*i.height}_updateBatchUvs(e){const t=e.view,i=t.texture.frameWidth,n=t.texture.frameHeight,s=this._getBatchedTilingSprite(e).view.geometry.getBuffer("aUV").data;let o=0,a=0;t._applyAnchorToTexture&&(o=t.anchor.x,a=t.anchor.y),s[0]=s[6]=-o,s[2]=s[4]=1-o,s[1]=s[3]=-a,s[5]=s[7]=1-a;const l=k.shared;l.copyFrom(t._tileTransform.matrix),l.tx/=t.width,l.ty/=t.height,l.invert(),l.scale(t.width/i,t.height/n),pp(s,2,0,l)}destroy(){this._renderableHash=null,this._gpuTilingSprite=null,this._gpuBatchedTilingSprite=null,this._renderer=null}}Oo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"tilingSprite"};function pp(r,e,t,i){let n=0;const s=r.length/(e||2),o=i.a,a=i.b,l=i.c,u=i.d,h=i.tx,c=i.ty;for(t*=e;n<s;){const p=r[t],d=r[t+1];r[t]=o*p+l*d+h,r[t+1]=a*p+u*d+c,t+=e,n++}}class Fo{constructor(e){this.uid=X("graphicsView"),this.canBundle=!0,this.owner=Tt,this.renderPipeId="graphics",this.roundPixels=0,this._context=e||new je,this._context.on("update",this.onGraphicsContextUpdate,this)}set context(e){e!==this._context&&(this._context.off("update",this.onGraphicsContextUpdate,this),this._context=e,this._context.on("update",this.onGraphicsContextUpdate,this),this.onGraphicsContextUpdate())}get context(){return this._context}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onGraphicsContextUpdate(){this._didUpdate=!0,this.owner.onViewUpdate()}destroy(e=!1){this.owner=null,(typeof e=="boolean"?e:e!=null&&e.context)&&this._context.destroy(e),this._context=null}}const fp={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:` 
            outColor = vColor * calculateMSDFAlpha(outColor, localUniforms.uDistance);
        `}},gp={name:"msdf-bit",fragment:{header:`
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
        `}},mp={name:"msdf-bit",fragment:{header:`
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
        `}};class bp extends Ee{constructor(){const e=new te({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new k,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}}),t=Et({name:"sdf-shader",bits:[li,hi(Te),fp,gp,Bt]}),i=Ct({name:"sdf-shader",bits:[ui,ci(Te),mr,mp,Rt]});super({glProgram:i,gpuProgram:t,resources:{localUniforms:e,batchSamplers:di}})}}const vp=["_fontFamily","_fontStyle","_fontVariant","_fontWeight","_breakWords","_align","_leading","_letterSpacing","_lineHeight","_textBaseline","_whiteSpace","_wordWrap","_wordWrapWidth","_padding","_cssOverrides"];function Uo(r){const e=[];let t=0;for(let i=0;i<vp.length;i++){const n=vp[i];e[t++]=r[n]}return t=yp(r._fill,e,t),t=Px(r._stroke,e,t),e.join("-")}function yp(r,e,t){var i;return r&&(e[t++]=r.color,e[t++]=r.alpha,e[t++]=(i=r.fill)==null?void 0:i.uid),t}function Px(r,e,t){return r&&(t=yp(r,e,t),e[t++]=r.width,e[t++]=r.alignment,e[t++]=r.cap,e[t++]=r.join,e[t++]=r.miterLimit),t}var Ax=Object.defineProperty,xp=Object.getOwnPropertySymbols,Ex=Object.prototype.hasOwnProperty,Cx=Object.prototype.propertyIsEnumerable,_p=(r,e,t)=>e in r?Ax(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Sr=(r,e)=>{for(var t in e||(e={}))Ex.call(e,t)&&_p(r,t,e[t]);if(xp)for(var t of xp(e))Cx.call(e,t)&&_p(r,t,e[t]);return r};const It=class extends he{constructor(r={}){super(),Mx(r);const e=Sr(Sr({},It.defaultTextStyle),r);for(const t in It.defaultTextStyle){const i=t;this[i]=e[t]}this.dropShadow=null,typeof e.fill=="string"?this.fontSize=parseInt(e.fontSize,10):this.fontSize=e.fontSize,r.dropShadow&&(r.dropShadow instanceof Boolean?r.dropShadow===!0&&(this.dropShadow=Sr({},It.defaultTextStyle.dropShadow)):this.dropShadow=Sr(Sr({},It.defaultTextStyle.dropShadow),r.dropShadow)),this.update()}get align(){return this._align}set align(r){this._align=r,this.update()}get breakWords(){return this._breakWords}set breakWords(r){this._breakWords=r,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(r){this._dropShadow=r,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(r){this._fontFamily=r,this.update()}get fontSize(){return this._fontSize}set fontSize(r){this._fontSize=r,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(r){this._fontStyle=r,this.update()}get fontVariant(){return this._fontVariant}set fontVariant(r){this._fontVariant=r,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(r){this._fontWeight=r,this.update()}get leading(){return this._leading}set leading(r){this._leading=r,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(r){this._letterSpacing=r,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(r){this._lineHeight=r,this.update()}get padding(){return this._padding}set padding(r){this._padding=r,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(r){this._textBaseline=r,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(r){this._whiteSpace=r,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(r){this._wordWrap=r,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(r){this._wordWrapWidth=r,this.update()}get fill(){return this._originalFill}set fill(r){r!==this._originalFill&&(this._originalFill=r,this._fill=lt(r,je.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(r){r!==this._originalFill&&(this._originalFill=r,this._stroke=lt(r,je.defaultStrokeStyle),this.update())}_generateKey(){return this._styleKey=Uo(this),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}get styleKey(){return this._styleKey||this._generateKey()}clone(){return new It({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(r=!1){var e,t,i,n;if(this.removeAllListeners(),typeof r=="boolean"?r:r==null?void 0:r.texture){const s=typeof r=="boolean"?r:r==null?void 0:r.textureSource;(e=this._fill)!=null&&e.texture&&this._fill.texture.destroy(s),(t=this._originalFill)!=null&&t.texture&&this._originalFill.texture.destroy(s),(i=this._stroke)!=null&&i.texture&&this._stroke.texture.destroy(s),(n=this._originalStroke)!=null&&n.texture&&this._originalStroke.texture.destroy(s)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}};let mt=It;mt.defaultTextStyle={align:"left",breakWords:!1,dropShadow:{alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5},fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};function Mx(r){var e,t;const i=r;if(typeof i.dropShadow=="boolean"&&(O(G,"dropShadow is now an object, not a boolean"),r.dropShadow={alpha:(e=i.dropShadowAlpha)!=null?e:1,angle:i.dropShadowAngle,blur:(t=i.dropShadowBlur)!=null?t:0,color:i.dropShadowColor,distance:i.dropShadowDistance}),i.strokeThickness){O(G,"strokeThickness is now a part of stroke");const n=i.stroke;r.stroke={color:n,width:i.strokeThickness}}if(Array.isArray(i.fill)){O(G,"gradient fill is now a fill pattern: `new FillGradient(...)`");const n=new rr(0,0,0,r.fontSize*1.7),s=i.fill.map(o=>j.shared.setValue(o).toNumber());s.forEach((o,a)=>{var l;const u=(l=i.fillGradientStops[a])!=null?l:a/s.length;n.addColorStop(u,o)}),r.fill={fill:n}}}class wp{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,t){const i=D.ADAPTER.createCanvas();i.width=e,i.height=t;const n=i.getContext("2d");return{canvas:i,context:n}}getOptimalCanvasAndContext(e,t,i=1){e=Math.ceil(e*i-1e-6),t=Math.ceil(t*i-1e-6),e=ct(e),t=ct(t);const n=(e<<17)+(t<<1);this._canvasPool[n]||(this._canvasPool[n]=[]);let s=this._canvasPool[n].pop();return s||(s=this._createCanvasAndContext(e,t)),s}returnCanvasAndContext(e){const{width:t,height:i}=e.canvas,n=(t<<17)+(i<<1);this._canvasPool[n].push(e)}clear(){this._canvasPool={}}}const ze=new wp,Bx=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function Pr(r){const e=typeof r.fontSize=="number"?`${r.fontSize}px`:r.fontSize;let t=r.fontFamily;Array.isArray(r.fontFamily)||(t=r.fontFamily.split(","));for(let i=t.length-1;i>=0;i--){let n=t[i].trim();!/([\"\'])[^\'\"]+\1/.test(n)&&!Bx.includes(n)&&(n=`"${n}"`),t[i]=n}return`${r.fontStyle} ${r.fontVariant} ${r.fontWeight} ${e} ${t.join(",")}`}const Io={willReadFrequently:!0},M=class{static get experimentalLetterSpacingSupported(){let r=M._experimentalLetterSpacingSupported;if(r!==void 0){const e=D.ADAPTER.getCanvasRenderingContext2D().prototype;r=M._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return r}constructor(r,e,t,i,n,s,o,a,l){this.text=r,this.style=e,this.width=t,this.height=i,this.lines=n,this.lineWidths=s,this.lineHeight=o,this.maxLineWidth=a,this.fontProperties=l}static measureText(r=" ",e,t=M._canvas,i=e.wordWrap){var n;const s=`${r}:${e.styleKey}`;if(M._measurementCache[s])return M._measurementCache[s];const o=Pr(e),a=M.measureFont(o);a.fontSize===0&&(a.fontSize=e.fontSize,a.ascent=e.fontSize);const l=M.__context;l.font=o;const u=(i?M._wordWrap(r,e,t):r).split(/(?:\r\n|\r|\n)/),h=new Array(u.length);let c=0;for(let g=0;g<u.length;g++){const x=M._measureText(u[g],e.letterSpacing,l);h[g]=x,c=Math.max(c,x)}const p=((n=e._stroke)==null?void 0:n.width)||0;let d=c+p;e.dropShadow&&(d+=e.dropShadow.distance);const f=e.lineHeight||a.fontSize+p;let m=Math.max(f,a.fontSize+p*2)+(u.length-1)*(f+e.leading);return e.dropShadow&&(m+=e.dropShadow.distance),new M(r,e,d,m,u,h,f+e.leading,c,a)}static _measureText(r,e,t){let i=!1;M.experimentalLetterSpacingSupported&&(M.experimentalLetterSpacing?(t.letterSpacing=`${e}px`,t.textLetterSpacing=`${e}px`,i=!0):(t.letterSpacing="0px",t.textLetterSpacing="0px"));let n=t.measureText(r).width;return n>0&&(i?n-=e:n+=(M.graphemeSegmenter(r).length-1)*e),n}static _wordWrap(r,e,t=M._canvas){const i=t.getContext("2d",Io);let n=0,s="",o="";const a=Object.create(null),{letterSpacing:l,whiteSpace:u}=e,h=M._collapseSpaces(u),c=M._collapseNewlines(u);let p=!h;const d=e.wordWrapWidth+l,f=M._tokenize(r);for(let m=0;m<f.length;m++){let g=f[m];if(M._isNewline(g)){if(!c){o+=M._addLine(s),p=!h,s="",n=0;continue}g=" "}if(h){const b=M.isBreakingSpace(g),v=M.isBreakingSpace(s[s.length-1]);if(b&&v)continue}const x=M._getFromCache(g,l,a,i);if(x>d)if(s!==""&&(o+=M._addLine(s),s="",n=0),M.canBreakWords(g,e.breakWords)){const b=M.wordWrapSplit(g);for(let v=0;v<b.length;v++){let _=b[v],P=_,C=1;for(;b[v+C];){const S=b[v+C];if(!M.canBreakChars(P,S,g,v,e.breakWords))_+=S;else break;P=S,C++}v+=C-1;const B=M._getFromCache(_,l,a,i);B+n>d&&(o+=M._addLine(s),p=!1,s="",n=0),s+=_,n+=B}}else{s.length>0&&(o+=M._addLine(s),s="",n=0);const b=m===f.length-1;o+=M._addLine(g,!b),p=!1,s="",n=0}else x+n>d&&(p=!1,o+=M._addLine(s),s="",n=0),(s.length>0||!M.isBreakingSpace(g)||p)&&(s+=g,n+=x)}return o+=M._addLine(s,!1),o}static _addLine(r,e=!0){return r=M._trimRight(r),r=e?`${r}
`:r,r}static _getFromCache(r,e,t,i){let n=t[r];return typeof n!="number"&&(n=M._measureText(r,e,i)+e,t[r]=n),n}static _collapseSpaces(r){return r==="normal"||r==="pre-line"}static _collapseNewlines(r){return r==="normal"}static _trimRight(r){if(typeof r!="string")return"";for(let e=r.length-1;e>=0;e--){const t=r[e];if(!M.isBreakingSpace(t))break;r=r.slice(0,-1)}return r}static _isNewline(r){return typeof r!="string"?!1:M._newlines.includes(r.charCodeAt(0))}static isBreakingSpace(r,e){return typeof r!="string"?!1:M._breakingSpaces.includes(r.charCodeAt(0))}static _tokenize(r){const e=[];let t="";if(typeof r!="string")return e;for(let i=0;i<r.length;i++){const n=r[i],s=r[i+1];if(M.isBreakingSpace(n,s)||M._isNewline(n)){t!==""&&(e.push(t),t=""),e.push(n);continue}t+=n}return t!==""&&e.push(t),e}static canBreakWords(r,e){return e}static canBreakChars(r,e,t,i,n){return!0}static wordWrapSplit(r){return M.graphemeSegmenter(r)}static measureFont(r){if(M._fonts[r])return M._fonts[r];const e=M._context;e.font=r;const t=e.measureText(M.METRICS_STRING+M.BASELINE_SYMBOL),i={ascent:t.actualBoundingBoxAscent,descent:t.actualBoundingBoxDescent,fontSize:t.actualBoundingBoxAscent+t.actualBoundingBoxDescent};return M._fonts[r]=i,i}static clearMetrics(r=""){r?delete M._fonts[r]:M._fonts={}}static get _canvas(){if(!M.__canvas){let r;try{const e=new OffscreenCanvas(0,0),t=e.getContext("2d",Io);if(t!=null&&t.measureText)return M.__canvas=e,e;r=D.ADAPTER.createCanvas()}catch(e){r=D.ADAPTER.createCanvas()}r.width=r.height=10,M.__canvas=r}return M.__canvas}static get _context(){return M.__context||(M.__context=M._canvas.getContext("2d",Io)),M.__context}};let re=M;re.METRICS_STRING="|\xC9q\xC5",re.BASELINE_SYMBOL="M",re.BASELINE_MULTIPLIER=1.4,re.HEIGHT_MULTIPLIER=2,re.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const r=new Intl.Segmenter;return e=>[...r.segment(e)].map(t=>t.segment)}return r=>[...r]})(),re.experimentalLetterSpacing=!1,re._fonts={},re._newlines=[10,13],re._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],re._measurementCache={};function Ar(r,e){if(r.texture===A.WHITE&&!r.fill)return j.shared.setValue(r.color).toHex();if(r.fill){if(r.fill instanceof Fn){const t=r.fill,i=e.createPattern(t.texture.source.resource,"repeat"),n=t.transform.copyTo(k.shared);return n.scale(t.texture.frameWidth,t.texture.frameHeight),i.setTransform(n),i}else if(r.fill instanceof rr){const t=r.fill;if(t.type==="linear"){const i=e.createLinearGradient(t.x0,t.y0,t.x1,t.y1);return t.gradientStops.forEach(n=>{i.addColorStop(n.offset,j.shared.setValue(n.color).toHex())}),i}}}else{const t=e.createPattern(r.texture.source.resource,"repeat"),i=r.matrix.copyTo(k.shared);return i.scale(r.texture.frameWidth,r.texture.frameHeight),t.setTransform(i),t}return"red"}function Go(r){if(r==="")return[];typeof r=="string"&&(r=[r]);const e=[];for(let t=0,i=r.length;t<i;t++){const n=r[t];if(Array.isArray(n)){if(n.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${n.length}.`);if(n[0].length===0||n[1].length===0)throw new Error("[BitmapFont]: Invalid character delimiter.");const s=n[0].charCodeAt(0),o=n[1].charCodeAt(0);if(o<s)throw new Error("[BitmapFont]: Invalid character range.");for(let a=s,l=o;a<=l;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(n))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}class Fi extends _n{constructor(e){var t,i,n;super(),this.resolution=1,this.pages=[],this._padding=4,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentPageIndex=-1,this._skipKerning=!1;const s=e,o=s.style.clone();o.fontSize=this.baseMeasurementFontSize,s.overrideFill&&(o._fill.color=16777215,o._fill.alpha=1,o._fill.texture=A.WHITE,o._fill.fill=null),this._style=o,this._skipKerning=(t=s.skipKerning)!=null?t:!1,this.resolution=(i=s.resolution)!=null?i:1,this._padding=(n=s.padding)!=null?n:4;const a=Pr(o),l=this;l.fontMetrics=re.measureFont(a),l.lineHeight=o.lineHeight||this.fontMetrics.fontSize||o.fontSize}ensureCharacters(e){var t,i,n,s;const o=Go(e).filter(v=>!this._currentChars.includes(v)).filter((v,_,P)=>P.indexOf(v)===_);if(!o.length)return;this._currentChars=[...this._currentChars,...o];let a;this._currentPageIndex===-1?a=this._nextPage():a=this.pages[this._currentPageIndex];let{canvas:l,context:u}=a.canvasAndContext,h=a.texture.source;const c=this._style;let p=this._currentX,d=this._currentY;const f=this.baseRenderedFontSize/this.baseMeasurementFontSize,m=this._padding*f,g=c.fontStyle==="italic"?2:1;let x=0,b=!1;for(let v=0;v<o.length;v++){const _=o[v],P=re.measureText(_,c,l,!1),C=g*P.width*f,B=P.height*f,S=C+m*2,w=B+m*2;if(b=!1,_!==`
`&&_!=="\r"&&_!=="	"&&_!==" "&&(b=!0,x=Math.ceil(Math.max(w,x))),p+S>512&&(d+=x,x=w,p=0,d+x>512)){h.update();const L=this._nextPage();l=L.canvasAndContext.canvas,u=L.canvasAndContext.context,h=L.texture.source,d=0}const T=C/f-((i=(t=c.dropShadow)==null?void 0:t.distance)!=null?i:0)-((s=(n=c._stroke)==null?void 0:n.width)!=null?s:0);if(this.chars[_]={id:_.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:T,kerning:{}},b){this._drawGlyph(u,P,p+m,d+m,f,c);const L=h.width*f,$=h.height*f,R=new K(p/L,d/$,S/L,w/$);this.chars[_].texture=new A({source:h,layout:{frame:R}}),p+=Math.ceil(S)}}h.update(),this._currentX=p,this._currentY=d,this._skipKerning&&this._applyKerning(o,u)}get pageTextures(){return O(G,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,t){const i=this._measureCache;for(let n=0;n<e.length;n++){const s=e[n];for(let o=0;o<this._currentChars.length;o++){const a=this._currentChars[o];let l=i[s];l||(l=i[s]=t.measureText(s).width);let u=i[a];u||(u=i[a]=t.measureText(a).width);let h=t.measureText(s+a).width,c=h-(l+u);c&&(this.chars[s].kerning[a]=c),h=t.measureText(s+a).width,c=h-(l+u),c&&(this.chars[a].kerning[s]=c)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,t=ze.getOptimalCanvasAndContext(512,512,e);this._setupContext(t.context,this._style,e);const i=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),n=new A({source:new tr({resource:t.canvas,resolution:i,alphaMode:"premultiply-alpha-on-upload"})}),s={canvasAndContext:t,texture:n};return this.pages[this._currentPageIndex]=s,s}_setupContext(e,t,i){var n;t.fontSize=this.baseRenderedFontSize,e.scale(i,i),e.font=Pr(t),t.fontSize=this.baseMeasurementFontSize,e.textBaseline=t.textBaseline;const s=t._stroke,o=(n=s==null?void 0:s.width)!=null?n:0;if(s&&(e.lineWidth=o,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=Ar(s,e)),t._fill&&(e.fillStyle=Ar(t._fill,e)),t.dropShadow){const a=t.dropShadow,l=j.shared.setValue(a.color).toArray(),u=a.blur*i,h=a.distance*i;e.shadowColor=`rgba(${l[0]*255},${l[1]*255},${l[2]*255},${a.alpha})`,e.shadowBlur=u,e.shadowOffsetX=Math.cos(a.angle)*h,e.shadowOffsetY=Math.sin(a.angle)*h}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,t,i,n,s,o){var a;const l=t.text,u=t.fontProperties,h=o._stroke,c=((a=h==null?void 0:h.width)!=null?a:0)*s,p=i+c/2,d=n-c/2,f=u.descent*s,m=t.lineHeight*s;o.stroke&&c&&e.strokeText(l,p,d+m-f),o._fill&&e.fillText(l,p,d+m-f)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:t,texture:i}=this.pages[e];ze.returnCanvasAndContext(t),i.destroy(!0)}this.pages=null}}function $o(r,e,t){const i={width:0,height:0,offsetY:0,scale:e.fontSize/t.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};i.offsetY=t.baseLineOffset;let n=i.lines[0],s=null,o=!0;const a={spaceWord:!1,width:0,start:0,index:0,positions:[],chars:[]},l=d=>{const f=n.width;for(let m=0;m<a.index;m++){const g=d.positions[m];n.chars.push(d.chars[m]),n.charPositions.push(g+f)}n.width+=d.width,o=!1,a.width=0,a.index=0,a.chars.length=0},u=()=>{let d=n.chars.length-1,f=n.chars[d];for(;f===" ";)n.width-=t.chars[f].xAdvance,f=n.chars[--d];i.width=Math.max(i.width,n.width),n={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},o=!0,i.lines.push(n),i.height+=t.lineHeight},h=t.baseMeasurementFontSize/e.fontSize,c=e.letterSpacing*h,p=e.wordWrapWidth*h;for(let d=0;d<r.length+1;d++){let f;const m=d===r.length;m||(f=r[d]);const g=t.chars[f];if(/(?:\s)/.test(f)||f==="\r"||f===`
`||m){if(!o&&e.wordWrap&&n.width+a.width-c>p?(u(),l(a),m||n.charPositions.push(0)):(a.start=n.width,l(a),m||n.charPositions.push(0)),f==="\r"||f===`
`)n.width!==0&&u();else if(!m){const x=g.xAdvance+(g.kerning[s]||0)+c;n.width+=x,n.spaceWidth=x,n.spacesIndex.push(n.charPositions.length),n.chars.push(f)}}else{const x=g.kerning[s]||0,b=g.xAdvance+x+c;a.positions[a.index++]=a.width+x,a.chars.push(f),a.width+=b}s=f}return u(),e.align==="center"?Rx(i):e.align==="right"?kx(i):e.align==="justify"&&Ox(i),i}function Rx(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],i=r.width/2-t.width/2;for(let n=0;n<t.charPositions.length;n++)t.charPositions[n]+=i}}function kx(r){for(let e=0;e<r.lines.length;e++){const t=r.lines[e],i=r.width-t.width;for(let n=0;n<t.charPositions.length;n++)t.charPositions[n]+=i}}function Ox(r){const e=r.width;for(let t=0;t<r.lines.length;t++){const i=r.lines[t];let n=0,s=i.spacesIndex[n++],o=0;const a=i.spacesIndex.length,l=(e-i.width)/a;for(let u=0;u<i.charPositions.length;u++)u===s&&(s=i.spacesIndex[n++],o+=l),i.charPositions[u]+=o}}var Fx=Object.defineProperty,Tp=Object.getOwnPropertySymbols,Ux=Object.prototype.hasOwnProperty,Ix=Object.prototype.propertyIsEnumerable,Sp=(r,e,t)=>e in r?Fx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Lo=(r,e)=>{for(var t in e||(e={}))Ux.call(e,t)&&Sp(r,t,e[t]);if(Tp)for(var t of Tp(e))Ix.call(e,t)&&Sp(r,t,e[t]);return r};class Gx{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1}}getFont(e,t){var i;let n=t.fontFamily,s=!0;t._fill.fill&&(n+=t._fill.fill.uid,s=!1),ie.has(n)||ie.set(n,new Fi(Lo({style:t,overrideFill:s},this.defaultOptions)));const o=ie.get(n);return(i=o.ensureCharacters)==null||i.call(o,e),o}getLayout(e,t){const i=this.getFont(e,t);return $o(e.split(""),t,i)}measureText(e,t){return this.getLayout(e,t)}install(e,t,i){if(!e)throw new Error("[BitmapFontManager] Property `name` is required.");i=Lo(Lo({},this.defaultOptions),i);const n=t instanceof mt?t:new mt(t),s=n._fill.fill!==null&&n._fill.fill!==void 0,o=new Fi({style:n,overrideFill:s,skipKerning:i.skipKerning,padding:i.padding,resolution:i.resolution}),a=Go(i.chars);return o.ensureCharacters(a.join("")),ie.set(e,o),o}}const Do=new Gx;class $x extends Oi{constructor(){super({view:new Fo})}}class zo{constructor(e){this._gpuBitmapText={},this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,t.view.context)),this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const i=this._getGpuBitmapText(e);e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,i.view.context)),this._renderer.renderPipes.graphics.addRenderable(i,t),i.view.context.customShader&&this._updateDistanceField(e)}destroyRenderable(e){this._destroyRenderableByUid(e.uid)}_destroyRenderableByUid(e){N.return(this._gpuBitmapText[e]),this._gpuBitmapText[e]=null}updateRenderable(e){const t=this._getGpuBitmapText(e);this._renderer.renderPipes.graphics.updateRenderable(t),t.view.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){var i;const n=e.view,s=Do.getFont(n.text,n._style);t.clear(),s.distanceField.type!=="none"&&(t.customShader||(this._sdfShader||(this._sdfShader=new bp),t.customShader=this._sdfShader));const o=Array.from(n.text),a=n._style;let l=(((i=a._stroke)==null?void 0:i.width)||0)/2;l+=s.baseLineOffset;const u=$o(o,a,s);let h=0;const c=a.padding,p=u.scale;t.translate(-n.anchor._x*u.width-c,-n.anchor._y*(u.height+u.offsetY)-c).scale(p,p);const d=a._fill.color;for(let f=0;f<u.lines.length;f++){const m=u.lines[f];for(let g=0;g<m.charPositions.length;g++){const x=o[h++],b=s.chars[x];b!=null&&b.texture&&t.texture(b.texture,d,Math.round(m.charPositions[g]+b.xOffset),Math.round(l+b.yOffset))}l+=s.lineHeight}}_getGpuBitmapText(e){return this._gpuBitmapText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t=N.get($x,e);return this._gpuBitmapText[e.uid]=t,t.view.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._updateContext(e,t.view.context),e.on("destroyed",()=>{this.destroyRenderable(e)}),this._gpuBitmapText[e.uid]}_updateDistanceField(e){var t;const i=this._getGpuBitmapText(e).view.context,n=e.view,s=n._style.fontFamily,o=ie.get(s),{a,b:l,c:u,d:h}=e.layerTransform,c=Math.sqrt(a*a+l*l),p=Math.sqrt(u*u+h*h),d=(Math.abs(c)+Math.abs(p))/2,f=o.baseRenderedFontSize/n._style.fontSize,m=(t=n.resolution)!=null?t:this._renderer.resolution,g=d*o.distanceField.range*(1/f)*m;i.customShader.resources.localUniforms.uniforms.uDistance=g}destroy(){var e;for(const t in this._gpuBitmapText)this._destroyRenderableByUid(t);this._gpuBitmapText=null,(e=this._sdfShader)==null||e.destroy(!0),this._sdfShader=null,this._renderer=null}}zo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"bitmapText"};class No{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){var t;const i=this._getGpuText(e),n=e.view._getKey();if(i.currentKey!==n){const s=e.view,o=(t=s.resolution)!=null?t:this._renderer.resolution,{width:a,height:l}=this._renderer.canvasText.getTextureSize(s.text,o,s._style);return!(this._renderer.canvasText.getReferenceCount(i.currentKey)===1&&a===i.texture._source.width&&l===i.texture._source.height)}return!1}addRenderable(e,t){const i=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.canvasText.decreaseReferenceCount(t.currentKey),N.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),i=this._getGpuText(e),n=i.batchableSprite;i.currentKey!==t&&this._updateGpuText(e),e.view._didUpdate=!1;const s=e.view._style.padding;ar(n.bounds,e.view.anchor,n.texture,s)}_updateGpuText(e){var t;const i=this._getGpuText(e),n=i.batchableSprite,s=e.view;i.texture&&this._renderer.canvasText.decreaseReferenceCount(i.currentKey);const o=(t=s.resolution)!=null?t:this._renderer.resolution;i.texture=n.texture=this._renderer.canvasText.getTexture(s.text,o,s._style,s._getKey()),i.currentKey=s._getKey(),n.texture=i.texture}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t={texture:null,currentKey:"--",batchableSprite:N.get(ki)};return t.batchableSprite.renderable=e,t.batchableSprite.bounds=[0,1,0,0],t.batchableSprite.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._gpuText[e.uid]=t,this._updateText(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}No.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"text"};const Lx=new pe;function Ho(r,e,t,i){const n=Lx;n.minX=0,n.minY=0,n.maxX=r.width/i|0,n.maxY=r.height/i|0;const s=ue.getOptimalTexture(n.width,n.height,i,!1);return s.source.uploadMethodId="image",s.source.resource=r,s.source.alphaMode="premultiply-alpha-on-upload",s.frameWidth=e/i,s.frameHeight=t/i,s.source.update(),s.layout.updateUvs(),s}class jo{constructor(){this._activeTextures={}}getTextureSize(e,t,i){const n=re.measureText(e||" ",i);let s=Math.ceil(Math.ceil(Math.max(1,n.width)+i.padding*2)*t),o=Math.ceil(Math.ceil(Math.max(1,n.height)+i.padding*2)*t);return s=Math.ceil(s-1e-6),o=Math.ceil(o-1e-6),s=ct(s),o=ct(o),{width:s,height:o}}getTexture(e,t,i,n){if(this._activeTextures[n])return this._increaseReferenceCount(n),this._activeTextures[n].texture;const s=re.measureText(e||" ",i),o=Math.ceil(Math.ceil(Math.max(1,s.width)+i.padding*2)*t),a=Math.ceil(Math.ceil(Math.max(1,s.height)+i.padding*2)*t),l=ze.getOptimalCanvasAndContext(o,a),{canvas:u}=l;this.renderTextToCanvas(e,i,t,l);const h=Ho(u,o,a,t);return this._activeTextures[n]={canvasAndContext:l,texture:h,usageCount:1},h}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];if(t.usageCount--,t.usageCount===0){ze.returnCanvasAndContext(t.canvasAndContext),ue.returnTexture(t.texture);const i=t.texture.source;i.resource=null,i.uploadMethodId="unknown",i.alphaMode="no-premultiply-alpha",this._activeTextures[e]=null}}getReferenceCount(e){return this._activeTextures[e].usageCount}renderTextToCanvas(e,t,i,n){var s,o,a,l,u,h;const{canvas:c,context:p}=n,d=Pr(t),f=re.measureText(e||" ",t),m=f.lines,g=f.lineHeight,x=f.lineWidths,b=f.maxLineWidth,v=f.fontProperties,_=c.height;if(p.resetTransform(),p.scale(i,i),p.clearRect(0,0,f.width+4,f.height+4),(s=t._stroke)!=null&&s.width){const S=t._stroke;p.lineWidth=S.width,p.miterLimit=S.miterLimit,p.lineJoin=S.join,p.lineCap=S.cap}p.font=d;let P,C;const B=t.dropShadow?2:1;for(let S=0;S<B;++S){const w=t.dropShadow&&S===0,T=w?Math.ceil(Math.max(1,_)+t.padding*2):0,L=T*i;if(w){p.fillStyle="black",p.strokeStyle="black";const E=t.dropShadow,q=E.color,J=E.alpha;p.shadowColor=j.shared.setValue(q).setAlpha(J).toRgbaString();const fe=E.blur*i,Dt=E.distance*i;p.shadowBlur=fe,p.shadowOffsetX=Math.cos(E.angle)*Dt,p.shadowOffsetY=Math.sin(E.angle)*Dt+L}else p.globalAlpha=(a=(o=t._fill)==null?void 0:o.alpha)!=null?a:1,p.fillStyle=t._fill?Ar(t._fill,p):null,(l=t._stroke)!=null&&l.width&&(p.strokeStyle=Ar(t._stroke,p)),p.shadowColor="black";let $=(g-v.fontSize)/2;g-v.fontSize<0&&($=0);const R=(h=(u=t._stroke)==null?void 0:u.width)!=null?h:0;for(let E=0;E<m.length;E++)P=R/2,C=R/2+E*g+v.ascent+$,t.align==="right"?P+=b-x[E]:t.align==="center"&&(P+=(b-x[E])/2),t._stroke&&this._drawLetterSpacing(m[E],t,n,P+t.padding,C+t.padding-T,!0),t._fill!==void 0&&this._drawLetterSpacing(m[E],t,n,P+t.padding,C+t.padding-T)}}_drawLetterSpacing(e,t,i,n,s,o=!1){const{context:a}=i,l=t.letterSpacing;let u=!1;if(re.experimentalLetterSpacingSupported&&(re.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,u=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||u){o?a.strokeText(e,n,s):a.fillText(e,n,s);return}let h=n;const c=re.graphemeSegmenter(e);let p=a.measureText(e).width,d=0;for(let f=0;f<c.length;++f){const m=c[f];o?a.strokeText(m,h,s):a.fillText(m,h,s);let g="";for(let x=f+1;x<c.length;++x)g+=c[x];d=a.measureText(g).width,h+=p-d+l,p=d}}destroy(){this._activeTextures=null}}jo.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"canvasText"};class Wo{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),i=e.view._getKey();return t.textureNeedsUploading?(t.textureNeedsUploading=!1,!0):t.currentKey!==i}addRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(t)}updateRenderable(e){const t=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),t.batcher.updateElement(t)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const t=this._gpuText[e];this._renderer.htmlText.decreaseReferenceCount(t.currentKey),N.return(t.batchableSprite),this._gpuText[e]=null}_updateText(e){const t=e.view._getKey(),i=this._getGpuText(e),n=i.batchableSprite;i.currentKey!==t&&this._updateGpuText(e).catch(o=>{console.error(o)}),e.view._didUpdate=!1;const s=e.view._style.padding;ar(n.bounds,e.view.anchor,n.texture,s)}async _updateGpuText(e){var t;e.view._didUpdate=!1;const i=this._getGpuText(e);if(i.generatingTexture)return;const n=e.view._getKey();this._renderer.htmlText.decreaseReferenceCount(i.currentKey),i.generatingTexture=!0,i.currentKey=n;const s=e.view,o=(t=s.resolution)!=null?t:this._renderer.resolution,a=await this._renderer.htmlText.getManagedTexture(s.text,o,s._style,s._getKey()),l=i.batchableSprite;l.texture=i.texture=a,i.generatingTexture=!1,i.textureNeedsUploading=!0,e.view.onUpdate();const u=e.view._style.padding;ar(l.bounds,e.view.anchor,l.texture,u)}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const t={texture:A.EMPTY,currentKey:"--",batchableSprite:N.get(ki),textureNeedsUploading:!1,generatingTexture:!1},i=t.batchableSprite;return i.renderable=e,i.texture=A.EMPTY,i.bounds=[0,1,0,0],i.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._gpuText[e.uid]=t,e.on("destroyed",()=>{this.destroyRenderable(e)}),t}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}Wo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"htmlText"};function Pp(){const{userAgent:r}=D.ADAPTER.getNavigator();return/^((?!chrome|android).)*safari/i.test(r)}function Ap(r,e){const t=/font-family:([^;"\s]+)/g,i=r.match(t),n=[e],s={};return s[e]=!0,i&&i.forEach(o=>{const a=o.split(":")[1].trim();s[a]||(n.push(a),s[a]=!0)}),n}async function Ep(r){const e=await(await D.ADAPTER.fetch(r)).blob(),t=new FileReader;return await new Promise((i,n)=>{t.onloadend=()=>i(t.result),t.onerror=n,t.readAsDataURL(e)})}async function Vo(r,e){const t=await Ep(e);return`@font-face {
        font-family: "${r.fontFamily}";
        src: url('${t}');
        font-weight: ${r.fontWeight};
        font-style: ${r.fontStyle};
    }`}var Dx=Object.defineProperty,zx=Object.defineProperties,Nx=Object.getOwnPropertyDescriptors,Cp=Object.getOwnPropertySymbols,Hx=Object.prototype.hasOwnProperty,jx=Object.prototype.propertyIsEnumerable,Mp=(r,e,t)=>e in r?Dx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Wx=(r,e)=>{for(var t in e||(e={}))Hx.call(e,t)&&Mp(r,t,e[t]);if(Cp)for(var t of Cp(e))jx.call(e,t)&&Mp(r,t,e[t]);return r},Vx=(r,e)=>zx(r,Nx(e));async function Bp(r,e){const t=r.filter(i=>ie.has(i)).map((i,n)=>{if(!Er.has(i)){const{url:s}=ie.get(i);n===0?Er.set(i,Vo(e,s)):Er.set(i,Vo(Vx(Wx({},Cr.defaultFontOptions),{fontFamily:i}),s))}return Er.get(i)});return(await Promise.all(t)).join(`
`)}function Rp(r,e,t,i,n){const{domElement:s,styleElement:o,svgRoot:a}=n;s.innerHTML=r,s.setAttribute("style",`transform: scale(${t});
${e.cssStyle}`),o.textContent=i;const{width:l,height:u}=n.image;return a.setAttribute("width",l.toString()),a.setAttribute("height",u.toString()),new XMLSerializer().serializeToString(a)}function kp(r,e){const t=ze.getOptimalCanvasAndContext(r.width,r.height,e),{context:i}=t;return i.clearRect(0,0,r.width,r.height),i.drawImage(r,0,0),ze.returnCanvasAndContext(t),t.canvas}function Op(r,e,t){return new Promise(async i=>{t&&await new Promise(n=>setTimeout(n,100)),r.onload=()=>{i()},r.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,r.crossOrigin="anonymous"})}let Fp;function Up(r,e,t,i){i=i||Fp||(Fp=new Yo);const{domElement:n,styleElement:s,svgRoot:o}=i;n.innerHTML=r,n.setAttribute("style",e.cssStyle),t&&(s.textContent=t),document.body.appendChild(o);const a=n.getBoundingClientRect();o.remove();const l=re.measureFont(e.fontStyle).descent;return{width:a.width,height:a.height+l}}const Ip="http://www.w3.org/2000/svg",Gp="http://www.w3.org/1999/xhtml",Er=new Map;class Yo{constructor(){this.svgRoot=document.createElementNS(Ip,"svg"),this.foreignObject=document.createElementNS(Ip,"foreignObject"),this.domElement=document.createElementNS(Gp,"div"),this.styleElement=document.createElementNS(Gp,"style"),this.image=new Image;const{foreignObject:e,svgRoot:t,styleElement:i,domElement:n}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(i),e.appendChild(n)}}class Cr{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===Re.WEBGPU}getTexture(e){return this._buildTexturePromise(e.text,e.resolution,e.style)}getManagedTexture(e,t,i,n){if(this._activeTextures[n])return this._increaseReferenceCount(n),this._activeTextures[n].promise;const s=this._buildTexturePromise(e,t,i).then(o=>(this._activeTextures[n].texture=o,o));return this._activeTextures[n]={texture:null,promise:s,usageCount:1},s}async _buildTexturePromise(e,t,i){const n=N.get(Yo),s=Ap(e,i.fontFamily),o=await Bp(s,i),a=Up(e,i,o,n),l=Math.ceil(Math.ceil(Math.max(1,a.width)+i.padding*2)*t),u=Math.ceil(Math.ceil(Math.max(1,a.height)+i.padding*2)*t),h=n.image;h.width=l|0,h.height=u|0;const c=Rp(e,i,t,o,n);await Op(h,c,Pp()&&s.length>0);let p=h;this._createCanvas&&(p=kp(h,t));const d=Ho(p,p.width,p.height,t);return this._createCanvas&&this._renderer.texture.initSource(d.source),N.return(n),d}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t):t.promise.then(i=>{t.texture=i,this._cleanUp(t)}).catch(()=>{}),this._activeTextures[e]=null))}_cleanUp(e){ue.returnTexture(e.texture),e.texture.source.resource=null,e.texture.source.uploadMethodId="unknown"}getReferenceCount(e){return this._activeTextures[e].usageCount}destroy(){this._activeTextures=null}}Cr.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"htmlText"},Cr.defaultFontOptions={fontFamily:"Arial",fontStyle:"normal",fontWeight:"normal"};var Yx=Object.defineProperty,$p=Object.getOwnPropertySymbols,Xx=Object.prototype.hasOwnProperty,qx=Object.prototype.propertyIsEnumerable,Lp=(r,e,t)=>e in r?Yx(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Dp=(r,e)=>{for(var t in e||(e={}))Xx.call(e,t)&&Lp(r,t,e[t]);if($p)for(var t of $p(e))qx.call(e,t)&&Lp(r,t,e[t]);return r};const zp=class{constructor(){this._backgroundColorRgba=[0,0,0,0],this.clearBeforeRender=!0,this._backgroundColor=new j(0),this.color=this._backgroundColor,this.alpha=1}init(r){r=Dp(Dp({},zp.defaultOptions),r),this.clearBeforeRender=r.clearBeforeRender,this.color=r.background||r.backgroundColor||this._backgroundColor,this.alpha=r.backgroundAlpha}get color(){return this._backgroundColor}set color(r){this._backgroundColor.setValue(r),this._backgroundColorRgba=this._backgroundColor.toArray()}get alpha(){return this._backgroundColor.alpha}set alpha(r){this._backgroundColor.setAlpha(r)}get colorRgba(){return this._backgroundColorRgba}destroy(){}};let Ui=zp;Ui.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"background",priority:0},Ui.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};class Kx extends ee{constructor(){super({gl:{functions:`
                ${si}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendColor(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${oi}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}class Zx extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class Qx extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class Jx extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class e_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class t_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class r_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class i_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class n_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class s_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class o_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class a_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class l_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class u_ extends ee{constructor(){super({gl:{functions:`
                ${si}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLuminosity(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${oi}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class h_ extends ee{constructor(){super({gl:{functions:`
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
            `}})}}class c_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class d_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class p_ extends ee{constructor(){super({gl:{functions:`
                ${si}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                ${oi}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}class f_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class g_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}class m_ extends ee{constructor(){super({gl:{functions:`
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
                `}})}}const Xo={color:Kx,"color-burn":Zx,"color-dodge":Qx,darken:Jx,difference:e_,divide:t_,exclusion:r_,"hard-light":i_,"hard-mix":n_,lighten:s_,"linear-burn":o_,"linear-dodge":a_,"linear-light":l_,luminosity:u_,negation:h_,overlay:c_,"pin-light":d_,saturation:p_,"soft-light":f_,subtract:g_,"vivid-light":m_};class qo{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,t,i){if(this._activeBlendMode===t){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=t,this._isAdvanced&&this._endAdvancedBlendMode(i),this._isAdvanced=!!Xo[t],this._isAdvanced&&(this._beginAdvancedBlendMode(i),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);const t=this._activeBlendMode;if(!Xo[t])return;this._filterHash[t]||(this._filterHash[t]=new Ur({filters:[new Xo[t]]}));const i={type:"filter",action:"pushFilter",renderables:[],filterEffect:this._filterHash[t],canBundle:!1};this._renderableList=i.renderables,e.add(i)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({type:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}qo.extension={type:[y.WebGLPipes,y.WebGPUPipes,y.CanvasPipes],name:"blendMode"};var b_=Object.defineProperty,Np=Object.getOwnPropertySymbols,v_=Object.prototype.hasOwnProperty,y_=Object.prototype.propertyIsEnumerable,Hp=(r,e,t)=>e in r?b_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Ko=(r,e)=>{for(var t in e||(e={}))v_.call(e,t)&&Hp(r,t,e[t]);if(Np)for(var t of Np(e))y_.call(e,t)&&Hp(r,t,e[t]);return r};const jp=class{constructor(r){this._renderer=r}_normalizeOptions(r,e={}){return r instanceof V||r instanceof A?Ko({target:r},e):Ko(Ko({},e),r)}async image(r){const e=new Image;return e.src=await this.base64(r),e}async base64(r){r=this._normalizeOptions(r,jp.defaultImageOptions);const{format:e,quality:t}=r,i=this.canvas(r);if(i.toBlob!==void 0)return new Promise((n,s)=>{i.toBlob(o=>{if(!o){s(new Error("ICanvas.toBlob failed!"));return}const a=new FileReader;a.onload=()=>n(a.result),a.onerror=s,a.readAsDataURL(o)},e,t)});if(i.toDataURL!==void 0)return i.toDataURL(e,t);if(i.convertToBlob!==void 0){const n=await i.convertToBlob({type:e,quality:t});return new Promise((s,o)=>{const a=new FileReader;a.onload=()=>s(a.result),a.onerror=o,a.readAsDataURL(n)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(r){r=this._normalizeOptions(r);const e=r.target,t=this._renderer,i=e instanceof A?e:t.textureGenerator.generateTexture(r),n=t.texture.generateCanvas(i);return e instanceof V&&i.destroy(),n}pixels(r){r=this._normalizeOptions(r);const e=r.target,t=this._renderer,i=e instanceof A?e:t.textureGenerator.generateTexture(r),n=t.texture.getPixels(i);return e instanceof V&&i.destroy(),n}texture(r){return r=this._normalizeOptions(r),r.target instanceof A?r.target:this._renderer.textureGenerator.generateTexture(r)}download(r){var e;r=this._normalizeOptions(r);const t=this.canvas(r),i=document.createElement("a");i.download=(e=r.filename)!=null?e:"image.png",i.href=t.toDataURL("image/png"),document.body.appendChild(i),i.click(),document.body.removeChild(i)}log(r){var e;const t=(e=r.width)!=null?e:200;r=this._normalizeOptions(r);const i=this.canvas(r),n=i.toDataURL();console.log(`[Pixi Texture] ${i.width}px ${i.height}px`);const s=["font-size: 1px;",`padding: ${t}px 300px;`,`background: url(${n}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",s)}destroy(){this._renderer=null}};let Ii=jp;Ii.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"extract"},Ii.defaultImageOptions={format:"png",quality:1};class Wp extends A{static create(e){return new A({source:new le(e)})}resize(e,t,i){return this.source.resize(e,t,i),this}}var x_=Object.defineProperty,__=Object.defineProperties,w_=Object.getOwnPropertyDescriptors,Vp=Object.getOwnPropertySymbols,T_=Object.prototype.hasOwnProperty,S_=Object.prototype.propertyIsEnumerable,Yp=(r,e,t)=>e in r?x_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,P_=(r,e)=>{for(var t in e||(e={}))T_.call(e,t)&&Yp(r,t,e[t]);if(Vp)for(var t of Vp(e))S_.call(e,t)&&Yp(r,t,e[t]);return r},A_=(r,e)=>__(r,w_(e));const E_=new K,C_=new pe,M_=[0,0,0,0];class Zo{constructor(e){this._renderer=e}generateTexture(e){var t;e instanceof V&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const i=e.resolution||this._renderer.resolution,n=e.target;let s=e.clearColor;s?s=Array.isArray(s)&&s.length===4?s:j.shared.setValue(s).toArray():s=M_;const o=((t=e.frame)==null?void 0:t.copyTo(E_))||He(n,C_).rectangle;o.width=Math.max(o.width,1/i)|0,o.height=Math.max(o.height,1/i)|0;const a=Wp.create(A_(P_({},e.textureSourceOptions),{width:o.width,height:o.height,resolution:i})),l=k.shared.translate(-o.x,-o.y);return this._renderer.render({container:n,transform:l,target:a,clearColor:s}),a}destroy(){const e=this;e._renderer=null}}Zo.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"textureGenerator"};class Qo{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({projectionData:e,worldTransformMatrix:t,worldColor:i,offset:n}){const s=this._renderer.renderTarget.renderTarget,o=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionData:s,worldTransformMatrix:new k,worldColor:4294967295,offset:new W},a={projectionMatrix:(e==null?void 0:e.projectionMatrix)||s.projectionMatrix,resolution:(e==null?void 0:e.size)||s.size,worldTransformMatrix:t||o.worldTransformMatrix,worldColor:i||o.worldColor,offset:n||o.offset,bindGroup:null},l=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(l);const u=l.uniforms;u.projectionMatrix=a.projectionMatrix,u.uResolution=a.resolution,u.worldTransformMatrix.copyFrom(a.worldTransformMatrix),u.worldTransformMatrix.tx-=a.offset.x,u.worldTransformMatrix.ty-=a.offset.y,u.worldAlpha=(a.worldColor>>24&255)/255,l.update();let h;this._renderer.renderPipes.uniformBatch?h=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(l,!1):(this._renderer.uniformBuffer.updateUniformGroup(l),h=this._bindGroupPool.pop()||new Be,this._activeBindGroups.push(h),h.setResource(l,0)),a.bindGroup=h,this._currentGlobalUniformData=a}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1]}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new te({projectionMatrix:{value:new k,type:"mat3x3<f32>"},worldTransformMatrix:{value:new k,type:"mat3x3<f32>"},worldAlpha:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}},{ubo:!0,isStatic:!0})}destroy(){const e=this;e._renderer=null}}Qo.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"globalUniforms"};const Jo={f32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"mat2x2<f32>":48,"mat3x3<f32>":48,"mat4x4<f32>":64};function Xp(r){const e=r.map(s=>({data:s,offset:0,size:0}));let t=0,i=0,n=0;for(let s=0;s<e.length;s++){const o=e[s];if(t=Jo[o.data.type],!t)throw new Error(`Unknown type ${o.data.type}`);if(o.data.size>1&&(t=Math.max(t,16)*o.data.size),o.size=t,i%t!==0&&i<16){const a=i%t%16;i+=a,n+=a}i+t>16?(n=Math.ceil(n/16)*16,o.offset=n,n+=t,i=t):(o.offset=n,i+=t,n+=t)}return n=Math.ceil(n/16)*16,{uboElements:e,size:n}}const Gi=[{type:"mat3x3<f32>",test:r=>r.value.a!==void 0,code:r=>`
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
                `}],B_={f32:`
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
    `};function qp(r){const e=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
    `];let t=0;for(let n=0;n<r.length;n++){const s=r[n],o=s.data.name;let a=!1,l=0;for(let u=0;u<Gi.length;u++)if(Gi[u].test(s.data)){l=s.offset/4,e.push(`offset += ${l-t};`,Gi[u].code(o)),a=!0;break}if(!a)if(s.data.size>1){const u=Math.max(Jo[s.data.type]/16,1),h=s.data.value.length/s.data.size,c=(4-h%4)%4;l=s.offset/4,e.push(`
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
                `)}else{const u=B_[s.data.type];l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-t};
                    ${u};
                `)}t=l}const i=e.join(`
`);return new Function("uv","data","offset",i)}class ea{constructor(){this._syncFunctionHash=Object.create(null)}ensureUniformGroup(e){e._syncFunction||this._initUniformGroup(e)}_initUniformGroup(e){const t=e.signature;let i=this._syncFunctionHash[t];if(!i){const n=Object.keys(e.uniformStructures).map(a=>e.uniformStructures[a]),s=Xp(n),o=qp(s.uboElements);i=this._syncFunctionHash[t]={layout:s,syncFunction:o}}return e._syncFunction=i.syncFunction,e.buffer=new we({data:new Float32Array(i.layout.size/4),usage:H.UNIFORM|H.COPY_DST}),e._syncFunction}syncUniformGroup(e,t,i){const n=e._syncFunction||this._initUniformGroup(e);return t||(t=e.buffer.data),i||(i=0),n(e.uniforms,t,i),!0}updateUniformGroup(e){if(e.isStatic&&!e.dirtyId)return!1;e.dirtyId=0;const t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}}ea.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"uniformBuffer"};let Kp=!1;const ta="8.0.0-beta.2";function Zp(r){if(!Kp){if(D.ADAPTER.getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${ta} (${r}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${ta} - ${r} - http://www.pixijs.com/`);Kp=!0}}class $i{constructor(e){this._renderer=e}init(e){e.hello&&Zp(this._renderer.name)}}$i.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"hello",priority:0},$i.defaultOptions={hello:!1};var R_=Object.defineProperty,Qp=Object.getOwnPropertySymbols,k_=Object.prototype.hasOwnProperty,O_=Object.prototype.propertyIsEnumerable,Jp=(r,e,t)=>e in r?R_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ef=(r,e)=>{for(var t in e||(e={}))k_.call(e,t)&&Jp(r,t,e[t]);if(Qp)for(var t of Qp(e))O_.call(e,t)&&Jp(r,t,e[t]);return r};const tf=class{constructor(r){this._renderer=r,this.count=0,this.checkCount=0}init(r){r=ef(ef({},tf.defaultOptions),r),this.checkCountMax=r.textureGCCheckCountMax,this.maxIdle=r.textureGCAMaxIdle,this.active=r.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const r=this._renderer.texture.managedTextures;for(let e=0;e<r.length;e++){const t=r[e];t.resource&&t.touched>-1&&this.count-t.touched>this.maxIdle&&(t.touched=-1,t.unload())}}destroy(){this._renderer=null}};let Mr=tf;Mr.extension={type:[y.WebGLSystem,y.WebGPUSystem],name:"textureGC"},Mr.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:60*60,textureGCCheckCountMax:600},Z.add(Mr);var F_=Object.defineProperty,rf=Object.getOwnPropertySymbols,U_=Object.prototype.hasOwnProperty,I_=Object.prototype.propertyIsEnumerable,nf=(r,e,t)=>e in r?F_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,sf=(r,e)=>{for(var t in e||(e={}))U_.call(e,t)&&nf(r,t,e[t]);if(rf)for(var t of rf(e))I_.call(e,t)&&nf(r,t,e[t]);return r};const of=class{get resolution(){return this.texture.source._resolution}set resolution(r){this.texture.source.resize(this.texture.source.width,this.texture.source.height,r)}init(r){r=sf(sf({},of.defaultOptions),r),r.element&&(O(G,"ViewSystem.element has been renamed to ViewSystem.canvas"),r.canvas=r.element),this.screen=new K(0,0,r.width,r.height),this.canvas=r.canvas||D.ADAPTER.createCanvas(),this.antialias=!!r.antialias,this.texture=xi(this.canvas,r),this.multiView=!!r.multiView,this.autoDensity&&(this.canvas.style.width=`${this.texture.width}px`,this.canvas.style.height=`${this.texture.height}px`)}resize(r,e,t){this.texture.source.resize(r,e,t),this.screen.width=this.texture.frameWidth,this.screen.height=this.texture.frameHeight,this.autoDensity&&(this.canvas.style.width=`${r}px`,this.canvas.style.height=`${e}px`)}destroy(r=!1){(typeof r=="boolean"?r:r!=null&&r.removeView)&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};let Li=of;Li.extension={type:[y.WebGLSystem,y.WebGPUSystem,y.CanvasSystem],name:"view",priority:0},Li.defaultOptions={width:800,height:600,resolution:D.RESOLUTION,autoDensity:!1,antialias:!1};const ra=[Ui,bs,Eo,Qo,$i,Li,jo,Cr,fo,ea,Mr,Zo,Ii,Zt],ia=[qo,Rs,Ro,lo,Bo,Mo,No,Wo,zo,Oo,gs,Os,Us,Fs],G_=[...ra,vi,mi,Is,io,js,Ls,Zs,Ks,zs,Js,Ws,Ds],$_=[...ia],L_=[Ss,so,no],af=[],lf=[],uf=[];Z.handleByNamedList(y.WebGLSystem,af),Z.handleByNamedList(y.WebGLPipes,lf),Z.handleByNamedList(y.WebGLPipesAdaptor,uf),Z.add(...G_,...$_,...L_);class hf extends oo{constructor(){const e={name:"webgl2",type:Re.WEBGL,systems:af,renderPipes:lf,renderPipeAdaptors:uf};super(e)}}var D_={__proto__:null,WebGLRenderer:hf};class na{constructor(e){this._hash=Object.create(null),this._renderer=e}contextChange(e){this._gpu=e}getBindGroup(e,t,i){return e.updateKey(),this._hash[e.key]||this._createBindGroup(e,t,i)}_createBindGroup(e,t,i){var n;const s=this._gpu.device,o=t.layout[i],a=[];for(const u in o){const h=(n=e.resources[u])!=null?n:e.resources[o[u]];let c;if(h.resourceType==="uniformGroup"){const p=h;this._renderer.uniformBuffer.updateUniformGroup(p);const d=p.buffer;c={buffer:this._renderer.buffer.getGPUBuffer(d),offset:0,size:d.descriptor.size}}else if(h.resourceType==="buffer"){const p=h;c={buffer:this._renderer.buffer.getGPUBuffer(p),offset:0,size:p.descriptor.size}}else if(h.resourceType==="bufferResource"){const p=h;c={buffer:this._renderer.buffer.getGPUBuffer(p.buffer),offset:p.offset,size:p.size}}else if(h.resourceType==="textureSampler"){const p=h;c=this._renderer.texture.getGpuSampler(p)}else if(h.resourceType==="textureSource"){const p=h;c=this._renderer.texture.getGpuSource(p).createView({})}a.push({binding:o[u],resource:c})}const l=s.createBindGroup({layout:t._gpuLayout.bindGroups[i],entries:a});return this._hash[e.key]=l,l}destroy(){for(const t of Object.keys(this._hash))this._hash[t]=null;this._hash=null;const e=this;e._renderer=null}}na.extension={type:[y.WebGPUSystem],name:"bindGroup"};class sa{constructor(){this._gpuBuffers=Object.create(null)}contextChange(e){this._gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){const t=this._gpuBuffers[e.uid]||this.createGPUBuffer(e);return e._updateID&&e.data&&(e._updateID=0,this._gpu.device.queue.writeBuffer(t,0,e.data.buffer,0,e._updateSize)),t}destroyAll(){for(const e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){const t=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(gi(e.data.buffer,t.getMappedRange()),t.unmap()),this._gpuBuffers[e.uid]=t,e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),t}onBufferChange(e){let t=this._gpuBuffers[e.uid];t.destroy(),t=this.createGPUBuffer(e),e._updateID=0}onBufferDestroy(e){this._gpuBuffers[e.uid].destroy(),this._gpuBuffers[e.uid]=null}destroy(){for(const t of Object.keys(this._gpuBuffers)){const i=Number(t);this._gpuBuffers[i].destroy(),this._gpuBuffers[i]=null}this._gpuBuffers=null;const e=this;e._renderer=null}}sa.extension={type:[y.WebGPUSystem],name:"buffer"};function z_(r,e){const t=r.descriptor.size,i=e.gpu.device,n=new we({data:new Float32Array(24e5),usage:H.MAP_READ|H.COPY_DST}),s=e.buffer.createGPUBuffer(n),o=i.createCommandEncoder();o.copyBufferToBuffer(e.buffer.getGPUBuffer(r),0,s,0,t),i.queue.submit([o.finish()]),s.mapAsync(GPUMapMode.READ,0,t).then(()=>{s.getMappedRange(0,t),s.unmap()})}class cf{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const t=this.byteIndex;let i=t+e*4;if(i=Math.ceil(i/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,i>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=i,t}addGroup(e){const t=this.addEmptyGroup(e.length);for(let i=0;i<e.length;i++)this.data[t/4+i]=e[i];return t}destroy(){this._buffer.destroy(),this._buffer=null,this.data=null}}class oa{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){const e=this;e._renderer=null,this._colorMaskCache=null}}oa.extension={type:[y.WebGPUSystem],name:"colorMask"};class aa{constructor(e){this._renderer=e}async init(){return this._initPromise?this._initPromise:(this._initPromise=this._createDeviceAndAdaptor({}).then(e=>{this.gpu=e,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async _createDeviceAndAdaptor(e){const t=await navigator.gpu.requestAdapter(e),i=await t.requestDevice();return{adapter:t,device:i}}destroy(){this.gpu=null,this._renderer=null}}aa.extension={type:[y.WebGPUSystem],name:"device"};var N_=Object.defineProperty,df=Object.getOwnPropertySymbols,H_=Object.prototype.hasOwnProperty,j_=Object.prototype.propertyIsEnumerable,pf=(r,e,t)=>e in r?N_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,ff=(r,e)=>{for(var t in e||(e={}))H_.call(e,t)&&pf(r,t,e[t]);if(df)for(var t of df(e))j_.call(e,t)&&pf(r,t,e[t]);return r};class la{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}start(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e,t){this.renderPassEncoder&&this.renderPassEncoder.end(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(t.descriptor),this._setViewport(e.viewport)}_setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,t,i,n){const s=this._renderer.pipeline.getPipeline(e,t,i,n);this.setPipeline(s)}setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,t){this._boundVertexBuffer[e]!==t&&(this._boundVertexBuffer[e]=t,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(t)))}_setIndexBuffer(e){this._boundIndexBuffer!==e&&(this._boundIndexBuffer=e,this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),"uint32"))}setBindGroup(e,t,i){if(this._boundBindGroup[e]===t)return;this._boundBindGroup[e]=t,t.touch(this._renderer.textureGC.count);const n=this._renderer.bindGroup.getBindGroup(t,i,e);this.renderPassEncoder.setBindGroup(e,n)}setGeometry(e){for(const t in e.attributes){const i=e.attributes[t];this._setVertexBuffer(i.shaderLocation,i.buffer)}e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,t){for(const i in e.groups){const n=e.groups[i];t||this._syncBindGroup(n),this.setBindGroup(i,n,e.gpuProgram)}}_syncBindGroup(e){for(const t in e.resources){const i=e.resources[t];i.isUniformGroup&&this._renderer.uniformBuffer.updateUniformGroup(i)}}draw(e){const{geometry:t,shader:i,state:n,topology:s,size:o,start:a,instanceCount:l,skipSync:u}=e;this.setPipelineFromGeometryProgramAndState(t,i.gpuProgram,n,s),this.setGeometry(t),this._setShaderBindGroups(i,u),t.indexBuffer?this.renderPassEncoder.drawIndexed(o||t.indexBuffer.data.length,l||1,a||0):this.renderPassEncoder.draw(o||t.getSize(),l||1,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished()}restoreRenderPass(){const e=this._renderer.renderTarget.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const t=this._boundPipeline,i=ff({},this._boundVertexBuffer),n=this._boundIndexBuffer,s=ff({},this._boundBindGroup);this._clearCache();const o=this._renderer.renderTarget.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this.setPipeline(t);for(const a in i)this._setVertexBuffer(a,i[a]);for(const a in s)this.setBindGroup(a,s[a],null);this._setIndexBuffer(n)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){const e=this;e._renderer=null,this._gpu=null,this._boundBindGroup=null,this._boundVertexBuffer=null,this._boundIndexBuffer=null,this._boundPipeline=null}contextChange(e){this._gpu=e}}la.extension={type:[y.WebGPUSystem],name:"encoder"};class ua{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let t=this._renderTargetStencilState[e.uid];t||(t=this._renderTargetStencilState[e.uid]={stencilMode:ne.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(t.stencilMode,t.stencilReference)}setStencilMode(e,t){const i=this._renderTargetStencilState[this._activeRenderTarget.uid];i.stencilMode=e,i.stencilReference=t;const n=this._renderer;n.pipeline.setStencilMode(e),n.encoder.renderPassEncoder.setStencilReference(t)}destroy(){this._renderer.renderTarget.onRenderTargetChange.remove(this);const e=this;e._renderer=null,this._activeRenderTarget=null,this._renderTargetStencilState=null}}ua.extension={type:[y.WebGPUSystem],name:"stencil"};const We=128;class ha{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._batchBuffer=new cf({minUniformOffsetAlignment:We});const t=256/We;for(let i=0;i<t;i++){let n=H.UNIFORM|H.COPY_DST;i===0&&(n|=H.COPY_SRC),this._buffers.push(new we({data:this._batchBuffer.data,usage:n}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){for(const e in this._bindGroupHash)this._bindGroupHash[e]=null;this._batchBuffer.clear()}getUniformBindGroup(e,t){if(!t&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.uniformBuffer.ensureUniformGroup(e);const i=e.buffer.data,n=this._batchBuffer.addEmptyGroup(i.length);return this._renderer.uniformBuffer.syncUniformGroup(e,this._batchBuffer.data,n/4),this._bindGroupHash[e.uid]=this._getBindGroup(n/We),this._bindGroupHash[e.uid]}getUniformBufferResource(e){this._renderer.uniformBuffer.updateUniformGroup(e);const t=e.buffer.data,i=this._batchBuffer.addGroup(t);return this._getBufferResource(i/We)}getArrayBindGroup(e){const t=this._batchBuffer.addGroup(e);return this._getBindGroup(t/We)}getArrayBufferResource(e){const t=this._batchBuffer.addGroup(e)/We;return this._getBufferResource(t)}_getBufferResource(e){if(!this._bufferResources[e]){const t=this._buffers[e%2];this._bufferResources[e]=new _i({buffer:t,offset:(e/2|0)*256,size:We})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){const t=new Be({0:this._getBufferResource(e)});this._bindGroups[e]=t}return this._bindGroups[e]}_uploadBindGroups(){const e=this._renderer.buffer,t=this._buffers[0];t.update(this._batchBuffer.byteIndex),e.updateBuffer(t);const i=this._renderer.gpu.device.createCommandEncoder();for(let n=1;n<this._buffers.length;n++){const s=this._buffers[n];i.copyBufferToBuffer(e.getGPUBuffer(t),We,e.getGPUBuffer(s),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([i.finish()])}destroy(){for(let e=0;e<this._bindGroups.length;e++)this._bindGroups[e].destroy();this._bindGroups=null,this._bindGroupHash=null;for(let e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers=null;for(let e=0;e<this._bufferResources.length;e++)this._bufferResources[e].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._bindGroupHash=null,this._renderer=null}}ha.extension={type:[y.WebGPUPipes],name:"uniformBatch"};class W_ extends Be{constructor(){super({0:new we({data:new Float32Array(128),usage:H.UNIFORM|H.COPY_DST})})}get buffer(){return this.resources[0]}get data(){return this.resources[0].data}}class ca{constructor(e){this._activeBindGroups=[],this._activeBindGroupIndex=0,this._renderer=e}getUniformBindGroup(e){const t=this._renderer;t.uniformBuffer.ensureUniformGroup(e);const i=N.get(W_);return t.uniformBuffer.syncUniformGroup(e,i.data,0),i.buffer.update(e.buffer.data.byteLength),this._activeBindGroups[this._activeBindGroupIndex++]=i,i}renderEnd(){for(let e=0;e<this._activeBindGroupIndex;e++)N.return(this._activeBindGroups[e]);this._activeBindGroupIndex=0}}ca.extension={type:[y.WebGPUPipes],name:"uniformBuffer"};const V_={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function Y_(r,e,t,i,n,s,o,a){return r<<26|e<<18|o<<14|t<<8|i<<3|a<<1|n<<4|s}class da{constructor(e){this._moduleCache=Object.create(null),this._bufferLayoutsCache=Object.create(null),this._pipeCache=Object.create(null),this._colorMask=15,this._multisampleCount=1,this._renderer=e}contextChange(e){this._gpu=e,this.setStencilMode(ne.DISABLED)}setMultisampleCount(e){this._multisampleCount=e}setColorMask(e){this._colorMask=e}setStencilMode(e){this._stencilMode=e,this._stencilState=ke[e]}setPipeline(e,t,i,n){const s=this.getPipeline(e,t,i);n.setPipeline(s)}getPipeline(e,t,i,n){e._layoutKey||this._generateBufferKey(e),t._layoutKey||(this._generateProgramKey(t),this._renderer.shader.createProgramLayout(t)),n=n||e.topology;const s=Y_(e._layoutKey,t._layoutKey,i.data,i._blendModeId,this._stencilMode,this._multisampleCount,this._colorMask,V_[n]);return this._pipeCache[s]?this._pipeCache[s]:(this._pipeCache[s]=this._createPipeline(e,t,i,n),this._pipeCache[s])}_createPipeline(e,t,i,n){const s=this._gpu.device,o=this._createVertexBufferLayouts(e),a=this._renderer.state.getColorTargets(i);let l=this._stencilState;l=ke[this._stencilMode],a[0].writeMask=this._stencilMode===ne.RENDERING_MASK_ADD?0:this._colorMask;const u={vertex:{module:this._getModule(t.vertex.source),entryPoint:t.vertex.entryPoint,buffers:o},fragment:{module:this._getModule(t.fragment.source),entryPoint:t.fragment.entryPoint,targets:a},primitive:{topology:n,cullMode:i.cullMode},layout:t._gpuLayout.pipeline,multisample:{count:this._multisampleCount},depthStencil:l,label:"PIXI Pipeline"};return s.createRenderPipeline(u)}_getModule(e){return this._moduleCache[e]||this._createModule(e)}_createModule(e){const t=this._gpu.device;return this._moduleCache[e]=t.createShaderModule({code:e}),this._moduleCache[e]}_generateProgramKey(e){const{vertex:t,fragment:i}=e,n=t.source+i.source+t.entryPoint+i.entryPoint;return e._layoutKey=jr(n,"program"),e._layoutKey}_generateBufferKey(e){const t=[];let i=0;const n=Object.keys(e.attributes).sort();for(let o=0;o<n.length;o++){const a=e.attributes[n[o]];t[i++]=a.shaderLocation,t[i++]=a.offset,t[i++]=a.format,t[i++]=a.stride}const s=t.join("");return e._layoutKey=jr(s,"geometry"),e._layoutKey}_createVertexBufferLayouts(e){if(this._bufferLayoutsCache[e._layoutKey])return this._bufferLayoutsCache[e._layoutKey];const t=[];return e.buffers.forEach(i=>{const n={arrayStride:0,stepMode:"vertex",attributes:[]},s=n.attributes;for(const o in e.attributes){const a=e.attributes[o];a.buffer===i&&(n.arrayStride=a.stride,s.push({shaderLocation:a.shaderLocation,offset:a.offset,format:a.format}))}s.length&&t.push(n)}),this._bufferLayoutsCache[e._layoutKey]=t,t}destroy(){const e=this;e._renderer=null,this._bufferLayoutsCache=null}}da.extension={type:[y.WebGPUSystem],name:"pipeline"};class gf{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}class pa{constructor(e){this.rootProjectionMatrix=new k,this.onRenderTargetChange=new yi("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._renderer=e}renderStart({target:e,clear:t,clearColor:i}){this.rootRenderTarget=this.getRenderTarget(e),this.rootProjectionMatrix=this.rootRenderTarget.projectionMatrix,this.renderingToScreen=Ns(this.rootRenderTarget),this._renderTargetStack.length=0,this._renderer.encoder.start(),this.push(this.rootRenderTarget,t,i!=null?i:this._renderer.background.colorRgba)}contextChange(e){this._gpu=e}bind(e,t=!0,i){const n=this.getRenderTarget(e),s=this.renderTarget!==n;return this.renderTarget=n,this._startRenderPass(t,i),s&&this.onRenderTargetChange.emit(n),n}_getGpuColorTexture(e){const t=this._getGpuRenderTarget(e);return t.contexts[0]?t.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,t,i){typeof t=="boolean"&&(t=t?me.ALL:me.NONE);const n=this._getGpuRenderTarget(e),s=e.colorTextures.map((a,l)=>{const u=n.contexts[l];let h,c;u?h=u.getCurrentTexture().createView():h=this._renderer.texture.getTextureView(a),n.msaaTextures[l]&&(c=h,h=this._renderer.texture.getTextureView(n.msaaTextures[l]));const p=t&me.COLOR?"clear":"load";return i!=null||(i=this._defaultClearColor),{view:h,resolveTarget:c,clearValue:i,storeOp:"store",loadOp:p}});let o;if(e.depthTexture){const a=t&me.STENCIL?"clear":"load";o={view:this._renderer.texture.getGpuSource(e.depthTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:a}}return{colorAttachments:s,depthStencilAttachment:o}}clear(e=me.ALL,t){e&&this._startRenderPass(e,t)}push(e,t=me.ALL,i){const n=this.bind(e,t,i);return this._renderTargetStack.push(n),n}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var t;return(t=this._renderSurfaceToRenderTargetHash.get(e))!=null?t:this._initRenderTarget(e)}copyToTexture(e,t,i,n){const s=this._renderer,o=s.renderTarget._getGpuColorTexture(e),a=s.texture.getGpuSource(t.source);return s.encoder.commandEncoder.copyTextureToTexture({texture:o,origin:i},{texture:a},n),t}restart(){this.bind(this.rootRenderTarget,me.NONE)}destroy(){const e=this;e._renderer=null,this._renderSurfaceToRenderTargetHash.clear()}_startRenderPass(e=!0,t){const i=this.renderTarget,n=this._getGpuRenderTarget(i);(i.width!==n.width||i.height!==n.height)&&this._resizeGpuRenderTarget(i);const s=this.getDescriptor(i,e,t);n.descriptor=s,this._renderer.encoder.beginRenderPass(i,n),this._renderer.pipeline.setMultisampleCount(n.msaaSamples)}_initRenderTarget(e){let t=null;return e instanceof HTMLCanvasElement&&(e=xi(e)),e instanceof kt?t=e:e instanceof A&&(t=new kt({colorTextures:[e],depthTexture:e.source.depthStencil})),t.isRoot=!0,this._renderSurfaceToRenderTargetHash.set(e,t),t}_getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){e.isRoot=!0;const t=new gf;return e.colorTextures.forEach((i,n)=>{if(i.source.resource instanceof HTMLCanvasElement){const s=e.colorTexture.source.resource.getContext("webgpu");try{s.configure({device:this._gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"})}catch(o){console.error(o)}t.contexts[n]=s}if(t.msaa=i.source.antialias,i.source.antialias){const s=new le({width:0,height:0,sampleCount:4});t.msaaTextures[n]=s}}),t.msaa&&(t.msaaSamples=4,e.depthTexture&&(e.depthTexture.source.sampleCount=4)),this._gpuRenderTargetHash[e.uid]=t,t}_resizeGpuRenderTarget(e){const t=this._getGpuRenderTarget(e);t.width=e.width,t.height=e.height,t.msaa&&e.colorTextures.forEach((i,n)=>{const s=t.msaaTextures[n];s==null||s.resize(i.source.width,i.source.height,i.source._resolution)})}}pa.extension={type:[y.WebGPUSystem],name:"renderTarget"};class fa{contextChange(e){this._gpu=e}createProgramLayout(e){const t=this._gpu.device;if(!e._gpuLayout)if(e.gpuLayout){const i=e.gpuLayout.map(s=>t.createBindGroupLayout({entries:s})),n={bindGroupLayouts:i};e._gpuLayout={bindGroups:i,pipeline:t.createPipelineLayout(n)}}else e._gpuLayout={bindGroups:null,pipeline:"auto"}}destroy(){this._gpu=null}}fa.extension={type:[y.WebGPUSystem],name:"shader"};const be={};be.normal={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},be.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}},be.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}},be.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},be.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},be.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}},be["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},be["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}},be["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}},be.erase={alpha:{srcFactor:"zero",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"one-minus-src",operation:"add"}};class ga{constructor(){this.defaultState=new Se,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:be[e.blendMode]||be.normal}]}destroy(){this.gpu=null}}ga.extension={type:[y.WebGPUSystem],name:"state"};const mf={type:"image",upload(r,e,t){const i=r.resource,n=(r.pixelWidth|0)*(r.pixelHeight|0),s=i.byteLength/n;t.device.queue.writeTexture({texture:e},i,{offset:0,rowsPerImage:r.pixelWidth,bytesPerRow:r.pixelWidth*s},{width:r.pixelWidth,height:r.pixelHeight,depthOrArrayLayers:1})}},ma={type:"image",upload(r,e,t){const i=r.resource;if(!i)return;const n=r.resourceWidth||r.pixelWidth,s=r.resourceHeight||r.pixelHeight,o=r.alphaMode==="premultiply-alpha-on-upload";t.device.queue.copyExternalImageToTexture({source:i},{texture:e,premultipliedAlpha:o},{width:n,height:s})}},bf={type:"video",upload(r,e,t){ma.upload(r,e,t)}};class vf{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let t=this.pipelines[e];return t||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
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
                    `})),t=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=t),t}generateMipmap(e){const t=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let i=e;const n=e.depthOrArrayLayers||1,s=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!s){const l={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:n},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};i=this.device.createTexture(l)}const o=this.device.createCommandEncoder({}),a=t.getBindGroupLayout(0);for(let l=0;l<n;++l){let u=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),h=s?1:0;for(let c=1;c<e.mipLevelCount;++c){const p=i.createView({baseMipLevel:h++,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),d=o.beginRenderPass({colorAttachments:[{view:p,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),f=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:u}]});d.setPipeline(t),d.setBindGroup(0,f),d.draw(3,1,0,0),d.end(),u=p}}if(!s){const l={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:n};for(let u=1;u<e.mipLevelCount;++u)o.copyTextureToTexture({texture:i,mipLevel:u-1},{texture:e,mipLevel:u},l),l.width=Math.ceil(l.width/2),l.height=Math.ceil(l.height/2)}return this.device.queue.submit([o.finish()]),s||i.destroy(),e}}class ba{constructor(e){this.managedTextures=[],this._gpuSources=Object.create(null),this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._textureViewHash=Object.create(null),this._uploads={image:ma,buffer:mf,video:bf},this._renderer=e}contextChange(e){this._gpu=e}initSource(e){if(e.autoGenerateMipmaps){const n=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(n))+1}const t={size:{width:e.pixelWidth||1,height:e.pixelHeight||1},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC},i=this._gpu.device.createTexture(t);return this._gpuSources[e.uid]=i,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),i}onSourceUpdate(e){const t=this.getGpuSource(e);t&&(this._uploads[e.uploadMethodId]&&this._uploads[e.uploadMethodId].upload(e,t,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&(this._mipmapGenerator||(this._mipmapGenerator=new vf(this._gpu.device)),this._mipmapGenerator.generateMipmap(t)))}onSourceUnload(e){const t=this._gpuSources[e.uid];t&&(this._gpuSources[e.uid]=null,t.destroy())}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}onSourceResize(e){const t=this._gpuSources[e.uid];(t.width!==e.pixelWidth||t.height!==e.pixelHeight)&&(this._textureViewHash[e.uid]=null,this._bindGroupHash[e.uid]=null,this.onSourceUnload(e),this.initSource(e))}_initSampler(e){return this._gpuSamplers[e.resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e.resourceId]}getGpuSampler(e){return this._gpuSamplers[e.resourceId]||this._initSampler(e)}getGpuSource(e){return this._gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){var t;return(t=this._bindGroupHash[e.id])!=null?t:this._createTextureBindGroup(e)}_createTextureBindGroup(e){const t=e.source,i=t.uid;return this._bindGroupHash[i]=new Be({0:t,1:t.style}),this._bindGroupHash[i]}getTextureView(e){var t;const i=e.source;return(t=this._textureViewHash[i.uid])!=null?t:this._createTextureView(i)}_createTextureView(e){return this._textureViewHash[e.uid]=this.getGpuSource(e).createView(),this._textureViewHash[e.uid]}generateCanvas(e){const t=this._renderer,i=t.gpu.device.createCommandEncoder(),n=D.ADAPTER.createCanvas();n.width=e.source.pixelWidth,n.height=e.source.pixelHeight;const s=n.getContext("webgpu");return s.configure({device:t.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"premultiplied"}),i.copyTextureToTexture({texture:t.texture.getGpuSource(e.source),origin:{x:0,y:0}},{texture:s.getCurrentTexture()},{width:n.width,height:n.height}),t.gpu.device.queue.submit([i.finish()]),n}getPixels(e){const t=this.generateCanvas(e),i=ze.getOptimalCanvasAndContext(t.width,t.height),n=i.context;n.drawImage(t,0,0);const{width:s,height:o}=t,a=n.getImageData(0,0,s,o),l=new Uint8ClampedArray(a.data.buffer);return ze.returnCanvasAndContext(i),{pixels:l,width:s,height:o}}destroy(){for(const e of Object.keys(this._gpuSources)){const t=Number(e);this._gpuSources[t].destroy(),this._gpuSources[t]=null}for(const e of Object.keys(this._bindGroupHash)){const t=Number(e);this._bindGroupHash[t].destroy(),this._bindGroupHash[t]=null}this._gpu=null,this._mipmapGenerator=null,this._gpuSources=null,this._bindGroupHash=null,this._textureViewHash=null,this._gpuSamplers=null}}ba.extension={type:[y.WebGPUSystem],name:"texture"};class va{init(){const e=new te({transformMatrix:{value:new k,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),t={name:"local-uniform-bit",vertex:{header:`
        
                    struct LocalUniforms {
                        uTransformMatrix:mat3x3<f32>,
                        uColor:vec4<f32>,
                        uRound:f32,
                    }
        
                    @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
                `,main:`
                    vColor *= localUniforms.uColor;
                    modelMatrix *= localUniforms.uTransformMatrix;
                `,end:`
                    if(localUniforms.uRound == 1)
                    {
                        vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                    }
                `}},i=Et({name:"graphics",bits:[li,hi(Te),t,Bt]});this.shader=new Ee({gpuProgram:i,resources:{localUniforms:e}}),this.shader.addResource("globalUniforms",0,0)}execute(e,t){const i=t.view.context,n=i.customShader||this.shader,s=e.renderer,o=s.graphicsContext,{geometry:a,instructions:l}=o.getContextRenderData(i),u=s.encoder;u.setPipelineFromGeometryProgramAndState(a,n.gpuProgram,e.state),u.setGeometry(a);const h=s.globalUniforms.bindGroup;u.setBindGroup(0,h,n.gpuProgram);const c=s.renderPipes.uniformBatch.getUniformBindGroup(n.resources.localUniforms,!0);u.setBindGroup(2,c,n.gpuProgram);const p=l.instructions;for(let d=0;d<l.instructionSize;d++){const f=p[d];if(n.groups[1]=f.bindGroup,!f.gpuBindGroup){const m=f.textures;f.bindGroup=pi(m.textures,m.count),f.gpuBindGroup=s.bindGroup.getBindGroup(f.bindGroup,n.gpuProgram,1)}u.setBindGroup(1,f.bindGroup,n.gpuProgram),u.renderPassEncoder.drawIndexed(f.size,1,f.start)}}destroy(){this.shader.destroy(!0),this.shader=null}}va.extension={type:[y.WebGPUPipesAdaptor],name:"graphics"};class ya{init(){const e=Et({name:"mesh",bits:[ks,Zc,Bt]});this._shader=new Ee({gpuProgram:e,resources:{uTexture:A.EMPTY._source,uSampler:A.EMPTY._source.style}})}execute(e,t){const i=e.renderer,n=t.view;let s=n._shader;s||(s=this._shader,s.groups[2]=i.texture.getTextureBindGroup(n.texture)),s.groups[0]=i.globalUniforms.bindGroup;const o=e.localUniforms;s.groups[1]=i.renderPipes.uniformBatch.getUniformBindGroup(o,!0),i.encoder.draw({geometry:n._geometry,shader:s,state:n.state})}destroy(){this._shader.destroy(!0),this._shader=null}}ya.extension={type:[y.WebGPUPipesAdaptor],name:"mesh"};const X_=[...ra,aa,sa,ba,pa,la,fa,ga,da,oa,ua,na],q_=[...ia,ha,ca],K_=[As,ya,va],yf=[],xf=[],_f=[];Z.handleByNamedList(y.WebGPUSystem,yf),Z.handleByNamedList(y.WebGPUPipes,xf),Z.handleByNamedList(y.WebGPUPipesAdaptor,_f),Z.add(...X_,...q_,...K_);class wf extends oo{constructor(){const e={name:"webgpu",type:Re.WEBGPU,systems:yf,renderPipes:xf,renderPipeAdaptors:_f};super(e)}}var Z_={__proto__:null,WebGPURenderer:wf};const Q_={POINTS:"point-list",LINES:"line-list",LINE_STRIP:"line-strip",TRIANGLES:"triangle-list",TRIANGLE_STRIP:"triangle-strip"},J_=new Proxy(Q_,{get(r,e){return O(G,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}}),e0={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};var Tf=(r=>(r[r.NONE=0]="NONE",r[r.LOW=2]="LOW",r[r.MEDIUM=4]="MEDIUM",r[r.HIGH=8]="HIGH",r))(Tf||{}),xa=(r=>(r.CLAMP="clamp-to-edge",r.REPEAT="repeat",r.MIRRORED_REPEAT="mirror-repeat",r))(xa||{});const t0=new Proxy(xa,{get(r,e){return O(G,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}});var _a=(r=>(r.NEAREST="nearest",r.LINEAR="linear",r))(_a||{});const r0=new Proxy(_a,{get(r,e){return O(G,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),r[e]}});class i0{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}set(e,t,i){const n=t.width,s=t.height;if(i){const o=e.width/2/n,a=e.height/2/s,l=e.x/n+o,u=e.y/s+a;i=I.add(i,I.NW),this.x0=l+o*I.uX(i),this.y0=u+a*I.uY(i),i=I.add(i,2),this.x1=l+o*I.uX(i),this.y1=u+a*I.uY(i),i=I.add(i,2),this.x2=l+o*I.uX(i),this.y2=u+a*I.uY(i),i=I.add(i,2),this.x3=l+o*I.uX(i),this.y3=u+a*I.uY(i)}else this.x0=e.x/n,this.y0=e.y/s,this.x1=(e.x+e.width)/n,this.y1=e.y/s,this.x2=(e.x+e.width)/n,this.y2=(e.y+e.height)/s,this.x3=e.x/n,this.y3=(e.y+e.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}let n0=0;function s0(){return n0++}function o0(r,e){if(r===16777215||!e)return e;if(e===16777215||!r)return r;const t=r>>16&255,i=r>>8&255,n=r&255,s=e>>16&255,o=e>>8&255,a=e&255,l=t*s/255,u=i*o/255,h=n*a/255;return(l<<16)+(u<<8)+h}function a0(r,e,t){const i=r.a,n=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty,u=e.a,h=e.b,c=e.c,p=e.d;t.a=i*u+n*c,t.b=i*h+n*p,t.c=s*u+o*c,t.d=s*h+o*p,t.tx=a*u+l*c+e.tx,t.ty=a*h+l*p+e.ty}var l0=Object.defineProperty,Di=Object.getOwnPropertySymbols,Sf=Object.prototype.hasOwnProperty,Pf=Object.prototype.propertyIsEnumerable,Af=(r,e,t)=>e in r?l0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,u0=(r,e)=>{for(var t in e||(e={}))Sf.call(e,t)&&Af(r,t,e[t]);if(Di)for(var t of Di(e))Pf.call(e,t)&&Af(r,t,e[t]);return r},h0=(r,e)=>{var t={};for(var i in r)Sf.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&Di)for(var i of Di(r))e.indexOf(i)<0&&Pf.call(r,i)&&(t[i]=r[i]);return t};class c0 extends V{constructor(e){e instanceof je&&(e={context:e});const t=e||{},{context:i}=t,n=h0(t,["context"]);super(u0({view:new Fo(i),label:"Graphics"},n)),this.allowChildren=!1}get context(){return this.view.context}set context(e){this.view.context=e}_callContextMethod(e,t){return this.view.context[e](...t),this}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(...e){return this._callContextMethod("beginPath",e)}cut(...e){return this._callContextMethod("cut",e)}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(...e){return this._callContextMethod("closePath",e)}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(...e){return this._callContextMethod("save",e)}getTransform(...e){return this._callContextMethod("getTransform",e)}resetTransform(...e){return this._callContextMethod("resetTransform",e)}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(...e){return this._callContextMethod("clear",e)}get fillStyle(){return this.view.context.fillStyle}set fillStyle(e){this.view.context.fillStyle=e}get strokeStyle(){return this.view.context.strokeStyle}set strokeStyle(e){this.view.context.strokeStyle=e}beginFill(e,t){return O("8.0.0","Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.endFill(),this.context.fillStyle={color:e,alpha:t},this}endFill(){return O("8.0.0","Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill(),this}drawCircle(...e){return O("8.0.0","Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return O("8.0.0","Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return O("8.0.0","Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return O("8.0.0","Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return O("8.0.0","Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return O("8.0.0","Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}const d0={rectangle:So,polygon:To,triangle:Po,circle:pt,ellipse:pt,roundedRectangle:pt};function p0(r){const e=[],t=[],i=[],n=r.path.shapePath,s=r.textureMatrix;n.shapePrimitives.forEach(({shape:a,transform:l})=>{const u=i.length,h=e.length/2,c=[],p=d0[a.type];p.build(a,c),l&&Ai(c,l),p.triangulate(c,e,2,h,i,u);const d=t.length/2;s?(l&&s.append(l.clone().invert()),go(e,2,h,t,d,2,e.length/2-h,s)):mo(t,d,2,e.length/2-h)});const o=r.out;return o?(o.positions=new Float32Array(e),o.uvs=new Float32Array(t),o.indices=new Uint32Array(i),o):new Ut({positions:new Float32Array(e),uvs:new Float32Array(t),indices:new Uint32Array(i)})}var f0=Object.defineProperty,Ef=Object.getOwnPropertySymbols,g0=Object.prototype.hasOwnProperty,m0=Object.prototype.propertyIsEnumerable,Cf=(r,e,t)=>e in r?f0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Mf=(r,e)=>{for(var t in e||(e={}))g0.call(e,t)&&Cf(r,t,e[t]);if(Ef)for(var t of Ef(e))m0.call(e,t)&&Cf(r,t,e[t]);return r};const Bf=class extends Ut{constructor(...r){var e;super({});let t=(e=r[0])!=null?e:{};typeof t=="number"&&(O(G,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:r[1],verticesX:r[2],verticesY:r[3]}),this.build(t)}build(r){var e,t,i,n;r=Mf(Mf({},Bf.defaultOptions),r),this.verticesX=(e=this.verticesX)!=null?e:r.verticesX,this.verticesY=(t=this.verticesY)!=null?t:r.verticesY,this.width=(i=this.width)!=null?i:r.width,this.height=(n=this.height)!=null?n:r.height;const s=this.verticesX*this.verticesY,o=[],a=[],l=[],u=this.verticesX-1,h=this.verticesY-1,c=this.width/u,p=this.height/h;for(let f=0;f<s;f++){const m=f%this.verticesX,g=f/this.verticesX|0;o.push(m*c,g*p),a.push(m/u,g/h)}const d=u*h;for(let f=0;f<d;f++){const m=f%u,g=f/u|0,x=g*this.verticesX+m,b=g*this.verticesX+m+1,v=(g+1)*this.verticesX+m,_=(g+1)*this.verticesX+m+1;l.push(x,b,v,b,_,v)}this.buffers[0].data=new Float32Array(o),this.buffers[1].data=new Float32Array(a),this.indexBuffer.data=new Uint32Array(l),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};let wa=Bf;wa.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};var b0=Object.defineProperty,Rf=Object.getOwnPropertySymbols,v0=Object.prototype.hasOwnProperty,y0=Object.prototype.propertyIsEnumerable,kf=(r,e,t)=>e in r?b0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,Of=(r,e)=>{for(var t in e||(e={}))v0.call(e,t)&&kf(r,t,e[t]);if(Rf)for(var t of Rf(e))y0.call(e,t)&&kf(r,t,e[t]);return r};const Ff=class extends wa{constructor(r){r=Of(Of({},Ff.defaultOptions),r),super({width:r.width,height:r.height,verticesX:4,verticesY:4}),this._textureMatrix=new k,this.update(r)}update(r){this.updateUvs(r),this.updatePositions(r)}updatePositions(r){var e,t,i,n,s,o;this.width=(e=r.width)!=null?e:this.width,this.height=(t=r.height)!=null?t:this.height,this._leftWidth=(i=r.leftWidth)!=null?i:this._leftWidth,this._rightWidth=(n=r.rightWidth)!=null?n:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight;const a=this.positions,l=this._leftWidth+this._rightWidth,u=this.width>l?1:this.width/l,h=this._topHeight+this._bottomHeight,c=this.height>h?1:this.height/h,p=Math.min(u,c);a[9]=a[11]=a[13]=a[15]=this._topHeight*p,a[17]=a[19]=a[21]=a[23]=this.height-this._bottomHeight*p,a[25]=a[27]=a[29]=a[31]=this.height,a[2]=a[10]=a[18]=a[26]=this._leftWidth*p,a[4]=a[12]=a[20]=a[28]=this.width-this._rightWidth*p,a[6]=a[14]=a[22]=a[30]=this.width,this.getBuffer("aPosition").update()}updateUvs(r){var e,t,i,n,s,o;this._originalWidth=(e=r.originalWidth)!=null?e:this._originalWidth,this._originalHeight=(t=r.originalHeight)!=null?t:this._originalHeight,this._leftWidth=(i=r.leftWidth)!=null?i:this._leftWidth,this._rightWidth=(n=r.rightWidth)!=null?n:this._rightWidth,this._topHeight=(s=r.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=r.bottomHeight)!=null?o:this._bottomHeight,r.textureMatrix&&this._textureMatrix.copyFrom(r.textureMatrix);const a=this._textureMatrix,l=this.uvs;l[0]=l[8]=l[16]=l[24]=0,l[1]=l[3]=l[5]=l[7]=0,l[6]=l[14]=l[22]=l[30]=1,l[25]=l[27]=l[29]=l[31]=1;const u=1/this._originalWidth,h=1/this._originalHeight;l[2]=l[10]=l[18]=l[26]=u*this._leftWidth,l[9]=l[11]=l[13]=l[15]=h*this._topHeight,l[4]=l[12]=l[20]=l[28]=1-u*this._rightWidth,l[17]=l[19]=l[21]=l[23]=1-h*this._bottomHeight,x0(a,l),this.getBuffer("aUV").update()}};let Ta=Ff;Ta.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};function x0(r,e,t){t!=null||(t=e);const i=r.a,n=r.b,s=r.c,o=r.d,a=r.tx,l=r.ty;for(let u=0;u<e.length;u+=2){const h=e[u],c=e[u+1];t[u]=h*i+c*s+a,t[u+1]=h*n+c*o+l}return t}var _0=Object.defineProperty,zi=Object.getOwnPropertySymbols,Uf=Object.prototype.hasOwnProperty,If=Object.prototype.propertyIsEnumerable,Gf=(r,e,t)=>e in r?_0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,w0=(r,e)=>{for(var t in e||(e={}))Uf.call(e,t)&&Gf(r,t,e[t]);if(zi)for(var t of zi(e))If.call(e,t)&&Gf(r,t,e[t]);return r},T0=(r,e)=>{var t={};for(var i in r)Uf.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&zi)for(var i of zi(r))e.indexOf(i)<0&&If.call(r,i)&&(t[i]=r[i]);return t};const Gt=class extends V{constructor(r){var e,t,i,n;r instanceof A&&(r={texture:r});const s=r,{leftWidth:o,rightWidth:a,topHeight:l,bottomHeight:u,texture:h}=s,c=T0(s,["leftWidth","rightWidth","topHeight","bottomHeight","texture"]),p=h!=null?h:Gt.defaultOptions.texture,d=p.layout.defaultBorders,f=new Ta(Ze({width:p.width,height:p.height,originalWidth:p.width,originalHeight:p.height,leftWidth:(e=o!=null?o:d==null?void 0:d.left)!=null?e:Gt.defaultOptions.leftWidth,topHeight:(t=l!=null?l:d==null?void 0:d.top)!=null?t:Gt.defaultOptions.topHeight,rightWidth:(i=a!=null?a:d==null?void 0:d.right)!=null?i:Gt.defaultOptions.rightWidth,bottomHeight:(n=u!=null?u:d==null?void 0:d.bottom)!=null?n:Gt.defaultOptions.bottomHeight,textureMatrix:p.textureMatrix.mapCoord}));super(w0({view:new Tr(Ze({geometry:f,texture:p})),label:"NineSliceSprite"},c)),this.allowChildren=!1}get width(){return this.view.geometry.width}set width(r){this.view.geometry.updatePositions({width:r})}get height(){return this.view.geometry.height}set height(r){this.view.geometry.updatePositions({height:r})}get leftWidth(){return this.view.geometry._leftWidth}set leftWidth(r){this.view.geometry.updateUvs({leftWidth:r})}get topHeight(){return this.view.geometry._topHeight}set topHeight(r){this.view.geometry.updateUvs({topHeight:r})}get rightWidth(){return this.view.geometry._rightWidth}set rightWidth(r){this.view.geometry.updateUvs({rightWidth:r})}get bottomHeight(){return this.view.geometry._bottomHeight}set bottomHeight(r){this.view.geometry.updateUvs({bottomHeight:r})}get texture(){return this.view.texture}set texture(r){r!==this.view.texture&&(this.view.geometry.updateUvs({originalWidth:r.width,originalHeight:r.height,textureMatrix:r.textureMatrix.mapCoord}),this.view.texture=r)}get roundPixels(){return!!this.view.roundPixels}set roundPixels(r){this.view.roundPixels=r?1:0}};let Sa=Gt;Sa.defaultOptions={texture:A.EMPTY,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10};class S0 extends Sa{constructor(...e){let t=e[0];t instanceof A&&(O(G,"NineSlicePlane now uses the options object {texture, leftWidth, rightWidth, topHeight, bottomHeight}"),t={texture:t,leftWidth:e[1],topHeight:e[2],rightWidth:e[3],bottomHeight:e[4]}),O(G,"NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(t)}}function P0(r,e){const{frameWidth:t,frameHeight:i}=r;return e.scale(1/t,1/i),e}var A0=Object.defineProperty,Ni=Object.getOwnPropertySymbols,$f=Object.prototype.hasOwnProperty,Lf=Object.prototype.propertyIsEnumerable,Df=(r,e,t)=>e in r?A0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,E0=(r,e)=>{for(var t in e||(e={}))$f.call(e,t)&&Df(r,t,e[t]);if(Ni)for(var t of Ni(e))Lf.call(e,t)&&Df(r,t,e[t]);return r},C0=(r,e)=>{var t={};for(var i in r)$f.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&Ni)for(var i of Ni(r))e.indexOf(i)<0&&Lf.call(r,i)&&(t[i]=r[i]);return t};class M0 extends V{constructor(...e){let t=e[0];t instanceof Ut&&(O(G,"Mesh: use new Mesh({ geometry, shader }) instead"),t={geometry:t,shader:e[1]},e[3]&&(O(G,"Mesh: topology argument has been removed, use geometry.topology instead"),t.geometry.topology=e[3]));const i=t,{geometry:n,shader:s,texture:o}=i,a=C0(i,["geometry","shader","texture"]);super(E0({view:new Tr(Ze({geometry:n,shader:s,texture:o})),label:"Mesh"},a)),this.allowChildren=!1}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get geometry(){return this.view.geometry}set geometry(e){this.view.geometry=e}get material(){return O(G,"mesh.material property has been removed, use mesh.shader instead"),this.view.shader}get shader(){return this.view.shader}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}class qi extends Oe{constructor(e,t=!0){super(e[0]instanceof A?e[0]:e[0].texture),this._textures=null,this._durations=null,this._autoUpdate=t,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=e}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ce.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ce.shared.add(this.update,this,Qe.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const t=e.deltaTime,i=this.animationSpeed*t,n=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=i/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const o=Math.sign(this.animationSpeed*t);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*o,this._currentTime+=o;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=i;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):n!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<n||this.animationSpeed<0&&this.currentFrame>n)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.layout.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const t=[];for(let i=0;i<e.length;++i)t.push(A.from(e[i]));return new qi(t)}static fromImages(e){const t=[];for(let i=0;i<e.length;++i)t.push(A.from(e[i]));return new qi(t)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof A)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let t=0;t<e.length;t++)this._textures.push(e[t].texture),this._durations.push(e[t].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const t=this.currentFrame;this._currentTime=e,t!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ce.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ce.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class zf{constructor({matrix:e,observer:t}={}){this.dirty=!0,this._matrix=e!=null?e:new k,this.observer=t,this.position=new se(this,0,0),this.scale=new se(this,1,1),this.pivot=new se(this,0,0),this.skew=new se(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}onUpdate(e){var t;this.dirty=!0,e===this.skew&&this.updateSkew(),(t=this.observer)==null||t.onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.updateSkew())}}var B0=Object.defineProperty,Nf=Object.getOwnPropertySymbols,R0=Object.prototype.hasOwnProperty,k0=Object.prototype.propertyIsEnumerable,Hf=(r,e,t)=>e in r?B0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,jf=(r,e)=>{for(var t in e||(e={}))R0.call(e,t)&&Hf(r,t,e[t]);if(Nf)for(var t of Nf(e))k0.call(e,t)&&Hf(r,t,e[t]);return r};const Wf=class{constructor(r){this.owner=Tt,this.uid=X("tilingSpriteView"),this.renderPipeId="tilingSprite",this.batched=!0,this.roundPixels=0,this._bounds=[0,1,0,0],this._boundsDirty=!0,r=jf(jf({},Wf.defaultOptions),r),this.anchor=new se(this,0,0),this._applyAnchorToTexture=r.applyAnchorToTexture,this.texture=r.texture,this._width=r.width,this._height=r.height,this._tileTransform=new zf({observer:this})}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}set texture(r){this._texture!==r&&(this._texture=r,this.onUpdate())}get texture(){return this._texture}set width(r){this._width=r,this.onUpdate()}get width(){return this._width}set height(r){this._height=r,this.onUpdate()}get height(){return this._height}_updateBounds(){const r=this._bounds,e=this.anchor,t=this._width,i=this._height;r[1]=-e._x*t,r[0]=r[1]+t,r[3]=-e._y*i,r[2]=r[3]+i}addBounds(r){const e=this.bounds;r.addFrame(e[0],e[2],e[1],e[3])}containsPoint(r){const e=this.bounds[2],t=this.bounds[3],i=-e*this.anchor.x;let n=0;return r.x>=i&&r.x<i+e&&(n=-t*this.anchor.y,r.y>=n&&r.y<n+t)}onUpdate(){this._boundsDirty=!0,this._didUpdate=!0,this.owner.onViewUpdate()}destroy(r=!1){if(this.anchor=null,this._tileTransform=null,this._bounds=null,typeof r=="boolean"?r:r==null?void 0:r.texture){const e=typeof r=="boolean"?r:r==null?void 0:r.textureSource;this._texture.destroy(e)}this._texture=null}};let Pa=Wf;Pa.defaultOptions={texture:A.WHITE,width:256,height:256,applyAnchorToTexture:!1};var O0=Object.defineProperty,Hi=Object.getOwnPropertySymbols,Vf=Object.prototype.hasOwnProperty,Yf=Object.prototype.propertyIsEnumerable,Xf=(r,e,t)=>e in r?O0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,F0=(r,e)=>{for(var t in e||(e={}))Vf.call(e,t)&&Xf(r,t,e[t]);if(Hi)for(var t of Hi(e))Yf.call(e,t)&&Xf(r,t,e[t]);return r},U0=(r,e)=>{var t={};for(var i in r)Vf.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&Hi)for(var i of Hi(r))e.indexOf(i)<0&&Yf.call(r,i)&&(t[i]=r[i]);return t};class I0 extends V{constructor(e){const t=e!=null?e:{},{texture:i,width:n,height:s,applyAnchorToTexture:o}=t,a=U0(t,["texture","width","height","applyAnchorToTexture"]);super(F0({view:new Pa(Ze({texture:i,width:n,height:s,applyAnchorToTexture:o})),label:"TilingSprite"},a)),this.allowChildren=!1}set texture(e){this.view.texture=e}get texture(){return this.view.texture}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get width(){return this.view.width}set width(e){this.view.width=e}get height(){return this.view.height}set height(e){this.view.height=e}get tilePosition(){return this.view._tileTransform.position}set tilePosition(e){this.view._tileTransform.position.copyFrom(e)}get tileScale(){return this.view._tileTransform.scale}set tileScale(e){this.view._tileTransform.scale.copyFrom(e)}set tileRotation(e){this.view._tileTransform.rotation=e}get tileRotation(){return this.view._tileTransform.rotation}get tileTransform(){return this.view._tileTransform}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}function qf(r){const e=r._stroke,t=r._fill;return["transform-origin: top left","display: inline-block",`color: ${j.shared.setValue(t.color).toHex()}`,`font-size: ${r.fontSize}px`,`font-family: ${r.fontFamily}`,`font-weight: ${r.fontWeight}`,`font-style: ${r.fontStyle}`,`font-variant: ${r.fontVariant}`,`letter-spacing: ${r.letterSpacing}px`,`text-align: ${r.align}`,`padding: ${r.padding}px`,`white-space: ${r.whiteSpace}`,...r.lineHeight?[`line-height: ${r.lineHeight}px`]:[],...r.wordWrap?[`word-wrap: ${r.breakWords?"break-all":"break-word"}`,`max-width: ${r.wordWrapWidth}px`]:[],...e?[`-webkit-text-stroke-width: ${e.width}px`,`-webkit-text-stroke-color: ${j.shared.setValue(e.color).toHex()}`,`text-stroke-width: ${e.width}px`,`text-stroke-color: ${j.shared.setValue(e.color).toHex()}`,"paint-order: stroke"]:[],...r.dropShadow?[G0(r.dropShadow)]:[],...r.cssOverrides].join(";")}function G0(r){const e=j.shared.setValue(r.color).setAlpha(r.alpha).toHexa(),t=Math.round(Math.cos(r.angle)*r.distance),i=Math.round(Math.sin(r.angle)*r.distance),n=`${t}px ${i}px`;return r.blur>0?`text-shadow: ${n} ${r.blur}px ${e}`:`text-shadow: ${n} ${e}`}class Lt extends mt{constructor(e){var t;super(e),this._cssOverrides=[],(t=this.cssOverrides)!=null||(this.cssOverrides=e.cssOverrides)}set cssOverrides(e){this._cssOverrides=e instanceof Array?e:[e],this.update()}get cssOverrides(){return this._cssOverrides}_generateKey(){return this._styleKey=Uo(this)+this._cssOverrides.join("-"),this._styleKey}update(){this._cssStyle=null,super.update()}clone(){return new Lt({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,cssOverrides:this.cssOverrides})}get cssStyle(){return this._cssStyle||(this._cssStyle=qf(this)),this._cssStyle}addOverride(...e){const t=e.filter(i=>!this.cssOverrides.includes(i));t.length>0&&(this.cssOverrides.push(...t),this.update())}removeOverride(...e){const t=e.filter(i=>this.cssOverrides.includes(i));t.length>0&&(this.cssOverrides=this.cssOverrides.filter(i=>!t.includes(i)),this.update())}set fill(e){super.fill=e}set stroke(e){super.stroke=e}}function Aa(r,e){return e instanceof mt||e instanceof Lt?e:r==="html"?new Lt(e):new mt(e)}const $0={canvas:"text",html:"htmlText",bitmap:"bitmapText"};class Kf{constructor(e){this.uid=X("textView"),this.renderPipeId="text",this.owner=Tt,this.batched=!0,this.resolution=null,this._didUpdate=!0,this.roundPixels=0,this._bounds=[0,1,0,0],this._boundsDirty=!0;var t,i,n;this.text=(t=e.text)!=null?t:"";const s=(i=e.renderMode)!=null?i:this._detectRenderType(e.style);this._renderMode=s,this._style=Aa(s,e.style),this.renderPipeId=$0[s],this.anchor=new se(this,0,0),this.resolution=(n=e.resolution)!=null?n:null}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onUpdate())}get text(){return this._text}get style(){return this._style}set style(e){var t;e=e||{},(t=this._style)==null||t.off("update",this.onUpdate,this),this._style=Aa(this._renderMode,e),this._style.on("update",this.onUpdate,this),this.onUpdate()}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}addBounds(e){const t=this.bounds;e.addFrame(t[0],t[2],t[1],t[3])}containsPoint(e){const t=this.bounds[2],i=this.bounds[3],n=-t*this.anchor.x;let s=0;return e.x>=n&&e.x<n+t&&(s=-i*this.anchor.y,e.y>=s&&e.y<s+i)}onUpdate(){this._didUpdate=!0,this._boundsDirty=!0,this.owner.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}`}_updateBounds(){const e=this._bounds,t=this._style.padding,i=this.anchor;if(this.renderPipeId==="bitmapText"){const n=Do.measureText(this.text,this._style),s=n.scale,o=n.offsetY*s,a=n.width*s,l=n.height*s;e[0]=-i._x*a-t,e[1]=e[0]+a,e[2]=-i._y*(l+o)-t,e[3]=e[2]+l}else if(this.renderPipeId==="htmlText"){const n=Up(this.text,this._style),{width:s,height:o}=n;e[0]=-i._x*s-t,e[1]=e[0]+s,e[2]=-i._y*o-t,e[3]=e[2]+o}else{const n=re.measureText(this.text,this._style),{width:s,height:o}=n;e[0]=-i._x*s-t,e[1]=e[0]+s,e[2]=-i._y*o-t,e[3]=e[2]+o}}_detectRenderType(e){if(e instanceof Lt)return"html";const t=ie.get(e==null?void 0:e.fontFamily);return t instanceof Fi||t instanceof Vr?"bitmap":"canvas"}destroy(e=!1){this.owner=null,this._bounds=null,this.anchor=null,this._style.destroy(e),this._style=null,this._text=null}}var L0=Object.defineProperty,ji=Object.getOwnPropertySymbols,Zf=Object.prototype.hasOwnProperty,Qf=Object.prototype.propertyIsEnumerable,Jf=(r,e,t)=>e in r?L0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,D0=(r,e)=>{for(var t in e||(e={}))Zf.call(e,t)&&Jf(r,t,e[t]);if(ji)for(var t of ji(e))Qf.call(e,t)&&Jf(r,t,e[t]);return r},z0=(r,e)=>{var t={};for(var i in r)Zf.call(r,i)&&e.indexOf(i)<0&&(t[i]=r[i]);if(r!=null&&ji)for(var i of ji(r))e.indexOf(i)<0&&Qf.call(r,i)&&(t[i]=r[i]);return t};class Ea extends V{constructor(...e){let t=e[0];(typeof t=="string"||e[1])&&(O(G,'use new Text({ text: "hi!", style }) instead'),t={text:t,style:e[1]});const i=t,{style:n,text:s,renderMode:o,resolution:a}=i,l=z0(i,["style","text","renderMode","resolution"]);super(D0({view:new Kf(Ze({style:n,text:s,renderMode:o,resolution:a})),label:"Text"},l)),this.allowChildren=!1}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}set text(e){this.view.text=e}get text(){return this.view.text}set style(e){this.view.style=e}get style(){return this.view.style}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}class N0 extends Ea{constructor(...e){O(G,'use new Text({ text: "hi!", style, renderMode: "bitmap" }) instead');let t=e[0];(typeof t=="string"||e[1])&&(t={text:t,style:e[1]}),t.renderMode="bitmap",super(t)}}class H0 extends Ea{constructor(...e){O(G,'use new Text({ text: "hi!", style, renderMode: "html" }) instead');let t=e[0];(typeof t=="string"||e[1])&&(t={text:t,style:e[1]}),t.renderMode="html",super(t)}}const j0=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;async function W0(r,e,t=200){const i=await e.extract.base64(r);await e.encoder.commandFinished;const n=t;console.log(`logging texture ${r.source.width}px ${r.source.height}px`);const s=["font-size: 1px;",`padding: ${n}px 300px;`,`background: url(${i}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",s)}var V0=Object.defineProperty,Y0=Object.defineProperties,X0=Object.getOwnPropertyDescriptors,eg=Object.getOwnPropertySymbols,q0=Object.prototype.hasOwnProperty,K0=Object.prototype.propertyIsEnumerable,tg=(r,e,t)=>e in r?V0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,rg=(r,e)=>{for(var t in e||(e={}))q0.call(e,t)&&tg(r,t,e[t]);if(eg)for(var t of eg(e))K0.call(e,t)&&tg(r,t,e[t]);return r},Z0=(r,e)=>Y0(r,X0(e));const Q0=["#000080","#228B22","#8B0000","#4169E1","#008080","#800000","#9400D3","#FF8C00","#556B2F","#8B008B"];let J0=0;function ig(r,e=0,t={color:"#000000"}){r.isLayerRoot&&(t.color=Q0[J0++]);let i="";for(let o=0;o<e;o++)i+="    ";let n=r.label;!n&&r instanceof Oe&&(n=`sprite:${r.view.texture.label}`);let s=`%c ${i}|- ${n} (worldX:${r.worldTransform.tx}, layerX:${r.layerTransform.tx}, localX:${r.x})`;r.isLayerRoot&&(s+=" (LayerGroup)"),r.filters&&(s+="(*filters)"),console.log(s,`color:${t.color}; font-weight:bold;`),e++;for(let o=0;o<r.children.length;o++){const a=r.children[o];ig(a,e,rg({},t))}}function ng(r,e=0,t={index:0,color:"#000000"}){let i="";for(let s=0;s<e;s++)i+="    ";const n=`%c ${i}- ${t.index}: ${r.root.label} worldX:${r.worldTransform.tx}`;console.log(n,`color:${t.color}; font-weight:bold;`),e++;for(let s=0;s<r.layerGroupChildren.length;s++){const o=r.layerGroupChildren[s];ng(o,e,Z0(rg({},t),{index:s}))}}let Ca=0;const sg=500;function e1(...r){Ca!==sg&&(Ca++,Ca===sg?console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS."):console.warn("PixiJS Warning: ",...r))}var t1=`fn getLuminosity(c: vec3<f32>) -> f32 {
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
}`;export{_n as AbstractBitmapFont,oo as AbstractRenderer,Zt as AccessibilitySystem,Kh as AlphaFilter,Xn as AlphaMask,Os as AlphaMaskPipe,qi as AnimatedSprite,Jn as Application,hr as Assets,bh as AssetsClass,vr as BUFFER_TYPE,ah as BackgroundLoader,Ui as BackgroundSystem,Ms as Batch,Ps as BatchGeometry,Cs as BatchTextureArray,Ei as BatchableGraphics,np as BatchableMesh,ki as BatchableSprite,Bs as Batcher,Rs as BatcherPipe,N as BigPool,Be as BindGroup,na as BindGroupSystem,Vr as BitmapFont,Do as BitmapFontManager,N0 as BitmapText,zo as BitmapTextPipe,ee as BlendModeFilter,qo as BlendModePipe,hc as BlurFilter,pr as BlurFilterPass,pe as Bounds,Ol as BrowserAdapter,we as Buffer,Wi as BufferImageSource,_i as BufferResource,sa as BufferSystem,H as BufferUsage,me as CLEAR,ie as Cache,ze as CanvasPool,wp as CanvasPoolClass,bd as CanvasSource,re as CanvasTextMetrics,No as CanvasTextPipe,jo as CanvasTextSystem,Vi as Circle,j as Color,qn as ColorMask,Fs as ColorMaskPipe,Wv as ColorMatrixFilter,V as Container,j0 as DATA_URI,Qa as DEG_TO_RAD,_a as DEPRECATED_SCALE_MODES,xa as DEPRECATED_WRAP_MODES,J_ as DRAW_MODES,Vv as DisplacementFilter,Fi as DynamicBitmapFont,Yi as Ellipse,Wu as EventBoundary,he as EventEmitter,sr as EventSystem,Le as EventsTicker,y as ExtensionType,Ii as ExtractSystem,Xu as FederatedContainer,$t as FederatedEvent,ir as FederatedMouseEvent,xe as FederatedPointerEvent,ht as FederatedWheelEvent,rr as FillGradient,Fn as FillPattern,Ce as Filter,Ur as FilterEffect,gs as FilterPipe,bs as FilterSystem,Er as FontStylePromiseCache,ls as GAUSSIAN_VALUES,e0 as GLSL_TO_STD40_SIZE,bi as GL_FORMATS,Gs as GL_TARGETS,z as GL_TYPES,id as GL_WRAP_MODES,Zo as GenerateTextureSystem,ai as Geometry,vi as GlBackBufferSystem,Ss as GlBatchAdaptor,rd as GlBuffer,Is as GlBufferSystem,Ds as GlColorMaskSystem,mi as GlContextSystem,zs as GlEncoderSystem,Ls as GlGeometrySystem,no as GlGraphicsAdaptor,so as GlMeshAdaptor,_e as GlProgram,xd as GlProgramData,cd as GlRenderTarget,js as GlRenderTargetSystem,Ks as GlShaderSystem,Js as GlStateSystem,Ws as GlStencilSystem,Rd as GlTexture,io as GlTextureSystem,Zs as GlUniformGroupSystem,Qo as GlobalUniformSystem,As as GpuBatchAdaptor,be as GpuBlendModesToPixi,oa as GpuColorMaskSystem,aa as GpuDeviceSystem,la as GpuEncoderSystem,va as GpuGraphicsAdaptor,rp as GpuGraphicsContext,ya as GpuMeshAdapter,vf as GpuMipmapGenerator,Ae as GpuProgram,z_ as GpuReadBuffer,gf as GpuRenderTarget,pa as GpuRenderTargetSystem,fa as GpuShaderSystem,ga as GpuStateSystem,ke as GpuStencilModesToPixi,ua as GpuStencilSystem,ba as GpuTextureSystem,ha as GpuUniformBatchPipe,ca as GpuUniformBufferPipe,c0 as Graphics,je as GraphicsContext,ip as GraphicsContextRenderData,Eo as GraphicsContextSystem,vt as GraphicsPath,Mo as GraphicsPipe,Fo as GraphicsView,H0 as HTMLText,Wo as HTMLTextPipe,Yo as HTMLTextRenderData,Lt as HTMLTextStyle,Cr as HTMLTextSystem,$i as HelloSystem,ky as IGLUniformData,tr as ImageSource,an as InstructionSet,gl as LayerGroup,lo as LayerPipe,Jc as LayerRenderable,fo as LayerSystem,hh as Loader,Ge as LoaderParserPriority,Te as MAX_TEXTURES,Tf as MSAA_QUALITY,Ir as MaskEffectManager,ol as MaskEffectManagerClass,Bc as MaskFilter,k as Matrix,M0 as Mesh,Ut as MeshGeometry,Bo as MeshPipe,Tr as MeshView,mn as NOOP,Ta as NineSliceGeometry,S0 as NineSlicePlane,Sa as NineSliceSprite,yc as NoiseFilter,se as ObservablePoint,Ka as PI_2,da as PipelineSystem,wa as PlaneGeometry,W as Point,bt as Polygon,nl as Pool,sl as PoolGroupClass,Oi as ProxyRenderable,ko as QuadGeometry,Za as RAD_TO_DEG,K as Rectangle,kt as RenderTarget,Wp as RenderTexture,Re as RendererType,gn as ResizePlugin,mh as Resolver,Xi as RoundedRectangle,r0 as SCALE_MODES,ne as STENCIL_MODES,xu as SVGParser,cu as SVGToGraphicsPath,yy as ScissorMask,bp as SdfShader,Ee as Shader,At as ShaderStage,bu as ShapePath,ia as SharedRenderPipes,ra as SharedSystems,Ac as ShockwaveFilter,Oe as Sprite,Ro as SpritePipe,Zu as SpriteView,Jr as Spritesheet,Se as State,Kn as StencilMask,Us as StencilMaskPipe,yi as SystemRunner,Ea as Text,Yr as TextFormat,mt as TextStyle,Kf as TextView,A as Texture,Mr as TextureGCSystem,yn as TextureLayout,xn as TextureMatrix,ue as TexturePool,Jh as TexturePoolClass,le as TextureSource,Jt as TextureStyle,i0 as TextureUvs,ce as Ticker,Nr as TickerListener,fn as TickerPlugin,I0 as TilingSprite,Oo as TilingSpritePipe,dp as TilingSpriteShader,Pa as TilingSpriteView,zf as Transform,Ma as Triangle,hn as UPDATE_BLEND,$r as UPDATE_COLOR,Qe as UPDATE_PRIORITY,kg as UPDATE_TRANSFORM,Lr as UPDATE_VISIBLE,cf as UniformBufferBatch,ea as UniformBufferSystem,te as UniformGroup,ta as VERSION,wt as VideoSource,Li as ViewSystem,Es as ViewableBuffer,Jo as WGSL_TO_STD40_SIZE,t0 as WRAP_MODES,hf as WebGLRenderer,wf as WebGPURenderer,Ln as WorkerManager,wn as XMLFormat,Tn as XMLStringFormat,on as _getGlobalBounds,pn as accessibilityTarget,ys as addBits,ti as addMaskBounds,ri as addMaskLocalBounds,as as alphaWgsl,pp as applyMatrix,ro as applyStyleParams,nh as autoDetectRenderer,di as batchSamplersUniformGroup,ql as bitmapFontCachePlugin,Lh as blendTemplateFrag,Dh as blendTemplateVert,zh as blendTemplateWgsl,ic as blurTemplateWgsl,An as buildAdaptiveBezier,pu as buildAdaptiveQuadratic,Mn as buildArc,fu as buildArcTo,mu as buildArcToSvg,pt as buildCircle,ep as buildContextBatches,p0 as buildGeometryFromPath,ed as buildInstructions,qd as buildLine,To as buildPolygon,So as buildRectangle,mo as buildSimpleUvs,Po as buildTriangle,go as buildUvs,Zl as cacheTextureArray,dd as calculateProjection,it as checkDataUrl,nt as checkExtension,el as childrenHelperMixin,Vd as closePointEps,br as collectAllRenderables,uo as collectLayerGroups,Co as color32BitToUniform,li as colorBit,ui as colorBitGl,cc as colorMatrixFilterFrag,cs as colorMatrixFilterWgsl,xx as colorToUniform,Ud as compareModeToGlCompare,Uc as compileHighShader,Ic as compileHighShaderGl,Ct as compileHighShaderGlProgram,Et as compileHighShaderGpuProgram,xs as compileHooks,_s as compileInputs,Fc as compileOutputs,Vs as compileShader,lt as convertFillInputToFillStyle,ye as convertToList,Hr as copySearchParams,jr as createIdFromString,dh as createStringVariations,Dn as createTexture,Xp as createUBOElements,Du as crossOrigin,bo as curveEps,hs as defaultFilterVert,Bh as defaultUniformValue,Xs as defaultValue,Ze as definedProps,O as deprecation,Ql as detectAvif,eu as detectDefaults,tu as detectMp4,ru as detectOgv,Hn as detectVideoAlphaMode,iu as detectWebm,nu as detectWebp,zu as determineCrossOrigin,dc as displacementFrag,pc as displacementVert,ds as displacementWgsl,vo as earcut,al as effectsMixin,Tt as emptyViewObserver,ms as ensureIsBuffer,vh as ensurePrecision,Aa as ensureTextStyle,ao as executeInstructions,Z as extensions,Ap as extractFontFamilies,ni as extractStructAndGroups,gi as fastCopy,Rc as findHooksRx,ll as findMixin,Pr as fontStringFromTextStyle,fy as formatShader,Dc as fragmentGPUTemplate,Nc as fragmentGlTemplate,ec as generateBlurFragSource,rc as generateBlurGlProgram,nc as generateBlurProgram,tc as generateBlurVertSource,cy as generateGPULayout,Eh as generateGpuLayoutGroups,dy as generateLayout,Ch as generateLayoutHash,Cd as generateProgram,Uo as generateTextStyleKey,hi as generateTextureBatchBit,ci as generateTextureBatchBitGl,s0 as generateUID,qp as generateUniformBufferSync,Md as generateUniformsSync,Td as getAttributeData,$o as getBitmapTextLayout,Ar as getCanvasFillStyle,xi as getCanvasTexture,rl as getFilterEffect,Bp as getFontCss,uu as getFontFamilyName,sd as getGlInfoFromFormat,Yt as getGlobalBounds,Ec as getGlobalRenderableBounds,He as getLocalBounds,Yn as getMatrixRelativeToParent,_h as getMaxFragmentPrecision,Yd as getOrientationOfPoints,hl as getParent,Ho as getPo2TextureFromSource,In as getResolutionOfUrl,Rp as getSVGUrl,kp as getTemporaryCanvasFromImage,xh as getTestContext,pi as getTextureBatchBindGroup,P0 as getTextureDefaultMatrix,Sd as getUniformBufferData,Pd as getUniformData,kd as glUploadBufferImageResource,eo as glUploadImageResource,Od as glUploadVideoResource,Hc as globalUniformsBit,jc as globalUniformsBitGl,mf as gpuUploadBufferImageResource,ma as gpuUploadImageResource,bf as gpuUploadVideoResource,I as groupD8,t1 as hslWgsl,si as hslgl,oi as hslgpu,ws as injectBits,Bl as isMobile,Sv as isPow2,Ns as isRenderingToScreen,Pp as isSafari,ur as isSingleItem,Ep as loadFontAsBase64,Vo as loadFontCSS,ku as loadImageBitmap,su as loadJson,Op as loadSVGImage,Cu as loadSvg,zn as loadTextures,ou as loadTxt,Nu as loadVideoTextures,hu as loadWebFont,ks as localUniformBit,mr as localUniformBitGl,fp as localUniformMSDFBit,Pv as log2,W0 as logDebugTexture,ng as logLayerGroupScene,Ed as logProgramError,ig as logScene,gp as mSDFBit,mp as mSDFBitGl,Id as mapFormatToGlFormat,Gd as mapFormatToGlInternalFormat,$d as mapFormatToGlType,_d as mapSize,qs as mapType,Bd as mapWebGLBlendModesToPixi,Cc as maskFrag,Mc as maskVert,vs as maskWgsl,cl as measureMixin,Gy as migrateFragmentFromV7toV8,Fd as mipmapScaleModeToGlFilter,Pi as mixColors,ho as mixHexColors,Zy as mixStandardAnd32BitColors,o0 as multiplyHexColors,ct as nextPow2,fc as noiseFrag,ps as noiseWgsl,Wt as normalizeExtensionPriority,dl as onRenderMixin,de as path,sn as removeItems,Mh as removeStructAndGroupDuplicates,Go as resolveCharacters,Hu as resolveTextureUrl,il as returnFilterEffect,Bt as roundPixelsBit,Rt as roundPixelsBitGl,Zp as sayHello,to as scaleModeToGlFilter,wh as setProgramName,Th as setProgramVersion,D as settings,xc as shockwaveFrag,_c as shockwaveVert,fs as shockwaveWgsl,pl as sortMixin,Ku as spritesheetAsset,Sn as testImageFormat,Xr as testVideoFormat,qf as textStyleToCSS,Zc as textureBit,Qc as textureBitGl,hp as tilingBit,cp as tilingBitGl,fl as toLocalGlobalMixin,Ai as transformVertices,wo as triangulateWithHoles,Gi as uniformBufferParsers,Ti as uniformParsers,jy as unpremultiplyAlpha,co as updateLayerGroupTransforms,Hd as updateLayerTransform,Ue as updateLocalTransform,ar as updateQuadBounds,po as updateTransformAndChildren,Xt as updateTransformBackwards,a0 as updateWorldTransform,G as v8_0_0,Wd as validateRenderables,Lc as vertexGPUTemplate,zc as vertexGlTemplate,e1 as warn,Si as wrapModeToGlAddress,Kl as xmlBitmapFontLoader};
//# sourceMappingURL=pixi.min.mjs.map
