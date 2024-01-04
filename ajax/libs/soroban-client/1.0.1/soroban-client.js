(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SorobanClient", [], factory);
	else if(typeof exports === 'object')
		exports["SorobanClient"] = factory();
	else
		root["SorobanClient"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6263:
/***/ (function(module) {

/*! For license information please see xdr.js.LICENSE.txt */
!function(t,e){ true?module.exports=e():0}(this,(()=>(()=>{var t={899:(t,e,r)=>{const n=r(10);t.exports=n},10:(t,e,r)=>{"use strict";r.r(e),r.d(e,{Array:()=>j,Bool:()=>O,Double:()=>$,Enum:()=>k,Float:()=>T,Hyper:()=>A,Int:()=>B,LargeInt:()=>I,Opaque:()=>M,Option:()=>F,Quadruple:()=>L,Reference:()=>X,String:()=>N,Struct:()=>q,Union:()=>G,UnsignedHyper:()=>R,UnsignedInt:()=>U,VarArray:()=>z,VarOpaque:()=>D,Void:()=>P,config:()=>rt});class n extends TypeError{constructor(t){super(`XDR Write Error: ${t}`)}}class i extends TypeError{constructor(t){super(`XDR Read Error: ${t}`)}}class o extends TypeError{constructor(t){super(`XDR Type Definition Error: ${t}`)}}class s extends o{constructor(){super("method not implemented, it should be overloaded in the descendant class.")}}var f=r(764).lW;class u{constructor(t){if(!f.isBuffer(t)){if(!(t instanceof Array))throw new i("source not specified");t=f.from(t)}this._buffer=t,this._length=t.length,this._index=0}_buffer;_length;_index;get eof(){return this._index===this._length}advance(t){const e=this._index;if(this._index+=t,this._length<this._index)throw new i("attempt to read outside the boundary of the buffer");const r=4-(t%4||4);if(r>0){for(let t=0;t<r;t++)if(0!==this._buffer[this._index+t])throw new i("invalid padding");this._index+=r}return e}rewind(){this._index=0}read(t){const e=this.advance(t);return this._buffer.subarray(e,e+t)}readInt32BE(){return this._buffer.readInt32BE(this.advance(4))}readUInt32BE(){return this._buffer.readUInt32BE(this.advance(4))}readBigInt64BE(){return this._buffer.readBigInt64BE(this.advance(8))}readBigUInt64BE(){return this._buffer.readBigUInt64BE(this.advance(8))}readFloatBE(){return this._buffer.readFloatBE(this.advance(4))}readDoubleBE(){return this._buffer.readDoubleBE(this.advance(8))}ensureInputConsumed(){if(this._index!==this._length)throw new i("invalid XDR contract typecast - source buffer not entirely consumed")}}var a=r(764).lW;const h=8192;class c{constructor(t){"number"==typeof t?t=a.allocUnsafe(t):t instanceof a||(t=a.allocUnsafe(h)),this._buffer=t,this._length=t.length}_buffer;_length;_index=0;alloc(t){const e=this._index;return this._index+=t,this._length<this._index&&this.resize(this._index),e}resize(t){const e=Math.ceil(t/h)*h,r=a.allocUnsafe(e);this._buffer.copy(r,0,0,this._length),this._buffer=r,this._length=e}finalize(){return this._buffer.subarray(0,this._index)}toArray(){return[...this.finalize()]}write(t,e){if("string"==typeof t){const r=this.alloc(e);this._buffer.write(t,r,"utf8")}else{t instanceof a||(t=a.from(t));const r=this.alloc(e);t.copy(this._buffer,r,0,e)}const r=4-(e%4||4);if(r>0){const t=this.alloc(r);this._buffer.fill(0,t,this._index)}}writeInt32BE(t){const e=this.alloc(4);this._buffer.writeInt32BE(t,e)}writeUInt32BE(t){const e=this.alloc(4);this._buffer.writeUInt32BE(t,e)}writeBigInt64BE(t){const e=this.alloc(8);this._buffer.writeBigInt64BE(t,e)}writeBigUInt64BE(t){const e=this.alloc(8);this._buffer.writeBigUInt64BE(t,e)}writeFloatBE(t){const e=this.alloc(4);this._buffer.writeFloatBE(t,e)}writeDoubleBE(t){const e=this.alloc(8);this._buffer.writeDoubleBE(t,e)}static bufferChunkSize=h}var l=r(764).lW;class p{toXDR(t="raw"){if(!this.write)return this.constructor.toXDR(this,t);const e=new c;return this.write(this,e),y(e.finalize(),t)}fromXDR(t,e="raw"){if(!this.read)return this.constructor.fromXDR(t,e);const r=new u(m(t,e)),n=this.read(r);return r.ensureInputConsumed(),n}validateXDR(t,e="raw"){try{return this.fromXDR(t,e),!0}catch(t){return!1}}static toXDR(t,e="raw"){const r=new c;return this.write(t,r),y(r.finalize(),e)}static fromXDR(t,e="raw"){const r=new u(m(t,e)),n=this.read(r);return r.ensureInputConsumed(),n}static validateXDR(t,e="raw"){try{return this.fromXDR(t,e),!0}catch(t){return!1}}}class d extends p{static read(t){throw new s}static write(t,e){throw new s}static isValid(t){return!1}}class g extends p{isValid(t){return!1}}class w extends TypeError{constructor(t){super(`Invalid format ${t}, must be one of "raw", "hex", "base64"`)}}function y(t,e){switch(e){case"raw":return t;case"hex":return t.toString("hex");case"base64":return t.toString("base64");default:throw new w(e)}}function m(t,e){switch(e){case"raw":return t;case"hex":return l.from(t,"hex");case"base64":return l.from(t,"base64");default:throw new w(e)}}const b=2147483647,_=-2147483648;class B extends d{static read(t){return t.readInt32BE()}static write(t,e){if("number"!=typeof t)throw new n("not a number");if((0|t)!==t)throw new n("invalid i32 value");e.writeInt32BE(t)}static isValid(t){return"number"==typeof t&&(0|t)===t&&(t>=_&&t<=b)}}function E(t,e,r){if("bigint"!=typeof t)throw new TypeError("Expected bigint 'value', got "+typeof t);const n=e/r;if(1===n)return[t];if(r<32||r>128||2!==n&&4!==n&&8!==n)throw new TypeError(`invalid bigint (${t}) and slice size (${e} -> ${r}) combination`);const i=BigInt(r),o=new Array(n);for(let e=0;e<n;e++)o[e]=BigInt.asIntN(r,t),t>>=i;return o}function v(t,e){if(e)return[0n,(1n<<BigInt(t))-1n];const r=1n<<BigInt(t-1);return[0n-r,r-1n]}B.MAX_VALUE=b,B.MIN_VALUE=2147483648;class I extends d{constructor(t){super(),this._value=function(t,e,r){t instanceof Array?t.length&&t[0]instanceof Array&&(t=t[0]):t=[t];const n=e/t.length;switch(n){case 32:case 64:case 128:case 256:break;default:throw new RangeError(`expected slices to fit in 32/64/128/256 bits, got ${t}`)}try{for(let e=0;e<t.length;e++)"bigint"!=typeof t[e]&&(t[e]=BigInt(t[e].valueOf()))}catch(e){throw new TypeError(`expected bigint-like values, got: ${t} (${e})`)}if(r&&1===t.length&&t[0]<0n)throw new RangeError(`expected a positive value, got: ${t}`);let i=BigInt.asUintN(n,t[0]);for(let e=1;e<t.length;e++)i|=BigInt.asUintN(n,t[e])<<BigInt(e*n);r||(i=BigInt.asIntN(e,i));const[o,s]=v(e,r);if(i>=o&&i<=s)return i;throw new TypeError(`bigint values [${t}] for ${function(t,e){return`${e?"u":"i"}${t}`}(e,r)} out of range [${o}, ${s}]: ${i}`)}(t,this.size,this.unsigned)}get unsigned(){throw new s}get size(){throw new s}slice(t){return E(this._value,this.size,t)}toString(){return this._value.toString()}toJSON(){return{_value:this._value.toString()}}toBigInt(){return BigInt(this._value)}static read(t){const{size:e}=this.prototype;return 64===e?new this(t.readBigUInt64BE()):new this(...Array.from({length:e/64},(()=>t.readBigUInt64BE())).reverse())}static write(t,e){if(t instanceof this)t=t._value;else if("bigint"!=typeof t||t>this.MAX_VALUE||t<this.MIN_VALUE)throw new n(`${t} is not a ${this.name}`);const{unsigned:r,size:i}=this.prototype;if(64===i)r?e.writeBigUInt64BE(t):e.writeBigInt64BE(t);else for(const n of E(t,i,64).reverse())r?e.writeBigUInt64BE(n):e.writeBigInt64BE(n)}static isValid(t){return"bigint"==typeof t||t instanceof this}static fromString(t){return new this(t)}static MAX_VALUE=0n;static MIN_VALUE=0n;static defineIntBoundaries(){const[t,e]=v(this.prototype.size,this.prototype.unsigned);this.MIN_VALUE=t,this.MAX_VALUE=e}}class A extends I{constructor(...t){super(t)}get low(){return Number(0xffffffffn&this._value)<<0}get high(){return Number(this._value>>32n)>>0}get size(){return 64}get unsigned(){return!1}static fromBits(t,e){return new this(t,e)}}A.defineIntBoundaries();const x=4294967295;class U extends d{static read(t){return t.readUInt32BE()}static write(t,e){if("number"!=typeof t||!(t>=0&&t<=x)||t%1!=0)throw new n("invalid u32 value");e.writeUInt32BE(t)}static isValid(t){return"number"==typeof t&&t%1==0&&(t>=0&&t<=x)}}U.MAX_VALUE=x,U.MIN_VALUE=0;class R extends I{constructor(...t){super(t)}get low(){return Number(0xffffffffn&this._value)<<0}get high(){return Number(this._value>>32n)>>0}get size(){return 64}get unsigned(){return!0}static fromBits(t,e){return new this(t,e)}}R.defineIntBoundaries();class T extends d{static read(t){return t.readFloatBE()}static write(t,e){if("number"!=typeof t)throw new n("not a number");e.writeFloatBE(t)}static isValid(t){return"number"==typeof t}}class $ extends d{static read(t){return t.readDoubleBE()}static write(t,e){if("number"!=typeof t)throw new n("not a number");e.writeDoubleBE(t)}static isValid(t){return"number"==typeof t}}class L extends d{static read(){throw new o("quadruple not supported")}static write(){throw new o("quadruple not supported")}static isValid(){return!1}}class O extends d{static read(t){const e=B.read(t);switch(e){case 0:return!1;case 1:return!0;default:throw new i(`got ${e} when trying to read a bool`)}}static write(t,e){const r=t?1:0;B.write(r,e)}static isValid(t){return"boolean"==typeof t}}var S=r(764).lW;class N extends g{constructor(t=U.MAX_VALUE){super(),this._maxLength=t}read(t){const e=U.read(t);if(e>this._maxLength)throw new i(`saw ${e} length String, max allowed is ${this._maxLength}`);return t.read(e)}readString(t){return this.read(t).toString("utf8")}write(t,e){const r="string"==typeof t?S.byteLength(t,"utf8"):t.length;if(r>this._maxLength)throw new n(`got ${t.length} bytes, max allowed is ${this._maxLength}`);U.write(r,e),e.write(t,r)}isValid(t){return"string"==typeof t?S.byteLength(t,"utf8")<=this._maxLength:!!(t instanceof Array||S.isBuffer(t))&&t.length<=this._maxLength}}var V=r(764).lW;class M extends g{constructor(t){super(),this._length=t}read(t){return t.read(this._length)}write(t,e){const{length:r}=t;if(r!==this._length)throw new n(`got ${t.length} bytes, expected ${this._length}`);e.write(t,r)}isValid(t){return V.isBuffer(t)&&t.length===this._length}}var C=r(764).lW;class D extends g{constructor(t=U.MAX_VALUE){super(),this._maxLength=t}read(t){const e=U.read(t);if(e>this._maxLength)throw new i(`saw ${e} length VarOpaque, max allowed is ${this._maxLength}`);return t.read(e)}write(t,e){const{length:r}=t;if(t.length>this._maxLength)throw new n(`got ${t.length} bytes, max allowed is ${this._maxLength}`);U.write(r,e),e.write(t,r)}isValid(t){return C.isBuffer(t)&&t.length<=this._maxLength}}class j extends g{constructor(t,e){super(),this._childType=t,this._length=e}read(t){const e=new r.g.Array(this._length);for(let r=0;r<this._length;r++)e[r]=this._childType.read(t);return e}write(t,e){if(!(t instanceof r.g.Array))throw new n("value is not array");if(t.length!==this._length)throw new n(`got array of size ${t.length}, expected ${this._length}`);for(const r of t)this._childType.write(r,e)}isValid(t){if(!(t instanceof r.g.Array)||t.length!==this._length)return!1;for(const e of t)if(!this._childType.isValid(e))return!1;return!0}}class z extends g{constructor(t,e=U.MAX_VALUE){super(),this._childType=t,this._maxLength=e}read(t){const e=U.read(t);if(e>this._maxLength)throw new i(`saw ${e} length VarArray, max allowed is ${this._maxLength}`);const r=new Array(e);for(let n=0;n<e;n++)r[n]=this._childType.read(t);return r}write(t,e){if(!(t instanceof Array))throw new n("value is not array");if(t.length>this._maxLength)throw new n(`got array of size ${t.length}, max allowed is ${this._maxLength}`);U.write(t.length,e);for(const r of t)this._childType.write(r,e)}isValid(t){if(!(t instanceof Array)||t.length>this._maxLength)return!1;for(const e of t)if(!this._childType.isValid(e))return!1;return!0}}class F extends d{constructor(t){super(),this._childType=t}read(t){if(O.read(t))return this._childType.read(t)}write(t,e){const r=null!=t;O.write(r,e),r&&this._childType.write(t,e)}isValid(t){return null==t||this._childType.isValid(t)}}class P extends d{static read(){}static write(t){if(void 0!==t)throw new n("trying to write value to a void slot")}static isValid(t){return void 0===t}}class k extends d{constructor(t,e){super(),this.name=t,this.value=e}static read(t){const e=B.read(t),r=this._byValue[e];if(void 0===r)throw new i(`unknown ${this.enumName} member for value ${e}`);return r}static write(t,e){if(!(t instanceof this))throw new n(`unknown ${t} is not a ${this.enumName}`);B.write(t.value,e)}static isValid(t){return t instanceof this}static members(){return this._members}static values(){return Object.values(this._members)}static fromName(t){const e=this._members[t];if(!e)throw new TypeError(`${t} is not a member of ${this.enumName}`);return e}static fromValue(t){const e=this._byValue[t];if(void 0===e)throw new TypeError(`${t} is not a value of any member of ${this.enumName}`);return e}static create(t,e,r){const n=class extends k{};n.enumName=e,t.results[e]=n,n._members={},n._byValue={};for(const[t,e]of Object.entries(r)){const r=new n(t,e);n._members[t]=r,n._byValue[e]=r,n[t]=()=>r}return n}}class X extends d{resolve(){throw new o('"resolve" method should be implemented in the descendant class')}}class q extends d{constructor(t){super(),this._attributes=t||{}}static read(t){const e={};for(const[r,n]of this._fields)e[r]=n.read(t);return new this(e)}static write(t,e){if(!(t instanceof this))throw new n(`${t} is not a ${this.structName}`);for(const[r,n]of this._fields){const i=t._attributes[r];n.write(i,e)}}static isValid(t){return t instanceof this}static create(t,e,r){const n=class extends q{};n.structName=e,t.results[e]=n;const i=new Array(r.length);for(let e=0;e<r.length;e++){const o=r[e],s=o[0];let f=o[1];f instanceof X&&(f=f.resolve(t)),i[e]=[s,f],n.prototype[s]=W(s)}return n._fields=i,n}}function W(t){return function(e){return void 0!==e&&(this._attributes[t]=e),this._attributes[t]}}class G extends g{constructor(t,e){super(),this.set(t,e)}set(t,e){"string"==typeof t&&(t=this.constructor._switchOn.fromName(t)),this._switch=t;const r=this.constructor.armForSwitch(this._switch);this._arm=r,this._armType=r===P?P:this.constructor._arms[r],this._value=e}get(t=this._arm){if(this._arm!==P&&this._arm!==t)throw new TypeError(`${t} not set`);return this._value}switch(){return this._switch}arm(){return this._arm}armType(){return this._armType}value(){return this._value}static armForSwitch(t){const e=this._switches.get(t);if(void 0!==e)return e;if(this._defaultArm)return this._defaultArm;throw new TypeError(`Bad union switch: ${t}`)}static armTypeForArm(t){return t===P?P:this._arms[t]}static read(t){const e=this._switchOn.read(t),r=this.armForSwitch(e),n=r===P?P:this._arms[r];let i;return i=void 0!==n?n.read(t):r.read(t),new this(e,i)}static write(t,e){if(!(t instanceof this))throw new n(`${t} is not a ${this.unionName}`);this._switchOn.write(t.switch(),e),t.armType().write(t.value(),e)}static isValid(t){return t instanceof this}static create(t,e,r){const n=class extends G{};n.unionName=e,t.results[e]=n,r.switchOn instanceof X?n._switchOn=r.switchOn.resolve(t):n._switchOn=r.switchOn,n._switches=new Map,n._arms={};let i=r.defaultArm;i instanceof X&&(i=i.resolve(t)),n._defaultArm=i;for(const[t,e]of r.switches){const r="string"==typeof t?n._switchOn.fromName(t):t;n._switches.set(r,e)}if(void 0!==n._switchOn.values)for(const t of n._switchOn.values())n[t.name]=function(e){return new n(t,e)},n.prototype[t.name]=function(e){return this.set(t,e)};if(r.arms)for(const[e,i]of Object.entries(r.arms))n._arms[e]=i instanceof X?i.resolve(t):i,i!==P&&(n.prototype[e]=function(){return this.get(e)});return n}}class Y extends X{constructor(t){super(),this.name=t}resolve(t){return t.definitions[this.name].resolve(t)}}class H extends X{constructor(t,e,r=!1){super(),this.childReference=t,this.length=e,this.variable=r}resolve(t){let e=this.childReference,r=this.length;return e instanceof X&&(e=e.resolve(t)),r instanceof X&&(r=r.resolve(t)),this.variable?new z(e,r):new j(e,r)}}class J extends X{constructor(t){super(),this.childReference=t,this.name=t.name}resolve(t){let e=this.childReference;return e instanceof X&&(e=e.resolve(t)),new F(e)}}class Q extends X{constructor(t,e){super(),this.sizedType=t,this.length=e}resolve(t){let e=this.length;return e instanceof X&&(e=e.resolve(t)),new this.sizedType(e)}}class Z{constructor(t,e,r){this.constructor=t,this.name=e,this.config=r}resolve(t){return this.name in t.results?t.results[this.name]:this.constructor(t,this.name,this.config)}}function K(t,e,r){return r instanceof X&&(r=r.resolve(t)),t.results[e]=r,r}function tt(t,e,r){return t.results[e]=r,r}class et{constructor(t){this._destination=t,this._definitions={}}enum(t,e){const r=new Z(k.create,t,e);this.define(t,r)}struct(t,e){const r=new Z(q.create,t,e);this.define(t,r)}union(t,e){const r=new Z(G.create,t,e);this.define(t,r)}typedef(t,e){const r=new Z(K,t,e);this.define(t,r)}const(t,e){const r=new Z(tt,t,e);this.define(t,r)}void(){return P}bool(){return O}int(){return B}hyper(){return A}uint(){return U}uhyper(){return R}float(){return T}double(){return $}quadruple(){return L}string(t){return new Q(N,t)}opaque(t){return new Q(M,t)}varOpaque(t){return new Q(D,t)}array(t,e){return new H(t,e)}varArray(t,e){return new H(t,e,!0)}option(t){return new J(t)}define(t,e){if(void 0!==this._destination[t])throw new o(`${t} is already defined`);this._definitions[t]=e}lookup(t){return new Y(t)}resolve(){for(const t of Object.values(this._definitions))t.resolve({definitions:this._definitions,results:this._destination})}}function rt(t,e={}){if(t){const r=new et(e);t(r),r.resolve()}return e}},742:(t,e)=>{"use strict";e.byteLength=function(t){var e=f(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,o=f(t),s=o[0],u=o[1],a=new i(function(t,e,r){return 3*(e+r)/4-r}(0,s,u)),h=0,c=u>0?s-4:s;for(r=0;r<c;r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],a[h++]=e>>16&255,a[h++]=e>>8&255,a[h++]=255&e;2===u&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,a[h++]=255&e);1===u&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,a[h++]=e>>8&255,a[h++]=255&e);return a},e.fromByteArray=function(t){for(var e,n=t.length,i=n%3,o=[],s=16383,f=0,a=n-i;f<a;f+=s)o.push(u(t,f,f+s>a?a:f+s));1===i?(e=t[n-1],o.push(r[e>>2]+r[e<<4&63]+"==")):2===i&&(e=(t[n-2]<<8)+t[n-1],o.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"="));return o.join("")};for(var r=[],n=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0;s<64;++s)r[s]=o[s],n[o.charCodeAt(s)]=s;function f(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function u(t,e,n){for(var i,o,s=[],f=e;f<n;f+=3)i=(t[f]<<16&16711680)+(t[f+1]<<8&65280)+(255&t[f+2]),s.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return s.join("")}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},764:(t,e,r)=>{"use strict";const n=r(742),i=r(645),o="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.lW=u,e.h2=50;const s=2147483647;function f(t){if(t>s)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,u.prototype),e}function u(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}return a(t,e,r)}function a(t,e,r){if("string"==typeof t)return function(t,e){"string"==typeof e&&""!==e||(e="utf8");if(!u.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=0|g(t,e);let n=f(r);const i=n.write(t,e);i!==r&&(n=n.slice(0,i));return n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(H(t,Uint8Array)){const e=new Uint8Array(t);return p(e.buffer,e.byteOffset,e.byteLength)}return l(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(H(t,ArrayBuffer)||t&&H(t.buffer,ArrayBuffer))return p(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(H(t,SharedArrayBuffer)||t&&H(t.buffer,SharedArrayBuffer)))return p(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return u.from(n,e,r);const i=function(t){if(u.isBuffer(t)){const e=0|d(t.length),r=f(e);return 0===r.length||t.copy(r,0,0,e),r}if(void 0!==t.length)return"number"!=typeof t.length||J(t.length)?f(0):l(t);if("Buffer"===t.type&&Array.isArray(t.data))return l(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return u.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function h(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return h(t),f(t<0?0:0|d(t))}function l(t){const e=t.length<0?0:0|d(t.length),r=f(e);for(let n=0;n<e;n+=1)r[n]=255&t[n];return r}function p(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,u.prototype),n}function d(t){if(t>=s)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s.toString(16)+" bytes");return 0|t}function g(t,e){if(u.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||H(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return W(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return G(t).length;default:if(i)return n?-1:W(t).length;e=(""+e).toLowerCase(),i=!0}}function w(t,e,r){let n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return $(this,e,r);case"utf8":case"utf-8":return x(this,e,r);case"ascii":return R(this,e,r);case"latin1":case"binary":return T(this,e,r);case"base64":return A(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return L(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function y(t,e,r){const n=t[e];t[e]=t[r],t[r]=n}function m(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),J(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:b(t,e,r,n,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):b(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function b(t,e,r,n,i){let o,s=1,f=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,f/=2,u/=2,r/=2}function a(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){let n=-1;for(o=r;o<f;o++)if(a(t,o)===a(e,-1===n?0:o-n)){if(-1===n&&(n=o),o-n+1===u)return n*s}else-1!==n&&(o-=o-n),n=-1}else for(r+u>f&&(r=f-u),o=r;o>=0;o--){let r=!0;for(let n=0;n<u;n++)if(a(t,o+n)!==a(e,n)){r=!1;break}if(r)return o}return-1}function _(t,e,r,n){r=Number(r)||0;const i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;const o=e.length;let s;for(n>o/2&&(n=o/2),s=0;s<n;++s){const n=parseInt(e.substr(2*s,2),16);if(J(n))return s;t[r+s]=n}return s}function B(t,e,r,n){return Y(W(e,t.length-r),t,r,n)}function E(t,e,r,n){return Y(function(t){const e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function v(t,e,r,n){return Y(G(e),t,r,n)}function I(t,e,r,n){return Y(function(t,e){let r,n,i;const o=[];for(let s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function A(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function x(t,e,r){r=Math.min(t.length,r);const n=[];let i=e;for(;i<r;){const e=t[i];let o=null,s=e>239?4:e>223?3:e>191?2:1;if(i+s<=r){let r,n,f,u;switch(s){case 1:e<128&&(o=e);break;case 2:r=t[i+1],128==(192&r)&&(u=(31&e)<<6|63&r,u>127&&(o=u));break;case 3:r=t[i+1],n=t[i+2],128==(192&r)&&128==(192&n)&&(u=(15&e)<<12|(63&r)<<6|63&n,u>2047&&(u<55296||u>57343)&&(o=u));break;case 4:r=t[i+1],n=t[i+2],f=t[i+3],128==(192&r)&&128==(192&n)&&128==(192&f)&&(u=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&f,u>65535&&u<1114112&&(o=u))}}null===o?(o=65533,s=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),i+=s}return function(t){const e=t.length;if(e<=U)return String.fromCharCode.apply(String,t);let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=U));return r}(n)}u.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),u.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}}),Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}}),u.poolSize=8192,u.from=function(t,e,r){return a(t,e,r)},Object.setPrototypeOf(u.prototype,Uint8Array.prototype),Object.setPrototypeOf(u,Uint8Array),u.alloc=function(t,e,r){return function(t,e,r){return h(t),t<=0?f(t):void 0!==e?"string"==typeof r?f(t).fill(e,r):f(t).fill(e):f(t)}(t,e,r)},u.allocUnsafe=function(t){return c(t)},u.allocUnsafeSlow=function(t){return c(t)},u.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==u.prototype},u.compare=function(t,e){if(H(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),H(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,n=e.length;for(let i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u.alloc(0);let r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;const n=u.allocUnsafe(e);let i=0;for(r=0;r<t.length;++r){let e=t[r];if(H(e,Uint8Array))i+e.length>n.length?(u.isBuffer(e)||(e=u.from(e)),e.copy(n,i)):Uint8Array.prototype.set.call(n,e,i);else{if(!u.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(n,i)}i+=e.length}return n},u.byteLength=g,u.prototype._isBuffer=!0,u.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)y(this,e,e+1);return this},u.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},u.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},u.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?x(this,0,t):w.apply(this,arguments)},u.prototype.toLocaleString=u.prototype.toString,u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){let t="";const r=e.h2;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},o&&(u.prototype[o]=u.prototype.inspect),u.prototype.compare=function(t,e,r,n,i){if(H(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),!u.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;let o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0);const f=Math.min(o,s),a=this.slice(n,i),h=t.slice(e,r);for(let t=0;t<f;++t)if(a[t]!==h[t]){o=a[t],s=h[t];break}return o<s?-1:s<o?1:0},u.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},u.prototype.indexOf=function(t,e,r){return m(this,t,e,r,!0)},u.prototype.lastIndexOf=function(t,e,r){return m(this,t,e,r,!1)},u.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}const i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let o=!1;for(;;)switch(n){case"hex":return _(this,t,e,r);case"utf8":case"utf-8":return B(this,t,e,r);case"ascii":case"latin1":case"binary":return E(this,t,e,r);case"base64":return v(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const U=4096;function R(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function T(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function $(t,e,r){const n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);let i="";for(let n=e;n<r;++n)i+=Q[t[n]];return i}function L(t,e,r){const n=t.slice(e,r);let i="";for(let t=0;t<n.length-1;t+=2)i+=String.fromCharCode(n[t]+256*n[t+1]);return i}function O(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function S(t,e,r,n,i,o){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function N(t,e,r,n,i){P(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,r}function V(t,e,r,n,i){P(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r+7]=o,o>>=8,t[r+6]=o,o>>=8,t[r+5]=o,o>>=8,t[r+4]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=s,s>>=8,t[r+2]=s,s>>=8,t[r+1]=s,s>>=8,t[r]=s,r+8}function M(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function C(t,e,r,n,o){return e=+e,r>>>=0,o||M(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function D(t,e,r,n,o){return e=+e,r>>>=0,o||M(t,0,r,8),i.write(t,e,r,n,52,8),r+8}u.prototype.slice=function(t,e){const r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);const n=this.subarray(t,e);return Object.setPrototypeOf(n,u.prototype),n},u.prototype.readUintLE=u.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return n},u.prototype.readUintBE=u.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=this[t+--e],i=1;for(;e>0&&(i*=256);)n+=this[t+--e]*i;return n},u.prototype.readUint8=u.prototype.readUInt8=function(t,e){return t>>>=0,e||O(t,1,this.length),this[t]},u.prototype.readUint16LE=u.prototype.readUInt16LE=function(t,e){return t>>>=0,e||O(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUint16BE=u.prototype.readUInt16BE=function(t,e){return t>>>=0,e||O(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUint32LE=u.prototype.readUInt32LE=function(t,e){return t>>>=0,e||O(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUint32BE=u.prototype.readUInt32BE=function(t,e){return t>>>=0,e||O(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readBigUInt64LE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||X(t,this.length-8);const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,i=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(n)+(BigInt(i)<<BigInt(32))})),u.prototype.readBigUInt64BE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||X(t,this.length-8);const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],i=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return(BigInt(n)<<BigInt(32))+BigInt(i)})),u.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},u.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||O(t,e,this.length);let n=e,i=1,o=this[t+--n];for(;n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},u.prototype.readInt8=function(t,e){return t>>>=0,e||O(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){t>>>=0,e||O(t,2,this.length);const r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt16BE=function(t,e){t>>>=0,e||O(t,2,this.length);const r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt32LE=function(t,e){return t>>>=0,e||O(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return t>>>=0,e||O(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readBigInt64LE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||X(t,this.length-8);const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);return(BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),u.prototype.readBigInt64BE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||X(t,this.length-8);const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return(BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)})),u.prototype.readFloatLE=function(t,e){return t>>>=0,e||O(t,4,this.length),i.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return t>>>=0,e||O(t,4,this.length),i.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return t>>>=0,e||O(t,8,this.length),i.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return t>>>=0,e||O(t,8,this.length),i.read(this,t,!1,52,8)},u.prototype.writeUintLE=u.prototype.writeUIntLE=function(t,e,r,n){if(t=+t,e>>>=0,r>>>=0,!n){S(this,t,e,r,Math.pow(2,8*r)-1,0)}let i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},u.prototype.writeUintBE=u.prototype.writeUIntBE=function(t,e,r,n){if(t=+t,e>>>=0,r>>>=0,!n){S(this,t,e,r,Math.pow(2,8*r)-1,0)}let i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},u.prototype.writeUint8=u.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,1,255,0),this[e]=255&t,e+1},u.prototype.writeUint16LE=u.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeUint16BE=u.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeUint32LE=u.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},u.prototype.writeUint32BE=u.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigUInt64LE=Z((function(t,e=0){return N(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeBigUInt64BE=Z((function(t,e=0){return V(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);S(this,t,e,r,n-1,-n)}let i=0,o=1,s=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+r},u.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);S(this,t,e,r,n-1,-n)}let i=r-1,o=1,s=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+r},u.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},u.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigInt64LE=Z((function(t,e=0){return N(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeBigInt64BE=Z((function(t,e=0){return V(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeFloatLE=function(t,e,r){return C(this,t,e,!0,r)},u.prototype.writeFloatBE=function(t,e,r){return C(this,t,e,!1,r)},u.prototype.writeDoubleLE=function(t,e,r){return D(this,t,e,!0,r)},u.prototype.writeDoubleBE=function(t,e,r){return D(this,t,e,!1,r)},u.prototype.copy=function(t,e,r,n){if(!u.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);const i=n-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),i},u.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){const e=t.charCodeAt(0);("utf8"===n&&e<128||"latin1"===n)&&(t=e)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;let i;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{const o=u.isBuffer(t)?t:u.from(t,n),s=o.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<r-e;++i)this[i+e]=o[i%s]}return this};const j={};function z(t,e,r){j[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}function F(t){let e="",r=t.length;const n="-"===t[0]?1:0;for(;r>=n+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}function P(t,e,r,n,i,o){if(t>r||t<e){const n="bigint"==typeof e?"n":"";let i;throw i=o>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(o+1)}${n}`:`>= -(2${n} ** ${8*(o+1)-1}${n}) and < 2 ** ${8*(o+1)-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new j.ERR_OUT_OF_RANGE("value",i,t)}!function(t,e,r){k(e,"offset"),void 0!==t[e]&&void 0!==t[e+r]||X(e,t.length-(r+1))}(n,i,o)}function k(t,e){if("number"!=typeof t)throw new j.ERR_INVALID_ARG_TYPE(e,"number",t)}function X(t,e,r){if(Math.floor(t)!==t)throw k(t,r),new j.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new j.ERR_BUFFER_OUT_OF_BOUNDS;throw new j.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}z("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),z("ERR_INVALID_ARG_TYPE",(function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),z("ERR_OUT_OF_RANGE",(function(t,e,r){let n=`The value of "${t}" is out of range.`,i=r;return Number.isInteger(r)&&Math.abs(r)>2**32?i=F(String(r)):"bigint"==typeof r&&(i=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(i=F(i)),i+="n"),n+=` It must be ${e}. Received ${i}`,n}),RangeError);const q=/[^+/0-9A-Za-z-_]/g;function W(t,e){let r;e=e||1/0;const n=t.length;let i=null;const o=[];for(let s=0;s<n;++s){if(r=t.charCodeAt(s),r>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function G(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(q,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function Y(t,e,r,n){let i;for(i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function H(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function J(t){return t!=t}const Q=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let i=0;i<16;++i)e[n+i]=t[r]+t[i]}return e}();function Z(t){return"undefined"==typeof BigInt?K:t}function K(){throw new Error("BigInt not supported")}},645:(t,e)=>{e.read=function(t,e,r,n,i){var o,s,f=8*i-n-1,u=(1<<f)-1,a=u>>1,h=-7,c=r?i-1:0,l=r?-1:1,p=t[e+c];for(c+=l,o=p&(1<<-h)-1,p>>=-h,h+=f;h>0;o=256*o+t[e+c],c+=l,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;h>0;s=256*s+t[e+c],c+=l,h-=8);if(0===o)o=1-a;else{if(o===u)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,n),o-=a}return(p?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,f,u,a=8*o-i-1,h=(1<<a)-1,c=h>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,d=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(f=isNaN(e)?1:0,s=h):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+c>=1?l/u:l*Math.pow(2,1-c))*u>=2&&(s++,u/=2),s+c>=h?(f=0,s=h):s+c>=1?(f=(e*u-1)*Math.pow(2,i),s+=c):(f=e*Math.pow(2,c-1)*Math.pow(2,i),s=0));i>=8;t[r+p]=255&f,p+=d,f/=256,i-=8);for(s=s<<i|f,a+=i;a>0;t[r+p]=255&s,p+=d,s/=256,a-=8);t[r+p-d]|=128*g}}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}return r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r(899)})()));
//# sourceMappingURL=xdr.js.map

/***/ }),

/***/ 3771:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Account = void 0;
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Account = exports.Account = function () {
  function Account(accountId, sequence) {
    _classCallCheck(this, Account);
    if (_strkey.StrKey.isValidMed25519PublicKey(accountId)) {
      throw new Error('accountId is an M-address; use MuxedAccount instead');
    }
    if (!_strkey.StrKey.isValidEd25519PublicKey(accountId)) {
      throw new Error('accountId is invalid');
    }
    if (!(typeof sequence === 'string')) {
      throw new Error('sequence must be of type string');
    }
    this._accountId = accountId;
    this.sequence = new _bignumber["default"](sequence);
  }
  _createClass(Account, [{
    key: "accountId",
    value: function accountId() {
      return this._accountId;
    }
  }, {
    key: "sequenceNumber",
    value: function sequenceNumber() {
      return this.sequence.toString();
    }
  }, {
    key: "incrementSequenceNumber",
    value: function incrementSequenceNumber() {
      this.sequence = this.sequence.plus(1);
    }
  }]);
  return Account;
}();

/***/ }),

/***/ 4138:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Address = void 0;
var _strkey = __webpack_require__(95);
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Address = exports.Address = function () {
  function Address(address) {
    _classCallCheck(this, Address);
    if (_strkey.StrKey.isValidEd25519PublicKey(address)) {
      this._type = 'account';
      this._key = _strkey.StrKey.decodeEd25519PublicKey(address);
    } else if (_strkey.StrKey.isValidContract(address)) {
      this._type = 'contract';
      this._key = _strkey.StrKey.decodeContract(address);
    } else {
      throw new Error('Unsupported address type');
    }
  }
  _createClass(Address, [{
    key: "toString",
    value: function toString() {
      switch (this._type) {
        case 'account':
          return _strkey.StrKey.encodeEd25519PublicKey(this._key);
        case 'contract':
          return _strkey.StrKey.encodeContract(this._key);
        default:
          throw new Error('Unsupported address type');
      }
    }
  }, {
    key: "toScVal",
    value: function toScVal() {
      return _xdr["default"].ScVal.scvAddress(this.toScAddress());
    }
  }, {
    key: "toScAddress",
    value: function toScAddress() {
      switch (this._type) {
        case 'account':
          return _xdr["default"].ScAddress.scAddressTypeAccount(_xdr["default"].PublicKey.publicKeyTypeEd25519(this._key));
        case 'contract':
          return _xdr["default"].ScAddress.scAddressTypeContract(this._key);
        default:
          throw new Error('Unsupported address type');
      }
    }
  }, {
    key: "toBuffer",
    value: function toBuffer() {
      return this._key;
    }
  }], [{
    key: "fromString",
    value: function fromString(address) {
      return new Address(address);
    }
  }, {
    key: "account",
    value: function account(buffer) {
      return new Address(_strkey.StrKey.encodeEd25519PublicKey(buffer));
    }
  }, {
    key: "contract",
    value: function contract(buffer) {
      return new Address(_strkey.StrKey.encodeContract(buffer));
    }
  }, {
    key: "fromScVal",
    value: function fromScVal(scVal) {
      return Address.fromScAddress(scVal.address());
    }
  }, {
    key: "fromScAddress",
    value: function fromScAddress(scAddress) {
      switch (scAddress["switch"]()) {
        case _xdr["default"].ScAddressType.scAddressTypeAccount():
          return Address.account(scAddress.accountId().ed25519());
        case _xdr["default"].ScAddressType.scAddressTypeContract():
          return Address.contract(scAddress.contractId());
        default:
          throw new Error('Unsupported address type');
      }
    }
  }]);
  return Address;
}();

/***/ }),

/***/ 1247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Asset = void 0;
var _util = __webpack_require__(3957);
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
var _strkey = __webpack_require__(95);
var _hashing = __webpack_require__(8827);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Asset = exports.Asset = function () {
  function Asset(code, issuer) {
    _classCallCheck(this, Asset);
    if (!/^[a-zA-Z0-9]{1,12}$/.test(code)) {
      throw new Error('Asset code is invalid (maximum alphanumeric, 12 characters at max)');
    }
    if (String(code).toLowerCase() !== 'xlm' && !issuer) {
      throw new Error('Issuer cannot be null');
    }
    if (issuer && !_strkey.StrKey.isValidEd25519PublicKey(issuer)) {
      throw new Error('Issuer is invalid');
    }
    if (String(code).toLowerCase() === 'xlm') {
      this.code = 'XLM';
    } else {
      this.code = code;
    }
    this.issuer = issuer;
  }
  _createClass(Asset, [{
    key: "toXDRObject",
    value: function toXDRObject() {
      return this._toXDRObject(_xdr["default"].Asset);
    }
  }, {
    key: "toChangeTrustXDRObject",
    value: function toChangeTrustXDRObject() {
      return this._toXDRObject(_xdr["default"].ChangeTrustAsset);
    }
  }, {
    key: "toTrustLineXDRObject",
    value: function toTrustLineXDRObject() {
      return this._toXDRObject(_xdr["default"].TrustLineAsset);
    }
  }, {
    key: "contractId",
    value: function contractId(networkPassphrase) {
      var networkId = (0, _hashing.hash)(Buffer.from(networkPassphrase));
      var preimage = _xdr["default"].HashIdPreimage.envelopeTypeContractId(new _xdr["default"].HashIdPreimageContractId({
        networkId: networkId,
        contractIdPreimage: _xdr["default"].ContractIdPreimage.contractIdPreimageFromAsset(this.toXDRObject())
      }));
      return _strkey.StrKey.encodeContract((0, _hashing.hash)(preimage.toXDR()));
    }
  }, {
    key: "_toXDRObject",
    value: function _toXDRObject() {
      var xdrAsset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _xdr["default"].Asset;
      if (this.isNative()) {
        return xdrAsset.assetTypeNative();
      }
      var xdrType;
      var xdrTypeString;
      if (this.code.length <= 4) {
        xdrType = _xdr["default"].AlphaNum4;
        xdrTypeString = 'assetTypeCreditAlphanum4';
      } else {
        xdrType = _xdr["default"].AlphaNum12;
        xdrTypeString = 'assetTypeCreditAlphanum12';
      }
      var padLength = this.code.length <= 4 ? 4 : 12;
      var paddedCode = this.code.padEnd(padLength, '\0');
      var assetType = new xdrType({
        assetCode: paddedCode,
        issuer: _keypair.Keypair.fromPublicKey(this.issuer).xdrAccountId()
      });
      return new xdrAsset(xdrTypeString, assetType);
    }
  }, {
    key: "getCode",
    value: function getCode() {
      if (this.code === undefined) {
        return undefined;
      }
      return String(this.code);
    }
  }, {
    key: "getIssuer",
    value: function getIssuer() {
      if (this.issuer === undefined) {
        return undefined;
      }
      return String(this.issuer);
    }
  }, {
    key: "getAssetType",
    value: function getAssetType() {
      switch (this.getRawAssetType()) {
        case _xdr["default"].AssetType.assetTypeNative():
          return 'native';
        case _xdr["default"].AssetType.assetTypeCreditAlphanum4():
          return 'credit_alphanum4';
        case _xdr["default"].AssetType.assetTypeCreditAlphanum12():
          return 'credit_alphanum12';
        default:
          return 'unknown';
      }
    }
  }, {
    key: "getRawAssetType",
    value: function getRawAssetType() {
      if (this.isNative()) {
        return _xdr["default"].AssetType.assetTypeNative();
      }
      if (this.code.length <= 4) {
        return _xdr["default"].AssetType.assetTypeCreditAlphanum4();
      }
      return _xdr["default"].AssetType.assetTypeCreditAlphanum12();
    }
  }, {
    key: "isNative",
    value: function isNative() {
      return !this.issuer;
    }
  }, {
    key: "equals",
    value: function equals(asset) {
      return this.code === asset.getCode() && this.issuer === asset.getIssuer();
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.isNative()) {
        return 'native';
      }
      return "".concat(this.getCode(), ":").concat(this.getIssuer());
    }
  }], [{
    key: "native",
    value: function native() {
      return new Asset('XLM');
    }
  }, {
    key: "fromOperation",
    value: function fromOperation(assetXdr) {
      var anum;
      var code;
      var issuer;
      switch (assetXdr["switch"]()) {
        case _xdr["default"].AssetType.assetTypeNative():
          return this["native"]();
        case _xdr["default"].AssetType.assetTypeCreditAlphanum4():
          anum = assetXdr.alphaNum4();
        case _xdr["default"].AssetType.assetTypeCreditAlphanum12():
          anum = anum || assetXdr.alphaNum12();
          issuer = _strkey.StrKey.encodeEd25519PublicKey(anum.issuer().ed25519());
          code = (0, _util.trimEnd)(anum.assetCode(), '\0');
          return new this(code, issuer);
        default:
          throw new Error("Invalid asset type: ".concat(assetXdr["switch"]().name));
      }
    }
  }, {
    key: "compare",
    value: function compare(assetA, assetB) {
      if (!assetA || !(assetA instanceof Asset)) {
        throw new Error('assetA is invalid');
      }
      if (!assetB || !(assetB instanceof Asset)) {
        throw new Error('assetB is invalid');
      }
      if (assetA.equals(assetB)) {
        return 0;
      }
      var xdrAtype = assetA.getRawAssetType().value;
      var xdrBtype = assetB.getRawAssetType().value;
      if (xdrAtype !== xdrBtype) {
        return xdrAtype < xdrBtype ? -1 : 1;
      }
      var result = asciiCompare(assetA.getCode(), assetB.getCode());
      if (result !== 0) {
        return result;
      }
      return asciiCompare(assetA.getIssuer(), assetB.getIssuer());
    }
  }]);
  return Asset;
}();
function asciiCompare(a, b) {
  return Buffer.compare(Buffer.from(a, 'ascii'), Buffer.from(b, 'ascii'));
}

/***/ }),

/***/ 2108:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.authorizeEntry = authorizeEntry;
exports.authorizeInvocation = authorizeInvocation;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
var _strkey = __webpack_require__(95);
var _network = __webpack_require__(2959);
var _hashing = __webpack_require__(8827);
var _address = __webpack_require__(4138);
var _scval = __webpack_require__(3404);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _regeneratorRuntime() {
  "use strict";
  _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function authorizeEntry(_x, _x2, _x3) {
  return _authorizeEntry.apply(this, arguments);
}
function _authorizeEntry() {
  _authorizeEntry = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(entry, signer, validUntilLedgerSeq) {
    var networkPassphrase,
      clone,
      addrAuth,
      networkId,
      preimage,
      payload,
      signature,
      publicKey,
      sigScVal,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          networkPassphrase = _args.length > 3 && _args[3] !== undefined ? _args[3] : _network.Networks.FUTURENET;
          if (!(entry.credentials()["switch"]().value !== _xdr["default"].SorobanCredentialsType.sorobanCredentialsAddress().value)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", entry);
        case 3:
          clone = _xdr["default"].SorobanAuthorizationEntry.fromXDR(entry.toXDR());
          addrAuth = clone.credentials().address();
          addrAuth.signatureExpirationLedger(validUntilLedgerSeq);
          networkId = (0, _hashing.hash)(Buffer.from(networkPassphrase));
          preimage = _xdr["default"].HashIdPreimage.envelopeTypeSorobanAuthorization(new _xdr["default"].HashIdPreimageSorobanAuthorization({
            networkId: networkId,
            nonce: addrAuth.nonce(),
            invocation: clone.rootInvocation(),
            signatureExpirationLedger: addrAuth.signatureExpirationLedger()
          }));
          payload = (0, _hashing.hash)(preimage.toXDR());
          if (!(typeof signer === 'function')) {
            _context.next = 17;
            break;
          }
          _context.t0 = Buffer;
          _context.next = 13;
          return signer(preimage);
        case 13:
          _context.t1 = _context.sent;
          signature = _context.t0.from.call(_context.t0, _context.t1);
          _context.next = 18;
          break;
        case 17:
          signature = Buffer.from(signer.sign(payload));
        case 18:
          publicKey = _address.Address.fromScAddress(addrAuth.address()).toString();
          if (_keypair.Keypair.fromPublicKey(publicKey).verify(payload, signature)) {
            _context.next = 21;
            break;
          }
          throw new Error("signature doesn't match payload");
        case 21:
          sigScVal = (0, _scval.nativeToScVal)({
            public_key: _strkey.StrKey.decodeEd25519PublicKey(publicKey),
            signature: signature
          }, {
            type: {
              public_key: ['symbol', null],
              signature: ['symbol', null]
            }
          });
          addrAuth.signature(_xdr["default"].ScVal.scvVec([sigScVal]));
          return _context.abrupt("return", clone);
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _authorizeEntry.apply(this, arguments);
}
function authorizeInvocation(signer, validUntilLedgerSeq, invocation) {
  var publicKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var networkPassphrase = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _network.Networks.FUTURENET;
  var kp = _keypair.Keypair.random().rawPublicKey();
  var nonce = new _xdr["default"].Int64(bytesToInt64(kp));
  var pk = publicKey || signer.publicKey();
  if (!pk) {
    throw new Error("authorizeInvocation requires publicKey parameter");
  }
  var entry = new _xdr["default"].SorobanAuthorizationEntry({
    rootInvocation: invocation,
    credentials: _xdr["default"].SorobanCredentials.sorobanCredentialsAddress(new _xdr["default"].SorobanAddressCredentials({
      address: new _address.Address(pk).toScAddress(),
      nonce: nonce,
      signatureExpirationLedger: 0,
      signature: _xdr["default"].ScVal.scvVec([])
    }))
  });
  return authorizeEntry(entry, signer, validUntilLedgerSeq, networkPassphrase);
}
function bytesToInt64(bytes) {
  return bytes.subarray(0, 8).reduce(function (accum, b) {
    return accum << 8 | b;
  }, 0);
}

/***/ }),

/***/ 1515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Claimant = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Claimant = exports.Claimant = function () {
  function Claimant(destination, predicate) {
    _classCallCheck(this, Claimant);
    if (destination && !_strkey.StrKey.isValidEd25519PublicKey(destination)) {
      throw new Error('Destination is invalid');
    }
    this._destination = destination;
    if (!predicate) {
      this._predicate = _xdr["default"].ClaimPredicate.claimPredicateUnconditional();
    } else if (predicate instanceof _xdr["default"].ClaimPredicate) {
      this._predicate = predicate;
    } else {
      throw new Error('Predicate should be an xdr.ClaimPredicate');
    }
  }
  _createClass(Claimant, [{
    key: "toXDRObject",
    value: function toXDRObject() {
      var claimant = new _xdr["default"].ClaimantV0({
        destination: _keypair.Keypair.fromPublicKey(this._destination).xdrAccountId(),
        predicate: this._predicate
      });
      return _xdr["default"].Claimant.claimantTypeV0(claimant);
    }
  }, {
    key: "destination",
    get: function get() {
      return this._destination;
    },
    set: function set(value) {
      throw new Error('Claimant is immutable');
    }
  }, {
    key: "predicate",
    get: function get() {
      return this._predicate;
    },
    set: function set(value) {
      throw new Error('Claimant is immutable');
    }
  }], [{
    key: "predicateUnconditional",
    value: function predicateUnconditional() {
      return _xdr["default"].ClaimPredicate.claimPredicateUnconditional();
    }
  }, {
    key: "predicateAnd",
    value: function predicateAnd(left, right) {
      if (!(left instanceof _xdr["default"].ClaimPredicate)) {
        throw new Error('left Predicate should be an xdr.ClaimPredicate');
      }
      if (!(right instanceof _xdr["default"].ClaimPredicate)) {
        throw new Error('right Predicate should be an xdr.ClaimPredicate');
      }
      return _xdr["default"].ClaimPredicate.claimPredicateAnd([left, right]);
    }
  }, {
    key: "predicateOr",
    value: function predicateOr(left, right) {
      if (!(left instanceof _xdr["default"].ClaimPredicate)) {
        throw new Error('left Predicate should be an xdr.ClaimPredicate');
      }
      if (!(right instanceof _xdr["default"].ClaimPredicate)) {
        throw new Error('right Predicate should be an xdr.ClaimPredicate');
      }
      return _xdr["default"].ClaimPredicate.claimPredicateOr([left, right]);
    }
  }, {
    key: "predicateNot",
    value: function predicateNot(predicate) {
      if (!(predicate instanceof _xdr["default"].ClaimPredicate)) {
        throw new Error('right Predicate should be an xdr.ClaimPredicate');
      }
      return _xdr["default"].ClaimPredicate.claimPredicateNot(predicate);
    }
  }, {
    key: "predicateBeforeAbsoluteTime",
    value: function predicateBeforeAbsoluteTime(absBefore) {
      return _xdr["default"].ClaimPredicate.claimPredicateBeforeAbsoluteTime(_xdr["default"].Int64.fromString(absBefore));
    }
  }, {
    key: "predicateBeforeRelativeTime",
    value: function predicateBeforeRelativeTime(seconds) {
      return _xdr["default"].ClaimPredicate.claimPredicateBeforeRelativeTime(_xdr["default"].Int64.fromString(seconds));
    }
  }, {
    key: "fromXDR",
    value: function fromXDR(claimantXdr) {
      var value;
      switch (claimantXdr["switch"]()) {
        case _xdr["default"].ClaimantType.claimantTypeV0():
          value = claimantXdr.v0();
          return new this(_strkey.StrKey.encodeEd25519PublicKey(value.destination().ed25519()), value.predicate());
        default:
          throw new Error("Invalid claimant type: ".concat(claimantXdr["switch"]().name));
      }
    }
  }]);
  return Claimant;
}();

/***/ }),

/***/ 1958:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Contract = void 0;
var _address = __webpack_require__(4138);
var _operation = __webpack_require__(5458);
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Contract = exports.Contract = function () {
  function Contract(contractId) {
    _classCallCheck(this, Contract);
    try {
      this._id = _strkey.StrKey.decodeContract(contractId);
    } catch (_) {
      throw new Error("Invalid contract ID: ".concat(contractId));
    }
  }
  _createClass(Contract, [{
    key: "contractId",
    value: function contractId() {
      return _strkey.StrKey.encodeContract(this._id);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.contractId();
    }
  }, {
    key: "address",
    value: function address() {
      return _address.Address.contract(this._id);
    }
  }, {
    key: "call",
    value: function call(method) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return _operation.Operation.invokeContractFunction({
        contract: this.address().toString(),
        "function": method,
        args: params
      });
    }
  }, {
    key: "getFootprint",
    value: function getFootprint() {
      return _xdr["default"].LedgerKey.contractData(new _xdr["default"].LedgerKeyContractData({
        contract: this.address().toScAddress(),
        key: _xdr["default"].ScVal.scvLedgerKeyContractInstance(),
        durability: _xdr["default"].ContractDataDurability.persistent()
      }));
    }
  }]);
  return Contract;
}();

/***/ }),

/***/ 225:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.humanizeEvents = humanizeEvents;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _strkey = __webpack_require__(95);
var _scval = __webpack_require__(3404);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function humanizeEvents(events) {
  return events.map(function (e) {
    if (e instanceof _xdr["default"].DiagnosticEvent) {
      return extractEvent(e.event());
    }
    return extractEvent(e);
  });
}
function extractEvent(event) {
  return {
    contractId: event.contractId() === null ? '' : _strkey.StrKey.encodeContract(event.contractId()),
    type: event.type().name,
    topics: event.body().value().topics().map(function (t) {
      return (0, _scval.scValToNative)(t);
    }),
    data: (0, _scval.scValToNative)(event.body().value().data())
  };
}

/***/ }),

/***/ 8370:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FeeBumpTransaction = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _hashing = __webpack_require__(8827);
var _transaction = __webpack_require__(7419);
var _transaction_base = __webpack_require__(2891);
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var FeeBumpTransaction = exports.FeeBumpTransaction = function (_TransactionBase) {
  _inherits(FeeBumpTransaction, _TransactionBase);
  var _super = _createSuper(FeeBumpTransaction);
  function FeeBumpTransaction(envelope, networkPassphrase) {
    var _this;
    _classCallCheck(this, FeeBumpTransaction);
    if (typeof envelope === 'string') {
      var buffer = Buffer.from(envelope, 'base64');
      envelope = _xdr["default"].TransactionEnvelope.fromXDR(buffer);
    }
    var envelopeType = envelope["switch"]();
    if (envelopeType !== _xdr["default"].EnvelopeType.envelopeTypeTxFeeBump()) {
      throw new Error("Invalid TransactionEnvelope: expected an envelopeTypeTxFeeBump but received an ".concat(envelopeType.name, "."));
    }
    var txEnvelope = envelope.value();
    var tx = txEnvelope.tx();
    var fee = tx.fee().toString();
    var signatures = (txEnvelope.signatures() || []).slice();
    _this = _super.call(this, tx, signatures, fee, networkPassphrase);
    var innerTxEnvelope = _xdr["default"].TransactionEnvelope.envelopeTypeTx(tx.innerTx().v1());
    _this._feeSource = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(_this.tx.feeSource());
    _this._innerTransaction = new _transaction.Transaction(innerTxEnvelope, networkPassphrase);
    return _this;
  }
  _createClass(FeeBumpTransaction, [{
    key: "innerTransaction",
    get: function get() {
      return this._innerTransaction;
    }
  }, {
    key: "operations",
    get: function get() {
      return this._innerTransaction.operations;
    }
  }, {
    key: "feeSource",
    get: function get() {
      return this._feeSource;
    }
  }, {
    key: "signatureBase",
    value: function signatureBase() {
      var taggedTransaction = new _xdr["default"].TransactionSignaturePayloadTaggedTransaction.envelopeTypeTxFeeBump(this.tx);
      var txSignature = new _xdr["default"].TransactionSignaturePayload({
        networkId: _xdr["default"].Hash.fromXDR((0, _hashing.hash)(this.networkPassphrase)),
        taggedTransaction: taggedTransaction
      });
      return txSignature.toXDR();
    }
  }, {
    key: "toEnvelope",
    value: function toEnvelope() {
      var envelope = new _xdr["default"].FeeBumpTransactionEnvelope({
        tx: _xdr["default"].FeeBumpTransaction.fromXDR(this.tx.toXDR()),
        signatures: this.signatures.slice()
      });
      return new _xdr["default"].TransactionEnvelope.envelopeTypeTxFeeBump(envelope);
    }
  }]);
  return FeeBumpTransaction;
}(_transaction_base.TransactionBase);

/***/ }),

/***/ 7777:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var XDR = _interopRequireWildcard(__webpack_require__(6263));
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n["default"] = e, t && t.set(e, n), n;
}
var types = XDR.config(function (xdr) {
  var SCSYMBOL_LIMIT = 32;
  var SC_SPEC_DOC_LIMIT = 1024;
  xdr.typedef("Value", xdr.varOpaque());
  xdr.struct("ScpBallot", [["counter", xdr.lookup("Uint32")], ["value", xdr.lookup("Value")]]);
  xdr["enum"]("ScpStatementType", {
    scpStPrepare: 0,
    scpStConfirm: 1,
    scpStExternalize: 2,
    scpStNominate: 3
  });
  xdr.struct("ScpNomination", [["quorumSetHash", xdr.lookup("Hash")], ["votes", xdr.varArray(xdr.lookup("Value"), 2147483647)], ["accepted", xdr.varArray(xdr.lookup("Value"), 2147483647)]]);
  xdr.struct("ScpStatementPrepare", [["quorumSetHash", xdr.lookup("Hash")], ["ballot", xdr.lookup("ScpBallot")], ["prepared", xdr.option(xdr.lookup("ScpBallot"))], ["preparedPrime", xdr.option(xdr.lookup("ScpBallot"))], ["nC", xdr.lookup("Uint32")], ["nH", xdr.lookup("Uint32")]]);
  xdr.struct("ScpStatementConfirm", [["ballot", xdr.lookup("ScpBallot")], ["nPrepared", xdr.lookup("Uint32")], ["nCommit", xdr.lookup("Uint32")], ["nH", xdr.lookup("Uint32")], ["quorumSetHash", xdr.lookup("Hash")]]);
  xdr.struct("ScpStatementExternalize", [["commit", xdr.lookup("ScpBallot")], ["nH", xdr.lookup("Uint32")], ["commitQuorumSetHash", xdr.lookup("Hash")]]);
  xdr.union("ScpStatementPledges", {
    switchOn: xdr.lookup("ScpStatementType"),
    switchName: "type",
    switches: [["scpStPrepare", "prepare"], ["scpStConfirm", "confirm"], ["scpStExternalize", "externalize"], ["scpStNominate", "nominate"]],
    arms: {
      prepare: xdr.lookup("ScpStatementPrepare"),
      confirm: xdr.lookup("ScpStatementConfirm"),
      externalize: xdr.lookup("ScpStatementExternalize"),
      nominate: xdr.lookup("ScpNomination")
    }
  });
  xdr.struct("ScpStatement", [["nodeId", xdr.lookup("NodeId")], ["slotIndex", xdr.lookup("Uint64")], ["pledges", xdr.lookup("ScpStatementPledges")]]);
  xdr.struct("ScpEnvelope", [["statement", xdr.lookup("ScpStatement")], ["signature", xdr.lookup("Signature")]]);
  xdr.struct("ScpQuorumSet", [["threshold", xdr.lookup("Uint32")], ["validators", xdr.varArray(xdr.lookup("NodeId"), 2147483647)], ["innerSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)]]);
  xdr.typedef("Thresholds", xdr.opaque(4));
  xdr.typedef("String32", xdr.string(32));
  xdr.typedef("String64", xdr.string(64));
  xdr.typedef("SequenceNumber", xdr.lookup("Int64"));
  xdr.typedef("DataValue", xdr.varOpaque(64));
  xdr.typedef("PoolId", xdr.lookup("Hash"));
  xdr.typedef("AssetCode4", xdr.opaque(4));
  xdr.typedef("AssetCode12", xdr.opaque(12));
  xdr["enum"]("AssetType", {
    assetTypeNative: 0,
    assetTypeCreditAlphanum4: 1,
    assetTypeCreditAlphanum12: 2,
    assetTypePoolShare: 3
  });
  xdr.union("AssetCode", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeCreditAlphanum4", "assetCode4"], ["assetTypeCreditAlphanum12", "assetCode12"]],
    arms: {
      assetCode4: xdr.lookup("AssetCode4"),
      assetCode12: xdr.lookup("AssetCode12")
    }
  });
  xdr.struct("AlphaNum4", [["assetCode", xdr.lookup("AssetCode4")], ["issuer", xdr.lookup("AccountId")]]);
  xdr.struct("AlphaNum12", [["assetCode", xdr.lookup("AssetCode12")], ["issuer", xdr.lookup("AccountId")]]);
  xdr.union("Asset", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeNative", xdr["void"]()], ["assetTypeCreditAlphanum4", "alphaNum4"], ["assetTypeCreditAlphanum12", "alphaNum12"]],
    arms: {
      alphaNum4: xdr.lookup("AlphaNum4"),
      alphaNum12: xdr.lookup("AlphaNum12")
    }
  });
  xdr.struct("Price", [["n", xdr.lookup("Int32")], ["d", xdr.lookup("Int32")]]);
  xdr.struct("Liabilities", [["buying", xdr.lookup("Int64")], ["selling", xdr.lookup("Int64")]]);
  xdr["enum"]("ThresholdIndices", {
    thresholdMasterWeight: 0,
    thresholdLow: 1,
    thresholdMed: 2,
    thresholdHigh: 3
  });
  xdr["enum"]("LedgerEntryType", {
    account: 0,
    trustline: 1,
    offer: 2,
    data: 3,
    claimableBalance: 4,
    liquidityPool: 5,
    contractData: 6,
    contractCode: 7,
    configSetting: 8,
    ttl: 9
  });
  xdr.struct("Signer", [["key", xdr.lookup("SignerKey")], ["weight", xdr.lookup("Uint32")]]);
  xdr["enum"]("AccountFlags", {
    authRequiredFlag: 1,
    authRevocableFlag: 2,
    authImmutableFlag: 4,
    authClawbackEnabledFlag: 8
  });
  xdr["const"]("MASK_ACCOUNT_FLAGS", 0x7);
  xdr["const"]("MASK_ACCOUNT_FLAGS_V17", 0xf);
  xdr["const"]("MAX_SIGNERS", 20);
  xdr.typedef("SponsorshipDescriptor", xdr.option(xdr.lookup("AccountId")));
  xdr.struct("AccountEntryExtensionV3", [["ext", xdr.lookup("ExtensionPoint")], ["seqLedger", xdr.lookup("Uint32")], ["seqTime", xdr.lookup("TimePoint")]]);
  xdr.union("AccountEntryExtensionV2Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [3, "v3"]],
    arms: {
      v3: xdr.lookup("AccountEntryExtensionV3")
    }
  });
  xdr.struct("AccountEntryExtensionV2", [["numSponsored", xdr.lookup("Uint32")], ["numSponsoring", xdr.lookup("Uint32")], ["signerSponsoringIDs", xdr.varArray(xdr.lookup("SponsorshipDescriptor"), xdr.lookup("MAX_SIGNERS"))], ["ext", xdr.lookup("AccountEntryExtensionV2Ext")]]);
  xdr.union("AccountEntryExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [2, "v2"]],
    arms: {
      v2: xdr.lookup("AccountEntryExtensionV2")
    }
  });
  xdr.struct("AccountEntryExtensionV1", [["liabilities", xdr.lookup("Liabilities")], ["ext", xdr.lookup("AccountEntryExtensionV1Ext")]]);
  xdr.union("AccountEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("AccountEntryExtensionV1")
    }
  });
  xdr.struct("AccountEntry", [["accountId", xdr.lookup("AccountId")], ["balance", xdr.lookup("Int64")], ["seqNum", xdr.lookup("SequenceNumber")], ["numSubEntries", xdr.lookup("Uint32")], ["inflationDest", xdr.option(xdr.lookup("AccountId"))], ["flags", xdr.lookup("Uint32")], ["homeDomain", xdr.lookup("String32")], ["thresholds", xdr.lookup("Thresholds")], ["signers", xdr.varArray(xdr.lookup("Signer"), xdr.lookup("MAX_SIGNERS"))], ["ext", xdr.lookup("AccountEntryExt")]]);
  xdr["enum"]("TrustLineFlags", {
    authorizedFlag: 1,
    authorizedToMaintainLiabilitiesFlag: 2,
    trustlineClawbackEnabledFlag: 4
  });
  xdr["const"]("MASK_TRUSTLINE_FLAGS", 1);
  xdr["const"]("MASK_TRUSTLINE_FLAGS_V13", 3);
  xdr["const"]("MASK_TRUSTLINE_FLAGS_V17", 7);
  xdr["enum"]("LiquidityPoolType", {
    liquidityPoolConstantProduct: 0
  });
  xdr.union("TrustLineAsset", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeNative", xdr["void"]()], ["assetTypeCreditAlphanum4", "alphaNum4"], ["assetTypeCreditAlphanum12", "alphaNum12"], ["assetTypePoolShare", "liquidityPoolId"]],
    arms: {
      alphaNum4: xdr.lookup("AlphaNum4"),
      alphaNum12: xdr.lookup("AlphaNum12"),
      liquidityPoolId: xdr.lookup("PoolId")
    }
  });
  xdr.union("TrustLineEntryExtensionV2Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("TrustLineEntryExtensionV2", [["liquidityPoolUseCount", xdr.lookup("Int32")], ["ext", xdr.lookup("TrustLineEntryExtensionV2Ext")]]);
  xdr.union("TrustLineEntryV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [2, "v2"]],
    arms: {
      v2: xdr.lookup("TrustLineEntryExtensionV2")
    }
  });
  xdr.struct("TrustLineEntryV1", [["liabilities", xdr.lookup("Liabilities")], ["ext", xdr.lookup("TrustLineEntryV1Ext")]]);
  xdr.union("TrustLineEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("TrustLineEntryV1")
    }
  });
  xdr.struct("TrustLineEntry", [["accountId", xdr.lookup("AccountId")], ["asset", xdr.lookup("TrustLineAsset")], ["balance", xdr.lookup("Int64")], ["limit", xdr.lookup("Int64")], ["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("TrustLineEntryExt")]]);
  xdr["enum"]("OfferEntryFlags", {
    passiveFlag: 1
  });
  xdr["const"]("MASK_OFFERENTRY_FLAGS", 1);
  xdr.union("OfferEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("OfferEntry", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")], ["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("OfferEntryExt")]]);
  xdr.union("DataEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("DataEntry", [["accountId", xdr.lookup("AccountId")], ["dataName", xdr.lookup("String64")], ["dataValue", xdr.lookup("DataValue")], ["ext", xdr.lookup("DataEntryExt")]]);
  xdr["enum"]("ClaimPredicateType", {
    claimPredicateUnconditional: 0,
    claimPredicateAnd: 1,
    claimPredicateOr: 2,
    claimPredicateNot: 3,
    claimPredicateBeforeAbsoluteTime: 4,
    claimPredicateBeforeRelativeTime: 5
  });
  xdr.union("ClaimPredicate", {
    switchOn: xdr.lookup("ClaimPredicateType"),
    switchName: "type",
    switches: [["claimPredicateUnconditional", xdr["void"]()], ["claimPredicateAnd", "andPredicates"], ["claimPredicateOr", "orPredicates"], ["claimPredicateNot", "notPredicate"], ["claimPredicateBeforeAbsoluteTime", "absBefore"], ["claimPredicateBeforeRelativeTime", "relBefore"]],
    arms: {
      andPredicates: xdr.varArray(xdr.lookup("ClaimPredicate"), 2),
      orPredicates: xdr.varArray(xdr.lookup("ClaimPredicate"), 2),
      notPredicate: xdr.option(xdr.lookup("ClaimPredicate")),
      absBefore: xdr.lookup("Int64"),
      relBefore: xdr.lookup("Int64")
    }
  });
  xdr["enum"]("ClaimantType", {
    claimantTypeV0: 0
  });
  xdr.struct("ClaimantV0", [["destination", xdr.lookup("AccountId")], ["predicate", xdr.lookup("ClaimPredicate")]]);
  xdr.union("Claimant", {
    switchOn: xdr.lookup("ClaimantType"),
    switchName: "type",
    switches: [["claimantTypeV0", "v0"]],
    arms: {
      v0: xdr.lookup("ClaimantV0")
    }
  });
  xdr["enum"]("ClaimableBalanceIdType", {
    claimableBalanceIdTypeV0: 0
  });
  xdr.union("ClaimableBalanceId", {
    switchOn: xdr.lookup("ClaimableBalanceIdType"),
    switchName: "type",
    switches: [["claimableBalanceIdTypeV0", "v0"]],
    arms: {
      v0: xdr.lookup("Hash")
    }
  });
  xdr["enum"]("ClaimableBalanceFlags", {
    claimableBalanceClawbackEnabledFlag: 1
  });
  xdr["const"]("MASK_CLAIMABLE_BALANCE_FLAGS", 0x1);
  xdr.union("ClaimableBalanceEntryExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("ClaimableBalanceEntryExtensionV1", [["ext", xdr.lookup("ClaimableBalanceEntryExtensionV1Ext")], ["flags", xdr.lookup("Uint32")]]);
  xdr.union("ClaimableBalanceEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("ClaimableBalanceEntryExtensionV1")
    }
  });
  xdr.struct("ClaimableBalanceEntry", [["balanceId", xdr.lookup("ClaimableBalanceId")], ["claimants", xdr.varArray(xdr.lookup("Claimant"), 10)], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["ext", xdr.lookup("ClaimableBalanceEntryExt")]]);
  xdr.struct("LiquidityPoolConstantProductParameters", [["assetA", xdr.lookup("Asset")], ["assetB", xdr.lookup("Asset")], ["fee", xdr.lookup("Int32")]]);
  xdr.struct("LiquidityPoolEntryConstantProduct", [["params", xdr.lookup("LiquidityPoolConstantProductParameters")], ["reserveA", xdr.lookup("Int64")], ["reserveB", xdr.lookup("Int64")], ["totalPoolShares", xdr.lookup("Int64")], ["poolSharesTrustLineCount", xdr.lookup("Int64")]]);
  xdr.union("LiquidityPoolEntryBody", {
    switchOn: xdr.lookup("LiquidityPoolType"),
    switchName: "type",
    switches: [["liquidityPoolConstantProduct", "constantProduct"]],
    arms: {
      constantProduct: xdr.lookup("LiquidityPoolEntryConstantProduct")
    }
  });
  xdr.struct("LiquidityPoolEntry", [["liquidityPoolId", xdr.lookup("PoolId")], ["body", xdr.lookup("LiquidityPoolEntryBody")]]);
  xdr["enum"]("ContractDataDurability", {
    temporary: 0,
    persistent: 1
  });
  xdr.struct("ContractDataEntry", [["ext", xdr.lookup("ExtensionPoint")], ["contract", xdr.lookup("ScAddress")], ["key", xdr.lookup("ScVal")], ["durability", xdr.lookup("ContractDataDurability")], ["val", xdr.lookup("ScVal")]]);
  xdr.struct("ContractCodeEntry", [["ext", xdr.lookup("ExtensionPoint")], ["hash", xdr.lookup("Hash")], ["code", xdr.varOpaque()]]);
  xdr.struct("TtlEntry", [["keyHash", xdr.lookup("Hash")], ["liveUntilLedgerSeq", xdr.lookup("Uint32")]]);
  xdr.union("LedgerEntryExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("LedgerEntryExtensionV1", [["sponsoringId", xdr.lookup("SponsorshipDescriptor")], ["ext", xdr.lookup("LedgerEntryExtensionV1Ext")]]);
  xdr.union("LedgerEntryData", {
    switchOn: xdr.lookup("LedgerEntryType"),
    switchName: "type",
    switches: [["account", "account"], ["trustline", "trustLine"], ["offer", "offer"], ["data", "data"], ["claimableBalance", "claimableBalance"], ["liquidityPool", "liquidityPool"], ["contractData", "contractData"], ["contractCode", "contractCode"], ["configSetting", "configSetting"], ["ttl", "ttl"]],
    arms: {
      account: xdr.lookup("AccountEntry"),
      trustLine: xdr.lookup("TrustLineEntry"),
      offer: xdr.lookup("OfferEntry"),
      data: xdr.lookup("DataEntry"),
      claimableBalance: xdr.lookup("ClaimableBalanceEntry"),
      liquidityPool: xdr.lookup("LiquidityPoolEntry"),
      contractData: xdr.lookup("ContractDataEntry"),
      contractCode: xdr.lookup("ContractCodeEntry"),
      configSetting: xdr.lookup("ConfigSettingEntry"),
      ttl: xdr.lookup("TtlEntry")
    }
  });
  xdr.union("LedgerEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("LedgerEntryExtensionV1")
    }
  });
  xdr.struct("LedgerEntry", [["lastModifiedLedgerSeq", xdr.lookup("Uint32")], ["data", xdr.lookup("LedgerEntryData")], ["ext", xdr.lookup("LedgerEntryExt")]]);
  xdr.struct("LedgerKeyAccount", [["accountId", xdr.lookup("AccountId")]]);
  xdr.struct("LedgerKeyTrustLine", [["accountId", xdr.lookup("AccountId")], ["asset", xdr.lookup("TrustLineAsset")]]);
  xdr.struct("LedgerKeyOffer", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")]]);
  xdr.struct("LedgerKeyData", [["accountId", xdr.lookup("AccountId")], ["dataName", xdr.lookup("String64")]]);
  xdr.struct("LedgerKeyClaimableBalance", [["balanceId", xdr.lookup("ClaimableBalanceId")]]);
  xdr.struct("LedgerKeyLiquidityPool", [["liquidityPoolId", xdr.lookup("PoolId")]]);
  xdr.struct("LedgerKeyContractData", [["contract", xdr.lookup("ScAddress")], ["key", xdr.lookup("ScVal")], ["durability", xdr.lookup("ContractDataDurability")]]);
  xdr.struct("LedgerKeyContractCode", [["hash", xdr.lookup("Hash")]]);
  xdr.struct("LedgerKeyConfigSetting", [["configSettingId", xdr.lookup("ConfigSettingId")]]);
  xdr.struct("LedgerKeyTtl", [["keyHash", xdr.lookup("Hash")]]);
  xdr.union("LedgerKey", {
    switchOn: xdr.lookup("LedgerEntryType"),
    switchName: "type",
    switches: [["account", "account"], ["trustline", "trustLine"], ["offer", "offer"], ["data", "data"], ["claimableBalance", "claimableBalance"], ["liquidityPool", "liquidityPool"], ["contractData", "contractData"], ["contractCode", "contractCode"], ["configSetting", "configSetting"], ["ttl", "ttl"]],
    arms: {
      account: xdr.lookup("LedgerKeyAccount"),
      trustLine: xdr.lookup("LedgerKeyTrustLine"),
      offer: xdr.lookup("LedgerKeyOffer"),
      data: xdr.lookup("LedgerKeyData"),
      claimableBalance: xdr.lookup("LedgerKeyClaimableBalance"),
      liquidityPool: xdr.lookup("LedgerKeyLiquidityPool"),
      contractData: xdr.lookup("LedgerKeyContractData"),
      contractCode: xdr.lookup("LedgerKeyContractCode"),
      configSetting: xdr.lookup("LedgerKeyConfigSetting"),
      ttl: xdr.lookup("LedgerKeyTtl")
    }
  });
  xdr["enum"]("EnvelopeType", {
    envelopeTypeTxV0: 0,
    envelopeTypeScp: 1,
    envelopeTypeTx: 2,
    envelopeTypeAuth: 3,
    envelopeTypeScpvalue: 4,
    envelopeTypeTxFeeBump: 5,
    envelopeTypeOpId: 6,
    envelopeTypePoolRevokeOpId: 7,
    envelopeTypeContractId: 8,
    envelopeTypeSorobanAuthorization: 9
  });
  xdr.typedef("UpgradeType", xdr.varOpaque(128));
  xdr["enum"]("StellarValueType", {
    stellarValueBasic: 0,
    stellarValueSigned: 1
  });
  xdr.struct("LedgerCloseValueSignature", [["nodeId", xdr.lookup("NodeId")], ["signature", xdr.lookup("Signature")]]);
  xdr.union("StellarValueExt", {
    switchOn: xdr.lookup("StellarValueType"),
    switchName: "v",
    switches: [["stellarValueBasic", xdr["void"]()], ["stellarValueSigned", "lcValueSignature"]],
    arms: {
      lcValueSignature: xdr.lookup("LedgerCloseValueSignature")
    }
  });
  xdr.struct("StellarValue", [["txSetHash", xdr.lookup("Hash")], ["closeTime", xdr.lookup("TimePoint")], ["upgrades", xdr.varArray(xdr.lookup("UpgradeType"), 6)], ["ext", xdr.lookup("StellarValueExt")]]);
  xdr["const"]("MASK_LEDGER_HEADER_FLAGS", 0x7);
  xdr["enum"]("LedgerHeaderFlags", {
    disableLiquidityPoolTradingFlag: 1,
    disableLiquidityPoolDepositFlag: 2,
    disableLiquidityPoolWithdrawalFlag: 4
  });
  xdr.union("LedgerHeaderExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("LedgerHeaderExtensionV1", [["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("LedgerHeaderExtensionV1Ext")]]);
  xdr.union("LedgerHeaderExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("LedgerHeaderExtensionV1")
    }
  });
  xdr.struct("LedgerHeader", [["ledgerVersion", xdr.lookup("Uint32")], ["previousLedgerHash", xdr.lookup("Hash")], ["scpValue", xdr.lookup("StellarValue")], ["txSetResultHash", xdr.lookup("Hash")], ["bucketListHash", xdr.lookup("Hash")], ["ledgerSeq", xdr.lookup("Uint32")], ["totalCoins", xdr.lookup("Int64")], ["feePool", xdr.lookup("Int64")], ["inflationSeq", xdr.lookup("Uint32")], ["idPool", xdr.lookup("Uint64")], ["baseFee", xdr.lookup("Uint32")], ["baseReserve", xdr.lookup("Uint32")], ["maxTxSetSize", xdr.lookup("Uint32")], ["skipList", xdr.array(xdr.lookup("Hash"), 4)], ["ext", xdr.lookup("LedgerHeaderExt")]]);
  xdr["enum"]("LedgerUpgradeType", {
    ledgerUpgradeVersion: 1,
    ledgerUpgradeBaseFee: 2,
    ledgerUpgradeMaxTxSetSize: 3,
    ledgerUpgradeBaseReserve: 4,
    ledgerUpgradeFlags: 5,
    ledgerUpgradeConfig: 6,
    ledgerUpgradeMaxSorobanTxSetSize: 7
  });
  xdr.struct("ConfigUpgradeSetKey", [["contractId", xdr.lookup("Hash")], ["contentHash", xdr.lookup("Hash")]]);
  xdr.union("LedgerUpgrade", {
    switchOn: xdr.lookup("LedgerUpgradeType"),
    switchName: "type",
    switches: [["ledgerUpgradeVersion", "newLedgerVersion"], ["ledgerUpgradeBaseFee", "newBaseFee"], ["ledgerUpgradeMaxTxSetSize", "newMaxTxSetSize"], ["ledgerUpgradeBaseReserve", "newBaseReserve"], ["ledgerUpgradeFlags", "newFlags"], ["ledgerUpgradeConfig", "newConfig"], ["ledgerUpgradeMaxSorobanTxSetSize", "newMaxSorobanTxSetSize"]],
    arms: {
      newLedgerVersion: xdr.lookup("Uint32"),
      newBaseFee: xdr.lookup("Uint32"),
      newMaxTxSetSize: xdr.lookup("Uint32"),
      newBaseReserve: xdr.lookup("Uint32"),
      newFlags: xdr.lookup("Uint32"),
      newConfig: xdr.lookup("ConfigUpgradeSetKey"),
      newMaxSorobanTxSetSize: xdr.lookup("Uint32")
    }
  });
  xdr.struct("ConfigUpgradeSet", [["updatedEntry", xdr.varArray(xdr.lookup("ConfigSettingEntry"), 2147483647)]]);
  xdr["enum"]("BucketEntryType", {
    metaentry: -1,
    liveentry: 0,
    deadentry: 1,
    initentry: 2
  });
  xdr.union("BucketMetadataExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("BucketMetadata", [["ledgerVersion", xdr.lookup("Uint32")], ["ext", xdr.lookup("BucketMetadataExt")]]);
  xdr.union("BucketEntry", {
    switchOn: xdr.lookup("BucketEntryType"),
    switchName: "type",
    switches: [["liveentry", "liveEntry"], ["initentry", "liveEntry"], ["deadentry", "deadEntry"], ["metaentry", "metaEntry"]],
    arms: {
      liveEntry: xdr.lookup("LedgerEntry"),
      deadEntry: xdr.lookup("LedgerKey"),
      metaEntry: xdr.lookup("BucketMetadata")
    }
  });
  xdr["enum"]("TxSetComponentType", {
    txsetCompTxsMaybeDiscountedFee: 0
  });
  xdr.struct("TxSetComponentTxsMaybeDiscountedFee", [["baseFee", xdr.option(xdr.lookup("Int64"))], ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)]]);
  xdr.union("TxSetComponent", {
    switchOn: xdr.lookup("TxSetComponentType"),
    switchName: "type",
    switches: [["txsetCompTxsMaybeDiscountedFee", "txsMaybeDiscountedFee"]],
    arms: {
      txsMaybeDiscountedFee: xdr.lookup("TxSetComponentTxsMaybeDiscountedFee")
    }
  });
  xdr.union("TransactionPhase", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "v0Components"]],
    arms: {
      v0Components: xdr.varArray(xdr.lookup("TxSetComponent"), 2147483647)
    }
  });
  xdr.struct("TransactionSet", [["previousLedgerHash", xdr.lookup("Hash")], ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)]]);
  xdr.struct("TransactionSetV1", [["previousLedgerHash", xdr.lookup("Hash")], ["phases", xdr.varArray(xdr.lookup("TransactionPhase"), 2147483647)]]);
  xdr.union("GeneralizedTransactionSet", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[1, "v1TxSet"]],
    arms: {
      v1TxSet: xdr.lookup("TransactionSetV1")
    }
  });
  xdr.struct("TransactionResultPair", [["transactionHash", xdr.lookup("Hash")], ["result", xdr.lookup("TransactionResult")]]);
  xdr.struct("TransactionResultSet", [["results", xdr.varArray(xdr.lookup("TransactionResultPair"), 2147483647)]]);
  xdr.union("TransactionHistoryEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "generalizedTxSet"]],
    arms: {
      generalizedTxSet: xdr.lookup("GeneralizedTransactionSet")
    }
  });
  xdr.struct("TransactionHistoryEntry", [["ledgerSeq", xdr.lookup("Uint32")], ["txSet", xdr.lookup("TransactionSet")], ["ext", xdr.lookup("TransactionHistoryEntryExt")]]);
  xdr.union("TransactionHistoryResultEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("TransactionHistoryResultEntry", [["ledgerSeq", xdr.lookup("Uint32")], ["txResultSet", xdr.lookup("TransactionResultSet")], ["ext", xdr.lookup("TransactionHistoryResultEntryExt")]]);
  xdr.union("LedgerHeaderHistoryEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("LedgerHeaderHistoryEntry", [["hash", xdr.lookup("Hash")], ["header", xdr.lookup("LedgerHeader")], ["ext", xdr.lookup("LedgerHeaderHistoryEntryExt")]]);
  xdr.struct("LedgerScpMessages", [["ledgerSeq", xdr.lookup("Uint32")], ["messages", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)]]);
  xdr.struct("ScpHistoryEntryV0", [["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)], ["ledgerMessages", xdr.lookup("LedgerScpMessages")]]);
  xdr.union("ScpHistoryEntry", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "v0"]],
    arms: {
      v0: xdr.lookup("ScpHistoryEntryV0")
    }
  });
  xdr["enum"]("LedgerEntryChangeType", {
    ledgerEntryCreated: 0,
    ledgerEntryUpdated: 1,
    ledgerEntryRemoved: 2,
    ledgerEntryState: 3
  });
  xdr.union("LedgerEntryChange", {
    switchOn: xdr.lookup("LedgerEntryChangeType"),
    switchName: "type",
    switches: [["ledgerEntryCreated", "created"], ["ledgerEntryUpdated", "updated"], ["ledgerEntryRemoved", "removed"], ["ledgerEntryState", "state"]],
    arms: {
      created: xdr.lookup("LedgerEntry"),
      updated: xdr.lookup("LedgerEntry"),
      removed: xdr.lookup("LedgerKey"),
      state: xdr.lookup("LedgerEntry")
    }
  });
  xdr.typedef("LedgerEntryChanges", xdr.varArray(xdr.lookup("LedgerEntryChange"), 2147483647));
  xdr.struct("OperationMeta", [["changes", xdr.lookup("LedgerEntryChanges")]]);
  xdr.struct("TransactionMetaV1", [["txChanges", xdr.lookup("LedgerEntryChanges")], ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)]]);
  xdr.struct("TransactionMetaV2", [["txChangesBefore", xdr.lookup("LedgerEntryChanges")], ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)], ["txChangesAfter", xdr.lookup("LedgerEntryChanges")]]);
  xdr["enum"]("ContractEventType", {
    system: 0,
    contract: 1,
    diagnostic: 2
  });
  xdr.struct("ContractEventV0", [["topics", xdr.varArray(xdr.lookup("ScVal"), 2147483647)], ["data", xdr.lookup("ScVal")]]);
  xdr.union("ContractEventBody", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "v0"]],
    arms: {
      v0: xdr.lookup("ContractEventV0")
    }
  });
  xdr.struct("ContractEvent", [["ext", xdr.lookup("ExtensionPoint")], ["contractId", xdr.option(xdr.lookup("Hash"))], ["type", xdr.lookup("ContractEventType")], ["body", xdr.lookup("ContractEventBody")]]);
  xdr.struct("DiagnosticEvent", [["inSuccessfulContractCall", xdr.bool()], ["event", xdr.lookup("ContractEvent")]]);
  xdr.struct("SorobanTransactionMeta", [["ext", xdr.lookup("ExtensionPoint")], ["events", xdr.varArray(xdr.lookup("ContractEvent"), 2147483647)], ["returnValue", xdr.lookup("ScVal")], ["diagnosticEvents", xdr.varArray(xdr.lookup("DiagnosticEvent"), 2147483647)]]);
  xdr.struct("TransactionMetaV3", [["ext", xdr.lookup("ExtensionPoint")], ["txChangesBefore", xdr.lookup("LedgerEntryChanges")], ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)], ["txChangesAfter", xdr.lookup("LedgerEntryChanges")], ["sorobanMeta", xdr.option(xdr.lookup("SorobanTransactionMeta"))]]);
  xdr.struct("InvokeHostFunctionSuccessPreImage", [["returnValue", xdr.lookup("ScVal")], ["events", xdr.varArray(xdr.lookup("ContractEvent"), 2147483647)]]);
  xdr.union("TransactionMeta", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "operations"], [1, "v1"], [2, "v2"], [3, "v3"]],
    arms: {
      operations: xdr.varArray(xdr.lookup("OperationMeta"), 2147483647),
      v1: xdr.lookup("TransactionMetaV1"),
      v2: xdr.lookup("TransactionMetaV2"),
      v3: xdr.lookup("TransactionMetaV3")
    }
  });
  xdr.struct("TransactionResultMeta", [["result", xdr.lookup("TransactionResultPair")], ["feeProcessing", xdr.lookup("LedgerEntryChanges")], ["txApplyProcessing", xdr.lookup("TransactionMeta")]]);
  xdr.struct("UpgradeEntryMeta", [["upgrade", xdr.lookup("LedgerUpgrade")], ["changes", xdr.lookup("LedgerEntryChanges")]]);
  xdr.struct("LedgerCloseMetaV0", [["ledgerHeader", xdr.lookup("LedgerHeaderHistoryEntry")], ["txSet", xdr.lookup("TransactionSet")], ["txProcessing", xdr.varArray(xdr.lookup("TransactionResultMeta"), 2147483647)], ["upgradesProcessing", xdr.varArray(xdr.lookup("UpgradeEntryMeta"), 2147483647)], ["scpInfo", xdr.varArray(xdr.lookup("ScpHistoryEntry"), 2147483647)]]);
  xdr.struct("LedgerCloseMetaV1", [["ext", xdr.lookup("ExtensionPoint")], ["ledgerHeader", xdr.lookup("LedgerHeaderHistoryEntry")], ["txSet", xdr.lookup("GeneralizedTransactionSet")], ["txProcessing", xdr.varArray(xdr.lookup("TransactionResultMeta"), 2147483647)], ["upgradesProcessing", xdr.varArray(xdr.lookup("UpgradeEntryMeta"), 2147483647)], ["scpInfo", xdr.varArray(xdr.lookup("ScpHistoryEntry"), 2147483647)], ["totalByteSizeOfBucketList", xdr.lookup("Uint64")], ["evictedTemporaryLedgerKeys", xdr.varArray(xdr.lookup("LedgerKey"), 2147483647)], ["evictedPersistentLedgerEntries", xdr.varArray(xdr.lookup("LedgerEntry"), 2147483647)]]);
  xdr.union("LedgerCloseMeta", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "v0"], [1, "v1"]],
    arms: {
      v0: xdr.lookup("LedgerCloseMetaV0"),
      v1: xdr.lookup("LedgerCloseMetaV1")
    }
  });
  xdr["enum"]("ErrorCode", {
    errMisc: 0,
    errData: 1,
    errConf: 2,
    errAuth: 3,
    errLoad: 4
  });
  xdr.struct("Error", [["code", xdr.lookup("ErrorCode")], ["msg", xdr.string(100)]]);
  xdr.struct("SendMore", [["numMessages", xdr.lookup("Uint32")]]);
  xdr.struct("SendMoreExtended", [["numMessages", xdr.lookup("Uint32")], ["numBytes", xdr.lookup("Uint32")]]);
  xdr.struct("AuthCert", [["pubkey", xdr.lookup("Curve25519Public")], ["expiration", xdr.lookup("Uint64")], ["sig", xdr.lookup("Signature")]]);
  xdr.struct("Hello", [["ledgerVersion", xdr.lookup("Uint32")], ["overlayVersion", xdr.lookup("Uint32")], ["overlayMinVersion", xdr.lookup("Uint32")], ["networkId", xdr.lookup("Hash")], ["versionStr", xdr.string(100)], ["listeningPort", xdr["int"]()], ["peerId", xdr.lookup("NodeId")], ["cert", xdr.lookup("AuthCert")], ["nonce", xdr.lookup("Uint256")]]);
  xdr["const"]("AUTH_MSG_FLAG_FLOW_CONTROL_BYTES_REQUESTED", 200);
  xdr.struct("Auth", [["flags", xdr["int"]()]]);
  xdr["enum"]("IpAddrType", {
    iPv4: 0,
    iPv6: 1
  });
  xdr.union("PeerAddressIp", {
    switchOn: xdr.lookup("IpAddrType"),
    switchName: "type",
    switches: [["iPv4", "ipv4"], ["iPv6", "ipv6"]],
    arms: {
      ipv4: xdr.opaque(4),
      ipv6: xdr.opaque(16)
    }
  });
  xdr.struct("PeerAddress", [["ip", xdr.lookup("PeerAddressIp")], ["port", xdr.lookup("Uint32")], ["numFailures", xdr.lookup("Uint32")]]);
  xdr["enum"]("MessageType", {
    errorMsg: 0,
    auth: 2,
    dontHave: 3,
    getPeers: 4,
    peers: 5,
    getTxSet: 6,
    txSet: 7,
    generalizedTxSet: 17,
    transaction: 8,
    getScpQuorumset: 9,
    scpQuorumset: 10,
    scpMessage: 11,
    getScpState: 12,
    hello: 13,
    surveyRequest: 14,
    surveyResponse: 15,
    sendMore: 16,
    sendMoreExtended: 20,
    floodAdvert: 18,
    floodDemand: 19
  });
  xdr.struct("DontHave", [["type", xdr.lookup("MessageType")], ["reqHash", xdr.lookup("Uint256")]]);
  xdr["enum"]("SurveyMessageCommandType", {
    surveyTopology: 0
  });
  xdr["enum"]("SurveyMessageResponseType", {
    surveyTopologyResponseV0: 0,
    surveyTopologyResponseV1: 1
  });
  xdr.struct("SurveyRequestMessage", [["surveyorPeerId", xdr.lookup("NodeId")], ["surveyedPeerId", xdr.lookup("NodeId")], ["ledgerNum", xdr.lookup("Uint32")], ["encryptionKey", xdr.lookup("Curve25519Public")], ["commandType", xdr.lookup("SurveyMessageCommandType")]]);
  xdr.struct("SignedSurveyRequestMessage", [["requestSignature", xdr.lookup("Signature")], ["request", xdr.lookup("SurveyRequestMessage")]]);
  xdr.typedef("EncryptedBody", xdr.varOpaque(64000));
  xdr.struct("SurveyResponseMessage", [["surveyorPeerId", xdr.lookup("NodeId")], ["surveyedPeerId", xdr.lookup("NodeId")], ["ledgerNum", xdr.lookup("Uint32")], ["commandType", xdr.lookup("SurveyMessageCommandType")], ["encryptedBody", xdr.lookup("EncryptedBody")]]);
  xdr.struct("SignedSurveyResponseMessage", [["responseSignature", xdr.lookup("Signature")], ["response", xdr.lookup("SurveyResponseMessage")]]);
  xdr.struct("PeerStats", [["id", xdr.lookup("NodeId")], ["versionStr", xdr.string(100)], ["messagesRead", xdr.lookup("Uint64")], ["messagesWritten", xdr.lookup("Uint64")], ["bytesRead", xdr.lookup("Uint64")], ["bytesWritten", xdr.lookup("Uint64")], ["secondsConnected", xdr.lookup("Uint64")], ["uniqueFloodBytesRecv", xdr.lookup("Uint64")], ["duplicateFloodBytesRecv", xdr.lookup("Uint64")], ["uniqueFetchBytesRecv", xdr.lookup("Uint64")], ["duplicateFetchBytesRecv", xdr.lookup("Uint64")], ["uniqueFloodMessageRecv", xdr.lookup("Uint64")], ["duplicateFloodMessageRecv", xdr.lookup("Uint64")], ["uniqueFetchMessageRecv", xdr.lookup("Uint64")], ["duplicateFetchMessageRecv", xdr.lookup("Uint64")]]);
  xdr.typedef("PeerStatList", xdr.varArray(xdr.lookup("PeerStats"), 25));
  xdr.struct("TopologyResponseBodyV0", [["inboundPeers", xdr.lookup("PeerStatList")], ["outboundPeers", xdr.lookup("PeerStatList")], ["totalInboundPeerCount", xdr.lookup("Uint32")], ["totalOutboundPeerCount", xdr.lookup("Uint32")]]);
  xdr.struct("TopologyResponseBodyV1", [["inboundPeers", xdr.lookup("PeerStatList")], ["outboundPeers", xdr.lookup("PeerStatList")], ["totalInboundPeerCount", xdr.lookup("Uint32")], ["totalOutboundPeerCount", xdr.lookup("Uint32")], ["maxInboundPeerCount", xdr.lookup("Uint32")], ["maxOutboundPeerCount", xdr.lookup("Uint32")]]);
  xdr.union("SurveyResponseBody", {
    switchOn: xdr.lookup("SurveyMessageResponseType"),
    switchName: "type",
    switches: [["surveyTopologyResponseV0", "topologyResponseBodyV0"], ["surveyTopologyResponseV1", "topologyResponseBodyV1"]],
    arms: {
      topologyResponseBodyV0: xdr.lookup("TopologyResponseBodyV0"),
      topologyResponseBodyV1: xdr.lookup("TopologyResponseBodyV1")
    }
  });
  xdr["const"]("TX_ADVERT_VECTOR_MAX_SIZE", 1000);
  xdr.typedef("TxAdvertVector", xdr.varArray(xdr.lookup("Hash"), xdr.lookup("TX_ADVERT_VECTOR_MAX_SIZE")));
  xdr.struct("FloodAdvert", [["txHashes", xdr.lookup("TxAdvertVector")]]);
  xdr["const"]("TX_DEMAND_VECTOR_MAX_SIZE", 1000);
  xdr.typedef("TxDemandVector", xdr.varArray(xdr.lookup("Hash"), xdr.lookup("TX_DEMAND_VECTOR_MAX_SIZE")));
  xdr.struct("FloodDemand", [["txHashes", xdr.lookup("TxDemandVector")]]);
  xdr.union("StellarMessage", {
    switchOn: xdr.lookup("MessageType"),
    switchName: "type",
    switches: [["errorMsg", "error"], ["hello", "hello"], ["auth", "auth"], ["dontHave", "dontHave"], ["getPeers", xdr["void"]()], ["peers", "peers"], ["getTxSet", "txSetHash"], ["txSet", "txSet"], ["generalizedTxSet", "generalizedTxSet"], ["transaction", "transaction"], ["surveyRequest", "signedSurveyRequestMessage"], ["surveyResponse", "signedSurveyResponseMessage"], ["getScpQuorumset", "qSetHash"], ["scpQuorumset", "qSet"], ["scpMessage", "envelope"], ["getScpState", "getScpLedgerSeq"], ["sendMore", "sendMoreMessage"], ["sendMoreExtended", "sendMoreExtendedMessage"], ["floodAdvert", "floodAdvert"], ["floodDemand", "floodDemand"]],
    arms: {
      error: xdr.lookup("Error"),
      hello: xdr.lookup("Hello"),
      auth: xdr.lookup("Auth"),
      dontHave: xdr.lookup("DontHave"),
      peers: xdr.varArray(xdr.lookup("PeerAddress"), 100),
      txSetHash: xdr.lookup("Uint256"),
      txSet: xdr.lookup("TransactionSet"),
      generalizedTxSet: xdr.lookup("GeneralizedTransactionSet"),
      transaction: xdr.lookup("TransactionEnvelope"),
      signedSurveyRequestMessage: xdr.lookup("SignedSurveyRequestMessage"),
      signedSurveyResponseMessage: xdr.lookup("SignedSurveyResponseMessage"),
      qSetHash: xdr.lookup("Uint256"),
      qSet: xdr.lookup("ScpQuorumSet"),
      envelope: xdr.lookup("ScpEnvelope"),
      getScpLedgerSeq: xdr.lookup("Uint32"),
      sendMoreMessage: xdr.lookup("SendMore"),
      sendMoreExtendedMessage: xdr.lookup("SendMoreExtended"),
      floodAdvert: xdr.lookup("FloodAdvert"),
      floodDemand: xdr.lookup("FloodDemand")
    }
  });
  xdr.struct("AuthenticatedMessageV0", [["sequence", xdr.lookup("Uint64")], ["message", xdr.lookup("StellarMessage")], ["mac", xdr.lookup("HmacSha256Mac")]]);
  xdr.union("AuthenticatedMessage", {
    switchOn: xdr.lookup("Uint32"),
    switchName: "v",
    switches: [[0, "v0"]],
    arms: {
      v0: xdr.lookup("AuthenticatedMessageV0")
    }
  });
  xdr["const"]("MAX_OPS_PER_TX", 100);
  xdr.union("LiquidityPoolParameters", {
    switchOn: xdr.lookup("LiquidityPoolType"),
    switchName: "type",
    switches: [["liquidityPoolConstantProduct", "constantProduct"]],
    arms: {
      constantProduct: xdr.lookup("LiquidityPoolConstantProductParameters")
    }
  });
  xdr.struct("MuxedAccountMed25519", [["id", xdr.lookup("Uint64")], ["ed25519", xdr.lookup("Uint256")]]);
  xdr.union("MuxedAccount", {
    switchOn: xdr.lookup("CryptoKeyType"),
    switchName: "type",
    switches: [["keyTypeEd25519", "ed25519"], ["keyTypeMuxedEd25519", "med25519"]],
    arms: {
      ed25519: xdr.lookup("Uint256"),
      med25519: xdr.lookup("MuxedAccountMed25519")
    }
  });
  xdr.struct("DecoratedSignature", [["hint", xdr.lookup("SignatureHint")], ["signature", xdr.lookup("Signature")]]);
  xdr["enum"]("OperationType", {
    createAccount: 0,
    payment: 1,
    pathPaymentStrictReceive: 2,
    manageSellOffer: 3,
    createPassiveSellOffer: 4,
    setOptions: 5,
    changeTrust: 6,
    allowTrust: 7,
    accountMerge: 8,
    inflation: 9,
    manageData: 10,
    bumpSequence: 11,
    manageBuyOffer: 12,
    pathPaymentStrictSend: 13,
    createClaimableBalance: 14,
    claimClaimableBalance: 15,
    beginSponsoringFutureReserves: 16,
    endSponsoringFutureReserves: 17,
    revokeSponsorship: 18,
    clawback: 19,
    clawbackClaimableBalance: 20,
    setTrustLineFlags: 21,
    liquidityPoolDeposit: 22,
    liquidityPoolWithdraw: 23,
    invokeHostFunction: 24,
    extendFootprintTtl: 25,
    restoreFootprint: 26
  });
  xdr.struct("CreateAccountOp", [["destination", xdr.lookup("AccountId")], ["startingBalance", xdr.lookup("Int64")]]);
  xdr.struct("PaymentOp", [["destination", xdr.lookup("MuxedAccount")], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")]]);
  xdr.struct("PathPaymentStrictReceiveOp", [["sendAsset", xdr.lookup("Asset")], ["sendMax", xdr.lookup("Int64")], ["destination", xdr.lookup("MuxedAccount")], ["destAsset", xdr.lookup("Asset")], ["destAmount", xdr.lookup("Int64")], ["path", xdr.varArray(xdr.lookup("Asset"), 5)]]);
  xdr.struct("PathPaymentStrictSendOp", [["sendAsset", xdr.lookup("Asset")], ["sendAmount", xdr.lookup("Int64")], ["destination", xdr.lookup("MuxedAccount")], ["destAsset", xdr.lookup("Asset")], ["destMin", xdr.lookup("Int64")], ["path", xdr.varArray(xdr.lookup("Asset"), 5)]]);
  xdr.struct("ManageSellOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["offerId", xdr.lookup("Int64")]]);
  xdr.struct("ManageBuyOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["buyAmount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["offerId", xdr.lookup("Int64")]]);
  xdr.struct("CreatePassiveSellOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")]]);
  xdr.struct("SetOptionsOp", [["inflationDest", xdr.option(xdr.lookup("AccountId"))], ["clearFlags", xdr.option(xdr.lookup("Uint32"))], ["setFlags", xdr.option(xdr.lookup("Uint32"))], ["masterWeight", xdr.option(xdr.lookup("Uint32"))], ["lowThreshold", xdr.option(xdr.lookup("Uint32"))], ["medThreshold", xdr.option(xdr.lookup("Uint32"))], ["highThreshold", xdr.option(xdr.lookup("Uint32"))], ["homeDomain", xdr.option(xdr.lookup("String32"))], ["signer", xdr.option(xdr.lookup("Signer"))]]);
  xdr.union("ChangeTrustAsset", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeNative", xdr["void"]()], ["assetTypeCreditAlphanum4", "alphaNum4"], ["assetTypeCreditAlphanum12", "alphaNum12"], ["assetTypePoolShare", "liquidityPool"]],
    arms: {
      alphaNum4: xdr.lookup("AlphaNum4"),
      alphaNum12: xdr.lookup("AlphaNum12"),
      liquidityPool: xdr.lookup("LiquidityPoolParameters")
    }
  });
  xdr.struct("ChangeTrustOp", [["line", xdr.lookup("ChangeTrustAsset")], ["limit", xdr.lookup("Int64")]]);
  xdr.struct("AllowTrustOp", [["trustor", xdr.lookup("AccountId")], ["asset", xdr.lookup("AssetCode")], ["authorize", xdr.lookup("Uint32")]]);
  xdr.struct("ManageDataOp", [["dataName", xdr.lookup("String64")], ["dataValue", xdr.option(xdr.lookup("DataValue"))]]);
  xdr.struct("BumpSequenceOp", [["bumpTo", xdr.lookup("SequenceNumber")]]);
  xdr.struct("CreateClaimableBalanceOp", [["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["claimants", xdr.varArray(xdr.lookup("Claimant"), 10)]]);
  xdr.struct("ClaimClaimableBalanceOp", [["balanceId", xdr.lookup("ClaimableBalanceId")]]);
  xdr.struct("BeginSponsoringFutureReservesOp", [["sponsoredId", xdr.lookup("AccountId")]]);
  xdr["enum"]("RevokeSponsorshipType", {
    revokeSponsorshipLedgerEntry: 0,
    revokeSponsorshipSigner: 1
  });
  xdr.struct("RevokeSponsorshipOpSigner", [["accountId", xdr.lookup("AccountId")], ["signerKey", xdr.lookup("SignerKey")]]);
  xdr.union("RevokeSponsorshipOp", {
    switchOn: xdr.lookup("RevokeSponsorshipType"),
    switchName: "type",
    switches: [["revokeSponsorshipLedgerEntry", "ledgerKey"], ["revokeSponsorshipSigner", "signer"]],
    arms: {
      ledgerKey: xdr.lookup("LedgerKey"),
      signer: xdr.lookup("RevokeSponsorshipOpSigner")
    }
  });
  xdr.struct("ClawbackOp", [["asset", xdr.lookup("Asset")], ["from", xdr.lookup("MuxedAccount")], ["amount", xdr.lookup("Int64")]]);
  xdr.struct("ClawbackClaimableBalanceOp", [["balanceId", xdr.lookup("ClaimableBalanceId")]]);
  xdr.struct("SetTrustLineFlagsOp", [["trustor", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")], ["clearFlags", xdr.lookup("Uint32")], ["setFlags", xdr.lookup("Uint32")]]);
  xdr["const"]("LIQUIDITY_POOL_FEE_V18", 30);
  xdr.struct("LiquidityPoolDepositOp", [["liquidityPoolId", xdr.lookup("PoolId")], ["maxAmountA", xdr.lookup("Int64")], ["maxAmountB", xdr.lookup("Int64")], ["minPrice", xdr.lookup("Price")], ["maxPrice", xdr.lookup("Price")]]);
  xdr.struct("LiquidityPoolWithdrawOp", [["liquidityPoolId", xdr.lookup("PoolId")], ["amount", xdr.lookup("Int64")], ["minAmountA", xdr.lookup("Int64")], ["minAmountB", xdr.lookup("Int64")]]);
  xdr["enum"]("HostFunctionType", {
    hostFunctionTypeInvokeContract: 0,
    hostFunctionTypeCreateContract: 1,
    hostFunctionTypeUploadContractWasm: 2
  });
  xdr["enum"]("ContractIdPreimageType", {
    contractIdPreimageFromAddress: 0,
    contractIdPreimageFromAsset: 1
  });
  xdr.struct("ContractIdPreimageFromAddress", [["address", xdr.lookup("ScAddress")], ["salt", xdr.lookup("Uint256")]]);
  xdr.union("ContractIdPreimage", {
    switchOn: xdr.lookup("ContractIdPreimageType"),
    switchName: "type",
    switches: [["contractIdPreimageFromAddress", "fromAddress"], ["contractIdPreimageFromAsset", "fromAsset"]],
    arms: {
      fromAddress: xdr.lookup("ContractIdPreimageFromAddress"),
      fromAsset: xdr.lookup("Asset")
    }
  });
  xdr.struct("CreateContractArgs", [["contractIdPreimage", xdr.lookup("ContractIdPreimage")], ["executable", xdr.lookup("ContractExecutable")]]);
  xdr.struct("InvokeContractArgs", [["contractAddress", xdr.lookup("ScAddress")], ["functionName", xdr.lookup("ScSymbol")], ["args", xdr.varArray(xdr.lookup("ScVal"), 2147483647)]]);
  xdr.union("HostFunction", {
    switchOn: xdr.lookup("HostFunctionType"),
    switchName: "type",
    switches: [["hostFunctionTypeInvokeContract", "invokeContract"], ["hostFunctionTypeCreateContract", "createContract"], ["hostFunctionTypeUploadContractWasm", "wasm"]],
    arms: {
      invokeContract: xdr.lookup("InvokeContractArgs"),
      createContract: xdr.lookup("CreateContractArgs"),
      wasm: xdr.varOpaque()
    }
  });
  xdr["enum"]("SorobanAuthorizedFunctionType", {
    sorobanAuthorizedFunctionTypeContractFn: 0,
    sorobanAuthorizedFunctionTypeCreateContractHostFn: 1
  });
  xdr.union("SorobanAuthorizedFunction", {
    switchOn: xdr.lookup("SorobanAuthorizedFunctionType"),
    switchName: "type",
    switches: [["sorobanAuthorizedFunctionTypeContractFn", "contractFn"], ["sorobanAuthorizedFunctionTypeCreateContractHostFn", "createContractHostFn"]],
    arms: {
      contractFn: xdr.lookup("InvokeContractArgs"),
      createContractHostFn: xdr.lookup("CreateContractArgs")
    }
  });
  xdr.struct("SorobanAuthorizedInvocation", [["function", xdr.lookup("SorobanAuthorizedFunction")], ["subInvocations", xdr.varArray(xdr.lookup("SorobanAuthorizedInvocation"), 2147483647)]]);
  xdr.struct("SorobanAddressCredentials", [["address", xdr.lookup("ScAddress")], ["nonce", xdr.lookup("Int64")], ["signatureExpirationLedger", xdr.lookup("Uint32")], ["signature", xdr.lookup("ScVal")]]);
  xdr["enum"]("SorobanCredentialsType", {
    sorobanCredentialsSourceAccount: 0,
    sorobanCredentialsAddress: 1
  });
  xdr.union("SorobanCredentials", {
    switchOn: xdr.lookup("SorobanCredentialsType"),
    switchName: "type",
    switches: [["sorobanCredentialsSourceAccount", xdr["void"]()], ["sorobanCredentialsAddress", "address"]],
    arms: {
      address: xdr.lookup("SorobanAddressCredentials")
    }
  });
  xdr.struct("SorobanAuthorizationEntry", [["credentials", xdr.lookup("SorobanCredentials")], ["rootInvocation", xdr.lookup("SorobanAuthorizedInvocation")]]);
  xdr.struct("InvokeHostFunctionOp", [["hostFunction", xdr.lookup("HostFunction")], ["auth", xdr.varArray(xdr.lookup("SorobanAuthorizationEntry"), 2147483647)]]);
  xdr.struct("ExtendFootprintTtlOp", [["ext", xdr.lookup("ExtensionPoint")], ["extendTo", xdr.lookup("Uint32")]]);
  xdr.struct("RestoreFootprintOp", [["ext", xdr.lookup("ExtensionPoint")]]);
  xdr.union("OperationBody", {
    switchOn: xdr.lookup("OperationType"),
    switchName: "type",
    switches: [["createAccount", "createAccountOp"], ["payment", "paymentOp"], ["pathPaymentStrictReceive", "pathPaymentStrictReceiveOp"], ["manageSellOffer", "manageSellOfferOp"], ["createPassiveSellOffer", "createPassiveSellOfferOp"], ["setOptions", "setOptionsOp"], ["changeTrust", "changeTrustOp"], ["allowTrust", "allowTrustOp"], ["accountMerge", "destination"], ["inflation", xdr["void"]()], ["manageData", "manageDataOp"], ["bumpSequence", "bumpSequenceOp"], ["manageBuyOffer", "manageBuyOfferOp"], ["pathPaymentStrictSend", "pathPaymentStrictSendOp"], ["createClaimableBalance", "createClaimableBalanceOp"], ["claimClaimableBalance", "claimClaimableBalanceOp"], ["beginSponsoringFutureReserves", "beginSponsoringFutureReservesOp"], ["endSponsoringFutureReserves", xdr["void"]()], ["revokeSponsorship", "revokeSponsorshipOp"], ["clawback", "clawbackOp"], ["clawbackClaimableBalance", "clawbackClaimableBalanceOp"], ["setTrustLineFlags", "setTrustLineFlagsOp"], ["liquidityPoolDeposit", "liquidityPoolDepositOp"], ["liquidityPoolWithdraw", "liquidityPoolWithdrawOp"], ["invokeHostFunction", "invokeHostFunctionOp"], ["extendFootprintTtl", "extendFootprintTtlOp"], ["restoreFootprint", "restoreFootprintOp"]],
    arms: {
      createAccountOp: xdr.lookup("CreateAccountOp"),
      paymentOp: xdr.lookup("PaymentOp"),
      pathPaymentStrictReceiveOp: xdr.lookup("PathPaymentStrictReceiveOp"),
      manageSellOfferOp: xdr.lookup("ManageSellOfferOp"),
      createPassiveSellOfferOp: xdr.lookup("CreatePassiveSellOfferOp"),
      setOptionsOp: xdr.lookup("SetOptionsOp"),
      changeTrustOp: xdr.lookup("ChangeTrustOp"),
      allowTrustOp: xdr.lookup("AllowTrustOp"),
      destination: xdr.lookup("MuxedAccount"),
      manageDataOp: xdr.lookup("ManageDataOp"),
      bumpSequenceOp: xdr.lookup("BumpSequenceOp"),
      manageBuyOfferOp: xdr.lookup("ManageBuyOfferOp"),
      pathPaymentStrictSendOp: xdr.lookup("PathPaymentStrictSendOp"),
      createClaimableBalanceOp: xdr.lookup("CreateClaimableBalanceOp"),
      claimClaimableBalanceOp: xdr.lookup("ClaimClaimableBalanceOp"),
      beginSponsoringFutureReservesOp: xdr.lookup("BeginSponsoringFutureReservesOp"),
      revokeSponsorshipOp: xdr.lookup("RevokeSponsorshipOp"),
      clawbackOp: xdr.lookup("ClawbackOp"),
      clawbackClaimableBalanceOp: xdr.lookup("ClawbackClaimableBalanceOp"),
      setTrustLineFlagsOp: xdr.lookup("SetTrustLineFlagsOp"),
      liquidityPoolDepositOp: xdr.lookup("LiquidityPoolDepositOp"),
      liquidityPoolWithdrawOp: xdr.lookup("LiquidityPoolWithdrawOp"),
      invokeHostFunctionOp: xdr.lookup("InvokeHostFunctionOp"),
      extendFootprintTtlOp: xdr.lookup("ExtendFootprintTtlOp"),
      restoreFootprintOp: xdr.lookup("RestoreFootprintOp")
    }
  });
  xdr.struct("Operation", [["sourceAccount", xdr.option(xdr.lookup("MuxedAccount"))], ["body", xdr.lookup("OperationBody")]]);
  xdr.struct("HashIdPreimageOperationId", [["sourceAccount", xdr.lookup("AccountId")], ["seqNum", xdr.lookup("SequenceNumber")], ["opNum", xdr.lookup("Uint32")]]);
  xdr.struct("HashIdPreimageRevokeId", [["sourceAccount", xdr.lookup("AccountId")], ["seqNum", xdr.lookup("SequenceNumber")], ["opNum", xdr.lookup("Uint32")], ["liquidityPoolId", xdr.lookup("PoolId")], ["asset", xdr.lookup("Asset")]]);
  xdr.struct("HashIdPreimageContractId", [["networkId", xdr.lookup("Hash")], ["contractIdPreimage", xdr.lookup("ContractIdPreimage")]]);
  xdr.struct("HashIdPreimageSorobanAuthorization", [["networkId", xdr.lookup("Hash")], ["nonce", xdr.lookup("Int64")], ["signatureExpirationLedger", xdr.lookup("Uint32")], ["invocation", xdr.lookup("SorobanAuthorizedInvocation")]]);
  xdr.union("HashIdPreimage", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeOpId", "operationId"], ["envelopeTypePoolRevokeOpId", "revokeId"], ["envelopeTypeContractId", "contractId"], ["envelopeTypeSorobanAuthorization", "sorobanAuthorization"]],
    arms: {
      operationId: xdr.lookup("HashIdPreimageOperationId"),
      revokeId: xdr.lookup("HashIdPreimageRevokeId"),
      contractId: xdr.lookup("HashIdPreimageContractId"),
      sorobanAuthorization: xdr.lookup("HashIdPreimageSorobanAuthorization")
    }
  });
  xdr["enum"]("MemoType", {
    memoNone: 0,
    memoText: 1,
    memoId: 2,
    memoHash: 3,
    memoReturn: 4
  });
  xdr.union("Memo", {
    switchOn: xdr.lookup("MemoType"),
    switchName: "type",
    switches: [["memoNone", xdr["void"]()], ["memoText", "text"], ["memoId", "id"], ["memoHash", "hash"], ["memoReturn", "retHash"]],
    arms: {
      text: xdr.string(28),
      id: xdr.lookup("Uint64"),
      hash: xdr.lookup("Hash"),
      retHash: xdr.lookup("Hash")
    }
  });
  xdr.struct("TimeBounds", [["minTime", xdr.lookup("TimePoint")], ["maxTime", xdr.lookup("TimePoint")]]);
  xdr.struct("LedgerBounds", [["minLedger", xdr.lookup("Uint32")], ["maxLedger", xdr.lookup("Uint32")]]);
  xdr.struct("PreconditionsV2", [["timeBounds", xdr.option(xdr.lookup("TimeBounds"))], ["ledgerBounds", xdr.option(xdr.lookup("LedgerBounds"))], ["minSeqNum", xdr.option(xdr.lookup("SequenceNumber"))], ["minSeqAge", xdr.lookup("Duration")], ["minSeqLedgerGap", xdr.lookup("Uint32")], ["extraSigners", xdr.varArray(xdr.lookup("SignerKey"), 2)]]);
  xdr["enum"]("PreconditionType", {
    precondNone: 0,
    precondTime: 1,
    precondV2: 2
  });
  xdr.union("Preconditions", {
    switchOn: xdr.lookup("PreconditionType"),
    switchName: "type",
    switches: [["precondNone", xdr["void"]()], ["precondTime", "timeBounds"], ["precondV2", "v2"]],
    arms: {
      timeBounds: xdr.lookup("TimeBounds"),
      v2: xdr.lookup("PreconditionsV2")
    }
  });
  xdr.struct("LedgerFootprint", [["readOnly", xdr.varArray(xdr.lookup("LedgerKey"), 2147483647)], ["readWrite", xdr.varArray(xdr.lookup("LedgerKey"), 2147483647)]]);
  xdr.struct("SorobanResources", [["footprint", xdr.lookup("LedgerFootprint")], ["instructions", xdr.lookup("Uint32")], ["readBytes", xdr.lookup("Uint32")], ["writeBytes", xdr.lookup("Uint32")]]);
  xdr.struct("SorobanTransactionData", [["ext", xdr.lookup("ExtensionPoint")], ["resources", xdr.lookup("SorobanResources")], ["resourceFee", xdr.lookup("Int64")]]);
  xdr.union("TransactionV0Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("TransactionV0", [["sourceAccountEd25519", xdr.lookup("Uint256")], ["fee", xdr.lookup("Uint32")], ["seqNum", xdr.lookup("SequenceNumber")], ["timeBounds", xdr.option(xdr.lookup("TimeBounds"))], ["memo", xdr.lookup("Memo")], ["operations", xdr.varArray(xdr.lookup("Operation"), xdr.lookup("MAX_OPS_PER_TX"))], ["ext", xdr.lookup("TransactionV0Ext")]]);
  xdr.struct("TransactionV0Envelope", [["tx", xdr.lookup("TransactionV0")], ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)]]);
  xdr.union("TransactionExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "sorobanData"]],
    arms: {
      sorobanData: xdr.lookup("SorobanTransactionData")
    }
  });
  xdr.struct("Transaction", [["sourceAccount", xdr.lookup("MuxedAccount")], ["fee", xdr.lookup("Uint32")], ["seqNum", xdr.lookup("SequenceNumber")], ["cond", xdr.lookup("Preconditions")], ["memo", xdr.lookup("Memo")], ["operations", xdr.varArray(xdr.lookup("Operation"), xdr.lookup("MAX_OPS_PER_TX"))], ["ext", xdr.lookup("TransactionExt")]]);
  xdr.struct("TransactionV1Envelope", [["tx", xdr.lookup("Transaction")], ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)]]);
  xdr.union("FeeBumpTransactionInnerTx", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeTx", "v1"]],
    arms: {
      v1: xdr.lookup("TransactionV1Envelope")
    }
  });
  xdr.union("FeeBumpTransactionExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("FeeBumpTransaction", [["feeSource", xdr.lookup("MuxedAccount")], ["fee", xdr.lookup("Int64")], ["innerTx", xdr.lookup("FeeBumpTransactionInnerTx")], ["ext", xdr.lookup("FeeBumpTransactionExt")]]);
  xdr.struct("FeeBumpTransactionEnvelope", [["tx", xdr.lookup("FeeBumpTransaction")], ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)]]);
  xdr.union("TransactionEnvelope", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeTxV0", "v0"], ["envelopeTypeTx", "v1"], ["envelopeTypeTxFeeBump", "feeBump"]],
    arms: {
      v0: xdr.lookup("TransactionV0Envelope"),
      v1: xdr.lookup("TransactionV1Envelope"),
      feeBump: xdr.lookup("FeeBumpTransactionEnvelope")
    }
  });
  xdr.union("TransactionSignaturePayloadTaggedTransaction", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeTx", "tx"], ["envelopeTypeTxFeeBump", "feeBump"]],
    arms: {
      tx: xdr.lookup("Transaction"),
      feeBump: xdr.lookup("FeeBumpTransaction")
    }
  });
  xdr.struct("TransactionSignaturePayload", [["networkId", xdr.lookup("Hash")], ["taggedTransaction", xdr.lookup("TransactionSignaturePayloadTaggedTransaction")]]);
  xdr["enum"]("ClaimAtomType", {
    claimAtomTypeV0: 0,
    claimAtomTypeOrderBook: 1,
    claimAtomTypeLiquidityPool: 2
  });
  xdr.struct("ClaimOfferAtomV0", [["sellerEd25519", xdr.lookup("Uint256")], ["offerId", xdr.lookup("Int64")], ["assetSold", xdr.lookup("Asset")], ["amountSold", xdr.lookup("Int64")], ["assetBought", xdr.lookup("Asset")], ["amountBought", xdr.lookup("Int64")]]);
  xdr.struct("ClaimOfferAtom", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")], ["assetSold", xdr.lookup("Asset")], ["amountSold", xdr.lookup("Int64")], ["assetBought", xdr.lookup("Asset")], ["amountBought", xdr.lookup("Int64")]]);
  xdr.struct("ClaimLiquidityAtom", [["liquidityPoolId", xdr.lookup("PoolId")], ["assetSold", xdr.lookup("Asset")], ["amountSold", xdr.lookup("Int64")], ["assetBought", xdr.lookup("Asset")], ["amountBought", xdr.lookup("Int64")]]);
  xdr.union("ClaimAtom", {
    switchOn: xdr.lookup("ClaimAtomType"),
    switchName: "type",
    switches: [["claimAtomTypeV0", "v0"], ["claimAtomTypeOrderBook", "orderBook"], ["claimAtomTypeLiquidityPool", "liquidityPool"]],
    arms: {
      v0: xdr.lookup("ClaimOfferAtomV0"),
      orderBook: xdr.lookup("ClaimOfferAtom"),
      liquidityPool: xdr.lookup("ClaimLiquidityAtom")
    }
  });
  xdr["enum"]("CreateAccountResultCode", {
    createAccountSuccess: 0,
    createAccountMalformed: -1,
    createAccountUnderfunded: -2,
    createAccountLowReserve: -3,
    createAccountAlreadyExist: -4
  });
  xdr.union("CreateAccountResult", {
    switchOn: xdr.lookup("CreateAccountResultCode"),
    switchName: "code",
    switches: [["createAccountSuccess", xdr["void"]()], ["createAccountMalformed", xdr["void"]()], ["createAccountUnderfunded", xdr["void"]()], ["createAccountLowReserve", xdr["void"]()], ["createAccountAlreadyExist", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("PaymentResultCode", {
    paymentSuccess: 0,
    paymentMalformed: -1,
    paymentUnderfunded: -2,
    paymentSrcNoTrust: -3,
    paymentSrcNotAuthorized: -4,
    paymentNoDestination: -5,
    paymentNoTrust: -6,
    paymentNotAuthorized: -7,
    paymentLineFull: -8,
    paymentNoIssuer: -9
  });
  xdr.union("PaymentResult", {
    switchOn: xdr.lookup("PaymentResultCode"),
    switchName: "code",
    switches: [["paymentSuccess", xdr["void"]()], ["paymentMalformed", xdr["void"]()], ["paymentUnderfunded", xdr["void"]()], ["paymentSrcNoTrust", xdr["void"]()], ["paymentSrcNotAuthorized", xdr["void"]()], ["paymentNoDestination", xdr["void"]()], ["paymentNoTrust", xdr["void"]()], ["paymentNotAuthorized", xdr["void"]()], ["paymentLineFull", xdr["void"]()], ["paymentNoIssuer", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("PathPaymentStrictReceiveResultCode", {
    pathPaymentStrictReceiveSuccess: 0,
    pathPaymentStrictReceiveMalformed: -1,
    pathPaymentStrictReceiveUnderfunded: -2,
    pathPaymentStrictReceiveSrcNoTrust: -3,
    pathPaymentStrictReceiveSrcNotAuthorized: -4,
    pathPaymentStrictReceiveNoDestination: -5,
    pathPaymentStrictReceiveNoTrust: -6,
    pathPaymentStrictReceiveNotAuthorized: -7,
    pathPaymentStrictReceiveLineFull: -8,
    pathPaymentStrictReceiveNoIssuer: -9,
    pathPaymentStrictReceiveTooFewOffers: -10,
    pathPaymentStrictReceiveOfferCrossSelf: -11,
    pathPaymentStrictReceiveOverSendmax: -12
  });
  xdr.struct("SimplePaymentResult", [["destination", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")]]);
  xdr.struct("PathPaymentStrictReceiveResultSuccess", [["offers", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)], ["last", xdr.lookup("SimplePaymentResult")]]);
  xdr.union("PathPaymentStrictReceiveResult", {
    switchOn: xdr.lookup("PathPaymentStrictReceiveResultCode"),
    switchName: "code",
    switches: [["pathPaymentStrictReceiveSuccess", "success"], ["pathPaymentStrictReceiveMalformed", xdr["void"]()], ["pathPaymentStrictReceiveUnderfunded", xdr["void"]()], ["pathPaymentStrictReceiveSrcNoTrust", xdr["void"]()], ["pathPaymentStrictReceiveSrcNotAuthorized", xdr["void"]()], ["pathPaymentStrictReceiveNoDestination", xdr["void"]()], ["pathPaymentStrictReceiveNoTrust", xdr["void"]()], ["pathPaymentStrictReceiveNotAuthorized", xdr["void"]()], ["pathPaymentStrictReceiveLineFull", xdr["void"]()], ["pathPaymentStrictReceiveNoIssuer", "noIssuer"], ["pathPaymentStrictReceiveTooFewOffers", xdr["void"]()], ["pathPaymentStrictReceiveOfferCrossSelf", xdr["void"]()], ["pathPaymentStrictReceiveOverSendmax", xdr["void"]()]],
    arms: {
      success: xdr.lookup("PathPaymentStrictReceiveResultSuccess"),
      noIssuer: xdr.lookup("Asset")
    }
  });
  xdr["enum"]("PathPaymentStrictSendResultCode", {
    pathPaymentStrictSendSuccess: 0,
    pathPaymentStrictSendMalformed: -1,
    pathPaymentStrictSendUnderfunded: -2,
    pathPaymentStrictSendSrcNoTrust: -3,
    pathPaymentStrictSendSrcNotAuthorized: -4,
    pathPaymentStrictSendNoDestination: -5,
    pathPaymentStrictSendNoTrust: -6,
    pathPaymentStrictSendNotAuthorized: -7,
    pathPaymentStrictSendLineFull: -8,
    pathPaymentStrictSendNoIssuer: -9,
    pathPaymentStrictSendTooFewOffers: -10,
    pathPaymentStrictSendOfferCrossSelf: -11,
    pathPaymentStrictSendUnderDestmin: -12
  });
  xdr.struct("PathPaymentStrictSendResultSuccess", [["offers", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)], ["last", xdr.lookup("SimplePaymentResult")]]);
  xdr.union("PathPaymentStrictSendResult", {
    switchOn: xdr.lookup("PathPaymentStrictSendResultCode"),
    switchName: "code",
    switches: [["pathPaymentStrictSendSuccess", "success"], ["pathPaymentStrictSendMalformed", xdr["void"]()], ["pathPaymentStrictSendUnderfunded", xdr["void"]()], ["pathPaymentStrictSendSrcNoTrust", xdr["void"]()], ["pathPaymentStrictSendSrcNotAuthorized", xdr["void"]()], ["pathPaymentStrictSendNoDestination", xdr["void"]()], ["pathPaymentStrictSendNoTrust", xdr["void"]()], ["pathPaymentStrictSendNotAuthorized", xdr["void"]()], ["pathPaymentStrictSendLineFull", xdr["void"]()], ["pathPaymentStrictSendNoIssuer", "noIssuer"], ["pathPaymentStrictSendTooFewOffers", xdr["void"]()], ["pathPaymentStrictSendOfferCrossSelf", xdr["void"]()], ["pathPaymentStrictSendUnderDestmin", xdr["void"]()]],
    arms: {
      success: xdr.lookup("PathPaymentStrictSendResultSuccess"),
      noIssuer: xdr.lookup("Asset")
    }
  });
  xdr["enum"]("ManageSellOfferResultCode", {
    manageSellOfferSuccess: 0,
    manageSellOfferMalformed: -1,
    manageSellOfferSellNoTrust: -2,
    manageSellOfferBuyNoTrust: -3,
    manageSellOfferSellNotAuthorized: -4,
    manageSellOfferBuyNotAuthorized: -5,
    manageSellOfferLineFull: -6,
    manageSellOfferUnderfunded: -7,
    manageSellOfferCrossSelf: -8,
    manageSellOfferSellNoIssuer: -9,
    manageSellOfferBuyNoIssuer: -10,
    manageSellOfferNotFound: -11,
    manageSellOfferLowReserve: -12
  });
  xdr["enum"]("ManageOfferEffect", {
    manageOfferCreated: 0,
    manageOfferUpdated: 1,
    manageOfferDeleted: 2
  });
  xdr.union("ManageOfferSuccessResultOffer", {
    switchOn: xdr.lookup("ManageOfferEffect"),
    switchName: "effect",
    switches: [["manageOfferCreated", "offer"], ["manageOfferUpdated", "offer"], ["manageOfferDeleted", xdr["void"]()]],
    arms: {
      offer: xdr.lookup("OfferEntry")
    }
  });
  xdr.struct("ManageOfferSuccessResult", [["offersClaimed", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)], ["offer", xdr.lookup("ManageOfferSuccessResultOffer")]]);
  xdr.union("ManageSellOfferResult", {
    switchOn: xdr.lookup("ManageSellOfferResultCode"),
    switchName: "code",
    switches: [["manageSellOfferSuccess", "success"], ["manageSellOfferMalformed", xdr["void"]()], ["manageSellOfferSellNoTrust", xdr["void"]()], ["manageSellOfferBuyNoTrust", xdr["void"]()], ["manageSellOfferSellNotAuthorized", xdr["void"]()], ["manageSellOfferBuyNotAuthorized", xdr["void"]()], ["manageSellOfferLineFull", xdr["void"]()], ["manageSellOfferUnderfunded", xdr["void"]()], ["manageSellOfferCrossSelf", xdr["void"]()], ["manageSellOfferSellNoIssuer", xdr["void"]()], ["manageSellOfferBuyNoIssuer", xdr["void"]()], ["manageSellOfferNotFound", xdr["void"]()], ["manageSellOfferLowReserve", xdr["void"]()]],
    arms: {
      success: xdr.lookup("ManageOfferSuccessResult")
    }
  });
  xdr["enum"]("ManageBuyOfferResultCode", {
    manageBuyOfferSuccess: 0,
    manageBuyOfferMalformed: -1,
    manageBuyOfferSellNoTrust: -2,
    manageBuyOfferBuyNoTrust: -3,
    manageBuyOfferSellNotAuthorized: -4,
    manageBuyOfferBuyNotAuthorized: -5,
    manageBuyOfferLineFull: -6,
    manageBuyOfferUnderfunded: -7,
    manageBuyOfferCrossSelf: -8,
    manageBuyOfferSellNoIssuer: -9,
    manageBuyOfferBuyNoIssuer: -10,
    manageBuyOfferNotFound: -11,
    manageBuyOfferLowReserve: -12
  });
  xdr.union("ManageBuyOfferResult", {
    switchOn: xdr.lookup("ManageBuyOfferResultCode"),
    switchName: "code",
    switches: [["manageBuyOfferSuccess", "success"], ["manageBuyOfferMalformed", xdr["void"]()], ["manageBuyOfferSellNoTrust", xdr["void"]()], ["manageBuyOfferBuyNoTrust", xdr["void"]()], ["manageBuyOfferSellNotAuthorized", xdr["void"]()], ["manageBuyOfferBuyNotAuthorized", xdr["void"]()], ["manageBuyOfferLineFull", xdr["void"]()], ["manageBuyOfferUnderfunded", xdr["void"]()], ["manageBuyOfferCrossSelf", xdr["void"]()], ["manageBuyOfferSellNoIssuer", xdr["void"]()], ["manageBuyOfferBuyNoIssuer", xdr["void"]()], ["manageBuyOfferNotFound", xdr["void"]()], ["manageBuyOfferLowReserve", xdr["void"]()]],
    arms: {
      success: xdr.lookup("ManageOfferSuccessResult")
    }
  });
  xdr["enum"]("SetOptionsResultCode", {
    setOptionsSuccess: 0,
    setOptionsLowReserve: -1,
    setOptionsTooManySigners: -2,
    setOptionsBadFlags: -3,
    setOptionsInvalidInflation: -4,
    setOptionsCantChange: -5,
    setOptionsUnknownFlag: -6,
    setOptionsThresholdOutOfRange: -7,
    setOptionsBadSigner: -8,
    setOptionsInvalidHomeDomain: -9,
    setOptionsAuthRevocableRequired: -10
  });
  xdr.union("SetOptionsResult", {
    switchOn: xdr.lookup("SetOptionsResultCode"),
    switchName: "code",
    switches: [["setOptionsSuccess", xdr["void"]()], ["setOptionsLowReserve", xdr["void"]()], ["setOptionsTooManySigners", xdr["void"]()], ["setOptionsBadFlags", xdr["void"]()], ["setOptionsInvalidInflation", xdr["void"]()], ["setOptionsCantChange", xdr["void"]()], ["setOptionsUnknownFlag", xdr["void"]()], ["setOptionsThresholdOutOfRange", xdr["void"]()], ["setOptionsBadSigner", xdr["void"]()], ["setOptionsInvalidHomeDomain", xdr["void"]()], ["setOptionsAuthRevocableRequired", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("ChangeTrustResultCode", {
    changeTrustSuccess: 0,
    changeTrustMalformed: -1,
    changeTrustNoIssuer: -2,
    changeTrustInvalidLimit: -3,
    changeTrustLowReserve: -4,
    changeTrustSelfNotAllowed: -5,
    changeTrustTrustLineMissing: -6,
    changeTrustCannotDelete: -7,
    changeTrustNotAuthMaintainLiabilities: -8
  });
  xdr.union("ChangeTrustResult", {
    switchOn: xdr.lookup("ChangeTrustResultCode"),
    switchName: "code",
    switches: [["changeTrustSuccess", xdr["void"]()], ["changeTrustMalformed", xdr["void"]()], ["changeTrustNoIssuer", xdr["void"]()], ["changeTrustInvalidLimit", xdr["void"]()], ["changeTrustLowReserve", xdr["void"]()], ["changeTrustSelfNotAllowed", xdr["void"]()], ["changeTrustTrustLineMissing", xdr["void"]()], ["changeTrustCannotDelete", xdr["void"]()], ["changeTrustNotAuthMaintainLiabilities", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("AllowTrustResultCode", {
    allowTrustSuccess: 0,
    allowTrustMalformed: -1,
    allowTrustNoTrustLine: -2,
    allowTrustTrustNotRequired: -3,
    allowTrustCantRevoke: -4,
    allowTrustSelfNotAllowed: -5,
    allowTrustLowReserve: -6
  });
  xdr.union("AllowTrustResult", {
    switchOn: xdr.lookup("AllowTrustResultCode"),
    switchName: "code",
    switches: [["allowTrustSuccess", xdr["void"]()], ["allowTrustMalformed", xdr["void"]()], ["allowTrustNoTrustLine", xdr["void"]()], ["allowTrustTrustNotRequired", xdr["void"]()], ["allowTrustCantRevoke", xdr["void"]()], ["allowTrustSelfNotAllowed", xdr["void"]()], ["allowTrustLowReserve", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("AccountMergeResultCode", {
    accountMergeSuccess: 0,
    accountMergeMalformed: -1,
    accountMergeNoAccount: -2,
    accountMergeImmutableSet: -3,
    accountMergeHasSubEntries: -4,
    accountMergeSeqnumTooFar: -5,
    accountMergeDestFull: -6,
    accountMergeIsSponsor: -7
  });
  xdr.union("AccountMergeResult", {
    switchOn: xdr.lookup("AccountMergeResultCode"),
    switchName: "code",
    switches: [["accountMergeSuccess", "sourceAccountBalance"], ["accountMergeMalformed", xdr["void"]()], ["accountMergeNoAccount", xdr["void"]()], ["accountMergeImmutableSet", xdr["void"]()], ["accountMergeHasSubEntries", xdr["void"]()], ["accountMergeSeqnumTooFar", xdr["void"]()], ["accountMergeDestFull", xdr["void"]()], ["accountMergeIsSponsor", xdr["void"]()]],
    arms: {
      sourceAccountBalance: xdr.lookup("Int64")
    }
  });
  xdr["enum"]("InflationResultCode", {
    inflationSuccess: 0,
    inflationNotTime: -1
  });
  xdr.struct("InflationPayout", [["destination", xdr.lookup("AccountId")], ["amount", xdr.lookup("Int64")]]);
  xdr.union("InflationResult", {
    switchOn: xdr.lookup("InflationResultCode"),
    switchName: "code",
    switches: [["inflationSuccess", "payouts"], ["inflationNotTime", xdr["void"]()]],
    arms: {
      payouts: xdr.varArray(xdr.lookup("InflationPayout"), 2147483647)
    }
  });
  xdr["enum"]("ManageDataResultCode", {
    manageDataSuccess: 0,
    manageDataNotSupportedYet: -1,
    manageDataNameNotFound: -2,
    manageDataLowReserve: -3,
    manageDataInvalidName: -4
  });
  xdr.union("ManageDataResult", {
    switchOn: xdr.lookup("ManageDataResultCode"),
    switchName: "code",
    switches: [["manageDataSuccess", xdr["void"]()], ["manageDataNotSupportedYet", xdr["void"]()], ["manageDataNameNotFound", xdr["void"]()], ["manageDataLowReserve", xdr["void"]()], ["manageDataInvalidName", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("BumpSequenceResultCode", {
    bumpSequenceSuccess: 0,
    bumpSequenceBadSeq: -1
  });
  xdr.union("BumpSequenceResult", {
    switchOn: xdr.lookup("BumpSequenceResultCode"),
    switchName: "code",
    switches: [["bumpSequenceSuccess", xdr["void"]()], ["bumpSequenceBadSeq", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("CreateClaimableBalanceResultCode", {
    createClaimableBalanceSuccess: 0,
    createClaimableBalanceMalformed: -1,
    createClaimableBalanceLowReserve: -2,
    createClaimableBalanceNoTrust: -3,
    createClaimableBalanceNotAuthorized: -4,
    createClaimableBalanceUnderfunded: -5
  });
  xdr.union("CreateClaimableBalanceResult", {
    switchOn: xdr.lookup("CreateClaimableBalanceResultCode"),
    switchName: "code",
    switches: [["createClaimableBalanceSuccess", "balanceId"], ["createClaimableBalanceMalformed", xdr["void"]()], ["createClaimableBalanceLowReserve", xdr["void"]()], ["createClaimableBalanceNoTrust", xdr["void"]()], ["createClaimableBalanceNotAuthorized", xdr["void"]()], ["createClaimableBalanceUnderfunded", xdr["void"]()]],
    arms: {
      balanceId: xdr.lookup("ClaimableBalanceId")
    }
  });
  xdr["enum"]("ClaimClaimableBalanceResultCode", {
    claimClaimableBalanceSuccess: 0,
    claimClaimableBalanceDoesNotExist: -1,
    claimClaimableBalanceCannotClaim: -2,
    claimClaimableBalanceLineFull: -3,
    claimClaimableBalanceNoTrust: -4,
    claimClaimableBalanceNotAuthorized: -5
  });
  xdr.union("ClaimClaimableBalanceResult", {
    switchOn: xdr.lookup("ClaimClaimableBalanceResultCode"),
    switchName: "code",
    switches: [["claimClaimableBalanceSuccess", xdr["void"]()], ["claimClaimableBalanceDoesNotExist", xdr["void"]()], ["claimClaimableBalanceCannotClaim", xdr["void"]()], ["claimClaimableBalanceLineFull", xdr["void"]()], ["claimClaimableBalanceNoTrust", xdr["void"]()], ["claimClaimableBalanceNotAuthorized", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("BeginSponsoringFutureReservesResultCode", {
    beginSponsoringFutureReservesSuccess: 0,
    beginSponsoringFutureReservesMalformed: -1,
    beginSponsoringFutureReservesAlreadySponsored: -2,
    beginSponsoringFutureReservesRecursive: -3
  });
  xdr.union("BeginSponsoringFutureReservesResult", {
    switchOn: xdr.lookup("BeginSponsoringFutureReservesResultCode"),
    switchName: "code",
    switches: [["beginSponsoringFutureReservesSuccess", xdr["void"]()], ["beginSponsoringFutureReservesMalformed", xdr["void"]()], ["beginSponsoringFutureReservesAlreadySponsored", xdr["void"]()], ["beginSponsoringFutureReservesRecursive", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("EndSponsoringFutureReservesResultCode", {
    endSponsoringFutureReservesSuccess: 0,
    endSponsoringFutureReservesNotSponsored: -1
  });
  xdr.union("EndSponsoringFutureReservesResult", {
    switchOn: xdr.lookup("EndSponsoringFutureReservesResultCode"),
    switchName: "code",
    switches: [["endSponsoringFutureReservesSuccess", xdr["void"]()], ["endSponsoringFutureReservesNotSponsored", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("RevokeSponsorshipResultCode", {
    revokeSponsorshipSuccess: 0,
    revokeSponsorshipDoesNotExist: -1,
    revokeSponsorshipNotSponsor: -2,
    revokeSponsorshipLowReserve: -3,
    revokeSponsorshipOnlyTransferable: -4,
    revokeSponsorshipMalformed: -5
  });
  xdr.union("RevokeSponsorshipResult", {
    switchOn: xdr.lookup("RevokeSponsorshipResultCode"),
    switchName: "code",
    switches: [["revokeSponsorshipSuccess", xdr["void"]()], ["revokeSponsorshipDoesNotExist", xdr["void"]()], ["revokeSponsorshipNotSponsor", xdr["void"]()], ["revokeSponsorshipLowReserve", xdr["void"]()], ["revokeSponsorshipOnlyTransferable", xdr["void"]()], ["revokeSponsorshipMalformed", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("ClawbackResultCode", {
    clawbackSuccess: 0,
    clawbackMalformed: -1,
    clawbackNotClawbackEnabled: -2,
    clawbackNoTrust: -3,
    clawbackUnderfunded: -4
  });
  xdr.union("ClawbackResult", {
    switchOn: xdr.lookup("ClawbackResultCode"),
    switchName: "code",
    switches: [["clawbackSuccess", xdr["void"]()], ["clawbackMalformed", xdr["void"]()], ["clawbackNotClawbackEnabled", xdr["void"]()], ["clawbackNoTrust", xdr["void"]()], ["clawbackUnderfunded", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("ClawbackClaimableBalanceResultCode", {
    clawbackClaimableBalanceSuccess: 0,
    clawbackClaimableBalanceDoesNotExist: -1,
    clawbackClaimableBalanceNotIssuer: -2,
    clawbackClaimableBalanceNotClawbackEnabled: -3
  });
  xdr.union("ClawbackClaimableBalanceResult", {
    switchOn: xdr.lookup("ClawbackClaimableBalanceResultCode"),
    switchName: "code",
    switches: [["clawbackClaimableBalanceSuccess", xdr["void"]()], ["clawbackClaimableBalanceDoesNotExist", xdr["void"]()], ["clawbackClaimableBalanceNotIssuer", xdr["void"]()], ["clawbackClaimableBalanceNotClawbackEnabled", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("SetTrustLineFlagsResultCode", {
    setTrustLineFlagsSuccess: 0,
    setTrustLineFlagsMalformed: -1,
    setTrustLineFlagsNoTrustLine: -2,
    setTrustLineFlagsCantRevoke: -3,
    setTrustLineFlagsInvalidState: -4,
    setTrustLineFlagsLowReserve: -5
  });
  xdr.union("SetTrustLineFlagsResult", {
    switchOn: xdr.lookup("SetTrustLineFlagsResultCode"),
    switchName: "code",
    switches: [["setTrustLineFlagsSuccess", xdr["void"]()], ["setTrustLineFlagsMalformed", xdr["void"]()], ["setTrustLineFlagsNoTrustLine", xdr["void"]()], ["setTrustLineFlagsCantRevoke", xdr["void"]()], ["setTrustLineFlagsInvalidState", xdr["void"]()], ["setTrustLineFlagsLowReserve", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("LiquidityPoolDepositResultCode", {
    liquidityPoolDepositSuccess: 0,
    liquidityPoolDepositMalformed: -1,
    liquidityPoolDepositNoTrust: -2,
    liquidityPoolDepositNotAuthorized: -3,
    liquidityPoolDepositUnderfunded: -4,
    liquidityPoolDepositLineFull: -5,
    liquidityPoolDepositBadPrice: -6,
    liquidityPoolDepositPoolFull: -7
  });
  xdr.union("LiquidityPoolDepositResult", {
    switchOn: xdr.lookup("LiquidityPoolDepositResultCode"),
    switchName: "code",
    switches: [["liquidityPoolDepositSuccess", xdr["void"]()], ["liquidityPoolDepositMalformed", xdr["void"]()], ["liquidityPoolDepositNoTrust", xdr["void"]()], ["liquidityPoolDepositNotAuthorized", xdr["void"]()], ["liquidityPoolDepositUnderfunded", xdr["void"]()], ["liquidityPoolDepositLineFull", xdr["void"]()], ["liquidityPoolDepositBadPrice", xdr["void"]()], ["liquidityPoolDepositPoolFull", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("LiquidityPoolWithdrawResultCode", {
    liquidityPoolWithdrawSuccess: 0,
    liquidityPoolWithdrawMalformed: -1,
    liquidityPoolWithdrawNoTrust: -2,
    liquidityPoolWithdrawUnderfunded: -3,
    liquidityPoolWithdrawLineFull: -4,
    liquidityPoolWithdrawUnderMinimum: -5
  });
  xdr.union("LiquidityPoolWithdrawResult", {
    switchOn: xdr.lookup("LiquidityPoolWithdrawResultCode"),
    switchName: "code",
    switches: [["liquidityPoolWithdrawSuccess", xdr["void"]()], ["liquidityPoolWithdrawMalformed", xdr["void"]()], ["liquidityPoolWithdrawNoTrust", xdr["void"]()], ["liquidityPoolWithdrawUnderfunded", xdr["void"]()], ["liquidityPoolWithdrawLineFull", xdr["void"]()], ["liquidityPoolWithdrawUnderMinimum", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("InvokeHostFunctionResultCode", {
    invokeHostFunctionSuccess: 0,
    invokeHostFunctionMalformed: -1,
    invokeHostFunctionTrapped: -2,
    invokeHostFunctionResourceLimitExceeded: -3,
    invokeHostFunctionEntryArchived: -4,
    invokeHostFunctionInsufficientRefundableFee: -5
  });
  xdr.union("InvokeHostFunctionResult", {
    switchOn: xdr.lookup("InvokeHostFunctionResultCode"),
    switchName: "code",
    switches: [["invokeHostFunctionSuccess", "success"], ["invokeHostFunctionMalformed", xdr["void"]()], ["invokeHostFunctionTrapped", xdr["void"]()], ["invokeHostFunctionResourceLimitExceeded", xdr["void"]()], ["invokeHostFunctionEntryArchived", xdr["void"]()], ["invokeHostFunctionInsufficientRefundableFee", xdr["void"]()]],
    arms: {
      success: xdr.lookup("Hash")
    }
  });
  xdr["enum"]("ExtendFootprintTtlResultCode", {
    extendFootprintTtlSuccess: 0,
    extendFootprintTtlMalformed: -1,
    extendFootprintTtlResourceLimitExceeded: -2,
    extendFootprintTtlInsufficientRefundableFee: -3
  });
  xdr.union("ExtendFootprintTtlResult", {
    switchOn: xdr.lookup("ExtendFootprintTtlResultCode"),
    switchName: "code",
    switches: [["extendFootprintTtlSuccess", xdr["void"]()], ["extendFootprintTtlMalformed", xdr["void"]()], ["extendFootprintTtlResourceLimitExceeded", xdr["void"]()], ["extendFootprintTtlInsufficientRefundableFee", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("RestoreFootprintResultCode", {
    restoreFootprintSuccess: 0,
    restoreFootprintMalformed: -1,
    restoreFootprintResourceLimitExceeded: -2,
    restoreFootprintInsufficientRefundableFee: -3
  });
  xdr.union("RestoreFootprintResult", {
    switchOn: xdr.lookup("RestoreFootprintResultCode"),
    switchName: "code",
    switches: [["restoreFootprintSuccess", xdr["void"]()], ["restoreFootprintMalformed", xdr["void"]()], ["restoreFootprintResourceLimitExceeded", xdr["void"]()], ["restoreFootprintInsufficientRefundableFee", xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("OperationResultCode", {
    opInner: 0,
    opBadAuth: -1,
    opNoAccount: -2,
    opNotSupported: -3,
    opTooManySubentries: -4,
    opExceededWorkLimit: -5,
    opTooManySponsoring: -6
  });
  xdr.union("OperationResultTr", {
    switchOn: xdr.lookup("OperationType"),
    switchName: "type",
    switches: [["createAccount", "createAccountResult"], ["payment", "paymentResult"], ["pathPaymentStrictReceive", "pathPaymentStrictReceiveResult"], ["manageSellOffer", "manageSellOfferResult"], ["createPassiveSellOffer", "createPassiveSellOfferResult"], ["setOptions", "setOptionsResult"], ["changeTrust", "changeTrustResult"], ["allowTrust", "allowTrustResult"], ["accountMerge", "accountMergeResult"], ["inflation", "inflationResult"], ["manageData", "manageDataResult"], ["bumpSequence", "bumpSeqResult"], ["manageBuyOffer", "manageBuyOfferResult"], ["pathPaymentStrictSend", "pathPaymentStrictSendResult"], ["createClaimableBalance", "createClaimableBalanceResult"], ["claimClaimableBalance", "claimClaimableBalanceResult"], ["beginSponsoringFutureReserves", "beginSponsoringFutureReservesResult"], ["endSponsoringFutureReserves", "endSponsoringFutureReservesResult"], ["revokeSponsorship", "revokeSponsorshipResult"], ["clawback", "clawbackResult"], ["clawbackClaimableBalance", "clawbackClaimableBalanceResult"], ["setTrustLineFlags", "setTrustLineFlagsResult"], ["liquidityPoolDeposit", "liquidityPoolDepositResult"], ["liquidityPoolWithdraw", "liquidityPoolWithdrawResult"], ["invokeHostFunction", "invokeHostFunctionResult"], ["extendFootprintTtl", "extendFootprintTtlResult"], ["restoreFootprint", "restoreFootprintResult"]],
    arms: {
      createAccountResult: xdr.lookup("CreateAccountResult"),
      paymentResult: xdr.lookup("PaymentResult"),
      pathPaymentStrictReceiveResult: xdr.lookup("PathPaymentStrictReceiveResult"),
      manageSellOfferResult: xdr.lookup("ManageSellOfferResult"),
      createPassiveSellOfferResult: xdr.lookup("ManageSellOfferResult"),
      setOptionsResult: xdr.lookup("SetOptionsResult"),
      changeTrustResult: xdr.lookup("ChangeTrustResult"),
      allowTrustResult: xdr.lookup("AllowTrustResult"),
      accountMergeResult: xdr.lookup("AccountMergeResult"),
      inflationResult: xdr.lookup("InflationResult"),
      manageDataResult: xdr.lookup("ManageDataResult"),
      bumpSeqResult: xdr.lookup("BumpSequenceResult"),
      manageBuyOfferResult: xdr.lookup("ManageBuyOfferResult"),
      pathPaymentStrictSendResult: xdr.lookup("PathPaymentStrictSendResult"),
      createClaimableBalanceResult: xdr.lookup("CreateClaimableBalanceResult"),
      claimClaimableBalanceResult: xdr.lookup("ClaimClaimableBalanceResult"),
      beginSponsoringFutureReservesResult: xdr.lookup("BeginSponsoringFutureReservesResult"),
      endSponsoringFutureReservesResult: xdr.lookup("EndSponsoringFutureReservesResult"),
      revokeSponsorshipResult: xdr.lookup("RevokeSponsorshipResult"),
      clawbackResult: xdr.lookup("ClawbackResult"),
      clawbackClaimableBalanceResult: xdr.lookup("ClawbackClaimableBalanceResult"),
      setTrustLineFlagsResult: xdr.lookup("SetTrustLineFlagsResult"),
      liquidityPoolDepositResult: xdr.lookup("LiquidityPoolDepositResult"),
      liquidityPoolWithdrawResult: xdr.lookup("LiquidityPoolWithdrawResult"),
      invokeHostFunctionResult: xdr.lookup("InvokeHostFunctionResult"),
      extendFootprintTtlResult: xdr.lookup("ExtendFootprintTtlResult"),
      restoreFootprintResult: xdr.lookup("RestoreFootprintResult")
    }
  });
  xdr.union("OperationResult", {
    switchOn: xdr.lookup("OperationResultCode"),
    switchName: "code",
    switches: [["opInner", "tr"], ["opBadAuth", xdr["void"]()], ["opNoAccount", xdr["void"]()], ["opNotSupported", xdr["void"]()], ["opTooManySubentries", xdr["void"]()], ["opExceededWorkLimit", xdr["void"]()], ["opTooManySponsoring", xdr["void"]()]],
    arms: {
      tr: xdr.lookup("OperationResultTr")
    }
  });
  xdr["enum"]("TransactionResultCode", {
    txFeeBumpInnerSuccess: 1,
    txSuccess: 0,
    txFailed: -1,
    txTooEarly: -2,
    txTooLate: -3,
    txMissingOperation: -4,
    txBadSeq: -5,
    txBadAuth: -6,
    txInsufficientBalance: -7,
    txNoAccount: -8,
    txInsufficientFee: -9,
    txBadAuthExtra: -10,
    txInternalError: -11,
    txNotSupported: -12,
    txFeeBumpInnerFailed: -13,
    txBadSponsorship: -14,
    txBadMinSeqAgeOrGap: -15,
    txMalformed: -16,
    txSorobanInvalid: -17
  });
  xdr.union("InnerTransactionResultResult", {
    switchOn: xdr.lookup("TransactionResultCode"),
    switchName: "code",
    switches: [["txSuccess", "results"], ["txFailed", "results"], ["txTooEarly", xdr["void"]()], ["txTooLate", xdr["void"]()], ["txMissingOperation", xdr["void"]()], ["txBadSeq", xdr["void"]()], ["txBadAuth", xdr["void"]()], ["txInsufficientBalance", xdr["void"]()], ["txNoAccount", xdr["void"]()], ["txInsufficientFee", xdr["void"]()], ["txBadAuthExtra", xdr["void"]()], ["txInternalError", xdr["void"]()], ["txNotSupported", xdr["void"]()], ["txBadSponsorship", xdr["void"]()], ["txBadMinSeqAgeOrGap", xdr["void"]()], ["txMalformed", xdr["void"]()], ["txSorobanInvalid", xdr["void"]()]],
    arms: {
      results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647)
    }
  });
  xdr.union("InnerTransactionResultExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("InnerTransactionResult", [["feeCharged", xdr.lookup("Int64")], ["result", xdr.lookup("InnerTransactionResultResult")], ["ext", xdr.lookup("InnerTransactionResultExt")]]);
  xdr.struct("InnerTransactionResultPair", [["transactionHash", xdr.lookup("Hash")], ["result", xdr.lookup("InnerTransactionResult")]]);
  xdr.union("TransactionResultResult", {
    switchOn: xdr.lookup("TransactionResultCode"),
    switchName: "code",
    switches: [["txFeeBumpInnerSuccess", "innerResultPair"], ["txFeeBumpInnerFailed", "innerResultPair"], ["txSuccess", "results"], ["txFailed", "results"], ["txTooEarly", xdr["void"]()], ["txTooLate", xdr["void"]()], ["txMissingOperation", xdr["void"]()], ["txBadSeq", xdr["void"]()], ["txBadAuth", xdr["void"]()], ["txInsufficientBalance", xdr["void"]()], ["txNoAccount", xdr["void"]()], ["txInsufficientFee", xdr["void"]()], ["txBadAuthExtra", xdr["void"]()], ["txInternalError", xdr["void"]()], ["txNotSupported", xdr["void"]()], ["txBadSponsorship", xdr["void"]()], ["txBadMinSeqAgeOrGap", xdr["void"]()], ["txMalformed", xdr["void"]()], ["txSorobanInvalid", xdr["void"]()]],
    arms: {
      innerResultPair: xdr.lookup("InnerTransactionResultPair"),
      results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647)
    }
  });
  xdr.union("TransactionResultExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr.struct("TransactionResult", [["feeCharged", xdr.lookup("Int64")], ["result", xdr.lookup("TransactionResultResult")], ["ext", xdr.lookup("TransactionResultExt")]]);
  xdr.typedef("Hash", xdr.opaque(32));
  xdr.typedef("Uint256", xdr.opaque(32));
  xdr.typedef("Uint32", xdr.uint());
  xdr.typedef("Int32", xdr["int"]());
  xdr.typedef("Uint64", xdr.uhyper());
  xdr.typedef("Int64", xdr.hyper());
  xdr.typedef("TimePoint", xdr.lookup("Uint64"));
  xdr.typedef("Duration", xdr.lookup("Uint64"));
  xdr.union("ExtensionPoint", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });
  xdr["enum"]("CryptoKeyType", {
    keyTypeEd25519: 0,
    keyTypePreAuthTx: 1,
    keyTypeHashX: 2,
    keyTypeEd25519SignedPayload: 3,
    keyTypeMuxedEd25519: 256
  });
  xdr["enum"]("PublicKeyType", {
    publicKeyTypeEd25519: 0
  });
  xdr["enum"]("SignerKeyType", {
    signerKeyTypeEd25519: 0,
    signerKeyTypePreAuthTx: 1,
    signerKeyTypeHashX: 2,
    signerKeyTypeEd25519SignedPayload: 3
  });
  xdr.union("PublicKey", {
    switchOn: xdr.lookup("PublicKeyType"),
    switchName: "type",
    switches: [["publicKeyTypeEd25519", "ed25519"]],
    arms: {
      ed25519: xdr.lookup("Uint256")
    }
  });
  xdr.struct("SignerKeyEd25519SignedPayload", [["ed25519", xdr.lookup("Uint256")], ["payload", xdr.varOpaque(64)]]);
  xdr.union("SignerKey", {
    switchOn: xdr.lookup("SignerKeyType"),
    switchName: "type",
    switches: [["signerKeyTypeEd25519", "ed25519"], ["signerKeyTypePreAuthTx", "preAuthTx"], ["signerKeyTypeHashX", "hashX"], ["signerKeyTypeEd25519SignedPayload", "ed25519SignedPayload"]],
    arms: {
      ed25519: xdr.lookup("Uint256"),
      preAuthTx: xdr.lookup("Uint256"),
      hashX: xdr.lookup("Uint256"),
      ed25519SignedPayload: xdr.lookup("SignerKeyEd25519SignedPayload")
    }
  });
  xdr.typedef("Signature", xdr.varOpaque(64));
  xdr.typedef("SignatureHint", xdr.opaque(4));
  xdr.typedef("NodeId", xdr.lookup("PublicKey"));
  xdr.typedef("AccountId", xdr.lookup("PublicKey"));
  xdr.struct("Curve25519Secret", [["key", xdr.opaque(32)]]);
  xdr.struct("Curve25519Public", [["key", xdr.opaque(32)]]);
  xdr.struct("HmacSha256Key", [["key", xdr.opaque(32)]]);
  xdr.struct("HmacSha256Mac", [["mac", xdr.opaque(32)]]);
  xdr["enum"]("ScValType", {
    scvBool: 0,
    scvVoid: 1,
    scvError: 2,
    scvU32: 3,
    scvI32: 4,
    scvU64: 5,
    scvI64: 6,
    scvTimepoint: 7,
    scvDuration: 8,
    scvU128: 9,
    scvI128: 10,
    scvU256: 11,
    scvI256: 12,
    scvBytes: 13,
    scvString: 14,
    scvSymbol: 15,
    scvVec: 16,
    scvMap: 17,
    scvAddress: 18,
    scvContractInstance: 19,
    scvLedgerKeyContractInstance: 20,
    scvLedgerKeyNonce: 21
  });
  xdr["enum"]("ScErrorType", {
    sceContract: 0,
    sceWasmVm: 1,
    sceContext: 2,
    sceStorage: 3,
    sceObject: 4,
    sceCrypto: 5,
    sceEvents: 6,
    sceBudget: 7,
    sceValue: 8,
    sceAuth: 9
  });
  xdr["enum"]("ScErrorCode", {
    scecArithDomain: 0,
    scecIndexBounds: 1,
    scecInvalidInput: 2,
    scecMissingValue: 3,
    scecExistingValue: 4,
    scecExceededLimit: 5,
    scecInvalidAction: 6,
    scecInternalError: 7,
    scecUnexpectedType: 8,
    scecUnexpectedSize: 9
  });
  xdr.union("ScError", {
    switchOn: xdr.lookup("ScErrorType"),
    switchName: "type",
    switches: [["sceContract", "contractCode"], ["sceWasmVm", "code"], ["sceContext", "code"], ["sceStorage", "code"], ["sceObject", "code"], ["sceCrypto", "code"], ["sceEvents", "code"], ["sceBudget", "code"], ["sceValue", "code"], ["sceAuth", "code"]],
    arms: {
      contractCode: xdr.lookup("Uint32"),
      code: xdr.lookup("ScErrorCode")
    }
  });
  xdr.struct("UInt128Parts", [["hi", xdr.lookup("Uint64")], ["lo", xdr.lookup("Uint64")]]);
  xdr.struct("Int128Parts", [["hi", xdr.lookup("Int64")], ["lo", xdr.lookup("Uint64")]]);
  xdr.struct("UInt256Parts", [["hiHi", xdr.lookup("Uint64")], ["hiLo", xdr.lookup("Uint64")], ["loHi", xdr.lookup("Uint64")], ["loLo", xdr.lookup("Uint64")]]);
  xdr.struct("Int256Parts", [["hiHi", xdr.lookup("Int64")], ["hiLo", xdr.lookup("Uint64")], ["loHi", xdr.lookup("Uint64")], ["loLo", xdr.lookup("Uint64")]]);
  xdr["enum"]("ContractExecutableType", {
    contractExecutableWasm: 0,
    contractExecutableStellarAsset: 1
  });
  xdr.union("ContractExecutable", {
    switchOn: xdr.lookup("ContractExecutableType"),
    switchName: "type",
    switches: [["contractExecutableWasm", "wasmHash"], ["contractExecutableStellarAsset", xdr["void"]()]],
    arms: {
      wasmHash: xdr.lookup("Hash")
    }
  });
  xdr["enum"]("ScAddressType", {
    scAddressTypeAccount: 0,
    scAddressTypeContract: 1
  });
  xdr.union("ScAddress", {
    switchOn: xdr.lookup("ScAddressType"),
    switchName: "type",
    switches: [["scAddressTypeAccount", "accountId"], ["scAddressTypeContract", "contractId"]],
    arms: {
      accountId: xdr.lookup("AccountId"),
      contractId: xdr.lookup("Hash")
    }
  });
  xdr["const"]("SCSYMBOL_LIMIT", 32);
  xdr.typedef("ScVec", xdr.varArray(xdr.lookup("ScVal"), 2147483647));
  xdr.typedef("ScMap", xdr.varArray(xdr.lookup("ScMapEntry"), 2147483647));
  xdr.typedef("ScBytes", xdr.varOpaque());
  xdr.typedef("ScString", xdr.string());
  xdr.typedef("ScSymbol", xdr.string(SCSYMBOL_LIMIT));
  xdr.struct("ScNonceKey", [["nonce", xdr.lookup("Int64")]]);
  xdr.struct("ScContractInstance", [["executable", xdr.lookup("ContractExecutable")], ["storage", xdr.option(xdr.lookup("ScMap"))]]);
  xdr.union("ScVal", {
    switchOn: xdr.lookup("ScValType"),
    switchName: "type",
    switches: [["scvBool", "b"], ["scvVoid", xdr["void"]()], ["scvError", "error"], ["scvU32", "u32"], ["scvI32", "i32"], ["scvU64", "u64"], ["scvI64", "i64"], ["scvTimepoint", "timepoint"], ["scvDuration", "duration"], ["scvU128", "u128"], ["scvI128", "i128"], ["scvU256", "u256"], ["scvI256", "i256"], ["scvBytes", "bytes"], ["scvString", "str"], ["scvSymbol", "sym"], ["scvVec", "vec"], ["scvMap", "map"], ["scvAddress", "address"], ["scvLedgerKeyContractInstance", xdr["void"]()], ["scvLedgerKeyNonce", "nonceKey"], ["scvContractInstance", "instance"]],
    arms: {
      b: xdr.bool(),
      error: xdr.lookup("ScError"),
      u32: xdr.lookup("Uint32"),
      i32: xdr.lookup("Int32"),
      u64: xdr.lookup("Uint64"),
      i64: xdr.lookup("Int64"),
      timepoint: xdr.lookup("TimePoint"),
      duration: xdr.lookup("Duration"),
      u128: xdr.lookup("UInt128Parts"),
      i128: xdr.lookup("Int128Parts"),
      u256: xdr.lookup("UInt256Parts"),
      i256: xdr.lookup("Int256Parts"),
      bytes: xdr.lookup("ScBytes"),
      str: xdr.lookup("ScString"),
      sym: xdr.lookup("ScSymbol"),
      vec: xdr.option(xdr.lookup("ScVec")),
      map: xdr.option(xdr.lookup("ScMap")),
      address: xdr.lookup("ScAddress"),
      nonceKey: xdr.lookup("ScNonceKey"),
      instance: xdr.lookup("ScContractInstance")
    }
  });
  xdr.struct("ScMapEntry", [["key", xdr.lookup("ScVal")], ["val", xdr.lookup("ScVal")]]);
  xdr["enum"]("ScEnvMetaKind", {
    scEnvMetaKindInterfaceVersion: 0
  });
  xdr.union("ScEnvMetaEntry", {
    switchOn: xdr.lookup("ScEnvMetaKind"),
    switchName: "kind",
    switches: [["scEnvMetaKindInterfaceVersion", "interfaceVersion"]],
    arms: {
      interfaceVersion: xdr.lookup("Uint64")
    }
  });
  xdr.struct("ScMetaV0", [["key", xdr.string()], ["val", xdr.string()]]);
  xdr["enum"]("ScMetaKind", {
    scMetaV0: 0
  });
  xdr.union("ScMetaEntry", {
    switchOn: xdr.lookup("ScMetaKind"),
    switchName: "kind",
    switches: [["scMetaV0", "v0"]],
    arms: {
      v0: xdr.lookup("ScMetaV0")
    }
  });
  xdr["const"]("SC_SPEC_DOC_LIMIT", 1024);
  xdr["enum"]("ScSpecType", {
    scSpecTypeVal: 0,
    scSpecTypeBool: 1,
    scSpecTypeVoid: 2,
    scSpecTypeError: 3,
    scSpecTypeU32: 4,
    scSpecTypeI32: 5,
    scSpecTypeU64: 6,
    scSpecTypeI64: 7,
    scSpecTypeTimepoint: 8,
    scSpecTypeDuration: 9,
    scSpecTypeU128: 10,
    scSpecTypeI128: 11,
    scSpecTypeU256: 12,
    scSpecTypeI256: 13,
    scSpecTypeBytes: 14,
    scSpecTypeString: 16,
    scSpecTypeSymbol: 17,
    scSpecTypeAddress: 19,
    scSpecTypeOption: 1000,
    scSpecTypeResult: 1001,
    scSpecTypeVec: 1002,
    scSpecTypeMap: 1004,
    scSpecTypeTuple: 1005,
    scSpecTypeBytesN: 1006,
    scSpecTypeUdt: 2000
  });
  xdr.struct("ScSpecTypeOption", [["valueType", xdr.lookup("ScSpecTypeDef")]]);
  xdr.struct("ScSpecTypeResult", [["okType", xdr.lookup("ScSpecTypeDef")], ["errorType", xdr.lookup("ScSpecTypeDef")]]);
  xdr.struct("ScSpecTypeVec", [["elementType", xdr.lookup("ScSpecTypeDef")]]);
  xdr.struct("ScSpecTypeMap", [["keyType", xdr.lookup("ScSpecTypeDef")], ["valueType", xdr.lookup("ScSpecTypeDef")]]);
  xdr.struct("ScSpecTypeTuple", [["valueTypes", xdr.varArray(xdr.lookup("ScSpecTypeDef"), 12)]]);
  xdr.struct("ScSpecTypeBytesN", [["n", xdr.lookup("Uint32")]]);
  xdr.struct("ScSpecTypeUdt", [["name", xdr.string(60)]]);
  xdr.union("ScSpecTypeDef", {
    switchOn: xdr.lookup("ScSpecType"),
    switchName: "type",
    switches: [["scSpecTypeVal", xdr["void"]()], ["scSpecTypeBool", xdr["void"]()], ["scSpecTypeVoid", xdr["void"]()], ["scSpecTypeError", xdr["void"]()], ["scSpecTypeU32", xdr["void"]()], ["scSpecTypeI32", xdr["void"]()], ["scSpecTypeU64", xdr["void"]()], ["scSpecTypeI64", xdr["void"]()], ["scSpecTypeTimepoint", xdr["void"]()], ["scSpecTypeDuration", xdr["void"]()], ["scSpecTypeU128", xdr["void"]()], ["scSpecTypeI128", xdr["void"]()], ["scSpecTypeU256", xdr["void"]()], ["scSpecTypeI256", xdr["void"]()], ["scSpecTypeBytes", xdr["void"]()], ["scSpecTypeString", xdr["void"]()], ["scSpecTypeSymbol", xdr["void"]()], ["scSpecTypeAddress", xdr["void"]()], ["scSpecTypeOption", "option"], ["scSpecTypeResult", "result"], ["scSpecTypeVec", "vec"], ["scSpecTypeMap", "map"], ["scSpecTypeTuple", "tuple"], ["scSpecTypeBytesN", "bytesN"], ["scSpecTypeUdt", "udt"]],
    arms: {
      option: xdr.lookup("ScSpecTypeOption"),
      result: xdr.lookup("ScSpecTypeResult"),
      vec: xdr.lookup("ScSpecTypeVec"),
      map: xdr.lookup("ScSpecTypeMap"),
      tuple: xdr.lookup("ScSpecTypeTuple"),
      bytesN: xdr.lookup("ScSpecTypeBytesN"),
      udt: xdr.lookup("ScSpecTypeUdt")
    }
  });
  xdr.struct("ScSpecUdtStructFieldV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["name", xdr.string(30)], ["type", xdr.lookup("ScSpecTypeDef")]]);
  xdr.struct("ScSpecUdtStructV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["lib", xdr.string(80)], ["name", xdr.string(60)], ["fields", xdr.varArray(xdr.lookup("ScSpecUdtStructFieldV0"), 40)]]);
  xdr.struct("ScSpecUdtUnionCaseVoidV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["name", xdr.string(60)]]);
  xdr.struct("ScSpecUdtUnionCaseTupleV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["name", xdr.string(60)], ["type", xdr.varArray(xdr.lookup("ScSpecTypeDef"), 12)]]);
  xdr["enum"]("ScSpecUdtUnionCaseV0Kind", {
    scSpecUdtUnionCaseVoidV0: 0,
    scSpecUdtUnionCaseTupleV0: 1
  });
  xdr.union("ScSpecUdtUnionCaseV0", {
    switchOn: xdr.lookup("ScSpecUdtUnionCaseV0Kind"),
    switchName: "kind",
    switches: [["scSpecUdtUnionCaseVoidV0", "voidCase"], ["scSpecUdtUnionCaseTupleV0", "tupleCase"]],
    arms: {
      voidCase: xdr.lookup("ScSpecUdtUnionCaseVoidV0"),
      tupleCase: xdr.lookup("ScSpecUdtUnionCaseTupleV0")
    }
  });
  xdr.struct("ScSpecUdtUnionV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["lib", xdr.string(80)], ["name", xdr.string(60)], ["cases", xdr.varArray(xdr.lookup("ScSpecUdtUnionCaseV0"), 50)]]);
  xdr.struct("ScSpecUdtEnumCaseV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["name", xdr.string(60)], ["value", xdr.lookup("Uint32")]]);
  xdr.struct("ScSpecUdtEnumV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["lib", xdr.string(80)], ["name", xdr.string(60)], ["cases", xdr.varArray(xdr.lookup("ScSpecUdtEnumCaseV0"), 50)]]);
  xdr.struct("ScSpecUdtErrorEnumCaseV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["name", xdr.string(60)], ["value", xdr.lookup("Uint32")]]);
  xdr.struct("ScSpecUdtErrorEnumV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["lib", xdr.string(80)], ["name", xdr.string(60)], ["cases", xdr.varArray(xdr.lookup("ScSpecUdtErrorEnumCaseV0"), 50)]]);
  xdr.struct("ScSpecFunctionInputV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["name", xdr.string(30)], ["type", xdr.lookup("ScSpecTypeDef")]]);
  xdr.struct("ScSpecFunctionV0", [["doc", xdr.string(SC_SPEC_DOC_LIMIT)], ["name", xdr.lookup("ScSymbol")], ["inputs", xdr.varArray(xdr.lookup("ScSpecFunctionInputV0"), 10)], ["outputs", xdr.varArray(xdr.lookup("ScSpecTypeDef"), 1)]]);
  xdr["enum"]("ScSpecEntryKind", {
    scSpecEntryFunctionV0: 0,
    scSpecEntryUdtStructV0: 1,
    scSpecEntryUdtUnionV0: 2,
    scSpecEntryUdtEnumV0: 3,
    scSpecEntryUdtErrorEnumV0: 4
  });
  xdr.union("ScSpecEntry", {
    switchOn: xdr.lookup("ScSpecEntryKind"),
    switchName: "kind",
    switches: [["scSpecEntryFunctionV0", "functionV0"], ["scSpecEntryUdtStructV0", "udtStructV0"], ["scSpecEntryUdtUnionV0", "udtUnionV0"], ["scSpecEntryUdtEnumV0", "udtEnumV0"], ["scSpecEntryUdtErrorEnumV0", "udtErrorEnumV0"]],
    arms: {
      functionV0: xdr.lookup("ScSpecFunctionV0"),
      udtStructV0: xdr.lookup("ScSpecUdtStructV0"),
      udtUnionV0: xdr.lookup("ScSpecUdtUnionV0"),
      udtEnumV0: xdr.lookup("ScSpecUdtEnumV0"),
      udtErrorEnumV0: xdr.lookup("ScSpecUdtErrorEnumV0")
    }
  });
  xdr.struct("ConfigSettingContractExecutionLanesV0", [["ledgerMaxTxCount", xdr.lookup("Uint32")]]);
  xdr.struct("ConfigSettingContractComputeV0", [["ledgerMaxInstructions", xdr.lookup("Int64")], ["txMaxInstructions", xdr.lookup("Int64")], ["feeRatePerInstructionsIncrement", xdr.lookup("Int64")], ["txMemoryLimit", xdr.lookup("Uint32")]]);
  xdr.struct("ConfigSettingContractLedgerCostV0", [["ledgerMaxReadLedgerEntries", xdr.lookup("Uint32")], ["ledgerMaxReadBytes", xdr.lookup("Uint32")], ["ledgerMaxWriteLedgerEntries", xdr.lookup("Uint32")], ["ledgerMaxWriteBytes", xdr.lookup("Uint32")], ["txMaxReadLedgerEntries", xdr.lookup("Uint32")], ["txMaxReadBytes", xdr.lookup("Uint32")], ["txMaxWriteLedgerEntries", xdr.lookup("Uint32")], ["txMaxWriteBytes", xdr.lookup("Uint32")], ["feeReadLedgerEntry", xdr.lookup("Int64")], ["feeWriteLedgerEntry", xdr.lookup("Int64")], ["feeRead1Kb", xdr.lookup("Int64")], ["bucketListTargetSizeBytes", xdr.lookup("Int64")], ["writeFee1KbBucketListLow", xdr.lookup("Int64")], ["writeFee1KbBucketListHigh", xdr.lookup("Int64")], ["bucketListWriteFeeGrowthFactor", xdr.lookup("Uint32")]]);
  xdr.struct("ConfigSettingContractHistoricalDataV0", [["feeHistorical1Kb", xdr.lookup("Int64")]]);
  xdr.struct("ConfigSettingContractEventsV0", [["txMaxContractEventsSizeBytes", xdr.lookup("Uint32")], ["feeContractEvents1Kb", xdr.lookup("Int64")]]);
  xdr.struct("ConfigSettingContractBandwidthV0", [["ledgerMaxTxsSizeBytes", xdr.lookup("Uint32")], ["txMaxSizeBytes", xdr.lookup("Uint32")], ["feeTxSize1Kb", xdr.lookup("Int64")]]);
  xdr["enum"]("ContractCostType", {
    wasmInsnExec: 0,
    memAlloc: 1,
    memCpy: 2,
    memCmp: 3,
    dispatchHostFunction: 4,
    visitObject: 5,
    valSer: 6,
    valDeser: 7,
    computeSha256Hash: 8,
    computeEd25519PubKey: 9,
    verifyEd25519Sig: 10,
    vmInstantiation: 11,
    vmCachedInstantiation: 12,
    invokeVmFunction: 13,
    computeKeccak256Hash: 14,
    computeEcdsaSecp256k1Sig: 15,
    recoverEcdsaSecp256k1Key: 16,
    int256AddSub: 17,
    int256Mul: 18,
    int256Div: 19,
    int256Pow: 20,
    int256Shift: 21,
    chaCha20DrawBytes: 22
  });
  xdr.struct("ContractCostParamEntry", [["ext", xdr.lookup("ExtensionPoint")], ["constTerm", xdr.lookup("Int64")], ["linearTerm", xdr.lookup("Int64")]]);
  xdr.struct("StateArchivalSettings", [["maxEntryTtl", xdr.lookup("Uint32")], ["minTemporaryTtl", xdr.lookup("Uint32")], ["minPersistentTtl", xdr.lookup("Uint32")], ["persistentRentRateDenominator", xdr.lookup("Int64")], ["tempRentRateDenominator", xdr.lookup("Int64")], ["maxEntriesToArchive", xdr.lookup("Uint32")], ["bucketListSizeWindowSampleSize", xdr.lookup("Uint32")], ["evictionScanSize", xdr.lookup("Uint64")], ["startingEvictionScanLevel", xdr.lookup("Uint32")]]);
  xdr.struct("EvictionIterator", [["bucketListLevel", xdr.lookup("Uint32")], ["isCurrBucket", xdr.bool()], ["bucketFileOffset", xdr.lookup("Uint64")]]);
  xdr["const"]("CONTRACT_COST_COUNT_LIMIT", 1024);
  xdr.typedef("ContractCostParams", xdr.varArray(xdr.lookup("ContractCostParamEntry"), xdr.lookup("CONTRACT_COST_COUNT_LIMIT")));
  xdr["enum"]("ConfigSettingId", {
    configSettingContractMaxSizeBytes: 0,
    configSettingContractComputeV0: 1,
    configSettingContractLedgerCostV0: 2,
    configSettingContractHistoricalDataV0: 3,
    configSettingContractEventsV0: 4,
    configSettingContractBandwidthV0: 5,
    configSettingContractCostParamsCpuInstructions: 6,
    configSettingContractCostParamsMemoryBytes: 7,
    configSettingContractDataKeySizeBytes: 8,
    configSettingContractDataEntrySizeBytes: 9,
    configSettingStateArchival: 10,
    configSettingContractExecutionLanes: 11,
    configSettingBucketlistSizeWindow: 12,
    configSettingEvictionIterator: 13
  });
  xdr.union("ConfigSettingEntry", {
    switchOn: xdr.lookup("ConfigSettingId"),
    switchName: "configSettingId",
    switches: [["configSettingContractMaxSizeBytes", "contractMaxSizeBytes"], ["configSettingContractComputeV0", "contractCompute"], ["configSettingContractLedgerCostV0", "contractLedgerCost"], ["configSettingContractHistoricalDataV0", "contractHistoricalData"], ["configSettingContractEventsV0", "contractEvents"], ["configSettingContractBandwidthV0", "contractBandwidth"], ["configSettingContractCostParamsCpuInstructions", "contractCostParamsCpuInsns"], ["configSettingContractCostParamsMemoryBytes", "contractCostParamsMemBytes"], ["configSettingContractDataKeySizeBytes", "contractDataKeySizeBytes"], ["configSettingContractDataEntrySizeBytes", "contractDataEntrySizeBytes"], ["configSettingStateArchival", "stateArchivalSettings"], ["configSettingContractExecutionLanes", "contractExecutionLanes"], ["configSettingBucketlistSizeWindow", "bucketListSizeWindow"], ["configSettingEvictionIterator", "evictionIterator"]],
    arms: {
      contractMaxSizeBytes: xdr.lookup("Uint32"),
      contractCompute: xdr.lookup("ConfigSettingContractComputeV0"),
      contractLedgerCost: xdr.lookup("ConfigSettingContractLedgerCostV0"),
      contractHistoricalData: xdr.lookup("ConfigSettingContractHistoricalDataV0"),
      contractEvents: xdr.lookup("ConfigSettingContractEventsV0"),
      contractBandwidth: xdr.lookup("ConfigSettingContractBandwidthV0"),
      contractCostParamsCpuInsns: xdr.lookup("ContractCostParams"),
      contractCostParamsMemBytes: xdr.lookup("ContractCostParams"),
      contractDataKeySizeBytes: xdr.lookup("Uint32"),
      contractDataEntrySizeBytes: xdr.lookup("Uint32"),
      stateArchivalSettings: xdr.lookup("StateArchivalSettings"),
      contractExecutionLanes: xdr.lookup("ConfigSettingContractExecutionLanesV0"),
      bucketListSizeWindow: xdr.varArray(xdr.lookup("Uint64"), 2147483647),
      evictionIterator: xdr.lookup("EvictionIterator")
    }
  });
});
var _default = exports["default"] = types;

/***/ }),

/***/ 1273:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LiquidityPoolFeeV18 = void 0;
exports.getLiquidityPoolId = getLiquidityPoolId;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _asset = __webpack_require__(1247);
var _hashing = __webpack_require__(8827);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var LiquidityPoolFeeV18 = exports.LiquidityPoolFeeV18 = 30;
function getLiquidityPoolId(liquidityPoolType) {
  var liquidityPoolParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (liquidityPoolType !== 'constant_product') {
    throw new Error('liquidityPoolType is invalid');
  }
  var assetA = liquidityPoolParameters.assetA,
    assetB = liquidityPoolParameters.assetB,
    fee = liquidityPoolParameters.fee;
  if (!assetA || !(assetA instanceof _asset.Asset)) {
    throw new Error('assetA is invalid');
  }
  if (!assetB || !(assetB instanceof _asset.Asset)) {
    throw new Error('assetB is invalid');
  }
  if (!fee || fee !== LiquidityPoolFeeV18) {
    throw new Error('fee is invalid');
  }
  if (_asset.Asset.compare(assetA, assetB) !== -1) {
    throw new Error('Assets are not in lexicographic order');
  }
  var lpTypeData = _xdr["default"].LiquidityPoolType.liquidityPoolConstantProduct().toXDR();
  var lpParamsData = new _xdr["default"].LiquidityPoolConstantProductParameters({
    assetA: assetA.toXDRObject(),
    assetB: assetB.toXDRObject(),
    fee: fee
  }).toXDR();
  var payload = Buffer.concat([lpTypeData, lpParamsData]);
  return (0, _hashing.hash)(payload);
}

/***/ }),

/***/ 8827:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.hash = hash;
var _sha = __webpack_require__(9072);
function hash(data) {
  var hasher = new _sha.sha256();
  hasher.update(data, 'utf8');
  return hasher.digest();
}

/***/ }),

/***/ 8625:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  xdr: true,
  hash: true,
  sign: true,
  verify: true,
  FastSigning: true,
  getLiquidityPoolId: true,
  LiquidityPoolFeeV18: true,
  Keypair: true,
  UnsignedHyper: true,
  Hyper: true,
  TransactionBase: true,
  Transaction: true,
  FeeBumpTransaction: true,
  TransactionBuilder: true,
  TimeoutInfinite: true,
  BASE_FEE: true,
  Asset: true,
  LiquidityPoolAsset: true,
  LiquidityPoolId: true,
  Operation: true,
  AuthRequiredFlag: true,
  AuthRevocableFlag: true,
  AuthImmutableFlag: true,
  AuthClawbackEnabledFlag: true,
  Account: true,
  MuxedAccount: true,
  Claimant: true,
  Networks: true,
  StrKey: true,
  SignerKey: true,
  Soroban: true,
  decodeAddressToMuxedAccount: true,
  encodeMuxedAccountToAddress: true,
  extractBaseAddress: true,
  encodeMuxedAccount: true,
  Contract: true,
  Address: true
};
Object.defineProperty(exports, "Account", ({
  enumerable: true,
  get: function get() {
    return _account.Account;
  }
}));
Object.defineProperty(exports, "Address", ({
  enumerable: true,
  get: function get() {
    return _address.Address;
  }
}));
Object.defineProperty(exports, "Asset", ({
  enumerable: true,
  get: function get() {
    return _asset.Asset;
  }
}));
Object.defineProperty(exports, "AuthClawbackEnabledFlag", ({
  enumerable: true,
  get: function get() {
    return _operation.AuthClawbackEnabledFlag;
  }
}));
Object.defineProperty(exports, "AuthImmutableFlag", ({
  enumerable: true,
  get: function get() {
    return _operation.AuthImmutableFlag;
  }
}));
Object.defineProperty(exports, "AuthRequiredFlag", ({
  enumerable: true,
  get: function get() {
    return _operation.AuthRequiredFlag;
  }
}));
Object.defineProperty(exports, "AuthRevocableFlag", ({
  enumerable: true,
  get: function get() {
    return _operation.AuthRevocableFlag;
  }
}));
Object.defineProperty(exports, "BASE_FEE", ({
  enumerable: true,
  get: function get() {
    return _transaction_builder.BASE_FEE;
  }
}));
Object.defineProperty(exports, "Claimant", ({
  enumerable: true,
  get: function get() {
    return _claimant.Claimant;
  }
}));
Object.defineProperty(exports, "Contract", ({
  enumerable: true,
  get: function get() {
    return _contract.Contract;
  }
}));
Object.defineProperty(exports, "FastSigning", ({
  enumerable: true,
  get: function get() {
    return _signing.FastSigning;
  }
}));
Object.defineProperty(exports, "FeeBumpTransaction", ({
  enumerable: true,
  get: function get() {
    return _fee_bump_transaction.FeeBumpTransaction;
  }
}));
Object.defineProperty(exports, "Hyper", ({
  enumerable: true,
  get: function get() {
    return _jsXdr.Hyper;
  }
}));
Object.defineProperty(exports, "Keypair", ({
  enumerable: true,
  get: function get() {
    return _keypair.Keypair;
  }
}));
Object.defineProperty(exports, "LiquidityPoolAsset", ({
  enumerable: true,
  get: function get() {
    return _liquidity_pool_asset.LiquidityPoolAsset;
  }
}));
Object.defineProperty(exports, "LiquidityPoolFeeV18", ({
  enumerable: true,
  get: function get() {
    return _get_liquidity_pool_id.LiquidityPoolFeeV18;
  }
}));
Object.defineProperty(exports, "LiquidityPoolId", ({
  enumerable: true,
  get: function get() {
    return _liquidity_pool_id.LiquidityPoolId;
  }
}));
Object.defineProperty(exports, "MuxedAccount", ({
  enumerable: true,
  get: function get() {
    return _muxed_account.MuxedAccount;
  }
}));
Object.defineProperty(exports, "Networks", ({
  enumerable: true,
  get: function get() {
    return _network.Networks;
  }
}));
Object.defineProperty(exports, "Operation", ({
  enumerable: true,
  get: function get() {
    return _operation.Operation;
  }
}));
Object.defineProperty(exports, "SignerKey", ({
  enumerable: true,
  get: function get() {
    return _signerkey.SignerKey;
  }
}));
Object.defineProperty(exports, "Soroban", ({
  enumerable: true,
  get: function get() {
    return _soroban.Soroban;
  }
}));
Object.defineProperty(exports, "StrKey", ({
  enumerable: true,
  get: function get() {
    return _strkey.StrKey;
  }
}));
Object.defineProperty(exports, "TimeoutInfinite", ({
  enumerable: true,
  get: function get() {
    return _transaction_builder.TimeoutInfinite;
  }
}));
Object.defineProperty(exports, "Transaction", ({
  enumerable: true,
  get: function get() {
    return _transaction.Transaction;
  }
}));
Object.defineProperty(exports, "TransactionBase", ({
  enumerable: true,
  get: function get() {
    return _transaction_base.TransactionBase;
  }
}));
Object.defineProperty(exports, "TransactionBuilder", ({
  enumerable: true,
  get: function get() {
    return _transaction_builder.TransactionBuilder;
  }
}));
Object.defineProperty(exports, "UnsignedHyper", ({
  enumerable: true,
  get: function get() {
    return _jsXdr.UnsignedHyper;
  }
}));
Object.defineProperty(exports, "decodeAddressToMuxedAccount", ({
  enumerable: true,
  get: function get() {
    return _decode_encode_muxed_account.decodeAddressToMuxedAccount;
  }
}));
exports["default"] = void 0;
Object.defineProperty(exports, "encodeMuxedAccount", ({
  enumerable: true,
  get: function get() {
    return _decode_encode_muxed_account.encodeMuxedAccount;
  }
}));
Object.defineProperty(exports, "encodeMuxedAccountToAddress", ({
  enumerable: true,
  get: function get() {
    return _decode_encode_muxed_account.encodeMuxedAccountToAddress;
  }
}));
Object.defineProperty(exports, "extractBaseAddress", ({
  enumerable: true,
  get: function get() {
    return _decode_encode_muxed_account.extractBaseAddress;
  }
}));
Object.defineProperty(exports, "getLiquidityPoolId", ({
  enumerable: true,
  get: function get() {
    return _get_liquidity_pool_id.getLiquidityPoolId;
  }
}));
Object.defineProperty(exports, "hash", ({
  enumerable: true,
  get: function get() {
    return _hashing.hash;
  }
}));
Object.defineProperty(exports, "sign", ({
  enumerable: true,
  get: function get() {
    return _signing.sign;
  }
}));
Object.defineProperty(exports, "verify", ({
  enumerable: true,
  get: function get() {
    return _signing.verify;
  }
}));
Object.defineProperty(exports, "xdr", ({
  enumerable: true,
  get: function get() {
    return _xdr["default"];
  }
}));
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _hashing = __webpack_require__(8827);
var _signing = __webpack_require__(7454);
var _get_liquidity_pool_id = __webpack_require__(1273);
var _keypair = __webpack_require__(4839);
var _jsXdr = __webpack_require__(6263);
var _transaction_base = __webpack_require__(2891);
var _transaction = __webpack_require__(7419);
var _fee_bump_transaction = __webpack_require__(8370);
var _transaction_builder = __webpack_require__(6997);
var _asset = __webpack_require__(1247);
var _liquidity_pool_asset = __webpack_require__(5429);
var _liquidity_pool_id = __webpack_require__(45);
var _operation = __webpack_require__(5458);
var _memo = __webpack_require__(2510);
Object.keys(_memo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _memo[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _memo[key];
    }
  });
});
var _account = __webpack_require__(3771);
var _muxed_account = __webpack_require__(6971);
var _claimant = __webpack_require__(1515);
var _network = __webpack_require__(2959);
var _strkey = __webpack_require__(95);
var _signerkey = __webpack_require__(3098);
var _soroban = __webpack_require__(5983);
var _decode_encode_muxed_account = __webpack_require__(9875);
var _contract = __webpack_require__(1958);
var _address = __webpack_require__(4138);
var _numbers = __webpack_require__(1122);
Object.keys(_numbers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _numbers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _numbers[key];
    }
  });
});
var _scval = __webpack_require__(3404);
Object.keys(_scval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scval[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scval[key];
    }
  });
});
var _events = __webpack_require__(225);
Object.keys(_events).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _events[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _events[key];
    }
  });
});
var _sorobandata_builder = __webpack_require__(8214);
Object.keys(_sorobandata_builder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _sorobandata_builder[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sorobandata_builder[key];
    }
  });
});
var _auth = __webpack_require__(2108);
Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _auth[key];
    }
  });
});
var _invocation = __webpack_require__(6212);
Object.keys(_invocation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _invocation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _invocation[key];
    }
  });
});
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
_bignumber["default"].DEBUG = true;
var _default = exports["default"] = module.exports;

/***/ }),

/***/ 6212:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.buildInvocationTree = buildInvocationTree;
exports.walkInvocationTree = walkInvocationTree;
var _asset = __webpack_require__(1247);
var _address = __webpack_require__(4138);
var _scval = __webpack_require__(3404);
function buildInvocationTree(root) {
  var fn = root["function"]();
  var output = {};
  var inner = fn.value();
  switch (fn["switch"]().value) {
    case 0:
      output.type = 'execute';
      output.args = {
        source: _address.Address.fromScAddress(inner.contractAddress()).toString(),
        "function": inner.functionName(),
        args: inner.args().map(function (arg) {
          return (0, _scval.scValToNative)(arg);
        })
      };
      break;
    case 1:
      {
        output.type = 'create';
        output.args = {};
        var _ref = [inner.executable(), inner.contractIdPreimage()],
          exec = _ref[0],
          preimage = _ref[1];
        if (!!exec["switch"]().value !== !!preimage["switch"]().value) {
          throw new Error("creation function appears invalid: ".concat(JSON.stringify(inner), " (should be wasm+address or token+asset)"));
        }
        switch (exec["switch"]().value) {
          case 0:
            {
              var details = preimage.fromAddress();
              output.args.type = 'wasm';
              output.args.wasm = {
                salt: details.salt().toString('hex'),
                hash: exec.wasmHash().toString('hex'),
                address: _address.Address.fromScAddress(details.address()).toString()
              };
              break;
            }
          case 1:
            output.args.type = 'sac';
            output.args.asset = _asset.Asset.fromOperation(preimage.fromAsset()).toString();
            break;
          default:
            throw new Error("unknown creation type: ".concat(JSON.stringify(exec)));
        }
        break;
      }
    default:
      throw new Error("unknown invocation type (".concat(fn["switch"](), "): ").concat(JSON.stringify(fn)));
  }
  output.invocations = root.subInvocations().map(function (i) {
    return buildInvocationTree(i);
  });
  return output;
}
function walkInvocationTree(root, callback) {
  walkHelper(root, 1, callback);
}
function walkHelper(node, depth, callback, parent) {
  if (callback(node, depth, parent) === false) {
    return;
  }
  node.subInvocations().forEach(function (i) {
    return walkHelper(i, depth + 1, callback, node);
  });
}

/***/ }),

/***/ 4839:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Keypair = void 0;
var _tweetnacl = _interopRequireDefault(__webpack_require__(9419));
var _signing = __webpack_require__(7454);
var _strkey = __webpack_require__(95);
var _hashing = __webpack_require__(8827);
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Keypair = exports.Keypair = function () {
  function Keypair(keys) {
    _classCallCheck(this, Keypair);
    if (keys.type !== 'ed25519') {
      throw new Error('Invalid keys type');
    }
    this.type = keys.type;
    if (keys.secretKey) {
      keys.secretKey = Buffer.from(keys.secretKey);
      if (keys.secretKey.length !== 32) {
        throw new Error('secretKey length is invalid');
      }
      this._secretSeed = keys.secretKey;
      this._publicKey = (0, _signing.generate)(keys.secretKey);
      this._secretKey = Buffer.concat([keys.secretKey, this._publicKey]);
      if (keys.publicKey && !this._publicKey.equals(Buffer.from(keys.publicKey))) {
        throw new Error('secretKey does not match publicKey');
      }
    } else {
      this._publicKey = Buffer.from(keys.publicKey);
      if (this._publicKey.length !== 32) {
        throw new Error('publicKey length is invalid');
      }
    }
  }
  _createClass(Keypair, [{
    key: "xdrAccountId",
    value: function xdrAccountId() {
      return new _xdr["default"].AccountId.publicKeyTypeEd25519(this._publicKey);
    }
  }, {
    key: "xdrPublicKey",
    value: function xdrPublicKey() {
      return new _xdr["default"].PublicKey.publicKeyTypeEd25519(this._publicKey);
    }
  }, {
    key: "xdrMuxedAccount",
    value: function xdrMuxedAccount(id) {
      if (typeof id !== 'undefined') {
        if (typeof id !== 'string') {
          throw new TypeError("expected string for ID, got ".concat(_typeof(id)));
        }
        return _xdr["default"].MuxedAccount.keyTypeMuxedEd25519(new _xdr["default"].MuxedAccountMed25519({
          id: _xdr["default"].Uint64.fromString(id),
          ed25519: this._publicKey
        }));
      }
      return new _xdr["default"].MuxedAccount.keyTypeEd25519(this._publicKey);
    }
  }, {
    key: "rawPublicKey",
    value: function rawPublicKey() {
      return this._publicKey;
    }
  }, {
    key: "signatureHint",
    value: function signatureHint() {
      var a = this.xdrAccountId().toXDR();
      return a.slice(a.length - 4);
    }
  }, {
    key: "publicKey",
    value: function publicKey() {
      return _strkey.StrKey.encodeEd25519PublicKey(this._publicKey);
    }
  }, {
    key: "secret",
    value: function secret() {
      if (!this._secretSeed) {
        throw new Error('no secret key available');
      }
      if (this.type === 'ed25519') {
        return _strkey.StrKey.encodeEd25519SecretSeed(this._secretSeed);
      }
      throw new Error('Invalid Keypair type');
    }
  }, {
    key: "rawSecretKey",
    value: function rawSecretKey() {
      return this._secretSeed;
    }
  }, {
    key: "canSign",
    value: function canSign() {
      return !!this._secretKey;
    }
  }, {
    key: "sign",
    value: function sign(data) {
      if (!this.canSign()) {
        throw new Error('cannot sign: no secret key available');
      }
      return (0, _signing.sign)(data, this._secretKey);
    }
  }, {
    key: "verify",
    value: function verify(data, signature) {
      return (0, _signing.verify)(data, signature, this._publicKey);
    }
  }, {
    key: "signDecorated",
    value: function signDecorated(data) {
      var signature = this.sign(data);
      var hint = this.signatureHint();
      return new _xdr["default"].DecoratedSignature({
        hint: hint,
        signature: signature
      });
    }
  }, {
    key: "signPayloadDecorated",
    value: function signPayloadDecorated(data) {
      var signature = this.sign(data);
      var keyHint = this.signatureHint();
      var hint = Buffer.from(data.slice(-4));
      if (hint.length < 4) {
        hint = Buffer.concat([hint, Buffer.alloc(4 - data.length, 0)]);
      }
      return new _xdr["default"].DecoratedSignature({
        hint: hint.map(function (_byte, i) {
          return _byte ^ keyHint[i];
        }),
        signature: signature
      });
    }
  }], [{
    key: "fromSecret",
    value: function fromSecret(secret) {
      var rawSecret = _strkey.StrKey.decodeEd25519SecretSeed(secret);
      return this.fromRawEd25519Seed(rawSecret);
    }
  }, {
    key: "fromRawEd25519Seed",
    value: function fromRawEd25519Seed(rawSeed) {
      return new this({
        type: 'ed25519',
        secretKey: rawSeed
      });
    }
  }, {
    key: "master",
    value: function master(networkPassphrase) {
      if (!networkPassphrase) {
        throw new Error('No network selected. Please pass a network argument, e.g. `Keypair.master(Networks.PUBLIC)`.');
      }
      return this.fromRawEd25519Seed((0, _hashing.hash)(networkPassphrase));
    }
  }, {
    key: "fromPublicKey",
    value: function fromPublicKey(publicKey) {
      publicKey = _strkey.StrKey.decodeEd25519PublicKey(publicKey);
      if (publicKey.length !== 32) {
        throw new Error('Invalid Stellar public key');
      }
      return new this({
        type: 'ed25519',
        publicKey: publicKey
      });
    }
  }, {
    key: "random",
    value: function random() {
      var secret = _tweetnacl["default"].randomBytes(32);
      return this.fromRawEd25519Seed(secret);
    }
  }]);
  return Keypair;
}();

/***/ }),

/***/ 5429:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LiquidityPoolAsset = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _asset = __webpack_require__(1247);
var _get_liquidity_pool_id = __webpack_require__(1273);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var LiquidityPoolAsset = exports.LiquidityPoolAsset = function () {
  function LiquidityPoolAsset(assetA, assetB, fee) {
    _classCallCheck(this, LiquidityPoolAsset);
    if (!assetA || !(assetA instanceof _asset.Asset)) {
      throw new Error('assetA is invalid');
    }
    if (!assetB || !(assetB instanceof _asset.Asset)) {
      throw new Error('assetB is invalid');
    }
    if (_asset.Asset.compare(assetA, assetB) !== -1) {
      throw new Error('Assets are not in lexicographic order');
    }
    if (!fee || fee !== _get_liquidity_pool_id.LiquidityPoolFeeV18) {
      throw new Error('fee is invalid');
    }
    this.assetA = assetA;
    this.assetB = assetB;
    this.fee = fee;
  }
  _createClass(LiquidityPoolAsset, [{
    key: "toXDRObject",
    value: function toXDRObject() {
      var lpConstantProductParamsXdr = new _xdr["default"].LiquidityPoolConstantProductParameters({
        assetA: this.assetA.toXDRObject(),
        assetB: this.assetB.toXDRObject(),
        fee: this.fee
      });
      var lpParamsXdr = new _xdr["default"].LiquidityPoolParameters('liquidityPoolConstantProduct', lpConstantProductParamsXdr);
      return new _xdr["default"].ChangeTrustAsset('assetTypePoolShare', lpParamsXdr);
    }
  }, {
    key: "getLiquidityPoolParameters",
    value: function getLiquidityPoolParameters() {
      return _objectSpread(_objectSpread({}, this), {}, {
        assetA: this.assetA,
        assetB: this.assetB,
        fee: this.fee
      });
    }
  }, {
    key: "getAssetType",
    value: function getAssetType() {
      return 'liquidity_pool_shares';
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this.assetA.equals(other.assetA) && this.assetB.equals(other.assetB) && this.fee === other.fee;
    }
  }, {
    key: "toString",
    value: function toString() {
      var poolId = (0, _get_liquidity_pool_id.getLiquidityPoolId)('constant_product', this.getLiquidityPoolParameters()).toString('hex');
      return "liquidity_pool:".concat(poolId);
    }
  }], [{
    key: "fromOperation",
    value: function fromOperation(ctAssetXdr) {
      var assetType = ctAssetXdr["switch"]();
      if (assetType === _xdr["default"].AssetType.assetTypePoolShare()) {
        var liquidityPoolParameters = ctAssetXdr.liquidityPool().constantProduct();
        return new this(_asset.Asset.fromOperation(liquidityPoolParameters.assetA()), _asset.Asset.fromOperation(liquidityPoolParameters.assetB()), liquidityPoolParameters.fee());
      }
      throw new Error("Invalid asset type: ".concat(assetType.name));
    }
  }]);
  return LiquidityPoolAsset;
}();

/***/ }),

/***/ 45:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.LiquidityPoolId = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var LiquidityPoolId = exports.LiquidityPoolId = function () {
  function LiquidityPoolId(liquidityPoolId) {
    _classCallCheck(this, LiquidityPoolId);
    if (!liquidityPoolId) {
      throw new Error('liquidityPoolId cannot be empty');
    }
    if (!/^[a-f0-9]{64}$/.test(liquidityPoolId)) {
      throw new Error('Liquidity pool ID is not a valid hash');
    }
    this.liquidityPoolId = liquidityPoolId;
  }
  _createClass(LiquidityPoolId, [{
    key: "toXDRObject",
    value: function toXDRObject() {
      var xdrPoolId = _xdr["default"].PoolId.fromXDR(this.liquidityPoolId, 'hex');
      return new _xdr["default"].TrustLineAsset('assetTypePoolShare', xdrPoolId);
    }
  }, {
    key: "getLiquidityPoolId",
    value: function getLiquidityPoolId() {
      return String(this.liquidityPoolId);
    }
  }, {
    key: "getAssetType",
    value: function getAssetType() {
      return 'liquidity_pool_shares';
    }
  }, {
    key: "equals",
    value: function equals(asset) {
      return this.liquidityPoolId === asset.getLiquidityPoolId();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "liquidity_pool:".concat(this.liquidityPoolId);
    }
  }], [{
    key: "fromOperation",
    value: function fromOperation(tlAssetXdr) {
      var assetType = tlAssetXdr["switch"]();
      if (assetType === _xdr["default"].AssetType.assetTypePoolShare()) {
        var liquidityPoolId = tlAssetXdr.liquidityPoolId().toString('hex');
        return new this(liquidityPoolId);
      }
      throw new Error("Invalid asset type: ".concat(assetType.name));
    }
  }]);
  return LiquidityPoolId;
}();

/***/ }),

/***/ 2510:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MemoText = exports.MemoReturn = exports.MemoNone = exports.MemoID = exports.MemoHash = exports.Memo = void 0;
var _jsXdr = __webpack_require__(6263);
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var MemoNone = exports.MemoNone = 'none';
var MemoID = exports.MemoID = 'id';
var MemoText = exports.MemoText = 'text';
var MemoHash = exports.MemoHash = 'hash';
var MemoReturn = exports.MemoReturn = 'return';
var Memo = exports.Memo = function () {
  function Memo(type) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck(this, Memo);
    this._type = type;
    this._value = value;
    switch (this._type) {
      case MemoNone:
        break;
      case MemoID:
        Memo._validateIdValue(value);
        break;
      case MemoText:
        Memo._validateTextValue(value);
        break;
      case MemoHash:
      case MemoReturn:
        Memo._validateHashValue(value);
        if (typeof value === 'string') {
          this._value = Buffer.from(value, 'hex');
        }
        break;
      default:
        throw new Error('Invalid memo type');
    }
  }
  _createClass(Memo, [{
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(type) {
      throw new Error('Memo is immutable');
    }
  }, {
    key: "value",
    get: function get() {
      switch (this._type) {
        case MemoNone:
          return null;
        case MemoID:
        case MemoText:
          return this._value;
        case MemoHash:
        case MemoReturn:
          return Buffer.from(this._value);
        default:
          throw new Error('Invalid memo type');
      }
    },
    set: function set(value) {
      throw new Error('Memo is immutable');
    }
  }, {
    key: "toXDRObject",
    value: function toXDRObject() {
      switch (this._type) {
        case MemoNone:
          return _xdr["default"].Memo.memoNone();
        case MemoID:
          return _xdr["default"].Memo.memoId(_jsXdr.UnsignedHyper.fromString(this._value));
        case MemoText:
          return _xdr["default"].Memo.memoText(this._value);
        case MemoHash:
          return _xdr["default"].Memo.memoHash(this._value);
        case MemoReturn:
          return _xdr["default"].Memo.memoReturn(this._value);
        default:
          return null;
      }
    }
  }], [{
    key: "_validateIdValue",
    value: function _validateIdValue(value) {
      var error = new Error("Expects a int64 as a string. Got ".concat(value));
      if (typeof value !== 'string') {
        throw error;
      }
      var number;
      try {
        number = new _bignumber["default"](value);
      } catch (e) {
        throw error;
      }
      if (!number.isFinite()) {
        throw error;
      }
      if (number.isNaN()) {
        throw error;
      }
    }
  }, {
    key: "_validateTextValue",
    value: function _validateTextValue(value) {
      if (!_xdr["default"].Memo.armTypeForArm('text').isValid(value)) {
        throw new Error('Expects string, array or buffer, max 28 bytes');
      }
    }
  }, {
    key: "_validateHashValue",
    value: function _validateHashValue(value) {
      var error = new Error("Expects a 32 byte hash value or hex encoded string. Got ".concat(value));
      if (value === null || typeof value === 'undefined') {
        throw error;
      }
      var valueBuffer;
      if (typeof value === 'string') {
        if (!/^[0-9A-Fa-f]{64}$/g.test(value)) {
          throw error;
        }
        valueBuffer = Buffer.from(value, 'hex');
      } else if (Buffer.isBuffer(value)) {
        valueBuffer = Buffer.from(value);
      } else {
        throw error;
      }
      if (!valueBuffer.length || valueBuffer.length !== 32) {
        throw error;
      }
    }
  }, {
    key: "none",
    value: function none() {
      return new Memo(MemoNone);
    }
  }, {
    key: "text",
    value: function text(_text) {
      return new Memo(MemoText, _text);
    }
  }, {
    key: "id",
    value: function id(_id) {
      return new Memo(MemoID, _id);
    }
  }, {
    key: "hash",
    value: function hash(_hash) {
      return new Memo(MemoHash, _hash);
    }
  }, {
    key: "return",
    value: function _return(hash) {
      return new Memo(MemoReturn, hash);
    }
  }, {
    key: "fromXDRObject",
    value: function fromXDRObject(object) {
      switch (object.arm()) {
        case 'id':
          return Memo.id(object.value().toString());
        case 'text':
          return Memo.text(object.value());
        case 'hash':
          return Memo.hash(object.value());
        case 'retHash':
          return Memo["return"](object.value());
        default:
          break;
      }
      if (typeof object.value() === 'undefined') {
        return Memo.none();
      }
      throw new Error('Unknown type');
    }
  }]);
  return Memo;
}();

/***/ }),

/***/ 6971:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MuxedAccount = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _account = __webpack_require__(3771);
var _strkey = __webpack_require__(95);
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var MuxedAccount = exports.MuxedAccount = function () {
  function MuxedAccount(baseAccount, id) {
    _classCallCheck(this, MuxedAccount);
    var accountId = baseAccount.accountId();
    if (!_strkey.StrKey.isValidEd25519PublicKey(accountId)) {
      throw new Error('accountId is invalid');
    }
    this.account = baseAccount;
    this._muxedXdr = (0, _decode_encode_muxed_account.encodeMuxedAccount)(accountId, id);
    this._mAddress = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(this._muxedXdr);
    this._id = id;
  }
  _createClass(MuxedAccount, [{
    key: "baseAccount",
    value: function baseAccount() {
      return this.account;
    }
  }, {
    key: "accountId",
    value: function accountId() {
      return this._mAddress;
    }
  }, {
    key: "id",
    value: function id() {
      return this._id;
    }
  }, {
    key: "setId",
    value: function setId(id) {
      if (typeof id !== 'string') {
        throw new Error('id should be a string representing a number (uint64)');
      }
      this._muxedXdr.med25519().id(_xdr["default"].Uint64.fromString(id));
      this._mAddress = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(this._muxedXdr);
      this._id = id;
      return this;
    }
  }, {
    key: "sequenceNumber",
    value: function sequenceNumber() {
      return this.account.sequenceNumber();
    }
  }, {
    key: "incrementSequenceNumber",
    value: function incrementSequenceNumber() {
      return this.account.incrementSequenceNumber();
    }
  }, {
    key: "toXDRObject",
    value: function toXDRObject() {
      return this._muxedXdr;
    }
  }, {
    key: "equals",
    value: function equals(otherMuxedAccount) {
      return this.accountId() === otherMuxedAccount.accountId();
    }
  }], [{
    key: "fromAddress",
    value: function fromAddress(mAddress, sequenceNum) {
      var muxedAccount = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(mAddress);
      var gAddress = (0, _decode_encode_muxed_account.extractBaseAddress)(mAddress);
      var id = muxedAccount.med25519().id().toString();
      return new MuxedAccount(new _account.Account(gAddress, sequenceNum), id);
    }
  }]);
  return MuxedAccount;
}();

/***/ }),

/***/ 2959:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Networks = void 0;
var Networks = exports.Networks = {
  PUBLIC: 'Public Global Stellar Network ; September 2015',
  TESTNET: 'Test SDF Network ; September 2015',
  FUTURENET: 'Test SDF Future Network ; October 2022',
  SANDBOX: 'Local Sandbox Stellar Network ; September 2022',
  STANDALONE: 'Standalone Network ; February 2017'
};

/***/ }),

/***/ 1122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "Int128", ({
  enumerable: true,
  get: function get() {
    return _int.Int128;
  }
}));
Object.defineProperty(exports, "Int256", ({
  enumerable: true,
  get: function get() {
    return _int2.Int256;
  }
}));
Object.defineProperty(exports, "ScInt", ({
  enumerable: true,
  get: function get() {
    return _sc_int.ScInt;
  }
}));
Object.defineProperty(exports, "Uint128", ({
  enumerable: true,
  get: function get() {
    return _uint.Uint128;
  }
}));
Object.defineProperty(exports, "Uint256", ({
  enumerable: true,
  get: function get() {
    return _uint2.Uint256;
  }
}));
Object.defineProperty(exports, "XdrLargeInt", ({
  enumerable: true,
  get: function get() {
    return _xdr_large_int.XdrLargeInt;
  }
}));
exports.scValToBigInt = scValToBigInt;
var _xdr_large_int = __webpack_require__(4565);
var _uint = __webpack_require__(6675);
var _uint2 = __webpack_require__(6863);
var _int = __webpack_require__(8759);
var _int2 = __webpack_require__(5029);
var _sc_int = __webpack_require__(5304);
function scValToBigInt(scv) {
  var scIntType = _xdr_large_int.XdrLargeInt.getType(scv["switch"]().name);
  switch (scv["switch"]().name) {
    case 'scvU32':
    case 'scvI32':
      return BigInt(scv.value());
    case 'scvU64':
    case 'scvI64':
      return new _xdr_large_int.XdrLargeInt(scIntType, scv.value()).toBigInt();
    case 'scvU128':
    case 'scvI128':
      return new _xdr_large_int.XdrLargeInt(scIntType, [scv.value().lo(), scv.value().hi()]).toBigInt();
    case 'scvU256':
    case 'scvI256':
      return new _xdr_large_int.XdrLargeInt(scIntType, [scv.value().loLo(), scv.value().loHi(), scv.value().hiLo(), scv.value().hiHi()]).toBigInt();
    default:
      throw TypeError("expected integer type, got ".concat(scv["switch"]()));
  }
}

/***/ }),

/***/ 8759:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Int128 = void 0;
var _jsXdr = __webpack_require__(6263);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var Int128 = exports.Int128 = function (_LargeInt) {
  _inherits(Int128, _LargeInt);
  var _super = _createSuper(Int128);
  function Int128() {
    _classCallCheck(this, Int128);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _super.call(this, args);
  }
  _createClass(Int128, [{
    key: "unsigned",
    get: function get() {
      return false;
    }
  }, {
    key: "size",
    get: function get() {
      return 128;
    }
  }]);
  return Int128;
}(_jsXdr.LargeInt);
Int128.defineIntBoundaries();

/***/ }),

/***/ 5029:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Int256 = void 0;
var _jsXdr = __webpack_require__(6263);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var Int256 = exports.Int256 = function (_LargeInt) {
  _inherits(Int256, _LargeInt);
  var _super = _createSuper(Int256);
  function Int256() {
    _classCallCheck(this, Int256);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _super.call(this, args);
  }
  _createClass(Int256, [{
    key: "unsigned",
    get: function get() {
      return false;
    }
  }, {
    key: "size",
    get: function get() {
      return 256;
    }
  }]);
  return Int256;
}(_jsXdr.LargeInt);
Int256.defineIntBoundaries();

/***/ }),

/***/ 5304:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ScInt = void 0;
var _xdr_large_int = __webpack_require__(4565);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var ScInt = exports.ScInt = function (_XdrLargeInt) {
  _inherits(ScInt, _XdrLargeInt);
  var _super = _createSuper(ScInt);
  function ScInt(value, opts) {
    var _opts$type;
    _classCallCheck(this, ScInt);
    var signed = value < 0;
    var type = (_opts$type = opts === null || opts === void 0 ? void 0 : opts.type) !== null && _opts$type !== void 0 ? _opts$type : '';
    if (type.startsWith('u') && signed) {
      throw TypeError("specified type ".concat(opts.type, " yet negative (").concat(value, ")"));
    }
    if (type === '') {
      type = signed ? 'i' : 'u';
      var bitlen = nearestBigIntSize(value);
      switch (bitlen) {
        case 64:
        case 128:
        case 256:
          type += bitlen.toString();
          break;
        default:
          throw RangeError("expected 64/128/256 bits for input (".concat(value, "), got ").concat(bitlen));
      }
    }
    return _super.call(this, type, value);
  }
  return _createClass(ScInt);
}(_xdr_large_int.XdrLargeInt);
function nearestBigIntSize(bigI) {
  var _find;
  var bitlen = bigI.toString(2).length;
  return (_find = [64, 128, 256].find(function (len) {
    return bitlen <= len;
  })) !== null && _find !== void 0 ? _find : bitlen;
}

/***/ }),

/***/ 6675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Uint128 = void 0;
var _jsXdr = __webpack_require__(6263);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var Uint128 = exports.Uint128 = function (_LargeInt) {
  _inherits(Uint128, _LargeInt);
  var _super = _createSuper(Uint128);
  function Uint128() {
    _classCallCheck(this, Uint128);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _super.call(this, args);
  }
  _createClass(Uint128, [{
    key: "unsigned",
    get: function get() {
      return true;
    }
  }, {
    key: "size",
    get: function get() {
      return 128;
    }
  }]);
  return Uint128;
}(_jsXdr.LargeInt);
Uint128.defineIntBoundaries();

/***/ }),

/***/ 6863:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Uint256 = void 0;
var _jsXdr = __webpack_require__(6263);
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var Uint256 = exports.Uint256 = function (_LargeInt) {
  _inherits(Uint256, _LargeInt);
  var _super = _createSuper(Uint256);
  function Uint256() {
    _classCallCheck(this, Uint256);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _super.call(this, args);
  }
  _createClass(Uint256, [{
    key: "unsigned",
    get: function get() {
      return true;
    }
  }, {
    key: "size",
    get: function get() {
      return 256;
    }
  }]);
  return Uint256;
}(_jsXdr.LargeInt);
Uint256.defineIntBoundaries();

/***/ }),

/***/ 4565:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XdrLargeInt = void 0;
var _jsXdr = __webpack_require__(6263);
var _uint = __webpack_require__(6675);
var _uint2 = __webpack_require__(6863);
var _int = __webpack_require__(8759);
var _int2 = __webpack_require__(5029);
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var XdrLargeInt = exports.XdrLargeInt = function () {
  function XdrLargeInt(type, values) {
    _classCallCheck(this, XdrLargeInt);
    _defineProperty(this, "int", void 0);
    _defineProperty(this, "type", void 0);
    if (!(values instanceof Array)) {
      values = [values];
    }
    values = values.map(function (i) {
      if (typeof i === 'bigint') {
        return i;
      }
      if (i instanceof XdrLargeInt) {
        return i.toBigInt();
      }
      return BigInt(i);
    });
    switch (type) {
      case 'i64':
        this["int"] = new _jsXdr.Hyper(values);
        break;
      case 'i128':
        this["int"] = new _int.Int128(values);
        break;
      case 'i256':
        this["int"] = new _int2.Int256(values);
        break;
      case 'u64':
        this["int"] = new _jsXdr.UnsignedHyper(values);
        break;
      case 'u128':
        this["int"] = new _uint.Uint128(values);
        break;
      case 'u256':
        this["int"] = new _uint2.Uint256(values);
        break;
      default:
        throw TypeError("invalid type: ".concat(type));
    }
    this.type = type;
  }
  _createClass(XdrLargeInt, [{
    key: "toNumber",
    value: function toNumber() {
      var bi = this["int"].toBigInt();
      if (bi > Number.MAX_SAFE_INTEGER || bi < Number.MIN_SAFE_INTEGER) {
        throw RangeError("value ".concat(bi, " not in range for Number ") + "[".concat(Number.MAX_SAFE_INTEGER, ", ").concat(Number.MIN_SAFE_INTEGER, "]"));
      }
      return Number(bi);
    }
  }, {
    key: "toBigInt",
    value: function toBigInt() {
      return this["int"].toBigInt();
    }
  }, {
    key: "toI64",
    value: function toI64() {
      this._sizeCheck(64);
      var v = this.toBigInt();
      if (BigInt.asIntN(64, v) !== v) {
        throw RangeError("value too large for i64: ".concat(v));
      }
      return _xdr["default"].ScVal.scvI64(new _xdr["default"].Int64(v));
    }
  }, {
    key: "toU64",
    value: function toU64() {
      this._sizeCheck(64);
      return _xdr["default"].ScVal.scvU64(new _xdr["default"].Uint64(BigInt.asUintN(64, this.toBigInt())));
    }
  }, {
    key: "toI128",
    value: function toI128() {
      this._sizeCheck(128);
      var v = this["int"].toBigInt();
      var hi64 = BigInt.asIntN(64, v >> 64n);
      var lo64 = BigInt.asUintN(64, v);
      return _xdr["default"].ScVal.scvI128(new _xdr["default"].Int128Parts({
        hi: new _xdr["default"].Int64(hi64),
        lo: new _xdr["default"].Uint64(lo64)
      }));
    }
  }, {
    key: "toU128",
    value: function toU128() {
      this._sizeCheck(128);
      var v = this["int"].toBigInt();
      return _xdr["default"].ScVal.scvU128(new _xdr["default"].UInt128Parts({
        hi: new _xdr["default"].Uint64(BigInt.asUintN(64, v >> 64n)),
        lo: new _xdr["default"].Uint64(BigInt.asUintN(64, v))
      }));
    }
  }, {
    key: "toI256",
    value: function toI256() {
      var v = this["int"].toBigInt();
      var hiHi64 = BigInt.asIntN(64, v >> 192n);
      var hiLo64 = BigInt.asUintN(64, v >> 128n);
      var loHi64 = BigInt.asUintN(64, v >> 64n);
      var loLo64 = BigInt.asUintN(64, v);
      return _xdr["default"].ScVal.scvI256(new _xdr["default"].Int256Parts({
        hiHi: new _xdr["default"].Int64(hiHi64),
        hiLo: new _xdr["default"].Uint64(hiLo64),
        loHi: new _xdr["default"].Uint64(loHi64),
        loLo: new _xdr["default"].Uint64(loLo64)
      }));
    }
  }, {
    key: "toU256",
    value: function toU256() {
      var v = this["int"].toBigInt();
      var hiHi64 = BigInt.asUintN(64, v >> 192n);
      var hiLo64 = BigInt.asUintN(64, v >> 128n);
      var loHi64 = BigInt.asUintN(64, v >> 64n);
      var loLo64 = BigInt.asUintN(64, v);
      return _xdr["default"].ScVal.scvU256(new _xdr["default"].UInt256Parts({
        hiHi: new _xdr["default"].Uint64(hiHi64),
        hiLo: new _xdr["default"].Uint64(hiLo64),
        loHi: new _xdr["default"].Uint64(loHi64),
        loLo: new _xdr["default"].Uint64(loLo64)
      }));
    }
  }, {
    key: "toScVal",
    value: function toScVal() {
      switch (this.type) {
        case 'i64':
          return this.toI64();
        case 'i128':
          return this.toI128();
        case 'i256':
          return this.toI256();
        case 'u64':
          return this.toU64();
        case 'u128':
          return this.toU128();
        case 'u256':
          return this.toU256();
        default:
          throw TypeError("invalid type: ".concat(this.type));
      }
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this["int"].valueOf();
    }
  }, {
    key: "toString",
    value: function toString() {
      return this["int"].toString();
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        value: this.toBigInt().toString(),
        type: this.type
      };
    }
  }, {
    key: "_sizeCheck",
    value: function _sizeCheck(bits) {
      if (this["int"].size > bits) {
        throw RangeError("value too large for ".concat(bits, " bits (").concat(this.type, ")"));
      }
    }
  }], [{
    key: "isType",
    value: function isType(type) {
      switch (type) {
        case 'i64':
        case 'i128':
        case 'i256':
        case 'u64':
        case 'u128':
        case 'u256':
          return true;
        default:
          return false;
      }
    }
  }, {
    key: "getType",
    value: function getType(scvType) {
      return scvType.slice(3).toLowerCase();
    }
  }]);
  return XdrLargeInt;
}();

/***/ }),

/***/ 5458:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Operation = exports.AuthRevocableFlag = exports.AuthRequiredFlag = exports.AuthImmutableFlag = exports.AuthClawbackEnabledFlag = void 0;
var _jsXdr = __webpack_require__(6263);
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
var _util = __webpack_require__(3957);
var _continued_fraction = __webpack_require__(7289);
var _asset = __webpack_require__(1247);
var _liquidity_pool_asset = __webpack_require__(5429);
var _claimant = __webpack_require__(1515);
var _strkey = __webpack_require__(95);
var _liquidity_pool_id = __webpack_require__(45);
var _xdr = _interopRequireDefault(__webpack_require__(751));
var ops = _interopRequireWildcard(__webpack_require__(8371));
var _decode_encode_muxed_account = __webpack_require__(9875);
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n["default"] = e, t && t.set(e, n), n;
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var ONE = 10000000;
var MAX_INT64 = '9223372036854775807';
var AuthRequiredFlag = exports.AuthRequiredFlag = 1 << 0;
var AuthRevocableFlag = exports.AuthRevocableFlag = 1 << 1;
var AuthImmutableFlag = exports.AuthImmutableFlag = 1 << 2;
var AuthClawbackEnabledFlag = exports.AuthClawbackEnabledFlag = 1 << 3;
var Operation = exports.Operation = function () {
  function Operation() {
    _classCallCheck(this, Operation);
  }
  _createClass(Operation, null, [{
    key: "setSourceAccount",
    value: function setSourceAccount(opAttributes, opts) {
      if (opts.source) {
        try {
          opAttributes.sourceAccount = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(opts.source);
        } catch (e) {
          throw new Error('Source address is invalid');
        }
      }
    }
  }, {
    key: "fromXDRObject",
    value: function fromXDRObject(operation) {
      var result = {};
      if (operation.sourceAccount()) {
        result.source = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(operation.sourceAccount());
      }
      var attrs = operation.body().value();
      var operationName = operation.body()["switch"]().name;
      switch (operationName) {
        case 'createAccount':
          {
            result.type = 'createAccount';
            result.destination = accountIdtoAddress(attrs.destination());
            result.startingBalance = this._fromXDRAmount(attrs.startingBalance());
            break;
          }
        case 'payment':
          {
            result.type = 'payment';
            result.destination = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(attrs.destination());
            result.asset = _asset.Asset.fromOperation(attrs.asset());
            result.amount = this._fromXDRAmount(attrs.amount());
            break;
          }
        case 'pathPaymentStrictReceive':
          {
            result.type = 'pathPaymentStrictReceive';
            result.sendAsset = _asset.Asset.fromOperation(attrs.sendAsset());
            result.sendMax = this._fromXDRAmount(attrs.sendMax());
            result.destination = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(attrs.destination());
            result.destAsset = _asset.Asset.fromOperation(attrs.destAsset());
            result.destAmount = this._fromXDRAmount(attrs.destAmount());
            result.path = [];
            var path = attrs.path();
            Object.keys(path).forEach(function (pathKey) {
              result.path.push(_asset.Asset.fromOperation(path[pathKey]));
            });
            break;
          }
        case 'pathPaymentStrictSend':
          {
            result.type = 'pathPaymentStrictSend';
            result.sendAsset = _asset.Asset.fromOperation(attrs.sendAsset());
            result.sendAmount = this._fromXDRAmount(attrs.sendAmount());
            result.destination = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(attrs.destination());
            result.destAsset = _asset.Asset.fromOperation(attrs.destAsset());
            result.destMin = this._fromXDRAmount(attrs.destMin());
            result.path = [];
            var _path = attrs.path();
            Object.keys(_path).forEach(function (pathKey) {
              result.path.push(_asset.Asset.fromOperation(_path[pathKey]));
            });
            break;
          }
        case 'changeTrust':
          {
            result.type = 'changeTrust';
            switch (attrs.line()["switch"]()) {
              case _xdr["default"].AssetType.assetTypePoolShare():
                result.line = _liquidity_pool_asset.LiquidityPoolAsset.fromOperation(attrs.line());
                break;
              default:
                result.line = _asset.Asset.fromOperation(attrs.line());
                break;
            }
            result.limit = this._fromXDRAmount(attrs.limit());
            break;
          }
        case 'allowTrust':
          {
            result.type = 'allowTrust';
            result.trustor = accountIdtoAddress(attrs.trustor());
            result.assetCode = attrs.asset().value().toString();
            result.assetCode = (0, _util.trimEnd)(result.assetCode, '\0');
            result.authorize = attrs.authorize();
            break;
          }
        case 'setOptions':
          {
            result.type = 'setOptions';
            if (attrs.inflationDest()) {
              result.inflationDest = accountIdtoAddress(attrs.inflationDest());
            }
            result.clearFlags = attrs.clearFlags();
            result.setFlags = attrs.setFlags();
            result.masterWeight = attrs.masterWeight();
            result.lowThreshold = attrs.lowThreshold();
            result.medThreshold = attrs.medThreshold();
            result.highThreshold = attrs.highThreshold();
            result.homeDomain = attrs.homeDomain() !== undefined ? attrs.homeDomain().toString('ascii') : undefined;
            if (attrs.signer()) {
              var signer = {};
              var arm = attrs.signer().key().arm();
              if (arm === 'ed25519') {
                signer.ed25519PublicKey = accountIdtoAddress(attrs.signer().key());
              } else if (arm === 'preAuthTx') {
                signer.preAuthTx = attrs.signer().key().preAuthTx();
              } else if (arm === 'hashX') {
                signer.sha256Hash = attrs.signer().key().hashX();
              } else if (arm === 'ed25519SignedPayload') {
                var signedPayload = attrs.signer().key().ed25519SignedPayload();
                signer.ed25519SignedPayload = _strkey.StrKey.encodeSignedPayload(signedPayload.toXDR());
              }
              signer.weight = attrs.signer().weight();
              result.signer = signer;
            }
            break;
          }
        case 'manageOffer':
        case 'manageSellOffer':
          {
            result.type = 'manageSellOffer';
            result.selling = _asset.Asset.fromOperation(attrs.selling());
            result.buying = _asset.Asset.fromOperation(attrs.buying());
            result.amount = this._fromXDRAmount(attrs.amount());
            result.price = this._fromXDRPrice(attrs.price());
            result.offerId = attrs.offerId().toString();
            break;
          }
        case 'manageBuyOffer':
          {
            result.type = 'manageBuyOffer';
            result.selling = _asset.Asset.fromOperation(attrs.selling());
            result.buying = _asset.Asset.fromOperation(attrs.buying());
            result.buyAmount = this._fromXDRAmount(attrs.buyAmount());
            result.price = this._fromXDRPrice(attrs.price());
            result.offerId = attrs.offerId().toString();
            break;
          }
        case 'createPassiveOffer':
        case 'createPassiveSellOffer':
          {
            result.type = 'createPassiveSellOffer';
            result.selling = _asset.Asset.fromOperation(attrs.selling());
            result.buying = _asset.Asset.fromOperation(attrs.buying());
            result.amount = this._fromXDRAmount(attrs.amount());
            result.price = this._fromXDRPrice(attrs.price());
            break;
          }
        case 'accountMerge':
          {
            result.type = 'accountMerge';
            result.destination = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(attrs);
            break;
          }
        case 'manageData':
          {
            result.type = 'manageData';
            result.name = attrs.dataName().toString('ascii');
            result.value = attrs.dataValue();
            break;
          }
        case 'inflation':
          {
            result.type = 'inflation';
            break;
          }
        case 'bumpSequence':
          {
            result.type = 'bumpSequence';
            result.bumpTo = attrs.bumpTo().toString();
            break;
          }
        case 'createClaimableBalance':
          {
            result.type = 'createClaimableBalance';
            result.asset = _asset.Asset.fromOperation(attrs.asset());
            result.amount = this._fromXDRAmount(attrs.amount());
            result.claimants = [];
            attrs.claimants().forEach(function (claimant) {
              result.claimants.push(_claimant.Claimant.fromXDR(claimant));
            });
            break;
          }
        case 'claimClaimableBalance':
          {
            result.type = 'claimClaimableBalance';
            result.balanceId = attrs.toXDR('hex');
            break;
          }
        case 'beginSponsoringFutureReserves':
          {
            result.type = 'beginSponsoringFutureReserves';
            result.sponsoredId = accountIdtoAddress(attrs.sponsoredId());
            break;
          }
        case 'endSponsoringFutureReserves':
          {
            result.type = 'endSponsoringFutureReserves';
            break;
          }
        case 'revokeSponsorship':
          {
            extractRevokeSponshipDetails(attrs, result);
            break;
          }
        case 'clawback':
          {
            result.type = 'clawback';
            result.amount = this._fromXDRAmount(attrs.amount());
            result.from = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(attrs.from());
            result.asset = _asset.Asset.fromOperation(attrs.asset());
            break;
          }
        case 'clawbackClaimableBalance':
          {
            result.type = 'clawbackClaimableBalance';
            result.balanceId = attrs.toXDR('hex');
            break;
          }
        case 'setTrustLineFlags':
          {
            result.type = 'setTrustLineFlags';
            result.asset = _asset.Asset.fromOperation(attrs.asset());
            result.trustor = accountIdtoAddress(attrs.trustor());
            var clears = attrs.clearFlags();
            var sets = attrs.setFlags();
            var mapping = {
              authorized: _xdr["default"].TrustLineFlags.authorizedFlag(),
              authorizedToMaintainLiabilities: _xdr["default"].TrustLineFlags.authorizedToMaintainLiabilitiesFlag(),
              clawbackEnabled: _xdr["default"].TrustLineFlags.trustlineClawbackEnabledFlag()
            };
            var getFlagValue = function getFlagValue(key) {
              var bit = mapping[key].value;
              if (sets & bit) {
                return true;
              }
              if (clears & bit) {
                return false;
              }
              return undefined;
            };
            result.flags = {};
            Object.keys(mapping).forEach(function (flagName) {
              result.flags[flagName] = getFlagValue(flagName);
            });
            break;
          }
        case 'liquidityPoolDeposit':
          {
            result.type = 'liquidityPoolDeposit';
            result.liquidityPoolId = attrs.liquidityPoolId().toString('hex');
            result.maxAmountA = this._fromXDRAmount(attrs.maxAmountA());
            result.maxAmountB = this._fromXDRAmount(attrs.maxAmountB());
            result.minPrice = this._fromXDRPrice(attrs.minPrice());
            result.maxPrice = this._fromXDRPrice(attrs.maxPrice());
            break;
          }
        case 'liquidityPoolWithdraw':
          {
            result.type = 'liquidityPoolWithdraw';
            result.liquidityPoolId = attrs.liquidityPoolId().toString('hex');
            result.amount = this._fromXDRAmount(attrs.amount());
            result.minAmountA = this._fromXDRAmount(attrs.minAmountA());
            result.minAmountB = this._fromXDRAmount(attrs.minAmountB());
            break;
          }
        case 'invokeHostFunction':
          {
            var _attrs$auth;
            result.type = 'invokeHostFunction';
            result.func = attrs.hostFunction();
            result.auth = (_attrs$auth = attrs.auth()) !== null && _attrs$auth !== void 0 ? _attrs$auth : [];
            break;
          }
        case 'extendFootprintTtl':
          {
            result.type = 'extendFootprintTtl';
            result.extendTo = attrs.extendTo();
            break;
          }
        case 'restoreFootprint':
          {
            result.type = 'restoreFootprint';
            break;
          }
        default:
          {
            throw new Error("Unknown operation: ".concat(operationName));
          }
      }
      return result;
    }
  }, {
    key: "isValidAmount",
    value: function isValidAmount(value) {
      var allowZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (typeof value !== 'string') {
        return false;
      }
      var amount;
      try {
        amount = new _bignumber["default"](value);
      } catch (e) {
        return false;
      }
      if (!allowZero && amount.isZero() || amount.isNegative() || amount.times(ONE).gt(new _bignumber["default"](MAX_INT64).toString()) || amount.decimalPlaces() > 7 || amount.isNaN() || !amount.isFinite()) {
        return false;
      }
      return true;
    }
  }, {
    key: "constructAmountRequirementsError",
    value: function constructAmountRequirementsError(arg) {
      return "".concat(arg, " argument must be of type String, represent a positive number and have at most 7 digits after the decimal");
    }
  }, {
    key: "_checkUnsignedIntValue",
    value: function _checkUnsignedIntValue(name, value) {
      var isValidFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (typeof value === 'undefined') {
        return undefined;
      }
      if (typeof value === 'string') {
        value = parseFloat(value);
      }
      switch (true) {
        case typeof value !== 'number' || !Number.isFinite(value) || value % 1 !== 0:
          throw new Error("".concat(name, " value is invalid"));
        case value < 0:
          throw new Error("".concat(name, " value must be unsigned"));
        case !isValidFunction || isValidFunction && isValidFunction(value, name):
          return value;
        default:
          throw new Error("".concat(name, " value is invalid"));
      }
    }
  }, {
    key: "_toXDRAmount",
    value: function _toXDRAmount(value) {
      var amount = new _bignumber["default"](value).times(ONE);
      return _jsXdr.Hyper.fromString(amount.toString());
    }
  }, {
    key: "_fromXDRAmount",
    value: function _fromXDRAmount(value) {
      return new _bignumber["default"](value).div(ONE).toFixed(7);
    }
  }, {
    key: "_fromXDRPrice",
    value: function _fromXDRPrice(price) {
      var n = new _bignumber["default"](price.n());
      return n.div(new _bignumber["default"](price.d())).toString();
    }
  }, {
    key: "_toXDRPrice",
    value: function _toXDRPrice(price) {
      var xdrObject;
      if (price.n && price.d) {
        xdrObject = new _xdr["default"].Price(price);
      } else {
        var approx = (0, _continued_fraction.best_r)(price);
        xdrObject = new _xdr["default"].Price({
          n: parseInt(approx[0], 10),
          d: parseInt(approx[1], 10)
        });
      }
      if (xdrObject.n() < 0 || xdrObject.d() < 0) {
        throw new Error('price must be positive');
      }
      return xdrObject;
    }
  }]);
  return Operation;
}();
function extractRevokeSponshipDetails(attrs, result) {
  switch (attrs["switch"]().name) {
    case 'revokeSponsorshipLedgerEntry':
      {
        var ledgerKey = attrs.ledgerKey();
        switch (ledgerKey["switch"]().name) {
          case _xdr["default"].LedgerEntryType.account().name:
            {
              result.type = 'revokeAccountSponsorship';
              result.account = accountIdtoAddress(ledgerKey.account().accountId());
              break;
            }
          case _xdr["default"].LedgerEntryType.trustline().name:
            {
              result.type = 'revokeTrustlineSponsorship';
              result.account = accountIdtoAddress(ledgerKey.trustLine().accountId());
              var xdrAsset = ledgerKey.trustLine().asset();
              switch (xdrAsset["switch"]()) {
                case _xdr["default"].AssetType.assetTypePoolShare():
                  result.asset = _liquidity_pool_id.LiquidityPoolId.fromOperation(xdrAsset);
                  break;
                default:
                  result.asset = _asset.Asset.fromOperation(xdrAsset);
                  break;
              }
              break;
            }
          case _xdr["default"].LedgerEntryType.offer().name:
            {
              result.type = 'revokeOfferSponsorship';
              result.seller = accountIdtoAddress(ledgerKey.offer().sellerId());
              result.offerId = ledgerKey.offer().offerId().toString();
              break;
            }
          case _xdr["default"].LedgerEntryType.data().name:
            {
              result.type = 'revokeDataSponsorship';
              result.account = accountIdtoAddress(ledgerKey.data().accountId());
              result.name = ledgerKey.data().dataName().toString('ascii');
              break;
            }
          case _xdr["default"].LedgerEntryType.claimableBalance().name:
            {
              result.type = 'revokeClaimableBalanceSponsorship';
              result.balanceId = ledgerKey.claimableBalance().balanceId().toXDR('hex');
              break;
            }
          case _xdr["default"].LedgerEntryType.liquidityPool().name:
            {
              result.type = 'revokeLiquidityPoolSponsorship';
              result.liquidityPoolId = ledgerKey.liquidityPool().liquidityPoolId().toString('hex');
              break;
            }
          default:
            {
              throw new Error("Unknown ledgerKey: ".concat(attrs["switch"]().name));
            }
        }
        break;
      }
    case 'revokeSponsorshipSigner':
      {
        result.type = 'revokeSignerSponsorship';
        result.account = accountIdtoAddress(attrs.signer().accountId());
        result.signer = convertXDRSignerKeyToObject(attrs.signer().signerKey());
        break;
      }
    default:
      {
        throw new Error("Unknown revokeSponsorship: ".concat(attrs["switch"]().name));
      }
  }
}
function convertXDRSignerKeyToObject(signerKey) {
  var attrs = {};
  switch (signerKey["switch"]().name) {
    case _xdr["default"].SignerKeyType.signerKeyTypeEd25519().name:
      {
        attrs.ed25519PublicKey = _strkey.StrKey.encodeEd25519PublicKey(signerKey.ed25519());
        break;
      }
    case _xdr["default"].SignerKeyType.signerKeyTypePreAuthTx().name:
      {
        attrs.preAuthTx = signerKey.preAuthTx().toString('hex');
        break;
      }
    case _xdr["default"].SignerKeyType.signerKeyTypeHashX().name:
      {
        attrs.sha256Hash = signerKey.hashX().toString('hex');
        break;
      }
    default:
      {
        throw new Error("Unknown signerKey: ".concat(signerKey["switch"]().name));
      }
  }
  return attrs;
}
function accountIdtoAddress(accountId) {
  return _strkey.StrKey.encodeEd25519PublicKey(accountId.ed25519());
}
Operation.accountMerge = ops.accountMerge;
Operation.allowTrust = ops.allowTrust;
Operation.bumpSequence = ops.bumpSequence;
Operation.changeTrust = ops.changeTrust;
Operation.createAccount = ops.createAccount;
Operation.createClaimableBalance = ops.createClaimableBalance;
Operation.claimClaimableBalance = ops.claimClaimableBalance;
Operation.clawbackClaimableBalance = ops.clawbackClaimableBalance;
Operation.createPassiveSellOffer = ops.createPassiveSellOffer;
Operation.inflation = ops.inflation;
Operation.manageData = ops.manageData;
Operation.manageSellOffer = ops.manageSellOffer;
Operation.manageBuyOffer = ops.manageBuyOffer;
Operation.pathPaymentStrictReceive = ops.pathPaymentStrictReceive;
Operation.pathPaymentStrictSend = ops.pathPaymentStrictSend;
Operation.payment = ops.payment;
Operation.setOptions = ops.setOptions;
Operation.beginSponsoringFutureReserves = ops.beginSponsoringFutureReserves;
Operation.endSponsoringFutureReserves = ops.endSponsoringFutureReserves;
Operation.revokeAccountSponsorship = ops.revokeAccountSponsorship;
Operation.revokeTrustlineSponsorship = ops.revokeTrustlineSponsorship;
Operation.revokeOfferSponsorship = ops.revokeOfferSponsorship;
Operation.revokeDataSponsorship = ops.revokeDataSponsorship;
Operation.revokeClaimableBalanceSponsorship = ops.revokeClaimableBalanceSponsorship;
Operation.revokeLiquidityPoolSponsorship = ops.revokeLiquidityPoolSponsorship;
Operation.revokeSignerSponsorship = ops.revokeSignerSponsorship;
Operation.clawback = ops.clawback;
Operation.setTrustLineFlags = ops.setTrustLineFlags;
Operation.liquidityPoolDeposit = ops.liquidityPoolDeposit;
Operation.liquidityPoolWithdraw = ops.liquidityPoolWithdraw;
Operation.invokeHostFunction = ops.invokeHostFunction;
Operation.extendFootprintTtl = ops.extendFootprintTtl;
Operation.restoreFootprint = ops.restoreFootprint;
Operation.createStellarAssetContract = ops.createStellarAssetContract;
Operation.invokeContractFunction = ops.invokeContractFunction;
Operation.createCustomContract = ops.createCustomContract;
Operation.uploadContractWasm = ops.uploadContractWasm;

/***/ }),

/***/ 4113:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.accountMerge = accountMerge;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function accountMerge(opts) {
  var opAttributes = {};
  try {
    opAttributes.body = _xdr["default"].OperationBody.accountMerge((0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(opts.destination));
  } catch (e) {
    throw new Error('destination is invalid');
  }
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 5920:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.allowTrust = allowTrust;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function allowTrust(opts) {
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.trustor)) {
    throw new Error('trustor is invalid');
  }
  var attributes = {};
  attributes.trustor = _keypair.Keypair.fromPublicKey(opts.trustor).xdrAccountId();
  if (opts.assetCode.length <= 4) {
    var code = opts.assetCode.padEnd(4, '\0');
    attributes.asset = _xdr["default"].AssetCode.assetTypeCreditAlphanum4(code);
  } else if (opts.assetCode.length <= 12) {
    var _code = opts.assetCode.padEnd(12, '\0');
    attributes.asset = _xdr["default"].AssetCode.assetTypeCreditAlphanum12(_code);
  } else {
    throw new Error('Asset code must be 12 characters at max.');
  }
  if (typeof opts.authorize === 'boolean') {
    if (opts.authorize) {
      attributes.authorize = _xdr["default"].TrustLineFlags.authorizedFlag().value;
    } else {
      attributes.authorize = 0;
    }
  } else {
    attributes.authorize = opts.authorize;
  }
  var allowTrustOp = new _xdr["default"].AllowTrustOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.allowTrust(allowTrustOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 9191:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.beginSponsoringFutureReserves = beginSponsoringFutureReserves;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _strkey = __webpack_require__(95);
var _keypair = __webpack_require__(4839);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function beginSponsoringFutureReserves() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.sponsoredId)) {
    throw new Error('sponsoredId is invalid');
  }
  var op = new _xdr["default"].BeginSponsoringFutureReservesOp({
    sponsoredId: _keypair.Keypair.fromPublicKey(opts.sponsoredId).xdrAccountId()
  });
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.beginSponsoringFutureReserves(op);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 2398:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.bumpSequence = bumpSequence;
var _jsXdr = __webpack_require__(6263);
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function bumpSequence(opts) {
  var attributes = {};
  if (typeof opts.bumpTo !== 'string') {
    throw new Error('bumpTo must be a string');
  }
  try {
    new _bignumber["default"](opts.bumpTo);
  } catch (e) {
    throw new Error('bumpTo must be a stringified number');
  }
  attributes.bumpTo = _jsXdr.Hyper.fromString(opts.bumpTo);
  var bumpSequenceOp = new _xdr["default"].BumpSequenceOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.bumpSequence(bumpSequenceOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 6389:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.changeTrust = changeTrust;
var _jsXdr = __webpack_require__(6263);
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _asset = __webpack_require__(1247);
var _liquidity_pool_asset = __webpack_require__(5429);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var MAX_INT64 = '9223372036854775807';
function changeTrust(opts) {
  var attributes = {};
  if (opts.asset instanceof _asset.Asset) {
    attributes.line = opts.asset.toChangeTrustXDRObject();
  } else if (opts.asset instanceof _liquidity_pool_asset.LiquidityPoolAsset) {
    attributes.line = opts.asset.toXDRObject();
  } else {
    throw new TypeError('asset must be Asset or LiquidityPoolAsset');
  }
  if (opts.limit !== undefined && !this.isValidAmount(opts.limit, true)) {
    throw new TypeError(this.constructAmountRequirementsError('limit'));
  }
  if (opts.limit) {
    attributes.limit = this._toXDRAmount(opts.limit);
  } else {
    attributes.limit = _jsXdr.Hyper.fromString(new _bignumber["default"](MAX_INT64).toString());
  }
  if (opts.source) {
    attributes.source = opts.source.masterKeypair;
  }
  var changeTrustOP = new _xdr["default"].ChangeTrustOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.changeTrust(changeTrustOP);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 722:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.claimClaimableBalance = claimClaimableBalance;
exports.validateClaimableBalanceId = validateClaimableBalanceId;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function claimClaimableBalance() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  validateClaimableBalanceId(opts.balanceId);
  var attributes = {};
  attributes.balanceId = _xdr["default"].ClaimableBalanceId.fromXDR(opts.balanceId, 'hex');
  var claimClaimableBalanceOp = new _xdr["default"].ClaimClaimableBalanceOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.claimClaimableBalance(claimClaimableBalanceOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function validateClaimableBalanceId(balanceId) {
  if (typeof balanceId !== 'string' || balanceId.length !== 8 + 64) {
    throw new Error('must provide a valid claimable balance id');
  }
}

/***/ }),

/***/ 1312:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clawback = clawback;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function clawback(opts) {
  var attributes = {};
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  attributes.asset = opts.asset.toXDRObject();
  try {
    attributes.from = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(opts.from);
  } catch (e) {
    throw new Error('from address is invalid');
  }
  var opAttributes = {
    body: _xdr["default"].OperationBody.clawback(new _xdr["default"].ClawbackOp(attributes))
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 9181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clawbackClaimableBalance = clawbackClaimableBalance;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _claim_claimable_balance = __webpack_require__(722);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function clawbackClaimableBalance() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _claim_claimable_balance.validateClaimableBalanceId)(opts.balanceId);
  var attributes = {
    balanceId: _xdr["default"].ClaimableBalanceId.fromXDR(opts.balanceId, 'hex')
  };
  var opAttributes = {
    body: _xdr["default"].OperationBody.clawbackClaimableBalance(new _xdr["default"].ClawbackClaimableBalanceOp(attributes))
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 7052:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createAccount = createAccount;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function createAccount(opts) {
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.destination)) {
    throw new Error('destination is invalid');
  }
  if (!this.isValidAmount(opts.startingBalance, true)) {
    throw new TypeError(this.constructAmountRequirementsError('startingBalance'));
  }
  var attributes = {};
  attributes.destination = _keypair.Keypair.fromPublicKey(opts.destination).xdrAccountId();
  attributes.startingBalance = this._toXDRAmount(opts.startingBalance);
  var createAccountOp = new _xdr["default"].CreateAccountOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.createAccount(createAccountOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 3173:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createClaimableBalance = createClaimableBalance;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _asset = __webpack_require__(1247);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function createClaimableBalance(opts) {
  if (!(opts.asset instanceof _asset.Asset)) {
    throw new Error('must provide an asset for create claimable balance operation');
  }
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  if (!Array.isArray(opts.claimants) || opts.claimants.length === 0) {
    throw new Error('must provide at least one claimant');
  }
  var attributes = {};
  attributes.asset = opts.asset.toXDRObject();
  attributes.amount = this._toXDRAmount(opts.amount);
  attributes.claimants = Object.values(opts.claimants).map(function (c) {
    return c.toXDRObject();
  });
  var createClaimableBalanceOp = new _xdr["default"].CreateClaimableBalanceOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.createClaimableBalance(createClaimableBalanceOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 8975:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createPassiveSellOffer = createPassiveSellOffer;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function createPassiveSellOffer(opts) {
  var attributes = {};
  attributes.selling = opts.selling.toXDRObject();
  attributes.buying = opts.buying.toXDRObject();
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  if (opts.price === undefined) {
    throw new TypeError('price argument is required');
  }
  attributes.price = this._toXDRPrice(opts.price);
  var createPassiveSellOfferOp = new _xdr["default"].CreatePassiveSellOfferOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.createPassiveSellOffer(createPassiveSellOfferOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 8103:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.endSponsoringFutureReserves = endSponsoringFutureReserves;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function endSponsoringFutureReserves() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.endSponsoringFutureReserves();
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 3027:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.extendFootprintTtl = extendFootprintTtl;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function extendFootprintTtl(opts) {
  var _opts$extendTo;
  if (((_opts$extendTo = opts.extendTo) !== null && _opts$extendTo !== void 0 ? _opts$extendTo : -1) <= 0) {
    throw new RangeError("extendTo isn't a ledger quantity (uint32)");
  }
  var extendFootprintOp = new _xdr["default"].ExtendFootprintTtlOp({
    ext: new _xdr["default"].ExtensionPoint(0),
    extendTo: opts.extendTo
  });
  var opAttributes = {
    body: _xdr["default"].OperationBody.extendFootprintTtl(extendFootprintOp)
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 8371:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "accountMerge", ({
  enumerable: true,
  get: function get() {
    return _account_merge.accountMerge;
  }
}));
Object.defineProperty(exports, "allowTrust", ({
  enumerable: true,
  get: function get() {
    return _allow_trust.allowTrust;
  }
}));
Object.defineProperty(exports, "beginSponsoringFutureReserves", ({
  enumerable: true,
  get: function get() {
    return _begin_sponsoring_future_reserves.beginSponsoringFutureReserves;
  }
}));
Object.defineProperty(exports, "bumpSequence", ({
  enumerable: true,
  get: function get() {
    return _bump_sequence.bumpSequence;
  }
}));
Object.defineProperty(exports, "changeTrust", ({
  enumerable: true,
  get: function get() {
    return _change_trust.changeTrust;
  }
}));
Object.defineProperty(exports, "claimClaimableBalance", ({
  enumerable: true,
  get: function get() {
    return _claim_claimable_balance.claimClaimableBalance;
  }
}));
Object.defineProperty(exports, "clawback", ({
  enumerable: true,
  get: function get() {
    return _clawback.clawback;
  }
}));
Object.defineProperty(exports, "clawbackClaimableBalance", ({
  enumerable: true,
  get: function get() {
    return _clawback_claimable_balance.clawbackClaimableBalance;
  }
}));
Object.defineProperty(exports, "createAccount", ({
  enumerable: true,
  get: function get() {
    return _create_account.createAccount;
  }
}));
Object.defineProperty(exports, "createClaimableBalance", ({
  enumerable: true,
  get: function get() {
    return _create_claimable_balance.createClaimableBalance;
  }
}));
Object.defineProperty(exports, "createCustomContract", ({
  enumerable: true,
  get: function get() {
    return _invoke_host_function.createCustomContract;
  }
}));
Object.defineProperty(exports, "createPassiveSellOffer", ({
  enumerable: true,
  get: function get() {
    return _create_passive_sell_offer.createPassiveSellOffer;
  }
}));
Object.defineProperty(exports, "createStellarAssetContract", ({
  enumerable: true,
  get: function get() {
    return _invoke_host_function.createStellarAssetContract;
  }
}));
Object.defineProperty(exports, "endSponsoringFutureReserves", ({
  enumerable: true,
  get: function get() {
    return _end_sponsoring_future_reserves.endSponsoringFutureReserves;
  }
}));
Object.defineProperty(exports, "extendFootprintTtl", ({
  enumerable: true,
  get: function get() {
    return _extend_footprint_ttl.extendFootprintTtl;
  }
}));
Object.defineProperty(exports, "inflation", ({
  enumerable: true,
  get: function get() {
    return _inflation.inflation;
  }
}));
Object.defineProperty(exports, "invokeContractFunction", ({
  enumerable: true,
  get: function get() {
    return _invoke_host_function.invokeContractFunction;
  }
}));
Object.defineProperty(exports, "invokeHostFunction", ({
  enumerable: true,
  get: function get() {
    return _invoke_host_function.invokeHostFunction;
  }
}));
Object.defineProperty(exports, "liquidityPoolDeposit", ({
  enumerable: true,
  get: function get() {
    return _liquidity_pool_deposit.liquidityPoolDeposit;
  }
}));
Object.defineProperty(exports, "liquidityPoolWithdraw", ({
  enumerable: true,
  get: function get() {
    return _liquidity_pool_withdraw.liquidityPoolWithdraw;
  }
}));
Object.defineProperty(exports, "manageBuyOffer", ({
  enumerable: true,
  get: function get() {
    return _manage_buy_offer.manageBuyOffer;
  }
}));
Object.defineProperty(exports, "manageData", ({
  enumerable: true,
  get: function get() {
    return _manage_data.manageData;
  }
}));
Object.defineProperty(exports, "manageSellOffer", ({
  enumerable: true,
  get: function get() {
    return _manage_sell_offer.manageSellOffer;
  }
}));
Object.defineProperty(exports, "pathPaymentStrictReceive", ({
  enumerable: true,
  get: function get() {
    return _path_payment_strict_receive.pathPaymentStrictReceive;
  }
}));
Object.defineProperty(exports, "pathPaymentStrictSend", ({
  enumerable: true,
  get: function get() {
    return _path_payment_strict_send.pathPaymentStrictSend;
  }
}));
Object.defineProperty(exports, "payment", ({
  enumerable: true,
  get: function get() {
    return _payment.payment;
  }
}));
Object.defineProperty(exports, "restoreFootprint", ({
  enumerable: true,
  get: function get() {
    return _restore_footprint.restoreFootprint;
  }
}));
Object.defineProperty(exports, "revokeAccountSponsorship", ({
  enumerable: true,
  get: function get() {
    return _revoke_sponsorship.revokeAccountSponsorship;
  }
}));
Object.defineProperty(exports, "revokeClaimableBalanceSponsorship", ({
  enumerable: true,
  get: function get() {
    return _revoke_sponsorship.revokeClaimableBalanceSponsorship;
  }
}));
Object.defineProperty(exports, "revokeDataSponsorship", ({
  enumerable: true,
  get: function get() {
    return _revoke_sponsorship.revokeDataSponsorship;
  }
}));
Object.defineProperty(exports, "revokeLiquidityPoolSponsorship", ({
  enumerable: true,
  get: function get() {
    return _revoke_sponsorship.revokeLiquidityPoolSponsorship;
  }
}));
Object.defineProperty(exports, "revokeOfferSponsorship", ({
  enumerable: true,
  get: function get() {
    return _revoke_sponsorship.revokeOfferSponsorship;
  }
}));
Object.defineProperty(exports, "revokeSignerSponsorship", ({
  enumerable: true,
  get: function get() {
    return _revoke_sponsorship.revokeSignerSponsorship;
  }
}));
Object.defineProperty(exports, "revokeTrustlineSponsorship", ({
  enumerable: true,
  get: function get() {
    return _revoke_sponsorship.revokeTrustlineSponsorship;
  }
}));
Object.defineProperty(exports, "setOptions", ({
  enumerable: true,
  get: function get() {
    return _set_options.setOptions;
  }
}));
Object.defineProperty(exports, "setTrustLineFlags", ({
  enumerable: true,
  get: function get() {
    return _set_trustline_flags.setTrustLineFlags;
  }
}));
Object.defineProperty(exports, "uploadContractWasm", ({
  enumerable: true,
  get: function get() {
    return _invoke_host_function.uploadContractWasm;
  }
}));
var _manage_sell_offer = __webpack_require__(4105);
var _create_passive_sell_offer = __webpack_require__(8975);
var _account_merge = __webpack_require__(4113);
var _allow_trust = __webpack_require__(5920);
var _bump_sequence = __webpack_require__(2398);
var _change_trust = __webpack_require__(6389);
var _create_account = __webpack_require__(7052);
var _create_claimable_balance = __webpack_require__(3173);
var _claim_claimable_balance = __webpack_require__(722);
var _clawback_claimable_balance = __webpack_require__(9181);
var _inflation = __webpack_require__(1283);
var _manage_data = __webpack_require__(9603);
var _manage_buy_offer = __webpack_require__(1328);
var _path_payment_strict_receive = __webpack_require__(4194);
var _path_payment_strict_send = __webpack_require__(7136);
var _payment = __webpack_require__(3995);
var _set_options = __webpack_require__(5212);
var _begin_sponsoring_future_reserves = __webpack_require__(9191);
var _end_sponsoring_future_reserves = __webpack_require__(8103);
var _revoke_sponsorship = __webpack_require__(9793);
var _clawback = __webpack_require__(1312);
var _set_trustline_flags = __webpack_require__(7441);
var _liquidity_pool_deposit = __webpack_require__(209);
var _liquidity_pool_withdraw = __webpack_require__(2299);
var _invoke_host_function = __webpack_require__(6587);
var _extend_footprint_ttl = __webpack_require__(3027);
var _restore_footprint = __webpack_require__(7538);

/***/ }),

/***/ 1283:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.inflation = inflation;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function inflation() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.inflation();
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 6587:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createCustomContract = createCustomContract;
exports.createStellarAssetContract = createStellarAssetContract;
exports.invokeContractFunction = invokeContractFunction;
exports.invokeHostFunction = invokeHostFunction;
exports.uploadContractWasm = uploadContractWasm;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
var _address = __webpack_require__(4138);
var _asset = __webpack_require__(1247);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function invokeHostFunction(opts) {
  if (!opts.func) {
    throw new TypeError("host function invocation ('func') required (got ".concat(JSON.stringify(opts), ")"));
  }
  var invokeHostFunctionOp = new _xdr["default"].InvokeHostFunctionOp({
    hostFunction: opts.func,
    auth: opts.auth || []
  });
  var opAttributes = {
    body: _xdr["default"].OperationBody.invokeHostFunction(invokeHostFunctionOp)
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function invokeContractFunction(opts) {
  var c = new _address.Address(opts.contract);
  if (c._type !== 'contract') {
    throw new TypeError("expected contract strkey instance, got ".concat(c));
  }
  return this.invokeHostFunction({
    source: opts.source,
    auth: opts.auth,
    func: _xdr["default"].HostFunction.hostFunctionTypeInvokeContract(new _xdr["default"].InvokeContractArgs({
      contractAddress: c.toScAddress(),
      functionName: opts["function"],
      args: opts.args
    }))
  });
}
function createCustomContract(opts) {
  var salt = Buffer.from(opts.salt || getSalty());
  if (!opts.wasmHash || opts.wasmHash.length !== 32) {
    throw new TypeError("expected hash(contract WASM) in 'opts.wasmHash', got ".concat(opts.wasmHash));
  }
  if (salt.length !== 32) {
    throw new TypeError("expected 32-byte salt in 'opts.salt', got ".concat(opts.wasmHash));
  }
  return this.invokeHostFunction({
    source: opts.source,
    auth: opts.auth,
    func: _xdr["default"].HostFunction.hostFunctionTypeCreateContract(new _xdr["default"].CreateContractArgs({
      executable: _xdr["default"].ContractExecutable.contractExecutableWasm(Buffer.from(opts.wasmHash)),
      contractIdPreimage: _xdr["default"].ContractIdPreimage.contractIdPreimageFromAddress(new _xdr["default"].ContractIdPreimageFromAddress({
        address: opts.address.toScAddress(),
        salt: salt
      }))
    }))
  });
}
function createStellarAssetContract(opts) {
  var asset = opts.asset;
  if (typeof asset === 'string') {
    var _asset$split = asset.split(':'),
      _asset$split2 = _slicedToArray(_asset$split, 2),
      code = _asset$split2[0],
      issuer = _asset$split2[1];
    asset = new _asset.Asset(code, issuer);
  }
  if (!(asset instanceof _asset.Asset)) {
    throw new TypeError("expected Asset in 'opts.asset', got ".concat(asset));
  }
  return this.invokeHostFunction({
    source: opts.source,
    auth: opts.auth,
    func: _xdr["default"].HostFunction.hostFunctionTypeCreateContract(new _xdr["default"].CreateContractArgs({
      executable: _xdr["default"].ContractExecutable.contractExecutableStellarAsset(),
      contractIdPreimage: _xdr["default"].ContractIdPreimage.contractIdPreimageFromAsset(asset.toXDRObject())
    }))
  });
}
function uploadContractWasm(opts) {
  return this.invokeHostFunction({
    source: opts.source,
    auth: opts.auth,
    func: _xdr["default"].HostFunction.hostFunctionTypeUploadContractWasm(Buffer.from(opts.wasm))
  });
}
function getSalty() {
  return _keypair.Keypair.random().xdrPublicKey().value();
}

/***/ }),

/***/ 209:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.liquidityPoolDeposit = liquidityPoolDeposit;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function liquidityPoolDeposit() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var liquidityPoolId = opts.liquidityPoolId,
    maxAmountA = opts.maxAmountA,
    maxAmountB = opts.maxAmountB,
    minPrice = opts.minPrice,
    maxPrice = opts.maxPrice;
  var attributes = {};
  if (!liquidityPoolId) {
    throw new TypeError('liquidityPoolId argument is required');
  }
  attributes.liquidityPoolId = _xdr["default"].PoolId.fromXDR(liquidityPoolId, 'hex');
  if (!this.isValidAmount(maxAmountA, true)) {
    throw new TypeError(this.constructAmountRequirementsError('maxAmountA'));
  }
  attributes.maxAmountA = this._toXDRAmount(maxAmountA);
  if (!this.isValidAmount(maxAmountB, true)) {
    throw new TypeError(this.constructAmountRequirementsError('maxAmountB'));
  }
  attributes.maxAmountB = this._toXDRAmount(maxAmountB);
  if (minPrice === undefined) {
    throw new TypeError('minPrice argument is required');
  }
  attributes.minPrice = this._toXDRPrice(minPrice);
  if (maxPrice === undefined) {
    throw new TypeError('maxPrice argument is required');
  }
  attributes.maxPrice = this._toXDRPrice(maxPrice);
  var liquidityPoolDepositOp = new _xdr["default"].LiquidityPoolDepositOp(attributes);
  var opAttributes = {
    body: _xdr["default"].OperationBody.liquidityPoolDeposit(liquidityPoolDepositOp)
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 2299:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.liquidityPoolWithdraw = liquidityPoolWithdraw;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function liquidityPoolWithdraw() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var attributes = {};
  if (!opts.liquidityPoolId) {
    throw new TypeError('liquidityPoolId argument is required');
  }
  attributes.liquidityPoolId = _xdr["default"].PoolId.fromXDR(opts.liquidityPoolId, 'hex');
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  if (!this.isValidAmount(opts.minAmountA, true)) {
    throw new TypeError(this.constructAmountRequirementsError('minAmountA'));
  }
  attributes.minAmountA = this._toXDRAmount(opts.minAmountA);
  if (!this.isValidAmount(opts.minAmountB, true)) {
    throw new TypeError(this.constructAmountRequirementsError('minAmountB'));
  }
  attributes.minAmountB = this._toXDRAmount(opts.minAmountB);
  var liquidityPoolWithdrawOp = new _xdr["default"].LiquidityPoolWithdrawOp(attributes);
  var opAttributes = {
    body: _xdr["default"].OperationBody.liquidityPoolWithdraw(liquidityPoolWithdrawOp)
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 1328:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.manageBuyOffer = manageBuyOffer;
var _jsXdr = __webpack_require__(6263);
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function manageBuyOffer(opts) {
  var attributes = {};
  attributes.selling = opts.selling.toXDRObject();
  attributes.buying = opts.buying.toXDRObject();
  if (!this.isValidAmount(opts.buyAmount, true)) {
    throw new TypeError(this.constructAmountRequirementsError('buyAmount'));
  }
  attributes.buyAmount = this._toXDRAmount(opts.buyAmount);
  if (opts.price === undefined) {
    throw new TypeError('price argument is required');
  }
  attributes.price = this._toXDRPrice(opts.price);
  if (opts.offerId !== undefined) {
    opts.offerId = opts.offerId.toString();
  } else {
    opts.offerId = '0';
  }
  attributes.offerId = _jsXdr.Hyper.fromString(opts.offerId);
  var manageBuyOfferOp = new _xdr["default"].ManageBuyOfferOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.manageBuyOffer(manageBuyOfferOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 9603:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.manageData = manageData;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function manageData(opts) {
  var attributes = {};
  if (!(typeof opts.name === 'string' && opts.name.length <= 64)) {
    throw new Error('name must be a string, up to 64 characters');
  }
  attributes.dataName = opts.name;
  if (typeof opts.value !== 'string' && !Buffer.isBuffer(opts.value) && opts.value !== null) {
    throw new Error('value must be a string, Buffer or null');
  }
  if (typeof opts.value === 'string') {
    attributes.dataValue = Buffer.from(opts.value);
  } else {
    attributes.dataValue = opts.value;
  }
  if (attributes.dataValue !== null && attributes.dataValue.length > 64) {
    throw new Error('value cannot be longer that 64 bytes');
  }
  var manageDataOp = new _xdr["default"].ManageDataOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.manageData(manageDataOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 4105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.manageSellOffer = manageSellOffer;
var _jsXdr = __webpack_require__(6263);
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function manageSellOffer(opts) {
  var attributes = {};
  attributes.selling = opts.selling.toXDRObject();
  attributes.buying = opts.buying.toXDRObject();
  if (!this.isValidAmount(opts.amount, true)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  if (opts.price === undefined) {
    throw new TypeError('price argument is required');
  }
  attributes.price = this._toXDRPrice(opts.price);
  if (opts.offerId !== undefined) {
    opts.offerId = opts.offerId.toString();
  } else {
    opts.offerId = '0';
  }
  attributes.offerId = _jsXdr.Hyper.fromString(opts.offerId);
  var manageSellOfferOp = new _xdr["default"].ManageSellOfferOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.manageSellOffer(manageSellOfferOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 4194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pathPaymentStrictReceive = pathPaymentStrictReceive;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function pathPaymentStrictReceive(opts) {
  switch (true) {
    case !opts.sendAsset:
      throw new Error('Must specify a send asset');
    case !this.isValidAmount(opts.sendMax):
      throw new TypeError(this.constructAmountRequirementsError('sendMax'));
    case !opts.destAsset:
      throw new Error('Must provide a destAsset for a payment operation');
    case !this.isValidAmount(opts.destAmount):
      throw new TypeError(this.constructAmountRequirementsError('destAmount'));
    default:
      break;
  }
  var attributes = {};
  attributes.sendAsset = opts.sendAsset.toXDRObject();
  attributes.sendMax = this._toXDRAmount(opts.sendMax);
  try {
    attributes.destination = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(opts.destination);
  } catch (e) {
    throw new Error('destination is invalid');
  }
  attributes.destAsset = opts.destAsset.toXDRObject();
  attributes.destAmount = this._toXDRAmount(opts.destAmount);
  var path = opts.path ? opts.path : [];
  attributes.path = path.map(function (x) {
    return x.toXDRObject();
  });
  var payment = new _xdr["default"].PathPaymentStrictReceiveOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.pathPaymentStrictReceive(payment);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 7136:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.pathPaymentStrictSend = pathPaymentStrictSend;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function pathPaymentStrictSend(opts) {
  switch (true) {
    case !opts.sendAsset:
      throw new Error('Must specify a send asset');
    case !this.isValidAmount(opts.sendAmount):
      throw new TypeError(this.constructAmountRequirementsError('sendAmount'));
    case !opts.destAsset:
      throw new Error('Must provide a destAsset for a payment operation');
    case !this.isValidAmount(opts.destMin):
      throw new TypeError(this.constructAmountRequirementsError('destMin'));
    default:
      break;
  }
  var attributes = {};
  attributes.sendAsset = opts.sendAsset.toXDRObject();
  attributes.sendAmount = this._toXDRAmount(opts.sendAmount);
  try {
    attributes.destination = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(opts.destination);
  } catch (e) {
    throw new Error('destination is invalid');
  }
  attributes.destAsset = opts.destAsset.toXDRObject();
  attributes.destMin = this._toXDRAmount(opts.destMin);
  var path = opts.path ? opts.path : [];
  attributes.path = path.map(function (x) {
    return x.toXDRObject();
  });
  var payment = new _xdr["default"].PathPaymentStrictSendOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.pathPaymentStrictSend(payment);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 3995:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.payment = payment;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function payment(opts) {
  if (!opts.asset) {
    throw new Error('Must provide an asset for a payment operation');
  }
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  var attributes = {};
  try {
    attributes.destination = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(opts.destination);
  } catch (e) {
    throw new Error('destination is invalid');
  }
  attributes.asset = opts.asset.toXDRObject();
  attributes.amount = this._toXDRAmount(opts.amount);
  var paymentOp = new _xdr["default"].PaymentOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.payment(paymentOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 7538:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.restoreFootprint = restoreFootprint;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function restoreFootprint() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var op = new _xdr["default"].RestoreFootprintOp({
    ext: new _xdr["default"].ExtensionPoint(0)
  });
  var opAttributes = {
    body: _xdr["default"].OperationBody.restoreFootprint(op)
  };
  this.setSourceAccount(opAttributes, opts !== null && opts !== void 0 ? opts : {});
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 9793:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.revokeAccountSponsorship = revokeAccountSponsorship;
exports.revokeClaimableBalanceSponsorship = revokeClaimableBalanceSponsorship;
exports.revokeDataSponsorship = revokeDataSponsorship;
exports.revokeLiquidityPoolSponsorship = revokeLiquidityPoolSponsorship;
exports.revokeOfferSponsorship = revokeOfferSponsorship;
exports.revokeSignerSponsorship = revokeSignerSponsorship;
exports.revokeTrustlineSponsorship = revokeTrustlineSponsorship;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _strkey = __webpack_require__(95);
var _keypair = __webpack_require__(4839);
var _asset = __webpack_require__(1247);
var _liquidity_pool_id = __webpack_require__(45);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function revokeAccountSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  var ledgerKey = _xdr["default"].LedgerKey.account(new _xdr["default"].LedgerKeyAccount({
    accountId: _keypair.Keypair.fromPublicKey(opts.account).xdrAccountId()
  }));
  var op = _xdr["default"].RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function revokeTrustlineSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  var asset;
  if (opts.asset instanceof _asset.Asset) {
    asset = opts.asset.toTrustLineXDRObject();
  } else if (opts.asset instanceof _liquidity_pool_id.LiquidityPoolId) {
    asset = opts.asset.toXDRObject();
  } else {
    throw new TypeError('asset must be an Asset or LiquidityPoolId');
  }
  var ledgerKey = _xdr["default"].LedgerKey.trustline(new _xdr["default"].LedgerKeyTrustLine({
    accountId: _keypair.Keypair.fromPublicKey(opts.account).xdrAccountId(),
    asset: asset
  }));
  var op = _xdr["default"].RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function revokeOfferSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.seller)) {
    throw new Error('seller is invalid');
  }
  if (typeof opts.offerId !== 'string') {
    throw new Error('offerId is invalid');
  }
  var ledgerKey = _xdr["default"].LedgerKey.offer(new _xdr["default"].LedgerKeyOffer({
    sellerId: _keypair.Keypair.fromPublicKey(opts.seller).xdrAccountId(),
    offerId: _xdr["default"].Int64.fromString(opts.offerId)
  }));
  var op = _xdr["default"].RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function revokeDataSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  if (typeof opts.name !== 'string' || opts.name.length > 64) {
    throw new Error('name must be a string, up to 64 characters');
  }
  var ledgerKey = _xdr["default"].LedgerKey.data(new _xdr["default"].LedgerKeyData({
    accountId: _keypair.Keypair.fromPublicKey(opts.account).xdrAccountId(),
    dataName: opts.name
  }));
  var op = _xdr["default"].RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function revokeClaimableBalanceSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof opts.balanceId !== 'string') {
    throw new Error('balanceId is invalid');
  }
  var ledgerKey = _xdr["default"].LedgerKey.claimableBalance(new _xdr["default"].LedgerKeyClaimableBalance({
    balanceId: _xdr["default"].ClaimableBalanceId.fromXDR(opts.balanceId, 'hex')
  }));
  var op = _xdr["default"].RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function revokeLiquidityPoolSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof opts.liquidityPoolId !== 'string') {
    throw new Error('liquidityPoolId is invalid');
  }
  var ledgerKey = _xdr["default"].LedgerKey.liquidityPool(new _xdr["default"].LedgerKeyLiquidityPool({
    liquidityPoolId: _xdr["default"].PoolId.fromXDR(opts.liquidityPoolId, 'hex')
  }));
  var op = _xdr["default"].RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {
    body: _xdr["default"].OperationBody.revokeSponsorship(op)
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}
function revokeSignerSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!_strkey.StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  var key;
  if (opts.signer.ed25519PublicKey) {
    if (!_strkey.StrKey.isValidEd25519PublicKey(opts.signer.ed25519PublicKey)) {
      throw new Error('signer.ed25519PublicKey is invalid.');
    }
    var rawKey = _strkey.StrKey.decodeEd25519PublicKey(opts.signer.ed25519PublicKey);
    key = new _xdr["default"].SignerKey.signerKeyTypeEd25519(rawKey);
  } else if (opts.signer.preAuthTx) {
    var buffer;
    if (typeof opts.signer.preAuthTx === 'string') {
      buffer = Buffer.from(opts.signer.preAuthTx, 'hex');
    } else {
      buffer = opts.signer.preAuthTx;
    }
    if (!(Buffer.isBuffer(buffer) && buffer.length === 32)) {
      throw new Error('signer.preAuthTx must be 32 bytes Buffer.');
    }
    key = new _xdr["default"].SignerKey.signerKeyTypePreAuthTx(buffer);
  } else if (opts.signer.sha256Hash) {
    var _buffer;
    if (typeof opts.signer.sha256Hash === 'string') {
      _buffer = Buffer.from(opts.signer.sha256Hash, 'hex');
    } else {
      _buffer = opts.signer.sha256Hash;
    }
    if (!(Buffer.isBuffer(_buffer) && _buffer.length === 32)) {
      throw new Error('signer.sha256Hash must be 32 bytes Buffer.');
    }
    key = new _xdr["default"].SignerKey.signerKeyTypeHashX(_buffer);
  } else {
    throw new Error('signer is invalid');
  }
  var signer = new _xdr["default"].RevokeSponsorshipOpSigner({
    accountId: _keypair.Keypair.fromPublicKey(opts.account).xdrAccountId(),
    signerKey: key
  });
  var op = _xdr["default"].RevokeSponsorshipOp.revokeSponsorshipSigner(signer);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 5212:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setOptions = setOptions;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function weightCheckFunction(value, name) {
  if (value >= 0 && value <= 255) {
    return true;
  }
  throw new Error("".concat(name, " value must be between 0 and 255"));
}
function setOptions(opts) {
  var attributes = {};
  if (opts.inflationDest) {
    if (!_strkey.StrKey.isValidEd25519PublicKey(opts.inflationDest)) {
      throw new Error('inflationDest is invalid');
    }
    attributes.inflationDest = _keypair.Keypair.fromPublicKey(opts.inflationDest).xdrAccountId();
  }
  attributes.clearFlags = this._checkUnsignedIntValue('clearFlags', opts.clearFlags);
  attributes.setFlags = this._checkUnsignedIntValue('setFlags', opts.setFlags);
  attributes.masterWeight = this._checkUnsignedIntValue('masterWeight', opts.masterWeight, weightCheckFunction);
  attributes.lowThreshold = this._checkUnsignedIntValue('lowThreshold', opts.lowThreshold, weightCheckFunction);
  attributes.medThreshold = this._checkUnsignedIntValue('medThreshold', opts.medThreshold, weightCheckFunction);
  attributes.highThreshold = this._checkUnsignedIntValue('highThreshold', opts.highThreshold, weightCheckFunction);
  if (opts.homeDomain !== undefined && typeof opts.homeDomain !== 'string') {
    throw new TypeError('homeDomain argument must be of type String');
  }
  attributes.homeDomain = opts.homeDomain;
  if (opts.signer) {
    var weight = this._checkUnsignedIntValue('signer.weight', opts.signer.weight, weightCheckFunction);
    var key;
    var setValues = 0;
    if (opts.signer.ed25519PublicKey) {
      if (!_strkey.StrKey.isValidEd25519PublicKey(opts.signer.ed25519PublicKey)) {
        throw new Error('signer.ed25519PublicKey is invalid.');
      }
      var rawKey = _strkey.StrKey.decodeEd25519PublicKey(opts.signer.ed25519PublicKey);
      key = new _xdr["default"].SignerKey.signerKeyTypeEd25519(rawKey);
      setValues += 1;
    }
    if (opts.signer.preAuthTx) {
      if (typeof opts.signer.preAuthTx === 'string') {
        opts.signer.preAuthTx = Buffer.from(opts.signer.preAuthTx, 'hex');
      }
      if (!(Buffer.isBuffer(opts.signer.preAuthTx) && opts.signer.preAuthTx.length === 32)) {
        throw new Error('signer.preAuthTx must be 32 bytes Buffer.');
      }
      key = new _xdr["default"].SignerKey.signerKeyTypePreAuthTx(opts.signer.preAuthTx);
      setValues += 1;
    }
    if (opts.signer.sha256Hash) {
      if (typeof opts.signer.sha256Hash === 'string') {
        opts.signer.sha256Hash = Buffer.from(opts.signer.sha256Hash, 'hex');
      }
      if (!(Buffer.isBuffer(opts.signer.sha256Hash) && opts.signer.sha256Hash.length === 32)) {
        throw new Error('signer.sha256Hash must be 32 bytes Buffer.');
      }
      key = new _xdr["default"].SignerKey.signerKeyTypeHashX(opts.signer.sha256Hash);
      setValues += 1;
    }
    if (opts.signer.ed25519SignedPayload) {
      if (!_strkey.StrKey.isValidSignedPayload(opts.signer.ed25519SignedPayload)) {
        throw new Error('signer.ed25519SignedPayload is invalid.');
      }
      var _rawKey = _strkey.StrKey.decodeSignedPayload(opts.signer.ed25519SignedPayload);
      var signedPayloadXdr = _xdr["default"].SignerKeyEd25519SignedPayload.fromXDR(_rawKey);
      key = _xdr["default"].SignerKey.signerKeyTypeEd25519SignedPayload(signedPayloadXdr);
      setValues += 1;
    }
    if (setValues !== 1) {
      throw new Error('Signer object must contain exactly one of signer.ed25519PublicKey, signer.sha256Hash, signer.preAuthTx.');
    }
    attributes.signer = new _xdr["default"].Signer({
      key: key,
      weight: weight
    });
  }
  var setOptionsOp = new _xdr["default"].SetOptionsOp(attributes);
  var opAttributes = {};
  opAttributes.body = _xdr["default"].OperationBody.setOptions(setOptionsOp);
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 7441:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.setTrustLineFlags = setTrustLineFlags;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _keypair = __webpack_require__(4839);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function setTrustLineFlags() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var attributes = {};
  if (_typeof(opts.flags) !== 'object' || Object.keys(opts.flags).length === 0) {
    throw new Error('opts.flags must be a map of boolean flags to modify');
  }
  var mapping = {
    authorized: _xdr["default"].TrustLineFlags.authorizedFlag(),
    authorizedToMaintainLiabilities: _xdr["default"].TrustLineFlags.authorizedToMaintainLiabilitiesFlag(),
    clawbackEnabled: _xdr["default"].TrustLineFlags.trustlineClawbackEnabledFlag()
  };
  var clearFlag = 0;
  var setFlag = 0;
  Object.keys(opts.flags).forEach(function (flagName) {
    if (!Object.prototype.hasOwnProperty.call(mapping, flagName)) {
      throw new Error("unsupported flag name specified: ".concat(flagName));
    }
    var flagValue = opts.flags[flagName];
    var bit = mapping[flagName].value;
    if (flagValue === true) {
      setFlag |= bit;
    } else if (flagValue === false) {
      clearFlag |= bit;
    }
  });
  attributes.trustor = _keypair.Keypair.fromPublicKey(opts.trustor).xdrAccountId();
  attributes.asset = opts.asset.toXDRObject();
  attributes.clearFlags = clearFlag;
  attributes.setFlags = setFlag;
  var opAttributes = {
    body: _xdr["default"].OperationBody.setTrustLineFlags(new _xdr["default"].SetTrustLineFlagsOp(attributes))
  };
  this.setSourceAccount(opAttributes, opts);
  return new _xdr["default"].Operation(opAttributes);
}

/***/ }),

/***/ 3404:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.nativeToScVal = nativeToScVal;
exports.scValToNative = scValToNative;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _address = __webpack_require__(4138);
var _contract = __webpack_require__(1958);
var _index = __webpack_require__(1122);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function nativeToScVal(val) {
  var _val$constructor$name, _val$constructor;
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  switch (_typeof(val)) {
    case 'object':
      if (val === null) {
        return _xdr["default"].ScVal.scvVoid();
      }
      if (val instanceof _xdr["default"].ScVal) {
        return val;
      }
      if (val instanceof _address.Address) {
        return val.toScVal();
      }
      if (val instanceof _contract.Contract) {
        return val.address().toScVal();
      }
      if (val instanceof Uint8Array || Buffer.isBuffer(val)) {
        var _opts$type;
        var copy = Uint8Array.from(val);
        switch ((_opts$type = opts === null || opts === void 0 ? void 0 : opts.type) !== null && _opts$type !== void 0 ? _opts$type : 'bytes') {
          case 'bytes':
            return _xdr["default"].ScVal.scvBytes(copy);
          case 'symbol':
            return _xdr["default"].ScVal.scvSymbol(copy);
          case 'string':
            return _xdr["default"].ScVal.scvString(copy);
          default:
            throw new TypeError("invalid type (".concat(opts.type, ") specified for bytes-like value"));
        }
      }
      if (Array.isArray(val)) {
        if (val.length > 0 && val.some(function (v) {
          return _typeof(v) !== _typeof(val[0]);
        })) {
          throw new TypeError("array values (".concat(val, ") must have the same type (types: ").concat(val.map(function (v) {
            return _typeof(v);
          }).join(','), ")"));
        }
        return _xdr["default"].ScVal.scvVec(val.map(function (v) {
          return nativeToScVal(v, opts);
        }));
      }
      if (((_val$constructor$name = (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) !== null && _val$constructor$name !== void 0 ? _val$constructor$name : '') !== 'Object') {
        var _val$constructor2;
        throw new TypeError("cannot interpret ".concat((_val$constructor2 = val.constructor) === null || _val$constructor2 === void 0 ? void 0 : _val$constructor2.name, " value as ScVal (").concat(JSON.stringify(val), ")"));
      }
      return _xdr["default"].ScVal.scvMap(Object.entries(val).map(function (_ref) {
        var _k, _opts$type2;
        var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];
        var _ref3 = (_k = ((_opts$type2 = opts === null || opts === void 0 ? void 0 : opts.type) !== null && _opts$type2 !== void 0 ? _opts$type2 : {})[k]) !== null && _k !== void 0 ? _k : [null, null],
          _ref4 = _slicedToArray(_ref3, 2),
          keyType = _ref4[0],
          valType = _ref4[1];
        var keyOpts = keyType ? {
          type: keyType
        } : {};
        var valOpts = valType ? {
          type: valType
        } : {};
        return new _xdr["default"].ScMapEntry({
          key: nativeToScVal(k, keyOpts),
          val: nativeToScVal(v, valOpts)
        });
      }));
    case 'number':
    case 'bigint':
      switch (opts === null || opts === void 0 ? void 0 : opts.type) {
        case 'u32':
          return _xdr["default"].ScVal.scvU32(val);
        case 'i32':
          return _xdr["default"].ScVal.scvI32(val);
        default:
          break;
      }
      return new _index.ScInt(val, {
        type: opts === null || opts === void 0 ? void 0 : opts.type
      }).toScVal();
    case 'string':
      {
        var _opts$type3;
        var optType = (_opts$type3 = opts === null || opts === void 0 ? void 0 : opts.type) !== null && _opts$type3 !== void 0 ? _opts$type3 : 'string';
        switch (optType) {
          case 'string':
            return _xdr["default"].ScVal.scvString(val);
          case 'symbol':
            return _xdr["default"].ScVal.scvSymbol(val);
          case 'address':
            return new _address.Address(val).toScVal();
          default:
            if (_index.XdrLargeInt.isType(optType)) {
              return new _index.XdrLargeInt(optType, val).toScVal();
            }
            throw new TypeError("invalid type (".concat(opts.type, ") specified for string value"));
        }
      }
    case 'boolean':
      return _xdr["default"].ScVal.scvBool(val);
    case 'undefined':
      return _xdr["default"].ScVal.scvVoid();
    case 'function':
      return nativeToScVal(val());
    default:
      throw new TypeError("failed to convert typeof ".concat(_typeof(val), " (").concat(val, ")"));
  }
}
function scValToNative(scv) {
  var _scv$vec, _scv$map;
  switch (scv["switch"]().value) {
    case _xdr["default"].ScValType.scvVoid().value:
      return null;
    case _xdr["default"].ScValType.scvU64().value:
    case _xdr["default"].ScValType.scvI64().value:
      return scv.value().toBigInt();
    case _xdr["default"].ScValType.scvU128().value:
    case _xdr["default"].ScValType.scvI128().value:
    case _xdr["default"].ScValType.scvU256().value:
    case _xdr["default"].ScValType.scvI256().value:
      return (0, _index.scValToBigInt)(scv);
    case _xdr["default"].ScValType.scvVec().value:
      return ((_scv$vec = scv.vec()) !== null && _scv$vec !== void 0 ? _scv$vec : []).map(scValToNative);
    case _xdr["default"].ScValType.scvAddress().value:
      return _address.Address.fromScVal(scv).toString();
    case _xdr["default"].ScValType.scvMap().value:
      return Object.fromEntries(((_scv$map = scv.map()) !== null && _scv$map !== void 0 ? _scv$map : []).map(function (entry) {
        return [scValToNative(entry.key()), scValToNative(entry.val())];
      }));
    case _xdr["default"].ScValType.scvBool().value:
    case _xdr["default"].ScValType.scvU32().value:
    case _xdr["default"].ScValType.scvI32().value:
    case _xdr["default"].ScValType.scvBytes().value:
      return scv.value();
    case _xdr["default"].ScValType.scvSymbol().value:
    case _xdr["default"].ScValType.scvString().value:
      {
        var v = scv.value();
        if (Buffer.isBuffer(v) || ArrayBuffer.isView(v)) {
          try {
            return new TextDecoder().decode(v);
          } catch (e) {
            return new Uint8Array(v.buffer);
          }
        }
        return v;
      }
    case _xdr["default"].ScValType.scvTimepoint().value:
    case _xdr["default"].ScValType.scvDuration().value:
      return new _xdr["default"].Uint64(scv.value()).toBigInt();
    case _xdr["default"].ScValType.scvStatus().value:
      switch (scv.value()["switch"]()) {
        case _xdr["default"].ScStatusType.sstOk().value:
        case _xdr["default"].ScStatusType.sstUnknownError().value:
        case _xdr["default"].ScStatusType.sstHostValueError().value:
        case _xdr["default"].ScStatusType.sstHostObjectError().value:
        case _xdr["default"].ScStatusType.sstHostFunctionError().value:
        case _xdr["default"].ScStatusType.sstHostStorageError().value:
        case _xdr["default"].ScStatusType.sstHostContextError().value:
        case _xdr["default"].ScStatusType.sstVmError().value:
        case _xdr["default"].ScStatusType.sstContractError().value:
        case _xdr["default"].ScStatusType.sstHostAuthError().value:
        default:
          break;
      }
    default:
      return scv.value();
  }
}

/***/ }),

/***/ 3098:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SignerKey = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var SignerKey = exports.SignerKey = function () {
  function SignerKey() {
    _classCallCheck(this, SignerKey);
  }
  _createClass(SignerKey, null, [{
    key: "decodeAddress",
    value: function decodeAddress(address) {
      var signerKeyMap = {
        ed25519PublicKey: _xdr["default"].SignerKey.signerKeyTypeEd25519,
        preAuthTx: _xdr["default"].SignerKey.signerKeyTypePreAuthTx,
        sha256Hash: _xdr["default"].SignerKey.signerKeyTypeHashX,
        signedPayload: _xdr["default"].SignerKey.signerKeyTypeEd25519SignedPayload
      };
      var vb = _strkey.StrKey.getVersionByteForPrefix(address);
      var encoder = signerKeyMap[vb];
      if (!encoder) {
        throw new Error("invalid signer key type (".concat(vb, ")"));
      }
      var raw = (0, _strkey.decodeCheck)(vb, address);
      switch (vb) {
        case 'signedPayload':
          return encoder(new _xdr["default"].SignerKeyEd25519SignedPayload({
            ed25519: raw.slice(0, 32),
            payload: raw.slice(32 + 4)
          }));
        case 'ed25519PublicKey':
        case 'preAuthTx':
        case 'sha256Hash':
        default:
          return encoder(raw);
      }
    }
  }, {
    key: "encodeSignerKey",
    value: function encodeSignerKey(signerKey) {
      var strkeyType;
      var raw;
      switch (signerKey["switch"]()) {
        case _xdr["default"].SignerKeyType.signerKeyTypeEd25519():
          strkeyType = 'ed25519PublicKey';
          raw = signerKey.value();
          break;
        case _xdr["default"].SignerKeyType.signerKeyTypePreAuthTx():
          strkeyType = 'preAuthTx';
          raw = signerKey.value();
          break;
        case _xdr["default"].SignerKeyType.signerKeyTypeHashX():
          strkeyType = 'sha256Hash';
          raw = signerKey.value();
          break;
        case _xdr["default"].SignerKeyType.signerKeyTypeEd25519SignedPayload():
          strkeyType = 'signedPayload';
          raw = signerKey.ed25519SignedPayload().toXDR('raw');
          break;
        default:
          throw new Error("invalid SignerKey (type: ".concat(signerKey["switch"](), ")"));
      }
      return (0, _strkey.encodeCheck)(strkeyType, raw);
    }
  }]);
  return SignerKey;
}();

/***/ }),

/***/ 7454:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FastSigning = void 0;
exports.generate = generate;
exports.sign = sign;
exports.verify = verify;
var actualMethods = {};
var FastSigning = exports.FastSigning = checkFastSigning();
function sign(data, secretKey) {
  return actualMethods.sign(data, secretKey);
}
function verify(data, signature, publicKey) {
  return actualMethods.verify(data, signature, publicKey);
}
function generate(secretKey) {
  return actualMethods.generate(secretKey);
}
function checkFastSigning() {
  return typeof window === 'undefined' ? checkFastSigningNode() : checkFastSigningBrowser();
}
function checkFastSigningNode() {
  var sodium;
  try {
    sodium = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sodium-native'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  } catch (err) {
    return checkFastSigningBrowser();
  }
  if (!Object.keys(sodium).length) {
    return checkFastSigningBrowser();
  }
  actualMethods.generate = function (secretKey) {
    var pk = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
    var sk = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);
    sodium.crypto_sign_seed_keypair(pk, sk, secretKey);
    return pk;
  };
  actualMethods.sign = function (data, secretKey) {
    data = Buffer.from(data);
    var signature = Buffer.alloc(sodium.crypto_sign_BYTES);
    sodium.crypto_sign_detached(signature, data, secretKey);
    return signature;
  };
  actualMethods.verify = function (data, signature, publicKey) {
    data = Buffer.from(data);
    try {
      return sodium.crypto_sign_verify_detached(signature, data, publicKey);
    } catch (e) {
      return false;
    }
  };
  return true;
}
function checkFastSigningBrowser() {
  var nacl = __webpack_require__(9419);
  actualMethods.generate = function (secretKey) {
    var secretKeyUint8 = new Uint8Array(secretKey);
    var naclKeys = nacl.sign.keyPair.fromSeed(secretKeyUint8);
    return Buffer.from(naclKeys.publicKey);
  };
  actualMethods.sign = function (data, secretKey) {
    data = Buffer.from(data);
    data = new Uint8Array(data.toJSON().data);
    secretKey = new Uint8Array(secretKey.toJSON().data);
    var signature = nacl.sign.detached(data, secretKey);
    return Buffer.from(signature);
  };
  actualMethods.verify = function (data, signature, publicKey) {
    data = Buffer.from(data);
    data = new Uint8Array(data.toJSON().data);
    signature = new Uint8Array(signature.toJSON().data);
    publicKey = new Uint8Array(publicKey.toJSON().data);
    return nacl.sign.detached.verify(data, signature, publicKey);
  };
  return false;
}

/***/ }),

/***/ 5983:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Soroban = void 0;
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var Soroban = exports.Soroban = function () {
  function Soroban() {
    _classCallCheck(this, Soroban);
  }
  _createClass(Soroban, null, [{
    key: "formatTokenAmount",
    value: function formatTokenAmount(amount, decimals) {
      if (amount.includes('.')) {
        throw new TypeError('No decimals are allowed');
      }
      var formatted = amount;
      if (decimals > 0) {
        if (decimals > formatted.length) {
          formatted = ['0', formatted.toString().padStart(decimals, '0')].join('.');
        } else {
          formatted = [formatted.slice(0, -decimals), formatted.slice(-decimals)].join('.');
        }
      }
      return formatted.replace(/(\.\d*?)0+$/, '$1');
    }
  }, {
    key: "parseTokenAmount",
    value: function parseTokenAmount(value, decimals) {
      var _fraction$padEnd;
      var _value$split$slice = value.split('.').slice(),
        _value$split$slice2 = _toArray(_value$split$slice),
        whole = _value$split$slice2[0],
        fraction = _value$split$slice2[1],
        rest = _value$split$slice2.slice(2);
      if (rest.length) {
        throw new Error("Invalid decimal value: ".concat(value));
      }
      var shifted = BigInt(whole + ((_fraction$padEnd = fraction === null || fraction === void 0 ? void 0 : fraction.padEnd(decimals, '0')) !== null && _fraction$padEnd !== void 0 ? _fraction$padEnd : '0'.repeat(decimals)));
      return shifted.toString();
    }
  }]);
  return Soroban;
}();

/***/ }),

/***/ 8214:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SorobanDataBuilder = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var SorobanDataBuilder = exports.SorobanDataBuilder = function () {
  function SorobanDataBuilder(sorobanData) {
    _classCallCheck(this, SorobanDataBuilder);
    _defineProperty(this, "_data", void 0);
    var data;
    if (!sorobanData) {
      data = new _xdr["default"].SorobanTransactionData({
        resources: new _xdr["default"].SorobanResources({
          footprint: new _xdr["default"].LedgerFootprint({
            readOnly: [],
            readWrite: []
          }),
          instructions: 0,
          readBytes: 0,
          writeBytes: 0
        }),
        ext: new _xdr["default"].ExtensionPoint(0),
        resourceFee: new _xdr["default"].Int64(0)
      });
    } else if (typeof sorobanData === 'string' || ArrayBuffer.isView(sorobanData)) {
      data = SorobanDataBuilder.fromXDR(sorobanData);
    } else {
      data = SorobanDataBuilder.fromXDR(sorobanData.toXDR());
    }
    this._data = data;
  }
  _createClass(SorobanDataBuilder, [{
    key: "setResourceFee",
    value: function setResourceFee(fee) {
      this._data.resourceFee(new _xdr["default"].Int64(fee));
      return this;
    }
  }, {
    key: "setResources",
    value: function setResources(cpuInstrs, readBytes, writeBytes) {
      this._data.resources().instructions(cpuInstrs);
      this._data.resources().readBytes(readBytes);
      this._data.resources().writeBytes(writeBytes);
      return this;
    }
  }, {
    key: "appendFootprint",
    value: function appendFootprint(readOnly, readWrite) {
      return this.setFootprint(this.getReadOnly().concat(readOnly), this.getReadWrite().concat(readWrite));
    }
  }, {
    key: "setFootprint",
    value: function setFootprint(readOnly, readWrite) {
      if (readOnly !== null) {
        this.setReadOnly(readOnly);
      }
      if (readWrite !== null) {
        this.setReadWrite(readWrite);
      }
      return this;
    }
  }, {
    key: "setReadOnly",
    value: function setReadOnly(readOnly) {
      this._data.resources().footprint().readOnly(readOnly !== null && readOnly !== void 0 ? readOnly : []);
      return this;
    }
  }, {
    key: "setReadWrite",
    value: function setReadWrite(readWrite) {
      this._data.resources().footprint().readWrite(readWrite !== null && readWrite !== void 0 ? readWrite : []);
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return _xdr["default"].SorobanTransactionData.fromXDR(this._data.toXDR());
    }
  }, {
    key: "getReadOnly",
    value: function getReadOnly() {
      return this.getFootprint().readOnly();
    }
  }, {
    key: "getReadWrite",
    value: function getReadWrite() {
      return this.getFootprint().readWrite();
    }
  }, {
    key: "getFootprint",
    value: function getFootprint() {
      return this._data.resources().footprint();
    }
  }], [{
    key: "fromXDR",
    value: function fromXDR(data) {
      return _xdr["default"].SorobanTransactionData.fromXDR(data, typeof data === 'string' ? 'base64' : 'raw');
    }
  }]);
  return SorobanDataBuilder;
}();

/***/ }),

/***/ 95:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.StrKey = void 0;
exports.decodeCheck = decodeCheck;
exports.encodeCheck = encodeCheck;
var _base = _interopRequireDefault(__webpack_require__(6906));
var _checksum = __webpack_require__(8845);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var versionBytes = {
  ed25519PublicKey: 6 << 3,
  ed25519SecretSeed: 18 << 3,
  med25519PublicKey: 12 << 3,
  preAuthTx: 19 << 3,
  sha256Hash: 23 << 3,
  signedPayload: 15 << 3,
  contract: 2 << 3
};
var strkeyTypes = {
  G: 'ed25519PublicKey',
  S: 'ed25519SecretSeed',
  M: 'med25519PublicKey',
  T: 'preAuthTx',
  X: 'sha256Hash',
  P: 'signedPayload',
  C: 'contract'
};
var StrKey = exports.StrKey = function () {
  function StrKey() {
    _classCallCheck(this, StrKey);
  }
  _createClass(StrKey, null, [{
    key: "encodeEd25519PublicKey",
    value: function encodeEd25519PublicKey(data) {
      return encodeCheck('ed25519PublicKey', data);
    }
  }, {
    key: "decodeEd25519PublicKey",
    value: function decodeEd25519PublicKey(data) {
      return decodeCheck('ed25519PublicKey', data);
    }
  }, {
    key: "isValidEd25519PublicKey",
    value: function isValidEd25519PublicKey(publicKey) {
      return isValid('ed25519PublicKey', publicKey);
    }
  }, {
    key: "encodeEd25519SecretSeed",
    value: function encodeEd25519SecretSeed(data) {
      return encodeCheck('ed25519SecretSeed', data);
    }
  }, {
    key: "decodeEd25519SecretSeed",
    value: function decodeEd25519SecretSeed(address) {
      return decodeCheck('ed25519SecretSeed', address);
    }
  }, {
    key: "isValidEd25519SecretSeed",
    value: function isValidEd25519SecretSeed(seed) {
      return isValid('ed25519SecretSeed', seed);
    }
  }, {
    key: "encodeMed25519PublicKey",
    value: function encodeMed25519PublicKey(data) {
      return encodeCheck('med25519PublicKey', data);
    }
  }, {
    key: "decodeMed25519PublicKey",
    value: function decodeMed25519PublicKey(address) {
      return decodeCheck('med25519PublicKey', address);
    }
  }, {
    key: "isValidMed25519PublicKey",
    value: function isValidMed25519PublicKey(publicKey) {
      return isValid('med25519PublicKey', publicKey);
    }
  }, {
    key: "encodePreAuthTx",
    value: function encodePreAuthTx(data) {
      return encodeCheck('preAuthTx', data);
    }
  }, {
    key: "decodePreAuthTx",
    value: function decodePreAuthTx(address) {
      return decodeCheck('preAuthTx', address);
    }
  }, {
    key: "encodeSha256Hash",
    value: function encodeSha256Hash(data) {
      return encodeCheck('sha256Hash', data);
    }
  }, {
    key: "decodeSha256Hash",
    value: function decodeSha256Hash(address) {
      return decodeCheck('sha256Hash', address);
    }
  }, {
    key: "encodeSignedPayload",
    value: function encodeSignedPayload(data) {
      return encodeCheck('signedPayload', data);
    }
  }, {
    key: "decodeSignedPayload",
    value: function decodeSignedPayload(address) {
      return decodeCheck('signedPayload', address);
    }
  }, {
    key: "isValidSignedPayload",
    value: function isValidSignedPayload(address) {
      return isValid('signedPayload', address);
    }
  }, {
    key: "encodeContract",
    value: function encodeContract(data) {
      return encodeCheck('contract', data);
    }
  }, {
    key: "decodeContract",
    value: function decodeContract(address) {
      return decodeCheck('contract', address);
    }
  }, {
    key: "isValidContract",
    value: function isValidContract(address) {
      return isValid('contract', address);
    }
  }, {
    key: "getVersionByteForPrefix",
    value: function getVersionByteForPrefix(address) {
      return strkeyTypes[address[0]];
    }
  }]);
  return StrKey;
}();
function isValid(versionByteName, encoded) {
  if (typeof encoded !== 'string') {
    return false;
  }
  switch (versionByteName) {
    case 'ed25519PublicKey':
    case 'ed25519SecretSeed':
    case 'preAuthTx':
    case 'sha256Hash':
    case 'contract':
      if (encoded.length !== 56) {
        return false;
      }
      break;
    case 'med25519PublicKey':
      if (encoded.length !== 69) {
        return false;
      }
      break;
    case 'signedPayload':
      if (encoded.length < 56 || encoded.length > 165) {
        return false;
      }
      break;
    default:
      return false;
  }
  var decoded = '';
  try {
    decoded = decodeCheck(versionByteName, encoded);
  } catch (err) {
    return false;
  }
  switch (versionByteName) {
    case 'ed25519PublicKey':
    case 'ed25519SecretSeed':
    case 'preAuthTx':
    case 'sha256Hash':
    case 'contract':
      return decoded.length === 32;
    case 'med25519PublicKey':
      return decoded.length === 40;
    case 'signedPayload':
      return decoded.length >= 32 + 4 + 4 && decoded.length <= 32 + 4 + 64;
    default:
      return false;
  }
}
function decodeCheck(versionByteName, encoded) {
  if (typeof encoded !== 'string') {
    throw new TypeError('encoded argument must be of type String');
  }
  var decoded = _base["default"].decode(encoded);
  var versionByte = decoded[0];
  var payload = decoded.slice(0, -2);
  var data = payload.slice(1);
  var checksum = decoded.slice(-2);
  if (encoded !== _base["default"].encode(decoded)) {
    throw new Error('invalid encoded string');
  }
  var expectedVersion = versionBytes[versionByteName];
  if (expectedVersion === undefined) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name. ") + "Expected one of ".concat(Object.keys(versionBytes).join(', ')));
  }
  if (versionByte !== expectedVersion) {
    throw new Error("invalid version byte. expected ".concat(expectedVersion, ", got ").concat(versionByte));
  }
  var expectedChecksum = calculateChecksum(payload);
  if (!(0, _checksum.verifyChecksum)(expectedChecksum, checksum)) {
    throw new Error("invalid checksum");
  }
  return Buffer.from(data);
}
function encodeCheck(versionByteName, data) {
  if (data === null || data === undefined) {
    throw new Error('cannot encode null data');
  }
  var versionByte = versionBytes[versionByteName];
  if (versionByte === undefined) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name. ") + "Expected one of ".concat(Object.keys(versionBytes).join(', ')));
  }
  data = Buffer.from(data);
  var versionBuffer = Buffer.from([versionByte]);
  var payload = Buffer.concat([versionBuffer, data]);
  var checksum = calculateChecksum(payload);
  var unencoded = Buffer.concat([payload, checksum]);
  return _base["default"].encode(unencoded);
}
function calculateChecksum(payload) {
  var crcTable = [0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0];
  var crc16 = 0x0;
  for (var i = 0; i < payload.length; i += 1) {
    var _byte = payload[i];
    var lookupIndex = crc16 >> 8 ^ _byte;
    crc16 = crc16 << 8 ^ crcTable[lookupIndex];
    crc16 &= 0xffff;
  }
  var checksum = new Uint8Array(2);
  checksum[0] = crc16 & 0xff;
  checksum[1] = crc16 >> 8 & 0xff;
  return checksum;
}

/***/ }),

/***/ 7419:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Transaction = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _hashing = __webpack_require__(8827);
var _strkey = __webpack_require__(95);
var _operation = __webpack_require__(5458);
var _memo = __webpack_require__(2510);
var _transaction_base = __webpack_require__(2891);
var _decode_encode_muxed_account = __webpack_require__(9875);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
var Transaction = exports.Transaction = function (_TransactionBase) {
  _inherits(Transaction, _TransactionBase);
  var _super = _createSuper(Transaction);
  function Transaction(envelope, networkPassphrase) {
    var _this;
    _classCallCheck(this, Transaction);
    if (typeof envelope === 'string') {
      var buffer = Buffer.from(envelope, 'base64');
      envelope = _xdr["default"].TransactionEnvelope.fromXDR(buffer);
    }
    var envelopeType = envelope["switch"]();
    if (!(envelopeType === _xdr["default"].EnvelopeType.envelopeTypeTxV0() || envelopeType === _xdr["default"].EnvelopeType.envelopeTypeTx())) {
      throw new Error("Invalid TransactionEnvelope: expected an envelopeTypeTxV0 or envelopeTypeTx but received an ".concat(envelopeType.name, "."));
    }
    var txEnvelope = envelope.value();
    var tx = txEnvelope.tx();
    var fee = tx.fee().toString();
    var signatures = (txEnvelope.signatures() || []).slice();
    _this = _super.call(this, tx, signatures, fee, networkPassphrase);
    _this._envelopeType = envelopeType;
    _this._memo = tx.memo();
    _this._sequence = tx.seqNum().toString();
    switch (_this._envelopeType) {
      case _xdr["default"].EnvelopeType.envelopeTypeTxV0():
        _this._source = _strkey.StrKey.encodeEd25519PublicKey(_this.tx.sourceAccountEd25519());
        break;
      default:
        _this._source = (0, _decode_encode_muxed_account.encodeMuxedAccountToAddress)(_this.tx.sourceAccount());
        break;
    }
    var cond = null;
    var timeBounds = null;
    switch (_this._envelopeType) {
      case _xdr["default"].EnvelopeType.envelopeTypeTxV0():
        timeBounds = tx.timeBounds();
        break;
      case _xdr["default"].EnvelopeType.envelopeTypeTx():
        switch (tx.cond()["switch"]()) {
          case _xdr["default"].PreconditionType.precondTime():
            timeBounds = tx.cond().timeBounds();
            break;
          case _xdr["default"].PreconditionType.precondV2():
            cond = tx.cond().v2();
            timeBounds = cond.timeBounds();
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    if (timeBounds) {
      _this._timeBounds = {
        minTime: timeBounds.minTime().toString(),
        maxTime: timeBounds.maxTime().toString()
      };
    }
    if (cond) {
      var ledgerBounds = cond.ledgerBounds();
      if (ledgerBounds) {
        _this._ledgerBounds = {
          minLedger: ledgerBounds.minLedger(),
          maxLedger: ledgerBounds.maxLedger()
        };
      }
      var minSeq = cond.minSeqNum();
      if (minSeq) {
        _this._minAccountSequence = minSeq.toString();
      }
      _this._minAccountSequenceAge = cond.minSeqAge();
      _this._minAccountSequenceLedgerGap = cond.minSeqLedgerGap();
      _this._extraSigners = cond.extraSigners();
    }
    var operations = tx.operations() || [];
    _this._operations = operations.map(function (op) {
      return _operation.Operation.fromXDRObject(op);
    });
    return _this;
  }
  _createClass(Transaction, [{
    key: "timeBounds",
    get: function get() {
      return this._timeBounds;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "ledgerBounds",
    get: function get() {
      return this._ledgerBounds;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "minAccountSequence",
    get: function get() {
      return this._minAccountSequence;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "minAccountSequenceAge",
    get: function get() {
      return this._minAccountSequenceAge;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "minAccountSequenceLedgerGap",
    get: function get() {
      return this._minAccountSequenceLedgerGap;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "extraSigners",
    get: function get() {
      return this._extraSigners;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "sequence",
    get: function get() {
      return this._sequence;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "source",
    get: function get() {
      return this._source;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "operations",
    get: function get() {
      return this._operations;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "memo",
    get: function get() {
      return _memo.Memo.fromXDRObject(this._memo);
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "signatureBase",
    value: function signatureBase() {
      var tx = this.tx;
      if (this._envelopeType === _xdr["default"].EnvelopeType.envelopeTypeTxV0()) {
        tx = _xdr["default"].Transaction.fromXDR(Buffer.concat([_xdr["default"].PublicKeyType.publicKeyTypeEd25519().toXDR(), tx.toXDR()]));
      }
      var taggedTransaction = new _xdr["default"].TransactionSignaturePayloadTaggedTransaction.envelopeTypeTx(tx);
      var txSignature = new _xdr["default"].TransactionSignaturePayload({
        networkId: _xdr["default"].Hash.fromXDR((0, _hashing.hash)(this.networkPassphrase)),
        taggedTransaction: taggedTransaction
      });
      return txSignature.toXDR();
    }
  }, {
    key: "toEnvelope",
    value: function toEnvelope() {
      var rawTx = this.tx.toXDR();
      var signatures = this.signatures.slice();
      var envelope;
      switch (this._envelopeType) {
        case _xdr["default"].EnvelopeType.envelopeTypeTxV0():
          envelope = new _xdr["default"].TransactionEnvelope.envelopeTypeTxV0(new _xdr["default"].TransactionV0Envelope({
            tx: _xdr["default"].TransactionV0.fromXDR(rawTx),
            signatures: signatures
          }));
          break;
        case _xdr["default"].EnvelopeType.envelopeTypeTx():
          envelope = new _xdr["default"].TransactionEnvelope.envelopeTypeTx(new _xdr["default"].TransactionV1Envelope({
            tx: _xdr["default"].Transaction.fromXDR(rawTx),
            signatures: signatures
          }));
          break;
        default:
          throw new Error("Invalid TransactionEnvelope: expected an envelopeTypeTxV0 or envelopeTypeTx but received an ".concat(this._envelopeType.name, "."));
      }
      return envelope;
    }
  }, {
    key: "getClaimableBalanceId",
    value: function getClaimableBalanceId(opIndex) {
      if (!Number.isInteger(opIndex) || opIndex < 0 || opIndex >= this.operations.length) {
        throw new RangeError('invalid operation index');
      }
      var op = this.operations[opIndex];
      try {
        op = _operation.Operation.createClaimableBalance(op);
      } catch (err) {
        throw new TypeError("expected createClaimableBalance, got ".concat(op.type, ": ").concat(err));
      }
      var account = _strkey.StrKey.decodeEd25519PublicKey((0, _decode_encode_muxed_account.extractBaseAddress)(this.source));
      var operationId = _xdr["default"].HashIdPreimage.envelopeTypeOpId(new _xdr["default"].HashIdPreimageOperationId({
        sourceAccount: _xdr["default"].AccountId.publicKeyTypeEd25519(account),
        seqNum: _xdr["default"].SequenceNumber.fromString(this.sequence),
        opNum: opIndex
      }));
      var opIdHash = (0, _hashing.hash)(operationId.toXDR('raw'));
      var balanceId = _xdr["default"].ClaimableBalanceId.claimableBalanceIdTypeV0(opIdHash);
      return balanceId.toXDR('hex');
    }
  }]);
  return Transaction;
}(_transaction_base.TransactionBase);

/***/ }),

/***/ 2891:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TransactionBase = void 0;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _hashing = __webpack_require__(8827);
var _keypair = __webpack_require__(4839);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var TransactionBase = exports.TransactionBase = function () {
  function TransactionBase(tx, signatures, fee, networkPassphrase) {
    _classCallCheck(this, TransactionBase);
    if (typeof networkPassphrase !== 'string') {
      throw new Error("Invalid passphrase provided to Transaction: expected a string but got a ".concat(_typeof(networkPassphrase)));
    }
    this._networkPassphrase = networkPassphrase;
    this._tx = tx;
    this._signatures = signatures;
    this._fee = fee;
  }
  _createClass(TransactionBase, [{
    key: "signatures",
    get: function get() {
      return this._signatures;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "tx",
    get: function get() {
      return this._tx;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "fee",
    get: function get() {
      return this._fee;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "networkPassphrase",
    get: function get() {
      return this._networkPassphrase;
    },
    set: function set(networkPassphrase) {
      this._networkPassphrase = networkPassphrase;
    }
  }, {
    key: "sign",
    value: function sign() {
      var _this = this;
      var txHash = this.hash();
      for (var _len = arguments.length, keypairs = new Array(_len), _key = 0; _key < _len; _key++) {
        keypairs[_key] = arguments[_key];
      }
      keypairs.forEach(function (kp) {
        var sig = kp.signDecorated(txHash);
        _this.signatures.push(sig);
      });
    }
  }, {
    key: "getKeypairSignature",
    value: function getKeypairSignature(keypair) {
      return keypair.sign(this.hash()).toString('base64');
    }
  }, {
    key: "addSignature",
    value: function addSignature() {
      var publicKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var signature = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (!signature || typeof signature !== 'string') {
        throw new Error('Invalid signature');
      }
      if (!publicKey || typeof publicKey !== 'string') {
        throw new Error('Invalid publicKey');
      }
      var keypair;
      var hint;
      var signatureBuffer = Buffer.from(signature, 'base64');
      try {
        keypair = _keypair.Keypair.fromPublicKey(publicKey);
        hint = keypair.signatureHint();
      } catch (e) {
        throw new Error('Invalid publicKey');
      }
      if (!keypair.verify(this.hash(), signatureBuffer)) {
        throw new Error('Invalid signature');
      }
      this.signatures.push(new _xdr["default"].DecoratedSignature({
        hint: hint,
        signature: signatureBuffer
      }));
    }
  }, {
    key: "addDecoratedSignature",
    value: function addDecoratedSignature(signature) {
      this.signatures.push(signature);
    }
  }, {
    key: "signHashX",
    value: function signHashX(preimage) {
      if (typeof preimage === 'string') {
        preimage = Buffer.from(preimage, 'hex');
      }
      if (preimage.length > 64) {
        throw new Error('preimage cannnot be longer than 64 bytes');
      }
      var signature = preimage;
      var hashX = (0, _hashing.hash)(preimage);
      var hint = hashX.slice(hashX.length - 4);
      this.signatures.push(new _xdr["default"].DecoratedSignature({
        hint: hint,
        signature: signature
      }));
    }
  }, {
    key: "hash",
    value: function hash() {
      return (0, _hashing.hash)(this.signatureBase());
    }
  }, {
    key: "signatureBase",
    value: function signatureBase() {
      throw new Error('Implement in subclass');
    }
  }, {
    key: "toEnvelope",
    value: function toEnvelope() {
      throw new Error('Implement in subclass');
    }
  }, {
    key: "toXDR",
    value: function toXDR() {
      return this.toEnvelope().toXDR().toString('base64');
    }
  }]);
  return TransactionBase;
}();

/***/ }),

/***/ 6997:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TransactionBuilder = exports.TimeoutInfinite = exports.BASE_FEE = void 0;
exports.isValidDate = isValidDate;
var _jsXdr = __webpack_require__(6263);
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _account = __webpack_require__(3771);
var _muxed_account = __webpack_require__(6971);
var _decode_encode_muxed_account = __webpack_require__(9875);
var _transaction = __webpack_require__(7419);
var _fee_bump_transaction = __webpack_require__(8370);
var _sorobandata_builder = __webpack_require__(8214);
var _strkey = __webpack_require__(95);
var _signerkey = __webpack_require__(3098);
var _memo = __webpack_require__(2510);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var BASE_FEE = exports.BASE_FEE = '100';
var TimeoutInfinite = exports.TimeoutInfinite = 0;
var TransactionBuilder = exports.TransactionBuilder = function () {
  function TransactionBuilder(sourceAccount) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, TransactionBuilder);
    if (!sourceAccount) {
      throw new Error('must specify source account for the transaction');
    }
    if (opts.fee === undefined) {
      throw new Error('must specify fee for the transaction (in stroops)');
    }
    this.source = sourceAccount;
    this.operations = [];
    this.baseFee = opts.fee;
    this.timebounds = opts.timebounds ? _objectSpread({}, opts.timebounds) : null;
    this.ledgerbounds = opts.ledgerbounds ? _objectSpread({}, opts.ledgerbounds) : null;
    this.minAccountSequence = opts.minAccountSequence || null;
    this.minAccountSequenceAge = opts.minAccountSequenceAge || null;
    this.minAccountSequenceLedgerGap = opts.minAccountSequenceLedgerGap || null;
    this.extraSigners = opts.extraSigners ? _toConsumableArray(opts.extraSigners) : null;
    this.memo = opts.memo || _memo.Memo.none();
    this.networkPassphrase = opts.networkPassphrase || null;
    this.sorobanData = opts.sorobanData ? new _sorobandata_builder.SorobanDataBuilder(opts.sorobanData).build() : null;
  }
  _createClass(TransactionBuilder, [{
    key: "addOperation",
    value: function addOperation(operation) {
      this.operations.push(operation);
      return this;
    }
  }, {
    key: "clearOperations",
    value: function clearOperations() {
      this.operations = [];
      return this;
    }
  }, {
    key: "addMemo",
    value: function addMemo(memo) {
      this.memo = memo;
      return this;
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(timeoutSeconds) {
      if (this.timebounds !== null && this.timebounds.maxTime > 0) {
        throw new Error('TimeBounds.max_time has been already set - setting timeout would overwrite it.');
      }
      if (timeoutSeconds < 0) {
        throw new Error('timeout cannot be negative');
      }
      if (timeoutSeconds > 0) {
        var timeoutTimestamp = Math.floor(Date.now() / 1000) + timeoutSeconds;
        if (this.timebounds === null) {
          this.timebounds = {
            minTime: 0,
            maxTime: timeoutTimestamp
          };
        } else {
          this.timebounds = {
            minTime: this.timebounds.minTime,
            maxTime: timeoutTimestamp
          };
        }
      } else {
        this.timebounds = {
          minTime: 0,
          maxTime: 0
        };
      }
      return this;
    }
  }, {
    key: "setTimebounds",
    value: function setTimebounds(minEpochOrDate, maxEpochOrDate) {
      if (typeof minEpochOrDate === 'number') {
        minEpochOrDate = new Date(minEpochOrDate * 1000);
      }
      if (typeof maxEpochOrDate === 'number') {
        maxEpochOrDate = new Date(maxEpochOrDate * 1000);
      }
      if (this.timebounds !== null) {
        throw new Error('TimeBounds has been already set - setting timebounds would overwrite it.');
      }
      var minTime = Math.floor(minEpochOrDate.valueOf() / 1000);
      var maxTime = Math.floor(maxEpochOrDate.valueOf() / 1000);
      if (minTime < 0) {
        throw new Error('min_time cannot be negative');
      }
      if (maxTime < 0) {
        throw new Error('max_time cannot be negative');
      }
      if (maxTime > 0 && minTime > maxTime) {
        throw new Error('min_time cannot be greater than max_time');
      }
      this.timebounds = {
        minTime: minTime,
        maxTime: maxTime
      };
      return this;
    }
  }, {
    key: "setLedgerbounds",
    value: function setLedgerbounds(minLedger, maxLedger) {
      if (this.ledgerbounds !== null) {
        throw new Error('LedgerBounds has been already set - setting ledgerbounds would overwrite it.');
      }
      if (minLedger < 0) {
        throw new Error('min_ledger cannot be negative');
      }
      if (maxLedger < 0) {
        throw new Error('max_ledger cannot be negative');
      }
      if (maxLedger > 0 && minLedger > maxLedger) {
        throw new Error('min_ledger cannot be greater than max_ledger');
      }
      this.ledgerbounds = {
        minLedger: minLedger,
        maxLedger: maxLedger
      };
      return this;
    }
  }, {
    key: "setMinAccountSequence",
    value: function setMinAccountSequence(minAccountSequence) {
      if (this.minAccountSequence !== null) {
        throw new Error('min_account_sequence has been already set - setting min_account_sequence would overwrite it.');
      }
      this.minAccountSequence = minAccountSequence;
      return this;
    }
  }, {
    key: "setMinAccountSequenceAge",
    value: function setMinAccountSequenceAge(durationInSeconds) {
      if (typeof durationInSeconds !== 'number') {
        throw new Error('min_account_sequence_age must be a number');
      }
      if (this.minAccountSequenceAge !== null) {
        throw new Error('min_account_sequence_age has been already set - setting min_account_sequence_age would overwrite it.');
      }
      if (durationInSeconds < 0) {
        throw new Error('min_account_sequence_age cannot be negative');
      }
      this.minAccountSequenceAge = durationInSeconds;
      return this;
    }
  }, {
    key: "setMinAccountSequenceLedgerGap",
    value: function setMinAccountSequenceLedgerGap(gap) {
      if (this.minAccountSequenceLedgerGap !== null) {
        throw new Error('min_account_sequence_ledger_gap has been already set - setting min_account_sequence_ledger_gap would overwrite it.');
      }
      if (gap < 0) {
        throw new Error('min_account_sequence_ledger_gap cannot be negative');
      }
      this.minAccountSequenceLedgerGap = gap;
      return this;
    }
  }, {
    key: "setExtraSigners",
    value: function setExtraSigners(extraSigners) {
      if (!Array.isArray(extraSigners)) {
        throw new Error('extra_signers must be an array of strings.');
      }
      if (this.extraSigners !== null) {
        throw new Error('extra_signers has been already set - setting extra_signers would overwrite it.');
      }
      if (extraSigners.length > 2) {
        throw new Error('extra_signers cannot be longer than 2 elements.');
      }
      this.extraSigners = _toConsumableArray(extraSigners);
      return this;
    }
  }, {
    key: "setNetworkPassphrase",
    value: function setNetworkPassphrase(networkPassphrase) {
      this.networkPassphrase = networkPassphrase;
      return this;
    }
  }, {
    key: "setSorobanData",
    value: function setSorobanData(sorobanData) {
      this.sorobanData = new _sorobandata_builder.SorobanDataBuilder(sorobanData).build();
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var sequenceNumber = new _bignumber["default"](this.source.sequenceNumber()).plus(1);
      var fee = new _bignumber["default"](this.baseFee).times(this.operations.length).toNumber();
      var attrs = {
        fee: fee,
        seqNum: _xdr["default"].SequenceNumber.fromString(sequenceNumber.toString()),
        memo: this.memo ? this.memo.toXDRObject() : null
      };
      if (this.timebounds === null || typeof this.timebounds.minTime === 'undefined' || typeof this.timebounds.maxTime === 'undefined') {
        throw new Error('TimeBounds has to be set or you must call setTimeout(TimeoutInfinite).');
      }
      if (isValidDate(this.timebounds.minTime)) {
        this.timebounds.minTime = this.timebounds.minTime.getTime() / 1000;
      }
      if (isValidDate(this.timebounds.maxTime)) {
        this.timebounds.maxTime = this.timebounds.maxTime.getTime() / 1000;
      }
      this.timebounds.minTime = _jsXdr.UnsignedHyper.fromString(this.timebounds.minTime.toString());
      this.timebounds.maxTime = _jsXdr.UnsignedHyper.fromString(this.timebounds.maxTime.toString());
      var timeBounds = new _xdr["default"].TimeBounds(this.timebounds);
      if (this.hasV2Preconditions()) {
        var ledgerBounds = null;
        if (this.ledgerbounds !== null) {
          ledgerBounds = new _xdr["default"].LedgerBounds(this.ledgerbounds);
        }
        var minSeqNum = this.minAccountSequence || '0';
        minSeqNum = _xdr["default"].SequenceNumber.fromString(minSeqNum);
        var minSeqAge = _jsXdr.UnsignedHyper.fromString(this.minAccountSequenceAge !== null ? this.minAccountSequenceAge.toString() : '0');
        var minSeqLedgerGap = this.minAccountSequenceLedgerGap || 0;
        var extraSigners = this.extraSigners !== null ? this.extraSigners.map(_signerkey.SignerKey.decodeAddress) : [];
        attrs.cond = _xdr["default"].Preconditions.precondV2(new _xdr["default"].PreconditionsV2({
          timeBounds: timeBounds,
          ledgerBounds: ledgerBounds,
          minSeqNum: minSeqNum,
          minSeqAge: minSeqAge,
          minSeqLedgerGap: minSeqLedgerGap,
          extraSigners: extraSigners
        }));
      } else {
        attrs.cond = _xdr["default"].Preconditions.precondTime(timeBounds);
      }
      attrs.sourceAccount = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(this.source.accountId());
      if (this.sorobanData) {
        attrs.ext = new _xdr["default"].TransactionExt(1, this.sorobanData);
      } else {
        attrs.ext = new _xdr["default"].TransactionExt(0, _xdr["default"].Void);
      }
      var xtx = new _xdr["default"].Transaction(attrs);
      xtx.operations(this.operations);
      var txEnvelope = new _xdr["default"].TransactionEnvelope.envelopeTypeTx(new _xdr["default"].TransactionV1Envelope({
        tx: xtx
      }));
      var tx = new _transaction.Transaction(txEnvelope, this.networkPassphrase);
      this.source.incrementSequenceNumber();
      return tx;
    }
  }, {
    key: "hasV2Preconditions",
    value: function hasV2Preconditions() {
      return this.ledgerbounds !== null || this.minAccountSequence !== null || this.minAccountSequenceAge !== null || this.minAccountSequenceLedgerGap !== null || this.extraSigners !== null && this.extraSigners.length > 0;
    }
  }], [{
    key: "cloneFrom",
    value: function cloneFrom(tx) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!(tx instanceof _transaction.Transaction)) {
        throw new TypeError("expected a 'Transaction', got: ".concat(tx));
      }
      var sequenceNum = (BigInt(tx.sequence) - 1n).toString();
      var source;
      if (_strkey.StrKey.isValidMed25519PublicKey(tx.source)) {
        source = _muxed_account.MuxedAccount.fromAddress(tx.source, sequenceNum);
      } else if (_strkey.StrKey.isValidEd25519PublicKey(tx.source)) {
        source = new _account.Account(tx.source, sequenceNum);
      } else {
        throw new TypeError("unsupported tx source account: ".concat(tx.source));
      }
      var unscaledFee = parseInt(tx.fee, 10) / tx.operations.length;
      var builder = new TransactionBuilder(source, _objectSpread({
        fee: (unscaledFee || BASE_FEE).toString(),
        memo: tx.memo,
        networkPassphrase: tx.networkPassphrase,
        timebounds: tx.timeBounds,
        ledgerbounds: tx.ledgerBounds,
        minAccountSequence: tx.minAccountSequence,
        minAccountSequenceAge: tx.minAccountSequenceAge,
        minAccountSequenceLedgerGap: tx.minAccountSequenceLedgerGap,
        extraSigners: tx.extraSigners
      }, opts));
      tx._tx.operations().forEach(function (op) {
        return builder.addOperation(op);
      });
      return builder;
    }
  }, {
    key: "buildFeeBumpTransaction",
    value: function buildFeeBumpTransaction(feeSource, baseFee, innerTx, networkPassphrase) {
      var innerOps = innerTx.operations.length;
      var innerBaseFeeRate = new _bignumber["default"](innerTx.fee).div(innerOps);
      var base = new _bignumber["default"](baseFee);
      if (base.lt(innerBaseFeeRate)) {
        throw new Error("Invalid baseFee, it should be at least ".concat(innerBaseFeeRate, " stroops."));
      }
      var minBaseFee = new _bignumber["default"](BASE_FEE);
      if (base.lt(minBaseFee)) {
        throw new Error("Invalid baseFee, it should be at least ".concat(minBaseFee, " stroops."));
      }
      var innerTxEnvelope = innerTx.toEnvelope();
      if (innerTxEnvelope["switch"]() === _xdr["default"].EnvelopeType.envelopeTypeTxV0()) {
        var v0Tx = innerTxEnvelope.v0().tx();
        var v1Tx = new _xdr["default"].Transaction({
          sourceAccount: new _xdr["default"].MuxedAccount.keyTypeEd25519(v0Tx.sourceAccountEd25519()),
          fee: v0Tx.fee(),
          seqNum: v0Tx.seqNum(),
          cond: _xdr["default"].Preconditions.precondTime(v0Tx.timeBounds()),
          memo: v0Tx.memo(),
          operations: v0Tx.operations(),
          ext: new _xdr["default"].TransactionExt(0)
        });
        innerTxEnvelope = new _xdr["default"].TransactionEnvelope.envelopeTypeTx(new _xdr["default"].TransactionV1Envelope({
          tx: v1Tx,
          signatures: innerTxEnvelope.v0().signatures()
        }));
      }
      var feeSourceAccount;
      if (typeof feeSource === 'string') {
        feeSourceAccount = (0, _decode_encode_muxed_account.decodeAddressToMuxedAccount)(feeSource);
      } else {
        feeSourceAccount = feeSource.xdrMuxedAccount();
      }
      var tx = new _xdr["default"].FeeBumpTransaction({
        feeSource: feeSourceAccount,
        fee: _xdr["default"].Int64.fromString(base.times(innerOps + 1).toString()),
        innerTx: _xdr["default"].FeeBumpTransactionInnerTx.envelopeTypeTx(innerTxEnvelope.v1()),
        ext: new _xdr["default"].FeeBumpTransactionExt(0)
      });
      var feeBumpTxEnvelope = new _xdr["default"].FeeBumpTransactionEnvelope({
        tx: tx,
        signatures: []
      });
      var envelope = new _xdr["default"].TransactionEnvelope.envelopeTypeTxFeeBump(feeBumpTxEnvelope);
      return new _fee_bump_transaction.FeeBumpTransaction(envelope, networkPassphrase);
    }
  }, {
    key: "fromXDR",
    value: function fromXDR(envelope, networkPassphrase) {
      if (typeof envelope === 'string') {
        envelope = _xdr["default"].TransactionEnvelope.fromXDR(envelope, 'base64');
      }
      if (envelope["switch"]() === _xdr["default"].EnvelopeType.envelopeTypeTxFeeBump()) {
        return new _fee_bump_transaction.FeeBumpTransaction(envelope, networkPassphrase);
      }
      return new _transaction.Transaction(envelope, networkPassphrase);
    }
  }]);
  return TransactionBuilder;
}();
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

/***/ }),

/***/ 8845:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.verifyChecksum = verifyChecksum;
function verifyChecksum(expected, actual) {
  if (expected.length !== actual.length) {
    return false;
  }
  if (expected.length === 0) {
    return true;
  }
  for (var i = 0; i < expected.length; i += 1) {
    if (expected[i] !== actual[i]) {
      return false;
    }
  }
  return true;
}

/***/ }),

/***/ 7289:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.best_r = best_r;
var _bignumber = _interopRequireDefault(__webpack_require__(4431));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var MAX_INT = (1 << 31 >>> 0) - 1;
function best_r(rawNumber) {
  var number = new _bignumber["default"](rawNumber);
  var a;
  var f;
  var fractions = [[new _bignumber["default"](0), new _bignumber["default"](1)], [new _bignumber["default"](1), new _bignumber["default"](0)]];
  var i = 2;
  while (true) {
    if (number.gt(MAX_INT)) {
      break;
    }
    a = number.integerValue(_bignumber["default"].ROUND_FLOOR);
    f = number.minus(a);
    var h = a.times(fractions[i - 1][0]).plus(fractions[i - 2][0]);
    var k = a.times(fractions[i - 1][1]).plus(fractions[i - 2][1]);
    if (h.gt(MAX_INT) || k.gt(MAX_INT)) {
      break;
    }
    fractions.push([h, k]);
    if (f.eq(0)) {
      break;
    }
    number = new _bignumber["default"](1).div(f);
    i += 1;
  }
  var _fractions = _slicedToArray(fractions[fractions.length - 1], 2),
    n = _fractions[0],
    d = _fractions[1];
  if (n.isZero() || d.isZero()) {
    throw new Error("Couldn't find approximation");
  }
  return [n.toNumber(), d.toNumber()];
}

/***/ }),

/***/ 9875:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.decodeAddressToMuxedAccount = decodeAddressToMuxedAccount;
exports.encodeMuxedAccount = encodeMuxedAccount;
exports.encodeMuxedAccountToAddress = encodeMuxedAccountToAddress;
exports.extractBaseAddress = extractBaseAddress;
var _xdr = _interopRequireDefault(__webpack_require__(751));
var _strkey = __webpack_require__(95);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function decodeAddressToMuxedAccount(address) {
  if (_strkey.StrKey.isValidMed25519PublicKey(address)) {
    return _decodeAddressFullyToMuxedAccount(address);
  }
  return _xdr["default"].MuxedAccount.keyTypeEd25519(_strkey.StrKey.decodeEd25519PublicKey(address));
}
function encodeMuxedAccountToAddress(muxedAccount) {
  if (muxedAccount["switch"]().value === _xdr["default"].CryptoKeyType.keyTypeMuxedEd25519().value) {
    return _encodeMuxedAccountFullyToAddress(muxedAccount);
  }
  return _strkey.StrKey.encodeEd25519PublicKey(muxedAccount.ed25519());
}
function encodeMuxedAccount(address, id) {
  if (!_strkey.StrKey.isValidEd25519PublicKey(address)) {
    throw new Error('address should be a Stellar account ID (G...)');
  }
  if (typeof id !== 'string') {
    throw new Error('id should be a string representing a number (uint64)');
  }
  return _xdr["default"].MuxedAccount.keyTypeMuxedEd25519(new _xdr["default"].MuxedAccountMed25519({
    id: _xdr["default"].Uint64.fromString(id),
    ed25519: _strkey.StrKey.decodeEd25519PublicKey(address)
  }));
}
function extractBaseAddress(address) {
  if (_strkey.StrKey.isValidEd25519PublicKey(address)) {
    return address;
  }
  if (!_strkey.StrKey.isValidMed25519PublicKey(address)) {
    throw new TypeError("expected muxed account (M...), got ".concat(address));
  }
  var muxedAccount = decodeAddressToMuxedAccount(address);
  return _strkey.StrKey.encodeEd25519PublicKey(muxedAccount.med25519().ed25519());
}
function _decodeAddressFullyToMuxedAccount(address) {
  var rawBytes = _strkey.StrKey.decodeMed25519PublicKey(address);
  return _xdr["default"].MuxedAccount.keyTypeMuxedEd25519(new _xdr["default"].MuxedAccountMed25519({
    id: _xdr["default"].Uint64.fromXDR(rawBytes.subarray(-8)),
    ed25519: rawBytes.subarray(0, -8)
  }));
}
function _encodeMuxedAccountFullyToAddress(muxedAccount) {
  if (muxedAccount["switch"]() === _xdr["default"].CryptoKeyType.keyTypeEd25519()) {
    return encodeMuxedAccountToAddress(muxedAccount);
  }
  var muxed = muxedAccount.med25519();
  return _strkey.StrKey.encodeMed25519PublicKey(Buffer.concat([muxed.ed25519(), muxed.id().toXDR('raw')]));
}

/***/ }),

/***/ 3957:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.trimEnd = void 0;
var trimEnd = exports.trimEnd = function trimEnd(input, _char) {
  var isNumber = typeof input === 'number';
  var str = String(input);
  while (str.endsWith(_char)) {
    str = str.slice(0, -1);
  }
  return isNumber ? Number(str) : str;
};

/***/ }),

/***/ 751:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _curr_generated = _interopRequireDefault(__webpack_require__(7777));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var _default = exports["default"] = _curr_generated["default"];

/***/ }),

/***/ 7095:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Xu: () => (/* binding */ AxiosClient),
/* harmony export */   ZP: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   i8: () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1257);

var version = (__webpack_require__(4147)/* .version */ .i8);
var AxiosClient = axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.create({
  headers: {
    'X-Client-Name': 'js-soroban-client',
    'X-Client-Version': version
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AxiosClient);

/***/ }),

/***/ 5085:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StellarBase: () => (/* reexport module object */ stellar_base__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   axios: () => (/* reexport safe */ axios__WEBPACK_IMPORTED_MODULE_2__.Z),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8026);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _index__WEBPACK_IMPORTED_MODULE_0__) if(["default","StellarBase","axios"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _index__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8625);
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stellar_base__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1257);
/* module decorator */ module = __webpack_require__.hmd(module);





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (module.exports);

/***/ }),

/***/ 936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ ContractSpec)
/* harmony export */ });
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8625);
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stellar_base__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var ContractSpec = function () {
  function ContractSpec(entries) {
    _classCallCheck(this, ContractSpec);
    _defineProperty(this, "entries", []);
    if (entries.length == 0) {
      throw new Error('Contract spec must have at least one entry');
    }
    var entry = entries[0];
    if (typeof entry === 'string') {
      this.entries = entries.map(function (s) {
        return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntry.fromXDR(s, 'base64');
      });
    } else {
      this.entries = entries;
    }
  }
  _createClass(ContractSpec, [{
    key: "getFunc",
    value: function getFunc(name) {
      var entry = this.findEntry(name);
      if (entry.switch().value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntryKind.scSpecEntryFunctionV0().value) {
        throw new Error("".concat(name, " is not a function"));
      }
      return entry.value();
    }
  }, {
    key: "funcArgsToScVals",
    value: function funcArgsToScVals(name, args) {
      var _this = this;
      var fn = this.getFunc(name);
      return fn.inputs().map(function (input) {
        return _this.nativeToScVal(readObj(args, input), input.type());
      });
    }
  }, {
    key: "funcResToNative",
    value: function funcResToNative(name, val_or_base64) {
      var val = typeof val_or_base64 === 'string' ? stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.fromXDR(val_or_base64, 'base64') : val_or_base64;
      var func = this.getFunc(name);
      var outputs = func.outputs();
      if (outputs.length === 0) {
        var type = val.switch();
        if (type.value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvVoid().value) {
          throw new Error("Expected void, got ".concat(type.name));
        }
        return null;
      }
      if (outputs.length > 1) {
        throw new Error("Multiple outputs not supported");
      }
      var output = outputs[0];
      if (output.switch().value === stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeResult().value) {
        return this.scValToNative(val, output.result().okType());
      }
      return this.scValToNative(val, output);
    }
  }, {
    key: "findEntry",
    value: function findEntry(name) {
      var entry = this.entries.find(function (entry) {
        return entry.value().name().toString() === name;
      });
      if (!entry) {
        throw new Error("no such entry: ".concat(name));
      }
      return entry;
    }
  }, {
    key: "nativeToScVal",
    value: function nativeToScVal(val, ty) {
      var _this2 = this;
      var t = ty.switch();
      var value = t.value;
      if (t.value === stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeUdt().value) {
        var udt = ty.value();
        return this.nativeToUdt(val, udt.name().toString());
      }
      if (value === stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeOption().value) {
        var opt = ty.value();
        if (val === undefined) {
          return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVoid();
        }
        return this.nativeToScVal(val, opt.valueType());
      }
      switch (_typeof(val)) {
        case 'object':
          {
            var _val$constructor$name, _val$constructor;
            if (val === null) {
              switch (value) {
                case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeVoid().value:
                  return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVoid();
                default:
                  throw new TypeError("Type ".concat(ty, " was not void, but value was null"));
              }
            }
            if (val instanceof stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal) {
              return val;
            }
            if (val instanceof stellar_base__WEBPACK_IMPORTED_MODULE_0__.Address) {
              if (ty.switch().value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeAddress().value) {
                throw new TypeError("Type ".concat(ty, " was not address, but value was Address"));
              }
              return val.toScVal();
            }
            if (val instanceof stellar_base__WEBPACK_IMPORTED_MODULE_0__.Contract) {
              if (ty.switch().value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeAddress().value) {
                throw new TypeError("Type ".concat(ty, " was not address, but value was Address"));
              }
              return val.address().toScVal();
            }
            if (val instanceof Uint8Array || Buffer.isBuffer(val)) {
              var copy = Uint8Array.from(val);
              switch (value) {
                case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeBytesN().value:
                  {
                    var bytes_n = ty.value();
                    if (copy.length !== bytes_n.n()) {
                      throw new TypeError("expected ".concat(bytes_n.n(), " bytes, but got ").concat(copy.length));
                    }
                    return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvBytes(copy);
                  }
                case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeBytes().value:
                  return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvBytes(copy);
                default:
                  throw new TypeError("invalid type (".concat(ty, ") specified for Bytes and BytesN"));
              }
            }
            if (Array.isArray(val)) {
              if (stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeVec().value === value) {
                var vec = ty.value();
                var elementType = vec.elementType();
                return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVec(val.map(function (v) {
                  return _this2.nativeToScVal(v, elementType);
                }));
              } else if (stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeTuple().value === value) {
                var tup = ty.value();
                var valTypes = tup.valueTypes();
                if (val.length !== valTypes.length) {
                  throw new TypeError("Tuple expects ".concat(valTypes.length, " values, but ").concat(val.length, " were provided"));
                }
                return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVec(val.map(function (v, i) {
                  return _this2.nativeToScVal(v, valTypes[i]);
                }));
              } else {
                throw new TypeError("Type ".concat(ty, " was not vec, but value was Array"));
              }
            }
            if (val.constructor === Map) {
              if (value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeMap().value) {
                throw new TypeError("Type ".concat(ty, " was not map, but value was Map"));
              }
              var scMap = ty.value();
              var map = val;
              var entries = [];
              var values = map.entries();
              var res = values.next();
              while (!res.done) {
                var _res$value = _slicedToArray(res.value, 2),
                  k = _res$value[0],
                  v = _res$value[1];
                var key = this.nativeToScVal(k, scMap.keyType());
                var _val = this.nativeToScVal(v, scMap.valueType());
                entries.push(new stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScMapEntry({
                  key: key,
                  val: _val
                }));
                res = values.next();
              }
              return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvMap(entries);
            }
            if (((_val$constructor$name = (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) !== null && _val$constructor$name !== void 0 ? _val$constructor$name : '') !== 'Object') {
              var _val$constructor2;
              throw new TypeError("cannot interpret ".concat((_val$constructor2 = val.constructor) === null || _val$constructor2 === void 0 ? void 0 : _val$constructor2.name, " value as ScVal (").concat(JSON.stringify(val), ")"));
            }
            throw new TypeError("Received object ".concat(val, "  did not match the provided type ").concat(ty));
          }
        case 'number':
        case 'bigint':
          {
            switch (value) {
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeU32().value:
                return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvU32(val);
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeI32().value:
                return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvI32(val);
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeU64().value:
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeI64().value:
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeU128().value:
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeI128().value:
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeU256().value:
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeI256().value:
                {
                  var intType = t.name.substring(10).toLowerCase();
                  return new stellar_base__WEBPACK_IMPORTED_MODULE_0__.XdrLargeInt(intType, val).toScVal();
                }
              default:
                throw new TypeError("invalid type (".concat(ty, ") specified for integer"));
            }
          }
        case 'string':
          return stringToScVal(val, t);
        case 'boolean':
          {
            if (value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeBool().value) {
              throw TypeError("Type ".concat(ty, " was not bool, but value was bool"));
            }
            return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvBool(val);
          }
        case 'undefined':
          {
            if (!ty) {
              return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVoid();
            }
            switch (value) {
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeVoid().value:
              case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeOption().value:
                return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVoid();
              default:
                throw new TypeError("Type ".concat(ty, " was not void, but value was undefined"));
            }
          }
        case 'function':
          return this.nativeToScVal(val(), ty);
        default:
          throw new TypeError("failed to convert typeof ".concat(_typeof(val), " (").concat(val, ")"));
      }
    }
  }, {
    key: "nativeToUdt",
    value: function nativeToUdt(val, name) {
      var entry = this.findEntry(name);
      switch (entry.switch()) {
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntryKind.scSpecEntryUdtEnumV0():
          if (typeof val !== 'number') {
            throw new TypeError("expected number for enum ".concat(name, ", but got ").concat(_typeof(val)));
          }
          return this.nativeToEnum(val, entry.value());
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntryKind.scSpecEntryUdtStructV0():
          return this.nativeToStruct(val, entry.value());
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntryKind.scSpecEntryUdtUnionV0():
          return this.nativeToUnion(val, entry.value());
        default:
          throw new Error("failed to parse udt ".concat(name));
      }
    }
  }, {
    key: "nativeToUnion",
    value: function nativeToUnion(val, union_) {
      var _this3 = this;
      var entry_name = val.tag;
      var case_ = union_.cases().find(function (entry) {
        var case_ = entry.value().name().toString();
        return case_ === entry_name;
      });
      if (!case_) {
        throw new TypeError("no such enum entry: ".concat(entry_name, " in ").concat(union_));
      }
      var key = stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvSymbol(entry_name);
      switch (case_.switch()) {
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecUdtUnionCaseV0Kind.scSpecUdtUnionCaseVoidV0():
          {
            return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVec([key]);
          }
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecUdtUnionCaseV0Kind.scSpecUdtUnionCaseTupleV0():
          {
            var types = case_.value().type();
            if (Array.isArray(val.values)) {
              if (val.values.length != types.length) {
                throw new TypeError("union ".concat(union_, " expects ").concat(types.length, " values, but got ").concat(val.values.length));
              }
              var scvals = val.values.map(function (v, i) {
                return _this3.nativeToScVal(v, types[i]);
              });
              scvals.unshift(key);
              return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVec(scvals);
            }
            throw new Error("failed to parse union case ".concat(case_, " with ").concat(val));
          }
        default:
          throw new Error("failed to parse union ".concat(union_, " with ").concat(val));
      }
    }
  }, {
    key: "nativeToStruct",
    value: function nativeToStruct(val, struct) {
      var _this4 = this;
      var fields = struct.fields();
      if (fields.some(isNumeric)) {
        if (!fields.every(isNumeric)) {
          throw new Error('mixed numeric and non-numeric field names are not allowed');
        }
        return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVec(fields.map(function (_, i) {
          return _this4.nativeToScVal(val[i], fields[i].type());
        }));
      }
      return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvMap(fields.map(function (field) {
        var name = field.name().toString();
        return new stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScMapEntry({
          key: _this4.nativeToScVal(name, stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecTypeDef.scSpecTypeSymbol()),
          val: _this4.nativeToScVal(val[name], field.type())
        });
      }));
    }
  }, {
    key: "nativeToEnum",
    value: function nativeToEnum(val, enum_) {
      if (enum_.cases().some(function (entry) {
        return entry.value() === val;
      })) {
        return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvU32(val);
      }
      throw new TypeError("no such enum entry: ".concat(val, " in ").concat(enum_));
    }
  }, {
    key: "scValStrToNative",
    value: function scValStrToNative(scv, typeDef) {
      return this.scValToNative(stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.fromXDR(scv, 'base64'), typeDef);
    }
  }, {
    key: "scValToNative",
    value: function scValToNative(scv, typeDef) {
      var _this5 = this;
      var t = typeDef.switch();
      var value = t.value;
      if (value === stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeUdt().value) {
        return this.scValUdtToNative(scv, typeDef.value());
      }
      switch (scv.switch().value) {
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvVoid().value:
          return void 0;
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvU64().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvI64().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvU128().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvI128().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvU256().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvI256().value:
          return (0,stellar_base__WEBPACK_IMPORTED_MODULE_0__.scValToBigInt)(scv);
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvVec().value:
          {
            if (value == stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeVec().value) {
              var _scv$vec;
              var vec = typeDef.value();
              return ((_scv$vec = scv.vec()) !== null && _scv$vec !== void 0 ? _scv$vec : []).map(function (elm) {
                return _this5.scValToNative(elm, vec.elementType());
              });
            } else if (value == stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeTuple().value) {
              var _scv$vec2;
              var tuple = typeDef.value();
              var valTypes = tuple.valueTypes();
              return ((_scv$vec2 = scv.vec()) !== null && _scv$vec2 !== void 0 ? _scv$vec2 : []).map(function (elm, i) {
                return _this5.scValToNative(elm, valTypes[i]);
              });
            }
            throw new TypeError("Type ".concat(typeDef, " was not vec, but ").concat(scv, " is"));
          }
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvAddress().value:
          return stellar_base__WEBPACK_IMPORTED_MODULE_0__.Address.fromScVal(scv);
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvMap().value:
          {
            var _scv$map;
            var map = (_scv$map = scv.map()) !== null && _scv$map !== void 0 ? _scv$map : [];
            if (value == stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeMap().value) {
              var type_ = typeDef.value();
              var keyType = type_.keyType();
              var valueType = type_.valueType();
              return new Map(map.map(function (entry) {
                return [_this5.scValToNative(entry.key(), keyType), _this5.scValToNative(entry.val(), valueType)];
              }));
            }
            throw new TypeError("ScSpecType ".concat(t.name, " was not map, but ").concat(JSON.stringify(scv, null, 2), " is"));
          }
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvBool().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvU32().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvI32().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvBytes().value:
          return scv.value();
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvString().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvSymbol().value:
          {
            var _scv$value;
            if (value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeString().value && value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeSymbol().value) {
              throw new Error("ScSpecType ".concat(t.name, " was not string or symbol, but ").concat(JSON.stringify(scv, null, 2), " is"));
            }
            return (_scv$value = scv.value()) === null || _scv$value === void 0 ? void 0 : _scv$value.toString();
          }
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvTimepoint().value:
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvDuration().value:
          return (0,stellar_base__WEBPACK_IMPORTED_MODULE_0__.scValToBigInt)(stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvU64(scv.value()));
        default:
          throw new TypeError("failed to convert ".concat(JSON.stringify(scv, null, 2), " to native type from type ").concat(t.name));
      }
    }
  }, {
    key: "scValUdtToNative",
    value: function scValUdtToNative(scv, udt) {
      var entry = this.findEntry(udt.name().toString());
      switch (entry.switch()) {
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntryKind.scSpecEntryUdtEnumV0():
          return this.enumToNative(scv, entry.value());
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntryKind.scSpecEntryUdtStructV0():
          return this.structToNative(scv, entry.value());
        case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecEntryKind.scSpecEntryUdtUnionV0():
          return this.unionToNative(scv, entry.value());
        default:
          throw new Error("failed to parse udt ".concat(udt.name().toString(), ": ").concat(entry));
      }
    }
  }, {
    key: "unionToNative",
    value: function unionToNative(val, udt) {
      var vec = val.vec();
      if (!vec) {
        throw new Error("".concat(JSON.stringify(val, null, 2), " is not a vec"));
      }
      if (vec.length === 0 && udt.cases.length !== 0) {
        throw new Error("".concat(val, " has length 0, but the there are at least one case in the union"));
      }
      var name = vec[0].sym().toString();
      if (vec[0].switch().value != stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvSymbol().value) {
        throw new Error("{vec[0]} is not a symbol");
      }
      var entry = udt.cases().find(findCase(name));
      if (!entry) {
        throw new Error("failed to find entry ".concat(name, " in union {udt.name().toString()}"));
      }
      var res = {
        tag: name,
        values: undefined
      };
      if (entry.switch().value === stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecUdtUnionCaseV0Kind.scSpecUdtUnionCaseTupleV0().value) {
        var tuple = entry.value();
        var ty = tuple.type();
        var values = [];
        for (var i = 0; i < ty.length; i++) {
          var v = this.scValToNative(vec[i + 1], ty[i]);
          values.push(v);
        }
        var r = {
          tag: name,
          values: values
        };
        return r;
      }
      return res;
    }
  }, {
    key: "structToNative",
    value: function structToNative(val, udt) {
      var _this6 = this,
        _val$map;
      var res = {};
      var fields = udt.fields();
      if (fields.some(isNumeric)) {
        var _val$vec;
        var r = (_val$vec = val.vec()) === null || _val$vec === void 0 ? void 0 : _val$vec.map(function (entry, i) {
          return _this6.scValToNative(entry, fields[i].type());
        });
        return r;
      }
      (_val$map = val.map()) === null || _val$map === void 0 || _val$map.forEach(function (entry, i) {
        var field = fields[i];
        res[field.name().toString()] = _this6.scValToNative(entry.val(), field.type());
      });
      return res;
    }
  }, {
    key: "enumToNative",
    value: function enumToNative(scv, udt) {
      if (scv.switch().value !== stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScValType.scvU32().value) {
        throw new Error("Enum must have a u32 value");
      }
      var num = scv.value();
      if (udt.cases().some(function (entry) {
        return entry.value() === num;
      })) {}
      return num;
    }
  }]);
  return ContractSpec;
}();
function stringToScVal(str, ty) {
  switch (ty.value) {
    case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeString().value:
      return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvString(str);
    case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeSymbol().value:
      return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvSymbol(str);
    case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecType.scSpecTypeAddress().value:
      {
        var addr = stellar_base__WEBPACK_IMPORTED_MODULE_0__.Address.fromString(str);
        return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvAddress(addr.toScAddress());
      }
    default:
      throw new TypeError("invalid type ".concat(ty.name, " specified for string value"));
  }
}
function isNumeric(field) {
  return /^\d+$/.test(field.name().toString());
}
function findCase(name) {
  return function matches(entry) {
    switch (entry.switch().value) {
      case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecUdtUnionCaseV0Kind.scSpecUdtUnionCaseTupleV0().value:
        {
          var tuple = entry.value();
          return tuple.name().toString() === name;
        }
      case stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScSpecUdtUnionCaseV0Kind.scSpecUdtUnionCaseVoidV0().value:
        {
          var void_case = entry.value();
          return void_case.name().toString() === name;
        }
      default:
        return false;
    }
  };
}
function readObj(args, input) {
  var inputName = input.name().toString();
  var entry = Object.entries(args).find(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      _ = _ref2[1];
    return name === inputName;
  });
  if (!entry) {
    throw new Error("Missing field ".concat(inputName));
  }
  return entry[1];
}

/***/ }),

/***/ 8026:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AxiosClient: () => (/* reexport safe */ _axios__WEBPACK_IMPORTED_MODULE_3__.Xu),
/* harmony export */   ContractSpec: () => (/* reexport safe */ _contract_spec__WEBPACK_IMPORTED_MODULE_1__.o),
/* harmony export */   Durability: () => (/* reexport safe */ _server__WEBPACK_IMPORTED_MODULE_2__.f$),
/* harmony export */   Server: () => (/* reexport safe */ _server__WEBPACK_IMPORTED_MODULE_2__.xF),
/* harmony export */   SorobanRpc: () => (/* reexport safe */ _soroban_rpc__WEBPACK_IMPORTED_MODULE_0__.j),
/* harmony export */   assembleTransaction: () => (/* reexport safe */ _transaction__WEBPACK_IMPORTED_MODULE_4__.O),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   parseRawEvents: () => (/* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_5__._J),
/* harmony export */   parseRawSimulation: () => (/* reexport safe */ _parsers__WEBPACK_IMPORTED_MODULE_5__.jK),
/* harmony export */   version: () => (/* reexport safe */ _axios__WEBPACK_IMPORTED_MODULE_3__.i8)
/* harmony export */ });
/* harmony import */ var _soroban_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7440);
/* harmony import */ var _contract_spec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(936);
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3155);
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7095);
/* harmony import */ var _transaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(972);
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8828);
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8625);
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(stellar_base__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in stellar_base__WEBPACK_IMPORTED_MODULE_6__) if(["default","ContractSpec","Server","Durability","AxiosClient","version","parseRawSimulation","parseRawEvents","SorobanRpc","assembleTransaction"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => stellar_base__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* module decorator */ module = __webpack_require__.hmd(module);







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (module.exports);

/***/ }),

/***/ 8828:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M0: () => (/* binding */ parseRawLedgerEntries),
/* harmony export */   NF: () => (/* binding */ parseRawSendTransaction),
/* harmony export */   _J: () => (/* binding */ parseRawEvents),
/* harmony export */   jK: () => (/* binding */ parseRawSimulation)
/* harmony export */ });
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8625);
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stellar_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _soroban_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7440);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


function parseRawSendTransaction(r) {
  var errResult = r.errorResultXdr;
  delete r.errorResultXdr;
  if (!!errResult) {
    return _objectSpread(_objectSpread({}, r), {}, {
      errorResult: stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.TransactionResult.fromXDR(errResult, 'base64')
    });
  }
  return _objectSpread({}, r);
}
function parseRawEvents(r) {
  var _r$events;
  return {
    latestLedger: r.latestLedger,
    events: ((_r$events = r.events) !== null && _r$events !== void 0 ? _r$events : []).map(function (evt) {
      var clone = _objectSpread({}, evt);
      delete clone.contractId;
      return _objectSpread(_objectSpread(_objectSpread({}, clone), evt.contractId !== '' && {
        contractId: new stellar_base__WEBPACK_IMPORTED_MODULE_0__.Contract(evt.contractId)
      }), {}, {
        topic: evt.topic.map(function (topic) {
          return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.fromXDR(topic, 'base64');
        }),
        value: stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.fromXDR(evt.value, 'base64')
      });
    })
  };
}
function parseRawLedgerEntries(raw) {
  var _raw$entries;
  return {
    latestLedger: raw.latestLedger,
    entries: ((_raw$entries = raw.entries) !== null && _raw$entries !== void 0 ? _raw$entries : []).map(function (rawEntry) {
      if (!rawEntry.key || !rawEntry.xdr) {
        throw new TypeError("invalid ledger entry: ".concat(JSON.stringify(rawEntry)));
      }
      return _objectSpread({
        lastModifiedLedgerSeq: rawEntry.lastModifiedLedgerSeq,
        key: stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.LedgerKey.fromXDR(rawEntry.key, 'base64'),
        val: stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.LedgerEntryData.fromXDR(rawEntry.xdr, 'base64')
      }, rawEntry.liveUntilLedgerSeq !== undefined && {
        liveUntilLedgerSeq: rawEntry.liveUntilLedgerSeq
      });
    })
  };
}
function parseRawSimulation(sim) {
  var _sim$events$map, _sim$events;
  var looksRaw = _soroban_rpc__WEBPACK_IMPORTED_MODULE_1__/* .SorobanRpc */ .j.isSimulationRaw(sim);
  if (!looksRaw) {
    return sim;
  }
  var base = {
    _parsed: true,
    id: sim.id,
    latestLedger: sim.latestLedger,
    events: (_sim$events$map = (_sim$events = sim.events) === null || _sim$events === void 0 ? void 0 : _sim$events.map(function (evt) {
      return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.DiagnosticEvent.fromXDR(evt, 'base64');
    })) !== null && _sim$events$map !== void 0 ? _sim$events$map : []
  };
  if (typeof sim.error === 'string') {
    return _objectSpread(_objectSpread({}, base), {}, {
      error: sim.error
    });
  }
  return parseSuccessful(sim, base);
}
function parseSuccessful(sim, partial) {
  var _sim$results$length, _sim$results;
  var success = _objectSpread(_objectSpread({}, partial), {}, {
    transactionData: new stellar_base__WEBPACK_IMPORTED_MODULE_0__.SorobanDataBuilder(sim.transactionData),
    minResourceFee: sim.minResourceFee,
    cost: sim.cost
  }, ((_sim$results$length = (_sim$results = sim.results) === null || _sim$results === void 0 ? void 0 : _sim$results.length) !== null && _sim$results$length !== void 0 ? _sim$results$length : 0 > 0) && {
    result: sim.results.map(function (row) {
      var _row$auth;
      return {
        auth: ((_row$auth = row.auth) !== null && _row$auth !== void 0 ? _row$auth : []).map(function (entry) {
          return stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.SorobanAuthorizationEntry.fromXDR(entry, 'base64');
        }),
        retval: !!row.xdr ? stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.fromXDR(row.xdr, 'base64') : stellar_base__WEBPACK_IMPORTED_MODULE_0__.xdr.ScVal.scvVoid()
      };
    })[0]
  });
  if (!sim.restorePreamble || sim.restorePreamble.transactionData === '') {
    return success;
  }
  return _objectSpread(_objectSpread({}, success), {}, {
    restorePreamble: {
      minResourceFee: sim.restorePreamble.minResourceFee,
      transactionData: new stellar_base__WEBPACK_IMPORTED_MODULE_0__.SorobanDataBuilder(sim.restorePreamble.transactionData)
    }
  });
}

/***/ }),

/***/ 3155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  f$: () => (/* binding */ Durability),
  xF: () => (/* binding */ Server)
});

// UNUSED EXPORTS: SUBMIT_TRANSACTION_TIMEOUT

// EXTERNAL MODULE: ./node_modules/urijs/src/URI.js
var URI = __webpack_require__(4998);
var URI_default = /*#__PURE__*/__webpack_require__.n(URI);
// EXTERNAL MODULE: ./node_modules/stellar-base/lib/index.js
var lib = __webpack_require__(8625);
// EXTERNAL MODULE: ./src/axios.ts
var axios = __webpack_require__(7095);
;// CONCATENATED MODULE: ./src/jsonrpc.ts
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function post(_x, _x2) {
  return _post.apply(this, arguments);
}
function _post() {
  _post = _asyncToGenerator(_regeneratorRuntime().mark(function _callee(url, method) {
    var _len,
      params,
      _key,
      response,
      _response$data,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          for (_len = _args.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            params[_key - 2] = _args[_key];
          }
          if (params && params.length < 1) {
            params = null;
          }
          _context.next = 4;
          return axios/* default */.ZP.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: method,
            params: params
          });
        case 4:
          response = _context.sent;
          if (!jsonrpc_hasOwnProperty(response.data, 'error')) {
            _context.next = 9;
            break;
          }
          throw response.data.error;
        case 9:
          return _context.abrupt("return", (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.result);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _post.apply(this, arguments);
}
function postObject(_x3, _x4, _x5) {
  return _postObject.apply(this, arguments);
}
function _postObject() {
  _postObject = _asyncToGenerator(_regeneratorRuntime().mark(function _callee2(url, method, param) {
    var response, _response$data2;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return axios/* default */.ZP.post(url, {
            jsonrpc: '2.0',
            id: 1,
            method: method,
            params: param
          });
        case 2:
          response = _context2.sent;
          if (!jsonrpc_hasOwnProperty(response.data, 'error')) {
            _context2.next = 7;
            break;
          }
          throw response.data.error;
        case 7:
          return _context2.abrupt("return", (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.result);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _postObject.apply(this, arguments);
}
function jsonrpc_hasOwnProperty(obj, prop) {
  return obj.hasOwnProperty(prop);
}
// EXTERNAL MODULE: ./src/soroban_rpc.ts
var soroban_rpc = __webpack_require__(7440);
// EXTERNAL MODULE: ./src/transaction.ts
var src_transaction = __webpack_require__(972);
// EXTERNAL MODULE: ./src/parsers.ts
var parsers = __webpack_require__(8828);
;// CONCATENATED MODULE: ./src/server.ts
function server_typeof(o) { "@babel/helpers - typeof"; return server_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, server_typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function server_regeneratorRuntime() { "use strict"; server_regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == server_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(server_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function server_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function server_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { server_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { server_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return server_typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (server_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (server_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







var SUBMIT_TRANSACTION_TIMEOUT = (/* unused pure expression or super */ null && (60 * 1000));
var Durability = function (Durability) {
  Durability["Temporary"] = "temporary";
  Durability["Persistent"] = "persistent";
  return Durability;
}({});
var Server = function () {
  function Server(serverURL) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Server);
    this.serverURL = URI_default()(serverURL);
    if (opts.headers && Object.keys(opts.headers).length === 0) {
      axios/* default */.ZP.interceptors.request.use(function (config) {
        config.headers = Object.assign(config.headers, opts.headers);
        return config;
      });
    }
    if (this.serverURL.protocol() !== 'https' && !opts.allowHttp) {
      throw new Error("Cannot connect to insecure Soroban RPC server if `allowHttp` isn't set");
    }
  }
  _createClass(Server, [{
    key: "getAccount",
    value: (function () {
      var _getAccount = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee(address) {
        var ledgerKey, resp, accountEntry;
        return server_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              ledgerKey = lib.xdr.LedgerKey.account(new lib.xdr.LedgerKeyAccount({
                accountId: lib.Keypair.fromPublicKey(address).xdrPublicKey()
              }));
              _context.next = 3;
              return this.getLedgerEntries(ledgerKey);
            case 3:
              resp = _context.sent;
              if (!(resp.entries.length === 0)) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", Promise.reject({
                code: 404,
                message: "Account not found: ".concat(address)
              }));
            case 6:
              accountEntry = resp.entries[0].val.account();
              return _context.abrupt("return", new lib.Account(address, accountEntry.seqNum().toString()));
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getAccount(_x) {
        return _getAccount.apply(this, arguments);
      }
      return getAccount;
    }())
  }, {
    key: "getHealth",
    value: (function () {
      var _getHealth = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee2() {
        return server_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", post(this.serverURL.toString(), 'getHealth'));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getHealth() {
        return _getHealth.apply(this, arguments);
      }
      return getHealth;
    }())
  }, {
    key: "getContractData",
    value: (function () {
      var _getContractData = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee3(contract, key) {
        var durability,
          scAddress,
          xdrDurability,
          contractKey,
          _args3 = arguments;
        return server_regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              durability = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : Durability.Persistent;
              if (!(typeof contract === 'string')) {
                _context3.next = 5;
                break;
              }
              scAddress = new lib.Contract(contract).address().toScAddress();
              _context3.next = 14;
              break;
            case 5:
              if (!(contract instanceof lib.Address)) {
                _context3.next = 9;
                break;
              }
              scAddress = contract.toScAddress();
              _context3.next = 14;
              break;
            case 9:
              if (!(contract instanceof lib.Contract)) {
                _context3.next = 13;
                break;
              }
              scAddress = contract.address().toScAddress();
              _context3.next = 14;
              break;
            case 13:
              throw new TypeError("unknown contract type: ".concat(contract));
            case 14:
              _context3.t0 = durability;
              _context3.next = _context3.t0 === Durability.Temporary ? 17 : _context3.t0 === Durability.Persistent ? 19 : 21;
              break;
            case 17:
              xdrDurability = lib.xdr.ContractDataDurability.temporary();
              return _context3.abrupt("break", 22);
            case 19:
              xdrDurability = lib.xdr.ContractDataDurability.persistent();
              return _context3.abrupt("break", 22);
            case 21:
              throw new TypeError("invalid durability: ".concat(durability));
            case 22:
              contractKey = lib.xdr.LedgerKey.contractData(new lib.xdr.LedgerKeyContractData({
                key: key,
                contract: scAddress,
                durability: xdrDurability
              }));
              return _context3.abrupt("return", this.getLedgerEntries(contractKey).then(function (r) {
                if (r.entries.length === 0) {
                  return Promise.reject({
                    code: 404,
                    message: "Contract data not found. Contract: ".concat(lib.Address.fromScAddress(scAddress).toString(), ", Key: ").concat(key.toXDR('base64'), ", Durability: ").concat(durability)
                  });
                }
                return r.entries[0];
              }));
            case 24:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getContractData(_x2, _x3) {
        return _getContractData.apply(this, arguments);
      }
      return getContractData;
    }())
  }, {
    key: "getLedgerEntries",
    value: (function () {
      var _getLedgerEntries2 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee4() {
        var _args4 = arguments;
        return server_regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", this._getLedgerEntries.apply(this, _args4).then(parsers/* parseRawLedgerEntries */.M0));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getLedgerEntries() {
        return _getLedgerEntries2.apply(this, arguments);
      }
      return getLedgerEntries;
    }())
  }, {
    key: "_getLedgerEntries",
    value: function () {
      var _getLedgerEntries3 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee5() {
        var _len,
          keys,
          _key,
          _args5 = arguments;
        return server_regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              for (_len = _args5.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
                keys[_key] = _args5[_key];
              }
              return _context5.abrupt("return", post(this.serverURL.toString(), 'getLedgerEntries', keys.map(function (k) {
                return k.toXDR('base64');
              })));
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function _getLedgerEntries() {
        return _getLedgerEntries3.apply(this, arguments);
      }
      return _getLedgerEntries;
    }()
  }, {
    key: "getTransaction",
    value: (function () {
      var _getTransaction2 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee6(hash) {
        return server_regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", this._getTransaction(hash).then(function (raw) {
                var successInfo = {};
                if (raw.status === soroban_rpc/* SorobanRpc */.j.GetTransactionStatus.SUCCESS) {
                  var _meta$v3$sorobanMeta;
                  var meta = lib.xdr.TransactionMeta.fromXDR(raw.resultMetaXdr, 'base64');
                  successInfo = _objectSpread({
                    ledger: raw.ledger,
                    createdAt: raw.createdAt,
                    applicationOrder: raw.applicationOrder,
                    feeBump: raw.feeBump,
                    envelopeXdr: lib.xdr.TransactionEnvelope.fromXDR(raw.envelopeXdr, 'base64'),
                    resultXdr: lib.xdr.TransactionResult.fromXDR(raw.resultXdr, 'base64'),
                    resultMetaXdr: meta
                  }, meta.switch() === 3 && meta.v3().sorobanMeta() !== null && {
                    returnValue: (_meta$v3$sorobanMeta = meta.v3().sorobanMeta()) === null || _meta$v3$sorobanMeta === void 0 ? void 0 : _meta$v3$sorobanMeta.returnValue()
                  });
                }
                var result = _objectSpread({
                  status: raw.status,
                  latestLedger: raw.latestLedger,
                  latestLedgerCloseTime: raw.latestLedgerCloseTime,
                  oldestLedger: raw.oldestLedger,
                  oldestLedgerCloseTime: raw.oldestLedgerCloseTime
                }, successInfo);
                return result;
              }));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function getTransaction(_x4) {
        return _getTransaction2.apply(this, arguments);
      }
      return getTransaction;
    }())
  }, {
    key: "_getTransaction",
    value: function () {
      var _getTransaction3 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee7(hash) {
        return server_regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", post(this.serverURL.toString(), 'getTransaction', hash));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function _getTransaction(_x5) {
        return _getTransaction3.apply(this, arguments);
      }
      return _getTransaction;
    }()
  }, {
    key: "getEvents",
    value: (function () {
      var _getEvents2 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee8(request) {
        return server_regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", this._getEvents(request).then(parsers/* parseRawEvents */._J));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function getEvents(_x6) {
        return _getEvents2.apply(this, arguments);
      }
      return getEvents;
    }())
  }, {
    key: "_getEvents",
    value: function () {
      var _getEvents3 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee9(request) {
        var _request$filters;
        return server_regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", postObject(this.serverURL.toString(), 'getEvents', _objectSpread({
                filters: (_request$filters = request.filters) !== null && _request$filters !== void 0 ? _request$filters : [],
                pagination: _objectSpread(_objectSpread({}, request.cursor && {
                  cursor: request.cursor
                }), request.limit && {
                  limit: request.limit
                })
              }, request.startLedger && {
                startLedger: request.startLedger
              })));
            case 1:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function _getEvents(_x7) {
        return _getEvents3.apply(this, arguments);
      }
      return _getEvents;
    }()
  }, {
    key: "getNetwork",
    value: (function () {
      var _getNetwork = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee10() {
        return server_regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return post(this.serverURL.toString(), 'getNetwork');
            case 2:
              return _context10.abrupt("return", _context10.sent);
            case 3:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function getNetwork() {
        return _getNetwork.apply(this, arguments);
      }
      return getNetwork;
    }())
  }, {
    key: "getLatestLedger",
    value: (function () {
      var _getLatestLedger = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee11() {
        return server_regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", post(this.serverURL.toString(), 'getLatestLedger'));
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function getLatestLedger() {
        return _getLatestLedger.apply(this, arguments);
      }
      return getLatestLedger;
    }())
  }, {
    key: "simulateTransaction",
    value: (function () {
      var _simulateTransaction2 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee12(transaction) {
        return server_regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", this._simulateTransaction(transaction).then(parsers/* parseRawSimulation */.jK));
            case 1:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function simulateTransaction(_x8) {
        return _simulateTransaction2.apply(this, arguments);
      }
      return simulateTransaction;
    }())
  }, {
    key: "_simulateTransaction",
    value: function () {
      var _simulateTransaction3 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee13(transaction) {
        return server_regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", post(this.serverURL.toString(), 'simulateTransaction', transaction.toXDR()));
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function _simulateTransaction(_x9) {
        return _simulateTransaction3.apply(this, arguments);
      }
      return _simulateTransaction;
    }()
  }, {
    key: "prepareTransaction",
    value: (function () {
      var _prepareTransaction = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee14(transaction, networkPassphrase) {
        var _yield$Promise$all, _yield$Promise$all2, passphrase, simResponse;
        return server_regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return Promise.all([networkPassphrase ? Promise.resolve({
                passphrase: networkPassphrase
              }) : this.getNetwork(), this.simulateTransaction(transaction)]);
            case 2:
              _yield$Promise$all = _context14.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              passphrase = _yield$Promise$all2[0].passphrase;
              simResponse = _yield$Promise$all2[1];
              if (!soroban_rpc/* SorobanRpc */.j.isSimulationError(simResponse)) {
                _context14.next = 8;
                break;
              }
              throw simResponse.error;
            case 8:
              if (simResponse.result) {
                _context14.next = 10;
                break;
              }
              throw new Error('transaction simulation failed');
            case 10:
              return _context14.abrupt("return", (0,src_transaction/* assembleTransaction */.O)(transaction, passphrase, simResponse).build());
            case 11:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function prepareTransaction(_x10, _x11) {
        return _prepareTransaction.apply(this, arguments);
      }
      return prepareTransaction;
    }())
  }, {
    key: "sendTransaction",
    value: (function () {
      var _sendTransaction2 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee15(transaction) {
        return server_regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              return _context15.abrupt("return", this._sendTransaction(transaction).then(parsers/* parseRawSendTransaction */.NF));
            case 1:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function sendTransaction(_x12) {
        return _sendTransaction2.apply(this, arguments);
      }
      return sendTransaction;
    }())
  }, {
    key: "_sendTransaction",
    value: function () {
      var _sendTransaction3 = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee16(transaction) {
        return server_regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", post(this.serverURL.toString(), 'sendTransaction', transaction.toXDR()));
            case 1:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function _sendTransaction(_x13) {
        return _sendTransaction3.apply(this, arguments);
      }
      return _sendTransaction;
    }()
  }, {
    key: "requestAirdrop",
    value: (function () {
      var _requestAirdrop = server_asyncToGenerator(server_regeneratorRuntime().mark(function _callee17(address, friendbotUrl) {
        var account, response, meta, sequence, _error$response, _error$response$detai;
        return server_regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              account = typeof address === 'string' ? address : address.accountId();
              _context17.t0 = friendbotUrl;
              if (_context17.t0) {
                _context17.next = 6;
                break;
              }
              _context17.next = 5;
              return this.getNetwork();
            case 5:
              _context17.t0 = _context17.sent.friendbotUrl;
            case 6:
              friendbotUrl = _context17.t0;
              if (friendbotUrl) {
                _context17.next = 9;
                break;
              }
              throw new Error('No friendbot URL configured for current network');
            case 9:
              _context17.prev = 9;
              _context17.next = 12;
              return axios/* default */.ZP.post("".concat(friendbotUrl, "?addr=").concat(encodeURIComponent(account)));
            case 12:
              response = _context17.sent;
              meta = lib.xdr.TransactionMeta.fromXDR(response.data.result_meta_xdr, 'base64');
              sequence = findCreatedAccountSequenceInTransactionMeta(meta);
              return _context17.abrupt("return", new lib.Account(account, sequence));
            case 18:
              _context17.prev = 18;
              _context17.t1 = _context17["catch"](9);
              if (!(((_error$response = _context17.t1.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 400)) {
                _context17.next = 23;
                break;
              }
              if (!((_error$response$detai = _context17.t1.response.detail) !== null && _error$response$detai !== void 0 && _error$response$detai.includes('createAccountAlreadyExist'))) {
                _context17.next = 23;
                break;
              }
              return _context17.abrupt("return", this.getAccount(account));
            case 23:
              throw _context17.t1;
            case 24:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this, [[9, 18]]);
      }));
      function requestAirdrop(_x14, _x15) {
        return _requestAirdrop.apply(this, arguments);
      }
      return requestAirdrop;
    }())
  }]);
  return Server;
}();
function findCreatedAccountSequenceInTransactionMeta(meta) {
  var operations = [];
  switch (meta.switch()) {
    case 0:
      operations = meta.operations();
      break;
    case 1:
    case 2:
    case 3:
      operations = meta.value().operations();
      break;
    default:
      throw new Error('Unexpected transaction meta switch value');
  }
  var _iterator = _createForOfIteratorHelper(operations),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var op = _step.value;
      var _iterator2 = _createForOfIteratorHelper(op.changes()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var c = _step2.value;
          if (c.switch() !== lib.xdr.LedgerEntryChangeType.ledgerEntryCreated()) {
            continue;
          }
          var data = c.created().data();
          if (data.switch() !== lib.xdr.LedgerEntryType.account()) {
            continue;
          }
          return data.account().seqNum().toString();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  throw new Error('No account created in transaction');
}

/***/ }),

/***/ 7440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ SorobanRpc)
/* harmony export */ });
var SorobanRpc;
(function (_SorobanRpc) {
  var GetTransactionStatus = function (GetTransactionStatus) {
    GetTransactionStatus["SUCCESS"] = "SUCCESS";
    GetTransactionStatus["NOT_FOUND"] = "NOT_FOUND";
    GetTransactionStatus["FAILED"] = "FAILED";
    return GetTransactionStatus;
  }({});
  _SorobanRpc.GetTransactionStatus = GetTransactionStatus;
  function isSimulationError(sim) {
    return 'error' in sim;
  }
  _SorobanRpc.isSimulationError = isSimulationError;
  function isSimulationSuccess(sim) {
    return 'transactionData' in sim;
  }
  _SorobanRpc.isSimulationSuccess = isSimulationSuccess;
  function isSimulationRestore(sim) {
    return isSimulationSuccess(sim) && 'restorePreamble' in sim && !!sim.restorePreamble.transactionData;
  }
  _SorobanRpc.isSimulationRestore = isSimulationRestore;
  function isSimulationRaw(sim) {
    return !sim._parsed;
  }
  _SorobanRpc.isSimulationRaw = isSimulationRaw;
})(SorobanRpc || (SorobanRpc = {}));

/***/ }),

/***/ 972:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ assembleTransaction)
/* harmony export */ });
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8625);
/* harmony import */ var stellar_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stellar_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _soroban_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7440);
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8828);



function assembleTransaction(raw, networkPassphrase, simulation) {
  var _invokeOp$auth;
  if ('innerTransaction' in raw) {
    return assembleTransaction(raw.innerTransaction, networkPassphrase, simulation);
  }
  if (!isSorobanTransaction(raw)) {
    throw new TypeError('unsupported transaction: must contain exactly one ' + 'invokeHostFunction, extendFootprintTtl, or restoreFootprint ' + 'operation');
  }
  var success = (0,_parsers__WEBPACK_IMPORTED_MODULE_2__/* .parseRawSimulation */ .jK)(simulation);
  if (!_soroban_rpc__WEBPACK_IMPORTED_MODULE_1__/* .SorobanRpc */ .j.isSimulationSuccess(success)) {
    throw new Error("simulation incorrect: ".concat(JSON.stringify(success)));
  }
  var classicFeeNum = parseInt(raw.fee) || 0;
  var minResourceFeeNum = parseInt(success.minResourceFee) || 0;
  var txnBuilder = stellar_base__WEBPACK_IMPORTED_MODULE_0__.TransactionBuilder.cloneFrom(raw, {
    fee: (classicFeeNum + minResourceFeeNum).toString(),
    sorobanData: success.transactionData.build(),
    networkPassphrase: networkPassphrase
  });
  switch (raw.operations[0].type) {
    case 'invokeHostFunction':
      txnBuilder.clearOperations();
      var invokeOp = raw.operations[0];
      var existingAuth = (_invokeOp$auth = invokeOp.auth) !== null && _invokeOp$auth !== void 0 ? _invokeOp$auth : [];
      txnBuilder.addOperation(stellar_base__WEBPACK_IMPORTED_MODULE_0__.Operation.invokeHostFunction({
        source: invokeOp.source,
        func: invokeOp.func,
        auth: existingAuth.length > 0 ? existingAuth : success.result.auth
      }));
      break;
  }
  return txnBuilder;
}
function isSorobanTransaction(tx) {
  if (tx.operations.length !== 1) {
    return false;
  }
  switch (tx.operations[0].type) {
    case 'invokeHostFunction':
    case 'extendFootprintTtl':
    case 'restoreFootprint':
      return true;
    default:
      return false;
  }
}

/***/ }),

/***/ 6906:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Generate a character map.
 * @param {string} alphabet e.g. "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
 * @param {object} mappings map overrides from key to value
 * @method
 */

var charmap = function (alphabet, mappings) {
  mappings || (mappings = {});
  alphabet.split("").forEach(function (c, i) {
    if (!(c in mappings)) mappings[c] = i;
  });
  return mappings;
}

/**
 * The RFC 4648 base 32 alphabet and character map.
 * @see {@link https://tools.ietf.org/html/rfc4648}
 */

var rfc4648 = {
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  charmap: {
    0: 14,
    1: 8
  }
};

rfc4648.charmap = charmap(rfc4648.alphabet, rfc4648.charmap);

/**
 * The Crockford base 32 alphabet and character map.
 * @see {@link http://www.crockford.com/wrmg/base32.html}
 */

var crockford = {
  alphabet: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
  charmap: {
    O: 0,
    I: 1,
    L: 1
  }
};

crockford.charmap = charmap(crockford.alphabet, crockford.charmap);

/**
 * base32hex
 * @see {@link https://en.wikipedia.org/wiki/Base32#base32hex}
 */

var base32hex = {
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  charmap: {}
};

base32hex.charmap = charmap(base32hex.alphabet, base32hex.charmap);

/**
 * Create a new `Decoder` with the given options.
 *
 * @param {object} [options]
 *   @param {string} [type] Supported Base-32 variants are "rfc4648" and
 *     "crockford".
 *   @param {object} [charmap] Override the character map used in decoding.
 * @constructor
 */

function Decoder (options) {
  this.buf = [];
  this.shift = 8;
  this.carry = 0;

  if (options) {

    switch (options.type) {
      case "rfc4648":
        this.charmap = exports.rfc4648.charmap;
        break;
      case "crockford":
        this.charmap = exports.crockford.charmap;
        break;
      case "base32hex":
        this.charmap = exports.base32hex.charmap;
        break;
      default:
        throw new Error("invalid type");
    }

    if (options.charmap) this.charmap = options.charmap;
  }
}

/**
 * The default character map coresponds to RFC4648.
 */

Decoder.prototype.charmap = rfc4648.charmap;

/**
 * Decode a string, continuing from the previous state.
 *
 * @param {string} str
 * @return {Decoder} this
 */

Decoder.prototype.write = function (str) {
  var charmap = this.charmap;
  var buf = this.buf;
  var shift = this.shift;
  var carry = this.carry;

  // decode string
  str.toUpperCase().split("").forEach(function (char) {

    // ignore padding
    if (char == "=") return;

    // lookup symbol
    var symbol = charmap[char] & 0xff;

    // 1: 00000 000
    // 2:          00 00000 0
    // 3:                    0000 0000
    // 4:                             0 00000 00
    // 5:                                       000 00000
    // 6:                                                00000 000
    // 7:                                                         00 00000 0

    shift -= 5;
    if (shift > 0) {
      carry |= symbol << shift;
    } else if (shift < 0) {
      buf.push(carry | (symbol >> -shift));
      shift += 8;
      carry = (symbol << shift) & 0xff;
    } else {
      buf.push(carry | symbol);
      shift = 8;
      carry = 0;
    }
  });

  // save state
  this.shift = shift;
  this.carry = carry;

  // for chaining
  return this;
};

/**
 * Finish decoding.
 *
 * @param {string} [str] The final string to decode.
 * @return {Array} Decoded byte array.
 */

Decoder.prototype.finalize = function (str) {
  if (str) {
    this.write(str);
  }
  if (this.shift !== 8 && this.carry !== 0) {
    this.buf.push(this.carry);
    this.shift = 8;
    this.carry = 0;
  }
  return this.buf;
};

/**
 * Create a new `Encoder` with the given options.
 *
 * @param {object} [options]
 *   @param {string} [type] Supported Base-32 variants are "rfc4648" and
 *     "crockford".
 *   @param {object} [alphabet] Override the alphabet used in encoding.
 * @constructor
 */

function Encoder (options) {
  this.buf = "";
  this.shift = 3;
  this.carry = 0;

  if (options) {

    switch (options.type) {
      case "rfc4648":
        this.alphabet = exports.rfc4648.alphabet;
        break;
      case "crockford":
        this.alphabet = exports.crockford.alphabet;
        break;
      case "base32hex":
        this.alphabet = exports.base32hex.alphabet;
        break;
      default:
        throw new Error("invalid type");
    }

    if (options.alphabet) this.alphabet = options.alphabet;
    else if (options.lc) this.alphabet = this.alphabet.toLowerCase();
  }
}

/**
 * The default alphabet coresponds to RFC4648.
 */

Encoder.prototype.alphabet = rfc4648.alphabet;

/**
 * Encode a byte array, continuing from the previous state.
 *
 * @param {byte[]} buf The byte array to encode.
 * @return {Encoder} this
 */

Encoder.prototype.write = function (buf) {
  var shift = this.shift;
  var carry = this.carry;
  var symbol;
  var byte;
  var i;

  // encode each byte in buf
  for (i = 0; i < buf.length; i++) {
    byte = buf[i];

    // 1: 00000 000
    // 2:          00 00000 0
    // 3:                    0000 0000
    // 4:                             0 00000 00
    // 5:                                       000 00000
    // 6:                                                00000 000
    // 7:                                                         00 00000 0

    symbol = carry | (byte >> shift);
    this.buf += this.alphabet[symbol & 0x1f];

    if (shift > 5) {
      shift -= 5;
      symbol = byte >> shift;
      this.buf += this.alphabet[symbol & 0x1f];
    }

    shift = 5 - shift;
    carry = byte << shift;
    shift = 8 - shift;
  }

  // save state
  this.shift = shift;
  this.carry = carry;

  // for chaining
  return this;
};

/**
 * Finish encoding.
 *
 * @param {byte[]} [buf] The final byte array to encode.
 * @return {string} The encoded byte array.
 */

Encoder.prototype.finalize = function (buf) {
  if (buf) {
    this.write(buf);
  }
  if (this.shift !== 3) {
    this.buf += this.alphabet[this.carry & 0x1f];
    this.shift = 3;
    this.carry = 0;
  }
  return this.buf;
};

/**
 * Convenience encoder.
 *
 * @param {byte[]} buf The byte array to encode.
 * @param {object} [options] Options to pass to the encoder.
 * @return {string} The encoded string.
 */

exports.encode = function (buf, options) {
  return new Encoder(options).finalize(buf);
};

/**
 * Convenience decoder.
 *
 * @param {string} str The string to decode.
 * @param {object} [options] Options to pass to the decoder.
 * @return {byte[]} The decoded byte array.
 */

exports.decode = function (str, options) {
  return new Decoder(options).finalize(str);
};

// Exports.
exports.Decoder = Decoder;
exports.Encoder = Encoder;
exports.charmap = charmap;
exports.crockford = crockford;
exports.rfc4648 = rfc4648;
exports.base32hex = base32hex;


/***/ }),

/***/ 9742:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 4431:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;;(function (globalObject) {
  'use strict';

/*
 *      bignumber.js v9.1.2
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


  var BigNumber,
    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    mathceil = Math.ceil,
    mathfloor = Math.floor,

    bignumberError = '[BigNumber Error] ',
    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

    BASE = 1e14,
    LOG_BASE = 14,
    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    SQRT_BASE = 1e7,

    // EDITABLE
    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
    MAX = 1E9;                                   // 0 to MAX_INT32


  /*
   * Create and return a BigNumber constructor.
   */
  function clone(configObject) {
    var div, convertBase, parseNumeric,
      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
      ONE = new BigNumber(1),


      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


      // The default values below must be integers within the inclusive ranges stated.
      // The values can also be changed at run-time using BigNumber.set.

      // The maximum number of decimal places for operations involving division.
      DECIMAL_PLACES = 20,                     // 0 to MAX

      // The rounding mode used when rounding to the above decimal places, and when using
      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
      // UP         0 Away from zero.
      // DOWN       1 Towards zero.
      // CEIL       2 Towards +Infinity.
      // FLOOR      3 Towards -Infinity.
      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
      ROUNDING_MODE = 4,                       // 0 to 8

      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

      // The exponent value at and beneath which toString returns exponential notation.
      // Number type: -7
      TO_EXP_NEG = -7,                         // 0 to -MAX

      // The exponent value at and above which toString returns exponential notation.
      // Number type: 21
      TO_EXP_POS = 21,                         // 0 to MAX

      // RANGE : [MIN_EXP, MAX_EXP]

      // The minimum exponent value, beneath which underflow to zero occurs.
      // Number type: -324  (5e-324)
      MIN_EXP = -1e7,                          // -1 to -MAX

      // The maximum exponent value, above which overflow to Infinity occurs.
      // Number type:  308  (1.7976931348623157e+308)
      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
      MAX_EXP = 1e7,                           // 1 to MAX

      // Whether to use cryptographically-secure random number generation, if available.
      CRYPTO = false,                          // true or false

      // The modulo mode used when calculating the modulus: a mod n.
      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
      // The remainder (r) is calculated as: r = a - n * q.
      //
      // UP        0 The remainder is positive if the dividend is negative, else is negative.
      // DOWN      1 The remainder has the same sign as the dividend.
      //             This modulo mode is commonly known as 'truncated division' and is
      //             equivalent to (a % n) in JavaScript.
      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
      //             The remainder is always positive.
      //
      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
      // modes are commonly used for the modulus operation.
      // Although the other rounding modes can also be used, they may not give useful results.
      MODULO_MODE = 1,                         // 0 to 9

      // The maximum number of significant digits of the result of the exponentiatedBy operation.
      // If POW_PRECISION is 0, there will be unlimited significant digits.
      POW_PRECISION = 0,                       // 0 to MAX

      // The format specification used by the BigNumber.prototype.toFormat method.
      FORMAT = {
        prefix: '',
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ',',
        decimalSeparator: '.',
        fractionGroupSize: 0,
        fractionGroupSeparator: '\xA0',        // non-breaking space
        suffix: ''
      },

      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
      // '-', '.', whitespace, or repeated character.
      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
      alphabetHasNormalDecimalDigits = true;


    //------------------------------------------------------------------------------------------


    // CONSTRUCTOR


    /*
     * The BigNumber constructor and exported function.
     * Create and return a new instance of a BigNumber object.
     *
     * v {number|string|BigNumber} A numeric value.
     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
     */
    function BigNumber(v, b) {
      var alphabet, c, caseChanged, e, i, isNum, len, str,
        x = this;

      // Enable constructor call without `new`.
      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

      if (b == null) {

        if (v && v._isBigNumber === true) {
          x.s = v.s;

          if (!v.c || v.e > MAX_EXP) {
            x.c = x.e = null;
          } else if (v.e < MIN_EXP) {
            x.c = [x.e = 0];
          } else {
            x.e = v.e;
            x.c = v.c.slice();
          }

          return;
        }

        if ((isNum = typeof v == 'number') && v * 0 == 0) {

          // Use `1 / n` to handle minus zero also.
          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

          // Fast path for integers, where n < 2147483648 (2**31).
          if (v === ~~v) {
            for (e = 0, i = v; i >= 10; i /= 10, e++);

            if (e > MAX_EXP) {
              x.c = x.e = null;
            } else {
              x.e = e;
              x.c = [v];
            }

            return;
          }

          str = String(v);
        } else {

          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
        }

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

        // Exponential form?
        if ((i = str.search(/e/i)) > 0) {

          // Determine exponent.
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {

          // Integer.
          e = str.length;
        }

      } else {

        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
        intCheck(b, 2, ALPHABET.length, 'Base');

        // Allow exponential notation to be used with base 10 argument, while
        // also rounding to DECIMAL_PLACES as with other bases.
        if (b == 10 && alphabetHasNormalDecimalDigits) {
          x = new BigNumber(v);
          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
        }

        str = String(v);

        if (isNum = typeof v == 'number') {

          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
            throw Error
             (tooManyDigits + v);
          }
        } else {
          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
        }

        alphabet = ALPHABET.slice(0, b);
        e = i = 0;

        // Check that str is a valid base b number.
        // Don't use RegExp, so alphabet can contain special characters.
        for (len = str.length; i < len; i++) {
          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
            if (c == '.') {

              // If '.' is not the first character and it has not be found before.
              if (i > e) {
                e = len;
                continue;
              }
            } else if (!caseChanged) {

              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                  str == str.toLowerCase() && (str = str.toUpperCase())) {
                caseChanged = true;
                i = -1;
                e = 0;
                continue;
              }
            }

            return parseNumeric(x, String(v), isNum, b);
          }
        }

        // Prevent later check for length on converted number.
        isNum = false;
        str = convertBase(str, b, 10, x.s);

        // Decimal point?
        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
        else e = str.length;
      }

      // Determine leading zeros.
      for (i = 0; str.charCodeAt(i) === 48; i++);

      // Determine trailing zeros.
      for (len = str.length; str.charCodeAt(--len) === 48;);

      if (str = str.slice(i, ++len)) {
        len -= i;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (isNum && BigNumber.DEBUG &&
          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
            throw Error
             (tooManyDigits + (x.s * v));
        }

         // Overflow?
        if ((e = e - i - 1) > MAX_EXP) {

          // Infinity.
          x.c = x.e = null;

        // Underflow?
        } else if (e < MIN_EXP) {

          // Zero.
          x.c = [x.e = 0];
        } else {
          x.e = e;
          x.c = [];

          // Transform base

          // e is the base 10 exponent.
          // i is where to slice str to get the first element of the coefficient array.
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;  // i < 1

          if (i < len) {
            if (i) x.c.push(+str.slice(0, i));

            for (len -= LOG_BASE; i < len;) {
              x.c.push(+str.slice(i, i += LOG_BASE));
            }

            i = LOG_BASE - (str = str.slice(i)).length;
          } else {
            i -= len;
          }

          for (; i--; str += '0');
          x.c.push(+str);
        }
      } else {

        // Zero.
        x.c = [x.e = 0];
      }
    }


    // CONSTRUCTOR PROPERTIES


    BigNumber.clone = clone;

    BigNumber.ROUND_UP = 0;
    BigNumber.ROUND_DOWN = 1;
    BigNumber.ROUND_CEIL = 2;
    BigNumber.ROUND_FLOOR = 3;
    BigNumber.ROUND_HALF_UP = 4;
    BigNumber.ROUND_HALF_DOWN = 5;
    BigNumber.ROUND_HALF_EVEN = 6;
    BigNumber.ROUND_HALF_CEIL = 7;
    BigNumber.ROUND_HALF_FLOOR = 8;
    BigNumber.EUCLID = 9;


    /*
     * Configure infrequently-changing library-wide settings.
     *
     * Accept an object with the following optional properties (if the value of a property is
     * a number, it must be an integer within the inclusive range stated):
     *
     *   DECIMAL_PLACES   {number}           0 to MAX
     *   ROUNDING_MODE    {number}           0 to 8
     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
     *   CRYPTO           {boolean}          true or false
     *   MODULO_MODE      {number}           0 to 9
     *   POW_PRECISION       {number}           0 to MAX
     *   ALPHABET         {string}           A string of two or more unique characters which does
     *                                       not contain '.'.
     *   FORMAT           {object}           An object with some of the following properties:
     *     prefix                 {string}
     *     groupSize              {number}
     *     secondaryGroupSize     {number}
     *     groupSeparator         {string}
     *     decimalSeparator       {string}
     *     fractionGroupSize      {number}
     *     fractionGroupSeparator {string}
     *     suffix                 {string}
     *
     * (The values assigned to the above FORMAT object properties are not checked for validity.)
     *
     * E.g.
     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
     *
     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
     *
     * Return an object with the properties current values.
     */
    BigNumber.config = BigNumber.set = function (obj) {
      var p, v;

      if (obj != null) {

        if (typeof obj == 'object') {

          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            DECIMAL_PLACES = v;
          }

          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
            v = obj[p];
            intCheck(v, 0, 8, p);
            ROUNDING_MODE = v;
          }

          // EXPONENTIAL_AT {number|number[]}
          // Integer, -MAX to MAX inclusive or
          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, 0, p);
              intCheck(v[1], 0, MAX, p);
              TO_EXP_NEG = v[0];
              TO_EXP_POS = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
            }
          }

          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
          if (obj.hasOwnProperty(p = 'RANGE')) {
            v = obj[p];
            if (v && v.pop) {
              intCheck(v[0], -MAX, -1, p);
              intCheck(v[1], 1, MAX, p);
              MIN_EXP = v[0];
              MAX_EXP = v[1];
            } else {
              intCheck(v, -MAX, MAX, p);
              if (v) {
                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
              } else {
                throw Error
                 (bignumberError + p + ' cannot be zero: ' + v);
              }
            }
          }

          // CRYPTO {boolean} true or false.
          // '[BigNumber Error] CRYPTO not true or false: {v}'
          // '[BigNumber Error] crypto unavailable'
          if (obj.hasOwnProperty(p = 'CRYPTO')) {
            v = obj[p];
            if (v === !!v) {
              if (v) {
                if (typeof crypto != 'undefined' && crypto &&
                 (crypto.getRandomValues || crypto.randomBytes)) {
                  CRYPTO = v;
                } else {
                  CRYPTO = !v;
                  throw Error
                   (bignumberError + 'crypto unavailable');
                }
              } else {
                CRYPTO = v;
              }
            } else {
              throw Error
               (bignumberError + p + ' not true or false: ' + v);
            }
          }

          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
            v = obj[p];
            intCheck(v, 0, 9, p);
            MODULO_MODE = v;
          }

          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
            v = obj[p];
            intCheck(v, 0, MAX, p);
            POW_PRECISION = v;
          }

          // FORMAT {object}
          // '[BigNumber Error] FORMAT not an object: {v}'
          if (obj.hasOwnProperty(p = 'FORMAT')) {
            v = obj[p];
            if (typeof v == 'object') FORMAT = v;
            else throw Error
             (bignumberError + p + ' not an object: ' + v);
          }

          // ALPHABET {string}
          // '[BigNumber Error] ALPHABET invalid: {v}'
          if (obj.hasOwnProperty(p = 'ALPHABET')) {
            v = obj[p];

            // Disallow if less than two characters,
            // or if it contains '+', '-', '.', whitespace, or a repeated character.
            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
              alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
              ALPHABET = v;
            } else {
              throw Error
               (bignumberError + p + ' invalid: ' + v);
            }
          }

        } else {

          // '[BigNumber Error] Object expected: {v}'
          throw Error
           (bignumberError + 'Object expected: ' + obj);
        }
      }

      return {
        DECIMAL_PLACES: DECIMAL_PLACES,
        ROUNDING_MODE: ROUNDING_MODE,
        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
        RANGE: [MIN_EXP, MAX_EXP],
        CRYPTO: CRYPTO,
        MODULO_MODE: MODULO_MODE,
        POW_PRECISION: POW_PRECISION,
        FORMAT: FORMAT,
        ALPHABET: ALPHABET
      };
    };


    /*
     * Return true if v is a BigNumber instance, otherwise return false.
     *
     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
     *
     * v {any}
     *
     * '[BigNumber Error] Invalid BigNumber: {v}'
     */
    BigNumber.isBigNumber = function (v) {
      if (!v || v._isBigNumber !== true) return false;
      if (!BigNumber.DEBUG) return true;

      var i, n,
        c = v.c,
        e = v.e,
        s = v.s;

      out: if ({}.toString.call(c) == '[object Array]') {

        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

          // If the first element is zero, the BigNumber value must be zero.
          if (c[0] === 0) {
            if (e === 0 && c.length === 1) return true;
            break out;
          }

          // Calculate number of digits that c[0] should have, based on the exponent.
          i = (e + 1) % LOG_BASE;
          if (i < 1) i += LOG_BASE;

          // Calculate number of digits of c[0].
          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
          if (String(c[0]).length == i) {

            for (i = 0; i < c.length; i++) {
              n = c[i];
              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
            }

            // Last element cannot be zero, unless it is the only element.
            if (n !== 0) return true;
          }
        }

      // Infinity/NaN
      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
        return true;
      }

      throw Error
        (bignumberError + 'Invalid BigNumber: ' + v);
    };


    /*
     * Return a new BigNumber whose value is the maximum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.maximum = BigNumber.max = function () {
      return maxOrMin(arguments, -1);
    };


    /*
     * Return a new BigNumber whose value is the minimum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.minimum = BigNumber.min = function () {
      return maxOrMin(arguments, 1);
    };


    /*
     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
     * zeros are produced).
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
     * '[BigNumber Error] crypto unavailable'
     */
    BigNumber.random = (function () {
      var pow2_53 = 0x20000000000000;

      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
      // Check if Math.random() produces more than 32 bits of randomness.
      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
       ? function () { return mathfloor(Math.random() * pow2_53); }
       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
         (Math.random() * 0x800000 | 0); };

      return function (dp) {
        var a, b, e, k, v,
          i = 0,
          c = [],
          rand = new BigNumber(ONE);

        if (dp == null) dp = DECIMAL_PLACES;
        else intCheck(dp, 0, MAX);

        k = mathceil(dp / LOG_BASE);

        if (CRYPTO) {

          // Browsers supporting crypto.getRandomValues.
          if (crypto.getRandomValues) {

            a = crypto.getRandomValues(new Uint32Array(k *= 2));

            for (; i < k;) {

              // 53 bits:
              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
              //                                     11111 11111111 11111111
              // 0x20000 is 2^21.
              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

              // Rejection sampling:
              // 0 <= v < 9007199254740992
              // Probability that v >= 9e15, is
              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
              if (v >= 9e15) {
                b = crypto.getRandomValues(new Uint32Array(2));
                a[i] = b[0];
                a[i + 1] = b[1];
              } else {

                // 0 <= v <= 8999999999999999
                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 2;
              }
            }
            i = k / 2;

          // Node.js supporting crypto.randomBytes.
          } else if (crypto.randomBytes) {

            // buffer
            a = crypto.randomBytes(k *= 7);

            for (; i < k;) {

              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
              // 0x100000000 is 2^32, 0x1000000 is 2^24
              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
              // 0 <= v < 9007199254740992
              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

              if (v >= 9e15) {
                crypto.randomBytes(7).copy(a, i);
              } else {

                // 0 <= (v % 1e14) <= 99999999999999
                c.push(v % 1e14);
                i += 7;
              }
            }
            i = k / 7;
          } else {
            CRYPTO = false;
            throw Error
             (bignumberError + 'crypto unavailable');
          }
        }

        // Use Math.random.
        if (!CRYPTO) {

          for (; i < k;) {
            v = random53bitInt();
            if (v < 9e15) c[i++] = v % 1e14;
          }
        }

        k = c[--i];
        dp %= LOG_BASE;

        // Convert trailing digits to zeros according to dp.
        if (k && dp) {
          v = POWS_TEN[LOG_BASE - dp];
          c[i] = mathfloor(k / v) * v;
        }

        // Remove trailing elements which are zero.
        for (; c[i] === 0; c.pop(), i--);

        // Zero?
        if (i < 0) {
          c = [e = 0];
        } else {

          // Remove leading elements which are zero and adjust exponent accordingly.
          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

          // Count the digits of the first element of c to determine leading zeros, and...
          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

          // adjust the exponent accordingly.
          if (i < LOG_BASE) e -= LOG_BASE - i;
        }

        rand.e = e;
        rand.c = c;
        return rand;
      };
    })();


    /*
     * Return a BigNumber whose value is the sum of the arguments.
     *
     * arguments {number|string|BigNumber}
     */
    BigNumber.sum = function () {
      var i = 1,
        args = arguments,
        sum = new BigNumber(args[0]);
      for (; i < args.length;) sum = sum.plus(args[i++]);
      return sum;
    };


    // PRIVATE FUNCTIONS


    // Called by BigNumber and BigNumber.prototype.toString.
    convertBase = (function () {
      var decimal = '0123456789';

      /*
       * Convert string of baseIn to an array of numbers of baseOut.
       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
       */
      function toBaseOut(str, baseIn, baseOut, alphabet) {
        var j,
          arr = [0],
          arrL,
          i = 0,
          len = str.length;

        for (; i < len;) {
          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

          arr[0] += alphabet.indexOf(str.charAt(i++));

          for (j = 0; j < arr.length; j++) {

            if (arr[j] > baseOut - 1) {
              if (arr[j + 1] == null) arr[j + 1] = 0;
              arr[j + 1] += arr[j] / baseOut | 0;
              arr[j] %= baseOut;
            }
          }
        }

        return arr.reverse();
      }

      // Convert a numeric string of baseIn to a numeric string of baseOut.
      // If the caller is toString, we are converting from base 10 to baseOut.
      // If the caller is BigNumber, we are converting from baseIn to base 10.
      return function (str, baseIn, baseOut, sign, callerIsToString) {
        var alphabet, d, e, k, r, x, xc, y,
          i = str.indexOf('.'),
          dp = DECIMAL_PLACES,
          rm = ROUNDING_MODE;

        // Non-integer.
        if (i >= 0) {
          k = POW_PRECISION;

          // Unlimited precision.
          POW_PRECISION = 0;
          str = str.replace('.', '');
          y = new BigNumber(baseIn);
          x = y.pow(str.length - i);
          POW_PRECISION = k;

          // Convert str as if an integer, then restore the fraction part by dividing the
          // result by its base raised to a power.

          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
           10, baseOut, decimal);
          y.e = y.c.length;
        }

        // Convert the number as integer.

        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
         ? (alphabet = ALPHABET, decimal)
         : (alphabet = decimal, ALPHABET));

        // xc now represents str as an integer and converted to baseOut. e is the exponent.
        e = k = xc.length;

        // Remove trailing zeros.
        for (; xc[--k] == 0; xc.pop());

        // Zero?
        if (!xc[0]) return alphabet.charAt(0);

        // Does str represent an integer? If so, no need for the division.
        if (i < 0) {
          --e;
        } else {
          x.c = xc;
          x.e = e;

          // The sign is needed for correct rounding.
          x.s = sign;
          x = div(x, y, dp, rm, baseOut);
          xc = x.c;
          r = x.r;
          e = x.e;
        }

        // xc now represents str converted to baseOut.

        // THe index of the rounding digit.
        d = e + dp + 1;

        // The rounding digit: the digit to the right of the digit that may be rounded up.
        i = xc[d];

        // Look at the rounding digits and mode to determine whether to round up.

        k = baseOut / 2;
        r = r || d < 0 || xc[d + 1] != null;

        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
               rm == (x.s < 0 ? 8 : 7));

        // If the index of the rounding digit is not greater than zero, or xc represents
        // zero, then the result of the base conversion is zero or, if rounding up, a value
        // such as 0.00001.
        if (d < 1 || !xc[0]) {

          // 1^-dp or 0
          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
        } else {

          // Truncate xc to the required number of decimal places.
          xc.length = d;

          // Round up?
          if (r) {

            // Rounding up may mean the previous digit has to be rounded up and so on.
            for (--baseOut; ++xc[--d] > baseOut;) {
              xc[d] = 0;

              if (!d) {
                ++e;
                xc = [1].concat(xc);
              }
            }
          }

          // Determine trailing zeros.
          for (k = xc.length; !xc[--k];);

          // E.g. [4, 11, 15] becomes 4bf.
          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

          // Add leading zeros, decimal point and trailing zeros as required.
          str = toFixedPoint(str, e, alphabet.charAt(0));
        }

        // The caller will add the sign.
        return str;
      };
    })();


    // Perform division in the specified base. Called by div and convertBase.
    div = (function () {

      // Assume non-zero x and k.
      function multiply(x, k, base) {
        var m, temp, xlo, xhi,
          carry = 0,
          i = x.length,
          klo = k % SQRT_BASE,
          khi = k / SQRT_BASE | 0;

        for (x = x.slice(); i--;) {
          xlo = x[i] % SQRT_BASE;
          xhi = x[i] / SQRT_BASE | 0;
          m = khi * xlo + xhi * klo;
          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
          x[i] = temp % base;
        }

        if (carry) x = [carry].concat(x);

        return x;
      }

      function compare(a, b, aL, bL) {
        var i, cmp;

        if (aL != bL) {
          cmp = aL > bL ? 1 : -1;
        } else {

          for (i = cmp = 0; i < aL; i++) {

            if (a[i] != b[i]) {
              cmp = a[i] > b[i] ? 1 : -1;
              break;
            }
          }
        }

        return cmp;
      }

      function subtract(a, b, aL, base) {
        var i = 0;

        // Subtract b from a.
        for (; aL--;) {
          a[aL] -= i;
          i = a[aL] < b[aL] ? 1 : 0;
          a[aL] = i * base + a[aL] - b[aL];
        }

        // Remove leading zeros.
        for (; !a[0] && a.length > 1; a.splice(0, 1));
      }

      // x: dividend, y: divisor.
      return function (x, y, dp, rm, base) {
        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
          yL, yz,
          s = x.s == y.s ? 1 : -1,
          xc = x.c,
          yc = y.c;

        // Either NaN, Infinity or 0?
        if (!xc || !xc[0] || !yc || !yc[0]) {

          return new BigNumber(

           // Return NaN if either NaN, or both Infinity or 0.
           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
         );
        }

        q = new BigNumber(s);
        qc = q.c = [];
        e = x.e - y.e;
        s = dp + e + 1;

        if (!base) {
          base = BASE;
          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
          s = s / LOG_BASE | 0;
        }

        // Result exponent may be one less then the current value of e.
        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
        for (i = 0; yc[i] == (xc[i] || 0); i++);

        if (yc[i] > (xc[i] || 0)) e--;

        if (s < 0) {
          qc.push(1);
          more = true;
        } else {
          xL = xc.length;
          yL = yc.length;
          i = 0;
          s += 2;

          // Normalise xc and yc so highest order digit of yc is >= base / 2.

          n = mathfloor(base / (yc[0] + 1));

          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
          if (n > 1) {
            yc = multiply(yc, n, base);
            xc = multiply(xc, n, base);
            yL = yc.length;
            xL = xc.length;
          }

          xi = yL;
          rem = xc.slice(0, yL);
          remL = rem.length;

          // Add zeros to make remainder as long as divisor.
          for (; remL < yL; rem[remL++] = 0);
          yz = yc.slice();
          yz = [0].concat(yz);
          yc0 = yc[0];
          if (yc[1] >= base / 2) yc0++;
          // Not necessary, but to prevent trial digit n > base, when using base 3.
          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

          do {
            n = 0;

            // Compare divisor and remainder.
            cmp = compare(yc, rem, yL, remL);

            // If divisor < remainder.
            if (cmp < 0) {

              // Calculate trial digit, n.

              rem0 = rem[0];
              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

              // n is how many times the divisor goes into the current remainder.
              n = mathfloor(rem0 / yc0);

              //  Algorithm:
              //  product = divisor multiplied by trial digit (n).
              //  Compare product and remainder.
              //  If product is greater than remainder:
              //    Subtract divisor from product, decrement trial digit.
              //  Subtract product from remainder.
              //  If product was less than remainder at the last compare:
              //    Compare new remainder and divisor.
              //    If remainder is greater than divisor:
              //      Subtract divisor from remainder, increment trial digit.

              if (n > 1) {

                // n may be > base only when base is 3.
                if (n >= base) n = base - 1;

                // product = divisor * trial digit.
                prod = multiply(yc, n, base);
                prodL = prod.length;
                remL = rem.length;

                // Compare product and remainder.
                // If product > remainder then trial digit n too high.
                // n is 1 too high about 5% of the time, and is not known to have
                // ever been more than 1 too high.
                while (compare(prod, rem, prodL, remL) == 1) {
                  n--;

                  // Subtract divisor from product.
                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
                  prodL = prod.length;
                  cmp = 1;
                }
              } else {

                // n is 0 or 1, cmp is -1.
                // If n is 0, there is no need to compare yc and rem again below,
                // so change cmp to 1 to avoid it.
                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                if (n == 0) {

                  // divisor < remainder, so n must be at least 1.
                  cmp = n = 1;
                }

                // product = divisor
                prod = yc.slice();
                prodL = prod.length;
              }

              if (prodL < remL) prod = [0].concat(prod);

              // Subtract product from remainder.
              subtract(rem, prod, remL, base);
              remL = rem.length;

               // If product was < remainder.
              if (cmp == -1) {

                // Compare divisor and new remainder.
                // If divisor < new remainder, subtract divisor from remainder.
                // Trial digit n too low.
                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                while (compare(yc, rem, yL, remL) < 1) {
                  n++;

                  // Subtract divisor from remainder.
                  subtract(rem, yL < remL ? yz : yc, remL, base);
                  remL = rem.length;
                }
              }
            } else if (cmp === 0) {
              n++;
              rem = [0];
            } // else cmp === 1 and n will be 0

            // Add the next digit, n, to the result array.
            qc[i++] = n;

            // Update the remainder.
            if (rem[0]) {
              rem[remL++] = xc[xi] || 0;
            } else {
              rem = [xc[xi]];
              remL = 1;
            }
          } while ((xi++ < xL || rem[0] != null) && s--);

          more = rem[0] != null;

          // Leading zero?
          if (!qc[0]) qc.splice(0, 1);
        }

        if (base == BASE) {

          // To calculate q.e, first get the number of digits of qc[0].
          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

        // Caller is convertBase.
        } else {
          q.e = e;
          q.r = +more;
        }

        return q;
      };
    })();


    /*
     * Return a string representing the value of BigNumber n in fixed-point or exponential
     * notation rounded to the specified decimal places or significant digits.
     *
     * n: a BigNumber.
     * i: the index of the last digit required (i.e. the digit that may be rounded up).
     * rm: the rounding mode.
     * id: 1 (toExponential) or 2 (toPrecision).
     */
    function format(n, i, rm, id) {
      var c0, e, ne, len, str;

      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      if (!n.c) return n.toString();

      c0 = n.c[0];
      ne = n.e;

      if (i == null) {
        str = coeffToString(n.c);
        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
         ? toExponential(str, ne)
         : toFixedPoint(str, ne, '0');
      } else {
        n = round(new BigNumber(n), i, rm);

        // n.e may have changed if the value was rounded up.
        e = n.e;

        str = coeffToString(n.c);
        len = str.length;

        // toPrecision returns exponential notation if the number of significant digits
        // specified is less than the number of digits necessary to represent the integer
        // part of the value in fixed-point notation.

        // Exponential notation.
        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

          // Append zeros?
          for (; len < i; str += '0', len++);
          str = toExponential(str, e);

        // Fixed-point notation.
        } else {
          i -= ne;
          str = toFixedPoint(str, e, '0');

          // Append zeros?
          if (e + 1 > len) {
            if (--i > 0) for (str += '.'; i--; str += '0');
          } else {
            i += e - len;
            if (i > 0) {
              if (e + 1 == len) str += '.';
              for (; i--; str += '0');
            }
          }
        }
      }

      return n.s < 0 && c0 ? '-' + str : str;
    }


    // Handle BigNumber.max and BigNumber.min.
    // If any number is NaN, return NaN.
    function maxOrMin(args, n) {
      var k, y,
        i = 1,
        x = new BigNumber(args[0]);

      for (; i < args.length; i++) {
        y = new BigNumber(args[i]);
        if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
          x = y;
        }
      }

      return x;
    }


    /*
     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
     * Called by minus, plus and times.
     */
    function normalise(n, c, e) {
      var i = 1,
        j = c.length;

       // Remove trailing zeros.
      for (; !c[--j]; c.pop());

      // Calculate the base 10 exponent. First get the number of digits of c[0].
      for (j = c[0]; j >= 10; j /= 10, i++);

      // Overflow?
      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

        // Infinity.
        n.c = n.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        n.c = [n.e = 0];
      } else {
        n.e = e;
        n.c = c;
      }

      return n;
    }


    // Handle values that fail the validity test in BigNumber.
    parseNumeric = (function () {
      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
        dotAfter = /^([^.]+)\.$/,
        dotBefore = /^\.([^.]+)$/,
        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

      return function (x, str, isNum, b) {
        var base,
          s = isNum ? str : str.replace(whitespaceOrPlus, '');

        // No exception on ±Infinity or NaN.
        if (isInfinityOrNaN.test(s)) {
          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
        } else {
          if (!isNum) {

            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
            s = s.replace(basePrefix, function (m, p1, p2) {
              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
              return !b || b == base ? p1 : m;
            });

            if (b) {
              base = b;

              // E.g. '1.' to '1', '.1' to '0.1'
              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
            }

            if (str != s) return new BigNumber(s, base);
          }

          // '[BigNumber Error] Not a number: {n}'
          // '[BigNumber Error] Not a base {b} number: {n}'
          if (BigNumber.DEBUG) {
            throw Error
              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
          }

          // NaN
          x.s = null;
        }

        x.c = x.e = null;
      }
    })();


    /*
     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
     * If r is truthy, it is known that there are more digits after the rounding digit.
     */
    function round(x, sd, rm, r) {
      var d, i, j, k, n, ni, rd,
        xc = x.c,
        pows10 = POWS_TEN;

      // if x is not Infinity or NaN...
      if (xc) {

        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
        // n is a base 1e14 number, the value of the element of array x.c containing rd.
        // ni is the index of n within x.c.
        // d is the number of digits of n.
        // i is the index of rd within n including leading zeros.
        // j is the actual index of rd within n (if < 0, rd is a leading zero).
        out: {

          // Get the number of digits of the first element of xc.
          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
          i = sd - d;

          // If the rounding digit is in the first element of xc...
          if (i < 0) {
            i += LOG_BASE;
            j = sd;
            n = xc[ni = 0];

            // Get the rounding digit at index j of n.
            rd = mathfloor(n / pows10[d - j - 1] % 10);
          } else {
            ni = mathceil((i + 1) / LOG_BASE);

            if (ni >= xc.length) {

              if (r) {

                // Needed by sqrt.
                for (; xc.length <= ni; xc.push(0));
                n = rd = 0;
                d = 1;
                i %= LOG_BASE;
                j = i - LOG_BASE + 1;
              } else {
                break out;
              }
            } else {
              n = k = xc[ni];

              // Get the number of digits of n.
              for (d = 1; k >= 10; k /= 10, d++);

              // Get the index of rd within n.
              i %= LOG_BASE;

              // Get the index of rd within n, adjusted for leading zeros.
              // The number of leading zeros of n is given by LOG_BASE - d.
              j = i - LOG_BASE + d;

              // Get the rounding digit at index j of n.
              rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
            }
          }

          r = r || sd < 0 ||

          // Are there any non-zero digits after the rounding digit?
          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

          r = rm < 4
           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

            // Check whether the digit to the left of the rounding digit is odd.
            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
             rm == (x.s < 0 ? 8 : 7));

          if (sd < 1 || !xc[0]) {
            xc.length = 0;

            if (r) {

              // Convert sd to decimal places.
              sd -= x.e + 1;

              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
              x.e = -sd || 0;
            } else {

              // Zero.
              xc[0] = x.e = 0;
            }

            return x;
          }

          // Remove excess digits.
          if (i == 0) {
            xc.length = ni;
            k = 1;
            ni--;
          } else {
            xc.length = ni + 1;
            k = pows10[LOG_BASE - i];

            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
            // j > 0 means i > number of leading zeros of n.
            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
          }

          // Round up?
          if (r) {

            for (; ;) {

              // If the digit to be rounded up is in the first element of xc...
              if (ni == 0) {

                // i will be the length of xc[0] before k is added.
                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
                j = xc[0] += k;
                for (k = 1; j >= 10; j /= 10, k++);

                // if i != k the length has increased.
                if (i != k) {
                  x.e++;
                  if (xc[0] == BASE) xc[0] = 1;
                }

                break;
              } else {
                xc[ni] += k;
                if (xc[ni] != BASE) break;
                xc[ni--] = 0;
                k = 1;
              }
            }
          }

          // Remove trailing zeros.
          for (i = xc.length; xc[--i] === 0; xc.pop());
        }

        // Overflow? Infinity.
        if (x.e > MAX_EXP) {
          x.c = x.e = null;

        // Underflow? Zero.
        } else if (x.e < MIN_EXP) {
          x.c = [x.e = 0];
        }
      }

      return x;
    }


    function valueOf(n) {
      var str,
        e = n.e;

      if (e === null) return n.toString();

      str = coeffToString(n.c);

      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
        ? toExponential(str, e)
        : toFixedPoint(str, e, '0');

      return n.s < 0 ? '-' + str : str;
    }


    // PROTOTYPE/INSTANCE METHODS


    /*
     * Return a new BigNumber whose value is the absolute value of this BigNumber.
     */
    P.absoluteValue = P.abs = function () {
      var x = new BigNumber(this);
      if (x.s < 0) x.s = 1;
      return x;
    };


    /*
     * Return
     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
     *   0 if they have the same value,
     *   or null if the value of either is NaN.
     */
    P.comparedTo = function (y, b) {
      return compare(this, new BigNumber(y, b));
    };


    /*
     * If dp is undefined or null or true or false, return the number of decimal places of the
     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     *
     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.decimalPlaces = P.dp = function (dp, rm) {
      var c, n, v,
        x = this;

      if (dp != null) {
        intCheck(dp, 0, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), dp + x.e + 1, rm);
      }

      if (!(c = x.c)) return null;
      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

      // Subtract the number of trailing zeros of the last number.
      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
      if (n < 0) n = 0;

      return n;
    };


    /*
     *  n / 0 = I
     *  n / N = N
     *  n / I = 0
     *  0 / n = 0
     *  0 / 0 = N
     *  0 / N = N
     *  0 / I = 0
     *  N / n = N
     *  N / 0 = N
     *  N / N = N
     *  N / I = N
     *  I / n = I
     *  I / 0 = I
     *  I / N = N
     *  I / I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.dividedBy = P.div = function (y, b) {
      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
    };


    /*
     * Return a new BigNumber whose value is the integer part of dividing the value of this
     * BigNumber by the value of BigNumber(y, b).
     */
    P.dividedToIntegerBy = P.idiv = function (y, b) {
      return div(this, new BigNumber(y, b), 0, 1);
    };


    /*
     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
     *
     * If m is present, return the result modulo m.
     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
     *
     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
     *
     * n {number|string|BigNumber} The exponent. An integer.
     * [m] {number|string|BigNumber} The modulus.
     *
     * '[BigNumber Error] Exponent not an integer: {n}'
     */
    P.exponentiatedBy = P.pow = function (n, m) {
      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
        x = this;

      n = new BigNumber(n);

      // Allow NaN and ±Infinity, but not other non-integers.
      if (n.c && !n.isInteger()) {
        throw Error
          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
      }

      if (m != null) m = new BigNumber(m);

      // Exponent of MAX_SAFE_INTEGER is 15.
      nIsBig = n.e > 14;

      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

        // The sign of the result of pow when x is negative depends on the evenness of n.
        // If +n overflows to ±Infinity, the evenness of n would be not be known.
        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
        return m ? y.mod(m) : y;
      }

      nIsNeg = n.s < 0;

      if (m) {

        // x % m returns NaN if abs(m) is zero, or m is NaN.
        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

        if (isModExp) x = x.mod(m);

      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
        // [1, 240000000]
        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
        // [80000000000000]  [99999750000000]
        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

        // If x is negative and n is odd, k = -0, else k = 0.
        k = x.s < 0 && isOdd(n) ? -0 : 0;

        // If x >= 1, k = ±Infinity.
        if (x.e > -1) k = 1 / k;

        // If n is negative return ±0, else return ±Infinity.
        return new BigNumber(nIsNeg ? 1 / k : k);

      } else if (POW_PRECISION) {

        // Truncating each coefficient array to a length of k after each multiplication
        // equates to truncating significant digits to POW_PRECISION + [28, 41],
        // i.e. there will be a minimum of 28 guard digits retained.
        k = mathceil(POW_PRECISION / LOG_BASE + 2);
      }

      if (nIsBig) {
        half = new BigNumber(0.5);
        if (nIsNeg) n.s = 1;
        nIsOdd = isOdd(n);
      } else {
        i = Math.abs(+valueOf(n));
        nIsOdd = i % 2;
      }

      y = new BigNumber(ONE);

      // Performs 54 loop iterations for n of 9007199254740991.
      for (; ;) {

        if (nIsOdd) {
          y = y.times(x);
          if (!y.c) break;

          if (k) {
            if (y.c.length > k) y.c.length = k;
          } else if (isModExp) {
            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
          }
        }

        if (i) {
          i = mathfloor(i / 2);
          if (i === 0) break;
          nIsOdd = i % 2;
        } else {
          n = n.times(half);
          round(n, n.e + 1, 1);

          if (n.e > 14) {
            nIsOdd = isOdd(n);
          } else {
            i = +valueOf(n);
            if (i === 0) break;
            nIsOdd = i % 2;
          }
        }

        x = x.times(x);

        if (k) {
          if (x.c && x.c.length > k) x.c.length = k;
        } else if (isModExp) {
          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
        }
      }

      if (isModExp) return y;
      if (nIsNeg) y = ONE.div(y);

      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
     */
    P.integerValue = function (rm) {
      var n = new BigNumber(this);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(n, n.e + 1, rm);
    };


    /*
     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isEqualTo = P.eq = function (y, b) {
      return compare(this, new BigNumber(y, b)) === 0;
    };


    /*
     * Return true if the value of this BigNumber is a finite number, otherwise return false.
     */
    P.isFinite = function () {
      return !!this.c;
    };


    /*
     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isGreaterThan = P.gt = function (y, b) {
      return compare(this, new BigNumber(y, b)) > 0;
    };


    /*
     * Return true if the value of this BigNumber is greater than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

    };


    /*
     * Return true if the value of this BigNumber is an integer, otherwise return false.
     */
    P.isInteger = function () {
      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
    };


    /*
     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
     * otherwise return false.
     */
    P.isLessThan = P.lt = function (y, b) {
      return compare(this, new BigNumber(y, b)) < 0;
    };


    /*
     * Return true if the value of this BigNumber is less than or equal to the value of
     * BigNumber(y, b), otherwise return false.
     */
    P.isLessThanOrEqualTo = P.lte = function (y, b) {
      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
    };


    /*
     * Return true if the value of this BigNumber is NaN, otherwise return false.
     */
    P.isNaN = function () {
      return !this.s;
    };


    /*
     * Return true if the value of this BigNumber is negative, otherwise return false.
     */
    P.isNegative = function () {
      return this.s < 0;
    };


    /*
     * Return true if the value of this BigNumber is positive, otherwise return false.
     */
    P.isPositive = function () {
      return this.s > 0;
    };


    /*
     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
     */
    P.isZero = function () {
      return !!this.c && this.c[0] == 0;
    };


    /*
     *  n - 0 = n
     *  n - N = N
     *  n - I = -I
     *  0 - n = -n
     *  0 - 0 = 0
     *  0 - N = N
     *  0 - I = -I
     *  N - n = N
     *  N - 0 = N
     *  N - N = N
     *  N - I = N
     *  I - n = I
     *  I - 0 = I
     *  I - N = N
     *  I - I = N
     *
     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
     * BigNumber(y, b).
     */
    P.minus = function (y, b) {
      var i, j, t, xLTy,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
      if (a != b) {
        y.s = -b;
        return x.plus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Either Infinity?
        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

        // Either zero?
        if (!xc[0] || !yc[0]) {

          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
           ROUNDING_MODE == 3 ? -0 : 0);
        }
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Determine which is the bigger number.
      if (a = xe - ye) {

        if (xLTy = a < 0) {
          a = -a;
          t = xc;
        } else {
          ye = xe;
          t = yc;
        }

        t.reverse();

        // Prepend zeros to equalise exponents.
        for (b = a; b--; t.push(0));
        t.reverse();
      } else {

        // Exponents equal. Check digit by digit.
        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

        for (a = b = 0; b < j; b++) {

          if (xc[b] != yc[b]) {
            xLTy = xc[b] < yc[b];
            break;
          }
        }
      }

      // x < y? Point xc to the array of the bigger number.
      if (xLTy) {
        t = xc;
        xc = yc;
        yc = t;
        y.s = -y.s;
      }

      b = (j = yc.length) - (i = xc.length);

      // Append zeros to xc if shorter.
      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
      if (b > 0) for (; b--; xc[i++] = 0);
      b = BASE - 1;

      // Subtract yc from xc.
      for (; j > a;) {

        if (xc[--j] < yc[j]) {
          for (i = j; i && !xc[--i]; xc[i] = b);
          --xc[i];
          xc[j] += BASE;
        }

        xc[j] -= yc[j];
      }

      // Remove leading zeros and adjust exponent accordingly.
      for (; xc[0] == 0; xc.splice(0, 1), --ye);

      // Zero?
      if (!xc[0]) {

        // Following IEEE 754 (2008) 6.3,
        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
        y.s = ROUNDING_MODE == 3 ? -1 : 1;
        y.c = [y.e = 0];
        return y;
      }

      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
      // for finite x and y.
      return normalise(y, xc, ye);
    };


    /*
     *   n % 0 =  N
     *   n % N =  N
     *   n % I =  n
     *   0 % n =  0
     *  -0 % n = -0
     *   0 % 0 =  N
     *   0 % N =  N
     *   0 % I =  0
     *   N % n =  N
     *   N % 0 =  N
     *   N % N =  N
     *   N % I =  N
     *   I % n =  N
     *   I % 0 =  N
     *   I % N =  N
     *   I % I =  N
     *
     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
     */
    P.modulo = P.mod = function (y, b) {
      var q, s,
        x = this;

      y = new BigNumber(y, b);

      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
      if (!x.c || !y.s || y.c && !y.c[0]) {
        return new BigNumber(NaN);

      // Return x if y is Infinity or x is zero.
      } else if (!y.c || x.c && !x.c[0]) {
        return new BigNumber(x);
      }

      if (MODULO_MODE == 9) {

        // Euclidian division: q = sign(y) * floor(x / abs(y))
        // r = x - qy    where  0 <= r < abs(y)
        s = y.s;
        y.s = 1;
        q = div(x, y, 0, 3);
        y.s = s;
        q.s *= s;
      } else {
        q = div(x, y, 0, MODULO_MODE);
      }

      y = x.minus(q.times(y));

      // To match JavaScript %, ensure sign of zero is sign of dividend.
      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

      return y;
    };


    /*
     *  n * 0 = 0
     *  n * N = N
     *  n * I = I
     *  0 * n = 0
     *  0 * 0 = 0
     *  0 * N = N
     *  0 * I = N
     *  N * n = N
     *  N * 0 = N
     *  N * N = N
     *  N * I = N
     *  I * n = I
     *  I * 0 = N
     *  I * N = N
     *  I * I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
     * of BigNumber(y, b).
     */
    P.multipliedBy = P.times = function (y, b) {
      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
        base, sqrtBase,
        x = this,
        xc = x.c,
        yc = (y = new BigNumber(y, b)).c;

      // Either NaN, ±Infinity or ±0?
      if (!xc || !yc || !xc[0] || !yc[0]) {

        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
          y.c = y.e = y.s = null;
        } else {
          y.s *= x.s;

          // Return ±Infinity if either is ±Infinity.
          if (!xc || !yc) {
            y.c = y.e = null;

          // Return ±0 if either is ±0.
          } else {
            y.c = [0];
            y.e = 0;
          }
        }

        return y;
      }

      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
      y.s *= x.s;
      xcL = xc.length;
      ycL = yc.length;

      // Ensure xc points to longer array and xcL to its length.
      if (xcL < ycL) {
        zc = xc;
        xc = yc;
        yc = zc;
        i = xcL;
        xcL = ycL;
        ycL = i;
      }

      // Initialise the result array with zeros.
      for (i = xcL + ycL, zc = []; i--; zc.push(0));

      base = BASE;
      sqrtBase = SQRT_BASE;

      for (i = ycL; --i >= 0;) {
        c = 0;
        ylo = yc[i] % sqrtBase;
        yhi = yc[i] / sqrtBase | 0;

        for (k = xcL, j = i + k; j > i;) {
          xlo = xc[--k] % sqrtBase;
          xhi = xc[k] / sqrtBase | 0;
          m = yhi * xlo + xhi * ylo;
          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
          zc[j--] = xlo % base;
        }

        zc[j] = c;
      }

      if (c) {
        ++e;
      } else {
        zc.splice(0, 1);
      }

      return normalise(y, zc, e);
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber negated,
     * i.e. multiplied by -1.
     */
    P.negated = function () {
      var x = new BigNumber(this);
      x.s = -x.s || null;
      return x;
    };


    /*
     *  n + 0 = n
     *  n + N = N
     *  n + I = I
     *  0 + n = n
     *  0 + 0 = 0
     *  0 + N = N
     *  0 + I = I
     *  N + n = N
     *  N + 0 = N
     *  N + N = N
     *  N + I = N
     *  I + n = I
     *  I + 0 = I
     *  I + N = N
     *  I + I = I
     *
     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
     * BigNumber(y, b).
     */
    P.plus = function (y, b) {
      var t,
        x = this,
        a = x.s;

      y = new BigNumber(y, b);
      b = y.s;

      // Either NaN?
      if (!a || !b) return new BigNumber(NaN);

      // Signs differ?
       if (a != b) {
        y.s = -b;
        return x.minus(y);
      }

      var xe = x.e / LOG_BASE,
        ye = y.e / LOG_BASE,
        xc = x.c,
        yc = y.c;

      if (!xe || !ye) {

        // Return ±Infinity if either ±Infinity.
        if (!xc || !yc) return new BigNumber(a / 0);

        // Either zero?
        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
      }

      xe = bitFloor(xe);
      ye = bitFloor(ye);
      xc = xc.slice();

      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
      if (a = xe - ye) {
        if (a > 0) {
          ye = xe;
          t = yc;
        } else {
          a = -a;
          t = xc;
        }

        t.reverse();
        for (; a--; t.push(0));
        t.reverse();
      }

      a = xc.length;
      b = yc.length;

      // Point xc to the longer array, and b to the shorter length.
      if (a - b < 0) {
        t = yc;
        yc = xc;
        xc = t;
        b = a;
      }

      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
      for (a = 0; b;) {
        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
      }

      if (a) {
        xc = [a].concat(xc);
        ++ye;
      }

      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
      // ye = MAX_EXP + 1 possible
      return normalise(y, xc, ye);
    };


    /*
     * If sd is undefined or null or true or false, return the number of significant digits of
     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
     * If sd is true include integer-part trailing zeros in the count.
     *
     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
     * ROUNDING_MODE if rm is omitted.
     *
     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
     *                     boolean: whether to count integer-part trailing zeros: true or false.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.precision = P.sd = function (sd, rm) {
      var c, n, v,
        x = this;

      if (sd != null && sd !== !!sd) {
        intCheck(sd, 1, MAX);
        if (rm == null) rm = ROUNDING_MODE;
        else intCheck(rm, 0, 8);

        return round(new BigNumber(x), sd, rm);
      }

      if (!(c = x.c)) return null;
      v = c.length - 1;
      n = v * LOG_BASE + 1;

      if (v = c[v]) {

        // Subtract the number of trailing zeros of the last element.
        for (; v % 10 == 0; v /= 10, n--);

        // Add the number of digits of the first element.
        for (v = c[0]; v >= 10; v /= 10, n++);
      }

      if (sd && x.e + 1 > n) n = x.e + 1;

      return n;
    };


    /*
     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
     *
     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
     */
    P.shiftedBy = function (k) {
      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
      return this.times('1e' + k);
    };


    /*
     *  sqrt(-n) =  N
     *  sqrt(N) =  N
     *  sqrt(-I) =  N
     *  sqrt(I) =  I
     *  sqrt(0) =  0
     *  sqrt(-0) = -0
     *
     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
     */
    P.squareRoot = P.sqrt = function () {
      var m, n, r, rep, t,
        x = this,
        c = x.c,
        s = x.s,
        e = x.e,
        dp = DECIMAL_PLACES + 4,
        half = new BigNumber('0.5');

      // Negative/NaN/Infinity/zero?
      if (s !== 1 || !c || !c[0]) {
        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
      }

      // Initial estimate.
      s = Math.sqrt(+valueOf(x));

      // Math.sqrt underflow/overflow?
      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
      if (s == 0 || s == 1 / 0) {
        n = coeffToString(c);
        if ((n.length + e) % 2 == 0) n += '0';
        s = Math.sqrt(+n);
        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

        if (s == 1 / 0) {
          n = '5e' + e;
        } else {
          n = s.toExponential();
          n = n.slice(0, n.indexOf('e') + 1) + e;
        }

        r = new BigNumber(n);
      } else {
        r = new BigNumber(s + '');
      }

      // Check for zero.
      // r could be zero if MIN_EXP is changed after the this value was created.
      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
      // coeffToString to throw.
      if (r.c[0]) {
        e = r.e;
        s = e + dp;
        if (s < 3) s = 0;

        // Newton-Raphson iteration.
        for (; ;) {
          t = r;
          r = half.times(t.plus(div(x, t, dp, 1)));

          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

            // The exponent of r may here be one less than the final result exponent,
            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
            // are indexed correctly.
            if (r.e < e) --s;
            n = n.slice(s - 3, s + 1);

            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
            // iteration.
            if (n == '9999' || !rep && n == '4999') {

              // On the first iteration only, check to see if rounding up gives the
              // exact result as the nines may infinitely repeat.
              if (!rep) {
                round(t, t.e + DECIMAL_PLACES + 2, 0);

                if (t.times(t).eq(x)) {
                  r = t;
                  break;
                }
              }

              dp += 4;
              s += 4;
              rep = 1;
            } else {

              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
              // result. If not, then there are further digits and m will be truthy.
              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

                // Truncate to the first rounding digit.
                round(r, r.e + DECIMAL_PLACES + 2, 1);
                m = !r.times(r).eq(x);
              }

              break;
            }
          }
        }
      }

      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
    };


    /*
     * Return a string representing the value of this BigNumber in exponential notation and
     * rounded using ROUNDING_MODE to dp fixed decimal places.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toExponential = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp++;
      }
      return format(this, dp, rm, 1);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounding
     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
     *
     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
     * but e.g. (-0.00001).toFixed(0) is '-0'.
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     */
    P.toFixed = function (dp, rm) {
      if (dp != null) {
        intCheck(dp, 0, MAX);
        dp = dp + this.e + 1;
      }
      return format(this, dp, rm);
    };


    /*
     * Return a string representing the value of this BigNumber in fixed-point notation rounded
     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
     * of the format or FORMAT object (see BigNumber.set).
     *
     * The formatting object may contain some or all of the properties shown below.
     *
     * FORMAT = {
     *   prefix: '',
     *   groupSize: 3,
     *   secondaryGroupSize: 0,
     *   groupSeparator: ',',
     *   decimalSeparator: '.',
     *   fractionGroupSize: 0,
     *   fractionGroupSeparator: '\xA0',      // non-breaking space
     *   suffix: ''
     * };
     *
     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     * [format] {object} Formatting options. See FORMAT pbject above.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
     * '[BigNumber Error] Argument not an object: {format}'
     */
    P.toFormat = function (dp, rm, format) {
      var str,
        x = this;

      if (format == null) {
        if (dp != null && rm && typeof rm == 'object') {
          format = rm;
          rm = null;
        } else if (dp && typeof dp == 'object') {
          format = dp;
          dp = rm = null;
        } else {
          format = FORMAT;
        }
      } else if (typeof format != 'object') {
        throw Error
          (bignumberError + 'Argument not an object: ' + format);
      }

      str = x.toFixed(dp, rm);

      if (x.c) {
        var i,
          arr = str.split('.'),
          g1 = +format.groupSize,
          g2 = +format.secondaryGroupSize,
          groupSeparator = format.groupSeparator || '',
          intPart = arr[0],
          fractionPart = arr[1],
          isNeg = x.s < 0,
          intDigits = isNeg ? intPart.slice(1) : intPart,
          len = intDigits.length;

        if (g2) {
          i = g1;
          g1 = g2;
          g2 = i;
          len -= i;
        }

        if (g1 > 0 && len > 0) {
          i = len % g1 || g1;
          intPart = intDigits.substr(0, i);
          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
          if (isNeg) intPart = '-' + intPart;
        }

        str = fractionPart
         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
           '$&' + (format.fractionGroupSeparator || ''))
          : fractionPart)
         : intPart;
      }

      return (format.prefix || '') + str + (format.suffix || '');
    };


    /*
     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
     * fraction with an integer numerator and an integer denominator.
     * The denominator will be a positive non-zero value less than or equal to the specified
     * maximum denominator. If a maximum denominator is not specified, the denominator will be
     * the lowest value necessary to represent the number exactly.
     *
     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
     *
     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
     */
    P.toFraction = function (md) {
      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
        x = this,
        xc = x.c;

      if (md != null) {
        n = new BigNumber(md);

        // Throw if md is less than one or is not an integer, unless it is Infinity.
        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
          throw Error
            (bignumberError + 'Argument ' +
              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
        }
      }

      if (!xc) return new BigNumber(x);

      d = new BigNumber(ONE);
      n1 = d0 = new BigNumber(ONE);
      d1 = n0 = new BigNumber(ONE);
      s = coeffToString(xc);

      // Determine initial denominator.
      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
      e = d.e = s.length - x.e - 1;
      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

      exp = MAX_EXP;
      MAX_EXP = 1 / 0;
      n = new BigNumber(s);

      // n0 = d1 = 0
      n0.c[0] = 0;

      for (; ;)  {
        q = div(n, d, 0, 1);
        d2 = d0.plus(q.times(d1));
        if (d2.comparedTo(md) == 1) break;
        d0 = d1;
        d1 = d2;
        n1 = n0.plus(q.times(d2 = n1));
        n0 = d2;
        d = n.minus(q.times(d2 = d));
        n = d2;
      }

      d2 = div(md.minus(d0), d1, 0, 1);
      n0 = n0.plus(d2.times(n1));
      d0 = d0.plus(d2.times(d1));
      n0.s = n1.s = x.s;
      e = e * 2;

      // Determine which fraction is closer to x, n0/d0 or n1/d1
      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

      MAX_EXP = exp;

      return r;
    };


    /*
     * Return the value of this BigNumber converted to a number primitive.
     */
    P.toNumber = function () {
      return +valueOf(this);
    };


    /*
     * Return a string representing the value of this BigNumber rounded to sd significant digits
     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
     * necessary to represent the integer part of the value in fixed-point notation, then use
     * exponential notation.
     *
     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
     *
     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
     */
    P.toPrecision = function (sd, rm) {
      if (sd != null) intCheck(sd, 1, MAX);
      return format(this, sd, rm, 2);
    };


    /*
     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
     * TO_EXP_NEG, return exponential notation.
     *
     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
     *
     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
     */
    P.toString = function (b) {
      var str,
        n = this,
        s = n.s,
        e = n.e;

      // Infinity or NaN?
      if (e === null) {
        if (s) {
          str = 'Infinity';
          if (s < 0) str = '-' + str;
        } else {
          str = 'NaN';
        }
      } else {
        if (b == null) {
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
           ? toExponential(coeffToString(n.c), e)
           : toFixedPoint(coeffToString(n.c), e, '0');
        } else if (b === 10 && alphabetHasNormalDecimalDigits) {
          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
          str = toFixedPoint(coeffToString(n.c), n.e, '0');
        } else {
          intCheck(b, 2, ALPHABET.length, 'Base');
          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
        }

        if (s < 0 && n.c[0]) str = '-' + str;
      }

      return str;
    };


    /*
     * Return as toString, but do not accept a base argument, and include the minus sign for
     * negative zero.
     */
    P.valueOf = P.toJSON = function () {
      return valueOf(this);
    };


    P._isBigNumber = true;

    if (configObject != null) BigNumber.set(configObject);

    return BigNumber;
  }


  // PRIVATE HELPER FUNCTIONS

  // These functions don't need access to variables,
  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


  function bitFloor(n) {
    var i = n | 0;
    return n > 0 || n === i ? i : i - 1;
  }


  // Return a coefficient array as a string of base 10 digits.
  function coeffToString(a) {
    var s, z,
      i = 1,
      j = a.length,
      r = a[0] + '';

    for (; i < j;) {
      s = a[i++] + '';
      z = LOG_BASE - s.length;
      for (; z--; s = '0' + s);
      r += s;
    }

    // Determine trailing zeros.
    for (j = r.length; r.charCodeAt(--j) === 48;);

    return r.slice(0, j + 1 || 1);
  }


  // Compare the value of BigNumbers x and y.
  function compare(x, y) {
    var a, b,
      xc = x.c,
      yc = y.c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either NaN?
    if (!i || !j) return null;

    a = xc && !xc[0];
    b = yc && !yc[0];

    // Either zero?
    if (a || b) return a ? b ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    a = i < 0;
    b = k == l;

    // Either Infinity?
    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

    // Compare exponents.
    if (!b) return k > l ^ a ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

    // Compare lengths.
    return k == l ? 0 : k > l ^ a ? 1 : -1;
  }


  /*
   * Check that n is a primitive number, an integer, and in range, otherwise throw.
   */
  function intCheck(n, min, max, name) {
    if (n < min || n > max || n !== mathfloor(n)) {
      throw Error
       (bignumberError + (name || 'Argument') + (typeof n == 'number'
         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
         : ' not a primitive number: ') + String(n));
    }
  }


  // Assumes finite n.
  function isOdd(n) {
    var k = n.c.length - 1;
    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
  }


  function toExponential(str, e) {
    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
     (e < 0 ? 'e' : 'e+') + e;
  }


  function toFixedPoint(str, e, z) {
    var len, zs;

    // Negative exponent?
    if (e < 0) {

      // Prepend zeros.
      for (zs = z + '.'; ++e; zs += z);
      str = zs + str;

    // Positive exponent
    } else {
      len = str.length;

      // Append zeros.
      if (++e > len) {
        for (zs = z, e -= len; --e; zs += z);
        str += zs;
      } else if (e < len) {
        str = str.slice(0, e) + '.' + str.slice(e);
      }
    }

    return str;
  }


  // EXPORT


  BigNumber = clone();
  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

  // AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return BigNumber; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node.js and other environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ 8764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(9742)
const ieee754 = __webpack_require__(645)
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ 645:
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 5717:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 9509:
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(8764)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 4189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Buffer = (__webpack_require__(9509).Buffer)

// prototype class for hash functions
function Hash (blockSize, finalSize) {
  this._block = Buffer.alloc(blockSize)
  this._finalSize = finalSize
  this._blockSize = blockSize
  this._len = 0
}

Hash.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    enc = enc || 'utf8'
    data = Buffer.from(data, enc)
  }

  var block = this._block
  var blockSize = this._blockSize
  var length = data.length
  var accum = this._len

  for (var offset = 0; offset < length;) {
    var assigned = accum % blockSize
    var remainder = Math.min(length - offset, blockSize - assigned)

    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i]
    }

    accum += remainder
    offset += remainder

    if ((accum % blockSize) === 0) {
      this._update(block)
    }
  }

  this._len += length
  return this
}

Hash.prototype.digest = function (enc) {
  var rem = this._len % this._blockSize

  this._block[rem] = 0x80

  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
  this._block.fill(0, rem + 1)

  if (rem >= this._finalSize) {
    this._update(this._block)
    this._block.fill(0)
  }

  var bits = this._len * 8

  // uint32
  if (bits <= 0xffffffff) {
    this._block.writeUInt32BE(bits, this._blockSize - 4)

  // uint64
  } else {
    var lowBits = (bits & 0xffffffff) >>> 0
    var highBits = (bits - lowBits) / 0x100000000

    this._block.writeUInt32BE(highBits, this._blockSize - 8)
    this._block.writeUInt32BE(lowBits, this._blockSize - 4)
  }

  this._update(this._block)
  var hash = this._hash()

  return enc ? hash.toString(enc) : hash
}

Hash.prototype._update = function () {
  throw new Error('_update must be implemented by subclass')
}

module.exports = Hash


/***/ }),

/***/ 9072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var exports = module.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase()

  var Algorithm = exports[algorithm]
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
}

exports.sha = __webpack_require__(4448)
exports.sha1 = __webpack_require__(8336)
exports.sha224 = __webpack_require__(8432)
exports.sha256 = __webpack_require__(7499)
exports.sha384 = __webpack_require__(1686)
exports.sha512 = __webpack_require__(7816)


/***/ }),

/***/ 4448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha, Hash)

Sha.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha


/***/ }),

/***/ 8336:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha1 () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha1, Hash)

Sha1.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl1 (num) {
  return (num << 1) | (num >>> 31)
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha1.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha1.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha1


/***/ }),

/***/ 8432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(5717)
var Sha256 = __webpack_require__(7499)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var W = new Array(64)

function Sha224 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha224, Sha256)

Sha224.prototype.init = function () {
  this._a = 0xc1059ed8
  this._b = 0x367cd507
  this._c = 0x3070dd17
  this._d = 0xf70e5939
  this._e = 0xffc00b31
  this._f = 0x68581511
  this._g = 0x64f98fa7
  this._h = 0xbefa4fa4

  return this
}

Sha224.prototype._hash = function () {
  var H = Buffer.allocUnsafe(28)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)

  return H
}

module.exports = Sha224


/***/ }),

/***/ 7499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
]

var W = new Array(64)

function Sha256 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha256, Hash)

Sha256.prototype.init = function () {
  this._a = 0x6a09e667
  this._b = 0xbb67ae85
  this._c = 0x3c6ef372
  this._d = 0xa54ff53a
  this._e = 0x510e527f
  this._f = 0x9b05688c
  this._g = 0x1f83d9ab
  this._h = 0x5be0cd19

  return this
}

function ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
}

function sigma1 (x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
}

function gamma0 (x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
}

function gamma1 (x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
}

Sha256.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0
  var f = this._f | 0
  var g = this._g | 0
  var h = this._h | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0

  for (var j = 0; j < 64; ++j) {
    var T1 = (h + sigma1(e) + ch(e, f, g) + K[j] + W[j]) | 0
    var T2 = (sigma0(a) + maj(a, b, c)) | 0

    h = g
    g = f
    f = e
    e = (d + T1) | 0
    d = c
    c = b
    b = a
    a = (T1 + T2) | 0
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
  this._f = (f + this._f) | 0
  this._g = (g + this._g) | 0
  this._h = (h + this._h) | 0
}

Sha256.prototype._hash = function () {
  var H = Buffer.allocUnsafe(32)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)
  H.writeInt32BE(this._h, 28)

  return H
}

module.exports = Sha256


/***/ }),

/***/ 1686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var inherits = __webpack_require__(5717)
var SHA512 = __webpack_require__(7816)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var W = new Array(160)

function Sha384 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha384, SHA512)

Sha384.prototype.init = function () {
  this._ah = 0xcbbb9d5d
  this._bh = 0x629a292a
  this._ch = 0x9159015a
  this._dh = 0x152fecd8
  this._eh = 0x67332667
  this._fh = 0x8eb44a87
  this._gh = 0xdb0c2e0d
  this._hh = 0x47b5481d

  this._al = 0xc1059ed8
  this._bl = 0x367cd507
  this._cl = 0x3070dd17
  this._dl = 0xf70e5939
  this._el = 0xffc00b31
  this._fl = 0x68581511
  this._gl = 0x64f98fa7
  this._hl = 0xbefa4fa4

  return this
}

Sha384.prototype._hash = function () {
  var H = Buffer.allocUnsafe(48)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)

  return H
}

module.exports = Sha384


/***/ }),

/***/ 7816:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
]

var W = new Array(160)

function Sha512 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha512, Hash)

Sha512.prototype.init = function () {
  this._ah = 0x6a09e667
  this._bh = 0xbb67ae85
  this._ch = 0x3c6ef372
  this._dh = 0xa54ff53a
  this._eh = 0x510e527f
  this._fh = 0x9b05688c
  this._gh = 0x1f83d9ab
  this._hh = 0x5be0cd19

  this._al = 0xf3bcc908
  this._bl = 0x84caa73b
  this._cl = 0xfe94f82b
  this._dl = 0x5f1d36f1
  this._el = 0xade682d1
  this._fl = 0x2b3e6c1f
  this._gl = 0xfb41bd6b
  this._hl = 0x137e2179

  return this
}

function Ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
}

function sigma1 (x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
}

function Gamma0 (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
}

function Gamma0l (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
}

function Gamma1 (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
}

function Gamma1l (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
}

function getCarry (a, b) {
  return (a >>> 0) < (b >>> 0) ? 1 : 0
}

Sha512.prototype._update = function (M) {
  var W = this._w

  var ah = this._ah | 0
  var bh = this._bh | 0
  var ch = this._ch | 0
  var dh = this._dh | 0
  var eh = this._eh | 0
  var fh = this._fh | 0
  var gh = this._gh | 0
  var hh = this._hh | 0

  var al = this._al | 0
  var bl = this._bl | 0
  var cl = this._cl | 0
  var dl = this._dl | 0
  var el = this._el | 0
  var fl = this._fl | 0
  var gl = this._gl | 0
  var hl = this._hl | 0

  for (var i = 0; i < 32; i += 2) {
    W[i] = M.readInt32BE(i * 4)
    W[i + 1] = M.readInt32BE(i * 4 + 4)
  }
  for (; i < 160; i += 2) {
    var xh = W[i - 15 * 2]
    var xl = W[i - 15 * 2 + 1]
    var gamma0 = Gamma0(xh, xl)
    var gamma0l = Gamma0l(xl, xh)

    xh = W[i - 2 * 2]
    xl = W[i - 2 * 2 + 1]
    var gamma1 = Gamma1(xh, xl)
    var gamma1l = Gamma1l(xl, xh)

    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
    var Wi7h = W[i - 7 * 2]
    var Wi7l = W[i - 7 * 2 + 1]

    var Wi16h = W[i - 16 * 2]
    var Wi16l = W[i - 16 * 2 + 1]

    var Wil = (gamma0l + Wi7l) | 0
    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0
    Wil = (Wil + gamma1l) | 0
    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0
    Wil = (Wil + Wi16l) | 0
    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0

    W[i] = Wih
    W[i + 1] = Wil
  }

  for (var j = 0; j < 160; j += 2) {
    Wih = W[j]
    Wil = W[j + 1]

    var majh = maj(ah, bh, ch)
    var majl = maj(al, bl, cl)

    var sigma0h = sigma0(ah, al)
    var sigma0l = sigma0(al, ah)
    var sigma1h = sigma1(eh, el)
    var sigma1l = sigma1(el, eh)

    // t1 = h + sigma1 + ch + K[j] + W[j]
    var Kih = K[j]
    var Kil = K[j + 1]

    var chh = Ch(eh, fh, gh)
    var chl = Ch(el, fl, gl)

    var t1l = (hl + sigma1l) | 0
    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0
    t1l = (t1l + chl) | 0
    t1h = (t1h + chh + getCarry(t1l, chl)) | 0
    t1l = (t1l + Kil) | 0
    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0
    t1l = (t1l + Wil) | 0
    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0

    // t2 = sigma0 + maj
    var t2l = (sigma0l + majl) | 0
    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0

    hh = gh
    hl = gl
    gh = fh
    gl = fl
    fh = eh
    fl = el
    el = (dl + t1l) | 0
    eh = (dh + t1h + getCarry(el, dl)) | 0
    dh = ch
    dl = cl
    ch = bh
    cl = bl
    bh = ah
    bl = al
    al = (t1l + t2l) | 0
    ah = (t1h + t2h + getCarry(al, t1l)) | 0
  }

  this._al = (this._al + al) | 0
  this._bl = (this._bl + bl) | 0
  this._cl = (this._cl + cl) | 0
  this._dl = (this._dl + dl) | 0
  this._el = (this._el + el) | 0
  this._fl = (this._fl + fl) | 0
  this._gl = (this._gl + gl) | 0
  this._hl = (this._hl + hl) | 0

  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0
  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0
  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0
  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0
  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0
  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0
  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0
  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0
}

Sha512.prototype._hash = function () {
  var H = Buffer.allocUnsafe(64)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)
  writeInt64BE(this._gh, this._gl, 48)
  writeInt64BE(this._hh, this._hl, 56)

  return H
}

module.exports = Sha512


/***/ }),

/***/ 9419:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(nacl) {
'use strict';

// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

var gf = function(init) {
  var i, r = new Float64Array(16);
  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
  return r;
};

//  Pluggable, initialized in high-level API below.
var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

var _0 = new Uint8Array(16);
var _9 = new Uint8Array(32); _9[0] = 9;

var gf0 = gf(),
    gf1 = gf([1]),
    _121665 = gf([0xdb41, 1]),
    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function ts64(x, i, h, l) {
  x[i]   = (h >> 24) & 0xff;
  x[i+1] = (h >> 16) & 0xff;
  x[i+2] = (h >>  8) & 0xff;
  x[i+3] = h & 0xff;
  x[i+4] = (l >> 24)  & 0xff;
  x[i+5] = (l >> 16)  & 0xff;
  x[i+6] = (l >>  8)  & 0xff;
  x[i+7] = l & 0xff;
}

function vn(x, xi, y, yi, n) {
  var i,d = 0;
  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
  return (1 & ((d - 1) >>> 8)) - 1;
}

function crypto_verify_16(x, xi, y, yi) {
  return vn(x,xi,y,yi,16);
}

function crypto_verify_32(x, xi, y, yi) {
  return vn(x,xi,y,yi,32);
}

function core_salsa20(o, p, k, c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }
   x0 =  x0 +  j0 | 0;
   x1 =  x1 +  j1 | 0;
   x2 =  x2 +  j2 | 0;
   x3 =  x3 +  j3 | 0;
   x4 =  x4 +  j4 | 0;
   x5 =  x5 +  j5 | 0;
   x6 =  x6 +  j6 | 0;
   x7 =  x7 +  j7 | 0;
   x8 =  x8 +  j8 | 0;
   x9 =  x9 +  j9 | 0;
  x10 = x10 + j10 | 0;
  x11 = x11 + j11 | 0;
  x12 = x12 + j12 | 0;
  x13 = x13 + j13 | 0;
  x14 = x14 + j14 | 0;
  x15 = x15 + j15 | 0;

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x1 >>>  0 & 0xff;
  o[ 5] = x1 >>>  8 & 0xff;
  o[ 6] = x1 >>> 16 & 0xff;
  o[ 7] = x1 >>> 24 & 0xff;

  o[ 8] = x2 >>>  0 & 0xff;
  o[ 9] = x2 >>>  8 & 0xff;
  o[10] = x2 >>> 16 & 0xff;
  o[11] = x2 >>> 24 & 0xff;

  o[12] = x3 >>>  0 & 0xff;
  o[13] = x3 >>>  8 & 0xff;
  o[14] = x3 >>> 16 & 0xff;
  o[15] = x3 >>> 24 & 0xff;

  o[16] = x4 >>>  0 & 0xff;
  o[17] = x4 >>>  8 & 0xff;
  o[18] = x4 >>> 16 & 0xff;
  o[19] = x4 >>> 24 & 0xff;

  o[20] = x5 >>>  0 & 0xff;
  o[21] = x5 >>>  8 & 0xff;
  o[22] = x5 >>> 16 & 0xff;
  o[23] = x5 >>> 24 & 0xff;

  o[24] = x6 >>>  0 & 0xff;
  o[25] = x6 >>>  8 & 0xff;
  o[26] = x6 >>> 16 & 0xff;
  o[27] = x6 >>> 24 & 0xff;

  o[28] = x7 >>>  0 & 0xff;
  o[29] = x7 >>>  8 & 0xff;
  o[30] = x7 >>> 16 & 0xff;
  o[31] = x7 >>> 24 & 0xff;

  o[32] = x8 >>>  0 & 0xff;
  o[33] = x8 >>>  8 & 0xff;
  o[34] = x8 >>> 16 & 0xff;
  o[35] = x8 >>> 24 & 0xff;

  o[36] = x9 >>>  0 & 0xff;
  o[37] = x9 >>>  8 & 0xff;
  o[38] = x9 >>> 16 & 0xff;
  o[39] = x9 >>> 24 & 0xff;

  o[40] = x10 >>>  0 & 0xff;
  o[41] = x10 >>>  8 & 0xff;
  o[42] = x10 >>> 16 & 0xff;
  o[43] = x10 >>> 24 & 0xff;

  o[44] = x11 >>>  0 & 0xff;
  o[45] = x11 >>>  8 & 0xff;
  o[46] = x11 >>> 16 & 0xff;
  o[47] = x11 >>> 24 & 0xff;

  o[48] = x12 >>>  0 & 0xff;
  o[49] = x12 >>>  8 & 0xff;
  o[50] = x12 >>> 16 & 0xff;
  o[51] = x12 >>> 24 & 0xff;

  o[52] = x13 >>>  0 & 0xff;
  o[53] = x13 >>>  8 & 0xff;
  o[54] = x13 >>> 16 & 0xff;
  o[55] = x13 >>> 24 & 0xff;

  o[56] = x14 >>>  0 & 0xff;
  o[57] = x14 >>>  8 & 0xff;
  o[58] = x14 >>> 16 & 0xff;
  o[59] = x14 >>> 24 & 0xff;

  o[60] = x15 >>>  0 & 0xff;
  o[61] = x15 >>>  8 & 0xff;
  o[62] = x15 >>> 16 & 0xff;
  o[63] = x15 >>> 24 & 0xff;
}

function core_hsalsa20(o,p,k,c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x5 >>>  0 & 0xff;
  o[ 5] = x5 >>>  8 & 0xff;
  o[ 6] = x5 >>> 16 & 0xff;
  o[ 7] = x5 >>> 24 & 0xff;

  o[ 8] = x10 >>>  0 & 0xff;
  o[ 9] = x10 >>>  8 & 0xff;
  o[10] = x10 >>> 16 & 0xff;
  o[11] = x10 >>> 24 & 0xff;

  o[12] = x15 >>>  0 & 0xff;
  o[13] = x15 >>>  8 & 0xff;
  o[14] = x15 >>> 16 & 0xff;
  o[15] = x15 >>> 24 & 0xff;

  o[16] = x6 >>>  0 & 0xff;
  o[17] = x6 >>>  8 & 0xff;
  o[18] = x6 >>> 16 & 0xff;
  o[19] = x6 >>> 24 & 0xff;

  o[20] = x7 >>>  0 & 0xff;
  o[21] = x7 >>>  8 & 0xff;
  o[22] = x7 >>> 16 & 0xff;
  o[23] = x7 >>> 24 & 0xff;

  o[24] = x8 >>>  0 & 0xff;
  o[25] = x8 >>>  8 & 0xff;
  o[26] = x8 >>> 16 & 0xff;
  o[27] = x8 >>> 24 & 0xff;

  o[28] = x9 >>>  0 & 0xff;
  o[29] = x9 >>>  8 & 0xff;
  o[30] = x9 >>> 16 & 0xff;
  o[31] = x9 >>> 24 & 0xff;
}

function crypto_core_salsa20(out,inp,k,c) {
  core_salsa20(out,inp,k,c);
}

function crypto_core_hsalsa20(out,inp,k,c) {
  core_hsalsa20(out,inp,k,c);
}

var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
            // "expand 32-byte k"

function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
    mpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
  }
  return 0;
}

function crypto_stream_salsa20(c,cpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = x[i];
  }
  return 0;
}

function crypto_stream(c,cpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20(c,cpos,d,sn,s);
}

function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
}

/*
* Port of Andrew Moon's Poly1305-donna-16. Public domain.
* https://github.com/floodyberry/poly1305-donna
*/

var poly1305 = function(key) {
  this.buffer = new Uint8Array(16);
  this.r = new Uint16Array(10);
  this.h = new Uint16Array(10);
  this.pad = new Uint16Array(8);
  this.leftover = 0;
  this.fin = 0;

  var t0, t1, t2, t3, t4, t5, t6, t7;

  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
  this.r[9] = ((t7 >>>  5)) & 0x007f;

  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
};

poly1305.prototype.blocks = function(m, mpos, bytes) {
  var hibit = this.fin ? 0 : (1 << 11);
  var t0, t1, t2, t3, t4, t5, t6, t7, c;
  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

  var h0 = this.h[0],
      h1 = this.h[1],
      h2 = this.h[2],
      h3 = this.h[3],
      h4 = this.h[4],
      h5 = this.h[5],
      h6 = this.h[6],
      h7 = this.h[7],
      h8 = this.h[8],
      h9 = this.h[9];

  var r0 = this.r[0],
      r1 = this.r[1],
      r2 = this.r[2],
      r3 = this.r[3],
      r4 = this.r[4],
      r5 = this.r[5],
      r6 = this.r[6],
      r7 = this.r[7],
      r8 = this.r[8],
      r9 = this.r[9];

  while (bytes >= 16) {
    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
    h5 += ((t4 >>>  1)) & 0x1fff;
    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
    h9 += ((t7 >>> 5)) | hibit;

    c = 0;

    d0 = c;
    d0 += h0 * r0;
    d0 += h1 * (5 * r9);
    d0 += h2 * (5 * r8);
    d0 += h3 * (5 * r7);
    d0 += h4 * (5 * r6);
    c = (d0 >>> 13); d0 &= 0x1fff;
    d0 += h5 * (5 * r5);
    d0 += h6 * (5 * r4);
    d0 += h7 * (5 * r3);
    d0 += h8 * (5 * r2);
    d0 += h9 * (5 * r1);
    c += (d0 >>> 13); d0 &= 0x1fff;

    d1 = c;
    d1 += h0 * r1;
    d1 += h1 * r0;
    d1 += h2 * (5 * r9);
    d1 += h3 * (5 * r8);
    d1 += h4 * (5 * r7);
    c = (d1 >>> 13); d1 &= 0x1fff;
    d1 += h5 * (5 * r6);
    d1 += h6 * (5 * r5);
    d1 += h7 * (5 * r4);
    d1 += h8 * (5 * r3);
    d1 += h9 * (5 * r2);
    c += (d1 >>> 13); d1 &= 0x1fff;

    d2 = c;
    d2 += h0 * r2;
    d2 += h1 * r1;
    d2 += h2 * r0;
    d2 += h3 * (5 * r9);
    d2 += h4 * (5 * r8);
    c = (d2 >>> 13); d2 &= 0x1fff;
    d2 += h5 * (5 * r7);
    d2 += h6 * (5 * r6);
    d2 += h7 * (5 * r5);
    d2 += h8 * (5 * r4);
    d2 += h9 * (5 * r3);
    c += (d2 >>> 13); d2 &= 0x1fff;

    d3 = c;
    d3 += h0 * r3;
    d3 += h1 * r2;
    d3 += h2 * r1;
    d3 += h3 * r0;
    d3 += h4 * (5 * r9);
    c = (d3 >>> 13); d3 &= 0x1fff;
    d3 += h5 * (5 * r8);
    d3 += h6 * (5 * r7);
    d3 += h7 * (5 * r6);
    d3 += h8 * (5 * r5);
    d3 += h9 * (5 * r4);
    c += (d3 >>> 13); d3 &= 0x1fff;

    d4 = c;
    d4 += h0 * r4;
    d4 += h1 * r3;
    d4 += h2 * r2;
    d4 += h3 * r1;
    d4 += h4 * r0;
    c = (d4 >>> 13); d4 &= 0x1fff;
    d4 += h5 * (5 * r9);
    d4 += h6 * (5 * r8);
    d4 += h7 * (5 * r7);
    d4 += h8 * (5 * r6);
    d4 += h9 * (5 * r5);
    c += (d4 >>> 13); d4 &= 0x1fff;

    d5 = c;
    d5 += h0 * r5;
    d5 += h1 * r4;
    d5 += h2 * r3;
    d5 += h3 * r2;
    d5 += h4 * r1;
    c = (d5 >>> 13); d5 &= 0x1fff;
    d5 += h5 * r0;
    d5 += h6 * (5 * r9);
    d5 += h7 * (5 * r8);
    d5 += h8 * (5 * r7);
    d5 += h9 * (5 * r6);
    c += (d5 >>> 13); d5 &= 0x1fff;

    d6 = c;
    d6 += h0 * r6;
    d6 += h1 * r5;
    d6 += h2 * r4;
    d6 += h3 * r3;
    d6 += h4 * r2;
    c = (d6 >>> 13); d6 &= 0x1fff;
    d6 += h5 * r1;
    d6 += h6 * r0;
    d6 += h7 * (5 * r9);
    d6 += h8 * (5 * r8);
    d6 += h9 * (5 * r7);
    c += (d6 >>> 13); d6 &= 0x1fff;

    d7 = c;
    d7 += h0 * r7;
    d7 += h1 * r6;
    d7 += h2 * r5;
    d7 += h3 * r4;
    d7 += h4 * r3;
    c = (d7 >>> 13); d7 &= 0x1fff;
    d7 += h5 * r2;
    d7 += h6 * r1;
    d7 += h7 * r0;
    d7 += h8 * (5 * r9);
    d7 += h9 * (5 * r8);
    c += (d7 >>> 13); d7 &= 0x1fff;

    d8 = c;
    d8 += h0 * r8;
    d8 += h1 * r7;
    d8 += h2 * r6;
    d8 += h3 * r5;
    d8 += h4 * r4;
    c = (d8 >>> 13); d8 &= 0x1fff;
    d8 += h5 * r3;
    d8 += h6 * r2;
    d8 += h7 * r1;
    d8 += h8 * r0;
    d8 += h9 * (5 * r9);
    c += (d8 >>> 13); d8 &= 0x1fff;

    d9 = c;
    d9 += h0 * r9;
    d9 += h1 * r8;
    d9 += h2 * r7;
    d9 += h3 * r6;
    d9 += h4 * r5;
    c = (d9 >>> 13); d9 &= 0x1fff;
    d9 += h5 * r4;
    d9 += h6 * r3;
    d9 += h7 * r2;
    d9 += h8 * r1;
    d9 += h9 * r0;
    c += (d9 >>> 13); d9 &= 0x1fff;

    c = (((c << 2) + c)) | 0;
    c = (c + d0) | 0;
    d0 = c & 0x1fff;
    c = (c >>> 13);
    d1 += c;

    h0 = d0;
    h1 = d1;
    h2 = d2;
    h3 = d3;
    h4 = d4;
    h5 = d5;
    h6 = d6;
    h7 = d7;
    h8 = d8;
    h9 = d9;

    mpos += 16;
    bytes -= 16;
  }
  this.h[0] = h0;
  this.h[1] = h1;
  this.h[2] = h2;
  this.h[3] = h3;
  this.h[4] = h4;
  this.h[5] = h5;
  this.h[6] = h6;
  this.h[7] = h7;
  this.h[8] = h8;
  this.h[9] = h9;
};

poly1305.prototype.finish = function(mac, macpos) {
  var g = new Uint16Array(10);
  var c, mask, f, i;

  if (this.leftover) {
    i = this.leftover;
    this.buffer[i++] = 1;
    for (; i < 16; i++) this.buffer[i] = 0;
    this.fin = 1;
    this.blocks(this.buffer, 0, 16);
  }

  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  for (i = 2; i < 10; i++) {
    this.h[i] += c;
    c = this.h[i] >>> 13;
    this.h[i] &= 0x1fff;
  }
  this.h[0] += (c * 5);
  c = this.h[0] >>> 13;
  this.h[0] &= 0x1fff;
  this.h[1] += c;
  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  this.h[2] += c;

  g[0] = this.h[0] + 5;
  c = g[0] >>> 13;
  g[0] &= 0x1fff;
  for (i = 1; i < 10; i++) {
    g[i] = this.h[i] + c;
    c = g[i] >>> 13;
    g[i] &= 0x1fff;
  }
  g[9] -= (1 << 13);

  mask = (c ^ 1) - 1;
  for (i = 0; i < 10; i++) g[i] &= mask;
  mask = ~mask;
  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

  f = this.h[0] + this.pad[0];
  this.h[0] = f & 0xffff;
  for (i = 1; i < 8; i++) {
    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
    this.h[i] = f & 0xffff;
  }

  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
};

poly1305.prototype.update = function(m, mpos, bytes) {
  var i, want;

  if (this.leftover) {
    want = (16 - this.leftover);
    if (want > bytes)
      want = bytes;
    for (i = 0; i < want; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    bytes -= want;
    mpos += want;
    this.leftover += want;
    if (this.leftover < 16)
      return;
    this.blocks(this.buffer, 0, 16);
    this.leftover = 0;
  }

  if (bytes >= 16) {
    want = bytes - (bytes % 16);
    this.blocks(m, mpos, want);
    mpos += want;
    bytes -= want;
  }

  if (bytes) {
    for (i = 0; i < bytes; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    this.leftover += bytes;
  }
};

function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  var s = new poly1305(k);
  s.update(m, mpos, n);
  s.finish(out, outpos);
  return 0;
}

function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  var x = new Uint8Array(16);
  crypto_onetimeauth(x,0,m,mpos,n,k);
  return crypto_verify_16(h,hpos,x,0);
}

function crypto_secretbox(c,m,d,n,k) {
  var i;
  if (d < 32) return -1;
  crypto_stream_xor(c,0,m,0,d,n,k);
  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  for (i = 0; i < 16; i++) c[i] = 0;
  return 0;
}

function crypto_secretbox_open(m,c,d,n,k) {
  var i;
  var x = new Uint8Array(32);
  if (d < 32) return -1;
  crypto_stream(x,0,32,n,k);
  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
  crypto_stream_xor(m,0,c,0,d,n,k);
  for (i = 0; i < 32; i++) m[i] = 0;
  return 0;
}

function set25519(r, a) {
  var i;
  for (i = 0; i < 16; i++) r[i] = a[i]|0;
}

function car25519(o) {
  var i, v, c = 1;
  for (i = 0; i < 16; i++) {
    v = o[i] + c + 65535;
    c = Math.floor(v / 65536);
    o[i] = v - c * 65536;
  }
  o[0] += c-1 + 37 * (c-1);
}

function sel25519(p, q, b) {
  var t, c = ~(b-1);
  for (var i = 0; i < 16; i++) {
    t = c & (p[i] ^ q[i]);
    p[i] ^= t;
    q[i] ^= t;
  }
}

function pack25519(o, n) {
  var i, j, b;
  var m = gf(), t = gf();
  for (i = 0; i < 16; i++) t[i] = n[i];
  car25519(t);
  car25519(t);
  car25519(t);
  for (j = 0; j < 2; j++) {
    m[0] = t[0] - 0xffed;
    for (i = 1; i < 15; i++) {
      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
      m[i-1] &= 0xffff;
    }
    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
    b = (m[15]>>16) & 1;
    m[14] &= 0xffff;
    sel25519(t, m, 1-b);
  }
  for (i = 0; i < 16; i++) {
    o[2*i] = t[i] & 0xff;
    o[2*i+1] = t[i]>>8;
  }
}

function neq25519(a, b) {
  var c = new Uint8Array(32), d = new Uint8Array(32);
  pack25519(c, a);
  pack25519(d, b);
  return crypto_verify_32(c, 0, d, 0);
}

function par25519(a) {
  var d = new Uint8Array(32);
  pack25519(d, a);
  return d[0] & 1;
}

function unpack25519(o, n) {
  var i;
  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
  o[15] &= 0x7fff;
}

function A(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
}

function Z(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
}

function M(o, a, b) {
  var v, c,
     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11],
    b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];

  v = a[0];
  t0 += v * b0;
  t1 += v * b1;
  t2 += v * b2;
  t3 += v * b3;
  t4 += v * b4;
  t5 += v * b5;
  t6 += v * b6;
  t7 += v * b7;
  t8 += v * b8;
  t9 += v * b9;
  t10 += v * b10;
  t11 += v * b11;
  t12 += v * b12;
  t13 += v * b13;
  t14 += v * b14;
  t15 += v * b15;
  v = a[1];
  t1 += v * b0;
  t2 += v * b1;
  t3 += v * b2;
  t4 += v * b3;
  t5 += v * b4;
  t6 += v * b5;
  t7 += v * b6;
  t8 += v * b7;
  t9 += v * b8;
  t10 += v * b9;
  t11 += v * b10;
  t12 += v * b11;
  t13 += v * b12;
  t14 += v * b13;
  t15 += v * b14;
  t16 += v * b15;
  v = a[2];
  t2 += v * b0;
  t3 += v * b1;
  t4 += v * b2;
  t5 += v * b3;
  t6 += v * b4;
  t7 += v * b5;
  t8 += v * b6;
  t9 += v * b7;
  t10 += v * b8;
  t11 += v * b9;
  t12 += v * b10;
  t13 += v * b11;
  t14 += v * b12;
  t15 += v * b13;
  t16 += v * b14;
  t17 += v * b15;
  v = a[3];
  t3 += v * b0;
  t4 += v * b1;
  t5 += v * b2;
  t6 += v * b3;
  t7 += v * b4;
  t8 += v * b5;
  t9 += v * b6;
  t10 += v * b7;
  t11 += v * b8;
  t12 += v * b9;
  t13 += v * b10;
  t14 += v * b11;
  t15 += v * b12;
  t16 += v * b13;
  t17 += v * b14;
  t18 += v * b15;
  v = a[4];
  t4 += v * b0;
  t5 += v * b1;
  t6 += v * b2;
  t7 += v * b3;
  t8 += v * b4;
  t9 += v * b5;
  t10 += v * b6;
  t11 += v * b7;
  t12 += v * b8;
  t13 += v * b9;
  t14 += v * b10;
  t15 += v * b11;
  t16 += v * b12;
  t17 += v * b13;
  t18 += v * b14;
  t19 += v * b15;
  v = a[5];
  t5 += v * b0;
  t6 += v * b1;
  t7 += v * b2;
  t8 += v * b3;
  t9 += v * b4;
  t10 += v * b5;
  t11 += v * b6;
  t12 += v * b7;
  t13 += v * b8;
  t14 += v * b9;
  t15 += v * b10;
  t16 += v * b11;
  t17 += v * b12;
  t18 += v * b13;
  t19 += v * b14;
  t20 += v * b15;
  v = a[6];
  t6 += v * b0;
  t7 += v * b1;
  t8 += v * b2;
  t9 += v * b3;
  t10 += v * b4;
  t11 += v * b5;
  t12 += v * b6;
  t13 += v * b7;
  t14 += v * b8;
  t15 += v * b9;
  t16 += v * b10;
  t17 += v * b11;
  t18 += v * b12;
  t19 += v * b13;
  t20 += v * b14;
  t21 += v * b15;
  v = a[7];
  t7 += v * b0;
  t8 += v * b1;
  t9 += v * b2;
  t10 += v * b3;
  t11 += v * b4;
  t12 += v * b5;
  t13 += v * b6;
  t14 += v * b7;
  t15 += v * b8;
  t16 += v * b9;
  t17 += v * b10;
  t18 += v * b11;
  t19 += v * b12;
  t20 += v * b13;
  t21 += v * b14;
  t22 += v * b15;
  v = a[8];
  t8 += v * b0;
  t9 += v * b1;
  t10 += v * b2;
  t11 += v * b3;
  t12 += v * b4;
  t13 += v * b5;
  t14 += v * b6;
  t15 += v * b7;
  t16 += v * b8;
  t17 += v * b9;
  t18 += v * b10;
  t19 += v * b11;
  t20 += v * b12;
  t21 += v * b13;
  t22 += v * b14;
  t23 += v * b15;
  v = a[9];
  t9 += v * b0;
  t10 += v * b1;
  t11 += v * b2;
  t12 += v * b3;
  t13 += v * b4;
  t14 += v * b5;
  t15 += v * b6;
  t16 += v * b7;
  t17 += v * b8;
  t18 += v * b9;
  t19 += v * b10;
  t20 += v * b11;
  t21 += v * b12;
  t22 += v * b13;
  t23 += v * b14;
  t24 += v * b15;
  v = a[10];
  t10 += v * b0;
  t11 += v * b1;
  t12 += v * b2;
  t13 += v * b3;
  t14 += v * b4;
  t15 += v * b5;
  t16 += v * b6;
  t17 += v * b7;
  t18 += v * b8;
  t19 += v * b9;
  t20 += v * b10;
  t21 += v * b11;
  t22 += v * b12;
  t23 += v * b13;
  t24 += v * b14;
  t25 += v * b15;
  v = a[11];
  t11 += v * b0;
  t12 += v * b1;
  t13 += v * b2;
  t14 += v * b3;
  t15 += v * b4;
  t16 += v * b5;
  t17 += v * b6;
  t18 += v * b7;
  t19 += v * b8;
  t20 += v * b9;
  t21 += v * b10;
  t22 += v * b11;
  t23 += v * b12;
  t24 += v * b13;
  t25 += v * b14;
  t26 += v * b15;
  v = a[12];
  t12 += v * b0;
  t13 += v * b1;
  t14 += v * b2;
  t15 += v * b3;
  t16 += v * b4;
  t17 += v * b5;
  t18 += v * b6;
  t19 += v * b7;
  t20 += v * b8;
  t21 += v * b9;
  t22 += v * b10;
  t23 += v * b11;
  t24 += v * b12;
  t25 += v * b13;
  t26 += v * b14;
  t27 += v * b15;
  v = a[13];
  t13 += v * b0;
  t14 += v * b1;
  t15 += v * b2;
  t16 += v * b3;
  t17 += v * b4;
  t18 += v * b5;
  t19 += v * b6;
  t20 += v * b7;
  t21 += v * b8;
  t22 += v * b9;
  t23 += v * b10;
  t24 += v * b11;
  t25 += v * b12;
  t26 += v * b13;
  t27 += v * b14;
  t28 += v * b15;
  v = a[14];
  t14 += v * b0;
  t15 += v * b1;
  t16 += v * b2;
  t17 += v * b3;
  t18 += v * b4;
  t19 += v * b5;
  t20 += v * b6;
  t21 += v * b7;
  t22 += v * b8;
  t23 += v * b9;
  t24 += v * b10;
  t25 += v * b11;
  t26 += v * b12;
  t27 += v * b13;
  t28 += v * b14;
  t29 += v * b15;
  v = a[15];
  t15 += v * b0;
  t16 += v * b1;
  t17 += v * b2;
  t18 += v * b3;
  t19 += v * b4;
  t20 += v * b5;
  t21 += v * b6;
  t22 += v * b7;
  t23 += v * b8;
  t24 += v * b9;
  t25 += v * b10;
  t26 += v * b11;
  t27 += v * b12;
  t28 += v * b13;
  t29 += v * b14;
  t30 += v * b15;

  t0  += 38 * t16;
  t1  += 38 * t17;
  t2  += 38 * t18;
  t3  += 38 * t19;
  t4  += 38 * t20;
  t5  += 38 * t21;
  t6  += 38 * t22;
  t7  += 38 * t23;
  t8  += 38 * t24;
  t9  += 38 * t25;
  t10 += 38 * t26;
  t11 += 38 * t27;
  t12 += 38 * t28;
  t13 += 38 * t29;
  t14 += 38 * t30;
  // t15 left as is

  // first car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  // second car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  o[ 0] = t0;
  o[ 1] = t1;
  o[ 2] = t2;
  o[ 3] = t3;
  o[ 4] = t4;
  o[ 5] = t5;
  o[ 6] = t6;
  o[ 7] = t7;
  o[ 8] = t8;
  o[ 9] = t9;
  o[10] = t10;
  o[11] = t11;
  o[12] = t12;
  o[13] = t13;
  o[14] = t14;
  o[15] = t15;
}

function S(o, a) {
  M(o, a, a);
}

function inv25519(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 253; a >= 0; a--) {
    S(c, c);
    if(a !== 2 && a !== 4) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function pow2523(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 250; a >= 0; a--) {
      S(c, c);
      if(a !== 1) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function crypto_scalarmult(q, n, p) {
  var z = new Uint8Array(32);
  var x = new Float64Array(80), r, i;
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf();
  for (i = 0; i < 31; i++) z[i] = n[i];
  z[31]=(n[31]&127)|64;
  z[0]&=248;
  unpack25519(x,p);
  for (i = 0; i < 16; i++) {
    b[i]=x[i];
    d[i]=a[i]=c[i]=0;
  }
  a[0]=d[0]=1;
  for (i=254; i>=0; --i) {
    r=(z[i>>>3]>>>(i&7))&1;
    sel25519(a,b,r);
    sel25519(c,d,r);
    A(e,a,c);
    Z(a,a,c);
    A(c,b,d);
    Z(b,b,d);
    S(d,e);
    S(f,a);
    M(a,c,a);
    M(c,b,e);
    A(e,a,c);
    Z(a,a,c);
    S(b,a);
    Z(c,d,f);
    M(a,c,_121665);
    A(a,a,d);
    M(c,c,a);
    M(a,d,f);
    M(d,b,x);
    S(b,e);
    sel25519(a,b,r);
    sel25519(c,d,r);
  }
  for (i = 0; i < 16; i++) {
    x[i+16]=a[i];
    x[i+32]=c[i];
    x[i+48]=b[i];
    x[i+64]=d[i];
  }
  var x32 = x.subarray(32);
  var x16 = x.subarray(16);
  inv25519(x32,x32);
  M(x16,x16,x32);
  pack25519(q,x16);
  return 0;
}

function crypto_scalarmult_base(q, n) {
  return crypto_scalarmult(q, n, _9);
}

function crypto_box_keypair(y, x) {
  randombytes(x, 32);
  return crypto_scalarmult_base(y, x);
}

function crypto_box_beforenm(k, y, x) {
  var s = new Uint8Array(32);
  crypto_scalarmult(s, x, y);
  return crypto_core_hsalsa20(k, _0, s, sigma);
}

var crypto_box_afternm = crypto_secretbox;
var crypto_box_open_afternm = crypto_secretbox_open;

function crypto_box(c, m, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_afternm(c, m, d, n, k);
}

function crypto_box_open(m, c, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_open_afternm(m, c, d, n, k);
}

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function crypto_hashblocks_hl(hh, hl, m, n) {
  var wh = new Int32Array(16), wl = new Int32Array(16),
      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
      th, tl, i, j, h, l, a, b, c, d;

  var ah0 = hh[0],
      ah1 = hh[1],
      ah2 = hh[2],
      ah3 = hh[3],
      ah4 = hh[4],
      ah5 = hh[5],
      ah6 = hh[6],
      ah7 = hh[7],

      al0 = hl[0],
      al1 = hl[1],
      al2 = hl[2],
      al3 = hl[3],
      al4 = hl[4],
      al5 = hl[5],
      al6 = hl[6],
      al7 = hl[7];

  var pos = 0;
  while (n >= 128) {
    for (i = 0; i < 16; i++) {
      j = 8 * i + pos;
      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
    }
    for (i = 0; i < 80; i++) {
      bh0 = ah0;
      bh1 = ah1;
      bh2 = ah2;
      bh3 = ah3;
      bh4 = ah4;
      bh5 = ah5;
      bh6 = ah6;
      bh7 = ah7;

      bl0 = al0;
      bl1 = al1;
      bl2 = al2;
      bl3 = al3;
      bl4 = al4;
      bl5 = al5;
      bl6 = al6;
      bl7 = al7;

      // add
      h = ah7;
      l = al7;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma1
      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Ch
      h = (ah4 & ah5) ^ (~ah4 & ah6);
      l = (al4 & al5) ^ (~al4 & al6);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // K
      h = K[i*2];
      l = K[i*2+1];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // w
      h = wh[i%16];
      l = wl[i%16];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      th = c & 0xffff | d << 16;
      tl = a & 0xffff | b << 16;

      // add
      h = th;
      l = tl;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma0
      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Maj
      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh7 = (c & 0xffff) | (d << 16);
      bl7 = (a & 0xffff) | (b << 16);

      // add
      h = bh3;
      l = bl3;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = th;
      l = tl;

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh3 = (c & 0xffff) | (d << 16);
      bl3 = (a & 0xffff) | (b << 16);

      ah1 = bh0;
      ah2 = bh1;
      ah3 = bh2;
      ah4 = bh3;
      ah5 = bh4;
      ah6 = bh5;
      ah7 = bh6;
      ah0 = bh7;

      al1 = bl0;
      al2 = bl1;
      al3 = bl2;
      al4 = bl3;
      al5 = bl4;
      al6 = bl5;
      al7 = bl6;
      al0 = bl7;

      if (i%16 === 15) {
        for (j = 0; j < 16; j++) {
          // add
          h = wh[j];
          l = wl[j];

          a = l & 0xffff; b = l >>> 16;
          c = h & 0xffff; d = h >>> 16;

          h = wh[(j+9)%16];
          l = wl[(j+9)%16];

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma0
          th = wh[(j+1)%16];
          tl = wl[(j+1)%16];
          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma1
          th = wh[(j+14)%16];
          tl = wl[(j+14)%16];
          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;

          wh[j] = (c & 0xffff) | (d << 16);
          wl[j] = (a & 0xffff) | (b << 16);
        }
      }
    }

    // add
    h = ah0;
    l = al0;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[0];
    l = hl[0];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[0] = ah0 = (c & 0xffff) | (d << 16);
    hl[0] = al0 = (a & 0xffff) | (b << 16);

    h = ah1;
    l = al1;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[1];
    l = hl[1];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[1] = ah1 = (c & 0xffff) | (d << 16);
    hl[1] = al1 = (a & 0xffff) | (b << 16);

    h = ah2;
    l = al2;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[2];
    l = hl[2];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[2] = ah2 = (c & 0xffff) | (d << 16);
    hl[2] = al2 = (a & 0xffff) | (b << 16);

    h = ah3;
    l = al3;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[3];
    l = hl[3];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[3] = ah3 = (c & 0xffff) | (d << 16);
    hl[3] = al3 = (a & 0xffff) | (b << 16);

    h = ah4;
    l = al4;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[4];
    l = hl[4];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[4] = ah4 = (c & 0xffff) | (d << 16);
    hl[4] = al4 = (a & 0xffff) | (b << 16);

    h = ah5;
    l = al5;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[5];
    l = hl[5];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[5] = ah5 = (c & 0xffff) | (d << 16);
    hl[5] = al5 = (a & 0xffff) | (b << 16);

    h = ah6;
    l = al6;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[6];
    l = hl[6];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[6] = ah6 = (c & 0xffff) | (d << 16);
    hl[6] = al6 = (a & 0xffff) | (b << 16);

    h = ah7;
    l = al7;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[7];
    l = hl[7];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[7] = ah7 = (c & 0xffff) | (d << 16);
    hl[7] = al7 = (a & 0xffff) | (b << 16);

    pos += 128;
    n -= 128;
  }

  return n;
}

function crypto_hash(out, m, n) {
  var hh = new Int32Array(8),
      hl = new Int32Array(8),
      x = new Uint8Array(256),
      i, b = n;

  hh[0] = 0x6a09e667;
  hh[1] = 0xbb67ae85;
  hh[2] = 0x3c6ef372;
  hh[3] = 0xa54ff53a;
  hh[4] = 0x510e527f;
  hh[5] = 0x9b05688c;
  hh[6] = 0x1f83d9ab;
  hh[7] = 0x5be0cd19;

  hl[0] = 0xf3bcc908;
  hl[1] = 0x84caa73b;
  hl[2] = 0xfe94f82b;
  hl[3] = 0x5f1d36f1;
  hl[4] = 0xade682d1;
  hl[5] = 0x2b3e6c1f;
  hl[6] = 0xfb41bd6b;
  hl[7] = 0x137e2179;

  crypto_hashblocks_hl(hh, hl, m, n);
  n %= 128;

  for (i = 0; i < n; i++) x[i] = m[b-n+i];
  x[n] = 128;

  n = 256-128*(n<112?1:0);
  x[n-9] = 0;
  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
  crypto_hashblocks_hl(hh, hl, x, n);

  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

  return 0;
}

function add(p, q) {
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf(),
      g = gf(), h = gf(), t = gf();

  Z(a, p[1], p[0]);
  Z(t, q[1], q[0]);
  M(a, a, t);
  A(b, p[0], p[1]);
  A(t, q[0], q[1]);
  M(b, b, t);
  M(c, p[3], q[3]);
  M(c, c, D2);
  M(d, p[2], q[2]);
  A(d, d, d);
  Z(e, b, a);
  Z(f, d, c);
  A(g, d, c);
  A(h, b, a);

  M(p[0], e, f);
  M(p[1], h, g);
  M(p[2], g, f);
  M(p[3], e, h);
}

function cswap(p, q, b) {
  var i;
  for (i = 0; i < 4; i++) {
    sel25519(p[i], q[i], b);
  }
}

function pack(r, p) {
  var tx = gf(), ty = gf(), zi = gf();
  inv25519(zi, p[2]);
  M(tx, p[0], zi);
  M(ty, p[1], zi);
  pack25519(r, ty);
  r[31] ^= par25519(tx) << 7;
}

function scalarmult(p, q, s) {
  var b, i;
  set25519(p[0], gf0);
  set25519(p[1], gf1);
  set25519(p[2], gf1);
  set25519(p[3], gf0);
  for (i = 255; i >= 0; --i) {
    b = (s[(i/8)|0] >> (i&7)) & 1;
    cswap(p, q, b);
    add(q, p);
    add(p, p);
    cswap(p, q, b);
  }
}

function scalarbase(p, s) {
  var q = [gf(), gf(), gf(), gf()];
  set25519(q[0], X);
  set25519(q[1], Y);
  set25519(q[2], gf1);
  M(q[3], X, Y);
  scalarmult(p, q, s);
}

function crypto_sign_keypair(pk, sk, seeded) {
  var d = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()];
  var i;

  if (!seeded) randombytes(sk, 32);
  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);

  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
  return 0;
}

var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

function modL(r, x) {
  var carry, i, j, k;
  for (i = 63; i >= 32; --i) {
    carry = 0;
    for (j = i - 32, k = i - 12; j < k; ++j) {
      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
      carry = Math.floor((x[j] + 128) / 256);
      x[j] -= carry * 256;
    }
    x[j] += carry;
    x[i] = 0;
  }
  carry = 0;
  for (j = 0; j < 32; j++) {
    x[j] += carry - (x[31] >> 4) * L[j];
    carry = x[j] >> 8;
    x[j] &= 255;
  }
  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
  for (i = 0; i < 32; i++) {
    x[i+1] += x[i] >> 8;
    r[i] = x[i] & 255;
  }
}

function reduce(r) {
  var x = new Float64Array(64), i;
  for (i = 0; i < 64; i++) x[i] = r[i];
  for (i = 0; i < 64; i++) r[i] = 0;
  modL(r, x);
}

// Note: difference from C - smlen returned, not passed as argument.
function crypto_sign(sm, m, n, sk) {
  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
  var i, j, x = new Float64Array(64);
  var p = [gf(), gf(), gf(), gf()];

  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  var smlen = n + 64;
  for (i = 0; i < n; i++) sm[64 + i] = m[i];
  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

  crypto_hash(r, sm.subarray(32), n+32);
  reduce(r);
  scalarbase(p, r);
  pack(sm, p);

  for (i = 32; i < 64; i++) sm[i] = sk[i];
  crypto_hash(h, sm, n + 64);
  reduce(h);

  for (i = 0; i < 64; i++) x[i] = 0;
  for (i = 0; i < 32; i++) x[i] = r[i];
  for (i = 0; i < 32; i++) {
    for (j = 0; j < 32; j++) {
      x[i+j] += h[i] * d[j];
    }
  }

  modL(sm.subarray(32), x);
  return smlen;
}

function unpackneg(r, p) {
  var t = gf(), chk = gf(), num = gf(),
      den = gf(), den2 = gf(), den4 = gf(),
      den6 = gf();

  set25519(r[2], gf1);
  unpack25519(r[1], p);
  S(num, r[1]);
  M(den, num, D);
  Z(num, num, r[2]);
  A(den, r[2], den);

  S(den2, den);
  S(den4, den2);
  M(den6, den4, den2);
  M(t, den6, num);
  M(t, t, den);

  pow2523(t, t);
  M(t, t, num);
  M(t, t, den);
  M(t, t, den);
  M(r[0], t, den);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) M(r[0], r[0], I);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) return -1;

  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

  M(r[3], r[0], r[1]);
  return 0;
}

function crypto_sign_open(m, sm, n, pk) {
  var i;
  var t = new Uint8Array(32), h = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()],
      q = [gf(), gf(), gf(), gf()];

  if (n < 64) return -1;

  if (unpackneg(q, pk)) return -1;

  for (i = 0; i < n; i++) m[i] = sm[i];
  for (i = 0; i < 32; i++) m[i+32] = pk[i];
  crypto_hash(h, m, n);
  reduce(h);
  scalarmult(p, q, h);

  scalarbase(q, sm.subarray(32));
  add(p, q);
  pack(t, p);

  n -= 64;
  if (crypto_verify_32(sm, 0, t, 0)) {
    for (i = 0; i < n; i++) m[i] = 0;
    return -1;
  }

  for (i = 0; i < n; i++) m[i] = sm[i + 64];
  return n;
}

var crypto_secretbox_KEYBYTES = 32,
    crypto_secretbox_NONCEBYTES = 24,
    crypto_secretbox_ZEROBYTES = 32,
    crypto_secretbox_BOXZEROBYTES = 16,
    crypto_scalarmult_BYTES = 32,
    crypto_scalarmult_SCALARBYTES = 32,
    crypto_box_PUBLICKEYBYTES = 32,
    crypto_box_SECRETKEYBYTES = 32,
    crypto_box_BEFORENMBYTES = 32,
    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
    crypto_sign_BYTES = 64,
    crypto_sign_PUBLICKEYBYTES = 32,
    crypto_sign_SECRETKEYBYTES = 64,
    crypto_sign_SEEDBYTES = 32,
    crypto_hash_BYTES = 64;

nacl.lowlevel = {
  crypto_core_hsalsa20: crypto_core_hsalsa20,
  crypto_stream_xor: crypto_stream_xor,
  crypto_stream: crypto_stream,
  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
  crypto_stream_salsa20: crypto_stream_salsa20,
  crypto_onetimeauth: crypto_onetimeauth,
  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
  crypto_verify_16: crypto_verify_16,
  crypto_verify_32: crypto_verify_32,
  crypto_secretbox: crypto_secretbox,
  crypto_secretbox_open: crypto_secretbox_open,
  crypto_scalarmult: crypto_scalarmult,
  crypto_scalarmult_base: crypto_scalarmult_base,
  crypto_box_beforenm: crypto_box_beforenm,
  crypto_box_afternm: crypto_box_afternm,
  crypto_box: crypto_box,
  crypto_box_open: crypto_box_open,
  crypto_box_keypair: crypto_box_keypair,
  crypto_hash: crypto_hash,
  crypto_sign: crypto_sign,
  crypto_sign_keypair: crypto_sign_keypair,
  crypto_sign_open: crypto_sign_open,

  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
  crypto_sign_BYTES: crypto_sign_BYTES,
  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
  crypto_hash_BYTES: crypto_hash_BYTES,

  gf: gf,
  D: D,
  L: L,
  pack25519: pack25519,
  unpack25519: unpack25519,
  M: M,
  A: A,
  S: S,
  Z: Z,
  pow2523: pow2523,
  add: add,
  set25519: set25519,
  modL: modL,
  scalarmult: scalarmult,
  scalarbase: scalarbase,
};

/* High-level API */

function checkLengths(k, n) {
  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
}

function checkBoxLengths(pk, sk) {
  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
}

function checkArrayTypes() {
  for (var i = 0; i < arguments.length; i++) {
    if (!(arguments[i] instanceof Uint8Array))
      throw new TypeError('unexpected type, use Uint8Array');
  }
}

function cleanup(arr) {
  for (var i = 0; i < arr.length; i++) arr[i] = 0;
}

nacl.randomBytes = function(n) {
  var b = new Uint8Array(n);
  randombytes(b, n);
  return b;
};

nacl.secretbox = function(msg, nonce, key) {
  checkArrayTypes(msg, nonce, key);
  checkLengths(key, nonce);
  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
  var c = new Uint8Array(m.length);
  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
  crypto_secretbox(c, m, m.length, nonce, key);
  return c.subarray(crypto_secretbox_BOXZEROBYTES);
};

nacl.secretbox.open = function(box, nonce, key) {
  checkArrayTypes(box, nonce, key);
  checkLengths(key, nonce);
  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
  var m = new Uint8Array(c.length);
  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
  if (c.length < 32) return null;
  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
  return m.subarray(crypto_secretbox_ZEROBYTES);
};

nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

nacl.scalarMult = function(n, p) {
  checkArrayTypes(n, p);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult(q, n, p);
  return q;
};

nacl.scalarMult.base = function(n) {
  checkArrayTypes(n);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult_base(q, n);
  return q;
};

nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

nacl.box = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox(msg, nonce, k);
};

nacl.box.before = function(publicKey, secretKey) {
  checkArrayTypes(publicKey, secretKey);
  checkBoxLengths(publicKey, secretKey);
  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
  crypto_box_beforenm(k, publicKey, secretKey);
  return k;
};

nacl.box.after = nacl.secretbox;

nacl.box.open = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox.open(msg, nonce, k);
};

nacl.box.open.after = nacl.secretbox.open;

nacl.box.keyPair = function() {
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  crypto_box_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.box.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  crypto_scalarmult_base(pk, secretKey);
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
nacl.box.nonceLength = crypto_box_NONCEBYTES;
nacl.box.overheadLength = nacl.secretbox.overheadLength;

nacl.sign = function(msg, secretKey) {
  checkArrayTypes(msg, secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
  crypto_sign(signedMsg, msg, msg.length, secretKey);
  return signedMsg;
};

nacl.sign.open = function(signedMsg, publicKey) {
  checkArrayTypes(signedMsg, publicKey);
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var tmp = new Uint8Array(signedMsg.length);
  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
  if (mlen < 0) return null;
  var m = new Uint8Array(mlen);
  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
  return m;
};

nacl.sign.detached = function(msg, secretKey) {
  var signedMsg = nacl.sign(msg, secretKey);
  var sig = new Uint8Array(crypto_sign_BYTES);
  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  return sig;
};

nacl.sign.detached.verify = function(msg, sig, publicKey) {
  checkArrayTypes(msg, sig, publicKey);
  if (sig.length !== crypto_sign_BYTES)
    throw new Error('bad signature size');
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
  var i;
  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
};

nacl.sign.keyPair = function() {
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  crypto_sign_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.sign.keyPair.fromSeed = function(seed) {
  checkArrayTypes(seed);
  if (seed.length !== crypto_sign_SEEDBYTES)
    throw new Error('bad seed size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  for (var i = 0; i < 32; i++) sk[i] = seed[i];
  crypto_sign_keypair(pk, sk, true);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
nacl.sign.seedLength = crypto_sign_SEEDBYTES;
nacl.sign.signatureLength = crypto_sign_BYTES;

nacl.hash = function(msg) {
  checkArrayTypes(msg);
  var h = new Uint8Array(crypto_hash_BYTES);
  crypto_hash(h, msg, msg.length);
  return h;
};

nacl.hash.hashLength = crypto_hash_BYTES;

nacl.verify = function(x, y) {
  checkArrayTypes(x, y);
  // Zero length arguments are considered not equal.
  if (x.length === 0 || y.length === 0) return false;
  if (x.length !== y.length) return false;
  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
};

nacl.setPRNG = function(fn) {
  randombytes = fn;
};

(function() {
  // Initialize PRNG if environment provides CSPRNG.
  // If not, methods calling randombytes will throw.
  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
  if (crypto && crypto.getRandomValues) {
    // Browsers.
    var QUOTA = 65536;
    nacl.setPRNG(function(x, n) {
      var i, v = new Uint8Array(n);
      for (i = 0; i < n; i += QUOTA) {
        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
      }
      for (i = 0; i < n; i++) x[i] = v[i];
      cleanup(v);
    });
  } else if (true) {
    // Node.js.
    crypto = __webpack_require__(2581);
    if (crypto && crypto.randomBytes) {
      nacl.setPRNG(function(x, n) {
        var i, v = crypto.randomBytes(n);
        for (i = 0; i < n; i++) x[i] = v[i];
        cleanup(v);
      });
    }
  }
})();

})( true && module.exports ? module.exports : (self.nacl = self.nacl || {}));


/***/ }),

/***/ 2251:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.19.11
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }

    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));


/***/ }),

/***/ 6106:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.19.11
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),

/***/ 4998:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.11
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if ( true && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(3132), __webpack_require__(2251), __webpack_require__(6106));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3132), __webpack_require__(2251), __webpack_require__(6106)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  function isInteger(value) {
    return /^[0-9]+$/.test(value);
  }

  URI.version = '1.19.11';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      preventInvalidHostname: URI.preventInvalidHostname,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: throw on invalid hostname
  // see https://github.com/medialize/URI.js/pull/345
  // and https://github.com/medialize/URI.js/issues/354
  URI.preventInvalidHostname = false;
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\._-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  URI.leading_whitespace_expression = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/
  // https://infra.spec.whatwg.org/#ascii-tab-or-newline
  URI.ascii_tab_whitespace = /[\u0009\u000A\u000D]+/g
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // list of protocols which always require a hostname
  URI.hostProtocols = [
    'http',
    'https'
  ];

  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {
        preventInvalidHostname: URI.preventInvalidHostname
      };
    }

    string = string.replace(URI.leading_whitespace_expression, '')
    // https://infra.spec.whatwg.org/#ascii-tab-or-newline
    string = string.replace(URI.ascii_tab_whitespace, '')

    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // slashes and backslashes have lost all meaning for the web protocols (https, http, wss, ws)
    string = string.replace(/^(https?|ftp|wss?)?:+[/\\]*/i, '$1://');
    // slashes and backslashes have lost all meaning for scheme relative URLs
    string = string.replace(/^[/\\]{2,}/i, '//');

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3).replace(/\\/g, '/') === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    if (!string) {
      string = '';
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    if (parts.preventInvalidHostname) {
      URI.ensureValidHostname(parts.hostname, parts.protocol);
    }

    if (parts.port) {
      URI.ensureValidPort(parts.port);
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var _string = string
    var firstBackSlash = string.indexOf('\\');
    if (firstBackSlash !== -1) {
      string = string.replace(/\\/g, '/')
    }
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path or \path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = _string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (name === '__proto__') {
        // ignore attempt at exploiting JavaScript internals
        continue;
      } else if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';
    var requireAbsolutePath = false

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
      requireAbsolutePath = true
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && requireAbsolutePath) {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (key === '__proto__') {
        // ignore attempt at exploiting JavaScript internals
        continue;
      } else if (hasOwn.call(data, key)) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };

  URI.setQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.setQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      data[name] = value === undefined ? null : value;
    } else {
      throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
    }
  };

  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v, protocol) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    var hasHostname = !!v; // not null and not an empty string
    var hasProtocol = !!protocol;
    var rejectEmptyHostname = false;

    if (hasProtocol) {
      rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
    }

    if (rejectEmptyHostname && !hasHostname) {
      throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
      }
    }
  };

  URI.ensureValidPort = function (v) {
    if (!v) {
      return;
    }

    var port = Number(v);
    if (isInteger(port) && (port > 0) && (port < 65536)) {
      return;
    }

    throw new TypeError('Port "' + v + '" is not a valid port');
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (key === 'query') { continue; }
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
      if (src.query) {
        this.query(src.query, false);
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v) {
      // accept trailing ://
      v = v.replace(/:(\/\/)?$/, '');

      if (!v.match(URI.protocol_expression)) {
        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
      }
    }

    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        URI.ensureValidPort(v);
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = { preventInvalidHostname: this._parts.preventInvalidHostname };
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
      if (this._parts.preventInvalidHostname) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }
    }

    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      if (v) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      URI.ensureValidHostname(v, this._parts.protocol);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (resolved._parts.protocol) {
      // Directly returns even if this._parts.hostname is empty.
      return resolved;
    } else {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.preventInvalidHostname = function(v) {
    this._parts.preventInvalidHostname = !!v;
    return this;
  };

  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),

/***/ 3132:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ 2581:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 1257:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ lib_axios)
});

// NAMESPACE OBJECT: ./node_modules/axios/lib/platform/common/utils.js
var common_utils_namespaceObject = {};
__webpack_require__.r(common_utils_namespaceObject);
__webpack_require__.d(common_utils_namespaceObject, {
  hasBrowserEnv: () => (hasBrowserEnv),
  hasStandardBrowserEnv: () => (hasStandardBrowserEnv),
  hasStandardBrowserWebWorkerEnv: () => (hasStandardBrowserWebWorkerEnv)
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/bind.js


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/utils.js




// utils is a library of generic helper functions non-specific to axios

const {toString: utils_toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = utils_toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const utils_hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
}

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0]
  }

  return str;
}

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  }

  return visit(obj, 0);
}

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

/* harmony default export */ const utils = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty: utils_hasOwnProperty,
  hasOwnProp: utils_hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosError.js




/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const AxiosError_prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(AxiosError_prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(AxiosError_prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* harmony default export */ const core_AxiosError = (AxiosError);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/null.js
// eslint-disable-next-line strict
/* harmony default export */ const helpers_null = (null);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toFormData.js
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (helpers_null || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new core_AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        ((utils.isFileList(value) || utils.endsWith(key, '[]')) && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ const helpers_toFormData = (toFormData);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && helpers_toFormData(params, this, options);
}

const AxiosURLSearchParams_prototype = AxiosURLSearchParams.prototype;

AxiosURLSearchParams_prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

AxiosURLSearchParams_prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ const helpers_AxiosURLSearchParams = (AxiosURLSearchParams);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/buildURL.js





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function buildURL_encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || buildURL_encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new helpers_AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/InterceptorManager.js




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ const core_InterceptorManager = (InterceptorManager);

;// CONCATENATED MODULE: ./node_modules/axios/lib/defaults/transitional.js


/* harmony default export */ const defaults_transitional = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js



/* harmony default export */ const classes_URLSearchParams = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : helpers_AxiosURLSearchParams);

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/FormData.js


/* harmony default export */ const classes_FormData = (typeof FormData !== 'undefined' ? FormData : null);

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/classes/Blob.js


/* harmony default export */ const classes_Blob = (typeof Blob !== 'undefined' ? Blob : null);

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/browser/index.js




/* harmony default export */ const browser = ({
  isBrowser: true,
  classes: {
    URLSearchParams: classes_URLSearchParams,
    FormData: classes_FormData,
    Blob: classes_Blob
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/common/utils.js
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = (
  (product) => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
  })(typeof navigator !== 'undefined' && navigator.product);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();



;// CONCATENATED MODULE: ./node_modules/axios/lib/platform/index.js



/* harmony default export */ const platform = ({
  ...common_utils_namespaceObject,
  ...browser
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/toURLEncodedForm.js






function toURLEncodedForm(data, options) {
  return helpers_toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/formDataToJSON.js




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ const helpers_formDataToJSON = (formDataToJSON);

;// CONCATENATED MODULE: ./node_modules/axios/lib/defaults/index.js










/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: defaults_transitional,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(helpers_formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return helpers_toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw core_AxiosError.from(e, core_AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

/* harmony default export */ const lib_defaults = (defaults);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseHeaders.js




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ const parseHeaders = (rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/AxiosHeaders.js





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils.freezeMethods(AxiosHeaders);

/* harmony default export */ const core_AxiosHeaders = (AxiosHeaders);

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/transformData.js






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || lib_defaults;
  const context = response || config;
  const headers = core_AxiosHeaders.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/isCancel.js


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CanceledError.js





/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  core_AxiosError.call(this, message == null ? 'canceled' : message, core_AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, core_AxiosError, {
  __CANCEL__: true
});

/* harmony default export */ const cancel_CanceledError = (CanceledError);

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/settle.js




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new core_AxiosError(
      'Request failed with status code ' + response.status,
      [core_AxiosError.ERR_BAD_REQUEST, core_AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/cookies.js



/* harmony default export */ const cookies = (platform.hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      utils.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      utils.isString(path) && cookie.push('path=' + path);

      utils.isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  });


;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAbsoluteURL.js


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/combineURLs.js


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/buildFullPath.js





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isURLSameOrigin.js





/* harmony default export */ const isURLSameOrigin = (platform.hasStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })());

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/parseProtocol.js


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/speedometer.js


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/* harmony default export */ const helpers_speedometer = (speedometer);

;// CONCATENATED MODULE: ./node_modules/axios/lib/adapters/xhr.js
















function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = helpers_speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ const xhr = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = core_AxiosHeaders.from(config.headers).normalize();
    let {responseType, withXSRFToken} = config;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (utils.isFormData(requestData)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = core_AxiosHeaders.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new core_AxiosError('Request aborted', core_AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new core_AxiosError('Network Error', core_AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || defaults_transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new core_AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? core_AxiosError.ETIMEDOUT : core_AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if(platform.hasStandardBrowserEnv) {
      withXSRFToken && utils.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(fullPath))) {
        // Add xsrf header
        const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new cancel_CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new core_AxiosError('Unsupported protocol ' + protocol + ':', core_AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/adapters/adapters.js





const knownAdapters = {
  http: helpers_null,
  xhr: xhr
}

utils.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils.isFunction(adapter) || adapter === null || adapter === false;

/* harmony default export */ const adapters = ({
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new core_AxiosError(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new core_AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/dispatchRequest.js









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new cancel_CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = core_AxiosHeaders.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || lib_defaults.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = core_AxiosHeaders.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = core_AxiosHeaders.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/mergeConfig.js





const headersToObject = (thing) => thing instanceof core_AxiosHeaders ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/env/data.js
const VERSION = "1.6.2";
;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/validator.js





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new core_AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        core_AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new core_AxiosError('options must be an object', core_AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new core_AxiosError('option ' + opt + ' must be ' + result, core_AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new core_AxiosError('Unknown option ' + opt, core_AxiosError.ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ const validator = ({
  assertOptions,
  validators
});

;// CONCATENATED MODULE: ./node_modules/axios/lib/core/Axios.js











const Axios_validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new core_InterceptorManager(),
      response: new core_InterceptorManager()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
        forcedJSONParsing: Axios_validators.transitional(Axios_validators.boolean),
        clarifyTimeoutError: Axios_validators.transitional(Axios_validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        }
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: Axios_validators.function,
          serialize: Axios_validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = core_AxiosHeaders.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* harmony default export */ const core_Axios = (Axios);

;// CONCATENATED MODULE: ./node_modules/axios/lib/cancel/CancelToken.js




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new cancel_CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/* harmony default export */ const cancel_CancelToken = (CancelToken);

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/spread.js


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/isAxiosError.js




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

;// CONCATENATED MODULE: ./node_modules/axios/lib/helpers/HttpStatusCode.js
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* harmony default export */ const helpers_HttpStatusCode = (HttpStatusCode);

;// CONCATENATED MODULE: ./node_modules/axios/lib/axios.js




















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new core_Axios(defaultConfig);
  const instance = bind(core_Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, core_Axios.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(lib_defaults);

// Expose Axios class to allow class inheritance
axios.Axios = core_Axios;

// Expose Cancel & CancelToken
axios.CanceledError = cancel_CanceledError;
axios.CancelToken = cancel_CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = helpers_toFormData;

// Expose AxiosError class
axios.AxiosError = core_AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = core_AxiosHeaders;

axios.formToJSON = thing => helpers_formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = helpers_HttpStatusCode;

axios.default = axios;

// this module should only have a default export
/* harmony default export */ const lib_axios = (axios);


/***/ }),

/***/ 4147:
/***/ ((module) => {

"use strict";
module.exports = {"i8":"1.0.1"};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(5085);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});