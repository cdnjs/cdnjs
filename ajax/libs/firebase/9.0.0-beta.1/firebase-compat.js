!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("@firebase/app"),require("@firebase/auth/internal"),require("@firebase/database-compat"),require("@firebase/firestore-compat"),require("@firebase/functions"),require("@firebase/messaging"),require("@firebase/storage-compat"),require("@firebase/performance"),require("@firebase/analytics"),require("@firebase/remote-config")):"function"==typeof define&&define.amd?define(["@firebase/app","@firebase/auth/internal","@firebase/database-compat","@firebase/firestore-compat","@firebase/functions","@firebase/messaging","@firebase/storage-compat","@firebase/performance","@firebase/analytics","@firebase/remote-config"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).firebase=t(e.modularAPIs,e.internal,null,null,e.functions,e.messaging,null,e.performance,e.analytics,e.remoteConfig)}(this,(function(e,t,r,n,o,i,a,s,u,c){"use strict";function l(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var f=l(e);!function(e){if(!e.fetch){var t="URLSearchParams"in e,r="Symbol"in e&&"iterator"in Symbol,n="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),o="FormData"in e,i="ArrayBuffer"in e;if(i)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],s=function(e){return e&&DataView.prototype.isPrototypeOf(e)},u=ArrayBuffer.isView||function(e){return e&&a.indexOf(Object.prototype.toString.call(e))>-1};h.prototype.append=function(e,t){e=f(e),t=d(t);var r=this.map[e];this.map[e]=r?r+","+t:t},h.prototype.delete=function(e){delete this.map[f(e)]},h.prototype.get=function(e){return e=f(e),this.has(e)?this.map[e]:null},h.prototype.has=function(e){return this.map.hasOwnProperty(f(e))},h.prototype.set=function(e,t){this.map[f(e)]=d(t)},h.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},h.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),p(e)},h.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),p(e)},h.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),p(e)},r&&(h.prototype[Symbol.iterator]=h.prototype.entries);var c=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},b.call(_.prototype),b.call(S.prototype),S.prototype.clone=function(){return new S(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},S.error=function(){var e=new S(null,{status:0,statusText:""});return e.type="error",e};var l=[301,302,303,307,308];S.redirect=function(e,t){if(-1===l.indexOf(t))throw new RangeError("Invalid status code");return new S(null,{status:t,headers:{location:e}})},e.Headers=h,e.Request=_,e.Response=S,e.fetch=function(e,t){return new Promise((function(r,o){var i=new _(e,t),a=new XMLHttpRequest;a.onload=function(){var e,t,n={status:a.status,statusText:a.statusText,headers:(e=a.getAllResponseHeaders()||"",t=new h,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var r=e.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();t.append(n,o)}})),t)};n.url="responseURL"in a?a.responseURL:n.headers.get("X-Request-URL");var o="response"in a?a.response:a.responseText;r(new S(o,n))},a.onerror=function(){o(new TypeError("Network request failed"))},a.ontimeout=function(){o(new TypeError("Network request failed"))},a.open(i.method,i.url,!0),"include"===i.credentials?a.withCredentials=!0:"omit"===i.credentials&&(a.withCredentials=!1),"responseType"in a&&n&&(a.responseType="blob"),i.headers.forEach((function(e,t){a.setRequestHeader(t,e)})),a.send(void 0===i._bodyInit?null:i._bodyInit)}))},e.fetch.polyfill=!0}function f(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function d(e){return"string"!=typeof e&&(e=String(e)),e}function p(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return r&&(t[Symbol.iterator]=function(){return t}),t}function h(e){this.map={},e instanceof h?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function g(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function v(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function y(e){var t=new FileReader,r=v(t);return t.readAsArrayBuffer(e),r}function m(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function b(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(n&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(o&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(t&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(i&&n&&s(e))this._bodyArrayBuffer=m(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!i||!ArrayBuffer.prototype.isPrototypeOf(e)&&!u(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=m(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n&&(this.blob=function(){var e=g(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?g(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(y)}),this.text=function(){var e=g(this);if(e)return e;if(this._bodyBlob)return function(e){var t=new FileReader,r=v(t);return t.readAsText(e),r}(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),n=0;n<t.length;n++)r[n]=String.fromCharCode(t[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},o&&(this.formData=function(){return this.text().then(E)}),this.json=function(){return this.text().then(JSON.parse)},this}function _(e,t){var r,n,o=(t=t||{}).body;if(e instanceof _){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new h(e.headers)),this.method=e.method,this.mode=e.mode,o||null==e._bodyInit||(o=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new h(t.headers)),this.method=(r=t.method||this.method||"GET",n=r.toUpperCase(),c.indexOf(n)>-1?n:r),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function E(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(n),decodeURIComponent(o))}})),t}function S(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new h(t.headers),this.url=t.url||"",this._initBody(e)}}("undefined"!=typeof self?self:void 0);var d="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function p(e){var t={exports:{}};return e(t,t.exports),t.exports}var h=function(e){return e&&e.Math==Math&&e},g=h("object"==typeof globalThis&&globalThis)||h("object"==typeof window&&window)||h("object"==typeof self&&self)||h("object"==typeof d&&d)||function(){return this}()||Function("return this")(),v=function(e){try{return!!e()}catch(e){return!0}},y=!v((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),m={}.propertyIsEnumerable,b=Object.getOwnPropertyDescriptor,_={f:b&&!m.call({1:2},1)?function(e){var t=b(this,e);return!!t&&t.enumerable}:m},E=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},S={}.toString,w=function(e){return S.call(e).slice(8,-1)},I="".split,A=v((function(){return!Object("z").propertyIsEnumerable(0)}))?function(e){return"String"==w(e)?I.call(e,""):Object(e)}:Object,O=function(e){if(null==e)throw TypeError("Can't call method on "+e);return e},T=function(e){return A(O(e))},R=function(e){return"object"==typeof e?null!==e:"function"==typeof e},P=function(e,t){if(!R(e))return e;var r,n;if(t&&"function"==typeof(r=e.toString)&&!R(n=r.call(e)))return n;if("function"==typeof(r=e.valueOf)&&!R(n=r.call(e)))return n;if(!t&&"function"==typeof(r=e.toString)&&!R(n=r.call(e)))return n;throw TypeError("Can't convert object to primitive value")},N={}.hasOwnProperty,C=function(e,t){return N.call(e,t)},L=g.document,j=R(L)&&R(L.createElement),k=function(e){return j?L.createElement(e):{}},x=!y&&!v((function(){return 7!=Object.defineProperty(k("div"),"a",{get:function(){return 7}}).a})),M=Object.getOwnPropertyDescriptor,D={f:y?M:function(e,t){if(e=T(e),t=P(t,!0),x)try{return M(e,t)}catch(e){}if(C(e,t))return E(!_.f.call(e,t),e[t])}},U=function(e){if(!R(e))throw TypeError(String(e)+" is not an object");return e},F=Object.defineProperty,B={f:y?F:function(e,t,r){if(U(e),t=P(t,!0),U(r),x)try{return F(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(e[t]=r.value),e}},W=y?function(e,t,r){return B.f(e,t,E(1,r))}:function(e,t,r){return e[t]=r,e},V=function(e,t){try{W(g,e,t)}catch(r){g[e]=t}return t},H="__core-js_shared__",G=g[H]||V(H,{}),z=Function.toString;"function"!=typeof G.inspectSource&&(G.inspectSource=function(e){return z.call(e)});var q,K,Y,J=G.inspectSource,$=g.WeakMap,Q="function"==typeof $&&/native code/.test(J($)),X=!1,Z=p((function(e){(e.exports=function(e,t){return G[e]||(G[e]=void 0!==t?t:{})})("versions",[]).push({version:"3.8.1",mode:"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})})),ee=0,te=Math.random(),re=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++ee+te).toString(36)},ne=Z("keys"),oe=function(e){return ne[e]||(ne[e]=re(e))},ie={},ae=g.WeakMap;if(Q){var se=G.state||(G.state=new ae),ue=se.get,ce=se.has,le=se.set;q=function(e,t){return t.facade=e,le.call(se,e,t),t},K=function(e){return ue.call(se,e)||{}},Y=function(e){return ce.call(se,e)}}else{var fe=oe("state");ie[fe]=!0,q=function(e,t){return t.facade=e,W(e,fe,t),t},K=function(e){return C(e,fe)?e[fe]:{}},Y=function(e){return C(e,fe)}}var de,pe={set:q,get:K,has:Y,enforce:function(e){return Y(e)?K(e):q(e,{})},getterFor:function(e){return function(t){var r;if(!R(t)||(r=K(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return r}}},he=p((function(e){var t=pe.get,r=pe.enforce,n=String(String).split("String");(e.exports=function(e,t,o,i){var a,s=!!i&&!!i.unsafe,u=!!i&&!!i.enumerable,c=!!i&&!!i.noTargetGet;"function"==typeof o&&("string"!=typeof t||C(o,"name")||W(o,"name",t),(a=r(o)).source||(a.source=n.join("string"==typeof t?t:""))),e!==g?(s?!c&&e[t]&&(u=!0):delete e[t],u?e[t]=o:W(e,t,o)):u?e[t]=o:V(t,o)})(Function.prototype,"toString",(function(){return"function"==typeof this&&t(this).source||J(this)}))})),ge=g,ve=function(e){return"function"==typeof e?e:void 0},ye=function(e,t){return arguments.length<2?ve(ge[e])||ve(g[e]):ge[e]&&ge[e][t]||g[e]&&g[e][t]},me=Math.ceil,be=Math.floor,_e=function(e){return isNaN(e=+e)?0:(e>0?be:me)(e)},Ee=Math.min,Se=function(e){return e>0?Ee(_e(e),9007199254740991):0},we=Math.max,Ie=Math.min,Ae=function(e){return function(t,r,n){var o,i=T(t),a=Se(i.length),s=function(e,t){var r=_e(e);return r<0?we(r+t,0):Ie(r,t)}(n,a);if(e&&r!=r){for(;a>s;)if((o=i[s++])!=o)return!0}else for(;a>s;s++)if((e||s in i)&&i[s]===r)return e||s||0;return!e&&-1}},Oe={includes:Ae(!0),indexOf:Ae(!1)}.indexOf,Te=function(e,t){var r,n=T(e),o=0,i=[];for(r in n)!C(ie,r)&&C(n,r)&&i.push(r);for(;t.length>o;)C(n,r=t[o++])&&(~Oe(i,r)||i.push(r));return i},Re=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Pe=Re.concat("length","prototype"),Ne={f:Object.getOwnPropertyNames||function(e){return Te(e,Pe)}},Ce={f:Object.getOwnPropertySymbols},Le=ye("Reflect","ownKeys")||function(e){var t=Ne.f(U(e)),r=Ce.f;return r?t.concat(r(e)):t},je=function(e,t){for(var r=Le(t),n=B.f,o=D.f,i=0;i<r.length;i++){var a=r[i];C(e,a)||n(e,a,o(t,a))}},ke=/#|\.prototype\./,xe=function(e,t){var r=De[Me(e)];return r==Fe||r!=Ue&&("function"==typeof t?v(t):!!t)},Me=xe.normalize=function(e){return String(e).replace(ke,".").toLowerCase()},De=xe.data={},Ue=xe.NATIVE="N",Fe=xe.POLYFILL="P",Be=xe,We=D.f,Ve=function(e,t){var r,n,o,i,a,s=e.target,u=e.global,c=e.stat;if(r=u?g:c?g[s]||V(s,{}):(g[s]||{}).prototype)for(n in t){if(i=t[n],o=e.noTargetGet?(a=We(r,n))&&a.value:r[n],!Be(u?n:s+(c?".":"#")+n,e.forced)&&void 0!==o){if(typeof i==typeof o)continue;je(i,o)}(e.sham||o&&o.sham)&&W(i,"sham",!0),he(r,n,i,e)}},He=function(e){return Object(O(e))},Ge=!v((function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype})),ze=oe("IE_PROTO"),qe=Object.prototype,Ke=Ge?Object.getPrototypeOf:function(e){return e=He(e),C(e,ze)?e[ze]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?qe:null},Ye=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,r={};try{(e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(r,[]),t=r instanceof Array}catch(e){}return function(r,n){return U(r),function(e){if(!R(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype")}(n),t?e.call(r,n):r.__proto__=n,r}}():void 0),Je=Object.keys||function(e){return Te(e,Re)},$e=y?Object.defineProperties:function(e,t){U(e);for(var r,n=Je(t),o=n.length,i=0;o>i;)B.f(e,r=n[i++],t[r]);return e},Qe=ye("document","documentElement"),Xe=oe("IE_PROTO"),Ze=function(){},et=function(e){return"<script>"+e+"</"+"script>"},tt=function(){try{de=document.domain&&new ActiveXObject("htmlfile")}catch(e){}var e,t;tt=de?function(e){e.write(et("")),e.close();var t=e.parentWindow.Object;return e=null,t}(de):((t=k("iframe")).style.display="none",Qe.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(et("document.F=Object")),e.close(),e.F);for(var r=Re.length;r--;)delete tt.prototype[Re[r]];return tt()};ie[Xe]=!0;var rt=Object.create||function(e,t){var r;return null!==e?(Ze.prototype=U(e),r=new Ze,Ze.prototype=null,r[Xe]=e):r=tt(),void 0===t?r:$e(r,t)},nt=!!Object.getOwnPropertySymbols&&!v((function(){return!String(Symbol())})),ot=nt&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,it=Z("wks"),at=g.Symbol,st=ot?at:at&&at.withoutSetter||re,ut=function(e){return C(it,e)||(nt&&C(at,e)?it[e]=at[e]:it[e]=st("Symbol."+e)),it[e]},ct={},lt=ut("iterator"),ft=Array.prototype,dt=function(e){return void 0!==e&&(ct.Array===e||ft[lt]===e)},pt=function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function");return e},ht=function(e,t,r){if(pt(e),void 0===t)return e;switch(r){case 0:return function(){return e.call(t)};case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,o){return e.call(t,r,n,o)}}return function(){return e.apply(t,arguments)}},gt={};gt[ut("toStringTag")]="z";var vt="[object z]"===String(gt),yt=ut("toStringTag"),mt="Arguments"==w(function(){return arguments}()),bt=vt?w:function(e){var t,r,n;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),yt))?r:mt?w(t):"Object"==(n=w(t))&&"function"==typeof t.callee?"Arguments":n},_t=ut("iterator"),Et=function(e){if(null!=e)return e[_t]||e["@@iterator"]||ct[bt(e)]},St=function(e){var t=e.return;if(void 0!==t)return U(t.call(e)).value},wt=function(e,t){this.stopped=e,this.result=t},It=function(e,t,r){var n,o,i,a,s,u,c,l=r&&r.that,f=!(!r||!r.AS_ENTRIES),d=!(!r||!r.IS_ITERATOR),p=!(!r||!r.INTERRUPTED),h=ht(t,l,1+f+p),g=function(e){return n&&St(n),new wt(!0,e)},v=function(e){return f?(U(e),p?h(e[0],e[1],g):h(e[0],e[1])):p?h(e,g):h(e)};if(d)n=e;else{if("function"!=typeof(o=Et(e)))throw TypeError("Target is not iterable");if(dt(o)){for(i=0,a=Se(e.length);a>i;i++)if((s=v(e[i]))&&s instanceof wt)return s;return new wt(!1)}n=o.call(e)}for(u=n.next;!(c=u.call(n)).done;){try{s=v(c.value)}catch(e){throw St(n),e}if("object"==typeof s&&s&&s instanceof wt)return s}return new wt(!1)},At=function(e,t){var r=this;if(!(r instanceof At))return new At(e,t);Ye&&(r=Ye(new Error(void 0),Ke(r))),void 0!==t&&W(r,"message",String(t));var n=[];return It(e,n.push,{that:n}),W(r,"errors",n),r};At.prototype=rt(Error.prototype,{constructor:E(5,At),message:E(5,""),name:E(5,"AggregateError")}),Ve({global:!0},{AggregateError:At});var Ot=vt?{}.toString:function(){return"[object "+bt(this)+"]"};vt||he(Object.prototype,"toString",Ot,{unsafe:!0});var Tt=g.Promise,Rt=function(e,t,r){for(var n in t)he(e,n,t[n],r);return e},Pt=B.f,Nt=ut("toStringTag"),Ct=function(e,t,r){e&&!C(e=r?e:e.prototype,Nt)&&Pt(e,Nt,{configurable:!0,value:t})},Lt=ut("species"),jt=function(e){var t=ye(e),r=B.f;y&&t&&!t[Lt]&&r(t,Lt,{configurable:!0,get:function(){return this}})},kt=function(e,t,r){if(!(e instanceof t))throw TypeError("Incorrect "+(r?r+" ":"")+"invocation");return e},xt=ut("iterator"),Mt=!1;try{var Dt=0,Ut={next:function(){return{done:!!Dt++}},return:function(){Mt=!0}};Ut[xt]=function(){return this},Array.from(Ut,(function(){throw 2}))}catch(e){}var Ft,Bt,Wt,Vt=function(e,t){if(!t&&!Mt)return!1;var r=!1;try{var n={};n[xt]=function(){return{next:function(){return{done:r=!0}}}},e(n)}catch(e){}return r},Ht=ut("species"),Gt=function(e,t){var r,n=U(e).constructor;return void 0===n||null==(r=U(n)[Ht])?t:pt(r)},zt=ye("navigator","userAgent")||"",qt=/(iphone|ipod|ipad).*applewebkit/i.test(zt),Kt="process"==w(g.process),Yt=g.location,Jt=g.setImmediate,$t=g.clearImmediate,Qt=g.process,Xt=g.MessageChannel,Zt=g.Dispatch,er=0,tr={},rr="onreadystatechange",nr=function(e){if(tr.hasOwnProperty(e)){var t=tr[e];delete tr[e],t()}},or=function(e){return function(){nr(e)}},ir=function(e){nr(e.data)},ar=function(e){g.postMessage(e+"",Yt.protocol+"//"+Yt.host)};Jt&&$t||(Jt=function(e){for(var t=[],r=1;arguments.length>r;)t.push(arguments[r++]);return tr[++er]=function(){("function"==typeof e?e:Function(e)).apply(void 0,t)},Ft(er),er},$t=function(e){delete tr[e]},Kt?Ft=function(e){Qt.nextTick(or(e))}:Zt&&Zt.now?Ft=function(e){Zt.now(or(e))}:Xt&&!qt?(Wt=(Bt=new Xt).port2,Bt.port1.onmessage=ir,Ft=ht(Wt.postMessage,Wt,1)):g.addEventListener&&"function"==typeof postMessage&&!g.importScripts&&Yt&&"file:"!==Yt.protocol&&!v(ar)?(Ft=ar,g.addEventListener("message",ir,!1)):Ft=rr in k("script")?function(e){Qe.appendChild(k("script")).onreadystatechange=function(){Qe.removeChild(this),nr(e)}}:function(e){setTimeout(or(e),0)});var sr,ur,cr,lr,fr,dr,pr,hr,gr={set:Jt,clear:$t},vr=D.f,yr=gr.set,mr=g.MutationObserver||g.WebKitMutationObserver,br=g.document,_r=g.process,Er=g.Promise,Sr=vr(g,"queueMicrotask"),wr=Sr&&Sr.value;wr||(sr=function(){var e,t;for(Kt&&(e=_r.domain)&&e.exit();ur;){t=ur.fn,ur=ur.next;try{t()}catch(e){throw ur?lr():cr=void 0,e}}cr=void 0,e&&e.enter()},!qt&&!Kt&&mr&&br?(fr=!0,dr=br.createTextNode(""),new mr(sr).observe(dr,{characterData:!0}),lr=function(){dr.data=fr=!fr}):Er&&Er.resolve?(pr=Er.resolve(void 0),hr=pr.then,lr=function(){hr.call(pr,sr)}):lr=Kt?function(){_r.nextTick(sr)}:function(){yr.call(g,sr)});var Ir,Ar,Or=wr||function(e){var t={fn:e,next:void 0};cr&&(cr.next=t),ur||(ur=t,lr()),cr=t},Tr=function(e){var t,r;this.promise=new e((function(e,n){if(void 0!==t||void 0!==r)throw TypeError("Bad Promise constructor");t=e,r=n})),this.resolve=pt(t),this.reject=pt(r)},Rr={f:function(e){return new Tr(e)}},Pr=function(e,t){if(U(e),R(t)&&t.constructor===e)return t;var r=Rr.f(e);return(0,r.resolve)(t),r.promise},Nr=function(e){try{return{error:!1,value:e()}}catch(e){return{error:!0,value:e}}},Cr=g.process,Lr=Cr&&Cr.versions,jr=Lr&&Lr.v8;jr?Ar=(Ir=jr.split("."))[0]+Ir[1]:zt&&(!(Ir=zt.match(/Edge\/(\d+)/))||Ir[1]>=74)&&(Ir=zt.match(/Chrome\/(\d+)/))&&(Ar=Ir[1]);var kr,xr,Mr,Dr,Ur=Ar&&+Ar,Fr=gr.set,Br=ut("species"),Wr="Promise",Vr=pe.get,Hr=pe.set,Gr=pe.getterFor(Wr),zr=Tt,qr=g.TypeError,Kr=g.document,Yr=g.process,Jr=ye("fetch"),$r=Rr.f,Qr=$r,Xr=!!(Kr&&Kr.createEvent&&g.dispatchEvent),Zr="function"==typeof PromiseRejectionEvent,en="unhandledrejection",tn=Be(Wr,(function(){if(!(J(zr)!==String(zr))){if(66===Ur)return!0;if(!Kt&&!Zr)return!0}if(Ur>=51&&/native code/.test(zr))return!1;var e=zr.resolve(1),t=function(e){e((function(){}),(function(){}))};return(e.constructor={})[Br]=t,!(e.then((function(){}))instanceof t)})),rn=tn||!Vt((function(e){zr.all(e).catch((function(){}))})),nn=function(e){var t;return!(!R(e)||"function"!=typeof(t=e.then))&&t},on=function(e,t){if(!e.notified){e.notified=!0;var r=e.reactions;Or((function(){for(var n=e.value,o=1==e.state,i=0;r.length>i;){var a,s,u,c=r[i++],l=o?c.ok:c.fail,f=c.resolve,d=c.reject,p=c.domain;try{l?(o||(2===e.rejection&&cn(e),e.rejection=1),!0===l?a=n:(p&&p.enter(),a=l(n),p&&(p.exit(),u=!0)),a===c.promise?d(qr("Promise-chain cycle")):(s=nn(a))?s.call(a,f,d):f(a)):d(n)}catch(e){p&&!u&&p.exit(),d(e)}}e.reactions=[],e.notified=!1,t&&!e.rejection&&sn(e)}))}},an=function(e,t,r){var n,o;Xr?((n=Kr.createEvent("Event")).promise=t,n.reason=r,n.initEvent(e,!1,!0),g.dispatchEvent(n)):n={promise:t,reason:r},!Zr&&(o=g["on"+e])?o(n):e===en&&function(e,t){var r=g.console;r&&r.error&&(1===arguments.length?r.error(e):r.error(e,t))}("Unhandled promise rejection",r)},sn=function(e){Fr.call(g,(function(){var t,r=e.facade,n=e.value;if(un(e)&&(t=Nr((function(){Kt?Yr.emit("unhandledRejection",n,r):an(en,r,n)})),e.rejection=Kt||un(e)?2:1,t.error))throw t.value}))},un=function(e){return 1!==e.rejection&&!e.parent},cn=function(e){Fr.call(g,(function(){var t=e.facade;Kt?Yr.emit("rejectionHandled",t):an("rejectionhandled",t,e.value)}))},ln=function(e,t,r){return function(n){e(t,n,r)}},fn=function(e,t,r){e.done||(e.done=!0,r&&(e=r),e.value=t,e.state=2,on(e,!0))},dn=function(e,t,r){if(!e.done){e.done=!0,r&&(e=r);try{if(e.facade===t)throw qr("Promise can't be resolved itself");var n=nn(t);n?Or((function(){var r={done:!1};try{n.call(t,ln(dn,r,e),ln(fn,r,e))}catch(t){fn(r,t,e)}})):(e.value=t,e.state=1,on(e,!1))}catch(t){fn({done:!1},t,e)}}};tn&&(zr=function(e){kt(this,zr,Wr),pt(e),kr.call(this);var t=Vr(this);try{e(ln(dn,t),ln(fn,t))}catch(e){fn(t,e)}},(kr=function(e){Hr(this,{type:Wr,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:void 0})}).prototype=Rt(zr.prototype,{then:function(e,t){var r=Gr(this),n=$r(Gt(this,zr));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=Kt?Yr.domain:void 0,r.parent=!0,r.reactions.push(n),0!=r.state&&on(r,!1),n.promise},catch:function(e){return this.then(void 0,e)}}),xr=function(){var e=new kr,t=Vr(e);this.promise=e,this.resolve=ln(dn,t),this.reject=ln(fn,t)},Rr.f=$r=function(e){return e===zr||e===Mr?new xr(e):Qr(e)},"function"==typeof Tt&&(Dr=Tt.prototype.then,he(Tt.prototype,"then",(function(e,t){var r=this;return new zr((function(e,t){Dr.call(r,e,t)})).then(e,t)}),{unsafe:!0}),"function"==typeof Jr&&Ve({global:!0,enumerable:!0,forced:!0},{fetch:function(e){return Pr(zr,Jr.apply(g,arguments))}}))),Ve({global:!0,wrap:!0,forced:tn},{Promise:zr}),Ct(zr,Wr,!1),jt(Wr),Mr=ye(Wr),Ve({target:Wr,stat:!0,forced:tn},{reject:function(e){var t=$r(this);return t.reject.call(void 0,e),t.promise}}),Ve({target:Wr,stat:!0,forced:tn},{resolve:function(e){return Pr(this,e)}}),Ve({target:Wr,stat:!0,forced:rn},{all:function(e){var t=this,r=$r(t),n=r.resolve,o=r.reject,i=Nr((function(){var r=pt(t.resolve),i=[],a=0,s=1;It(e,(function(e){var u=a++,c=!1;i.push(void 0),s++,r.call(t,e).then((function(e){c||(c=!0,i[u]=e,--s||n(i))}),o)})),--s||n(i)}));return i.error&&o(i.value),r.promise},race:function(e){var t=this,r=$r(t),n=r.reject,o=Nr((function(){var o=pt(t.resolve);It(e,(function(e){o.call(t,e).then(r.resolve,n)}))}));return o.error&&n(o.value),r.promise}}),Ve({target:"Promise",stat:!0},{allSettled:function(e){var t=this,r=Rr.f(t),n=r.resolve,o=r.reject,i=Nr((function(){var r=pt(t.resolve),o=[],i=0,a=1;It(e,(function(e){var s=i++,u=!1;o.push(void 0),a++,r.call(t,e).then((function(e){u||(u=!0,o[s]={status:"fulfilled",value:e},--a||n(o))}),(function(e){u||(u=!0,o[s]={status:"rejected",reason:e},--a||n(o))}))})),--a||n(o)}));return i.error&&o(i.value),r.promise}});var pn="No one promise resolved";Ve({target:"Promise",stat:!0},{any:function(e){var t=this,r=Rr.f(t),n=r.resolve,o=r.reject,i=Nr((function(){var r=pt(t.resolve),i=[],a=0,s=1,u=!1;It(e,(function(e){var c=a++,l=!1;i.push(void 0),s++,r.call(t,e).then((function(e){l||u||(u=!0,n(e))}),(function(e){l||u||(l=!0,i[c]=e,--s||o(new(ye("AggregateError"))(i,pn)))}))})),--s||o(new(ye("AggregateError"))(i,pn))}));return i.error&&o(i.value),r.promise}});var hn=!!Tt&&v((function(){Tt.prototype.finally.call({then:function(){}},(function(){}))}));Ve({target:"Promise",proto:!0,real:!0,forced:hn},{finally:function(e){var t=Gt(this,ye("Promise")),r="function"==typeof e;return this.then(r?function(r){return Pr(t,e()).then((function(){return r}))}:e,r?function(r){return Pr(t,e()).then((function(){throw r}))}:e)}}),"function"!=typeof Tt||Tt.prototype.finally||he(Tt.prototype,"finally",ye("Promise").prototype.finally);var gn,vn,yn,mn=function(e){return function(t,r){var n,o,i=String(O(t)),a=_e(r),s=i.length;return a<0||a>=s?e?"":void 0:(n=i.charCodeAt(a))<55296||n>56319||a+1===s||(o=i.charCodeAt(a+1))<56320||o>57343?e?i.charAt(a):n:e?i.slice(a,a+2):o-56320+(n-55296<<10)+65536}},bn={codeAt:mn(!1),charAt:mn(!0)},_n=ut("iterator"),En=!1;[].keys&&("next"in(yn=[].keys())?(vn=Ke(Ke(yn)))!==Object.prototype&&(gn=vn):En=!0),null==gn&&(gn={}),C(gn,_n)||W(gn,_n,(function(){return this}));var Sn={IteratorPrototype:gn,BUGGY_SAFARI_ITERATORS:En},wn=Sn.IteratorPrototype,In=function(){return this},An=Sn.IteratorPrototype,On=Sn.BUGGY_SAFARI_ITERATORS,Tn=ut("iterator"),Rn="keys",Pn="values",Nn="entries",Cn=function(){return this},Ln=function(e,t,r,n,o,i,a){!function(e,t,r){var n=t+" Iterator";e.prototype=rt(wn,{next:E(1,r)}),Ct(e,n,!1),ct[n]=In}(r,t,n);var s,u,c,l=function(e){if(e===o&&g)return g;if(!On&&e in p)return p[e];switch(e){case Rn:case Pn:case Nn:return function(){return new r(this,e)}}return function(){return new r(this)}},f=t+" Iterator",d=!1,p=e.prototype,h=p[Tn]||p["@@iterator"]||o&&p[o],g=!On&&h||l(o),v="Array"==t&&p.entries||h;if(v&&(s=Ke(v.call(new e)),An!==Object.prototype&&s.next&&(Ke(s)!==An&&(Ye?Ye(s,An):"function"!=typeof s[Tn]&&W(s,Tn,Cn)),Ct(s,f,!0))),o==Pn&&h&&h.name!==Pn&&(d=!0,g=function(){return h.call(this)}),p[Tn]!==g&&W(p,Tn,g),ct[t]=g,o)if(u={values:l(Pn),keys:i?g:l(Rn),entries:l(Nn)},a)for(c in u)(On||d||!(c in p))&&he(p,c,u[c]);else Ve({target:t,proto:!0,forced:On||d},u);return u},jn=bn.charAt,kn="String Iterator",xn=pe.set,Mn=pe.getterFor(kn);Ln(String,"String",(function(e){xn(this,{type:kn,string:String(e),index:0})}),(function(){var e,t=Mn(this),r=t.string,n=t.index;return n>=r.length?{value:void 0,done:!0}:(e=jn(r,n),t.index+=e.length,{value:e,done:!1})}));var Dn={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},Un=ut("unscopables"),Fn=Array.prototype;null==Fn[Un]&&B.f(Fn,Un,{configurable:!0,value:rt(null)});var Bn=function(e){Fn[Un][e]=!0},Wn="Array Iterator",Vn=pe.set,Hn=pe.getterFor(Wn),Gn=Ln(Array,"Array",(function(e,t){Vn(this,{type:Wn,target:T(e),index:0,kind:t})}),(function(){var e=Hn(this),t=e.target,r=e.kind,n=e.index++;return!t||n>=t.length?(e.target=void 0,{value:void 0,done:!0}):"keys"==r?{value:n,done:!1}:"values"==r?{value:t[n],done:!1}:{value:[n,t[n]],done:!1}}),"values");ct.Arguments=ct.Array,Bn("keys"),Bn("values"),Bn("entries");var zn=ut("iterator"),qn=ut("toStringTag"),Kn=Gn.values;for(var Yn in Dn){var Jn=g[Yn],$n=Jn&&Jn.prototype;if($n){if($n[zn]!==Kn)try{W($n,zn,Kn)}catch(e){$n[zn]=Kn}if($n[qn]||W($n,qn,Yn),Dn[Yn])for(var Qn in Gn)if($n[Qn]!==Gn[Qn])try{W($n,Qn,Gn[Qn])}catch(e){$n[Qn]=Gn[Qn]}}}ge.Promise;Ve({target:"Promise",stat:!0},{try:function(e){var t=Rr.f(this),r=Nr(e);return(r.error?t.reject:t.resolve)(r.value),t.promise}});var Xn=Array.isArray||function(e){return"Array"==w(e)},Zn=ut("species"),eo=function(e,t){var r;return Xn(e)&&("function"!=typeof(r=e.constructor)||r!==Array&&!Xn(r.prototype)?R(r)&&null===(r=r[Zn])&&(r=void 0):r=void 0),new(void 0===r?Array:r)(0===t?0:t)},to=[].push,ro=function(e){var t=1==e,r=2==e,n=3==e,o=4==e,i=6==e,a=7==e,s=5==e||i;return function(u,c,l,f){for(var d,p,h=He(u),g=A(h),v=ht(c,l,3),y=Se(g.length),m=0,b=f||eo,_=t?b(u,y):r||a?b(u,0):void 0;y>m;m++)if((s||m in g)&&(p=v(d=g[m],m,h),e))if(t)_[m]=p;else if(p)switch(e){case 3:return!0;case 5:return d;case 6:return m;case 2:to.call(_,d)}else switch(e){case 4:return!1;case 7:to.call(_,d)}return i?-1:n||o?o:_}},no={forEach:ro(0),map:ro(1),filter:ro(2),some:ro(3),every:ro(4),find:ro(5),findIndex:ro(6),filterOut:ro(7)},oo=Object.defineProperty,io={},ao=function(e){throw e},so=function(e,t){if(C(io,e))return io[e];t||(t={});var r=[][e],n=!!C(t,"ACCESSORS")&&t.ACCESSORS,o=C(t,0)?t[0]:ao,i=C(t,1)?t[1]:void 0;return io[e]=!!r&&!v((function(){if(n&&!y)return!0;var e={length:-1};n?oo(e,1,{enumerable:!0,get:ao}):e[1]=1,r.call(e,o,i)}))},uo=no.find,co="find",lo=!0,fo=so(co);co in[]&&Array(1).find((function(){lo=!1})),Ve({target:"Array",proto:!0,forced:lo||!fo},{find:function(e){return uo(this,e,arguments.length>1?arguments[1]:void 0)}}),Bn(co);var po=Function.call,ho=function(e,t,r){return ht(po,g[e].prototype[t],r)},go=(ho("Array","find"),no.findIndex),vo="findIndex",yo=!0,mo=so(vo);vo in[]&&Array(1).findIndex((function(){yo=!1})),Ve({target:"Array",proto:!0,forced:yo||!mo},{findIndex:function(e){return go(this,e,arguments.length>1?arguments[1]:void 0)}}),Bn(vo);ho("Array","findIndex");var bo=function(e,t,r,n){try{return n?t(U(r)[0],r[1]):t(r)}catch(t){throw St(e),t}},_o=function(e,t,r){var n=P(t);n in e?B.f(e,n,E(0,r)):e[n]=r},Eo=!Vt((function(e){Array.from(e)}));Ve({target:"Array",stat:!0,forced:Eo},{from:function(e){var t,r,n,o,i,a,s=He(e),u="function"==typeof this?this:Array,c=arguments.length,l=c>1?arguments[1]:void 0,f=void 0!==l,d=Et(s),p=0;if(f&&(l=ht(l,c>2?arguments[2]:void 0,2)),null==d||u==Array&&dt(d))for(r=new u(t=Se(s.length));t>p;p++)a=f?l(s[p],p):s[p],_o(r,p,a);else for(i=(o=d.call(s)).next,r=new u;!(n=i.call(o)).done;p++)a=f?bo(o,l,[n.value,p],!0):n.value,_o(r,p,a);return r.length=p,r}});ge.Array.from;var So=no.some,wo=function(e,t){var r=[][e];return!!r&&v((function(){r.call(null,t||function(){throw 1},1)}))}("some"),Io=so("some");Ve({target:"Array",proto:!0,forced:!wo||!Io},{some:function(e){return So(this,e,arguments.length>1?arguments[1]:void 0)}});ho("Array","some");var Ao,Oo="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView,To=B.f,Ro=g.Int8Array,Po=Ro&&Ro.prototype,No=g.Uint8ClampedArray,Co=No&&No.prototype,Lo=Ro&&Ke(Ro),jo=Po&&Ke(Po),ko=Object.prototype,xo=(ko.isPrototypeOf,ut("toStringTag")),Mo=re("TYPED_ARRAY_TAG"),Do=Oo&&!!Ye&&"Opera"!==bt(g.opera),Uo={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},Fo={BigInt64Array:8,BigUint64Array:8},Bo=function(e){if(!R(e))return!1;var t=bt(e);return C(Uo,t)||C(Fo,t)};for(Ao in Uo)g[Ao]||(Do=!1);if((!Do||"function"!=typeof Lo||Lo===Function.prototype)&&(Lo=function(){throw TypeError("Incorrect invocation")},Do))for(Ao in Uo)g[Ao]&&Ye(g[Ao],Lo);if((!Do||!jo||jo===ko)&&(jo=Lo.prototype,Do))for(Ao in Uo)g[Ao]&&Ye(g[Ao].prototype,jo);if(Do&&Ke(Co)!==jo&&Ye(Co,jo),y&&!C(jo,xo))for(Ao in!0,To(jo,xo,{get:function(){return R(this)?this[Mo]:void 0}}),Uo)g[Ao]&&W(g[Ao],Mo,Ao);var Wo=function(e){if(Bo(e))return e;throw TypeError("Target is not a typed array")},Vo=function(e,t,r){if(y){if(r)for(var n in Uo){var o=g[n];o&&C(o.prototype,e)&&delete o.prototype[e]}jo[e]&&!r||he(jo,e,r?t:Do&&Po[e]||t)}},Ho=ut("iterator"),Go=g.Uint8Array,zo=Gn.values,qo=Gn.keys,Ko=Gn.entries,Yo=Wo,Jo=Vo,$o=Go&&Go.prototype[Ho],Qo=!!$o&&("values"==$o.name||null==$o.name),Xo=function(){return zo.call(Yo(this))};Jo("entries",(function(){return Ko.call(Yo(this))})),Jo("keys",(function(){return qo.call(Yo(this))})),Jo("values",Xo,!Qo),Jo(Ho,Xo,!Qo);var Zo=Object.assign,ei=Object.defineProperty,ti=!Zo||v((function(){if(y&&1!==Zo({b:1},Zo(ei({},"a",{enumerable:!0,get:function(){ei(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var e={},t={},r=Symbol(),n="abcdefghijklmnopqrst";return e[r]=7,n.split("").forEach((function(e){t[e]=e})),7!=Zo({},e)[r]||Je(Zo({},t)).join("")!=n}))?function(e,t){for(var r=He(e),n=arguments.length,o=1,i=Ce.f,a=_.f;n>o;)for(var s,u=A(arguments[o++]),c=i?Je(u).concat(i(u)):Je(u),l=c.length,f=0;l>f;)s=c[f++],y&&!a.call(u,s)||(r[s]=u[s]);return r}:Zo;Ve({target:"Object",stat:!0,forced:Object.assign!==ti},{assign:ti});ge.Object.assign;var ri=_.f,ni=function(e){return function(t){for(var r,n=T(t),o=Je(n),i=o.length,a=0,s=[];i>a;)r=o[a++],y&&!ri.call(n,r)||s.push(e?[r,n[r]]:n[r]);return s}},oi={entries:ni(!0),values:ni(!1)},ii=oi.entries;Ve({target:"Object",stat:!0},{entries:function(e){return ii(e)}});ge.Object.entries;var ai=oi.values;Ve({target:"Object",stat:!0},{values:function(e){return ai(e)}});ge.Object.values;var si=ut("match"),ui=function(e){if(function(e){var t;return R(e)&&(void 0!==(t=e[si])?!!t:"RegExp"==w(e))}(e))throw TypeError("The method doesn't accept regular expressions");return e},ci=ut("match"),li=function(e){var t=/./;try{"/./"[e](t)}catch(r){try{return t[ci]=!1,"/./"[e](t)}catch(e){}}return!1};Ve({target:"String",proto:!0,forced:!li("includes")},{includes:function(e){return!!~String(O(this)).indexOf(ui(e),arguments.length>1?arguments[1]:void 0)}});ho("String","includes");var fi,di=D.f,pi="".startsWith,hi=Math.min,gi=li("startsWith"),vi=!(gi||(fi=di(String.prototype,"startsWith"),!fi||fi.writable));Ve({target:"String",proto:!0,forced:!vi&&!gi},{startsWith:function(e){var t=String(O(this));ui(e);var r=Se(hi(arguments.length>1?arguments[1]:void 0,t.length)),n=String(e);return pi?pi.call(t,n,r):t.slice(r,r+n.length)===n}});ho("String","startsWith");Ve({target:"String",proto:!0},{repeat:"".repeat||function(e){var t=String(O(this)),r="",n=_e(e);if(n<0||n==1/0)throw RangeError("Wrong number of repetitions");for(;n>0;(n>>>=1)&&(t+=t))1&n&&(r+=t);return r}});ho("String","repeat");var yi=ut("species"),mi=ut("isConcatSpreadable"),bi=9007199254740991,_i="Maximum allowed index exceeded",Ei=Ur>=51||!v((function(){var e=[];return e[mi]=!1,e.concat()[0]!==e})),Si=function(e){return Ur>=51||!v((function(){var t=[];return(t.constructor={})[yi]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}("concat"),wi=function(e){if(!R(e))return!1;var t=e[mi];return void 0!==t?!!t:Xn(e)};Ve({target:"Array",proto:!0,forced:!Ei||!Si},{concat:function(e){var t,r,n,o,i,a=He(this),s=eo(a,0),u=0;for(t=-1,n=arguments.length;t<n;t++)if(wi(i=-1===t?a:arguments[t])){if(u+(o=Se(i.length))>bi)throw TypeError(_i);for(r=0;r<o;r++,u++)r in i&&_o(s,u,i[r])}else{if(u>=bi)throw TypeError(_i);_o(s,u++,i)}return s.length=u,s}});var Ii=Ne.f,Ai={}.toString,Oi="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],Ti={f:function(e){return Oi&&"[object Window]"==Ai.call(e)?function(e){try{return Ii(e)}catch(e){return Oi.slice()}}(e):Ii(T(e))}},Ri={f:ut},Pi=B.f,Ni=function(e){var t=ge.Symbol||(ge.Symbol={});C(t,e)||Pi(t,e,{value:Ri.f(e)})},Ci=no.forEach,Li=oe("hidden"),ji="Symbol",ki=ut("toPrimitive"),xi=pe.set,Mi=pe.getterFor(ji),Di=Object.prototype,Ui=g.Symbol,Fi=ye("JSON","stringify"),Bi=D.f,Wi=B.f,Vi=Ti.f,Hi=_.f,Gi=Z("symbols"),zi=Z("op-symbols"),qi=Z("string-to-symbol-registry"),Ki=Z("symbol-to-string-registry"),Yi=Z("wks"),Ji=g.QObject,$i=!Ji||!Ji.prototype||!Ji.prototype.findChild,Qi=y&&v((function(){return 7!=rt(Wi({},"a",{get:function(){return Wi(this,"a",{value:7}).a}})).a}))?function(e,t,r){var n=Bi(Di,t);n&&delete Di[t],Wi(e,t,r),n&&e!==Di&&Wi(Di,t,n)}:Wi,Xi=function(e,t){var r=Gi[e]=rt(Ui.prototype);return xi(r,{type:ji,tag:e,description:t}),y||(r.description=t),r},Zi=ot?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof Ui},ea=function(e,t,r){e===Di&&ea(zi,t,r),U(e);var n=P(t,!0);return U(r),C(Gi,n)?(r.enumerable?(C(e,Li)&&e[Li][n]&&(e[Li][n]=!1),r=rt(r,{enumerable:E(0,!1)})):(C(e,Li)||Wi(e,Li,E(1,{})),e[Li][n]=!0),Qi(e,n,r)):Wi(e,n,r)},ta=function(e,t){U(e);var r=T(t),n=Je(r).concat(ia(r));return Ci(n,(function(t){y&&!ra.call(r,t)||ea(e,t,r[t])})),e},ra=function(e){var t=P(e,!0),r=Hi.call(this,t);return!(this===Di&&C(Gi,t)&&!C(zi,t))&&(!(r||!C(this,t)||!C(Gi,t)||C(this,Li)&&this[Li][t])||r)},na=function(e,t){var r=T(e),n=P(t,!0);if(r!==Di||!C(Gi,n)||C(zi,n)){var o=Bi(r,n);return!o||!C(Gi,n)||C(r,Li)&&r[Li][n]||(o.enumerable=!0),o}},oa=function(e){var t=Vi(T(e)),r=[];return Ci(t,(function(e){C(Gi,e)||C(ie,e)||r.push(e)})),r},ia=function(e){var t=e===Di,r=Vi(t?zi:T(e)),n=[];return Ci(r,(function(e){!C(Gi,e)||t&&!C(Di,e)||n.push(Gi[e])})),n};if(nt||(he((Ui=function(){if(this instanceof Ui)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=re(e),r=function(e){this===Di&&r.call(zi,e),C(this,Li)&&C(this[Li],t)&&(this[Li][t]=!1),Qi(this,t,E(1,e))};return y&&$i&&Qi(Di,t,{configurable:!0,set:r}),Xi(t,e)}).prototype,"toString",(function(){return Mi(this).tag})),he(Ui,"withoutSetter",(function(e){return Xi(re(e),e)})),_.f=ra,B.f=ea,D.f=na,Ne.f=Ti.f=oa,Ce.f=ia,Ri.f=function(e){return Xi(ut(e),e)},y&&(Wi(Ui.prototype,"description",{configurable:!0,get:function(){return Mi(this).description}}),he(Di,"propertyIsEnumerable",ra,{unsafe:!0}))),Ve({global:!0,wrap:!0,forced:!nt,sham:!nt},{Symbol:Ui}),Ci(Je(Yi),(function(e){Ni(e)})),Ve({target:ji,stat:!0,forced:!nt},{for:function(e){var t=String(e);if(C(qi,t))return qi[t];var r=Ui(t);return qi[t]=r,Ki[r]=t,r},keyFor:function(e){if(!Zi(e))throw TypeError(e+" is not a symbol");if(C(Ki,e))return Ki[e]},useSetter:function(){$i=!0},useSimple:function(){$i=!1}}),Ve({target:"Object",stat:!0,forced:!nt,sham:!y},{create:function(e,t){return void 0===t?rt(e):ta(rt(e),t)},defineProperty:ea,defineProperties:ta,getOwnPropertyDescriptor:na}),Ve({target:"Object",stat:!0,forced:!nt},{getOwnPropertyNames:oa,getOwnPropertySymbols:ia}),Ve({target:"Object",stat:!0,forced:v((function(){Ce.f(1)}))},{getOwnPropertySymbols:function(e){return Ce.f(He(e))}}),Fi){var aa=!nt||v((function(){var e=Ui();return"[null]"!=Fi([e])||"{}"!=Fi({a:e})||"{}"!=Fi(Object(e))}));Ve({target:"JSON",stat:!0,forced:aa},{stringify:function(e,t,r){for(var n,o=[e],i=1;arguments.length>i;)o.push(arguments[i++]);if(n=t,(R(t)||void 0!==e)&&!Zi(e))return Xn(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!Zi(t))return t}),o[1]=t,Fi.apply(null,o)}})}Ui.prototype[ki]||W(Ui.prototype,ki,Ui.prototype.valueOf),Ct(Ui,ji),ie[Li]=!0,Ni("asyncIterator");var sa=B.f,ua=g.Symbol;if(y&&"function"==typeof ua&&(!("description"in ua.prototype)||void 0!==ua().description)){var ca={},la=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof la?new ua(e):void 0===e?ua():ua(e);return""===e&&(ca[t]=!0),t};je(la,ua);var fa=la.prototype=ua.prototype;fa.constructor=la;var da=fa.toString,pa="Symbol(test)"==String(ua("test")),ha=/^Symbol\((.*)\)[^)]+$/;sa(fa,"description",{configurable:!0,get:function(){var e=R(this)?this.valueOf():this,t=da.call(e);if(C(ca,e))return"";var r=pa?t.slice(7,-1):t.replace(ha,"$1");return""===r?void 0:r}}),Ve({global:!0,forced:!0},{Symbol:la})}Ni("hasInstance"),Ni("isConcatSpreadable"),Ni("iterator"),Ni("match"),Ni("matchAll"),Ni("replace"),Ni("search"),Ni("species"),Ni("split"),Ni("toPrimitive"),Ni("toStringTag"),Ni("unscopables"),Ct(g.JSON,"JSON",!0),Ct(Math,"Math",!0),Ve({global:!0},{Reflect:{}}),Ct(g.Reflect,"Reflect",!0);ge.Symbol;Ni("asyncDispose"),Ni("dispose"),Ni("observable"),Ni("patternMatch"),Ni("replaceAll");Ri.f("iterator");var ga=!v((function(){return Object.isExtensible(Object.preventExtensions({}))})),va=p((function(e){var t=B.f,r=re("meta"),n=0,o=Object.isExtensible||function(){return!0},i=function(e){t(e,r,{value:{objectID:"O"+ ++n,weakData:{}}})},a=e.exports={REQUIRED:!1,fastKey:function(e,t){if(!R(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!C(e,r)){if(!o(e))return"F";if(!t)return"E";i(e)}return e[r].objectID},getWeakData:function(e,t){if(!C(e,r)){if(!o(e))return!0;if(!t)return!1;i(e)}return e[r].weakData},onFreeze:function(e){return ga&&a.REQUIRED&&o(e)&&!C(e,r)&&i(e),e}};ie[r]=!0})),ya=function(e,t,r){var n=-1!==e.indexOf("Map"),o=-1!==e.indexOf("Weak"),i=n?"set":"add",a=g[e],s=a&&a.prototype,u=a,c={},l=function(e){var t=s[e];he(s,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(o&&!R(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return o&&!R(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return!(o&&!R(e))&&t.call(this,0===e?0:e)}:function(e,r){return t.call(this,0===e?0:e,r),this})};if(Be(e,"function"!=typeof a||!(o||s.forEach&&!v((function(){(new a).entries().next()})))))u=r.getConstructor(t,e,n,i),va.REQUIRED=!0;else if(Be(e,!0)){var f=new u,d=f[i](o?{}:-0,1)!=f,p=v((function(){f.has(1)})),h=Vt((function(e){new a(e)})),y=!o&&v((function(){for(var e=new a,t=5;t--;)e[i](t,t);return!e.has(-0)}));h||((u=t((function(t,r){kt(t,u,e);var o=function(e,t,r){var n,o;return Ye&&"function"==typeof(n=t.constructor)&&n!==r&&R(o=n.prototype)&&o!==r.prototype&&Ye(e,o),e}(new a,t,u);return null!=r&&It(r,o[i],{that:o,AS_ENTRIES:n}),o}))).prototype=s,s.constructor=u),(p||y)&&(l("delete"),l("has"),n&&l("get")),(y||d)&&l(i),o&&s.clear&&delete s.clear}return c[e]=u,Ve({global:!0,forced:u!=a},c),Ct(u,e),o||r.setStrong(u,e,n),u},ma=B.f,ba=va.fastKey,_a=pe.set,Ea=pe.getterFor,Sa={getConstructor:function(e,t,r,n){var o=e((function(e,i){kt(e,o,t),_a(e,{type:t,index:rt(null),first:void 0,last:void 0,size:0}),y||(e.size=0),null!=i&&It(i,e[n],{that:e,AS_ENTRIES:r})})),i=Ea(t),a=function(e,t,r){var n,o,a=i(e),u=s(e,t);return u?u.value=r:(a.last=u={index:o=ba(t,!0),key:t,value:r,previous:n=a.last,next:void 0,removed:!1},a.first||(a.first=u),n&&(n.next=u),y?a.size++:e.size++,"F"!==o&&(a.index[o]=u)),e},s=function(e,t){var r,n=i(e),o=ba(t);if("F"!==o)return n.index[o];for(r=n.first;r;r=r.next)if(r.key==t)return r};return Rt(o.prototype,{clear:function(){for(var e=i(this),t=e.index,r=e.first;r;)r.removed=!0,r.previous&&(r.previous=r.previous.next=void 0),delete t[r.index],r=r.next;e.first=e.last=void 0,y?e.size=0:this.size=0},delete:function(e){var t=this,r=i(t),n=s(t,e);if(n){var o=n.next,a=n.previous;delete r.index[n.index],n.removed=!0,a&&(a.next=o),o&&(o.previous=a),r.first==n&&(r.first=o),r.last==n&&(r.last=a),y?r.size--:t.size--}return!!n},forEach:function(e){for(var t,r=i(this),n=ht(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.next:r.first;)for(n(t.value,t.key,this);t&&t.removed;)t=t.previous},has:function(e){return!!s(this,e)}}),Rt(o.prototype,r?{get:function(e){var t=s(this,e);return t&&t.value},set:function(e,t){return a(this,0===e?0:e,t)}}:{add:function(e){return a(this,e=0===e?0:e,e)}}),y&&ma(o.prototype,"size",{get:function(){return i(this).size}}),o},setStrong:function(e,t,r){var n=t+" Iterator",o=Ea(t),i=Ea(n);Ln(e,t,(function(e,t){_a(this,{type:n,target:e,state:o(e),kind:t,last:void 0})}),(function(){for(var e=i(this),t=e.kind,r=e.last;r&&r.removed;)r=r.previous;return e.target&&(e.last=r=r?r.next:e.state.first)?"keys"==t?{value:r.key,done:!1}:"values"==t?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),r?"entries":"values",!r,!0),jt(t)}},wa=(ya("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),Sa),ge.Map,function(e){var t,r,n,o,i=arguments.length,a=i>1?arguments[1]:void 0;return pt(this),(t=void 0!==a)&&pt(a),null==e?new this:(r=[],t?(n=0,o=ht(a,i>2?arguments[2]:void 0,2),It(e,(function(e){r.push(o(e,n++))}))):It(e,r.push,{that:r}),new this(r))});Ve({target:"Map",stat:!0},{from:wa});var Ia=function(){for(var e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return new this(t)};Ve({target:"Map",stat:!0},{of:Ia});var Aa=function(){for(var e,t=U(this),r=pt(t.delete),n=!0,o=0,i=arguments.length;o<i;o++)e=r.call(t,arguments[o]),n=n&&e;return!!n};Ve({target:"Map",proto:!0,real:!0,forced:X},{deleteAll:function(){return Aa.apply(this,arguments)}});Ve({target:"Map",proto:!0,real:!0,forced:X},{emplace:function(e,t){var r=U(this),n=r.has(e)&&"update"in t?t.update(r.get(e),e,r):t.insert(e,r);return r.set(e,n),n}});var Oa=function(e){return Map.prototype.entries.call(e)};Ve({target:"Map",proto:!0,real:!0,forced:X},{every:function(e){var t=U(this),r=Oa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3);return!It(r,(function(e,r,o){if(!n(r,e,t))return o()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{filter:function(e){var t=U(this),r=Oa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3),o=new(Gt(t,ye("Map"))),i=pt(o.set);return It(r,(function(e,r){n(r,e,t)&&i.call(o,e,r)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),o}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{find:function(e){var t=U(this),r=Oa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3);return It(r,(function(e,r,o){if(n(r,e,t))return o(r)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{findKey:function(e){var t=U(this),r=Oa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3);return It(r,(function(e,r,o){if(n(r,e,t))return o(e)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}}),Ve({target:"Map",stat:!0},{groupBy:function(e,t){var r=new this;pt(t);var n=pt(r.has),o=pt(r.get),i=pt(r.set);return It(e,(function(e){var a=t(e);n.call(r,a)?o.call(r,a).push(e):i.call(r,a,[e])})),r}});Ve({target:"Map",proto:!0,real:!0,forced:X},{includes:function(e){return It(Oa(U(this)),(function(t,r,n){if((o=r)===(i=e)||o!=o&&i!=i)return n();var o,i}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}}),Ve({target:"Map",stat:!0},{keyBy:function(e,t){var r=new this;pt(t);var n=pt(r.set);return It(e,(function(e){n.call(r,t(e),e)})),r}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{keyOf:function(e){return It(Oa(U(this)),(function(t,r,n){if(r===e)return n(t)}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).result}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{mapKeys:function(e){var t=U(this),r=Oa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3),o=new(Gt(t,ye("Map"))),i=pt(o.set);return It(r,(function(e,r){i.call(o,n(r,e,t),r)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),o}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{mapValues:function(e){var t=U(this),r=Oa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3),o=new(Gt(t,ye("Map"))),i=pt(o.set);return It(r,(function(e,r){i.call(o,e,n(r,e,t))}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),o}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{merge:function(e){for(var t=U(this),r=pt(t.set),n=0;n<arguments.length;)It(arguments[n++],r,{that:t,AS_ENTRIES:!0});return t}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{reduce:function(e){var t=U(this),r=Oa(t),n=arguments.length<2,o=n?void 0:arguments[1];if(pt(e),It(r,(function(r,i){n?(n=!1,o=i):o=e(o,i,r,t)}),{AS_ENTRIES:!0,IS_ITERATOR:!0}),n)throw TypeError("Reduce of empty map with no initial value");return o}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{some:function(e){var t=U(this),r=Oa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3);return It(r,(function(e,r,o){if(n(r,e,t))return o()}),{AS_ENTRIES:!0,IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}}),Ve({target:"Map",proto:!0,real:!0,forced:X},{update:function(e,t){var r=U(this),n=arguments.length;pt(t);var o=r.has(e);if(!o&&n<3)throw TypeError("Updating absent value");var i=o?r.get(e):pt(n>2?arguments[2]:void 0)(e,r);return r.set(e,t(i,e,r)),r}});var Ta=function(e,t){var r,n=U(this),o=arguments.length>2?arguments[2]:void 0;if("function"!=typeof t&&"function"!=typeof o)throw TypeError("At least one callback required");return n.has(e)?(r=n.get(e),"function"==typeof t&&(r=t(r),n.set(e,r))):"function"==typeof o&&(r=o(),n.set(e,r)),r};Ve({target:"Map",proto:!0,real:!0,forced:X},{upsert:Ta}),Ve({target:"Map",proto:!0,real:!0,forced:X},{updateOrInsert:Ta});ya("Set",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),Sa),ge.Set;Ve({target:"Set",stat:!0},{from:wa}),Ve({target:"Set",stat:!0},{of:Ia});var Ra=function(){for(var e=U(this),t=pt(e.add),r=0,n=arguments.length;r<n;r++)t.call(e,arguments[r]);return e};Ve({target:"Set",proto:!0,real:!0,forced:X},{addAll:function(){return Ra.apply(this,arguments)}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{deleteAll:function(){return Aa.apply(this,arguments)}});var Pa=function(e){return Set.prototype.values.call(e)};Ve({target:"Set",proto:!0,real:!0,forced:X},{every:function(e){var t=U(this),r=Pa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3);return!It(r,(function(e,r){if(!n(e,e,t))return r()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{difference:function(e){var t=U(this),r=new(Gt(t,ye("Set")))(t),n=pt(r.delete);return It(e,(function(e){n.call(r,e)})),r}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{filter:function(e){var t=U(this),r=Pa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3),o=new(Gt(t,ye("Set"))),i=pt(o.add);return It(r,(function(e){n(e,e,t)&&i.call(o,e)}),{IS_ITERATOR:!0}),o}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{find:function(e){var t=U(this),r=Pa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3);return It(r,(function(e,r){if(n(e,e,t))return r(e)}),{IS_ITERATOR:!0,INTERRUPTED:!0}).result}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{intersection:function(e){var t=U(this),r=new(Gt(t,ye("Set"))),n=pt(t.has),o=pt(r.add);return It(e,(function(e){n.call(t,e)&&o.call(r,e)})),r}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{isDisjointFrom:function(e){var t=U(this),r=pt(t.has);return!It(e,(function(e,n){if(!0===r.call(t,e))return n()}),{INTERRUPTED:!0}).stopped}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{isSubsetOf:function(e){var t=function(e){var t=Et(e);if("function"!=typeof t)throw TypeError(String(e)+" is not iterable");return U(t.call(e))}(this),r=U(e),n=r.has;return"function"!=typeof n&&(r=new(ye("Set"))(e),n=pt(r.has)),!It(t,(function(e,t){if(!1===n.call(r,e))return t()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{isSupersetOf:function(e){var t=U(this),r=pt(t.has);return!It(e,(function(e,n){if(!1===r.call(t,e))return n()}),{INTERRUPTED:!0}).stopped}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{join:function(e){var t=U(this),r=Pa(t),n=void 0===e?",":String(e),o=[];return It(r,o.push,{that:o,IS_ITERATOR:!0}),o.join(n)}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{map:function(e){var t=U(this),r=Pa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3),o=new(Gt(t,ye("Set"))),i=pt(o.add);return It(r,(function(e){i.call(o,n(e,e,t))}),{IS_ITERATOR:!0}),o}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{reduce:function(e){var t=U(this),r=Pa(t),n=arguments.length<2,o=n?void 0:arguments[1];if(pt(e),It(r,(function(r){n?(n=!1,o=r):o=e(o,r,r,t)}),{IS_ITERATOR:!0}),n)throw TypeError("Reduce of empty set with no initial value");return o}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{some:function(e){var t=U(this),r=Pa(t),n=ht(e,arguments.length>1?arguments[1]:void 0,3);return It(r,(function(e,r){if(n(e,e,t))return r()}),{IS_ITERATOR:!0,INTERRUPTED:!0}).stopped}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{symmetricDifference:function(e){var t=U(this),r=new(Gt(t,ye("Set")))(t),n=pt(r.delete),o=pt(r.add);return It(e,(function(e){n.call(r,e)||o.call(r,e)})),r}}),Ve({target:"Set",proto:!0,real:!0,forced:X},{union:function(e){var t=U(this),r=new(Gt(t,ye("Set")))(t);return It(e,pt(r.add),{that:r}),r}});var Na=Math.floor;Ve({target:"Number",stat:!0},{isInteger:function(e){return!R(e)&&isFinite(e)&&Na(e)===e}});ge.Number.isInteger;Ve({target:"Number",stat:!0},{isNaN:function(e){return e!=e}});ge.Number.isNaN;
/*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */var Ca=function(e,t){return(Ca=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)};function La(e,t){for(var r=0,n=t.length,o=e.length;r<n;r++,o++)e[o]=t[r];return e}function ja(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var r in t)t.hasOwnProperty(r)&&"__proto__"!==r&&(e[r]=ja(e[r],t[r]));return e}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function ka(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function xa(){try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}function Ma(){return"object"==typeof navigator&&"ReactNative"===navigator.product}function Da(){return"indexedDB"in self&&null!=indexedDB}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */var Ua=function(e){function t(r,n,o){var i=e.call(this,n)||this;return i.code=r,i.customData=o,i.name="FirebaseError",Object.setPrototypeOf(i,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(i,Fa.prototype.create),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}Ca(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}(t,e),t}(Error),Fa=function(){function e(e,t,r){this.service=e,this.serviceName=t,this.errors=r}return e.prototype.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=t[0]||{},o=this.service+"/"+e,i=this.errors[e],a=i?Ba(i,n):"Error",s=this.serviceName+": "+a+" ("+o+").",u=new Ua(o,s,n);return u},e}();function Ba(e,t){return e.replace(Wa,(function(e,r){var n=t[r];return null!=n?String(n):"<"+r+"?>"}))}var Wa=/\{\$([^}]+)}/g;
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Va(e,t){var r=new Ha(e,t);return r.subscribe.bind(r)}var Ha=function(){function e(e,t){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((function(){e(r)})).catch((function(e){r.error(e)}))}return e.prototype.next=function(e){this.forEachObserver((function(t){t.next(e)}))},e.prototype.error=function(e){this.forEachObserver((function(t){t.error(e)})),this.close(e)},e.prototype.complete=function(){this.forEachObserver((function(e){e.complete()})),this.close()},e.prototype.subscribe=function(e,t,r){var n,o=this;if(void 0===e&&void 0===t&&void 0===r)throw new Error("Missing Observer.");void 0===(n=function(e,t){if("object"!=typeof e||null===e)return!1;for(var r=0,n=t;r<n.length;r++){var o=n[r];if(o in e&&"function"==typeof e[o])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:r}).next&&(n.next=Ga),void 0===n.error&&(n.error=Ga),void 0===n.complete&&(n.complete=Ga);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{o.finalError?n.error(o.finalError):n.complete()}catch(e){}})),this.observers.push(n),i},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var r=this;this.task.then((function(){if(void 0!==r.observers&&void 0!==r.observers[e])try{t(r.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))},e.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((function(){t.observers=void 0,t.onNoObservers=void 0})))},e}();function Ga(){}var za,qa,Ka=function(){function e(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}();
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(qa||(qa={}));var Ya={debug:qa.DEBUG,verbose:qa.VERBOSE,info:qa.INFO,warn:qa.WARN,error:qa.ERROR,silent:qa.SILENT},Ja=qa.INFO,$a=((za={})[qa.DEBUG]="log",za[qa.VERBOSE]="log",za[qa.INFO]="info",za[qa.WARN]="warn",za[qa.ERROR]="error",za),Qa=function(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(t<e.logLevel)){var o=(new Date).toISOString(),i=$a[t];if(!i)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[i].apply(console,La(["["+o+"]  "+e.name+":"],r))}},Xa=function(){function e(e){this.name=e,this._logLevel=Ja,this._logHandler=Qa,this._userLogHandler=null}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in qa))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?Ya[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,La([this,qa.DEBUG],e)),this._logHandler.apply(this,La([this,qa.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,La([this,qa.VERBOSE],e)),this._logHandler.apply(this,La([this,qa.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,La([this,qa.INFO],e)),this._logHandler.apply(this,La([this,qa.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,La([this,qa.WARN],e)),this._logHandler.apply(this,La([this,qa.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,La([this,qa.ERROR],e)),this._logHandler.apply(this,La([this,qa.ERROR],e))},e}();
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Za{constructor(t,r){this._delegate=t,this.firebase=r,e._addComponent(t,new Ka("app-compat",(()=>this),"PUBLIC")),this.container=t.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise((e=>{this._delegate.checkDestroyed(),e()})).then((()=>(this.firebase.INTERNAL.removeApp(this.name),e.deleteApp(this._delegate))))}_getService(t,r=e._DEFAULT_ENTRY_NAME){return this._delegate.checkDestroyed(),this._delegate.container.getProvider(t).getImmediate({identifier:r})}_removeServiceInstance(t,r=e._DEFAULT_ENTRY_NAME){this._delegate.container.getProvider(t).clearInstance(r)}_addComponent(t){e._addComponent(this._delegate,t)}_addOrOverwriteComponent(t){e._addOrOverwriteComponent(this._delegate,t)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const es=new Fa("app-compat","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."});
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
function ts(t){const r={},n={__esModule:!0,initializeApp:function(o,i={}){const a=e.initializeApp(o,i),s=new t(a,n);return r[a.name]=s,s},app:o,registerVersion:e.registerVersion,setLogLevel:e.setLogLevel,onLog:e.onLog,apps:null,SDK_VERSION:e.SDK_VERSION,INTERNAL:{registerComponent:function(r){const i=r.name,a=i.replace("-compat","");if(e._registerComponent(r)&&"PUBLIC"===r.type){const e=(e=o())=>{if("function"!=typeof e[a])throw es.create("invalid-app-argument",{appName:i});return e[a]()};void 0!==r.serviceProps&&ja(e,r.serviceProps),n[a]=e,t.prototype[a]=function(...e){return this._getService.bind(this,i).apply(this,r.multipleInstances?e:[])}}return"PUBLIC"===r.type?n[a]:null},removeApp:function(e){delete r[e]},useAsService:function(e,t){if("serverAuth"===t)return null;return t},modularAPIs:f}};function o(t){if(t=t||e._DEFAULT_ENTRY_NAME,n=r,o=t,!Object.prototype.hasOwnProperty.call(n,o))throw es.create("no-app",{appName:t});var n,o;return r[t]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(r).map((e=>r[e]))}}),o.App=t,n}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const rs=function e(){const t=ts(Za);return t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){ja(t,e)},createSubscribe:Va,ErrorFactory:Fa,deepExtend:ja}),t}(),ns=new Xa("@firebase/app-compat");
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
if("object"==typeof self&&self.self===self&&void 0!==self.firebase){ns.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");const e=self.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&ns.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}const os=rs;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
var is;e.registerVersion("@firebase/app-compat","0.0.900-exp.894b5da5a",is);
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
os.registerVersion("firebase-exp","9.0.0-beta.1","app-compat");function as(){var e;return(null===(e=null===self||void 0===self?void 0:self.location)||void 0===e?void 0:e.protocol)||null}function ss(e=ka()){return!("file:"!==as()&&"ionic:"!==as()||!e.toLowerCase().match(/iphone|ipad|ipod|android/))}function us(){return((e=ka()).indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0)&&11===(null===document||void 0===document?void 0:document.documentMode);var e}function cs(e=ka()){return us()||function(e=ka()){return/Edge\/\d+/.test(e)}(e)}function ls(){try{const e=self.localStorage,r=t._generateEventId();if(e)return e.setItem(r,"1"),e.removeItem(r),!cs()||Da()}catch(e){return fs()&&Da()}return!1}function fs(){return"undefined"!=typeof global&&"WorkerGlobalScope"in global&&"importScripts"in global}function ds(){return("http:"===as()||"https:"===as()||"object"==typeof(e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0)&&void 0!==e.id||ss())&&!(Ma()||xa())&&ls()&&!fs();var e}function ps(){return ss()&&"undefined"!=typeof document}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const hs={LOCAL:"local",NONE:"none",SESSION:"session"},gs=t._assert,vs="persistence";async function ys(e){await e._initializationPromise;const r=ms(),n=t._persistenceKeyName(vs,e.config.apiKey,e.name);(null==r?void 0:r.sessionStorage)&&r.sessionStorage.setItem(n,e._getPersistence())}function ms(){return"undefined"!=typeof window?window:null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const bs=t._assert,_s=t._getInstance(t.browserPopupRedirectResolver),Es=t._getInstance(t.cordovaPopupRedirectResolver);class Ss{constructor(){this.underlyingResolver=null,this._redirectPersistence=t.browserSessionPersistence,this._completeRedirectFn=t._getRedirectResult}async _initialize(e){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._initialize(e)}async _openPopup(e,t,r,n){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openPopup(e,t,r,n)}async _openRedirect(e,t,r,n){return await this.selectUnderlyingResolver(),this.assertedUnderlyingResolver._openRedirect(e,t,r,n)}_isIframeWebStorageSupported(e,t){this.assertedUnderlyingResolver._isIframeWebStorageSupported(e,t)}_originValidation(e){return this.assertedUnderlyingResolver._originValidation(e)}get _shouldInitProactively(){return ps()||_s._shouldInitProactively}get assertedUnderlyingResolver(){return bs(this.underlyingResolver,"internal-error"),this.underlyingResolver}async selectUnderlyingResolver(){if(this.underlyingResolver)return;const e=await async function(){return!!ps()&&new Promise((e=>{const t=setTimeout((()=>{e(!1)}),1e3);document.addEventListener("deviceready",(()=>{clearTimeout(t),e(!0)}))}))}();this.underlyingResolver=e?Es:_s}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ws(e){const{_tokenResponse:r}=e instanceof Ua?e.customData:e;if(!r)return null;if(!(e instanceof Ua)&&"temporaryProof"in r&&"phoneNumber"in r)return t.PhoneAuthProvider.credentialFromResult(e);const n=r.providerId;if(!n||"password"===n)return null;let o;switch(n){case"google.com":o=t.GoogleAuthProvider;break;case"facebook.com":o=t.FacebookAuthProvider;break;case"github.com":o=t.GithubAuthProvider;break;case"twitter.com":o=t.TwitterAuthProvider;break;default:const{oauthIdToken:e,oauthAccessToken:i,oauthTokenSecret:a,pendingToken:s,nonce:u}=r;return i||a||e||s?s?n.startsWith("saml.")?t.SAMLAuthCredential._create(n,s):t.OAuthCredential._fromParams({providerId:n,signInMethod:n,pendingToken:s,idToken:e,accessToken:i}):new t.OAuthProvider(n).credential({idToken:e,accessToken:i,rawNonce:u}):null}return e instanceof Ua?o.credentialFromError(e):o.credentialFromResult(e)}async function Is(e,r){let n;try{n=await r}catch(r){throw r instanceof Ua&&function(e,r){var n;const o=null===(n=r.customData)||void 0===n?void 0:n._tokenResponse;if("auth/multi-factor-auth-required"===r.code)r.resolver=new Os(e,t.getMultiFactorResolver(e,r));else if(o){const e=ws(r),t=r;e&&(t.credential=e,t.tenantId=o.tenantId||void 0,t.email=o.email||void 0,t.phoneNumber=o.phoneNumber||void 0)}}(e,r),r}const{operationType:o,user:i}=n;return{operationType:o,credential:(a=n,ws(a)),additionalUserInfo:t.getAdditionalUserInfo(n),user:Ts.getOrCreate(i)};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
var a}async function As(e,t){const r=await t;return{verificationId:r.verificationId,confirm:t=>Is(e,r.confirm(t))}}class Os{constructor(e,t){this.resolver=t,this.auth=e.wrapped()}get session(){return this.resolver.session}get hints(){return this.resolver.hints}resolveSignIn(e){return Is(this.auth.unwrap(),this.resolver.resolveSignIn(e))}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ts{constructor(e){this._delegate=e,this.multiFactor=t.multiFactor(e)}static getOrCreate(e){return Ts.USER_MAP.has(e)||Ts.USER_MAP.set(e,new Ts(e)),Ts.USER_MAP.get(e)}delete(){return this._delegate.delete()}reload(){return this._delegate.reload()}toJSON(){return this._delegate.toJSON()}getIdTokenResult(e){return this._delegate.getIdTokenResult(e)}getIdToken(e){return this._delegate.getIdToken(e)}linkAndRetrieveDataWithCredential(e){return this.linkWithCredential(e)}async linkWithCredential(e){return Is(this.auth,t.linkWithCredential(this._delegate,e))}async linkWithPhoneNumber(e,r){return As(this.auth,t.linkWithPhoneNumber(this._delegate,e,r))}async linkWithPopup(e){return Is(this.auth,t.linkWithPopup(this._delegate,e,Ss))}async linkWithRedirect(e){return await ys(t._castAuth(this.auth)),t.linkWithRedirect(this._delegate,e,Ss)}reauthenticateAndRetrieveDataWithCredential(e){return this.reauthenticateWithCredential(e)}async reauthenticateWithCredential(e){return Is(this.auth,t.reauthenticateWithCredential(this._delegate,e))}reauthenticateWithPhoneNumber(e,r){return As(this.auth,t.reauthenticateWithPhoneNumber(this._delegate,e,r))}reauthenticateWithPopup(e){return Is(this.auth,t.reauthenticateWithPopup(this._delegate,e,Ss))}async reauthenticateWithRedirect(e){return await ys(t._castAuth(this.auth)),t.reauthenticateWithRedirect(this._delegate,e,Ss)}sendEmailVerification(e){return t.sendEmailVerification(this._delegate,e)}async unlink(e){return await t.unlink(this._delegate,e),this}updateEmail(e){return t.updateEmail(this._delegate,e)}updatePassword(e){return t.updatePassword(this._delegate,e)}updatePhoneNumber(e){return t.updatePhoneNumber(this._delegate,e)}updateProfile(e){return t.updateProfile(this._delegate,e)}verifyBeforeUpdateEmail(e,r){return t.verifyBeforeUpdateEmail(this._delegate,e,r)}get emailVerified(){return this._delegate.emailVerified}get isAnonymous(){return this._delegate.isAnonymous}get metadata(){return this._delegate.metadata}get phoneNumber(){return this._delegate.phoneNumber}get providerData(){return this._delegate.providerData}get refreshToken(){return this._delegate.refreshToken}get tenantId(){return this._delegate.tenantId}get displayName(){return this._delegate.displayName}get email(){return this._delegate.email}get photoURL(){return this._delegate.photoURL}get providerId(){return this._delegate.providerId}get uid(){return this._delegate.uid}get auth(){return this._delegate.auth}}Ts.USER_MAP=new WeakMap;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Rs=t._assert;class Ps{constructor(e,r){if(this.app=e,r.isInitialized())return this._delegate=r.getImmediate(),void this.linkUnderlyingAuth();const{apiKey:n}=e.options;Rs(n,"invalid-api-key",{appName:e.name});let o=[t.inMemoryPersistence];if("undefined"!=typeof window){o=function(e,r){const n=ms();if(!(null==n?void 0:n.sessionStorage))return[];const o=t._persistenceKeyName(vs,e,r);switch(n.sessionStorage.getItem(o)){case hs.NONE:return[t.inMemoryPersistence];case hs.LOCAL:return[t.indexedDBLocalPersistence,t.browserSessionPersistence];case hs.SESSION:return[t.browserSessionPersistence];default:return[]}}(n,e.name);for(const e of[t.indexedDBLocalPersistence,t.browserLocalPersistence])o.includes(e)||o.push(e)}Rs(n,"invalid-api-key",{appName:e.name});const i="undefined"!=typeof window?Ss:void 0;this._delegate=r.initialize({options:{persistence:o,popupRedirectResolver:i}}),this._delegate._updateErrorMap(t.debugErrorMap),this.linkUnderlyingAuth()}get emulatorConfig(){return this._delegate.emulatorConfig}get currentUser(){return this._delegate.currentUser?Ts.getOrCreate(this._delegate.currentUser):null}get languageCode(){return this._delegate.languageCode}get settings(){return this._delegate.settings}get tenantId(){return this._delegate.tenantId}useDeviceLanguage(){this._delegate.useDeviceLanguage()}signOut(){return this._delegate.signOut()}useEmulator(e,r){t.useAuthEmulator(this._delegate,e,r)}applyActionCode(e){return t.applyActionCode(this._delegate,e)}checkActionCode(e){return t.checkActionCode(this._delegate,e)}confirmPasswordReset(e,r){return t.confirmPasswordReset(this._delegate,e,r)}async createUserWithEmailAndPassword(e,r){return Is(this._delegate,t.createUserWithEmailAndPassword(this._delegate,e,r))}fetchProvidersForEmail(e){return this.fetchSignInMethodsForEmail(e)}fetchSignInMethodsForEmail(e){return t.fetchSignInMethodsForEmail(this._delegate,e)}isSignInWithEmailLink(e){return t.isSignInWithEmailLink(this._delegate,e)}async getRedirectResult(){Rs(ds(),this._delegate,"operation-not-supported-in-this-environment");const e=await t.getRedirectResult(this._delegate,Ss);return e?Is(this._delegate,Promise.resolve(e)):{credential:null,user:null}}onAuthStateChanged(e,t,r){const{next:n,error:o,complete:i}=Ns(e,t,r);return this._delegate.onAuthStateChanged(n,o,i)}onIdTokenChanged(e,t,r){const{next:n,error:o,complete:i}=Ns(e,t,r);return this._delegate.onIdTokenChanged(n,o,i)}sendSignInLinkToEmail(e,r){return t.sendSignInLinkToEmail(this._delegate,e,r)}sendPasswordResetEmail(e,r){return t.sendPasswordResetEmail(this._delegate,e,r||void 0)}async setPersistence(e){let r;switch(function(e,t){gs(Object.values(hs).includes(t),e,"invalid-persistence-type"),Ma()?gs(t!==hs.SESSION,e,"unsupported-persistence-type"):xa()?gs(t===hs.NONE,e,"unsupported-persistence-type"):fs()?gs(t===hs.NONE||t===hs.LOCAL&&Da(),e,"unsupported-persistence-type"):gs(t===hs.NONE||ls(),e,"unsupported-persistence-type")}(this._delegate,e),e){case hs.SESSION:r=t.browserSessionPersistence;break;case hs.LOCAL:r=await t._getInstance(t.indexedDBLocalPersistence)._isAvailable()?t.indexedDBLocalPersistence:t.browserLocalPersistence;break;case hs.NONE:r=t.inMemoryPersistence;break;default:return t._fail("argument-error",{appName:this._delegate.name})}return this._delegate.setPersistence(r)}signInAndRetrieveDataWithCredential(e){return this.signInWithCredential(e)}signInAnonymously(){return Is(this._delegate,t.signInAnonymously(this._delegate))}signInWithCredential(e){return Is(this._delegate,t.signInWithCredential(this._delegate,e))}signInWithCustomToken(e){return Is(this._delegate,t.signInWithCustomToken(this._delegate,e))}signInWithEmailAndPassword(e,r){return Is(this._delegate,t.signInWithEmailAndPassword(this._delegate,e,r))}signInWithEmailLink(e,r){return Is(this._delegate,t.signInWithEmailLink(this._delegate,e,r))}signInWithPhoneNumber(e,r){return As(this._delegate,t.signInWithPhoneNumber(this._delegate,e,r))}async signInWithPopup(e){return Rs(ds(),this._delegate,"operation-not-supported-in-this-environment"),Is(this._delegate,t.signInWithPopup(this._delegate,e,Ss))}async signInWithRedirect(e){return Rs(ds(),this._delegate,"operation-not-supported-in-this-environment"),await ys(this._delegate),t.signInWithRedirect(this._delegate,e,Ss)}updateCurrentUser(e){return this._delegate.updateCurrentUser(e)}verifyPasswordResetCode(e){return t.verifyPasswordResetCode(this._delegate,e)}unwrap(){return this._delegate}_delete(){return this._delegate._delete()}linkUnderlyingAuth(){this._delegate.wrapped=()=>this}}function Ns(e,t,r){let n=e;"function"!=typeof e&&({next:n,error:t,complete:r}=e);const o=n;return{next:e=>o(e&&Ts.getOrCreate(e)),error:t,complete:r}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Cs{constructor(){this.providerId="phone",this._delegate=new t.PhoneAuthProvider(unwrap(os.auth()))}static credential(e,r){return t.PhoneAuthProvider.credential(e,r)}verifyPhoneNumber(e,t){return this._delegate.verifyPhoneNumber(e,t)}unwrap(){return this._delegate}}Cs.PHONE_SIGN_IN_METHOD=t.PhoneAuthProvider.PHONE_SIGN_IN_METHOD,Cs.PROVIDER_ID=t.PhoneAuthProvider.PROVIDER_ID;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Ls=t._assert;class js{constructor(e,r,n=os.app()){var o;Ls(null===(o=n.options)||void 0===o?void 0:o.apiKey,"invalid-api-key",{appName:n.name}),this._delegate=new t.RecaptchaVerifier(e,r,n.auth()),this.type=this._delegate.type}clear(){this._delegate.clear()}render(){return this._delegate.render()}verify(){return this._delegate.verify()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */var ks;(ks=os).INTERNAL.registerComponent(new Ka("auth-compat",(e=>{const t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("auth-exp");return new Ps(t,r)}),"PUBLIC").setServiceProps({ActionCodeInfo:{Operation:{EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"}},EmailAuthProvider:t.EmailAuthProvider,FacebookAuthProvider:t.FacebookAuthProvider,GithubAuthProvider:t.GithubAuthProvider,GoogleAuthProvider:t.GoogleAuthProvider,OAuthProvider:t.OAuthProvider,PhoneAuthProvider:Cs,PhoneMultiFactorGenerator:t.PhoneMultiFactorGenerator,RecaptchaVerifier:js,TwitterAuthProvider:t.TwitterAuthProvider,Auth:{Persistence:hs},AuthCredential:t.AuthCredential}).setInstantiationMode("LAZY").setMultipleInstances(!1)),ks.registerVersion("@firebase/auth-compat","0.0.900-exp.894b5da5a");
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class xs{constructor(e,t){this.app=e,this._delegate=t,this._region=this._delegate.region,this._customDomain=this._delegate.customDomain}httpsCallable(e,t){return o.httpsCallable(this._delegate,e,t)}useFunctionsEmulator(e){const t=e.match("[a-zA-Z]+://([a-zA-Z0-9.-]+)(?::([0-9]+))?");if(null==t)throw new Ua("functions","No origin provided to useFunctionsEmulator()");if(null==t[2])throw new Ua("functions","Port missing in origin provided to useFunctionsEmulator()");return o.useFunctionsEmulator(this._delegate,t[1],Number(t[2]))}useEmulator(e,t){return o.useFunctionsEmulator(this._delegate,e,t)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Ms=(e,{instanceIdentifier:t})=>{const r=e.getProvider("app-compat").getImmediate(),n=e.getProvider("functions-exp").getImmediate({identifier:null!=t?t:"us-central1"});return new xs(r,n)};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
!function(){const e={Functions:xs};os.INTERNAL.registerComponent(new Ka("functions-compat",Ms,"PUBLIC").setServiceProps(e).setMultipleInstances(!0))}(),os.registerVersion("@firebase/functions-compat","0.0.900-exp.894b5da5a");
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Ds{constructor(e,t){this.app=e,this._delegate=t,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.app=e,this._delegate=t}async getToken(e){return i.getToken(this._delegate,e)}async deleteToken(){return i.deleteToken(this._delegate)}onMessage(e){return i.onMessage(this._delegate,e)}onBackgroundMessage(e){return i.onBackgroundMessage(this._delegate,e)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Us=e=>new Ds(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging-exp").getImmediate());os.INTERNAL.registerComponent(new Ka("messaging-compat",Us,"PUBLIC")),os.registerVersion("@firebase/messaging-compat","0.0.900-exp.894b5da5a");
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Fs{constructor(e,t){this.app=e,this._delegate=t}get instrumentationEnabled(){return this._delegate.instrumentationEnabled}set instrumentationEnabled(e){this._delegate.instrumentationEnabled=e}get dataCollectionEnabled(){return this._delegate.dataCollectionEnabled}set dataCollectionEnabled(e){this._delegate.dataCollectionEnabled=e}trace(e){return s.trace(this._delegate,e)}}function Bs(e){const t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("performance-exp").getImmediate();return new Fs(t,r)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
var Ws;(Ws=os).INTERNAL.registerComponent(new Ka("performance-compat",Bs,"PUBLIC")),Ws.registerVersion("@firebase/performance-compat","0.0.900-exp.894b5da5a");
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class Vs{constructor(e,t){this.app=e,this._delegate=t}logEvent(e,t,r){u.logEvent(this._delegate,e,t,r)}setCurrentScreen(e,t){u.setCurrentScreen(this._delegate,e,t)}setUserId(e,t){u.setUserId(this._delegate,e,t)}setUserProperties(e,t){u.setUserProperties(this._delegate,e,t)}setAnalyticsCollectionEnabled(e){u.setAnalyticsCollectionEnabled(this._delegate,e)}}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */var Hs;!function(e){e.ADD_SHIPPING_INFO="add_shipping_info",e.ADD_PAYMENT_INFO="add_payment_info",e.ADD_TO_CART="add_to_cart",e.ADD_TO_WISHLIST="add_to_wishlist",e.BEGIN_CHECKOUT="begin_checkout",e.CHECKOUT_PROGRESS="checkout_progress",e.EXCEPTION="exception",e.GENERATE_LEAD="generate_lead",e.LOGIN="login",e.PAGE_VIEW="page_view",e.PURCHASE="purchase",e.REFUND="refund",e.REMOVE_FROM_CART="remove_from_cart",e.SCREEN_VIEW="screen_view",e.SEARCH="search",e.SELECT_CONTENT="select_content",e.SELECT_ITEM="select_item",e.SELECT_PROMOTION="select_promotion",e.SET_CHECKOUT_OPTION="set_checkout_option",e.SHARE="share",e.SIGN_UP="sign_up",e.TIMING_COMPLETE="timing_complete",e.VIEW_CART="view_cart",e.VIEW_ITEM="view_item",e.VIEW_ITEM_LIST="view_item_list",e.VIEW_PROMOTION="view_promotion",e.VIEW_SEARCH_RESULTS="view_search_results"}(Hs||(Hs={}));
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const Gs=e=>{const t=e.getProvider("app-compat").getImmediate(),r=e.getProvider("analytics-exp").getImmediate();return new Vs(t,r)};!function(){const e={Analytics:Vs,settings:u.settings,isSupported:u.isSupported,EventName:Hs};os.INTERNAL.registerComponent(new Ka("analytics-compat",Gs,"PUBLIC").setServiceProps(e).setMultipleInstances(!0))}(),os.registerVersion("@firebase/analytics-compat","0.0.900-exp.894b5da5a");
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
class zs{constructor(e,t){this.app=e,this._delegate=t}get defaultConfig(){return this._delegate.defaultConfig}set defaultConfig(e){this._delegate.defaultConfig=e}get fetchTimeMillis(){return this._delegate.fetchTimeMillis}get lastFetchStatus(){return this._delegate.lastFetchStatus}get settings(){return this._delegate.settings}set settings(e){this._delegate.settings=e}activate(){return c.activate(this._delegate)}ensureInitialized(){return c.ensureInitialized(this._delegate)}fetch(){return c.fetchConfig(this._delegate)}fetchAndActivate(){return c.fetchAndActivate(this._delegate)}getAll(){return c.getAll(this._delegate)}getBoolean(e){return c.getBoolean(this._delegate,e)}getNumber(e){return c.getNumber(this._delegate,e)}getString(e){return c.getString(this._delegate,e)}getValue(e){return c.getValue(this._delegate,e)}setLogLevel(e){c.setLogLevel(this._delegate,e)}}function qs(e,{instanceIdentifier:t}){const r=e.getProvider("app-compat").getImmediate(),n=e.getProvider("remote-config-exp").getImmediate({identifier:t});return new zs(r,n)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
return function(e){e.INTERNAL.registerComponent(new Ka("remoteConfig-compat",qs,"PUBLIC").setMultipleInstances(!0)),e.registerVersion("@firebase/remote-config-compat","0.0.900-exp.894b5da5a")}(os),
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
console.warn("\nIt looks like you're using the development build of the Firebase JS SDK.\nWhen deploying Firebase apps to production, it is advisable to only import\nthe individual SDK components you intend to use.\n\nFor the CDN builds, these are available in the following manner\n(replace <PACKAGE> with the name of a component - i.e. auth, database, etc):\n\nhttps://www.gstatic.com/firebasejs/5.0.0/firebase-<PACKAGE>.js\n"),os.registerVersion("firebase-exp","9.0.0-beta.1","compat-cdn"),os}));
//# sourceMappingURL=firebase-compat.js.map
