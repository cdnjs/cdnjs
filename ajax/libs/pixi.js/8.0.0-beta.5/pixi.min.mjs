/*!
 * PixiJS - v8.0.0-beta.5
 * Compiled Sat, 07 Oct 2023 09:16:51 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */class W{constructor(e=0,r=0){this.x=0,this.y=0,this.x=e,this.y=r}clone(){return new W(this.x,this.y)}copyFrom(e){return this.set(e.x,e.y),this}copyTo(e){return e.set(this.x,this.y),e}equals(e){return e.x===this.x&&e.y===this.y}set(e=0,r=e){return this.x=e,this.y=r,this}static get shared(){return tn.x=0,tn.y=0,tn}}const tn=new W;class Dt{constructor(e){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=Dt.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new W,this.page=new W,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=e}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(e,r,i){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(e,r,i,n,s){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}var Hg=Object.defineProperty,jg=Object.defineProperties,Wg=Object.getOwnPropertyDescriptors,Da=Object.getOwnPropertySymbols,Vg=Object.prototype.hasOwnProperty,Yg=Object.prototype.propertyIsEnumerable,za=(t,e,r)=>e in t?Hg(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Na=(t,e)=>{for(var r in e||(e={}))Vg.call(e,r)&&za(t,r,e[r]);if(Da)for(var r of Da(e))Yg.call(e,r)&&za(t,r,e[r]);return t},Xg=(t,e)=>jg(t,Wg(e)),b=(t=>(t.Renderer="renderer",t.Application="application",t.WebGLPipes="webgl-pipes",t.WebGLPipesAdaptor="webgl-pipes-adaptor",t.WebGLSystem="webgl-system",t.WebGPUPipes="webgpu-pipes",t.WebGPUPipesAdaptor="webgpu-pipes-adaptor",t.WebGPUSystem="webgpu-system",t.CanvasSystem="canvas-system",t.CanvasPipesAdaptor="canvas-pipes-adaptor",t.CanvasPipes="canvas-pipes",t.Asset="asset",t.LoadParser="load-parser",t.ResolveParser="resolve-parser",t.CacheParser="cache-parser",t.DetectionParser="detection-parser",t.MaskEffect="mask-effect",t.BlendMode="blend-mode",t.TextureSource="texture-source",t))(b||{});const rn=t=>{if(typeof t=="function"||typeof t=="object"&&t.extension){const e=typeof t.extension!="object"?{type:t.extension}:t.extension;t=Xg(Na({},e),{ref:t})}if(typeof t=="object")t=Na({},t);else throw new Error("Invalid extension type");return typeof t.type=="string"&&(t.type=[t.type]),t},Yt=(t,e)=>{var r;return(r=rn(t).priority)!=null?r:e},V={_addHandlers:{},_removeHandlers:{},_queue:{},remove(...t){return t.map(rn).forEach(e=>{e.type.forEach(r=>{var i,n;return(n=(i=this._removeHandlers)[r])==null?void 0:n.call(i,e)})}),this},add(...t){return t.map(rn).forEach(e=>{e.type.forEach(r=>{const i=this._addHandlers,n=this._queue;i[r]?i[r](e):(n[r]=n[r]||[],n[r].push(e))})}),this},handle(t,e,r){const i=this._addHandlers,n=this._removeHandlers;i[t]=e,n[t]=r;const s=this._queue;return s[t]&&(s[t].forEach(o=>e(o)),delete s[t]),this},handleByMap(t,e){return this.handle(t,r=>{e[r.name]=r.ref},r=>{delete e[r.name]})},handleByNamedList(t,e,r=-1){return this.handle(t,i=>{e.findIndex(n=>n.name===i.name)>=0||(e.push({name:i.name,value:i.ref}),e.sort((n,s)=>Yt(s.value,r)-Yt(n.value,r)))},i=>{const n=e.findIndex(s=>s.name===i.name);n!==-1&&e.splice(n,1)})},handleByList(t,e,r=-1){return this.handle(t,i=>{e.includes(i.ref)||(e.push(i.ref),e.sort((n,s)=>Yt(s,r)-Yt(n,r)))},i=>{const n=e.indexOf(i.ref);n!==-1&&e.splice(n,1)})}};var p1=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function f1(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function qg(t,e,r){return r={path:e,exports:{},require:function(i,n){return Kg(i,n==null?r.path:n)}},t(r,r.exports),r.exports}function g1(t){return t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function m1(t){return t&&Object.prototype.hasOwnProperty.call(t,"default")&&Object.keys(t).length===1?t.default:t}function b1(t){if(t.__esModule)return t;var e=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(t).forEach(function(r){var i=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,i.get?i:{enumerable:!0,get:function(){return t[r]}})}),e}function Kg(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var ue=qg(function(t){"use strict";var e=Object.prototype.hasOwnProperty,r="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(r=!1));function n(l,u,h){this.fn=l,this.context=u,this.once=h||!1}function s(l,u,h,c,p){if(typeof h!="function")throw new TypeError("The listener must be a function");var d=new n(h,c||l,p),f=r?r+u:u;return l._events[f]?l._events[f].fn?l._events[f]=[l._events[f],d]:l._events[f].push(d):(l._events[f]=d,l._eventsCount++),l}function o(l,u){--l._eventsCount===0?l._events=new i:delete l._events[u]}function a(){this._events=new i,this._eventsCount=0}a.prototype.eventNames=function(){var u=[],h,c;if(this._eventsCount===0)return u;for(c in h=this._events)e.call(h,c)&&u.push(r?c.slice(1):c);return Object.getOwnPropertySymbols?u.concat(Object.getOwnPropertySymbols(h)):u},a.prototype.listeners=function(u){var h=r?r+u:u,c=this._events[h];if(!c)return[];if(c.fn)return[c.fn];for(var p=0,d=c.length,f=new Array(d);p<d;p++)f[p]=c[p].fn;return f},a.prototype.listenerCount=function(u){var h=r?r+u:u,c=this._events[h];return c?c.fn?1:c.length:0},a.prototype.emit=function(u,h,c,p,d,f){var m=r?r+u:u;if(!this._events[m])return!1;var g=this._events[m],x=arguments.length,v,y;if(g.fn){switch(g.once&&this.removeListener(u,g.fn,void 0,!0),x){case 1:return g.fn.call(g.context),!0;case 2:return g.fn.call(g.context,h),!0;case 3:return g.fn.call(g.context,h,c),!0;case 4:return g.fn.call(g.context,h,c,p),!0;case 5:return g.fn.call(g.context,h,c,p,d),!0;case 6:return g.fn.call(g.context,h,c,p,d,f),!0}for(y=1,v=new Array(x-1);y<x;y++)v[y-1]=arguments[y];g.fn.apply(g.context,v)}else{var _=g.length,P;for(y=0;y<_;y++)switch(g[y].once&&this.removeListener(u,g[y].fn,void 0,!0),x){case 1:g[y].fn.call(g[y].context);break;case 2:g[y].fn.call(g[y].context,h);break;case 3:g[y].fn.call(g[y].context,h,c);break;case 4:g[y].fn.call(g[y].context,h,c,p);break;default:if(!v)for(P=1,v=new Array(x-1);P<x;P++)v[P-1]=arguments[P];g[y].fn.apply(g[y].context,v)}}return!0},a.prototype.on=function(u,h,c){return s(this,u,h,c,!1)},a.prototype.once=function(u,h,c){return s(this,u,h,c,!0)},a.prototype.removeListener=function(u,h,c,p){var d=r?r+u:u;if(!this._events[d])return this;if(!h)return o(this,d),this;var f=this._events[d];if(f.fn)f.fn===h&&(!p||f.once)&&(!c||f.context===c)&&o(this,d);else{for(var m=0,g=[],x=f.length;m<x;m++)(f[m].fn!==h||p&&!f[m].once||c&&f[m].context!==c)&&g.push(f[m]);g.length?this._events[d]=g.length===1?g[0]:g:o(this,d)}return this},a.prototype.removeAllListeners=function(u){var h;return u?(h=r?r+u:u,this._events[h]&&o(this,h)):(this._events=new i,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=r,a.EventEmitter=a,t.exports=a}),Zg={grad:.9,turn:360,rad:360/(2*Math.PI)},Fe=function(t){return typeof t=="string"?t.length>0:typeof t=="number"},oe=function(t,e,r){return e===void 0&&(e=0),r===void 0&&(r=Math.pow(10,e)),Math.round(r*t)/r+0},ve=function(t,e,r){return e===void 0&&(e=0),r===void 0&&(r=1),t>r?r:t>e?t:e},Ha=function(t){return(t=isFinite(t)?t%360:0)>0?t:t+360},ja=function(t){return{r:ve(t.r,0,255),g:ve(t.g,0,255),b:ve(t.b,0,255),a:ve(t.a)}},nn=function(t){return{r:oe(t.r),g:oe(t.g),b:oe(t.b),a:oe(t.a,3)}},Qg=/^#([0-9a-f]{3,8})$/i,Ir=function(t){var e=t.toString(16);return e.length<2?"0"+e:e},Wa=function(t){var e=t.r,r=t.g,i=t.b,n=t.a,s=Math.max(e,r,i),o=s-Math.min(e,r,i),a=o?s===e?(r-i)/o:s===r?2+(i-e)/o:4+(e-r)/o:0;return{h:60*(a<0?a+6:a),s:s?o/s*100:0,v:s/255*100,a:n}},Va=function(t){var e=t.h,r=t.s,i=t.v,n=t.a;e=e/360*6,r/=100,i/=100;var s=Math.floor(e),o=i*(1-r),a=i*(1-(e-s)*r),l=i*(1-(1-e+s)*r),u=s%6;return{r:255*[i,a,o,o,l,i][u],g:255*[l,i,i,a,o,o][u],b:255*[o,o,l,i,i,a][u],a:n}},Ya=function(t){return{h:Ha(t.h),s:ve(t.s,0,100),l:ve(t.l,0,100),a:ve(t.a)}},Xa=function(t){return{h:oe(t.h),s:oe(t.s),l:oe(t.l),a:oe(t.a,3)}},qa=function(t){return Va((r=(e=t).s,{h:e.h,s:(r*=((i=e.l)<50?i:100-i)/100)>0?2*r/(i+r)*100:0,v:i+r,a:e.a}));var e,r,i},Xt=function(t){return{h:(e=Wa(t)).h,s:(n=(200-(r=e.s))*(i=e.v)/100)>0&&n<200?r*i/100/(n<=100?n:200-n)*100:0,l:n/2,a:e.a};var e,r,i,n},Jg=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,em=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,tm=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,rm=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,sn={string:[[function(t){var e=Qg.exec(t);return e?(t=e[1]).length<=4?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:t.length===4?oe(parseInt(t[3]+t[3],16)/255,2):1}:t.length===6||t.length===8?{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16),a:t.length===8?oe(parseInt(t.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(t){var e=tm.exec(t)||rm.exec(t);return e?e[2]!==e[4]||e[4]!==e[6]?null:ja({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):null},"rgb"],[function(t){var e=Jg.exec(t)||em.exec(t);if(!e)return null;var r,i,n=Ya({h:(r=e[1],i=e[2],i===void 0&&(i="deg"),Number(r)*(Zg[i]||1)),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)});return qa(n)},"hsl"]],object:[[function(t){var e=t.r,r=t.g,i=t.b,n=t.a,s=n===void 0?1:n;return Fe(e)&&Fe(r)&&Fe(i)?ja({r:Number(e),g:Number(r),b:Number(i),a:Number(s)}):null},"rgb"],[function(t){var e=t.h,r=t.s,i=t.l,n=t.a,s=n===void 0?1:n;if(!Fe(e)||!Fe(r)||!Fe(i))return null;var o=Ya({h:Number(e),s:Number(r),l:Number(i),a:Number(s)});return qa(o)},"hsl"],[function(t){var e=t.h,r=t.s,i=t.v,n=t.a,s=n===void 0?1:n;if(!Fe(e)||!Fe(r)||!Fe(i))return null;var o=function(a){return{h:Ha(a.h),s:ve(a.s,0,100),v:ve(a.v,0,100),a:ve(a.a)}}({h:Number(e),s:Number(r),v:Number(i),a:Number(s)});return Va(o)},"hsv"]]},Ka=function(t,e){for(var r=0;r<e.length;r++){var i=e[r][0](t);if(i)return[i,e[r][1]]}return[null,void 0]},Za=function(t){return typeof t=="string"?Ka(t.trim(),sn.string):typeof t=="object"&&t!==null?Ka(t,sn.object):[null,void 0]},v1=function(t){return Za(t)[1]},on=function(t,e){var r=Xt(t);return{h:r.h,s:ve(r.s+100*e,0,100),l:r.l,a:r.a}},an=function(t){return(299*t.r+587*t.g+114*t.b)/1e3/255},Qa=function(t,e){var r=Xt(t);return{h:r.h,s:r.s,l:ve(r.l+100*e,0,100),a:r.a}},Gr=function(){function t(e){this.parsed=Za(e)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return t.prototype.isValid=function(){return this.parsed!==null},t.prototype.brightness=function(){return oe(an(this.rgba),2)},t.prototype.isDark=function(){return an(this.rgba)<.5},t.prototype.isLight=function(){return an(this.rgba)>=.5},t.prototype.toHex=function(){return e=nn(this.rgba),r=e.r,i=e.g,n=e.b,o=(s=e.a)<1?Ir(oe(255*s)):"","#"+Ir(r)+Ir(i)+Ir(n)+o;var e,r,i,n,s,o},t.prototype.toRgb=function(){return nn(this.rgba)},t.prototype.toRgbString=function(){return e=nn(this.rgba),r=e.r,i=e.g,n=e.b,(s=e.a)<1?"rgba("+r+", "+i+", "+n+", "+s+")":"rgb("+r+", "+i+", "+n+")";var e,r,i,n,s},t.prototype.toHsl=function(){return Xa(Xt(this.rgba))},t.prototype.toHslString=function(){return e=Xa(Xt(this.rgba)),r=e.h,i=e.s,n=e.l,(s=e.a)<1?"hsla("+r+", "+i+"%, "+n+"%, "+s+")":"hsl("+r+", "+i+"%, "+n+"%)";var e,r,i,n,s},t.prototype.toHsv=function(){return e=Wa(this.rgba),{h:oe(e.h),s:oe(e.s),v:oe(e.v),a:oe(e.a,3)};var e},t.prototype.invert=function(){return Me({r:255-(e=this.rgba).r,g:255-e.g,b:255-e.b,a:e.a});var e},t.prototype.saturate=function(e){return e===void 0&&(e=.1),Me(on(this.rgba,e))},t.prototype.desaturate=function(e){return e===void 0&&(e=.1),Me(on(this.rgba,-e))},t.prototype.grayscale=function(){return Me(on(this.rgba,-1))},t.prototype.lighten=function(e){return e===void 0&&(e=.1),Me(Qa(this.rgba,e))},t.prototype.darken=function(e){return e===void 0&&(e=.1),Me(Qa(this.rgba,-e))},t.prototype.rotate=function(e){return e===void 0&&(e=15),this.hue(this.hue()+e)},t.prototype.alpha=function(e){return typeof e=="number"?Me({r:(r=this.rgba).r,g:r.g,b:r.b,a:e}):oe(this.rgba.a,3);var r},t.prototype.hue=function(e){var r=Xt(this.rgba);return typeof e=="number"?Me({h:e,s:r.s,l:r.l,a:r.a}):oe(r.h)},t.prototype.isEqual=function(e){return this.toHex()===Me(e).toHex()},t}(),Me=function(t){return t instanceof Gr?t:new Gr(t)},Ja=[],im=function(t){t.forEach(function(e){Ja.indexOf(e)<0&&(e(Gr,sn),Ja.push(e))})},y1=function(){return new Gr({r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})};function nm(t,e){var r={white:"#ffffff",bisque:"#ffe4c4",blue:"#0000ff",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",antiquewhite:"#faebd7",aqua:"#00ffff",azure:"#f0ffff",whitesmoke:"#f5f5f5",papayawhip:"#ffefd5",plum:"#dda0dd",blanchedalmond:"#ffebcd",black:"#000000",gold:"#ffd700",goldenrod:"#daa520",gainsboro:"#dcdcdc",cornsilk:"#fff8dc",cornflowerblue:"#6495ed",burlywood:"#deb887",aquamarine:"#7fffd4",beige:"#f5f5dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkkhaki:"#bdb76b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",peachpuff:"#ffdab9",darkmagenta:"#8b008b",darkred:"#8b0000",darkorchid:"#9932cc",darkorange:"#ff8c00",darkslateblue:"#483d8b",gray:"#808080",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",deeppink:"#ff1493",deepskyblue:"#00bfff",wheat:"#f5deb3",firebrick:"#b22222",floralwhite:"#fffaf0",ghostwhite:"#f8f8ff",darkviolet:"#9400d3",magenta:"#ff00ff",green:"#008000",dodgerblue:"#1e90ff",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",blueviolet:"#8a2be2",forestgreen:"#228b22",lawngreen:"#7cfc00",indianred:"#cd5c5c",indigo:"#4b0082",fuchsia:"#ff00ff",brown:"#a52a2a",maroon:"#800000",mediumblue:"#0000cd",lightcoral:"#f08080",darkturquoise:"#00ced1",lightcyan:"#e0ffff",ivory:"#fffff0",lightyellow:"#ffffe0",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",linen:"#faf0e6",mediumaquamarine:"#66cdaa",lemonchiffon:"#fffacd",lime:"#00ff00",khaki:"#f0e68c",mediumseagreen:"#3cb371",limegreen:"#32cd32",mediumspringgreen:"#00fa9a",lightskyblue:"#87cefa",lightblue:"#add8e6",midnightblue:"#191970",lightpink:"#ffb6c1",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",mintcream:"#f5fffa",lightslategray:"#778899",lightslategrey:"#778899",navajowhite:"#ffdead",navy:"#000080",mediumvioletred:"#c71585",powderblue:"#b0e0e6",palegoldenrod:"#eee8aa",oldlace:"#fdf5e6",paleturquoise:"#afeeee",mediumturquoise:"#48d1cc",mediumorchid:"#ba55d3",rebeccapurple:"#663399",lightsteelblue:"#b0c4de",mediumslateblue:"#7b68ee",thistle:"#d8bfd8",tan:"#d2b48c",orchid:"#da70d6",mediumpurple:"#9370db",purple:"#800080",pink:"#ffc0cb",skyblue:"#87ceeb",springgreen:"#00ff7f",palegreen:"#98fb98",red:"#ff0000",yellow:"#ffff00",slateblue:"#6a5acd",lavenderblush:"#fff0f5",peru:"#cd853f",palevioletred:"#db7093",violet:"#ee82ee",teal:"#008080",slategray:"#708090",slategrey:"#708090",aliceblue:"#f0f8ff",darkseagreen:"#8fbc8f",darkolivegreen:"#556b2f",greenyellow:"#adff2f",seagreen:"#2e8b57",seashell:"#fff5ee",tomato:"#ff6347",silver:"#c0c0c0",sienna:"#a0522d",lavender:"#e6e6fa",lightgreen:"#90ee90",orange:"#ffa500",orangered:"#ff4500",steelblue:"#4682b4",royalblue:"#4169e1",turquoise:"#40e0d0",yellowgreen:"#9acd32",salmon:"#fa8072",saddlebrown:"#8b4513",sandybrown:"#f4a460",rosybrown:"#bc8f8f",darksalmon:"#e9967a",lightgoldenrodyellow:"#fafad2",snow:"#fffafa",lightgrey:"#d3d3d3",lightgray:"#d3d3d3",dimgray:"#696969",dimgrey:"#696969",olivedrab:"#6b8e23",olive:"#808000"},i={};for(var n in r)i[r[n]]=n;var s={};t.prototype.toName=function(o){if(!(this.rgba.a||this.rgba.r||this.rgba.g||this.rgba.b))return"transparent";var a,l,u=i[this.toHex()];if(u)return u;if(o!=null&&o.closest){var h=this.toRgb(),c=1/0,p="black";if(!s.length)for(var d in r)s[d]=new t(r[d]).toRgb();for(var f in r){var m=(a=h,l=s[f],Math.pow(a.r-l.r,2)+Math.pow(a.g-l.g,2)+Math.pow(a.b-l.b,2));m<c&&(c=m,p=f)}return p}},e.string.push([function(o){var a=o.toLowerCase(),l=a==="transparent"?"#0000":r[a];return l?new t(l).toRgb():null},"name"])}var sm=Object.defineProperty,el=Object.getOwnPropertySymbols,om=Object.prototype.hasOwnProperty,am=Object.prototype.propertyIsEnumerable,tl=(t,e,r)=>e in t?sm(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,lm=(t,e)=>{for(var r in e||(e={}))om.call(e,r)&&tl(t,r,e[r]);if(el)for(var r of el(e))am.call(e,r)&&tl(t,r,e[r]);return t};im([nm]);const Ze=class{constructor(t=16777215){this._value=null,this._components=new Float32Array(4),this._components.fill(1),this._int=16777215,this.value=t}get red(){return this._components[0]}get green(){return this._components[1]}get blue(){return this._components[2]}get alpha(){return this._components[3]}setValue(t){return this.value=t,this}set value(t){if(t instanceof Ze)this._value=this._cloneSource(t._value),this._int=t._int,this._components.set(t._components);else{if(t===null)throw new Error("Cannot set Color#value to null");(this._value===null||!this._isSourceEqual(this._value,t))&&(this._normalize(t),this._value=this._cloneSource(t))}}get value(){return this._value}_cloneSource(t){return typeof t=="string"||typeof t=="number"||t instanceof Number||t===null?t:Array.isArray(t)||ArrayBuffer.isView(t)?t.slice(0):typeof t=="object"&&t!==null?lm({},t):t}_isSourceEqual(t,e){const r=typeof t;if(r!==typeof e)return!1;if(r==="number"||r==="string"||t instanceof Number)return t===e;if(Array.isArray(t)&&Array.isArray(e)||ArrayBuffer.isView(t)&&ArrayBuffer.isView(e))return t.length!==e.length?!1:t.every((i,n)=>i===e[n]);if(t!==null&&e!==null){const i=Object.keys(t),n=Object.keys(e);return i.length!==n.length?!1:i.every(s=>t[s]===e[s])}return t===e}toRgba(){const[t,e,r,i]=this._components;return{r:t,g:e,b:r,a:i}}toRgb(){const[t,e,r]=this._components;return{r:t,g:e,b:r}}toRgbaString(){const[t,e,r]=this.toUint8RgbArray();return`rgba(${t},${e},${r},${this.alpha})`}toUint8RgbArray(t){const[e,r,i]=this._components;return this._arrayRgb||(this._arrayRgb=[]),t=t||this._arrayRgb,t[0]=Math.round(e*255),t[1]=Math.round(r*255),t[2]=Math.round(i*255),t}toArray(t){this._arrayRgba||(this._arrayRgba=[]),t=t||this._arrayRgba;const[e,r,i,n]=this._components;return t[0]=e,t[1]=r,t[2]=i,t[3]=n,t}toRgbArray(t){this._arrayRgb||(this._arrayRgb=[]),t=t||this._arrayRgb;const[e,r,i]=this._components;return t[0]=e,t[1]=r,t[2]=i,t}toNumber(){return this._int}toBgrNumber(){const[t,e,r]=this.toUint8RgbArray();return(r<<16)+(e<<8)+t}toLittleEndianNumber(){const t=this._int;return(t>>16)+(t&65280)+((t&255)<<16)}multiply(t){const[e,r,i,n]=Ze._temp.setValue(t)._components;return this._components[0]*=e,this._components[1]*=r,this._components[2]*=i,this._components[3]*=n,this._refreshInt(),this._value=null,this}premultiply(t,e=!0){return e&&(this._components[0]*=t,this._components[1]*=t,this._components[2]*=t),this._components[3]=t,this._refreshInt(),this._value=null,this}toPremultiplied(t,e=!0){if(t===1)return(255<<24)+this._int;if(t===0)return e?0:this._int;let r=this._int>>16&255,i=this._int>>8&255,n=this._int&255;return e&&(r=r*t+.5|0,i=i*t+.5|0,n=n*t+.5|0),(t*255<<24)+(r<<16)+(i<<8)+n}toHex(){const t=this._int.toString(16);return`#${"000000".substring(0,6-t.length)+t}`}toHexa(){const t=Math.round(this._components[3]*255).toString(16);return this.toHex()+"00".substring(0,2-t.length)+t}setAlpha(t){return this._components[3]=this._clamp(t),this}_normalize(t){let e,r,i,n;if((typeof t=="number"||t instanceof Number)&&t>=0&&t<=16777215){const s=t;e=(s>>16&255)/255,r=(s>>8&255)/255,i=(s&255)/255,n=1}else if((Array.isArray(t)||t instanceof Float32Array)&&t.length>=3&&t.length<=4)t=this._clamp(t),[e,r,i,n=1]=t;else if((t instanceof Uint8Array||t instanceof Uint8ClampedArray)&&t.length>=3&&t.length<=4)t=this._clamp(t,0,255),[e,r,i,n=255]=t,e/=255,r/=255,i/=255,n/=255;else if(typeof t=="string"||typeof t=="object"){if(typeof t=="string"){const o=Ze.HEX_PATTERN.exec(t);o&&(t=`#${o[2]}`)}const s=Me(t);s.isValid()&&({r:e,g:r,b:i,a:n}=s.rgba,e/=255,r/=255,i/=255)}if(e!==void 0)this._components[0]=e,this._components[1]=r,this._components[2]=i,this._components[3]=n,this._refreshInt();else throw new Error(`Unable to convert color ${t}`)}_refreshInt(){this._clamp(this._components);const[t,e,r]=this._components;this._int=(t*255<<16)+(e*255<<8)+(r*255|0)}_clamp(t,e=0,r=1){return typeof t=="number"?Math.min(Math.max(t,e),r):(t.forEach((i,n)=>{t[n]=Math.min(Math.max(i,e),r)}),t)}static isColorLike(t){return typeof t=="number"||typeof t=="string"||t instanceof Number||t instanceof Ze||Array.isArray(t)||t instanceof Uint8Array||t instanceof Uint8ClampedArray||t instanceof Float32Array||t.r!==void 0&&t.g!==void 0&&t.b!==void 0||t.r!==void 0&&t.g!==void 0&&t.b!==void 0&&t.a!==void 0||t.h!==void 0&&t.s!==void 0&&t.l!==void 0||t.h!==void 0&&t.s!==void 0&&t.l!==void 0&&t.a!==void 0||t.h!==void 0&&t.s!==void 0&&t.v!==void 0||t.h!==void 0&&t.s!==void 0&&t.v!==void 0&&t.a!==void 0}};let H=Ze;H.shared=new Ze,H._temp=new Ze,H.HEX_PATTERN=/^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;const rl=Math.PI*2,il=180/Math.PI,nl=Math.PI/180;class k{constructor(e=1,r=0,i=0,n=1,s=0,o=0){this.array=null,this.a=e,this.b=r,this.c=i,this.d=n,this.tx=s,this.ty=o}fromArray(e){this.a=e[0],this.b=e[1],this.c=e[3],this.d=e[4],this.tx=e[2],this.ty=e[5]}set(e,r,i,n,s,o){return this.a=e,this.b=r,this.c=i,this.d=n,this.tx=s,this.ty=o,this}toArray(e,r){this.array||(this.array=new Float32Array(9));const i=r||this.array;return e?(i[0]=this.a,i[1]=this.b,i[2]=0,i[3]=this.c,i[4]=this.d,i[5]=0,i[6]=this.tx,i[7]=this.ty,i[8]=1):(i[0]=this.a,i[1]=this.c,i[2]=this.tx,i[3]=this.b,i[4]=this.d,i[5]=this.ty,i[6]=0,i[7]=0,i[8]=1),i}apply(e,r){r=r||new W;const i=e.x,n=e.y;return r.x=this.a*i+this.c*n+this.tx,r.y=this.b*i+this.d*n+this.ty,r}applyInverse(e,r){r=r||new W;const i=this.a,n=this.b,s=this.c,o=this.d,a=this.tx,l=this.ty,u=1/(i*o+s*-n),h=e.x,c=e.y;return r.x=o*u*h+-s*u*c+(l*s-a*o)*u,r.y=i*u*c+-n*u*h+(-l*i+a*n)*u,r}translate(e,r){return this.tx+=e,this.ty+=r,this}scale(e,r){return this.a*=e,this.d*=r,this.c*=e,this.b*=r,this.tx*=e,this.ty*=r,this}rotate(e){const r=Math.cos(e),i=Math.sin(e),n=this.a,s=this.c,o=this.tx;return this.a=n*r-this.b*i,this.b=n*i+this.b*r,this.c=s*r-this.d*i,this.d=s*i+this.d*r,this.tx=o*r-this.ty*i,this.ty=o*i+this.ty*r,this}append(e){const r=this.a,i=this.b,n=this.c,s=this.d;return this.a=e.a*r+e.b*n,this.b=e.a*i+e.b*s,this.c=e.c*r+e.d*n,this.d=e.c*i+e.d*s,this.tx=e.tx*r+e.ty*n+this.tx,this.ty=e.tx*i+e.ty*s+this.ty,this}appendFrom(e,r){const i=e.a,n=e.b,s=e.c,o=e.d,a=e.tx,l=e.ty,u=r.a,h=r.b,c=r.c,p=r.d;return this.a=i*u+n*c,this.b=i*h+n*p,this.c=s*u+o*c,this.d=s*h+o*p,this.tx=a*u+l*c+r.tx,this.ty=a*h+l*p+r.ty,this}setTransform(e,r,i,n,s,o,a,l,u){return this.a=Math.cos(a+u)*s,this.b=Math.sin(a+u)*s,this.c=-Math.sin(a-l)*o,this.d=Math.cos(a-l)*o,this.tx=e-(i*this.a+n*this.c),this.ty=r-(i*this.b+n*this.d),this}prepend(e){const r=this.tx;if(e.a!==1||e.b!==0||e.c!==0||e.d!==1){const i=this.a,n=this.c;this.a=i*e.a+this.b*e.c,this.b=i*e.b+this.b*e.d,this.c=n*e.a+this.d*e.c,this.d=n*e.b+this.d*e.d}return this.tx=r*e.a+this.ty*e.c+e.tx,this.ty=r*e.b+this.ty*e.d+e.ty,this}decompose(e){const r=this.a,i=this.b,n=this.c,s=this.d,o=e.pivot,a=-Math.atan2(-n,s),l=Math.atan2(i,r),u=Math.abs(a+l);return u<1e-5||Math.abs(rl-u)<1e-5?(e.rotation=l,e.skew.x=e.skew.y=0):(e.rotation=0,e.skew.x=a,e.skew.y=l),e.scale.x=Math.sqrt(r*r+i*i),e.scale.y=Math.sqrt(n*n+s*s),e.position.x=this.tx+(o.x*r+o.y*n),e.position.y=this.ty+(o.x*i+o.y*s),e}invert(){const e=this.a,r=this.b,i=this.c,n=this.d,s=this.tx,o=e*n-r*i;return this.a=n/o,this.b=-r/o,this.c=-i/o,this.d=e/o,this.tx=(i*this.ty-n*s)/o,this.ty=-(e*this.ty-r*s)/o,this}isIdentity(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0}identity(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this}clone(){const e=new k;return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyTo(e){return e.a=this.a,e.b=this.b,e.c=this.c,e.d=this.d,e.tx=this.tx,e.ty=this.ty,e}copyFrom(e){return this.a=e.a,this.b=e.b,this.c=e.c,this.d=e.d,this.tx=e.tx,this.ty=e.ty,this}static get IDENTITY(){return hm.identity()}static get shared(){return um.identity()}}const um=new k,hm=new k;class se{constructor(e,r,i){this._x=r||0,this._y=i||0,this._observer=e}clone(e){return new se(e!=null?e:this._observer,this._x,this._y)}set(e=0,r=e){return(this._x!==e||this._y!==r)&&(this._x=e,this._y=r,this._observer.onUpdate()),this}copyFrom(e){return(this._x!==e.x||this._y!==e.y)&&(this._x=e.x,this._y=e.y,this._observer.onUpdate()),this}copyTo(e){return e.set(this._x,this._y),e}equals(e){return e.x===this._x&&e.y===this._y}get x(){return this._x}set x(e){this._x!==e&&(this._x=e,this._observer.onUpdate(this))}get y(){return this._y}set y(e){this._y!==e&&(this._y=e,this._observer.onUpdate(this))}}const ln={default:-1};function q(t="default"){return ln[t]===void 0&&(ln[t]=-1),++ln[t]}const sl={},G="8.0.0";function O(t,e,r=3){if(sl[e])return;let i=new Error().stack;typeof i=="undefined"?console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`):(i=i.split(`
`).splice(r).join(`
`),console.groupCollapsed?(console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s","color:#614108;background:#fffbe6","font-weight:normal;color:#614108;background:#fffbe6",`${e}
Deprecated since v${t}`),console.warn(i),console.groupEnd()):(console.warn("PixiJS Deprecation Warning: ",`${e}
Deprecated since v${t}`),console.warn(i))),sl[e]=!0}function un(t,e,r){const i=t.length;let n;if(e>=i||r===0)return;r=e+r>i?i-e:r;const s=i-r;for(n=e;n<s;++n)t[n]=t[n+r];t.length=s}const ol={allowChildren:!0,removeChildren(t=0,e){const r=e!=null?e:this.children.length,i=r-t,n=[];if(i>0&&i<=r){for(let s=r-1;s>=t;s--){const o=this.children[s];o&&(this.layerGroup&&this.layerGroup.removeChild(o),n.push(o),o.parent=null)}un(this.children,t,r);for(let s=0;s<n.length;++s)this.emit("childRemoved",n[s],this,s),n[s].emit("removed",this);return n}else if(i===0&&this.children.length===0)return n;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")},removeChildAt(t){const e=this.getChildAt(t);return this.removeChild(e)},getChildAt(t){if(t<0||t>=this.children.length)throw new Error(`getChildAt: Index (${t}) does not exist.`);return this.children[t]},setChildIndex(t,e){if(e<0||e>=this.children.length)throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`);this.getChildIndex(t),this.addChildAt(t,e)},getChildIndex(t){const e=this.children.indexOf(t);if(e===-1)throw new Error("The supplied Container must be a child of the caller");return e},addChildAt(t,e){this.allowChildren||O(G,"addChildAt: Only Containers will be allowed to add children in v8.0.0");const{children:r}=this;if(e<0||e>r.length)throw new Error(`${t}addChildAt: The index ${e} supplied is out of bounds ${r.length}`);if(t.parent){const i=t.parent.children.indexOf(t);if(t.parent===this&&i===e)return t;i!==-1&&t.parent.children.splice(i,1)}return e===r.length?r.push(t):r.splice(e,0,t),t.parent=this,t.didChange=!0,t.didViewUpdate=!1,t._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(t),this.sortableChildren&&(this.sortDirty=!0),this.emit("childAdded",t,this,e),t.emit("added",this),t},swapChildren(t,e){if(t===e)return;const r=this.getChildIndex(t),i=this.getChildIndex(e);this.children[r]=e,this.children[i]=t},removeFromParent(){var t;(t=this.parent)==null||t.removeChild(this)}};class $r{constructor(e){this.pipe="filter",this.priority=1,this.filters=e==null?void 0:e.filters}destroy(){for(let e=0;e<this.filters.length;e++)this.filters[e].destroy();this.filters=null}}const al=[];function ll(t){const e=al.pop()||new $r;return e.filters=t,e}function ul(t){t.filters=null,al.push(t)}class hl{constructor(e,r){this._pool=[],this._count=0,this._index=0,this._classType=e,r&&this.prepopulate(r)}prepopulate(e){for(let r=0;r<e;r++)this._pool[this._index++]=new this._classType;this._count+=e}get(e){var r;let i;return this._index>0?i=this._pool[--this._index]:i=new this._classType,(r=i.init)==null||r.call(i,e),i}return(e){var r;(r=e.reset)==null||r.call(e),this._pool[this._index++]=e}get totalSize(){return this._count}get totalFree(){return this._pool.length}get totalUsed(){return this._count-this._pool.length}}class cl{constructor(){this._poolsByClass=new Map}prepopulate(e,r){this.getPool(e).prepopulate(r)}get(e,r){return this.getPool(e).get(r)}return(e){this.getPool(e.constructor).return(e)}getPool(e){return this._poolsByClass.has(e)||this._poolsByClass.set(e,new hl(e)),this._poolsByClass.get(e)}stats(){const e={};return this._poolsByClass.forEach(r=>{const i=e[r._classType.name]?r._classType.name+r._classType.ID:r._classType.name;e[i]={free:r.totalFree,used:r.totalUsed,size:r.totalSize}}),e}}const z=new cl;class dl{constructor(){this._effectClasses=[],this._tests=[],this._initialized=!1}init(){this._initialized||(this._initialized=!0,this._effectClasses.forEach(e=>{this.add({test:e.test,maskClass:e})}))}add(e){this._tests.push(e)}getMaskEffect(e){this._initialized||this.init();for(let r=0;r<this._tests.length;r++){const i=this._tests[r];if(i.test(e))return z.get(i.maskClass,e)}return e}returnMaskEffect(e){z.return(e)}}const Lr=new dl;V.handleByList(b.MaskEffect,Lr._effectClasses);const pl={_mask:null,_filters:null,effects:[],addEffect(t){this.effects.indexOf(t)===-1&&(this.effects.push(t),this.effects.sort((e,r)=>e.priority-r.priority),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())},removeEffect(t){const e=this.effects.indexOf(t);e!==-1&&(this.effects.splice(e,1),!this.isLayerRoot&&this.layerGroup&&(this.layerGroup.structureDidChange=!0),this._updateIsSimple())},set mask(t){if(this._mask||(this._mask={mask:null,effect:null}),this._mask.mask===t||(this._mask.effect&&(this.removeEffect(this._mask.effect),Lr.returnMaskEffect(this._mask.effect),this._mask.effect=null),this._mask.mask=t,t==null))return;const e=Lr.getMaskEffect(t);this._mask.effect=e,this.addEffect(e)},get mask(){var t;return(t=this._mask)==null?void 0:t.mask},set filters(t){if(!Array.isArray(t)&&t!==null&&(t=[t]),this._filters||(this._filters={filters:null,effect:null}),this._filters.filters===t||(this._filters.effect&&(this.removeEffect(this._filters.effect),ul(this._filters.effect),this._filters.effect=null),this._filters.filters=t,!t))return;const e=ll(t);this._filters.effect=e,this.addEffect(e)},get filters(){var t;return(t=this._filters)==null?void 0:t.filters}},fl={label:null,get name(){return O(G,"Container.name property has been removed, use Container.label instead"),this.label},set name(t){O(G,"Container.name property has been removed, use Container.label instead"),this.label=t},getChildByName(t,e=!1){return this.getChildByLabel(t,e)},getChildByLabel(t,e=!1){const r=this.children;for(let i=0;i<r.length;i++){const n=r[i];if(n.label===t||t instanceof RegExp&&t.test(n.label))return n}if(e)for(let i=0;i<r.length;i++){const n=r[i].getChildByLabel(t,!0);if(n)return n}return null},getChildrenByLabel(t,e=!1,r=[]){const i=this.children;for(let n=0;n<i.length;n++){const s=i[n];(s.label===t||t instanceof RegExp&&t.test(s.label))&&r.push(s)}if(e)for(let n=0;n<i.length;n++)i[n].getChildrenByLabel(t,!0,r);return r}},Dr=[new W,new W,new W,new W];class Q{constructor(e=0,r=0,i=0,n=0){this.type="rectangle",this.x=Number(e),this.y=Number(r),this.width=Number(i),this.height=Number(n)}get left(){return this.x}get right(){return this.x+this.width}get top(){return this.y}get bottom(){return this.y+this.height}static get EMPTY(){return new Q(0,0,0,0)}clone(){return new Q(this.x,this.y,this.width,this.height)}copyFromBounds(e){return this.x=e.minX,this.y=e.minY,this.width=e.maxX-e.minX,this.height=e.maxY-e.minY,this}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,r){return this.width<=0||this.height<=0?!1:e>=this.x&&e<this.x+this.width&&r>=this.y&&r<this.y+this.height}intersects(e,r){if(!r){const S=this.x<e.x?e.x:this.x;if((this.right>e.right?e.right:this.right)<=S)return!1;const w=this.y<e.y?e.y:this.y;return(this.bottom>e.bottom?e.bottom:this.bottom)>w}const i=this.left,n=this.right,s=this.top,o=this.bottom;if(n<=i||o<=s)return!1;const a=Dr[0].set(e.left,e.top),l=Dr[1].set(e.left,e.bottom),u=Dr[2].set(e.right,e.top),h=Dr[3].set(e.right,e.bottom);if(u.x<=a.x||l.y<=a.y)return!1;const c=Math.sign(r.a*r.d-r.b*r.c);if(c===0||(r.apply(a,a),r.apply(l,l),r.apply(u,u),r.apply(h,h),Math.max(a.x,l.x,u.x,h.x)<=i||Math.min(a.x,l.x,u.x,h.x)>=n||Math.max(a.y,l.y,u.y,h.y)<=s||Math.min(a.y,l.y,u.y,h.y)>=o))return!1;const p=c*(l.y-a.y),d=c*(a.x-l.x),f=p*i+d*s,m=p*n+d*s,g=p*i+d*o,x=p*n+d*o;if(Math.max(f,m,g,x)<=p*a.x+d*a.y||Math.min(f,m,g,x)>=p*h.x+d*h.y)return!1;const v=c*(a.y-u.y),y=c*(u.x-a.x),_=v*i+y*s,P=v*n+y*s,C=v*i+y*o,B=v*n+y*o;return!(Math.max(_,P,C,B)<=v*a.x+y*a.y||Math.min(_,P,C,B)>=v*h.x+y*h.y)}pad(e=0,r=e){return this.x-=e,this.y-=r,this.width+=e*2,this.height+=r*2,this}fit(e){const r=Math.max(this.x,e.x),i=Math.min(this.x+this.width,e.x+e.width),n=Math.max(this.y,e.y),s=Math.min(this.y+this.height,e.y+e.height);return this.x=r,this.width=Math.max(i-r,0),this.y=n,this.height=Math.max(s-n,0),this}ceil(e=1,r=.001){const i=Math.ceil((this.x+this.width-r)*e)/e,n=Math.ceil((this.y+this.height-r)*e)/e;return this.x=Math.floor((this.x+r)*e)/e,this.y=Math.floor((this.y+r)*e)/e,this.width=i-this.x,this.height=n-this.y,this}enlarge(e){const r=Math.min(this.x,e.x),i=Math.max(this.x+this.width,e.x+e.width),n=Math.min(this.y,e.y),s=Math.max(this.y+this.height,e.y+e.height);return this.x=r,this.width=i-r,this.y=n,this.height=s-n,this}getBounds(e){return e=e||new Q,e.copyFrom(this),e}}class pe{constructor(e=1/0,r=1/0,i=-1/0,n=-1/0){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack=[],this.matrix=new k,this.minX=e,this.minY=r,this.maxX=i,this.maxY=n}get rectangle(){this._rectangle||(this._rectangle=new Q);const e=this._rectangle;return this.minX>this.maxX||this.minY>this.maxY?(e.x=0,e.y=0,e.width=0,e.height=0):e.copyFromBounds(this),e}clear(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0,this._matrixStack.length=0,this.matrix.identity()}pushMatrix(e){this._matrixStack.push(e),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(e)):this.matrix.copyFrom(e)}popMatrix(){this._matrixStack.pop(),this._matrixStack.length>1?(this.matrix.copyFrom(this._matrixStack[this._matrixStack.length-2]),this.matrix.append(this._matrixStack[this._matrixStack.length-1])):this._matrixStack.length===1?this.matrix.copyFrom(this._matrixStack[0]):this.matrix.identity()}setMatrix(e){this.matrix.copyFrom(e)}set(e,r,i,n){this.minX=e,this.minY=r,this.maxX=i,this.maxY=n}addFrame(e,r,i,n){const s=this.matrix,o=s.a,a=s.b,l=s.c,u=s.d,h=s.tx,c=s.ty;let p=this.minX,d=this.minY,f=this.maxX,m=this.maxY,g=o*e+l*r+h,x=a*e+u*r+c;p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,g=o*i+l*r+h,x=a*i+u*r+c,p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,g=o*e+l*n+h,x=a*e+u*n+c,p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,g=o*i+l*n+h,x=a*i+u*n+c,p=g<p?g:p,d=x<d?x:d,f=g>f?g:f,m=x>m?x:m,this.minX=p,this.minY=d,this.maxX=f,this.maxY=m}addRect(e){this.addFrame(e.x,e.y,e.x+e.width,e.y+e.height)}addBounds(e){this.addFrame(e.minX,e.minY,e.maxX,e.maxY)}addBoundsMask(e){this.minX=this.minX>e.minX?this.minX:e.minX,this.minY=this.minY>e.minY?this.minY:e.minY,this.maxX=this.maxX<e.maxX?this.maxX:e.maxX,this.maxY=this.maxY<e.maxY?this.maxY:e.maxY}applyMatrix(e){const r=this.minX,i=this.minY,n=this.maxX,s=this.maxY,{a:o,b:a,c:l,d:u,tx:h,ty:c}=e;let p=o*r+l*i+h,d=a*r+u*i+c;this.minX=p,this.minY=d,this.maxX=p,this.maxY=d,p=o*n+l*i+h,d=a*n+u*i+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*r+l*s+h,d=a*r+u*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY,p=o*n+l*s+h,d=a*n+u*s+c,this.minX=p<this.minX?p:this.minX,this.minY=d<this.minY?d:this.minY,this.maxX=p>this.maxX?p:this.maxX,this.maxY=d>this.maxY?d:this.maxY}fit(e){return this.minX<e.left&&(this.minX=e.left),this.maxX>e.right&&(this.maxX=e.right),this.minY<e.top&&(this.minY=e.top),this.maxY>e.bottom&&(this.maxY=e.bottom),this}pad(e,r=e){return this.minX-=e,this.maxX+=e,this.minY-=r,this.maxY+=r,this}ceil(){return this.minX=Math.floor(this.minX),this.minY=Math.floor(this.minY),this.maxX=Math.ceil(this.maxX),this.maxY=Math.ceil(this.maxY),this}clone(){return new pe(this.minX,this.minY,this.maxX,this.maxY)}scale(e,r=e){return this.minX*=e,this.minY*=r,this.maxX*=e,this.maxY*=r,this}get x(){return this.minX}get y(){return this.minY}get width(){return this.maxX-this.minX}get height(){return this.maxY-this.minY}get isPositive(){return this.maxX-this.minX>0&&this.maxY-this.minY>0}get isValid(){return this.minX+this.minY!==1/0}addVertexData(e,r,i){let n=this.minX,s=this.minY,o=this.maxX,a=this.maxY;const l=this.matrix,u=l.a,h=l.b,c=l.c,p=l.d,d=l.tx,f=l.ty;for(let m=r;m<i;m+=2){const g=e[m],x=e[m+1],v=u*g+c*x+d,y=h*g+p*x+f;n=v<n?v:n,s=y<s?y:s,o=v>o?v:o,a=y>a?y:a}this.minX=n,this.minY=s,this.maxX=o,this.maxY=a}toString(){return`[@pixi:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`}}function Ue(t,e){const r=e._scale,i=e._pivot,n=e._position,s=r._x,o=r._y,a=i._x,l=i._y;t.a=e._cx*s,t.b=e._sx*s,t.c=e._cy*o,t.d=e._sy*o,t.tx=n._x-(a*t.a+l*t.c),t.ty=n._y-(a*t.b+l*t.d)}function qt(t,e,r){r.clear();let i;return t.parent?e?i=t.parent.worldTransform:i=Kt(t,new k):i=k.IDENTITY,hn(t,r,i,e),r.isValid||r.set(0,0,0,0),r}function hn(t,e,r,i){var n,s;if(!t.visible||!t.measurable)return;let o;i?o=t.worldTransform:(t.didChange&&Ue(t.localTransform,t),o=k.shared.appendFrom(t.localTransform,r).clone());const a=e,l=!!t.effects.length;l&&(e=e.clone()),t.view&&(e.setMatrix(o),t.view.addBounds(e));for(let u=0;u<t.children.length;u++)hn(t.children[u],e,o,i);if(l){for(let u=0;u<t.effects.length;u++)(s=(n=t.effects[u]).addBounds)==null||s.call(n,e);a.setMatrix(k.IDENTITY),a.addBounds(e)}}function Kt(t,e){const r=t.parent;return r&&(Kt(r,e),r.didChange&&Ue(r.localTransform,r),e.append(r.localTransform)),e}function He(t,e,r){e.clear(),r||(r=new k),t.view&&(e.setMatrix(r),t.view.addBounds(e));for(let i=0;i<t.children.length;i++)gl(t.children[i],e,r,t);return e.isValid||e.set(0,0,0,0),e}function gl(t,e,r,i){var n,s;if(!t.visible||!t.measurable)return;t.didChange&&Ue(t.localTransform,t);const o=t.localTransform,a=k.shared.appendFrom(o,r).clone(),l=e,u=!!t.effects.length;u&&(e=new pe),t.view&&(e.setMatrix(a),t.view.addBounds(e));for(let h=0;h<t.children.length;h++)gl(t.children[h],e,a,i);if(u){for(let h=0;h<t.effects.length;h++)(s=(n=t.effects[h]).addLocalBounds)==null||s.call(n,e,i);l.setMatrix(k.IDENTITY),l.addBounds(e)}}function ml(t,e,r){const i=t.parent;i&&i!==e&&(ml(i,e,r),Ue(i.localTransform,i),r.append(i.localTransform))}const Zt=new pe,Qt=new k,bl={get width(){return Math.abs(this.scale.x*He(this,Zt,Qt).width)},set width(t){const e=He(this,Zt,Qt).width;e!==0?this.scale.x=t/e:this.scale.x=1},get height(){return Math.abs(this.scale.y*He(this,Zt,Qt).height)},set height(t){const e=He(this,Zt,Qt).height;e!==0?this.scale.y=t/e:this.scale.y=1},getLocalBounds(t){const e=He(this,new pe,Qt);return t?t.copyFromBounds(e):e.rectangle.clone()},getBounds(t,e){const r=qt(this,t,Zt);return e?e.copyFromBounds(r):r.rectangle.clone()}},vl={_onRender:null,set onRender(t){const e=this.layerGroup;if(!t){this._onRender&&(e==null||e.removeOnRender(this)),this._onRender=null;return}this._onRender||e==null||e.addOnRender(this),this._onRender=t},get onRender(){return this._onRender}},yl={_zIndex:0,sortDirty:!1,sortableChildren:!1,get zIndex(){return this._zIndex},set zIndex(t){this._zIndex!==t&&(this._zIndex=t,this.depthOfChildModified())},depthOfChildModified(){this.parent&&(this.parent.sortableChildren=!0,this.parent.sortDirty=!0),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0)},sortChildren(){this.sortDirty&&(this.sortDirty=!1,this.children.sort(cm))}};function cm(t,e){return t._zIndex-e._zIndex}const xl={getGlobalPosition(t=new W,e=!1){return this.parent?this.parent.toGlobal(this._position,t,e):(t.x=this._position.x,t.y=this._position.y),t},toGlobal(t,e,r=!1){if(!r){this.didChange&&Ue(this.localTransform,this);const i=Kt(this,new k);return i.append(this.localTransform),i.apply(t,e)}return this.worldTransform.apply(t,e)},toLocal(t,e,r,i){if(e&&(t=e.toGlobal(t,r,i)),!i){this.didChange&&Ue(this.localTransform,this);const n=Kt(this,new k);return n.append(this.localTransform),n.applyInverse(t,r)}return this.worldTransform.applyInverse(t,r)}};class cn{constructor(){this.uid=q("instructionSet"),this.instructions=[],this.instructionSize=0}reset(){this.instructionSize=0}add(e){this.instructions[this.instructionSize++]=e}log(){this.instructions.length=this.instructionSize,console.table(this.instructions,["type","action"])}lastInstruction(){return this.instructions[this.instructionSize-1]}}class _l{constructor(e){this.type="layer",this.root=null,this.canBundle=!1,this.layerGroupParent=null,this.layerGroupChildren=[],this._children=[],this.worldTransform=new k,this.worldColor=4294967295,this.childrenToUpdate=Object.create(null),this.updateTick=0,this.childrenRenderablesToUpdate={list:[],index:0},this.structureDidChange=!0,this.instructionSet=new cn,this._onRenderContainers=[],this.root=e,this.addChild(e)}get localTransform(){return this.root.localTransform}get layerTransform(){return this.root.layerTransform}addLayerGroupChild(e){e.layerGroupParent&&e.layerGroupParent._removeLayerGroupChild(e),e.layerGroupParent=this,this.onChildUpdate(e.root),this.layerGroupChildren.push(e)}_removeLayerGroupChild(e){e.root.didChange&&this._removeChildFromUpdate(e.root);const r=this.layerGroupChildren.indexOf(e);r>-1&&this.layerGroupChildren.splice(r,1),e.layerGroupParent=null}addChild(e){if(this.structureDidChange=!0,e!==this.root&&(this._children.push(e),e.updateTick=-1,e.parent===this.root?e.relativeLayerDepth=1:e.relativeLayerDepth=e.parent.relativeLayerDepth+1,e._onRender&&this.addOnRender(e)),e.layerGroup){if(e.layerGroup.root===e){this.addLayerGroupChild(e.layerGroup);return}}else e.layerGroup=this,e.didChange=!0;const r=e.children;e.isLayerRoot||this.onChildUpdate(e);for(let i=0;i<r.length;i++)this.addChild(r[i])}removeChild(e){if(this.structureDidChange=!0,e._onRender&&this.removeOnRender(e),e.layerGroup.root!==e){const i=e.children;for(let n=0;n<i.length;n++)this.removeChild(i[n]);e.didChange&&e.layerGroup._removeChildFromUpdate(e),e.layerGroup=null}else this._removeLayerGroupChild(e.layerGroup);const r=this._children.indexOf(e);r>-1&&this._children.splice(r,1)}onChildUpdate(e){let r=this.childrenToUpdate[e.relativeLayerDepth];r||(r=this.childrenToUpdate[e.relativeLayerDepth]={index:0,list:[]}),r.list[r.index++]=e}updateRenderable(e){e.layerVisibleRenderable<3||(e.didViewUpdate=!1,this.instructionSet.renderPipes[e.view.renderPipeId].updateRenderable(e))}onChildViewUpdate(e){this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++]=e}_removeChildFromUpdate(e){const r=this.childrenToUpdate[e.relativeLayerDepth];if(!r)return;const i=r.list.indexOf(e);i>-1&&r.list.splice(i,1),r.index--}get isRenderable(){const e=this.worldColor>>24&255;return this.root.localVisibleRenderable===3&&e>0}addOnRender(e){this._onRenderContainers.push(e)}removeOnRender(e){this._onRenderContainers.splice(this._onRenderContainers.indexOf(e),1)}runOnRender(){this._onRenderContainers.forEach(e=>{e._onRender()})}}function Qe(t){return Object.fromEntries(Object.entries(t).filter(([e,r])=>r!==void 0))}const wl=new se(null),dn=new se(null),pn=new se(null,1,1),zr=1,fn=2,Nr=4,dm=8;class Y extends ue{constructor(e={}){var r,i;super(),this.uid=q("renderable"),this._updateFlags=15,this.isLayerRoot=!1,this.layerGroup=null,this.didChange=!1,this.didViewUpdate=!1,this.relativeLayerDepth=0,this.children=[],this.parent=null,this.includeInBuild=!0,this.measurable=!0,this.isSimple=!0,this.updateTick=-1,this.localTransform=new k,this.layerTransform=new k,this.destroyed=!1,this._position=new se(this,0,0),this._scale=pn,this._pivot=dn,this._skew=wl,this._cx=1,this._sx=0,this._cy=0,this._sy=1,this._rotation=0,this.localColor=4294967295,this.layerColor=4294967295,this.localBlendMode="inherit",this.layerBlendMode="normal",this.localVisibleRenderable=3,this.layerVisibleRenderable=3,e.view&&(this.view=e.view,this.view.owner=this,e.view=void 0),Object.assign(this,Qe(e)),this.children=[],(r=e.children)==null||r.forEach(n=>this.addChild(n)),this.effects=[],(i=e.effects)==null||i.forEach(n=>this.addEffect(n))}static mixin(e){Object.defineProperties(Y.prototype,Object.getOwnPropertyDescriptors(e))}addChild(...e){if(this.allowChildren||O(G,"addChild: Only Containers will be allowed to add children in v8.0.0"),e.length>1){for(let i=0;i<e.length;i++)this.addChild(e[i]);return e[0]}const r=e[0];return r.parent===this?(this.children.splice(this.children.indexOf(r),1),this.children.push(r),this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),r):(r.parent&&r.parent.removeChild(r),this.children.push(r),this.sortableChildren&&(this.sortDirty=!0),r.parent=this,r.didChange=!0,r.didViewUpdate=!1,r._updateFlags=15,this.layerGroup&&this.layerGroup.addChild(r),this.emit("childAdded",r,this,this.children.length-1),r.emit("added",this),r._zIndex!==0&&r.depthOfChildModified(),r)}removeChild(...e){if(e.length>1){for(let n=0;n<e.length;n++)this.removeChild(e[n]);return e[0]}const r=e[0],i=this.children.indexOf(r);return i>-1&&(this.children.splice(i,1),this.layerGroup&&this.layerGroup.removeChild(r)),r.parent=null,this.emit("childRemoved",r,this,i),r.emit("removed",this),r}onUpdate(e){if(e&&e===this._skew&&this._updateSkew(),!this.didChange)if(this.didChange=!0,this.isLayerRoot){const r=this.layerGroup.layerGroupParent;r&&r.onChildUpdate(this)}else this.layerGroup&&this.layerGroup.onChildUpdate(this)}onViewUpdate(){this.didViewUpdate||(this.didViewUpdate=!0,this.layerGroup&&this.layerGroup.onChildViewUpdate(this))}set layer(e){if(this.isLayerRoot&&e===!1)throw new Error("[Pixi] cannot undo a layer just yet");e&&this.enableLayer()}get layer(){return this.isLayerRoot}enableLayer(){if(this.layerGroup&&this.layerGroup.root===this)return;this.isLayerRoot=!0;const e=this.layerGroup;if(e&&e.removeChild(this),this.layerGroup=new _l(this),e){for(let r=0;r<e.layerGroupChildren.length;r++){const i=e.layerGroupChildren[r];let n=i.root;for(;n;){if(n===this){this.layerGroup.addLayerGroupChild(i);break}n=n.parent}}e.addLayerGroupChild(this.layerGroup)}this._updateIsSimple()}_updateIsSimple(){this.isSimple=!this.isLayerRoot&&this.effects.length===0}get worldTransform(){return this._worldTransform||(this._worldTransform=new k),this.layerGroup&&(this.isLayerRoot?this._worldTransform.copyFrom(this.layerGroup.worldTransform):this._worldTransform.appendFrom(this.layerTransform,this.layerGroup.worldTransform)),this._worldTransform}get x(){return this._position.x}set x(e){this._position.x=e}get y(){return this._position.y}set y(e){this._position.y=e}get position(){return this._position}set position(e){this._position.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.onUpdate(this._skew))}get angle(){return this.rotation*il}set angle(e){this.rotation=e*nl}get pivot(){return this._pivot===dn&&(this._pivot=new se(this,0,0)),this._pivot}set pivot(e){this._pivot===dn&&(this._pivot=new se(this,0,0)),this._pivot.copyFrom(e)}get skew(){return this._skew===wl&&(this._skew=new se(this,0,0)),this._skew}get scale(){return this._scale===pn&&(this._scale=new se(this,1,1)),this._scale}set scale(e){this._scale===pn&&(this._scale=new se(this,0,0)),this._scale.copyFrom(e)}_updateSkew(){const e=this._rotation,r=this._skew;this._cx=Math.cos(e+r._y),this._sx=Math.sin(e+r._y),this._cy=-Math.sin(e-r._x),this._sy=Math.cos(e-r._x)}set alpha(e){e=e*255|0,e!==(this.localColor>>24&255)&&(this.localColor=this.localColor&16777215|e<<24,this._updateFlags|=zr,this.onUpdate())}get alpha(){return(this.localColor>>24&255)/255}set tint(e){const r=H.shared.setValue(e).toBgrNumber();r!==(this.localColor&16777215)&&(this.localColor=this.localColor&4278190080|r&16777215,this._updateFlags|=zr,this.onUpdate())}get tint(){const e=this.localColor&16777215;return((e&255)<<16)+(e&65280)+(e>>16&255)}set blendMode(e){this.localBlendMode!==e&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=fn,this.localBlendMode=e,this.onUpdate())}get blendMode(){return this.localBlendMode}get visible(){return!!(this.localVisibleRenderable&2)}set visible(e){const r=e?1:0;(this.localVisibleRenderable&2)>>1!==r&&(this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this._updateFlags|=Nr,this.localVisibleRenderable=this.localVisibleRenderable&1|r<<1,this.onUpdate())}get renderable(){return!!(this.localVisibleRenderable&1)}set renderable(e){const r=e?1:0;(this.localVisibleRenderable&1)!==r&&(this.localVisibleRenderable=this.localVisibleRenderable&2|r,this._updateFlags|=Nr,this.layerGroup&&!this.isLayerRoot&&(this.layerGroup.structureDidChange=!0),this.onUpdate())}get isRenderable(){const e=this.layerColor>>24&255;return this.localVisibleRenderable===3&&e>0}destroy(e=!1){if(this.destroyed)return;this.destroyed=!0,this.removeFromParent(),this.parent=null,this._mask=null,this._filters=null,this.effects=null,this._position=null,this._scale=null,this._pivot=null,this._skew=null,this.emit("destroyed"),this.removeAllListeners();const r=typeof e=="boolean"?e:e==null?void 0:e.children,i=this.removeChildren(0,this.children.length);if(r)for(let n=0;n<i.length;++n)i[n].destroy(e);this.view&&(this.view.destroy(e),this.view.owner=null)}}Y.mixin(ol),Y.mixin(xl),Y.mixin(vl),Y.mixin(bl),Y.mixin(pl),Y.mixin(fl),Y.mixin(yl);var gn=/iPhone/i,Tl=/iPod/i,Sl=/iPad/i,Pl=/\biOS-universal(?:.+)Mac\b/i,mn=/\bAndroid(?:.+)Mobile\b/i,Al=/Android/i,_t=/(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,Hr=/Silk/i,Ie=/Windows Phone/i,El=/\bWindows(?:.+)ARM\b/i,Cl=/BlackBerry/i,Ml=/BB10/i,Bl=/Opera Mini/i,Rl=/\b(CriOS|Chrome)(?:.+)Mobile/i,kl=/Mobile(?:.+)Firefox\b/i,Ol=function(t){return typeof t!="undefined"&&t.platform==="MacIntel"&&typeof t.maxTouchPoints=="number"&&t.maxTouchPoints>1&&typeof MSStream=="undefined"};function pm(t){return function(e){return e.test(t)}}function Fl(t){var e={userAgent:"",platform:"",maxTouchPoints:0};!t&&typeof navigator!="undefined"?e={userAgent:navigator.userAgent,platform:navigator.platform,maxTouchPoints:navigator.maxTouchPoints||0}:typeof t=="string"?e.userAgent=t:t&&t.userAgent&&(e={userAgent:t.userAgent,platform:t.platform,maxTouchPoints:t.maxTouchPoints||0});var r=e.userAgent,i=r.split("[FBAN");typeof i[1]!="undefined"&&(r=i[0]),i=r.split("Twitter"),typeof i[1]!="undefined"&&(r=i[0]);var n=pm(r),s={apple:{phone:n(gn)&&!n(Ie),ipod:n(Tl),tablet:!n(gn)&&(n(Sl)||Ol(e))&&!n(Ie),universal:n(Pl),device:(n(gn)||n(Tl)||n(Sl)||n(Pl)||Ol(e))&&!n(Ie)},amazon:{phone:n(_t),tablet:!n(_t)&&n(Hr),device:n(_t)||n(Hr)},android:{phone:!n(Ie)&&n(_t)||!n(Ie)&&n(mn),tablet:!n(Ie)&&!n(_t)&&!n(mn)&&(n(Hr)||n(Al)),device:!n(Ie)&&(n(_t)||n(Hr)||n(mn)||n(Al))||n(/\bokhttp\b/i)},windows:{phone:n(Ie),tablet:n(El),device:n(Ie)||n(El)},other:{blackberry:n(Cl),blackberry10:n(Ml),opera:n(Bl),firefox:n(kl),chrome:n(Rl),device:n(Cl)||n(Ml)||n(Bl)||n(kl)||n(Rl)},any:!1,phone:!1,tablet:!1};return s.any=s.apple.device||s.android.device||s.windows.device||s.other.device,s.phone=s.apple.phone||s.android.phone||s.windows.phone,s.tablet=s.apple.tablet||s.android.tablet||s.windows.tablet,s}var Ul;const fm=(Ul=Fl.default)!=null?Ul:Fl,Il=fm(globalThis.navigator),bn={accessible:!1,accessibleTitle:null,accessibleHint:null,tabIndex:0,_accessibleActive:!1,_accessibleDiv:null,accessibleType:"button",accessiblePointerEvents:"auto",accessibleChildren:!0,renderId:-1};Y.mixin(bn);const gm=9,jr=100,mm=0,bm=0,Gl=2,$l=1,vm=-1e3,ym=-1e3,xm=2;class Jt{constructor(e,r=Il){this._mobileInfo=r,this.debug=!1,this._isActive=!1,this._isMobileAccessibility=!1,this._pool=[],this._renderId=0,this._children=[],this._androidUpdateCount=0,this._androidUpdateFrequency=500,this._hookDiv=null,(r.tablet||r.phone)&&this._createTouchHook();const i=document.createElement("div");i.style.width=`${jr}px`,i.style.height=`${jr}px`,i.style.position="absolute",i.style.top=`${mm}px`,i.style.left=`${bm}px`,i.style.zIndex=Gl.toString(),this._div=i,this._renderer=e,this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),globalThis.addEventListener("keydown",this._onKeyDown,!1)}get isActive(){return this._isActive}get isMobileAccessibility(){return this._isMobileAccessibility}get hookDiv(){return this._hookDiv}_createTouchHook(){const e=document.createElement("button");e.style.width=`${$l}px`,e.style.height=`${$l}px`,e.style.position="absolute",e.style.top=`${vm}px`,e.style.left=`${ym}px`,e.style.zIndex=xm.toString(),e.style.backgroundColor="#FF0000",e.title="select to enable accessibility for this content",e.addEventListener("focus",()=>{this._isMobileAccessibility=!0,this._activate(),this._destroyTouchHook()}),document.body.appendChild(e),this._hookDiv=e}_destroyTouchHook(){this._hookDiv&&(document.body.removeChild(this._hookDiv),this._hookDiv=null)}_activate(){var e;this._isActive||(this._isActive=!0,globalThis.document.addEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown,!1),this._renderer.runners.postrender.add(this),(e=this._renderer.view.canvas.parentNode)==null||e.appendChild(this._div))}_deactivate(){var e;!this._isActive||this._isMobileAccessibility||(this._isActive=!1,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.addEventListener("keydown",this._onKeyDown,!1),this._renderer.runners.postrender.remove(this),(e=this._div.parentNode)==null||e.removeChild(this._div))}_updateAccessibleObjects(e){if(!e.visible||!e.accessibleChildren)return;e.accessible&&e.isInteractive()&&(e._accessibleActive||this._addChild(e),e.renderId=this._renderId);const r=e.children;if(r)for(let i=0;i<r.length;i++)this._updateAccessibleObjects(r[i])}init(e){var r;this.debug=(r=e==null?void 0:e.debug)!=null?r:this.debug,this._renderer.runners.postrender.remove(this)}postrender(){const e=performance.now();if(this._mobileInfo.android.device&&e<this._androidUpdateCount||(this._androidUpdateCount=e+this._androidUpdateFrequency,!this._renderer.renderingToScreen||!this._renderer.view.canvas))return;this._renderer.lastObjectRendered&&this._updateAccessibleObjects(this._renderer.lastObjectRendered);const{x:r,y:i,width:n,height:s}=this._renderer.view.canvas.getBoundingClientRect(),{width:o,height:a,resolution:l}=this._renderer,u=n/o*l,h=s/a*l;let c=this._div;c.style.left=`${r}px`,c.style.top=`${i}px`,c.style.width=`${o}px`,c.style.height=`${a}px`;for(let p=0;p<this._children.length;p++){const d=this._children[p];if(d.renderId!==this._renderId)d._accessibleActive=!1,un(this._children,p,1),this._div.removeChild(d._accessibleDiv),this._pool.push(d._accessibleDiv),d._accessibleDiv=null,p--;else{c=d._accessibleDiv;let f=d.hitArea;const m=d.worldTransform;d.hitArea?(c.style.left=`${(m.tx+f.x*m.a)*u}px`,c.style.top=`${(m.ty+f.y*m.d)*h}px`,c.style.width=`${f.width*m.a*u}px`,c.style.height=`${f.height*m.d*h}px`):(f=d.getBounds(),this.capHitArea(f),c.style.left=`${f.x*u}px`,c.style.top=`${f.y*h}px`,c.style.width=`${f.width*u}px`,c.style.height=`${f.height*h}px`,c.title!==d.accessibleTitle&&d.accessibleTitle!==null&&(c.title=d.accessibleTitle),c.getAttribute("aria-label")!==d.accessibleHint&&d.accessibleHint!==null&&c.setAttribute("aria-label",d.accessibleHint)),(d.accessibleTitle!==c.title||d.tabIndex!==c.tabIndex)&&(c.title=d.accessibleTitle,c.tabIndex=d.tabIndex,this.debug&&this.updateDebugHTML(c))}}this._renderId++}updateDebugHTML(e){e.innerHTML=`type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`}capHitArea(e){e.x<0&&(e.width+=e.x,e.x=0),e.y<0&&(e.height+=e.y,e.y=0);const{width:r,height:i}=this._renderer;e.x+e.width>r&&(e.width=r-e.x),e.y+e.height>i&&(e.height=i-e.y)}_addChild(e){let r=this._pool.pop();r||(r=document.createElement("button"),r.style.width=`${jr}px`,r.style.height=`${jr}px`,r.style.backgroundColor=this.debug?"rgba(255,255,255,0.5)":"transparent",r.style.position="absolute",r.style.zIndex=Gl.toString(),r.style.borderStyle="none",navigator.userAgent.toLowerCase().includes("chrome")?r.setAttribute("aria-live","off"):r.setAttribute("aria-live","polite"),navigator.userAgent.match(/rv:.*Gecko\//)?r.setAttribute("aria-relevant","additions"):r.setAttribute("aria-relevant","text"),r.addEventListener("click",this._onClick.bind(this)),r.addEventListener("focus",this._onFocus.bind(this)),r.addEventListener("focusout",this._onFocusOut.bind(this))),r.style.pointerEvents=e.accessiblePointerEvents,r.type=e.accessibleType,e.accessibleTitle&&e.accessibleTitle!==null?r.title=e.accessibleTitle:(!e.accessibleHint||e.accessibleHint===null)&&(r.title=`container ${e.tabIndex}`),e.accessibleHint&&e.accessibleHint!==null&&r.setAttribute("aria-label",e.accessibleHint),this.debug&&this.updateDebugHTML(r),e._accessibleActive=!0,e._accessibleDiv=r,r.container=e,this._children.push(e),this._div.appendChild(e._accessibleDiv),e._accessibleDiv.tabIndex=e.tabIndex}_dispatchEvent(e,r){const{container:i}=e.target,n=this._renderer.events.rootBoundary,s=Object.assign(new Dt(n),{target:i});n.rootTarget=this._renderer.lastObjectRendered,r.forEach(o=>n.dispatchEvent(s,o))}_onClick(e){this._dispatchEvent(e,["click","pointertap","tap"])}_onFocus(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","assertive"),this._dispatchEvent(e,["mouseover"])}_onFocusOut(e){e.target.getAttribute("aria-live")||e.target.setAttribute("aria-live","polite"),this._dispatchEvent(e,["mouseout"])}_onKeyDown(e){e.keyCode===gm&&this._activate()}_onMouseMove(e){e.movementX===0&&e.movementY===0||this._deactivate()}destroy(){this._destroyTouchHook(),this._div=null,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown),this._pool=null,this._children=null,this._renderer=null}}Jt.extension={type:[b.WebGLSystem,b.WebGPUSystem],name:"accessibility"},V.add(Jt),V.add(Jt),Y.mixin(bn);var Je=(t=>(t[t.INTERACTION=50]="INTERACTION",t[t.HIGH=25]="HIGH",t[t.NORMAL=0]="NORMAL",t[t.LOW=-25]="LOW",t[t.UTILITY=-50]="UTILITY",t))(Je||{});class Wr{constructor(e,r=null,i=0,n=!1){this.next=null,this.previous=null,this._destroyed=!1,this._fn=e,this._context=r,this.priority=i,this._once=n}match(e,r=null){return this._fn===e&&this._context===r}emit(e){this._fn&&(this._context?this._fn.call(this._context,e):this._fn(e));const r=this.next;return this._once&&this.destroy(!0),this._destroyed&&(this.next=null),r}connect(e){this.previous=e,e.next&&(e.next.previous=this),this.next=e.next,e.next=this}destroy(e=!1){this._destroyed=!0,this._fn=null,this._context=null,this.previous&&(this.previous.next=this.next),this.next&&(this.next.previous=this.previous);const r=this.next;return this.next=e?null:r,this.previous=null,r}}const ge=class{constructor(){this.autoStart=!1,this.deltaTime=1,this.lastTime=-1,this.speed=1,this.started=!1,this._requestId=null,this._maxElapsedMS=100,this._minElapsedMS=0,this._protected=!1,this._lastFrame=-1,this._head=new Wr(null,null,1/0),this.deltaMS=1/ge.targetFPMS,this.elapsedMS=1/ge.targetFPMS,this._tick=t=>{this._requestId=null,this.started&&(this.update(t),this.started&&this._requestId===null&&this._head.next&&(this._requestId=requestAnimationFrame(this._tick)))}}_requestIfNeeded(){this._requestId===null&&this._head.next&&(this.lastTime=performance.now(),this._lastFrame=this.lastTime,this._requestId=requestAnimationFrame(this._tick))}_cancelIfNeeded(){this._requestId!==null&&(cancelAnimationFrame(this._requestId),this._requestId=null)}_startIfPossible(){this.started?this._requestIfNeeded():this.autoStart&&this.start()}add(t,e,r=Je.NORMAL){return this._addListener(new Wr(t,e,r))}addOnce(t,e,r=Je.NORMAL){return this._addListener(new Wr(t,e,r,!0))}_addListener(t){let e=this._head.next,r=this._head;if(!e)t.connect(r);else{for(;e;){if(t.priority>e.priority){t.connect(r);break}r=e,e=e.next}t.previous||t.connect(r)}return this._startIfPossible(),this}remove(t,e){let r=this._head.next;for(;r;)r.match(t,e)?r=r.destroy():r=r.next;return this._head.next||this._cancelIfNeeded(),this}get count(){if(!this._head)return 0;let t=0,e=this._head;for(;e=e.next;)t++;return t}start(){this.started||(this.started=!0,this._requestIfNeeded())}stop(){this.started&&(this.started=!1,this._cancelIfNeeded())}destroy(){if(!this._protected){this.stop();let t=this._head.next;for(;t;)t=t.destroy(!0);this._head.destroy(),this._head=null}}update(t=performance.now()){let e;if(t>this.lastTime){if(e=this.elapsedMS=t-this.lastTime,e>this._maxElapsedMS&&(e=this._maxElapsedMS),e*=this.speed,this._minElapsedMS){const n=t-this._lastFrame|0;if(n<this._minElapsedMS)return;this._lastFrame=t-n%this._minElapsedMS}this.deltaMS=e,this.deltaTime=this.deltaMS*ge.targetFPMS;const r=this._head;let i=r.next;for(;i;)i=i.emit(this);r.next||this._cancelIfNeeded()}else this.deltaTime=this.deltaMS=this.elapsedMS=0;this.lastTime=t}get FPS(){return 1e3/this.elapsedMS}get minFPS(){return 1e3/this._maxElapsedMS}set minFPS(t){const e=Math.min(this.maxFPS,t),r=Math.min(Math.max(0,e)/1e3,ge.targetFPMS);this._maxElapsedMS=1/r}get maxFPS(){return this._minElapsedMS?Math.round(1e3/this._minElapsedMS):0}set maxFPS(t){if(t===0)this._minElapsedMS=0;else{const e=Math.max(this.minFPS,t);this._minElapsedMS=1/(e/1e3)}}static get shared(){if(!ge._shared){const t=ge._shared=new ge;t.autoStart=!0,t._protected=!0}return ge._shared}static get system(){if(!ge._system){const t=ge._system=new ge;t.autoStart=!0,t._protected=!0}return ge._system}};let ce=ge;ce.targetFPMS=.06;class vn{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(r){this._ticker&&this._ticker.remove(this.render,this),this._ticker=r,r&&r.add(this.render,this,Je.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?ce.shared:new ce,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}vn.extension=b.Application;class yn{static init(e){Object.defineProperty(this,"resizeTo",{set(r){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=r,r&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let r,i;if(this._resizeTo===globalThis.window)r=globalThis.innerWidth,i=globalThis.innerHeight;else{const{clientWidth:n,clientHeight:s}=this._resizeTo;r=n,i=s}this.renderer.resize(r,i),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}yn.extension=b.Application,V.add(yn),V.add(vn);var Ge=(t=>(t[t.Low=0]="Low",t[t.Normal=1]="Normal",t[t.High=2]="High",t))(Ge||{});const Vr=(t,e)=>{const r=e.split("?")[1];return r&&(t+=`?${r}`),t},Ll={createCanvas:(t,e)=>{const r=document.createElement("canvas");return r.width=t,r.height=e,r},getCanvasRenderingContext2D:()=>CanvasRenderingContext2D,getWebGLRenderingContext:()=>WebGLRenderingContext,getNavigator:()=>navigator,getBaseUrl:()=>{var t;return(t=document.baseURI)!=null?t:window.location.href},getFontFaceSet:()=>document.fonts,fetch:(t,e)=>fetch(t,e),parseXML:t=>new DOMParser().parseFromString(t,"text/xml")};let Dl=Ll;const j={get(){return Dl},set(t){Dl=t}};function Pe(t){if(typeof t!="string")throw new TypeError(`Path must be a string. Received ${JSON.stringify(t)}`)}function er(t){return t.split("?")[0].split("#")[0]}function _m(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function wm(t,e,r){return t.replace(new RegExp(_m(e),"g"),r)}function Tm(t,e){let r="",i=0,n=-1,s=0,o=-1;for(let a=0;a<=t.length;++a){if(a<t.length)o=t.charCodeAt(a);else{if(o===47)break;o=47}if(o===47){if(!(n===a-1||s===1))if(n!==a-1&&s===2){if(r.length<2||i!==2||r.charCodeAt(r.length-1)!==46||r.charCodeAt(r.length-2)!==46){if(r.length>2){const l=r.lastIndexOf("/");if(l!==r.length-1){l===-1?(r="",i=0):(r=r.slice(0,l),i=r.length-1-r.lastIndexOf("/")),n=a,s=0;continue}}else if(r.length===2||r.length===1){r="",i=0,n=a,s=0;continue}}e&&(r.length>0?r+="/..":r="..",i=2)}else r.length>0?r+=`/${t.slice(n+1,a)}`:r=t.slice(n+1,a),i=a-n-1;n=a,s=0}else o===46&&s!==-1?++s:s=-1}return r}const de={toPosix(t){return wm(t,"\\","/")},isUrl(t){return/^https?:/.test(this.toPosix(t))},isDataUrl(t){return/^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(t)},isBlobUrl(t){return t.startsWith("blob:")},hasProtocol(t){return/^[^/:]+:/.test(this.toPosix(t))},getProtocol(t){Pe(t),t=this.toPosix(t);const e=/^file:\/\/\//.exec(t);if(e)return e[0];const r=/^[^/:]+:\/{0,2}/.exec(t);return r?r[0]:""},toAbsolute(t,e,r){if(Pe(t),this.isDataUrl(t)||this.isBlobUrl(t))return t;const i=er(this.toPosix(e!=null?e:j.get().getBaseUrl())),n=er(this.toPosix(r!=null?r:this.rootname(i)));return t=this.toPosix(t),t.startsWith("/")?de.join(n,t.slice(1)):this.isAbsolute(t)?t:this.join(i,t)},normalize(t){if(Pe(t),t.length===0)return".";if(this.isDataUrl(t)||this.isBlobUrl(t))return t;t=this.toPosix(t);let e="";const r=t.startsWith("/");this.hasProtocol(t)&&(e=this.rootname(t),t=t.slice(e.length));const i=t.endsWith("/");return t=Tm(t,!1),t.length>0&&i&&(t+="/"),r?`/${t}`:e+t},isAbsolute(t){return Pe(t),t=this.toPosix(t),this.hasProtocol(t)?!0:t.startsWith("/")},join(...t){var e;if(t.length===0)return".";let r;for(let i=0;i<t.length;++i){const n=t[i];if(Pe(n),n.length>0)if(r===void 0)r=n;else{const s=(e=t[i-1])!=null?e:"";this.extname(s)?r+=`/../${n}`:r+=`/${n}`}}return r===void 0?".":this.normalize(r)},dirname(t){if(Pe(t),t.length===0)return".";t=this.toPosix(t);let e=t.charCodeAt(0);const r=e===47;let i=-1,n=!0;const s=this.getProtocol(t),o=t;t=t.slice(s.length);for(let a=t.length-1;a>=1;--a)if(e=t.charCodeAt(a),e===47){if(!n){i=a;break}}else n=!1;return i===-1?r?"/":this.isUrl(o)?s+t:s:r&&i===1?"//":s+t.slice(0,i)},rootname(t){Pe(t),t=this.toPosix(t);let e="";if(t.startsWith("/")?e="/":e=this.getProtocol(t),this.isUrl(t)){const r=t.indexOf("/",e.length);r!==-1?e=t.slice(0,r):e=t,e.endsWith("/")||(e+="/")}return e},basename(t,e){Pe(t),e&&Pe(e),t=er(this.toPosix(t));let r=0,i=-1,n=!0,s;if(e!==void 0&&e.length>0&&e.length<=t.length){if(e.length===t.length&&e===t)return"";let o=e.length-1,a=-1;for(s=t.length-1;s>=0;--s){const l=t.charCodeAt(s);if(l===47){if(!n){r=s+1;break}}else a===-1&&(n=!1,a=s+1),o>=0&&(l===e.charCodeAt(o)?--o===-1&&(i=s):(o=-1,i=a))}return r===i?i=a:i===-1&&(i=t.length),t.slice(r,i)}for(s=t.length-1;s>=0;--s)if(t.charCodeAt(s)===47){if(!n){r=s+1;break}}else i===-1&&(n=!1,i=s+1);return i===-1?"":t.slice(r,i)},extname(t){Pe(t),t=er(this.toPosix(t));let e=-1,r=0,i=-1,n=!0,s=0;for(let o=t.length-1;o>=0;--o){const a=t.charCodeAt(o);if(a===47){if(!n){r=o+1;break}continue}i===-1&&(n=!1,i=o+1),a===46?e===-1?e=o:s!==1&&(s=1):e!==-1&&(s=-1)}return e===-1||i===-1||s===0||s===1&&e===i-1&&e===r+1?"":t.slice(e,i)},parse(t){Pe(t);const e={root:"",dir:"",base:"",ext:"",name:""};if(t.length===0)return e;t=er(this.toPosix(t));let r=t.charCodeAt(0);const i=this.isAbsolute(t);let n;const s="";e.root=this.rootname(t),i||this.hasProtocol(t)?n=1:n=0;let o=-1,a=0,l=-1,u=!0,h=t.length-1,c=0;for(;h>=n;--h){if(r=t.charCodeAt(h),r===47){if(!u){a=h+1;break}continue}l===-1&&(u=!1,l=h+1),r===46?o===-1?o=h:c!==1&&(c=1):o!==-1&&(c=-1)}return o===-1||l===-1||c===0||c===1&&o===l-1&&o===a+1?l!==-1&&(a===0&&i?e.base=e.name=t.slice(1,l):e.base=e.name=t.slice(a,l)):(a===0&&i?(e.name=t.slice(1,o),e.base=t.slice(1,l)):(e.name=t.slice(a,o),e.base=t.slice(a,l)),e.ext=t.slice(o,l)),e.dir=this.dirname(t),s&&(e.dir=s+e.dir),e},sep:"/",delimiter:":"},ye=(t,e,r=!1)=>(Array.isArray(t)||(t=[t]),e?t.map(i=>typeof i=="string"||r?e(i):i):t);class Sm{constructor(){this._parsers=[],this._cache=new Map,this._cacheMap=new Map}reset(){this._cacheMap.clear(),this._cache.clear()}has(e){return this._cache.has(e)}get(e){return this._cache.get(e)}set(e,r){const i=ye(e);let n;for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];if(u.test(r)){n=u.getCacheableAssets(i,r);break}}const s=new Map(Object.entries(n||{}));n||i.forEach(l=>{s.set(l,r)});const o=[...s.keys()],a={cacheKeys:o,keys:i};i.forEach(l=>{this._cacheMap.set(l,a)}),o.forEach(l=>{this._cache.has(l)&&this._cache.get(l),this._cache.set(l,s.get(l))})}remove(e){if(!this._cacheMap.has(e))return;const r=this._cacheMap.get(e);r.cacheKeys.forEach(i=>{this._cache.delete(i)}),r.keys.forEach(i=>{this._cacheMap.delete(i)})}get parsers(){return this._parsers}}const Z=new Sm,xn=()=>{},_n=[];V.handleByList(b.TextureSource,_n);function zl(t={}){for(let e=0;e<_n.length;e++){const r=_n[e];if(r.test(t.resource))return new r(t)}throw new Error(`Could not find a source type for resource: ${t.resource}`)}function Nl(t={},e=!1){const{resource:r}=t;if(!e&&Z.has(r))return Z.get(r);const i=new A({source:zl(t)});return i.on("destroy",()=>{Z.has(r)&&Z.remove(r)}),e||Z.set(r,i),i}const wn=Object.create(null),Hl=Object.create(null);function Yr(t,e){let r=Hl[t];return r===void 0&&(wn[e]===void 0&&(wn[e]=1),Hl[t]=r=wn[e]++),r}var Pm=Object.defineProperty,jl=Object.getOwnPropertySymbols,Am=Object.prototype.hasOwnProperty,Em=Object.prototype.propertyIsEnumerable,Wl=(t,e,r)=>e in t?Pm(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Vl=(t,e)=>{for(var r in e||(e={}))Am.call(e,r)&&Wl(t,r,e[r]);if(jl)for(var r of jl(e))Em.call(e,r)&&Wl(t,r,e[r]);return t};const Yl=class extends ue{constructor(t={}){var e,r,i,n,s,o,a;super(),this.resourceType="textureSampler",this.touched=0,this._maxAnisotropy=1,t=Vl(Vl({},Yl.defaultOptions),t),this.addressMode=t.addressMode,this.addressModeU=(e=t.addressModeU)!=null?e:this.addressModeU,this.addressModeV=(r=t.addressModeV)!=null?r:this.addressModeV,this.addressModeW=(i=t.addressModeW)!=null?i:this.addressModeW,this.scaleMode=t.scaleMode,this.magFilter=(n=t.magFilter)!=null?n:this.magFilter,this.minFilter=(s=t.minFilter)!=null?s:this.minFilter,this.mipmapFilter=(o=t.mipmapFilter)!=null?o:this.mipmapFilter,this.lodMinClamp=t.lodMinClamp,this.lodMaxClamp=t.lodMaxClamp,this.compare=t.compare,this.maxAnisotropy=(a=t.maxAnisotropy)!=null?a:1}set addressMode(t){this.addressModeU=t,this.addressModeV=t,this.addressModeW=t}get addressMode(){return this.addressModeU}set wrapMode(t){O("8","TextureStyle.wrapMode is now TextureStyle.addressMode"),this.addressMode=t}get wrapMode(){return this.addressMode}set scaleMode(t){this.magFilter=t,this.minFilter=t,this.mipmapFilter=t}get scaleMode(){return this.magFilter}set maxAnisotropy(t){this._maxAnisotropy=Math.min(t,16),this._maxAnisotropy>1&&(this.scaleMode="linear")}get maxAnisotropy(){return this._maxAnisotropy}get resourceId(){return this._resourceId||this._generateResourceId()}update(){this.emit("change",this),this._resourceId=null}_generateResourceId(){const t=`${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;return this._resourceId=Yr(t,"sampler"),this._resourceId}destroy(){this.emit("destroy",this),this.removeAllListeners()}};let tr=Yl;tr.defaultOptions={addressMode:"clamp-to-edge",scaleMode:"linear"};var Cm=Object.defineProperty,Xl=Object.getOwnPropertySymbols,Mm=Object.prototype.hasOwnProperty,Bm=Object.prototype.propertyIsEnumerable,ql=(t,e,r)=>e in t?Cm(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Kl=(t,e)=>{for(var r in e||(e={}))Mm.call(e,r)&&ql(t,r,e[r]);if(Xl)for(var r of Xl(e))Bm.call(e,r)&&ql(t,r,e[r]);return t};const Zl=class extends ue{constructor(t={}){var e,r,i,n,s;super(),this.options=t,this.uid=q("textureSource"),this.resourceType="textureSource",this.resourceId=q("textureResource"),this.uploadMethodId="unknown",this._resolution=1,this.pixelWidth=1,this.pixelHeight=1,this.width=1,this.height=1,this.sampleCount=1,this.mipLevelCount=1,this.autoGenerateMipmaps=!1,this.format="rgba8unorm-srgb",this.dimension="2d",this.antialias=!1,this.depthStencil=!0,this.touched=0,this._batchTick=-1,this._textureBindLocation=-1,t=Kl(Kl({},Zl.defaultOptions),t),this.resource=t.resource,this._resolution=t.resolution,t.width?this.pixelWidth=t.width*this._resolution:this.pixelWidth=(r=(e=t.resource)==null?void 0:e.width)!=null?r:1,t.height?this.pixelHeight=t.height*this._resolution:this.pixelHeight=(n=(i=t.resource)==null?void 0:i.height)!=null?n:1,this.width=this.pixelWidth/this._resolution,this.height=this.pixelHeight/this._resolution,this.format=t.format,this.dimension=t.dimensions,this.mipLevelCount=t.mipLevelCount,this.autoGenerateMipmaps=t.autoGenerateMipmaps,this.sampleCount=t.sampleCount,this.antialias=t.antialias,this.alphaMode=t.alphaMode;const o=(s=t.style)!=null?s:{};this.style=o instanceof tr?o:new tr(o),this.destroyed=!1}get source(){return this}get style(){return this._style}set style(t){var e,r;this.style!==t&&((e=this._style)==null||e.off("change",this._onStyleChange,this),this._style=t,(r=this._style)==null||r.on("change",this._onStyleChange,this),this._onStyleChange())}_onStyleChange(){this.emit("styleChange",this)}update(){this.emit("update",this)}destroy(){this.destroyed=!0,this.emit("destroy",this),this._style&&(this._style.destroy(),this._style=null),this.uploadMethodId=null,this.resource=null,this.removeAllListeners()}unload(){this.resourceId++,this.emit("change",this),this.emit("unload",this)}get resourceWidth(){const{resource:t}=this;return t.naturalWidth||t.videoWidth||t.displayWidth||t.width}get resourceHeight(){const{resource:t}=this;return t.naturalHeight||t.videoHeight||t.displayHeight||t.height}get resolution(){return this._resolution}set resolution(t){this._resolution!==t&&(this._resolution=t,this.width=this.pixelWidth/t,this.height=this.pixelHeight/t)}resize(t,e,r){r=r||this._resolution,t=t||this.width,e=e||this.height;const i=Math.round(t*r),n=Math.round(e*r);this.width=i/r,this.height=n/r,this._resolution=r,!(this.pixelWidth===i&&this.pixelHeight===n)&&(this.pixelWidth=i,this.pixelHeight=n,this.emit("resize",this),this.resourceId++,this.emit("change",this))}set wrapMode(t){O(G,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this._style.wrapMode=t}get wrapMode(){return O(G,"TextureSource.wrapMode property has been deprecated. Use TextureSource.style.addressMode instead."),this._style.wrapMode}set scaleMode(t){O(G,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this._style.scaleMode=t}get scaleMode(){return O(G,"TextureSource.scaleMode property has been deprecated. Use TextureSource.style.scaleMode instead."),this._style.scaleMode}static test(t){throw new Error("Unimplemented")}};let he=Zl;he.defaultOptions={resolution:1,format:"bgra8unorm",alphaMode:"no-premultiply-alpha",dimensions:"2d",mipLevelCount:1,autoGenerateMipmaps:!1,sampleCount:1,antialias:!1,style:{}};const et=[1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1,0,1],tt=[0,1,1,1,0,-1,-1,-1,0,1,1,1,0,-1,-1,-1],rt=[0,-1,-1,-1,0,1,1,1,0,1,1,1,0,-1,-1,-1],it=[1,1,0,-1,-1,-1,0,1,-1,-1,0,1,1,1,0,-1],Tn=[],Ql=[],Xr=Math.sign;function Rm(){for(let t=0;t<16;t++){const e=[];Tn.push(e);for(let r=0;r<16;r++){const i=Xr(et[t]*et[r]+rt[t]*tt[r]),n=Xr(tt[t]*et[r]+it[t]*tt[r]),s=Xr(et[t]*rt[r]+rt[t]*it[r]),o=Xr(tt[t]*rt[r]+it[t]*it[r]);for(let a=0;a<16;a++)if(et[a]===i&&tt[a]===n&&rt[a]===s&&it[a]===o){e.push(a);break}}}for(let t=0;t<16;t++){const e=new k;e.set(et[t],tt[t],rt[t],it[t],0,0),Ql.push(e)}}Rm();const I={E:0,SE:1,S:2,SW:3,W:4,NW:5,N:6,NE:7,MIRROR_VERTICAL:8,MAIN_DIAGONAL:10,MIRROR_HORIZONTAL:12,REVERSE_DIAGONAL:14,uX:t=>et[t],uY:t=>tt[t],vX:t=>rt[t],vY:t=>it[t],inv:t=>t&8?t&15:-t&7,add:(t,e)=>Tn[t][e],sub:(t,e)=>Tn[t][I.inv(e)],rotate180:t=>t^4,isVertical:t=>(t&3)===2,byDirection:(t,e)=>Math.abs(t)*2<=Math.abs(e)?e>=0?I.S:I.N:Math.abs(e)*2<=Math.abs(t)?t>0?I.E:I.W:e>0?t>0?I.SE:I.SW:t>0?I.NE:I.NW,matrixAppendRotationInv:(t,e,r=0,i=0)=>{const n=Ql[I.inv(e)];n.tx=r,n.ty=i,t.append(n)}};class Sn extends ue{constructor(e={}){var r;super(),this.uvs={x0:0,y0:0,x1:0,y1:0,x2:0,y2:0,x3:0,y3:0},this.frame=e.frame||new Q(0,0,1,1),this.orig=e.orig||this.frame,this.rotate=(r=e.rotate)!=null?r:0,this.trim=e.trim,this.defaultAnchor=e.defaultAnchor,this.defaultBorders=e.defaultBorders,this.updateUvs()}updateUvs(){const e=this.uvs,r=this.frame;let i=this.rotate;if(i){const n=r.width/2,s=r.height/2,o=r.x+n,a=r.y+s;i=I.add(i,I.NW),e.x0=o+n*I.uX(i),e.y0=a+s*I.uY(i),i=I.add(i,2),e.x1=o+n*I.uX(i),e.y1=a+s*I.uY(i),i=I.add(i,2),e.x2=o+n*I.uX(i),e.y2=a+s*I.uY(i),i=I.add(i,2),e.x3=o+n*I.uX(i),e.y3=a+s*I.uY(i)}else e.x0=r.x,e.y0=r.y,e.x1=r.x+r.width,e.y1=r.y,e.x2=r.x+r.width,e.y2=r.y+r.height,e.x3=r.x,e.y3=r.y+r.height}update(){this.updateUvs(),this.emit("update",this)}destroy(){this.emit("destroy",this),this.removeAllListeners(),this.frame=null,this.orig=null,this.trim=null,this.defaultAnchor=null,this.uvs=null}}const Jl=new k;class Pn{constructor(e,r){this.mapCoord=new k,this.uClampFrame=new Float32Array(4),this.uClampOffset=new Float32Array(2),this._textureID=-1,this._updateID=0,this.clampOffset=0,this.clampMargin=typeof r=="undefined"?.5:r,this.isSimple=!1,this.texture=e}get texture(){return this._texture}set texture(e){var r;this.texture!==e&&((r=this._texture)==null||r.removeListener("update",this.update,this),this._texture=e,this._texture.addListener("update",this.update,this),this.update())}multiplyUvs(e,r){r===void 0&&(r=e);const i=this.mapCoord;for(let n=0;n<e.length;n+=2){const s=e[n],o=e[n+1];r[n]=s*i.a+o*i.c+i.tx,r[n+1]=s*i.b+o*i.d+i.ty}return r}update(){const e=this._texture;this._updateID++;const r=e.layout.uvs;this.mapCoord.set(r.x1-r.x0,r.y1-r.y0,r.x3-r.x0,r.y3-r.y0,r.x0,r.y0);const i=e.layout.orig,n=e.layout.trim;n&&(Jl.set(i.width/n.width,0,0,i.height/n.height,-n.x/n.width,-n.y/n.height),this.mapCoord.append(Jl));const s=e.source,o=this.uClampFrame,a=this.clampMargin/s._resolution,l=this.clampOffset;return o[0]=(e.frameX+a+l)/s.width,o[1]=(e.frameY+a+l)/s.height,o[2]=(e.frameX+e.frameWidth-a+l)/s.width,o[3]=(e.frameY+e.frameHeight-a+l)/s.height,this.uClampOffset[0]=l/s.pixelWidth,this.uClampOffset[1]=l/s.pixelHeight,this.isSimple=e.frameWidth===s.width&&e.frameHeight===s.height&&e.layout.rotate===0,!0}}class A extends ue{constructor({source:e,layout:r,label:i,frame:n}={}){var s;if(super(),this.id=q("texture"),this.styleSourceKey=0,this.label=i,this.source=(s=e==null?void 0:e.source)!=null?s:new he,r=r instanceof Sn?r:new Sn(r),n){const{width:o,height:a}=this._source;r.frame.x=n.x/o,r.frame.y=n.y/a,r.frame.width=n.width/o,r.frame.height=n.height/a,r.updateUvs()}this.layout=r,this.destroyed=!1}static from(e,r=!1){return typeof e=="string"?Z.get(e):e instanceof he?new A({source:e}):Nl(e,r)}set source(e){this._source&&this._source.off("resize",this.onUpdate,this),this._source=e,e.on("resize",this.onUpdate,this),this.emit("update",this)}get source(){return this._source}get layout(){return this._layout}set layout(e){var r;(r=this._layout)==null||r.off("update",this.onUpdate,this),this._layout=e,e.on("update",this.onUpdate,this),this.emit("update",this)}get textureMatrix(){return this._textureMatrix||(this._textureMatrix=new Pn(this)),this._textureMatrix}set frameWidth(e){this._layout.frame.width=e/this._source.width}get frameWidth(){return this._source.pixelWidth/this._source._resolution*this._layout.frame.width}set frameHeight(e){this._layout.frame.height=e/this._source.height}get frameHeight(){return this._source.pixelHeight/this._source._resolution*this._layout.frame.height}set frameX(e){if(e===0){this._layout.frame.x=0;return}this._layout.frame.x=this._source.width/e}get frameX(){return this._source.width*this._layout.frame.x}set frameY(e){if(e===0){this._layout.frame.y=0;return}this._layout.frame.y=this._source.height/e}get frameY(){return this._source.height*this._layout.frame.y}get width(){return this._source.width*this._layout.orig.width}get height(){return this._source.height*this._layout.orig.height}destroy(e=!1){this._layout&&(this._layout.destroy(),this._layout=null),this._source&&e&&(this._source.destroy(),this._source=null),this._textureMatrix=null,this.destroyed=!0,this.emit("destroy",this),this.removeAllListeners()}onUpdate(){this.emit("update",this)}get baseTexture(){return O(G,"Texture.baseTexture is now Texture.source"),this._source}}A.EMPTY=new A({}),A.EMPTY.label="EMPTY",A.EMPTY.destroy=xn;class An extends ue{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return O(G,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return O(G,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return O(G,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return O(G,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return O(G,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(){this.emit("destroy",this),this.removeAllListeners();for(const e in this.chars)this.chars[e].texture.destroy();this.chars=null}}class qr extends An{constructor(e){var r;super();const{textures:i,data:n}=e;Object.keys(n.pages).forEach(o=>{const a=n.pages[parseInt(o,10)],l=i[a.id];this.pages.push({texture:l})}),Object.keys(n.chars).forEach(o=>{var a;const l=n.chars[o],u=i[l.page].source,h=new Q(l.x/u.width,l.y/u.height,l.width/u.width,l.height/u.height),c=new A({source:u,layout:{frame:h}});this.chars[o]={id:o.codePointAt(0),xOffset:l.xOffset,yOffset:l.yOffset,xAdvance:l.xAdvance,kerning:(a=l.kerning)!=null?a:{},texture:c}}),this.baseRenderedFontSize=n.fontSize;const s=this;s.baseMeasurementFontSize=n.fontSize,s.fontMetrics={ascent:0,descent:0,fontSize:n.fontSize},s.baseLineOffset=n.baseLineOffset,s.lineHeight=n.lineHeight,s.fontFamily=n.fontFamily,s.distanceField=(r=n.distanceField)!=null?r:{type:"none",range:0}}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{texture:r}=this.pages[e];r.destroy(!0)}this.pages=null}}const Kr={test(t){return typeof t=="string"&&t.startsWith("info face=")},parse(t){var e,r;const i=t.match(/^[a-z]+\s+.+$/gm),n={info:[],common:[],page:[],char:[],chars:[],kerning:[],kernings:[],distanceField:[]};for(const d in i){const f=i[d].match(/^[a-z]+/gm)[0],m=i[d].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),g={};for(const x in m){const v=m[x].split("="),y=v[0],_=v[1].replace(/"/gm,""),P=parseFloat(_),C=isNaN(P)?_:P;g[y]=C}n[f].push(g)}const s={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},[o]=n.info,[a]=n.common,[l]=(e=n.distanceField)!=null?e:[];l&&(s.distanceField={range:parseInt(l.distanceRange,10),type:l.fieldType}),s.fontSize=parseInt(o.size,10),s.fontFamily=o.face,s.lineHeight=parseInt(a.lineHeight,10);const u=n.page;for(let d=0;d<u.length;d++)s.pages.push({id:parseInt(u[d].id,10)||0,file:u[d].file});const h={};s.baseLineOffset=s.lineHeight-parseInt(a.base,10);const c=n.char;for(let d=0;d<c.length;d++){const f=c[d],m=parseInt(f.id,10);let g=(r=f.letter)!=null?r:f.char;g==="space"&&(g=" "),h[m]=g,s.chars[g]={id:m,page:parseInt(f.page,10)||0,x:parseInt(f.x,10),y:parseInt(f.y,10),width:parseInt(f.width,10),height:parseInt(f.height,10),xOffset:parseInt(f.xoffset,10),yOffset:parseInt(f.yoffset,10),xAdvance:parseInt(f.xadvance,10),kerning:{}}}const p=n.kerning||[];for(let d=0;d<p.length;d++){const f=parseInt(p[d].first,10),m=parseInt(p[d].second,10),g=parseInt(p[d].amount,10);s.chars[h[m]].kerning[h[f]]=g}return s}},En={test(t){const e=t;return typeof e!="string"&&"getElementsByTagName"in e&&e.getElementsByTagName("page").length&&e.getElementsByTagName("info")[0].getAttribute("face")!==null},parse(t){var e;const r={chars:{},pages:[],lineHeight:0,fontSize:0,fontFamily:"",distanceField:null,baseLineOffset:0},i=t.getElementsByTagName("info")[0],n=t.getElementsByTagName("common")[0],s=t.getElementsByTagName("distanceField")[0];s&&(r.distanceField={type:s.getAttribute("fieldType"),range:parseInt(s.getAttribute("distanceRange"),10)});const o=t.getElementsByTagName("page"),a=t.getElementsByTagName("char"),l=t.getElementsByTagName("kerning");r.fontSize=parseInt(i.getAttribute("size"),10),r.fontFamily=i.getAttribute("face"),r.lineHeight=parseInt(n.getAttribute("lineHeight"),10);for(let h=0;h<o.length;h++)r.pages.push({id:parseInt(o[h].getAttribute("id"),10)||0,file:o[h].getAttribute("file")});const u={};r.baseLineOffset=r.lineHeight-parseInt(n.getAttribute("base"),10);for(let h=0;h<a.length;h++){const c=a[h],p=parseInt(c.getAttribute("id"),10);let d=(e=c.getAttribute("letter"))!=null?e:c.getAttribute("char");d==="space"&&(d=" "),u[p]=d,r.chars[d]={id:p,page:parseInt(c.getAttribute("page"),10)||0,x:parseInt(c.getAttribute("x"),10),y:parseInt(c.getAttribute("y"),10),width:parseInt(c.getAttribute("width"),10),height:parseInt(c.getAttribute("height"),10),xOffset:parseInt(c.getAttribute("xoffset"),10),yOffset:parseInt(c.getAttribute("yoffset"),10),xAdvance:parseInt(c.getAttribute("xadvance"),10),kerning:{}}}for(let h=0;h<l.length;h++){const c=parseInt(l[h].getAttribute("first"),10),p=parseInt(l[h].getAttribute("second"),10),d=parseInt(l[h].getAttribute("amount"),10);r.chars[u[p]].kerning[u[c]]=d}return r}},Cn={test(t){return typeof t=="string"&&t.includes("<font>")?En.test(j.get().parseXML(t)):!1},parse(t){return En.parse(j.get().parseXML(t))}},km=[".xml",".fnt"],eu={extension:b.CacheParser,test:t=>t instanceof qr,getCacheableAssets(t,e){const r={};return t.forEach(i=>{r[i]=e}),r[e.fontFamily]=e,r}},tu={extension:{type:b.LoadParser,priority:Ge.Normal},test(t){return km.includes(de.extname(t).toLowerCase())},async testParse(t){return Kr.test(t)||Cn.test(t)},async parse(t,e,r){const i=Kr.test(t)?Kr.parse(t):Cn.parse(t),{src:n}=e,{pages:s}=i,o=[];for(let u=0;u<s.length;++u){const h=s[u].file;let c=de.join(de.dirname(n),h);c=Vr(c,n),o.push(c)}const a=await r.load(o),l=o.map(u=>a[u]);return new qr({data:i,textures:l})},async load(t,e){return await(await j.get().fetch(t)).text()},unload(t){t.destroy()}},ru={extension:b.CacheParser,test:t=>Array.isArray(t)&&t.every(e=>e instanceof A),getCacheableAssets:(t,e)=>{const r={};return t.forEach(i=>{e.forEach((n,s)=>{r[i+(s===0?"":s+1)]=n})}),r}};async function Mn(t){if("Image"in globalThis)return new Promise(e=>{const r=new Image;r.onload=()=>{e(!0)},r.onerror=()=>{e(!1)},r.src=t});if("createImageBitmap"in globalThis&&"fetch"in globalThis){try{const e=await(await fetch(t)).blob();await createImageBitmap(e)}catch(e){return!1}return!0}return!1}const iu={extension:{type:b.DetectionParser,priority:1},test:async()=>Mn("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),add:async t=>[...t,"avif"],remove:async t=>t.filter(e=>e!=="avif")},nu=["png","jpg","jpeg"],su={extension:{type:b.DetectionParser,priority:-1},test:()=>Promise.resolve(!0),add:async t=>[...t,...nu],remove:async t=>t.filter(e=>!nu.includes(e))},Om="WorkerGlobalScope"in globalThis&&globalThis instanceof globalThis.WorkerGlobalScope;function Zr(t){return Om?!1:document.createElement("video").canPlayType(t)!==""}const ou={extension:{type:b.DetectionParser,priority:0},test:async()=>Zr("video/mp4"),add:async t=>[...t,"mp4","m4v"],remove:async t=>t.filter(e=>e!=="mp4"&&e!=="m4v")},au={extension:{type:b.DetectionParser,priority:0},test:async()=>Zr("video/ogg"),add:async t=>[...t,"ogv"],remove:async t=>t.filter(e=>e!=="ogv")},lu={extension:{type:b.DetectionParser,priority:0},test:async()=>Zr("video/webm"),add:async t=>[...t,"webm"],remove:async t=>t.filter(e=>e!=="webm")},uu={extension:{type:b.DetectionParser,priority:0},test:async()=>Mn("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),add:async t=>[...t,"webp"],remove:async t=>t.filter(e=>e!=="webp")};function nt(t,e){if(Array.isArray(e)){for(const r of e)if(t.startsWith(`data:${r}`))return!0;return!1}return t.startsWith(`data:${e}`)}function st(t,e){const r=t.split("?")[0],i=de.extname(r).toLowerCase();return Array.isArray(e)?e.includes(i):i===e}const Fm=".json",Um="application/json",hu={extension:{type:b.LoadParser,priority:Ge.Low},name:"loadJson",test(t){return nt(t,Um)||st(t,Fm)},async load(t){return await(await j.get().fetch(t)).json()}},Im=".txt",Gm="text/plain",cu={name:"loadTxt",extension:{type:b.LoadParser,priority:Ge.Low},test(t){return nt(t,Gm)||st(t,Im)},async load(t){return await(await j.get().fetch(t)).text()}};var $m=Object.defineProperty,Lm=Object.defineProperties,Dm=Object.getOwnPropertyDescriptors,du=Object.getOwnPropertySymbols,zm=Object.prototype.hasOwnProperty,Nm=Object.prototype.propertyIsEnumerable,pu=(t,e,r)=>e in t?$m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Hm=(t,e)=>{for(var r in e||(e={}))zm.call(e,r)&&pu(t,r,e[r]);if(du)for(var r of du(e))Nm.call(e,r)&&pu(t,r,e[r]);return t},jm=(t,e)=>Lm(t,Dm(e));const Wm=["normal","bold","100","200","300","400","500","600","700","800","900"],Vm=[".ttf",".otf",".woff",".woff2"],Ym=["font/ttf","font/otf","font/woff","font/woff2"],Xm=/^(--|-?[A-Z_])[0-9A-Z_-]*$/i;function fu(t){const e=de.extname(t),r=de.basename(t,e).replace(/(-|_)/g," ").toLowerCase().split(" ").map(s=>s.charAt(0).toUpperCase()+s.slice(1));let i=r.length>0;for(const s of r)if(!s.match(Xm)){i=!1;break}let n=r.join(" ");return i||(n=`"${n.replace(/[\\"]/g,"\\$&")}"`),n}const qm=/^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;function Km(t){return qm.test(t)?t:encodeURI(t)}const gu={extension:{type:b.LoadParser,priority:Ge.Low},name:"loadWebFont",test(t){return nt(t,Ym)||st(t,Vm)},async load(t,e){var r,i,n,s,o,a;const l=j.get().getFontFaceSet();if(l){const u=[],h=(i=(r=e.data)==null?void 0:r.family)!=null?i:fu(t),c=(o=(s=(n=e.data)==null?void 0:n.weights)==null?void 0:s.filter(d=>Wm.includes(d)))!=null?o:["normal"],p=(a=e.data)!=null?a:{};for(let d=0;d<c.length;d++){const f=c[d],m=new FontFace(h,`url(${Km(t)})`,jm(Hm({},p),{weight:f}));await m.load(),l.add(m),u.push(m)}return Z.set(h,{url:t,fontFaces:u}),u.length===1?u[0]:u}return null},unload(t){(Array.isArray(t)?t:[t]).forEach(e=>{Z.remove(e.family),j.get().getFontFaceSet().delete(e)})}},Zm={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0};function mu(t,e){var r;const i=t.match(/[a-df-z][^a-df-z]*/gi),n=(r=t.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:r.map(parseFloat),s=[];i.forEach(u=>{var h;const c=(h=u.match(/[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?/g))==null?void 0:h.map(parseFloat),p=u[0];let d=1;c&&(d=c.length/Zm[p.toLowerCase()]);for(let f=0;f<d;f++)s.push(p)});let o=0,a=0,l=0;for(let u=0;u<s.length;u++)switch(s[u]){case"M":a=n[o++],l=n[o++],e.moveTo(a,l);break;case"m":a+=n[o++],l+=n[o++],e.moveTo(a,l);break;case"H":a=n[o++],e.lineTo(a,l);break;case"h":a+=n[o++],e.lineTo(a,l);break;case"V":l=n[o++],e.lineTo(a,l);break;case"v":l+=n[o++],e.lineTo(a,l);break;case"L":a=n[o++],l=n[o++],e.lineTo(a,l);break;case"l":a+=n[o++],l+=n[o++],e.lineTo(a,l);break;case"C":a=n[o+4],l=n[o+5],e.bezierCurveTo(n[o],n[o+1],n[o+2],n[o+3],a,l),o+=6;break;case"c":e.bezierCurveTo(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3],a+n[o+4],l+n[o+5]),a+=n[o+4],l+=n[o+5],o+=6;break;case"S":a=n[o+2],l=n[o+3],e.bezierCurveToShort(n[o],n[o+1],a,l),o+=4;break;case"s":e.bezierCurveToShort(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3]),a+=n[o+2],l+=n[o+3],o+=4;break;case"Q":a=n[o+2],l=n[o+3],e.quadraticCurveTo(n[o],n[o+1],a,l),o+=4;break;case"q":e.quadraticCurveTo(a+n[o],l+n[o+1],a+n[o+2],l+n[o+3]),a+=n[o+2],l+=n[o+3],o+=4;break;case"T":a=n[o++],l=n[o++],e.quadraticCurveToShort(a,l);break;case"t":a+=n[o++],l+=n[o++],e.quadraticCurveToShort(a,l);break;case"A":a=n[o+5],l=n[o+6],e.arcToSvg(n[o],n[o+1],n[o+2],n[o+3],n[o+4],a,l),o+=7;break;case"a":a+=n[o+5],l+=n[o+6],e.arcToSvg(n[o],n[o+1],n[o+2],n[o+3],n[o+4],a,l),o+=7;break;case"Z":case"z":e.closePath();break;default:}return e}class Ki{constructor(e=0,r=0,i=0){this.type="circle",this.x=e,this.y=r,this.radius=i}clone(){return new Ki(this.x,this.y,this.radius)}contains(e,r){if(this.radius<=0)return!1;const i=this.radius*this.radius;let n=this.x-e,s=this.y-r;return n*=n,s*=s,n+s<=i}getBounds(e){return e=e||new Q,e.x=this.x-this.radius,e.y=this.y-this.radius,e.width=this.radius*2,e.height=this.radius*2,e}copyFrom(e){return this.x=e.x,this.y=e.y,this.radius=e.radius,this}copyTo(e){return e.copyFrom(this),e}}class Zi{constructor(e=0,r=0,i=0,n=0){this.type="ellipse",this.x=e,this.y=r,this.halfWidth=i,this.halfHeight=n}clone(){return new Zi(this.x,this.y,this.halfWidth,this.halfHeight)}contains(e,r){if(this.halfWidth<=0||this.halfHeight<=0)return!1;let i=(e-this.x)/this.halfWidth,n=(r-this.y)/this.halfHeight;return i*=i,n*=n,i+n<=1}getBounds(){return new Q(this.x-this.halfWidth,this.y-this.halfHeight,this.halfWidth*2,this.halfHeight*2)}copyFrom(e){return this.x=e.x,this.y=e.y,this.halfWidth=e.halfWidth,this.halfHeight=e.halfHeight,this}copyTo(e){return e.copyFrom(this),e}}class yt{constructor(...e){this.type="polygon";let r=Array.isArray(e[0])?e[0]:e;if(typeof r[0]!="number"){const i=[];for(let n=0,s=r.length;n<s;n++)i.push(r[n].x,r[n].y);r=i}this.points=r,this.closePath=!0}clone(){const e=this.points.slice(),r=new yt(e);return r.closePath=this.closePath,r}contains(e,r){let i=!1;const n=this.points.length/2;for(let s=0,o=n-1;s<n;o=s++){const a=this.points[s*2],l=this.points[s*2+1],u=this.points[o*2],h=this.points[o*2+1];l>r!=h>r&&e<(u-a)*((r-l)/(h-l))+a&&(i=!i)}return i}getBounds(e){e=e||new Q;const r=this.points;let i=1/0,n=-1/0,s=1/0,o=-1/0;for(let a=0,l=r.length;a<l;a+=2){const u=r[a],h=r[a+1];i=u<i?u:i,n=u>n?u:n,s=h<s?h:s,o=h>o?h:o}return e.x=i,e.width=n-i,e.y=s,e.height=o-s,e}copyFrom(e){return this.points=e.points.slice(),this.closePath=e.closePath,this}copyTo(e){return e.copyFrom(this),e}get lastX(){return this.points[this.points.length-2]}get lastY(){return this.points[this.points.length-1]}get x(){return this.points[this.points.length-2]}get y(){return this.points[this.points.length-1]}}class Qi{constructor(e=0,r=0,i=0,n=0,s=20){this.type="roundedRectangle",this.x=e,this.y=r,this.width=i,this.height=n,this.radius=s}getBounds(e){return e=e||new Q,e.x=this.x,e.y=this.y,e.width=this.width,e.height=this.height,e}clone(){return new Qi(this.x,this.y,this.width,this.height,this.radius)}copyFrom(e){return this.x=e.x,this.y=e.y,this.width=e.width,this.height=e.height,this}copyTo(e){return e.copyFrom(this),e}contains(e,r){if(this.width<=0||this.height<=0)return!1;if(e>=this.x&&e<=this.x+this.width&&r>=this.y&&r<=this.y+this.height){const i=Math.max(0,Math.min(this.radius,Math.min(this.width,this.height)/2));if(r>=this.y+i&&r<=this.y+this.height-i||e>=this.x+i&&e<=this.x+this.width-i)return!0;let n=e-(this.x+i),s=r-(this.y+i);const o=i*i;if(n*n+s*s<=o||(n=e-(this.x+this.width-i),n*n+s*s<=o)||(s=r-(this.y+this.height-i),n*n+s*s<=o)||(n=e-(this.x+i),n*n+s*s<=o))return!0}return!1}}const x1=8,Qr=11920929e-14,Qm=1,Bn=.01,wt=0,ot=0;function Rn(t,e,r,i,n,s,o,a,l){let u=Qm/1;return u*=u,Jm(e,r,i,n,s,o,a,l,t,u),t}function Jm(t,e,r,i,n,s,o,a,l,u){kn(t,e,r,i,n,s,o,a,l,u,0),l.push(o,a)}function kn(t,e,r,i,n,s,o,a,l,u,h){if(h>8)return;const c=Math.PI,p=(t+r)/2,d=(e+i)/2,f=(r+n)/2,m=(i+s)/2,g=(n+o)/2,x=(s+a)/2,v=(p+f)/2,y=(d+m)/2,_=(f+g)/2,P=(m+x)/2,C=(v+_)/2,B=(y+P)/2;if(h>0){let S=o-t,w=a-e;const T=Math.abs((r-o)*w-(i-a)*S),L=Math.abs((n-o)*w-(s-a)*S);let $,R;if(T>Qr&&L>Qr){if((T+L)*(T+L)<=u*(S*S+w*w)){if(wt<Bn){l.push(C,B);return}const E=Math.atan2(s-i,n-r);if($=Math.abs(E-Math.atan2(i-e,r-t)),R=Math.abs(Math.atan2(a-s,o-n)-E),$>=c&&($=2*c-$),R>=c&&(R=2*c-R),$+R<wt){l.push(C,B);return}if(ot!==0){if($>ot){l.push(r,i);return}if(R>ot){l.push(n,s);return}}}}else if(T>Qr){if(T*T<=u*(S*S+w*w)){if(wt<Bn){l.push(C,B);return}if($=Math.abs(Math.atan2(s-i,n-r)-Math.atan2(i-e,r-t)),$>=c&&($=2*c-$),$<wt){l.push(r,i),l.push(n,s);return}if(ot!==0&&$>ot){l.push(r,i);return}}}else if(L>Qr){if(L*L<=u*(S*S+w*w)){if(wt<Bn){l.push(C,B);return}if($=Math.abs(Math.atan2(a-s,o-n)-Math.atan2(s-i,n-r)),$>=c&&($=2*c-$),$<wt){l.push(r,i),l.push(n,s);return}if(ot!==0&&$>ot){l.push(n,s);return}}}else if(S=C-(t+o)/2,w=B-(e+a)/2,S*S+w*w<=u){l.push(C,B);return}}kn(t,e,p,d,v,y,C,B,l,u,h+1),kn(C,B,_,P,g,x,o,a,l,u,h+1)}const _1=8,eb=11920929e-14,tb=1,rb=.01,bu=0;function vu(t,e,r,i,n,s,o){let a=tb/1;return a*=a,ib(e,r,i,n,s,o,t,a),t}function ib(t,e,r,i,n,s,o,a){On(o,t,e,r,i,n,s,a,0),o.push(n,s)}function On(t,e,r,i,n,s,o,a,l){if(l>8)return;const u=Math.PI,h=(e+i)/2,c=(r+n)/2,p=(i+s)/2,d=(n+o)/2,f=(h+p)/2,m=(c+d)/2;let g=s-e,x=o-r;const v=Math.abs((i-s)*x-(n-o)*g);if(v>eb){if(v*v<=a*(g*g+x*x)){if(bu<rb){t.push(f,m);return}let y=Math.abs(Math.atan2(o-n,s-i)-Math.atan2(n-r,i-e));if(y>=u&&(y=2*u-y),y<bu){t.push(f,m);return}}}else if(g=f-(e+s)/2,x=m-(r+o)/2,g*g+x*x<=a){t.push(f,m);return}On(t,e,r,h,c,f,m,a,l+1),On(t,f,m,p,d,s,o,a,l+1)}function Fn(t,e,r,i,n,s,o,a){let l=Math.abs(n-s);(!o&&n>s||o&&s>n)&&(l=2*Math.PI-l),a=a||Math.max(6,Math.floor(6*Math.pow(i,1/3)*(l/Math.PI))),a=Math.max(a,3);let u=l/a,h=n;u*=o?-1:1;for(let c=0;c<a+1;c++){const p=Math.cos(h),d=Math.sin(h),f=e+p*i,m=r+d*i;t.push(f,m),h+=u}}function yu(t,e,r,i,n,s){const o=t[t.length-2],a=t[t.length-1]-r,l=o-e,u=n-r,h=i-e,c=Math.abs(a*h-l*u);if(c<1e-8||s===0){(t[t.length-2]!==e||t[t.length-1]!==r)&&t.push(e,r);return}const p=a*a+l*l,d=u*u+h*h,f=a*u+l*h,m=s*Math.sqrt(p)/c,g=s*Math.sqrt(d)/c,x=m*f/p,v=g*f/d,y=m*h+g*l,_=m*u+g*a,P=l*(g+x),C=a*(g+x),B=h*(m+v),S=u*(m+v),w=Math.atan2(C-_,P-y),T=Math.atan2(S-_,B-y);Fn(t,y+e,_+r,s,w,T,l*u>h*a)}const rr=Math.PI*2,Un={centerX:0,centerY:0,ang1:0,ang2:0},In=({x:t,y:e},r,i,n,s,o,a,l)=>{t*=r,e*=i;const u=n*t-s*e,h=s*t+n*e;return l.x=u+o,l.y=h+a,l};function nb(t,e){const r=e===-1.5707963267948966?-.551915024494:1.3333333333333333*Math.tan(e/4),i=e===1.5707963267948966?.551915024494:r,n=Math.cos(t),s=Math.sin(t),o=Math.cos(t+e),a=Math.sin(t+e);return[{x:n-s*i,y:s+n*i},{x:o+a*i,y:a-o*i},{x:o,y:a}]}const xu=(t,e,r,i)=>{const n=t*i-e*r<0?-1:1;let s=t*r+e*i;return s>1&&(s=1),s<-1&&(s=-1),n*Math.acos(s)},sb=(t,e,r,i,n,s,o,a,l,u,h,c,p)=>{const d=Math.pow(n,2),f=Math.pow(s,2),m=Math.pow(h,2),g=Math.pow(c,2);let x=d*f-d*g-f*m;x<0&&(x=0),x/=d*g+f*m,x=Math.sqrt(x)*(o===a?-1:1);const v=x*n/s*c,y=x*-s/n*h,_=u*v-l*y+(t+r)/2,P=l*v+u*y+(e+i)/2,C=(h-v)/n,B=(c-y)/s,S=(-h-v)/n,w=(-c-y)/s,T=xu(1,0,C,B);let L=xu(C,B,S,w);a===0&&L>0&&(L-=rr),a===1&&L<0&&(L+=rr),p.centerX=_,p.centerY=P,p.ang1=T,p.ang2=L};function _u(t,e,r,i,n,s,o,a=0,l=0,u=0){if(s===0||o===0)return;const h=Math.sin(a*rr/360),c=Math.cos(a*rr/360),p=c*(e-i)/2+h*(r-n)/2,d=-h*(e-i)/2+c*(r-n)/2;if(p===0&&d===0)return;s=Math.abs(s),o=Math.abs(o);const f=Math.pow(p,2)/Math.pow(s,2)+Math.pow(d,2)/Math.pow(o,2);f>1&&(s*=Math.sqrt(f),o*=Math.sqrt(f)),sb(e,r,i,n,s,o,l,u,h,c,p,d,Un);let{ang1:m,ang2:g}=Un;const{centerX:x,centerY:v}=Un;let y=Math.abs(g)/(rr/4);Math.abs(1-y)<1e-7&&(y=1);const _=Math.max(Math.ceil(y),1);g/=_;let P=t[t.length-2],C=t[t.length-1];const B={x:0,y:0};for(let S=0;S<_;S++){const w=nb(m,g),{x:T,y:L}=In(w[0],s,o,c,h,x,v,B),{x:$,y:R}=In(w[1],s,o,c,h,x,v,B),{x:E,y:K}=In(w[2],s,o,c,h,x,v,B);Rn(t,P,C,T,L,$,R,E,K),P=E,C=K,m+=g}}const ob=new Q;class wu{constructor(e){this.shapePrimitives=[],this._currentPoly=null,this._bounds=new pe,this._graphicsPath2D=e}moveTo(e,r){return this.startPoly(e,r),this}lineTo(e,r){this._ensurePoly();const i=this._currentPoly.points,n=i[i.length-2],s=i[i.length-1];return(n!==e||s!==r)&&i.push(e,r),this}arc(e,r,i,n,s,o){this._ensurePoly(!1);const a=this._currentPoly.points;return Fn(a,e,r,i,n,s,o),this}arcTo(e,r,i,n,s){this._ensurePoly();const o=this._currentPoly.points;return yu(o,e,r,i,n,s),this}arcToSvg(e,r,i,n,s,o,a){const l=this._currentPoly.points;return _u(l,this._currentPoly.lastX,this._currentPoly.lastY,o,a,e,r,i,n,s),this}bezierCurveTo(e,r,i,n,s,o){this._ensurePoly();const a=this._currentPoly;return Rn(this._currentPoly.points,a.lastX,a.lastY,e,r,i,n,s,o),this}quadraticCurveTo(e,r,i,n){this._ensurePoly();const s=this._currentPoly;return vu(this._currentPoly.points,s.lastX,s.lastY,e,r,i,n),this}closePath(){return this.endPoly(!0),this}addPath(e,r){this.endPoly(),r&&!r.isIdentity()&&(e=e.clone(!0),e.transform(r));for(let i=0;i<e.instructions.length;i++){const n=e.instructions[i];this[n.action](...n.data)}return this}finish(e=!1){this.endPoly(e)}rect(e,r,i,n,s){return this.drawShape(new Q(e,r,i,n),s),this}circle(e,r,i,n){return this.drawShape(new Ki(e,r,i),n),this}poly(e,r,i){const n=new yt(e);n.closePath=r,this.drawShape(n,i)}ellipse(e,r,i,n,s){return this.drawShape(new Zi(e,r,i,n),s),this}roundRect(e,r,i,n,s,o){return this.drawShape(new Qi(e,r,i,n,s),o),this}drawShape(e,r){return this.endPoly(),this.shapePrimitives.push({shape:e,transform:r}),this}startPoly(e,r){let i=this._currentPoly;return i&&this.endPoly(),i=new yt,i.points.push(e,r),this._currentPoly=i,this}endPoly(e=!1){const r=this._currentPoly;return r&&r.points.length>2&&(r.closePath=e,this.shapePrimitives.push({shape:r})),this._currentPoly=null,this}_ensurePoly(e=!0){if(!this._currentPoly&&(this._currentPoly=new yt,e)){const r=this.shapePrimitives[this.shapePrimitives.length-1];if(r){let i=r.shape.x,n=r.shape.y;if(r.transform.isIdentity()){const s=r.transform,o=i;i=s.a*i+s.c*n+s.tx,n=s.b*o+s.d*n+s.ty}this._currentPoly.points.push(i,i)}else this._currentPoly.points.push(0,0)}}buildPath(){const e=this._graphicsPath2D;this.shapePrimitives.length=0,this._currentPoly=null;for(let r=0;r<e.instructions.length;r++){const i=e.instructions[r];this[i.action](...i.data)}this.finish()}get bounds(){const e=this._bounds;e.clear();const r=this.shapePrimitives;for(let i=0;i<r.length;i++){const n=r[i],s=n.shape.getBounds(ob);n.transform?(e.pushMatrix(n.transform),e.addRect(s),e.popMatrix()):e.addRect(s)}return e}}class xt{constructor(e){this.instructions=[],this.uid=q("graphicsPath"),this._dirty=!0;var r;typeof e=="string"?mu(e,this):this.instructions=(r=e==null?void 0:e.slice())!=null?r:[]}get shapePath(){return this._shapePath||(this._shapePath=new wu(this)),this._dirty&&(this._dirty=!1,this._shapePath.buildPath()),this._shapePath}addPath(e,r){return e=e.clone(),this.instructions.push({action:"addPath",data:[e,r]}),this._dirty=!0,this}arc(...e){return this.instructions.push({action:"arc",data:e}),this._dirty=!0,this}arcTo(...e){return this.instructions.push({action:"arcTo",data:e}),this._dirty=!0,this}arcToSvg(...e){return this.instructions.push({action:"arcToSvg",data:e}),this._dirty=!0,this}bezierCurveTo(...e){return this.instructions.push({action:"bezierCurveTo",data:e}),this._dirty=!0,this}bezierCurveToShort(e,r,i,n){const s=this.instructions[this.instructions.length-1],o=this._getLastPoint(W.shared);let a=0,l=0;if(!s||s.action!=="bezierCurveTo")a=o.x,l=o.y;else{a=s.data[2],l=s.data[3];const u=o.x,h=o.y;a=u+(u-a),l=h+(h-l)}return this.instructions.push({action:"bezierCurveTo",data:[a,l,e,r,i,n]}),this._dirty=!0,this}closePath(){return this.instructions.push({action:"closePath",data:[]}),this._dirty=!0,this}ellipse(...e){return this.instructions.push({action:"ellipse",data:e}),this._dirty=!0,this}lineTo(...e){return this.instructions.push({action:"lineTo",data:e}),this._dirty=!0,this}moveTo(...e){return this.instructions.push({action:"moveTo",data:e}),this}quadraticCurveTo(...e){return this.instructions.push({action:"quadraticCurveTo",data:e}),this._dirty=!0,this}quadraticCurveToShort(e,r){const i=this.instructions[this.instructions.length-1],n=this._getLastPoint(W.shared);let s=0,o=0;if(!i||i.action!=="quadraticCurveTo")s=n.x,o=n.y;else{s=i.data[0],o=i.data[1];const a=n.x,l=n.y;s=a+(a-s),o=l+(l-o)}return this.instructions.push({action:"quadraticCurveTo",data:[s,o,e,r]}),this._dirty=!0,this}rect(e,r,i,n,s){return this.instructions.push({action:"rect",data:[e,r,i,n,s]}),this._dirty=!0,this}circle(e,r,i,n){return this.instructions.push({action:"circle",data:[e,r,i,n]}),this._dirty=!0,this}roundRect(...e){return this.instructions.push({action:"roundRect",data:e}),this._dirty=!0,this}poly(...e){return this.instructions.push({action:"poly",data:e}),this._dirty=!0,this}star(e,r,i,n,s,o=0,a){s=s||n/2;const l=-1*Math.PI/2+o,u=i*2,h=Math.PI*2/u,c=[];for(let p=0;p<u;p++){const d=p%2?s:n,f=p*h+l;c.push(e+d*Math.cos(f),r+d*Math.sin(f))}return this.poly(c,!0,a),this}clone(e=!1){const r=new xt;if(!e)r.instructions=this.instructions.slice();else for(let i=0;i<this.instructions.length;i++){const n=this.instructions[i];r.instructions.push({action:n.action,data:n.data.slice()})}return r}clear(){return this.instructions.length=0,this._dirty=!0,this}transform(e){if(e.isIdentity())return this;const r=e.a,i=e.b,n=e.c,s=e.d,o=e.tx,a=e.ty;let l=0,u=0,h=0,c=0,p=0,d=0,f=0,m=0;for(let g=0;g<this.instructions.length;g++){const x=this.instructions[g],v=x.data;switch(x.action){case"moveTo":case"lineTo":l=v[0],u=v[1],v[0]=r*l+n*u+o,v[1]=i*l+s*u+a;break;case"bezierCurveTo":h=v[0],c=v[1],p=v[2],d=v[3],l=v[4],u=v[5],v[0]=r*h+n*c+o,v[1]=i*h+s*c+a,v[2]=r*p+n*d+o,v[3]=i*p+s*d+a,v[4]=r*l+n*u+o,v[5]=i*l+s*u+a;break;case"quadraticCurveTo":h=v[0],c=v[1],l=v[2],u=v[3],v[0]=r*h+n*c+o,v[1]=i*h+s*c+a,v[2]=r*l+n*u+o,v[3]=i*l+s*u+a;break;case"arcToSvg":l=v[5],u=v[6],f=v[0],m=v[1],v[0]=r*f+n*m,v[1]=i*f+s*m,v[5]=r*l+n*u+o,v[6]=i*l+s*u+a;break;case"rect":v[4]=Gn(v[4],e);break;case"ellipse":v[8]=Gn(v[8],e);break;case"roundRect":v[5]=Gn(v[5],e);break;case"addPath":v[0].transform(e);break;default:break}}return this._dirty=!0,this}get bounds(){return this.shapePath.bounds}_getLastPoint(e){let r=this.instructions.length-1,i=this.instructions[r];if(!i)return e.x=0,e.y=0,e;for(;i.action==="closePath";){if(r--,r<0)return e.x=0,e.y=0,e;i=this.instructions[r]}let n,s,o;switch(i.action){case"moveTo":case"lineTo":e.x=i.data[0],e.y=i.data[1];break;case"quadraticCurveTo":e.x=i.data[2],e.y=i.data[3];break;case"bezierCurveTo":e.x=i.data[4],e.y=i.data[5];break;case"arc":case"arcToSvg":e.x=i.data[5],e.y=i.data[6];break;case"addPath":e.x=i.data[0].lastX,e.y=i.data[2].lastY;break;case"rect":if(o=i.data[4],n=i.data[0],s=i.data[1],o){const{a,b:l,c:u,d:h,tx:c,ty:p}=o;e.x=a*n+u*s+c,e.y=l*n+h*s+p}else e.x=n,e.y=s;break;default:break}return e}}function Gn(t,e){return t?t.prepend(e):e.clone()}var ab=Object.defineProperty,Tu=Object.getOwnPropertySymbols,lb=Object.prototype.hasOwnProperty,ub=Object.prototype.propertyIsEnumerable,Su=(t,e,r)=>e in t?ab(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Jr=(t,e)=>{for(var r in e||(e={}))lb.call(e,r)&&Su(t,r,e[r]);if(Tu)for(var r of Tu(e))ub.call(e,r)&&Su(t,r,e[r]);return t};function Pu(t,e){if(typeof t=="string"){const i=document.createElement("div");i.innerHTML=t.trim(),t=i.querySelector("svg")}const r={context:e,path:new xt};return Au(t,r,null,null),e}function Au(t,e,r,i){const n=t.children,{fillStyle:s,strokeStyle:o}=hb(t);s&&r?r=Jr(Jr({},r),s):s&&(r=s),o&&i?i=Jr(Jr({},i),o):o&&(i=o),e.context.fillStyle=r,e.context.strokeStyle=i;let a,l,u,h,c,p,d,f,m,g,x,v,y,_,P,C,B;switch(t.nodeName.toLowerCase()){case"path":_=t.getAttribute("d"),P=new xt(_),e.context.path(P),r&&e.context.fill(),i&&e.context.stroke();break;case"circle":d=ae(t,"cx",0),f=ae(t,"cy",0),m=ae(t,"r",0),e.context.ellipse(d,f,m,m),r&&e.context.fill(),i&&e.context.stroke();break;case"rect":a=ae(t,"x",0),l=ae(t,"y",0),C=ae(t,"width",0),B=ae(t,"height",0),g=ae(t,"rx",0),x=ae(t,"ry",0),g||x?e.context.roundRect(a,l,C,B,g||x):e.context.rect(a,l,C,B),r&&e.context.fill(),i&&e.context.stroke();break;case"ellipse":d=ae(t,"cx",0),f=ae(t,"cy",0),g=ae(t,"rx",0),x=ae(t,"ry",0),e.context.beginPath(),e.context.ellipse(d,f,g,x),r&&e.context.fill(),i&&e.context.stroke();break;case"line":u=ae(t,"x1",0),h=ae(t,"y1",0),c=ae(t,"x2",0),p=ae(t,"y2",0),e.context.beginPath(),e.context.moveTo(u,h),e.context.lineTo(c,p),i&&e.context.stroke();break;case"polygon":y=t.getAttribute("points"),v=y.match(/\d+/g).map(S=>parseInt(S,10)),e.context.poly(v,!0),r&&e.context.fill(),i&&e.context.stroke();break;case"polyline":y=t.getAttribute("points"),v=y.match(/\d+/g).map(S=>parseInt(S,10)),e.context.poly(v,!1),i&&e.context.stroke();break;case"g":case"svg":break;default:{console.info(`[SVG parser] <${t.nodeName}> elements unsupported`);break}}for(let S=0;S<n.length;S++)Au(n[S],e,r,i)}function ae(t,e,r){const i=t.getAttribute(e);return i?Number(i):r}function hb(t){const e=t.getAttribute("style"),r={},i={};let n=!1,s=!1;if(e){const o=e.split(";");for(let a=0;a<o.length;a++){const l=o[a],[u,h]=l.split(":");switch(u){case"stroke":h!=="none"&&(r.color=H.shared.setValue(h).toNumber(),s=!0);break;case"stroke-width":r.width=Number(h);break;case"fill":h!=="none"&&(n=!0,i.color=H.shared.setValue(h).toNumber());break;case"fill-opacity":i.alpha=Number(h);break;case"stroke-opacity":r.alpha=Number(h);break;case"opacity":i.alpha=Number(h),r.alpha=Number(h);break}}}else{const o=t.getAttribute("stroke");o&&o!=="none"&&(s=!0,r.color=H.shared.setValue(o).toNumber(),r.width=ae(t,"stroke-width",1));const a=t.getAttribute("fill");a&&a!=="none"&&(n=!0,i.color=H.shared.setValue(a).toNumber())}return{strokeStyle:s?r:null,fillStyle:n?i:null}}class at extends he{constructor(){super(...arguments),this.uploadMethodId="image"}static test(e){return typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap}}at.extension=b.TextureSource;const ei=j.get().createCanvas(),lt=1;ei.width=lt,ei.height=lt;const $e=ei.getContext("2d");$e.fillStyle="#ffffff",$e.fillRect(0,0,lt,lt),$e.beginPath(),$e.moveTo(0,0),$e.lineTo(lt,0),$e.lineTo(lt,lt),$e.closePath(),$e.fillStyle="#ffffff",$e.fill(),A.WHITE=new A({source:new at({resource:ei})}),A.WHITE.label="WHITE",A.WHITE.destroy=xn;const $n=class{constructor(t,e,r,i){this.uid=q("fillGradient"),this.type="linear",this.gradientStops=[],this.x0=t,this.y0=e,this.x1=r,this.y1=i}addColorStop(t,e){return this.gradientStops.push({offset:t,color:H.shared.setValue(e).toHex()}),this}buildLinearGradient(){const t=$n.defaultTextureSize,{gradientStops:e}=this,r=j.get().createCanvas();r.width=t,r.height=t;const i=r.getContext("2d"),n=i.createLinearGradient(0,0,$n.defaultTextureSize,1);for(let f=0;f<e.length;f++){const m=e[f];n.addColorStop(m.offset,m.color)}i.fillStyle=n,i.fillRect(0,0,t,t),this.texture=new A({source:new at({resource:r,style:{addressModeU:"clamp-to-edge",addressModeV:"repeat"}})});const{x0:s,y0:o,x1:a,y1:l}=this,u=new k,h=a-s,c=l-o,p=Math.sqrt(h*h+c*c),d=Math.atan2(c,h);u.translate(-s,-o),u.scale(1/t,1/t),u.rotate(-d),u.scale(256/p,1),this.transform=u}};let ir=$n;ir.defaultTextureSize=256;const Eu={repeat:{addressModeU:"repeat",addressModeV:"repeat"},"repeat-x":{addressModeU:"repeat",addressModeV:"clamp-to-edge"},"repeat-y":{addressModeU:"clamp-to-edge",addressModeV:"repeat"},"no-repeat":{addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}};class Ln{constructor(e,r){this.uid=q("fillPattern"),this.transform=new k,this.texture=e,this.transform.scale(1/e.frameWidth,1/e.frameHeight),r&&(e.source.style.addressModeU=Eu[r].addressModeU,e.source.style.addressModeV=Eu[r].addressModeV)}setTransform(e){const r=this.texture;this.transform.copyFrom(e),this.transform.invert(),this.transform.scale(1/r.frameWidth,1/r.frameHeight)}}var cb=Object.defineProperty,db=Object.defineProperties,pb=Object.getOwnPropertyDescriptors,Cu=Object.getOwnPropertySymbols,fb=Object.prototype.hasOwnProperty,gb=Object.prototype.propertyIsEnumerable,Mu=(t,e,r)=>e in t?cb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ut=(t,e)=>{for(var r in e||(e={}))fb.call(e,r)&&Mu(t,r,e[r]);if(Cu)for(var r of Cu(e))gb.call(e,r)&&Mu(t,r,e[r]);return t},Dn=(t,e)=>db(t,pb(e));function ht(t,e){var r;if(!t)return null;let i,n;if(t!=null&&t.fill?(n=t.fill,i=ut(ut({},e),t)):(n=t,i=e),H.isColorLike(n)){const o=H.shared.setValue(n!=null?n:0);return Dn(ut({},i),{color:o.toNumber(),alpha:o.alpha===1?i.alpha:o.alpha,texture:A.WHITE})}else if(n instanceof Ln){const o=n;return Dn(ut({},i),{color:16777215,texture:o.texture,matrix:o.transform,fill:(r=i.fill)!=null?r:null})}else if(n instanceof ir){const o=n;return o.buildLinearGradient(),Dn(ut({},i),{color:16777215,texture:o.texture,matrix:o.transform})}const s=ut(ut({},e),t);if(s.texture!==A.WHITE){const o=s.matrix||new k;o.scale(1/s.texture.frameWidth,1/s.texture.frameHeight),s.matrix=o,s.color=16777215}return s.color=H.shared.setValue(s.color).toNumber(),s}var mb=Object.defineProperty,Bu=Object.getOwnPropertySymbols,bb=Object.prototype.hasOwnProperty,vb=Object.prototype.propertyIsEnumerable,Ru=(t,e,r)=>e in t?mb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ti=(t,e)=>{for(var r in e||(e={}))bb.call(e,r)&&Ru(t,r,e[r]);if(Bu)for(var r of Bu(e))vb.call(e,r)&&Ru(t,r,e[r]);return t};const Tt=new W,ku=new k,ct=class extends ue{constructor(){super(...arguments),this.uid=q("graphicsContext"),this.dirty=!0,this.batchMode="auto",this.instructions=[],this._activePath=new xt,this._transform=new k,this._fillStyle=ti({},ct.defaultFillStyle),this._strokeStyle=ti({},ct.defaultStrokeStyle),this._stateStack=[],this._tick=0,this._bounds=new pe,this._boundsDirty=!0}get fillStyle(){return this._fillStyle}set fillStyle(t){this._fillStyle=ht(t,ct.defaultFillStyle)}get strokeStyle(){return this._strokeStyle}set strokeStyle(t){this._strokeStyle=ht(t,ct.defaultStrokeStyle)}texture(t,e,r,i,n,s){return this.instructions.push({action:"texture",data:{image:t,dx:r||0,dy:i||0,dw:n||t.frameWidth,dh:s||t.frameHeight,transform:this._transform.clone(),alpha:this._fillStyle.alpha,style:e?H.shared.setValue(e).toNumber():0}}),this.onUpdate(),this}beginPath(){return this._activePath=new xt,this}fill(t,e){let r;const i=this.instructions[this.instructions.length-1];return this._tick===0&&i&&i.action==="stroke"?r=i.data.path:r=this._activePath.clone(),r?(t&&(e!==void 0&&typeof t=="number"&&(O("8.0.0","GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),t={color:t,alpha:e}),this._fillStyle=ht(t,ct.defaultFillStyle)),this.instructions.push({action:"fill",data:{style:this.fillStyle,path:r}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this):this}stroke(t){let e;const r=this.instructions[this.instructions.length-1];return this._tick===0&&r&&r.action==="fill"?e=r.data.path:e=this._activePath.clone(),e?(t&&(this._strokeStyle=ht(t,ct.defaultStrokeStyle)),this.instructions.push({action:"stroke",data:{style:this.strokeStyle,path:e}}),this.onUpdate(),this._activePath.instructions.length=0,this._tick=0,this):this}cut(){for(let t=0;t<2;t++){const e=this.instructions[this.instructions.length-1-t],r=this._activePath.clone();e&&(e.action==="stroke"||e.action==="fill")&&(e.data.hole=r)}return this._activePath.instructions.length=0,this}arc(t,e,r,i,n,s){this._tick++;const o=this._transform;return this._activePath.arc(o.a*t+o.c*e+o.tx,o.b*t+o.d*e+o.ty,r,i,n,s),this}arcTo(t,e,r,i,n){this._tick++;const s=this._transform;return this._activePath.arcTo(s.a*t+s.c*e+s.tx,s.b*t+s.d*e+s.ty,s.a*r+s.c*i+s.tx,s.b*r+s.d*i+s.ty,n),this}arcToSvg(t,e,r,i,n,s,o){this._tick++;const a=this._transform;return this._activePath.arcToSvg(t,e,r,i,n,a.a*s+a.c*o+a.tx,a.b*s+a.d*o+a.ty),this}bezierCurveTo(t,e,r,i,n,s){this._tick++;const o=this._transform;return this._activePath.bezierCurveTo(o.a*t+o.c*e+o.tx,o.b*t+o.d*e+o.ty,o.a*r+o.c*i+o.tx,o.b*r+o.d*i+o.ty,o.a*n+o.c*s+o.tx,o.b*n+o.d*s+o.ty),this}closePath(){var t;return this._tick++,(t=this._activePath)==null||t.closePath(),this}ellipse(t,e,r,i){return this._tick++,this._activePath.ellipse(t,e,r,i,this._transform.clone()),this}circle(t,e,r){return this._tick++,this._activePath.circle(t,e,r,this._transform.clone()),this}path(t){return this._tick++,this._activePath.addPath(t,this._transform.clone()),this}lineTo(t,e){this._tick++;const r=this._transform;return this._activePath.lineTo(r.a*t+r.c*e+r.tx,r.b*t+r.d*e+r.ty),this}moveTo(t,e){this._tick++;const r=this._transform;return this._activePath.moveTo(r.a*t+r.c*e+r.tx,r.b*t+r.d*e+r.ty),this}quadraticCurveTo(t,e,r,i){this._tick++;const n=this._transform;this._activePath.quadraticCurveTo(n.a*t+n.c*e+n.tx,n.b*t+n.d*e+n.ty,n.a*r+n.c*i+n.tx,n.b*r+n.d*i+n.ty)}rect(t,e,r,i){return this._tick++,this._activePath.rect(t,e,r,i,this._transform.clone()),this}roundRect(t,e,r,i,n){return this._tick++,this._activePath.roundRect(t,e,r,i,n,this._transform.clone()),this}poly(t,e){return this._tick++,this._activePath.poly(t,e,this._transform.clone()),this}star(t,e,r,i,n,s){return this._tick++,this._activePath.star(t,e,r,i,n,s,this._transform.clone()),this}svg(t){this._tick++,Pu(t,this)}restore(){const t=this._stateStack.pop();t&&(this._transform=t.transform,this._fillStyle=t.fillStyle,this._strokeStyle=t.strokeStyle)}save(){this._stateStack.push({transform:this._transform.clone(),fillStyle:ti({},this._fillStyle),strokeStyle:ti({},this._strokeStyle)})}getTransform(){return this._transform}resetTransform(){return this._transform.identity(),this}rotate(t){return this._transform.rotate(t),this}scale(t,e=t){return this._transform.scale(t,e),this}setTransform(t,e,r,i,n,s){return t instanceof k?(this._transform.set(t.a,t.b,t.c,t.d,t.tx,t.ty),this):(this._transform.set(t,e,r,i,n,s),this)}transform(t,e,r,i,n,s){return t instanceof k?(this._transform.append(t),this):(ku.set(t,e,r,i,n,s),this._transform.append(ku),this)}translate(t,e){return this._transform.translate(t,e),this}clear(){return this.instructions.length=0,this.resetTransform(),this.onUpdate(),this}onUpdate(){this.dirty||(this.emit("update",this,16),this.dirty=!0,this._boundsDirty=!0)}get bounds(){if(!this._boundsDirty)return this._bounds;const t=this._bounds;t.clear();for(let e=0;e<this.instructions.length;e++){const r=this.instructions[e],i=r.action;if(i==="fill"){const n=r.data;t.addBounds(n.path.bounds)}else if(i==="texture"){const n=r.data;t.pushMatrix(n.transform),t.addFrame(n.dx,n.dy,n.dx+n.dw,n.dy+n.dh),t.popMatrix()}}return t}containsPoint(t){const e=this.instructions;let r=!1;return e.forEach(i=>{var n;const s=i.data,o=s.path;if(!i.action||!o)return;const a=s.style,l=(n=o.shapePath)==null?void 0:n.shapePrimitives;this._forEachShape(l,u=>{var h;if(!a||!u)return;typeof a!="number"&&a.matrix?a.matrix.applyInverse(t,Tt):Tt.copyFrom(t),r=u.contains(Tt.x,Tt.y);const c=s.hole;if(!c)return;const p=(h=c.shapePath)==null?void 0:h.shapePrimitives;p&&this._forEachShape(p,d=>{d.contains(Tt.x,Tt.y)&&(r=!1)})})}),r}_forEachShape(t,e){t==null||t.forEach(r=>{const i=r==null?void 0:r.shape;i&&e(i)})}destroy(t=!1){if(this._stateStack.length=0,this._transform=null,this.emit("destroy",this),this.removeAllListeners(),typeof t=="boolean"?t:t==null?void 0:t.texture){const e=typeof t=="boolean"?t:t==null?void 0:t.textureSource;this._fillStyle.texture&&this._fillStyle.texture.destroy(e),this._strokeStyle.texture&&this._strokeStyle.texture.destroy(e)}this._fillStyle=null,this._strokeStyle=null,this.instructions=null,this._activePath=null,this._bounds=null,this._stateStack=null,this.customShader=null,this._transform=null}};let je=ct;je.defaultFillStyle={color:0,alpha:1,texture:A.WHITE,matrix:null,fill:null},je.defaultStrokeStyle={width:1,color:0,alpha:1,alignment:.5,miterLimit:10,cap:"butt",join:"miter",texture:A.WHITE,matrix:null,fill:null};const yb=/^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m,xb=".svg",_b="image/svg+xml",Ou={extension:{type:b.LoadParser,priority:Ge.Low},name:"loadSVG",test(t){return nt(t,_b)||st(t,xb)},async testParse(t){return typeof t=="string"&&t.startsWith("data:image/svg+xml")||typeof t=="string"&&yb.test(t)},async parse(t){const e=new je;return e.svg(t),e},async load(t){return(await j.get().fetch(t)).text()},unload(t){t.destroy(!0)}};function Fu(t,e,r,i,n){const s=e[r];for(let o=0;o<s.length;o++){const a=s[o];r<e.length-1?Fu(t.replace(i[r],a),e,r+1,i,n):n.push(t.replace(i[r],a))}}function Uu(t){const e=/\{(.*?)\}/g,r=t.match(e),i=[];if(r){const n=[];r.forEach(s=>{const o=s.substring(1,s.length-1).split(",");n.push(o)}),Fu(t,n,0,r,i)}else i.push(t);return i}const nr=t=>!Array.isArray(t);var wb=Object.defineProperty,Tb=Object.defineProperties,Sb=Object.getOwnPropertyDescriptors,Iu=Object.getOwnPropertySymbols,Pb=Object.prototype.hasOwnProperty,Ab=Object.prototype.propertyIsEnumerable,Gu=(t,e,r)=>e in t?wb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,St=(t,e)=>{for(var r in e||(e={}))Pb.call(e,r)&&Gu(t,r,e[r]);if(Iu)for(var r of Iu(e))Ab.call(e,r)&&Gu(t,r,e[r]);return t},$u=(t,e)=>Tb(t,Sb(e));class Pt{constructor(){this._defaultBundleIdentifierOptions={connector:"-",createBundleAssetId:(e,r)=>`${e}${this._bundleIdConnector}${r}`,extractAssetIdFromBundle:(e,r)=>r.replace(`${e}${this._bundleIdConnector}`,"")},this._bundleIdConnector=this._defaultBundleIdentifierOptions.connector,this._createBundleAssetId=this._defaultBundleIdentifierOptions.createBundleAssetId,this._extractAssetIdFromBundle=this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,this._assetMap={},this._preferredOrder=[],this._parsers=[],this._resolverHash={},this._bundles={}}setBundleIdentifier(e){var r,i,n;if(this._bundleIdConnector=(r=e.connector)!=null?r:this._bundleIdConnector,this._createBundleAssetId=(i=e.createBundleAssetId)!=null?i:this._createBundleAssetId,this._extractAssetIdFromBundle=(n=e.extractAssetIdFromBundle)!=null?n:this._extractAssetIdFromBundle,this._extractAssetIdFromBundle("foo",this._createBundleAssetId("foo","bar"))!=="bar")throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")}prefer(...e){e.forEach(r=>{this._preferredOrder.push(r),r.priority||(r.priority=Object.keys(r.params))}),this._resolverHash={}}set basePath(e){this._basePath=e}get basePath(){return this._basePath}set rootPath(e){this._rootPath=e}get rootPath(){return this._rootPath}get parsers(){return this._parsers}reset(){this.setBundleIdentifier(this._defaultBundleIdentifierOptions),this._assetMap={},this._preferredOrder=[],this._resolverHash={},this._rootPath=null,this._basePath=null,this._manifest=null,this._bundles={},this._defaultSearchParams=null}setDefaultSearchParams(e){if(typeof e=="string")this._defaultSearchParams=e;else{const r=e;this._defaultSearchParams=Object.keys(r).map(i=>`${encodeURIComponent(i)}=${encodeURIComponent(r[i])}`).join("&")}}getAlias(e){const{alias:r,name:i,src:n,srcs:s}=e;return ye(r||i||n||s,o=>{var a;return typeof o=="string"?o:Array.isArray(o)?o.map(l=>{var u,h;return(h=(u=l==null?void 0:l.src)!=null?u:l==null?void 0:l.srcs)!=null?h:l}):o!=null&&o.src||o!=null&&o.srcs?(a=o.src)!=null?a:o.srcs:o},!0)}addManifest(e){this._manifest,this._manifest=e,e.bundles.forEach(r=>{this.addBundle(r.name,r.assets)})}addBundle(e,r){const i=[];Array.isArray(r)?r.forEach(n=>{var s,o;const a=(s=n.src)!=null?s:n.srcs,l=(o=n.alias)!=null?o:n.name;let u;if(typeof l=="string"){const h=this._createBundleAssetId(e,l);i.push(h),u=[l,h]}else{const h=l.map(c=>this._createBundleAssetId(e,c));i.push(...h),u=[...l,...h]}this.add($u(St({},n),{alias:u,src:a}))}):Object.keys(r).forEach(n=>{var s;const o=[n,this._createBundleAssetId(e,n)];if(typeof r[n]=="string")this.add({alias:o,src:r[n]});else if(Array.isArray(r[n]))this.add({alias:o,src:r[n]});else{const a=r[n],l=(s=a.src)!=null?s:a.srcs;this.add($u(St({},a),{alias:o,src:Array.isArray(l)?l:[l]}))}i.push(...o)}),this._bundles[e]=i}add(e){const r=[];Array.isArray(e)?r.push(...e):r.push(e);let i;ye(r).forEach(n=>{const{src:s,srcs:o}=n;let{data:a,format:l,loadParser:u}=n;const h=ye(s||o).map(d=>typeof d=="string"?Uu(d):Array.isArray(d)?d:[d]),c=this.getAlias(n),p=[];h.forEach(d=>{d.forEach(f=>{var m,g,x;let v={};if(typeof f!="object"){v.src=f;for(let y=0;y<this._parsers.length;y++){const _=this._parsers[y];if(_.test(f)){v=_.parse(f);break}}}else a=(m=f.data)!=null?m:a,l=(g=f.format)!=null?g:l,u=(x=f.loadParser)!=null?x:u,v=St(St({},v),f);if(!c)throw new Error(`[Resolver] alias is undefined for this asset: ${v.src}`);v=this._buildResolvedAsset(v,{aliases:c,data:a,format:l,loadParser:u}),p.push(v)})}),c.forEach(d=>{this._assetMap[d]=p})})}resolveBundle(e){const r=nr(e);e=ye(e);const i={};return e.forEach(n=>{const s=this._bundles[n];if(s){const o=this.resolve(s),a={};for(const l in o){const u=o[l];a[this._extractAssetIdFromBundle(n,l)]=u}i[n]=a}}),r?i[e[0]]:i}resolveUrl(e){const r=this.resolve(e);if(typeof e!="string"){const i={};for(const n in r)i[n]=r[n].src;return i}return r.src}resolve(e){const r=nr(e);e=ye(e);const i={};return e.forEach(n=>{var s;if(!this._resolverHash[n])if(this._assetMap[n]){let o=this._assetMap[n];const a=o[0],l=this._getPreferredOrder(o);l==null||l.priority.forEach(u=>{l.params[u].forEach(h=>{const c=o.filter(p=>p[u]?p[u]===h:!1);c.length&&(o=c)})}),this._resolverHash[n]=(s=o[0])!=null?s:a}else this._resolverHash[n]=this._buildResolvedAsset({alias:[n],src:n},{});i[n]=this._resolverHash[n]}),r?i[e[0]]:i}hasKey(e){return!!this._assetMap[e]}hasBundle(e){return!!this._bundles[e]}_getPreferredOrder(e){for(let r=0;r<e.length;r++){const i=e[0],n=this._preferredOrder.find(s=>s.params.format.includes(i.format));if(n)return n}return this._preferredOrder[0]}_appendDefaultSearchParams(e){if(!this._defaultSearchParams)return e;const r=/\?/.test(e)?"&":"?";return`${e}${r}${this._defaultSearchParams}`}_buildResolvedAsset(e,r){var i;const{aliases:n,data:s,loadParser:o,format:a}=r;return(this._basePath||this._rootPath)&&(e.src=de.toAbsolute(e.src,this._basePath,this._rootPath)),e.alias=(i=n!=null?n:e.alias)!=null?i:[e.src],e.src=this._appendDefaultSearchParams(e.src),e.data=St(St({},s||{}),e.data),e.loadParser=o!=null?o:e.loadParser,e.format=a!=null?a:e.src.split(".").pop(),e.srcs=e.src,e.name=e.alias,e}}Pt.RETINA_PREFIX=/@([0-9\.]+)x/;function zn(t,e=1){var r;const i=(r=Pt.RETINA_PREFIX)==null?void 0:r.exec(t);return i?parseFloat(i[1]):e}let Lu=0,Nn;const Eb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",Cb={id:"checkImageBitmap",code:`
    async function checkImageBitmap()
    {
        try
        {
            if (typeof createImageBitmap !== 'function') return false;

            const response = await fetch('${Eb}');
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
    `},Mb={id:"loadImageBitmap",code:`
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
    };`};let Hn;class Bb{constructor(){this._initialized=!1,this._createdWorkers=0,this._workerPool=[],this._queue=[],this._resolveHash={}}isImageBitmapSupported(){return this._isImageBitmapSupported!==void 0?this._isImageBitmapSupported:(this._isImageBitmapSupported=new Promise(e=>{const r=URL.createObjectURL(new Blob([Cb.code],{type:"application/javascript"})),i=new Worker(r);i.addEventListener("message",n=>{i.terminate(),URL.revokeObjectURL(r),e(n.data)})}),this._isImageBitmapSupported)}loadImageBitmap(e){return this._run("loadImageBitmap",[e])}async _initWorkers(){this._initialized||(this._initialized=!0)}_getWorker(){Nn===void 0&&(Nn=navigator.hardwareConcurrency||4);let e=this._workerPool.pop();return!e&&this._createdWorkers<Nn&&(Hn||(Hn=URL.createObjectURL(new Blob([Mb.code],{type:"application/javascript"}))),this._createdWorkers++,e=new Worker(Hn),e.addEventListener("message",r=>{this._complete(r.data),this._returnWorker(r.target),this._next()})),e}_returnWorker(e){this._workerPool.push(e)}_complete(e){e.error!==void 0?this._resolveHash[e.uuid].reject(e.error):this._resolveHash[e.uuid].resolve(e.data),this._resolveHash[e.uuid]=null}async _run(e,r){await this._initWorkers();const i=new Promise((n,s)=>{this._queue.push({id:e,arguments:r,resolve:n,reject:s})});return this._next(),i}_next(){if(!this._queue.length)return;const e=this._getWorker();if(!e)return;const r=this._queue.pop(),i=r.id;this._resolveHash[Lu]={resolve:r.resolve,reject:r.reject},e.postMessage({data:r.arguments,uuid:Lu++,id:i})}}const jn=new Bb;function Wn(t,e,r){const i=new A({source:t,label:r}),n=()=>{delete e.promiseCache[r],Z.has(r)&&Z.remove(r)};return i.once("destroy",()=>{r in e.promiseCache&&n()}),i.source.once("destroy",()=>{t.destroyed||n()}),i}var Rb=Object.defineProperty,Du=Object.getOwnPropertySymbols,kb=Object.prototype.hasOwnProperty,Ob=Object.prototype.propertyIsEnumerable,zu=(t,e,r)=>e in t?Rb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Fb=(t,e)=>{for(var r in e||(e={}))kb.call(e,r)&&zu(t,r,e[r]);if(Du)for(var r of Du(e))Ob.call(e,r)&&zu(t,r,e[r]);return t};const Ub=[".jpeg",".jpg",".png",".webp",".avif"],Ib=["image/jpeg","image/png","image/webp","image/avif"];async function Nu(t){const e=await j.get().fetch(t);if(!e.ok)throw new Error(`[loadImageBitmap] Failed to fetch ${t}: ${e.status} ${e.statusText}`);const r=await e.blob();return await createImageBitmap(r)}const Vn={name:"loadTextures",extension:{type:b.LoadParser,priority:Ge.High},config:{preferWorkers:!0,preferCreateImageBitmap:!0,crossOrigin:"anonymous"},test(t){return nt(t,Ib)||st(t,Ub)},async load(t,e,r){var i;let n=null;globalThis.createImageBitmap&&this.config.preferCreateImageBitmap?this.config.preferWorkers&&await jn.isImageBitmapSupported()?n=await jn.loadImageBitmap(t):n=await Nu(t):n=await new Promise(o=>{n=new Image,n.crossOrigin=this.config.crossOrigin,n.src=t,n.complete?o(n):n.onload=()=>{o(n)}});const s=new at(Fb({resource:n,alphaMode:"premultiply-alpha-on-upload",resolution:((i=e.data)==null?void 0:i.resolution)||zn(t)},e.data));return Wn(s,r,t)},unload(t){t.destroy(!0)}};let Yn;async function Xn(){return Yn!=null||(Yn=(async()=>{var t;const e=document.createElement("canvas").getContext("webgl");if(!e)return"premultiply-alpha-on-upload";const r=await new Promise(o=>{const a=document.createElement("video");a.onloadeddata=()=>o(a),a.onerror=()=>o(null),a.autoplay=!1,a.crossOrigin="anonymous",a.preload="auto",a.src="data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",a.load()});if(!r)return"premultiply-alpha-on-upload";const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i);const n=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.NONE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,r);const s=new Uint8Array(4);return e.readPixels(0,0,1,1,e.RGBA,e.UNSIGNED_BYTE,s),e.deleteFramebuffer(n),e.deleteTexture(i),(t=e.getExtension("WEBGL_lose_context"))==null||t.loseContext(),s[0]<=s[3]?"premultiplied-alpha":"premultiply-alpha-on-upload"})()),Yn}var Gb=Object.defineProperty,$b=Object.defineProperties,Lb=Object.getOwnPropertyDescriptors,Hu=Object.getOwnPropertySymbols,Db=Object.prototype.hasOwnProperty,zb=Object.prototype.propertyIsEnumerable,ju=(t,e,r)=>e in t?Gb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,qn=(t,e)=>{for(var r in e||(e={}))Db.call(e,r)&&ju(t,r,e[r]);if(Hu)for(var r of Hu(e))zb.call(e,r)&&ju(t,r,e[r]);return t},Nb=(t,e)=>$b(t,Lb(e));const Wu=class extends he{constructor(t){var e;super(t),this.isReady=!1,this.uploadMethodId="video",t=qn(qn({},Wu.defaultOptions),t),this._autoUpdate=!0,this._isConnectedToTicker=!1,this._updateFPS=t.updateFPS||0,this._msToNextUpdate=0,this.autoPlay=t.autoPlay!==!1,this.alphaMode=(e=t.alphaMode)!=null?e:"premultiply-alpha-on-upload",this._videoFrameRequestCallback=this._videoFrameRequestCallback.bind(this),this._videoFrameRequestCallbackHandle=null,this._load=null,this._resolve=null,this._reject=null,this._onCanPlay=this._onCanPlay.bind(this),this._onError=this._onError.bind(this),this._onPlayStart=this._onPlayStart.bind(this),this._onPlayStop=this._onPlayStop.bind(this),this._onSeeked=this._onSeeked.bind(this),t.autoLoad!==!1&&this.load()}updateFrame(){if(!this.destroyed){if(this._updateFPS){const t=ce.shared.elapsedMS*this.resource.playbackRate;this._msToNextUpdate=Math.floor(this._msToNextUpdate-t)}(!this._updateFPS||this._msToNextUpdate<=0)&&(this._msToNextUpdate=this._updateFPS?Math.floor(1e3/this._updateFPS):0),this.isValid&&this.update()}}_videoFrameRequestCallback(){this.updateFrame(),this.destroyed?this._videoFrameRequestCallbackHandle=null:this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback)}get isValid(){return!!this.resource.videoWidth&&!!this.resource.videoHeight}async load(){if(this._load)return this._load;const t=this.resource;return(t.readyState===t.HAVE_ENOUGH_DATA||t.readyState===t.HAVE_FUTURE_DATA)&&t.width&&t.height&&(t.complete=!0),t.addEventListener("play",this._onPlayStart),t.addEventListener("pause",this._onPlayStop),t.addEventListener("seeked",this._onSeeked),this._isSourceReady()?this._onCanPlay():(this.options.preload||t.addEventListener("canplay",this._onCanPlay),t.addEventListener("canplaythrough",this._onCanPlay),t.addEventListener("error",this._onError,!0)),this.alphaMode=await Xn(),this._load=new Promise((e,r)=>{this.isValid?e(this):(this._resolve=e,this._reject=r,t.load())}),this._load}_onError(t){this.resource.removeEventListener("error",this._onError,!0),this.emit("error",t),this._reject&&(this._reject(t),this._reject=null,this._resolve=null)}_isSourcePlaying(){const t=this.resource;return!t.paused&&!t.ended}_isSourceReady(){return this.resource.readyState>2}_onPlayStart(){this.isValid||this._onCanPlay(),this._configureAutoUpdate()}_onPlayStop(){this._configureAutoUpdate()}_onSeeked(){this._autoUpdate&&!this._isSourcePlaying()&&(this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0)}_onCanPlay(){const t=this.resource;t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlay),this.isValid&&(this.isReady=!0,this.resize(t.videoWidth,t.videoHeight)),this._msToNextUpdate=0,this.updateFrame(),this._msToNextUpdate=0,this._resolve&&(this._resolve(this),this._resolve=null,this._reject=null),this._isSourcePlaying()?this._onPlayStart():this.autoPlay&&this.resource.play()}destroy(){this._configureAutoUpdate();const t=this.resource;t&&(t.removeEventListener("play",this._onPlayStart),t.removeEventListener("pause",this._onPlayStop),t.removeEventListener("seeked",this._onSeeked),t.removeEventListener("canplay",this._onCanPlay),t.removeEventListener("canplaythrough",this._onCanPlay),t.removeEventListener("error",this._onError,!0),t.pause(),t.src="",t.load()),super.destroy()}get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,this._configureAutoUpdate())}get updateFPS(){return this._updateFPS}set updateFPS(t){t!==this._updateFPS&&(this._updateFPS=t,this._configureAutoUpdate())}_configureAutoUpdate(){this._autoUpdate&&this._isSourcePlaying()?!this._updateFPS&&this.source.requestVideoFrameCallback?(this._isConnectedToTicker&&(ce.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0),this._videoFrameRequestCallbackHandle===null&&(this._videoFrameRequestCallbackHandle=this.source.requestVideoFrameCallback(this._videoFrameRequestCallback))):(this._videoFrameRequestCallbackHandle!==null&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker||(ce.shared.add(this.updateFrame,this),this._isConnectedToTicker=!0,this._msToNextUpdate=0)):(this._videoFrameRequestCallbackHandle!==null&&(this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),this._videoFrameRequestCallbackHandle=null),this._isConnectedToTicker&&(ce.shared.remove(this.updateFrame,this),this._isConnectedToTicker=!1,this._msToNextUpdate=0))}static test(t){return globalThis.HTMLVideoElement&&t instanceof HTMLVideoElement||globalThis.VideoFrame&&t instanceof VideoFrame}};let We=Wu;We.extension=b.TextureSource,We.defaultOptions=Nb(qn({},he.defaultOptions),{autoLoad:!0,autoPlay:!0,updateFPS:0,crossorigin:!0,loop:!1,muted:!0,playsinline:!0,preload:!1}),We.MIME_TYPES={ogv:"video/ogg",mov:"video/quicktime",m4v:"video/mp4"};var Hb=Object.defineProperty,jb=Object.defineProperties,Wb=Object.getOwnPropertyDescriptors,Vu=Object.getOwnPropertySymbols,Vb=Object.prototype.hasOwnProperty,Yb=Object.prototype.propertyIsEnumerable,Yu=(t,e,r)=>e in t?Hb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Kn=(t,e)=>{for(var r in e||(e={}))Vb.call(e,r)&&Yu(t,r,e[r]);if(Vu)for(var r of Vu(e))Yb.call(e,r)&&Yu(t,r,e[r]);return t},Xu=(t,e)=>jb(t,Wb(e));const qu=[".mp4",".m4v",".webm",".ogg",".ogv",".h264",".avi",".mov"],Xb=qu.map(t=>`video/${t.substring(1)}`);function Ku(t,e,r){r===void 0&&!e.startsWith("data:")?t.crossOrigin=Zu(e):r!==!1&&(t.crossOrigin=typeof r=="string"?r:"anonymous")}function Zu(t,e=globalThis.location){if(t.startsWith("data:"))return"";e=e||globalThis.location;const r=new URL(t,document.baseURI);return r.hostname!==e.hostname||r.port!==e.port||r.protocol!==e.protocol?"anonymous":""}const Qu={name:"loadVideo",extension:{type:b.LoadParser},config:null,test(t){const e=nt(t,Xb),r=st(t,qu);return e||r},async load(t,e,r){var i,n;const s=Kn(Xu(Kn({},We.defaultOptions),{resolution:((i=e.data)==null?void 0:i.resolution)||zn(t),alphaMode:((n=e.data)==null?void 0:n.alphaMode)||await Xn()}),e.data),o=document.createElement("video"),a={preload:s.autoLoad!==!1?"auto":void 0,"webkit-playsinline":s.playsinline!==!1?"":void 0,playsinline:s.playsinline!==!1?"":void 0,muted:s.muted===!0?"":void 0,loop:s.loop===!0?"":void 0,autoplay:s.autoPlay!==!1?"":void 0};Object.keys(a).forEach(c=>{const p=a[c];p!==void 0&&o.setAttribute(c,p)}),s.muted===!0&&(o.muted=!0),Ku(o,t,s.crossorigin);const l=document.createElement("source");let u;if(t.startsWith("data:"))u=t.slice(5,t.indexOf(";"));else if(!t.startsWith("blob:")){const c=t.split("?")[0].slice(t.lastIndexOf(".")+1).toLowerCase();u=We.MIME_TYPES[c]||`video/${c}`}l.src=t,u&&(l.type=u),o.appendChild(l);const h=new We(Xu(Kn({},s),{resource:o}));return Wn(h,r,t)},unload(t){t.destroy(!0)}},Ju={extension:b.ResolveParser,test:Vn.test,parse:t=>{var e,r;return{resolution:parseFloat((r=(e=Pt.RETINA_PREFIX.exec(t))==null?void 0:e[1])!=null?r:"1"),format:t.split(".").pop(),src:t}}};V.add(ru,su,iu,uu,ou,au,lu,hu,cu,gu,Ou,Vn,Qu,Ju,tu,eu);const eh={loader:b.LoadParser,resolver:b.ResolveParser,cache:b.CacheParser,detection:b.DetectionParser};V.handle(b.Asset,t=>{const e=t.ref;Object.entries(eh).filter(([r])=>!!e[r]).forEach(([r,i])=>{var n;return V.add(Object.assign(e[r],{extension:(n=e[r].extension)!=null?n:i}))})},t=>{const e=t.ref;Object.keys(eh).filter(r=>!!e[r]).forEach(r=>V.remove(e[r]))});class qb{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(e){this.removeTickerListener(),this.events=e,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(e){this._pauseUpdate=e}addTickerListener(){this._tickerAdded||!this.domElement||(ce.system.add(this._tickerUpdate,this,Je.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(ce.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const e=this.events._rootPointerEvent;this.events.supportsTouchEvents&&e.pointerType==="touch"||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:e.clientX,clientY:e.clientY}))}_tickerUpdate(e){this._deltaTime+=e.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this._update())}}const Le=new qb;class sr extends Dt{constructor(){super(...arguments),this.client=new W,this.movement=new W,this.offset=new W,this.global=new W,this.screen=new W}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(e,r,i){return e.worldTransform.applyInverse(i||this.global,r)}getModifierState(e){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(e)}initMouseEvent(e,r,i,n,s,o,a,l,u,h,c,p,d,f,m){throw new Error("Method not implemented.")}}class xe extends sr{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class dt extends sr{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}dt.DOM_DELTA_PIXEL=0,dt.DOM_DELTA_LINE=1,dt.DOM_DELTA_PAGE=2;const Kb=2048,Zb=new W,or=new W;class th{constructor(e){this.dispatch=new ue,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=e,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(e,r){this.mappingTable[e]||(this.mappingTable[e]=[]),this.mappingTable[e].push({fn:r,priority:0}),this.mappingTable[e].sort((i,n)=>i.priority-n.priority)}dispatchEvent(e,r){e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,this.propagate(e,r),this.dispatch.emit(r||e.type,e)}mapEvent(e){if(!this.rootTarget)return;const r=this.mappingTable[e.type];if(r)for(let i=0,n=r.length;i<n;i++)r[i].fn(e)}hitTest(e,r){Le.pauseUpdate=!0;const i=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",n=this[i](this.rootTarget,this.rootTarget.eventMode,Zb.set(e,r),this.hitTestFn,this.hitPruneFn);return n&&n[0]}propagate(e,r){if(!e.target)return;const i=e.composedPath();e.eventPhase=e.CAPTURING_PHASE;for(let n=0,s=i.length-1;n<s;n++)if(e.currentTarget=i[n],this.notifyTarget(e,r),e.propagationStopped||e.propagationImmediatelyStopped)return;if(e.eventPhase=e.AT_TARGET,e.currentTarget=e.target,this.notifyTarget(e,r),!(e.propagationStopped||e.propagationImmediatelyStopped)){e.eventPhase=e.BUBBLING_PHASE;for(let n=i.length-2;n>=0;n--)if(e.currentTarget=i[n],this.notifyTarget(e,r),e.propagationStopped||e.propagationImmediatelyStopped)return}}all(e,r,i=this._allInteractiveElements){if(i.length===0)return;e.eventPhase=e.BUBBLING_PHASE;const n=Array.isArray(r)?r:[r];for(let s=i.length-1;s>=0;s--)n.forEach(o=>{e.currentTarget=i[s],this.notifyTarget(e,o)})}propagationPath(e){const r=[e];for(let i=0;i<Kb&&e!==this.rootTarget&&e.parent;i++){if(!e.parent)throw new Error("Cannot find propagation path to disconnected target");r.push(e.parent),e=e.parent}return r.reverse(),r}hitTestMoveRecursive(e,r,i,n,s,o=!1){let a=!1;if(this._interactivePrune(e))return null;if((e.eventMode==="dynamic"||r==="dynamic")&&(Le.pauseUpdate=!1),e.interactiveChildren&&e.children){const h=e.children;for(let c=h.length-1;c>=0;c--){const p=h[c],d=this.hitTestMoveRecursive(p,this._isInteractive(r)?r:p.eventMode,i,n,s,o||s(e,i));if(d){if(d.length>0&&!d[d.length-1].parent)continue;const f=e.isInteractive();(d.length>0||f)&&(f&&this._allInteractiveElements.push(e),d.push(e)),this._hitElements.length===0&&(this._hitElements=d),a=!0}}}const l=this._isInteractive(r),u=e.isInteractive();return u&&u&&this._allInteractiveElements.push(e),o||this._hitElements.length>0?null:a?this._hitElements:l&&!s(e,i)&&n(e,i)?u?[e]:[]:null}hitTestRecursive(e,r,i,n,s){if(this._interactivePrune(e)||s(e,i))return null;if((e.eventMode==="dynamic"||r==="dynamic")&&(Le.pauseUpdate=!1),e.interactiveChildren&&e.children){const l=e.children,u=i;for(let h=l.length-1;h>=0;h--){const c=l[h],p=this.hitTestRecursive(c,this._isInteractive(r)?r:c.eventMode,u,n,s);if(p){if(p.length>0&&!p[p.length-1].parent)continue;const d=e.isInteractive();return(p.length>0||d)&&p.push(e),p}}}const o=this._isInteractive(r),a=e.isInteractive();return o&&n(e,i)?a?[e]:[]:null}_isInteractive(e){return e==="static"||e==="dynamic"}_interactivePrune(e){return!e||!e.visible||!e.renderable||e.eventMode==="none"||e.eventMode==="passive"&&!e.interactiveChildren}hitPruneFn(e,r){if(e.hitArea&&(e.worldTransform.applyInverse(r,or),!e.hitArea.contains(or.x,or.y)))return!0;if(e.effects&&e.effects.length)for(let i=0;i<e.effects.length;i++){const n=e.effects[i];if(n.containsPoint&&!n.containsPoint(r,this.hitTestFn))return!0}return!1}hitTestFn(e,r){var i;return e.hitArea?!0:(i=e.view)!=null&&i.containsPoint?(e.worldTransform.applyInverse(r,or),e.view.containsPoint(or)):!1}notifyTarget(e,r){var i,n;r=r!=null?r:e.type;const s=`on${r}`;(n=(i=e.currentTarget)[s])==null||n.call(i,e);const o=e.eventPhase===e.CAPTURING_PHASE||e.eventPhase===e.AT_TARGET?`${r}capture`:r;this._notifyListeners(e,o),e.eventPhase===e.AT_TARGET&&this._notifyListeners(e,r)}mapPointerDown(e){if(!(e instanceof xe))return;const r=this.createPointerEvent(e);if(this.dispatchEvent(r,"pointerdown"),r.pointerType==="touch")this.dispatchEvent(r,"touchstart");else if(r.pointerType==="mouse"||r.pointerType==="pen"){const n=r.button===2;this.dispatchEvent(r,n?"rightdown":"mousedown")}const i=this.trackingData(e.pointerId);i.pressTargetsByButton[e.button]=r.composedPath(),this.freeEvent(r)}mapPointerMove(e){var r,i,n;if(!(e instanceof xe))return;this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const s=this.createPointerEvent(e);this._isPointerMoveEvent=!1;const o=s.pointerType==="mouse"||s.pointerType==="pen",a=this.trackingData(e.pointerId),l=this.findMountedTarget(a.overTargets);if(((r=a.overTargets)==null?void 0:r.length)>0&&l!==s.target){const c=e.type==="mousemove"?"mouseout":"pointerout",p=this.createPointerEvent(e,c,l);if(this.dispatchEvent(p,"pointerout"),o&&this.dispatchEvent(p,"mouseout"),!s.composedPath().includes(l)){const d=this.createPointerEvent(e,"pointerleave",l);for(d.eventPhase=d.AT_TARGET;d.target&&!s.composedPath().includes(d.target);)d.currentTarget=d.target,this.notifyTarget(d),o&&this.notifyTarget(d,"mouseleave"),d.target=d.target.parent;this.freeEvent(d)}this.freeEvent(p)}if(l!==s.target){const c=e.type==="mousemove"?"mouseover":"pointerover",p=this.clonePointerEvent(s,c);this.dispatchEvent(p,"pointerover"),o&&this.dispatchEvent(p,"mouseover");let d=l==null?void 0:l.parent;for(;d&&d!==this.rootTarget.parent&&d!==s.target;)d=d.parent;if(!d||d===this.rootTarget.parent){const f=this.clonePointerEvent(s,"pointerenter");for(f.eventPhase=f.AT_TARGET;f.target&&f.target!==l&&f.target!==this.rootTarget.parent;)f.currentTarget=f.target,this.notifyTarget(f),o&&this.notifyTarget(f,"mouseenter"),f.target=f.target.parent;this.freeEvent(f)}this.freeEvent(p)}const u=[],h=(i=this.enableGlobalMoveEvents)!=null?i:!0;this.moveOnAll?u.push("pointermove"):this.dispatchEvent(s,"pointermove"),h&&u.push("globalpointermove"),s.pointerType==="touch"&&(this.moveOnAll?u.splice(1,0,"touchmove"):this.dispatchEvent(s,"touchmove"),h&&u.push("globaltouchmove")),o&&(this.moveOnAll?u.splice(1,0,"mousemove"):this.dispatchEvent(s,"mousemove"),h&&u.push("globalmousemove"),this.cursor=(n=s.target)==null?void 0:n.cursor),u.length>0&&this.all(s,u),this._allInteractiveElements.length=0,this._hitElements.length=0,a.overTargets=s.composedPath(),this.freeEvent(s)}mapPointerOver(e){var r;if(!(e instanceof xe))return;const i=this.trackingData(e.pointerId),n=this.createPointerEvent(e),s=n.pointerType==="mouse"||n.pointerType==="pen";this.dispatchEvent(n,"pointerover"),s&&this.dispatchEvent(n,"mouseover"),n.pointerType==="mouse"&&(this.cursor=(r=n.target)==null?void 0:r.cursor);const o=this.clonePointerEvent(n,"pointerenter");for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),s&&this.notifyTarget(o,"mouseenter"),o.target=o.target.parent;i.overTargets=n.composedPath(),this.freeEvent(n),this.freeEvent(o)}mapPointerOut(e){if(!(e instanceof xe))return;const r=this.trackingData(e.pointerId);if(r.overTargets){const i=e.pointerType==="mouse"||e.pointerType==="pen",n=this.findMountedTarget(r.overTargets),s=this.createPointerEvent(e,"pointerout",n);this.dispatchEvent(s),i&&this.dispatchEvent(s,"mouseout");const o=this.createPointerEvent(e,"pointerleave",n);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),i&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;r.overTargets=null,this.freeEvent(s),this.freeEvent(o)}this.cursor=null}mapPointerUp(e){if(!(e instanceof xe))return;const r=performance.now(),i=this.createPointerEvent(e);if(this.dispatchEvent(i,"pointerup"),i.pointerType==="touch")this.dispatchEvent(i,"touchend");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const a=i.button===2;this.dispatchEvent(i,a?"rightup":"mouseup")}const n=this.trackingData(e.pointerId),s=this.findMountedTarget(n.pressTargetsByButton[e.button]);let o=s;if(s&&!i.composedPath().includes(s)){let a=s;for(;a&&!i.composedPath().includes(a);){if(i.currentTarget=a,this.notifyTarget(i,"pointerupoutside"),i.pointerType==="touch")this.notifyTarget(i,"touchendoutside");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const l=i.button===2;this.notifyTarget(i,l?"rightupoutside":"mouseupoutside")}a=a.parent}delete n.pressTargetsByButton[e.button],o=a}if(o){const a=this.clonePointerEvent(i,"click");a.target=o,a.path=null,n.clicksByButton[e.button]||(n.clicksByButton[e.button]={clickCount:0,target:a.target,timeStamp:r});const l=n.clicksByButton[e.button];if(l.target===a.target&&r-l.timeStamp<200?++l.clickCount:l.clickCount=1,l.target=a.target,l.timeStamp=r,a.detail=l.clickCount,a.pointerType==="mouse"){const u=a.button===2;this.dispatchEvent(a,u?"rightclick":"click")}else a.pointerType==="touch"&&this.dispatchEvent(a,"tap");this.dispatchEvent(a,"pointertap"),this.freeEvent(a)}this.freeEvent(i)}mapPointerUpOutside(e){if(!(e instanceof xe))return;const r=this.trackingData(e.pointerId),i=this.findMountedTarget(r.pressTargetsByButton[e.button]),n=this.createPointerEvent(e);if(i){let s=i;for(;s;)n.currentTarget=s,this.notifyTarget(n,"pointerupoutside"),n.pointerType==="touch"?this.notifyTarget(n,"touchendoutside"):(n.pointerType==="mouse"||n.pointerType==="pen")&&this.notifyTarget(n,n.button===2?"rightupoutside":"mouseupoutside"),s=s.parent;delete r.pressTargetsByButton[e.button]}this.freeEvent(n)}mapWheel(e){if(!(e instanceof dt))return;const r=this.createWheelEvent(e);this.dispatchEvent(r),this.freeEvent(r)}findMountedTarget(e){if(!e)return null;let r=e[0];for(let i=1;i<e.length&&e[i].parent===r;i++)r=e[i];return r}createPointerEvent(e,r,i){var n;const s=this.allocateEvent(xe);return this.copyPointerData(e,s),this.copyMouseData(e,s),this.copyData(e,s),s.nativeEvent=e.nativeEvent,s.originalEvent=e,s.target=(n=i!=null?i:this.hitTest(s.global.x,s.global.y))!=null?n:this._hitElements[0],typeof r=="string"&&(s.type=r),s}createWheelEvent(e){const r=this.allocateEvent(dt);return this.copyWheelData(e,r),this.copyMouseData(e,r),this.copyData(e,r),r.nativeEvent=e.nativeEvent,r.originalEvent=e,r.target=this.hitTest(r.global.x,r.global.y),r}clonePointerEvent(e,r){const i=this.allocateEvent(xe);return i.nativeEvent=e.nativeEvent,i.originalEvent=e.originalEvent,this.copyPointerData(e,i),this.copyMouseData(e,i),this.copyData(e,i),i.target=e.target,i.path=e.composedPath().slice(),i.type=r!=null?r:i.type,i}copyWheelData(e,r){r.deltaMode=e.deltaMode,r.deltaX=e.deltaX,r.deltaY=e.deltaY,r.deltaZ=e.deltaZ}copyPointerData(e,r){e instanceof xe&&r instanceof xe&&(r.pointerId=e.pointerId,r.width=e.width,r.height=e.height,r.isPrimary=e.isPrimary,r.pointerType=e.pointerType,r.pressure=e.pressure,r.tangentialPressure=e.tangentialPressure,r.tiltX=e.tiltX,r.tiltY=e.tiltY,r.twist=e.twist)}copyMouseData(e,r){e instanceof sr&&r instanceof sr&&(r.altKey=e.altKey,r.button=e.button,r.buttons=e.buttons,r.client.copyFrom(e.client),r.ctrlKey=e.ctrlKey,r.metaKey=e.metaKey,r.movement.copyFrom(e.movement),r.screen.copyFrom(e.screen),r.shiftKey=e.shiftKey,r.global.copyFrom(e.global))}copyData(e,r){r.isTrusted=e.isTrusted,r.srcElement=e.srcElement,r.timeStamp=performance.now(),r.type=e.type,r.detail=e.detail,r.view=e.view,r.which=e.which,r.layer.copyFrom(e.layer),r.page.copyFrom(e.page)}trackingData(e){return this.mappingState.trackingData[e]||(this.mappingState.trackingData[e]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[e]}allocateEvent(e){this.eventPool.has(e)||this.eventPool.set(e,[]);const r=this.eventPool.get(e).pop()||new e(this);return r.eventPhase=r.NONE,r.currentTarget=null,r.path=null,r.target=null,r}freeEvent(e){if(e.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const r=e.constructor;this.eventPool.has(r)||this.eventPool.set(r,[]),this.eventPool.get(r).push(e)}_notifyListeners(e,r){const i=e.currentTarget._events[r];if(i&&e.currentTarget.isInteractive())if("fn"in i)i.once&&e.currentTarget.removeListener(r,i.fn,void 0,!0),i.fn.call(i.context,e);else for(let n=0,s=i.length;n<s&&!e.propagationImmediatelyStopped;n++)i[n].once&&e.currentTarget.removeListener(r,i[n].fn,void 0,!0),i[n].fn.call(i[n].context,e)}}var Qb=Object.defineProperty,rh=Object.getOwnPropertySymbols,Jb=Object.prototype.hasOwnProperty,ev=Object.prototype.propertyIsEnumerable,ih=(t,e,r)=>e in t?Qb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,tv=(t,e)=>{for(var r in e||(e={}))Jb.call(e,r)&&ih(t,r,e[r]);if(rh)for(var r of rh(e))ev.call(e,r)&&ih(t,r,e[r]);return t};const rv=1,iv={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},Zn=class{constructor(t){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=t,this.rootBoundary=new th(null),Le.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new xe(null),this._rootWheelEvent=new dt(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy(tv({},Zn.defaultEventFeatures),{set:(e,r,i)=>(r==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=i),e[r]=i,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(t){var e,r;const{canvas:i,resolution:n}=this.renderer;this.setTargetElement(i),this.resolution=n,Zn._defaultEventMode=(e=t.eventMode)!=null?e:"passive",Object.assign(this.features,(r=t.eventFeatures)!=null?r:{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(t){this.resolution=t}destroy(){this.setTargetElement(null),this.renderer=null,this._currentCursor=null}setCursor(t){t=t||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this._currentCursor===t)return;this._currentCursor=t;const r=this.cursorStyles[t];if(r)switch(typeof r){case"string":e&&(this.domElement.style.cursor=r);break;case"function":r(t);break;case"object":e&&Object.assign(this.domElement.style,r);break}else e&&typeof t=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,t)&&(this.domElement.style.cursor=t)}get pointer(){return this._rootPointerEvent}_onPointerDown(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(t);this.autoPreventDefault&&e[0].isNormalized&&(t.cancelable||!("cancelable"in t))&&t.preventDefault();for(let r=0,i=e.length;r<i;r++){const n=e[r],s=this._bootstrapEvent(this._rootPointerEvent,n);this.rootBoundary.mapEvent(s)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(t){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,Le.pointerMoved();const e=this._normalizeToPointerData(t);for(let r=0,i=e.length;r<i;r++){const n=this._bootstrapEvent(this._rootPointerEvent,e[r]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=t.target;t.composedPath&&t.composedPath().length>0&&(e=t.composedPath()[0]);const r=e!==this.domElement?"outside":"",i=this._normalizeToPointerData(t);for(let n=0,s=i.length;n<s;n++){const o=this._bootstrapEvent(this._rootPointerEvent,i[n]);o.type+=r,this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(t);for(let r=0,i=e.length;r<i;r++){const n=this._bootstrapEvent(this._rootPointerEvent,e[r]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}onWheel(t){if(!this.features.wheel)return;const e=this.normalizeWheelEvent(t);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}setTargetElement(t){this._removeEvents(),this.domElement=t,Le.domElement=t,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;Le.addTickerListener();const t=this.domElement.style;t&&(globalThis.navigator.msPointerEnabled?(t.msContentZooming="none",t.msTouchAction="none"):this.supportsPointerEvents&&(t.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;Le.removeTickerListener();const t=this.domElement.style;globalThis.navigator.msPointerEnabled?(t.msContentZooming="",t.msTouchAction=""):this.supportsPointerEvents&&(t.touchAction=""),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(t,e,r){const i=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},n=1/this.resolution;t.x=(e-i.left)*(this.domElement.width/i.width)*n,t.y=(r-i.top)*(this.domElement.height/i.height)*n}_normalizeToPointerData(t){const e=[];if(this.supportsTouchEvents&&t instanceof TouchEvent)for(let r=0,i=t.changedTouches.length;r<i;r++){const n=t.changedTouches[r];typeof n.button=="undefined"&&(n.button=0),typeof n.buttons=="undefined"&&(n.buttons=1),typeof n.isPrimary=="undefined"&&(n.isPrimary=t.touches.length===1&&t.type==="touchstart"),typeof n.width=="undefined"&&(n.width=n.radiusX||1),typeof n.height=="undefined"&&(n.height=n.radiusY||1),typeof n.tiltX=="undefined"&&(n.tiltX=0),typeof n.tiltY=="undefined"&&(n.tiltY=0),typeof n.pointerType=="undefined"&&(n.pointerType="touch"),typeof n.pointerId=="undefined"&&(n.pointerId=n.identifier||0),typeof n.pressure=="undefined"&&(n.pressure=n.force||.5),typeof n.twist=="undefined"&&(n.twist=0),typeof n.tangentialPressure=="undefined"&&(n.tangentialPressure=0),typeof n.layerX=="undefined"&&(n.layerX=n.offsetX=n.clientX),typeof n.layerY=="undefined"&&(n.layerY=n.offsetY=n.clientY),n.isNormalized=!0,n.type=t.type,e.push(n)}else if(!globalThis.MouseEvent||t instanceof MouseEvent&&(!this.supportsPointerEvents||!(t instanceof globalThis.PointerEvent))){const r=t;typeof r.isPrimary=="undefined"&&(r.isPrimary=!0),typeof r.width=="undefined"&&(r.width=1),typeof r.height=="undefined"&&(r.height=1),typeof r.tiltX=="undefined"&&(r.tiltX=0),typeof r.tiltY=="undefined"&&(r.tiltY=0),typeof r.pointerType=="undefined"&&(r.pointerType="mouse"),typeof r.pointerId=="undefined"&&(r.pointerId=rv),typeof r.pressure=="undefined"&&(r.pressure=.5),typeof r.twist=="undefined"&&(r.twist=0),typeof r.tangentialPressure=="undefined"&&(r.tangentialPressure=0),r.isNormalized=!0,e.push(r)}else e.push(t);return e}normalizeWheelEvent(t){const e=this._rootWheelEvent;return this._transferMouseData(e,t),e.deltaX=t.deltaX,e.deltaY=t.deltaY,e.deltaZ=t.deltaZ,e.deltaMode=t.deltaMode,this.mapPositionToPoint(e.screen,t.clientX,t.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=t,e.type=t.type,e}_bootstrapEvent(t,e){return t.originalEvent=null,t.nativeEvent=e,t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist,this._transferMouseData(t,e),this.mapPositionToPoint(t.screen,e.clientX,e.clientY),t.global.copyFrom(t.screen),t.offset.copyFrom(t.screen),t.isTrusted=e.isTrusted,t.type==="pointerleave"&&(t.type="pointerout"),t.type.startsWith("mouse")&&(t.type=t.type.replace("mouse","pointer")),t.type.startsWith("touch")&&(t.type=iv[t.type]||t.type),t}_transferMouseData(t,e){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.x=e.clientX,t.client.y=e.clientY,t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.x=e.movementX,t.movement.y=e.movementY,t.page.x=e.pageX,t.page.y=e.pageY,t.relatedTarget=null,t.shiftKey=e.shiftKey}};let ar=Zn;ar.extension={name:"events",type:[b.WebGLSystem,b.CanvasSystem,b.WebGPUSystem],priority:-1},ar.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};const nh={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(t){this.eventMode=t?"static":"passive"},_internalEventMode:void 0,get eventMode(){var t;return(t=this._internalEventMode)!=null?t:ar.defaultEventMode},set eventMode(t){this._internalEventMode=t},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(t,e,r){const i=typeof r=="boolean"&&r||typeof r=="object"&&r.capture,n=typeof e=="function"?void 0:e;t=i?`${t}capture`:t,e=typeof e=="function"?e:e.handleEvent,this.on(t,e,n)},removeEventListener(t,e,r){const i=typeof r=="boolean"&&r||typeof r=="object"&&r.capture,n=typeof e=="function"?void 0:e;t=i?`${t}capture`:t,e=typeof e=="function"?e:e.handleEvent,this.off(t,e,n)},dispatchEvent(t){if(!(t instanceof Dt))throw new Error("Container cannot propagate events outside of the Federated Events API");return t.defaultPrevented=!1,t.path=null,t.target=this,t.manager.dispatchEvent(t),!t.defaultPrevented}};V.add(ar),Y.mixin(nh);const lr=class{constructor(t,e){this.linkedSheets=[],this._texture=t instanceof A?t:null,this.textureSource=t.source,this.textures={},this.animations={},this.data=e;const r=parseFloat(e.meta.scale);r?(this.resolution=r,t.source.resolution=this.resolution):this.resolution=t.source._resolution,this._frames=this.data.frames,this._frameKeys=Object.keys(this._frames),this._batchIndex=0,this._callback=null}parse(){return new Promise(t=>{this._callback=t,this._batchIndex=0,this._frameKeys.length<=lr.BATCH_SIZE?(this._processFrames(0),this._processAnimations(),this._parseComplete()):this._nextBatch()})}_processFrames(t){let e=t;const r=lr.BATCH_SIZE;for(;e-t<r&&e<this._frameKeys.length;){const i=this._frameKeys[e],n=this._frames[i],s=n.frame;if(s){let o=null,a=null;const l=n.trimmed!==!1&&n.sourceSize?n.sourceSize:n.frame,u=new Q(0,0,Math.floor(l.w)/this.resolution,Math.floor(l.h)/this.resolution);n.rotated?o=new Q(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.h)/this.resolution,Math.floor(s.w)/this.resolution):o=new Q(Math.floor(s.x)/this.resolution,Math.floor(s.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),n.trimmed!==!1&&n.spriteSourceSize&&(a=new Q(Math.floor(n.spriteSourceSize.x)/this.resolution,Math.floor(n.spriteSourceSize.y)/this.resolution,Math.floor(s.w)/this.resolution,Math.floor(s.h)/this.resolution),a.x/=this.textureSource.width,a.y/=this.textureSource.height,a.width/=this.textureSource.width,a.height/=this.textureSource.height),o.x/=this.textureSource.width,o.y/=this.textureSource.height,o.width/=this.textureSource.width,o.height/=this.textureSource.height,u.x/=this.textureSource.width,u.y/=this.textureSource.height,u.width/=this.textureSource.width,u.height/=this.textureSource.height,this.textures[i]=new A({source:this.textureSource,layout:{frame:o,orig:u,trim:a,rotate:n.rotated?2:0,defaultAnchor:n.anchor,defaultBorders:n.borders},label:i.toString()})}e++}}_processAnimations(){const t=this.data.animations||{};for(const e in t){this.animations[e]=[];for(let r=0;r<t[e].length;r++){const i=t[e][r];this.animations[e].push(this.textures[i])}}}_parseComplete(){const t=this._callback;this._callback=null,this._batchIndex=0,t.call(this,this.textures)}_nextBatch(){this._processFrames(this._batchIndex*lr.BATCH_SIZE),this._batchIndex++,setTimeout(()=>{this._batchIndex*lr.BATCH_SIZE<this._frameKeys.length?this._nextBatch():(this._processAnimations(),this._parseComplete())},0)}destroy(t=!1){var e;for(const r in this.textures)this.textures[r].destroy();this._frames=null,this._frameKeys=null,this.data=null,this.textures=null,t&&((e=this._texture)==null||e.destroy(),this.textureSource.destroy()),this._texture=null,this.textureSource=null,this.linkedSheets=[]}};let ri=lr;ri.BATCH_SIZE=1e3;const nv=["jpg","png","jpeg","avif","webp"];function sh(t,e,r){const i={};if(t.forEach(n=>{i[n]=e}),Object.keys(e.textures).forEach(n=>{i[n]=e.textures[n]}),!r){const n=de.dirname(t[0]);e.linkedSheets.forEach((s,o)=>{const a=sh([`${n}/${e.data.meta.related_multi_packs[o]}`],s,!0);Object.assign(i,a)})}return i}const oh={extension:b.Asset,cache:{test:t=>t instanceof ri,getCacheableAssets:(t,e)=>sh(t,e,!1)},resolver:{test:t=>{const e=t.split("?")[0].split("."),r=e.pop(),i=e.pop();return r==="json"&&nv.includes(i)},parse:t=>{var e,r;const i=t.split(".");return{resolution:parseFloat((r=(e=Pt.RETINA_PREFIX.exec(t))==null?void 0:e[1])!=null?r:"1"),format:i[i.length-2],src:t}}},loader:{name:"spritesheetLoader",extension:{type:b.LoadParser,priority:Ge.Normal},async testParse(t,e){return de.extname(e.src).toLowerCase()===".json"&&!!t.frames},async parse(t,e,r){var i,n;let s=de.dirname(e.src);s&&s.lastIndexOf("/")!==s.length-1&&(s+="/");let o=s+t.meta.image;o=Vr(o,e.src);const a=(await r.load([o]))[o],l=new ri(a.source,t);await l.parse();const u=(i=t==null?void 0:t.meta)==null?void 0:i.related_multi_packs;if(Array.isArray(u)){const h=[];for(const p of u){if(typeof p!="string")continue;let d=s+p;(n=e.data)!=null&&n.ignoreMultiPack||(d=Vr(d,e.src),h.push(r.load({src:d,data:{ignoreMultiPack:!0}})))}const c=await Promise.all(h);l.linkedSheets=c,c.forEach(p=>{p.linkedSheets=[l].concat(l.linkedSheets.filter(d=>d!==p))})}return l},unload(t){t.destroy(!0)}}};V.add(oh);const At={onViewUpdate:()=>{}};function ur(t,e,r,i){const n=r._source,s=r.layout,o=s.orig,a=s.trim,l=n.width,u=n.height,h=l*o.width,c=u*o.height;if(a){const p=l*a.width,d=u*a.height;t[0]=a.x*l-e._x*h-i,t[1]=t[0]+p,t[2]=a.y*u-e._y*c-i,t[3]=t[2]+d}else t[0]=-e._x*h-i,t[1]=t[0]+h,t[2]=-e._y*c-i,t[3]=t[2]+c}class ah{constructor(e){this.renderPipeId="sprite",this.owner=At,this.uid=q("spriteView"),this.batched=!0,this._didUpdate=!1,this._bounds=[0,1,0,0],this._sourceBounds=[0,1,0,0],this._boundsDirty=!0,this._sourceBoundsDirty=!0,this.roundPixels=0;var r,i;this.anchor=new se(this,((r=e.layout.defaultAnchor)==null?void 0:r.x)||0,((i=e.layout.defaultAnchor)==null?void 0:i.y)||0),this.texture=e}set texture(e){e||(e=A.EMPTY),this._texture!==e&&(this._texture&&this._texture.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._texture=e,this.onUpdate())}get texture(){return this._texture}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}get sourceBounds(){return this._sourceBoundsDirty&&(this._updateSourceBounds(),this._sourceBoundsDirty=!1),this._sourceBounds}containsPoint(e){const r=this._texture.frameWidth,i=this._texture.frameHeight,n=-r*this.anchor.x;let s=0;return e.x>=n&&e.x<n+r&&(s=-i*this.anchor.y,e.y>=s&&e.y<s+i)}addBounds(e){if(this._texture._layout.trim){const r=this.sourceBounds;e.addFrame(r[0],r[2],r[1],r[3])}else{const r=this.bounds;e.addFrame(r[0],r[2],r[1],r[3])}}onUpdate(){this._didUpdate=!0,this._sourceBoundsDirty=this._boundsDirty=!0,this.owner.onViewUpdate()}_updateBounds(){ur(this._bounds,this.anchor,this._texture,0)}_updateSourceBounds(){const e=this.anchor,r=this._texture,i=r._source,n=r.layout.orig,s=this._sourceBounds,o=i.width*n.width,a=i.height*n.height;s[1]=-e._x*o,s[0]=s[1]+o,s[3]=-e._y*a,s[2]=s[3]+a}destroy(e=!1){if(this.anchor=null,typeof e=="boolean"?e:e==null?void 0:e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(r)}this._texture=null,this._bounds=null,this._sourceBounds=null}}var sv=Object.defineProperty,ii=Object.getOwnPropertySymbols,lh=Object.prototype.hasOwnProperty,uh=Object.prototype.propertyIsEnumerable,hh=(t,e,r)=>e in t?sv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ov=(t,e)=>{for(var r in e||(e={}))lh.call(e,r)&&hh(t,r,e[r]);if(ii)for(var r of ii(e))uh.call(e,r)&&hh(t,r,e[r]);return t},av=(t,e)=>{var r={};for(var i in t)lh.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&ii)for(var i of ii(t))e.indexOf(i)<0&&uh.call(t,i)&&(r[i]=t[i]);return r};class Oe extends Y{static from(e){return typeof e=="string"?new Oe(Z.get(e)):new Oe(e)}constructor(e=A.EMPTY){e instanceof A&&(e={texture:e});const r=e,{texture:i}=r,n=av(r,["texture"]);super(ov({view:new ah(i!=null?i:A.EMPTY),label:"Sprite"},n)),this.allowChildren=!1}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}const lv=new pe;function ni(t,e,r){const i=lv;t.measurable=!0,qt(t,r,i),e.addBoundsMask(i),t.measurable=!1}function si(t,e,r){const i=new pe;t.measurable=!0;const n=Qn(t,r,new k);He(t,i,n),t.measurable=!1,e.addBoundsMask(i)}function Qn(t,e,r){return t&&t!==e&&(Qn(t.parent,e,r),t.didChange&&Ue(t.localTransform,t),r.append(t.localTransform)),r}class Jn{constructor(e){this.priority=0,this.pipe="alphaMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.renderMaskToTexture=!(e instanceof Oe),this.mask.renderable=this.renderMaskToTexture,this.mask.includeInBuild=!this.renderMaskToTexture,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask=null}addBounds(e,r){ni(this.mask,e,r)}addLocalBounds(e,r){si(this.mask,e,r)}containsPoint(e,r){const i=this.mask;return r(i,e)}destroy(){this.reset()}static test(e){return e instanceof Oe}}Jn.extension=b.MaskEffect;class es{constructor(e){this.priority=0,this.pipe="colorMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e}destroy(){}static test(e){return typeof e=="number"}}es.extension=b.MaskEffect;class ts{constructor(e){this.priority=0,this.pipe="stencilMask",e!=null&&e.mask&&this.init(e.mask)}init(e){this.mask=e,this.mask.includeInBuild=!1,this.mask.measurable=!1}reset(){this.mask.measurable=!0,this.mask.includeInBuild=!0,this.mask=null}addBounds(e,r){ni(this.mask,e,r)}addLocalBounds(e,r){si(this.mask,e,r)}containsPoint(e,r){const i=this.mask;return r(i,e)}destroy(){this.reset()}static test(e){return e instanceof Y}}ts.extension=b.MaskEffect;var uv=Object.defineProperty,hv=Object.defineProperties,cv=Object.getOwnPropertyDescriptors,ch=Object.getOwnPropertySymbols,dv=Object.prototype.hasOwnProperty,pv=Object.prototype.propertyIsEnumerable,dh=(t,e,r)=>e in t?uv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,fv=(t,e)=>{for(var r in e||(e={}))dv.call(e,r)&&dh(t,r,e[r]);if(ch)for(var r of ch(e))pv.call(e,r)&&dh(t,r,e[r]);return t},gv=(t,e)=>hv(t,cv(e));class rs extends he{constructor(e){const r=e.resource||new Float32Array(e.width*e.height*4);let i=e.format;i||(r instanceof Float32Array?i="rgba32float":r instanceof Int32Array||r instanceof Uint32Array?i="rgba32uint":r instanceof Int16Array||r instanceof Uint16Array?i="rgba16uint":(r instanceof Int8Array,i="bgra8unorm")),super(gv(fv({},e),{format:i})),this.uploadMethodId="buffer"}static test(e){return e instanceof Int8Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array}}rs.extension=b.TextureSource;class oi extends he{constructor(e){var r;e.resource||(e.resource=j.get().createCanvas()),e.width||(e.width=e.resource.width,e.autoDensity||(e.width/=e.resolution)),e.height||(e.height=e.resource.height,e.autoDensity||(e.height/=e.resolution)),(r=e.alphaMode)!=null||(e.alphaMode="premultiply-alpha-on-upload"),super(e),this.uploadMethodId="image",this.autoDensity=e.autoDensity;const i=e.resource;(this.pixelWidth!==i.width||this.pixelWidth!==i.height)&&this.resizeCanvas()}resizeCanvas(){this.autoDensity&&(this.resource.style.width=`${this.width}px`,this.resource.style.height=`${this.height}px`),this.resource.width=this.pixelWidth,this.resource.height=this.pixelHeight}resize(e=this.width,r=this.height,i=this._resolution){super.resize(e,r,i),this.resizeCanvas()}static test(e){return globalThis.HTMLCanvasElement&&e instanceof HTMLCanvasElement||globalThis.OffscreenCanvas&&e instanceof OffscreenCanvas}}oi.extension=b.TextureSource,V.add(Jn,es,ts,We,at,oi,rs);var mv={__proto__:null};let is;function bv(t){return typeof is=="undefined"&&(is=function(){var e;const r={stencil:!0,failIfMajorPerformanceCaveat:t};try{if(!j.get().getWebGLRenderingContext())return!1;let i=j.get().createCanvas().getContext("webgl2",r);const n=!!((e=i==null?void 0:i.getContextAttributes())!=null&&e.stencil);if(i){const s=i.getExtension("WEBGL_lose_context");s&&s.loseContext()}return i=null,n}catch(i){return!1}}()),is}async function vv(t={}){if(!j.get().getNavigator().gpu)return!1;try{return await(await navigator.gpu.requestAdapter(t)).requestDevice(),!0}catch(e){return!1}}class ai{constructor(e){this.items=[],this._name=e}emit(e,r,i,n,s,o,a,l){const{name:u,items:h}=this;for(let c=0,p=h.length;c<p;c++)h[c][u](e,r,i,n,s,o,a,l);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){const r=this.items.indexOf(e);return r!==-1&&this.items.splice(r,1),this}contains(e){return this.items.indexOf(e)!==-1}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return this.items.length===0}get name(){return this._name}}var yv=Object.defineProperty,ph=Object.getOwnPropertySymbols,xv=Object.prototype.hasOwnProperty,_v=Object.prototype.propertyIsEnumerable,fh=(t,e,r)=>e in t?yv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,li=(t,e)=>{for(var r in e||(e={}))xv.call(e,r)&&fh(t,r,e[r]);if(ph)for(var r of ph(e))_v.call(e,r)&&fh(t,r,e[r]);return t};const wv=["init","destroy","contextChange","resolutionChange","reset","renderEnd","renderStart","render","update","postrender","prerender"],gh=class{constructor(t){this.runners=Object.create(null),this.renderPipes=Object.create(null),this._systemsHash=Object.create(null);var e;this.type=t.type,this.name=t.name;const r=[...wv,...(e=t.runners)!=null?e:[]];this._addRunners(...r),this._addSystems(t.systems),this._addPipes(t.renderPipes,t.renderPipeAdaptors)}async init(t={}){for(const e in this._systemsHash){const r=this._systemsHash[e].constructor.defaultOptions;t=li(li({},r),t)}t=li(li({},gh.defaultOptions),t),this._roundPixels=t.roundPixels?1:0;for(let e=0;e<this.runners.init.items.length;e++)await this.runners.init.items[e].init(t)}render(t,e){let r=t;if(r instanceof Y&&(r={container:r},e&&(O(G,"passing a second argument is deprecated, please use render options instead"),r.target=e.renderTexture)),r.target||(r.target=this.view.texture),r.target===this.view.texture&&(this._lastObjectRendered=r.container),r.clearColor){const i=Array.isArray(r.clearColor)&&r.clearColor.length===4;r.clearColor=i?r.clearColor:H.shared.setValue(r.clearColor).toArray()}this.runners.prerender.emit(r),this.runners.renderStart.emit(r),this.runners.render.emit(r),this.runners.renderEnd.emit(r),this.runners.postrender.emit(r)}resize(t,e,r){this.view.resize(t,e,r)}get resolution(){return this.view.resolution}set resolution(t){this.view.resolution=t,this.runners.resolutionChange.emit(t)}get width(){return this.view.texture.frameWidth}get height(){return this.view.texture.frameHeight}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...t){t.forEach(e=>{this.runners[e]=new ai(e)})}_addSystems(t){let e;for(e in t){const r=t[e];this._addSystem(r.value,r.name)}}_addSystem(t,e){const r=new t(this);if(this[e])throw new Error(`Whoops! The name "${e}" is already in use`);this[e]=r,this._systemsHash[e]=r;for(const i in this.runners)this.runners[i].add(r);return this}_addPipes(t,e){const r=e.reduce((i,n)=>(i[n.name]=n.value,i),{});t.forEach(i=>{const n=i.value,s=i.name,o=r[s];this.renderPipes[s]=new n(this,o?new o:null)})}destroy(t=!1){const e=this;this.runners.destroy.items.reverse(),this.runners.destroy.emit(t),Object.values(this.runners).forEach(r=>{r.destroy()}),e.runners=null,this._systemsHash=null,e.renderPipes=null}generateTexture(t){return this.textureGenerator.generateTexture(t)}get roundPixels(){return!!this._roundPixels}};let hr=gh;hr.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1};var Tv=Object.defineProperty,mh=Object.getOwnPropertySymbols,Sv=Object.prototype.hasOwnProperty,Pv=Object.prototype.propertyIsEnumerable,bh=(t,e,r)=>e in t?Tv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,cr=(t,e)=>{for(var r in e||(e={}))Sv.call(e,r)&&bh(t,r,e[r]);if(mh)for(var r of mh(e))Pv.call(e,r)&&bh(t,r,e[r]);return t};const vh=["webgpu","webgl","canvas"];async function yh(t){var e,r;let i=[];t.preference?(i.push(t.preference),vh.forEach(a=>{a!==t.preference&&i.push(a)})):i=vh.slice();let n;((e=t.manageImports)==null||e)&&await Promise.resolve().then(function(){return mv});let s={};for(let a=0;a<i.length;a++){const l=i[a];if(l==="webgpu"&&await vv()){const{WebGPURenderer:u}=await Promise.resolve().then(function(){return l0});n=u,s=cr(cr({},t),t.webgpu);break}else if(l==="webgl"&&bv((r=t.failIfMajorPerformanceCaveat)!=null?r:hr.defaultOptions.failIfMajorPerformanceCaveat)){const{WebGLRenderer:u}=await Promise.resolve().then(function(){return Z_});n=u,s=cr(cr({},t),t.webgl);break}else if(l==="canvas"){s=cr({},t);break}}delete s.webgpu,delete s.webgl;const o=new n;return await o.init(s),o}var Av=Object.defineProperty,xh=Object.getOwnPropertySymbols,Ev=Object.prototype.hasOwnProperty,Cv=Object.prototype.propertyIsEnumerable,_h=(t,e,r)=>e in t?Av(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Mv=(t,e)=>{for(var r in e||(e={}))Ev.call(e,r)&&_h(t,r,e[r]);if(xh)for(var r of xh(e))Cv.call(e,r)&&_h(t,r,e[r]);return t};const ns=class{constructor(){this.stage=new Y}async init(t){t=Mv({},t),this.renderer=await yh(t),ns._plugins.forEach(e=>{e.init.call(this,t)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get screen(){return this.renderer.screen}destroy(t=!1){const e=ns._plugins.slice(0);e.reverse(),e.forEach(r=>{r.destroy.call(this)}),this.stage.destroy(t),this.stage=null,this.renderer.destroy(t),this.renderer=null}};let ss=ns;ss._plugins=[],V.handleByList(b.Application,ss._plugins);class wh{constructor(e,r=!1){this._loader=e,this._assetList=[],this._isLoading=!1,this._maxConcurrent=1,this.verbose=r}add(e){e.forEach(r=>{this._assetList.push(r)}),this.verbose&&console.log("[BackgroundLoader] assets: ",this._assetList),this._isActive&&!this._isLoading&&this._next()}async _next(){if(this._assetList.length&&this._isActive){this._isLoading=!0;const e=[],r=Math.min(this._assetList.length,this._maxConcurrent);for(let i=0;i<r;i++)e.push(this._assetList.pop());await this._loader.load(e),this._isLoading=!1,this._next()}}get active(){return this._isActive}set active(e){this._isActive!==e&&(this._isActive=e,e&&!this._isLoading&&this._next())}}var Bv=Object.defineProperty,Rv=Object.defineProperties,kv=Object.getOwnPropertyDescriptors,Th=Object.getOwnPropertySymbols,Ov=Object.prototype.hasOwnProperty,Fv=Object.prototype.propertyIsEnumerable,Sh=(t,e,r)=>e in t?Bv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Uv=(t,e)=>{for(var r in e||(e={}))Ov.call(e,r)&&Sh(t,r,e[r]);if(Th)for(var r of Th(e))Fv.call(e,r)&&Sh(t,r,e[r]);return t},Iv=(t,e)=>Rv(t,kv(e));class Ph{constructor(){this._parsers=[],this._parsersValidated=!1,this.parsers=new Proxy(this._parsers,{set:(e,r,i)=>(this._parsersValidated=!1,e[r]=i,!0)}),this.promiseCache={}}reset(){this._parsersValidated=!1,this.promiseCache={}}_getLoadPromiseAndParser(e,r){const i={promise:null,parser:null};return i.promise=(async()=>{var n,s;let o=null,a=null;if(r.loadParser&&(a=this._parserHash[r.loadParser]),!a){for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];if(u.load&&(n=u.test)!=null&&n.call(u,e,r,this)){a=u;break}}if(!a)return null}o=await a.load(e,r,this),i.parser=a;for(let l=0;l<this.parsers.length;l++){const u=this.parsers[l];u.parse&&u.parse&&await((s=u.testParse)==null?void 0:s.call(u,o,r,this))&&(o=await u.parse(o,r,this)||o,i.parser=u)}return o})(),i}async load(e,r){this._parsersValidated||this._validateParsers();let i=0;const n={},s=nr(e),o=ye(e,u=>({alias:[u],src:u})),a=o.length,l=o.map(async u=>{const h=de.toAbsolute(u.src);if(!n[u.src])try{this.promiseCache[h]||(this.promiseCache[h]=this._getLoadPromiseAndParser(h,u)),n[u.src]=await this.promiseCache[h].promise,r&&r(++i/a)}catch(c){throw delete this.promiseCache[h],delete n[u.src],new Error(`[Loader.load] Failed to load ${h}.
${c}`)}});return await Promise.all(l),s?n[o[0].src]:n}async unload(e){const r=ye(e,i=>({alias:[i],src:i})).map(async i=>{var n,s;const o=de.toAbsolute(i.src),a=this.promiseCache[o];if(a){const l=await a.promise;delete this.promiseCache[o],(s=(n=a.parser)==null?void 0:n.unload)==null||s.call(n,l,i,this)}});await Promise.all(r)}_validateParsers(){this._parsersValidated=!0,this._parserHash=this._parsers.filter(e=>e.name).reduce((e,r)=>(r.name&&e[r.name],Iv(Uv({},e),{[r.name]:r})),{})}}class Ah{constructor(){this._detections=[],this._initialized=!1,this.resolver=new Pt,this.loader=new Ph,this.cache=Z,this._backgroundLoader=new wh(this.loader),this._backgroundLoader.active=!0,this.reset()}async init(e={}){var r,i,n;if(this._initialized)return;if(this._initialized=!0,e.defaultSearchParams&&this.resolver.setDefaultSearchParams(e.defaultSearchParams),e.basePath&&(this.resolver.basePath=e.basePath),e.bundleIdentifier&&this.resolver.setBundleIdentifier(e.bundleIdentifier),e.manifest){let l=e.manifest;typeof l=="string"&&(l=await this.load(l)),this.resolver.addManifest(l)}const s=(i=(r=e.texturePreference)==null?void 0:r.resolution)!=null?i:1,o=typeof s=="number"?[s]:s,a=await this._detectFormats({preferredFormats:(n=e.texturePreference)==null?void 0:n.format,skipDetections:e.skipDetections,detections:this._detections});this.resolver.prefer({params:{format:a,resolution:o}}),e.preferences&&this.setPreferences(e.preferences)}add(e){this.resolver.add(e)}async load(e,r){this._initialized||await this.init();const i=nr(e),n=ye(e).map(a=>{if(typeof a!="string"){const l=this.resolver.getAlias(a);return l.some(u=>!this.resolver.hasKey(u))&&this.add(a),Array.isArray(l)?l[0]:l}return this.resolver.hasKey(a)||this.add({alias:a,src:a}),a}),s=this.resolver.resolve(n),o=await this._mapLoadToResolve(s,r);return i?o[n[0]]:o}addBundle(e,r){this.resolver.addBundle(e,r)}async loadBundle(e,r){this._initialized||await this.init();let i=!1;typeof e=="string"&&(i=!0,e=[e]);const n=this.resolver.resolveBundle(e),s={},o=Object.keys(n);let a=0,l=0;const u=()=>{r==null||r(++a/l)},h=o.map(c=>{const p=n[c];return l+=Object.keys(p).length,this._mapLoadToResolve(p,u).then(d=>{s[c]=d})});return await Promise.all(h),i?s[e[0]]:s}async backgroundLoad(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const r=this.resolver.resolve(e);this._backgroundLoader.add(Object.values(r))}async backgroundLoadBundle(e){this._initialized||await this.init(),typeof e=="string"&&(e=[e]);const r=this.resolver.resolveBundle(e);Object.values(r).forEach(i=>{this._backgroundLoader.add(Object.values(i))})}reset(){this.resolver.reset(),this.loader.reset(),this.cache.reset(),this._initialized=!1}get(e){if(typeof e=="string")return Z.get(e);const r={};for(let i=0;i<e.length;i++)r[i]=Z.get(e[i]);return r}async _mapLoadToResolve(e,r){const i=Object.values(e),n=Object.keys(e);this._backgroundLoader.active=!1;const s=await this.loader.load(i,r);this._backgroundLoader.active=!0;const o={};return i.forEach((a,l)=>{const u=s[a.src],h=[a.src];a.alias&&h.push(...a.alias),o[n[l]]=u,Z.set(h,u)}),o}async unload(e){this._initialized||await this.init();const r=ye(e).map(n=>typeof n!="string"?n.src:n),i=this.resolver.resolve(r);await this._unloadFromResolved(i)}async unloadBundle(e){this._initialized||await this.init(),e=ye(e);const r=this.resolver.resolveBundle(e),i=Object.keys(r).map(n=>this._unloadFromResolved(r[n]));await Promise.all(i)}async _unloadFromResolved(e){const r=Object.values(e);r.forEach(i=>{Z.remove(i.src)}),await this.loader.unload(r)}async _detectFormats(e){let r=[];e.preferredFormats&&(r=Array.isArray(e.preferredFormats)?e.preferredFormats:[e.preferredFormats]);for(const i of e.detections)e.skipDetections||await i.test()?r=await i.add(r):e.skipDetections||(r=await i.remove(r));return r=r.filter((i,n)=>r.indexOf(i)===n),r}get detections(){return this._detections}setPreferences(e){this.loader.parsers.forEach(r=>{r.config&&Object.keys(r.config).filter(i=>i in e).forEach(i=>{r.config[i]=e[i]})})}}const dr=new Ah;V.handleByList(b.LoadParser,dr.loader.parsers).handleByList(b.ResolveParser,dr.resolver.parsers).handleByList(b.CacheParser,dr.cache.parsers).handleByList(b.DetectionParser,dr.detections);function Eh(t,e,r){const i=r?e.maxSupportedFragmentPrecision:e.maxSupportedVertexPrecision;if(t.substring(0,9)!=="precision"){let n=r?e.requestedFragmentPrecision:e.requestedVertexPrecision;if(n==="highp"&&i!=="highp"&&(n="mediump"),t.substring(0,8)!=="#version")return`precision ${n} float;
${t}`;const s=t.indexOf(`
`);return`${t.substring(0,s+1)}precision ${n} float;
${t.substring(s+1)}`}else if(i!=="highp"&&t.substring(0,15)==="precision highp")return t.replace("precision highp","precision mediump");return t}const Ch={};let pr=Ch;function Mh(){return(pr===Ch||pr!=null&&pr.isContextLost())&&(pr=j.get().createCanvas().getContext("webgl2",{})),pr}let ui;function Bh(){if(!ui){ui="mediump";const t=Mh();t&&t.getShaderPrecisionFormat&&(ui=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision?"highp":"mediump")}return ui}const Gv={},$v={};function Rh(t,{name:e="pixi-program"},r=!0){e=e.replace(/\s+/g,"-"),e+=r?"-fragment":"-vertex";const i=r?Gv:$v;if(i[e]?(i[e]++,e+=`-${i[e]}`):i[e]=1,t.indexOf("#define SHADER_NAME")!==-1)return t;const n=`#define SHADER_NAME ${e}`;if(t.substring(0,8)!=="#version")return`${n}
${t}`;const s=t.indexOf(`
`);return`${t.substring(0,s+1)}${n}
${t.substring(s+1)}`}function kh(t,{version:e="300 es"}){return t.substring(0,8)==="#version"?t:`#version ${e}
${t}`}var Lv=Object.defineProperty,Oh=Object.getOwnPropertySymbols,Dv=Object.prototype.hasOwnProperty,zv=Object.prototype.propertyIsEnumerable,Fh=(t,e,r)=>e in t?Lv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Uh=(t,e)=>{for(var r in e||(e={}))Dv.call(e,r)&&Fh(t,r,e[r]);if(Oh)for(var r of Oh(e))zv.call(e,r)&&Fh(t,r,e[r]);return t};const os={ensurePrecision:Eh,setProgramName:Rh,setProgramVersion:kh},Et=class{constructor(t){t=Uh(Uh({},Et.defaultOptions),t);const e={ensurePrecision:{requestedFragmentPrecision:t.preferredFragmentPrecision,requestedVertexPrecision:t.preferredVertexPrecision,maxSupportedVertexPrecision:"highp",maxSupportedFragmentPrecision:Bh()},setProgramName:{name:t.name},setProgramVersion:{version:"300 es"}};let r=t.fragment,i=t.vertex;Object.keys(os).forEach(n=>{var s;const o=(s=e[n])!=null?s:{};r=os[n](r,o,!0),i=os[n](i,o,!1)}),this.fragment=r,this.vertex=i,this.key=`${this.vertex}:${this.fragment}`}destroy(){this.fragment=null,this.vertex=null,this.attributeData=null,this.uniformData=null,this.uniformBlockData=null,this.transformFeedbackVaryings=null}static from(t){const e=`${t.vertex}:${t.fragment}`;return Et.programCached[e]||(Et.programCached[e]=new Et(t)),Et.programCached[e]}};let _e=Et;_e.defaultOptions={preferredVertexPrecision:"highp",preferredFragmentPrecision:"mediump"},_e.programCached=Object.create(null);function hi(t){var e,r,i;const n=new RegExp("(?<!\\/\\/.*)@(group|binding)\\(\\d+\\)[^;]+;","g"),s=/@group\((\d+)\)/,o=/@binding\((\d+)\)/,a=/var(<[^>]+>)? (\w+)/,l=/:\s*(\w+)/,u=/struct\s+(\w+)\s*{([^}]+)}/g,h=/(\w+)\s*:\s*([\w\<\>]+)/g,c=/struct\s+(\w+)/,p=(e=t.match(n))==null?void 0:e.map(f=>({group:parseInt(f.match(s)[1],10),binding:parseInt(f.match(o)[1],10),name:f.match(a)[2],isUniform:f.match(a)[1]==="<uniform>",type:f.match(l)[1]}));if(!p)return{groups:[],structs:[]};const d=(i=(r=t.match(u))==null?void 0:r.map(f=>{const m=f.match(c)[1],g=f.match(h).reduce((x,v)=>{const[y,_]=v.split(":");return x[y.trim()]=_.trim(),x},{});return g?{name:m,members:g}:null}).filter(({name:f})=>p.some(m=>m.type===f)))!=null?i:[];return{groups:p,structs:d}}var Ct=(t=>(t[t.VERTEX=1]="VERTEX",t[t.FRAGMENT=2]="FRAGMENT",t[t.COMPUTE=4]="COMPUTE",t))(Ct||{});function Ih({groups:t}){const e=[];for(let r=0;r<t.length;r++){const i=t[r];e[i.group]||(e[i.group]=[]),i.isUniform?e[i.group].push({binding:i.binding,visibility:Ct.VERTEX|Ct.FRAGMENT,buffer:{type:"uniform"}}):i.type==="sampler"?e[i.group].push({binding:i.binding,visibility:Ct.FRAGMENT,sampler:{type:"filtering"}}):i.type==="texture_2d"&&e[i.group].push({binding:i.binding,visibility:Ct.FRAGMENT,texture:{sampleType:"float",viewDimension:"2d",multisampled:!1}})}return e}function Gh({groups:t}){const e=[];for(let r=0;r<t.length;r++){const i=t[r];e[i.group]||(e[i.group]={}),e[i.group][i.name]=i.binding}return e}function $h(t,e){const r=new Set,i=new Set,n=[...t.structs,...e.structs].filter(o=>r.has(o.name)?!1:(r.add(o.name),!0)),s=[...t.groups,...e.groups].filter(o=>{const a=`${o.name}-${o.binding}`;return i.has(a)?!1:(i.add(a),!0)});return{structs:n,groups:s}}const fr=class{constructor({fragment:t,vertex:e,layout:r,gpuLayout:i,name:n}){if(this._layoutKey=0,this.name=n,this.fragment=t,this.vertex=e,t.source===e.source){const s=hi(t.source);this.structsAndGroups=s}else{const s=hi(e.source),o=hi(t.source);this.structsAndGroups=$h(s,o)}this.layout=r!=null?r:Gh(this.structsAndGroups),this.gpuLayout=i!=null?i:Ih(this.structsAndGroups)}destroy(){this._gpuLayout=null,this.gpuLayout=null,this.layout=null,this.structsAndGroups=null,this.fragment=null,this.vertex=null}static from(t){const e=`${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;return fr.programCached[e]||(fr.programCached[e]=new fr(t)),fr.programCached[e]}};let Ae=fr;Ae.programCached=Object.create(null);function Lh(t,e){switch(t){case"f32":return 0;case"vec2<f32>":return new Float32Array(2*e);case"vec3<f32>":return new Float32Array(3*e);case"vec4<f32>":return new Float32Array(4*e);case"mat2x2<f32>":return new Float32Array([1,0,0,1]);case"mat3x3<f32>":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4x4<f32>":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}var Nv=Object.defineProperty,Dh=Object.getOwnPropertySymbols,Hv=Object.prototype.hasOwnProperty,jv=Object.prototype.propertyIsEnumerable,zh=(t,e,r)=>e in t?Nv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Nh=(t,e)=>{for(var r in e||(e={}))Hv.call(e,r)&&zh(t,r,e[r]);if(Dh)for(var r of Dh(e))jv.call(e,r)&&zh(t,r,e[r]);return t};const Hh=class{constructor(t,e){this.touched=0,this.uid=q("uniform"),this.resourceType="uniformGroup",this.resourceId=this.uid,this.isUniformGroup=!0,this.dirtyId=0;var r,i;e=Nh(Nh({},Hh.DEFAULT),e),this.uniformStructures=t;const n={};for(const s in t){const o=t[s];o.name=s,o.size=(r=o.size)!=null?r:1,(i=o.value)!=null||(o.value=Lh(o.type,o.size)),n[s]=o.value}this.uniforms=n,this.dirtyId=1,this.ubo=e.ubo,this.isStatic=e.isStatic,this.signature=Object.keys(n).map(s=>`${s}-${t[s].type}`).join("-")}update(){this.dirtyId++}};let re=Hh;re.DEFAULT={ubo:!1,isStatic:!1};class Be{constructor(e){this.resources=Object.create(null),this._dirty=!0;let r=0;for(const i in e){const n=e[i];this.setResource(n,r++)}this.updateKey()}update(){this.updateKey()}updateKey(){if(!this._dirty)return;this._dirty=!1;const e=[];let r=0;for(const i in this.resources)e[r++]=this.resources[i].resourceId;this.key=e.join("|")}setResource(e,r){var i,n;const s=this.resources[r];e!==s&&(s&&((i=e.off)==null||i.call(e,"change",this.onResourceChange,this)),(n=e.on)==null||n.call(e,"change",this.onResourceChange,this),this.resources[r]=e,this._dirty=!0)}getResource(e){return this.resources[e]}touch(e){const r=this.resources;for(const i in r)r[i].touched=e}destroy(){var e;const r=this.resources;for(const i in r){const n=r[i];(e=n.off)==null||e.call(n,"change",this.onResourceChange,this)}this.resources=null}onResourceChange(){this._dirty=!0,this.update()}}var Re=(t=>(t[t.WEBGL=1]="WEBGL",t[t.WEBGPU=2]="WEBGPU",t))(Re||{});class Ee extends ue{constructor({gpuProgram:e,glProgram:r,groups:i,resources:n,groupMap:s,compatibleRenderers:o}){super(),this.uniformBindMap=Object.create(null),this.gpuProgram=e,this.glProgram=r,o===void 0&&(o=0,e&&(o|=Re.WEBGPU),r&&(o|=Re.WEBGL)),this.compatibleRenderers=o;const a={};if(n&&i)throw new Error("[Shader] Cannot have both resources and groups");if(!n&&!i)throw new Error("[Shader] Must provide either resources or groups descriptor");if(!e&&i&&!s)throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");if(!e&&i&&s)for(const l in s)for(const u in s[l]){const h=s[l][u];a[h]={group:l,binding:u,name:h}}else if(e&&i&&!s){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else if(n){if(e){const l=e.structsAndGroups.groups;s={},l.forEach(u=>{s[u.group]=s[u.group]||{},s[u.group][u.binding]=u.name,a[u.name]=u})}else{s={},i={99:new Be};let l=0;for(const u in n)a[u]={group:99,binding:l,name:u},s[99]=s[99]||{},s[99][l]=u,l++}i={};for(const l in n){const u=l;let h=n[l];!h.source&&!h.resourceType&&(h=new re(h));const c=a[u];c&&(i[c.group]=i[c.group]||new Be,i[c.group].setResource(h,c.binding))}}this.groups=i,this.uniformBindMap=s,this.resources=this._buildResourceAccessor(i,a)}addResource(e,r,i){var n,s;(n=this.uniformBindMap)[r]||(n[r]={}),(s=this.uniformBindMap[r])[i]||(s[i]=e)}_buildResourceAccessor(e,r){const i={};for(const n in r){const s=r[n];Object.defineProperty(i,s.name,{get(){return e[s.group].getResource(s.binding)},set(o){e[s.group].setResource(o,s.binding)}})}return i}destroy(e=!1){var r,i;this.emit("destroy",this),e&&((r=this.gpuProgram)==null||r.destroy(),(i=this.glProgram)==null||i.destroy()),this.gpuProgram=null,this.glProgram=null,this.groups=null,this.removeAllListeners(),this.uniformBindMap=null,this.resources=null}}const Wv={normal:0,additive:1,multiply:2,screen:3,overlay:4,erase:5},as=0,ls=1,us=2,hs=3,cs=4,ds=5;class Se{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(this.data&1<<as)}set blend(e){!!(this.data&1<<as)!==e&&(this.data^=1<<as)}get offsets(){return!!(this.data&1<<ls)}set offsets(e){!!(this.data&1<<ls)!==e&&(this.data^=1<<ls)}set cullMode(e){if(e==="none"){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace=e==="front"}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(this.data&1<<us)}set culling(e){!!(this.data&1<<us)!==e&&(this.data^=1<<us)}get depthTest(){return!!(this.data&1<<hs)}set depthTest(e){!!(this.data&1<<hs)!==e&&(this.data^=1<<hs)}get depthMask(){return!!(this.data&1<<ds)}set depthMask(e){!!(this.data&1<<ds)!==e&&(this.data^=1<<ds)}get clockwiseFrontFace(){return!!(this.data&1<<cs)}set clockwiseFrontFace(e){!!(this.data&1<<cs)!==e&&(this.data^=1<<cs)}get blendMode(){return this._blendMode}set blendMode(e){this.blend=e!=="none",this._blendMode=e,this._blendModeId=Wv[e]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(e){this.offsets=!!e,this._polygonOffset=e}static for2d(){const e=new Se;return e.depthTest=!1,e.blend=!0,e}}var Vv=Object.defineProperty,jh=Object.getOwnPropertySymbols,Yv=Object.prototype.hasOwnProperty,Xv=Object.prototype.propertyIsEnumerable,Wh=(t,e,r)=>e in t?Vv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Vh=(t,e)=>{for(var r in e||(e={}))Yv.call(e,r)&&Wh(t,r,e[r]);if(jh)for(var r of jh(e))Xv.call(e,r)&&Wh(t,r,e[r]);return t};const Yh=class extends Ee{constructor(t){var e;t=Vh(Vh({},Yh.defaultOptions),t),super(t),this.enabled=!0,this._state=Se.for2d(),this.padding=t.padding,typeof t.antialias=="boolean"?this.antialias=t.antialias?"on":"off":this.antialias=(e=t.antialias)!=null?e:"inherit",this.resolution=t.resolution,this.blendRequired=t.blendRequired,this.addResource("filterUniforms",0,0),this.addResource("uSampler",0,1)}apply(t,e,r,i){t.applyFilter(this,e,r,i)}get blendMode(){return this._state.blendMode}set blendMode(t){this._state.blendMode=t}};let Ce=Yh;Ce.defaultOptions={blendMode:"normal",resolution:1,padding:0,antialias:"inherit",blendRequired:!1};var Xh=`
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
`,qh=`in vec2 aPosition;
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
`,Kh=`struct GlobalUniforms {
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
}`,qv=Object.defineProperty,Zh=Object.getOwnPropertySymbols,Kv=Object.prototype.hasOwnProperty,Zv=Object.prototype.propertyIsEnumerable,Qh=(t,e,r)=>e in t?qv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Jh=(t,e)=>{for(var r in e||(e={}))Kv.call(e,r)&&Qh(t,r,e[r]);if(Zh)for(var r of Zh(e))Zv.call(e,r)&&Qh(t,r,e[r]);return t};class te extends Ce{constructor(e){const r=e.gpu,i=ec(Jh({source:Kh},r)),n=new Ae({vertex:{source:i,entryPoint:"mainVertex"},fragment:{source:i,entryPoint:"mainFragment"}}),s=e.gl,o=ec(Jh({source:Xh},s)),a=new _e({vertex:qh,fragment:o}),l=new re({uBlend:{value:1,type:"f32"}});super({gpuProgram:n,glProgram:a,blendRequired:!0,resources:{blendUniforms:l,backTexture:A.EMPTY}})}}function ec(t){const{source:e,functions:r,main:i}=t;return e.replace("{FUNCTIONS}",r).replace("{MAIN}",i)}const ci=`
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
    `,di=`
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
	`;class tc extends te{constructor(){super({gl:{functions:`
                ${ci}

                vec3 blendColor(vec3 base, vec3 blend,  float opacity)
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendColor(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${di}

                fn blendColorOpacity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    return (setLuminosity(blend, getLuminosity(base)) * opacity + base * (1.0 - opacity));
                }
                `,main:`
                out = vec4<f32>(blendColorOpacity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
                `}})}}tc.extension={name:"color",type:b.BlendMode};class rc extends te{constructor(){super({gl:{functions:`
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
            `}})}}rc.extension={name:"color-burn",type:b.BlendMode};class ic extends te{constructor(){super({gl:{functions:`
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
                `}})}}ic.extension={name:"color-dodge",type:b.BlendMode};class nc extends te{constructor(){super({gl:{functions:`
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
                `}})}}nc.extension={name:"darken",type:b.BlendMode};class sc extends te{constructor(){super({gl:{functions:`
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
            `}})}}sc.extension={name:"difference",type:b.BlendMode};class oc extends te{constructor(){super({gl:{functions:`
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
            `}})}}oc.extension={name:"divide",type:b.BlendMode};class ac extends te{constructor(){super({gl:{functions:`
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
            `}})}}ac.extension={name:"exclusion",type:b.BlendMode};class lc extends te{constructor(){super({gl:{functions:`
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
                `}})}}lc.extension={name:"hard-light",type:b.BlendMode};class uc extends te{constructor(){super({gl:{functions:`
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
            `}})}}uc.extension={name:"hard-mix",type:b.BlendMode};class hc extends te{constructor(){super({gl:{functions:`
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
            `}})}}hc.extension={name:"lighten",type:b.BlendMode};class cc extends te{constructor(){super({gl:{functions:`
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
                `}})}}cc.extension={name:"linear-burn",type:b.BlendMode};class dc extends te{constructor(){super({gl:{functions:`
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
            `}})}}dc.extension={name:"linear-dodge",type:b.BlendMode};class pc extends te{constructor(){super({gl:{functions:`
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
            `}})}}pc.extension={name:"linear-light",type:b.BlendMode};class fc extends te{constructor(){super({gl:{functions:`
                ${ci}

                vec3 blendLuminosity(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendLuminosity = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
                `,main:`
                fragColor = vec4(blendLuminosity(back.rgb, front.rgb, front.a), uBlend);
                `},gpu:{functions:`
                ${di}

                fn blendLuminosity(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendLuminosity: vec3<f32> = setLuminosity(base, getLuminosity(blend));
                    return (blendLuminosity * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendLuminosity(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}fc.extension={name:"luminosity",type:b.BlendMode};class gc extends te{constructor(){super({gl:{functions:`
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
            `}})}}gc.extension={name:"negation",type:b.BlendMode};class mc extends te{constructor(){super({gl:{functions:`
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
                `}})}}mc.extension={name:"overlay",type:b.BlendMode};class bc extends te{constructor(){super({gl:{functions:`
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
                `}})}}bc.extension={name:"pin-light",type:b.BlendMode};class vc extends te{constructor(){super({gl:{functions:`
                ${ci}

                vec3 blendSaturation(vec3 base, vec3 blend,  float opacity)
                {
                    vec3 blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                fragColor = vec4(blendSaturation(back.rgb, front.rgb, front.a), uBlend);
            `},gpu:{functions:`
                ${di}

                fn blendSaturation(base:vec3<f32>,  blend:vec3<f32>,  opacity:f32) -> vec3<f32>
                {
                    let blendSaturation = setLuminosity(setSaturation(base, getSaturation(blend)), getLuminosity(base));
                    return (blendSaturation * opacity + base * (1.0 - opacity));
                }
            `,main:`
                out = vec4<f32>(blendSaturation(back.rgb, front.rgb, front.a), blendUniforms.uBlend);
            `}})}}vc.extension={name:"saturation",type:b.BlendMode};class yc extends te{constructor(){super({gl:{functions:`
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
                `}})}}yc.extension={name:"soft-light",type:b.BlendMode};class xc extends te{constructor(){super({gl:{functions:`
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
                `}})}}xc.extension={name:"subtract",type:b.BlendMode};class _c extends te{constructor(){super({gl:{functions:`
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
                `}})}}_c.extension={name:"vivid-light",type:b.BlendMode},V.add(tc,rc,ic,nc,sc,oc,ac,lc,uc,hc,cc,pc,dc,fc,gc,mc,bc,vc,yc,xc,_c);var ps=`struct GlobalUniforms {
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
}`,Qv=Object.defineProperty,wc=Object.getOwnPropertySymbols,Jv=Object.prototype.hasOwnProperty,ey=Object.prototype.propertyIsEnumerable,Tc=(t,e,r)=>e in t?Qv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Sc=(t,e)=>{for(var r in e||(e={}))Jv.call(e,r)&&Tc(t,r,e[r]);if(wc)for(var r of wc(e))ey.call(e,r)&&Tc(t,r,e[r]);return t};const Pc=class extends Ce{constructor(t){t=Sc(Sc({},Pc.DEFAULT_OPTIONS),t);const e=new Ae({vertex:{source:ps,entryPoint:"mainVertex"},fragment:{source:ps,entryPoint:"mainFragment"}}),r=new re({uAlpha:{value:t.alpha,type:"f32"}});super({gpuProgram:e,resources:{filterUniforms:r}})}get alpha(){return this.resources.filterUniforms.uniforms.uAlpha}set alpha(t){this.resources.filterUniforms.uniforms.uAlpha=t}};let Ac=Pc;Ac.DEFAULT_OPTIONS={alpha:1};function pt(t){return t+=t===0?1:0,--t,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t+1}function ty(t){return!(t&t-1)&&!!t}function ry(t){let e=(t>65535?1:0)<<4;t>>>=e;let r=(t>255?1:0)<<3;return t>>>=r,e|=r,r=(t>15?1:0)<<2,t>>>=r,e|=r,r=(t>3?1:0)<<1,t>>>=r,e|=r,e|t>>1}var iy=Object.defineProperty,ny=Object.defineProperties,sy=Object.getOwnPropertyDescriptors,Ec=Object.getOwnPropertySymbols,oy=Object.prototype.hasOwnProperty,ay=Object.prototype.propertyIsEnumerable,Cc=(t,e,r)=>e in t?iy(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ly=(t,e)=>{for(var r in e||(e={}))oy.call(e,r)&&Cc(t,r,e[r]);if(Ec)for(var r of Ec(e))ay.call(e,r)&&Cc(t,r,e[r]);return t},uy=(t,e)=>ny(t,sy(e));let hy=0;class Mc{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,r,i){const n=new he(uy(ly({},this.textureOptions),{width:e,height:r,resolution:1,antialias:i}));return new A({source:n,label:`texturePool_${hy++}`})}getOptimalTexture(e,r,i=1,n){let s=Math.ceil(e*i-1e-6),o=Math.ceil(r*i-1e-6);s=pt(s),o=pt(o);const a=(s<<17)+(o<<1)+(n?1:0);this._texturePool[a]||(this._texturePool[a]=[]);let l=this._texturePool[a].pop();return l||(l=this.createTexture(s,o,n)),l.source._resolution=i,l.source.width=s/i,l.source.height=o/i,l.source.pixelWidth=s,l.source.pixelHeight=o,l.frameX=0,l.frameY=0,l.frameWidth=e,l.frameHeight=r,l.layout.update(),this._poolKeyHash[l.id]=a,l}getSameSizeTexture(e,r=!1){const i=e.source;return this.getOptimalTexture(e.width,e.height,i._resolution,r)}returnTexture(e){const r=this._poolKeyHash[e.id];this._texturePool[r].push(e)}clear(e){if(e=e!==!1,e)for(const r in this._texturePool){const i=this._texturePool[r];if(i)for(let n=0;n<i.length;n++)i[n].destroy(!0)}this._texturePool={}}}const le=new Mc,fs={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},cy=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uSampler;","out vec4 fragColor;","void main(void)","{","    fragColor = vec4(0.0);","    %blur%","}"].join(`
`);function Bc(t){const e=fs[t],r=e.length;let i=cy,n="";const s="fragColor += texture(uSampler, vBlurTexCoords[%index%]) * %value%;";let o;for(let a=0;a<t;a++){let l=s.replace("%index%",a.toString());o=a,a>=r&&(o=t-a-1),l=l.replace("%value%",e[o].toString()),n+=l,n+=`
`}return i=i.replace("%blur%",n),i=i.replace("%size%",t.toString()),i}const dy=`
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
    }`;function Rc(t,e){const r=Math.ceil(t/2);let i=dy,n="",s;e?s="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":s="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let o=0;o<t;o++){let a=s.replace("%index%",o.toString());a=a.replace("%sampleIndex%",`${o-(r-1)}.0`),n+=a,n+=`
`}return i=i.replace("%blur%",n),i=i.replace("%size%",t.toString()),i=i.replace("%dimension%",e?"z":"w"),i}function kc(t,e){const r=Rc(e,t),i=Bc(e);return _e.from({vertex:r,fragment:i,name:`blur-${t?"horizontal":"vertical"}-pass-filter`})}var Oc=`

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
}`;function Fc(t,e){const r=fs[e],i=r.length,n=[],s=[],o=[];for(let c=0;c<e;c++){n[c]=`@location(${c}) offset${c}: vec2<f32>,`,t?s[c]=`filteredCord + vec2(${c-i+1} * strength, 0.0),`:s[c]=`filteredCord + vec2(0.0, ${c-i+1} * strength),`;const p=c<i?c:e-c-1,d=r[p].toString();o[c]=`fragColor += textureSample(uSampler, mySampler, offset${c}) * ${d};`}const a=n.join(`
`),l=s.join(`
`),u=o.join(`
`),h=Oc.replace("%blur-struct%",a).replace("%blur-vertex-out%",l).replace("%blur-fragment-in%",a).replace("%blur-sampling%",u);return Ae.from({vertex:{source:h,entryPoint:"mainVertex"},fragment:{source:h,entryPoint:"mainFragment"}})}var py=Object.defineProperty,Uc=Object.getOwnPropertySymbols,fy=Object.prototype.hasOwnProperty,gy=Object.prototype.propertyIsEnumerable,Ic=(t,e,r)=>e in t?py(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,gs=(t,e)=>{for(var r in e||(e={}))fy.call(e,r)&&Ic(t,r,e[r]);if(Uc)for(var r of Uc(e))gy.call(e,r)&&Ic(t,r,e[r]);return t};const Gc=class extends Ce{constructor(t){t=gs(gs({},Gc.defaultOptions),t);const e=kc(t.horizontal,t.kernelSize),r=Fc(t.horizontal,t.kernelSize);super(gs({glProgram:e,gpuProgram:r,resources:{blurUniforms:{strength:{value:0,type:"f32"}}}},t)),this.horizontal=t.horizontal,this._quality=0,this.quality=t.quality,this.blur=t.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(t,e,r,i){if(this._uniforms.strength=this.strength/this.passes,this.passes===1)t.applyFilter(this,e,r,i);else{const n=le.getSameSizeTexture(e);let s=e,o=n;this._state.blend=!1;for(let a=0;a<this.passes-1;a++){t.applyFilter(this,s,o,t.renderer.type===Re.WEBGPU);const l=o;o=s,s=l}this._state.blend=!0,t.applyFilter(this,s,r,i),le.returnTexture(n)}}get blur(){return this.strength}set blur(t){this.padding=1+Math.abs(t)*2,this.strength=t}get quality(){return this._quality}set quality(t){this._quality=t,this.passes=t}};let gr=Gc;gr.defaultOptions={strength:8,quality:4,kernelSize:5};var my=Object.defineProperty,by=Object.defineProperties,vy=Object.getOwnPropertyDescriptors,$c=Object.getOwnPropertySymbols,yy=Object.prototype.hasOwnProperty,xy=Object.prototype.propertyIsEnumerable,Lc=(t,e,r)=>e in t?my(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,mr=(t,e)=>{for(var r in e||(e={}))yy.call(e,r)&&Lc(t,r,e[r]);if($c)for(var r of $c(e))xy.call(e,r)&&Lc(t,r,e[r]);return t},_y=(t,e)=>by(t,vy(e));class Dc extends Ce{constructor(...e){var r;let i=(r=e[0])!=null?r:{};typeof i=="number"&&(O(G,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),i={strength:i},e[1]&&(i.quality=e[1]),e[2]&&(i.resolution=e[2]),e[3]&&(i.kernelSize=e[3])),i=mr(mr({},gr.defaultOptions),i),super(_y(mr({},i),{compatibleRenderers:Re.WEBGL|Re.WEBGPU,resources:{}})),this._repeatEdgePixels=!1,this.blurXFilter=new gr(mr({horizontal:!1},i)),this.blurYFilter=new gr(mr({horizontal:!0},i)),this.quality=i.quality,this.blur=i.strength,this.repeatEdgePixels=!1}apply(e,r,i,n){const s=Math.abs(this.blurXFilter.strength),o=Math.abs(this.blurYFilter.strength);if(s&&o){const a=le.getSameSizeTexture(r);this.blurXFilter.apply(e,r,a,!0),this.blurYFilter.apply(e,a,i,n),le.returnTexture(a)}else o?this.blurYFilter.apply(e,r,i,n):this.blurXFilter.apply(e,r,i,n)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get blur(){return this.blurXFilter.blur}set blur(e){this.blurXFilter.blur=this.blurYFilter.blur=e,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(e){this.blurXFilter.quality=this.blurYFilter.quality=e}get blurX(){return this.blurXFilter.blur}set blurX(e){this.blurXFilter.blur=e,this.updatePadding()}get blurY(){return this.blurYFilter.blur}set blurY(e){this.blurYFilter.blur=e,this.updatePadding()}get blendMode(){return this.blurYFilter.blendMode}set blendMode(e){this.blurYFilter.blendMode=e}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(e){this._repeatEdgePixels=e,this.updatePadding()}}Dc.defaultOptions={strength:8,quality:4,kernelSize:5};var ms=`in vec2 aPosition;
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
`,zc=`
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
`,bs=`struct GlobalUniforms {
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
}`;class wy extends Ce{constructor(){const e=new re({uColorMatrix:{value:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],type:"vec4<f32>",size:5},uAlpha:{value:1,type:"f32"}}),r=Ae.from({vertex:{source:bs,entryPoint:"mainVertex"},fragment:{source:bs,entryPoint:"mainFragment"}}),i=_e.from({vertex:ms,fragment:zc,name:"color-matrix-filter"});super({gpuProgram:r,glProgram:i,resources:{colorMatrixUniforms:e}}),this.alpha=1}_loadMatrix(e,r=!1){let i=e;r&&(this._multiply(i,this.matrix,e),i=this._colorMatrix(i)),this.resources.colorMatrixUniforms.uniforms.uColorMatrix=i,this.resources.colorMatrixUniforms.update()}_multiply(e,r,i){return e[0]=r[0]*i[0]+r[1]*i[5]+r[2]*i[10]+r[3]*i[15],e[1]=r[0]*i[1]+r[1]*i[6]+r[2]*i[11]+r[3]*i[16],e[2]=r[0]*i[2]+r[1]*i[7]+r[2]*i[12]+r[3]*i[17],e[3]=r[0]*i[3]+r[1]*i[8]+r[2]*i[13]+r[3]*i[18],e[4]=r[0]*i[4]+r[1]*i[9]+r[2]*i[14]+r[3]*i[19]+r[4],e[5]=r[5]*i[0]+r[6]*i[5]+r[7]*i[10]+r[8]*i[15],e[6]=r[5]*i[1]+r[6]*i[6]+r[7]*i[11]+r[8]*i[16],e[7]=r[5]*i[2]+r[6]*i[7]+r[7]*i[12]+r[8]*i[17],e[8]=r[5]*i[3]+r[6]*i[8]+r[7]*i[13]+r[8]*i[18],e[9]=r[5]*i[4]+r[6]*i[9]+r[7]*i[14]+r[8]*i[19]+r[9],e[10]=r[10]*i[0]+r[11]*i[5]+r[12]*i[10]+r[13]*i[15],e[11]=r[10]*i[1]+r[11]*i[6]+r[12]*i[11]+r[13]*i[16],e[12]=r[10]*i[2]+r[11]*i[7]+r[12]*i[12]+r[13]*i[17],e[13]=r[10]*i[3]+r[11]*i[8]+r[12]*i[13]+r[13]*i[18],e[14]=r[10]*i[4]+r[11]*i[9]+r[12]*i[14]+r[13]*i[19]+r[14],e[15]=r[15]*i[0]+r[16]*i[5]+r[17]*i[10]+r[18]*i[15],e[16]=r[15]*i[1]+r[16]*i[6]+r[17]*i[11]+r[18]*i[16],e[17]=r[15]*i[2]+r[16]*i[7]+r[17]*i[12]+r[18]*i[17],e[18]=r[15]*i[3]+r[16]*i[8]+r[17]*i[13]+r[18]*i[18],e[19]=r[15]*i[4]+r[16]*i[9]+r[17]*i[14]+r[18]*i[19]+r[19],e}_colorMatrix(e){const r=new Float32Array(e);return r[4]/=255,r[9]/=255,r[14]/=255,r[19]/=255,r}brightness(e,r){const i=[e,0,0,0,0,0,e,0,0,0,0,0,e,0,0,0,0,0,1,0];this._loadMatrix(i,r)}tint(e,r){const[i,n,s]=H.shared.setValue(e).toArray(),o=[i,0,0,0,0,0,n,0,0,0,0,0,s,0,0,0,0,0,1,0];this._loadMatrix(o,r)}greyscale(e,r){const i=[e,e,e,0,0,e,e,e,0,0,e,e,e,0,0,0,0,0,1,0];this._loadMatrix(i,r)}grayscale(e,r){this.greyscale(e,r)}blackAndWhite(e){const r=[.3,.6,.1,0,0,.3,.6,.1,0,0,.3,.6,.1,0,0,0,0,0,1,0];this._loadMatrix(r,e)}hue(e,r){e=(e||0)/180*Math.PI;const i=Math.cos(e),n=Math.sin(e),s=Math.sqrt,o=1/3,a=s(o),l=i+(1-i)*o,u=o*(1-i)-a*n,h=o*(1-i)+a*n,c=o*(1-i)+a*n,p=i+o*(1-i),d=o*(1-i)-a*n,f=o*(1-i)-a*n,m=o*(1-i)+a*n,g=i+o*(1-i),x=[l,u,h,0,0,c,p,d,0,0,f,m,g,0,0,0,0,0,1,0];this._loadMatrix(x,r)}contrast(e,r){const i=(e||0)+1,n=-.5*(i-1),s=[i,0,0,0,n,0,i,0,0,n,0,0,i,0,n,0,0,0,1,0];this._loadMatrix(s,r)}saturate(e=0,r){const i=e*2/3+1,n=(i-1)*-.5,s=[i,n,n,0,0,n,i,n,0,0,n,n,i,0,0,0,0,0,1,0];this._loadMatrix(s,r)}desaturate(){this.saturate(-1)}negative(e){const r=[-1,0,0,1,0,0,-1,0,1,0,0,0,-1,1,0,0,0,0,1,0];this._loadMatrix(r,e)}sepia(e){const r=[.393,.7689999,.18899999,0,0,.349,.6859999,.16799999,0,0,.272,.5339999,.13099999,0,0,0,0,0,1,0];this._loadMatrix(r,e)}technicolor(e){const r=[1.9125277891456083,-.8545344976951645,-.09155508482755585,0,11.793603434377337,-.3087833385928097,1.7658908555458428,-.10601743074722245,0,-70.35205161461398,-.231103377548616,-.7501899197440212,1.847597816108189,0,30.950940869491138,0,0,0,1,0];this._loadMatrix(r,e)}polaroid(e){const r=[1.438,-.062,-.062,0,0,-.122,1.378,-.122,0,0,-.016,-.016,1.483,0,0,0,0,0,1,0];this._loadMatrix(r,e)}toBGR(e){const r=[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0];this._loadMatrix(r,e)}kodachrome(e){const r=[1.1285582396593525,-.3967382283601348,-.03992559172921793,0,63.72958762196502,-.16404339962244616,1.0835251566291304,-.05498805115633132,0,24.732407896706203,-.16786010706155763,-.5603416277695248,1.6014850761964943,0,35.62982807460946,0,0,0,1,0];this._loadMatrix(r,e)}browni(e){const r=[.5997023498159715,.34553243048391263,-.2708298674538042,0,47.43192855600873,-.037703249837783157,.8609577587992641,.15059552388459913,0,-36.96841498319127,.24113635128153335,-.07441037908422492,.44972182064877153,0,-7.562075277591283,0,0,0,1,0];this._loadMatrix(r,e)}vintage(e){const r=[.6279345635605994,.3202183420819367,-.03965408211312453,0,9.651285835294123,.02578397704808868,.6441188644374771,.03259127616149294,0,7.462829176470591,.0466055556782719,-.0851232987247891,.5241648018700465,0,5.159190588235296,0,0,0,1,0];this._loadMatrix(r,e)}colorTone(e,r,i,n,s){e=e||.2,r=r||.15,i=i||16770432,n=n||3375104;const o=H.shared,[a,l,u]=o.setValue(i).toArray(),[h,c,p]=o.setValue(n).toArray(),d=[.3,.59,.11,0,0,a,l,u,e,0,h,c,p,r,0,a-h,l-c,u-p,0,0];this._loadMatrix(d,s)}night(e,r){e=e||.1;const i=[e*-2,-e,0,0,0,-e,0,e,0,0,0,e,e*2,0,0,0,0,0,1,0];this._loadMatrix(i,r)}predator(e,r){const i=[11.224130630493164*e,-4.794486999511719*e,-2.8746118545532227*e,0*e,.40342438220977783*e,-3.6330697536468506*e,9.193157196044922*e,-2.951810836791992*e,0*e,-1.316135048866272*e,-3.2184197902679443*e,-4.2375030517578125*e,7.476448059082031*e,0*e,.8044459223747253*e,0,0,0,1,0];this._loadMatrix(i,r)}lsd(e){const r=[2,-.4,.5,0,0,-.5,2,-.4,0,0,-.4,-.5,3,0,0,0,0,0,1,0];this._loadMatrix(r,e)}reset(){const e=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this._loadMatrix(e,!1)}get matrix(){return this.resources.colorMatrixUniforms.uniforms.uColorMatrix}set matrix(e){this.resources.colorMatrixUniforms.uniforms.uColorMatrix=e}get alpha(){return this.resources.colorMatrixUniforms.uniforms.uAlpha}set alpha(e){this.resources.colorMatrixUniforms.uniforms.uAlpha=e}}var Nc=`
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
`,Hc=`in vec2 aPosition;
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
`,vs=`struct GlobalUniforms {
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
}`;class Ty extends Ce{constructor(...e){var r;let i=e[0];i instanceof Oe&&(e[1]&&O(G,"DisplacementFilter now uses options object instead of params. {sprite, scale}"),i={sprite:i,scale:e[1]});let n=(r=i.scale)!=null?r:20;typeof n=="number"&&(n=new W(n,n));const s=new re({filterMatrix:{value:new k,type:"mat3x3<f32>"},scale:{value:n,type:"vec2<f32>"},rotation:{value:new Float32Array([0,0,0,0]),type:"vec4<f32>"}}),o=_e.from({vertex:Hc,fragment:Nc,name:"displacement-filter"}),a=Ae.from({vertex:{source:vs,entryPoint:"mainVertex"},fragment:{source:vs,entryPoint:"mainFragment"}}),l=i.sprite.texture.source;super({gpuProgram:a,glProgram:o,resources:{filterUniforms:s,mapTexture:l,mapSampler:l.style}}),this._sprite=i.sprite,this._sprite.renderable=!1}apply(e,r,i,n){const s=this.resources.filterUniforms.uniforms;e.calculateSpriteMatrix(s.filterMatrix,this._sprite);const o=this._sprite.worldTransform,a=Math.sqrt(o.a*o.a+o.b*o.b),l=Math.sqrt(o.c*o.c+o.d*o.d);a!==0&&l!==0&&(s.rotation[0]=o.a/a,s.rotation[1]=o.b/a,s.rotation[2]=o.c/l,s.rotation[3]=o.d/l),this.resources.mapTexture=this._sprite.texture.source,e.applyFilter(this,r,i,n)}get scale(){return this.resources.filterUniforms.uniforms.scale}}var jc=`
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
`,ys=`

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
}`,Sy=Object.defineProperty,Wc=Object.getOwnPropertySymbols,Py=Object.prototype.hasOwnProperty,Ay=Object.prototype.propertyIsEnumerable,Vc=(t,e,r)=>e in t?Sy(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Yc=(t,e)=>{for(var r in e||(e={}))Py.call(e,r)&&Vc(t,r,e[r]);if(Wc)for(var r of Wc(e))Ay.call(e,r)&&Vc(t,r,e[r]);return t};const Xc=class extends Ce{constructor(t={}){var e,r,i;t=Yc(Yc({},Xc.DEFAULT),t);const n=new Ae({vertex:{source:ys,entryPoint:"mainVertex"},fragment:{source:ys,entryPoint:"mainFragment"}}),s=new _e({vertex:ms,fragment:jc,name:"noise-filter"});super({gpuProgram:n,glProgram:s,resources:{noiseUniforms:new re({uNoise:{value:t.noise,type:"f32"},uSeed:{value:(e=t.seed)!=null?e:Math.random(),type:"f32"}})},resolution:1});const o=(r=t.noise)!=null?r:.5,a=(i=t.seed)!=null?i:Math.random();this.noise=o,this.seed=a}get noise(){return this.resources.noiseUniforms.uniforms.uNoise}set noise(t){this.resources.noiseUniforms.uniforms.uNoise=t}get seed(){return this.resources.noiseUniforms.uniforms.uSeed}set seed(t){this.resources.noiseUniforms.uniforms.uSeed=t}};let qc=Xc;qc.DEFAULT={noise:.5,seed:void 0};var Kc=`
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
`,Zc=`in vec2 aPosition;
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
`,xs=`struct GlobalUniforms {
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
`,Ey=Object.defineProperty,Qc=Object.getOwnPropertySymbols,Cy=Object.prototype.hasOwnProperty,My=Object.prototype.propertyIsEnumerable,Jc=(t,e,r)=>e in t?Ey(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ed=(t,e)=>{for(var r in e||(e={}))Cy.call(e,r)&&Jc(t,r,e[r]);if(Qc)for(var r of Qc(e))My.call(e,r)&&Jc(t,r,e[r]);return t};const td=class extends Ce{constructor(t={}){t=ed(ed({},td.DEFAULT),t);const e=new Ae({vertex:{source:xs,entryPoint:"mainVertex"},fragment:{source:xs,entryPoint:"mainFragment"}}),r=new _e({vertex:Zc,fragment:Kc,name:"shockwave-filter"});super({gpuProgram:e,glProgram:r,resources:{shockwaveUniforms:new re({uTime:{value:0,type:"f32"},uCenter:{value:t.center,type:"vec2<f32>"},uSpeed:{value:t.speed,type:"f32"},uWave:{value:new Float32Array(4),type:"vec4<f32>"}})},resolution:1}),this.time=0,this.uniforms=this.resources.shockwaveUniforms.uniforms,Object.assign(this,t)}apply(t,e,r,i){this.uniforms.uTime=this.time,t.applyFilter(this,e,r,i)}get center(){return this.uniforms.uCenter}set center(t){this.uniforms.uCenter=t}get centerX(){return this.uniforms.uCenter.x}set centerX(t){this.uniforms.uCenter.x=t}get centerY(){return this.uniforms.uCenter.y}set centerY(t){this.uniforms.uCenter.y=t}get speed(){return this.uniforms.uSpeed}set speed(t){this.uniforms.uSpeed=t}get amplitude(){return this.uniforms.uWave[0]}set amplitude(t){this.uniforms.uWave[0]=t}get wavelength(){return this.uniforms.uWave[1]}set wavelength(t){this.uniforms.uWave[1]=t}get brightness(){return this.uniforms.uWave[2]}set brightness(t){this.uniforms.uWave[2]=t}get radius(){return this.uniforms.uWave[3]}set radius(t){this.uniforms.uWave[3]=t}};let rd=td;rd.DEFAULT={center:{x:0,y:0},speed:500,amplitude:30,wavelength:160,brightness:1,radius:-1};class _s{constructor(e){this._renderer=e}push(e,r,i){this._renderer.renderPipes.batch.break(i),i.add({type:"filter",canBundle:!1,action:"pushFilter",container:r,filterEffect:e})}pop(e,r,i){this._renderer.renderPipes.batch.break(i),i.add({type:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}_s.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"filter"};class we extends ue{constructor({data:e,size:r,usage:i,label:n}){super(),this.resourceType="buffer",this.resourceId=q("bufferResource"),this.touched=0,this.uid=q("buffer"),this._updateID=1,e instanceof Array&&(e=new Float32Array(e)),this._data=e,r=r!=null?r:e==null?void 0:e.byteLength;const s=!!e;this.descriptor={size:r,usage:i,mappedAtCreation:s,label:n}}get data(){return this._data}set data(e){if(this._data!==e){const r=this._data;this._data=e,r.length!==e.length?(this.descriptor.size=e.byteLength,this.resourceId=q("bufferResource"),this.emit("change",this)):this.emit("update",this)}}update(e){this._updateSize=e||this.descriptor.size,this._updateID++,this.emit("update",this)}destroy(){this.emit("destroy",this),this._data=null,this.descriptor=null,this.removeAllListeners()}}var N=(t=>(t[t.MAP_READ=1]="MAP_READ",t[t.MAP_WRITE=2]="MAP_WRITE",t[t.COPY_SRC=4]="COPY_SRC",t[t.COPY_DST=8]="COPY_DST",t[t.INDEX=16]="INDEX",t[t.VERTEX=32]="VERTEX",t[t.UNIFORM=64]="UNIFORM",t[t.STORAGE=128]="STORAGE",t[t.INDIRECT=256]="INDIRECT",t[t.QUERY_RESOLVE=512]="QUERY_RESOLVE",t[t.STATIC=1024]="STATIC",t))(N||{});function ws(t,e){if(!(t instanceof we)){let r=e?N.INDEX:N.VERTEX;t instanceof Array&&(e?(t=new Uint32Array(t),r=N.INDEX|N.COPY_DST):(t=new Float32Array(t),r=N.VERTEX|N.COPY_DST)),t=new we({data:t,label:"index-mesh-buffer",usage:r})}return t}class pi extends ue{constructor({attributes:e,indexBuffer:r,topology:i}){super(),this.uid=q("geometry"),this._layoutKey=0,this.attributes=e,this.buffers=[];for(const n in e){const s=e[n];s.buffer=ws(s.buffer,!1),this.buffers.indexOf(s.buffer)===-1&&(this.buffers.push(s.buffer),s.buffer.on("update",this.onBufferUpdate,this))}r&&(this.indexBuffer=ws(r,!0),this.buffers.push(this.indexBuffer)),this.topology=i||"triangle-list"}onBufferUpdate(){this.emit("update",this)}getAttribute(e){return this.attributes[e]}getIndex(){return this.indexBuffer}getBuffer(e){return this.getAttribute(e).buffer}getSize(){for(const e in this.attributes){const r=this.attributes[e];return this.getBuffer(e).data.length/(r.stride/4||r.size)}return 0}destroy(e=!1){this.emit("destroy",this),this.removeAllListeners(),e&&this.buffers.forEach(r=>r.destroy()),this.attributes=null,this.buffers=null}}function id(t,e){e.clear();const r=e.matrix;for(let i=0;i<t.length;i++){const n=t[i];n.layerVisibleRenderable<3||(e.matrix=n.worldTransform,n.view.addBounds(e))}return e.matrix=r,e}const By=new pi({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),shaderLocation:0,format:"float32x2",stride:2*4,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Ts{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new re({inputSize:{value:new Float32Array(4),type:"vec4<f32>"},inputPixel:{value:new Float32Array(4),type:"vec4<f32>"},inputClamp:{value:new Float32Array(4),type:"vec4<f32>"},outputFrame:{value:new Float32Array(4),type:"vec4<f32>"},globalFrame:{value:new Float32Array(4),type:"vec4<f32>"},outputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Be({}),this.renderer=e}push(e){var r,i;const n=this.renderer,s=e.filterEffect.filters;this._filterStack[this._filterStackIndex]||(this._filterStack[this._filterStackIndex]=this._getFilterData());const o=this._filterStack[this._filterStackIndex];this._filterStackIndex++;const a=o.bounds;if(e.renderables?id(e.renderables,a):qt(e.container,!0,a),s.length===0){o.skip=!0;return}let l=n.renderTarget.rootRenderTarget.colorTexture.source._resolution,u=0,h=n.renderTarget.rootRenderTarget.colorTexture.source.antialias,c=!1,p=!1;for(let d=0;d<s.length;d++){const f=s[d];if(l=Math.min(l,f.resolution),u+=f.padding,f.antialias!=="inherit"&&(f.antialias==="on"?h=!0:h=!1),!(f.compatibleRenderers&n.type)){p=!1;break}if(f.blendRequired&&!((i=(r=n.backBuffer)==null?void 0:r.useBackBuffer)==null||i)){p=!1;break}p=f.enabled||p,c=c||f.blendRequired}if(!p){o.skip=!0;return}if(a.scale(l).fit(n.renderTarget.rootRenderTarget.viewport).scale(1/l).pad(u).ceil(),!a.isPositive){o.skip=!0;return}o.skip=!1,o.bounds=a,o.blendRequired=c,o.container=e.container,o.filterEffect=e.filterEffect,o.previousRenderSurface=n.renderTarget.renderTarget,o.inputTexture=le.getOptimalTexture(a.width,a.height,l,h),n.renderTarget.bind(o.inputTexture,!0),n.globalUniforms.push({offset:a})}pop(){var e,r;const i=this.renderer;this._filterStackIndex--;const n=this._filterStack[this._filterStackIndex];if(n.skip)return;this._activeFilterData=n;const s=n.inputTexture,o=n.bounds;let a=A.EMPTY;if((r=(e=i.renderTarget).finishRenderPass)==null||r.call(e),n.blendRequired){i.encoder.finishRenderPass();const u=this._filterStackIndex>0?this._filterStack[this._filterStackIndex-1].bounds:null;a=this.getBackTexture(n.previousRenderSurface,o,u)}n.backTexture=a;const l=n.filterEffect.filters;if(this._globalFilterBindGroup.setResource(s.source.style,2),this._globalFilterBindGroup.setResource(a.source,3),i.globalUniforms.pop(),l.length===1)l[0].apply(this,s,n.previousRenderSurface,!1),le.returnTexture(s);else{let u=n.inputTexture,h=le.getOptimalTexture(o.width,o.height,u.source._resolution,!1),c=0;for(c=0;c<l.length-1;++c){l[c].apply(this,u,h,!0);const p=u;u=h,h=p}l[c].apply(this,u,n.previousRenderSurface,!1),le.returnTexture(u),le.returnTexture(h)}n.blendRequired&&le.returnTexture(a)}getBackTexture(e,r,i){const n=e.colorTexture.source._resolution,s=le.getOptimalTexture(r.width,r.height,n,!1);let o=r.minX,a=r.minY;i&&(o-=i.minX,a-=i.minY),o=Math.floor(o*n),a=Math.floor(a*n);const l=Math.ceil(r.width*n),u=Math.ceil(r.height*n);return this.renderer.renderTarget.copyToTexture(e,s,{x:o,y:a},{width:l,height:u}),s}applyFilter(e,r,i,n){const s=this.renderer,o=this._filterStack[this._filterStackIndex],a=o.bounds,l=W.shared,u=o.previousRenderSurface===this.renderer.renderTarget.getRenderTarget(i);let h=this.renderer.renderTarget.rootRenderTarget.colorTexture.source._resolution;this._filterStackIndex>0&&(h=this._filterStack[this._filterStackIndex-1].inputTexture.source._resolution);const c=this._filterGlobalUniforms,p=c.uniforms,d=p.outputFrame,f=p.inputSize,m=p.inputPixel,g=p.inputClamp,x=p.globalFrame,v=p.outputTexture;u?(this._filterStackIndex>0&&(l.x=this._filterStack[this._filterStackIndex-1].bounds.minX,l.y=this._filterStack[this._filterStackIndex-1].bounds.minY),d[0]=a.minX-l.x,d[1]=a.minY-l.y):(d[0]=0,d[1]=0),d[2]=r.frameWidth,d[3]=r.frameHeight,f[0]=r.source.width,f[1]=r.source.height,f[2]=1/f[0],f[3]=1/f[1],m[0]=r.source.pixelWidth,m[1]=r.source.pixelHeight,m[2]=1/m[0],m[3]=1/m[1],g[0]=.5*m[2],g[1]=.5*m[3],g[2]=r.frameWidth*f[2]-.5*m[2],g[3]=r.frameHeight*f[3]-.5*m[3];const y=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=l.x*h,x[1]=l.y*h,x[2]=y.source.width*h,x[3]=y.source.height*h;const _=this.renderer.renderTarget.getRenderTarget(i);if(v[0]=_.colorTexture.frameWidth,v[1]=_.colorTexture.frameHeight,v[2]=_.isRoot?-1:1,c.update(),s.renderPipes.uniformBatch){const P=s.renderPipes.uniformBatch.getUniformBufferResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(P,0)}else this._globalFilterBindGroup.setResource(c,0);this._globalFilterBindGroup.setResource(r.source,1),this._globalFilterBindGroup.setResource(r.source.style,2),s.renderTarget.bind(i,!!n),e.groups[0]=this._globalFilterBindGroup,s.encoder.draw({geometry:By,shader:e,state:e._state,topology:"triangle-list"})}_getFilterData(){return{skip:!1,inputTexture:null,bounds:new pe,container:null,filterEffect:null,blendRequired:!1,previousRenderSurface:null}}calculateSpriteMatrix(e,r){const i=this._activeFilterData,n=e.set(i.inputTexture._source.width,0,0,i.inputTexture._source.height,i.bounds.minX,i.bounds.minY),s=r.worldTransform.copyTo(k.shared);return s.invert(),n.prepend(s),n.scale(1/r.texture.frameWidth,1/r.texture.frameHeight),n.translate(r.anchor.x,r.anchor.y),n}}Ts.extension={type:[b.WebGLSystem,b.WebGPUSystem],name:"filter"};var nd=`in vec2 vMaskCoord;
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
`,sd=`in vec2 aPosition;

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
`,Ss=`struct GlobalFilterUniforms {
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
  
}`;class od extends Ce{constructor({sprite:e}){const r=new Pn(e.texture),i=new re({filterMatrix:{value:new k,type:"mat3x3<f32>"},maskClamp:{value:r.uClampFrame,type:"vec4<f32>"},alpha:{value:1,type:"f32"}}),n=new Ae({vertex:{source:Ss,entryPoint:"mainVertex"},fragment:{source:Ss,entryPoint:"mainFragment"}}),s=_e.from({vertex:sd,fragment:nd,name:"mask-filter"});super({gpuProgram:n,glProgram:s,resources:{filterUniforms:i,mapTexture:e.texture.source}}),this.sprite=e,this._textureMatrix=r}apply(e,r,i,n){this._textureMatrix.texture=this.sprite.texture,e.calculateSpriteMatrix(this.resources.filterUniforms.uniforms.filterMatrix,this.sprite).prepend(this._textureMatrix.mapCoord),this.resources.mapTexture=this.sprite.texture.source,e.applyFilter(this,r,i,n)}}class Ua{constructor(e=0,r=0,i=0,n=0,s=0,o=0){this.type="triangle",this.x=e,this.y=r,this.x2=i,this.y2=n,this.x3=s,this.y3=o}contains(e,r){const i=(this.x-this.x3)*(r-this.y3)-(this.y-this.y3)*(e-this.x3),n=(this.x2-this.x)*(r-this.y)-(this.y2-this.y)*(e-this.x);if(i<0!=n<0&&i!==0&&n!==0)return!1;const s=(this.x3-this.x2)*(r-this.y2)-(this.y3-this.y2)*(e-this.x2);return s===0||s<0==i+n<=0}clone(){return new Ua(this.x,this.y,this.x2,this.y2,this.x3,this.y3)}copyFrom(e){return this.x=e.x,this.y=e.y,this.x2=e.x2,this.y2=e.y2,this.x3=e.x3,this.y3=e.y3,this}copyTo(e){return e.copyFrom(this),e}getBounds(e){e=e||new Q;const r=Math.min(this.x,this.x2,this.x3),i=Math.max(this.x,this.x2,this.x3),n=Math.min(this.y,this.y2,this.y3),s=Math.max(this.y,this.y2,this.y3);return e.x=r,e.y=n,e.width=i-r,e.height=s-n,e}}function Ps(t,e,r){if(t)for(const i in t){const n=i.toLocaleLowerCase(),s=e[n];if(s){let o=t[i];i==="header"&&(o=o.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),r&&s.push(`//----${r}----//`),s.push(o)}}}const ad=/\{\{(.*?)\}\}/g;function As(t){var e,r;const i={};return((r=(e=t.match(ad))==null?void 0:e.map(n=>n.replace(/[{()}]/g,"")))!=null?r:[]).forEach(n=>{i[n]=[]}),i}function ld(t,e){let r;const i=/@in\s+([^;]+);/g;for(;(r=i.exec(t))!==null;)e.push(r[1])}function Es(t,e,r=!1){const i=[];ld(e,i),t.forEach(a=>{a.header&&ld(a.header,i)});const n=i;r&&n.sort();const s=n.map((a,l)=>`       @location(${l}) ${a},`).join(`
`);let o=e.replace(/@in\s+[^;]+;\s*/g,"");return o=o.replace("{{in}}",`
${s}
`),o}function ud(t,e){let r;const i=/@out\s+([^;]+);/g;for(;(r=i.exec(t))!==null;)e.push(r[1])}function Ry(t){const e=/\b(\w+)\s*:/g.exec(t);return e?e[1]:""}function ky(t){const e=/@.*?\s+/g;return t.replace(e,"")}function hd(t,e){const r=[];ud(e,r),t.forEach(l=>{l.header&&ud(l.header,r)});let i=0;const n=r.sort().map(l=>l.indexOf("builtin")>-1?l:`@location(${i++}) ${l}`).join(`,
`),s=r.sort().map(l=>`       var ${ky(l)};`).join(`
`),o=`return VSOutput(
                ${r.sort().map(l=>` ${Ry(l)}`).join(`,
`)});`;let a=e.replace(/@out\s+[^;]+;\s*/g,"");return a=a.replace("{{struct}}",`
${n}
`),a=a.replace("{{start}}",`
${s}
`),a=a.replace("{{return}}",`
${o}
`),a}function Cs(t,e){let r=t;for(const i in e){const n=e[i];n.join(`
`).length?r=r.replace(`{{${i}}}`,`//-----${i} START-----//
${n.join(`
`)}
//----${i} FINISH----//`):r=r.replace(`{{${i}}}`,"")}return r}const ft=Object.create(null),Ms=new Map;let Oy=0;function cd({template:t,bits:e}){const r=pd(t,e);if(ft[r])return ft[r];const{vertex:i,fragment:n}=Fy(t,e);return ft[r]=fd(i,n,e),ft[r]}function dd({template:t,bits:e}){const r=pd(t,e);return ft[r]||(ft[r]=fd(t.vertex,t.fragment,e)),ft[r]}function Fy(t,e){const r=e.map(o=>o.vertex).filter(o=>!!o),i=e.map(o=>o.fragment).filter(o=>!!o);let n=Es(r,t.vertex);n=hd(r,n);const s=Es(i,t.fragment,!0);return{vertex:n,fragment:s}}function pd(t,e){return e.map(r=>(Ms.has(r)||Ms.set(r,Oy++),Ms.get(r))).sort((r,i)=>r-i).join("-")+t.vertex+t.fragment}function fd(t,e,r){const i=As(t),n=As(e);return r.forEach(s=>{Ps(s.vertex,i,s.name),Ps(s.fragment,n,s.name)}),{vertex:Cs(t,i),fragment:Cs(e,n)}}const gd=`
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
`,md=`
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
`,bd=`
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
`,vd=`
   
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
`,yd={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            projectionMatrix:mat3x3<f32>,
            worldTransformMatrix:mat3x3<f32>,
            worldAlpha: f32,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},xd={name:"global-uniforms-bit",vertex:{header:`
          uniform globalUniforms {
            mat3 projectionMatrix;
            mat3 worldTransformMatrix;
            float worldAlpha;
            vec2 uResolution;
          };
        `}};var Uy=Object.defineProperty,_d=Object.getOwnPropertySymbols,Iy=Object.prototype.hasOwnProperty,Gy=Object.prototype.propertyIsEnumerable,wd=(t,e,r)=>e in t?Uy(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,$y=(t,e)=>{for(var r in e||(e={}))Iy.call(e,r)&&wd(t,r,e[r]);if(_d)for(var r of _d(e))Gy.call(e,r)&&wd(t,r,e[r]);return t};function Mt({bits:t,name:e}){const r=cd({template:{fragment:md,vertex:gd},bits:[yd,...t]});return new Ae({name:e,vertex:{source:r.vertex,entryPoint:"main"},fragment:{source:r.fragment,entryPoint:"main"}})}function Bt({bits:t,name:e}){return new _e($y({name:e},dd({template:{vertex:bd,fragment:vd},bits:[xd,...t]})))}const fi={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},gi={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}},Bs={};function Ly(t){const e=[];if(t===1)e.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),e.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let r=0;for(let i=0;i<t;i++)e.push(`@group(1) @binding(${r++}) var textureSource${i+1}: texture_2d<f32>;`),e.push(`@group(1) @binding(${r++}) var textureSampler${i+1}: sampler;`)}return e.join(`
`)}function Dy(t){const e=[];if(t===1)e.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{e.push("switch vTextureId {");for(let r=0;r<t;r++)r===t-1?e.push("  default:{"):e.push(`  case ${r}:{`),e.push(`      outColor = textureSampleGrad(textureSource${r+1}, textureSampler${r+1}, vUV, uvDx, uvDy);`),e.push("      break;}");e.push("}")}return e.join(`
`)}function mi(t){return Bs[t]||(Bs[t]={name:"texture-batch-bit",vertex:{header:`
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
    
                ${Ly(16)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${Dy(16)}
            `}}),Bs[t]}const Rs={};function zy(t){const e=[];for(let r=0;r<t;r++)r>0&&e.push("else"),r<t-1&&e.push(`if(vTextureId < ${r}.5)`),e.push("{"),e.push(`	outColor = texture(uSamplers[${r}], vUV);`),e.push("}");return e.join(`
`)}function bi(t){return Rs[t]||(Rs[t]={name:"texture-batch-bit",vertex:{header:`
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
    
                uniform sampler2D uSamplers[${t}];
              
            `,main:`
    
                ${zy(16)}
            `}}),Rs[t]}const Rt={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},kt={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor((position * 0.5 + 0.5) * targetSize) / targetSize) * 2.0 - 1.0;
            }
        `}},Te=16,Td=new Int32Array(Te);for(let t=0;t<Te;t++)Td[t]=t;const vi=new re({uSamplers:{value:Td,type:"u32",size:Te}},{isStatic:!0});class ks{constructor(){this._didUpload=!1,this._tempState=Se.for2d()}init(){const e=new re({tint:{value:new Float32Array([1,1,1,1]),type:"f32"},translationMatrix:{value:new k,type:"mat3x3<f32>"}}),r=Bt({name:"batch",bits:[gi,bi(Te),kt]});this._shader=new Ee({glProgram:r,resources:{uniforms:e,batchSamplers:vi}})}start(e,r){const i=e.renderer;i.shader.bind(this._shader,this._didUpload),i.shader.bindUniformBlock(i.globalUniforms.uniformGroup,"globalUniforms",0),i.geometry.bind(r,this._shader.glProgram)}execute(e,r){const i=e.renderer;this._didUpload=!0,this._tempState.blendMode=r.blendMode,i.state.set(this._tempState);const n=r.textures.textures;for(let s=0;s<n.length;s++)i.texture.bind(n[s],s);i.geometry.draw("triangle-list",r.size,r.start)}destroy(){this._shader.destroy(!0),this._shader=null}}ks.extension={type:[b.WebGLPipesAdaptor],name:"batch"};const Sd=new Float32Array(1),Pd=new Uint32Array(1);class Os extends pi{constructor(){const e=new we({data:Sd,label:"attribute-batch-buffer",usage:N.VERTEX|N.COPY_DST}),r=new we({data:Pd,label:"index-batch-buffer",usage:N.INDEX|N.COPY_DST}),i=6*4;super({attributes:{aPosition:{buffer:e,shaderLocation:0,format:"float32x2",stride:i,offset:0},aUV:{buffer:e,shaderLocation:1,format:"float32x2",stride:i,offset:2*4},aColor:{buffer:e,shaderLocation:2,format:"unorm8x4",stride:i,offset:4*4},aTextureIdAndRound:{buffer:e,shaderLocation:3,format:"uint16x2",stride:i,offset:5*4}},indexBuffer:r})}reset(){this.indexBuffer.data=Pd,this.buffers[0].data=Sd}}function Ny(t){const e=[];let r=0;for(let i=0;i<t;i++)e[r]={texture:{sampleType:"float",viewDimension:"2d",multisampled:!1},binding:r,visibility:GPUShaderStage.FRAGMENT},r++,e[r]={sampler:{type:"filtering"},binding:r,visibility:GPUShaderStage.FRAGMENT},r++;return e}function Hy(t){const e={};let r=0;for(let i=0;i<t;i++)e[`textureSource${i+1}`]=r++,e[`textureSampler${i+1}`]=r++;return e}const Ad={};function yi(t,e){let r=0;for(let i=0;i<e;i++)r=r*31+t[i].uid>>>0;return Ad[r]||jy(t,r)}function jy(t,e){const r={};let i=0;for(let s=0;s<Te;s++){const o=s<t.length?t[s]:A.EMPTY.source;r[i++]=o.source,r[i++]=o.style}const n=new Be(r);return Ad[e]=n,n}const xi=Se.for2d();class Fs{init(){const e=Mt({name:"batch",bits:[fi,mi(Te),Rt]});this._shader=new Ee({gpuProgram:e,groups:{}})}start(e,r){const i=e.renderer,n=i.encoder,s=this._shader.gpuProgram;this._geometry=r,n.setGeometry(r),xi.blendMode="normal",i.pipeline.getPipeline(r,s,xi);const o=i.globalUniforms.bindGroup;n.setBindGroup(0,o,s)}execute(e,r){const i=this._shader.gpuProgram,n=e.renderer,s=n.encoder;if(!r.bindGroup){const l=r.textures;r.bindGroup=yi(l.textures,l.count)}xi.blendMode=r.blendMode;const o=n.bindGroup.getBindGroup(r.bindGroup,i,1),a=n.pipeline.getPipeline(this._geometry,i,xi);r.bindGroup.touch(n.textureGC.count),s.setPipeline(a),s.renderPassEncoder.setBindGroup(1,o),s.renderPassEncoder.drawIndexed(r.size,1,r.start)}destroy(){this._shader.destroy(!0),this._shader=null}}Fs.extension={type:[b.WebGPUPipesAdaptor],name:"batch"};class Us{constructor(e){typeof e=="number"?this.rawBinaryData=new ArrayBuffer(e):e instanceof Uint8Array?this.rawBinaryData=e.buffer:this.rawBinaryData=e,this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){return this._int8View||(this._int8View=new Int8Array(this.rawBinaryData)),this._int8View}get uint8View(){return this._uint8View||(this._uint8View=new Uint8Array(this.rawBinaryData)),this._uint8View}get int16View(){return this._int16View||(this._int16View=new Int16Array(this.rawBinaryData)),this._int16View}get int32View(){return this._int32View||(this._int32View=new Int32Array(this.rawBinaryData)),this._int32View}get float64View(){return this._float64Array||(this._float64Array=new Float64Array(this.rawBinaryData)),this._float64Array}get bigUint64View(){return this._bigUint64Array||(this._bigUint64Array=new BigUint64Array(this.rawBinaryData)),this._bigUint64Array}view(e){return this[`${e}View`]}destroy(){this.rawBinaryData=null,this._int8View=null,this._uint8View=null,this._int16View=null,this.uint16View=null,this._int32View=null,this.uint32View=null,this.float32View=null}static sizeOf(e){switch(e){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw new Error(`${e} isn't a valid view type`)}}}function _i(t,e){const r=t.byteLength/8|0,i=new Float64Array(t,0,r),n=new Float64Array(e,0,r);for(let a=0;a<r;a++)n[a]=i[a];const s=new Uint8Array(t,r*8),o=new Uint8Array(e,r*8);for(let a=0;a<s.length;a++)o[a]=s[a]}class Is{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let e=0;e<this.count;e++){const r=this.textures[e];this.textures[e]=null,this.ids[r.uid]=null}this.count=0}}class Gs{constructor(){this.type="batch",this.action="startBatch",this.start=0,this.size=0,this.blendMode="normal",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null}}let br=0;class $s{constructor(e=4,r=6){this.uid=q("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._vertexSize=6,this._elements=[],this._batchPool=[],this._batchPoolIndex=0,this._textureBatchPool=[],this._textureBatchPoolIndex=0,this.attributeBuffer=new Us(e*this._vertexSize*4),this.indexBuffer=new Uint32Array(r)}begin(){this.batchIndex=0,this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0,this._batchPoolIndex=0,this._textureBatchPoolIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(e){this._elements[this.elementSize++]=e,e.indexStart=this.indexSize,e.location=this.attributeSize,e.batcher=this,this.indexSize+=e.indexSize,this.attributeSize+=e.vertexSize*this._vertexSize}checkAndUpdateTexture(e,r){const i=e.batch.textures.ids[r._source.uid];return!i&&i!==0?!1:(e.textureId=i,e.texture=r,!0)}updateElement(e){this.dirty=!0,e.packAttributes(this.attributeBuffer.float32View,this.attributeBuffer.uint32View,e.location,e.textureId)}break(e){const r=this._elements;let i=this._textureBatchPool[this._textureBatchPoolIndex++]||new Is;if(i.clear(),!r[this.elementStart])return;let n=r[this.elementStart].blendMode;this.attributeSize*4>this.attributeBuffer.size&&this._resizeAttributeBuffer(this.attributeSize*4),this.indexSize>this.indexBuffer.length&&this._resizeIndexBuffer(this.indexSize);const s=this.attributeBuffer.float32View,o=this.attributeBuffer.uint32View,a=this.indexBuffer;let l=this._batchIndexSize,u=this._batchIndexStart,h="startBatch",c=this._batchPool[this._batchPoolIndex++]||new Gs;for(let p=this.elementStart;p<this.elementSize;++p){const d=r[p];r[p]=null;const f=d.texture._source,m=n!==d.blendMode;if(f._batchTick===br&&!m){d.textureId=f._textureBindLocation,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize),d.batch=c;continue}f._batchTick=br,(i.count>=Te||m)&&(this._finishBatch(c,u,l-u,i,n,e,h),h="renderBatch",u=l,n=d.blendMode,i=this._textureBatchPool[this._textureBatchPoolIndex++]||new Is,i.clear(),c=this._batchPool[this._batchPoolIndex++]||new Gs,++br),d.textureId=f._textureBindLocation=i.count,i.ids[f.uid]=i.count,i.textures[i.count++]=f,d.batch=c,l+=d.indexSize,d.packAttributes(s,o,d.location,d.textureId),d.packIndex(a,d.indexStart,d.location/this._vertexSize)}i.count>0&&(this._finishBatch(c,u,l-u,i,n,e,h),u=l,++br),this.elementStart=this.elementSize,this._batchIndexStart=u,this._batchIndexSize=l}_finishBatch(e,r,i,n,s,o,a){e.gpuBindGroup=null,e.action=a,e.batcher=this,e.textures=n,e.blendMode=s,e.start=r,e.size=i,++br,o.add(e)}finish(e){this.break(e)}ensureAttributeBuffer(e){e*4<this.attributeBuffer.size||this._resizeAttributeBuffer(e*4)}ensureIndexBuffer(e){e<this.indexBuffer.length||this._resizeIndexBuffer(e)}_resizeAttributeBuffer(e){const r=Math.max(e,this.attributeBuffer.size*2),i=new Us(r);_i(this.attributeBuffer.rawBinaryData,i.rawBinaryData),this.attributeBuffer=i}_resizeIndexBuffer(e){const r=this.indexBuffer,i=Math.max(e,r.length*2),n=new Uint32Array(i);_i(r.buffer,n.buffer),this.indexBuffer=n}destroy(){for(let e=0;e<this.batches.length;e++)this.batches[e].destroy();this.batches=null;for(let e=0;e<this._elements.length;e++)this._elements[e].batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}}class Ls{constructor(e,r){this.state=Se.for2d(),this._batches=Object.create(null),this._geometries=Object.create(null),this.renderer=e,this._adaptor=r,this._adaptor.init()}buildStart(e){if(!this._batches[e.uid]){const r=new $s;this._batches[e.uid]=r,this._geometries[r.uid]=new Os}this._activeBatch=this._batches[e.uid],this._activeGeometry=this._geometries[this._activeBatch.uid],this._activeBatch.begin()}addToBatch(e){this._activeBatch.add(e)}break(e){this._activeBatch.break(e)}buildEnd(e){const r=this._activeBatch,i=this._activeGeometry;r.finish(e),i.indexBuffer.data=r.indexBuffer,i.indexBuffer.update(r.indexSize*4),i.buffers[0].data=r.attributeBuffer.float32View}upload(e){const r=this._batches[e.uid],i=this._geometries[r.uid];r.dirty&&(r.dirty=!1,i.buffers[0].update(r.attributeSize*4))}execute(e){if(e.action==="startBatch"){const r=e.batcher,i=this._geometries[r.uid];this._adaptor.start(this,i)}this._adaptor.execute(this,e)}destroy(){this.state=null,this.renderer=null,this._adaptor.destroy(),this._adaptor=null;for(const e in this._batches)this._batches[e].destroy();this._batches=null;for(const e in this._geometries)this._geometries[e].destroy();this._geometries=null}}Ls.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"batch"};function Wy(t){const e=t.split(/([\n{}])/g).map(i=>i.trim()).filter(i=>i.length);let r="";return e.map(i=>{let n=r+i;return i==="{"?r+="    ":i==="}"&&(r=r.substr(0,r.length-4),n=r+i),n}).join(`
`)}var Vy=Object.defineProperty,Yy=Object.defineProperties,Xy=Object.getOwnPropertyDescriptors,Ed=Object.getOwnPropertySymbols,qy=Object.prototype.hasOwnProperty,Ky=Object.prototype.propertyIsEnumerable,Cd=(t,e,r)=>e in t?Vy(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Md=(t,e)=>{for(var r in e||(e={}))qy.call(e,r)&&Cd(t,r,e[r]);if(Ed)for(var r of Ed(e))Ky.call(e,r)&&Cd(t,r,e[r]);return t},Bd=(t,e)=>Yy(t,Xy(e));const Ot={name:"local-uniform-bit",vertex:{header:`

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
        `}},Rd=Bd(Md({},Ot),{vertex:Bd(Md({},Ot.vertex),{header:Ot.vertex.header.replace("group(1)","group(2)")})}),vr={name:"local-uniform-bit",vertex:{header:`

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
        `}},kd={name:"texture-bit",fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;

         
        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},Od={name:"texture-bit",fragment:{header:`
        uniform sampler2D uTexture;

         
        `,main:`
            outColor = texture(uTexture, vUV);
        `}};class Fd extends ue{constructor({original:e,view:r}){super(),this.uid=q("renderable"),this.view=r,this._original=e,this.layerTransform=new k,this.layerColor=4294967295,this.layerVisibleRenderable=3,this.view.owner=this}get layerBlendMode(){return this._original.layerBlendMode}onViewUpdate(){this.didViewUpdate=!0,this._original.layerGroup.onChildViewUpdate(this)}get isRenderable(){return this._original.isRenderable}}function Ud(t,e){const r=t.root,i=t.instructionSet;i.reset(),e.batch.buildStart(i),e.blendMode.buildStart(),e.colorMask.buildStart(),r.sortableChildren&&r.sortChildren(),Id(r,i,e,!0),e.batch.buildEnd(i),e.blendMode.buildEnd(i)}function yr(t,e,r){t.layerVisibleRenderable<3||!t.includeInBuild||(t.sortableChildren&&t.sortChildren(),t.isSimple?Zy(t,e,r):Id(t,e,r,!1))}function Zy(t,e,r){const i=t.view;if(i&&(r.blendMode.setBlendMode(t,t.layerBlendMode,e),t.didViewUpdate=!1,r[i.renderPipeId].addRenderable(t,e)),!t.isLayerRoot){const n=t.children,s=n.length;for(let o=0;o<s;o++)yr(n[o],e,r)}}function Id(t,e,r,i){var n;if(i){const s=t.layerGroup;if(s.root.view){const o=(n=s.proxyRenderable)!=null?n:Qy(s);o&&(r.blendMode.setBlendMode(o,o.layerBlendMode,e),r[o.view.renderPipeId].addRenderable(o,e))}}else for(let s=0;s<t.effects.length;s++){const o=t.effects[s];r[o.pipe].push(o,t,e)}if(!i&&t.isLayerRoot)r.layer.addLayerGroup(t.layerGroup,e);else{const s=t.view;s&&(r.blendMode.setBlendMode(t,t.layerBlendMode,e),t.didViewUpdate=!1,r[s.renderPipeId].addRenderable(t,e));const o=t.children;if(o.length)for(let a=0;a<o.length;a++)yr(o[a],e,r)}if(!i)for(let s=t.effects.length-1;s>=0;s--){const o=t.effects[s];r[o.pipe].pop(o,t,e)}}function Qy(t){const e=t.root;t.proxyRenderable=new Fd({original:e,view:e.view})}const Jy=new pe;class ex extends $r{constructor(){super({filters:[new od({sprite:new Oe(A.EMPTY)})]})}get sprite(){return this.filters[0].sprite}set sprite(e){this.filters[0].sprite=e}}class Ds{constructor(e){this._activeMaskStage=[],this._renderer=e}push(e,r,i){const n=this._renderer;if(n.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"pushMaskBegin",mask:e,canBundle:!1,maskedContainer:r}),e.renderMaskToTexture){const s=e.mask;s.includeInBuild=!0,yr(s,i,n.renderPipes),s.includeInBuild=!1}n.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"pushMaskEnd",mask:e,maskedContainer:r,canBundle:!1})}pop(e,r,i){this._renderer.renderPipes.batch.break(i),i.add({type:"alphaMask",action:"popMaskEnd",mask:e,canBundle:!1})}execute(e){const r=this._renderer,i=e.mask.renderMaskToTexture;if(e.action==="pushMaskBegin"){const n=z.get(ex);if(i){e.mask.mask.measurable=!0;const s=qt(e.mask.mask,!0,Jy);e.mask.mask.measurable=!1,s.ceil();const o=le.getOptimalTexture(s.width,s.height,1,!1),a=r.renderTarget.push(o,!0);r.globalUniforms.push({projectionData:a,offset:s,worldColor:4294967295});const l=n.sprite;l.texture=o,l.worldTransform.tx=s.minX,l.worldTransform.ty=s.minY,this._activeMaskStage.push({filterEffect:n,maskedContainer:e.maskedContainer,filterTexture:o})}else n.sprite=e.mask.mask,this._activeMaskStage.push({filterEffect:n,maskedContainer:e.maskedContainer})}else if(e.action==="pushMaskEnd"){const n=this._activeMaskStage[this._activeMaskStage.length-1];i&&(r.renderTarget.pop(),r.globalUniforms.pop()),r.filter.push({type:"filter",action:"pushFilter",container:n.maskedContainer,filterEffect:n.filterEffect,canBundle:!1})}else if(e.action==="popMaskEnd"){r.filter.pop();const n=this._activeMaskStage.pop();i&&le.returnTexture(n.filterTexture),z.return(n.filterEffect)}}destroy(){this._renderer=null,this._activeMaskStage=null}}Ds.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"alphaMask"};class zs{constructor(e){this._colorStack=[],this._colorStackIndex=0,this._currentColor=0,this._renderer=e}buildStart(){this._colorStack[0]=15,this._colorStackIndex=1,this._currentColor=15}push(e,r,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;n[this._colorStackIndex]=n[this._colorStackIndex-1]&e.mask;const s=this._colorStack[this._colorStackIndex];s!==this._currentColor&&(this._currentColor=s,i.add({type:"colorMask",colorMask:s,canBundle:!1})),this._colorStackIndex++}pop(e,r,i){this._renderer.renderPipes.batch.break(i);const n=this._colorStack;this._colorStackIndex--;const s=n[this._colorStackIndex-1];s!==this._currentColor&&(this._currentColor=s,i.add({type:"colorMask",colorMask:s,canBundle:!1}))}execute(e){this._renderer.colorMask.setMask(e.colorMask)}destroy(){this._colorStack=null}}zs.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"colorMask"};class tx{constructor(e){this.priority=0,this.pipe="scissorMask",this.mask=e,this.mask.renderable=!1,this.mask.measurable=!1}addBounds(e,r){ni(this.mask,e,r)}addLocalBounds(e,r){si(this.mask,e,r)}containsPoint(e,r){const i=this.mask;return r(i,e)}reset(){this.mask.measurable=!0,this.mask=null}destroy(){this.reset()}}var me=(t=>(t[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t))(me||{}),ne=(t=>(t[t.DISABLED=0]="DISABLED",t[t.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",t[t.MASK_ACTIVE=2]="MASK_ACTIVE",t[t.RENDERING_MASK_REMOVE=3]="RENDERING_MASK_REMOVE",t[t.NONE=4]="NONE",t))(ne||{});class Ns{constructor(e){this._maskStackHash={},this._maskHash=new WeakMap,this._renderer=e}push(e,r,i){const n=e,s=this._renderer;s.renderPipes.batch.break(i),s.renderPipes.blendMode.setBlendMode(n.mask,"none",i),i.add({type:"stencilMask",action:"pushMaskBegin",mask:e,canBundle:!1});const o=n.mask;o.includeInBuild=!0,this._maskHash.has(n)||this._maskHash.set(n,{instructionsStart:0,instructionsLength:0});const a=this._maskHash.get(n);a.instructionsStart=i.instructionSize,yr(o,i,s.renderPipes),o.includeInBuild=!1,s.renderPipes.batch.break(i),i.add({type:"stencilMask",action:"pushMaskEnd",mask:e,canBundle:!1});const l=i.instructionSize-a.instructionsStart-1;a.instructionsLength=l;const u=s.renderTarget.renderTarget.uid;this._maskStackHash[u]===void 0&&(this._maskStackHash[u]=0),this._maskStackHash[u]++}pop(e,r,i){const n=e,s=this._renderer,o=s.renderTarget.renderTarget.uid;this._maskStackHash[o]--,s.renderPipes.batch.break(i),s.renderPipes.blendMode.setBlendMode(n.mask,"none",i),i.add({type:"stencilMask",action:"popMaskBegin",canBundle:!1});const a=this._maskHash.get(e);if(this._maskStackHash[o]!==0)for(let l=0;l<a.instructionsLength;l++)i.instructions[i.instructionSize++]=i.instructions[a.instructionsStart++];i.add({type:"stencilMask",action:"popMaskEnd",canBundle:!1})}execute(e){var r;const i=this._renderer,n=i.renderTarget.renderTarget.uid;let s=(r=this._maskStackHash[n])!=null?r:0;e.action==="pushMaskBegin"?(s++,i.stencil.setStencilMode(ne.RENDERING_MASK_ADD,s),i.colorMask.setMask(0)):e.action==="pushMaskEnd"?(i.stencil.setStencilMode(ne.MASK_ACTIVE,s),i.colorMask.setMask(15)):e.action==="popMaskBegin"?(s--,s!==0?(i.stencil.setStencilMode(ne.RENDERING_MASK_REMOVE,s),i.colorMask.setMask(0)):i.renderTarget.clear(me.STENCIL)):e.action==="popMaskEnd"&&(s===0?i.stencil.setStencilMode(ne.DISABLED,s):i.stencil.setStencilMode(ne.MASK_ACTIVE,s),i.colorMask.setMask(15)),this._maskStackHash[n]=s}destroy(){this._renderer=null,this._maskStackHash=null,this._maskHash=null}}Ns.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"stencilMask"};var xr=(t=>(t[t.ELEMENT_ARRAY_BUFFER=34963]="ELEMENT_ARRAY_BUFFER",t[t.ARRAY_BUFFER=34962]="ARRAY_BUFFER",t[t.UNIFORM_BUFFER=35345]="UNIFORM_BUFFER",t))(xr||{});class Gd{constructor(e,r){this.buffer=e||null,this.updateID=-1,this.byteLength=-1,this.type=r}}class Hs{constructor(e){this._gpuBuffers=Object.create(null),this._boundBufferBases=Object.create(null),this._renderer=e}destroy(){const e=this;this.destroyAll(!0),this._renderer=null,this._gl=null,this._gpuBuffers=null,e._boundBufferBases=null}contextChange(){this.destroyAll(!0),this._gl=this._renderer.gl}getGlBuffer(e){return this._gpuBuffers[e.uid]||this.createGLBuffer(e)}bind(e){const{_gl:r}=this,i=this.getGlBuffer(e);r.bindBuffer(i.type,i.buffer)}bindBufferBase(e,r){const{_gl:i}=this;if(this._boundBufferBases[r]!==e){const n=this.getGlBuffer(e);this._boundBufferBases[r]=e,i.bindBufferBase(i.UNIFORM_BUFFER,r,n.buffer)}}bindBufferRange(e,r,i){const{_gl:n}=this;i=i||0;const s=this.getGlBuffer(e);n.bindBufferRange(n.UNIFORM_BUFFER,r||0,s.buffer,i*256,256)}updateBuffer(e){const{_gl:r}=this,i=this.getGlBuffer(e);if(e._updateID===i.updateID)return i;if(i.updateID=e._updateID,r.bindBuffer(i.type,i.buffer),i.byteLength>=e.data.byteLength)r.bufferSubData(i.type,0,e.data,0,e._updateSize/4);else{const n=e.descriptor.usage&N.STATIC?r.STATIC_DRAW:r.DYNAMIC_DRAW;i.byteLength=e.data.byteLength,r.bufferData(i.type,e.data,n)}return i}destroyAll(e){const r=this._gl;if(!e)for(const i in this._gpuBuffers)r.deleteBuffer(this._gpuBuffers[i].buffer);this._gpuBuffers={}}onBufferDestroy(e,r){const i=this._gpuBuffers[e.uid],n=this._gl;r||n.deleteBuffer(i.buffer),this._gpuBuffers[e.uid]=null}createGLBuffer(e){const{_gl:r}=this;let i=xr.ARRAY_BUFFER;e.descriptor.usage&N.INDEX?i=xr.ELEMENT_ARRAY_BUFFER:e.descriptor.usage&N.UNIFORM&&(i=xr.UNIFORM_BUFFER);const n=new Gd(r.createBuffer(),i);return this._gpuBuffers[e.uid]=n,e.on("destroy",this.onBufferDestroy,this),n}}Hs.extension={type:[b.WebGLSystem],name:"buffer"};class wi{constructor(e){this._renderer=e,this.webGLVersion=1,this.extensions=Object.create(null),this.supports={uint32Indices:!1},this.handleContextLost=this.handleContextLost.bind(this),this.handleContextRestored=this.handleContextRestored.bind(this)}get isLost(){return!this.gl||this.gl.isContextLost()}contextChange(e){this.gl=e,this._renderer.gl=e,e.isContextLost()&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").restoreContext()}init(e){var r;if(e!=null&&e.context)this.initFromContext(e.context);else{const i=this._renderer.background.alpha<1,n=(r=e.premultipliedAlpha)!=null?r:!0,s=e.antialias&&!this._renderer.backBuffer.useBackBuffer;this.initFromOptions({alpha:i,premultipliedAlpha:n,antialias:s,stencil:!0,preserveDrawingBuffer:e.preserveDrawingBuffer,powerPreference:e.powerPreference})}}initFromContext(e){this.gl=e,this.validateContext(e),this._renderer.runners.contextChange.emit(e);const r=this._renderer.view.canvas;r.addEventListener("webglcontextlost",this.handleContextLost,!1),r.addEventListener("webglcontextrestored",this.handleContextRestored,!1)}initFromOptions(e){const r=this.createContext(this._renderer.view.canvas,e);this.initFromContext(r)}createContext(e,r){const i=e.getContext("webgl2",r);return this.webGLVersion=2,this.gl=i,this.getExtensions(),this.gl}getExtensions(){const{gl:e}=this,r={anisotropicFiltering:e.getExtension("EXT_texture_filter_anisotropic"),floatTextureLinear:e.getExtension("OES_texture_float_linear"),s3tc:e.getExtension("WEBGL_compressed_texture_s3tc"),s3tc_sRGB:e.getExtension("WEBGL_compressed_texture_s3tc_srgb"),etc:e.getExtension("WEBGL_compressed_texture_etc"),etc1:e.getExtension("WEBGL_compressed_texture_etc1"),pvrtc:e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),atc:e.getExtension("WEBGL_compressed_texture_atc"),astc:e.getExtension("WEBGL_compressed_texture_astc")};Object.assign(this.extensions,r,{colorBufferFloat:e.getExtension("EXT_color_buffer_float")})}handleContextLost(e){e.preventDefault()}handleContextRestored(){this._renderer.runners.contextChange.emit(this.gl)}destroy(){const e=this._renderer.view.canvas;this._renderer=null,e.removeEventListener("webglcontextlost",this.handleContextLost),e.removeEventListener("webglcontextrestored",this.handleContextRestored),this.gl.useProgram(null),this.extensions.loseContext&&this.extensions.loseContext.loseContext()}validateContext(e){const r=e.getContextAttributes(),i="WebGL2RenderingContext"in globalThis&&e instanceof globalThis.WebGL2RenderingContext;i&&(this.webGLVersion=2),r&&r.stencil;const n=i||!!e.getExtension("OES_element_index_uint");this.supports.uint32Indices=n}}wi.extension={type:[b.WebGLSystem],name:"context"},wi.defaultOptions={context:null,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"default"};var Ti=(t=>(t[t.RGBA=6408]="RGBA",t[t.RGB=6407]="RGB",t[t.RG=33319]="RG",t[t.RED=6403]="RED",t[t.RGBA_INTEGER=36249]="RGBA_INTEGER",t[t.RGB_INTEGER=36248]="RGB_INTEGER",t[t.RG_INTEGER=33320]="RG_INTEGER",t[t.RED_INTEGER=36244]="RED_INTEGER",t[t.ALPHA=6406]="ALPHA",t[t.LUMINANCE=6409]="LUMINANCE",t[t.LUMINANCE_ALPHA=6410]="LUMINANCE_ALPHA",t[t.DEPTH_COMPONENT=6402]="DEPTH_COMPONENT",t[t.DEPTH_STENCIL=34041]="DEPTH_STENCIL",t))(Ti||{}),js=(t=>(t[t.TEXTURE_2D=3553]="TEXTURE_2D",t[t.TEXTURE_CUBE_MAP=34067]="TEXTURE_CUBE_MAP",t[t.TEXTURE_2D_ARRAY=35866]="TEXTURE_2D_ARRAY",t[t.TEXTURE_CUBE_MAP_POSITIVE_X=34069]="TEXTURE_CUBE_MAP_POSITIVE_X",t[t.TEXTURE_CUBE_MAP_NEGATIVE_X=34070]="TEXTURE_CUBE_MAP_NEGATIVE_X",t[t.TEXTURE_CUBE_MAP_POSITIVE_Y=34071]="TEXTURE_CUBE_MAP_POSITIVE_Y",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Y=34072]="TEXTURE_CUBE_MAP_NEGATIVE_Y",t[t.TEXTURE_CUBE_MAP_POSITIVE_Z=34073]="TEXTURE_CUBE_MAP_POSITIVE_Z",t[t.TEXTURE_CUBE_MAP_NEGATIVE_Z=34074]="TEXTURE_CUBE_MAP_NEGATIVE_Z",t))(js||{}),$d=(t=>(t[t.CLAMP=33071]="CLAMP",t[t.REPEAT=10497]="REPEAT",t[t.MIRRORED_REPEAT=33648]="MIRRORED_REPEAT",t))($d||{}),D=(t=>(t[t.UNSIGNED_BYTE=5121]="UNSIGNED_BYTE",t[t.UNSIGNED_SHORT=5123]="UNSIGNED_SHORT",t[t.UNSIGNED_SHORT_5_6_5=33635]="UNSIGNED_SHORT_5_6_5",t[t.UNSIGNED_SHORT_4_4_4_4=32819]="UNSIGNED_SHORT_4_4_4_4",t[t.UNSIGNED_SHORT_5_5_5_1=32820]="UNSIGNED_SHORT_5_5_5_1",t[t.UNSIGNED_INT=5125]="UNSIGNED_INT",t[t.UNSIGNED_INT_10F_11F_11F_REV=35899]="UNSIGNED_INT_10F_11F_11F_REV",t[t.UNSIGNED_INT_2_10_10_10_REV=33640]="UNSIGNED_INT_2_10_10_10_REV",t[t.UNSIGNED_INT_24_8=34042]="UNSIGNED_INT_24_8",t[t.UNSIGNED_INT_5_9_9_9_REV=35902]="UNSIGNED_INT_5_9_9_9_REV",t[t.BYTE=5120]="BYTE",t[t.SHORT=5122]="SHORT",t[t.INT=5124]="INT",t[t.FLOAT=5126]="FLOAT",t[t.FLOAT_32_UNSIGNED_INT_24_8_REV=36269]="FLOAT_32_UNSIGNED_INT_24_8_REV",t[t.HALF_FLOAT=36193]="HALF_FLOAT",t))(D||{});const Ld={uint8x2:{type:D.UNSIGNED_BYTE,size:2,normalised:!1},uint8x4:{type:D.UNSIGNED_BYTE,size:4,normalised:!1},sint8x2:{type:D.BYTE,size:2,normalised:!1},sint8x4:{type:D.BYTE,size:4,normalised:!1},unorm8x2:{type:D.UNSIGNED_BYTE,size:2,normalised:!0},unorm8x4:{type:D.UNSIGNED_BYTE,size:4,normalised:!0},snorm8x2:{type:D.BYTE,size:2,normalised:!0},snorm8x4:{type:D.BYTE,size:4,normalised:!0},uint16x2:{type:D.UNSIGNED_SHORT,size:2,normalised:!1},uint16x4:{type:D.UNSIGNED_SHORT,size:4,normalised:!1},sint16x2:{type:D.SHORT,size:2,normalised:!1},sint16x4:{type:D.SHORT,size:4,normalised:!1},unorm16x2:{type:D.UNSIGNED_SHORT,size:2,normalised:!0},unorm16x4:{type:D.UNSIGNED_SHORT,size:4,normalised:!0},snorm16x2:{type:D.SHORT,size:2,normalised:!0},snorm16x4:{type:D.SHORT,size:4,normalised:!0},float16x2:{type:D.HALF_FLOAT,size:2,normalised:!1},float16x4:{type:D.HALF_FLOAT,size:4,normalised:!1},float32:{type:D.FLOAT,size:1,normalised:!1},float32x2:{type:D.FLOAT,size:2,normalised:!1},float32x3:{type:D.FLOAT,size:3,normalised:!1},float32x4:{type:D.FLOAT,size:4,normalised:!1},uint32:{type:D.UNSIGNED_INT,size:1,normalised:!1},uint32x2:{type:D.UNSIGNED_INT,size:2,normalised:!1},uint32x3:{type:D.UNSIGNED_INT,size:3,normalised:!1},uint32x4:{type:D.UNSIGNED_INT,size:4,normalised:!1},sint32:{type:D.INT,size:1,normalised:!1},sint32x2:{type:D.INT,size:2,normalised:!1},sint32x3:{type:D.INT,size:3,normalised:!1},sint32x4:{type:D.INT,size:4,normalised:!1}};function Dd(t){var e;return(e=Ld[t])!=null?e:Ld.float32}const Ws={5126:4,5123:2,5121:1},rx={"point-list":0,"line-list":1,"line-strip":3,"triangle-list":4,"triangle-strip":5};class Vs{constructor(e){this._geometryVaoHash={},this._renderer=e,this._activeGeometry=null,this._activeVao=null,this.hasVao=!0,this.hasInstance=!0,this.canUseUInt32ElementIndex=!0}contextChange(){this.gl=this._renderer.gl}bind(e,r){const i=this.gl;this._activeGeometry=e;const n=this.getVao(e,r);this._activeVao!==n&&(this._activeVao=n,i.bindVertexArray(n)),this.updateBuffers()}reset(){this.unbind()}updateBuffers(){const e=this._activeGeometry,r=this._renderer.buffer;for(let i=0;i<e.buffers.length;i++){const n=e.buffers[i];r.updateBuffer(n)}}checkCompatibility(e,r){const i=e.attributes,n=r.attributeData;for(const s in n)if(!i[s])throw new Error(`shader and geometry incompatible, geometry missing the "${s}" attribute`)}getSignature(e,r){const i=e.attributes,n=r.attributeData,s=["g",e.uid];for(const o in i)n[o]&&s.push(o,n[o].location);return s.join("-")}getVao(e,r){var i;return((i=this._geometryVaoHash[e.uid])==null?void 0:i[r.key])||this.initGeometryVao(e,r)}initGeometryVao(e,r,i=!0){const n=this._renderer.gl,s=this._renderer.buffer;this._renderer.shader.getProgramData(r),this.checkCompatibility(e,r);const o=this.getSignature(e,r);this._geometryVaoHash[e.uid]||(this._geometryVaoHash[e.uid]=Object.create(null),e.on("destroy",this.onGeometryDestroy,this));const a=this._geometryVaoHash[e.uid];let l=a[o];if(l)return a[r.key]=l,l;const u=e.buffers,h=e.attributes,c={},p={};for(const d in u)c[d]=0,p[d]=0;for(const d in h)!h[d].size&&r.attributeData[d]?h[d].size=r.attributeData[d].size:h[d].size,c[h[d].buffer.uid]+=h[d].size*Ws[h[d].type];for(const d in h){const f=h[d],m=f.size;f.stride===void 0&&(c[f.buffer.uid]===m*Ws[f.type]?f.stride=0:f.stride=c[f.buffer.uid]),f.start===void 0&&(f.start=p[f.buffer.uid],p[f.buffer.uid]+=m*Ws[f.type])}l=n.createVertexArray(),n.bindVertexArray(l);for(let d=0;d<u.length;d++){const f=u[d];s.bind(f)}return this.activateVao(e,r),a[r.key]=l,a[o]=l,n.bindVertexArray(null),l}onGeometryDestroy(e,r){const i=this._geometryVaoHash[e.uid],n=this.gl;if(i){if(r)for(const s in i)this._activeVao!==i[s]&&this.unbind(),n.deleteVertexArray(i[s]);this._geometryVaoHash[e.uid]=null}}destroyAll(e=!1){const r=this.gl;for(const i in this._geometryVaoHash){if(e)for(const n in this._geometryVaoHash[i]){const s=this._geometryVaoHash[i];this._activeVao!==s&&this.unbind(),r.deleteVertexArray(s[n])}this._geometryVaoHash[i]=null}}activateVao(e,r){const i=this._renderer.gl,n=this._renderer.buffer,s=e.attributes;e.indexBuffer&&n.bind(e.indexBuffer);let o=null;for(const a in s){const l=s[a],u=l.buffer,h=n.getGlBuffer(u);if(r.attributeData[a]){o!==h&&(n.bind(u),o=h);const c=r.attributeData[a].location;i.enableVertexAttribArray(c);const p=Dd(l.format);if(i.vertexAttribPointer(c,p.size,p.type,p.normalised,l.stride,l.offset),l.instance)if(this.hasInstance)i.vertexAttribDivisor(c,1);else throw new Error("geometry error, GPU Instancing is not supported on this device")}}}draw(e,r,i,n){const{gl:s}=this._renderer,o=this._activeGeometry,a=rx[o.topology||e];if(o.indexBuffer){const l=o.indexBuffer.data.BYTES_PER_ELEMENT,u=l===2?s.UNSIGNED_SHORT:s.UNSIGNED_INT;o.instanced?s.drawElementsInstanced(a,r||o.indexBuffer.data.length,u,(i||0)*l,o.instanceCount||1):s.drawElements(a,r||o.indexBuffer.data.length,u,(i||0)*l)}else o.instanced?s.drawArraysInstanced(a,i,r||o.getSize(),n||1):s.drawArrays(a,i,r||o.getSize());return this}unbind(){this.gl.bindVertexArray(null),this._activeVao=null,this._activeGeometry=null}destroy(){this._renderer=null,this.gl=null,this._activeVao=null,this._activeGeometry=null}}Vs.extension={type:[b.WebGLSystem],name:"geometry"};var ix=Object.defineProperty,zd=Object.getOwnPropertySymbols,nx=Object.prototype.hasOwnProperty,sx=Object.prototype.propertyIsEnumerable,Nd=(t,e,r)=>e in t?ix(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Hd=(t,e)=>{for(var r in e||(e={}))nx.call(e,r)&&Nd(t,r,e[r]);if(zd)for(var r of zd(e))sx.call(e,r)&&Nd(t,r,e[r]);return t};const ox=new _e({vertex:`
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
        }`,name:"big-triangle"}),jd=new Ee({glProgram:ox,resources:{uTexture:A.WHITE.source}}),Wd=class{constructor(t){this.useBackBuffer=!1,this._useBackBufferThisRender=!1,this._renderer=t}init(t={}){const{useBackBuffer:e,antialias:r}=Hd(Hd({},Wd.defaultOptions),t);this.useBackBuffer=e,this._antialias=r}renderStart({target:t,clear:e,clearColor:r}){if(this._useBackBufferThisRender=this.useBackBuffer&&!!t,this.useBackBuffer){const i=this._renderer.renderTarget.getRenderTarget(t);this._targetTexture=i.colorTexture,t=this._getBackBufferTexture(i.colorTexture)}r!=null||(r=this._renderer.background.colorRgba),this._renderer.renderTarget.start(t,e,r)}renderEnd(){this._presentBackBuffer()}_presentBackBuffer(){const t=this._renderer;if(t.renderTarget.finishRenderPass(),!this._useBackBufferThisRender)return;const e=t.gl;t.renderTarget.bind(this._targetTexture,!1),jd.resources.uTexture=this._backBufferTexture.source,t.shader.bind(jd,!1),t.state.set(Se.for2d()),e.drawArrays(e.TRIANGLES,0,3)}_getBackBufferTexture(t){const e=t.source;return this._backBufferTexture=this._backBufferTexture||new A({source:new he({width:e.width,height:e.height,resolution:e._resolution,antialias:this._antialias})}),this._backBufferTexture.source.resize(e.width,e.height,e._resolution),this._backBufferTexture}destroy(){this._backBufferTexture&&(this._backBufferTexture.destroy(),this._backBufferTexture=null)}};let Si=Wd;Si.extension={type:[b.WebGLSystem],name:"backBuffer"},Si.defaultOptions={useBackBuffer:!1};class Ys{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.gl.colorMask(!!(e&8),!!(e&4),!!(e&2),!!(e&1)))}}Ys.extension={type:[b.WebGLSystem],name:"colorMask"};class Xs{constructor(e){this.commandFinished=Promise.resolve(),this._renderer=e}setGeometry(e,r){this._renderer.geometry.bind(e,r.glProgram)}finishRenderPass(){}draw(e){const r=this._renderer,{geometry:i,shader:n,state:s,skipSync:o,topology:a,size:l,start:u,instanceCount:h}=e;r.shader.bind(n,o),r.geometry.bind(i,r.shader.activeProgram),s&&r.state.set(s),r.geometry.draw(a,l,u,h)}destroy(){const e=this;e._renderer=null}}Xs.extension={type:[b.WebGLSystem],name:"encoder"};class Vd{constructor(){this.width=-1,this.height=-1,this.msaaRenderBuffer=[],this.msaa=!1,this.dirtyId=-1}}function qs(t){const e=t.colorTexture.source.resource;return e instanceof HTMLCanvasElement&&document.body.contains(e)}function Yd(t,e,r,i,n,s){const o=s?1:-1;return t.identity(),t.a=1/i*2,t.d=o*(1/n*2),t.tx=-1-e*t.a,t.ty=-o-r*t.d,t}var ax=Object.defineProperty,Xd=Object.getOwnPropertySymbols,lx=Object.prototype.hasOwnProperty,ux=Object.prototype.propertyIsEnumerable,qd=(t,e,r)=>e in t?ax(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Kd=(t,e)=>{for(var r in e||(e={}))lx.call(e,r)&&qd(t,r,e[r]);if(Xd)for(var r of Xd(e))ux.call(e,r)&&qd(t,r,e[r]);return t};const Zd=class{constructor(t={}){if(this.uid=q("renderTarget"),this.width=0,this.height=0,this.resolution=1,this.colorTextures=[],this.dirtyId=0,this.isRoot=!1,this._projectionMatrix=new k,this._size=new Float32Array(2),t=Kd(Kd({},Zd.defaultDescriptor),t),this.width=t.width,this.height=t.height,this.resolution=t.resolution,this.stencil=t.stencil,this._viewport=new Q(0,0,this.width,this.height),typeof t.colorTextures=="number")for(let e=0;e<t.colorTextures;e++)this.colorTextures.push(new A({source:new he({width:this.width,height:this.height,resolution:t.resolution,antialias:t.antialias})}));else{this.colorTextures=[...t.colorTextures];const e=this.colorTexture.source;this._resize(e.width,e.height,e._resolution)}this.colorTexture.source.on("resize",this.onSourceResize,this),t.depthTexture&&(this.depthTexture=new A({source:new he({width:this.width,height:this.height,resolution:this.resolution,format:"stencil8"})}))}get size(){const t=this._size;return t[0]=this.pixelWidth,t[1]=this.pixelHeight,t}get pixelWidth(){return this.width*this.resolution}get pixelHeight(){return this.height*this.resolution}get colorTexture(){return this.colorTextures[0]}get projectionMatrix(){const t=this.colorTexture;return Yd(this._projectionMatrix,0,0,t.frameWidth,t.frameHeight,!this.isRoot),this._projectionMatrix}get viewport(){const t=this.colorTexture,e=t.source,r=e.pixelWidth,i=e.pixelHeight,n=this._viewport,s=t.layout.frame;return n.x=s.x*r|0,n.y=s.y*i|0,n.width=s.width*r|0,n.height=s.height*i|0,n}onSourceResize(t){this._resize(t.width,t.height,t._resolution,!0)}_resize(t,e,r=this.resolution,i=!1){this.width=t,this.height=e,this.resolution=r,this.dirtyId++,this.colorTextures.forEach((n,s)=>{i&&s===0||n.source.resize(t,e,r)}),this.depthTexture&&this.depthTexture.source.resize(t,e,r)}destroy(){throw new Error("Method not implemented.")}};let Ft=Zd;Ft.defaultDescriptor={width:0,height:0,resolution:1,colorTextures:1,stencil:!0,antialias:!1};var hx=Object.defineProperty,Qd=Object.getOwnPropertySymbols,cx=Object.prototype.hasOwnProperty,dx=Object.prototype.propertyIsEnumerable,Jd=(t,e,r)=>e in t?hx(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,px=(t,e)=>{for(var r in e||(e={}))cx.call(e,r)&&Jd(t,r,e[r]);if(Qd)for(var r of Qd(e))dx.call(e,r)&&Jd(t,r,e[r]);return t};const Ks=new Map;function Pi(t,e){if(!Ks.has(t)){const r=new A({source:new oi(px({resource:t},e))});Ks.set(t,r)}return Ks.get(t)}class Zs{constructor(e){this.onRenderTargetChange=new ai("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._clearColorCache=[0,0,0,0],this._viewPortCache={x:0,y:0,width:0,height:0},this.rootProjectionMatrix=new k,this._renderer=e}contextChange(e){this._gl=e}start(e,r=!0,i){this._renderTargetStack.length=0;const n=this.getRenderTarget(e);this.rootRenderTarget=n,this.renderingToScreen=qs(this.rootRenderTarget),this.rootProjectionMatrix=n.projectionMatrix,this.push(n,r,i)}bind(e,r=!0,i){const n=this.getRenderTarget(e);this.renderTarget=n;const s=this.getGpuRenderTarget(n);n.dirtyId!==s.dirtyId&&(s.dirtyId=n.dirtyId,this._resizeGpuRenderTarget(n));const o=this._gl;o.bindFramebuffer(o.FRAMEBUFFER,s.framebuffer),n.colorTextures.forEach(h=>{this._renderer.texture.unbind(h)});const a=n.viewport;let l=a.y;n.isRoot&&(l=this._renderer.view.canvas.height-a.height);const u=this._viewPortCache;return(u.x!==a.x||u.y!==l||u.width!==a.width||u.height!==a.height)&&(u.x=a.x,u.y=l,u.width=a.width,u.height=a.height,o.viewport(a.x,l,a.width,a.height)),this.clear(r,i),this.onRenderTargetChange.emit(n),n}clear(e,r){if(!e)return;typeof e=="boolean"&&(e=e?me.ALL:me.NONE);const i=this._gl;if(e&me.COLOR){r!=null||(r=this._defaultClearColor);const n=this._clearColorCache,s=r;(n[0]!==s[0]||n[1]!==s[1]||n[2]!==s[2]||n[3]!==s[3])&&(n[0]=s[0],n[1]=s[1],n[2]=s[2],n[3]=s[3],i.clearColor(s[0],s[1],s[2],s[3]))}i.clear(e)}push(e,r=!0,i){const n=this.bind(e,r,i);return this._renderTargetStack.push(n),n}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var r;return(r=this._renderSurfaceToRenderTargetHash.get(e))!=null?r:this._initRenderTarget(e)}_initRenderTarget(e){let r=null;return e instanceof HTMLCanvasElement&&(e=Pi(e)),e instanceof Ft?r=e:e instanceof A&&(r=new Ft({colorTextures:[e]}),e.source.resource instanceof HTMLCanvasElement&&(r.isRoot=!0),e.source.on("destroy",()=>{r.destroy()})),this._renderSurfaceToRenderTargetHash.set(e,r),r}finishRenderPass(e){e=e||this.renderTarget;const r=this.getGpuRenderTarget(e);if(!r.msaa)return;const i=this._renderer.gl;i.bindFramebuffer(i.FRAMEBUFFER,r.resolveTargetFramebuffer),i.bindFramebuffer(i.READ_FRAMEBUFFER,r.framebuffer),i.blitFramebuffer(0,0,r.width,r.height,0,0,r.width,r.height,i.COLOR_BUFFER_BIT,i.NEAREST),i.bindFramebuffer(i.FRAMEBUFFER,r.framebuffer)}copyToTexture(e,r,i,n){const s=this._renderer,o=this.getGpuRenderTarget(e),a=s.gl;return this.finishRenderPass(e),a.bindFramebuffer(a.FRAMEBUFFER,o.resolveTargetFramebuffer),s.texture.bind(r,0),a.copyTexSubImage2D(a.TEXTURE_2D,0,0,0,i.x,i.y,n.width,n.height),r}getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){const r=this._renderer.gl,i=new Vd;return e.colorTexture.source.resource instanceof HTMLCanvasElement?(this._gpuRenderTargetHash[e.uid]=i,i.framebuffer=null,i):(this._initColor(e,i),e.stencil&&this._initStencil(i),r.bindFramebuffer(r.FRAMEBUFFER,null),this._gpuRenderTargetHash[e.uid]=i,i)}_resizeGpuRenderTarget(e){if(e.isRoot)return;const r=this.getGpuRenderTarget(e);this._resizeColor(e,r),e.stencil&&this._resizeStencil(r)}_initColor(e,r){const i=this._renderer,n=i.gl,s=n.createFramebuffer();if(r.resolveTargetFramebuffer=s,n.bindFramebuffer(n.FRAMEBUFFER,s),r.width=e.colorTexture.source.pixelWidth,r.height=e.colorTexture.source.pixelHeight,e.colorTextures.forEach((o,a)=>{const l=o.source;l.antialias&&(r.msaa=!0),i.texture.bindSource(l,0);const u=i.texture.getGlSource(l).texture;n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+a,3553,u,0)}),r.msaa){const o=n.createFramebuffer();r.framebuffer=o,n.bindFramebuffer(n.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=n.createRenderbuffer();r.msaaRenderBuffer[l]=u})}else r.framebuffer=s}_resizeColor(e,r){const i=e.colorTexture.source;if(r.width=i.pixelWidth,r.height=i.pixelHeight,e.colorTextures.forEach((n,s)=>{s!==0&&n.source.resize(i.width,i.height,i._resolution)}),r.msaa){const n=this._renderer,s=n.gl,o=r.framebuffer;s.bindFramebuffer(s.FRAMEBUFFER,o),e.colorTextures.forEach((a,l)=>{const u=a.source;n.texture.bindSource(u,0);const h=n.texture.getGlSource(u).internalFormat,c=r.msaaRenderBuffer[l];s.bindRenderbuffer(s.RENDERBUFFER,c),s.renderbufferStorageMultisample(s.RENDERBUFFER,4,h,u.pixelWidth,u.pixelHeight),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+l,s.RENDERBUFFER,c)})}}_initStencil(e){const r=this._renderer.gl,i=r.createRenderbuffer();e.depthStencilRenderBuffer=i,r.bindRenderbuffer(r.RENDERBUFFER,i),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,i)}_resizeStencil(e){const r=this._renderer.gl;r.bindRenderbuffer(r.RENDERBUFFER,e.depthStencilRenderBuffer),e.msaa?r.renderbufferStorageMultisample(r.RENDERBUFFER,4,r.DEPTH24_STENCIL8,e.width,e.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH24_STENCIL8,e.width,e.height)}}Zs.extension={type:[b.WebGLSystem],name:"renderTarget"};const ke=[];ke[ne.NONE]=void 0,ke[ne.DISABLED]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilReadMask:0,stencilBack:{compare:"always",passOp:"keep"}},ke[ne.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},ke[ne.RENDERING_MASK_ADD]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"increment-clamp"}},ke[ne.RENDERING_MASK_REMOVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilBack:{compare:"always",passOp:"decrement-clamp"}},ke[ne.MASK_ACTIVE]={format:"stencil8",depthCompare:"always",depthWriteEnabled:!1,stencilWriteMask:0,stencilBack:{compare:"equal",passOp:"keep"}};class Qs{constructor(e){this._stencilCache={enabled:!1,stencilReference:0,stencilMode:ne.NONE},this._renderTargetStencilState=Object.create(null),e.renderTarget.onRenderTargetChange.add(this)}contextChange(e){this._gl=e,this._comparisonFuncMapping={always:e.ALWAYS,never:e.NEVER,equal:e.EQUAL,"not-equal":e.NOTEQUAL,less:e.LESS,"less-equal":e.LEQUAL,greater:e.GREATER,"greater-equal":e.GEQUAL},this._stencilOpsMapping={keep:e.KEEP,zero:e.ZERO,replace:e.REPLACE,invert:e.INVERT,"increment-clamp":e.INCR,"decrement-clamp":e.DECR,"increment-wrap":e.INCR_WRAP,"decrement-wrap":e.DECR_WRAP}}onRenderTargetChange(e){if(this._activeRenderTarget===e)return;this._activeRenderTarget=e;let r=this._renderTargetStencilState[e.uid];r||(r=this._renderTargetStencilState[e.uid]={stencilMode:ne.DISABLED,stencilReference:0}),this.setStencilMode(r.stencilMode,r.stencilReference)}setStencilMode(e,r){const i=this._renderTargetStencilState[this._activeRenderTarget.uid],n=this._gl,s=ke[e],o=this._stencilCache;if(i.stencilMode=e,i.stencilReference=r,e===ne.DISABLED){this._stencilCache.enabled&&(this._stencilCache.enabled=!1,n.disable(n.STENCIL_TEST));return}this._stencilCache.enabled||(this._stencilCache.enabled=!0,n.enable(n.STENCIL_TEST)),(e!==o.stencilMode||o.stencilReference!==r)&&(o.stencilMode=e,o.stencilReference=r,n.stencilFunc(this._comparisonFuncMapping[s.stencilBack.compare],r,255),n.stencilOp(n.KEEP,n.KEEP,this._stencilOpsMapping[s.stencilBack.passOp]))}}Qs.extension={type:[b.WebGLSystem],name:"stencil"};class fx{}class ep{constructor(e,r){this.program=e,this.uniformData=r,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}class Ai extends ue{constructor({buffer:e,offset:r,size:i}){super(),this.uid=q("buffer"),this.touched=0,this.resourceType="bufferResource",this.resourceId=q("buffer"),this.bufferResource=!0,this.buffer=e,this.offset=r,this.size=i,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this.resourceId=q("buffer"),this.emit("change",this)}destroy(e=!1){e&&this.buffer.destroy(),this.buffer=null}}function Js(t,e,r){const i=t.createShader(e);return t.shaderSource(i,r),t.compileShader(i),i}function eo(t){const e=new Array(t);for(let r=0;r<e.length;r++)e[r]=!1;return e}function to(t,e){switch(t){case"float":return 0;case"vec2":return new Float32Array(2*e);case"vec3":return new Float32Array(3*e);case"vec4":return new Float32Array(4*e);case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"ivec2":return new Int32Array(2*e);case"ivec3":return new Int32Array(3*e);case"ivec4":return new Int32Array(4*e);case"uvec2":return new Uint32Array(2*e);case"uvec3":return new Uint32Array(3*e);case"uvec4":return new Uint32Array(4*e);case"bool":return!1;case"bvec2":return eo(2*e);case"bvec3":return eo(3*e);case"bvec4":return eo(4*e);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}const gx={float:1,vec2:2,vec3:3,vec4:4,int:1,ivec2:2,ivec3:3,ivec4:4,uint:1,uvec2:2,uvec3:3,uvec4:4,bool:1,bvec2:2,bvec3:3,bvec4:4,mat2:4,mat3:9,mat4:16,sampler2D:1};function tp(t){return gx[t]}let Ei=null;const rp={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"};function ro(t,e){if(!Ei){const r=Object.keys(rp);Ei={};for(let i=0;i<r.length;++i){const n=r[i];Ei[t[n]]=rp[n]}}return Ei[e]}function ip(t,e){const r={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=e.getActiveAttrib(t,n);if(s.name.startsWith("gl_"))continue;const o=ro(e,s.type),a={type:o,name:s.name,size:tp(o),location:e.getAttribLocation(t,s.name)};r[s.name]=a}return r}function np(t,e){const r={},i=e.getProgramParameter(t,e.ACTIVE_UNIFORM_BLOCKS);for(let n=0;n<i;n++){const s=e.getActiveUniformBlockName(t,n),o=e.getUniformBlockIndex(t,s),a=e.getActiveUniformBlockParameter(t,n,e.UNIFORM_BLOCK_DATA_SIZE);r[s]={name:s,index:o,size:a}}return r}function sp(t,e){const r={},i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;n++){const s=e.getActiveUniform(t,n),o=s.name.replace(/\[.*?\]$/,""),a=!!s.name.match(/\[.*?\]$/),l=ro(e,s.type);r[o]={name:o,index:n,type:l,size:s.size,isArray:a,value:to(l,s.size)}}return r}function op(t,e){const r=t.getShaderSource(e).split(`
`).map((u,h)=>`${h}: ${u}`),i=t.getShaderInfoLog(e),n=i.split(`
`),s={},o=n.map(u=>parseFloat(u.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(u=>u&&!s[u]?(s[u]=!0,!0):!1),a=[""];o.forEach(u=>{r[u-1]=`%c${r[u-1]}%c`,a.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});const l=r.join(`
`);a[0]=l,console.error(i),console.groupCollapsed("click to view full shader code"),console.warn(...a),console.groupEnd()}function ap(t,e,r,i){t.getProgramParameter(e,t.LINK_STATUS)||(t.getShaderParameter(r,t.COMPILE_STATUS)||op(t,r),t.getShaderParameter(i,t.COMPILE_STATUS)||op(t,i),console.error("PixiJS Error: Could not initialize shader."),t.getProgramInfoLog(e)!==""&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",t.getProgramInfoLog(e)))}function lp(t,e){const r=Js(t,t.VERTEX_SHADER,e.vertex),i=Js(t,t.FRAGMENT_SHADER,e.fragment),n=t.createProgram();t.attachShader(n,r),t.attachShader(n,i);const s=e.transformFeedbackVaryings;s&&(typeof t.transformFeedbackVaryings!="function"||t.transformFeedbackVaryings(n,s.names,s.bufferMode==="separate"?t.SEPARATE_ATTRIBS:t.INTERLEAVED_ATTRIBS)),t.linkProgram(n),t.getProgramParameter(n,t.LINK_STATUS)||ap(t,n,r,i),e.attributeData=ip(n,t),e.uniformData=sp(n,t),e.uniformBlockData=np(n,t),t.deleteShader(r),t.deleteShader(i);const o={};for(const a in e.uniformData){const l=e.uniformData[a];o[a]={location:t.getUniformLocation(n,a),value:to(l.type,l.size)}}return new ep(n,o)}const De={textureCount:0,blockIndex:0};class io{constructor(e){this.activeProgram=null,this._programDataHash=Object.create(null),this._nextIndex=0,this._boundUniformsIdsToIndexHash=Object.create(null),this._boundIndexToUniformsHash=Object.create(null),this._renderer=e}contextChange(e){this._gl=e,this._maxBindings=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS)}bind(e,r){if(this._setProgram(e.glProgram),r)return;De.textureCount=0,De.blockIndex=0;const i=this._gl,n=this.getProgramData(e.glProgram);for(const s in e.groups){const o=e.groups[s];for(const a in o.resources){const l=o.resources[a];if(l instanceof re)l.ubo?this.bindUniformBlock(l,e.uniformBindMap[s][a],De.blockIndex++):this._updateUniformGroup(l);else if(l instanceof Ai)this.bindUniformBlock(l,e.uniformBindMap[s][a],De.blockIndex++);else if(l instanceof he){this._renderer.texture.bind(l,De.textureCount);const u=e.uniformBindMap[s][a],h=n.uniformData[u];h&&(h.value!==De.textureCount&&i.uniform1i(h.location,De.textureCount),De.textureCount++)}else l instanceof tr}}}_updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this.activeProgram,De)}bindUniformBlock(e,r,i=0){const n=this._renderer.buffer,s=this.getProgramData(this.activeProgram),o=e.bufferResource;o&&this._renderer.uniformBuffer.updateUniformGroup(e),n.updateBuffer(e.buffer);let a=this._boundUniformsIdsToIndexHash[e.uid];if(a===void 0){const h=this._nextIndex++%this._maxBindings,c=this._boundIndexToUniformsHash[h];c&&(this._boundUniformsIdsToIndexHash[c.uid]=void 0),a=this._boundUniformsIdsToIndexHash[e.uid]=h,this._boundIndexToUniformsHash[h]=e,o?n.bindBufferRange(e.buffer,h,e.offset):n.bindBufferBase(e.buffer,h)}const l=this._gl,u=this.activeProgram.uniformBlockData[r].index;s.uniformBlockBindings[i]!==a&&(s.uniformBlockBindings[i]=a,l.uniformBlockBinding(s.program,u,a))}_setProgram(e){if(this.activeProgram===e)return;this.activeProgram=e;const r=this.getProgramData(e);this._gl.useProgram(r.program)}getProgramData(e){return this._programDataHash[e.key]||this._createProgramData(e)}_createProgramData(e){const r=e.key;return this._programDataHash[r]=lp(this._gl,e),this._programDataHash[r]}destroy(){for(const e of Object.keys(this._programDataHash))this._programDataHash[e].destroy(),this._programDataHash[e]=null;this._programDataHash=null,this._boundUniformsIdsToIndexHash=null}}io.extension={type:[b.WebGLSystem],name:"shader"};let _r;function mx(){if(typeof _r=="boolean")return _r;try{_r=new Function("param1","param2","param3","return param1[param2] === param3;")({a:"b"},"a","b")===!0}catch(t){_r=!1}return _r}const Ci=[{test:t=>t.type==="float"&&t.size===1&&!t.isArray,code:t=>`
            if(uv["${t}"] !== ud["${t}"].value)
            {
                ud["${t}"].value = uv["${t}"]
                gl.uniform1f(ud["${t}"].location, uv["${t}"])
            }
            `},{test:(t,e)=>(t.type==="sampler2D"||t.type==="samplerCube"||t.type==="sampler2DArray")&&t.size===1&&!t.isArray&&(e==null||e instanceof A),code:t=>`t = syncData.textureCount++;

            renderer.texture.bind(uv["${t}"], t);

            if(ud["${t}"].value !== t)
            {
                ud["${t}"].value = t;
                gl.uniform1i(ud["${t}"].location, t);
; // eslint-disable-line max-len
            }`},{test:(t,e)=>t.type==="mat3"&&t.size===1&&!t.isArray&&e.a!==void 0,code:t=>`
            gl.uniformMatrix3fv(ud["${t}"].location, false, uv["${t}"].toArray(true));
            `},{test:(t,e)=>t.type==="vec2"&&t.size===1&&!t.isArray&&e.x!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${t}"].location, v.x, v.y);
                }`},{test:t=>t.type==="vec2"&&t.size===1&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${t}"].location, v[0], v[1]);
                }
            `},{test:(t,e)=>t.type==="vec4"&&t.size===1&&!t.isArray&&e.width!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${t}"].location, v.x, v.y, v.width, v.height)
                }`},{test:(t,e)=>t.type==="vec4"&&t.size===1&&!t.isArray&&e.red!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${t}"].location, v.red, v.green, v.blue, v.alpha)
                }`},{test:(t,e)=>t.type==="vec3"&&t.size===1&&!t.isArray&&e.red!==void 0,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${t}"].location, v.red, v.green, v.blue)
                }`},{test:t=>t.type==="vec4"&&t.size===1&&!t.isArray,code:t=>`
                cv = ud["${t}"].value;
                v = uv["${t}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${t}"].location, v[0], v[1], v[2], v[3])
                }`}],bx={float:`
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
    }`},vx={float:"gl.uniform1fv(location, v)",vec2:"gl.uniform2fv(location, v)",vec3:"gl.uniform3fv(location, v)",vec4:"gl.uniform4fv(location, v)",mat4:"gl.uniformMatrix4fv(location, false, v)",mat3:"gl.uniformMatrix3fv(location, false, v)",mat2:"gl.uniformMatrix2fv(location, false, v)",int:"gl.uniform1iv(location, v)",ivec2:"gl.uniform2iv(location, v)",ivec3:"gl.uniform3iv(location, v)",ivec4:"gl.uniform4iv(location, v)",uint:"gl.uniform1uiv(location, v)",uvec2:"gl.uniform2uiv(location, v)",uvec3:"gl.uniform3uiv(location, v)",uvec4:"gl.uniform4uiv(location, v)",bool:"gl.uniform1iv(location, v)",bvec2:"gl.uniform2iv(location, v)",bvec3:"gl.uniform3iv(location, v)",bvec4:"gl.uniform4iv(location, v)",sampler2D:"gl.uniform1iv(location, v)",samplerCube:"gl.uniform1iv(location, v)",sampler2DArray:"gl.uniform1iv(location, v)"};function up(t,e){const r=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `];for(const i in t.uniforms){const n=e[i];if(!n){t.uniforms[i]instanceof re?t.uniforms[i].ubo?r.push(`
                        renderer.shader.bindUniformBlock(uv.${i}, "${i}");
                    `):r.push(`
                        renderer.shader.updateUniformGroup(uv.${i});
                    `):t.uniforms[i]instanceof Ai&&r.push(`
                        renderer.shader.bindBufferResource(uv.${i}, "${i}");
                    `);continue}const s=t.uniforms[i];let o=!1;for(let a=0;a<Ci.length;a++)if(Ci[a].test(n,s)){r.push(Ci[a].code(i,s)),o=!0;break}if(!o){const a=(n.size===1&&!n.isArray?bx:vx)[n.type].replace("location",`ud["${i}"].location`);r.push(`
            cu = ud["${i}"];
            cv = cu.value;
            v = uv["${i}"];
            ${a};`)}}return new Function("ud","uv","renderer","syncData",r.join(`
`))}class no{constructor(e){this.destroyed=!1,this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this._systemCheck(),this.gl=null,this._cache={}}_systemCheck(){if(!mx())throw new Error("Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.")}contextChange(e){this.gl=e}updateUniformGroup(e,r,i){const n=this._renderer.shader.getProgramData(r);(!e.isStatic||e.dirtyId!==n.uniformDirtyGroups[e.uid])&&(n.uniformDirtyGroups[e.uid]=e.dirtyId,this._getUniformSyncFunction(e,r)(n.uniformData,e.uniforms,this._renderer,i))}_getUniformSyncFunction(e,r){var i;return((i=this._uniformGroupSyncHash[e.signature])==null?void 0:i[r.key])||this._createUniformSyncFunction(e,r)}_createUniformSyncFunction(e,r){const i=this._uniformGroupSyncHash[e.signature]||(this._uniformGroupSyncHash[e.signature]={}),n=this._getSignature(e,r.uniformData,"u");return this._cache[n]||(this._cache[n]=up(e,r.uniformData)),i[r.key]=this._cache[n],i[r.key]}_getSignature(e,r,i){const n=e.uniforms,s=[`${i}-`];for(const o in n)s.push(o),r[o]&&s.push(r[o].type);return s.join("-")}destroy(){this._renderer=null,this.destroyed=!0,this._cache=null}}no.extension={type:[b.WebGLSystem],name:"uniformGroup"};function yx(t){return t=t.replaceAll("texture2D","texture").replaceAll("gl_FragColor","fragColor").replaceAll("varying","in"),t=`
        out vec4 fragColor;
    ${t}
    `,t}function hp(t){const e={};return e.normal=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e.add=[t.ONE,t.ONE],e.multiply=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.screen=[t.ONE,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.none=[0,0],e["normal-npm"]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA],e["add-npm"]=[t.SRC_ALPHA,t.ONE,t.ONE,t.ONE],e["screen-npm"]=[t.SRC_ALPHA,t.ONE_MINUS_SRC_COLOR,t.ONE,t.ONE_MINUS_SRC_ALPHA],e.erase=[t.ZERO,t.ONE_MINUS_SRC_ALPHA],e}const xx=0,_x=1,wx=2,Tx=3,Sx=4,Px=5,so=class{constructor(){this.gl=null,this.stateId=0,this.polygonOffset=0,this.blendMode="none",this._blendEq=!1,this.map=[],this.map[xx]=this.setBlend,this.map[_x]=this.setOffset,this.map[wx]=this.setCullFace,this.map[Tx]=this.setDepthTest,this.map[Sx]=this.setFrontFace,this.map[Px]=this.setDepthMask,this.checks=[],this.defaultState=new Se,this.defaultState.blend=!0}contextChange(t){this.gl=t,this.blendModesMap=hp(t),this.set(this.defaultState),this.reset()}set(t){if(t=t||this.defaultState,this.stateId!==t.data){let e=this.stateId^t.data,r=0;for(;e;)e&1&&this.map[r].call(this,!!(t.data&1<<r)),e=e>>1,r++;this.stateId=t.data}for(let e=0;e<this.checks.length;e++)this.checks[e](this,t)}forceState(t){t=t||this.defaultState;for(let e=0;e<this.map.length;e++)this.map[e].call(this,!!(t.data&1<<e));for(let e=0;e<this.checks.length;e++)this.checks[e](this,t);this.stateId=t.data}setBlend(t){this._updateCheck(so._checkBlendMode,t),this.gl[t?"enable":"disable"](this.gl.BLEND)}setOffset(t){this._updateCheck(so._checkPolygonOffset,t),this.gl[t?"enable":"disable"](this.gl.POLYGON_OFFSET_FILL)}setDepthTest(t){this.gl[t?"enable":"disable"](this.gl.DEPTH_TEST)}setDepthMask(t){this.gl.depthMask(t)}setCullFace(t){this.gl[t?"enable":"disable"](this.gl.CULL_FACE)}setFrontFace(t){this.gl.frontFace(this.gl[t?"CW":"CCW"])}setBlendMode(t){if(this.blendModesMap[t]||(t="normal"),t===this.blendMode)return;this.blendMode=t;const e=this.blendModesMap[t],r=this.gl;e.length===2?r.blendFunc(e[0],e[1]):r.blendFuncSeparate(e[0],e[1],e[2],e[3]),e.length===6?(this._blendEq=!0,r.blendEquationSeparate(e[4],e[5])):this._blendEq&&(this._blendEq=!1,r.blendEquationSeparate(r.FUNC_ADD,r.FUNC_ADD))}setPolygonOffset(t,e){this.gl.polygonOffset(t,e)}reset(){this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!1),this.forceState(this.defaultState),this._blendEq=!0,this.blendMode="",this.setBlendMode("normal")}_updateCheck(t,e){const r=this.checks.indexOf(t);e&&r===-1?this.checks.push(t):!e&&r!==-1&&this.checks.splice(r,1)}static _checkBlendMode(t,e){t.setBlendMode(e.blendMode)}static _checkPolygonOffset(t,e){t.setPolygonOffset(1,e.polygonOffset)}destroy(){this.gl=null,this.checks.length=0}};let oo=so;oo.extension={type:[b.WebGLSystem],name:"state"};class cp{constructor(e){this.target=js.TEXTURE_2D,this.texture=e,this.width=-1,this.height=-1,this.type=D.UNSIGNED_BYTE,this.internalFormat=Ti.RGBA,this.format=Ti.RGBA,this.samplerType=0}}const dp={id:"image",upload(t,e,r){e.width===t.width||e.height===t.height?r.texSubImage2D(r.TEXTURE_2D,0,0,0,e.format,e.type,t.resource):r.texImage2D(e.target,0,e.internalFormat,t.width,t.height,0,e.format,e.type,t.resource),e.width=t.width,e.height=t.height}},ao={id:"image",upload(t,e,r){const i=t.alphaMode==="premultiply-alpha-on-upload";r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i);const n=e.width,s=e.height,o=t.pixelWidth,a=t.pixelHeight,l=t.resourceWidth,u=t.resourceHeight;l<o||u<a?((n!==o||s!==a)&&r.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,null),r.texSubImage2D(r.TEXTURE_2D,0,0,0,l,u,e.format,e.type,t.resource)):n===o||s===a?r.texSubImage2D(r.TEXTURE_2D,0,0,0,e.format,e.type,t.resource):r.texImage2D(e.target,0,e.internalFormat,o,a,0,e.format,e.type,t.resource),e.width=o,e.height=a}},pp={id:"video",upload(t,e,r){if(!t.isValid){r.texImage2D(e.target,0,e.internalFormat,1,1,0,e.format,e.type,null);return}ao.upload(t,e,r)}},lo={linear:9729,nearest:9728},fp={linear:{linear:9987,nearest:9985},nearest:{linear:9986,nearest:9984}},Mi={"clamp-to-edge":33071,repeat:10497,"mirror-repeat":33648},gp={never:512,less:513,equal:514,"less-equal":515,greater:516,"not-equal":517,"greater-equal":518,always:519};function uo(t,e,r,i,n,s){const o=s;if(e[n](o,e.TEXTURE_WRAP_S,Mi[t.addressModeU]),e[n](o,e.TEXTURE_WRAP_T,Mi[t.addressModeV]),e[n](o,e.TEXTURE_WRAP_R,Mi[t.addressModeW]),e[n](o,e.TEXTURE_MAG_FILTER,lo[t.magFilter]),r){const a=fp[t.minFilter][t.mipmapFilter];e[n](o,e.TEXTURE_MIN_FILTER,a)}else e[n](o,e.TEXTURE_MIN_FILTER,lo[t.minFilter]);if(i&&t.maxAnisotropy>1){const a=Math.min(t.maxAnisotropy,e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT));e[n](o,i.TEXTURE_MAX_ANISOTROPY_EXT,a)}t.compare&&e[n](o,e.TEXTURE_COMPARE_FUNC,gp[t.compare])}function mp(t){return{r8unorm:t.RED,r8snorm:t.RED,r8uint:t.RED,r8sint:t.RED,r16uint:t.RED,r16sint:t.RED,r16float:t.RED,rg8unorm:t.RG,rg8snorm:t.RG,rg8uint:t.RG,rg8sint:t.RG,r32uint:t.RED,r32sint:t.RED,r32float:t.RED,rg16uint:t.RG,rg16sint:t.RG,rg16float:t.RG,rgba8unorm:t.RGBA,"rgba8unorm-srgb":t.RGBA,rgba8snorm:t.RGBA,rgba8uint:t.RGBA,rgba8sint:t.RGBA,bgra8unorm:t.RGBA,"bgra8unorm-srgb":t.RGBA,rgb9e5ufloat:t.RGB,rgb10a2unorm:t.RGBA,rg11b10ufloat:t.RGB,rg32uint:t.RG,rg32sint:t.RG,rg32float:t.RG,rgba16uint:t.RGBA,rgba16sint:t.RGBA,rgba16float:t.RGBA,rgba32uint:t.RGBA,rgba32sint:t.RGBA,rgba32float:t.RGBA,stencil8:t.STENCIL_INDEX8,depth16unorm:t.DEPTH_COMPONENT,depth24plus:t.DEPTH_COMPONENT,"depth24plus-stencil8":t.DEPTH_STENCIL,depth32float:t.DEPTH_COMPONENT,"depth32float-stencil8":t.DEPTH_STENCIL}}function bp(t){return{r8unorm:t.R8,r8snorm:t.R8_SNORM,r8uint:t.R8UI,r8sint:t.R8I,r16uint:t.R16UI,r16sint:t.R16I,r16float:t.R16F,rg8unorm:t.RG8,rg8snorm:t.RG8_SNORM,rg8uint:t.RG8UI,rg8sint:t.RG8I,r32uint:t.R32UI,r32sint:t.R32I,r32float:t.R32F,rg16uint:t.RG16UI,rg16sint:t.RG16I,rg16float:t.RG16F,rgba8unorm:t.RGBA,"rgba8unorm-srgb":t.SRGB8_ALPHA8,rgba8snorm:t.RGBA8_SNORM,rgba8uint:t.RGBA8UI,rgba8sint:t.RGBA8I,bgra8unorm:t.RGBA8,"bgra8unorm-srgb":t.SRGB8_ALPHA8,rgb9e5ufloat:t.RGB9_E5,rgb10a2unorm:t.RGB10_A2,rg11b10ufloat:t.R11F_G11F_B10F,rg32uint:t.RG32UI,rg32sint:t.RG32I,rg32float:t.RG32F,rgba16uint:t.RGBA16UI,rgba16sint:t.RGBA16I,rgba16float:t.RGBA16F,rgba32uint:t.RGBA32UI,rgba32sint:t.RGBA32I,rgba32float:t.RGBA32F,stencil8:t.STENCIL_INDEX8,depth16unorm:t.DEPTH_COMPONENT16,depth24plus:t.DEPTH_COMPONENT24,"depth24plus-stencil8":t.DEPTH24_STENCIL8,depth32float:t.DEPTH_COMPONENT32F,"depth32float-stencil8":t.DEPTH32F_STENCIL8}}function vp(t){return{r8unorm:t.UNSIGNED_BYTE,r8snorm:t.BYTE,r8uint:t.UNSIGNED_BYTE,r8sint:t.BYTE,r16uint:t.UNSIGNED_SHORT,r16sint:t.SHORT,r16float:t.HALF_FLOAT,rg8unorm:t.UNSIGNED_BYTE,rg8snorm:t.BYTE,rg8uint:t.UNSIGNED_BYTE,rg8sint:t.BYTE,r32uint:t.UNSIGNED_INT,r32sint:t.INT,r32float:t.FLOAT,rg16uint:t.UNSIGNED_SHORT,rg16sint:t.SHORT,rg16float:t.HALF_FLOAT,rgba8unorm:t.UNSIGNED_BYTE,"rgba8unorm-srgb":t.UNSIGNED_BYTE,rgba8snorm:t.BYTE,rgba8uint:t.UNSIGNED_BYTE,rgba8sint:t.BYTE,bgra8unorm:t.UNSIGNED_BYTE,"bgra8unorm-srgb":t.UNSIGNED_BYTE,rgb9e5ufloat:t.UNSIGNED_INT_5_9_9_9_REV,rgb10a2unorm:t.UNSIGNED_INT_2_10_10_10_REV,rg11b10ufloat:t.UNSIGNED_INT_10F_11F_11F_REV,rg32uint:t.UNSIGNED_INT,rg32sint:t.INT,rg32float:t.FLOAT,rgba16uint:t.UNSIGNED_SHORT,rgba16sint:t.SHORT,rgba16float:t.HALF_FLOAT,rgba32uint:t.UNSIGNED_INT,rgba32sint:t.INT,rgba32float:t.FLOAT,stencil8:t.UNSIGNED_BYTE,depth16unorm:t.UNSIGNED_SHORT,depth24plus:t.UNSIGNED_INT,"depth24plus-stencil8":t.UNSIGNED_INT_24_8,depth32float:t.FLOAT,"depth32float-stencil8":t.FLOAT_32_UNSIGNED_INT_24_8_REV}}function Ax(t){t instanceof Uint8ClampedArray&&(t=new Uint8Array(t.buffer));const e=t.length;for(let r=0;r<e;r+=4){const i=t[r+3];if(i!==0){const n=255.001/i;t[r]=t[r]*n+.5,t[r+1]=t[r+1]*n+.5,t[r+2]=t[r+2]*n+.5}}}const Ex=new Q,Cx=4;class ho{constructor(e){this.managedTextures=[],this._glTextures=Object.create(null),this._glSamplers=Object.create(null),this._boundTextures=[],this._activeTextureLocation=-1,this._boundSamplers=Object.create(null),this._uploads={image:ao,buffer:dp,video:pp},this._useSeparateSamplers=!1,this._renderer=e}contextChange(e){this._gl=e,this._mapFormatToInternalFormat||(this._mapFormatToInternalFormat=bp(e),this._mapFormatToType=vp(e),this._mapFormatToFormat=mp(e));for(let r=0;r<16;r++)this.bind(A.EMPTY,r)}bind(e,r=0){const i=e.source;e?(this.bindSource(i,r),this._useSeparateSamplers&&this._bindSampler(i.style,r)):(this.bindSource(null,r),this._useSeparateSamplers&&this._bindSampler(null,r))}bindSource(e,r=0){const i=this._gl;if(e.touched=this._renderer.textureGC.count,this._boundTextures[r]!==e){this._boundTextures[r]=e,this._activateLocation(r),e=e||A.EMPTY.source;const n=this.getGlSource(e);i.bindTexture(n.target,n.texture)}}_bindSampler(e,r=0){const i=this._gl;if(!e){this._boundSamplers[r]=null,i.bindSampler(r,null);return}const n=this._getGlSampler(e);this._boundSamplers[r]!==n&&(this._boundSamplers[r]=n,i.bindSampler(r,n))}unbind(e){const r=e.source,i=this._boundTextures,n=this._gl;for(let s=0;s<i.length;s++)if(i[s]===r){this._activateLocation(s);const o=this.getGlSource(r);n.bindTexture(o.target,null),i[s]=null}}_activateLocation(e){this._activeTextureLocation!==e&&(this._activeTextureLocation=e,this._gl.activeTexture(this._gl.TEXTURE0+e))}_initSource(e){const r=this._gl,i=new cp(r.createTexture());if(i.type=this._mapFormatToType[e.format],i.internalFormat=this._mapFormatToInternalFormat[e.format],i.format=this._mapFormatToFormat[e.format],e.autoGenerateMipmaps){const n=Math.max(e.width,e.height);e.mipLevelCount=Math.floor(Math.log2(n))+1}return this._glTextures[e.uid]=i,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceUpdate,this),e.on("styleChange",this.onStyleChange,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),this.onStyleChange(e),i}onStyleChange(e){const r=this._gl,i=this._glTextures[e.uid];r.bindTexture(r.TEXTURE_2D,i.texture),this._boundTextures[this._activeTextureLocation]=e,uo(e.style,r,e.mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"texParameteri",r.TEXTURE_2D)}onSourceUnload(e){const r=this._glTextures[e.uid];r&&(this.unbind(e),this._glTextures[e.uid]=null,this._gl.deleteTexture(r.texture))}onSourceUpdate(e){const r=this._gl,i=this.getGlSource(e);r.bindTexture(r.TEXTURE_2D,i.texture),this._boundTextures[this._activeTextureLocation]=e,this._uploads[e.uploadMethodId]?(this._uploads[e.uploadMethodId].upload(e,i,this._gl),e.autoGenerateMipmaps&&e.mipLevelCount>1&&r.generateMipmap(i.target)):r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e.pixelWidth,e.pixelHeight,0,r.RGBA,r.UNSIGNED_BYTE,null)}onSourceDestroy(e){e.off("destroy",this.onSourceDestroy,this),e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}_initSampler(e){const r=this._gl,i=this._gl.createSampler();return this._glSamplers[e.resourceId]=i,uo(e,r,this._boundTextures[this._activeTextureLocation].mipLevelCount>1,this._renderer.context.extensions.anisotropicFiltering,"samplerParameteri",i),this._glSamplers[e.resourceId]}_getGlSampler(e){return this._glSamplers[e.resourceId]||this._initSampler(e)}getGlSource(e){return this._glTextures[e.uid]||this._initSource(e)}generateCanvas(e){const{pixels:r,width:i,height:n}=this.getPixels(e),s=j.get().createCanvas();s.width=i,s.height=n;const o=s.getContext("2d");if(o){const a=o.createImageData(i,n);a.data.set(r),o.putImageData(a,0,0)}return s}getPixels(e){const r=e.source.resolution,i=Ex;i.x=e.frameX,i.y=e.frameY,i.width=e.frameWidth,i.height=e.frameHeight;const n=Math.max(Math.round(i.width*r),1),s=Math.max(Math.round(i.height*r),1),o=new Uint8Array(Cx*n*s),a=this._renderer,l=a.renderTarget.getRenderTarget(e),u=a.renderTarget.getGpuRenderTarget(l),h=a.gl;return h.bindFramebuffer(h.FRAMEBUFFER,u.resolveTargetFramebuffer),h.readPixels(Math.round(i.x*r),Math.round(i.y*r),n,s,h.RGBA,h.UNSIGNED_BYTE,o),{pixels:new Uint8ClampedArray(o.buffer),width:n,height:s}}destroy(){const e=this;e._renderer=null}}ho.extension={type:[b.WebGLSystem],name:"texture"};class co{init(){const e=new re({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new k,type:"mat3x3<f32>"}}),r=Bt({name:"graphics",bits:[gi,bi(Te),vr,kt]});this.shader=new Ee({glProgram:r,resources:{localUniforms:e,batchSamplers:vi}})}execute(e,r){const i=r.view.context,n=i.customShader||this.shader,s=e.renderer,o=s.graphicsContext,{geometry:a,instructions:l}=o.getContextRenderData(i);s.shader.bind(n),s.shader.bindUniformBlock(s.globalUniforms.uniformGroup,"globalUniforms"),s.geometry.bind(a,n.glProgram);const u=l.instructions;for(let h=0;h<l.instructionSize;h++){const c=u[h];if(c.size){for(let p=0;p<c.textures.textures.length;p++)s.texture.bind(c.textures.textures[p],p);s.geometry.draw("triangle-list",c.size,c.start)}}}destroy(){this.shader.destroy(!0),this.shader=null}}co.extension={type:[b.WebGLPipesAdaptor],name:"graphics"};class po{init(){const e=Bt({name:"mesh",bits:[vr,Od,kt]});this._shader=new Ee({glProgram:e,resources:{uTexture:A.EMPTY.source}}),this._shader.addResource("globalUniforms",0,0),this._shader.addResource("localUniforms",1,0)}execute(e,r){const i=e.renderer,n=r.view;let s=n._shader;if(!s){s=this._shader;const o=n.texture.source;s.resources.uTexture=o,s.resources.uSampler=o.style}s.groups[0]=i.globalUniforms.bindGroup,s.groups[1]=e.localUniformsBindGroup,i.encoder.draw({geometry:n._geometry,shader:s,state:n.state})}destroy(){this._shader.destroy(!0),this._shader=null}}po.extension={type:[b.WebGLPipesAdaptor],name:"mesh"};function fo(t,e){const r=t.instructionSet,i=r.instructions;for(let n=0;n<r.instructionSize;n++){const s=i[n];e[s.type].execute(s)}}class go{constructor(e){this._renderer=e}addLayerGroup(e,r){this._renderer.renderPipes.batch.break(r),r.add(e)}execute(e){e.isRenderable&&(this._renderer.globalUniforms.push({projectionData:this._renderer.renderTarget.renderTarget,worldTransformMatrix:e.worldTransform,worldColor:e.worldColor}),fo(e,this._renderer.renderPipes),this._renderer.globalUniforms.pop())}destroy(){this._renderer=null}}go.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"layer"};function mo(t,e=[]){e.push(t);for(let r=0;r<t.layerGroupChildren.length;r++)mo(t.layerGroupChildren[r],e);return e}function bo(t,e,r){const i=t>>16&255,n=t>>8&255,s=t&255,o=e>>16&255,a=e>>8&255,l=e&255,u=i+(o-i)*r,h=n+(a-n)*r,c=s+(l-s)*r;return(u<<16)+(h<<8)+c}const yp=16777215+16777215;function Bi(t,e){const r=(t>>24&255)/255,i=(e>>24&255)/255,n=r*i*255,s=t&16777215,o=e&16777215;let a=16777215;return s+(o<<32)!==yp&&(s===16777215?a=o:o===16777215?a=s:a=bo(s,o,.5)),a+(n<<24)}function Mx(t,e,r){const i=(r>>24&255)/255,n=e*i*255,s=((t&255)<<16)+(t&65280)+(t>>16&255),o=r&16777215;let a=16777215;return s+(o<<32)!==yp&&(s===16777215?a=o:o===16777215?a=s:a=bo(s,o,.5)),a+(n<<24)}const Bx=new Y;function vo(t,e=!1){xp(t);const r=t.childrenToUpdate,i=t.updateTick;t.updateTick++;for(const n in r){const s=r[n],o=s.list,a=s.index;for(let l=0;l<a;l++)yo(o[l],i,0);s.index=0}if(e)for(let n=0;n<t.layerGroupChildren.length;n++)vo(t.layerGroupChildren[n],e)}function xp(t){t.layerGroupParent?(t.worldTransform.appendFrom(t.root.layerTransform,t.layerGroupParent.worldTransform),t.worldColor=Bi(t.root.layerColor,t.layerGroupParent.worldColor)):(t.worldTransform.copyFrom(t.root.layerTransform),t.worldColor=t.root.localColor)}function yo(t,e,r){if(e===t.updateTick)return;t.updateTick=e,t.didChange=!1;const i=t.localTransform;Ue(i,t);const n=t.parent;if(n&&!n.isLayerRoot?(r=r|t._updateFlags,t.layerTransform.appendFrom(i,n.layerTransform),r&&_p(t,n,r)):(r=t._updateFlags,t.layerTransform.copyFrom(i),r&&_p(t,Bx,r)),!t.isLayerRoot){const s=t.children,o=s.length;for(let l=0;l<o;l++)yo(s[l],e,r);const a=t.layerGroup;t.view&&!a.structureDidChange&&a.updateRenderable(t)}}function _p(t,e,r){r&zr&&(t.layerColor=Bi(t.localColor,e.layerColor)),r&fn&&(t.layerBlendMode=t.localBlendMode==="inherit"?e.layerBlendMode:t.localBlendMode),r&Nr&&(t.layerVisibleRenderable=t.localVisibleRenderable&e.layerVisibleRenderable),t._updateFlags=0}function wp(t,e){const{list:r,index:i}=t.childrenRenderablesToUpdate;let n=!1;for(let s=0;s<i;s++){const o=r[s],a=o.view;if(n=e[a.renderPipeId].validateRenderable(o),n)break}return t.structureDidChange=n,n&&(t.childrenRenderablesToUpdate.index=0),n}class xo{constructor(e){this._renderer=e}render({container:e,transform:r}){e.layer=!0;const i=this._renderer,n=mo(e.layerGroup,[]),s=i.renderPipes;for(let o=0;o<n.length;o++){const a=n[o];a.runOnRender(),a.instructionSet.renderPipes=s,a.structureDidChange||wp(a,s),vo(a),a.structureDidChange?(a.structureDidChange=!1,Ud(a,s)):Rx(a),i.renderPipes.batch.upload(a.instructionSet)}r&&e.layerGroup.worldTransform.copyFrom(r),i.globalUniforms.start({projectionData:i.renderTarget.rootRenderTarget,worldTransformMatrix:e.layerGroup.worldTransform}),fo(e.layerGroup,s),s.uniformBatch&&(s.uniformBatch.renderEnd(),s.uniformBuffer.renderEnd())}destroy(){const e=this;e._renderer=null}}xo.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"layer"};function Rx(t){const{list:e,index:r}=t.childrenRenderablesToUpdate;for(let i=0;i<r;i++){const n=e[i];n.didViewUpdate&&t.updateRenderable(n)}t.childrenRenderablesToUpdate.index=0}function _o(t,e,r,i,n,s,o,a=null){let l=0;r*=e,n*=s;const u=a.a,h=a.b,c=a.c,p=a.d,d=a.tx,f=a.ty;for(;l<o;){const m=t[r],g=t[r+1];i[n]=u*m+c*g+d,i[n+1]=h*m+p*g+f,n+=s,r+=e,l++}}function wo(t,e,r,i){let n=0;for(e*=r;n<i;)t[e]=0,t[e+1]=0,e+=r,n++}function Ri(t,e,r,i,n){const s=e.a,o=e.b,a=e.c,l=e.d,u=e.tx,h=e.ty;r=r||0,i=i||2,n=n||t.length/i-r;let c=r*i;for(let p=0;p<n;p++){const d=t[c],f=t[c+1];t[c]=s*d+a*f+u,t[c+1]=o*d+l*f+h,c+=i}}class ki{constructor(){this.batcher=null,this.batch=null,this.applyTransform=!0,this.roundPixels=0}get blendMode(){return this.applyTransform?this.renderable.layerBlendMode:"normal"}packIndex(e,r,i){const n=this.geometryData.indices;for(let s=0;s<this.indexSize;s++)e[r++]=n[s+this.indexOffset]+i-this.vertexOffset}packAttributes(e,r,i,n){const s=this.geometryData,o=this.renderable,a=s.vertices,l=s.uvs,u=this.vertexOffset*2,h=(this.vertexOffset+this.vertexSize)*2,c=this.color,p=c>>16|c&65280|(c&255)<<16;if(this.applyTransform){const d=Bi(p+(this.alpha*255<<24),o.layerColor),f=o.layerTransform,m=n<<16|this.roundPixels&65535,g=f.a,x=f.b,v=f.c,y=f.d,_=f.tx,P=f.ty;for(let C=u;C<h;C+=2){const B=a[C],S=a[C+1];e[i]=g*B+v*S+_,e[i+1]=x*B+y*S+P,e[i+2]=l[C],e[i+3]=l[C+1],r[i+4]=d,r[i+5]=m,i+=6}}else{const d=p+(this.alpha*255<<24);for(let f=u;f<h;f+=2)e[i]=a[f],e[i+1]=a[f+1],e[i+2]=l[f],e[i+3]=l[f+1],r[i+4]=d,r[i+5]=n,i+=6}}get vertSize(){return this.vertexSize}copyTo(e){e.indexOffset=this.indexOffset,e.indexSize=this.indexSize,e.vertexOffset=this.vertexOffset,e.vertexSize=this.vertexSize,e.color=this.color,e.alpha=this.alpha,e.texture=this.texture,e.geometryData=this.geometryData}}const gt={build(t,e){let r,i,n,s,o,a;if(t.type==="circle"){const _=t;r=_.x,i=_.y,o=a=_.radius,n=s=0}else if(t.type==="ellipse"){const _=t;r=_.x,i=_.y,o=_.halfWidth,a=_.halfHeight,n=s=0}else{const _=t,P=_.width/2,C=_.height/2;r=_.x+P,i=_.y+C,o=a=Math.max(0,Math.min(_.radius,Math.min(P,C))),n=P-o,s=C-a}if(!(o>=0&&a>=0&&n>=0&&s>=0))return e;const l=Math.ceil(2.3*Math.sqrt(o+a)),u=l*8+(n?4:0)+(s?4:0);if(u===0)return e;if(l===0)return e[0]=e[6]=r+n,e[1]=e[3]=i+s,e[2]=e[4]=r-n,e[5]=e[7]=i-s,e;let h=0,c=l*4+(n?2:0)+2,p=c,d=u,f=n+o,m=s,g=r+f,x=r-f,v=i+m;if(e[h++]=g,e[h++]=v,e[--c]=v,e[--c]=x,s){const _=i-m;e[p++]=x,e[p++]=_,e[--d]=_,e[--d]=g}for(let _=1;_<l;_++){const P=Math.PI/2*(_/l),C=n+Math.cos(P)*o,B=s+Math.sin(P)*a,S=r+C,w=r-C,T=i+B,L=i-B;e[h++]=S,e[h++]=T,e[--c]=T,e[--c]=w,e[p++]=w,e[p++]=L,e[--d]=L,e[--d]=S}f=n,m=s+a,g=r+f,x=r-f,v=i+m;const y=i-m;return e[h++]=g,e[h++]=v,e[--d]=y,e[--d]=g,n&&(e[h++]=x,e[h++]=v,e[--d]=y,e[--d]=x),e},triangulate(t,e,r,i,n,s){if(t.length===0)return;let o=0,a=0;const l=t.length/4;o+=t[0],a+=t[1],o+=t[l|0],a+=t[(l|0)+1],o+=t[l*2|0],a+=t[(l*2|0)+1],o+=t[l*3|0],a+=t[(l*3|0)+1],o/=4,a/=4;let u=i;e[u*r]=o,e[u*r+1]=a,u++;const h=i;e[u*r]=t[0],e[u*r+1]=t[1],u++;for(let c=2;c<t.length;c+=2)e[u*r]=t[c],e[u*r+1]=t[c+1],n[s++]=u,n[s++]=h,n[s++]=u-1,u++;n[s++]=u-1,n[s++]=h,n[s++]=h+1}},Tp=1e-4,To=1e-4;function Sp(t){const e=t.length;if(e<6)return 1;let r=0;for(let i=0,n=t[e-2],s=t[e-1];i<e;i+=2){const o=t[i],a=t[i+1];r+=(o-n)*(a+s),n=o,s=a}return r<0?-1:1}function Pp(t,e,r,i,n,s,o,a){const l=t-r*n,u=e-i*n,h=t+r*s,c=e+i*s;let p,d;o?(p=i,d=-r):(p=-i,d=r);const f=l+p,m=u+d,g=h+p,x=c+d;return a.push(f,m),a.push(g,x),2}function mt(t,e,r,i,n,s,o,a){const l=r-t,u=i-e;let h=Math.atan2(l,u),c=Math.atan2(n-t,s-e);a&&h<c?h+=Math.PI*2:!a&&h>c&&(c+=Math.PI*2);let p=h;const d=c-h,f=Math.abs(d),m=Math.sqrt(l*l+u*u),g=(15*f*Math.sqrt(m)/Math.PI>>0)+1,x=d/g;if(p+=x,a){o.push(t,e),o.push(r,i);for(let v=1,y=p;v<g;v++,y+=x)o.push(t,e),o.push(t+Math.sin(y)*m,e+Math.cos(y)*m);o.push(t,e),o.push(n,s)}else{o.push(r,i),o.push(t,e);for(let v=1,y=p;v<g;v++,y+=x)o.push(t+Math.sin(y)*m,e+Math.cos(y)*m),o.push(t,e);o.push(n,s),o.push(t,e)}return g*2}function Ap(t,e,r,i,n,s,o,a,l){const u=Tp;if(t.length===0)return;const h=e;let c=h.alignment;if(e.alignment!==.5){let X=Sp(t);r&&(X*=-1),c=(c-.5)*X+.5}const p=new W(t[0],t[1]),d=new W(t[t.length-2],t[t.length-1]),f=i,m=Math.abs(p.x-d.x)<u&&Math.abs(p.y-d.y)<u;if(f){t=t.slice(),m&&(t.pop(),t.pop(),d.set(t[t.length-2],t[t.length-1]));const X=(p.x+d.x)*.5,Ne=(d.y+p.y)*.5;t.unshift(X,Ne),t.push(X,Ne)}const g=n,x=t.length/2;let v=t.length;const y=g.length/2,_=h.width/2,P=_*_,C=h.miterLimit*h.miterLimit;let B=t[0],S=t[1],w=t[2],T=t[3],L=0,$=0,R=-(S-T),E=B-w,K=0,ee=0,fe=Math.sqrt(R*R+E*E);R/=fe,E/=fe,R*=_,E*=_;const Nt=c,F=(1-Nt)*2,U=Nt*2;f||(h.cap==="round"?v+=mt(B-R*(F-U)*.5,S-E*(F-U)*.5,B-R*F,S-E*F,B+R*U,S+E*U,g,!0)+2:h.cap==="square"&&(v+=Pp(B,S,R,E,F,U,!0,g))),g.push(B-R*F,S-E*F),g.push(B+R*U,S+E*U);for(let X=1;X<x-1;++X){B=t[(X-1)*2],S=t[(X-1)*2+1],w=t[X*2],T=t[X*2+1],L=t[(X+1)*2],$=t[(X+1)*2+1],R=-(S-T),E=B-w,fe=Math.sqrt(R*R+E*E),R/=fe,E/=fe,R*=_,E*=_,K=-(T-$),ee=w-L,fe=Math.sqrt(K*K+ee*ee),K/=fe,ee/=fe,K*=_,ee*=_;const Ne=w-B,Ht=S-T,jt=w-L,Wt=$-T,Ia=Ne*jt+Ht*Wt,Or=Ht*jt-Wt*Ne,Vt=Or<0;if(Math.abs(Or)<.001*Math.abs(Ia)){g.push(w-R*F,T-E*F),g.push(w+R*U,T+E*U),Ia>=0&&(h.join==="round"?v+=mt(w,T,w-R*F,T-E*F,w-K*F,T-ee*F,g,!1)+4:v+=2,g.push(w-K*U,T-ee*U),g.push(w+K*F,T+ee*F));continue}const Ga=(-R+B)*(-E+T)-(-R+w)*(-E+S),$a=(-K+L)*(-ee+T)-(-K+w)*(-ee+$),Fr=(Ne*$a-jt*Ga)/Or,Ur=(Wt*Ga-Ht*$a)/Or,en=(Fr-w)*(Fr-w)+(Ur-T)*(Ur-T),Ye=w+(Fr-w)*F,Xe=T+(Ur-T)*F,qe=w-(Fr-w)*U,Ke=T-(Ur-T)*U,zg=Math.min(Ne*Ne+Ht*Ht,jt*jt+Wt*Wt),La=Vt?F:U,Ng=zg+La*La*P;en<=Ng?h.join==="bevel"||en/P>C?(Vt?(g.push(Ye,Xe),g.push(w+R*U,T+E*U),g.push(Ye,Xe),g.push(w+K*U,T+ee*U)):(g.push(w-R*F,T-E*F),g.push(qe,Ke),g.push(w-K*F,T-ee*F),g.push(qe,Ke)),v+=2):h.join==="round"?Vt?(g.push(Ye,Xe),g.push(w+R*U,T+E*U),v+=mt(w,T,w+R*U,T+E*U,w+K*U,T+ee*U,g,!0)+4,g.push(Ye,Xe),g.push(w+K*U,T+ee*U)):(g.push(w-R*F,T-E*F),g.push(qe,Ke),v+=mt(w,T,w-R*F,T-E*F,w-K*F,T-ee*F,g,!1)+4,g.push(w-K*F,T-ee*F),g.push(qe,Ke)):(g.push(Ye,Xe),g.push(qe,Ke)):(g.push(w-R*F,T-E*F),g.push(w+R*U,T+E*U),h.join==="round"?Vt?v+=mt(w,T,w+R*U,T+E*U,w+K*U,T+ee*U,g,!0)+2:v+=mt(w,T,w-R*F,T-E*F,w-K*F,T-ee*F,g,!1)+2:h.join==="miter"&&en/P<=C&&(Vt?(g.push(qe,Ke),g.push(qe,Ke)):(g.push(Ye,Xe),g.push(Ye,Xe)),v+=2),g.push(w-K*F,T-ee*F),g.push(w+K*U,T+ee*U),v+=2)}B=t[(x-2)*2],S=t[(x-2)*2+1],w=t[(x-1)*2],T=t[(x-1)*2+1],R=-(S-T),E=B-w,fe=Math.sqrt(R*R+E*E),R/=fe,E/=fe,R*=_,E*=_,g.push(w-R*F,T-E*F),g.push(w+R*U,T+E*U),f||(h.cap==="round"?v+=mt(w-R*(F-U)*.5,T-E*(F-U)*.5,w-R*F,T-E*F,w+R*U,T+E*U,g,!1)+2:h.cap==="square"&&(v+=Pp(w,T,R,E,F,U,!1,g)));const Dg=To*To;for(let X=y;X<v+y-2;++X)B=g[X*2],S=g[X*2+1],w=g[(X+1)*2],T=g[(X+1)*2+1],L=g[(X+2)*2],$=g[(X+2)*2+1],!(Math.abs(B*(T-$)+w*($-S)+L*(S-T))<Dg)&&a.push(X,X+1,X+2)}var So=Oi,kx=Oi;function Oi(t,e,r){r=r||2;var i=e&&e.length,n=i?e[0]*r:t.length,s=Ep(t,0,n,r,!0),o=[];if(!s||s.next===s.prev)return o;var a,l,u,h,c,p,d;if(i&&(s=Gx(t,e,s,r)),t.length>80*r){a=u=t[0],l=h=t[1];for(var f=r;f<n;f+=r)c=t[f],p=t[f+1],c<a&&(a=c),p<l&&(l=p),c>u&&(u=c),p>h&&(h=p);d=Math.max(u-a,h-l),d=d!==0?32767/d:0}return wr(s,o,r,a,l,d,0),o}function Ep(t,e,r,i,n){var s,o;if(n===Eo(t,e,r,i)>0)for(s=e;s<r;s+=i)o=Bp(s,t[s],t[s+1],o);else for(s=r-i;s>=e;s-=i)o=Bp(s,t[s],t[s+1],o);return o&&Fi(o,o.next)&&(Sr(o),o=o.next),o}function bt(t,e){if(!t)return t;e||(e=t);var r=t,i;do if(i=!1,!r.steiner&&(Fi(r,r.next)||J(r.prev,r,r.next)===0)){if(Sr(r),r=e=r.prev,r===r.next)break;i=!0}else r=r.next;while(i||r!==e);return e}function wr(t,e,r,i,n,s,o){if(t){!o&&s&&Nx(t,i,n,s);for(var a=t,l,u;t.prev!==t.next;){if(l=t.prev,u=t.next,s?Fx(t,i,n,s):Ox(t)){e.push(l.i/r|0),e.push(t.i/r|0),e.push(u.i/r|0),Sr(t),t=u.next,a=u.next;continue}if(t=u,t===a){o?o===1?(t=Ux(bt(t),e,r),wr(t,e,r,i,n,s,2)):o===2&&Ix(t,e,r,i,n,s):wr(bt(t),e,r,i,n,s,1);break}}}}function Ox(t){var e=t.prev,r=t,i=t.next;if(J(e,r,i)>=0)return!1;for(var n=e.x,s=r.x,o=i.x,a=e.y,l=r.y,u=i.y,h=n<s?n<o?n:o:s<o?s:o,c=a<l?a<u?a:u:l<u?l:u,p=n>s?n>o?n:o:s>o?s:o,d=a>l?a>u?a:u:l>u?l:u,f=i.next;f!==e;){if(f.x>=h&&f.x<=p&&f.y>=c&&f.y<=d&&Ut(n,a,s,l,o,u,f.x,f.y)&&J(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function Fx(t,e,r,i){var n=t.prev,s=t,o=t.next;if(J(n,s,o)>=0)return!1;for(var a=n.x,l=s.x,u=o.x,h=n.y,c=s.y,p=o.y,d=a<l?a<u?a:u:l<u?l:u,f=h<c?h<p?h:p:c<p?c:p,m=a>l?a>u?a:u:l>u?l:u,g=h>c?h>p?h:p:c>p?c:p,x=Po(d,f,e,r,i),v=Po(m,g,e,r,i),y=t.prevZ,_=t.nextZ;y&&y.z>=x&&_&&_.z<=v;){if(y.x>=d&&y.x<=m&&y.y>=f&&y.y<=g&&y!==n&&y!==o&&Ut(a,h,l,c,u,p,y.x,y.y)&&J(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=d&&_.x<=m&&_.y>=f&&_.y<=g&&_!==n&&_!==o&&Ut(a,h,l,c,u,p,_.x,_.y)&&J(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=x;){if(y.x>=d&&y.x<=m&&y.y>=f&&y.y<=g&&y!==n&&y!==o&&Ut(a,h,l,c,u,p,y.x,y.y)&&J(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=m&&_.y>=f&&_.y<=g&&_!==n&&_!==o&&Ut(a,h,l,c,u,p,_.x,_.y)&&J(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Ux(t,e,r){var i=t;do{var n=i.prev,s=i.next.next;!Fi(n,s)&&Cp(n,i,i.next,s)&&Tr(n,s)&&Tr(s,n)&&(e.push(n.i/r|0),e.push(i.i/r|0),e.push(s.i/r|0),Sr(i),Sr(i.next),i=t=s),i=i.next}while(i!==t);return bt(i)}function Ix(t,e,r,i,n,s){var o=t;do{for(var a=o.next.next;a!==o.prev;){if(o.i!==a.i&&Wx(o,a)){var l=Mp(o,a);o=bt(o,o.next),l=bt(l,l.next),wr(o,e,r,i,n,s,0),wr(l,e,r,i,n,s,0);return}a=a.next}o=o.next}while(o!==t)}function Gx(t,e,r,i){var n=[],s,o,a,l,u;for(s=0,o=e.length;s<o;s++)a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,u=Ep(t,a,l,i,!1),u===u.next&&(u.steiner=!0),n.push(jx(u));for(n.sort($x),s=0;s<n.length;s++)r=Lx(n[s],r);return r}function $x(t,e){return t.x-e.x}function Lx(t,e){var r=Dx(t,e);if(!r)return e;var i=Mp(r,t);return bt(i,i.next),bt(r,r.next)}function Dx(t,e){var r=e,i=t.x,n=t.y,s=-1/0,o;do{if(n<=r.y&&n>=r.next.y&&r.next.y!==r.y){var a=r.x+(n-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(a<=i&&a>s&&(s=a,o=r.x<r.next.x?r:r.next,a===i))return o}r=r.next}while(r!==e);if(!o)return null;var l=o,u=o.x,h=o.y,c=1/0,p;r=o;do i>=r.x&&r.x>=u&&i!==r.x&&Ut(n<h?i:s,n,u,h,n<h?s:i,n,r.x,r.y)&&(p=Math.abs(n-r.y)/(i-r.x),Tr(r,t)&&(p<c||p===c&&(r.x>o.x||r.x===o.x&&zx(o,r)))&&(o=r,c=p)),r=r.next;while(r!==l);return o}function zx(t,e){return J(t.prev,t,e.prev)<0&&J(e.next,t,t.next)<0}function Nx(t,e,r,i){var n=t;do n.z===0&&(n.z=Po(n.x,n.y,e,r,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==t);n.prevZ.nextZ=null,n.prevZ=null,Hx(n)}function Hx(t){var e,r,i,n,s,o,a,l,u=1;do{for(r=t,t=null,s=null,o=0;r;){for(o++,i=r,a=0,e=0;e<u&&(a++,i=i.nextZ,!!i);e++);for(l=u;a>0||l>0&&i;)a!==0&&(l===0||!i||r.z<=i.z)?(n=r,r=r.nextZ,a--):(n=i,i=i.nextZ,l--),s?s.nextZ=n:t=n,n.prevZ=s,s=n;r=i}s.nextZ=null,u*=2}while(o>1);return t}function Po(t,e,r,i,n){return t=(t-r)*n|0,e=(e-i)*n|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function jx(t){var e=t,r=t;do(e.x<r.x||e.x===r.x&&e.y<r.y)&&(r=e),e=e.next;while(e!==t);return r}function Ut(t,e,r,i,n,s,o,a){return(n-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(r-o)*(e-a)&&(r-o)*(s-a)>=(n-o)*(i-a)}function Wx(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!Vx(t,e)&&(Tr(t,e)&&Tr(e,t)&&Yx(t,e)&&(J(t.prev,t,e.prev)||J(t,e.prev,e))||Fi(t,e)&&J(t.prev,t,t.next)>0&&J(e.prev,e,e.next)>0)}function J(t,e,r){return(e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}function Fi(t,e){return t.x===e.x&&t.y===e.y}function Cp(t,e,r,i){var n=Ii(J(t,e,r)),s=Ii(J(t,e,i)),o=Ii(J(r,i,t)),a=Ii(J(r,i,e));return!!(n!==s&&o!==a||n===0&&Ui(t,r,e)||s===0&&Ui(t,i,e)||o===0&&Ui(r,t,i)||a===0&&Ui(r,e,i))}function Ui(t,e,r){return e.x<=Math.max(t.x,r.x)&&e.x>=Math.min(t.x,r.x)&&e.y<=Math.max(t.y,r.y)&&e.y>=Math.min(t.y,r.y)}function Ii(t){return t>0?1:t<0?-1:0}function Vx(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&Cp(r,r.next,t,e))return!0;r=r.next}while(r!==t);return!1}function Tr(t,e){return J(t.prev,t,t.next)<0?J(t,e,t.next)>=0&&J(t,t.prev,e)>=0:J(t,e,t.prev)<0||J(t,t.next,e)<0}function Yx(t,e){var r=t,i=!1,n=(t.x+e.x)/2,s=(t.y+e.y)/2;do r.y>s!=r.next.y>s&&r.next.y!==r.y&&n<(r.next.x-r.x)*(s-r.y)/(r.next.y-r.y)+r.x&&(i=!i),r=r.next;while(r!==t);return i}function Mp(t,e){var r=new Ao(t.i,t.x,t.y),i=new Ao(e.i,e.x,e.y),n=t.next,s=e.prev;return t.next=e,e.prev=t,r.next=n,n.prev=r,i.next=r,r.prev=i,s.next=i,i.prev=s,i}function Bp(t,e,r,i){var n=new Ao(t,e,r);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Sr(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function Ao(t,e,r){this.i=t,this.x=e,this.y=r,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}Oi.deviation=function(t,e,r,i){var n=e&&e.length,s=n?e[0]*r:t.length,o=Math.abs(Eo(t,0,s,r));if(n)for(var a=0,l=e.length;a<l;a++){var u=e[a]*r,h=a<l-1?e[a+1]*r:t.length;o-=Math.abs(Eo(t,u,h,r))}var c=0;for(a=0;a<i.length;a+=3){var p=i[a]*r,d=i[a+1]*r,f=i[a+2]*r;c+=Math.abs((t[p]-t[f])*(t[d+1]-t[p+1])-(t[p]-t[d])*(t[f+1]-t[p+1]))}return o===0&&c===0?0:Math.abs((c-o)/o)};function Eo(t,e,r,i){for(var n=0,s=e,o=r-i;s<r;s+=i)n+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return n}Oi.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},i=0,n=0;n<t.length;n++){for(var s=0;s<t[n].length;s++)for(var o=0;o<e;o++)r.vertices.push(t[n][s][o]);n>0&&(i+=t[n-1].length,r.holes.push(i))}return r},So.default=kx;function Co(t,e,r,i,n,s,o){const a=So(t,e,2);if(!a)return;for(let u=0;u<a.length;u+=3)s[o++]=a[u]+n,s[o++]=a[u+1]+n,s[o++]=a[u+2]+n;let l=n*i;for(let u=0;u<t.length;u+=2)r[l]=t[u],r[l+1]=t[u+1],l+=i}const Xx=[],Mo={build(t,e){for(let r=0;r<t.points.length;r++)e[r]=t.points[r];return e},triangulate(t,e,r,i,n,s){Co(t,Xx,e,r,i,n,s)}},Bo={build(t,e){const r=t,i=r.x,n=r.y,s=r.width,o=r.height;return s>=0&&o>=0&&(e[0]=i,e[1]=n,e[2]=i+s,e[3]=n,e[4]=i+s,e[5]=n+o,e[6]=i,e[7]=n+o),e},triangulate(t,e,r,i,n,s){let o=0;i*=r,e[i+o]=t[0],e[i+o+1]=t[1],o+=r,e[i+o]=t[2],e[i+o+1]=t[3],o+=r,e[i+o]=t[6],e[i+o+1]=t[7],o+=r,e[i+o]=t[4],e[i+o+1]=t[5],o+=r;const a=i/r;n[s++]=a,n[s++]=a+1,n[s++]=a+2,n[s++]=a+1,n[s++]=a+3,n[s++]=a+2}},Ro={build(t,e){return e[0]=t.x,e[1]=t.y,e[2]=t.x2,e[3]=t.y2,e[4]=t.x3,e[5]=t.y3,e},triangulate(t,e,r,i,n,s){let o=0;i*=r,e[i+o]=t[0],e[i+o+1]=t[1],o+=r,e[i+o]=t[2],e[i+o+1]=t[3],o+=r,e[i+o]=t[4],e[i+o+1]=t[5];const a=i/r;n[s++]=a,n[s++]=a+1,n[s++]=a+2}},ko={rectangle:Bo,polygon:Mo,triangle:Ro,circle:gt,ellipse:gt,roundedRectangle:gt},qx=new Q;function Rp(t){const e={vertices:[],uvs:[],indices:[]},r=[];for(let i=0;i<t.instructions.length;i++){const n=t.instructions[i];if(n.action==="texture")Kx(n.data,r,e);else if(n.action==="fill"||n.action==="stroke"){const s=n.action==="stroke",o=n.data.path.shapePath,a=n.data.style,l=n.data.hole;s&&l&&kp(l.shapePath,a,null,!0,r,e),kp(o,a,l,s,r,e)}}return r}function Kx(t,e,r){const{vertices:i,uvs:n,indices:s}=r,o=s.length,a=i.length/2,l=[],u=ko.rectangle,h=qx,c=t.image;h.x=t.dx,h.y=t.dy,h.width=t.dw,h.height=t.dh;const p=t.transform;u.build(h,l),p&&Ri(l,p),u.triangulate(l,i,2,a,s,o);const d=c.layout.uvs;n.push(d.x0,d.y0,d.x1,d.y1,d.x3,d.y3,d.x2,d.y2);const f=z.get(ki);f.indexOffset=o,f.indexSize=s.length-o,f.vertexOffset=a,f.vertexSize=i.length/2-a,f.color=t.style,f.alpha=t.alpha,f.texture=c,f.geometryData=r,e.push(f)}function kp(t,e,r,i,n,s){const{vertices:o,uvs:a,indices:l}=s,u=t.shapePrimitives.length-1;t.shapePrimitives.forEach(({shape:h,transform:c},p)=>{var d;const f=l.length,m=o.length/2,g=[],x=ko[h.type];if(x.build(h,g),c&&Ri(g,c),i){const P=(d=h.closePath)!=null?d:!0;Ap(g,e,!1,P,o,2,m,l,f)}else if(r&&u===p){u!==0&&console.warn("[Pixi Graphics] only the last shape have be cut out");const P=[],C=g.slice();Zx(r.shapePath).forEach(B=>{P.push(C.length/2),C.push(...B)}),Co(C,P,o,2,m,l,f)}else x.triangulate(g,o,2,m,l,f);const v=a.length/2,y=e.texture;if(y!==A.WHITE){const P=e.matrix;c&&P.append(c.clone().invert()),_o(o,2,m,a,v,2,o.length/2-m,P)}else wo(a,v,2,o.length/2-m);const _=z.get(ki);_.indexOffset=f,_.indexSize=l.length-f,_.vertexOffset=m,_.vertexSize=o.length/2-m,_.color=e.color,_.alpha=e.alpha,_.texture=y,_.geometryData=s,n.push(_)})}function Zx(t){if(!t)return[];const e=t.shapePrimitives,r=[];for(let i=0;i<e.length;i++){const n=e[i].shape,s=[];ko[n.type].build(n,s),r.push(s)}return r}class Op{}class Fp{constructor(){this.geometry=new Os,this.instructions=new cn}init(){this.geometry.reset(),this.instructions.reset()}}class Oo{constructor(){this._activeBatchers=[],this._gpuContextHash={},this._graphicsDataContextHash=Object.create(null),this._needsContextNeedsRebuild=[]}prerender(){this._returnActiveBatchers()}getContextRenderData(e){return this._graphicsDataContextHash[e.uid]||this._initContextRenderData(e)}updateGpuContext(e){let r=this._gpuContextHash[e.uid]||this._initContext(e);if(e.dirty){r?this._cleanGraphicsContextData(e):r=this._initContext(e);const i=Rp(e);let n=0;const s=e.batchMode;let o=!0;if(e.customShader||s==="no-batch")o=!1;else if(s==="auto"){for(let a=0;a<i.length;a++)if(n+=i[a].vertexSize,n>400){o=!1;break}}r=this._gpuContextHash[e.uid]={isBatchable:o,batches:i},e.dirty=!1}return r}getGpuContext(e){return this._gpuContextHash[e.uid]||this._initContext(e)}_returnActiveBatchers(){for(let e=0;e<this._activeBatchers.length;e++)z.return(this._activeBatchers[e]);this._activeBatchers.length=0}_initContextRenderData(e){const r=z.get(Fp),i=this._gpuContextHash[e.uid].batches;let n=0,s=0;i.forEach(u=>{u.applyTransform=!1,n+=u.geometryData.vertices.length,s+=u.geometryData.indices.length});const o=z.get($s);this._activeBatchers.push(o),o.ensureAttributeBuffer(n),o.ensureIndexBuffer(s),o.begin();for(let u=0;u<i.length;u++){const h=i[u];o.add(h)}o.finish(r.instructions);const a=r.geometry;a.indexBuffer.data=o.indexBuffer,a.buffers[0].data=o.attributeBuffer.float32View,a.indexBuffer.update(o.indexSize*4),a.buffers[0].update(o.attributeSize*4);const l=o.batches;for(let u=0;u<l.length;u++){const h=l[u];h.bindGroup=yi(h.textures.textures,h.textures.count)}return this._graphicsDataContextHash[e.uid]=r,r}_initContext(e){const r=new Op;return this._gpuContextHash[e.uid]=r,e.on("update",this.onGraphicsContextUpdate,this),e.on("destroy",this.onGraphicsContextDestroy,this),this._gpuContextHash[e.uid]}onGraphicsContextUpdate(e){this._needsContextNeedsRebuild.push(e)}onGraphicsContextDestroy(e){this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null}_cleanGraphicsContextData(e){const r=this._gpuContextHash[e.uid];r.isBatchable||this._graphicsDataContextHash[e.uid]&&(z.return(this.getContextRenderData(e)),this._graphicsDataContextHash[e.uid]=null),r.batches&&r.batches.forEach(i=>{z.return(i)})}destroy(){for(const e of this._needsContextNeedsRebuild)this._cleanGraphicsContextData(e),this._gpuContextHash[e.uid]=null;this._needsContextNeedsRebuild.length=0}}Oo.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"graphicsContext"};function Qx(t,e,r,i){r[i++]=(t>>16&255)/255,r[i++]=(t>>8&255)/255,r[i++]=(t&255)/255,r[i++]=e}function Fo(t,e,r){e[r++]=(t&255)/255,e[r++]=(t>>8&255)/255,e[r++]=(t>>16&255)/255,e[r++]=(t>>24&255)/255}class Uo{constructor(e,r){this.state=Se.for2d(),this._renderableBatchesHash=Object.create(null),this.renderer=e,this._adaptor=r,this._adaptor.init()}validateRenderable(e){const r=e.view.context,i=!!this._renderableBatchesHash[e.uid],n=this.renderer.graphicsContext.updateGpuContext(r);return!!(n.isBatchable||i!==n.isBatchable)}addRenderable(e,r){const i=this.renderer.graphicsContext.updateGpuContext(e.view.context);e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e)),i.isBatchable?this._addToBatcher(e,r):(this.renderer.renderPipes.batch.break(r),r.add({type:"graphics",renderable:e}))}updateRenderable(e){const r=this._renderableBatchesHash[e.uid];if(r)for(let i=0;i<r.length;i++){const n=r[i];n.batcher.updateElement(n)}}destroyRenderable(e){this._removeBatchForRenderable(e.uid)}execute({renderable:e}){if(!e.isRenderable)return;const r=this.renderer,i=e.view.context;if(!r.graphicsContext.getGpuContext(i).batches.length)return;const n=i.customShader||this._adaptor.shader;this.state.blendMode=e.layerBlendMode;const s=n.resources.localUniforms.uniforms;s.uTransformMatrix=e.layerTransform,s.uRound=r._roundPixels|e.view.roundPixels,Fo(e.layerColor,s.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const r=!!this._renderableBatchesHash[e.uid],i=this.renderer.graphicsContext.updateGpuContext(e.view.context);r&&this._removeBatchForRenderable(e.uid),i.isBatchable&&this._initBatchesForRenderable(e),e.view.batched=i.isBatchable}_addToBatcher(e,r){const i=this.renderer.renderPipes.batch,n=this._getBatchesForRenderable(e);for(let s=0;s<n.length;s++){const o=n[s];i.addToBatch(o,r)}}_getBatchesForRenderable(e){return this._renderableBatchesHash[e.uid]||this._initBatchesForRenderable(e)}_initBatchesForRenderable(e){const r=e.view.context,i=this.renderer.graphicsContext.getGpuContext(r),n=this.renderer._roundPixels|e.view.roundPixels,s=i.batches.map(o=>{const a=z.get(ki);return o.copyTo(a),a.renderable=e,a.roundPixels=n,a});return this._renderableBatchesHash[e.uid]=s,e.on("destroyed",()=>{this.destroyRenderable(e)}),s}_removeBatchForRenderable(e){this._renderableBatchesHash[e].forEach(r=>{z.return(r)}),this._renderableBatchesHash[e]=null}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null;for(const e in this._renderableBatchesHash)this._removeBatchForRenderable(e);this._renderableBatchesHash=null}}Uo.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"graphics"};class Up{constructor(){this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.layerBlendMode}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null}packIndex(e,r,i){const n=this.renderable.view.geometry.indices;for(let s=0;s<n.length;s++)e[r++]=n[s]+i}packAttributes(e,r,i,n){const s=this.renderable,o=this.renderable.view.geometry,a=s.layerTransform,l=n<<16|this.roundPixels&65535,u=a.a,h=a.b,c=a.c,p=a.d,d=a.tx,f=a.ty,m=o.positions,g=o.uvs,x=s.layerColor;for(let v=0;v<m.length;v+=2){const y=m[v],_=m[v+1];e[i]=u*y+c*_+d,e[i+1]=h*y+p*_+f,e[i+2]=g[v],e[i+3]=g[v+1],r[i+4]=x,r[i+5]=l,i+=6}}get vertexSize(){return this.renderable.view.geometry.positions.length/2}get indexSize(){return this.renderable.view.geometry.indices.length}}class Io{constructor(e,r){this.localUniforms=new re({uTransformMatrix:{value:new k,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Be({0:this.localUniforms}),this._renderableHash=Object.create(null),this._gpuBatchableMeshHash=Object.create(null),this.renderer=e,this._adaptor=r,this._adaptor.init()}validateRenderable(e){const r=this._getRenderableData(e),i=r.batched,n=e.view.batched;if(r.batched=n,i!==n)return!0;if(n){const s=e.view._geometry;if(s.indices.length!==r.indexSize||s.positions.length!==r.vertexSize)return r.indexSize=s.indices.length,r.vertexSize=s.positions.length,!0;const o=this._getBatchableMesh(e),a=e.view.texture;if(o.texture._source!==a._source&&o.texture._source!==a._source)return o.batcher.checkAndUpdateTexture(o,a)}return!1}addRenderable(e,r){const i=this.renderer.renderPipes.batch,{batched:n}=this._getRenderableData(e);if(n){const s=this._getBatchableMesh(e);s.texture=e.view._texture,i.addToBatch(s)}else i.break(r),r.add({type:"mesh",renderable:e})}updateRenderable(e){if(e.view.batched){const r=this._gpuBatchableMeshHash[e.uid];r.texture=e.view._texture,r.batcher.updateElement(r)}}destroyRenderable(e){this._renderableHash[e.uid]=null;const r=this._gpuBatchableMeshHash[e.uid];z.return(r),this._gpuBatchableMeshHash[e.uid]=null}execute({renderable:e}){if(!e.isRenderable)return;const r=e.view;r.state.blendMode=e.layerBlendMode;const i=this.localUniforms;i.uniforms.uTransformMatrix=e.layerTransform,i.uniforms.uRound=this.renderer._roundPixels|e.view.roundPixels,i.update(),Fo(e.layerColor,i.uniforms.uColor,0),this._adaptor.execute(this,e)}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const r=e.view;return this._renderableHash[e.uid]={batched:r.batched,indexSize:r._geometry.indices.length,vertexSize:r._geometry.positions.length},e.on("destroyed",()=>{this.destroyRenderable(e)}),this._renderableHash[e.uid]}_getBatchableMesh(e){return this._gpuBatchableMeshHash[e.uid]||this._initBatchableMesh(e)}_initBatchableMesh(e){const r=z.get(Up);return r.renderable=e,r.texture=e.view._texture,r.roundPixels=this.renderer._roundPixels|e.view.roundPixels,this._gpuBatchableMeshHash[e.uid]=r,r.renderable=e,r}destroy(){for(const e in this._gpuBatchableMeshHash)this._gpuBatchableMeshHash[e]&&z.return(this._gpuBatchableMeshHash[e]);this._gpuBatchableMeshHash=null,this._renderableHash=null,this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Io.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"mesh"};class Gi{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.layerBlendMode}packAttributes(e,r,i,n){const s=this.renderable,o=this.texture,a=s.layerTransform,l=a.a,u=a.b,h=a.c,c=a.d,p=a.tx,d=a.ty,f=this.bounds,m=f[1],g=f[0],x=f[3],v=f[2],y=o._layout.uvs,_=s.layerColor,P=n<<16|this.roundPixels&65535;e[i+0]=l*g+h*v+p,e[i+1]=c*v+u*g+d,e[i+2]=y.x0,e[i+3]=y.y0,r[i+4]=_,r[i+5]=P,e[i+6]=l*m+h*v+p,e[i+7]=c*v+u*m+d,e[i+8]=y.x1,e[i+9]=y.y1,r[i+10]=_,r[i+11]=P,e[i+12]=l*m+h*x+p,e[i+13]=c*x+u*m+d,e[i+14]=y.x2,e[i+15]=y.y2,r[i+16]=_,r[i+17]=P,e[i+18]=l*g+h*x+p,e[i+19]=c*x+u*g+d,e[i+20]=y.x3,e[i+21]=y.y3,r[i+22]=_,r[i+23]=P}packIndex(e,r,i){e[r]=i+0,e[r+1]=i+1,e[r+2]=i+2,e[r+3]=i+0,e[r+4]=i+2,e[r+5]=i+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}let It;class Go{constructor(e){this._gpuSpriteHash=Object.create(null),this._renderer=e,It=this._gpuSpriteHash}addRenderable(e,r){const i=this._getGpuSprite(e);e.view._didUpdate&&this._updateBatchableSprite(e,i),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const r=It[e.uid];e.view._didUpdate&&this._updateBatchableSprite(e,r),r.batcher.updateElement(r)}validateRenderable(e){const r=e.view._texture,i=this._getGpuSprite(e);return i.texture._source!==r._source?!i.batcher.checkAndUpdateTexture(i,r):!1}destroyRenderable(e){const r=It[e.uid];z.return(r),It[e.uid]=null}_updateBatchableSprite(e,r){const i=e.view;i._didUpdate=!1,r.bounds=i.bounds,r.texture=i._texture}_getGpuSprite(e){return It[e.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const r=z.get(Gi);r.renderable=e;const i=e.view;return r.texture=i._texture,r.bounds=i.bounds,r.roundPixels=this._renderer._roundPixels|i.roundPixels,It[e.uid]=r,e.view._didUpdate=!1,e.on("destroyed",()=>{this.destroyRenderable(e)}),r}destroy(){for(const e in this._gpuSpriteHash)z.return(this._gpuSpriteHash[e]);this._gpuSpriteHash=null,this._renderer=null}}Go.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"sprite"};class $i extends ue{constructor({original:e,view:r}){super(),this.uid=q("renderable"),this.didViewUpdate=!1,this.view=r,e&&this.init(e)}init(e){this._original=e,this.layerTransform=e.layerTransform}get layerColor(){return this._original.layerColor}get layerBlendMode(){return this._original.layerBlendMode}get layerVisibleRenderable(){return this._original.layerVisibleRenderable}get isRenderable(){return this._original.isRenderable}}const Ip=new yt;class Pr{constructor(e){this.uid=q("meshView"),this.renderPipeId="mesh",this.canBundle=!0,this.owner=At,this.state=Se.for2d(),this.roundPixels=0;var r,i,n;this.shader=e.shader,this.texture=(n=(i=e.texture)!=null?i:(r=this.shader)==null?void 0:r.texture)!=null?n:A.WHITE,this._geometry=e.geometry,this._geometry.on("update",this.onUpdate,this)}set shader(e){this._shader!==e&&(this._shader=e,this.onUpdate())}get shader(){return this._shader}set geometry(e){var r;this._geometry!==e&&((r=this._geometry)==null||r.off("update",this.onUpdate,this),e.on("update",this.onUpdate,this),this._geometry=e,this.onUpdate())}get geometry(){return this._geometry}set texture(e){this._texture!==e&&(this.shader&&(this.shader.texture=e),this._texture=e,this.onUpdate())}get texture(){return this._texture}get batched(){return this._shader?!1:this._geometry.batchMode==="auto"?this._geometry.positions.length/2<=100:this._geometry.batchMode==="batch"}addBounds(e){e.addVertexData(this.geometry.positions,0,this.geometry.positions.length)}containsPoint(e){const{x:r,y:i}=e,n=this.geometry.getBuffer("aPosition").data,s=Ip.points,o=this.geometry.getIndex().data,a=o.length,l=this.geometry.topology==="triangle-strip"?3:1;for(let u=0;u+2<a;u+=l){const h=o[u]*2,c=o[u+1]*2,p=o[u+2]*2;if(s[0]=n[h],s[1]=n[h+1],s[2]=n[c],s[3]=n[c+1],s[4]=n[p],s[5]=n[p+1],Ip.contains(r,i))return!0}return!1}onUpdate(){this.owner.onViewUpdate()}destroy(e=!1){if(typeof e=="boolean"?e:e!=null&&e.texture){const r=typeof e=="boolean"?e:e==null?void 0:e.textureSource;this._texture.destroy(r)}this._texture=null,this._geometry=null,this._shader=null}}var Jx=Object.defineProperty,Gp=Object.getOwnPropertySymbols,e_=Object.prototype.hasOwnProperty,t_=Object.prototype.propertyIsEnumerable,$p=(t,e,r)=>e in t?Jx(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Lp=(t,e)=>{for(var r in e||(e={}))e_.call(e,r)&&$p(t,r,e[r]);if(Gp)for(var r of Gp(e))t_.call(e,r)&&$p(t,r,e[r]);return t};const Dp=class extends pi{constructor(...t){var e;let r=(e=t[0])!=null?e:{};r instanceof Float32Array&&(O(G,"use new MeshGeometry({ positions, uvs, indices }) instead"),r={positions:r,uvs:t[1],indices:t[2]}),r=Lp(Lp({},Dp.defaultOptions),r);const i=r.positions||new Float32Array([0,0,1,0,1,1,0,1]),n=r.uvs||new Float32Array([0,0,1,0,1,1,0,1]),s=r.indices||new Uint32Array([0,1,2,0,2,3]),o=new we({data:i,label:"attribute-mesh-positions",usage:N.VERTEX|N.COPY_DST}),a=new we({data:n,label:"attribute-mesh-uvs",usage:N.VERTEX|N.COPY_DST}),l=new we({data:s,label:"index-mesh-buffer",usage:N.INDEX|N.COPY_DST});super({attributes:{aPosition:{buffer:o,shaderLocation:0,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:a,shaderLocation:1,format:"float32x2",stride:2*4,offset:0}},indexBuffer:l,topology:r.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(t){this.attributes.aPosition.buffer.data=t}get uvs(){return this.attributes.aUV.buffer.data}set uvs(t){this.attributes.aUV.buffer.data=t}get indices(){return this.indexBuffer.data}set indices(t){this.indexBuffer.data=t}};let Gt=Dp;Gt.defaultOptions={topology:"triangle-list"};class $o extends Gt{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}const zp={name:"tiling-bit",vertex:{header:`
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
        `}},Np={name:"tiling-bit",vertex:{header:`
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
    
        `}};class Hp extends Ee{constructor(e){const r=Mt({name:"tiling-sprite-shader",bits:[Ot,zp,Rt]}),i=Bt({name:"tiling-sprite-shader",bits:[vr,Np,kt]}),n=new re({uMapCoord:{value:new k,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new k,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,200,.5,.5]),type:"vec4<f32>"}});super({glProgram:i,gpuProgram:r,resources:{tilingUniforms:n,uTexture:e.texture.source,uSampler:e.texture.source.style}})}get texture(){return this._texture}set texture(e){this._texture!==e&&(this._texture=e,this.resources.uTexture=e.source,this.resources.uSampler=e.source.style)}}const r_=new $o;class Lo{constructor(e){this._renderableHash=Object.create(null),this._gpuBatchedTilingSprite=Object.create(null),this._gpuTilingSprite=Object.create(null),this._renderer=e}validateRenderable(e){const r=e.view.texture.textureMatrix;let i=!1;const n=this._getRenderableData(e);return n.batched!==r.isSimple&&(n.batched=r.isSimple,i=!0),i}addRenderable(e,r){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:i}=this._getRenderableData(e);if(i){const n=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(n,r)}else{const n=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.addRenderable(n.meshRenderable,r)}}updateRenderable(e){e.view._didUpdate&&(e.view._didUpdate=!1,this._rebuild(e));const{batched:r}=this._getRenderableData(e);if(r){const i=this._getBatchedTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i)}else{const i=this._getGpuTilingSprite(e);this._renderer.renderPipes.mesh.updateRenderable(i.meshRenderable)}}destroyRenderable(e){this._renderableHash[e.uid]=null,this._gpuTilingSprite[e.uid]=null,this._gpuBatchedTilingSprite[e.uid]=null}_getRenderableData(e){return this._renderableHash[e.uid]||this._initRenderableData(e)}_initRenderableData(e){const r={batched:!0};return this._renderableHash[e.uid]=r,this.validateRenderable(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),r}_rebuild(e){const r=this._getRenderableData(e),i=e.view,n=i.texture.textureMatrix;if(r.batched){const s=this._getBatchedTilingSprite(e);s.view.texture=i.texture;const o=i.texture.source.style;o.addressMode!=="repeat"&&(o.addressMode="repeat",o.update()),this._updateBatchPositions(e),this._updateBatchUvs(e)}else{const s=this._getGpuTilingSprite(e),{meshRenderable:o}=s,a=o.view;a.shader.texture=i.texture;const l=a.shader.resources.tilingUniforms,u=i.width,h=i.height,c=i.texture.width,p=i.texture.height,d=i._tileTransform.matrix,f=l.uniforms.uTextureTransform;f.set(d.a*c/u,d.b*c/h,d.c*p/u,d.d*p/h,d.tx/u,d.ty/h),f.invert(),l.uniforms.uMapCoord=n.mapCoord,l.uniforms.uClampFrame=n.uClampFrame,l.uniforms.uClampOffset=n.uClampOffset,l.uniforms.uTextureTransform=f,l.uniforms.uSizeAnchor[0]=u,l.uniforms.uSizeAnchor[1]=h,l.uniforms.uSizeAnchor[2]=e.view.anchor.x,l.uniforms.uSizeAnchor[3]=e.view.anchor.y,l.update()}}_getGpuTilingSprite(e){return this._gpuTilingSprite[e.uid]||this._initGpuTilingSprite(e)}_initGpuTilingSprite(e){const r=e.view,i=r.texture.source.style;i.addressMode="repeat",i.update();const n=new Pr({geometry:r_,shader:new Hp({texture:r.texture})}),s=new $i({original:e,view:n}),o=new k,a={meshRenderable:s,textureMatrix:o};return this._gpuTilingSprite[e.uid]=a,a}_getBatchedTilingSprite(e){return this._gpuBatchedTilingSprite[e.uid]||this._initBatchedTilingSprite(e)}_initBatchedTilingSprite(e){const r=new Pr({geometry:new $o,texture:e.view.texture});r.roundPixels=this._renderer._roundPixels|e.view.roundPixels;const i=new $i({original:e,view:r});return this._gpuBatchedTilingSprite[e.uid]=i,i}_updateBatchPositions(e){const r=this._getBatchedTilingSprite(e),i=e.view,n=r.view.geometry.getBuffer("aPosition").data,s=i.anchor.x,o=i.anchor.y;n[0]=-s*i.width,n[1]=-o*i.height,n[2]=(1-s)*i.width,n[3]=-o*i.height,n[4]=(1-s)*i.width,n[5]=(1-o)*i.height,n[6]=-s*i.width,n[7]=(1-o)*i.height}_updateBatchUvs(e){const r=e.view,i=r.texture.frameWidth,n=r.texture.frameHeight,s=this._getBatchedTilingSprite(e).view.geometry.getBuffer("aUV").data;let o=0,a=0;r._applyAnchorToTexture&&(o=r.anchor.x,a=r.anchor.y),s[0]=s[6]=-o,s[2]=s[4]=1-o,s[1]=s[3]=-a,s[5]=s[7]=1-a;const l=k.shared;l.copyFrom(r._tileTransform.matrix),l.tx/=r.width,l.ty/=r.height,l.invert(),l.scale(r.width/i,r.height/n),jp(s,2,0,l)}destroy(){this._renderableHash=null,this._gpuTilingSprite=null,this._gpuBatchedTilingSprite=null,this._renderer=null}}Lo.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"tilingSprite"};function jp(t,e,r,i){let n=0;const s=t.length/(e||2),o=i.a,a=i.b,l=i.c,u=i.d,h=i.tx,c=i.ty;for(r*=e;n<s;){const p=t[r],d=t[r+1];t[r]=o*p+l*d+h,t[r+1]=a*p+u*d+c,r+=e,n++}}class Do{constructor(e){this.uid=q("graphicsView"),this.canBundle=!0,this.owner=At,this.renderPipeId="graphics",this.roundPixels=0,this._context=e||new je,this._context.on("update",this.onGraphicsContextUpdate,this)}set context(e){e!==this._context&&(this._context.off("update",this.onGraphicsContextUpdate,this),this._context=e,this._context.on("update",this.onGraphicsContextUpdate,this),this.onGraphicsContextUpdate())}get context(){return this._context}addBounds(e){e.addBounds(this._context.bounds)}containsPoint(e){return this._context.containsPoint(e)}onGraphicsContextUpdate(){this._didUpdate=!0,this.owner.onViewUpdate()}destroy(e=!1){this.owner=null,(typeof e=="boolean"?e:e!=null&&e.context)&&this._context.destroy(e),this._context=null}}const Wp={name:"local-uniform-msdf-bit",vertex:{header:`
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
        `}},Vp={name:"msdf-bit",fragment:{header:`
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
        `}},Yp={name:"msdf-bit",fragment:{header:`
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
        `}};class Xp extends Ee{constructor(){const e=new re({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new k,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}}),r=Mt({name:"sdf-shader",bits:[fi,mi(Te),Wp,Vp,Rt]}),i=Bt({name:"sdf-shader",bits:[gi,bi(Te),vr,Yp,kt]});super({glProgram:i,gpuProgram:r,resources:{localUniforms:e,batchSamplers:vi}})}}const qp=["_fontFamily","_fontStyle","_fontVariant","_fontWeight","_breakWords","_align","_leading","_letterSpacing","_lineHeight","_textBaseline","_whiteSpace","_wordWrap","_wordWrapWidth","_padding","_cssOverrides"];function zo(t){const e=[];let r=0;for(let i=0;i<qp.length;i++){const n=qp[i];e[r++]=t[n]}return r=Kp(t._fill,e,r),r=i_(t._stroke,e,r),e.join("-")}function Kp(t,e,r){var i;return t&&(e[r++]=t.color,e[r++]=t.alpha,e[r++]=(i=t.fill)==null?void 0:i.uid),r}function i_(t,e,r){return t&&(r=Kp(t,e,r),e[r++]=t.width,e[r++]=t.alignment,e[r++]=t.cap,e[r++]=t.join,e[r++]=t.miterLimit),r}var n_=Object.defineProperty,Zp=Object.getOwnPropertySymbols,s_=Object.prototype.hasOwnProperty,o_=Object.prototype.propertyIsEnumerable,Qp=(t,e,r)=>e in t?n_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Ar=(t,e)=>{for(var r in e||(e={}))s_.call(e,r)&&Qp(t,r,e[r]);if(Zp)for(var r of Zp(e))o_.call(e,r)&&Qp(t,r,e[r]);return t};const $t=class extends ue{constructor(t={}){super(),a_(t);const e=Ar(Ar({},$t.defaultTextStyle),t);for(const r in $t.defaultTextStyle){const i=r;this[i]=e[r]}this.dropShadow=null,typeof e.fill=="string"?this.fontSize=parseInt(e.fontSize,10):this.fontSize=e.fontSize,t.dropShadow&&(t.dropShadow instanceof Boolean?t.dropShadow===!0&&(this.dropShadow=Ar({},$t.defaultTextStyle.dropShadow)):this.dropShadow=Ar(Ar({},$t.defaultTextStyle.dropShadow),t.dropShadow)),this.update()}get align(){return this._align}set align(t){this._align=t,this.update()}get breakWords(){return this._breakWords}set breakWords(t){this._breakWords=t,this.update()}get dropShadow(){return this._dropShadow}set dropShadow(t){this._dropShadow=t,this.update()}get fontFamily(){return this._fontFamily}set fontFamily(t){this._fontFamily=t,this.update()}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t,this.update()}get fontStyle(){return this._fontStyle}set fontStyle(t){this._fontStyle=t,this.update()}get fontVariant(){return this._fontVariant}set fontVariant(t){this._fontVariant=t,this.update()}get fontWeight(){return this._fontWeight}set fontWeight(t){this._fontWeight=t,this.update()}get leading(){return this._leading}set leading(t){this._leading=t,this.update()}get letterSpacing(){return this._letterSpacing}set letterSpacing(t){this._letterSpacing=t,this.update()}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update()}get padding(){return this._padding}set padding(t){this._padding=t,this.update()}get textBaseline(){return this._textBaseline}set textBaseline(t){this._textBaseline=t,this.update()}get whiteSpace(){return this._whiteSpace}set whiteSpace(t){this._whiteSpace=t,this.update()}get wordWrap(){return this._wordWrap}set wordWrap(t){this._wordWrap=t,this.update()}get wordWrapWidth(){return this._wordWrapWidth}set wordWrapWidth(t){this._wordWrapWidth=t,this.update()}get fill(){return this._originalFill}set fill(t){t!==this._originalFill&&(this._originalFill=t,this._fill=ht(t,je.defaultFillStyle),this.update())}get stroke(){return this._originalStroke}set stroke(t){t!==this._originalFill&&(this._originalFill=t,this._stroke=ht(t,je.defaultStrokeStyle),this.update())}_generateKey(){return this._styleKey=zo(this),this._styleKey}update(){this._styleKey=null,this.emit("update",this)}get styleKey(){return this._styleKey||this._generateKey()}clone(){return new $t({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,leading:this.leading,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,textBaseline:this.textBaseline,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth})}destroy(t=!1){var e,r,i,n;if(this.removeAllListeners(),typeof t=="boolean"?t:t==null?void 0:t.texture){const s=typeof t=="boolean"?t:t==null?void 0:t.textureSource;(e=this._fill)!=null&&e.texture&&this._fill.texture.destroy(s),(r=this._originalFill)!=null&&r.texture&&this._originalFill.texture.destroy(s),(i=this._stroke)!=null&&i.texture&&this._stroke.texture.destroy(s),(n=this._originalStroke)!=null&&n.texture&&this._originalStroke.texture.destroy(s)}this._fill=null,this._stroke=null,this.dropShadow=null,this._originalStroke=null,this._originalFill=null}};let vt=$t;vt.defaultTextStyle={align:"left",breakWords:!1,dropShadow:{alpha:1,angle:Math.PI/6,blur:0,color:"black",distance:5},fill:"black",fontFamily:"Arial",fontSize:26,fontStyle:"normal",fontVariant:"normal",fontWeight:"normal",leading:0,letterSpacing:0,lineHeight:0,padding:0,stroke:null,textBaseline:"alphabetic",trim:!1,whiteSpace:"pre",wordWrap:!1,wordWrapWidth:100};function a_(t){var e,r;const i=t;if(typeof i.dropShadow=="boolean"&&(O(G,"dropShadow is now an object, not a boolean"),t.dropShadow={alpha:(e=i.dropShadowAlpha)!=null?e:1,angle:i.dropShadowAngle,blur:(r=i.dropShadowBlur)!=null?r:0,color:i.dropShadowColor,distance:i.dropShadowDistance}),i.strokeThickness){O(G,"strokeThickness is now a part of stroke");const n=i.stroke;t.stroke={color:n,width:i.strokeThickness}}if(Array.isArray(i.fill)){O(G,"gradient fill is now a fill pattern: `new FillGradient(...)`");const n=new ir(0,0,0,t.fontSize*1.7),s=i.fill.map(o=>H.shared.setValue(o).toNumber());s.forEach((o,a)=>{var l;const u=(l=i.fillGradientStops[a])!=null?l:a/s.length;n.addColorStop(u,o)}),t.fill={fill:n}}}class Jp{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,r){const i=j.get().createCanvas();i.width=e,i.height=r;const n=i.getContext("2d");return{canvas:i,context:n}}getOptimalCanvasAndContext(e,r,i=1){e=Math.ceil(e*i-1e-6),r=Math.ceil(r*i-1e-6),e=pt(e),r=pt(r);const n=(e<<17)+(r<<1);this._canvasPool[n]||(this._canvasPool[n]=[]);let s=this._canvasPool[n].pop();return s||(s=this._createCanvasAndContext(e,r)),s}returnCanvasAndContext(e){const{width:r,height:i}=e.canvas,n=(r<<17)+(i<<1);this._canvasPool[n].push(e)}clear(){this._canvasPool={}}}const ze=new Jp,l_=["serif","sans-serif","monospace","cursive","fantasy","system-ui"];function Er(t){const e=typeof t.fontSize=="number"?`${t.fontSize}px`:t.fontSize;let r=t.fontFamily;Array.isArray(t.fontFamily)||(r=t.fontFamily.split(","));for(let i=r.length-1;i>=0;i--){let n=r[i].trim();!/([\"\'])[^\'\"]+\1/.test(n)&&!l_.includes(n)&&(n=`"${n}"`),r[i]=n}return`${t.fontStyle} ${t.fontVariant} ${t.fontWeight} ${e} ${r.join(",")}`}const No={willReadFrequently:!0},M=class{static get experimentalLetterSpacingSupported(){let t=M._experimentalLetterSpacingSupported;if(t!==void 0){const e=j.get().getCanvasRenderingContext2D().prototype;t=M._experimentalLetterSpacingSupported="letterSpacing"in e||"textLetterSpacing"in e}return t}constructor(t,e,r,i,n,s,o,a,l){this.text=t,this.style=e,this.width=r,this.height=i,this.lines=n,this.lineWidths=s,this.lineHeight=o,this.maxLineWidth=a,this.fontProperties=l}static measureText(t=" ",e,r=M._canvas,i=e.wordWrap){var n;const s=`${t}:${e.styleKey}`;if(M._measurementCache[s])return M._measurementCache[s];const o=Er(e),a=M.measureFont(o);a.fontSize===0&&(a.fontSize=e.fontSize,a.ascent=e.fontSize);const l=M.__context;l.font=o;const u=(i?M._wordWrap(t,e,r):t).split(/(?:\r\n|\r|\n)/),h=new Array(u.length);let c=0;for(let g=0;g<u.length;g++){const x=M._measureText(u[g],e.letterSpacing,l);h[g]=x,c=Math.max(c,x)}const p=((n=e._stroke)==null?void 0:n.width)||0;let d=c+p;e.dropShadow&&(d+=e.dropShadow.distance);const f=e.lineHeight||a.fontSize+p;let m=Math.max(f,a.fontSize+p*2)+(u.length-1)*(f+e.leading);return e.dropShadow&&(m+=e.dropShadow.distance),new M(t,e,d,m,u,h,f+e.leading,c,a)}static _measureText(t,e,r){let i=!1;M.experimentalLetterSpacingSupported&&(M.experimentalLetterSpacing?(r.letterSpacing=`${e}px`,r.textLetterSpacing=`${e}px`,i=!0):(r.letterSpacing="0px",r.textLetterSpacing="0px"));let n=r.measureText(t).width;return n>0&&(i?n-=e:n+=(M.graphemeSegmenter(t).length-1)*e),n}static _wordWrap(t,e,r=M._canvas){const i=r.getContext("2d",No);let n=0,s="",o="";const a=Object.create(null),{letterSpacing:l,whiteSpace:u}=e,h=M._collapseSpaces(u),c=M._collapseNewlines(u);let p=!h;const d=e.wordWrapWidth+l,f=M._tokenize(t);for(let m=0;m<f.length;m++){let g=f[m];if(M._isNewline(g)){if(!c){o+=M._addLine(s),p=!h,s="",n=0;continue}g=" "}if(h){const v=M.isBreakingSpace(g),y=M.isBreakingSpace(s[s.length-1]);if(v&&y)continue}const x=M._getFromCache(g,l,a,i);if(x>d)if(s!==""&&(o+=M._addLine(s),s="",n=0),M.canBreakWords(g,e.breakWords)){const v=M.wordWrapSplit(g);for(let y=0;y<v.length;y++){let _=v[y],P=_,C=1;for(;v[y+C];){const S=v[y+C];if(!M.canBreakChars(P,S,g,y,e.breakWords))_+=S;else break;P=S,C++}y+=C-1;const B=M._getFromCache(_,l,a,i);B+n>d&&(o+=M._addLine(s),p=!1,s="",n=0),s+=_,n+=B}}else{s.length>0&&(o+=M._addLine(s),s="",n=0);const v=m===f.length-1;o+=M._addLine(g,!v),p=!1,s="",n=0}else x+n>d&&(p=!1,o+=M._addLine(s),s="",n=0),(s.length>0||!M.isBreakingSpace(g)||p)&&(s+=g,n+=x)}return o+=M._addLine(s,!1),o}static _addLine(t,e=!0){return t=M._trimRight(t),t=e?`${t}
`:t,t}static _getFromCache(t,e,r,i){let n=r[t];return typeof n!="number"&&(n=M._measureText(t,e,i)+e,r[t]=n),n}static _collapseSpaces(t){return t==="normal"||t==="pre-line"}static _collapseNewlines(t){return t==="normal"}static _trimRight(t){if(typeof t!="string")return"";for(let e=t.length-1;e>=0;e--){const r=t[e];if(!M.isBreakingSpace(r))break;t=t.slice(0,-1)}return t}static _isNewline(t){return typeof t!="string"?!1:M._newlines.includes(t.charCodeAt(0))}static isBreakingSpace(t,e){return typeof t!="string"?!1:M._breakingSpaces.includes(t.charCodeAt(0))}static _tokenize(t){const e=[];let r="";if(typeof t!="string")return e;for(let i=0;i<t.length;i++){const n=t[i],s=t[i+1];if(M.isBreakingSpace(n,s)||M._isNewline(n)){r!==""&&(e.push(r),r=""),e.push(n);continue}r+=n}return r!==""&&e.push(r),e}static canBreakWords(t,e){return e}static canBreakChars(t,e,r,i,n){return!0}static wordWrapSplit(t){return M.graphemeSegmenter(t)}static measureFont(t){if(M._fonts[t])return M._fonts[t];const e=M._context;e.font=t;const r=e.measureText(M.METRICS_STRING+M.BASELINE_SYMBOL),i={ascent:r.actualBoundingBoxAscent,descent:r.actualBoundingBoxDescent,fontSize:r.actualBoundingBoxAscent+r.actualBoundingBoxDescent};return M._fonts[t]=i,i}static clearMetrics(t=""){t?delete M._fonts[t]:M._fonts={}}static get _canvas(){if(!M.__canvas){let t;try{const e=new OffscreenCanvas(0,0),r=e.getContext("2d",No);if(r!=null&&r.measureText)return M.__canvas=e,e;t=j.get().createCanvas()}catch(e){t=j.get().createCanvas()}t.width=t.height=10,M.__canvas=t}return M.__canvas}static get _context(){return M.__context||(M.__context=M._canvas.getContext("2d",No)),M.__context}};let ie=M;ie.METRICS_STRING="|\xC9q\xC5",ie.BASELINE_SYMBOL="M",ie.BASELINE_MULTIPLIER=1.4,ie.HEIGHT_MULTIPLIER=2,ie.graphemeSegmenter=(()=>{if(typeof(Intl==null?void 0:Intl.Segmenter)=="function"){const t=new Intl.Segmenter;return e=>[...t.segment(e)].map(r=>r.segment)}return t=>[...t]})(),ie.experimentalLetterSpacing=!1,ie._fonts={},ie._newlines=[10,13],ie._breakingSpaces=[9,32,8192,8193,8194,8195,8196,8197,8198,8200,8201,8202,8287,12288],ie._measurementCache={};function Cr(t,e){if(t.texture===A.WHITE&&!t.fill)return H.shared.setValue(t.color).toHex();if(t.fill){if(t.fill instanceof Ln){const r=t.fill,i=e.createPattern(r.texture.source.resource,"repeat"),n=r.transform.copyTo(k.shared);return n.scale(r.texture.frameWidth,r.texture.frameHeight),i.setTransform(n),i}else if(t.fill instanceof ir){const r=t.fill;if(r.type==="linear"){const i=e.createLinearGradient(r.x0,r.y0,r.x1,r.y1);return r.gradientStops.forEach(n=>{i.addColorStop(n.offset,H.shared.setValue(n.color).toHex())}),i}}}else{const r=e.createPattern(t.texture.source.resource,"repeat"),i=t.matrix.copyTo(k.shared);return i.scale(t.texture.frameWidth,t.texture.frameHeight),r.setTransform(i),r}return"red"}function Ho(t){if(t==="")return[];typeof t=="string"&&(t=[t]);const e=[];for(let r=0,i=t.length;r<i;r++){const n=t[r];if(Array.isArray(n)){if(n.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${n.length}.`);if(n[0].length===0||n[1].length===0)throw new Error("[BitmapFont]: Invalid character delimiter.");const s=n[0].charCodeAt(0),o=n[1].charCodeAt(0);if(o<s)throw new Error("[BitmapFont]: Invalid character range.");for(let a=s,l=o;a<=l;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(n))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}class Li extends An{constructor(e){var r,i,n;super(),this.resolution=1,this.pages=[],this._padding=4,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentPageIndex=-1,this._skipKerning=!1;const s=e,o=s.style.clone();o.fontSize=this.baseMeasurementFontSize,s.overrideFill&&(o._fill.color=16777215,o._fill.alpha=1,o._fill.texture=A.WHITE,o._fill.fill=null),this._style=o,this._skipKerning=(r=s.skipKerning)!=null?r:!1,this.resolution=(i=s.resolution)!=null?i:1,this._padding=(n=s.padding)!=null?n:4;const a=Er(o),l=this;l.fontMetrics=ie.measureFont(a),l.lineHeight=o.lineHeight||this.fontMetrics.fontSize||o.fontSize}ensureCharacters(e){var r,i,n,s;const o=Ho(e).filter(y=>!this._currentChars.includes(y)).filter((y,_,P)=>P.indexOf(y)===_);if(!o.length)return;this._currentChars=[...this._currentChars,...o];let a;this._currentPageIndex===-1?a=this._nextPage():a=this.pages[this._currentPageIndex];let{canvas:l,context:u}=a.canvasAndContext,h=a.texture.source;const c=this._style;let p=this._currentX,d=this._currentY;const f=this.baseRenderedFontSize/this.baseMeasurementFontSize,m=this._padding*f,g=c.fontStyle==="italic"?2:1;let x=0,v=!1;for(let y=0;y<o.length;y++){const _=o[y],P=ie.measureText(_,c,l,!1),C=g*P.width*f,B=P.height*f,S=C+m*2,w=B+m*2;if(v=!1,_!==`
`&&_!=="\r"&&_!=="	"&&_!==" "&&(v=!0,x=Math.ceil(Math.max(w,x))),p+S>512&&(d+=x,x=w,p=0,d+x>512)){h.update();const L=this._nextPage();l=L.canvasAndContext.canvas,u=L.canvasAndContext.context,h=L.texture.source,d=0}const T=C/f-((i=(r=c.dropShadow)==null?void 0:r.distance)!=null?i:0)-((s=(n=c._stroke)==null?void 0:n.width)!=null?s:0);if(this.chars[_]={id:_.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:T,kerning:{}},v){this._drawGlyph(u,P,p+m,d+m,f,c);const L=h.width*f,$=h.height*f,R=new Q(p/L,d/$,S/L,w/$);this.chars[_].texture=new A({source:h,layout:{frame:R}}),p+=Math.ceil(S)}}h.update(),this._currentX=p,this._currentY=d,this._skipKerning&&this._applyKerning(o,u)}get pageTextures(){return O(G,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,r){const i=this._measureCache;for(let n=0;n<e.length;n++){const s=e[n];for(let o=0;o<this._currentChars.length;o++){const a=this._currentChars[o];let l=i[s];l||(l=i[s]=r.measureText(s).width);let u=i[a];u||(u=i[a]=r.measureText(a).width);let h=r.measureText(s+a).width,c=h-(l+u);c&&(this.chars[s].kerning[a]=c),h=r.measureText(s+a).width,c=h-(l+u),c&&(this.chars[a].kerning[s]=c)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,r=ze.getOptimalCanvasAndContext(512,512,e);this._setupContext(r.context,this._style,e);const i=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),n=new A({source:new at({resource:r.canvas,resolution:i,alphaMode:"premultiply-alpha-on-upload"})}),s={canvasAndContext:r,texture:n};return this.pages[this._currentPageIndex]=s,s}_setupContext(e,r,i){var n;r.fontSize=this.baseRenderedFontSize,e.scale(i,i),e.font=Er(r),r.fontSize=this.baseMeasurementFontSize,e.textBaseline=r.textBaseline;const s=r._stroke,o=(n=s==null?void 0:s.width)!=null?n:0;if(s&&(e.lineWidth=o,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=Cr(s,e)),r._fill&&(e.fillStyle=Cr(r._fill,e)),r.dropShadow){const a=r.dropShadow,l=H.shared.setValue(a.color).toArray(),u=a.blur*i,h=a.distance*i;e.shadowColor=`rgba(${l[0]*255},${l[1]*255},${l[2]*255},${a.alpha})`,e.shadowBlur=u,e.shadowOffsetX=Math.cos(a.angle)*h,e.shadowOffsetY=Math.sin(a.angle)*h}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,r,i,n,s,o){var a;const l=r.text,u=r.fontProperties,h=o._stroke,c=((a=h==null?void 0:h.width)!=null?a:0)*s,p=i+c/2,d=n-c/2,f=u.descent*s,m=r.lineHeight*s;o.stroke&&c&&e.strokeText(l,p,d+m-f),o._fill&&e.fillText(l,p,d+m-f)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:r,texture:i}=this.pages[e];ze.returnCanvasAndContext(r),i.destroy(!0)}this.pages=null}}function jo(t,e,r){const i={width:0,height:0,offsetY:0,scale:e.fontSize/r.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};i.offsetY=r.baseLineOffset;let n=i.lines[0],s=null,o=!0;const a={spaceWord:!1,width:0,start:0,index:0,positions:[],chars:[]},l=d=>{const f=n.width;for(let m=0;m<a.index;m++){const g=d.positions[m];n.chars.push(d.chars[m]),n.charPositions.push(g+f)}n.width+=d.width,o=!1,a.width=0,a.index=0,a.chars.length=0},u=()=>{let d=n.chars.length-1,f=n.chars[d];for(;f===" ";)n.width-=r.chars[f].xAdvance,f=n.chars[--d];i.width=Math.max(i.width,n.width),n={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},o=!0,i.lines.push(n),i.height+=r.lineHeight},h=r.baseMeasurementFontSize/e.fontSize,c=e.letterSpacing*h,p=e.wordWrapWidth*h;for(let d=0;d<t.length+1;d++){let f;const m=d===t.length;m||(f=t[d]);const g=r.chars[f];if(/(?:\s)/.test(f)||f==="\r"||f===`
`||m){if(!o&&e.wordWrap&&n.width+a.width-c>p?(u(),l(a),m||n.charPositions.push(0)):(a.start=n.width,l(a),m||n.charPositions.push(0)),f==="\r"||f===`
`)n.width!==0&&u();else if(!m){const x=g.xAdvance+(g.kerning[s]||0)+c;n.width+=x,n.spaceWidth=x,n.spacesIndex.push(n.charPositions.length),n.chars.push(f)}}else{const x=g.kerning[s]||0,v=g.xAdvance+x+c;a.positions[a.index++]=a.width+x,a.chars.push(f),a.width+=v}s=f}return u(),e.align==="center"?u_(i):e.align==="right"?h_(i):e.align==="justify"&&c_(i),i}function u_(t){for(let e=0;e<t.lines.length;e++){const r=t.lines[e],i=t.width/2-r.width/2;for(let n=0;n<r.charPositions.length;n++)r.charPositions[n]+=i}}function h_(t){for(let e=0;e<t.lines.length;e++){const r=t.lines[e],i=t.width-r.width;for(let n=0;n<r.charPositions.length;n++)r.charPositions[n]+=i}}function c_(t){const e=t.width;for(let r=0;r<t.lines.length;r++){const i=t.lines[r];let n=0,s=i.spacesIndex[n++],o=0;const a=i.spacesIndex.length,l=(e-i.width)/a;for(let u=0;u<i.charPositions.length;u++)u===s&&(s=i.spacesIndex[n++],o+=l),i.charPositions[u]+=o}}var d_=Object.defineProperty,ef=Object.getOwnPropertySymbols,p_=Object.prototype.hasOwnProperty,f_=Object.prototype.propertyIsEnumerable,tf=(t,e,r)=>e in t?d_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Wo=(t,e)=>{for(var r in e||(e={}))p_.call(e,r)&&tf(t,r,e[r]);if(ef)for(var r of ef(e))f_.call(e,r)&&tf(t,r,e[r]);return t};class g_{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1}}getFont(e,r){var i;let n=r.fontFamily,s=!0;r._fill.fill&&(n+=r._fill.fill.uid,s=!1),Z.has(n)||Z.set(n,new Li(Wo({style:r,overrideFill:s},this.defaultOptions)));const o=Z.get(n);return(i=o.ensureCharacters)==null||i.call(o,e),o}getLayout(e,r){const i=this.getFont(e,r);return jo(e.split(""),r,i)}measureText(e,r){return this.getLayout(e,r)}install(e,r,i){if(!e)throw new Error("[BitmapFontManager] Property `name` is required.");i=Wo(Wo({},this.defaultOptions),i);const n=r instanceof vt?r:new vt(r),s=n._fill.fill!==null&&n._fill.fill!==void 0,o=new Li({style:n,overrideFill:s,skipKerning:i.skipKerning,padding:i.padding,resolution:i.resolution}),a=Ho(i.chars);return o.ensureCharacters(a.join("")),Z.set(e,o),o}}const Vo=new g_;class m_ extends $i{constructor(){super({view:new Do})}}class Yo{constructor(e){this._gpuBitmapText={},this._renderer=e}validateRenderable(e){const r=this._getGpuBitmapText(e);return e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,r.view.context)),this._renderer.renderPipes.graphics.validateRenderable(r)}addRenderable(e,r){const i=this._getGpuBitmapText(e);e.view._didUpdate&&(e.view._didUpdate=!1,this._updateContext(e,i.view.context)),this._renderer.renderPipes.graphics.addRenderable(i,r),i.view.context.customShader&&this._updateDistanceField(e)}destroyRenderable(e){this._destroyRenderableByUid(e.uid)}_destroyRenderableByUid(e){z.return(this._gpuBitmapText[e]),this._gpuBitmapText[e]=null}updateRenderable(e){const r=this._getGpuBitmapText(e);this._renderer.renderPipes.graphics.updateRenderable(r),r.view.context.customShader&&this._updateDistanceField(e)}_updateContext(e,r){var i;const n=e.view,s=Vo.getFont(n.text,n._style);r.clear(),s.distanceField.type!=="none"&&(r.customShader||(this._sdfShader||(this._sdfShader=new Xp),r.customShader=this._sdfShader));const o=Array.from(n.text),a=n._style;let l=(((i=a._stroke)==null?void 0:i.width)||0)/2;l+=s.baseLineOffset;const u=jo(o,a,s);let h=0;const c=a.padding,p=u.scale;r.translate(-n.anchor._x*u.width-c,-n.anchor._y*(u.height+u.offsetY)-c).scale(p,p);const d=a._fill.color;for(let f=0;f<u.lines.length;f++){const m=u.lines[f];for(let g=0;g<m.charPositions.length;g++){const x=o[h++],v=s.chars[x];v!=null&&v.texture&&r.texture(v.texture,d,Math.round(m.charPositions[g]+v.xOffset),Math.round(l+v.yOffset))}l+=s.lineHeight}}_getGpuBitmapText(e){return this._gpuBitmapText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const r=z.get(m_,e);return this._gpuBitmapText[e.uid]=r,r.view.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._updateContext(e,r.view.context),e.on("destroyed",()=>{this.destroyRenderable(e)}),this._gpuBitmapText[e.uid]}_updateDistanceField(e){var r;const i=this._getGpuBitmapText(e).view.context,n=e.view,s=n._style.fontFamily,o=Z.get(s),{a,b:l,c:u,d:h}=e.layerTransform,c=Math.sqrt(a*a+l*l),p=Math.sqrt(u*u+h*h),d=(Math.abs(c)+Math.abs(p))/2,f=o.baseRenderedFontSize/n._style.fontSize,m=(r=n.resolution)!=null?r:this._renderer.resolution,g=d*o.distanceField.range*(1/f)*m;i.customShader.resources.localUniforms.uniforms.uDistance=g}destroy(){var e;for(const r in this._gpuBitmapText)this._destroyRenderableByUid(r);this._gpuBitmapText=null,(e=this._sdfShader)==null||e.destroy(!0),this._sdfShader=null,this._renderer=null}}Yo.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"bitmapText"};class Xo{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){var r;const i=this._getGpuText(e),n=e.view._getKey();if(i.currentKey!==n){const s=e.view,o=(r=s.resolution)!=null?r:this._renderer.resolution,{width:a,height:l}=this._renderer.canvasText.getTextureSize(s.text,o,s._style);return!(this._renderer.canvasText.getReferenceCount(i.currentKey)===1&&a===i.texture._source.width&&l===i.texture._source.height)}return!1}addRenderable(e,r){const i=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(i)}updateRenderable(e){const r=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),r.batcher.updateElement(r)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const r=this._gpuText[e];this._renderer.canvasText.decreaseReferenceCount(r.currentKey),z.return(r.batchableSprite),this._gpuText[e]=null}_updateText(e){const r=e.view._getKey(),i=this._getGpuText(e),n=i.batchableSprite;i.currentKey!==r&&this._updateGpuText(e),e.view._didUpdate=!1;const s=e.view._style.padding;ur(n.bounds,e.view.anchor,n.texture,s)}_updateGpuText(e){var r;const i=this._getGpuText(e),n=i.batchableSprite,s=e.view;i.texture&&this._renderer.canvasText.decreaseReferenceCount(i.currentKey);const o=(r=s.resolution)!=null?r:this._renderer.resolution;i.texture=n.texture=this._renderer.canvasText.getTexture(s.text,o,s._style,s._getKey()),i.currentKey=s._getKey(),n.texture=i.texture}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const r={texture:null,currentKey:"--",batchableSprite:z.get(Gi)};return r.batchableSprite.renderable=e,r.batchableSprite.bounds=[0,1,0,0],r.batchableSprite.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._gpuText[e.uid]=r,this._updateText(e),e.on("destroyed",()=>{this.destroyRenderable(e)}),r}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}Xo.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"text"};const b_=new pe;function qo(t,e,r,i){const n=b_;n.minX=0,n.minY=0,n.maxX=t.width/i|0,n.maxY=t.height/i|0;const s=le.getOptimalTexture(n.width,n.height,i,!1);return s.source.uploadMethodId="image",s.source.resource=t,s.source.alphaMode="premultiply-alpha-on-upload",s.frameWidth=e/i,s.frameHeight=r/i,s.source.update(),s.layout.updateUvs(),s}class Ko{constructor(){this._activeTextures={}}getTextureSize(e,r,i){const n=ie.measureText(e||" ",i);let s=Math.ceil(Math.ceil(Math.max(1,n.width)+i.padding*2)*r),o=Math.ceil(Math.ceil(Math.max(1,n.height)+i.padding*2)*r);return s=Math.ceil(s-1e-6),o=Math.ceil(o-1e-6),s=pt(s),o=pt(o),{width:s,height:o}}getTexture(e,r,i,n){if(this._activeTextures[n])return this._increaseReferenceCount(n),this._activeTextures[n].texture;const s=ie.measureText(e||" ",i),o=Math.ceil(Math.ceil(Math.max(1,s.width)+i.padding*2)*r),a=Math.ceil(Math.ceil(Math.max(1,s.height)+i.padding*2)*r),l=ze.getOptimalCanvasAndContext(o,a),{canvas:u}=l;this.renderTextToCanvas(e,i,r,l);const h=qo(u,o,a,r);return this._activeTextures[n]={canvasAndContext:l,texture:h,usageCount:1},h}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const r=this._activeTextures[e];if(r.usageCount--,r.usageCount===0){ze.returnCanvasAndContext(r.canvasAndContext),le.returnTexture(r.texture);const i=r.texture.source;i.resource=null,i.uploadMethodId="unknown",i.alphaMode="no-premultiply-alpha",this._activeTextures[e]=null}}getReferenceCount(e){return this._activeTextures[e].usageCount}renderTextToCanvas(e,r,i,n){var s,o,a,l,u,h;const{canvas:c,context:p}=n,d=Er(r),f=ie.measureText(e||" ",r),m=f.lines,g=f.lineHeight,x=f.lineWidths,v=f.maxLineWidth,y=f.fontProperties,_=c.height;if(p.resetTransform(),p.scale(i,i),p.clearRect(0,0,f.width+4,f.height+4),(s=r._stroke)!=null&&s.width){const S=r._stroke;p.lineWidth=S.width,p.miterLimit=S.miterLimit,p.lineJoin=S.join,p.lineCap=S.cap}p.font=d;let P,C;const B=r.dropShadow?2:1;for(let S=0;S<B;++S){const w=r.dropShadow&&S===0,T=w?Math.ceil(Math.max(1,_)+r.padding*2):0,L=T*i;if(w){p.fillStyle="black",p.strokeStyle="black";const E=r.dropShadow,K=E.color,ee=E.alpha;p.shadowColor=H.shared.setValue(K).setAlpha(ee).toRgbaString();const fe=E.blur*i,Nt=E.distance*i;p.shadowBlur=fe,p.shadowOffsetX=Math.cos(E.angle)*Nt,p.shadowOffsetY=Math.sin(E.angle)*Nt+L}else p.globalAlpha=(a=(o=r._fill)==null?void 0:o.alpha)!=null?a:1,p.fillStyle=r._fill?Cr(r._fill,p):null,(l=r._stroke)!=null&&l.width&&(p.strokeStyle=Cr(r._stroke,p)),p.shadowColor="black";let $=(g-y.fontSize)/2;g-y.fontSize<0&&($=0);const R=(h=(u=r._stroke)==null?void 0:u.width)!=null?h:0;for(let E=0;E<m.length;E++)P=R/2,C=R/2+E*g+y.ascent+$,r.align==="right"?P+=v-x[E]:r.align==="center"&&(P+=(v-x[E])/2),r._stroke&&this._drawLetterSpacing(m[E],r,n,P+r.padding,C+r.padding-T,!0),r._fill!==void 0&&this._drawLetterSpacing(m[E],r,n,P+r.padding,C+r.padding-T)}}_drawLetterSpacing(e,r,i,n,s,o=!1){const{context:a}=i,l=r.letterSpacing;let u=!1;if(ie.experimentalLetterSpacingSupported&&(ie.experimentalLetterSpacing?(a.letterSpacing=`${l}px`,a.textLetterSpacing=`${l}px`,u=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),l===0||u){o?a.strokeText(e,n,s):a.fillText(e,n,s);return}let h=n;const c=ie.graphemeSegmenter(e);let p=a.measureText(e).width,d=0;for(let f=0;f<c.length;++f){const m=c[f];o?a.strokeText(m,h,s):a.fillText(m,h,s);let g="";for(let x=f+1;x<c.length;++x)g+=c[x];d=a.measureText(g).width,h+=p-d+l,p=d}}destroy(){this._activeTextures=null}}Ko.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"canvasText"};class Zo{constructor(e){this._gpuText=Object.create(null),this._renderer=e}validateRenderable(e){const r=this._getGpuText(e),i=e.view._getKey();return r.textureNeedsUploading?(r.textureNeedsUploading=!1,!0):r.currentKey!==i}addRenderable(e){const r=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),this._renderer.renderPipes.batch.addToBatch(r)}updateRenderable(e){const r=this._getGpuText(e).batchableSprite;e.view._didUpdate&&this._updateText(e),r.batcher.updateElement(r)}destroyRenderable(e){this._destroyRenderableById(e.uid)}_destroyRenderableById(e){const r=this._gpuText[e];this._renderer.htmlText.decreaseReferenceCount(r.currentKey),z.return(r.batchableSprite),this._gpuText[e]=null}_updateText(e){const r=e.view._getKey(),i=this._getGpuText(e),n=i.batchableSprite;i.currentKey!==r&&this._updateGpuText(e).catch(o=>{console.error(o)}),e.view._didUpdate=!1;const s=e.view._style.padding;ur(n.bounds,e.view.anchor,n.texture,s)}async _updateGpuText(e){var r;e.view._didUpdate=!1;const i=this._getGpuText(e);if(i.generatingTexture)return;const n=e.view._getKey();this._renderer.htmlText.decreaseReferenceCount(i.currentKey),i.generatingTexture=!0,i.currentKey=n;const s=e.view,o=(r=s.resolution)!=null?r:this._renderer.resolution,a=await this._renderer.htmlText.getManagedTexture(s.text,o,s._style,s._getKey()),l=i.batchableSprite;l.texture=i.texture=a,i.generatingTexture=!1,i.textureNeedsUploading=!0,e.view.onUpdate();const u=e.view._style.padding;ur(l.bounds,e.view.anchor,l.texture,u)}_getGpuText(e){return this._gpuText[e.uid]||this._initGpuText(e)}_initGpuText(e){e.view._style.update();const r={texture:A.EMPTY,currentKey:"--",batchableSprite:z.get(Gi),textureNeedsUploading:!1,generatingTexture:!1},i=r.batchableSprite;return i.renderable=e,i.texture=A.EMPTY,i.bounds=[0,1,0,0],i.roundPixels=this._renderer._roundPixels|e.view.roundPixels,this._gpuText[e.uid]=r,e.on("destroyed",()=>{this.destroyRenderable(e)}),r}destroy(){for(const e in this._gpuText)this._destroyRenderableById(e);this._gpuText=null,this._renderer=null}}Zo.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"htmlText"};function rf(){const{userAgent:t}=j.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(t)}function nf(t,e){const r=e.fontFamily,i=[],n={},s=/font-family:([^;"\s]+)/g,o=t.match(s);function a(l){n[l]||(i.push(l),n[l]=!0)}if(Array.isArray(r))for(let l=0;l<r.length;l++)a(r[l]);else a(r);o&&o.forEach(l=>{const u=l.split(":")[1].trim();a(u)});for(const l in e.tagStyles){const u=e.tagStyles[l].fontFamily;a(u)}return i}async function sf(t){const e=await(await j.get().fetch(t)).blob(),r=new FileReader;return await new Promise((i,n)=>{r.onloadend=()=>i(r.result),r.onerror=n,r.readAsDataURL(e)})}async function Qo(t,e){const r=await sf(e);return`@font-face {
        font-family: "${t.fontFamily}";
        src: url('${r}');
        font-weight: ${t.fontWeight};
        font-style: ${t.fontStyle};
    }`}var v_=Object.defineProperty,y_=Object.defineProperties,x_=Object.getOwnPropertyDescriptors,of=Object.getOwnPropertySymbols,__=Object.prototype.hasOwnProperty,w_=Object.prototype.propertyIsEnumerable,af=(t,e,r)=>e in t?v_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,T_=(t,e)=>{for(var r in e||(e={}))__.call(e,r)&&af(t,r,e[r]);if(of)for(var r of of(e))w_.call(e,r)&&af(t,r,e[r]);return t},S_=(t,e)=>y_(t,x_(e));async function lf(t,e){const r=t.filter(i=>Z.has(i)).map((i,n)=>{if(!Mr.has(i)){const{url:s}=Z.get(i);n===0?Mr.set(i,Qo(e,s)):Mr.set(i,Qo(S_(T_({},Br.defaultFontOptions),{fontFamily:i}),s))}return Mr.get(i)});return(await Promise.all(r)).join(`
`)}function uf(t,e,r,i,n){const{domElement:s,styleElement:o,svgRoot:a}=n;s.innerHTML=`<style>${e.cssStyle}</style><div>${t}</div>`,s.setAttribute("style",`transform: scale(${r});transform-origin: top left; display: inline-block`),o.textContent=i;const{width:l,height:u}=n.image;return a.setAttribute("width",l.toString()),a.setAttribute("height",u.toString()),new XMLSerializer().serializeToString(a)}function hf(t,e){const r=ze.getOptimalCanvasAndContext(t.width,t.height,e),{context:i}=r;return i.clearRect(0,0,t.width,t.height),i.drawImage(t,0,0),ze.returnCanvasAndContext(r),r.canvas}function cf(t,e,r){return new Promise(async i=>{r&&await new Promise(n=>setTimeout(n,100)),t.onload=()=>{i()},t.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,t.crossOrigin="anonymous"})}let df;function Jo(t,e,r,i){i=i||df||(df=new ea);const{domElement:n,styleElement:s,svgRoot:o}=i;n.innerHTML=`<style>${e.cssStyle}</style><div>${t}</div>`,n.setAttribute("style","transform-origin: top left; display: inline-block"),r&&(s.textContent=r),document.body.appendChild(o);const a=n.getBoundingClientRect();o.remove();const l=ie.measureFont(e.fontStyle).descent;return{width:a.width,height:a.height+l}}const pf="http://www.w3.org/2000/svg",ff="http://www.w3.org/1999/xhtml",Mr=new Map;class ea{constructor(){this.svgRoot=document.createElementNS(pf,"svg"),this.foreignObject=document.createElementNS(pf,"foreignObject"),this.domElement=document.createElementNS(ff,"div"),this.styleElement=document.createElementNS(ff,"style"),this.image=new Image;const{foreignObject:e,svgRoot:r,styleElement:i,domElement:n}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",r.appendChild(e),e.appendChild(i),e.appendChild(n)}}class Br{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===Re.WEBGPU}getTexture(e){return this._buildTexturePromise(e.text,e.resolution,e.style)}getManagedTexture(e,r,i,n){if(this._activeTextures[n])return this._increaseReferenceCount(n),this._activeTextures[n].promise;const s=this._buildTexturePromise(e,r,i).then(o=>(this._activeTextures[n].texture=o,o));return this._activeTextures[n]={texture:null,promise:s,usageCount:1},s}async _buildTexturePromise(e,r,i){const n=z.get(ea),s=nf(e,i),o=await lf(s,i),a=Jo(e,i,o,n),l=Math.ceil(Math.ceil(Math.max(1,a.width)+i.padding*2)*r),u=Math.ceil(Math.ceil(Math.max(1,a.height)+i.padding*2)*r),h=n.image;h.width=l|0,h.height=u|0;const c=uf(e,i,r,o,n);await cf(h,c,rf()&&s.length>0);let p=h;this._createCanvas&&(p=hf(h,r));const d=qo(p,h.width,h.height,r);return this._createCanvas&&this._renderer.texture.initSource(d.source),z.return(n),d}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const r=this._activeTextures[e];r&&(r.usageCount--,r.usageCount===0&&(r.texture?this._cleanUp(r):r.promise.then(i=>{r.texture=i,this._cleanUp(r)}).catch(()=>{}),this._activeTextures[e]=null))}_cleanUp(e){le.returnTexture(e.texture),e.texture.source.resource=null,e.texture.source.uploadMethodId="unknown"}getReferenceCount(e){return this._activeTextures[e].usageCount}destroy(){this._activeTextures=null}}Br.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"htmlText"},Br.defaultFontOptions={fontFamily:"Arial",fontStyle:"normal",fontWeight:"normal"};var P_=Object.defineProperty,gf=Object.getOwnPropertySymbols,A_=Object.prototype.hasOwnProperty,E_=Object.prototype.propertyIsEnumerable,mf=(t,e,r)=>e in t?P_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,bf=(t,e)=>{for(var r in e||(e={}))A_.call(e,r)&&mf(t,r,e[r]);if(gf)for(var r of gf(e))E_.call(e,r)&&mf(t,r,e[r]);return t};const vf=class{constructor(){this._backgroundColorRgba=[0,0,0,0],this.clearBeforeRender=!0,this._backgroundColor=new H(0),this.color=this._backgroundColor,this.alpha=1}init(t){t=bf(bf({},vf.defaultOptions),t),this.clearBeforeRender=t.clearBeforeRender,this.color=t.background||t.backgroundColor||this._backgroundColor,this.alpha=t.backgroundAlpha}get color(){return this._backgroundColor}set color(t){this._backgroundColor.setValue(t),this._backgroundColorRgba=this._backgroundColor.toArray()}get alpha(){return this._backgroundColor.alpha}set alpha(t){this._backgroundColor.setAlpha(t)}get colorRgba(){return this._backgroundColorRgba}destroy(){}};let Di=vf;Di.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"background",priority:0},Di.defaultOptions={backgroundAlpha:1,backgroundColor:0,clearBeforeRender:!0};const Rr={};V.handle(b.BlendMode,t=>{if(!t.name)throw new Error("BlendMode extension must have a name property");Rr[t.name]=t.ref},t=>{delete Rr[t.name]});class ta{constructor(e){this._isAdvanced=!1,this._filterHash=Object.create(null),this._renderer=e}setBlendMode(e,r,i){if(this._activeBlendMode===r){this._isAdvanced&&this._renderableList.push(e);return}this._activeBlendMode=r,this._isAdvanced&&this._endAdvancedBlendMode(i),this._isAdvanced=!!Rr[r],this._isAdvanced&&(this._beginAdvancedBlendMode(i),this._renderableList.push(e))}_beginAdvancedBlendMode(e){this._renderer.renderPipes.batch.break(e);const r=this._activeBlendMode;if(!Rr[r])return;this._filterHash[r]||(this._filterHash[r]=new $r({filters:[new Rr[r]]}));const i={type:"filter",action:"pushFilter",renderables:[],filterEffect:this._filterHash[r],canBundle:!1};this._renderableList=i.renderables,e.add(i)}_endAdvancedBlendMode(e){this._renderableList=null,this._renderer.renderPipes.batch.break(e),e.add({type:"filter",action:"popFilter",canBundle:!1})}buildStart(){this._isAdvanced=!1}buildEnd(e){this._isAdvanced&&this._endAdvancedBlendMode(e)}destroy(){this._renderer=null,this._renderableList=null;for(const e in this._filterHash)this._filterHash[e].destroy();this._filterHash=null}}ta.extension={type:[b.WebGLPipes,b.WebGPUPipes,b.CanvasPipes],name:"blendMode"};var C_=Object.defineProperty,yf=Object.getOwnPropertySymbols,M_=Object.prototype.hasOwnProperty,B_=Object.prototype.propertyIsEnumerable,xf=(t,e,r)=>e in t?C_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ra=(t,e)=>{for(var r in e||(e={}))M_.call(e,r)&&xf(t,r,e[r]);if(yf)for(var r of yf(e))B_.call(e,r)&&xf(t,r,e[r]);return t};const _f=class{constructor(t){this._renderer=t}_normalizeOptions(t,e={}){return t instanceof Y||t instanceof A?ra({target:t},e):ra(ra({},e),t)}async image(t){const e=new Image;return e.src=await this.base64(t),e}async base64(t){t=this._normalizeOptions(t,_f.defaultImageOptions);const{format:e,quality:r}=t,i=this.canvas(t);if(i.toBlob!==void 0)return new Promise((n,s)=>{i.toBlob(o=>{if(!o){s(new Error("ICanvas.toBlob failed!"));return}const a=new FileReader;a.onload=()=>n(a.result),a.onerror=s,a.readAsDataURL(o)},e,r)});if(i.toDataURL!==void 0)return i.toDataURL(e,r);if(i.convertToBlob!==void 0){const n=await i.convertToBlob({type:e,quality:r});return new Promise((s,o)=>{const a=new FileReader;a.onload=()=>s(a.result),a.onerror=o,a.readAsDataURL(n)})}throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented")}canvas(t){t=this._normalizeOptions(t);const e=t.target,r=this._renderer,i=e instanceof A?e:r.textureGenerator.generateTexture(t),n=r.texture.generateCanvas(i);return e instanceof Y&&i.destroy(),n}pixels(t){t=this._normalizeOptions(t);const e=t.target,r=this._renderer,i=e instanceof A?e:r.textureGenerator.generateTexture(t),n=r.texture.getPixels(i);return e instanceof Y&&i.destroy(),n}texture(t){return t=this._normalizeOptions(t),t.target instanceof A?t.target:this._renderer.textureGenerator.generateTexture(t)}download(t){var e;t=this._normalizeOptions(t);const r=this.canvas(t),i=document.createElement("a");i.download=(e=t.filename)!=null?e:"image.png",i.href=r.toDataURL("image/png"),document.body.appendChild(i),i.click(),document.body.removeChild(i)}log(t){var e;const r=(e=t.width)!=null?e:200;t=this._normalizeOptions(t);const i=this.canvas(t),n=i.toDataURL();console.log(`[Pixi Texture] ${i.width}px ${i.height}px`);const s=["font-size: 1px;",`padding: ${r}px 300px;`,`background: url(${n}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",s)}destroy(){this._renderer=null}};let zi=_f;zi.extension={type:[b.WebGLSystem,b.WebGPUSystem],name:"extract"},zi.defaultImageOptions={format:"png",quality:1};class wf extends A{static create(e){return new A({source:new he(e)})}resize(e,r,i){return this.source.resize(e,r,i),this}}var R_=Object.defineProperty,k_=Object.defineProperties,O_=Object.getOwnPropertyDescriptors,Tf=Object.getOwnPropertySymbols,F_=Object.prototype.hasOwnProperty,U_=Object.prototype.propertyIsEnumerable,Sf=(t,e,r)=>e in t?R_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,I_=(t,e)=>{for(var r in e||(e={}))F_.call(e,r)&&Sf(t,r,e[r]);if(Tf)for(var r of Tf(e))U_.call(e,r)&&Sf(t,r,e[r]);return t},G_=(t,e)=>k_(t,O_(e));const $_=new Q,L_=new pe,D_=[0,0,0,0];class ia{constructor(e){this._renderer=e}generateTexture(e){var r;e instanceof Y&&(e={target:e,frame:void 0,textureSourceOptions:{},resolution:void 0});const i=e.resolution||this._renderer.resolution,n=e.target;let s=e.clearColor;s?s=Array.isArray(s)&&s.length===4?s:H.shared.setValue(s).toArray():s=D_;const o=((r=e.frame)==null?void 0:r.copyTo($_))||He(n,L_).rectangle;o.width=Math.max(o.width,1/i)|0,o.height=Math.max(o.height,1/i)|0;const a=wf.create(G_(I_({},e.textureSourceOptions),{width:o.width,height:o.height,resolution:i})),l=k.shared.translate(-o.x,-o.y);return this._renderer.render({container:n,transform:l,target:a,clearColor:s}),a}destroy(){const e=this;e._renderer=null}}ia.extension={type:[b.WebGLSystem,b.WebGPUSystem],name:"textureGenerator"};class na{constructor(e){this._stackIndex=0,this._globalUniformDataStack=[],this._uniformsPool=[],this._activeUniforms=[],this._bindGroupPool=[],this._activeBindGroups=[],this._renderer=e}reset(){this._stackIndex=0;for(let e=0;e<this._activeUniforms.length;e++)this._uniformsPool.push(this._activeUniforms[e]);for(let e=0;e<this._activeBindGroups.length;e++)this._bindGroupPool.push(this._activeBindGroups[e]);this._activeUniforms.length=0,this._activeBindGroups.length=0}start(e){this.reset(),this.push(e)}bind({projectionData:e,worldTransformMatrix:r,worldColor:i,offset:n}){const s=this._renderer.renderTarget.renderTarget,o=this._stackIndex?this._globalUniformDataStack[this._stackIndex-1]:{projectionData:s,worldTransformMatrix:new k,worldColor:4294967295,offset:new W},a={projectionMatrix:(e==null?void 0:e.projectionMatrix)||s.projectionMatrix,resolution:(e==null?void 0:e.size)||s.size,worldTransformMatrix:r||o.worldTransformMatrix,worldColor:i||o.worldColor,offset:n||o.offset,bindGroup:null},l=this._uniformsPool.pop()||this._createUniforms();this._activeUniforms.push(l);const u=l.uniforms;u.projectionMatrix=a.projectionMatrix,u.uResolution=a.resolution,u.worldTransformMatrix.copyFrom(a.worldTransformMatrix),u.worldTransformMatrix.tx-=a.offset.x,u.worldTransformMatrix.ty-=a.offset.y,u.worldAlpha=(a.worldColor>>24&255)/255,l.update();let h;this._renderer.renderPipes.uniformBatch?h=this._renderer.renderPipes.uniformBatch.getUniformBindGroup(l,!1):(this._renderer.uniformBuffer.updateUniformGroup(l),h=this._bindGroupPool.pop()||new Be,this._activeBindGroups.push(h),h.setResource(l,0)),a.bindGroup=h,this._currentGlobalUniformData=a}push(e){this.bind(e),this._globalUniformDataStack[this._stackIndex++]=this._currentGlobalUniformData}pop(){this._currentGlobalUniformData=this._globalUniformDataStack[--this._stackIndex-1]}get bindGroup(){return this._currentGlobalUniformData.bindGroup}get uniformGroup(){return this._currentGlobalUniformData.bindGroup.resources[0]}_createUniforms(){return new re({projectionMatrix:{value:new k,type:"mat3x3<f32>"},worldTransformMatrix:{value:new k,type:"mat3x3<f32>"},worldAlpha:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}},{ubo:!0,isStatic:!0})}destroy(){const e=this;e._renderer=null}}na.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"globalUniforms"};const sa={f32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"mat2x2<f32>":48,"mat3x3<f32>":48,"mat4x4<f32>":64};function Pf(t){const e=t.map(s=>({data:s,offset:0,size:0}));let r=0,i=0,n=0;for(let s=0;s<e.length;s++){const o=e[s];if(r=sa[o.data.type],!r)throw new Error(`Unknown type ${o.data.type}`);if(o.data.size>1&&(r=Math.max(r,16)*o.data.size),o.size=r,i%r!==0&&i<16){const a=i%r%16;i+=a,n+=a}i+r>16?(n=Math.ceil(n/16)*16,o.offset=n,n+=r,i=r):(o.offset=n,i+=r,n+=r)}return n=Math.ceil(n/16)*16,{uboElements:e,size:n}}const Ni=[{type:"mat3x3<f32>",test:t=>t.value.a!==void 0,code:t=>`
                var ${t}_matrix = uv.${t}.toArray(true);

                data[offset] = ${t}_matrix[0];
                data[offset+1] = ${t}_matrix[1];
                data[offset+2] = ${t}_matrix[2];

                data[offset + 4] = ${t}_matrix[3];
                data[offset + 5] = ${t}_matrix[4];
                data[offset + 6] = ${t}_matrix[5];

                data[offset + 8] = ${t}_matrix[6];
                data[offset + 9] = ${t}_matrix[7];
                data[offset + 10] = ${t}_matrix[8];
            `},{type:"vec4<f32>",test:t=>t.type==="vec4<f32>"&&t.size===1&&t.value.width!==void 0,code:t=>`
                        v = uv.${t};

                        data[offset] = v.x;
                        data[offset+1] = v.y;
                        data[offset+2] = v.width;
                        data[offset+3] = v.height;
                    `},{type:"vec2<f32>",test:t=>t.type==="vec2<f32>"&&t.size===1&&t.value.x!==void 0,code:t=>`
                    v = uv.${t};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                `}],z_={f32:`
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
    `};function Af(t){const e=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
    `];let r=0;for(let n=0;n<t.length;n++){const s=t[n],o=s.data.name;let a=!1,l=0;for(let u=0;u<Ni.length;u++)if(Ni[u].test(s.data)){l=s.offset/4,e.push(`offset += ${l-r};`,Ni[u].code(o)),a=!0;break}if(!a)if(s.data.size>1){const u=Math.max(sa[s.data.type]/16,1),h=s.data.value.length/s.data.size,c=(4-h%4)%4;l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-r};

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
                `)}else{const u=z_[s.data.type];l=s.offset/4,e.push(`
                    v = uv.${o};
                    offset += ${l-r};
                    ${u};
                `)}r=l}const i=e.join(`
`);return new Function("uv","data","offset",i)}class oa{constructor(){this._syncFunctionHash=Object.create(null)}ensureUniformGroup(e){e._syncFunction||this._initUniformGroup(e)}_initUniformGroup(e){const r=e.signature;let i=this._syncFunctionHash[r];if(!i){const n=Object.keys(e.uniformStructures).map(a=>e.uniformStructures[a]),s=Pf(n),o=Af(s.uboElements);i=this._syncFunctionHash[r]={layout:s,syncFunction:o}}return e._syncFunction=i.syncFunction,e.buffer=new we({data:new Float32Array(i.layout.size/4),usage:N.UNIFORM|N.COPY_DST}),e._syncFunction}syncUniformGroup(e,r,i){const n=e._syncFunction||this._initUniformGroup(e);return r||(r=e.buffer.data),i||(i=0),n(e.uniforms,r,i),!0}updateUniformGroup(e){if(e.isStatic&&!e.dirtyId)return!1;e.dirtyId=0;const r=this.syncUniformGroup(e);return e.buffer.update(),r}destroy(){this._syncFunctionHash=null}}oa.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"uniformBuffer"};let Ef=!1;const aa="8.0.0-beta.5";function Cf(t){if(!Ef){if(j.get().getNavigator().userAgent.toLowerCase().indexOf("chrome")>-1){const e=[`%c  %c  %c  %c  %c PixiJS %c v${aa} (${t}) http://www.pixijs.com/

`,"background: #E72264; padding:5px 0;","background: #6CA2EA; padding:5px 0;","background: #B5D33D; padding:5px 0;","background: #FED23F; padding:5px 0;","color: #FFFFFF; background: #E72264; padding:5px 0;","color: #E72264; background: #FFFFFF; padding:5px 0;"];globalThis.console.log(...e)}else globalThis.console&&globalThis.console.log(`PixiJS ${aa} - ${t} - http://www.pixijs.com/`);Ef=!0}}class Hi{constructor(e){this._renderer=e}init(e){e.hello&&Cf(this._renderer.name)}}Hi.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"hello",priority:0},Hi.defaultOptions={hello:!1};var N_=Object.defineProperty,Mf=Object.getOwnPropertySymbols,H_=Object.prototype.hasOwnProperty,j_=Object.prototype.propertyIsEnumerable,Bf=(t,e,r)=>e in t?N_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Rf=(t,e)=>{for(var r in e||(e={}))H_.call(e,r)&&Bf(t,r,e[r]);if(Mf)for(var r of Mf(e))j_.call(e,r)&&Bf(t,r,e[r]);return t};const kf=class{constructor(t){this._renderer=t,this.count=0,this.checkCount=0}init(t){t=Rf(Rf({},kf.defaultOptions),t),this.checkCountMax=t.textureGCCheckCountMax,this.maxIdle=t.textureGCAMaxIdle,this.active=t.textureGCActive}postrender(){this._renderer.renderingToScreen&&(this.count++,this.active&&(this.checkCount++,this.checkCount>this.checkCountMax&&(this.checkCount=0,this.run())))}run(){const t=this._renderer.texture.managedTextures;for(let e=0;e<t.length;e++){const r=t[e];r.resource&&r.touched>-1&&this.count-r.touched>this.maxIdle&&(r.touched=-1,r.unload())}}destroy(){this._renderer=null}};let kr=kf;kr.extension={type:[b.WebGLSystem,b.WebGPUSystem],name:"textureGC"},kr.defaultOptions={textureGCActive:!0,textureGCAMaxIdle:60*60,textureGCCheckCountMax:600},V.add(kr);var W_=Object.defineProperty,Of=Object.getOwnPropertySymbols,V_=Object.prototype.hasOwnProperty,Y_=Object.prototype.propertyIsEnumerable,Ff=(t,e,r)=>e in t?W_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Uf=(t,e)=>{for(var r in e||(e={}))V_.call(e,r)&&Ff(t,r,e[r]);if(Of)for(var r of Of(e))Y_.call(e,r)&&Ff(t,r,e[r]);return t};const If=class{get resolution(){return this.texture.source._resolution}set resolution(t){this.texture.source.resize(this.texture.source.width,this.texture.source.height,t)}init(t){t=Uf(Uf({},If.defaultOptions),t),t.element&&(O(G,"ViewSystem.element has been renamed to ViewSystem.canvas"),t.canvas=t.element),this.screen=new Q(0,0,t.width,t.height),this.canvas=t.canvas||j.get().createCanvas(),this.antialias=!!t.antialias,this.texture=Pi(this.canvas,t),this.multiView=!!t.multiView,this.autoDensity&&(this.canvas.style.width=`${this.texture.width}px`,this.canvas.style.height=`${this.texture.height}px`),this.resolution=t.resolution}resize(t,e,r){this.texture.source.resize(t,e,r),this.screen.width=this.texture.frameWidth,this.screen.height=this.texture.frameHeight,this.autoDensity&&(this.canvas.style.width=`${t}px`,this.canvas.style.height=`${e}px`)}destroy(t=!1){(typeof t=="boolean"?t:t!=null&&t.removeView)&&this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas)}};let ji=If;ji.extension={type:[b.WebGLSystem,b.WebGPUSystem,b.CanvasSystem],name:"view",priority:0},ji.defaultOptions={width:800,height:600,autoDensity:!1,antialias:!1};const la=[Di,Ts,Oo,na,Hi,ji,Ko,Br,xo,oa,kr,ia,zi,Jt],ua=[ta,Ls,Go,go,Io,Uo,Xo,Zo,Yo,Lo,_s,Ds,Ns,zs],X_=[...la,Si,wi,Hs,ho,Zs,Vs,no,io,Xs,oo,Qs,Ys],q_=[...ua],K_=[ks,po,co],Gf=[],$f=[],Lf=[];V.handleByNamedList(b.WebGLSystem,Gf),V.handleByNamedList(b.WebGLPipes,$f),V.handleByNamedList(b.WebGLPipesAdaptor,Lf),V.add(...X_,...q_,...K_);class Df extends hr{constructor(){const e={name:"webgl2",type:Re.WEBGL,systems:Gf,renderPipes:$f,renderPipeAdaptors:Lf};super(e)}}var Z_={__proto__:null,WebGLRenderer:Df};class ha{constructor(e){this._hash=Object.create(null),this._renderer=e}contextChange(e){this._gpu=e}getBindGroup(e,r,i){return e.updateKey(),this._hash[e.key]||this._createBindGroup(e,r,i)}_createBindGroup(e,r,i){var n;const s=this._gpu.device,o=r.layout[i],a=[];for(const u in o){const h=(n=e.resources[u])!=null?n:e.resources[o[u]];let c;if(h.resourceType==="uniformGroup"){const p=h;this._renderer.uniformBuffer.updateUniformGroup(p);const d=p.buffer;c={buffer:this._renderer.buffer.getGPUBuffer(d),offset:0,size:d.descriptor.size}}else if(h.resourceType==="buffer"){const p=h;c={buffer:this._renderer.buffer.getGPUBuffer(p),offset:0,size:p.descriptor.size}}else if(h.resourceType==="bufferResource"){const p=h;c={buffer:this._renderer.buffer.getGPUBuffer(p.buffer),offset:p.offset,size:p.size}}else if(h.resourceType==="textureSampler"){const p=h;c=this._renderer.texture.getGpuSampler(p)}else if(h.resourceType==="textureSource"){const p=h;c=this._renderer.texture.getGpuSource(p).createView({})}a.push({binding:o[u],resource:c})}const l=s.createBindGroup({layout:r._gpuLayout.bindGroups[i],entries:a});return this._hash[e.key]=l,l}destroy(){for(const r of Object.keys(this._hash))this._hash[r]=null;this._hash=null;const e=this;e._renderer=null}}ha.extension={type:[b.WebGPUSystem],name:"bindGroup"};class ca{constructor(){this._gpuBuffers=Object.create(null)}contextChange(e){this._gpu=e}getGPUBuffer(e){return this._gpuBuffers[e.uid]||this.createGPUBuffer(e)}updateBuffer(e){const r=this._gpuBuffers[e.uid]||this.createGPUBuffer(e);return e._updateID&&e.data&&(e._updateID=0,this._gpu.device.queue.writeBuffer(r,0,e.data.buffer,0,e._updateSize)),r}destroyAll(){for(const e in this._gpuBuffers)this._gpuBuffers[e].destroy();this._gpuBuffers={}}createGPUBuffer(e){const r=this._gpu.device.createBuffer(e.descriptor);return e._updateID=0,e.data&&(_i(e.data.buffer,r.getMappedRange()),r.unmap()),this._gpuBuffers[e.uid]=r,e.on("update",this.updateBuffer,this),e.on("change",this.onBufferChange,this),e.on("destroy",this.onBufferDestroy,this),r}onBufferChange(e){let r=this._gpuBuffers[e.uid];r.destroy(),r=this.createGPUBuffer(e),e._updateID=0}onBufferDestroy(e){this._gpuBuffers[e.uid].destroy(),this._gpuBuffers[e.uid]=null}destroy(){for(const r of Object.keys(this._gpuBuffers)){const i=Number(r);this._gpuBuffers[i].destroy(),this._gpuBuffers[i]=null}this._gpuBuffers=null;const e=this;e._renderer=null}}ca.extension={type:[b.WebGPUSystem],name:"buffer"};function Q_(t,e){const r=t.descriptor.size,i=e.gpu.device,n=new we({data:new Float32Array(24e5),usage:N.MAP_READ|N.COPY_DST}),s=e.buffer.createGPUBuffer(n),o=i.createCommandEncoder();o.copyBufferToBuffer(e.buffer.getGPUBuffer(t),0,s,0,r),i.queue.submit([o.finish()]),s.mapAsync(GPUMapMode.READ,0,r).then(()=>{s.getMappedRange(0,r),s.unmap()})}class zf{constructor({minUniformOffsetAlignment:e}){this._minUniformOffsetAlignment=256,this.byteIndex=0,this._minUniformOffsetAlignment=e,this.data=new Float32Array(65535)}clear(){this.byteIndex=0}addEmptyGroup(e){if(e>this._minUniformOffsetAlignment/4)throw new Error(`UniformBufferBatch: array is too large: ${e*4}`);const r=this.byteIndex;let i=r+e*4;if(i=Math.ceil(i/this._minUniformOffsetAlignment)*this._minUniformOffsetAlignment,i>this.data.length*4)throw new Error("UniformBufferBatch: ubo batch got too big");return this.byteIndex=i,r}addGroup(e){const r=this.addEmptyGroup(e.length);for(let i=0;i<e.length;i++)this.data[r/4+i]=e[i];return r}destroy(){this._buffer.destroy(),this._buffer=null,this.data=null}}class da{constructor(e){this._colorMaskCache=15,this._renderer=e}setMask(e){this._colorMaskCache!==e&&(this._colorMaskCache=e,this._renderer.pipeline.setColorMask(e))}destroy(){const e=this;e._renderer=null,this._colorMaskCache=null}}da.extension={type:[b.WebGPUSystem],name:"colorMask"};class pa{constructor(e){this._renderer=e}async init(){return this._initPromise?this._initPromise:(this._initPromise=this._createDeviceAndAdaptor({}).then(e=>{this.gpu=e,this._renderer.runners.contextChange.emit(this.gpu)}),this._initPromise)}contextChange(e){this._renderer.gpu=e}async _createDeviceAndAdaptor(e){const r=await navigator.gpu.requestAdapter(e),i=await r.requestDevice();return{adapter:r,device:i}}destroy(){this.gpu=null,this._renderer=null}}pa.extension={type:[b.WebGPUSystem],name:"device"};var J_=Object.defineProperty,Nf=Object.getOwnPropertySymbols,e0=Object.prototype.hasOwnProperty,t0=Object.prototype.propertyIsEnumerable,Hf=(t,e,r)=>e in t?J_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,jf=(t,e)=>{for(var r in e||(e={}))e0.call(e,r)&&Hf(t,r,e[r]);if(Nf)for(var r of Nf(e))t0.call(e,r)&&Hf(t,r,e[r]);return t};class fa{constructor(e){this._boundBindGroup=Object.create(null),this._boundVertexBuffer=Object.create(null),this._renderer=e}start(){this.commandFinished=new Promise(e=>{this._resolveCommandFinished=e}),this.commandEncoder=this._renderer.gpu.device.createCommandEncoder()}beginRenderPass(e,r){this.renderPassEncoder&&this.renderPassEncoder.end(),this._clearCache(),this.renderPassEncoder=this.commandEncoder.beginRenderPass(r.descriptor),this._setViewport(e.viewport)}_setViewport(e){this.renderPassEncoder.setViewport(e.x,e.y,e.width,e.height,0,1)}setPipelineFromGeometryProgramAndState(e,r,i,n){const s=this._renderer.pipeline.getPipeline(e,r,i,n);this.setPipeline(s)}setPipeline(e){this._boundPipeline!==e&&(this._boundPipeline=e,this.renderPassEncoder.setPipeline(e))}_setVertexBuffer(e,r){this._boundVertexBuffer[e]!==r&&(this._boundVertexBuffer[e]=r,this.renderPassEncoder.setVertexBuffer(e,this._renderer.buffer.updateBuffer(r)))}_setIndexBuffer(e){this._boundIndexBuffer!==e&&(this._boundIndexBuffer=e,this.renderPassEncoder.setIndexBuffer(this._renderer.buffer.updateBuffer(e),"uint32"))}setBindGroup(e,r,i){if(this._boundBindGroup[e]===r)return;this._boundBindGroup[e]=r,r.touch(this._renderer.textureGC.count);const n=this._renderer.bindGroup.getBindGroup(r,i,e);this.renderPassEncoder.setBindGroup(e,n)}setGeometry(e){for(const r in e.attributes){const i=e.attributes[r];this._setVertexBuffer(i.shaderLocation,i.buffer)}e.indexBuffer&&this._setIndexBuffer(e.indexBuffer)}_setShaderBindGroups(e,r){for(const i in e.groups){const n=e.groups[i];r||this._syncBindGroup(n),this.setBindGroup(i,n,e.gpuProgram)}}_syncBindGroup(e){for(const r in e.resources){const i=e.resources[r];i.isUniformGroup&&this._renderer.uniformBuffer.updateUniformGroup(i)}}draw(e){const{geometry:r,shader:i,state:n,topology:s,size:o,start:a,instanceCount:l,skipSync:u}=e;this.setPipelineFromGeometryProgramAndState(r,i.gpuProgram,n,s),this.setGeometry(r),this._setShaderBindGroups(i,u),r.indexBuffer?this.renderPassEncoder.drawIndexed(o||r.indexBuffer.data.length,l||1,a||0):this.renderPassEncoder.draw(o||r.getSize(),l||1,a||0)}finishRenderPass(){this.renderPassEncoder&&(this.renderPassEncoder.end(),this.renderPassEncoder=null)}postrender(){this.finishRenderPass(),this._gpu.device.queue.submit([this.commandEncoder.finish()]),this._resolveCommandFinished()}restoreRenderPass(){const e=this._renderer.renderTarget.getDescriptor(this._renderer.renderTarget.renderTarget,!1,[0,0,0,1]);this.renderPassEncoder=this.commandEncoder.beginRenderPass(e);const r=this._boundPipeline,i=jf({},this._boundVertexBuffer),n=this._boundIndexBuffer,s=jf({},this._boundBindGroup);this._clearCache();const o=this._renderer.renderTarget.renderTarget.viewport;this.renderPassEncoder.setViewport(o.x,o.y,o.width,o.height,0,1),this.setPipeline(r);for(const a in i)this._setVertexBuffer(a,i[a]);for(const a in s)this.setBindGroup(a,s[a],null);this._setIndexBuffer(n)}_clearCache(){for(let e=0;e<16;e++)this._boundBindGroup[e]=null,this._boundVertexBuffer[e]=null;this._boundIndexBuffer=null,this._boundPipeline=null}destroy(){const e=this;e._renderer=null,this._gpu=null,this._boundBindGroup=null,this._boundVertexBuffer=null,this._boundIndexBuffer=null,this._boundPipeline=null}contextChange(e){this._gpu=e}}fa.extension={type:[b.WebGPUSystem],name:"encoder"};class ga{constructor(e){this._renderTargetStencilState=Object.create(null),this._renderer=e,e.renderTarget.onRenderTargetChange.add(this)}onRenderTargetChange(e){let r=this._renderTargetStencilState[e.uid];r||(r=this._renderTargetStencilState[e.uid]={stencilMode:ne.DISABLED,stencilReference:0}),this._activeRenderTarget=e,this.setStencilMode(r.stencilMode,r.stencilReference)}setStencilMode(e,r){const i=this._renderTargetStencilState[this._activeRenderTarget.uid];i.stencilMode=e,i.stencilReference=r;const n=this._renderer;n.pipeline.setStencilMode(e),n.encoder.renderPassEncoder.setStencilReference(r)}destroy(){this._renderer.renderTarget.onRenderTargetChange.remove(this);const e=this;e._renderer=null,this._activeRenderTarget=null,this._renderTargetStencilState=null}}ga.extension={type:[b.WebGPUSystem],name:"stencil"};const Ve=128;class ma{constructor(e){this._bindGroupHash=Object.create(null),this._buffers=[],this._bindGroups=[],this._bufferResources=[],this._renderer=e,this._batchBuffer=new zf({minUniformOffsetAlignment:Ve});const r=256/Ve;for(let i=0;i<r;i++){let n=N.UNIFORM|N.COPY_DST;i===0&&(n|=N.COPY_SRC),this._buffers.push(new we({data:this._batchBuffer.data,usage:n}))}}renderEnd(){this._uploadBindGroups(),this._resetBindGroups()}_resetBindGroups(){for(const e in this._bindGroupHash)this._bindGroupHash[e]=null;this._batchBuffer.clear()}getUniformBindGroup(e,r){if(!r&&this._bindGroupHash[e.uid])return this._bindGroupHash[e.uid];this._renderer.uniformBuffer.ensureUniformGroup(e);const i=e.buffer.data,n=this._batchBuffer.addEmptyGroup(i.length);return this._renderer.uniformBuffer.syncUniformGroup(e,this._batchBuffer.data,n/4),this._bindGroupHash[e.uid]=this._getBindGroup(n/Ve),this._bindGroupHash[e.uid]}getUniformBufferResource(e){this._renderer.uniformBuffer.updateUniformGroup(e);const r=e.buffer.data,i=this._batchBuffer.addGroup(r);return this._getBufferResource(i/Ve)}getArrayBindGroup(e){const r=this._batchBuffer.addGroup(e);return this._getBindGroup(r/Ve)}getArrayBufferResource(e){const r=this._batchBuffer.addGroup(e)/Ve;return this._getBufferResource(r)}_getBufferResource(e){if(!this._bufferResources[e]){const r=this._buffers[e%2];this._bufferResources[e]=new Ai({buffer:r,offset:(e/2|0)*256,size:Ve})}return this._bufferResources[e]}_getBindGroup(e){if(!this._bindGroups[e]){const r=new Be({0:this._getBufferResource(e)});this._bindGroups[e]=r}return this._bindGroups[e]}_uploadBindGroups(){const e=this._renderer.buffer,r=this._buffers[0];r.update(this._batchBuffer.byteIndex),e.updateBuffer(r);const i=this._renderer.gpu.device.createCommandEncoder();for(let n=1;n<this._buffers.length;n++){const s=this._buffers[n];i.copyBufferToBuffer(e.getGPUBuffer(r),Ve,e.getGPUBuffer(s),0,this._batchBuffer.byteIndex)}this._renderer.gpu.device.queue.submit([i.finish()])}destroy(){for(let e=0;e<this._bindGroups.length;e++)this._bindGroups[e].destroy();this._bindGroups=null,this._bindGroupHash=null;for(let e=0;e<this._buffers.length;e++)this._buffers[e].destroy();this._buffers=null;for(let e=0;e<this._bufferResources.length;e++)this._bufferResources[e].destroy();this._bufferResources=null,this._batchBuffer.destroy(),this._bindGroupHash=null,this._renderer=null}}ma.extension={type:[b.WebGPUPipes],name:"uniformBatch"};class r0 extends Be{constructor(){super({0:new we({data:new Float32Array(128),usage:N.UNIFORM|N.COPY_DST})})}get buffer(){return this.resources[0]}get data(){return this.resources[0].data}}class ba{constructor(e){this._activeBindGroups=[],this._activeBindGroupIndex=0,this._renderer=e}getUniformBindGroup(e){const r=this._renderer;r.uniformBuffer.ensureUniformGroup(e);const i=z.get(r0);return r.uniformBuffer.syncUniformGroup(e,i.data,0),i.buffer.update(e.buffer.data.byteLength),this._activeBindGroups[this._activeBindGroupIndex++]=i,i}renderEnd(){for(let e=0;e<this._activeBindGroupIndex;e++)z.return(this._activeBindGroups[e]);this._activeBindGroupIndex=0}}ba.extension={type:[b.WebGPUPipes],name:"uniformBuffer"};const i0={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4};function n0(t,e,r,i,n,s,o,a){return t<<26|e<<18|o<<14|r<<8|i<<3|a<<1|n<<4|s}class va{constructor(e){this._moduleCache=Object.create(null),this._bufferLayoutsCache=Object.create(null),this._pipeCache=Object.create(null),this._colorMask=15,this._multisampleCount=1,this._renderer=e}contextChange(e){this._gpu=e,this.setStencilMode(ne.DISABLED)}setMultisampleCount(e){this._multisampleCount=e}setColorMask(e){this._colorMask=e}setStencilMode(e){this._stencilMode=e,this._stencilState=ke[e]}setPipeline(e,r,i,n){const s=this.getPipeline(e,r,i);n.setPipeline(s)}getPipeline(e,r,i,n){e._layoutKey||this._generateBufferKey(e),r._layoutKey||(this._generateProgramKey(r),this._renderer.shader.createProgramLayout(r)),n=n||e.topology;const s=n0(e._layoutKey,r._layoutKey,i.data,i._blendModeId,this._stencilMode,this._multisampleCount,this._colorMask,i0[n]);return this._pipeCache[s]?this._pipeCache[s]:(this._pipeCache[s]=this._createPipeline(e,r,i,n),this._pipeCache[s])}_createPipeline(e,r,i,n){const s=this._gpu.device,o=this._createVertexBufferLayouts(e),a=this._renderer.state.getColorTargets(i);let l=this._stencilState;l=ke[this._stencilMode],a[0].writeMask=this._stencilMode===ne.RENDERING_MASK_ADD?0:this._colorMask;const u={vertex:{module:this._getModule(r.vertex.source),entryPoint:r.vertex.entryPoint,buffers:o},fragment:{module:this._getModule(r.fragment.source),entryPoint:r.fragment.entryPoint,targets:a},primitive:{topology:n,cullMode:i.cullMode},layout:r._gpuLayout.pipeline,multisample:{count:this._multisampleCount},depthStencil:l,label:"PIXI Pipeline"};return s.createRenderPipeline(u)}_getModule(e){return this._moduleCache[e]||this._createModule(e)}_createModule(e){const r=this._gpu.device;return this._moduleCache[e]=r.createShaderModule({code:e}),this._moduleCache[e]}_generateProgramKey(e){const{vertex:r,fragment:i}=e,n=r.source+i.source+r.entryPoint+i.entryPoint;return e._layoutKey=Yr(n,"program"),e._layoutKey}_generateBufferKey(e){const r=[];let i=0;const n=Object.keys(e.attributes).sort();for(let o=0;o<n.length;o++){const a=e.attributes[n[o]];r[i++]=a.shaderLocation,r[i++]=a.offset,r[i++]=a.format,r[i++]=a.stride}const s=r.join("");return e._layoutKey=Yr(s,"geometry"),e._layoutKey}_createVertexBufferLayouts(e){if(this._bufferLayoutsCache[e._layoutKey])return this._bufferLayoutsCache[e._layoutKey];const r=[];return e.buffers.forEach(i=>{const n={arrayStride:0,stepMode:"vertex",attributes:[]},s=n.attributes;for(const o in e.attributes){const a=e.attributes[o];a.buffer===i&&(n.arrayStride=a.stride,s.push({shaderLocation:a.shaderLocation,offset:a.offset,format:a.format}))}s.length&&r.push(n)}),this._bufferLayoutsCache[e._layoutKey]=r,r}destroy(){const e=this;e._renderer=null,this._bufferLayoutsCache=null}}va.extension={type:[b.WebGPUSystem],name:"pipeline"};class Wf{constructor(){this.contexts=[],this.msaaTextures=[],this.msaaSamples=1}}class ya{constructor(e){this.rootProjectionMatrix=new k,this.onRenderTargetChange=new ai("onRenderTargetChange"),this._renderSurfaceToRenderTargetHash=new Map,this._gpuRenderTargetHash=Object.create(null),this._renderTargetStack=[],this._defaultClearColor=[0,0,0,0],this._renderer=e}renderStart({target:e,clear:r,clearColor:i}){this.rootRenderTarget=this.getRenderTarget(e),this.rootProjectionMatrix=this.rootRenderTarget.projectionMatrix,this.renderingToScreen=qs(this.rootRenderTarget),this._renderTargetStack.length=0,this._renderer.encoder.start(),this.push(this.rootRenderTarget,r,i!=null?i:this._renderer.background.colorRgba)}contextChange(e){this._gpu=e}bind(e,r=!0,i){const n=this.getRenderTarget(e),s=this.renderTarget!==n;return this.renderTarget=n,this._startRenderPass(r,i),s&&this.onRenderTargetChange.emit(n),n}_getGpuColorTexture(e){const r=this._getGpuRenderTarget(e);return r.contexts[0]?r.contexts[0].getCurrentTexture():this._renderer.texture.getGpuSource(e.colorTextures[0].source)}getDescriptor(e,r,i){typeof r=="boolean"&&(r=r?me.ALL:me.NONE);const n=this._getGpuRenderTarget(e),s=e.colorTextures.map((a,l)=>{const u=n.contexts[l];let h,c;u?h=u.getCurrentTexture().createView():h=this._renderer.texture.getTextureView(a),n.msaaTextures[l]&&(c=h,h=this._renderer.texture.getTextureView(n.msaaTextures[l]));const p=r&me.COLOR?"clear":"load";return i!=null||(i=this._defaultClearColor),{view:h,resolveTarget:c,clearValue:i,storeOp:"store",loadOp:p}});let o;if(e.depthTexture){const a=r&me.STENCIL?"clear":"load";o={view:this._renderer.texture.getGpuSource(e.depthTexture.source).createView(),stencilStoreOp:"store",stencilLoadOp:a}}return{colorAttachments:s,depthStencilAttachment:o}}clear(e=me.ALL,r){e&&this._startRenderPass(e,r)}push(e,r=me.ALL,i){const n=this.bind(e,r,i);return this._renderTargetStack.push(n),n}pop(){this._renderTargetStack.pop(),this.bind(this._renderTargetStack[this._renderTargetStack.length-1],!1)}getRenderTarget(e){var r;return(r=this._renderSurfaceToRenderTargetHash.get(e))!=null?r:this._initRenderTarget(e)}copyToTexture(e,r,i,n){const s=this._renderer,o=s.renderTarget._getGpuColorTexture(e),a=s.texture.getGpuSource(r.source);return s.encoder.commandEncoder.copyTextureToTexture({texture:o,origin:i},{texture:a},n),r}restart(){this.bind(this.rootRenderTarget,me.NONE)}destroy(){const e=this;e._renderer=null,this._renderSurfaceToRenderTargetHash.clear()}_startRenderPass(e=!0,r){const i=this.renderTarget,n=this._getGpuRenderTarget(i);(i.width!==n.width||i.height!==n.height)&&this._resizeGpuRenderTarget(i);const s=this.getDescriptor(i,e,r);n.descriptor=s,this._renderer.encoder.beginRenderPass(i,n),this._renderer.pipeline.setMultisampleCount(n.msaaSamples)}_initRenderTarget(e){let r=null;return e instanceof HTMLCanvasElement&&(e=Pi(e)),e instanceof Ft?r=e:e instanceof A&&(r=new Ft({colorTextures:[e],depthTexture:e.source.depthStencil})),r.isRoot=!0,this._renderSurfaceToRenderTargetHash.set(e,r),r}_getGpuRenderTarget(e){return this._gpuRenderTargetHash[e.uid]||this._initGpuRenderTarget(e)}_initGpuRenderTarget(e){e.isRoot=!0;const r=new Wf;return e.colorTextures.forEach((i,n)=>{if(i.source.resource instanceof HTMLCanvasElement){const s=e.colorTexture.source.resource.getContext("webgpu");try{s.configure({device:this._gpu.device,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"opaque"})}catch(o){console.error(o)}r.contexts[n]=s}if(r.msaa=i.source.antialias,i.source.antialias){const s=new he({width:0,height:0,sampleCount:4});r.msaaTextures[n]=s}}),r.msaa&&(r.msaaSamples=4,e.depthTexture&&(e.depthTexture.source.sampleCount=4)),this._gpuRenderTargetHash[e.uid]=r,r}_resizeGpuRenderTarget(e){const r=this._getGpuRenderTarget(e);r.width=e.width,r.height=e.height,r.msaa&&e.colorTextures.forEach((i,n)=>{const s=r.msaaTextures[n];s==null||s.resize(i.source.width,i.source.height,i.source._resolution)})}}ya.extension={type:[b.WebGPUSystem],name:"renderTarget"};class xa{contextChange(e){this._gpu=e}createProgramLayout(e){const r=this._gpu.device;if(!e._gpuLayout)if(e.gpuLayout){const i=e.gpuLayout.map(s=>r.createBindGroupLayout({entries:s})),n={bindGroupLayouts:i};e._gpuLayout={bindGroups:i,pipeline:r.createPipelineLayout(n)}}else e._gpuLayout={bindGroups:null,pipeline:"auto"}}destroy(){this._gpu=null}}xa.extension={type:[b.WebGPUSystem],name:"shader"};const be={};be.normal={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},be.add={alpha:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one",operation:"add"}},be.multiply={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"dst",dstFactor:"one-minus-src-alpha",operation:"add"}},be.screen={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},be.overlay={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"one",dstFactor:"one-minus-src",operation:"add"}},be.none={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"zero",operation:"add"}},be["normal-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"}},be["add-npm"]={alpha:{srcFactor:"one",dstFactor:"one",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"}},be["screen-npm"]={alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"src-alpha",dstFactor:"one-minus-src",operation:"add"}},be.erase={alpha:{srcFactor:"zero",dstFactor:"one-minus-src-alpha",operation:"add"},color:{srcFactor:"zero",dstFactor:"one-minus-src",operation:"add"}};class _a{constructor(){this.defaultState=new Se,this.defaultState.blend=!0}contextChange(e){this.gpu=e}getColorTargets(e){return[{format:"bgra8unorm",writeMask:0,blend:be[e.blendMode]||be.normal}]}destroy(){this.gpu=null}}_a.extension={type:[b.WebGPUSystem],name:"state"};const Vf={type:"image",upload(t,e,r){const i=t.resource,n=(t.pixelWidth|0)*(t.pixelHeight|0),s=i.byteLength/n;r.device.queue.writeTexture({texture:e},i,{offset:0,rowsPerImage:t.pixelWidth,bytesPerRow:t.pixelWidth*s},{width:t.pixelWidth,height:t.pixelHeight,depthOrArrayLayers:1})}},wa={type:"image",upload(t,e,r){const i=t.resource;if(!i)return;const n=t.resourceWidth||t.pixelWidth,s=t.resourceHeight||t.pixelHeight,o=t.alphaMode==="premultiply-alpha-on-upload";r.device.queue.copyExternalImageToTexture({source:i},{texture:e,premultipliedAlpha:o},{width:n,height:s})}},Yf={type:"video",upload(t,e,r){wa.upload(t,e,r)}};class Xf{constructor(e){this.device=e,this.sampler=e.createSampler({minFilter:"linear"}),this.pipelines={}}_getMipmapPipeline(e){let r=this.pipelines[e];return r||(this.mipmapShaderModule||(this.mipmapShaderModule=this.device.createShaderModule({code:`
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
                    `})),r=this.device.createRenderPipeline({layout:"auto",vertex:{module:this.mipmapShaderModule,entryPoint:"vertexMain"},fragment:{module:this.mipmapShaderModule,entryPoint:"fragmentMain",targets:[{format:e}]}}),this.pipelines[e]=r),r}generateMipmap(e){const r=this._getMipmapPipeline(e.format);if(e.dimension==="3d"||e.dimension==="1d")throw new Error("Generating mipmaps for non-2d textures is currently unsupported!");let i=e;const n=e.depthOrArrayLayers||1,s=e.usage&GPUTextureUsage.RENDER_ATTACHMENT;if(!s){const l={size:{width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:n},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.RENDER_ATTACHMENT,mipLevelCount:e.mipLevelCount-1};i=this.device.createTexture(l)}const o=this.device.createCommandEncoder({}),a=r.getBindGroupLayout(0);for(let l=0;l<n;++l){let u=e.createView({baseMipLevel:0,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),h=s?1:0;for(let c=1;c<e.mipLevelCount;++c){const p=i.createView({baseMipLevel:h++,mipLevelCount:1,dimension:"2d",baseArrayLayer:l,arrayLayerCount:1}),d=o.beginRenderPass({colorAttachments:[{view:p,storeOp:"store",loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0}}]}),f=this.device.createBindGroup({layout:a,entries:[{binding:0,resource:this.sampler},{binding:1,resource:u}]});d.setPipeline(r),d.setBindGroup(0,f),d.draw(3,1,0,0),d.end(),u=p}}if(!s){const l={width:Math.ceil(e.width/2),height:Math.ceil(e.height/2),depthOrArrayLayers:n};for(let u=1;u<e.mipLevelCount;++u)o.copyTextureToTexture({texture:i,mipLevel:u-1},{texture:e,mipLevel:u},l),l.width=Math.ceil(l.width/2),l.height=Math.ceil(l.height/2)}return this.device.queue.submit([o.finish()]),s||i.destroy(),e}}class Ta{constructor(e){this.managedTextures=[],this._gpuSources=Object.create(null),this._gpuSamplers=Object.create(null),this._bindGroupHash=Object.create(null),this._textureViewHash=Object.create(null),this._uploads={image:wa,buffer:Vf,video:Yf},this._renderer=e}contextChange(e){this._gpu=e}initSource(e){if(e.autoGenerateMipmaps){const n=Math.max(e.pixelWidth,e.pixelHeight);e.mipLevelCount=Math.floor(Math.log2(n))+1}const r={size:{width:e.pixelWidth||1,height:e.pixelHeight||1},format:e.format,sampleCount:e.sampleCount,mipLevelCount:e.mipLevelCount,dimension:e.dimension,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC},i=this._gpu.device.createTexture(r);return this._gpuSources[e.uid]=i,e.on("update",this.onSourceUpdate,this),e.on("resize",this.onSourceResize,this),e.on("destroy",this.onSourceDestroy,this),e.on("unload",this.onSourceUnload,this),this.managedTextures.push(e),this.onSourceUpdate(e),i}onSourceUpdate(e){const r=this.getGpuSource(e);r&&(this._uploads[e.uploadMethodId]&&this._uploads[e.uploadMethodId].upload(e,r,this._gpu),e.autoGenerateMipmaps&&e.mipLevelCount>1&&(this._mipmapGenerator||(this._mipmapGenerator=new Xf(this._gpu.device)),this._mipmapGenerator.generateMipmap(r)))}onSourceUnload(e){const r=this._gpuSources[e.uid];r&&(this._gpuSources[e.uid]=null,r.destroy())}onSourceDestroy(e){e.off("update",this.onSourceUpdate,this),e.off("unload",this.onSourceUnload,this),e.off("destroy",this.onSourceDestroy,this),e.off("resize",this.onSourceResize,this),this.managedTextures.splice(this.managedTextures.indexOf(e),1),this.onSourceUnload(e)}onSourceResize(e){const r=this._gpuSources[e.uid];(r.width!==e.pixelWidth||r.height!==e.pixelHeight)&&(this._textureViewHash[e.uid]=null,this._bindGroupHash[e.uid]=null,this.onSourceUnload(e),this.initSource(e))}_initSampler(e){return this._gpuSamplers[e.resourceId]=this._gpu.device.createSampler(e),this._gpuSamplers[e.resourceId]}getGpuSampler(e){return this._gpuSamplers[e.resourceId]||this._initSampler(e)}getGpuSource(e){return this._gpuSources[e.uid]||this.initSource(e)}getTextureBindGroup(e){var r;return(r=this._bindGroupHash[e.id])!=null?r:this._createTextureBindGroup(e)}_createTextureBindGroup(e){const r=e.source,i=r.uid;return this._bindGroupHash[i]=new Be({0:r,1:r.style}),this._bindGroupHash[i]}getTextureView(e){var r;const i=e.source;return(r=this._textureViewHash[i.uid])!=null?r:this._createTextureView(i)}_createTextureView(e){return this._textureViewHash[e.uid]=this.getGpuSource(e).createView(),this._textureViewHash[e.uid]}generateCanvas(e){const r=this._renderer,i=r.gpu.device.createCommandEncoder(),n=j.get().createCanvas();n.width=e.source.pixelWidth,n.height=e.source.pixelHeight;const s=n.getContext("webgpu");return s.configure({device:r.gpu.device,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC,format:"bgra8unorm",alphaMode:"premultiplied"}),i.copyTextureToTexture({texture:r.texture.getGpuSource(e.source),origin:{x:0,y:0}},{texture:s.getCurrentTexture()},{width:n.width,height:n.height}),r.gpu.device.queue.submit([i.finish()]),n}getPixels(e){const r=this.generateCanvas(e),i=ze.getOptimalCanvasAndContext(r.width,r.height),n=i.context;n.drawImage(r,0,0);const{width:s,height:o}=r,a=n.getImageData(0,0,s,o),l=new Uint8ClampedArray(a.data.buffer);return ze.returnCanvasAndContext(i),{pixels:l,width:s,height:o}}destroy(){for(const e of Object.keys(this._gpuSources)){const r=Number(e);this._gpuSources[r].destroy(),this._gpuSources[r]=null}for(const e of Object.keys(this._bindGroupHash)){const r=Number(e);this._bindGroupHash[r].destroy(),this._bindGroupHash[r]=null}this._gpu=null,this._mipmapGenerator=null,this._gpuSources=null,this._bindGroupHash=null,this._textureViewHash=null,this._gpuSamplers=null}}Ta.extension={type:[b.WebGPUSystem],name:"texture"};class Sa{init(){const e=new re({uTransformMatrix:{value:new k,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),r=Mt({name:"graphics",bits:[fi,mi(Te),Rd,Rt]});this.shader=new Ee({gpuProgram:r,resources:{localUniforms:e}}),this.shader.addResource("globalUniforms",0,0)}execute(e,r){const i=r.view.context,n=i.customShader||this.shader,s=e.renderer,o=s.graphicsContext,{geometry:a,instructions:l}=o.getContextRenderData(i),u=s.encoder;u.setPipelineFromGeometryProgramAndState(a,n.gpuProgram,e.state),u.setGeometry(a);const h=s.globalUniforms.bindGroup;u.setBindGroup(0,h,n.gpuProgram);const c=s.renderPipes.uniformBatch.getUniformBindGroup(n.resources.localUniforms,!0);u.setBindGroup(2,c,n.gpuProgram);const p=l.instructions;for(let d=0;d<l.instructionSize;d++){const f=p[d];if(n.groups[1]=f.bindGroup,!f.gpuBindGroup){const m=f.textures;f.bindGroup=yi(m.textures,m.count),f.gpuBindGroup=s.bindGroup.getBindGroup(f.bindGroup,n.gpuProgram,1)}u.setBindGroup(1,f.bindGroup,n.gpuProgram),u.renderPassEncoder.drawIndexed(f.size,1,f.start)}}destroy(){this.shader.destroy(!0),this.shader=null}}Sa.extension={type:[b.WebGPUPipesAdaptor],name:"graphics"};class Pa{init(){const e=Mt({name:"mesh",bits:[Ot,kd,Rt]});this._shader=new Ee({gpuProgram:e,resources:{uTexture:A.EMPTY._source,uSampler:A.EMPTY._source.style}})}execute(e,r){const i=e.renderer,n=r.view;let s=n._shader;s||(s=this._shader,s.groups[2]=i.texture.getTextureBindGroup(n.texture)),s.groups[0]=i.globalUniforms.bindGroup;const o=e.localUniforms;s.groups[1]=i.renderPipes.uniformBatch.getUniformBindGroup(o,!0),i.encoder.draw({geometry:n._geometry,shader:s,state:n.state})}destroy(){this._shader.destroy(!0),this._shader=null}}Pa.extension={type:[b.WebGPUPipesAdaptor],name:"mesh"};const s0=[...la,pa,ca,Ta,ya,fa,xa,_a,va,da,ga,ha],o0=[...ua,ma,ba],a0=[Fs,Pa,Sa],qf=[],Kf=[],Zf=[];V.handleByNamedList(b.WebGPUSystem,qf),V.handleByNamedList(b.WebGPUPipes,Kf),V.handleByNamedList(b.WebGPUPipesAdaptor,Zf),V.add(...s0,...o0,...a0);class Qf extends hr{constructor(){const e={name:"webgpu",type:Re.WEBGPU,systems:qf,renderPipes:Kf,renderPipeAdaptors:Zf};super(e)}}var l0={__proto__:null,WebGPURenderer:Qf};const u0={POINTS:"point-list",LINES:"line-list",LINE_STRIP:"line-strip",TRIANGLES:"triangle-list",TRIANGLE_STRIP:"triangle-strip"},h0=new Proxy(u0,{get(t,e){return O(G,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),t[e]}}),c0={float:4,vec2:8,vec3:12,vec4:16,int:4,ivec2:8,ivec3:12,ivec4:16,uint:4,uvec2:8,uvec3:12,uvec4:16,bool:4,bvec2:8,bvec3:12,bvec4:16,mat2:32,mat3:48,mat4:64};var Jf=(t=>(t[t.NONE=0]="NONE",t[t.LOW=2]="LOW",t[t.MEDIUM=4]="MEDIUM",t[t.HIGH=8]="HIGH",t))(Jf||{}),Aa=(t=>(t.CLAMP="clamp-to-edge",t.REPEAT="repeat",t.MIRRORED_REPEAT="mirror-repeat",t))(Aa||{});const d0=new Proxy(Aa,{get(t,e){return O(G,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),t[e]}});var Ea=(t=>(t.NEAREST="nearest",t.LINEAR="linear",t))(Ea||{});const p0=new Proxy(Ea,{get(t,e){return O(G,`DRAW_MODES.${e} is deprecated, use '${e}' instead`),t[e]}});class f0{constructor(){this.x0=0,this.y0=0,this.x1=1,this.y1=0,this.x2=1,this.y2=1,this.x3=0,this.y3=1,this.uvsFloat32=new Float32Array(8)}set(e,r,i){const n=r.width,s=r.height;if(i){const o=e.width/2/n,a=e.height/2/s,l=e.x/n+o,u=e.y/s+a;i=I.add(i,I.NW),this.x0=l+o*I.uX(i),this.y0=u+a*I.uY(i),i=I.add(i,2),this.x1=l+o*I.uX(i),this.y1=u+a*I.uY(i),i=I.add(i,2),this.x2=l+o*I.uX(i),this.y2=u+a*I.uY(i),i=I.add(i,2),this.x3=l+o*I.uX(i),this.y3=u+a*I.uY(i)}else this.x0=e.x/n,this.y0=e.y/s,this.x1=(e.x+e.width)/n,this.y1=e.y/s,this.x2=(e.x+e.width)/n,this.y2=(e.y+e.height)/s,this.x3=e.x/n,this.y3=(e.y+e.height)/s;this.uvsFloat32[0]=this.x0,this.uvsFloat32[1]=this.y0,this.uvsFloat32[2]=this.x1,this.uvsFloat32[3]=this.y1,this.uvsFloat32[4]=this.x2,this.uvsFloat32[5]=this.y2,this.uvsFloat32[6]=this.x3,this.uvsFloat32[7]=this.y3}}let g0=0;function m0(){return g0++}function b0(t,e){if(t===16777215||!e)return e;if(e===16777215||!t)return t;const r=t>>16&255,i=t>>8&255,n=t&255,s=e>>16&255,o=e>>8&255,a=e&255,l=r*s/255,u=i*o/255,h=n*a/255;return(l<<16)+(u<<8)+h}function v0(t,e,r){const i=t.a,n=t.b,s=t.c,o=t.d,a=t.tx,l=t.ty,u=e.a,h=e.b,c=e.c,p=e.d;r.a=i*u+n*c,r.b=i*h+n*p,r.c=s*u+o*c,r.d=s*h+o*p,r.tx=a*u+l*c+e.tx,r.ty=a*h+l*p+e.ty}var y0=Object.defineProperty,Wi=Object.getOwnPropertySymbols,eg=Object.prototype.hasOwnProperty,tg=Object.prototype.propertyIsEnumerable,rg=(t,e,r)=>e in t?y0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,x0=(t,e)=>{for(var r in e||(e={}))eg.call(e,r)&&rg(t,r,e[r]);if(Wi)for(var r of Wi(e))tg.call(e,r)&&rg(t,r,e[r]);return t},_0=(t,e)=>{var r={};for(var i in t)eg.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&Wi)for(var i of Wi(t))e.indexOf(i)<0&&tg.call(t,i)&&(r[i]=t[i]);return r};class w0 extends Y{constructor(e){e instanceof je&&(e={context:e});const r=e||{},{context:i}=r,n=_0(r,["context"]);super(x0({view:new Do(i),label:"Graphics"},n)),this.allowChildren=!1}get context(){return this.view.context}set context(e){this.view.context=e}_callContextMethod(e,r){return this.view.context[e](...r),this}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(...e){return this._callContextMethod("beginPath",e)}cut(...e){return this._callContextMethod("cut",e)}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(...e){return this._callContextMethod("closePath",e)}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(...e){return this._callContextMethod("save",e)}getTransform(...e){return this._callContextMethod("getTransform",e)}resetTransform(...e){return this._callContextMethod("resetTransform",e)}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(...e){return this._callContextMethod("clear",e)}get fillStyle(){return this.view.context.fillStyle}set fillStyle(e){this.view.context.fillStyle=e}get strokeStyle(){return this.view.context.strokeStyle}set strokeStyle(e){this.view.context.strokeStyle=e}beginFill(e,r){return O("8.0.0","Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.endFill(),this.context.fillStyle={color:e,alpha:r},this}endFill(){return O("8.0.0","Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill(),this}drawCircle(...e){return O("8.0.0","Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return O("8.0.0","Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return O("8.0.0","Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return O("8.0.0","Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return O("8.0.0","Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return O("8.0.0","Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}const T0={rectangle:Bo,polygon:Mo,triangle:Ro,circle:gt,ellipse:gt,roundedRectangle:gt};function S0(t){const e=[],r=[],i=[],n=t.path.shapePath,s=t.textureMatrix;n.shapePrimitives.forEach(({shape:a,transform:l})=>{const u=i.length,h=e.length/2,c=[],p=T0[a.type];p.build(a,c),l&&Ri(c,l),p.triangulate(c,e,2,h,i,u);const d=r.length/2;s?(l&&s.append(l.clone().invert()),_o(e,2,h,r,d,2,e.length/2-h,s)):wo(r,d,2,e.length/2-h)});const o=t.out;return o?(o.positions=new Float32Array(e),o.uvs=new Float32Array(r),o.indices=new Uint32Array(i),o):new Gt({positions:new Float32Array(e),uvs:new Float32Array(r),indices:new Uint32Array(i)})}var P0=Object.defineProperty,ig=Object.getOwnPropertySymbols,A0=Object.prototype.hasOwnProperty,E0=Object.prototype.propertyIsEnumerable,ng=(t,e,r)=>e in t?P0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,sg=(t,e)=>{for(var r in e||(e={}))A0.call(e,r)&&ng(t,r,e[r]);if(ig)for(var r of ig(e))E0.call(e,r)&&ng(t,r,e[r]);return t};const og=class extends Gt{constructor(...t){var e;super({});let r=(e=t[0])!=null?e:{};typeof r=="number"&&(O(G,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),r={width:r,height:t[1],verticesX:t[2],verticesY:t[3]}),this.build(r)}build(t){var e,r,i,n;t=sg(sg({},og.defaultOptions),t),this.verticesX=(e=this.verticesX)!=null?e:t.verticesX,this.verticesY=(r=this.verticesY)!=null?r:t.verticesY,this.width=(i=this.width)!=null?i:t.width,this.height=(n=this.height)!=null?n:t.height;const s=this.verticesX*this.verticesY,o=[],a=[],l=[],u=this.verticesX-1,h=this.verticesY-1,c=this.width/u,p=this.height/h;for(let f=0;f<s;f++){const m=f%this.verticesX,g=f/this.verticesX|0;o.push(m*c,g*p),a.push(m/u,g/h)}const d=u*h;for(let f=0;f<d;f++){const m=f%u,g=f/u|0,x=g*this.verticesX+m,v=g*this.verticesX+m+1,y=(g+1)*this.verticesX+m,_=(g+1)*this.verticesX+m+1;l.push(x,v,y,v,_,y)}this.buffers[0].data=new Float32Array(o),this.buffers[1].data=new Float32Array(a),this.indexBuffer.data=new Uint32Array(l),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};let Ca=og;Ca.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};var C0=Object.defineProperty,ag=Object.getOwnPropertySymbols,M0=Object.prototype.hasOwnProperty,B0=Object.prototype.propertyIsEnumerable,lg=(t,e,r)=>e in t?C0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ug=(t,e)=>{for(var r in e||(e={}))M0.call(e,r)&&lg(t,r,e[r]);if(ag)for(var r of ag(e))B0.call(e,r)&&lg(t,r,e[r]);return t};const hg=class extends Ca{constructor(t){t=ug(ug({},hg.defaultOptions),t),super({width:t.width,height:t.height,verticesX:4,verticesY:4}),this._textureMatrix=new k,this.update(t)}update(t){this.updateUvs(t),this.updatePositions(t)}updatePositions(t){var e,r,i,n,s,o;this.width=(e=t.width)!=null?e:this.width,this.height=(r=t.height)!=null?r:this.height,this._leftWidth=(i=t.leftWidth)!=null?i:this._leftWidth,this._rightWidth=(n=t.rightWidth)!=null?n:this._rightWidth,this._topHeight=(s=t.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=t.bottomHeight)!=null?o:this._bottomHeight;const a=this.positions,l=this._leftWidth+this._rightWidth,u=this.width>l?1:this.width/l,h=this._topHeight+this._bottomHeight,c=this.height>h?1:this.height/h,p=Math.min(u,c);a[9]=a[11]=a[13]=a[15]=this._topHeight*p,a[17]=a[19]=a[21]=a[23]=this.height-this._bottomHeight*p,a[25]=a[27]=a[29]=a[31]=this.height,a[2]=a[10]=a[18]=a[26]=this._leftWidth*p,a[4]=a[12]=a[20]=a[28]=this.width-this._rightWidth*p,a[6]=a[14]=a[22]=a[30]=this.width,this.getBuffer("aPosition").update()}updateUvs(t){var e,r,i,n,s,o;this._originalWidth=(e=t.originalWidth)!=null?e:this._originalWidth,this._originalHeight=(r=t.originalHeight)!=null?r:this._originalHeight,this._leftWidth=(i=t.leftWidth)!=null?i:this._leftWidth,this._rightWidth=(n=t.rightWidth)!=null?n:this._rightWidth,this._topHeight=(s=t.topHeight)!=null?s:this._topHeight,this._bottomHeight=(o=t.bottomHeight)!=null?o:this._bottomHeight,t.textureMatrix&&this._textureMatrix.copyFrom(t.textureMatrix);const a=this._textureMatrix,l=this.uvs;l[0]=l[8]=l[16]=l[24]=0,l[1]=l[3]=l[5]=l[7]=0,l[6]=l[14]=l[22]=l[30]=1,l[25]=l[27]=l[29]=l[31]=1;const u=1/this._originalWidth,h=1/this._originalHeight;l[2]=l[10]=l[18]=l[26]=u*this._leftWidth,l[9]=l[11]=l[13]=l[15]=h*this._topHeight,l[4]=l[12]=l[20]=l[28]=1-u*this._rightWidth,l[17]=l[19]=l[21]=l[23]=1-h*this._bottomHeight,R0(a,l),this.getBuffer("aUV").update()}};let Ma=hg;Ma.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};function R0(t,e,r){r!=null||(r=e);const i=t.a,n=t.b,s=t.c,o=t.d,a=t.tx,l=t.ty;for(let u=0;u<e.length;u+=2){const h=e[u],c=e[u+1];r[u]=h*i+c*s+a,r[u+1]=h*n+c*o+l}return r}var k0=Object.defineProperty,Vi=Object.getOwnPropertySymbols,cg=Object.prototype.hasOwnProperty,dg=Object.prototype.propertyIsEnumerable,pg=(t,e,r)=>e in t?k0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,O0=(t,e)=>{for(var r in e||(e={}))cg.call(e,r)&&pg(t,r,e[r]);if(Vi)for(var r of Vi(e))dg.call(e,r)&&pg(t,r,e[r]);return t},F0=(t,e)=>{var r={};for(var i in t)cg.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&Vi)for(var i of Vi(t))e.indexOf(i)<0&&dg.call(t,i)&&(r[i]=t[i]);return r};const Lt=class extends Y{constructor(t){var e,r,i,n;t instanceof A&&(t={texture:t});const s=t,{leftWidth:o,rightWidth:a,topHeight:l,bottomHeight:u,texture:h}=s,c=F0(s,["leftWidth","rightWidth","topHeight","bottomHeight","texture"]),p=h!=null?h:Lt.defaultOptions.texture,d=p.layout.defaultBorders,f=new Ma(Qe({width:p.width,height:p.height,originalWidth:p.width,originalHeight:p.height,leftWidth:(e=o!=null?o:d==null?void 0:d.left)!=null?e:Lt.defaultOptions.leftWidth,topHeight:(r=l!=null?l:d==null?void 0:d.top)!=null?r:Lt.defaultOptions.topHeight,rightWidth:(i=a!=null?a:d==null?void 0:d.right)!=null?i:Lt.defaultOptions.rightWidth,bottomHeight:(n=u!=null?u:d==null?void 0:d.bottom)!=null?n:Lt.defaultOptions.bottomHeight,textureMatrix:p.textureMatrix.mapCoord}));super(O0({view:new Pr(Qe({geometry:f,texture:p})),label:"NineSliceSprite"},c)),this.allowChildren=!1}get width(){return this.view.geometry.width}set width(t){this.view.geometry.updatePositions({width:t})}get height(){return this.view.geometry.height}set height(t){this.view.geometry.updatePositions({height:t})}get leftWidth(){return this.view.geometry._leftWidth}set leftWidth(t){this.view.geometry.updateUvs({leftWidth:t})}get topHeight(){return this.view.geometry._topHeight}set topHeight(t){this.view.geometry.updateUvs({topHeight:t})}get rightWidth(){return this.view.geometry._rightWidth}set rightWidth(t){this.view.geometry.updateUvs({rightWidth:t})}get bottomHeight(){return this.view.geometry._bottomHeight}set bottomHeight(t){this.view.geometry.updateUvs({bottomHeight:t})}get texture(){return this.view.texture}set texture(t){t!==this.view.texture&&(this.view.geometry.updateUvs({originalWidth:t.width,originalHeight:t.height,textureMatrix:t.textureMatrix.mapCoord}),this.view.texture=t)}get roundPixels(){return!!this.view.roundPixels}set roundPixels(t){this.view.roundPixels=t?1:0}};let Ba=Lt;Ba.defaultOptions={texture:A.EMPTY,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10};class U0 extends Ba{constructor(...e){let r=e[0];r instanceof A&&(O(G,"NineSlicePlane now uses the options object {texture, leftWidth, rightWidth, topHeight, bottomHeight}"),r={texture:r,leftWidth:e[1],topHeight:e[2],rightWidth:e[3],bottomHeight:e[4]}),O(G,"NineSlicePlane is deprecated. Use NineSliceSprite instead."),super(r)}}function I0(t,e){const{frameWidth:r,frameHeight:i}=t;return e.scale(1/r,1/i),e}var G0=Object.defineProperty,Yi=Object.getOwnPropertySymbols,fg=Object.prototype.hasOwnProperty,gg=Object.prototype.propertyIsEnumerable,mg=(t,e,r)=>e in t?G0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,$0=(t,e)=>{for(var r in e||(e={}))fg.call(e,r)&&mg(t,r,e[r]);if(Yi)for(var r of Yi(e))gg.call(e,r)&&mg(t,r,e[r]);return t},L0=(t,e)=>{var r={};for(var i in t)fg.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&Yi)for(var i of Yi(t))e.indexOf(i)<0&&gg.call(t,i)&&(r[i]=t[i]);return r};class D0 extends Y{constructor(...e){let r=e[0];r instanceof Gt&&(O(G,"Mesh: use new Mesh({ geometry, shader }) instead"),r={geometry:r,shader:e[1]},e[3]&&(O(G,"Mesh: topology argument has been removed, use geometry.topology instead"),r.geometry.topology=e[3]));const i=r,{geometry:n,shader:s,texture:o}=i,a=L0(i,["geometry","shader","texture"]);super($0({view:new Pr(Qe({geometry:n,shader:s,texture:o})),label:"Mesh"},a)),this.allowChildren=!1}get texture(){return this.view.texture}set texture(e){this.view.texture=e}get geometry(){return this.view.geometry}set geometry(e){this.view.geometry=e}get material(){return O(G,"mesh.material property has been removed, use mesh.shader instead"),this.view.shader}get shader(){return this.view.shader}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}class Ji extends Oe{constructor(e,r=!0){super(e[0]instanceof A?e[0]:e[0].texture),this._textures=null,this._durations=null,this._autoUpdate=r,this._isConnectedToTicker=!1,this.animationSpeed=1,this.loop=!0,this.updateAnchor=!1,this.onComplete=null,this.onFrameChange=null,this.onLoop=null,this._currentTime=0,this._playing=!1,this._previousFrame=null,this.textures=e}stop(){this._playing&&(this._playing=!1,this._autoUpdate&&this._isConnectedToTicker&&(ce.shared.remove(this.update,this),this._isConnectedToTicker=!1))}play(){this._playing||(this._playing=!0,this._autoUpdate&&!this._isConnectedToTicker&&(ce.shared.add(this.update,this,Je.HIGH),this._isConnectedToTicker=!0))}gotoAndStop(e){this.stop(),this.currentFrame=e}gotoAndPlay(e){this.currentFrame=e,this.play()}update(e){if(!this._playing)return;const r=e.deltaTime,i=this.animationSpeed*r,n=this.currentFrame;if(this._durations!==null){let s=this._currentTime%1*this._durations[this.currentFrame];for(s+=i/60*1e3;s<0;)this._currentTime--,s+=this._durations[this.currentFrame];const o=Math.sign(this.animationSpeed*r);for(this._currentTime=Math.floor(this._currentTime);s>=this._durations[this.currentFrame];)s-=this._durations[this.currentFrame]*o,this._currentTime+=o;this._currentTime+=s/this._durations[this.currentFrame]}else this._currentTime+=i;this._currentTime<0&&!this.loop?(this.gotoAndStop(0),this.onComplete&&this.onComplete()):this._currentTime>=this._textures.length&&!this.loop?(this.gotoAndStop(this._textures.length-1),this.onComplete&&this.onComplete()):n!==this.currentFrame&&(this.loop&&this.onLoop&&(this.animationSpeed>0&&this.currentFrame<n||this.animationSpeed<0&&this.currentFrame>n)&&this.onLoop(),this._updateTexture())}_updateTexture(){const e=this.currentFrame;this._previousFrame!==e&&(this._previousFrame=e,this.texture=this._textures[e],this.updateAnchor&&this.anchor.copyFrom(this.texture.layout.defaultAnchor),this.onFrameChange&&this.onFrameChange(this.currentFrame))}destroy(){this.stop(),super.destroy(),this.onComplete=null,this.onFrameChange=null,this.onLoop=null}static fromFrames(e){const r=[];for(let i=0;i<e.length;++i)r.push(A.from(e[i]));return new Ji(r)}static fromImages(e){const r=[];for(let i=0;i<e.length;++i)r.push(A.from(e[i]));return new Ji(r)}get totalFrames(){return this._textures.length}get textures(){return this._textures}set textures(e){if(e[0]instanceof A)this._textures=e,this._durations=null;else{this._textures=[],this._durations=[];for(let r=0;r<e.length;r++)this._textures.push(e[r].texture),this._durations.push(e[r].time)}this._previousFrame=null,this.gotoAndStop(0),this._updateTexture()}get currentFrame(){let e=Math.floor(this._currentTime)%this._textures.length;return e<0&&(e+=this._textures.length),e}set currentFrame(e){if(e<0||e>this.totalFrames-1)throw new Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);const r=this.currentFrame;this._currentTime=e,r!==this.currentFrame&&this._updateTexture()}get playing(){return this._playing}get autoUpdate(){return this._autoUpdate}set autoUpdate(e){e!==this._autoUpdate&&(this._autoUpdate=e,!this._autoUpdate&&this._isConnectedToTicker?(ce.shared.remove(this.update,this),this._isConnectedToTicker=!1):this._autoUpdate&&!this._isConnectedToTicker&&this._playing&&(ce.shared.add(this.update,this),this._isConnectedToTicker=!0))}}class bg{constructor({matrix:e,observer:r}={}){this.dirty=!0,this._matrix=e!=null?e:new k,this.observer=r,this.position=new se(this,0,0),this.scale=new se(this,1,1),this.pivot=new se(this,0,0),this.skew=new se(this,0,0),this._rotation=0,this._cx=1,this._sx=0,this._cy=0,this._sy=1}get matrix(){const e=this._matrix;return this.dirty&&(e.a=this._cx*this.scale.x,e.b=this._sx*this.scale.x,e.c=this._cy*this.scale.y,e.d=this._sy*this.scale.y,e.tx=this.position.x-(this.pivot.x*e.a+this.pivot.y*e.c),e.ty=this.position.y-(this.pivot.x*e.b+this.pivot.y*e.d),this.dirty=!1),e}onUpdate(e){var r;this.dirty=!0,e===this.skew&&this.updateSkew(),(r=this.observer)==null||r.onUpdate(this)}updateSkew(){this._cx=Math.cos(this._rotation+this.skew.y),this._sx=Math.sin(this._rotation+this.skew.y),this._cy=-Math.sin(this._rotation-this.skew.x),this._sy=Math.cos(this._rotation-this.skew.x),this.dirty=!0}setFromMatrix(e){e.decompose(this),this.dirty=!0}get rotation(){return this._rotation}set rotation(e){this._rotation!==e&&(this._rotation=e,this.updateSkew())}}var z0=Object.defineProperty,vg=Object.getOwnPropertySymbols,N0=Object.prototype.hasOwnProperty,H0=Object.prototype.propertyIsEnumerable,yg=(t,e,r)=>e in t?z0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,xg=(t,e)=>{for(var r in e||(e={}))N0.call(e,r)&&yg(t,r,e[r]);if(vg)for(var r of vg(e))H0.call(e,r)&&yg(t,r,e[r]);return t};const _g=class{constructor(t){this.owner=At,this.uid=q("tilingSpriteView"),this.renderPipeId="tilingSprite",this.batched=!0,this.roundPixels=0,this._bounds=[0,1,0,0],this._boundsDirty=!0,t=xg(xg({},_g.defaultOptions),t),this.anchor=new se(this,0,0),this._applyAnchorToTexture=t.applyAnchorToTexture,this.texture=t.texture,this._width=t.width,this._height=t.height,this._tileTransform=new bg({observer:this})}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}set texture(t){this._texture!==t&&(this._texture=t,this.onUpdate())}get texture(){return this._texture}set width(t){this._width=t,this.onUpdate()}get width(){return this._width}set height(t){this._height=t,this.onUpdate()}get height(){return this._height}_updateBounds(){const t=this._bounds,e=this.anchor,r=this._width,i=this._height;t[1]=-e._x*r,t[0]=t[1]+r,t[3]=-e._y*i,t[2]=t[3]+i}addBounds(t){const e=this.bounds;t.addFrame(e[0],e[2],e[1],e[3])}containsPoint(t){const e=this.bounds[2],r=this.bounds[3],i=-e*this.anchor.x;let n=0;return t.x>=i&&t.x<i+e&&(n=-r*this.anchor.y,t.y>=n&&t.y<n+r)}onUpdate(){this._boundsDirty=!0,this._didUpdate=!0,this.owner.onViewUpdate()}destroy(t=!1){if(this.anchor=null,this._tileTransform=null,this._bounds=null,typeof t=="boolean"?t:t==null?void 0:t.texture){const e=typeof t=="boolean"?t:t==null?void 0:t.textureSource;this._texture.destroy(e)}this._texture=null}};let Ra=_g;Ra.defaultOptions={texture:A.WHITE,width:256,height:256,applyAnchorToTexture:!1};var j0=Object.defineProperty,Xi=Object.getOwnPropertySymbols,wg=Object.prototype.hasOwnProperty,Tg=Object.prototype.propertyIsEnumerable,Sg=(t,e,r)=>e in t?j0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,W0=(t,e)=>{for(var r in e||(e={}))wg.call(e,r)&&Sg(t,r,e[r]);if(Xi)for(var r of Xi(e))Tg.call(e,r)&&Sg(t,r,e[r]);return t},V0=(t,e)=>{var r={};for(var i in t)wg.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&Xi)for(var i of Xi(t))e.indexOf(i)<0&&Tg.call(t,i)&&(r[i]=t[i]);return r};class Y0 extends Y{constructor(e){const r=e!=null?e:{},{texture:i,width:n,height:s,applyAnchorToTexture:o}=r,a=V0(r,["texture","width","height","applyAnchorToTexture"]);super(W0({view:new Ra(Qe({texture:i,width:n,height:s,applyAnchorToTexture:o})),label:"TilingSprite"},a)),this.allowChildren=!1}set texture(e){this.view.texture=e}get texture(){return this.view.texture}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}get width(){return this.view.width}set width(e){this.view.width=e}get height(){return this.view.height}set height(e){this.view.height=e}get tilePosition(){return this.view._tileTransform.position}set tilePosition(e){this.view._tileTransform.position.copyFrom(e)}get tileScale(){return this.view._tileTransform.scale}set tileScale(e){this.view._tileTransform.scale.copyFrom(e)}set tileRotation(e){this.view._tileTransform.rotation=e}get tileRotation(){return this.view._tileTransform.rotation}get tileTransform(){return this.view._tileTransform}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}function Pg(t){const e=t._stroke,r=t._fill,i=[`div { ${[`color: ${H.shared.setValue(r.color).toHex()}`,`font-size: ${t.fontSize}px`,`font-family: ${t.fontFamily}`,`font-weight: ${t.fontWeight}`,`font-style: ${t.fontStyle}`,`font-variant: ${t.fontVariant}`,`letter-spacing: ${t.letterSpacing}px`,`text-align: ${t.align}`,`padding: ${t.padding}px`,`white-space: ${t.whiteSpace}`,...t.lineHeight?[`line-height: ${t.lineHeight}px`]:[],...t.wordWrap?[`word-wrap: ${t.breakWords?"break-all":"break-word"}`,`max-width: ${t.wordWrapWidth}px`]:[],...e?[Eg(e)]:[],...t.dropShadow?[Ag(t.dropShadow)]:[],...t.cssOverrides].join(";")} }`];return X0(t.tagStyles,i),i.join(" ")}function Ag(t){const e=H.shared.setValue(t.color).setAlpha(t.alpha).toHexa(),r=Math.round(Math.cos(t.angle)*t.distance),i=Math.round(Math.sin(t.angle)*t.distance),n=`${r}px ${i}px`;return t.blur>0?`text-shadow: ${n} ${t.blur}px ${e}`:`text-shadow: ${n} ${e}`}function Eg(t){return[`-webkit-text-stroke-width: ${t.width}px`,`-webkit-text-stroke-color: ${H.shared.setValue(t.color).toHex()}`,`text-stroke-width: ${t.width}px`,`text-stroke-color: ${H.shared.setValue(t.color).toHex()}`,"paint-order: stroke"].join(";")}const Cg={fontSize:"font-size: {{VALUE}}px",fontFamily:"font-family: {{VALUE}}",fontWeight:"font-weight: {{VALUE}}",fontStyle:"font-style: {{VALUE}}",fontVariant:"font-variant: {{VALUE}}",letterSpacing:"letter-spacing: {{VALUE}}px",align:"text-align: {{VALUE}}",padding:"padding: {{VALUE}}px",whiteSpace:"white-space: {{VALUE}}",lineHeight:"line-height: {{VALUE}}px",wordWrapWidth:"max-width: {{VALUE}}px"},Mg={fill:t=>`color: ${H.shared.setValue(t).toHex()}`,breakWords:t=>`word-wrap: ${t?"break-all":"break-word"}`,stroke:Eg,dropShadow:Ag};function X0(t,e){for(const r in t){const i=t[r],n=[];for(const s in i)Mg[s]?n.push(Mg[s](i[s])):Cg[s]&&n.push(Cg[s].replace("{{VALUE}}",i[s]));e.push(`${r} { ${n.join(";")} }`)}}class zt extends vt{constructor(e={}){var r,i;super(e),this._cssOverrides=[],(r=this.cssOverrides)!=null||(this.cssOverrides=e.cssOverrides),this.tagStyles=(i=e.tagStyles)!=null?i:{}}set cssOverrides(e){this._cssOverrides=e instanceof Array?e:[e],this.update()}get cssOverrides(){return this._cssOverrides}_generateKey(){return this._styleKey=zo(this)+this._cssOverrides.join("-"),this._styleKey}update(){this._cssStyle=null,super.update()}clone(){return new zt({align:this.align,breakWords:this.breakWords,dropShadow:this.dropShadow,fill:this._fill,fontFamily:this.fontFamily,fontSize:this.fontSize,fontStyle:this.fontStyle,fontVariant:this.fontVariant,fontWeight:this.fontWeight,letterSpacing:this.letterSpacing,lineHeight:this.lineHeight,padding:this.padding,stroke:this._stroke,whiteSpace:this.whiteSpace,wordWrap:this.wordWrap,wordWrapWidth:this.wordWrapWidth,cssOverrides:this.cssOverrides})}get cssStyle(){return this._cssStyle||(this._cssStyle=Pg(this)),this._cssStyle}addOverride(...e){const r=e.filter(i=>!this.cssOverrides.includes(i));r.length>0&&(this.cssOverrides.push(...r),this.update())}removeOverride(...e){const r=e.filter(i=>this.cssOverrides.includes(i));r.length>0&&(this.cssOverrides=this.cssOverrides.filter(i=>!r.includes(i)),this.update())}set fill(e){super.fill=e}set stroke(e){super.stroke=e}}function ka(t,e){return e instanceof vt||e instanceof zt?e:t==="html"?new zt(e):new vt(e)}const q0={canvas:"text",html:"htmlText",bitmap:"bitmapText"};class Bg{constructor(e){this.uid=q("textView"),this.renderPipeId="text",this.owner=At,this.batched=!0,this.resolution=null,this._didUpdate=!0,this.roundPixels=0,this._bounds=[0,1,0,0],this._boundsDirty=!0;var r,i,n;this.text=(r=e.text)!=null?r:"";const s=(i=e.renderMode)!=null?i:this._detectRenderType(e.style);this._renderMode=s,this._style=ka(s,e.style),this.renderPipeId=q0[s],this.anchor=new se(this,0,0),this.resolution=(n=e.resolution)!=null?n:null}set text(e){e=e.toString(),this._text!==e&&(this._text=e,this.onUpdate())}get text(){return this._text}get style(){return this._style}set style(e){var r;e=e||{},(r=this._style)==null||r.off("update",this.onUpdate,this),this._style=ka(this._renderMode,e),this._style.on("update",this.onUpdate,this),this.onUpdate()}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}addBounds(e){const r=this.bounds;e.addFrame(r[0],r[2],r[1],r[3])}containsPoint(e){const r=this.bounds[2],i=this.bounds[3],n=-r*this.anchor.x;let s=0;return e.x>=n&&e.x<n+r&&(s=-i*this.anchor.y,e.y>=s&&e.y<s+i)}onUpdate(){this._didUpdate=!0,this._boundsDirty=!0,this.owner.onViewUpdate()}_getKey(){return`${this.text}:${this._style.styleKey}`}_updateBounds(){const e=this._bounds,r=this._style.padding,i=this.anchor;if(this.renderPipeId==="bitmapText"){const n=Vo.measureText(this.text,this._style),s=n.scale,o=n.offsetY*s,a=n.width*s,l=n.height*s;e[0]=-i._x*a-r,e[1]=e[0]+a,e[2]=-i._y*(l+o)-r,e[3]=e[2]+l}else if(this.renderPipeId==="htmlText"){const n=Jo(this.text,this._style),{width:s,height:o}=n;e[0]=-i._x*s-r,e[1]=e[0]+s,e[2]=-i._y*o-r,e[3]=e[2]+o}else{const n=ie.measureText(this.text,this._style),{width:s,height:o}=n;e[0]=-i._x*s-r,e[1]=e[0]+s,e[2]=-i._y*o-r,e[3]=e[2]+o}}_detectRenderType(e){if(e instanceof zt)return"html";const r=Z.get(e==null?void 0:e.fontFamily);return r instanceof Li||r instanceof qr?"bitmap":"canvas"}destroy(e=!1){this.owner=null,this._bounds=null,this.anchor=null,this._style.destroy(e),this._style=null,this._text=null}}var K0=Object.defineProperty,qi=Object.getOwnPropertySymbols,Rg=Object.prototype.hasOwnProperty,kg=Object.prototype.propertyIsEnumerable,Og=(t,e,r)=>e in t?K0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Z0=(t,e)=>{for(var r in e||(e={}))Rg.call(e,r)&&Og(t,r,e[r]);if(qi)for(var r of qi(e))kg.call(e,r)&&Og(t,r,e[r]);return t},Q0=(t,e)=>{var r={};for(var i in t)Rg.call(t,i)&&e.indexOf(i)<0&&(r[i]=t[i]);if(t!=null&&qi)for(var i of qi(t))e.indexOf(i)<0&&kg.call(t,i)&&(r[i]=t[i]);return r};class Oa extends Y{constructor(...e){let r=e[0];(typeof r=="string"||e[1])&&(O(G,'use new Text({ text: "hi!", style }) instead'),r={text:r,style:e[1]});const i=r,{style:n,text:s,renderMode:o,resolution:a}=i,l=Q0(i,["style","text","renderMode","resolution"]);super(Z0({view:new Bg(Qe({style:n,text:s,renderMode:o,resolution:a})),label:"Text"},l)),this.allowChildren=!1}get anchor(){return this.view.anchor}set anchor(e){this.view.anchor.x=e.x,this.view.anchor.y=e.y}set text(e){this.view.text=e}get text(){return this.view.text}set style(e){this.view.style=e}get style(){return this.view.style}get roundPixels(){return!!this.view.roundPixels}set roundPixels(e){this.view.roundPixels=e?1:0}}class J0 extends Oa{constructor(...e){O(G,'use new Text({ text: "hi!", style, renderMode: "bitmap" }) instead');let r=e[0];(typeof r=="string"||e[1])&&(r={text:r,style:e[1]}),r.renderMode="bitmap",super(r)}}class e1 extends Oa{constructor(...e){O(G,'use new Text({ text: "hi!", style, renderMode: "html" }) instead');let r=e[0];(typeof r=="string"||e[1])&&(r={text:r,style:e[1]}),r.renderMode="html",super(r)}}const t1=/^\s*data:(?:([\w-]+)\/([\w+.-]+))?(?:;charset=([\w-]+))?(?:;(base64))?,(.*)/i;async function r1(t,e,r=200){const i=await e.extract.base64(t);await e.encoder.commandFinished;const n=r;console.log(`logging texture ${t.source.width}px ${t.source.height}px`);const s=["font-size: 1px;",`padding: ${n}px 300px;`,`background: url(${i}) no-repeat;`,"background-size: contain;"].join(" ");console.log("%c ",s)}var i1=Object.defineProperty,n1=Object.defineProperties,s1=Object.getOwnPropertyDescriptors,Fg=Object.getOwnPropertySymbols,o1=Object.prototype.hasOwnProperty,a1=Object.prototype.propertyIsEnumerable,Ug=(t,e,r)=>e in t?i1(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Ig=(t,e)=>{for(var r in e||(e={}))o1.call(e,r)&&Ug(t,r,e[r]);if(Fg)for(var r of Fg(e))a1.call(e,r)&&Ug(t,r,e[r]);return t},l1=(t,e)=>n1(t,s1(e));const u1=["#000080","#228B22","#8B0000","#4169E1","#008080","#800000","#9400D3","#FF8C00","#556B2F","#8B008B"];let h1=0;function Gg(t,e=0,r={color:"#000000"}){t.isLayerRoot&&(r.color=u1[h1++]);let i="";for(let o=0;o<e;o++)i+="    ";let n=t.label;!n&&t instanceof Oe&&(n=`sprite:${t.view.texture.label}`);let s=`%c ${i}|- ${n} (worldX:${t.worldTransform.tx}, layerX:${t.layerTransform.tx}, localX:${t.x})`;t.isLayerRoot&&(s+=" (LayerGroup)"),t.filters&&(s+="(*filters)"),console.log(s,`color:${r.color}; font-weight:bold;`),e++;for(let o=0;o<t.children.length;o++){const a=t.children[o];Gg(a,e,Ig({},r))}}function $g(t,e=0,r={index:0,color:"#000000"}){let i="";for(let s=0;s<e;s++)i+="    ";const n=`%c ${i}- ${r.index}: ${t.root.label} worldX:${t.worldTransform.tx}`;console.log(n,`color:${r.color}; font-weight:bold;`),e++;for(let s=0;s<t.layerGroupChildren.length;s++){const o=t.layerGroupChildren[s];$g(o,e,l1(Ig({},r),{index:s}))}}let Fa=0;const Lg=500;function c1(...t){Fa!==Lg&&(Fa++,Fa===Lg?console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS."):console.warn("PixiJS Warning: ",...t))}var d1=`fn getLuminosity(c: vec3<f32>) -> f32 {
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
}`;export{An as AbstractBitmapFont,hr as AbstractRenderer,Jt as AccessibilitySystem,Ac as AlphaFilter,Jn as AlphaMask,Ds as AlphaMaskPipe,Ji as AnimatedSprite,ss as Application,dr as Assets,Ah as AssetsClass,xr as BUFFER_TYPE,wh as BackgroundLoader,Di as BackgroundSystem,Gs as Batch,Os as BatchGeometry,Is as BatchTextureArray,ki as BatchableGraphics,Up as BatchableMesh,Gi as BatchableSprite,$s as Batcher,Ls as BatcherPipe,z as BigPool,Be as BindGroup,ha as BindGroupSystem,qr as BitmapFont,Vo as BitmapFontManager,J0 as BitmapText,Yo as BitmapTextPipe,te as BlendModeFilter,ta as BlendModePipe,Dc as BlurFilter,gr as BlurFilterPass,pe as Bounds,Ll as BrowserAdapter,we as Buffer,rs as BufferImageSource,Ai as BufferResource,ca as BufferSystem,N as BufferUsage,me as CLEAR,Z as Cache,ze as CanvasPool,Jp as CanvasPoolClass,oi as CanvasSource,ie as CanvasTextMetrics,Xo as CanvasTextPipe,Ko as CanvasTextSystem,Ki as Circle,H as Color,es as ColorMask,zs as ColorMaskPipe,wy as ColorMatrixFilter,Y as Container,t1 as DATA_URI,nl as DEG_TO_RAD,Ea as DEPRECATED_SCALE_MODES,Aa as DEPRECATED_WRAP_MODES,j as DOMAdapter,h0 as DRAW_MODES,Ty as DisplacementFilter,Li as DynamicBitmapFont,Zi as Ellipse,th as EventBoundary,ue as EventEmitter,ar as EventSystem,Le as EventsTicker,b as ExtensionType,zi as ExtractSystem,nh as FederatedContainer,Dt as FederatedEvent,sr as FederatedMouseEvent,xe as FederatedPointerEvent,dt as FederatedWheelEvent,ir as FillGradient,Ln as FillPattern,Ce as Filter,$r as FilterEffect,_s as FilterPipe,Ts as FilterSystem,Mr as FontStylePromiseCache,fs as GAUSSIAN_VALUES,c0 as GLSL_TO_STD40_SIZE,Ti as GL_FORMATS,js as GL_TARGETS,D as GL_TYPES,$d as GL_WRAP_MODES,ia as GenerateTextureSystem,pi as Geometry,Si as GlBackBufferSystem,ks as GlBatchAdaptor,Gd as GlBuffer,Hs as GlBufferSystem,Ys as GlColorMaskSystem,wi as GlContextSystem,Xs as GlEncoderSystem,Vs as GlGeometrySystem,co as GlGraphicsAdaptor,po as GlMeshAdaptor,_e as GlProgram,ep as GlProgramData,Vd as GlRenderTarget,Zs as GlRenderTargetSystem,io as GlShaderSystem,oo as GlStateSystem,Qs as GlStencilSystem,cp as GlTexture,ho as GlTextureSystem,no as GlUniformGroupSystem,na as GlobalUniformSystem,Fs as GpuBatchAdaptor,be as GpuBlendModesToPixi,da as GpuColorMaskSystem,pa as GpuDeviceSystem,fa as GpuEncoderSystem,Sa as GpuGraphicsAdaptor,Op as GpuGraphicsContext,Pa as GpuMeshAdapter,Xf as GpuMipmapGenerator,Ae as GpuProgram,Q_ as GpuReadBuffer,Wf as GpuRenderTarget,ya as GpuRenderTargetSystem,xa as GpuShaderSystem,_a as GpuStateSystem,ke as GpuStencilModesToPixi,ga as GpuStencilSystem,Ta as GpuTextureSystem,ma as GpuUniformBatchPipe,ba as GpuUniformBufferPipe,w0 as Graphics,je as GraphicsContext,Fp as GraphicsContextRenderData,Oo as GraphicsContextSystem,xt as GraphicsPath,Uo as GraphicsPipe,Do as GraphicsView,e1 as HTMLText,Zo as HTMLTextPipe,ea as HTMLTextRenderData,zt as HTMLTextStyle,Br as HTMLTextSystem,Hi as HelloSystem,fx as IGLUniformData,at as ImageSource,cn as InstructionSet,_l as LayerGroup,go as LayerPipe,Fd as LayerRenderable,xo as LayerSystem,Ph as Loader,Ge as LoaderParserPriority,Te as MAX_TEXTURES,Jf as MSAA_QUALITY,Lr as MaskEffectManager,dl as MaskEffectManagerClass,od as MaskFilter,k as Matrix,D0 as Mesh,Gt as MeshGeometry,Io as MeshPipe,Pr as MeshView,xn as NOOP,Ma as NineSliceGeometry,U0 as NineSlicePlane,Ba as NineSliceSprite,qc as NoiseFilter,se as ObservablePoint,rl as PI_2,va as PipelineSystem,Ca as PlaneGeometry,W as Point,yt as Polygon,hl as Pool,cl as PoolGroupClass,$i as ProxyRenderable,$o as QuadGeometry,il as RAD_TO_DEG,Q as Rectangle,Ft as RenderTarget,wf as RenderTexture,Re as RendererType,yn as ResizePlugin,Pt as Resolver,Qi as RoundedRectangle,p0 as SCALE_MODES,ne as STENCIL_MODES,Pu as SVGParser,mu as SVGToGraphicsPath,tx as ScissorMask,Xp as SdfShader,Ee as Shader,Ct as ShaderStage,wu as ShapePath,ua as SharedRenderPipes,la as SharedSystems,rd as ShockwaveFilter,Oe as Sprite,Go as SpritePipe,ah as SpriteView,ri as Spritesheet,Se as State,ts as StencilMask,Ns as StencilMaskPipe,ai as SystemRunner,Oa as Text,Kr as TextFormat,vt as TextStyle,Bg as TextView,A as Texture,kr as TextureGCSystem,Sn as TextureLayout,Pn as TextureMatrix,le as TexturePool,Mc as TexturePoolClass,he as TextureSource,tr as TextureStyle,f0 as TextureUvs,ce as Ticker,Wr as TickerListener,vn as TickerPlugin,Y0 as TilingSprite,Lo as TilingSpritePipe,Hp as TilingSpriteShader,Ra as TilingSpriteView,bg as Transform,Ua as Triangle,fn as UPDATE_BLEND,zr as UPDATE_COLOR,Je as UPDATE_PRIORITY,dm as UPDATE_TRANSFORM,Nr as UPDATE_VISIBLE,zf as UniformBufferBatch,oa as UniformBufferSystem,re as UniformGroup,aa as VERSION,We as VideoSource,ji as ViewSystem,Us as ViewableBuffer,sa as WGSL_TO_STD40_SIZE,d0 as WRAP_MODES,Df as WebGLRenderer,Qf as WebGPURenderer,jn as WorkerManager,En as XMLFormat,Cn as XMLStringFormat,hn as _getGlobalBounds,bn as accessibilityTarget,Ps as addBits,ni as addMaskBounds,si as addMaskLocalBounds,ps as alphaWgsl,jp as applyMatrix,uo as applyStyleParams,yh as autoDetectRenderer,zl as autoDetectSource,vi as batchSamplersUniformGroup,eu as bitmapFontCachePlugin,Xh as blendTemplateFrag,qh as blendTemplateVert,Kh as blendTemplateWgsl,Oc as blurTemplateWgsl,Rn as buildAdaptiveBezier,vu as buildAdaptiveQuadratic,Fn as buildArc,yu as buildArcTo,_u as buildArcToSvg,gt as buildCircle,Rp as buildContextBatches,S0 as buildGeometryFromPath,Ud as buildInstructions,Ap as buildLine,Mo as buildPolygon,Bo as buildRectangle,wo as buildSimpleUvs,Ro as buildTriangle,_o as buildUvs,ru as cacheTextureArray,Yd as calculateProjection,nt as checkDataUrl,st as checkExtension,ol as childrenHelperMixin,Tp as closePointEps,yr as collectAllRenderables,mo as collectLayerGroups,Fo as color32BitToUniform,fi as colorBit,gi as colorBitGl,zc as colorMatrixFilterFrag,bs as colorMatrixFilterWgsl,Qx as colorToUniform,gp as compareModeToGlCompare,cd as compileHighShader,dd as compileHighShaderGl,Bt as compileHighShaderGlProgram,Mt as compileHighShaderGpuProgram,As as compileHooks,Es as compileInputs,hd as compileOutputs,Js as compileShader,ht as convertFillInputToFillStyle,ye as convertToList,Vr as copySearchParams,Yr as createIdFromString,Uu as createStringVariations,Wn as createTexture,Pf as createUBOElements,Ku as crossOrigin,To as curveEps,ms as defaultFilterVert,Lh as defaultUniformValue,to as defaultValue,Qe as definedProps,O as deprecation,iu as detectAvif,su as detectDefaults,ou as detectMp4,au as detectOgv,Xn as detectVideoAlphaMode,lu as detectWebm,uu as detectWebp,Zu as determineCrossOrigin,Nc as displacementFrag,Hc as displacementVert,vs as displacementWgsl,So as earcut,pl as effectsMixin,At as emptyViewObserver,ws as ensureIsBuffer,Eh as ensurePrecision,ka as ensureTextStyle,fo as executeInstructions,V as extensions,nf as extractFontFamilies,hi as extractStructAndGroups,_i as fastCopy,ad as findHooksRx,fl as findMixin,Er as fontStringFromTextStyle,Wy as formatShader,md as fragmentGPUTemplate,vd as fragmentGlTemplate,Bc as generateBlurFragSource,kc as generateBlurGlProgram,Fc as generateBlurProgram,Rc as generateBlurVertSource,Ny as generateGPULayout,Ih as generateGpuLayoutGroups,Hy as generateLayout,Gh as generateLayoutHash,lp as generateProgram,zo as generateTextStyleKey,mi as generateTextureBatchBit,bi as generateTextureBatchBitGl,m0 as generateUID,Af as generateUniformBufferSync,up as generateUniformsSync,ip as getAttributeData,jo as getBitmapTextLayout,Cr as getCanvasFillStyle,Pi as getCanvasTexture,ll as getFilterEffect,lf as getFontCss,fu as getFontFamilyName,Dd as getGlInfoFromFormat,qt as getGlobalBounds,id as getGlobalRenderableBounds,He as getLocalBounds,Qn as getMatrixRelativeToParent,Bh as getMaxFragmentPrecision,Sp as getOrientationOfPoints,ml as getParent,qo as getPo2TextureFromSource,zn as getResolutionOfUrl,uf as getSVGUrl,hf as getTemporaryCanvasFromImage,Mh as getTestContext,yi as getTextureBatchBindGroup,I0 as getTextureDefaultMatrix,np as getUniformBufferData,sp as getUniformData,dp as glUploadBufferImageResource,ao as glUploadImageResource,pp as glUploadVideoResource,yd as globalUniformsBit,xd as globalUniformsBitGl,Vf as gpuUploadBufferImageResource,wa as gpuUploadImageResource,Yf as gpuUploadVideoResource,I as groupD8,d1 as hslWgsl,ci as hslgl,di as hslgpu,Cs as injectBits,Il as isMobile,ty as isPow2,qs as isRenderingToScreen,rf as isSafari,nr as isSingleItem,sf as loadFontAsBase64,Qo as loadFontCSS,Nu as loadImageBitmap,hu as loadJson,cf as loadSVGImage,Ou as loadSvg,Vn as loadTextures,cu as loadTxt,Qu as loadVideoTextures,gu as loadWebFont,Ot as localUniformBit,vr as localUniformBitGl,Rd as localUniformBitGroup2,Wp as localUniformMSDFBit,ry as log2,r1 as logDebugTexture,$g as logLayerGroupScene,ap as logProgramError,Gg as logScene,Vp as mSDFBit,Yp as mSDFBitGl,mp as mapFormatToGlFormat,bp as mapFormatToGlInternalFormat,vp as mapFormatToGlType,tp as mapSize,ro as mapType,hp as mapWebGLBlendModesToPixi,nd as maskFrag,sd as maskVert,Ss as maskWgsl,Jo as measureHtmlText,bl as measureMixin,yx as migrateFragmentFromV7toV8,fp as mipmapScaleModeToGlFilter,Bi as mixColors,bo as mixHexColors,Mx as mixStandardAnd32BitColors,b0 as multiplyHexColors,pt as nextPow2,jc as noiseFrag,ys as noiseWgsl,Yt as normalizeExtensionPriority,vl as onRenderMixin,de as path,un as removeItems,$h as removeStructAndGroupDuplicates,Ho as resolveCharacters,Ju as resolveTextureUrl,Nl as resourceToTexture,ul as returnFilterEffect,Rt as roundPixelsBit,kt as roundPixelsBitGl,Cf as sayHello,lo as scaleModeToGlFilter,Rh as setProgramName,kh as setProgramVersion,Kc as shockwaveFrag,Zc as shockwaveVert,xs as shockwaveWgsl,yl as sortMixin,oh as spritesheetAsset,Mn as testImageFormat,Zr as testVideoFormat,Pg as textStyleToCSS,kd as textureBit,Od as textureBitGl,zp as tilingBit,Np as tilingBitGl,xl as toLocalGlobalMixin,Ri as transformVertices,Co as triangulateWithHoles,Ni as uniformBufferParsers,Ci as uniformParsers,Ax as unpremultiplyAlpha,vo as updateLayerGroupTransforms,xp as updateLayerTransform,Ue as updateLocalTransform,ur as updateQuadBounds,yo as updateTransformAndChildren,Kt as updateTransformBackwards,v0 as updateWorldTransform,G as v8_0_0,wp as validateRenderables,gd as vertexGPUTemplate,bd as vertexGlTemplate,c1 as warn,Mi as wrapModeToGlAddress,tu as xmlBitmapFontLoader};
//# sourceMappingURL=pixi.min.mjs.map
